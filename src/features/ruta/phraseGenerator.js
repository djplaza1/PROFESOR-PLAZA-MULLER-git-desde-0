const PhraseGenerator = {
  // ── Plantillas por nivel ──
  templates: {
    A1: [
      { de: "Ich bin [Name].",          es: "Soy [Name]." },
      { de: "Das ist ein [Objekt].",    es: "Esto es un [Objekt]." },
      { de: "Ich habe ein [Objekt].",   es: "Tengo un [Objekt]." },
      { de: "Der [Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv]." },
      { de: "Ich mag [Objekt].",        es: "Me gusta [Objekt]." },
      { de: "Wir spielen [Objekt].",    es: "Jugamos a [Objekt]." },
      { de: "Er sieht [Objekt].",       es: "Él ve [Objekt]." }
    ],
    A2: [
      { de: "Gestern war ich im [Ort].",     es: "Ayer estuve en el [Ort]." },
      { de: "Ich möchte [Objekt] kaufen.",   es: "Quisiera comprar [Objekt]." },
      { de: "Hast du [Objekt] gesehen?",     es: "¿Has visto [Objekt]?" },
      { de: "Wir fahren nach [Ort].",        es: "Viajamos a [Ort]." },
      { de: "Kannst du [Objekt] bringen?",   es: "¿Puedes traer [Objekt]?" }
    ],
    B1: [
      { de: "Obwohl es regnete, gingen wir [Infinitiv].", es: "Aunque llovía, fuimos a [Infinitiv]." },
      { de: "Wenn ich Zeit hätte, würde ich [Objekt] lernen.", es: "Si tuviera tiempo, aprendería [Objekt]." },
      { de: "Der [Substantiv], den ich gekauft habe, war teuer.", es: "El/la [Substantiv] que compré era caro/a." },
      { de: "Es ist wichtig, [Objekt] zu verstehen.", es: "Es importante entender [Objekt]." }
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

  // ── Verbos separables ──
  separableVerbs: {
    "aufstehen": ["auf", "stehen"],
    "einkaufen": ["ein", "kaufen"],
    "fernsehen": ["fern", "sehen"],
    "mitkommen": ["mit", "kommen"],
    "anrufen":    ["an", "rufen"],
    "abholen":    ["ab", "holen"],
    "zurückkommen": ["zurück", "kommen"]
  },

  // ── Conjugaciones (presente) ──
  conjugations: {
    "sein":   ["bin", "bist", "ist", "sind", "seid"],
    "haben":  ["habe", "hast", "hat", "haben", "habt"],
    "werden": ["werde", "wirst", "wird", "werden", "werdet"],
    "können": ["kann", "kannst", "kann", "können", "könnt"],
    "müssen": ["muss", "musst", "muss", "müssen", "müsst"],
    "wollen": ["will", "willst", "will", "wollen", "wollt"],
    "dürfen": ["darf", "darfst", "darf", "dürfen", "dürft"],
    "sollen": ["soll", "sollst", "soll", "sollen", "sollt"],
    "mögen":  ["mag", "magst", "mag", "mögen", "mögt"],
    "gehen":  ["gehe", "gehst", "geht", "gehen", "geht"]
  },

  // ── Obtener vocabulario ──
  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },

  getWordsInLang(levelId, langIndex) {
    const levelVocab = this.getVocabForLevel(levelId);
    let all = levelVocab.length >= 5 ? levelVocab : [];
    if (all.length < 5) {
      const R = window.Muller?.Ruta;
      if (R && R.VOCAB) Object.values(R.VOCAB).forEach(arr => all = all.concat(arr));
    }
    return [...new Set(all.map(w => w[langIndex]).filter(Boolean))];
  },

  // ── Seleccionar palabras (nuevas + repaso de fallos) ──
  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const allWords = this.getVocabForLevel(levelId);
    if (allWords.length === 0) return [];

    const progress = window.SRSHelpers?.loadProgress() || { wordSRS: {} };
    const srs = progress.wordSRS || {};

    const reviewCount = Math.floor(wordsPerLesson * 0.3);
    const newCount = wordsPerLesson - reviewCount;

    const start = (lessonIdx * newCount) % allWords.length;
    let newWords = allWords.slice(start, start + newCount);
    if (newWords.length < newCount) {
      newWords = newWords.concat(allWords.slice(0, newCount - newWords.length));
    }

    let reviewCandidates = [];
    Object.entries(srs).forEach(([key, d]) => {
      if (d && d.incorrect > 0 && !newWords.some(w => w[0] === key)) {
        reviewCandidates.push({ key, rate: d.incorrect / ((d.correct || 0) + d.incorrect) });
      }
    });
    reviewCandidates.sort((a,b) => b.rate - a.rate);

    let reviewWords = [];
    const allVocab = [];
    const R = window.Muller?.Ruta;
    if (R && R.VOCAB) Object.values(R.VOCAB).forEach(a => allVocab.push(...a));
    for (let rc of reviewCandidates) {
      const w = allVocab.find(x => x[0] === rc.key);
      if (w) { reviewWords.push(w); if (reviewWords.length >= reviewCount) break; }
    }
    return [...newWords, ...reviewWords].slice(0, wordsPerLesson);
  },

  getLevelKey(levelId) {
    return (levelId.match(/^(A1|A2|B1|B2|C1)/) || ['A1'])[1];
  },

  generateSentence(word, template) {
    const [de, es] = word;
    let deSent = template.de.replace(/\[Name\]/g, de).replace(/\[Objekt\]/g, de).replace(/\[Substantiv\]/g, de).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, de).replace(/\[Infinitiv\]/g, de);
    let esSent = template.es.replace(/\[Name\]/g, es).replace(/\[Objekt\]/g, es).replace(/\[Substantiv\]/g, es).replace(/\[Adjektiv\]/g, es).replace(/\[Ort\]/g, es).replace(/\[Infinitiv\]/g, es);
    deSent = deSent.charAt(0).toUpperCase() + deSent.slice(1);
    return { de: deSent, es: esSent, word };
  },

  // ── Generar ejercicios con todos los tipos ──
  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const words = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (words.length === 0) return [];

    const levelKey = this.getLevelKey(levelId);
    const templates = this.templates[levelKey] || this.templates.A1;
    const exercises = [];
    const deWords = this.getWordsInLang(levelId, 0);
    const esWords = this.getWordsInLang(levelId, 1);
    let sepVerbKeys = Object.keys(this.separableVerbs);
    let conjKeys = Object.keys(this.conjugations);

    words.forEach((word, i) => {
      const templ = templates[i % templates.length];
      const sentence = this.generateSentence(word, templ);
      const t = i % 10;  // 10 tipos de ejercicio
      let ex = null;

      if (t === 0) {
        ex = window.ExerciseTypes.fill(word[0], word[1], this.randomSlice(deWords, 3, word[0]));
      } else if (t === 1) {
        ex = window.ExerciseTypes.translateDE(word[1], word[0]);
      } else if (t === 2) {
        ex = window.ExerciseTypes.translateES(word[0], word[1]);
      } else if (t === 3) {
        ex = window.ExerciseTypes.plural(word[0], word[3] || "-", this.randomSlice(deWords, 3, word[0]));
      } else if (t === 4) {
        ex = window.ExerciseTypes.choose(word[0], word[1], this.randomSlice(esWords, 3, word[1]));
      } else if (t === 5) {
        const blankSent = sentence.de.replace(word[0], "___");
        const distDe = this.randomSlice(deWords, 3, word[0]);
        ex = {
          type: "fillInSentence",
          prompt: `Completa la frase:\n"${blankSent}"`,
          answer: word[0],
          hint: "¿Qué palabra falta?",
          options: [...distDe, word[0]].sort(() => Math.random() - 0.5)
        };
      } else if (t === 6) {
        if (sepVerbKeys.length > 0) {
          const sv = sepVerbKeys[Math.floor(Math.random() * sepVerbKeys.length)];
          const [pref, stem] = this.separableVerbs[sv];
          ex = {
            type: "separableVerb",
            prompt: `Completa con el prefijo separable del verbo "${sv}":\n"Ich will morgen ${stem} ___."`,
            answer: pref,
            hint: `El prefijo de "${sv}" va al final.`
          };
        } else {
          ex = window.ExerciseTypes.fill(word[0], word[1], this.randomSlice(deWords, 3, word[0]));
        }
      } else if (t === 7) {
        if (conjKeys.length > 0) {
          const verb = conjKeys[Math.floor(Math.random() * conjKeys.length)];
          const forms = this.conjugations[verb];
          const pronoun = ["ich","du","er/sie/es","wir","ihr"][i % 5];
          const idx = ["ich","du","er/sie/es","wir","ihr"].indexOf(pronoun);
          const correctForm = forms[idx] || forms[0];
          ex = {
            type: "conjugate",
            prompt: `Conjuga "${verb}" para "${pronoun}" en presente.`,
            answer: correctForm,
            hint: `Terminación típica para ${pronoun}.`
          };
        } else {
          ex = window.ExerciseTypes.fill(word[0], word[1], this.randomSlice(deWords, 3, word[0]));
        }
      } else if (t === 8) {
        const article = word[2] || "der";
        const distArt = ["der","die","das"].filter(a => a !== article).sort(() => Math.random() - 0.5);
        ex = {
          type: "declension",
          prompt: `¿Cuál es el artículo correcto para "${word[0]}"?`,
          answer: article,
          options: [article, ...distArt].sort(() => Math.random() - 0.5),
          hint: "Recuerda el género del sustantivo."
        };
      } else {
        const scrambled = sentence.de.split(" ").sort(() => Math.random() - 0.5);
        ex = {
          type: "order",
          prompt: `Ordena estas palabras:\n${scrambled.join(" ")}`,
          answer: sentence.de,
          hint: `La frase correcta empieza con "${scrambled[0]}".`
        };
      }

      if (ex) {
        ex.word = word;
        ex.sentence = sentence;
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
