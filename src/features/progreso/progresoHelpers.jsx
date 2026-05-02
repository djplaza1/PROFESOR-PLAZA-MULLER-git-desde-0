// src/features/progreso/progresoHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Progreso = window.Muller.Progreso || {};

// Obtener todos los datos de progreso combinados
window.Muller.Progreso.getDashboardData = () => {
  const advanced = (typeof window.Muller.getAdvancedProgress === 'function')
    ? window.Muller.getAdvancedProgress() : {};
  const daily = (typeof window.Muller.getDailyActivity === 'function')
    ? window.Muller.getDailyActivity() : {};
  const streak = (typeof window.Muller.calculateStreak === 'function')
    ? window.Muller.calculateStreak() : 0;
  const achievements = (typeof window.Muller.getAchievementsUnlocked === 'function')
    ? window.Muller.getAchievementsUnlocked() : [];
  const counts = (typeof window.Muller.getProgressCounts === 'function')
    ? window.Muller.getProgressCounts() : {};

  // Simular datos si no hay nada
  return {
    streak: streak || 0,
    totalPoints: (counts.total || 0) + (advanced.points || 0),
    achievements: achievements || [],
    dailyActivity: daily || {},
    wordsLearned: counts.words || advanced.wordsLearned || 0,
    sessionsCompleted: counts.sessions || advanced.sessions || 0,
    articlesMastered: counts.articles || 0,
    verbsMastered: counts.verbs || 0,
    prepositionsMastered: counts.prepositions || 0,
    readingSessions: counts.reading || advanced.readingSessions || 0,
    writingSessions: counts.writing || advanced.writingSessions || 0,
    lastActive: advanced.lastActive || null,
  };
};

// Obtener actividad de los últimos 30 días como array
window.Muller.Progreso.getLast30DaysActivity = () => {
  const daily = (typeof window.Muller.getDailyActivity === 'function')
    ? window.Muller.getDailyActivity() : {};
  const days = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = daily[key] || 0;
    days.push({ date: key, count, day: d.getDate(), month: d.getMonth() + 1, weekday: d.getDay() });
  }
  return days;
};

// Calcular nivel de perfil basado en puntos
window.Muller.Progreso.getProfileLevel = (points) => {
  if (points >= 10000) return { level: 25, title: 'Maestro del Alemán', color: 'bg-gradient-to-r from-yellow-400 to-amber-500', emoji: '👑' };
  if (points >= 7000) return { level: 20, title: 'Experto Políglota', color: 'bg-gradient-to-r from-purple-400 to-pink-500', emoji: '🎓' };
  if (points >= 5000) return { level: 15, title: 'Avanzado Destacado', color: 'bg-gradient-to-r from-blue-400 to-cyan-500', emoji: '⭐' };
  if (points >= 3000) return { level: 10, title: 'Intermedio Superior', color: 'bg-gradient-to-r from-green-400 to-emerald-500', emoji: '📘' };
  if (points >= 1500) return { level: 5, title: 'Intermedio', color: 'bg-gradient-to-r from-teal-400 to-cyan-500', emoji: '📗' };
  if (points >= 500) return { level: 3, title: 'Principiante Avanzado', color: 'bg-gradient-to-r from-orange-400 to-amber-500', emoji: '📙' };
  return { level: 1, title: 'Principiante', color: 'bg-gradient-to-r from-gray-400 to-slate-500', emoji: '📕' };
};

// Estadísticas semanales simuladas para gráfico
window.Muller.Progreso.getWeeklyStats = () => {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const daily = window.Muller.Progreso.getLast30DaysActivity();
  const last7 = daily.slice(-7);
  return last7.map((d, i) => ({
    label: days[d.weekday === 0 ? 6 : d.weekday - 1],
    value: d.count,
    date: d.date,
  }));
};