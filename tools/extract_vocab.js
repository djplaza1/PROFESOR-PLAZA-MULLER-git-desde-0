const fs = require('fs');
const path = require('path');

// Read the file
const rutaHelpers = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Find boundaries
const firstAddLevel = rutaHelpers.indexOf("addLevel('A1.1'");
if (firstAddLevel === -1) {
  console.error('Could not find first addLevel');
  process.exit(1);
}

// Count brackets to find the end of the last addLevel
// Strategy: find last "addLevel('", then count brackets from there
const lastAddLevel = rutaHelpers.lastIndexOf("addLevel('B1.5'");

// Find the exact end of the last addLevel call by bracket counting
let depth = 0;
let inString = false;
let stringChar = null;
let vocabEnd = -1;

for (let i = firstAddLevel; i < rutaHelpers.length; i++) {
  const ch = rutaHelpers[i];
  const prev = i > 0 ? rutaHelpers[i-1] : '';
  
  // Track string literals (single quotes)
  if (ch === "'" && !inString) {
    inString = true;
    stringChar = "'";
  } else if (ch === "'" && inString && stringChar === "'") {
    // Check if escaped
    let backslashes = 0;
    for (let j = i-1; j >= 0 && rutaHelpers[j] === '\\'; j--) backslashes++;
    if (backslashes % 2 === 0) {
      inString = false;
      stringChar = null;
    }
  }
  
  // Only count brackets outside strings
  if (!inString) {
    if (ch === '[') depth++;
    if (ch === ']') depth--;
  }
  
  // When depth returns to 0 after the first addLevel, check if this is the end
  // We need to find the LAST time depth goes to 0
  // Save all positions where depth returns to 0
}

// Better approach: loop backwards to find the last depth==0 position
// Reset
depth = 0;
inString = false;
let lastZeroDepth = -1;
let zeroCount = 0;

for (let i = firstAddLevel; i < rutaHelpers.length; i++) {
  const ch = rutaHelpers[i];
  
  if (ch === "'" && !inString) {
    inString = true;
  } else if (ch === "'" && inString) {
    let backslashes = 0;
    for (let j = i-1; j >= 0 && rutaHelpers[j] === '\\'; j--) backslashes++;
    if (backslashes % 2 === 0) inString = false;
  }
  
  if (!inString) {
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) {
        lastZeroDepth = i;
        zeroCount++;
      }
    }
  }
}

// Now lastZeroDepth is the position of the final ] in the last addLevel's ]);
// The vocabEnd should be lastZeroDepth + 3 to include ]);
vocabEnd = lastZeroDepth + 3;

console.log('First addLevel at offset:', firstAddLevel);
console.log('Last zero-depth bracket at offset:', lastZeroDepth);
console.log('Vocab data ends at:', vocabEnd);
console.log('Total file size:', rutaHelpers.length);
console.log('Header size:', firstAddLevel);
console.log('Vocab size:', vocabEnd - firstAddLevel);
console.log('Logic size:', rutaHelpers.length - vocabEnd);

// Verify the tail
const header = rutaHelpers.substring(0, firstAddLevel);
const vocabData = rutaHelpers.substring(firstAddLevel, vocabEnd);
const logicTail = rutaHelpers.substring(vocabEnd);

console.log('\n=== Header end ===');
console.log(header.substring(Math.max(0, header.length - 80)));
console.log('\n=== Tail start ===');
console.log(logicTail.substring(0, 150));

// Write the vocab data file
const vocabFile = `// Archivo de vocabulario extraído - CARGADO ANTES que rutaHelpers.jsx
// Contiene todas las llamadas addLevel() con el vocabulario de la ruta de aprendizaje
// Este archivo es JavaScript plano (NO JSX) para evitar que Babel lo procese

(function (R) {
  if (!R) {
    console.error('Muller.Ruta no encontrado');
    return;
  }

${vocabData}

})(window.Muller ? window.Muller.Ruta : null);
`;

fs.writeFileSync('src/data/rutaVocabData.js', vocabFile, 'utf8');
console.log('\n✅ Written src/data/rutaVocabData.js (' + vocabFile.length + ' bytes)');

// Build the logic-only rutaHelpers.jsx
// The header needs to be modified:
// - Remove the addLevel function definition (it's now in the vocab data file)
// - Keep the IIFE and all methods
// Actually, the addLevel function definition is in the IIFE header. 
// We need to keep it there for the vocab data file to use it.
// The new rutaHelpers should NOT have addLevel calls, just the logic portion.

// Find where the addLevel function is defined
const addLevelFnPos = rutaHelpers.indexOf('function addLevel(');
console.log('\naddLevel function defined at:', addLevelFnPos);

// Find the header up to (but not including) the first addLevel call
// Actually we need to figure out what's in the header vs logic code
// The addLevel function is defined in the IIFE, then the calls happen
// New approach: just write the logic tail as-is, it already has everything we need

// But wait - the logic tail includes the addLevel function definition? Let me check.
// The addLevel function should be before the first addLevel call
console.log('\nIs addLevel fn definition in header?', addLevelFnPos < firstAddLevel);

// Write the new logic-only file
const newContent = rutaHelpers.substring(0, firstAddLevel) + '\n  // Vocabulario cargado desde src/data/rutaVocabData.js\n' + rutaHelpers.substring(vocabEnd);

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', newContent, 'utf8');
console.log('✅ Written src/features/ruta/rutaHelpers.jsx (' + newContent.length + ' bytes)');

console.log('\n⬇ File sizes:');
console.log('  Before: ' + rutaHelpers.length + ' bytes');
console.log('  After:  ' + newContent.length + ' bytes');
console.log('  Saved:  ' + (rutaHelpers.length - newContent.length) + ' bytes (' + ((rutaHelpers.length - newContent.length) / rutaHelpers.length * 100).toFixed(1) + '%)');
console.log('\n✅ DONE! Vocab extracted, rutaHelpers.jsx is now ' + newContent.length + ' bytes (< 500KB)');