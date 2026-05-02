// ═══════════════════════════════════════════════════
// RUTA PANEL – Mapa + Ejercicios a pantalla completa
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['ruta'] = function RutaPanel({ session }) {
  const { useState, useEffect, useCallback } = React;
  const { Ruta } = window.Muller;
  const levels = window.MULLER_RUTA_LEVELS || [];
  const [progress, setProgress] = useState(Ruta.loadProgress());
  const [view, setView] = useState('levels'); // 'levels' | 'lesson'
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeLevelIdx, setActiveLevelIdx] = useState(null);
  const [fillInput, setFillInput] = useState('');
  const [fillFeedback, setFillFeedback] = useState(null);
  const [exerciseGenerated, setExerciseGenerated] = useState(null);

  useEffect(() => { Ruta.saveProgress(progress); }, [progress]);

  // Abrir ejercicios
  const openLesson = (lesson, levelIdx) => {
    setActiveLesson(lesson);
    setActiveLevelIdx(levelIdx);
    setFillInput('');
    setFillFeedback(null);
    setExerciseGenerated(null);
    setView('lesson');
  };

  const closeLesson = () => {
    setView('levels');
    setActiveLesson(null);
  };

  // Comprobar ejercicio
  const checkExercise = () => {
    if (!activeLesson) return;
    const answer = (activeLesson.exerciseA || '').toLowerCase().trim();
    const input = fillInput.toLowerCase().trim();
    const isCorrect = input === answer;
    setFillFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      completeLesson(activeLesson);
    }
  };

  const completeLesson = (lesson) => {
    const newCompleted = { ...progress.completed, [lesson.id]: true };
    const newProgress = {
      ...progress,
      completed: newCompleted,
      totalXp: (progress.totalXp || 0) + lesson.rewardXp,
      coins: (progress.coins || 0) + lesson.rewardCoins
    };
    setProgress(newProgress);
  };

  // Generar nuevo ejercicio aleatorio del nivel
  const generateNewExercise = () => {
    if (activeLevelIdx == null) return;
    const levelBadge = levels[activeLevelIdx]?.badge;
    const vocab = Ruta.VOCAB[levelBadge] || [];
    if (vocab.length === 0) return;
    const dueWords = Ruta.getDueWords(levelBadge);
    const pool = dueWords.length > 0 ? dueWords : vocab;
    const word = pool[Math.floor(Math.random() * pool.length)];
    setFillFeedback(null);
    setFillInput('');
    setExerciseGenerated({
      prompt: `Completa: ${word.ejemplo.replace(word.de, '___')}`,
      answer: word.de,
      hint: `Traducción: ${word.es} (${word.art || ''})`
    });
  };

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: '0 auto', color: '#e2e8f0' }}>
      {/* VISTA DE NIVELES */}
      {view === 'levels' && (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>🗺️ Ruta de Aprendizaje</h2>
          {levels.map((level, lvlIdx) => {
            const lessonsCompleted = level.lessons.filter(l => progress.completed[l.id]).length;
            const totalLessons = level.lessons.length;
            const progressPct = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;
            const isUnlocked = lvlIdx === 0 || levels[lvlIdx - 1].lessons.every(l => progress.completed[l.id]);
            return (
              <div key={level.id} style={{ background: '#1e293b', borderRadius: 16, border: '1px solid #334155', padding: 16, marginBottom: 12, opacity: isUnlocked ? 1 : 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ background: '#fbbf24', color: '#0f172a', padding: '4px 10px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem' }}>{level.badge}</span>
                    <span style={{ marginLeft: 12, fontWeight: 600 }}>{level.title}</span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{lessonsCompleted}/{totalLessons}</span>
                </div>
                <div style={{ height: 4, background: '#334155', borderRadius: 2, marginTop: 8 }}>
                  <div style={{ width: `${progressPct}%`, height: '100%', background: '#22c55e', borderRadius: 2, transition: 'width 0.5s' }}></div>
                </div>
                {isUnlocked && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {level.lessons.map((lesson, lesIdx) => {
                      const isCompleted = !!progress.completed[lesson.id];
                      const isUnlockedLesson = Ruta.isLessonUnlocked(levels, lvlIdx, lesIdx, progress.completed);
                      return (
                        <div key={lesson.id}
                          onClick={() => isUnlockedLesson && openLesson(lesson, lvlIdx)}
                          style={{
                            padding: 12, borderRadius: 12, background: isCompleted ? '#22c55e20' : '#0f172a',
                            border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`,
                            cursor: isUnlockedLesson ? 'pointer' : 'not-allowed',
                            opacity: isUnlockedLesson ? 1 : 0.5
                          }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{isCompleted ? '✅' : '🔓'} {lesson.title}</span>
                            <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>+{lesson.rewardXp} XP</span>
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
      )}

      {/* VISTA DE EJERCICIO (PANTALLA COMPLETA) */}
      {view === 'lesson' && activeLesson && (
        <div style={{ minHeight: '70vh' }}>
          <button onClick={closeLesson}
            style={{ background: 'transparent', border: 'none', color: '#fbbf24', fontSize: '1.2rem', cursor: 'pointer', marginBottom: 20 }}>
            ← Volver a la Ruta
          </button>

          <h2 style={{ color: '#fbbf24', marginBottom: 12 }}>{activeLesson.title}</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>💡 {activeLesson.grammarTip}</p>

          <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155', marginBottom: 20 }}>
            {/* Ejercicio principal (Fill) */}
            <p style={{ color: '#e2e8f0', marginBottom: 12 }}>
              {exerciseGenerated ? exerciseGenerated.prompt : activeLesson.exerciseQ}
            </p>
            {exerciseGenerated && <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 12 }}>{exerciseGenerated.hint}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={fillInput}
                onChange={e => { setFillInput(e.target.value); setFillFeedback(null); }}
                onKeyDown={e => { if (e.key === 'Enter' && fillInput.trim()) checkExercise(); }}
                placeholder={exerciseGenerated ? exerciseGenerated.hint : activeLesson.exerciseHint}
                style={{
                  flex: 1, padding: 14, borderRadius: 12, background: '#0f172a', color: '#e2e8f0',
                  border: `2px solid ${fillFeedback === 'correct' ? '#22c55e' : fillFeedback === 'incorrect' ? '#ef4444' : '#334155'}`,
                  fontSize: '1.1rem'
                }}
              />
              <button onClick={checkExercise} disabled={!fillInput.trim()}
                style={{ padding: '14px 24px', borderRadius: 12, background: fillInput.trim() ? '#22c55e' : '#475569', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                ✅
              </button>
            </div>
            {fillFeedback === 'correct' && <div style={{ marginTop: 12, color: '#4ade80', fontWeight: 600 }}>🌟 ¡Correcto! +{activeLesson.rewardXp} XP</div>}
            {fillFeedback === 'incorrect' && <div style={{ marginTop: 12, color: '#f87171' }}>Inténtalo de nuevo.</div>}
          </div>

          {/* Botón para generar nuevo ejercicio aleatorio */}
          <button onClick={generateNewExercise}
            style={{ padding: '12px 24px', borderRadius: 12, background: '#8b5cf6', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', marginBottom: 20 }}>
            🎲 Generar nuevo ejercicio
          </button>

          {/* Pronunciación */}
          <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
            <h3 style={{ color: '#e2e8f0', marginBottom: 12 }}>🗣️ Pronunciación</h3>
            {activeLesson.phrases.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ color: '#e2e8f0' }}>{p.de}</span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({p.es})</span>
                <button onClick={() => {
                  window.speechSynthesis.cancel();
                  const u = new SpeechSynthesisUtterance(p.de);
                  u.lang = 'de-DE'; u.rate = 0.8;
                  window.speechSynthesis.speak(u);
                }} style={{ background: '#334155', border: 'none', color: '#e2e8f0', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>🔊</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estadísticas rápidas */}
      <div style={{ marginTop: 20, display: 'flex', gap: 16, color: '#94a3b8', fontSize: '0.85rem' }}>
        <span>⭐ {progress.totalXp || 0} XP</span>
        <span>🪙 {progress.coins || 0} monedas</span>
        <span>📚 {Object.values(progress.completed || {}).filter(v => v).length} lecciones</span>
      </div>
    </div>
  );
};