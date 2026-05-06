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

  const handleAgregarAmigoDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\\s/g, '_'); const r = window.Muller.Comunidad.agregarAmigo(id, nombre, nombre.toLowerCase() + '@bot.local'); if (r.ok) { setAmigos(window.Muller.Comunidad.getAmigos()); if (window.Muller.Toast) window.Muller.Toast.showCustom('Amigo agregado', nombre, '👋', 0); alert('✅ Ahora ' + nombre + ' es tu amigo.'); } else { alert(r.msg); } };
  const handleMensajeDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\\s/g, '_'); const yaAmigo = amigos.find(a => a.id === id); if (!yaAmigo) { handleAgregarAmigoDesdeRanking(nombre); } const amigo = { id: id, nombre: nombre }; abrirChat(amigo); };
  const handleRetarDesdeRanking = (nombre) => { const id = 'bot_' + nombre.replace(/\\s/g, '_'); const yaAmigo = amigos.find(a => a.id === id); if (!yaAmigo) { handleAgregarAmigoDesdeRanking(nombre); } const amigo = { id: id, nombre: nombre }; invitarADuelo(amigo); };
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

  React.useEffect(() => {
    setDuelos(window.Muller.Comunidad.getDuelos());
    setInvitaciones(window.Muller.Comunidad.getInvitaciones());
  }, []);

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

      {/* Ranking */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">🏅 Ranking semanal</h3>
        <ul className="divide-y divide-gray-700">
          {ranking.map((entry, idx) => (
            <li key={idx} className={`py-2 flex justify-between items-center ${entry.esUsuario ? "bg-blue-900/50 font-bold text-white rounded px-2 -mx-2" : "cursor-pointer hover:bg-gray-700/50 rounded px-2 -mx-2 transition-colors"}`} onClick={() => !entry.esUsuario && setPerfilAbierto(entry)}>
              <span>
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                {' '}{entry.nombre} {entry.esUsuario ? "(Tú)" : ""}
              </span>
              <span>{entry.puntos} pts</span>
            </li>
          ))}
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

      {/* Desafío contra bot */}
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
      {/* Amigos */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">👥 Amigos ({amigos.length})</h3>
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="Buscar usuario por nombre..." value={buscarTermino} onChange={(e) => setBuscarTermino(e.target.value)} onKeyDown={handleKeyDownBuscar} className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white" />
          <button onClick={buscarUsuarios} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold">Buscar</button>
        </div>
        {resultadosBusqueda.length > 0 && (
          <ul className="mb-3 divide-y divide-gray-700">
            {resultadosBusqueda.map((u) => (
              <li key={u.id} className="py-2 flex justify-between items-center">
                <span>{u.nombre} ({u.email})</span>
                <button onClick={() => handleAgregarAmigo(u)} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">Agregar</button>
              </li>
            ))}
          </ul>
        )}
        {amigos.length === 0 ? (
          <p className="text-gray-400 text-sm">No tienes amigos aún. Busca usuarios para agregar.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {amigos.map((a) => (
              <li key={a.id} className="py-2 flex justify-between items-center">
                <span>{a.nombre} {amigosOnline && a.online ? '🟢' : '⚫'}</span>
                <div className="flex gap-2">
                  <button onClick={() => abrirChat(a)} className="text-blue-400 hover:text-blue-300 text-sm">💬</button>
                  <select value={dueloInvitacionTipo} onChange={(e) => setDueloInvitacionTipo(e.target.value)} className="bg-gray-700 text-white text-xs rounded px-1 py-0.5">
                    <option value="vocabulario">Vocabulario</option>
                    <option value="gramatica">Gramática</option>
                    <option value="articulos">Artículos</option>
                  </select>
                  <button onClick={() => invitarADuelo(a)} className="text-yellow-400 hover:text-yellow-300 text-sm">⚔️ Retar</button>
                  <button onClick={() => handleEliminarAmigo(a.id)} className="text-red-400 hover:text-red-300 text-sm">Eliminar</button>
                  <button onClick={() => handleBloquear(a.id, a.nombre)} className="text-gray-400 hover:text-white text-sm">🚫</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Invitaciones pendientes */}
      {invitaciones.filter(i => i.estado === 'pendiente').length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-yellow-700">
          <h3 className="text-lg font-semibold mb-2">📨 Invitaciones pendientes</h3>
          {invitaciones.filter(i => i.estado === 'pendiente').map((inv) => (
            <div key={inv.id} className="flex justify-between items-center py-2">
              <span>{inv.nombre} te reta a un duelo de {inv.tipo}</span>
              <div className="flex gap-2">
                <button onClick={() => responderInvitacion(inv.id, true)} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm">Aceptar</button>
                <button onClick={() => responderInvitacion(inv.id, false)} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm">Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Duelos activos */}
      {duelos.filter(d => d.estado === 'activo').length > 0 && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-yellow-700">
          <h3 className="text-lg font-semibold mb-2">⚔️ Duelos activos</h3>
          {duelos.filter(d => d.estado === 'activo').map((d) => (
            <div key={d.id} className="py-2">
              <p>Contra <strong>{d.rivalNombre}</strong> - {d.tipo}</p>
              <div className="flex justify-between text-sm mt-1">
                <span>Tú: {d.miPuntuacion} pts</span>
                <span>{d.rivalNombre}: {d.rivalPuntuacion} pts</span>
              </div>
              <p className="text-xs text-gray-400">Finaliza: {new Date(d.fin).toLocaleString('es-ES')}</p>
            </div>
          ))}
        </div>
      )}
      {/* Usuarios bloqueados */}
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
      {/* Chat privado */}
      {chatAbierto && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">💬 Chat con {chatAbierto.nombre}</h3>
            <button onClick={cerrarChat} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="h-48 overflow-y-auto mb-3 space-y-2 bg-gray-900 p-3 rounded">
            {mensajes.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No hay mensajes aún. ¡Saluda!</p>
            ) : (
              mensajes.map((m) => (
                <div key={m.id} className={lex }>
                  <div className={max-w-[80%] px-3 py-2 rounded-lg text-sm }>
                    {m.texto}
                    <div className="text-[10px] opacity-70 mt-1">{new Date(m.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Escribe un mensaje..." value={mensajeTexto} onChange={(e) => setMensajeTexto(e.target.value)} onKeyDown={handleKeyDownMensaje} className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white" />
            <button onClick={enviarMensaje} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold">Enviar</button>
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
    </div>
  );
};