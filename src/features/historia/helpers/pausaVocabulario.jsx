window.Muller.PausaVocabulario = (() => {
  const speak = window.Muller.speakGermanWord;

  async function pronunciarPalabrasMarcadas(palabrasMarcadas, tiempoEntrePalabras = 1200) {
    if (!palabrasMarcadas || palabrasMarcadas.length === 0) return;
    for (const palabra of palabrasMarcadas) {
      await new Promise(resolve => {
        speak(palabra);
        setTimeout(resolve, tiempoEntrePalabras);
      });
    }
    return true;
  }

  return { pronunciarPalabrasMarcadas };
})();