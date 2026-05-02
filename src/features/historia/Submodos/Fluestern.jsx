// ═══════════════════════════════════════════════════
// FLÜSTERN – Submodo de Historia (Susurros Premium)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.fluestern = function FluesternSubmod({ guion, currentScene, sceneIndex }) {
  const [userInput, setUserInput] = React.useState('');
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0 });

  const cleanText = (t) => (t || '').replace(/[^\w\säöüßÄÖÜ]/g, '').replace(/\s+/g, ' ').trim();
  const target = cleanText(currentScene?.text);

  const playWhisper = () => {
    window.Muller.stopSpeech();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(target);
    u.lang = 'de-DE';
    u.rate = 0.6;
    u.volume = 0.3;
    u.pitch = 0.8;
    window.speechSynthesis.speak(u);
  };

  React.useEffect(() => { setUserInput(''); setFeedback(null); }, [sceneIndex]);

  const check = () => {
    const isCorrect = cleanText(userInput).toLowerCase() === target.toLowerCase();
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct+1, total: prev.total+1, streak: prev.streak+1 }));
      window.Muller.playCorrect?.();
    } else {
      setScore(prev => ({ ...prev, total: prev.total+1, streak: 0 }));
    }
    setFeedback({ correct: isCorrect, target });
  };

  return (
    <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ color: '#e2e8f0' }}>🤫 Flüstern <span style={{color:'#818cf8'}}>PREMIUM</span></h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
          <span style={{ color: '#f87171' }}>✗ {score.total - score.correct}</span>
          {score.streak > 1 && <span style={{ color: '#fbbf24' }}>🔥 {score.streak}</span>}
        </div>
      </div>
      <p style={{ color: '#94a3b8' }}>Escucha el susurro y escribe lo que oyes.</p>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <button onClick={playWhisper} style={{ padding: '12px 24px', borderRadius: 12, background: '#818cf8', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          🤫 Escuchar susurro
        </button>
      </div>
      <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Texto del susurro..."
        style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', fontSize: '1rem', marginBottom: 12 }}
        onKeyDown={e => { if (e.key === 'Enter' && userInput.trim()) check(); }}
      />
      <button onClick={check} disabled={!userInput.trim()} style={{ padding: '10px 20px', borderRadius: 8, background: userInput.trim() ? '#22c55e' : '#334155', color: 'white', border: 'none', cursor: 'pointer' }}>
        ✅ Verificar
      </button>
      {feedback && (
        <div style={{ marginTop: 12, color: feedback.correct ? '#4ade80' : '#f87171' }}>
          {feedback.correct ? '🌟 ¡Perfecto!' : `La frase era: "${feedback.target}"`}
        </div>
      )}
    </div>
  );
};