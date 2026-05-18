/**
 * Carga los bancos de frases por nivel (phrasesBank_A1.1.json, etc.)
 * en window.PhrasesBank para uso global.
 * Combina todos los niveles en un solo objeto.
 */
(function() {
  window.PhrasesBank = window.PhrasesBank || {};
  window.PhrasesBank_ready = false;
  window.PhrasesBank_callbacks = [];

  // Lista de niveles con su archivo correspondiente
  var LEVEL_FILES = [
    { level: 'A1.1', file: 'src/data/phrasesBank_A1.1.json' }
    // En el futuro se añadirán más niveles aquí, ej:
    // { level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' }
  ];

  window.PhrasesBank_onReady = function(cb) {
    if (window.PhrasesBank_ready) {
      cb(window.PhrasesBank);
    } else {
      window.PhrasesBank_callbacks.push(cb);
    }
  };

  var pending = LEVEL_FILES.length;
  if (pending === 0) {
    window.PhrasesBank_ready = true;
    for (var i = 0; i < window.PhrasesBank_callbacks.length; i++) {
      window.PhrasesBank_callbacks[i](window.PhrasesBank);
    }
    window.PhrasesBank_callbacks = [];
    return;
  }

  LEVEL_FILES.forEach(function(item) {
    fetch(item.file)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        // Fusionar los datos en PhrasesBank
        Object.keys(data).forEach(function(level) {
          window.PhrasesBank[level] = data[level];
        });
        pending--;
        if (pending === 0) {
          window.PhrasesBank_ready = true;
          console.log('[PhrasesBank] Niveles cargados:', Object.keys(window.PhrasesBank).join(', '));
          for (var i = 0; i < window.PhrasesBank_callbacks.length; i++) {
            window.PhrasesBank_callbacks[i](window.PhrasesBank);
          }
          window.PhrasesBank_callbacks = [];
        }
      })
      .catch(function(err) {
        console.error('[PhrasesBank] Error al cargar ' + item.file + ':', err);
        pending--;
        if (pending === 0) {
          window.PhrasesBank_ready = true;
          for (var i = 0; i < window.PhrasesBank_callbacks.length; i++) {
            window.PhrasesBank_callbacks[i](window.PhrasesBank);
          }
          window.PhrasesBank_callbacks = [];
        }
      });
  });
})();