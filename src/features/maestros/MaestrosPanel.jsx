// src/features/maestros/MaestrosPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['maestros'] = ({ session }) => {
  const { useState, useEffect } = React;

  // SVG icons inline (no Lucide dependency)
  const SvgGraduationCap = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
  const SvgSearch = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  const SvgChevronDown = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  const SvgCheckCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  const SvgBookOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';

  const [lecciones, setLecciones] = useState(window.Muller.Maestros?.LECCIONES || []);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [progress, setProgress] = useState({});
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const prog = window.Muller.Maestros?.getProgress() || {};
    setProgress(prog);
    setCompletedCount(Object.values(prog).filter(Boolean).length);
  }, []);

  const toggleLeccion = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const markComplete = (id) => {
    const newProgress = window.Muller.Maestros?.toggleComplete(id);
    if (newProgress) {
      setProgress({...newProgress});
      setCompletedCount(Object.values(newProgress).filter(Boolean).length);
    }
  };

  const filtered = search.trim()
    ? lecciones.filter(l =>
        l.titulo.toLowerCase().includes(search.toLowerCase()) ||
        l.resumen.toLowerCase().includes(search.toLowerCase())
      )
    : lecciones;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl md:text-4xl font-black text-indigo-100 flex items-center gap-2 md:gap-3">
          <span className="w-8 h-8 md:w-10 md:h-10 inline-block" dangerouslySetInnerHTML={{ __html: SvgGraduationCap }} /> Maestros
        </h1>
        <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm font-bold text-indigo-200">
          {completedCount}/{lecciones.length} lecciones
        </div>
      </div>
      <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed border-b border-white/10 pb-3">
        Lecciones de gramática alemana explicadas por nuestros <strong className="text-white">maestros virtuales</strong>. Estudia cada tema, marca tu progreso y domina el idioma.
      </p>

      {/* Buscador */}
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

      {/* Lista de lecciones */}
      <div className="space-y-3">
        {filtered.map((leccion) => {
          const isExpanded = expanded === leccion.id;
          const isComplete = progress[leccion.id];
          return (
            <div key={leccion.id}
              className={`rounded-xl border ${leccion.colorBorde} ${leccion.bg} overflow-hidden transition-all duration-300`}>
              {/* Cabecera de la lección */}
              <button
                onClick={() => toggleLeccion(leccion.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-colors">
                <span className="text-2xl">{leccion.icono}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                    {leccion.titulo}
                    {isComplete && <span className="w-4 h-4 text-emerald-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgCheckCircle }} />}
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate">{leccion.resumen}</p>
                </div>
                <span className={`w-5 h-5 text-gray-400 transition-transform inline-block ${isExpanded ? 'rotate-180' : ''}`} dangerouslySetInnerHTML={{ __html: SvgChevronDown }} />
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
                        {leccion.ejemplos.map((ej, i) => (
                          <div key={i} className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-200 italic">
                            {ej}
                          </div>
                        ))}
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
          <div className="text-center text-gray-500 py-8">No se encontraron lecciones. Prueba con otros términos.</div>
        )}
      </div>

      {/* Progreso general */}
      <div className="rounded-xl bg-indigo-950/25 border border-indigo-500/25 p-4">
        <h3 className="text-sm font-black text-indigo-200 mb-2 flex items-center gap-2">
          <span className="w-4 h-4 inline-block" dangerouslySetInnerHTML={{ __html: SvgBookOpen }} /> Tu progreso en Maestros
        </h3>
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${lecciones.length ? (completedCount / lecciones.length) * 100 : 0}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400">
          {completedCount} de {lecciones.length} lecciones completadas
          {completedCount === lecciones.length ? ' ¡Felicidades, has completado todos los módulos! 🎉' : ''}
        </p>
      </div>

      {/* Mensaje motivacional */}
      {completedCount === lecciones.length && (
        <div className="rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-4 text-center animate-bounce-in">
          <p className="text-lg font-black text-indigo-200">¡Eres un maestro del alemán!</p>
          <p className="text-xs text-indigo-300 mt-1">Has completado todas las lecciones. Ahora practica en los demás paneles para consolidar tu conocimiento.</p>
        </div>
      )}
    </div>
  );
};