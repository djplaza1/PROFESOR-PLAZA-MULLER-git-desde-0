const fs = require("fs");
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
const start = pg.indexOf("generateAdjDeclExercises(");
if (start === -1) { console.log("Función no encontrada"); process.exit(1); }
const end = pg.indexOf("generateArticleExercises", start);
console.log(pg.substring(start, end > 0 ? end : start + 3000));