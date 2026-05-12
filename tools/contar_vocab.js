const fs = require('fs');
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Count total words in addLevel() calls
const s = c.indexOf('function addLevel');
const rest = c.substring(s);

// Find each level block
const levelBlocks = rest.match(/addLevel\('([^']+)',\[([\s\S]*?)\]\s*\);/g);
if (!levelBlocks) {
  console.log('No level blocks found');
  process.exit(1);
}

let totalWords = 0;
let levelCounts = {};

for (const block of levelBlocks) {
  const nameMatch = block.match(/addLevel\('([^']+)'/);
  const levelName = nameMatch ? nameMatch[1] : 'unknown';
  
  // Count word arrays: ['word','...','...',...,'...']
  const wordMatches = block.match(/\[('[^']*','[^']*'[^\]]*)\]/g);
  const count = wordMatches ? wordMatches.length : 0;
  totalWords += count;
  levelCounts[levelName] = count;
}

console.log('=== VOCABULARIO ACTUAL EN addLevel() ===');
console.log('Total palabras:', totalWords);
console.log('');

const sortedNames = Object.keys(levelCounts).sort((a,b) => {
  const [l1, s1] = a.split('.');
  const [l2, s2] = b.split('.');
  const levelOrder = {A1:1,A2:2,B1:3,B2:4,C1:5,C2:6};
  if (levelOrder[l1] !== levelOrder[l2]) return levelOrder[l1] - levelOrder[l2];
  return parseFloat(s1) - parseFloat(s2);
});
for (const name of sortedNames) {
  console.log(`  ${name}: ${levelCounts[name]} palabras`);
}
console.log('\nPromedio:', Math.round(totalWords / Object.keys(levelCounts).length), 'palabras/nivel');