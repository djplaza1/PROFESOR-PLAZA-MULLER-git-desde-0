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
    const examLoadRef = React.useRef(false);

    const [masteredArticles, setMasteredArticles] = React.useState(function() {
        var saved = localStorage.getItem('muller_mastered_articles');
        return saved ? JSON.parse(saved) : [];
    });

    var loadData = function(selectedMode) {
        setMode(selectedMode);
        setLoading(true);

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
            var GIST_URL = 'https://gist.githubusercontent.com/djplaza1/a53fde18c901a7f2d86977174b5b9a72/raw/articulos.json?nocache=' + new Date().getTime();
            fetch(GIST_URL).then(function(res) { return res.json(); }).then(processData).catch(function() {
                alert('Error de conexión con la base de datos Müller.');
                if (examCtx) onBack();
                else { setMode(null); setLoading(false); }
            });
        }
    };

    React.useEffect(function() {
        if (examCtx && examAutoLevel && !examLoadRef.current) {
            examLoadRef.current = true;
            loadData(examAutoLevel);
        }
    }, [examCtx, examAutoLevel]);

    React.useEffect(function() {
        var id = queue[0] && queue[0].de;
        if (id) setShowTranslation(false);
    }, [queue[0] && queue[0].de]);

    var handleTranslationHint = function() {
        if (!examCtx || !setExamCtx) return;
        var left = examCtx.hintsTotal - examCtx.hintsUsed;
        if (left <= 0) return;
        setExamCtx(function(prev) { return prev ? { ...prev, hintsUsed: (prev.hintsUsed || 0) + 1 } : prev; });
        setShowTranslation(true);
    };

    var handleMastered = function() {
        var currentWord = queue[0].de;
        var newMastered = masteredArticles.concat([currentWord]);
        setMasteredArticles(newMastered);
        localStorage.setItem('muller_mastered_articles', JSON.stringify(newMastered));
        setQueue(function(prev) { return prev.slice(1); });
        setFeedback(null);
    };

    var handleNextWord = function() {
        if (feedback.type === 'success') {
            setQueue(function(prev) { return prev.slice(1); });
        } else {
            setQueue(function(prev) { return prev.slice(1).concat([prev[0]]); });
        }
        setFeedback(null);
    };

    var registerTrainingResult = function(difficulty) {
        if (!feedback || queue.length === 0) return;
        M.registerDailyAttempt();
        var current = feedback.currentCard || queue[0];
        var id = 'articulos::' + current.de;
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
        handleNextWord();
    };

    var check = function(guess) {
        if (queue.length === 0) return;
        var current = queue[0];
        var correct = current.de.split(' ')[0].toLowerCase();

        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(current.de);
        utterance.lang = 'de-DE';
        if (window.__mullerApplyPreferredDeVoice) window.__mullerApplyPreferredDeVoice(utterance);
        window.speechSynthesis.speak(utterance);

        if (guess === correct) {
            setFeedback({ type: 'success', text: '¡Richtig! 🟢 ' + current.de, tip: M.getCardTip('articulos', current), currentCard: current });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(true);
        } else {
            setFeedback({ type: 'error', text: '⚠️ FALSCH! Era: ' + current.de, tip: M.getCardTip('articulos', current), currentCard: current });
            if (window.__mullerNotifyExerciseOutcome) window.__mullerNotifyExerciseOutcome(false);
        }
    };

    if (!mode) {
        if (examCtx && examAutoLevel) return React.createElement('div', { className: 'p-10' });
        return React.createElement('div', { className: 'flex flex-col items-center justify-center p-4 h-full w-full max-w-4xl mx-auto' },
            React.createElement('button', { onClick: onBack, className: 'absolute top-4 left-4 bg-gray-800 p-2 rounded text-white hover:bg-gray-700' }, '← Volver'),
            React.createElement('h2', { className: 'text-3xl font-bold mb-2 text-blue-300' }, 'Artículos Müller'),
            React.createElement('p', { className: 'text-gray-400 mb-8 font-bold' }, '⭐ ' + masteredArticles.length + ' palabras en tu "Memoria de Oro"'),
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-2 w-full mb-6' },
                ['smart','failed','difficult','weak','new'].map(function(f) {
                    return React.createElement('button', {
                        key: f,
                        onClick: function() { setQueueFilter(f); },
                        className: 'p-2 rounded-lg text-xs font-bold ' + (queueFilter === f ? 'bg-blue-700 text-white' : 'bg-slate-800 text-gray-300')
                    }, f === 'smart' ? 'Mezcla inteligente' : f === 'failed' ? 'Solo falladas' : f === 'difficult' ? 'Solo difíciles' : f === 'weak' ? 'Solo débiles' : 'Solo nuevas');
                })
            ),
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-3 gap-4 w-full' },
                React.createElement('button', { onClick: function() { loadData('historia'); }, className: 'col-span-2 md:col-span-3 bg-purple-900 border-2 border-purple-500 p-6 rounded-xl font-bold text-xl hover:bg-purple-800 transition' }, '📖 Historia Actual'),
                ['A1','A2','B1','B2','C1','MIXTO'].map(function(lvl) {
                    return React.createElement('button', { key: lvl, onClick: function() { loadData(lvl); }, className: 'bg-slate-800 border-b-4 border-blue-500 p-6 rounded-xl font-bold text-lg hover:bg-slate-700 transition' }, lvl);
                })
            )
        );
    }

    if (loading) return React.createElement('div', { className: 'p-10' },
        React.createElement('div', { className: 'muller-skeleton h-6 w-64 rounded mb-4' }),
        React.createElement('div', { className: 'muller-skeleton h-36 w-full max-w-xl rounded-2xl' })
    );
    if (queue.length === 0) return React.createElement('div', { className: 'p-20 text-center' },
        React.createElement('h2', { className: 'text-2xl text-green-400' }, '¡Mazo completado! 🏆'),
        React.createElement('button', { onClick: function() { setMode(null); }, className: 'mt-4 bg-gray-800 p-2 rounded text-white' }, 'Elegir otro')
    );

    var wordWithoutArticle = queue[0].de.split(' ').slice(1).join(' ');
    var examHideEs = !!(examCtx && !showTranslation && !feedback);

    return React.createElement('div', { className: 'flex flex-col items-center justify-center p-4 h-full relative' },
        examCtx ? React.createElement('button', { onClick: onBack, className: 'absolute top-2 left-2 bg-slate-800/90 p-2 rounded-lg text-gray-300 text-sm z-10' }, '← Salir del examen') : null,
        React.createElement('div', { className: 'bg-slate-800 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border ' + (examCtx ? 'border-amber-600/35' : 'border-slate-700') },
            examCtx ? React.createElement('div', { className: 'mb-4' }, 'Examen en curso') : null,
            React.createElement('h3', { className: 'text-5xl font-black text-white mb-2' }, wordWithoutArticle),
            examHideEs
                ? React.createElement('p', { className: 'text-slate-500 mb-8 text-sm italic border border-dashed border-slate-600 rounded-lg py-6 px-3' }, 'Traducción oculta — usa una pista arriba si la necesitas.')
                : React.createElement('p', { className: 'text-gray-400 mb-8 text-xl italic' }, queue[0].es),
            !feedback
                ? React.createElement('div', { className: 'grid grid-cols-3 gap-2' },
                    React.createElement('button', { onClick: function() { check('der'); }, className: 'bg-blue-600 py-6 rounded-xl font-bold text-xl' }, '🔵 DER'),
                    React.createElement('button', { onClick: function() { check('die'); }, className: 'bg-red-600 py-6 rounded-xl font-bold text-xl' }, '🔴 DIE'),
                    React.createElement('button', { onClick: function() { check('das'); }, className: 'bg-green-600 py-6 rounded-xl font-bold text-xl' }, '🟢 DAS')
                )
                : React.createElement('div', { className: 'animate-in zoom-in' },
                    React.createElement('div', { className: 'p-6 rounded-xl font-black text-2xl mb-6 ' + (feedback.type === 'error' ? 'bg-red-900 border-2 border-red-500 text-red-100' : 'bg-green-900 border-2 border-green-500 text-green-100') }, feedback.text),
                    React.createElement('p', { className: 'text-gray-400 mb-4 text-lg italic' }, 'ES: ' + (feedback.currentCard || queue[0]).es),
                    React.createElement('div', { className: 'bg-black/40 p-4 rounded-xl border border-cyan-500/30 text-left mb-5' },
                        React.createElement('p', { className: 'text-cyan-300 font-bold text-sm uppercase mb-1' }, '💡 Truco para recordarlo'),
                        React.createElement('p', { className: 'text-gray-200 text-sm italic' }, feedback.tip)
                    ),
                    React.createElement('div', { className: 'grid grid-cols-3 gap-2 mb-3' },
                        React.createElement('button', { onClick: function() { registerTrainingResult('easy'); }, className: 'bg-emerald-700 text-white py-2 rounded-lg font-bold text-sm' }, 'Fácil'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('normal'); }, className: 'bg-yellow-700 text-white py-2 rounded-lg font-bold text-sm' }, 'Normal'),
                        React.createElement('button', { onClick: function() { registerTrainingResult('difficult'); }, className: 'bg-rose-700 text-white py-2 rounded-lg font-bold text-sm' }, 'Difícil')
                    ),
                    !examCtx ? React.createElement('button', { onClick: handleMastered, className: 'w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold mb-2' }, '🌟 ¡Ya me la sé para siempre!') : null,
                    React.createElement('button', { onClick: handleNextWord, className: 'w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold' }, feedback.type === 'error' ? 'Reintentar luego →' : 'Siguiente →')
                ),
            React.createElement('p', { className: 'text-gray-500 text-xs mt-6' }, 'Restantes en esta sesión: ' + queue.length)
        )
    );
};