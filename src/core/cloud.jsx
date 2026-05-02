(function() {
  const M = window.Muller = window.Muller || {};
  const { get, set, remove } = M.storage;
  const { KEYS } = M;
  let sb = null;

  // =============== CREDENCIALES REALES ======================
  window.__MULLER_SUPABASE_URL__ = 'https://mrimappoycvfujzegxdt.supabase.co';
  window.__MULLER_SUPABASE_KEY__ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaW1hcHBveWN2ZnVqemVneGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzI1MDMsImV4cCI6MjA5MjIwODUwM30.L_5Lk3S_TgiaSe8jAAhTcQTbUsQiTjxA9pWq0ZDayBY';
  // ==========================================================

  M.getSupabase = () => {
    if (sb) return sb;
    try {
      const url = window.__MULLER_SUPABASE_URL__;
      const key = window.__MULLER_SUPABASE_KEY__;
      if (typeof supabase !== 'undefined') sb = supabase.createClient(url, key);
    } catch(e) {}
    return sb;
  };

  // Exponer cliente para que auth.jsx lo reutilice (evita múltiples instancias)
  M.getClient = () => M.getSupabase();
  M.supabaseReady = () => !!M.getSupabase();
  M.cloudErrorLabel = e => e?.message?.includes('JWT') ? 'Sesión expirada' : e?.message || 'Error';
  M.normalizeBxPayload = d => (d||[]).map(it=>({id:it.id||'',german:it.german||'',meta:it.meta||'',level:it.level||'A1',sourceScriptId:it.sourceScriptId||null,...it}));
  M.mergeBxLevel = (base,extra) => { if(!extra||!extra.length)return base||[]; const map=new Map((base||[]).map(it=>[it.id,it])); extra.forEach(it=>map.set(it.id,{...map.get(it.id),...it})); return Array.from(map.values()); };
  M.mergeBxDatabases = M.mergeBxLevel;
  M.tryBxUserOverlay = () => get(KEYS.BX_USER_OVERLAY, {});
  M.setBxUserOverlay = o => set(KEYS.BX_USER_OVERLAY, o);
  M.clearBxUserOverlay = () => remove(KEYS.BX_USER_OVERLAY);
  M.tryBxSession = async () => { const client=M.getSupabase(); if(!client)return null; const {data,error}=await client.auth.getSession(); return data?.session||null; };

  // ============== SINCRONIZACIÓN DE AJUSTES ==================
  M.syncSettingsToCloud = async function(settings) {
    const client = M.getSupabase();
    if (!client) return { ok: false, reason: 'Supabase no configurado' };
    const session = await M.tryBxSession();
    if (!session || !session.user) return { ok: false, reason: 'Sin sesión Supabase' };
    try {
      const { error } = await client.from('user_settings').upsert({
        user_id: session.user.id,
        settings: settings,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      console.warn('syncSettingsToCloud error:', e);
      return { ok: false, reason: e.message };
    }
  };

  M.pullSettingsFromCloud = async function() {
    const client = M.getSupabase();
    if (!client) return null;
    const session = await M.tryBxSession();
    if (!session || !session.user) return null;
    try {
      const { data, error } = await client.from('user_settings').select('settings').eq('user_id', session.user.id).maybeSingle();
      if (error || !data) return null;
      return data.settings;
    } catch (e) {
      console.warn('pullSettingsFromCloud error:', e);
      return null;
    }
  };

  // ============== SINCRONIZACIÓN DE SRS ======================
  M.syncSrsToCloud = async function(srsMap) {
    const client = M.getSupabase();
    if (!client) return { ok: false, reason: 'Supabase no configurado' };
    const session = await M.tryBxSession();
    if (!session || !session.user) return { ok: false, reason: 'Sin sesión Supabase' };
    try {
      const payload = { user_id: session.user.id, srs: srsMap, updated_at: new Date().toISOString() };
      const { error } = await client.from('user_srs').upsert(payload, { onConflict: 'user_id' });
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      console.warn('syncSrsToCloud error:', e);
      return { ok: false, reason: e.message };
    }
  };

  M.pullSrsFromCloud = async function() {
    const client = M.getSupabase();
    if (!client) return null;
    const session = await M.tryBxSession();
    if (!session || !session.user) return null;
    try {
      const { data, error } = await client.from('user_srs').select('srs').eq('user_id', session.user.id).maybeSingle();
      if (error || !data) return null;
      return data.srs;
    } catch (e) {
      console.warn('pullSrsFromCloud error:', e);
      return null;
    }
  };

  // ============== SINCRONIZACIÓN GENÉRICA (NUBE) ==================
  // Mapeo entre localStorage keys y tablas/columnas Supabase
  const CLOUD_TABLE_MAP = {
    'savedScripts':    { table: 'user_scripts',    column: 'script_data' },
    'userProgress':    { table: 'user_progress',   column: 'progress_data' },
    'mullerVocabs':    { table: 'user_vocab',      column: 'vocab_data' },
    'mullerAchievements': { table: 'user_achievements', column: 'achievements_data' }
  };

  /**
   * M.saveToCloud(table, data) - Guarda datos en una tabla de Supabase.
   * @param {string} table - Nombre de la tabla ('user_scripts', 'user_progress', etc.)
   * @param {*} data - Datos a guardar (se almacenan como JSONB)
   * @returns {Promise<{ok: boolean, error?: *}>}
   */
  M.saveToCloud = async function(table, data) {
    const client = M.getSupabase();
    if (!client) return { ok: false, reason: 'Sin Supabase' };
    const session = await M.tryBxSession();
    if (!session?.user) return { ok: false, reason: 'Sin sesión' };

    // Determinar el nombre de la columna JSONB según la tabla
    const column = table === 'user_scripts' ? 'script_data'
                 : table === 'user_progress' ? 'progress_data'
                 : table === 'user_vocab' ? 'vocab_data'
                 : table === 'user_achievements' ? 'achievements_data'
                 : null;
    if (!column) return { ok: false, reason: 'Tabla desconocida: ' + table };

    try {
      const { error } = await client.from(table).upsert({
        user_id: session.user.id,
        [column]: data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      console.warn('saveToCloud error (' + table + '):', e);
      return { ok: false, reason: e.message };
    }
  };

  /**
   * M.loadFromCloud(table) - Carga datos desde una tabla de Supabase.
   * @param {string} table - Nombre de la tabla
   * @returns {Promise<*|null>} Los datos guardados, o null si no hay
   */
  M.loadFromCloud = async function(table) {
    const client = M.getSupabase();
    if (!client) return null;
    const session = await M.tryBxSession();
    if (!session?.user) return null;

    const column = table === 'user_scripts' ? 'script_data'
                 : table === 'user_progress' ? 'progress_data'
                 : table === 'user_vocab' ? 'vocab_data'
                 : table === 'user_achievements' ? 'achievements_data'
                 : null;
    if (!column) return null;

    try {
      const { data, error } = await client.from(table).select(column)
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (error || !data) return null;
      return data[column];
    } catch (e) {
      console.warn('loadFromCloud error (' + table + '):', e);
      return null;
    }
  };

  /**
   * M.syncAllFromCloud() - Carga TODOS los datos desde la nube y los almacena en localStorage.
   * Llámalo después de login exitoso.
   */
  M.syncAllFromCloud = async function() {
    const tables = ['user_scripts', 'user_progress', 'user_vocab', 'user_achievements'];
    const keys = ['savedScripts', 'userProgress', 'mullerVocabs', 'mullerAchievements'];
    for (let i = 0; i < tables.length; i++) {
      const cloudData = await M.loadFromCloud(tables[i]);
      if (cloudData !== null) {
        M.storage.set(keys[i], cloudData);
      }
    }
  };

  /**
   * M.saveAllToCloud() - Guarda TODOS los datos de localStorage en la nube.
   * Llámalo antes de logout, o periódicamente, o manualmente.
   */
  M.saveAllToCloud = async function() {
    await M.saveToCloud('user_scripts', M.storage.get('savedScripts', []));
    await M.saveToCloud('user_progress', M.storage.get('userProgress', {}));
    await M.saveToCloud('user_vocab', M.storage.get('mullerVocabs', []));
    await M.saveToCloud('user_achievements', M.storage.get('mullerAchievements', []));
  };

  /**
   * M.syncKeyToCloud(key) - Guarda una clave específica en la nube si está en el mapa.
   * Útil para sincronización en tiempo real desde M.storage.set.
   */
  M.syncKeyToCloud = async function(key) {
    const mapping = CLOUD_TABLE_MAP[key];
    if (!mapping) return;
    const data = M.storage.get(key, null);
    if (data !== null) {
      await M.saveToCloud(mapping.table, data);
    }
  };

})();

