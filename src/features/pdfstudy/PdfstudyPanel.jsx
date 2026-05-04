// ═══════════════════════════════════════════════════
// PDF STUDY – Panel de estudio de PDFs
// Almacenamiento: IndexedDB (PDFs binarios sin límite)
// + PDF.js real + OCR Tesseract + vocabulario + notas
// Mejoras: pantalla completa, scroll, 30+ colores,
// subrayado, goma borrador, TTS, marcadores
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

// --- Constantes de colores (30+) ---
const DRAW_COLORS = {
  // Amarillos
  "#facc15": "Amarillo",
  "#eab308": "Oro",
  "#fde047": "Limón",
  "#fef08a": "Amarillo claro",
  "#a16207": "Amarillo oscuro",
  // Naranjas
  "#f97316": "Naranja",
  "#fb923c": "Naranja claro",
  "#ea580c": "Naranja intenso",
  "#c2410c": "Naranja oscuro",
  // Rojos
  "#ef4444": "Rojo",
  "#f87171": "Rojo claro",
  "#dc2626": "Rojo intenso",
  "#b91c1c": "Rojo oscuro",
  "#fca5a5": "Rosa claro",
  "#ec4899": "Rosa",
  "#db2777": "Rosa intenso",
  // Azules
  "#3b82f6": "Azul",
  "#60a5fa": "Azul claro",
  "#2563eb": "Azul intenso",
  "#1d4ed8": "Azul oscuro",
  "#06b6d4": "Cian",
  "#22d3ee": "Cian claro",
  "#0284c7": "Azul cielo",
  "#818cf8": "Azul lavanda",
  // Verdes
  "#22c55e": "Verde",
  "#4ade80": "Verde claro",
  "#16a34a": "Verde intenso",
  "#10b981": "Esmeralda",
  "#34d399": "Esmeralda claro",
  "#059669": "Verde oscuro",
  // Púrpuras
  "#a855f7": "Púrpura",
  "#c084fc": "Púrpura claro",
  "#9333ea": "Púrpura intenso",
  "#7c3aed": "Violeta",
  "#d946ef": "Fucsia",
  // Grises (con negro puro al inicio)
  "#000000": "Negro puro",
  "#111827": "Negro intenso",
  "#9ca3af": "Gris",
  "#6b7280": "Gris oscuro",
  "#d1d5db": "Gris claro",
  "#f3f4f6": "Blanco",
  // Especiales
  "#ff6b35": "Naranja neón",
  "#00d4aa": "Verde menta",
  "#ff61a6": "Rosa neón",
  "#7dd3fc": "Cielo claro",
  "#a78bfa": "Lavanda",
};

const COLOR_GROUPS = [
  { label: "Amarillos", colors: ["#facc15","#eab308","#fde047","#fef08a","#a16207"] },
  { label: "Naranjas", colors: ["#f97316","#fb923c","#ea580c","#c2410c"] },
  { label: "Rojos", colors: ["#ef4444","#f87171","#dc2626","#b91c1c","#fca5a5","#ec4899","#db2777"] },
  { label: "Azules", colors: ["#3b82f6","#60a5fa","#2563eb","#1d4ed8","#06b6d4","#22d3ee","#0284c7","#818cf8"] },
  { label: "Verdes", colors: ["#22c55e","#4ade80","#16a34a","#10b981","#34d399","#059669"] },
  { label: "Púrpuras", colors: ["#a855f7","#c084fc","#9333ea","#7c3aed","#d946ef"] },
  { label: "Grises", colors: ["#000000","#111827","#9ca3af","#6b7280","#d1d5db","#f3f4f6"] },
  { label: "Neón", colors: ["#ff6b35","#00d4aa","#ff61a6","#7dd3fc","#a78bfa"] },
];

// --- Modos de herramienta ---
const TOOL_SELECT = "select"; // Mano: desplazar PDF sin dibujar
const TOOL_PEN = "pen";
const TOOL_HIGHLIGHT = "highlight";
const TOOL_ERASER = "eraser";
const TOOL_TEXT = "text"; // Escribir texto con teclado

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
  const [notes, setNotes] = React.useState({ typed: "", drawing: "", highlights: [] });
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

  // --- Nuevos estados ---
  const [fullscreen, setFullscreen] = React.useState(false);
  const [tool, setTool] = React.useState(TOOL_SELECT); // default: mano/desplazamiento
  const [toolColor, setToolColor] = React.useState("#000000");
  const [toolWidth, setToolWidth] = React.useState(3);
  const [eraserSize, setEraserSize] = React.useState(30);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [customColor, setCustomColor] = React.useState("#000000");
  const [bookmarks, setBookmarks] = React.useState([]);
  const [ttsPlaying, setTtsPlaying] = React.useState(false);
  const [bookmarkedPages, setBookmarkedPages] = React.useState([]);
  const [textAnnotations, setTextAnnotations] = React.useState([]);
  const [textInputPos, setTextInputPos] = React.useState(null);
  const [tempText, setTempText] = React.useState("");
  const [textFontSize, setTextFontSize] = React.useState(16);
  const [activeTextId, setActiveTextId] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  // Refs
  const canvasRef = React.useRef(null);
  const isDrawing = React.useRef(false);
  const lastPos = React.useRef({ x: 0, y: 0 });
  const viewerRef = React.useRef(null);
  const touchStartY = React.useRef(null);
  const containerRef = React.useRef(null);
  const textInputRef = React.useRef(null);

  // --- Inicializar marcadores al cargar PDF ---
  React.useEffect(() => {
    if (pdfEntry) {
      setBookmarkedPages(PS.getPdfBookmarks(pdfEntry.id));
    }
  }, [pdfEntry]);

  // --- Canvas: inicializar / re-dibujar al cambiar página ---
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const scale = 2;
        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Restaurar dibujos guardados
        if (notes.drawing) {
          const img = new Image();
          img.src = notes.drawing;
          img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        }
      }
    }
  }, [currentPage, pdfEntry]);

  // --- Actualizar tool en canvas ---
  React.useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      updateCanvasTool(ctx);
    }
  }, [tool, toolColor, toolWidth, eraserSize]);

  function updateCanvasTool(ctx) {
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === TOOL_ERASER) {
      // El borrador se maneja diferente (en draw)
    } else if (tool === TOOL_HIGHLIGHT) {
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = toolColor;
      ctx.lineWidth = toolWidth * 3;
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = toolColor;
      ctx.lineWidth = toolWidth;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // --- Limpiar object URL al desmontar ---
  React.useEffect(() => {
    return () => {
      if (pdfObjectUrl) PS.revokeObjectUrl(pdfObjectUrl);
    };
  }, []);

  // --- Pantalla completa ---
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(() => {});
    }
  };

  // --- Escuchar cambios de fullscreen ---
  React.useEffect(() => {
    const handler = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // --- Scroll con rueda ratón: Ctrl+rueda = zoom, si no cambia página (salvo modo Select) ---
  const handleWheel = React.useCallback((e) => {
    if (!pdfEntry) return;

    // Ctrl+rueda = zoom SIEMPRE, independientemente del tool
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY > 0) {
        setZoom(prev => Math.max(50, prev - 5));
      } else {
        setZoom(prev => Math.min(200, prev + 5));
      }
      return;
    }

    if (tool === TOOL_SELECT) return; // Modo desplazamiento: deja pasar la rueda al iframe
    e.preventDefault();
    if (e.deltaY > 0) {
      changePage(1);
    } else if (e.deltaY < 0) {
      changePage(-1);
    }
  }, [pdfEntry, currentPage, totalPages, tool]);

  // --- Touch para móvil (solo cuando NO está en modo Select) ---
  const handleTouchStart = (e) => {
    if (tool === TOOL_SELECT) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (tool === TOOL_SELECT) return;
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaY) > 50) {
      if (deltaY < 0) changePage(1);
      else changePage(-1);
    }
    touchStartY.current = null;
  };

  // --- TOOL_TEXT: manejar click para colocar texto (con corrección de zoom) ---
  const handleCanvasClick = React.useCallback((e) => {
    if (tool !== TOOL_TEXT) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // Escalar coordenadas según el zoom actual
    const scale = zoom / 100;
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    // Crear nueva anotación de texto
    const newAnnotation = {
      id: Date.now(),
      x, y,
      text: "",
      color: toolColor,
      fontSize: textFontSize,
      page: currentPage
    };
    setTextAnnotations(prev => [...prev, newAnnotation]);
    setActiveTextId(newAnnotation.id);
    setEditingText("");
    setTextInputPos({ x, y });
    setTimeout(() => {
      if (textInputRef.current) textInputRef.current.focus();
    }, 50);
  }, [tool, toolColor, textFontSize, currentPage]);

  // --- Guardar texto de anotación ---
  const saveTextAnnotation = (id) => {
    setTextAnnotations(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, text: editingText } : a);
      // Guardar en PS
      if (pdfEntry) {
        const allTextAnnotations = JSON.parse(PS.getPageNotes(pdfEntry.id, currentPage).textAnnotations || "[]");
        PS.savePageNotes(pdfEntry.id, currentPage, {
          textAnnotations: JSON.stringify(updated.filter(a => a.page === currentPage))
        });
      }
      return updated;
    });
    setActiveTextId(null);
    setTextInputPos(null);
  };

  // --- Canvas drawing handlers ---
  const startDraw = (e) => {
    if (tool === TOOL_SELECT || tool === TOOL_TEXT) return;
    isDrawing.current = true;
    const pos = getCanvasPos(e);
    lastPos.current = pos;
    if (canvasRef.current && tool === TOOL_ERASER) {
      eraseArea(pos.x, pos.y);
    }
  };

  const draw = (e) => {
    if (tool === TOOL_SELECT || tool === TOOL_TEXT) return;
    if (!isDrawing.current || !canvasRef.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getCanvasPos(e);

    if (tool === TOOL_ERASER) {
      eraseArea(pos.x, pos.y);
      return;
    }

    if (tool === TOOL_HIGHLIGHT) {
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = toolColor;
      ctx.lineWidth = toolWidth * 3;
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = toolColor;
      ctx.lineWidth = toolWidth;
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    if (tool === TOOL_SELECT || tool === TOOL_TEXT) return;
    isDrawing.current = false;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
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

  // --- Goma de borrar (parcial, por área) ---
  const eraseArea = (x, y) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const size = eraserSize / (canvasRef.current.width / canvasRef.current.getBoundingClientRect().width / 2);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.restore();
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
    if (pdfObjectUrl) PS.revokeObjectUrl(pdfObjectUrl);
    setPdfObjectUrl(null);

    setPdfEntry(entry);
    setCurrentPage(1);
    setNotes({ typed: "", drawing: "", highlights: [] });
    setVocab([]);
    setShowVocab(false);
    setSummaryText("");
    setShowSummary(false);
    setSearchResults([]);
    setSearchQuery("");
    setBookmarkedPages(PS.getPdfBookmarks(entry.id));

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
        entry.totalPages = result.totalPages;
        PS.saveLibrary(PS.getLibrary());
      }
    } catch(e) {
      console.warn("Error loading PDF text:", e);
    }
    setLoading(false);

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

  // --- Marcador ---
  const toggleBookmark = () => {
    if (!pdfEntry) return;
    const updated = PS.toggleBookmark(pdfEntry.id, currentPage);
    setBookmarkedPages(updated);
  };

  const goToBookmark = (page) => {
    changePageDirect(page);
  };

  // --- Cambiar página (con guardado) ---
  const changePage = (delta) => {
    const newPage = Math.max(1, Math.min(totalPages, currentPage + delta));
    if (newPage === currentPage) return;
    changePageDirect(newPage);
  };

  const changePageDirect = (newPage) => {
    if (pdfEntry) {
      const textarea = document.getElementById("pdf-typed-notes");
      if (textarea) {
        const typedVal = textarea.value;
        setNotes(prev => ({ ...prev, typed: typedVal }));
        PS.savePageNotes(pdfEntry.id, currentPage, { typed: typedVal });
      }
    }
    setCurrentPage(newPage);
    if (pdfEntry) {
      const savedNotes = PS.getPageNotes(pdfEntry.id, newPage);
      setNotes(savedNotes);
      if (fullText) {
        const pages = fullText.split('\n');
        setPageText(pages[newPage - 1] || pages.join(' ').slice(0, 2000));
      }
    }
  };

  // --- TTS: Leer página actual ---
  const speakPage = () => {
    if (!pageText && !fullText) return;
    const text = pageText || fullText.slice(0, 2000);
    setTtsPlaying(true);
    const success = PS.speakText(text, 'de-DE', 0.85);
    if (!success) {
      setUploadError("TTS no disponible. Prueba con otro navegador.");
    }
    if (window.speechSynthesis) {
      const checkEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(checkEnd);
          setTtsPlaying(false);
        }
      }, 500);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setTtsPlaying(false);
  };

  // --- Extraer vocabulario ---
  const extractVocab = () => {
    const words = PS.extractVocab(pageText || fullText);
    setVocab(words);
    setShowVocab(true);
  };

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

  // --- OCR ---
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

  const saveTypedNotes = (val) => {
    setNotes(prev => ({ ...prev, typed: val }));
    if (pdfEntry) PS.savePageNotes(pdfEntry.id, currentPage, { typed: val });
  };

  // --- Búsqueda ---
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
    <div ref={containerRef} className="flex flex-col h-full bg-gray-950 text-white" style={{ minHeight: '100%' }}>
      {/* TOOLBAR */}
      <div className="flex-shrink-0 px-2 py-1 border-b border-gray-800 bg-gray-900 flex items-center gap-1 flex-wrap text-xs">
        <span className="text-sm font-bold text-cyan-400 mr-1">📄 PDF</span>

        {/* Archivo */}
        <button onClick={openPdfDialog}
          className="px-1.5 py-0.5 rounded bg-cyan-700 hover:bg-cyan-600 text-[10px] font-semibold transition-colors"
          disabled={loading}
          title="Abrir un archivo PDF">
          {loading ? "⏳" : "Abrir"}
        </button>
        <button onClick={() => setShowLibrary(!showLibrary)}
          className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${showLibrary ? "bg-cyan-700 ring-1 ring-cyan-400" : "bg-gray-700 hover:bg-gray-600"}`}
          title="Biblioteca de PDFs">
          📚
        </button>

        {pdfEntry && (
          <>
            <span className="text-[10px] text-gray-400 ml-0.5 truncate max-w-[100px]">{pdfEntry.name}</span>
            <span className="text-gray-600 mx-0.5">|</span>

            {/* Navegación páginas */}
            <button onClick={() => changePage(-1)} disabled={currentPage <= 1 || loading}
              className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] disabled:opacity-40 transition-colors"
              title="Página anterior (◀)">
              ◀
            </button>
            <span className="text-[10px] text-gray-300 min-w-[2.5rem] text-center">
              {loading ? "..." : `${currentPage}/${totalPages}`}
            </span>
            <button onClick={() => changePage(1)} disabled={currentPage >= totalPages || loading}
              className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] disabled:opacity-40 transition-colors"
              title="Página siguiente (▶)">
              ▶
            </button>

            {/* Marcador */}
            <button onClick={toggleBookmark}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${bookmarkedPages.includes(currentPage) ? "bg-yellow-700 text-yellow-200" : "bg-gray-700 hover:bg-gray-600"}`}
              title={bookmarkedPages.includes(currentPage) ? "Quitar marcador (★)" : "Añadir marcador (☆)"}>
              {bookmarkedPages.includes(currentPage) ? "★" : "☆"}
            </button>

            {/* Zoom */}
            <span className="text-gray-600 mx-0.5">|</span>
            <button onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] transition-colors"
              title="Alejar (reducir zoom)">−</button>
            <span className="text-[9px] text-gray-400 min-w-[1.8rem] text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="px-1 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-[10px] transition-colors"
              title="Acercar (aumentar zoom)">+</button>

            {/* Búsqueda */}
            <button onClick={() => setShowSearch(!showSearch)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${showSearch ? "bg-blue-700 ring-1 ring-blue-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Buscar texto en el PDF">
              🔍
            </button>

            {/* Acciones */}
            <span className="text-gray-600 mx-0.5">|</span>
            <button onClick={extractVocab}
              className="px-1 py-0.5 rounded bg-amber-700 hover:bg-amber-600 text-[10px] transition-colors"
              title="Extraer vocabulario de la página actual">📖</button>
            <button onClick={runOcr} disabled={ocrRunning}
              className="px-1 py-0.5 rounded bg-purple-700 hover:bg-purple-600 text-[10px] disabled:opacity-50 transition-colors"
              title={ocrRunning ? "OCR en proceso..." : "Reconocer texto con OCR (Tesseract.js)"}>
              {ocrRunning ? "🔄" : "🔍"}
            </button>
            <button onClick={generateSummary} disabled={summaryLoading || !fullText}
              className="px-1 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-[10px] disabled:opacity-50 transition-colors"
              title="Generar resumen con IA (DeepSeek)">
              {summaryLoading ? "⏳" : "🤖"}
            </button>

            {/* TTS */}
            <button onClick={ttsPlaying ? stopSpeaking : speakPage}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${ttsPlaying ? "bg-green-600 ring-1 ring-green-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title={ttsPlaying ? "Detener lectura" : "Leer página en voz alta (TTS)"}>
              {ttsPlaying ? "⏹" : "🔊"}
            </button>

            {/* Pantalla completa */}
            <button onClick={toggleFullscreen}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${fullscreen ? "bg-cyan-700 ring-1 ring-cyan-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
              {fullscreen ? "⛶" : "⛶"}
            </button>

            {/* Separador herramientas */}
            <span className="text-gray-600 mx-0.5">|</span>

            {/* Selector de herramienta */}
            <button onClick={() => setTool(TOOL_SELECT)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${tool === TOOL_SELECT ? "bg-green-700 ring-1 ring-green-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Selección / Mano: desplázate por el PDF sin dibujar">
              👆
            </button>
            <button onClick={() => setTool(TOOL_PEN)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${tool === TOOL_PEN ? "bg-cyan-700 ring-1 ring-cyan-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Dibujar a mano alzada (bolígrafo)">
              ✏️
            </button>
            <button onClick={() => setTool(TOOL_HIGHLIGHT)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${tool === TOOL_HIGHLIGHT ? "bg-yellow-700 ring-1 ring-yellow-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Subrayar texto (resaltador)">
              🖍️
            </button>
            <button onClick={() => setTool(TOOL_ERASER)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${tool === TOOL_ERASER ? "bg-red-700 ring-1 ring-red-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Goma de borrar: borra dibujos y subrayados">
              🧹
            </button>
            <button onClick={() => setTool(TOOL_TEXT)}
              className={`px-1 py-0.5 rounded text-[10px] transition-colors ${tool === TOOL_TEXT ? "bg-purple-700 ring-1 ring-purple-400" : "bg-gray-700 hover:bg-gray-600"}`}
              title="Texto: haz clic en el PDF para escribir con teclado">
              🔤
            </button>

            {/* Grosor (según herramienta) */}
            <select onChange={(e) => setToolWidth(parseInt(e.target.value))}
              value={toolWidth}
              className="bg-gray-800 border border-gray-700 rounded text-[9px] text-white px-0.5 py-0.5"
              title="Grosor de la herramienta">
              <option value={1}>1px</option>
              <option value={2}>2px</option>
              <option value={3}>3px</option>
              <option value={5}>5px</option>
              <option value={8}>8px</option>
              <option value={12}>12px</option>
            </select>

            {/* Color selector */}
            <div className="relative">
              <button onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-4 h-4 rounded-full border border-gray-500 flex-shrink-0"
                style={{ background: toolColor }}
                title="Cambiar color de dibujo/subrayado" />
              {showColorPicker && (
                <div className="absolute top-5 left-0 z-20 bg-gray-900 border border-gray-700 rounded p-2 shadow-xl"
                  style={{ width: '280px', maxHeight: '300px', overflowY: 'auto' }}>
                  <div className="flex items-center gap-1 mb-1.5">
                    <span className="text-[9px] text-gray-400">Color:</span>
                    <input type="color" value={customColor}
                      onChange={(e) => { setCustomColor(e.target.value); setToolColor(e.target.value); }}
                      className="w-6 h-6 border-0 rounded cursor-pointer" />
                  </div>
                  {COLOR_GROUPS.map((group, gi) => (
                    <div key={gi} className="mb-1">
                      <p className="text-[8px] text-gray-500 mb-0.5">{group.label}</p>
                      <div className="flex gap-0.5 flex-wrap">
                        {group.colors.map(c => (
                          <button key={c}
                            onClick={() => { setToolColor(c); setCustomColor(c); setShowColorPicker(false); }}
                            className={`w-4 h-4 rounded-full border ${toolColor === c ? "ring-1 ring-white scale-110" : "border-gray-600"} transition-transform`}
                            style={{ background: c }}
                            title={DRAW_COLORS[c] || c} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tamaño goma (solo visible en modo borrador) */}
            {tool === TOOL_ERASER && (
              <select onChange={(e) => setEraserSize(parseInt(e.target.value))} value={eraserSize}
                className="bg-gray-800 border border-gray-700 rounded text-[9px] text-white px-0.5 py-0.5"
                title="Tamaño de la goma de borrar">
                <option value={15}>🔸Goma pequeña</option>
                <option value={30}>🔸Goma mediana</option>
                <option value={50}>🔸Goma grande</option>
              </select>
            )}

            {/* Limpiar canvas */}
            <button onClick={clearCanvas}
              className="px-1 py-0.5 rounded bg-red-800 hover:bg-red-700 text-[10px] transition-colors"
              title="Limpiar todo el canvas (dibujos y subrayados)">
              🗑
            </button>
          </>
        )}
      </div>

      {/* Marcadores rápidos */}
          {/* Anotaciones de texto activas */}
          {pdfEntry && textAnnotations.filter(a => a.page === currentPage).length > 0 && (
            <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-2 py-0.5 flex items-center gap-1 flex-wrap">
              <span className="text-[9px] text-cyan-400">📝 Texto:</span>
              {textAnnotations.filter(a => a.page === currentPage).map(a => (
                <span key={a.id}
                  className="px-1 py-0 rounded text-[9px] bg-gray-800 text-gray-400"
                  style={{ color: a.color }}>
                  {a.text || "(vacío)"}
                </span>
              ))}
            </div>
          )}

          {bookmarkedPages.length > 0 && !showLibrary && pdfEntry && (
        <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-2 py-0.5 flex items-center gap-1 flex-wrap">
          <span className="text-[9px] text-yellow-500">★</span>
          {bookmarkedPages.map(p => (
            <button key={p} onClick={() => goToBookmark(p)}
              className={`px-1.5 py-0 rounded text-[9px] transition-colors ${p === currentPage ? "bg-yellow-800 text-yellow-200" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
              title={`Ir a página ${p}`}>
              p.{p}
            </button>
          ))}
        </div>
      )}

      {/* Búsqueda */}
      {showSearch && pdfEntry && (
        <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-2 py-1 flex items-center gap-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Buscar en el PDF..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-[11px] text-white"
          />
          <button onClick={doSearch}
            className="px-1.5 py-0.5 rounded bg-blue-700 hover:bg-blue-600 text-[10px] transition-colors"
            title="Buscar">Ir</button>
          {searchResults.length > 0 && (
            <div className="flex items-center gap-0.5">
              <button onClick={() => goToSearchResult(searchIndex - 1)}
                disabled={searchIndex <= 0}
                className="px-1 py-0 rounded bg-gray-700 hover:bg-gray-600 text-[9px] disabled:opacity-40"
                title="Resultado anterior">◀</button>
              <span className="text-[9px] text-gray-400">{searchIndex + 1}/{searchResults.length}</span>
              <button onClick={() => goToSearchResult(searchIndex + 1)}
                disabled={searchIndex >= searchResults.length - 1}
                className="px-1 py-0 rounded bg-gray-700 hover:bg-gray-600 text-[9px] disabled:opacity-40"
                title="Siguiente resultado">▶</button>
            </div>
          )}
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-2 py-0.5">
          <p className="text-[9px] text-gray-400 leading-relaxed">
            ...{searchResults[searchIndex]?.context}...
          </p>
        </div>
      )}

      {/* ERROR / MENSAJE */}
      {(uploadError || ocrMessage) && (
        <div className="flex-shrink-0 px-2 py-1 border-b text-[10px] flex items-center gap-1"
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
        <div className="flex-shrink-0 max-h-[30vh] overflow-y-auto bg-gray-900 border-b border-gray-800 p-2">
          <h3 className="text-xs font-bold text-cyan-300 mb-1">📚 Mis PDFs ({library.length})</h3>
          {library.length === 0 && (
            <p className="text-[10px] text-gray-500">No hay PDFs. Toca "Abrir" para subir uno.</p>
          )}
          <div className="space-y-1">
            {library.map(doc => (
              <div key={doc.id} className="flex items-center justify-between bg-gray-800 rounded px-2 py-1">
                <button onClick={() => loadFromLibrary(doc.id)}
                  className="text-[10px] text-gray-200 hover:text-cyan-300 truncate flex-1 text-left transition-colors"
                  title={`Abrir ${doc.name}`}>
                  📄 {doc.name}
                </button>
                <span className="text-[9px] text-gray-500 mr-1">{doc.totalPages}p</span>
                <span className="text-[9px] text-gray-600 mr-1">
                  {doc.size > 1048576 ? `${(doc.size / 1048576).toFixed(1)}MB` : `${(doc.size / 1024).toFixed(0)}KB`}
                </span>
                <button onClick={() => removeFromLibrary(doc.id)}
                  className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                  title="Eliminar PDF de la biblioteca">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN VIEWER */}
      <div className="flex-1 relative bg-black min-h-0"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={viewerRef}
        style={tool === TOOL_SELECT ? { overflow: 'auto' } : { overflow: 'hidden' }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="text-cyan-400 text-sm animate-pulse">Cargando PDF...</div>
          </div>
        )}

        {pdfObjectUrl && !loading && (
          <div className="absolute inset-0 overflow-auto bg-gray-900">
            <div className="relative" style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
              width: `${10000 / zoom}%`,
              height: `${10000 / zoom}%`
            }}>
              {/* Iframe con pointerEvents none cuando se dibuja/escribe */}
              <iframe
                key={currentPage}
                src={`${pdfObjectUrl}#page=${currentPage}`}
                className="w-full border-0"
                style={{
                  height: '100vh',
                  pointerEvents: (tool === TOOL_SELECT) ? 'auto' : 'none',
                  position: 'relative',
                  zIndex: 1
                }}
                title="PDF Viewer"
              />
              {/* Canvas superpuesto: dibujo, subrayado y texto sobre el PDF */}
              {tool !== TOOL_SELECT && (
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    pointerEvents: 'auto',
                    touchAction: 'none',
                    height: '100vh',
                    opacity: tool === TOOL_HIGHLIGHT ? 0.6 : 1.0,
                    zIndex: 10,
                    cursor: tool === TOOL_ERASER ? 'cell' : tool === TOOL_HIGHLIGHT ? 'crosshair' : tool === TOOL_TEXT ? 'text' : 'crosshair'
                  }}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={stopDraw}
                  onClick={handleCanvasClick}
                />
              )}
              {/* Anotaciones de texto renderizadas como divs sobre el canvas */}
              {textAnnotations.filter(a => a.page === currentPage).length > 0 && (
                <div className="absolute top-0 left-0 w-full" style={{ zIndex: 15, pointerEvents: 'none', height: '100vh' }}>
                  {textAnnotations.filter(a => a.page === currentPage).map(a => (
                    <div key={a.id}
                      style={{
                        position: 'absolute',
                        left: a.x + 'px',
                        top: a.y + 'px',
                        color: a.color,
                        fontSize: a.fontSize + 'px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        textShadow: '0 0 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.6)',
                        pointerEvents: 'auto',
                        zIndex: 20,
                        cursor: 'default',
                        whiteSpace: 'pre-wrap',
                        background: a.text ? 'rgba(0,0,0,0.3)' : 'transparent',
                        padding: '2px 4px',
                        borderRadius: '2px'
                      }}>
                      {a.id === activeTextId ? (
                        <span style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          <input
                            ref={a.id === activeTextId ? textInputRef : null}
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') { saveTextAnnotation(a.id); }
                              if (e.key === 'Escape') { setActiveTextId(null); setTextInputPos(null); }
                            }}
                            className="bg-gray-900 border border-cyan-500 rounded px-1 py-0 text-white"
                            style={{ fontSize: a.fontSize + 'px', width: '150px', pointerEvents: 'auto' }}
                            autoFocus
                            placeholder="Escribe aquí..."
                          />
                          <button onClick={() => saveTextAnnotation(a.id)}
                            className="text-[10px] bg-green-700 px-1 py-0 rounded"
                            title="Guardar texto">✓</button>
                          <button onClick={() => setActiveTextId(null)}
                            className="text-[10px] bg-red-700 px-1 py-0 rounded"
                            title="Cancelar">✕</button>
                        </span>
                      ) : (
                        <span onClick={() => {
                          setActiveTextId(a.id);
                          setEditingText(a.text);
                        }}
                          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                          title="Clic para editar">
                          {a.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
        <div className="flex-shrink-0 max-h-[25vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-amber-300">📖 Vocab ({vocab.length})</h3>
            <div className="flex gap-1">
              <button onClick={addAllToSrs}
                className="px-1.5 py-0 rounded bg-green-700 hover:bg-green-600 text-[9px] transition-colors"
                title="Añadir todo el vocabulario al sistema SRS">
                + Todas al SRS
              </button>
              <button onClick={() => setShowVocab(false)}
                className="text-[9px] text-gray-500 hover:text-gray-300">Cerrar</button>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-0.5">
            {vocab.map((v, i) => (
              <div key={i} className="text-[10px] bg-gray-800 rounded px-1.5 py-0.5 text-gray-200 flex items-center justify-between gap-0.5">
                <span className="truncate flex-1" title={v.word}>
                  {v.word}
                  <span className="text-gray-500 ml-0.5">({v.count})</span>
                </span>
                <button onClick={() => addWordToSrs(v)}
                  className="text-[9px] text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                  title={"Añadir '" + v.word + "' al SRS"}>+</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUMMARY PANEL */}
      {showSummary && summaryText && (
        <div className="flex-shrink-0 max-h-[20vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-2">
          <h3 className="text-xs font-bold text-emerald-300 mb-0.5">🤖 Resumen IA</h3>
          <p className="text-[10px] text-gray-300 whitespace-pre-wrap">{summaryText}</p>
          <button onClick={() => setShowSummary(false)} className="text-[9px] text-gray-500 mt-0.5 hover:text-gray-300">Cerrar</button>
        </div>
      )}

      {/* NOTES */}
      {pdfEntry && (
        <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900 p-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[9px] text-gray-500">📝 p.{currentPage}</span>
          </div>
          <textarea
            id="pdf-typed-notes"
            defaultValue={notes.typed}
            onChange={(e) => saveTypedNotes(e.target.value)}
            placeholder="Escribe notas sobre esta página..."
            className="w-full bg-gray-800 border border-gray-700 rounded p-1.5 text-[11px] text-white resize-none"
            rows={2}
          />
        </div>
      )}
    </div>
  );
};