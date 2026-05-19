const fs = require("fs");
const file = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Buscar cómo se exporta el generador
const exportLines = file.match(/window\.Muller\.\w+\s*=\s*|PhraseGenerator\s*=\s*|module\.exports/g) || [];
console.log("Posibles exportaciones en phraseGenerator.js:");
console.log(exportLines);
// Buscar la definición del generador (nombre de clase o función constructora)
const classMatch = file.match(/class\s+(\w+)\s*\{/);
if (classMatch) console.log("Clase encontrada:", classMatch[0]);
const constructorMatch = file.match(/function\s+(\w+)\s*\(/);
if (constructorMatch) console.log("Función constructora:", constructorMatch[0]);
// Ver si al final del archivo hay una asignación a window.Muller
const last1000 = file.slice(-1000);
const windowAssign = last1000.match(/window\.Muller\.\w+\s*=\s*new\s+\w+/g);
console.log("Asignación a window.Muller al final:", windowAssign);