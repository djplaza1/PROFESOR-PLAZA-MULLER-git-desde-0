const fs = require('fs');

console.log('=== ANÁLISIS DETALLADO DE VOCABULARIO ===\n');

// Helper para contar patrones en texto
function countPattern(text, pattern) {
  return (text.match(pattern) || []).length;
}

// ─── 1. RUTA HELPERS ───
console.log('══════════════ RUTA HELPERS ══════════════\n');
const ruta = fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');

// Badges
const badges = {};
(ruta.match(/badge:\s*['"]([^'"]+)['"]/g) || []).forEach(m => {
  const b = m.replace(/badge:\s*['"]/, '').replace(/['"]/, '');
  badges[b] = (badges[b]||0)+1;
});
console.log('Badges/lecciones:');
Object.keys(badges).sort().forEach(k => console.log('  '+k+': '+badges[k]));
console.log('Total lecciones: '+Object.values(badges).reduce((a,b)=>a+b,0));

// Contar palabras en lesson.words = [...]
// Buscar: words: [ '...', '...' ]
let wordCount = 0;
const wordsBlocks = ruta.match(/words\s*:\s*\[[\s\S]*?\]/g) || [];
wordsBlocks.forEach(block => {
  const items = block.match(/['"][^'"]+['"]/g) || [];
  wordCount += items.length;
});
console.log('Total palabras en arrays words: '+wordCount);

// Contar ítems en lessons directamente
const lessonCount = countPattern(ruta, /lecciones\s*:\s*\[/g);
const lessonItems = countPattern(ruta, /[{]\s*[Ii][Dd]\s*:/g);
console.log('Bloques lecciones: '+lessonCount+', items con id: '+lessonItems);

// ─── 2. MAESTROS CONTENIDO ───
console.log('\n══════════════ MAESTROS CONTENIDO ══════════════\n');
const niveles = ['A1_1','A1_2','A2_1','A2_2','B1_1','B1_2','B2_1','B2_2','C1'];
let totalPreguntas = 0, totalEjemplos = 0, totalFlashcards = 0, totalModuleCount = 0;

niveles.forEach(n => {
  try {
    const content = fs.readFileSync('src/features/maestros/contenido/contenido'+n+'.jsx','utf8');
    
    // Contar módulos (objetos con id:)
    const mods = countPattern(content, /\n\s*\{\s*\n\s*id:/g);
    // También puede ser en línea
    const modsInline = countPattern(content, /[{]\s*id:\s*['"][a-z0-9_]+['"]/g);
    const totalMods = Math.max(mods, modsInline);
    
    // Contar preguntas (frases con respuesta)
    const preguntas = countPattern(content, /["']frase["']\s*:/g);
    const respuestas = countPattern(content, /["']respuesta["']\s*:/g);
    
    // Contar ejemplos
    const ejemplos = countPattern(content, /["']ejemplos["']\s*:/g);
    const ejemplosItems = countPattern(content, /["']{2}\s*,/g); // ejemplo items dentro de arrays
    
    // Contar flashcards
    const flashcards = countPattern(content, /["']flashcards["']\s*:/g);
    const flashcardsItems = countPattern(content, /["']cara["']\s*:/g);
    
    // Contar tips
    const tips = countPattern(content, /["']tips["']\s*:/g);
    const tipsItems = countPattern(content, /["']{2}\s*,/g);
    
    totalPreguntas += preguntas;
    totalEjemplos += ejemplos;
    totalModuleCount += totalMods;
    totalFlashcards += flashcardsItems;
    
    console.log(n+':');
    console.log('  Módulos: '+totalMods+' | Preguntas(ejercicios): '+preguntas+' | Flashcards: '+flashcardsItems);
    console.log('  Respuestas: '+respuestas);
    
  } catch(e) {
    console.log(n+': ERROR - '+e.message);
  }
});
console.log('\nTOTAL Maestros: módulos='+totalModuleCount+', preguntas='+totalPreguntas+', flashcards='+totalFlashcards);

// ─── 3. ENTRENAMIENTO ───
console.log('\n══════════════ ENTRENAMIENTO ══════════════\n');
const art = fs.readFileSync('src/features/entrenamiento/entrenamientoHelpers.jsx','utf8');

// getDefaultArticlesData count
const defaultArtMatch = art.match(/getDefaultArticlesData[\s\S]*?(?=window\.Muller\.loadVerbPrepData)/);
let defaultArticles = 0;
if (defaultArtMatch) {
  defaultArticles = countPattern(defaultArtMatch[0], /\{ de\s*:/g);
}
console.log('getDefaultArticles(): '+defaultArticles+' palabras');

// DEFAULT_VERBPREP_DATA
const vpMatch = art.match(/DEFAULT_VERBPREP_DATA[\s\S]*?(?=window\.Muller\.loadPrepositionData)/);
let vp = 0;
if (vpMatch) {
  vp = countPattern(vpMatch[0], /\{ de\s*:/g);
}
console.log('DEFAULT_VERBPREP_DATA: '+vp+' verbos+preposición');

// DEFAULT_PREP_DATA
const prepMatch = art.match(/DEFAULT_PREP_DATA\s*\|\|\s*\[([\s\S]*?)\];/);
let prep = 0;
if (prepMatch) {
  prep = countPattern(prepMatch[1], /\{ de\s*:/g);
}
console.log('DEFAULT_PREP_DATA: '+prep+' preposiciones');

// DEFAULT_ARTICLES inline
const inlineArtMatch = art.match(/DEFAULT_ARTICLES\s*\|\|\s*\[([\s\S]*?)\];/);
let inlineArt = 0;
if (inlineArtMatch) {
  inlineArt = countPattern(inlineArtMatch[1], /\{ de\s*:/g);
}
console.log('DEFAULT_ARTICLES (inline fallback): '+inlineArt+' artículos');

// findArticleRule endings count
const rulesCount = countPattern(art, /if\s*\(noun\.endsWith/g);
console.log('findArticleRule endings: '+rulesCount+' reglas');

// ─── 4. DICCIONARIO ───
console.log('\n══════════════ DICCIONARIO ══════════════\n');
const dict = fs.readFileSync('src/data/diccionario/index.js','utf8');
const dictEntries = countPattern(dict, /["']de["']\s*:/g);
console.log('Diccionario entries: '+dictEntries);

// ─── 5. RutaPanel ───
console.log('\n══════════════ RUTAPANEL ══════════════\n');
const panel = fs.readFileSync('src/features/ruta/RutaPanel.jsx','utf8');
const panelLessons = countPattern(panel, /leccion\s*:/g);
const panelWords = countPattern(panel, /["']de["']\s*:/g);
console.log('Lecciones directas: '+panelLessons);
console.log('Palabras directas: '+panelWords);

// ─── 6. APP.JSX ───
console.log('\n══════════════ APP.JSX ══════════════\n');
const app = fs.readFileSync('src/app.jsx','utf8');
const appRoutes = countPattern(app, /ruta\s*:/g);
console.log('Referencias a ruta: '+appRoutes);

// ─── 7. RESUMEN ───
console.log('\n══════════════ RESUMEN TOTAL ══════════════\n');
console.log('FUENTE                    | CANTIDAD');
console.log('─'.repeat(55));
console.log('Ruta lecciones            | '+Object.values(badges).reduce((a,b)=>a+b,0));
console.log('Ruta palabras arrays      | '+wordCount);
console.log('Maestros preguntas        | '+totalPreguntas);
console.log('Artículos default         | '+defaultArticles);
console.log('Artículos inline fallback | '+inlineArt);
console.log('Verbos+preposición        | '+vp);
console.log('Preposiciones             | '+prep);
console.log('Diccionario               | '+dictEntries);
console.log('─'.repeat(55));
const granTotal = wordCount + totalPreguntas + defaultArticles + inlineArt + vp + prep + dictEntries;
console.log('GRAN TOTAL (ítems)        | '+granTotal);