// Cargar el generador desde el archivo (simulando window)
global.PhraseGenerator = require("./src/features/ruta/phraseGenerator.js");
const levels = window.LevelConfig?.LEVEL_CONFIG?.map(l => l.id) || [];
if (levels.length === 0) {
  console.log("No se encontraron niveles en LevelConfig. Usando lista fija.");
  levels = ["A1.1","A1.2","A2.1","A2.2","B1.1","B1.2","B2.1","B2.2","C1.1","C1.2"];
}
levels.forEach(levelId => {
  try {
    const lesson = window.PhraseGenerator.generateLesson(levelId, 0);
    console.log(levelId, "→", lesson.exercises.length, "ejercicios, tipos:", [...new Set(lesson.exercises.map(e=>e.type))]);
  } catch(e) {
    console.log(levelId, "→ ERROR:", e.message);
  }
});