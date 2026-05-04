// ═══════════════════════════════════════════════════
// PDF STUDY – Panel de estudio de PDFs
// Almacenamiento: IndexedDB (PDFs binarios sin límite)
// + PDF.js real + OCR Tesseract + vocabulario + notas
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
  const [ocrMessage, setOcrMessage] = React.useState("");
  const [ocrRunning, setOcrRunning] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");
  const [pdfObjectUrl, setPdfObjectUrl] = React.useState(null);
  const [zoom, setZoom] = React.useState(100);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchIndex, setSearchIndex] = React.useState(0);
  const [showSearch, setShowSearch] = React.useState(false);
  const [expandedVocabDialog, setExpandedVocabDialog] = React.useState(false);

  // Canvas ref para dibujo
  const canvasRef = React.useRef(null);
  const isDrawing = React.useRef(false);
  const lastPos = React.useRef({ x: 0, y: 0 });
  const [toolColor, setToolColor] = React.useState("#facc15"); // amarillo por defecto
  const [toolWidth, setToolWidth] = React.useState(3);

  // --- Inicializar canvas cuando cambia página ---
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        const ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        ctx.lineWidth = toolWidth;
        ctx.strokeStyle = toolColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [currentPage, pdfEntry, toolColor, toolWidth]);

  // --- Limpiar object URL al desmontar ---
  React.useEffect(() => {
    return () => {
      if (pdfObjectUrl) PS.revokeObjectUrl(pdfObjectUrl);
    };
  }, []);

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

  const changeToolColor = (color) => {
    setToolColor(color);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.strokeStyle = color;
    }
  };

  const changeToolWidth = (w) => {
    setToolWidth(w);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = w;
    }
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
    // Limpiar object URL anterior
    if (pdfObjectUrl) PS.revokeObjectUrl(pdfObjectUrl);
    setPdfObjectUrl(null);

    setPdfEntry(entry);
    setCurrentPage(1);
    setNotes({ typed: "", drawing: "" });
    setVocab([]);
    setShowVocab(false);
    setSummaryText("");
    setShowSummary(false);
    setSearchResults([]);
    setSearchQuery("");

    // Cargar desde IndexedDB
    const objectUrl = await PS.loadPdfAsObjectUrl(entry.id);
    setPdfObjectUrl(objectUrl);

    setLoading(true);
    try {
      const arrayBuffer = await PS.loadPdfAsArrayBuffer(entry.id);
      if (arrayBuffer) {
        const result = await PS.extractTextFromPdf(arrayBuffer);
        setTotalPages(result.totalPages);
        setFullText(result.fullText);
        const page1 = result.pageTexts.find(p => p.page === 1);
        setPageText(page1?.text || result.fullText.slice(0, 2000));
        // Actualizar metadatos
        entry.totalPages = result.totalPages;
        PS.saveLibrary(PS.getLibrary());
      }
    } catch(e) {
      console.warn("Error loading PDF text:", e);
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

  const removeFromLibrary = async (id) => {
    if (pdfEntry?.id === id) {
      if (pdfObjectUrl) PS.revokeObjectUrl(pdfObjectUrl);
      setPdfObjectUrl(null);
      setPdfEntry(null);
      setFullText("");
      setPageText("");
      setCurrentPage(1);
      setTotalPages(0);
      setVocab([]);
    }
    await PS.removePdfFromLibrary(id);
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
      // Actualizar texto de página
      if (fullText) {
        const pages = fullText.split('\n');
        setPageText(pages[newPage - 1] || pages.join(' ').slice(0, 2000));
      }
    }
  };

  // --- Extraer vocabulario ---
  const extractVocab = () => {
    const words = PS.extractVocab(pageText || fullText);
    setVocab(words);
    setShowVocab(true);
  };

  // --- Añadir todas las palabras a SRS ---
  const addAllToSrs = () => {
    if (!vocab.length) return;
    PS.addVocabToSrs(vocab.map(v => ({
      word: v.word,
      translation: '',
      count: v.count
    })));
    alert(`Añadidas ${vocab.length} palabras al sistema SRS.`);
    setShowVocab(false);
  };

  // --- Añadir palabra individual a SRS ---
  const addWordToSrs = (word) => {
    PS.addVocabToSrs([{
      word: word.word,
      translation: '',
      count: word.count
    }]);
    setUploadError(`"${word.word}" añadida al SRS ✓`);
    setTimeout(() => setUploadError(""), 2000);
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

  // --- OCR (Tesseract) sobre la página actual ---
  const runOcr = async () => {
    if (!window.Tesseract) {
      setUploadError("Tesseract.js no cargado. Recarga la página.");
      return;
    }
    if (!pdfEntry) return;
    setOcrRunning(true);
    setOcrMessage("Iniciando OCR...");
    try {
      const arrayBuffer = await PS.loadPdfAsArrayBuffer(pdfEntry.id);
      if (!arrayBuffer) { throw new Error("No se pudo cargar el PDF"); }

      // Renderizar página actual con PDF.js
      setOcrMessage("Renderizando página...");
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(currentPage);
      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;

      // OCR con Tesseract
      setOcrMessage("Reconociendo texto con OCR...");
      const text = await PS.runOcrOnPdfPage(canvas);
      if (text) {
        setPageText(text);
        setVocab(PS.extractVocab(text));
        setOcrMessage(`OCR completado (${text.length} caracteres)`);
        setTimeout(() => setOcrMessage(""), 3000);
      } else {
        setOcrMessage("No se reconoció texto en esta página.");
      }
    } catch(e) {
      console.warn("OCR failed:", e);
      setUploadError("Error en OCR: " + e.message);
    }
    setOcrRunning(false);
  };

  // --- Guardar notas escritas ---
  const saveTypedNotes = (val) => {
    setNotes(prev => ({ ...prev, typed: val }));
    if (pdfEntry) PS.savePageNotes(pdfEntry.id, currentPage, { typed: val });
  };

  // --- Búsqueda de texto ---
  const doSearch = () => {
    if (!searchQuery || !fullText) { setSearchResults([]); return; }
    const query = searchQuery.toLowerCase();
    const parts = fullText.toLowerCase().split(query);
    if (parts.length <= 1) { setSearchResults([]); return; }
    const results = [];
    let pos = 0;
    for (let i = 0; i < parts.length - 1; i++) {
      pos += parts[i].length;
      results.push({
        index: i,
        start: pos,
        end: pos + query.length,
        context: fullText.slice(Math.max(0, pos - 40), pos + query.length + 40)
      });
      pos += query.length;
    }
    setSearchResults(results);
    setSearchIndex(0);
  };

  const goToSearchResult = (idx) => {
    setSearchIndex(Math.max(0, Math.min(searchResults.length - 1, idx)));
  };

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* TOOLBAR */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-gray-800 bg-gray-900 flex items-center gap-2 flex-wrap">
        <span className="text-sm font-bold text-cyan-400">📄 PDF Study</span>
        <button onClick={openPdfDialog}
          className="px-2 py-1 rounded bg-cyan-700 hover:bg-cyan-600 text-xs font-semibold transition-colors"
          disabled={loading}>
          {loading ? "⏳" : "Abrir PDF"}
        </button>
        <button onClick={() => setShowLibrary(!showLibrary)}
          className={`px-2 py-1 rounded text-xs transition-colors ${showLibrary ? "bg-cyan-700 ring-1 ring-cyan-400" : "bg-gray-700 hover:bg-gray-600"}`}>
          📚
        </button>

        {pdfEntry && (
          <>
            <span className="text-xs text-gray-400 ml-1 truncate max-w-[130px]">{pdfEntry.name}</span>

            {/* Navegación páginas */}
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

            {/* Zoom */}
            <span className="text-gray-600">|</span>
            <button onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="px-1.5 py-1 rounded bg-gray-700 hover:bg-gray-600 text-[10px] transition-colors">
              −
            </button>
            <span className="text-[10px] text-gray-400 min-w-[2rem] text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="px-1.5 py-1 rounded bg-gray-700 hover:bg-gray-600 text-[10px] transition-colors">
              +
            </button>

            {/* Búsqueda */}
            <span className="text-gray-600">|</span>
            <button onClick={() => setShowSearch(!showSearch)}
              className={`px-2 py-1 rounded text-xs transition-colors ${showSearch ? "bg-blue-700 ring-1 ring-blue-400" : "bg-gray-700 hover:bg-gray-600"}`}>
              🔍
            </button>

            {/* Acciones */}
            <span className="text-gray-600">|</span>
            <button onClick={extractVocab}
              className="px-2 py-1 rounded bg-amber-700 hover:bg-amber-600 text-xs transition-colors">
              📖 Vocab
            </button>
            <button onClick={runOcr} disabled={ocrRunning}
              className="px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-xs disabled:opacity-50 transition-colors">
              {ocrRunning ? "🔄" : "🔍 OCR"}
            </button>
            <button onClick={generateSummary} disabled={summaryLoading || !fullText}
              className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-xs disabled:opacity-50 transition-colors">
              {summaryLoading ? "⏳" : "🤖 Resumen"}
            </button>

            {/* Herramientas dibujo */}
            <span className="text-gray-600">|</span>
            {["#facc15", "#3b82f6", "#ef4444", "#22c55e", "#9ca3af"].map(c => (
              <button key={c}
                onClick={() => changeToolColor(c)}
                className={`w-4 h-4 rounded-full border ${toolColor === c ? "ring-1 ring-white scale-110" : "border-gray-600"}`}
                style={{ background: c }}
                title={`Color: ${c}`}
              />
            ))}
            <select onChange={(e) => changeToolWidth(parseInt(e.target.value))} value={toolWidth}
              className="bg-gray-800 border border-gray-700 rounded text-[10px] text-white px-1 py-0.5">
              <option value={1}>1px</option>
              <option value={3}>3px</option>
              <option value={6}>6px</option>
              <option value={10}>10px</option>
            </select>
            <button onClick={clearCanvas}
              className="px-1.5 py-1 rounded bg-red-800 hover:bg-red-700 text-[10px] transition-colors">
              🗑
            </button>
          </>
        )}
      </div>

      {/* Búsqueda */}
      {showSearch && pdfEntry && (
        <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Buscar en el PDF..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
          />
          <button onClick={doSearch}
            className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-600 text-xs transition-colors">
            Ir
          </button>
          {searchResults.length > 0 && (
            <div className="flex items-center gap-1">
              <button onClick={() => goToSearchResult(searchIndex - 1)}
                disabled={searchIndex <= 0}
                className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] disabled:opacity-40">
                ◀
              </button>
              <span className="text-[10px] text-gray-400">
                {searchIndex + 1}/{searchResults.length}
              </span>
              <button onClick={() => goToSearchResult(searchIndex + 1)}
                disabled={searchIndex >= searchResults.length - 1}
                className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] disabled:opacity-40">
                ▶
              </button>
            </div>
          )}
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-3 py-1">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            ...{searchResults[searchIndex]?.context}...
          </p>
        </div>
      )}

      {/* ERROR / MENSAJE */}
      {(uploadError || ocrMessage) && (
        <div className="flex-shrink-0 px-3 py-1.5 border-b text-xs flex items-center gap-2"
          style={{ background: uploadError && !ocrMessage ? "#7f1d1d" : "#1e3a5f",
                  borderColor: uploadError && !ocrMessage ? "#991b1b" : "#1d4ed8" }}>
          <span className={uploadError && !ocrMessage ? "text-red-300" : "text-blue-300"}>
            {uploadError || ocrMessage}
          </span>
          <button onClick={() => { setUploadError(""); setOcrMessage(""); }}
            className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* LIBRARY PANEL */}
      {showLibrary && (
        <div className="flex-shrink-0 max-h-[35vh] overflow-y-auto bg-gray-900 border-b border-gray-800 p-3">
          <h3 className="text-xs font-bold text-cyan-300 mb-2">📚 Mis PDFs ({library.length})</h3>
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
                <span className="text-[10px] text-gray-600 mr-2">
                  {doc.size > 1048576 ? `${(doc.size / 1048576).toFixed(1)}MB` : `${(doc.size / 1024).toFixed(0)}KB`}
                </span>
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

        {pdfObjectUrl && !loading && (
          <div className="absolute inset-0 overflow-auto bg-gray-900">
            <div className="relative" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${100 / (zoom / 100)}%`, height: `${100 / (zoom / 100)}%` }}>
              <iframe
                src={`${pdfObjectUrl}#page=${currentPage}`}
                className="w-full h-full border-0"
                style={{ height: '100vh' }}
                title="PDF Viewer"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full"
                style={{ pointerEvents: "auto", touchAction: "none", opacity: 0.4, height: '100vh' }}
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
            <button onClick={openPdfDialog}
              className="mt-2 px-4 py-2 rounded bg-cyan-700 hover:bg-cyan-600 text-sm transition-colors">
              📂 Abrir PDF
            </button>
          </div>
        )}
      </div>

      {/* VOCAB PANEL */}
      {showVocab && vocab.length > 0 && (
        <div className="flex-shrink-0 max-h-[30vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-amber-300">📖 Vocabulario ({vocab.length})</h3>
            <div className="flex gap-1">
              <button onClick={addAllToSrs}
                className="px-2 py-0.5 rounded bg-green-700 hover:bg-green-600 text-[10px] transition-colors">
                + Todas al SRS
              </button>
              <button onClick={() => setShowVocab(false)}
                className="text-[10px] text-gray-500 hover:text-gray-300">
                Cerrar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {vocab.map((v, i) => (
              <div key={i} className="text-xs bg-gray-800 rounded px-2 py-1 text-gray-200 flex items-center justify-between gap-1">
                <span className="truncate flex-1" title={v.word}>
                  {v.word}
                  <span className="text-gray-500 ml-1">({v.count})</span>
                </span>
                <button onClick={() => addWordToSrs(v)}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                  title="Añadir al SRS">
                  +
                </button>
              </div>
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