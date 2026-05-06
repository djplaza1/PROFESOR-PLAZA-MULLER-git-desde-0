// src/features/maestros/ProgresionMaestros.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

var ProgresionMaestros = function(props) {
  var onCerrar = props.onCerrar || function() {};

  function getSiguiente() {
    try { return window.Muller.Maestros.getSiguienteModulo(); } catch(e) { return null; }
  }

  function getDebiles() {
    try { return window.Muller.Maestros.getModulosDebiles(); } catch(e) { return []; }
  }

  function getStats() {
    try { return window.Muller.Maestros.getEstadisticas(); } catch(e) { return { porcentaje: 0, racha: 0, puntos: 0 }; }
  }

  function getTiempo() {
    try { return window.Muller.Maestros.getTiempoEstudioHoy(); } catch(e) { return 0; }
  }

  function getMeta() {
    try { return window.Muller.Maestros.getMetaDiaria(); } catch(e) { return false; }
  }

  function getModulosHoy() {
    try {
      var progress = window.Muller.Maestros.getProgress();
      var hoy = new Date();
      var hoyStr = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate();
      var count = 0;
      for (var id in progress) {
        if (progress[id].completado) {
          var d = new Date(progress[id].timestamp);
          var dStr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
          if (dStr === hoyStr) count++;
        }
      }
      return count;
    } catch(e) { return 0; }
  }

  var siguiente = getSiguiente();
  var debiles = getDebiles();
  var stats = getStats();
  var tiempoHoy = getTiempo();
  var metaCumplida = getMeta();
  var modulosHoy = getModulosHoy();

  React.useEffect(function() {
    if (window.lucide) {
      try { window.lucide.createIcons(); } catch(e) {}
    }
  });

  return React.createElement('div', {
    className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
  },
    React.createElement('div', {
      className: 'bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6'
    },
      // Header
      React.createElement('div', {
        className: 'flex items-center justify-between'
      },
        React.createElement('h2', {
          className: 'text-2xl font-bold text-white'
        }, '📊 Progresión y Recomendaciones'),
        React.createElement('button', {
          onClick: onCerrar,
          className: 'text-gray-400 hover:text-white text-2xl'
        }, '✕')
      ),

      // ─── Estadísticas de hoy ───
      React.createElement('div', {
        className: 'bg-gray-800 rounded-lg p-4 space-y-3'
      },
        React.createElement('h3', {
          className: 'text-lg font-semibold text-emerald-400'
        }, '📈 Tu progreso hoy'),
        React.createElement('div', {
          className: 'grid grid-cols-3 gap-3'
        },
          React.createElement('div', {
            className: 'bg-gray-700/50 rounded-lg p-3 text-center'
          },
            React.createElement('p', { className: 'text-2xl font-bold text-white' }, tiempoHoy + ' min'),
            React.createElement('p', { className: 'text-xs text-gray-400' }, 'Tiempo estudio')
          ),
          React.createElement('div', {
            className: 'bg-gray-700/50 rounded-lg p-3 text-center'
          },
            React.createElement('p', { className: 'text-2xl font-bold text-white' }, modulosHoy.toString()),
            React.createElement('p', { className: 'text-xs text-gray-400' }, 'Módulos hoy')
          ),
          React.createElement('div', {
            className: 'bg-gray-700/50 rounded-lg p-3 text-center'
          },
            React.createElement('p', { className: 'text-2xl font-bold text-amber-400' }, stats.racha.toString()),
            React.createElement('p', { className: 'text-xs text-gray-400' }, '🔥 Racha días')
          )
        )
      ),

      // ─── Barra de meta diaria ───
      React.createElement('div', {
        className: 'bg-gray-800 rounded-lg p-4 space-y-2'
      },
        React.createElement('div', {
          className: 'flex justify-between text-sm'
        },
          React.createElement('span', { className: 'text-gray-300' }, '🎯 Meta diaria: ' + (metaCumplida ? '¡Completada!' : 'Estudia al menos 1 módulo')),
          React.createElement('span', { className: 'text-gray-400' }, modulosHoy + '/1 módulos')
        ),
        React.createElement('div', {
          className: 'w-full bg-gray-700 rounded-full h-3 overflow-hidden'
        },
          React.createElement('div', {
            className: (metaCumplida ? 'bg-emerald-500' : 'bg-amber-500') + ' h-full rounded-full transition-all duration-500',
            style: { width: (metaCumplida ? '100%' : Math.min(modulosHoy * 100, 99) + '%') }
          })
        )
      ),

      // ─── Siguiente lección recomendada ───
      React.createElement('div', {
        className: 'bg-gray-800 rounded-lg p-4 space-y-3'
      },
        React.createElement('h3', {
          className: 'text-lg font-semibold text-blue-400'
        }, '📖 Siguiente lección recomendada'),
        siguiente
          ? React.createElement('div', {
              className: 'flex items-center justify-between bg-gray-700/50 rounded-lg p-3'
            },
              React.createElement('div', {
                className: 'flex-1'
              },
                React.createElement('p', { className: 'text-white font-medium' }, siguiente.titulo || siguiente.nombre),
                React.createElement('p', { className: 'text-sm text-gray-400' }, 'Nivel: ' + (siguiente.nivelId || siguiente.nivel || '?'))
              ),
              React.createElement('button', {
                onClick: function() { onCerrar(); if (props.onIrALeccion) props.onIrALeccion(siguiente); },
                className: 'bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors'
              }, 'Ir a la lección →')
            )
          : React.createElement('p', { className: 'text-gray-400 italic' }, '🎉 ¡Todos los módulos completados!')
      ),

      // ─── Módulos débiles ───
      debiles.length > 0
        ? React.createElement('div', {
            className: 'bg-gray-800 rounded-lg p-4 space-y-3'
          },
            React.createElement('h3', {
              className: 'text-lg font-semibold text-orange-400'
            }, '⚠️ Módulos para repasar'),
            debiles.slice(0, 3).map(function(mod, idx) {
              return React.createElement('div', {
                key: idx,
                className: 'flex items-center justify-between bg-gray-700/50 rounded-lg p-3'
              },
                React.createElement('div', {
                  className: 'flex-1'
                },
                  React.createElement('p', { className: 'text-white font-medium' }, mod.titulo || mod.nombre || mod.id),
                  React.createElement('p', { className: 'text-sm text-gray-400' }, mod.fallos + ' fallos · Nivel ' + (mod.nivelId || mod.nivel || '?'))
                ),
                React.createElement('button', {
                  onClick: function() { onCerrar(); if (props.onRepasar) props.onRepasar(mod); },
                  className: 'bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors'
                }, 'Repasar')
              );
            })
          )
        : null,

      // ─── Progreso general ───
      React.createElement('div', {
        className: 'bg-gray-800 rounded-lg p-4 space-y-2'
      },
        React.createElement('h3', {
          className: 'text-lg font-semibold text-purple-400'
        }, '🎓 Progreso general'),
        React.createElement('div', {
          className: 'flex justify-between text-sm'
        },
          React.createElement('span', { className: 'text-gray-300' }, stats.completadas + ' / ' + stats.totalLecciones + ' lecciones'),
          React.createElement('span', { className: 'text-gray-400' }, stats.porcentaje + '% completado')
        ),
        React.createElement('div', {
          className: 'w-full bg-gray-700 rounded-full h-4 overflow-hidden'
        },
          React.createElement('div', {
            className: 'bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500',
            style: { width: stats.porcentaje + '%' }
          })
        ),
        React.createElement('p', {
          className: 'text-center text-sm text-gray-400 mt-1'
        }, 'Nivel actual: ' + stats.nivelActual + ' · ' + stats.puntos + ' puntos totales')
      )
    )
  );
};

window.Muller.Panels['progresionMaestros'] = ProgresionMaestros;
