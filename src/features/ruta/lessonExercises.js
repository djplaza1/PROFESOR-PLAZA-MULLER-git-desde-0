window.LessonExercises = {
  getLesson: function(levelId, lessonIdx) {
    if (levelId === "A1.1" && lessonIdx === 0) {
      return {
        id: "A1.1-l1",
        title: "Leccion 1: Hallo! (Menschen A1.1)",
        exercises: [
          { type: "choose", prompt: "Wie sagt man 'hola' auf Deutsch?", answer: "hallo", options: ["hallo","danke","bitte","ja"], hint: "Saludo informal", translation: "¿Cómo se dice 'hola' en alemán?" },
          { type: "translateDE", prompt: "Traduce al aleman: 'Mi nombre es Anna.'", answer: "Mein Name ist Anna.", translation: "Mi nombre es Anna." },
          { type: "order", prompt: "Bringe die Worter in die richtige Reihenfolge (Pon las palabras en orden):", answer: "Mein Name ist Anna", scrambledWords: ["Anna","Mein","Name","ist"], translation: "Mi nombre es Anna" },
          { type: "fillInSentence", prompt: "Erganze (Completa con 'gut'): 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut","schlecht","schon","alt"], translation: "La tarta sabe bien." },
          { type: "choose", prompt: "Was bedeutet 'schlecht' auf Spanisch?", answer: "malo", options: ["malo","bueno","bonito","nuevo"], translation: "¿Qué significa 'schlecht' en español?" },
          { type: "declension", prompt: "Der Artikel von 'Name' ist:", answer: "der", options: ["der","die","das"], translation: "El artículo de 'Name' es:" },
          { type: "pronounce", prompt: "Sprich den Satz nach (Repite la frase):", phraseToPronounce: "Mein Name ist Anna.", answer: "Mein Name ist Anna.", translation: "Mi nombre es Anna." },
          { type: "translateES", prompt: "Traduce al espanol: 'Danke fur das Geschenk.'", answer: "Gracias por el regalo.", translation: "Gracias por el regalo." },
          { type: "fillInSentence", prompt: "Erganze (Completa con 'schlecht'): 'Das Wetter ist ___.'", answer: "schlecht", options: ["schlecht","gut","schon","neu"], translation: "El tiempo es malo." },
          { type: "choose", prompt: "Wie sagt man 'por favor' auf Deutsch?", answer: "bitte", options: ["bitte","danke","hallo","nein"], translation: "¿Cómo se dice 'por favor' en alemán?" },
          { type: "order", prompt: "Bringe die Worter in die richtige Reihenfolge:", answer: "Wie alt bist du?", scrambledWords: ["bist","Wie","alt","du?"], translation: "¿Cuántos años tienes?" },
          { type: "translateDE", prompt: "Traduce al aleman: 'El coche es nuevo.'", answer: "Das Auto ist neu.", translation: "El coche es nuevo." },
          { type: "fillInSentence", prompt: "Erganze (Completa con 'schon'): 'Du hast ein ___ Kleid.'", answer: "schones", options: ["schones","schlecht","neu","alt"], translation: "Tienes un vestido bonito." },
          { type: "pronounce", prompt: "Sprich den Satz nach:", phraseToPronounce: "Der Tag ist schon.", answer: "Der Tag ist schon.", translation: "El día es bonito." },
          { type: "choose", prompt: "Was bedeutet 'alt' auf Spanisch?", answer: "viejo", options: ["viejo","nuevo","bonito","grande"], translation: "¿Qué significa 'alt' en español?" },
          { type: "translateES", prompt: "Traduce al espanol: 'Das Haus ist sehr alt.'", answer: "La casa es muy vieja.", translation: "La casa es muy vieja." },
          { type: "fillInSentence", prompt: "Erganze (Completa con la palabra adecuada): '___ sage hallo zu meinem Freund.'", answer: "Ich", options: ["Ich","Du","Er","Sie"], translation: "Saludo a mi amigo." },
          { type: "order", prompt: "Bringe die Worter in die richtige Reihenfolge:", answer: "Sagst du hallo?", scrambledWords: ["hallo?","Sagst","du"], translation: "¿Saludas?" },
          { type: "translateDE", prompt: "Traduce al aleman: '¿Cuál es tu nombre?'", answer: "Wie ist dein Name?", translation: "¿Cuál es tu nombre?" },
          { type: "pronounce", prompt: "Sprich den Satz nach:", phraseToPronounce: "Hallo, wie geht es dir?", answer: "Hallo, wie geht es dir?", translation: "Hola, ¿cómo estás?" }
        ],
        cumulativeReview: []
      };
    }
    return null;
  }
};
