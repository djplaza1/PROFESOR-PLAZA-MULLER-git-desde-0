const fs = require("fs");
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
const start = pg.indexOf("getPhrasesForLevel");
const end = pg.indexOf("},", start);
console.log(pg.substring(start, end > start ? end + 2 : start + 500));