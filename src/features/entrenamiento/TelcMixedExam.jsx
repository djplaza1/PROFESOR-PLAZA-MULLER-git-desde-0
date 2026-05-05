// ═══════════════════════════════════════════════════════════
// TELC MIXED EXAM – Premium Ultra Edition v5
// ═══════════════════════════════════════════════════════════
// Examen mixto tipo TELC con 45 tarjetas combinando
// artículos (DER/DIE/DAS), verbos+preposiciones y
// preposiciones+caso. Con integración DeepSeek AI,
// temporizador, combo streak, bookmarks, dificultad,
// mastered system, focus sprint, session summary,
// auto-advance, auto-AI examples y más.
//
// CONEXIONES ACTIVAS:
// → getDefaultArticlesData() / getDefaultVerbPrepData() / getDefaultPrepData()
// → GIST fallbacks ya integrados en cada módulo individual
// ═══════════════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.TelcMixedExam = function TelcMixedExam({ onBack }) {
    const M = window.Muller;
    const TOTAL_CARDS = 45;
    const TIME_LIMIT = 45 * 60; // 45 minutos en segundos
    const [phase, setPhase] = React.useState('config'); // config | running | review | bookmarks-view
    const [cards, setCards] = React.useState([]);
    const [currentIdx, setCurrentIdx] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    const [timeLeft, setTimeLeft] = React.useState(TIME_LIMIT);
    const [showResult, setShowResult] = React.useState(false);
    const [showSessionSummary, setShowSessionSummary] = React.useState(false);
    const [sessionStartTime] = React.useState(Date.now());
    const [config, setConfig] = React.useState({
        includeArticles: true,
        includeVerbs: true,
        includePreps: true,
        level: 'B1',
        timeLimit: '45min',
        enableAI: true,
        autoAdvance: true,
        soundEffects: true,
        focusSprint: false
    });
    const [aiLoading, setAiLoading] = React.useState(false);
    const [aiExplanation, setAiExplanation] = React.useState(null);
    const [aiRequestIdx, setAiRequestIdx] = React.useState(null);
    const timerRef = React.useRef(null);
    const [progressMap, setProgressMap] = React.useState(function() { return M.getAdvancedProgress(); });
    const [combo, setCombo] = React.useState(0);
    const [bestCombo, setBestCombo] = React.useState(function() {
        return parseInt(localStorage.getItem('muller_telc_combo') || '0');
    });
    const [difficultyRatings, setDifficultyRatings] = React.useState([]);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [showBookmarks, setShowBookmarks] = React.useState(false);
    const [bookmarks, setBookmarks] = React.useState(function() {
        try { return JSON.parse(localStorage.getItem('muller_telc_bookmarks') || '[]'); }
        catch(e) { return []; }
    });
    const autoAdvanceTimerRef = React.useRef(null);
    const [mastered, setMastered] = React.useState(function() {
        try { return JSON.parse(localStorage.getItem('muller_telc_mastered') || '[]'); }
        catch(e) { return []; }
    });
    const [focusSprint, setFocusSprint] = React.useState(null);
    const [sprintTimeLeft, setSprintTimeLeft] = React.useState(0);
    const sprintTimerRef = React.useRef(null);

    // ─── Sprint timer ───
    React.useEffect(function() {
        if (focusSprint && sprintTimeLeft > 0) {
            sprintTimerRef.current = setTimeout(function() {
                setSprintTimeLeft(function(p) { return p - 1; });
            }, 1000);
        } else if (focusSprint && sprintTimeLeft <= 0) {
            setFocusSprint('end');
            var totalSession = answers.filter(function(a) { return a !== null; }).length;
            var correctSession = answers.filter(function(a) { return a && a.isCorrect; }).length;
            if (totalSession > 0) {
                M.registerDailyAttempt();
                var pct = Math.round((correctSession / totalSession) * 100);
                if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(pct >= 60);
                alert('⏰ ¡Sprint completado!\n' + totalSession + ' tarjetas · ' + correctSession + ' aciertos (' + pct + '%)');
            }
            setFocusSprint(null);
        }
        return function() { if (sprintTimerRef.current) clearTimeout(sprintTimerRef.current); };
    }, [focusSprint, sprintTimeLeft]);

    // ─── Generar examen ───
    var generateExam = function() {
        var selectedTypes = [];
        if (config.includeArticles) selectedTypes.push('articulos');
        if (config.includeVerbs) selectedTypes.push('verbos');
        if (config.includePreps) selectedTypes.push('preposiciones');
        var cardsPerType = Math.floor(TOTAL_CARDS / selectedTypes.length);
        var remainder = TOTAL_CARDS - (cardsPerType * selectedTypes.length);

        var allCards = [];

        selectedTypes.forEach(function(type) {
            var data = [];
            switch (type) {
                case 'articulos':
                    var allArt = M.getDefaultArticlesData ? M.getDefaultArticlesData() : [];
                    if (config.level !== 'MIXTO') {
                        data = allArt.filter(function(d) { return d.levels && d.levels.includes(config.level); });
                    } else {
                        data = allArt;
                    }
                    break;
                case 'verbos':
                    data = M.getDefaultVerbPrepData ? M.getDefaultVerbPrepData() : [];
                    break;
                case 'preposiciones':
                    data = M.getDefaultPrepData ? M.getDefaultPrepData() : [];
                    break;
            }

            // Filtrar dominadas
            data = data.filter(function(item) {
                var masterKey = type + '::' + (item.de || '') + '::' + (item.answer || item.de.split(' ')[0] || '');
                return mastered.indexOf(masterKey) === -1;
            });

            // Barajar y tomar las que corresponden
            var shuffled = M.shuffleArray ? M.shuffleArray([...data]) : data.sort(function() { return Math.random() - 0.5; });
            var count = cardsPerType;
            if (remainder > 0 && selectedTypes.indexOf(type) === 0) {
                count += remainder;
            }
            var selected = shuffled.slice(0, Math.min(count, shuffled.length));

            selected.forEach(function(item) {
                allCards.push({ ...item, _type: type });
            });
        });

        // Barajar todo
        var finalCards = M.shuffleArray ? M.shuffleArray(allCards) : allCards.sort(function() { return Math.random() - 0.5; });
        setCards(finalCards);
        setAnswers(Array(finalCards.length).fill(null));
        setCurrentIdx(0);
        var timeSec = config.timeLimit === '30min' ? 1800 : config.timeLimit === '60min' ? 3600 : config.timeLimit === 'sin limite' ? 999999 : TIME_LIMIT;
        setTimeLeft(timeSec);
        setShowResult(false);
        setCombo(0);
        setDifficultyRatings([]);
        setFocusSprint(null);
        setPhase('running');
    };

    // ─── Temporizador ───
    React.useEffect(function() {
        if (phase === 'running' && timeLeft > 0 && config.timeLimit !== 'sin limite') {
            timerRef.current = setInterval(function() {
                setTimeLeft(function(prev) {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        endExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return function() {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [phase]);

    // ─── Cleanup auto-advance ───
    React.useEffect(function() {
        return function() {
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
            if (sprintTimerRef.current) clearTimeout(sprintTimerRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    var endExam = function() {
        if (timerRef.current) clearInterval(timerRef.current);
        setShowResult(true);
        setPhase('review');
        // Guardar progreso
        answers.forEach(function(ans, idx) {
            if (ans !== null && cards[idx]) {
                var correct = ans.isCorrect;
                var id = cards[idx]._type + '::' + (cards[idx].de || '') + '::' + (cards[idx].answer || cards[idx].de.split(' ')[0]);
                var prev = progressMap[id] || { attempts: 0, correct: 0, errors: 0 };
                var next = {
                    attempts: prev.attempts + 1,
                    correct: prev.correct + (correct ? 1 : 0),
                    errors: prev.errors + (correct ? 0 : 1),
                    lastSeenAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                progressMap[id] = next;
            }
        });
        M.saveAdvancedProgress(progressMap);
    };

    var submitAnswer = function(guess) {
        if (showResult || currentIdx >= cards.length || answers[currentIdx]) return;
        var current = cards[currentIdx];
        var correctAnswer = current._type === 'articulos'
            ? current.de.split(' ')[0].toLowerCase()
            : (current.answer || '');

        var isCorrect = guess === correctAnswer;

        // Voz
        window.speechSynthesis.cancel();
        var text = current._type === 'articulos' ? current.de : current.de.replace('___', correctAnswer);
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        if (window.__mullerApplyPreferredDeVoice) window.__mullerApplyPreferredDeVoice(utterance);
        window.speechSynthesis.speak(utterance);

        var newAnswers = [...answers];
        newAnswers[currentIdx] = {
            guess: guess,
            correct: correctAnswer,
            isCorrect: isCorrect,
            card: current,
            tip: M.getCardTip(current._type === 'articulos' ? 'articulos' : current._type, current)
        };
        setAnswers(newAnswers);

        // Combo
        if (isCorrect) {
            var newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > bestCombo) {
                setBestCombo(newCombo);
                localStorage.setItem('muller_telc_combo', String(newCombo));
            }
        } else {
            setCombo(0);
        }

        M.registerDailyAttempt();
        if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(isCorrect);

        // Pedir explicación AI si es incorrecto
        if (!isCorrect && M.DeepSeek && M.DeepSeek.hasApiKey() && config.enableAI) {
            askAiExamExplanation(current, guess, correctAnswer, currentIdx);
        }

        // Auto-advance si correcto
        if (isCorrect && config.autoAdvance) {
            autoAdvanceTimerRef.current = setTimeout(function() {
                if (currentIdx < cards.length - 1) {
                    setCurrentIdx(function(prev) { return prev + 1; });
                    setAiExplanation(null);
                    setAiRequestIdx(null);
                    setSelectedAnswer(null);
                } else {
                    endExam();
                }
            }, 1200);
        }
    };

    var askAiExamExplanation = function(current, userGuess, correctAnswer, idx) {
        setAiLoading(true);
        setAiRequestIdx(idx);
        var question = current._type === 'articulos'
            ? '¿Cuál es el artículo correcto para "' + current.de.split(' ').slice(1).join(' ') + '"?'
            : '¿Cuál es la respuesta correcta para "' + (current.de || '') + '"?';
        M.DeepSeek.explainError(
            question,
            userGuess,
            correctAnswer,
            'Significado: ' + (current.es || '')
        ).then(function(result) {
            setAiExplanation(result);
            setAiLoading(false);
        }).catch(function() {
            setAiLoading(false);
        });
    };

    // ─── AI Example automático tras acierto ───
    var askAiForExampleAuto = function() {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey() || !config.enableAI) return;
        if (cards.length === 0 || currentIdx >= cards.length) return;
        var current = cards[currentIdx];
        var word = current._type === 'articulos'
            ? current.de
            : current.de.replace('___', current.answer || '');
        M.DeepSeek.generateRelatedExercise(word + ' (' + (current.es || '') + ')', config.level)
            .then(function(result) {
                if (result) {
                    M.showNotification && M.showNotification('📝 AI: ' + result, 'info', 3000);
                }
            }).catch(function() {});
    };

    var goNext = function() {
        if (currentIdx < cards.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setAiExplanation(null);
            setAiRequestIdx(null);
            setSelectedAnswer(null);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        } else {
            endExam();
        }
    };

    var goPrev = function() {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
            setAiExplanation(null);
            setAiRequestIdx(null);
            setSelectedAnswer(null);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        }
    };

    // ─── Dificultad ───
    var registerTrainingResult = function(difficulty) {
        if (!answers[currentIdx] || cards.length === 0) return;
        M.registerDailyAttempt();
        var ans = answers[currentIdx];
        var current = cards[currentIdx];
        var id = current._type + '::' + (current.de || '') + '::' + (current.answer || current.de.split(' ')[0]);
        var prev = progressMap[id] || { attempts: 0, correct: 0, errors: 0, easy: 0, normal: 0, difficult: 0 };
        var next = {
            attempts: prev.attempts + 1,
            correct: prev.correct + (ans.isCorrect ? 1 : 0),
            errors: prev.errors + (ans.isCorrect ? 0 : 1),
            easy: prev.easy + (difficulty === 'easy' ? 1 : 0),
            normal: prev.normal + (difficulty === 'normal' ? 1 : 0),
            difficult: prev.difficult + (difficulty === 'difficult' ? 1 : 0),
            consecutiveErrors: ans.isCorrect ? 0 : (prev.consecutiveErrors || 0) + 1,
            consecutiveCorrect: ans.isCorrect ? (prev.consecutiveCorrect || 0) + 1 : 0,
            lastSeenAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        var merged = { ...progressMap };
        merged[id] = next;
        setProgressMap(merged);
        M.saveAdvancedProgress(merged);
        setDifficultyRatings(function(p) { return p.concat({ idx: currentIdx, difficulty: difficulty }); });
        goNext();
    };

    // ─── Bookmark ───
    var toggleBookmark = function() {
        if (cards.length === 0) return;
        var current = cards[currentIdx];
        var wordKey = current._type + '::' + (current.de || '') + '::' + (current.answer || current.de.split(' ')[0]);
        var exists = bookmarks.indexOf(wordKey) !== -1;
        var newBm = exists ? bookmarks.filter(function(b) { return b !== wordKey; }) : bookmarks.concat([wordKey]);
        setBookmarks(newBm);
        localStorage.setItem('muller_telc_bookmarks', JSON.stringify(newBm));
    };

    var isBookmarked = function() {
        if (cards.length === 0 || !cards[currentIdx]) return false;
        var current = cards[currentIdx];
        var wordKey = current._type + '::' + (current.de || '') + '::' + (current.answer || current.de.split(' ')[0]);
        return bookmarks.indexOf(wordKey) !== -1;
    };

    // ─── Mastered ───
    var handleMastered = function() {
        if (cards.length === 0 || !cards[currentIdx]) return;
        var current = cards[currentIdx];
        var masterKey = current._type + '::' + (current.de || '') + '::' + (current.answer || current.de.split(' ')[0]);
        var newMastered = mastered.concat([masterKey]);
        setMastered(newMastered);
        localStorage.setItem('muller_telc_mastered', JSON.stringify(newMastered));
        setCombo(0);
        goNext();
    };

    // ─── Focus Sprint ───
    var startSprint = function() {
        if (cards.length === 0) return;
        setFocusSprint('active');
        setSprintTimeLeft(120);
    };

    // ─── Formatear tiempo ───
    var formatTime = function(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
    };

    var calculateScore = function() {
        var correct = answers.filter(function(a) { return a && a.isCorrect; }).length;
        var total = answers.filter(function(a) { return a !== null; }).length;
        return { correct: correct, total: total, answered: total, skipped: cards.length - total };
    };

    // ─── Session Summary Stats ───
    var getSessionStats = function() {
        var answered = answers.filter(function(a) { return a !== null; });
        var correct = answered.filter(function(a) { return a.isCorrect; }).length;
        var total = answered.length;
        var pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        var duration = Math.round((Date.now() - sessionStartTime) / 60000);
        return { total: total, correct: correct, pct: pct, duration: duration, skipped: cards.length - total };
    };

    // ─── Estilos ───
    var styles = {
        container: { maxWidth: 720, margin: '0 auto', padding: '12px 16px' },
        card: {
            background: '#1e293b', borderRadius: 16, padding: 24,
            border: '2px solid rgba(245, 158, 11, 0.3)',
            boxShadow: focusSprint === 'active' ? '0 0 40px rgba(239, 68, 68, 0.15)' : '0 0 40px rgba(245, 158, 11, 0.05)',
            textAlign: 'center'
        },
        wordDisplay: {
            fontSize: '2.6rem', fontWeight: 900, color: '#e2e8f0',
            margin: '16px 0', letterSpacing: '0.02em'
        },
        optionBtn: {
            padding: '10px 16px', borderRadius: 10, fontWeight: 600,
            fontSize: '0.85rem', border: '1px solid #475569',
            background: '#0f172a', color: '#e2e8f0', cursor: 'pointer',
            transition: 'all 0.2s', minWidth: 70
        },
        configCard: {
            background: '#1e293b', borderRadius: 16, padding: 24,
            border: '1px solid #334155',
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.08)'
        },
        configLabel: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', background: '#0f172a', borderRadius: 10,
            marginBottom: 8, cursor: 'pointer'
        },
        comboBox: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 10, padding: '6px 14px',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontWeight: 700, color: 'white', fontSize: '0.85rem',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
            animation: combo >= 5 ? 'comboGlow 0.5s ease infinite alternate' : 'none'
        },
        btnEasy: { background: '#065f46', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnNormal: { background: '#854d0e', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnDifficult: { background: '#7f1d1d', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        aiBox: {
            background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', borderRadius: 12, padding: 12,
            border: '1px solid rgba(6, 182, 212, 0.3)',
            textAlign: 'left', marginBottom: 10
        },
        tipBox: {
            background: '#0f172a', borderRadius: 10, padding: 12,
            border: '1px solid rgba(251, 191, 36, 0.2)',
            textAlign: 'left', marginBottom: 10,
            fontSize: '0.82rem', color: '#e2e8f0'
        },
        masteryBadge: {
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: '#0f172a', padding: '4px 10px', borderRadius: 6,
            fontSize: '0.72rem', color: '#94a3b8', border: '1px solid #1e293b'
        }
    };

    // ═══════════════════════════════════════════════
    // FASE CONFIG
    // ═══════════════════════════════════════════════
    if (phase === 'config') {
        return React.createElement('div', { style: styles.container },
            React.createElement('button', {
                onClick: onBack,
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: 14 }
            }, '← Volver'),

            React.createElement('div', { style: styles.configCard },
                // Header
                React.createElement('div', { style: { textAlign: 'center', marginBottom: 20 } },
                    React.createElement('div', { style: { fontSize: 44 } }, '🎯'),
                    React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24' } }, 'Examen Mixto TELC'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#64748b', marginTop: 4 } },
                        '45 tarjetas · Artículos + Verbos + Preposiciones'
                    )
                ),

                // ─── Selección de tipos ───
                React.createElement('div', { style: { marginBottom: 20 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 10 } }, '📋 Tipos de ejercicio'),
                    ['includeArticles','includeVerbs','includePreps'].map(function(key) {
                        var labels = { includeArticles: '📖 Artículos (DER/DIE/DAS)', includeVerbs: '🔗 Verbos + Preposición', includePreps: '📍 Preposiciones + Caso' };
                        var descs = { includeArticles: 'Determinar el artículo correcto del sustantivo', includeVerbs: 'Elegir la preposición correcta para el verbo', includePreps: 'Seleccionar la preposición adecuada' };
                        return React.createElement('div', {
                            key: key,
                            onClick: function() { setConfig(function(p) { return { ...p, [key]: !p[key] }; }); },
                            style: Object.assign({}, styles.configLabel, {
                                border: '1px solid ' + (config[key] ? '#fbbf24' : '#334155'),
                                opacity: config[key] ? 1 : 0.6
                            })
                        },
                            React.createElement('div', null,
                                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' } }, labels[key]),
                                React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, descs[key])
                            ),
                            React.createElement('div', {
                                style: {
                                    width: 22, height: 22, borderRadius: 6,
                                    background: config[key] ? '#fbbf24' : '#334155',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: config[key] ? '#0f172a' : '#64748b',
                                    fontWeight: 700, fontSize: '0.8rem'
                                }
                            }, config[key] ? '✓' : '')
                        );
                    })
                ),

                // ─── Nivel ───
                React.createElement('div', { style: { marginBottom: 20 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 10 } }, '📊 Nivel'),
                    React.createElement('div', { style: { display: 'flex', gap: 6 } },
                        ['A1','A2','B1','B2','C1','MIXTO'].map(function(lvl) {
                            var colorMap = { A1: '#10b981', A2: '#06b6d4', B1: '#8b5cf6', B2: '#f59e0b', C1: '#f87171', MIXTO: '#ec4899' };
                            return React.createElement('button', {
                                key: lvl,
                                onClick: function() { setConfig(function(p) { return { ...p, level: lvl }; }); },
                                style: Object.assign({}, styles.optionBtn, {
                                    flex: 1, textAlign: 'center',
                                    background: config.level === lvl ? colorMap[lvl] : '#0f172a',
                                    color: config.level === lvl ? 'white' : '#94a3b8',
                                    borderColor: config.level === lvl ? colorMap[lvl] : '#334155',
                                    fontWeight: config.level === lvl ? 700 : 500
                                })
                            }, lvl);
                        })
                    )
                ),

                // ─── Tiempo ───
                React.createElement('div', { style: { marginBottom: 20 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 10 } }, '⏱️ Tiempo límite'),
                    React.createElement('div', { style: { display: 'flex', gap: 6 } },
                        ['30min','45min','60min','sin limite'].map(function(t) {
                            var active = config.timeLimit === t;
                            return React.createElement('button', {
                                key: t,
                                onClick: function() { setConfig(function(p) { return { ...p, timeLimit: t }; }); },
                                style: Object.assign({}, styles.optionBtn, {
                                    flex: 1, textAlign: 'center',
                                    background: active ? '#f59e0b' : '#0f172a',
                                    color: active ? 'white' : '#94a3b8',
                                    borderColor: active ? '#f59e0b' : '#334155'
                                })
                            }, t === 'sin limite' ? '♾️ Sin límite' : '🕐 ' + t);
                        })
                    )
                ),

                // ─── Opciones premium ───
                React.createElement('div', { style: { marginBottom: 20 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 10 } }, '⚙️ Opciones premium'),
                    ['autoAdvance', 'soundEffects', 'focusSprint'].map(function(key) {
                        var labels = { autoAdvance: '⚡ Auto-avance al acertar', soundEffects: '🔊 Efectos de sonido', focusSprint: '⏰ Modo Sprint (120s)' };
                        var descs = { autoAdvance: 'Avanza automáticamente tras 1.2s si aciertas', soundEffects: 'Sonidos de acierto/error (si está disponible)', focusSprint: 'Activa el modo contrarreloj de 2 minutos' };
                        return React.createElement('div', {
                            key: key,
                            onClick: function() { setConfig(function(p) { return { ...p, [key]: !p[key] }; }); },
                            style: Object.assign({}, styles.configLabel, {
                                border: '1px solid ' + (config[key] ? '#10b981' : '#334155'),
                                marginBottom: 6
                            })
                        },
                            React.createElement('div', null,
                                React.createElement('div', { style: { fontWeight: 500, fontSize: '0.82rem', color: '#e2e8f0' } }, labels[key]),
                                React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, descs[key])
                            ),
                            React.createElement('div', {
                                style: {
                                    width: 22, height: 22, borderRadius: 6,
                                    background: config[key] ? '#10b981' : '#334155',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: config[key] ? '#0f172a' : '#64748b',
                                    fontWeight: 700, fontSize: '0.8rem'
                                }
                            }, config[key] ? '✓' : '')
                        );
                    })
                ),

                // ─── AI ───
                M.DeepSeek && M.DeepSeek.hasApiKey() && React.createElement('div', {
                    onClick: function() { setConfig(function(p) { return { ...p, enableAI: !p.enableAI }; }); },
                    style: Object.assign({}, styles.configLabel, {
                        border: '1px solid ' + (config.enableAI ? '#06b6d4' : '#334155'),
                        marginBottom: 20
                    })
                },
                    React.createElement('div', null,
                        React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 } },
                            React.createElement('span', null, '🤖'),
                            React.createElement('span', null, 'Explicaciones AI (DeepSeek)'),
                            React.createElement('span', { style: { background: '#065f46', color: '#10b981', fontSize: '0.65rem', padding: '2px 6px', borderRadius: 4, fontWeight: 600 } }, 'PREMIUM')
                        ),
                        React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'DeepSeek explicará errores + frases de ejemplo automáticas')
                    ),
                    React.createElement('div', {
                        style: {
                            width: 22, height: 22, borderRadius: 6,
                            background: config.enableAI ? '#06b6d4' : '#334155',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: config.enableAI ? '#0f172a' : '#64748b',
                            fontWeight: 700, fontSize: '0.8rem'
                        }
                    }, config.enableAI ? '✓' : '')
                ),

                // ─── Botón empezar ───
                React.createElement('button', {
                    onClick: generateExam,
                    style: {
                        width: '100%',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white', border: 'none', borderRadius: 14,
                        padding: '16px 0', fontWeight: 700, fontSize: '1.1rem',
                        cursor: 'pointer', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                        transition: 'all 0.2s'
                    },
                    onMouseEnter: function(e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.4)'; },
                    onMouseLeave: function(e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.3)'; }
                }, '🎯 ¡Comenzar examen! (' + config.focusSprint ? '⚡ Sprint)' : '45 tarjetas)')
            )
        );
    }

    // ═══════════════════════════════════════════════
    // FASE REVIEW – RESULTADOS + SESSION SUMMARY
    // ═══════════════════════════════════════════════
    if (phase === 'review') {
        // Session Summary view
        if (showSessionSummary) {
            var s = getSessionStats();
            var gradeEmoji = s.pct >= 90 ? '🏆' : s.pct >= 75 ? '🌟' : s.pct >= 60 ? '👍' : s.pct >= 40 ? '📚' : '💪';
            var gradeText = s.pct >= 90 ? 'Excelente!' : s.pct >= 75 ? 'Muy bien!' : s.pct >= 60 ? 'Bien' : s.pct >= 40 ? 'A mejorar' : 'Sigue estudiando';
            return React.createElement('div', { style: styles.container },
                React.createElement('div', { style: Object.assign({}, styles.card, { padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 56, marginBottom: 12 } }, gradeEmoji),
                    React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, color: '#fbbf24', marginBottom: 4 } }, gradeText),
                    React.createElement('div', { style: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: 20 } },
                        'Sesión de ' + s.duration + ' min'
                    ),
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 } },
                        React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                            React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#fbbf24' } }, s.total),
                            React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Respondidas')
                        ),
                        React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                            React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#10b981' } }, s.correct),
                            React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Aciertos')
                        ),
                        React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                            React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#06b6d4' } }, s.pct + '%'),
                            React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Precisión')
                        )
                    ),
                    React.createElement('div', { style: { background: '#1e293b', borderRadius: 10, height: 10, marginBottom: 20, overflow: 'hidden' } },
                        React.createElement('div', { style: { background: 'linear-gradient(90deg, #f59e0b, #10b981)', height: '100%', borderRadius: 10, width: s.pct + '%', transition: 'width 0.5s' } })
                    ),
                    React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 20 } },
                        '🔥 Mejor racha: ' + bestCombo + ' seguidos' + (s.skipped > 0 ? ' · ⏭️ ' + s.skipped + ' sin responder' : '')
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: 10 } },
                        React.createElement('button', {
                            onClick: function() { setShowSessionSummary(false); setPhase('config'); },
                            style: { flex: 1, background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }
                        }, '🔄 Repetir'),
                        React.createElement('button', {
                            onClick: onBack,
                            style: { flex: 1, background: '#f59e0b', color: 'white', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }
                        }, '🏠 Volver')
                    )
                )
            );
        }

        var score = calculateScore();
        var percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
        var grade = percentage >= 90 ? '🏆 Excelente!' :
            percentage >= 75 ? '🌟 Muy bien!' :
            percentage >= 60 ? '👍 Bien' :
            percentage >= 40 ? '📚 A mejorar' : '💪 Sigue estudiando';

        return React.createElement('div', { style: styles.container },
            React.createElement('div', { style: Object.assign({}, styles.card, { padding: 32 }) },
                // Resultado principal
                React.createElement('div', { style: { fontSize: 64, marginBottom: 12 } }, '📊'),
                React.createElement('div', { style: { fontSize: '1.8rem', fontWeight: 700, color: '#fbbf24', marginBottom: 4 } }, grade),
                React.createElement('div', { style: { fontSize: '1rem', color: '#94a3b8', marginBottom: 24 } }, 'Examen completado'),

                // Estadísticas
                React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 } },
                    React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, color: '#10b981' } }, score.correct),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, 'Aciertos')
                    ),
                    React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, color: '#f87171' } }, score.total - score.correct),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, 'Errores')
                    ),
                    React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                        React.createElement('div', { style: { fontSize: '1.6rem', fontWeight: 700, color: score.skipped > 0 ? '#f59e0b' : '#06b6d4' } },
                            score.skipped > 0 ? score.skipped : (score.total > 0 ? '✓' : '—')
                        ),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, score.skipped > 0 ? 'Sin responder' : 'Completado')
                    )
                ),

                // Barra de progreso + combo
                React.createElement('div', { style: { marginBottom: 20 } },
                    React.createElement('div', { style: { background: '#0f172a', borderRadius: 10, padding: 4, marginBottom: 8 } },
                        React.createElement('div', {
                            style: {
                                width: percentage + '%', height: 8, borderRadius: 6,
                                background: percentage >= 75 ? '#10b981' :
                                    percentage >= 50 ? '#f59e0b' : '#ef4444',
                                transition: 'width 1s ease'
                            }
                        })
                    ),
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' } },
                        React.createElement('span', null, percentage + '% de aciertos'),
                        React.createElement('span', null, '⏱️ ' + formatTime(timeLeft < 999999 ? (TIME_LIMIT - timeLeft) : 0) + ' usado')
                    ),
                    bestCombo > 0 && React.createElement('div', { style: { textAlign: 'center', marginTop: 8, color: '#fbbf24', fontWeight: 600, fontSize: '0.85rem' } },
                        '🔥 Mejor racha: ' + bestCombo + ' seguidos'
                    )
                ),

                // Revisión de cada pregunta
                React.createElement('div', { style: { maxHeight: 300, overflowY: 'auto', marginBottom: 20, padding: 4 } },
                    answers.map(function(ans, idx) {
                        if (!ans || !ans.card) return null;
                        var isCorrect = ans.isCorrect;
                        var word = ans.card._type === 'articulos'
                            ? ans.card.de
                            : (ans.card.de || '').replace('___', ans.correct);
                        return React.createElement('div', {
                            key: idx,
                            style: {
                                padding: '10px 14px', borderRadius: 10, marginBottom: 6,
                                background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid ' + (isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'),
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }
                        },
                            React.createElement('div', null,
                                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' } }, word),
                                React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, '#' + (idx + 1) + ' · ' + ans.card._type)
                            ),
                            React.createElement('span', {
                                style: {
                                    fontSize: '0.7rem', color: isCorrect ? '#10b981' : '#f87171',
                                    background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    padding: '2px 8px', borderRadius: 4
                                }
                            }, isCorrect ? '✓ Correcto' : '✗ ' + ans.guess + ' → ' + ans.correct)
                        );
                    })
                ),

                // Botones de acción
                React.createElement('div', { style: { display: 'flex', gap: 10 } },
                    React.createElement('button', {
                        onClick: function() { setPhase('config'); },
                        style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', flex: 1 }
                    }, '🔄 Repetir configuración'),
                    React.createElement('button', {
                        onClick: function() { setShowSessionSummary(true); },
                        style: { background: '#06b6d4', color: 'white', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', flex: 1 }
                    }, '📊 Resumen completo'),
                    React.createElement('button', {
                        onClick: onBack,
                        style: { background: '#f59e0b', color: 'white', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', flex: 1 }
                    }, '🏠 Volver')
                )
            )
        );
    }

    // ═══════════════════════════════════════════════
    // BOOKMARKS VIEW
    // ═══════════════════════════════════════════════
    if (phase === 'bookmarks-view') {
        var bmItems = [];
        try {
            var allArt = M.getDefaultArticlesData ? M.getDefaultArticlesData() : [];
            var allVerb = M.getDefaultVerbPrepData ? M.getDefaultVerbPrepData() : [];
            var allPrep = M.getDefaultPrepData ? M.getDefaultPrepData() : [];
            var allData = allArt.map(function(d) { return { ...d, _type: 'articulos' }; })
                .concat(allVerb.map(function(d) { return { ...d, _type: 'verbos' }; }))
                .concat(allPrep.map(function(d) { return { ...d, _type: 'preposiciones' }; }));
            bmItems = allData.filter(function(d) {
                var key = d._type + '::' + (d.de || '') + '::' + (d.answer || d.de.split(' ')[0]);
                return bookmarks.indexOf(key) !== -1;
            });
        } catch(e) {}

        return React.createElement('div', { style: styles.container },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
                React.createElement('button', {
                    onClick: function() { setPhase('config'); },
                    style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
                }, '← Volver'),
                React.createElement('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0' } }, '🔖 Guardados (' + bookmarks.length + ')')
            ),
            bmItems.length === 0 && React.createElement('div', { style: { textAlign: 'center', padding: 40, color: '#64748b' } },
                React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '🔖'),
                React.createElement('p', null, 'No tienes elementos guardados aún.'),
                React.createElement('p', { style: { fontSize: '0.8rem' } }, 'Haz clic en ⭐ durante el examen para guardar.')
            ),
            bmItems.length > 0 && React.createElement('div', { style: { display: 'grid', gap: 8 } },
                bmItems.map(function(card, idx) {
                    var typeIcon = { articulos: '📖', verbos: '🔗', preposiciones: '📍' };
                    return React.createElement('div', {
                        key: idx,
                        style: { background: '#1e293b', borderRadius: 10, padding: 12, border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    },
                        React.createElement('div', null,
                            React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' } },
                                (typeIcon[card._type] || '📝') + ' ' + (card.de || '') + ' → ' + (card.answer || card.de.split(' ')[0])
                            ),
                            React.createElement('div', { style: { color: '#64748b', fontSize: '0.75rem' } }, (card.es || '') + ' · ' + card._type)
                        ),
                        React.createElement('button', {
                            onClick: function() {
                                var key = card._type + '::' + (card.de || '') + '::' + (card.answer || card.de.split(' ')[0]);
                                var newBm = bookmarks.filter(function(b) { return b !== key; });
                                setBookmarks(newBm);
                                localStorage.setItem('muller_telc_bookmarks', JSON.stringify(newBm));
                            },
                            style: { background: 'transparent', border: '1px solid #334155', borderRadius: 8, color: '#ef4444', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem' }
                        }, 'Eliminar')
                    );
                })
            )
        );
    }

    // ═══════════════════════════════════════════════
    // FASE RUNNING – Cargando
    // ═══════════════════════════════════════════════
    if (phase === 'running' && cards.length === 0) {
        return React.createElement('div', { style: Object.assign({}, styles.container, { paddingTop: 40, textAlign: 'center' }) },
            React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '🔄'),
            React.createElement('div', { style: { color: '#e2e8f0', fontSize: '1rem' } }, 'Generando examen...'),
            React.createElement('button', {
                onClick: function() { setPhase('config'); },
                style: { marginTop: 16, background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem' }
            }, '← Volver')
        );
    }

    // ─── Tiempo agotado ───
    if (phase === 'running' && currentIdx >= cards.length) {
        return React.createElement('div', { style: Object.assign({}, styles.container, { paddingTop: 40, textAlign: 'center' }) },
            React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '⏰'),
            React.createElement('div', { style: { color: '#e2e8f0', fontSize: '1rem', marginBottom: 16 } }, '¡Tiempo completado!'),
            React.createElement('button', {
                onClick: endExam,
                style: { background: '#06b6d4', color: 'white', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
            }, 'Ver resultados')
        );
    }

    // ═══════════════════════════════════════════════
    // TARJETA ACTUAL DEL EXAMEN
    // ═══════════════════════════════════════════════
    var currentCard = cards[currentIdx];
    var currentAnswer = answers[currentIdx];

    var getOptions = function() {
        if (currentCard._type === 'articulos') return ['der', 'die', 'das'];
        if (currentCard._type === 'verbos') return ['für', 'auf', 'an', 'von', 'über', 'mit', 'um', 'zu', 'vor', 'nach', 'in', 'bei', 'aus', 'durch', 'ohne', 'gegen'];
        return ['an', 'auf', 'in', 'aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'durch', 'für', 'um', 'vor', 'über', 'unter', 'neben', 'zwischen', 'hinter', 'gegen', 'ohne'];
    };

    var options = getOptions();
    var typeEmoji = { articulos: '📖', verbos: '🔗', preposiciones: '📍' };
    var typeLabels = { articulos: 'Artículo', verbos: 'Verbo+Prep', preposiciones: 'Preposición' };

    // Estadísticas de maestría para esta tarjeta
    var cardId = currentCard ? (currentCard._type + '::' + (currentCard.de || '') + '::' + (currentCard.answer || currentCard.de.split(' ')[0])) : '';
    var cardStats = progressMap[cardId] || {};
    var masteryLevel = M.calcMasteryLevel ? M.calcMasteryLevel(cardStats) : 0;
    var masteryEmoji = M.getMasteryEmoji ? M.getMasteryEmoji(masteryLevel) : '';
    var masteryLabel = M.getMasteryLabel ? M.getMasteryLabel(masteryLevel) : '';

    var isSprintActive = focusSprint === 'active';

    return React.createElement('div', { style: Object.assign({}, styles.container, { position: 'relative' }) },
        // ─── Header del examen ───
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('button', {
                onClick: function() { if (confirm('¿Abandonar el examen? Se perderá el progreso.')) setPhase('config'); },
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
            }, '← Salir'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { style: { fontSize: '0.75rem', color: timeLeft < 300 && config.timeLimit !== 'sin limite' ? '#f87171' : '#94a3b8', fontWeight: timeLeft < 300 && config.timeLimit !== 'sin limite' ? 700 : 400 } },
                    '⏱️ ' + formatTime(timeLeft)
                ),
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 } },
                    (currentIdx + 1) + '/' + cards.length
                )
            )
        ),

        // ─── Sprint indicator ───
        isSprintActive && React.createElement('div', { style: {
            textAlign: 'center', marginBottom: 8,
            background: 'rgba(239, 68, 68, 0.1)', borderRadius: 8, padding: '6px 14px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
        } },
            React.createElement('span', { style: { color: '#fca5a5', fontWeight: 600, fontSize: '0.85rem' } },
                '⏰ SPRINT: ' + Math.floor(sprintTimeLeft / 60) + ':' + (sprintTimeLeft % 60).toString().padStart(2, '0')
            )
        ),

        // ─── Progreso ───
        React.createElement('div', { style: { background: '#0f172a', borderRadius: 8, padding: 2, marginBottom: 12 } },
            React.createElement('div', {
                style: {
                    width: ((currentIdx + 1) / cards.length) * 100 + '%',
                    height: 4, borderRadius: 6,
                    background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                    transition: 'width 0.3s ease'
                }
            })
        ),

        // ─── Maestría + Combo + Bookmark ───
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' } },
            // Maestría
            masteryLevel > 0 && React.createElement('span', { style: styles.masteryBadge },
                React.createElement('span', null, masteryEmoji),
                React.createElement('span', null, masteryLabel + ' (nivel ' + masteryLevel + '/5)'),
                cardStats.attempts > 0 && React.createElement('span', { style: { color: '#64748b', marginLeft: 2 } },
                    '· ' + cardStats.correct + '/' + cardStats.attempts
                )
            ),

            // Combo
            combo >= 3 && React.createElement('div', { style: styles.comboBox, key: combo },
                React.createElement('span', { style: { fontSize: 16 } }, combo >= 10 ? '🔥🔥' : '🔥'),
                React.createElement('span', null, combo + ' seguidos' + (combo >= 10 ? ' 🚀' : ''))
            ),

            // Bookmark
            React.createElement('button', {
                onClick: toggleBookmark,
                style: {
                    background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18,
                    filter: isBookmarked() ? 'none' : 'grayscale(1)',
                    opacity: isBookmarked() ? 1 : 0.5,
                    transition: 'all 0.2s'
                },
                title: isBookmarked() ? 'Quitar marcador' : 'Guardar'
            }, '⭐'),

            // Bookmarks count
            bookmarks.length > 0 && React.createElement('button', {
                onClick: function() { setPhase('bookmarks-view'); },
                style: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fbbf24', padding: '4px 10px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600 }
            }, '🔖 ' + bookmarks.length)
        ),

        // ─── Tarjeta ───
        React.createElement('div', { style: Object.assign({}, styles.card, isSprintActive ? { borderColor: 'rgba(239, 68, 68, 0.5)' } : {}), key: currentIdx },
            // Tipo
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 } },
                React.createElement('span', {
                    style: {
                        fontSize: '0.72rem', padding: '4px 12px', borderRadius: 6,
                        background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24',
                        fontWeight: 600
                    }
                }, (typeEmoji[currentCard._type] || '📝') + ' ' + (typeLabels[currentCard._type] || '')),
                currentCard.prepCase && React.createElement('span', {
                    style: {
                        fontSize: '0.72rem', padding: '4px 12px', borderRadius: 6,
                        background: currentCard.prepCase === 'Akkusativ' ? 'rgba(239, 68, 68, 0.15)' :
                            currentCard.prepCase === 'Dativ' ? 'rgba(59, 130, 246, 0.15)' :
                            'rgba(234, 179, 8, 0.15)',
                        color: currentCard.prepCase === 'Akkusativ' ? '#fca5a5' :
                            currentCard.prepCase === 'Dativ' ? '#93c5fd' : '#fde68a',
                        fontWeight: 600
                    }
                }, currentCard.prepCase)
            ),

            // Palabra
            React.createElement('div', { style: styles.wordDisplay },
                currentCard._type === 'articulos'
                    ? currentCard.de.split(' ').slice(1).join(' ')
                    : currentCard.de.split('___').map(function(part, i, arr) {
                        return i === 1
                            ? React.createElement('span', {
                                key: i,
                                style: { color: '#f59e0b', textDecoration: 'underline', textUnderlineOffset: 4, textDecorationStyle: 'wavy' }
                            }, '_______')
                            : React.createElement('span', { key: i }, part);
                    })
            ),

            // Traducción
            React.createElement('p', { style: { color: '#94a3b8', marginBottom: 20, fontSize: '0.95rem', fontStyle: 'italic' } },
                '🇪🇸 ' + (currentCard.es || '')
            ),

            // ─── Opciones ───
            !currentAnswer
                ? React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxHeight: 260, overflowY: 'auto', padding: 4 } },
                    options.map(function(p) {
                        return React.createElement('button', {
                            key: p,
                            onClick: function() { submitAnswer(p); },
                            style: Object.assign({}, styles.optionBtn, {
                                borderColor: '#475569',
                            }),
                            onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.background = '#1e293b'; },
                            onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.background = '#0f172a'; }
                        }, p);
                    })
                )

            // ─── Feedback ───
                : React.createElement('div', { style: { animation: 'zoomIn 0.2s ease' } },
                    // Resultado
                    React.createElement('div', {
                        style: {
                            padding: '14px 18px', borderRadius: 12, fontWeight: 700, fontSize: '1.2rem', marginBottom: 12,
                            background: currentAnswer.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            border: '2px solid ' + (currentAnswer.isCorrect ? '#10b981' : '#ef4444'),
                            color: currentAnswer.isCorrect ? '#6ee7b7' : '#fca5a5'
                        }
                    }, currentAnswer.isCorrect ? '¡Correcto! 🟢' : '⚠️ FALSCH: Era ' + currentAnswer.correct),

                    // Frase completa si aplica
                    currentCard.de && currentCard._type !== 'articulos' && React.createElement('div', { style: { color: '#e2e8f0', fontSize: '1rem', marginBottom: 10, fontWeight: 500 } },
                        currentCard.de.replace('___', currentAnswer.correct)
                    ),

                    // Traducción
                    React.createElement('p', { style: { color: '#94a3b8', marginBottom: 10, fontSize: '0.9rem', fontStyle: 'italic' } },
                        '🇪🇸 ' + (currentAnswer.card.es || '')
                    ),

                    // Truco Müller
                    currentAnswer.tip && React.createElement('div', { style: styles.tipBox },
                        React.createElement('span', { style: { color: '#fbbf24', fontWeight: 600, fontSize: '0.8rem' } }, '💡 Tip: '),
                        currentAnswer.tip
                    ),

                    // ─── Explicación AI ───
                    aiExplanation && aiRequestIdx === currentIdx && React.createElement('div', { style: styles.aiBox },
                        React.createElement('p', { style: { color: '#06b6d4', fontWeight: 600, fontSize: '0.78rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 } },
                            React.createElement('span', null, '🤖'),
                            React.createElement('span', null, 'DeepSeek AI')
                        ),
                        React.createElement('p', { style: { color: '#e2e8f0', fontSize: '0.8rem', whiteSpace: 'pre-wrap' } }, aiExplanation)
                    ),

                    aiLoading && aiRequestIdx === currentIdx && React.createElement('div', { style: { textAlign: 'center', padding: 8, color: '#64748b', fontSize: '0.8rem' } }, '🤔 Consultando a DeepSeek...'),

                    // ─── Dificultad (solo después de responder) ───
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12, marginBottom: 8 } },
                        React.createElement('button', { onClick: function() { registerTrainingResult('easy'); }, style: styles.btnEasy }, '✅ Fácil'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('normal'); }, style: styles.btnNormal }, '📌 Normal'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('difficult'); }, style: styles.btnDifficult }, '💪 Difícil')
                    ),

                    // ─── Botones de acción ───
                    React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
                        // Marcar como dominada
                        React.createElement('button', {
                            onClick: handleMastered,
                            style: { flex: 1, background: 'linear-gradient(135deg, #065f46, #047857)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }
                        }, '🌟 Dominada'),
                        currentIdx > 0 && React.createElement('button', {
                            onClick: goPrev,
                            style: { flex: 1, background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '10px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }
                        }, '← Anterior'),
                        React.createElement('button', {
                            onClick: goNext,
                            style: {
                                flex: 1,
                                background: currentIdx >= cards.length - 1 ? '#059669' : '#06b6d4',
                                color: 'white', border: 'none', borderRadius: 10, padding: '10px 0',
                                fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
                            }
                        }, currentIdx >= cards.length - 1 ? '🏁 Finalizar' : 'Siguiente →')
                    )
                )
        ),

        // ─── Sprint button ───
        !currentAnswer && !isSprintActive && React.createElement('div', {
            style: { marginTop: 10, textAlign: 'center' }
        },
            React.createElement('button', {
                onClick: startSprint,
                style: { background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: '0.75rem' }
            }, '⚡ Sprint de 2 min')
        ),

        // ─── Atajos ───
        React.createElement('div', {
            style: { marginTop: 10, fontSize: '0.65rem', color: '#475569', textAlign: 'center' }
        },
            React.createElement('span', null, '⌨️ 1-3=seleccionar · ← → = navegar · Esc=salir · B=bookmark')
        ),

        // ─── Keyboard handler ───
        React.createElement(ExamKeyboardHandler, {
            options: options,
            onSelect: function(idx) { if (!currentAnswer && options[idx]) submitAnswer(options[idx]); },
            onPrev: function() { if (currentAnswer && currentIdx > 0) goPrev(); },
            onNext: function() { if (currentAnswer) goNext(); },
            onExit: function() { if (confirm('¿Abandonar el examen? Se perderá el progreso.')) setPhase('config'); },
            onBookmark: toggleBookmark
        })
    );
};

// ─── Teclado ───
function ExamKeyboardHandler({ options, onSelect, onPrev, onNext, onExit, onBookmark }) {
    React.useEffect(function() {
        var handler = function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            var num = parseInt(e.key);
            if (num >= 1 && num <= 9 && options[num - 1]) { onSelect(num - 1); return; }
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'Escape') onExit();
            if (e.key === 'b' || e.key === 'B') onBookmark();
        };
        window.addEventListener('keydown', handler);
        return function() { window.removeEventListener('keydown', handler); };
    }, [options, onSelect, onPrev, onNext, onExit, onBookmark]);
    return null;
}