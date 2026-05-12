// src/features/comunidad/comunidadClubs.jsx
// Clubs de estudio (gremios) - CRUD, chat grupal, ranking, desafíos semanales
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var CLUBS_KEY = 'muller_comunidad_clubs';
  var MIEMBROS_KEY = 'muller_comunidad_club_miembros';
  var CHAT_KEY = 'muller_comunidad_club_chat_';
  var DESAFIOS_KEY = 'muller_comunidad_club_desafios';
  var PUNTOS_CLUB_KEY = 'muller_comunidad_club_puntos';

  function getClubs() {
    try {
      var clubs = JSON.parse(localStorage.getItem(CLUBS_KEY)) || [];
      // Normalizar: añadir miembrosArr y ranking si no existen
      clubs.forEach(function(c) {
        if (!c.miembrosArr) {
          var miembros = getMiembros(c.id);
          c.miembrosArr = miembros.length > 0 ? miembros : [{ id: c.creadorId || 'yo', nombre: c.creadorNombre || 'Yo', rol: 'lider' }];
        }
        if (!c.ranking) {
          c.ranking = getRankingClub(c.id);
        }
        if (typeof c.miembros === 'number') {
          c.miembros = (c.miembrosArr || []).map(function(m) { return m.id; });
        }
      });
      return clubs;
    } catch(e) { return []; }
  }

  function saveClubs(clubs) {
    localStorage.setItem(CLUBS_KEY, JSON.stringify(clubs));
  }

  function getMiembros(clubId) {
    try {
      var key = MIEMBROS_KEY + '_' + clubId;
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch(e) { return []; }
  }

  function saveMiembros(clubId, miembros) {
    localStorage.setItem(MIEMBROS_KEY + '_' + clubId, JSON.stringify(miembros));
  }

  function getChat(clubId) {
    try {
      return JSON.parse(localStorage.getItem(CHAT_KEY + clubId)) || [];
    } catch(e) { return []; }
  }

  function saveChat(clubId, mensajes) {
    localStorage.setItem(CHAT_KEY + clubId, JSON.stringify(mensajes));
  }

  function getDesafiosSemanales() {
    try {
      return JSON.parse(localStorage.getItem(DESAFIOS_KEY)) || [];
    } catch(e) { return []; }
  }

  function saveDesafios(desafios) {
    localStorage.setItem(DESAFIOS_KEY, JSON.stringify(desafios));
  }

  function getPuntosClub(clubId) {
    try {
      var todos = JSON.parse(localStorage.getItem(PUNTOS_CLUB_KEY)) || {};
      return todos[clubId] || 0;
    } catch(e) { return 0; }
  }

  function sumarPuntosClub(clubId, puntos) {
    try {
      var todos = JSON.parse(localStorage.getItem(PUNTOS_CLUB_KEY)) || {};
      todos[clubId] = (todos[clubId] || 0) + puntos;
      localStorage.setItem(PUNTOS_CLUB_KEY, JSON.stringify(todos));
      return todos[clubId];
    } catch(e) { return 0; }
  }

  // ─── Preguntas para desafíos semanales ───
  var preguntasDesafio = [
    { pregunta: 'Was ist der Artikel von "Haus"?', respuesta: 'das', tipo: 'articulo' },
    { pregunta: 'Konjugiere "sein" in der 3. Person Singular Präsens', respuesta: 'ist', tipo: 'conjugacion' },
    { pregunta: 'Was ist der Plural von "Kind"?', respuesta: 'kinder', tipo: 'vocabulario' },
    { pregunta: 'Übersetze: "I would like to eat"', respuesta: 'ich möchte essen', tipo: 'traduccion' },
    { pregunta: 'Was ist der Artikel von "Buch"?', respuesta: 'das', tipo: 'articulo' },
    { pregunta: 'Konjugiere "haben" in der 1. Person Plural Präsens', respuesta: 'haben', tipo: 'conjugacion' },
    { pregunta: 'Was ist der Plural von "Apfel"?', respuesta: 'äpfel', tipo: 'vocabulario' },
    { pregunta: 'Übersetze: "Where is the station?"', respuesta: 'wo ist der bahnhof', tipo: 'traduccion' },
    { pregunta: 'Was ist der Artikel von "Mond"?', respuesta: 'der', tipo: 'articulo' },
    { pregunta: 'Konjugiere "werden" in der 2. Person Singular Präsens', respuesta: 'wirst', tipo: 'conjugacion' },
  ];

  function generarDesafioSemanal(clubId) {
    var desafios = getDesafiosSemanales();
    // Verificar si ya hay un desafío activo esta semana
    var ahora = Date.now();
    var inicioSemana = ahora - (ahora % (7 * 24 * 60 * 60 * 1000));
    var existente = desafios.filter(function(d) { return d.clubId === clubId && d.inicio >= inicioSemana; });
    if (existente.length > 0) return existente[0];

    var numPreguntas = 5;
    var seleccionadas = [];
    var copia = preguntasDesafio.slice();
    for (var i = 0; i < numPreguntas && copia.length > 0; i++) {
      var idx = Math.floor(Math.random() * copia.length);
      seleccionadas.push(copia.splice(idx, 1)[0]);
    }

    var desafio = {
      id: 'ds_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      clubId: clubId,
      preguntas: seleccionadas,
      inicio: Date.now(),
      fin: Date.now() + 7 * 24 * 60 * 60 * 1000,
      respuestas: {},
      estado: 'activo'
    };
    desafios.push(desafio);
    saveDesafios(desafios);
    return desafio;
  }

  function responderDesafio(desafioId, usuarioId, respuestas) {
    var desafios = getDesafiosSemanales();
    var idx = -1;
    for (var i = 0; i < desafios.length; i++) {
      if (desafios[i].id === desafioId) { idx = i; break; }
    }
    if (idx === -1) return { ok: false, msg: 'Desafío no encontrado' };

    var d = desafios[idx];
    if (d.estado !== 'activo') return { ok: false, msg: 'Desafío ya finalizado' };
    if (d.respuestas[usuarioId]) return { ok: false, msg: 'Ya respondiste este desafío' };

    var aciertos = 0;
    for (var j = 0; j < d.preguntas.length; j++) {
      var p = d.preguntas[j];
      var resUsuario = (respuestas[j] || '').toLowerCase().trim();
      var resCorrecta = p.respuesta.toLowerCase().trim();
      if (resUsuario === resCorrecta) aciertos++;
    }

    d.respuestas[usuarioId] = { aciertos: aciertos, total: d.preguntas.length, timestamp: Date.now() };
    desafios[idx] = d;
    saveDesafios(desafios);

    // Sumar puntos al club
    var ptsClub = aciertos * 5;
    sumarPuntosClub(d.clubId, ptsClub);

    return { ok: true, aciertos: aciertos, total: d.preguntas.length, puntosClub: ptsClub };
  }

  function getRankingClub(clubId) {
    var miembros = getMiembros(clubId);
    var desafios = getDesafiosSemanales().filter(function(d) { return d.clubId === clubId; });
    var rankings = {};
    miembros.forEach(function(m) {
      rankings[m.id] = { nombre: m.nombre, puntos: 0, desafios: 0, aciertos: 0, total: 0 };
    });
    desafios.forEach(function(d) {
      Object.keys(d.respuestas).forEach(function(uid) {
        if (rankings[uid]) {
          rankings[uid].puntos += d.respuestas[uid].aciertos * 5;
          rankings[uid].desafios++;
          rankings[uid].aciertos += d.respuestas[uid].aciertos;
          rankings[uid].total += d.respuestas[uid].total;
        }
      });
    });
    var arr = Object.keys(rankings).map(function(id) { return { id: id, nombre: rankings[id].nombre, puntos: rankings[id].puntos, desafios: rankings[id].desafios, aciertos: rankings[id].aciertos, total: rankings[id].total, precision: rankings[id].total > 0 ? Math.round((rankings[id].aciertos / rankings[id].total) * 100) : 0 }; });
    arr.sort(function(a, b) { return b.puntos - a.puntos; });
    return arr;
  }

  window.Muller.Comunidad.Clubs = {
    // ─── Funciones básicas (alias compatibles con panel) ───
    getClubs: getClubs,
    getMiembros: getMiembros,
    getMensajes: getChat, // alias: getMensajes → getChat
    getChat: getChat,
    getDesafiosSemanales: getDesafiosSemanales,
    getPuntosClub: getPuntosClub,
    generarDesafioSemanal: generarDesafioSemanal,
    responderDesafio: responderDesafio,
    getRankingClub: getRankingClub,

    // ─── crearClub: versión simplificada (sin creadorId/Nombre, usa 'yo') ───
    crearClub: function(nombre, descripcion) {
      var clubs = getClubs();
      for (var i = 0; i < clubs.length; i++) {
        if (clubs[i].nombre.toLowerCase() === nombre.toLowerCase()) return { ok: false, msg: 'Ya existe un club con ese nombre' };
      }
      var creadorId = 'yo';
      var creadorNombre = 'Yo';
      var club = {
        id: 'club_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        nombre: nombre,
        descripcion: descripcion || '',
        creadorId: creadorId,
        creadorNombre: creadorNombre,
        fechaCreacion: Date.now(),
        miembros: 1,
        miembrosArr: [{ id: creadorId, nombre: creadorNombre, rol: 'lider', fechaIngreso: Date.now() }],
        ranking: []
      };
      clubs.push(club);
      saveClubs(clubs);
      var miembros = [{ id: creadorId, nombre: creadorNombre, rol: 'lider', fechaIngreso: Date.now() }];
      saveMiembros(club.id, miembros);
      return { ok: true, club: club };
    },

    // ─── unirseClub: alias simplificado ───
    unirseClub: function(clubId) {
      return window.Muller.Comunidad.Clubs.unirseAClub(clubId, 'yo', 'Yo');
    },

    // ─── salirClub: alias simplificado ───
    salirClub: function(clubId) {
      var r = window.Muller.Comunidad.Clubs.salirDeClub(clubId, 'yo');
      return r;
    },

    // ─── enviarMensaje: alias simplificado ───
    enviarMensaje: function(clubId, texto) {
      var msg = window.Muller.Comunidad.Clubs.enviarMensajeChat(clubId, 'yo', 'Yo', texto);
      return msg ? { ok: true, msg: msg } : { ok: false };
    },

    unirseAClub: function(clubId, usuarioId, usuarioNombre) {
      var clubes = getClubs();
      var club = null;
      for (var i = 0; i < clubes.length; i++) {
        if (clubes[i].id === clubId) { club = clubes[i]; break; }
      }
      if (!club) return { ok: false, msg: 'Club no encontrado' };

      var miembros = getMiembros(clubId);
      for (var j = 0; j < miembros.length; j++) {
        if (miembros[j].id === usuarioId) return { ok: false, msg: 'Ya eres miembro de este club' };
      }

      miembros.push({ id: usuarioId, nombre: usuarioNombre, rol: 'miembro', fechaIngreso: Date.now() });
      saveMiembros(clubId, miembros);
      club.miembros = miembros.length;
      for (var k = 0; k < clubes.length; k++) {
        if (clubes[k].id === clubId) { clubes[k].miembros = miembros.length; break; }
      }
      saveClubs(clubes);
      return { ok: true, club: club };
    },

    salirDeClub: function(clubId, usuarioId) {
      var miembros = getMiembros(clubId);
      var nuevos = miembros.filter(function(m) { return m.id !== usuarioId; });
      if (nuevos.length === miembros.length) return { ok: false, msg: 'No eres miembro de este club' };
      saveMiembros(clubId, nuevos);

      var clubes = getClubs();
      for (var i = 0; i < clubes.length; i++) {
        if (clubes[i].id === clubId) {
          clubes[i].miembros = nuevos.length;
          // Si no quedan miembros, eliminar club
          if (nuevos.length === 0) {
            clubes.splice(i, 1);
          }
          break;
        }
      }
      saveClubs(clubes);
      return { ok: true };
    },

    enviarMensajeChat: function(clubId, usuarioId, usuarioNombre, texto) {
      if (!texto.trim()) return null;
      var mensajes = getChat(clubId);
      var msg = {
        id: 'cmsg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        usuarioId: usuarioId,
        nombre: usuarioNombre,
        texto: texto.trim(),
        timestamp: Date.now()
      };
      mensajes.push(msg);
      // Mantener solo últimos 100 mensajes
      if (mensajes.length > 100) mensajes = mensajes.slice(-100);
      saveChat(clubId, mensajes);
      return msg;
    },

    eliminarClub: function(clubId, usuarioId) {
      var clubes = getClubs();
      var idx = -1;
      for (var i = 0; i < clubes.length; i++) {
        if (clubes[i].id === clubId) {
          if (clubes[i].creadorId !== usuarioId) return { ok: false, msg: 'Solo el líder puede eliminar el club' };
          idx = i;
          break;
        }
      }
      if (idx === -1) return { ok: false, msg: 'Club no encontrado' };
      clubes.splice(idx, 1);
      saveClubs(clubes);
      // Limpiar miembros y chat
      localStorage.removeItem(MIEMBROS_KEY + '_' + clubId);
      localStorage.removeItem(CHAT_KEY + clubId);
      return { ok: true };
    }
  };
})();