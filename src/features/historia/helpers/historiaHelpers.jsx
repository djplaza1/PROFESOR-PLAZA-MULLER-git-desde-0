// ═══════════════════════════════════════════════════
// HISTORIA HELPERS – Funciones compartidas
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.HistoriaHelpers = {
  sanitizeHistoriaSpeechText: function(text) {
    return String(text || '')
      .replace(/\[R\]/gi, '')
      .replace(/\bN[üu]tzlich\b\.?/gi, '')
      .replace(/\b[ÚU]TIL\b\.?/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
};