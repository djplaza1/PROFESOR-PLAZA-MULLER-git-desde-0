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

    // Mapa de claves importantes que tienen tabla dedicada en Supabase
    var AUTO_SYNC_KEYS = {
      'savedScripts':         'user_scripts',
      'userProgress':         'user_progress',
      'mullerVocabs':         'user_vocab',
      'mullerAchievements':   'user_achievements',
      'muller_ocr_history_v1':'user_ocr_history',
      'muller_vocab_srs_v1':  'user_srs'      // SRS de vocabulario (crítico)
    };

    // Claves secundarias que se agrupan en user_general_data (una sola tabla)
    var GENERAL_DATA_KEYS = {
      'muller_streak_today_v1':1, 'muller_streak_qual_v1':1,
      'muller_main_goal_v1':1, 'muller_theme_v1':1,
      'muller_onboarding_v1':1, 'muller_reading_font_v1':1,
      'muller_pdf_study_v1':1, 'muller_pdf_notes_v1':1,
      'muller_pdf_library_v1':1, 'muller_tts_rate_v1':1,
      'muller_mic_permission_v1':1, 'muller_goal_claim_v1':1,
      'muller_advanced_progress':1, 'muller_daily_activity':1,
      'muller_b1b2_json_v1':1, 'muller_active_time_v1':1,
      'muller_missions_v1':1, 'muller_claimed_rewards_v1':1,
      'muller_plaza_muenzen_v1':1, 'muller_shop_purchases_v1':1
    };

    var syncTimeout = null;
    var generalSyncTimeout = null;

    M.storage.set = function(key, val) {
      // Siempre guardar en localStorage primero
      originalSet(key, val);

      // Si es una clave con tabla propia, sincronizar individualmente
      var table = AUTO_SYNC_KEYS[key];
      if (table && window.Muller && typeof window.Muller.saveToCloud === 'function') {
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(function() {
          window.Muller.saveToCloud(table, val).catch(function(e) {
            console.warn('syncToCloud error for ' + key + ':', e);
          });
          syncTimeout = null;
        }, 2000);
      }

      // Si es una clave secundaria, agrupar en user_general_data
      if (GENERAL_DATA_KEYS[key] && window.Muller && typeof window.Muller.saveGeneralData === 'function') {
        if (generalSyncTimeout) clearTimeout(generalSyncTimeout);
        generalSyncTimeout = setTimeout(function() {
          // Recopilar TODAS las claves secundarias en un solo objeto
          var generalData = {};
          for (var k in GENERAL_DATA_KEYS) {
            if (GENERAL_DATA_KEYS.hasOwnProperty(k)) {
              try {
                var v = localStorage.getItem(k);
                generalData[k] = v ? JSON.parse(v) : null;
              } catch(e) { generalData[k] = null; }
            }
          }
          window.Muller.saveGeneralData(generalData).catch(function(e) {
            console.warn('syncGeneralData error:', e);
          });
          generalSyncTimeout = null;
        }, 3000); // 3 segundos de debounce (agrupa cambios múltiples)
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
