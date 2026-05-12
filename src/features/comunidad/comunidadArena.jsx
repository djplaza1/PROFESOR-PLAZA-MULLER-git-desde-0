// src/features/comunidad/comunidadArena.jsx
// Arena de duelos en tiempo real con Supabase Realtime + fallback local
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var A = {};
  var ARENA_KEY = 'muller_comunidad_arena_partidas';
  var LISTOS_KEY = 'muller_comunidad_arena_listos';
  var TEMAS = ['articulos', 'conjugacion', 'vocabulario'];

  // ─── POOL DE PREGUNTAS ───
  var PREGUNTAS = {
    articulos: [
      { pregunta: '___ Hund (der)', resp: 'der' },
      { pregunta: '___ Katze (die)', resp: 'die' },
      { pregunta: '___ Kind (das)', resp: 'das' },
      { pregunta: '___ Auto (das)', resp: 'das' },
      { pregunta: '___ Mann (der)', resp: 'der' },
      { pregunta: '___ Frau (die)', resp: 'die' },
      { pregunta: '___ Haus (das)', resp: 'das' },
      { pregunta: '___ Buch (das)', resp: 'das' },
      { pregunta: '___ Tisch (der)', resp: 'der' },
      { pregunta: '___ Uhr (die)', resp: 'die' },
      { pregunta: '___ Apfel (der)', resp: 'der' },
      { pregunta: '___ Blume (die)', resp: 'die' },
      { pregunta: '___ Fenster (das)', resp: 'das' },
      { pregunta: '___ Stuhl (der)', resp: 'der' },
      { pregunta: '___ Lampe (die)', resp: 'die' },
    ],
    conjugacion: [
      { pregunta: 'Ich ___ (sein)', resp: 'bin' },
      { pregunta: 'Du ___ (haben)', resp: 'hast' },
      { pregunta: 'Er ___ (gehen)', resp: 'geht' },
      { pregunta: 'Wir ___ (kommen)', resp: 'kommen' },
      { pregunta: 'Ihr ___ (sein)', resp: 'seid' },
      { pregunta: 'Sie ___ (haben)', resp: 'haben' },
      { pregunta: 'Ich ___ (werden)', resp: 'werde' },
      { pregunta: 'Du ___ (können)', resp: 'kannst' },
      { pregunta: 'Er ___ (müssen)', resp: 'muss' },
      { pregunta: 'Wir ___ (sprechen)', resp: 'sprechen' },
    ],
    vocabulario: [
      { pregunta: '¿Cómo se dice "gracias"?', resp: 'danke' },
      { pregunta: '¿Cómo se dice "adiós"?', resp: 'tschüss' },
      { pregunta: '¿Cómo se dice "por favor"?', resp: 'bitte' },
      { pregunta: '¿Cómo se dice "sí"?', resp: 'ja' },
      { pregunta: '¿Cómo se dice "no"?', resp: 'nein' },
      { pregunta: 'Traduce: Wasser', resp: 'agua' },
      { pregunta: 'Traduce: Brot', resp: 'pan' },
      { pregunta: 'Traduce: Milch', resp: 'leche' },
      { pregunta: 'Traduce: Schule', resp: 'escuela' },
      { pregunta: 'Traduce: Arbeit', resp: 'trabajo' },
    ]
  };

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  // ─── GENERAR PREGUNTAS ───
  A.generarPreguntas = function(tema, cantidad) {
    tema = tema || TEMAS[Math.floor(Math.random() * TEMAS.length)];
    cantidad = cantidad || 10;
    var pool = PREGUNTAS[tema] || PREGUNTAS.vocabulario;
    var mezcladas = shuffleArray(pool.slice());
    return mezcladas.slice(0, Math.min(cantidad, mezcladas.length)).map(function(q, i) {
      return { id: 'q_' + i + '_' + Date.now(), pregunta: q.pregunta, resp: q.resp };
    });
  };

  // ─── INICIAR PARTIDA LOCAL ───
  A.iniciarPartida = function(modo, tema, tiempoLimite) {
    modo = modo || 'local';
    tema = tema || TEMAS[Math.floor(Math.random() * TEMAS.length)];
    tiempoLimite = tiempoLimite || 60;
    var preguntas = A.generarPreguntas(tema, 10);
    var partida = {
      id: 'arena_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
      modo: modo,
      tema: tema,
      inicio: Date.now(),
      fin: Date.now() + tiempoLimite * 1000,
      tiempoLimite: tiempoLimite,
      preguntas: preguntas,
      indiceActual: 0,
      aciertos: 0,
      fallos: 0,
      respondidas: [],
      estado: 'jugando',
      rival: modo === 'local' ? null : { nombre: 'Rival', puntuacion: 0 }
    };
    var partidas = A.getPartidas();
    partidas.push(partida);
    A._guardarPartidas(partidas);
    return partida;
  };

  // ─── ENVIAR RESPUESTA ───
  A.enviarRespuesta = function(partidaId, respuesta) {
    var partidas = A.getPartidas();
    var p = null;
    for (var i = 0; i < partidas.length; i++) {
      if (partidas[i].id === partidaId) { p = partidas[i]; break; }
    }
    if (!p || p.estado !== 'jugando') return { ok: false, msg: 'Partida no encontrada o terminada' };
    var q = p.preguntas[p.indiceActual];
    if (!q) return { ok: false, msg: 'No hay más preguntas' };
    var correcto = respuesta.trim().toLowerCase() === q.resp.trim().toLowerCase();
    if (correcto) p.aciertos++;
    else p.fallos++;
    p.respondidas.push({ pregunta: q, respuesta: respuesta, correcto: correcto });
    p.indiceActual++;
    // Verificar si terminó
    if (p.indiceActual >= p.preguntas.length) {
      p.estado = 'completado';
      p.fin = Date.now();
    }
    A._guardarPartidas(partidas);
    return { ok: true, correcto: correcto, siguiente: p.indiceActual < p.preguntas.length, partida: p };
  };

  // ─── OBTENER PARTIDA ACTIVA ───
  A.getPartidaActiva = function() {
    var partidas = A.getPartidas();
    for (var i = partidas.length - 1; i >= 0; i--) {
      if (partidas[i].estado === 'jugando') return partidas[i];
    }
    return null;
  };

  // ─── OBTENER PREGUNTA ACTUAL ───
  A.getPreguntaActual = function(partidaId) {
    var partidas = A.getPartidas();
    for (var i = 0; i < partidas.length; i++) {
      if (partidas[i].id === partidaId) {
        var p = partidas[i];
        if (p.estado !== 'jugando') return null;
        return p.preguntas[p.indiceActual] || null;
      }
    }
    return null;
  };

  // ─── ABANDONAR PARTIDA ───
  A.abandonarPartida = function(partidaId) {
    var partidas = A.getPartidas();
    for (var i = 0; i < partidas.length; i++) {
      if (partidas[i].id === partidaId) {
        partidas[i].estado = 'abandonado';
        partidas[i].fin = Date.now();
        break;
      }
    }
    A._guardarPartidas(partidas);
  };

  // ─── HISTORIAL ───
  A.getPartidas = function() {
    try { return JSON.parse(localStorage.getItem(ARENA_KEY) || '[]'); }
    catch(e) { return []; }
  };

  A._guardarPartidas = function(partidas) {
    localStorage.setItem(ARENA_KEY, JSON.stringify(partidas));
  };

  A.getHistorial = function() {
    return A.getPartidas().filter(function(p) { return p.estado !== 'jugando'; }).reverse().slice(0, 20);
  };

  // ─── STATS ───
  A.getStats = function() {
    var partidas = A.getPartidas().filter(function(p) { return p.estado !== 'jugando'; });
    var total = partidas.length;
    var aciertos = partidas.reduce(function(s, p) { return s + (p.aciertos || 0); }, 0);
    var fallos = partidas.reduce(function(s, p) { return s + (p.fallos || 0); }, 0);
    return { total: total, aciertos: aciertos, fallos: fallos, precision: total > 0 ? Math.round((aciertos / (aciertos + fallos)) * 100) : 0 };
  };

  // ─── EMPAREJAMIENTO (Supabase Realtime) ───
  var _canal = null;
  var _rivalHandler = null;

  A.buscarRival = function(nivel, onEncontrado) {
    var sb = window.Muller.Supabase;
    if (!sb || !sb.channel) {
      // Fallback local: emparejamiento simulado
      if (typeof onEncontrado === 'function') {
        setTimeout(function() {
          onEncontrado({ nombre: 'Bot-' + nivel, nivel: nivel, id: 'bot_' + Date.now() });
        }, 1500);
      }
      return { ok: false, msg: 'Supabase no disponible. Modo local activado.' };
    }
    // Conectar a canal Realtime
    _rivalHandler = onEncontrado;
    var room = 'arena_' + (nivel || 'A2');
    _canal = sb.channel(room, { config: { broadcast: { self: true } } });
    _canal.on('broadcast', { event: 'buscar_rival' }, function(payload) {
      if (payload.payload && payload.payload.id && payload.payload.id !== 'yo') {
        if (typeof _rivalHandler === 'function') _rivalHandler(payload.payload);
        // Responder
        _canal.send({ type: 'broadcast', event: 'buscar_rival', payload: { id: 'yo', nombre: 'Jugador', nivel: nivel } });
      }
    });
    _canal.subscribe(function(status) {
      if (status === 'SUBSCRIBED') {
        _canal.send({ type: 'broadcast', event: 'buscar_rival', payload: { id: 'yo', nombre: 'Jugador', nivel: nivel } });
      }
    });
    return { ok: true, msg: 'Buscando rival...' };
  };

  A.cancelarBusqueda = function() {
    if (_canal) {
      try { _canal.unsubscribe(); } catch(e) {}
      _canal = null;
    }
    _rivalHandler = null;
  };

  window.Muller.Comunidad.Arena = A;
})();