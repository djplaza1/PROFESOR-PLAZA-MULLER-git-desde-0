// src/features/comunidad/comunidadFeed.jsx
// Feed social de logros - Muro público de hitos, ascensos, rachas, etc.
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var FEED_KEY = 'muller_comunidad_feed';
  var REACCIONES_KEY = 'muller_comunidad_feed_reacciones';

  function getFeed(limite) {
    limite = limite || 50;
    try {
      var entradas = JSON.parse(localStorage.getItem(FEED_KEY)) || [];
      // Ordenar por timestamp descendente (más reciente primero)
      entradas.sort(function(a, b) { return b.timestamp - a.timestamp; });
      return entradas.slice(0, limite);
    } catch(e) { return []; }
  }

  function saveFeed(entradas) {
    localStorage.setItem(FEED_KEY, JSON.stringify(entradas));
  }

  function getReacciones(entradaId) {
    try {
      var todas = JSON.parse(localStorage.getItem(REACCIONES_KEY)) || {};
      return todas[entradaId] || { aplausos: [], animos: [] };
    } catch(e) { return { aplausos: [], animos: [] }; }
  }

  function saveReaccion(entradaId, tipo, usuarioId, usuarioNombre) {
    var todas = JSON.parse(localStorage.getItem(REACCIONES_KEY)) || {};
    if (!todas[entradaId]) todas[entradaId] = { aplausos: [], animos: [] };
    var arr = todas[entradaId][tipo] || [];
    // Verificar si ya reaccionó
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === usuarioId) {
        arr.splice(i, 1); // quitar reacción (toggle)
        todas[entradaId][tipo] = arr;
        localStorage.setItem(REACCIONES_KEY, JSON.stringify(todas));
        return { ok: true, activo: false };
      }
    }
    arr.push({ id: usuarioId, nombre: usuarioNombre, timestamp: Date.now() });
    todas[entradaId][tipo] = arr;
    localStorage.setItem(REACCIONES_KEY, JSON.stringify(todas));
    return { ok: true, activo: true };
  }

  // ─── Tipos de entrada ───
  // { id, tipo, titulo, descripcion, usuarioId, usuarioNombre, timestamp, metadata }
  // tipos: 'logro', 'ascenso', 'racha', 'hito', 'puntaje', 'personalizado'

  function publicarEntrada(tipo, titulo, descripcion, metadata) {
    metadata = metadata || {};
    var entrada = {
      id: 'feed_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      tipo: tipo,
      titulo: titulo,
      descripcion: descripcion,
      usuarioId: 'yo',
      usuarioNombre: 'Yo',
      timestamp: Date.now(),
      metadata: metadata
    };
    var feed = JSON.parse(localStorage.getItem(FEED_KEY)) || [];
    feed.push(entrada);
    // Mantener máximo 200 entradas
    if (feed.length > 200) feed = feed.slice(-200);
    saveFeed(feed);

    // Mostrar toast si existe
    if (window.Muller.Toast) {
      window.Muller.Toast.showCustom('¡Nuevo logro!', titulo, getIconoPorTipo(tipo), 4000);
    }

    return entrada;
  }

  function getIconoPorTipo(tipo) {
    var iconos = {
      logro: '🏆',
      ascenso: '⭐',
      racha: '🔥',
      hito: '🎯',
      puntaje: '💯',
      personalizado: '📌'
    };
    return iconos[tipo] || '📌';
  }

  // ─── Publicaciones automáticas desde otros módulos ───
  // Estas funciones son llamadas por otros módulos (Historia, Biblioteca, Entrenamiento)

  function publicarLogroDesbloqueado(nombreLogro, descripcion) {
    return publicarEntrada('logro', '🎖️ Logro desbloqueado: ' + nombreLogro, descripcion, { logro: nombreLogro });
  }

  function publicarAscensoLiga(ligaAnterior, ligaNueva, puntos) {
    return publicarEntrada('ascenso', '⬆️ Ascenso a ' + ligaNueva, '¡Subiste de ' + ligaAnterior + ' a ' + ligaNueva + ' con ' + puntos + ' pts!', { desde: ligaAnterior, hasta: ligaNueva, puntos: puntos });
  }

  function publicarRacha(dias) {
    return publicarEntrada('racha', '🔥 Racha de ' + dias + ' días', '¡Llevas ' + dias + ' días seguidos aprendiendo alemán!', { dias: dias });
  }

  function publicarHitoCompletado(nombreHito, descripcion) {
    return publicarEntrada('hito', '🎯 Hito: ' + nombreHito, descripcion, { hito: nombreHito });
  }

  function publicarPuntaje(puntos, actividad) {
    return publicarEntrada('puntaje', '💯 ' + puntos + ' puntos ganados', 'Por ' + actividad, { puntos: puntos, actividad: actividad });
  }

  // ─── Exponer API ───
  window.Muller.Comunidad.Feed = {
    getFeed: getFeed,
    getReacciones: getReacciones,
    reaccionar: function(entradaId, tipo, usuarioId, usuarioNombre) {
      if (tipo !== 'aplausos' && tipo !== 'animos') return { ok: false, msg: 'Tipo inválido' };
      return saveReaccion(entradaId, tipo, usuarioId || 'yo', usuarioNombre || 'Yo');
    },
    publicarEntrada: publicarEntrada,
    publicarLogroDesbloqueado: publicarLogroDesbloqueado,
    publicarAscensoLiga: publicarAscensoLiga,
    publicarRacha: publicarRacha,
    publicarHitoCompletado: publicarHitoCompletado,
    publicarPuntaje: publicarPuntaje,
    getIconoPorTipo: getIconoPorTipo
  };
})();