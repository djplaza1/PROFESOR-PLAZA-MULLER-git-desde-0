const PodcastA1_1 = [];

// LECCIÓN 1: La búsqueda de empleo (Mapeado con las 11 palabras reales)
PodcastA1_1[0] = {
  title: "Lektion 1: Die Jobsuche",
  segments: [
    {
      audioText: "Hallo, liebe Deutschlerner! Heute sprechen wir über einen wichtigen Tag. Ich sitze im Zimmer und lese eine Anzeige. Die Anzeige ist sehr interessant für meine Familie.",
      translation: "¡Hola, queridos estudiantes de alemán! Hoy hablamos de un día importante. Estoy sentado en la habitación y leo un anuncio. El anuncio es muy interesante para mi familia.",
      exercises: [
        { type: "choose", prompt: "¿Qué está leyendo?", answer: "eine Anzeige", options: ["eine Anzeige", "ein Buch", "einen Brief", "eine Zeitung"] },
        { type: "fillInSentence", prompt: "Completa: 'Die ___ ist sehr interessant.'", answer: "Anzeige", options: ["Anzeige", "Federtasche", "Straßenbahn", "Klasse"] }
      ]
    },
    {
      audioText: "Mein Bruder sucht schon lange eine Arbeit. Er möchte einen guten Lohn bekommen, denn das Leben in der Stadt ist teuer. Ist der Lohn hier hoch?",
      translation: "Mi hermano busca trabajo desde hace tiempo. Le gustaría recibir un buen salario, porque la vida en la ciudad es cara. ¿Es alto el salario aquí?",
      exercises: [
        { type: "order", prompt: "Ordena: 'guten / einen / Lohn / Er / möchte / bekommen'", answer: "Er möchte einen guten Lohn bekommen" },
        { type: "translateDE", prompt: "Traduce al alemán: 'Mi hermano busca un trabajo.'", answer: "Mein Bruder sucht eine Arbeit" }
      ]
    },
    {
      audioText: "Mein Bruder ist sehr fleißig und arbeitet viel. Später am Nachmittag fahre ich mit der Straßenbahn ins Zentrum, um ihn zu treffen.",
      translation: "Mi hermano es muy trabajador y trabaja mucho. Más tarde, por la tarde, voy en tranvía al centro para encontrarme con él.",
      exercises: [
        { type: "choose", prompt: "¿Cómo es el hermano?", answer: "fleißig", options: ["fleißig", "faul", "müde", "traurig"] },
        { type: "fillInSentence", prompt: "Completa: 'Ich fahre mit der ___.'", answer: "Straßenbahn", options: ["Straßenbahn", "Taxi", "Auto", "Fahrrad"] }
      ]
    },
    {
      audioText: "In der Straßenbahn sitzt ein kleines Mädchen neben mir. Das Mädchen ist sehr lebhaft, es lacht und spricht die ganze Zeit.",
      translation: "En el tranvía, una chica pequeña se sienta a mi lado. La chica es muy vivaz, se ríe y habla todo el tiempo.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Mädchen / ist / sehr / Das / lebhaft'", answer: "Das Mädchen ist sehr lebhaft" },
        { type: "translateES", prompt: "Traduce al español: 'Das Mädchen ist sehr lebhaft.'", answer: "La chica es muy vivaz" }
      ]
    },
    {
      audioText: "Das Mädchen sucht etwas. Sie öffnet eine neue Federtasche und nimmt einen Stift. Ihre Federtasche ist wirklich schön.",
      translation: "La chica busca algo. Abre un estuche nuevo y toma un bolígrafo. Su estuche es realmente bonito.",
      exercises: [
        { type: "declension", prompt: "El artículo correcto para 'Federtasche' es:", answer: "die", options: ["der", "die", "das"] },
        { type: "fillInSentence", prompt: "Completa: 'Sie öffnet eine neue ___.'", answer: "Federtasche", options: ["Federtasche", "Anzeige", "Bäckerei", "Blume"] }
      ]
    },
    {
      audioText: "Ich schaue aus dem Fenster. Zu Hause wartet mein Bruder. Ich muss die Bücher in das Regal stellen. Das Regal steht im Wohnzimmer.",
      translation: "Miro por la ventana. En casa espera mi hermano. Tengo que poner los libros en la estantería. La estantería está en el salón.",
      exercises: [
        { type: "translateDE", prompt: "Traduce al alemán: 'La estantería está en el salón.'", answer: "Das Regal steht im Wohnzimmer" },
        { type: "declension", prompt: "El artículo de 'Regal' es:", answer: "das", options: ["der", "die", "das"] }
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