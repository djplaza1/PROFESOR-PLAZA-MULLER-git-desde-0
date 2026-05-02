// src/features/lectura/helpers/normalization.jsx
// Normalización de texto alemán para comparación (minúsculas, umlauts, ß, etc.)
window.Muller = window.Muller || {};
window.Muller.LecturaHelpers = window.Muller.LecturaHelpers || {};

// CONFIG
window.Muller.LecturaHelpers.NORMALIZATION_CONFIG = {
  normalizeUmlauts: true,   // convertir ä→ae, ö→oe, ü→ue, ß→ss
  removePunctuation: true,  // eliminar signos de puntuación no alfabéticos
  trimWhitespace: true,     // espacios múltiples → uno solo
  lowercase: true
};

// Normaliza un texto para comparación flexible
// @param {string} text
// @param {Object} opts - opciones que sobreescriben config
// @returns {string}
window.Muller.LecturaHelpers.normalize = function(text, opts) {
  if (!text) return '';
  var config = Object.assign({}, window.Muller.LecturaHelpers.NORMALIZATION_CONFIG, opts || {});
  var result = text;

  if (config.lowercase) result = result.toLowerCase();
  if (config.removePunctuation) {
    // Quita puntuación pero mantiene guiones internos de palabras compuestas alemanas
    result = result.replace(/[.,!?;:'"()\[\]{}¿¡«»„“”…–—]/g, ' ');
  }
  if (config.normalizeUmlauts) {
    result = result.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }
  if (config.trimWhitespace) {
    result = result.replace(/\s+/g, ' ').trim();
  }
  return result;
};

// Compara dos textos normalizados y devuelve tokens individuales con resultado
// @param {string} original - texto de referencia
// @param {string} transcript - texto del usuario
// @returns {Array} [{ original, transcript, cleanOrig, cleanTrans, correct }]
window.Muller.LecturaHelpers.compareTokens = function(original, transcript) {
  if (!original || !transcript) return [];

  var origTokens = window.Muller.LecturaHelpers.tokenize(original).map(function(t) {
    return window.Muller.LecturaHelpers.normalize(t.word);
  }).filter(Boolean);

  var transTokens = window.Muller.LecturaHelpers.tokenize(transcript).map(function(t) {
    return window.Muller.LecturaHelpers.normalize(t.word);
  }).filter(Boolean);

  var result = [];
  var maxLen = Math.max(origTokens.length, transTokens.length);

  for (var i = 0; i < maxLen; i++) {
    var orig = origTokens[i] || '';
    var trans = transTokens[i] || '';
    var correct = orig === trans;
    result.push({
      index: i,
      original: orig,
      transcript: trans,
      correct: correct
    });
  }
  return result;
};

// Devuelve la cleanKey de una palabra (útil para lookup en diccionarios)
window.Muller.LecturaHelpers.cleanKey = function(word) {
  if (!word) return '';
  return window.Muller.LecturaHelpers.normalize(word, {
    lowercase: true,
    normalizeUmlauts: false,
    removePunctuation: true,
    trimWhitespace: true
  });
};