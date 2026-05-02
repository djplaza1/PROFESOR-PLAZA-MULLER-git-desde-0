window.Muller = window.Muller || {};

// ==================== CONSTANTES ====================
window.Muller.ADVANCED_PROGRESS_KEY = 'muller_advanced_progress';
window.Muller.DAILY_ACTIVITY_KEY = 'muller_daily_activity';
window.Muller.DAILY_GOAL_DEFAULT = 30;
window.Muller.ACHIEVEMENTS_KEY = 'muller_achievements';

window.Muller.ACHIEVEMENT_DEFS = [
    { id: 'telc_first', icon: '📌', title: 'Erste Schritte', desc: '10 intentos en entrenamiento avanzado', test: function(d) { return d.totalAttempts >= 10; } },
    { id: 'telc_steady', icon: '💪', title: 'Konstant', desc: '50 intentos acumulados', test: function(d) { return d.totalAttempts >= 50; } },
    { id: 'telc_marathon', icon: '🏃', title: 'Ausdauer', desc: '200 intentos acumulados', test: function(d) { return d.totalAttempts >= 200; } },
    { id: 'telc_daily', icon: '✅', title: 'Tagesziel', desc: 'Completaste el objetivo diario', test: function(d) { return d.todayAttempts >= d.dailyGoal && d.dailyGoal > 0; } },
    { id: 'telc_streak3', icon: '🔥', title: 'Serie 3', desc: 'Racha de 3 días seguidos', test: function(d) { return d.streakDays >= 3; } },
    { id: 'telc_streak7', icon: '🔥', title: 'Serie 7', desc: 'Racha de 7 días seguidos', test: function(d) { return d.streakDays >= 7; } },
    { id: 'telc_streak30', icon: '🏆', title: 'Serie 30', desc: 'Racha de 30 días seguidos', test: function(d) { return d.streakDays >= 30; } },
    { id: 'telc_precision', icon: '🎯', title: 'Präzision', desc: '≥85% precisión con ≥40 intentos', test: function(d) { return d.totalAttempts >= 40 && d.accuracy >= 85; } },
    { id: 'telc_three_pillars', icon: '☡', title: 'Drei Säulen', desc: 'Has practicado Artículos, Verbos+Prep y Preposiciones', test: function(d) { return d.art.total > 0 && d.verb.total > 0 && d.prep.total > 0; } },
    { id: 'telc_weak_zero', icon: '🛡️', title: 'Schwächen im Griff', desc: '0 tarjetas débiles con ≥80 intentos', test: function(d) { return d.totalAttempts >= 80 && d.weak === 0; } }
];

// ==================== PROGRESO ====================
window.Muller.getAdvancedProgress = function() {
    try { return JSON.parse(localStorage.getItem(window.Muller.ADVANCED_PROGRESS_KEY) || '{}'); } catch(e) { return {}; }
};

window.Muller.saveAdvancedProgress = function(progress) {
    localStorage.setItem(window.Muller.ADVANCED_PROGRESS_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('advancedProgressUpdated'));
    window.Muller.runAchievementsCheck();
};

window.Muller.getTodayISODate = function() {
    return new Date().toISOString().slice(0, 10);
};

// ==================== ACTIVIDAD DIARIA ====================
window.Muller.getDailyActivity = function() {
    try {
        const parsed = JSON.parse(localStorage.getItem(window.Muller.DAILY_ACTIVITY_KEY) || '{}');
        return { dailyGoal: parsed.dailyGoal || window.Muller.DAILY_GOAL_DEFAULT, days: parsed.days || {} };
    } catch(e) { return { dailyGoal: window.Muller.DAILY_GOAL_DEFAULT, days: {} }; }
};

window.Muller.saveDailyActivity = function(activity) {
    localStorage.setItem(window.Muller.DAILY_ACTIVITY_KEY, JSON.stringify(activity));
    window.dispatchEvent(new Event('advancedProgressUpdated'));
    window.Muller.runAchievementsCheck();
};

window.Muller.setDailyGoalCount = function(n) {
    const activity = window.Muller.getDailyActivity();
    activity.dailyGoal = Math.max(5, Math.min(200, Math.round(Number(n))));
    window.Muller.saveDailyActivity(activity);
};

window.Muller.registerDailyAttempt = function() {
    const activity = window.Muller.getDailyActivity();
    const today = window.Muller.getTodayISODate();
    const todayStats = activity.days[today] || { attempts: 0 };
    activity.days[today] = { attempts: todayStats.attempts + 1 };
    window.Muller.saveDailyActivity(activity);
};

window.Muller.calculateStreak = function(daysMap) {
    let streak = 0;
    const cursor = new Date();
    while (true) {
        const dateKey = cursor.toISOString().slice(0, 10);
        const count = (daysMap[dateKey] && daysMap[dateKey].attempts) || 0;
        if (count <= 0) break;
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
};

// ==================== LOGROS ====================
window.Muller.getAchievementsUnlocked = function() {
    try { return JSON.parse(localStorage.getItem(window.Muller.ACHIEVEMENTS_KEY) || '{}'); } catch(e) { return {}; }
};

window.Muller.runAchievementsCheck = function() {
  const dash = window.Muller.getAdvancedDashboard();
  const unlocked = { ...window.Muller.getAchievementsUnlocked() };
  let changed = false;
  window.Muller.ACHIEVEMENT_DEFS.forEach(function(def) {
    if (!unlocked[def.id] && def.test(dash)) {
      unlocked[def.id] = new Date().toISOString();
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem(window.Muller.ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
    window.dispatchEvent(new Event('achievementsUpdated'));
  }
  if (window.Muller.Achievements) {
    const A = window.Muller.Achievements;
    const d = window.Muller.getAdvancedDashboard();
    if (d.art.attempts >= 50) A.unlock('training_articles_50');
    if (d.verb.attempts >= 30) A.unlock('training_verbs_30');
    let examCount = parseInt(localStorage.getItem('muller_exam_count') || '0');
    if (examCount >= 10) A.unlock('training_exam_10');
  }
};

// ==================== PANEL DE CONTROL ====================
window.Muller.getProgressCounts = function(progress, prefix) {
    const entries = Object.entries(progress).filter(function(e) { return e[0].startsWith(prefix + '::'); });
    return entries.reduce(function(acc, pair) {
        const stats = pair[1];
        acc.total += 1;
        acc.attempts += stats.attempts || 0;
        acc.errors += stats.errors || 0;
        acc.easy += stats.easy || 0;
        acc.normal += stats.normal || 0;
        acc.difficult += stats.difficult || 0;
        if ((stats.errors || 0) > (stats.correct || 0)) acc.weak += 1;
        return acc;
    }, { total: 0, attempts: 0, errors: 0, easy: 0, normal: 0, difficult: 0, weak: 0 });
};

window.Muller.getAdvancedDashboard = function() {
    const progress = window.Muller.getAdvancedProgress();
    const daily = window.Muller.getDailyActivity();
    const today = window.Muller.getTodayISODate();
    const todayAttempts = (daily.days[today] && daily.days[today].attempts) || 0;
    const dailyGoal = daily.dailyGoal || window.Muller.DAILY_GOAL_DEFAULT;
    const art = window.Muller.getProgressCounts(progress, 'articulos');
    const verb = window.Muller.getProgressCounts(progress, 'verbos');
    const prep = window.Muller.getProgressCounts(progress, 'preposiciones');
    const totalAttempts = art.attempts + verb.attempts + prep.attempts;
    const totalErrors = art.errors + verb.errors + prep.errors;
    const accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - totalErrors) / totalAttempts) * 100) : 0;
    return {
        art: art, verb: verb, prep: prep,
        totalAttempts: totalAttempts, totalErrors: totalErrors, accuracy: accuracy,
        weak: art.weak + verb.weak + prep.weak,
        todayAttempts: todayAttempts, dailyGoal: dailyGoal,
        dailyProgress: Math.min(100, Math.round((todayAttempts / Math.max(1, dailyGoal)) * 100)),
        streakDays: window.Muller.calculateStreak(daily.days)
    };
};

// ==================== COLA ADAPTATIVA ====================
window.Muller.buildAdaptiveQueue = function(items, progress, getId, maxItems) {
    const weighted = items.map(function(item) {
        const id = getId(item);
        const stats = progress[id] || {};
        const attempts = stats.attempts || 0;
        const errors = stats.errors || 0;
        const difficult = stats.difficult || 0;
        const easy = stats.easy || 0;
        const consecutiveErrors = stats.consecutiveErrors || 0;
        const lastSeenAt = stats.lastSeenAt ? new Date(stats.lastSeenAt).getTime() : 0;
        const hoursSinceSeen = lastSeenAt ? Math.max(0, (Date.now() - lastSeenAt) / (1000 * 60 * 60)) : 72;
        const recencyBoost = Math.min(3, hoursSinceSeen / 24);
        const score = attempts === 0
            ? 5
            : 2 + (errors * 2.2) + (difficult * 1.4) + (consecutiveErrors * 1.8) + recencyBoost - (easy * 0.7);
        return { item: item, score: Math.max(0.5, score + Math.random()) };
    });
    weighted.sort(function(a, b) { return b.score - a.score; });
    const cap = maxItems != null ? Math.min(maxItems, weighted.length) : weighted.length;
    return weighted.slice(0, cap).map(function(entry) { return entry.item; });
};

window.Muller.filterQueueByMode = function(items, progress, getId, mode) {
    if (mode === 'smart') return items;
    return items.filter(function(item) {
        const stats = progress[getId(item)] || {};
        const errors = stats.errors || 0;
        const correct = stats.correct || 0;
        const difficult = stats.difficult || 0;
        const attempts = stats.attempts || 0;
        if (mode === 'failed') return errors > 0;
        if (mode === 'difficult') return difficult > 0 || errors > 0;
        if (mode === 'weak') return attempts >= 3 && (errors / Math.max(1, errors + correct)) >= 0.4;
        if (mode === 'new') return attempts === 0;
        return true;
    });
};

// ==================== NORMALIZAR DATASETS ====================
window.Muller.normalizeArticulosDataset = function(raw) {
    if (!Array.isArray(raw)) return [];
    const byDe = new Map();
    for (const item of raw) {
        const de = (item.de || '').trim();
        if (!de) continue;
        const fromArr = Array.isArray(item.levels) ? item.levels.map(function(x) { return String(x).trim(); }).filter(Boolean) : [];
        const fromSingle = item.level != null && String(item.level).trim() !== '' ? [String(item.level).trim()] : [];
        const combined = [...new Set([...fromArr, ...fromSingle])];
        const prev = byDe.get(de);
        if (!prev) {
            byDe.set(de, { ...item, de: de, levels: combined });
        } else {
            const mergedLv = [...new Set([...(prev.levels || []), ...combined])];
            byDe.set(de, { ...prev, ...item, de: de, levels: mergedLv });
        }
    }
    return Array.from(byDe.values()).map(function(it) {
        if (!it.levels || it.levels.length === 0) return { ...it, levels: ['A1'] };
        return it;
    });
};

window.Muller.articleItemMatchesLevel = function(item, selectedMode) {
    if (selectedMode === 'MIXTO') return true;
    const lv = Array.isArray(item.levels) && item.levels.length ? item.levels : (item.level ? [item.level] : []);
    return lv.includes(selectedMode);
};

// ==================== TIPS ====================
window.Muller.getCardTip = function(type, item) {
    if (type === 'articulos') {
        const fullWord = (item.de || '').toLowerCase();
        const noun = fullWord.split(' ').slice(1).join(' ');
        if (noun.endsWith('ung') || noun.endsWith('heit') || noun.endsWith('keit') || noun.endsWith('schaft')) return "Truco: muchas palabras en -ung/-heit/-keit/-schaft son DIE.";
        if (noun.endsWith('chen') || noun.endsWith('lein')) return "Truco: diminutivos en -chen/-lein casi siempre son DAS.";
        if (noun.endsWith('er') || noun.endsWith('ling') || noun.endsWith('ismus')) return "Truco: muchos sustantivos en -er/-ling/-ismus son DER.";
        return "Truco: aprende cada palabra junto a su artículo (DER/DIE/DAS) como un bloque.";
    }
    const prep = (item.answer || '').toLowerCase();
    const tips = {
        'für': "'Für' rige Akkusativ (objetivo/duración). Muy frecuente en redacción y cloze TELC.",
        'mit': "'Mit' + Dativ: compañía/medio. Error típico: confundir con Akkusativ.",
        'auf': "En verbos fijos, 'auf' suele Akk. (objetivo/respuesta). Memoriza la colocación completa.",
        'bei': "'Bei' + Dativ: lugar abstracto/situación (bei der Arbeit).",
        'nach': "'Nach' + Dativ: dirección con nombres de ciudad/país; tiempo después de un hecho.",
        'von': "'Von' + Dativ: origen/partitivo; en TELC aparece mucho en textos informativos."
    };
    const base = item.trick || item.tipp || tips[prep] || "Fija verbo + preposición + caso como una unidad.";
    return base + " (TELC: prioriza colocaciones frecuentes en B1/B2.)";
};
