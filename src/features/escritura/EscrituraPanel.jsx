// src/features/escritura/EscrituraPanel.jsx
// ═══════════════════════════════════════════════════
// Panel de escritura con 8 modos (libre, copia, dictado, prompt, TELC, letras, guion, vocab)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

const E = window.Muller.Escritura || {};

const SVG_PEN = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 3-2 6h3l-1 4h3l-2 6"/><path d="M3 21l6-18h5l-1 4H9l-1 4h4l-1 4H7l-1 4H3z"/></svg>';
const SVG_ERASER = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20h8"/><path d="m20.5 11.5-11-11L2 12l11 11 7.5-11.5z"/></svg>';
const SVG_UNDO = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>';
const SVG_SAVE = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';
const SVG_VOLUME = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
const SVG_MAIL = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
const SVG_EYE = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
const SVG_EYE_OFF = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y2="22" y1="2"/></svg>';
const SVG_LEFT = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
const SVG_RIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

// Helper: crear SVG inline
function SvgIcon(html, cls) {
  return React.createElement('span', {
    className: cls || '',
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 },
    dangerouslySetInnerHTML: { __html: html }
  });
}

// ─── DEFINICIÓN DEL PANEL ───
window.Muller.Panels.EscrituraPanel = function EscrituraPanel({ session }) {
  const { useState, useEffect, useRef, useCallback } = React;

  // Leer datos de window.Muller.Escritura
  const WRITING_COPY_DRILLS = E.WRITING_COPY_DRILLS || [];
  const WRITING_PROMPTS_DE = E.WRITING_PROMPTS_DE || [];
  const WRITING_TELC_TASKS = E.WRITING_TELC_TASKS || [];
  const buildDictationPool = E.buildDictationPool || (() => []);
  const buildGuionLines = E.buildGuionLines || (() => []);

  // Intentar obtener appState desde session si existe
  const appState = (session && session.appState) || {};
  const guionData = appState.guionData || [];
  const savedScripts = appState.savedScripts || [];
  const currentVocabList = appState.currentVocabList || [];

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
  const [ocrHistoryList, setOcrHistoryList] = useState([]);
  const [spellErrors, setSpellErrors] = useState([]);
  const [telcCoachResult, setTelcCoachResult] = useState(null);
  // typing / handwrite
  const [typingPool, setTypingPool] = useState([]);
  const [typingIdx, setTypingIdx] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [typingStartMs, setTypingStartMs] = useState(null);
  const [typingLiveWpm, setTypingLiveWpm] = useState(0);
  const [typingLiveAcc, setTypingLiveAcc] = useState(100);
  const [typingFinished, setTypingFinished] = useState(false);
  const [typingResult, setTypingResult] = useState(null);
  const [typingCustomText, setTypingCustomText] = useState('');
  const [typingUseCustom, setTypingUseCustom] = useState(false);
  const [completedLines, setCompletedLines] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [typingDisplayTime, setTypingDisplayTime] = useState(0);

  const [hwPool, setHwPool] = useState([]);
  const [hwIdx, setHwIdx] = useState(0);
  const [hwOcrText, setHwOcrText] = useState('');
  const [hwSimilarity, setHwSimilarity] = useState(null);
  const [hwCustomText, setHwCustomText] = useState('');
  const [hwUseCustom, setHwUseCustom] = useState(false);
  const [hwShowTarget, setHwShowTarget] = useState(true);
  const [hwMemMode, setHwMemMode] = useState(false);
  const [hwMemTimer, setHwMemTimer] = useState(5);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const strokes = useRef([]);
  const currentStroke = useRef([]);
  const penColor = useRef('#ffffff');
  const viewerRef = useRef(null);
  const pausedElapsedRef = useRef(0);

  // Opciones de guiones para dictado
  const writingScriptOptions = savedScripts.map(s => ({
    id: String(s.id),
    title: s.title || 'Sin título',
    count: (() => { try { return JSON.parse(s.data).length } catch(e) { return 0 } })()
  }));

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

  
  // Inicializar typing pool
  useEffect(() => {
    if (writingMode !== 'typing') return;
    const pool = typingUseCustom ? E.buildTypingPool(typingCustomText) : E.buildTypingPool('');
    setTypingPool(pool);
    setTypingIdx(0);
    setTypingInput('');
    setTypingStartMs(null);
    setTypingFinished(false);
    setTypingResult(null);
    setCompletedLines([]);
    setIsPaused(false);
    setTypingDisplayTime(0);
    pausedElapsedRef.current = 0;
  }, [writingMode, typingUseCustom, typingCustomText]);

  // Inicializar handwrite pool
  useEffect(() => {
    if (writingMode !== 'handwrite') return;
    const pool = hwUseCustom ? E.buildHandwritePool(hwCustomText) : E.buildHandwritePool('');
    setHwPool(pool);
    setHwIdx(0);
    setHwOcrText('');
    setHwSimilarity(null);
    setHwShowTarget(true);
    setHwMemMode(false);
  }, [writingMode, hwUseCustom, hwCustomText]);

  // Modo memoria handwrite
  useEffect(() => {
    if (!hwMemMode || writingMode !== 'handwrite') return;
    setHwShowTarget(true);
    setHwMemTimer(5);
    const interval = setInterval(() => {
      setHwMemTimer(t => { if (t <= 1) { setHwShowTarget(false); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [hwIdx, hwMemMode, writingMode]);

  // Live WPM, precisión y temporizador
  useEffect(() => {
    if (writingMode !== 'typing' || !typingStartMs || typingFinished) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - typingStartMs + pausedElapsedRef.current;
      setTypingDisplayTime(Math.floor(elapsed / 1000));
      const minutes = elapsed / 60000;
      const wordsTyped = typingInput.trim().split(/\s+/).length;
      const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
      setTypingLiveWpm(wpm);
      const currentTypingText = (typingPool[typingIdx % typingPool.length] || {}).text || '';
      if (currentTypingText) {
        const targetClean = currentTypingText.replace(/\s+/g, '');
        const inputClean = typingInput.replace(/\s+/g, '');
        let correct = 0;
        for (let i = 0; i < inputClean.length; i++) {
          if (i < targetClean.length && inputClean[i] === targetClean[i]) correct++;
        }
        const acc = inputClean.length > 0 ? Math.round((correct / inputClean.length) * 100) : 100;
        setTypingLiveAcc(acc);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [writingMode, typingStartMs, typingInput, typingFinished, typingPool, typingIdx]);

  // Auto-scroll del visor
  useEffect(() => {
    if (writingMode !== 'typing' || !viewerRef.current) return;
    const lineHeight = 28;
    viewerRef.current.scrollTop = completedLines.length * lineHeight;
  }, [completedLines, writingMode]);

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

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;
    return { x, y };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const pos = getPos(e);
    isDrawing.current = true;
    lastPos.current = pos;
    currentStroke.current = [pos];
    canvasRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    currentStroke.current.push(pos);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = penColor.current;
    ctx.lineWidth = 2;
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const handlePointerUp = (e) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentStroke.current.length > 1) {
      const stroke = currentStroke.current.slice();
      stroke.color = penColor.current;
      stroke.width = 2;
      strokes.current.push(stroke);
    }
    currentStroke.current = [];
    try { canvasRef.current.releasePointerCapture(e.pointerId); } catch(ex) {}
  };

  const undoStroke = () => { strokes.current.pop(); redraw(); };
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
      if (window.Muller.Toast) {
        window.Muller.Toast.show('OCR no disponible. Premium required.', 'warning', 3000);
      } else {
        alert("OCR no disponible.");
      }
    }
  };

  // Acciones de modo TELC
  const telcCoach = async () => {
    const text = writingTelcTypedText || '';
    if (!text.trim()) {
      if (window.Muller.Toast) {
        window.Muller.Toast.show('Escribe texto para corregir.', 'warning', 2000);
      }
      return;
    }
    const task = WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length];
    const coach = window.mullerBuildTelcWritingCoach(text, task, null);
    setTelcCoachResult(coach);
    const apiKey = (window.Muller?.IA?.getApiKey && window.Muller.IA.getApiKey()) || '';
    if (apiKey) {
      const corrected = await E.checkSpellingWithAI(text, apiKey);
      if (corrected) {
        setSpellErrors([{ message: 'Texto corregido por IA:', replacements: [corrected], offset: 0, length: text.length, rule: 'deepseek' }]);
        if (window.Muller.Achievements) window.Muller.Achievements.unlock('first_spell_check');
        return;
      }
    }
    const errors = await E.checkSpelling(text);
    setSpellErrors(errors);
    if (errors.length === 0) {
      setSpellErrors([{ message: 'Sin errores detectados!', replacements: [], offset: 0, length: 0, rule: 'ok' }]);
    }
    if (window.Muller.Achievements) window.Muller.Achievements.unlock('first_spell_check');
  };

  // Render
  return React.createElement('div', {
    className: 'flex-1 flex flex-col p-4 md:p-6 max-w-4xl mx-auto w-full',
    style: { overflowY: 'auto', paddingBottom: 60 }
  },
    // Título
    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
      SvgIcon(SVG_PEN, 'text-rose-300'),
      React.createElement('h1', { className: 'text-2xl md:text-4xl font-black text-rose-100' }, 'Escritura')
    ),
    React.createElement('p', { className: 'text-stone-300/95 text-xs md:text-sm mb-4 leading-relaxed border-b border-white/10 pb-3' },
      'Zona solo para escribir a mano — pensada para ',
      React.createElement('strong', { className: 'text-white' }, 'tableta con lápiz'),
      '. El lienzo usa ',
      React.createElement('strong', { className: 'text-white' }, 'pointer capture'),
      '.',
    ),

    // Selector de modos
    React.createElement('div', { className: 'flex flex-wrap gap-1.5 md:gap-2 mb-4' },
      [
        { id: 'free', label: 'Libre', sub: 'notas / borrador' },
        { id: 'copy', label: 'Copia', sub: 'caligrafía' },
        { id: 'dictation', label: 'Dictado', sub: 'oír y escribir' },
        { id: 'prompt', label: 'Tema', sub: 'redacción' },
        { id: 'telc', label: 'TELC', sub: 'carta/email examen' },
        { id: 'letters', label: 'Letras DE', sub: 'ÄÖÜß' },
        { id: 'guion', label: 'Guion', sub: 'misma historia' },
        { id: 'vocab', label: 'Palabra', sub: 'del vocab' },
        { id: 'typing', label: 'Mecano', sub: 'teclado' },
        { id: 'handwrite', label: 'Manuscrito', sub: 'l\u00E1piz \u00F3ptico' }
      ].map(m =>
        React.createElement('button', {
          key: m.id,
          onClick: () => { setWritingMode(m.id); setWritingDictReveal(false); setWritingCanvasKey(k => k + 1); },
          className: `px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-left border transition ${writingMode === m.id ? 'bg-rose-800/90 border-rose-400/50 text-white shadow-lg' : 'bg-black/40 border-white/10 text-gray-400 hover:border-rose-500/40 hover:text-white'}`
        },
          React.createElement('span', { className: 'block text-[10px] md:text-xs font-black' }, m.label),
          React.createElement('span', { className: 'block text-[9px] text-gray-500 md:text-[10px]' }, m.sub)
        )
      )
    ),

    // Contenido según modo
    renderModeContent(writingMode, {
      WRITING_COPY_DRILLS, WRITING_PROMPTS_DE, WRITING_TELC_TASKS,
      writingCopyIdx, setWritingCopyIdx,
      writingDictSource, setWritingDictSource,
      writingDictScriptId, setWritingDictScriptId,
      writingScriptOptions,
      writingDictIdx, setWritingDictIdx,
      writingDictReveal, setWritingDictReveal,
      writingDictationPool,
      writingPromptIdx, setWritingPromptIdx,
      writingTelcIdx, setWritingTelcIdx,
      writingTelcInputMode, setWritingTelcInputMode,
      writingTelcTypedText, setWritingTelcTypedText,
      telcCoach,
      writingLetterIdx, setWritingLetterIdx,
      DE_LETTERS,
      guionLines, writingGuionWriteIdx, setWritingGuionWriteIdx,
      currentVocabList, writingVocabIdx, setWritingVocabIdx,
      setWritingCanvasKey,
      typingPool, setTypingPool, typingIdx, setTypingIdx, typingInput, setTypingInput,
      typingStartMs, setTypingStartMs, typingLiveWpm, setTypingLiveWpm, typingLiveAcc, setTypingLiveAcc,
      typingFinished, setTypingFinished, typingResult, setTypingResult,
      typingCustomText, setTypingCustomText, typingUseCustom, setTypingUseCustom,
      completedLines, setCompletedLines, isPaused, setIsPaused, typingDisplayTime, setTypingDisplayTime,
      hwPool, setHwPool, hwIdx, setHwIdx, hwOcrText, setHwOcrText, hwSimilarity, setHwSimilarity,
      hwCustomText, setHwCustomText, hwUseCustom, setHwUseCustom,
      hwShowTarget, setHwShowTarget, hwMemMode, setHwMemMode, hwMemTimer, setHwMemTimer,
      viewerRef, pausedElapsedRef
    }),

    // Lienzo de dibujo
    React.createElement('div', {
      className: 'relative border border-rose-500/30 rounded-xl overflow-hidden',
      style: { touchAction: 'none', background: '#0c1222' }
    },
      React.createElement('canvas', {
        ref: canvasRef,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerLeave: handlePointerUp,
        className: 'w-full h-64 md:h-80',
        style: { cursor: 'crosshair', display: 'block' }
      }),
      React.createElement('div', { className: 'absolute top-2 right-2 flex gap-2' },
        React.createElement('button', { onClick: undoStroke, className: 'bg-black/60 hover:bg-black/80 p-1.5 rounded-lg', title: 'Deshacer' },
          React.createElement('span', { dangerouslySetInnerHTML: { __html: SVG_UNDO }, style: { display: 'flex', color: '#fff' } })
        ),
        React.createElement('button', { onClick: clearCanvas, className: 'bg-black/60 hover:bg-black/80 p-1.5 rounded-lg', title: 'Borrar todo' },
          React.createElement('span', { dangerouslySetInnerHTML: { __html: SVG_ERASER }, style: { display: 'flex', color: '#fff' } })
        ),
        React.createElement('button', { onClick: saveCanvasImage, className: 'bg-black/60 hover:bg-black/80 p-1.5 rounded-lg', title: 'Guardar PNG' },
          React.createElement('span', { dangerouslySetInnerHTML: { __html: SVG_SAVE }, style: { display: 'flex', color: '#fff' } })
        )
      )
    ),
    React.createElement('div', { className: 'flex flex-wrap items-center gap-2 mt-2' },
      React.createElement('button', { onClick: triggerOcr, className: 'text-[10px] bg-indigo-700/60 hover:bg-indigo-700/80 px-3 py-1 rounded-lg' }, 'OCR texto'),
      ocrHistoryList.map(h =>
        React.createElement('span', { key: h.at, className: 'text-[9px] text-gray-400' }, `${h.pct}% ${(h.textSnippet||'').slice(0,20)}`)
      )
    ),

    // Corrección ortográfica
    spellErrors.length > 0 && React.createElement('div', { className: 'mt-4 rounded-xl bg-black/35 border border-amber-500/30 p-3' },
      React.createElement('p', { className: 'text-amber-200/90 text-sm font-bold mb-2' }, '📝 Resultados de corrección'),
      spellErrors.map((err, i) =>
        React.createElement('div', { key: i, className: 'text-xs text-gray-300 mb-1 border-b border-white/5 pb-1' },
          err.rule === 'ok'
            ? React.createElement('span', { className: 'text-emerald-400' }, err.message)
            : err.rule === 'deepseek'
              ? React.createElement('div', null,
                  React.createElement('p', { className: 'text-amber-400' }, err.message),
                  React.createElement('p', { className: 'text-white bg-black/30 p-2 rounded-lg mt-1' }, err.replacements[0])
                )
              : React.createElement('div', null,
                  React.createElement('span', { className: 'text-rose-400 font-bold' }, err.shortMessage || err.message),
                  err.context && React.createElement('span', { className: 'text-gray-500 ml-2' }, `en: "${err.context}"`),
                  err.replacements.length > 0 && React.createElement('span', { className: 'text-emerald-400 ml-2' }, `→ ${err.replacements.join(', ')}`)
                )
        )
      )
    ),

    // Coach TELC
    telcCoachResult && React.createElement('div', { className: 'mt-4 rounded-xl bg-black/35 border border-emerald-500/30 p-3 space-y-2' },
      React.createElement('p', { className: 'text-emerald-200/90 text-sm font-bold mb-2' }, '🏆 Coach TELC'),
      React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-2' },
        [
          { label: 'Tarea', score: telcCoachResult.scoreTask },
          { label: 'Registro', score: telcCoachResult.scoreRegister },
          { label: 'Cohesión', score: telcCoachResult.scoreCohesion },
          { label: 'Gramática', score: telcCoachResult.scoreGrammar }
        ].map(item =>
          React.createElement('div', { key: item.label, className: 'bg-slate-900/60 rounded-lg p-2 text-center border border-white/5' },
            React.createElement('p', { className: 'text-[10px] uppercase text-gray-500 font-black' }, item.label),
            React.createElement('p', { className: 'text-lg font-black text-white' },
              item.score,
              React.createElement('span', { className: 'text-[10px] text-gray-500' }, '/5')
            )
          )
        )
      ),
      React.createElement('div', { className: 'flex items-center justify-between px-2' },
        React.createElement('span', { className: 'text-sm text-white font-black' }, `Total: ${telcCoachResult.total}/${telcCoachResult.max}`),
        React.createElement('span', {
          className: `text-sm font-black ${telcCoachResult.pct >= 70 ? 'text-emerald-400' : telcCoachResult.pct >= 40 ? 'text-amber-400' : 'text-rose-400'}`
        }, `${telcCoachResult.pct}%`)
      ),
      telcCoachResult.suggestionText && React.createElement('p', { className: 'text-xs text-stone-300 bg-black/30 rounded-lg p-2' }, telcCoachResult.suggestionText)
    )
  );
};

// Asignar alias minúscula para PanelRouter (busca window.Muller.Panels[tab])
window.Muller.Panels.escritura = window.Muller.Panels.EscrituraPanel;

// ─── Función helper para renderizar el contenido de cada modo ───
function renderModeContent(mode, ctx) {
  const {
    WRITING_COPY_DRILLS, WRITING_PROMPTS_DE, WRITING_TELC_TASKS,
    writingCopyIdx, setWritingCopyIdx,
    writingDictSource, setWritingDictSource,
    writingDictScriptId, setWritingDictScriptId,
    writingScriptOptions,
    writingDictIdx, setWritingDictIdx,
    writingDictReveal, setWritingDictReveal,
    writingDictationPool,
    writingPromptIdx, setWritingPromptIdx,
    writingTelcIdx, setWritingTelcIdx,
    writingTelcInputMode, setWritingTelcInputMode,
    writingTelcTypedText, setWritingTelcTypedText,
    telcCoach,
    writingLetterIdx, setWritingLetterIdx,
    DE_LETTERS,
    guionLines, writingGuionWriteIdx, setWritingGuionWriteIdx,
    currentVocabList, writingVocabIdx, setWritingVocabIdx,
    setWritingCanvasKey
  } = ctx;

  switch (mode) {
    case 'free':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Página en blanco'),
        React.createElement('p', { className: 'text-[11px] text-gray-500' }, 'Escribe libremente. Usa ', React.createElement('strong', { className: 'text-gray-300' }, 'Borrar'), ' o ', React.createElement('strong', { className: 'text-gray-300' }, 'Guardar PNG'), ' debajo.')
      );

    case 'copy':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Copia la frase (caligrafía alemana)'),
        React.createElement('p', { className: 'text-lg md:text-2xl text-white leading-snug' },
          WRITING_COPY_DRILLS.length > 0 ? WRITING_COPY_DRILLS[writingCopyIdx % WRITING_COPY_DRILLS.length] : '(sin datos)'
        ),
        React.createElement('button', {
          onClick: () => { setWritingCopyIdx(i => i+1); setWritingCanvasKey(k => k+1); },
          className: 'text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800'
        }, 'Otra frase →')
      );

    case 'dictation':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-3' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Dictado alemán'),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-2' },
          React.createElement('select', {
            value: writingDictSource,
            onChange: e => { setWritingDictSource(e.target.value); setWritingDictIdx(0); setWritingDictReveal(false); },
            className: 'w-full bg-black/45 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white'
          },
            React.createElement('option', { value: 'builtin' }, 'Base integrada'),
            React.createElement('option', { value: 'current_story' }, 'Historia actual'),
            React.createElement('option', { value: 'all_saved' }, 'Mezcla guiones'),
            React.createElement('option', { value: 'one_saved' }, 'Un guion concreto'),
            React.createElement('option', { value: 'vocab' }, 'Vocabulario')
          ),
          writingDictSource === 'one_saved' && React.createElement('select', {
            value: writingDictScriptId,
            onChange: e => { setWritingDictScriptId(e.target.value); setWritingDictIdx(0); },
            className: 'w-full bg-black/45 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white'
          },
            React.createElement('option', { value: '__current__', disabled: true }, 'Selecciona guion'),
            writingScriptOptions.map(s => React.createElement('option', { key: s.id, value: s.id }, s.title))
          )
        ),
        React.createElement('p', { className: 'text-[10px]' }, `Ítem ${Math.min(writingDictIdx+1, writingDictationPool.length)} de ${writingDictationPool.length}`),
        React.createElement('div', { className: 'flex flex-wrap gap-2' },
          React.createElement('button', {
            onClick: () => {
              const line = writingDictationPool[writingDictIdx % writingDictationPool.length];
              if (line) {
                try {
                  const u = new SpeechSynthesisUtterance(line.de);
                  u.lang = 'de-DE'; u.rate = 0.88;
                  speechSynthesis.speak(u);
                } catch(ex) {}
              }
            },
            className: 'flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 font-bold text-sm'
          },
            SvgIcon(SVG_VOLUME),
            ' Escuchar dictado'
          ),
          React.createElement('button', {
            onClick: () => { setWritingDictIdx(i => (i+1) % writingDictationPool.length); setWritingDictReveal(false); setWritingCanvasKey(k => k+1); },
            className: 'text-xs font-bold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700'
          }, 'Otro dictado'),
          React.createElement('button', {
            onClick: () => setWritingDictReveal(r => !r),
            className: 'text-xs font-bold px-3 py-2 rounded-lg bg-amber-900/60 hover:bg-amber-800/80'
          },
            SvgIcon(writingDictReveal ? SVG_EYE_OFF : SVG_EYE, 'inline mr-1'),
            writingDictReveal ? ' Ocultar' : ' Mostrar',
            ' solución'
          )
        ),
        writingDictReveal && writingDictationPool.length > 0 && React.createElement('div', { className: 'border border-emerald-700/40 rounded-lg p-4 bg-emerald-950/40' },
          React.createElement('p', { className: 'text-white font-semibold text-lg' }, writingDictationPool[writingDictIdx % writingDictationPool.length].de),
          React.createElement('p', { className: 'text-emerald-200/90 text-sm mt-2' }, writingDictationPool[writingDictIdx % writingDictationPool.length].es || '')
        )
      );

    case 'prompt':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Tema para redacción corta'),
        React.createElement('p', { className: 'text-base md:text-lg text-white font-semibold' },
          WRITING_PROMPTS_DE.length > 0 ? WRITING_PROMPTS_DE[writingPromptIdx % WRITING_PROMPTS_DE.length].de : '(sin temas)'
        ),
        WRITING_PROMPTS_DE.length > 0 && React.createElement('p', { className: 'text-xs text-gray-500 italic' },
          WRITING_PROMPTS_DE[writingPromptIdx % WRITING_PROMPTS_DE.length].es
        ),
        React.createElement('button', {
          onClick: () => { setWritingPromptIdx(i => i+1); setWritingCanvasKey(k => k+1); },
          className: 'text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800'
        }, 'Otro tema')
      );

    case 'telc':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-orange-500/30 p-3 space-y-3' },
        React.createElement('p', { className: 'text-orange-200/95 text-sm font-black flex gap-2 items-center' },
          SvgIcon(SVG_MAIL), ' TELC Schreiben a mano'
        ),
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', {
            onClick: () => setWritingTelcInputMode('pen'),
            className: `text-xs px-3 py-1.5 rounded-lg border ${writingTelcInputMode === 'pen' ? 'bg-orange-600 border-orange-300/60' : 'bg-black/40 border-white/10'}`
          }, '✍ Lápiz'),
          React.createElement('button', {
            onClick: () => setWritingTelcInputMode('keyboard'),
            className: `text-xs px-3 py-1.5 rounded-lg border ${writingTelcInputMode === 'keyboard' ? 'bg-orange-600 border-orange-300/60' : 'bg-black/40 border-white/10'}`
          }, '⌨ Teclado')
        ),
        writingTelcInputMode === 'keyboard' && React.createElement('textarea', {
          value: writingTelcTypedText,
          onChange: e => setWritingTelcTypedText(e.target.value),
          placeholder: 'Escribe tu carta/email TELC...',
          className: 'w-full min-h-[140px] bg-black/45 border border-white/15 rounded-xl p-3 text-sm text-white'
        }),
        React.createElement('p', { className: 'text-[10px] text-rose-200' },
          `Tarea ${writingTelcIdx+1} de ${WRITING_TELC_TASKS.length}`
        ),
        WRITING_TELC_TASKS.length > 0 && React.createElement('div', { className: 'rounded-xl border border-white/10 bg-slate-900/60 p-3 space-y-2' },
          React.createElement('p', { className: 'text-[11px] font-black uppercase text-rose-300' },
            WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].title
          ),
          React.createElement('p', { className: 'text-sm text-white' },
            WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].promptDe || ''
          ),
          React.createElement('ul', { className: 'text-[11px] text-emerald-100/90 space-y-1' },
            (WRITING_TELC_TASKS[writingTelcIdx % WRITING_TELC_TASKS.length].checklist || []).map((item, i) =>
              React.createElement('li', { key: i }, `• ${item}`)
            )
          )
        ),
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', { onClick: telcCoach, className: 'px-4 py-2 bg-orange-700 hover:bg-orange-600 rounded-xl text-sm font-bold' },
            'Evaluar texto TELC'
          ),
          React.createElement('button', {
            onClick: () => { setWritingTelcIdx(i => i+1); setWritingCanvasKey(k => k+1); setWritingTelcTypedText(''); },
            className: 'text-xs px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg'
          }, 'Siguiente tarea')
        )
      );

    case 'letters':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Practica letras alemanas'),
        React.createElement('div', { className: 'flex gap-2' },
          DE_LETTERS.map((l, i) =>
            React.createElement('button', {
              key: l,
              onClick: () => setWritingLetterIdx(i),
              className: `text-2xl font-black p-2 rounded-xl ${writingLetterIdx === i ? 'bg-rose-800 text-white' : 'bg-black/40 text-gray-400'}`
            }, l)
          )
        ),
        React.createElement('p', { className: 'text-3xl text-white font-black' }, DE_LETTERS[writingLetterIdx])
      );

    case 'guion':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Escribe líneas de la historia'),
        guionLines.length > 0
          ? React.createElement('p', { className: 'text-lg md:text-xl text-white leading-relaxed border-l-4 border-rose-500 pl-3' },
              guionLines[writingGuionWriteIdx % guionLines.length]
            )
          : React.createElement('p', { className: 'text-gray-500' }, 'No hay historia actual. Ve al panel Historia primero.'),
        React.createElement('button', {
          onClick: () => { setWritingGuionWriteIdx(i => i+1); setWritingCanvasKey(k => k+1); },
          className: 'text-xs px-3 py-1.5 bg-rose-900/80 hover:bg-rose-800 rounded-lg'
        }, 'Siguiente frase')
      );

    case 'vocab':
      return React.createElement('div', { className: 'mb-4 rounded-xl bg-black/35 border border-rose-500/25 p-3 space-y-2' },
        React.createElement('p', { className: 'text-rose-200/90 text-sm font-bold' }, 'Palabra del vocabulario'),
        currentVocabList.length > 0
          ? React.createElement('p', { className: 'text-xl text-white font-semibold' },
              (currentVocabList[writingVocabIdx % currentVocabList.length]?.de || '')
            )
          : React.createElement('p', { className: 'text-gray-500' }, 'No hay lista de vocabulario activa.'),
        React.createElement('button', {
          onClick: () => { setWritingVocabIdx(i => i+1); setWritingCanvasKey(k => k+1); },
          className: 'text-xs px-3 py-1.5 bg-rose-900/80 hover:bg-rose-800 rounded-lg'
        }, 'Siguiente palabra')
      );

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


    default:
      return null;
  }
}