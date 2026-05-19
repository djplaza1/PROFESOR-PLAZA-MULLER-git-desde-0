const fs = require("fs");
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// 1. Quitar guion a correctEnding en el push del ejercicio
pg = pg.replace(/answer:\s*correctEnding/g, "answer: correctEnding.replace('-','')");

// 2. Cambiar el hint para que no revele la respuesta
const oldHint = '"Caso " + caseLabel + " (" + targetDet + "). Terminación: " + correctEnding';
const newHint = '"Caso " + caseLabel + " (" + targetDet + "). Escribe solo la terminación (sin guion)."';
pg = pg.replace(oldHint, newHint);

// 3. Cambiar el prompt para que no muestre el artículo objetivo (targetDet) si revela pistas?
// No, el prompt actual es correcto. Solo ajustamos el hint.

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("Generador de declinaciones corregido: respuesta sin guion, hint seguro.");