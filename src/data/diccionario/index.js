PARA // ═══════════════════════════════════════════════════
// DICCIONARIO COMPLETO – Goethe Wortliste A1→C2
// + verbos irregulares + verbos con preposición fija
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Dict = window.Muller.Dict || {};

// Cargar cada nivel (se añaden a window.Muller.Dict)
// Orden de carga: A1 → A2 → B1 → B2 → C1 → C2

// Cada archivo añade:
//   window.Muller.Dict.palabras  → array de { de, es, nivel, tipo, genero?, plural? }
//   window.Muller.Dict.verbos    → array de { infinitiv, praeteritum, perfekt, hilfsverb, nivel }
//   window.Muller.Dict.prepVerbos → array de { infinitiv, preposicion, caso, es, nivel }