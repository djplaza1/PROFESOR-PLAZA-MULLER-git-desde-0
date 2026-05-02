window.Muller = window.Muller || {};

window.Muller.Auth = (() => {
  // ---------- CONSTANTES ----------
  const STORAGE_KEY_HASH = 'muller_password_hash';
  const STORAGE_KEY_SALT = 'muller_password_salt';
  const STORAGE_KEY_USER = 'muller_user_data'; // info local de usuario
  const SUPABASE_URL = window.__MULLER_SUPABASE_URL__ || 'https://djplazaonylqbwozflxym.supabase.co';
  const SUPABASE_ANON_KEY = window.__MULLER_SUPABASE_KEY__ || '';

  // ---------- FUNCIONES LOCALES (PBKDF2 legacy) ----------
  async function hashPassword(password, salt = null) {
    const encoder = new TextEncoder();
    const saltBytes = salt || crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const exportedKey = await crypto.subtle.exportKey('raw', key);
    return {
      hash: Array.from(new Uint8Array(exportedKey)).map(b => b.toString(16).padStart(2, '0')).join(''),
      salt: Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('')
    };
  }

  async function setLocalPassword(password) {
    const { hash, salt } = await hashPassword(password);
    localStorage.setItem(STORAGE_KEY_HASH, hash);
    localStorage.setItem(STORAGE_KEY_SALT, salt);
  }

  async function verifyLocalPassword(password) {
    const storedHash = localStorage.getItem(STORAGE_KEY_HASH);
    const storedSalt = localStorage.getItem(STORAGE_KEY_SALT);
    if (!storedHash || !storedSalt) return false;
    const saltBytes = new Uint8Array(storedSalt.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const { hash } = await hashPassword(password, saltBytes);
    return hash === storedHash;
  }

  function isLocalPasswordSet() {
    return !!localStorage.getItem(STORAGE_KEY_HASH);
  }

  function saveLocalUserData(data) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data));
  }

  function getLocalUserData() {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? JSON.parse(raw) : null;
  }

  function clearLocalAuth() {
    localStorage.removeItem(STORAGE_KEY_HASH);
    localStorage.removeItem(STORAGE_KEY_SALT);
    localStorage.removeItem(STORAGE_KEY_USER);
  }

  // ---------- SUPABASE CLIENT ----------
  function getSupabase() {
    // Reutilizar el cliente de cloud.jsx para evitar múltiples instancias
    if (window.Muller && typeof window.Muller.getClient === 'function') {
      return window.Muller.getClient();
    }
    if (window.supabase && window.supabase.createClient) {
      return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    console.error('Supabase JS no está cargado');
    return null;
  }

  async function supabaseSignUp(email, password) {
    const sb = getSupabase();
    if (!sb) throw new Error('Supabase no disponible');
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async function supabaseSignIn(email, password) {
    const sb = getSupabase();
    if (!sb) throw new Error('Supabase no disponible');
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function supabaseSignOut() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
  }

  async function getSupabaseSession() {
    const sb = getSupabase();
    if (!sb) return null;
    const { data } = await sb.auth.getSession();
    return data?.session ?? null;
  }

  async function getSupabaseUser() {
    const sb = getSupabase();
    if (!sb) return null;
    const { data } = await sb.auth.getUser();
    return data?.user ?? null;
  }

  // ---------- API PÚBLICA ----------
  return {
    // Locales (mantenidos para compatibilidad y fallback)
    setLocalPassword,
    verifyLocalPassword,
    isLocalPasswordSet,
    saveLocalUserData,
    getLocalUserData,
    clearLocalAuth,

    // Supabase Auth
    supabaseSignUp,
    supabaseSignIn,
    supabaseSignOut,
    getSupabaseSession,
    getSupabaseUser,
    getSupabase,

    // Login híbrido recomendado: intenta Supabase, si falla usa local
    async login(emailOrPassphrase, password) {
      // Si se pasan dos argumentos y el primero contiene '@', asumimos email + password para Supabase
      if (password && emailOrPassphrase.includes('@')) {
        try {
          const data = await supabaseSignIn(emailOrPassphrase, password);
          return { method: 'supabase', user: data.user };
        } catch (e) {
          console.warn('Fallo Supabase, intentando local...', e);
          // Intentamos local con el password (la passphrase local es el mismo password)
          const isValid = await verifyLocalPassword(password);
          if (isValid) {
            return { method: 'local', user: getLocalUserData() };
          }
          throw new Error('Credenciales incorrectas');
        }
      } else {
        // Sin email -> login local con passphrase
        const isValid = await verifyLocalPassword(emailOrPassphrase);
        if (isValid) {
          return { method: 'local', user: getLocalUserData() };
        }
        throw new Error('Contraseña incorrecta');
      }
    },

    // Registro híbrido (crea cuenta Supabase y también coloca passphrase local)
    async register(email, password) {
      // Registrar en Supabase
      const data = await supabaseSignUp(email, password);
      // También guardamos localmente para acceso offline
      await setLocalPassword(password);
      saveLocalUserData({ email, name: email.split('@')[0] });
      return data;
    },

    // Cerrar sesión completamente
    async logout() {
      await supabaseSignOut();
      clearLocalAuth();
    },

    // Verificar si hay sesión activa (Supabase o local)
    async getActiveSession() {
      const supabaseSession = await getSupabaseSession();
      if (supabaseSession) return { type: 'supabase', session: supabaseSession, user: supabaseSession.user };
      // Si no hay Supabase, comprobamos si al menos hay passphrase local (para acceso offline)
      if (isLocalPasswordSet()) {
        return { type: 'local', user: getLocalUserData() };
      }
      return null;
    }
  };
})();


