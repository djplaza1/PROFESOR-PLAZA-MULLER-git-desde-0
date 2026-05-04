// ==================================================
// src/features/pdfstudy/pdfstudyHelpers.jsx
// Lógica PDF Study – PDF.js + OCR Tesseract + DeepSeek IA
// Almacenamiento: IndexedDB (PDFs binarios) + localStorage (metadatos)
// Sin límite de tamaño — IndexedDB soporta GBs
// ==================================================
window.Muller = window.Muller || {};
window.Muller.PdfStudy = (function() {
  const DB_NAME = 'MullerPdfStudy';
  const DB_VERSION = 1;
  const STORE_NAME = 'pdfBlobs';
  const LIBRARY_KEY = 'muller_pdf_study_library_v2';
  const NOTES_KEY = 'muller_pdf_study_notes_v2';

  // ---- INDEXEDDB: abrir BD ----
  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  // ---- INDEXEDDB: guardar blob ----
  async function saveBlobToIndexedDB(id, blob) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ id, blob });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }

  // ---- INDEXEDDB: obtener blob ----
  async function getBlobFromIndexedDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(id);
      req.onsuccess = (e) => {
        db.close();
        resolve(e.target.result ? e.target.result.blob : null);
      };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }

  // ---- INDEXEDDB: eliminar blob ----
  async function deleteBlobFromIndexedDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }

  // ---- INDEXEDDB: limpiar toda la BD ----
  async function clearAllBlobs() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  }

  // ---- LOCALSTORAGE: metadatos de biblioteca ----
  function getLibrary() {
    try {
      const r = localStorage.getItem(LIBRARY_KEY);
      return r ? JSON.parse(r) : [];
    } catch(e) { return []; }
  }

  function saveLibrary(lib) {
    try {
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(lib));
    } catch(e) {
      console.warn('localStorage full for library metadata', e);
    }
  }

  // ---- AÑADIR PDF (File/Blob → IndexedDB, metadatos → localStorage) ----
  async function addPdfToLibrary(file) {
    // Guardar blob en IndexedDB (sin límite de tamaño)
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const blob = file; // File es un Blob

    await saveBlobToIndexedDB(id, blob);

    const entry = {
      id,
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      addedAt: new Date().toISOString(),
      totalPages: 1,
      detectedLevel: null,
      summary: null,
      vocabCount: 0
    };

    const library = getLibrary();
    library.push(entry);
    saveLibrary(library);

    return entry;
  }

  // ---- ELIMINAR PDF (IndexedDB + localStorage) ----
  async function removePdfFromLibrary(id) {
    const lib = getLibrary().filter(e => e.id !== id);
    saveLibrary(lib);
    await deleteBlobFromIndexedDB(id);

    // Limpiar notas
    const notes = getAllNotes();
    delete notes[id];
    saveAllNotes(notes);
  }

  // ---- OBTENER PDF por ID (solo metadatos) ----
  function getPdfById(id) {
    return getLibrary().find(e => e.id === id) || null;
  }

  // ---- CARGAR PDF como ArrayBuffer (desde IndexedDB) ----
  async function loadPdfAsArrayBuffer(id) {
    const blob = await getBlobFromIndexedDB(id);
    if (!blob) return null;
    return await blob.arrayBuffer();
  }

  // ---- CARGAR PDF como URL de objeto (para iframe/embed) ----
  async function loadPdfAsObjectUrl(id) {
    const blob = await getBlobFromIndexedDB(id);
    if (!blob) return null;
    // Crear URL de objeto (revocable con revokeObjectUrl)
    return URL.createObjectURL(blob);
  }

  function revokeObjectUrl(url) {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }

  // ---- PDF.JS: Extraer texto real de un PDF ----
  let pdfjsWorkerReady = false;
  async function ensurePdfjs() {
    if (!window.pdfjsLib) {
      return new Promise((resolve) => {
        const check = () => {
          if (window.pdfjsLib) {
            if (!pdfjsWorkerReady) {
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              pdfjsWorkerReady = true;
            }
            resolve(true);
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
    }
    if (!pdfjsWorkerReady) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      pdfjsWorkerReady = true;
    }
    return true;
  }

  async function extractTextFromPdf(arrayBuffer) {
    try {
      await ensurePdfjs();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
  }

  // ---- OCR con Tesseract.js ----
  async function runOcrOnPdfPage(canvas) {
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
  }

  // ---- DeepSeek IA ----
  async function deepSeekCall(prompt, systemPrompt) {
    try {
      const apiKey = (window.Muller.storage?.get?.('muller_deepseek_key_v1') || '');
      if (!apiKey) return null;

      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt || "Eres un asistente útil para aprender alemán." },
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
  }

  async function generateSummary(text, level) {
    const prompt = `Resume el siguiente texto en alemán nivel ${level || 'B1'}. 
Máximo 5 oraciones. Identifica el tema principal y 3 palabras clave.

TEXTO: ${text.slice(0, 3000)}`;
    return await deepSeekCall(prompt, "Eres un profesor de alemán que genera resúmenes adaptados al nivel del estudiante.");
  }

  async function generateVocab(text) {
    const prompt = `Extrae hasta 10 palabras de vocabulario relevantes del siguiente texto en alemán.
Para cada palabra dame: palabra, traducción al español, nivel (A1-C1).

TEXTO: ${text.slice(0, 3000)}`;
    return await deepSeekCall(prompt, "Eres un lexicógrafo especializado en alemán como lengua extranjera (DaF).");
  }

  async function generateTelcQuestions(text) {
    const prompt = `Genera 3 preguntas de comprensión lectora tipo TELC B1-B2 sobre el siguiente texto en alemán.
Cada pregunta debe tener 3 opciones (A, B, C) e indicar la respuesta correcta.

TEXTO: ${text.slice(0, 3000)}`;
    return await deepSeekCall(prompt, "Eres un examinador TELC que crea ejercicios de lectura.");
  }

  // ---- NOTAS ----
  function getAllNotes() {
    try { const r = localStorage.getItem(NOTES_KEY); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  }

  function saveAllNotes(notes) {
    try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); } catch(e) {}
  }

  function getPageNotes(pdfId, page) {
    const all = getAllNotes();
    const docNotes = all[pdfId] || {};
    return docNotes[String(page)] || { drawing: "", typed: "", highlights: [] };
  }

  function savePageNotes(pdfId, page, notes) {
    const all = getAllNotes();
    if (!all[pdfId]) all[pdfId] = {};
    all[pdfId][String(page)] = { ...getPageNotes(pdfId, page), ...notes };
    saveAllNotes(all);
  }

  // ---- SRS: Vocabulario del PDF integrado con SRS global ----
  function addVocabToSrs(words) {
    const srs = window.Muller.SRS || {};
    if (srs.addWords) {
      srs.addWords(words.map(w => ({
        word: w.word,
        definition: w.translation || '',
        source: 'PDF Study',
        addedAt: Date.now()
      })));
    }
  }

  // ---- UTILIDADES ----
  const stopWords = new Set([
    "der","die","das","und","oder","aber","denn","doch","nicht","ein","eine","einer","einem","einen",
    "ich","du","er","sie","es","wir","ihr","man","mit","von","zu","im","in","am","an","auf","ist",
    "sind","war","waren","hat","haben","sein","wie","auch","nur","schon","noch","bei","nach","vor",
    "dass","wenn","weil","dann","da","hier","dort","heute","jetzt","mehr","sehr","alles","noch",
    "ab","als","aus","bei","bis","durch","für","gegen","ohne","um","über","unter","vor","zwischen"
  ]);

  function extractVocab(text) {
    const words = text.toLowerCase().replace(/[^a-zäöüß0-9\s]/gi," ").split(/\s+/).filter(w => w.length > 1);
    const freq = {};
    words.forEach(w => { if (!stopWords.has(w) && isNaN(w)) freq[w] = (freq[w]||0)+1; });
    return Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,30).map(([word,count]) => ({word,count}));
  }

  function cleanText(s) { return String(s||"").replace(/\s+/g," ").trim(); }

  // ---- API pública ----
  return {
    getLibrary,
    saveLibrary,
    addPdfToLibrary,
    removePdfFromLibrary,
    getPdfById,
    loadPdfAsArrayBuffer,
    loadPdfAsObjectUrl,
    revokeObjectUrl,
    ensurePdfjs,
    extractTextFromPdf,
    runOcrOnPdfPage,
    deepSeekCall,
    generateSummary,
    generateVocab,
    generateTelcQuestions,
    getAllNotes,
    saveAllNotes,
    getPageNotes,
    savePageNotes,
    addVocabToSrs,
    extractVocab,
    cleanText,
    stopWords,
    clearAllBlobs,
    _ocrProgress: 0
  };
})();