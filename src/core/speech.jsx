(function() {
  const M = window.Muller = window.Muller || {};
  const { get, set, remove, getRaw, setRaw } = M.storage;

  M.getPreferredDeVoice = () => getRaw('muller_tts_de', '');
  M.setPreferredDeVoice = v => v ? setRaw('muller_tts_de', v) : remove('muller_tts_de');
  M.getPreferredEsVoice = () => getRaw('muller_tts_es', '');
  M.setPreferredEsVoice = v => v ? setRaw('muller_tts_es', v) : remove('muller_tts_es');
  M.getTtsRate = () => parseFloat(getRaw(M.KEYS.TTS_RATE, '0.92'))||0.92;
  M.setTtsRate = r => setRaw(M.KEYS.TTS_RATE, String(r));

  M.applyDeVoice = u => {
    try {
      const uri = M.getPreferredDeVoice();
      if (uri) { const voices = speechSynthesis.getVoices(); const v = voices.find(v=>v.voiceURI===uri); if (v) u.voice = v; }
      u.rate = M.getTtsRate(); u.lang = 'de-DE';
    } catch(e) {}
  };
  M.applyEsVoice = u => {
    try {
      const uri = M.getPreferredEsVoice();
      if (uri) { const voices = speechSynthesis.getVoices(); const v = voices.find(v=>v.voiceURI===uri); if (v) u.voice = v; }
      u.rate = M.getTtsRate(); u.lang = 'es-ES';
    } catch(e) {}
  };

  // Extrae solo la palabra alemana de [Wort - traducción] en vez de eliminar todo
  M.sanitizeHistoriaText = t => (t||'')
    .replace(/\[([^\]]+)\]/g, function(match, contenido) {
      var partes = contenido.split(' - ');
      return partes[0].trim();
    })
    .replace(/<[^>]*>/g,'')
    .replace(/\s+/g,' ')
    .trim();
  M.playSceneAudio = (text, speaker) => {
    speechSynthesis.cancel();
    if (!text) return;
    const clean = M.sanitizeHistoriaText(text).replace(/[.;;]/g,'.');
    const u = new SpeechSynthesisUtterance(clean);
    (speaker==='es') ? M.applyEsVoice(u) : M.applyDeVoice(u);
    speechSynthesis.speak(u);
  };
  M.pauseSpeech = () => speechSynthesis.pause();
  M.resumeSpeech = () => speechSynthesis.resume();
  M.stopSpeech = () => speechSynthesis.cancel();
  M.speakGermanWord = w => { M.stopSpeech(); const u=new SpeechSynthesisUtterance(String(w)); M.applyDeVoice(u); speechSynthesis.speak(u); };

  M.sfxEnabled = () => { try { return localStorage.getItem('muller_sfx_enabled')!=='0'; } catch(e) { return true; } };
  M.setSfxEnabled = on => { try { localStorage.setItem('muller_sfx_enabled', on?'1':'0'); } catch(e) {} };
  M.playCorrect = () => { if (M.sfxEnabled()) { M.tone(880,0,0.1,0.3,'sine'); setTimeout(()=>M.tone(1100,0.1,0.12,0.25,'sine'),100); } };
  M.playIncorrect = () => { if (M.sfxEnabled()) M.tone(200,0,0.2,0.3,'square'); };
  M.playFanfare = () => { if (M.sfxEnabled()) { M.tone(660,0,0.1,0.3,'triangle'); setTimeout(()=>M.tone(880,0.1,0.1,0.3,'triangle'),120); setTimeout(()=>M.tone(1100,0.2,0.2,0.3,'triangle'),240); } };
})();
