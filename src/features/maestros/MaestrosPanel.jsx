// src/features/maestros/MaestrosPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['maestros'] = ({ session }) => {
  const { useState, useEffect, useMemo } = React;

  // SVG icons inline (no Lucide dependency)
  const SvgGraduationCap = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
  const SvgSearch = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  const SvgChevronDown = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  const SvgCheckCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  const SvgBookOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
  const SvgFlame = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>';
  const SvgStar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  const SvgZap = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

  const [lecciones, setLecciones] = useState((window.Muller.Maestros?.getTodasLasLecciones ? window.Muller.Maestros.getTodasLasLecciones() : window.Muller.Maestros?.LECCIONES || []));
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [progress, setProgress] = useState({});
  const [nivelActivo, setNivelActivo] = useState(null); // null = todos
  const [estadisticas, setEstadisticas] = useState(null);
  const [mostrarEjercicios, setMostrarEjercicios] = useState(false);
  const [mostrarIA, setMostrarIA] = useState(false);
  const [mostrarHistoria, setMostrarHistoria] = useState(false);
  const [mostrarProgresion, setMostrarProgresion] = useState(false);
  const [mostrarCompetencia, setMostrarCompetencia] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState('lecciones'); // 'lecciones' | 'historia'
  const [pestanaModulo, setPestanaModulo] = useState('teoria'); // 'teoria' | 'practica' | 'flashcards'
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState({});
  const [mostrarTraduccion, setMostrarTraduccion] = useState({});

  // Niveles disponibles para las pestañas de nivel
  const nivelesDisponibles = [
    { id: null, nombre: "Todos", color: "text-white" },
    { id: "A1", nombre: "A1", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500" },
    { id: "A2", nombre: "A2", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500" },
    { id: "B1", nombre: "B1", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500" },
    { id: "B2", nombre: "B2", color: "text-lime-400", bg: "bg-lime-500/20", border: "border-lime-500" },
    { id: "C1", nombre: "C1", color: "text-violet-400", bg: "bg-violet-500/20", border: "border-violet-500" }
  ];

  useEffect(() => {
    const prog = window.Muller.Maestros?.getProgress() || {};
    setProgress(prog);
    const stats = window.Muller.Maestros?.getEstadisticas ? window.Muller.Maestros.getEstadisticas() : null;
    setEstadisticas(stats);
  }, []);

  const toggleLeccion = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  
  // Funciones para práctica de ejercicios
  const responderPregunta = function(moduloId, preguntaIdx, respuestaUsuario) {
    var key = moduloId + '_' + preguntaIdx;
    var nuevasRespuestas = Object.assign({}, preguntasRespondidas);
    nuevasRespuestas[key] = respuestaUsuario;
    setPreguntasRespondidas(nuevasRespuestas);
    var nuevaTraduccion = Object.assign({}, mostrarTraduccion);
    nuevaTraduccion[key] = true;
    setMostrarTraduccion(nuevaTraduccion);
  };

  const esRespuestaCorrecta = function(moduloId, preguntaIdx, respuestaCorrecta) {
    var key = moduloId + '_' + preguntaIdx;
    var respuestaUsuario = preguntasRespondidas[key];
    if (!respuestaUsuario) return null;
    return respuestaUsuario.toLowerCase().trim() === respuestaCorrecta.toLowerCase().trim();
  };

  const obtenerColorBoton = function(moduloId, preguntaIdx, respuestaUsuario, respuestaCorrecta) {
    if (!respuestaUsuario) return 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20';
    var esCorrecta = respuestaUsuario.toLowerCase().trim() === respuestaCorrecta.toLowerCase().trim();
    return esCorrecta ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200' : 'bg-red-600/40 border-red-400 text-red-200';
  };
  const markComplete = (id) => {
    const newProgress = window.Muller.Maestros?.toggleComplete(id);
    if (newProgress) {
      setProgress({...newProgress});
      const stats = window.Muller.Maestros?.getEstadisticas ? window.Muller.Maestros.getEstadisticas() : null;
      setEstadisticas(stats);
    }
  };

  // Filtrar por búsqueda y nivel
  const filtered = useMemo(() => {
    var result = lecciones;
    if (nivelActivo) {
      result = result.filter(function(l) { return l.nivel === nivelActivo || (l.nivel && l.nivel.startsWith && l.nivel.startsWith(nivelActivo + '.')); });
    }
    if (search.trim()) {
      var s = search.toLowerCase();
      result = result.filter(function(l) {
        return l.titulo.toLowerCase().includes(s) || l.resumen.toLowerCase().includes(s);
      });
    }
    return result;
  }, [lecciones, nivelActivo, search]);

  // Contar completados por nivel
  const getCompletadosNivel = function(nivelId) {
    var total = 0;
    var comp = 0;
    lecciones.forEach(function(l) {
      if (l.nivel === nivelId || (l.nivel && l.nivel.startsWith && l.nivel.startsWith(nivelId + '.'))) {
        total++;
        if (window.Muller.Maestros.isComplete(l.id)) comp++;
      }
    });
    return { total: total, completados: comp };
  };

  // Colores de nivel para las tarjetas
  const getNivelColor = function(nivel) {
    var nivelRaiz = nivel && nivel.startsWith && nivel.includes('.') ? nivel.split('.')[0] : nivel; var map = {
      A1: { borde: "border-blue-500/30", bg: "bg-blue-950/20", texto: "text-blue-300", badge: "bg-blue-600/30 text-blue-200" },
      A2: { borde: "border-green-500/30", bg: "bg-green-950/20", texto: "text-green-300", badge: "bg-green-600/30 text-green-200" },
      B1: { borde: "border-yellow-500/30", bg: "bg-yellow-950/20", texto: "text-yellow-300", badge: "bg-yellow-600/30 text-yellow-200" },
      B2: { borde: "border-lime-500/30", bg: "bg-lime-950/20", texto: "text-lime-300", badge: "bg-lime-600/30 text-lime-200" },
      C1: { borde: "border-violet-500/30", bg: "bg-violet-950/20", texto: "text-violet-300", badge: "bg-violet-600/30 text-violet-200" }
    };
    return map[nivelRaiz] || map.A1;
  };

  // Mostrar panel de IA si se activó
  if (mostrarIA && window.Muller.Panels['maestroIA']) {
    var MaestroIAComp = window.Muller.Panels['maestroIA'];
    return React.createElement(MaestroIAComp, {
      session: session,
      onVolver: function() { setMostrarIA(false); }
    });
  }

  // Mostrar panel de ejercicios si se activó
  if (mostrarEjercicios && window.Muller.Panels['ejerciciosMaestros']) {
    var EjerciciosComp = window.Muller.Panels['ejerciciosMaestros'];
    return React.createElement(EjerciciosComp, {
      session: session,
      onVolver: function() { setMostrarEjercicios(false); }
    });
  }

  // Mostrar modal de competencia si se activó
  if (mostrarCompetencia) {
    var CompetenciaComp = window.Muller.Panels['competenciaMaestros'] || CompetenciaMaestros;
    if (typeof CompetenciaComp !== 'function' && typeof CompetenciaComp !== 'object') {
      CompetenciaComp = CompetenciaMaestros;
    }
    return React.createElement('div', null,
      React.createElement(CompetenciaComp, {
        onCerrar: function() { setMostrarCompetencia(false); }
      })
    );
  }

  // Mostrar modal de progresión si se activó
  if (mostrarProgresion) {
    var ProgresionComp = window.Muller.Panels['progresionMaestros'] || ProgresionMaestros;
    if (typeof ProgresionComp !== 'function' && typeof ProgresionComp !== 'object') {
      ProgresionComp = ProgresionMaestros;
    }
    return React.createElement('div', null,
      React.createElement(ProgresionComp, {
        onCerrar: function() { setMostrarProgresion(false); }
      })
    );
  }

  // Mostrar panel de historia si se activó
  if (pestanaActiva === 'historia' && window.Muller.Panels['historiaMaestros']) {
    var HistoriaComp = window.Muller.Panels['historiaMaestros'];
    return React.createElement(HistoriaComp, {
      nivel: nivelActivo || "A1",
      onVolver: function() { setPestanaActiva('lecciones'); }
    });
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-6">
      {/* Cabecera con botón Practicar e IA */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl md:text-4xl font-black text-indigo-100 flex items-center gap-2 md:gap-3">
          <span className="w-8 h-8 md:w-10 md:h-10 inline-block" dangerouslySetInnerHTML={{ __html: SvgGraduationCap }} /> Maestros
        </h1>
        <div className="flex items-center gap-2">
          {window.Muller.Panels['ejerciciosMaestros'] && (
            <button onClick={() => setMostrarEjercicios(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-600/30 border border-orange-500/40 text-orange-200 hover:bg-orange-600/50 transition-all">
              <span className="w-3.5 h-3.5 inline-block align-middle mr-1" dangerouslySetInnerHTML={{ __html: SvgZap }} />
              Practicar
            </button>
          )}
          {window.Muller.Panels['maestroIA'] && (
            <button onClick={() => setMostrarIA(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:bg-purple-600/50 transition-all">
              🤖 Preguntar IA
            </button>
          )}
          <button onClick={() => setMostrarCompetencia(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600/30 border border-amber-500/40 text-amber-200 hover:bg-amber-600/50 transition-all">
            🏆 Competencia
          </button>
          <button onClick={() => setMostrarProgresion(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-600/50 transition-all">
            📊 Recomendaciones
          </button>
          <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm font-bold text-indigo-200 flex items-center gap-2">
            <span dangerouslySetInnerHTML={{ __html: SvgStar }} className="w-4 h-4 inline-block" />
            {estadisticas ? estadisticas.puntos : 0} pts
          </div>
        </div>
      </div>
      <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed border-b border-white/10 pb-3">
        Lecciones de gramática alemana explicadas por nuestros <strong className="text-white">maestros virtuales</strong>. Estudia cada tema, marca tu progreso y domina el idioma.
      </p>

      {/* Pestañas principales: Lecciones | Historia */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
        <button
          onClick={() => setPestanaActiva('lecciones')}
          className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
            pestanaActiva === 'lecciones'
              ? 'bg-indigo-500/30 border-indigo-400 text-white'
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}>
          📚 Lecciones
        </button>
        <button
          onClick={() => setPestanaActiva('historia')}
          className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
            pestanaActiva === 'historia'
              ? 'bg-purple-500/30 border-purple-400 text-white'
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}>
          📖 Historia
        </button>
      </div>

      {/* Pestañas de nivel (FASE 2) */}
      {pestanaActiva === 'lecciones' && (
      <div className="flex flex-wrap gap-1.5">
        {nivelesDisponibles.map(function(nivel) {
          var activo = nivelActivo === nivel.id;
          var info = nivel.id ? getCompletadosNivel(nivel.id) : null;
          return (
            <button key={nivel.id || 'todos'}
              onClick={() => setNivelActivo(nivel.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                activo
                  ? nivel.id
                    ? nivel.bg + ' ' + nivel.color + ' ' + nivel.border
                    : 'bg-indigo-500/30 border-indigo-400 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}>
              {nivel.nombre}
              {info && info.total > 0 && (
                <span className="ml-1.5 opacity-70">({info.completados}/{info.total})</span>
              )}
            </button>
          );
        })}
      </div>
      )}

      {/* Buscador - solo en modo lecciones */}
      {pestanaActiva === 'lecciones' && (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgSearch }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar lección (ej: artículos, verbos, dativo...)"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-indigo-500/25 text-white text-sm outline-none focus:border-indigo-400 transition-colors"
        />
      </div>
      )}

      {/* Grid de lecciones (FASE 2) - solo en modo lecciones */}
      {pestanaActiva === 'lecciones' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(function(leccion) {
          var isExpanded = expanded === leccion.id;
          var isComplete = window.Muller.Maestros.isComplete(leccion.id);
          var nc = getNivelColor(leccion.nivel);
          return (
            <div key={leccion.id}
              className={`rounded-xl border ${nc.borde} ${nc.bg} overflow-hidden transition-all duration-300 ${isExpanded ? 'md:col-span-2' : ''}`}>
              {/* Cabecera de la lección */}
              <button
                onClick={() => toggleLeccion(leccion.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                <span className="text-2xl flex-shrink-0">{leccion.icono}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                    {leccion.titulo}
                    {isComplete && <span className="w-4 h-4 text-emerald-400 inline-block flex-shrink-0" dangerouslySetInnerHTML={{ __html: SvgCheckCircle }} />}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${nc.badge}`}>{leccion.nivel}</span>
                    <p className="text-[11px] text-gray-400 truncate">{leccion.resumen}</p>
                  </div>
                </div>
                <span className={`w-5 h-5 text-gray-400 transition-transform inline-block flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} dangerouslySetInnerHTML={{ __html: SvgChevronDown }} />
              </button>

              {/* Contenido expandible */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div
                    className="prose prose-invert prose-sm max-w-none text-gray-200 [&_p]:text-gray-200 [&_strong]:text-white [&_li]:text-gray-200 [&_th]:text-gray-300 [&_td]:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: leccion.explicacion }}
                  />
                  {leccion.ejemplos && leccion.ejemplos.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ejemplos clave</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                        {leccion.ejemplos.map(function(ej, i) {
                          return (
                            <div key={i} className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-200 italic">
                              {ej}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => markComplete(leccion.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      isComplete
                        ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-indigo-900/40 border-indigo-500/40 text-indigo-200 hover:bg-indigo-800/50'
                    }`}>
                    {isComplete ? '✓ Completado' : 'Marcar como completado'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">No se encontraron lecciones. Prueba con otros términos.</div>
        )}
      </div>

      )}

      {/* Progreso general y estadísticas (FASE 2 + FASE 3) - solo en modo lecciones */}
      {pestanaActiva === 'lecciones' && (
      <div className="rounded-xl bg-indigo-950/25 border border-indigo-500/25 p-4 space-y-4">
        <h3 className="text-sm font-black text-indigo-200 flex items-center gap-2">
          <span className="w-4 h-4 inline-block" dangerouslySetInnerHTML={{ __html: SvgBookOpen }} /> Tu progreso en Maestros
        </h3>

        {/* Barra de progreso general */}
        <div>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${estadisticas ? estadisticas.porcentaje : 0}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400">
            {estadisticas ? estadisticas.completadas : 0} de {estadisticas ? estadisticas.totalLecciones : 0} módulos completados
            {estadisticas && estadisticas.porcentaje === 100 ? ' ¡Felicidades, has completado todos los módulos! 🎉' : ''}
          </p>
        </div>

        {/* Métricas rápidas (FASE 3) */}
        {estadisticas && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-2.5 text-center">
              <span className="w-4 h-4 text-orange-400 inline-block mb-1" dangerouslySetInnerHTML={{ __html: SvgFlame }} />
              <p className="text-lg font-black text-orange-300">{estadisticas.racha}</p>
              <p className="text-[10px] text-gray-400">Días racha</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 text-center">
              <span className="w-4 h-4 text-yellow-400 inline-block mb-1" dangerouslySetInnerHTML={{ __html: SvgStar }} />
              <p className="text-lg font-black text-yellow-300">{estadisticas.puntos}</p>
              <p className="text-[10px] text-gray-400">Puntos</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 text-center">
              <span className="w-4 h-4 text-indigo-400 inline-block mb-1" dangerouslySetInnerHTML={{ __html: SvgGraduationCap }} />
              <p className="text-lg font-black text-indigo-300">{estadisticas.nivelActual}</p>
              <p className="text-[10px] text-gray-400">Nivel act.</p>
            </div>
          </div>
        )}

        {/* Progreso por nivel */}
        {['A1', 'A2', 'B1', 'B2', 'C1'].map(function(nivel) {
          var info = getCompletadosNivel(nivel);
          if (info.total === 0) return null;
          var nc = getNivelColor(nivel);
          return (
            <div key={nivel}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold ${nc.texto}`}>{nivel}</span>
                <span className="text-[10px] text-gray-400">{info.completados}/{info.total}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-700 ${info.total > 0 && info.completados === info.total ? 'bg-emerald-500' : nc.texto.replace('text-', 'bg-').replace('300', '500')}`}
                  style={{ width: `${info.total > 0 ? (info.completados / info.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Mensaje motivacional */}
        {estadisticas && estadisticas.porcentaje === 100 && (
          <div className="rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-4 text-center animate-bounce-in">
            <p className="text-lg font-black text-indigo-200">¡Eres un maestro del alemán!</p>
            <p className="text-xs text-indigo-300 mt-1">Has completado todas las lecciones. Ahora practica en los demás paneles para consolidar tu conocimiento.</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
