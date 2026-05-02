window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.LexikonPanel = function LexikonPanel(props) {
    const M = window.Muller;
    const [db, setDb] = React.useState(null);
    const [srsMap, setSrsMap] = React.useState({});
    const [search, setSearch] = React.useState('');
    const [catFilter, setCatFilter] = React.useState('all');
    const [levelFilter, setLevelFilter] = React.useState('all');
    const [sortMode, setSortMode] = React.useState('srs');
    const [feedback, setFeedback] = React.useState('');
    const [onlineResult, setOnlineResult] = React.useState(null);
    const [apiLoading, setApiLoading] = React.useState(false);

    const CATEGORIES = ['vocabulario','verbos','preposiciones','conectores','redemittel'];
    const CAT_COLORS = {
        vocabulario: 'bg-slate-700 text-slate-200',
        verbos: 'bg-blue-900 text-blue-200',
        preposiciones: 'bg-green-900 text-green-200',
        conectores: 'bg-purple-900 text-purple-200',
        redemittel: 'bg-amber-900 text-amber-200'
    };

    // Cargar BD local: usar fallback inmediato + intentar fetch
    React.useEffect(function() {
        setSrsMap(M.mullerGetVocabSrsMap());

        // 1) Usar fallback inmediatamente (siempre disponible)
        if (M.BX_DB_FALLBACK) {
            setDb(M.BX_DB_FALLBACK);
        }

        // 2) Intentar obtener de sesión
        var sess = M.tryBxSession();
        if (sess) { setDb(sess); return; }

        // 3) Fetch async para actualizar
        fetch('src/data/b1-b2-database.json')
            .then(function(r) { return r.json(); })
            .then(function(json) {
                var norm = M.normalizeBxPayload(json);
                try { sessionStorage.setItem('muller_b1b2_json_v1', JSON.stringify(norm)); } catch(e) {}
                setDb(norm);
            })
            .catch(function() {
                // Ya tenemos fallback, no hacer nada
            });

        // Cargar verbos-db.json
        if (window.Muller.detect && window.Muller.detect.loadVerbDB) {
            window.Muller.detect.loadVerbDB();
        }
    }, []);

    // Búsqueda online cuando se escribe y no hay resultado local
    React.useEffect(function() {
        if (!search.trim()) { setOnlineResult(null); setApiLoading(false); return; }
        var q = search.trim().toLowerCase();

        // Buscar en BD local primero
        var localMatch = null;
        if (db) {
            var overlay = M.tryBxUserOverlay();
            var merged = M.mergeBxDatabases(db, overlay);
            ['b1','b2'].forEach(function(lv) {
                CATEGORIES.forEach(function(cat) {
                    var arr = merged[lv][cat];
                    if (!Array.isArray(arr)) return;
                    arr.forEach(function(item) {
                        if ((item.b1 && item.b1.toLowerCase().includes(q)) ||
                            (item.es && item.es.toLowerCase().includes(q))) {
                            localMatch = item;
                        }
                    });
                });
            });
        }
        if (localMatch) { setOnlineResult(null); setApiLoading(false); return; }

        // Si no encontramos local, buscar online con timeout
        setApiLoading(true);
        var timer = setTimeout(function() {
            if (window.Muller.detect && window.Muller.detect.word) {
                window.Muller.detect.word(q).then(function(res) {
                    // Si encontramos, mostrar resultado simplificado
                    if (res && res.found && res.data) {
                        setOnlineResult({
                            found: true,
                            data: {
                                de: res.data.de || q,
                                es: res.data.es || '?',
                                fuente: res.data.fuente || 'api'
                            }
                        });
                    } else {
                        setOnlineResult(null);
                    }
                    setApiLoading(false);
                }).catch(function() {
                    setOnlineResult(null);
                    setApiLoading(false);
                });
            } else {
                setApiLoading(false);
            }
        }, 400);
        return function() { clearTimeout(timer); };
    }, [search, db]);

    // Escuchar palabra con TTS
    function escuchar(texto) {
        if (!texto) return;
        if (window.speechSynthesis) {
            var utter = new SpeechSynthesisUtterance(texto);
            utter.lang = 'de-DE';
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        }
    }

    // Guardar palabra online en la BD local
    function guardarPalabraOnline() {
        if (!onlineResult || !onlineResult.found) {
            setFeedback('No hay resultado para guardar');
            return;
        }
        var overlay = M.tryBxUserOverlay() || { b1: { vocabulario: [], verbos: [], preposiciones: [], conectores: [], redemittel: [] }, b2: { vocabulario: [], verbos: [], preposiciones: [], conectores: [], redemittel: [] } };
        var nueva = {
            b1: onlineResult.data.de,
            es: onlineResult.data.es,
            fuente: onlineResult.data.fuente
        };
        overlay.b1.vocabulario.push(nueva);
        try {
            localStorage.setItem('muller_bx_user_overlay', JSON.stringify(overlay));
            setFeedback('✓ Guardado: ' + onlineResult.data.de + ' → ' + onlineResult.data.es);
        } catch(e) {
            setFeedback('Error al guardar: ' + e.message);
        }
        setOnlineResult(null);
    }

    var allWords = React.useMemo(function() {
        if (!db) return [];
        var overlay = M.tryBxUserOverlay();
        var merged = M.mergeBxDatabases(db, overlay);
        var words = [];
        ['b1','b2'].forEach(function(lv) {
            CATEGORIES.forEach(function(cat) {
                var arr = merged[lv][cat];
                if (!Array.isArray(arr)) return;
                arr.forEach(function(item) {
                    words.push(Object.assign({}, item, { _level: lv, _cat: cat }));
                });
            });
        });
        // Filtrar
        if (levelFilter !== 'all') words = words.filter(function(w) { return w._level === levelFilter; });
        if (catFilter !== 'all') words = words.filter(function(w) { return w._cat === catFilter; });
        if (search.trim()) {
            var q = search.trim().toLowerCase();
            words = words.filter(function(w) {
                return (w.b1 && w.b1.toLowerCase().includes(q)) ||
                       (w.b2 && w.b2.toLowerCase().includes(q)) ||
                       (w.es && w.es.toLowerCase().includes(q));
            });
        }
        // Ordenar
        if (sortMode === 'srs') {
            words = M.mullerSortVocabBySrs(words, srsMap);
        } else {
            words.sort(function(a,b) { return (a.b1||'').localeCompare(b.b1||''); });
        }
        return words;
    }, [db, srsMap, search, catFilter, levelFilter, sortMode]);

    var dueCount = React.useMemo(function() {
        return M.mullerCountVocabSrsDue(allWords, srsMap);
    }, [allWords, srsMap]);

    function handleRate(word, level) {
        var newMap = M.mullerApplyVocabSrsRating(srsMap, word, level);
        M.mullerSetVocabSrsMap(newMap);
        setSrsMap(newMap);
        setFeedback('Calificado como ' + level);
    }

    function handleView(word) {
        var newMap = M.mullerIncrementSrsView(srsMap, word);
        M.mullerSetVocabSrsMap(newMap);
        setSrsMap(newMap);
    }

    return React.createElement('div', { className: 'p-4 max-w-4xl mx-auto text-gray-100 flex flex-col', style: { height: '100%' } },
        React.createElement('h2', { className: 'text-2xl font-bold text-amber-400 mb-4 flex-shrink-0' }, '📖 Lexikon'),
        dueCount > 0 ? React.createElement('div', { className: 'mb-4 p-2 bg-amber-900 border border-amber-700 rounded text-sm flex-shrink-0' },
            '🔔 Pendientes hoy: ', React.createElement('strong', null, dueCount)
        ) : null,
        feedback ? React.createElement('div', { className: 'mb-4 p-2 bg-slate-800 border border-slate-600 rounded text-sm text-cyan-300 flex-shrink-0' }, feedback) : null,
        // Resultado online
        onlineResult && onlineResult.found ? React.createElement('div', { className: 'mb-4 p-3 bg-sky-900 border border-sky-700 rounded-lg text-sm flex-shrink-0' },
            React.createElement('div', { className: 'font-semibold text-sky-200 mb-1' }, '🔍 Traducción online:'),
            React.createElement('div', { className: 'text-white mb-2' },
                React.createElement('span', { className: 'font-medium text-lg' }, onlineResult.data.de),
                ' → ',
                React.createElement('span', { className: 'text-cyan-300 font-medium text-lg' }, onlineResult.data.es)
            ),
            React.createElement('div', { className: 'text-xs text-sky-300 mb-2' }, 'Fuente: ', onlineResult.data.fuente),
            React.createElement('div', { className: 'flex gap-2' },
                React.createElement('button', {
                    className: 'px-3 py-1 bg-sky-700 hover:bg-sky-600 rounded text-xs font-medium',
                    onClick: function() { escuchar(onlineResult.data.de); }
                }, '🔊 Escuchar'),
                React.createElement('button', {
                    className: 'px-3 py-1 bg-green-700 hover:bg-green-600 rounded text-xs font-medium',
                    onClick: guardarPalabraOnline
                }, '💾 Guardar')
            )
        ) : null,
        apiLoading ? React.createElement('div', { className: 'mb-4 p-2 bg-slate-800 border border-slate-600 rounded text-sm text-sky-300 flex-shrink-0' }, '🔍 Buscando...') : null,
        React.createElement('div', { className: 'flex flex-wrap gap-2 mb-4 flex-shrink-0' },
            React.createElement('input', {
                type: 'text',
                className: 'flex-1 min-w-[200px] p-2 bg-slate-800 border border-slate-600 rounded text-white',
                placeholder: 'Buscar (DE o ES)',
                value: search,
                onChange: function(e) { setSearch(e.target.value); }
            }),
            React.createElement('select', {
                className: 'p-2 bg-slate-800 border border-slate-600 rounded text-white',
                value: catFilter,
                onChange: function(e) { setCatFilter(e.target.value); }
            },
                React.createElement('option', { value: 'all' }, 'Todas'),
                CATEGORIES.map(function(c) { return React.createElement('option', { key: c, value: c }, c); })
            ),
            React.createElement('select', {
                className: 'p-2 bg-slate-800 border border-slate-600 rounded text-white',
                value: levelFilter,
                onChange: function(e) { setLevelFilter(e.target.value); }
            },
                React.createElement('option', { value: 'all' }, 'B1+B2'),
                React.createElement('option', { value: 'b1' }, 'B1'),
                React.createElement('option', { value: 'b2' }, 'B2')
            ),
            React.createElement('select', {
                className: 'p-2 bg-slate-800 border border-slate-600 rounded text-white',
                value: sortMode,
                onChange: function(e) { setSortMode(e.target.value); }
            },
                React.createElement('option', { value: 'srs' }, 'SRS'),
                React.createElement('option', { value: 'alpha' }, 'A-Z')
            )
        ),
        React.createElement('div', { className: 'text-sm text-slate-400 mb-2 flex-shrink-0' }, allWords.length, ' palabras'),
        // Lista scrolleable
        React.createElement('div', { className: 'flex-1 overflow-y-auto', style: { minHeight: 0, marginRight: -4, paddingRight: 4 } },
            React.createElement('div', { className: 'grid gap-2' },
                allWords.length === 0 && !apiLoading ? React.createElement('div', { className: 'text-center text-slate-500 py-8' },
                    'No hay palabras. Escribe para buscar online.'
                ) : null,
                allWords.map(function(w) {
                    var key = M.mullerVocabSrsKey(w);
                    var rec = srsMap[key];
                    var dueBadge = rec && rec.due ? (rec.due <= new Date().toISOString().slice(0,10) ? '🔴' : '🟢') : '⚪';
                    return React.createElement('div', {
                        key: key + w._level + w._cat,
                        className: 'p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-750',
                        onClick: function() { handleView(w); }
                    },
                        React.createElement('div', { className: 'flex justify-between items-start' },
                            React.createElement('div', { className: 'flex-1' },
                                React.createElement('div', { className: 'font-semibold flex items-center gap-2' },
                                    React.createElement('span', null, w.b1),
                                    React.createElement('button', {
                                        className: 'text-xs text-sky-400 hover:text-sky-300',
                                        onClick: function(e) { e.stopPropagation(); escuchar(w.b1); },
                                        title: 'Escuchar'
                                    }, '🔊')
                                ),
                                w.b2 && w.b2 !== w.b1 ? React.createElement('div', { className: 'text-sm text-slate-400' }, w.b2) : null,
                                React.createElement('div', { className: 'text-xs text-slate-500' }, w.es)
                            ),
                            React.createElement('div', { className: 'flex items-center gap-2 ml-2' },
                                React.createElement('span', { className: 'text-xs px-2 py-1 rounded ' + (CAT_COLORS[w._cat] || 'bg-slate-700') }, w._cat),
                                React.createElement('span', { className: 'text-xs text-slate-500' }, w._level.toUpperCase())
                            )
                        ),
                        React.createElement('div', { className: 'flex justify-between items-center mt-2 text-xs' },
                            React.createElement('div', { className: 'text-slate-400' },
                                rec ? dueBadge + ' Rep:' + rec.repetitions + ' Int:' + rec.interval + 'd Due:' + (rec.due || '-') : 'Sin repasar'
                            ),
                            React.createElement('div', { className: 'flex gap-1' },
                                React.createElement('button', {
                                    className: 'px-2 py-1 bg-red-800 hover:bg-red-700 rounded',
                                    onClick: function(e) { e.stopPropagation(); handleRate(w, 'hard'); }
                                }, 'Difícil'),
                                React.createElement('button', {
                                    className: 'px-2 py-1 bg-yellow-800 hover:bg-yellow-700 rounded',
                                    onClick: function(e) { e.stopPropagation(); handleRate(w, 'normal'); }
                                }, 'Normal'),
                                React.createElement('button', {
                                    className: 'px-2 py-1 bg-green-800 hover:bg-green-700 rounded',
                                    onClick: function(e) { e.stopPropagation(); handleRate(w, 'easy'); }
                                }, 'Fácil')
                            )
                        )
                    );
                })
            )
        )
    );
};

// Alias para PanelRouter
window.Muller.Panels.lexikon = window.Muller.Panels.LexikonPanel;