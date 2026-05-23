window.LessonExercises = {
  getLesson: function(levelId, lessonIdx) {
    if (levelId === "A1.1" && lessonIdx === 0) {
      return {
        id: "A1.1-l1",
        title: "Leccion 1",
        exercises: [
          { type: "choose", prompt: "Como se dice 'hola' en aleman?", answer: "hallo", options: ["hallo","danke","bitte","ja"] },
          { type: "fillInSentence", prompt: "Completa: 'Mein ___ ist Anna.'", answer: "Name", options: ["Name","Tag","Buch","Tisch"] },
          { type: "order", prompt: "Ordena la frase:", answer: "Mein Name ist Anna", scrambledWords: ["Anna","Mein","Name","ist"] },
          { type: "translateDE", prompt: "Traduce al aleman: 'El dia esta soleado.'", answer: "Der Tag ist sonnig.", translation: "El dia esta soleado." },
          { type: "translateES", prompt: "Traduce al espanol: 'Danke fur das Geschenk.'", answer: "Gracias por el regalo.", translation: "Gracias por el regalo." },
          { type: "choose", prompt: "Que significa 'schlecht'?", answer: "malo", options: ["malo","bueno","bonito","nuevo"] },
          { type: "declension", prompt: "El articulo de 'Name' es:", answer: "der", options: ["der","die","das"] },
          { type: "fillInSentence", prompt: "Completa: 'Das Wetter ist ___.'", answer: "schlecht", options: ["schlecht","gut","schon","neu"] },
          { type: "order", prompt: "Ordena la frase:", answer: "Das Buch ist neu", scrambledWords: ["neu","Das","Buch","ist"] },
          { type: "translateDE", prompt: "Traduce al aleman: 'Cuantos anos tienes?'", answer: "Wie alt bist du?", translation: "Cuantos anos tienes?" },
          { type: "choose", prompt: "Como se dice 'por favor'?", answer: "bitte", options: ["bitte","danke","hallo","nein"] },
          { type: "fillInSentence", prompt: "Completa: 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut","schlecht","schon","alt"] },
          { type: "order", prompt: "Ordena la frase:", answer: "Wie alt bist du", scrambledWords: ["bist","Wie","alt","du"] },
          { type: "pronounce", prompt: "Repite la frase en aleman:", phraseToPronounce: "Mein Name ist Anna.", answer: "Mein Name ist Anna." },
          { type: "translateES", prompt: "Traduce al espanol: 'Das Auto ist neu.'", answer: "El coche es nuevo.", translation: "El coche es nuevo." },
          { type: "choose", prompt: "Que significa 'alt'?", answer: "viejo", options: ["viejo","nuevo","bonito","grande"] },
          { type: "fillInSentence", prompt: "Completa: 'Du hast ein ___ Kleid.'", answer: "schones", options: ["schones","schlecht","neu","alt"] },
          { type: "order", prompt: "Ordena la frase:", answer: "Sagst du hallo?", scrambledWords: ["hallo?","Sagst","du"] },
          { type: "translateDE", prompt: "Traduce al aleman: 'El coche es nuevo.'", answer: "Das Auto ist neu.", translation: "El coche es nuevo." },
          { type: "pronounce", prompt: "Repite:", phraseToPronounce: "Der Tag ist schon.", answer: "Der Tag ist schon." }
        ],
        cumulativeReview: []
      };
    }
    return null;
  }
};
