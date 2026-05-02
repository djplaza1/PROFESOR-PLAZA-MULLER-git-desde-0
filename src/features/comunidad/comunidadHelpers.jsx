// src/features/comunidad/comunidadHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// Definición de ligas
window.Muller.Comunidad.LIGAS = [
  { nombre: "Bronce", minPuntos: 0, color: "bg-amber-700", emoji: "🥉" },
  { nombre: "Plata", minPuntos: 1000, color: "bg-gray-300", emoji: "🥈" },
  { nombre: "Oro", minPuntos: 3000, color: "bg-yellow-500", emoji: "🥇" },
  { nombre: "Diamante", minPuntos: 7000, color: "bg-cyan-400", emoji: "💎" },
];

// Obtener puntos totales del usuario (de rachas, logros, etc.)
window.Muller.Comunidad.getPuntosUsuario = () => {
  const progreso = window.Muller.getAdvancedProgress ? window.Muller.getAdvancedProgress() : {};
  const racha = progreso.streak || 0;
  const logros = progreso.achievements ? progreso.achievements.length : 0;
  const diario = progreso.dailyActivity ? Object.keys(progreso.dailyActivity).length : 0;
  return racha * 10 + logros * 50 + diario * 5;
};

// Obtener liga actual según puntos
window.Muller.Comunidad.getLigaUsuario = (puntos) => {
  const ligas = window.Muller.Comunidad.LIGAS;
  for (let i = ligas.length - 1; i >= 0; i--) {
    if (puntos >= ligas[i].minPuntos) return ligas[i];
  }
  return ligas[0];
};

// Generar ranking con bots
window.Muller.Comunidad.generarRanking = () => {
  const usuario = window.Muller.getUser ? window.Muller.getUser() : { name: "Tú" };
  const puntosUsuario = window.Muller.Comunidad.getPuntosUsuario();
  const nombreUsuario = usuario.name || usuario.email || "Tú";

  const bots = [
    { nombre: "LingüistaBot", puntos: 8500 },
    { nombre: "GramáticaBot", puntos: 6200 },
    { nombre: "VocabMaster", puntos: 4900 },
    { nombre: "Konjunktiv3000", puntos: 3700 },
    { nombre: "Artikeltron", puntos: 2500 },
    { nombre: "PrepoBot", puntos: 1500 },
    { nombre: "A1-Bot", puntos: 800 },
  ];

  const ranking = bots.map(b => ({ nombre: b.nombre, puntos: b.puntos, esUsuario: false }));
  ranking.push({ nombre: nombreUsuario, puntos: puntosUsuario, esUsuario: true });
  ranking.sort((a, b) => b.puntos - a.puntos);
  return ranking;
};

// Simular desafío contra un bot aleatorio
window.Muller.Comunidad.iniciarDesafioBot = () => {
  const bots = ["LingüistaBot", "GramáticaBot", "VocabMaster", "Konjunktiv3000", "Artikeltron", "PrepoBot", "A1-Bot"];
  const oponente = bots[Math.floor(Math.random() * bots.length)];
  const preguntas = [
    { pregunta: "¿Cuál es el artículo de 'Mädchen'?", respuesta: "das" },
    { pregunta: "Traduce 'perro' al alemán", respuesta: "Hund" },
    { pregunta: "¿Qué preposición rige dativo: mit o für?", respuesta: "mit" },
  ];
  return { oponente, preguntas, recompensa: 50 };
};