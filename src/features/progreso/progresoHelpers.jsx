// src/features/progreso/progresoHelpers.jsx
(function() {
  window.Muller = window.Muller || {};
  const M = window.Muller;

  // ─── NAMESPACE M.Progreso ───
  M.Progreso = M.Progreso || {};

  /**
   * Obtener datos completos del dashboard de progreso
   */
  M.Progreso.getDashboardData = function() {
    const advanced = (typeof M.getAdvancedProgress === 'function') ? M.getAdvancedProgress() : {};
    const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
    const today = (typeof M.getTodayISODate === 'function') ? M.getTodayISODate() : new Date().toISOString().slice(0,10);
    const dailyGoal = daily.dailyGoal || 30;
    const todayAttempts = (daily.days && daily.days[today]) || 0;
    const achievements = getAchievementsList();
    const streak = (typeof M.calculateStreak === 'function')
      ? M.calculateStreak(daily.days)
      : calculateStreakLocal(daily.days);

    // Contadores por categoría
    const counters = {
      articles: countMastered(advanced, 'articulos'),
      verbs: countMastered(advanced, 'verbos'),
      prepositions: countMastered(advanced, 'preposiciones'),
    };

    return {
      totalPoints: advanced.points || 0,
      streak: streak || 0,
      wordsLearned: advanced.wordsLearned || 0,
      sessionsCompleted: advanced.sessions || 0,
      articlesMastered: counters.articles,
      verbsMastered: counters.verbs,
      prepositionsMastered: counters.prepositions,
      readingSessions: advanced.readingSessions || 0,
      writingSessions: advanced.writingSessions || 0,
      dailyProgress: Math.min(100, Math.round((todayAttempts / Math.max(1, dailyGoal)) * 100)),
      todayAttempts: todayAttempts,
      dailyGoal: dailyGoal,
      achievements: achievements,
    };
  };

  /**
   * Obtener actividad de los últimos 30 días
   */
  M.Progreso.getLast30DaysActivity = function() {
    const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
    const days = daily.days || {};
    const result = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      result.push({
        date: key,
        count: days[key] || 0,
        dayLabel: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d.getDay()]
      });
    }
    return result;
  };

  /**
   * Obtener estadísticas semanales (últimos 7 días)
   */
  M.Progreso.getWeeklyStats = function() {
    const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
    const days = daily.days || {};
    const result = [];
    const dayNames = ['D','L','M','X','J','V','S'];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      result.push({
        label: dayNames[d.getDay()],
        value: days[key] || 0,
        fullDate: key
      });
    }
    return result;
  };

  /**
   * Calcular perfil (nivel, título, emoji, color)
   */
  M.Progreso.getProfileLevel = function(points) {
    const levels = [
      { min: 0, level: 1, title: 'Anfänger', emoji: '🌱', color: 'bg-gray-600' },
      { min: 500, level: 2, title: 'Schüler', emoji: '📘', color: 'bg-blue-600' },
      { min: 1200, level: 3, title: 'Sprachlerner', emoji: '📗', color: 'bg-green-600' },
      { min: 2500, level: 4, title: 'Forscher', emoji: '🔍', color: 'bg-teal-600' },
      { min: 5000, level: 5, title: 'Entdecker', emoji: '🧭', color: 'bg-cyan-600' },
      { min: 10000, level: 6, title: 'Meister', emoji: '⚡', color: 'bg-purple-600' },
      { min: 20000, level: 7, title: 'Experte', emoji: '🌟', color: 'bg-amber-600' },
      { min: 40000, level: 8, title: 'Sprachheld', emoji: '🏆', color: 'bg-rose-600' },
      { min: 100000, level: 9, title: 'Legende', emoji: '👑', color: 'bg-yellow-500' },
    ];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].min) return levels[i];
    }
    return levels[0];
  };

  // ─── Sincronización Cloud ───

  /**
   * Guardar progreso en la nube (Supabase user_progress)
   */
  M.Progreso.syncProgressToCloud = async function() {
    try {
      const data = M.Progreso.getDashboardData();
      const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
      const payload = {
        points: data.totalPoints,
        streak: data.streak,
        wordsLearned: data.wordsLearned,
        sessions: data.sessionsCompleted,
        articlesMastered: data.articlesMastered,
        verbsMastered: data.verbsMastered,
        prepositionsMastered: data.prepositionsMastered,
        readingSessions: data.readingSessions,
        writingSessions: data.writingSessions,
        dailyActivity: daily,
        lastUpdated: new Date().toISOString(),
      };

      if (typeof M.saveToCloud === 'function') {
        return await M.saveToCloud('user_progress', payload);
      }
      return { ok: false, reason: 'saveToCloud no disponible' };
    } catch (e) {
      console.error('syncProgressToCloud error:', e);
      return { ok: false, reason: e.message };
    }
  };

  /**
   * Descargar progreso desde la nube (Supabase user_progress)
   */
  M.Progreso.pullProgressFromCloud = async function() {
    try {
      if (typeof M.loadFromCloud !== 'function') {
        return { ok: false, reason: 'loadFromCloud no disponible' };
      }
      const cloudData = await M.loadFromCloud('user_progress');
      if (cloudData) {
        return { ok: true, data: cloudData };
      }
      return { ok: true, data: null };
    } catch (e) {
      console.error('pullProgressFromCloud error:', e);
      return { ok: false, reason: e.message };
    }
  };

  // ========== FUNCIONES INTERNAS ==========

  function calculateStreakLocal(daysMap) {
    let streak = 0;
    const today = new Date().toISOString().slice(0,10);
    const map = daysMap || {};
    let d = new Date(today);
    while (true) {
      const key = d.toISOString().slice(0,10);
      if (map[key]) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  }

  function countMastered(progress, prefix) {
    if (!progress || typeof progress !== 'object') return 0;
    return Object.entries(progress)
      .filter(function(e) { return e[0].startsWith(prefix + '::') && (e[1] >= 3); })
      .length;
  }

  function getAchievementsList() {
    try {
      const raw = (typeof M.getAchievementsUnlocked === 'function')
        ? M.getAchievementsUnlocked()
        : JSON.parse(localStorage.getItem(M.KEYS?.ACHIEVEMENTS || 'muller_achievements') || '{}');
      if (Array.isArray(raw)) return raw;
      if (typeof raw === 'object' && raw !== null) {
        return Object.values(raw).filter(function(v) { return v && v.name; });
      }
      return [];
    } catch (e) {
      return [];
    }
  }

})();