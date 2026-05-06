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

      {/* Liga actual */}
      <div className={`p-4 rounded-xl text-white shadow ${liga.color || "bg-gray-500"}`}>
        <p className="text-lg">Tu liga: <strong>{liga.nombre}</strong> {liga.emoji}</p>
        <p className="text-2xl font-bold">{puntos} puntos</p>
      </div>

      {/* Ranking */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">Ranking</h3>
        <ul className="divide-y">
          {ranking.map((entry, idx) => (
            <li key={idx} className={`py-2 flex justify-between ${entry.esUsuario ? "bg-blue-900 font-bold text-white" : ""}`}>
              <span>{idx + 1}. {entry.nombre} {entry.esUsuario ? "(Tú)" : ""}</span>
              <span>{entry.puntos} pts</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desafío contra bot */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-2">Desafío contra Bot</h3>
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
    </div>
  );
};