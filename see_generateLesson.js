const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Buscar generateLesson y su contenido
const start = code.indexOf("generateLesson(levelId, lessonIdx) {");
if (start === -1) { console.log("generateLesson no encontrada"); process.exit(1); }
const end = code.indexOf("window.PhraseGenerator", start);
console.log(code.substring(start, end > 0 ? end : start + 800));