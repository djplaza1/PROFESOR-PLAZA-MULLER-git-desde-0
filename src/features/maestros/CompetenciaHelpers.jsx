// src/features/maestros/CompetenciaHelpers.jsx
window.Muller = window.Muller || {};

(function() {
  var CompetenciaHelper = {};

  CompetenciaHelper.generarPregunta = function() {
    try {
      var todos = window.Muller.Maestros.getAllLevels();
      if (!todos || todos.length === 0) return null;

      var idx = Math.floor(Math.random() * todos.length);
      var modulo = todos[idx];
      var preguntaTexto = '¿Qué significa "' + (modulo.titulo || modulo.nombre || 'esto') + '"?';
      var correcta = modulo.descripcion || modulo.texto || modulo.titulo || '';

      var otros = todos.filter(function(m, i) { return i !== idx; });
      var opcionesFalsas = [];
      var usados = {};
      for (var i = 0; i < otros.length && opcionesFalsas.length < 3; i++) {
        var otro = otros[Math.floor(Math.random() * otros.length)];
        var texto = otro.descripcion || otro.texto || otro.titulo || '';
        if (texto && texto !== correcta && !usados[texto]) {
          usados[texto] = true;
          opcionesFalsas.push(texto);
        }
      }
      while (opcionesFalsas.length < 3) {
        opcionesFalsas.push('Opción ' + (opcionesFalsas.length + 1));
      }

      var opciones = [correcta].concat(opcionesFalsas);
      opciones.sort(function() { return Math.random() - 0.5; });

      return { pregunta: preguntaTexto, respuesta: correcta, opciones: opciones };
    } catch(e) {
      return { pregunta: 'Error generando pregunta', respuesta: '', opciones: [] };
    }
  };

  CompetenciaHelper.getRanking = function() {
    try {
      return JSON.parse(localStorage.getItem('maestros_ranking') || '[]');
    } catch(e) { return []; }
  };

  CompetenciaHelper.saveRanking = function(nombre, puntaje) {
    try {
      var saved = JSON.parse(localStorage.getItem('maestros_ranking') || '[]');
      saved.push({ nombre: nombre, puntaje: puntaje, fecha: new Date().toISOString() });
      saved.sort(function(a, b) { return b.puntaje - a.puntaje; });
      if (saved.length > 10) saved = saved.slice(0, 10);
      localStorage.setItem('maestros_ranking', JSON.stringify(saved));
      return saved;
    } catch(e) { return []; }
  };

  CompetenciaHelper.getNombre = function() {
    try { return localStorage.getItem('maestros_nombre') || ''; } catch(e) { return ''; }
  };

  CompetenciaHelper.setNombre = function(nombre) {
    try { localStorage.setItem('maestros_nombre', nombre); } catch(e) {}
  };

  window.Muller.CompetenciaHelper = CompetenciaHelper;
})();