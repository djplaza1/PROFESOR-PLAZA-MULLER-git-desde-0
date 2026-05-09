// phraseGenerator.js – Motor de generación de frases y lecciones para la Ruta
// Utiliza vocabulario de vocabData.js y configuración de levelConfig.js.
// Genera lecciones variadas con repasos y ejercicios de 8 tipos.

const PhraseGenerator = {

  // ── Plantillas gramaticales por nivel CEFR ──
  templates: {
    A1: [
      { de: "Ich bin [Name].", es: "Soy [Name]." },
      { de: "Das ist ein [Objekt].", es: "Eso es un [Objekt]." },
      { de: "Ich habe ein [Objekt].", es: "Tengo un [Objekt]." },
      { de: "Der [Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv]." },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt]." }
    ]
    // A2, B1, B2, C1 se añadirán progresivamente
  },

  // ── Obtener vocabulario de un nivel (desde el objeto global VOCAB) ──
  getVocabForLevel(levelId) {
    const R = window.Muller && window.Muller.Ruta ? window.Muller.Ruta : null;
    if (!R || !R.VOCAB || !R.VOCAB[levelId]) return [];
    return R.VOCAB[levelId]; // array de arrays [de, es, art, plural, tipo]
  },

  // ── Seleccionar palabras para una lección ──
  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const allWords = this.getVocabForLevel(levelId);
    if (allWords.length === 0) return [];
    // Rotación: empieza por lessonIdx * wordsPerLesson y vuelve al principio si es necesario
    const start = (lessonIdx * wordsPerLesson) % allWords.length;
    let selected = allWords.slice(start, start + wordsPerLesson);
    if (selected.length < wordsPerLesson) {
      selected = selected.concat(allWords.slice(0, wordsPerLesson - selected.length));
    }
    return selected;
  },

  // ── Generar una frase a partir de una plantilla y una palabra ──
  generateSentence(word, template) {
    const [de, es, art, plural, tipo] = word;
    const articleMap = { der: "Der", die: "Die", das: "Das" };
    const artForm = articleMap[art] || "";

    let deSentence = template.de
      .replace("[Name]", de)
      .replace("[Objekt]", de)
      .replace("[Substantiv]", de)
      .replace("[Adjektiv]", es);
    let esSentence = template.es
      .replace("[Name]", es)
      .replace("[Objekt]", es)
      .replace("[Substantiv]", es)
      .replace("[Adjektiv]", es);

    // Capitalizar primera letra
    deSentence = deSentence.charAt(0).toUpperCase() + deSentence.slice(1);
    return { de: deSentence, es: esSentence, word: word };
  },

  // ── Generar ejercicios para una lección ──
  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const words = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (words.length === 0) return [];

    const exercises = [];
    const templates = this.templates.A1; // Por ahora solo A1

    words.forEach((word, i) => {
      const template = templates[i % templates.length];
      const sentence = this.generateSentence(word, template);

      // Elegir tipo de ejercicio rotativo (fill, translateDE, translateES, plural...)
      const typeIdx = i % 4;
      let exercise;
      switch(typeIdx) {
        case 0: exercise = ExerciseTypes.fill(word[0], word[1], ["Mesa", "Silla", "Ventana"]); break;
        case 1: exercise = ExerciseTypes.translateDE(word[1], word[0]); break;
        case 2: exercise = ExerciseTypes.translateES(word[0], word[1]); break;
        case 3: exercise = ExerciseTypes.plural(word[0], word[3] || "ninguno", ["Hauses", "Kindes"]); break;
        default: exercise = ExerciseTypes.fill(word[0], word[1]);
      }
      exercise.word = word;
      exercise.sentence = sentence;
      exercises.push(exercise);
    });

    return exercises;
  },

  // ── Generar estructura de lección (para RutaPanel) ──
  generateLesson(levelId, lessonIdx) {
    const config = window.LevelConfig && window.LevelConfig.getLevelConfig(levelId);
    if (!config || lessonIdx >= config.lessons) return null;
    const exercises = this.generateExercises(levelId, lessonIdx, config.wordsPerLesson);
    return {
      id: `${levelId}-l${lessonIdx + 1}`,
      title: `Lección ${lessonIdx + 1}`,
      levelId: levelId,
      exercises: exercises
    };
  }
};

// Exponer globalmente
window.PhraseGenerator = PhraseGenerator;
