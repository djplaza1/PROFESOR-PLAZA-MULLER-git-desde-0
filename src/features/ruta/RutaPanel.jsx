const { useState, useEffect } = React;

const RutaPanel = () => {
  const levels = window.LevelConfig?.LEVEL_CONFIG || [];
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(null);
  const [progress, setProgress] = useState(() => (window.SRSHelpers ? window.SRSHelpers.loadProgress() : { completed: {}, xp: 0, streak: 0 }));
  const [view, setView] = useState("levels");

  useEffect(() => {
    if (window.SRSHelpers) window.SRSHelpers.saveProgress(progress);
  }, [progress]);

  const openLesson = (levelId, lessonIdx) => {
    setActiveLevel(levelId);
    setActiveLessonIdx(lessonIdx);
    setView("lesson");
  };

  const goBack = () => {
    setView("levels");
    setActiveLevel(null);
    setActiveLessonIdx(null);
  };

  if (view === "lesson" && activeLevel && activeLessonIdx !== null) {
    return <LessonView levelId={activeLevel} lessonIdx={activeLessonIdx} onBack={goBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">🗺️ Ruta de Aprendizaje</h2>
        <p className="text-sm text-slate-400 mb-8">
          {Object.keys(progress.completed || {}).length} lecciones · {progress.xp || 0} XP · Racha {progress.streak || 0} días
        </p>
        {levels.map((level, idx) => {
          const isUnlocked = true; // TODOS LOS NIVELES DESBLOQUEADOS PARA PRUEBAS
          const lessonsCompleted = Object.keys(progress.completed || {}).filter(c => c.startsWith(level.id + "-l")).length;
          return (
            <div key={level.id} className={`bg-slate-800 rounded-2xl shadow-xl p-5 mb-4 border border-slate-700 transition ${!isUnlocked ? "opacity-40" : "hover:border-blue-500"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white text-lg">{level.badge} {level.title} <span className="text-slate-400 text-sm font-normal">({level.words} palabras)</span></h3>
                <span className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded-full">{lessonsCompleted}/{level.lessons}</span>
              </div>
              {isUnlocked && level.lessons > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: level.lessons }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => openLesson(level.id, i)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                        progress.completed?.[level.id + "-l" + (i+1)]
                          ? "bg-emerald-500 text-white shadow hover:bg-emerald-400"
                          : "bg-blue-600 text-white shadow hover:bg-blue-500"
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