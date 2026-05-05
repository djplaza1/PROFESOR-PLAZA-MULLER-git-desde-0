// ═══════════════════════════════════════════════════
// ARTICLE PRACTICE – Premium Ultra Edition v6
// ═══════════════════════════════════════════════════
// Práctica de DER/DIE/DAS con algoritmo adaptativo,
// integración DeepSeek AI, modo examen TELC,
// cerebro de oro, niveles A1-C1, y más.
//
// CONEXIONES ACTIVAS:
// → GIST Artículos: a53fde18c901a7f2d86977174b5b9a72
// → getDefaultArticlesData() como fallback local
//
// v6: Añadidas reglas de terminación visibles con color,
//     botón "Continuar" para avanzar manualmente.
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.ArticlePractice = function ArticlePractice({ onBack, examCtx, setExamCtx, examAutoLevel }) {
    const M = window.Muller;
    const [mode, setMode] = React.useState(null);
    const [queue, setQueue] = React.useState([]);
    const [feedback, setFeedback] = React.useState(null);
    const [loading, setLoading] = React.useState(function() { return !!(examCtx && examAutoLevel); });
    const [progressMap, setProgressMap] = React.useState(function() { return M.getAdvancedProgress(); });
    const [queueFilter, setQueueFilter] = React.useState('smart');
    const [showTranslation, setShowTranslation] = React.useState(false);
    const [aiExplanation, setAiExplanation] = React.useState(null);
    const [aiLoading, setAiLoading] = React.useState(false);
    const examLoadRef = React.useRef(false);
    const [combo, setCombo] = React.useState(0);
    const [bestCombo, setBestCombo] = React.useState(function() {
        return parseInt(localStorage.getItem('muller_article_combo') || '0');
    });
    const [sessionHistory, setSessionHistory] = React.useState([]);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [bookmarks, setBookmarks] = React.useState(function() {
        try { return JSON.parse(localStorage.getItem('muller_article_bookmarks') || '[]'); }
        catch(e) { return []; }
    });
    const [showBookmarks, setShowBookmarks] = React.useState(false);
    const [showSessionSummary, setShowSessionSummary] = React.useState(false);
    const [sessionStartTime] = React.useState(Date.now());
    const [writingMode, setWritingMode] = React.useState(false);
    const [writeInput, setWriteInput] = React.useState('');
    const [focusSprint, setFocusSprint] = React.useState(null);
    const [sprintTimeLeft, setSprintTimeLeft] = React.useState(0);
    const writeInputRef = React.useRef(null);
    const sprintTimerRef = React.useRef(null);
    const autoAdvanceTimerRef = React.useRef(null);

    // ─── Regla de terminación para la tarjeta actual ───
    const [currentRule, setCurrentRule] = React.useState(null);

    const [masteredArticles, setMasteredArticles] = React.useState(function() {
        var saved = localStorage.getItem('muller_mastered_articles');
        return saved ? JSON.parse(saved) : [];
    });

    var loadData = function(selectedMode) {
        setMode(selectedMode);
        setLoading(true);
        setSessionHistory([]);
        setCombo(0);
        setFeedback(null);
        setSelectedAnswer(null);
        setShowSessionSummary(false);
        setCurrentRule(null);

        var processData = function(rawData) {
            var data = Array.isArray(rawData) ? M.normalizeArticulosDataset(rawData) : rawData;
            var filtered = data;
            if (selectedMode !== 'MIXTO' && selectedMode !== 'historia') {
                filtered = data.filter(function(item) { return M.articleItemMatchesLevel(item, selectedMode); });
            }
            var finalQueue = filtered.filter(function(item) { return masteredArticles.indexOf(item.de) === -1; });

            if (finalQueue.length === 0) {
                alert('¡Increíble! Ya dominas todo el mazo ' + selectedMode + '. 🏆');
                if (examCtx) onBack();
                else setMode(null);
            } else {
                var getId = function(item) { return 'articulos::' + item.de; };
                var adaptive = M.buildAdaptiveQueue(finalQueue, progressMap, getId);
                var filteredQ = M.filterQueueByMode(adaptive, progressMap, getId, queueFilter);
                setQueue(filteredQ.length > 0 ? filteredQ : adaptive);
            }
            setLoading(false);
        };

        if (selectedMode === 'historia') {
            var allVocab = (window.__DEFAULT_GUION__ || []).flatMap(function(s) { return s.vocab || []; });
            var nouns = allVocab.filter(function(v) { return /^(der|die|das)\s/i.test(v.de); });
            var uniqueNouns = Array.from(new Map(nouns.map(function(item) { return [item.de, item]; })).values());
            processData(uniqueNouns);
        } else {
            // ─── GIST ARTÍCULOS (conexión a base de datos externa) ───
            var GIST_URL = 'https://gist.githubusercontent.com/djplaza1/a53fde18c901a7f2d86977174b5b9a72/raw/articulos.json?nocache=' + new Date().getTime();
            fetch(GIST_URL).then(function(res) { return res.json(); }).then(processData).catch(function() {
                // Fallback a datos locales si no hay conexión
                var fallback = M.getDefaultArticlesData ? M.getDefaultArticlesData() : [];
                if (fallback.length > 0) {
                    processData(fallback);
                } else {
                    alert('Error de conexión con la base de datos Müller.');
                    if (examCtx) onBack();
                    else { setMode(null); setLoading(false); }
                }
            });
        }
    };

    // ─── Efecto de carga inicial del examen ───
    React.useEffect(function() {
        if (examCtx && examAutoLevel && !examLoadRef.current) {
            examLoadRef.current = true;
            loadData(examAutoLevel);
        }
    }, [examCtx, examAutoLevel]);

    // ─── Resetear feedback al cambiar de tarjeta ───
    React.useEffect(function() {
        var id = queue[0] && queue[0].de;
        if (id) {
            setShowTranslation(false);
            setAiExplanation(null);
            setSelectedAnswer(null);
            setCurrentRule(null);
            if (writeInputRef.current) writeInputRef.current.focus();
        }
    }, [queue[0] && queue[0].de]);

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
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
            if (sprintTimerRef.current) clearTimeout(sprintTimerRef.current);
        };
    }, []);

    // ─── Traducción (modo examen) ───
    var handleTranslationHint = function() {
        if (!examCtx || !setExamCtx) return;
        var left = examCtx.hintsTotal - examCtx.hintsUsed;
        if (left <= 0) return;
        setExamCtx(function(prev) { return prev ? { ...prev, hintsUsed: (prev.hintsUsed || 0) + 1 } : prev; });
        setShowTranslation(true);
    };

    // ─── Marcar como dominada ───
    var handleMastered = function() {
        var currentWord = queue[0].de;
        var newMastered = masteredArticles.concat([currentWord]);
        setMasteredArticles(newMastered);
        localStorage.setItem('muller_mastered_articles', JSON.stringify(newMastered));
        setQueue(function(prev) { return prev.slice(1); });
        setFeedback(null);
        setCombo(0);
        setCurrentRule(null);
    };

    // ─── Bookmark ───
    var toggleBookmark = function() {
        if (queue.length === 0) return;
        var current = queue[0];
        var wordKey = current.de;
        var exists = bookmarks.indexOf(wordKey) !== -1;
        var newBm = exists ? bookmarks.filter(function(b) { return b !== wordKey; }) : bookmarks.concat([wordKey]);
        setBookmarks(newBm);
        localStorage.setItem('muller_article_bookmarks', JSON.stringify(newBm));
    };

    var isBookmarked = function() {
        return queue.length > 0 && bookmarks.indexOf(queue[0].de) !== -1;
    };

    // ─── Siguiente palabra (Continuar) ───
    var handleContinue = function() {
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        if (!feedback || queue.length === 0) return;

        // Registrar intento
        M.registerDailyAttempt();
        var current = feedback.currentCard || queue[0];
        var id = 'articulos::' + current.de;
        var prev = progressMap[id] || { attempts: 0, correct: 0, errors: 0, easy: 0, normal: 0, difficult: 0 };
        var next = {
            attempts: prev.attempts + 1,
            correct: prev.correct + (feedback.type === 'success' ? 1 : 0),
            errors: prev.errors + (feedback.type === 'error' ? 1 : 0),
            easy: prev.easy + 0,
            normal: prev.normal + 1,
            difficult: prev.difficult + 0,
            consecutiveErrors: feedback.type === 'error' ? (prev.consecutiveErrors || 0) + 1 : 0,
            consecutiveCorrect: feedback.type === 'success' ? (prev.consecutiveCorrect || 0) + 1 : 0,
            lastSeenAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        var merged = { ...progressMap };
        merged[id] = next;
        setProgressMap(merged);
        M.saveAdvancedProgress(merged);

        // Session history
        setSessionHistory(function(prev) { return prev.concat({
            word: current.de,
            correct: feedback.type === 'success',
            time: Date.now()
        }); });

        // Combo
        if (feedback.type === 'success') {
            var newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > bestCombo) {
                setBestCombo(newCombo);
                localStorage.setItem('muller_article_combo', String(newCombo));
            }
        } else {
            setCombo(0);
        }

        // Avanzar: correcta → siguiente, incorrecta → se queda al final
        if (feedback.type === 'success') {
            setQueue(function(prev) { return prev.slice(1); });
        } else {
            setQueue(function(prev) { return prev.slice(1).concat([prev[0]]); });
        }

        setFeedback(null);
        setSelectedAnswer(null);
        setWriteInput('');
        setCurrentRule(null);
    };

    // ─── Comprobar respuesta ───
    var check = function(guessOrRedirect) {
        if (queue.length === 0) return;
        if (feedback) return; // Ya respondió

        var guess = writingMode && writeInput ? writeInput.trim().toLowerCase() : guessOrRedirect;
        if (writingMode && !guess) return;

        var current = queue[0];
        var correct = current.de.split(' ')[0].toLowerCase();
        var word = current.de.split(' ').slice(1).join(' ');
        var article = current.de.split(' ')[0].toLowerCase();
        var es = current.es || '';

        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(current.de);
        utterance.lang = 'de-DE';
        if (window.__mullerApplyPreferredDeVoice) window.__mullerApplyPreferredDeVoice(utterance);
        window.speechSynthesis.speak(utterance);

        // Buscar regla de terminación para mostrar
        var rule = M.findArticleRule ? M.findArticleRule(current) : null;
        setCurrentRule(rule);

        if (guess === correct) {
            setSelectedAnswer(correct);
            setFeedback({ type: 'success', text: '¡Richtig! 🟢 ' + current.de, tip: M.getCardTip('articulos', current), currentCard: current, rule: rule });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(true);
            setAiExplanation(null);
            // Combo
            var newCombo = combo + 1;
            setCombo(newCombo);
            if (newCombo > bestCombo) {
                setBestCombo(newCombo);
                localStorage.setItem('muller_article_combo', String(newCombo));
            }
            // Session history
            setSessionHistory(function(prev) { return prev.concat({ word: current.de, correct: true, time: Date.now() }); });
            // NO auto-advance - el usuario debe hacer clic en "Continuar"
        } else {
            setSelectedAnswer(guess);
            setFeedback({ type: 'error', text: '⚠️ FALSCH! Era: ' + current.de, tip: M.getCardTip('articulos', current), currentCard: current, rule: rule });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(false);
            setCombo(0);
            setSessionHistory(function(prev) { return prev.concat({ word: current.de, correct: false, time: Date.now() }); });
            // Preguntar a AI automáticamente
            askAiExplanation(word, correct, es);
        }
    };

    var checkWriting = function(e) {
        e.preventDefault();
        check();
    };

    // ─── AI Explanation ───
    var askAiExplanation = function(word, correctArticle, es) {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey()) return;
        setAiLoading(true);
        M.DeepSeek.explainError(
            '¿Cuál es el artículo correcto para "' + word + '"?',
            'otro',
            correctArticle,
            'La palabra significa: ' + es
        ).then(function(result) {
            setAiExplanation(result);
            setAiLoading(false);
        }).catch(function() {
            setAiLoading(false);
        });
    };

    // ─── AI Example (manual) ───
    var askAiForExample = function() {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey()) return;
        if (queue.length === 0) return;
        var current = queue[0];
        var word = current.de.split(' ').slice(1).join(' ');
        var article = current.de.split(' ')[0].toLowerCase();
        var es = current.es || '';
        setAiLoading(true);
        M.DeepSeek.generateRelatedExercise(word + ' (' + article + ' ' + es + ')', mode || 'B1')
            .then(function(result) {
                setAiExplanation(result ? '📝 Ejemplo:\n' + result : null);
                setAiLoading(false);
            }).catch(function() {
                setAiLoading(false);
            });
    };

    // ─── AI Example (auto después de acierto) ───
    var askAiForExampleAuto = function() {
        if (!M.DeepSeek || !M.DeepSeek.hasApiKey()) return;
        if (queue.length === 0) return;
        var current = queue[0];
        var word = current.de.split(' ').slice(1).join(' ');
        var article = current.de.split(' ')[0].toLowerCase();
        var es = current.es || '';
        M.DeepSeek.generateRelatedExercise(word + ' (' + article + ' ' + es + ')', mode || 'B1')
            .then(function(result) {
                if (result) {
                    // Mostrar como notificación breve
                    M.showNotification && M.showNotification('📝 ' + result, 'info', 3000);
                }
            }).catch(function() {});
    };

    // ─── Focus Sprint ───
    var startSprint = function() {
        if (queue.length === 0) return;
        setFocusSprint('active');
        setSprintTimeLeft(120); // 2 minutos
        setSessionHistory([]);
        setCombo(0);
    };

    // ─── Estilos ───
    var styles = {
        container: { maxWidth: 700, margin: '0 auto', padding: '12px 16px' },
        card: {
            background: '#1e293b', borderRadius: 16, padding: 24,
            border: examCtx ? '2px solid rgba(245, 158, 11, 0.4)' : '1px solid #334155',
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.08)',
            textAlign: 'center'
        },
        wordDisplay: {
            fontSize: '3rem', fontWeight: 900, color: '#e2e8f0',
            margin: '16px 0', letterSpacing: '0.02em'
        },
        translation: { fontSize: '1.1rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: 20 },
        btnArticle: { flex: 1, padding: '18px 0', borderRadius: 12, fontWeight: 700, fontSize: '1.2rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
        tipBox: {
            background: '#0f172a', borderRadius: 12, padding: 14,
            border: '1px solid rgba(251, 191, 36, 0.2)',
            textAlign: 'left', marginBottom: 14
        },
        // ─── Nuevo estilo para la regla de terminación ───
        ruleBox: {
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            borderRadius: 14, padding: 18,
            border: '2px solid',
            textAlign: 'left', marginBottom: 16,
            animation: 'zoomIn 0.3s ease'
        },
        ruleEnding: {
            display: 'inline-block',
            fontSize: '1.3rem', fontWeight: 800,
            padding: '4px 14px', borderRadius: 8,
            marginRight: 8
        },
        ruleArticle: {
            display: 'inline-block',
            fontSize: '1.1rem', fontWeight: 700,
            padding: '2px 10px', borderRadius: 6,
            textTransform: 'uppercase'
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
        selectCard: {
            background: '#1e293b', borderRadius: 14, padding: 16,
            border: '1px solid #334155', cursor: 'pointer',
            transition: 'all 0.2s', textAlign: 'center'
        },
        loadingPulse: {
            animation: 'mullerPulse 1.5s infinite',
            background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)',
            backgroundSize: '200% 100%'
        },
        comboBox: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 10, padding: '6px 14px',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontWeight: 700, color: 'white', fontSize: '0.85rem',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
            animation: combo >= 5 ? 'comboGlow 0.5s ease infinite alternate' : 'none'
        },
        continueBtn: {
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            color: 'white', border: 'none', borderRadius: 12,
            padding: '14px 0', fontWeight: 700, cursor: 'pointer',
            fontSize: '1.1rem', width: '100%',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            transition: 'all 0.2s'
        },
        difficultyRow: {
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12
        },
        btnEasy: { background: '#065f46', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnNormal: { background: '#854d0e', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' },
        btnDifficult: { background: '#7f1d1d', color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }
    };

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
                    React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: '#06b6d4' } }, total),
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
            // Barrra de progreso
            React.createElement('div', { style: { background: '#1e293b', borderRadius: 10, height: 10, marginBottom: 20, overflow: 'hidden' } },
                React.createElement('div', { style: { background: 'linear-gradient(90deg, #06b6d4, #10b981)', height: '100%', borderRadius: 10, width: pct + '%', transition: 'width 0.5s' } })
            ),
            // Combo máximo
            React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 20 } },
                '🔥 Mejor racha: ' + bestCombo + ' seguidos'
            ),
            React.createElement('button', {
                onClick: function() { setShowSessionSummary(false); setMode(null); },
                style: { background: '#06b6d4', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
            }, '🔄 Volver al menú')
        );
    };

    // ─── BOOKMARKS VIEW ───
    var BookmarksView = function() {
        var bookmarkedCards = [];
        // Buscar en datos por defecto
        try {
            var allData = M.getDefaultArticlesData ? M.getDefaultArticlesData() : [];
            bookmarkedCards = allData.filter(function(d) { return bookmarks.indexOf(d.de) !== -1; });
        } catch(e) {}

        return React.createElement('div', { style: Object.assign({}, styles.container) },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
                React.createElement('button', {
                    onClick: function() { setShowBookmarks(false); },
                    style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
                }, '← Volver'),
                React.createElement('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0' } }, '🔖 Guardados (' + bookmarks.length + ')')
            ),
            bookmarkedCards.length === 0 && React.createElement('div', { style: { textAlign: 'center', padding: 40, color: '#64748b' } },
                React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '🔖'),
                React.createElement('p', null, 'No tienes palabras guardadas aún.'),
                React.createElement('p', { style: { fontSize: '0.8rem' } }, 'Haz clic en el marcador ⭐ durante la práctica para guardar palabras difíciles.')
            ),
            bookmarkedCards.length > 0 && React.createElement('div', { style: { display: 'grid', gap: 8 } },
                bookmarkedCards.map(function(card, idx) {
                    return React.createElement('div', {
                        key: idx,
                        style: { background: '#1e293b', borderRadius: 10, padding: 12, border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    },
                        React.createElement('div', null,
                            React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' } }, card.de),
                            React.createElement('div', { style: { color: '#64748b', fontSize: '0.75rem' } }, card.es)
                        ),
                        React.createElement('button', {
                            onClick: function() {
                                var newBm = bookmarks.filter(function(b) { return b !== card.de; });
                                setBookmarks(newBm);
                                localStorage.setItem('muller_article_bookmarks', JSON.stringify(newBm));
                            },
                            style: { background: 'transparent', border: '1px solid #334155', borderRadius: 8, color: '#ef4444', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem' }
                        }, 'Eliminar')
                    );
                })
            )
        );
    };

    // ─── Pantalla de selección de nivel ───
    if (!mode) {
        if (examCtx && examAutoLevel) return React.createElement('div', { className: 'p-10' });
        if (showBookmarks) return React.createElement(BookmarksView);

        var masteryCount = masteredArticles.length;
        var totalArt = progressMap ? Object.keys(progressMap).filter(function(k) { return k.startsWith('articulos::'); }).length : 0;

        return React.createElement('div', { style: styles.container },
            React.createElement('button', {
                onClick: onBack,
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: 14 }
            }, '← Volver'),

            // ─── Header ───
            React.createElement('div', { style: { textAlign: 'center', marginBottom: 20 } },
                React.createElement('div', { style: { fontSize: 40 } }, '📖'),
                React.createElement('div', { style: { fontSize: '1.4rem', fontWeight: 700, color: '#e2e8f0' } }, 'Artículos (DER/DIE/DAS)'),
                React.createElement('div', { style: { fontSize: '0.85rem', color: '#64748b', marginTop: 4 } },
                    'Domina el género de los sustantivos · ' + masteryCount + ' en memoria de oro · ' + totalArt + ' practicadas'
                )
            ),

            // ─── Filtros ───
            React.createElement('div', {
                style: Object.assign({}, styles.card, { marginBottom: 16, padding: 16, textAlign: 'left' })
            },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 10 } }, '🧠 Modo de filtro'),
                React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    ['smart','failed','difficult','weak','new'].map(function(f) {
                        var active = queueFilter === f;
                        var labels = { smart: '🧠 Smart', failed: '❌ Fallidas', difficult: '😰 Difíciles', weak: '⚠️ Débiles', new: '🆕 Nuevas' };
                        return React.createElement('button', {
                            key: f,
                            onClick: function() { setQueueFilter(f); },
                            style: Object.assign({}, styles.filterBtn,
                                active ? { background: '#06b6d4', color: 'white' } : { background: '#0f172a', color: '#94a3b8' }
                            )
                        }, labels[f]);
                    })
                ),
                // Modo escritura
                React.createElement('div', { style: { marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 } },
                    React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.8rem', color: '#94a3b8' } },
                        React.createElement('input', {
                            type: 'checkbox',
                            checked: writingMode,
                            onChange: function(e) { setWritingMode(e.target.checked); },
                            style: { accentColor: '#06b6d4' }
                        }),
                        '✍️ Modo escritura (escribe el artículo)'
                    )
                )
            ),

            // ─── Grid de niveles ───
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 14 } },
                ['A1','A2','B1','B2','C1','MIXTO'].map(function(lvl) {
                    var lvlData = M.getDefaultArticlesData ? M.getDefaultArticlesData().filter(function(d) { return d.levels && d.levels.includes(lvl); }) : [];
                    var colorMap = { A1: '#10b981', A2: '#06b6d4', B1: '#8b5cf6', B2: '#f59e0b', C1: '#f87171', MIXTO: '#ec4899' };
                    return React.createElement('div', {
                        key: lvl,
                        onClick: function() { loadData(lvl); },
                        style: Object.assign({}, styles.selectCard, { borderTop: '3px solid ' + colorMap[lvl] }),
                        onMouseEnter: function(e) { e.currentTarget.style.borderColor = colorMap[lvl]; e.currentTarget.style.transform = 'translateY(-3px)'; },
                        onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }
                    },
                        React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, lvl === 'MIXTO' ? '🎲' : '📚'),
                        React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' } }, lvl),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b' } }, lvlData.length + ' palabras')
                    );
                })
            ),

            // ─── Historia Actual ───
            React.createElement('div', {
                onClick: function() { loadData('historia'); },
                style: Object.assign({}, styles.selectCard, {
                    padding: 18, display: 'flex', alignItems: 'center', gap: 14,
                    background: 'linear-gradient(135deg, #2e1065, #1e293b)',
                    borderColor: '#7c3aed'
                }),
                onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#a78bfa'; e.currentTarget.style.transform = 'translateY(-2px)'; },
                onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.transform = 'translateY(0)'; }
            },
                React.createElement('div', { style: { fontSize: 32 } }, '📖'),
                React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem' } }, 'Historia Actual'),
                    React.createElement('div', { style: { fontSize: '0.75rem', color: '#a78bfa' } }, 'Vocabulario de la lección actual')
                ),
                React.createElement('div', { style: { color: '#a78bfa', fontSize: 20 } }, '→')
            ),

            // ─── Bookmarks ───
            bookmarks.length > 0 && React.createElement('div', {
                onClick: function() { setShowBookmarks(true); },
                style: Object.assign({}, styles.selectCard, {
                    padding: 18, display: 'flex', alignItems: 'center', gap: 14,
                    marginTop: 10,
                    borderColor: '#f59e0b'
                }),
                onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-2px)'; },
                onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)'; }
            },
                React.createElement('div', { style: { fontSize: 32 } }, '🔖'),
                React.createElement('div', { style: { flex: 1 } },
                    React.createElement('div', { style: { fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem' } }, 'Palabras Guardadas'),
                    React.createElement('div', { style: { fontSize: '0.75rem', color: '#fbbf24' } }, bookmarks.length + ' palabras marcadas')
                ),
                React.createElement('div', { style: { color: '#fbbf24', fontSize: 20 } }, '→')
            ),

            // ─── Consejo AI ───
            M.DeepSeek && M.DeepSeek.hasApiKey() && React.createElement('div', {
                style: Object.assign({}, styles.aiBox, { marginTop: 16, cursor: 'default' })
            },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
                    React.createElement('span', { style: { fontSize: 16 } }, '🤖'),
                    React.createElement('span', { style: { fontWeight: 600, color: '#06b6d4', fontSize: '0.85rem' } }, 'Tutor AI activado'),
                    React.createElement('span', { style: { background: '#065f46', color: '#10b981', fontSize: '0.65rem', padding: '2px 6px', borderRadius: 4, fontWeight: 600 } }, 'PREMIUM')
                ),
                React.createElement('div', { style: { fontSize: '0.75rem', color: '#94a3b8' } },
                    'DeepSeek te dará explicaciones automáticas cuando falles y ejemplos después de cada acierto.'
                )
            )
        );
    }

    // ─── Loading ───
    if (loading) return React.createElement('div', { style: Object.assign({}, styles.container, { paddingTop: 40 }) },
        React.createElement('div', { style: Object.assign({}, styles.loadingPulse, { height: 24, width: 200, borderRadius: 8, margin: '0 auto 16px' }) }),
        React.createElement('div', { style: Object.assign({}, styles.loadingPulse, { height: 200, width: '100%', borderRadius: 16 }) })
    );

    // ─── Session Summary ───
    if (showSessionSummary) return React.createElement(SessionSummary);

    // ─── Mazo completado ───
    if (queue.length === 0) return React.createElement('div', { style: Object.assign({}, styles.container, { textAlign: 'center', paddingTop: 40 }) },
        React.createElement('div', { style: { fontSize: 72, marginBottom: 12 } }, '🏆'),
        React.createElement('h2', { style: { fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginBottom: 8 } }, '¡Mazo completado!'),
        React.createElement('p', { style: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: 20 } }, 'Has visto todas las tarjetas de este nivel. ¡Excelente trabajo!'),
        React.createElement('button', {
            onClick: function() { setShowSessionSummary(true); },
            style: { background: '#06b6d4', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', marginRight: 10 }
        }, '📊 Ver resumen'),
        React.createElement('button', {
            onClick: function() { setMode(null); },
            style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }
        }, '🔄 Elegir otro nivel')
    );

    // ─── Tarjeta de práctica ───
    var current = queue[0];
    var wordWithoutArticle = current.de.split(' ').slice(1).join(' ');
    var article = current.de.split(' ')[0].toLowerCase();
    var examHideEs = !!(examCtx && !showTranslation && !feedback);

    // Estadísticas de esta palabra
    var wordId = 'articulos::' + current.de;
    var wordStats = progressMap[wordId] || {};
    var masteryLevel = M.calcMasteryLevel(wordStats);
    var masteryEmoji = M.getMasteryEmoji(masteryLevel);
    var masteryLabel = M.getMasteryLabel(masteryLevel);

    // Sprint
    var isSprintActive = focusSprint === 'active';

    return React.createElement('div', { style: Object.assign({}, styles.container, { position: 'relative' }) },
        // ─── Top bar ───
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('button', {
                onClick: examCtx ? function() { if (confirm('¿Abandonar el examen?')) onBack(); } : function() { setMode(null); setShowSessionSummary(true); },
                style: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem' }
            }, examCtx ? '← Salir' : '← Finalizar'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, 'Cola: ' + queue.length),
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, '·'),
                React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, 'Modo: ' + (mode || 'MIXTO'))
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

            // ─── Combo Streak ───
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
                title: isBookmarked() ? 'Quitar marcador' : 'Guardar palabra'
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
            // Indicador de examen
            examCtx ? React.createElement('div', { style: { fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 12px', borderRadius: 6, display: 'inline-block', marginBottom: 10 } },
                '📝 Examen en curso'
            ) : null,
            isSprintActive && React.createElement('div', { style: { fontSize: '0.72rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 12px', borderRadius: 6, display: 'inline-block', marginBottom: 10 } },
                '⚡ Sprint activo'
            ),

            // Palabra
            React.createElement('div', { style: styles.wordDisplay }, wordWithoutArticle),

            // Traducción
            examHideEs
                ? React.createElement('p', { style: { color: '#475569', marginBottom: 20, fontSize: '0.9rem', fontStyle: 'italic', border: '1px dashed #475569', borderRadius: 10, padding: '14px 10px' } },
                    'Traducción oculta — pide una pista arriba'
                )
                : React.createElement('p', { style: styles.translation }, '🇪🇸 ' + current.es),

            // ─── Modo Escritura ───
            writingMode && !feedback && React.createElement('form', {
                onSubmit: checkWriting,
                style: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }
            },
                React.createElement('input', {
                    ref: writeInputRef,
                    type: 'text',
                    value: writeInput,
                    onChange: function(e) { setWriteInput(e.target.value); },
                    placeholder: 'Escribe der/die/das...',
                    autoFocus: true,
                    style: {
                        background: '#0f172a', border: '2px solid #334155', borderRadius: 12,
                        padding: '14px 18px', color: '#e2e8f0', fontSize: '1.1rem',
                        fontWeight: 600, outline: 'none', width: 200,
                        textAlign: 'center'
                    },
                    onFocus: function(e) { e.target.style.borderColor = '#06b6d4'; },
                    onBlur: function(e) { e.target.style.borderColor = '#334155'; }
                }),
                React.createElement('button', {
                    type: 'submit',
                    style: {
                        background: '#06b6d4', color: 'white', border: 'none', borderRadius: 12,
                        padding: '14px 20px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
                    }
                }, '✓')
            ),

            // ─── Botones de artículo (si no hay feedback y NO escritura) ───
            !feedback && !writingMode
                ? React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16 } },
                    React.createElement('button', {
                        onClick: function() { check('der'); },
                        style: Object.assign({}, styles.btnArticle, { background: '#1e40af', color: '#bfdbfe' }),
                        onMouseEnter: function(e) { e.currentTarget.style.background = '#1d4ed8'; },
                        onMouseLeave: function(e) { e.currentTarget.style.background = '#1e40af'; }
                    }, '🔵 DER'),
                    React.createElement('button', {
                        onClick: function() { check('die'); },
                        style: Object.assign({}, styles.btnArticle, { background: '#991b1b', color: '#fecaca' }),
                        onMouseEnter: function(e) { e.currentTarget.style.background = '#b91c1c'; },
                        onMouseLeave: function(e) { e.currentTarget.style.background = '#991b1b'; }
                    }, '🔴 DIE'),
                    React.createElement('button', {
                        onClick: function() { check('das'); },
                        style: Object.assign({}, styles.btnArticle, { background: '#065f46', color: '#a7f3d0' }),
                        onMouseEnter: function(e) { e.currentTarget.style.background = '#047857'; },
                        onMouseLeave: function(e) { e.currentTarget.style.background = '#065f46'; }
                    }, '🟢 DAS')
                )

            // ─── Feedback ───
                : feedback && React.createElement('div', { style: { animation: 'zoomIn 0.2s ease' } },
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

                    // ─── REGLA DE TERMINACIÓN (siempre visible con fallback) ───
                    React.createElement('div', {
                        style: Object.assign({}, styles.ruleBox, {
                            borderColor: (feedback.rule || currentRule) ? ((feedback.rule || currentRule).color || '#fbbf24') : '#fbbf24',
                            animation: 'mullerRuleIn 0.35s ease-out'
                        })
                    },
                        (feedback.rule || currentRule)
                            ? React.createElement('div', null,
                                React.createElement('div', { style: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10 } },
                                    React.createElement('span', { style: { fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' } }, '📏 Regla de terminación:'),
                                    React.createElement('span', {
                                        style: Object.assign({}, styles.ruleEnding, {
                                            background: ((feedback.rule || currentRule).color || '#fbbf24') + '22',
                                            color: (feedback.rule || currentRule).color || '#fbbf24',
                                            border: '1px solid ' + ((feedback.rule || currentRule).color || '#fbbf24')
                                        })
                                    }, (feedback.rule || currentRule).ending),
                                    React.createElement('span', {
                                        style: Object.assign({}, styles.ruleArticle, {
                                            background: article === 'der' ? 'rgba(59, 130, 246, 0.2)' : article === 'die' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                            color: article === 'der' ? '#60a5fa' : article === 'die' ? '#f472b6' : '#34d399',
                                            border: '1px solid ' + (article === 'der' ? '#3b82f6' : article === 'die' ? '#ec4899' : '#10b981')
                                        })
                                    }, '→ ' + article.toUpperCase())
                                ),
                                React.createElement('div', { style: { color: '#f0f9ff', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: '10px 14px' } },
                                    (feedback.rule || currentRule).tip
                                )
                            )
                            : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                                React.createElement('span', { style: { fontSize: 28 } }, '💡'),
                                React.createElement('div', null,
                                    React.createElement('div', { style: { fontWeight: 700, color: '#fbbf24', fontSize: '0.85rem', marginBottom: 4 } }, 'Sin regla específica'),
                                    React.createElement('div', { style: { color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 } },
                                        'Esta palabra no coincide con las reglas de terminación (como -ung, -er, -chen, etc.) ' +
                                        'que determinan su género. ¡Apréndela de memoria como un bloque completo!'
                                    )
                                )
                            )
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

                    // ─── BOTÓN CONTINUAR (principal) ───
                    React.createElement('button', {
                        onClick: handleContinue,
                        style: Object.assign({}, styles.continueBtn, { marginBottom: 12 }),
                        onMouseEnter: function(e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5)'; },
                        onMouseLeave: function(e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.3)'; }
                    }, 'Continuar →'),

                    // ─── Dificultad (opcional, secundario) ───
                    React.createElement('div', { style: Object.assign({}, styles.difficultyRow, { marginBottom: 0 }) },
                        React.createElement('button', { onClick: function() { handleContinue(); }, style: styles.btnEasy }, '✅ Fácil'),
                        React.createElement('button', { onClick: function() { handleContinue(); }, style: styles.btnNormal }, '📌 Normal'),
                        React.createElement('button', { onClick: function() { handleContinue(); }, style: styles.btnDifficult }, '💪 Difícil')
                    ),

                    // ─── Botón "Ya me la sé" ───
                    !examCtx && React.createElement('button', {
                        onClick: handleMastered,
                        style: { flex: 1, background: 'linear-gradient(135deg, #065f46, #047857)', color: 'white', border: 'none', borderRadius: 10, padding: '12px 0', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', width: '100%', marginTop: 8 }
                    }, '🌟 ¡Ya me la sé!')
                ),

            // ─── Pie ───
            React.createElement('p', { style: { color: '#475569', fontSize: '0.72rem', marginTop: 14 } },
                'Restantes: ' + queue.length + ' · ' + (mode || 'MIXTO')
            )
        ),

        // ─── Sprint button (cuando no activo) ───
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
            !writingMode && React.createElement('span', null, '⌨️ 1=DER · 2=DIE · 3=DAS'),
            writingMode && React.createElement('span', null, '⌨️ Escribe der/die/das + Enter'),
            !feedback && React.createElement('span', null, '· Enter=primer botón'),
            React.createElement('span', null, '· ⭐=guardar')
        ),

        // ─── Efecto de keyboard ───
        React.createElement(KeyboardHandler, {
            onDer: function() { if (!feedback && queue.length > 0 && !writingMode) check('der'); },
            onDie: function() { if (!feedback && queue.length > 0 && !writingMode) check('die'); },
            onDas: function() { if (!feedback && queue.length > 0 && !writingMode) check('das'); },
            onEasy: function() { if (feedback) handleContinue(); },
            onNormal: function() { if (feedback) handleContinue(); },
            onDifficult: function() { if (feedback) handleContinue(); },
            onContinue: function() { if (feedback) handleContinue(); },
            onBookmark: toggleBookmark
        })
    );
};

// ─── Atajos de teclado ───
function KeyboardHandler({ onDer, onDie, onDas, onEasy, onNormal, onDifficult, onContinue, onBookmark }) {
    React.useEffect(function() {
        var handler = function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch (e.key) {
                case '1': onDer(); break;
                case '2': onDie(); break;
                case '3': onDas(); break;
                case '4': onEasy(); break;
                case '5': onNormal(); break;
                case '6': onDifficult(); break;
                case 'Enter': onContinue(); break;
                case 'b': case 'B': onBookmark(); break;
                default: break;
            }
        };
        window.addEventListener('keydown', handler);
        return function() { window.removeEventListener('keydown', handler); };
    }, [onDer, onDie, onDas, onEasy, onNormal, onDifficult, onContinue, onBookmark]);

    return null;
}

// Añadir estilos de animación
(function() {
    if (!document.getElementById('muller-article-styles')) {
        var style = document.createElement('style');
        style.id = 'muller-article-styles';
        style.textContent = `
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            @keyframes mullerPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
            @keyframes comboGlow { from { box-shadow: 0 0 15px rgba(245, 158, 11, 0.3); } to { box-shadow: 0 0 30px rgba(245, 158, 11, 0.6); } }
            @keyframes mullerRuleIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    }
})();