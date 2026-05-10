const PhraseGenerator = {
  synonyms: {
    "coche": ["auto","carro","vehículo"],
    "auto":  ["coche","carro","vehículo"],
    "carro": ["coche","auto","vehículo"],
    "perro": ["can","chucho"],
    "casa":  ["hogar","vivienda"],
    "vivienda": ["casa","hogar"],
    "bonito": ["hermoso","lindo","bello"],
    "hermoso": ["bonito","lindo","bello"],
    "lindo":  ["bonito","hermoso","bello"],
    "grande": ["enorme","vasto"],
    "pequeño": ["chico","reducido"],
    "comida": ["alimento","manjar"],
    "chico":  ["muchacho","niño","joven"],
    "chica":  ["muchacha","niña","joven"],
    "muchacho": ["chico","niño"],
    "muchacha": ["chica","niña"],
    "trabajador": ["laborioso","diligente"],
    "simpático": ["agradable","amable"],
    "amable": ["simpático","afable"],
    "contento": ["feliz","alegre"],
    "feliz":   ["contento","alegre"]
  },
  conjugations: {
    sein: {ich:"bin",du:"bist","er/sie/es":"ist",wir:"sind",ihr:"seid","sie/Sie":"sind"},
    haben: {ich:"habe",du:"hast","er/sie/es":"hat",wir:"haben",ihr:"habt","sie/Sie":"haben"},
    werden: {ich:"werde",du:"wirst","er/sie/es":"wird",wir:"werden",ihr:"werdet","sie/Sie":"werden"},
    geben: {ich:"gebe",du:"gibst","er/sie/es":"gibt",wir:"geben",ihr:"gebt","sie/Sie":"geben"},
    essen: {ich:"esse",du:"isst","er/sie/es":"isst",wir:"essen",ihr:"esst","sie/Sie":"essen"},
    trinken: {ich:"trinke",du:"trinkst","er/sie/es":"trinkt",wir:"trinken",ihr:"trinkt","sie/Sie":"trinken"},
    nehmen: {ich:"nehme",du:"nimmst","er/sie/es":"nimmt",wir:"nehmen",ihr:"nehmt","sie/Sie":"nehmen"},
    sehen: {ich:"sehe",du:"siehst","er/sie/es":"sieht",wir:"sehen",ihr:"seht","sie/Sie":"sehen"},
    lesen: {ich:"lese",du:"liest","er/sie/es":"liest",wir:"lesen",ihr:"lest","sie/Sie":"lesen"},
    fahren: {ich:"fahre",du:"fährst","er/sie/es":"fährt",wir:"fahren",ihr:"fahrt","sie/Sie":"fahren"},
    kommen: {ich:"komme",du:"kommst","er/sie/es":"kommt",wir:"kommen",ihr:"kommt","sie/Sie":"kommen"},
    gehen: {ich:"gehe",du:"gehst","er/sie/es":"geht",wir:"gehen",ihr:"geht","sie/Sie":"gehen"},
    sprechen: {ich:"spreche",du:"sprichst","er/sie/es":"spricht",wir:"sprechen",ihr:"sprecht","sie/Sie":"sprechen"},
    arbeiten: {ich:"arbeite",du:"arbeitest","er/sie/es":"arbeitet",wir:"arbeiten",ihr:"arbeitet","sie/Sie":"arbeiten"},
    finden: {ich:"finde",du:"findest","er/sie/es":"findet",wir:"finden",ihr:"findet","sie/Sie":"finden"},
    wohnen: {ich:"wohne",du:"wohnst","er/sie/es":"wohnt",wir:"wohnen",ihr:"wohnt","sie/Sie":"wohnen"},
    spielen: {ich:"spiele",du:"spielst","er/sie/es":"spielt",wir:"spielen",ihr:"spielt","sie/Sie":"spielen"},
    machen: {ich:"mache",du:"machst","er/sie/es":"macht",wir:"machen",ihr:"macht","sie/Sie":"machen"},
    kaufen: {ich:"kaufe",du:"kaufst","er/sie/es":"kauft",wir:"kaufen",ihr:"kauft","sie/Sie":"kaufen"},
    kennen: {ich:"kenne",du:"kennst","er/sie/es":"kennt",wir:"kennen",ihr:"kennt","sie/Sie":"kennen"}
  },
  getArticle(w) { const de = w[0].trim(); const m = de.match(/^(der|die|das)\s/i); if (m) return m[1]; if (w[2] && ["der","die","das"].includes(w[2])) return w[2]; return null; },
  getGender(w) { const art = this.getArticle(w); return art === "der" ? "m" : art === "die" ? "f" : art === "das" ? "n" : null; },
  canonizeNoun(w) { const art = this.getArticle(w); const bare = w[0].replace(/^(der|die|das)\s?/i, ""); return art ? art + " " + bare : bare; },
  getBareNoun(w) { return w[0].replace(/^(der|die|das)\s?/i, ""); },
  isValidWord(w) { if (!w || !w[0] || !w[1]) return false; const de = w[0].trim(), es = w[1].trim(); return !de.startsWith("[") && !es.startsWith("[") && es !== "-" && es !== ""; },
  getVocabForLevel(levelId) { const R = window.Muller?.Ruta; return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : []; },
  getValidWords(levelId) { return this.getVocabForLevel(levelId).filter(w => this.isValidWord(w)); },
  randomSlice(arr, count, exclude) { return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count); },
  hideWordInSentence(sentence, word) {
    const bare = word.replace(/^(der|die|das)\s?/i, "");
    // Oculta el grupo nominal completo: posesivo + bare, o artículo + bare
    const re = new RegExp("\\b(?:meinen?|deinen?|ihren?|euren?|unseren?|meine?|deine?|ihre?|eure?|unsere?|der|die|das|dem|den|des)\\s" + bare.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b|\\b" + bare.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    return sentence.replace(re, "___");
  },
  splitCleanSentence(sentence) { const clean = sentence.replace(/[.!?¡¿]+$/g, "").trim(); return clean.split(/\s+/).filter(Boolean); },
  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const allValid = this.getValidWords(levelId);
    if (allValid.length === 0) return [];
    const exercises = [];
    const start = (lessonIdx * wordsPerLesson) % allValid.length;
    let lessonWords = [];
    if (start + wordsPerLesson <= allValid.length) {
      lessonWords = allValid.slice(start, start + wordsPerLesson);
    } else {
      lessonWords = allValid.slice(start).concat(allValid.slice(0, (start + wordsPerLesson) % allValid.length));
    }
    const valid = lessonWords;
    const usedSet = new Set();
    const types = ["fill","translateDE","translateES","choose"];
    if (valid.some(w => this.getArticle(w))) types.push("declension");
    if (valid.some(w => w[3] && w[3] !== "-" && !w[3].startsWith("["))) types.push("plural");
    if (valid.some(w => w[4] === "v" && this.conjugations[w[0]])) types.push("conjugate");
    const deAllNouns = [...new Set(valid.filter(w => w[4]==="n").map(w => this.canonizeNoun(w)))];
    const esAll = [...new Set(valid.map(w => w[1]))];
    for (let r = 0; r < 2; r++) {
      for (let w of valid) {
        if (usedSet.has(w[0] + r)) continue;
        usedSet.add(w[0] + r);
        const type = types[Math.floor(Math.random() * types.length)];
        const deMain = this.canonizeNoun(w);
        const bare = this.getBareNoun(w);
        const esMain = w[1];
        let ex = null;
        switch(type) {
          case "fill": ex = { type:"fill", prompt:`Completa: "___" significa "${esMain}".`, answer:deMain, options: this.randomSlice(deAllNouns,3,deMain).concat(deMain).sort(()=>Math.random()-0.5), hint:"" }; break;
          case "translateDE": ex = { type:"translateDE", prompt:`Traduce al alemán: "${esMain}"`, answer:deMain, hint:"" }; break;
          case "translateES": ex = { type:"translateES", prompt:`Traduce al español: "${deMain}"`, answer:esMain, hint:"" }; break;
          case "choose": ex = { type:"choose", prompt:`¿Cuál es la traducción de "${deMain}"?`, answer:esMain, options: this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5), hint:"" }; break;
          case "declension": { const art = this.getArticle(w); if (art) { const dist = ["der","die","das"].filter(a=>a!==art); ex = { type:"declension", prompt:`¿Cuál es el artículo correcto para "${bare}"?`, answer:art, options: [art, ...dist].sort(()=>Math.random()-0.5), hint:"" }; } break; }
          case "plural": if (w[3] && w[3] !== "-" && !w[3].startsWith("[")) { ex = { type:"plural", prompt:`¿Cuál es el plural de "${bare}"?`, answer:w[3], options: this.randomSlice(deAllNouns,3,w[3]).concat(w[3]).sort(()=>Math.random()-0.5), hint:"" }; } break;
          case "conjugate": if (w[4] === "v" && this.conjugations[w[0]]) { const persons = ["ich","du","er/sie/es","wir","ihr","sie/Sie"]; const person = persons[Math.floor(Math.random()*persons.length)]; ex = { type:"conjugate", prompt:`Conjuga "${w[0]}" para "${person}":`, answer:this.conjugations[w[0]][person], hint:"" }; } break;
        }
        if (ex) {
          ex.word = w;
          ex.translation = esMain;
          ex.speakText = w[4] === 'n' ? this.canonizeNoun(w) : w[0];
          exercises.push(ex);
        }
      }
    }
    // Ejercicios contextuales
    const bank = window.PhrasesBank || {};
    const levelBank = bank[levelId] || {};
    const bankKeys = Object.keys(levelBank);
    if (bankKeys.length > 0) {
      const contextCount = Math.min(valid.length, bankKeys.length, 30);
      for (let i = 0; i < contextCount; i++) {
        const key = bankKeys[Math.floor(Math.random() * bankKeys.length)];
        const phrases = levelBank[key];
        if (!phrases || phrases.length === 0) continue;
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const hiddenSentence = this.hideWordInSentence(phrase.de, key);
        exercises.push({
          speakText: phrase.de,
          type: "fillInSentence",
          prompt: `Completa la frase:\n"${hiddenSentence}"`,
          answer: this.getBareNoun({0:key}),
          options: this.randomSlice([...new Set(valid.map(w=>this.getBareNoun(w)))], 3, this.getBareNoun({0:key})).concat(this.getBareNoun({0:key})).sort(()=>Math.random()-0.5),
          hint: "",
          translation: phrase.es,
          word: valid.find(w => this.getBareNoun(w) === this.getBareNoun({0:key})) || valid[0]
        });
        const cleanWords = this.splitCleanSentence(phrase.de);
        const shuffled = [...cleanWords].sort(() => Math.random() - 0.5);
        exercises.push({
          speakText: phrase.de,
          type: "order",
          prompt: `Ordena estas palabras:\n${shuffled.join(" ")}`,
          answer: phrase.de,
          hint: "Forma una frase correcta.",
          translation: phrase.es,
          word: valid.find(w => this.getBareNoun(w) === this.getBareNoun({0:key})) || valid[0]
        });
      }
    }
    // matchPairs
    const matchCount = Math.min(5, valid.length);
    const matchWords = valid.sort(() => Math.random() - 0.5).slice(0, matchCount);
    const dePairs = matchWords.map(w => this.canonizeNoun(w));
    const esPairs = matchWords.map(w => w[1]);
    const shuffledDe = [...dePairs].sort(() => Math.random() - 0.5);
    const shuffledEs = [...esPairs].sort(() => Math.random() - 0.5);
    exercises.push({
      speakText: dePairs[0],
      type: "matchPairs",
      prompt: "Empareja cada palabra en alemán con su traducción en español",
      pairs: dePairs.map((de, i) => ({ de, es: esPairs[i] })),
      leftColumn: shuffledDe,
      rightColumn: shuffledEs,
      hint: "Selecciona una palabra de la izquierda y luego su traducción de la derecha.",
      word: matchWords[0]
    });
    return exercises;
  },
  generateLesson(levelId, lessonIdx) {
    const config = window.LevelConfig?.getLevelConfig?.(levelId);
    if (!config) return null;
    const wordsPerLesson = config.wordsPerLesson || 10;
    return {
      id: levelId + "-l" + (lessonIdx + 1),
      title: "Lección " + (lessonIdx + 1),
      levelId,
      exercises: this.generateExercises(levelId, lessonIdx, wordsPerLesson)
    };
  }
};
window.PhraseGenerator = PhraseGenerator;