const { useState } = React;

const PodcastView = ({ levelId, lessonIdx, onBack }) => {
  const [segment, setSegment] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const speak = (text) => window.RutaAudio?.speak(text);

  const data = window.PodcastA1_1;
  if (!data) return <div className="text-white p-4">Podcast no disponible</div>;

  const seg = data.segments[segment];
  const ex = seg?.exercises[exerciseIdx];
  const totalSegments = data.segments.length;

  // Reproducir audio del segmento al cambiar
  useState(() => {
    if (seg?.audioText) speak(seg.audioText);
  }, [segment]);

  const check = (submitted = null) => {
    if (!ex) return;
    const ans = submitted !== null ? submitted : userAnswer;
    const lang = (ex.type === "translateES" || ex.type === "choose") ? "es" : "de";
    const result = window.Corrector.check(ans, ex.answer, lang);
    setFeedback({ translation: seg.translation, 
      correct: result.correct,
      exact: result.exact,
      answer: ex.answer,
      hint: result.message
    });
    if (result.correct) {
      
    }
  };

  const next = () => {
    if (exerciseIdx < seg.exercises.length - 1) {
      setExerciseIdx(exerciseIdx + 1);
      setUserAnswer("");
      setFeedback(null);
    } else if (segment < totalSegments - 1) {
      setSegment(segment + 1);
      setExerciseIdx(0);
      setUserAnswer("");
      setFeedback(null);
    } else {
      alert("🎉 ¡Podcast completado!");
      onBack();
    }
  };

  if (!ex) return <div className="text-white p-4">Cargando podcast...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🎙️ Podcast – Segmento {segment+1}/{totalSegments}</h2>
          <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">← Volver</button>
        </div>
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700">
          <p className="text-slate-300 mb-3 italic">"{seg.audioText}"</p>
          
          <hr className="border-slate-600 mb-6" />
          <p className="text-slate-200 mb-4 font-medium text-lg">{ex.prompt}</p>
          {ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt, i) => (
                <button key={i} onClick={() => check(opt)} className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white">{opt}</button>
              ))}
            </div>
          ) : (
            <div>
              <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} className="w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400" onKeyDown={e => e.key === "Enter" && check()} placeholder="Escribe tu respuesta..." />
              <button onClick={() => check()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">Comprobar</button>
            </div>
          )}
        </div>
        {feedback && (
          <div className={`p-4 rounded-xl ${feedback.correct ? "bg-emerald-900/80 text-emerald-200 border border-emerald-700" : "bg-red-900/80 text-red-200 border border-red-700"}`}>
            {feedback.correct ? (
              <div><span>{feedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"}</span>{feedback.hint && <p className="text-sm mt-1 opacity-80">{feedback.hint}</p>} {feedback.translation && <p className="text-sm mt-1 text-slate-300">Traducción: {feedback.translation}</p>}</div>
            ) : (
              <div><span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{feedback.answer}</strong></span></div>
            )}
          </div>
        )}
        {feedback && (
          <button onClick={next} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
};

window.PodcastView = PodcastView;