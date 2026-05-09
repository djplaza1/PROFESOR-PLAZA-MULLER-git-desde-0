const { useState, useEffect } = React;

// ─── Normalizador flexible para alemán y español ───
function normalize(str) {
  return (str || "").trim().toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[áàâ]/g, 'a').replace(/[éèê]/g, 'e').replace(/[íìî]/g, 'i')
    .replace(/[óòô]/g, 'o').replace(/[úùû]/g, 'u').replace(/ñ/g, 'n');
}

function checkFlexible(user, correct, lang) {
  const norm = (s) => (s||"").trim().toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[áàâ]/g,'a').replace(/[éèê]/g,'e').replace(/[íìî]/g,'i')
    .replace(/[óòô]/g,'o').replace(/[úùû]/g,'u').replace(/ñ/g,'n');
  const u = norm(user), c = norm(correct);
  if (u === c) return { correct: true, exact: true, message: "" };

  // Quitar todos los artículos y preposiciones cortas para comparar solo núcleo
  const clean = (s) => s.split(' ').filter(w => !['der','die','das','el','la','los','las','un','una','de','del','the','a','an'].includes(w)).join(' ');
  const uClean = norm(clean(user)), cClean = norm(clean(correct));
  if (uClean === cClean && uClean.length > 2) {
    return { correct: true, exact: false, message: "Correcto, pero no olvides los artículos y preposiciones." };
  }

  // Si es un sustantivo alemán sin mayúscula
  if (lang === 'de' && user.trim().charAt(0) === user.trim().charAt(0).toLowerCase()) {
    const cap = user.trim().charAt(0).toUpperCase() + user.trim().slice(1);
    if (norm(cap) === c) return { correct: true, exact: false, message: "Bien, pero los sustantivos alemanes llevan mayúscula: " + cap + "." };
  }

  return { correct: false, exact: false, message: "" };
}

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

  const checkAnswer = (submittedAnswer = null) => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const answerToCheck = submittedAnswer !== null ? submittedAnswer : userAnswer;
    const lang = (ex.type === 'translateES' || ex.type === 'choose') ? 'es' : 'de';
    const result = checkFlexible(answerToCheck, ex.answer, lang);
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

  if (view === "lesson" && exercises[currentEx]) {
    const ex = exercises[currentEx];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{activeLesson?.title} – {ex.type}</h2>
            <button onClick={goBack} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">
              ← Volver
            </button>
          </div>
          <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700">
            <p className="text-slate-200 mb-6 font-medium text-lg">{ex.prompt}</p>
            {ex.options ? (
              <div className="space-y-3">
                {ex.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => checkAnswer(opt)}
                    className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white"
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
                  className="w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400"
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
            <div className={`p-4 rounded-xl ${feedback.correct ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700" : "bg-red-900/80 text-red-200 border border-red-700"}`}>
              {feedback.correct ? (
                <div>
                  <span>{feedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"}</span>
                  {feedback.hint && <p className="text-sm mt-1 opacity-80">{feedback.hint}</p>}
                </div>
              ) : (
                <div>
                  <span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{feedback.answer}</strong></span>
                </div>
              )}
            </div>
          )}
          {feedback && (
            <button onClick={nextExercise} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
              {currentEx < exercises.length - 1 ? "Siguiente →" : "Finalizar lección"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">🗺️ Ruta de Aprendizaje</h2>
        <p className="text-sm text-slate-400 mb-8">
          {Object.keys(progress.completed || {}).length} lecciones · {progress.xp || 0} XP · Racha {progress.streak || 0} días
        </p>
        {levels.map((level, idx) => {
          const isUnlocked = idx === 0 || (levels[idx-1]?.lessons > 0 && Object.keys(progress.completed || {}).some(c => c.startsWith(levels[idx-1].id + "-l")));
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
