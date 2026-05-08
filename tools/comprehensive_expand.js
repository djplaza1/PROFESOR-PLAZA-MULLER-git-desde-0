const fs = require('fs');

// ===== 1. Read rutaHelpers and extract existing words =====
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Extract all existing German words (base forms, lowercased)
const wordRegex = /\[\s*'([A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
const existingWords = new Set();
let m;
while ((m = wordRegex.exec(c)) !== null) {
  existingWords.add(m[1].toLowerCase().replace(/^(der |die |das )/, ''));
}
console.log('Existing words in ruta:', existingWords.size);

// Track words we'll add to avoid duplicates within this injection
const newWords = new Set();

function isNewWord(de) {
  const base = de.replace(/^(der |die |das )/, '').toLowerCase().trim();
  if (existingWords.has(base)) return false;
  if (newWords.has(base)) return false;
  newWords.add(base);
  return true;
}

// ===== 2. Extract verbs from verbos-db.json =====
const verbosDB = JSON.parse(fs.readFileSync('src/data/verbos-db.json', 'utf8'));
const verbs = verbosDB.verbs || [];
console.log('\nVerbs in verbos-db.json:', verbs.length);

// Group verbs by level
const verbsByLevel = { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] };
let newVerbCount = 0;

verbs.forEach(v => {
  if (!v.lemma || !v.es) return;
  if (!isNewWord(v.lemma)) return;
  newVerbCount++;
  const level = v.level || 'B1';
  const cat = level.replace(/[0-9]/g, '');
  if (!verbsByLevel[cat]) verbsByLevel[cat] = [];
  verbsByLevel[cat].push({
    entry: `  ['${v.lemma}','${v.es}','','','v']`,
    level: level
  });
});
console.log('New verbs available:', newVerbCount);
for (const [l, w] of Object.entries(verbsByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 3. Check verbs-db.json for additional verbs =====
let extraVerbs = [];
try {
  const vdbText = fs.readFileSync('src/data/verbs-db.json', 'utf8');
  // Try to parse as JSON first
  try {
    const vdb = JSON.parse(vdbText);
    if (vdb.verbs) {
      extraVerbs = vdb.verbs;
    }
  } catch(e) {
    // Extract as text: look for patterns like 'lemma':'...','es':'...'
    const lemmaMatches = vdbText.match(/'lemma':\s*'([^']+)'/g) || [];
    const esMatches = vdbText.match(/'es':\s*'([^']+)'/g) || [];
    const levelMatches = vdbText.match(/'level':\s*'([^']+)'/g) || [];
    console.log('verbs-db.json (text):', lemmaMatches.length, 'lemmas found');
    for (let i = 0; i < lemmaMatches.length && i < 500; i++) {
      const lMatch = lemmaMatches[i].match(/'lemma':\s*'([^']+)'/);
      const eMatch = esMatches[i] ? esMatches[i].match(/'es':\s*'([^']+)'/) : null;
      const levMatch = levelMatches[i] ? levelMatches[i].match(/'level':\s*'([^']+)'/) : null;
      if (lMatch) {
        extraVerbs.push({
          lemma: lMatch[1],
          es: eMatch ? eMatch[1] : lMatch[1],
          level: levMatch ? levMatch[1] : 'B1'
        });
      }
    }
  }
} catch(e) {
  console.log('verbs-db.json error:', e.message);
}

const extraByLevel = { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] };
let extraCount = 0;
extraVerbs.forEach(v => {
  if (!v.lemma) return;
  if (!isNewWord(v.lemma)) return;
  extraCount++;
  const level = v.level || 'B1';
  const cat = level.replace(/[0-9]/g, '');
  if (!extraByLevel[cat]) extraByLevel[cat] = [];
  extraByLevel[cat].push({
    entry: `  ['${v.lemma}','${v.es || v.lemma}','','','v']`,
    level: level
  });
});
console.log('Extra new verbs:', extraCount);
for (const [l, w] of Object.entries(extraByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 4. Check verbos_con_preposiciones.json =====
let prepVerbs = [];
try {
  const pp = JSON.parse(fs.readFileSync('src/data/verbos_con_preposiciones.json', 'utf8'));
  if (Array.isArray(pp)) prepVerbs = pp;
  else if (pp.verbs) prepVerbs = pp.verbs;
console.log('\nVerbos con preposiciones:', prepVerbs.length);
} catch(e) {
  console.log('verbos_con_preposiciones error:', e.message);
}

const ppByLevel = { B1: [], B2: [], C1: [] };
let ppCount = 0;
prepVerbs.forEach(v => {
  const lemma = v.lemma || v.infinitiv || v.verb || '';
  if (!lemma) return;
  if (!isNewWord(lemma)) return;
  ppCount++;
  const es = v.es || v.translation || v.significado || lemma;
  // B1+ level verbs with prepositions
  const level = v.level || 'B1';
  const cat = level.replace(/[0-9]/g, '');
  if (!ppByLevel[cat]) ppByLevel[cat] = [];
  ppByLevel[cat].push({
    entry: `  ['${lemma}','${es}','','','v']`,
    level
  });
});
console.log('New prep verbs:', ppCount);
for (const [l, w] of Object.entries(ppByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 5. Check preposiciones.json =====
let preps = [];
try {
  const pj = JSON.parse(fs.readFileSync('src/data/preposiciones.json', 'utf8'));
  if (Array.isArray(pj)) preps = pj;
  else if (pj.prepositions || pj.preposiciones) preps = pj.prepositions || pj.preposiciones;
console.log('\nPreposiciones:', preps.length);
} catch(e) {
  console.log('preposiciones error:', e.message);
}

const prepByLevel = { A2: [], B1: [] };
let prepCount = 0;
preps.forEach(p => {
  const de = p.de || p.german || p.palabra || '';
  if (!de) return;
  if (!isNewWord(de)) return;
  prepCount++;
  const es = p.es || p.translation || p.significado || de;
  const level = p.level || (de.length < 6 ? 'A2' : 'B1');
  const cat = level.replace(/[0-9]/g, '');
  if (!prepByLevel[cat]) prepByLevel[cat] = [];
  prepByLevel[cat].push({
    entry: `  ['${de}','${es}','','','prep']`,
    level
  });
});
console.log('New prepositions:', prepCount);
for (const [l, w] of Object.entries(prepByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 6. Check b1-b2-database.json =====
let b1b2 = [];
try {
  const bdb = JSON.parse(fs.readFileSync('src/data/b1-b2-database.json', 'utf8'));
  if (Array.isArray(bdb)) b1b2 = bdb;
  else if (bdb.words || bdb.vocabulary) b1b2 = bdb.words || bdb.vocabulary;
console.log('\nB1-B2 database entries:', b1b2.length);
} catch(e) {
  console.log('b1-b2-database error:', e.message);
}

const b1b2ByLevel = { B1: [], B2: [] };
let b1b2Count = 0;
b1b2.forEach(w => {
  const de = w.de || w.german || w.word || w.lemma || '';
  if (!de) return;
  if (!isNewWord(de)) return;
  b1b2Count++;
  const es = w.es || w.translation || w.significado || de;
  const type = w.type || w.tipo || 'n';
  const art = w.article || w.artikel || '';
  const plural = w.plural || '';
  const level = w.level || (w.es && w.es.length > 15 ? 'B2' : 'B1');
  const cat = level.replace(/[0-9]/g, '');
  if (!b1b2ByLevel[cat]) b1b2ByLevel[cat] = [];
  b1b2ByLevel[cat].push({
    entry: `  ['${de}','${es}','${art}','${plural}','${type}']`,
    level
  });
});
console.log('New B1-B2 words:', b1b2Count);
for (const [l, w] of Object.entries(b1b2ByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 7. Check reise-mini.json =====
let reise = [];
try {
  const rj = JSON.parse(fs.readFileSync('src/data/reise-mini.json', 'utf8'));
  if (Array.isArray(rj)) reise = rj;
  else if (rj.words || rj.vocabulary) reise = rj.words || rj.vocabulary;
console.log('\nReise-mini entries:', reise.length);
} catch(e) {
  console.log('reise-mini error:', e.message);
}

const reiseByLevel = { A2: [], B1: [] };
let reiseCount = 0;
reise.forEach(w => {
  const de = w.de || w.german || w.word || '';
  if (!de) return;
  if (!isNewWord(de)) return;
  reiseCount++;
  const es = w.es || w.translation || de;
  const type = w.type || w.tipo || 'n';
  const art = w.article || w.artikel || '';
  const plural = w.plural || '';
  const cat = 'A2';
  if (!reiseByLevel[cat]) reiseByLevel[cat] = [];
  reiseByLevel[cat].push({
    entry: `  ['${de}','${es}','${art}','${plural}','${type}']`,
    level: cat
  });
});
console.log('New reise words:', reiseCount);
for (const [l, w] of Object.entries(reiseByLevel)) {
  if (w.length > 0) console.log(`  ${l}: ${w.length}`);
}

// ===== 8. Read maestro content files =====
const maestroFiles = [
  'src/features/maestros/contenido/contenidoA1_1.jsx',
  'src/features/maestros/contenido/contenidoA1_2.jsx',
  'src/features/maestros/contenido/contenidoA2_1.jsx',
  'src/features/maestros/contenido/contenidoA2_2.jsx',
  'src/features/maestros/contenido/contenidoB1_1.jsx',
  'src/features/maestros/contenido/contenidoB1_2.jsx',
  'src/features/maestros/contenido/contenidoB2_1.jsx',
  'src/features/maestros/contenido/contenidoB2_2.jsx',
  'src/features/maestros/contenido/contenidoC1.jsx'
];

const maestroWords = [];
maestroFiles.forEach(f => {
  try {
    const text = fs.readFileSync(f, 'utf8');
    // Extract single German words (not in JSX tags or strings)
    const germanWords = text.match(/['"]([A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+)['"]/g) || [];
    germanWords.forEach(g => {
      const word = g.replace(/['"]/g, '').trim();
      // Filter: only single words, longer than 2 chars
      if (word.length > 2 && !word.includes(' ') && word.match(/^[A-Za-zäöüßÄÖÜ]/)) {
        maestroWords.push(word.toLowerCase());
      }
    });
  } catch(e) {
    console.log(`Error reading ${f}: ${e.message}`);
  }
});

// Remove duplicates and filter out existing words
const uniqueMaestro = [...new Set(maestroWords)].filter(w => isNewWord(w));
console.log('\nNew words from maestro files:', uniqueMaestro.length);
// Group by level based on file source (we can't reliably assign but put in B1-B2 range)
const maestroByLevel = { A2: [], B1: [], B2: [] };
let maestroCount = 0;
uniqueMaestro.forEach(w => {
  const cat = w.length <= 6 ? 'A2' : (w.length <= 10 ? 'B1' : 'B2');
  maestroByLevel[cat].push({
    entry: `  ['${w}','${w}','','','n']`,
    level: cat
  });
  maestroCount++;
});

// ===== 9. NOW: Inject into weak levels =====
// Combine all source words by category
const sourceByCat = {
  A2: [...verbsByLevel.A2, ...extraByLevel.A2, ...reiseByLevel.A2, ...prepByLevel.A2, ...maestroByLevel.A2],
  B1: [...verbsByLevel.B1, ...extraByLevel.B1, ...ppByLevel.B1, ...b1b2ByLevel.B1, ...maestroByLevel.B1],
  B2: [...verbsByLevel.B2, ...extraByLevel.B2, ...ppByLevel.B2, ...b1b2ByLevel.B2, ...maestroByLevel.B2],
  C1: [...verbsByLevel.C1, ...extraByLevel.C1, ...ppByLevel.C1, ...verbsByLevel.C2, ...extraByLevel.C2]
};

console.log('\n=== AVAILABLE WORDS BY CATEGORY ===');
for (const [cat, words] of Object.entries(sourceByCat)) {
  console.log(`  ${cat}: ${words.length} available`);
}

// Target levels and how many each needs
const targets = {
  'A2.3': { current: 177 + 1, target: 300, category: 'A2' }, // +1 already injected
  'A2.4': { current: 135, target: 300, category: 'A2' },
  'B1.3': { current: 87, target: 350, category: 'B1' },
  'B1.4': { current: 89, target: 350, category: 'B1' },
  'B2.4': { current: 276, target: 350, category: 'B2' },
  'C1.2': { current: 310 + 67, target: 400, category: 'C1' } // +67 already injected
};

// Distribute words from sources to fill gaps
const catIndex = { A2: 0, B1: 0, B2: 0, C1: 0 };
const injections = {};

for (const [level, info] of Object.entries(targets)) {
  const needed = info.target - info.current;
  if (needed <= 0) {
    console.log(`\n${level}: already at ${info.current}, needs 0`);
    continue;
  }
  
  const cat = info.category;
  const pool = sourceByCat[cat] || [];
  const avail = pool.length - catIndex[cat];
  const take = Math.min(needed, Math.max(0, avail));
  
  if (take <= 0) {
    console.log(`\n${level}: needs ${needed} but no ${cat} words left!`);
    continue;
  }
  
  const start = catIndex[cat];
  const end = start + take;
  const picked = pool.slice(start, end);
  catIndex[cat] = end;
  
  injections[level] = picked.map(p => p.entry);
  console.log(`\n${level}: current=${info.current}, need ${needed}, taking ${take} from ${cat}`);
}

let totalInjected = 0;
for (const [level, words] of Object.entries(injections)) {
  if (!words) continue;
  totalInjected += words.length;
}
console.log(`\nTotal to inject: ${totalInjected}`);

if (totalInjected === 0) {
  console.log('No words to inject!');
  process.exit(1);
}

// ===== 10. Modify rutaHelpers.jsx =====
let modified = c;
let totalActual = 0;

for (const [level, words] of Object.entries(injections)) {
  if (!words || words.length === 0) continue;
  
  const regex = new RegExp(`(addLevel\\('${level}',\\[)([^]*?)(\\]);`);
  const match = modified.match(regex);
  
  if (!match) {
    console.log(`Could not find addLevel('${level}')`);
    continue;
  }
  
  const prefix = match[1];
  const body = match[2];
  const suffix = match[3];
  
  const newBody = body + '\n' + words.join(',\n') + '\n';
  const replacement = prefix + newBody + suffix;
  
  modified = modified.replace(regex, replacement);
  totalActual += words.length;
  console.log(`✅ ${level}: +${words.length} words injected`);
}

// Write back
fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log(`\n✅ Total injected: ${totalActual} words`);
console.log('File updated!');