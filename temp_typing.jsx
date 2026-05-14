    case 'typing': {
      const allLines = typingPool.map(item => item.text);
      const currentHighlights = typingPool.length > 0 ? typingPool[0].vocabHighlights : [];
      const currentVocabMap = typingPool.length > 0 ? typingPool[0].vocabMap : new Map();
      const fullText = allLines.join('\n');

      const handleTypingInput = (e) => {
        if (isPaused) return;
        const val = e.target.value;
        setTypingInput(val);
        if (!typingStartMs && val.length > 0) {
          setTypingStartMs(Date.now());
          pausedElapsedRef.current = 0;
        }
        const writtenLines = val.split('\n');
        const newCompleted = [];
        for (let i = 0; i < allLines.length; i++) {
          if (writtenLines[i] && writtenLines[i].trim() === allLines[i].trim()) {
            newCompleted.push(i);
          } else break;
        }
        setCompletedLines(newCompleted);
      };

      const togglePause = () => {
        if (isPaused) {
          setIsPaused(false);
          setTypingStartMs(Date.now());
        } else {
          setIsPaused(true);
          pausedElapsedRef.current += Date.now() - (typingStartMs || Date.now());
          setTypingStartMs(null);
          setTypingDisplayTime(Math.floor(pausedElapsedRef.current / 1000));
        }
      };

      const stopTyping = () => {
        const finalElapsed = (Date.now() - (typingStartMs || Date.now())) + pausedElapsedRef.current;
        setTypingFinished(true);
        const minutes = finalElapsed / 60000;
        const wpm = minutes > 0 ? Math.round(fullText.split(/\s+/).length / minutes) : 0;
        const result = E.analyzeTyping(typingInput, fullText);
        setTypingResult({ ...result, wpm, durationMs: finalElapsed });
        try {
          const key = btoa(fullText).substring(0, 40);
          const prev = JSON.parse(localStorage.getItem('typingSessions') || '{}');
          prev[key] = { wpm, accuracy: result.accuracy, date: Date.now() };
          localStorage.setItem('typingSessions', JSON.stringify(prev));
        } catch (ex) {}
      };

      const nextTypingText = () => {
        setTypingIdx(i => i + 1);
        setTypingInput('');
        setTypingStartMs(null);
        setTypingFinished(false);
        setTypingResult(null);
        setCompletedLines([]);
        setIsPaused(false);
        pausedElapsedRef.current = 0;
        setTypingDisplayTime(0);
      };

      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-cyan-500/30 p-3 flex gap-4' },
        React.createElement('div', { className: 'flex-1 space-y-3' },
          React.createElement('p', { className: 'text-cyan-200/95 text-sm font-black flex gap-2 items-center' },
            SvgIcon(SVG_PEN), ' Mecanograf\u00EDa alemana \u2328'
          ),
          React.createElement('div', { className: 'space-y-2' },
            React.createElement('div', { className: 'flex gap-2' },
              React.createElement('button', {
                onClick: () => setTypingUseCustom(false),
                className: `text-xs px-3 py-1.5 rounded-lg border ${!typingUseCustom ? 'bg-cyan-600 border-cyan-300/60' : 'bg-black/40 border-white/10'}`
              }, 'Textos base'),
              React.createElement('button', {
                onClick: () => setTypingUseCustom(true),
                className: `text-xs px-3 py-1.5 rounded-lg border ${typingUseCustom ? 'bg-cyan-600 border-cyan-300/60' : 'bg-black/40 border-white/10'}`
              }, 'Pegar texto')
            ),
            typingUseCustom && React.createElement('textarea', {
              value: typingCustomText,
              onChange: e => setTypingCustomText(e.target.value),
              placeholder: 'Pega aqu\u00ED tu texto en alem\u00E1n...',
              className: 'w-full min-h-[160px] bg-black/45 border border-white/15 rounded-xl p-3 text-sm text-white'
            })
          ),
          React.createElement('div', {
            ref: viewerRef,
            className: 'rounded-xl border border-cyan-700/30 bg-slate-900/60 p-3 max-h-[3.6em] overflow-y-auto text-lg md:text-xl text-white leading-relaxed'
          },
            allLines.map((line, lineIdx) =>
              React.createElement('div', { key: lineIdx, style: { display: 'flex', flexWrap: 'wrap' } },
                line.split('').map((ch, charIdx) => {
                  const globalIdx = allLines.slice(0, lineIdx).reduce((sum, l) => sum + l.length + 1, 0) + charIdx;
                  let bgColor = 'transparent';
                  let textColor = 'text-gray-400';
                  const isVocab = currentHighlights.some(v => v.start <= charIdx && charIdx < v.end);
                  if (isVocab) bgColor = 'rgba(234, 179, 8, 0.3)';
                  if (globalIdx < typingInput.length) {
                    textColor = typingInput[globalIdx] === ch ? 'text-emerald-400' : 'text-rose-400';
                  }
                  return React.createElement('span', {
                    key: charIdx,
                    className: textColor,
                    style: { backgroundColor: bgColor, display: 'inline' }
                  }, ch);
                })
              )
            )
          ),
          React.createElement('textarea', {
            value: typingInput,
            onChange: handleTypingInput,
            placeholder: 'Escribe aqu\u00ED el texto completo...',
            disabled: typingFinished || isPaused,
            className: 'w-full min-h-[120px] bg-black/45 border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-mono'
          }),
          React.createElement('div', { className: 'flex gap-4 text-xs items-center' },
            React.createElement('span', { className: 'text-cyan-300' }, `WPM: ${typingLiveWpm}`),
            React.createElement('span', { className: 'text-emerald-300' }, `Precisi\u00F3n: ${typingLiveAcc}%`),
            React.createElement('span', { className: 'text-yellow-300' }, `\u23F1 ${typingDisplayTime}s`),
            React.createElement('button', {
              onClick: togglePause,
              className: `px-3 py-1 ${isPaused ? 'bg-green-700 hover:bg-green-600' : 'bg-yellow-700 hover:bg-yellow-600'} rounded-lg text-xs font-bold`
            }, isPaused ? 'Reanudar' : 'Pausa'),
            React.createElement('button', {
              onClick: stopTyping,
              disabled: typingFinished,
              className: 'px-3 py-1 bg-rose-700 hover:bg-rose-600 rounded-lg text-xs font-bold'
            }, 'Parar')
          ),
          typingFinished && typingResult && React.createElement('div', { className: 'rounded-xl bg-emerald-950/40 border border-emerald-700/40 p-3 space-y-2' },
            React.createElement('p', { className: 'text-emerald-300 font-black' }, '\u2713 \u00A1Completado!'),
            React.createElement('div', { className: 'grid grid-cols-3 gap-2 text-xs' },
              React.createElement('div', null, React.createElement('span', { className: 'text-gray-400' }, 'WPM'), React.createElement('p', { className: 'text-white font-bold' }, typingResult.wpm)),
              React.createElement('div', null, React.createElement('span', { className: 'text-gray-400' }, 'Precisi\u00F3n'), React.createElement('p', { className: 'text-white font-bold' }, typingResult.accuracy + '%')),
              React.createElement('div', null, React.createElement('span', { className: 'text-gray-400' }, 'Tiempo'), React.createElement('p', { className: 'text-white font-bold' }, Math.round(typingResult.durationMs / 1000) + 's'))
            ),
            typingResult.errors.length > 0 && React.createElement('div', null,
              React.createElement('p', { className: 'text-[10px] text-amber-400 mb-1' }, 'Errores frecuentes:'),
              React.createElement('div', { className: 'flex flex-wrap gap-1' },
                typingResult.errors.slice(0, 5).map((e, i) =>
                  React.createElement('span', { key: i, className: 'text-[10px] bg-rose-900/60 px-2 py-0.5 rounded' }, `"${e.letter}" x${e.count}`)
                )
              )
            ),
            React.createElement('button', { onClick: nextTypingText, className: 'px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-xl text-sm font-bold' }, 'Reiniciar')
          )
        ),
        currentVocabMap.size > 0 && React.createElement('div', {
          className: 'p-3 rounded-xl bg-black/35 border border-yellow-500/30 w-56 flex-shrink-0 self-start sticky top-4',
          style: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }
        },
          React.createElement('h3', { className: 'text-yellow-200 text-sm font-bold mb-2' }, '\uD83D\uDCDA Vocabulario'),
          React.createElement('ul', { className: 'text-xs space-y-1' },
            Array.from(currentVocabMap.entries()).map(([de, es]) =>
              React.createElement('li', { key: de, className: 'flex justify-between' },
                React.createElement('span', { className: 'text-white font-semibold' }, de),
                React.createElement('span', { className: 'text-gray-400 ml-2' }, es)
              )
            )
          )
        )
      );
    }
