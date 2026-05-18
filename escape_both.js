const fs = require("fs");
function escapeJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("Archivo no encontrado:", filePath);
    return;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const obj = JSON.parse(raw);
  const jsonStr = JSON.stringify(obj, null, 2);
  const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
  fs.writeFileSync(filePath, escaped, "utf8");
  console.log(`${filePath} escapado. Palabras: ${Object.keys(obj).length}`);
}
escapeJSON("src/data/phrasesBank_A2.1.json");
escapeJSON("src/data/phrasesBank_A2.2.json");