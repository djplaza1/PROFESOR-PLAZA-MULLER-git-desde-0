const PhraseGenerator = {
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

  // Artículo desde palabra o datos
  getArticle(w) {
    const de = w[0].trim();
    const m = de.match(/^(der|die|das)\s/i);
    if (m) return m[1];
    if (w[2] && ['der','die','das'].includes(w[2])) return w[2];
    const split = de.match(/^(der|die|das)([A-ZÄÖÜ])/);
    if (split) return split[1];
    return null;
  },

  getGender(w) {
    const art = this.getArticle(w);
    if (!art) return null;
    return art === 'der' ? 'm' : art === 'die' ? 'f' : 'n';
  },

  getBareNoun(w) {
    return w[0].replace(/^(der|die|das)\s?/i, '');
  },

  canonizeNoun(w) {
    const art = this.getArticle(w);
    const bare = this.getBareNoun(w);
    if (art) return art + ' ' + bare.charAt(0).toUpperCase() + bare.slice(1);
    return bare;
  },

  isValidWord(w) {
    if (!w || !w[0] || !w[1]) return false;
    const de = w[0].trim(), es = w[1].trim();
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

  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  },

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const valid = this.getValidWords(levelId);
    if (valid.length === 0) return [];

    const exercises = [];
    const target = Math.max(wordsPerLesson * 2, valid.length); // al menos dos ejercicios por palabra
    const wordsPool = [];
    while (wordsPool.length < target) {
      for (let w of valid.sort(() => Math.random() - 0.5)) wordsPool.push(w);
    }
    const usedSet = new Set();

    const types = ['fill','translateDE','translateES','choose'];
    if (valid.some(w => this.getArticle(w))) types.push('declension');
    if (valid.some(w => w[4]==='n' && w[3] && w[3]!=='-' && !w[3].startsWith('['))) types.push('plural');
    if (valid.some(w => w[4]==='v' && this.conjugations[w[0]])) types.push('conjugate');

    const deAllNouns = [...new Set(valid.filter(w => w[4]==='n').map(w => this.canonizeNoun(w)))];
    const esAll = [...new Set(valid.map(w => w[1]))];

    for (let i = 0; i < target; i++) {
      const w = wordsPool[i];
      const deMain = this.canonizeNoun(w);
      const bare = this.getBareNoun(w);
      const esMain = w[1];
      const type = types[i % types.length];
      let ex = null;

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
          const art = this.getArticle(w);
          if (art) {
            const dist = ["der","die","das"].filter(a=>a!==art);
            ex = { type:'declension', prompt:`¿Cuál es el artículo correcto para "${bare}"?`, answer:art,
                   options: [art, ...dist].sort(()=>Math.random()-0.5), hint:'' };
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
      if (ex) {
        ex.word = w;
        ex.translation = esMain;
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