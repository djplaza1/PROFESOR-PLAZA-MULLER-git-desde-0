const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const idx = code.indexOf("ex.options ?");
console.log("Contexto alrededor de 'ex.options ?':");
console.log(code.substring(idx - 100, idx + 50));