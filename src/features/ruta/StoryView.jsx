const { useState, useEffect, useRef } = React;
const StoryView = ({ levelId, onBack }) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const speak = (text) => window.RutaAudio?.speak(text);
  const engineKey = "Story" + (levelId || "A1_1").replace(/\./g, "_"); const data = window[engineKey] || window.StoryA1_1;
  if (!data) return React.createElement("div", { className: "text-white p-4" }, "Historia no disponible");
  const scene = data.scenes[sceneIdx];
  const ex = scene?.exercises[exerciseIdx];
  const totalScenes = data.scenes.length;
  const queueRef = useRef([]);
  useEffect(() => {
    if (scene?.dialogs?.length) {
      window.speechSynthesis.cancel();
      queueRef.current = [...scene.dialogs.map(d => d.text)];
      const playNext = () => {
        if (queueRef.current.length === 0) return;
        const text = queueRef.current.shift();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "de-DE";
        utterance.rate = 0.9;
        utterance.onend = playNext;
        window.speechSynthesis.speak(utterance);
      };
      playNext();
    }
    return () => window.speechSynthesis.cancel();
  }, [sceneIdx]);
  const check = (submitted = null) => {
    if (!ex) return;
    const ans = submitted !== null ? submitted : userAnswer;
    const lang = (ex.type === "translateES" || ex.type === "choose") ? "es" : "de";
    const result = window.Corrector.check(ans, ex.answer, lang);
    setFeedback({ translation: ex.translation, correct: result.correct, exact: result.exact, answer: ex.answer, hint: result.message });
  };
  const next = () => {
    if (exerciseIdx < scene.exercises.length - 1) { setExerciseIdx(exerciseIdx+1); setUserAnswer(""); setFeedback(null); }
    else if (sceneIdx < totalScenes-1) { setSceneIdx(sceneIdx+1); setExerciseIdx(0); setUserAnswer(""); setFeedback(null); }
    else { alert("🎬 ¡Historia completada!"); onBack(); }
  };
  if (!ex) return React.createElement("div", { className: "text-white p-4" }, "Cargando historia...");
  return React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4" },
    React.createElement("div", { className: "max-w-2xl mx-auto" },
      React.createElement("div", { className: "flex justify-between items-center mb-4" },
        React.createElement("h2", { className: "text-xl font-bold text-white" }, `🎬 ${data.title} – Escena ${sceneIdx+1}/${totalScenes}`),
        React.createElement("button", { onClick: onBack, className: "px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow" }, "← Volver")
      ),
      React.createElement("div", { className: "bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border border-slate-700" },
        React.createElement("h3", { className: "text-white font-semibold mb-3" }, scene.title),
        scene.dialogs.map((d,i) => React.createElement("div", { key:i, className:"mb-2 flex items-start" },
          React.createElement("p", { className:"text-blue-300 font-medium flex-1" }, d.speaker+": ", React.createElement("span", { className:"text-slate-200 italic" }, `"${d.text}"`)),
          React.createElement("button", { onClick:()=>speak(d.text), className:"ml-2 text-slate-400 hover:text-white transition", title:"Volver a escuchar" }, "🔊")
        )),
        React.createElement("hr", { className:"border-slate-600 my-4" }),
        React.createElement("p", { className:"text-slate-200 mb-4 font-medium text-lg" }, ex.prompt),
        ex.options ? React.createElement("div", { className:"space-y-3" },
          ex.options.map((opt,i) => React.createElement("button", { key:i, onClick:()=>check(opt), className:"block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white" }, opt))
        ) : React.createElement("div", null,
          React.createElement("input", { type:"text", value:userAnswer, onChange:e=>setUserAnswer(e.target.value), className:"w-full p-4 bg-slate-700 border-2 border-slate-500 rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400", placeholder:"Escribe tu respuesta..." }),
          React.createElement("button", { onClick:()=>check(), className:"px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold" }, "Comprobar")
        )
      ),
      feedback && React.createElement("div", { className:`p-4 rounded-xl ${feedback.correct?"bg-emerald-900/80 text-emerald-200 border border-emerald-700":"bg-red-900/80 text-red-200 border border-red-700"}` },
        feedback.correct ? React.createElement("div", null,
          React.createElement("span", null, feedback.exact ? "✅ ¡Correcto!" : "✅ Aceptado"),
          feedback.hint && React.createElement("p", { className:"text-sm mt-1 opacity-80" }, feedback.hint),
          feedback.translation && React.createElement("p", { className:"text-sm mt-1 text-slate-300" }, `Traducción: ${feedback.translation}`)
        ) : React.createElement("div", null,
          React.createElement("span", null, "❌ Incorrecto. La respuesta correcta es: "), React.createElement("strong", { className:"text-white" }, feedback.answer)
        )
      ),
      feedback && React.createElement("button", { onClick:next, className:"mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium" }, "Siguiente →")
    )
  );
};
window.StoryView = StoryView;