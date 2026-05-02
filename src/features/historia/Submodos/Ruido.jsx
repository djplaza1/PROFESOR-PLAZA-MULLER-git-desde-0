// ═══════════════════════════════════════════════════
// RUIDO – Submodo de Historia (Comprensión con ruido Premium)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.ruido = function RuidoSubmod({ guion, currentScene, sceneIndex }) {
  const [userInput, setUserInput] = React.useState('');
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0 });
  const noiseContextRef = React.useRef(null);

  const clean = (t) => (t || '').replace(/[^\w\säöüßÄÖÜ]/g, '').replace(/\s+/g, ' ').trim();
  const target = clean(currentScene?.text);

  const playWithNoise = () => {
    window.Muller.stopSpeech();
    window.speechSynthesis.cancel();
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      noiseContextRef.current = ctx;
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0.15;
      noise.connect(gain).connect(ctx.destination);
      noise.start();
      const u = new SpeechSynthesisUtterance(target);
      u.lang = 'de-DE';
      u.rate = 0.8;
      u.onend = () => { noise.stop(); ctx.close(); };
      window.speechSynthesis.speak(u);
    } catch(e) { alert('Audio no soportado'); }
  };

  React.useEffect(() => { setUserInput(''); setFeedback(null); return () => { if (noiseContextRef.current) noiseContextRef.current.close(); }; }, [sceneIndex]);

  const check = () => {
    const isCorrect = clean(userInput).toLowerCase() === target.toLowerCase();
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
        <h3 style={{ color: '#e2e8f0' }}>🔊 Ruido <span style={{color:'#f97316'}}>PREMIUM</span></h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
          <span style={{ color: '#f87171' }}>✗ {score.total - score.correct}</span>
          {score.streak > 1 && <span style={{ color: '#fbbf24' }}>🔥 {score.streak}</span>}
        </div>
      </div>
      <p style={{ color: '#94a3b8' }}>Escucha la frase con ruido de fondo y escríbela.</p>
      <button onClick={playWithNoise} style={{ padding: '12px 24px', borderRadius: 12, background: '#f97316', color: 'white', border: 'none', cursor: 'pointer', marginBottom: 16 }}>
        🔊 Reproducir con ruido
      </button>
      <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Texto..." style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0f172a', color: '#e2e8f0', border: '1px solid #334155', fontSize: '1rem', marginBottom: 12 }}
        onKeyDown={e => { if (e.key === 'Enter' && userInput.trim()) check(); }} />
      <button onClick={check} disabled={!userInput.trim()} style={{ padding: '10px 20px', borderRadius: 8, background: userInput.trim() ? '#22c55e' : '#334155', color: 'white', border: 'none', cursor: 'pointer' }}>
        ✅ Verificar
      </button>
      {feedback && <div style={{ marginTop: 12, color: feedback.correct ? '#4ade80' : '#f87171' }}>{feedback.correct ? '🌟 ¡Correcto!' : `Era: "${feedback.target}"`}</div>}
    </div>
  );
};