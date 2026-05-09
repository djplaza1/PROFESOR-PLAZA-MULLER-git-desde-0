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

  const checkAnswer = () => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const isCorrect = (userAnswer || "").trim().toLowerCase() === (ex.answer || "").trim().toLowerCase();
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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{activeLesson?.title} – {ex.type}</h2>
            <button onClick={goBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
              ← Volver
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow mb-4">
            <p className="text-gray-700 mb-4 font-medium">{ex.prompt}</p>
            {ex.options ? (
              <div className="space-y-2">
                {ex.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { setUserAnswer(opt); checkAnswer(); }}
                    className="block w-full text-left p-3 border rounded-lg hover:bg-blue-50 transition"
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
                  className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
                  onKeyDown={e => e.key === "Enter" && checkAnswer()}
                  placeholder="Escribe tu respuesta..."
                />
                <button onClick={checkAnswer} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Comprobar
                </button>
              </div>
            )}
          </div>
          {feedback && (
            <div className={`p-4 rounded-lg ${feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {feedback.correct ? "✅ ¡Correcto!" : `❌ Incorrecto. La respuesta era: ${feedback.answer}`}
            </div>
          )}
          {feedback && (
            <button onClick={nextExercise} className="mt-4 w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              {currentEx < exercises.length - 1 ? "Siguiente →" : "Finalizar lección"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── VISTA PRINCIPAL DE NIVELES ───
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🗺️ Ruta de Aprendizaje</h2>
        <p className="text-sm text-gray-500 mb-6">
          {Object.keys(progress.completed || {}).length} lecciones completadas · {progress.xp || 0} XP · Racha: {progress.streak || 0} días
        </p>
        {levels.map((level, idx) => {
          const isUnlocked = idx === 0 || (levels[idx-1]?.lessons > 0 && Object.keys(progress.completed || {}).some(c => c.startsWith(levels[idx-1].id + "-l")));
          const lessonsCompleted = Object.keys(progress.completed || {}).filter(c => c.startsWith(level.id + "-l")).length;
          return (
            <div key={level.id} className={`bg-white rounded-xl shadow p-4 mb-4 ${!isUnlocked ? "opacity-50" : ""}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{level.badge} {level.title} <span className="text-gray-400 text-sm">({level.words} palabras)</span></h3>
                <span className="text-xs text-gray-400">{lessonsCompleted}/{level.lessons} lecciones</span>
              </div>
              {isUnlocked && level.lessons > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: level.lessons }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => openLesson(level.id, i)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                        progress.completed?.[level.id + "-l" + (i+1)]
                          ? "bg-green-200 text-green-800 hover:bg-green-300"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
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
