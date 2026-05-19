const fs = require("fs");

// 1. Corregir LessonView.jsx (bucle y placeholder)
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// a) Excluir repasos acumulativos del failedStack
const oldFailed = "setFailedStack(prev => [...prev, ex]);";
const newFailed = "if (!ex.isCumulativeReview) { setFailedStack(prev => [...prev, ex]); }";
lv = lv.replace(oldFailed, newFailed);

// b) Ajustar condición de repaso para ignorar acumulativos
const oldReview = "if (!reviewMode && failedStack.length > 0) {";
const newReview = "if (!reviewMode && failedStack.filter(e => !e.isCumulativeReview).length > 0) {";
lv = lv.replace(oldReview, newReview);

// c) Placeholder de declinación (sin template literal)
const oldPlaceholder = 'placeholder="Forma correcta del adjetivo"';
const newPlaceholder = 'placeholder="Solo la terminaci\u00F3n (e, en, em, es, er)"';
lv = lv.replace(oldPlaceholder, newPlaceholder);

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("LessonView.jsx corregido.");

// 2. Corregir phraseGenerator.js: quitar guiones en respuestas de declinación
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// Buscar generateAdjDeclExercises
const adjStart = pg.indexOf("generateAdjDeclExercises(");
if (adjStart !== -1) {
  const adjEnd = pg.indexOf("generateArticleExercises", adjStart);
  let adjFunc = pg.substring(adjStart, adjEnd > 0 ? adjEnd : adjStart + 3000);
  
  // Reemplazar la línea donde se asigna answer para quitar guion inicial y espacios
  // Patrón típico: answer: "-en"  o answer: variable con guion
  adjFunc = adjFunc.replace(/answer:\s*"-(e[nmrs]?)"/g, 'answer: "$1"');
  adjFunc = adjFunc.replace(/answer:\s*`\$\{.*?\}`/g, (match) => {
    // Si es template literal, intentar eliminar guiones
    return match.replace(/-/g, '');
  });
  // También eliminar guiones en answer que vengan de variables
  adjFunc = adjFunc.replace(/answer:\s*(\w+)\s*\?\s*`-\$\{(\w+)\}`\s*:\s*`\$\{(\w+)\}`/g, 'answer: $1 ? $3 : $3');
  
  // Reconstruir el archivo
  pg = pg.substring(0, adjStart) + adjFunc + pg.substring(adjEnd > 0 ? adjEnd : adjStart + 3000);
}

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("phraseGenerator.js ajustado (declinaciones sin guion).");