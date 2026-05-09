const PhraseGenerator = {
  // ── Sinónimos aceptados ──
  synonyms: {
    "die Oma": ["die Großmutter", "die Oma"],
    "die Großmutter": ["die Oma", "die Großmutter"],
  },

  // ── Plantillas que requieren tipo específico ──
  templates: {
    A1: [
      { de: "[Subjekt] [Verb] [Objekt].", es: "[Subjekt] [Verb] [Objekt].", slots: {Subjekt:"n", Verb:"v", Objekt:"n"} },
      { de: "Ich bin [Name].", es: "Soy [Name].", slots: {Name:"n"} },
      { de: "Das ist ein [Objekt].", es: "Esto es un [Objekt].", slots: {Objekt:"n"} },
      { de: "Ich habe ein [Objekt].", es: "Tengo un [Objekt].", slots: {Objekt:"n"} },
      { de: "Der [Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv].", slots: {Substantiv:"n", Adjektiv:"adj"} },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt].", slots: {Objekt:"n"} },
      { de: "Wir spielen [Objekt].", es: "Jugamos a [Objekt].", slots: {Objekt:"n"} },
      { de: "Er sieht [Objekt].", es: "Él ve [Objekt].", slots: {Objekt:"n"} }
    ]
  },

  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },

  // Busca palabra de un tipo en el nivel, excluyendo usadas
  findWordByType(levelWords, usedSet, type) {
    const candidates = levelWords.filter(w => !usedSet.has(w[0]) && w[4] === type);
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  },

  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const allWords = this.getVocabForLevel(levelId);
    if (allWords.length === 0) return [];
    const start = (lessonIdx * wordsPerLesson) % allWords.length;
    let chosen = allWords.slice(start, start + wordsPerLesson);
    if (chosen.length < wordsPerLesson) chosen = chosen.concat(allWords.slice(0, wordsPerLesson - chosen.length));
    return chosen;
  },

  fillTemplate(tpl, wordMap) {
    let de = tpl.de, es = tpl.es;
    for (let slot in tpl.slots) {
      const w = wordMap[slot] || { de: "___", es: "___" };
      de = de.replace(`[${slot}]`, w.de);
      es = es.replace(`[${slot}]`, w.es);
    }
    return { de: de.charAt(0).toUpperCase() + de.slice(1), es };
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const baseWords = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (baseWords.length === 0) return [];

    const levelWords = this.getVocabForLevel(levelId);
    const templates = this.templates.A1; // por ahora todos A1 hasta ampliar
    const exercises = [];
    const usedWords = new Set();
    const deAll = [...new Set(levelWords.map(w => w[0]))];
    const esAll = [...new Set(levelWords.map(w => w[1]))];

    for (let i = 0; i < baseWords.length; i++) {
      const tpl = templates[i % templates.length];
      const slots = tpl.slots;
      const wordMap = {};
      for (let slot in slots) {
        const typeNeeded = slots[slot];
        const found = this.findWordByType(levelWords, usedWords, typeNeeded);
        if (found) {
          wordMap[slot] = { de: found[0], es: found[1] };
          usedWords.add(found[0]);
        } else {
          // Fallback: usar cualquier palabra no usada
          const any = levelWords.find(w => !usedWords.has(w[0]));
          if (any) { wordMap[slot] = { de: any[0], es: any[1] }; usedWords.add(any[0]); }
          else { wordMap[slot] = { de: "___", es: "___" }; }
        }
      }
      const sentence = this.fillTemplate(tpl, wordMap);
      const mainWord = wordMap.Objekt || wordMap.Subjekt || wordMap.Name || wordMap.Substantiv || { de: "", es: "" };
      const deMain = mainWord.de;
      const esMain = mainWord.es;

      const t = i % 8;
      let ex = null;
      const distDe = this.randomSlice(deAll, 3, deMain);
      const distEs = this.randomSlice(esAll, 3, esMain);

      switch(t) {
        case 0:
          ex = { type:"fill", prompt:`Completa: \"___\" significa \"${esMain}\".`, answer:deMain, options:[...distDe, deMain].sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 1:
          ex = { type:"translateDE", prompt:`Traduce al alemán: \"${esMain}\"`, answer:deMain, hint:"" };
          break;
        case 2:
          ex = { type:"translateES", prompt:`Traduce al español: \"${deMain}\"`, answer:esMain, hint:"" };
          break;
        case 3:
          { const pl = (baseWords[i]?.[3]) || "-";
            ex = { type:"plural", prompt:`¿Cuál es el plural de \"${deMain}\"?`, answer:pl, options:[pl, ...this.randomSlice(deAll,3,pl)].sort(()=>Math.random()-0.5), hint:"" }; }
          break;
        case 4:
          ex = { type:"choose", prompt:`¿Cuál es la traducción de \"${deMain}\"?`, answer:esMain, options:[...distEs, esMain].sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 5:
          { const blankSent = sentence.de.replace(deMain, "___");
            ex = { type:"fillInSentence", prompt:`Completa la frase:\n\"${blankSent}\"`, answer:deMain, options:[...distDe, deMain].sort(()=>Math.random()-0.5), hint:"" }; }
          break;
        case 6:
          { const art = baseWords[i]?.[2] || "der";
            const distArt = ["der","die","das"].filter(a=>a!==art);
            ex = { type:"declension", prompt:`¿Cuál es el artículo correcto para \"${deMain}\"?`, answer:art, options:[art, ...distArt].sort(()=>Math.random()-0.5), hint:"" }; }
          break;
        case 7:
          { const scrambled = sentence.de.split(" ").sort(()=>Math.random()-0.5);
            ex = { type:"order", prompt:`Ordena estas palabras:\n${scrambled.join(" ")}`, answer:sentence.de, hint:"Forma una frase correcta." }; }
          break;
      }
      if (ex) {
        ex.word = baseWords[i];
        ex.sentence = sentence;
        ex.translation = sentence.es;
        exercises.push(ex);
      }
    }
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
