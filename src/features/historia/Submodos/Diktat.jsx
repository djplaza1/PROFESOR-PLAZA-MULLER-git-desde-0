// ═══════════════════════════════════════════════════
// DIKTAT – Dictado Premium con diff visual
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.diktat = function DiktatSubmod({ currentScene, sceneIndex, onClose }) {
  const [diktatInput, setDiktatInput] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const targetText = currentScene?.text || '';
  const targetWords = targetText.split(/\s+/).filter(w => w);

  // Limpiar al cambiar de escena
  React.useEffect(() => {
    setDiktatInput('');
    setShowResult(false);
    setIsCorrect(false);
  }, [sceneIndex]);

  // Limpieza de texto (app antigua)
  const clean = (t) => String(t || '').toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[.,!?]/g, '').trim();

  // Reproducir audio
  const playAudio = () => {
    window.Muller.stopSpeech();
    const u = new SpeechSynthesisUtterance(targetText);
    u.lang = 'de-DE';
    u.rate = 0.75;
    if (window.Muller.applyDeVoice) window.Muller.applyDeVoice(u);
    speechSynthesis.speak(u);
    setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
  };

  // Comprobar dictado
  const handleCheck = () => {
    if (!diktatInput.trim()) return;
    const original = clean(targetText);
    const typed = clean(diktatInput);
    setIsCorrect(original === typed);
    setShowResult(true);
    if (original === typed) {
      window.Muller.playCorrect?.();
    } else {
      window.Muller.playIncorrect?.();
    }
    setIsPlaying(false);
  };

  // Renderizar diff visual palabra por palabra
  const renderDiff = () => {
    const origWords = targetText.split(/\s+/).filter(w => w);
    const typedWords = diktatInput.split(/\s+/).filter(w => w);
    return React.createElement('div', {
      className: 'flex flex-wrap gap-2 text-lg md:text-2xl font-medium justify-center bg-gray-900 p-4 md:p-6 rounded-xl border border-gray-700 leading-loose w-full'
    }, origWords.map((word, i) => {
      const tWord = typedWords[i] || '';
      const match = clean(word) === clean(tWord);
      if (match) {
        return React.createElement('span', { key: i, className: 'text-green-400' }, word);
      } else {
        return React.createElement('div', { key: i, className: 'flex flex-col items-center mx-1' },
          React.createElement('span', { className: 'text-red-400 line-through decoration-red-500 text-sm md:text-lg opacity-70' }, tWord || '___'),
          React.createElement('span', { className: 'text-green-400 text-xs md:text-sm' }, word)
        );
      }
    }));
  };

  return React.createElement('div', {
    className: 'w-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-4 md:p-6 border border-gray-700 shadow-2xl'
  },
    // Encabezado
    React.createElement('div', { className: 'flex items-center justify-between mb-4' },
      React.createElement('h3', { className: 'text-white text-lg md:text-xl font-bold flex items-center gap-2' },
        '✍️ Diktat PREMIUM'
      ),
      React.createElement('div', { className: 'flex gap-2' },
        React.createElement('button', {
          onClick: playAudio,
          className: 'px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ' + (isPlaying ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600')
        }, isPlaying ? '🔊 Reproduciendo...' : '🔊 Escuchar'),
        React.createElement('button', {
          onClick: () => { window.Muller.stopSpeech(); setIsPlaying(false); },
          className: 'px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-400 hover:bg-gray-700'
        }, '⏹ Parar'),
        onClose && React.createElement('button', {
          onClick: onClose,
          className: 'px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-600'
        }, '✕ Cerrar')
      )
    ),

    // Instrucción
    React.createElement('p', { className: 'text-gray-400 text-xs md:text-sm mb-4' },
      'Escucha el audio y escribe exactamente lo que oyes.'
    ),

    // Área de texto
    !showResult && React.createElement('textarea', {
      className: 'w-full h-24 md:h-32 bg-black/50 border-2 border-blue-500/50 rounded-xl p-3 md:p-4 text-base md:text-xl text-white outline-none focus:border-blue-400 mb-4',
      placeholder: 'Escribe aquí lo que escuchas...',
      value: diktatInput,
      onChange: (e) => setDiktatInput(e.target.value),
      onKeyDown: (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleCheck();
      },
      autoFocus: true
    }),

    // Resultado con diff visual
    showResult && React.createElement('div', { className: 'mb-4' },
      isCorrect
        ? React.createElement('div', { className: 'text-center p-4 bg-green-900/30 border border-green-500/30 rounded-xl' },
            React.createElement('p', { className: 'text-green-400 font-bold text-lg md:text-xl' }, '🌟 ¡Perfecto!'),
            React.createElement('p', { className: 'text-green-300 text-sm mt-1' }, 'Has escrito el dictado sin errores.')
          )
        : React.createElement('div', { className: 'text-center' },
            React.createElement('p', { className: 'text-red-400 font-bold mb-3' }, 'Corrige los errores:'),
            renderDiff()
          ),
      React.createElement('button', {
        onClick: () => { setShowResult(false); setDiktatInput(''); },
        className: 'mt-4 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm'
      }, '✍️ Intentar otra vez')
    ),

    // Botón comprobar
    !showResult && React.createElement('button', {
      onClick: handleCheck,
      disabled: !diktatInput.trim(),
      className: 'w-full py-3 rounded-xl font-bold text-sm ' + (diktatInput.trim() ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed')
    }, '✅ Verificar dictado')
  );
};