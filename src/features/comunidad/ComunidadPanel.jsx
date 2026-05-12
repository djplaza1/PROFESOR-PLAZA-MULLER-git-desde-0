// src/features/comunidad/ComunidadPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['comunidad'] = ({ session }) => {
  const { useState, useEffect } = React;

  const [ranking, setRanking] = useState([]);
  const [liga, setLiga] = useState({});
  const [puntos, setPuntos] = useState(0);
  const [desafio, setDesafio] = useState(null);
  const [bonusReclamado, setBonusReclamado] = useState(false);
  const [ligaMsg, setLigaMsg] = useState(null);
  const [progresoLiga, setProgresoLiga] = useState(0);
  const [amigos, setAmigos] = useState([]);
  const [buscarTermino, setBuscarTermino] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [amigosOnline, setAmigosOnline] = useState(false);
  const [chatAbierto, setChatAbierto] = useState(null);
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [duelos, setDuelos] = useState([]);
  const [invitaciones, setInvitaciones] = useState([]);
  const [dueloInvitacionTipo, setDueloInvitacionTipo] = useState('vocabulario');
  const [bloqueos, setBloqueos] = useState([]);
  const [perfilAbierto, setPerfilAbierto] = useState(null);
  // ─── ARENA ───
  const [showArena, setShowArena] = useState(false);
  const [arenaPartida, setArenaPartida] = useState(null);
  const [arenaPreguntaActual, setArenaPreguntaActual] = useState(null);
  const [arenaRespuesta, setArenaRespuesta] = useState('');
  const [arenaTiempo, setArenaTiempo] = useState(60);
  const [arenaResultado, setArenaResultado] = useState(null);
  const [arenaHistorial, setArenaHistorial] = useState([]);
  const [arenaStats, setArenaStats] = useState({ total: 0, aciertos: 0, fallos: 0, precision: 0 });
  const [arenaBuscando, setArenaBuscando] = useState(false);
  // ─── CLUBS ───
  const [showClubForm, setShowClubForm] = useState(false);
  const [clubNombre, setClubNombre] = useState('');
  const [clubDescripcion, setClubDescripcion] = useState('');
  const [clubs, setClubs] = useState([]);
  const [clubChatActual, setClubChatActual] = useState(null);
  const [clubMensajes, setClubMensajes] = useState([]);
  const [clubMensajeTexto, setClubMensajeTexto] = useState('');
  const [yoEnClubs, setYoEnClubs] = useState('yo');
  // ─── FEED SOCIAL ───
  const [feed, setFeed] = useState([]);
  // ─── TIENDA ───
  const [showTienda, setShowTienda] = useState(false);
  const [tiendaProductos, setTiendaProductos] = useState([]);
  // ─── GUIONES ───
  const [guionesCompartidos, setGuionesCompartidos] = useState([]);
  const [muestrameMasDescargados, setMuMasDescargados] = useState(false);
  // ─── MENTOR ───
  const [mentorModal, setMentorModal] = useState(null);
  const [mentorMatches, setMentorMatches] = useState([]);
  const [mentorChat, setMentorChat] = useState({ mensajes: [], matchId: null });
  // ─── HISTORIAS ───
  const [historias, setHistorias] = useState([]);
  const [historiaInput, setHistoriaInput] = useState('');
  const [historiaActual, setHistoriaActual] = useState(null);
  const [tiendaCompras, setTiendaCompras] = useState([]);

  useEffect(() => {
    const pts = window.Muller.Comunidad.getPuntosUsuario();
    setPuntos(pts);
    const ligaActual = window.Muller.Comunidad.getLigaUsuario(pts);
    setLiga(ligaActual);
    setRanking(window.Muller.Comunidad.generarRanking());
    // Verificar bonus diario
    const hoy = new Date().toISOString().slice(0, 10);
    const ultimoBonus = localStorage.getItem(window.Muller.Comunidad.BONUS_KEY) || '';
    setBonusReclamado(ultimoBonus === hoy);
    // Verificar cambio de liga
    const resultado = window.Muller.Comunidad.verificarCambioLiga(pts);
    if (resultado.cambio && resultado.anterior) {
      setLigaMsg(resultado.subio
        ? `¡ASCENDISTE a ${resultado.liga.nombre}! ${resultado.liga.emoji} +50 monedas`
        : `Descendiste a ${resultado.liga.nombre}. ¡Sigue practicando!`);
      if (resultado.subio) {
        window.Muller.Comunidad.sumarPuntos(50);
        setPuntos(p => p + 50);
        if (window.Muller.Toast) window.Muller.Toast.showCustom('Ascenso de liga', resultado.liga.nombre, resultado.liga.emoji, 50);
      }
      setTimeout(() => setLigaMsg(null), 5000);
    }
    // Calcular progreso hacia siguiente liga
    const idx = window.Muller.Comunidad.LIGAS.findIndex(l => l.nombre === ligaActual.nombre);
    const siguiente = window.Muller.Comunidad.LIGAS[idx + 1];
    if (siguiente) {
      const minActual = ligaActual.minPuntos;
      const minSiguiente = siguiente.minPuntos;
      setProgresoLiga(Math.min(100, Math.round(((pts - minActual) / (minSiguiente - minActual)) * 100)));
    } else {
      setProgresoLiga(100);
    }
  }, [puntos]);

  useEffect(() => {
    setAmigos(window.Muller.Comunidad.getAmigos());
    window.Muller.Comunidad.actualizarOnline(true);
    setAmigosOnline(true);
    setBloqueos(window.Muller.Comunidad.getBloqueos());
    setDuelos(window.Muller.Comunidad.getDuelos());
    setInvitaciones(window.Muller.Comunidad.getInvitaciones());
    // Cargar feed social
    if (window.Muller.Comunidad.Feed) {
      setFeed(window.Muller.Comunidad.Feed.getFeed(30));
    }
    return () => { window.Muller.Comunidad.actualizarOnline(false); };
  }, []);

  const reclamarBonus = () => {
    const resultado = window.Muller.Comunidad.reclamarBonusDiario();
    if (resultado.ok) {
      setPuntos(resultado.puntos);
      setBonusReclamado(true);
      if (window.Muller.Toast) window.Muller.Toast.show('Bonus diario', 'success', 3000);
    } else {
      alert(resultado.msg);
    }
  };

  const iniciarDesafio = async () => {
    const nivel = window.Muller.Progreso?.getNivel?.() || 'B1';
    const preguntas = await window.Muller.Comunidad.generarPreguntasIA(nivel, 5);
    const oponente = "Bot " + ["Lingüista","Gramática","Vocab","Konjunktiv","Artikel"][Math.floor(Math.random()*5)];
    setDesafio({ oponente, preguntas, recompensa: preguntas.length * 10, respuestas: [] });
  };

  const buscarUsuarios = async () => {
    if (!buscarTermino.trim()) return;
    const resultados = await window.Muller.Comunidad.buscarUsuarios(buscarTermino);
    setResultadosBusqueda(resultados);
  };

  const handleAgregarAmigo = (usuario) => {
    const result = window.Muller.Comunidad.agregarAmigo(usuario.id, usuario.nombre, usuario.email);
    if (result.ok) {
      setAmigos(window.Muller.Comunidad.getAmigos());
      setResultadosBusqueda([]);
      setBuscarTermino('');
      if (window.Muller.Toast) window.Muller.Toast.showCustom('Amigo agregado', usuario.nombre, '👋', 0);
    } else {
      alert(result.msg);
    }
  };

  const handleEliminarAmigo = (usuarioId) => {
    if (!confirm('¿Eliminar este amigo?')) return;
    window.Muller.Comunidad.eliminarAmigo(usuarioId);
    setAmigos(window.Muller.Comunidad.getAmigos());
  };

  const handleBloquear = (id, nombre) => {
    const result = window.Muller.Comunidad.bloquearUsuario(id, nombre);
    if (result.ok) {
      setBloqueos(window.Muller.Comunidad.getBloqueos());
      if (window.Muller.Toast) window.Muller.Toast.showCustom('Usuario bloqueado', nombre, '🚫', 0);
    }
  };

  const handleDesbloquear = (id) => {
    window.Muller.Comunidad.desbloquearUsuario(id);
    setBloqueos(window.Muller.Comunidad.getBloqueos());
    if (window.Muller.Toast) window.Muller.Toast.show('Usuario desbloqueado', 'success', 2000);
  };

  const abrirChat = (amigo) => {
    setChatAbierto(amigo);
    const conversacion = window.Muller.Comunidad.getConversacion(amigo.id);
    setMensajes(conversacion);
    setMensajeTexto('');
  };

  const cerrarChat = () => {
    setChatAbierto(null);
    setMensajes([]);
    setMensajeTexto('');
  };

  const enviarMensaje = () => {
    if (!mensajeTexto.trim() || !chatAbierto) return;
    const nuevo = window.Muller.Comunidad.enviarMensaje(chatAbierto.id, mensajeTexto.trim());
    setMensajes(prev => [...prev, nuevo]);
    setMensajeTexto('');
  };

  const handleAgregarAmigoDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\s/g, '_'); const r = window.Muller.Comunidad.agregarAmigo(id, nombre, nombre.toLowerCase() + '@bot.local'); if (r.ok) { setAmigos(window.Muller.Comunidad.getAmigos()); if (window.Muller.Toast) window.Muller.Toast.showCustom('Amigo agregado', nombre, '👋', 0); } else { alert(r.msg); } };
  const handleMensajeDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\s/g, '_'); const yaAmigo = amigos.find(a => a.id === id); if (!yaAmigo) { var r = window.Muller.Comunidad.agregarAmigo(id, nombre, nombre.toLowerCase() + '@bot.local'); if (r.ok) setAmigos(window.Muller.Comunidad.getAmigos()); } const amigo = { id: id, nombre: nombre }; abrirChat(amigo); };
  const handleRetarDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\s/g, '_'); const yaAmigo = amigos.find(a => a.id === id); if (!yaAmigo) { var r = window.Muller.Comunidad.agregarAmigo(id, nombre, nombre.toLowerCase() + '@bot.local'); if (r.ok) setAmigos(window.Muller.Comunidad.getAmigos()); } const amigo = { id: id, nombre: nombre }; invitarADuelo(amigo); };

  const invitarADuelo = (amigo) => {
    const result = window.Muller.Comunidad.invitarADuelo(amigo.id, amigo.nombre, dueloInvitacionTipo);
    if (result.ok) {
      setInvitaciones(window.Muller.Comunidad.getInvitaciones());
      if (window.Muller.Toast) window.Muller.Toast.showCustom('Invitación enviada', amigo.nombre, '⚔️', 0);
      alert('✅ Invitación enviada a ' + amigo.nombre);
    } else {
      alert(result.msg);
    }
  };

  const responderInvitacion = (invitacionId, aceptar) => {
    const result = window.Muller.Comunidad.responderInvitacion(invitacionId, aceptar);
    if (result.ok) {
      setInvitaciones(window.Muller.Comunidad.getInvitaciones());
      setDuelos(window.Muller.Comunidad.getDuelos());
      if (window.Muller.Toast) window.Muller.Toast.showCustom(aceptar ? 'Duelo aceptado' : 'Invitación rechazada', '', aceptar ? '⚔️' : '✕', 0);
    }
  };

  const handleKeyDownMensaje = (e) => {
    if (e.key === 'Enter') enviarMensaje();
  };
  const handleKeyDownBuscar = (e) => {
    if (e.key === 'Enter') buscarUsuarios();
  };

  const manejarRespuesta = (indice, respuestaUsuario) => {
    if (!desafio) return;
    const pregunta = desafio.preguntas[indice];
    const correcta = pregunta.respuesta.toLowerCase().trim();
    const usuario = respuestaUsuario.toLowerCase().trim();
    const acierto = usuario === correcta;
    const ptsGanados = acierto ? 10 : 0;
    if (acierto) {
      const nuevosPts = window.Muller.Comunidad.sumarPuntos(ptsGanados);
      setPuntos(nuevosPts);
      const nuevasRespuestas = [...(desafio.respuestas || []), indice];
      setDesafio(prev => ({ ...prev, respuestas: nuevasRespuestas }));
      alert("✅ ¡Correcto! +10 pts");
    } else {
      alert(`❌ Incorrecto. Era: ${correcta}\n📚 ${pregunta.explicacion || ''}`);
    }
  };

  // ─── ARENA HANDLERS ───
  const arenaRefs = { timer: null };

  const iniciarArenaLocal = () => {
    var A = window.Muller.Comunidad.Arena;
    if (!A) return alert('Arena no disponible');
    var p = A.iniciarPartida('local', 'vocabulario', arenaTiempo);
    setArenaPartida(p);
    setArenaPreguntaActual(p.preguntas[0]);
    setArenaRespuesta('');
    setArenaResultado(null);
    if (arenaRefs.timer) clearInterval(arenaRefs.timer);
    arenaRefs.timer = setInterval(function() {
      var partida = A.getPartidaActiva();
      if (partida && Date.now() >= partida.fin) {
        A.abandonarPartida(partida.id);
        setArenaPartida(prev => prev ? { ...prev, estado: 'tiempo' } : null);
        setArenaPreguntaActual(null);
        setArenaResultado('⏰ Se acabó el tiempo!');
        if (arenaRefs.timer) { clearInterval(arenaRefs.timer); arenaRefs.timer = null; }
        setArenaHistorial(A.getHistorial());
        setArenaStats(A.getStats());
      }
    }, 1000);
  };

  const enviarRespuestaArena = () => {
    var A = window.Muller.Comunidad.Arena;
    if (!A || !arenaPartida) return;
    var res = A.enviarRespuesta(arenaPartida.id, arenaRespuesta);
    if (res.ok) {
      setArenaRespuesta('');
      if (res.siguiente) {
        setArenaPreguntaActual(A.getPreguntaActual(arenaPartida.id));
        setArenaPartida(prev => prev ? { ...prev, aciertos: res.partida.aciertos, fallos: res.partida.fallos, indiceActual: res.partida.indiceActual } : null);
      } else {
        // Partida completada
        if (arenaRefs.timer) { clearInterval(arenaRefs.timer); arenaRefs.timer = null; }
        setArenaPreguntaActual(null);
        var pFinal = A.getPartidas().filter(function(pp) { return pp.id === arenaPartida.id; })[0];
        if (pFinal) setArenaPartida(pFinal);
        setArenaResultado('🎉 Partida completada!');
        var puntosGanados = res.partida.aciertos * 10;
        window.Muller.Comunidad.sumarPuntos(puntosGanados);
        setPuntos(prev => prev + puntosGanados);
        setArenaHistorial(A.getHistorial());
        setArenaStats(A.getStats());
      }
    }
  };

  const handleKeyArena = function(e) {
    if (e.key === 'Enter') enviarRespuestaArena();
  };

  const cerrarArena = function() {
    if (arenaRefs.timer) { clearInterval(arenaRefs.timer); arenaRefs.timer = null; }
    if (arenaPartida && arenaPartida.estado === 'jugando') {
      window.Muller.Comunidad.Arena.abandonarPartida(arenaPartida.id);
    }
    setShowArena(false);
    setArenaPartida(null);
    setArenaPreguntaActual(null);
    setArenaResultado(null);
  };

  const buscarRivalArena = function() {
    setArenaBuscando(true);
    var A = window.Muller.Comunidad.Arena;
    if (!A) { setArenaBuscando(false); return; }
    var nivel = liga.nombre === 'Diamante' ? 'C1' : liga.nombre === 'Oro' || liga.nombre === 'Plata' ? 'B1' : 'A2';
    A.buscarRival(nivel, function(rival) {
      setArenaBuscando(false);
      alert('Rival encontrado: ' + rival.nombre + ' (nivel ' + rival.nivel + '). Partida iniciada!');
      iniciarArenaLocal();
    });
  };

  // ─── CLUBS HANDLERS ───
  const crearClub = function() {
    if (!clubNombre.trim()) return;
    var C = window.Muller.Comunidad.Clubs;
    if (!C) return alert('Clubs no disponible');
    var r = C.crearClub(clubNombre.trim(), clubDescripcion.trim());
    if (r.ok) {
      setClubs(C.getClubs());
      setClubNombre('');
      setClubDescripcion('');
      setShowClubForm(false);
      if (window.Muller.Toast) window.Muller.Toast.show('Club creado!', 'success', 2000);
    } else {
      alert(r.msg);
    }
  };

  const unirseClub = function(clubId) {
    var C = window.Muller.Comunidad.Clubs;
    if (!C) return;
    var r = C.unirseClub(clubId);
    if (r.ok) {
      setClubs(C.getClubs());
      if (window.Muller.Toast) window.Muller.Toast.show('Te has unido al club', 'success', 2000);
    } else {
      alert(r.msg);
    }
  };

  const salirClub = function(clubId) {
    if (!confirm('¿Salir del club?')) return;
    var C = window.Muller.Comunidad.Clubs;
    if (!C) return;
    C.salirClub(clubId);
    setClubs(C.getClubs());
    if (window.Muller.Toast) window.Muller.Toast.show('Has salido del club', 'success', 2000);
  };

  const enviarClubMensaje = function() {
    if (!clubMensajeTexto.trim() || !clubChatActual) return;
    var C = window.Muller.Comunidad.Clubs;
    if (!C) return;
    var r = C.enviarMensaje(clubChatActual.id, clubMensajeTexto.trim());
    if (r.ok) {
      setClubMensajeTexto('');
      // Recargar mensajes
      var msgs = C.getMensajes(clubChatActual.id);
      setClubMensajes(msgs);
    }
  };

  // Cargar clubs al montar
  useEffect(function() {
    var C = window.Muller.Comunidad.Clubs;
    if (C) {
      setClubs(C.getClubs());
    }
  }, []);

  // Actualizar historial/stats al montar
  useEffect(function() {
    var A = window.Muller.Comunidad.Arena;
    if (A) {
      setArenaHistorial(A.getHistorial());
      setArenaStats(A.getStats());
    }
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6 text-gray-200">
      <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-white">🏆 Comunidad <span className="text-sm text-gray-300">Liga {liga.nombre}</span></h2>

      {/* Mensaje de cambio de liga */}
      {ligaMsg && (
        <div className="bg-yellow-600 p-3 rounded-xl text-center text-white font-bold animate-pulse">
          {ligaMsg}
        </div>
      )}

      {/* Liga actual */}
      <div className={`p-4 rounded-xl text-white shadow ${liga.color || "bg-gray-500"}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">Tu liga: <strong>{liga.nombre}</strong> {liga.emoji}</p>
            <p className="text-2xl font-bold">{puntos} puntos</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Progreso</p>
            <div className="w-20 h-2 bg-white/30 rounded-full mt-1">
              <div className="h-full bg-white rounded-full" style={{width: progresoLiga + '%'}}></div>
            </div>
            <p className="text-xs mt-1">{progresoLiga}%</p>
          </div>
        </div>
      </div>

      {/* Bonus diario */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex justify-between items-center">
        <div>
          <p className="font-semibold">🎁 Bonus diario</p>
          <p className="text-sm text-gray-400">+20 puntos cada día</p>
        </div>
        <button
          onClick={reclamarBonus}
          disabled={bonusReclamado}
          className={`px-4 py-2 rounded font-bold ${bonusReclamado ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}`}
        >
        {bonusReclamado ? '✅ Reclamado' : '¡Reclamar!'}
        </button>
      </div>

      {/* 🏪 Tienda de puntos */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">🏪 Mercado de puntos</h3>
        <p className="text-sm text-gray-400 mb-3">Canjea tus puntos por comodines, temas y textos exclusivos</p>
        <button
          onClick={function() {
            setShowTienda(true);
            setTiendaProductos(window.Muller.Comunidad.Tienda ? window.Muller.Comunidad.Tienda.getProductos() : []);
            setTiendaCompras(window.Muller.Comunidad.Tienda ? window.Muller.Comunidad.Tienda.getCompras() : []);
          }}
          className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          🛒 Abrir tienda
        </button>
      </div>

      {/* Ranking */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">🏅 Ranking semanal</h3>
        <ul className="divide-y divide-gray-700">
          {ranking.map((entry, idx) => {
            var bloqueadoId = 'bot_' + entry.nombre.replace(/\s/g, '_');
            var estaBloqueado = bloqueos.some(function(b) { return b.id === bloqueadoId; });
            return (
            <li key={idx} className={`py-2 flex justify-between items-center ${entry.esUsuario ? "bg-blue-900/50 font-bold text-white rounded px-2 -mx-2" : "cursor-pointer hover:bg-gray-700/50 rounded px-2 -mx-2 transition-colors"} ${estaBloqueado ? 'opacity-50' : ''}`} onClick={() => !entry.esUsuario && !estaBloqueado && setPerfilAbierto(entry)}>
              <span>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                {' '}{entry.nombre} {entry.esUsuario ? "(Tú)" : ""} {estaBloqueado ? '🚫' : ''}
              </span>
              <span>{entry.puntos} pts</span>
            </li>
            );
          })}
        </ul>
      </div>

      {/* 👥 AMIGOS */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-3">👥 Amigos</h3>

        {/* Buscar usuarios */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={buscarTermino}
            onChange={(e) => setBuscarTermino(e.target.value)}
            onKeyDown={handleKeyDownBuscar}
            placeholder="Buscar usuarios..."
            className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white text-sm"
          />
          <button onClick={buscarUsuarios} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm font-semibold">
            Buscar
          </button>
        </div>

        {/* Resultados de búsqueda */}
        {resultadosBusqueda.length > 0 && (
          <div className="mb-3 bg-gray-700 rounded p-2">
            <p className="text-xs text-gray-400 mb-1">Resultados:</p>
            {resultadosBusqueda.map((u, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span>{u.nombre}</span>
                <button onClick={() => handleAgregarAmigo(u)} className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs">
                  + Agregar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Lista de amigos */}
        {amigos.length === 0 ? (
          <p className="text-gray-400 text-sm">No tienes amigos aún. Busca usuarios para agregar.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {amigos.map((amigo) => (
              <li key={amigo.id} className="py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${amigo.online ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                  <span>{amigo.nombre}</span>
                  <span className="text-xs text-gray-400">{amigo.online ? '🟢 online' : '⚫ offline'}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => abrirChat(amigo)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs">
                    💬 Chat
                  </button>
                  <button onClick={() => { setDueloInvitacionTipo('vocabulario'); invitarADuelo(amigo); }} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs">
                    ⚔️ Duelo
                  </button>
                  <button onClick={() => handleEliminarAmigo(amigo.id)} className="bg-gray-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs">
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 💬 CHAT PRIVADO */}
      {chatAbierto && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">💬 Chat con {chatAbierto.nombre}</h3>
            <button onClick={cerrarChat} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>

          {/* Mensajes */}
          <div className="bg-gray-900 rounded p-3 mb-3 max-h-60 overflow-y-auto space-y-2">
            {mensajes.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No hay mensajes aún. Escribe algo.</p>
            ) : (
              mensajes.map((msg, idx) => (
                <div key={msg.id || idx} className={`flex ${msg.de === 'yo' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.de === 'yo' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    <p>{msg.texto}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input de mensaje */}
          <div className="flex gap-2">
            <input
              type="text"
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
              onKeyDown={handleKeyDownMensaje}
              placeholder="Escribe un mensaje..."
              className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white text-sm"
            />
            <button onClick={enviarMensaje} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold">
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* ⚔️ DUELOS ACTIVOS */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-3">⚔️ Duelos activos</h3>

        {/* Invitaciones pendientes */}
        {invitaciones.filter(inv => inv.estado === 'pendiente').length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-yellow-400 mb-2">Invitaciones pendientes:</p>
            {invitaciones.filter(inv => inv.estado === 'pendiente').map((inv, idx) => (
              <div key={inv.id || idx} className="flex justify-between items-center bg-gray-700 rounded p-2 mb-1">
                <span>⚔️ {inv.nombre} te reta a duelo ({inv.tipo})</span>
                <div className="flex gap-1">
                  <button onClick={() => responderInvitacion(inv.id, true)} className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs">
                    ✅ Aceptar
                  </button>
                  <button onClick={() => responderInvitacion(inv.id, false)} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs">
                    ❌ Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lista de duelos activos */}
        {duelos.filter(d => d.estado === 'activo').length === 0 ? (
          <p className="text-gray-400 text-sm">No hay duelos activos. Invita a tus amigos a un duelo desde la sección de Amigos.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {duelos.filter(d => d.estado === 'activo').map((d, idx) => (
              <li key={d.id || idx} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">vs {d.rivalNombre}</p>
                  <p className="text-xs text-gray-400">Tipo: {d.tipo} | {new Date(d.fin).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{d.miPuntuacion} - {d.rivalPuntuacion}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Duelos finalizados */}
        {duelos.filter(d => d.estado === 'finalizado').length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Historial:</p>
            {duelos.filter(d => d.estado === 'finalizado').slice(-5).reverse().map((d, idx) => (
              <div key={d.id || idx} className="flex justify-between items-center py-1 text-sm">
                <span>vs {d.rivalNombre}</span>
                <span className={d.ganador === 'yo' ? 'text-green-400' : d.ganador === 'rival' ? 'text-red-400' : 'text-yellow-400'}>
                  {d.miPuntuacion} - {d.rivalPuntuacion} {d.ganador === 'yo' ? '✅ Victoria' : d.ganador === 'rival' ? '❌ Derrota' : '🤝 Empate'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🤖 Desafío contra bot */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">🤖 Desafío contra Bot</h3>
        {!desafio ? (
          <button onClick={iniciarDesafio} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold">
            ¡Retar a un bot!
          </button>
        ) : (
          <div>
            <p className="mb-2">¡Estás compitiendo contra <strong>{desafio.oponente}</strong>!</p>
            {desafio.preguntas.map((p, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-medium">{p.pregunta}</p>
                <input
                  type="text"
                  id={`respuesta-${idx}`}
                  placeholder="Tu respuesta"
                  className="border border-gray-600 rounded px-2 py-1 w-full bg-gray-700 text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      manejarRespuesta(idx, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            ))}
            <p className="text-sm text-gray-300">Aciertos: {(desafio.respuestas || []).length}/{desafio.preguntas.length} | Recompensa máx: {desafio.recompensa} pts</p>
          </div>
        )}
      </div>

      {/* ⚔️ ARENA DE DUELOS */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">⚔️ Arena de duelos</h3>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowArena(true); setArenaTiempo(60); }}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold text-sm"
            >
              🎮 Jugar local
            </button>
            <button
              onClick={buscarRivalArena}
              disabled={arenaBuscando}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-bold text-sm disabled:opacity-50"
            >
              {arenaBuscando ? '🔍 Buscando...' : '🌐 Online'}
            </button>
          </div>
        </div>

        {/* Stats rápidas */}
        {arenaStats.total > 0 && (
          <div className="flex gap-4 text-sm text-gray-300 mb-2">
            <span>📊 {arenaStats.total} partidas</span>
            <span>✅ {arenaStats.aciertos} aciertos</span>
            <span>❌ {arenaStats.fallos} fallos</span>
            <span>🎯 {arenaStats.precision}% precisión</span>
          </div>
        )}
      </div>

      {/* MODAL ARENA */}
      {showArena && (
        <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-600 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">⚔️ Arena de duelos</h3>
              <button onClick={cerrarArena} className="text-gray-400 hover:text-white text-lg">&times;</button>
            </div>

            {!arenaPartida ? (
              /* Configuración inicial */
              <div className="space-y-4">
                <p className="text-gray-300">Responde preguntas de alemán contra el reloj!</p>
                <div>
                  <label className="text-sm text-gray-400">Tiempo límite (segundos):</label>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    step="10"
                    value={arenaTiempo}
                    onChange={(e) => setArenaTiempo(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-center text-lg font-bold text-yellow-400">{arenaTiempo}s</p>
                </div>
                <button onClick={iniciarArenaLocal} className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold text-lg">
                  🎮 ¡Comenzar partida!
                </button>
              </div>
            ) : arenaPreguntaActual ? (
              /* Juego activo */
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Pregunta {(arenaPartida.indiceActual || 0) + 1}/{arenaPartida.preguntas.length}</span>
                  <span>✅ {arenaPartida.aciertos || 0} | ❌ {arenaPartida.fallos || 0}</span>
                  <span className="text-yellow-400">⏱️ {Math.max(0, Math.floor((arenaPartida.fin - Date.now()) / 1000))}s</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-white mb-2">{arenaPreguntaActual.pregunta}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={arenaRespuesta}
                    onChange={(e) => setArenaRespuesta(e.target.value)}
                    onKeyDown={handleKeyArena}
                    placeholder="Escribe tu respuesta..."
                    className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white text-lg"
                    autoFocus
                  />
                  <button onClick={enviarRespuestaArena} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold">
                    Enviar
                  </button>
                </div>
              </div>
            ) : (
              /* Resultado */
              <div className="space-y-4 text-center">
                <p className="text-xl font-bold">
                  {arenaResultado || '🎉 Partida completada!'}
                </p>
                {arenaPartida && (
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">{arenaPartida.aciertos || 0}/{arenaPartida.preguntas.length}</p>
                    <p className="text-sm text-gray-400">preguntas correctas</p>
                    <p className="text-lg font-bold text-green-400 mt-2">+{(arenaPartida.aciertos || 0) * 10} puntos</p>
                  </div>
                )}
                <div className="flex gap-2 justify-center">
                  <button onClick={() => { setArenaPartida(null); setArenaResultado(null); iniciarArenaLocal(); }} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold">
                    🔄 Otra partida
                  </button>
                  <button onClick={cerrarArena} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded font-bold">
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            {/* Historial rápido */}
            {arenaHistorial.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Últimas partidas:</p>
                {arenaHistorial.slice(0, 5).map(function(h, idx) {
                  return (
                    <div key={h.id || idx} className="flex justify-between text-xs text-gray-400 py-1">
                      <span>{h.tema} ({h.tiempoLimite}s)</span>
                      <span className={h.aciertos >= h.preguntas.length / 2 ? 'text-green-400' : 'text-red-400'}>
                        {h.aciertos}/{h.preguntas.length} {h.estado === 'completado' ? '✅' : '⏰'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 📰 FEED SOCIAL */}
      {feed.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">📰 Feed social</h3>
            <button
              onClick={() => {
                if (window.Muller.Comunidad.Feed) {
                  setFeed(window.Muller.Comunidad.Feed.getFeed(30));
                }
              }}
              className="text-xs text-gray-400 hover:text-white"
            >
              🔄 Actualizar
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {feed.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay actividad aún. Participa en la comunidad para generar entradas.</p>
            ) : (
              feed.map(function(entry, idx) {
                var emoji = '📌';
                if (entry.tipo === 'logro') emoji = '🏆';
                else if (entry.tipo === 'ascenso') emoji = '⬆️';
                else if (entry.tipo === 'hito') emoji = '🎯';
                else if (entry.tipo === 'duelo') emoji = '⚔️';
                else if (entry.tipo === 'club') emoji = '🏰';
                else if (entry.tipo === 'desafio') emoji = '🤖';
                return (
                  <div key={entry.id || idx} className="bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm">{entry.texto || entry.mensaje || ''}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {entry.usuario || entry.nombre || 'Alguien'} · {new Date(entry.timestamp || entry.fecha || Date.now()).toLocaleDateString()}
                        </p>
                        {/* Reacciones */}
                        {entry.reacciones && Object.keys(entry.reacciones).length > 0 && (
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {Object.entries(entry.reacciones).map(function([emojiR, count]) {
                              return (
                                <span key={emojiR} className="text-xs bg-gray-600 rounded px-1.5 py-0.5 cursor-pointer hover:bg-gray-500"
                                  onClick={function() {
                                    if (window.Muller.Comunidad.Feed) {
                                      window.Muller.Comunidad.Feed.reaccionar(entry.id, emojiR);
                                      setFeed(window.Muller.Comunidad.Feed.getFeed(30));
                                    }
                                  }}>
                                  {emojiR} {count}
                                </span>
                              );
                            })}
                            <span className="text-xs text-gray-500 cursor-pointer hover:text-white"
                              onClick={function() {
                                var nuevosEmojis = ['👏', '🔥', '💪', '🎉', '❤️'];
                                var r = nuevosEmojis[Math.floor(Math.random() * nuevosEmojis.length)];
                                if (window.Muller.Comunidad.Feed) {
                                  window.Muller.Comunidad.Feed.reaccionar(entry.id, r);
                                  setFeed(window.Muller.Comunidad.Feed.getFeed(30));
                                }
                              }}>
                              ➕
                            </span>
                          </div>
                        )}
                        {(!entry.reacciones || Object.keys(entry.reacciones).length === 0) && (
                          <div className="flex gap-1 mt-1">
                            {['👏', '🔥', '💪'].map(function(r) {
                              return (
                                <button key={r}
                                  onClick={function() {
                                    if (window.Muller.Comunidad.Feed) {
                                      window.Muller.Comunidad.Feed.reaccionar(entry.id, r);
                                      setFeed(window.Muller.Comunidad.Feed.getFeed(30));
                                    }
                                  }}
                                  className="text-xs bg-gray-600 hover:bg-gray-500 rounded px-1.5 py-0.5"
                                >
                                  {r}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 🏰 CLUBS DE ESTUDIO */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">🏰 Clubs de estudio</h3>
          <button
            onClick={() => setShowClubForm(!showClubForm)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-sm font-bold"
          >
            {showClubForm ? '✕ Cerrar' : '➕ Crear club'}
          </button>
        </div>

        {/* Formulario crear club */}
        {showClubForm && (
          <div className="bg-gray-700 p-3 rounded-lg mb-3 space-y-2">
            <input
              type="text"
              value={clubNombre}
              onChange={(e) => setClubNombre(e.target.value)}
              placeholder="Nombre del club"
              className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white text-sm"
            />
            <textarea
              value={clubDescripcion}
              onChange={(e) => setClubDescripcion(e.target.value)}
              placeholder="Descripción del club"
              className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white text-sm h-16"
            />
            <button
              onClick={crearClub}
              disabled={!clubNombre.trim()}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-bold text-sm disabled:opacity-50"
            >
              🏰 Crear club
            </button>
          </div>
        )}

        {/* Lista de clubs */}
        {clubs.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay clubs aún. ¡Crea el primero!</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {clubs.map((club, idx) => (
              <li key={club.id || idx} className="py-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold">{club.nombre}</p>
                    <p className="text-xs text-gray-400">{club.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      👥 {club.miembros ? club.miembros.length : 0} miembros
                      {club.ranking && club.ranking.length > 0 && ` | 🏆 ${club.ranking.reduce(function(a, m) { return a + (m.puntos || 0); }, 0)} pts totales`}
                    </p>
                    {/* Mini ranking */}
                    {club.ranking && club.ranking.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-gray-400">Ranking interno:</p>
                        {club.ranking.sort(function(a, b) { return (b.puntos || 0) - (a.puntos || 0); }).slice(0, 5).map(function(m, i) {
                          return (
                            <p key={m.nombre || i} className="text-xs text-gray-500 ml-2">
                              {i + 1}. {m.nombre}: {m.puntos || 0} pts
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 ml-2">
                    {club.miembros && club.miembros.includes(yoEnClubs ? yoEnClubs : 'yo') ? (
                      <>
                        <button
                          onClick={() => { setClubChatActual(club); }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          💬 Chat
                        </button>
                        <button
                          onClick={() => salirClub(club.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                        >
                          🚪 Salir
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => unirseClub(club.id)}
                        className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        ➕ Unirse
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Desafíos semanales del club */}
        {clubs.filter(function(c) { return c.miembros && c.miembros.includes(yoEnClubs ? yoEnClubs : 'yo'); }).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm font-semibold mb-2">🎯 Desafíos semanales del club</p>
            {clubs.filter(function(c) { return c.miembros && c.miembros.includes(yoEnClubs ? yoEnClubs : 'yo'); }).map(function(club) {
              if (!club.desafiosSemanales || club.desafiosSemanales.length === 0) {
                return <p key={club.id} className="text-xs text-gray-400">No hay desafíos esta semana</p>;
              }
              return (
                <div key={club.id} className="space-y-1">
                  {club.desafiosSemanales.map(function(d, i) {
                    return (
                      <div key={d.id || i} className="bg-gray-700 p-2 rounded text-sm">
                        <p className="font-medium">{d.titulo}</p>
                        <p className="text-xs text-gray-400">{d.descripcion}</p>
                        <p className="text-xs text-yellow-400 mt-1">🏆 {d.recompensa} pts | Estado: {d.completado ? '✅ Completado' : '⏳ Pendiente'}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal chat de club */}
      {clubChatActual && (
        <div className="fixed inset-0 z-[270] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setClubChatActual(null)}>
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-600 max-w-lg w-full max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold">💬 {clubChatActual.nombre}</h3>
              <button onClick={() => setClubChatActual(null)} className="text-gray-400 hover:text-white text-lg">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-900 rounded p-3 mb-3 space-y-2" style={{maxHeight: '40vh'}}>
              {clubMensajes.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">No hay mensajes en el club</p>
              ) : (
                clubMensajes.map(function(msg, idx) {
                  return (
                    <div key={msg.id || idx} className={`flex ${msg.de === 'yo' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.de === 'yo' ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
                        <p className="text-xs text-gray-400 mb-1">{msg.de !== 'yo' ? (msg.nombre || 'Miembro') : 'Tú'}</p>
                        <p>{msg.texto}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={clubMensajeTexto}
                onChange={(e) => setClubMensajeTexto(e.target.value)}
                onKeyDown={function(e) { if (e.key === 'Enter') enviarClubMensaje(); }}
                placeholder="Escribe un mensaje al club..."
                className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white text-sm"
              />
              <button onClick={enviarClubMensaje} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm font-bold">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚫 Usuarios bloqueados */}
      {bloqueos.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-red-700">
          <h3 className="text-lg font-semibold mb-2">🚫 Usuarios bloqueados ({bloqueos.length})</h3>
          {bloqueos.map((b) => (
            <div key={b.id} className="py-2 flex justify-between items-center">
              <span>{b.nombre}</span>
              <button onClick={() => handleDesbloquear(b.id)} className="text-green-400 hover:text-green-300 text-sm">Desbloquear</button>
            </div>
          ))}
        </div>
      )}

      {/* 🏪 MODAL TIENDA */}
      {showTienda && (
        <div className="fixed inset-0 z-[280] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowTienda(false)}>
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-600 max-w-lg w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">🏪 Mercado de puntos</h3>
              <button onClick={() => setShowTienda(false)} className="text-gray-400 hover:text-white text-lg">&times;</button>
            </div>
            
            {/* Puntos actuales */}
            <div className="bg-gray-900 p-3 rounded-lg mb-4 text-center">
              <p className="text-sm text-gray-400">Tus puntos</p>
              <p className="text-3xl font-bold text-yellow-400">{puntos} 🪙</p>
            </div>

            {/* Productos disponibles */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              <p className="text-sm font-semibold text-gray-300">Productos disponibles:</p>
              {tiendaProductos.filter(function(p) { return p.activo; }).map(function(producto) {
                return (
                  <div key={producto.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{producto.icono || '🛒'} {producto.nombre}</p>
                      <p className="text-xs text-gray-400">{producto.descripcion}</p>
                      <p className="text-sm text-yellow-400 mt-1">{producto.precio} pts</p>
                    </div>
                    <button
                      onClick={function() {
                        var resultado = window.Muller.Comunidad.Tienda ? window.Muller.Comunidad.Tienda.comprar(producto.id) : null;
                        if (!resultado) { alert('Tienda no disponible'); return; }
                        if (resultado.ok) {
                          setPuntos(resultado.puntos);
                          setTiendaCompras(window.Muller.Comunidad.Tienda ? window.Muller.Comunidad.Tienda.getCompras() : []);
                          if (resultado.msg) alert(resultado.msg);
                          if (window.Muller.Toast) window.Muller.Toast.show('Compra realizada!', 'success', 2000);
                        } else {
                          alert(resultado.msg);
                        }
                      }}
                      disabled={puntos < producto.precio}
                      className={`px-3 py-2 rounded text-xs font-bold ${puntos >= producto.precio ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                    >
                      {puntos >= producto.precio ? 'Comprar' : '❌'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Compras anteriores */}
            {tiendaCompras.filter(function(c) { return !c.usado; }).length > 0 && (
              <div className="border-t border-gray-700 pt-3">
                <p className="text-sm font-semibold text-gray-300 mb-2">Tus comodines:</p>
                {tiendaCompras.filter(function(c) { return !c.usado; }).map(function(compra) {
                  return (
                    <div key={compra.id} className="bg-gray-700/50 p-2 rounded-lg mb-2 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white">{compra.nombre}</p>
                        <p className="text-xs text-gray-400">{new Date(compra.fecha).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={function() {
                          var r = window.Muller.Comunidad.Tienda ? window.Muller.Comunidad.Tienda.aplicarComodin(compra.id) : null;
                          if (r && r.ok) {
                            setTiendaCompras(window.Muller.Comunidad.Tienda.getCompras());
                            alert(r.msg);
                          } else if (r) {
                            alert(r.msg);
                          }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs font-bold"
                      >
                        Usar
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de perfil de bot */}
      {perfilAbierto && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setPerfilAbierto(null)}>
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-600 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{perfilAbierto.nombre}</h3>
              <button onClick={() => setPerfilAbierto(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-gray-300">🏆 <strong>{perfilAbierto.puntos}</strong> puntos semanales</p>
              <p className="text-gray-300">📊 Liga simulada: {perfilAbierto.puntos > 5000 ? 'Diamante' : perfilAbierto.puntos > 3000 ? 'Oro' : perfilAbierto.puntos > 1000 ? 'Plata' : 'Bronce'}</p>
              <p className="text-gray-300">🔥 Racha simulada: {Math.floor(Math.random() * 30) + 1} días</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { handleAgregarAmigoDesdeRanking(perfilAbierto.nombre); setPerfilAbierto(null); }} className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm font-bold">👋 Agregar</button>
              <button onClick={() => { handleMensajeDesdeRanking(perfilAbierto.nombre); setPerfilAbierto(null); }} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm font-bold">💬 Mensaje</button>
              <button onClick={() => { handleRetarDesdeRanking(perfilAbierto.nombre); setPerfilAbierto(null); }} className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-2 rounded text-sm font-bold">⚔️ Retar</button>
              <button onClick={() => { handleBloquear('bot_' + perfilAbierto.nombre.replace(/\s/g, '_'), perfilAbierto.nombre); setPerfilAbierto(null); }} className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm font-bold">🚫 Bloquear</button>
            </div>
          </div>
        </div>
      )}

      {/* 📜 Repositorio de guiones */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">📜 Repositorio de guiones</h3>
          <div className="flex gap-2">
            <button
              onClick={function() {
                setMuMasDescargados(false);
                var G = window.Muller.Comunidad.Guiones;
                if (G) setGuionesCompartidos(G.getGuiones());
              }}
              className={`text-xs px-2 py-1 rounded ${!muestrameMasDescargados ? 'bg-cyan-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Todos
            </button>
            <button
              onClick={function() {
                setMuMasDescargados(true);
                var G = window.Muller.Comunidad.Guiones;
                if (G) setGuionesCompartidos(G.getMasDescargados(10));
              }}
              className={`text-xs px-2 py-1 rounded ${muestrameMasDescargados ? 'bg-cyan-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Más descargados
            </button>
          </div>
        </div>

        {/* Subir guión */}
        <div className="bg-gray-700/50 p-3 rounded-lg mb-3">
          <button
            onClick={function() {
              var titulo = prompt('Título del guión:');
              if (!titulo) return;
              var texto = prompt('Contenido del guión (texto en alemán):');
              if (!texto) return;
              var G = window.Muller.Comunidad.Guiones;
              if (G) {
                G.subirGuion(titulo, texto);
                setGuionesCompartidos(muestrameMasDescargados ? G.getMasDescargados(10) : G.getGuiones());
                if (window.Muller.Toast) window.Muller.Toast.show('Guión compartido!', 'success', 2000);
              }
            }}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded font-bold text-sm"
          >
            📤 Compartir guión actual
          </button>
        </div>

        {/* Lista de guiones */}
        {guionesCompartidos.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay guiones compartidos aún. ¡Sé el primero!</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {guionesCompartidos.map(function(g) {
              return (
                <div key={g.id} className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{g.titulo}</p>
                      <p className="text-xs text-gray-400">por {g.autor} · {new Date(g.timestamp).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-300 mt-1 truncate">{g.texto}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      <button
                        onClick={function() {
                          var G = window.Muller.Comunidad.Guiones;
                          if (G) {
                            G.votarGuion(g.id, 'up');
                            setGuionesCompartidos(muestrameMasDescargados ? G.getMasDescargados(10) : G.getGuiones());
                          }
                        }}
                        className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        ▲ {g.votos}
                      </button>
                      <button
                        onClick={function() {
                          var G = window.Muller.Comunidad.Guiones;
                          if (G) {
                            G.descargarGuion(g.id);
                            setGuionesCompartidos(muestrameMasDescargados ? G.getMasDescargados(10) : G.getGuiones());
                            if (window.Muller.Toast) window.Muller.Toast.show('Contenido copiado!', 'success', 2000);
                            navigator.clipboard.writeText(g.texto).catch(function(){});
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        ⬇️ {g.descargas}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 👥 Mentor/Tándem */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">👥 Mentor/Tándem</h3>
          <button
            onClick={function() {
              var nivel = prompt('Tu nivel de alemán (A1, A2, B1, B2, C1):') || 'A2';
              var M = window.Muller.Comunidad.Mentor;
              if (M) {
                var r = M.registrarMatch(nivel.toUpperCase());
                if (r) {
                  setMentorMatches(M.getMatches());
                  if (r.aceptado) {
                    if (window.Muller.Toast) window.Muller.Toast.show(r.mentor ? 'Eres mentor!' : 'Match encontrado!', 'success', 2000);
                  } else {
                    if (window.Muller.Toast) window.Muller.Toast.show('Registrado, esperando match...', 'success', 2000);
                  }
                }
              }
            }}
            className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm font-bold"
          >
            🔍 Buscar tándem
          </button>
        </div>

        {/* Puntos extra como mentor */}
        <div className="bg-gray-700/50 p-2 rounded-lg mb-3">
          <p className="text-sm text-gray-300">
            🏆 Puntos como mentor: <strong className="text-yellow-400">{window.Muller.Comunidad.Mentor ? window.Muller.Comunidad.Mentor.getPuntosExtra() : 0}</strong>
          </p>
        </div>

        {/* Lista de matches */}
        {mentorMatches.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay matches activos. ¡Regístrate para encontrar un tándem!</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mentorMatches.map(function(m) {
              var esMentor = m.mentor === (window.Muller && window.Muller.session ? window.Muller.session.user?.nombre : 'yo') || m.mentor === 'yo';
              var esAprendiz = m.aprendiz === (window.Muller && window.Muller.session ? window.Muller.session.user?.nombre : 'yo') || m.aprendiz === 'yo';
              return (
                <div key={m.id} className={`bg-gray-700 p-3 rounded-lg ${m.aceptado ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {m.aceptado ? '✅ Match activo' : '⏳ Pendiente'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {m.mentor ? `Mentor: ${m.mentor}` : 'Esperando mentor...'} | {m.aprendiz ? `Aprendiz: ${m.aprendiz}` : 'Esperando aprendiz...'}
                      </p>
                      <p className="text-xs text-gray-500">{m.nivel} · {new Date(m.timestamp).toLocaleDateString()}</p>
                    </div>
                    {m.aceptado && (esMentor || esAprendiz) && (
                      <button
                        onClick={function() {
                          setMentorModal(m.id);
                          var M = window.Muller.Comunidad.Mentor;
                          if (M) {
                            var chat = M.getChat(m.id);
                            setMentorChat({ mensajes: chat, matchId: m.id });
                          }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs"
                      >
                        💬 Chat
                      </button>
                    )}
                    {!m.aceptado && (
                      <button
                        onClick={function() {
                          var M = window.Muller.Comunidad.Mentor;
                          if (M) {
                            M.aceptarMatch(m.id);
                            setMentorMatches(M.getMatches());
                            if (window.Muller.Toast) window.Muller.Toast.show('Match aceptado!', 'success', 2000);
                          }
                        }}
                        className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        ✅ Aceptar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal chat de mentor */}
      {mentorModal && (function() {
        var matchId = mentorModal;
        return (
          <div className="fixed inset-0 z-[290] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => { setMentorModal(null); setMentorChat({ mensajes: [], matchId: null }); }}>
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-600 max-w-lg w-full max-h-[80vh] flex flex-col" onClick={function(e) { e.stopPropagation(); }}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">💬 Chat tándem</h3>
                <button onClick={() => { setMentorModal(null); setMentorChat({ mensajes: [], matchId: null }); }} className="text-gray-400 hover:text-white text-lg">&times;</button>
              </div>
              <div className="flex-1 overflow-y-auto bg-gray-900 rounded p-3 mb-3 space-y-2" style={{maxHeight: '40vh'}}>
                {(!mentorChat.mensajes || mentorChat.mensajes.length === 0) ? (
                  <p className="text-gray-500 text-sm text-center">No hay mensajes aún</p>
                ) : (
                  mentorChat.mensajes.map(function(msg, idx) {
                    return (
                      <div key={msg.id || idx} className={`flex ${msg.autor === 'yo' || msg.autor === (window.Muller && window.Muller.session ? window.Muller.session.user?.nombre : null) ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.autor === 'yo' || msg.autor === (window.Muller && window.Muller.session ? window.Muller.session.user?.nombre : null) ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
                          <p className="text-xs text-gray-400 mb-1">{msg.autor}</p>
                          <p>{msg.texto}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="mentorChatInput"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white text-sm"
                  onKeyDown={function(e) {
                    if (e.key === 'Enter') {
                      var M = window.Muller.Comunidad.Mentor;
                      if (M) {
                        M.enviarMensaje(matchId, e.target.value);
                        setMentorChat({ mensajes: M.getChat(matchId), matchId: matchId });
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button
                  onClick={function() {
                    var input = document.getElementById('mentorChatInput');
                    if (!input) return;
                    var M = window.Muller.Comunidad.Mentor;
                    if (M) {
                      M.enviarMensaje(matchId, input.value);
                      setMentorChat({ mensajes: M.getChat(matchId), matchId: matchId });
                      input.value = '';
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded text-sm font-bold"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 📝 Historias colaborativas */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-3">📝 Historias colaborativas</h3>

        {/* Iniciar nueva historia */}
        <div className="bg-gray-700/50 p-3 rounded-lg mb-3">
          <textarea
            value={historiaInput}
            onChange={function(e) { setHistoriaInput(e.target.value); }}
            placeholder="Escribe la primera frase de tu historia en alemán..."
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white text-sm h-16 resize-none mb-2"
          />
          <button
            onClick={function() {
              if (!historiaInput.trim()) return;
              var H = window.Muller.Comunidad.Historias;
              if (H) {
                var r = H.iniciarHistoria(historiaInput.trim());
                if (r) {
                  setHistorias(H.getHistorias());
                  setHistoriaInput('');
                  if (window.Muller.Toast) window.Muller.Toast.show('Historia iniciada!', 'success', 2000);
                }
              }
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-bold text-sm"
          >
            🆕 Iniciar historia
          </button>
        </div>

        {/* Lista de historias */}
        {historias.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay historias aún. ¡Empieza una!</p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {historias.filter(function(h) { return !h.completada; }).map(function(h) {
              return (
                <div key={h.id} className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-400">por {h.autor} · {h.frases.length}/10 frases</p>
                    </div>
                    <button
                      onClick={function() {
                        setHistoriaActual(h.id === historiaActual ? null : h.id);
                      }}
                      className={`text-xs px-2 py-1 rounded ${h.id === historiaActual ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                      {h.id === historiaActual ? '✕ Cerrar' : '📝 Continuar'}
                    </button>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm text-gray-300 italic">
                    {h.frases.map(function(f, i) {
                      return <p key={f.id} className="mb-1">({i + 1}) {f.texto}</p>;
                    })}
                  </div>
                  {h.id === historiaActual && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        id={'historiaContinuar_' + h.id}
                        placeholder="Continúa la historia..."
                        className="flex-1 border border-gray-600 rounded px-2 py-1 bg-gray-800 text-white text-sm"
                        onKeyDown={function(e) {
                          if (e.key === 'Enter') {
                            var H = window.Muller.Comunidad.Historias;
                            if (H) {
                              H.continuarHistoria(h.id, e.target.value);
                              setHistorias(H.getHistorias());
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={function() {
                          var input = document.getElementById('historiaContinuar_' + h.id);
                          if (!input || !input.value.trim()) return;
                          var H = window.Muller.Comunidad.Historias;
                          if (H) {
                            H.continuarHistoria(h.id, input.value);
                            setHistorias(H.getHistorias());
                            input.value = '';
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-sm font-bold"
                      >
                        ➕ Añadir
                      </button>
                    </div>
                  )}
                  {/* Votar frases */}
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {h.frases.map(function(f) {
                      return (
                        <button
                          key={f.id}
                          onClick={function() {
                            var H = window.Muller.Comunidad.Historias;
                            if (H) {
                              H.votarContinuacion(h.id, f.id);
                              setHistorias(H.getHistorias());
                            }
                          }}
                          className="text-xs bg-gray-600 hover:bg-yellow-600 rounded px-1.5 py-0.5"
                        >
                          {f.texto.substring(0, 20)}... 👍 {f.votos}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Historias completadas */}
            {historias.filter(function(h) { return h.completada; }).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-sm font-semibold mb-2">✅ Historias completadas:</p>
                {historias.filter(function(h) { return h.completada; }).slice(-3).reverse().map(function(h) {
                  return (
                    <div key={h.id} className="bg-gray-700/50 p-2 rounded-lg mb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-400">por {h.autor} · {h.frases.length} frases</p>
                          <p className="text-sm text-gray-300 truncate mt-1">
                            {h.frases.map(function(f) { return f.texto; }).join(' ... ')}
                          </p>
                        </div>
                        <button
                          onClick={function() {
                            var H = window.Muller.Comunidad.Historias;
                            if (H) {
                              H.publicarEnFeed(h.id);
                              if (window.Muller.Toast) window.Muller.Toast.show('Publicado en feed!', 'success', 2000);
                            }
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          📰 Publicar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};