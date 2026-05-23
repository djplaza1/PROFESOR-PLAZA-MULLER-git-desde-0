window.LessonExercises = {
  getLesson: function(levelId, lessonIdx) {
    (?s)(if \(levelId === "A1\.1" && lessonIdx === 0\) \{.*?\n    \})
    if (levelId === "A1.1" && lessonIdx === 1) {
      return {
        id: "A1.1-l2",
        title: "Leccion 2: Familie (Menschen A1.1)",
        exercises: [
          { type: "choose", prompt: "¿Cómo se dice 'madre' en alemán?", answer: "Mutter", options: ["Mutter", "Vater", "Schwester", "Bruder"], translation: "madre" },
          { type: "translateDE", prompt: "Traduce al alemán: 'Mi padre es alto.'", answer: "Mein Vater ist groß.", translation: "Mi padre es alto." },
          { type: "order", prompt: "Ordena: 'Mi hermana es pequeña.'", answer: "Meine Schwester ist klein.", scrambledWords: ["klein.", "Meine", "Schwester", "ist"], translation: "Mi hermana es pequeña." },
          { type: "fillInSentence", prompt: "Completa (hermano): 'Mein ___ heißt Lukas.'", answer: "Bruder", options: ["Bruder", "Schwester", "Mutter", "Vater"], translation: "Mi hermano se llama Lukas." },
          { type: "choose", prompt: "¿Qué significa 'Mädchen'?", answer: "chica", options: ["chica", "chico", "mujer", "hombre"], translation: "chica" },
          { type: "declension", prompt: "¿Cuál es el artículo de 'Junge'?", answer: "der", options: ["der", "die", "das"], translation: "El artículo de 'Junge'" },
          { type: "pronounce", prompt: "Repite: \"Meine Mutter ist freundlich.\"", phraseToPronounce: "Meine Mutter ist freundlich.", answer: "Meine Mutter ist freundlich.", translation: "Mi madre es amable." },
          { type: "translateES", prompt: "Traduce al español: 'Das Kind spielt im Haus.'", answer: "El niño juega en la casa.", translation: "El niño juega en la casa." },
          { type: "fillInSentence", prompt: "Completa (mujer): 'Die ___ arbeitet viel.'", answer: "Frau", options: ["Frau", "Mann", "Kind", "Junge"], translation: "La mujer trabaja mucho." },
          { type: "choose", prompt: "¿Cómo se dice 'grande' en alemán?", answer: "groß", options: ["groß", "klein", "alt", "neu"], translation: "grande" },
          { type: "order", prompt: "Ordena: 'La casa es grande.'", answer: "Das Haus ist groß.", scrambledWords: ["groß.", "Das", "Haus", "ist"], translation: "La casa es grande." },
          { type: "translateDE", prompt: "Traduce al alemán: 'El hombre es pequeño.'", answer: "Der Mann ist klein.", acceptableAnswers: ["Der Mann ist klein.", "Der Mann ist nicht groß."], translation: "El hombre es pequeño." },
          { type: "fillInSentence", prompt: "Completa (casa): 'Das ___ ist sehr alt.'", answer: "Haus", options: ["Haus", "Buch", "Tisch", "Stuhl"], translation: "La casa es muy vieja." },
          { type: "pronounce", prompt: "Repite: \"Das Kind ist sehr klein.\"", phraseToPronounce: "Das Kind ist sehr klein.", answer: "Das Kind ist sehr klein.", translation: "El niño es muy pequeño." },
          { type: "choose", prompt: "¿Qué significa 'Bruder'?", answer: "hermano", options: ["hermano", "hermana", "padre", "madre"], translation: "hermano" },
          { type: "translateES", prompt: "Traduce al español: 'Der Vater liest ein Buch.'", answer: "El padre lee un libro.", translation: "El padre lee un libro." },
          { type: "fillInSentence", prompt: "Completa (niño): 'Das ___ spielt draußen.'", answer: "Kind", options: ["Kind", "Junge", "Mädchen", "Frau"], translation: "El niño juega fuera." },
          { type: "translateDE", prompt: "Traduce al alemán: 'La chica es mi hermana.'", answer: "Das Mädchen ist meine Schwester.", acceptableAnswers: ["Das Mädchen ist meine Schwester.", "Die Kleine ist meine Schwester."], translation: "La chica es mi hermana." },
          { type: "order", prompt: "Ordena: 'Mi hermano es grande.'", answer: "Mein Bruder ist groß.", scrambledWords: ["groß.", "Mein", "Bruder", "ist"], translation: "Mi hermano es grande." },
          { type: "pronounce", prompt: "Repite: \"Der Vater ist streng.\"", phraseToPronounce: "Der Vater ist streng.", answer: "Der Vater ist streng.", translation: "El padre es estricto." }
        ],
        cumulativeReview: (function() {
          if (!window.SRSHelpers) return [];
          const progress = window.SRSHelpers.loadProgress();
          const dueWords = window.SRSHelpers.getWordsToReview(progress, "A1.1", 5);
          return dueWords.map(dw => {
            const wordData = [dw.word, "", "", "", ""];
            return { type: "translateDE", prompt: "Repaso: traduce '" + dw.word + "'", answer: dw.word, word: wordData, isReview: true };
          });
        })()
      };
    }
    return null;
  }
};


