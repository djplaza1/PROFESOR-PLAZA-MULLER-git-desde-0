const fs = require('fs');
const path = require('path');

const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');
const content = fs.readFileSync(RUTA_FILE, 'utf8');

// Estrategia: extraer todos los addLevel() y contar palabras únicas
const start = content.indexOf('function addLevel');
const end = content.indexOf('// 2. IRRREGULÄRE', start);
const section = content.substring(start, end);

// Encontrar cada bloque addLevel
const addLevelRegex = /addLevel\('([^']+)',\[([\s\S]*?)\];/g;
let match;
const levels = {};
let totalWords = 0;

while ((match = addLevelRegex.exec(section)) !== null) {
  const level = match[1];
  const arrayContent = match[2];
  
  // Extraer todas las palabras [de,es,art,plural,tipo]
  const entries = arrayContent.match(/\[([^\]]+)\]/g) || [];
  const words = [];
  
  entries.forEach(entry => {
    // Limpiar y parsear
    const parts = entry.match(/'([^']*)'/g);
    if (parts && parts.length >= 5) {
      words.push(parts.map(p => p.replace(/'/g, '')));
    }
  });
  
  levels[level] = words.length;
  totalWords += words.length;
}

console.log('=== VOCABULARIO EN addLevel() ===');
Object.keys(levels).sort().forEach(k => {
  console.log(`  ${k}: ${levels[k]} palabras`);
});
console.log(`\nTOTAL: ${totalWords} palabras`);

// Contar lecciones
const levelsStart = content.indexOf('window.MULLER_RUTA_LEVELS');
const levelsEnd = content.indexOf('R.IRRVERBS', levelsStart);
if (levelsStart >= 0) {
  const levelsSection = content.substring(levelsStart, levelsEnd);
  const lessonMatches = levelsSection.match(/-l\d+'/g);
  const levelMatches = levelsSection.match(/id:'[a-z]\d-\d'/g);
  console.log(`\nLecciones: ${lessonMatches ? lessonMatches.length : 0}`);
  console.log(`Niveles: ${levelMatches ? levelMatches.length : 0}`);
}

// Contar vocabulario de maestros
console.log('\n=== LEYENDO MAESTROS ===');
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

maestroFiles.forEach(f => {
  const p = path.join(__dirname, '..', f);
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    // Extraer palabras alemanas (strings after 'de:' or inside arrays)
    const deWords = c.match(/['"](\w[\wäöüßÄÖÜ-]+)['"]\s*[,}]/g);
    const count = deWords ? deWords.length : 0;
    console.log(`  ${f}: ~${count} palabras\nalemanas`);
  } else {
    console.log(`  ${f}: NO EXISTE`);
  }
});