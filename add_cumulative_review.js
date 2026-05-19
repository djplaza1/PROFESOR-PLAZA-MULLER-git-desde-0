const fs = require("fs");

// 1. Backups
fs.copyFileSync("src/features/ruta/phraseGenerator.js", "src/features/ruta/phraseGenerator.js.bak_repaso");
fs.copyFileSync("src/features/ruta/LessonView.jsx", "src/features/ruta/LessonView.jsx.bak_repaso");

// 2. Insertar método generateCumulativeReview en phraseGenerator.js
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
const newMethod = `
  /**
   * Genera ejercicios de repaso acumulativo (Pro/Premium)
   * @param {string} levelId - ej. 'A1.2'
   * @param {number} currentLessonIdx - índice de la lección actual (base 0)
   * @param {number} count - número de ejercicios de repaso deseados
   * @returns {Array} ejercicios extra con isCumulativeReview: true
   */
  generateCumulativeReview(levelId, currentLessonIdx, count) {
    const exercises = [];
    if (count <= 0) return exercises;
    if (typeof window === 'undefined' || !window.SRSHelpers) return exercises;

    const progress = window.SRSHelpers.loadProgress();
    const allWords = window.SRSHelpers.getWordsToReview
      ? window.SRSHelpers.getWordsToReview(progress, levelId, 100)
      : [];
    if (allWords.length === 0) return exercises;

    // Filtrar solo palabras de lecciones anteriores (< currentLessonIdx)
    const previousWords = allWords.filter(rw => {
      const idx = rw.lessonIdx;
      return idx !== undefined && idx < currentLessonIdx;
    });
    if (previousWords.length === 0) return exercises;

    // Ordenar por mayor número de fallos (priorizar las más débiles)
    previousWords.sort((a, b) => (b.failCount || 0) - (a.failCount || 0));

    const usedWords = [];
    const maxWords = Math.min(previousWords.length, count * 2); // margen para emparejar
    for (let i = 0; i < maxWords; i++) {
      usedWords.push(previousWords[i].word);
    }

    // Crear matchPairs/audioMatch con bloques de 4-5 palabras
    let idx = 0;
    while (idx < usedWords.length && exercises.length < count) {
      const chunkSize = Math.min(5, usedWords.length - idx);
      if (chunkSize < 2) break;
      const chunk = usedWords.slice(idx, idx + chunkSize);
      idx += chunkSize;

      // Buscar palabras completas en el vocabulario del nivel
      const vocabWords = [];
      for (const word of chunk) {
        const found = this.findWordInLevel(levelId, word);
        if (found) vocabWords.push(found);
      }
      if (vocabWords.length < 2) continue;

      const dePairs = vocabWords.map(w => this.canonizeNoun(w));
      const esPairs = vocabWords.map(w => w[1]);

      const ex = {
        type: exercises.length % 2 === 0 ? "matchPairs" : "audioMatch",
        prompt: "🔁 Repaso acumulado (lecciones anteriores)",
        pairs: dePairs.map((de, i) => ({ de, es: esPairs[i] })),
        leftColumn: this.shuffle([...dePairs]),
        rightColumn: this.shuffle([...esPairs]),
        hint: "Refuerzo Pro: palabras que has fallado antes.",
        word: vocabWords[0],
        isCumulativeReview: true
      };
      exercises.push(ex);
    }

    // Si aún faltan ejercicios y hay palabras sueltas, rellenar con fill/choose
    while (exercises.length < count && idx < usedWords.length) {
      const word = usedWords[idx++];
      const fullWord = this.findWordInLevel(levelId, word);
      if (!fullWord) continue;
      const ex = this.createVocabExercise(fullWord, ["fill", "choose"], []);
      if (ex) {
        ex.prompt = "🔁 Repaso: " + ex.prompt;
        ex.isCumulativeReview = true;
        exercises.push(ex);
      }
    }

    return exercises;
  },

  /**
   * Busca una palabra (en alemán) en el vocabulario del nivel
   */
  findWordInLevel(levelId, deWord) {
    const allValid = this.getValidWords(levelId);
    return allValid.find(w => w[0].toLowerCase() === deWord.toLowerCase()) || null;
  },

`;

// Insertar el nuevo método justo antes de "generateLesson("
const markerGenerateLesson = "generateLesson(levelId, lessonIdx) {";
if (pg.includes(markerGenerateLesson)) {
  pg = pg.replace(markerGenerateLesson, newMethod + markerGenerateLesson);
} else {
  console.error("No se encontró generateLesson en phraseGenerator.js");
  process.exit(1);
}

// 3. Modificar generateLesson para añadir los ejercicios de repaso
const lessonReturnOld = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)";
const lessonReturnNew = `exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson),
      cumulativeReview: this.generateCumulativeReview(levelId, lessonIdx, lessonIdx < 3 ? 5 : lessonIdx < 9 ? 7 : 10)`;
if (pg.includes(lessonReturnOld)) {
  pg = pg.replace(lessonReturnOld, lessonReturnNew);
}

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");

// 4. Modificar LessonView.jsx para mostrar el estilo visual y añadir los ejercicios extra
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// a) Añadir los ejercicios de repaso al final de la lección, justo después de los ejercicios normales
const setExercisesLine = "setExercises(lesson.exercises || []);";
const setExercisesWithCumulative = `const allExercises = (lesson.exercises || []).concat(lesson.cumulativeReview || []);
  console.log('Ejercicios totales (incluyendo repaso):', allExercises.length);
  setExercises(allExercises);`;
if (lv.includes(setExercisesLine)) {
  lv = lv.replace(setExercisesLine, setExercisesWithCumulative);
}

// b) Añadir clase CSS para borde naranja cuando isCumulativeReview
const exDivClassMarker = "className={`bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border ${ex.isReview ? 'border-amber-500/50' : 'border-slate-700'}`}";
const exDivClassWithCumulative = "className={`bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border ${ex.isCumulativeReview ? 'border-orange-500/80' : ex.isReview ? 'border-amber-500/50' : 'border-slate-700'}`}";
if (lv.includes(exDivClassMarker)) {
  lv = lv.replace(exDivClassMarker, exDivClassWithCumulative);
}

// c) Mostrar etiqueta "Repaso Pro" en el prompt si es acumulativo
const promptLine = "<p className=\"text-slate-200 font-medium text-lg\">{ex.prompt}</p>";
const promptLineWithBadge = `<p className="text-slate-200 font-medium text-lg">{ex.prompt}{ex.isCumulativeReview && <span className="ml-2 px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full">Repaso Pro</span>}</p>`;
if (lv.includes(promptLine)) {
  lv = lv.replace(promptLine, promptLineWithBadge);
}

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("Repaso acumulativo implementado correctamente.");