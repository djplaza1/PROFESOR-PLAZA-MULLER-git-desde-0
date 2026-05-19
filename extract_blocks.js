const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const lines = code.split("\n");
const indices = [];
lines.forEach((line, i) => {
  if (line.includes("ex.type === '")) indices.push(i);
});
indices.forEach(idx => {
  const start = Math.max(0, idx - 2);
  const end = Math.min(lines.length, idx + 50);
  console.log(`\n=== BLOQUE en línea ${idx+1}: ${lines[idx].trim()} ===`);
  console.log(lines.slice(start, end).join("\n"));
});