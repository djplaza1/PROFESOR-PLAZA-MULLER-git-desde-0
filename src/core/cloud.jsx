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

})();

