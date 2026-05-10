const PodcastA1_1 = {
  title: "Willkommen bei Müller",
  segments: [
    {
      audioText: "Hallo! Ich bin Anna. Ich bin Lehrerin. Mein Bruder ist Schüler. Er lernt Deutsch.",
      translation: "¡Hola! Soy Anna. Soy profesora. Mi hermano es alumno. Él aprende alemán.",
      exercises: [
        { type: "choose", prompt: "¿Quién es Anna?", answer: "Lehrerin", options: ["Lehrerin","Schülerin","Ärztin","Verkäuferin"] },
        { type: "fillInSentence", prompt: "Completa: 'Mein ___ ist Schüler.'", answer: "Bruder", options: ["Bruder","Vater","Onkel","Freund"] }
      ]
    },
    {
      audioText: "Wir wohnen in Berlin. Berlin ist eine große Stadt. Ich arbeite in einer Schule.",
      translation: "Vivimos en Berlín. Berlín es una ciudad grande. Trabajo en una escuela.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Berlin / eine / große / Stadt / ist'", answer: "Berlin ist eine große Stadt", hint: "Empieza con Berlin" },
        { type: "translateDE", prompt: "Traduce: 'Trabajo en una escuela.'", answer: "Ich arbeite in einer Schule", hint: "Ich arbeite..." }
      ]
    },
    {
      audioText: "Am Samstag gehe ich in den Zoo. Ich sehe einen Hund und eine Katze. Das Wetter ist schön.",
      translation: "El sábado voy al zoo. Veo un perro y un gato. El tiempo es bonito.",
      exercises: [
        { type: "declension", prompt: "Artículo de 'Hund' es:", answer: "der", options: ["der","die","das"] },
        { type: "choose", prompt: "¿Cómo está el tiempo?", answer: "schön", options: ["schön","schlecht","kalt","heiß"] }
      ]
    },
    {
      audioText: "Ich trinke gern Kaffee und esse ein Brötchen. Meine Mutter macht einen Kuchen.",
      translation: "Me gusta beber café y como un panecillo. Mi madre hace un pastel.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa: 'Ich trinke gern ___.'", answer: "Kaffee", options: ["Kaffee","Tee","Milch","Wasser"] },
        { type: "translateES", prompt: "Traduce: 'Meine Mutter macht einen Kuchen.'", answer: "Meine Mutter macht einen Kuchen", hint: "Repite la frase exacta." }
      ]
    },
    {
      audioText: "Heute gehe ich in den Supermarkt. Ich brauche Brot, Butter und Milch.",
      translation: "Hoy voy al supermercado. Necesito pan, mantequilla y leche.",
      exercises: [
        { type: "order", prompt: "Ordena: 'brauche / Brot / Butter / Milch / und / ich'", answer: "Ich brauche Brot, Butter und Milch", hint: "Empieza con Ich" },
        { type: "choose", prompt: "¿Qué compra?", answer: "Brot", options: ["Brot","Apfel","Wurst","Käse"] }
      ]
    },
    {
      audioText: "Am Sonntag schlafe ich lange. Dann lese ich ein Buch oder spiele Klavier.",
      translation: "El domingo duermo hasta tarde. Luego leo un libro o toco el piano.",
      exercises: [
        { type: "conjugate", prompt: "Conjuga 'schlafen' para 'ich':", answer: "schlafe", hint: "ich schlafe" },
        { type: "translateDE", prompt: "Traduce: 'Leo un libro.'", answer: "Ich lese ein Buch", hint: "Ich lese..." }
      ]
    }
  ]
};
window.PodcastA1_1 = PodcastA1_1;