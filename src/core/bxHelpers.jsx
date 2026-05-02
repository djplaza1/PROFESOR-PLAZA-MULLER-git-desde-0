window.Muller = window.Muller || {};

const MULLER_BX_USER_OVERLAY_KEY = 'muller_bx_user_overlay_v1';
const BX_DB_EMPTY = { vocabulario: [], verbos: [], preposiciones: [], conectores: [], redemittel: [] };

window.Muller.normalizeBxPayload = function(data) {
    if (!data || typeof data !== 'object') return { b1: { ...BX_DB_EMPTY }, b2: { ...BX_DB_EMPTY } };
    const b1 = data.b1 || data.B1;
    const b2 = data.b2 || data.B2;
    return {
        b1: b1 ? { ...BX_DB_EMPTY, ...b1 } : { ...BX_DB_EMPTY },
        b2: b2 ? { ...BX_DB_EMPTY, ...b2 } : { ...BX_DB_EMPTY }
    };
};

window.Muller.BX_DB_FALLBACK = window.Muller.normalizeBxPayload({
    b1: {
        vocabulario: [{ b1: "Daten werden geladen …", b2: "b1-b2-database.json fehlt oder Netzwerkfehler.", es: "", trick: "Coloca b1-b2-database.json junto a index.html en el servidor." }]
    },
    b2: {
        vocabulario: [{ b1: "Daten werden geladen …", b2: "Mismo JSON: claves b1 y b2.", es: "", trick: "Amplía arrays en el JSON sin tocar index.html." }]
    }
});

window.Muller.tryBxSession = function() {
    try {
        const raw = sessionStorage.getItem('muller_b1b2_json_v1');
        if (!raw) return null;
        return window.Muller.normalizeBxPayload(JSON.parse(raw));
    } catch (e) { return null; }
};

window.Muller.tryBxUserOverlay = function() {
    try {
        const raw = localStorage.getItem(MULLER_BX_USER_OVERLAY_KEY);
        if (!raw) return window.Muller.normalizeBxPayload({});
        return window.Muller.normalizeBxPayload(JSON.parse(raw));
    } catch (e) { return window.Muller.normalizeBxPayload({}); }
};

function mergeBxLevel(base, extra) {
    const out = {};
    Object.keys(BX_DB_EMPTY).forEach(function(k) {
        out[k] = [...(base[k] || []), ...(extra[k] || [])];
    });
    return out;
}

window.Muller.mergeBxDatabases = function(remoteNorm, overlayNorm) {
    const r = window.Muller.normalizeBxPayload(remoteNorm || {});
    const o = window.Muller.normalizeBxPayload(overlayNorm || {});
    return { b1: mergeBxLevel(r.b1, o.b1), b2: mergeBxLevel(r.b2, o.b2) };
};

window.Muller.mullerFindUserBxCategory = function(overlayNorm, level, uid) {
    if (!uid || !overlayNorm || !overlayNorm[level]) return null;
    const lv = overlayNorm[level];
    for (const cat of Object.keys(BX_DB_EMPTY)) {
        const arr = lv[cat];
        if (!Array.isArray(arr)) continue;
        if (arr.some(function(x) { return x && x._mullerUid === uid; })) return cat;
    }
    return null;
};

window.Muller.mullerBxItemKey = function(item) {
    return (item.b1 || '') + '\u0000' + (item.b2 || '') + '\u0000' + (item.es || '');
};

window.Muller.mullerLoadExternalScript = function(src, key) {
    if (!src || !key) return Promise.reject(new Error('Script URL inválida.'));
    try {
        if (!window.__mullerScriptPromises) window.__mullerScriptPromises = {};
        if (window.__mullerScriptPromises[key]) return window.__mullerScriptPromises[key];
        window.__mullerScriptPromises[key] = new Promise(function(resolve, reject) {
            const existing = document.querySelector('script[data-muller-key="' + key + '"]');
            if (existing) {
                existing.addEventListener('load', function() { resolve(true); }, { once: true });
                existing.addEventListener('error', function() { reject(new Error('No se pudo cargar ' + key)); }, { once: true });
                return;
            }
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.dataset.mullerKey = key;
            s.onload = function() { resolve(true); };
            s.onerror = function() { reject(new Error('No se pudo cargar ' + key)); };
            document.head.appendChild(s);
        });
        return window.__mullerScriptPromises[key];
    } catch (err) { return Promise.reject(err); }
};

window.Muller.mullerEnsurePdfJsLoaded = async function() {
    if (window.pdfjsLib && typeof window.pdfjsLib.getDocument === 'function') return true;
    await window.Muller.mullerLoadExternalScript('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/legacy/build/pdf.min.js', 'pdfjs');
    return !!(window.pdfjsLib && typeof window.pdfjsLib.getDocument === 'function');
};

window.Muller.mullerEnsureTesseractLoaded = async function() {
    if (typeof window.Tesseract !== 'undefined') return true;
    await window.Muller.mullerLoadExternalScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js', 'tesseract');
    return typeof window.Tesseract !== 'undefined';
};

window.Muller.mullerStripBxOverlayBySourceScriptId = function(overlayNorm, scriptId) {
    const sid = scriptId != null ? String(scriptId) : '';
    if (!sid) return window.Muller.normalizeBxPayload(overlayNorm || {});
    const o = JSON.parse(JSON.stringify(window.Muller.normalizeBxPayload(overlayNorm || {})));
    ['b1', 'b2'].forEach(function(lv) {
        Object.keys(BX_DB_EMPTY).forEach(function(cat) {
            o[lv][cat] = (o[lv][cat] || []).filter(function(x) { return String(x && x._mullerSourceScriptId || '') !== sid; });
        });
    });
    return o;
};