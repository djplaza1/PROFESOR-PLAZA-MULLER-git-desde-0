window.Muller = window.Muller || {};
window.Muller.CloudPractice = function CloudPractice({ onBack, type, examCtx, setExamCtx }) {
    const M = window.Muller;
    const [queue, setQueue] = React.useState([]);
    const [feedback, setFeedback] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [progressMap, setProgressMap] = React.useState(function() { return M.getAdvancedProgress(); });
    const [queueFilter, setQueueFilter] = React.useState('smart');
    const [showTranslation, setShowTranslation] = React.useState(false);
    const effectiveFilter = examCtx ? 'smart' : queueFilter;

    React.useEffect(function() {
        var id = (queue[0] && (queue[0].de + (queue[0].answer || ''))) || '';
        if (id) setShowTranslation(false);
    }, [queue[0] && queue[0].de, queue[0] && queue[0].answer]);

    var handleTranslationHint = function() {
        if (!examCtx || !setExamCtx) return;
        var left = examCtx.hintsTotal - examCtx.hintsUsed;
        if (left <= 0) return;
        setExamCtx(function(prev) { return prev ? { ...prev, hintsUsed: (prev.hintsUsed || 0) + 1 } : prev; });
        setShowTranslation(true);
    };

    React.useEffect(function() {
        var URL_VERBOS = 'https://gist.githubusercontent.com/djplaza1/142845d2f0fb5a0b2b86e28fbf308809/raw/verbos_con_preposiciones.json';
        var URL_PREPOSICIONES = 'https://gist.githubusercontent.com/djplaza1/4f44a8b19a8aa2d451e183859e3f764f/raw/preposiciones.json';
        var GIST_URL = type === 'verbos' ? URL_VERBOS : URL_PREPOSICIONES;

        setLoading(true);
        fetch(GIST_URL + '?nocache=' + new Date().getTime())
            .then(function(res) { return res.json(); })
            .then(function(data) {
                var queueType = type === 'verbos' ? 'verbos' : 'preposiciones';
                var getId = function(item) { return queueType + '::' + item.de + '::' + item.answer; };
                var adaptive = M.buildAdaptiveQueue(data, progressMap, getId);
                var filtered = M.filterQueueByMode(adaptive, progressMap, getId, effectiveFilter);
                setQueue(filtered.length > 0 ? filtered : adaptive);
                setLoading(false);
            })
            .catch(function() { setLoading(false); });
    }, [type, effectiveFilter]);

    var check = function(guess) {
        if (queue.length === 0) return;
        var currentItem = queue[0];
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(currentItem.de.replace('___', currentItem.answer));
        utterance.lang = 'de-DE';
        if (window.__mullerApplyPreferredDeVoice) window.__mullerApplyPreferredDeVoice(utterance);
        window.speechSynthesis.speak(utterance);

        if (guess === currentItem.answer) {
            setFeedback({ type: 'success', text: '¡Richtig! Es \'' + currentItem.answer + '\'', currentCard: currentItem, tip: M.getCardTip(type, currentItem) });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(true);
        } else {
            setFeedback({ type: 'error', text: '⚠️ FALSCH: Era \'' + currentItem.answer + '\'', currentCard: currentItem, tip: M.getCardTip(type, currentItem) });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(false);
        }
    };

    var registerTrainingResult = function(difficulty) {
        if (!feedback || queue.length === 0) return;
        M.registerDailyAttempt();
        var current = feedback.currentCard || queue[0];
        var queueType = type === 'verbos' ? 'verbos' : 'preposiciones';
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

    var handleContinue = function() {
        if (feedback.type === 'success') {
            setQueue(function(prev) { return prev.slice(1); });
        } else {
            setQueue(function(prev) { return prev.slice(1).concat([prev[0]]); });
        }
        setFeedback(null);
    };

    if (loading) return React.createElement('div', { className: 'p-10' },
        React.createElement('div', { className: 'muller-skeleton h-5 w-64 rounded mb-4 mx-auto' }),
        React.createElement('div', { className: 'muller-skeleton h-36 w-full max-w-2xl rounded-2xl mx-auto' })
    );
    if (queue.length === 0) return React.createElement('div', { className: 'text-center p-20' },
        React.createElement('h2', { className: 'text-3xl font-bold text-green-400' }, '¡Mazo Completado! 🏆'),
        React.createElement('button', { onClick: onBack, className: 'mt-4 bg-gray-800 p-2 rounded text-white' }, 'Volver')
    );

    var current = queue[0];
    var options = type === 'verbos'
        ? ['für', 'auf', 'an', 'von', 'über', 'mit', 'um', 'zu', 'vor', 'nach', 'in', 'bei', 'aus', 'durch', 'ohne', 'gegen']
        : ['an', 'auf', 'in', 'aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'durch', 'für', 'um', 'vor', 'über', 'unter', 'neben', 'zwischen', 'hinter', 'gegen', 'ohne'];
    var examHideEs = !!(examCtx && !showTranslation && !feedback);

    return React.createElement('div', { className: 'flex flex-col items-center justify-center p-4 h-full w-full relative' },
        React.createElement('button', { onClick: onBack, className: 'absolute top-4 left-4 bg-gray-800 p-2 rounded text-gray-300 z-10' }, examCtx ? '← Salir del examen' : '← Volver'),
        React.createElement('div', { className: 'bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl text-center max-w-4xl w-full border ' + (examCtx ? 'border-amber-600/35' : 'border-slate-700') },
            examCtx ? React.createElement('div', { className: 'mb-4' }, 'Examen en curso') : null,
            !examCtx ? React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-5 gap-2 mb-4' },
                ['smart','failed','difficult','weak','new'].map(function(f) {
                    return React.createElement('button', {
                        key: f,
                        onClick: function() { setQueueFilter(f); },
                        className: 'p-2 rounded-lg text-xs font-bold ' + (queueFilter === f ? 'bg-blue-700 text-white' : 'bg-slate-700 text-gray-200')
                    }, f === 'smart' ? 'Mezcla inteligente' : f === 'failed' ? 'Solo falladas' : f === 'difficult' ? 'Solo difíciles' : f === 'weak' ? 'Solo débiles' : 'Solo nuevas');
                })
            ) : null,
            examCtx ? React.createElement('p', { className: 'text-[11px] text-slate-500 mb-3 text-left' }, 'Examen: mezcla inteligente fija (sin filtros).') : null,
            React.createElement('p', { className: 'text-blue-400 font-bold mb-2 uppercase tracking-widest' }, current.prepCase || '🟡 Wechsel'),
            React.createElement('h3', { className: 'text-3xl md:text-4xl font-bold text-white mb-4 leading-tight' }, current.de.replace('___', '_____')),
            examHideEs
                ? React.createElement('p', { className: 'text-slate-500 mb-8 text-sm italic border border-dashed border-slate-600 rounded-lg py-6 px-3' }, 'Traducción oculta — usa una pista arriba si la necesitas.')
                : React.createElement('p', { className: 'text-gray-400 mb-8 text-xl italic' }, current.es),
            !feedback
                ? React.createElement('div', { className: 'flex flex-wrap justify-center gap-2 max-h-[250px] overflow-y-auto p-2' },
                    options.map(function(p) {
                        return React.createElement('button', {
                            key: p,
                            onClick: function() { check(p); },
                            className: 'bg-gray-700 hover:bg-amber-600 py-2 px-3 rounded-lg font-bold text-sm text-white min-w-[70px]'
                        }, p);
                    })
                )
                : React.createElement('div', { className: 'animate-in zoom-in' },
                    React.createElement('div', { className: 'p-4 rounded-xl font-bold text-xl mb-4 ' + (feedback.type === 'error' ? 'bg-red-900 border-red-500 border' : 'bg-green-900 border-green-500 border') }, feedback.text),
                    React.createElement('p', { className: 'text-gray-400 mb-4 text-lg italic' }, 'ES: ' + (feedback.currentCard || current).es),
                    React.createElement('div', { className: 'bg-black/40 p-4 rounded-xl border border-amber-500/30 text-left mb-6' },
                        React.createElement('p', { className: 'text-amber-400 font-bold text-sm uppercase mb-1' }, '💡 Müller-Tipp:'),
                        React.createElement('p', { className: 'text-gray-200 text-sm italic' }, feedback.tip)
                    ),
                    React.createElement('div', { className: 'grid grid-cols-3 gap-2 mb-4' },
                        React.createElement('button', { onClick: function() { registerTrainingResult('easy'); }, className: 'bg-emerald-700 hover:bg-emerald-600 text-white py-2 rounded-lg font-bold text-sm' }, 'Fácil'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('normal'); }, className: 'bg-yellow-700 hover:bg-yellow-600 text-white py-2 rounded-lg font-bold text-sm' }, 'Normal'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('difficult'); }, className: 'bg-rose-700 hover:bg-rose-600 text-white py-2 rounded-lg font-bold text-sm' }, 'Difícil')
                    ),
                    React.createElement('button', { onClick: handleContinue, className: 'w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-xl' }, 'CONTINUAR →')
                )
        )
    );
};