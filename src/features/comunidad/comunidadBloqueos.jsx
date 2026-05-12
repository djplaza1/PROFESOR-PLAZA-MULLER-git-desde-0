// src/features/comunidad/comunidadBloqueos.jsx
// Sistema de bloqueos: bloquear, desbloquear, listar y verificar usuarios
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// ─── CLAVE ───
window.Muller.Comunidad.BLOQUEOS_KEY = 'muller_comunidad_bloqueos';

// ─── OBTENER LISTA DE BLOQUEADOS ───
window.Muller.Comunidad.getBloqueos = function() {
    try {
        return JSON.parse(localStorage.getItem(window.Muller.Comunidad.BLOQUEOS_KEY) || '[]');
    } catch(e) { return []; }
};

// ─── BLOQUEAR USUARIO ───
window.Muller.Comunidad.bloquearUsuario = function(id, nombre) {
    var bloqueos = window.Muller.Comunidad.getBloqueos();
    var existe = bloqueos.find(function(b) { return b.id === id; });
    if (existe) return { ok: false, msg: 'Este usuario ya está bloqueado.' };
    bloqueos.push({
        id: id,
        nombre: nombre || 'Usuario',
        fecha: new Date().toISOString()
    });
    localStorage.setItem(window.Muller.Comunidad.BLOQUEOS_KEY, JSON.stringify(bloqueos));
    return { ok: true, msg: 'Usuario bloqueado.' };
};

// ─── DESBLOQUEAR USUARIO ───
window.Muller.Comunidad.desbloquearUsuario = function(id) {
    var bloqueos = window.Muller.Comunidad.getBloqueos();
    var filtrados = bloqueos.filter(function(b) { return b.id !== id; });
    localStorage.setItem(window.Muller.Comunidad.BLOQUEOS_KEY, JSON.stringify(filtrados));
    return { ok: true, msg: 'Usuario desbloqueado.' };
};

// ─── VERIFICAR SI UN USUARIO ESTÁ BLOQUEADO ───
window.Muller.Comunidad.estaBloqueado = function(id) {
    var bloqueos = window.Muller.Comunidad.getBloqueos();
    return bloqueos.some(function(b) { return b.id === id; });
};