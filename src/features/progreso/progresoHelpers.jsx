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

  // ─── TIEMPO ACTIVO DE ESTUDIO (PUNTO 2) ───

  /**
   * Registrar tiempo de estudio activo en segundos para la fecha actual
   * @param {number} seconds - Segundos a añadir
   */
  M.Progreso.logActiveTime = function(seconds) {
    try {
      const key = M.KEYS?.ACTIVE_TIME || 'muller_active_time_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const today = new Date().toISOString().slice(0,10);
      data[today] = (data[today] || 0) + Math.round(seconds);
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('logActiveTime error:', e);
      return false;
    }
  };

  /**
   * Obtener tiempo activo de hoy en segundos
   */
  M.Progreso.getTodayActiveTime = function() {
    try {
      const key = M.KEYS?.ACTIVE_TIME || 'muller_active_time_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const today = new Date().toISOString().slice(0,10);
      return data[today] || 0;
    } catch (e) {
      return 0;
    }
  };

  /**
   * Obtener tiempo activo de los últimos N días (array con date, seconds)
   */
  M.Progreso.getActiveTimeHistory = function(days = 30) {
    try {
      const key = M.KEYS?.ACTIVE_TIME || 'muller_active_time_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const result = [];
      const today = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().slice(0,10);
        result.push({
          date: dateKey,
          seconds: data[dateKey] || 0,
        });
      }
      return result;
    } catch (e) {
      return [];
    }
  };

  /**
   * Formatear segundos a string legible (ej: "1h 23m" o "45m" o "12s")
   */
  M.Progreso.formatActiveTime = function(totalSeconds) {
    if (!totalSeconds || totalSeconds <= 0) return '0m';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  };

  /**
   * Obtener tiempo total de estudio (todo el histórico)
   */
  M.Progreso.getTotalActiveTime = function() {
    try {
      const key = M.KEYS?.ACTIVE_TIME || 'muller_active_time_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      return Object.values(data).reduce(function(sum, s) { return sum + s; }, 0);
    } catch (e) {
      return 0;
    }
  };

  // ─── PLAZA MÜNZEN (SISTEMA DE MONEDAS) ───

  /**
   * Obtener saldo actual de Plaza Münzen
   */
  M.Progreso.getPlazaMuenzen = function() {
    try {
      const key = M.KEYS?.PLAZA_MUENZEN || 'muller_plaza_muenzen_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      return data.balance || 0;
    } catch (e) {
      return 0;
    }
  };

  /**
   * Añadir monedas al saldo
   * @param {number} amount - Cantidad a añadir
   * @param {string} reason - Razón (para historial)
   */
  M.Progreso.addPlazaMuenzen = function(amount, reason) {
    try {
      const key = M.KEYS?.PLAZA_MUENZEN || 'muller_plaza_muenzen_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      data.balance = (data.balance || 0) + Math.round(amount);
      data.history = data.history || [];
      data.history.push({
        type: 'earn',
        amount: Math.round(amount),
        reason: reason || 'Recompensa',
        date: new Date().toISOString(),
      });
      // Mantener solo últimas 50 transacciones
      if (data.history.length > 50) data.history = data.history.slice(-50);
      localStorage.setItem(key, JSON.stringify(data));
      return data.balance;
    } catch (e) {
      console.error('addPlazaMuenzen error:', e);
      return 0;
    }
  };

  /**
   * Gastar monedas
   * @param {number} amount - Cantidad a gastar
   * @param {string} item - Artículo comprado
   */
  M.Progreso.spendPlazaMuenzen = function(amount, item) {
    try {
      const key = M.KEYS?.PLAZA_MUENZEN || 'muller_plaza_muenzen_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const balance = data.balance || 0;
      if (balance < amount) return { ok: false, reason: 'Saldo insuficiente' };
      data.balance = balance - Math.round(amount);
      data.history = data.history || [];
      data.history.push({
        type: 'spend',
        amount: Math.round(amount),
        reason: 'Compra: ' + (item || 'Artículo'),
        date: new Date().toISOString(),
      });
      if (data.history.length > 50) data.history = data.history.slice(-50);
      localStorage.setItem(key, JSON.stringify(data));
      return { ok: true, balance: data.balance };
    } catch (e) {
      console.error('spendPlazaMuenzen error:', e);
      return { ok: false, reason: e.message };
    }
  };

  /**
   * Obtener historial de transacciones de monedas
   */
  M.Progreso.getPlazaMuenzenHistory = function() {
    try {
      const key = M.KEYS?.PLAZA_MUENZEN || 'muller_plaza_muenzen_v1';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      return (data.history || []).reverse();
    } catch (e) {
      return [];
    }
  };

  // ─── MISIONES DIARIAS/SEMANALES/MENSUALES (PUNTO 3) ───

  /**
   * Pool de misiones generadas proceduralmente según el progreso del usuario
   */
  function generateMissionPool() {
    const advanced = (typeof M.getAdvancedProgress === 'function') ? M.getAdvancedProgress() : {};
    const points = advanced.points || 0;
    const streak = M.Progreso.getDashboardData().streak || 0;
    const todayTime = M.Progreso.getTodayActiveTime();
    const totalTime = M.Progreso.getTotalActiveTime();

    const pool = [];

    // Diarias (siempre disponibles, se refrescan cada día)
    pool.push({
      id: 'daily_active_15m',
      type: 'daily',
      label: 'Estudiar 15 minutos',
      description: 'Acumula 15 minutos de estudio activo hoy',
      icon: 'clock',
      check: function() { return todayTime >= 900; },
      reward: { points: 50 },
    });
    pool.push({
      id: 'daily_active_30m',
      type: 'daily',
      label: 'Estudiar 30 minutos',
      description: 'Acumula 30 minutos de estudio activo hoy',
      icon: 'clock',
      check: function() { return todayTime >= 1800; },
      reward: { points: 100 },
    });
    pool.push({
      id: 'daily_3_sessions',
      type: 'daily',
      label: '3 sesiones de estudio',
      description: 'Completa 3 ejercicios o actividades hoy',
      icon: 'zap',
      check: function() {
        const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
        const today = (typeof M.getTodayISODate === 'function') ? M.getTodayISODate() : new Date().toISOString().slice(0,10);
        return (daily.days && daily.days[today] || 0) >= 3;
      },
      reward: { points: 75 },
    });
    pool.push({
      id: 'daily_vocab_5',
      type: 'daily',
      label: '5 palabras nuevas',
      description: 'Aprende o repasa 5 palabras de vocabulario',
      icon: 'bookOpen',
      check: function() {
        if (typeof M.getVocabSrsMap === 'function') {
          const map = M.getVocabSrsMap();
          const today = new Date().toISOString().slice(0,10);
          return Object.values(map).filter(function(v) {
            return v.lastReviewed && v.lastReviewed.startsWith(today);
          }).length >= 5;
        }
        return false;
      },
      reward: { points: 60 },
    });

    // Semanales
    pool.push({
      id: 'weekly_3h',
      type: 'weekly',
      label: '3 horas de estudio',
      description: 'Acumula 3 horas de estudio esta semana',
      icon: 'trendingUp',
      check: function() {
        const history = M.Progreso.getActiveTimeHistory(7);
        return history.reduce(function(sum, d) { return sum + d.seconds; }, 0) >= 10800;
      },
      reward: { points: 300 },
    });
    pool.push({
      id: 'weekly_5_streak',
      type: 'weekly',
      label: 'Racha de 5 días',
      description: 'Mantén una racha de 5 días seguidos de estudio',
      icon: 'flame',
      check: function() { return streak >= 5; },
      reward: { points: 200 },
    });
    pool.push({
      id: 'weekly_20_exercises',
      type: 'weekly',
      label: '20 ejercicios',
      description: 'Completa 20 ejercicios en la semana',
      icon: 'zap',
      check: function() {
        const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
        const days = daily.days || {};
        const today = new Date();
        let total = 0;
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0,10);
          total += days[key] || 0;
        }
        return total >= 20;
      },
      reward: { points: 250 },
    });

    // Mensuales (basadas en hitos)
    if (points >= 1000) {
      pool.push({
        id: 'monthly_1000_points',
        type: 'monthly',
        label: 'Llegar a 1000 puntos',
        description: 'Alcanza los 1000 puntos de experiencia',
        icon: 'award',
        check: function() { return points >= 1000; },
        reward: { points: 500 },
      });
    }
    if (totalTime >= 36000) { // 10 horas
      pool.push({
        id: 'monthly_10h',
        type: 'monthly',
        label: '10 horas de estudio',
        description: 'Acumula 10 horas totales de estudio',
        icon: 'clock',
        check: function() { return totalTime >= 36000; },
        reward: { points: 400 },
      });
    }
    if (streak >= 7) {
      pool.push({
        id: 'monthly_7_streak',
        type: 'monthly',
        label: 'Racha de 7 días',
        description: 'Mantén una racha de 7 días seguidos',
        icon: 'flame',
        check: function() { return streak >= 7; },
        reward: { points: 350 },
      });
    }

    return pool;
  }

  /**
   * Obtener misiones disponibles (no completadas hoy/semana/mes)
   */
  M.Progreso.getMissions = function() {
    try {
      const key = M.KEYS?.CLAIMED_REWARDS || 'muller_claimed_rewards_v1';
      const claimed = JSON.parse(localStorage.getItem(key) || '{}');
      const today = new Date().toISOString().slice(0,10);
      const weekStart = getWeekStart();

      const pool = generateMissionPool();
      return pool.filter(function(m) {
        const claimKey = m.id + '_' + (m.type === 'daily' ? today : m.type === 'weekly' ? weekStart : new Date().toISOString().slice(0,7));
        return !claimed[claimKey];
      });
    } catch (e) {
      console.error('getMissions error:', e);
      return [];
    }
  };

  /**
   * Reclamar recompensa de una misión
   */
  M.Progreso.claimMissionReward = function(missionId) {
    try {
      const pool = generateMissionPool();
      const mission = pool.find(function(m) { return m.id === missionId; });
      if (!mission) return { ok: false, reason: 'Misión no encontrada' };
      if (!mission.check()) return { ok: false, reason: 'Misión no completada aún' };

      const claimKey = M.KEYS?.CLAIMED_REWARDS || 'muller_claimed_rewards_v1';
      const claimed = JSON.parse(localStorage.getItem(claimKey) || '{}');

      const today = new Date().toISOString().slice(0,10);
      const weekStart = getWeekStart();
      const periodKey = mission.type === 'daily' ? today : mission.type === 'weekly' ? weekStart : new Date().toISOString().slice(0,7);
      const claimId = mission.id + '_' + periodKey;

      if (claimed[claimId]) return { ok: false, reason: 'Ya reclamada' };

      // Dar puntos
      const advanced = (typeof M.getAdvancedProgress === 'function') ? M.getAdvancedProgress() : {};
      advanced.points = (advanced.points || 0) + mission.reward.points;
      if (typeof M.setAdvancedProgress === 'function') {
        M.setAdvancedProgress(advanced);
      } else {
        localStorage.setItem(M.KEYS?.ADVANCED_PROGRESS || 'muller_advanced_progress', JSON.stringify(advanced));
      }

      // Marcar como reclamada
      claimed[claimId] = { claimedAt: new Date().toISOString(), reward: mission.reward };
      localStorage.setItem(claimKey, JSON.stringify(claimed));

      return { ok: true, mission: mission, pointsAwarded: mission.reward.points };
    } catch (e) {
      console.error('claimMissionReward error:', e);
      return { ok: false, reason: e.message };
    }
  };

  /**
   * Obtener historial de recompensas reclamadas (últimas 20)
   */
  M.Progreso.getClaimedRewards = function() {
    try {
      const key = M.KEYS?.CLAIMED_REWARDS || 'muller_claimed_rewards_v1';
      const claimed = JSON.parse(localStorage.getItem(key) || '{}');
      return Object.entries(claimed)
        .map(function(e) { return { id: e[0], ...e[1] }; })
        .sort(function(a, b) { return new Date(b.claimedAt) - new Date(a.claimedAt); })
        .slice(0, 20);
    } catch (e) {
      return [];
    }
  };

  // ─── FUNCIONES AUXILIARES ───

  /**
   * Obtener el inicio de la semana actual (lunes) como string YYYY-MM-DD
   */
  function getWeekStart() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // lunes = 0
    const monday = new Date(now);
    monday.setDate(now.getDate() - diff);
    return monday.toISOString().slice(0,10);
  }

  // ─── Sincronización Cloud ───

  /**
   * Guardar progreso en la nube (Supabase user_progress)
   */
  M.Progreso.syncProgressToCloud = async function() {
    try {
      const data = M.Progreso.getDashboardData();
      const daily = (typeof M.getDailyActivity === 'function') ? M.getDailyActivity() : {};
      const activeTime = M.Progreso.getActiveTimeHistory(30);
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
        activeTime: activeTime,
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