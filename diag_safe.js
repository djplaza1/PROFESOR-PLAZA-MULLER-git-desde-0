const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const lines = code.split("\n");
let found = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("ex.options")) {
    console.log(`Línea ${i+1}: ${lines[i]}`);
    found = true;
  }
}
if (!found) {
  console.log("No se encontró 'ex.options'. Buscando 'pronounce'...");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ex.type === "pronounce"')) {
      console.log(`Línea ${i+1}: ${lines[i]}`);
      const start = Math.max(0, i-2);
      const end = Math.min(lines.length, i+10);
      console.log("Contexto:");
      lines.slice(start, end).forEach((l, idx) => console.log(`${start+idx+1}: ${l}`));
      break;
    }
  }
}