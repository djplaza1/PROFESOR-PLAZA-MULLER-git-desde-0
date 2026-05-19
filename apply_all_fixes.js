const fs = require("fs");

// Backup
fs.copyFileSync("src/features/ruta/phraseGenerator.js", "src/features/ruta/phraseGenerator.js.bak_final");
fs.copyFileSync("src/features/ruta/LessonView.jsx", "src/features/ruta/LessonView.jsx.bak_final");

// ========== 1. phraseGenerator.js ==========
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// --- Corrección de phraseWithBlank para que no muestre pistas ---
const oldPhraseRegex = /var phraseWithBlank = p\.de\.replace\(new RegExp\(adjClean\.replace\(.*?\)\s*\+\s*"\(e\|er\|es\|em\|en\)", "i"\), "___"\);/;
if (pg.match(oldPhraseRegex)) {
  pg = pg.replace(oldPhraseRegex, 'var phraseWithBlank = p.de.replace(p.adjective, "___");');
  console.log("phraseWithBlank limpiado.");
}

// --- Quitar guion de la respuesta correcta ---
pg = pg.replace(/answer:\s*correctEnding/g, 'answer: correctEnding.replace("-","")');

// --- Hint genérico ---
const oldHint = '"Caso " + caseLabel + " (" + targetDet + "). Terminación: " + correctEnding';
const newHint = '"Escribe solo la terminación (sin guion)."';
pg = pg.replace(oldHint, newHint);

// --- Quitar "en caso NOM" del prompt ---
const oldPromptPart = "\"Completa el adjetivo '\" + adjClean + \"' en caso \" + caseLabel + \":\\n\\\"\"";
const newPromptPart = "\"Completa el adjetivo '\" + adjClean + \"':\\n\\\"\"";
pg = pg.replace(oldPromptPart, newPromptPart);

// --- Insertar método generateCumulativeReview antes de generateLesson ---
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

    const previousWords = allWords.filter(rw => rw.lessonIdx !== undefined && rw.lessonIdx < currentLessonIdx);
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

const lessonMarker = 'generateLesson(levelId, lessonIdx) {';
if (pg.includes(lessonMarker)) {
  pg = pg.replace(lessonMarker, reviewMethod + lessonMarker);
} else {
  console.error("No se encontró generateLesson");
  process.exit(1);
}

// Añadir cumulativeReview al objeto de retorno de generateLesson
const oldReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)";
const newReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson),\n      cumulativeReview: this.generateCumulativeReview(levelId, lessonIdx, lessonIdx < 3 ? 5 : lessonIdx < 9 ? 7 : 10)";
if (pg.includes(oldReturn)) {
  pg = pg.replace(oldReturn, newReturn);
} else {
  console.log("No se encontró la línea de return de generateLesson.");
}

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("phraseGenerator.js modificado correctamente.");

// ========== 2. LessonView.jsx ==========
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// Contador de ejercicios en el título
const oldTitle = '{reviewMode ? "Repaso de fallos" : `Lección ${lessonIdx+1}`} – {ex.type}';
const newTitle = '{reviewMode ? "Repaso de fallos" : `Lección ${lessonIdx+1} (${currentEx+1}/${exercises.length})`} – {ex.type}';
lv = lv.replace(oldTitle, newTitle);

// Concatenar cumulativeReview al cargar ejercicios
const oldSetEx = 'setExercises(lesson.exercises || []);';
const newSetEx = `const normalExs = lesson.exercises || [];
  const cumulExs = lesson.cumulativeReview || [];
  const allExs = [...normalExs, ...cumulExs];
  setExercises(allExs);`;
lv = lv.replace(oldSetEx, newSetEx);

// Excluir ejercicios acumulativos del failedStack para evitar bucles
const oldFailedPush = 'setFailedStack(prev => [...prev, ex]);';
const newFailedPush = 'if (!ex.isCumulativeReview) setFailedStack(prev => [...prev, ex]);';
lv = lv.replace(oldFailedPush, newFailedPush);

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("LessonView.jsx modificado correctamente.");