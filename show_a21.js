const fs = require("fs");
const content = fs.readFileSync("src/data/vocabData.js", "utf8");
const match = content.match(/addLevel\('A2\.1',\s*\[([\s\S]*?)\]\s*\)/);
if (!match) { console.error("Nivel A2.1 no encontrado"); process.exit(1); }
const words = eval("[" + match[1] + "]");
words.slice(0, 50).forEach((e, i) => {
  console.log((i+1) + ": \"" + e[0] + "\" (" + e[1] + ") [" + (e[2] || "sin gen") + "] " + (e[4] || "n"));
});
console.log("Total palabras:", words.length);