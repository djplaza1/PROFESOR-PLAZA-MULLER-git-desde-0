window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['telc'] = function TelcPanel({ session }) {
    const M = window.Muller;
    const levels = M.MULLER_TELC_LEVELS || [];
    const [selLevelId, setSelLevelId] = React.useState(null);
    const [activeTask, setActiveTask] = React.useState(null);
    const [examResult, setExamResult] = React.useState(null);

    const selectedLevel = levels.find(function(l) { return l.id === selLevelId; });

    const handleBackToLevels = function() {
        setSelLevelId(null);
        setActiveTask(null);
        setExamResult(null);
    };

    const renderLevelList = function() {
        return React.createElement('div', { className: 'space-y-4' },
            React.createElement('h2', { className: 'text-2xl font-bold text-cyan-400 mb-4' }, '📝 TELC Exámenes'),
            React.createElement('p', { className: 'text-slate-400 mb-6' }, 'Selecciona un nivel para ver información y practicar las secciones del examen.'),
            levels.map(function(lv) {
                return React.createElement('div', {
                    key: lv.id,
                    className: 'p-4 bg-slate-800 rounded-xl border-l-4 cursor-pointer hover:bg-slate-700 transition',
                    style: { borderColor: lv.color },
                    onClick: function() { setSelLevelId(lv.id); }
                },
                    React.createElement('div', { className: 'flex justify-between items-center' },
                        React.createElement('h3', { className: 'text-lg font-bold', style: { color: lv.color } }, lv.label),
                        React.createElement('span', { className: 'text-xs text-slate-400' }, lv.desc)
                    ),
                    React.createElement('p', { className: 'text-sm text-slate-300 mt-1' }, lv.description)
                );
            })
        );
    };

    const renderTaskView = function() {
        if (!selectedLevel) return null;
        const tasks = selectedLevel.tasks || [];
        const taskIcons = { Hören: '🎧', Lesen: '📖', Schreiben: '✏️', Sprechen: '🎤' };

        return React.createElement('div', { className: 'space-y-6' },
            React.createElement('div', { className: 'flex items-center gap-3' },
                React.createElement('button', {
                    className: 'px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm',
                    onClick: handleBackToLevels
                }, '← Niveles'),
                React.createElement('h3', { className: 'text-xl font-bold', style: { color: selectedLevel.color } }, selectedLevel.label + ' · ' + selectedLevel.desc)
            ),
            activeTask ? renderActiveTask() : React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                tasks.map(function(task) {
                    return React.createElement('button', {
                        key: task,
                        className: 'p-6 bg-slate-800 rounded-xl border border-slate-700 hover:bg-slate-700 text-center',
                        onClick: function() { setActiveTask(task); setExamResult(null); }
                    },
                        React.createElement('div', { className: 'text-3xl mb-2' }, taskIcons[task] || '📌'),
                        React.createElement('div', { className: 'font-semibold' }, task)
                    );
                })
            )
        );
    };

    const renderActiveTask = function() {
        if (!activeTask || !selectedLevel) return null;
        const level = selectedLevel.id;

        if (activeTask === 'Hören' || activeTask === 'Lesen') {
            return renderTestTask(level, activeTask);
        }
        if (activeTask === 'Schreiben') {
            return renderSchreibenTask(level);
        }
        if (activeTask === 'Sprechen') {
            return renderSprechenTask(level);
        }
        return React.createElement('p', { className: 'text-slate-400' }, 'Tarea no implementada aún.');
    };

    const renderTestTask = function(level, task) {
        const questions = M.mullerTelcSampleQuestions(level);
        const [answers, setAnswers] = React.useState({});
        const [submitted, setSubmitted] = React.useState(false);

        const handleSelect = function(qIndex, value) {
            setAnswers(function(prev) { return { ...prev, [qIndex]: value }; });
        };

        const handleSubmit = function() {
            let correct = 0;
            questions.forEach(function(q, i) {
                if (answers[i] === q.answer) correct++;
            });
            setExamResult({ task: task, correct: correct, total: questions.length });
            setSubmitted(true);
        };

        const icon = task === 'Hören' ? '🎧' : '📖';
        return React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'flex items-center gap-2 mb-4' },
                React.createElement('button', { className: 'px-2 py-1 bg-slate-700 rounded text-sm', onClick: function() { setActiveTask(null); } }, '← Atrás'),
                React.createElement('h4', { className: 'font-semibold text-lg' }, icon + ' ' + task + ' ' + level)
            ),
            task === 'Hören' ? React.createElement('div', { className: 'p-4 bg-slate-800 rounded text-center' },
                React.createElement('p', { className: 'text-slate-400' }, '🔊 Escucha el audio (si está disponible) y responde las preguntas.'),
                React.createElement('audio', { controls: true, src: 'assets/audio/TELC_' + level + '_Beispiel.mp3', className: 'mt-2 w-full' })
            ) : null,
            questions.map(function(q, i) {
                return React.createElement('div', { key: i, className: 'p-4 bg-slate-800 rounded' },
                    React.createElement('p', { className: 'font-medium mb-2' }, (i+1) + '. ' + q.q),
                    q.options.map(function(opt) {
                        return React.createElement('label', { key: opt, className: 'block text-sm text-slate-300 ml-4 mb-1' },
                            React.createElement('input', {
                                type: 'radio',
                                name: 'telc_q_' + i,
                                value: opt,
                                checked: answers[i] === opt,
                                onChange: function() { handleSelect(i, opt); },
                                disabled: submitted,
                                className: 'mr-2'
                            }),
                            opt
                        );
                    })
                );
            }),
            submitted ? React.createElement('div', { className: 'p-4 bg-slate-700 rounded text-center' },
                React.createElement('p', { className: 'text-lg font-bold text-amber-400' }, examResult.correct + ' de ' + examResult.total + ' correctas'),
                React.createElement('p', { className: 'text-slate-300' }, examResult.correct >= Math.ceil(examResult.total * 0.6) ? '✅ ¡Buen trabajo!' : '📚 Sigue practicando.')
            ) : React.createElement('button', {
                className: 'px-6 py-2 bg-cyan-700 hover:bg-cyan-600 rounded font-bold',
                onClick: handleSubmit
            }, 'Entregar respuestas')
        );
    };

    const renderSchreibenTask = function(level) {
        const prompt = M.mullerTelcTaskPrompt(level, 'Schreiben');
        const goal = M.mullerTelcWordCountGoal(level, 'Schreiben');
        const [text, setText] = React.useState('');
        const [submitted, setSubmitted] = React.useState(false);

        const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

        return React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'flex items-center gap-2 mb-4' },
                React.createElement('button', { className: 'px-2 py-1 bg-slate-700 rounded text-sm', onClick: function() { setActiveTask(null); } }, '← Atrás'),
                React.createElement('h4', { className: 'font-semibold text-lg' }, '✏️ Schreiben ' + level)
            ),
            React.createElement('p', { className: 'text-slate-300 p-3 bg-slate-800 rounded' }, prompt),
            React.createElement('textarea', {
                className: 'w-full p-3 bg-slate-800 border border-slate-600 rounded text-white h-40',
                placeholder: 'Escribe tu texto aquí...',
                value: text,
                onChange: function(e) { setText(e.target.value); },
                disabled: submitted
            }),
            React.createElement('div', { className: 'flex justify-between items-center' },
                React.createElement('span', { className: 'text-sm text-slate-400' }, wordCount + ' / ' + goal + ' palabras'),
                submitted ? React.createElement('p', { className: 'text-green-400 font-semibold' }, '✅ Texto enviado') :
                React.createElement('button', {
                    className: 'px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded font-bold',
                    onClick: function() {
                        if (wordCount < Math.max(1, goal - 5)) {
                            alert('Escribe al menos ' + Math.max(1, goal - 5) + ' palabras.');
                            return;
                        }
                        setSubmitted(true);
                    }
                }, 'Entregar texto')
            )
        );
    };

    const renderSprechenTask = function(level) {
        const prompt = M.mullerTelcTaskPrompt(level, 'Sprechen');
        const [recording, setRecording] = React.useState(false);

        return React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'flex items-center gap-2 mb-4' },
                React.createElement('button', { className: 'px-2 py-1 bg-slate-700 rounded text-sm', onClick: function() { setActiveTask(null); } }, '← Atrás'),
                React.createElement('h4', { className: 'font-semibold text-lg' }, '🎤 Sprechen ' + level)
            ),
            React.createElement('p', { className: 'text-slate-300 p-3 bg-slate-800 rounded' }, prompt),
            React.createElement('button', {
                className: 'px-6 py-3 bg-red-700 hover:bg-red-600 rounded font-bold',
                onClick: function() {
                    setRecording(true);
                    setTimeout(function() { setRecording(false); }, 3000);
                },
                disabled: recording
            }, recording ? '🔴 Grabando... (simulado)' : '🎙️ Iniciar grabación (simulación)'),
            recording ? React.createElement('p', { className: 'text-yellow-400 text-sm' }, 'Habla ahora... La grabación se detendrá automáticamente.') : null,
            !recording ? React.createElement('p', { className: 'text-slate-400 text-sm' }, 'En una versión futura se integrará reconocimiento de voz.') : null
        );
    };

    return React.createElement('div', { className: 'p-4 max-w-4xl mx-auto text-gray-100' },
        selLevelId ? renderTaskView() : renderLevelList()
    );
};