// src/features/comunidad/ComunidadPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['comunidad'] = ({ session }) => {
  const { useState, useEffect } = React;

  const [ranking, setRanking] = useState([]);
  const [liga, setLiga] = useState({});
  const [puntos, setPuntos] = useState(0);
  const [desafio, setDesafio] = useState(null);

  useEffect(() => {
    const pts = window.Muller.Comunidad.getPuntosUsuario();
    setPuntos(pts);
    setLiga(window.Muller.Comunidad.getLigaUsuario(pts));
    setRanking(window.Muller.Comunidad.generarRanking());
  }, []);

  const iniciarDesafio = () => {
    setDesafio(window.Muller.Comunidad.iniciarDesafioBot());
  };

  const manejarRespuesta = (indice, respuestaUsuario) => {
    if (!desafio) return;
    const correcta = desafio.preguntas[indice].respuesta.toLowerCase().trim();
    const resultado = respuestaUsuario.toLowerCase().trim() === correcta;
    // Aquí podríamos sumar puntos, guardar en progreso, etc.
    if (resultado) {
      alert("¡Correcto! +10 puntos");
      setPuntos(p => p + 10);
    } else {
      alert(`Incorrecto. La respuesta era: ${correcta}`);
    }
    // Eliminar desafío tras última pregunta
    if (indice === desafio.preguntas.length - 1) {
      setDesafio(null);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Comunidad</h2>

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
            <p className="text-sm text-gray-500">Recompensa: {desafio.recompensa} puntos</p>
          </div>
        )}
      </div>
    </div>
  );
};