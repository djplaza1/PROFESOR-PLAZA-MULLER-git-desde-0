const fs = require("fs");
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Buscar la función generateExercises y ver cómo selecciona las palabras
const start = pg.indexOf("generateExercises(");
if (start === -1) { console.log("No se encontró generateExercises"); process.exit(1); }
const end = pg.indexOf("generateLesson", start);
const generateFunc = pg.substring(start, end !== -1 ? end : start + 2000);
console.log(generateFunc.substring(0, 1500));