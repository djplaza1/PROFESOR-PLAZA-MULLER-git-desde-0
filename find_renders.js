const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// Buscar patrones de renderizado como ex.type === '...' ? (...) : 
const regex = /ex\.type\s*===\s*'([^']+)'\s*\?/g;
let match;
const typesFound = [];
while ((match = regex.exec(code)) !== null) {
  typesFound.push(match[1]);
}
console.log("Tipos con render ternario:", [...new Set(typesFound)]);

// Buscar patrones como {ex.type === '...' && (
const regex2 = /\{ex\.type\s*===\s*'([^']+)'\s*&&\s*\(/g;
const typesFound2 = [];
while ((match = regex2.exec(code)) !== null) {
  typesFound2.push(match[1]);
}
console.log("Tipos con render &&:", [...new Set(typesFound2)]);

// Buscar ex.type === '...') return (
const regex3 = /ex\.type\s*===\s*'([^']+)'\s*\)\s*return\s*\(/g;
const typesFound3 = [];
while ((match = regex3.exec(code)) !== null) {
  typesFound3.push(match[1]);
}
console.log("Tipos con return:", [...new Set(typesFound3)]);

// Mostrar un bloque de ejemplo (el de 'choose' si existe)
const chooseBlock = code.match(/ex\.type\s*===\s*'choose'[\s\S]{1,800}/);
if (chooseBlock) console.log("\n=== Bloque de ejemplo (choose) ===\n" + chooseBlock[0]);