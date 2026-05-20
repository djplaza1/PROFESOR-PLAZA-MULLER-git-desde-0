// exerciseTypes.js – 8+ tipos de ejercicios premium
const EXERCISE_TYPES = {

  fill(de, es, distractors) {
    const opts = distractors || [];
    return {
      type: 'fill',
      prompt: `Completa: "___" significa "${es}".`,
      answer: de,
      options: [...opts, de].sort(() => Math.random() - 0.5),
      hint: ""
    };
  },

  choose(de, es, distractors) {
    const opts = distractors || [];
    const options = [es, ...opts].sort(() => Math.random() - 0.5);
    return { type: 'choose', prompt: `¿Cuál es la traducción de "${de}"?`, answer: es, options, hint: ""
  },

  plural(de, plural, distractors) {
    const opts = distractors || [];
    const options = [plural, ...opts].filter(Boolean).sort(() => Math.random() - 0.5);
    return { type: 'plural', prompt: `¿Cuál es el plural de "${de}"?`, answer: plural, options, hint: ""
  },

  translateDE(es, de) {
    return { type: 'translateDE', prompt: `Traduce al alemán: "${es}"`, answer: de, hint: ""
  },

  translateES(de, es) {
    return { type: 'translateES', prompt: `Traduce al español: "${de}"`, answer: es, hint: ""
  },

  conjugate(infinitive, pronoun, tense, correctForm) {
    return {
      type: 'conjugate',
      prompt: `Conjuga "${infinitive}" para "${pronoun}" en ${tense}.`,
      answer: correctForm,
      hint: ""
    };
  },

  order(scrambledWords, correctSentence) {
    return {
      type: 'order',
      prompt: `Ordena estas palabras: ${scrambledWords.join(' ')}`,
      answer: correctSentence,
      hint: ""
    };
  },

  correct(wrongSentence, correctSentence) {
    return { type: 'correct', prompt: `Corrige el error: "${wrongSentence}"`, answer: correctSentence, hint: ""
  },

  // NUEVO: completar hueco en frase, se indica en español la palabra que falta
  fillInSentence(sentenceWithBlank, missingWordDe, missingWordEs, distractors) {
    const opts = distractors || [];
    return {
      type: 'fillInSentence',
      prompt: `Completa la frase. Falta la palabra "${missingWordEs}":\n"${sentenceWithBlank}"`,
      answer: missingWordDe,
      options: [...opts, missingWordDe].sort(() => Math.random() - 0.5),
      hint: ""
    };
  },

  // NUEVO: verbo separable (prefijo al final)
  separableVerb(sentencePrefix, separablePrefix, infinitive) {
    return {
      type: 'separableVerb',
      prompt: `Completa con el prefijo separable del verbo "${infinitive}":\n"${sentencePrefix} ___"`,
      answer: separablePrefix,
      hint: ""
    };
  },

    // NUEVO: declinaci�n de adjetivos (adjectiveDeclension)
  adjectiveDeclension(adjClean, caseLabel, contextPhrase, correctEnding, allOptions) {
    const options = [...allOptions].sort(() => Math.random() - 0.5);
    return {
      type: 'adjectiveDeclension',
      prompt: Completa el adjetivo '' en caso :\n"",
      answer: correctEnding,
      options,
      hint: ""
    };
  },

    // NUEVO: declinaci�n de adjetivos (adjectiveDeclension)
  adjectiveDeclension(adjClean, caseLabel, contextPhrase, correctEnding, allOptions) {
    const options = [...allOptions].sort(() => Math.random() - 0.5);
    return {
      type: 'adjectiveDeclension',
      prompt: Completa el adjetivo '' en caso :\n"",
      answer: correctEnding,
      options,
      hint: ""
    };
  },

  // NUEVO: elegir artículo según caso (articleChoice)
  articleChoice(targetCase, newPhrase, correctArticle, optionsArr) {
    const options = [...optionsArr].sort(() => Math.random() - 0.5);
    return {
      type: 'articleChoice',
      prompt: `Elige el artículo correcto para caso ${targetCase.toUpperCase()}:\n"${newPhrase}"`,
      answer: correctArticle,
      options,
      hint: ""
    };
  },

  // NUEVO: ordenar palabras interactivo (order)
  orderInteractive(scrambledWords, correctSentence) {
    return {
      type: 'order',
      prompt: `Toca las palabras en el orden correcto para formar la frase:`,
      answer: correctSentence,
      scrambledWords: [...scrambledWords].sort(() => Math.random() - 0.5),
      hint: ""
    };
  }
};

window.ExerciseTypes = EXERCISE_TYPES;


