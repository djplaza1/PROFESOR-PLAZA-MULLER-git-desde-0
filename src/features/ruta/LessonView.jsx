const { useState, useEffect, useCallback, useRef } = React;

const LessonView = ({ levelId, lessonIdx, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchResult, setMatchResult] = useState([]);
  const [audioSelected, setAudioSelected] = useState(null);
  const [audioRevealed, setAudioRevealed] = useState([]);
  const [progress, setProgress] = useState(() => (window.SRSHelpers ? window.SRSHelpers.loadProgress() : { completed: {}, xp: 0, streak: 0 }));
  const [showComponent, setShowComponent] = useState(null);
  const [failedStack, setFailedStack] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [celebrate, setCelebrate] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const [pronAttempts, setPronAttempts] = useState(0);
  const [pronMaxAttempts, setPronMaxAttempts] = useState(3);
  const [wrongWords, setWrongWords] = useState([]);
  const [lastUserTranscript, setLastUserTranscript] = useState("");
  const audioCtxRef = useRef(null);

  const playTone = (freq, duration, type = 'sine') => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain); gain.connect(audioCtxRef.current.destination);
      osc.start(); osc.stop(audioCtxRef.current.currentTime + duration);
    } catch(e) {}
  };

  const showCelebration = (msg) => {
    setCelebrate(msg);
    setTimeout(() => setCelebrate(null), 2500);
  };

  const playCorrect = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak === 3) { playTone(660, 0.2, 'triangle'); showCelebration('🔥 Racha x3'); }
    else if (newStreak === 5) { playTone(880, 0.15); setTimeout(()=>playTone(1100,0.15), 200); showCelebration('⚡ Racha x5'); }
    else if (newStreak === 10) { playTone(660,0.1); setTimeout(()=>playTone(880,0.1), 150); setTimeout(()=>playTone(1100,0.2), 300); showCelebration('💎 Racha x10'); }
    else playTone(520, 0.1);
  };
  const playWrong = () => { setStreak(0); playTone(200, 0.3, 'square'); };

  useEffect(() => {
    if (!window.PhraseGenerator) return;
    const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);
    if (!lesson) return;
    
  // AUTO-GENERAR ejercicios si no vienen en la lección
  if (lesson && (!lesson.exercises || lesson.exercises.length === 0)) {
    const generated = window.PhraseGenerator.generateLesson(lesson.levelId, lessonIdx);
    if (generated && generated.exercises) {
      lesson.exercises = generated.exercises;
    }
  }
  setExercises(lesson.exercises || []);
;
    setCurrentEx(0);
    setUserAnswer("");
    setUserOrder([]);
    setFeedback(null);
    setMatchSelected(null);
    setMatchResult([]);
    setAudioSelected(null);
    setAudioRevealed([]);
    setFailedStack([]);
    setReviewMode(false);
    setStreak(0);
    setCelebrate(null);
    setIsRecording(false);
    setPronAttempts(0);
    setPronMaxAttempts(3);
    setWrongWords([]);
    setLastUserTranscript("");
  }, [levelId, lessonIdx, reviewMode]);

  useEffect(() => {
    if (window.SRSHelpers) window.SRSHelpers.saveProgress(progress);
  }, [progress]);

  const speak = useCallback((text) => { window.RutaAudio?.speak(text); }, []);

  /**
   * Calcula qué palabras de la frase correcta NO están en la respuesta del usuario.
   * Devuelve array de palabras incorrectas/faltantes.
   */
  const findWrongWords = (userText, correctAnswer) => {
    const userWords = (userText || "").toLowerCase().replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean);
    const correctWords = (correctAnswer || "").toLowerCase().replace(/[.!?]+$/g, "").trim().split(/\s+/).filter(Boolean);
    const missing = [];
    for (let i = 0; i < correctWords.length; i++) {
      if (!userWords.includes(correctWords[i])) {
        missing.push(correctWords[i]);
      }
    }
    // También detectar palabras extra que el usuario dijo
    const extra = userWords.filter(w => !correctWords.includes(w));
    return { missing, extra };
  };

  const checkAnswer = (submittedAnswer = null) => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const answerToCheck = submittedAnswer !== null ? submittedAnswer : userAnswer;
    const lang = (ex.type === 'translateES' || ex.type === 'choose') ? 'es' : 'de';
    const result = window.Corrector.check(answerToCheck, ex.answer, lang);
    
    // Para pronunciation: permitir múltiples intentos
    if (ex.type === 'pronounce' && !result.correct) {
      const newAttempt = pronAttempts + 1;
      setPronAttempts(newAttempt);
      setLastUserTranscript(answerToCheck);
      
      // Calcular palabras incorrectas
      const wrong = findWrongWords(answerToCheck, ex.answer);
      setWrongWords(wrong.missing.concat(wrong.extra));
      
      if (newAttempt < pronMaxAttempts) {
        // Aún quedan intentos - mostrar feedback pero NO marcar como fallo definitivo
        setFeedback({
          correct: false,
          exact: false,
          answer: ex.answer,
          hint: "❌ No es exacto. Intento " + newAttempt + "/" + pronMaxAttempts + ". Sigue intentando.",
          attempts: newAttempt,
          maxAttempts: pronMaxAttempts
        });
        playWrong();
        return; // No añadir a failedStack todavía
      }
      // Se acabaron los intentos - marca como incorrecto definitivo
      playWrong();
      setFailedStack(prev => [...prev, ex]);
      setFeedback({
        correct: false,
        exact: false,
        answer: ex.answer,
        hint: "❌ Pronunciación incorrecta tras " + pronMaxAttempts + " intentos.",
        attempts: newAttempt,
        maxAttempts: pronMaxAttempts,
        wrongWords: wrong.missing.concat(wrong.extra)
      });
      return;
    }
    
    setFeedback({ correct: result.correct, exact: result.exact, answer: ex.answer, hint: result.message });
    if (result.correct) {
      playCorrect();
      if (ex.word && window.SRSHelpers) {
        const newProgress = window.SRSHelpers.updateWordSRS(progress, ex.word[0], ex.type, true);
        newProgress.xp = (newProgress.xp || 0) + 10;
        setProgress(window.SRSHelpers.updateStreak(newProgress));
      }
    } else {
      playWrong();
      setFailedStack(prev => [...prev, ex]);
    }
  };

  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setUserOrder([]);
      setFeedback(null);
      setMatchSelected(null);
      setMatchResult([]);
      setAudioSelected(null);
      setAudioRevealed([]);
      setIsRecording(false);
      setPronAttempts(0);
      setPronMaxAttempts(3);
      setWrongWords([]);
      setLastUserTranscript("");
    } else {
      if (!reviewMode && failedStack.length > 0) {
        setExercises(failedStack);
        setFailedStack([]);
        setCurrentEx(0);
        setUserAnswer("");
        setUserOrder([]);
        setFeedback(null);
        setReviewMode(true);
        setPronAttempts(0);
        setPronMaxAttempts(3);
        setWrongWords([]);
        setLastUserTranscript("");
      } else {
        if (!showComponent) {
          showCelebration('🎙️ Ahora completa el Podcast');
          setShowComponent('podcast');
        } else if (showComponent === 'podcast') {
          showCelebration('🎬 Ahora completa la Historia');
          setShowComponent('story');
        } else {
          playTone(523,0.2); setTimeout(()=>playTone(659,0.2),200); setTimeout(()=>playTone(784,0.3),400);
          showCelebration('🎉 ¡Lección completada!');
          const lessonId = levelId + "-l" + (lessonIdx + 1);
          const newProgress = { ...progress };
          newProgress.completed[lessonId] = true;
          setProgress(newProgress);
          setTimeout(() => onBack(), 1500);
        }
      }
    }
  };

  const ex = exercises[currentEx];
  if (!ex) return <div className="text-white p-4">Cargando ejercicios...</div>;

  if (showComponent === 'podcast') return <PodcastView levelId={levelId} onBack={() => { showCelebration('🎬 Ahora completa la Historia'); setShowComponent('story'); }} />;
  if (showComponent === 'story') return <StoryView levelId={levelId} onBack={() => { playTone(523,0.2); setTimeout(()=>playTone(659,0.2),200); setTimeout(()=>playTone(784,0.3),400); showCelebration('🎉 ¡Lección completada!'); const lessonId = levelId + "-l" + (lessonIdx + 1); const newProgress = { ...progress }; newProgress.completed[lessonId] = true; setProgress(newProgress); setTimeout(() => onBack(), 1500); }} />;

  const inputDisabled = feedback && !feedback.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      {celebrate && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full shadow-2xl text-lg font-bold z-50">
          {celebrate}
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {reviewMode ? "Repaso de fallos" : `Lección ${lessonIdx+1}`} – {ex.type}
            {ex.isReview && <span className="ml-2 text-amber-400 text-sm" title="Ejercicio de repaso SRS">🔁</span>}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setShowComponent('podcast')} className={`px-3 py-1 text-white text-xs rounded-full hover:bg-purple-500 transition shadow ${showComponent === 'podcast' || showComponent === 'story' ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600'}`} disabled={showComponent === 'podcast' || showComponent === 'story'}>🎙️ Podcast</button>
            <button onClick={() => { if (showComponent !== 'podcast') return; setShowComponent('story'); }} className={`px-3 py-1 text-white text-xs rounded-full transition shadow ${showComponent === 'podcast' ? 'bg-pink-600 hover:bg-pink-500' : 'bg-gray-500 cursor-not-allowed'}`} disabled={showComponent !== 'podcast'}>🎬 Historia</button>
            <button onClick={onBack} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition shadow">← Volver</button>
          </div>
        </div>
        <div className={`bg-slate-800 p-8 rounded-2xl shadow-2xl mb-4 border ${ex.isReview ? 'border-amber-500/50' : 'border-slate-700'}`}>
          <div className="flex items-center mb-6">
            <p className="text-slate-200 font-medium text-lg">{ex.prompt}</p>
            {ex.speakText && <button onClick={() => speak(ex.speakText)} className="ml-2 text-slate-400 hover:text-white transition" title="Escuchar">🔊</button>}
            {ex.isReview && <span className="ml-2 text-amber-400 text-xs" title="Palabra para repasar">🔁 repaso</span>}
          </div>

          {ex.type === "audioMatch" ? (
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div><h3 className="text-white font-bold mb-3 text-center">🔊 Alemán (escucha)</h3>
                {ex.leftColumn.map((word,idx) => <button key={idx} onClick={()=>{if(audioRevealed.some(r=>r.de===word))return;window.RutaAudio?.speak(word);setAudioSelected(word)}} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition flex items-center ${audioRevealed.some(r=>r.de===word)?"bg-emerald-600 text-white":audioSelected===word?"bg-blue-600 text-white":"bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{audioRevealed.some(r=>r.de===word)?<span>{word}</span>:<span className="flex items-center">🔊 <span className="ml-2 italic text-sm">Escuchar</span></span>}</button>)}
              </div>
              <div><h3 className="text-white font-bold mb-3 text-center">🇪🇸 Español</h3>
                {ex.rightColumn.map((word,idx) => <button key={idx} onClick={()=>{if(audioSelected&&!audioRevealed.some(r=>r.es===word)){const cp=ex.pairs.find(p=>p.de===audioSelected&&p.es===word);if(cp){setAudioRevealed([...audioRevealed,{de:audioSelected,es:word}]);setAudioSelected(null);if(audioRevealed.length+1===ex.pairs.length)checkAnswer(null)}else{setAudioSelected(null)}}}} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition ${audioRevealed.some(r=>r.es===word)?"bg-emerald-600 text-white":"bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{word}</button>)}
              </div>
            </div>
          ) : ex.type === "matchPairs" ? (
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div><h3 className="text-white font-bold mb-3 text-center">Alemán</h3>
                {ex.leftColumn.map((word,idx) => <button key={idx} onClick={()=>{if(matchResult.some(r=>r.left===word))return;window.RutaAudio?.speak(word);if(!matchSelected)setMatchSelected({idx,word});else{const cp=ex.pairs.find(p=>p.de===matchSelected.word&&p.es===word);if(cp){setMatchResult([...matchResult,{left:matchSelected.word,right:word}]);setMatchSelected(null);if(matchResult.length+1===ex.pairs.length)checkAnswer(null)}else{setMatchSelected(null)}}}} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition ${matchResult.some(r=>r.left===word)?"bg-emerald-600 text-white":matchSelected?.word===word?"bg-blue-600 text-white":"bg-slate-700 text-slate-200 hover:bg-slate-600"}`}><span className="flex items-center"><button onClick={(e)=>{e.stopPropagation();window.RutaAudio?.speak(word)}} className="mr-1 text-slate-400 hover:text-white" title="Escuchar">🔊</button>{word}</span></button>)}
              </div>
              <div><h3 className="text-white font-bold mb-3 text-center">Español</h3>
                {ex.rightColumn.map((word,idx) => <button key={idx} onClick={()=>{if(matchSelected&&!matchResult.some(r=>r.right===word)){const cp=ex.pairs.find(p=>p.de===matchSelected.word&&p.es===word);if(cp){setMatchResult([...matchResult,{left:matchSelected.word,right:word}]);setMatchSelected(null);if(matchResult.length+1===ex.pairs.length)checkAnswer(null)}else{setMatchSelected(null)}}}} className={`block w-full mb-2 p-3 rounded-lg text-left font-medium transition ${matchResult.some(r=>r.right===word)?"bg-emerald-600 text-white":"bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{word}</button>)}
              </div>
            </div>
          ) : ex.type === "order" ? (
            <div className="space-y-4 mt-4">
              <p className="text-slate-300 text-sm mb-2">Selecciona las palabras en orden para formar la frase:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {(ex.scrambledWords || []).map((word, idx) => {
                  const isUsed = userOrder.includes(word) && userOrder.indexOf(word) !== -1;
                  const orderIdx = userOrder.indexOf(word);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isUsed) {
                          const newOrder = userOrder.filter((_, i) => i !== orderIdx);
                          setUserOrder(newOrder);
                        } else {
                          setUserOrder([...userOrder, word]);
                        }
                      }}
                      className={`px-4 py-3 rounded-xl border-2 font-medium text-base transition shadow-md ${
                        isUsed
                          ? "bg-emerald-600 border-emerald-400 text-white opacity-60 cursor-pointer"
                          : "bg-slate-700 border-slate-500 text-white hover:bg-blue-600 hover:border-blue-400 cursor-pointer"
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600 min-h-[3rem]">
                <p className="text-white font-medium text-lg">
                  {userOrder.length > 0 ? userOrder.join(" ") : <span className="text-slate-400 italic">Toca palabras para construir la frase...</span>}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setUserOrder([])}
                  className="px-4 py-2 bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-500 transition shadow text-sm"
                >
                  ↺ Reiniciar
                </button>
                <button
                  onClick={() => checkAnswer(userOrder.join(" "))}
                  disabled={userOrder.length === 0}
                  className={`px-8 py-3 rounded-xl transition shadow-md font-semibold ${
                    userOrder.length > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Comprobar
                </button>
              </div>
            </div>
          ) : ex.type === "pronounce" ? (
            <div className="flex flex-col items-center gap-4">
              {pronAttempts < pronMaxAttempts && (!feedback || !feedback.correct || feedback.attempts >= feedback.maxAttempts) ? (
                <>
                  <button
                    onClick={() => {
                      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                      if (!SpeechRecognition) {
                        alert("Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.");
                        return;
                      }
                      const recognition = new SpeechRecognition();
                      recognition.lang = "de-DE";
                      recognition.interimResults = false;
                      recognition.continuous = false;
                      recognition.onstart = () => setIsRecording(true);
                      recognition.onresult = (event) => {
                        const transcript = event.results[0][0].transcript.trim();
                        setIsRecording(false);
                        if (transcript) {
                          checkAnswer(transcript);
                        } else {
                          setFeedback({
                            correct: false,
                            answer: ex.phraseToPronounce,
                            hint: "No se detectó ninguna voz. Intenta de nuevo."
                          });
                        }
                      };
                      recognition.onerror = (event) => {
                        setIsRecording(false);
                        let msg = "Error al grabar. ";
                        if (event.error === "not-allowed") msg += "Permite el micrófono en el navegador.";
                        else msg += "Intenta de nuevo.";
                        setFeedback({ correct: false, answer: ex.phraseToPronounce, hint: msg });
                      };
                      recognition.start();
                    }}
                    disabled={isRecording}
                    className={`px-8 py-3 rounded-xl transition shadow-md font-semibold flex items-center gap-2 ${
                      isRecording
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isRecording ? "🎤 Escuchando..." : "🎤 Grabar respuesta"}
                  </button>
                  <p className="text-slate-400 text-sm">
                    Pulsa el botón y repite la frase en alemán. Intento {pronAttempts + 1}/{pronMaxAttempts}.
                  </p>
                </>
              ) : null}
            </div>
          ) : ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt,i) => <button key={i} onClick={()=>checkAnswer(opt)} className="block w-full text-left p-4 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-medium text-white">{opt}</button>)}
            </div>
          ) : (
            <div>
              <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} disabled={inputDisabled} className={`w-full p-4 bg-slate-700 border-2 ${inputDisabled ? 'border-slate-500 opacity-50' : 'border-slate-500'} rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none text-white text-lg placeholder-slate-400`} placeholder="Escribe tu respuesta..." />
              {!inputDisabled && <button onClick={()=>checkAnswer()} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">Comprobar</button>}
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
                {streak >= 3 && <p className="text-yellow-300 mt-1">🔥 Racha: {streak}</p>}
              </div>
            ) : (
              <div>
                {ex.type === "pronounce" ? (
                  <>
                    <span>❌ Pronunciación incorrecta</span>
                    {feedback.attempts && feedback.maxAttempts && (
                      <p className="text-sm mt-1 opacity-80">
                        Intento {feedback.attempts}/{feedback.maxAttempts}
                      </p>
                    )}
                    {lastUserTranscript && (
                      <div className="mt-2 p-3 bg-slate-800/50 rounded-lg border border-red-800">
                        <p className="text-sm text-red-300">🔊 Dijiste:</p>
                        <p className="text-white font-medium mt-1 text-lg">{lastUserTranscript}</p>
                      </div>
                    )}
                    <p className="text-sm mt-2">La frase correcta es: <strong className="text-white text-lg block mt-1">{feedback.answer}</strong></p>
                    {feedback.wrongWords && feedback.wrongWords.length > 0 && (
                      <div className="mt-3 p-3 bg-amber-900/40 rounded-lg border border-amber-700">
                        <p className="text-sm text-amber-300">📌 Palabras con dificultad:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {feedback.wrongWords.map((w, i) => (
                            <span key={i} className="px-3 py-1 bg-amber-800/80 text-amber-200 rounded-full text-sm font-medium border border-amber-600">
                              {w}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-amber-400 mt-2">Practica estas palabras específicamente.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <span>❌ Incorrecto. La respuesta correcta es: <strong className="text-white">{feedback.answer}</strong></span>
                    {ex.translation && <p className="text-sm mt-1 text-slate-300">Traducción: {ex.translation}</p>}
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {feedback && (
          <button onClick={nextExercise} className="mt-4 w-full px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition shadow-md font-medium">
            {currentEx < exercises.length - 1 ? "Siguiente →" : (failedStack.length > 0 && !reviewMode ? "Repasar fallos →" : "Finalizar")}
          </button>
        )}
      </div>
    </div>
  );
};
window.LessonView = LessonView;