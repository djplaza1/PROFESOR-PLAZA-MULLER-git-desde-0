const fs = require("fs");
const content = fs.readFileSync("src/data/vocabData.js", "utf8");
const match = content.match(/addLevel\('A2\.2',\s*\[([\s\S]*?)\]\s*\)/);
if (!match) { console.error("Nivel A2.2 no encontrado"); process.exit(1); }
const words = eval("[" + match[1] + "]");
const start = 600;
const end = Math.min(start + 50, words.length);
words.slice(start, end).forEach((e, i) => {
  console.log((start + i + 1) + ": \"" + e[0] + "\" (" + e[1] + ") [" + (e[2] || "sin gen") + "] " + (e[4] || "n"));
});
console.log("Mostrando palabras " + (start+1) + " a " + end + " de " + words.length);