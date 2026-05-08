const fs = require('fs');
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Find section between first addLevel call and // FIN
const s = c.indexOf('function addLevel');
const e = c.indexOf('// FIN', s);
const sec = c.substring(s, e);

// Count word arrays - pattern like ['word','trans',...,'type']
let count = 0;
const wordRegex = /\[\s*['"][^'"]+['"]\s*,\s*['"][^'"]+['"]/g;
let m;
while ((m = wordRegex.exec(sec)) !== null) count++;
console.log('Total word arrays in addLevel section:', count);

// Count by level
const levels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4','B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'];
levels.forEach(level => {
  const escaped = level.replace('.', '\\.');
  const blockRegex = new RegExp(`addLevel\\('${escaped}'[^]*?\\]\\);`, 'g');
  let total = 0;
  let block;
  while ((block = blockRegex.exec(sec)) !== null) {
    const blockContent = block[0];
    let cnt = 0;
    const wr = /\[\s*['"][^'"]+['"]\s*,\s*['"][^'"]+['"]/g;
    let wm;
    while ((wm = wr.exec(blockContent)) !== null) cnt++;
    total += cnt;
  }
  console.log(`${level}: ${total} palabras`);
});

// Total
let totalAll = 0;
const br = /\[\s*['"][^'"]+['"]\s*,\s*['"][^'"]+['"]/g;
while ((m = br.exec(sec)) !== null) totalAll++;
console.log(`\nTOTAL: ${totalAll} palabras`);