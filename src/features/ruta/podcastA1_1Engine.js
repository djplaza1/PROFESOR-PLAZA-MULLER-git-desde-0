const PodcastA1_1 = [];

// LECCION 1: Hallo! – Podcast narrativo
PodcastA1_1[0] = {
  title: "Lektion 1: Hallo!",
  segments: [
    {
      audioText: "Hallo! Ich bin Anna. Mein Name ist Anna. Wie ist dein Name? Ich freue mich, dich kennenzulernen.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (nombre): 'Mein ___ ist Anna.'", answer: "Name", options: ["Name", "Tag", "Haus", "Buch"] },
        { type: "choose", prompt: "Was bedeutet 'Hallo'?", answer: "Hola", options: ["Hola", "Gracias", "Adios", "Por favor"] }
      ]
    },
    {
      audioText: "Danke für das Geschenk. Das ist sehr nett von dir. Bitte sehr, hier ist ein Kaffee für dich.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (gracias): '___ für das Geschenk.'", answer: "Danke", options: ["Danke", "Bitte", "Hallo", "Ja"] },
        { type: "choose", prompt: "Was ist sehr nett?", answer: "Das Geschenk", options: ["Das Geschenk", "Der Kaffee", "Der Name", "Der Tag"] }
      ]
    },
    {
      audioText: "Ja, ich komme mit ins Kino. Nein, das stimmt nicht. Der Film ist nicht schlecht, er ist gut.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (si): '___, ich komme mit.'", answer: "Ja", options: ["Ja", "Nein", "Danke", "Bitte"] },
        { type: "choose", prompt: "Wie ist der Film?", answer: "gut", options: ["gut", "schlecht", "schön", "alt"] }
      ]
    },
    {
      audioText: "Der Kuchen schmeckt heute sehr gut. Aber das Wetter ist schlecht. Es regnet den ganzen Tag.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (malo): 'Das Wetter ist ___.'", answer: "schlecht", options: ["schlecht", "gut", "schön", "neu"] },
        { type: "choose", prompt: "Was schmeckt gut?", answer: "Der Kuchen", options: ["Der Kuchen", "Das Wetter", "Der Kaffee", "Der Film"] }
      ]
    },
    {
      audioText: "Der Tag ist heute schön. Die Sonne scheint. Mein Auto ist neu. Es ist ein Geschenk von meinem Vater.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (bonito): 'Der Tag ist ___.'", answer: "schön", options: ["schön", "schlecht", "neu", "alt"] },
        { type: "choose", prompt: "Von wem ist das Auto?", answer: "vom Vater", options: ["vom Vater", "von der Mutter", "vom Bruder", "von Anna"] }
      ]
    },
    {
      audioText: "Mein Opa ist neunzig Jahre alt. Er wohnt in einem alten Haus. Wie alt bist du?",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (edad): 'Wie ___ bist du?'", answer: "alt", options: ["alt", "neu", "schön", "gut"] },
        { type: "choose", prompt: "Wer ist neunzig Jahre alt?", answer: "der Opa", options: ["der Opa", "die Oma", "der Vater", "die Mutter"] }
      ]
    }
  ]
};

// LECCION 2: Familie – Podcast narrativo
PodcastA1_1[1] = {
  title: "Lektion 2: Familie",
  segments: [
    {
      audioText: "Guten Morgen! Meine Familie ist heute zu Hause. Meine Mutter und mein Vater frühstücken zusammen.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (madre): 'Meine ___ frühstückt.'", answer: "Mutter", options: ["Mutter", "Vater", "Schwester", "Bruder"] },
        { type: "choose", prompt: "Wer frühstückt zusammen?", answer: "die Eltern", options: ["die Eltern", "die Kinder", "die Schwestern", "die Brüder"] }
      ]
    },
    {
      audioText: "Meine Schwester Laura und mein Bruder Tim spielen im Garten. Beide sind noch sehr klein.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (hermana): 'Meine ___ heißt Laura.'", answer: "Schwester", options: ["Schwester", "Mutter", "Frau", "Mädchen"] },
        { type: "choose", prompt: "Sind Laura und Tim groß?", answer: "nein, klein", options: ["nein, klein", "ja, groß", "nein, alt", "ja, neu"] }
      ]
    },
    {
      audioText: "Das Mädchen von nebenan spielt mit meiner Schwester. Der Junge liest ein Buch über Tiere.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (chica): 'Das ___ spielt mit.'", answer: "Mädchen", options: ["Mädchen", "Junge", "Frau", "Mann"] },
        { type: "choose", prompt: "Was macht der Junge?", answer: "er liest", options: ["er liest", "er spielt", "er schläft", "er isst"] }
      ]
    },
    {
      audioText: "Die Frau und der Mann gehen spazieren. Sie haben ein kleines Kind. Das Kind lacht und ist sehr froh.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (hombre): 'Der ___ geht spazieren.'", answer: "Mann", options: ["Mann", "Junge", "Vater", "Bruder"] },
        { type: "choose", prompt: "Wie ist das Kind?", answer: "froh", options: ["froh", "traurig", "müde", "böse"] }
      ]
    },
    {
      audioText: "Unser Haus ist groß. Es hat viele Zimmer. Mein Zimmer ist klein, aber es ist sehr gemütlich.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (grande): 'Das Haus ist ___.'", answer: "groß", options: ["groß", "klein", "alt", "neu"] },
        { type: "choose", prompt: "Wie ist das Zimmer?", answer: "klein und gemütlich", options: ["klein und gemütlich", "groß und kalt", "alt und dunkel", "neu und leer"] }
      ]
    },
    {
      audioText: "Ich liebe meine Familie. Die Mutter, der Vater, die Schwester und der Bruder sind immer für mich da.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (padre): 'Der ___ ist immer da.'", answer: "Vater", options: ["Vater", "Bruder", "Mann", "Junge"] },
        { type: "choose", prompt: "Wer ist immer da?", answer: "die Familie", options: ["die Familie", "die Freunde", "die Nachbarn", "die Lehrer"] }
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
