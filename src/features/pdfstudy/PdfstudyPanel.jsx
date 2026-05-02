// ==================================================
// src/features/pdfstudy/PdfstudyPanel.jsx
// Panel principal PDF Study – Premium
// ==================================================
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.PdfstudyPanel = {
  name: "pdfstudy",
  title: "PDF Study",
  icon: "📄",

  init() {
    this.state = {
      pdfEntry: null,
      pdfBlobUrl: null,
      currentPage: 1,
      totalPages: 1,
      zoom: 1.0,
      notes: { drawing: "", typed: "" },
      vocab: [],
      library: window.Muller.PdfStudy.getLibrary(),
      showLibrary: true,
      showVocabPanel: false,
    };
    this.canvasRef = null;
    this.iframeRef = null;
    this.render();
    this.bindEvents();
  },

  render() {
    const container = document.getElementById("panel-content");
    if (!container) return;
    container.innerHTML = this.getHTML();
    this.afterRender();
  },

  getHTML() {
    const { pdfEntry, currentPage, totalPages, zoom, notes, vocab, library, showLibrary, showVocabPanel } = this.state;
    return `
      <div class="flex flex-col h-full bg-gray-950 text-white">
        <!-- Header / Toolbar -->
        <div class="flex-shrink-0 px-3 py-2 border-b border-gray-800 bg-gray-900 flex items-center gap-2 flex-wrap">
          <span class="text-sm font-bold text-cyan-400">📄 PDF Study</span>
          <button id="pdf-open-btn" class="px-2 py-1 rounded bg-cyan-700 hover:bg-cyan-600 text-xs font-semibold">Abrir PDF</button>
          <button id="pdf-library-btn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs ${showLibrary ? 'ring-1 ring-cyan-400' : ''}">Biblioteca</button>
          ${pdfEntry ? `
            <span class="text-xs text-gray-400 ml-2 truncate max-w-[140px]">${pdfEntry.name}</span>
            <button id="pdf-prev-btn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs" ${currentPage <= 1 ? 'disabled' : ''}>◀</button>
            <span class="text-xs text-gray-300">${currentPage}/${totalPages}</span>
            <button id="pdf-next-btn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs" ${currentPage >= totalPages ? 'disabled' : ''}>▶</button>
            <button id="pdf-zoom-out-btn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs">−</button>
            <span class="text-xs text-gray-300 w-10 text-center">${Math.round(zoom * 100)}%</span>
            <button id="pdf-zoom-in-btn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs">+</button>
            <button id="pdf-vocab-btn" class="px-2 py-1 rounded bg-amber-700 hover:bg-amber-600 text-xs ${showVocabPanel ? 'ring-1 ring-amber-400' : ''}">📖 Vocab</button>
            <button id="pdf-ocr-btn" class="px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-xs">🔍 OCR</button>
            <button id="pdf-clear-notes-btn" class="px-2 py-1 rounded bg-red-800 hover:bg-red-700 text-xs">🗑 Dibujo</button>
          ` : ''}
        </div>

        <!-- Biblioteca -->
        ${showLibrary ? `
          <div id="pdf-library-panel" class="flex-shrink-0 max-h-[40vh] overflow-y-auto bg-gray-900 border-b border-gray-800 p-3 space-y-2">
            <h3 class="text-xs font-bold text-cyan-300 mb-2">📚 Mis PDFs</h3>
            ${library.length === 0 ? '<p class="text-xs text-gray-500">No hay PDFs. Abre uno para empezar.</p>' : ''}
            ${library.map(doc => `
              <div class="flex items-center justify-between bg-gray-800 rounded p-2">
                <button class="pdf-library-item text-xs text-gray-200 hover:text-cyan-300 truncate flex-1 text-left" data-id="${doc.id}">📄 ${doc.name}</button>
                <button class="pdf-library-remove text-xs text-red-400 hover:text-red-300 ml-2" data-id="${doc.id}">✕</button>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Área de visualización -->
        <div class="flex-1 relative bg-black min-h-0">
          ${pdfEntry && this.state.pdfBlobUrl ? `
            <div id="pdf-viewer-area" class="absolute inset-0 overflow-auto" style="background:#222;">
              <div style="width:${100 * zoom}%; height:${100 * zoom}%; position:relative;">
                <iframe id="pdf-iframe" src="${this.state.pdfBlobUrl}#page=${currentPage}&view=FitH" class="w-full h-full border-0"></iframe>
                <canvas id="pdf-annotate-canvas" class="absolute top-0 left-0 w-full h-full" style="pointer-events:auto; touch-action:none;"></canvas>
              </div>
            </div>
          ` : `
            <div class="flex items-center justify-center h-full text-gray-500 text-sm">
              Abre un PDF para empezar a estudiar.
            </div>
          `}
        </div>

        <!-- Panel de vocabulario -->
        ${showVocabPanel ? `
          <div class="flex-shrink-0 max-h-[35vh] overflow-y-auto bg-gray-900 border-t border-gray-800 p-3">
            <h3 class="text-xs font-bold text-amber-300 mb-2">📖 Vocabulario extraído</h3>
            ${vocab.length === 0 ? '<p class="text-xs text-gray-500">Haz clic en OCR para extraer vocabulario.</p>' : ''}
            <div class="grid grid-cols-2 gap-1">
              ${vocab.map(v => `<span class="text-xs bg-gray-800 rounded px-2 py-1 text-gray-200">${v.word} (${v.count})</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Notas de teclado -->
        ${pdfEntry ? `
          <div class="flex-shrink-0 border-t border-gray-800 bg-gray-900 p-2">
            <textarea id="pdf-typed-notes" placeholder="Notas de esta página..." class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs text-white resize-none" rows="2">${notes.typed || ''}</textarea>
          </div>
        ` : ''}
      </div>
    `;
  },

  afterRender() {
    if (this.state.pdfEntry) {
      this.setupCanvas();
    }
    if (this.state.showLibrary) {
      this.bindLibraryEvents();
    }
    this.scrollToPage();
  },

  bindEvents() {
    document.getElementById("pdf-open-btn")?.addEventListener("click", () => this.openPdfDialog());
    document.getElementById("pdf-library-btn")?.addEventListener("click", () => {
      this.state.showLibrary = !this.state.showLibrary;
      this.render();
    });
    document.getElementById("pdf-prev-btn")?.addEventListener("click", () => this.changePage(-1));
    document.getElementById("pdf-next-btn")?.addEventListener("click", () => this.changePage(1));
    document.getElementById("pdf-zoom-in-btn")?.addEventListener("click", () => this.changeZoom(0.2));
    document.getElementById("pdf-zoom-out-btn")?.addEventListener("click", () => this.changeZoom(-0.2));
    document.getElementById("pdf-ocr-btn")?.addEventListener("click", () => this.runOcr());
    document.getElementById("pdf-vocab-btn")?.addEventListener("click", () => {
      this.state.showVocabPanel = !this.state.showVocabPanel;
      this.render();
    });
    document.getElementById("pdf-clear-notes-btn")?.addEventListener("click", () => this.clearCanvas());
    const typedNotes = document.getElementById("pdf-typed-notes");
    typedNotes?.addEventListener("input", (e) => {
      this.saveTypedNotes(e.target.value);
    });
    // Delegación de eventos para biblioteca (se bindea en afterRender)
  },

  bindLibraryEvents() {
    document.querySelectorAll(".pdf-library-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.loadPdfFromLibrary(id);
      });
    });
    document.querySelectorAll(".pdf-library-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        window.Muller.PdfStudy.removePdfFromLibrary(id);
        this.state.library = window.Muller.PdfStudy.getLibrary();
        this.render();
      });
    });
  },

  openPdfDialog() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const entry = await window.Muller.PdfStudy.addPdfToLibrary(file);
        this.state.library = window.Muller.PdfStudy.getLibrary();
        this.loadPdfEntry(entry);
      } catch(err) {
        alert(err.message);
      }
    };
    input.click();
  },

  loadPdfFromLibrary(id) {
    const entry = window.Muller.PdfStudy.getPdfById(id);
    if (entry) {
      this.loadPdfEntry(entry);
    }
  },

  loadPdfEntry(entry) {
    const blob = this.base64ToBlob(entry.data, "application/pdf");
    if (this.state.pdfBlobUrl) URL.revokeObjectURL(this.state.pdfBlobUrl);
    const url = URL.createObjectURL(blob);
    this.state.pdfEntry = entry;
    this.state.pdfBlobUrl = url;
    this.state.currentPage = 1;
    this.state.totalPages = entry.pages?.length || 1; // Se podría calcular con pdf.js, simplificamos a 1 inicial
    this.state.notes = window.Muller.PdfStudy.getPageNotes(entry.id, 1);
    this.state.zoom = 1.0;
    this.state.showLibrary = false;
    this.render();
  },

  base64ToBlob(b64, mimeType) {
    const byteChars = atob(b64);
    const byteArrays = [];
    for (let offset = 0; offset < byteChars.length; offset += 512) {
      const slice = byteChars.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: mimeType });
  },

  changePage(delta) {
    const newPage = this.state.currentPage + delta;
    if (newPage < 1 || newPage > this.state.totalPages) return;
    this.state.currentPage = newPage;
    // Guardar notas de la página anterior
    if (this.state.pdfEntry) {
      window.Muller.PdfStudy.savePageNotes(this.state.pdfEntry.id, this.state.currentPage - delta, this.state.notes);
    }
    // Cargar notas de la nueva página
    this.state.notes = this.state.pdfEntry
      ? window.Muller.PdfStudy.getPageNotes(this.state.pdfEntry.id, newPage)
      : { drawing: "", typed: "" };
    this.render();
  },

  changeZoom(delta) {
    this.state.zoom = Math.max(0.3, Math.min(3.0, this.state.zoom + delta));
    this.render();
  },

  scrollToPage() {
    // El iframe maneja la página, no necesitamos scroll extra
  },

  // ------ Canvas de anotación ------
  setupCanvas() {
    setTimeout(() => {
      const canvas = document.getElementById("pdf-annotate-canvas");
      if (!canvas) return;
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      this.canvasRef = canvas;
      this.ctx = canvas.getContext("2d");
      this.drawing = false;

      // Cargar dibujo guardado
      const saved = this.state.notes.drawing;
      if (saved) {
        const img = new Image();
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0);
        };
        img.src = saved;
      }

      // Eventos de dibujo
      canvas.onmousedown = (e) => this.startDraw(e);
      canvas.onmousemove = (e) => this.draw(e);
      canvas.onmouseup = () => this.stopDraw();
      canvas.onmouseleave = () => this.stopDraw();
      canvas.ontouchstart = (e) => { e.preventDefault(); this.startDraw(e.touches[0]); };
      canvas.ontouchmove = (e) => { e.preventDefault(); this.draw(e.touches[0]); };
      canvas.ontouchend = () => this.stopDraw();
    }, 200);
  },

  startDraw(e) {
    this.drawing = true;
    this.ctx.beginPath();
    const rect = this.canvasRef.getBoundingClientRect();
    this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  },

  draw(e) {
    if (!this.drawing) return;
    const rect = this.canvasRef.getBoundingClientRect();
    this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    this.ctx.strokeStyle = "#06b6d4";
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.stroke();
  },

  stopDraw() {
    if (!this.drawing) return;
    this.drawing = false;
    this.ctx.closePath();
    this.saveDrawing();
  },

  saveDrawing() {
    if (this.canvasRef && this.state.pdfEntry) {
      const dataUrl = this.canvasRef.toDataURL();
      this.state.notes.drawing = dataUrl;
      window.Muller.PdfStudy.savePageNotes(this.state.pdfEntry.id, this.state.currentPage, this.state.notes);
    }
  },

  clearCanvas() {
    if (this.ctx && this.canvasRef) {
      this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      this.state.notes.drawing = "";
      if (this.state.pdfEntry) {
        window.Muller.PdfStudy.savePageNotes(this.state.pdfEntry.id, this.state.currentPage, this.state.notes);
      }
    }
  },

  saveTypedNotes(text) {
    this.state.notes.typed = text;
    if (this.state.pdfEntry) {
      window.Muller.PdfStudy.savePageNotes(this.state.pdfEntry.id, this.state.currentPage, this.state.notes);
    }
  },

  // ------ OCR simulado y vocabulario ------
  runOcr() {
    // Aquí simulamos OCR; en una versión real se usaría Tesseract.js o una API
    const sampleTexts = [
      "Deutsch lernen macht Spaß. Der Junge liest ein Buch. Die Lampe ist schön.",
      "Ich wohne in einem großen Haus. Meine Familie ist sehr nett.",
      "Guten Morgen! Heute ist ein schöner Tag. Wir gehen spazieren."
    ];
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    this.state.notes.typed = (this.state.notes.typed ? this.state.notes.typed + "\n" : "") + "[OCR] " + text;
    if (this.state.pdfEntry) {
      window.Muller.PdfStudy.savePageNotes(this.state.pdfEntry.id, this.state.currentPage, this.state.notes);
    }
    this.state.vocab = window.Muller.PdfStudy.extractVocab(text);
    this.state.showVocabPanel = true;
    this.render();
  }
};