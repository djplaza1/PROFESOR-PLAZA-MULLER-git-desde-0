const fs = require("fs");
const content = fs.readFileSync("src/data/vocabData.js", "utf8");
const match = content.match(/addLevel\('A2\.1',\s*\[([\s\S]*?)\]\s*\)/);
if (!match) { console.error("Nivel A2.1 no encontrado"); process.exit(1); }
const words = eval("[" + match[1] + "]");
const start = 350;
const end = words.length;
words.slice(start).forEach((e, i) => {
  console.log((start + i + 1) + ": \"" + e[0] + "\" (" + e[1] + ") [" + (e[2] || "sin gen") + "] " + (e[4] || "n"));
});
console.log("Palabras mostradas:", start + 1, "a", words.length, "de", words.length);