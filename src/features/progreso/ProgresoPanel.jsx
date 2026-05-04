// src/features/progreso/ProgresoPanel.jsx
(function() {
  window.Muller = window.Muller || {};
  window.Muller.Panels = window.Muller.Panels || {};

  const M = window.Muller;

  // Iconos SVG inline para evitar error React #300
  const SVG_PROGRESS = {
    trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    flame: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    zap: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    target: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    brain: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5C8.5 3 4 5 4 9c0 2.5 1.5 4.5 3 5.5V22l5-3 5 3v-7.5c1.5-1 3-3 3-5.5 0-4-4.5-6-8-4.5z"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    share2: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    refreshCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    barChart3: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    pieChart: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
    bell: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };

  // ====================================================================
  //  PANEL PRINCIPAL
  // ====================================================================
  window.Muller.Panels.ProgresoPanel = function ProgresoPanel({ session }) {
    const { useState, useEffect, useRef, useCallback } = React;
    const [dashboard, setDashboard] = useState(null);
    const [last30Days, setLast30Days] = useState([]);
    const [weeklyStats, setWeeklyStats] = useState([]);
    const [profileLevel, setProfileLevel] = useState({});
    const [cloudStatus, setCloudStatus] = useState(null);
    const [syncMsg, setSyncMsg] = useState('');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [activeTimeToday, setActiveTimeToday] = useState(0);
    const [activeTimeTotal, setActiveTimeTotal] = useState(0);
    const [missions, setMissions] = useState([]);
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [claimingId, setClaimingId] = useState(null);
    const exportRef = useRef(null);

    // *** SELECTOR DE PERIODO ***
    const [period, setPeriod] = useState('total'); // 'today' | 'week' | 'month' | 'year' | 'total'

    // *** TRACKING TELC ***
    const [telcPrediction, setTelcPrediction] = useState(null);

    // *** NOTIFICACIONES DE HITOS ***
    const [hitoNotifications, setHitoNotifications] = useState([]);

    const activeTimerRef = useRef(null);

    // ─── CALCULAR TELC PREDICTION ───
    function calcTelcPrediction(data) {
      if (!data) return null;
      // Simular una predicción basada en puntos, racha y sesiones
      const p = data.totalPoints || 0;
      const s = data.streak || 0;
      const ses = data.sessionsCompleted || 0;
      const wl = data.wordsLearned || 0;

      // Puntuación compuesta 0-100
      const score = Math.min(100, Math.round(
        (p / 5000) * 40 +    // puntos hasta 40%
        (s / 30) * 20 +       // racha hasta 20%
        (ses / 100) * 20 +    // sesiones hasta 20%
        (wl / 200) * 20       // palabras hasta 20%
      ));

      // Nivel TELC estimado
      let level, color, emoji;
      if (score >= 85) { level = 'B2'; color = '#22c55e'; emoji = '🟢'; }
      else if (score >= 65) { level = 'B1'; color = '#06b6d4'; emoji = '🔵'; }
      else if (score >= 40) { level = 'A2'; color = '#f59e0b'; emoji = '🟡'; }
      else { level = 'A1'; color = '#ef4444'; emoji = '🔴'; }

      // Simular nota sobre 100 para gráfico radial
      const note = Math.min(100, Math.max(10, score + Math.round((Math.random() - 0.5) * 16)));

      // Desglose del gráfico radial
      const radialData = [
        { label: 'Vocabulario', value: Math.min(100, Math.round((wl / 300) * 100)) },
        { label: 'Gramática', value: Math.min(100, Math.round((p / 4000) * 100)) },
        { label: 'Constancia', value: Math.min(100, Math.round((s / 20) * 100)) },
        { label: 'Práctica', value: Math.min(100, Math.round((ses / 80) * 100)) },
        { label: 'Comprensión', value: Math.min(100, Math.round((wl / 150 + s / 15) * 30)) },
      ];

      return { score, level, color, emoji, note, radialData };
    }

    // ─── NOTIFICACIONES DE HITOS ───
    function checkMilestones(prevData, newData) {
      const notifications = [];
      if (!prevData || !newData) return notifications;

      const milestones = [
        { key: 'streak', prev: prevData.streak, next: newData.streak, thresholds: [7, 14, 21, 30, 60, 100],
          label: (v) => `🔥 ¡Racha de ${v} días! Increíble constancia.` },
        { key: 'totalPoints', prev: prevData.totalPoints, next: newData.totalPoints,
          thresholds: [500, 1000, 2500, 5000, 10000, 25000, 50000],
          label: (v) => `⭐ ¡${v} puntos alcanzados! Sigue así.` },
        { key: 'wordsLearned', prev: prevData.wordsLearned, next: newData.wordsLearned,
          thresholds: [10, 25, 50, 100, 200, 500],
          label: (v) => `📚 ¡${v} palabras aprendidas! Tu vocabulario crece.` },
        { key: 'sessionsCompleted', prev: prevData.sessionsCompleted, next: newData.sessionsCompleted,
          thresholds: [10, 25, 50, 100, 250, 500],
          label: (v) => `🎯 ¡${v} sesiones completadas! Eres imparable.` },
      ];

      milestones.forEach(function(m) {
        const prevVal = m.prev || 0;
        const nextVal = m.next || 0;
        m.thresholds.forEach(function(t) {
          if (prevVal < t && nextVal >= t) {
            notifications.push({ id: m.key + '_' + t, message: m.label(t), emoji: '🎉', timestamp: Date.now() });
          }
        });
      });

      return notifications;
    }

    // ─── GUARDAR NOTIFICACIÓN ───
    function saveHitoNotification(n) {
      try {
        const key = 'muller_hito_notifications_v1';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.unshift(n);
        if (existing.length > 50) existing.length = 50;
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (e) { /* silent */ }
    }

    function loadHitoNotifications() {
      try {
        const key = 'muller_hito_notifications_v1';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        setHitoNotifications(existing.slice(0, 5));
      } catch (e) { /* silent */ }
    }

    function dismissNotification(id) {
      setHitoNotifications(function(prev) { return prev.filter(function(n) { return n.id !== id; }); });
    }

    useEffect(function() {
      loadData();
      loadHitoNotifications();
      const handleClick = function(e) {
        if (exportRef.current && !exportRef.current.contains(e.target)) setShowExportMenu(false);
      };
      document.addEventListener('mousedown', handleClick);
      return function() {
        document.removeEventListener('mousedown', handleClick);
        if (activeTimerRef.current) clearInterval(activeTimerRef.current);
      };
    }, []);

    // Recalcular TELC cuando cambia period
    useEffect(function() {
      if (dashboard) {
        setTelcPrediction(calcTelcPrediction(dashboard));
      }
    }, [dashboard, period]);

    // Timer local eliminado: el TopBar gestiona el contador global 1s
    // Solo refrescamos la visualización periódicamente
    useEffect(function() {
      const interval = setInterval(function() {
        refreshActiveTime();
        refreshMissions();
      }, 10000); // cada 10s refrescar datos visuales
      return function() { clearInterval(interval); };
    }, []);

    async function loadData() {
      ensureProgressFunctions();
      const data = M.Progreso.getDashboardData();
      setDashboard(data);
      setLast30Days(M.Progreso.getLast30DaysActivity());
      setWeeklyStats(M.Progreso.getWeeklyStats());
      setProfileLevel(M.Progreso.getProfileLevel(data.totalPoints));
      refreshActiveTime();
      refreshMissions();

      // Calcular TELC
      setTelcPrediction(calcTelcPrediction(data));

      // Verificar hitos
      const prevKey = 'muller_prev_dashboard_v1';
      try {
        const prevStr = localStorage.getItem(prevKey);
        if (prevStr) {
          const prevData = JSON.parse(prevStr);
          const hitos = checkMilestones(prevData, data);
          hitos.forEach(function(h) {
            saveHitoNotification(h);
          });
          if (hitos.length > 0) {
            loadHitoNotifications();
            // Mostrar toast
            hitos.forEach(function(h) {
              if (M.toast) M.toast(h.message);
            });
          }
        }
        // Guardar snapshot actual para próxima comparación
        localStorage.setItem(prevKey, JSON.stringify({
          streak: data.streak,
          totalPoints: data.totalPoints,
          wordsLearned: data.wordsLearned,
          sessionsCompleted: data.sessionsCompleted,
        }));
      } catch (e) { /* silent */ }

      syncFromCloud();
    }

    function refreshActiveTime() {
      if (M.Progreso && M.Progreso.getTodayActiveTime) {
        setActiveTimeToday(M.Progreso.getTodayActiveTime());
      }
      if (M.Progreso && M.Progreso.getTotalActiveTime) {
        setActiveTimeTotal(M.Progreso.getTotalActiveTime());
      }
    }

    function refreshMissions() {
      if (M.Progreso && M.Progreso.getMissions) {
        setMissions(M.Progreso.getMissions());
      }
      if (M.Progreso && M.Progreso.getClaimedRewards) {
        setClaimedRewards(M.Progreso.getClaimedRewards());
      }
    }

    async function claimMission(missionId) {
      setClaimingId(missionId);
      try {
        const result = M.Progreso.claimMissionReward(missionId);
        if (result && result.ok) {
          refreshMissions();
          const newData = M.Progreso.getDashboardData();
          setDashboard(newData);
          setProfileLevel(M.Progreso.getProfileLevel(newData.totalPoints));
          setTelcPrediction(calcTelcPrediction(newData));
        }
      } catch (e) {
        console.error('claim error:', e);
      }
      setClaimingId(null);
    }

    async function syncFromCloud() {
      if (!session) return;
      setCloudStatus('syncing');
      try {
        const result = await M.Progreso.pullProgressFromCloud();
        if (result && result.ok) {
          if (result.data) mergeCloudData(result.data);
          setCloudStatus('ok');
          setSyncMsg('Datos sincronizados');
        } else {
          setCloudStatus(result && result.reason === 'Sin sesión' ? null : 'ok');
          if (result && result.reason !== 'Sin sesión') setSyncMsg('Modo offline');
        }
      } catch (e) {
        setCloudStatus('error');
        setSyncMsg('Error de conexión');
      }
      setTimeout(function() { setSyncMsg(''); }, 3000);
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
      setTimeout(function() { setSyncMsg(''); }, 3000);
    }

    function mergeCloudData(cloudData) {
      if (!cloudData || !cloudData.totalPoints) return;
      const localPoints = dashboard?.totalPoints || 0;
      const cloudPoints = cloudData.totalPoints || 0;
      if (cloudPoints > localPoints) {
        const advanced = (typeof M.getAdvancedProgress === 'function') ? M.getAdvancedProgress() : {};
        advanced.points = cloudPoints;
        advanced.streak = cloudData.streak || advanced.streak || 0;
        advanced.wordsLearned = cloudData.wordsLearned || advanced.wordsLearned || 0;
        advanced.sessions = cloudData.sessionsCompleted || cloudData.sessions || advanced.sessions || 0;
        advanced.readingSessions = cloudData.readingSessions || advanced.readingSessions || 0;
        advanced.writingSessions = cloudData.writingSessions || advanced.writingSessions || 0;
        if (typeof M.setAdvancedProgress === 'function') M.setAdvancedProgress(advanced);
        const newData = M.Progreso.getDashboardData();
        setDashboard(newData);
        setProfileLevel(M.Progreso.getProfileLevel(newData.totalPoints));
        setTelcPrediction(calcTelcPrediction(newData));
      }
    }

    function ensureProgressFunctions() {
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
          return { attempts: entries.length, mastered: entries.filter(function(e) { return e[1] >= 3; }).length };
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
        telcPrediction: telcPrediction,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'progreso-plaza-muller-' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      setShowExportMenu(false);
    }

    function exportAsImage() {
      const lines = [
        '📊 **Mi Progreso - Profesor Plaza Müller**',
        '',
        '🏆 Nivel ' + profileLevel.level + ': ' + profileLevel.title,
        '🔥 Racha: ' + (dashboard?.streak || 0) + ' días',
        '⭐ Puntos totales: ' + (dashboard?.totalPoints || 0),
        '📚 Palabras aprendidas: ' + (dashboard?.wordsLearned || 0),
        '🎯 Sesiones completadas: ' + (dashboard?.sessionsCompleted || 0),
        '',
        '📖 ' + (dashboard?.articlesMastered || 0) + ' artículos · ' + (dashboard?.verbsMastered || 0) + ' verbos · ' + (dashboard?.readingSessions || 0) + ' lecturas',
        '',
        '#Alemán #PlazaMüller #AprenderAlemán',
      ];
      const text = lines.join('\n');
      navigator.clipboard.writeText(text).then(function() {
        if (M.toast) M.toast('¡Texto copiado al portapapeles!');
        else alert('¡Texto copiado al portapapeles!');
      }).catch(function() {
        if (M.toast) M.toast('No se pudo copiar');
        else alert('No se pudo copiar');
      });
      setShowExportMenu(false);
    }

    // ─── RENDER ───
    if (!dashboard) {
      return React.createElement('div', {
        className: 'flex items-center justify-center p-12',
        style: { minHeight: '60vh' }
      }, React.createElement('div', {
        className: 'animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400'
      }));
    }

    // Filtrar data según periodo
    function getPeriodLabel(p) {
      switch (p) {
        case 'today': return 'Hoy';
        case 'week': return 'Esta semana';
        case 'month': return 'Este mes';
        case 'year': return 'Este año';
        default: return 'Total';
      }
    }

    const maxDaily = Math.max(1, ...last30Days.map(function(d) { return d.count; }));
    const maxWeekly = Math.max(1, ...weeklyStats.map(function(d) { return d.value; }));
    const nextLevelPoints = getNextLevelPoints(profileLevel.level, dashboard.totalPoints);

    return React.createElement('div', {
      className: 'flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-6',
      style: { fontFamily: 'Outfit, sans-serif' }
    },

      // ═══════════════════════════════════════════════════
      // NOTIFICACIONES DE HITOS
      // ═══════════════════════════════════════════════════
      hitoNotifications.length > 0 && React.createElement('div', {
        className: 'fixed top-16 right-4 z-40 space-y-2 max-w-xs'
      }, hitoNotifications.map(function(n) {
        return React.createElement('div', {
          key: n.id,
          className: 'bg-gradient-to-r from-amber-900/80 to-emerald-900/80 border border-amber-500/30 rounded-xl p-3 shadow-2xl backdrop-blur-sm animate-in slide-in-from-right-2 fade-in duration-300 flex items-start gap-2'
        },
          React.createElement('span', { className: 'text-xl flex-shrink-0' }, n.emoji || '🎉'),
          React.createElement('p', {
            className: 'text-xs text-amber-100 flex-1'
          }, n.message),
          React.createElement('button', {
            onClick: function() { dismissNotification(n.id); },
            className: 'w-4 h-4 text-gray-400 hover:text-white flex-shrink-0 cursor-pointer',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.x }
          })
        );
      })),

      // ═══════════════════════════════════════════════════
      // CABECERA + SELECTOR DE PERIODO
      // ═══════════════════════════════════════════════════
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
          className: 'flex items-center gap-2 flex-wrap'
        },
          // Selector de periodo
          ['today', 'week', 'month', 'year', 'total'].map(function(p) {
            const isActive = period === p;
            return React.createElement('button', {
              key: p,
              onClick: function() { setPeriod(p); },
              className: 'px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ' +
                (isActive
                  ? 'bg-amber-600/40 text-amber-200 border border-amber-500/50'
                  : 'bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:bg-gray-700/50'),
              title: 'Ver ' + getPeriodLabel(p)
            }, getPeriodLabel(p));
          }),
          // Indicador cloud
          cloudStatus === 'syncing' && React.createElement('span', {
            className: 'w-5 h-5 animate-spin text-cyan-400',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.refreshCcw }
          }),
          cloudStatus === 'ok' && syncMsg && React.createElement('span', {
            className: 'text-[10px] text-emerald-400'
          }, syncMsg),
          cloudStatus === 'error' && React.createElement('span', {
            className: 'text-[10px] text-rose-400'
          }, 'Sin conexión'),
          React.createElement('div', {
            className: 'px-3 py-1.5 rounded-full text-xs font-black text-white shadow-lg ' + (profileLevel.color || 'bg-gray-500')
          }, profileLevel.emoji + ' Nivel ' + profileLevel.level + ' · ' + profileLevel.title)
        )
      ),

      // ═══════════════════════════════════════════════════
      // TARJETAS PRINCIPALES (con filtro por periodo)
      // ═══════════════════════════════════════════════════
      React.createElement('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 gap-3'
      },
        createCard(flameIcon(), dashboard.streak + '', 'Racha (días)', 'from-amber-900/60 to-amber-800/40', 'border-amber-500/30', 'text-amber-400'),
        createCard(awardIcon(), dashboard.totalPoints + '', 'Puntos (' + getPeriodLabel(period) + ')', 'from-emerald-900/60 to-emerald-800/40', 'border-emerald-500/30', 'text-emerald-400'),
        createCard(bookIcon(), dashboard.wordsLearned + '', 'Palabras', 'from-blue-900/60 to-blue-800/40', 'border-blue-500/30', 'text-blue-400'),
        createCard(zapIcon(), dashboard.sessionsCompleted + '', 'Sesiones', 'from-purple-900/60 to-purple-800/40', 'border-purple-500/30', 'text-purple-400')
      ),

      // ═══════════════════════════════════════════════════
      // PROGRESO XP
      // ═══════════════════════════════════════════════════
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
            'Progreso al Nivel ' + (profileLevel.level + 1)
          ),
          React.createElement('span', {
            className: 'text-xs text-gray-400'
          }, dashboard.totalPoints + ' / ' + (profileLevel.level * 500 + 500) + ' XP')
        ),
        React.createElement('div', {
          className: 'w-full bg-gray-700/50 rounded-full h-3 overflow-hidden'
        },
          React.createElement('div', {
            className: 'h-full rounded-full transition-all duration-700',
            style: {
              width: Math.min(100, nextLevelPoints.percent) + '%',
              background: 'linear-gradient(90deg, #f59e0b, #d97706)'
            }
          })
        ),
        React.createElement('p', {
          className: 'text-[10px] text-gray-500 mt-1 text-right'
        }, 'Faltan ' + nextLevelPoints.remaining + ' XP para subir de nivel')
      ),

      // ═══════════════════════════════════════════════════
      // PROGRESO DIARIO
      // ═══════════════════════════════════════════════════
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
                onClick: function() { setShowExportMenu(!showExportMenu); },
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
                strokeDasharray: (dashboard.dailyProgress || 0) + ', 100',
                strokeLinecap: 'round'
              })
            ),
            React.createElement('span', {
              className: 'absolute inset-0 flex items-center justify-center text-lg font-black text-amber-200'
            }, (dashboard.dailyProgress || 0) + '%')
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
              ['Artículos', 'Verbos', 'Lectura', 'Escritura'].map(function(label, i) {
                return React.createElement('span', {
                  key: label,
                  className: 'text-[10px] px-2 py-1 rounded-full ' + (
                    i === 0 ? 'bg-rose-900/40 text-rose-300' :
                    i === 1 ? 'bg-cyan-900/40 text-cyan-300' :
                    i === 2 ? 'bg-sky-900/40 text-sky-300' :
                    'bg-purple-900/40 text-purple-300'
                  )
                }, label);
              })
            ),
            dashboard.streak >= 7
              ? React.createElement('p', { className: 'text-xs text-amber-400 mt-2' }, '🔥 ¡' + dashboard.streak + ' días seguidos! Sigue así.')
              : dashboard.streak >= 3
                ? React.createElement('p', { className: 'text-xs text-amber-400 mt-2' }, '🔥 ¡' + dashboard.streak + ' días de racha! La constancia es clave.')
                : React.createElement('p', { className: 'text-xs text-gray-500 mt-2' }, 'Vuelve mañana para mantener tu racha.')
          )
        )
      ),

      // ═══════════════════════════════════════════════════
      // TRACKING TELC: PREDICCIÓN + GRÁFICO RADIAL
      // ═══════════════════════════════════════════════════
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-cyan-500/25 p-4'
      },
        React.createElement('h3', {
          className: 'text-sm font-black text-cyan-200 flex items-center gap-2 mb-3'
        },
          React.createElement('span', {
            className: 'w-4 h-4',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.barChart3 }
          }),
          ' Tracking TELC'
        ),
        telcPrediction && React.createElement('div', {
          className: 'flex flex-col md:flex-row items-center gap-4'
        },
          // Gráfico radial
          React.createElement('div', {
            className: 'relative w-40 h-40 flex-shrink-0'
          },
            (function() {
              const r = 60;
              const cx = 80;
              const cy = 80;
              const segments = telcPrediction.radialData || [];
              const angleStep = (2 * Math.PI) / segments.length;
              return React.createElement('svg', {
                viewBox: '0 0 160 160',
                className: 'w-full h-full',
              },
                // Líneas de fondo
                segments.map(function(seg, i) {
                  const angle = angleStep * i - Math.PI / 2;
                  const x = cx + r * Math.cos(angle);
                  const y = cy + r * Math.sin(angle);
                  return React.createElement('line', {
                    key: 'bg_' + i,
                    x1: cx, y1: cy, x2: x, y2: y,
                    stroke: 'rgba(255,255,255,0.08)',
                    strokeWidth: '1'
                  });
                }),
                // Círculo de fondo
                React.createElement('circle', {
                  cx: cx, cy: cy, r: r,
                  fill: 'none',
                  stroke: 'rgba(255,255,255,0.08)',
                  strokeWidth: '1'
                }),
                // Segmentos de datos
                segments.map(function(seg, i) {
                  const startAngle = angleStep * i - Math.PI / 2;
                  const endAngle = angleStep * (i + 1) - Math.PI / 2;
                  const val = seg.value / 100;
                  const innerR = val * r;
                  const x1 = cx + innerR * Math.cos(startAngle);
                  const y1 = cy + innerR * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(startAngle);
                  const y2 = cy + r * Math.sin(startAngle);
                  const x3 = cx + r * Math.cos(endAngle);
                  const y3 = cy + r * Math.sin(endAngle);
                  const x4 = cx + innerR * Math.cos(endAngle);
                  const y4 = cy + innerR * Math.sin(endAngle);
                  const colors = ['#f59e0b', '#06b6d4', '#22c55e', '#8b5cf6', '#ef4444'];
                  return React.createElement('polygon', {
                    key: 'seg_' + i,
                    points: [cx, cy, x2, y2, x3, y3].join(','),
                    fill: colors[i % colors.length] + '30',
                    stroke: colors[i % colors.length],
                    strokeWidth: '1.5',
                    opacity: 0.4 + val * 0.6
                  });
                }),
                // Círculo central
                React.createElement('circle', {
                  cx: cx, cy: cy, r: 15,
                  fill: '#1e293b',
                  stroke: telcPrediction.color,
                  strokeWidth: '2'
                }),
                // Nivel estimado en el centro
                React.createElement('text', {
                  x: cx, y: cy + 4,
                  textAnchor: 'middle',
                  fill: telcPrediction.color,
                  fontSize: '12',
                  fontWeight: 'bold'
                }, telcPrediction.level)
              );
            })()
          ),
          // Info TELC
          React.createElement('div', {
            className: 'flex-1 space-y-2'
          },
            React.createElement('div', {
              className: 'flex items-center gap-2'
            },
              React.createElement('span', { className: 'text-lg' }, telcPrediction.emoji),
              React.createElement('span', {
                className: 'text-lg font-black',
                style: { color: telcPrediction.color }
              }, 'Nivel estimado: ' + telcPrediction.level),
              React.createElement('span', {
                className: 'text-xs text-gray-400 ml-auto'
              }, 'Nota: ' + telcPrediction.note + '/100')
            ),
            React.createElement('div', {
              className: 'flex flex-wrap gap-2 mt-2'
            }, (telcPrediction.radialData || []).map(function(s, i) {
              const colors = ['#f59e0b', '#06b6d4', '#22c55e', '#8b5cf6', '#ef4444'];
              return React.createElement('div', {
                key: s.label,
                className: 'flex items-center gap-1.5'
              },
                React.createElement('span', {
                  className: 'w-2 h-2 rounded-full',
                  style: { backgroundColor: colors[i % colors.length] }
                }),
                React.createElement('span', {
                  className: 'text-[10px] text-gray-300'
                }, s.label + ': ' + s.value + '%')
              );
            })),
            React.createElement('p', {
              className: 'text-[9px] text-gray-500 mt-1'
            }, 'El nivel TELC se estima según tu progreso total. Sigue practicando para subir de nivel.')
          )
        ),
        !telcPrediction && React.createElement('p', {
          className: 'text-xs text-gray-400 text-center py-3'
        }, 'Calculando predicción TELC...')
      ),

      // ═══════════════════════════════════════════════════
      // ACTIVIDAD DIARIA (mapa de calor)
      // ═══════════════════════════════════════════════════
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
        }, last30Days.map(function(d, i) {
          return React.createElement('div', {
            key: d.date,
            className: 'relative group'
          },
            React.createElement('div', {
              className: 'w-full aspect-square rounded-sm transition-colors',
              style: {
                backgroundColor: d.count > 0
                  ? 'rgba(251, 191, 36, ' + Math.min(0.15 + (d.count / maxDaily) * 0.85, 1) + ')'
                  : 'rgba(255,255,255,0.05)'
              },
              title: d.date + ': ' + d.count + ' actividades'
            }),
            React.createElement('span', {
              className: 'absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10'
            }, d.date + ': ' + d.count)
          );
        })),
        React.createElement('div', {
          className: 'flex items-center justify-between mt-2 text-[9px] text-gray-500'
        },
          React.createElement('span', null, 'Hace 30 días'),
          React.createElement('span', null, 'Hoy')
        )
      ),

      // ═══════════════════════════════════════════════════
      // GRÁFICO SEMANAL
      // ═══════════════════════════════════════════════════
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
        }, weeklyStats.map(function(d, i) {
          return React.createElement('div', {
            key: i,
            className: 'flex-1 flex flex-col items-center gap-1'
          },
            React.createElement('span', {
              className: 'text-[10px] text-amber-300 font-bold'
            }, '' + d.value),
            React.createElement('div', {
              className: 'w-full bg-gradient-to-t from-amber-500/80 to-amber-400/40 rounded-t-md transition-all',
              style: { height: Math.max(4, (d.value / maxWeekly) * 100) + '%' }
            }),
            React.createElement('span', {
              className: 'text-[9px] text-gray-500'
            }, d.label)
          );
        }))
      ),

      // ═══════════════════════════════════════════════════
      // ESTADÍSTICAS DETALLADAS
      // ═══════════════════════════════════════════════════
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

      // ═══════════════════════════════════════════════════
      // LOGROS DESBLOQUEADOS
      // ═══════════════════════════════════════════════════
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
          }, dashboard.achievements.map(function(ach, i) {
            return React.createElement('div', {
              key: i,
              className: 'flex items-center gap-3 bg-amber-900/20 border border-amber-500/20 rounded-lg px-3 py-2'
            },
              React.createElement('span', { className: 'text-2xl' }, ach.emoji || '🏆'),
              React.createElement('div', null,
                React.createElement('p', { className: 'text-sm font-bold text-amber-200' }, ach.name || ach.title),
                ach.description && React.createElement('p', { className: 'text-[10px] text-amber-400/80' }, ach.description)
              )
            );
          }))
        ),

      // ═══════════════════════════════════════════════════
      // MISIONES
      // ═══════════════════════════════════════════════════
      React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-amber-500/25 p-4'
      },
        React.createElement('h3', {
          className: 'text-sm font-black text-amber-200 flex items-center gap-2 mb-3'
        },
          React.createElement('span', {
            className: 'w-4 h-4',
            dangerouslySetInnerHTML: { __html: SVG_PROGRESS.award }
          }),
          ' Misiones'
        ),
        missions.length === 0 && React.createElement('p', {
          className: 'text-xs text-gray-400 text-center py-3'
        }, 'No hay misiones disponibles en este momento. Vuelve más tarde.'),
        missions.length > 0 && React.createElement('div', {
          className: 'grid grid-cols-1 md:grid-cols-2 gap-2'
        }, missions.map(function(m) {
          const isCompleted = m.check ? m.check() : false;
          const isClaiming = claimingId === m.id;
          return React.createElement('div', {
            key: m.id,
            className: 'rounded-lg p-3 border transition-all ' + (
              isCompleted
                ? 'bg-emerald-900/20 border-emerald-500/30'
                : 'bg-gray-800/40 border-gray-600/30'
            )
          },
            React.createElement('div', {
              className: 'flex items-start gap-3'
            },
              React.createElement('span', {
                className: 'w-5 h-5 flex-shrink-0 mt-0.5 ' + (
                  m.type === 'daily' ? 'text-amber-400' :
                  m.type === 'weekly' ? 'text-cyan-400' :
                  'text-purple-400'
                ),
                dangerouslySetInnerHTML: {
                  __html: m.icon === 'clock' ? SVG_PROGRESS.clock :
                          m.icon === 'zap' ? SVG_PROGRESS.zap :
                          m.icon === 'bookOpen' ? SVG_PROGRESS.bookOpen :
                          m.icon === 'trendingUp' ? SVG_PROGRESS.trendingUp :
                          m.icon === 'flame' ? SVG_PROGRESS.flame :
                          m.icon === 'award' ? SVG_PROGRESS.award :
                          SVG_PROGRESS.target
                }
              }),
              React.createElement('div', {
                className: 'flex-1 min-w-0'
              },
                React.createElement('p', { className: 'text-xs font-bold text-amber-200' }, m.label),
                React.createElement('p', { className: 'text-[9px] text-gray-400 mt-0.5' }, m.description),
                React.createElement('div', {
                  className: 'flex items-center gap-2 mt-1.5'
                },
                  React.createElement('span', {
                    className: 'text-[9px] px-1.5 py-0.5 rounded-full ' + (
                      m.type === 'daily' ? 'bg-amber-900/30 text-amber-300' :
                      m.type === 'weekly' ? 'bg-cyan-900/30 text-cyan-300' :
                      'bg-purple-900/30 text-purple-300'
                    )
                  }, m.type === 'daily' ? 'Diaria' : m.type === 'weekly' ? 'Semanal' : 'Mensual'),
                  React.createElement('span', { className: 'text-[9px] text-emerald-400' }, '+' + (m.reward?.points || 0) + ' XP')
                )
              ),
              React.createElement('button', {
                onClick: function() { claimMission(m.id); },
                disabled: !isCompleted || isClaiming,
                className: 'flex-shrink-0 px-2.5 py-1 rounded-full text-[9px] font-bold transition-all cursor-pointer ' + (
                  isCompleted && !isClaiming
                    ? 'bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/60'
                    : isClaiming
                      ? 'bg-gray-600/30 text-gray-400 border border-gray-500/20 animate-pulse'
                      : 'bg-gray-700/30 text-gray-500 border border-gray-600/20 cursor-not-allowed'
                )
              }, isClaiming ? '...' : isCompleted ? 'Reclamar' : 'Bloqueado')
            )
          );
        })),
        claimedRewards.length > 0 && React.createElement('div', {
          className: 'mt-3 pt-3 border-t border-gray-600/30'
        },
          React.createElement('p', { className: 'text-[9px] text-gray-500 mb-2' }, 'Últimas recompensas reclamadas:'),
          React.createElement('div', {
            className: 'flex flex-wrap gap-1.5'
          }, claimedRewards.slice(0, 5).map(function(r) {
            return React.createElement('span', {
              key: r.id,
              className: 'text-[8px] px-1.5 py-0.5 rounded-full bg-amber-900/20 text-amber-400/70'
            }, r.id + ': +' + (r.reward?.points || 0) + ' XP');
          }))
        )
      ),

      // ═══════════════════════════════════════════════════
      // TIEMPO TOTAL + RAHCA
      // ═══════════════════════════════════════════════════
      React.createElement('div', {
        className: 'rounded-xl bg-gradient-to-r from-amber-900/30 to-emerald-900/30 border border-amber-500/20 p-4 text-center'
      },
        React.createElement('p', {
          className: 'text-sm text-amber-200/90 font-medium'
        },
          dashboard.streak >= 7
            ? '🔥 ¡' + dashboard.streak + ' días seguidos! Estás construyendo un hábito imparable.'
            : dashboard.streak >= 3
              ? '🔥 ¡' + dashboard.streak + ' días de racha! La constancia es la clave del éxito.'
              : '🌟 ¡Cada día cuenta! Vuelve mañana para mantener tu racha.'
        ),
        dashboard.streak >= 3 && React.createElement('p', {
          className: 'text-[10px] text-amber-400/60 mt-1'
        }, 'Los hábitos se consolidan a los 21 días. ¡Sigue así!')
      ),

      // ═══════════════════════════════════════════════════
      // TIEMPO ACTIVO TOTAL (si no es "hoy")
      // ═══════════════════════════════════════════════════
      period !== 'today' && React.createElement('div', {
        className: 'rounded-xl bg-black/35 border border-emerald-500/25 p-4 text-center'
      },
        React.createElement('p', {
          className: 'text-xs text-gray-400'
        }, '⏱ Tiempo activo total'),
        React.createElement('p', {
          className: 'text-xl font-black text-emerald-400 mt-1'
        }, formatTime(activeTimeTotal)),
        React.createElement('p', {
          className: 'text-[9px] text-gray-500 mt-1'
        }, 'Hoy: ' + M.Progreso.formatActiveTime(activeTimeToday))
      )
    );
  };

  // ─── ALIAS ───
  window.Muller.Panels.progreso = window.Muller.Panels.ProgresoPanel;

  // ========== AYUDANTES ==========

  function getNextLevelPoints(currentLevel, currentPoints) {
    const needed = currentLevel * 500 + 500;
    const percent = (currentPoints / needed) * 100;
    return { percent: Math.min(100, percent), remaining: Math.max(0, needed - currentPoints), needed: needed };
  }

  function createCard(icon, value, label, bgGrad, border, iconColor) {
    return React.createElement('div', {
      className: 'rounded-xl p-4 text-center bg-gradient-to-br ' + bgGrad + ' border ' + border
    },
      React.createElement('div', {
        className: 'w-6 h-6 mx-auto mb-1 ' + iconColor,
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
      className: 'rounded-lg p-3 flex items-center gap-3 bg-gradient-to-br ' + bgGrad + ' border ' + border
    },
      React.createElement('span', { className: 'text-xl' }, emoji),
      React.createElement('div', null,
        React.createElement('p', { className: 'text-lg font-black text-white' }, (value || 0) + ''),
        React.createElement('p', { className: 'text-[10px] text-gray-400 uppercase' }, label)
      )
    );
  }

  function formatTime(seconds) {
    if (!seconds || seconds <= 0) return '0h 0m';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h + 'h ' + m + 'm';
  }

  function flameIcon() { return SVG_PROGRESS.flame; }
  function awardIcon() { return SVG_PROGRESS.award; }
  function bookIcon() { return SVG_PROGRESS.bookOpen; }
  function zapIcon() { return SVG_PROGRESS.zap; }

})();