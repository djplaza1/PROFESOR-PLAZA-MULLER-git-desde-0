// ═══════════════════════════════════════════════════
// CLOUD PRACTICE – Premium Ultra Edition v5
// ═══════════════════════════════════════════════════
// Práctica de Verbos+Preposiciones y Preposiciones+Caso
// con conexión a Gists, algoritmo adaptativo, integración
// DeepSeek AI, modo examen TELC, cerebro de oro y más.
//
// CONEXIONES ACTIVAS:
// → GIST Verbos+Prep: 142845d2f0fb5a0b2b86e28fbf308809
// → GIST Preposiciones: 4f44a8b19a8aa2d451e183859e3f764f
// → getDefaultVerbPrepData() / getDefaultPrepData() como fallback
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.CloudPractice = function CloudPractice({ onBack, type, examCtx, setExamCtx }) {
    const M = window.Muller;
    const [queue, setQueue] = React.useState([]);
    const [feedback, setFeedback] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [progressMap, setProgressMap] = React.useState(function() { return M.getAdvancedProgress(); });
    const [queueFilter, setQueueFilter] = React.useState('smart');
    const [showTranslation, setShowTranslation] = React.useState(false);
    const [aiExplanation, setAiExplanation] = React.useState(null);
    const [aiLoading, setAiLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [combo, setCombo] = React.useState(0);
    const [bestCombo, setBestCombo] = React.useState(function() {
        return parseInt(localStorage.getItem('muller_cloud_combo_' + type) || '0');
    });
    const [sessionHistory, setSessionHistory] = React.useState([]);
    const [bookmarks, setBookmarks] = React.useState(function() {
        try { return JSON.parse(localStorage.getItem('muller_cloud_bookmarks_' + type) || '[]'); }
        catch(e) { return []; }
    });
    const [showBookmarks, setShowBookmarks] = React.useState(false);
    const [showSessionSummary, setShowSessionSummary] = React.useState(false);
    const [sessionStartTime] = React.useState(Date.now());
    const [focusSprint, setFocusSprint] = React.useState(null);
    const [sprintTimeLeft, setSprintTimeLeft] = React.useState(0);
    const [mastered, setMastered] = React.useState(function() {
        try { return JSON.parse(localStorage.getItem('muller_cloud_mastered_' + type) || '[]'); }
        catch(e) { return []; }
    });
    const sprintTimerRef = React.useRef(null);
    const autoAdvanceTimerRef = React.useRef(null);

    const effectiveFilter = examCtx ? 'smart' : queueFilter;
    const isVerbPrep = type === 'verbos' || type === 'verbprep';
    const queueType = isVerbPrep ? 'verbos' : 'preposiciones';
    const storageKey = isVerbPrep ? 'verbos' : 'preps';

    // ─── Synced advanced progress ───
    React.useEffect(function() {
        if (queue.length === 0) return;
        if (M.getAdvancedProgress) {
            var latest = M.getAdvancedProgress();
            if (latest && Object.keys(latest).length > 0) {
                setProgressMap(latest);
            }
        }
    }, []);

    // ─── Resetear feedback al cambiar de tarjeta ───
    React.useEffect(function() {
        var id = (queue[0] && (queue[0].de + (queue[0].answer || ''))) || '';
        if (id) {
            setShowTranslation(false);
            setAiExplanation(null);
        }
    }, [queue[0] && queue[0].de, queue[0] && queue[0].answer]);

    // ─── Sprint timer ───
    React.useEffect(function() {
        if (focusSprint && sprintTimeLeft > 0) {
            sprintTimerRef.current = setTimeout(function() {
                setSprintTimeLeft(function(p) { return p - 1; });
            }, 1000);
        } else if (focusSprint && sprintTimeLeft <= 0) {
            setFocusSprint('end');
            var totalSession = sessionHistory.length;
            var correctSession = sessionHistory.filter(function(s) { return s.correct; }).length;
            if (totalSession > 0) {
                M.registerDailyAttempt();
                var pct = Math.round((correctSession / totalSession) * 100);
                alert('⏰ ¡Sprint completado!\n' + totalSession + ' tarjetas · ' + correctSession + ' aciertos (' + pct + '%)');
            }
        }
        return function() { if (sprintTimerRef.current) clearTimeout(sprintTimerRef.current); };
    }, [focusSprint, sprintTimeLeft]);

    // ─── Cleanup ───
    React.useEffect(function() {
        return function() {
            if (sprintTimerRef.current) clearTimeout(sprintTimerRef.current);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        };
    }, []);

    // ─── Carga de datos ───
    React.useEffect(function() {
        // ─── GIST VERBOS+PREP y PREPOSICIONES (conexión a base de datos externa) ───
        var URL_VERBOS = 'https://gist.githubusercontent.com/djplaza1/142845d2f0fb5a0b2b86e28fbf308809/raw/verbos_con_preposiciones.json';
        var URL_PREPOSICIONES = 'https://gist.githubusercontent.com/djplaza1/4f44a8b19a8aa2d451e183859e3f764f/raw/preposiciones.json';
        var GIST_URL = isVerbPrep ? URL_VERBOS : URL_PREPOSICIONES;

        setLoading(true);
        setError(null);
        setSessionHistory([]);
        setCombo(0);
        setShowSessionSummary(false);

        var processData = function(data) {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Datos vacíos');
            }
            var filteredData = data.filter(function(item) {
                var masterKey = item.de + '::' + (item.answer || '');
                return mastered.indexOf(masterKey) === -1;
            });
            if (filteredData.length === 0) {
                alert('¡Ya dominas todas estas! 🏆');
                setLoading(false);
                setQueue([]);
                return;
            }
            var getId = function(item) { return queueType + '::' + item.de + '::' + item.answer; };
            var adaptive = M.buildAdaptiveQueue(filteredData, progressMap, getId);
            var filt = M.filterQueueByMode(adaptive, progressMap, getId, effectiveFilter);
            setQueue(filt.length > 0 ? filt : adaptive);
            setLoading(false);
        };

        fetch(GIST_URL + '?nocache=' + new Date().getTime())
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(processData)
            .catch(function(err) {
                console.error('Error fetching cloud data:', err);
                setError(err.message || 'Error al conectar con la base de datos');
                // Fallback a datos locales
                var fallback = isVerbPrep ? M.getDefaultVerbPrepData() : M.getDefaultPrepData();
                if (fallback && fallback.length > 0) {
                    try { processData(fallback); }
                    catch(e) { setLoading(false); }
                } else {
                    setLoading(false);
                }
            });
    }, [type, effectiveFilter]);

    // ─── AI Explanation ───
    var askAiExplanation = function(currentItem, userGuess) {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey()) return;
        setAiLoading(true);
        var question = isVerbPrep
            ? '¿Cuál es la preposición correcta para "' + currentItem.de + '"?'
            : '¿Qué preposición con caso "' + currentItem.de + '"?';
        M.DeepSeek.explainError(
            question,
            userGuess,
            currentItem.answer,
            'Significado: ' + (currentItem.es || '')
        ).then(function(result) {
            setAiExplanation(result);
            setAiLoading(false);
        }).catch(function() {
            setAiLoading(false);
        });
    };

    // ─── AI Example ───
    var askAiForExample = function() {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey()) return;
        if (queue.length === 0) return;
        var currentItem = queue[0];
        setAiLoading(true);
        M.DeepSeek.generateRelatedExercise(
            currentItem.de.replace('___', currentItem.answer) + ' (' + (currentItem.es || '') + ')',
            'B1'
        ).then(function(result) {
            setAiExplanation(result ? '📝 ' + result : null);
            setAiLoading(false);
        }).catch(function() {
            setAiLoading(false);
        });
    };

    // ─── Bookmark toggle ───
    var toggleBookmark = function() {
        if (queue.length === 0) return;
        var currentItem = queue[0];
        var wordKey = currentItem.de + '::' + currentItem.answer;
        var exists = bookmarks.indexOf(wordKey) !== -1;
        var newBm = exists ? bookmarks.filter(function(b) { return b !== wordKey; }) : bookmarks.concat([wordKey]);
        setBookmarks(newBm);
        localStorage.setItem('muller_cloud_bookmarks_' + type, JSON.stringify(newBm));
    };

    var isBookmarked = function() {
        if (queue.length === 0) return false;
        var currentItem = queue[0];
        var wordKey = currentItem.de + '::' + currentItem.answer;
        return bookmarks.indexOf(wordKey) !== -1;
    };

    // ─── Check ───
    var check = function(guess) {
        if (queue.length === 0) return;
        if (feedback) return;
        var currentItem = queue[0];

        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(currentItem.de.replace('___', currentItem.answer));
        utterance.lang = 'de-DE';
        if (window.__mullerApplyPreferredDeVoice) window.__mullerApplyPreferredDeVoice(utterance);
        window.speechSynthesis.speak(utterance);

        if (guess === currentItem.answer) {
            setFeedback({ type: 'success', text: '¡Richtig! Es \'' + currentItem.answer + '\'', currentCard: currentItem, tip: M.getCardTip(type, currentItem) });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(true);
            setAiExplanation(null);
            var newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > bestCombo) {
                setBestCombo(newCombo);
                localStorage.setItem('muller_cloud_combo_' + type, String(newCombo));
            }
            setSessionHistory(function(prev) { return prev.concat({ word: currentItem.de, answer: currentItem.answer, correct: true }); });
            // Auto-advance after 1.2s
            autoAdvanceTimerRef.current = setTimeout(function() {
                setQueue(function(p) { return p.slice(1); });
                setFeedback(null);
            }, 1200);
        } else {
            setFeedback({ type: 'error', text: '⚠️ FALSCH: Era \'' + currentItem.answer + '\'', currentCard: currentItem, tip: M.getCardTip(type, currentItem) });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(false);
            setCombo(0);
            setSessionHistory(function(prev) { return prev.concat({ word: currentItem.de, answer: currentItem.answer, correct: false }); });
            askAiExplanation(currentItem, guess);
        }
    };

    // ─── Register training result ───
    var registerTrainingResult = function(difficulty) {
        if (!feedback || queue.length === 0) return;
        M.registerDailyAttempt();
        var current = feedback.currentCard || queue[0];
        var id = queueType + '::' + current.de + '::' + current.answer;
        var prev = progressMap[id] || { attempts: 0, correct: 0, errors: 0, easy: 0, normal: 0, difficult: 0 };
        var next = {
            attempts: prev.attempts + 1,
            correct: prev.correct + (feedback.type === 'success' ? 1 : 0),
            errors: prev.errors + (feedback.type === 'error' ? 1 : 0),
            easy: prev.easy + (difficulty === 'easy' ? 1 : 0),
            normal: prev.normal + (difficulty === 'normal' ? 1 : 0),
            difficult: prev.difficult + (difficulty === 'difficult' ? 1 : 0),
            consecutiveErrors: feedback.type === 'error' ? (prev.consecutiveErrors || 0) + 1 : 0,
            lastSeenAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        var merged = { ...progressMap };
        merged[id] = next;
        setProgressMap(merged);
        M.saveAdvancedProgress(merged);
        handleContinue();
    };

    // ─── Handle continue ───
    var handleContinue = function() {
        if (feedback.type === 'success') {
            setQueue(function(prev) { return prev.slice(1); });
        } else {
            setQueue(function(prev) { return prev.slice(1).concat([prev[0]]); });
        }
        setFeedback(null);
    };

    // ─── Mark as mastered ───
    var handleMastered = function() {
        if (queue.length === 0) return;
        var currentItem = queue[0];
        var masterKey = currentItem.de + '::' + (currentItem.answer || '');
        var newMastered = mastered.concat([masterKey]);
        setMastered(newMastered);
        localStorage.setItem('muller_cloud_mastered_' + type, JSON.stringify(newMastered));
        setQueue(function(prev) { return prev.slice(1); });
        setFeedback(null);
        setCombo(0);
    };

    // ─── Translation hint ───
    var handleTranslationHint = function() {
        if (!examCtx || !setExamCtx) return;
        var left = examCtx.hintsTotal - examCtx.hintsUsed;
        if (left <= 0) return;
        setExamCtx(function(prev) { return prev ? { ...prev, hintsUsed: (prev.hintsUsed || 0) + 1 } : prev; });
        setShowTranslation(true);
    };

    // ─── Focus Sprint ───
    var startSprint = function() {
        if (queue.length === 0) return;
        setFocusSprint('active');
        setSprintTimeLeft(120);
        setSessionHistory([]);
        setCombo(0);
    };

    // ─── Styles ───
    var styles = {
        container: { maxWidth: 700, margin: '0 auto', padding: '12px 16px' },
        card: {
            background: '#1e293b', borderRadius: 16, padding: 24,
            border: examCtx ? '2px solid rgba(245, 158, 11, 0.4)' : '1px solid #334155',
            boxShadow: isVerbPrep ? '0 0 30px rgba(139, 92, 246, 0.08)' : '0 0 30px rgba(16, 185, 129, 0.08)',
            textAlign: 'center'
        },
        wordDisplay: {
            fontSize: '2.4rem', fontWeight: 800, color: '#e2e8f0',
            margin: '16px 0', letterSpacing: '0.02em', lineHeight: 1.3
        },
        translation: { fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: 20 },
        optionBtn: {
            padding: '10px 16px', borderRadius: 10, fontWeight: 600,
            fontSize: '0.85rem', border: '1px solid #475569',
            background: '#0f172a', color: '#e2e8f0', cursor: 'pointer',
            transition: 'all 0.2s', minWidth: 70
        },
        btnEasy: { background: '#065f46', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnNormal: { background: '#854d0e', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnDifficult: { background: '#7f1d1d', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        tipBox: {
            background: '#0f172a', borderRadius: 12, padding: 14,
            border: '1px solid rgba(251, 191, 36, 0.2)',
            textAlign: 'left', marginBottom: 14
        },
        aiBox: {
            background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', borderRadius: 12, padding: 14,
            border: '1px solid rgba(6, 182, 212, 0.3)',
            textAlign: 'left', marginTop: 10
        },
        filterBtn: {
            padding: '6px 12px', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
            fontSize: '0.75rem', border: 'none', transition: 'all 0.2s'
        },
        loadingPulse: {
            animation: 'mullerPulse 1.5s infinite',
            background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)',
            backgroundSize: '200% 100%'
        },
        errorBox: {
            background: 'rgba(239, 68, 68, 0.1)', borderRadius: 12, padding: 16,
            border: '1px solid rgba(239, 68, 68, 0.3)', textAlign: 'center'
        },
        comboBox: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 10, padding: '6px 14px',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontWeight: 700, color: 'white', fontSize: '0.85rem',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
            animation: combo >= 5 ? 'comboGlow 0.5s ease infinite alternate' : 'none'
        }
    };

    var accentColor = isVerbPrep ? '#8b5cf6' : '#10b981';
    var iconMain = isVerbPrep ? '🔗' : '📍';

    // ─── SESSION SUMMARY ───
    var SessionSummary = function() {
        var total = sessionHistory.length;
        var correct = sessionHistory.filter(function(s) { return s.correct; }).length;
        var pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        var sessionDuration = Math.round((Date.now() - sessionStartTime) / 60000);

        return React.createElement('div', { style: Object.assign({}, styles.card, { padding: 30 }) },
            React.createElement('div', { style: { fontSize: 56, marginBottom: 12 } }, '📊'),
            React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 } }, 'Resumen de Sesión'),
            React.createElement('div', { style: { fontSize: '0.85rem', color: '#64748b', marginBottom: 20 } },
                'Sesión de ' + sessionDuration + ' min'
            ),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 } },
                React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: accentColor } }, total),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Tarjetas')
                ),
                React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#10b981' } }, correct),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Aciertos')
                ),
                React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 14, textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' } }, pct + '%'),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Precisión')
                )
            ),
            React.createElement('div', { style: { background: '#1e293b', borderRadius: 10, height: 10, marginBottom: 20, overflow: 'hidden' } },
                React.createElement('div', { style: { background: 'linear-gradient(90deg, ' + accentColor + ', #10b981)', height: '100%', borderRadius: 10, width: pct + '%', transition: 'width 0.5s' } })
            ),
            React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 20 } },
                '🔥 Mejor racha: ' + bestCombo + ' seguidos'
            ),
            React.createElement('button', {
                onClick: function() { setShowSessionSummary(false); onBack(); },
                style: { background: accentColor, color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
            }, '🔄 Volver al menú')
        );
    };

    // ─── BOOKMARKS VIEW ───
    var BookmarksView = function() {
        var bmItems = [];
        try {
            var allData = isVerbPrep ? (M.getDefaultVerbPrepData ? M.getDefaultVerbPrepData() : []) : (M.getDefaultPrepData ? M.getDefaultPrepData() : []);
            bmItems = allData.filter(function(d) {
                var key = d.de + '::' + d.answer;
                return bookmarks.indexOf(key) !== -1;
            });
        } catch(e) {}

        return React.createElement('div', { style: Object.assign({}, styles.container) },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
                React.createElement('button', {
                    onClick: function() { setShowBookmarks(false); },
                    style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
                }, '← Volver'),
                React.createElement('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0' } }, '🔖 Guardados (' + bookmarks.length + ')')
            ),
            bmItems.length === 0 && React.createElement('div', { style: { textAlign: 'center', padding: 40, color: '#64748b' } },
                React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '🔖'),
                React.createElement('p', null, 'No tienes elementos guardados aún.'),
                React.createElement('p', { style: { fontSize: '0.8rem' } }, 'Haz clic en ⭐ durante la práctica para guardar.')
            ),
            bmItems.length > 0 && React.createElement('div', { style: { display: 'grid', gap: 8 } },
                bmItems.map(function(card, idx) {
                    return React.createElement('div', {
                        key: idx,
                        style: { background: '#1e293b', borderRadius: 10, padding: 12, border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    },
                        React.createElement('div', null,
                            React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' } }, card.de + ' → ' + card.answer),
                            React.createElement('div', { style: { color: '#64748b', fontSize: '0.75rem' } }, card.es || '')
                        ),
                        React.createElement('button', {
                            onClick: function() {
                                var key = card.de + '::' + card.answer;
                                var newBm = bookmarks.filter(function(b) { return b !== key; });
                                setBookmarks(newBm);
                                localStorage.setItem('muller_cloud_bookmarks_' + type, JSON.stringify(newBm));
                            },
                            style: { background: 'transparent', border: '1px solid #334155', borderRadius: 8, color: '#ef4444', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem' }
                        }, 'Eliminar')
                    );
                })
            )
        );
    };

    // ─── Loading ───
    if (loading) return React.createElement('div', { style: Object.assign({}, styles.container, { paddingTop: 40 }) },
        React.createElement('div', { style: Object.assign({}, styles.loadingPulse, { height: 24, width: 200, borderRadius: 8, margin: '0 auto 16px' }) }),
        React.createElement('div', { style: Object.assign({}, styles.loadingPulse, { height: 200, width: '100%', borderRadius: 16 }) })
    );

    // ─── Error ───
    if (error && queue.length === 0) return React.createElement('div', { style: Object.assign({}, styles.container, { paddingTop: 40 }) },
        React.createElement('div', { style: styles.errorBox },
            React.createElement('div', { style: { fontSize: 36, marginBottom: 8 } }, '⚠️'),
            React.createElement('div', { style: { fontWeight: 600, color: '#f87171', marginBottom: 4 } }, 'Error de conexión'),
            React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: 14 } }, error + '. Usando datos locales si están disponibles.'),
            React.createElement('button', {
                onClick: onBack,
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem' }
            }, '← Volver')
        )
    );

    // ─── Bookmarks view ───
    if (showBookmarks) return React.createElement(BookmarksView);

    // ─── Session Summary ───
    if (showSessionSummary) return React.createElement(SessionSummary);

    // ─── Mazo completado ───
    if (queue.length === 0) return React.createElement('div', { style: Object.assign({}, styles.container, { textAlign: 'center', paddingTop: 40 }) },
        React.createElement('div', { style: { fontSize: 72, marginBottom: 12 } }, '🏆'),
        React.createElement('h2', { style: { fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginBottom: 8 } }, '¡Mazo completado!'),
        React.createElement('p', { style: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: 20 } }, 'Has visto todas las tarjetas. ¡Excelente trabajo!'),
        React.createElement('button', {
            onClick: function() { setShowSessionSummary(true); },
            style: { background: accentColor, color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', marginRight: 10 }
        }, '📊 Ver resumen'),
        React.createElement('button', {
            onClick: onBack,
            style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
        }, '🔄 Volver')
    );

    // ─── Tarjeta actual ───
    var current = queue[0];
    var options = isVerbPrep
        ? ['für', 'auf', 'an', 'von', 'über', 'mit', 'um', 'zu', 'vor', 'nach', 'in', 'bei', 'aus', 'durch', 'ohne', 'gegen']
        : ['an', 'auf', 'in', 'aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'durch', 'für', 'um', 'vor', 'über', 'unter', 'neben', 'zwischen', 'hinter', 'gegen', 'ohne'];
    var examHideEs = !!(examCtx && !showTranslation && !feedback);
    var isSprintActive = focusSprint === 'active';

    // Estadísticas de esta tarjeta
    var wordId = queueType + '::' + current.de + '::' + current.answer;
    var wordStats = progressMap[wordId] || {};
    var masteryLevel = M.calcMasteryLevel(wordStats);
    var masteryEmoji = M.getMasteryEmoji(masteryLevel);
    var masteryLabel = M.getMasteryLabel(masteryLevel);

    return React.createElement('div', { style: Object.assign({}, styles.container, { position: 'relative' }) },
        // ─── Top bar ───
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('button', {
                onClick: examCtx ? function() { if (confirm('¿Abandonar el examen?')) onBack(); } : function() { setShowSessionSummary(true); },
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
            }, examCtx ? '← Salir' : '← Finalizar'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, 'Cola: ' + queue.length),
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, '·'),
                React.createElement('span', { style: { fontSize: '0.75rem', color: accentColor, fontWeight: 600 } }, isVerbPrep ? 'Verbo+Prep' : 'Preposiciones')
            )
        ),

        // ─── Filtros (solo fuera de examen) ───
        !examCtx && React.createElement('div', {
            style: Object.assign({}, styles.card, { marginBottom: 14, padding: 12, textAlign: 'left' })
        },
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                ['smart','failed','difficult','weak','new'].map(function(f) {
                    var active = queueFilter === f;
                    var labels = { smart: '🧠 Smart', failed: '❌ Fallidas', difficult: '😰 Difíciles', weak: '⚠️ Débiles', new: '🆕 Nuevas' };
                    return React.createElement('button', {
                        key: f,
                        onClick: function() { setQueueFilter(f); },
                        style: Object.assign({}, styles.filterBtn,
                            active ? { background: accentColor, color: 'white' } : { background: '#0f172a', color: '#94a3b8' }
                        )
                    }, labels[f]);
                }),
                React.createElement('button', {
                    onClick: function() { setShowBookmarks(true); },
                    style: { background: '#0f172a', color: '#fbbf24', borderRadius: 8, padding: '6px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', border: '1px solid #475569' }
                }, '🔖 ' + bookmarks.length)
            )
        ),

        // ─── Indicador de maestría + Combo + Bookmark ───
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' } },
            React.createElement('span', {
                style: {
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: '#0f172a', padding: '4px 10px', borderRadius: 6,
                    fontSize: '0.72rem', color: '#94a3b8', border: '1px solid #1e293b'
                }
            },
                React.createElement('span', null, masteryEmoji),
                React.createElement('span', null, masteryLabel + ' (nivel ' + masteryLevel + '/5)'),
                wordStats.attempts > 0 && React.createElement('span', { style: { color: '#64748b', marginLeft: 4 } },
                    '· ' + wordStats.correct + '/' + wordStats.attempts + ' aciertos'
                )
            ),

            // ─── Combo ───
            combo >= 3 && React.createElement('div', { style: styles.comboBox, key: combo },
                React.createElement('span', { style: { fontSize: 16 } }, combo >= 10 ? '🔥🔥' : '🔥'),
                React.createElement('span', null, combo + ' seguidos' + (combo >= 10 ? ' 🚀' : ''))
            ),

            // ─── Bookmark ───
            React.createElement('button', {
                onClick: toggleBookmark,
                style: {
                    background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 20,
                    filter: isBookmarked() ? 'none' : 'grayscale(1)',
                    opacity: isBookmarked() ? 1 : 0.5,
                    transition: 'all 0.2s'
                },
                title: isBookmarked() ? 'Quitar marcador' : 'Guardar'
            }, '⭐')
        ),

        // ─── Sprint indicator ───
        isSprintActive && React.createElement('div', { style: {
            textAlign: 'center', marginBottom: 10,
            background: 'rgba(239, 68, 68, 0.1)', borderRadius: 8, padding: '6px 14px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
        } },
            React.createElement('span', { style: { color: '#fca5a5', fontWeight: 600, fontSize: '0.85rem' } },
                '⏰ SPRINT: ' + Math.floor(sprintTimeLeft / 60) + ':' + (sprintTimeLeft % 60).toString().padStart(2, '0')
            )
        ),

        // ─── Tarjeta principal ───
        React.createElement('div', { style: Object.assign({}, styles.card, isSprintActive ? { borderColor: 'rgba(239, 68, 68, 0.5)' } : {}) },
            // Indicadores
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' } },
                examCtx ? React.createElement('span', { style: { fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 12px', borderRadius: 6 } },
                    '📝 Examen en curso'
                ) : null,
                isSprintActive && React.createElement('span', { style: { fontSize: '0.72rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 12px', borderRadius: 6 } },
                    '⚡ Sprint activo'
                ),
                current.prepCase && React.createElement('span', {
                    style: {
                        fontSize: '0.72rem', padding: '4px 12px', borderRadius: 6,
                        background: current.prepCase === 'Akkusativ' ? 'rgba(239, 68, 68, 0.15)' :
                            current.prepCase === 'Dativ' ? 'rgba(59, 130, 246, 0.15)' :
                            'rgba(234, 179, 8, 0.15)',
                        color: current.prepCase === 'Akkusativ' ? '#fca5a5' :
                            current.prepCase === 'Dativ' ? '#93c5fd' : '#fde68a',
                        fontWeight: 600
                    }
                }, iconMain + ' ' + current.prepCase)
            ),

            // Palabra
            React.createElement('div', { style: styles.wordDisplay },
                current.de.split('___').map(function(part, i, arr) {
                    return i === 1
                        ? React.createElement('span', {
                            key: i,
                            style: { color: accentColor, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationStyle: 'wavy' }
                        }, '_______')
                        : React.createElement('span', { key: i }, part);
                })
            ),

            // Traducción
            examHideEs
                ? React.createElement('p', { style: { color: '#475569', marginBottom: 20, fontSize: '0.9rem', fontStyle: 'italic', border: '1px dashed #475569', borderRadius: 10, padding: '14px 10px' } },
                    'Traducción oculta — pide una pista arriba'
                )
                : React.createElement('p', { style: styles.translation }, '🇪🇸 ' + current.es),

            // ─── Opciones (si no hay feedback) ───
            !feedback
                ? React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxHeight: 260, overflowY: 'auto', padding: 4 } },
                    options.map(function(p) {
                        return React.createElement('button', {
                            key: p,
                            onClick: function() { check(p); },
                            style: Object.assign({}, styles.optionBtn, { borderColor: '#475569' }),
                            onMouseEnter: function(e) { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = '#1e293b'; },
                            onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.background = '#0f172a'; }
                        }, p);
                    })
                )

            // ─── Feedback ───
                : React.createElement('div', { style: { animation: 'zoomIn 0.2s ease' } },
                    // Resultado
                    React.createElement('div', {
                        style: {
                            padding: '16px 20px', borderRadius: 12, fontWeight: 700, fontSize: '1.3rem', marginBottom: 14,
                            background: feedback.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            border: '2px solid ' + (feedback.type === 'error' ? '#ef4444' : '#10b981'),
                            color: feedback.type === 'error' ? '#fca5a5' : '#6ee7b7'
                        }
                    }, feedback.text),

                    // Traducción
                    React.createElement('p', { style: { color: '#94a3b8', marginBottom: 14, fontSize: '0.95rem', fontStyle: 'italic' } },
                        '🇪🇸 ' + (feedback.currentCard || current).es
                    ),

                    // Frase completa
                    current.de && React.createElement('div', { style: { color: '#e2e8f0', fontSize: '1rem', marginBottom: 12, fontWeight: 500 } },
                        current.de.replace('___', current.answer)
                    ),

                    // Truco Müller
                    React.createElement('div', { style: styles.tipBox },
                        React.createElement('p', { style: { color: '#fbbf24', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4 } }, '💡 Müller-Tipp'),
                        React.createElement('p', { style: { color: '#e2e8f0', fontSize: '0.82rem', fontStyle: 'italic' } }, feedback.tip)
                    ),

                    // ─── Explicación AI ───
                    aiExplanation && React.createElement('div', { style: styles.aiBox },
                        React.createElement('p', { style: { color: '#06b6d4', fontWeight: 600, fontSize: '0.8rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 } },
                            React.createElement('span', null, '🤖'),
                            React.createElement('span', null, 'DeepSeek AI')
                        ),
                        React.createElement('p', { style: { color: '#e2e8f0', fontSize: '0.82rem', whiteSpace: 'pre-wrap' } }, aiExplanation)
                    ),

                    aiLoading && React.createElement('div', { style: { textAlign: 'center', padding: 8, color: '#64748b', fontSize: '0.8rem' } }, '🤔 Consultando a DeepSeek...'),

                    // Botón pedir ejemplo
                    M.DeepSeek && M.DeepSeek.hasApiKey() && !aiLoading && React.createElement('button', {
                        onClick: askAiForExample,
                        style: { background: 'transparent', border: '1px dashed #06b6d4', color: '#06b6d4', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: '0.78rem', width: '100%', marginBottom: 12 }
                    }, '📝 Pedir frase de ejemplo a la IA'),

                    // ─── Dificultad ───
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 } },
                        React.createElement('button', { onClick: function() { registerTrainingResult('easy'); }, style: styles.btnEasy }, '✅ Fácil'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('normal'); }, style: styles.btnNormal }, '📌 Normal'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('difficult'); }, style: styles.btnDifficult }, '💪 Difícil')
                    ),

                    // ─── Botones de acción ───
                    React.createElement('div', { style: { display: 'flex', gap: 8 } },
                        React.createElement('button', {
                            onClick: handleMastered,
                            style: { flex: 1, background: 'linear-gradient(135deg, #065f46, #047857)', color: 'white', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }
                        }, '🌟 ¡Ya me la sé!'),
                        React.createElement('button', {
                            onClick: handleContinue,
                            style: {
                                flex: 1,
                                background: feedback.type === 'error' ? '#92400e' : '#06b6d4',
                                color: 'white', border: 'none', borderRadius: 10, padding: '12px 0',
                                fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
                            }
                        }, feedback.type === 'error' ? '🔄 Reintentar luego' : 'Siguiente →')
                    )
                ),

            // ─── Pie ───
            React.createElement('p', { style: { color: '#475569', fontSize: '0.72rem', marginTop: 14 } },
                'Restantes: ' + queue.length + ' · ' + (isVerbPrep ? 'Verbos+Prep' : 'Preposiciones')
            )
        ),

        // ─── Sprint button ───
        !feedback && !isSprintActive && React.createElement('div', {
            style: { marginTop: 10, textAlign: 'center' }
        },
            React.createElement('button', {
                onClick: startSprint,
                style: { background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: '0.75rem' }
            }, '⚡ Sprint de 2 min')
        ),

        // ─── Atajos de teclado ───
        React.createElement('div', {
            style: { marginTop: 10, display: 'flex', justifyContent: 'center', gap: 12, fontSize: '0.65rem', color: '#475569' }
        },
            React.createElement('span', null, '⌨️ 1=' + (options[0] || '') + ' · 2=' + (options[1] || '') + ' · 3=' + (options[2] || '') + ' · Enter=sig.'),
            !feedback && React.createElement('span', null, '· ⭐=guardar')
        ),

        // ─── Keyboard shortcut handler ───
        React.createElement(CloudKeyboardHandler, {
            options: options,
            onOption: function(idx) { if (!feedback && queue.length > 0 && options[idx]) check(options[idx]); },
            onContinue: function() { if (feedback) handleContinue(); },
            onBookmark: toggleBookmark
        })
    );
};

// ─── Atajos de teclado ───
function CloudKeyboardHandler({ options, onOption, onContinue, onBookmark }) {
    React.useEffect(function() {
        var handler = function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            var num = parseInt(e.key);
            if (num >= 1 && num <= 9 && options[num - 1]) {
                onOption(num - 1);
            }
            if (e.key === 'Enter') onContinue();
            if (e.key === 'b' || e.key === 'B') onBookmark();
        };
        window.addEventListener('keydown', handler);
        return function() { window.removeEventListener('keydown', handler); };
    }, [options, onOption, onContinue, onBookmark]);
    return null;
}