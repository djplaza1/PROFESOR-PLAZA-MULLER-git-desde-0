// ==================================================
// src/features/pdfstudy/pdfstudyHelpers.jsx
// Lógica PDF Study – biblioteca, notas, OCR, vocabulario
// ==================================================
window.Muller = window.Muller || {};
window.Muller.PdfStudy = {
  LIBRARY_KEY: "muller_pdf_study_library_v1",
  NOTES_KEY: "muller_pdf_study_notes_v1",
  VOCAB_KEY: "muller_pdf_study_vocab_v1",

  getLibrary() {
    try { const r = localStorage.getItem(this.LIBRARY_KEY); return r ? JSON.parse(r) : []; } catch(e) { return []; }
  },
  saveLibrary(lib) {
    try { localStorage.setItem(this.LIBRARY_KEY, JSON.stringify(lib)); } catch(e) {}
  },
  addPdfToLibrary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        if (base64.length > 2 * 1024 * 1024) {
          reject(new Error("PDF demasiado grande (máx. ~2 MB en base64)."));
          return;
        }
        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: file.name,
          size: file.size,
          data: base64,
          addedAt: new Date().toISOString(),
          pages: []
        };
        const library = this.getLibrary();
        library.push(entry);
        this.saveLibrary(library);
        resolve(entry);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
  removePdfFromLibrary(id) {
    const lib = this.getLibrary().filter(e => e.id !== id);
    this.saveLibrary(lib);
    const notes = this.getAllNotes();
    delete notes[id];
    this.saveAllNotes(notes);
  },
  getPdfById(id) {
    return this.getLibrary().find(e => e.id === id) || null;
  },

  getAllNotes() {
    try { const r = localStorage.getItem(this.NOTES_KEY); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  },
  saveAllNotes(notes) {
    try { localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes)); } catch(e) {}
  },
  getPageNotes(pdfId, page) {
    const all = this.getAllNotes();
    const docNotes = all[pdfId] || {};
    return docNotes[String(page)] || { drawing: "", typed: "" };
  },
  savePageNotes(pdfId, page, notes) {
    const all = this.getAllNotes();
    if (!all[pdfId]) all[pdfId] = {};
    all[pdfId][String(page)] = { ...this.getPageNotes(pdfId, page), ...notes };
    this.saveAllNotes(all);
  },

  stopWords: new Set([
    "der","die","das","und","oder","aber","denn","doch","nicht","ein","eine","einer","einem","einen",
    "ich","du","er","sie","es","wir","ihr","man","mit","von","zu","im","in","am","an","auf","ist",
    "sind","war","waren","hat","haben","sein","wie","auch","nur","schon","noch","bei","nach","vor",
    "dass","wenn","weil","dann","da","hier","dort","heute","jetzt","mehr","sehr","alles","noch",
    "ab","als","aus","bei","bis","durch","für","gegen","ohne","um","über","unter","vor","zwischen"
  ]),
  extractVocab(text) {
    const words = text.toLowerCase().replace(/[^a-zäöüß0-9\s]/gi," ").split(/\s+/).filter(w => w.length > 1);
    const freq = {};
    words.forEach(w => { if (!this.stopWords.has(w) && isNaN(w)) freq[w] = (freq[w]||0)+1; });
    return Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,30).map(([word,count]) => ({word,count}));
  },
  cleanText(s) { return String(s||"").replace(/\s+/g," ").trim(); },
  simulateOcr(text) { return this.cleanText(text); }
};