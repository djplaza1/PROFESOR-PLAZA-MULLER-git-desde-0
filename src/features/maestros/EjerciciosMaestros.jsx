// src/features/maestros/EjerciciosMaestros.jsx
// Panel de ejercicios de práctica global por nivel y módulo
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['ejerciciosMaestros'] = ({ session, onVolver }) => {
  const { useState, useEffect, useMemo } = React;

  // SVG icons inline
  const SvgCheckCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  const SvgXCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
  const SvgRefresh = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>';
  const SvgChevronDown = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  // Obtener niveles con contenido
  const nivelesDisponibles = useMemo(() => {
    var todos = window.Muller.Maestros.getAllLevels ? window.Muller.Maestros.getAllLevels() : [];
    return todos.filter(function(n) { return n.modulos && n.modulos.length > 0; });
  }, []);

  // Estado
  const [nivelSeleccionado, setNivelSeleccionado] = useState("A1");
  const [moduloSeleccionado, setModuloSeleccionado] = useState("todos");
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [acertadas, setAcertadas] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [modo, setModo] = useState("seleccion"); // seleccion | jugando | resultado

  // Módulos del nivel seleccionado
  const modulosDisponibles = useMemo(() => {
    var nivelInfo = nivelesDisponibles.find(function(n) { return n.nivelRaiz === nivelSeleccionado; });
    if (!nivelInfo) return [];
    return nivelInfo.modulos;
  }, [nivelSeleccionado, nivelesDisponibles]);

  // Obtener preguntas de un módulo específico
  const obtenerPreguntasModulo = function(modulo) {
    if (!modulo || !modulo.ejercicioBase || !modulo.ejercicioBase.preguntas) return [];
    return modulo.ejercicioBase.preguntas.map(function(p) {
      return Object.assign({}, p, { moduloId: modulo.id, moduloTitulo: modulo.titulo });
    });
  };

  // Iniciar juego
  const iniciarJuego = function() {
    var pool = [];
    if (moduloSeleccionado === "todos") {
      modulosDisponibles.forEach(function(mod) {
        pool = pool.concat(obtenerPreguntasModulo(mod));
      });
    } else {
      var modulo = modulosDisponibles.find(function(m) { return m.id === moduloSeleccionado; });
      if (modulo) pool = obtenerPreguntasModulo(modulo);
    }
    if (pool.length === 0) {
      alert("No hay ejercicios disponibles para esta selección.");
      return;
    }
    // Mezclar y limitar a 15
    var mezcladas = pool.slice().sort(function() { return Math.random() - 0.5; });
    setPreguntas(mezcladas.slice(0, Math.min(30, mezcladas.length)));
    setIndice(0);
    setRespuesta(null);
    setMostrarFeedback(false);
    setAcertadas(0);
    setTotalRespondidas(0);
    setModo("jugando");
  };

  // Responder a una pregunta de tipo opción
  const responderOpcion = function(idxOpcion) {
    if (mostrarFeedback || respuesta !== null) return;
    setRespuesta(idxOpcion);
    setMostrarFeedback(true);
    var correcta = preguntas[indice].respuesta;
    var esCorrecta = preguntas[indice].opciones[idxOpcion] === correcta;
    if (esCorrecta) setAcertadas(function(a) { return a + 1; });
    setTotalRespondidas(function(t) { return t + 1; });
  };

  // Responder a una pregunta de tipo hueco (texto)
  const responderHueco = function(texto) {
    if (mostrarFeedback || respuesta !== null) return;
    var textoLimpio = texto.trim();
    if (!textoLimpio) return;
    setRespuesta(textoLimpio);
    setMostrarFeedback(true);
    var correcta = preguntas[indice].respuesta;
    var esCorrecta = textoLimpio.toLowerCase() === correcta.toLowerCase();
    if (esCorrecta) setAcertadas(function(a) { return a + 1; });
    setTotalRespondidas(function(t) { return t + 1; });
  };

  // Siguiente pregunta
  const siguientePregunta = function() {
    if (indice + 1 >= preguntas.length) {
      setModo("resultado");
      return;
    }
    setIndice(indice + 1);
    setRespuesta(null);
    setMostrarFeedback(false);
  };

  // Render
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onVolver} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-gray-300 transition-all">
          ← Volver a Maestros
        </button>
        <h2 className="text-xl font-black text-orange-200">🎯 Práctica</h2>
      </div>

      {modo === "seleccion" && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Nivel</label>
            <select
              value={nivelSeleccionado}
              onChange={function(e) { setNivelSeleccionado(e.target.value); setModuloSeleccionado('todos'); }}
              className="w-full bg-black/40 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-indigo-400"
            >
              {nivelesDisponibles.map(function(n) {
                return <option key={n.nivelRaiz} value={n.nivelRaiz}>{n.nombre} {n.descripcion ? '- ' + n.descripcion : ''}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Módulo</label>
            <select
              value={moduloSeleccionado}
              onChange={function(e) { setModuloSeleccionado(e.target.value); }}
              className="w-full bg-black/40 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-indigo-400"
            >
              <option value="todos">📚 Todos los módulos mezclados</option>
              {modulosDisponibles.map(function(mod) {
                return <option key={mod.id} value={mod.id}>{mod.icono} {mod.titulo}</option>;
              })}
            </select>
          </div>
          <button
            onClick={iniciarJuego}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-sm transition-all"
          >
            ¡Iniciar práctica!
          </button>
        </div>
      )}

      {modo === "jugando" && preguntas.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Pregunta {indice + 1} de {preguntas.length}</span>
            <span>{acertadas}/{totalRespondidas} aciertos</span>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-sm text-gray-200">{preguntas[indice].frase}</p>
          </div>

          {preguntas[indice].tipo === 'opcion' && preguntas[indice].opciones ? (
            <div className="space-y-2">
              {preguntas[indice].opciones.map(function(opt, idxOpt) {
                var esCorrecta = opt === preguntas[indice].respuesta;
                var clase = "w-full text-left px-4 py-3 rounded-xl text-sm font-bold border transition-all ";
                if (!mostrarFeedback) {
                  clase += "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10";
                } else if (respuesta === idxOpt && esCorrecta) {
                  clase += "bg-emerald-600/40 border-emerald-400 text-emerald-200";
                } else if (respuesta === idxOpt && !esCorrecta) {
                  clase += "bg-red-600/40 border-red-400 text-red-200";
                } else if (esCorrecta && mostrarFeedback) {
                  clase += "bg-emerald-600/40 border-emerald-400 text-emerald-200";
                } else {
                  clase += "bg-white/5 border-white/20 text-gray-500";
                }
                return (
                  <button
                    key={idxOpt}
                    onClick={function() { responderOpcion(idxOpt); }}
                    disabled={mostrarFeedback}
                    className={clase}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="respuestaHueco"
                  placeholder="Escribe tu respuesta"
                  disabled={mostrarFeedback}
                  className="flex-1 bg-black/40 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-indigo-400 disabled:opacity-50"
                  onKeyDown={function(e) {
                    if (e.key === 'Enter' && !mostrarFeedback) {
                      responderHueco(e.target.value);
                    }
                  }}
                />
                <button
                  onClick={function() {
                    var input = document.getElementById('respuestaHueco');
                    if (input) responderHueco(input.value);
                  }}
                  disabled={mostrarFeedback}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {mostrarFeedback && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {acertadas > (indice === 0 ? 0 : acertadas - (respuesta !== null && preguntas[indice].opciones
                  ? (preguntas[indice].opciones[respuesta] === preguntas[indice].respuesta ? 1 : 0)
                  : (respuesta === preguntas[indice].respuesta ? 1 : 0))) ? (
                  <span className="text-emerald-400 text-sm font-bold">✅ Correcto</span>
                ) : (
                  <span className="text-red-400 text-sm font-bold">
                    ❌ Incorrecto. Respuesta: {preguntas[indice].respuesta}
                  </span>
                )}
              </div>
              {preguntas[indice].traduccion && (
                <p className="text-xs text-blue-300">🇪🇸 {preguntas[indice].traduccion}</p>
              )}
              {preguntas[indice].explicacion && (
                <p className="text-xs text-gray-400">{preguntas[indice].explicacion}</p>
              )}
              <button
                onClick={siguientePregunta}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl font-bold text-xs transition-all"
              >
                {indice + 1 >= preguntas.length ? 'Ver resultado final' : 'Siguiente →'}
              </button>
            </div>
          )}
        </div>
      )}

      {modo === "resultado" && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center space-y-4">
          <div className="text-4xl">🏆</div>
          <h3 className="text-xl font-black text-white">Resultado</h3>
          <div className="text-3xl font-black text-yellow-400">{acertadas} / {totalRespondidas}</div>
          <p className="text-sm text-gray-400">
            {acertadas === totalRespondidas
              ? '¡Perfecto! Dominas este tema por completo.'
              : acertadas >= totalRespondidas / 2
              ? '¡Buen trabajo! Sigue practicando para mejorar.'
              : 'Sigue estudiando, ¡tú puedes!'}
          </p>
          <button
            onClick={function() { setModo("seleccion"); }}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-sm transition-all"
          >
            🔄 Nueva práctica
          </button>
        </div>
      )}
    </div>
  );
};