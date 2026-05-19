const fs = require("fs");
const content = fs.readFileSync("src/data/phrasesBankLoader.js", "utf8");
const match = content.match(/const LEVEL_FILES\s*=\s*\[([\s\S]*?)\];/);
if (match) {
  console.log("--- BLOQUE ACTUAL ---");
  console.log(match[0]);
} else {
  console.log("No se encontró LEVEL_FILES");
}