const StoryA1_1 = [];

// LECCIÓN 1: Una historia real y fluida dividida en escenas cohesivas
StoryA1_1[0] = {
  title: "Lektion 1: Hallo! – Die Geschichte",
  scenes: [
    {
      title: "Szene 1: Im Café",
      dialogs: [
        { speaker: "Anna", text: "Hallo! Ich bin Anna. Wie ist dein Name?" },
        { speaker: "Lukas", text: "Mein Name ist Lukas. Danke, dass du hier bist." },
        { speaker: "Anna", text: "Bitte sehr, hier ist dein Kaffee." }
      ],
      translation: "Escena 1: En el café. Anna saluda, pregunta el nombre y ofrece café.",
      exercises: [
        { type: "order", prompt: "Ordena la frase de Anna:", answer: "Hallo! Ich bin Anna.", scrambledWords: ["Anna.", "Hallo!", "ich", "bin"] },
        { type: "choose", prompt: "¿Qué ofrece Anna?", answer: "Kaffee", options: ["Kaffee", "Tee", "Wasser", "Brot"] }
      ]
    },
    {
      title: "Szene 2: Die Überraschung",
      dialogs: [
        { speaker: "Lukas", text: "Der Kuchen schmeckt gut! Ist das Wetter heute schlecht?" },
        { speaker: "Anna", text: "Nein, das stimmt nicht. Der Tag ist schön." },
        { speaker: "Lukas", text: "Oh, ja. Du hast recht. Das Auto ist neu, oder?" }
      ],
      translation: "Escena 2: Hablan del pastel, el tiempo y un coche nuevo.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (bueno): 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut", "schlecht", "schön", "alt"] },
        { type: "translateDE", prompt: "Traduce al alemán: 'El día es bonito.'", answer: "Der Tag ist schön." }
      ]
    },
    {
      title: "Szene 3: Familie",
      dialogs: [
        { speaker: "Lukas", text: "Wie alt bist du, Anna?" },
        { speaker: "Anna", text: "Ich bin zwanzig Jahre alt. Mein Opa ist neunzig Jahre alt." },
        { speaker: "Lukas", text: "Wow! Das Haus ist sehr alt, nicht wahr?" }
      ],
      translation: "Escena 3: Preguntan las edades y comentan sobre la casa vieja.",
      exercises: [
        { type: "choose", prompt: "¿Cuántos años tiene Anna?", answer: "zwanzig", options: ["zwanzig", "dreißig", "vierzig", "fünfzig"] },
        { type: "fillInSentence", prompt: "Completa (edad): 'Wie ___ bist du?'", answer: "alt", options: ["alt", "neu", "schön", "gut"] }
      ]
    }
  ]
};

// Inicialización preventiva para evitar excepciones de tipo undefined en el resto de rutas
for (let i = 1; i < 33; i++) {
  StoryA1_1[i] = {
    title: "Lektion " + (i + 1) + ": Geschichte",
    scenes: [
      {
        title: "Szene 1",
        dialogs: [
          { speaker: "Lehrer", text: "Diese Geschichte ist bald für Sie bereit. Viel Erfolg beim Lernen!" }
        ],
        exercises: [
          { type: "choose", prompt: "Wählen Sie 'Erfolg':", answer: "Erfolg", options: ["Erfolg", "Brot", "Wasser"] }
        ]
      }
    ]
  };
}

window.StoryA1_1 = StoryA1_1;
