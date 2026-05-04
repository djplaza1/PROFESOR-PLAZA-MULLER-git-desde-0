(function() {
  const M = window.Muller = window.Muller || {};
  M.storage = {
    get: (key, fallback = null) => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch(e) { return fallback; } },
    getRaw: (key, fallback = '') => { try { return localStorage.getItem(key) ?? fallback; } catch(e) { return fallback; } },
    getInt: (key, fallback = 0) => { try { return parseInt(localStorage.getItem(key) || String(fallback), 10); } catch(e) { return fallback; } },
    getBool: (key, fb = true) => { try { const v = localStorage.getItem(key); return v === null ? fb : v !== '0'; } catch(e) { return fb; } },
    set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} },
    setRaw: (key, val) => { try { localStorage.setItem(key, String(val)); } catch(e) {} },
    remove: (key) => { try { localStorage.removeItem(key); } catch(e) {} },
    clear: () => { try { localStorage.clear(); return true; } catch(e) { return false; } }
  };
  M.sessionGet = (key, fb = null) => { try { const r = sessionStorage.getItem(key); return r ? JSON.parse(r) : fb; } catch(e) { return fb; } };
  M.sessionSet = (key, val) => { try { sessionStorage.setItem(key, JSON.stringify(val)); } catch(e) {} };

  // ============== SINCRONIZACIÓN AUTOMÁTICA CON SUPABASE ==================
  // Preservar el set original y reemplazarlo con uno que también sincronice
  (function() {
    var originalSet = M.storage.set;

    // Mapa de claves de localStorage que deben sincronizarse automáticamente
    var AUTO_SYNC_KEYS = {
      'savedScripts':      'user_scripts',
      'userProgress':      'user_progress',
      'mullerVocabs':      'user_vocab',
      'mullerAchievements':'user_achievements',
      'muller_ocr_history_v1': 'user_ocr_history'
    };

    var syncTimeout = null;

    M.storage.set = function(key, val) {
      // Siempre guardar en localStorage primero
      originalSet(key, val);

      // Si es una clave importante, programar sincronización a la nube
      var table = AUTO_SYNC_KEYS[key];
      if (table && window.Muller && typeof window.Muller.saveToCloud === 'function') {
        // Debounce: agrupar múltiples sets en 2 segundos
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(function() {
          // Usar saveToCloud directamente sin esperar la promesa
          window.Muller.saveToCloud(table, val).catch(function(e) {
            console.warn('syncToCloud error for ' + key + ':', e);
          });
          syncTimeout = null;
        }, 2000);
      }
    };
  })();

  // ─── Historial OCR ───
  M.ocr = M.ocr || {};
  M.ocr.pushHistory = function mullerPushOcrHistory(entry) {
    if (!entry || !entry.text) return;
    try {
      var raw = localStorage.getItem('muller_ocr_history_v1');
      var list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      list.unshift({
        text: entry.text,
        pct: entry.confidence || 0,
        at: new Date().toISOString(),
        source: entry.source || 'writing_canvas'
      });
      if (list.length > 50) list = list.slice(0, 50);
      localStorage.setItem('muller_ocr_history_v1', JSON.stringify(list));
      // sync
      if (typeof M.saveToCloud === 'function') {
        M.saveToCloud('user_ocr_history', list).catch(function(e) {
          console.warn('sync OcrHistory error:', e);
        });
      }
    } catch(e) {
      console.warn('pushOcrHistory error:', e);
    }
  };
})();
