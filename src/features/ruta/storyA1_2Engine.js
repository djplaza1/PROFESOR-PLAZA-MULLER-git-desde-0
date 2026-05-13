const StoryA1_2 = {
  title: "Ein Tag im Park",
  scenes: [
    {
      title: "Im Park",
      dialogs: [
        { speaker: "Anna", text: "Hallo Paul! Wie geht es dir?" },
        { speaker: "Paul", text: "Mir geht es gut, danke! Und dir?" },
        { speaker: "Anna", text: "Auch gut. Was machst du hier im Park?" }
      ],
      translation: "Anna: Hola Paul! ¿Cómo estás?\nPaul: Estoy bien, gracias. ¿Y tú?\nAnna: Bien también. ¿Qué haces aquí en el parque?",
      exercises: [
        { type: "choose", prompt: "¿Cómo está Paul?", answer: "gut", options: ["gut","schlecht","müde","krank"] },
        { type: "fillInSentence", prompt: "Completa: 'Mir geht es ___.'", answer: "gut", options: ["gut","schnell","groß","klein"] }
      ]
    },
    {
      title: "Die Enten",
      dialogs: [
        { speaker: "Paul", text: "Ich füttere die Enten. Siehst du die große Ente dort?" },
        { speaker: "Anna", text: "Ja, die Ente ist wirklich groß! Und es gibt viele Kaninchen im Park." },
        { speaker: "Paul", text: "Ja, das Kaninchen mit den langen Ohren ist mein Liebling." }
      ],
      translation: "Paul: Estoy dando de comer a los patos. ¿Ves el pato grande allí?\nAnna: Sí, ¡el pato es realmente grande! Y hay muchos conejos en el parque.\nPaul: Sí, el conejo con las orejas largas es mi favorito.",
      exercises: [
        { type: "declension", prompt: "Artículo de 'Ente' es:", answer: "die", options: ["der","die","das"] },
        { type: "translateES", prompt: "Traduce: 'Kaninchen'", answer: "conejo", hint: "Un animal pequeño y peludo." }
      ]
    },
    {
      title: "Ein Picknick",
      dialogs: [
        { speaker: "Anna", text: "Ich habe Hunger. Hast du etwas zu essen mitgebracht?" },
        { speaker: "Paul", text: "Ja, ich habe Brot, Käse und einen leckeren Kuchen." },
        { speaker: "Anna", text: "Wunderbar! Setzen wir uns auf die Bank unter dem Baum." }
      ],
      translation: "Anna: Tengo hambre. ¿Has traído algo de comer?\nPaul: Sí, tengo pan, queso y un pastel delicioso.\nAnna: ¡Maravilloso! Sentémonos en el banco bajo el árbol.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Bank / dem / auf / die / Baum / unter'", answer: "auf die Bank unter dem Baum", hint: "Empieza con auf" },
        { type: "choose", prompt: "¿Qué trajo Paul?", answer: "Brot, Käse und Kuchen", options: ["Pizza und Cola","Brot, Käse und Kuchen","Wurst und Salat","Obst und Wasser"] }
      ]
    }
  ]
};
window.StoryA1_2 = StoryA1_2;