// ═══════════════════════════════════════════════════
// STORAGE - Persistencia local + funciones avanzadas
// ═══════════════════════════════════════════════════
(function() {
  const M = window.Muller = window.Muller || {};
  const KEYS = M.KEYS;

  // ─── BÁSICO ─────────────────────────────────────
  function get(key, def) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } catch(e) { return def; }
  }

  function set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch(e) { console.warn('Storage full?', e); }
  }

  function remove(key) {
    try { localStorage.removeItem(key); }
    catch(e) {}
  }

  function getSession() {
    const s = get(KEYS.SESSION);
    return s && s.user ? s : null;
  }

  function setSession(session) {
    set(KEYS.SESSION, session);
  }

  M.storage = { get, set, remove, getSession, setSession };

  // ─── OCR HISTORY ────────────────────────────────
  const MULLER_OCR_HIST_KEY = KEYS.OCR_HISTORY;

  function mullerPushOcrHistory(entry) {
    if (!entry || !entry.text) return;
    const history = get(MULLER_OCR_HIST_KEY, []);
    history.unshift({
      text: entry.text,
      date: entry.date || new Date().toISOString(),
      mode: entry.mode || 'libre'
    });
    if (history.length > 100) history.length = 100;
    set(MULLER_OCR_HIST_KEY, history);
  }

  M.ocr = { pushHistory: mullerPushOcrHistory };

  // ─── PLAZA MÜNZEN ───────────────────────────────
  function getMuenzen() {
    return get(KEYS.PLAZA_MUENZEN, { balance: 0, totalEarned: 0, totalSpent: 0, transactions: [] });
  }

  function saveMuenzen(data) {
    set(KEYS.PLAZA_MUENZEN, data);
  }

  function addMuenzen(amount, reason) {
    const data = getMuenzen();
    data.balance += amount;
    data.totalEarned += amount;
    data.transactions.unshift({
      type: 'earn',
      amount,
      reason: reason || 'Recompensa',
      date: new Date().toISOString()
    });
    if (data.transactions.length > 200) data.transactions.length = 200;
    saveMuenzen(data);
    // Check achievements
    checkMuenzenAchievements(data.totalEarned);
    return data.balance;
  }

  function spendMuenzen(amount, itemName) {
    const data = getMuenzen();
    if (data.balance < amount) return false;
    data.balance -= amount;
    data.totalSpent += amount;
    data.transactions.unshift({
      type: 'spend',
      amount,
      reason: 'Compra: ' + itemName,
      date: new Date().toISOString()
    });
    if (data.transactions.length > 200) data.transactions.length = 200;
    saveMuenzen(data);
    return true;
  }

  function getMuenzenBalance() {
    return getMuenzen().balance;
  }

  function getMuenzenHistory(limit) {
    const data = getMuenzen();
    return limit ? data.transactions.slice(0, limit) : data.transactions;
  }

  function checkMuenzenAchievements(totalEarned) {
    const thresholds = [
      { id: 'muenzen_100', target: 100 },
      { id: 'muenzen_1000', target: 1000 },
      { id: 'muenzen_5000', target: 5000 },
      { id: 'muenzen_10000', target: 10000 }
    ];
    thresholds.forEach(t => {
      if (totalEarned >= t.target) {
        unlockAchievement(t.id);
      }
    });
  }

  // ─── TIEMPO ACTIVO DE ESTUDIO ───────────────────
  function getActiveTime() {
    return get(KEYS.ACTIVE_TIME, { daily: {}, totalMinutes: 0 });
  }

  function saveActiveTime(data) {
    set(KEYS.ACTIVE_TIME, data);
  }

  function addActiveTime(minutes) {
    if (minutes <= 0) return;
    const data = getActiveTime();
    const today = new Date().toISOString().slice(0,10);
    data.daily[today] = (data.daily[today] || 0) + minutes;
    data.totalMinutes = (data.totalMinutes || 0) + minutes;
    saveActiveTime(data);
    // Check achievements
    const totalHours = Math.floor(data.totalMinutes / 60);
    const hourThresholds = [1, 10, 50, 100, 500];
    hourThresholds.forEach(h => {
      if (totalHours >= h) {
        const achievementId = 'hours_' + h;
        unlockAchievement(achievementId);
      }
    });
    return data.totalMinutes;
  }

  function getActiveTimeToday() {
    const data = getActiveTime();
    const today = new Date().toISOString().slice(0,10);
    return data.daily[today] || 0;
  }

  function getActiveTimeThisWeek() {
    const data = getActiveTime();
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    let total = 0;
    for (let d = new Date(startOfWeek); d <= now; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0,10);
      total += data.daily[key] || 0;
    }
    return total;
  }

  function getActiveTimeThisMonth() {
    const data = getActiveTime();
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    let total = 0;
    Object.keys(data.daily).forEach(key => {
      const d = new Date(key);
      if (d.getMonth() === month && d.getFullYear() === year) {
        total += data.daily[key];
      }
    });
    return total;
  }

  function getActiveTimeForPeriod(days) {
    const data = getActiveTime();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    let total = 0;
    Object.keys(data.daily).forEach(key => {
      const d = new Date(key);
      if (d >= cutoff) {
        total += data.daily[key];
      }
    });
    return total;
  }

  // ─── MISIONES ───────────────────────────────────
  function getMissions() {
    return get(KEYS.MISSIONS, { daily: [], weekly: [], monthly: [], completed: [] });
  }

  function saveMissions(data) {
    set(KEYS.MISSIONS, data);
  }

  function getMissionProgress() {
    return get(KEYS.MISSION_PROGRESS, {});
  }

  function saveMissionProgress(data) {
    set(KEYS.MISSION_PROGRESS, data);
  }

  function generateDailyMissions() {
    const data = getMissions();
    const today = new Date().toISOString().slice(0,10);
    
    // Check if already generated today
    if (data.daily.length > 0 && data.daily[0].date === today) return data.daily;
    
    const pool = M.MISSIONS_DAILY_POOL;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4); // 4 misiones diarias
    
    data.daily = selected.map(m => ({
      ...m,
      date: today,
      progress: 0,
      completed: false,
      claimed: false
    }));
    
    saveMissions(data);
    return data.daily;
  }

  function generateWeeklyMissions() {
    const data = getMissions();
    const weekKey = getWeekKey();
    
    if (data.weekly.length > 0 && data.weekly[0].weekKey === weekKey) return data.weekly;
    
    const pool = M.MISSIONS_WEEKLY_POOL;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    
    data.weekly = selected.map(m => ({
      ...m,
      weekKey,
      progress: 0,
      completed: false,
      claimed: false
    }));
    
    saveMissions(data);
    return data.weekly;
  }

  function generateMonthlyMissions() {
    const data = getMissions();
    const monthKey = new Date().toISOString().slice(0,7);
    
    if (data.monthly.length > 0 && data.monthly[0].monthKey === monthKey) return data.monthly;
    
    const pool = M.MISSIONS_MONTHLY_POOL;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    
    data.monthly = selected.map(m => ({
      ...m,
      monthKey,
      progress: 0,
      completed: false,
      claimed: false
    }));
    
    saveMissions(data);
    return data.monthly;
  }

  function getWeekKey() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    return start.toISOString().slice(0,10);
  }

  function updateMissionProgress(missionId, increment) {
    const progress = getMissionProgress();
    progress[missionId] = (progress[missionId] || 0) + increment;
    saveMissionProgress(progress);
    
    // Check if mission completed
    const missions = getMissions();
    const allMissions = [...missions.daily, ...missions.weekly, ...missions.monthly];
    const mission = allMissions.find(m => m.id === missionId);
    if (mission && progress[missionId] >= mission.target) {
      // Check if it was already marked completed-claimed-etc
      const found = allMissions.find(m => m.id === missionId);
      if (found && !found.completed) {
        found.completed = true;
        // Award Plaza Münzen
        addMuenzen(mission.reward, 'Misión: ' + mission.name);
        // Unlock achievement
        unlockAchievement('first_mission');
        // Check mission count achievements
        const completedCount = allMissions.filter(m => m.completed).length;
        const missionThresholds = [10, 50, 100];
        missionThresholds.forEach(t => {
          if (completedCount >= t) {
            unlockAchievement('missions_' + t);
          }
        });
        if (allMissions.filter(m => m.completed).length >= missions.daily.length) {
          unlockAchievement('perfect_day');
        }
      }
    }
    
    saveMissions(missions);
    return progress[missionId];
  }

  function claimMissionReward(missionId) {
    const missions = getMissions();
    const allMissions = [...missions.daily, ...missions.weekly, ...missions.monthly];
    const mission = allMissions.find(m => m.id === missionId);
    if (mission && mission.completed && !mission.claimed) {
      mission.claimed = true;
      saveMissions(missions);
      return true;
    }
    return false;
  }

  // ─── LOGROS / ACHIEVEMENTS ──────────────────────
  function getAchievements() {
    return get(KEYS.ACHIEVEMENT_BADGES, []);
  }

  function saveAchievements(data) {
    set(KEYS.ACHIEVEMENT_BADGES, data);
  }

  function unlockAchievement(id) {
    const badges = getAchievements();
    if (badges.find(b => b.id === id)) return; // already unlocked
    
    const badgeDef = M.ACHIEVEMENT_BADGES.find(b => b.id === id);
    if (!badgeDef) return;
    
    badges.push({
      ...badgeDef,
      unlockedAt: new Date().toISOString()
    });
    saveAchievements(badges);
    
    // Award Plaza Münzen
    addMuenzen(100, 'Logro: ' + badgeDef.name);
    
    return badgeDef;
  }

  function getUnlockedAchievements() {
    return getAchievements();
  }

  function getAchievementProgress() {
    const unlocked = getAchievements();
    const total = M.ACHIEVEMENT_BADGES.length;
    return { unlocked: unlocked.length, total, percent: Math.round((unlocked.length / total) * 100) };
  }

  // ─── TELC TRACKING ──────────────────────────────
  function getTelcTracking() {
    return get(KEYS.TELC_TRACKING, { attempts: [], competencies: {} });
  }

  function saveTelcTracking(data) {
    set(KEYS.TELC_TRACKING, data);
  }

  function addTelcAttempt(level, score, competency) {
    const data = getTelcTracking();
    data.attempts.push({
      level,
      score,
      competency,
      date: new Date().toISOString()
    });
    if (!data.competencies[competency]) data.competencies[competency] = [];
    data.competencies[competency].push(score);
    saveTelcTracking(data);
    
    // Check TELC achievements
    if (score >= 60) {
      if (level === 'B1') unlockAchievement('telc_b1_pass');
      if (level === 'B2') unlockAchievement('telc_b2_pass');
      if (score >= 99) unlockAchievement('telc_perfect');
    }
    unlockAchievement('first_telc');
    
    return data;
  }

  function getTelcCompetencyAverages() {
    const data = getTelcTracking();
    const avgs = {};
    M.TELC_COMPETENCIES.forEach(comp => {
      const scores = data.competencies[comp] || [];
      avgs[comp] = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    });
    return avgs;
  }

  function getTelcPrediction() {
    const avgs = getTelcCompetencyAverages();
    const overall = Object.values(avgs).reduce((a, b) => a + b, 0) / Object.values(avgs).length;
    
    // Calculate estimated level
    let estimatedLevel = 'A1';
    if (overall >= 60 && overall < 70) estimatedLevel = 'B1';
    else if (overall >= 70 && overall < 80) estimatedLevel = 'B2';
    else if (overall >= 80) estimatedLevel = 'C1';
    
    // Predict time to next level
    let monthsToNext = null;
    if (overall < 60) {
      const pointsNeeded = 60 - overall;
      const attempts = getTelcTracking().attempts.length;
      const avgImprovementPerAttempt = attempts > 5 ? 2 : 5; // rough estimate
      monthsToNext = Math.ceil(pointsNeeded / (avgImprovementPerAttempt * 4)); // ~4 attempts/month
    }
    
    return { overall: Math.round(overall), estimatedLevel, monthsToNext, competencies: avgs };
  }

  // ─── HEATMAP (GitHub-style) ────────────────────
  function getHeatmapData() {
    const activity = getActiveTime();
    const now = new Date();
    const heatmap = {};
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const minutes = activity.daily[key] || 0;
      // Categorize by intensity
      let intensity = 0;
      if (minutes > 0) intensity = 1;
      if (minutes >= 15) intensity = 2;
      if (minutes >= 30) intensity = 3;
      if (minutes >= 60) intensity = 4;
      heatmap[key] = { minutes, intensity };
    }
    
    return heatmap;
  }

  // ─── EXPORT / IMPORT ────────────────────────────
  function exportAllProgress() {
    const keys = Object.values(KEYS);
    const data = {};
    keys.forEach(key => {
      const raw = localStorage.getItem(key);
      if (raw) data[key] = JSON.parse(raw);
    });
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data
    };
  }

  function importProgress(jsonData) {
    try {
      if (!jsonData || !jsonData.data) return false;
      Object.keys(jsonData.data).forEach(key => {
        localStorage.setItem(key, JSON.stringify(jsonData.data[key]));
      });
      return true;
    } catch(e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // ─── DASHBOARD DATA (unified) ───────────────────
  function getFullDashboardData() {
    const muenzen = getMuenzen();
    const activeTime = getActiveTime();
    const achievements = getAchievements();
    const telcPrediction = getTelcPrediction();
    const heatmap = getHeatmapData();
    const today = new Date().toISOString().slice(0,10);
    
    // Calculate streak
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const mins = activeTime.daily[key] || 0;
      if (mins >= 5) { // mínimo 5 min para contar racha de calidad
        streak++;
      } else {
        break;
      }
    }
    
    // Calculate quality tier
    let qualityTier = null;
    if (streak >= 365) qualityTier = { ...M.STREAK_QUALITY.DIAMOND };
    else if (streak >= 90) qualityTier = { ...M.STREAK_QUALITY.GOLD };
    else if (streak >= 30) qualityTier = { ...M.STREAK_QUALITY.SILVER };
    else if (streak >= 7) qualityTier = { ...M.STREAK_QUALITY.BRONZE };
    
    // Level (profile level)
    const points = activeTime.totalMinutes || 0;
    const profileLevels = [
      { min: 0, name: 'Anfänger', from: 0 },
      { min: 60, name: 'Sprachschüler', from: 1 },
      { min: 300, name: 'Fortgeschritten', from: 2 },
      { min: 1000, name: 'Sprachkenner', from: 3 },
      { min: 3000, name: 'Experte', from: 4 },
      { min: 6000, name: 'Meister', from: 5 },
      { min: 10000, name: 'Sprachmeister', from: 6 },
      { min: 20000, name: 'Professor', from: 7 },
      { min: 50000, name: 'Legende', from: 8 }
    ];
    
    let level = profileLevels[0];
    for (const l of profileLevels) {
      if (points >= l.min) level = l;
      else break;
    }
    
    // Last 30 days activity
    const last30 = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      last30.push({
        date: key,
        minutes: activeTime.daily[key] || 0,
        dayOfWeek: d.getDay()
      });
    }
    
    return {
      muenzen: muenzen.balance,
      totalEarned: muenzen.totalEarned,
      totalMinutes: activeTime.totalMinutes || 0,
      todayMinutes: activeTime.daily[today] || 0,
      streak,
      qualityTier,
      level: level.name,
      levelFrom: level.from,
      achievements: achievements.length,
      achievementsTotal: M.ACHIEVEMENT_BADGES.length,
      telcPrediction,
      last30Days: last30,
      heatmap
    };
  }

  // ─── ACTIVE TIME TRACKER (singleton callbacks) ──
  let activeTimeInterval = null;
  let activeTimeAccumulator = 0;
  let lastActiveTime = Date.now();
  let isTrackingActive = false;

  function startActiveTimeTracking() {
    if (activeTimeInterval) return;
    isTrackingActive = true;
    lastActiveTime = Date.now();
    
    // Listen for user activity
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    const handleActivity = () => {
      lastActiveTime = Date.now();
    };
    activityEvents.forEach(ev => document.addEventListener(ev, handleActivity));
    
    // Check every 30 seconds if user was active
    activeTimeInterval = setInterval(() => {
      if (!isTrackingActive) return;
      const now = Date.now();
      const idleTime = (now - lastActiveTime) / 1000; // seconds idle
      
      // If idle for more than 60 seconds, stop accumulating
      if (idleTime > 60) return;
      
      // Accumulate 30 seconds of active time
      activeTimeAccumulator += 30;
      
      // Every 60 seconds of accumulated time, save
      if (activeTimeAccumulator >= 60) {
        addActiveTime(1); // 1 minute
        activeTimeAccumulator -= 60;
      }
    }, 30000); // every 30 seconds
    
    // Store cleanup
    window.Muller._stopActiveTracking = () => {
      clearInterval(activeTimeInterval);
      activeTimeInterval = null;
      activityEvents.forEach(ev => document.removeEventListener(ev, handleActivity));
    };
  }

  function stopActiveTimeTracking() {
    isTrackingActive = false;
    if (activeTimeInterval) {
      clearInterval(activeTimeInterval);
      activeTimeInterval = null;
    }
    // Flush remaining
    if (activeTimeAccumulator >= 30) {
      const mins = Math.floor(activeTimeAccumulator / 60);
      if (mins > 0) {
        addActiveTime(mins);
        activeTimeAccumulator -= mins * 60;
      }
    }
  }

  function getActiveTimeAccumulator() {
    return activeTimeAccumulator;
  }

  // Export
  M.storage = { get, set, remove, getSession, setSession };
  M.ocr = { pushHistory: mullerPushOcrHistory };
  M.plazaMuenzen = {
    get: getMuenzen,
    getBalance: getMuenzenBalance,
    add: addMuenzen,
    spend: spendMuenzen,
    getHistory: getMuenzenHistory
  };
  M.activeTime = {
    get: getActiveTime,
    getToday: getActiveTimeToday,
    getThisWeek: getActiveTimeThisWeek,
    getThisMonth: getActiveTimeThisMonth,
    getForPeriod: getActiveTimeForPeriod,
    add: addActiveTime,
    startTracking: startActiveTimeTracking,
    stopTracking: stopActiveTimeTracking,
    getAccumulator: getActiveTimeAccumulator
  };
  M.missions = {
    get: getMissions,
    getDaily: generateDailyMissions,
    getWeekly: generateWeeklyMissions,
    getMonthly: generateMonthlyMissions,
    updateProgress: updateMissionProgress,
    claim: claimMissionReward,
    getProgress: getMissionProgress
  };
  M.achievements = {
    getAll: getAchievements,
    unlock: unlockAchievement,
    getProgress: getAchievementProgress
  };
  M.telcTracking = {
    get: getTelcTracking,
    addAttempt: addTelcAttempt,
    getCompetencyAverages: getTelcCompetencyAverages,
    getPrediction: getTelcPrediction
  };
  M.heatmap = { getData: getHeatmapData };
  M.progressExport = {
    exportAll: exportAllProgress,
    import: importProgress,
    getDashboard: getFullDashboardData
  };
})();