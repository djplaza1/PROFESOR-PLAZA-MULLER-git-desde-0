// src/features/escritura/handwriteMode.jsx
// Modo 10: Manuscrito guiado (bolígrafo óptico / tableta)
window.Muller = window.Muller || {};
window.Muller.Escritura = window.Muller.Escritura || {};

const E = window.Muller.Escritura;

E.HANDWRITE_TEXTS = [
  { de: "Äpfel und Öl", es: "Manzanas y aceite", difficulty: 1 },
  { de: "Der Bär schläft im Wald.", es: "El oso duerme en el bosque.", difficulty: 2 },
  { de: "Die Straße führt über eine kleine Brücke.", es: "La calle cruza un pequeño puente.", difficulty: 3 },
  { de: "Übermorgen besuche ich meine Großeltern in München.", es: "Pasado mañana visito a mis abuelos en Múnich.", difficulty: 4 },
  { de: "Trotz des schlechten Wetters gingen wir spazieren.", es: "A pesar del mal tiempo, salimos a pasear.", difficulty: 5 }
];

E.buildHandwritePool = (customText) => {
  if (customText && customText.trim().length > 0) {
    const lines = customText.split(/\r?\n/).filter(l => l.trim().length > 0);
    return lines.map(l => ({ de: l, es: '', difficulty: 0 }));
  }
  return E.HANDWRITE_TEXTS;
};

E.calcOcrSimilarity = (ocrText, original) => {
  if (!ocrText || !original) return 0;
  const a = ocrText.trim().toLowerCase().replace(/\s+/g, ' ');
  const b = original.trim().toLowerCase().replace(/\s+/g, ' ');
  if (a === b) return 100;
  const aWords = a.split(' ');
  const bWords = b.split(' ');
  let matches = 0;
  for (let i = 0; i < Math.max(aWords.length, bWords.length); i++) {
    if (aWords[i] && bWords[i] && aWords[i] === bWords[i]) matches++;
  }
  return Math.round((matches / Math.max(aWords.length, bWords.length)) * 100);
};
