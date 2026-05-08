const fs = require('fs');
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Find each addLevel block and count actual words inside it
const levels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4',
                'B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4',
                'C1.1','C1.2'];

let total = 0;
levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(c);
  if (!match) { console.log(`${lvl}: NOT FOUND`); return; }
  
  const start = match.index;
  // Find the matching ]); that ends this block
  const after = c.substring(start + match[0].length);
  let depth = 1;
  let end = -1;
  for (let i = 0; i < after.length; i++) {
    if (after[i] === '[') depth++;
    else if (after[i] === ']') {
      depth--;
      if (depth === 0) { end = start + match[0].length + i + 1; break; }
    }
  }
  
  if (end === -1) { console.log(`${lvl}: END NOT FOUND`); return; }
  
  const block = c.substring(start, end);
  // Count entries: pattern ['word',...
  const entries = block.match(/\[\s*'[A-Za-zäöüßÄÖÜ][^']*'/g) || [];
  const words = entries.filter(e => {
    const p = e.match(/'([^']+)'/);
    return p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1]);
  });
  
  console.log(`${lvl}: ${words.length}`);
  total += words.length;
});
console.log(`\nTOTAL: ${total}`);