const fs = require('fs');

// Read the original file
const original = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Find boundaries
const firstAddLevel = original.indexOf("addLevel('A1.1'");
const mullerStart = original.indexOf('MULLER_RUTA_LEVELS');

// Find the last ]); before MULLER_RUTA_LEVELS (which closes B1.5 addLevel)
let vocabEnd = mullerStart;
for (let p = mullerStart - 1; p >= firstAddLevel; p--) {
  if (original[p] === ']' && original[p+1] === ')' && original[p+2] === ';') {
    vocabEnd = p + 3;
    break;
  }
}

// Parts
const header = original.substring(0, firstAddLevel);
const vocabData = original.substring(firstAddLevel, vocabEnd);
const logicTail = original.substring(vocabEnd);

// Clean up the logic tail - remove blank lines at the start
const logicCleaned = logicTail.replace(/^\n+/, '');

console.log('=== File structure ===');
console.log('Header:     ', firstAddLevel, 'bytes (ends just before first addLevel)');
console.log('Vocab data: ', vocabEnd - firstAddLevel, 'bytes');
console.log('Logic tail: ', original.length - vocabEnd, 'bytes');
console.log('Total:      ', original.length, 'bytes');
console.log('');

// Verify the splits are clean
console.log('=== Header end ===');
console.log(header.substring(header.length - 60));
console.log('');
console.log('=== Vocab data start ===');
console.log(vocabData.substring(0, 60));
console.log('');
console.log('=== Vocab data end ===');
console.log(vocabData.substring(vocabData.length - 60));
console.log('');
console.log('=== Logic tail start (cleaned) ===');
console.log(logicCleaned.substring(0, 60));
console.log('');

// ==========================================================
// 1. Create src/data/rutaVocabData.js (plain JS, no Babel)
// ==========================================================
const vocabFileContent = `// ═══════════════════════════════════════════════════════════════════════════
// RUTA VOCABULARIO – Cargado como script plano (JS, no JSX) para evitar
// que Babel desoptimice archivos >500KB con "Source too large"
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  // Esperar a que Muller.Ruta exista (cargado desde rutaHelpers.jsx)
  function init() {
    var R = window.Muller && window.Muller.Ruta;
    if (!R || typeof R._addLevel !== 'function') {
      setTimeout(init, 50);
      return;
    }
    ${vocabData}
    // Marcar como cargado
    R._vocabLoaded = true;
    if (typeof R._onVocabReady === 'function') R._onVocabReady();
  }
  init();
})();
`;

fs.writeFileSync('src/data/rutaVocabData.js', vocabFileContent, 'utf8');
console.log('✅ Created src/data/rutaVocabData.js (' + vocabFileContent.length + ' bytes)');

// ==========================================================
// 2. Create a helper to load vocab data into the app
// ==========================================================
const loaderContent = `// ═══════════════════════════════════════════════════════════════════════════
// RUTA VOCAB LOADER – Carga el vocabulario externo en Muller.Ruta
// ═══════════════════════════════════════════════════════════════════════════

// Esta función se llama DESPUÉS de que rutaHelpers.jsx se haya cargado
// y ANTES de que cualquier componente intente usar el vocabulario
window.Muller = window.Muller || {};
window.Muller.Ruta = window.Muller.Ruta || {};
(function(R) {
  // Renombrar la función addLevel original para que el vocabulario externo la use
  // Vocabulario externo llama a R._addLevel(id, words)
  R._addLevel = R.addLevel || function(id, words) { R.VOCAB[id] = words; };

  // Cargar el vocabulario externo dinámicamente
  var script = document.createElement('script');
  script.src = 'src/data/rutaVocabData.js';
  script.async = false;
  script.onload = function() {
    console.log('✅ Vocabulario externo cargado (' + Object.keys(R.VOCAB).length + ' niveles)');
  };
  script.onerror = function() {
    console.error('❌ Error cargando vocabulario externo');
  };
  document.head.appendChild(script);
})(window.Muller.Ruta);
`;

fs.writeFileSync('src/features/ruta/rutaVocabLoader.jsx', loaderContent, 'utf8');
console.log('✅ Created src/features/ruta/rutaVocabLoader.jsx (' + loaderContent.length + ' bytes)');

// ==========================================================
// 3. Rewrite rutaHelpers.jsx WITHOUT vocab data
// ==========================================================
const newContent = header + '\n\n  // Vocabulario cargado desde src/data/rutaVocabData.js\n' + logicCleaned;

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', newContent, 'utf8');
console.log('✅ Rewritten src/features/ruta/rutaHelpers.jsx (' + newContent.length + ' bytes)');
console.log('   Saved ' + (original.length - newContent.length) + ' bytes (' +
  ((original.length - newContent.length) / original.length * 100).toFixed(1) + '%)');

console.log('\n=== NEXT STEPS ===');
console.log('1. Load rutaVocabData.js BEFORE rutaHelpers.jsx in index.html');
console.log('2. Or load it right after as a plain <script>');
console.log('3. The vocab loader expects R._addLevel to exist');