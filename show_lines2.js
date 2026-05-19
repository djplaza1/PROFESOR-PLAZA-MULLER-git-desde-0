const fs = require("fs");
const lines = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8").split("\n");
console.log("=== LÍNEAS 310-400 ===");
lines.slice(309, 400).forEach((l, i) => console.log((i+310), l));