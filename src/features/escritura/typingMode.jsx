// src/features/escritura/typingMode.jsx
// Modo 9: Mecanografía (teclado con precisión alemana)
window.Muller = window.Muller || {};
window.Muller.Escritura = window.Muller.Escritura || {};

const E = window.Muller.Escritura;

// Textos base para mecanografía (escalonados por dificultad)
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

// Generar pool desde texto pegado (sin límite, se usa completo)
E.buildTypingPool = (customText) => {
  if (customText && customText.trim().length > 0) {
    const lines = customText.split(/\n+/).filter(l => l.trim().length > 0);
    return lines.length > 0 ? lines : [customText.trim()];
  }
  return E.TYPING_TEXTS.map(t => t.de);
};

// Obtener texto por índice (circular)
E.getTypingText = (pool, idx) => pool[idx % pool.length];

// Analizar resultado de mecanografía: devuelve WPM, precisión, errores por letra
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
