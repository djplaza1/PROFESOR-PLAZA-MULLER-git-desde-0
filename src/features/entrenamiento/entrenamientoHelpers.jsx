// ═══════════════════════════════════════════════════════════════
// 17. PLURALES - Generados automáticamente desde articulos.json
// ═══════════════════════════════════════════════════════════════

// Algoritmo de generación de plurales desde palabras del diccionario
window.Muller._applyPluralUmlaut = function(noun) {
    // Aplica Umlaut a la primera vocal a, o, u → ä, ö, ü (si es vocalizable)
    return noun.replace(/a(?=[^aeiouäöü]*(?:$|\s))/i, 'ä')
               .replace(/o(?=[^aeiouäöü]*(?:$|\s))/i, 'ö')
               .replace(/u(?=[^aeiouäöü]*(?:$|\s))/i, 'ü')
               .replace(/A(?=[^aeiouäöü]*(?:$|\s))/, 'Ä')
               .replace(/O(?=[^aeiouäöü]*(?:$|\s))/, 'Ö')
               .replace(/U(?=[^aeiouäöü]*(?:$|\s))/, 'Ü');
};

window.Muller._generatePluralForWord = function(noun, gender) {
    var result = { plural: '', type: '', rule: '', hasUmlaut: false };
    var lower = noun.toLowerCase();
    var monosyllabic = noun.split(/[^a-zäöüß]/i).filter(Boolean).length <= 1 && noun.length <= 8;
    
    // --- FEMENINOS ---
    if (gender === 'die') {
        // -in → -innen
        if (/in$/.test(lower)) {
            result.plural = noun + 'nen';
            result.type = '-nen';
            result.rule = 'Femeninos -in → plural -innen (duplica n)';
        }
        // -ung, -heit, -keit, -schaft, -tion, -tät → -en
        else if (/(ung|heit|keit|schaft|tion|tät)$/i.test(lower)) {
            result.plural = noun + 'en';
            result.type = '-en';
            result.rule = 'Femeninos -' + lower.match(/(ung|heit|keit|schaft|tion|tät)$/i)[0] + ' → plural -en';
        }
        // -e → -n
        else if (/e$/.test(lower)) {
            result.plural = noun + 'n';
            result.type = '-n';
            result.rule = 'Femeninos terminados en -e → plural -n';
        }
        // -er, -el → -n
        else if (/(er|el)$/i.test(lower)) {
            result.plural = noun + 'n';
            result.type = '-n';
            result.rule = 'Femeninos -' + (/(er|el)$/i.exec(lower)[0]) + ' → plural -n';
        }
        // -ik → -en
        else if (/ik$/.test(lower)) {
            result.plural = noun + 'en';
            result.type = '-en';
            result.rule = 'Femeninos -ik → plural -en';
        }
        // monosílabas habituales con Umlaut: Hand, Nacht, Stadt, Kuh, Maus, Wand, Kraft, etc
        else if (monosyllabic) {
            var withUmlaut = window.Muller._applyPluralUmlaut(noun);
            result.plural = withUmlaut + 'e';
            result.hasUmlaut = true;
            result.type = '-e+Umlaut';
            result.rule = 'Plural -e con Umlaut (femenino monosílabo)';
        }
        // resto → -en
        else {
            result.plural = noun + 'en';
            result.type = '-en';
            result.rule = 'Plural -en para femeninos';
        }
    }
    // --- MASCULINOS ---
    else if (gender === 'der') {
        // -er, -el, -en → plural cero (con posible Umlaut)
        if (/(er|el|en)$/i.test(lower)) {
            var suffix = (/(er|el|en)$/i.exec(lower)[0]).toLowerCase();
            // Monosílabos o palabras con vocal a/o/u que llevan Umlaut (Vater→Väter, Apfel→Äpfel)
            if (monosyllabic && /[aou]/i.test(noun)) {
                var withUmlaut = window.Muller._applyPluralUmlaut(noun);
                result.plural = withUmlaut;
                result.hasUmlaut = true;
                result.type = '= (+Umlaut)';
                result.rule = 'Plural sin cambio + Umlaut (masculino -' + suffix + ' monosílabo vocal a/o/u)';
            } else {
                result.plural = noun;
                result.type = '= (cero)';
                result.rule = 'Masculinos -' + suffix + ' → plural sin cambio';
            }
        }
        // -ling, -ich, -ig → -e
        else if (/(ling|ich|ig)$/i.test(lower)) {
            result.plural = noun + 'e';
            result.type = '-e';
            result.rule = 'Masculinos -' + (/(ling|ich|ig)$/i.exec(lower)[0]) + ' → plural -e';
        }
        // -eur, -ier, -ar, -or → -e
        else if (/(eur|ier|ar|or)$/i.test(lower)) {
            result.plural = noun + 'e';
            result.type = '-e';
            result.rule = 'Masculinos -' + (/(eur|ier|ar|or)$/i.exec(lower)[0]) + ' → plural -e';
        }
        // -ent, -ist, -ant, -at, -oge, -nom → -en (débiles)
        else if (/(ent|ist|ant|at|oge|nom|loge)$/i.test(lower)) {
            result.plural = noun + 'en';
            result.type = '-en';
            result.rule = 'Masculino débil → plural -en';
        }
        // -e (persona/animal) → -n (débil)
        else if (/e$/.test(lower)) {
            result.plural = noun + 'n';
            result.type = '-n';
            result.rule = 'Masculino débil -e → plural -n';
        }
        // Monosílabo → -e (con Umlaut si vocal a/o/u)
        else if (monosyllabic) {
            if (/[aou]/i.test(noun)) {
                var withUmlaut2 = window.Muller._applyPluralUmlaut(noun);
                result.plural = withUmlaut2 + 'e';
                result.hasUmlaut = true;
                result.type = '-e+Umlaut';
                result.rule = 'Plural -e con Umlaut (masculino monosílabo)';
            } else {
                result.plural = noun + 'e';
                result.type = '-e';
                result.rule = 'Plural -e (masculino monosílabo)';
            }
        }
        // -s, -sch, -ß, -x, -z → -e (con Umlaut posible)
        else if (/(s|sch|ß|x|z)$/i.test(lower)) {
            if (/[aou]/i.test(noun) && monosyllabic) {
                var withUmlaut3 = window.Muller._applyPluralUmlaut(noun);
                result.plural = withUmlaut3 + 'e';
                result.hasUmlaut = true;
                result.type = '-e+Umlaut';
                result.rule = 'Plural -e con Umlaut';
            } else {
                result.plural = noun + 'e';
                result.type = '-e';
                result.rule = 'Plural -e';
            }
        }
        // Resto → -e
        else {
            result.plural = noun + 'e';
            result.type = '-e';
            result.rule = 'Plural -e para masculinos';
        }
    }
    // --- NEUTROS ---
    else if (gender === 'das') {
        // -chen, -lein → cero
        if (/(chen|lein)$/i.test(lower)) {
            result.plural = noun;
            result.type = '= (cero)';
            result.rule = 'Diminutivos -' + (/(chen|lein)$/i.exec(lower)[0]) + ' → plural sin cambio';
        }
        // -er, -el, -en → cero
        else if (/(er|el|en)$/i.test(lower)) {
            result.plural = noun;
            result.type = '= (cero)';
            result.rule = 'Neutros -' + (/(er|el|en)$/i.exec(lower)[0]).toLowerCase() + ' → plural sin cambio';
        }
        // -nis → -nisse
        else if (/nis$/.test(lower)) {
            result.plural = noun + 'se';
            result.type = '-e';
            result.rule = 'Neutros -nis → plural -nisse (dobla s)';
        }
        // -um → -en
        else if (/um$/.test(lower)) {
            result.plural = noun.slice(0, -2) + 'en';
            result.type = '-en';
            result.rule = 'Neutros -um → plural -en (pierde -um)';
        }
        // -ium → -ien
        else if (/ium$/.test(lower)) {
            result.plural = noun.slice(0, -2) + 'en';
            result.type = '-en';
            result.rule = 'Neutros -ium → plural -ien';
        }
        // -a → -en (temas, dramen, etc)
        else if (/a$/.test(lower)) {
            result.plural = noun + 'en';
            result.type = '-en';
            result.rule = 'Neutros -a → plural -en';
        }
        // -o → -s (extranjerismo)
        else if (/o$/.test(lower)) {
            result.plural = noun + 's';
            result.type = '-s';
            result.rule = 'Neutros -o → plural -s (extranjerismo)';
        }
        // -i, -y → -s
        else if (/(i|y)$/i.test(lower)) {
            result.plural = noun + 's';
            result.type = '-s';
            result.rule = 'Neutros -' + (/(i|y)$/i.exec(lower)[0]) + ' → plural -s (extranjerismo)';
        }
        // Monosílabo → -er (con Umlaut si vocal a/o/u)
        else if (monosyllabic) {
            if (/[aou]/i.test(noun)) {
                var withUmlaut4 = window.Muller._applyPluralUmlaut(noun);
                result.plural = withUmlaut4 + 'er';
                result.hasUmlaut = true;
                result.type = '-er';
                result.rule = 'Plural -er con Umlaut (neutro monosílabo)';
            } else {
                result.plural = noun + 'er';
                result.type = '-er';
                result.rule = 'Plural -er (neutro monosílabo)';
            }
        }
        // Resto → -e
        else {
            result.plural = noun + 'e';
            result.type = '-e';
            result.rule = 'Plural -e para neutros';
        }
    }
    
    return result;
};

// Genera 3 opciones incorrectas plausibles para una palabra
window.Muller._generateWrongPluralOptions = function(noun, gender, correctType) {
    var allTypes = ['die' + ' ' + noun + 'e', 'die' + ' ' + noun + 'en', 'die' + ' ' + noun + 'n', 'die' + ' ' + noun + 'er', 
                    'die' + ' ' + noun + 's', 'die' + ' ' + window.Muller._applyPluralUmlaut(noun) + 'e', 
                    'die' + ' ' + window.Muller._applyPluralUmlaut(noun) + 'er'];
    // Filter unique ones different from correct
    return allTypes.filter(function(t) { 
        return t !== correctType; 
    }).slice(0, 3);
};

// Carga datos de plurales GENERADOS desde articulos.json
window.Muller.loadPluralData = function() {
    // Intentar cargar articulos.json data
    var articles = window.Muller.loadArticlesData();
    if (!articles || articles.length < 5) {
        // Fallback mínimo inline
        articles = [
            { de: 'der Mann', article: 'der' }, { de: 'die Frau', article: 'die' },
            { de: 'das Kind', article: 'das' }, { de: 'der Tisch', article: 'der' },
            { de: 'die Lampe', article: 'die' }, { de: 'das Buch', article: 'das' },
            { de: 'der Stuhl', article: 'der' }, { de: 'die Hand', article: 'die' },
            { de: 'der Lehrer', article: 'der' }, { de: 'das Haus', article: 'das' },
            { de: 'der Vater', article: 'der' }, { de: 'die Mutter', article: 'die' }
        ];
    }
    
    // Cargar overrides guardados en localStorage
    var overrides = {};
    try {
        var stored = localStorage.getItem('muller_plural_overrides_v1');
        if (stored) { overrides = JSON.parse(stored); }
    } catch(e) {}
    
    return articles.map(function(item) {
        var full = item.de || '';
        var parts = full.split(' ');
        var article = item.article || (parts.length > 1 ? parts[0] : 'der');
        var noun = item.article ? full.substring(article.length).trim() : (parts.length > 1 ? parts.slice(1).join(' ') : parts[0]);
        var gender = article;
        var key = article + '::' + noun;
        
        // Usar override si existe
        if (overrides[key]) {
            return {
                de: full,
                es: item.es || '',
                article: article,
                noun: noun,
                pluralForm: overrides[key].plural,
                pluralType: overrides[key].type,
                rule: overrides[key].rule || '✏️ Modificado por usuario',
                hasUmlaut: overrides[key].hasUmlaut || /[äöü]/.test(overrides[key].plural),
                gender: gender,
                isOverridden: true
            };
        }
        
        // Generar plural automático
        var gen = window.Muller._generatePluralForWord(noun, article);
        return {
            de: full,
            es: item.es || '',
            article: article,
            noun: noun,
            pluralForm: 'die ' + gen.plural,
            pluralType: gen.type,
            rule: gen.rule || '',
            hasUmlaut: gen.hasUmlaut || /[äöü]/.test(gen.plural),
            gender: gender,
            isOverridden: false
        };
    });
};

// ═══════════════════════════════════════════════════════════════
// 4. VERIFICACIÓN DE LOGROS
// ═══════════════════════════════════════════════════════════════
window.Muller.getAchievementsUnlocked = function() {
    try { return JSON.parse(localStorage.getItem(KEYS.ACHIEVEMENTS) || '{}'); } catch(e) { return {}; }
};

window.Muller.unlockAchievement = function(id) {
    var unlocked = window.Muller.getAchievementsUnlocked();
    if (unlocked[id]) return false; // Ya desbloqueado
    unlocked[id] = true;
    unlocked['_unlockedAt'] = unlocked['_unlockedAt'] || {};
    unlocked['_unlockedAt'][id] = new Date().toISOString();
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(unlocked));
    window.dispatchEvent(new Event('achievementsUpdated'));
    window.dispatchEvent(new CustomEvent('achievementUnlocked', { detail: { id: id } }));
    return true;
};

window.Muller.checkStreakAchievements = function(days) {
    if (days >= 3) window.Muller.unlockAchievement('streak_3');
    if (days >= 7) window.Muller.unlockAchievement('streak_7');
    if (days >= 30) window.Muller.unlockAchievement('streak_30');
    if (days >= 100) window.Muller.unlockAchievement('ultra_streak_100');
};

window.Muller.checkAchievements = function(stats) {
    // Primer intento
    if (stats.totalAttempts >= 1) window.Muller.unlockAchievement('first_steps');
    // Exámenes
    if (stats.examCount >= 5) window.Muller.unlockAchievement('exam_5');
    if (stats.examCount >= 25) window.Muller.unlockAchievement('exam_25');
    // Artículos
    if (stats.art.total >= 100) window.Muller.unlockAchievement('articles_100');
    // Verbos
    if (stats.verb.total >= 50) window.Muller.unlockAchievement('verbs_50');
    // Preposiciones
    if (stats.prep.total >= 30) window.Muller.unlockAchievement('preps_30');
    // All-rounder (mismos 3 tipos en un día)
    var daily = window.Muller.getDailyStats();
    if (daily.art > 0 && daily.verb > 0 && daily.prep > 0) window.Muller.unlockAchievement('all_rounder');
    // Campeón diario - 7 días seguidos cumpliendo meta
    var streak = window.Muller.getStreak();
    var goal = window.Muller.getDailyGoalCount();
    if (streak.days >= 7 && daily.attempts >= goal) window.Muller.unlockAchievement('daily_champion');
};

// ═══════════════════════════════════════════════════════════════
// 5. PROGRESO AVANZADO (SRS, estadísticas por palabra)
// ═══════════════════════════════════════════════════════════════
window.Muller.getAdvancedProgress = function() {
    try {
        var raw = localStorage.getItem(KEYS.PROGRESS);
        if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {};
};

window.Muller.saveAdvancedProgress = function(progress) {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
    window.dispatchEvent(new Event('advancedProgressUpdated'));
};

// ═══════════════════════════════════════════════════════════════
// 6. DASHBOARD AVANZADO
// ═══════════════════════════════════════════════════════════════
window.Muller.MASTERY_THRESHOLDS = {
    new: { min: 0, max: 0, label: 'Nueva', color: '#94a3b8', emoji: '🆕' },
    learning: { min: 1, max: 2, label: 'Aprendiendo', color: '#f59e0b', emoji: '🌱' },
    familiar: { min: 3, max: 4, label: 'Familiar', color: '#06b6d4', emoji: '👋' },
    mastered: { min: 5, max: 6, label: 'Dominada', color: '#10b981', emoji: '👑' },
    expert: { min: 7, max: Infinity, label: 'Experto', color: '#8b5cf6', emoji: '🧠' }
};

window.Muller.getMasteryLevel = function(stats) {
    var total = (stats.correct || 0) + (stats.errors || 0);
    if (total === 0) return 0;
    var ratio = (stats.correct || 0) / total;
    var bonus = Math.min(Math.floor((stats.consecutiveCorrect || 0) / 5), 2);
    var level = Math.round(ratio * 5) + bonus;
    return Math.max(1, Math.min(7, level));
};

window.Muller.getMasteryEmoji = function(level) {
    var thresholds = window.Muller.MASTERY_THRESHOLDS;
    for (var key in thresholds) {
        if (level >= thresholds[key].min && level <= thresholds[key].max) return thresholds[key].emoji;
    }
    return '⬜';
};

window.Muller.getAdvancedDashboard = function() {
    var progress = window.Muller.getAdvancedProgress();
    var daily = window.Muller.getDailyStats();
    var streak = window.Muller.getStreak();
    var goal = window.Muller.getDailyGoalCount();
    
    var dashboard = {
        dailyProgress: daily.date ? Math.min(100, Math.round(((daily.attempts || 0) / goal) * 100)) : 0,
        todayAttempts: daily.attempts || 0,
        dailyGoal: goal,
        streakDays: streak.days,
        totalAttempts: 0,
        accuracy: 0,
        weak: 0,
        difficult: 0,
        failed: 0,
        newCount: 0,
        learning: 0,
        mastered: 0,
        examCount: 0,
        // Por pillar
        art: { total: 0, attempts: 0, correct: 0, errors: 0, mastered: 0, weak: 0 },
        verb: { total: 0, attempts: 0, correct: 0, errors: 0, mastered: 0, weak: 0 },
        prep: { total: 0, attempts: 0, correct: 0, errors: 0, mastered: 0, weak: 0 }
    };
    
    var totalCorrect = 0;
    var totalErrors = 0;
    
    for (var key in progress) {
        var stats = progress[key];
        var total = (stats.attempts || 0);
        dashboard.totalAttempts += total;
        totalCorrect += (stats.correct || 0);
        totalErrors += (stats.errors || 0);
        
        // Determinar tipo por prefijo
        var type = 'art';
        if (key.indexOf('verbos::') === 0) type = 'verb';
        else if (key.indexOf('preposiciones::') === 0) type = 'prep';
        
        dashboard[type].total++;
        dashboard[type].attempts += total;
        dashboard[type].correct += (stats.correct || 0);
        dashboard[type].errors += (stats.errors || 0);
        
        var level = window.Muller.getMasteryLevel(stats);
        if (level >= 5) dashboard[type].mastered++;
        // Débiles: menos de 3 intentos o precisión < 50%
        if (total > 0 && ((stats.correct || 0) / total) < 0.5) dashboard[type].weak++;
        if (level >= 5) dashboard.mastered++;
        if (level <= 2 && total > 0) dashboard.learning++;
        if (total === 0) dashboard.newCount++;
        
        // Débiles global
        if (total > 0 && ((stats.correct || 0) / total) < 0.5) dashboard.weak++;
        // Difíciles global
        if (total > 0 && ((stats.errors || 0) / total) > 0.6) dashboard.difficult++;
        // Fallidas
        if (total > 0 && (stats.correct || 0) === 0) dashboard.failed++;
    }
    
    var totalAttemptsAll = totalCorrect + totalErrors;
    dashboard.accuracy = totalAttemptsAll > 0 ? Math.round((totalCorrect / totalAttemptsAll) * 100) : 0;
    
    // Contador de exámenes
    try {
        dashboard.examCount = parseInt(localStorage.getItem('muller_exam_count') || '0');
    } catch(e) {}
    
    return dashboard;
};

// ═══════════════════════════════════════════════════════════════
// 7. FILTROS: smart / failed / difficult / weak / new / learning / mastered
// ═══════════════════════════════════════════════════════════════
window.Muller.filterCardsByMode = function(cards, mode, progress) {
    var pr = progress || window.Muller.getAdvancedProgress();
    
    switch(mode) {
        case 'failed':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                var stats = pr[key];
                return stats && (stats.errors || 0) > 0 && (stats.correct || 0) === 0;
            });
        case 'difficult':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                var stats = pr[key];
                if (!stats || !stats.attempts) return false;
                var ratio = (stats.errors || 0) / stats.attempts;
                return ratio > 0.6 || (stats.consecutiveErrors || 0) >= 3;
            });
        case 'weak':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                var stats = pr[key];
                if (!stats || !stats.attempts) return false;
                var ratio = (stats.correct || 0) / stats.attempts;
                return ratio < 0.5;
            });
        case 'new':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                return !pr[key] || !pr[key].attempts;
            });
        case 'learning':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                var stats = pr[key];
                if (!stats || !stats.attempts) return false;
                var level = window.Muller.getMasteryLevel(stats);
                return level >= 1 && level <= 3;
            });
        case 'mastered':
            return cards.filter(function(c) {
                var key = window.Muller.cardToProgressKey(c);
                var stats = pr[key];
                if (!stats || !stats.attempts) return false;
                var level = window.Muller.getMasteryLevel(stats);
                return level >= 5;
            });
        case 'smart':
        default:
            // Algoritmo adaptativo: prioriza débiles, nuevas, y las que hace tiempo no se ven
            var now = Date.now();
            return cards.slice().sort(function(a, b) {
                var keyA = window.Muller.cardToProgressKey(a);
                var keyB = window.Muller.cardToProgressKey(b);
                var statsA = pr[keyA];
                var statsB = pr[keyB];
                
                var scoreA = window.Muller.calculateSmartScore(statsA, now);
                var scoreB = window.Muller.calculateSmartScore(statsB, now);
                
                return scoreB - scoreA;
            });
    }
};

window.Muller.cardToProgressKey = function(card) {
    if (card.type === 'articulos' || card.type === 'articles') {
        return 'articulos::' + (card.card.article || '') + '::' + (card.card.de || '');
    } else if (card.type === 'verbos') {
        return 'verbos::' + (card.card.de || '');
    } else if (card.type === 'preposiciones') {
        return 'preposiciones::' + (card.card.de || '');
    }
    return 'articulos::' + (card.de || '');
};

window.Muller.calculateSmartScore = function(stats, now) {
    if (!stats) return 100; // Nueva tarjeta: máxima prioridad
    
    var total = (stats.attempts || 0) + (stats.correct || 0) + (stats.errors || 0);
    if (total === 0) return 100;
    
    var ratio = (stats.correct || 0) / Math.max(1, total);
    var errorPenalty = (stats.consecutiveErrors || 0) * 15;
    var timeDecay = 0;
    
    if (stats.lastSeenAt) {
        var hoursSince = (now - new Date(stats.lastSeenAt).getTime()) / 3600000;
        timeDecay = Math.min(50, Math.floor(hoursSince / 24) * 5);
    }
    
    var score = (1 - ratio) * 50 + errorPenalty + timeDecay;
    return Math.round(score);
};

// ═══════════════════════════════════════════════════════════════
// 8. EXTRACCIÓN DESDE GUIÓN DE HISTORIA
// ═══════════════════════════════════════════════════════════════
window.Muller.extractArticlesFromGuion = function(guionText) {
    if (!guionText) return [];
    var found = [];
    var articleRegex = /\b(d(?:er|ie|as))\s+([A-ZÄÖÜ][a-zäöüß]+(?:[-\s][A-ZÄÖÜ][a-zäöüß]+)*)/g;
    var match;
    var seen = {};
    while ((match = articleRegex.exec(guionText)) !== null) {
        var article = match[1].toLowerCase();
        var noun = match[2].trim();
        var key = article + '::' + noun;
        if (noun.length >= 3 && !seen[key]) {
            seen[key] = true;
            found.push({ de: article + ' ' + noun, article: article, es: '', source: 'guion' });
        }
    }
    return found;
};

window.Muller.extractVerbsFromGuion = function(guionText) {
    if (!guionText) return [];
    var found = [];
    var verbPrepRegex = /\b([a-zäöüß]+(?:n|en))\s+(mit|auf|an|für|über|um|bei|von|zu|nach|aus|durch|gegen|ohne|vor|seit)/gi;
    var match;
    var seen = {};
    while ((match = verbPrepRegex.exec(guionText)) !== null) {
        var verb = match[1].toLowerCase();
        var prep = match[2].toLowerCase();
        var key = verb + '::' + prep;
        if (!seen[key]) {
            seen[key] = true;
            found.push({ de: verb + ' ' + prep, es: '', prep: prep, answer: prep, fall: 'Akkusativ', source: 'guion' });
        }
    }
    return found;
};

window.Muller.extractPrepositionsFromGuion = function(guionText) {
    if (!guionText) return [];
    var preps = ['mit', 'auf', 'an', 'für', 'über', 'um', 'bei', 'von', 'zu', 'nach', 'aus', 'durch', 'gegen', 'ohne', 'vor', 'seit', 'trotz', 'während', 'wegen', 'statt', 'dank', 'laut', 'in', 'unter', 'neben', 'zwischen', 'hinter', 'vor', 'über'];
    var found = [];
    var seen = {};
    preps.forEach(function(p) {
        var regex = new RegExp('\\b' + p + '\\b', 'gi');
        var match;
        while ((match = regex.exec(guionText)) !== null) {
            var prep = match[0].toLowerCase();
            if (!seen[prep]) {
                seen[prep] = true;
                found.push({ de: prep, es: '', fall: 'Akkusativ', answer: 'Akkusativ', source: 'guion' });
            }
        }
    });
    return found;
};

// ═══════════════════════════════════════════════════════════════
// 9. CARGA DE DATOS (preserva conexiones Gist + localStorage)
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// CARGA DE DATOS DESDE JSON LOCALES (con fallback inline)
// ═══════════════════════════════════════════════════════════════

// Inicia la carga asíncrona de los 3 JSONs al cargar el script
window.Muller._entrenamientoDataLoaded = false;
window.Muller._entrenamientoDataLoading = false;

window.Muller._loadAllTrainingData = function() {
    if (window.Muller._entrenamientoDataLoading) return;
    window.Muller._entrenamientoDataLoading = true;
    
    // Cargar artículos
    fetch('src/data/articulos.json?t=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(json) {
            if (Array.isArray(json) && json.length > 0) {
                // Mapear: json tiene {de, es, level}, necesitamos añadir article (der/die/das) desde el prefijo
                var mapped = json.map(function(item) {
                    var parts = (item.de || '').split(' ');
                    var article = parts.length > 1 ? parts[0] : 'der';
                    return {
                        de: item.de,
                        es: item.es || '',
                        article: article,
                        level: item.level || 'A1',
                        levels: [item.level || 'A1']
                    };
                });
                window.Muller.ARTICULOS_DATA_CACHED = mapped;
                try { localStorage.setItem('muller_articulos_data_v1', JSON.stringify(mapped)); } catch(e) {}
            }
        })
        .catch(function(err) { console.warn('[entrenamiento] No se pudo cargar articulos.json, usando fallback inline.', err); });

    // Cargar verbos+preposición
    fetch('src/data/verbos_con_preposiciones.json?t=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(json) {
            if (Array.isArray(json) && json.length > 0) {
                var mapped = json.map(function(item) {
                    // El JSON tiene: {de: frase con ___, answer: preposición, prepCase: "Akk"|"Dat", es: traducción}
                    // Necesitamos extraer verbo + preposición como clave (para mostrar en pregunta)
                    var fallMap = { 'Akk': 'Akkusativ', 'Dat': 'Dativ', 'Gen': 'Genitiv' };
                    // Extraer verbo: primera palabra del string (antes del espacio o del ___)
                    var dePhrase = item.de || '';
                    var verbMatch = dePhrase.match(/^(\w+)/);
                    var verb = verbMatch ? verbMatch[1] : '';
                    var prep = item.answer || '';
                    return {
                        de: dePhrase.replace(/___/g, '...'),
                        es: item.es || '',
                        prep: prep,
                        fall: fallMap[item.prepCase] || 'Akkusativ',
                        answer: prep,
                        verb: verb
                    };
                });
                window.Muller.VERBPREP_DATA_CACHED = mapped;
                try { localStorage.setItem('muller_verbprep_data_v1', JSON.stringify(mapped)); } catch(e) {}
            }
        })
        .catch(function(err) { console.warn('[entrenamiento] No se pudo cargar verbos_con_preposiciones.json, usando fallback inline.', err); });

    // Cargar preposiciones + caso
    fetch('src/data/preposiciones.json?t=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(json) {
            if (Array.isArray(json) && json.length > 0) {
                // El JSON tiene: {de: frase, answer: preposición, es: traducción, tipp: truco}
                // Determinar caso desde el tipp
                var mapped = json.map(function(item) {
                    var tipp = (item.tipp || '').toUpperCase();
                    // Extraer caso del tipp: "+ DAT", "+ AKK", "+ GEN"
                    var fall = 'Akkusativ'; // default
                    if (tipp.indexOf('+ DAT') !== -1 || tipp.indexOf('DAT') !== -1) fall = 'Dativ';
                    else if (tipp.indexOf('+ AKK') !== -1) fall = 'Akkusativ';
                    else if (tipp.indexOf('+ GEN') !== -1 || tipp.indexOf('GENITIV') !== -1) fall = 'Genitiv';
                    return {
                        de: item.de,
                        es: item.es || '',
                        answer: fall,
                        fall: fall,
                        prep: item.answer || '',
                        tipp: item.tipp || ''
                    };
                });
                window.Muller.PREP_DATA_CACHED = mapped;
                try { localStorage.setItem('muller_prep_data_v1', JSON.stringify(mapped)); } catch(e) {}
            }
        })
        .catch(function(err) { console.warn('[entrenamiento] No se pudo cargar preposiciones.json, usando fallback inline.', err); })
        .finally(function() {
            window.Muller._entrenamientoDataLoaded = true;
            // Disparar evento para que componentes puedan escuchar
            try { window.dispatchEvent(new Event('entrenamientoDataReady')); } catch(e) {}
        });
};

// Iniciar carga inmediatamente
window.Muller._loadAllTrainingData();

window.Muller.loadArticlesData = function() {
    var data = null;
    try {
        if (window.Muller.ARTICULOS_DATA_CACHED && window.Muller.ARTICULOS_DATA_CACHED.length > 10) {
            data = window.Muller.ARTICULOS_DATA_CACHED;
        } else {
            var stored = localStorage.getItem('muller_articulos_data_v1');
            if (stored) {
                try { data = JSON.parse(stored); } catch(e) {}
            }
        }
    } catch(e) {}
    if (!data || !Array.isArray(data) || data.length < 10) {
        data = window.Muller.getDefaultArticlesData ? window.Muller.getDefaultArticlesData() : window.Muller.DEFAULT_ARTICLES || [
            { de: 'der Mann', es: 'el hombre', article: 'der', levels: ['A1'] },
            { de: 'die Frau', es: 'la mujer', article: 'die', levels: ['A1'] },
            { de: 'das Kind', es: 'el niño', article: 'das', levels: ['A1'] },
            { de: 'der Tisch', es: 'la mesa', article: 'der', levels: ['A1'] },
            { de: 'die Lampe', es: 'la lámpara', article: 'die', levels: ['A1'] },
            { de: 'das Buch', es: 'el libro', article: 'das', levels: ['A1'] },
            { de: 'der Stuhl', es: 'la silla', article: 'der', levels: ['A1'] },
            { de: 'die Tafel', es: 'la pizarra', article: 'die', levels: ['A1'] },
            { de: 'das Fenster', es: 'la ventana', article: 'das', levels: ['A1'] },
            { de: 'der Lehrer', es: 'el profesor', article: 'der', levels: ['A1'] },
            { de: 'die Schülerin', es: 'la alumna', article: 'die', levels: ['A1'] },
            { de: 'das Heft', es: 'el cuaderno', article: 'das', levels: ['A1'] }
        ];
    }
    return data;
};

window.Muller.getDefaultArticlesData = function() {
    return [
        { de: 'der Mann', es: 'el hombre', article: 'der', levels: ['A1'] },
        { de: 'die Frau', es: 'la mujer', article: 'die', levels: ['A1'] },
        { de: 'das Kind', es: 'el niño', article: 'das', levels: ['A1'] },
        { de: 'der Tisch', es: 'la mesa', article: 'der', levels: ['A1'] },
        { de: 'die Lampe', es: 'la lámpara', article: 'die', levels: ['A1'] },
        { de: 'das Buch', es: 'el libro', article: 'das', levels: ['A1'] },
        { de: 'der Hund', es: 'el perro', article: 'der', levels: ['A1'] },
        { de: 'die Katze', es: 'la gata', article: 'die', levels: ['A1'] },
        { de: 'das Haus', es: 'la casa', article: 'das', levels: ['A1'] },
        { de: 'der Apfel', es: 'la manzana', article: 'der', levels: ['A1'] },
        { de: 'die Milch', es: 'la leche', article: 'die', levels: ['A1'] },
        { de: 'das Wasser', es: 'el agua', article: 'das', levels: ['A1'] },
        { de: 'der Zug', es: 'el tren', article: 'der', levels: ['A1', 'A2'] },
        { de: 'die Zeitung', es: 'el periódico', article: 'die', levels: ['A1', 'A2'] },
        { de: 'das Auto', es: 'el coche', article: 'das', levels: ['A1'] },
        { de: 'der Computer', es: 'el ordenador', article: 'der', levels: ['A1', 'A2'] },
        { de: 'die Freiheit', es: 'la libertad', article: 'die', levels: ['B1', 'B2'] },
        { de: 'das Vertrauen', es: 'la confianza', article: 'das', levels: ['B1', 'B2'] },
        { de: 'der Unterricht', es: 'la clase/enseñanza', article: 'der', levels: ['A2', 'B1'] },
        { de: 'die Meinung', es: 'la opinión', article: 'die', levels: ['A2', 'B1'] },
        { de: 'die Geschichte', es: 'la historia', article: 'die', levels: ['A2', 'B1'] },
        { de: 'der Augenblick', es: 'el momento', article: 'der', levels: ['B1', 'B2'] },
        { de: 'das Ergebnis', es: 'el resultado', article: 'das', levels: ['B1', 'B2'] },
        { de: 'die Entwicklung', es: 'el desarrollo', article: 'die', levels: ['B1', 'B2', 'C1'] },
        { de: 'der Zusammenhang', es: 'la relación/contexto', article: 'der', levels: ['B2', 'C1'] },
        { de: 'die Voraussetzung', es: 'el requisito', article: 'die', levels: ['B2', 'C1'] },
        { de: 'das Unternehmen', es: 'la empresa', article: 'das', levels: ['B1', 'B2'] },
        { de: 'der Fortschritt', es: 'el progreso', article: 'der', levels: ['B2', 'C1'] },
        { de: 'die Verantwortung', es: 'la responsabilidad', article: 'die', levels: ['B2', 'C1'] },
        { de: 'das Gedächtnis', es: 'la memoria', article: 'das', levels: ['B1', 'B2'] },
        { de: 'die Gesellschaft', es: 'la sociedad', article: 'die', levels: ['B1', 'B2'] },
        { de: 'der Erfolg', es: 'el éxito', article: 'der', levels: ['B1', 'B2'] },
        { de: 'die Möglichkeit', es: 'la posibilidad', article: 'die', levels: ['A2', 'B1'] },
        { de: 'das Angebot', es: 'la oferta', article: 'das', levels: ['B1', 'B2'] },
        { de: 'die Beziehung', es: 'la relación', article: 'die', levels: ['B1', 'B2'] },
    ];
};

window.Muller.loadVerbPrepData = function() {
    // Prioridad 1: datos cacheados por JSON fetch
    try {
        if (window.Muller.VERBPREP_DATA_CACHED && window.Muller.VERBPREP_DATA_CACHED.length > 10) {
            return window.Muller.VERBPREP_DATA_CACHED;
        }
    } catch(e) {}
    // Prioridad 2: localStorage
    try {
        var stored = localStorage.getItem('muller_verbprep_data_v1');
        if (stored) {
            try { return JSON.parse(stored); } catch(e) {}
        }
    } catch(e) {}
    // Prioridad 3: datos inline (fallback)
    return window.Muller.DEFAULT_VERBPREP_DATA || [
        { de: 'warten auf', es: 'esperar', prep: 'auf', fall: 'Akkusativ', answer: 'auf' },
        { de: 'sich freuen auf', es: 'alegrarse de (futuro)', prep: 'auf', fall: 'Akkusativ', answer: 'auf' },
        { de: 'sich freuen über', es: 'alegrarse de (pasado)', prep: 'über', fall: 'Akkusativ', answer: 'über' },
        { de: 'denken an', es: 'pensar en', prep: 'an', fall: 'Akkusativ', answer: 'an' },
        { de: 'sich erinnern an', es: 'recordar', prep: 'an', fall: 'Akkusativ', answer: 'an' },
        { de: 'sich kümmern um', es: 'ocuparse de', prep: 'um', fall: 'Akkusativ', answer: 'um' },
        { de: 'bitten um', es: 'pedir', prep: 'um', fall: 'Akkusativ', answer: 'um' },
        { de: 'sich interessieren für', es: 'interesarse por', prep: 'für', fall: 'Akkusativ', answer: 'für' },
        { de: 'danken für', es: 'agradecer por', prep: 'für', fall: 'Akkusativ', answer: 'für' },
        { de: 'sich vorbereiten auf', es: 'prepararse para', prep: 'auf', fall: 'Akkusativ', answer: 'auf' },
        { de: 'sprechen über', es: 'hablar sobre', prep: 'über', fall: 'Akkusativ', answer: 'über' },
        { de: 'sich beschweren über', es: 'quejarse de', prep: 'über', fall: 'Akkusativ', answer: 'über' },
        { de: 'teilnehmen an', es: 'participar en', prep: 'an', fall: 'Dativ', answer: 'an' },
        { de: 'sich treffen mit', es: 'encontrarse con', prep: 'mit', fall: 'Dativ', answer: 'mit' },
        { de: 'helfen bei', es: 'ayudar con/en', prep: 'bei', fall: 'Dativ', answer: 'bei' },
        { de: 'träumen von', es: 'soñar con', prep: 'von', fall: 'Dativ', answer: 'von' },
        { de: 'abhängen von', es: 'depender de', prep: 'von', fall: 'Dativ', answer: 'von' },
        { de: 'sich gewöhnen an', es: 'acostumbrarse a', prep: 'an', fall: 'Akkusativ', answer: 'an' },
        { de: 'verzichten auf', es: 'renunciar a', prep: 'auf', fall: 'Akkusativ', answer: 'auf' },
        { de: 'passen zu', es: 'pegar/convenir a', prep: 'zu', fall: 'Dativ', answer: 'zu' },
        { de: 'sich entscheiden für', es: 'decidirse por', prep: 'für', fall: 'Akkusativ', answer: 'für' },
        { de: 'sich konzentrieren auf', es: 'concentrarse en', prep: 'auf', fall: 'Akkusativ', answer: 'auf' },
        { de: 'bestehen aus', es: 'consistir en', prep: 'aus', fall: 'Dativ', answer: 'aus' },
        { de: 'leiden unter', es: 'sufrir de/bajo', prep: 'unter', fall: 'Dativ', answer: 'unter' },
        { de: 'sich unterscheiden von', es: 'diferenciarse de', prep: 'von', fall: 'Dativ', answer: 'von' },
        { de: 'glauben an', es: 'creer en', prep: 'an', fall: 'Akkusativ', answer: 'an' },
        { de: 'sich fürchten vor', es: 'temer a', prep: 'vor', fall: 'Dativ', answer: 'vor' },
        { de: 'schützen vor', es: 'proteger de', prep: 'vor', fall: 'Dativ', answer: 'vor' },
        { de: 'einladen zu', es: 'invitar a', prep: 'zu', fall: 'Dativ', answer: 'zu' },
        { de: 'gehören zu', es: 'pertenecer a', prep: 'zu', fall: 'Dativ', answer: 'zu' },
    ];
};

window.Muller.loadPrepositionData = function() {
    // Prioridad 1: datos cacheados por JSON fetch
    try {
        if (window.Muller.PREP_DATA_CACHED && window.Muller.PREP_DATA_CACHED.length > 10) {
            return window.Muller.PREP_DATA_CACHED;
        }
    } catch(e) {}
    // Prioridad 2: localStorage
    try {
        var stored = localStorage.getItem('muller_prep_data_v1');
        if (stored) {
            try { return JSON.parse(stored); } catch(e) {}
        }
    } catch(e) {}
    // Prioridad 3: datos inline (fallback)
    return window.Muller.DEFAULT_PREP_DATA || [
        { de: 'für', es: 'para', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'durch', es: 'a través de', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'gegen', es: 'contra', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'ohne', es: 'sin', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'um', es: 'alrededor de', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'mit', es: 'con', fall: 'Dativ', answer: 'Dativ' },
        { de: 'nach', es: 'después de / a', fall: 'Dativ', answer: 'Dativ' },
        { de: 'bei', es: 'en / cerca de', fall: 'Dativ', answer: 'Dativ' },
        { de: 'von', es: 'de / desde', fall: 'Dativ', answer: 'Dativ' },
        { de: 'zu', es: 'a / hacia', fall: 'Dativ', answer: 'Dativ' },
        { de: 'aus', es: 'de (origen)', fall: 'Dativ', answer: 'Dativ' },
        { de: 'seit', es: 'desde (tiempo)', fall: 'Dativ', answer: 'Dativ' },
        { de: 'außer', es: 'excepto', fall: 'Dativ', answer: 'Dativ' },
        { de: 'trotz', es: 'a pesar de', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'während', es: 'durante', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'wegen', es: 'debido a', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'statt', es: 'en lugar de', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'dank', es: 'gracias a', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'laut', es: 'según', fall: 'Genitiv', answer: 'Genitiv' },
        { de: 'entlang', es: 'a lo largo de', fall: 'Akkusativ', answer: 'Akkusativ' },
        { de: 'bis', es: 'hasta', fall: 'Akkusativ', answer: 'Akkusativ' },
    ];
};

// ═══════════════════════════════════════════════════════════════
// 10. REGLAS DE GÉNERO – Sistema completo de pistas automáticas
// ═══════════════════════════════════════════════════════════════

window.Muller.findArticleRule = function(item) {
    const fullWord = (item.de || '').toLowerCase();
    const noun = fullWord.split(' ').slice(1).join(' ');
    const article = fullWord.split(' ')[0] || '';

    if (!noun) return null;

    // ─── REGLAS DIE (femenino) ───
    if (noun.endsWith('ung')) return {
        ending: '-ung',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -ung son SIEMPRE DIE.\nEj: die Zeitung, die Bedeutung, die Übung.',
        color: '#ec4899'
    };
    if (noun.endsWith('heit')) return {
        ending: '-heit',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -heit son SIEMPRE DIE.\nEj: die Freiheit, die Gesundheit, die Wahrheit.',
        color: '#ec4899'
    };
    if (noun.endsWith('keit')) return {
        ending: '-keit',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -keit son SIEMPRE DIE.\nEj: die Möglichkeit, die Freundlichkeit.',
        color: '#ec4899'
    };
    if (noun.endsWith('schaft')) return {
        ending: '-schaft',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -schaft son SIEMPRE DIE.\nEj: die Gesellschaft, die Freundschaft, die Mannschaft.',
        color: '#ec4899'
    };
    if (noun.endsWith('ion')) return {
        ending: '-ion',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -ion son SIEMPRE DIE.\nEj: die Station, die Nation, die Diskussion.',
        color: '#ec4899'
    };
    if (noun.endsWith('tät')) return {
        ending: '-tät',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -tät son SIEMPRE DIE.\nEj: die Universität, die Aktivität, die Qualität.',
        color: '#ec4899'
    };
    if (noun.endsWith('ur')) return {
        ending: '-ur',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -ur suelen ser DIE.\nEj: die Kultur, die Natur, die Frisur.',
        color: '#ec4899'
    };
    if (noun.endsWith('ik')) return {
        ending: '-ik',
        article: 'die',
        tip: '🔵 REGLA: Palabras terminadas en -ik suelen ser DIE.\nEj: die Musik, die Politik, die Fantasie.',
        color: '#ec4899'
    };
    if (noun.endsWith('e') && noun.length > 2 && !noun.endsWith('er') && !noun.endsWith('ee') && !noun.endsWith('ie') && !noun.endsWith('te')) return {
        ending: '-e',
        article: 'die',
        tip: '🔵 REGLA: Muchas palabras terminadas en -e (no -er) son DIE.\nEj: die Lampe, die Blume, die Katze, die Frage.',
        color: '#ec4899'
    };
    if (noun.endsWith('enz')) return {
        ending: '-enz',
        article: 'die',
        tip: '🔵 REGLA: Palabras en -enz son SIEMPRE DIE.\nEj: die Toleranz, die Intelligenz, die Existenz.',
        color: '#ec4899'
    };
    if (noun.endsWith('anz')) return {
        ending: '-anz',
        article: 'die',
        tip: '🔵 REGLA: Palabras en -anz son SIEMPRE DIE.\nEj: die Distanz, die Bedeutung, die Toleranz.',
        color: '#ec4899'
    };
    if (noun.endsWith('ie')) return {
        ending: '-ie',
        article: 'die',
        tip: '🔵 REGLA: Palabras en -ie suelen ser DIE.\nEj: die Melodie, die Theorie, die Batterie.',
        color: '#ec4899'
    };
    if (noun.endsWith('ei')) return {
        ending: '-ei',
        article: 'die',
        tip: '🔵 REGLA: Palabras en -ei suelen ser DIE.\nEj: die Bäckerei, die Polizei, die Partei.',
        color: '#ec4899'
    };
    if (noun.endsWith('in') && noun.length > 4) return {
        ending: '-in',
        article: 'die',
        tip: '🔵 REGLA: Profesiones femeninas en -in son DIE.\nEj: die Lehrerin, die Studentin, die Ärztin.',
        color: '#ec4899'
    };

    // ─── REGLAS DER (masculino) ───
    if (noun.endsWith('er') && !noun.endsWith('ier') && noun.length > 3) return {
        ending: '-er',
        article: 'der',
        tip: '🔵 REGLA: Muchas palabras terminadas en -er (profesiones, personas) son DER.\nEj: der Lehrer, der Computer, der Fehler.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ling')) return {
        ending: '-ling',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ling son SIEMPRE DER.\nEj: der Schmetterling, der Frühling, der Lehrling.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ismus')) return {
        ending: '-ismus',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ismus son SIEMPRE DER.\nEj: der Kapitalismus, der Tourismus, der Journalismus.',
        color: '#3b82f6'
    };
    if (noun.endsWith('or')) return {
        ending: '-or',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -or suelen ser DER.\nEj: der Motor, der Professor, der Direktor.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ich') && noun.length > 3) return {
        ending: '-ich',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ich suelen ser DER.\nEj: der Teppich, der Strich, der Bereich.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ig') && noun.length > 3) return {
        ending: '-ig',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ig suelen ser DER.\nEj: der Honig, der König, der Pfennig.',
        color: '#3b82f6'
    };
    if (noun.endsWith('us') && noun.length > 3) return {
        ending: '-us',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -us suelen ser DER.\nEj: der Bus, der Kurs, der Zirkus.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ent') && noun.length > 4 && !noun.endsWith('ment')) return {
        ending: '-ent',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ent suelen ser DER (personas).\nEj: der Student, der Präsident, der Patient.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ist') && noun.length > 4) return {
        ending: '-ist',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ist son DER (profesiones).\nEj: der Polizist, der Journalist, der Künstler.',
        color: '#3b82f6'
    };
    if (noun.endsWith('ant') && noun.length > 4) return {
        ending: '-ant',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -ant suelen ser DER.\nEj: der Praktikant, der Elefant, der Diamant.',
        color: '#3b82f6'
    };
    if (noun.endsWith('loge')) return {
        ending: '-loge',
        article: 'der',
        tip: '🔵 REGLA: Palabras en -loge son DER (profesiones científicas).\nEj: der Psychologe, der Biologe, der Soziologe.',
        color: '#3b82f6'
    };

    // ─── REGLAS DAS (neutro) ───
    if (noun.endsWith('chen')) return {
        ending: '-chen',
        article: 'das',
        tip: '🔵 REGLA: Diminutivos en -chen son SIEMPRE DAS.\nEj: das Mädchen, das Häuschen, das Brötchen.',
        color: '#10b981'
    };
    if (noun.endsWith('lein')) return {
        ending: '-lein',
        article: 'das',
        tip: '🔵 REGLA: Diminutivos en -lein son SIEMPRE DAS.\nEj: das Büchlein, das Tischlein, das Fräulein.',
        color: '#10b981'
    };
    if (noun.endsWith('nis')) return {
        ending: '-nis',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -nis suelen ser DAS.\nEj: das Ergebnis, das Verhältnis, das Erlebnis.',
        color: '#10b981'
    };
    if (noun.endsWith('um')) return {
        ending: '-um',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -um son SIEMPRE DAS.\nEj: das Museum, das Studium, das Zentrum.',
        color: '#10b981'
    };
    if (noun.endsWith('ment') && noun.length > 4) return {
        ending: '-ment',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -ment suelen ser DAS.\nEj: das Testament, das Experiment, das Argument.',
        color: '#10b981'
    };
    if (noun.endsWith('tum')) return {
        ending: '-tum',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -tum son SIEMPRE DAS.\nEj: das Eigentum, das Wachstum, das Christentum.',
        color: '#10b981'
    };
    if (noun.endsWith('o') && noun.length > 2) return {
        ending: '-o',
        article: 'das',
        tip: '🔵 REGLA: Muchas palabras en -o (préstamos) son DAS.\nEj: das Auto, das Kino, das Büro.',
        color: '#10b981'
    };
    if (noun.endsWith('ma') && noun.length > 3) return {
        ending: '-ma',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -ma (griego) son DAS.\nEj: das Klima, das Drama, das Thema, das Koma.',
        color: '#10b981'
    };
    if (noun.endsWith('ett') && noun.length > 4) return {
        ending: '-ett',
        article: 'das',
        tip: '🔵 REGLA: Palabras en -ett suelen ser DAS.\nEj: das Ballett, das Etikett, das Duett.',
        color: '#10b981'
    };
    if (noun.startsWith('Ge') && noun.length > 4 && !noun.endsWith('e') && !noun.endsWith('er')) return {
        ending: 'Ge-',
        article: 'das',
        tip: '🔵 REGLA: Palabras que empiezan con Ge- suelen ser DAS.\nEj: das Geschenk, das Gemüse, das Gebäude.',
        color: '#10b981'
    };

    return null;
};

window.Muller.getCardTip = function(type, item) {
    if (type === 'articulos') {
        const rule = window.Muller.findArticleRule(item);
        return rule ? rule.tip : "Truco: aprende cada palabra junto a su artículo (DER/DIE/DAS) como un bloque.";
    }
    const prep = (item.answer || '').toLowerCase();
    const tips = {
        'für': "'Für' rige Akkusativ (objetivo/duración). Muy frecuente en redacción y cloze TELC.",
        'mit': "'Mit' + Dativ: compañía/medio. Error típico: confundir con Akkusativ.",
        'auf': "En verbos fijos, 'auf' suele Akk. (objetivo/respuesta). Memoriza la colocación completa.",
        'bei': "'Bei' + Dativ: lugar abstracto/situación (bei der Arbeit).",
        'nach': "'Nach' + Dativ: dirección con nombres de ciudad/país; tiempo después de un hecho.",
        'von': "'Von' + Dativ: origen/partitivo; en TELC aparece mucho en textos informativos.",
        'an': "'An' puede ser Akk. (movimiento) o Dativ (posición estática). ¡Atención al contexto!",
        'über': "'Über' es Akkusativ para temas (sprechen über) o movimiento por encima.",
        'um': "'Um' rige Akkusativ: tiempo exacto (um 8 Uhr) o alrededor de algo.",
        'durch': "'Durch' + Akkusativ: a través de, por medio de.",
        'gegen': "'Gegen' + Akkusativ: contra, hacia (gegen 10 Uhr).",
        'ohne': "'Ohne' + Akkusativ: sin. ¡Siempre Akkusativ!",
        'zu': "'Zu' + Dativ: dirección hacia un lugar (zu Hause, zur Schule).",
        'aus': "'Aus' + Dativ: procedencia/origen (aus Spanien, aus Holz).",
        'seit': "'Seit' + Dativ: desde (punto temporal). Ej: seit einem Jahr.",
        'trotz': "'Trotz' + Genitiv (formal) o Dativ (coloquial): a pesar de.",
        'während': "'Während' + Genitiv: durante. Ej: während des Unterrichts.",
        'wegen': "'Wegen' + Genitiv (formal) o Dativ (coloquial): debido a.",
        'dank': "'Dank' + Genitiv: gracias a (formal). Ej: dank des guten Trainings.",
        'laut': "'Laut' + Genitiv: según. Ej: laut des Berichts.",
        'statt': "'Statt' + Genitiv: en lugar de. Ej: statt der Schule."
    };
    const base = item.trick || item.tipp || tips[prep] || "Fija verbo + preposición + caso como una unidad.";
    return base + " (TELC: prioriza colocaciones frecuentes en B1/B2.)";
};

// ═══════════════════════════════════════════════════════════════
// 11. ARTÍCULO – Coincidencia por nivel
// ═══════════════════════════════════════════════════════════════
window.Muller.articleItemMatchesLevel = function(item, selectedMode) {
    if (selectedMode === 'MIXTO') return true;
    const lv = Array.isArray(item.levels) && item.levels.length ? item.levels : (item.level ? [item.level] : []);
    return lv.includes(selectedMode);
};

// Filtro de datos combinados (merge de múltiples fuentes)
window.Muller.mergeArticleSources = function(sources) {
    var byDe = new Map();
    sources.forEach(function(arr) {
        (arr || []).forEach(function(item) {
            var de = item.de || '';
            if (!de) return;
            var prev = byDe.get(de);
            if (!prev) {
                byDe.set(de, Object.assign({}, item));
            } else {
                var combined = (prev.levels || []).concat(item.levels || []);
                var mergedLv = [...new Set(combined)];
                byDe.set(de, Object.assign({}, prev, item, { de: de, levels: mergedLv }));
            }
        });
    });
    return Array.from(byDe.values()).map(function(it) {
        if (!it.levels || it.levels.length === 0) return Object.assign({}, it, { levels: ['A1'] });
        return it;
    });
};

// ═══════════════════════════════════════════════════════════════
// 12. HISTORIAL DE EXÁMENES
// ═══════════════════════════════════════════════════════════════
window.Muller.getExamHistory = function() {
    try { return JSON.parse(localStorage.getItem(KEYS.EXAM_HISTORY) || '[]'); } catch(e) { return []; }
};

window.Muller.saveExamToHistory = function(exam) {
    var history = window.Muller.getExamHistory();
    exam.completedAt = new Date().toISOString();
    exam.id = 'exam_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    history.unshift(exam);
    if (history.length > 100) history = history.slice(0, 100);
    localStorage.setItem(KEYS.EXAM_HISTORY, JSON.stringify(history));
    
    // Verificar logros relacionados con exámenes
    var count = history.length;
    if (count >= 5) window.Muller.unlockAchievement('exam_5');
    if (count >= 25) window.Muller.unlockAchievement('exam_25');
    
    // Verificar golden brain (100% en 45 tarjetas)
    if (exam.total >= 45 && exam.correct === exam.total) {
        window.Muller.unlockAchievement('golden_brain');
    }
    // Speed demon (menos de 3 minutos)
    if (exam.duration <= 180 && exam.total >= 30) {
        window.Muller.unlockAchievement('speed_demon');
    }
    // Examen perfecto
    if (exam.correct === exam.total && exam.total > 0) {
        window.Muller.unlockAchievement('exam_perfect');
    }
};

window.Muller.getLastExamResult = function() {
    var history = window.Muller.getExamHistory();
    return history.length > 0 ? history[0] : null;
};

window.Muller.clearExamHistory = function() {
    localStorage.setItem(KEYS.EXAM_HISTORY, '[]');
    localStorage.setItem('muller_exam_count', '0');
    window.dispatchEvent(new Event('examHistoryChanged'));
};

// ═══════════════════════════════════════════════════════════════
// 13. PREGUNTAS ORALES TELC
// ═══════════════════════════════════════════════════════════════
window.Muller.TELC_ORAL_QUESTIONS = window.Muller.TELC_ORAL_QUESTIONS || [
    { theme: 'Familie', question: 'Erzählen Sie etwas über Ihre Familie.', es: 'Hable sobre su familia.' },
    { theme: 'Beruf', question: 'Was machen Sie beruflich?', es: '¿Qué hace profesionalmente?' },
    { theme: 'Wohnen', question: 'Wo wohnen Sie? Beschreiben Sie Ihre Wohnung.', es: '¿Dónde vive? Describa su piso.' },
    { theme: 'Reisen', question: 'Reisen Sie gern? Wohin reisen Sie?', es: '¿Le gusta viajar? ¿Adónde viaja?' },
    { theme: 'Essen', question: 'Was essen Sie gern?', es: '¿Qué le gusta comer?' },
    { theme: 'Hobbys', question: 'Was machen Sie in Ihrer Freizeit?', es: '¿Qué hace en su tiempo libre?' },
    { theme: 'Deutsch lernen', question: 'Warum lernen Sie Deutsch?', es: '¿Por qué aprende alemán?' },
    { theme: 'Zukunft', question: 'Was möchten Sie in Zukunft machen?', es: '¿Qué le gustaría hacer en el futuro?' },
    { theme: 'Gesundheit', question: 'Was tun Sie für Ihre Gesundheit?', es: '¿Qué hace por su salud?' },
    { theme: 'Medien', question: 'Sehen Sie fern oder lesen Sie Zeitung?', es: '¿Ve la tele o lee el periódico?' },
    { theme: 'Umwelt', question: 'Was tun Sie für die Umwelt?', es: '¿Qué hace por el medio ambiente?' },
    { theme: 'Technologie', question: 'Wie nutzen Sie Technologie im Alltag?', es: '¿Cómo usa la tecnología en el día a día?' },
    { theme: 'Sprachen', question: 'Welche Sprachen sprechen Sie?', es: '¿Qué idiomas habla?' },
    { theme: 'Einkaufen', question: 'Gehen Sie gern einkaufen?', es: '¿Le gusta ir de compras?' },
    { theme: 'Feiertage', question: 'Was machen Sie an Feiertagen?', es: '¿Qué hace en los días festivos?' },
];

// ═══════════════════════════════════════════════════════════════
// 14. GENERAR EXAMEN MIXTO TELC
// ═══════════════════════════════════════════════════════════════
window.Muller.generateMixedExam = function(numCards, mode) {
    var count = numCards || 45;
    var articulosData = window.Muller.loadArticlesData();
    var verbprepData = window.Muller.loadVerbPrepData();
    var prepData = window.Muller.loadPrepositionData();
    
    var artCount = Math.round(count * 0.34);
    var verbCount = Math.round(count * 0.33);
    var prepCount = count - artCount - verbCount;
    
    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        return a;
    }
    
    var selected = [];
    var progress = window.Muller.getAdvancedProgress();
    
    function pickCards(data, n, typeKey) {
        // Si modo 'smart', usar algoritmo adaptativo
        var filtered = data.slice();
        if (mode === 'smart' || !mode) {
            filtered = window.Muller.filterCardsByMode(
                data.map(function(item) { return { type: typeKey === 'articulos' ? 'articulos' : typeKey, card: item }; }),
                'smart', progress
            ).map(function(w) { return w.card; });
        }
        return shuffle(filtered).slice(0, Math.min(n, filtered.length));
    }
    
    pickCards(articulosData, artCount, 'articulos').forEach(function(item) {
        selected.push({
            type: 'articulos',
            card: item,
            question: item.de + ' → ¿Artículo?',
            answer: item.article,
            es: item.es,
            getTip: function() { return window.Muller.getCardTip('articulos', item); }
        });
    });
    
    pickCards(verbprepData, verbCount, 'verbos').forEach(function(item) {
        selected.push({
            type: 'verbos',
            card: item,
            question: item.de + ' → ¿Preposición?',
            answer: item.answer,
            es: item.es + ' (' + item.fall + ')',
            getTip: function() { return window.Muller.getCardTip('verbos', item); }
        });
    });
    
    pickCards(prepData, prepCount, 'preposiciones').forEach(function(item) {
        selected.push({
            type: 'preposiciones',
            card: item,
            question: item.de + ' (' + item.es + ') → ¿Caso?',
            answer: item.answer,
            es: item.es,
            getTip: function() { return window.Muller.getCardTip('preposiciones', item); }
        });
    });
    
    return shuffle(selected);
};

// ═══════════════════════════════════════════════════════════════
// 15. FORMATO DE TIEMPO Y FECHA
// ═══════════════════════════════════════════════════════════════
window.Muller.formatExamTime = function(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
};

window.Muller.formatDateShort = function(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

// ═══════════════════════════════════════════════════════════════
// 16. FUNCIONES PREMIUM NUEVAS
// ═══════════════════════════════════════════════════════════════

// === ANÁLISIS DE PATRONES DE ERROR ===
window.Muller.analyzeErrorPatterns = function() {
    var progress = window.Muller.getAdvancedProgress();
    var patterns = {
        commonErrors: {},
        worstTimeOfDay: null,
        articleConfusions: { derVsDie: 0, derVsDas: 0, dieVsDas: 0 },
        prepCaseErrors: { akkusativConfused: 0, dativConfused: 0, genitivConfused: 0 },
        verbPrepErrors: {},  // qué preposiciones se confunden más
        streaks: { maxCorrectStreak: 0, maxErrorStreak: 0 },
        recentAccuracy: []
    };
    
    var currentCorrectStreak = 0;
    var currentErrorStreak = 0;
    
    for (var key in progress) {
        var stats = progress[key];
        if (!stats || !stats.attempts) continue;
        
        // Errores comunes
        if ((stats.errors || 0) > 2) {
            patterns.commonErrors[key] = {
                attempts: stats.attempts,
                errors: stats.errors || 0,
                correct: stats.correct || 0,
                ratio: Math.round(((stats.errors || 0) / stats.attempts) * 100)
            };
        }
        
        // Confusiones de artículo
        if (key.indexOf('articulos::') === 0) {
            var parts = key.split('::');
            var article = parts[1] || '';
            if (stats.errors > stats.correct && stats.attempts > 3) {
                if (article === 'der') patterns.articleConfusions.derVsDie++;
                if (article === 'die') patterns.articleConfusions.dieVsDas++;
                if (article === 'das') patterns.articleConfusions.derVsDas++;
            }
        }
        
        // Rachas
        if (stats.consecutiveCorrect && stats.consecutiveCorrect > patterns.streaks.maxCorrectStreak) {
            patterns.streaks.maxCorrectStreak = stats.consecutiveCorrect;
        }
        if (stats.consecutiveErrors && stats.consecutiveErrors > patterns.streaks.maxErrorStreak) {
            patterns.streaks.maxErrorStreak = stats.consecutiveErrors;
        }
    }
    
    // Precisión reciente (últimas 50 respuestas del historial de examen)
    var history = window.Muller.getExamHistory();
    var recentAnswers = [];
    history.slice(0, 5).forEach(function(exam) {
        if (exam.answers) {
            exam.answers.forEach(function(a) {
                recentAnswers.push(a.correct);
            });
        }
    });
    recentAnswers = recentAnswers.slice(-50);
    var recentCorrect = recentAnswers.filter(function(c) { return c; }).length;
    patterns.recentAccuracy = {
        total: recentAnswers.length,
        correct: recentCorrect,
        pct: recentAnswers.length > 0 ? Math.round((recentCorrect / recentAnswers.length) * 100) : 0
    };
    
    return patterns;
};

// === GENERADOR DE PLAN DE ESTUDIO PERSONALIZADO ===
window.Muller.generateStudyPlan = function() {
    var dashboard = window.Muller.getAdvancedDashboard();
    var patterns = window.Muller.analyzeErrorPatterns();
    var plan = {
        focus: [],
        recommendedPractice: '',
        estimatedTime: 0,
        tips: [],
        weakPillar: null,
        nextMilestone: null
    };
    
    // Determinar pillar más débil
    var pillars = [
        { key: 'art', name: 'Artículos', accuracy: dashboard.art.attempts > 0 ? Math.round((dashboard.art.correct / dashboard.art.attempts) * 100) : 0 },
        { key: 'verb', name: 'Verbos+Prep', accuracy: dashboard.verb.attempts > 0 ? Math.round((dashboard.verb.correct / dashboard.verb.attempts) * 100) : 0 },
        { key: 'prep', name: 'Preposiciones', accuracy: dashboard.prep.attempts > 0 ? Math.round((dashboard.prep.correct / dashboard.prep.attempts) * 100) : 0 }
    ];
    pillars.sort(function(a, b) { return a.accuracy - b.accuracy; });
    plan.weakPillar = pillars[0];
    
    // Recomendaciones
    if (plan.weakPillar.accuracy < 50) {
        plan.focus.push('🔴 Prioridad máxima: ' + plan.weakPillar.name + ' (' + plan.weakPillar.accuracy + '%)');
        plan.recommendedPractice = plan.weakPillar.name;
        plan.estimatedTime = 20;
    } else if (plan.weakPillar.accuracy < 70) {
        plan.focus.push('🟡 Necesitas reforzar: ' + plan.weakPillar.name);
        plan.recommendedPractice = plan.weakPillar.name;
        plan.estimatedTime = 15;
    } else {
        plan.focus.push('🟢 Bien encaminado. Sigue practicando todos los pilares.');
        plan.recommendedPractice = 'mixed';
        plan.estimatedTime = 10;
    }
    
    // Segundo más débil
    if (pillars[1].accuracy < 70) {
        plan.focus.push('📌 También trabaja: ' + pillars[1].name + ' (' + pillars[1].accuracy + '%)');
        plan.estimatedTime += 10;
    }
    
    // Tips basados en patrones
    if (patterns.streaks.maxErrorStreak >= 5) {
        plan.tips.push('⚠️ Has tenido rachas de ' + patterns.streaks.maxErrorStreak + ' errores seguidos. Tómate un descanso entre tandas.');
    }
    if (dashboard.streakDays < 3) {
        plan.tips.push('🔥 Intenta mantener una racha de al menos 3 días para activar el hábito.');
    }
    if (patterns.recentAccuracy.total > 0 && patterns.recentAccuracy.pct < 50) {
        plan.tips.push('📉 Tu precisión reciente es baja (' + patterns.recentAccuracy.pct + '%). Prueba con modo "Fáciles" para recuperar confianza.');
    }
    if (dashboard.dailyProgress < 50) {
        plan.tips.push('🎯 Hoy llevas ' + dashboard.todayAttempts + '/' + dashboard.dailyGoal + ' intentos. ¡A por la meta diaria!');
    }
    
    // Siguiente hito
    var nextAchievement = null;
    var unlocked = window.Muller.getAchievementsUnlocked();
    window.Muller.ACHIEVEMENT_DEFS.forEach(function(def) {
        if (!unlocked[def.id]) {
            if (!nextAchievement) nextAchievement = def;
        }
    });
    if (nextAchievement) {
        plan.nextMilestone = nextAchievement;
    }
    
    return plan;
};

// === DESAFÍO DIARIO ===
window.Muller.generateDailyChallenge = function() {
    var today = new Date().toISOString().split('T')[0];
    var challengeKey = KEYS.CHALLENGE;
    var stored = {};
    try { stored = JSON.parse(localStorage.getItem(challengeKey) || '{}'); } catch(e) {}
    
    if (stored.date === today) return stored; // Ya generado hoy
    
    var challenges = [
        { type: 'speed', title: '⚡ Velocidad', desc: 'Responde 15 tarjetas en menos de 2 minutos', target: 15, reward: '🏅' },
        { type: 'perfect', title: '💯 Precisión', desc: 'Acierta 10 tarjetas consecutivas', target: 10, reward: '🎯' },
        { type: 'volume', title: '📚 Volumen', desc: 'Completa 30 tarjetas en total', target: 30, reward: '📖' },
        { type: 'articles', title: '📖 Artículos', desc: 'Practica 15 artículos sin errores', target: 15, reward: '🧠' },
        { type: 'verbs', title: '🔗 Verbos+Prep', desc: 'Acierta 10 verbos con preposición', target: 10, reward: '🔗' },
        { type: 'mix', title: '🔄 Mixto', desc: 'Completa 20 tarjetas de tipos mezclados', target: 20, reward: '🌟' },
        { type: 'streak_boost', title: '🔥 Racha', desc: 'Mantén 5 aciertos seguidos sin fallo', target: 5, reward: '🔥' },
        { type: 'comeback', title: '♻️ Remontada', desc: 'Corrige 3 errores consecutivos', target: 3, reward: '💪' },
    ];
    
    var challenge = challenges[Math.floor(Math.random() * challenges.length)];
    challenge.date = today;
    challenge.completed = false;
    challenge.progress = 0;
    
    localStorage.setItem(challengeKey, JSON.stringify(challenge));
    return challenge;
};

window.Muller.updateDailyChallenge = function(progress) {
    var challengeKey = KEYS.CHALLENGE;
    var stored = {};
    try { stored = JSON.parse(localStorage.getItem(challengeKey) || '{}'); } catch(e) {}
    if (!stored.date || stored.completed) return;
    stored.progress = Math.min(stored.target, (stored.progress || 0) + progress);
    if (stored.progress >= stored.target) {
        stored.completed = true;
        stored.completedAt = new Date().toISOString();
        // Premio: 5 monedas extra
        window.Muller.unlockAchievement('daily_champion');
    }
    localStorage.setItem(challengeKey, JSON.stringify(stored));
    window.dispatchEvent(new Event('challengeUpdated'));
};

// === SISTEMA DE REPETICIÓN ESPACIADA (SRS) MEJORADO ===
window.Muller.calculateNextReview = function(stats) {
    if (!stats || !stats.attempts) return { interval: 0, nextDate: new Date(), ease: 2.5 };
    
    var level = window.Muller.getMasteryLevel(stats);
    var baseInterval = 0;
    var ease = 2.5;
    
    switch(level) {
        case 0: case 1: baseInterval = 0.25; break;  // 6 horas
        case 2: baseInterval = 1; break;              // 1 día
        case 3: baseInterval = 3; break;              // 3 días
        case 4: baseInterval = 7; break;              // 1 semana
        case 5: baseInterval = 14; break;             // 2 semanas
        case 6: baseInterval = 30; break;             // 1 mes
        case 7: baseInterval = 60; break;             // 2 meses
        default: baseInterval = 1;
    }
    
    // Ajustar por errores
    if (stats.consecutiveErrors && stats.consecutiveErrors > 2) {
        baseInterval = Math.max(0.25, baseInterval * 0.5);
        ease = Math.max(1.3, ease - 0.3);
    }
    
    // Ajustar por aciertos consecutivos
    if (stats.consecutiveCorrect && stats.consecutiveCorrect > 5) {
        ease = Math.min(3.0, ease + 0.2);
    }
    
    var nextDate = new Date();
    nextDate.setHours(nextDate.getHours() + Math.round(baseInterval * 24));
    
    return { interval: baseInterval, nextDate: nextDate, ease: ease };
};

// === PREDICCIÓN DE PUNTUACIÓN TELC ===
window.Muller.predictTelcScore = function() {
    var dashboard = window.Muller.getAdvancedDashboard();
    var patterns = window.Muller.analyzeErrorPatterns();
    
    // Factores
    var accuracyFactor = dashboard.accuracy / 100;
    var streakFactor = Math.min(1, dashboard.streakDays / 30);
    var volumeFactor = Math.min(1, dashboard.totalAttempts / 500);
    var masteryFactor = dashboard.mastered / Math.max(1, dashboard.mastered + dashboard.weak);
    
    // Peso: precisión 40%, volumen 20%, racha 15%, maestría 25%
    var predicted = (accuracyFactor * 0.40 + volumeFactor * 0.20 + streakFactor * 0.15 + masteryFactor * 0.25) * 100;
    
    // Nivel estimado TELC
    var estimatedLevel = 'A1';
    if (predicted >= 85) estimatedLevel = 'C1';
    else if (predicted >= 70) estimatedLevel = 'B2';
    else if (predicted >= 55) estimatedLevel = 'B1';
    else if (predicted >= 35) estimatedLevel = 'A2';
    
    return {
        score: Math.round(predicted),
        level: estimatedLevel,
        confidence: accuracyFactor >= 0.8 ? 'Alta' : accuracyFactor >= 0.6 ? 'Media' : 'Baja',
        nextLevel: predicted >= 85 ? '¡Ya estás en nivel C1!' : predicted >= 70 ? 'A solo ' + Math.round((85 - predicted)) + ' puntos de C1' : predicted >= 55 ? 'A ' + Math.round((70 - predicted)) + ' puntos de B2' : predicted >= 35 ? 'A ' + Math.round((55 - predicted)) + ' puntos de B1' : 'Necesitas ' + Math.round((35 - predicted)) + ' puntos para A2'
    };
};

// === CITAS MOTIVACIONALES ===
window.Muller.MOTIVATION_QUOTES = [
    { de: 'Übung macht den Meister.', es: 'La práctica hace al maestro.' },
    { de: 'Wer nicht wagt, der nicht gewinnt.', es: 'Quien no arriesga, no gana.' },
    { de: 'Aller Anfang ist schwer.', es: 'Todos los comienzos son difíciles.' },
    { de: 'Steter Tropfen höhlt den Stein.', es: 'Gota a gota se horada la piedra.' },
    { de: 'Der Weg ist das Ziel.', es: 'El camino es la meta.' },
    { de: 'Ohne Fleiß kein Preis.', es: 'Sin esfuerzo no hay recompensa.' },
    { de: 'Aus Fehlern wird man klug.', es: 'De los errores se aprende.' },
    { de: 'Es ist noch kein Meister vom Himmel gefallen.', es: 'Nadie nace sabiendo.' },
    { de: 'Kleine Fortschritte sind auch Erfolge.', es: 'Los pequeños progresos también son logros.' },
    { de: 'Du schaffst das!', es: '¡Tú puedes!' },
    { de: 'Besser spät als nie.', es: 'Más vale tarde que nunca.' },
    { de: 'Wo ein Wille ist, ist auch ein Weg.', es: 'Donde hay voluntad, hay un camino.' },
];

window.Muller.getDailyMotivation = function() {
    var today = new Date().getDate();
    var idx = today % window.Muller.MOTIVATION_QUOTES.length;
    return window.Muller.MOTIVATION_QUOTES[idx];
};

// === ESTADÍSTICAS SEMANALES ===
window.Muller.getWeeklyStats = function() {
    var history = window.Muller.getExamHistory();
    var now = new Date();
    var weekAgo = new Date(now.getTime() - 7 * 86400000);
    
    var weeklyExams = history.filter(function(e) {
        return e.completedAt && new Date(e.completedAt) > weekAgo;
    });
    
    var totalCards = 0;
    var totalCorrect = 0;
    weeklyExams.forEach(function(e) {
        totalCards += e.total || 0;
        totalCorrect += e.correct || 0;
    });
    
    return {
        examsThisWeek: weeklyExams.length,
        totalCards: totalCards,
        totalCorrect: totalCorrect,
        accuracy: totalCards > 0 ? Math.round((totalCorrect / totalCards) * 100) : 0,
        daysActive: 0  // se calcula con daily stats
    };
};

// === RECOMENDACIÓN DE REPASO INTELIGENTE ===
window.Muller.getReviewRecommendations = function(limit) {
    var progress = window.Muller.getAdvancedProgress();
    var now = Date.now();
    var recommendations = [];
    
    for (var key in progress) {
        var stats = progress[key];
        if (!stats || !stats.attempts) continue;
        
        var review = window.Muller.calculateNextReview(stats);
        if (review.nextDate <= new Date()) {
            // Tarjeta lista para repasar
            var priority = 0;
            if (stats.consecutiveErrors && stats.consecutiveErrors > 2) priority += 50;
            if ((stats.errors || 0) > (stats.correct || 0)) priority += 30;
            if (!stats.lastSeenAt) priority += 20;
            
            recommendations.push({
                key: key,
                stats: stats,
                priority: priority,
                review: review
            });
        }
    }
    
    recommendations.sort(function(a, b) { return b.priority - a.priority; });
    return recommendations.slice(0, limit || 20);
};


// ═══════════════════════════════════════════════════════════════
// 18. EXPORTAR AL MÓDULO PRINCIPAL
// ═══════════════════════════════════════════════════════════════
window.Muller.EntrenamientoHelpers = {
    KEYS: KEYS,
    analyzeErrorPatterns: window.Muller.analyzeErrorPatterns,
    generateStudyPlan: window.Muller.generateStudyPlan,
    generateDailyChallenge: window.Muller.generateDailyChallenge,
    updateDailyChallenge: window.Muller.updateDailyChallenge,
    calculateNextReview: window.Muller.calculateNextReview,
    predictTelcScore: window.Muller.predictTelcScore,
    getWeeklyStats: window.Muller.getWeeklyStats,
    getReviewRecommendations: window.Muller.getReviewRecommendations
};

console.log('✅ entrenamientoHelpers v4 super-premium loaded');

})();