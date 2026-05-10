// storyA1_1Engine.js – Historia interactiva con vocabulario A1.1
const StoryA1_1 = {
  title: "Die Geburtstagsüberraschung",
  scenes: [
    {
      id: 1,
      title: "Im Wohnzimmer",
      dialogs: [
        { speaker: "Anna", text: "Der Geburtstag von Mama ist am Samstag.", translation: "El cumpleaños de mamá es el sábado." },
        { speaker: "Paul",  text: "Ich kaufe Blumen und eine Torte.", translation: "Compro flores y una tarta." },
        { speaker: "Anna", text: "Gut! Und ich backe einen Kuchen.", translation: "¡Bien! Y yo horneo un pastel." }
      ],
      exercises: [
        { type: "order", prompt: 'Ordena: "Geburtstag / am / ist / Samstag / der / von Mama"', answer: "Der Geburtstag von Mama ist am Samstag", hint: "Empieza con 'Der Geburtstag...'" },
        { type: "choose", prompt: "¿Quién compra flores?", answer: "Paul", options: ["Anna","Paul","Mama","der Vater"] }
      ]
    },
    {
      id: 2,
      title: "Im Supermarkt",
      dialogs: [
        { speaker: "Paul",  text: "Ich nehme Brot, Käse und Sekt.", translation: "Cojo pan, queso y cava." },
        { speaker: "Verkäufer", text: "Das macht zwölf Euro.", translation: "Son doce euros." },
        { speaker: "Paul",  text: "Danke schön! Auf Wiedersehen.", translation: "¡Muchas gracias! Adiós." }
      ],
      exercises: [
        { type: "fillInSentence", prompt: 'Completa: "Ich nehme Brot, Käse und ___."', answer: "Sekt", options: ["Sekt","Milch","Wasser","Tee"] },
        { type: "translateDE", prompt: 'Traduce al alemán: "Son doce euros."', answer: "Das macht zwölf Euro", hint: "Empieza con 'Das macht...'" }
      ]
    },
    {
      id: 3,
      title: "Die Überraschung",
      dialogs: [
        { speaker: "Mama", text: "Was ist das? Eine Torte und Blumen!", translation: "¿Qué es esto? ¡Una tarta y flores!" },
        { speaker: "Anna", text: "Alles Gute zum Geburtstag, liebe Mama!", translation: "¡Feliz cumpleaños, querida mamá!" },
        { speaker: "Paul",  text: "Wir lieben dich sehr.", translation: "Te queremos mucho." }
      ],
      exercises: [
        { type: "translateES", prompt: 'Traduce: "Alles Gute zum Geburtstag, liebe Mama!"', answer: "Alles Gute zum Geburtstag, liebe Mama", hint: "Es una felicitación de cumpleaños." },
        { type: "choose", prompt: "¿Qué dice Paul al final?", answer: "Wir lieben dich sehr", options: ["Wir lieben dich sehr","Ich bin müde","Auf Wiedersehen","Guten Morgen"] }
      ]
    }
  ],

  getTotalScenes() { return this.scenes.length; },
  getTotalExercises(sceneIdx) {
    return this.scenes[sceneIdx]?.exercises.length || 0;
  }
};
window.StoryA1_1 = StoryA1_1;