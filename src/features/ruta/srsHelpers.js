// srsHelpers.js – Progreso del usuario, repaso espaciado (SM-2), rachas y ranking
// Utiliza localStorage para persistencia.

const SRSHelpers = {
  STORAGE_KEY: 'muller_ruta_progress',

  // ── Progreso por defecto ──
  getDefaultProgress() {
    return {
      completed: {},
      wordSRS: {},
      streak: 0,
      lastStudyDate: null,
      xp: 0,
      coins: 0
    };
  },

  // ── Cargar progreso desde localStorage ──
  loadProgress() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch(e) {
      console.warn('Error cargando progreso', e);
    }
    return this.getDefaultProgress();
  },

  // ── Guardar progreso ──
  saveProgress(progress) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch(e) {
      console.warn('Error guardando progreso', e);
    }
  },

  // ── Actualizar SRS para una palabra (existente) ──
  updateWordSRS(progress, word, exerciseType, correct) {
    if (!progress.wordSRS[word]) {
      progress.wordSRS[word] = {
        ef: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: null,
        correct: 0,
        incorrect: 0,
        lastReview: null,
        firstSeen: Date.now()
      };
    }
    const srs = progress.wordSRS[word];
    if (correct) {
      srs.correct++;
      if (srs.repetitions === 0) {
        srs.interval = 1;
      } else if (srs.repetitions === 1) {
        srs.interval = 6;
      } else {
        srs.interval = Math.round(srs.interval * srs.ef);
      }
      srs.repetitions++;
    } else {
      srs.incorrect++;
      srs.repetitions = 0;
      srs.interval = 1;
    }
    srs.ef = Math.max(1.3, srs.ef + (0.1 - (1 - 0.1) * (correct ? 0 : 1)));
    srs.lastReview = Date.now();
    srs.nextReview = Date.now() + srs.interval * 24 * 60 * 60 * 1000;
    return progress;
  },

  // ── Obtener palabras que toca repasar hoy ──
  getDueWords(progress, levelId) {
    const now = Date.now();
    const dueWords = [];
    for (const [word, srs] of Object.entries(progress.wordSRS)) {
      if (srs.nextReview && srs.nextReview <= now) {
        dueWords.push({ word, srs });
      }
    }
    return dueWords;
  },

  // ── Obtener palabras para repasar en la lección ──
  getWordsToReview(progress, levelId, count) {
    const dueWords = this.getDueWords(progress, levelId);
    // Filtrar solo palabras del nivel si levelId está definido
    const vocab = window.Muller?.Ruta?.VOCAB?.[levelId] || [];
    const levelWords = new Set(vocab.map(w => w[0]));
    const filtered = levelId ? dueWords.filter(dw => levelWords.has(dw.word)) : dueWords;
    // Ordenar por las que tienen más fallos y menos repasos
    filtered.sort((a, b) => {
      const scoreA = (a.srs.incorrect || 0) * 2 - (a.srs.correct || 0);
      const scoreB = (b.srs.incorrect || 0) * 2 - (b.srs.correct || 0);
      return scoreB - scoreA;
    });
    return filtered.slice(0, count);
  },

  // ── Actualizar racha ──
  updateStreak(progress) {
    const today = new Date().toDateString();
    if (progress.lastStudyDate === today) return progress;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (progress.lastStudyDate === yesterday) {
      progress.streak++;
    } else {
      progress.streak = 1;
    }
    progress.lastStudyDate = today;
    return progress;
  },

  // ── Obtener ranking a partir de XP ──
  getRank(xp) {
    const ranks = [
      { name: 'Anfänger', minXp: 0, emoji: '🌱' },
      { name: 'Sprachschüler', minXp: 100, emoji: '🌿' },
      { name: 'Wörtersammler', minXp: 500, emoji: '📚' },
      { name: 'Satzbaumeister', minXp: 1000, emoji: '🏗️' },
      { name: 'Grammatikguru', minXp: 2000, emoji: '🧠' },
      { name: 'Konversationsprofi', minXp: 3500, emoji: '💬' },
      { name: 'Sprachkünstler', minXp: 5000, emoji: '🎨' },
      { name: 'Deutschmeister', minXp: 7500, emoji: '🏆' },
      { name: 'Müller-Platin', minXp: 10000, emoji: '💎' }
    ];
    return ranks.filter(r => xp >= r.minXp).pop() || ranks[0];
  }
};

// Exponer globalmente
window.SRSHelpers = SRSHelpers;