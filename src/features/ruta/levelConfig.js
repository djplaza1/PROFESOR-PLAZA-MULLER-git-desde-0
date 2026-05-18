// levelConfig.js — Configuración de los 12 niveles oficiales MCER
// Datos calculados a partir de 6515 palabras únicas deduplicadas.
// Total lecciones: 374. Incluye examen final por nivel.

const LEVEL_CONFIG = [
  { id: 'A1.1', badge: 'A1.1', title: 'Primeros pasos',
    words: 394, wordsPerLesson: 12, lessons: 33,
    testQuestions: 20, passPercent: 70,
    rewardCoins: 10, rewardXp: 15, testRewardCoins: 50, testRewardXp: 100 },

  { id: 'A1.2', badge: 'A1.2', title: 'Primera rutina',
    words: 1263, wordsPerLesson: 15, lessons: 85,
    testQuestions: 20, passPercent: 70,
    rewardCoins: 12, rewardXp: 18, testRewardCoins: 60, testRewardXp: 120 },

  { id: 'A2.1', badge: 'A2.1', title: 'Viajes y transporte',
    words: 391, wordsPerLesson: 15, lessons: 27,
    testQuestions: 20, passPercent: 70,
    rewardCoins: 15, rewardXp: 20, testRewardCoins: 70, testRewardXp: 140 },

  { id: 'A2.2', badge: 'A2.2', title: 'Salud y emociones',
    words: 987, wordsPerLesson: 18, lessons: 55,
    testQuestions: 20, passPercent: 70,
    rewardCoins: 18, rewardXp: 22, testRewardCoins: 80, testRewardXp: 160 },

  { id: 'B1.1', badge: 'B1.1', title: 'Trabajo y economía',
    words: 461, wordsPerLesson: 18, lessons: 26,
    testQuestions: 25, passPercent: 75,
    rewardCoins: 20, rewardXp: 25, testRewardCoins: 100, testRewardXp: 180 },

  { id: 'B1.2', badge: 'B1.2', title: 'Sociedad y cultura',
    words: 756, wordsPerLesson: 20, lessons: 38,
    testQuestions: 25, passPercent: 75,
    rewardCoins: 22, rewardXp: 28, testRewardCoins: 110, testRewardXp: 200 },

  { id: 'B2.1', badge: 'B2.1', title: 'Economía',
    words: 360, wordsPerLesson: 20, lessons: 18,
    testQuestions: 25, passPercent: 75,
    rewardCoins: 25, rewardXp: 30, testRewardCoins: 120, testRewardXp: 220 },

  { id: 'B2.2', badge: 'B2.2', title: 'Relaciones',
    words: 939, wordsPerLesson: 22, lessons: 43,
    testQuestions: 25, passPercent: 75,
    rewardCoins: 28, rewardXp: 32, testRewardCoins: 130, testRewardXp: 240 },

  { id: 'C1.1', badge: 'C1.1', title: 'Precisión formal',
    words: 420, wordsPerLesson: 22, lessons: 20,
    testQuestions: 30, passPercent: 80,
    rewardCoins: 30, rewardXp: 40, testRewardCoins: 150, testRewardXp: 280 },

  { id: 'C1.2', badge: 'C1.2', title: 'Maestría',
    words: 449, wordsPerLesson: 22, lessons: 21,
    testQuestions: 30, passPercent: 80,
    rewardCoins: 32, rewardXp: 42, testRewardCoins: 160, testRewardXp: 300 },

  // C2 vacíos por ahora – el generador los usará cuando añadas vocabulario avanzado
  { id: 'C2.1', badge: 'C2.1', title: 'Excelencia',
    words: 0, wordsPerLesson: 25, lessons: 0,
    testQuestions: 30, passPercent: 80,
    rewardCoins: 40, rewardXp: 50, testRewardCoins: 200, testRewardXp: 350 },

  { id: 'C2.2', badge: 'C2.2', title: 'Cumbre',
    words: 0, wordsPerLesson: 25, lessons: 0,
    testQuestions: 30, passPercent: 80,
    rewardCoins: 40, rewardXp: 50, testRewardCoins: 200, testRewardXp: 350 }
];

function getLevelConfig(levelId) {
  return LEVEL_CONFIG.find(l => l.id === levelId) || null;
}

function getLessonsForLevel(levelId) {
  const config = getLevelConfig(levelId);
  if (!config || config.lessons === 0) return [];
  return Array.from({ length: config.lessons }, (_, i) => ({
    id: `${levelId}-l${i + 1}`,
    title: `Lección ${i + 1}`,
    wordsPerLesson: config.wordsPerLesson,
    rewardCoins: config.rewardCoins,
    rewardXp: config.rewardXp
  }));
}

// Exponer globalmente
window.LevelConfig = {
  LEVEL_CONFIG,
  getLevelConfig,
  getLessonsForLevel
};
