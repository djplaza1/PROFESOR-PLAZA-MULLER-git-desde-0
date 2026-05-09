// RutaPanel.jsx – Panel principal de la Ruta de aprendizaje
// Versión reconstruida con generador de frases, 8 tipos de ejercicios y SRS.

const { useState, useEffect } = React;

const RutaPanel = () => {
  const levels = window.LevelConfig?.LEVEL_CONFIG || [];
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(SRSHelpers.loadProgress());
  const [view, setView] = useState("levels"); // levels | lesson | test

  useEffect(() => {
    SRSHelpers.saveProgress(progress);
  }, [progress]);

  // Abrir una lección
  const openLesson = (levelId, lessonIdx) => {
    const lesson = PhraseGenerator.generateLesson(levelId, lessonIdx);
    if (!lesson) return;
    setActiveLevel(levelId);
    setActiveLesson(lesson);
    setExercises(lesson.exercises);
    setCurrentEx(0);
    setUserAnswer("");
    setFeedback(null);
    setView("lesson");
  };

  // Comprobar respuesta
  const checkAnswer = () => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.trim().toLowerCase();
    setFeedback({ correct: isCorrect, answer: ex.answer });
    // Actualizar progreso SRS para la palabra
    if (ex.word) {
      const newProgress = SRSHelpers.updateWordSRS(progress, ex.word[0], ex.type, isCorrect);
      newProgress.xp = (newProgress.xp || 0) + (isCorrect ? 10 : 0);
      setProgress(SRSHelpers.updateStreak(newProgress));
    }
  };

  // Siguiente ejercicio
  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setFeedback(null);
    } else {
      // Lección completada
      const lessonId = `${activeLesson.levelId}-l${activeLesson.id.split("-l")[1]}`;
      const newProgress = { ...progress };
      newProgress.completed[lessonId] = true;
      setProgress(newProgress);
      setView("levels");
      setActiveLesson(null);
    }
  };

  // Renderizar mapa de niveles
  const renderLevels = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🗺️ Ruta de Aprendizaje</h2>
      <p className="text-sm text-gray-600 mb-4">
        {Object.keys(progress.completed || {}).length} lecciones completadas · {progress.xp || 0} XP · Racha: {progress.streak || 0} días
      </p>
      {levels.map((level, idx) => {
        const isUnlocked = idx === 0 || levels[idx-1]?.lessons > 0 && Object.keys(progress.completed || {}).some(c => c.startsWith(levels[idx-1].id + "-l"));
        const lessonsCompleted = Object.keys(progress.completed || {}).filter(c => c.startsWith(level.id + "-l")).length;
        return (
          <div key={level.id} className={`mb-4 p-3 rounded-lg border ${isUnlocked ? "bg-white" : "bg-gray-100 opacity-50"}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{level.badge} {level.title} ({level.words} palabras)</h3>
              <span className="text-xs">{lessonsCompleted}/{level.lessons} lecciones</span>
            </div>
            {isUnlocked && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {Array.from({ length: level.lessons }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => openLesson(level.id, i)}
                    className={`p-2 text-xs rounded ${progress.completed[`${level.id}-l${i+1}`] ? "bg-green-200" : "bg-blue-100 hover:bg-blue-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Renderizar ejercicio actual
  const renderExercise = () => {
    if (!exercises[currentEx]) return null;
    const ex = exercises[currentEx];
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">{activeLesson?.title} – {ex.type}</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="mb-2 font-medium">{ex.prompt}</p>
          {ex.options ? (
            <div className="space-y-2">
              {ex.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setUserAnswer(opt); checkAnswer(); }}
                  className="block w-full text-left p-2 border rounded hover:bg-gray-100"
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
                className="w-full p-2 border rounded mb-2"
                onKeyDown={e => e.key === "Enter" && checkAnswer()}
              />
              <button onClick={checkAnswer} className="px-4 py-2 bg-blue-500 text-white rounded">
                Comprobar
              </button>
            </div>
          )}
        </div>
        {feedback && (
          <div className={`p-3 rounded ${feedback.correct ? "bg-green-100" : "bg-red-100"}`}>
            {feedback.correct ? "✅ ¡Correcto!" : `❌ Incorrecto. La respuesta era: ${feedback.answer}`}
          </div>
        )}
        {feedback && (
          <button onClick={nextExercise} className="mt-4 px-4 py-2 bg-gray-300 rounded">
            {currentEx < exercises.length - 1 ? "Siguiente →" : "Finalizar lección"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {view === "levels" && renderLevels()}
      {view === "lesson" && renderExercise()}
    </div>
  );
};

window.RutaPanel = RutaPanel;

// ─── Registrar en el sistema de paneles ───
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.ruta = RutaPanel;

// ─── Registrar en el sistema de paneles ───
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.ruta = RutaPanel;
