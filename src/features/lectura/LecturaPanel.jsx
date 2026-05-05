// src/features/lectura/LecturaPanel.jsx
// Panel principal de la pestaña Lectura
// Se registra como window.Muller.LecturaPanel

window.Muller = window.Muller || {};

// ─── HELPERS LOCALES ───

function glassButton(bg, extra) {
  extra = extra || {};
  return Object.assign({
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: extra.fontSize || '0.8rem',
    color: '#f8fafc',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  }, bg ? { borderColor: bg + '44', background: bg + '22' } : {}, extra);
}

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '0:00';
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return m + ':' + (s < 10 ? '0' + s : '' + s);
}

// ─── SUBCOMPONENTES ───

function TextDisplay(props) {
  var t = props.tokens || [];
  var fontSize = props.fontSize || 18;
  var activeWord = props.activeWord;
  var karaokeActive = props.karaokeActive;
  var karaokeCurrentWord = props.karaokeCurrentWord;
  var karaokeWords = props.karaokeWords;
  var onWordClick = props.onWordClick;
  var onTextSelect = props.onTextSelect;
  var wordStatuses = props.wordStatuses || {};
  var showHeatmap = props.showHeatmap;
  var heatmapTokens = props.heatmapTokens || [];

  function iS(n, c, s) {
    var html = window.Muller.LecturaHelpers.icon(n, c || '', s || 16);
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
          var status = wordStatuses[token.cleanKey];
          var heatData = showHeatmap ? (heatmapTokens[idx] || null) : null;

          var wordStyle = {
            cursor: 'pointer',
            padding: '0 1px',
            borderRadius: '4px',
            transition: 'all 0.25s ease'
          };

          // Color base: feedback en vivo o normal
          if (status === 'correct') {
            wordStyle.color = '#4ade80';
            wordStyle.background = 'rgba(74,222,128,0.12)';
            wordStyle.fontWeight = 500;
          } else if (status === 'incorrect') {
            wordStyle.color = '#f87171';
            wordStyle.background = 'rgba(248,113,113,0.15)';
            wordStyle.fontWeight = 500;
            wordStyle.textDecoration = 'underline wavy #f87171';
          } else if (isActive) {
            wordStyle.color = '#fbbf24';
            wordStyle.fontWeight = 700;
            wordStyle.background = 'rgba(251,191,36,0.15)';
          } else if (isKaraoke) {
            wordStyle.color = '#a855f7';
            wordStyle.fontWeight = 700;
            wordStyle.textShadow = '0 0 8px rgba(168,85,247,0.4)';
            wordStyle.background = 'rgba(168,85,247,0.15)';
          } else if (heatData && heatData.color !== '#22c55e') {
            // Mapa de calor - palabras que suelen fallar
            wordStyle.color = '#e2e8f0';
            wordStyle.background = heatData.color + '33';
            wordStyle.borderBottom = '2px solid ' + heatData.color;
            wordStyle.fontWeight = 500;
          } else {
            wordStyle.color = '#e2e8f0';
            wordStyle.fontWeight = 400;
            wordStyle.background = 'transparent';
          }

          return React.createElement('span', {
            key: idx,
            onClick: function() { onWordClick(token.word, token.cleanKey); },
            style: wordStyle,
            onMouseEnter: function(e) {
              if (!isActive && !status) e.target.style.background = 'rgba(251,191,36,0.08)';
            },
            onMouseLeave: function(e) {
              if (!isActive && !status) e.target.style.background = 'transparent';
            },
            title: heatData && heatData.errorCount > 0 ? 'Fallada ' + heatData.errorCount + ' vez/veces' : ''
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
  function iS(n, c, s) {
    var html = window.Muller.LecturaHelpers.icon(n, c || '', s || 14);
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
          React.createElement('span', { style: { fontSize: '0.75rem' } }, new Date(rec.timestamp).toLocaleDateString() + ' ' + new Date(rec.timestamp).toLocaleTimeString()),
          React.createElement('div', { style: { display: 'flex', gap: '4px' } },
            React.createElement('button', {
              onClick: function() {
                props.playRecordingFromDataURL(rec.blob);
              },
              style: glassButton('#06b6d4', { padding: '2px 6px', fontSize: '0.75rem' })
            }, '▶️'),
            React.createElement('button', {
              onClick: function() { props.deleteRecording(rec.key); },
              style: glassButton('#ef4444', { padding: '2px 6px', fontSize: '0.75rem' })
            }, '🗑️')
          )
        );
      }),
      props.recordingsList.length > 0 && React.createElement('div', { style: { marginTop: '6px' } },
        React.createElement('button', {
          onClick: props.deleteAllRecordings,
          style: glassButton('#ef4444', { padding: '2px 8px', fontSize: '0.7rem' })
        }, '🗑️ Borrar todas')
      )
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
  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(6,182,212,0.05)',
      border: '1px solid rgba(6,182,212,0.2)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('span', { style: { fontSize: '0.9rem', color: '#22d3ee', fontWeight: 600 } }, '✍️ Dictado inverso'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { marginBottom: '12px', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(148,163,184,0.1)' } },
      React.createElement('div', { style: { fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' } }, 'Frase a escribir:'),
      React.createElement('div', { style: { fontSize: '1rem', color: '#fbbf24', fontStyle: 'italic' } }, '"' + props.currentSentence + '"')
    ),
    React.createElement('div', { style: { marginBottom: '8px' } },
      React.createElement('button', {
        onClick: props.repeatPhrase,
        style: glassButton('#06b6d4', { padding: '4px 10px' })
      }, '🔊 Repetir frase')
    ),
    React.createElement('textarea', {
      value: props.userInput,
      onChange: function(e) { props.setUserInput(e.target.value); },
      placeholder: 'Escribe lo que has escuchado...',
      style: {
        width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px',
        background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)',
        color: '#e2e8f0', fontSize: '1rem', resize: 'vertical',
        fontFamily: 'inherit'
      }
    }),
    React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '8px' } },
      React.createElement('button', {
        onClick: props.submitDictado,
        disabled: !props.userInput.trim(),
        style: glassButton('#22c55e', { padding: '6px 16px', opacity: props.userInput.trim() ? 1 : 0.5 })
      }, '✅ Corregir')
    ),
    props.score && React.createElement('div', {
      style: {
        marginTop: '12px', padding: '12px', borderRadius: '8px',
        background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)'
      }
    },
      React.createElement('div', { style: { fontSize: '0.85rem', color: '#4ade80', fontWeight: 600 } },
        'Puntuación: ' + props.score.score + '% (' + props.score.correct + '/' + props.score.total + ' correctas)')
    )
  );
}

function HistoryPanel(props) {
  var history = props.history || [];
  var streak = props.streak || 0;

  if (history.length === 0) {
    return React.createElement('div', {
      style: { padding: '16px', borderRadius: '12px', background: 'rgba(30,41,59,0.6)', textAlign: 'center', color: '#64748b' }
    }, 'Aún no hay historial. ¡Empieza a leer!');
  }

  var last7 = history.slice(0, 7).reverse();
  var maxScore = Math.max(70, Math.max.apply(null, last7.map(function(h) { return h.score || 0; })));
  var avgScore = Math.round(history.reduce(function(s, h) { return s + (h.score || 0); }, 0) / history.length);
  var avgWpm = Math.round(history.reduce(function(s, h) { return s + (h.wpm || 0); }, 0) / history.length);

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(12px)'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('h3', { style: { margin: 0, fontSize: '1.1rem', color: '#f1f5f9', fontWeight: 700 } }, '📈 Historial'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' } },
      React.createElement(StatBox, { label: 'Racha', value: '🔥 ' + streak + ' días', color: '#f97316' }),
      React.createElement(StatBox, { label: 'Media pun.', value: avgScore + '%', color: avgScore >= 80 ? '#4ade80' : '#fbbf24' }),
      React.createElement(StatBox, { label: 'Media ppm', value: avgWpm, color: '#06b6d4' })
    ),
    React.createElement('div', {
      style: { marginBottom: '12px' }
    },
      React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' } }, 'Últimas 7 sesiones:'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px', padding: '4px 0' } },
        last7.map(function(entry, idx) {
          var h = Math.max(10, (entry.score || 0) / maxScore * 70);
          var color = (entry.score || 0) >= 80 ? '#4ade80' : ((entry.score || 0) >= 60 ? '#fbbf24' : '#f87171');
          return React.createElement('div', {
            key: idx,
            style: {
              flex: 1, height: h + 'px', borderRadius: '4px 4px 0 0',
              background: color, opacity: 0.8,
              position: 'relative', minWidth: '20px',
              transition: 'height 0.3s ease'
            },
            title: new Date(entry.timestamp).toLocaleDateString() + ': ' + (entry.score || 0) + '% | ' + (entry.wpm || 0) + ' ppm'
          },
            React.createElement('span', {
              style: {
                position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)',
                fontSize: '0.6rem', color: '#94a3b8', whiteSpace: 'nowrap'
              }
            }, new Date(entry.timestamp).toLocaleDateString().slice(0, 5))
          );
        })
      )
    ),
    React.createElement('div', { style: { maxHeight: '200px', overflowY: 'auto' } },
      history.slice(0, 10).map(function(entry, idx) {
        return React.createElement('div', {
          key: idx,
          style: {
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: '1px solid rgba(148,163,184,0.1)',
            fontSize: '0.8rem', color: '#cbd5e1'
          }
        },
          React.createElement('span', {}, new Date(entry.timestamp).toLocaleDateString() + ' ' + new Date(entry.timestamp).toLocaleTimeString()),
          React.createElement('span', { style: { color: (entry.score || 0) >= 80 ? '#4ade80' : '#fbbf24', fontWeight: 600 } },
            (entry.score || 0) + '% | ' + (entry.wpm || 0) + ' ppm')
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
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(12px)'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('h3', { style: { margin: 0, fontSize: '1.1rem', color: '#f1f5f9', fontWeight: 700 } }, '📚 Biblioteca'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    texts.length === 0
      ? React.createElement('div', { style: { color: '#64748b', textAlign: 'center', padding: '20px' } }, 'No hay textos disponibles.')
      : React.createElement('div', { style: { maxHeight: '300px', overflowY: 'auto' } },
          texts.map(function(t, idx) {
            return React.createElement('div', {
              key: t.id || idx,
              onClick: function() { props.onSelect(t); },
              style: {
                padding: '10px 12px', borderRadius: '8px',
                cursor: 'pointer', marginBottom: '4px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(148,163,184,0.08)',
                transition: 'all 0.2s ease',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              },
              onMouseEnter: function(e) { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; },
              onMouseLeave: function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }
            },
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 } }, t.title || 'Sin título'),
                React.createElement('div', { style: { fontSize: '0.75rem', color: '#64748b', marginTop: '2px' } },
                  t.level || 'N/A' + ' · ' + (t.text ? t.text.split(' ').length + ' palabras' : '0'))
              ),
              t.isCustom && React.createElement('button', {
                onClick: function(e) { e.stopPropagation(); props.onDelete(t.id); },
                style: glassButton('#ef4444', { padding: '2px 6px', fontSize: '0.7rem' })
              }, '🗑️')
            );
          })
        )
  );
}

// ─── SUBCOMPONENTES NUEVOS ───

function MarathonDisplay(props) {
  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(249,115,22,0.08)',
      border: '1px solid rgba(249,115,22,0.3)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
      React.createElement('span', { style: { fontSize: '0.9rem', color: '#fb923c', fontWeight: 600 } }, '🏃 Maratón de lectura'),
      !props.active && React.createElement('div', { style: { display: 'flex', gap: '4px' } },
        React.createElement('button', { onClick: function() { props.onStart(300); }, style: glassButton('#f97316', { padding: '3px 8px', fontSize: '0.7rem' }) }, '5 min'),
        React.createElement('button', { onClick: function() { props.onStart(600); }, style: glassButton('#f97316', { padding: '3px 8px', fontSize: '0.7rem' }) }, '10 min'),
        React.createElement('button', { onClick: function() { props.onStart(900); }, style: glassButton('#f97316', { padding: '3px 8px', fontSize: '0.7rem' }) }, '15 min')
      ),
      props.active && React.createElement('button', {
        onClick: props.onStop,
        style: glassButton('#ef4444', { padding: '3px 8px', fontSize: '0.7rem' })
      }, '⏹ Parar')
    ),
    props.active && React.createElement('div', {},
      React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: '2rem', fontWeight: 700, color: '#fbbf24' } }, formatTime(props.timeLeft)),
        React.createElement('div', { style: { fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' } },
          'Correctas: ' + (props.stats ? props.stats.correct : 0) + ' | ' +
          'PPM: ' + (props.stats ? props.stats.wpm : 0) + ' | ' +
          'Racha: ' + (props.stats ? props.stats.streak : 0))
      )
    )
  );
}

function HeatmapToggle(props) {
  return React.createElement('button', {
    onClick: props.onToggle,
    style: glassButton(props.active ? '#4ade80' : '#64748b', { padding: '4px 10px', fontSize: '0.75rem' })
  }, props.active ? '🔥 Mapa de calor ON' : '🗺️ Mapa de calor OFF');
}

function FallWordsPanel(props) {
  var words = props.words || [];
  if (words.length === 0) return null;

  return React.createElement('div', {
    style: {
      padding: '12px',
      borderRadius: '12px',
      background: 'rgba(248,113,113,0.05)',
      border: '1px solid rgba(248,113,113,0.15)',
      backdropFilter: 'blur(8px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
      React.createElement('span', { style: { fontSize: '0.8rem', color: '#fca5a5', fontWeight: 500 } },
        '📝 Palabras a repasar (' + words.length + ')'),
      React.createElement('button', {
        onClick: props.onClear,
        style: glassButton('#ef4444', { padding: '2px 6px', fontSize: '0.7rem' })
      }, 'Limpiar')
    ),
    React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } },
      words.slice(0, 20).map(function(w, idx) {
        return React.createElement('span', {
          key: idx,
          style: {
            padding: '2px 8px', borderRadius: '12px',
            background: 'rgba(248,113,113,0.15)',
            color: '#fca5a5', fontSize: '0.75rem',
            border: '1px solid rgba(248,113,113,0.2)'
          }
        }, w);
      }),
      words.length > 20 && React.createElement('span', {
        style: { color: '#64748b', fontSize: '0.75rem', padding: '2px 4px' }
      }, '+' + (words.length - 20) + ' más')
    )
  );
}

function ExportImportPanel(props) {
  var fileInputRef = React.useRef(null);

  return React.createElement('div', {
    style: {
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(30,41,59,0.8)',
      border: '1px solid rgba(148,163,184,0.15)',
      backdropFilter: 'blur(12px)',
      marginTop: '8px'
    }
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
      React.createElement('span', { style: { fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600 } }, '💾 Exportar / Importar'),
      React.createElement('button', { onClick: props.onClose, style: glassButton('#475569', { padding: '4px 8px' }) }, '✕')
    ),
    React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
      React.createElement('button', {
        onClick: props.onExport,
        style: glassButton('#06b6d4', { padding: '6px 16px' })
      }, '📤 Exportar estadísticas'),
      React.createElement('button', {
        onClick: function() { if (fileInputRef.current) fileInputRef.current.click(); },
        style: glassButton('#22c55e', { padding: '6px 16px' })
      }, '📥 Importar estadísticas'),
      React.createElement('input', {
        ref: fileInputRef,
        type: 'file',
        accept: '.json',
        style: { display: 'none' },
        onChange: function(e) { if (e.target.files[0]) { props.onImport(e.target.files[0]); e.target.value = ''; } }
      })
    )
  );
}

// ─── COMPONENTE PRINCIPAL ───

window.Muller.LecturaPanel = function(props) {
  var h = window.Muller.LecturaHooks.useLectura({ initialText: props.initialText || '' });

  // Desestructuración plana para mantener compatibilidad
  // Propiedades principales
  var source = h.source;
  var text = h.text;
  var tokens = h.tokens;
  var activeWord = h.activeWord;
  var wordInfo = h.wordInfo;
  var selectedText = h.selectedText;
  var fontSize = h.fontSize;
  var showTranslation = h.showTranslation;

  // Voz
  var isReading = h.isReading;
  var isListening = h.isListening;
  var transcript = h.transcript;
  var interimText = h.interimText;
  var startReading = h.startReading;
  var stopReading = h.stopReading;
  var progress = h.progress;
  var wordStatuses = h.wordStatuses;
  var transcriptionErrors = h.transcriptionErrors;

  // Grabación
  var isRecording = h.isRecording;
  var recordedBlob = h.recordedBlob;
  var recordingsList = h.recordingsList;
  var startRecording = h.startRecording;
  var stopRecording = h.stopRecording;
  var playRecording = h.playRecording;
  var playRecordingFromDataURL = h.playRecordingFromDataURL;
  var deleteRecording = h.deleteRecording;
  var deleteAllRecordings = h.deleteAllRecordings;

  // Puntuación
  var scoreResult = h.scoreResult;
  var showScore = h.showScore;

  // Rondas
  var roundsActive = h.roundsActive;
  var currentRound = h.currentRound;
  var roundScores = h.roundScores;
  var roundTimeLimit = h.roundTimeLimit;
  var roundTimeLeft = h.roundTimeLeft;
  var startRounds = h.startRounds;

  // Maratón
  var marathonActive = h.marathonActive;
  var marathonTimeLeft = h.marathonTimeLeft;
  var marathonStats = h.marathonStats;
  var startMarathon = h.startMarathon;
  var stopMarathon = h.stopMarathon;

  // Karaoke
  var karaokeActive = h.karaokeActive;
  var karaokeCurrentWord = h.karaokeCurrentWord;
  var karaokeWords = h.karaokeWords;
  var startKaraoke = h.startKaraoke;
  var stopKaraoke = h.stopKaraoke;

  // Osciloscopio
  var oscilloscopeActive = h.oscilloscopeActive;
  var analyserRef = h.analyserRef;

  // Dictado
  var dictadoActive = h.dictadoActive;
  var dictadoCurrentSentence = h.dictadoCurrentSentence;
  var dictadoUserInput = h.dictadoUserInput;
  var dictadoScore = h.dictadoScore;
  var startDictado = h.startDictado;
  var repeatDictadoPhrase = h.repeatDictadoPhrase;
  var submitDictado = h.submitDictado;
  var stopDictado = h.stopDictado;

  // Historial
  var history = h.history;
  var showHistory = h.showHistory;
  var streak = h.streak;

  // Biblioteca
  var libraryTexts = h.libraryTexts;
  var showLibrary = h.showLibrary;
  var selectText = h.selectText;
  var pasteText = h.pasteText;
  var pasteTextInput = h.pasteTextInput;
  var deleteCustomText = h.deleteCustomText;

  // Fuente
  var increaseFont = h.increaseFont;
  var decreaseFont = h.decreaseFont;
  var resetFont = h.resetFont;

  // Manejadores de palabra
  var handleWordClick = h.handleWordClick;
  var handleTextSelection = h.handleTextSelection;
  var playSelectedText = h.playSelectedText;
  var clearSelection = h.clearSelection;

  // Sombra
  var shadowActive = h.shadowActive;
  var shadowSync = h.shadowSync;
  var startShadowReading = h.startShadowReading;
  var stopShadowReading = h.stopShadowReading;

  // Offline
  var isOffline = h.isOffline;

  // AI
  var aiAnalyzeReading = h.aiAnalyzeReading;

  // SRS palabras falladas
  var fallWordsList = h.fallWordsList;
  var clearFallWords = h.clearFallWords;

  // Mapa de calor
  var showHeatmap = h.showHeatmap;
  var heatmapTokens = h.heatmapTokens;
  var toggleHeatmap = h.toggleHeatmap;

  // Export/Import
  var showExportImport = h.showExportImport;
  var exportStats = h.exportStats;
  var importStats = h.importStats;

  // Setters
  var setShowScore = h.setShowScore;
  var setShowHistory = h.setShowHistory;
  var setShowLibrary = h.setShowLibrary;
  var setShowTranslation = h.setShowTranslation;
  var setPasteTextInput = h.setPasteTextInput;
  var setDictadoUserInput = h.setDictadoUserInput;
  var setShowExportImport = h.setShowExportImport;

  // ─── ICON HELPER ───
  function iS(n, c, s) {
    var html = window.Muller.LecturaHelpers.icon(n, c || '', s || 16);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  }

  // ─── HANDLER DE ARCHIVO ───
  function handleFileUpload(e) {
    var file = e.target.files[0];
    if (!file) return;
    var name = file.name.toLowerCase();
    if (name.endsWith('.txt')) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        selectText(ev.target.result, 'file');
      };
      reader.readAsText(file);
    } else if (name.endsWith('.pdf')) {
      if (window.Muller.extractPDFText) {
        window.Muller.extractPDFText(file).then(function(pdfText) {
          if (pdfText) selectText(pdfText, 'pdf');
        }).catch(function() {
          if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error PDF', desc: 'No se pudo extraer el texto del PDF.' });
        });
      } else {
        if (window.Muller.Toast) window.Muller.Toast.show({ title: 'PDF no soportado', desc: 'Carga un archivo .txt o instala pdf.js (ya incluido automáticamente).' });
      }
    } else {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Formato no soportado', desc: 'Solo .txt y .pdf.' });
    }
    e.target.value = '';
  }

  // ─── ESTILOS BASE ───
  var containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#e2e8f0',
    position: 'relative'
  };

  var headerStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '16px', flexWrap: 'wrap', gap: '8px'
  };

  var controlRowStyle = {
    display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px'
  };

  var sectionCard = {
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(30,41,59,0.6)',
    border: '1px solid rgba(148,163,184,0.15)',
    backdropFilter: 'blur(8px)',
    marginBottom: '12px'
  };

  var offlineBanner = {
    padding: '8px 12px', borderRadius: '8px', background: 'rgba(251,191,36,0.15)',
    border: '1px solid rgba(251,191,36,0.3)', marginBottom: '12px',
    fontSize: '0.8rem', color: '#fbbf24', textAlign: 'center'
  };

  // ─── RENDER ───
  var children = [];

  // Banner offline
  if (isOffline) {
    children.push(
      React.createElement('div', { key: 'offline', style: offlineBanner }, '📡 Sin conexión — Las funcionalidades que requieren internet (TTS, API) no estarán disponibles')
    );
  }

  // Header: título y atajos
  children.push(
    React.createElement('div', { key: 'header', style: headerStyle },
      React.createElement('h2', { style: { margin: 0, fontSize: '1.3rem', color: '#f1f5f9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' } },
        '📖 Lectura', React.createElement('span', { style: { fontSize: '0.7rem', color: '#64748b', fontWeight: 400 } }, 'Práctica de lectura en alemán')
      ),
      React.createElement('div', { style: { display: 'flex', gap: '4px', fontSize: '0.65rem', color: '#475569' } },
        '⌨️ Espacio=Leer | H=Historial | L=Biblioteca | R=Rondas | K=Karaoke | S=Sombra | D=Dictado | M=Maratón'
      )
    )
  );

  // Botones principales de acción
  var actionButtons = [];

  if (!roundsActive && !karaokeActive && !shadowActive && !dictadoActive && !marathonActive) {
    if (text) {
      actionButtons.push(
        React.createElement('button', {
          key: 'read',
          onClick: isReading ? stopReading : startReading,
          style: glassButton(isReading ? '#ef4444' : '#06b6d4', { padding: '8px 20px', fontSize: '0.9rem', fontWeight: 700 })
        }, isReading ? '⏹ Parar lectura' : '🎤 Empezar lectura')
      );
    }
    actionButtons.push(
      React.createElement('button', {
        key: 'rounds',
        onClick: function() { if (text) startRounds(); },
        disabled: !text || isReading,
        style: glassButton('#8b5cf6', { padding: '6px 12px', opacity: (!text || isReading) ? 0.5 : 1 })
      }, '🏆 Rondas')
    );
    actionButtons.push(
      React.createElement('button', {
        key: 'marathon',
        onClick: function() {}, // botón en MarathonDisplay
        style: glassButton('#f97316', { padding: '6px 12px' })
      }, '🏃 Maratón')
    );
    actionButtons.push(
      React.createElement('button', {
        key: 'karaoke',
        onClick: karaokeActive ? stopKaraoke : (function() { if (text) startKaraoke(); }),
        disabled: !text,
        style: glassButton('#a855f7', { padding: '6px 12px', opacity: (!text) ? 0.5 : 1 })
      }, '🎤 Karaoke')
    );
    actionButtons.push(
      React.createElement('button', {
        key: 'shadow',
        onClick: shadowActive ? stopShadowReading : (function() { if (text) startShadowReading(); }),
        disabled: !text,
        style: glassButton('#06b6d4', { padding: '6px 12px', opacity: (!text) ? 0.5 : 1 })
      }, '🌙 Sombra')
    );
    actionButtons.push(
      React.createElement('button', {
        key: 'dictado',
        onClick: dictadoActive ? stopDictado : (function() { if (text) startDictado(); }),
        disabled: !text,
        style: glassButton('#22d3ee', { padding: '6px 12px', opacity: (!text) ? 0.5 : 1 })
      }, '✍️ Dictado')
    );
  }

  actionButtons.push(
    React.createElement('div', { key: 'spacer', style: { flex: 1 } })
  );
  actionButtons.push(
    React.createElement('button', {
      key: 'heatmap',
      onClick: toggleHeatmap,
      style: glassButton(showHeatmap ? '#4ade80' : '#64748b', { padding: '4px 8px', fontSize: '0.7rem' })
    }, showHeatmap ? '🔥 Calor ON' : '🗺️ Calor')
  );
  actionButtons.push(
    React.createElement('button', {
      key: 'lib',
      onClick: function() { setShowLibrary(!showLibrary); },
      style: glassButton('#8b5cf6', { padding: '4px 8px', fontSize: '0.7rem' })
    }, '📚')
  );
  actionButtons.push(
    React.createElement('button', {
      key: 'hist',
      onClick: function() { setShowHistory(!showHistory); },
      style: glassButton('#06b6d4', { padding: '4px 8px', fontSize: '0.7rem' })
    }, '📈')
  );
  actionButtons.push(
    React.createElement('button', {
      key: 'export',
      onClick: function() { setShowExportImport(!showExportImport); },
      style: glassButton('#22c55e', { padding: '4px 8px', fontSize: '0.7rem' })
    }, '💾')
  );

  children.push(
    React.createElement('div', { key: 'actions', style: Object.assign({}, controlRowStyle, { flexWrap: 'wrap' }) }, actionButtons)
  );

  // Indicador de escucha
  if (isListening) {
    children.push(
      React.createElement('div', {
        key: 'listening',
        style: Object.assign({}, sectionCard, {
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 12px', marginBottom: '8px'
        })
      },
        React.createElement('span', { style: { width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4', animation: 'pulse 1s ease-in-out infinite' } }),
        React.createElement('span', { style: { fontSize: '0.85rem', color: '#22d3ee' } }, 'Escuchando... Habla en alemán'),
        React.createElement('span', { style: { fontSize: '0.75rem', color: '#64748b', marginLeft: 'auto' } }, interimText || '')
      )
    );
  }

  // Progreso en vivo durante la lectura
  if (isReading && (progress.correct > 0 || progress.total > 0)) {
    children.push(
      React.createElement('div', { key: 'progress-live' },
        React.createElement(ProgressBar, { progress: progress })
      )
    );
  }

  // Control de fuente
  children.push(
    React.createElement('div', { key: 'font-controls', style: Object.assign({}, controlRowStyle, { justifyContent: 'flex-end' }) },
      React.createElement('button', { onClick: decreaseFont, style: glassButton('#475569', { padding: '2px 8px', fontSize: '0.7rem' }) }, 'A-'),
      React.createElement('span', { style: { fontSize: '0.75rem', color: '#94a3b8', minWidth: '30px', textAlign: 'center' } }, fontSize),
      React.createElement('button', { onClick: increaseFont, style: glassButton('#475569', { padding: '2px 8px', fontSize: '0.7rem' }) }, 'A+'),
      React.createElement('button', { onClick: resetFont, style: glassButton('#475569', { padding: '2px 8px', fontSize: '0.7rem' }) }, 'R')
    )
  );

  // Texto interactivo
  children.push(
    React.createElement('div', { key: 'text-display', style: { marginBottom: '12px' } },
      React.createElement(TextDisplay, {
        tokens: tokens,
        fontSize: fontSize,
        activeWord: activeWord,
        karaokeActive: karaokeActive,
        karaokeCurrentWord: karaokeCurrentWord,
        karaokeWords: karaokeWords,
        onWordClick: handleWordClick,
        onTextSelect: handleTextSelection,
        wordStatuses: wordStatuses,
        showHeatmap: showHeatmap,
        heatmapTokens: heatmapTokens
      })
    )
  );

  // Selección de texto
  if (selectedText) {
    children.push(
      React.createElement('div', { key: 'selected', style: Object.assign({}, sectionCard, { padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }) },
        React.createElement('span', { style: { fontSize: '0.8rem', color: '#64748b' } }, 'Seleccionado:'),
        React.createElement('span', { style: { fontSize: '0.85rem', color: '#fbbf24', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, selectedText),
        React.createElement('button', { onClick: playSelectedText, style: glassButton('#06b6d4', { padding: '2px 8px', fontSize: '0.7rem' }) }, '🔊'),
        React.createElement('button', { onClick: clearSelection, style: glassButton('#475569', { padding: '2px 8px', fontSize: '0.7rem' }) }, '✕')
      )
    );
  }

  // Panel de traducción
  if (showTranslation && wordInfo) {
    children.push(
      React.createElement('div', { key: 'translation' },
        React.createElement(TranslationPanel, {
          wordInfo: wordInfo,
          onClose: function() { setShowTranslation(false); }
        })
      )
    );
  }

  // Grabación y osciloscopio
  children.push(
    React.createElement('div', { key: 'recording' },
      React.createElement(AudioRecorder, {
        isReading: isReading,
        isRecording: isRecording,
        recordedBlob: recordedBlob,
        recordingsList: recordingsList,
        startRecording: startRecording,
        stopRecording: stopRecording,
        playRecording: playRecording,
        playRecordingFromDataURL: playRecordingFromDataURL,
        deleteRecording: deleteRecording,
        deleteAllRecordings: deleteAllRecordings
      })
    )
  );

  if (oscilloscopeActive) {
    children.push(
      React.createElement('div', { key: 'oscilloscope' },
        React.createElement(Oscilloscope, {
          active: oscilloscopeActive,
          analyserRef: analyserRef
        })
      )
    );
  }

  // Rondas activas
  if (roundsActive) {
    children.push(
      React.createElement('div', { key: 'rounds' },
        React.createElement(RoundsDisplay, {
          currentRound: currentRound,
          roundScores: roundScores,
          roundTimeLimit: roundTimeLimit,
          roundTimeLeft: roundTimeLeft,
          isReading: isReading,
          startReading: startReading,
          stopReading: stopReading
        })
      )
    );
  }

  // Maratón activo
  if (marathonActive || text) {
    children.push(
      React.createElement('div', { key: 'marathon' },
        React.createElement(MarathonDisplay, {
          active: marathonActive,
          timeLeft: marathonTimeLeft,
          stats: marathonStats,
          onStart: startMarathon,
          onStop: stopMarathon
        })
      )
    );
  }

  // Sombra activa
  if (shadowActive) {
    children.push(
      React.createElement('div', { key: 'shadow', style: Object.assign({}, sectionCard, { border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }) },
        React.createElement('div', { style: { fontSize: '0.8rem', color: '#22d3ee', marginBottom: '8px', fontWeight: 500 } }, '🌙 Sombra de lectura activa'),
        React.createElement('div', { style: { height: '4px', borderRadius: '2px', background: 'rgba(148,163,184,0.2)', overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: shadowSync + '%', background: 'linear-gradient(90deg, #06b6d4, #22d3ee)', borderRadius: '2px', transition: 'width 0.2s ease' } })
        ),
        React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b', textAlign: 'right', marginTop: '4px' } }, 'Sincronización: ' + shadowSync + '%'),
        React.createElement('button', {
          onClick: stopShadowReading,
          style: glassButton('#ef4444', { padding: '4px 10px', fontSize: '0.75rem', marginTop: '8px' })
        }, '⏹ Parar sombra')
      )
    );
  }

  // Dictado activo
  if (dictadoActive) {
    children.push(
      React.createElement('div', { key: 'dictado' },
        React.createElement(DictadoPanel, {
          currentSentence: dictadoCurrentSentence,
          userInput: dictadoUserInput,
          setUserInput: setDictadoUserInput,
          score: dictadoScore,
          repeatPhrase: repeatDictadoPhrase,
          submitDictado: submitDictado,
          onClose: stopDictado
        })
      )
    );
  }

  // Score
  if (showScore && scoreResult) {
    children.push(
      React.createElement('div', { key: 'score' },
        React.createElement(ScorePanel, {
          result: scoreResult,
          onClose: function() { setShowScore(false); }
        })
      )
    );
  }

  // Palabras falladas SRS
  if (fallWordsList.length > 0) {
    children.push(
      React.createElement('div', { key: 'fallwords' },
        React.createElement(FallWordsPanel, {
          words: fallWordsList,
          onClear: clearFallWords
        })
      )
    );
  }

  // Historial
  if (showHistory) {
    children.push(
      React.createElement('div', { key: 'history' },
        React.createElement(HistoryPanel, {
          history: history,
          streak: streak,
          onClose: function() { setShowHistory(false); }
        })
      )
    );
  }

  // Biblioteca
  if (showLibrary) {
    children.push(
      React.createElement('div', { key: 'library' },
        React.createElement(LibraryPanel, {
          texts: libraryTexts,
          onSelect: function(t) { selectText(t.text, t.source || 'library'); },
          onDelete: deleteCustomText,
          onClose: function() { setShowLibrary(false); }
        })
      )
    );
  }

  // Export/Import
  if (showExportImport) {
    children.push(
      React.createElement('div', { key: 'exportimport' },
        React.createElement(ExportImportPanel, {
          onExport: exportStats,
          onImport: importStats,
          onClose: function() { setShowExportImport(false); }
        })
      )
    );
  }

  // ─── ÁREA DE PEGAR / SUBIR TEXTO ───
  children.push(
    React.createElement('div', { key: 'input-area', style: Object.assign({}, sectionCard, { marginTop: '16px' }) },
      React.createElement('div', { style: { fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 } }, '📝 Cargar texto'),
      React.createElement('textarea', {
        value: pasteTextInput,
        onChange: function(e) { setPasteTextInput(e.target.value); },
        placeholder: 'Pega aquí tu texto en alemán...',
        rows: 3,
        style: {
          width: '100%', padding: '10px', borderRadius: '8px',
          background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(148,163,184,0.2)',
          color: '#e2e8f0', fontSize: '0.9rem', resize: 'vertical',
          fontFamily: 'inherit', marginBottom: '8px'
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: '8px' } },
        React.createElement('button', {
          onClick: function() { pasteText(); },
          style: glassButton('#06b6d4', { padding: '6px 16px' })
        }, '📋 Pegar texto'),
        React.createElement('label', {
          style: glassButton('#8b5cf6', { padding: '6px 16px', cursor: 'pointer' })
        },
          '📂 Subir archivo',
          React.createElement('input', {
            type: 'file',
            accept: '.txt,.pdf',
            style: { display: 'none' },
            onChange: handleFileUpload
          })
        )
      ),
      React.createElement('div', { style: { fontSize: '0.7rem', color: '#475569', marginTop: '6px' } },
        'Soporta .txt y .pdf. Cuando subes un PDF, se extrae el texto automáticamente si pdf.js está disponible.'
      )
    )
  );

  // AI Analysis
  if (transcript && text && (isReading === false && scoreResult)) {
    var analysis = aiAnalyzeReading(text, transcript);
    if (analysis) {
      children.push(
        React.createElement('div', { key: 'ai', style: Object.assign({}, sectionCard, { marginTop: '8px', border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.05)' }) },
          React.createElement('div', { style: { fontSize: '0.85rem', color: '#c4b5fd', fontWeight: 600, marginBottom: '6px' } }, '🤖 Análisis' + (analysis.deepseekReady ? ' (DeepSeek)' : ' (local)')),
          React.createElement('div', { style: { fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '4px' } }, analysis.message || ''),
          analysis.phoneticTips && analysis.phoneticTips.length > 0 && React.createElement('div', { style: { fontSize: '0.75rem', color: '#fca5a5', marginTop: '4px', padding: '8px', borderRadius: '6px', background: 'rgba(248,113,113,0.1)' } },
            React.createElement('div', { style: { fontWeight: 600, marginBottom: '4px' } }, '📢 Consejos de pronunciación:'),
            analysis.phoneticTips.slice(0, 3).map(function(tip, idx) {
              return React.createElement('div', { key: idx, style: { marginBottom: '2px' } }, '• ' + tip);
            })
          ),
          !analysis.deepseekReady && React.createElement('div', { style: { fontSize: '0.7rem', color: '#64748b', marginTop: '4px', fontStyle: 'italic' } },
            'Conecta DeepSeek API para análisis avanzado de pronunciación.')
        )
      );
    }
  }

  return React.createElement('div', { style: containerStyle }, children);
};

// Registrar como componente global
window.Muller.LecturaPanel = window.Muller.LecturaPanel;