// ═══════════════════════════════════════════════════════
// HUECOS – Submodo de Historia (Rellena los espacios)
// MUESTRA LA TRADUCCIÓN ARRIBA Y LOS HUECOS DEBAJO
// ═══════════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.huecos = function HuecosSubmod({ guion, currentScene, sceneIndex }) {
  const cleanText = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const originalText = cleanText(currentScene?.text_de || currentScene?.text || '');
  const traduccion = currentScene?.translation || '';

  // Dividir texto en palabras preservando puntuación
  const tokenize = (txt) => txt.match(/\S+\s*/g) || [];
  const tokens = tokenize(originalText);
  const wordCount = tokens.length;

  const generateBlanks = React.useCallback(() => {
    if (wordCount < 3) return { tokens, blanks: new Set(), answers: [], hintTranslations: [] };
    // Más huecos cuanto más larga la frase: 3 para cortas, 4 para medias, 5 para largas
    const numBlanks = Math.min(Math.max(2, Math.floor(wordCount * 0.35)), 5);
    const usableIndices = tokens.map((t, i) => ({ i, w: t.trim() })).filter(x => x.w.length > 2).map(x => x.i);
    if (usableIndices.length < numBlanks) return { tokens, blanks: new Set(), answers: [], hintTranslations: [] };

    const chosen = [];
    const pool = [...usableIndices];
    while (chosen.length < numBlanks && pool.length > 0) {
      const r = Math.floor(Math.random() * pool.length);
      chosen.push(pool[r]);
      pool.splice(r, 1);
    }
    const blanks = new Set(chosen);
    const answers = chosen.map(i => tokens[i].trim());
    const hintTranslations = chosen.map(i => {
      const word = tokens[i].trim();
      if (traduccion) {
        const origWords = originalText.split(/\s+/);
        const transWords = traduccion.split(/\s+/);
        const wi = (() => {
          let count = 0;
          for (let j = 0; j <= i; j++) {
            if (tokens[j] && tokens[j].trim()) count++;
          }
          return count - 1;
        })();
        if (wi >= 0 && wi < transWords.length) return transWords[wi];
      }
      return word;
    });
    return { tokens, blanks, answers, hintTranslations };
  }, [sceneIndex]);

  const [puzzle, setPuzzle] = React.useState(generateBlanks());
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [feedback, setFeedback] = React.useState(null);
  const [score, setScore] = React.useState({ correct: 0, total: 0, streak: 0, bestStreak: 0 });
  const [showHint, setShowHint] = React.useState(false);

  React.useEffect(() => {
    const p = generateBlanks();
    setPuzzle(p);
    setUserAnswers(new Array(p.answers.length).fill(''));
    setFeedback(null);
    setShowHint(false);
  }, [sceneIndex]);

  // Mapear orden de blanks en tokens
  const blankOrder = puzzle.tokens
    .map((t, i) => puzzle.blanks.has(i) ? i : -1)
    .filter(i => i !== -1);

  const handleChange = (blankIdx, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[blankIdx] = value;
    setUserAnswers(newAnswers);
  };

  const checkAll = () => {
    const results = blankOrder.map((blankIdx, i) => {
      const userWord = (userAnswers[i] || '').trim().toLowerCase().replace(/[^\wäöüß]/g, '');
      const correctWord = puzzle.tokens[blankIdx].trim().toLowerCase().replace(/[^\wäöüß]/g, '');
      return userWord === correctWord;
    });
    const allCorrect = results.every(r => r);
    const correctCount = results.filter(r => r).length;

    if (allCorrect) {
      const newStreak = score.streak + 1;
      setScore(prev => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        streak: newStreak,
        bestStreak: Math.max(newStreak, prev.bestStreak)
      }));
      window.Muller.playCorrect?.();
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1, streak: 0 }));
    }
    setFeedback({ results: Object.fromEntries(blankOrder.map((bi, i) => [i, results[i]])), correctCount, totalBlanks: results.length, perfect: allCorrect });
  };

  const resetPuzzle = () => {
    const p = generateBlanks();
    setPuzzle(p);
    setUserAnswers(new Array(p.answers.length).fill(''));
    setFeedback(null);
    setShowHint(false);
  };

  const boxStyle = {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: 16,
    padding: 20,
    border: '1px solid #334155'
  };

  return React.createElement('div', { style: boxStyle },
    // Header
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 } },
      React.createElement('h3', { style: { color: '#e2e8f0', margin: 0, fontSize: '1.2rem' } },
        '🧩 Huecos ',
        React.createElement('span', { style: { fontSize: '0.8rem', color: '#a78bfa' } }, 'PREMIUM')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 12, fontSize: '0.85rem' } },
        React.createElement('span', { style: { color: '#4ade80' } }, '✓ ' + score.correct),
        React.createElement('span', { style: { color: '#f87171' } }, '✗ ' + (score.total - score.correct)),
        score.streak > 1 && React.createElement('span', { style: { color: '#fbbf24' } }, '🔥 ' + score.streak)
      )
    ),

    // === TRADUCCIÓN AL ESPAÑOL (ARRIBA, como referencia) ===
    traduccion && React.createElement('div', {
      style: {
        background: '#0f172a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        border: '2px solid #a78bfa',
        fontSize: '1.1rem',
        lineHeight: 1.7,
        color: '#f0e6ff'
      }
    },
      React.createElement('div', { style: { color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' } }, '📖 Español'),
      traduccion
    ),

    // Instrucción
    React.createElement('p', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 12 } },
      'Completa los espacios con la palabra correcta en alemán. Usa la traducción de arriba como guía.'
    ),

    // === FRASE CON HUECOS (EN ALEMÁN, DEBAJO) ===
    React.createElement('div', { style: { background: '#0f172a', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #334155', fontSize: '1.15rem', lineHeight: 1.8, letterSpacing: '0.3px', wordSpacing: '6px' } },
      puzzle.tokens.map((token, i) => {
        if (puzzle.blanks.has(i)) {
          const blankIdx = blankOrder.indexOf(i);
          const fb = feedback && feedback.results[blankIdx];
          const borderColor = fb === true ? '#22c55e' : fb === false ? '#ef4444' : '#334155';
          const wordLen = token.trim().length;
          return React.createElement('input', {
            key: i,
            type: 'text',
            value: userAnswers[blankIdx] || '',
            onChange: e => handleChange(blankIdx, e.target.value),
            disabled: feedback !== null,
            placeholder: '_'.repeat(wordLen),
            style: {
              width: Math.max(wordLen * 14, 60) + 'px',
              padding: '4px 8px',
              margin: '0 4px',
              borderRadius: 6,
              background: '#1e293b',
              color: '#e2e8f0',
              border: '2px solid ' + borderColor,
              fontSize: 'inherit',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              outline: 'none'
            }
          });
        }
        return React.createElement('span', { key: i, style: { color: '#e2e8f0', whiteSpace: 'pre-wrap' } }, token);
      })
    ),

    // Feedback
    feedback && React.createElement('div', {
      style: {
        padding: 16,
        borderRadius: 12,
        background: feedback.perfect ? '#065f4620' : '#7f1d1d20',
        border: '2px solid ' + (feedback.perfect ? '#22c55e' : '#ef4444'),
        marginBottom: 12
      }
    },
      React.createElement('div', { style: { fontSize: '1.1rem', fontWeight: 600, color: feedback.perfect ? '#4ade80' : '#f87171' } },
        feedback.perfect ? '🌟 ¡Todos los huecos correctos!' :
          '📝 ' + feedback.correctCount + ' de ' + feedback.totalBlanks + ' correctos'
      ),
      // Mostrar respuestas correctas si no fue perfecto
      !feedback.perfect && React.createElement('div', { style: { marginTop: 8, fontSize: '0.9rem', color: '#94a3b8' } },
        blankOrder.map((bi, i) => {
          if (feedback.results[i]) return null;
          const hintWord = puzzle.hintTranslations[blankOrder.indexOf(bi)] || '';
          return React.createElement('div', { key: i, style: { marginTop: 4 } },
            React.createElement('span', { style: { color: '#f87171' } }, '✗ '),
            React.createElement('span', { style: { color: '#e2e8f0' } }, '→ ' + puzzle.tokens[bi].trim()),
            hintWord && React.createElement('span', { style: { color: '#94a3b8', marginLeft: 8 } }, '(' + hintWord + ')')
          );
        })
      )
    ),

    // Botones
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
      !feedback
        ? React.createElement('button', {
            onClick: checkAll,
            disabled: userAnswers.some(a => !a.trim()),
            style: {
              flex: 1, padding: 12, borderRadius: 10,
              background: userAnswers.every(a => a.trim()) ? '#22c55e' : '#334155',
              color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer'
            }
          }, '✅ Verificar')
        : React.createElement('button', {
            onClick: resetPuzzle,
            style: {
              flex: 1, padding: 12, borderRadius: 10,
              background: '#06b6d4', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer'
            }
          }, '🔄 Nuevo ejercicio'),
      React.createElement('button', {
        onClick: () => setShowHint(!showHint),
        style: { padding: '12px 16px', borderRadius: 8, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer' }
      }, '💡 Pista')
    ),

    // Pista con traducciones individuales
    showHint && React.createElement('div', { style: { padding: 12, background: '#1e293b', borderRadius: 8, marginTop: 8 } },
      React.createElement('p', { style: { color: '#94a3b8', fontSize: '0.8rem', marginBottom: 8 } }, '📖 Traducción de las palabras ocultas:'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
        puzzle.answers.map((w, i) => {
          const translationHint = puzzle.hintTranslations[i] !== w ? puzzle.hintTranslations[i] : '';
          return React.createElement('div', { key: i, style: { color: '#a78bfa', fontSize: '0.9rem' } },
            React.createElement('span', { style: { color: '#fbbf24' } }, (i + 1) + '. '),
            React.createElement('span', { style: { color: '#e2e8f0' } }, w),
            translationHint && React.createElement('span', { style: { color: '#94a3b8', marginLeft: 8, fontSize: '0.8rem' } }, '(' + translationHint + ')')
          );
        })
      )
    )
  );
};