// ═══════════════════════════════════════════════════
// OÍDO – Submodo de Historia
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.oido = function OidoSubmod({ guion, currentScene, sceneIndex }) {
  const [playing, setPlaying] = React.useState(false);
  const [showText, setShowText] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [feedback, setFeedback] = React.useState(null); // 'correct', 'incorrect', null
  const [score, setScore] = React.useState({ correct: 0, total: 0 });
  const [attempts, setAttempts] = React.useState(0);
  const utteranceRef = React.useRef(null);

  const cleanText = (currentScene?.text || '').replace(/[^\w\säöüßÄÖÜ]/g, '').replace(/\s+/g, ' ').trim();

  const playAudio = (count = 1) => {
    window.Muller.stopSpeech();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentScene.text);
    u.lang = 'de-DE';
    u.rate = 0.9;
    u.onend = () => {
      if (count > 1) {
        const u2 = new SpeechSynthesisUtterance(currentScene.text);
        u2.lang = 'de-DE';
        u2.rate = 0.85;
        window.speechSynthesis.speak(u2);
        u2.onend = () => setPlaying(false);
      } else {
        setPlaying(false);
      }
    };
    window.speechSynthesis.speak(u);
    setPlaying(true);
    setShowText(false);
  };

  const stop = () => {
    window.Muller.stopSpeech();
    setPlaying(false);
  };

  React.useEffect(() => { return () => stop(); }, [sceneIndex]);
  React.useEffect(() => { setFeedback(null); setUserInput(''); setShowText(false); setAttempts(0); }, [sceneIndex]);

  const checkAnswer = () => {
    const answer = userInput.trim().replace(/[^\w\säöüßÄÖÜ]/g, '').replace(/\s+/g, ' ').toLowerCase();
    const target = cleanText.toLowerCase();
    const isCorrect = answer === target;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      window.Muller.playCorrect();
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
      window.Muller.playIncorrect();
    }
  };

  return (
    <div style={{ background: '#1e293b', borderRadius: 12, padding: 16, border: '1px solid #334155' }}>
      <h3 style={{ color: '#06b6d4', marginBottom: 12 }}>👂 Oído (Comprensión auditiva)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 16 }}>
        Escucha la frase sin leerla y escríbela exactamente como la oíste.
      </p>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>✓ {score.correct}</span>
        <span style={{ marginLeft: 8, color: '#f87171', fontSize: '0.8rem' }}>✗ {score.total - score.correct}</span>
        <span style={{ marginLeft: 16, color: '#94a3b8', fontSize: '0.7rem' }}>Intentos: {attempts}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => playAudio(1)} disabled={playing}
          style={{ padding: '12px 20px', borderRadius: 12, background: playing ? '#334155' : '#06b6d4', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          🔊 Reproducir una vez
        </button>
        <button onClick={() => playAudio(2)} disabled={playing}
          style={{ padding: '12px 20px', borderRadius: 12, background: playing ? '#334155' : '#8b5cf6', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          🔁 Reproducir x2
        </button>
        <button onClick={stop}
          style={{ padding: '12px 20px', borderRadius: 12, background: '#ef4444', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
          ⏹️ Parar
        </button>
      </div>

      <input
        type="text"
        value={userInput}
        onChange={e => { setUserInput(e.target.value); setFeedback(null); }}
        placeholder="Escribe aquí lo que has oído..."
        disabled={feedback === 'correct'}
        onKeyDown={e => { if (e.key === 'Enter' && userInput.trim()) checkAnswer(); }}
        style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0f172a', color: '#e2e8f0', border: feedback === 'correct' ? '2px solid #22c55e' : feedback === 'incorrect' ? '2px solid #ef4444' : '1px solid #334155', fontSize: '1rem', marginBottom: 8 }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={checkAnswer} disabled={!userInput.trim() || feedback === 'correct'}
          style={{ flex: 1, padding: '10px', borderRadius: 8, background: feedback === 'correct' ? '#22c55e' : '#06b6d4', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', opacity: !userInput.trim() ? 0.6 : 1 }}>
          ✅ Verificar
        </button>
        <button onClick={() => setShowText(!showText)}
          style={{ padding: '10px 16px', borderRadius: 8, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', fontWeight: 600, cursor: 'pointer' }}>
          {showText ? '🙈 Ocultar texto' : '👀 Mostrar texto'}
        </button>
      </div>

      {feedback === 'incorrect' && (
        <div style={{ color: '#f87171', fontSize: '0.9rem', marginBottom: 8 }}>
          ❌ Incorrecto. Sigue intentando (llevas {attempts} intento{attempts !== 1 ? 's' : ''}).
        </div>
      )}
      {feedback === 'correct' && (
        <div style={{ color: '#4ade80', fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>
          ✅ ¡Perfecto!
        </div>
      )}
      {showText && (
        <div style={{ background: '#0f172a', padding: 12, borderRadius: 8, marginTop: 8, border: '1px solid #334155', fontSize: '1.05rem' }}>
          {currentScene?.text || ''}
        </div>
      )}
      {currentScene?.translation && showText && (
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>{currentScene.translation}</p>
      )}
    </div>
  );
};
