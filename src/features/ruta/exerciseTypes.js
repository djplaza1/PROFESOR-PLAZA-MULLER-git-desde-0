export const exerciseTypes = {
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

  articleChoice(targetCase, newPhrase, correctArticle, optionsArr) {
    const options = [...optionsArr].sort(() => Math.random() - 0.5);
    return {
      type: 'articleChoice',
      prompt: Elige el artículo correcto para caso :\n"",
      answer: correctArticle,
      options,
      hint: ""
    };
  }
};
