const fs = require("fs");
const path = "src/data/phrasesBank_A2.1.json";
if (!fs.existsSync(path)) {
  console.error("El archivo phrasesBank_A2.1.json no existe.");
  process.exit(1);
}
const raw = fs.readFileSync(path, "utf8");
const obj = JSON.parse(raw);
const jsonStr = JSON.stringify(obj, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync(path, escaped, "utf8");
console.log("A2.1 escapado correctamente. Palabras:", Object.keys(obj).length);