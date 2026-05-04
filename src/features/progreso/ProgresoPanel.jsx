// src/features/progreso/ProgresoPanel.jsx
(function() {
  window.Muller = window.Muller || {};
  window.Muller.Panels = window.Muller.Panels || {};

  const M = window.Muller;

  // Iconos SVG inline para evitar error React #300
  const SVG_PROGRESS = {
    trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    flame: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    zap: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    brain: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5C8.5 3 4 5 4 9c0 2.5 1.5 4.5 3 5.5V22l5-3 5 3v-7.5c1.5-1 3-3 3-5.5 0-4-4.5-6-8-4.5z"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    share2: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    refreshCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    // Iconos premium
    coins: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>',
    listTodo: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="12" y1="9" x2="12" y2="17"/></svg>',
    grid3x3: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    clipboardList: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 12h6m-6 4h6"/></svg>',
    monitor: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    barChart3: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    messageSquare: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    music: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    eye: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    thumbsUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
    activity: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    helpCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    layers: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    gem: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    trendingDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
    alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    smile: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    bell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    moreHorizontal: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
  };

  const svg = (name, cls = 'w-5 h-5') => `<span class="${cls}" style="display:inline-flex">${SVG_PROGRESS[name] || ''}</span>`;

  // ─── PANEL PRINCIPAL ───
  window.Muller.Panels.ProgresoPanel = function ProgresoPanel({ session }) {
    const { useState, useEffect, useRef } = React;
    const [dashboard, setDashboard] = useState(null);
    const [last30Days, setLast30Days] = useState([]);
    const [weeklyStats, setWeeklyStats] = useState([]);
    const [profileLevel, setProfileLevel] = useState({});
    const [cloudStatus, setCloudStatus] = useState(null); // 'syncing' | 'ok' | 'error' | null
    const [syncMsg, setSyncMsg] = useState('');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const exportRef = useRef(null);

    useEffect(() => {
      loadData();
      // Cerrar menú export al hacer click fuera
      const handleClick = (e) => { if (exportRef.current && !exportRef.current.contains(e.target)) setShowExportMenu(false); };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    async function loadData() {
      // Asegurar que las funciones de progreso existen (de entrenamientoHelpers.jsx)
      ensureProgressFunctions();
      const data = M.Progreso.getDashboardData();
      setDashboard(data);
      setLast30Days(M.Progreso.getLast30DaysActivity());
      setWeeklyStats(M.Progreso.getWeeklyStats());
      setProfileLevel(M.Progreso.getProfileLevel(data.totalPoints));

      // Sincronizar con la nube automáticamente
      syncFromCloud();
    }

    async function syncFromCloud() {
      if (!session) return;
      setCloudStatus('syncing');
      try {
        const result = await M.Progreso.pullProgressFromCloud();
        if (result && result.ok) {
          if (result.data) {
            // Fusión: cloud tiene prioridad (última actualización)
            mergeCloudData(result.data);
          }
          setCloudStatus('ok');
          setSyncMsg('Datos sincronizados');
        } else {
          if (result && result.reason === 'Sin sesión') {
            setCloudStatus(null);
          } else {
            setCloudStatus('ok');
            setSyncMsg('Modo offline');
          }
        }
      } catch (e) {
        setCloudStatus('error');
        setSyncMsg('Error de conexión');
      }
      setTimeout(() => setSyncMsg(''), 3000);
    }

    async function syncToCloud() {
      if (!session) return;
      setCloudStatus('syncing');
      try {
        const result = await M.Progreso.syncProgressToCloud();
        if (result && result.ok) {
          setCloudStatus('ok');
          setSyncMsg('¡Guardado en la nube!');
        } else {
          setCloudStatus('error');
          setSyncMsg(result?.reason || 'Error al guardar');
        }
      } catch (e) {
        setCloudStatus('error');
        setSyncMsg('Error de conexión');
      }
      setTimeout(() => setSyncMsg(''), 3000);
    }

    function mergeCloudData(cloudData) {
      if (!cloudData || !cloudData.totalPoints) return;
      // Combinar datos locales con cloud (máximo de ambos)
      const localPoints = dashboard?.totalPoints || 0;
      const cloudPoints = cloudData.totalPoints || 0;
      if (cloudPoints > localPoints) {
        // Actualizar localStorage con datos cloud
        const advanced = (typeof M.getAdvancedProgress === 'function') ? M.getAdvancedProgress() : {};
        advanced.points = cloudPoints;
        advanced.streak = cloudData.streak || advanced.streak || 0;
        advanced.wordsLearned = cloudData.wordsLearned || advanced.wordsLearned || 0;
        advanced.sessions = cloudData.sessionsCompleted || cloudData.sessions || advanced.sessions || 0;
        advanced.readingSessions = cloudData.readingSessions || advanced.readingSessions || 0;
        advanced.writingSessions = cloudData.writingSessions || advanced.writingSessions || 0;
        if (typeof M.setAdvancedProgress === 'function') {
          M.setAdvancedProgress(advanced);
        }
        // Recargar dashboard
        const newData = M.Progreso.getDashboardData();
        setDashboard(newData);
        setProfileLevel(M.Progreso.getProfileLevel(newData.totalPoints));
      }
    }

    function ensureProgressFunctions() {
      // Las funciones getAdvancedProgress etc están en entrenamientoHelpers.jsx
      // Si no existen, creamos fallbacks
      if (typeof M.getAdvancedProgress !== 'function') {
        M.getAdvancedProgress = function() {
          try { return JSON.parse(localStorage.getItem(M.KEYS?.ADVANCED_PROGRESS || 'muller_advanced_progress') || '{}'); } catch(e) { return {}; }
        };
        M.setAdvancedProgress = function(data) {
          localStorage.setItem(M.KEYS?.ADVANCED_PROGRESS || 'muller_advanced_progress', JSON.stringify(data));
        };
        M.getDailyActivity = function() {
          try { return JSON.parse(localStorage.getItem(M.KEYS?.DAILY_ACTIVITY || 'muller_daily_activity') || '{}'); } catch(e) { return {}; }
        };
        M.setDailyActivity = function(data) {
          localStorage.setItem(M.KEYS?.DAILY_ACTIVITY || 'muller_daily_activity', JSON.stringify(data));
        };
        M.getTodayISODate = function() { return new Date().toISOString().slice(0,10); };
        M.getAchievementsUnlocked = function() {
          try { return JSON.parse(localStorage.getItem(M.KEYS?.ACHIEVEMENTS || 'muller_achievements') || '{}'); } catch(e) { return {}; }
        };
        M.calculateStreak = function(daysMap) {
          let streak = 0;
          const today = M.getTodayISODate();
          const map = daysMap || M.getDailyActivity().days || {};
          let d = new Date(today);
          while (true) {
            const key = d.toISOString().slice(0,10);
            if (map[key]) { streak++; d.setDate(d.getDate() - 1); }
            else break;
          }
          return streak;
        };
        M.getProgressCounts = function(progress, prefix) {
          const entries = Object.entries(progress).filter(function(e) { return e[0].startsWith(prefix + '::'); });
          return { attempts: entries.length, mastered: entries.filter(e => e[1] >= 3).length };
        };
        M.getAdvancedDashboard = function() {
          const progress = M.getAdvancedProgress();
          const daily = M.getDailyActivity();
          const today = M.getTodayISODate();
          const dailyGoal = daily.dailyGoal || 30;
          const todayAttempts = (daily.days && daily.days[today]) || 0;
          const art = M.getProgressCounts(progress, 'articulos');
          const verb = M.getProgressCounts(progress, 'verbos');
          const prep = M.getProgressCounts(progress, 'preposiciones');
          const totalAttempts = art.attempts + verb.attempts + prep.attempts;
          return {
            points: progress.points || 0,
            wordsLearned: progress.wordsLearned || 0,
            sessions: progress.sessions || 0,
            articlesMastered: art.mastered,
            verbsMastered: verb.mastered,
            prepositionsMastered: prep.mastered,
            readingSessions: progress.readingSessions || 0,
            writingSessions: progress.writingSessions || 0,
            dailyProgress: Math.min(100, Math.round((todayAttempts / Math.max(1, dailyGoal)) * 100)),
            streakDays: M.calculateStreak(daily.days)
          };
        };
      }
    }

    function exportProgress() {
      const data = {
        exportDate: new Date().toISOString(),
        dashboard: dashboard,
        profileLevel: profileLevel,
        last30Days: last30Days,
        weeklyStats: weeklyStats,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `progreso-plaza-muller-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
    }

    function exportAsImage() {
      // Exportar como texto para compartir
      const lines = [
        `📊 **Mi Progreso - Profesor Plaza Müller**`,
        ``,
        `🏆 Nivel ${profileLevel.level}: ${profileLevel.title}`,
        `🔥 Racha: ${dashboard?.streak || 0} días`,
        `⭐ Puntos totales: ${dashboard?.totalPoints || 0}`,
        `📚 Palabras aprendidas: ${dashboard?.wordsLearned || 0}`,
        `🎯 Sesiones completadas: ${dashboard?.sessionsCompleted || 0}`,
        ``,
        `📖 ${dashboard?.articlesMastered || 0} artículos · ${dashboard?.verbsMastered || 0} verbos · ${dashboard?.readingSessions || 0} lecturas`,
        ``,
        `#Alemán #PlazaMüller #AprenderAlemán`,
      ];
      const text = lines.join('\n');
      navigator.clipboard.writeText(text).then(() => {
        if (M.toast) M.toast('¡Texto copiado al portapapeles!');
        else alert('¡Texto copiado al portapapeles!');
      }).catch(() => {
        if (M.toast) M.toast('No se pudo copiar');
        else alert('No se pudo copiar');
      });
      setShowExportMenu(false);
    }

    if (!dashboard) {
      return React.createElement('div', {
        className: 'flex items-center justify-center p-12',
        style: { minHeight: '60vh' }
      }, React.createElement('div', {
        className: 'animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400'
      }));
    }

    const maxDaily = Math.max(1, ...last30Days.map(d => d.count));
    const maxWeekly = Math.max(1, ...weeklyStats.map(d => d.value));
    const nextLevelPoints = getNextLevelPoints(profileLevel.level, dashboard.totalPoints);

    return React.createElement('div', {
      className: 'flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-6',
      style: { fontFamily: 'Outfit, sans-serif' }
    },
      /* ========== CABECERA ========== */
      React.createElement('div', {
        className: 'flex flex-wrap items-center justify-between gap-2'
      },
        React.createElement('h1', {
          className: 'text-2xl md:text-4xl font-black text-amber-100 flex items-center gap-2'
        },
          React.createElement('span', {
            className: 'w-8 h-8 md:w-10 md:h-10',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.trendingUp }
          }),
          ' Progreso'
        ),
        React.createElement('div', {
          className: 'flex items-center gap-2'
        },
          // Indicador cloud
          cloudStatus === 'syncing' && React.createElement('span', {
            className: 'w-6 h-6 animate-spin text-cyan-400',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.refreshCcw }
          }),
          cloudStatus === 'ok' && syncMsg && React.createElement('span', {
            className: 'text-[10px] text-emerald-400'
          }, syncMsg),
          cloudStatus === 'error' && React.createElement('span', {
            className: 'text-[10px] text-rose-400'
          }, 'Sin conexión'),
          React.createElement('div', {
            className: `px-4 py-2 rounded-full text-sm font-black text-white shadow-lg ${profileLevel.color || 'bg-gray-500'}`
          },
            `${profileLevel.emoji} Nivel ${profileLevel.level} · ${profileLevel.title}`
          )
        )
      ),

      /* ========== TARJETAS PRINCIPALES ========== */
      React.createElement('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 gap-3'
      },
        createCard(flameIcon(), `${dashboard.streak}`, 'Racha (días)', 'from-amber-900/60 to-amber-800/40', 'border-amber-500/30', 'text-amber-400'),
        createCard(awardIcon(), `${dashboard.totalPoints}`, 'Puntos totales', 'from-emerald-900/60 to-emerald-800/40', 'border-emerald-500/30', 'text-emerald-400'),
        createCard(bookIcon(), `${dashboard.wordsLearned}`, 'Palabras', 'from-blue-900/60 to-blue-800/40', 'border-blue-500/30', 'text-blue-400'),
        createCard(zapIcon(), `${dashboard.sessionsCompleted}`, 'Sesiones', 'from-purple-900/60 to-purple-800/40', 'border-purple-500/30', 'text-purple-400')
      ),

      /* ========== PROGRESO AL SIGUIENTE NIVEL + BARRA XP ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('div', {
          className: 'flex items-center justify-between mb-2'
        },
          React.createElement('h3', {
            className: 'text-sm font-black text-amber-200 flex items-center gap-2'
          },
            React.createElement('span', {
              className: 'w-4 h-4',
              dangerouslySetInnerHTML: { __html: SVG_PROGRESS.target }
            }),
            `Progreso al Nivel ${profileLevel.level + 1}`
          ),
          React.createElement('span', {
            className: 'text-xs text-gray-400'
          }, `${dashboard.totalPoints} / ${profileLevel.level * 500 + 500} XP`)
        ),
        React.createElement('div', {
          className: 'w-full bg-gray-700/50 rounded-full h-3 overflow-hidden'
        },
          React.createElement('div', {
            className: 'h-full rounded-full transition-all duration-700',
            style: {
              width: `${Math.min(100, (nextLevelPoints.percent))}%`,
              background: 'linear-gradient(90deg, #f59e0b, #d97706)'
            }
          })
        ),
        React.createElement('p', {
          className: 'text-[10px] text-gray-500 mt-1 text-right'
        }, `Faltan ${nextLevelPoints.remaining} XP para subir de nivel`)
      ),

      /* ========== PROGRESO DIARIO (barra circular) ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('div', {
          className: 'flex items-center justify-between'
        },
          React.createElement('h3', {
            className: 'text-sm font-black text-amber-200 flex items-center gap-2'
          },
            React.createElement('span', {
              className: 'w-4 h-4',
              dangerouslySetInnerHTML: { __html: SVG_PROGRESS.checkCircle }
            }),
            'Meta diaria'
          ),
          React.createElement('div', {
            className: 'flex items-center gap-2'
          },
            React.createElement('button', {
              onClick: syncToCloud,
              className: 'text-[10px] px-3 py-1.5 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/50 transition-colors cursor-pointer flex items-center gap-1',
              title: 'Guardar en la nube'
            },
              React.createElement('span', {
                className: 'w-3 h-3 inline-block',
                dangerouslySetInnerHTML: { __html: SVG_PROGRESS.refreshCcw }
              }),
              ' Guardar'
            ),
            React.createElement('div', {
              ref: exportRef,
              className: 'relative'
            },
              React.createElement('button', {
                onClick: () => setShowExportMenu(!showExportMenu),
                className: 'text-[10px] px-3 py-1.5 rounded-full bg-amber-600/30 text-amber-300 border border-amber-500/30 hover:bg-amber-600/50 transition-colors cursor-pointer flex items-center gap-1'
              },
                React.createElement('span', {
                  className: 'w-3 h-3 inline-block',
                  dangerouslySetInnerHTML: { __html: SVG_PROGRESS.share2 }
                }),
                ' Exportar'
              ),
              showExportMenu && React.createElement('div', {
                className: 'absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-20 min-w-[160px]'
              },
                React.createElement('button', {
                  onClick: exportAsImage,
                  className: 'w-full text-left px-4 py-2 text-xs text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-2'
                },
                  React.createElement('span', {
                    className: 'w-3 h-3 inline-block',
                    dangerouslySetInnerHTML: { __html: SVG_PROGRESS.share2 }
                  }),
                  ' Copiar resumen'
                ),
                React.createElement('button', {
                  onClick: exportProgress,
                  className: 'w-full text-left px-4 py-2 text-xs text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-2'
                },
                  React.createElement('span', {
                    className: 'w-3 h-3 inline-block',
                    dangerouslySetInnerHTML: { __html: SVG_PROGRESS.download }
                  }),
                  ' Exportar JSON'
                )
              )
            )
          )
        ),
        React.createElement('div', {
          className: 'flex items-center gap-4 mt-3'
        },
          // Círculo de progreso
          React.createElement('div', {
            className: 'relative w-20 h-20 flex-shrink-0'
          },
            React.createElement('svg', {
              viewBox: '0 0 36 36',
              className: 'w-full h-full transform -rotate-90'
            },
              React.createElement('path', {
                d: 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831',
                fill: 'none',
                stroke: 'rgba(255,255,255,0.1)',
                strokeWidth: '3'
              }),
              React.createElement('path', {
                d: 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831',
                fill: 'none',
                stroke: '#f59e0b',
                strokeWidth: '3',
                strokeDasharray: `${dashboard.dailyProgress || 0}, 100`,
                strokeLinecap: 'round'
              })
            ),
            React.createElement('span', {
              className: 'absolute inset-0 flex items-center justify-center text-lg font-black text-amber-200'
            }, `${dashboard.dailyProgress || 0}%`)
          ),
          React.createElement('div', {
            className: 'flex-1'
          },
            React.createElement('p', {
              className: 'text-xs text-gray-400'
            }, 'Actividad de hoy'),
            React.createElement('div', {
              className: 'flex flex-wrap gap-2 mt-2'
            },
              ['Artículos', 'Verbos', 'Lectura', 'Escritura'].map((label, i) =>
                React.createElement('span', {
                  key: label,
                  className: `text-[10px] px-2 py-1 rounded-full ${
                    i === 0 ? 'bg-rose-900/40 text-rose-300' :
                    i === 1 ? 'bg-cyan-900/40 text-cyan-300' :
                    i === 2 ? 'bg-sky-900/40 text-sky-300' :
                    'bg-purple-900/40 text-purple-300'
                  }`
                }, label)
              )
            ),
            dashboard.streak >= 7
              ? React.createElement('p', {
                  className: 'text-xs text-amber-400 mt-2'
                }, `🔥 ¡${dashboard.streak} días seguidos! Sigue así.`)
              : dashboard.streak >= 3
                ? React.createElement('p', {
                    className: 'text-xs text-amber-400 mt-2'
                  }, `🔥 ¡${dashboard.streak} días de racha! La constancia es clave.`)
                : React.createElement('p', {
                    className: 'text-xs text-gray-500 mt-2'
                  }, 'Vuelve mañana para mantener tu racha.')
          )
        )
      ),

      /* ========== ACTIVIDAD DIARIA (mapa de calor) ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('h3', {
          className: 'text-sm font-black text-amber-200 flex items-center gap-2 mb-3'
        },
          React.createElement('span', {
            className: 'w-4 h-4',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.calendar }
          }),
          ' Actividad (últimos 30 días)'
        ),
        React.createElement('div', {
          className: 'grid grid-cols-15 gap-1'
        }, last30Days.map((d, i) =>
          React.createElement('div', {
            key: d.date,
            className: 'relative group'
          },
            React.createElement('div', {
              className: 'w-full aspect-square rounded-sm transition-colors',
              style: {
                backgroundColor: d.count > 0
                  ? `rgba(251, 191, 36, ${Math.min(0.15 + (d.count / maxDaily) * 0.85, 1)})`
                  : 'rgba(255,255,255,0.05)'
              },
              title: `${d.date}: ${d.count} actividades`
            }),
            React.createElement('span', {
              className: 'absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10'
            }, `${d.date}: ${d.count}`)
          )
        )),
        React.createElement('div', {
          className: 'flex items-center justify-between mt-2 text-[9px] text-gray-500'
        },
          React.createElement('span', null, 'Hace 30 días'),
          React.createElement('span', null, 'Hoy')
        )
      ),

      /* ========== GRÁFICO SEMANAL ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('h3', {
          className: 'text-sm font-black text-amber-200 mb-3 flex items-center gap-2'
        },
          React.createElement('span', {
            className: 'w-4 h-4',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.trendingUp }
          }),
          ' Esta semana'
        ),
        React.createElement('div', {
          className: 'flex items-end gap-2 h-32'
        }, weeklyStats.map((d, i) =>
          React.createElement('div', {
            key: i,
            className: 'flex-1 flex flex-col items-center gap-1'
          },
            React.createElement('span', {
              className: 'text-[10px] text-amber-300 font-bold'
            }, `${d.value}`),
            React.createElement('div', {
              className: 'w-full bg-gradient-to-t from-amber-500/80 to-amber-400/40 rounded-t-md transition-all',
              style: { height: `${Math.max(4, (d.value / maxWeekly) * 100)}%` }
            }),
            React.createElement('span', {
              className: 'text-[9px] text-gray-500'
            }, d.label)
          )
        ))
      ),

      /* ========== ESTADÍSTICAS DETALLADAS ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('h3', {
          className: 'text-sm font-black text-amber-200 mb-3'
        }, 'Estadísticas detalladas'),
        React.createElement('div', {
          className: 'grid grid-cols-2 md:grid-cols-3 gap-3'
        },
          createStatCard('🎨', 'Artículos', dashboard.articlesMastered, 'from-rose-900/30 to-rose-800/20', 'border-rose-500/20'),
          createStatCard('📚', 'Verbos', dashboard.verbsMastered, 'from-cyan-900/30 to-cyan-800/20', 'border-cyan-500/20'),
          createStatCard('📍', 'Preposiciones', dashboard.prepositionsMastered, 'from-yellow-900/30 to-yellow-800/20', 'border-yellow-500/20'),
          createStatCard('📖', 'Lecturas', dashboard.readingSessions, 'from-sky-900/30 to-sky-800/20', 'border-sky-500/20'),
          createStatCard('✏️', 'Escrituras', dashboard.writingSessions, 'from-purple-900/30 to-purple-800/20', 'border-purple-500/20'),
          createStatCard('🏆', 'Logros', dashboard.achievements?.length || 0, 'from-amber-900/30 to-amber-800/20', 'border-amber-500/20')
        )
      ),

      /* ========== LOGROS DESBLOQUEADOS ========== */
      dashboard.achievements && dashboard.achievements.length > 0 &&
        React.createElement('div', {
          className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
        },
          React.createElement('h3', {
            className: 'text-sm font-black text-amber-200 mb-3 flex items-center gap-2'
          },
            React.createElement('span', {
              className: 'w-4 h-4',
              dangerouslySetInnerHTML: { __html: SVG_PROGRESS.award }
            }),
            ' Logros desbloqueados'
          ),
          React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 gap-2'
          }, dashboard.achievements.map((ach, i) =>
            React.createElement('div', {
              key: i,
              className: 'flex items-center gap-3 bg-amber-900/20 border border-amber-500/20 rounded-lg px-3 py-2'
            },
              React.createElement('span', {
                className: 'text-2xl'
              }, ach.emoji || '🏆'),
              React.createElement('div', null,
                React.createElement('p', {
                  className: 'text-sm font-bold text-amber-200'
                }, ach.name || ach.title),
                ach.description && React.createElement('p', {
                  className: 'text-[10px] text-amber-400/80'
                }, ach.description)
              )
            )
          ))
        ),

      /* ========== PLAZA MÜNZEN (MONEDAS PREMIUM) ========== */
      (dashboard.muenzen > 0 || dashboard.level) &&
        React.createElement('div', {
          className: 'rounded-xl bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 p-4'
        },
          React.createElement('div', {
            className: 'flex items-center justify-between mb-2'
          },
            React.createElement('h3', {
              className: 'text-sm font-black text-yellow-200 flex items-center gap-2'
            },
              React.createElement('span', {
                className: 'w-4 h-4',
                dangerouslySetInnerHTML: { __html: SVG_PROGRESS.coins }
              }),
              ' PlazaMünzen'
            ),
            dashboard.qualityTier && React.createElement('span', {
              className: `text-[10px] px-2 py-0.5 rounded-full ${
                dashboard.qualityTier === 'gold' ? 'bg-yellow-600/40 text-yellow-300' :
                dashboard.qualityTier === 'silver' ? 'bg-gray-400/30 text-gray-200' :
                'bg-amber-700/40 text-amber-300'
              }`
            }, dashboard.qualityTier === 'gold' ? '🥇 Oro' : dashboard.qualityTier === 'silver' ? '🥈 Plata' : '🥉 Bronce')
          ),
          React.createElement('div', {
            className: 'grid grid-cols-2 gap-3'
          },
            React.createElement('div', {
              className: 'bg-black/30 rounded-lg p-3 text-center'
            },
              React.createElement('p', {
                className: 'text-2xl font-black text-yellow-400'
              }, dashboard.muenzen || 0),
              React.createElement('p', {
                className: 'text-[10px] text-yellow-400/70'
              }, 'Münzen actuales')
            ),
            React.createElement('div', {
              className: 'bg-black/30 rounded-lg p-3 text-center'
            },
              React.createElement('p', {
                className: 'text-2xl font-black text-amber-300'
              }, dashboard.totalEarned || 0),
              React.createElement('p', {
                className: 'text-[10px] text-amber-300/70'
              }, 'Münzen ganadas')
            )
          ),
          dashboard.level && React.createElement('div', {
            className: 'mt-2 bg-black/20 rounded-lg px-3 py-2 text-center'
          },
            React.createElement('p', {
              className: 'text-xs text-yellow-200/80'
            }, `🏅 Nivel cualitativo: ${dashboard.level}`)
          )
        ),

      /* ========== HEATMAP DE ACTIVIDAD ========== */
      dashboard.heatmap && Object.keys(dashboard.heatmap).length > 0 &&
        React.createElement('div', {
          className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
        },
          React.createElement('h3', {
            className: 'text-sm font-black text-amber-200 mb-3 flex items-center gap-2'
          },
            React.createElement('span', {
              className: 'w-4 h-4',
              dangerouslySetInnerHTML: { __html: SVG_PROGRESS.grid3x3 }
            }),
            ' Heatmap de Actividad'
          ),
          React.createElement('div', {
            className: 'grid grid-cols-7 gap-1'
          }, (function() {
            const heat = dashboard.heatmap;
            const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
            const cells = [];
            const today = new Date();
            // Mostrar ~12 semanas hacia atrás
            for (let w = 0; w < 12; w++) {
              for (let d = 6; d >= 0; d--) {
                const date = new Date(today);
                date.setDate(date.getDate() - (w * 7 + d));
                const key = date.toISOString().slice(0,10);
                const val = heat[key] || 0;
                // Usar escala logarítmica para el color
                let intensity = 0;
                if (val > 0) {
                  intensity = Math.min(1, Math.log(val + 1) / Math.log(60));
                }
                cells.push(
                  React.createElement('div', {
                    key: key,
                    className: 'w-full aspect-square rounded-sm',
                    style: {
                      backgroundColor: intensity > 0
                        ? `rgba(251, 191, 36, ${0.1 + intensity * 0.9})`
                        : 'rgba(255,255,255,0.03)'
                    },
                    title: `${key}: ${val} min`
                  })
                );
              }
            }
            if (cells.length === 0) {
              return React.createElement('div', {
                className: 'text-[10px] text-gray-500 text-center py-4 col-span-7'
              }, 'No hay datos de actividad disponibles');
            }
            return cells;
          })()),
          React.createElement('div', {
            className: 'flex items-center justify-between mt-2 text-[9px] text-gray-500'
          },
            React.createElement('span', null, 'Hace 12 semanas'),
            React.createElement('span', null, 'Ahora')
          )
        ),

      /* ========== PREDICCIÓN TELC ========== */
      dashboard.telcPrediction &&
        React.createElement('div', {
          className: 'rounded-xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-4'
        },
          React.createElement('h3', {
            className: 'text-sm font-black text-purple-200 mb-2 flex items-center gap-2'
          },
            React.createElement('span', {
              className: 'w-4 h-4',
              dangerouslySetInnerHTML: { __html: SVG_PROGRESS.barChart3 }
            }),
            ' Predicción TELC'
          ),
          React.createElement('div', {
            className: 'flex items-center gap-3'
          },
            React.createElement('div', {
              className: 'text-center'
            },
              React.createElement('span', {
                className: 'text-3xl font-black text-purple-300'
              }, dashboard.telcPrediction.estimatedLevel || 'B1'),
              React.createElement('p', {
                className: 'text-[10px] text-purple-400/70'
              }, 'Nivel estimado')
            ),
            React.createElement('div', {
              className: 'flex-1'
            },
              dashboard.telcPrediction.probability && React.createElement('div', {
                className: 'flex items-center gap-2'
              },
                React.createElement('div', {
                  className: 'flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden'
                },
                  React.createElement('div', {
                    className: 'h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400',
                    style: { width: `${Math.min(100, dashboard.telcPrediction.probability)}%` }
                  })
                ),
                React.createElement('span', {
                  className: 'text-xs text-purple-300 font-bold'
                }, `${dashboard.telcPrediction.probability}%`)
              ),
              dashboard.telcPrediction.nextExamDate && React.createElement('p', {
                className: 'text-[10px] text-purple-400/60 mt-1'
              }, `📅 Próximo examen: ${dashboard.telcPrediction.nextExamDate}`)
            )
          )
        ),

      /* ========== TIEMPO TOTAL ESTIMADO ========== */
      React.createElement('div', {
        className: 'rounded-xl bg-gradient-to-r from-amber-900/30 to-emerald-900/30 border border-amber-500/20 p-4 text-center'
      },
        React.createElement('p', {
          className: 'text-sm text-amber-200/90 font-medium'
        },
          dashboard.streak >= 7
            ? `🔥 ¡${dashboard.streak} días seguidos! Estás construyendo un hábito imparable.`
            : dashboard.streak >= 3
              ? `🔥 ¡${dashboard.streak} días de racha! La constancia es la clave del éxito.`
              : '🌟 ¡Cada día cuenta! Vuelve mañana para mantener tu racha.'
        ),
        dashboard.streak >= 3 && React.createElement('p', {
          className: 'text-[10px] text-amber-400/60 mt-1'
        }, 'Los hábitos se consolidan a los 21 días. ¡Sigue así!')
      )
    );
  };

  // ─── ALIAS para PanelRouter ───
  window.Muller.Panels.progreso = window.Muller.Panels.ProgresoPanel;

  // ========== FUNCIONES AYUDANTES ==========

  function getNextLevelPoints(currentLevel, currentPoints) {
    const needed = currentLevel * 500 + 500;
    const percent = (currentPoints / needed) * 100;
    return { percent: Math.min(100, percent), remaining: Math.max(0, needed - currentPoints), needed };
  }

  function createCard(icon, value, label, bgGrad, border, iconColor) {
    return React.createElement('div', {
      className: `rounded-xl p-4 text-center bg-gradient-to-br ${bgGrad} border ${border}`
    },
      React.createElement('div', {
        className: `w-6 h-6 mx-auto mb-1 ${iconColor}`,
        dangerouslySetInnerHTML: { __html: icon }
      }),
      React.createElement('p', {
        className: 'text-2xl md:text-3xl font-black text-amber-200'
      }, value),
      React.createElement('p', {
        className: 'text-[10px] text-amber-400 uppercase tracking-wider'
      }, label)
    );
  }

  function createStatCard(emoji, label, value, bgGrad, border) {
    return React.createElement('div', {
      className: `rounded-lg p-3 flex items-center gap-3 bg-gradient-to-br ${bgGrad} border ${border}`
    },
      React.createElement('span', {
        className: 'text-xl'
      }, emoji),
      React.createElement('div', null,
        React.createElement('p', {
          className: 'text-lg font-black text-white'
        }, value || 0),
        React.createElement('p', {
          className: 'text-[10px] text-gray-400 uppercase'
        }, label)
      )
    );
  }

  // Funciones para generar iconos SVG inline
  function flameIcon() { return SVG_PROGRESS.flame; }
  function awardIcon() { return SVG_PROGRESS.award; }
  function bookIcon() { return SVG_PROGRESS.bookOpen; }
  function zapIcon() { return SVG_PROGRESS.zap; }

})();