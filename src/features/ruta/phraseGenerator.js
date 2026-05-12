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
  getPhraseForWord(levelId,word){
    const bank=window.PhrasesBank||{};
    const levelBank=bank[levelId]||{};
    const canon=this.canonizeNoun(word);
    const phrases=levelBank[word[0]]||levelBank[canon];
    if(phrases&&phrases.length>0)return phrases[Math.floor(Math.random()*phrases.length)];
    const art=this.getArticle(word);
    const bare=this.getBareNoun(word);
    if(art)return {de:"Das ist "+art+" "+bare+".", es:"Esto es "+bare+"."};
    if(word[4]==="v")return {de:"Ich kann "+word[0]+".", es:"Yo puedo "+word[1]+"."};
    return {de:"Das Wort lautet "+word[0]+".", es:"La palabra es "+word[0]+"."};
  },
  buildExerciseFromPhrase(phrase,w,type){
    const deMain=this.canonizeNoun(w);
    const bare=this.getBareNoun(w);
    const esMain=w[1];
    switch(type){
      case"fill":{
        const hidden=this.hideWordInSentence(phrase.de,deMain);
        return {type:"fill",prompt:`Completa:\n"${hidden}"`,answer:deMain,options:this.randomSlice([...new Set(this.getValidWords(w[4]==="n"?w[0]:null).map(x=>this.canonizeNoun(x)))],3,deMain).concat(deMain).sort(()=>Math.random()-0.5),hint:"",translation:phrase.es};
      }
      case"translateDE":return {type:"translateDE",prompt:`Traduce al alemán:\n"${phrase.es}"`,answer:phrase.de,hint:"",translation:phrase.es};
      case"translateES":return {type:"translateES",prompt:`Traduce al español:\n"${phrase.de}"`,answer:phrase.es,hint:"",translation:phrase.es};
      case"choose":{
        const esAll=[...new Set(this.getValidWords(null).map(x=>x[1]))];
        return {type:"choose",prompt:`¿Cuál es la traducción de:\n"${phrase.de}"?`,answer:phrase.es,options:this.randomSlice(esAll,3,phrase.es).concat(phrase.es).sort(()=>Math.random()-0.5),hint:"",translation:phrase.es};
      }
      case"declension":{
        const art=this.getArticle(w);
        if(art){const dist=["der","die","das"].filter(a=>a!==art);return {type:"declension",prompt:`¿Artículo correcto para "${bare}"?`,answer:art,options:[art,...dist].sort(()=>Math.random()-0.5),hint:""};}
        return null;
      }
      case"plural":if(w[3]&&w[3]!=="-"&&!w[3].startsWith("[")){return {type:"plural",prompt:`¿Plural de "${bare}"?`,answer:w[3],options:this.randomSlice([...new Set(this.getValidWords(null).filter(x=>x[3]&&x[3]!=="-"&&!x[3].startsWith("[")).map(x=>x[3]))],3,w[3]).concat(w[3]).sort(()=>Math.random()-0.5),hint:""};}return null;
      case"conjugate":if(w[4]==="v"&&this.conjugations[w[0]]){const persons=["ich","du","er/sie/es","wir","ihr","sie/Sie"];const person=persons[Math.floor(Math.random()*persons.length)];return {type:"conjugate",prompt:`Conjuga "${w[0]}" para "${person}":`,answer:this.conjugations[w[0]][person],hint:""};}return null;
      case"pronounce":{
        return {type:"pronounce",prompt:`Repite en voz alta:\n"${phrase.de}"`,answer:phrase.de,phraseToPronounce:phrase.de,speakText:phrase.de,hint:"Usa el micrófono para repetir la frase."};
      }
      default:return null;
    }
  },
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

    const processWords = (words, isReview) => {
      for (let w of words) {
        if (usedSet.has(w[0])) continue;
        usedSet.add(w[0]);
        const type = types[Math.floor(Math.random() * types.length)];
        const phrase = this.getPhraseForWord(levelId,w);
        let ex = this.buildExerciseFromPhrase(phrase,w,type);
        if (!ex) {
          const fallback = this.buildExerciseFromPhrase(phrase,w,"choose");
          ex = fallback || this.buildExerciseFromPhrase(phrase,w,"translateES");
        }
        if (ex) {
          ex.word = w;
          ex.translation = phrase.es;
          ex.speakText = phrase.de;
          if (isReview) ex.isReview = true;
          exercises.push(ex);
        }
      }
    };

    processWords(reviewWordsInVocab, true);
    processWords(newLessonWords, false);

    // Adjective declension a partir de frases reales
    const bank=window.PhrasesBank||{};
    const levelBank=bank[levelId]||{};
    const allPhrases=[];
    for(let k of Object.keys(levelBank)){
      (levelBank[k]||[]).forEach(p=>allPhrases.push({word:k,de:p.de,es:p.es}));
    }
    const adjPattern=/\b(der|die|das|den|dem|des|eine?|keine?)\s+(\w+)(e|er|es|en)\s+(\w+)\b/gi;
    const adjExercises=[];
    for(let p of allPhrases){
      let match;
      while((match=adjPattern.exec(p.de))!==null){
        const det=match[1], adjBase=match[2], ending=match[3], noun=match[4];
        const sentence=p.de.replace(match[0], det+" "+adjBase+"___ "+noun);
        adjExercises.push({
          type:"adjectiveDeclension",
          prompt:"Completa con la terminación correcta:\n\""+sentence+"\"",
          answer:"-"+ending,
          options:["-e","-er","-es","-en"].sort(()=>Math.random()-0.5),
          hint: "Frase real del banco.",
          speakText: det+" "+adjBase+ending+" "+noun,
          word: allValid.find(w=>this.getBareNoun(w)===noun)||allValid[0],
          translation: p.es
        });
        break;
      }
    }
    for(let e of adjExercises.slice(0,Math.min(3,adjExercises.length))) exercises.push(e);

    // Contextuales con frases reales
    for(let p of allPhrases.slice(0,Math.min(20,allPhrases.length))){
      const key=p.word;
      const phrase=p;
      if(!phrase)continue;
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
        hint:"",word:matchWords[0]
      });
    }
    // audioMatch
    const audioMatchWords=allValid.sort(()=>Math.random()-0.5).slice(0,Math.min(4,allValid.length));
    const audioDePairs=audioMatchWords.map(w=>this.canonizeNoun(w));
    const audioEsPairs=audioMatchWords.map(w=>w[1]);
    exercises.push({
      type:"audioMatch",
      prompt:"Escucha y empareja cada palabra con su traducción",
      pairs:audioDePairs.map((de,i)=>({de,es:audioEsPairs[i]})),
      leftColumn:audioDePairs,
      rightColumn:[...audioEsPairs].sort(()=>Math.random()-0.5),
      hint:"",word:audioMatchWords[0]
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