const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const matches = code.match(/ex\.type\s*===\s*['"][^'"]+['"]/g) || [];
const types = [...new Set(matches.map(m => m.match(/['"]([^'"]+)['"]/)[1]))];
console.log("Tipos renderizados en LessonView:", types);