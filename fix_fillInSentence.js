const fs = require("fs");

// 1. Corregir phraseGenerator.js para que fillInSentence siempre tenga sentenceWithBlank
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// Localizar la función generateFillInBlankExercises y asegurar que asigna sentenceWithBlank
// Primero, buscar si ya existe la propiedad en el retorno
if (!pg.includes("sentenceWithBlank:")) {
  // Buscar la línea donde se crea el objeto de fillInSentence dentro de generateFillInBlankExercises
  const fillFuncStart = pg.indexOf("generateFillInBlankExercises(");
  const fillFuncEnd = pg.indexOf("generateAdjDeclExercises", fillFuncStart + 1);
  let fillFunc = pg.substring(fillFuncStart, fillFuncEnd > 0 ? fillFuncEnd : fillFuncStart + 1500);
  
  // Buscar dónde se hace el push del ejercicio tipo fillInSentence
  const pushLine = "type: \"fillInSentence\"";
  if (fillFunc.includes(pushLine)) {
    // Reemplazar para añadir la propiedad si no existe
    pg = pg.replace(
      /type:\s*"fillInSentence"/g,
      "type: \"fillInSentence\", sentenceWithBlank: sentenceWithBlank || \"___\""
    );
    console.log("Propiedad sentenceWithBlank asegurada en fillInSentence.");
  } else {
    console.log("No se encontró tipo fillInSentence en generateFillInBlankExercises.");
  }
}

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");

// 2. Hacer que el render de fillInSentence en LessonView.jsx sea defensivo
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// Buscar el fragmento que hace split y añadir un operador opcional
const oldSplit = `ex.sentenceWithBlank.split("___")`;
const newSplit = `(ex.sentenceWithBlank || "___").split("___")`;
if (lv.includes(oldSplit)) {
  lv = lv.replace(oldSplit, newSplit);
  console.log("Render de fillInSentence asegurado contra undefined.");
} else {
  console.log("No se encontró sentenceWithBlank.split en LessonView. Revisa manualmente.");
}

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("Correcciones aplicadas.");