    case 'handwrite': {
      const currentHwText = hwPool[hwIdx % hwPool.length]?.de || '';
      const verifyHandwrite = async () => {
        if (!window.Muller.runOcrOnCanvas) { return; }
        const result = await window.Muller.runOcrOnCanvas(canvasRef.current);
        if (result && result.text) {
          setHwOcrText(result.text);
          setHwSimilarity(E.calcOcrSimilarity(result.text, currentHwText));
        }
      };
      const nextHwText = () => {
        setHwIdx(i => i + 1);
        setHwOcrText('');
        setHwSimilarity(null);
        setWritingCanvasKey(k => k + 1);
        if (hwMemMode) { setHwShowTarget(false); setHwMemTimer(5); } else { setHwShowTarget(true); }
      };
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-violet-500/30 p-3 space-y-3' },
        React.createElement('p', { className: 'text-violet-200/95 text-sm font-black flex gap-2 items-center' },
          SvgIcon(SVG_PEN), ' Manuscrito guiado \u270D'
        ),
        React.createElement('div', { className: 'space-y-2' },
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('button', {
              onClick: () => setHwUseCustom(false),
              className: `text-xs px-3 py-1.5 rounded-lg border ${!hwUseCustom ? 'bg-violet-600 border-violet-300/60' : 'bg-black/40 border-white/10'}`
            }, 'Textos base'),
            React.createElement('button', {
              onClick: () => setHwUseCustom(true),
              className: `text-xs px-3 py-1.5 rounded-lg border ${hwUseCustom ? 'bg-violet-600 border-violet-300/60' : 'bg-black/40 border-white/10'}`
            }, 'Pegar texto')
          ),
          hwUseCustom && React.createElement('textarea', {
            value: hwCustomText,
            onChange: e => setHwCustomText(e.target.value),
            placeholder: 'Pega aqu\u00ED el texto a copiar...',
            className: 'w-full min-h-[140px] bg-black/45 border border-white/15 rounded-xl p-3 text-sm text-white'
          })
        ),
        hwShowTarget && React.createElement('div', {
          className: 'rounded-xl border border-violet-700/30 bg-slate-900/60 p-3 max-h-40 overflow-y-auto text-lg md:text-xl text-white leading-relaxed'
        }, currentHwText),
        React.createElement('div', { className: 'flex gap-2 items-center' },
          React.createElement('label', { className: 'text-xs flex gap-1 items-center' },
            React.createElement('input', { type: 'checkbox', checked: hwMemMode, onChange: e => setHwMemMode(e.target.checked) }),
            ' Modo memoria (oculta texto)'
          ),
          hwMemMode && !hwShowTarget && React.createElement('span', { className: 'text-[10px] text-amber-400' }, 'Texto oculto. \u00A1Escribe de memoria!')
        ),
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', { onClick: verifyHandwrite, className: 'px-4 py-2 bg-violet-700 hover:bg-violet-600 rounded-xl text-sm font-bold' }, 'Verificar con OCR'),
          React.createElement('button', { onClick: nextHwText, className: 'text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg' }, 'Siguiente frase')
        ),
        hwSimilarity !== null && React.createElement('div', { className: 'rounded-xl bg-black/40 border border-violet-700/40 p-3 space-y-2' },
          React.createElement('p', { className: 'text-violet-200 text-sm font-bold' }, `Similitud: ${hwSimilarity}%`),
          React.createElement('p', { className: 'text-[10px] text-gray-400' }, 'OCR: ', React.createElement('span', { className: 'text-white' }, hwOcrText || '(vac\u00EDo)'))
        )
      );
    }
