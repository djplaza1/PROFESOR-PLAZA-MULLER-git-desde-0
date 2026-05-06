// src/features/comunidad/comunidadHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// Definición de ligas
// ─── CLAVES DE ALMACENAMIENTO ───
window.Muller.Comunidad.STORAGE_KEY = 'muller_comunidad_puntos';
window.Muller.Comunidad.HISTORIAL_KEY = 'muller_comunidad_historial';
window.Muller.Comunidad.SEMANA_KEY = 'muller_comunidad_semana';


// ─── BONUS DIARIO ───
window.Muller.Comunidad.BONUS_KEY = 'muller_comunidad_bonus_diario';

window.Muller.Comunidad.reclamarBonusDiario = () => {
  const hoy = new Date().toISOString().slice(0, 10);
  const ultimoBonus = localStorage.getItem(window.Muller.Comunidad.BONUS_KEY) || '';
  if (ultimoBonus === hoy) return { ok: false, msg: 'Ya reclamaste tu bonus hoy. Vuelve mañana.' };
  localStorage.setItem(window.Muller.Comunidad.BONUS_KEY, hoy);
  const nuevosPts = window.Muller.Comunidad.sumarPuntos(20);
  return { ok: true, msg: '¡+20 puntos de bonus diario!', puntos: nuevosPts };
};

// ─── DETECCIÓN DE CAMBIO DE LIGA ───
window.Muller.Comunidad.LIGA_ANTERIOR_KEY = 'muller_comunidad_liga_anterior';

window.Muller.Comunidad.verificarCambioLiga = (puntosActuales) => {
  const ligaActual = window.Muller.Comunidad.getLigaUsuario(puntosActuales);
  const ligaAnteriorNombre = localStorage.getItem(window.Muller.Comunidad.LIGA_ANTERIOR_KEY) || '';
  if (ligaActual.nombre !== ligaAnteriorNombre) {
    localStorage.setItem(window.Muller.Comunidad.LIGA_ANTERIOR_KEY, ligaActual.nombre);
    const subio = window.Muller.Comunidad.LIGAS.findIndex(l => l.nombre === ligaActual.nombre) >
                 window.Muller.Comunidad.LIGAS.findIndex(l => l.nombre === ligaAnteriorNombre);
    return { cambio: true, liga: ligaActual, subio, anterior: ligaAnteriorNombre };
  }
  return { cambio: false, liga: ligaActual };
};

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
  const progreso = (window.Muller.Storage && window.Muller.Storage.loadProgress) ? window.Muller.Storage.loadProgress() : (window.Muller.Progreso && window.Muller.Progreso.getAdvancedProgress ? window.Muller.Progreso.getAdvancedProgress() : {});
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
  const progreso = (window.Muller.Storage && window.Muller.Storage.loadProgress) ? window.Muller.Storage.loadProgress() : (window.Muller.Progreso && window.Muller.Progreso.getAdvancedProgress ? window.Muller.Progreso.getAdvancedProgress() : {});
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
  const userStats = (window.Muller.Storage && window.Muller.Storage.loadProgress) ? window.Muller.Storage.loadProgress() : {};
const usuario = { name: userStats.username || (userStats.email ? userStats.email.split("@")[0] : "Tú") };
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

// ─── Generar preguntas con IA (DeepSeek) o fallback offline ───
window.Muller.Comunidad.generarPreguntasIA = async (nivel, cantidad) => {
  const apiKey = window.Muller?.IA?.getApiKey?.() || window.Muller?.DeepSeek?.getApiKey?.() || '';
  if (apiKey && window.Muller.IA && typeof window.Muller.IA.callRealAI === 'function') {
    try {
      const prompt = `Genera exactamente ${cantidad || 3} preguntas de alemán nivel ${nivel || 'B1'} en formato JSON.
Cada pregunta debe tener: "pregunta" (en español), "respuesta" (en alemán, una palabra o frase corta), "explicacion" (breve regla gramatical en español).
Responde SOLO con un array JSON válido, sin explicaciones adicionales. Ejemplo:
[{"pregunta":"¿Cuál es el artículo de Haus?","respuesta":"das Haus","explicacion":"Haus es neutro (das). La terminación no da pistas, hay que memorizarlo."}]`;
      const respuesta = await window.Muller.IA.callRealAI(prompt);
      const match = respuesta.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) return JSON.parse(match[0]);
    } catch (e) {
      console.warn('[Comunidad] IA falló, usando preguntas offline:', e.message);
    }
  }
  // Fallback offline con preguntas variadas por nivel
  return window.Muller.Comunidad.getPreguntasOffline(nivel, cantidad);
};

// Preguntas offline por nivel (fallback si no hay IA)
window.Muller.Comunidad.getPreguntasOffline = (nivel, cantidad) => {
  const banco = {
    A1: [
      { pregunta: "¿Cuál es el artículo de 'Haus'?", respuesta: "das Haus", explicacion: "Haus es neutro. La terminación no da pistas." },
      { pregunta: "¿Cómo se dice 'mesa' en alemán?", respuesta: "der Tisch", explicacion: "Tisch es masculino (der)." },
      { pregunta: "¿Qué significa 'trinken'?", respuesta: "beber", explicacion: "Verbo regular: ich trinke, du trinkst." },
      { pregunta: "Traduce: 'Yo soy estudiante'", respuesta: "Ich bin Student", explicacion: "Ich = yo, bin = soy, Student = estudiante." },
      { pregunta: "¿Cuál es el plural de 'der Hund'?", respuesta: "die Hunde", explicacion: "La mayoría de masculinos añaden -e en plural." },
    ],
    A2: [
      { pregunta: "¿Qué preposición rige 'mit'?", respuesta: "Dativ", explicacion: "Mit SIEMPRE rige dativo: mit dem Auto." },
      { pregunta: "Forma el Perfekt de 'gehen'", respuesta: "ist gegangen", explicacion: "Gehen usa 'sein' porque es movimiento." },
      { pregunta: "¿Cuál es el artículo de 'Mädchen'?", respuesta: "das Mädchen", explicacion: "Todos los diminutivos en -chen son neutros." },
    ],
    B1: [
      { pregunta: "Forma el Konjunktiv II de 'haben'", respuesta: "hätte", explicacion: "Haben → hätte (ich hätte gern...)." },
      { pregunta: "¿Qué preposición: 'Ich warte ___ den Bus'?", respuesta: "auf", explicacion: "Warten auf + Akkusativ: Ich warte auf den Bus." },
      { pregunta: "Forma una oración con 'obwohl'", respuesta: "Obwohl es regnet, gehe ich spazieren", explicacion: "Obwohl envía el verbo al final de la subordinada." },
    ],
    B2: [
      { pregunta: "¿Qué caso rige 'trotz'?", respuesta: "Genitiv", explicacion: "Trotz + Genitiv: trotz des Regens. En lenguaje coloquial a veces se usa dativo." },
      { pregunta: "Transforma a pasiva: 'Man baut ein Haus'", respuesta: "Ein Haus wird gebaut", explicacion: "Pasiva werden + Partizip II: wird ... gebaut." },
    ],
  };
  const pool = banco[nivel] || banco['B1'];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, cantidad || 3);
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