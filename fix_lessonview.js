const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
let code = fs.readFileSync(path, "utf8");

// Buscar el bloque donde se cargan los ejercicios (alrededor de setExercises)
const loadBlock = `
  // AUTO-GENERAR ejercicios si no vienen en la lección
  if (lesson && (!lesson.exercises || lesson.exercises.length === 0)) {
    const generated = window.PhraseGenerator.generateLesson(lesson.levelId, lessonIdx);
    if (generated && generated.exercises) {
      lesson.exercises = generated.exercises;
    }
  }
  setExercises(lesson.exercises || []);
`;

// Reemplazar la línea setExercises(lesson.exercises || []) por el nuevo bloque
if (code.includes("setExercises(lesson.exercises || [])")) {
  code = code.replace("setExercises(lesson.exercises || [])", loadBlock);
  fs.writeFileSync(path, code, "utf8");
  console.log("LessonView.jsx parcheado correctamente.");
} else {
  console.log("No se encontró la línea esperada. Revisa manualmente.");
}