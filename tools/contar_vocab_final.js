const fs = require('fs');
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');
const s = c.indexOf('function addLevel');
const e = c.indexOf('// FIN', s);
const sec = c.substring(s, e);

// Count addLevel openings by level name
const levels = sec.match(/addLevel\('[A-Z0-9.]+'/g) || [];
console.log('Niveles:', levels.length);

// Count word arrays: pattern ['word','trans',...]
const words = sec.match(/\[('[^']+','[^']+'[^\]]*)\]/g) || [];
// Filter out addLevel() calls and lesson arrays
const realWords = words.filter(w => {
  // A word has at minimum: ['de','es','type']
  const parts = w.match(/'[^']+'/g);
  return parts && parts.length >= 3 && parts[2] !== 'A1' && !parts[0].includes('A') && !parts[0].includes('B') && !parts[0].includes('C');
});

// More accurate: count arrays that start with a German word
const wordEntries = sec.match(/\[\s*'[A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ -]+'\s*,\s*'[^']+'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'[nva]'\s*\]/g) || [];
console.log('Palabras reales:', wordEntries.length);

// Count per level
const levelCounts = {};
let currentLevel = '';
sec.split('\n').forEach(line => {
  const lm = line.match(/addLevel\('([^']+)'/);
  if (lm) currentLevel = lm[1];
  if (!levelCounts[currentLevel]) levelCounts[currentLevel] = 0;
  
  // Count word arrays in this line
  const matches = line.match(/\[\s*'[A-Za-zäöüßÄÖÜ][^']*'\s*,\s*'[^']+'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'[^']+'\s*\]/g);
  if (matches && currentLevel) levelCounts[currentLevel] += matches.length;
});

let total = 0;
Object.keys(levelCounts).sort().forEach(k => {
  console.log(`  ${k}: ${levelCounts[k]} palabras`);
  total += levelCounts[k];
});
console.log('TOTAL:', total, 'palabras');