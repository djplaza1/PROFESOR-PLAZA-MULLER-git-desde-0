// Ruta Helpers - addLevel + soporte mínimo de vocabulario
(function(R) {
  if (!R) { console.error("Muller.Ruta no encontrado"); return; }

  // Inicializar VOCAB si no existe
  R.VOCAB = R.VOCAB || {};

  // Función addLevel: registra vocabulario en R.VOCAB[levelId]
  R.addLevel = function(levelId, words) {
    if (!R.VOCAB[levelId]) {
      R.VOCAB[levelId] = [];
    }
    // Añadir palabras evitando duplicados
    words.forEach(function(w) {
      var exists = R.VOCAB[levelId].some(function(ex) { return ex[0] === w[0]; });
      if (!exists) {
        R.VOCAB[levelId].push(w);
      }
    });
  };

  // Exponer addLevel globalmente para compatibilidad con vocabData.js
  window.addLevel = function(levelId, words) {
  setTimeout(function() { console.log("🧪 RutaPanel existe?", typeof window.RutaPanel); }, 0);
    R.addLevel(levelId, words);
  };

})((window.Muller = window.Muller || {}).Ruta = window.Muller.Ruta || {});
