const PhraseGenerator = {
  // Tabla de declinación de artículos
  articles: {
    def: {
      nom: { m:'der', f:'die', n:'das', p:'die' },
      acc: { m:'den', f:'die', n:'das', p:'die' },
      dat: { m:'dem', f:'der', n:'dem', p:'den' }
    },
    indef: {
      nom: { m:'ein', f:'eine', n:'ein', p:'- keine' },
      acc: { m:'einen', f:'eine', n:'ein', p:'- keine' },
      dat: { m:'einem', f:'einer', n:'einem', p:'- keinen' }
    }
  },

  // Banco de frases con restricciones de género y caso
  sentenceBank: {
    'A1.1': [
      { de: "{Subjekt:nom} ist {Adjektiv}.", es: "{Subjekt:nom} es {Adjektiv}.",
        slots: { Subjekt:{type:'n', case:'nom', gen:['m','f','n']}, Adjektiv:{type:'adj'} } },
      { de: "Ich habe {Objekt:acc}.", es: "Tengo {Objekt:acc}.",
        slots: { Objekt:{type:'n', case:'acc', gen:['m','f','n'], det:'indef'} } },
      { de: "Er sieht {Objekt:acc}.", es: "Él ve {Objekt:acc}.",
        slots: { Objekt:{type:'n', case:'acc', gen:['m','f','n'], det:'def'} } },
      { de: "Wir spielen mit {Objekt:dat}.", es: "Jugamos con {Objekt:dat}.",
        slots: { Objekt:{type:'n', case:'dat', gen:['m','f','n'], det:'def'} } },
      { de: "Das ist {Subjekt:nom}.", es: "Esto es {Subjekt:nom}.",
        slots: { Subjekt:{type:'n', case:'nom', gen:['m','f','n'], det:'def'} } },
      { de: "Ich mag {Objekt:acc}.", es: "Me gusta {Objekt:acc}.",
        slots: { Objekt:{type:'n', case:'acc', gen:['m','f','n'], det:'def'} } },
      { de: "Wo ist {Subjekt:nom}?", es: "¿Dónde está {Subjekt:nom}?",
        slots: { Subjekt:{type:'n', case:'nom', gen:['m','f','n'], det:'def'} } },
      { de: "Ich gehe in {Ort:acc}.", es: "Voy a {Ort:acc}.",
        slots: { Ort:{type:'n', case:'acc', gen:['m','f','n'], det:'def'} } },
      { de: "{Subjekt:nom} wohnt in {Ort:dat}.", es: "{Subjekt:nom} vive en {Ort:dat}.",
        slots: { Subjekt:{type:'n', case:'nom', gen:['m','f','n'], det:'def'}, Ort:{type:'n', case:'dat', gen:['m','f','n'], det:'def'} } },
      { de: "Ich habe {Zahl} {Objekt:acc}.", es: "Tengo {Zahl} {Objekt:acc}.",
        slots: { Zahl:{type:'num'}, Objekt:{type:'n', case:'acc', gen:['m','f','n'], det:'def', plural:true} } }
    ]
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

  // Devuelve género de una palabra según su artículo ('der','die','das') o null
  getGender(w) {
    const de = w[0].trim();
    const m = de.match(/^(der|die|das)\s/i);
    if (m) return m[1]==='der'?'m':m[1]==='die'?'f':'n';
    if (w[2] && ['der','die','das'].includes(w[2])) return w[2]==='der'?'m':w[2]==='die'?'f':'n';
    const split = de.match(/^(der|die|das)([A-ZÄÖÜ])/);
    if (split) return split[1]==='der'?'m':split[1]==='die'?'f':'n';
    return null;
  },

  // Devuelve la forma correcta del sustantivo con artículo para el caso y determinación
  getNounForm(w, kasus, det) {
    const gen = this.getGender(w);
    if (!gen) return w[0]; // si no tiene género, devolver tal cual
    const bare = w[0].replace(/^(der|die|das)\s?/i, '');
    const art = this.articles[det][kasus][gen];
    if (!art) return bare;
    if (art.startsWith('- ')) return art.substring(2) + ' ' + bare;
    return art + ' ' + bare;
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

  // Rellena una plantilla con las palabras ya formateadas
  fillTemplate(tpl, values) {
    let de = tpl.de, es = tpl.es;
    for (let key in values) {
      const v = values[key];
      de = de.replace(new RegExp(`\\{${key}:[^}]+\\}`, 'g'), v.de);
      es = es.replace(new RegExp(`\\{${key}:[^}]+\\}`, 'g'), v.es);
    }
    return { de: de.charAt(0).toUpperCase() + de.slice(1).replace(/\s+/g,' ').trim(), es };
  },

  hideWordInSentence(sentence, word) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return sentence.replace(new RegExp(escaped, 'i'), '___');
  },

  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const valid = this.getValidWords(levelId);
    if (valid.length === 0) return [];
    const exercises = [];
    const usedWords = new Set();
    const deAllNouns = valid.filter(w => w[4]==='n').map(w => w[0]); // lista para opciones
    const esAll = [...new Set(valid.map(w => w[1]))];

    // Tipos de ejercicios de palabra aislada
    const types = ['fill','translateDE','translateES','choose'];
    if (valid.some(w => w[4]==='n' && this.getGender(w))) types.push('declension');
    if (valid.some(w => w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('['))) types.push('plural');
    if (valid.some(w => w[4]==='v' && this.conjugations[w[0]])) types.push('conjugate');

    // Generar ejercicios de palabra aislada
    const wordExercises = Math.min(wordsPerLesson, valid.length);
    for (let i = 0; i < wordExercises; i++) {
      let candidates = valid.filter(w => !usedWords.has(w[0]));
      if (candidates.length === 0) break;
      const w = candidates[Math.floor(Math.random() * candidates.length)];
      usedWords.add(w[0]);
      const deMain = this.getNounForm(w, 'nom', 'def'); // forma nominativa para mostrar
      const bare = w[0].replace(/^(der|die|das)\s?/i, '');
      const esMain = w[1];
      let ex = null;
      const type = types[i % types.length];
      switch(type) {
        case 'fill':
          ex = { type:'fill', prompt:`Completa: "___" significa "${esMain}".`, answer:deMain,
                 options: this.randomSlice(deAllNouns,3,deMain).concat(deMain).sort(()=>Math.random()-0.5), hint:'' };
          break;
        case 'translateDE':
          ex = { type:'translateDE', prompt:`Traduce al alemán: "${esMain}"`, answer:deMain, hint:'' };
          break;
        case 'translateES':
          ex = { type:'translateES', prompt:`Traduce al español: "${deMain}"`, answer:esMain, hint:'' };
          break;
        case 'choose':
          ex = { type:'choose', prompt:`¿Cuál es la traducción de "${deMain}"?`, answer:esMain,
                 options: this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5), hint:'' };
          break;
        case 'declension': {
          const art = this.getGender(w);
          if (art) {
            const artMap = { m:'der', f:'die', n:'das' };
            const correct = artMap[art];
            const dist = ["der","die","das"].filter(a=>a!==correct);
            ex = { type:'declension', prompt:`¿Cuál es el artículo correcto para "${bare}"?`, answer:correct,
                   options: [correct, ...dist].sort(()=>Math.random()-0.5), hint:'' };
          }
          break;
        }
        case 'plural':
          if (w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('[')) {
            ex = { type:'plural', prompt:`¿Cuál es el plural de "${bare}"?`, answer:w[3],
                   options: this.randomSlice(deAllNouns,3,w[3]).concat(w[3]).sort(()=>Math.random()-0.5), hint:'' };
          }
          break;
        case 'conjugate':
          if (w[4]==='v' && this.conjugations[w[0]]) {
            const persons = ["ich","du","er/sie/es","wir","ihr","sie/Sie"];
            const person = persons[Math.floor(Math.random()*persons.length)];
            ex = { type:'conjugate', prompt:`Conjuga "${w[0]}" para "${person}":`, answer:this.conjugations[w[0]][person], hint:'' };
          }
          break;
      }
      if (ex) { ex.word = w; exercises.push(ex); }
    }

    // Ejercicios contextuales con frases del banco
    const bank = this.sentenceBank[levelId] || this.sentenceBank['A1.1'];
    const contextExercises = Math.min(6, bank.length);
    for (let i = 0; i < contextExercises; i++) {
      const tpl = bank[Math.floor(Math.random() * bank.length)];
      const values = {};
      let validFrame = true;
      for (let slotKey in tpl.slots) {
        const spec = tpl.slots[slotKey];
        let candidates = valid.filter(w => {
          if (usedWords.has(w[0])) return false;
          if (spec.type === 'n') {
            const g = this.getGender(w);
            if (!g || !spec.gen.includes(g)) return false;
            // Si es plural requerido, descartar (por ahora no manejamos plural en frases)
            return true;
          }
          if (spec.type === 'adj') return w[4] === 'adj';
          if (spec.type === 'v') return w[4] === 'v';
          if (spec.type === 'num') return w[4] === 'num';
          return false;
        });
        if (candidates.length === 0) { validFrame = false; break; }
        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        usedWords.add(chosen[0]);
        if (spec.type === 'n') {
          const det = spec.det || 'def';
          const kasus = spec.case || 'nom';
          const formDe = this.getNounForm(chosen, kasus, det);
          values[slotKey] = { de: formDe, es: chosen[1] };
        } else {
          values[slotKey] = { de: chosen[0], es: chosen[1] };
        }
      }
      if (!validFrame) continue;
      const sentence = this.fillTemplate(tpl, values);
      // Elegir una palabra clave (el primer sustantivo) para ocultar en fillInSentence
      const mainWordObj = valid.find(w => w[0] === Object.values(values).find(v => v.de.includes(w[0].replace(/^(der|die|das)\s?/i,'')))?.[0]) || valid[0];
      const bareKey = mainWordObj[0].replace(/^(der|die|das)\s?/i, '');
      const hidden = this.hideWordInSentence(sentence.de, bareKey);
      exercises.push({
        type:'fillInSentence',
        prompt:`Completa la frase:\n"${hidden}"`,
        answer: bareKey,
        options: this.randomSlice(deAllNouns,3,bareKey).concat(bareKey).sort(()=>Math.random()-0.5),
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