// ═══════════════════════════════════════════════════════════════
// PROFESOR PLAZA MÜLLER — EntrenamientoPanel (React sin JSX)
// ═══════════════════════════════════════════════════════════════
// Dependencias: React, window.Muller (entrenamientoHelpers)
// ═══════════════════════════════════════════════════════════════

(function() {
    "use strict";
    
    var S = {
        card: {
            background: '#1e293b',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            border: '1px solid #334155'
        },
        glowCard: {
            background: '#1e293b',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            border: '1px solid #334155',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        },
        statBox: {
            background: '#0f172a',
            borderRadius: 8,
            padding: 10,
            textAlign: 'center',
            border: '1px solid #1e293b'
        },
        btnPrimary: {
            padding: '10px 24px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem'
        },
        btnSecondary: {
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #475569',
            background: '#1e293b',
            color: '#e2e8f0',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: 500
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: 10,
            border: '2px solid #475569',
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: '1.1rem',
            outline: 'none',
            boxSizing: 'border-box'
        },
        tag: {
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 6,
            fontSize: '0.7rem',
            fontWeight: 600
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // ARTICLE PRACTICE — Práctica de artículos (DER/DIE/DAS)
    // ═══════════════════════════════════════════════════════════════
    function ArticlePractice({ mode, level, practiceType, onBack }) {
        var [cards, setCards] = React.useState([]);
        var [currentIndex, setCurrentIndex] = React.useState(0);
        var [inputValue, setInputValue] = React.useState('');
        var [feedback, setFeedback] = React.useState(null); // { correct: bool, answer: string }
        var [stats, setStats] = React.useState({ total: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0 });
        var [finished, setFinished] = React.useState(false);
        var [showTip, setShowTip] = React.useState(false);
        var [started, setStarted] = React.useState(false);

        function startPractice() {
            var data = window.Muller.loadArticlesData();
            if (!data || data.length === 0) {
                setCards([]);
                setStarted(true);
                return;
            }
            // Filtrar por modo
            var filtered = filterCards(data, mode, level);
            // Mezclar
            filtered = shuffleArray(filtered);
            setCards(filtered);
            setCurrentIndex(0);
            setInputValue('');
            setFeedback(null);
            setStats({ total: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0 });
            setFinished(false);
            setStarted(true);
        }

        function checkAnswer(userInput) {
            var card = cards[currentIndex];
            var userAns = userInput.toLowerCase().trim();
            var correctAns = card.article.toLowerCase().trim();
            var isCorrect = userAns === correctAns;

            // Actualizar feedback
            setFeedback({ correct: isCorrect, answer: correctAns, userAnswer: userInput.trim() });
            setInputValue('');

            // Actualizar estadísticas
            var newStats = {
                total: stats.total + 1,
                correct: stats.correct + (isCorrect ? 1 : 0),
                wrong: stats.wrong + (isCorrect ? 0 : 1),
                streak: isCorrect ? stats.streak + 1 : 0,
                bestStreak: Math.max(stats.bestStreak, isCorrect ? stats.streak + 1 : 0)
            };
            setStats(newStats);

            // Guardar progreso avanzado
            var progress = window.Muller.getAdvancedProgress();
            var key = 'articulos::' + card.article + '::' + card.de;
            var entry = progress[key] || { attempts: 0, correct: 0, errors: 0, consecutiveCorrect: 0, consecutiveErrors: 0 };
            entry.attempts = (entry.attempts || 0) + 1;
            if (isCorrect) {
                entry.correct = (entry.correct || 0) + 1;
                entry.consecutiveCorrect = (entry.consecutiveCorrect || 0) + 1;
                entry.consecutiveErrors = 0;
            } else {
                entry.errors = (entry.errors || 0) + 1;
                entry.consecutiveErrors = (entry.consecutiveErrors || 0) + 1;
                entry.consecutiveCorrect = 0;
            }
            entry.lastSeenAt = new Date().toISOString();
            progress[key] = entry;
            window.Muller.saveAdvancedProgress(progress);
            window.Muller.registerDailyAttempt();
            window.Muller.registerTrainingAttempt('articulos', isCorrect);
            window.dispatchEvent(new Event('advancedProgressUpdated'));

            // Siguiente con delay
            setTimeout(function() {
                if (currentIndex + 1 >= cards.length) {
                    setFinished(true);
                } else {
                    setCurrentIndex(currentIndex + 1);
                    setFeedback(null);
                    setShowTip(false);
                }
            }, isCorrect ? 600 : 1200);
        }

        function handleKeyDown(e) {
            if (e.key === 'Enter' && inputValue.trim() && !feedback) {
                checkAnswer(inputValue);
            }
        }

        function handleSkip() {
            checkAnswer('__skip__');
        }

        if (!started) {
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '📖'),
                    React.createElement('div', { style: { fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, 'Artículos DER/DIE/DAS'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: 20 } },
                        'Escribe el artículo correcto para cada sustantivo alemán'
                    ),
                    React.createElement('button', {
                        onClick: startPractice,
                        style: Object.assign({}, S.btnPrimary, { padding: '14px 40px', fontSize: '1rem' })
                    }, '🎯 Empezar')
                )
            );
        }

        if (finished) {
            var pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            var grade = pct >= 90 ? '🌟 Excelente!' : pct >= 75 ? '👏 Muy bien!' : pct >= 60 ? '👍 Bien' : pct >= 40 ? '📚 Sigue practicando' : '💪 Ánimo';
            var gradeColor = pct >= 90 ? '#10b981' : pct >= 75 ? '#06b6d4' : pct >= 60 ? '#f59e0b' : '#f87171';

            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 24 }) },
                    React.createElement('div', { style: { fontSize: 64, marginBottom: 8 } }, pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '💪'),
                    React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: gradeColor, marginBottom: 8 } }, grade),
                    React.createElement('div', { style: { fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 12 } },
                        stats.correct + '/' + stats.total + ' (' + pct + '%)'
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: 16, justifyContent: 'center', fontSize: '0.85rem', color: '#94a3b8' } },
                        React.createElement('span', null, '🔥 Racha máxima: ' + stats.bestStreak),
                        React.createElement('span', null, '✅ Aciertos: ' + stats.correct),
                        React.createElement('span', null, '❌ Fallos: ' + stats.wrong)
                    ),
                    React.createElement('button', {
                        onClick: function() { setFinished(false); setStarted(false); },
                        style: Object.assign({}, S.btnPrimary, { marginTop: 16 })
                    }, '🔄 Practicar otra vez')
                )
            );
        }

        if (cards.length === 0) {
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '📭'),
                    React.createElement('div', { style: { fontSize: '1.1rem', color: '#e2e8f0', marginBottom: 8 } }, 'No hay tarjetas disponibles'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8' } },
                        'Prueba con otro filtro o nivel, o carga más vocabulario.'
                    )
                )
            );
        }

        var currentCard = cards[currentIndex];
        var progressPct = Math.round((currentIndex / cards.length) * 100);

        return React.createElement('div', null,
            React.createElement('button', {
                onClick: onBack,
                style: Object.assign({}, S.btnSecondary, { marginBottom: 10 })
            }, '← Volver'),

            // Barra de progreso
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 10, padding: 10 }) },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem', color: '#94a3b8' } },
                    React.createElement('span', null, 'Tarjeta ' + (currentIndex + 1) + ' de ' + cards.length),
                    React.createElement('span', null, stats.correct + '✅ ' + stats.wrong + '❌')
                ),
                React.createElement('div', { style: { height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', { style: { height: '100%', width: progressPct + '%', background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', borderRadius: 3, transition: 'width 0.3s ease' } })
                ),
                stats.streak >= 3 && React.createElement('div', { style: { marginTop: 4, fontSize: '0.72rem', color: '#f59e0b', textAlign: 'center' } },
                    '🔥 Racha de ' + stats.streak + ' aciertos' + (stats.streak >= 5 ? ' ¡Imparable!' : '')
                )
            ),

            // Tarjeta principal
            React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32, borderColor: feedback ? (feedback.correct ? '#10b98144' : '#f8717144') : '#334155' }) },
                // Palabra en alemán
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, currentCard.de),
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: 20 } }, currentCard.es),

                // Nivel
                currentCard.level && React.createElement('div', { style: Object.assign({}, S.tag, { background: '#1e3a5f', color: '#60a5fa', marginBottom: 16 }) }, currentCard.level),

                // Input de respuesta
                !feedback && React.createElement('div', { style: { maxWidth: 300, margin: '0 auto' } },
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', marginBottom: 8 } }, '¿Cuál es el artículo?'),
                    React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 } },
                        ['der', 'die', 'das'].map(function(art) {
                            return React.createElement('button', {
                                key: art,
                                onClick: function() { checkAnswer(art); },
                                style: {
                                    padding: '12px 24px',
                                    borderRadius: 10,
                                    border: '2px solid #475569',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    minWidth: 80,
                                    transition: 'all 0.2s ease',
                                    textTransform: 'uppercase'
                                },
                                onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#06b6d4'; e.currentTarget.style.background = '#1e293b'; },
                                onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.background = '#0f172a'; }
                            }, art);
                        })
                    ),
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('button', {
                            onClick: handleSkip,
                            style: { background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }
                        }, 'Saltar →')
                    )
                ),

                // Feedback
                feedback && React.createElement('div', { style: { marginTop: 10 } },
                    React.createElement('div', {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: feedback.correct ? '#10b981' : '#f87171',
                            marginBottom: 8
                        }
                    }, feedback.correct ? '✅ ¡Correcto!' : '❌ ' + feedback.answer.toUpperCase()),
                    !feedback.correct && React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8' } },
                        'La respuesta correcta es: ',
                        React.createElement('span', { style: { color: '#10b981', fontWeight: 600 } }, feedback.answer.toUpperCase())
                    )
                )
            ),

            // Botón tip
            React.createElement('div', { style: { textAlign: 'center', marginTop: 10 } },
                React.createElement('button', {
                    onClick: function() { setShowTip(!showTip); },
                    style: { background: 'transparent', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }
                }, showTip ? 'Ocultar truco' : '💡 Mostrar truco'),
                showTip && React.createElement('div', {
                    style: {
                        marginTop: 8,
                        maxWidth: 400,
                        margin: '8px auto 0',
                        background: '#0f172a',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: '0.8rem',
                        color: '#fbbf24',
                        border: '1px solid rgba(251, 191, 36, 0.2)'
                    }
                }, getArticleTip(currentCard))
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // CLOUD PRACTICE — Práctica de Verbos+Prep y Preposiciones
    // ═══════════════════════════════════════════════════════════════
    function CloudPractice({ mode, level, practiceType, onBack }) {
        var isVerbPrep = practiceType === 'verbprep';
        var [cards, setCards] = React.useState([]);
        var [currentIndex, setCurrentIndex] = React.useState(0);
        var [inputValue, setInputValue] = React.useState('');
        var [feedback, setFeedback] = React.useState(null);
        var [stats, setStats] = React.useState({ total: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0 });
        var [finished, setFinished] = React.useState(false);
        var [started, setStarted] = React.useState(false);
        var [showTip, setShowTip] = React.useState(false);

        function startPractice() {
            var data = isVerbPrep ? window.Muller.loadVerbPrepData() : window.Muller.loadPrepositionData();
            if (!data || data.length === 0) {
                setCards([]);
                setStarted(true);
                return;
            }
            var filtered = shuffleArray(data);
            setCards(filtered);
            setCurrentIndex(0);
            setInputValue('');
            setFeedback(null);
            setStats({ total: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0 });
            setFinished(false);
            setStarted(true);
        }

        function getCorrectAnswer(card) {
            if (isVerbPrep) {
                return card.prep || '';
            }
            return card.case || '';
        }

        function checkAnswer(userInput) {
            var card = cards[currentIndex];
            var correctAns = getCorrectAnswer(card).toLowerCase().trim();
            var userAns = userInput.toLowerCase().trim();
            
            // Normalizar comparación
            var normCorrect = correctAns.replace(/[-\s]/g, '').toLowerCase();
            var normUser = userAns.replace(/[-\s]/g, '').toLowerCase();
            var isCorrect = normUser === normCorrect || userAns === correctAns;

            setFeedback({
                correct: isCorrect,
                answer: getCorrectAnswer(card),
                userAnswer: userInput.trim(),
                type: isVerbPrep ? 'prep' : 'case'
            });
            setInputValue('');

            var newStats = {
                total: stats.total + 1,
                correct: stats.correct + (isCorrect ? 1 : 0),
                wrong: stats.wrong + (isCorrect ? 0 : 1),
                streak: isCorrect ? stats.streak + 1 : 0,
                bestStreak: Math.max(stats.bestStreak, isCorrect ? stats.streak + 1 : 0)
            };
            setStats(newStats);

            // Guardar progreso
            var progress = window.Muller.getAdvancedProgress();
            var prefix = isVerbPrep ? 'verbos' : 'preposiciones';
            var key = prefix + '::' + card.de;
            var entry = progress[key] || { attempts: 0, correct: 0, errors: 0 };
            entry.attempts = (entry.attempts || 0) + 1;
            if (isCorrect) {
                entry.correct = (entry.correct || 0) + 1;
                entry.consecutiveErrors = 0;
                entry.consecutiveCorrect = (entry.consecutiveCorrect || 0) + 1;
            } else {
                entry.errors = (entry.errors || 0) + 1;
                entry.consecutiveErrors = (entry.consecutiveErrors || 0) + 1;
                entry.consecutiveCorrect = 0;
            }
            entry.lastSeenAt = new Date().toISOString();
            progress[key] = entry;
            window.Muller.saveAdvancedProgress(progress);
            window.Muller.registerDailyAttempt();
            window.Muller.registerTrainingAttempt(isVerbPrep ? 'verbos' : 'preposiciones', isCorrect);
            window.dispatchEvent(new Event('advancedProgressUpdated'));

            setTimeout(function() {
                if (currentIndex + 1 >= cards.length) {
                    setFinished(true);
                } else {
                    setCurrentIndex(currentIndex + 1);
                    setFeedback(null);
                    setShowTip(false);
                }
            }, isCorrect ? 600 : 1200);
        }

        function handleKeyDown(e) {
            if (e.key === 'Enter' && inputValue.trim() && !feedback) {
                checkAnswer(inputValue);
            }
        }

        function handleSkip() {
            checkAnswer('__skip__');
        }

        if (!started) {
            var title = isVerbPrep ? 'Verbos + Preposición' : 'Preposiciones + Caso';
            var icon = isVerbPrep ? '🔗' : '📍';
            var desc = isVerbPrep ? 'Escribe la preposición correcta para cada verbo' : 'Escribe el caso correcto (Akkusativ/Dativ/Genitiv) para cada preposición';

            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, icon),
                    React.createElement('div', { style: { fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, title),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: 20 } }, desc),
                    React.createElement('button', {
                        onClick: startPractice,
                        style: Object.assign({}, S.btnPrimary, { padding: '14px 40px', fontSize: '1rem' })
                    }, '🎯 Empezar')
                )
            );
        }

        if (finished) {
            var pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            var grade = pct >= 90 ? '🌟 Excelente!' : pct >= 75 ? '👏 Muy bien!' : pct >= 60 ? '👍 Bien' : pct >= 40 ? '📚 Sigue practicando' : '💪 Ánimo';
            var gradeColor = pct >= 90 ? '#10b981' : pct >= 75 ? '#06b6d4' : pct >= 60 ? '#f59e0b' : '#f87171';

            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 24 }) },
                    React.createElement('div', { style: { fontSize: 64, marginBottom: 8 } }, pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '💪'),
                    React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: gradeColor, marginBottom: 8 } }, grade),
                    React.createElement('div', { style: { fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 12 } },
                        stats.correct + '/' + stats.total + ' (' + pct + '%)'
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: 16, justifyContent: 'center', fontSize: '0.85rem', color: '#94a3b8' } },
                        React.createElement('span', null, '🔥 Racha máxima: ' + stats.bestStreak),
                        React.createElement('span', null, '✅ Aciertos: ' + stats.correct),
                        React.createElement('span', null, '❌ Fallos: ' + stats.wrong)
                    ),
                    React.createElement('button', {
                        onClick: function() { setFinished(false); setStarted(false); },
                        style: Object.assign({}, S.btnPrimary, { marginTop: 16 })
                    }, '🔄 Practicar otra vez')
                )
            );
        }

        if (cards.length === 0) {
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '📭'),
                    React.createElement('div', { style: { fontSize: '1.1rem', color: '#e2e8f0', marginBottom: 8 } }, 'No hay tarjetas disponibles'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8' } },
                        'Carga más vocabulario en los archivos JSON.'
                    )
                )
            );
        }

        var currentCard = cards[currentIndex];
        var progressPct = Math.round((currentIndex / cards.length) * 100);

        // Opciones posibles según tipo
        var options = [];
        if (isVerbPrep) {
            options = extractUniquePreps(cards);
        } else {
            options = ['Akkusativ', 'Dativ', 'Genitiv', 'Akkusativ/Dativ'];
        }

        var promptText = isVerbPrep ? '¿Qué preposición va con este verbo?' : '¿Qué caso rige esta preposición?';

        return React.createElement('div', null,
            React.createElement('button', {
                onClick: onBack,
                style: Object.assign({}, S.btnSecondary, { marginBottom: 10 })
            }, '← Volver'),

            // Barra de progreso
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 10, padding: 10 }) },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem', color: '#94a3b8' } },
                    React.createElement('span', null, 'Tarjeta ' + (currentIndex + 1) + ' de ' + cards.length),
                    React.createElement('span', null, stats.correct + '✅ ' + stats.wrong + '❌')
                ),
                React.createElement('div', { style: { height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', { style: { height: '100%', width: progressPct + '%', background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', borderRadius: 3, transition: 'width 0.3s ease' } })
                ),
                stats.streak >= 3 && React.createElement('div', { style: { marginTop: 4, fontSize: '0.72rem', color: '#f59e0b', textAlign: 'center' } },
                    '🔥 Racha de ' + stats.streak + ' aciertos' + (stats.streak >= 5 ? ' ¡Imparable!' : '')
                )
            ),

            // Tarjeta principal
            React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32, borderColor: feedback ? (feedback.correct ? '#10b98144' : '#f8717144') : '#334155' }) },
                // Palabra en alemán
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, currentCard.de),
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: 20 } }, currentCard.es),

                // Input de respuesta
                !feedback && React.createElement('div', { style: { maxWidth: 400, margin: '0 auto' } },
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', marginBottom: 8 } }, promptText),

                    // Opciones como botones (para preposiciones: caso; para verbos: preps disponibles)
                    React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 } },
                        options.map(function(opt) {
                            return React.createElement('button', {
                                key: opt,
                                onClick: function() { checkAnswer(opt); },
                                style: {
                                    padding: '10px 20px',
                                    borderRadius: 10,
                                    border: '2px solid #475569',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                },
                                onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = '#1e293b'; },
                                onMouseLeave: function(e) { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.background = '#0f172a'; }
                            }, opt);
                        })
                    ),
                    React.createElement('div', { style: { textAlign: 'center' } },
                        React.createElement('button', {
                            onClick: handleSkip,
                            style: { background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }
                        }, 'Saltar →')
                    )
                ),

                // Feedback
                feedback && React.createElement('div', { style: { marginTop: 10 } },
                    React.createElement('div', {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: feedback.correct ? '#10b981' : '#f87171',
                            marginBottom: 8
                        }
                    }, feedback.correct ? '✅ ¡Correcto!' : '❌ ' + feedback.answer),
                    !feedback.correct && React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8' } },
                        'La respuesta correcta es: ',
                        React.createElement('span', { style: { color: '#10b981', fontWeight: 600 } }, feedback.answer)
                    )
                )
            ),

            // Tip
            React.createElement('div', { style: { textAlign: 'center', marginTop: 10 } },
                React.createElement('button', {
                    onClick: function() { setShowTip(!showTip); },
                    style: { background: 'transparent', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }
                }, showTip ? 'Ocultar truco' : '💡 Mostrar truco'),
                showTip && React.createElement('div', {
                    style: {
                        marginTop: 8,
                        maxWidth: 400,
                        margin: '8px auto 0',
                        background: '#0f172a',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: '0.8rem',
                        color: '#fbbf24',
                        border: '1px solid rgba(251, 191, 36, 0.2)'
                    }
                }, getCloudPracticeTip(currentCard, isVerbPrep))
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    function filterCards(data, mode, level) {
        if (!data || data.length === 0) return [];
        
        var result = data;
        
        // Filtrar por nivel
        if (level && level !== 'MIXTO') {
            result = result.filter(function(c) { return c.level === level; });
        }
        
        // Si es modo smart o no hay modo, devolver todas
        if (!mode || mode === 'smart') return result;
        
        // Usar progreso para filtrar
        var progress = window.Muller.getAdvancedProgress();
        
        if (mode === 'failed' || mode === 'difficult') {
            result = result.filter(function(c) {
                var key = 'articulos::' + c.article + '::' + c.de;
                var stats = progress[key];
                return stats && (stats.errors || 0) > (stats.correct || 0);
            });
        } else if (mode === 'weak') {
            result = result.filter(function(c) {
                var key = 'articulos::' + c.article + '::' + c.de;
                var level_ = window.Muller.getMasteryLevel ? window.Muller.getMasteryLevel(progress[key]) : 0;
                return level_ > 0 && level_ < 3;
            });
        } else if (mode === 'new') {
            result = result.filter(function(c) {
                var key = 'articulos::' + c.article + '::' + c.de;
                return !progress[key];
            });
        } else if (mode === 'mastered') {
            result = result.filter(function(c) {
                var key = 'articulos::' + c.article + '::' + c.de;
                var level_ = window.Muller.getMasteryLevel ? window.Muller.getMasteryLevel(progress[key]) : 0;
                return level_ >= 5;
            });
        } else if (mode === 'learning') {
            result = result.filter(function(c) {
                var key = 'articulos::' + c.article + '::' + c.de;
                var stats = progress[key];
                return stats && stats.attempts > 0 && stats.attempts < 5;
            });
        }
        
        // Si el filtro devuelve vacío, dar todas
        if (result.length === 0) result = data;
        
        return result;
    }

    function shuffleArray(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
        return a;
    }

    function extractUniquePreps(cards) {
        var preps = {};
        cards.forEach(function(c) {
            if (c.prep) preps[c.prep] = true;
        });
        return Object.keys(preps).sort();
    }

    function getArticleTip(card) {
        var word = (card.de || '').toLowerCase();
        var tips = [];

        // Reglas generales según terminación
        if (word.endsWith('ung') || word.endsWith('heit') || word.endsWith('keit') || word.endsWith('schaft') || word.endsWith('ion') || word.endsWith('tät') || word.endsWith('ur')) {
            tips.push('🔵 Palabras con -ung, -heit, -keit, -schaft, -ion suelen ser femeninas (die)');
        }
        if (word.endsWith('chen') || word.endsWith('lein') || word.endsWith('ment') || word.endsWith('nis')) {
            tips.push('🟢 Palabras con -chen, -lein suelen ser neutras (das)');
        }
        if (word.endsWith('er') || word.endsWith('ismus') || word.endsWith('ling') || word.endsWith('or')) {
            tips.push('🔴 Palabras con -er, -ismus, -ling suelen ser masculinas (der)');
        }

        // Días, meses, estaciones → masculino
        if (/montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|frühling|sommer|herbst|winter/i.test(word)) {
            tips.push('🔴 Días, meses y estaciones son masculinos (der)');
        }

        if (tips.length === 0) {
            tips.push('💡 Memoriza: cada sustantivo tiene su género. ¡La práctica constante ayuda!');
        }

        return tips[0];
    }

    function getCloudPracticeTip(card, isVerbPrep) {
        if (isVerbPrep) {
            return '💡 Recuerda: ' + card.de + ' rige la preposición "' + (card.prep || '?') + '". ¡Practica hasta que salga natural!';
        }
        return '💡 La preposición "' + card.de + '" rige caso ' + (card.case || '?') + '. ¡Asocia cada preposición con su caso!';
    }

    // ═══════════════════════════════════════════════════════════════
    // DASHBOARD SECTION
    // ═══════════════════════════════════════════════════════════════
    function DashboardSection({ dashboard, onStartPractice, onStartExam, onViewPlan, onViewChallenge }) {
        // ... (everything that was there before)
        var quote = window.Muller.getDailyMotivation ? window.Muller.getDailyMotivation() : null;
        
        return React.createElement('div', null,
            // Cita motivacional
            quote && React.createElement('div', {
                style: Object.assign({}, S.card, {
                    marginBottom: 16,
                    textAlign: 'center',
                    borderColor: 'rgba(251, 191, 36, 0.2)'
                })
            },
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#fbbf24', fontStyle: 'italic', marginBottom: 4 } },
                    '"' + quote.de + '"'
                ),
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#a78bfa' } }, quote.es)
            ),
            
            // Tarjetas de acción rápida
            React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16 } },
                React.createElement('div', {
                    onClick: onStartPractice,
                    style: Object.assign({}, S.glowCard, { flex: 1, textAlign: 'center', cursor: 'pointer', padding: 20, borderColor: '#06b6d444' })
                },
                    React.createElement('div', { style: { fontSize: 32 } }, '🏋️'),
                    React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', marginTop: 4 } }, 'Entrenar'),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Práctica dirigida')
                ),
                React.createElement('div', {
                    onClick: onStartExam,
                    style: Object.assign({}, S.glowCard, { flex: 1, textAlign: 'center', cursor: 'pointer', padding: 20, borderColor: '#8b5cf644' })
                },
                    React.createElement('div', { style: { fontSize: 32 } }, '📝'),
                    React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', marginTop: 4 } }, 'Examen'),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Simulación TELC')
                ),
                React.createElement('div', {
                    onClick: onViewPlan,
                    style: Object.assign({}, S.glowCard, { flex: 1, textAlign: 'center', cursor: 'pointer', padding: 20, borderColor: '#10b98144' })
                },
                    React.createElement('div', { style: { fontSize: 32 } }, '📋'),
                    React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', marginTop: 4 } }, 'Plan'),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Plan de estudio')
                ),
                React.createElement('div', {
                    onClick: onViewChallenge,
                    style: Object.assign({}, S.glowCard, { flex: 1, textAlign: 'center', cursor: 'pointer', padding: 20, borderColor: '#f59e0b44' })
                },
                    React.createElement('div', { style: { fontSize: 32 } }, '🎯'),
                    React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', marginTop: 4 } }, 'Desafío'),
                    React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, 'Diario')
                )
            ),
            
            // Stats principales
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                    [
                        { label: 'Total intentos', value: dashboard.totalAttempts, icon: '🎯' },
                        { label: 'Precisión', value: dashboard.accuracy + '%', icon: '📊' },
                        { label: 'Débiles', value: dashboard.weak, icon: '⚠️' },
                        { label: 'Racha', value: dashboard.streakDays + ' días', icon: '🔥' },
                        { label: 'Dominadas', value: dashboard.mastered, icon: '👑' },
                        { label: 'Nuevas', value: dashboard.newCount, icon: '🆕' }
                    ].map(function(stat) {
                        return React.createElement('div', {
                            key: stat.label,
                            style: Object.assign({}, S.statBox, { flex: 1, minWidth: 85 })
                        },
                            React.createElement('div', { style: { fontSize: 18 } }, stat.icon),
                            React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' } }, stat.value),
                            React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, stat.label)
                        );
                    })
                )
            ),
            
            // Stats por pilar
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10 } }, '📊 Progreso por tipo'),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                    [
                        { key: 'art', label: '📖 Artículos', color: '#06b6d4', data: dashboard.art },
                        { key: 'verb', label: '🔗 Verbos+Prep', color: '#8b5cf6', data: dashboard.verb },
                        { key: 'prep', label: '📍 Preposiciones', color: '#10b981', data: dashboard.prep }
                    ].map(function(pillar) {
                        var ratio = pillar.data.attempts > 0 ? Math.round((pillar.data.correct / pillar.data.attempts) * 100) : 0;
                        return React.createElement('div', { key: pillar.key, style: { background: '#0f172a', borderRadius: 8, padding: 10 } },
                            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.78rem' } },
                                React.createElement('span', { style: { color: pillar.color } }, pillar.label),
                                React.createElement('span', { style: { color: '#e2e8f0' } }, ratio + '% (' + pillar.data.correct + '/' + pillar.data.attempts + ')')
                            ),
                            React.createElement('div', { style: { height: 6, background: '#1e293b', borderRadius: 3, overflow: 'hidden' } },
                                React.createElement('div', { style: { height: '100%', width: ratio + '%', background: pillar.color, borderRadius: 3, transition: 'width 0.5s ease' } })
                            )
                        );
                    })
                )
            ),
            
            // Logros recientes
            React.createElement(AchievementsSection, null)
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // ACHIEVEMENTS SECTION
    // ═══════════════════════════════════════════════════════════════
    function AchievementsSection() {
        var achievements = window.Muller.getAchievements ? window.Muller.getAchievements() : [];
        var total = achievements.length;
        var earned = achievements.filter(function(a) { return a.unlocked; }).length;

        return React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
            React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', null, '🏅'),
                'Logros',
                React.createElement('span', { style: { marginLeft: 'auto', fontSize: '0.78rem', color: '#64748b' } }, earned + '/' + total)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
                achievements.slice(0, 8).map(function(a, i) {
                    var earned_ = a.unlocked;
                    var def = window.Muller.ACHIEVEMENTS_DEFINITIONS ? window.Muller.ACHIEVEMENTS_DEFINITIONS[a.id] || { icon: '🏅', title: a.id, desc: '' } : { icon: '🏅', title: a.id, desc: '' };
                    return React.createElement('div', {
                        key: a.id,
                        style: Object.assign({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 12px',
                            borderRadius: 8,
                            fontSize: '0.75rem',
                            border: '1px solid #334155'
                        }, earned_ ? { background: '#1e3a5f', borderColor: '#3b82f644' } : {
                            background: '#0f172a',
                            borderColor: '#1e293b',
                            opacity: 0.55,
                            filter: 'grayscale(0.8)'
                        })
                    },
                        React.createElement('span', null, earned_ ? def.icon : '🔒'),
                        React.createElement('div', null,
                            React.createElement('div', { style: { fontWeight: 600, color: earned_ ? '#fbbf24' : '#64748b' } }, def.title),
                            React.createElement('div', { style: { fontSize: '0.7rem', color: earned_ ? '#a78bfa' : '#475569' } }, earned_ ? '✓ ' + def.desc : def.desc)
                        )
                    );
                })
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // STUDY PLAN SECTION
    // ═══════════════════════════════════════════════════════════════
    function StudyPlanSection({ onBack }) {
        var [plan, setPlan] = React.useState(null);
        var [loading, setLoading] = React.useState(false);

        function generatePlan() {
            setLoading(true);
            // Small delay to show loading
            setTimeout(function() {
                var p = window.Muller.generateStudyPlan ? window.Muller.generateStudyPlan() : null;
                setPlan(p);
                setLoading(false);
            }, 300);
        }

        return React.createElement('div', null,
            React.createElement('button', {
                onClick: onBack,
                style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
            }, '← Volver al Dashboard'),

            React.createElement('div', { style: Object.assign({}, S.glowCard, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 } }, '📋 Plan de Estudio Personalizado'),
                React.createElement('div', { style: { fontSize: '0.82rem', color: '#94a3b8', marginBottom: 16 } },
                    'Basado en tu rendimiento y áreas débiles, generamos un plan diario para optimizar tu aprendizaje.'
                ),

                !plan && React.createElement('button', {
                    onClick: generatePlan,
                    disabled: loading,
                    style: Object.assign({}, S.btnPrimary, { opacity: loading ? 0.7 : 1 })
                }, loading ? '⏳ Generando...' : '🎯 Generar mi plan'),

                plan && React.createElement('div', null,
                    React.createElement('div', { style: { background: '#0f172a', borderRadius: 8, padding: 12, marginBottom: 12 } },
                        React.createElement('div', { style: { fontSize: '0.85rem', color: '#10b981', fontWeight: 600, marginBottom: 4 } }, '📊 Resumen'),
                        React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8' } },
                            'Enfoque: ' + (plan.focus || 'General') + ' | Nivel estimado: ' + (plan.level || 'A1')
                        )
                    ),
                    plan.steps && plan.steps.map(function(step, i) {
                        return React.createElement('div', {
                            key: i,
                            style: {
                                background: '#0f172a',
                                borderRadius: 8,
                                padding: 12,
                                marginBottom: 8,
                                borderLeft: '3px solid ' + (step.priority === 'alta' ? '#f87171' : step.priority === 'media' ? '#f59e0b' : '#06b6d4')
                            }
                        },
                            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' } }, step.title || 'Paso ' + (i + 1)),
                                React.createElement('span', { style: Object.assign({}, S.tag, { 
                                    background: step.priority === 'alta' ? '#3b1f1f' : step.priority === 'media' ? '#3b2f1f' : '#1e3a5f',
                                    color: step.priority === 'alta' ? '#f87171' : step.priority === 'media' ? '#f59e0b' : '#60a5fa'
                                }) }, (step.priority || 'normal').toUpperCase())
                            ),
                            React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8', marginBottom: 4 } }, step.description || ''),
                            step.duration && React.createElement('div', { style: { fontSize: '0.72rem', color: '#64748b' } }, '⏱ ' + step.duration)
                        );
                    }),
                    React.createElement('button', {
                        onClick: generatePlan,
                        style: Object.assign({}, S.btnSecondary, { marginTop: 8 })
                    }, '🔄 Regenerar plan')
                )
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // DAILY CHALLENGE SECTION
    // ═══════════════════════════════════════════════════════════════
    function DailyChallengeSection({ onBack, dashboard }) {
        var challenge = window.Muller.generateDailyChallenge ? window.Muller.generateDailyChallenge() : null;

        if (!challenge) {
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver al Dashboard'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 24 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '🎯'),
                    React.createElement('div', { style: { fontSize: '1.1rem', color: '#e2e8f0' } }, 'No hay desafío disponible hoy')
                )
            );
        }

        return React.createElement('div', null,
            React.createElement('button', {
                onClick: onBack,
                style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
            }, '← Volver al Dashboard'),

            React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 24 }) },
                React.createElement('div', { style: { fontSize: 48, marginBottom: 8 } }, challenge.reward || '🎯'),
                React.createElement('div', { style: { fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 4 } }, challenge.title || 'Desafío diario'),
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: 16 } }, challenge.desc || 'Completa el desafío'),
                React.createElement('div', { style: { marginBottom: 12 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: 4 } },
                        React.createElement('span', null, 'Progreso: ' + (challenge.progress || 0) + '/' + challenge.target),
                        React.createElement('span', null, Math.round(((challenge.progress || 0) / challenge.target) * 100) + '%')
                    ),
                    React.createElement('div', { style: { height: 8, background: '#0f172a', borderRadius: 4, overflow: 'hidden' } },
                        React.createElement('div', {
                            style: {
                                height: '100%',
                                width: Math.min(100, ((challenge.progress || 0) / challenge.target) * 100) + '%',
                                background: challenge.completed ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #f97316)',
                                borderRadius: 4,
                                transition: 'width 0.5s ease'
                            }
                        })
                    )
                ),
                challenge.completed && React.createElement('div', { style: { fontSize: '0.9rem', color: '#10b981', fontWeight: 600 } }, '✅ ¡Completado!')
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // PRACTICE SELECTOR – Elige qué practicar
    // ═══════════════════════════════════════════════════════════════
    function PracticeSelector({ onBack, dashboard }) {
        var [selectedMode, setSelectedMode] = React.useState('smart');
        var [selectedLevel, setSelectedLevel] = React.useState('MIXTO');
        var [activePractice, setActivePractice] = React.useState(null);
        
        var practiceTypes = [
            { id: 'articles', icon: '📖', title: 'Artículos (DER/DIE/DAS)', desc: 'Aprende el género de los sustantivos alemanes con algoritmo adaptativo.', color: '#06b6d4', component: 'ArticlePractice' },
            { id: 'verbprep', icon: '🔗', title: 'Verbos + Preposición', desc: 'Domina las colocaciones verbo-preposición imprescindibles para TELC.', color: '#8b5cf6', component: 'CloudPractice' },
            { id: 'prepositions', icon: '📍', title: 'Preposiciones + Caso', desc: 'Practica qué caso rige cada preposición (Akkusativ, Dativ, Genitiv).', color: '#10b981', component: 'CloudPractice' }
        ];
        
        var filterModes = [
            { id: 'smart', icon: '🧠', label: 'Smart' },
            { id: 'failed', icon: '❌', label: 'Fallidas' },
            { id: 'difficult', icon: '😰', label: 'Difíciles' },
            { id: 'weak', icon: '⚠️', label: 'Débiles' },
            { id: 'new', icon: '🆕', label: 'Nuevas' },
            { id: 'learning', icon: '🌱', label: 'Aprendiendo' },
            { id: 'mastered', icon: '👑', label: 'Dominadas' }
        ];
        
        var levels = ['MIXTO', 'A1', 'A2', 'B1', 'B2', 'C1'];
        
        if (activePractice) {
            var Component = window.Muller[activePractice.component];
            if (Component) {
                return React.createElement(Component, {
                    mode: activePractice.id === 'articles' ? selectedMode : null,
                    level: activePractice.id === 'articles' ? selectedLevel : null,
                    practiceType: activePractice.id,
                    onBack: function() { setActivePractice(null); }
                });
            }
            return React.createElement('div', null,
                React.createElement('div', { style: { color: '#f87171', marginBottom: 12 } }, '❌ Componente ' + activePractice.component + ' no encontrado'),
                React.createElement('button', { onClick: function() { setActivePractice(null); }, style: S.btnSecondary }, '← Volver')
            );
        }
        
        return React.createElement('div', null,
            React.createElement('button', {
                onClick: onBack,
                style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
            }, '← Volver al Dashboard'),
            
            // Selector de modo de filtro
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10 } }, '🧠 Modo de filtro'),
                React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    filterModes.map(function(m) {
                        var active = selectedMode === m.id;
                        return React.createElement('button', {
                            key: m.id,
                            onClick: function() { setSelectedMode(m.id); },
                            style: Object.assign({
                                padding: '6px 14px',
                                borderRadius: 8,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                border: 'none',
                                transition: 'all 0.2s ease'
                            }, active ? { background: '#06b6d4', color: 'white' } : { background: '#0f172a', color: '#94a3b8' })
                        },
                            React.createElement('span', null, m.icon),
                            m.label
                        );
                    })
                )
            ),
            
            // Selector de nivel
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10 } }, '📊 Nivel'),
                React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    levels.map(function(lv) {
                        var active = selectedLevel === lv;
                        return React.createElement('button', {
                            key: lv,
                            onClick: function() { setSelectedLevel(lv); },
                            style: Object.assign({
                                padding: '6px 16px',
                                borderRadius: 8,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                border: 'none',
                                transition: 'all 0.2s ease'
                            }, active ? { background: '#8b5cf6', color: 'white' } : { background: '#0f172a', color: '#94a3b8' })
                        }, lv);
                    })
                )
            ),
            
            // Tipos de práctica
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
                practiceTypes.map(function(p) {
                    var pillarStats = p.id === 'articles' ? dashboard.art : (p.id === 'verbprep' ? dashboard.verb : dashboard.prep);
                    var ratio = pillarStats.attempts > 0 ? Math.round(((pillarStats.correct || 0) / pillarStats.attempts) * 100) : 0;
                    var masteryEmoji = window.Muller.getMasteryEmoji ? window.Muller.getMasteryEmoji(ratio >= 90 ? 5 : ratio >= 75 ? 4 : ratio >= 50 ? 3 : ratio >= 25 ? 2 : 1) : '';
                    
                    return React.createElement('div', {
                        key: p.id,
                        onClick: function() { setActivePractice(p); },
                        style: Object.assign({}, S.glowCard, {
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            borderColor: p.color + '44',
                            transition: 'all 0.2s ease'
                        }),
                        onMouseEnter: function(e) { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = 'translateY(-2px)'; },
                        onMouseLeave: function(e) { e.currentTarget.style.borderColor = p.color + '44'; e.currentTarget.style.transform = 'translateY(0)'; }
                    },
                        React.createElement('div', { style: { fontSize: 32, minWidth: 50, textAlign: 'center' } }, p.icon),
                        React.createElement('div', { style: { flex: 1 } },
                            React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: 2 } },
                                p.title,
                                React.createElement('span', { style: { marginLeft: 6 } }, masteryEmoji)
                            ),
                            React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8', marginBottom: 4 } }, p.desc),
                            React.createElement('div', { style: { display: 'flex', gap: 10, fontSize: '0.72rem', color: p.color } },
                                React.createElement('span', null, '📚 ' + pillarStats.total + ' palabras'),
                                React.createElement('span', null, '🎯 ' + pillarStats.attempts + ' intentos'),
                                React.createElement('span', null, '📊 ' + ratio + '%')
                            )
                        ),
                        React.createElement('div', { style: { color: '#64748b', fontSize: 20 } }, '→')
                    );
                })
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // EXAM RUNNER – Examen Mixto TELC
    // ═══════════════════════════════════════════════════════════════
    function ExamRunner({ onBack, dashboard }) {
        var [cards, setCards] = React.useState([]);
        var [currentIndex, setCurrentIndex] = React.useState(0);
        var [answers, setAnswers] = React.useState([]);
        var [finished, setFinished] = React.useState(false);
        var [startTime, setStartTime] = React.useState(null);
        var [timeSpent, setTimeSpent] = React.useState(0);
        var [numCards, setNumCards] = React.useState(45);
        var [started, setStarted] = React.useState(false);
        var [inputValue, setInputValue] = React.useState('');
        var [showTip, setShowTip] = React.useState(false);
        var [currentStreak, setCurrentStreak] = React.useState(0);
        
        function startExam() {
            var generated = window.Muller.generateMixedExam(numCards, 'smart');
            setCards(generated);
            setCurrentIndex(0);
            setAnswers([]);
            setFinished(false);
            setStartTime(Date.now());
            setStarted(true);
            setInputValue('');
            setCurrentStreak(0);
        }
        
        // Timer
        React.useEffect(function() {
            if (!started || finished || !startTime) return;
            var interval = setInterval(function() {
                setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return function() { clearInterval(interval); };
        }, [started, finished, startTime]);
        
        function answerCurrent(ans) {
            var currentCard = cards[currentIndex];
            var correct = ans.toLowerCase().trim() === (currentCard.answer || '').toLowerCase().trim();
            var newStreak = correct ? currentStreak + 1 : 0;
            setCurrentStreak(newStreak);
            
            var newAnswers = answers.concat([{
                card: currentCard,
                userAnswer: ans,
                correct: correct
            }]);
            setAnswers(newAnswers);
            
            // Guardar progreso
            var progress = window.Muller.getAdvancedProgress();
            var prefixMap = { articulos: 'articulos', verbos: 'verbos', preposiciones: 'preposiciones' };
            var prefix = prefixMap[currentCard.type] || 'articulos';
            var id = currentCard.card.article ? currentCard.card.article + '::' + currentCard.card.de : currentCard.card.de;
            var key = prefix + '::' + id;
            var stats = progress[key] || { attempts: 0, correct: 0, errors: 0, easy: 0, normal: 0, difficult: 0, consecutiveErrors: 0, consecutiveCorrect: 0 };
            
            stats.attempts = (stats.attempts || 0) + 1;
            if (correct) {
                stats.correct = (stats.correct || 0) + 1;
                stats.consecutiveErrors = 0;
                stats.consecutiveCorrect = (stats.consecutiveCorrect || 0) + 1;
                stats.lastSeenAt = new Date().toISOString();
                if (currentIndex < Math.floor(numCards / 3)) stats.easy = (stats.easy || 0) + 1;
                else if (currentIndex < Math.floor(numCards * 2 / 3)) stats.normal = (stats.normal || 0) + 1;
                else stats.difficult = (stats.difficult || 0) + 1;
                
                // Verificar logro de racha perfecta
                if (newStreak >= 10) window.Muller.unlockAchievement('perfect_10');
            } else {
                stats.errors = (stats.errors || 0) + 1;
                stats.consecutiveErrors = (stats.consecutiveErrors || 0) + 1;
                stats.consecutiveCorrect = 0;
                stats.lastSeenAt = new Date().toISOString();
                
                // Verificar logro de remontada
                if (stats.consecutiveErrors >= 5) window.Muller.unlockAchievement('comeback_king');
            }
            progress[key] = stats;
            window.Muller.saveAdvancedProgress(progress);
            window.Muller.registerDailyAttempt();
            window.Muller.registerTrainingAttempt(currentCard.type, correct);
            
            // Siguiente
            if (currentIndex + 1 >= cards.length) {
                finishExam(newAnswers);
            } else {
                setCurrentIndex(currentIndex + 1);
                setInputValue('');
                setShowTip(false);
                window.dispatchEvent(new Event('advancedProgressUpdated'));
            }
        }
        
        function finishExam(allAnswers) {
            var total = allAnswers.length;
            var correctCount = allAnswers.filter(function(a) { return a.correct; }).length;
            var wrongCount = total - correctCount;
            var timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
            
            var examData = {
                total: total,
                correct: correctCount,
                wrong: wrongCount,
                duration: timeSpentSeconds,
                answers: allAnswers,
                type: 'mixed_telc'
            };
            window.Muller.saveExamToHistory(examData);
            var examCount = parseInt(localStorage.getItem('muller_exam_count') || '0') || 0;
            localStorage.setItem('muller_exam_count', String(examCount + 1));
            window.dispatchEvent(new Event('examHistoryChanged'));
            window.dispatchEvent(new Event('advancedProgressUpdated'));
            
            setFinished(true);
            setTimeSpent(timeSpentSeconds);
        }
        
        function handleSkip() {
            answerCurrent('__skip__');
        }
        
        // ─── Pantalla de configuración ───
        if (!started) {
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver al Dashboard'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                    React.createElement('div', { style: { fontSize: 48, marginBottom: 12 } }, '📝'),
                    React.createElement('div', { style: { fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, 'Examen Mixto TELC'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 } },
                        'Artículos (34%) · Verbos+Prep (33%) · Preposiciones (33%)'
                    ),
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', marginBottom: 20 } },
                        'Selección adaptativa (Smart) basada en tu progreso'
                    ),
                    // Selector de cantidad
                    React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 } },
                        [15, 30, 45, 60].map(function(n) {
                            return React.createElement('button', {
                                key: n,
                                onClick: function() { setNumCards(n); },
                                style: Object.assign({
                                    padding: '10px 18px',
                                    borderRadius: 10,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    border: 'none'
                                }, numCards === n ? { background: '#06b6d4', color: 'white' } : { background: '#0f172a', color: '#94a3b8' })
                            }, n + ' tarjetas');
                        })
                    ),
                    React.createElement('button', {
                        onClick: startExam,
                        style: Object.assign({}, S.btnPrimary, { padding: '14px 40px', fontSize: '1rem' })
                    }, '🎯 Comenzar examen')
                )
            );
        }
        
        // ─── Pantalla de resultados ───
        if (finished) {
            var total = answers.length;
            var correctCount = answers.filter(function(a) { return a.correct; }).length;
            var pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
            var grade = pct >= 90 ? '🌟 Excelente!' : pct >= 75 ? '👏 Muy bien!' : pct >= 60 ? '👍 Bien' : pct >= 40 ? '📚 Sigue practicando' : '💪 Ánimo, sigue así';
            var gradeColor = pct >= 90 ? '#10b981' : pct >= 75 ? '#06b6d4' : pct >= 60 ? '#f59e0b' : '#f87171';
            
            return React.createElement('div', null,
                React.createElement('button', {
                    onClick: onBack,
                    style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
                }, '← Volver al Dashboard'),
                React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 24 }) },
                    React.createElement('div', { style: { fontSize: 64, marginBottom: 8 } }, pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '💪'),
                    React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: gradeColor, marginBottom: 4 } }, grade),
                    React.createElement('div', { style: { fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 12 } },
                        correctCount + '/' + total + ' (' + pct + '%)'
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: 16, justifyContent: 'center', fontSize: '0.85rem', color: '#94a3b8' } },
                        React.createElement('span', null, '⏱ ' + Math.floor(timeSpent / 60) + ':' + String(timeSpent % 60).padStart(2, '0') + ' min'),
                        React.createElement('span', null, '✅ ' + correctCount + ' aciertos'),
                        React.createElement('span', null, '❌ ' + (total - correctCount) + ' fallos')
                    ),
                    React.createElement('div', { style: { marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' } },
                        React.createElement('button', {
                            onClick: function() { setStarted(false); },
                            style: S.btnSecondary
                        }, '🔄 Nuevo examen'),
                        React.createElement('button', {
                            onClick: onBack,
                            style: S.btnPrimary
                        }, '📊 Ver Dashboard')
                    )
                )
            );
        }
        
        // ─── Tarjeta actual ───
        var currentCard = cards[currentIndex];
        var progressPct = Math.round((currentIndex / cards.length) * 100);
        
        return React.createElement('div', null,
            // Barra de progreso + stats
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 10, padding: 10 }) },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.75rem', color: '#94a3b8' } },
                    React.createElement('span', null, '📝 ' + (currentIndex + 1) + ' / ' + cards.length),
                    React.createElement('span', null, '⏱ ' + Math.floor(timeSpent / 60) + ':' + String(timeSpent % 60).padStart(2, '0'))
                ),
                React.createElement('div', { style: { height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', { style: { height: '100%', width: progressPct + '%', background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', borderRadius: 3, transition: 'width 0.3s ease' } })
                ),
                currentStreak >= 3 && React.createElement('div', { style: { marginTop: 4, fontSize: '0.72rem', color: '#f59e0b', textAlign: 'center' } },
                    '🔥 Racha: ' + currentStreak
                )
            ),
            
            // Tarjeta de pregunta
            React.createElement('div', { style: Object.assign({}, S.glowCard, { textAlign: 'center', padding: 32 }) },
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', marginBottom: 4 } },
                    currentCard.type === 'articulos' ? '📖 Artículo' : currentCard.type === 'verbos' ? '🔗 Verbo+Prep' : '📍 Preposición'
                ),
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 6 } }, currentCard.display || currentCard.card.de),
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: 16 } }, currentCard.card.es || ''),
                
                // Input
                React.createElement('div', { style: { maxWidth: 400, margin: '0 auto' } },
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', marginBottom: 8 } }, 'Tu respuesta:'),
                    React.createElement('input', {
                        type: 'text',
                        value: inputValue,
                        onChange: function(e) { setInputValue(e.target.value); },
                        onKeyDown: handleKeyDown,
                        placeholder: 'Escribe aquí...',
                        autoFocus: true,
                        style: S.input
                    }),
                    React.createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 } },
                        React.createElement('button', {
                            onClick: function() { answerCurrent(inputValue); },
                            disabled: !inputValue.trim(),
                            style: Object.assign({}, S.btnPrimary, { opacity: inputValue.trim() ? 1 : 0.5 })
                        }, '✓ Comprobar'),
                        React.createElement('button', {
                            onClick: handleSkip,
                            style: S.btnSecondary
                        }, 'Saltar →')
                    )
                )
            )
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // COMPONENTE PRINCIPAL
    // ═══════════════════════════════════════════════════════════════
    function EntrenamientoPanel({ session }) {
        var [dashboard, setDashboard] = React.useState(window.Muller.getAdvancedDashboard());
        var [activeSection, setActiveSection] = React.useState('dashboard');
        var [deepseekReady, setDeepseekReady] = React.useState(false);
        
        // Actualizar dashboard cuando cambia
        React.useEffect(function() {
            var handler = function() { setDashboard(window.Muller.getAdvancedDashboard()); };
            window.addEventListener('advancedProgressUpdated', handler);
            window.addEventListener('achievementsUpdated', handler);
            window.addEventListener('dailyProgressUpdated', handler);
            return function() { window.removeEventListener('advancedProgressUpdated', handler); };
        }, []);
        
        // Verificar DeepSeek (defensivo: si DeepSeek aún no se ha cargado, esperar)
        React.useEffect(function() {
            var ds = window.Muller && window.Muller.DeepSeek;
            setDeepseekReady(ds && typeof ds.hasApiKey === 'function' && ds.hasApiKey());
            var handler = function() { 
                var ds2 = window.Muller && window.Muller.DeepSeek;
                setDeepseekReady(ds2 && typeof ds2.hasApiKey === 'function' && ds2.hasApiKey()); 
            };
            window.addEventListener('deepseekKeyChanged', handler);
            return function() { window.removeEventListener('deepseekKeyChanged', handler); };
        }, []);

        function handleStartPractice() { setActiveSection('practice'); }
        function handleStartExam() { setActiveSection('exam'); }
        function handleViewPlan() { setActiveSection('plan'); }
        function handleViewChallenge() { setActiveSection('challenge'); }
        function handleBack() { setActiveSection('dashboard'); }
        
        // ─── Nav tabs ───
        var sections = [
            { id: 'dashboard', icon: '📊', label: 'Dashboard' },
            { id: 'practice', icon: '🏋️', label: 'Entrenar' },
            { id: 'exam', icon: '📝', label: 'Examen' },
            { id: 'plan', icon: '📋', label: 'Plan' },
            { id: 'challenge', icon: '🎯', label: 'Desafío' },
            { id: 'ai', icon: '🤖', label: 'Tutor AI' },
            { id: 'api', icon: '🔑', label: 'API Key' }
        ];

        return React.createElement('div', { style: { maxWidth: 800, margin: '0 auto', padding: '12px 16px' } },
            // ─── Header ───
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 } },
                React.createElement('span', { style: { fontSize: 28 } }, '⚡'),
                React.createElement('div', null,
                    React.createElement('div', { style: { fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0' } }, 'Entrenamiento TELC'),
                    React.createElement('div', { style: { fontSize: '0.75rem', color: '#94a3b8' } }, 'Domina artículos, verbos+prep y preposiciones')
                )
            ),
            
            // ─── Tabs de navegación ───
            React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' } },
                sections.map(function(s) {
                    var active = activeSection === s.id;
                    return React.createElement('button', {
                        key: s.id,
                        onClick: function() { setActiveSection(s.id); },
                        style: Object.assign({
                            padding: '8px 14px',
                            borderRadius: 10,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            border: '1px solid ' + (active ? '#06b6d4' : '#334155'),
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }, active ? { background: '#06b6d4', color: 'white' } : { background: '#1e293b', color: '#94a3b8' })
                    },
                        React.createElement('span', null, s.icon),
                        s.label
                    );
                })
            ),

            // ─── Contenido según sección ───
            activeSection === 'dashboard' && React.createElement('div', null,
                React.createElement(DashboardSection, {
                    dashboard: dashboard,
                    onStartPractice: handleStartPractice,
                    onStartExam: handleStartExam,
                    onViewPlan: handleViewPlan,
                    onViewChallenge: handleViewChallenge
                })
            ),

            activeSection === 'practice' && React.createElement('div', null,
                React.createElement(PracticeSelector, { onBack: handleBack, dashboard: dashboard })
            ),

            activeSection === 'exam' && React.createElement('div', null,
                React.createElement(ExamRunner, { onBack: handleBack, dashboard: dashboard })
            ),

            activeSection === 'plan' && React.createElement('div', null,
                React.createElement(StudyPlanSection, { onBack: handleBack })
            ),

            activeSection === 'challenge' && React.createElement('div', null,
                React.createElement(DailyChallengeSection, { onBack: handleBack, dashboard: dashboard })
            ),

            activeSection === 'ai' && React.createElement('div', null,
                React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.95rem', color: '#e2e8f0', marginBottom: 12 } }, '🤖 Tutor AI — DeepSeek'),
                    React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: 12 } },
                        'Pregunta cualquier duda sobre alemán, gramática, vocabulario, estrategias TELC... El AI te responde al instante.'
                    ),
                    React.createElement(window.Muller.DeepSeek && window.Muller.DeepSeek.ChatWidget ? window.Muller.DeepSeek.ChatWidget : 'div', null,
                        !window.Muller.DeepSeek && React.createElement('div', { style: { color: '#f87171', fontSize: '0.85rem' } }, 'Módulo DeepSeek no disponible')
                    )
                )
            ),

            activeSection === 'api' && React.createElement('div', null,
                React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.95rem', color: '#e2e8f0', marginBottom: 8 } }, '🔑 Configuración DeepSeek AI'),
                    React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: 14 } },
                        'Introduce tu API Key de DeepSeek para activar el tutor AI. Consíguela gratis en platform.deepseek.com'
                    ),
                    React.createElement(window.Muller.DeepSeek && window.Muller.DeepSeek.ApiKeySetup ? window.Muller.DeepSeek.ApiKeySetup : 'div')
                ),
                // Stats extra
                React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10 } }, '📊 Estadísticas globales'),
                    React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                        [
                            { label: 'Total intentos', value: dashboard.totalAttempts, icon: '🎯' },
                            { label: 'Precisión', value: dashboard.accuracy + '%', icon: '📊' },
                            { label: 'Tarjetas débiles', value: dashboard.weak, icon: '⚠️' },
                            { label: 'Días de racha', value: dashboard.streakDays, icon: '🔥' },
                            { label: 'Dominadas', value: dashboard.mastered, icon: '👑' },
                            { label: 'Nuevas', value: dashboard.newCount, icon: '🆕' }
                        ].map(function(stat) {
                            return React.createElement('div', {
                                key: stat.label,
                                style: Object.assign({}, S.statBox, { flex: 1, minWidth: 85 })
                            },
                                React.createElement('div', { style: { fontSize: 18 } }, stat.icon),
                                React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' } }, stat.value),
                                React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, stat.label)
                            );
                        })
                    )
                )
            )
        );
    }

    // ─── Exponer componentes ───
    window.Muller = window.Muller || {};
    window.Muller.Panels = window.Muller.Panels || {};
    window.Muller.Panels.entrenamiento = EntrenamientoPanel;
    window.Muller.EntrenamientoPanel = EntrenamientoPanel;
    
    // ✨ EXPONER LOS COMPONENTES DE PRÁCTICA QUE FALTABAN ✨
    window.Muller.ArticlePractice = ArticlePractice;
    window.Muller.CloudPractice = CloudPractice;
    
    console.log('✅ EntrenamientoPanel v3 cargado (con ArticlePractice & CloudPractice)');
})();