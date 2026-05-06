// src/features/comunidad/comunidadHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// Definición de ligas
// ─── CLAVES DE ALMACENAMIENTO ───
window.Muller.Comunidad.STORAGE_KEY = 'muller_comunidad_puntos';
window.Muller.Comunidad.HISTORIAL_KEY = 'muller_comunidad_historial';
window.Muller.Comunidad.SEMANA_KEY = 'muller_comunidad_semana';

// Obtener número de semana ISO
window.Muller.Comunidad.getSemanaISO = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
};

// Puntos persistentes (se acumulan con desafíos, rachas, etc.)
window.Muller.Comunidad.getPuntosPersistentes = () => {
  try {
    const data = JSON.parse(localStorage.getItem(window.Muller.Comunidad.STORAGE_KEY) || '{}');
    const semana = window.Muller.Comunidad.getSemanaISO();
    return data[semana] || 0;
  } catch (e) { return 0; }
};

window.Muller.Comunidad.sumarPuntos = (cantidad) => {
  try {
    const data = JSON.parse(localStorage.getItem(window.Muller.Comunidad.STORAGE_KEY) || '{}');
    const semana = window.Muller.Comunidad.getSemanaISO();
    data[semana] = (data[semana] || 0) + cantidad;
    localStorage.setItem(window.Muller.Comunidad.STORAGE_KEY, JSON.stringify(data));
    // Guardar historial de transacciones
    const hist = JSON.parse(localStorage.getItem(window.Muller.Comunidad.HISTORIAL_KEY) || '[]');
    hist.push({ fecha: new Date().toISOString(), puntos: cantidad, semana });
    localStorage.setItem(window.Muller.Comunidad.HISTORIAL_KEY, JSON.stringify(hist.slice(-50)));
    return data[semana];
  } catch (e) { return 0; }
};

// Obtener puntos totales del usuario (combinando persistente + progreso)
window.Muller.Comunidad.getPuntosUsuario = () => {
  const ptsPersistentes = window.Muller.Comunidad.getPuntosPersistentes();
  const progreso = window.Muller.getAdvancedProgress ? window.Muller.getAdvancedProgress() : {};
  const racha = progreso.streak || 0;
  const logros = progreso.achievements ? progreso.achievements.length : 0;
  const diario = progreso.dailyActivity ? Object.keys(progreso.dailyActivity).length : 0;
  return ptsPersistentes + racha * 10 + logros * 50 + diario * 5;
};

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

  const semana = window.Muller.Comunidad.getSemanaISO();
  const seed = semana * 7 + 2024; // semilla determinista para la semana
  const pseudoRandom = (min, max, offset) => {
    const x = Math.sin(seed + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1) + min);
  };
  const bots = [
    { nombre: "LingüistaBot", puntos: pseudoRandom(7500, 9500, 1) },
    { nombre: "GramáticaBot", puntos: pseudoRandom(5500, 7000, 2) },
    { nombre: "VocabMaster", puntos: pseudoRandom(4200, 5500, 3) },
    { nombre: "Konjunktiv3000", puntos: pseudoRandom(3200, 4500, 4) },
    { nombre: "Artikeltron", puntos: pseudoRandom(2000, 3500, 5) },
    { nombre: "PrepoBot", puntos: pseudoRandom(1200, 2200, 6) },
    { nombre: "A1-Bot", puntos: pseudoRandom(500, 1200, 7) },
    { nombre: "B1-Bot", puntos: pseudoRandom(1800, 2800, 8) },
    { nombre: "GenitivBot", puntos: pseudoRandom(3800, 5000, 9) },
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