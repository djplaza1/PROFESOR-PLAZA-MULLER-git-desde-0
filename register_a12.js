const fs = require("fs");

// 1. Actualizar phrasesBankLoader.js
let loader = fs.readFileSync("src/data/phrasesBankLoader.js", "utf8");
// Insertar A1.2 antes de ']' en LEVEL_FILES (ya hay una entrada similar para A1.1)
const newEntry = "\n  { level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' },";
if (!loader.includes("A1.2")) {
  loader = loader.replace("const LEVEL_FILES = [", "const LEVEL_FILES = [" + newEntry);
  fs.writeFileSync("src/data/phrasesBankLoader.js", loader, "utf8");
  console.log("phrasesBankLoader.js actualizado.");
} else {
  console.log("phrasesBankLoader.js ya contenía A1.2.");
}

// 2. Actualizar levelConfig.js
let config = fs.readFileSync("src/features/ruta/levelConfig.js", "utf8");
// Reemplazar words: 1263 por words: 1274 (valor real) solo en el nivel A1.2
const oldLine = "words: 1263";
const newLine = "words: 1274";
if (config.includes(oldLine)) {
  config = config.replace(oldLine, newLine);
  fs.writeFileSync("src/features/ruta/levelConfig.js", config, "utf8");
  console.log("levelConfig.js actualizado: words: 1274");
} else {
  console.log("No se encontró 'words: 1263' en levelConfig.js. Revisa el archivo manualmente.");
}