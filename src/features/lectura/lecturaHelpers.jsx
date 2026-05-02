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