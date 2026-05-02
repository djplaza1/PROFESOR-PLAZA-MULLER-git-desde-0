// src/features/lectura/LecturaPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels.LecturaPanel = ({ db, user, appState }) => {
  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const { Lucide: { Volume2, Mic, Play, Square, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, FileText, Eye, EyeOff } } = window;

  // ---- estados ----
  const [readingSource, setReadingSource] = useState("current_story");
  const [readingScriptId, setReadingScriptId] = useState("__current__");
  const [readingTextInput, setReadingTextInput] = useState("");
  const [readingFontPx, setReadingFontPx] = useState(19);
  const [readingFocusMode, setReadingFocusMode] = useState(false);
  const [readingSelectedWord, setReadingSelectedWord] = useState(null);
  const [readingListening, setReadingListening] = useState(false);
  const [readingTranscript, setReadingTranscript] = useState("");
  const [readingScore, setReadingScore] = useState(null);
  const [readingFeedback, setReadingFeedback] = useState([]);
  const [readingPasteReaderOpen, setReadingPasteReaderOpen] = useState(false);
  const [readingPasteFromPdf] = useState(false); // por ahora sin PDF
  const [wordInfo, setWordInfo] = useState(null);

  const textSurfaceRef = useRef(null);
  const recRef = useRef(null);
  const sessionStartRef = useRef(null);

  // ---- datos externos ----
  const guionData = appState?.guionData || [];
  const savedScripts = appState?.savedScripts || [];

  // Texto objetivo derivado
  const readingTargetText = useMemo(() => {
    if (readingSource === "paste") return String(readingTextInput || "").trim();
    if (readingSource === "current_story") {
      return guionData.map(s => String(s?.text || "").trim()).filter(Boolean).join(" ");
    }
    if (readingSource === "one_saved") {
      const picked = savedScripts.find(s => String(s.id) === String(readingScriptId));
      if (!picked) return "";
      try {
        const rows = JSON.parse(picked.data || "[]");
        return (rows || []).map(s => String(s?.text || "").trim()).filter(Boolean).join(" ");
      } catch (e) { return ""; }
    }
    return "";
  }, [readingSource, readingTextInput, guionData, savedScripts, readingScriptId]);

  const readingWordTokens = useMemo(() => {
    return window.Muller.Lectura?.mullerReadingTokenizeText?.(readingTargetText) || [];
  }, [readingTargetText]);

  const readingProgress = useMemo(() => {
    const norm = window.Muller.Lectura?.normalizeGermanSpeechText;
    const targetWords = norm ? norm(readingTargetText).split(/\s+/).filter(Boolean) : [];
    const spokenWords = norm ? norm(readingTranscript).split(/\s+/).filter(Boolean) : [];
    if (!targetWords.length) return { matched: 0, total: 0, pct: 0 };
    let i = 0;
    while (i < targetWords.length && i < spokenWords.length && targetWords[i] === spokenWords[i]) i++;
    const pct = Math.round((i / targetWords.length) * 100);
    return { matched: i, total: targetWords.length, pct };
  }, [readingTargetText, readingTranscript]);

  const readingScriptOptions = useMemo(() => {
    return savedScripts.map(s => ({ id: String(s.id), title: s.title || "Sin título" }));
  }, [savedScripts]);

  // ---- acciones ----
  const speakWord = useCallback((word) => {
    if (!word || !window.Muller.speakReadingWord) return;
    window.Muller.speakReadingWord(word);
  }, []);

  const speakSentenceWithWord = useCallback((word) => {
    if (!word || !window.Muller.speakReadingSentenceWithWord) return;
    window.Muller.speakReadingSentenceWithWord(word, readingTargetText);
  }, [readingTargetText]);

  const lookupWord = useCallback(async (word) => {
    if (!word) return setWordInfo(null);
    // Usar diccionario local o API simulada
    const clean = word.replace(/^[^a-zA-ZäöüßÄÖÜ0-9]+|[^a-zA-ZäöüßÄÖÜ0-9]+$/g, '').toLowerCase();
    if (!clean) return setWordInfo(null);
    // Por simplicidad, solo mostramos la palabra seleccionada
    setWordInfo({ word: clean, translation: "..." });
    if (window.Muller.runReadingWordLookup) {
      const info = await window.Muller.runReadingWordLookup(clean);
      if (info) setWordInfo(info);
    }
  }, []);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = 'de-DE';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interim += event.results[i][0].transcript;
      }
      setReadingTranscript(prev => {
        const updated = (prev + ' ' + interim).trim();
        // Actualizar feedback en tiempo real
        const norm = window.Muller.Lectura?.normalizeGermanSpeechText;
        if (norm && readingTargetText) {
          const target = norm(readingTargetText).split(/\s+/).filter(Boolean);
          const spoken = norm(updated).split(/\s+/).filter(Boolean);
          const feedback = target.map((tw, idx) => {
            const sw = spoken[idx] || '';
            return { word: tw, spoken: sw, match: tw === sw };
          });
          setReadingFeedback(feedback);
        }
        return updated;
      });
    };
    rec.onerror = (e) => console.error('Speech error', e);
    rec.start();
    recRef.current = rec;
    setReadingListening(true);
  }, [readingTargetText]);

  const stopListening = useCallback(() => {
    if (recRef.current) {
      recRef.current.stop();
      recRef.current = null;
    }
    setReadingListening(false);
  }, []);

  const finalizeSession = useCallback(() => {
    stopListening();
    if (readingTranscript && readingTargetText) {
      const norm = window.Muller.Lectura?.normalizeGermanSpeechText;
      const target = norm(readingTargetText);
      const spoken = norm(readingTranscript);
      // Calcular puntuación simple
      const targetWords = target.split(/\s+/).filter(Boolean);
      const spokenWords = spoken.split(/\s+/).filter(Boolean);
      let matches = 0;
      for (let i = 0; i < Math.min(targetWords.length, spokenWords.length); i++) {
        if (targetWords[i] === spokenWords[i]) matches++;
      }
      const score = targetWords.length ? Math.round((matches / targetWords.length) * 100) : 0;
      setReadingScore(score);
      // Guardar progreso
      // Contadores de lectura y logros
      const sessionMinutes = sessionStartRef.current ? Math.round((Date.now() - sessionStartRef.current) / 60000) : 1;
      const readingSessions = (parseInt(localStorage.getItem('muller_reading_sessions') || '0')) + 1;
      const readingMinutes = (parseInt(localStorage.getItem('muller_reading_minutes') || '0')) + sessionMinutes;
      localStorage.setItem('muller_reading_sessions', readingSessions);
      localStorage.setItem('muller_reading_minutes', readingMinutes);
      // Logros globales
      if (window.Muller.Achievements) {
        if (readingSessions >= 5) window.Muller.Achievements.unlock('reading_5_sessions');
        if (readingMinutes >= 30) window.Muller.Achievements.unlock('reading_30_min');
      }
      if (window.Muller.saveProgress) {
        window.Muller.saveProgress({ readingScore: score, readingTranscript: readingTranscript.substring(0, 200) });
      }
    }
  }, [readingTranscript, readingTargetText, stopListening]);

  const clearTranscript = () => {
    setReadingTranscript("");
    setReadingFeedback([]);
    setReadingScore(null);
  };

  // Sincronizar fontSize con localStorage
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("muller_reading_font_size"));
      if (Number.isFinite(saved)) {
        setReadingFontPx(Math.min(32, Math.max(14, saved)));
      }
    } catch (e) {}
  }, []);
  useEffect(() => {
    localStorage.setItem("muller_reading_font_size", readingFontPx);
  }, [readingFontPx]);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h1 className="text-2xl md:text-4xl font-black text-sky-100 flex items-center gap-2 md:gap-3">
          <Volume2 className="w-8 h-8 md:w-10 md:h-10" /> Lectura en voz alta
        </h1>
      </div>
      <p className="text-sky-50/90 text-sm md:text-base mb-4 leading-relaxed">
        Lee un texto completo y compara tu producción con el original. Toca cualquier palabra para ver traducción y escuchar pronunciación.
      </p>

      {/* Selector de fuente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <label className="text-xs font-bold text-sky-200/90 uppercase tracking-wider">
          Fuente
          <select
            value={readingSource}
            onChange={(e) => {
              setReadingSource(e.target.value);
              if (e.target.value !== 'paste') setReadingPasteReaderOpen(false);
            }}
            className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-sm text-white normal-case"
          >
            <option value="current_story">Historia actual</option>
            <option value="one_saved">Guion guardado</option>
            <option value="paste">Texto pegado</option>
          </select>
        </label>
        {readingSource === 'one_saved' && (
          <label className="text-xs font-bold text-sky-200/90 uppercase tracking-wider md:col-span-2">
            Guion
            <select value={readingScriptId} onChange={(e) => setReadingScriptId(e.target.value)} className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-sm text-white normal-case">
              <option value="__current__" disabled>Selecciona un guion…</option>
              {readingScriptOptions.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </label>
        )}
      </div>

      {/* Área de entrada de texto (paste) */}
      {readingSource === 'paste' && (
        <div className="mb-3 rounded-xl border border-sky-500/30 bg-sky-950/20 p-3 space-y-2">
          <textarea
            value={readingTextInput}
            onChange={(e) => setReadingTextInput(e.target.value)}
            placeholder="Pega o edita tu texto en alemán…"
            className="w-full min-h-[22rem] max-h-[32rem] overflow-y-auto bg-black/40 border border-sky-500/35 rounded-xl p-3 md:p-4 text-sm md:text-[15px] leading-relaxed text-white"
          />
        </div>
      )}

      {/* Controles de visualización */}
      <div className="rounded-xl bg-black/35 border border-sky-500/25 p-3 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <p className="text-[11px] text-sky-200/80">Texto objetivo</p>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-sky-500/35 bg-sky-950/40 px-2 py-1">
            <button onClick={() => setReadingFocusMode(v => !v)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded border ${readingFocusMode ? 'border-emerald-300/70 text-emerald-100 bg-emerald-900/45' : 'border-sky-400/40 text-sky-100 hover:bg-sky-900/60'}`}>
              {readingFocusMode ? <EyeOff className="w-3 h-3 inline mr-1"/> : <Eye className="w-3 h-3 inline mr-1"/>}
              {readingFocusMode ? 'Modo lectura ON' : 'Modo lectura'}
            </button>
            <button onClick={() => setReadingFontPx(v => Math.max(14, v - 1))}
              className="px-2 py-0.5 text-xs font-black rounded bg-sky-900/70 hover:bg-sky-800 text-sky-100" aria-label="Reducir texto">
              <ZoomOut className="w-3 h-3 inline"/> A-
            </button>
            <span className="text-[10px] font-bold text-sky-200 tabular-nums">{readingFontPx}px</span>
            <button onClick={() => setReadingFontPx(v => Math.min(32, v + 1))}
              className="px-2 py-0.5 text-xs font-black rounded bg-sky-900/70 hover:bg-sky-800 text-sky-100" aria-label="Aumentar texto">
              <ZoomIn className="w-3 h-3 inline"/> A+
            </button>
            <button onClick={() => setReadingFontPx(19)}
              className="px-2 py-0.5 text-[10px] font-bold rounded border border-sky-400/50 text-sky-100 hover:bg-sky-900/60">
              <RotateCcw className="w-3 h-3 inline mr-1"/>Reset
            </button>
            <button onClick={() => speakWord(readingSelectedWord)} disabled={!readingSelectedWord}
              className="px-2 py-0.5 text-[10px] font-bold rounded border border-cyan-400/55 text-cyan-100 hover:bg-cyan-900/50 disabled:opacity-40">
              🔊 Palabra
            </button>
            <button onClick={() => speakSentenceWithWord(readingSelectedWord)} disabled={!readingSelectedWord}
              className="px-2 py-0.5 text-[10px] font-bold rounded border border-teal-400/55 text-teal-100 hover:bg-teal-900/50 disabled:opacity-40">
              🔊 Frase
            </button>
          </div>
        </div>

        {/* Texto interactivo */}
        <div
          ref={textSurfaceRef}
          className={`rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-white whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[50vh]`}
          style={{ fontSize: `clamp(16px, 2.5vw, ${readingFontPx}px)` }}
          onClick={(e) => {
            const selection = window.getSelection();
            if (selection && selection.toString()) {
              // Tomar la palabra exacta según offset
              const range = selection.getRangeAt(0);
              if (range.startContainer.nodeType === Node.TEXT_NODE) {
                const textNode = range.startContainer;
                const offset = range.startOffset;
                // Buscar palabra alrededor
                const fullText = textNode.textContent;
                let start = offset, end = offset;
                while (start > 0 && /\S/.test(fullText[start-1])) start--;
                while (end < fullText.length && /\S/.test(fullText[end])) end++;
                const word = fullText.slice(start, end);
                setReadingSelectedWord(word);
                lookupWord(word);
              }
            }
          }}
        >
          {readingTargetText || <span className="text-slate-500 italic">El texto aparecerá aquí. Selecciona una fuente.</span>}
        </div>
      </div>

      {/* Botones de acción de voz */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={readingListening ? stopListening : startListening}
          className={`px-5 py-3 rounded-xl font-black text-white flex items-center gap-2 ${readingListening ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'} transition-colors shadow-lg`}
        >
          {readingListening ? <Square className="w-5 h-5"/> : <Mic className="w-5 h-5"/>}
          {readingListening ? "Detener grabación" : "Iniciar lectura en voz alta"}
        </button>
        <button
          onClick={finalizeSession}
          disabled={!readingTranscript}
          className="px-5 py-3 rounded-xl font-black text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition-colors shadow-lg flex items-center gap-2"
        >
          <Play className="w-5 h-5"/> Finalizar y evaluar
        </button>
        <button
          onClick={clearTranscript}
          disabled={!readingTranscript && !readingScore}
          className="px-5 py-3 rounded-xl font-black text-white bg-slate-600 hover:bg-slate-500 disabled:opacity-50 transition-colors shadow-lg"
        >
          Limpiar
        </button>
      </div>

      {/* Panel de resultados */}
      {(readingListening || readingTranscript || readingScore !== null) && (
        <div className="rounded-xl bg-black/40 border border-amber-500/30 p-4 mb-4 space-y-3">
          <h3 className="text-lg font-black text-amber-200">Resultados de lectura</h3>
          {readingListening && <p className="text-sm text-amber-300 animate-pulse">Escuchando... habla claramente.</p>}
          {readingTranscript && (
            <div className="bg-black/30 rounded-lg p-3 text-white text-sm max-h-32 overflow-y-auto">
              <p className="text-[10px] text-amber-400 uppercase mb-1">Transcripción</p>
              {readingTranscript}
            </div>
          )}
          {readingScore !== null && (
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-amber-300">{readingScore}%</div>
              <div className="text-sm text-amber-100">Precisión: {readingProgress.matched}/{readingProgress.total} palabras</div>
            </div>
          )}
          {readingFeedback.length > 0 && (
            <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto text-sm">
              {readingFeedback.map((fb, idx) => (
                <span key={idx} className={`font-mono ${fb.match ? 'text-emerald-400' : 'text-red-400'}`}>
                  {fb.word} → {fb.spoken || '...'}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Información de palabra seleccionada */}
      {wordInfo && (
        <div className="rounded-xl bg-indigo-950/50 border border-indigo-500/30 p-3 mb-4">
          <h4 className="text-sm font-black text-indigo-200">{wordInfo.word}</h4>
          {wordInfo.translation && <p className="text-sm text-indigo-100 mt-1">{wordInfo.translation}</p>}
          {wordInfo.pos && <p className="text-xs text-indigo-300 mt-1">{wordInfo.pos}</p>}
          <button onClick={() => setWordInfo(null)} className="mt-2 text-[10px] text-indigo-400 hover:text-indigo-200">Cerrar</button>
        </div>
      )}

      {/* Sección PDF estudio (premium placeholder) */}
      <div className="rounded-xl border border-sky-500/30 bg-sky-950/25 p-4 mb-4">
        <h3 className="text-lg font-black text-sky-200 flex items-center gap-2">
          <FileText className="w-5 h-5" /> PDF estudio <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">premium · próximamente</span>
        </h3>
        <p className="text-xs text-sky-300/80 mt-1">
          Sube un PDF y extrae automáticamente el texto para practicar lectura. Funcionalidad avanzada con OCR en desarrollo.
        </p>
      </div>
    </div>
  );
};

