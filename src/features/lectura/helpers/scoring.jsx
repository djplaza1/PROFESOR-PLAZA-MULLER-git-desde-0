// src/features/lectura/helpers/scoring.jsx
// Comparación de textos y cálculo de puntuación para lectura en voz alta
window.Muller = window.Muller || {};
window.Muller.LecturaHelpers = window.Muller.LecturaHelpers || {};

// CONFIG
window.Muller.LecturaHelpers.SCORING_CONFIG = {
  weightPerWord: 1,           // peso de cada palabra correcta
  weightFluencyBonus: 5,      // bonus si se leyeron todas las palabras
  weightAccuracy: 0.7,        // peso de precisión en puntuación final
  weightSpeed: 0.3,           // peso de velocidad en puntuación final
  maxWPM: 200,                // palabras por minuto consideradas perfectas
  idealWPM: 120               // velocidad ideal como objetivo
};

// Calcula puntuación general de una lectura (0-100)
// @param {Array} compareResult - Resultado de compareTokens
// @param {number} durationSeconds - Duración en segundos
// @returns {Object} { score, correct, total, accuracy, wpm, feedback }
window.Muller.LecturaHelpers.calculateScore = function(compareResult, durationSeconds) {
  if (!compareResult || compareResult.length === 0) {
    return { score: 0, correct: 0, total: 0, accuracy: 0, wpm: 0, feedback: [] };
  }

  var config = window.Muller.LecturaHelpers.SCORING_CONFIG;
  var total = compareResult.filter(function(c) { return c.original !== ''; }).length;
  var correct = compareResult.filter(function(c) { return c.correct && c.original !== ''; }).length;
  var accuracy = total > 0 ? (correct / total) * 100 : 0;

  // Velocidad (WPM)
  var wordCount = total;
  var minutes = durationSeconds > 0 ? durationSeconds / 60 : 0;
  var wpm = minutes > 0 ? Math.round(wordCount / minutes) : 0;

  // Puntuación: 70% precisión + 30% velocidad
  var speedScore = Math.min(100, (wpm / config.idealWPM) * 100);
  var score = Math.round(accuracy * config.weightAccuracy + speedScore * config.weightSpeed);
  score = Math.min(100, Math.max(0, score));

  // Feedback detallado
  var feedback = [];
  compareResult.forEach(function(c) {
    if (!c.correct && c.original && c.transcript) {
      feedback.push({
        expected: c.original,
        got: c.transcript,
        index: c.index,
        advice: window.Muller.LecturaHelpers.tipForWord(c.original, c.transcript)
      });
    } else if (!c.correct && c.original && !c.transcript) {
      feedback.push({
        expected: c.original,
        got: '(omitida)',
        index: c.index,
        advice: 'Palabra no detectada. Intenta pronunciar "' + c.original + '" claramente.'
      });
    }
  });

  return {
    score: score,
    correct: correct,
    total: total,
    accuracy: Math.round(accuracy * 10) / 10,
    wpm: wpm,
    feedback: feedback
  };
};

// Calcula puntuación para rondas (con penalización por tiempo)
window.Muller.LecturaHelpers.calculateRoundScore = function(baseScore, timeUsed, timeLimit) {
  var timeRatio = timeLimit > 0 ? Math.min(1, timeUsed / timeLimit) : 1;
  var timePenalty = Math.max(0, (timeRatio - 0.5) * 20); // penaliza si usa más del 50% del tiempo
  return Math.round(Math.max(0, baseScore - timePenalty));
};