// src/features/escritura/typingMode.jsx
// Modo 9: Mecanograf�a (teclado con precisi�n alemana) + limpieza de texto personalizado
window.Muller = window.Muller || {};
window.Muller.Escritura = window.Muller.Escritura || {};

const E = window.Muller.Escritura;

// Textos base para mecanograf�a (escalonados por dificultad)
E.TYPING_TEXTS = [
  { de: "Guten Morgen", es: "Buenos d�as", wpmTarget: 30 },
  { de: "Der Hund spielt im Garten.", es: "El perro juega en el jard�n.", wpmTarget: 40 },
  { de: "Ich trinke gerne Kaffee mit Milch und Zucker.", es: "Me gusta beber caf� con leche y az�car.", wpmTarget: 50 },
  { de: "Die Sonne scheint hell auf die gr�nen Wiesen der Alpen.", es: "El sol brilla intensamente sobre los prados verdes de los Alpes.", wpmTarget: 60 },
  { de: "�bung macht den Meister, und Fehler sind unsere besten Lehrer.", es: "La pr�ctica hace al maestro, y los errores son nuestros mejores profesores.", wpmTarget: 65 },
  { de: "Wenn ich Zeit h�tte, w�rde ich mehr deutsche Literatur lesen.", es: "Si tuviera tiempo, leer�a m�s literatura alemana.", wpmTarget: 70 },
  { de: "Gestern habe ich einen wunderbaren Apfelkuchen gebacken.", es: "Ayer horne� una maravillosa tarta de manzana.", wpmTarget: 75 },
  { de: "Das sch�ne M�dchen l�chelt, w�hrend es �ber die Br�cke geht.", es: "La hermosa muchacha sonr�e mientras cruza el puente.", wpmTarget: 80 },
  { de: "Mein Bruder f�hrt jeden Morgen mit dem Fahrrad zur Schule, obwohl es oft regnet.", es: "Mi hermano va cada ma�ana en bicicleta a la escuela, aunque a menudo llueve.", wpmTarget: 85 },
  { de: "In der Bibliothek lesen die Studenten alte B�cher �ber Philosophie und Geschichte.", es: "En la biblioteca los estudiantes leen libros antiguos sobre filosof�a e historia.", wpmTarget: 90 }
];

// --- Limpieza y extracci�n de vocabulario ---
// Recibe texto crudo (el que pega el usuario). Devuelve:
// - cleanLines: array de strings limpios (sin [R], sin corchetes, sin punto y coma final)
// - vocabMap: Map donde clave = palabra alemana, valor = traducci�n (extra�dos de los corchetes)
// - lineVocab: array por l�nea con las palabras alemanas que aparecen en esa l�nea (para subrayar)
function parseCustomText(raw) {
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
  const cleanLines = [];
  const vocabMap = new Map();
  const lineVocab = []; // array de arrays: [[{ word, start, end }], ...]

  const vocabRegex = /\[([^\]]+)\]/g;

  for (let line of lines) {
    // Extraer todos los corchetes
    const matches = [...line.matchAll(vocabRegex)];
    let cleanLine = line;
    // Eliminar palabras de marca como "Nützlich." seguidas de corchetes
    cleanLine = cleanLine.replace(/\bNützlich\.?\s*(?=\[)/gi, '');
    const vocabInLine = [];

    for (const m of matches) {
      const bracketContent = m[1].trim();
      cleanLine = cleanLine.replace(m[0], ''); // eliminar el corchete entero

      // Ignorar si es solo "R"
      if (bracketContent === 'R') continue;

      // Parsear el contenido del corchete: puede ser "palabra - traducci�n" o "palabra1 - trad1, palabra2 - trad2"
      const parts = bracketContent.split(/\s*,\s*/);
      for (const part of parts) {
        const dashIdx = part.indexOf(' - ');
        if (dashIdx > 0) {
          const deWord = part.substring(0, dashIdx).trim();
          const esTrans = part.substring(dashIdx + 3).trim();
          if (deWord) {
            vocabMap.set(deWord, esTrans);
            // Ver si la palabra aparece en la l�nea limpia final (despu�s de quitar corchetes)
            if (cleanLine.includes(deWord)) {
              const start = cleanLine.indexOf(deWord);
              const end = start + deWord.length;
              vocabInLine.push({ word: deWord, start, end });
            }
          }
        }
      }
    }

    // Quitar el punto y coma final si lo hay y cualquier "[R]" residual
    cleanLine = cleanLine.replace(/\s*\[R\]\s*\.;?/g, '');
    cleanLine = cleanLine.replace(/;\s*$/, '').trim();
    // Quitar espacios dobles
    cleanLine = cleanLine.replace(/\s{2,}/g, ' ').trim();

    if (cleanLine.length > 0) {
      cleanLines.push(cleanLine);
      lineVocab.push(vocabInLine);
    }
  }

  return { cleanLines, vocabMap, lineVocab };
}

// Construir pool para typing a partir de texto pegado (objetos con texto limpio y highlights)
E.buildTypingPool = (customText) => {
  if (customText && customText.trim().length > 0) {
    const { cleanLines, vocabMap, lineVocab } = parseCustomText(customText);
    return cleanLines.map((clean, idx) => ({
      text: clean,
      vocabHighlights: lineVocab[idx] || [],
      vocabMap: vocabMap // lo pasamos completo para el panel lateral
    }));
  }
  // Si no hay customText, usamos los textos base (sin highlights)
  return E.TYPING_TEXTS.map(t => ({
    text: t.de,
    vocabHighlights: [],
    vocabMap: new Map()
  }));
};

// Obtener el texto actual (limpio)
E.getTypingText = (pool, idx) => {
  const item = pool[idx % pool.length];
  return item ? item.text : '';
};

// Analizar resultado de mecanograf�a (sin cambios)
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
    else {
      const key = t || '(falta)';
      errorMap[key] = (errorMap[key] || 0) + 1;
    }
  }
  const accuracy = targetClean.length > 0 ? Math.round((correct / targetClean.length) * 100) : 0;
  const errors = Object.entries(errorMap).map(([k, v]) => ({ letter: k, count: v })).sort((a, b) => b.count - a.count);
  return { wpm: 0, accuracy, errors, targetWords: words };
};

const text = $testText;
const result = window.Muller.Escritura.buildTypingPool(text);
console.log(JSON.stringify(result.slice(0,2), null, 2));
