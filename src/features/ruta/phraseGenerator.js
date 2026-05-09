// phraseGenerator.js – Motor de generación de frases por nivel CEFR
const PhraseGenerator = {
  templates: {
    A1: [
      { de: "Ich bin [Name].", es: "Soy [Name]." },
      { de: "Das ist ein [Objekt].", es: "Eso es un [Objekt]." },
      { de: "Ich habe ein [Objekt].", es: "Tengo un [Objekt]." },
      { de: "Der [Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv]." },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt]." }
    ],
    A2: [
      { de: "Gestern war ich im [Ort].", es: "Ayer estuve en el [Ort]." },
      { de: "Ich möchte [Objekt] kaufen.", es: "Quisiera comprar [Objekt]." },
      { de: "Der [Substantiv] gefällt mir.", es: "El/la [Substantiv] me gusta." },
      { de: "Hast du [Objekt] gesehen?", es: "¿Has visto [Objekt]?" }
    ],
    B1: [
      { de: "Obwohl es regnete, gingen wir [Infinitiv].", es: "Aunque llovía, fuimos a [Infinitiv]." },
      { de: "Wenn ich Zeit hätte, würde ich [Objekt] lernen.", es: "Si tuviera tiempo, aprendería [Objekt]." },
      { de: "Der [Substantiv], den ich gekauft habe, war teuer.", es: "El/la [Substantiv] que compré era caro/a." }
    ],
    B2: [
      { de: "In Anbetracht der Umstände ist [Substantiv] notwendig.", es: "Considerando las circunstancias, [Substantiv] es necesario." },
      { de: "Es wird erwartet, dass [Substantiv] bald eintrifft.", es: "Se espera que [Substantiv] llegue pronto." }
    ],
    C1: [
      { de: "Die [Substantiv] ist von zentraler Bedeutung für die Gesellschaft.", es: "La [Substantiv] es de importancia central para la sociedad." },
      { de: "Ohne [Substantiv] wäre die Entwicklung nicht denkbar.", es: "Sin [Substantiv] el desarrollo sería impensable." }
    ]
  },
  getVocabForLevel(levelId) {
    const R = (window.Muller && window.Muller.Ruta) ? window.Muller.Ruta : null;
    if (!R || !R.VOCAB || !R.VOCAB[levelId]) return [];
    return R.VOCAB[levelId];
  },
  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const allWords = this.getVocabForLevel(levelId);
    if (allWords.length === 0) return [];
    const start = (lessonIdx * wordsPerLesson) % allWords.length;
    let selected = allWords.slice(start, start + wordsPerLesson);
    if (selected.length < wordsPerLesson) {
      selected = selected.concat(allWords.slice(0, wordsPerLesson - selected.length));
    }
    return selected;
  },
  getLevelKey(levelId) {
    const match = levelId.match(/^(A1|A2|B1|B2|C1)/);
    return match ? match[1] : 'A1';
  },
  generateSentence(word, template) {
    const [de, es, art, plural, tipo] = word;
    let deSentence = template.de.replace(/\[Name\]/g, de).replace(/\[Objekt\]/g, de).replace(/\[Substantiv\]/g, de).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, de).replace(/\[Infinitiv\]/g, de);
    let esSentence = template.es.replace(/\[Name\]/g, es).replace(/\[Objekt\]/g, es).replace(/\[Substantiv\]/g, es).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, es).replace(/\[Infinitiv\]/g, es);
    deSentence = deSentence.charAt(0).toUpperCase() + deSentence.slice(1);
    return { de: deSentence, es: esSentence, word: word };
  },
  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const words = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (words.length === 0) return [];
    const levelKey = this.getLevelKey(levelId);
    const templates = this.templates[levelKey] || this.templates.A1;
    const exercises = [];
    words.forEach((word, i) => {
      const template = templates[i % templates.length];
      const sentence = this.generateSentence(word, template);
      const typeIdx = i % 5;
      let exercise;
      switch(typeIdx) {
        case 0: exercise = (window.ExerciseTypes && window.ExerciseTypes.fill) ? window.ExerciseTypes.fill(word[0], word[1], ["Mesa", "Silla", "Ventana"]) : null; break;
        case 1: exercise = (window.ExerciseTypes && window.ExerciseTypes.translateDE) ? window.ExerciseTypes.translateDE(word[1], word[0]) : null; break;
        case 2: exercise = (window.ExerciseTypes && window.ExerciseTypes.translateES) ? window.ExerciseTypes.translateES(word[0], word[1]) : null; break;
        case 3: exercise = (window.ExerciseTypes && window.ExerciseTypes.plural) ? window.ExerciseTypes.plural(word[0], word[3] || "ninguno", ["Hauses", "Kindes"]) : null; break;
        case 4: exercise = (window.ExerciseTypes && window.ExerciseTypes.choose) ? window.ExerciseTypes.choose(word[0], word[1], ["Mesa", "Silla", "Ventana"]) : null; break;
        default: exercise = (window.ExerciseTypes && window.ExerciseTypes.fill) ? window.ExerciseTypes.fill(word[0], word[1]) : null;
      }
      if (exercise) {
        exercise.word = word;
        exercise.sentence = sentence;
        exercises.push(exercise);
      }
    });
    return exercises;
  },
  generateLesson(levelId, lessonIdx) {
    const config = (window.LevelConfig && window.LevelConfig.getLevelConfig) ? window.LevelConfig.getLevelConfig(levelId) : null;
    if (!config || lessonIdx >= config.lessons) return null;
    const exercises = this.generateExercises(levelId, lessonIdx, config.wordsPerLesson);
    return { id: levelId + "-l" + (lessonIdx + 1), title: "Lección " + (lessonIdx + 1), levelId: levelId, exercises: exercises };
  }
};
window.PhraseGenerator = PhraseGenerator;
