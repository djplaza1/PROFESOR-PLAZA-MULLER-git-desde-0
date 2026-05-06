// src/features/comunidad/comunidadDuelos.jsx
// Sistema de duelos PvP: invitaciones, gestión y resultados
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// ─── CLAVES ───
window.Muller.Comunidad.DUELOS_KEY = 'muller_comunidad_duelos';
window.Muller.Comunidad.INVITACIONES_KEY = 'muller_comunidad_invitaciones';

// ─── ENVIAR INVITACIÓN A DUELO ───
window.Muller.Comunidad.invitarADuelo = function(amigoId, nombreAmigo, tipo) {
    var invitaciones = window.Muller.Comunidad.getInvitaciones();
    var yaExiste = invitaciones.some(function(inv) {
        return inv.de === amigoId && inv.estado === 'pendiente';
    });
    if (yaExiste) return { ok: false, msg: 'Ya hay una invitación pendiente para este amigo.' };

    var nueva = {
        id: 'inv_' + Date.now().toString(36),
        de: amigoId,
        nombre: nombreAmigo,
        tipo: tipo || 'vocabulario',
        fecha: new Date().toISOString(),
        estado: 'pendiente'
    };
    invitaciones.push(nueva);
    localStorage.setItem(window.Muller.Comunidad.INVITACIONES_KEY, JSON.stringify(invitaciones));
    return { ok: true, msg: 'Invitación enviada a ' + nombreAmigo, invitacion: nueva };
};

// ─── OBTENER INVITACIONES ───
window.Muller.Comunidad.getInvitaciones = function() {
    try {
        return JSON.parse(localStorage.getItem(window.Muller.Comunidad.INVITACIONES_KEY) || '[]');
    } catch(e) { return []; }
};

// ─── RESPONDER INVITACIÓN ───
window.Muller.Comunidad.responderInvitacion = function(invitacionId, aceptar) {
    var invitaciones = window.Muller.Comunidad.getInvitaciones();
    var inv = invitaciones.find(function(i) { return i.id === invitacionId; });
    if (!inv) return { ok: false, msg: 'Invitación no encontrada.' };

    inv.estado = aceptar ? 'aceptada' : 'rechazada';
    localStorage.setItem(window.Muller.Comunidad.INVITACIONES_KEY, JSON.stringify(invitaciones));

    if (aceptar) {
        var duelo = {
            id: 'duelo_' + Date.now().toString(36),
            rivalId: inv.de,
            rivalNombre: inv.nombre,
            tipo: inv.tipo,
            inicio: new Date().toISOString(),
            fin: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            estado: 'activo',
            miPuntuacion: 0,
            rivalPuntuacion: 0
        };
        var duelos = window.Muller.Comunidad.getDuelos();
        duelos.push(duelo);
        localStorage.setItem(window.Muller.Comunidad.DUELOS_KEY, JSON.stringify(duelos));
        return { ok: true, duelo: duelo, msg: '¡Duelo aceptado! Tienes 24h para sumar puntos.' };
    }
    return { ok: true, msg: 'Invitación rechazada.' };
};

// ─── OBTENER DUELOS ACTIVOS ───
window.Muller.Comunidad.getDuelos = function() {
    try {
        return JSON.parse(localStorage.getItem(window.Muller.Comunidad.DUELOS_KEY) || '[]');
    } catch(e) { return []; }
};

// ─── SUMAR PUNTOS AL DUELO ACTIVO ───
window.Muller.Comunidad.sumarPuntosDuelo = function(puntos) {
    var duelos = window.Muller.Comunidad.getDuelos();
    var activo = duelos.find(function(d) { return d.estado === 'activo'; });
    if (activo) {
        activo.miPuntuacion += puntos;
        localStorage.setItem(window.Muller.Comunidad.DUELOS_KEY, JSON.stringify(duelos));
    }
};

// ─── VERIFICAR DUELOS VENCIDOS ───
window.Muller.Comunidad.verificarDuelosVencidos = function() {
    var duelos = window.Muller.Comunidad.getDuelos();
    var ahora = new Date().toISOString();
    duelos.forEach(function(d) {
        if (d.estado === 'activo' && d.fin < ahora) {
            d.estado = 'finalizado';
            d.ganador = d.miPuntuacion > d.rivalPuntuacion ? 'yo' : (d.rivalPuntuacion > d.miPuntuacion ? 'rival' : 'empate');
        }
    });
    localStorage.setItem(window.Muller.Comunidad.DUELOS_KEY, JSON.stringify(duelos));
};