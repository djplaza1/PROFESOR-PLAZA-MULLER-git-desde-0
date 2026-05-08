/**
 * FASE 0 - Expansión de vocabulario desde fuentes de datos existentes
 * 
 * OBJETIVO: Llevar A2.3, A2.4, B1.3, B1.4, B2.4, C1.2 a sus objetivos
 * usando el vocabulario REAL de articulos.json (3.577 sustantivos con nivel)
 * 
 * Estrategia:
 * 1. Leer todos los sustantivos de articulos.json con su nivel asignado
 * 2. Leer las palabras EXISTENTES en rutaHelpers.jsx para evitar duplicados
 * 3. Extraer las que AÚN NO están en la ruta
 * 4. Distribuirlas en los niveles que más necesitan
 */

const fs = require('fs');
const path = require('path');

// ─── 1. Leer rutaHelpers.jsx actual ───────────────────────────────────────
const rutaPath = 'src/features/ruta/rutaHelpers.jsx';
const rutaContent = fs.readFileSync(rutaPath, 'utf8');

// ─── 2. Leer articulos.json ───────────────────────────────────────────────
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
console.log(`📦 articulos.json: ${articulos.length} sustantivos`);

// ─── 3. Extraer TODAS las palabras alemanas existentes en la ruta ─────────
// Buscamos ['alemán','...'] en todos los addLevel()
const existingGermanWords = new Set();
const wordRegex = /\['([^']+)','[^']*','[^']*','[^']*','[^']*'\]/g;
let match;
while ((match = wordRegex.exec(rutaContent)) !== null) {
  existingGermanWords.add(match[1].toLowerCase().trim());
}
console.log(`📝 Palabras existentes en ruta: ${existingGermanWords.size}`);

// ─── 4. Verificar qué sustantivos de articulos.json YA están ──────────────
// Extraer el alemán (sin artículo)
const articuloRegex = /^(der|die|das)\s+(.+)$/i;

const newNouns = { A1: [], A2: [], B1: [], B2: [], C1: [] };
let alreadyExists = 0;
let noArticle = 0;

for (const item of articulos) {
  const de = item.de || '';
  const es = item.es || '';
  const level = item.level || 'B1';
  
  // Extraer sustantivo sin artículo
  const am = de.match(articuloRegex);
  let noun, article;
  if (am) {
    article = am[1].toLowerCase();
    noun = am[2].trim();
  } else {
    noun = de.trim();
    article = '';
    noArticle++;
  }
  
  if (!noun) continue;
  
  // Verificar si ya existe
  if (existingGermanWords.has(noun.toLowerCase())) {
    alreadyExists++;
    continue;
  }
  
  if (!newNouns[level]) continue; // solo A1, A2, B1, B2, C1
  
  newNouns[level].push({
    de: noun,
    es: es,
    article: article,
    level: level
  });
}

console.log(`\n🔍 Sustantivos que ya existen: ${alreadyExists}`);
console.log(`📊 Nuevos sustantivos disponibles por nivel:`);
let totalNew = 0;
for (const lvl of ['A1', 'A2', 'B1', 'B2', 'C1']) {
  console.log(`   ${lvl}: ${newNouns[lvl].length} nuevos`);
  totalNew += newNouns[lvl].length;
}
console.log(`   TOTAL: ${totalNew} nuevos sustantivos`);
console.log(`   Sin artículo detectable: ${noArticle}`);

// ─── 5. Preparar palabras para cada nivel de la ruta ───────────────────────
// Mapa: nivel ruta -> palabras a añadir
const wordsToAdd = {
  // A2 necesita en A2.3 y A2.4
  'A2.3': [],
  'A2.4': [],
  // B1 necesita en B1.3 y B1.4
  'B1.3': [],
  'B1.4': [],
  // B2 necesita en B2.4
  'B2.4': [],
  // C1 necesita en C1.2
  'C1.2': [],
};

// Distribuir A2 nouns entre A2.3 y A2.4
const a2Pool = [...newNouns.A2];
for (let i = 0; i < a2Pool.length && i < 200; i++) {
  const target = i % 2 === 0 ? 'A2.3' : 'A2.4';
  wordsToAdd[target].push(a2Pool[i]);
}

// Distribuir B1 nouns entre B1.3 y B1.4
const b1Pool = [...newNouns.B1];
for (let i = 0; i < b1Pool.length && i < 600; i++) {
  const target = i % 2 === 0 ? 'B1.3' : 'B1.4';
  wordsToAdd[target].push(b1Pool[i]);
}

// B2 nouns para B2.4
const b2Pool = [...newNouns.B2];
for (let i = 0; i < b2Pool.length && i < 200; i++) {
  wordsToAdd['B2.4'].push(b2Pool[i]);
}

// C1 nouns para C1.2
const c1Pool = [...newNouns.C1];
for (let i = 0; i < c1Pool.length && i < 200; i++) {
  wordsToAdd['C1.2'].push(c1Pool[i]);
}

// A1 si sobra, añadir a A1.3, A1.4
if (newNouns.A1.length > 0) {
  const a1Pool = [...newNouns.A1];
  wordsToAdd['A1.3'] = wordsToAdd['A1.3'] || [];
  wordsToAdd['A1.4'] = wordsToAdd['A1.4'] || [];
  for (let i = 0; i < a1Pool.length && i < 100; i++) {
    const target = i % 2 === 0 ? 'A1.3' : 'A1.4';
    wordsToAdd[target].push(a1Pool[i]);
  }
}

console.log(`\n📋 Palabras a inyectar por nivel:`);
for (const [lvl, words] of Object.entries(wordsToAdd)) {
  console.log(`   ${lvl}: ${words.length} palabras`);
}

// ─── 6. Generar el código a inyectar ───────────────────────────────────────
// Formato: ['de','es','art','plural','tipo']
// Para sustantivos: ['noun','traducción','artículo','-','n']

// Ordenar niveles para inyección (asegurar que aparecen en orden)
const levelOrder = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4',
  'B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'];

// Para cada nivel, generar el código de inyección
console.log('\n🔧 GENERANDO CÓDIGO DE INYECCIÓN');
console.log('========================================\n');

for (const lvl of levelOrder) {
  const words = wordsToAdd[lvl];
  if (!words || words.length === 0) continue;
  
  const codeLines = words.map(w => {
    if (w.article) {
      // Sustantivo con artículo
      const art = `'${w.article}'`;
      return `  [${JSON.stringify(w.de)},${JSON.stringify(w.es)},${art},'-','n'],`;
    } else {
      // Sin artículo detectable
      return `  [${JSON.stringify(w.de)},${JSON.stringify(w.es)},'','-','n'],`;
    }
  });
  
  console.log(`// --- ${lvl}: +${words.length} palabras ---`);
  console.log(codeLines.join('\n'));
  console.log('');
}

// ─── 7. GENERAR el script de inyección real ───────────────────────────────
// En lugar de modificar a mano, generamos un script que MODIFIQUE rutaHelpers.jsx

let newContent = rutaContent;
let totalInjected = 0;

for (const lvl of levelOrder) {
  const words = wordsToAdd[lvl];
  if (!words || words.length === 0) continue;
  
  // Buscar el addLevel('LVL', [ y añadir ANTES del ]);
  const searchStr = `addLevel('${lvl}', [`;
  const startIdx = newContent.indexOf(searchStr);
  
  if (startIdx === -1) {
    console.log(`⚠ No se encontró addLevel('${lvl}')`);
    continue;
  }
  
  // Encontrar el cierre ]);
  // Buscar desde startIdx hasta encontrar el primer ]); que cierra este bloque
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < newContent.length; i++) {
    const ch = newContent[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0 && newContent[i+1] === ')' && newContent[i+2] === ';') {
        endIdx = i + 3;
        break;
      }
    }
  }
  
  if (endIdx === -1) {
    console.log(`⚠ No se pudo encontrar cierre para addLevel('${lvl}')`);
    continue;
  }
  
  // Generar el bloque de nuevas palabras
  const newWordsBlock = words.map(w => {
    if (w.article) {
      return `  ['${w.de}','${w.es}','${w.article}','-','n'],`;
    } else {
      return `  ['${w.de}','${w.es}','','-','n'],`;
    }
  }).join('\n');
  
  // Insertar antes del ]);
  const insertPoint = endIdx - 3; // justo antes de ]);
  // Añadir un newline antes
  newContent = newContent.substring(0, insertPoint) + '\n' + newWordsBlock + '\n' + newContent.substring(insertPoint);
  totalInjected += words.length;
  
  console.log(`✅ ${lvl}: +${words.length} palabras inyectadas`);
}

console.log(`\n📊 TOTAL: ${totalInjected} palabras añadidas`);

// ─── 8. Guardar ────────────────────────────────────────────────────────────
fs.writeFileSync(rutaPath, newContent, 'utf8');
console.log(`✅ rutaHelpers.jsx actualizado`);
console.log(`\n📈 Tamaño nuevo: ${newContent.length} bytes (+${newContent.length - rutaContent.length})`);

// ─── 9. Verificar ──────────────────────────────────────────────────────────
console.log('\n📊 CORRIENDO CONTEO FINAL...');
require('./contar_vocab_final.js');