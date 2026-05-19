const fs = require("fs");
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
const start = pg.indexOf("generateExercises(");
const end = pg.indexOf("generateLesson", start);
const func = pg.substring(start, end > 0 ? end : start + 3000);
console.log(func);