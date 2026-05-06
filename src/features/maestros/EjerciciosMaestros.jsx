// src/features/maestros/EjerciciosMaestros.jsx
// Panel de ejercicios de práctica para Maestros
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['ejerciciosMaestros'] = ({ session, onVolver }) => {
  const { useState, useEffect, useMemo } = React;

  const SvgCheckCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  const SvgXCircle = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
  const SvgRefresh = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>';

  // Banco de preguntas organizado por nivel y lección
  const PREGUNTAS = [
    { id: 1, nivel: "A1", leccion: "artikel", pregunta: '¿Cuál es el artículo correcto para "Mann" (hombre)?', opciones: ["der", "die", "das", "den"], correcta: 0 },
    { id: 2, nivel: "A1", leccion: "artikel", pregunta: '¿Cuál es el artículo correcto para "Frau" (mujer)?', opciones: ["der", "die", "das", "den"], correcta: 1 },
    { id: 3, nivel: "A1", leccion: "artikel", pregunta: '¿Cuál es el artículo correcto para "Kind" (niño)?', opciones: ["der", "die", "das", "den"], correcta: 2 },
    { id: 4, nivel: "A1", leccion: "artikel", pregunta: '¿Qué artículo suele llevar una palabra terminada en "-ung"?', opciones: ["der", "die", "das", "den"], correcta: 1 },
    { id: 5, nivel: "A1", leccion: "artikel", pregunta: '¿Qué artículo suele llevar una palabra terminada en "-chen"?', opciones: ["der", "die", "das", "den"], correcta: 2 },
    { id: 6, nivel: "A1", leccion: "verbos", pregunta: 'Conjuga "machen" (hacer) para "ich":', opciones: ["mache", "machst", "macht", "machen"], correcta: 0 },
    { id: 7, nivel: "A1", leccion: "verbos", pregunta: 'Conjuga "machen" para "du":', opciones: ["mache", "machst", "macht", "machen"], correcta: 1 },
    { id: 8, nivel: "A1", leccion: "verbos", pregunta: 'Conjuga "machen" para "er/sie/es":', opciones: ["mache", "machst", "macht", "machen"], correcta: 2 },
    { id: 9, nivel: "A1", leccion: "verbos", pregunta: 'El Perfekt de "machen" es:', opciones: ["hat gemacht", "ist gemacht", "machte", "hat gemachen"], correcta: 0 },
    { id: 10, nivel: "A1", leccion: "verbos", pregunta: '¿Qué verbo auxiliar usa "fahren" en Perfekt?', opciones: ["haben", "sein", "werden", "tun"], correcta: 1 },
    { id: 11, nivel: "A1", leccion: "pronombres", pregunta: 'El acusativo de "ich" es:', opciones: ["mir", "mich", "mein", "ich"], correcta: 1 },
    { id: 12, nivel: "A1", leccion: "pronombres", pregunta: 'El dativo de "du" es:', opciones: ["dich", "dein", "dir", "du"], correcta: 2 },
    { id: 13, nivel: "A1", leccion: "pronombres", pregunta: 'El acusativo de "er" es:', opciones: ["ihn", "ihm", "sein", "er"], correcta: 0 },
    { id: 14, nivel: "A1", leccion: "pronombres", pregunta: 'El dativo de "wir" es:', opciones: ["wir", "uns", "euch", "unser"], correcta: 1 },
    { id: 15, nivel: "A2", leccion: "preposiciones", pregunta: '¿Qué caso usa la preposición "mit"?', opciones: ["Acusativo", "Dativo", "Genitivo", "Nominativo"], correcta: 1 },
    { id: 16, nivel: "A2", leccion: "preposiciones", pregunta: '¿Qué caso usa la preposición "für"?', opciones: ["Acusativo", "Dativo", "Genitivo", "Nominativo"], correcta: 0 },
    { id: 17, nivel: "A2", leccion: "preposiciones", pregunta: '"Ich gehe ___ Schule" (movimiento). ¿Qué preposición y artículo?', opciones: ["in der", "in die", "zur", "in den"], correcta: 1 },
    { id: 18, nivel: "A2", leccion: "preposiciones", pregunta: '"Ich bin ___ Schule" (ubicación). ¿Qué preposición y artículo?', opciones: ["in der", "in die", "zur", "in den"], correcta: 0 },
    { id: 19, nivel: "A2", leccion: "preposiciones", pregunta: '¿Cuál de estas es una Wechselpräposition?', opciones: ["mit", "für", "auf", "aus"], correcta: 2 },
    { id: 20, nivel: "A2", leccion: "oraciones", pregunta: 'En una oración principal afirmativa, el verbo conjugado va en posición:', opciones: ["Primera", "Segunda", "Última", "Tercera"], correcta: 1 },
    { id: 21, nivel: "A2", leccion: "oraciones", pregunta: 'En una pregunta sí/no, el verbo va en posición:', opciones: ["Primera", "Segunda", "Última", "No importa"], correcta: 0 },
    { id: 22, nivel: "A2", leccion: "oraciones", pregunta: 'En una subordinada con "weil", el verbo va:', opciones: ["Al principio", "En segunda posición", "Al final", "No aparece"], correcta: 2 },
    { id: 23, nivel: "A2", leccion: "oraciones", pregunta: '"Ich ___ heute arbeiten" (müssen). Completa:', opciones: ["muss", "müßen", "muß", "musst"], correcta: 0 },
    { id: 24, nivel: "B1", leccion: "declinacion", pregunta: '"Der gut___ Wein" (Nominativo, masc.) Completa:', opciones: ["-e", "-en", "-er", "-es"], correcta: 0 },
    { id: 25, nivel: "B1", leccion: "declinacion", pregunta: '"Den gut___ Wein" (Acusativo, masc.) Completa:', opciones: ["-e", "-en", "-er", "-es"], correcta: 1 },
    { id: 26, nivel: "B1", leccion: "declinacion", pregunta: '"Ein gut___ Wein" (Nominativo, masc., indefinido) Completa:', opciones: ["-e", "-en", "-er", "-es"], correcta: 2 },
    { id: 27, nivel: "B1", leccion: "declinacion", pregunta: '"Mit gut___ Wein" (Dativo) Completa:', opciones: ["-em", "-en", "-er", "-es"], correcta: 0 },
    { id: 28, nivel: "B1", leccion: "declinacion", pregunta: '"Die schön___ Frau" (Nominativo, fem.) Completa:', opciones: ["-e", "-en", "-er", "-es"], correcta: 0 }
  ];

  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null); // index seleccionado
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [acertadas, setAcertadas] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [filtroNivel, setFiltroNivel] = useState("A1");
  const [modo, setModo] = useState("seleccion"); // seleccion | jugando | resultado

  const iniciarJuego = () => {
    var pool = PREGUNTAS.filter(function(p) { return p.nivel === filtroNivel; });
    // Mezclar
    var mezcladas = pool.slice().sort(function() { return Math.random() - 0.5; });
    setPreguntas(mezcladas.slice(0, 10));
    setIndice(0);
    setRespuesta(null);
    setMostrarFeedback(false);
    setAcertadas(0);
    setTotalRespondidas(0);
    setModo("jugando");
  };

  const responder = function(idx) {
    if (mostrarFeedback || respuesta !== null) return;
    setRespuesta(idx);
    setMostrarFeedback(true);
    var esCorrecta = preguntas[indice].opciones[idx] === preguntas[indice].opciones[preguntas[indice].correcta];
    if (esCorrecta) setAcertadas(function(a) { return a + 1; });
    setTotalRespondidas(function(t) { return t + 1; });
  };

  const siguientePregunta = function() {
    if (indice + 1 >= preguntas.length) {
      setModo("resultado");
      // Bonus: marcar como completado en el progress (opcional)
      return;
    }
    setIndice(function(i) { return i + 1; });
    setRespuesta(null);
    setMostrarFeedback(false);
  };

  // Pantalla de selección
  if (modo === "seleccion") {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onVolver} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-black text-white">⚡ Ejercicios Maestros</h1>
        </div>
        <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/25 p-6 space-y-6">
          <div>
            <p className="text-sm font-bold text-indigo-200 mb-2">Selecciona un nivel:</p>
            <div className="flex flex-wrap gap-2">
              {["A1", "A2", "B1", "B2", "C1"].map(function(nivel) {
                var count = PREGUNTAS.filter(function(p) { return p.nivel === nivel; }).length;
                var colores = { A1: "border-blue-500 text-blue-300", A2: "border-green-500 text-green-300", B1: "border-yellow-500 text-yellow-300", B2: "border-lime-500 text-lime-300", C1: "border-violet-500 text-violet-300" };
                var activo = filtroNivel === nivel;
                return (
                  <button key={nivel}
                    onClick={() => setFiltroNivel(nivel)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      activo
                        ? colores[nivel] + ' bg-white/10'
                        : 'border-white/10 text-gray-400 hover:bg-white/5'
                    }`}>
                    {nivel} <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={iniciarJuego}
            className="w-full py-3 rounded-xl bg-indigo-600/40 border border-indigo-500/40 text-indigo-200 font-bold text-sm hover:bg-indigo-600/60 transition-all">
            🎯 ¡Empezar ejercicios!
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (modo === "resultado") {
    var porcentaje = totalRespondidas > 0 ? Math.round((acertadas / totalRespondidas) * 100) : 0;
    return (
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24">
        <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/25 p-6 text-center space-y-4">
          <p className="text-4xl">{porcentaje >= 80 ? '🎉' : porcentaje >= 50 ? '👍' : '💪'}</p>
          <h2 className="text-xl font-black text-white">Ejercicio completado</h2>
          <p className="text-sm text-gray-300">
            Has acertado <strong className="text-indigo-300">{acertadas}</strong> de <strong className="text-indigo-300">{totalRespondidas}</strong> preguntas.
          </p>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${
                porcentaje >= 80 ? 'bg-emerald-500' : porcentaje >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: porcentaje + '%' }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {porcentaje === 100 ? '¡Perfecto! Dominas este nivel.' :
             porcentaje >= 80 ? '¡Muy bien! Sigue practicando.' :
             porcentaje >= 50 ? 'Bien, pero puedes mejorar. Repasa las lecciones.' :
             'Sigue estudiando las lecciones de este nivel.'}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button onClick={() => setModo("seleccion")}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-300 text-xs font-bold hover:bg-white/20 transition-all">
              ← Volver a niveles
            </button>
            <button onClick={iniciarJuego}
              className="px-4 py-2 rounded-xl bg-indigo-600/40 border border-indigo-500/40 text-indigo-200 text-xs font-bold hover:bg-indigo-600/60 transition-all">
              <span className="w-3.5 h-3.5 inline-block align-middle mr-1" dangerouslySetInnerHTML={{ __html: SvgRefresh }} />
              Repetir
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de juego
  if (preguntas.length === 0) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full">
        <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/25 p-6 text-center">
          <p className="text-gray-400">No hay preguntas disponibles para este nivel.</p>
          <button onClick={() => setModo("seleccion")} className="mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-300 text-xs font-bold">
            Volver
          </button>
        </div>
      </div>
    );
  }

  var pregunta = preguntas[indice];
  var esCorrecta = respuesta !== null && pregunta.opciones[respuesta] === pregunta.opciones[pregunta.correcta];

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-2xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setModo("seleccion")} className="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            {filtroNivel} • {indice + 1}/{preguntas.length}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-full border border-emerald-500/30">
            <span className="w-3 h-3 inline-block align-middle mr-1" dangerouslySetInnerHTML={{ __html: SvgCheckCircle }} />{acertadas}
          </span>
        </div>
      </div>

      {/* Pregunta */}
      <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/25 p-6 mb-4">
        <p className="text-sm font-bold text-indigo-200 mb-1">Pregunta {indice + 1}:</p>
        <p className="text-base text-white leading-relaxed">{pregunta.pregunta}</p>
      </div>

      {/* Opciones */}
      <div className="space-y-2 mb-4">
        {pregunta.opciones.map(function(opcion, idx) {
          var selected = respuesta === idx;
          var mostrarCorrecta = mostrarFeedback && pregunta.correcta === idx;
          var mostrarIncorrecta = mostrarFeedback && selected && !esCorrecta;
          return (
            <button key={idx}
              onClick={() => responder(idx)}
              disabled={mostrarFeedback}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                mostrarCorrecta
                  ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-200'
                  : mostrarIncorrecta
                    ? 'bg-red-900/40 border-red-500/50 text-red-200'
                    : selected
                      ? 'bg-indigo-600/30 border-indigo-500/40 text-indigo-200'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}>
              <span className="font-mono text-[10px] text-gray-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opcion}
              {mostrarCorrecta && <span className="float-right w-4 h-4 text-emerald-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgCheckCircle }} />}
              {mostrarIncorrecta && <span className="float-right w-4 h-4 text-red-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgXCircle }} />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {mostrarFeedback && (
        <div className={`rounded-xl p-4 mb-4 ${esCorrecta ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
          <p className="text-sm font-bold flex items-center gap-2">
            {esCorrecta
              ? <><span className="w-4 h-4 text-emerald-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgCheckCircle }} /> ¡Correcto!</>
              : <><span className="w-4 h-4 text-red-400 inline-block" dangerouslySetInnerHTML={{ __html: SvgXCircle }} /> Incorrecto. La respuesta correcta era: <strong className="text-white">{pregunta.opciones[pregunta.correcta]}</strong></>
            }
          </p>
        </div>
      )}

      {/* Siguiente */}
      {mostrarFeedback && (
        <button onClick={siguientePregunta}
          className="w-full py-3 rounded-xl bg-indigo-600/40 border border-indigo-500/40 text-indigo-200 font-bold text-sm hover:bg-indigo-600/60 transition-all">
          {indice + 1 >= preguntas.length ? 'Ver resultados' : 'Siguiente pregunta →'}
        </button>
      )}
    </div>
  );
};