const fs = require("fs");

// Restaurar desde Git
const { execSync } = require("child_process");
execSync("git checkout 01f3229 -- src/features/ruta/phraseGenerator.js");
execSync("git checkout 01f3229 -- src/features/ruta/LessonView.jsx");

// Leer archivos restaurados
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// ====== CORRECCIONES EN phraseGenerator.js ======

// 1. Limpiar phraseWithBlank para que no muestre pistas
pg = pg.replace(
  /var phraseWithBlank = p\.de\.replace\(new RegExp\(adjClean\.replace\(.*?\)\s*\+\s*"\(e\|er\|es\|em\|en\)",\s*"i"\),\s*"___"\);/,
  'var phraseWithBlank = p.de.replace(p.adjective, "___");'
);

// 2. Dejar answer con guion (como estaba originalmente)
pg = pg.replace(/answer:\s*correctEnding\s*\?\s*`-\$\{correctEnding\}`\s*:\s*correctEnding/g, 'answer: correctEnding');

// 3. Hint sin revelar respuesta
pg = pg.replace(
  /"Caso "\s*\+\s*caseLabel\s*\+\s*" \("\s*\+\s*targetDet\s*\+\s*"\)\. Terminación: "\s*\+\s*correctEnding/g,
  '"Escribe solo la terminación (sin guion)."'
);

// 4. Quitar "en caso NOM:" del prompt
pg = pg.replace(
  /"Completa el adjetivo '"\s*\+\s*adjClean\s*\+\s*"' en caso "\s*\+\s*caseLabel\s*\+\s*":\\n\\""/g,
  '"Completa el adjetivo \'" + adjClean + "\':\\n\\""'
);

// 5. Insertar generateCumulativeReview antes de generateLesson
const reviewMethod = `
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
        prompt: "\uD83D\uDD01 Repaso acumulado (lecciones anteriores)",
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
        ex.prompt = "\uD83D\uDD01 Repaso: " + ex.prompt;
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
}

// Añadir cumulativeReview al return
const oldReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)";
const newReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson),\n      cumulativeReview: this.generateCumulativeReview(levelId, lessonIdx, lessonIdx < 3 ? 5 : lessonIdx < 9 ? 7 : 10)";
pg = pg.replace(oldReturn, newReturn);

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");

// ====== CORRECCIONES EN LessonView.jsx ======

// 1. Añadir contador en el título
lv = lv.replace(
  '{reviewMode ? "Repaso de fallos" : `Lección ${lessonIdx+1}`} – {ex.type}',
  '{reviewMode ? "Repaso de fallos" : `Lección ${lessonIdx+1} (${currentEx+1}/${exercises.length})`} – {ex.type}'
);

// 2. Concatenar cumulativeReview al cargar ejercicios
lv = lv.replace(
  'setExercises(lesson.exercises || []);',
  `const normalExs = lesson.exercises || [];
  const cumulExs = lesson.cumulativeReview || [];
  const allExs = [...normalExs, ...cumulExs];
  setExercises(allExs);`
);

// 3. Evitar que ejercicios acumulativos entren en failedStack
lv = lv.replace(
  'setFailedStack(prev => [...prev, ex]);',
  'if (!ex.isCumulativeReview) setFailedStack(prev => [...prev, ex]);'
);

// 4. Limitar ciclos de repaso (añadir estado reviewCycles)
lv = lv.replace(
  'const [reviewMode, setReviewMode] = useState(false);',
  'const [reviewMode, setReviewMode] = useState(false);\n  const [reviewCycles, setReviewCycles] = useState(0);'
);

// Modificar nextExercise para controlar ciclos
// Buscar el bloque donde se activa el modo repaso y reemplazarlo
const oldRepasoBlock = `if (!reviewMode && failedStack.length > 0) {
        setExercises(failedStack);
        setFailedStack([]);
        setCurrentEx(0);
        setUserAnswer("");
        setUserOrder([]);
        setFeedback(null);
        setReviewMode(true);
        setPronAttempts(0);
        setPronMaxAttempts(3);
        setWrongWords([]);
        setLastUserTranscript("");
      }`;
const newRepasoBlock = `if (!reviewMode && failedStack.filter(e => !e.isCumulativeReview).length > 0 && reviewCycles < 1) {
        setReviewCycles(c => c + 1);
        setExercises(failedStack.filter(e => !e.isCumulativeReview));
        setFailedStack([]);
        setCurrentEx(0);
        setUserAnswer("");
        setUserOrder([]);
        setFeedback(null);
        setReviewMode(true);
        setPronAttempts(0);
        setPronMaxAttempts(3);
        setWrongWords([]);
        setLastUserTranscript("");
      }`;
lv = lv.replace(oldRepasoBlock, newRepasoBlock);

// Resetear reviewCycles al iniciar nueva lección (cuando se cargan ejercicios)
// Insertar setReviewCycles(0) justo después de setExercises(allExs)
lv = lv.replace(
  'setExercises(allExs);',
  'setExercises(allExs);\n  setReviewCycles(0);'
);

fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
console.log("Todos los parches aplicados correctamente.");