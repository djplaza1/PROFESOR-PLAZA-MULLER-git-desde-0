// ═══════════════════════════════════════════════════
// RESALTADOR - Resalta palabras en texto alemán
// Ahora soporta vocabulario del usuario desde localStorage
// ═══════════════════════════════════════════════════
window.Muller.Resaltador = (() => {
  const React = window.React;

  const CLASSES = {
    vocab: "bg-yellow-400/30 border-b-2 border-yellow-500 text-yellow-100 font-semibold px-0.5 rounded",
    conn: "text-purple-400 underline decoration-purple-500 underline-offset-2",
    dat: "text-blue-400 underline decoration-blue-500 underline-offset-2",
    akk: "text-red-400 underline decoration-red-500 underline-offset-2",
    wech: "text-amber-400 underline decoration-amber-500 underline-offset-2",
    verbprep: "bg-cyan-400/20 border-b-2 border-cyan-400 text-cyan-100 px-0.5 rounded",
    marcada: "bg-yellow-300/40 border-b-2 border-yellow-400 text-yellow-200 font-bold px-1 rounded shadow-[0_0_6px_rgba(250,204,21,0.4)]"
  };

  const CONECTORES = new Set([
    "weil", "denn", "obwohl", "deshalb", "trotzdem", "außerdem", "sondern",
    "aber", "oder", "und", "wenn", "als", "dass", "damit", "sobald", "während"
  ]);

  const PREPOS = {
    dat: new Set(["mit", "nach", "bei", "seit", "von", "zu", "aus", "gegenüber"]),
    akk: new Set(["durch", "für", "ohne", "um", "gegen", "bis", "entlang"]),
    wech: new Set(["in", "an", "auf", "über", "unter", "vor", "hinter", "neben", "zwischen"])
  };

  const VERBOS_PREP = new Set([
    "warten auf", "denken an", "sprechen über", "sich freuen auf", "sich interessieren für",
    "teilnehmen an", "träumen von", "helfen bei", "gehören zu", "anfangen mit"
  ]);

  /**
   * Carga todas las palabras del vocabulario del usuario desde localStorage
   * y las combina en un mapa: palabra_minúscula -> { de, es, level, listName }
   */
  function loadUserVocabMap() {
    var vocabMap = {};
    try {
      var lists = window.Muller.storage.get('mullerVocabs', []);
      if (!Array.isArray(lists)) return vocabMap;
      lists.forEach(function(list) {
        if (!Array.isArray(list.words)) return;
        list.words.forEach(function(w) {
          if (!w.de) return;
          var key = w.de.toLowerCase().replace(/^der\s+|^die\s+|^das\s+/, '').trim();
          // Guardar también con artículo
          var keyWithArticle = w.de.toLowerCase().trim();
          vocabMap[keyWithArticle] = { de: w.de, es: w.es || '', level: list.level || '?', listName: list.name || '' };
          // Guardar sin artículo
          if (key !== keyWithArticle) {
            vocabMap[key] = { de: w.de, es: w.es || '', level: list.level || '?', listName: list.name || '' };
          }
        });
      });
    } catch(e) {}
    return vocabMap;
  }

  /**
   * Busca palabras de vocabulario del usuario en un texto dado.
   * @param {string} texto - Texto en alemán
   * @returns {Array<{word: string, vocabInfo: {de, es, level, listName}}>}
   */
  function findUserVocabInText(texto) {
    if (!texto) return [];
    var vocabMap = loadUserVocabMap();
    var found = [];
    var tokens = texto.match(/\S+|\s+/g) || [];
    var seen = new Set();
    
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.trim() === '') continue;
      var limpio = token.replace(/[.,!?;:"'»«()¿¡\-]/g, '').toLowerCase();
      if (!limpio || seen.has(limpio)) continue;
      
      // Buscar bigramas (ej: "sich freuen")
      if (i < tokens.length - 1) {
        var nextLimpio = (tokens[i + 1] || '').replace(/[.,!?;:"'»«()¿¡\-]/g, '').toLowerCase();
        if (nextLimpio) {
          var bigram = limpio + ' ' + nextLimpio;
          if (vocabMap[bigram]) {
            seen.add(limpio);
            seen.add(nextLimpio);
            found.push({ word: bigram, vocabInfo: vocabMap[bigram] });
            continue;
          }
        }
      }
      
      if (vocabMap[limpio]) {
        seen.add(limpio);
        found.push({ word: token.replace(/[.,!?;:"'»«()¿¡]/g, ''), vocabInfo: vocabMap[limpio] });
      }
    }
    
    return found;
  }

  /**
   * Resalta palabras en el texto.
   * Ahora también resalta palabras del vocabulario del usuario.
   */
  function resaltar(texto, vocabulario = [], palabrasMarcadas = []) {
    if (!texto) return null;
    
    // Vocabulario del usuario desde localStorage
    var userVocabMap = loadUserVocabMap();
    
    const vocabSet = new Set(vocabulario.map(v => v.palabra?.toLowerCase()));
    const marcadasSet = new Set(palabrasMarcadas.map(p => p.toLowerCase()));
    const tokens = texto.match(/\S+|\s+/g) || [];
    const elementos = [];
    let i = 0;
    for (const token of tokens) {
      if (token.trim() === "") {
        elementos.push(token);
        continue;
      }
      const limpio = token.replace(/[.,!?;:"'»«()¿¡]/g, "").toLowerCase();
      let cls = "";
      let title = "";
      
      // 1) Palabras marcadas (en aprendizaje)
      if (marcadasSet.has(limpio)) {
        cls = CLASSES.marcada;
        title = "En aprendizaje";
      } 
      // 2) Vocabulario del usuario (prioridad alta)
      else if (userVocabMap[limpio]) {
        cls = CLASSES.vocab;
        title = userVocabMap[limpio].es;
      }
      // 3) Vocabulario de la escena
      else if (vocabSet.has(limpio)) {
        cls = CLASSES.vocab;
        title = "Vocabulario de la escena";
      } 
      // 4) Conectores
      else if (CONECTORES.has(limpio)) {
        cls = CLASSES.conn;
        title = "Conector";
      } 
      // 5) Preposiciones
      else if (PREPOS.dat.has(limpio)) {
        cls = CLASSES.dat;
        title = "Preposición con Dativ";
      } else if (PREPOS.akk.has(limpio)) {
        cls = CLASSES.akk;
        title = "Preposición con Akkusativ";
      } else if (PREPOS.wech.has(limpio)) {
        cls = CLASSES.wech;
        title = "Preposición Wechsel";
      } 
      // 6) Verbos con preposición
      else if (i < tokens.length - 1) {
        const nextLimpio = (tokens[i + 1] || "").replace(/[.,!?;:"'»«()¿¡]/g, "").toLowerCase();
        const bigram = limpio + " " + nextLimpio;
        if (VERBOS_PREP.has(bigram)) {
          cls = CLASSES.verbprep;
          title = "Verbo con preposición";
        }
      }
      if (cls) {
        elementos.push(React.createElement("span", { key: i, className: cls, title }, token));
      } else {
        elementos.push(token);
      }
      i++;
    }
    return elementos;
  }

  /**
   * Divide un texto en oraciones.
   * @param {string} texto - Texto a dividir
   * @returns {Array<string>} Lista de oraciones
   */
  function dividirEnOraciones(texto) {
    if (!texto) return [];
    // Dividir por punto, signo de exclamación, interrogación, dos puntos, punto y coma
    var oraciones = texto.match(/[^.!?;:\n]+[.!?;:\n]?/g) || [];
    return oraciones
      .map(function(o) { return o.trim(); })
      .filter(function(o) { return o.length > 0; });
  }

  return { 
    resaltar, 
    findUserVocabInText, 
    loadUserVocabMap, 
    dividirEnOraciones,
    CLASSES 
  };
})();