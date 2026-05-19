const fs = require("fs");

// Restaurar desde el commit estable
const { execSync } = require("child_process");
execSync("git checkout 01f3229 -- src/features/ruta/LessonView.jsx");
execSync("git checkout 01f3229 -- src/features/ruta/phraseGenerator.js");

let lv = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// ========== 1. ELIMINAR failedStack por completo en LessonView.jsx ==========

// Eliminar declaración de failedStack
lv = lv.replace("const [failedStack, setFailedStack] = useState([]);\n  ", "");

// Eliminar todo el bloque de failedStack en checkAnswer
// Buscar: "playWrong();\n      setFailedStack(prev => [...prev, ex]);"
lv = lv.replace(/playWrong\(\);\s*\n\s*setFailedStack\(prev => \[\.\.\.prev, ex\]\);/g, "playWrong();");

// Reescribir nextExercise: eliminar completamente la lógica de failedStack
const oldNextExercise = `const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setUserOrder([]);
      setFeedback(null);
      setMatchSelected(null);
      setMatchResult([]);
      setAudioSelected(null);
      setAudioRevealed([]);
      setIsRecording(false);
      setPronAttempts(0);
      setPronMaxAttempts(3);
      setWrongWords([]);
      setLastUserTranscript("");
    } else {
      if (!reviewMode && failedStack.length > 0) {
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
      } else {
        if (!showComponent) {
          showCelebration('🎙️ Ahora completa el Podcast');
          setShowComponent('podcast');
        } else if (showComponent === 'podcast') {
          showCelebration('🎬 Ahora completa la Historia');
          setShowComponent('story');
        } else {
          playTone(523,0.2); setTimeout(()=>playTone(659,0.2),200); setTimeout(()=>playTone(784,0.3),400);
          showCelebration('🎉 ¡Lección completada!');
          const lessonId = levelId + "-l" + (lessonIdx + 1);
          const newProgress = { ...progress };
          newProgress.completed[lessonId] = true;
          setProgress(newProgress);
          setTimeout(() => onBack(), 1500);
        }
      }
    }
  };`;

const newNextExercise = `const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setUserOrder([]);
      setFeedback(null);
      setMatchSelected(null);
      setMatchResult([]);
      setAudioSelected(null);
      setAudioRevealed([]);
      setIsRecording(false);
      setPronAttempts(0);
      setPronMaxAttempts(3);
      setWrongWords([]);
      setLastUserTranscript("");
    } else {
      if (!showComponent) {
        showCelebration('🎙️ Ahora completa el Podcast');
        setShowComponent('podcast');
      } else if (showComponent === 'podcast') {
        showCelebration('🎬 Ahora completa la Historia');
        setShowComponent('story');
      } else {
        playTone(523,0.2); setTimeout(()=>playTone(659,0.2),200); setTimeout(()=>playTone(784,0.3),400);
        showCelebration('🎉 ¡Lección completada!');
        const lessonId = levelId + "-l" + (lessonIdx + 1);
        const newProgress = { ...progress };
        newProgress.completed[lessonId] = true;
        setProgress(newProgress);
        setTimeout(() => onBack(), 1500);
      }
    }
  };`;

lv = lv.replace(oldNextExercise, newNextExercise);

// Eliminar referencias a failedStack en el botón Siguiente
lv = lv.replace("{currentEx < exercises.length - 1 ? \"Siguiente →\" : (failedStack.length > 0 && !reviewMode ? \"Repasar fallos →\" : \"Finalizar\")}",
  "{currentEx < exercises.length - 1 ? \"Siguiente →\" : \"Finalizar\"}");

// ========== 2. AÑADIR REPASO ACUMULATIVO AL FINAL DE LOS EJERCICIOS ==========

// En phraseGenerator.js, ya tenemos generateCumulativeReview, solo falta que se añada al array de ejercicios en LessonView
// Cambiar la carga de ejercicios para que ponga los acumulativos al final, sin opción de repetir
lv = lv.replace("setExercises(lesson.exercises || []);",
  `const normalExs = lesson.exercises || [];
  const cumulExs = lesson.cumulativeReview || [];
  const allExs = [...normalExs, ...cumulExs];
  setExercises(allExs);`);

// ========== 3. CORREGIR RENDER DE DECLINACIONES EN LessonView.jsx ==========
// Asegurar que los botones de opciones tengan el guion y que el input acepte el guion

// Buscar el render de adjectiveDeclension y cambiar el placeholder y los botones
// (El render actual de adjectiveDeclension usa opciones como "-e", "-er", etc., eso está bien)
// Pero necesitamos que el corrector acepte la respuesta con guion. El corrector ya acepta el guion si se le pasa.
// Solo hay que asegurarse de que los botones envíen el valor con guion.
// En el render de adjectiveDeclension que insertamos no hay botones de opciones, solo input.
// En el ejercicio de declinación actual (que usa opciones), el render es el genérico "ex.options ? (...botones...)"
// Pero el ejercicio de adjectiveDeclension NO tiene "options" en la versión restaurada, así que usa el input genérico.
// Para que sea más fácil, vamos a añadir un render específico para adjectiveDeclension con botones de opciones,
// igual que el que se usa para choose. Pero eso ya lo hicimos antes y funcionaba.

// Buscar el marcador donde insertamos los renders específicos y asegurarnos de que adjectiveDeclension esté presente.
// Como el archivo está restaurado, no tiene esos renders. Los añadiremos manualmente.

// Insertar el render de adjectiveDeclension justo antes de "ex.options ? ("
const adjRender = `
           ) : ex.type === "adjectiveDeclension" ? (
             <div className="space-y-4 mt-4">
               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>
               <p className="text-xl text-white font-serif">{ex.sourcePhrase}</p>
               <p className="text-sm text-slate-400">Escribe solo la terminación (con guion, ej: -e)</p>
               <div className="flex gap-3">
                 {ex.options.map((opt, i) => (
                   <button key={i} onClick={() => checkAnswer(opt)} className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-bold text-white text-xl">
                     {opt}
                   </button>
                 ))}
               </div>
             </div>`;

const marker = "          ) : ex.options ? (";
if (lv.includes(marker)) {
  lv = lv.replace(marker, adjRender + "\n" + marker);
  console.log("Render de adjectiveDeclension añadido.");
} else {
  console.log("No se encontró el marcador para insertar adjectiveDeclension.");
}

// ========== 4. ASEGURAR QUE PHRASEGENERATOR TENGA CUMULATIVER EVIEW ==========
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
}

// Añadir cumulativeReview al return de generateLesson
const oldReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)";
const newReturn = "exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson),\n      cumulativeReview: this.generateCumulativeReview(levelId, lessonIdx, lessonIdx < 3 ? 5 : lessonIdx < 9 ? 7 : 10)";
pg = pg.replace(oldReturn, newReturn);

// Guardar archivos
fs.writeFileSync("src/features/ruta/LessonView.jsx", lv, "utf8");
fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("Cambios aplicados correctamente.");