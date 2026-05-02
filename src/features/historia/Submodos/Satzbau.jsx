// ═══════════════════════════════════════════════════
// SATZBAU – Submodo de Historia (Construcción de Frases)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.satzbau = function SatzbauSubmod({ guion, currentScene, sceneIndex }) {
  const sentence = currentScene?.text || '';
  const words = sentence.split(/\s+/).filter(w => w.length > 1);
  const [shuffled, setShuffled] = React.useState([]);
  const [constructed, setConstructed] = React.useState([]);
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0 });

  React.useEffect(() => {
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
    setConstructed([]);
    setFeedback(null);
  }, [sceneIndex]);

  const pickWord = (index) => {
    const word = shuffled[index];
    setShuffled(prev => prev.filter((_, i) => i !== index));
    setConstructed(prev => [...prev, word]);
  };

  const undoLast = () => {
    if (constructed.length === 0) return;
    const last = constructed[constructed.length - 1];
    setConstructed(prev => prev.slice(0, -1));
    setShuffled(prev => [...prev, last]);
  };

  const checkSentence = () => {
    const userSentence = constructed.join(' ');
    const correct = words.join(' ');
    const isCorrect = userSentence === correct;
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct+1, total: prev.total+1, streak: prev.streak+1 }));
      window.Muller.playCorrect?.();
    } else {
      setScore(prev => ({ ...prev, total: prev.total+1, streak: 0 }));
      window.Muller.playIncorrect?.();
    }
    setFeedback({ correct: isCorrect, userSentence, correctSentence: correct });
  };

  const reset = () => {
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);
    setConstructed([]);
    setFeedback(null);
  };

  return (
    <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ color: '#e2e8f0' }}>🏗️ Satzbau <span style={{color:'#fb923c'}}>PREMIUM</span></h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
          <span style={{ color: '#f87171' }}>✗ {score.total - score.correct}</span>
          {score.streak > 1 && <span style={{ color: '#fbbf24' }}>🔥 {score.streak}</span>}
        </div>
      </div>
      <p style={{ color: '#94a3b8', marginBottom: 12 }}>Ordena las palabras para formar la frase original.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 50, background: '#0f172a', borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {constructed.map((w, i) => (
          <span key={i} style={{ background: '#fb923c', color: 'white', padding: '4px 12px', borderRadius: 8, fontWeight: 600 }}>{w}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {shuffled.map((w, i) => (
          <button key={i} onClick={() => pickWord(i)} style={{
            padding: '6px 14px', borderRadius: 8, background: '#334155', color: '#e2e8f0', border: 'none', cursor: 'pointer'
          }}>{w}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={undoLast} disabled={constructed.length === 0} style={{ padding: '8px 16px', borderRadius: 8, background: '#475569', color: 'white', border: 'none', cursor: 'pointer' }}>
          ↩️ Deshacer
        </button>
        <button onClick={checkSentence} disabled={constructed.length !== words.length || feedback} style={{ padding: '8px 16px', borderRadius: 8, background: constructed.length === words.length ? '#22c55e' : '#334155', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          ✅ Verificar
        </button>
        {feedback && (
          <button onClick={reset} style={{ padding: '8px 16px', borderRadius: 8, background: '#06b6d4', color: 'white', border: 'none', cursor: 'pointer' }}>
            🔄 Nuevo
          </button>
        )}
      </div>
      {feedback && (
        <div style={{ marginTop: 12, color: feedback.correct ? '#4ade80' : '#f87171' }}>
          {feedback.correct ? '🌟 ¡Frase correcta!' : `La frase original es: "${feedback.correctSentence}"`}
        </div>
      )}
    </div>
  );
};