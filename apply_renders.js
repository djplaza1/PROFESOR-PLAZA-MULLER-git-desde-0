const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
const code = fs.readFileSync(path, "utf8");
const block = fs.readFileSync("new_renders_block.txt", "utf8").replace(/\r\n/g, "\n");

// Marcador exacto antes de ex.options
const marker = `          ) : ex.options ? (`;
if (!code.includes(marker)) {
  console.error("No se encontró el marcador. Revisa manualmente.");
  process.exit(1);
}

const newCode = code.replace(marker, block + "\n" + marker);
fs.writeFileSync(path, newCode, "utf8");
console.log("LessonView.jsx actualizado con los nuevos tipos de ejercicios.");