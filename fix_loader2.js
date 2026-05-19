const fs = require("fs");
const loaderPath = "src/data/phrasesBankLoader.js";
let content = fs.readFileSync(loaderPath, "utf8");

const newArray = `const LEVEL_FILES = [
  { level: 'A1.1', file: 'src/data/phrasesBank_A1.1.json' },
  { level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' },
  { level: 'A2.1', file: 'src/data/phrasesBank_A2.1.json' },
  { level: 'A2.2', file: 'src/data/phrasesBank_A2.2.json' }
];`;

// Reemplazar todo el bloque const LEVEL_FILES = [...]; por el nuevo
content = content.replace(/const LEVEL_FILES\s*=\s*\[[\s\S]*?\];/, newArray);
fs.writeFileSync(loaderPath, content, "utf8");
console.log("Loader corregido.");