const PhraseGenerator = {
  synonyms: {"coche":["auto","carro","vehículo"],"auto":["coche","carro","vehículo"],"carro":["coche","auto","vehículo"],"perro":["can","chucho"],"casa":["hogar","vivienda"],"bonito":["hermoso","lindo","bello"],"grande":["enorme","vasto"],"pequeño":["chico","reducido"],"chico":["muchacho","niño","joven"],"chica":["muchacha","niña","joven"]},
  conjugations: {"sein":{"ich":"bin","du":"bist","er/sie/es":"ist","wir":"sind","ihr":"seid","sie/Sie":"sind"},"haben":{"ich":"habe","du":"hast","er/sie/es":"hat","wir":"haben","ihr":"habt","sie/Sie":"haben"},"werden":{"ich":"werde","du":"wirst","er/sie/es":"wird","wir":"werden","ihr":"werdet","sie/Sie":"werden"},"essen":{"ich":"esse","du":"isst","er/sie/es":"isst","wir":"essen","ihr":"esst","sie/Sie":"essen"},"trinken":{"ich":"trinke","du":"trinkst","er/sie/es":"trinkt","wir":"trinken","ihr":"trinkt","sie/Sie":"trinken"},"nehmen":{"ich":"nehme","du":"nimmst","er/sie/es":"nimmt","wir":"nehmen","ihr":"nehmt","sie/Sie":"nehmen"},"sehen":{"ich":"sehe","du":"siehst","er/sie/es":"sieht","wir":"sehen","ihr":"seht","sie/Sie":"sehen"},"lesen":{"ich":"lese","du":"liest","er/sie/es":"liest","wir":"lesen","ihr":"lest","sie/Sie":"lesen"},"fahren":{"ich":"fahre","du":"fährst","er/sie/es":"fährt","wir":"fahren","ihr":"fahrt","sie/Sie":"fahren"},"kommen":{"ich":"komme","du":"kommst","er/sie/es":"kommt","wir":"kommen","ihr":"kommt","sie/Sie":"kommen"},"gehen":{"ich":"gehe","du":"gehst","er/sie/es":"geht","wir":"gehen","ihr":"geht","sie/Sie":"gehen"},"sprechen":{"ich":"spreche","du":"sprichst","er/sie/es":"spricht","wir":"sprechen","ihr":"sprecht","sie/Sie":"sprechen"},"arbeiten":{"ich":"arbeite","du":"arbeitest","er/sie/es":"arbeitet","wir":"arbeiten","ihr":"arbeitet","sie/Sie":"arbeiten"},"finden":{"ich":"finde","du":"findest","er/sie/es":"findet","wir":"finden","ihr":"findet","sie/Sie":"finden"},"wohnen":{"ich":"wohne","du":"wohnst","er/sie/es":"wohnt","wir":"wohnen","ihr":"wohnt","sie/Sie":"wohnen"},"spielen":{"ich":"spiele","du":"spielst","er/sie/es":"spielt","wir":"spielen","ihr":"spielt","sie/Sie":"spielen"},"machen":{"ich":"mache","du":"machst","er/sie/es":"macht","wir":"machen","ihr":"macht","sie/Sie":"machen"},"kaufen":{"ich":"kaufe","du":"kaufst","er/sie/es":"kauft","wir":"kaufen","ihr":"kauft","sie/Sie":"kaufen"},"kennen":{"ich":"kenne","du":"kennst","er/sie/es":"kennt","wir":"kennen","ihr":"kennt","sie/Sie":"kennen"}},
  getArticle(w){const de=w[0].trim();const m=de.match(/^(der|die|das)\s/i);if(m)return m[1];if(w[2]&&["der","die","das"].includes(w[2]))return w[2];return null;},
  getGender(w){const art=this.getArticle(w);return art==="der"?"m":art==="die"?"f":art==="das"?"n":null;},
  canonizeNoun(w){const art=this.getArticle(w);const bare=w[0].replace(/^(der|die|das)\s?/i,"");return art?art+" "+bare:bare;},
  getBareNoun(w){return w[0].replace(/^(der|die|das)\s?/i,"");},
  isValidWord(w){if(!w||!w[0]||!w[1])return false;const de=w[0].trim(),es=w[1].trim();return !de.startsWith("[")&&!es.startsWith("[")&&es!=="-"&&es!=="";},
  getVocabForLevel(levelId){const R=window.Muller?.Ruta;return(R&&R.VOCAB&&R.VOCAB[levelId])?R.VOCAB[levelId]:[];},
  getValidWords(levelId){return this.getVocabForLevel(levelId).filter(w=>this.isValidWord(w));},
  randomSlice(arr,count,exclude){return arr.filter(x=>x!==exclude).sort(()=>Math.random()-0.5).slice(0,count);},
  hideWordInSentence(sentence,word){const bare=word.replace(/^(der|die|das)\s?/i,"");const re=new RegExp("\\b(?:meinen?|deinen?|ihren?|euren?|unseren?|meine?|deine?|ihre?|eure?|unsere?|der|die|das|dem|den|des)\\s"+bare.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b|\\b"+bare.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");return sentence.replace(re,"___");},
  splitCleanSentence(sentence){const clean=sentence.replace(/[.!?¡¿]+$/g,"").trim();return clean.split(/\s+/).filter(Boolean);},
  shuffleNoRepeat(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j, attempts = 0;
      do { j = Math.floor(Math.random() * (i + 1)); attempts++; if (attempts > 20) break; }
      while (i < arr.length - 1 && arr[j]?.type === arr[i + 1]?.type);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i]?.type === arr[i + 1]?.type) {
        for (let j = i + 2; j < arr.length; j++) {
          if (arr[j]?.type !== arr[i]?.type) { [arr[i + 1], arr[j]] = [arr[j], arr[i + 1]]; break; }
        }
      }
    }
    return arr;
  },
  generateExercises(levelId,lessonIdx,wordsPerLesson){
    const allValid=this.getValidWords(levelId);
    if(allValid.length===0)return[];
    const exercises=[];
    const progress = window.SRSHelpers ? window.SRSHelpers.loadProgress() : null;
    const reviewWordsData = progress ? window.SRSHelpers.getWordsToReview(progress, levelId, Math.floor(wordsPerLesson * 0.3)) : [];
    const reviewWordsDe = reviewWordsData.map(rw => rw.word);
    const reviewWordsSet = new Set(reviewWordsDe);
    const reviewWordsInVocab = allValid.filter(w => reviewWordsSet.has(w[0]));
    const newWordsPool = allValid.filter(w => !reviewWordsSet.has(w[0]));
    let newCount = wordsPerLesson - reviewWordsInVocab.length;
    if (newCount < 0) newCount = 0;
    const newLessonWords = newWordsPool.slice(0, newCount);
    const usedSet = new Set();
    const types = ["fill","translateDE","translateES","choose","declension","plural","conjugate","pronounce"];
    const deAllNouns=[...new Set(allValid.filter(w=>w[4]==="n").map(w=>this.canonizeNoun(w)))];
    const esAll=[...new Set(allValid.map(w=>w[1]))];
    for (let w of reviewWordsInVocab) {
      if (usedSet.has(w[0])) continue;
      usedSet.add(w[0]);
      const type = types[Math.floor(Math.random() * types.length)];
      const deMain = this.canonizeNoun(w);
      const bare = this.getBareNoun(w);
      const esMain = w[1];
      let ex = null;
      switch(type){
        case"fill":ex={type:"fill",prompt:`Completa: "___" significa "${esMain}".`,answer:deMain,options:this.randomSlice(deAllNouns,3,deMain).concat(deMain).sort(()=>Math.random()-0.5),hint:""};break;
        case"translateDE":ex={type:"translateDE",prompt:`Traduce al alemán: "${esMain}"`,answer:deMain,hint:""};break;
        case"translateES":ex={type:"translateES",prompt:`Traduce al español: "${deMain}"`,answer:esMain,hint:""};break;
        case"choose":ex={type:"choose",prompt:`¿Cuál es la traducción de "${deMain}"?`,answer:esMain,options:this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5),hint:""};break;
        case"declension":{const art=this.getArticle(w);if(art){const dist=["der","die","das"].filter(a=>a!==art);ex={type:"declension",prompt:`¿Cuál es el artículo correcto para "${bare}"?`,answer:art,options:[art,...dist].sort(()=>Math.random()-0.5),hint:""};}break;}
        case"plural":if(w[3]&&w[3]!=="-"&&!w[3].startsWith("[")){ex={type:"plural",prompt:`¿Cuál es el plural de "${bare}"?`,answer:w[3],options:this.randomSlice(deAllNouns,3,w[3]).concat(w[3]).sort(()=>Math.random()-0.5),hint:""};}break;
        case"conjugate":if(w[4]==="v"&&this.conjugations[w[0]]){const persons=["ich","du","er/sie/es","wir","ihr","sie/Sie"];const person=persons[Math.floor(Math.random()*persons.length)];ex={type:"conjugate",prompt:`Conjuga "${w[0]}" para "${person}":`,answer:this.conjugations[w[0]][person],hint:""};}break;
                case"pronounce":{
          let phraseToPronounce = "";
          const bank = window.PhrasesBank || {};
          const levelBank = bank[levelId] || {};
          const keySearch = this.canonizeNoun(w);
          const phrases = levelBank[w[0]] || levelBank[keySearch];
          if (phrases && phrases.length > 0) {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            phraseToPronounce = randomPhrase.de;
          } else {
            const art = this.getArticle(w);
            const bare = this.getBareNoun(w);
            if (art) {
              phraseToPronounce = "Das ist " + art + " " + bare + ".";
            } else if (w[4] === "v") {
              phraseToPronounce = "Ich kann " + w[0] + ".";
            } else {
              phraseToPronounce = "Das Wort lautet " + w[0] + ".";
            }
          }
          ex = {
            type: "pronounce",
            prompt: `Repite en voz alta:\n"${phraseToPronounce}"`,
            answer: phraseToPronounce,
            phraseToPronounce: phraseToPronounce,
            speakText: phraseToPronounce,
            hint: "Usa el micrófono para repetir la frase."
          };
        }break;
      }
      if (ex) { ex.word = w; ex.translation = esMain; ex.speakText = w[4]==="n"?this.canonizeNoun(w):w[0]; ex.isReview = true; exercises.push(ex); }
    }
    for (let w of newLessonWords) {
      if (usedSet.has(w[0])) continue;
      usedSet.add(w[0]);
      const type = types[Math.floor(Math.random() * types.length)];
      const deMain = this.canonizeNoun(w);
      const bare = this.getBareNoun(w);
      const esMain = w[1];
      let ex = null;
      switch(type){
        case"fill":ex={type:"fill",prompt:`Completa: "___" significa "${esMain}".`,answer:deMain,options:this.randomSlice(deAllNouns,3,deMain).concat(deMain).sort(()=>Math.random()-0.5),hint:""};break;
        case"translateDE":ex={type:"translateDE",prompt:`Traduce al alemán: "${esMain}"`,answer:deMain,hint:""};break;
        case"translateES":ex={type:"translateES",prompt:`Traduce al español: "${deMain}"`,answer:esMain,hint:""};break;
        case"choose":ex={type:"choose",prompt:`¿Cuál es la traducción de "${deMain}"?`,answer:esMain,options:this.randomSlice(esAll,3,esMain).concat(esMain).sort(()=>Math.random()-0.5),hint:""};break;
        case"declension":{const art=this.getArticle(w);if(art){const dist=["der","die","das"].filter(a=>a!==art);ex={type:"declension",prompt:`¿Cuál es el artículo correcto para "${bare}"?`,answer:art,options:[art,...dist].sort(()=>Math.random()-0.5),hint:""};}break;}
        case"plural":if(w[3]&&w[3]!=="-"&&!w[3].startsWith("[")){ex={type:"plural",prompt:`¿Cuál es el plural de "${bare}"?`,answer:w[3],options:this.randomSlice(deAllNouns,3,w[3]).concat(w[3]).sort(()=>Math.random()-0.5),hint:""};}break;
        case"conjugate":if(w[4]==="v"&&this.conjugations[w[0]]){const persons=["ich","du","er/sie/es","wir","ihr","sie/Sie"];const person=persons[Math.floor(Math.random()*persons.length)];ex={type:"conjugate",prompt:`Conjuga "${w[0]}" para "${person}":`,answer:this.conjugations[w[0]][person],hint:""};}break;
                case"pronounce":{
          let phraseToPronounce = "";
          const bank = window.PhrasesBank || {};
          const levelBank = bank[levelId] || {};
          const keySearch = this.canonizeNoun(w);
          const phrases = levelBank[w[0]] || levelBank[keySearch];
          if (phrases && phrases.length > 0) {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            phraseToPronounce = randomPhrase.de;
          } else {
            const art = this.getArticle(w);
            const bare = this.getBareNoun(w);
            if (art) {
              phraseToPronounce = "Das ist " + art + " " + bare + ".";
            } else if (w[4] === "v") {
              phraseToPronounce = "Ich kann " + w[0] + ".";
            } else {
              phraseToPronounce = "Das Wort lautet " + w[0] + ".";
            }
          }
          ex = {
            type: "pronounce",
            prompt: `Repite en voz alta:\n"${phraseToPronounce}"`,
            answer: phraseToPronounce,
            phraseToPronounce: phraseToPronounce,
            speakText: phraseToPronounce,
            hint: "Usa el micrófono para repetir la frase."
          };
        }break;
      }
      if (ex) { ex.word = w; ex.translation = esMain; ex.speakText = w[4]==="n"?this.canonizeNoun(w):w[0]; exercises.push(ex); }
    }
    
  // ---------- order (ordenar palabras de frases reales) ----------
  const orderSentences = [];
  // Recorremos las mismas allSentences que usamos en adj (ya definidas arriba)
  for (const s of allSentences) {
    // Elegimos frases de entre 4 y 8 palabras para que no sean ni triviales ni imposibles
    const words = s.split(/\s+/);
    if (words.length >= 4 && words.length <= 8) {
      orderSentences.push(s);
    }
  }
  shuffleArray(orderSentences);
  // Cogemos hasta 3 frases
  const usedOrder = orderSentences.slice(0, 3);
  usedOrder.forEach(sentence => {
    const words = sentence.split(/\s+/);
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    exercises.push({
      type: 'order',
      sentence: sentence,   // la frase correcta
      answer: sentence,      // para comparar al final
      orderWords: shuffled,  // palabras desordenadas
      points: 5
    });
  });// ---------- adjectiveDeclension (frases reales con adjetivo) ----------
const allSentences = [];
const levelPhrases = phrasesBank[levelId];
if (levelPhrases) {
  Object.values(levelPhrases).forEach(phraseArray => {
    phraseArray.forEach(p => allSentences.push(p.de));
  });
}

const adjSentences = [];
const articleSet = new Set([
  'der','die','das','den','dem','des',
  'ein','eine','einen','einem','eines',
  'kein','keine','keinen','keinem','keines',
  'mein','dein','sein','ihr','unser','euer','ihr','Ihr'
]);

for (const sentence of allSentences) {
  const words = sentence.split(/\s+/);
  for (let i = 0; i < words.length - 2; i++) {
    const w1 = words[i];
    const w2 = words[i+1];
    const w3 = words[i+2];
    if (
      articleSet.has(w1.toLowerCase()) &&
      /^[a-zäöüß]+$/i.test(w2) &&
      (/^(e|er|es|en|em)$/.test(w2.slice(-2)) && !/^(der|die|das|den|dem|des|ein|eine|einen|einem|eines)$/i.test(w2)) &&
      /^[A-ZÄÖÜ]/.test(w3)
    ) {
      let adj = w2;
      let stem, ending;
      if (adj.endsWith('en')) { stem = adj.slice(0, -2); ending = 'en'; }
      else if (adj.endsWith('em')) { stem = adj.slice(0, -2); ending = 'em'; }
      else if (adj.endsWith('er')) { stem = adj.slice(0, -2); ending = 'er'; }
      else if (adj.endsWith('es')) { stem = adj.slice(0, -2); ending = 'es'; }
      else if (adj.endsWith('e') && adj.length > 2) { stem = adj.slice(0, -1); ending = 'e'; }
      else { continue; }

      const maskedSentence =
        sentence.slice(0, sentence.indexOf(adj)) +
        stem + '___' +
        sentence.slice(sentence.indexOf(adj) + adj.length);

      adjSentences.push({
        original: sentence,
        masked: maskedSentence,
        correctEnding: ending,
        stem: stem
      });
      break;
    }
  }
}

shuffleArray(adjSentences);
const usedAdj = adjSentences.slice(0, 3);

usedAdj.forEach(item => {
  exercises.push({
    type: 'adjectiveDeclension',
    question: item.masked,
    options: ['e', 'er', 'es', 'en', 'em'],
    answer: item.correctEnding,
    originalSentence: item.original,
    points: 5
  });
});
// ----------    // Contextuales
    const bank=window.PhrasesBank||{};
    const levelBank=bank[levelId]||{};
    const bankKeys=Object.keys(levelBank);
    if(bankKeys.length>0){
      const contextCount=Math.min(allValid.length,bankKeys.length,20);
      for(let i=0;i<contextCount;i++){
        const key=bankKeys[Math.floor(Math.random()*bankKeys.length)];
        const phrases=levelBank[key];
        if(!phrases||phrases.length===0)continue;
        const phrase=phrases[Math.floor(Math.random()*phrases.length)];
        const hiddenSentence=this.hideWordInSentence(phrase.de,key);
        exercises.push({
          speakText:phrase.de,type:"fillInSentence",
          prompt:`Completa la frase:\n"${hiddenSentence}"`,
          answer:this.getBareNoun({0:key}),
          options:this.randomSlice([...new Set(allValid.map(w=>this.getBareNoun(w)))],3,this.getBareNoun({0:key})).concat(this.getBareNoun({0:key})).sort(()=>Math.random()-0.5),
          hint:"",translation:phrase.es,
          word:allValid.find(w=>this.getBareNoun(w)===this.getBareNoun({0:key}))||allValid[0]
        });
        const cleanWords=this.splitCleanSentence(phrase.de);
        const shuffled=[...cleanWords].sort(()=>Math.random()-0.5);
        exercises.push({
          speakText:phrase.de,type:"order",
          prompt:`Ordena estas palabras:\n${shuffled.join(" ")}`,
          answer:phrase.de,hint:"Forma una frase correcta.",translation:phrase.es,
          word:allValid.find(w=>this.getBareNoun(w)===this.getBareNoun({0:key}))||allValid[0]
        });
      }
    }
    // matchPairs x3
    const matchCount=Math.min(5,allValid.length);
    for(let r=0;r<3;r++){
      const matchWords=allValid.sort(()=>Math.random()-0.5).slice(0,matchCount);
      const dePairs=matchWords.map(w=>this.canonizeNoun(w));
      const esPairs=matchWords.map(w=>w[1]);
      exercises.push({
        speakText:dePairs[0],type:"matchPairs",
        prompt:"Empareja cada palabra en alemán con su traducción en español",
        pairs:dePairs.map((de,i)=>({de,es:esPairs[i]})),
        leftColumn:[...dePairs].sort(()=>Math.random()-0.5),
        rightColumn:[...esPairs].sort(()=>Math.random()-0.5),
        hint:"Selecciona una palabra de la izquierda y luego su traducción de la derecha.",
        word:matchWords[0]
      });
    }
    // audioMatch
    const audioMatchCount=Math.min(4,allValid.length);
    const audioMatchWords=allValid.sort(()=>Math.random()-0.5).slice(0,audioMatchCount);
    const audioDePairs=audioMatchWords.map(w=>this.canonizeNoun(w));
    const audioEsPairs=audioMatchWords.map(w=>w[1]);
    exercises.push({
      type:"audioMatch",
      prompt:"Escucha y empareja cada palabra con su traducción",
      pairs:audioDePairs.map((de,i)=>({de,es:audioEsPairs[i]})),
      leftColumn:audioDePairs,
      rightColumn:[...audioEsPairs].sort(()=>Math.random()-0.5),
      hint:"Pulsa un altavoz para escuchar la palabra y luego selecciona su traducción.",
      word:audioMatchWords[0]
    });
    return this.shuffleNoRepeat(exercises);
  },
  generateLesson(levelId,lessonIdx){
    const config=window.LevelConfig?.getLevelConfig?.(levelId);
    if(!config)return null;
    const wordsPerLesson=config.wordsPerLesson||10;
    return{id:levelId+"-l"+(lessonIdx+1),title:"Lección "+(lessonIdx+1),levelId,exercises:this.generateExercises(levelId,lessonIdx,wordsPerLesson)};
  }
};
window.PhraseGenerator=PhraseGenerator;