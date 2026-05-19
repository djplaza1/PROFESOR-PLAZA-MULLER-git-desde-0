const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
// Buscar el return principal del componente
const match = code.match(/const LessonView\s*=\s*\(props\)\s*=>\s*\{[\s\S]*?return\s*\(([\s\S]*?)\);\s*\}/);
if (match) {
  console.log("=== RENDER PRINCIPAL ===");
  console.log(match[1].substring(0, 2000)); // primeros 2000 caracteres
} else {
  // Buscar cualquier return ( en el archivo
  const idx = code.search(/return\s*\(\s*<div/);
  if (idx !== -1) {
    console.log("=== RENDER (desde 'return (<div') ===");
    console.log(code.substring(idx, idx + 2000));
  } else {
    console.log("No se encontró render principal. Mostrando últimas 100 líneas:");
    console.log(code.split("\n").slice(-100).join("\n"));
  }
}