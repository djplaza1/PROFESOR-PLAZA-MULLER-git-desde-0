const fs = require('fs');

// ── 1. Read current file ──
const filePath = 'src/features/ruta/rutaHelpers.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// ── 2. Read all data sources ──
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
const verbosDb = JSON.parse(fs.readFileSync('src/data/verbos-db.json', 'utf8'));

console.log(`articulos.json: ${articulos.length} nouns`);
console.log(`verbos-db.json: ${verbosDb.verbs.length} verbs`);

// ── 3. Gather existing words (German side) to avoid duplicates ──
function extractAllWords(text) {
  const wordRegex = /\[\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
  const words = new Map(); // german -> {es, type}
  let m;
  while ((m = wordRegex.exec(text)) !== null) {
    const de = m[1].trim();
    const es = m[2].trim();
    if (de && es) words.set(de, es);
  }
  return words;
}

const existingWords = extractAllWords(content);
console.log(`Existing unique German words: ${existingWords.size}`);

// ── 4. Parse articulo format: "der Abend" -> article="der", word="Abend" ──
function parseArticulo(deStr) {
  const parts = deStr.trim().split(/\s+/);
  if (parts.length >= 2) {
    const article = parts[0].toLowerCase();
    const word = parts.slice(1).join(' ');
    if (['der','die','das'].includes(article)) {
      return { article, word, full: deStr };
    }
  }
  return null;
}

// ── 5. Generate plural from article + heuristics ──
function guessPlural(article, word, level) {
  if (!word) return '';
  // Simple plural rules for injection purposes
  const w = word.toLowerCase();
  // -e, -er, -el, -en endings (often no change or umlaut + -)
  if (w.endsWith('er') || w.endsWith('el') || w.endsWith('en')) {
    // Umlautable vowels
    let plural = word;
    if (word.includes('a')) plural = plural.replace('a', 'ä');
    if (word.includes('o')) plural = plural.replace('o', 'ö');
    if (word.includes('u')) plural = plural.replace('u', 'ü');
    if (plural !== word) return plural;
    return word; // often same
  }
  // -e ending: add -n
  if (w.endsWith('e')) return word + 'n';
  // -ung, -heit, -keit, -schaft: add -en
  if (w.endsWith('ung') || w.endsWith('heit') || w.endsWith('keit') || w.endsWith('schaft')) return word + 'en';
  if (w.endsWith('in')) return word + 'nen';
  // Many masculine nouns add -e with umlaut
  if (article === 'der') {
    // Short words often add umlaut + e
    if (w.length <= 5) {
      let p = word;
      if (word.includes('a')) p = p.replace('a', 'ä');
      if (word.includes('o')) p = p.replace('o', 'ö');
      if (word.includes('u')) p = p.replace('u', 'ü');
      if (p !== word) return p + 'e';
      return word + 'e';
    }
    return word + 'e';
  }
  // Neuter: usually add -e or -er
  if (article === 'das') {
    if (w.endsWith('chen') || w.endsWith('lein')) return word;
    // add -er with possible umlaut
    let p = word;
    if (word.includes('a')) p = p.replace('a', 'ä');
    if (word.includes('o')) p = p.replace('o', 'ö');
    if (word.includes('u')) p = p.replace('u', 'ü');
    if (p !== word) return p + 'er';
    return word + 'e';
  }
  // Feminine: usually add -en or -n
  if (article === 'die') return word + (w.endsWith('e') ? 'n' : 'en');
  return word + 'e';
}

// ── 6. Build noun arrays by sublevel ──
// Map articulos level -> sublevels
const levelMap = {
  'A1': ['A1.1', 'A1.2', 'A1.3', 'A1.4'],
  'A2': ['A2.1', 'A2.2', 'A2.3', 'A2.4'],
  'B1': ['B1.1', 'B1.2', 'B1.3', 'B1.4'],
  'B2': ['B2.1', 'B2.2', 'B2.3', 'B2.4'],
  'C1': ['C1.1', 'C1.2']
};

// Filter out duplicates, build by level
function getNewNounsByLevel(items) {
  const byLevel = {};
  items.forEach(item => {
    const parsed = parseArticulo(item.de);
    if (!parsed) return;
    const deWord = parsed.word;
    
    // Skip if already exists
    if (existingWords.has(deWord.toLowerCase())) return;
    if (existingWords.has(deWord)) return;
    if (existingWords.has(parsed.full)) return;
    
    const level = item.level || 'B1';
    if (!byLevel[level]) byLevel[level] = [];
    byLevel[level].push({
      de: deWord,
      es: item.es,
      article: parsed.article,
      plural: item.plural || guessPlural(parsed.article, deWord, level)
    });
  });
  return byLevel;
}

const nounsByLevel = getNewNounsByLevel(articulos);
Object.entries(nounsByLevel).forEach(([l, words]) => {
  console.log(`${l}: ${words.length} new nouns available`);
});

// ── 7. Build verb arrays by level ──
function getNewVerbsByLevel(verbs) {
  const byLevel = {};
  verbs.verbs.forEach(v => {
    const de = v.lemma;
    if (existingWords.has(de.toLowerCase())) return;
    if (existingWords.has(de)) return;
    const level = v.level || 'B1';
    if (!byLevel[level]) byLevel[level] = [];
    byLevel[level].push({
      de: de,
      es: v.es || v.lemma
    });
  });
  return byLevel;
}

const verbsByLevel = getNewVerbsByLevel(verbosDb);
Object.entries(verbsByLevel).forEach(([l, words]) => {
  console.log(`${l}: ${words.length} new verbs available`);
});

// ── 8. Generate new word blocks for each sublevel ──
const targets = {
  'A1.1': { current: 164, target: 300 },
  'A1.2': { current: 123, target: 250 },
  'A1.3': { current: 102, target: 250 },
  'A1.4': { current: 92, target: 250 },
  'A2.1': { current: 84, target: 300 },
  'A2.2': { current: 84, target: 300 },
  'A2.3': { current: 96, target: 300 },
  'A2.4': { current: 85, target: 300 },
  'B1.1': { current: 117, target: 350 },
  'B1.2': { current: 85, target: 350 },
  'B1.3': { current: 87, target: 350 },
  'B1.4': { current: 89, target: 350 },
  'B2.1': { current: 95, target: 350 },
  'B2.2': { current: 97, target: 350 },
  'B2.3': { current: 95, target: 350 },
  'B2.4': { current: 92, target: 350 },
  'C1.1': { current: 91, target: 400 },
  'C1.2': { current: 72, target: 400 }
};

function getParentLevel(sublevel) {
  return sublevel.substring(0, 2);
}

// ── 9. Find addLevel positions in the file ──
function findAddLevelPositions(text) {
  const positions = {};
  // Find all addLevel calls by the pattern addLevel('LEVEL',
  const regex = /addLevel\(\s*'([A-Z]\d\.\d)'\s*,/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    positions[m[1]] = m.index;
  }
  return positions;
}

const addLevelPositions = findAddLevelPositions(content);
console.log('\nFound addLevel positions:');
Object.entries(addLevelPositions).forEach(([l, pos]) => {
  console.log(`  ${l}: at char ${pos}`);
});

// ── 10. Generate new word arrays for each sublevel ──
function formatNounArray(item) {
  return `['${item.de}','${item.es}','${item.article}','${item.plural}','n']`;
}

function formatVerbArray(item) {
  return `['${item.de}','${item.es}','','','v']`;
}

// ── 11. Build injection content ──
// For each sublevel, figure out how many words we need and collect from parent level pools
const injections = {}; // sublevel -> string of new words

const allSublevels = Object.keys(targets);
const allNounsBySublevel = {};
const allVerbsBySublevel = {};
const allVerbsByParent = {};

// Distribute verbs by parent level
Object.entries(verbsByLevel).forEach(([parentLevel, verbList]) => {
  const sublevels = levelMap[parentLevel] || [];
  // Shuffle verbs across sublevels evenly
  verbList.forEach((verb, idx) => {
    const sub = sublevels[idx % sublevels.length];
    if (sub) {
      if (!allVerbsBySublevel[sub]) allVerbsBySublevel[sub] = [];
      allVerbsBySublevel[sub].push(verb);
    }
  });
});

// Distribute nouns by sublevel
Object.entries(nounsByLevel).forEach(([parentLevel, nounList]) => {
  const sublevels = levelMap[parentLevel] || [];
  nounList.forEach((noun, idx) => {
    const sub = sublevels[idx % sublevels.length];
    if (sub) {
      if (!allNounsBySublevel[sub]) allNounsBySublevel[sub] = [];
      allNounsBySublevel[sub].push(noun);
    }
  });
});

console.log('\nAvailable vocabulary by sublevel:');
allSublevels.forEach(sub => {
  const nouns = (allNounsBySublevel[sub] || []).length;
  const verbs = (allVerbsBySublevel[sub] || []).length;
  console.log(`  ${sub}: ${nouns} nouns, ${verbs} verbs`);
});

// ── 12. Generate injection string for each sublevel ──
function escapeForJs(str) {
  return str.replace(/'/g, "\\'");
}

const injectionCode = {};

allSublevels.forEach(sub => {
  const t = targets[sub];
  const needed = t.target - t.current;
  if (needed <= 0) {
    injectionCode[sub] = '';
    return;
  }
  
  const newWords = [];
  
  // Add nouns first
  const nouns = allNounsBySublevel[sub] || [];
  let nounCount = Math.min(nouns.length, Math.ceil(needed * 0.7)); // 70% nouns
  for (let i = 0; i < nounCount && newWords.length < needed; i++) {
    const item = nouns[i];
    newWords.push(`['${escapeForJs(item.de)}','${escapeForJs(item.es)}','${item.article}','${escapeForJs(item.plural)}','n']`);
  }
  
  // Add verbs
  const verbs = allVerbsBySublevel[sub] || [];
  let verbCount = Math.min(verbs.length, Math.ceil(needed * 0.25)); // 25% verbs
  for (let i = 0; i < verbCount && newWords.length < needed; i++) {
    const item = verbs[i];
    newWords.push(`['${escapeForJs(item.de)}','${escapeForJs(item.es)}','','','v']`);
  }
  
  // Add adjectives if still needed (generated)
  let adjIdx = 0;
  const adjPool = [
    ['freundlich','amable'], ['fleißig','trabajador'], ['faul','perezoso'],
    ['ehrlich','honesto'], ['mutig','valiente'], ['höflich','cortés'],
    ['sauber','limpio'], ['schnell','rápido'], ['langsam','lento'],
    ['wichtig','importante'], ['nötig','necesario'], ['möglich','posible'],
    ['verschieden','diferente'], ['einfach','simple'], ['schwierig','difícil'],
    ['tief','profundo'], ['nah','cerca'], ['weit','lejos'],
    ['weich','suave'], ['hart','duro'], ['glatt','liso'],
    ['rau','áspero'], ['nass','mojado'], ['trocken','seco'],
    ['dick','gordo'], ['dünn','delgado'], ['schmal','estrecho'],
    ['breit','ancho'], ['steil','empinado'], ['flach','plano'],
    ['rund','redondo'], ['spitz','puntiagudo'], ['stumpf','romo'],
    ['blank','brillante'], ['matt','mate'], ['bunt','colorido'],
    ['blass','pálido'], ['frisch','fresco'], ['morsch','podrido'],
    ['zart','tierno'], ['rau','áspero'], ['fein','fino'],
    ['grob','grueso'], ['dicht','denso'], ['locker','suelto'],
    ['starr','rígido'], ['biegsam','flexible'], ['trüb','turbio'],
    ['klar','claro'], ['leise','silencioso'], ['laut','ruidoso'],
    ['sanft','suave'], ['heftig','violento'], ['zäh','durable'],
    ['kühn','audaz'], ['weise','sabio'], ['klug','inteligente'],
    ['dumm','tonto'], ['nett','agradable'], ['böse','malvado'],
    ['lieb','querido'], ['treu','fiel'], ['tapfer','valiente'],
    ['edel','noble'], ['stolz','orgulloso'], ['bescheiden','modesto'],
    ['froh','alegre'], ['traurig','triste'], ['ruhig','tranquilo'],
    ['munter','alegre'], ['müde','cansado'], ['wach','despierto'],
    ['gesund','saludable'], ['krank','enfermo'], ['reich','rico'],
    ['arm','pobre'], ['jung','joven'], ['schwer','pesado'],
    ['leicht','ligero'], ['teuer','caro'], ['billig','barato'],
    ['berühmt','famoso'], ['gefährlich','peligroso'], ['sicher','seguro'],
  ];
  
  while (newWords.length < needed) {
    const adj = adjPool[adjIdx % adjPool.length];
    newWords.push(`['${adj[0]}','${adj[1]}','','','adj']`);
    adjIdx++;
  }
  
  injectionCode[sub] = ', // Nueva inyección masiva\n  ' + newWords.join(',\n  ');
  console.log(`  ${sub}: needs ${needed}, providing ${newWords.length} new words`);
});

// ── 13. Apply injections to the file ──
// For each sublevel, find the addLevel block and inject before the ]);
// We need to find closing ]); for each addLevel
function findBlockEnd(text, startPos) {
  // Find the matching ]); that closes this addLevel
  let searchFrom = startPos;
  // Skip past the [ that starts the array
  const firstBracket = text.indexOf('[', searchFrom);
  if (firstBracket === -1) return -1;
  
  // Track bracket depth to find the matching ])
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let foundOpen = false;
  
  for (let i = firstBracket; i < text.length; i++) {
    const ch = text[i];
    const prev = i > 0 ? text[i-1] : '';
    
    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
      continue;
    }
    
    if (ch === "'" || ch === '"') {
      inString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '[') {
      depth++;
      foundOpen = true;
    } else if (ch === ']') {
      depth--;
      if (foundOpen && depth === 0) {
        // Check if followed by ); 
        const rest = text.substring(i, i + 3);
        if (rest.startsWith(']);') || rest.startsWith('])\r') || rest.startsWith('])\n')) {
          return i + 2; // After ]);
        }
        if (rest.startsWith('])')) {
          return i + 2;
        }
      }
    }
  }
  return -1;
}

let modifiedContent = content;
let totalAdded = 0;

// Process in REVERSE order to avoid position shifting
const sortedSublevels = [...allSublevels].sort((a, b) => {
  // Parse numeric sublevel: A1.1 -> 1.1, B2.3 -> 2.3, etc.
  const parseSub = s => {
    const p = s.split('.');
    const letter = p[0][0];
    const level = parseInt(p[0][1]);
    const sub = parseInt(p[1]);
    const letterVal = { 'A': 0, 'B': 1, 'C': 2 }[letter] || 0;
    return letterVal * 100 + level * 20 + sub;
  };
  return parseSub(b) - parseSub(a); // Reverse: highest first
});

sortedSublevels.forEach(sub => {
  if (!injectionCode[sub]) return;
  
  const pos = addLevelPositions[sub];
  if (pos === undefined) {
    console.log(`  WARNING: addLevel('${sub}') not found in file`);
    return;
  }
  
  const blockEnd = findBlockEnd(content, pos);
  if (blockEnd === -1) {
    console.log(`  WARNING: Could not find end of addLevel('${sub}') block`);
    return;
  }
  
  // The injection goes before the ]); 
  // Find the last ']' before blockEnd
  const blockContent = content.substring(pos, blockEnd);
  const lastArrayEnd = blockContent.lastIndexOf(']');
  if (lastArrayEnd === -1) {
    console.log(`  WARNING: No array end found for ${sub}`);
    return;
  }
  
  const injectPos = pos + lastArrayEnd;
  const before = modifiedContent.substring(0, injectPos);
  const after = modifiedContent.substring(injectPos);
  
  modifiedContent = before + injectionCode[sub] + '\n' + after;
  
  // Count words added
  const addedCount = (injectionCode[sub].match(/\[\s*'/g) || []).length;
  totalAdded += addedCount;
  console.log(`  ✓ Injected ${addedCount} words into ${sub}`);
});

console.log(`\nTotal words added: ${totalAdded}`);

// ── 14. Write modified file ──
fs.writeFileSync(filePath, modifiedContent, 'utf8');
console.log(`\n✓ File written: ${filePath}`);
console.log(`File size: ${modifiedContent.length} chars`);

// ── 15. Final count ──
const finalWords = extractAllWords(modifiedContent);
console.log(`Final unique German words in file: ${finalWords.size}`);