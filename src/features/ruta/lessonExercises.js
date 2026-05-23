window.LessonExercises = {
  getLesson: function(levelId, lessonIdx) {
    if (levelId === "A1.1" && lessonIdx === 0) {
      return {
        id: "A1.1-l1",
        title: "Leccion 1: Hallo! (Menschen A1.1)",
        exercises: [
          { type: "choose", prompt: "¿Cómo se dice 'hola' en alemán?", answer: "hallo", options: ["hallo","danke","bitte","ja"], translation: "Hola" },
          { type: "translateDE", prompt: "Traduce al alemán: 'Mi nombre es Anna.'", answer: "Mein Name ist Anna.", acceptableAnswers: ["Mein Name ist Anna.", "Ich heiße Anna."], translation: "Mi nombre es Anna." },
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
          { type: "translateDE", prompt: "Traduce al alemán: '¿Cuál es tu nombre?'", answer: "Wie ist dein Name?", acceptableAnswers: ["Wie ist dein Name?", "Wie heißen Sie?", "Wie heißt du?"], translation: "¿Cuál es tu nombre?" },
          { type: "pronounce", prompt: "Repite: \"Hallo, wie geht es dir?\"", phraseToPronounce: "Hallo, wie geht es dir?", answer: "Hallo, wie geht es dir?", translation: "Hola, ¿cómo estás?" }
        ],
        cumulativeReview: []
      };
    }
    if (levelId === "A1.1" && lessonIdx === 1) {
      return {
        id: "A1.1-l2",
        title: "Leccion 2: Familie (Menschen A1.1)",
        exercises: [
          { type: "choose", prompt: "¿Cómo se dice 'madre' en alemán?", answer: "Mutter", options: ["Mutter","Vater","Schwester","Bruder"], translation: "madre" },
          { type: "translateDE", prompt: "Traduce al alemán: 'Mi padre es alto.'", answer: "Mein Vater ist groß.", translation: "Mi padre es alto." },
          { type: "order", prompt: "Ordena: 'Meine Schwester heißt Laura.'", answer: "Meine Schwester heißt Laura", scrambledWords: ["Laura.","Meine","Schwester","heißt"], translation: "Mi hermana se llama Laura." },
          { type: "fillInSentence", prompt: "Completa (hermano): 'Mein ___ heißt Tim.'", answer: "Bruder", options: ["Bruder","Vater","Mann","Junge"], translation: "Mi hermano se llama Tim." },
          { type: "choose", prompt: "¿Qué significa 'Mädchen'?", answer: "chica", options: ["chica","chico","mujer","hombre"], translation: "chica" },
          { type: "declension", prompt: "El artículo de 'Mädchen' es:", answer: "das", options: ["der","die","das"], translation: "El artículo de 'Mädchen'" },
          { type: "pronounce", prompt: "Repite: \"Das Mädchen spielt.\"", phraseToPronounce: "Das Mädchen spielt.", answer: "Das Mädchen spielt.", translation: "La chica juega." },
          { type: "translateES", prompt: "Traduce al español: 'Der Junge liest ein Buch.'", answer: "El chico lee un libro.", translation: "El chico lee un libro." },
          { type: "fillInSentence", prompt: "Completa (mujer): 'Die ___ geht spazieren.'", answer: "Frau", options: ["Frau","Mädchen","Mutter","Schwester"], translation: "La mujer pasea." },
          { type: "choose", prompt: "¿Cómo se dice 'hombre' en alemán?", answer: "Mann", options: ["Mann","Junge","Vater","Bruder"], translation: "hombre" },
          { type: "order", prompt: "Ordena: 'Das Kind ist klein.'", answer: "Das Kind ist klein", scrambledWords: ["klein.","Das","Kind","ist"], translation: "El niño es pequeño." },
          { type: "translateDE", prompt: "Traduce al alemán: 'La casa es grande.'", answer: "Das Haus ist groß.", translation: "La casa es grande." },
          { type: "fillInSentence", prompt: "Completa (pequeño): 'Mein Zimmer ist ___.'", answer: "klein", options: ["klein","groß","alt","neu"], translation: "Mi habitación es pequeña." },
          { type: "pronounce", prompt: "Repite: \"Das Haus ist groß.\"", phraseToPronounce: "Das Haus ist groß.", answer: "Das Haus ist groß.", translation: "La casa es grande." },
          { type: "choose", prompt: "¿Qué significa 'groß'?", answer: "grande", options: ["grande","pequeño","viejo","nuevo"], translation: "grande" },
          { type: "translateES", prompt: "Traduce: 'Die Frau und der Mann haben ein Kind.'", answer: "La mujer y el hombre tienen un niño.", translation: "La mujer y el hombre tienen un niño." },
          { type: "fillInSentence", prompt: "Completa (familia): 'Meine ___ ist sehr nett.'", answer: "Familie", options: ["Familie","Mutter","Schwester","Frau"], translation: "Mi familia es muy amable." },
          { type: "order", prompt: "Ordena: 'Mein Bruder ist klein.'", answer: "Mein Bruder ist klein", scrambledWords: ["klein.","Mein","Bruder","ist"], translation: "Mi hermano es pequeño." },
          { type: "translateDE", prompt: "Traduce al alemán: 'El chico es pequeño.'", answer: "Der Junge ist klein.", translation: "El chico es pequeño." },
          { type: "pronounce", prompt: "Repite: \"Meine Mutter ist nett.\"", phraseToPronounce: "Meine Mutter ist nett.", answer: "Meine Mutter ist nett.", translation: "Mi madre es amable." }
        ],
        cumulativeReview: []
      };
    }
    return null;
  }
};
