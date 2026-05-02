// src/features/lectura/helpers/pronunciation.jsx
// Consejos de pronunciación para alemán basados en la diferencia entre palabra esperada y detectada
window.Muller = window.Muller || {};
window.Muller.LecturaHelpers = window.Muller.LecturaHelpers || {};

// CONFIG
window.Muller.LecturaHelpers.PRONUNCIATION_CONFIG = {
  enabled: true,
  showPhoneticTips: true
};

// Reglas fonéticas comunes del alemán
var PHONETIC_RULES = [
  { pattern: /ch$/, tip: 'La "ch" al final suena como en "Bach" (fricativa velar) o "ich" (fricativa palatal) dependiendo de la vocal anterior.' },
  { pattern: /^sch/, tip: '"sch" se pronuncia como "sh" en inglés "ship".' },
  { pattern: /^sp/, tip: '"sp" se pronuncia "shp" al inicio de palabra (como en "sprechen").' },
  { pattern: /^st/, tip: '"st" se pronuncia "sht" al inicio de palabra (como en "Straße").' },
  { pattern: /ei/, tip: '"ei" se pronuncia como "ai" en "aislamiento" (ej: "Zeit" → "tsait").' },
  { pattern: /ie/, tip: '"ie" se pronuncia como "i" larga (ej: "Liebe" → "lii-be").' },
  { pattern: /eu/, tip: '"eu" se pronuncia como "oi" en "oigo" (ej: "Freund" → "froind").' },
  { pattern: /äu/, tip: '"äu" se pronuncia como "oi" igual que "eu" (ej: "Bäume" → "boi-me").' },
  { pattern: /ö/, tip: '"ö" es como una "e" con los labios redondeados. Sin equivalente exacto en español.' },
  { pattern: /ü/, tip: '"ü" es como una "i" con los labios redondeados. Sin equivalente exacto en español.' },
  { pattern: /ß/, tip: '"ß" se pronuncia como "s" fuerte o doble "s".' },
  { pattern: /z/, tip: '"z" se pronuncia como "ts" (ej: "Zeit" → "tsait").' },
  { pattern: /v/, tip: '"v" en alemán suena como "f" (ej: "Vogel" → "fo-gel").' },
  { pattern: /w/, tip: '"w" en alemán suena como "v" del español (ej: "Wasser" → "va-ser").' },
  { pattern: /j/, tip: '"j" en alemán suena como "y" del español (ej: "ja" → "ya").' },
  { pattern: /r/, tip: '"r" en alemán es gutural (de la garganta), no vibra como la "r" española.' },
  { pattern: /pf/, tip: '"pf" es un sonido difícil: primero "p" luego inmediatamente "f" sin vocal entre medio.' },
  { pattern: /qu/, tip: '"qu" se pronuncia "kv" (ej: "Quelle" → "kve-le").' },
  { pattern: /th/, tip: '"th" en alemán se pronuncia como "t" normal.' }
];

// Genera un consejo de pronunciación para una palabra específica
// @param {string} word - Palabra alemana
// @returns {string} Consejo o cadena vacía si no hay reglas aplicables
window.Muller.LecturaHelpers.tipForWord = function(word) {
  if (!word || typeof word !== 'string') return '';
  var lower = word.toLowerCase();
  var tips = [];

  PHONETIC_RULES.forEach(function(rule) {
    if (rule.pattern.test(lower)) {
      tips.push(rule.tip);
    }
  });

  // Consejos específicos para palabras comunes
  var commonTips = {
    'der': 'Artículo masculino. Se pronuncia "dea" (r suave).',
    'die': 'Artículo femenino o plural. Se pronuncia "dii".',
    'das': 'Artículo neutro. Se pronuncia "das" (a corta).',
    'und': 'Conjunción "y". Se pronuncia "unt".',
    'ist': 'Verbo "es". Se pronuncia "ist" (i corta).',
    'nicht': 'Negación. Se pronuncia "ni-cht".',
    'auch': '"también". Se pronuncia "au-gh" (como "haus").',
    'aber': '"pero". Se pronuncia "aa-ber".',
    'mit': '"con". Se pronuncia "mit".',
    'sich': 'Pronombre reflexivo. Se pronuncia "zich".'
  };

  if (commonTips[lower]) {
    tips.push(commonTips[lower]);
  }

  return tips.join(' ');
};

// Genera consejo específico para un error de pronunciación
// @param {string} expected - Palabra esperada
// @param {string} actual - Lo que dijo el usuario
// @returns {string} Consejo personalizado
window.Muller.LecturaHelpers.tipForMismatch = function(expected, actual) {
  if (!expected || !actual) return '';

  var e = expected.toLowerCase();
  var a = actual.toLowerCase();

  // Diferencia de longitud > 3 → probablemente palabra omitida o añadida
  if (Math.abs(e.length - a.length) > 3) {
    return 'Posible palabra omitida o extra. Revisa la ortografía de "' + expected + '".';
  }

  // Comparar caracteres comunes
  var shared = e.split('').filter(function(c) { return a.indexOf(c) !== -1; }).length;
  var similarity = e.length > 0 ? shared / Math.max(e.length, a.length) : 0;

  if (similarity > 0.7) {
    return 'Buena aproximación, pero verifica la pronunciación exacta: ' + window.Muller.LecturaHelpers.tipForWord(expected);
  } else {
    return 'Intenta de nuevo. Consejo: ' + window.Muller.LecturaHelpers.tipForWord(expected);
  }
};