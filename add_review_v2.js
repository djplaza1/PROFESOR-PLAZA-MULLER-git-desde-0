const fs = require("fs");

// 1. Hacer backup
fs.copyFileSync("src/features/ruta/phraseGenerator.js", "src/features/ruta/phraseGenerator.js.bak2");
fs.copyFileSync("src/features/ruta/LessonView.jsx", "src/features/ruta/LessonView.jsx.bak2");

// 2. Insertar método generateCumulativeReview en phraseGenerator.js, justo antes de generateLesson
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

const reviewMethod = `
  /**
   * Genera ejercicios de repaso acumulativo (Pro/Premium)
   */
  generateCumulativeReview(levelId, currentLessonIdx, count) {
    const exercises = [];
    if (count <= 0 || currentLessonIdx < 1) return exercises;
    if (typeof window === 'undefined' || !window.SRSHelpers) return exercises;

    const progress = window.SRSHelpers.loadProgress();
    const allWords = window.SRSHelpers.getWordsToReview
      ? window.SRSHelpers.getWordsToReview(progress, levelId, 100)
      : [];
    if (allWords.length === 0) return exercises;

    const previousWords = allWords.filter(rw => {
      const idx = rw.lessonIdx;
      return idx !== undefined && idx < currentLessonIdx;
    });
    if (previousWords.length === 0) return exercises;

    previousWords.sort((a, b) => (b.failCount || 0) - (a.failCount || 0));

    const allValid = this.getValidWords(levelId);
    const vocabMap = {};
    allValid.forEach(w => { vocabMap[w[0].toLowerCase()] = w; });

    const usedFullWords = [];
    for (const rw of previousWords) {
      const full = vocabMap[rw.word.toLowerCase()];
      if (full && !usedFullWords.includes(full)) {
        usedFullWords.push(full);
        if (usedFullWords.length >= count * 2) break;
      }
    }

    let idx = 0;
    while (idx < usedFullWords.length && exercises.length < count) {
      const chunkSize = Math.min(5, usedFullWords.length - idx);
      if (chunkSize < 2) break;
      const chunk = usedFullWords.slice(idx, idx + chunkSize);
      idx += chunkSize;

      const dePairs = chunk.map(w => this.canonizeNoun(w));
      const esPairs = chunk.map(w => w[1]);

      exercises.push({
        type: exercises.length % 2 === 0 ? "matchPairs" : "audioMatch",
        prompt: "🔁 Repaso acumulado (lecciones anteriores)",
        pairs: dePairs.map((de, i) => ({ de, es: esPairs[i] })),
        leftColumn: this.shuffle([...dePairs]),
        rightColumn: this.shuffle([...esPairs]),
        hint: "Refuerzo Pro: palabras que has fallado antes.",
        word: chunk[0],
        isCumulativeReview: true
      });
    }

    while (exercises.length < count && idx < usedFullWords.length) {
      const w = usedFullWords[idx++];
      const ex = this.createVocabExercise(w, ["fill", "choose"], allValid);
      if (ex) {
        ex.prompt = "🔁 Repaso: " + ex.prompt;
        ex.isCumulativeReview = true;
        exercises.push(ex);
      }
    }

    return exercises;
  },

`;

const lessonMarker = "generateLesson(levelId, lessonIdx) {";
if (pg.includes(lessonMarker)) {
  pg = pg.replace(lessonMarker, reviewMethod + lessonMarker);
} else {
  console.error("No se encontró generateLesson");
  process.exit(1);
}

// 3. Modificar generateLesson para añadir cumulativeReview
const oldReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)";
const newReturn = `exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson),
      cumulativeReview: this.generateCumulativeReview(levelId, lessonIdx, lessonIdx < 3 ? 5 : lessonIdx < 9 ? 7 : 10)`;
if (pg.includes(oldReturn)) {
  pg = pg.replace(oldReturn, newReturn);
} else {
  console.log("No se encontró la línea de return en generateLesson. Buscando...");
  // Buscar el return completo de generateLesson
  const genLessonStart = pg.indexOf("generateLesson(levelId, lessonIdx) {");
  const returnIdx = pg.indexOf("return {", genLessonStart);
  if (returnIdx !== -1) {
    const beforeReturn = pg.substring(0, returnIdx);
    const afterReturn = pg.substring(returnIdx);
    console.log("Contexto del return:", afterReturn.substring(0, 200));
  }
}

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");

// 4. Modificar LessonView.jsx
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// Añadir los ejercicios de repaso al array de ejercicios
const setExLine = "setExercises(lesson.exercises || []);";
const newSetEx = `const allExs = (lesson.exercises || []).concat(lesson.cumulativeReview || []);
  setExercises(allExs);`;
if (lv.includes(setExLine)) {
  lv = lv.replace(setExLine, newSetEx);
}

// Añadir borde naranja para isCumulativeReview
const borderOld = "className={`bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border ${ex.isReview ? 'border-amber-500/50' : 'border-slate-700'}`}";
const borderNew = "className={`bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border ${ex.isCumulativeReview ? 'border-orange-500/80' : ex.isReview ? 'border-amber-500/50' : 'border-slate-700'}`}";
if (lv.includes(borderOld)) {
  lv = lv.replace(borderOld, borderNew);
}

// Añadir etiqueta "Repaso Pro" en el prompt
const promptOld = "<p className=\"text-slate-200 font-medium text-lg\">{ex.prompt}";
const promptNew = "<p className=\"text-slate-200 font-medium text-lg\">{ex.prompt}{ex.isCumulativeReview && <span className=\"ml-2 px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full\">Repaso Pro</span>}";
if (lv.includes(promptOld)) {
  lv = lv.replace(promptOld, promptNew);
}

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("Repaso acumulativo implementado correctamente.");