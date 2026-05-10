const StoryA1_1 = {
  title: "Die Geburtstagsüberraschung",
  scenes: [
    {
      id: 1, title: "Im Wohnzimmer",
      dialogs: [
        { speaker: "Anna", text: "Der Geburtstag von Mama ist am Samstag.", translation: "El cumpleaños de mamá es el sábado." },
        { speaker: "Paul", text: "Ich kaufe Blumen und eine Torte.", translation: "Compro flores y una tarta." },
        { speaker: "Anna", text: "Gut! Und ich backe einen Kuchen.", translation: "¡Bien! Y yo horneo un pastel." }
      ],
      exercises: [
        { type: "order", prompt: "Ordena: 'Geburtstag / am / Samstag / ist / der / von Mama'", answer: "Der Geburtstag von Mama ist am Samstag", hint: "Empieza con Der" },
        { type: "choose", prompt: "¿Quién compra flores?", answer: "Paul", options: ["Anna","Paul","Mama","der Vater"] }
      ]
    },
    {
      id: 2, title: "Im Supermarkt",
      dialogs: [
        { speaker: "Paul", text: "Ich nehme Brot, Käse und Sekt.", translation: "Cojo pan, queso y cava." },
        { speaker: "Verkäufer", text: "Das macht zwölf Euro.", translation: "Son doce euros." }
      ],
      exercises: [
        { type: "fillInSentence", prompt: "Completa: 'Ich nehme Brot, Käse und ___.'", answer: "Sekt", options: ["Sekt","Milch","Wasser","Tee"] },
        { type: "translateDE", prompt: "Traduce: 'Son doce euros.'", answer: "Das macht zwölf Euro", hint: "Empieza con Das" }
      ]
    },
    {
      id: 3, title: "Die Überraschung",
      dialogs: [
        { speaker: "Mama", text: "Was ist das? Eine Torte und Blumen!", translation: "¿Qué es esto? ¡Una tarta y flores!" },
        { speaker: "Anna", text: "Alles Gute zum Geburtstag, liebe Mama!", translation: "¡Feliz cumpleaños, querida mamá!" },
        { speaker: "Paul", text: "Wir lieben dich sehr.", translation: "Te queremos mucho." }
      ],
      exercises: [
        { type: "translateES", prompt: "Traduce: 'Alles Gute zum Geburtstag!'", answer: "Alles Gute zum Geburtstag", hint: "Felicidades" },
        { type: "choose", prompt: "¿Qué dice Paul?", answer: "Wir lieben dich sehr", options: ["Wir lieben dich sehr","Ich bin müde","Auf Wiedersehen","Guten Morgen"] }
      ]
    },
    {
      id: 4, title: "Das Geschenk",
      dialogs: [
        { speaker: "Anna", text: "Mama, hier ist dein Geschenk. Es ist ein Fotoalbum.", translation: "Mamá, aquí tienes tu regalo. Es un álbum de fotos." },
        { speaker: "Mama", text: "Oh, wie schön! Ich liebe es.", translation: "¡Oh, qué bonito! Me encanta." }
      ],
      exercises: [
        { type: "fillInSentence", prompt: "Completa: 'Es ist ein ___.'", answer: "Fotoalbum", options: ["Fotoalbum","Buch","Heft","Bild"] },
        { type: "order", prompt: "Ordena: 'wie / schön / Oh / ! / es / Ich / liebe'", answer: "Oh, wie schön! Ich liebe es.", hint: "Empieza con Oh" }
      ]
    }
  ],
  getTotalScenes() {
    return this.scenes.length;
  }
};
window.StoryA1_1 = StoryA1_1;