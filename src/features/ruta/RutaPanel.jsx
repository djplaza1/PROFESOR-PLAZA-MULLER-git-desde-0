const { useState, useEffect } = React;

const RutaPanel = () => {
  const levels = window.LevelConfig?.LEVEL_CONFIG || [];
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(() => (window.SRSHelpers ? window.SRSHelpers.loadProgress() : { completed: {}, xp: 0, streak: 0 }));
  const [view, setView] = useState("levels");

  useEffect(() => {
    if (window.SRSHelpers) window.SRSHelpers.saveProgress(progress);
  }, [progress]);

  const openLesson = (levelId, lessonIdx) => {
    if (!window.PhraseGenerator) return;
    const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);
    if (!lesson) return;
    setActiveLevel(levelId);
    setActiveLesson(lesson);
    setExercises(lesson.exercises || []);
    setCurrentEx(0);
    setUserAnswer("");
    setFeedback(null);
    setView("lesson");
  };

  // Recibe opcionalmente la respuesta (para elección múltiple)
  const checkAnswer = (submittedAnswer = null) => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const answerToCheck = submittedAnswer !== null ? submittedAnswer : userAnswer;
    const normalizedAnswer = (ex.answer || "").trim().toLowerCase();
    const normalizedUser = (answerToCheck || "").trim().toLowerCase();
    const isCorrect = normalizedUser === normalizedAnswer;
    setFeedback({ correct: isCorrect, answer: ex.answer });
    if (ex.word && window.SRSHelpers) {
      const newProgress = window.SRSHelpers.updateWordSRS(progress, ex.word[0], ex.type, isCorrect);
      newProgress.xp = (newProgress.xp || 0) + (isCorrect ? 10 : 0);
      setProgress(window.SRSHelpers.updateStreak(newProgress));
    }
  };

  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setFeedback(null);
    } else {
      const lessonId = activeLesson?.id;
      if (lessonId) {
        const newProgress = { ...progress };
        newProgress.completed[lessonId] = true;
        setProgress(newProgress);
      }
      setView("levels");
      setActiveLesson(null);
    }
  };

  const goBack = () => {
    setView("levels");
    setActiveLesson(null);
    setExercises([]);
    setCurrentEx(0);
    setUserAnswer("");
    setFeedback(null);
  };

  // ─── VISTA DE LECCIÓN ───
  if (view === "lesson" && exercises[currentEx]) {
    const ex = exercises[currentEx];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{activeLesson?.title} – {ex.type}</h2>
            <button onClick={goBack} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition">
              ← Volver
            </button>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-4">
            <p className="text-gray-700 mb-6 font-medium text-lg">{ex.prompt}</p>
            {ex.options ? (
              <div className="space-y-3">
                {ex.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => checkAnswer(opt)}
                    className="block w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition font-medium text-gray-800"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
                  onKeyDown={e => e.key === "Enter" && checkAnswer()}
                  placeholder="Escribe tu respuesta..."
                />
                <button onClick={() => checkAnswer()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">
                  Comprobar
                </button>
              </div>
            )}
          </div>
          {feedback && (
            <div className={`p-4 rounded-xl flex items-center space-x-2 ${feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {feedback.correct ? (
                <span>✅ ¡Correcto!</span>
              ) : (
                <span>❌ Incorrecto. La respuesta era: <strong>{feedback.answer}</strong></span>
              )}
            </div>
          )}
          {feedback && (
            <button onClick={nextExercise} className="mt-4 w-full px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition shadow-md font-medium">
              {currentEx < exercises.length - 1 ? "Siguiente →" : "Finalizar lección"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── VISTA PRINCIPAL DE NIVELES ───
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🗺️ Ruta de Aprendizaje</h2>
        <p className="text-sm text-gray-500 mb-8">
          {Object.keys(progress.completed || {}).length} lecciones completadas · {progress.xp || 0} XP · Racha: {progress.streak || 0} días
        </p>
        {levels.map((level, idx) => {
          const isUnlocked = idx === 0 || (levels[idx-1]?.lessons > 0 && Object.keys(progress.completed || {}).some(c => c.startsWith(levels[idx-1].id + "-l")));
          const lessonsCompleted = Object.keys(progress.completed || {}).filter(c => c.startsWith(level.id + "-l")).length;
          return (
            <div key={level.id} className={`bg-white rounded-2xl shadow-md p-5 mb-4 transition ${!isUnlocked ? "opacity-50" : "hover:shadow-lg"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 text-lg">{level.badge} {level.title} <span className="text-gray-400 text-sm font-normal">({level.words} palabras)</span></h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{lessonsCompleted}/{level.lessons}</span>
              </div>
              {isUnlocked && level.lessons > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: level.lessons }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => openLesson(level.id, i)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                        progress.completed?.[level.id + "-l" + (i+1)]
                          ? "bg-green-400 text-white shadow-sm hover:bg-green-500"
                          : "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                      }`}
                    >
                      {i+1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.RutaPanel = RutaPanel;
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.ruta = RutaPanel;
