/**
 * phraseGenerator.js - Generador de ejercicios basado en frases reales del JSON por nivel
 * 
 * Enfoque HÍBRIDO:
 * - Si el JSON tiene metadatos (adjDecl, article, case) → se usan DIRECTAMENTE
 * - Si NO tiene metadatos → se INFIEREN desde la frase real
 * - Cada ejercicio se genera SOLO con phrasesBank[levelId]
 * - Vocabulario (fill, translate, conjugate) → sigue usando rutaVocabData.js
 */
const PhraseGenerator = {
  // Conjugaciones para verbos comunes
  conjugations: {"sein":{"ich":"bin","du":"bist","er/sie/es":"ist","wir":"sind","ihr":"seid","sie/Sie":"sind"},"haben":{"ich":"habe","du":"hast","er/sie/es":"hat","wir":"haben","ihr":"habt","sie/Sie":"haben"},"werden":{"ich":"werde","du":"wirst","er/sie/es":"wird","wir":"werden","ihr":"werdet","sie/Sie":"werden"},"essen":{"ich":"esse","du":"isst","er/sie/es":"isst","wir":"essen","ihr":"esst","sie/Sie":"essen"},"trinken":{"ich":"trinke","du":"trinkst","er/sie/es":"trinkt","wir":"trinken","ihr":"trinkt","sie/Sie":"trinken"},"nehmen":{"ich":"nehme","du":"nimmst","er/sie/es":"nimmt","wir":"nehmen","ihr":"nehmt","sie/Sie":"nehmen"},"sehen":{"ich":"sehe","du":"siehst","er/sie/es":"sieht","wir":"sehen","ihr":"seht","sie/Sie":"sehen"},"lesen":{"ich":"lese","du":"liest","er/sie/es":"liest","wir":"lesen","ihr":"lest","sie/Sie":"lesen"},"fahren":{"ich":"fahre","du":"fährst","er/sie/es":"fährt","wir":"fahren","ihr":"fahrt","sie/Sie":"fahren"},"kommen":{"ich":"komme","du":"kommst","er/sie/es":"kommt","wir":"kommen","ihr":"kommt","sie/Sie":"kommen"},"gehen":{"ich":"gehe","du":"gehst","er/sie/es":"geht","wir":"gehen","ihr":"geht","sie/Sie":"gehen"},"sprechen":{"ich":"spreche","du":"sprichst","er/sie/es":"spricht","wir":"sprechen","ihr":"sprecht","sie/Sie":"sprechen"},"arbeiten":{"ich":"arbeite","du":"arbeitest","er/sie/es":"arbeitet","wir":"arbeiten","ihr":"arbeitet","sie/Sie":"arbeiten"},"finden":{"ich":"finde","du":"findest","er/sie/es":"findet","wir":"finden","ihr":"findet","sie/Sie":"finden"},"wohnen":{"ich":"wohne","du":"wohnst","er/sie/es":"wohnt","wir":"wohnen","ihr":"wohnt","sie/Sie":"wohnen"},"spielen":{"ich":"spiele","du":"spielst","er/sie/es":"spielt","wir":"spielen","ihr":"spielt","sie/Sie":"spielen"},"machen":{"ich":"mache","du":"machst","er/sie/es":"macht","wir":"machen","ihr":"macht","sie/Sie":"machen"},"kaufen":{"ich":"kaufe","du":"kaufst","er/sie/es":"kauft","wir":"kaufen","ihr":"kauft","sie/Sie":"kaufen"},"kennen":{"ich":"kenne","du":"kennst","er/sie/es":"kennt","wir":"kennen","ihr":"kennt","sie/Sie":"kennen"}},

  // ─────────────────────────────────────────────────────────────
  // Helpers básicos
  // ─────────────────────────────────────────────────────────────
  getArticle(w) {
    const de = w[0].trim();
    const m = de.match(/^(der|die|das)\s/i);
    if (m) return m[1];
    if (w[2] && ["der", "die", "das"].includes(w[2])) return w[2];
    return null;
  },
  getGender(w) {
    const art = this.getArticle(w);
    return art === "der" ? "m" : art === "die" ? "f" : art === "das" ? "n" : null;
  },
  canonizeNoun(w) {
    const art = this.getArticle(w);
    const bare = w[0].replace(/^(der|die|das)\s?/i, "");
    return art ? art + " " + bare : bare;
  },
  getBareNoun(w) {
    return w[0].replace(/^(der|die|das)\s?/i, "");
  },
  isValidWord(w) {
    if (!w || !w[0] || !w[1]) return false;
    const de = w[0].trim(), es = w[1].trim();
    return !de.startsWith("[") && !es.startsWith("[") && es !== "-" && es !== "";
  },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  randomSlice(arr, count, exclude) {
    return arr.filter(x => x !== exclude).sort(() => Math.random() - 0.5).slice(0, count);
  },

  // ─────────────────────────────────────────────────────────────
  // Acceso a datos
  // ─────────────────────────────────────────────────────────────
  getVocabForLevel(levelId) {
    const R = window.Muller?.Ruta;
    return (R && R.VOCAB && R.VOCAB[levelId]) ? R.VOCAB[levelId] : [];
  },
  getValidWords(levelId) {
    return this.getVocabForLevel(levelId).filter(w => this.isValidWord(w));
  },

  /**
   * Devuelve TODAS las frases del nivel.
   * Cada frase: { key, de, es, adjDecl?, article?, case?, noun?, verb?, adjective?, gender?, plural? }
   * Los metadatos se usan SI están en el JSON. Si no, se infieren.
   */
  getPhrasesForLevel(levelId) {
    var bank = window.PhrasesBank || {};
    var levelBank = bank[levelId] || {};
    var result = [];
    for (var key in levelBank) {
      if (levelBank.hasOwnProperty(key)) {
        var phrases = levelBank[key];
        for (var i = 0; i < phrases.length; i++) {
          var p = phrases[i];
          // Si hay metadatos extendidos, usarlos. Si no, inferir.
          var entry = {
            key: key,
            de: p.de || "",
            es: p.es || "",
            adjDecl: p.adjDecl || null,
            article: p.article || null,
            case: p.case || null,
            noun: p.noun || null,
            verb: p.verb || null,
            adjective: p.adjective || null,
            gender: p.gender || null,
            plural: p.plural || null
          };
          result.push(entry);
        }
      }
    }
    return result;
  },

  // ─────────────────────────────────────────────────────────────
  // INFERENCIA de metadatos desde frases reales
  // (usado cuando el JSON NO tiene metadatos)
  // ─────────────────────────────────────────────────────────────
  
  /**
   * Infiere metadatos de una frase. Analiza:
   * - El artículo (der/die/das) y su caso
   * - Si hay adjetivo atributivo antes del sustantivo
   * - El sustantivo principal
   * - Si termina con "ist/sind ADJ" → adjetivo predicativo
   */
  inferPhraseMeta(p) {
    if (p.article && p.case && p.adjDecl) return p; // ya tiene metadatos
    
    var words = p.de.replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean);
    if (words.length < 2) return p;
    
    var meta = {
      adjDecl: p.adjDecl,
      article: p.article,
      case: p.case,
      noun: p.noun,
      verb: p.verb,
      adjective: p.adjective,
      gender: p.gender
    };

    // 1. Inferir artículo del inicio de la frase
    var firstWord = words[0].toLowerCase();
    var artMap = {der:"m",die:"f",das:"n"};
    if (artMap[firstWord]) {
      meta.article = meta.article || firstWord;
      meta.gender = meta.gender || artMap[firstWord];
    }
    
    // Si el artículo no está en la primera palabra, buscar entre las primeras 3
    if (!meta.article) {
      for (var i = 0; i < Math.min(3, words.length); i++) {
        var w = words[i].toLowerCase();
        if (artMap[w]) {
          meta.article = meta.article || w;
          meta.gender = meta.gender || artMap[w];
          break;
        }
      }
    }

    // 2. Inferir caso basado en el contexto
    // Nom: sujeto (primer sustantivo)
    // Acc: después de "sehen", "haben", "kaufen", etc.
    // Dat: después de "mit", "aus", "von", "zu", "bei", "nach"
    // Gen: después de "wegen", "trotz", "während"
    if (!meta.case) {
      var prepAcc = ["für","durch","gegen","ohne","um","entlang"];
      var prepDat = ["mit","aus","von","zu","bei","nach","seit","gegenüber","außer"];
      var prepGen = ["wegen","trotz","während","angesichts"];
      
      var caseGuess = "nom"; // default
      for (var i = 0; i < words.length; i++) {
        var w = words[i].toLowerCase();
        if (prepAcc.indexOf(w) >= 0) { caseGuess = "acc"; break; }
        if (prepDat.indexOf(w) >= 0) { caseGuess = "dat"; break; }
        if (prepGen.indexOf(w) >= 0) { caseGuess = "gen"; break; }
      }
      // Verbos que rigen acusativo
      var accVerbs = ["sehe","seht","siehst","hat","habe","hast","kaufe","kauft","kaufst","finde","findest","findet","brauche","brauchst","braucht","mag","magst","möchte","möchtest","will","willst"];
      for (var i = 0; i < Math.min(2, words.length); i++) {
        var w = words[i].toLowerCase();
        if (accVerbs.indexOf(w) >= 0) { caseGuess = "acc"; break; }
      }
      meta.case = caseGuess;
    }

    // 3. Inferir sustantivo principal (primera palabra capitalizada que no sea artículo)
    if (!meta.noun) {
      var capitalized = /^[A-ZÄÖÜ]/;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (capitalized.test(w) && !/^(Der|Die|Das|Den|Dem|Des|Ich|Du|Er|Sie|Es|Wir|Ihr)$/i.test(w)) {
          meta.noun = w;
          break;
        }
      }
    }

    // 4. Inferir adjetivo: buscar adjetivo atributivo (palabra en minúscula antes del sustantivo)
    if (!meta.adjective) {
      for (var i = 0; i < words.length - 1; i++) {
        var w = words[i];
        var next = words[i+1];
        if (/^[a-zäöüß]/.test(w) && /^[A-ZÄÖÜ]/.test(next) && !/^(der|die|das|den|dem|des|ein|eine|einen|einem|eines)$/i.test(w)) {
          meta.adjective = w;
          break;
        }
      }
    }
    // Si no hay atributivo, buscar predicativo tras "ist/sind"
    if (!meta.adjective) {
      var istIdx = -1;
      for (var i = 0; i < words.length; i++) {
        if (/^(ist|sind|bin|bist|war|waren)$/i.test(words[i])) { istIdx = i; break; }
      }
      if (istIdx >= 0 && istIdx < words.length - 1) {
        meta.adjective = words[words.length - 1];
      }
    }

    // 5. Inferir adjDecl basado en el adjetivo atributivo (si lo hay)
    if (!meta.adjDecl && meta.adjective) {
      // Si el adjetivo termina en -e, -er, -es, -en → extraer terminación
      var adjEndingMatch = meta.adjective.match(/[a-zäöüß]+(-[a-z]+)$/);
      if (adjEndingMatch) {
        meta.adjDecl = adjEndingMatch[1];
      } else {
        // Intentar extraer la última letra del adjetivo como terminación
        var adjLower = meta.adjective.toLowerCase();
        if (adjLower.match(/(e|er|es|em|en)$/)) {
          var ending = adjLower.match(/((?:e|er|es|em|en))$/);
          if (ending) meta.adjDecl = "-" + ending[1];
        }
      }
    }

    return Object.assign({}, p, meta);
  },

  /**
   * Obtiene frases con metadatos (inferidos si es necesario)
   */
  getPhrasesWithMeta(levelId) {
    var all = this.getPhrasesForLevel(levelId);
    return all.map(function(p) { return this.inferPhraseMeta(p); }.bind(this));
  },

  // ─────────────────────────────────────────────────────────────
  // GENERADORES DE EJERCICIOS basados en frases reales
  // ─────────────────────────────────────────────────────────────

  /**
   * 1. DECLINACIÓN DE ADJETIVOS
   * Si el JSON tiene adjDecl → usarlo directamente.
   * Si no → inferir del adjetivo en la frase.
   */
  generateAdjDeclExercises(levelId, count) {
    var exercises = [];
    var allWithMeta = this.getPhrasesWithMeta(levelId);
    
    // Filtrar frases que tengan adjDecl inferido o real
    var adjPhrases = allWithMeta.filter(function(p) {
      return p.adjDecl && p.noun && p.adjective && p.article;
    });
    
    if (adjPhrases.length === 0) return exercises;

    var allEndingOpts = ["-e", "-er", "-es", "-en"];
    var sliced = this.shuffle(adjPhrases).slice(0, Math.min(count, adjPhrases.length));
    
    for (var i = 0; i < sliced.length; i++) {
      var p = sliced[i];
      var correctEnding = p.adjDecl;
      var article = p.article || "der";
      var caseName = p.case || "nom";
      var noun = p.noun || "";
      var adjBase = p.adjective || "";

      // Limpiar la terminación del adjetivo para obtener la base
      var adjClean = adjBase.replace(/-(e|er|es|em|en)$/, "");
      adjClean = adjClean.replace(/(e|er|es|em|en)$/, "");
      if (adjClean.length === 0) adjClean = adjBase.replace(new RegExp(correctEnding.replace("-","")+"$"), "");

      var caseLabel = caseName.toUpperCase();
      var detTable = {
        nom: { m: "der", f: "die", n: "das", pl: "die" },
        acc: { m: "den", f: "die", n: "das", pl: "die" },
        dat: { m: "dem", f: "der", n: "dem", pl: "den" },
        gen: { m: "des", f: "der", n: "des", pl: "der" }
      };
      var genderMap = { "der": "m", "die": "f", "das": "n", "dem": "m", "den": "m" };
      var gender = genderMap[article] || (p.gender || "m");
      var targetDet = detTable[caseName] ? detTable[caseName][gender] : "der";

      var contextPhrase = "";
      if (caseName === "nom") {
        contextPhrase = targetDet.charAt(0).toUpperCase() + targetDet.slice(1) + " ___ " + noun + " ...";
      } else if (caseName === "acc") {
        contextPhrase = "... " + targetDet + " ___ " + noun + " ...";
      } else if (caseName === "dat") {
        contextPhrase = "... " + targetDet + " ___ " + noun + " ...";
      } else {
        contextPhrase = targetDet.charAt(0).toUpperCase() + targetDet.slice(1) + " ___ " + noun + " ...";
      }

      exercises.push({
        type: "adjectiveDeclension",
        prompt: "Completa el adjetivo '" + adjClean + "' en caso " + caseLabel + ":\n\"" + contextPhrase + "\"",
        answer: correctEnding,
        options: this.shuffle([].concat(allEndingOpts)),
        hint: "Caso " + caseLabel + " (" + targetDet + "). Terminación: " + correctEnding,
        speakText: p.de,
        word: [p.de, p.es],
        translation: p.es,
        sourcePhrase: p.de
      });
    }
    return exercises;
  },

  /**
   * 2. ARTÍCULO CORRECTO según caso
   * Pide elegir der/die/das/dem/den según el contexto de la frase.
   * Muestra la frase con un hueco donde iría el artículo.
   */
  generateArticleExercises(levelId, count) {
    var exercises = [];
    var allWithMeta = this.getPhrasesWithMeta(levelId);
    var allPhrases = this.getPhrasesForLevel(levelId);
    
    if (allWithMeta.length === 0 && allPhrases.length === 0) return exercises;

    var allArticles = ["der", "die", "das", "dem", "den"];
    var caseOpts = ["nom", "acc", "dat", "gen"];
    var genderMap = { "der": "m", "die": "f", "das": "n" };

    // Usar frases que tengan un artículo identificable
    var articlePhrases = allWithMeta.filter(function(p) { return p.article; });
    if (articlePhrases.length === 0) {
      // Fallback: usar todas las frases e inferir el artículo del inicio
      articlePhrases = allPhrases.map(function(p) { 
        var m = p.de.match(/^(Der|Die|Das)\s/);
        if (m) return { de: p.de, es: p.es, article: m[1].toLowerCase(), gender: genderMap[m[1].toLowerCase()] || "m", noun: p.de.match(/^Der|Die|Das\s+([A-ZÄÖÜ][a-zäöüß]+)/)?.[1] || "" };
        return null;
      }).filter(Boolean);
    }

    if (articlePhrases.length === 0) return exercises;

    var sliced = this.shuffle(articlePhrases).slice(0, Math.min(count, articlePhrases.length));
    for (var i = 0; i < sliced.length; i++) {
      var p = sliced[i];
      var origArticle = p.article;
      var gender = p.gender || genderMap[origArticle] || "m";
      
      // Elegir caso para el ejercicio
      var targetCase = caseOpts[Math.floor(Math.random() * caseOpts.length)];
      var correctArticle = this.getArticleForCase(targetCase, gender);
      
      // Distractors
      var allForCase = {
        nom: ["der", "die", "das"],
        acc: ["den", "die", "das"],
        dat: ["dem", "der"],
        gen: ["des", "der"]
      };
      var distractorArticles = (allForCase[targetCase] || ["der", "die", "das"]).filter(function(a) { return a !== correctArticle; });
      while (distractorArticles.length < 2) {
        var extra = allArticles.filter(function(a) { return a !== correctArticle && distractorArticles.indexOf(a) === -1; });
        if (extra.length === 0) break;
        distractorArticles.push(extra[0]);
      }

      // Mostrar la frase con un hueco ___ donde iría el artículo
      var rest = p.de.replace(/^(Der|Die|Das)\s/i, "");
      var blankPhrase = "___ " + rest;

      exercises.push({
        type: "articleChoice",
        prompt: "Elige el artículo correcto para caso " + targetCase.toUpperCase() + ":\n\"" + blankPhrase + "\"",
        answer: correctArticle,
        options: this.shuffle([correctArticle].concat(distractorArticles)),
        hint: "Caso: " + targetCase.toUpperCase() + ", Género: " + origArticle + " (" + gender + ")",
        speakText: p.de,
        word: [p.de, p.es],
        translation: p.es,
        sourcePhrase: p.de
      });
    }
    return exercises;
  },

  /** Obtiene artículo por caso y género */
  getArticleForCase(caseName, gender) {
    var map = {
      nom: { m: "der", f: "die", n: "das", pl: "die" },
      acc: { m: "den", f: "die", n: "das", pl: "die" },
      dat: { m: "dem", f: "der", n: "dem", pl: "den" },
      gen: { m: "des", f: "der", n: "des", pl: "der" }
    };
    return (map[caseName] && map[caseName][gender]) || "der";
  },

  /**
   * 3. ORDENAR PALABRAS
   * Shuffle de palabras de la frase real.
   * Muestra la traducción al español para guiar al usuario.
   */
  generateOrderExercises(levelId, count) {
    var exercises = [];
    var allPhrases = this.getPhrasesForLevel(levelId);
    if (allPhrases.length === 0) return exercises;

    var sliced = this.shuffle(allPhrases).slice(0, Math.min(count, allPhrases.length));
    for (var i = 0; i < sliced.length; i++) {
      var p = sliced[i];
      var clean = p.de.replace(/[.!?]+$/g, "").trim();
      var words = clean.split(/\s+/).filter(Boolean);
      if (words.length < 3) continue;
      var shuffled = this.shuffle(words);
      exercises.push({
        type: "order",
        prompt: "Ordena las palabras para formar la frase:\n🇪🇸 \"" + p.es + "\"",
        answer: clean,
        scrambledWords: shuffled,
        hint: "Forma una frase correcta en alemán. Empieza con mayúscula.",
        speakText: clean,
        word: [p.de, p.es],
        translation: p.es,
        sourcePhrase: p.de
      });
    }
    return exercises;
  },

  /**
   * 4. COMPLETAR HUECOS
   * Oculta una palabra (sustantivo, verbo, adjetivo) de la frase real.
   */
  generateFillInBlankExercises(levelId, count) {
    var exercises = [];
    var allPhrases = this.getPhrasesForLevel(levelId);
    if (allPhrases.length === 0) return exercises;

    var sliced = this.shuffle(allPhrases).slice(0, Math.min(count, allPhrases.length));
    for (var i = 0; i < sliced.length; i++) {
      var p = sliced[i];
      var clean = p.de.replace(/[.!?]+$/g, "").trim();
      var words = clean.split(/\s+/).filter(Boolean);
      if (words.length < 3) continue;

      // Elegir qué palabra ocultar: priorizar sustantivo > verbo > adjetivo > aleatorio
      var hideIdx = -1;
      
      // Buscar sustantivo (palabra capitalizada que no sea artículo/pronombre)
      for (var j = 1; j < words.length; j++) {
        if (/^[A-ZÄÖÜ][a-zäöüß]+$/.test(words[j]) && !/^(Der|Die|Das|Den|Dem|Des|Ich|Du|Er|Sie|Es|Wir|Ihr)$/i.test(words[j])) {
          hideIdx = j;
          break;
        }
      }
      
      // Si no, buscar verbo auxiliar/modal
      if (hideIdx < 0) {
        for (var j = 0; j < words.length; j++) {
          if (/^(ist|sind|bin|bist|hat|habe|hast|wird|wirst|werde|seid|sein|haben|werden|kann|kannst|können|muss|musst|müssen|darf|darfst|dürfen|soll|sollst|sollen|will|willst|wollen|mag|magst|mögen|möchte|möchtest)$/i.test(words[j])) {
            hideIdx = j;
            break;
          }
        }
      }
      
      // Si no, buscar adjetivo (minúscula, > 2 letras)
      if (hideIdx < 0) {
        for (var j = 0; j < words.length; j++) {
          if (/^[a-zäöüß][a-zäöüß]*$/.test(words[j]) && words[j].length > 2) {
            hideIdx = j;
            break;
          }
        }
      }
      
      // Fallback: palabra del medio
      if (hideIdx < 0) hideIdx = Math.floor(words.length / 2);

      var hiddenWord = words[hideIdx];
      var answer = hiddenWord;

      // Si ocultamos artículo + sustantivo, la respuesta es el sustantivo
      if (hideIdx > 0 && /^(der|die|das|den|dem|des|ein|eine|einen|einem|eines)$/i.test(words[hideIdx - 1])) {
        var originalHideIdx = hideIdx;
        hideIdx = hideIdx - 1;
        answer = words[originalHideIdx];
      }

      var hiddenSentence = words.map(function(w, idx) {
        var isArticleBefore = (hideIdx > 0 && idx === hideIdx && /^(der|die|das|den|dem|des|ein|eine|einen|einem|eines)$/i.test(words[hideIdx]));
        var isHidden = (idx === hideIdx || (hideIdx > 0 && idx === hideIdx + 1 && /^(der|die|das|den|dem|des)$/i.test(words[hideIdx])));
        return isHidden || isArticleBefore ? "___" : w;
      }).join(" ");

      // Distractors del vocabulario del nivel
      var vocab = this.getValidWords(levelId);
      var bareWords = vocab.map(function(w) { return this.getBareNoun(w); }.bind(this));
      var distractors = this.shuffle(bareWords.filter(function(bw) {
        return bw.toLowerCase() !== answer.toLowerCase();
      })).slice(0, 3);

      while (distractors.length < 2) {
        var extra = words.filter(function(w) {
          return w !== answer && distractors.indexOf(w) === -1;
        });
        if (extra.length === 0) break;
        distractors.push(extra[0]);
      }

      exercises.push({
        type: "fillInSentence",
        prompt: "Completa la frase:\n\"" + hiddenSentence + "\"\n🇪🇸 \"" + p.es + "\"",
        answer: answer,
        options: this.shuffle([answer].concat(distractors)),
        hint: "Falta una palabra en la frase original.",
        speakText: p.de,
        word: [p.de, p.es],
        translation: p.es,
        sourcePhrase: p.de
      });
    }
    return exercises;
  },

  /**
   * 5. PRONUNCIACIÓN
   * Usa frases SIMPLES del nivel (máx 5 palabras para facilitar la pronunciación).
   * Rotación entre TODAS las frases simples disponibles.
   */
  generatePronunciationExercises(levelId, count) {
    var exercises = [];
    var allPhrases = this.getPhrasesForLevel(levelId);
    if (allPhrases.length === 0) return exercises;

    // Filtrar frases SIMPLES: máximo 5 palabras
    var simplePhrases = allPhrases.filter(function(p) {
      var words = p.de.replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean);
      return words.length >= 2 && words.length <= 5;
    });

    // Si no hay suficientes frases simples, usar todas pero priorizar las más cortas
    var pool = simplePhrases.length >= count ? simplePhrases : allPhrases.sort(function(a, b) {
      var aLen = a.de.replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean).length;
      var bLen = b.de.replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean).length;
      return aLen - bLen;
    });

    // sessionStorage para rotación
    var sessionKey = "muller_pron_used_" + levelId;
    var usedIndicesStr = sessionStorage.getItem(sessionKey);
    var usedIndices = [];
    try { usedIndices = usedIndicesStr ? JSON.parse(usedIndicesStr) : []; } catch(e) { usedIndices = []; }

    var available = [];
    for (var i = 0; i < pool.length; i++) {
      if (usedIndices.indexOf(i) === -1) {
        available.push({ phrase: pool[i], index: i });
      }
    }

    if (available.length < count && pool.length > 0) {
      usedIndices = [];
      available = [];
      for (var i = 0; i < pool.length; i++) {
        available.push({ phrase: pool[i], index: i });
      }
    }

    var sliced = this.shuffle(available).slice(0, Math.min(count, available.length));
    var newUsed = [];
    for (var i = 0; i < sliced.length; i++) {
      var item = sliced[i];
      var p = item.phrase;
      exercises.push({
        type: "pronounce",
        prompt: "Repite en voz alta:\n\"" + p.de + "\"",
        answer: p.de,
        phraseToPronounce: p.de,
        speakText: p.de,
        hint: "Usa el micrófono para repetir la frase.",
        word: [p.de, p.es],
        translation: p.es,
        sourcePhrase: p.de
      });
      newUsed.push(item.index);
    }

    usedIndices = usedIndices.concat(newUsed);
    try { sessionStorage.setItem(sessionKey, JSON.stringify(usedIndices)); } catch(e) {}

    return exercises;
  },

  // ─────────────────────────────────────────────────────────────
  // GENERADOR PRINCIPAL
  // ─────────────────────────────────────────────────────────────

  generateExercises(levelId, lessonIdx, wordsPerLesson) {
    const allValid = this.getValidWords(levelId);
    const allPhrases = this.getPhrasesForLevel(levelId);

    if (allValid.length === 0 && allPhrases.length === 0) return [];

    const exercises = [];
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
    const vocabTypes = ["fill", "translateDE", "translateES", "choose", "declension", "plural", "conjugate"];

    // ─── EJERCICIOS BASADOS EN FRASES DEL NIVEL ───
    // TODOS generados SOLO con frases de phrasesBank[levelId]

    // EJ 1: Declinación de adjetivos (usa adjDecl inferido del JSON cuando no tiene metadatos)
    var adjDeclCount = Math.min(3, Math.max(1, Math.floor(wordsPerLesson * 0.1)));
    if (adjDeclCount > 0 && allPhrases.length > 0) {
      var adjEx = this.generateAdjDeclExercises(levelId, adjDeclCount);
      for (var i = 0; i < adjEx.length; i++) {
        if (exercises.length < wordsPerLesson * 2) exercises.push(adjEx[i]);
      }
    }

    // EJ 2: Artículo correcto según caso
    var artCount = Math.min(3, Math.max(1, Math.floor(wordsPerLesson * 0.1)));
    if (artCount > 0 && allPhrases.length > 0) {
      var artEx = this.generateArticleExercises(levelId, artCount);
      for (var i = 0; i < artEx.length; i++) {
        if (exercises.length < wordsPerLesson * 2) exercises.push(artEx[i]);
      }
    }

    // EJ 3: Ordenar palabras
    var orderCount = Math.min(3, Math.max(1, Math.floor(wordsPerLesson * 0.1)));
    if (orderCount > 0 && allPhrases.length > 0) {
      var orderEx = this.generateOrderExercises(levelId, orderCount);
      for (var i = 0; i < orderEx.length; i++) {
        if (exercises.length < wordsPerLesson * 2) exercises.push(orderEx[i]);
      }
    }

    // EJ 4: Completar huecos
    var fillCount = Math.min(3, Math.max(1, Math.floor(wordsPerLesson * 0.1)));
    if (fillCount > 0 && allPhrases.length > 0) {
      var fillEx = this.generateFillInBlankExercises(levelId, fillCount);
      for (var i = 0; i < fillEx.length; i++) {
        if (exercises.length < wordsPerLesson * 2) exercises.push(fillEx[i]);
      }
    }

    // EJ 5: Pronunciación (ROTA entre frases SIMPLES del nivel)
    var pronCount = Math.min(4, Math.max(2, Math.floor(wordsPerLesson * 0.15)));
    if (pronCount > 0 && allPhrases.length > 0) {
      var pronEx = this.generatePronunciationExercises(levelId, pronCount);
      for (var i = 0; i < pronEx.length; i++) {
        if (exercises.length < wordsPerLesson * 2) {
          pronEx[i].isReview = false;
          exercises.push(pronEx[i]);
        }
      }
    }

    // ─── EJERCICIOS DE VOCABULARIO ───
    // Usan rutaVocabData.js (fill, translate, conjugate, etc.)

    // Repaso SRS
    for (const w of reviewWordsInVocab) {
      if (usedSet.has(w[0])) continue;
      usedSet.add(w[0]);
      if (exercises.length >= wordsPerLesson * 2) break;
      var ex = this.createVocabExercise(w, vocabTypes, allValid);
      if (ex) { ex.isReview = true; exercises.push(ex); }
    }

    // Nuevas palabras
    for (const w of newLessonWords) {
      if (usedSet.has(w[0])) continue;
      usedSet.add(w[0]);
      if (exercises.length >= wordsPerLesson * 2) break;
      var ex = this.createVocabExercise(w, vocabTypes, allValid);
      if (ex) exercises.push(ex);
    }

    // ─── EJERCICIOS COMPLEMENTARIOS ───
    // matchPairs x3
    if (allValid.length > 0) {
      var matchCount = Math.min(5, allValid.length);
      for (var r = 0; r < 3; r++) {
        if (exercises.length >= wordsPerLesson * 3) break;
        var matchWords = this.selectUniquePairs(allValid, matchCount);
        if (matchWords.length < 2) break;
        var dePairs = matchWords.map(function(w) { return this.canonizeNoun(w); }.bind(this));
        var esPairs = matchWords.map(function(w) { return w[1]; });
        exercises.push({
          type: "matchPairs",
          prompt: "Empareja cada palabra en alemán con su traducción en español",
          pairs: dePairs.map(function(de, i) { return { de: de, es: esPairs[i] }; }),
          leftColumn: this.shuffle(dePairs),
          rightColumn: this.shuffle(esPairs),
          hint: "Selecciona una palabra de la izquierda y luego su traducción de la derecha.",
          word: matchWords[0]
        });
      }

      // audioMatch
      if (exercises.length < wordsPerLesson * 3) {
        var audioMatchCount = Math.min(4, allValid.length);
        var audioMatchWords = this.selectUniquePairs(allValid, audioMatchCount);
        if (audioMatchWords.length >= 2) {
          var audioDePairs = audioMatchWords.map(function(w) { return this.canonizeNoun(w); }.bind(this));
          var audioEsPairs = audioMatchWords.map(function(w) { return w[1]; });
          exercises.push({
            type: "audioMatch",
            prompt: "Escucha y empareja cada palabra con su traducción",
            pairs: audioDePairs.map(function(de, i) { return { de: de, es: audioEsPairs[i] }; }),
            leftColumn: audioDePairs,
            rightColumn: this.shuffle(audioEsPairs),
            hint: "Pulsa un altavoz para escuchar la palabra y luego selecciona su traducción.",
            word: audioMatchWords[0]
          });
        }
      }
    }

    return this.shuffleNoRepeat(exercises);
  },

  /**
   * Crea un ejercicio de vocabulario para una palabra
   */
  createVocabExercise(w, types, allValid) {
    if (!this.isValidWord(w)) return null;
    var type = types[Math.floor(Math.random() * types.length)];
    var deMain = this.canonizeNoun(w);
    var bare = this.getBareNoun(w);
    var esMain = w[1];
    var ex = null;
    var deAllNouns = [...new Set(allValid.filter(function(vw) { return vw[4] === "n"; }).map(function(vw) { return this.canonizeNoun(vw); }.bind(this)))];
    var esAll = [...new Set(allValid.map(function(vw) { return vw[1]; }))];

    switch (type) {
      case "fill":
        ex = { type: "fill", prompt: "Completa: \"___\" significa \"" + esMain + "\".", answer: deMain, options: this.shuffle(this.randomSlice(deAllNouns, 3, deMain).concat(deMain)), hint: "" };
        break;
      case "translateDE":
        ex = { type: "translateDE", prompt: "Traduce al alemán: \"" + esMain + "\"", answer: deMain, hint: "" };
        break;
      case "translateES":
        ex = { type: "translateES", prompt: "Traduce al español: \"" + deMain + "\"", answer: esMain, hint: "" };
        break;
      case "choose":
        ex = { type: "choose", prompt: "¿Cuál es la traducción de \"" + deMain + "\"?", answer: esMain, options: this.shuffle(this.randomSlice(esAll, 3, esMain).concat(esMain)), hint: "" };
        break;
      case "declension": {
        var art = this.getArticle(w);
        if (art) {
          var dist = ["der", "die", "das"].filter(function(a) { return a !== art; });
          ex = { type: "declension", prompt: "¿Cuál es el artículo correcto para \"" + bare + "\"?", answer: art, options: this.shuffle([art].concat(dist)), hint: "" };
        }
        break;
      }
      case "plural":
        if (w[3] && w[3] !== "-" && !w[3].startsWith("[")) {
          ex = { type: "plural", prompt: "¿Cuál es el plural de \"" + bare + "\"?", answer: w[3], options: this.shuffle(this.randomSlice(deAllNouns, 3, w[3]).concat(w[3])), hint: "" };
        }
        break;
      case "conjugate":
        if (w[4] === "v" && this.conjugations[w[0]]) {
          var persons = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
          var person = persons[Math.floor(Math.random() * persons.length)];
          ex = { type: "conjugate", prompt: "Conjuga \"" + w[0] + "\" para \"" + person + "\":", answer: this.conjugations[w[0]][person], hint: "" };
        }
        break;
    }
    if (ex) {
      ex.word = w;
      ex.translation = esMain;
      ex.speakText = w[4] === "n" ? this.canonizeNoun(w) : w[0];
    }
    return ex;
  },

  /**
   * Selecciona N palabras ASEGURANDO que tanto canonizeNoun (lado DE) como traducción (lado ES)
   * sean únicos. Así se evitan pares duplicados en matchPairs/audioMatch.
   */
  selectUniquePairs(allValid, count) {
    var usedDe = new Set();
    var usedEs = new Set();
    var selected = [];

    // Barajar para aleatoriedad
    var pool = this.shuffle(allValid);

    for (var i = 0; i < pool.length && selected.length < count; i++) {
      var w = pool[i];
      if (!this.isValidWord(w)) continue;
      var deKey = this.canonizeNoun(w);
      var esKey = w[1].trim();
      if (!usedDe.has(deKey) && !usedEs.has(esKey)) {
        usedDe.add(deKey);
        usedEs.add(esKey);
        selected.push(w);
      }
    }

    return selected;
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