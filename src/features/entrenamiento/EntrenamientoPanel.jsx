// ═══════════════════════════════════════════════════════════════
// ENTRENAMIENTO PANEL – Super Premium Ultra Edition v4
// ═══════════════════════════════════════════════════════════════
// Panel principal con dashboard, logros, racha, meta diaria,
// plan de estudio personalizado, desafío diario, predicción TELC,
// patrones de error, estadísticas semanales, motivación,
// acceso a prácticas de artículo, verbos+prep, preposiciones,
// examen mixto TELC, tutor AI DeepSeek y más.
// ═══════════════════════════════════════════════════════════════

(function() {
    // ─── Estilos compartidos ───
    var S = {
        card: {
            background: '#1e293b',
            borderRadius: 16,
            padding: 20,
            border: '1px solid #334155',
            transition: 'all 0.3s ease'
        },
        glowCard: {
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 16,
            padding: 20,
            border: '1px solid #334155',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)',
            transition: 'all 0.3s ease'
        },
        btnPrimary: {
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
        },
        btnSecondary: {
            background: '#334155',
            color: '#e2e8f0',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
        },
        btnPurple: {
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
        },
        btnGreen: {
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
        },
        btnGold: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease'
        },
        statBox: {
            background: '#0f172a',
            borderRadius: 12,
            padding: 14,
            textAlign: 'center',
            border: '1px solid #1e293b'
        }
    };

    // ─── Sección de Dashboard ───
    function DashboardSection({ dashboard, onStartPractice, onStartExam, onViewPlan, onViewChallenge }) {
        var d = dashboard;
        var progressColor = d.dailyProgress >= 100 ? '#10b981' : d.dailyProgress >= 50 ? '#f59e0b' : '#06b6d4';
        var motivation = window.Muller.getDailyMotivation ? window.Muller.getDailyMotivation() : null;
        var telcPrediction = window.Muller.predictTelcScore ? window.Muller.predictTelcScore() : null;
        
        return React.createElement('div', { style: { marginBottom: 24 } },
            // ─── Cita de motivación ───
            motivation && React.createElement('div', {
                style: Object.assign({}, S.card, {
                    marginBottom: 16,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
                    borderColor: 'rgba(139, 92, 246, 0.3)'
                })
            },
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#fbbf24', fontWeight: 600, marginBottom: 4 } }, '💬 ' + motivation.de),
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, motivation.es)
            ),
            
            // ─── Racha, meta diaria, precisión, exámenes ───
            React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' } },
                // Racha
                React.createElement(StatCard, {
                    icon: d.streakDays >= 7 ? '🔥' : d.streakDays >= 3 ? '🔥' : '📅',
                    value: d.streakDays,
                    label: 'días de racha',
                    color: d.streakDays >= 7 ? '#f59e0b' : '#e2e8f0',
                    glow: d.streakDays >= 7
                }),
                // Meta diaria
                React.createElement(StatCard, {
                    icon: d.dailyProgress >= 100 ? '✅' : '🎯',
                    value: d.todayAttempts + '/' + d.dailyGoal,
                    label: 'hoy',
                    color: progressColor
                }),
                // Precisión
                React.createElement(StatCard, {
                    icon: d.accuracy >= 90 ? '👑' : d.accuracy >= 75 ? '🎯' : '📊',
                    value: d.accuracy + '%',
                    label: 'precisión total',
                    color: d.accuracy >= 90 ? '#10b981' : '#e2e8f0'
                }),
                // Exámenes
                React.createElement(StatCard, {
                    icon: '📝',
                    value: d.examCount,
                    label: 'exámenes completados',
                    color: '#8b5cf6'
                })
            ),
            
            // ─── Predicción TELC ───
            telcPrediction && React.createElement('div', {
                style: Object.assign({}, S.card, {
                    marginBottom: 16,
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 182, 212, 0.08))',
                    borderColor: 'rgba(16, 185, 129, 0.3)'
                })
            },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' } },
                    React.createElement('div', { style: { fontSize: 28 } }, '🎯'),
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement('div', { style: { fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0' } },
                            'Nivel estimado TELC: ',
                            React.createElement('span', { style: { color: telcPrediction.level === 'C1' ? '#10b981' : telcPrediction.level === 'B2' ? '#06b6d4' : telcPrediction.level === 'B1' ? '#f59e0b' : '#94a3b8' } }, telcPrediction.level)
                        ),
                        React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8' } },
                            'Puntuación: ' + telcPrediction.score + '% · Confianza: ' + telcPrediction.confidence
                        )
                    ),
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#fbbf24', textAlign: 'right', maxWidth: 200 } }, telcPrediction.nextLevel)
                )
            ),
            
            // ─── Barra de progreso diario ───
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
                    React.createElement('span', { style: { fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 } }, 'Progreso diario'),
                    React.createElement('span', { style: { fontSize: '0.85rem', color: progressColor, fontWeight: 600 } }, d.dailyProgress + '%')
                ),
                React.createElement('div', { style: { height: 8, background: '#0f172a', borderRadius: 4, overflow: 'hidden' } },
                    React.createElement('div', {
                        style: {
                            height: '100%',
                            width: d.dailyProgress + '%',
                            background: 'linear-gradient(90deg, #06b6d4, ' + progressColor + ')',
                            borderRadius: 4,
                            transition: 'width 0.5s ease'
                        }
                    })
                ),
                React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' } },
                    React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b' } }, 'Meta:'),
                    [15, 30, 50, 100].map(function(g) {
                        var active = d.dailyGoal === parseInt(g);
                        return React.createElement('button', {
                            key: g,
                            onClick: function() { window.Muller.setDailyGoalCount(parseInt(g)); },
                            style: Object.assign({
                                padding: '4px 12px',
                                borderRadius: 6,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                border: '1px solid ' + (active ? '#06b6d4' : '#334155')
                            }, active ? { background: '#06b6d4', color: 'white' } : { background: 'transparent', color: '#94a3b8' })
                        }, g);
                    })
                )
            ),
            
            // ─── Estadísticas por pillar ───
            React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' } },
                ['art', 'verb', 'prep'].map(function(key) {
                    var pillar = d[key];
                    var icons = { art: '📖', verb: '🔗', prep: '📍' };
                    var labels = { art: 'Artículos', verb: 'Verbos+Prep', prep: 'Preposiciones' };
                    var colors = { art: '#06b6d4', verb: '#8b5cf6', prep: '#10b981' };
                    var ratio = pillar.attempts > 0 ? Math.round(((pillar.correct || 0) / pillar.attempts) * 100) : 0;
                    var level = window.Muller.getMasteryEmoji ? window.Muller.getMasteryEmoji(pillar.mastered > 0 ? 5 : 1) : '';
                    return React.createElement('div', {
                        key: key,
                        style: Object.assign({}, S.statBox, { flex: 1, minWidth: 100, borderColor: colors[key] + '44' })
                    },
                        React.createElement('div', { style: { fontSize: 20 } }, icons[key]),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#94a3b8', marginTop: 2, fontWeight: 500 } }, labels[key]),
                        React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginTop: 2 } }, pillar.total),
                        React.createElement('div', { style: { fontSize: '0.72rem', color: colors[key] } }, pillar.attempts + ' intentos · ' + ratio + '%'),
                        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b', marginTop: 2 } },
                            pillar.mastered > 0 ? pillar.mastered + ' dominadas' : pillar.weak > 0 ? pillar.weak + ' débiles' : '-'
                        )
                    );
                })
            ),
            
            // ─── Estadísticas semanales ───
            React.createElement(WeeklyStatsSection, null),
            
            // ─── Botones de acción ───
            React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 } },
                React.createElement('button', {
                    onClick: onStartPractice,
                    style: Object.assign({}, S.btnPrimary, { flex: 1, padding: '14px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 })
                }, React.createElement('span', null, '🏋️'), ' Entrenar ahora'),
                React.createElement('button', {
                    onClick: onStartExam,
                    style: Object.assign({}, S.btnPurple, { flex: 1, padding: '14px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 })
                }, React.createElement('span', null, '📝'), ' Examen TELC Mixto')
            ),
            React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                React.createElement('button', {
                    onClick: onViewPlan,
                    style: Object.assign({}, S.btnGreen, { flex: 1, padding: '10px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 })
                }, React.createElement('span', null, '📋'), ' Plan de estudio'),
                React.createElement('button', {
                    onClick: onViewChallenge,
                    style: Object.assign({}, S.btnGold, { flex: 1, padding: '10px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 })
                }, React.createElement('span', null, '🎯'), ' Desafío diario')
            )
        );
    }

    // ─── Tarjeta de estadística ───
    function StatCard({ icon, value, label, color, glow }) {
        return React.createElement('div', {
            style: Object.assign({}, glow ? {
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: 16,
                padding: 16,
                border: '1px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.1)',
                transition: 'all 0.3s ease'
            } : S.glowCard, {
                flex: 1,
                minWidth: 130,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            })
        },
            React.createElement('div', { style: { fontSize: 36, marginBottom: 4 } }, icon),
            React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: color || '#e2e8f0' } }, value),
            React.createElement('div', { style: { fontSize: '0.72rem', color: '#94a3b8' } }, label)
        );
    }

    // ─── Estadísticas semanales ───
    function WeeklyStatsSection() {
        var weekly = window.Muller.getWeeklyStats ? window.Muller.getWeeklyStats() : null;
        if (!weekly) return null;
        
        return React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
            React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 10 } }, '📊 Esta semana'),
            React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                [
                    { icon: '📝', label: 'Exámenes', value: weekly.examsThisWeek },
                    { icon: '🃏', label: 'Tarjetas', value: weekly.totalCards },
                    { icon: '✅', label: 'Aciertos', value: weekly.totalCorrect },
                    { icon: '🎯', label: 'Precisión', value: weekly.accuracy + '%' }
                ].map(function(stat) {
                    return React.createElement('div', {
                        key: stat.label,
                        style: Object.assign({}, S.statBox, { flex: 1, minWidth: 80 })
                    },
                        React.createElement('div', { style: { fontSize: 18 } }, stat.icon),
                        React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' } }, stat.value),
                        React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, stat.label)
                    );
                })
            )
        );
    }

    // ─── Sección de Plan de Estudio ───
    function StudyPlanSection({ onBack }) {
        var plan = window.Muller.generateStudyPlan ? window.Muller.generateStudyPlan() : null;
        if (!plan) {
            return React.createElement('div', null,
                React.createElement('button', { onClick: onBack, style: Object.assign({}, S.btnSecondary, { marginBottom: 14 }) }, '← Volver al Dashboard'),
                React.createElement('div', { style: Object.assign({}, S.card, { textAlign: 'center', padding: 24 }) }, 'Generando plan...')
            );
        }
        
        return React.createElement('div', null,
            React.createElement('button', { onClick: onBack, style: Object.assign({}, S.btnSecondary, { marginBottom: 14 }) }, '← Volver al Dashboard'),
            React.createElement('div', { style: Object.assign({}, S.glowCard, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontSize: 28, marginBottom: 8, textAlign: 'center' } }, '📋'),
                React.createElement('div', { style: { fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0', textAlign: 'center', marginBottom: 12 } }, 'Tu Plan de Estudio Personalizado'),
                React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', marginBottom: 16 } },
                    'Tiempo estimado: ' + plan.estimatedTime + ' min · Enfoque: ' + (plan.weakPillar ? plan.weakPillar.name : 'Mixto')
                ),
                
                // Áreas de enfoque
                React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 8 } }, '🎯 Áreas de enfoque'),
                    plan.focus.map(function(f, i) {
                        return React.createElement('div', {
                            key: i,
                            style: {
                                background: '#0f172a',
                                borderRadius: 8,
                                padding: '8px 12px',
                                marginBottom: 6,
                                fontSize: '0.82rem',
                                color: '#e2e8f0',
                                border: '1px solid #1e293b'
                            }
                        }, f);
                    })
                ),
                
                // Tips
                plan.tips.length > 0 && React.createElement('div', { style: { marginBottom: 16 } },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 8 } }, '💡 Recomendaciones'),
                    plan.tips.map(function(t, i) {
                        return React.createElement('div', {
                            key: i,
                            style: {
                                background: 'rgba(251, 191, 36, 0.06)',
                                borderRadius: 8,
                                padding: '8px 12px',
                                marginBottom: 6,
                                fontSize: '0.82rem',
                                color: '#fbbf24',
                                border: '1px solid rgba(251, 191, 36, 0.15)'
                            }
                        }, t);
                    })
                ),
                
                // Siguiente logro
                plan.nextMilestone && React.createElement('div', {
                    style: {
                        background: 'rgba(139, 92, 246, 0.08)',
                        borderRadius: 10,
                        padding: 12,
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                    }
                },
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#a78bfa', marginBottom: 4 } },
                        '🏆 Próximo logro: ' + plan.nextMilestone.icon + ' ' + plan.nextMilestone.title
                    ),
                    React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, plan.nextMilestone.desc)
                )
            )
        );
    }

    // ─── Sección de Desafío Diario ───
    function DailyChallengeSection({ onBack, dashboard }) {
        var challenge = window.Muller.generateDailyChallenge ? window.Muller.generateDailyChallenge() : null;
        if (!challenge) return null;
        
        var progressPct = challenge.target > 0 ? Math.round((challenge.progress / challenge.target) * 100) : 0;
        
        return React.createElement('div', null,
            React.createElement('button', { onClick: onBack, style: Object.assign({}, S.btnSecondary, { marginBottom: 14 }) }, '← Volver al Dashboard'),
            React.createElement('div', { style: Object.assign({}, S.glowCard, { marginBottom: 16, textAlign: 'center', borderColor: challenge.completed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.3)' }) },
                React.createElement('div', { style: { fontSize: 48, marginBottom: 8 } }, challenge.completed ? '🎉' : challenge.reward),
                React.createElement('div', { style: { fontWeight: 700, fontSize: '1.1rem', color: challenge.completed ? '#10b981' : '#e2e8f0', marginBottom: 4 } },
                    challenge.completed ? '¡Desafío completado!' : challenge.title
                ),
                React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: 16 } }, challenge.desc),
                
                // Barra de progreso
                React.createElement('div', { style: { marginBottom: 12 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                        React.createElement('span', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, 'Progreso: ' + challenge.progress + '/' + challenge.target),
                        React.createElement('span', { style: { fontSize: '0.78rem', color: challenge.completed ? '#10b981' : '#f59e0b' } }, progressPct + '%')
                    ),
                    React.createElement('div', { style: { height: 8, background: '#0f172a', borderRadius: 4, overflow: 'hidden' } },
                        React.createElement('div', {
                            style: {
                                height: '100%',
                                width: progressPct + '%',
                                background: challenge.completed ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f59e0b, #d97706)',
                                borderRadius: 4,
                                transition: 'width 0.5s ease'
                            }
                        })
                    )
                ),
                
                // Recompensa
                !challenge.completed && React.createElement('div', { style: { fontSize: '0.78rem', color: '#fbbf24', marginTop: 8 } },
                    '🏅 Recompensa al completar: ¡Logro desbloqueado!'
                ),
                challenge.completed && React.createElement('div', { style: { fontSize: '0.85rem', color: '#10b981', fontWeight: 500 } },
                    '✅ Desbloqueaste el logro "Campeón Diario"'
                )
            ),
            
            // Estadísticas rápidas
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: 8 } }, '📊 Hoy'),
                React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                    [
                        { icon: '🎯', label: 'Intentos', value: dashboard.todayAttempts },
                        { icon: '✅', label: 'Aciertos', value: dashboard.accuracy >= 0 ? dashboard.accuracy + '%' : '-' },
                        { icon: '🔥', label: 'Racha', value: dashboard.streakDays + ' días' }
                    ].map(function(s) {
                        return React.createElement('div', {
                            key: s.label,
                            style: Object.assign({}, S.statBox, { flex: 1, minWidth: 80 })
                        },
                            React.createElement('div', { style: { fontSize: 18 } }, s.icon),
                            React.createElement('div', { style: { fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' } }, s.value),
                            React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, s.label)
                        );
                    })
                )
            )
        );
    }

    // ─── Sección de Logros ───
    function AchievementsSection() {
        var [unlocked, setUnlocked] = React.useState(window.Muller.getAchievementsUnlocked());
        
        React.useEffect(function() {
            var handler = function() { setUnlocked(Object.assign({}, window.Muller.getAchievementsUnlocked())); };
            window.addEventListener('achievementsUpdated', handler);
            return function() { window.removeEventListener('achievementsUpdated', handler); };
        }, []);
        
        var total = window.Muller.ACHIEVEMENT_DEFS.length;
        var earned = Object.keys(unlocked).filter(function(k) { return !k.startsWith('_') && !!unlocked[k]; }).length;
        
        return React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.95rem', color: '#e2e8f0' } }, '🏆 Logros TELC'),
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, earned + '/' + total + ' desbloqueados')
            ),
            React.createElement('div', { style: { height: 6, background: '#0f172a', borderRadius: 3, marginBottom: 12, overflow: 'hidden' } },
                React.createElement('div', {
                    style: {
                        height: '100%',
                        width: Math.round((earned / total) * 100) + '%',
                        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                        borderRadius: 3,
                        transition: 'width 0.5s ease'
                    }
                })
            ),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 300, overflowY: 'auto' } },
                window.Muller.ACHIEVEMENT_DEFS.map(function(def) {
                    var earned_ = !!(unlocked[def.id]);
                    return React.createElement('div', {
                        key: def.id,
                        style: Object.assign({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 12px',
                            borderRadius: 10,
                            fontSize: '0.78rem',
                            cursor: 'default',
                            transition: 'all 0.2s ease'
                        }, earned_ ? {
                            background: 'rgba(245, 158, 11, 0.12)',
                            border: '1px solid rgba(245, 158, 11, 0.3)'
                        } : {
                            background: '#0f172a',
                            border: '1px solid #1e293b',
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
            ),
            // Último examen
            React.createElement('div', { style: { marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', background: '#0f172a', borderRadius: 10, padding: 10 } },
                React.createElement(LastExamResultCard, null)
            )
        );
    }

    // ─── Último resultado de examen ───
    function LastExamResultCard() {
        var [lastExam, setLastExam] = React.useState(window.Muller.getLastExamResult());
        
        React.useEffect(function() {
            var handler = function() { setLastExam(window.Muller.getLastExamResult()); };
            window.addEventListener('examHistoryChanged', handler);
            return function() { window.removeEventListener('examHistoryChanged', handler); };
        }, []);
        
        if (!lastExam) {
            return React.createElement('div', { style: { fontSize: '0.8rem', color: '#64748b' } }, '📋 Aún no has completado ningún examen TELC');
        }
        
        var pct = lastExam.total > 0 ? Math.round((lastExam.correct / lastExam.total) * 100) : 0;
        var timeStr = window.Muller.formatExamTime ? window.Muller.formatExamTime(lastExam.timeSpent || lastExam.duration || 0) : '';
        var dateStr = window.Muller.formatDateShort ? window.Muller.formatDateShort(lastExam.completedAt) : '';
        
        return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, width: '100%' } },
            React.createElement('span', { style: { fontSize: 24 } }, pct >= 85 ? '🌟' : pct >= 60 ? '👍' : '📚'),
            React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0' } },
                    'Último examen: ' + lastExam.correct + '/' + lastExam.total + ' (' + pct + '%)'
                ),
                React.createElement('div', { style: { fontSize: '0.72rem', color: '#94a3b8' } },
                    'Tiempo: ' + (timeStr || '-') + ' · ' + (dateStr || '-')
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
                }),
                React.createElement(AchievementsSection, null)
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
                ),
                // Análisis de patrones de error
                React.createElement(ErrorPatternsSection, null)
            )
        );
    }

    // ─── Sección de Patrones de Error ───
    function ErrorPatternsSection() {
        var [patterns, setPatterns] = React.useState(null);
        var [show, setShow] = React.useState(false);
        
        React.useEffect(function() {
            if (show && !patterns) {
                setPatterns(window.Muller.analyzeErrorPatterns ? window.Muller.analyzeErrorPatterns() : null);
            }
        }, [show, patterns]);
        
        return React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 16 }) },
            React.createElement('div', {
                onClick: function() { setShow(!show); },
                style: { fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0', marginBottom: show ? 10 : 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }
            },
                React.createElement('span', null, '🔍'),
                'Análisis de patrones de error',
                React.createElement('span', { style: { marginLeft: 'auto', fontSize: '0.78rem', color: '#64748b' } }, show ? '▲' : '▼')
            ),
            
            show && patterns && React.createElement('div', null,
                // Rachas
                React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' } },
                    React.createElement('div', { style: Object.assign({}, S.statBox, { flex: 1, minWidth: 100 }) },
                        React.createElement('div', { style: { fontSize: 18 } }, '✅'),
                        React.createElement('div', { style: { fontSize: '1rem', fontWeight: 700, color: '#10b981' } }, patterns.streaks.maxCorrectStreak),
                        React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, 'máx. aciertos seg.')
                    ),
                    React.createElement('div', { style: Object.assign({}, S.statBox, { flex: 1, minWidth: 100 }) },
                        React.createElement('div', { style: { fontSize: 18 } }, '❌'),
                        React.createElement('div', { style: { fontSize: '1rem', fontWeight: 700, color: '#f87171' } }, patterns.streaks.maxErrorStreak),
                        React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, 'máx. errores seg.')
                    ),
                    React.createElement('div', { style: Object.assign({}, S.statBox, { flex: 1, minWidth: 100 }) },
                        React.createElement('div', { style: { fontSize: 18 } }, '📊'),
                        React.createElement('div', { style: { fontSize: '1rem', fontWeight: 700, color: '#06b6d4' } }, patterns.recentAccuracy.pct + '%'),
                        React.createElement('div', { style: { fontSize: '0.68rem', color: '#64748b' } }, 'precisión reciente')
                    )
                ),
                
                // Errores comunes
                Object.keys(patterns.commonErrors).length > 0 && React.createElement('div', null,
                    React.createElement('div', { style: { fontWeight: 500, fontSize: '0.82rem', color: '#f87171', marginBottom: 6 } }, '⚠️ Palabras con más errores:'),
                    React.createElement('div', { style: { maxHeight: 150, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 } },
                        Object.keys(patterns.commonErrors).slice(0, 10).map(function(key) {
                            var e = patterns.commonErrors[key];
                            return React.createElement('div', {
                                key: key,
                                style: { background: '#0f172a', borderRadius: 6, padding: '6px 10px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }
                            },
                                React.createElement('span', { style: { color: '#e2e8f0' } }, key.split('::').slice(1).join(' :: ')),
                                React.createElement('span', { style: { color: '#f87171' } }, e.errors + '/' + e.attempts + ' (' + e.ratio + '%)')
                            );
                        })
                    )
                ),
                
                !patterns && React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', textAlign: 'center', padding: 10 } }, 'Cargando análisis...')
            ),
            
            show && !patterns && React.createElement('div', { style: { fontSize: '0.78rem', color: '#64748b', textAlign: 'center', padding: 10 } },
                'Completa más entrenamientos para ver patrones de error.'
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
            
            // Selector de nivel (solo para artículos)
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
            var examCount = parseInt(localStorage.getItem('muller_exam_count') || '0');
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
                ),
                // Último resultado
                React.createElement(LastExamResultCard, null)
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
                    React.createElement('div', { style: { fontSize: '2.5rem', fontWeight: 800, color: '#e2e8f0', marginBottom: 4 } }, correctCount + '/' + total),
                    React.createElement('div', { style: { fontSize: '1rem', color: gradeColor, marginBottom: 16 } }, pct + '% de aciertos'),
                    React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: 16 } }, 'Tiempo: ' + window.Muller.formatExamTime(timeSpent)),
                    
                    // Detalle por tipo
                    React.createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' } },
                        ['articulos', 'verbos', 'preposiciones'].map(function(type) {
                            var typeAnswers = answers.filter(function(a) { return a.card && a.card.type === type; });
                            var typeCorrect = typeAnswers.filter(function(a) { return a.correct; }).length;
                            var typeTotal = typeAnswers.length || 1;
                            var typePct = Math.round((typeCorrect / typeTotal) * 100);
                            var icons = { articulos: '📖', verbos: '🔗', preposiciones: '📍' };
                            return React.createElement('div', {
                                key: type,
                                style: Object.assign({}, S.statBox, { flex: 1, minWidth: 100 })
                            },
                                React.createElement('div', { style: { fontSize: 20 } }, icons[type]),
                                React.createElement('div', { style: { fontSize: '1rem', fontWeight: 700, color: '#e2e8f0' } }, typeCorrect + '/' + typeAnswers.length),
                                React.createElement('div', { style: { fontSize: '0.78rem', color: typePct >= 80 ? '#10b981' : '#f59e0b' } }, typePct + '%')
                            );
                        })
                    ),
                    
                    // Lista de errores
                    answers.filter(function(a) { return !a.correct; }).length > 0 && React.createElement('div', { style: { textAlign: 'left', marginTop: 12 } },
                        React.createElement('div', { style: { fontWeight: 600, fontSize: '0.85rem', color: '#f87171', marginBottom: 8 } }, '❌ Errores (' + answers.filter(function(a) { return !a.correct; }).length + ')'),
                        React.createElement('div', { style: { maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 } },
                            answers.filter(function(a) { return !a.correct && a.userAnswer !== '__skip__'; }).slice(0, 20).map(function(a, i) {
                                return React.createElement('div', {
                                    key: i,
                                    style: { background: '#0f172a', borderRadius: 8, padding: '8px 12px', fontSize: '0.78rem' }
                                },
                                    React.createElement('div', { style: { color: '#e2e8f0', fontWeight: 500 } }, a.card.question || a.card.card.de),
                                    React.createElement('div', { style: { color: '#f87171' } }, '→ Tu respuesta: ' + a.userAnswer),
                                    React.createElement('div', { style: { color: '#10b981' } }, '→ Correcta: ' + a.card.answer),
                                    a.card.getTip && React.createElement('div', { style: { color: '#fbbf24', fontSize: '0.7rem', marginTop: 2 } },
                                        '💡 ' + a.card.getTip()
                                    )
                                );
                            })
                        )
                    ),
                    
                    React.createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 } },
                        React.createElement('button', {
                            onClick: function() { setStarted(false); },
                            style: S.btnPrimary
                        }, '🔄 Nuevo examen'),
                        React.createElement('button', {
                            onClick: onBack,
                            style: S.btnSecondary
                        }, '📊 Dashboard')
                    )
                )
            );
        }
        
        // ─── Tarjeta actual ───
        var currentCard = cards[currentIndex];
        if (!currentCard) return React.createElement('div', null, 'Cargando...');
        
        var progressPct = Math.round(((currentIndex) / cards.length) * 100);
        
        return React.createElement('div', null,
            React.createElement('button', {
                onClick: function() { if (confirm('¿Abandonar el examen?')) { setStarted(false); } },
                style: Object.assign({}, S.btnSecondary, { marginBottom: 14 })
            }, '← Salir del examen'),
            
            // Barra de progreso
            React.createElement('div', { style: Object.assign({}, S.card, { marginBottom: 12 }) },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                    React.createElement('span', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, 'Tarjeta ' + (currentIndex + 1) + '/' + cards.length),
                    React.createElement('span', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, window.Muller.formatExamTime(timeSpent))
                ),
                React.createElement('div', { style: { height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' } },
                    React.createElement('div', {
                        style: {
                            height: '100%',
                            width: progressPct + '%',
                            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                            borderRadius: 3,
                            transition: 'width 0.3s ease'
                        }
                    })
                ),
                // Rachas
                currentStreak >= 3 && React.createElement('div', { style: { textAlign: 'center', marginTop: 6, fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 } },
                    '🔥 Racha de ' + currentStreak + ' aciertos consecutivos' + (currentStreak >= 10 ? ' 🏆' : '')
                )
            ),
            
            // Tarjeta de pregunta
            React.createElement('div', { style: Object.assign({}, S.glowCard, { marginBottom: 12 }) },
                // Tipo
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 } },
                    React.createElement('span', { style: { fontSize: 16 } }, currentCard.type === 'articulos' ? '📖' : currentCard.type === 'verbos' ? '🔗' : '📍'),
                    React.createElement('span', { style: { fontSize: '0.72rem', color: '#94a3b8', background: '#0f172a', padding: '2px 8px', borderRadius: 4 } },
                        currentCard.type === 'articulos' ? 'Artículo' : currentCard.type === 'verbos' ? 'Verbo+Prep' : 'Preposición'
                    ),
                    // Nivel si está disponible
                    currentCard.card.levels && React.createElement('span', { style: { fontSize: '0.68rem', color: '#64748b', background: '#0f172a', padding: '2px 6px', borderRadius: 4 } },
                        Array.isArray(currentCard.card.levels) ? currentCard.card.levels.join(', ') : ''
                    )
                ),
                // Pregunta
                React.createElement('div', { style: { fontSize: '1.4rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8, textAlign: 'center', padding: '12px 0' } },
                    currentCard.question || currentCard.card.de
                ),
                // Pista de español
                currentCard.es && React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', marginBottom: 12 } },
                    '🇪🇸 ' + currentCard.es
                ),
                // Input de respuesta
                React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 10 } },
                    React.createElement('input', {
                        value: inputValue,
                        onChange: function(e) { setInputValue(e.target.value); },
                        onKeyDown: function(e) {
                            if (e.key === 'Enter' && inputValue.trim()) {
                                answerCurrent(inputValue.trim());
                            }
                        },
                        placeholder: 'Escribe la respuesta...',
                        style: {
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: 10,
                            border: '1px solid #334155',
                            background: '#0f172a',
                            color: '#e2e8f0',
                            fontSize: '1rem',
                            outline: 'none',
                            textAlign: 'center',
                            fontWeight: 500
                        },
                        autoFocus: true
                    }),
                    React.createElement('button', {
                        onClick: function() { if (inputValue.trim()) answerCurrent(inputValue.trim()); },
                        disabled: !inputValue.trim(),
                        style: Object.assign({
                            padding: '12px 20px',
                            borderRadius: 10,
                            border: 'none',
                            fontWeight: 600,
                            cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem'
                        }, inputValue.trim() ? { background: '#06b6d4', color: 'white' } : { background: '#334155', color: '#64748b' })
                    }, '✓')
                ),
                // Botones rápidos
                React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                    currentCard.type === 'articulos' && ['der', 'die', 'das'].map(function(opt) {
                        return React.createElement('button', {
                            key: opt,
                            onClick: function() { answerCurrent(opt); },
                            style: {
                                padding: '8px 16px',
                                borderRadius: 8,
                                border: '1px solid #334155',
                                background: '#0f172a',
                                color: '#e2e8f0',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                flex: 1
                            }
                        }, opt);
                    }),
                    currentCard.type === 'verbos' && React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 } },
                        ['mit','auf','an','für','über','um','bei','von','zu','nach','aus'].map(function(opt) {
                            return React.createElement('button', {
                                key: opt,
                                onClick: function() { answerCurrent(opt); },
                                style: {
                                    padding: '6px 12px',
                                    borderRadius: 6,
                                    border: '1px solid #334155',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    flex: '1 0 auto'
                                }
                            }, opt);
                        })
                    ),
                    currentCard.type === 'preposiciones' && React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 } },
                        ['Akkusativ','Dativ','Genitiv'].map(function(opt) {
                            return React.createElement('button', {
                                key: opt,
                                onClick: function() { answerCurrent(opt); },
                                style: {
                                    padding: '8px 16px',
                                    borderRadius: 8,
                                    border: '1px solid #334155',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    flex: 1
                                }
                            }, opt);
                        })
                    ),
                    React.createElement('button', {
                        onClick: handleSkip,
                        style: {
                            padding: '8px 16px',
                            borderRadius: 8,
                            border: '1px solid #475569',
                            background: 'transparent',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            marginLeft: 'auto'
                        }
                    }, 'Saltar →')
                ),
                // Botón de tip
                React.createElement('div', { style: { textAlign: 'center', marginTop: 10 } },
                    React.createElement('button', {
                        onClick: function() { setShowTip(!showTip); },
                        style: { background: 'transparent', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }
                    }, showTip ? 'Ocultar truco' : '💡 Mostrar truco'),
                    showTip && React.createElement('div', {
                        style: {
                            marginTop: 8,
                            background: '#0f172a',
                            borderRadius: 8,
                            padding: 10,
                            fontSize: '0.8rem',
                            color: '#fbbf24',
                            border: '1px solid rgba(251, 191, 36, 0.2)'
                        }
                    },
                        currentCard.getTip ? currentCard.getTip() : window.Muller.getCardTip(currentCard.type, currentCard.card)
                    )
                )
            )
        );
    }

    // ─── Exponer componente ───
    window.Muller = window.Muller || {};
    window.Muller.Panels = window.Muller.Panels || {};
    window.Muller.Panels.entrenamiento = EntrenamientoPanel;
    window.Muller.EntrenamientoPanel = EntrenamientoPanel;
})();