const StoryA1_1 = [];

// LECCIÓN 1: Una historia real y fluida dividida en escenas cohesivas
StoryA1_1[0] = {
  title: "Lektion 1: Die neue Arbeit",
  scenes: [
    {
      title: "Szene 1: Ein interessanter Fund zu Hause",
      dialogs: [
        { speaker: "Lucas", text: "Hallo Marie! Schau mal hier. Die Anzeige in der Zeitung ist sehr interessant." },
        { speaker: "Marie", text: "Was für eine Anzeige ist das, Lucas? Ist das eine Arbeit für deinen Bruder?" },
        { speaker: "Lucas", text: "Ja, genau! Mein Bruder ist sehr fleißig. Er sucht eine Arbeit mit einem guten Lohn." }
      ],
      exercises: [
        { type: "choose", prompt: "¿Qué está mirando Lucas en la prensa?", answer: "Die Anzeige", options: ["Die Anzeige", "Ein Regal", "Ein Ticket", "Ein Taxi"] },
        { type: "translateES", prompt: "Traduce al español: 'Mein Bruder ist sehr fleißig.'", answer: "Mi hermano es muy trabajador", translation: "Mi hermano es muy trabajador" }
      ]
    },
    {
      title: "Szene 2: Das Gespräch in der Straßenbahn",
      dialogs: [
        { speaker: "Marie", text: "Fahren wir heute mit dem Taxi oder nehmen wir die Straßenbahn ins Zentrum?" },
        { speaker: "Lucas", text: "Wir fahren mit der Straßenbahn. Schau mal, das kleine Mädchen dort drüben ist sehr lebhaft." },
        { speaker: "Marie", text: "Ja, das Mädchen lacht viel. Später müssen wir aber schnell nach Hause fahren." }
      ],
      exercises: [
        { type: "fillInSentence", prompt: "Completa: 'Wir fahren mit der ___.'", answer: "Straßenbahn", options: ["Straßenbahn", "Taxi", "U-Bahn", "Auto"] },
        { type: "order", prompt: "Ordena la frase: 'Mädchen / Das / sehr / lebhaft / ist'", answer: "Das Mädchen ist sehr lebhaft" }
      ]
    },
    {
      title: "Szene 3: Die Federtasche und das neue Möbelstück",
      dialogs: [
        { speaker: "Lucas", text: "Marie, schau! Das Mädchen hat eine schöne Federtasche auf dem Tisch." },
        { speaker: "Marie", text: "Stimmt, die Federtasche ist neu. Aber Lucas, wo sind deine Bücher zu Hause? Liegen sie im Regal?" },
        { speaker: "Lucas", text: "Nein, das Regal ist noch leer. Wir müssen die Bücher heute richtig einsortieren." }
      ],
      exercises: [
        { type: "declension", prompt: "Selecciona el artículo correcto para 'Federtasche':", answer: "die", options: ["der", "die", "das"] },
        { type: "translateDE", prompt: "Traduce al alemán: 'El estuche es nuevo.'", answer: "Die Federtasche ist neu", translation: "El estuche es nuevo." },
        { type: "declension", prompt: "Selecciona el artículo correcto para 'Regal':", answer: "das", options: ["der", "die", "das"] }
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