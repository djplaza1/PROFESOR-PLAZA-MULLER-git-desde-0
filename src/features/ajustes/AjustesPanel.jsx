// ==================================================
// src/features/ajustes/AjustesPanel.jsx
// Panel de Ajustes premium - 4 pestañas
// ==================================================
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.AjustesPanel = {
  name: 'ajustes',
  title: 'Ajustes',
  icon: 'Settings',

  tab: 'ajustes', // perfil | ajustes | atajos | datos

  init() {
    this.settings = window.Muller.Ajustes.getAll();
    this.render();
    this.bind();
  },

  render() {
    const container = document.getElementById('panel-content');
    if (!container) return;
    container.innerHTML = this.getHTML();
    this.attachEvents();
    if (window.lucide) lucide.createIcons();
  },

  getHTML() {
    const s = this.settings;
    const userStats = window.Muller.Storage?.loadProgress?.() || {};
    const username = userStats.username || 'Estudiante';
    const streak = userStats.streakDays || 0;
    const coins = userStats.coins || 0;
    const hearts = userStats.hearts ?? 5;
    const level = userStats.level || 1;
    const levelTitle = window.Muller.Progreso?.getLevelTitle?.(level) || 'Anfänger';

    return `
      <div class="flex flex-col h-full bg-gray-950 text-white" id="ajustes-root">
        <!-- Header -->
        <div class="flex-shrink-0 px-4 py-3 border-b border-gray-800 bg-gradient-to-r from-violet-900 to-gray-900 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-xl">
            <i data-lucide="settings" class="w-6 h-6"></i>
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-bold">Ajustes</h2>
            <p class="text-xs text-gray-400">Perfil, preferencias y datos</p>
          </div>
          <div class="text-xs text-gray-500">v2.0 Premium</div>
        </div>

        <!-- Pestañas -->
        <div class="flex-shrink-0 px-4 py-2 flex gap-2 border-b border-gray-800 bg-gray-900/50 overflow-x-auto">
          ${['perfil','ajustes','atajos','datos'].map(tab => `
            <button class="ajustes-tab-btn px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${this.tab === tab ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}" data-tab="${tab}">
              ${tab === 'perfil' ? '👤 Perfil' : tab === 'ajustes' ? '⚙️ Ajustes' : tab === 'atajos' ? '⌨️ Atajos' : '💾 Datos'}
            </button>
          `).join('')}
        </div>

        <!-- Contenido dinámico según pestaña -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-5" id="ajustes-content">
          ${this.renderPerfil()}
        </div>

        <!-- Footer info -->
        <div class="flex-shrink-0 px-4 py-2 border-t border-gray-800 text-center text-[10px] text-gray-600">
          Profesor Plaza Müller — Ajustes locales. La configuración se guarda automáticamente.
        </div>
      </div>
    `;
  },

  renderPerfil() {
    if (this.tab !== 'perfil') return '';
    const userStats = window.Muller.Storage?.loadProgress?.() || {};
    const username = userStats.username || 'Estudiante';
    const streak = userStats.streakDays || 0;
    const coins = userStats.coins || 0;
    const hearts = userStats.hearts ?? 5;
    const level = userStats.level || 1;
    const levelTitle = window.Muller.Progreso?.getLevelTitle?.(level) || 'Anfänger';

    return `
      <div class="space-y-5 animate-fade-in">
        <!-- Tarjeta de perfil -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl font-black shrink-0">
            ${username.charAt(0).toUpperCase()}
          </div>
          <div class="flex-1 text-center sm:text-left">
            <h3 class="text-lg font-bold">${username}</h3>
            <p class="text-sm text-violet-300">${levelTitle} · Nivel ${level}</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
              <div class="bg-gray-800 rounded-xl p-2 text-center">
                <p class="text-red-400 font-bold text-lg">${hearts}</p>
                <p class="text-gray-500">Vidas</p>
              </div>
              <div class="bg-gray-800 rounded-xl p-2 text-center">
                <p class="text-amber-400 font-bold text-lg">${coins}</p>
                <p class="text-gray-500">Monedas</p>
              </div>
              <div class="bg-gray-800 rounded-xl p-2 text-center">
                <p class="text-orange-400 font-bold text-lg">${streak}</p>
                <p class="text-gray-500">Racha días</p>
              </div>
              <div class="bg-gray-800 rounded-xl p-2 text-center">
                <p class="text-violet-400 font-bold text-lg">${level}</p>
                <p class="text-gray-500">Nivel</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Editar nombre -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
            <i data-lucide="user-pen" class="w-4 h-4"></i> Cambiar nombre visible
          </h4>
          <div class="flex gap-2">
            <input id="ajustes-name-input" type="text" value="${username}" placeholder="Tu nombre"
              class="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition" />
            <button id="ajustes-save-name" class="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-bold transition">
              Guardar
            </button>
          </div>
          <p id="ajustes-name-msg" class="text-xs text-gray-500 hidden"></p>
        </div>

        <!-- Sincronización en la nube -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
            <i data-lucide="cloud" class="w-4 h-4"></i> Sincronización en la nube
          </h4>
          <p class="text-xs text-gray-400">
            Todos tus datos se sincronizan automáticamente con Supabase (nube).
            Al hacer login en otro dispositivo, tendrás todo al día.
          </p>
          <div class="flex gap-2 flex-wrap items-center">
            <button id="cloud-sync-now-btn" class="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold transition">
              <i data-lucide="refresh-cw" class="w-4 h-4 inline mr-1"></i> Sincronizar ahora
            </button>
            <span id="cloud-sync-status" class="text-xs text-gray-500 hidden"></span>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button id="ajustes-export-btn" class="px-3 py-1.5 rounded-lg text-xs font-bold border border-violet-500/30 bg-violet-900/20 text-violet-200 hover:bg-violet-900/40 transition">
              <i data-lucide="download" class="w-3.5 h-3.5 inline mr-1"></i> Exportar backup
            </button>
            <button id="ajustes-import-btn" class="px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-500/30 bg-indigo-900/20 text-indigo-200 hover:bg-indigo-900/40 transition">
              <i data-lucide="upload" class="w-3.5 h-3.5 inline mr-1"></i> Importar backup
            </button>
            <input type="file" id="ajustes-import-file" accept=".json" class="hidden" />
          </div>
        </div>
      </div>
    `;
  },

  renderAjustes() {
    if (this.tab !== 'ajustes') return '';
    const s = this.settings;
    const ttsLabel = s.ttsRate === '0.82' ? 'Lenta' : s.ttsRate === '1.00' ? 'Examen' : 'Normal';

    return `
      <div class="space-y-5 animate-fade-in">
        <!-- Tema -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
            <i data-lucide="palette" class="w-4 h-4"></i> Tema global
          </h4>
          <div class="flex flex-wrap gap-2">
            ${[{ id: 'dark', label: '🌙 Oscuro' }, { id: 'light', label: '☀️ Claro' }, { id: 'hc', label: '🔳 Alto contraste' }].map(t => `
              <button class="theme-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.theme === t.id ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'}" data-theme="${t.id}">
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Audio y voz -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-2">
            <i data-lucide="volume-2" class="w-4 h-4"></i> Audio y voz
          </h4>
          <div class="flex flex-wrap gap-2">
            <button id="toggle-sfx" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.sfxEnabled ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🔊 Sonidos: ${s.sfxEnabled ? 'ON' : 'OFF'}
            </button>
            <button id="toggle-noise" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.noiseExamen ? 'bg-amber-600 border-amber-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🎧 Ruido examen: ${s.noiseExamen ? 'ON' : 'OFF'}
            </button>
            <button id="toggle-podcast" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.podcastMode ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🎙️ Podcast: ${s.podcastMode ? 'ON' : 'OFF'}
            </button>
            <button id="toggle-audio-only" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.historiaAudioOnly ? 'bg-violet-600 border-violet-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🎧 Solo audio: ${s.historiaAudioOnly ? 'ON' : 'OFF'}
            </button>
          </div>
          <div class="mt-3">
            <p class="text-xs text-gray-500 mb-2">Velocidad TTS: <span id="tts-label" class="text-white font-bold">${ttsLabel}</span></p>
            <div class="flex gap-2">
              ${[{ id: '0.82', label: '🐢 Lenta' }, { id: '0.92', label: '🚶 Normal' }, { id: '1.00', label: '🏃 Examen' }].map(p => `
                <button class="tts-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.ttsRate === p.id ? 'bg-violet-600 border-violet-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'}" data-rate="${p.id}">
                  ${p.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Inteligencia Artificial -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <i data-lucide="brain" class="w-4 h-4"></i> Inteligencia Artificial
          </h4>
          <div class="space-y-3">
            <div>
              <label class="text-xs text-gray-400 mb-1 block">API Key de DeepSeek</label>
              <input id="ia-api-key" type="password" placeholder="sk-..." value="" class="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition" />
              <button id="save-ia-key" class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-500/30 bg-amber-900/20 text-amber-200 hover:bg-amber-900/40 transition">Guardar API Key</button>
              <span id="ia-key-status" class="ml-2 text-xs text-gray-500 hidden"></span>
            </div>
            <div>
              <label class="text-xs text-gray-400 mb-1 block">Temperatura de la IA</label>
              <p class="text-[11px] text-gray-500 mb-2">Define cuán creativa o precisa es la IA. <span class="text-amber-400">Baja (0.2)</span> = más concisa y determinista. <span class="text-amber-400">Alta (1.5+)</span> = más creativa y extensa.</p>
              <div class="flex flex-wrap gap-2">
                ${[
                  { val: '0.2', label: '🎯 Preciso (0.2)', desc: 'Respuestas breves y directas' },
                  { val: '0.5', label: '📏 Conservador (0.5)', desc: 'Poco creativo, fiable' },
                  { val: '0.7', label: '⚖️ Equilibrado (0.7)', desc: 'Estilo por defecto' },
                  { val: '1.0', label: '✨ Creativo (1.0)', desc: 'Más variado y expresivo' },
                  { val: '1.5', label: '🎨 Imaginativo (1.5)', desc: 'Respuestas largas y elaboradas' }
                ].map(t => `
                  <button class="temp-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition ${(window.Muller.getTemperature?.() || 0.7) == t.val ? 'bg-amber-600 border-amber-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'}" data-temp="${t.val}">
                    ${t.label}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Preferencias de interfaz -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
            <i data-lucide="monitor" class="w-4 h-4"></i> Interfaz
          </h4>
          <div class="flex flex-wrap gap-2">
            <button id="toggle-floating" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.showFloatingTools ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🛠️ Herramientas rápidas: ${s.showFloatingTools ? 'ON' : 'OFF'}
            </button>
            <button id="toggle-motion" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.reduceMotion ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              🎞️ Reducir animaciones: ${s.reduceMotion ? 'ON' : 'OFF'}
            </button>
            <button id="toggle-onboarding" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${s.onboardingDone ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-gray-800 border-gray-700 text-gray-400'}">
              📖 Onboarding: ${s.onboardingDone ? 'DESACTIVADO' : 'ACTIVO'}
            </button>
          </div>
        </div>

        <!-- Acción: Restablecer ajustes -->
        <div class="bg-gray-900 border border-red-900/30 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-red-300 flex items-center gap-2">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Restablecer ajustes
          </h4>
          <p class="text-xs text-gray-400">Restaura todas las preferencias a sus valores por defecto sin borrar tu progreso.</p>
          <button id="reset-settings-btn" class="px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 text-sm font-bold transition">
            Restablecer ajustes
          </button>
        </div>
      </div>
    `;
  },

  renderAtajos() {
    if (this.tab !== 'atajos') return '';
    return `
      <div class="space-y-5 animate-fade-in">
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-sky-300 flex items-center gap-2">
            <i data-lucide="keyboard" class="w-4 h-4"></i> Atajos de teclado
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            ${[
              ['?', 'Ayuda rápida'],
              ['I', 'Inicio / Splash'],
              ['R', 'Ruta de aprendizaje'],
              ['H', 'Panel Historia'],
              ['V', 'Lexikon (Vocabulario)'],
              ['P', 'Progreso'],
              ['M', 'Centro Müller (Hub)'],
              ['B', 'Biblioteca'],
              ['T', 'Entrenamiento TELC'],
              ['C', 'Comunidad'],
              ['L', 'Lectura'],
              ['W', 'Escritura (Writing)'],
              ['A', 'IA - Herr Müller'],
              ['S', 'Ajustes (Settings)'],
              ['Esc', 'Cerrar modales / volver'],
            ].map(([key, desc]) => `
              <div class="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                <kbd class="px-2 py-0.5 rounded-md bg-gray-950 border border-gray-600 text-xs font-mono text-cyan-300 min-w-[2rem] text-center">${key}</kbd>
                <span class="text-gray-300">${desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderDatos() {
    if (this.tab !== 'datos') return '';
    return `
      <div class="space-y-5 animate-fade-in">
        <!-- Exportar / Importar -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
            <i data-lucide="folder-sync" class="w-4 h-4"></i> Copia de seguridad
          </h4>
          <p class="text-xs text-gray-400">Guarda o restaura todos tus datos (progreso, SRS, ajustes, historial de IA).</p>
          <div class="flex gap-2 flex-wrap">
            <button id="datos-export-full" class="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-bold transition">
              <i data-lucide="download" class="w-4 h-4 inline mr-1"></i> Exportar backup completo
            </button>
            <button id="datos-import-full" class="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition">
              <i data-lucide="upload" class="w-4 h-4 inline mr-1"></i> Importar backup
            </button>
            <input type="file" id="datos-import-file" accept=".json" class="hidden" />
          </div>
        </div>

        <!-- Exportar solo partes -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
            <i data-lucide="file-json" class="w-4 h-4"></i> Exportaciones parciales
          </h4>
          <div class="flex flex-wrap gap-2">
            <button id="export-srs" class="px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/30 bg-emerald-900/20 text-emerald-200 hover:bg-emerald-900/40 transition">
              Solo SRS (vocabulario)
            </button>
            <button id="export-decks" class="px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-500/30 bg-amber-900/20 text-amber-200 hover:bg-amber-900/40 transition">
              Solo mazos (biblioteca)
            </button>
            <button id="export-ia" class="px-3 py-1.5 rounded-lg text-xs font-bold border border-fuchsia-500/30 bg-fuchsia-900/20 text-fuchsia-200 hover:bg-fuchsia-900/40 transition">
              Historial IA
            </button>
          </div>
        </div>

        <!-- Restablecer datos -->
        <div class="bg-gray-900 border border-red-900/30 rounded-2xl p-5 space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i> Zona peligrosa
          </h4>
          <button id="clear-all-data-btn" class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-bold transition text-white">
            Borrar todos los datos locales
          </button>
          <p class="text-xs text-red-400/70">Esta acción elimina todo el progreso, vocabulario, historial y ajustes. No se puede deshacer.</p>
        </div>
      </div>
    `;
  },

  // Alternar pestaña
  switchTab(tab) {
    this.tab = tab;
    const content = document.getElementById('ajustes-content');
    if (content) {
      content.innerHTML = tab === 'perfil' ? this.renderPerfil()
                        : tab === 'ajustes' ? this.renderAjustes()
                        : tab === 'atajos' ? this.renderAtajos()
                        : this.renderDatos();
      this.attachEvents();
      if (window.lucide) lucide.createIcons();
    }
    // Actualizar botones de pestaña
    document.querySelectorAll('.ajustes-tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tab;
      btn.className = `ajustes-tab-btn px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${isActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`;
    });
  },

  // Unificar todos los event listeners
  attachEvents() {
    // Pestañas
    document.querySelectorAll('.ajustes-tab-btn').forEach(btn => {
      btn.onclick = () => this.switchTab(btn.dataset.tab);
    });

    // Tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.onclick = () => {
        const theme = btn.dataset.theme;
        window.Muller.Ajustes.set('THEME', theme);
        this.settings.theme = theme;
        this.refreshSection('ajustes');
      };
    });

    // SFX toggle
    const sfxBtn = document.getElementById('toggle-sfx');
    if (sfxBtn) {
      sfxBtn.onclick = () => {
        const newVal = !this.settings.sfxEnabled;
        window.Muller.Ajustes.set('SFX_ENABLED', newVal);
        this.settings.sfxEnabled = newVal;
        this.refreshSection('ajustes');
      };
    }

    // Noise toggle
    const noiseBtn = document.getElementById('toggle-noise');
    if (noiseBtn) {
      noiseBtn.onclick = () => {
        const newVal = !this.settings.noiseExamen;
        window.Muller.Ajustes.set('NOISE', newVal);
        this.settings.noiseExamen = newVal;
        this.refreshSection('ajustes');
      };
    }

    // Podcast toggle
    const podcastBtn = document.getElementById('toggle-podcast');
    if (podcastBtn) {
      podcastBtn.onclick = () => {
        const newVal = !this.settings.podcastMode;
        window.Muller.Ajustes.set('PODCAST_MODE', newVal);
        this.settings.podcastMode = newVal;
        this.refreshSection('ajustes');
      };
    }

    // Audio only toggle
    const audioOnlyBtn = document.getElementById('toggle-audio-only');
    if (audioOnlyBtn) {
      audioOnlyBtn.onclick = () => {
        const newVal = !this.settings.historiaAudioOnly;
        window.Muller.Ajustes.set('HISTORIA_AUDIO_ONLY', newVal);
        this.settings.historiaAudioOnly = newVal;
        this.refreshSection('ajustes');
      };
    }

    // TTS rate
    document.querySelectorAll('.tts-btn').forEach(btn => {
      btn.onclick = () => {
        const rate = btn.dataset.rate;
        window.Muller.Ajustes.set('TTS_RATE', rate);
        this.settings.ttsRate = rate;
        this.refreshSection('ajustes');
      };
    });

    // Floating tools toggle
    const floatBtn = document.getElementById('toggle-floating');
    if (floatBtn) {
      floatBtn.onclick = () => {
        const newVal = !this.settings.showFloatingTools;
        window.Muller.Ajustes.set('FLOATING_TOOLS', newVal);
        this.settings.showFloatingTools = newVal;
        this.refreshSection('ajustes');
      };
    }

    // Reduce motion toggle
    const motionBtn = document.getElementById('toggle-motion');
    if (motionBtn) {
      motionBtn.onclick = () => {
        const newVal = !this.settings.reduceMotion;
        window.Muller.Ajustes.set('REDUCE_MOTION', newVal);
        this.settings.reduceMotion = newVal;
        this.refreshSection('ajustes');
      };
    }

    // Onboarding toggle
    const onboardBtn = document.getElementById('toggle-onboarding');
    if (onboardBtn) {
      onboardBtn.onclick = () => {
        const newVal = !this.settings.onboardingDone;
        window.Muller.Ajustes.set('ONBOARDING', newVal ? '1' : '0');
        this.settings.onboardingDone = newVal;
        this.refreshSection('ajustes');
      };
    }

        // ─── Guardar API Key ───
    const saveKeyBtn = document.getElementById('save-ia-key');
    const keyInput = document.getElementById('ia-api-key');
    const keyStatus = document.getElementById('ia-key-status');
    if (saveKeyBtn && keyInput) {
      // Cargar valor guardado
      const savedKey = localStorage.getItem('muller_ia_api_key') || '';
      keyInput.value = savedKey;
      if (savedKey) { keyStatus.textContent = '✓ Configurada'; keyStatus.classList.remove('hidden'); }
      saveKeyBtn.onclick = () => {
        const val = keyInput.value.trim();
        if (val) {
          localStorage.setItem('muller_ia_api_key', val);
          keyStatus.textContent = '✓ Configurada';
          keyStatus.className = 'ml-2 text-xs text-emerald-400';
        } else {
          localStorage.removeItem('muller_ia_api_key');
          keyStatus.textContent = '✗ Eliminada';
          keyStatus.className = 'ml-2 text-xs text-red-400';
        }
        keyStatus.classList.remove('hidden');
        setTimeout(() => keyStatus.classList.add('hidden'), 2000);
      };
    }
    // ─── Temperatura IA ───
    document.querySelectorAll('.temp-btn').forEach(btn => {
      btn.onclick = () => {
        const temp = btn.dataset.temp;
        window.Muller.setTemperature(parseFloat(temp));
        // Actualizar UI de todos los botones de temperatura
        document.querySelectorAll('.temp-btn').forEach(b => {
          b.className = b.dataset.temp === temp
            ? 'temp-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition bg-amber-600 border-amber-400 text-white'
            : 'temp-btn px-3 py-1.5 rounded-lg text-xs font-bold border transition bg-gray-800 border-gray-700 text-gray-400 hover:text-white';
        });
      };
    });

    // Reset settings
    const resetBtn = document.getElementById('reset-settings-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm('¿Restablecer todos los ajustes a sus valores por defecto?')) {
          window.Muller.Ajustes.resetSettings();
          this.settings = window.Muller.Ajustes.getAll();
          this.refreshSection('ajustes');
          window.Muller.Utils?.showToast?.('Ajustes restablecidos', 'info');
        }
      };
    }

    // Exportar backup
    const exportBtns = document.querySelectorAll('#ajustes-export-btn, #datos-export-full');
    exportBtns.forEach(b => {
      b.onclick = () => window.Muller.Ajustes.exportFullBackup();
    });

    // Importar backup
    const importBtns = document.querySelectorAll('#ajustes-import-btn, #datos-import-full');
    importBtns.forEach(b => {
      b.onclick = () => {
        const fileInput = document.getElementById('datos-import-file') || document.getElementById('ajustes-import-file');
        fileInput?.click();
      };
    });

    const fileInputs = document.querySelectorAll('#ajustes-import-file, #datos-import-file');
    fileInputs.forEach(input => {
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          await window.Muller.Ajustes.importBackup(file);
          window.Muller.Utils?.showToast?.('Backup importado correctamente. Recarga la app para ver los cambios.', 'success');
          // Recargar datos
          setTimeout(() => location.reload(), 1500);
        } catch (err) {
          window.Muller.Utils?.showToast?.('Error al importar: ' + err.message, 'error');
        }
      };
    });

    // Export parciales
    document.getElementById('export-srs')?.addEventListener('click', () => {
      window.Muller.Ajustes.exportFiltered('srs');
    });
    document.getElementById('export-decks')?.addEventListener('click', () => {
      window.Muller.Ajustes.exportFiltered('decks');
    });
    document.getElementById('export-ia')?.addEventListener('click', () => {
      window.Muller.Ajustes.exportFiltered('ia');
    });

    // Clear all data
    document.getElementById('clear-all-data-btn')?.addEventListener('click', () => {
      if (confirm('⚠️ ¿Estás seguro? Se borrará TODO tu progreso, vocabulario, historial y ajustes. Esta acción no se puede deshacer.')) {
        if (confirm('Última advertencia: ¿Borrar todos los datos locales?')) {
          window.Muller.Ajustes.clearAllData();
          window.Muller.Utils?.showToast?.('Datos borrados. Recargando...', 'warning');
          setTimeout(() => location.reload(), 1000);
        }
      }
    });

    // ─── "Sincronizar ahora" button ───
    document.getElementById('cloud-sync-now-btn')?.addEventListener('click', async () => {
      const btn = document.getElementById('cloud-sync-now-btn');
      const status = document.getElementById('cloud-sync-status');
      if (btn) btn.disabled = true;

      if (status) {
        status.textContent = '⏳ Sincronizando...';
        status.className = 'text-xs text-amber-400';
        status.classList.remove('hidden');
      }

      const M = window.Muller;
      try {
        // Primero guardar todo local → nube
        if (typeof M.saveAllToCloud === 'function') {
          await M.saveAllToCloud();
        }
        // Luego cargar todo nube → local
        if (typeof M.syncAllFromCloud === 'function') {
          await M.syncAllFromCloud();
        }

        if (status) {
          status.textContent = '✅ Sincronización completa';
          status.className = 'text-xs text-emerald-400';
        }
      } catch (e) {
        console.warn('Error en sincronización manual:', e);
        if (status) {
          status.textContent = '❌ Error: ' + (e.message || 'desconocido');
          status.className = 'text-xs text-red-400';
        }
      } finally {
        if (btn) btn.disabled = false;
        // Ocultar el mensaje después de 4 segundos
        setTimeout(() => { if (status) status.classList.add('hidden'); }, 4000);
      }
    });

    // Guardar nombre
    document.getElementById('ajustes-save-name')?.addEventListener('click', () => {
      const input = document.getElementById('ajustes-name-input');
      const name = input?.value.trim();
      if (!name) {
        const msg = document.getElementById('ajustes-name-msg');
        if (msg) { msg.textContent = 'Escribe un nombre válido.'; msg.classList.remove('hidden'); }
        return;
      }
      window.Muller.Storage?.saveProgress?.({ username: name });
      this.settings.username = name;
      const msg = document.getElementById('ajustes-name-msg');
      if (msg) { msg.textContent = 'Nombre actualizado.'; msg.classList.remove('hidden'); msg.className = 'text-xs text-emerald-400'; }
      setTimeout(() => {
        if (msg) msg.classList.add('hidden');
      }, 2000);
    });
  },

  // Refrescar visualmente una sección sin re-renderizar todo
  refreshSection(section) {
    if (section === 'ajustes') {
      const content = document.getElementById('ajustes-content');
      if (content) {
        content.innerHTML = this.renderAjustes();
        this.attachEvents();
        if (window.lucide) lucide.createIcons();
      }
    }
  },

  bind() {
    // Ya manejado en attachEvents
  }
};

// Alias minúscula para que PanelRouter lo encuentre (busca 'ajustes', no 'AjustesPanel')
window.Muller.Panels.ajustes = window.Muller.Panels.AjustesPanel;

// Método auxiliar para exportar datos filtrados
window.Muller.Ajustes.exportFiltered = function(type) {
  const data = {};
  const prefixMap = {
    srs: ['bx_srs_', 'muller_srs_', 'srs_'],
    decks: ['bx_deck_', 'muller_deck_', 'deck_'],
    ia: ['ia_chat_history'],
  };
  const prefixes = prefixMap[type] || [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (prefixes.some(p => key.startsWith(p))) {
      data[key] = localStorage.getItem(key);
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

