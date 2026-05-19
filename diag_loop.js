const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
// Buscar la función checkAnswer y el avance de ejercicios
const checkIdx = code.indexOf("const checkAnswer = ");
const nextExIdx = code.indexOf("setCurrentEx(currentEx + 1)");
console.log("=== checkAnswer (primeras 800 chars) ===");
console.log(code.substring(checkIdx, checkIdx + 800));
console.log("\n=== Líneas alrededor de setCurrentEx ===");
const lines = code.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("setCurrentEx")) {
    const start = Math.max(0, i - 5);
    const end = Math.min(lines.length, i + 10);
    console.log(lines.slice(start, end).join("\n"));
    break;
  }
}