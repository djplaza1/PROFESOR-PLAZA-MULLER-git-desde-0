window.LessonExercises = {
  getLesson: function(levelId, lessonIdx) {
    if (levelId === "A1.1" && lessonIdx === 0) {
      return {
        id: "A1.1-l1",
        title: "Lección 1: Hallo! (Menschen A1.1)",
        exercises: [
          { type: "choose", prompt: "¿Cómo se dice 'hola' en alemán?", answer: "hallo", options: ["hallo","danke","bitte","ja"], translation: "Hola" },
          { type: "translateDE", prompt: "Traduce al alemán: 'Mi nombre es Anna.'", answer: "Mein Name ist Anna.", acceptableAnswers: ["Mein Name ist Anna.", "Ich hei\u00DFe Anna."], translation: "Mi nombre es Anna." },
          { type: "order", prompt: "Ordena las palabras para formar la frase 'Mi nombre es Anna':", answer: "Mein Name ist Anna", scrambledWords: ["Anna","Mein","Name","ist"], translation: "Mi nombre es Anna" },
          { type: "fillInSentence", prompt: "Completa (bueno): 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut","schlecht","schön","alt"], translation: "La tarta sabe bien." },
          { type: "choose", prompt: "¿Qué significa 'schlecht'?", answer: "malo", options: ["malo","bueno","bonito","nuevo"], translation: "malo" },
          { type: "declension", prompt: "¿Cuál es el artículo de 'Name'?", answer: "der", options: ["der","die","das"], translation: "El artículo de 'Name'" },
          { type: "pronounce", prompt: "Repite: \"Mein Name ist Anna.\"", phraseToPronounce: "Mein Name ist Anna.", answer: "Mein Name ist Anna.", translation: "Mi nombre es Anna." },
          { type: "translateES", prompt: "Traduce al español: 'Danke für das Geschenk.'", answer: "Gracias por el regalo.", translation: "Gracias por el regalo." },
          { type: "fillInSentence", prompt: "Completa (malo): 'Das Wetter ist ___.'", answer: "schlecht", options: ["schlecht","gut","schön","neu"], translation: "El tiempo es malo." },
          { type: "choose", prompt: "¿Cómo se dice 'por favor' en alemán?", answer: "bitte", options: ["bitte","danke","hallo","nein"], translation: "por favor" },
          { type: "order", prompt: "Ordena: '¿Cuántos años tienes?'", answer: "Wie alt bist du?", scrambledWords: ["bist","Wie","alt","du?"], translation: "¿Cuántos años tienes?" },
          { type: "translateDE", prompt: "Traduce al alemán: 'El coche es nuevo.'", answer: "Das Auto ist neu.", translation: "El coche es nuevo." },
          { type: "fillInSentence", prompt: "Completa (bonito): 'Du hast ein ___ Kleid.'", answer: "schönes", options: ["schönes","schlecht","neu","alt"], translation: "Tienes un vestido bonito." },
          { type: "pronounce", prompt: "Repite: \"Der Tag ist schön.\"", phraseToPronounce: "Der Tag ist schön.", answer: "Der Tag ist schön.", translation: "El día es bonito." },
          { type: "choose", prompt: "¿Qué significa 'alt'?", answer: "viejo", options: ["viejo","nuevo","bonito","grande"], translation: "viejo" },
          { type: "translateES", prompt: "Traduce: 'Das Haus ist sehr alt.'", answer: "La casa es muy vieja.", translation: "La casa es muy vieja." },
          { type: "fillInSentence", prompt: "Completa (yo): '___ sage hallo zu meinem Freund.'", answer: "Ich", options: ["Ich","Du","Er","Sie"], translation: "Saludo a mi amigo." },
          { type: "order", prompt: "Ordena: '¿Saludas?'", answer: "Sagst du hallo?", scrambledWords: ["hallo?","Sagst","du"], translation: "¿Saludas?" },
          { type: "translateDE", prompt: "Traduce al alemán: '¿Cuál es tu nombre?'", answer: "Wie ist dein Name?", acceptableAnswers: ["Wie ist dein Name?", "Wie hei\u00DFen Sie?", "Wie hei\u00DFt du?"], translation: "¿Cuál es tu nombre?" },
          { type: "pronounce", prompt: "Repite: \"Hallo, wie geht es dir?\"", phraseToPronounce: "Hallo, wie geht es dir?", answer: "Hallo, wie geht es dir?", translation: "Hola, ¿cómo estás?" }
        ],
        cumulativeReview: []
      };
    }
    return null;
  }
};

