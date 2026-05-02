// src/features/escritura/EscrituraPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

const { WRITING_COPY_DRILLS, WRITING_PROMPTS_DE, WRITING_TELC_TASKS, buildDictationPool, buildGuionLines } = window.Muller.Escritura || {};

window.Muller.Panels.EscrituraPanel = ({ db, user, appState }) => {
  const { useState, useEffect, useRef, useCallback } = React;
  const { Lucide: { PenLine, Eraser, Undo2, Save, Grid, Volume2, Mail, ChevronLeft, ChevronRight, Eye, EyeOff } } = window;
  const guionData = appState?.guionData || [];
  const savedScripts = appState?.savedScripts || [];
  const currentVocabList = appState?.currentVocabList || [];

  // ---- estados ----
  const [writingMode, setWritingMode] = useState('free');
  const [writingCanvasKey, setWritingCanvasKey] = useState(0);
  const [writingDictReveal, setWritingDictReveal] = useState(false);
  const [writingCopyIdx, setWritingCopyIdx] = useState(0);
  const [writingDictSource, setWritingDictSource] = useState('builtin');
  const [writingDictScriptId, setWritingDictScriptId] = useState("__current__");
  const [writingDictIdx, setWritingDictIdx] = useState(0);
  const [writingPromptIdx, setWritingPromptIdx] = useState(0);
  const [writingTelcIdx, setWritingTelcIdx] = useState(0);
  const [writingTelcInputMode, setWritingTelcInputMode] = useState('pen');
  const [writingTelcTypedText, setWritingTelcTypedText] = useState('');
  const [writingLetterIdx, setWritingLetterIdx] = useState(0);
  const [writingGuionWriteIdx, setWritingGuionWriteIdx] = useState(0);
  const [writingVocabIdx, setWritingVocabIdx] = useState(0);
  const [writingCanvasSnapshot, setWritingCanvasSnapshot] = useState(null);
  const [ocrHistoryList, setOcrHistoryList] = useState([]);
  const [spellErrors, setSpellErrors] = useState([]);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const strokes = useRef([]);
  const currentStroke = useRef([]);
  const penColor = useRef('#ffffff');
  const eraserWidth = useRef(20);

  // Opciones de guiones
  const writingScriptOptions = savedScripts.map(s => ({ id: String(s.id), title: s.title || 'Sin título', count: (() => { try { return JSON.parse(s.data).length } catch(e) { return 0 } })() }));

  // Pool de dictado
  const writingDictationPool = buildDictationPool(writingDictSource, guionData, savedScripts, writingDictScriptId, currentVocabList);

  // Líneas del guion para modo guion
  const guionLines = buildGuionLines(guionData);

  // Letras especiales DE
  const DE_LETTERS = ['Ä','Ö','Ü','ß'];

  // ---------- Canvas Drawing ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redraw();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [writingCanvasKey]);

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.current.forEach(s => {
      if (s.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = s.color || '#fff';
      ctx.lineWidth = s.width || 2;
      ctx.moveTo(s[0].x, s[0].y);
      for (let i=1; i<s.length; i++) ctx.lineTo(s[i].x, s[i].y);
      ctx.stroke();
    });
  };

  const handlePointerDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    isDrawing.current = true;
    lastPos.current = {x,y};
    currentStroke.current = [{x,y}];
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentStroke.current.push({x,y});
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = penColor.current;
    ctx.lineWidth = 2;
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPos.current = {x,y};
  };

  const handlePointerUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentStroke.current.length > 1) {
      strokes.current.push({ ...currentStroke.current, color: penColor.current, width: 2 });
    }
    currentStroke.current = [];
  };

  const undoStroke = () => strokes.current.pop() && redraw();
  const clearCanvas = () => { strokes.current = []; redraw(); };
  const saveCanvasImage = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'escritura.png';
    a.click();
  };
  const triggerOcr = () => {
    if (window.Muller.runOcrOnCanvas) {
      window.Muller.runOcrOnCanvas(canvasRef.current).then(result => {
        if (result) setOcrHistoryList(prev => [result, ...prev].slice(0, 5));
      });
    } else {
      alert("OCR no disponible. Subscribirse a premium para desbloquear.");
    }
  };

  // Acciones de modo TELC – correcciÃ³n ortogrÃ¡fica real
    const telcCoach = async () => {
      const text = writingTelcTypedText || '';
      if (!text.trim()) { alert('Escribe texto para corregir.'); return; }
      const apiKey = (window.Muller?.IA?.getApiKey && window.Muller.IA.getApiKey()) || '';
      if (apiKey) {
        const corrected = await window.Muller.Escritura.checkSpellingWithAI(text, apiKey);
        if (corrected) {
          setSpellErrors([{ message: 'Texto corregido por IA:', replacements: [corrected], offset: 0, length: text.length, rule: 'deepseek' }]);
          window.Muller.Achievements.unlock('first_spell_check');
          return;
        }
      }
      const errors = await window.Muller.Escritura.checkSpelling(text);
      setSpellErrors(errors);
      if (errors.length === 0) {
        setSpellErrors([{ message: 'Â¡Sin errores detectados!', replacements: [], offset: 0, length: 0, rule: 'ok' }]);
      }
      window.Muller.Achievements.unlock('first_spell_check');
    };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h1 className="text-2xl md:text-4xl font-black text-rose-100 flex items-center gap-2">
          <PenLine className="w-8 h-8 md:w-10 md:h-10" /> Escritura
        </h1>
      </div>
      <p className="text-stone-300/95 text-xs md:text-sm mb-4 leading-relaxed border-b border-white/10 pb-3">
        Zona solo para escribir a mano — pensada para <strong className="text-white">tableta con lápiz</strong>. El lienzo usa <strong className="text-white">pointer capture</strong>. Encima del lienzo tienes <strong className="text-white">goma</strong>, <strong className="text-white">deshacer</strong> y <strong className="text-white">guardar PNG</strong>.
      </p>

      {/* Selector de modos */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
        {[
          { id: 'free', label: 'Libre', sub: 'notas / borrador' },
          { id: 'copy', label: 'Copia', sub: 'caligrafía' },
          { id: 'dictation', label: 'Dictado', sub: 'oír y escribir' },
          { id: 'prompt', label: 'Tema', sub: 'redacción' },
          { id: 'telc', label: 'TELC', sub: 'carta/email examen' },
          { id: 'letters', label: 'Letras DE', sub: 'ÄÖÜß' },
          { id: 'guion', label: 'Guion', sub: 'misma historia' },
          { id: 'vocab', label: 'Palabra', sub: 'del vocab' }
        ].map(m => (
          <button key={m.id} onClick={() => { setWritingMode(m.id); setWritingDictReveal(false); setWritingCanvasKey(k => k + 1); }}
            className={`px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-left border transition ${writingMode === m.id ? 'bg-rose-800/90 border-rose-400/50 text-white shadow-lg' : 'bg-black/40 border-white/10 text-gray-400 hover:border-rose-500/40 hover:text-white'}`}>
            <span className="block text-[10px] md:text-xs font-black">{m.label}</span>
            <span className="block text-[9px] text-gray-500 md:text-[10px]">{m.sub}</span>
          </button>
        ))}
      </div>

      {/* Contenido según modo */}
      {writingMode === 'free' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3">
          <p className="text-rose-200/90 text-sm font-bold">Página en blanco</p>
          <p className="text-[11px] text-gray-500">Escribe libremente. Usa <strong className="text-gray-300">Borrar</strong> o <strong className="text-gray-300">Guardar PNG</strong> debajo.</p>
        </div>
      )}

      {writingMode === 'copy' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2">
          <p className="text-rose-200/90 text-sm font-bold">Copia la frase (caligrafía alemana)</p>
          <p className="text-lg md:text-2xl text-white leading-snug">{WRITING_COPY_DRILLS[writingCopyIdx % WRITING_COPY_DRILLS.length]}</p>
          <button onClick={() => { setWritingCopyIdx(i => i+1); setWritingCanvasKey(k => k+1); }} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800">Otra frase →</button>
        </div>
      )}

      {writingMode === 'dictation' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-3">
          <p className="text-rose-200/90 text-sm font-bold">Dictado alemán</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <select value={writingDictSource} onChange={e => { setWritingDictSource(e.target.value); setWritingDictIdx(0); setWritingDictReveal(false); }}
              className="w-full bg-black/45 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white">
              <option value="builtin">Base integrada</option>
              <option value="current_story">Historia actual</option>
              <option value="all_saved">Mezcla guiones</option>
              <option value="one_saved">Un guion concreto</option>
            </select>
            {writingDictSource === 'one_saved' && (
              <select value={writingDictScriptId} onChange={e => { setWritingDictScriptId(e.target.value); setWritingDictIdx(0); }}
                className="w-full bg-black/45 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white">
                <option value="__current__" disabled>Selecciona guion</option>
                {writingScriptOptions.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            )}
          </div>
          <p className="text-[10px]">Ítem {Math.min(writingDictIdx+1, writingDictationPool.length)} de {writingDictationPool.length}</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => {
              const line = writingDictationPool[writingDictIdx % writingDictationPool.length];
              const u = new SpeechSynthesisUtterance(line.de);
              u.lang = 'de-DE'; u.rate = 0.88;
              speechSynthesis.speak(u);
            }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 font-bold text-sm">
              <Volume2 className="w-4 h-4"/> Escuchar dictado
            </button>
            <button onClick={() => { setWritingDictIdx(i => (i+1) % writingDictationPool.length); setWritingDictReveal(false); setWritingCanvasKey(k => k+1); }}
              className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">Otro dictado</button>
            <button onClick={() => setWritingDictReveal(r => !r)} className="text-xs font-bold px-3 py-2 rounded-lg bg-amber-900/60 hover:bg-amber-800/80">
              {writingDictReveal ? <EyeOff className="w-3 h-3 inline mr-1"/> : <Eye className="w-3 h-3 inline mr-1"/>}
              {writingDictReveal ? 'Ocultar' : 'Mostrar'} solución
            </button>
          </div>
          {writingDictReveal && writingDictationPool.length > 0 && (
            <div className="border border-emerald-700/40 rounded-lg p-4 bg-emerald-950/40">
              <p className="text-white font-semibold text-lg">{writingDictationPool[writingDictIdx % writingDictationPool.length].de}</p>
              <p className="text-emerald-200/90 text-sm mt-2">{writingDictationPool[writingDictIdx % writingDictationPool.length].es}</p>
            </div>
          )}
        </div>
      )}

      {writingMode === 'prompt' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2">
          <p className="text-rose-200/90 text-sm font-bold">Tema para redacción corta</p>
          <p className="text-base md:text-lg text-white font-semibold">{WRITING_PROMPTS_DE[writingPromptIdx % WRITING_PROMPTS_DE.length].de}</p>
          <p className="text-xs text-gray-500 italic">{WRITING_PROMPTS_DE[writingPromptIdx % WRITING_PROMPTS_DE.length].es}</p>
          <button onClick={() => { setWritingPromptIdx(i => i+1); setWritingCanvasKey(k => k+1); }} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-900/80">Otro tema</button>
        </div>
      )}

      {writingMode === 'telc' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-orange-500/30 p-3 space-y-3">
          <p className="text-orange-200/95 text-sm font-black flex gap-2"><Mail className="w-4 h-4"/> TELC Schreiben a mano</p>
          <div className="flex gap-2">
            <button onClick={() => setWritingTelcInputMode('pen')} className={`text-xs px-3 py-1.5 rounded-lg border ${writingTelcInputMode === 'pen' ? 'bg-orange-600 border-orange-300/60' : 'bg-black/40 border-white/10'}`}>✍ Lápiz</button>
            <button onClick={() => setWritingTelcInputMode('keyboard')} className={`text-xs px-3 py-1.5 rounded-lg border ${writingTelcInputMode === 'keyboard' ? 'bg-orange-600 border-orange-300/60' : 'bg-black/40 border-white/10'}`}>⌨ Teclado</button>
          </div>
          {writingTelcInputMode === 'keyboard' && (
            <textarea value={writingTelcTypedText} onChange={e => setWritingTelcTypedText(e.target.value)}
              placeholder="Escribe tu carta/email TELC..."
              className="w-full min-h-[140px] bg-black/45 border border-white/15 rounded-xl p-3 text-sm text-white" />
          )}
          <p className="text-[10px] text-rose-200">Tarea {writingTelcIdx+1} de {WRITING_TELC_TASKS.length}</p>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3 space-y-2">
            <p className="text-[11px] font-black uppercase text-rose-300">{WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].title}</p>
            <p className="text-sm text-white">{WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].promptDe}</p>
            <ul className="text-[11px] text-emerald-100/90 space-y-1">
              {(WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].checklist || []).map((item,i) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
          <button onClick={telcCoach} className="px-4 py-2 bg-orange-700 hover:bg-orange-600 rounded-xl text-sm font-bold">Evaluar texto TELC</button>
          <button onClick={() => { setWritingTelcIdx(i => i+1); setWritingCanvasKey(k => k+1); setWritingTelcTypedText(''); }} className="text-xs px-3 py-2 bg-slate-800 rounded-lg">Siguiente tarea</button>
        </div>
      )}

      {writingMode === 'letters' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2">
          <p className="text-rose-200/90 text-sm font-bold">Practica letras alemanas</p>
          <div className="flex gap-2">
            {DE_LETTERS.map((l,i) => (
              <button key={l} onClick={() => setWritingLetterIdx(i)} className={`text-2xl font-black p-2 rounded-xl ${writingLetterIdx === i ? 'bg-rose-800 text-white' : 'bg-black/40 text-gray-400'}`}>{l}</button>
            ))}
          </div>
          <p className="text-3xl text-white font-black">{DE_LETTERS[writingLetterIdx]}</p>
        </div>
      )}

      {writingMode === 'guion' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2">
          <p className="text-rose-200/90 text-sm font-bold">Escribe líneas de la historia</p>
          {guionLines.length > 0 ? (
            <p className="text-lg md:text-xl text-white leading-relaxed border-l-4 border-rose-500 pl-3">{guionLines[writingGuionWriteIdx % guionLines.length]}</p>
          ) : <p className="text-gray-500">No hay historia actual. Ve al panel Historia primero.</p>}
          <button onClick={() => { setWritingGuionWriteIdx(i => i+1); setWritingCanvasKey(k => k+1); }} className="text-xs px-3 py-1.5 bg-rose-900/80 rounded-lg">Siguiente frase</button>
        </div>
      )}

      {writingMode === 'vocab' && (
        <div className="mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2">
          <p className="text-rose-200/90 text-sm font-bold">Palabra del vocabulario</p>
          {currentVocabList.length > 0 ? (
            <p className="text-xl text-white font-semibold">{currentVocabList[writingVocabIdx % currentVocabList.length]?.de || ''}</p>
          ) : <p className="text-gray-500">No hay lista de vocabulario activa.</p>}
          <button onClick={() => { setWritingVocabIdx(i => i+1); setWritingCanvasKey(k => k+1); }} className="text-xs px-3 py-1.5 bg-rose-900/80 rounded-lg">Siguiente palabra</button>
        </div>
      )}

      {/* Lienzo de dibujo */}
      <div className="relative bg-gray-950 border border-rose-500/30 rounded-xl overflow-hidden" style={{ touchAction: 'none' }}>
        <canvas ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-64 md:h-80 bg-gray-900"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={undoStroke} className="bg-black/60 p-1.5 rounded-lg" title="Deshacer"><Undo2 className="w-4 h-4 text-white"/></button>
          <button onClick={clearCanvas} className="bg-black/60 p-1.5 rounded-lg" title="Borrar todo"><Eraser className="w-4 h-4 text-white"/></button>
          <button onClick={saveCanvasImage} className="bg-black/60 p-1.5 rounded-lg" title="Guardar PNG"><Save className="w-4 h-4 text-white"/></button>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button onClick={triggerOcr} className="text-[10px] bg-indigo-700/60 px-3 py-1 rounded-lg">OCR texto</button>
        {ocrHistoryList.map(h => (
          <div key={h.at} className="text-[9px] text-gray-400 ml-2">{h.pct}% {h.textSnippet?.slice(0,20)}</div>
        ))}
      </div>
      {/* ─── Corrección ortográfica ─── */}
      {spellErrors.length > 0 && (
        <div className="mt-4 rounded-xl bg-black/35 border border-amber-500/30 p-3">
          <p className="text-amber-200/90 text-sm font-bold mb-2">📝 Resultados de corrección</p>
          {spellErrors.map((err, i) => (
            <div key={i} className="text-xs text-gray-300 mb-1 border-b border-white/5 pb-1">
              {err.rule === 'ok' ? (
                <span className="text-emerald-400">{err.message}</span>
              ) : err.rule === 'deepseek' ? (
                <div>
                  <p className="text-amber-400">{err.message}</p>
                  <p className="text-white bg-black/30 p-2 rounded-lg mt-1">{err.replacements[0]}</p>
                </div>
              ) : (
                <div>
                  <span className="text-rose-400 font-bold">{err.shortMessage || err.message}</span>
                  {err.context && <span className="text-gray-500 ml-2">en: "{err.context}"</span>}
                  {err.replacements.length > 0 && (
                    <span className="text-emerald-400 ml-2">→ {err.replacements.join(', ')}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};






