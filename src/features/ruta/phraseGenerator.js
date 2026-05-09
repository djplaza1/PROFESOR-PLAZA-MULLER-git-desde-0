const PhraseGenerator = {
  // Plantillas con tipo de palabra requerido (n, v, adj, any)
  templates: {
    A1: [
      { de: "Ich bin [Name].", es: "Soy [Name].", req: "any" },
      { de: "Das ist ein [Objekt].", es: "Esto es un [Objekt].", req: "n" },
      { de: "Ich habe ein [Objekt].", es: "Tengo un [Objekt].", req: "n" },
      { de: "Der [Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv].", req: "adj" },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt].", req: "n" },
      { de: "Wir spielen [Objekt].", es: "Jugamos a [Objekt].", req: "n" },
      { de: "Er sieht [Objekt].", es: "Él ve [Objekt].", req: "n" }
    ],
    A2: [
      { de: "Gestern war ich im [Ort].", es: "Ayer estuve en el [Ort].", req: "n" },
      { de: "Ich möchte [Objekt] kaufen.", es: "Quisiera comprar [Objekt].", req: "n" },
      { de: "Hast du [Objekt] gesehen?", es: "¿Has visto [Objekt]?", req: "n" },
      { de: "Wir fahren nach [Ort].", es: "Viajamos a [Ort].", req: "n" },
      { de: "Kannst du [Objekt] bringen?", es: "¿Puedes traer [Objekt]?", req: "n" }
    ]
  },

  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },

  // Busca una palabra del nivel que coincida con el tipo requerido
  findWordForTemplate(levelWords, usedWords, reqType) {
    const candidates = levelWords.filter(w => {
      if (usedWords.has(w[0])) return false;
      if (reqType === "any") return true;
      return w[4] === reqType;
    });
    if (candidates.length === 0) {
      // Fallback: cualquier palabra no usada
      return levelWords.find(w => !usedWords.has(w[0])) || null;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  },

  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const allWords = this.getVocabForLevel(levelId);
    if (allWords.length === 0) return [];
    const reviewCount = Math.floor(wordsPerLesson * 0.3);
    const newCount = wordsPerLesson - reviewCount;
    const start = (lessonIdx * newCount) % allWords.length;
    let chosen = allWords.slice(start, start + newCount);
    if (chosen.length < newCount) chosen = chosen.concat(allWords.slice(0, newCount - chosen.length));
    // Añadir repasos si hay (más adelante)
    return chosen;
  },

  getLevelKey(levelId) {
    return (levelId.match(/^(A1|A2|B1|B2|C1)/) || ["A1"])[1];
  },

  generateSentence(word, template) {
    const [de, es] = word;
    let deSent = template.de.replace(/\[Name\]/g, de).replace(/\[Objekt\]/g, de).replace(/\[Substantiv\]/g, de).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, de).replace(/\[Infinitiv\]/g, de);
    let esSent = template.es.replace(/\[Name\]/g, es).replace(/\[Objekt\]/g, es).replace(/\[Substantiv\]/g, es).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, es).replace(/\[Infinitiv\]/g, es);
    deSent = deSent.charAt(0).toUpperCase() + deSent.slice(1);
    return { de: deSent, es: esSent, word };
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const baseWords = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (baseWords.length === 0) return [];

    const levelKey = this.getLevelKey(levelId);
    const templates = this.templates[levelKey] || this.templates.A1;
    const exercises = [];
    const allLevelWords = this.getVocabForLevel(levelId);
    const usedWords = new Set();
    const deWords = [...new Set(allLevelWords.map(w => w[0]))];
    const esWords = [...new Set(allLevelWords.map(w => w[1]))];

    baseWords.forEach((word, i) => {
      const templ = templates[i % templates.length];
      // Buscar palabra adecuada para la plantilla
      const compatibleWord = this.findWordForTemplate(allLevelWords, usedWords, templ.req) || word;
      usedWords.add(compatibleWord[0]);
      const sentence = this.generateSentence(compatibleWord, templ);
      const t = i % 8;
      let ex = null;

      const cleanEs = (compatibleWord[1] || "").replace(/^\[|\]$/g, ""); // quitar corchetes si los tiene
      const cleanDe = compatibleWord[0];

      if (t === 0) {
        // fill: completar palabra alemana (sin mostrar respuesta)
        const dist = this.randomSlice(deWords, 3, cleanDe);
        ex = {
          type: "fill",
          prompt: `Completa: \"___\" significa \"${cleanEs}\".`,
          answer: cleanDe,
          options: [...dist, cleanDe].sort(() => Math.random() - 0.5),
          hint: "Es una palabra del nivel."
        };
      } else if (t === 1) {
        ex = {
          type: "translateDE",
          prompt: `Traduce al alemán: \"${cleanEs}\"`,
          answer: cleanDe,
          hint: "Escribe la palabra alemana."
        };
      } else if (t === 2) {
        ex = {
          type: "translateES",
          prompt: `Traduce al español: \"${cleanDe}\"`,
          answer: cleanEs,
          hint: "Escribe la traducción."
        };
      } else if (t === 3) {
        const plural = compatibleWord[3] || "-";
        ex = {
          type: "plural",
          prompt: `¿Cuál es el plural de \"${cleanDe}\"?`,
          answer: plural,
          options: [plural, ...this.randomSlice(deWords, 3, cleanDe)].sort(() => Math.random() - 0.5),
          hint: "Recuerda las reglas de plural."
        };
      } else if (t === 4) {
        const distEs = this.randomSlice(esWords, 3, cleanEs);
        ex = {
          type: "choose",
          prompt: `¿Cuál es la traducción de \"${cleanDe}\"?`,
          answer: cleanEs,
          options: [...distEs, cleanEs].sort(() => Math.random() - 0.5),
          hint: "Mira bien las opciones."
        };
      } else if (t === 5) {
        const blank = sentence.de.replace(cleanDe, "___");
        const distFill = this.randomSlice(deWords, 3, cleanDe);
        ex = {
          type: "fillInSentence",
          prompt: `Completa la frase:\n\"${blank}\"`,
          answer: cleanDe,
          options: [...distFill, cleanDe].sort(() => Math.random() - 0.5),
          hint: "¿Qué palabra falta?"
        };
      } else if (t === 6) {
        const article = compatibleWord[2] || "der";
        const distArt = ["der","die","das"].filter(a => a !== article).sort(() => Math.random() - 0.5);
        ex = {
          type: "declension",
          prompt: `¿Cuál es el artículo correcto para \"${cleanDe}\"?`,
          answer: article,
          options: [article, ...distArt].sort(() => Math.random() - 0.5),
          hint: "Recuerda el género."
        };
      } else {
        // order
        const wordsArr = sentence.de.split(" ");
        const scrambled = [...wordsArr].sort(() => Math.random() - 0.5);
        ex = {
          type: "order",
          prompt: `Ordena estas palabras:\n${scrambled.join(" ")}`,
          answer: sentence.de,
          hint: "Forma una frase con sentido."
        };
      }

      if (ex) {
        ex.word = compatibleWord;
        ex.sentence = sentence;
        ex.translation = sentence.es;  // traducción de la frase completa
        exercises.push(ex);
      }
    });
    return exercises;
  },

  generateLesson(levelId, lessonIdx) {
    const config = window.LevelConfig?.getLevelConfig?.(levelId);
    if (!config || lessonIdx >= config.lessons) return null;
    return {
      id: levelId + "-l" + (lessonIdx + 1),
      title: "Lección " + (lessonIdx + 1),
      levelId,
      exercises: this.generateExercises(levelId, lessonIdx, config.wordsPerLesson)
    };
  },

  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  }
};

window.PhraseGenerator = PhraseGenerator;
