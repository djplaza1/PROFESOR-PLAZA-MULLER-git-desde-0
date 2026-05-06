// src/features/comunidad/comunidadTienda.jsx
// Mercado de puntos de la comunidad: canjear puntos por comodines y beneficios
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};
(function() {
  'use strict';

  var C = window.Muller.Comunidad;

  var PRODUCTOS_KEY = 'muller_tienda_productos';
  var COMPRAS_KEY = 'muller_tienda_compras';
  var PUNTOS_KEY = 'muller_comunidad_puntos';

  // Productos disponibles
  function getProductosPredeterminados() {
    return [
      { id: 'congelar_racha', nombre: '🧊 Congelar racha', descripcion: 'Congela tu racha de estudio por 1 día sin perderla', precio: 150, tipo: 'comodin', icono: '🧊', activo: true },
      { id: 'ayuda_examen', nombre: '📝 Ayuda extra en examen', descripcion: 'Revela una pista adicional durante un examen TELC', precio: 200, tipo: 'comodin', icono: '📝', activo: true },
      { id: 'tema_oscuro', nombre: '🎨 Tema visual: Oscuro premium', descripcion: 'Tema visual oscuro mejorado con acentos dorados', precio: 300, tipo: 'tema', icono: '🎨', activo: true },
      { id: 'tema_retro', nombre: '🎨 Tema visual: Retro', descripcion: 'Tema visual retro con colores vintage', precio: 300, tipo: 'tema', icono: '🎨', activo: true },
      { id: 'texto_goethe', nombre: '📖 Texto: Poema de Goethe', descripcion: 'Desbloquea "Der Erlkönig" de Goethe en la Biblioteca', precio: 100, tipo: 'texto', icono: '📖', activo: true },
      { id: 'texto_nietzsche', nombre: '📖 Texto: Nietzsche original', descripcion: 'Desbloquea un fragmento de "Also sprach Zarathustra"', precio: 150, tipo: 'texto', icono: '📖', activo: true },
      { id: 'texto_brecht', nombre: '📖 Texto: Bertolt Brecht', descripcion: 'Desbloquea "Mutter Courage und ihre Kinder" resumen', precio: 120, tipo: 'texto', icono: '📖', activo: true },
      { id: 'comodin_aleatorio', nombre: '🎲 Comodín aleatorio', descripcion: 'Recibe un producto aleatorio de la tienda', precio: 80, tipo: 'comodin', icono: '🎲', activo: true }
    ];
  }

  // Obtener productos disponibles
  C.Tienda = C.Tienda || {};
  C.Tienda.getProductos = function() {
    var data = localStorage.getItem(PRODUCTOS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch(e) { /* ignorar */ }
    }
    var predeterminados = getProductosPredeterminados();
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(predeterminados));
    return predeterminados;
  };

  // Guardar productos
  C.Tienda.guardarProductos = function(productos) {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productos));
  };

  // Comprar producto
  C.Tienda.comprar = function(productoId) {
    var productos = C.Tienda.getProductos();
    var producto = productos.find(function(p) { return p.id === productoId; });
    if (!producto) return { ok: false, msg: 'Producto no encontrado' };
    if (!producto.activo) return { ok: false, msg: 'Producto no disponible' };

    var puntosDisponibles = parseInt(localStorage.getItem(PUNTOS_KEY) || '0', 10);
    if (puntosDisponibles < producto.precio) {
      return { ok: false, msg: 'No tienes suficientes puntos. Necesitas ' + producto.precio + ' puntos, tienes ' + puntosDisponibles };
    }

    // Descontar puntos
    var nuevosPuntos = puntosDisponibles - producto.precio;
    localStorage.setItem(PUNTOS_KEY, String(nuevosPuntos));

    // Registrar compra
    var compras = C.Tienda.getCompras();
    var compra = {
      id: 'compra_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      productoId: producto.id,
      nombre: producto.nombre,
      tipo: producto.tipo,
      fecha: new Date().toISOString(),
      usado: false
    };
    compras.push(compra);
    localStorage.setItem(COMPRAS_KEY, JSON.stringify(compras));

    // Si es comodín aleatorio, aplicar efecto aleatorio
    if (productoId === 'comodin_aleatorio') {
      var predeterminados = getProductosPredeterminados();
      var itemsActivos = predeterminados.filter(function(p) { return p.activo && p.id !== 'comodin_aleatorio'; });
      var ganado = itemsActivos[Math.floor(Math.random() * itemsActivos.length)];
      // Registrar también el producto ganado
      var compraGanada = {
        id: 'compra_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        productoId: ganado.id,
        nombre: '🎉 GANASTE: ' + ganado.nombre,
        tipo: ganado.tipo,
        fecha: new Date().toISOString(),
        usado: false,
        esGanado: true
      };
      compras.push(compraGanada);
      localStorage.setItem(COMPRAS_KEY, JSON.stringify(compras));
      return { ok: true, puntos: nuevosPuntos, msg: '🎉 ¡Ganaste ' + ganado.nombre + '!', compra: compraGanada, esGanado: true };
    }

    return { ok: true, puntos: nuevosPuntos, msg: '✅ Has comprado: ' + producto.nombre, compra: compra };
  };

  // Obtener compras del usuario
  C.Tienda.getCompras = function() {
    var data = localStorage.getItem(COMPRAS_KEY);
    if (data) {
      try { return JSON.parse(data); } catch(e) { /* ignorar */ }
    }
    return [];
  };

  // Marcar compra como usada
  C.Tienda.usarComodin = function(compraId) {
    var compras = C.Tienda.getCompras();
    var idx = compras.findIndex(function(c) { return c.id === compraId; });
    if (idx === -1) return { ok: false, msg: 'Compra no encontrada' };
    if (compras[idx].usado) return { ok: false, msg: 'Ya usado' };
    compras[idx].usado = true;
    localStorage.setItem(COMPRAS_KEY, JSON.stringify(compras));
    return { ok: true, compra: compras[idx] };
  };

  // Aplicar efecto de un comodín
  C.Tienda.aplicarComodin = function(compraId) {
    var compras = C.Tienda.getCompras();
    var compra = compras.find(function(c) { return c.id === compraId; });
    if (!compra) return { ok: false, msg: 'Compra no encontrada' };
    if (compra.usado) return { ok: false, msg: 'Este comodín ya fue usado' };

    var resultado = { ok: true, efecto: '', msg: '' };

    switch (compra.productoId) {
      case 'congelar_racha':
        // Congelar racha: guardar fecha de congelación
        localStorage.setItem('muller_racha_congelada', new Date().toISOString());
        resultado.efecto = 'racha_congelada';
        resultado.msg = '🧊 ¡Racha congelada por 24h! No perderás tu racha si no estudias hoy.';
        break;
      case 'ayuda_examen':
        // Marcar ayuda disponible para el próximo examen
        localStorage.setItem('muller_ayuda_examen', 'true');
        resultado.efecto = 'ayuda_examen';
        resultado.msg = '📝 ¡Ayuda extra activada! Tendrás una pista adicional en tu próximo examen.';
        break;
      default:
        return { ok: false, msg: 'Este producto no se puede usar directamente' };
    }

    // Marcar como usado
    C.Tienda.usarComodin(compraId);
    return resultado;
  };

  // Verificar si un comodín está activo
  C.Tienda.estaActivo = function(tipo) {
    switch (tipo) {
      case 'racha_congelada': {
        var fecha = localStorage.getItem('muller_racha_congelada');
        if (!fecha) return false;
        var congelado = new Date(fecha);
        var ahora = new Date();
        return (ahora - congelado) < 86400000; // 24h
      }
      case 'ayuda_examen':
        return localStorage.getItem('muller_ayuda_examen') === 'true';
      default:
        return false;
    }
  };

  // Temas visuales comprados
  C.Tienda.getTemasComprados = function() {
    var compras = C.Tienda.getCompras();
    return compras.filter(function(c) { return c.tipo === 'tema' && !c.esGanado; });
  };

  // Textos exclusivos comprados
  C.Tienda.getTextosComprados = function() {
    var compras = C.Tienda.getCompras();
    return compras.filter(function(c) { return c.tipo === 'texto' && !c.esGanado; });
  };

  console.log('✅ comunidadTienda.jsx cargado');

})();