const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
const start = code.indexOf("generateFillInBlankExercises(");
if (start === -1) { console.log("Función no encontrada"); process.exit(1); }
// Encontrar el inicio del siguiente método (buscar ",  " o "},")
let end = code.indexOf("\n  },", start);
if (end === -1) end = code.indexOf("},\n", start);
if (end === -1) end = start + 2000;
console.log(code.substring(start, end));