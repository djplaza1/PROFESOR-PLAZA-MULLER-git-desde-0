// ═══════════════════════════════════════════════════
// ARTÍCULOS – Submodo de Historia (Der/Die/Das Premium)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.articulos = function ArticulosSubmod({ guion, currentScene, sceneIndex }) {
  const extractNouns = (text) => {
    const words = (text || '').split(/\s+/);
    const nouns = words.filter(w => /^[A-ZÄÖÜ][a-zäöüß]+$/.test(w));
    return [...new Set(nouns)];
  };

  const articlesDB = {
    'Mann': 'der', 'Frau': 'die', 'Kind': 'das', 'Hund': 'der', 'Katze': 'die',
    'Haus': 'das', 'Tisch': 'der', 'Lampe': 'die', 'Buch': 'das', 'Mädchen': 'das',
    'Tag': 'der', 'Nacht': 'die', 'Jahr': 'das', 'Monat': 'der', 'Woche': 'die',
    'Berlin': 'das', 'Tor': 'das', 'Straße': 'die', 'Platz': 'der', 'Stadt': 'die'
  };

  const nouns = extractNouns(currentScene?.text);
  const [quizNouns] = React.useState(nouns.filter(n => articlesDB[n]).slice(0, 4));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0, bestStreak: 0 });

  React.useEffect(() => { setCurrentIndex(0); setSelected(null); setFeedback(null); }, [sceneIndex]);

  const handleSelect = (article) => {
    setSelected(article);
    const correct = articlesDB[quizNouns[currentIndex]];
    const isCorrect = article === correct;
    if (isCorrect) {
      const ns = score.streak + 1;
      setScore(prev => ({ correct: prev.correct+1, total: prev.total+1, streak: ns, bestStreak: Math.max(ns, prev.bestStreak) }));
      window.Muller.playCorrect?.();
    } else {
      setScore(prev => ({ ...prev, total: prev.total+1, streak: 0 }));
      window.Muller.playIncorrect?.();
    }
    setFeedback({ article, correct, isCorrect });
  };

  const nextWord = () => {
    if (currentIndex < quizNouns.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setFeedback(null);
    }
  };

  if (quizNouns.length === 0) return <div style={{color:'#94a3b8'}}>No hay sustantivos en esta escena.</div>;

  const currentNoun = quizNouns[currentIndex];

  return (
    <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ color: '#e2e8f0' }}>📘 Artículos <span style={{color:'#c084fc'}}>PREMIUM</span></h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
          <span style={{ color: '#f87171' }}>✗ {score.total - score.correct}</span>
          {score.streak > 1 && <span style={{ color: '#fbbf24' }}>🔥 {score.streak}</span>}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: '2rem', color: '#e2e8f0', marginBottom: 16 }}>{currentNoun}</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {['der', 'die', 'das'].map(art => {
            const isSelected = selected === art;
            const isCorrectAnswer = feedback && feedback.correct === art;
            const bg = feedback ? (isCorrectAnswer ? '#22c55e' : (isSelected && !feedback.isCorrect ? '#ef4444' : '#334155')) : (isSelected ? '#06b6d4' : '#1e293b');
            return (
              <button key={art} onClick={() => !feedback && handleSelect(art)}
                style={{
                  padding: '12px 24px', borderRadius: 12, border: '2px solid ' + (feedback && isCorrectAnswer ? '#22c55e' : '#334155'),
                  background: bg, color: 'white', fontSize: '1.2rem', fontWeight: 600, cursor: feedback ? 'default' : 'pointer'
                }}>
                {art}
              </button>
            );
          })}
        </div>
      </div>
      {feedback && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ color: feedback.isCorrect ? '#4ade80' : '#f87171', fontSize: '1.1rem' }}>
            {feedback.isCorrect ? '🌟 ¡Correcto!' : `La respuesta correcta es "${feedback.correct}"`}
          </div>
          {currentIndex < quizNouns.length - 1 ? (
            <button onClick={nextWord} style={{ marginTop: 8, padding: '8px 20px', borderRadius: 8, background: '#06b6d4', color: 'white', border: 'none', cursor: 'pointer' }}>Siguiente</button>
          ) : (
            <div style={{ color: '#a78bfa', marginTop: 8 }}>¡Ronda completada!</div>
          )}
        </div>
      )}
      <div style={{ width: '100%', height: 4, background: '#334155', borderRadius: 2 }}>
        <div style={{ width: `${((currentIndex + (feedback ? 1 : 0)) / quizNouns.length) * 100}%`, height: '100%', background: '#c084fc', borderRadius: 2 }}></div>
      </div>
    </div>
  );
};