// ════════════════════════════════════════════════════════════════════
// RUTA PANEL – UI completa con 18 niveles, SRS, 8 tipos de ejercicio
// ════════════════════════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['ruta'] = function RutaPanel({ session }) {
  const { useState, useEffect, useCallback, useRef } = React;
  const { Ruta } = window.Muller;
  const levels = window.MULLER_RUTA_LEVELS || [];
  const [progress, setProgress] = useState((window.Muller.Storage?.loadProgress?.() || window.Muller.Progreso?.getAdvancedProgress?.() || {}));
  const [view, setView] = useState('levels');
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeLevelIdx, setActiveLevelIdx] = useState(null);
  const [fillInput, setFillInput] = useState('');
  const [fillFeedback, setFillFeedback] = useState(null);
  const [exerciseGenerated, setExerciseGenerated] = useState(null);
  const [currentEx, setCurrentEx] = useState(0);
  const [practiceExs, setPracticeExs] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [orderedWords, setOrderedWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => { Ruta.saveProgress(progress); }, [progress]);
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [currentEx, exerciseGenerated]);

  const openLesson = (lesson, levelIdx) => {
    setActiveLesson(lesson);
    setActiveLevelIdx(levelIdx);
    setFillInput('');
    setFillFeedback(null);
    setExerciseGenerated(null);
    setOrderedWords([]);
    setRemainingWords([]);
    setPracticeExs([]);
    setCurrentEx(0);
    setView('lesson');
  };

  const closeLesson = () => {
    setView('levels');
    setActiveLesson(null);
    setFillFeedback(null);
  };

  const checkAnswer = (input, correctAnswer) => {
    if (!input || !correctAnswer) return false;
    return input.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  };

  const completeLesson = (lesson) => {
    const newProgress = {
      ...progress,
      completed: { ...progress.completed, [lesson.id]: true },
      totalXp: (progress.totalXp || 0) + (lesson.rewardXp || 10),
      coins: (progress.coins || 0) + (lesson.rewardCoins || 5)
    };
    Ruta.updateStreak(newProgress);
    setProgress(newProgress);
    animateCorrect();
  };

  const animateCorrect = () => {
    setAnimKey(prev => prev + 1);
  };

  const checkExercise = () => {
    if (!activeLesson) return;
    const answer = exerciseGenerated ? exerciseGenerated.answer : (activeLesson.exerciseA || '');
    const isCorrect = checkAnswer(fillInput, answer);
    setFillFeedback(isCorrect ? 'correct' : 'incorrect');

    if (exerciseGenerated && exerciseGenerated.word) {
      const exType = exerciseGenerated.type || 'fill';
      Ruta.updateSRS(exerciseGenerated.word, exType, isCorrect, progress);
      const newP = (window.Muller.Storage?.loadProgress?.() || window.Muller.Progreso?.getAdvancedProgress?.() || {});
      setProgress(newP);
    }

    if (isCorrect) {
      setTimeout(() => {
        if (exerciseGenerated) {
          // Next practice exercise or back to lesson
          if (practiceExs.length > 0 && currentEx < practiceExs.length - 1) {
            setCurrentEx(prev => prev + 1);
            setFillInput('');
            setFillFeedback(null);
            const nextEx = practiceExs[currentEx + 1];
            setExerciseGenerated(nextEx);
          } else {
            generateNewExercise();
          }
        } else {
          completeLesson(activeLesson);
          setTimeout(() => closeLesson(), 800);
        }
      }, 600);
    }
  };

  const generateNewExercise = () => {
    if (activeLevelIdx == null) return;
    const levelBadge = levels[activeLevelIdx]?.badge || 'A1.1';
    const dueWords = Ruta.getDueWords(levelBadge, 8);
    if (dueWords.length === 0) return;

    const word = dueWords[0];
    const ex = Ruta.generateExercise(word, levelBadge);
    setFillFeedback(null);
    setFillInput('');
    setOrderedWords([]);
    setRemainingWords(ex?.type === 'order' ? [...(ex.words || [])] : []);
    setExerciseGenerated(ex);
  };

  const startPractice = () => {
    if (activeLevelIdx == null) return;
    const levelBadge = levels[activeLevelIdx]?.badge || 'A1.1';
    const dueWords = Ruta.getDueWords(levelBadge, 8);
    const exs = dueWords.map(w => Ruta.generateExercise(w, levelBadge));
    setPracticeExs(exs);
    setCurrentEx(0);
    setFillInput('');
    setFillFeedback(null);
    if (exs.length > 0) {
      setOrderedWords([]);
      setRemainingWords(exs[0]?.type === 'order' ? [...(exs[0].words || [])] : []);
      setExerciseGenerated(exs[0]);
    }
  };

  const checkSelectedAnswer = (selected) => {
    if (!exerciseGenerated) return;
    const isCorrect = checkAnswer(selected, exerciseGenerated.answer);
    setFillFeedback(isCorrect ? 'correct' : 'incorrect');

    if (exerciseGenerated.word) {
      Ruta.updateSRS(exerciseGenerated.word, exerciseGenerated.type, isCorrect, progress);
      setProgress((window.Muller.Storage?.loadProgress?.() || window.Muller.Progreso?.getAdvancedProgress?.() || {}));
    }

    if (isCorrect) {
      setTimeout(() => generateNewExercise(), 500);
    }
  };

  // ── Order exercise handlers ──
  const addOrderedWord = (word, idx) => {
    if (fillFeedback !== null) return;
    setOrderedWords(prev => [...prev, word]);
    setRemainingWords(prev => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };

  const removeOrderedWord = (word, idx) => {
    if (fillFeedback !== null) return;
    setOrderedWords(prev => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setRemainingWords(prev => [...prev, word]);
  };

  // Auto-validate order when all words placed
  useEffect(() => {
    if (!exerciseGenerated || exerciseGenerated.type !== 'order') return;
    if (remainingWords.length > 0) return;
    const userAnswer = orderedWords.join(' ').toLowerCase().trim();
    const correctAnswer = exerciseGenerated.answer.toLowerCase().trim();
    const isCorrect = userAnswer === correctAnswer;
    setFillFeedback(isCorrect ? 'correct' : 'incorrect');

    if (exerciseGenerated.word) {
      Ruta.updateSRS(exerciseGenerated.word, exerciseGenerated.type, isCorrect, progress);
      setProgress((window.Muller.Storage?.loadProgress?.() || window.Muller.Progreso?.getAdvancedProgress?.() || {}));
    }

    if (isCorrect) {
      setTimeout(() => {
        setOrderedWords([]);
        generateNewExercise();
      }, 800);
    }
  }, [remainingWords]);

  // ── Render ejercicio según tipo ──
  const renderExercise = () => {
    const ex = exerciseGenerated;
    if (!ex) {
      return <button onClick={startPractice}
        style={{ padding:'14px 28px', borderRadius:12, background:'#8b5cf6', color:'white', border:'none', fontWeight:700, fontSize:'1.1rem', cursor:'pointer' }}>
        🎯 Empezar práctica
      </button>;
    }

    const stim = (animKey % 2 === 0) ? {} : {};

    return (
      <div>
        <div style={{ marginBottom:8, display:'flex', gap:8, alignItems:'center' }}>
          {practiceExs.length > 0 && (
            <span style={{ background:'#334155', padding:'3px 8px', borderRadius:6, fontSize:'0.75rem', color:'#94a3b8' }}>
              {currentEx + 1}/{practiceExs.length}
            </span>
          )}
          <span style={{ background:'#1e293b', padding:'3px 8px', borderRadius:6, fontSize:'0.75rem', color:'#fbbf24' }}>
            {ex.type === 'fill' ? '✏️ Completar' :
             ex.type === 'choose' ? '🖱️ Elegir' :
             ex.type === 'plural' ? '📚 Plural' :
             ex.type === 'translateDE' ? '🇩🇪→🇪🇸' :
             ex.type === 'translateES' ? '🇪🇸→🇩🇪' :
             ex.type === 'conjugate' ? '📝 Conjugar' :
             ex.type === 'order' ? '🔤 Ordenar' : '✅ Corregir'}
          </span>
        </div>

        <div style={{ background:'#0f172a', borderRadius:16, padding:24, border:'1px solid #334155', marginBottom:20, ...stim }}>
          <p style={{ fontSize:'1.3rem', color:'#e2e8f0', marginBottom:16, lineHeight:1.6 }}>{ex.prompt}</p>

          {ex.hint && <p style={{ color:'#64748b', fontSize:'0.85rem', marginBottom:16 }}>💡 {ex.hint}</p>}

          {/* TYPE: choose */}
          {ex.type === 'choose' && ex.options && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {ex.options.map((opt, i) => (
                <button key={i} onClick={() => checkSelectedAnswer(opt)}
                  disabled={fillFeedback !== null}
                  style={{
                    padding:'12px 24px', borderRadius:12,
                    background: fillFeedback === null ? '#334155' :
                      checkAnswer(opt, ex.answer) ? '#22c55e' : '#ef4444',
                    color:'white', border:'none', fontSize:'1.1rem', cursor:'pointer',
                    opacity: fillFeedback !== null && !checkAnswer(opt, ex.answer) ? 0.5 : 1,
                    transition:'all 0.2s'
                  }}>{opt}</button>
              ))}
            </div>
          )}

          {/* TYPE: order - interactive click-to-order */}
          {ex.type === 'order' && ex.words && (
            <div>
              {/* Selected words area */}
              <div style={{
                minHeight:48, background:'#1e293b', borderRadius:12, padding:12,
                border:'2px dashed #475569', marginBottom:16, display:'flex', flexWrap:'wrap', gap:8, alignItems:'center'
              }}>
                {orderedWords.length === 0 && (
                  <span style={{ color:'#64748b', fontSize:'0.85rem' }}>Haz clic en las palabras en el orden correcto...</span>
                )}
                {orderedWords.map((w, i) => (
                  <span key={i} onClick={() => removeOrderedWord(w, i)}
                    style={{
                      background:'#3b82f6', borderRadius:8, padding:'8px 14px',
                      color:'white', cursor:'pointer', fontSize:'1rem',
                      border:'1px solid #60a5fa', transition:'all 0.2s',
                      userSelect:'none'
                    }}>
                    {w} ✕
                  </span>
                ))}
              </div>
              {/* Remaining words to click */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {remainingWords.map((w, i) => (
                  <span key={i} onClick={() => addOrderedWord(w, i)}
                    style={{
                      background:'#334155', borderRadius:8, padding:'8px 14px',
                      color:'#e2e8f0', cursor:'pointer', fontSize:'1rem',
                      border:'1px solid #475569', transition:'all 0.2s',
                      userSelect:'none'
                    }}>
                    {w}
                  </span>
                ))}
              </div>
              {fillFeedback === 'incorrect' && (
                <div style={{ marginTop:12, padding:'12px 16px', background:'#ef444420', borderRadius:12, border:'1px solid #ef4444' }}>
                  <span style={{ color:'#f87171', fontWeight:600 }}>❌ Inténtalo de nuevo.</span>
                  <div style={{ color:'#94a3b8', marginTop:4 }}>Respuesta correcta: <strong style={{color:'#e2e8f0'}}>{ex.answer}</strong></div>
                </div>
              )}
            </div>
          )}

          {/* TYPE: fill, translate, plural, conjugate, translateDE, translateES, correct */}
          {ex.type !== 'choose' && ex.type !== 'order' && (
            <div style={{ display:'flex', gap:8 }}>
              <input ref={inputRef}
                value={fillInput}
                onChange={e => { setFillInput(e.target.value); setFillFeedback(null); }}
                onKeyDown={e => { if (e.key === 'Enter' && fillInput.trim()) checkExercise(); }}
                placeholder="Escribe aquí..."
                style={{
                  flex:1, padding:14, borderRadius:12, background:'#0f172a', color:'#e2e8f0',
                  border:`2px solid ${fillFeedback === 'correct' ? '#22c55e' : fillFeedback === 'incorrect' ? '#ef4444' : '#334155'}`,
                  fontSize:'1.1rem', outline:'none'
                }}
              />
              <button onClick={checkExercise} disabled={!fillInput.trim()}
                style={{
                  padding:'14px 24px', borderRadius:12,
                  background: fillInput.trim() ? '#22c55e' : '#475569',
                  color:'white', border:'none', fontWeight:700, cursor:'pointer', fontSize:'1.1rem'
                }}>✓</button>
            </div>
          )}

          {fillFeedback === 'correct' && ex.type !== 'order' && (
            <div style={{ marginTop:12, padding:'12px 16px', background:'#22c55e20', borderRadius:12, border:'1px solid #22c55e' }}>
              <span style={{ color:'#4ade80', fontWeight:700, fontSize:'1.1rem' }}>🌟 ¡Correcto! +5 XP</span>
              {ex.answer && <div style={{ color:'#94a3b8', marginTop:4 }}>Respuesta: {ex.answer}</div>}
            </div>
          )}
          {fillFeedback === 'incorrect' && ex.type !== 'order' && (
            <div style={{ marginTop:12, padding:'12px 16px', background:'#ef444420', borderRadius:12, border:'1px solid #ef4444' }}>
              <span style={{ color:'#f87171', fontWeight:600 }}>❌ Inténtalo de nuevo.</span>
              {ex.answer && <div style={{ color:'#94a3b8', marginTop:4 }}>Respuesta correcta: <strong style={{color:'#e2e8f0'}}>{ex.answer}</strong></div>}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── VISTA PRINCIPAL: MAPA DE NIVELES ──
  const renderMap = () => {
    const total = Ruta.getOverallProgress(levels, progress);
    const rank = Ruta.getRank(progress.totalXp || 0);
    const streak = Ruta.getStreak();
    const weak = Ruta.getWeaknessAnalysis();

    return (
      <div>
        {/* CABECERA */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
          <div>
            <h2 style={{ fontSize:'1.5rem', fontWeight:700, margin:0, color:'#e2e8f0' }}>🗺️ Ruta de Aprendizaje</h2>
            <p style={{ color:'#94a3b8', fontSize:'0.85rem', margin:'4px 0 0 0' }}>
              {total.doneLessons}/{total.totalLessons} lecciones · {Ruta.totalWords()} palabras
            </p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ background:'#1e293b', borderRadius:12, padding:'6px 14px', border:'1px solid #334155', textAlign:'center' }}>
              <div style={{ fontSize:'0.7rem', color:'#94a3b8' }}>🔥 Racha</div>
              <div style={{ color:'#f97316', fontWeight:700, fontSize:'1.1rem' }}>{streak} días</div>
            </div>
            <div style={{ background:'#1e293b', borderRadius:12, padding:'6px 14px', border:'1px solid #334155', textAlign:'center' }}>
              <div style={{ fontSize:'0.7rem', color:'#94a3b8' }}>Rango</div>
              <div style={{ color:'#fbbf24', fontWeight:700, fontSize:'0.9rem' }}>{rank.emoji} {rank.name}</div>
            </div>
          </div>
        </div>

        {/* BARRA PROGRESO GLOBAL */}
        <div style={{ background:'#1e293b', borderRadius:16, padding:16, border:'1px solid #334155', marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ color:'#e2e8f0', fontWeight:600 }}>Progreso total</span>
            <span style={{ color:'#22c55e', fontWeight:700 }}>{total.pct}%</span>
          </div>
          <div style={{ height:8, background:'#334155', borderRadius:4 }}>
            <div style={{ width:`${total.pct}%`, height:'100%', background:'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius:4, transition:'width 0.8s' }}></div>
          </div>
          <div style={{ display:'flex', gap:20, marginTop:12, fontSize:'0.8rem', color:'#94a3b8' }}>
            <span>⭐ {progress.totalXp || 0} XP</span>
            <span>🪙 {progress.coins || 0} monedas</span>
            <span>📚 {Object.values(progress.completed || {}).filter(v=>v).length} lecciones</span>
          </div>
        </div>

        {/* DEBILIDADES */}
        {weak.length > 0 && (
          <div style={{ background:'#1e293b', borderRadius:12, padding:12, border:'1px solid #334155', marginBottom:16 }}>
            <div style={{ color:'#94a3b8', fontSize:'0.8rem', marginBottom:6 }}>📊 Tipos de ejercicio que más fallas:</div>
            <div style={{ display:'flex', gap:8 }}>
              {weak.slice(0,4).map(([type, count]) => (
                <span key={type} style={{ background:'#ef444420', color:'#f87171', padding:'2px 8px', borderRadius:6, fontSize:'0.75rem' }}>
                  {type} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* NIVELES */}
        {levels.map((level, lvlIdx) => {
          if (!level || !level.lessons) return null;
          const lp = Ruta.getLevelProgress(progress, level);
          const isUnlocked = lvlIdx === 0 || (levels[lvlIdx-1]?.lessons?.every(l => progress?.completed?.[l.id]) ?? false);
          return (
            <div key={level.id} style={{
              background:'#1e293b', borderRadius:16, border:`1px solid ${isUnlocked ? '#334155' : '#1e293b'}`,
              padding:16, marginBottom:12, opacity: isUnlocked ? 1 : 0.4,
              transition:'all 0.3s'
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <span style={{
                    background: lp.pct === 100 ? '#22c55e' : '#fbbf24',
                    color:'#0f172a', padding:'3px 10px', borderRadius:8, fontWeight:700, fontSize:'0.85rem'
                  }}>{level.badge} {lp.pct === 100 ? '✅' : ''}</span>
                  <span style={{ marginLeft:12, fontWeight:600, color:'#e2e8f0' }}>{level.title}</span>
                </div>
                <span style={{ color:'#94a3b8', fontSize:'0.85rem' }}>{lp.done}/{lp.total}</span>
              </div>
              <div style={{ height:4, background:'#334155', borderRadius:2, marginTop:8 }}>
                <div style={{ width:`${lp.pct}%`, height:'100%', background: lp.pct === 100 ? '#22c55e' : '#fbbf24', borderRadius:2, transition:'width 0.5s' }}></div>
              </div>
              {isUnlocked && (
                <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
                  {level.lessons.map((lesson, lesIdx) => {
                    const isCompleted = !!progress?.completed?.[lesson.id];
                    const isUnlockedLesson = Ruta.isLessonUnlocked(levels, lvlIdx, lesIdx, progress?.completed || {});
                    return (
                      <div key={lesson.id}
                        onClick={() => isUnlockedLesson && openLesson(lesson, lvlIdx)}
                        style={{
                          padding:12, borderRadius:12,
                          background: isCompleted ? '#22c55e15' : '#0f172a',
                          border:`1px solid ${isCompleted ? '#22c55e' : isUnlockedLesson ? '#334155' : '#1e293b'}`,
                          cursor: isUnlockedLesson ? 'pointer' : 'not-allowed',
                          opacity: isUnlockedLesson ? 1 : 0.5,
                          transition:'all 0.2s'
                        }}>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ color:'#e2e8f0' }}>{isCompleted ? '✅' : isUnlockedLesson ? '🔓' : '🔒'} {lesson.title}</span>
                          <span style={{ color:'#fbbf24', fontSize:'0.8rem' }}>+{lesson.rewardXp} XP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // ── VISTA DE EJERCICIO ──
  const renderLesson = () => {
    if (!activeLesson) return null;
    const rank = Ruta.getRank(progress.totalXp || 0);

    return (
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        {/* HEADER */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <button onClick={closeLesson}
            style={{ background:'transparent', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', gap:4 }}>
            ← Volver
          </button>
          <span style={{ color:'#fbbf24', fontSize:'0.85rem' }}>{rank.emoji} {rank.name} · {progress.totalXp||0} XP</span>
        </div>

        {/* TÍTULO + GRAMMAR TIP */}
        <div style={{ background:'#1e293b', borderRadius:16, padding:20, border:'1px solid #334155', marginBottom:16 }}>
          <h2 style={{ color:'#fbbf24', fontSize:'1.3rem', margin:'0 0 8px 0' }}>{activeLesson.title}</h2>
          <p style={{ color:'#94a3b8', fontSize:'0.9rem', margin:0 }}>💡 {activeLesson.grammarTip}</p>
        </div>

        {/* EJERCICIO */}
        {renderExercise()}

        {/* BOTONES EXTRA */}
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <button onClick={generateNewExercise}
            style={{ padding:'12px 20px', borderRadius:12, background:'#8b5cf6', color:'white', border:'none', fontWeight:600, cursor:'pointer', fontSize:'0.9rem' }}>
            🎲 Siguiente palabra
          </button>
          <button onClick={startPractice}
            style={{ padding:'12px 20px', borderRadius:12, background:'#3b82f6', color:'white', border:'none', fontWeight:600, cursor:'pointer', fontSize:'0.9rem' }}>
            🔄 Práctica completa
          </button>
        </div>

        {/* FRASES DE PRONUNCIACIÓN */}
        <div style={{ background:'#1e293b', borderRadius:16, padding:20, border:'1px solid #334155' }}>
          <h3 style={{ color:'#e2e8f0', margin:'0 0 12px 0', fontSize:'1rem' }}>🗣️ Frases de ejemplo</h3>
          {activeLesson.phrases.map((p, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8, flexWrap:'wrap' }}>
              <span style={{ color:'#e2e8f0' }}>{p.de}</span>
              <span style={{ color:'#64748b', fontSize:'0.85rem' }}>({p.es})</span>
              <button onClick={() => {
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(p.de);
                u.lang = 'de-DE'; u.rate = 0.8;
                window.speechSynthesis.speak(u);
              }} style={{ background:'#334155', border:'none', color:'#e2e8f0', borderRadius:6, padding:'4px 10px', cursor:'pointer', fontSize:'0.8rem' }}>🔊</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding:16, maxWidth:900, margin:'0 auto', color:'#e2e8f0' }}>
      {view === 'levels' && renderMap()}
      {view === 'lesson' && renderLesson()}
    </div>
  );
};