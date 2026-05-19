const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const lines = code.split("\n");
const keywords = /(exercises|setExercises|generateLesson|lesson\.exercises|lesson\[\d+\]|LevelConfig|getLesson|getExercises)/i;
lines.forEach((line, idx) => {
  if (keywords.test(line)) console.log(`${idx+1}: ${line}`);
});