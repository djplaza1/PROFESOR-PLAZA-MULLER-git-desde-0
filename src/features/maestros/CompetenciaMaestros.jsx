// src/features/maestros/CompetenciaMaestros.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

var CompetenciaMaestros = function(props) {
  var onCerrar = props.onCerrar || function() {};
  var h = window.Muller.CompetenciaHelper;

  var game = React.useState(false), setGame = game[1], jugando = game[0];
  var pts = React.useState(0), setPts = pts[1], puntaje = pts[0];
  var rac = React.useState(0), setRac = rac[1], racha = rac[0];
  var tim = React.useState(60), setTim = tim[1], tiempo = tim[0];
  var pre = React.useState(null), setPre = pre[1], pregunta = pre[0];
  var res = React.useState(0), setRes = res[1], respondidas = res[0];
  var fed = React.useState(null), setFed = fed[1], feedback = fed[0];
  var ran = React.useState([]), setRan = ran[1], ranking = ran[0];
  var fin = React.useState(false), setFin = fin[1], terminado = fin[0];
  var intRef = React.useRef(null);
  var nomRef = React.useRef(h.getNombre());

  React.useEffect(function() {
    setRan(h.getRanking());
  }, []);

  React.useEffect(function() {
    return function() { if (intRef.current) clearInterval(intRef.current); };
  }, []);

  function generar() { setPre(h.generarPregunta()); }

  function iniciar() {
    setGame(true); setPts(0); setRac(0); setTim(60);
    setRes(0); setFed(null); setFin(false);
    generar();
    if (intRef.current) clearInterval(intRef.current);
    intRef.current = setInterval(function() {
      setTim(function(p) {
        if (p <= 1) { clearInterval(intRef.current); intRef.current = null; setTimeout(terminar, 10); return 0; }
        return p - 1;
      });
    }, 1000);
  }

  function responder(op) {
    if (!pregunta || terminado || feedback) return;
    var correcta = op === pregunta.respuesta;
    setRes(function(p) { return p + 1; });
    if (correcta) {
      var ptsSum = Math.round(10 * (1 + racha * 0.5));
      setPts(function(p) { return p + ptsSum; });
      setRac(function(r) { return r + 1; });
      setFed({ t: 'ok', m: '✓ Correcto! +' + ptsSum + ' pts' });
      setTimeout(function() { setFed(null); generar(); }, 700);
    } else {
      setRac(0);
      setFed({ t: 'no', m: '✗ Incorrecto. Era: ' + pregunta.respuesta });
      setTimeout(function() { setFed(null); generar(); }, 1200);
    }
  }

  function terminar() {
    if (intRef.current) { clearInterval(intRef.current); intRef.current = null; }
    setFin(true); setGame(false);
    var nuevoRank = h.saveRanking(nomRef.current || 'Anónimo', puntaje);
    setRan(nuevoRank);
  }

  function cambiarNombre() {
    var n = prompt('Nombre para el ranking:', nomRef.current || '');
    if (n && n.trim()) { nomRef.current = n.trim(); h.setNombre(n.trim()); }
  }

  // Pantalla inicio
  if (!jugando && !terminado) {
    return React.createElement('div', { className: 'fixed inset-0 bg-black/80 flex items-center justify-center z-50' },
      React.createElement('div', { className: 'bg-gray-900 rounded-xl border border-gray-700 max-w-lg w-full p-8 text-center space-y-6' },
        React.createElement('h2', { className: 'text-3xl font-bold text-white' }, '🏆 Competencia'),
        React.createElement('p', { className: 'text-gray-300 text-lg' }, 'Responde preguntas sobre los módulos de maestros.'),
        React.createElement('div', { className: 'bg-gray-800 rounded-lg p-4 text-left space-y-2' },
          React.createElement('p', { className: 'text-gray-300 text-sm font-bold' }, '📋 Reglas:'),
          React.createElement('ul', { className: 'text-gray-400 text-sm space-y-1 list-disc list-inside' },
            React.createElement('li', null, '60 segundos para responder'),
            React.createElement('li', null, '10 pts por acierto, +5 pts extra por racha'),
            React.createElement('li', null, 'Preguntas sobre el contenido de los módulos'),
            React.createElement('li', null, 'Compite contra tu propio récord')
          )
        ),
        React.createElement('div', { className: 'flex justify-center gap-4' },
          React.createElement('button', { onClick: function() { cambiarNombre(); iniciar(); }, className: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold px-8 py-3 rounded-xl text-lg transition-all transform hover:scale-105' }, '¡Comenzar!'),
          React.createElement('button', { onClick: onCerrar, className: 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl text-lg transition-colors' }, 'Volver')
        ),
        ranking.length > 0
          ? React.createElement('div', { className: 'mt-4 pt-4 border-t border-gray-700' },
              React.createElement('h3', { className: 'text-lg font-semibold text-yellow-400 mb-2' }, '🏅 Ranking Top 10'),
              React.createElement('div', { className: 'space-y-1' },
                ranking.slice(0, 10).map(function(e, i) {
                  return React.createElement('div', { key: i, className: 'flex justify-between text-sm ' + (i === 0 ? 'text-yellow-300' : 'text-gray-300') },
                    React.createElement('span', null, (i + 1) + '. ' + e.nombre),
                    React.createElement('span', { className: 'font-bold' }, e.puntaje + ' pts')
                  );
                })
              )
            )
          : null
        )
      );
  }

  // Pantalla juego
  if (!terminado) {
    var colorT = tiempo <= 10 ? 'text-red-400' : 'text-white';
    var racEmoji = racha >= 5 ? '🔥' : racha >= 3 ? '⚡' : '';
    return React.createElement('div', { className: 'fixed inset-0 bg-black/80 flex items-center justify-center z-50' },
      React.createElement('div', { className: 'bg-gray-900 rounded-xl border border-gray-700 max-w-lg w-full p-6 space-y-4' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', { className: 'flex items-center gap-2' },
            React.createElement('span', { className: 'text-2xl font-bold ' + colorT }, '⏱ ' + tiempo + 's'),
            React.createElement('span', { className: 'text-gray-400 text-sm' }, '| ' + respondidas)
          ),
          React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement('span', { className: 'text-amber-400 font-bold' }, racEmoji + ' ' + racha),
            React.createElement('span', { className: 'text-emerald-400 font-bold text-xl' }, puntaje + ' pts')
          )
        ),
        React.createElement('div', { className: 'w-full bg-gray-700 rounded-full h-2' },
          React.createElement('div', {
            className: (tiempo <= 10 ? 'bg-red-500' : 'bg-emerald-500') + ' h-full rounded-full transition-all duration-1000',
            style: { width: (tiempo / 60 * 100) + '%' }
          })
        ),
        pregunta ? React.createElement('div', { className: 'space-y-4' },
          React.createElement('h3', { className: 'text-xl font-bold text-white text-center py-4' }, pregunta.pregunta),
          React.createElement('div', { className: 'grid grid-cols-1 gap-2' },
            pregunta.opciones.map(function(op, idx) {
              var cls = 'bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white rounded-lg p-3 text-left transition-all text-sm';
              if (feedback) {
                if (op === pregunta.respuesta) cls = 'bg-emerald-700 border-emerald-500 text-white rounded-lg p-3 text-left text-sm';
                else if (feedback.t === 'no') cls = 'bg-gray-700 border-red-500 text-gray-400 rounded-lg p-3 text-left text-sm';
              }
              return React.createElement('button', {
                key: idx, onClick: function() { responder(op); },
                disabled: feedback !== null, className: cls
              }, (idx + 1) + '. ' + op);
            })
          ),
          feedback ? React.createElement('div', {
            className: 'text-center py-2 text-sm font-bold ' + (feedback.t === 'ok' ? 'text-emerald-400' : 'text-red-400')
          }, feedback.m) : null
        ) : React.createElement('div', { className: 'text-center py-8 text-gray-400' }, 'Cargando...')
      )
    );
  }

  // Resultados
  return React.createElement('div', { className: 'fixed inset-0 bg-black/80 flex items-center justify-center z-50' },
    React.createElement('div', { className: 'bg-gray-900 rounded-xl border border-gray-700 max-w-lg w-full p-8 text-center space-y-6' },
      React.createElement('h2', { className: 'text-3xl font-bold text-yellow-400' }, '🏆 ¡Tiempo terminado!'),
      React.createElement('div', { className: 'bg-gray-800 rounded-lg p-6 space-y-3' },
        React.createElement('p', { className: 'text-5xl font-bold text-white' }, puntaje + ' pts'),
        React.createElement('p', { className: 'text-gray-400' }, respondidas + ' respondidas'),
        React.createElement('p', { className: 'text-gray-400' }, 'Racha máxima: ' + racha)
      ),
      React.createElement('div', { className: 'bg-gray-800 rounded-lg p-4 space-y-2' },
        React.createElement('h3', { className: 'text-lg font-semibold text-yellow-400' }, '🏅 Ranking'),
        ranking.length > 0 ? ranking.slice(0, 10).map(function(e, i) {
          var yo = e.nombre === nomRef.current && e.puntaje === puntaje;
          return React.createElement('div', { key: i, className: 'flex justify-between text-sm ' + (i === 0 ? 'text-yellow-300' : yo ? 'text-emerald-400' : 'text-gray-300') },
            React.createElement('span', null, (i + 1) + '. ' + e.nombre),
            React.createElement('span', { className: 'font-bold' }, e.puntaje + ' pts')
          );
        }) : React.createElement('p', { className: 'text-gray-400' }, 'Sin datos')
      ),
      React.createElement('div', { className: 'flex justify-center gap-4' },
        React.createElement('button', { onClick: function() { cambiarNombre(); iniciar(); }, className: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold px-6 py-3 rounded-xl text-lg transition-all' }, '🔄 Jugar de nuevo'),
        React.createElement('button', { onClick: onCerrar, className: 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl text-lg transition-colors' }, 'Volver')
      )
    )
  );
};

window.Muller.Panels['competenciaMaestros'] = CompetenciaMaestros;