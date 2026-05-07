const fs = require('fs');

console.log('=== ARTICULOS.JSON ===');
const art = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
const levels = {};
art.forEach(e => { const l = e.level || 'UNKNOWN'; levels[l] = (levels[l] || 0) + 1; });
Object.keys(levels).sort().forEach(l => console.log('  ' + l + ': ' + levels[l]));
console.log('  TOTAL:', art.length);

console.log('\n=== VERBOS-DB.JSON ===');
const vb = JSON.parse(fs.readFileSync('src/data/verbos-db.json', 'utf8'));
console.log('  Type:', typeof vb, Array.isArray(vb) ? 'Length:' + vb.length : 'Keys:' + Object.keys(vb).slice(0,5).join(','));

console.log('\n=== VERBS-DB.JSON ===');
const vbs = JSON.parse(fs.readFileSync('src/data/verbs-db.json', 'utf8'));
console.log('  Type:', typeof vbs, Array.isArray(vbs) ? 'Length:' + vbs.length : 'Keys:' + Object.keys(vbs).slice(0,5).join(','));

console.log('\n=== VERBOS_CON_PREPOSICIONES.JSON ===');
const vp = JSON.parse(fs.readFileSync('src/data/verbos_con_preposiciones.json', 'utf8'));
console.log('  Type:', typeof vp, Array.isArray(vp) ? 'Length:' + vp.length : 'Keys:' + Object.keys(vp).slice(0,5).join(','));

console.log('\n=== PREPOSICIONES.JSON ===');
const pp = JSON.parse(fs.readFileSync('src/data/preposiciones.json', 'utf8'));
console.log('  Type:', typeof pp, Array.isArray(pp) ? 'Length:' + pp.length : 'Keys:' + Object.keys(pp).slice(0,5).join(','));

console.log('\n=== B1-B2-DATABASE.JSON ===');
const b12 = JSON.parse(fs.readFileSync('src/data/b1-b2-database.json', 'utf8'));
console.log('  Keys:', Object.keys(b12).join(','));
if (b12.b1 && b12.b1.vocabulario) console.log('  B1 vocab:', b12.b1.vocabulario.length);
if (b12.b2 && b12.b2.vocabulario) console.log('  B2 vocab:', b12.b2.vocabulario.length);