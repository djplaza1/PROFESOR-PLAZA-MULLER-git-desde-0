// src/features/comunidad/comunidadGuiones.jsx
// FASE 4.5: Repositorio colaborativo de guiones
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var KEY = 'muller_comunidad_guiones';

  function getGuiones() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { return []; }
  }

  function saveGuiones(g) { localStorage.setItem(KEY, JSON.stringify(g)); }

  function subirGuion(titulo, texto, autor) {
    var guiones = getGuiones();
    var guion = {
      id: 'guion_' + Date.now(),
      titulo: titulo,
      texto: texto,
      autor: autor || 'Yo',
      votos: 0,
      descargas: 0,
      timestamp: Date.now()
    };
    guiones.push(guion);
    saveGuiones(guiones);
    return guion;
  }

  function votarGuion(id, tipo) {
    var guiones = getGuiones();
    for (var i = 0; i < guiones.length; i++) {
      if (guiones[i].id === id) {
        guiones[i].votos += (tipo === 'up' ? 1 : -1);
        saveGuiones(guiones);
        return guiones[i];
      }
    }
    return null;
  }

  function descargarGuion(id) {
    var guiones = getGuiones();
    for (var i = 0; i < guiones.length; i++) {
      if (guiones[i].id === id) {
        guiones[i].descargas++;
        saveGuiones(guiones);
        return guiones[i];
      }
    }
    return null;
  }

  function getMasDescargados(limite) {
    limite = limite || 10;
    return getGuiones().sort(function(a, b) { return b.descargas - a.descargas; }).slice(0, limite);
  }

  function getMejorValorados(limite) {
    limite = limite || 10;
    return getGuiones().sort(function(a, b) { return b.votos - a.votos; }).slice(0, limite);
  }

  window.Muller.Comunidad.Guiones = {
    getGuiones: getGuiones,
    subirGuion: subirGuion,
    votarGuion: votarGuion,
    descargarGuion: descargarGuion,
    getMasDescargados: getMasDescargados,
    getMejorValorados: getMejorValorados
  };
})();