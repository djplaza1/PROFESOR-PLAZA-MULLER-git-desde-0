window.exerciseTypes = {
  adjectiveDeclension: function(adjClean, caseLabel, contextPhrase, correctEnding, allOptions) {
    var options = allOptions.slice().sort(function() { return Math.random() - 0.5; });
    return {
      type: "adjectiveDeclension",
      prompt: "Completa el adjetivo " + adjClean + " en caso " + caseLabel + ": " + contextPhrase,
      answer: correctEnding,
      options: options,
      hint: ""
    };
  },

  articleChoice: function(targetCase, newPhrase, correctArticle, optionsArr) {
    var options = optionsArr.slice().sort(function() { return Math.random() - 0.5; });
    return {
      type: "articleChoice",
      prompt: "Elige el artículo correcto para caso " + targetCase.toUpperCase() + ": " + newPhrase,
      answer: correctArticle,
      options: options,
      hint: ""
    };
  }
};
