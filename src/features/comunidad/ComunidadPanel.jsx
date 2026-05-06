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
        ? ¡ASCENDISTE a !  +50 monedas
        : Descendiste a . ¡Sigue practicando!);
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
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">🏆 Comunidad <span className="text-sm text-gray-500">Liga {liga.nombre}</span></h2>

      {/* Liga actual */}
      <div className={`p-4 rounded-xl text-white shadow ${liga.color || "bg-gray-500"}`}>
        <p className="text-lg">Tu liga: <strong>{liga.nombre}</strong> {liga.emoji}</p>
        <p className="text-2xl font-bold">{puntos} puntos</p>
      </div>

      {/* Ranking */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Ranking</h3>
        <ul className="divide-y">
          {ranking.map((entry, idx) => (
            <li key={idx} className={`py-2 flex justify-between ${entry.esUsuario ? "bg-blue-100 dark:bg-blue-900 font-bold" : ""}`}>
              <span>{idx + 1}. {entry.nombre} {entry.esUsuario ? "(Tú)" : ""}</span>
              <span>{entry.puntos} pts</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desafío contra bot */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Desafío contra Bot</h3>
        {!desafio ? (
          <button onClick={iniciarDesafio} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
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
                  className="border rounded px-2 py-1 w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      manejarRespuesta(idx, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            ))}
            <p className="text-sm text-gray-500">Aciertos: {(desafio.respuestas || []).length}/{desafio.preguntas.length} | Recompensa máx: {desafio.recompensa} pts</p>
          </div>
        )}
      </div>
    </div>
  );
};