const fs = require("fs");
const file = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
// Buscar asignaciones al estado de ejercicios o variables que los generan
const matches = file.match(/(exercises|setExercises|exerciseList|phraseGenerator)\.?[^(]*\([^)]*\)/g) || [];
console.log("Posibles llamadas generadoras en LessonView:");
console.log(matches.slice(0, 20));
// Buscar cómo se invoca al generador
const phraseGenCalls = file.match(/PhraseGenerator\.\w+\(/g) || [];
console.log("Llamadas a PhraseGenerator:", phraseGenCalls);