// ═══════════════════════════════════════════════════
// DECLINAR – Submodo de Historia (Declinaciones Premium)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.declinar = function DeclinarSubmod({ guion, currentScene, sceneIndex }) {
  const sentence = (currentScene?.text || '').replace(/[^\w\säöüßÄÖÜ]/g, '');
  const words = sentence.split(/\s+/);
  const [quiz, setQuiz] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0 });

  const declensionPatterns = [
    { prep: 'mit', phrase: 'mit ___ Mann', options: ['dem', 'den', 'des', 'der'], answer: 'dem', case: 'Dativ' },
    { prep: 'für', phrase: 'für ___ Frau', options: ['die', 'der', 'das', 'den'], answer: 'die', case: 'Akkusativ' },
    { prep: 'ohne', phrase: 'ohne ___ Kind', options: ['das', 'dem', 'des', 'den'], answer: 'das', case: 'Akkusativ' },
    { prep: 'zu', phrase: 'zu ___ Haus', options: ['dem', 'das', 'der', 'des'], answer: 'dem', case: 'Dativ' }
  ];

  React.useEffect(() => {
    const random = declensionPatterns[Math.floor(Math.random() * declensionPatterns.length)];
    setQuiz(random);
    setSelected(null);
    setFeedback(null);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === quiz.answer;
    if (correct) {
      setScore(prev => ({ correct: prev.correct+1, total: prev.total+1, streak: prev.streak+1 }));
      window.Muller.playCorrect?.();
    } else {
      setScore(prev => ({ ...prev, total: prev.total+1, streak: 0 }));
      window.Muller.playIncorrect?.();
    }
    setFeedback({ correct, answer: quiz.answer });
  };

  if (!quiz) return null;

  return (
    <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ color: '#e2e8f0' }}>📐 Declinar <span style={{color:'#f472b6'}}>PREMIUM</span></h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
          <span style={{ color: '#f87171' }}>✗ {score.total - score.correct}</span>
          {score.streak > 1 && <span style={{ color: '#fbbf24' }}>🔥 {score.streak}</span>}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <p style={{ color: '#94a3b8' }}>Elige la declinación correcta ({quiz.case})</p>
        <div style={{ fontSize: '1.5rem', color: '#e2e8f0', margin: '16px 0' }}>{quiz.phrase}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {quiz.options.map(opt => {
            const isSelected = selected === opt;
            const bg = feedback ? (opt === quiz.answer ? '#22c55e' : (isSelected && !feedback.correct ? '#ef4444' : '#334155')) : (isSelected ? '#f472b6' : '#1e293b');
            return (
              <button key={opt} onClick={() => !feedback && handleSelect(opt)}
                style={{
                  padding: '10px 20px', borderRadius: 10, border: '2px solid #334155',
                  background: bg, color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: feedback ? 'default' : 'pointer'
                }}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
      {feedback && (
        <div style={{ textAlign: 'center', color: feedback.correct ? '#4ade80' : '#f87171' }}>
          {feedback.correct ? '🌟 ¡Correcto!' : `Respuesta: "${feedback.answer}"`}
        </div>
      )}
    </div>
  );
};