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
    schlafen: {ich:"schlafe",du:"schläfst","er/sie/es":"schläft",wir:"schlafen",ihr:"schlaft","sie/Sie":"schlafen"},
    laufen: {ich:"laufe",du:"läufst","er/sie/es":"läuft",wir:"laufen",ihr:"lauft","sie/Sie":"laufen"},
    sprechen: {ich:"spreche",du:"sprichst","er/sie/es":"spricht",wir:"sprechen",ihr:"sprecht","sie/Sie":"sprechen"},
    kommen: {ich:"komme",du:"kommst","er/sie/es":"kommt",wir:"kommen",ihr:"kommt","sie/Sie":"kommen"},
    gehen: {ich:"gehe",du:"gehst","er/sie/es":"geht",wir:"gehen",ihr:"geht","sie/Sie":"gehen"},
    heißen: {ich:"heiße",du:"heißt","er/sie/es":"heißt",wir:"heißen",ihr:"heißt","sie/Sie":"heißen"},
    arbeiten: {ich:"arbeite",du:"arbeitest","er/sie/es":"arbeitet",wir:"arbeiten",ihr:"arbeitet","sie/Sie":"arbeiten"},
    finden: {ich:"finde",du:"findest","er/sie/es":"findet",wir:"finden",ihr:"findet","sie/Sie":"finden"},
    wohnen: {ich:"wohne",du:"wohnst","er/sie/es":"wohnt",wir:"wohnen",ihr:"wohnt","sie/Sie":"wohnen"},
    spielen: {ich:"spiele",du:"spielst","er/sie/es":"spielt",wir:"spielen",ihr:"spielt","sie/Sie":"spielen"},
    machen: {ich:"mache",du:"machst","er/sie/es":"macht",wir:"machen",ihr:"macht","sie/Sie":"machen"},
    kochen: {ich:"koche",du:"kochst","er/sie/es":"kocht",wir:"kochen",ihr:"kocht","sie/Sie":"kochen"},
    lernen: {ich:"lerne",du:"lernst","er/sie/es":"lernt",wir:"lernen",ihr:"lernt","sie/Sie":"lernen"},
    singen: {ich:"singe",du:"singst","er/sie/es":"singt",wir:"singen",ihr:"singt","sie/Sie":"singen"},
    tanzen: {ich:"tanze",du:"tanzt","er/sie/es":"tanzt",wir:"tanzen",ihr:"tanzt","sie/Sie":"tanzen"},
    kaufen: {ich:"kaufe",du:"kaufst","er/sie/es":"kauft",wir:"kaufen",ihr:"kauft","sie/Sie":"kaufen"},
    verkaufen: {ich:"verkaufe",du:"verkaufst","er/sie/es":"verkauft",wir:"verkaufen",ihr:"verkauft","sie/Sie":"verkaufen"},
    besuchen: {ich:"besuche",du:"besuchst","er/sie/es":"besucht",wir:"besuchen",ihr:"besucht","sie/Sie":"besuchen"},
    anrufen: {ich:"rufe an",du:"rufst an","er/sie/es":"ruft an",wir:"rufen an",ihr:"ruft an","sie/Sie":"rufen an"},
    aufstehen: {ich:"stehe auf",du:"stehst auf","er/sie/es":"steht auf",wir:"stehen auf",ihr:"steht auf","sie/Sie":"stehen auf"},
    einkaufen: {ich:"kaufe ein",du:"kaufst ein","er/sie/es":"kauft ein",wir:"kaufen ein",ihr:"kauft ein","sie/Sie":"kaufen ein"},
    fernsehen: {ich:"sehe fern",du:"siehst fern","er/sie/es":"sieht fern",wir:"sehen fern",ihr:"seht fern","sie/Sie":"sehen fern"},
    mitbringen: {ich:"bringe mit",du:"bringst mit","er/sie/es":"bringt mit",wir:"bringen mit",ihr:"bringt mit","sie/Sie":"bringen mit"},
    abholen: {ich:"hole ab",du:"holst ab","er/sie/es":"holt ab",wir:"holen ab",ihr:"holt ab","sie/Sie":"holen ab"},
    zumachen: {ich:"mache zu",du:"machst zu","er/sie/es":"macht zu",wir:"machen zu",ihr:"macht zu","sie/Sie":"machen zu"},
    aufmachen: {ich:"mache auf",du:"machst auf","er/sie/es":"macht auf",wir:"machen auf",ihr:"macht auf","sie/Sie":"machen auf"},
    kennen: {ich:"kenne",du:"kennst","er/sie/es":"kennt",wir:"kennen",ihr:"kennt","sie/Sie":"kennen"}
  },

  isValidWord(w) {
    if (!w || !w[0] || !w[1]) return false;
    const de = w[0].trim();
    const es = w[1].trim();
    if (de.startsWith('[') || es.startsWith('[') || de.includes('...') || es === '-' || es === '') return false;
    if (w[4] === 'n' && w[2] === '' && !de.match(/^(der|die|das) /i)) return false;
    return true;
  },

  getDisplayWord(w) {
    if (w[4] !== 'n') return w[0];
    const de = w[0].trim();
    if (/^(der|die|das) /i.test(de)) return de;
    const art = w[2] ? w[2] : 'der';
    return art + ' ' + de;
  },

  getBareWord(w) {
    if (w[4] !== 'n') return w[0];
    return w[0].replace(/^(der|die|das) /i, '').trim();
  },

  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },

  getValidWords(levelId) {
    return this.getVocabForLevel(levelId).filter(w => this.isValidWord(w));
  },

  findWordByType(levelWords, usedSet, type) {
    const candidates = levelWords.filter(w => !usedSet.has(w[0]) && w[4] === type && this.isValidWord(w));
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  },

  selectWordsForLesson(levelId, lessonIdx, wordsPerLesson) {
    const valid = this.getValidWords(levelId);
    if (valid.length === 0) return [];
    const start = (lessonIdx * wordsPerLesson) % valid.length;
    let chosen = valid.slice(start, start + wordsPerLesson);
    if (chosen.length < wordsPerLesson) chosen = chosen.concat(valid.slice(0, wordsPerLesson - chosen.length));
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
    if (articleMatch) cleanWord = articleMatch[2];
    const escaped = cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b', 'i');
    if (re.test(sentenceDe)) return sentenceDe.replace(re, '___');
    const escapedFull = targetWordDe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reFull = new RegExp('\\b' + escapedFull + '\\b', 'i');
    if (reFull.test(sentenceDe)) return sentenceDe.replace(reFull, '___');
    const parts = sentenceDe.split(' ');
    const idx = parts.findIndex(p => p.toLowerCase() === cleanWord.toLowerCase());
    if (idx !== -1) { parts[idx] = '___'; return parts.join(' '); }
    return sentenceDe + ' ___';
  },

  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const baseWords = this.selectWordsForLesson(levelId, lessonIdx, wordsPerLesson);
    if (baseWords.length === 0) return [];
    const validLevel = this.getValidWords(levelId);
    const deAll = [...new Set(validLevel.map(w => this.getDisplayWord(w)))];
    const esAll = [...new Set(validLevel.map(w => w[1]))];
    const usedWords = new Set();
    const exercises = [];

    const types = ['fill','translateDE','translateES','choose','fillInSentence','order'];
    if (validLevel.some(w => w[4]==='n' && ['der','die','das'].includes(w[2]))) types.splice(2,0,'declension');
    if (validLevel.some(w => w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('['))) types.splice(4,0,'plural');
    const conjVerbs = validLevel.filter(w => w[4]==='v' && this.conjugations[w[0]]);
    if (conjVerbs.length > 0) types.push('conjugate');
    const sepVerbs = validLevel.filter(w => w[4]==='v' && (w[0].includes('_') || w[0].includes(' ')));
    if (sepVerbs.length > 0) types.push('separableVerb');

    const shuffledTypes = [...types].sort(() => Math.random() - 0.5);

    const templates = [
      { de: "[Subjekt] [Verb] [Objekt].", es: "[Subjekt] [Verb] [Objekt].", slots: {Subjekt:"n", Verb:"v", Objekt:"n"} },
      { de: "Ich bin [Name].", es: "Soy [Name].", slots: {Name:"n"} },
      { de: "Ich habe [Objekt].", es: "Tengo [Objekt].", slots: {Objekt:"n"} },
      { de: "[Substantiv] ist [Adjektiv].", es: "El/la [Substantiv] es [Adjektiv].", slots: {Substantiv:"n", Adjektiv:"adj"} },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt].", slots: {Objekt:"n"} },
      { de: "Wir spielen [Objekt].", es: "Jugamos a [Objekt].", slots: {Objekt:"n"} },
      { de: "Er sieht [Objekt].", es: "Él ve [Objekt].", slots: {Objekt:"n"} }
    ];

    for (let i = 0; i < baseWords.length; i++) {
      const tpl = templates[i % templates.length];
      const slots = tpl.slots;
      const wordMap = {};
      for (let slot in slots) {
        const typeNeeded = slots[slot];
        const found = this.findWordByType(validLevel, usedWords, typeNeeded);
        if (found) {
          wordMap[slot] = { de: typeNeeded==='n' ? this.getBareWord(found) : found[0], es: found[1] };
          usedWords.add(found[0]);
        } else {
          wordMap[slot] = { de: "___", es: "___" };
        }
      }
      const sentence = this.fillTemplate(tpl, wordMap);
      let mainWord = null;
      if (wordMap.Objekt && wordMap.Objekt.de !== '___')
        mainWord = validLevel.find(w => this.getBareWord(w)===wordMap.Objekt.de || w[0]===wordMap.Objekt.de);
      else if (wordMap.Subjekt && wordMap.Subjekt.de !== '___')
        mainWord = validLevel.find(w => this.getBareWord(w)===wordMap.Subjekt.de || w[0]===wordMap.Subjekt.de);
      else
        mainWord = baseWords[i];

      if (!mainWord || !this.isValidWord(mainWord)) continue;

      const deMain = this.getDisplayWord(mainWord);
      const esMain = mainWord[1];
      const bareDe = this.getBareWord(mainWord);

      const typeIdx = i % shuffledTypes.length;
      const type = shuffledTypes[typeIdx];
      let ex = null;

      switch(type) {
        case 'fill':
          ex = { type:"fill", prompt:`Completa: "___" significa "${esMain}".`, answer:deMain, options:this.randomSlice(deAll,3,deMain).concat(deMain).sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 'translateDE':
          ex = { type:"translateDE", prompt:`Traduce al alemán: "${esMain}"`, answer:deMain, hint:"" };
          break;
        case 'translateES':
          ex = { type:"translateES", prompt:`Traduce al español: "${deMain}"`, answer:esMain, hint:"" };
          break;
        case 'choose':
          ex = { type:"choose", prompt:`¿Cuál es la traducción de "${deMain}"?`, answer:esMain, options:this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5), hint:"" };
          break;
        case 'declension':
          if (mainWord[4]==='n' && ['der','die','das'].includes(mainWord[2])) {
            const art = mainWord[2];
            const distArt = ["der","die","das"].filter(a=>a!==art);
            ex = { type:"declension", prompt:`¿Cuál es el artículo correcto para "${bareDe}"?`, answer:art, options:[art, ...distArt].sort(()=>Math.random()-0.5), hint:"" };
          }
          break;
        case 'plural':
          if (mainWord[4]==='n' && mainWord[3] && mainWord[3]!=='-' && !mainWord[3].startsWith('[')) {
            const pl = mainWord[3];
            ex = { type:"plural", prompt:`¿Cuál es el plural de "${bareDe}"?`, answer:pl, options:this.randomSlice(deAll,3,pl).concat(pl).sort(()=>Math.random()-0.5), hint:"" };
          }
          break;
        case 'fillInSentence':
          {
            const hidden = this.hideWordInSentence(sentence.de, bareDe);
            ex = { type:"fillInSentence", prompt:`Completa la frase:\n"${hidden}"`, answer:bareDe, options:this.randomSlice(deAll,3,bareDe).concat(bareDe).sort(()=>Math.random()-0.5), hint:"" };
          }
          break;
        case 'order':
          {
            let words = sentence.de.split(/\s+/);
            let scrambled;
            do { scrambled = [...words].sort(() => Math.random() - 0.5); } while (scrambled.join(' ') === sentence.de && words.length > 1);
            ex = { type:"order", prompt:`Ordena estas palabras:\n${scrambled.join(' ')}`, answer:sentence.de, hint:"Forma una frase correcta." };
          }
          break;
        case 'conjugate':
          if (mainWord[4]==='v' && this.conjugations[mainWord[0]]) {
            const persons = ["ich","du","er/sie/es","wir","ihr","sie/Sie"];
            const person = persons[Math.floor(Math.random()*persons.length)];
            const answer = this.conjugations[mainWord[0]][person];
            ex = { type:"conjugate", prompt:`Conjuga "${mainWord[0]}" para "${person}":`, answer:answer, hint:"" };
          }
          break;
        case 'separableVerb':
          {
            const sepVerb = validLevel.find(w => w[4]==='v' && (w[0].includes('_') || w[0].includes(' ')) && !usedWords.has(w[0])) || sepVerbs[0];
            if (sepVerb && this.conjugations[sepVerb[0]]) {
              const persons = ["ich","du","er/sie/es","wir","ihr","sie/Sie"];
              const person = persons[Math.floor(Math.random()*persons.length)];
              const answer = this.conjugations[sepVerb[0]][person];
              ex = { type:"separableVerb", prompt:`Conjuga "${sepVerb[0]}" para "${person}":`, answer:answer, hint:"" };
              usedWords.add(sepVerb[0]);
            }
          }
          break;
      }
      if (ex) {
        ex.word = mainWord;
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
  }
};

window.PhraseGenerator = PhraseGenerator;