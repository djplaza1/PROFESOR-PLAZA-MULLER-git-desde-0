// src/features/comunidad/comunidadHistorias.jsx
// FASE 4.7: Historias colaborativas
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var KEY = 'muller_comunidad_historias';

  function getHistorias() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { return []; }
  }

  function saveHistorias(h) { localStorage.setItem(KEY, JSON.stringify(h)); }

  function iniciarHistoria(fraseInicial, autor) {
    if (!fraseInicial || !fraseInicial.trim()) return null;
    var historias = getHistorias();
    var historia = {
      id: 'hist_' + Date.now(),
      autor: autor || 'Yo',
      timestamp: Date.now(),
      completada: false,
      frases: [
        { id: 'f1', texto: fraseInicial.trim(), autor: autor || 'Yo', votos: 0 }
      ]
    };
    historias.push(historia);
    saveHistorias(historias);
    return historia;
  }

  function continuarHistoria(historiaId, frase, autor) {
    if (!frase || !frase.trim()) return null;
    var historias = getHistorias();
    for (var i = 0; i < historias.length; i++) {
      if (historias[i].id === historiaId && !historias[i].completada) {
        if (historias[i].frases.length >= 10) {
          historias[i].completada = true;
          saveHistorias(historias);
          return { error: 'La historia ya está completa (10 frases)' };
        }
        var nuevaFrase = {
          id: 'f' + (historias[i].frases.length + 1),
          texto: frase.trim(),
          autor: autor || 'Yo',
          votos: 0
        };
        historias[i].frases.push(nuevaFrase);
        if (historias[i].frases.length >= 10) {
          historias[i].completada = true;
        }
        saveHistorias(historias);
        return historias[i];
      }
    }
    return null;
  }

  function votarContinuacion(historiaId, fraseId) {
    var historias = getHistorias();
    for (var i = 0; i < historias.length; i++) {
      if (historias[i].id === historiaId) {
        for (var j = 0; j < historias[i].frases.length; j++) {
          if (historias[i].frases[j].id === fraseId) {
            historias[i].frases[j].votos++;
            saveHistorias(historias);
            return historias[i];
          }
        }
      }
    }
    return null;
  }

  function getHistoriasCompletadas() {
    return getHistorias().filter(function(h) { return h.completada; });
  }

  function publicarEnFeed(historiaId) {
    var historias = getHistorias();
    for (var i = 0; i < historias.length; i++) {
      if (historias[i].id === historiaId && historias[i].completada) {
        var textoCompleto = historias[i].frases.map(function(f) { return f.texto; }).join(' ... ');
        if (window.Muller && window.Muller.Comunidad && window.Muller.Comunidad.Feed) {
          window.Muller.Comunidad.Feed.publicar({
            tipo: 'historia',
            autor: historias[i].autor,
            contenido: '📖 Historia colaborativa completada: "' + textoCompleto.substring(0, 100) + '..."',
            timestamp: Date.now()
          });
        }
        return true;
      }
    }
    return false;
  }

  window.Muller.Comunidad.Historias = {
    iniciarHistoria: iniciarHistoria,
    getHistorias: getHistorias,
    continuarHistoria: continuarHistoria,
    votarContinuacion: votarContinuacion,
    getHistoriasCompletadas: getHistoriasCompletadas,
    publicarEnFeed: publicarEnFeed
  };
})();