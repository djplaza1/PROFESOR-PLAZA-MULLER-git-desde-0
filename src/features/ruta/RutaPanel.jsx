const { useState, useEffect } = React;
const speak = (text) => window.RutaAudio?.speak(text);

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
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchResult, setMatchResult] = useState([]);
  const [podcastActive, setPodcastActive] = useState(false);
  const [podcastSegment, setPodcastSegment] = useState(0);
  const [podcastExerciseIdx, setPodcastExerciseIdx] = useState(0);
  const [podcastUserAnswer, setPodcastUserAnswer] = useState("");
  const [podcastFeedback, setPodcastFeedback] = useState(null);
  const [storyActive, setStoryActive] = useState(false);
  const [storySceneIdx, setStorySceneIdx] = useState(0);
  const [storyExerciseIdx, setStoryExerciseIdx] = useState(0);
  const [storyUserAnswer, setStoryUserAnswer] = useState("");
  const [storyFeedback, setStoryFeedback] = useState(null);

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
    const result = window.Corrector.check(answerToCheck, ex.answer, lang);
    setFeedback({
      correct: result.correct,
      exact: result.exact,
      answer: ex.answer,
      hint: result.message
    });

  /* ── Podcast Helpers ── */
  const startPodcast = () => {
    setPodcastActive(true);
    setPodcastSegment(0);
    setPodcastExerciseIdx(0);
    setPodcastUserAnswer("");
    setPodcastFeedback(null);
    const seg = window.PodcastA1_1?.segments[0];
    if (seg?.audioText) speak(seg.audioText);
  };

  const checkPodcastAnswer = (submitted = null) => {
    const seg = window.PodcastA1_1?.segments[podcastSegment];
    if (!seg) return;
    const ex = seg.exercises[podcastExerciseIdx];
    if (!ex) return;
    const ans = submitted !== null ? submitted : podcastUserAnswer;
    const lang = (ex.type === "translateES" || ex.type === "choose") ? "es" : "de";
    const result = window.Corrector.check(ans, ex.answer, lang);
    setPodcastFeedback({
      correct: result.correct,
      exact: result.exact,
      answer: ex.answer,
      hint: result.message
    });
  };

  const nextPodcastExercise = () => {
    const seg = window.PodcastA1_1?.segments[podcastSegment];
    if (!seg) return;
    if (podcastExerciseIdx < seg.exercises.length - 1) {
      setPodcastExerciseIdx(podcastExerciseIdx + 1);
      setPodcastUserAnswer("");
      setPodcastFeedback(null);
    } else {
      const nextSeg = podcastSegment + 1;
      if (nextSeg < window.PodcastA1_1?.segments.length) {
        setPodcastSegment(nextSeg);
        setPodcastExerciseIdx(0);
        setPodcastUserAnswer("");
        setPodcastFeedback(null);
        const newSeg = window.PodcastA1_1?.segments[nextSeg];
        if (newSeg?.audioText) speak(newSeg.audioText);
      } else {
        // Podcast terminado
        setPodcastActive(false);
        setPodcastSegment(0);
        setPodcastExerciseIdx(0);
        setPodcastUserAnswer("");
        setPodcastFeedback(null);
        alert("🎉 ¡Podcast completado!");
      }
    }
  };


  /* ── Story Helpers ── */
  const startStory = () => {
    setStoryActive(true);
    setStorySceneIdx(0);
    setStoryExerciseIdx(0);
    setStoryUserAnswer("");
    setStoryFeedback(null);
    const firstScene = window.StoryA1_1?.scenes[0];
    if (firstScene?.dialogs?.length) {
      firstScene.dialogs.forEach(d => speak(d.text));
    }
  };

  const checkStoryAnswer = (submitted = null) => {
    const scene = window.StoryA1_1?.scenes[storySceneIdx];
    if (!scene) return;
    const ex = scene.exercises[storyExerciseIdx];
    if (!ex) return;
    const ans = submitted !== null ? submitted : storyUserAnswer;
    const lang = (ex.type === "translateES" || ex.type === "choose") ? "es" : "de";
    const result = window.Corrector.check(ans, ex.answer, lang);
    setStoryFeedback({
      correct: result.correct,
      exact: result.exact,
      answer: ex.answer,
      hint: result.message
    });
  };

  const nextStoryExercise = () => {
    const scene = window.StoryA1_1?.scenes[storySceneIdx];
    if (!scene) return;
    if (storyExerciseIdx < scene.exercises.length - 1) {
      setStoryExerciseIdx(storyExerciseIdx + 1);
      setStoryUserAnswer("");
      setStoryFeedback(null);
    } else {
      const nextScene = storySceneIdx + 1;
      if (nextScene < window.StoryA1_1?.scenes.length) {
        setStorySceneIdx(nextScene);
        setStoryExerciseIdx(0);
        setStoryUserAnswer("");
        setStoryFeedback(null);
        const newScene = window.StoryA1_1?.scenes[nextScene];
        if (newScene?.dialogs?.length) {
          newScene.dialogs.forEach(d => speak(d.text));
        }
      } else {
        setStoryActive(false); setStorySceneIdx(0); setStoryExerciseIdx(0);
        setStoryUserAnswer(""); setStoryFeedback(null);
        alert("🎬 ¡Historia completada!");
      }
    }
  };

  const stopStory = () => {
    setStoryActive(false); setStorySceneIdx(0); setStoryExerciseIdx(0);
    setStoryUserAnswer(""); setStoryFeedback(null);
  };

  const stopPodcast = () => {
    setPodcastActive(false);
    setPodcastSegment(0);
    setPodcastExerciseIdx(0);
    setPodcastUserAnswer("");
    setPodcastFeedback(null);
  };

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

  if (storyActive) {
  const scene = window.StoryA1_1?.scenes[storySceneIdx];
  const ex = scene?.exercises[storyExerciseIdx];
  const totalScenes = window.StoryA1_1?.getTotalScenes() || 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🎬 {window.StoryA1_1?.title} – Escena {storySceneIdx+1}/{totalScenes}</h2>
          <button onClick={stopStory} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">← Volver</button>
        </div>
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700">
          <h3 className="text-white font-semibold mb-3">{scene?.title}</h3>
          {scene?.dialogs.map((d, i) => (
            <div key={i} className="mb-2">
              <p className="text-blue-300 font-medium">{d.speaker}: <span className="text-slate-200 italic">"{d.text}"</span></p>
              <p className="text-slate-500 text-sm">({d.translation})</p>
            </div>
          ))}
          <hr className="border-slate-600 my-4" />
          <p className="text-slate-200 mb-4 font-medium text-lg">{ex?.prompt}</p>
          {ex?.options ? (
            <div className="space-y-3">
              {ex.options.map((opt, i) => (
                <button key={i} onClick={() => checkStoryAnswer(opt)} className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white">{opt}</button>
              ))}
            </div>
          ) : (
            <div>
              <input type="text" value={storyUserAnswer} onChange={e => setStoryUserAnswer(e.target.value)} className="w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400" onKeyDown={e => e.key === "Enter" && checkStoryAnswer()} placeholder="Escribe tu respuesta..." />
              <button onClick={() => checkStoryAnswer()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">Comprobar</button>
            </div>
          )}
        </div>
        {storyFeedback && (
          <div className={`p-4 rounded-xl ${storyFeedback.correct ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700" : "bg-red-900/80 text-red-200 border border-red-700"}`}>
            {storyFeedback.correct ? (
              <div><span>{storyFeedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"}</span>{storyFeedback.hint && <p className="text-sm mt-1 opacity-80">{storyFeedback.hint}</p>}</div>
            ) : (
              <div><span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{storyFeedback.answer}</strong></span></div>
            )}
          </div>
        )}
        {storyFeedback && (
          <button onClick={nextStoryExercise} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
            {storySceneIdx === totalScenes-1 && storyExerciseIdx === (scene?.exercises.length-1) ? "Finalizar historia" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  );
} else if (podcastActive) {
  const seg = window.PodcastA1_1?.segments[podcastSegment];
  const ex = seg?.exercises[podcastExerciseIdx];
  const totalSegments = window.PodcastA1_1?.segments.length || 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🎙️ Podcast – Segmento {podcastSegment + 1}/{totalSegments}</h2>
          <button onClick={stopPodcast} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">← Volver</button>
        </div>
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700">
          <p className="text-slate-300 mb-3 italic">"{seg?.audioText}"</p>
          <p className="text-slate-400 text-sm mb-6">{seg?.translation}</p>
          <hr className="border-slate-600 mb-6" />
          <p className="text-slate-200 mb-4 font-medium text-lg">{ex?.prompt}</p>
          {ex?.options ? (
            <div className="space-y-3">
              {ex.options.map((opt, i) => (
                <button key={i} onClick={() => checkPodcastAnswer(opt)} className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white">{opt}</button>
              ))}
            </div>
          ) : (
            <div>
              <input type="text" value={podcastUserAnswer} onChange={e => setPodcastUserAnswer(e.target.value)} className="w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400" onKeyDown={e => e.key === "Enter" && checkPodcastAnswer()} placeholder="Escribe tu respuesta..." />
              <button onClick={() => checkPodcastAnswer()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">Comprobar</button>
            </div>
          )}
        </div>
        {podcastFeedback && (
          <div className={`p-4 rounded-xl ${podcastFeedback.correct ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700" : "bg-red-900/80 text-red-200 border border-red-700"}`}>
            {podcastFeedback.correct ? (
              <div><span>{podcastFeedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"}</span>{podcastFeedback.hint && <p className="text-sm mt-1 opacity-80">{podcastFeedback.hint}</p>}</div>
            ) : (
              <div><span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{podcastFeedback.answer}</strong></span></div>
            )}
          </div>
        )}
        {podcastFeedback && (
          <button onClick={nextPodcastExercise} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
            {podcastSegment === totalSegments - 1 && podcastExerciseIdx === (seg?.exercises.length - 1) ? "Finalizar podcast" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  );
} else if (view === "lesson" && exercises[currentEx]) {
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
            <div className="flex items-center mb-6"><p className="text-slate-200 font-medium text-lg">{ex.prompt}</p>
          <button
            onClick={(e) => { e.stopPropagation(); speak(ex.answer?.split(' ')[0]?.startsWith('der') || ex.answer?.split(' ')[0]?.startsWith('die') || ex.answer?.split(' ')[0]?.startsWith('das') ? ex.answer : ex.prompt); }}
            className="ml-2 text-slate-400 hover:text-white transition"
            title="Escuchar"
          >
            🔊
          </button></div>
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
                <span className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded-full">{lessonsCompleted}/{level.lessons}</span>              {level.id === "A1.1" && (<button onClick={startStory} className="ml-2 px-3 py-1 bg-pink-600 text-white text-xs rounded-full hover:bg-pink-500 transition shadow">🎬 Historia</button>)} {level.id === "A1.1" && (
                <button onClick={startPodcast} className="ml-2 px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-500 transition shadow">🎙️ Podcast</button>
              )}
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