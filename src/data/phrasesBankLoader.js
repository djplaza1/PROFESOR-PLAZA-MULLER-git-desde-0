// Cargador de frases de nivel
// Combina los archivos JSON de frases en window.PhrasesBank

const LEVEL_FILES = [
  { level: 'A1.1', file: 'src/data/phrasesBank_A1.1.json' },
  { level: 'A1.2', file: 'src/data/phrasesBank_A1.2.json' },
  { level: 'A2.1', file: 'src/data/phrasesBank_A2.1.json' },
  { level: 'A2.2', file: 'src/data/phrasesBank_A2.2.json' }
];

async function loadPhrasesBank() {
  const bank = {};
  for (const entry of LEVEL_FILES) {
    try {
      const response = await fetch(entry.file);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const json = await response.json();
      Object.assign(bank, json);
      // También guardar por nivel para el generador
      bank[entry.level] = json;
      console.log("Frases cargadas para " + entry.level + " (" + Object.keys(json).length + " palabras)");
    } catch (err) {
      console.warn("No se pudo cargar " + entry.file + ": " + err.message);
    }
  }
  window.PhrasesBank = bank;
  console.log("PhrasesBank total: " + Object.keys(bank).length + " palabras");
  return bank;
}

// Auto-cargar al iniciar
loadPhrasesBank();
