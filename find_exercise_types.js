const fs = require("fs");
const file = fs.readFileSync("src/features/ruta/exerciseTypes.js", "utf8");
const matches = file.matchAll(/type:\s*['"]([^'"]+)['"]/g);
const types = [];
for (const m of matches) { types.push(m[1]); }
console.log("Tipos de ejercicios encontrados en exerciseTypes.js:", [...new Set(types)]);