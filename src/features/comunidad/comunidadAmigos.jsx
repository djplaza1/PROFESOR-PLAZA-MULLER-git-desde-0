// src/features/comunidad/comunidadAmigos.jsx
// Sistema de amigos: agregar, eliminar, lista, estado online
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

// ─── CLAVES ───
window.Muller.Comunidad.AMIGOS_KEY = 'muller_comunidad_amigos';
window.Muller.Comunidad.SOLICITUDES_KEY = 'muller_comunidad_solicitudes_amistad';

// ─── OBTENER LISTA DE AMIGOS ───
window.Muller.Comunidad.getAmigos = function() {
    try {
        return JSON.parse(localStorage.getItem(window.Muller.Comunidad.AMIGOS_KEY) || '[]');
    } catch(e) { return []; }
};

// ─── GUARDAR LISTA DE AMIGOS ───
window.Muller.Comunidad.guardarAmigos = function(amigos) {
    localStorage.setItem(window.Muller.Comunidad.AMIGOS_KEY, JSON.stringify(amigos));
    if (window.Muller && typeof window.Muller.syncKeyToCloud === 'function') {
        window.Muller.syncKeyToCloud(window.Muller.Comunidad.AMIGOS_KEY);
    }
};

// ─── AGREGAR AMIGO ───
window.Muller.Comunidad.agregarAmigo = function(usuarioId, nombre, email) {
    var amigos = window.Muller.Comunidad.getAmigos();
    var existe = amigos.find(function(a) { return a.id === usuarioId; });
    if (existe) return { ok: false, msg: 'Ya es tu amigo.' };
    amigos.push({
        id: usuarioId,
        nombre: nombre || email.split('@')[0],
        email: email,
        desde: new Date().toISOString(),
        online: false
    });
    window.Muller.Comunidad.guardarAmigos(amigos);
    return { ok: true, msg: 'Amigo agregado correctamente.' };
};

// ─── ELIMINAR AMIGO ───
window.Muller.Comunidad.eliminarAmigo = function(usuarioId) {
    var amigos = window.Muller.Comunidad.getAmigos();
    var filtrados = amigos.filter(function(a) { return a.id !== usuarioId; });
    window.Muller.Comunidad.guardarAmigos(filtrados);
    return { ok: true, msg: 'Amigo eliminado.' };
};

// ─── VERIFICAR SI ES AMIGO ───
window.Muller.Comunidad.esAmigo = function(usuarioId) {
    var amigos = window.Muller.Comunidad.getAmigos();
    return amigos.some(function(a) { return a.id === usuarioId; });
};

// ─── BUSCAR USUARIOS PARA AGREGAR ───
window.Muller.Comunidad.buscarUsuarios = async function(termino) {
    if (!termino || termino.trim().length < 2) return [];
    var supabase = window.Muller.getSupabase ? window.Muller.getSupabase() : null;
    if (supabase) {
        try {
            var { data, error } = await supabase
                .from('profiles')
                .select('id, display_name, email')
                .ilike('display_name', '%' + termino.trim() + '%')
                .limit(5);
            if (!error && data) return data.map(function(u) {
                return { id: u.id, nombre: u.display_name || u.email.split('@')[0], email: u.email };
            });
        } catch(e) { console.warn('[Comunidad] Búsqueda Supabase fallida:', e.message); }
    }
    return [];
};

// ─── ACTUALIZAR ESTADO ONLINE ───
window.Muller.Comunidad.actualizarOnline = function(online) {
    var amigos = window.Muller.Comunidad.getAmigos();
    var cambiados = false;
    amigos.forEach(function(a) {
        if (a.online !== online) { a.online = online; cambiados = true; }
    });
    if (cambiados) window.Muller.Comunidad.guardarAmigos(amigos);
};