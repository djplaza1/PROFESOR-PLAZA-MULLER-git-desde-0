/**
 * Carga phrasesBank.json en window.PhrasesBank para uso global.
 * El JSON es grande (~24MB), se carga vía fetch asíncrono.
 */
(function() {
  window.PhrasesBank = window.PhrasesBank || {};
  window.PhrasesBank_ready = false;
  window.PhrasesBank_callbacks = [];

  window.PhrasesBank_onReady = function(cb) {
    if (window.PhrasesBank_ready) {
      cb(window.PhrasesBank);
    } else {
      window.PhrasesBank_callbacks.push(cb);
    }
  };

  fetch('src/data/phrasesBank.json')
    .then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function(data) {
      window.PhrasesBank = data;
      window.PhrasesBank_ready = true;
      console.log('[PhrasesBank] Cargado exitosamente. Niveles:', Object.keys(data).join(', '));
      // Disparar callbacks pendientes
      for (var i = 0; i < window.PhrasesBank_callbacks.length; i++) {
        window.PhrasesBank_callbacks[i](data);
      }
      window.PhrasesBank_callbacks = [];
    })
    .catch(function(err) {
      console.error('[PhrasesBank] Error al cargar:', err);
      window.PhrasesBank_ready = true; // marcar como listo aunque falle
      for (var i = 0; i < window.PhrasesBank_callbacks.length; i++) {
        window.PhrasesBank_callbacks[i]({});
      }
      window.PhrasesBank_callbacks = [];
    });
})();