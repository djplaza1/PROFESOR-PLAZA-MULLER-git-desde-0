const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const start = code.indexOf("const checkAnswer = ");
const end = code.indexOf("const inputDisabled", start);
console.log(code.substring(start, end > 0 ? end : start + 3000));