// src/core/achievements.jsx – Motor de logros globales Premium
window.Muller = window.Muller || {};
window.Muller.Achievements = (() => {
  const STORAGE_KEY = 'muller_achievements';

  // ─── DEFINICIÓN DE LOGROS ───
  const ALL = [
    // Escritura
    { id: 'first_spell_check', title: 'Corrector novato', desc: 'Primera corrección ortográfica', icon: '🔍', category: 'escritura', points: 50 },
    { id: 'writing_10_sessions', title: 'Escriba alemán', desc: '10 sesiones de escritura', icon: '✍️', category: 'escritura', points: 150 },
    { id: 'writing_telc_5', title: 'Candidato TELC', desc: '5 tareas TELC completadas', icon: '📬', category: 'escritura', points: 200 },
    { id: 'writing_dictation_20', title: 'Oído absoluto', desc: '20 dictados completados', icon: '🎧', category: 'escritura', points: 200 },

    // Lectura
    { id: 'reading_5_sessions', title: 'Lector curioso', desc: '5 sesiones de lectura en voz alta', icon: '📖', category: 'lectura', points: 100 },
    { id: 'reading_30_min', title: 'Maratón lector', desc: '30 minutos de lectura acumulados', icon: '⏱️', category: 'lectura', points: 250 },

    // Entrenamiento
    { id: 'training_articles_50', title: 'Artikeltrainer', desc: '50 ejercicios de artículos completados', icon: '📚', category: 'entrenamiento', points: 100 },
    { id: 'training_verbs_30', title: 'Verbenmeister', desc: '30 ejercicios de verbos con preposición', icon: '🔧', category: 'entrenamiento', points: 150 },
    { id: 'training_exam_10', title: 'Examinador', desc: '10 exámenes completados', icon: '📝', category: 'entrenamiento', points: 200 },

    // Vocabulario/SRS
    { id: 'srs_100_words', title: 'Cien palabras', desc: '100 tarjetas SRS revisadas', icon: '🃏', category: 'lexikon', points: 100 },
    { id: 'srs_master_50', title: 'Maestro SRS', desc: '50 palabras dominadas al 100%', icon: '🧠', category: 'lexikon', points: 300 },

    // Rachas
    { id: 'streak_7', title: '7 días de racha', desc: 'Una semana seguida practicando', icon: '🔥', category: 'progreso', points: 100 },
    { id: 'streak_30', title: 'Mes imparable', desc: '30 días seguidos practicando', icon: '💎', category: 'progreso', points: 500 },
    { id: 'streak_100', title: 'Leyenda', desc: '100 días de racha', icon: '👑', category: 'progreso', points: 2000 },

    // Comunidad
    { id: 'ranking_top10', title: 'Top 10', desc: 'Llegar al Top 10 del ranking', icon: '🏆', category: 'comunidad', points: 300 },
    { id: 'first_challenge', title: 'Duelista', desc: 'Primer desafío completado', icon: '⚔️', category: 'comunidad', points: 100 },

    // IA
    { id: 'ia_first_chat', title: 'Herr Müller', desc: 'Primera conversación con la IA', icon: '🤖', category: 'ia', points: 50 },
    { id: 'ia_10_chats', title: 'Contertulio', desc: '10 chats con la IA', icon: '💬', category: 'ia', points: 200 },

    // Biblioteca
    { id: 'bx_first_connect', title: 'Conectado', desc: 'Primera conexión con Box', icon: '🔗', category: 'biblioteca', points: 50 },

    // PDF Study
    { id: 'pdf_first_upload', title: 'PDF Premium', desc: 'Primer PDF cargado', icon: '📄', category: 'pdfstudy', points: 100 },
    { id: 'pdf_5_annotations', title: 'Anotador', desc: '5 anotaciones en PDFs', icon: '🖍️', category: 'pdfstudy', points: 150 },

    // Generales
    { id: 'total_1000_points', title: 'Millenial', desc: '1000 puntos totales', icon: '🌟', category: 'progreso', points: 0 },
    { id: 'total_5000_points', title: 'Sabio', desc: '5000 puntos totales', icon: '🔮', category: 'progreso', points: 0 },
    { id: 'all_categories', title: 'Polímata', desc: 'Actividad en todas las categorías', icon: '🎓', category: 'progreso', points: 500 },
  ];

  // ─── CARGAR / GUARDAR ───
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }
  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ─── API PÚBLICA ───
  return {
    ALL,
    getAll: () => ALL,
    
    getUnlocked: () => {
      const data = load();
      return ALL.filter(a => !!data[a.id]);
    },
    
    isUnlocked: (id) => {
      const data = load();
      return !!data[id];
    },
    
    unlock: (id) => {
      const data = load();
      if (data[id]) return null; // ya desbloqueado
      const achievement = ALL.find(a => a.id === id);
      if (!achievement) return null;
      data[id] = { unlockedAt: new Date().toISOString(), points: achievement.points };
      save(data);
      // Sumar puntos al progreso
      if (achievement.points > 0 && window.Muller.Progreso?.addPoints) {
        window.Muller.Progreso.addPoints(achievement.points);
      }
      // Mostrar toast
      if (window.Muller.Toast?.show) {
        window.Muller.Toast.show(achievement);
      }
      return achievement;
    },
    
    unlockIfEligible: (id, condition) => {
      if (typeof condition === 'function' && !condition()) return null;
      return window.Muller.Achievements.unlock(id);
    },
    
    getProgress: (id) => {
      const data = load();
      return data[id]?.progress || 0;
    },
    
    updateProgress: (id, progress) => {
      const data = load();
      if (!data[id]) data[id] = {};
      data[id].progress = progress;
      save(data);
    },
    
    getCategoryCount: (category) => {
      const data = load();
      return ALL.filter(a => a.category === category && !!data[a.id]).length;
    },
    
    getTotalUnlocked: () => {
      const data = load();
      return ALL.filter(a => !!data[a.id]).length;
    },
    
    getTotalPointsEarned: () => {
      const data = load();
      return ALL.reduce((sum, a) => sum + (data[a.id] ? a.points : 0), 0);
    }
  };
})();
