// src/features/escritura/writing-data.jsx
// Datos complementarios para la pestaña Escritura
// Los arrays principales (WRITING_COPY_DRILLS, WRITING_PROMPTS_DE, WRITING_TELC_TASKS)
// ya están en escrituraHelpers.jsx

(function() {
  const E = window.Muller.Escritura = window.Muller.Escritura || {};

  // ─── Dictado integrado (líneas adicionales) ───
  E.WRITING_DICTATION_LINES = [
    { de: "Guten Tag, ich habe eine Frage.", es: "Buenos días, tengo una pregunta." },
    { de: "Der Schlüssel liegt auf dem Tisch.", es: "La llave está sobre la mesa." },
    { de: "Wir treffen uns um acht Uhr.", es: "Quedamos a las ocho." },
    { de: "Ich freue mich auf das Wochenende.", es: "Me alegro por el fin de semana." },
    { de: "Das Museum ist heute geschlossen.", es: "El museo está cerrado hoy." }
  ];

  // ─── Letras alemanas para practicar ───
  E.LETTER_DRILLS = [
    { title: "Umlaute Ä Ö Ü und ß", sample: "Äpfel · Öl · Über · Straße", practice: "Äpfel Öl Über Straße" },
    { title: "Alltag", sample: "schön · müde · hören · groß", practice: "Schön müde hören groß" },
    { title: "Satzanfang", sample: "Großschreibung: Ich, Du, Der, Die", practice: "Ich lerne Deutsch jeden Tag." }
  ];
})();