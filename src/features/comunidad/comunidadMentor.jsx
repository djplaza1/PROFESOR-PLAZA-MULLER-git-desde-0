// src/features/comunidad/comunidadMentor.jsx
// FASE 4.6: Mentor/Tándem automático
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var KEY_MATCHES = 'muller_comunidad_mentor_matches';
  var KEY_CHAT = 'muller_comunidad_mentor_chat';

  function getMatches() {
    try { return JSON.parse(localStorage.getItem(KEY_MATCHES)) || []; } catch(e) { return []; }
  }

  function saveMatches(m) { localStorage.setItem(KEY_MATCHES, JSON.stringify(m)); }

  function getChats() {
    try { return JSON.parse(localStorage.getItem(KEY_CHAT)) || {}; } catch(e) { return {}; }
  }

  function saveChats(c) { localStorage.setItem(KEY_CHAT, JSON.stringify(c)); }

  function obtenerNivelBase(nivel) {
    var niveles = ['A1', 'A2', 'B1', 'B2', 'C1'];
    var idx = niveles.indexOf(nivel);
    return idx >= 0 ? idx : -1;
  }

  function registrarMatch(nivel) {
    var matches = getMatches();
    var nombre = (window.Muller && window.Muller.session && window.Muller.session.user) ? window.Muller.session.user.nombre : 'Anónimo';
    var match = {
      id: 'match_' + Date.now(),
      nivel: nivel,
      nombre: nombre,
      mentor: null,
      aprendiz: null,
      timestamp: Date.now(),
      aceptado: false
    };

    // Buscar pareja inversa
    var nivelBase = obtenerNivelBase(nivel);
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      if (m.aceptado) continue;
      if (m.nombre === nombre) continue;
      var otroNivel = obtenerNivelBase(m.nivel);
      // Si el usuario es avanzado, emparejar con principiante y viceversa
      if (nivelBase >= 3 && otroNivel <= 2) {
        // Este usuario es mentor (> B1), el otro es aprendiz
        match.mentor = nombre;
        match.aprendiz = m.nombre;
        match.aceptado = true;
        m.mentor = nombre;
        m.aprendiz = m.nombre;
        m.aceptado = true;
        matches[i] = m;
        saveMatches(matches);
        return match;
      } else if (nivelBase <= 2 && otroNivel >= 3) {
        // Este usuario es aprendiz (< B2), el otro es mentor
        match.mentor = m.nombre;
        match.aprendiz = nombre;
        match.aceptado = true;
        m.mentor = m.nombre;
        m.aprendiz = nombre;
        m.aceptado = true;
        matches[i] = m;
        saveMatches(matches);
        return match;
      }
    }

    matches.push(match);
    saveMatches(matches);
    return match;
  }

  function aceptarMatch(matchId) {
    var matches = getMatches();
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].id === matchId) {
        matches[i].aceptado = true;
        saveMatches(matches);
        return matches[i];
      }
    }
    return null;
  }

  function enviarMensaje(matchId, texto) {
    if (!texto || !texto.trim()) return null;
    var chats = getChats();
    if (!chats[matchId]) chats[matchId] = [];
    var msg = {
      id: 'msg_' + Date.now(),
      matchId: matchId,
      texto: texto.trim(),
      timestamp: Date.now(),
      autor: (window.Muller && window.Muller.session && window.Muller.session.user) ? window.Muller.session.user.nombre : 'Yo'
    };
    chats[matchId].push(msg);
    saveChats(chats);
    return msg;
  }

  function getChat(matchId) {
    var chats = getChats();
    return chats[matchId] || [];
  }

  function getPuntosExtra() {
    var matches = getMatches();
    var totalPuntos = 0;
    var miNombre = (window.Muller && window.Muller.session && window.Muller.session.user) ? window.Muller.session.user.nombre : 'Anónimo';
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].mentor === miNombre && matches[i].aceptado) {
        totalPuntos += 50; // 50 puntos por cada match como mentor
      }
    }
    return totalPuntos;
  }

  window.Muller.Comunidad.Mentor = {
    getMatches: getMatches,
    registrarMatch: registrarMatch,
    aceptarMatch: aceptarMatch,
    enviarMensaje: enviarMensaje,
    getChat: getChat,
    getPuntosExtra: getPuntosExtra
  };
})();