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
})();
