// ═══════════════════════════════════════════════════
// TRADUCTOR - MyMemory API con detección bidireccional
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.translate = window.Muller.translate || {};

/**
 * Helper: llamar a MyMemory con langpair concreto, devuelve promesa con texto traducido o null
 */
function _llamarMyMemory(palabra, sl, tl) {
    return new Promise(function(resolve) {
        var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(palabra) + '&langpair=' + sl + '%7C' + tl;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        if (json && json.responseData && json.responseData.translatedText) {
                            resolve(json.responseData.translatedText);
                            return;
                        }
                    } catch(e) {}
                }
                resolve(null);
            }
        };
        xhr.onerror = function() { resolve(null); };
        xhr.send();
    });
}

/**
 * Traduce una palabra. Primero prueba alemán→español.
 * Si no encuentra, prueba español→alemán.
 * Devuelve { palabra, de, es, fuente, direccion }
 */
/**
 * Helper: llamar a Google Translate (gratuito, sin API key)
 */
function _llamarGoogleTranslate(palabra, sl, tl) {
    return new Promise(function(resolve) {
        var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sl + '&tl=' + tl + '&dt=t&q=' + encodeURIComponent(palabra);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        // Estructura: [[["traducción","original",...],...],...]
                        if (Array.isArray(json) && Array.isArray(json[0]) && json[0][0] && json[0][0][0]) {
                            var traduccion = json[0][0][0].trim();
                            if (traduccion && traduccion !== palabra.trim()) {
                                resolve(traduccion);
                                return;
                            }
                        }
                    } catch(e) {}
                }
                resolve(null);
            }
        };
        xhr.onerror = function() { resolve(null); };
        xhr.send();
    });
}

window.Muller.translate.word = function(word) {
    return new Promise(function(resolve) {
        var w = (word || '').trim();
        if (!w) {
            resolve({ palabra: w, de: null, es: null, fuente: 'none', direccion: 'none' });
            return;
        }

        // Paso 1: Google de→es
        _llamarGoogleTranslate(w, 'de', 'es').then(function(resGoogle) {
            if (resGoogle) {
                resolve({
                    palabra: w,
                    de: w,
                    es: resGoogle,
                    fuente: 'google',
                    direccion: 'de→es'
                });
                return;
            }

            // Paso 2: Google es→de
            _llamarGoogleTranslate(w, 'es', 'de').then(function(resGoogle2) {
                if (resGoogle2) {
                    resolve({
                        palabra: w,
                        de: resGoogle2,
                        es: w,
                        fuente: 'google',
                        direccion: 'es→de'
                    });
                    return;
                }

                // Paso 3: fallback MyMemory de→es
                _llamarMyMemory(w, 'de', 'es').then(function(resMy) {
                    if (resMy) {
                        resolve({
                            palabra: w,
                            de: w,
                            es: resMy,
                            fuente: 'mymemory',
                            direccion: 'de→es'
                        });
                        return;
                    }

                    // Paso 4: fallback MyMemory es→de
                    _llamarMyMemory(w, 'es', 'de').then(function(resMy2) {
                        if (resMy2) {
                            resolve({
                                palabra: w,
                                de: resMy2,
                                es: w,
                                fuente: 'mymemory',
                                direccion: 'es→de'
                            });
                            return;
                        }

                        resolve({
                            palabra: w,
                            de: null,
                            es: null,
                            fuente: 'none',
                            direccion: 'none'
                        });
                    });
                });
            });
        });
    });
};

/**
 * Pronuncia una palabra en alemán usando TTS del navegador
 */
window.Muller.translate.speak = function(word) {
    if (!word || !window.speechSynthesis) return;
    var utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
};