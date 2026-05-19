const fs = require("fs");
const file = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Buscar la función que genera los ejercicios de una lección (posible nombre)
const match = file.match(/(generateLessonExercises|generateAllExercises|generateExercisesForLesson)\s*\(/g);
console.log("Posibles funciones generadoras de lección:", match);
// Buscar la firma completa de la primera
if (match) {
  const firstMatch = file.indexOf(match[0]);
  const context = file.substring(firstMatch, firstMatch + 500);
  console.log("Contexto de la primera función:\n", context);
}