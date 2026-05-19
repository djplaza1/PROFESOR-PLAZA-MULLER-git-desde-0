const fs = require("fs");
let loader = fs.readFileSync("src/data/phrasesBankLoader.js", "utf8");
// Reemplazar la línea comentada de A1.2 por la versión activa y añadir A2.1, A2.2
loader = loader.replace(
  "// { level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' }",
  "{ level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' },\n  { level: 'A2.1', file: 'src/data/phrasesBank_A2.1.json' },\n  { level: 'A2.2', file: 'src/data/phrasesBank_A2.2.json' }"
);
fs.writeFileSync("src/data/phrasesBankLoader.js", loader, "utf8");
console.log("Loader actualizado con A1.2, A2.1 y A2.2.");