window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.EntrenamientoPanel = function EntrenamientoPanel(props) {
    const M = window.Muller;
    const [activeView, setActiveView] = React.useState('menu');
    const [dashboard, setDashboard] = React.useState(function() { return M.getAdvancedDashboard(); });
    const [achUnlocked, setAchUnlocked] = React.useState(function() { return M.getAchievementsUnlocked(); });
    const [examCtx, setExamCtx] = React.useState(null);
    const [examSetup, setExamSetup] = React.useState({ durationMin: 20, hintsTotal: 8, track: 'articulos', articleLevel: 'B1' });

    React.useEffect(function() {
        var refresh = function() {
            setDashboard(M.getAdvancedDashboard());
            setAchUnlocked(M.getAchievementsUnlocked());
        };
        window.addEventListener('advancedProgressUpdated', refresh);
        window.addEventListener('achievementsUpdated', refresh);
        return function() {
            window.removeEventListener('advancedProgressUpdated', refresh);
            window.removeEventListener('achievementsUpdated', refresh);
        };
    }, []);

    var handleBackToMenu = function() {
        setActiveView('menu');
        setExamCtx(null);
        M.runAchievementsCheck();
        setDashboard(M.getAdvancedDashboard());
        setAchUnlocked(M.getAchievementsUnlocked());
    };

    var renderMenu = function() {
        return React.createElement('div', { className: 'max-w-5xl mx-auto w-full' },
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-7 gap-3 mb-6' },
                React.createElement(StatCard, { label: 'Intentos', value: dashboard.totalAttempts, color: 'text-white' }),
                React.createElement(StatCard, { label: 'Fallos', value: dashboard.totalErrors, color: 'text-red-300' }),
                React.createElement(StatCard, { label: 'Precisión', value: dashboard.accuracy + '%', color: 'text-emerald-300' }),
                React.createElement(StatCard, { label: 'Débiles', value: dashboard.weak, color: 'text-fuchsia-300' }),
                React.createElement(StatCard, { label: 'Art/Verb/Prep', value: dashboard.art.total + '/' + dashboard.verb.total + '/' + dashboard.prep.total, color: 'text-amber-300' }),
                React.createElement(StatCard, { label: 'Objetivo Hoy', value: dashboard.todayAttempts + '/' + dashboard.dailyGoal, sub: dashboard.dailyProgress + '%', color: 'text-cyan-300' }),
                React.createElement(StatCard, { label: 'Racha', value: '🔥 ' + dashboard.streakDays, sub: 'días', color: 'text-orange-300' })
            ),
            React.createElement('div', { className: 'bg-slate-900/60 border border-purple-800/40 rounded-xl p-4 mb-6' },
                React.createElement('p', { className: 'text-xs font-bold text-purple-300 uppercase tracking-widest mb-2' }, 'Objetivo diario (tarjetas calificadas)'),
                React.createElement('input', {
                    type: 'range', min: '5', max: '100', step: '5',
                    value: dashboard.dailyGoal,
                    onChange: function(e) { M.setDailyGoalCount(parseInt(e.target.value, 10)); setDashboard(M.getAdvancedDashboard()); },
                    className: 'w-full accent-cyan-500'
                }),
                React.createElement('span', { className: 'text-cyan-300 font-mono font-bold' }, dashboard.dailyGoal)
            ),
            React.createElement('button', {
                onClick: function() { setActiveView('exam_setup'); },
                className: 'w-full mb-6 text-left bg-gradient-to-br from-amber-950/55 to-slate-900/85 border border-amber-600/45 rounded-2xl p-5 transition'
            },
                React.createElement('p', { className: 'text-[10px] font-bold text-amber-400 uppercase' }, 'Simulación'),
                React.createElement('h3', { className: 'text-lg font-bold text-amber-100' }, 'Modo examen TELC'),
                React.createElement('p', { className: 'text-sm text-gray-400' }, 'Cronómetro suave, traducción oculta con pistas limitadas.')
            ),
            React.createElement('div', { className: 'mb-6' },
                React.createElement('p', { className: 'text-xs font-bold text-amber-400 uppercase tracking-widest mb-3' }, 'Insignias TELC / Müller'),
                React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2' },
                    M.ACHIEVEMENT_DEFS.map(function(def) {
                        var unlocked = achUnlocked[def.id];
                        return React.createElement('div', {
                            key: def.id, title: def.desc,
                            className: 'rounded-lg p-2 text-center border text-[11px] leading-tight ' + (unlocked ? 'bg-amber-950/40 border-amber-600/50 text-amber-100' : 'bg-slate-900/60 border-slate-700 text-gray-600')
                        },
                            React.createElement('div', { className: 'text-lg mb-0.5' }, def.icon),
                            React.createElement('div', { className: 'font-bold' }, def.title),
                            unlocked ? React.createElement('div', { className: 'text-[9px] text-amber-300/80 mt-1' }, 'Desbloqueada') : null
                        );
                    })
                )
            ),
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                React.createElement('button', {
                    onClick: function() { setActiveView('articulos'); },
                    className: 'bg-slate-900 border border-blue-800/50 p-8 rounded-2xl hover:bg-blue-900/30 transition text-center'
                },
                    React.createElement('div', { className: 'text-5xl mb-4' }, '📘'),
                    React.createElement('h3', { className: 'text-2xl font-bold text-blue-400 mb-2' }, 'Artículos (Der/Die/Das)'),
                    React.createElement('p', { className: 'text-sm text-gray-400' }, 'Extraído en Nominativo estricto. Usa teclado.')
                ),
                React.createElement('button', {
                    onClick: function() { setActiveView('verbos_prep'); },
                    className: 'bg-slate-900 border border-green-800/50 p-8 rounded-2xl hover:bg-green-900/30 transition text-center'
                },
                    React.createElement('div', { className: 'text-5xl mb-4' }, '📗'),
                    React.createElement('h3', { className: 'text-2xl font-bold text-green-400 mb-2' }, 'Verbos + Prep'),
                    React.createElement('p', { className: 'text-sm text-gray-400' }, 'Conectado a GitHub. Repetición de fallos.')
                ),
                React.createElement('button', {
                    onClick: function() { setActiveView('preposiciones'); },
                    className: 'bg-slate-900 border border-amber-800/50 p-8 rounded-2xl hover:bg-amber-900/30 transition text-center'
                },
                    React.createElement('div', { className: 'text-5xl mb-4' }, '📙'),
                    React.createElement('h3', { className: 'text-2xl font-bold text-amber-400 mb-2' }, 'Preposiciones'),
                    React.createElement('p', { className: 'text-sm text-gray-400' }, 'Base de datos en tiempo real.')
                )
            )
        );
    };

    var renderExamSetup = function() {
        return React.createElement('div', { className: 'max-w-lg mx-auto w-full space-y-5 mb-6' },
            React.createElement('button', {
                onClick: function() { setActiveView('menu'); },
                className: 'text-sm text-gray-400 hover:text-white'
            }, '← Volver al menú'),
            React.createElement('div', { className: 'bg-slate-900/85 border border-amber-600/45 rounded-2xl p-6' },
                React.createElement('h3', { className: 'text-xl font-bold text-amber-100 mb-4' }, '⚙️ Configurar examen'),
                React.createElement('p', { className: 'text-xs font-bold text-slate-500 uppercase mb-2' }, 'Duración'),
                React.createElement('div', { className: 'flex flex-wrap gap-2 mb-5' },
                    [15,20,30,45].map(function(m) {
                        return React.createElement('button', {
                            key: m,
                            onClick: function() { setExamSetup(function(s) { return { ...s, durationMin: m }; }); },
                            className: 'px-4 py-2 rounded-lg text-sm font-bold border ' + (examSetup.durationMin === m ? 'bg-amber-700/50 border-amber-500 text-amber-100' : 'bg-slate-800 border-slate-600 text-gray-300')
                        }, m + ' min');
                    })
                ),
                React.createElement('p', { className: 'text-xs font-bold text-slate-500 uppercase mb-2' }, 'Pistas'),
                React.createElement('div', { className: 'flex flex-wrap gap-2 mb-5' },
                    [5,8,12].map(function(h) {
                        return React.createElement('button', {
                            key: h,
                            onClick: function() { setExamSetup(function(s) { return { ...s, hintsTotal: h }; }); },
                            className: 'px-4 py-2 rounded-lg text-sm font-bold border ' + (examSetup.hintsTotal === h ? 'bg-cyan-800/50 border-cyan-500 text-cyan-100' : 'bg-slate-800 border-slate-600 text-gray-300')
                        }, h + ' pistas');
                    })
                ),
                React.createElement('p', { className: 'text-xs font-bold text-slate-500 uppercase mb-2' }, 'Contenido'),
                React.createElement('div', { className: 'grid grid-cols-2 gap-2 mb-4' },
                    [
                        { id: 'articulos', label: 'Artículos' },
                        { id: 'verbos', label: 'Verbos + prep.' },
                        { id: 'preposiciones', label: 'Preposiciones' },
                        { id: 'mix', label: 'Mezcla B1/B2 (próximamente)', disabled: true }
                    ].map(function(t) {
                        return React.createElement('button', {
                            key: t.id,
                            onClick: function() { if (!t.disabled) setExamSetup(function(s) { return { ...s, track: t.id }; }); },
                            className: 'p-3 rounded-xl text-left text-sm font-bold border ' + (examSetup.track === t.id ? 'bg-amber-950/50 border-amber-500/70 text-amber-100' : 'bg-slate-800/80 border-slate-600 text-gray-300') + (t.disabled ? ' opacity-50 cursor-not-allowed' : '')
                        }, t.label);
                    })
                ),
                examSetup.track === 'articulos' ? React.createElement('div', { className: 'mb-5' },
                    React.createElement('p', { className: 'text-xs font-bold text-slate-500 uppercase mb-2' }, 'Nivel artículos'),
                    React.createElement('div', { className: 'flex flex-wrap gap-2' },
                        ['B1','B2','MIXTO','historia'].map(function(lvl) {
                            return React.createElement('button', {
                                key: lvl,
                                onClick: function() { setExamSetup(function(s) { return { ...s, articleLevel: lvl }; }); },
                                className: 'px-3 py-1.5 rounded-lg text-xs font-bold border ' + (examSetup.articleLevel === lvl ? 'bg-blue-800/60 border-blue-400' : 'bg-slate-800 border-slate-600 text-gray-400')
                            }, lvl);
                        })
                    )
                ) : null,
                React.createElement('button', {
                    onClick: function() {
                        var deadline = Date.now() + examSetup.durationMin * 60 * 1000;
                        setExamCtx({
                            durationMin: examSetup.durationMin,
                            deadline: deadline,
                            hintsTotal: examSetup.hintsTotal,
                            hintsUsed: 0,
                            track: examSetup.track
                        });
                        if (examSetup.track === 'articulos') setActiveView('exam_articulos');
                        else if (examSetup.track === 'verbos') setActiveView('exam_verbos');
                        else if (examSetup.track === 'preposiciones') setActiveView('exam_preposiciones');
                    },
                    className: 'w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-amber-600 to-orange-800 border border-amber-500/30'
                }, 'Iniciar examen')
            )
        );
    };

    function StatCard(props) {
        return React.createElement('div', { className: 'bg-slate-900/80 border border-slate-700/40 rounded-xl p-3 text-center' },
            React.createElement('p', { className: 'text-xs text-gray-400' }, props.label),
            React.createElement('p', { className: 'text-xl font-black ' + (props.color || 'text-white') }, props.value),
            props.sub ? React.createElement('p', { className: 'text-[10px] ' + (props.color || 'text-white') }, props.sub) : null
        );
    }

    return React.createElement('div', { className: 'p-4 max-w-5xl mx-auto text-gray-100' },
        React.createElement('div', { className: 'flex items-center justify-between mb-8' },
            React.createElement('h2', { className: 'text-2xl font-bold text-purple-300' }, '🎓 Área de Entrenamiento Müller'),
            activeView !== 'menu' ? React.createElement('button', {
                onClick: handleBackToMenu,
                className: 'px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm'
            }, '← Menú') : null
        ),
        activeView === 'menu' ? renderMenu() : null,
        activeView === 'exam_setup' ? renderExamSetup() : null,
        activeView === 'articulos' ? React.createElement(M.ArticlePractice, { onBack: handleBackToMenu }) : null,
        activeView === 'verbos_prep' ? React.createElement(M.CloudPractice, { onBack: handleBackToMenu, type: 'verbos' }) : null,
        activeView === 'preposiciones' ? React.createElement(M.CloudPractice, { onBack: handleBackToMenu, type: 'preposiciones' }) : null,
        activeView === 'exam_articulos' && examCtx ? React.createElement(M.ArticlePractice, { examCtx: examCtx, setExamCtx: setExamCtx, examAutoLevel: examSetup.articleLevel, onBack: handleBackToMenu }) : null,
        activeView === 'exam_verbos' && examCtx ? React.createElement(M.CloudPractice, { examCtx: examCtx, setExamCtx: setExamCtx, type: 'verbos', onBack: handleBackToMenu }) : null,
        activeView === 'exam_preposiciones' && examCtx ? React.createElement(M.CloudPractice, { examCtx: examCtx, setExamCtx: setExamCtx, type: 'preposiciones', onBack: handleBackToMenu }) : null
    );
};