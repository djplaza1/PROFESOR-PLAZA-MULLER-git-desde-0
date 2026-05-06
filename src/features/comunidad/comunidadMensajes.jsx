// src/features/comunidad/comunidadMensajes.jsx
// Sistema de mensajería privada entre amigos
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// ─── CLAVE ───
window.Muller.Comunidad.MENSAJES_KEY = 'muller_comunidad_mensajes';

// ─── OBTENER TODOS LOS MENSAJES ───
window.Muller.Comunidad.getMensajes = function() {
    try {
        return JSON.parse(localStorage.getItem(window.Muller.Comunidad.MENSAJES_KEY) || '{}');
    } catch(e) { return {}; }
};

// ─── GUARDAR TODOS LOS MENSAJES ───
window.Muller.Comunidad.guardarMensajes = function(mensajes) {
    localStorage.setItem(window.Muller.Comunidad.MENSAJES_KEY, JSON.stringify(mensajes));
    if (window.Muller && typeof window.Muller.syncKeyToCloud === 'function') {
        window.Muller.syncKeyToCloud(window.Muller.Comunidad.MENSAJES_KEY);
    }
};

// ─── OBTENER CONVERSACIÓN CON UN AMIGO ───
window.Muller.Comunidad.getConversacion = function(amigoId) {
    var todos = window.Muller.Comunidad.getMensajes();
    return todos[amigoId] || [];
};

// ─── ENVIAR MENSAJE A UN AMIGO ───
window.Muller.Comunidad.enviarMensaje = function(amigoId, texto) {
    var todos = window.Muller.Comunidad.getMensajes();
    if (!todos[amigoId]) todos[amigoId] = [];
    var mensaje = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        texto: texto,
        de: 'yo',
        timestamp: new Date().toISOString()
    };
    todos[amigoId].push(mensaje);
    window.Muller.Comunidad.guardarMensajes(todos);
    return mensaje;
};

// ─── MARCAR CONVERSACIÓN COMO LEÍDA ───
window.Muller.Comunidad.marcarLeida = function(amigoId) {
    var todos = window.Muller.Comunidad.getMensajes();
    if (todos[amigoId]) {
        todos[amigoId].forEach(function(m) { m.leido = true; });
        window.Muller.Comunidad.guardarMensajes(todos);
    }
};