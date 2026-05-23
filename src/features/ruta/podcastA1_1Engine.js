const PodcastA1_1 = [];

// LECCIÓN 1: Hallo!
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
        { type: "fillInSentence", prompt: "Completa (gracias): '___ für das Geschenk.'", answer: "Danke", options: ["Danke", "Bitte", "Hallo", "Ja"] },
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
        { type: "fillInSentence", prompt: "Completa (bonito): 'Der Tag ist ___.'", answer: "schön", options: ["schön", "schlecht", "neu", "alt"] },
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

// LECCIÓN 2: Familie
PodcastA1_1[1] = {
  title: "Lektion 2: Familie",
  segments: [
    {
      audioText: "Meine Mutter und mein Vater sind zu Hause. Die Mutter ist sehr nett.",
      exercises: [
        { type: "choose", prompt: "Was bedeutet 'Mutter'?", answer: "madre", options: ["madre", "padre", "hermana", "hermano"] },
        { type: "fillInSentence", prompt: "Completa (madre): 'Meine ___ ist sehr nett.'", answer: "Mutter", options: ["Mutter", "Vater", "Schwester", "Bruder"] }
      ]
    },
    {
      audioText: "Meine Schwester heißt Laura. Mein Bruder heißt Tim. Beide sind noch klein.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (hermana): 'Meine ___ heißt Laura.'", answer: "Schwester", options: ["Schwester", "Mutter", "Frau", "Mädchen"] },
        { type: "translateES", prompt: "Traduce al español: 'Mein Bruder heißt Tim.'", answer: "Mi hermano se llama Tim." }
      ]
    },
    {
      audioText: "Das Mädchen spielt im Garten. Der Junge liest ein Buch.",
      exercises: [
        { type: "choose", prompt: "Was bedeutet 'Mädchen'?", answer: "chica", options: ["chica", "chico", "mujer", "hombre"] },
        { type: "fillInSentence", prompt: "Completa (chica): 'Das ___ spielt im Garten.'", answer: "Mädchen", options: ["Mädchen", "Junge", "Frau", "Mann"] }
      ]
    },
    {
      audioText: "Die Frau und der Mann gehen spazieren. Sie haben ein Kind.",
      exercises: [
        { type: "choose", prompt: "Wer geht spazieren?", answer: "Die Frau und der Mann", options: ["Die Frau und der Mann", "Das Mädchen", "Der Junge", "Die Mutter"] },
        { type: "translateDE", prompt: "Traduce al alemán: 'Ellos tienen un niño.'", answer: "Sie haben ein Kind." }
      ]
    },
    {
      audioText: "Das Haus ist groß. Mein Zimmer ist klein.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (grande): 'Das Haus ist ___.'", answer: "groß", options: ["groß", "klein", "alt", "neu"] },
        { type: "fillInSentence", prompt: "Completa (pequeño): 'Mein Zimmer ist ___.'", answer: "klein", options: ["klein", "groß", "alt", "neu"] }
      ]
    }
  ]
};

// Autollenado de seguridad para las lecciones restantes
for (let i = 2; i < 33; i++) {
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

