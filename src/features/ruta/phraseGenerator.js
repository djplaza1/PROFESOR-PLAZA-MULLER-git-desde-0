const PhraseGenerator = {
  synonyms: {
    "die Oma": ["die Großmutter", "die Oma"],
    "die Großmutter": ["die Oma", "die Großmutter"],
    "das Mädchen": ["das Mädel"],
    "der Junge": ["der Bub"],
    "das Auto": ["der Wagen"],
    "die Wohnung": ["das Apartment"],
    "die Toilette": ["das WC", "das Klo"],
    "das Handy": ["das Mobiltelefon"],
    "der Fernseher": ["der TV"],
    "das Foto": ["das Bild"],
    "die E-Mail": ["die Nachricht"],
    "der Laptop": ["der Computer", "der Rechner"],
    "das Fahrrad": ["das Rad"],
    "die U-Bahn": ["die Metro"],
    "die Straßenbahn": ["die Tram"]
  },

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

  hideWordInSentence(sentenceDe, targetWordDe) {
    let cleanWord = targetWordDe;
    const articleMatch = targetWordDe.match(/^(der|die|das) (.+)$/i);
    if (articleMatch) {
      cleanWord = articleMatch[2];
    }
    const escaped = cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b', 'i');
    if (re.test(sentenceDe)) {
      return sentenceDe.replace(re, '___');
    }
    const escapedFull = targetWordDe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reFull = new RegExp('\\b' + escapedFull + '\\b', 'i');
    if (reFull.test(sentenceDe)) {
      return sentenceDe.replace(reFull, '___');
    }
    const parts = sentenceDe.split(' ');
    const wordIndex = parts.findIndex(p => p.toLowerCase() === cleanWord.toLowerCase());
    if (wordIndex !== -1) {
      parts[wordIndex] = '___';
      return parts.join(' ');
    }
    return sentenceDe + ' ___';
  },

  typeTranslation: { n: "sustantivo", v: "verbo", adj: "adjetivo", adv: "adverbio", prep: "preposición", conj: "conjunción", pron: "pronombre", num: "número", art: "artículo", interj: "interjección" },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const baseWords = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (baseWords.length === 0) return [];

    const levelWords = this.getVocabForLevel(levelId);
    const exercises = [];
    const usedWords = new Set();
    const deAll = [...new Set(levelWords.map(w => w[0]))];
    const esAll = [...new Set(levelWords.map(w => w[1]))];

    const availableTypes = ['fill','translateDE','translateES','plural','choose','fillInSentence','declension','order'];
    const hasVerbs = levelWords.some(w => w[4] === 'v');
    if (hasVerbs) {
      availableTypes.push('conjugate');
      availableTypes.push('separableVerb');
    }
    const shuffledTypes = [...availableTypes].sort(() => Math.random() - 0.5);

    const templates = this.templates.A1;

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
          wordMap[slot] = { de: "___", es: "___" };
        }
      }
      const sentence = this.fillTemplate(tpl, wordMap);
      const mainWord = wordMap.Objekt || wordMap.Subjekt || wordMap.Name || wordMap.Substantiv || { de: "", es: "" };
      const deMain = mainWord.de;
      const esMain = mainWord.es;

      if (deMain === "" || deMain === "___") continue;

      const typeIndex = i % shuffledTypes.length;
      const type = shuffledTypes[typeIndex];
      let ex = null;
      const distDe = this.randomSlice(deAll, 3, deMain);
      const distEs = this.randomSlice(esAll, 3, esMain);

      switch(type) {
        case 'fill':
          ex = { type:"fill", prompt:`Completa: \"___\" significa \"${esMain}\".`, answer:deMain, options:[...distDe, deMain].sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 'translateDE':
          ex = { type:"translateDE", prompt:`Traduce al alemán: \"${esMain}\"`, answer:deMain, hint:"" };
          break;
        case 'translateES':
          ex = { type:"translateES", prompt:`Traduce al español: \"${deMain}\"`, answer:esMain, hint:"" };
          break;
        case 'plural':
          { const pl = (baseWords[i]?.[3]) || "-";
            ex = { type:"plural", prompt:`¿Cuál es el plural de \"${deMain}\"?`, answer:pl, options:[pl, ...this.randomSlice(deAll,3,pl)].sort(()=>Math.random()-0.5), hint:"" }; }
          break;
        case 'choose':
          ex = { type:"choose", prompt:`¿Cuál es la traducción de \"${deMain}\"?`, answer:esMain, options:[...distEs, esMain].sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 'fillInSentence':
          {
            const hiddenSentence = this.hideWordInSentence(sentence.de, deMain);
            ex = { type:"fillInSentence", prompt:`Completa la frase:\n\"${hiddenSentence}\"`, answer:deMain, options:[...distDe, deMain].sort(()=>Math.random()-0.5), hint:"" };
          }
          break;
        case 'declension':
          { const art = baseWords[i]?.[2] || "der";
            const distArt = ["der","die","das"].filter(a=>a!==art);
            ex = { type:"declension", prompt:`¿Cuál es el artículo correcto para \"${deMain}\"?`, answer:art, options:[art, ...distArt].sort(()=>Math.random()-0.5), hint:"" }; }
          break;
        case 'order':
          {
            let words = sentence.de.split(" ");
            let scrambled;
            do {
              scrambled = [...words].sort(() => Math.random() - 0.5);
            } while (scrambled.join(" ") === sentence.de && words.length > 1);
            ex = { type:"order", prompt:`Ordena estas palabras:\n${scrambled.join(" ")}`, answer:sentence.de, hint:"Forma una frase correcta." };
          }
          break;
        case 'conjugate':
          {
            const verbInSentence = Object.values(wordMap).find(w => w.de && levelWords.some(lw => lw[0]===w.de && lw[4]==='v'));
            let verbDe = verbInSentence ? verbInSentence.de : null;
            if (!verbDe) verbDe = (levelWords.find(w => w[4]==='v' && !usedWords.has(w[0])) || {0:"sein"})[0];
            const person = ["ich","du","er/sie/es","wir","ihr","sie/Sie"][Math.floor(Math.random()*6)];
            const conjMap = {
              sein: {ich:"bin",du:"bist","er/sie/es":"ist",wir:"sind",ihr:"seid","sie/Sie":"sind"},
              haben: {ich:"habe",du:"hast","er/sie/es":"hat",wir:"haben",ihr:"habt","sie/Sie":"haben"},
              werden: {ich:"werde",du:"wirst","er/sie/es":"wird",wir:"werden",ihr:"werdet","sie/Sie":"werden"},
            };
            const conj = (conjMap[verbDe] && conjMap[verbDe][person]) || verbDe;
            ex = { type:"conjugate", prompt:`Conjuga \"${verbDe}\" para \"${person}\":`, answer:conj, hint:"" };
          }
          break;
        case 'separableVerb':
          {
            const sepVerb = levelWords.find(w => w[4]==='v' && w[0].includes('_')) || {0:"aufstehen"};
            const term = sepVerb[0].replace('_',' ');
            const person = ["ich","du","er/sie/es","wir","ihr","sie/Sie"][Math.floor(Math.random()*6)];
            const base = term.split(' ')[1];
            const pref = term.split(' ')[0];
            const persForm = {ich:base, du:base+"st", "er/sie/es":base+"t", wir:base+"en", ihr:base+"t", "sie/Sie":base+"en"};
            const answer = persForm[person] + " " + pref;
            ex = { type:"separableVerb", prompt:`Conjuga \"${term}\" para \"${person}\":`, answer:answer, hint:"" };
          }
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