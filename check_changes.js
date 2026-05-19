const fs = require("fs");
const lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
console.log("=== LessonView: contiene 'allExs'? ", lv.includes("allExs"));
console.log("=== LessonView: contiene 'failedStack'? ", lv.includes("failedStack"));
console.log("=== phraseGenerator: contiene 'generateCumulativeReview'? ", pg.includes("generateCumulativeReview"));
console.log("=== phraseGenerator: contiene 'cumulativeReview' en generateLesson? ", pg.includes("cumulativeReview: this.generateCumulativeReview"));