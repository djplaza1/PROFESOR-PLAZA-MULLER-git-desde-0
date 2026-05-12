// rutaAudio.js – Síntesis de voz para ejercicios de Ruta
const RutaAudio = {
  speak(text, lang = "de-DE") {
    if (!("speechSynthesis" in window)) {
      console.warn("SpeechSynthesis no soportada");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
};
window.RutaAudio = RutaAudio;