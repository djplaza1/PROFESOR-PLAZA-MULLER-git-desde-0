const PodcastA1_1 = [];

PodcastA1_1[0] = {
  title: "Lektion 1: Hallo!",
  segments: [
    {
      audioText: "Hallo, ich bin Anna. Mein Name ist Anna. Ich freue mich sehr, dich kennenzulernen. Wie ist dein Name? Schön, dass du heute hier bist.",
      translation: "Hola, soy Anna. Mi nombre es Anna. Estoy muy contenta de conocerte. ¿Cuál es tu nombre? Qué bien que estés hoy aquí.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (nombre): 'Mein ___ ist Anna.'", answer: "Name", options: ["Name", "Tag", "Haus", "Buch"] },
        { type: "choose", prompt: "Wer spricht hier?", answer: "Anna", options: ["Anna", "Lukas", "Die Mutter", "Der Vater"] }
      ]
    },
    {
      audioText: "Der Tag ist heute wunderschön. Die Sonne scheint und der Himmel ist blau. Ich habe gute Laune, weil das Wetter so gut ist. Nicht schlecht, oder?",
      translation: "El día hoy es maravilloso. El sol brilla y el cielo está azul. Tengo buen humor porque el tiempo es tan bueno. No está mal, ¿verdad?",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (día): 'Der ___ ist heute wunderschön.'", answer: "Tag", options: ["Tag", "Name", "Haus", "Buch"] },
        { type: "choose", prompt: "Wie ist das Wetter?", answer: "gut", options: ["gut", "schlecht", "schön", "alt"] }
      ]
    },
    {
      audioText: "Gestern habe ich ein Geschenk bekommen. Danke, liebe Oma, für das schöne Geschenk! Es ist ein neues Auto – na ja, ein Spielzeugauto. Bitte sehr, ich zeige es dir später.",
      translation: "Ayer recibí un regalo. ¡Gracias, querida abuela, por el bonito regalo! Es un coche nuevo – bueno, un coche de juguete. Por favor, te lo enseño luego.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (gracias): '___ für das Geschenk.'", answer: "Danke", options: ["Danke", "Bitte", "Hallo", "Ja"] },
        { type: "choose", prompt: "Von wem ist das Geschenk?", answer: "von der Oma", options: ["von der Oma", "von der Mutter", "vom Vater", "von Lukas"] }
      ]
    },
    {
      audioText: "Mein Freund Lukas fragt: 'Kommst du mit ins Kino?' Ich sage: 'Ja, ich komme mit!' Aber er fragt nochmal: 'Ist der Film wirklich gut? Oder eher schlecht?' Ich antworte: 'Nein, der Film ist nicht schlecht. Er ist sehr gut!'",
      translation: "Mi amigo Lukas pregunta: '¿Vienes conmigo al cine?' Yo digo: '¡Sí, voy contigo!' Pero él pregunta de nuevo: '¿Es realmente buena la película? ¿O más bien mala?' Respondo: 'No, la película no es mala. ¡Es muy buena!'",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (sí): '___, ich komme mit.'", answer: "Ja", options: ["Ja", "Nein", "Danke", "Bitte"] },
        { type: "choose", prompt: "Wie ist der Film laut Anna?", answer: "gut", options: ["gut", "schlecht", "schön", "alt"] }
      ]
    },
    {
      audioText: "Nach dem Kino gehen wir in ein Café. Der Kuchen dort schmeckt wirklich gut. Aber der Kaffee ist leider schlecht. Trotzdem ist es gemütlich.",
      translation: "Después del cine vamos a un café. La tarta allí sabe realmente bien. Pero el café por desgracia es malo. Sin embargo, es acogedor.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (bueno): 'Der Kuchen schmeckt ___.'", answer: "gut", options: ["gut", "schlecht", "schön", "neu"] },
        { type: "choose", prompt: "Was ist schlecht?", answer: "der Kaffee", options: ["der Kaffee", "der Kuchen", "das Wetter", "der Film"] }
      ]
    },
    {
      audioText: "Am Nachmittag fahre ich mit meinem neuen Auto nach Hause. Es ist wirklich neu und riecht noch ganz frisch. Ich mag neue Sachen. Mein altes Auto war nicht mehr schön.",
      translation: "Por la tarde voy a casa con mi coche nuevo. Es realmente nuevo y todavía huele muy fresco. Me gustan las cosas nuevas. Mi coche viejo ya no era bonito.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (nuevo): 'Mein Auto ist ___.'", answer: "neu", options: ["neu", "alt", "schön", "schlecht"] },
        { type: "choose", prompt: "Wie war das alte Auto?", answer: "nicht schön", options: ["nicht schön", "sehr schön", "ganz neu", "sehr gut"] }
      ]
    },
    {
      audioText: "Zu Hause besuche ich meinen Opa. Er ist schon sehr alt, neunzig Jahre. Er wohnt in einem alten Haus, aber es ist sehr gemütlich. Er fragt mich: 'Na, wie alt bist du jetzt?' Ich lache.",
      translation: "En casa visito a mi abuelo. Él ya es muy viejo, tiene noventa años. Vive en una casa antigua, pero es muy acogedora. Me pregunta: 'A ver, ¿cuántos años tienes ahora?' Yo me río.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (edad): 'Wie ___ bist du?'", answer: "alt", options: ["alt", "neu", "schön", "gut"] },
        { type: "choose", prompt: "Wo wohnt der Opa?", answer: "in einem alten Haus", options: ["in einem alten Haus", "in einem neuen Auto", "in einem Café", "in der Schule"] }
      ]
    }
  ]
};

PodcastA1_1[1] = {
  title: "Lektion 2: Familie",
  segments: [
    {
      audioText: "Heute Morgen frühstücke ich mit meiner Familie. Meine Mutter und mein Vater sitzen am Tisch. Die Mutter trinkt Kaffee, der Vater liest die Zeitung. Es ist schön, zusammen zu sein.",
      translation: "Esta mañana desayuno con mi familia. Mi madre y mi padre están sentados a la mesa. La madre bebe café, el padre lee el periódico. Es bonito estar juntos.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (madre): 'Meine ___ trinkt Kaffee.'", answer: "Mutter", options: ["Mutter", "Vater", "Schwester", "Bruder"] },
        { type: "choose", prompt: "Was macht der Vater?", answer: "er liest", options: ["er liest", "er trinkt", "er spielt", "er schläft"] }
      ]
    },
    {
      audioText: "Meine Schwester Laura und mein Bruder Tim sind noch klein. Sie spielen im Wohnzimmer mit ihren Spielsachen. Laura baut einen Turm und Tim malt ein Bild.",
      translation: "Mi hermana Laura y mi hermano Tim todavía son pequeños. Juegan en el salón con sus juguetes. Laura construye una torre y Tim pinta un dibujo.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (hermana): 'Meine ___ heißt Laura.'", answer: "Schwester", options: ["Schwester", "Mutter", "Frau", "Mädchen"] },
        { type: "choose", prompt: "Sind Laura und Tim schon groß?", answer: "nein, sie sind klein", options: ["nein, sie sind klein", "ja, sie sind groß", "nein, sie sind alt", "ja, sie sind neu"] }
      ]
    },
    {
      audioText: "Das Mädchen von nebenan kommt zu Besuch. Es heißt Emma und ist sehr freundlich. Der Junge nebenan, Felix, liest draußen ein Buch über Tiere.",
      translation: "La chica de al lado viene de visita. Se llama Emma y es muy simpática. El chico de al lado, Felix, lee fuera un libro sobre animales.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (chica): 'Das ___ heißt Emma.'", answer: "Mädchen", options: ["Mädchen", "Junge", "Frau", "Mann"] },
        { type: "choose", prompt: "Was macht Felix?", answer: "er liest ein Buch", options: ["er liest ein Buch", "er spielt Fußball", "er malt ein Bild", "er schläft"] }
      ]
    },
    {
      audioText: "Später gehen eine Frau und ein Mann spazieren. Sie haben ein kleines Kind dabei. Das Kind lacht und zeigt auf die Enten im Park. Die Frau und der Mann lächeln.",
      translation: "Más tarde, una mujer y un hombre van a pasear. Llevan un niño pequeño. El niño ríe y señala a los patos en el parque. La mujer y el hombre sonríen.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (hombre): 'Der ___ geht spazieren.'", answer: "Mann", options: ["Mann", "Junge", "Vater", "Bruder"] },
        { type: "choose", prompt: "Worauf zeigt das Kind?", answer: "auf die Enten", options: ["auf die Enten", "auf die Hunde", "auf die Katzen", "auf die Autos"] }
      ]
    },
    {
      audioText: "Unser Haus ist groß und hat viele Zimmer. Mein eigenes Zimmer ist zwar klein, aber ich habe es sehr gemütlich eingerichtet. Es ist mein Lieblingsplatz.",
      translation: "Nuestra casa es grande y tiene muchas habitaciones. Mi propia habitación es pequeña, pero la he decorado muy acogedora. Es mi lugar favorito.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (grande): 'Das Haus ist ___.'", answer: "groß", options: ["groß", "klein", "alt", "neu"] },
        { type: "choose", prompt: "Wie ist das eigene Zimmer?", answer: "klein und gemütlich", options: ["klein und gemütlich", "groß und kalt", "alt und dunkel", "neu und leer"] }
      ]
    },
    {
      audioText: "Am Abend sitzen wir alle zusammen. Die Mutter, der Vater, die Schwester und der Bruder. Wir erzählen Geschichten und lachen viel. Familie ist einfach etwas Schönes.",
      translation: "Por la tarde estamos todos sentados juntos. La madre, el padre, la hermana y el hermano. Contamos historias y reímos mucho. La familia es simplemente algo bonito.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa (padre): 'Der ___ erzählt eine Geschichte.'", answer: "Vater", options: ["Vater", "Bruder", "Mann", "Junge"] },
        { type: "choose", prompt: "Was macht die Familie am Abend?", answer: "sie erzählen Geschichten", options: ["sie erzählen Geschichten", "sie gehen spazieren", "sie lesen Bücher", "sie spielen Fußball"] }
      ]
    }
  ]
};

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
