// src/features/maestros/HistoriaMaestros.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['historiaMaestros'] = function HistoriaMaestros(props) {
  var nivel = props.nivel || "A1";
  var onVolver = props.onVolver || function(){};
  var nivelKey = nivel.replace('.', '_');
  var { useState, useMemo } = React;

  // Obtener módulos del nivel
  var contenido = window.Muller.Maestros && window.Muller.Maestros.contenido ?
    (window.Muller.Maestros.contenido[nivelKey] || []) : [];

  // Estado para el modo práctica
  var [moduloActivo, setModuloActivo] = useState(null);
  var [respuestas, setRespuestas] = useState({});
  var [resultados, setResultados] = useState({});

  // Generar huecos para un módulo
  var generarHuecos = function(modulo) {
    if (!modulo) return { tituloPartes: [], palabraOculta: "", indiceHueco: -1 };
    var palabras = modulo.titulo.split(' ');
    var indice = Math.floor(Math.random() * palabras.length);
    var palabraOculta = palabras[indice];
    var tituloPartes = [];
    for (var i = 0; i < palabras.length; i++) {
      tituloPartes.push({
        texto: i === indice ? "___" : palabras[i],
        esHueco: i === indice,
        indice: i
      });
    }
    return { tituloPartes: tituloPartes, palabraOculta: palabraOculta, indiceHueco: indice };
  };

  // Iniciar práctica con un módulo
  var iniciarPractica = function(modulo) {
    setModuloActivo(modulo);
    setRespuestas({});
    setResultados({});
  };

  // Verificar respuesta de un hueco
  var verificarRespuesta = function(palabraOriginal, respuestaUsuario) {
    var correcta = respuestaUsuario.trim().toLowerCase() === palabraOriginal.toLowerCase();
    return correcta;
  };

  // Renderizar práctica si hay módulo activo
  if (moduloActivo) {
    var huecos = generarHuecos(moduloActivo);
    var totalHuecos = 1; // Un hueco por ahora
    var respondidos = Object.keys(resultados).length;
    var aciertos = Object.values(resultados).filter(function(r) { return r === true; }).length;

    return (
      <div className="bg-gray-800/90 rounded-xl border border-gray-700/50 p-6 space-y-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">🎭 Práctica con Historia</h2>
            <p className="text-sm text-gray-400 mt-1">{moduloActivo.titulo}</p>
          </div>
          <button onClick={function(){ setModuloActivo(null); }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all">
            ← Volver
          </button>
        </div>

        {/* Progreso */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400">Progreso: {respondidos}/{totalHuecos}</span>
          <span className="text-emerald-400">✓ {aciertos} aciertos</span>
          <span className="text-red-400">✗ {respondidos - aciertos} fallos</span>
        </div>

        {/* Frase con hueco */}
        <div className="bg-gray-700/50 rounded-xl p-6 text-center">
          <p className="text-lg md:text-2xl text-white font-bold space-x-2">
            {huecos.tituloPartes.map(function(parte, i) {
              if (parte.esHueco) {
                return (
                  <span key={i} className="inline-block border-b-2 border-yellow-400 min-w-[80px] px-2 text-yellow-300">
                    {respuestas[parte.indice] || "___"}
                  </span>
                );
              }
              return <span key={i}>{parte.texto}</span>;
            })}
          </p>
        </div>

        {/* Input de respuesta */}
        {!resultados[huecos.indiceHueco] && resultados[huecos.indiceHueco] !== false ? (
          <div className="flex gap-3">
            <input
              type="text"
              value={respuestas[huecos.indiceHueco] || ""}
              onChange={function(e) {
                setRespuestas(function(prev) {
                  var next = {};
                  for (var k in prev) next[k] = prev[k];
                  next[huecos.indiceHueco] = e.target.value;
                  return next;
                });
              }}
              onKeyDown={function(e) {
                if (e.key === 'Enter') {
                  var esCorrecta = verificarRespuesta(huecos.palabraOculta, respuestas[huecos.indiceHueco] || "");
                  setResultados(function(prev) {
                    var next = {};
                    for (var k in prev) next[k] = prev[k];
                    next[huecos.indiceHueco] = esCorrecta;
                    return next;
                  });
                }
              }}
              placeholder="Escribe la palabra correcta..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm outline-none focus:border-yellow-500 transition-colors"
            />
            <button onClick={function() {
              var esCorrecta = verificarRespuesta(huecos.palabraOculta, respuestas[huecos.indiceHueco] || "");
              setResultados(function(prev) {
                var next = {};
                for (var k in prev) next[k] = prev[k];
                next[huecos.indiceHueco] = esCorrecta;
                return next;
              });
            }}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-yellow-600 text-white hover:bg-yellow-500 transition-all">
              Comprobar
            </button>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className={`text-lg font-bold ${resultados[huecos.indiceHueco] ? 'text-emerald-400' : 'text-red-400'}`}>
              {resultados[huecos.indiceHueco] ? '✓ ¡Correcto!' : '✗ Incorrecto'}
            </div>
            {!resultados[huecos.indiceHueco] && (
              <p className="text-gray-400">La respuesta correcta era: <strong className="text-white">{huecos.palabraOculta}</strong></p>
            )}
            {moduloActivo.explicacion && (
              <div className="bg-gray-700/30 rounded-lg p-4 text-sm text-gray-300 text-left"
                dangerouslySetInnerHTML={{ __html: moduloActivo.explicacion }} />
            )}
            <button onClick={function(){ iniciarPractica(moduloActivo); }}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all">
              ↩ Practicar de nuevo
            </button>
          </div>
        )}
      </div>
    );
  }

  // Vista principal: lista de módulos
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          📖 Historias para {nivel}
        </h2>
        {onVolver && (
          <button onClick={onVolver}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all">
            ← Volver
          </button>
        )}
      </div>

      {contenido.length === 0 && (
        <div className="bg-gray-800/50 rounded-xl p-8 text-center">
          <p className="text-gray-400">No hay contenido disponible para el nivel {nivel}.</p>
          <p className="text-gray-500 text-sm mt-2">Selecciona otro nivel en las pestañas superiores.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {contenido.map(function(modulo, idx) {
          var isComplete = window.Muller.Maestros && window.Muller.Maestros.isComplete(modulo.id);
          return (
            <div key={modulo.id || idx}
              className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition-all">
              <div className="text-2xl flex-shrink-0">{modulo.icono || "📖"}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">
                  {modulo.titulo}
                  {isComplete && <span className="ml-2 text-emerald-400">✓</span>}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{modulo.descripcion || modulo.resumen || ""}</p>
              </div>
              <button onClick={function(){ iniciarPractica(modulo); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:bg-purple-600/50 transition-all flex-shrink-0">
                🎭 Practicar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};