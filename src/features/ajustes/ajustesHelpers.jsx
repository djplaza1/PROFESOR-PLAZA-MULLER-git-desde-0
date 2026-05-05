// ==================================================
// src/features/ajustes/ajustesHelpers.jsx
// GestiÃƒÂ³n de ajustes globales y almacenamiento
// ==================================================
window.Muller = window.Muller || {};
window.Muller.Ajustes = {
  // Claves de localStorage
  KEYS: {
    THEME: 'muller_ui_theme',
    SFX_ENABLED: 'muller_sfx_enabled',
    NOISE: 'muller_noise_enabled',
    REDUCE_MOTION: 'muller_reduce_motion',
    PODCAST_MODE: 'muller_podcast_mode',
    HISTORIA_AUDIO_ONLY: 'muller_historia_audio_only',
    FLOATING_TOOLS: 'muller_show_floating_tools',
    TTS_RATE: 'muller_tts_rate',
    ONBOARDING: 'muller_onboarding_done',
    IA_API_KEY: 'muller_ia_api_key',
  },

  defaults: {
    theme: 'dark',       // dark | light | hc
    sfxEnabled: true,
    noiseExamen: false,
    reduceMotion: false,
    podcastMode: false,
    historiaAudioOnly: false,
    showFloatingTools: true,
    ttsRate: '0.92',     // Lenta: 0.82, Normal: 0.92, Examen: 1.0
    onboardingDone: false,
    iaApiKey: '',
  },

  // Obtener todos los ajustes
  getAll() {
    return {
      theme: localStorage.getItem(this.KEYS.THEME) || this.defaults.theme,
      sfxEnabled: localStorage.getItem(this.KEYS.SFX_ENABLED) !== '0',
      noiseExamen: localStorage.getItem(this.KEYS.NOISE) === '1',
      reduceMotion: localStorage.getItem(this.KEYS.REDUCE_MOTION) === '1',
      podcastMode: localStorage.getItem(this.KEYS.PODCAST_MODE) === '1',
      historiaAudioOnly: localStorage.getItem(this.KEYS.HISTORIA_AUDIO_ONLY) === '1',
      showFloatingTools: localStorage.getItem(this.KEYS.FLOATING_TOOLS) !== '0',
      ttsRate: localStorage.getItem(this.KEYS.TTS_RATE) || this.defaults.ttsRate,
      onboardingDone: localStorage.getItem(this.KEYS.ONBOARDING) === '1',
      iaApiKey: localStorage.getItem(this.KEYS.IA_API_KEY) || '',
    };
  },

  // Guardar un ajuste individual
  set(key, value) {
    try {
      localStorage.setItem(this.KEYS[key], String(value));
      this.apply(key, value);
      // Sincronizar con Supabase (si hay sesiÃ³n)
      if (window.Muller && window.Muller.syncSettingsToCloud) {
        window.Muller.syncSettingsToCloud(this.getAll()).catch(() => {});
      }
    } catch (e) {
      console.warn('No se pudo guardar el ajuste', key, e);
    }
  },

  // Aplicar ajuste en caliente
  apply(key, value) {
    switch (key) {
      case 'THEME':
        document.documentElement.classList.remove('dark', 'light', 'hc');
        document.documentElement.classList.add(value);
        // Forzar colores en body y root para que se vea el cambio
        document.body.style.background = 'var(--bg-primary)';
        document.body.style.color = 'var(--text-primary)';
        var root = document.getElementById('root');
        if (root) root.style.background = 'var(--bg-primary)';
        var main = document.getElementById('app-main');
        if (main) {
          main.style.background = 'var(--bg-primary)';
          main.style.color = 'var(--text-primary)';
        }
        break;
      case 'REDUCE_MOTION':
        document.documentElement.style.setProperty('--reduce-motion', value ? '1' : '0');
        break;
      case 'SFX_ENABLED':
        window.__mullerSfxEnabled = value;
        break;
      case 'TTS_RATE':
        if (window.Muller.Speech) {
          window.Muller.Speech.setRate?.(parseFloat(value));
        }
        break;
      // Los demÃƒÂ¡s se aplican en el panel correspondiente
    }
  },

  // Exportar todos los datos de la app (backup)
  exportFullBackup() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('muller_') || key.startsWith('bx_') || key.startsWith('ia_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muller_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Importar backup
  importBackup(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          resolve();
        } catch (err) { reject(err); }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  // Restablecer ajustes por defecto
  resetSettings() {
    Object.entries(this.defaults).forEach(([key, defaultValue]) => {
      this.set(this.getKeyByProp(key), defaultValue);
    });
  },

  // Limpiar TODOS los datos
  clearAllData() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('muller_') || key.startsWith('bx_') || key.startsWith('ia_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    this.resetSettings();
  },

  getKeyByProp(prop) {
    const map = {
      theme: 'THEME',
      sfxEnabled: 'SFX_ENABLED',
      noiseExamen: 'NOISE',
      reduceMotion: 'REDUCE_MOTION',
      podcastMode: 'PODCAST_MODE',
      historiaAudioOnly: 'HISTORIA_AUDIO_ONLY',
      showFloatingTools: 'FLOATING_TOOLS',
      ttsRate: 'TTS_RATE',
      onboardingDone: 'ONBOARDING',
      iaApiKey: 'IA_API_KEY',
    };
    return map[prop] || prop;
  }
};

// ══════════════════════════════════════════════════════════════════
// AUTO‑INIT: aplicar el tema guardado al cargar la página
// ══════════════════════════════════════════════════════════════════
(function initAjustes() {
  try {
    var saved = window.Muller.Ajustes.getAll();
    if (saved && saved.theme) {
      window.Muller.Ajustes.apply('THEME', saved.theme);
    }
    if (saved && saved.reduceMotion) {
      window.Muller.Ajustes.apply('REDUCE_MOTION', saved.reduceMotion);
    }
    if (saved && saved.sfxEnabled !== undefined) {
      window.__mullerSfxEnabled = saved.sfxEnabled;
    }
    if (saved && saved.ttsRate) {
      window.Muller.Ajustes.apply('TTS_RATE', saved.ttsRate);
    }
  } catch(e) { /* ignora errores en init */ }
})();

// Método auxiliar para exportar datos filtrados
window.Muller = window.Muller || {};
window.Muller.Ajustes.exportFiltered = function(type) {
  const data = {};

  // SRS data
  if (type === 'srs') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('muller_vocab_') || key.startsWith('muller_srs_')) {
        data[key] = localStorage.getItem(key);
      }
    }
  }

  // Decks
  if (type === 'decks') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('muller_deck_') || key.startsWith('decks_')) {
        data[key] = localStorage.getItem(key);
      }
    }
  }

  // IA
  if (type === 'ia') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('ia_') || key.startsWith('muller_ia_')) {
        data[key] = localStorage.getItem(key);
      }
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `muller_${type}_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};