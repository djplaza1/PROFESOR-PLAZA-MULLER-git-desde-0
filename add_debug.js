const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
let code = fs.readFileSync(path, "utf8");
// Buscar la línea setExercises(lesson.exercises || []);
const target = "setExercises(lesson.exercises || []);";
const replacement = "console.log('Ejercicios cargados:', lesson.exercises); setExercises(lesson.exercises || []);";
if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync(path, code, "utf8");
  console.log("Log de depuración añadido.");
} else {
  console.error("No se encontró setExercises.");
}