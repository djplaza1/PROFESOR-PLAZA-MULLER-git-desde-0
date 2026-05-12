const fs = require('fs');
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');
const s = c.indexOf('function addLevel');
const e = c.indexOf('// FIN', s);
const sec = c.substring(s, e);

// Count addLevel openings by level name
const levels = sec.match(/addLevel\('[A-Z0-9.]+'/g) || [];
console.log('Niveles:', levels.length);

// Count word arrays with all possible types: n, v, adj, adv, prep, conj, pron, num
const wordEntries = sec.match(/\[\s*'[A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+'\s*,\s*'[^']+'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'[a-z]+'\s*\]/g) || [];
console.log('Palabras reales:', wordEntries.length);

// Count per level
const levelCounts = {};
let currentLevel = '';
sec.split('\n').forEach(line => {
  const lm = line.match(/addLevel\('([^']+)'/);
  if (lm) currentLevel = lm[1];
  if (!levelCounts[currentLevel]) levelCounts[currentLevel] = 0;
  
  // Count word arrays in this line - match any word type
  const matches = line.match(/\[\s*'[A-Za-zäöüßÄÖÜ][^']*'\s*,\s*'[^']+'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'[a-z]+'\s*\]/g);
  if (matches && currentLevel) levelCounts[currentLevel] += matches.length;
});

let total = 0;
Object.keys(levelCounts).sort().forEach(k => {
  console.log(`  ${k}: ${levelCounts[k]} palabras`);
  total += levelCounts[k];
});
console.log('TOTAL:', total, 'palabras');