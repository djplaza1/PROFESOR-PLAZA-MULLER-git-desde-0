const fs = require("fs");

// 1. Corregir el generador para que cada lección use palabras diferentes
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// Modificar la línea que selecciona newLessonWords
const oldLine = "const newLessonWords = newWordsPool.slice(0, newCount);";
const newLine = "const startIdx = (lessonIdx * wordsPerLesson) % newWordsPool.length;\n  const newLessonWords = newWordsPool.slice(startIdx, startIdx + newCount);";
if (pg.includes(oldLine)) {
  pg = pg.replace(oldLine, newLine);
  console.log("Offset aplicado a newLessonWords.");
} else {
  console.log("No se encontró la línea de newLessonWords. Revisa manualmente.");
}

// Guardar generador actualizado
fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");

// 2. Añadir parámetro de versión en index.html para que el navegador recargue phraseGenerator.js
let index = fs.readFileSync("index.html", "utf8");
if (index.includes("phraseGenerator.js") && !index.includes("phraseGenerator.js?v=2")) {
  index = index.replace("phraseGenerator.js", "phraseGenerator.js?v=2");
  fs.writeFileSync("index.html", index, "utf8");
  console.log("Versión añadida a phraseGenerator.js en index.html.");
} else {
  console.log("Ya tiene versión o no se encontró phraseGenerator.js.");
}