// ═══════════════════════════════════════════════════
// PDF STUDY – Panel de estudio de PDFs
// PDF.js real + OCR Tesseract + vocabulario + notas
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels.pdfstudy = function PdfstudyPanel({ session }) {
  const PS = window.Muller.PdfStudy;
  const [showLibrary, setShowLibrary] = React.useState(true);
  const [library, setLibrary] = React.useState(PS ? PS.getLibrary() : []);
  const [pdfEntry, setPdfEntry] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageText, setPageText] = React.useState("");
  const [fullText, setFullText] = React.useState("");
  const [notes, setNotes] = React.useState({ typed: "", drawing: "" });
  const [vocab, setVocab] = React.useState([]);
  const [showVocab, setShowVocab] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);
  const [summaryText, setSummaryText] = React.useState("");
  const [summaryLoading, setSummaryLoading] = React.useState(false);
  const [ocrProgress, setOcrProgress] = React.useState(0);
  const [ocrRunning, setOcrRunning] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");

  // Canvas ref para dibujo
  const canvasRef = React.useRef(null);
  const isDrawing = React.useRef(false);
  const lastPos = React.useRef({ x: 0, y: 0 });

  // --- Inicializar canvas cuando cambia página ---
  React.useEffect(() => {
    if (canvasRef.current && pdfEntry) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#facc15";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [currentPage, pdfEntry]);

  // --- Canvas drawing handlers ---
  const startDraw = (e) => {
    isDrawing.current = true;
    const pos = getCanvasPos(e);
    lastPos.current = pos;
  };

  const draw = (e) => {
    if (!isDrawing.current || !canvasRef.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    isDrawing.current = false;
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      setNotes(prev => ({ ...prev, drawing: dataUrl }));
      if (pdfEntry) PS.savePageNotes(pdfEntry.id, currentPage, { drawing: dataUrl });
    }
  };

  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width / 2),
      y: (clientY - rect.top) * (canvas.height / rect.height / 2)
    };
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setNotes(prev => ({ ...prev, drawing: "" }));
    if (pdfEntry) PS.savePageNotes(pdfEntry.id, currentPage, { drawing: "" });
  };

  // --- Cargar PDF ---
  const openPdfDialog = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadError("");
      setLoading(true);
      try {
        const entry = await PS.addPdfToLibrary(file);
        setLibrary(PS.getLibrary());
        setShowLibrary(false);
        await loadPdfEntry(entry);
      } catch(err) {
        setUploadError(err.message || "Error al cargar PDF");
      }
      setLoading(false);
    };
    input.click();
  };

  const loadPdfEntry = async (entry) => {
    if (!entry) return;
    setPdfEntry(entry);
    setCurrentPage(1);
    setNotes({ typed: "", drawing: "" });
    setVocab([]);
    setShowVocab(false);
    setSummaryText("");
    setShowSummary(false);

    setLoading(true);
    try {
      const result = await PS.extractTextFromPdf(entry.data);
      setTotalPages(result.totalPages);
      setFullText(result.fullText);
      const page1 = result.pageTexts.find(p => p.page === 1);
      setPageText(page1?.text || result.fullText.slice(0, 2000));
      entry.totalPages = result.totalPages;
      PS.saveLibrary(PS.getLibrary());
    } catch(e) {
      console.warn("Error loading PDF:", e);
    }
    setLoading(false);

    // Cargar notas de página 1
    const savedNotes = PS.getPageNotes(entry.id, 1);
    setNotes(savedNotes);
  };

  const loadFromLibrary = (id) => {
    const entry = PS.getPdfById(id);
    if (entry) loadPdfEntry(entry);
  };

  const removeFromLibrary = (id) => {
    if (pdfEntry?.id === id) {
      setPdfEntry(null);
      setFullText("");
      setPageText("");
      setCurrentPage(1);
      setTotalPages(0);
      setVocab([]);
    }
    PS.removePdfFromLibrary(id);
    setLibrary(PS.getLibrary());
  };

  const changePage = (delta) => {
    const newPage = Math.max(1, Math.min(totalPages, currentPage + delta));
    if (newPage === currentPage) return;
    // Guardar nota actual
    if (pdfEntry) {
      const textarea = document.getElementById("pdf-typed-notes");
      if (textarea) {
        const typedVal = textarea.value;
        setNotes(prev => ({ ...prev, typed: typedVal }));
        PS.savePageNotes(pdfEntry.id, currentPage, { typed: typedVal });
      }
    }
    setCurrentPage(newPage);
    // Restaurar notas de nueva página
    if (pdfEntry) {
      const savedNotes = PS.getPageNotes(pdfEntry.id, newPage);
      setNotes(savedNotes);
    }
  };

  // --- Extraer vocabulario ---
  const extractVocab = () => {
    const words = PS.extractVocab(pageText || fullText);
    setVocab(words);
    setShowVocab(true);
  };

  // --- DeepSeek resumen ---
  const generateSummary = async () => {
    if (!fullText) return;
    setSummaryLoading(true);
    const text = await PS.generateSummary(fullText);
    if (text) {
      setSummaryText(text);
      setShowSummary(true);
    }
    setSummaryLoading(false);
  };

  // --- OCR (Tesseract) ---
  const runOcr = async () => {
    if (!window.Tesseract) {
      setUploadError("Tesseract.js no cargado. Recarga la página.");
      return;
    }
    setOcrRunning(true);
    setOcrProgress(0);
    try {
      // Crear canvas temporal con la página del PDF renderizada
      if (!pdfEntry) return;
      const binaryStr = atob(pdfEntry.data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const page = await pdf.getPage(currentPage);
      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;

      // OCR
      const text = await PS.runOcrOnPdfPage(canvas);
      if (text) {
        setPageText(text);
        setVocab(PS.extractVocab(text));
      }
    } catch(e) {
      console.warn("OCR failed:", e);
      setUploadError("Error en OCR: " + e.message);
    }
    setOcrRunning(false);
    setOcrProgress(0);
  };

  // --- Guardar notas escritas ---
  const saveTypedNotes = (val) => {
    setNotes(prev => ({ ...prev, typed: val }));
    if (pdfEntry) PS.savePageNotes(pdfEntry.id, currentPage, { typed: val });
  };

  // ==================== RENDER ====================
  const pdfUrl = pdfEntry?.data
    ? `data:application/pdf;base64,${pdfEntry.data}#page=${currentPage}`
    : null;

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* TOOLBAR */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-gray-800 bg-gray-900 flex items-center gap-2 flex-wrap">
        <span className="text-sm font-bold text-cyan-400">📄 PDF Study</span>
        <button onClick={openPdfDialog}
          className="px-2 py-1 rounded bg-cyan-700 hover:bg-cyan-600 text-xs font-semibold transition-colors"
          disabled={loading}>
          {loading ? "Cargando..." : "Abrir PDF"}
        </button>
        <button onClick={() => setShowLibrary(!showLibrary)}
          className={`px-2 py-1 rounded text-xs transition-colors ${showLibrary ? "bg-cyan-700 ring-1 ring-cyan-400" : "bg-gray-700 hover:bg-gray-600"}`}>
          📚
        </button>

        {pdfEntry && (
          <>
            <span className="text-xs text-gray-400 ml-1 truncate max-w-[130px]">{pdfEntry.name}</span>

            <button onClick={() => changePage(-1)} disabled={currentPage <= 1 || loading}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs disabled:opacity-40 transition-colors">
              ◀
            </button>
            <span className="text-xs text-gray-300 min-w-[3rem] text-center">
              {loading ? "..." : `${currentPage}/${totalPages}`}
            </span>
            <button onClick={() => changePage(1)} disabled={currentPage >= totalPages || loading}
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs disabled:opacity-40 transition-colors">
              ▶
            </button>

            <span className="text-gray-600">|</span>

            <button onClick={extractVocab}
              className="px-2 py-1 rounded bg-amber-700 hover:bg-amber-600 text-xs transition-colors">
              📖 Vocab
            </button>
            <button onClick={runOcr} disabled={ocrRunning}
              className="px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-xs disabled:opacity-50 transition-colors">
              {ocrRunning ? `OCR ${ocrProgress}%` : "🔍 OCR"}
            </button>
            <button onClick={generateSummary} disabled={summaryLoading || !fullText}
              className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-xs disabled:opacity-50 transition-colors">
              {summaryLoading ? "..." : "🤖 Resumen"}
            </button>
            <button onClick={() => setShowVocab(!showVocab)}
              className={`px-2 py-1 rounded text-xs transition-colors ${showVocab ? "bg-amber-600" : "bg-gray-700 hover:bg-gray-600"}`}>
              📋
            </button>
            <button onClick={clearCanvas}
              className="px-2 py-1 rounded bg-red-800 hover:bg-red-700 text-xs transition-colors">
              🗑
            </button>
          </>
        )}
      </div>

      {/* ERROR */}
      {uploadError && (
        <div className="flex-shrink-0 px-3 py-1.5 bg-red-900/50 border-b border-red-700 text-xs text-red-300">
          {uploadError}
          <button onClick={() => setUploadError("")} className="ml-2 text-red-200 hover:text-white">✕</button>
        </div>
      )}

      {/* LIBRARY PANEL */}
      {showLibrary && (
        <div className="flex-shrink-0 max-h-[35vh] overflow-y-auto bg-gray-900 border-b border-gray-800 p-3">
          <h3 className="text-xs font-bold text-cyan-300 mb-2">📚 Mis PDFs</h3>
          {library.length === 0 && (
            <p className="text-xs text-gray-500">No hay PDFs. Toca "Abrir PDF" para subir uno.</p>
          )}
          <div className="space-y-1.5">
            {library.map(doc => (
              <div key={doc.id} className="flex items-center justify-between bg-gray-800 rounded px-2.5 py-1.5">
                <button onClick={() => loadFromLibrary(doc.id)}
                  className="text-xs text-gray-200 hover:text-cyan-300 truncate flex-1 text-left transition-colors">
                  📄 {doc.name}
                </button>
                <span className="text-[10px] text-gray-500 mr-2">{doc.totalPages}p</span>
                <button onClick={() => removeFromLibrary(doc.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN VIEWER */}
      <div className="flex-1 relative bg-black min-h-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="text-cyan-400 text-sm animate-pulse">Cargando PDF...</div>
          </div>
        )}

        {pdfUrl && !loading && (
          <div className="absolute inset-0 overflow-auto bg-gray-900">
            <div className="relative w-full h-full">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="PDF Viewer"
              />
              {/* Canvas de dibujo superpuesto */}
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ pointerEvents: "auto", touchAction: "none", opacity: 0.5 }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
            </div>
          </div>
        )}

        {!pdfEntry && !loading && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm flex-col gap-2">
            <span className="text-4xl">📄</span>
            <span>Abre un PDF para empezar a estudiar</span>
            <span className="text-xs text-gray-600">o selecciona uno de tu biblioteca</span>
          </div>
        )}
      </div>

      {/* VOCAB PANEL */}
      {showVocab && vocab.length > 0 && (
        <div className="flex-shrink-0 max-h-[30vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-3">
          <h3 className="text-xs font-bold text-amber-300 mb-2">📖 Vocabulario ({vocab.length})</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
            {vocab.map((v, i) => (
              <span key={i} className="text-xs bg-gray-800 rounded px-2 py-1 text-gray-200 truncate" title={v.word}>
                {v.word}
                <span className="text-gray-500 ml-1">({v.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SUMMARY PANEL */}
      {showSummary && summaryText && (
        <div className="flex-shrink-0 max-h-[25vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-3">
          <h3 className="text-xs font-bold text-emerald-300 mb-1">🤖 Resumen IA</h3>
          <p className="text-xs text-gray-300 whitespace-pre-wrap">{summaryText}</p>
          <button onClick={() => setShowSummary(false)} className="text-[10px] text-gray-500 mt-1 hover:text-gray-300">
            Cerrar
          </button>
        </div>
      )}

      {/* NOTES */}
      {pdfEntry && (
        <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900 p-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-gray-500">Notas p.{currentPage}</span>
          </div>
          <textarea
            id="pdf-typed-notes"
            defaultValue={notes.typed}
            onChange={(e) => saveTypedNotes(e.target.value)}
            placeholder="Escribe notas sobre esta página..."
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs text-white resize-none"
            rows={2}
          />
        </div>
      )}
    </div>
  );
};