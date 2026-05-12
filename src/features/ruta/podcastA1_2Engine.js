const PodcastA1_2 = {
  title: "Willkommen bei Müllers",
  segments: [
    {
      audioText: "Guten Morgen! Ich heiße Thomas und wohne in einem kleinen Dorf. Ich arbeite als Bäcker.",
      translation: "¡Buenos días! Me llamo Thomas y vivo en un pueblo pequeño. Trabajo de panadero.",
      exercises: [
        { type: "choose", prompt: "¿Dónde vive Thomas?", answer: "in einem kleinen Dorf", options: ["in einer Großstadt", "in einem kleinen Dorf", "in einem Vorort", "in einem Schloss"] },
        { type: "fillInSentence", prompt: "Completa: 'Thomas arbeitet als ___ .'", answer: "Bäcker", options: ["Bäcker", "Lehrer", "Arzt", "Schneider"] }
      ]
    },
    {
      audioText: "Am Morgen stehe ich um sechs Uhr auf. Zuerst putze ich mir die Zähne und dann frühstücke ich.",
      translation: "Por la mañana me levanto a las seis. Primero me lavo los dientes y luego desayuno.",
      exercises: [
        { type: "order", prompt: "Ordena: 'auf / stehe / ich / um / sechs / Uhr'", answer: "Ich stehe um sechs Uhr auf", hint: "Empieza con Ich" },
        { type: "translateDE", prompt: "Traduce: 'Me lavo los dientes.'", answer: "Ich putze mir die Zähne", hint: "Ich putze..." }
      ]
    },
    {
      audioText: "Im Badezimmer benutze ich einen Rasierer und Zahnseide. Meine Dusche ist sehr modern.",
      translation: "En el baño uso una afeitadora e hilo dental. Mi ducha es muy moderna.",
      exercises: [
        { type: "declension", prompt: "Artículo de 'Dusche' es:", answer: "die", options: ["der","die","das"] },
        { type: "choose", prompt: "¿Qué usa en el baño?", answer: "Rasierer und Zahnseide", options: ["Kamm und Seife","Rasierer und Zahnseide","Handtuch und Creme","Spiegel und Bürste"] }
      ]
    },
    {
      audioText: "Meine Frau näht gerne Kleider. Sie kann auch sehr gut kochen und backen.",
      translation: "A mi mujer le gusta coser vestidos. También sabe cocinar y hornear muy bien.",
      exercises: [
        { type: "fillInSentence", prompt: "Completa: 'Meine Frau ___ gerne Kleider.'", answer: "näht", options: ["näht","wäscht","kauft","trägt"] },
        { type: "translateES", prompt: "Traduce al español: 'Sie kann sehr gut kochen.'", answer: "Ella sabe cocinar muy bien", hint: "Pista: cocina bien." }
      ]
    },
    {
      audioText: "Heute Nachmittag gehe ich in den Supermarkt. Wir brauchen frisches Brot, Butter und vielleicht eine Torte.",
      translation: "Esta tarde voy al supermercado. Necesitamos pan fresco, mantequilla y quizás una tarta.",
      exercises: [
        { type: "order", prompt: "Ordena: 'Brot / Butter / und / brauche / ich / frisches'", answer: "Ich brauche frisches Brot und Butter", hint: "Empieza con Ich" },
        { type: "choose", prompt: "¿Qué quiere comprar además?", answer: "eine Torte", options: ["eine Wurst","eine Torte","einen Käse","einen Schinken"] }
      ]
    },
    {
      audioText: "Am Abend schaue ich fern oder lese ein Buch. Manchmal mache ich einen Spaziergang im Wald.",
      translation: "Por la noche veo la tele o leo un libro. A veces doy un paseo por el bosque.",
      exercises: [
        { type: "conjugate", prompt: "Conjuga 'lesen' para 'ich':", answer: "lese", hint: "ich lese" },
        { type: "translateDE", prompt: "Traduce al alemán: 'Doy un paseo.'", answer: "Ich mache einen Spaziergang", hint: "Ich mache..." }
      ]
    }
  ]
};
window.PodcastA1_2 = PodcastA1_2;