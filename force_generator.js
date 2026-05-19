const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
let code = fs.readFileSync(path, "utf8");
// Reemplazar la línea 56: const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);
// por una versión que siempre usa el generador dinámico
const oldLine = "const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);";
const newLine = "const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx) || { exercises: [] };";
if (code.includes(oldLine)) {
  code = code.replace(oldLine, newLine);
  // Eliminar el bloque que comprueba si lesson.exercises está vacío (líneas 60-65)
  const oldBlock = `
  if (lesson && (!lesson.exercises || lesson.exercises.length === 0)) {
    const generated = window.PhraseGenerator.generateLesson(lesson.levelId, lessonIdx);
    if (generated && generated.exercises) {
      lesson.exercises = generated.exercises;
    }
  }`;
  if (code.includes(oldBlock)) {
    code = code.replace(oldBlock, " // Usar siempre el generador dinámico");
    fs.writeFileSync(path, code, "utf8");
    console.log("LessonView.jsx parcheado: ahora siempre usa el generador dinámico.");
  } else {
    console.error("No se encontró el bloque de reemplazo. Revisa manualmente.");
  }
} else {
  console.error("No se encontró la línea antigua. Revisa manualmente.");
}