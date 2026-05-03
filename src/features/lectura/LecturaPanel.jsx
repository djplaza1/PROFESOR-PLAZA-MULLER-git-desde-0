// src/features/lectura/LecturaPanel.jsx
// Panel principal de Lectura - ensambla todos los subcomponentes
// Registrado como window.Muller.Panels['lectura']
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['lectura'] = function(props) {
  var h = window.Muller.LecturaHooks.useLectura({ initialText: '' });
  var iconSpan = window.Muller.LecturaComponents.iconSpan;

  // ─── Estilo contenedor principal ───
  var mainStyle = {
    padding: '16px',
    maxWidth: '960px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  // ─── Título ───
  var titleBar = React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }
  },
    React.createElement('h2', {
      style: { fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }
    }, ['📖 Lectura']),
    React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
      h.isOffline && React.createElement('span', {
        style: { fontSize: '0.75rem', color: '#fbbf24', background: 'rgba(251,191,36,0.1)', padding: '2px 8px', borderRadius: '4px' }
      }, '📡 Sin conexión'),
      h.streak > 0 && React.createElement('span', {
        style: { fontSize: '0.8rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '4px' }
      }, ['🔥', String(h.streak), ' días'])
    )
  );

  // ─── Selector de fuente de texto ───
  var sourceSelector = React.createElement('div', {
    style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }
  },
    React.createElement('button', {
      onClick: function() { h.setShowLibrary(!h.showLibrary); },
      style: glassButton(h.showLibrary ? '#fbbf24' : '#334155')
    }, [iconSpan('library', 'library-icon'), ' Biblioteca']),
    React.createElement('label', {
      style: glassButton('#334155', { position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' })
    },
      [iconSpan('fileText', 'file-icon'), ' Pegar'],
      React.createElement('input', {
        type: 'file',
        accept: '.txt,.pdf',
        style: { position: 'absolute', opacity: 0, width: '100%', height: '100%', top: 0, left: 0, cursor: 'pointer' },
        onChange: handleFileUpload
      })
    ),
    React.createElement('button', {
      onClick: h.startDictado,
      style: glassButton(h.dictadoActive ? '#06b6d4' : '#334155')
    }, [iconSpan('headphones', 'dictado-icon'), ' Dictado']),
    React.createElement('button', {
      onClick: h.startKaraoke,
      disabled: !h.text || h.karaokeActive,
      style: glassButton(h.karaokeActive ? '#a855f7' : '#334155', { opacity: !h.text ? 0.5 : 1 })
    }, [iconSpan('skipForward', 'karoake-icon'), ' Karaoke']),
    React.createElement('button', {
      onClick: h.startShadowReading,
      disabled: !h.text || h.shadowActive,
      style: glassButton(h.shadowActive ? '#8b5cf6' : '#334155', { opacity: !h.text ? 0.5 : 1 })
    }, [iconSpan('activity', 'shadow-icon'), ' Sombra'])
  );

  // ─── Input para pegar texto (componente externo para evitar pérdida de foco) ───
  var pasteArea = !h.text ? React.createElement(window.Muller.LecturaComponents.PasteArea, {
    onPaste: h.pasteText,
    value: h.pasteTextInput,
    onChange: h.setPasteTextInput,
    onClear: function() { h.setPasteTextInput(''); }
  }) : null;

  // ─── Controles de fuente ───
  var fontControls = h.text ? React.createElement('div', {
    style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }
  },
    React.createElement('button', { onClick: h.decreaseFont, style: glassButton('#475569', { padding: '4px 8px' }) }, 'A−'),
    React.createElement('span', { style: { color: '#94a3b8', fontSize: '0.8rem', minWidth: '40px', textAlign: 'center' } }, [String(h.fontSize), 'px']),
    React.createElement('button', { onClick: h.increaseFont, style: glassButton('#475569', { padding: '4px 8px' }) }, 'A+'),
    React.createElement('button', { onClick: h.resetFont, style: glassButton('#475569', { padding: '4px 8px' }) }, '↺'),
    React.createElement('span', { style: { flex: 1 } }),
    h.isReading
      ? React.createElement('button', { onClick: h.stopReading, style: glassButton('#ef4444', { display: 'flex', alignItems: 'center', gap: '4px' }) },
          [iconSpan('stopCircle', 'stop-icon'), ' Parar y evaluar'])
      : React.createElement('button', {
          onClick: h.startReading,
          disabled: !h.text,
          style: glassButton(h.isListening ? '#f97316' : '#06b6d4', { display: 'flex', alignItems: 'center', gap: '4px', opacity: !h.text ? 0.5 : 1 })
        }, [iconSpan('mic', 'mic-icon'), (h.isListening ? ' Escuchando...' : ' Empezar lectura')])
  ) : null;

  // ─── Texto tokenizado interactivo ───
  var textDisplay = h.text ? React.createElement(TextDisplay, {
    tokens: h.tokens,
    fontSize: h.fontSize,
    activeWord: h.activeWord,
    karaokeActive: h.karaokeActive,
    karaokeCurrentWord: h.karaokeCurrentWord,
    karaokeWords: h.karaokeWords,
    shadowActive: h.shadowActive,
    onWordClick: h.handleWordClick,
    onTextSelect: h.handleTextSelection
  }) : null;

  // ─── Barra de progreso durante lectura ───
  var progressBar = (h.isReading || h.isListening) && h.progress.total > 0
    ? React.createElement(ProgressBar, { progress: h.progress })
    : null;

  // ─── Temporizador de rondas ───
  var roundsDisplay = h.roundsActive
    ? React.createElement(RoundsDisplay, {
        currentRound: h.currentRound,
        roundTimeLeft: h.roundTimeLeft,
        roundTimeLimit: h.roundTimeLimit,
        roundScores: h.roundScores,
        onFinish: h.finishRound,
        isReading: h.isReading,
        startReading: h.startReading,
        stopReading: h.stopReading
      })
    : null;

  // ─── Panel de rondas (antes de empezar) ───
  var roundsPanelContainer = !h.roundsActive && h.text
    ? React.createElement('div', { style: { marginBottom: '8px' } },
        React.createElement('button', {
          onClick: function() { if (window.confirm('Modo rondas: leerás el texto 3 veces con tiempo decreciente. ¿Empezar?')) h.startRounds(); },
          style: glassButton('#8b5cf6', { display: 'flex', alignItems: 'center', gap: '4px' })
        }, [iconSpan('target', 'rounds-icon'), ' Modo rondas (3 intentos)'])
      )
    : null;

  // ─── Transcripción en tiempo real ───
  var transcriptDisplay = (h.transcript || h.interimText) && (h.isReading || h.showScore)
    ? React.createElement('div', {
        style: {
          marginTop: '8px', padding: '12px', borderRadius: '12px',
          background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(148,163,184,0.15)',
          backdropFilter: 'blur(8px)'
        }
      },
        React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' } }, '📝 Tu lectura:'),
        React.createElement('div', { style: { color: '#e2e8f0', fontSize: '0.9rem' } },
          h.transcript,
          h.interimText && React.createElement('span', { style: { color: '#94a3b8', opacity: 0.6 } }, h.interimText)
        )
      )
    : null;

  // ─── Puntuación ───
  var scorePanel = h.showScore && h.scoreResult
    ? React.createElement(ScorePanel, { result: h.scoreResult, onClose: function() { h.setShowScore(false); } })
    : null;

  // ─── Panel de palabra activa (traducción e info) ───
  var translationPanel = h.showTranslation && h.wordInfo
    ? React.createElement(TranslationPanel, {
        wordInfo: h.wordInfo,
        onClose: function() { h.setShowTranslation(false); }
      })
    : null;

  // ─── Frase seleccionada ───
  var selectedTextPanel = h.selectedText
    ? React.createElement('div', {
        style: {
          padding: '12px', borderRadius: '12px',
          background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(251,191,36,0.3)',
          backdropFilter: 'blur(8px)'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
          React.createElement('span', { style: { fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 } }, '✂️ Frase seleccionada'),
          React.createElement('div', { style: { display: 'flex', gap: '6px' } },
            React.createElement('button', { onClick: h.playSelectedText, style: glassButton('#06b6d4', { padding: '4px 8px' }) }, iconSpan('volume2', 'play-icon', 14)),
            React.createElement('button', { onClick: h.clearSelection, style: glassButton('#ef4444', { padding: '4px 8px' }) }, iconSpan('x', 'clear-icon', 14))
          )
        ),
        React.createElement('div', { style: { color: '#e2e8f0', fontSize: '0.9rem', fontStyle: 'italic' } }, h.selectedText)
      )
    : null;

  // ─── Grabación de audio ───
  var audioRecorder = h.text
    ? React.createElement(AudioRecorder, {
        isRecording: h.isRecording,
        isPlaying: h.isPlayingRecording,
        recordedBlob: h.recordedBlob,
        recordingsList: h.recordingsList,
        isReading: h.isReading,
        startRecording: h.startRecording,
        stopRecording: h.stopRecording,
        playRecording: h.playRecording,
        deleteRecording: h.deleteRecording
      })
    : null;

  // ─── Osciloscopio ───
  var oscilloscope = (h.isListening || h.oscilloscopeActive)
    ? React.createElement(Oscilloscope, {
        active: h.oscilloscopeActive,
        analyserRef: h.analyserRef,
        animationIdRef: h.animationIdRef
      })
    : null;

  // ─── Dictado inverso ───
  var dictadoPanel = h.dictadoActive
    ? React.createElement(DictadoPanel, {
        currentSentence: h.dictadoCurrentSentence,
        userInput: h.dictadoUserInput,
        setUserInput: h.setDictadoUserInput,
        score: h.dictadoScore,
        onSubmit: h.submitDictado,
        onStop: h.stopDictado,
        onRepeat: h.startDictado
      })
    : null;

  // ─── Sombra de lectura ───
  var shadowPanel = h.shadowActive
    ? React.createElement('div', {
        style: {
          padding: '12px', borderRadius: '12px',
          background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
          backdropFilter: 'blur(8px)', marginTop: '8px'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
          React.createElement('span', { style: { fontSize: '0.9rem', color: '#c4b5fd', fontWeight: 600 } }, '🎭 Sombra de lectura'),
          React.createElement('button', { onClick: h.stopShadowReading, style: glassButton('#ef4444', { padding: '4px 8px' }) }, iconSpan('square', 'stop-icon', 14))
        ),
        React.createElement('div', { style: { position: 'relative', height: '8px', background: 'rgba(139,92,246,0.2)', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', {
            style: { position: 'absolute', left: 0, top: 0, height: '100%', width: h.shadowSync + '%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '4px', transition: 'width 0.3s ease' }
          })
        ),
        React.createElement('div', { style: { fontSize: '0.8rem', color: '#a78bfa', marginTop: '4px', textAlign: 'center' } },
          'Sincronización: ' + h.shadowSync + '%')
      )
    : null;

  // ─── Historial ───
  var historyPanel = h.showHistory
    ? React.createElement(HistoryPanel, {
        history: h.history,
        onClose: function() { h.setShowHistory(false); },
        streak: h.streak
      })
    : null;

  // ─── Biblioteca ───
  var libraryPanel = h.showLibrary
    ? React.createElement(LibraryPanel, {
        texts: h.libraryTexts,
        onSelect: h.selectText,
        onDelete: h.deleteCustomText,
        onClose: function() { h.setShowLibrary(false); }
      })
    : null;

  // ─── Botón de historial ───
  var historyButton = h.text
    ? React.createElement('div', { style: { textAlign: 'center', marginTop: '8px' } },
        React.createElement('button', {
          onClick: function() { h.setShowHistory(!h.showHistory); },
          style: glassButton('#475569', { display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' })
        }, [iconSpan('barChart', 'history-icon'), (h.showHistory ? ' Cerrar historial' : ' Ver historial (' + h.history.length + ')')])
      )
    : null;

  // ─── Botón de análisis IA (placeholder) ───
  var aiButton = h.showScore && h.scoreResult
    ? React.createElement('div', { style: { textAlign: 'center', marginTop: '8px' } },
        React.createElement('button', {
          disabled: true,
          title: 'Próximamente',
          style: glassButton('#475569', { opacity: 0.6, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' })
        }, [iconSpan('brainCircuit', 'ai-icon'), ' Análisis IA (próximamente)'])
      )
    : null;

  // ─── News Section (Karaoke) ───
  var karaokeDisplay = h.karaokeActive
    ? React.createElement('div', {
        style: {
          padding: '12px', borderRadius: '12px',
          background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
          backdropFilter: 'blur(8px)', marginTop: '8px'
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
          React.createElement('span', { style: { fontSize: '0.9rem', color: '#d8b4fe', fontWeight: 600 } }, '🎤 Karaoke'),
          React.createElement('button', { onClick: h.stopKaraoke, style: glassButton('#ef4444', { padding: '4px 8px' }) }, iconSpan('square', 'stop-icon', 14))
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', fontSize: h.fontSize + 'px', lineHeight: 1.8 } },
          h.karaokeWords.map(function(word, idx) {
            return React.createElement('span', {
              key: idx,
              style: {
                color: idx === h.karaokeCurrentWord ? '#fbbf24' : '#e2e8f0',
                fontWeight: idx === h.karaokeCurrentWord ? 700 : 400,
                transition: 'all 0.2s ease',
                textShadow: idx === h.karaokeCurrentWord ? '0 0 10px rgba(251,191,36,0.5)' : 'none'
              }
            }, word + ' ');
          })
        )
      )
    : null;

  // ─── Ensamblaje final ───
  return React.createElement('div', { style: mainStyle },
    titleBar,
    sourceSelector,
    pasteArea,
    fontControls,
    roundsPanelContainer,
    roundsDisplay,
    textDisplay,
    progressBar,
    transcriptDisplay,
    scorePanel,
    selectedTextPanel,
    translationPanel,
    karaokeDisplay,
    shadowPanel,
    dictadoPanel,
    audioRecorder,
    oscilloscope,
    historyButton,
    historyPanel,
    libraryPanel,
    aiButton
  );
};

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '0:00';
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function glassButton(bg, extra) {
  var base = {
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: bg,
    color: '#f1f5f9',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(4px)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    outline: 'none'
  };
  return extra ? Object.assign({}, base, extra) : base;
}

function handleFileUpload(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(event) {
    var text = event.target.result;
    window.Muller.LecturaHelpers.lastPastedText = text;
    if (window.Muller.Toast) {
      window.Muller.Toast.show({ title: 'Archivo cargado', desc: file.name + ' cargado. Copia el texto en el panel.' });
    }
  };
  if (file.type === 'application/pdf') {
    if (window.Muller.Toast) {
      window.Muller.Toast.show({ title: 'PDF cargado', desc: 'Usa el botón "Pegar" para copiar texto extraído del PDF.' });
    }
  } else {
    reader.readAsText(file);
  }
  e.target.value = '';
}

// ═══════════════════════════════════════════════════
// SUBCOMPONENTES
// ═══════════════════════════════════════════════════

function TextDisplay(props) {
  var t = props.tokens || [];
  var fontSize = props.fontSize || 18;
  var activeWord = props.activeWord;
  var karaokeActive = props.karaokeActive;
  var karaokeCurrentWord = props.karaokeCurrentWord;
  var karaokeWords = props.karaokeWords;
  var onWordClick = props.onWordClick;
  var onTextSelect = props.onTextSelect;
  var _icon = window.Muller.LecturaHelpers.icon;

  function iS(n, c, s) {
    var html = _icon(n, c || '', s || 16);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  }

  var textStyle = {
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(30,41,59,0.6)',
    border: '1px solid rgba(148,163,184,0.15)',
    backdropFilter: 'blur(8px)',
    fontSize: fontSize + 'px',
    lineHeight: 1.8,
    color: '#e2e8f0',
    userSelect: 'text',
    cursor: 'default'
  };

  return React.createElement('div', {
    style: textStyle,
    onMouseUp: onTextSelect,
    onTouchEnd: onTextSelect
  },
    t.length === 0
      ? React.createElement('span', { style: { color: '#64748b', fontStyle: 'italic' } }, 'No hay texto cargado.')
      : t.map(function(token, idx) {
          var isActive = token.word === activeWord;
          var isKaraoke = karaokeActive && karaokeCurrentWord === idx;
          var wordStyle = {
            color: isActive ? '#fbbf24' : (isKaraoke ? '#a855f7' : '#e2e8f0'),
            fontWeight: (isActive || isKaraoke) ? 700 : 400,
            cursor: 'pointer',
            padding: '0 1px',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            background: isActive ? 'rgba(251,191,36,0.15)' : 'transparent',
            textShadow: isKaraoke ? '0 0 8px rgba(168,85,247,0.4)' : 'none'
          };

          return React.createElement('span', {
            key: idx,
            onClick: function() { onWordClick(token.word, token.cleanKey); },
            style: wordStyle,
            onMouseEnter: function(e) {
              if (!isActive) e.target.style.background = 'rgba(251,191,36,0.08)';
            },
            onMouseLeave: function(e) {
              if (!isActive) e.target.style.background = 'transparent';
            }
          }, token.word + (token.space || ' '));
        })
  );
}

function ProgressBar(props) {
  var p = props.progress || { correct: 0, total: 0 };
  var pct = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;

  return React.createElement('div', {
    style: {
      padding: '10px 12px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.6)',
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(8px)'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem' } },
      React.createElement('span', { style: { color: '#94a3b8' } }, 'Progreso: ' + p.correct + '/' + p.total + ' palabras'),
      React.createElement('span', { style: { color: pct > 70 ? '#4ade80' : '#fbbf24' } }, pct + '%')
    ),
    React.createElement('div', { style: { height: '6px', background: 'rgba(148,163,184,0.2)', borderRadius: '3px', overflow: 'hidden' } },
      React.createElement('div', {
        style: {
          height: '100%', width: pct + '%',
          background: 'linear-gradient(90deg, #06b6d4, #4ade80)',
          borderRadius: '3px',
          transition: 'width 0.3s ease'
        }
      })
    )
  );
}

function RoundsDisplay(props) {
  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(139,92,246,0.08)',
      border: '1px solid rgba(139,92,246,0.3)',
      backdropFilter: 'blur(8px)'
    }
  },
    React.createElement('div', { style: { textAlign: 'center', marginBottom: '12px' } },
      React.createElement('div', { style: { fontSize: '1rem', color: '#c4b5fd', fontWeight: 600 } }, 'Ronda ' + props.currentRound + ' de 3'),
      React.createElement('div', { style: { fontSize: '2.5rem', fontWeight: 700, color: '#fbbf24', margin: '8px 0' } },
        formatTime(props.roundTimeLeft)),
      React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8' } }, 'Tiempo límite: ' + formatTime(props.roundTimeLimit)),
      React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' } },
        props.isReading ? 'Leyendo...' : 'Preparado')
    ),
    props.currentRound > 1 && React.createElement('div', { style: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' } },
      props.roundScores.map(function(score, idx) {
        return React.createElement('div', {
          key: idx,
          style: {
            padding: '6px 12px', borderRadius: '8px',
            background: 'rgba(139,92,246,0.2)',
            fontSize: '0.8rem', color: '#c4b5fd'
          }
        }, 'R' + (idx + 1) + ': ' + score + '%');
      })
    ),
    React.createElement('div', { style: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' } },
      !props.isReading && React.createElement('button', {
        onClick: props.startReading,
        style: glassButton('#06b6d4')
      }, '🎤 Leer ronda'),
      props.isReading && React.createElement('button', {
        onClick: props.stopReading,
        style: glassButton('#ef4444')
      }, '⏹ Parar')
    )
  );
}

function ScorePanel(props) {
  var r = props.result;
  if (!r) return null;
  var scoreColor = r.score >= 80 ? '#4ade80' : (r.score >= 60 ? '#fbbf24' : '#f87171');

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(148,163,184,0.2)',
      backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('h3', { style: { margin: 0, fontSize: '1.2rem', color: '#f1f5f9', fontWeight: 700 } }, '📊 Resultado'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' } },
      React.createElement(StatBox, { label: 'Puntuación', value: r.score + '%', color: scoreColor }),
      React.createElement(StatBox, { label: 'Precisión', value: r.accuracy + '%', color: r.accuracy >= 90 ? '#4ade80' : '#fbbf24' }),
      React.createElement(StatBox, { label: 'Correctas', value: r.correct + '/' + r.total, color: '#06b6d4' }),
      React.createElement(StatBox, { label: 'Velocidad', value: r.wpm + ' ppm', color: r.wpm >= 50 ? '#4ade80' : '#fbbf24' })
    ),
    r.feedback && r.feedback.length > 0 && React.createElement('div', {
      style: {
        padding: '12px', borderRadius: '8px',
        background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
        maxHeight: '200px', overflowY: 'auto'
      }
    },
      React.createElement('div', { style: { fontSize: '0.85rem', color: '#fca5a5', marginBottom: '8px', fontWeight: 600 } }, '⚠️ Errores (' + r.feedback.length + '):'),
      r.feedback.slice(0, 10).map(function(fb, idx) {
        return React.createElement('div', {
          key: idx,
          style: { fontSize: '0.8rem', color: '#e2e8f0', marginBottom: '4px', padding: '4px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' }
        },
          React.createElement('strong', { style: { color: '#fbbf24' } }, fb.expected),
          ' → ',
          React.createElement('span', { style: { color: '#f87171' } }, fb.got),
          fb.advice && React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px', fontStyle: 'italic' } }, fb.advice)
        );
      })
    )
  );
}

function StatBox(props) {
  return React.createElement('div', {
    style: {
      padding: '12px',
      borderRadius: '8px',
      background: 'rgba(15,23,42,0.5)',
      border: '1px solid rgba(148,163,184,0.1)',
      textAlign: 'center'
    }
  },
    React.createElement('div', { style: { fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' } }, props.label),
    React.createElement('div', { style: { fontSize: '1.3rem', fontWeight: 700, color: props.color || '#e2e8f0', marginTop: '4px' } }, props.value)
  );
}

function TranslationPanel(props) {
  var info = props.wordInfo;
  if (!info) return null;

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(6,182,212,0.3)',
      backdropFilter: 'blur(12px)'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('span', { style: { fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 } }, '📖 Diccionario'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24', marginBottom: '4px' } }, info.word),
    React.createElement('div', { style: { fontSize: '1rem', color: '#e2e8f0', marginBottom: '8px' } }, info.translation),
    info.verbInfo && React.createElement(VerbInfo, { verb: info.verbInfo })
  );
}

function VerbInfo(props) {
  var v = props.verb;
  if (!v) return null;

  return React.createElement('div', {
    style: {
      marginTop: '8px', padding: '8px',
      borderRadius: '8px', background: 'rgba(251,191,36,0.1)',
      border: '1px solid rgba(251,191,36,0.2)'
    }
  },
    React.createElement('div', { style: { fontSize: '0.8rem', color: '#fbbf24', marginBottom: '4px', fontWeight: 600 } }, '🔧 Verbo'),
    React.createElement('div', { style: { fontSize: '0.85rem', color: '#e2e8f0' } },
      'Infinitivo: ' + (v.infinitive || v.infinitivo || '?'),
      React.createElement('br'),
      'Präteritum: ' + (v.praeteritum || v.präteritum || '—'),
      React.createElement('br'),
      'Perfekt: ' + (v.perfekt || '—'),
      v.nivel && React.createElement('span', {}, [React.createElement('br'), 'Nivel: ' + v.nivel])
    )
  );
}

function AudioRecorder(props) {
  var _icon = window.Muller.LecturaHelpers.icon;
  function iS(n, c, s) {
    var html = _icon(n, c || '', s || 14);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  }

  return React.createElement('div', {
    style: {
      padding: '12px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.6)',
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
      React.createElement('span', { style: { fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 } }, '🎙️ Grabación'),
      React.createElement('div', { style: { display: 'flex', gap: '6px' } },
        !props.isRecording
          ? React.createElement('button', {
              onClick: props.startRecording,
              disabled: props.isReading,
              style: glassButton('#ef4444', { padding: '4px 8px', opacity: props.isReading ? 0.5 : 1 })
            }, '🔴 Grabar')
          : React.createElement('button', {
              onClick: props.stopRecording,
              style: glassButton('#475569', { padding: '4px 8px' })
            }, '⏹ Detener')
      )
    ),
    props.recordedBlob && React.createElement('div', { style: { marginBottom: '8px' } },
      React.createElement('button', {
        onClick: function() { props.playRecording(props.recordedBlob); },
        style: glassButton('#06b6d4', { padding: '4px 8px' })
      }, '▶️ Reproducir última')
    ),
    props.recordingsList.length > 0 && React.createElement('div', {
      style: { fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }
    },
      React.createElement('div', { style: { fontWeight: 600, marginBottom: '4px' } }, 'Grabaciones anteriores:'),
      props.recordingsList.slice(-5).reverse().map(function(rec, idx) {
        return React.createElement('div', {
          key: rec.key || idx,
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' }
        },
          React.createElement('span', {}, new Date(rec.timestamp).toLocaleDateString() + ' ' + new Date(rec.timestamp).toLocaleTimeString()),
          React.createElement('div', { style: { display: 'flex', gap: '4px' } },
            React.createElement('button', {
              onClick: function() {
                var blob = dataURItoBlob(rec.blob);
                props.playRecording(blob);
              },
              style: glassButton('#06b6d4', { padding: '2px 6px', fontSize: '0.75rem' })
            }, '▶️'),
            React.createElement('button', {
              onClick: function() { props.deleteRecording(rec.key); },
              style: glassButton('#ef4444', { padding: '2px 6px', fontSize: '0.75rem' })
            }, '🗑️')
          )
        );
      })
    )
  );
}

function dataURItoBlob(dataURI) {
  if (!dataURI) return null;
  try {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  } catch(e) { return null; }
}

function Oscilloscope(props) {
  var canvasRef = React.useRef(null);
  var animId = React.useRef(null);
  var _icon = window.Muller.LecturaHelpers.icon;

  function iS(n, c, s) {
    var html = _icon(n, c || '', s || 14);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  }

  React.useEffect(function() {
    if (!props.active || !props.analyserRef.current || !canvasRef.current) return;

    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    var analyser = props.analyserRef.current;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var W = canvas.width;
    var H = canvas.height;

    function draw() {
      animId.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = 'rgba(15,23,42,0.3)';
      ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();

      var sliceWidth = W / bufferLength;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * H / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(W, H / 2);
      ctx.stroke();
    }
    draw();

    return function() {
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, [props.active, props.analyserRef.current]);

  return React.createElement('div', {
    style: {
      padding: '8px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.6)',
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' } }, '🌊 Entonación en vivo'),
    React.createElement('canvas', {
      ref: canvasRef,
      width: 300,
      height: 80,
      style: { width: '100%', height: '80px', borderRadius: '8px', background: '#0f172a' }
    })
  );
}

function DictadoPanel(props) {
  var _icon = window.Muller.LecturaHelpers.icon;
  function iS(n, c, s) {
    var html = _icon(n, c || '', s || 14);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  }

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(6,182,212,0.08)',
      border: '1px solid rgba(6,182,212,0.3)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('span', { style: { fontSize: '0.9rem', color: '#06b6d4', fontWeight: 600 } }, '🎧 Dictado inverso'),
      React.createElement('div', { style: { display: 'flex', gap: '6px' } },
        React.createElement('button', { onClick: props.onRepeat, style: glassButton('#06b6d4', { padding: '4px 8px' }) }, '🔊 Repetir'),
        React.createElement('button', { onClick: props.onStop, style: glassButton('#ef4444', { padding: '4px 8px' }) }, '✕ Cerrar')
      )
    ),
    React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' } },
      'Escucha la frase y escríbela exactamente como la oyes:'),
    props.currentSentence && React.createElement('textarea', {
      placeholder: 'Escribe lo que escuchaste...',
      value: props.userInput,
      onChange: function(e) { props.setUserInput(e.target.value); },
      rows: 3,
      style: {
        width: '100%', padding: '10px', borderRadius: '8px',
        background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(148,163,184,0.2)',
        color: '#e2e8f0', fontSize: '1rem', resize: 'vertical', outline: 'none'
      }
    }),
    React.createElement('button', {
      onClick: props.onSubmit,
      disabled: !props.userInput.trim(),
      style: glassButton('#06b6d4', { marginTop: '8px', opacity: !props.userInput.trim() ? 0.5 : 1 })
    }, '📤 Enviar y evaluar'),
    props.score && React.createElement('div', {
      style: {
        marginTop: '12px', padding: '12px', borderRadius: '8px',
        background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)'
      }
    },
      React.createElement('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px' } },
        'Puntuación: ' + props.score.score + '%'),
      React.createElement('div', { style: { fontSize: '0.85rem', color: '#e2e8f0' } },
        props.score.correct + '/' + props.score.total + ' palabras correctas')
    )
  );
}

function HistoryPanel(props) {
  var hist = props.history || [];
  var streak = props.streak || 0;

  var avgScore = hist.length > 0
    ? Math.round(hist.reduce(function(sum, h) { return sum + (h.score || 0); }, 0) / hist.length)
    : 0;

  var last7 = hist.slice(0, 7).reverse();

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(148,163,184,0.2)',
      backdropFilter: 'blur(12px)'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
      React.createElement('span', { style: { fontSize: '1rem', color: '#f1f5f9', fontWeight: 700 } }, '📊 Historial'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' } },
      React.createElement(StatBox, { label: 'Sesiones', value: String(hist.length), color: '#06b6d4' }),
      React.createElement(StatBox, { label: 'Promedio', value: avgScore + '%', color: avgScore >= 70 ? '#4ade80' : '#fbbf24' }),
      React.createElement(StatBox, { label: 'Racha', value: streak + ' días', color: streak >= 7 ? '#f97316' : '#94a3b8' })
    ),
    last7.length > 0 && React.createElement('div', { style: { marginBottom: '16px' } },
      React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' } }, 'Últimas sesiones:'),
      React.createElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'flex-end', height: '60px' } },
        last7.map(function(h, idx) {
          var barH = Math.max(10, (h.score || 0) * 0.6);
          return React.createElement('div', {
            key: idx,
            style: {
              flex: 1, height: barH + 'px',
              background: h.score >= 80 ? '#4ade80' : (h.score >= 60 ? '#fbbf24' : '#f87171'),
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.3s ease',
              minWidth: '20px',
              position: 'relative'
            },
            title: new Date(h.timestamp).toLocaleDateString() + ': ' + h.score + '%'
          },
            React.createElement('span', {
              style: { position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: '#94a3b8' }
            }, h.score + '%')
          );
        })
      ),
      React.createElement('div', { style: { display: 'flex', gap: '4px', marginTop: '4px' } },
        last7.map(function(h, idx) {
          return React.createElement('div', {
            key: idx,
            style: { flex: 1, fontSize: '0.6rem', color: '#64748b', textAlign: 'center' }
          }, new Date(h.timestamp).toLocaleDateString(undefined, { weekday: 'short' }));
        })
      )
    ),
    React.createElement('div', { style: { maxHeight: '200px', overflowY: 'auto' } },
      hist.slice(0, 30).map(function(h, idx) {
        return React.createElement('div', {
          key: idx,
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 8px', borderRadius: '6px',
            background: idx % 2 === 0 ? 'rgba(15,23,42,0.3)' : 'transparent',
            marginBottom: '2px', fontSize: '0.8rem'
          }
        },
          React.createElement('div', { style: { color: '#94a3b8', minWidth: '80px' } },
            new Date(h.timestamp).toLocaleDateString()),
          React.createElement('div', { style: { flex: 1, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '0 8px' } },
            h.textPreview || ''),
          React.createElement('div', { style: { color: h.score >= 80 ? '#4ade80' : (h.score >= 60 ? '#fbbf24' : '#f87171'), fontWeight: 600, minWidth: '40px', textAlign: 'right' } },
            h.score + '% / ' + h.wpm + 'ppm')
        );
      })
    )
  );
}

function LibraryPanel(props) {
  var texts = props.texts || [];

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(148,163,184,0.2)',
      backdropFilter: 'blur(12px)',
      maxHeight: '400px',
      overflowY: 'auto'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('span', { style: { fontSize: '1rem', color: '#f1f5f9', fontWeight: 700 } }, '📚 Biblioteca'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    texts.length === 0 && React.createElement('div', { style: { color: '#64748b', fontStyle: 'italic', textAlign: 'center', padding: '16px' } },
      'No hay textos disponibles. Pega un texto o carga un archivo.'),
    texts.map(function(item, idx) {
      return React.createElement('div', {
        key: item.id || idx,
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 12px', borderRadius: '8px',
          background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(148,163,184,0.1)',
          marginBottom: '6px', cursor: 'pointer',
          transition: 'all 0.2s ease'
        },
        onClick: function() { props.onSelect(item.text, 'library'); },
        onMouseEnter: function(e) { e.currentTarget.style.borderColor = '#06b6d4'; },
        onMouseLeave: function(e) { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)'; }
      },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { color: '#e2e8f0', fontWeight: 500 } }, item.title || 'Sin título'),
          React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.75rem' } },
            (item.level || 'N/A') + ' · ' +
            (item.text ? item.text.split(' ').length + ' palabras' : '') +
            (item.source ? ' · ' + item.source : '')
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: '4px' } },
          item.isCustom && React.createElement('button', {
            onClick: function(e) { e.stopPropagation(); props.onDelete(item.id); },
            style: glassButton('#ef4444', { padding: '4px 8px', fontSize: '0.75rem' })
          }, '🗑️'),
          React.createElement('div', { style: glassButton('#06b6d4', { padding: '4px 8px', fontSize: '0.75rem' }) }, '📖 Leer')
        )
      );
    })
  );
}
