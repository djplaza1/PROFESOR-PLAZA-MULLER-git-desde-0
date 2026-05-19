const fs = require("fs");
const file = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Buscar todas las llamadas a funciones generate... y los type asignados
const generateCalls = file.match(/generate\w+Exercises?\s*\(/g) || [];
const typeAssignments = file.match(/type:\s*['"]([^'"]+)['"]/g) || [];
console.log("=== Funciones generadoras llamadas ===");
console.log([...new Set(generateCalls)]);
console.log("=== Tipos asignados en phraseGenerator ===");
console.log([...new Set(typeAssignments)]);