const fs = require("fs");

// 1. Verificar que el JSON de A1.2 existe y tiene frases
const phrasesPath = "src/data/phrasesBank_A1.2.json";
if (!fs.existsSync(phrasesPath)) {
  console.log("ERROR: No existe " + phrasesPath);
} else {
  const phrases = JSON.parse(fs.readFileSync(phrasesPath, "utf8"));
  const count = Object.keys(phrases).length;
  console.log("phrasesBank_A1.2.json tiene " + count + " palabras con frases.");
  // Mostrar la primera frase de la primera palabra como ejemplo
  const firstWord = Object.keys(phrases)[0];
  console.log("Ejemplo: " + firstWord + " -> " + phrases[firstWord][0].de);
}

// 2. Verificar que el loader incluye A1.2
const loader = fs.readFileSync("src/data/phrasesBankLoader.js", "utf8");
if (loader.includes("A1.2")) {
  console.log("Loader incluye A1.2.");
} else {
  console.log("ERROR: Loader NO incluye A1.2.");
}

// 3. Verificar que phraseGenerator.js tiene el método getPhrasesForLevel
const pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
if (pg.includes("getPhrasesForLevel")) {
  console.log("phraseGenerator.js tiene getPhrasesForLevel.");
  // Buscar dónde se usa
  const matches = pg.match(/getPhrasesForLevel\([^)]+\)/g);
  console.log("Uso de getPhrasesForLevel:", matches);
} else {
  console.log("ERROR: phraseGenerator.js NO tiene getPhrasesForLevel.");
}

// 4. Buscar generateFillInBlankExercises y ver si depende de getPhrasesForLevel
if (pg.includes("generateFillInBlankExercises")) {
  const start = pg.indexOf("generateFillInBlankExercises");
  console.log("generateFillInBlankExercises encontrado en posición " + start);
} else {
  console.log("ERROR: generateFillInBlankExercises no encontrado.");
}

// 5. Simular la generación de una lección desde Node.js (sin navegador)
// Cargar manualmente las frases como lo haría el navegador
const phrasesBank = {};
try {
  const data = JSON.parse(fs.readFileSync(phrasesPath, "utf8"));
  Object.assign(phrasesBank, data);
} catch(e) {
  console.log("No se pudo cargar phrasesBank:", e.message);
}

// Crear un objeto PhraseGenerator mínimo para probar
const PhraseGenerator = eval("(" + pg.match(/const PhraseGenerator\s*=\s*\{[\s\S]*?\n\};/)[0] + ")");
// Asignar phrasesBank manualmente
global.window = { PhrasesBank: phrasesBank, LevelConfig: { getLevelConfig: function() { return { wordsPerLesson: 10 }; } }, SRSHelpers: { loadProgress: function() { return null; }, getWordsToReview: function() { return []; } } };

try {
  const lesson = PhraseGenerator.generateLesson("A1.2", 0);
  if (lesson && lesson.exercises) {
    console.log("\n=== SIMULACIÓN: Lección generada con " + lesson.exercises.length + " ejercicios ===");
    const types = {};
    lesson.exercises.forEach(function(ex) {
      types[ex.type] = (types[ex.type] || 0) + 1;
    });
    console.log("Tipos generados:");
    Object.keys(types).sort().forEach(function(t) {
      console.log("  " + t + ": " + types[t]);
    });
    // Mostrar cuántos son de frases (fillInSentence, articleChoice, adjectiveDeclension, order, pronounce)
    const phraseTypes = ["fillInSentence", "articleChoice", "adjectiveDeclension", "order", "pronounce"];
    const phraseCount = phraseTypes.reduce(function(sum, t) { return sum + (types[t] || 0); }, 0);
    console.log("Ejercicios basados en frases: " + phraseCount + " de " + lesson.exercises.length);
  } else {
    console.log("ERROR: generateLesson no devolvió una lección válida.");
  }
} catch(e) {
  console.log("ERROR al generar lección:", e.message);
  console.log(e.stack);
}