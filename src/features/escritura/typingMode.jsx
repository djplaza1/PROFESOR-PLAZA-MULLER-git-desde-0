// src/features/escritura/typingMode.jsx
// Modo 9: Mecanografía (teclado con precisión alemana) + limpieza de texto personalizado
window.Muller = window.Muller || {};
window.Muller.Escritura = window.Muller.Escritura || {};

const E = window.Muller.Escritura;

E.TYPING_TEXTS = [
  { de: "Guten Morgen", es: "Buenos días", wpmTarget: 30 },
  { de: "Der Hund spielt im Garten.", es: "El perro juega en el jardín.", wpmTarget: 40 },
  { de: "Ich trinke gerne Kaffee mit Milch und Zucker.", es: "Me gusta beber café con leche y azúcar.", wpmTarget: 50 },
  { de: "Die Sonne scheint hell auf die grünen Wiesen der Alpen.", es: "El sol brilla intensamente sobre los prados verdes de los Alpes.", wpmTarget: 60 },
  { de: "Übung macht den Meister, und Fehler sind unsere besten Lehrer.", es: "La práctica hace al maestro, y los errores son nuestros mejores profesores.", wpmTarget: 65 },
  { de: "Wenn ich Zeit hätte, würde ich mehr deutsche Literatur lesen.", es: "Si tuviera tiempo, leería más literatura alemana.", wpmTarget: 70 },
  { de: "Gestern habe ich einen wunderbaren Apfelkuchen gebacken.", es: "Ayer horneé una maravillosa tarta de manzana.", wpmTarget: 75 },
  { de: "Das schöne Mädchen lächelt, während es über die Brücke geht.", es: "La hermosa muchacha sonríe mientras cruza el puente.", wpmTarget: 80 },
  { de: "Mein Bruder fährt jeden Morgen mit dem Fahrrad zur Schule, obwohl es oft regnet.", es: "Mi hermano va cada mañana en bicicleta a la escuela, aunque a menudo llueve.", wpmTarget: 85 },
  { de: "In der Bibliothek lesen die Studenten alte Bücher über Philosophie und Geschichte.", es: "En la biblioteca los estudiantes leen libros antiguos sobre filosofía e historia.", wpmTarget: 90 }
];

// ─── Limpieza y extracción de vocabulario ───
function parseCustomText(raw) {
  // Normalizar a NFC para manejar diéresis y ß
  const normalizedRaw = raw.normalize ? raw.normalize('NFC') : raw;
  const lines = normalizedRaw.split(/\r?\n/).filter(l => l.trim().length > 0);
  const cleanLines = [];
  const vocabMap = new Map();
  const lineVocab = [];

  for (let line of lines) {
    const bracketRegex = /\[([^\]]+)\]/g;
    const matches = [...line.matchAll(bracketRegex)];
    const vocabWords = [];

    let cleanLine = line;
    for (const m of matches) {
      const content = m[1].trim();
      cleanLine = cleanLine.replace(m[0], '');
      if (content === 'R') continue;
      const parts = content.split(/\s*,\s*/);
      for (const part of parts) {
        const dashIdx = part.indexOf(' - ');
        if (dashIdx > 0) {
          const deWord = part.substring(0, dashIdx).trim();
          const esTrans = part.substring(dashIdx + 3).trim();
          if (deWord) {
            vocabMap.set(deWord, esTrans);
            vocabWords.push(deWord);
          }
        }
      }
    }

    cleanLine = cleanLine.replace(/;\s*$/, '').trim();
    cleanLine = cleanLine.replace(/\bNützlich\.?\s*/gi, '').trim();
    cleanLine = cleanLine.replace(/\s{2,}/g, ' ').trim();

    if (cleanLine.length > 0) {
      const highlights = [];
      for (const word of vocabWords) {
        // Escapar caracteres especiales regex, pero no las letras normales
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'giu'); // 'u' para Unicode completo
        let m;
        while ((m = regex.exec(cleanLine)) !== null) {
          highlights.push({ word, start: m.index, end: m.index + word.length });
        }
      }
      cleanLines.push(cleanLine);
      lineVocab.push(highlights);
    }
  }

  return { cleanLines, vocabMap, lineVocab };
}

E.buildTypingPool = (customText) => {
  if (customText && customText.trim().length > 0) {
    const { cleanLines, vocabMap, lineVocab } = parseCustomText(customText);
    return cleanLines.map((clean, idx) => ({
      text: clean,
      vocabHighlights: lineVocab[idx] || [],
      vocabMap: vocabMap
    }));
  }
  return E.TYPING_TEXTS.map(t => ({
    text: t.de,
    vocabHighlights: [],
    vocabMap: new Map()
  }));
};

E.getTypingText = (pool, idx) => {
  const item = pool[idx % pool.length];
  return item ? item.text : '';
};

E.analyzeTyping = (input, target) => {
  if (!target) return { wpm: 0, accuracy: 0, errors: [], durationMs: 0 };
  const words = target.split(/\s+/).length;
  const targetClean = target.replace(/\s+/g, '');
  const inputClean = input.replace(/\s+/g, '');
  let correct = 0;
  const errorMap = {};
  for (let i = 0; i < Math.max(targetClean.length, inputClean.length); i++) {
    const t = targetClean[i] || '';
    const u = inputClean[i] || '';
    if (t === u) correct++;
    else { const key = t || '(falta)'; errorMap[key] = (errorMap[key] || 0) + 1; }
  }
  const accuracy = targetClean.length > 0 ? Math.round((correct / targetClean.length) * 100) : 0;
  const errors = Object.entries(errorMap).map(([k, v]) => ({ letter: k, count: v })).sort((a, b) => b.count - a.count);
  return { wpm: 0, accuracy, errors, targetWords: words };
};
