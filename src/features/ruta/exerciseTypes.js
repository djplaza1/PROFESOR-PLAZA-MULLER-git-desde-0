// exerciseTypes.js - 8 tipos de ejercicios base para la Ruta
// Cada función recibe datos de una palabra/frase y devuelve un objeto de ejercicio.

const EXERCISE_TYPES = {

  // 1. Completar hueco con la palabra correcta (opciones múltiples)
  fill(de, es, distractors) {
    const opts = distractors || [];
    return {
      type: "fill",
      prompt: `Completa: "___" significa "${es}".`,
      answer: de,
      options: [...opts, de].sort(function() { return Math.random() - 0.5; }),
      hint: "Es una palabra de nivel."
    };
  },

  // 2. Elegir la traducción correcta (entre 3 opciones)
  choose(de, es, distractors) {
    const opts = distractors || [];
    const options = [es, ...opts].sort(function() { return Math.random() - 0.5; });
    return {
      type: "choose",
      prompt: `¿Cuál es la traducción de "${de}"?`,
      answer: es,
      options: options,
      hint: "Mira bien las opciones."
    };
  },

  // 3. Formar el plural de un sustantivo (con opciones)
  plural(de, plural, distractors) {
    const opts = distractors || [];
    const options = [plural, ...opts].filter(Boolean).sort(function() { return Math.random() - 0.5; });
    return {
      type: "plural",
      prompt: `¿Cuál es el plural de "${de}"?`,
      answer: plural,
      options: options,
      hint: "Recuerda las reglas de plural."
    };
  },

  // 4. Traducir al alemán (frase o palabra)
  translateDE(es, de) {
    return {
      type: "translateDE",
      prompt: `Traduce al alemán: "${es}"`,
      answer: de,
      hint: "Empieza como se escribe en alemán."
    };
  },

  // 5. Traducir al español
  translateES(de, es) {
    return {
      type: "translateES",
      prompt: `Traduce al español: "${de}"`,
      answer: es,
      hint: "Pista: está relacionado con el tema."
    };
  },

  // 6. Conjugar un verbo (persona y tiempo dados)
  conjugate(infinitive, pronoun, tense, correctForm) {
    return {
      type: "conjugate",
      prompt: `Conjuga "${infinitive}" para "${pronoun}" en ${tense}.`,
      answer: correctForm,
      hint: `Recuerda la terminación para ${pronoun}.`
    };
  },

  // 7. Ordenar palabras para formar una frase
  order(scrambledWords, correctSentence) {
    return {
      type: "order",
      prompt: `Ordena estas palabras: ${scrambledWords.join(" ")}`,
      answer: correctSentence,
      hint: `La frase empieza con: "${scrambledWords[0]}"?`
    };
  },

  // 8. Corregir el error en una frase
  correct(wrongSentence, correctSentence) {
    return {
      type: "correct",
      prompt: `Corrige el error: "${wrongSentence}"`,
      answer: correctSentence,
      hint: "Hay un error gramatical."
    };
  }
};

// Exponer globalmente
window.ExerciseTypes = EXERCISE_TYPES;
