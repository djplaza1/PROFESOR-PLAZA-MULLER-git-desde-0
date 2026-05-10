const PhraseGenerator = {
  // Banco de frases fijas por nivel (expandiremos progresivamente)
  sentenceBank: {
    'A1.1': [
      { de: "Das ist [ein/kein] [Objekt].", es: "Esto es [un/ningún] [Objekt].", slots: {Objekt:"n"}, tags:["nominativ","artikel"] },
      { de: "Ich habe [ein/kein] [Objekt].", es: "Tengo [un/ningún] [Objekt].", slots: {Objekt:"n"}, tags:["akkusativ","artikel"] },
      { de: "[Subjekt] ist [Adjektiv].", es: "[Subjekt] es [Adjektiv].", slots: {Subjekt:"n", Adjektiv:"adj"}, tags:["sein","prädikativ"] },
      { de: "[Subjekt] [Verb] [Objekt].", es: "[Subjekt] [Verb] [Objekt].", slots: {Subjekt:"n", Verb:"v", Objekt:"n"}, tags:["svo"] },
      { de: "Ich mag [Objekt].", es: "Me gusta [Objekt].", slots: {Objekt:"n"}, tags:["mögen"] },
      { de: "Er sieht [Objekt].", es: "Él ve [Objekt].", slots: {Objekt:"n"}, tags:["sehen"] },
      { de: "Wir spielen [Objekt].", es: "Jugamos a [Objekt].", slots: {Objekt:"n"}, tags:["spielen"] },
      { de: "[Subjekt] und [Subjekt2] sind [Adjektiv].", es: "[Subjekt] y [Subjekt2] son [Adjektiv].", slots: {Subjekt:"n", Subjekt2:"n", Adjektiv:"adj"}, tags:["plural","sein"] },
      { de: "Wo ist [Subjekt]?", es: "¿Dónde está [Subjekt]?", slots: {Subjekt:"n"}, tags:["frage","wo"] },
      { de: "Wie ist [Subjekt]?", es: "¿Cómo es [Subjekt]?", slots: {Subjekt:"n"}, tags:["frage","wie"] },
      { de: "Ich gehe in [Ort].", es: "Voy a [Ort].", slots: {Ort:"n"}, tags:["gehen","akkusativ"] },
      { de: "[Subjekt] kommt aus [Ort].", es: "[Subjekt] viene de [Ort].", slots: {Subjekt:"n", Ort:"n"}, tags:["kommen","dativ"] },
      { de: "[Subjekt] wohnt in [Ort].", es: "[Subjekt] vive en [Ort].", slots: {Subjekt:"n", Ort:"n"}, tags:["wohnen","dativ"] },
      { de: "Ich habe [Zahl] [Objekt].", es: "Tengo [Zahl] [Objekt].", slots: {Zahl:"num", Objekt:"n"}, tags:["zahlen","akkusativ"] },
      { de: "[Subjekt] kann [Verb].", es: "[Subjekt] puede [Verb].", slots: {Subjekt:"n", Verb:"v"}, tags:["modal","können"] },
      { de: "Möchtest du [Objekt]?", es: "¿Quieres [Objekt]?", slots: {Objekt:"n"}, tags:["modal","möchten"] },
      { de: "[Subjekt] ist nicht [Adjektiv].", es: "[Subjekt] no es [Adjektiv].", slots: {Subjekt:"n", Adjektiv:"adj"}, tags:["negation"] },
      { de: "Wir haben [Objekt] und [Objekt2].", es: "Tenemos [Objekt] y [Objekt2].", slots: {Objekt:"n", Objekt2:"n"}, tags:["plural","akkusativ"] },
      { de: "Das ist [Subjekt] von [Person].", es: "Esto es [Subjekt] de [Person].", slots: {Subjekt:"n", Person:"n"}, tags:["genitiv"] },
      { de: "Ich fahre mit [Transport].", es: "Voy en [Transport].", slots: {Transport:"n"}, tags:["dativ","mit"] }
    ]
  },

  synonyms: {
    "die Oma": ["die Großmutter", "die Oma"],
    "die Großmutter": ["die Oma", "die Großmutter"],
    "das Mädchen": ["das Mädel"],
    "der Junge": ["der Bub"],
    "das Auto": ["der Wagen"],
    "die Wohnung": ["das Apartment"],
    "das Handy": ["das Mobiltelefon"],
    "das Foto": ["das Bild"],
    "der Laptop": ["der Computer"],
    "das Fahrrad": ["das Rad"]
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
    kennen: {ich:"kenne",du:"kennst","er/sie/es":"kennt",wir:"kennen",ihr:"kennt","sie/Sie":"kennen"}
  },

  // Separar artículo si está pegado al sustantivo (ej. "derHund" -> ["der","Hund"])
  splitArticle(de) {
    const m = de.match(/^(der|die|das)([A-ZÄÖÜ].*)$/);
    if (m) return { article: m[1], noun: m[2] };
    return null;
  },

  // Devuelve forma canónica con artículo separado y capitalizado
  canonizeNoun(w) {
    let de = w[0].trim();
    if (/^(der|die|das) /i.test(de)) return de.charAt(0).toUpperCase() + de.slice(1);
    const parts = this.splitArticle(de);
    if (parts) return parts.article + ' ' + parts.noun;
    const art = w[2] ? w[2] : 'der';
    let bare = de.replace(/^(der|die|das) /i, '');
    return art + ' ' + bare.charAt(0).toUpperCase() + bare.slice(1);
  },

  // Devuelve solo el sustantivo sin artículo
  getBareNoun(w) {
    const de = w[0].trim();
    const parts = this.splitArticle(de);
    if (parts) return parts.noun;
    return de.replace(/^(der|die|das) /i, '');
  },

  // Obtiene el artículo (der/die/das) de la palabra
  getArticle(w) {
    if (w[2] && ['der','die','das'].includes(w[2])) return w[2];
    const de = w[0].trim();
    const m = de.match(/^(der|die|das)\s/i);
    if (m) return m[1];
    const parts = this.splitArticle(de);
    if (parts) return parts.article;
    return null;
  },

  isValidWord(w) {
    if (!w || !w[0] || !w[1]) return false;
    const de = w[0].trim();
    const es = w[1].trim();
    if (de.startsWith('[') || es.startsWith('[') || es === '-' || es === '') return false;
    return true;
  },

  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },

  getValidWords(levelId) {
    return this.getVocabForLevel(levelId).filter(w => this.isValidWord(w));
  },

  fillTemplate(tpl, wordMap) {
    let de = tpl.de, es = tpl.es;
    for (let slot in tpl.slots) {
      const w = wordMap[slot] || { de: "___", es: "___" };
      de = de.replace(`[${slot}]`, w.de);
      es = es.replace(`[${slot}]`, w.es);
    }
    // Limpiar artículos opcionales [ein/kein] ...
    de = de.replace(/\[ein\/kein\]\s?/g, '');
    es = es.replace(/\[un\/ningún\]\s?/g, '');
    return { de: de.charAt(0).toUpperCase() + de.slice(1).replace(/\s+/g,' ').trim(), es };
  },

  hideWordInSentence(sentenceDe, targetDe) {
    const escaped = targetDe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b', 'i');
    if (re.test(sentenceDe)) return sentenceDe.replace(re, '___');
    // intentar ocultar solo el sustantivo si tiene artículo
    return sentenceDe.replace(new RegExp(targetDe, 'i'), '___');
  },

  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const valid = this.getValidWords(levelId);
    if (valid.length === 0) return [];
    // Mezclar banco de frases para el nivel
    const bank = this.sentenceBank[levelId] || this.sentenceBank['A1.1'];
    const usedWords = new Set();
    const exercises = [];
    const deAllNouns = valid.filter(w => w[4]==='n').map(w => this.canonizeNoun(w));
    const esAll = [...new Set(valid.map(w => w[1]))];

    // Determinar tipos seguros disponibles
    const types = ['fill','translateDE','translateES','choose','fillInSentence','order'];
    if (valid.some(w => w[4]==='n' && this.getArticle(w))) types.push('declension');
    if (valid.some(w => w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('['))) types.push('plural');
    if (valid.some(w => w[4]==='v' && this.conjugations[w[0]])) types.push('conjugate');

    // Generar ejercicios de palabra aislada mezclando tipos
    for (let i = 0; i < wordsPerLesson; i++) {
      const type = types[i % types.length];
      let candidates = valid.filter(w => !usedWords.has(w[0]));
      if (candidates.length === 0) candidates = [...valid];
      const w = candidates[Math.floor(Math.random() * candidates.length)];
      usedWords.add(w[0]);
      const deMain = this.canonizeNoun(w);
      const bareDe = this.getBareNoun(w);
      const esMain = w[1];
      let ex = null;

      switch(type) {
        case 'fill':
          ex = { type:'fill', prompt:`Completa: "___" significa "${esMain}".`, answer:deMain, options:this.randomSlice(deAllNouns,3,deMain).concat(deMain).sort(()=>Math.random()-0.5), hint:'' };
          break;
        case 'translateDE':
          ex = { type:'translateDE', prompt:`Traduce al alemán: "${esMain}"`, answer:deMain, hint:'' };
          break;
        case 'translateES':
          ex = { type:'translateES', prompt:`Traduce al español: "${deMain}"`, answer:esMain, hint:'' };
          break;
        case 'choose':
          ex = { type:'choose', prompt:`¿Cuál es la traducción de "${deMain}"?`, answer:esMain, options:this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5), hint:'' };
          break;
        case 'declension':
          { const art = this.getArticle(w);
            if (art) {
              const dist = ["der","die","das"].filter(a=>a!==art);
              ex = { type:'declension', prompt:`¿Cuál es el artículo correcto para "${bareDe}"?`, answer:art, options:[art, ...dist].sort(()=>Math.random()-0.5), hint:'' };
            }
          }
          break;
        case 'plural':
          if (w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('[')) {
            const pl = w[3];
            ex = { type:'plural', prompt:`¿Cuál es el plural de "${bareDe}"?`, answer:pl, options:this.randomSlice(deAllNouns,3,pl).concat(pl).sort(()=>Math.random()-0.5), hint:'' };
          }
          break;
        case 'conjugate':
          if (w[4]==='v' && this.conjugations[w[0]]) {
            const persons = ["ich","du","er/sie/es","wir","ihr","sie/Sie"];
            const person = persons[Math.floor(Math.random()*persons.length)];
            const answer = this.conjugations[w[0]][person];
            ex = { type:'conjugate', prompt:`Conjuga "${w[0]}" para "${person}":`, answer:answer, hint:'' };
          }
          break;
      }
      if (ex) {
        ex.word = w;
        exercises.push(ex);
      }
    }

    // Añadir ejercicios contextuales usando banco de frases
    for (let i = 0; i < Math.min(3, bank.length); i++) {
      const tpl = bank[Math.floor(Math.random() * bank.length)];
      const wordMap = {};
      for (let slot in tpl.slots) {
        const neededType = tpl.slots[slot];
        const candidates = valid.filter(w => !usedWords.has(w[0]) && w[4] === neededType);
        if (candidates.length) {
          const chosen = candidates[Math.floor(Math.random() * candidates.length)];
          wordMap[slot] = { de: neededType==='n' ? this.getBareNoun(chosen) : chosen[0], es: chosen[1] };
          usedWords.add(chosen[0]);
        } else {
          wordMap[slot] = { de: '___', es: '___' };
        }
      }
      const sentence = this.fillTemplate(tpl, wordMap);
      const mainWordObj = valid.find(w => wordMap.Objekt && (this.getBareNoun(w)===wordMap.Objekt.de || w[0]===wordMap.Objekt.de)) ||
                          valid.find(w => wordMap.Subjekt && wordMap.Subjekt.de===w[0]) || valid[0];
      if (!mainWordObj) continue;
      const bareMain = this.getBareNoun(mainWordObj);
      const hiddenSentence = this.hideWordInSentence(sentence.de, bareMain);
      exercises.push({
        type:'fillInSentence',
        prompt:`Completa la frase:\n"${hiddenSentence}"`,
        answer: bareMain,
        options: this.randomSlice(deAllNouns,3,bareMain).concat(bareMain).sort(()=>Math.random()-0.5),
        hint:'',
        word: mainWordObj,
        sentence: sentence,
        translation: sentence.es
      });
      exercises.push({
        type:'order',
        prompt:`Ordena estas palabras:\n${sentence.de.split(' ').sort(()=>Math.random()-0.5).join(' ')}`,
        answer: sentence.de,
        hint:'Forma una frase correcta.',
        word: mainWordObj,
        sentence: sentence,
        translation: sentence.es
      });
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