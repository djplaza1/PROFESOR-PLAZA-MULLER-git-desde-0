const fs = require("fs");
const content = fs.readFileSync("src/data/vocabData.js", "utf8");
const match = content.match(/addLevel\('A1\.2',\s*\[([\s\S]*?)\]\s*\)/);
if (!match) { console.error("Nivel no encontrado"); process.exit(1); }
const words = eval("[" + match[1] + "]");
console.log("Palabras 1301 a " + words.length + " del nivel A1.2:");
words.slice(1300).forEach((e, i) => {
  console.log((i+1301) + ": \"" + e[0] + "\" (" + e[1] + ") [" + (e[2] || "sin gen") + "]");
});
console.log("Total esperado:", words.length);