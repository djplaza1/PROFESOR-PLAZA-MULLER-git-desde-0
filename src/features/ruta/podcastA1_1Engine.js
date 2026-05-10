// podcastA1_1Engine.js – Motor de podcast interactivo con vocabulario A1.1
const PodcastA1_1 = {
  title: "Willkommen bei Müller",
  segments: [
    {
      audioText: "Hallo! Ich bin Anna. Ich bin Lehrerin. Mein Bruder ist Schüler. Er lernt Deutsch.",
      translation: "¡Hola! Soy Anna. Soy profesora. Mi hermano es alumno. Él aprende alemán.",
      exercises: [
        { type: "translateES", prompt: "Traduce: 'Ich bin Lehrerin.'", answer: "Ich bin Lehrerin", hint: "Empieza con 'Ich bin...'" },
        { type: "choose", prompt: "¿Qué significa 'Bruder'?", answer: "hermano", options: ["hermano","padre","hijo","amigo"] }
      ]
    },
    {
      audioText: "Wir wohnen in Berlin. Berlin ist eine große Stadt. Ich arbeite in einer Schule.",
      translation: "Vivimos en Berlín. Berlín es una ciudad grande. Trabajo en una escuela.",
      exercises: [
        { type: "fillInSentence", prompt: 'Completa: "Wir wohnen in ___."', answer: "Berlin", options: ["Berlin","München","Hamburg","Köln"] },
        { type: "order", prompt: 'Ordena: "ist / Berlin / Stadt / eine / große"', answer: "Berlin ist eine große Stadt", hint: "Empieza con Berlín" }
      ]
    },
    {
      audioText: "Am Samstag gehe ich in den Zoo. Ich sehe einen Hund und eine Katze. Das Wetter ist schön.",
      translation: "El sábado voy al zoo. Veo un perro y un gato. El tiempo es bonito.",
      exercises: [
        { type: "translateDE", prompt: "Traduce al alemán: 'El sábado voy al zoo.'", answer: "Am Samstag gehe ich in den Zoo", hint: "Empieza con 'Am Samstag...'" },
        { type: "declension", prompt: "¿Cuál es el artículo de 'Hund'?", answer: "der", options: ["der","die","das"] }
      ]
    }
  ],

  getTotalExercises() {
    return this.segments.reduce((sum, seg) => sum + seg.exercises.length, 0);
  }
};

window.PodcastA1_1 = PodcastA1_1;