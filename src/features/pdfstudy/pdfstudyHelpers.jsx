// ==================================================
// src/features/pdfstudy/pdfstudyHelpers.jsx
// Lógica PDF Study – PDF.js real + OCR Tesseract + DeepSeek IA
// ==================================================
window.Muller = window.Muller || {};
window.Muller.PdfStudy = {
  LIBRARY_KEY: "muller_pdf_study_library_v1",
  NOTES_KEY: "muller_pdf_study_notes_v1",
  VOCAB_KEY: "muller_pdf_study_vocab_v1",
  SRS_KEY: "muller_pdf_study_srs_v1",

  // ---- BIBLIOTECA ----
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
        if (base64.length > 4 * 1024 * 1024) {
          reject(new Error("PDF demasiado grande (máx. ~4 MB en base64)."));
          return;
        }
        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: file.name,
          size: file.size,
          data: base64,
          addedAt: new Date().toISOString(),
          totalPages: 1,
          detectedLevel: null,
          summary: null,
          vocabCount: 0
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
    // Limpiar notas
    const notes = this.getAllNotes();
    delete notes[id];
    this.saveAllNotes(notes);
  },
  getPdfById(id) {
    return this.getLibrary().find(e => e.id === id) || null;
  },

  // ---- PDF.JS: Extractar texto real de un PDF ----
  pdfjsWorkerReady: false,
  async ensurePdfjs() {
    if (!window.pdfjsLib) {
      // Esperar a que cargue PDF.js (CDN)
      return new Promise((resolve) => {
        const check = () => {
          if (window.pdfjsLib) {
            if (!this.pdfjsWorkerReady) {
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              this.pdfjsWorkerReady = true;
            }
            resolve(true);
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
    }
    if (!this.pdfjsWorkerReady) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      this.pdfjsWorkerReady = true;
    }
    return true;
  },
  
  async extractTextFromPdf(base64Data) {
    try {
      await this.ensurePdfjs();
      const binaryStr = atob(base64Data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
      
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const totalPages = pdf.numPages;
      const pageTexts = [];
      
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map(item => item.str).join(' ');
        pageTexts.push({ page: i, text });
      }
      
      return { totalPages, pageTexts, fullText: pageTexts.map(p => p.text).join('\n') };
    } catch(e) {
      console.warn("PDF.js extraction failed:", e);
      return { totalPages: 1, pageTexts: [{ page: 1, text: "" }], fullText: "" };
    }
  },

  // ---- OCR con Tesseract.js ----
  async runOcrOnPdfPage(canvas) {
    try {
      if (!window.Tesseract) {
        console.warn("Tesseract.js no cargado");
        return "";
      }
      const result = await Tesseract.recognize(canvas, 'deu+spa+eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            window.Muller.PdfStudy._ocrProgress = Math.round(m.progress * 100);
          }
        }
      });
      return result.data.text;
    } catch(e) {
      console.warn("OCR failed:", e);
      return "";
    }
  },

  // ---- DeepSeek IA: resumen, análisis, vocabulario ----
  async deepSeekCall(prompt, systemPrompt = "Eres un asistente útil para aprender alemán.") {
    try {
      const apiKey = window.Muller.storage?.get?.('muller_deepseek_key_v1') || '';
      if (!apiKey) return null;
      
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } catch(e) {
      console.warn("DeepSeek call failed:", e);
      return null;
    }
  },

  // Generar resumen del PDF en alemán nivel adaptado
  async generateSummary(text, level) {
    const prompt = `Resume el siguiente texto en alemán nivel ${level || 'B1'}. 
Máximo 5 oraciones. Identifica el tema principal y 3 palabras clave.

TEXTO: ${text.slice(0, 3000)}`;
    return await this.deepSeekCall(prompt, "Eres un profesor de alemán que genera resúmenes adaptados al nivel del estudiante.");
  },

  // Extraer vocabulario relevante del texto
  async generateVocab(text) {
    const prompt = `Extrae hasta 10 palabras de vocabulario relevantes del siguiente texto en alemán.
Para cada palabra dame: palabra, traducción al español, nivel (A1-C1).

TEXTO: ${text.slice(0, 3000)}`;
    return await this.deepSeekCall(prompt, "Eres un lexicógrafo especializado en alemán como lengua extranjera (DaF).");
  },

  // Generar preguntas de comprensión tipo TELC
  async generateTelcQuestions(text) {
    const prompt = `Genera 3 preguntas de comprensión lectora tipo TELC B1-B2 sobre el siguiente texto en alemán.
Cada pregunta debe tener 3 opciones (A, B, C) e indicar la respuesta correcta.

TEXTO: ${text.slice(0, 3000)}`;
    return await this.deepSeekCall(prompt, "Eres un examinador TELC que crea ejercicios de lectura.");
  },

  // ---- NOTAS ----
  getAllNotes() {
    try { const r = localStorage.getItem(this.NOTES_KEY); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  },
  saveAllNotes(notes) {
    try { localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes)); } catch(e) {}
  },
  getPageNotes(pdfId, page) {
    const all = this.getAllNotes();
    const docNotes = all[pdfId] || {};
    return docNotes[String(page)] || { drawing: "", typed: "", highlights: [] };
  },
  savePageNotes(pdfId, page, notes) {
    const all = this.getAllNotes();
    if (!all[pdfId]) all[pdfId] = {};
    all[pdfId][String(page)] = { ...this.getPageNotes(pdfId, page), ...notes };
    this.saveAllNotes(all);
  },

  // ---- SRS: Vocabulario del PDF integrado con SRS global ----
  addVocabToSrs(words) {
    const srs = window.Muller.SRS || {};
    if (srs.addWords) {
      srs.addWords(words.map(w => ({
        word: w.word,
        definition: w.translation || '',
        source: 'PDF Study',
        addedAt: Date.now()
      })));
    }
  },

  // ---- UTILIDADES ----
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
  cleanText(s) { return String(s||"").replace(/\s+/g," ").trim(); }
};