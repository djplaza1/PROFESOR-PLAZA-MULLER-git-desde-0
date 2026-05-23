const PodcastA1_1 = [];

// LECCIÓN 1: La búsqueda de empleo (Mapeado con las 11 palabras reales)
PodcastA1_1[0] = {
  title: "Lektion 1: Hallo!",
  segments: [
    {
      audioText: "Hallo! Ich bin Anna. Mein Name ist Anna. Wie ist dein Name?",
      exercises: [
        { type: "choose", prompt: "Was bedeutet 'Name'?", answer: "nombre", options: ["nombre", "día", "casa", "hola"] },
        { type: "fillInSentence", prompt: "Completa (nombre): 'Mein ___ ist Anna.'", answer: "Name", options: ["Name", "Tag", "Haus", "Buch"] }
      ]
    },
    {
      audioText: "Danke für das Geschenk. Bitte sehr, hier ist Ihr Kaffee.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Danke für das Geschenk.'", answer: "Danke für das Geschenk", scrambledWords: ["Geschenk.", "Danke", "für", "das"] },
        { type: "translateES", prompt: "Traduce al español: 'Bitte sehr, hier ist Ihr Kaffee.'", answer: "Aquí tiene su café, por favor." }
      ]
    },
    {
      audioText: "Ja, ich komme mit. Nein, das stimmt nicht. Sagst du ja oder nein?",
      exercises: [
        { type: "choose", prompt: "Was bedeutet 'ja'?", answer: "sí", options: ["sí", "no", "gracias", "por favor"] },
        { type: "fillInSentence", prompt: "Completa (no): 'Nein, das stimmt ___.'", answer: "nicht", options: ["nicht", "ja", "gut", "schön"] }
      ]
    },
    {
      audioText: "Der Kuchen schmeckt gut. Das Wetter ist schlecht.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (bueno): 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut", "schlecht", "schön", "alt"] },
        { type: "choose", prompt: "Was bedeutet 'schlecht'?", answer: "malo", options: ["malo", "bueno", "bonito", "nuevo"] }
      ]
    },
    {
      audioText: "Der Tag ist schön. Das Auto ist neu. Das Haus ist sehr alt.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Der Tag ist schön.'", answer: "Der Tag ist schön", scrambledWords: ["schön.", "Der", "Tag", "ist"] },
        { type: "translateDE", prompt: "Traduce al alemán: 'El coche es nuevo.'", answer: "Das Auto ist neu." }
      ]
    },
    {
      audioText: "Wie alt bist du? Mein Opa ist neunzig Jahre alt.",
      exercises: [
        { type: "choose", prompt: "Was bedeutet 'alt'?", answer: "viejo", options: ["viejo", "nuevo", "bonito", "grande"] },
        { type: "fillInSentence", prompt: "Completa (edad): 'Wie ___ bist du?'", answer: "alt", options: ["alt", "neu", "schön", "gut"] }
      ]
    }
  ]
};

// Autollenado de seguridad para las lecciones restantes (Evita crashes de undefined)
for (let i = 1; i < 33; i++) {
  PodcastA1_1[i] = {
    title: "Lektion " + (i + 1) + " Podcast",
    segments: [
      {
        audioText: "Hallo! Das ist ein Platzhalter für den Podcast dieser Lektion. Bald verfügbar.",
        translation: "¡Hola! Esto es un marcador de posición para el podcast de esta lección. Próximamente disponible.",
        exercises: [
          { type: "choose", prompt: "Wählen Sie 'Platzhalter':", answer: "Platzhalter", options: ["Platzhalter", "Auto", "Buch"] }
        ]
      }
    ]
  };
}

window.PodcastA1_1 = PodcastA1_1;

