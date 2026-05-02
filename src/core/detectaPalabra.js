// ═══════════════════════════════════════════════════
// DETECTOR DE PALABRAS - Busca en fuentes locales + API
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.detect = window.Muller.detect || {};

// Cache del diccionario completo una vez cargado
var _dictCache = null;

/**
 * Construye el índice completo con todas las fuentes locales
 * Se ejecuta una vez y cachea.
 */
function _buildIndex() {
    if (_dictCache) return _dictCache;

    var dict = {
        words: [],          // { de, es, nivel, tipo, fuente }
        verbs: [],           // { de, es, nivel, praeteritum, perfekt, aux }
        verbDb: [],          // verbos-db.json completos con conjugación
        verbForms: {}        // mapa forma conjugada → infinitivo
    };
    var seen = {};
    var formsMap = {};

    // 1) b1-b2-database.json
    var db = window.Muller.BX_DB_FALLBACK || {};
    var niveles = ['b1', 'b2'];
    niveles.forEach(function(lv) {
        var cats = ['vocabulario', 'verbos', 'preposiciones', 'conectores', 'redemittel'];
        cats.forEach(function(cat) {
            var arr = db[lv] && db[lv][cat];
            if (!Array.isArray(arr)) return;
            arr.forEach(function(item) {
                if (item.b1) {
                    var key = item.b1.toLowerCase().trim();
                    if (!seen[key]) {
                        seen[key] = true;
                        dict.words.push({
                            de: item.b1,
                            b2: item.b2 || '',
                            es: item.es || '',
                            nivel: lv.toUpperCase(),
                            tipo: cat === 'verbos' ? 'verb' : 'word',
                            fuente: 'b1-b2-database',
                            trick: item.trick || ''
                        });
                    }
                }
            });
        });
    });

    // 2) tempusDict
    var tempus = window.Muller.Data && window.Muller.Data.tempusDict;
    if (Array.isArray(tempus)) {
        tempus.forEach(function(v) {
            var inf = v.infinitiv ? v.infinitiv.toLowerCase().trim() : '';
            if (inf && !seen[inf]) {
                seen[inf] = true;
                dict.words.push({
                    de: v.infinitiv,
                    es: '',
                    nivel: 'B1',
                    tipo: 'verb',
                    fuente: 'tempusDict'
                });
            }
            dict.verbs.push({
                de: v.infinitiv,
                es: '',
                nivel: 'B1',
                praeteritum: v.praeteritum || '',
                perfekt: v.perfekt || '',
                aux: v.hilfsverb || 'haben'
            });
            // Mapear formas conjugadas al infinitivo
            if (v.praeteritum) {
                var prForm = v.praeteritum.toLowerCase().trim();
                formsMap[prForm] = v.infinitiv;
            }
        });
    }

    // 3) verbos-db.json (cargado via fetch, se registra luego)
    dict.verbDb = window.Muller.Data && window.Muller.Data.verbsDB || [];

    // Mapear formas de verbos-db
    if (Array.isArray(dict.verbDb)) {
        dict.verbDb.forEach(function(v) {
            if (v.lemma && !seen[v.lemma.toLowerCase()]) {
                seen[v.lemma.toLowerCase()] = true;
                dict.words.push({
                    de: v.lemma,
                    es: v.es || '',
                    nivel: v.level || 'B1',
                    tipo: 'verb',
                    fuente: 'verbos-db'
                });
            }
            // Formas praeteritum
            if (v.forms && v.forms.praeteritum) {
                Object.keys(v.forms.praeteritum).forEach(function(person) {
                    var form = v.forms.praeteritum[person].toLowerCase().trim();
                    if (form) formsMap[form] = v.lemma;
                });
            }
            // partizip2
            if (v.partizip2) {
                formsMap[v.partizip2.toLowerCase().trim()] = v.lemma;
            }
        });
    }

    dict.verbForms = formsMap;
    _dictCache = dict;
    return dict;
}

/**
 * Busca una palabra en las fuentes locales
 * @param {string} word - Palabra a buscar
 * @returns {{found: boolean, data: object|null, conjugatedFrom: string|null}}
 */
window.Muller.detect.local = function(word) {
    if (!word || !word.trim()) return { found: false, data: null, conjugatedFrom: null };
    var w = word.trim().toLowerCase();
    var dict = _buildIndex();

    // 1) Buscar exacta en words
    var exact = dict.words.find(function(item) { return item.de.toLowerCase() === w; });
    if (exact) return { found: true, data: exact, conjugatedFrom: null };

    // 2) Buscar en verbos
    var verb = dict.verbs.find(function(v) { return v.de && v.de.toLowerCase() === w; });
    if (verb) return { found: true, data: verb, conjugatedFrom: null };

    // 3) Buscar en verbDb
    var verbDb = dict.verbDb.find(function(v) { return v.lemma && v.lemma.toLowerCase() === w; });
    if (verbDb) return { found: true, data: { de: verbDb.lemma, es: verbDb.es, nivel: verbDb.level, tipo: 'verb', fuente: 'verbos-db' }, conjugatedFrom: null };

    // 4) Buscar si es forma conjugada (praeteritum, partizip2)
    var inf = dict.verbForms[w];
    if (inf) {
        // Encontrar el verbo original para datos completos
        var orig = dict.verbs.find(function(v) { return v.de && v.de.toLowerCase() === inf.toLowerCase(); });
        if (orig) return { found: true, data: orig, conjugatedFrom: inf };
        // Buscar en verbDb
        var origDb = dict.verbDb.find(function(v) { return v.lemma && v.lemma.toLowerCase() === inf.toLowerCase(); });
        if (origDb) return { found: true, data: { de: origDb.lemma, es: origDb.es, nivel: origDb.level, tipo: 'verb', fuente: 'verbos-db' }, conjugatedFrom: inf };
    }

    return { found: false, data: null, conjugatedFrom: null };
};

/**
 * Busca palabra local + API (completo)
 * Devuelve promesa con {found,local,data,conjugatedFrom,apiResult}
 * @param {string} word - Palabra a buscar
 * @returns {Promise}
 */
window.Muller.detect.word = function(word) {
    return new Promise(function(resolve) {
        var localResult = window.Muller.detect.local(word);

        // Si encontramos local, devolvemos inmediatamente
        if (localResult.found) {
            resolve({
                found: true,
                local: true,
                data: localResult.data,
                conjugatedFrom: localResult.conjugatedFrom,
                apiResult: null
            });
            return;
        }

        // Si no encontramos local, llamamos a la API
        window.Muller.translate.word(word).then(function(apiResult) {
            if (!apiResult || (!apiResult.es && !apiResult.de)) {
                resolve({
                    found: false,
                    local: false,
                    data: null,
                    conjugatedFrom: null,
                    apiResult: apiResult
                });
                return;
            }
            // Determinar dirección
            var isEsToDe = apiResult.direccion === 'es→de';
            resolve({
                found: true,
                local: false,
                data: isEsToDe ? {
                    de: apiResult.de,
                    es: word,
                    nivel: '?',
                    tipo: 'word',
                    fuente: apiResult.fuente || 'mymemory'
                } : {
                    de: word,
                    es: apiResult.es,
                    nivel: '?',
                    tipo: 'word',
                    fuente: apiResult.fuente || 'mymemory'
                },
                conjugatedFrom: null,
                apiResult: apiResult
            });
        }, function() {
            resolve({ found: false, local: false, data: null, conjugatedFrom: null, apiResult: null });
        });
    });
};

/**
 * Carga verbos-db.json de forma asíncrona y lo registra
 */
window.Muller.detect.loadVerbDB = function() {
    return new Promise(function(resolve) {
        if (window.Muller.Data && window.Muller.Data.verbsDB && window.Muller.Data.verbsDB.length) {
            resolve();
            return;
        }
        fetch('src/data/verbos-db.json')
            .then(function(r) { return r.json(); })
            .then(function(json) {
                window.Muller.Data = window.Muller.Data || {};
                window.Muller.Data.verbsDB = json.verbs || [];
                window.Muller.Data.verbsMeta = json.meta || {};
                _dictCache = null; // invalidar cache para que se reconstruya
                resolve();
            })
            .catch(function() {
                window.Muller.Data = window.Muller.Data || {};
                window.Muller.Data.verbsDB = [];
                resolve();
            });
    });
};