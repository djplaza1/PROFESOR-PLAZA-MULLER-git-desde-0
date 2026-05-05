// src/features/lectura/lecturaHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Lectura = window.Muller.Lectura || {};

// Constantes de tamaño de fuente
window.Muller.Lectura.MULLER_READING_FONT_MIN = 14;
window.Muller.Lectura.MULLER_READING_FONT_MAX = 32;
window.Muller.Lectura.MULLER_READING_FONT_STEP = 1;

// Tokenización de texto para lectura interactiva
window.Muller.Lectura.mullerReadingTokenizeText = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return [];
  const tokens = [];
  const regex = /(\S+)(\s+)?/g;
  let match;
  let pos = 0;
  while ((match = regex.exec(rawText)) !== null) {
    let word = match[1];
    let space = match[2] || '';
    // Limpiar puntuación del token para la clave de búsqueda
    const clean = word.replace(/^[^a-zA-ZäöüßÄÖÜ0-9]+|[^a-zA-ZäöüßÄÖÜ0-9]+$/g, '');
    tokens.push({
      word: word,
      cleanKey: clean.toLowerCase(),
      space: space,
      start: match.index,
      end: match.index + word.length,
    });
    pos = match.index + match[0].length;
  }
  return tokens;
};

// Normalización de texto hablado (para comparar)
window.Muller.Lectura.normalizeGermanSpeechText = (text) => {
  if (!text) return '';
  let t = text.toLowerCase();
  t = t.replace(/[.,;:!?¿¡"»«()\[\]{}\-]/g, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
};

// ─── CORRECTOR FONÉTICO ALEMÁN OFFLINE ───
// Detecta errores de pronunciación típicos en alemanes sin necesidad de API
window.Muller.Lectura.checkGermanPhonetics = (expectedWord, spokenWord) => {
  if (!expectedWord || !spokenWord) return { correct: false, errors: ['Palabra vacía'] };
  
  var e = expectedWord.toLowerCase().trim();
  var s = spokenWord.toLowerCase().trim();
  
  if (e === s) return { correct: true, errors: [] };
  
  var errors = [];
  
  // 1. Auslautverhärtung: b→p, d→t, g→k al final
  var auslautMap = { b: 'p', d: 't', g: 'k' };
  var eFinal = e.slice(-1);
  var sFinal = s.slice(-1);
  if (auslautMap[eFinal] && sFinal === auslautMap[eFinal]) {
    errors.push('Auslautverhärtung: "' + eFinal + '" final suena como "' + auslautMap[eFinal] + '"');
  }
  
  // 2. ü→u / ö→o / ä→a
  if (e.includes('ü') && !s.includes('ü')) errors.push('La ü debe sonar como una "u" con los labios redondeados, no como "u" simple');
  if (e.includes('ö') && !s.includes('ö')) errors.push('La ö debe sonar como una "o" con los labios redondeados');
  if (e.includes('ä') && !s.includes('ä')) errors.push('La ä debe sonar como una "e" abierta');
  
  // 3. ß→ss
  if (e.includes('ß') && s.includes('ss')) errors.push('La ß se alarga el sonido de la "s", mantenlo más largo');
  
  // 4. ch → sch / sch → ch
  if (e.includes('sch') && !s.includes('sch') && s.includes('ch')) errors.push('"sch" suena como "sh" en inglés, no como "ch"');
  if (!e.includes('sch') && e.includes('ch') && s.includes('sch')) errors.push('"ch" no es "sch", es más suave (como en "ich")');
  
  // 5. Ich-Laut vs Ach-Laut
  // ch después de e,i,ä,ö,ü,eu,äu,ei = ich-Laut (suave)
  // ch después de a,o,u = ach-Laut (fuerte, como la j española)
  var ichLautPattern = /[eiäöü]/;
  var achLautPattern = /[aou]/;
  var eMatch = e.match(/ch/g);
  var sMatch = s.match(/ch/g);
  if (eMatch && eMatch.length > 0) {
    var ePos = e.indexOf('ch');
    var eBefore = ePos > 0 ? e[ePos - 1] : '';
    if (ichLautPattern.test(eBefore) && !s.includes('ch')) {
      errors.push('Ich-Laut: La "ch" después de "' + eBefore + '" es suave, como una "sh" muy suave');
    }
    if (achLautPattern.test(eBefore) && s.includes('ch')) {
      // podría estar bien, pero si lo hace como j española está bien
    }
  }
  
  // 6. st/sp al inicio de sílaba → sht/shp
  if (e.startsWith('st') && s.startsWith('st') && !s.startsWith('sht') && !s.startsWith('ʃt')) {
    errors.push('"st" al inicio suena como "sht" (scht) en alemán');
  }
  if (e.startsWith('sp') && s.startsWith('sp') && !s.startsWith('shp') && !s.startsWith('ʃp')) {
    errors.push('"sp" al inicio suena como "shp" (schp) en alemán');
  }
  
  // 7. v → f
  if (e.startsWith('v') && s.startsWith('v')) {
    errors.push('La "v" en alemán suena como "f" (salvo en extranjerismos)');
  }
  
  // 8. w → v
  if (e.startsWith('w') && s.startsWith('w')) {
    errors.push('La "w" en alemán suena como "v"');
  }
  
  // 9. z → ts
  if (e.startsWith('z') && s.startsWith('z')) {
    errors.push('La "z" en alemán suena como "ts"');
  }
  
  // 10. th → t (el inglés no tiene th en alemán nativo)
  if (s.includes('th') && !e.includes('th')) {
    errors.push('No hay "th" en alemán nativo; suena como "t"');
  }
  
  return { correct: errors.length === 0, errors: errors };
};

// ─── GENERADOR DE MAPA DE CALOR ───
// Devuelve array de { word, cleanKey, errorCount, color } para pintar el texto
window.Muller.Lectura.generateHeatmap = (tokens, historyErrors) => {
  if (!tokens || !historyErrors) return tokens.map(function(t) {
    return { word: t.word, cleanKey: t.cleanKey, errorCount: 0, color: '#22c55e' };
  });
  
  // historyErrors: array de palabras falladas (cleanKey)
  var errorMap = {};
  historyErrors.forEach(function(key) {
    errorMap[key] = (errorMap[key] || 0) + 1;
  });
  
  var maxErrors = Math.max(1, Math.max.apply(null, Object.values(errorMap)));
  
  return tokens.map(function(t) {
    var count = errorMap[t.cleanKey] || 0;
    var intensity = count / maxErrors;
    var color;
    if (count === 0) color = '#22c55e'; // verde
    else if (intensity < 0.33) color = '#fbbf24'; // amarillo
    else if (intensity < 0.66) color = '#f97316'; // naranja
    else color = '#ef4444'; // rojo
    return { word: t.word, cleanKey: t.cleanKey, errorCount: count, color: color };
  });
};