const { useState, useEffect, useCallback } = React;

const LessonView = ({ levelId, lessonIdx, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchResult, setMatchResult] = useState([]);
  const [progress, setProgress] = useState(() => (window.SRSHelpers ? window.SRSHelpers.loadProgress() : { completed: {}, xp: 0, streak: 0 }));
  const [showComponent, setShowComponent] = useState(null); // 'podcast' | 'story' | null

  useEffect(() => {
    if (!window.PhraseGenerator) return;
    const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);
    if (!lesson) return;
    setExercises(lesson.exercises || []);
    setCurrentEx(0);
    setUserAnswer("");
    setFeedback(null);
    setMatchSelected(null);
    setMatchResult([]);
  }, [levelId, lessonIdx]);

  useEffect(() => {
    if (window.SRSHelpers) window.SRSHelpers.saveProgress(progress);
  }, [progress]);

  const speak = useCallback((text) => {
    window.RutaAudio?.speak(text);
  }, []);

  const checkAnswer = (submittedAnswer = null) => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const answerToCheck = submittedAnswer !== null ? submittedAnswer : userAnswer;
    const lang = (ex.type === 'translateES' || ex.type === 'choose') ? 'es' : 'de';
    const result = window.Corrector.check(answerToCheck, ex.answer, lang);
    setFeedback({
      correct: result.correct,
      exact: result.exact,
      answer: ex.answer,
      hint: result.message
    });
    if (ex.word && window.SRSHelpers) {
      const newProgress = window.SRSHelpers.updateWordSRS(progress, ex.word[0], ex.type, result.correct);
      newProgress.xp = (newProgress.xp || 0) + (result.correct ? 10 : 0);
      setProgress(window.SRSHelpers.updateStreak(newProgress));
    }
    // Avance automático si es correcto
    if (result.correct) {
      setTimeout(() => nextExercise(), 1500);
    }
  };

  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setFeedback(null);
      setMatchSelected(null);
      setMatchResult([]);
    } else {
      const lessonId = levelId + "-l" + (lessonIdx + 1);
      const newProgress = { ...progress };
      newProgress.completed[lessonId] = true;
      setProgress(newProgress);
      onBack();
    }
  };

  const ex = exercises[currentEx];
  if (!ex) return <div className="text-white p-4">Cargando ejercicios...</div>;

  // Si se ha elegido podcast o historia, se muestra la vista correspondiente
  if (showComponent === 'podcast') {
    return <PodcastView onBack={() => setShowComponent(null)} />;
  }
  if (showComponent === 'story') {
    return <StoryView onBack={() => setShowComponent(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Lección {lessonIdx+1} – {ex.type}</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowComponent('podcast')} className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-500 transition shadow">
              🎙️ Podcast
            </button>
            <button onClick={() => setShowComponent('story')} className="px-3 py-1 bg-pink-600 text-white text-xs rounded-full hover:bg-pink-500 transition shadow">
              🎬 Historia
            </button>
            <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">
              ← Volver
            </button>
          </div>
        </div>
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700">
          <div className="flex items-center mb-6">
            <p className="text-slate-200 font-medium text-lg">{ex.prompt}</p>
            {ex.speakText && (
              <button onClick={() => speak(ex.speakText)} className="ml-2 text-slate-400 hover:text-white transition" title="Escuchar">
                🔊
              </button>
            )}
          </div>
          {ex.type === "matchPairs" ? (
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div>
                <h3 className="text-white font-bold mb-3 text-center">Alemán</h3>
                {ex.leftColumn.map((word, idx) => (
                  <button key={idx} onClick={() => {
                    if (matchResult.some(r => r.left === word)) return;
                    if (!matchSelected) { setMatchSelected({ idx, word }); }
                    else {
                      const correctPair = ex.pairs.find(p => p.de === matchSelected.word && p.es === word);
                      if (correctPair) {
                        setMatchResult([...matchResult, { left: matchSelected.word, right: word }]);
                        setMatchSelected(null);
                        if (matchResult.length + 1 === ex.pairs.length) {
                          checkAnswer(null);
                        }
                      } else { setMatchSelected(null); }
                    }
                  }} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition ${matchResult.some(r => r.left === word) ? "bg-emerald-600 text-white" : matchSelected?.word === word ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{word}</button>
                ))}
              </div>
              <div>
                <h3 className="text-white font-bold mb-3 text-center">Español</h3>
                {ex.rightColumn.map((word, idx) => (
                  <button key={idx} onClick={() => {
                    if (matchSelected && !matchResult.some(r => r.right === word)) {
                      const correctPair = ex.pairs.find(p => p.de === matchSelected.word && p.es === word);
                      if (correctPair) {
                        setMatchResult([...matchResult, { left: matchSelected.word, right: word }]);
                        setMatchSelected(null);
                        if (matchResult.length + 1 === ex.pairs.length) {
                          checkAnswer(null);
                        }
                      } else { setMatchSelected(null); }
                    }
                  }} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition ${matchResult.some(r => r.right === word) ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{word}</button>
                ))}
              </div>
            </div>
          ) : ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt, i) => (
                <button key={i} onClick={() => checkAnswer(opt)} className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white">{opt}</button>
              ))}
            </div>
          ) : (
            <div>
              <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} className="w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400" onKeyDown={e => e.key === "Enter" && checkAnswer()} placeholder="Escribe tu respuesta..." />
              <button onClick={() => checkAnswer()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">Comprobar</button>
            </div>
          )}
        </div>
        {feedback && (
          <div className={`p-4 rounded-xl ${feedback.correct ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700" : "bg-red-900/80 text-red-200 border border-red-700"}`}>
            {feedback.correct ? (
              <div>
                <span>{feedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"}</span>
                {feedback.hint && <p className="text-sm mt-1 opacity-80">{feedback.hint}</p>}
                {ex.translation && <p className="text-sm mt-1 text-slate-300">Traducción: {ex.translation}</p>}
              </div>
            ) : (
              <div>
                <span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{feedback.answer}</strong></span>
                {ex.translation && <p className="text-sm mt-1 text-slate-300">Traducción: {ex.translation}</p>}
              </div>
            )}
          </div>
        )}
        {feedback && !feedback.correct && (
          <button onClick={nextExercise} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
};

window.LessonView = LessonView;