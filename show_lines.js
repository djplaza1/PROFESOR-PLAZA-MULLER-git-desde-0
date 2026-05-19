const fs = require("fs");
const lines = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8").split("\n");
console.log("=== LÍNEAS 200-320 ===");
lines.slice(199, 320).forEach((l, i) => console.log((i+200), l));