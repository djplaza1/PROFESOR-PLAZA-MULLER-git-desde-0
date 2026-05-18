const fs = require("fs");
const content = fs.readFileSync("src/data/vocabData.js", "utf8");
const match = content.match(/addLevel\('A1\.2',\s*\[([\s\S]*?)\]\s*\)/);
if (!match) { console.error("Nivel no encontrado"); process.exit(1); }
const words = eval("[" + match[1] + "]");
console.log("Palabras 151 a 200 del nivel A1.2:");
words.slice(150, 200).forEach((e, i) => {
  console.log((i+151) + ": \"" + e[0] + "\" (" + e[1] + ") [" + (e[2] || "sin gen") + "]");
});