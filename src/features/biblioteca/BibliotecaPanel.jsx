window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

/**
 * @function BibliotecaPanel
 * @description Panel Biblioteca con tres subvistas: Guiones, Vocabulario e Instrucciones IA.
 *   - Guiones: listar, crear (con nivel), importar archivo, cargar en Historia, eliminar.
 *   - Vocabulario: listas de palabras, crear (con nivel A1-C1), expandir, importar/exportar JSON.
 *   - Instrucciones IA: guía para formatear guiones con IA y marcar vocabulario.
 *   - Diseño premium glass (backdrop-blur, border-white/10, sombras suaves).
 *   - Almacena en 'savedScripts' (misma clave que HistoriaPanel) y 'mullerVocabs'.
 *   - Registra window.Muller.activeScript al cargar en Historia.
 */
window.Muller.Panels['biblioteca'] = function BibliotecaPanel({ session }) {
    const { useState, useEffect, useRef, useCallback } = window.React;
    const lucide = window.lucide;
    const storage = window.Muller.storage;

    // --- Estados ---
    const [subview, setSubview] = useState('scripts');        // 'scripts' | 'vocabs' | 'ia-instructions'
    const [scripts, setScripts] = useState([]);
    const [vocabLists, setVocabLists] = useState([]);

    // Estados para formulario de guion
    const [showScriptForm, setShowScriptForm] = useState(false);
    const [scriptForm, setScriptForm] = useState({ title: '', text: '', translation: '', level: 'B1' });

    // Estados para formulario de lista de vocabulario
    const [showVocabForm, setShowVocabForm] = useState(false);
    const [vocabForm, setVocabForm] = useState({ name: '', words: '', level: 'B1' });

    // Estados para filtro de nivel en vocabulario
    const [vocabLevelFilter, setVocabLevelFilter] = useState('all');

    // Estados UI
    const [expandedVocabId, setExpandedVocabId] = useState(null);
    const [selectedScriptId, setSelectedScriptId] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [importing, setImporting] = useState(false);

    // --- Carga inicial ---
    useEffect(function() {
        loadScripts();
        loadVocabs();
    }, []);

    // Regenerar iconos Lucide después de cada render
    useEffect(function() {
        const timer = setTimeout(function() {
            if (window.lucide) window.lucide.createIcons();
        }, 0);
        return function() { clearTimeout(timer); };
    }, [subview, scripts, vocabLists, showScriptForm, showVocabForm, expandedVocabId, feedback]);

    // --- Persistencia ---
    function loadScripts() {
        try {
            const parsed = storage.get('savedScripts');
            if (Array.isArray(parsed)) {
                setScripts(parsed);
            } else {
                setScripts([]);
            }
        } catch(e) {
            setScripts([]);
        }
    }

    function saveScripts(newScripts) {
        storage.set('savedScripts', newScripts);
        setScripts(newScripts);
    }

    function loadVocabs() {
        try {
            const parsed = storage.get('mullerVocabs');
            if (Array.isArray(parsed)) {
                setVocabLists(parsed);
            } else {
                setVocabLists([]);
            }
        } catch(e) {
            setVocabLists([]);
        }
    }

    function saveVocabs(newLists) {
        storage.set('mullerVocabs', newLists);
        setVocabLists(newLists);
    }

    // --- Handlers de Guiones ---
    const handleCreateScript = function() {
        const title = scriptForm.title.trim();
        const text = scriptForm.text.trim();
        if (!title) { setFeedback('El título es obligatorio.'); return; }
        if (!text) { setFeedback('El texto del guion es obligatorio.'); return; }

        const newScript = {
            id: 'script_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            title: title,
            text: text,
            translation: scriptForm.translation.trim(),
            level: scriptForm.level,
            createdAt: new Date().toISOString(),
            lineCount: text.split('\n').filter(function(l) { return l.trim(); }).length
        };

        const updated = scripts.concat([newScript]);
        saveScripts(updated);

        setScriptForm({ title: '', text: '', translation: '', level: 'B1' });
        setShowScriptForm(false);
        setFeedback('✓ Guion guardado correctamente.');
        setTimeout(function() { setFeedback(''); }, 2500);
    };

    const handleDeleteScript = function(id) {
        if (!window.confirm('¿Eliminar este guion permanentemente?')) return;
        const filtered = scripts.filter(function(s) { return s.id !== id; });
        saveScripts(filtered);
        if (selectedScriptId === id) setSelectedScriptId(null);
        if (window.Muller.activeScript && window.Muller.activeScript.id === id) {
            window.Muller.activeScript = null;
        }
        setFeedback('✓ Guion eliminado.');
        setTimeout(function() { setFeedback(''); }, 2000);
    };

    const handleLoadInHistoria = function(script) {
        window.Muller.activeScript = script;
        setFeedback('✓ "' + script.title + '" cargado. Ve a la pestaña Historia.');
        setTimeout(function() { setFeedback(''); }, 2500);
    };

    const handleImportFile = function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,.txt';
        input.onchange = function(e) {
            var file = e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(ev) {
                try {
                    var content = ev.target.result;
                    // Intentar parsear como JSON
                    try {
                        var json = JSON.parse(content);
                        if (json && json.title && json.text) {
                            var imported = {
                                id: 'script_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
                                title: json.title,
                                text: json.text,
                                translation: json.translation || '',
                                level: json.level || 'B1',
                                createdAt: new Date().toISOString(),
                                lineCount: json.text.split('\n').filter(function(l) { return l.trim(); }).length,
                                imported: true
                            };
                            var updated = scripts.concat([imported]);
                            saveScripts(updated);
                            setFeedback('✓ Guion importado: "' + imported.title + '"');
                        } else {
                            // JSON array de guiones
                            if (Array.isArray(json)) {
                                var importedCount = 0;
                                var newScripts = scripts.slice();
                                json.forEach(function(item) {
                                    if (item && item.title && item.text) {
                                        newScripts.push({
                                            id: 'script_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
                                            title: item.title,
                                            text: item.text,
                                            translation: item.translation || '',
                                            level: item.level || 'B1',
                                            createdAt: new Date().toISOString(),
                                            lineCount: item.text.split('\n').filter(function(l) { return l.trim(); }).length,
                                            imported: true
                                        });
                                        importedCount++;
                                    }
                                });
                                saveScripts(newScripts);
                                setFeedback('✓ ' + importedCount + ' guiones importados.');
                            } else {
                                setFeedback('✗ Formato JSON no reconocido. Usa {title, text} o array.');
                            }
                        }
                    } catch(jsonErr) {
                        // No es JSON: asumir texto plano como contenido del guion
                        var filename = file.name.replace(/\.[^/.]+$/, '');
                        var imported = {
                            id: 'script_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
                            title: filename,
                            text: content,
                            translation: '',
                            level: 'B1',
                            createdAt: new Date().toISOString(),
                            lineCount: content.split('\n').filter(function(l) { return l.trim(); }).length,
                            imported: true
                        };
                        var updated = scripts.concat([imported]);
                        saveScripts(updated);
                        setFeedback('✓ Archivo importado como: "' + filename + '"');
                    }
                } catch(e) {
                    setFeedback('✗ Error al leer el archivo: ' + e.message);
                }
            };
            reader.readAsText(file);
            setImporting(true);
        };
        input.click();
    };

    const handleExportScripts = function() {
        if (scripts.length === 0) {
            setFeedback('No hay guiones para exportar.');
            return;
        }
        var dataStr = JSON.stringify(scripts, null, 2);
        var blob = new Blob([dataStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'muller_scripts_export_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        setFeedback('✓ Exportados ' + scripts.length + ' guiones.');
        setTimeout(function() { setFeedback(''); }, 2000);
    };

    // --- Handlers de Vocabulario ---
    const handleCreateVocabList = function() {
        var name = vocabForm.name.trim();
        var wordsRaw = vocabForm.words.trim();
        if (!name) { setFeedback('El nombre de la lista es obligatorio.'); return; }
        if (!wordsRaw) { setFeedback('Añade al menos una palabra (alemán | español por línea).'); return; }

        var words = wordsRaw.split('\n')
            .filter(function(l) { return l.trim(); })
            .map(function(l) {
                var parts = l.split('|').map(function(p) { return p.trim(); });
                return { de: parts[0] || '', es: parts[1] || '' };
            })
            .filter(function(w) { return w.de; });

        if (words.length === 0) {
            setFeedback('Ninguna palabra válida. Formato: alemán | español');
            return;
        }

        var newList = {
            id: 'vocab_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            name: name,
            words: words,
            level: vocabForm.level || 'B1',
            createdAt: new Date().toISOString(),
            count: words.length
        };

        var updated = vocabLists.concat([newList]);
        saveVocabs(updated);

        setVocabForm({ name: '', words: '', level: 'B1' });
        setShowVocabForm(false);
        setFeedback('✓ Lista "' + name + '" creada (' + words.length + ' palabras).');
        setTimeout(function() { setFeedback(''); }, 2500);
    };

    const handleDeleteVocabList = function(id) {
        if (!window.confirm('¿Eliminar esta lista de vocabulario?')) return;
        var filtered = vocabLists.filter(function(l) { return l.id !== id; });
        saveVocabs(filtered);
        if (expandedVocabId === id) setExpandedVocabId(null);
        setFeedback('✓ Lista eliminada.');
        setTimeout(function() { setFeedback(''); }, 2000);
    };

    const handleExportVocabs = function() {
        if (vocabLists.length === 0) {
            setFeedback('No hay listas de vocabulario para exportar.');
            return;
        }
        var dataStr = JSON.stringify(vocabLists, null, 2);
        var blob = new Blob([dataStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'muller_vocabs_export_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        setFeedback('✓ Exportadas ' + vocabLists.length + ' listas.');
        setTimeout(function() { setFeedback(''); }, 2000);
    };

    const handleImportVocabs = function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            var file = e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(ev) {
                try {
                    var json = JSON.parse(ev.target.result);
                    var imported = [];
                    var arr = Array.isArray(json) ? json : [json];
                    arr.forEach(function(item) {
                        if (item && item.name && item.words && Array.isArray(item.words)) {
                            imported.push({
                                id: 'vocab_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
                                name: item.name,
                                words: item.words,
                                createdAt: new Date().toISOString(),
                                count: item.words.length,
                                imported: true
                            });
                        }
                    });
                    if (imported.length === 0) {
                        setFeedback('✗ No se encontraron listas válidas en el archivo.');
                        return;
                    }
                    var updated = vocabLists.concat(imported);
                    saveVocabs(updated);
                    setFeedback('✓ ' + imported.length + ' listas importadas.');
                } catch(e) {
                    setFeedback('✗ Error al parsear JSON: ' + e.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    // --- Helpers de UI ---
    var feedbackEl = feedback ? React.createElement('div', {
        className: 'mb-4 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-sm animate-fadeIn ' +
            (feedback.startsWith('✓') ? 'text-emerald-300' : feedback.startsWith('✗') ? 'text-red-300' : 'text-cyan-300'),
        key: 'feedback-' + Date.now()
    }, feedback) : null;

    // Botón de pestaña (subview toggle)
    var TabButton = function({ active, label, icon, onClick }) {
        return React.createElement('button', {
            onClick: onClick,
            className: 'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ' +
                (active
                    ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/10')
        },
            React.createElement('i', { 'data-lucide': icon, style: { width: 16, height: 16 } }),
            React.createElement('span', null, label)
        );
    };

    // Botón glass genérico
    var GlassBtn = function({ icon, label, onClick, variant, disabled, title }) {
        var colors = variant === 'danger' ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30' :
                     variant === 'success' ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30' :
                     variant === 'primary' ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/30' :
                     variant === 'ghost' ? 'bg-transparent hover:bg-white/5 text-gray-400 border-transparent' :
                     'bg-white/10 hover:bg-white/20 text-white border-white/20';
        return React.createElement('button', {
            onClick: onClick,
            disabled: disabled,
            title: title || label,
            className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all duration-150 ' + colors + ' ' +
                (disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')
        },
            icon ? React.createElement('i', { 'data-lucide': icon, style: { width: 14, height: 14 } }) : null,
            label ? React.createElement('span', null, label) : null
        );
    };

    // ==================== MODAL para formularios ====================
    var Modal = function({ show, onClose, title, children }) {
        if (!show) return null;
        return React.createElement('div', {
            className: 'fixed inset-0 z-[200] flex items-center justify-center p-4',
            onClick: function(e) { if (e.target === e.currentTarget) onClose(); }
        },
            React.createElement('div', { className: 'absolute inset-0 bg-black/60 backdrop-blur-sm' }),
            React.createElement('div', {
                className: 'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-gray-900/90 border border-white/20 shadow-2xl p-6 animate-fadeIn'
            },
                // Header
                React.createElement('div', { className: 'flex items-center justify-between mb-5' },
                    React.createElement('h3', { className: 'text-lg font-bold text-white' }, title),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'p-1 rounded-full hover:bg-white/10 transition-colors'
                    },
                        React.createElement('i', { 'data-lucide': 'x', style: { width: 20, height: 20, color: '#94a3b8' } })
                    )
                ),
                children
            )
        );
    };

    // --- Input/Textarea estilizados ---
    var StyledInput = function({ value, onChange, placeholder, type, className }) {
        return React.createElement('input', {
            type: type || 'text',
            value: value,
            onChange: onChange,
            placeholder: placeholder,
            className: 'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all ' + (className || '')
        });
    };

    var StyledTextarea = function({ value, onChange, placeholder, rows, className }) {
        return React.createElement('textarea', {
            value: value,
            onChange: onChange,
            placeholder: placeholder,
            rows: rows || 6,
            className: 'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none font-mono ' + (className || '')
        });
    };

    var StyledSelect = function({ value, onChange, options }) {
        return React.createElement('select', {
            value: value,
            onChange: onChange,
            className: 'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer'
        },
            options.map(function(opt) {
                return React.createElement('option', { key: opt.value, value: opt.value }, opt.label);
            })
        );
    };

    // ==================== FORMULARIO: Nuevo Guion ====================
    var ScriptFormModal = Modal({
        show: showScriptForm,
        onClose: function() { setShowScriptForm(false); setFeedback(''); },
        title: 'Nuevo Guion',
        children: React.createElement('div', { className: 'space-y-4' },
            React.createElement(StyledInput, {
                value: scriptForm.title,
                onChange: function(e) { setScriptForm(Object.assign({}, scriptForm, { title: e.target.value })); },
                placeholder: 'Título del guion (ej. Diálogo en el aeropuerto)'
            }),
            React.createElement(StyledTextarea, {
                value: scriptForm.text,
                onChange: function(e) { setScriptForm(Object.assign({}, scriptForm, { text: e.target.value })); },
                placeholder: 'Texto del guion en alemán...\n\nFormato:\nPersonaje: texto (traducción)\no\nalemán - español (pares de vocabulario)',
                rows: 10
            }),
            React.createElement(StyledInput, {
                value: scriptForm.translation,
                onChange: function(e) { setScriptForm(Object.assign({}, scriptForm, { translation: e.target.value })); },
                placeholder: 'Traducción al español (opcional)'
            }),
            React.createElement('div', null,
                React.createElement('label', { className: 'block text-xs text-gray-400 mb-1.5' }, 'Nivel'),
                React.createElement(StyledSelect, {
                    value: scriptForm.level,
                    onChange: function(e) { setScriptForm(Object.assign({}, scriptForm, { level: e.target.value })); },
                    options: [
                        { value: 'A1', label: 'A1 - Principiante' },
                        { value: 'A2', label: 'A2 - Básico' },
                        { value: 'B1', label: 'B1 - Intermedio' },
                        { value: 'B2', label: 'B2 - Intermedio-Alto' },
                        { value: 'C1', label: 'C1 - Avanzado' }
                    ]
                })
            ),
            React.createElement('div', { className: 'flex gap-3 pt-2' },
                React.createElement(GlassBtn, { icon: 'save', label: 'Guardar Guion', variant: 'success', onClick: handleCreateScript }),
                React.createElement(GlassBtn, { icon: 'x', label: 'Cancelar', onClick: function() { setShowScriptForm(false); } })
            )
        )
    });

    // ==================== FORMULARIO: Nueva Lista Vocab ====================
    var VocabFormModal = Modal({
        show: showVocabForm,
        onClose: function() { setShowVocabForm(false); setFeedback(''); },
        title: 'Nueva Lista de Vocabulario',
        children: React.createElement('div', { className: 'space-y-4' },
            React.createElement(StyledInput, {
                value: vocabForm.name,
                onChange: function(e) { setVocabForm(Object.assign({}, vocabForm, { name: e.target.value })); },
                placeholder: 'Nombre de la lista (ej. En el restaurante)'
            }),
            React.createElement('div', null,
                React.createElement('label', { className: 'block text-xs text-gray-400 mb-1.5' }, 'Palabras (una por línea: alemán | español)'),
                React.createElement(StyledTextarea, {
                    value: vocabForm.words,
                    onChange: function(e) { setVocabForm(Object.assign({}, vocabForm, { words: e.target.value })); },
                    placeholder: 'der Tisch | la mesa\ndas Wasser | el agua\ntrinken | beber\n...',
                    rows: 8
                })
            ),
            React.createElement('div', null,
                React.createElement('label', { className: 'block text-xs text-gray-400 mb-1.5' }, 'Nivel'),
                React.createElement(StyledSelect, {
                    value: vocabForm.level,
                    onChange: function(e) { setVocabForm(Object.assign({}, vocabForm, { level: e.target.value })); },
                    options: [
                        { value: 'A1', label: 'A1 - Principiante' },
                        { value: 'A2', label: 'A2 - Básico' },
                        { value: 'B1', label: 'B1 - Intermedio' },
                        { value: 'B2', label: 'B2 - Intermedio-Alto' },
                        { value: 'C1', label: 'C1 - Avanzado' }
                    ]
                })
            ),
            React.createElement('div', { className: 'flex gap-3 pt-2' },
                React.createElement(GlassBtn, { icon: 'save', label: 'Crear Lista', variant: 'success', onClick: handleCreateVocabList }),
                React.createElement(GlassBtn, { icon: 'x', label: 'Cancelar', onClick: function() { setShowVocabForm(false); } })
            )
        )
    });

    // ==================== SUBVISTA: Guiones ====================
    var ScriptsView = React.createElement('div', { className: 'space-y-4' },
        // Barra de acciones
        React.createElement('div', { className: 'flex flex-wrap gap-2 items-center' },
            React.createElement(GlassBtn, { icon: 'plus', label: 'Nuevo Guion', variant: 'primary', onClick: function() { setShowScriptForm(true); setFeedback(''); } }),
            React.createElement(GlassBtn, { icon: 'upload', label: 'Importar (.json/.txt)', onClick: handleImportFile }),
            React.createElement(GlassBtn, { icon: 'download', label: 'Exportar JSON', onClick: handleExportScripts, variant: 'ghost' }),
            React.createElement('span', { className: 'text-xs text-gray-500 ml-auto' }, scripts.length + ' guion' + (scripts.length !== 1 ? 'es' : ''))
        ),

        // Lista de guiones
        scripts.length === 0
            ? React.createElement('div', { className: 'text-center py-16 text-gray-500' },
                React.createElement('i', { 'data-lucide': 'book-open', style: { width: 48, height: 48, margin: '0 auto 12px', display: 'block', opacity: 0.4 } }),
                React.createElement('p', { className: 'text-sm' }, 'No hay guiones guardados.'),
                React.createElement('p', { className: 'text-xs mt-1 text-gray-600' }, 'Crea tu primer guion o importa un archivo.')
              )
            : React.createElement('div', { className: 'space-y-2' },
                scripts.map(function(s) {
                    var isActive = window.Muller.activeScript && window.Muller.activeScript.id === s.id;
                    var dateStr = new Date(s.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                    return React.createElement('div', {
                        key: s.id,
                        className: 'p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-200 ' +
                            (isActive ? 'ring-2 ring-amber-500/50 border-amber-500/30' : '')
                    },
                        React.createElement('div', { className: 'flex items-start justify-between gap-3' },
                            // Info
                            React.createElement('div', { className: 'flex-1 min-w-0' },
                                React.createElement('div', { className: 'flex items-center gap-2 flex-wrap' },
                                    React.createElement('h4', { className: 'text-sm font-semibold text-white truncate' }, s.title),
                                    s.level ? React.createElement('span', {
                                        className: 'text-[10px] px-1.5 py-0.5 rounded-full font-medium ' +
                                            (['A1','A2'].includes(s.level) ? 'bg-emerald-500/20 text-emerald-300' :
                                             ['B1','B2'].includes(s.level) ? 'bg-amber-500/20 text-amber-300' :
                                             'bg-red-500/20 text-red-300')
                                    }, s.level) : null,
                                    isActive ? React.createElement('span', { className: 'text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300' }, 'Activo') : null,
                                    s.imported ? React.createElement('span', { className: 'text-[10px] text-gray-500' }, 'Importado') : null
                                ),
                                React.createElement('div', { className: 'flex gap-3 mt-1 text-xs text-gray-500' },
                                    React.createElement('span', null, dateStr),
                                    React.createElement('span', null, s.lineCount || s.text.split('\n').length + ' líneas'),
                                    React.createElement('span', null, (s.text || '').split(/\s+/).filter(Boolean).length + ' palabras')
                                )
                            ),
                            // Acciones
                            React.createElement('div', { className: 'flex gap-1.5 flex-shrink-0' },
                                React.createElement(GlassBtn, {
                                    icon: 'play',
                                    label: 'Cargar en Historia',
                                    variant: 'primary',
                                    onClick: function() { handleLoadInHistoria(s); },
                                    title: 'Cargar este guion en la pestaña Historia'
                                }),
                                React.createElement(GlassBtn, {
                                    icon: 'trash-2',
                                    variant: 'danger',
                                    onClick: function() { handleDeleteScript(s.id); },
                                    title: 'Eliminar guion'
                                })
                            )
                        ),
                        // Vista previa del texto (primeros 100 caracteres)
                        s.text ? React.createElement('div', {
                            className: 'mt-2 text-xs text-gray-500 truncate font-mono',
                            title: s.text.slice(0, 300)
                        }, s.text.slice(0, 120) + (s.text.length > 120 ? '...' : '')) : null
                    );
                })
            )
    );

    // ==================== SUBVISTA: Instrucciones IA ====================
    // Versión mejorada con instrucciones completas para que la IA genere guiones con vocabulario
    var IAInstructionsView = React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20' },
            React.createElement('div', { className: 'flex items-center gap-3 mb-4' },
                React.createElement('i', { 'data-lucide': 'bot', style: { width: 24, height: 24, color: '#fbbf24' } }),
                React.createElement('h3', { className: 'text-lg font-bold text-white' }, 'Instrucciones para IA'),
            ),
            React.createElement('p', { className: 'text-sm text-gray-300 mb-4' },
                'Pega este prompt a cualquier IA (ChatGPT, Claude, Gemini) para que genere un guion en alemán ' +
                'formateado específicamente para la aplicación Profesor Plaza Müller. ' +
                'El prompt incluye instrucciones para que la IA identifique palabras por nivel (A1, A2, B1, etc.) ' +
                'y genere vocabulario con artículos y traducciones al español.'
            )
        ),

        // Prompt template PRINCIPAL - Versión mejorada
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10' },
            React.createElement('div', { className: 'flex items-center justify-between mb-3' },
                React.createElement('h4', { className: 'text-sm font-bold text-amber-300' }, '📋 Prompt para la IA (con vocabulario por niveles)'),
                React.createElement('button', {
                    onClick: function() {
                        var promptText = document.getElementById('ia-prompt-template');
                        if (promptText) {
                            navigator.clipboard.writeText(promptText.textContent).then(function() {
                                setFeedback('✓ Prompt copiado al portapapeles');
                                setTimeout(function() { setFeedback(''); }, 2000);
                            });
                        }
                    },
                    className: 'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer'
                },
                    React.createElement('i', { 'data-lucide': 'copy', style: { width: 12, height: 12 } }),
                    React.createElement('span', null, 'Copiar prompt')
                )
            ),
            React.createElement('div', {
                id: 'ia-prompt-template',
                className: 'text-xs leading-relaxed text-gray-300 font-mono whitespace-pre-wrap bg-gray-900/50 p-4 rounded-xl border border-white/5'
            },
                '=== INSTRUCCIONES PARA GENERAR UN GUIÓN EN ALEMÁN PARA APRENDER VOCABULARIO ===\n\n' +
                'Quiero que generes un guion de diálogo en alemán de nivel {NIVEL}. ' +
                'El guion se usará en una aplicación de aprendizaje donde:\n' +
                '- Las palabras de vocabulario aparecen SUBRAYADAS EN AMARILLO en el texto\n' +
                '- Al final de cada frase se muestra automáticamente la lista de palabras de vocabulario con su ARTÍCULO (der/die/das) y TRADUCCIÓN AL ESPAÑOL\n' +
                '- El vocabulario se organiza por niveles (A1, A2, B1, B2, C1)\n\n' +
                'Sigue EXACTAMENTE este formato para CADA escena:\n\n' +
                'Escena 1:\n' +
                '- [Personaje A]: [texto en alemán]\n' +
                '- [Personaje B]: [texto en alemán]\n' +
                'Vocabulario:\n' +
                '- [palabra alemana CON ARTÍCULO] | [traducción al español] | [nivel]\n' +
                '- [palabra alemana CON ARTÍCULO] | [traducción al español] | [nivel]\n\n' +
                'Escena 2:\n' +
                '- [Personaje A]: [texto en alemán]\n' +
                '- [Personaje B]: [texto en alemán]\n' +
                'Vocabulario:\n' +
                '- [palabra alemana CON ARTÍCULO] | [traducción al español] | [nivel]\n\n' +
                'REGLAS IMPORTANTES:\n' +
                '1. Cada escena debe tener 2-4 líneas de diálogo\n' +
                '2. Después de CADA escena, incluye OBLIGATORIAMENTE una sección "Vocabulario:"\n' +
                '3. TODAS las palabras listadas en Vocabulario deben aparecer en el texto de la escena\n' +
                '4. Para SUSTANTIVOS: pon siempre el artículo (der/die/das) ANTES de la palabra. Ejemplo: "der Tisch", "die Lampe", "das Buch"\n' +
                '5. Para VERBOS: pon el verbo en infinitivo. Si es separable, indica la partícula. Ejemplo: "aufstehen", "einkaufen"\n' +
                '6. Para ADJETIVOS: pon el adjetivo en forma base\n' +
                '7. CADA palabra de vocabulario debe llevar su NIVEL (A1, A2, B1, B2, C1) separado por |\n' +
                '8. Distribuye las palabras por nivel según su dificultad real:\n' +
                '   - A1: palabras básicas (Haus, Tisch, Wasser, gehen, kommen, essen, trinken)\n' +
                '   - A2: palabras cotidianas (Supermarkt, Bahnhof, Frühstück, einkaufen, kochen)\n' +
                '   - B1: vocabulario intermedio (Erfahrung, Bewerbung, besprechen, entscheiden)\n' +
                '   - B2: vocabulario avanzado (Verhandlung, Forschungsprojekt, vorbereiten)\n' +
                '   - C1: vocabulario complejo (Maßnahme, Veranstaltung, Auseinandersetzung)\n' +
                '9. El tema debe ser una SITUACIÓN COTIDIANA apropiada para el nivel elegido\n' +
                '10. Si el nivel es A1 o A2: usa presente y frases cortas\n' +
                '11. Si el nivel es B1: introduce pasado (Perfekt/Präteritum) y opiniones\n' +
                '12. Si el nivel es B2 o C1: usa subjuntivo (Konjunktiv II), pasivo, conectores complejos\n\n' +
                'EJEMPLO PARA NIVEL A2 - TEMA: EN EL RESTAURANTE\n\n' +
                'Escena 1:\n' +
                '- Lukas: Guten Abend! Habt ihr einen Tisch für zwei Personen?\n' +
                '- Elena: Ja, natürlich! Kommt bitte mit. Hier ist euer Tisch.\n' +
                '- Lukas: Danke schön! Die Speisekarte sieht sehr gut aus.\n' +
                'Vocabulario:\n' +
                '- der Abend | la tarde/noche | A1\n' +
                '- der Tisch | la mesa | A1\n' +
                '- die Person | la persona | A1\n' +
                '- die Speisekarte | la carta/menú | A2\n' +
                '- aussehen | parecer/tener aspecto | A2\n\n' +
                'Escena 2:\n' +
                '- Elena: Was möchtest du bestellen? Ich nehme die Suppe und einen Salat.\n' +
                '- Lukas: Ich möchte das Schnitzel mit Pommes. Und eine Cola bitte!\n' +
                '- Elena: Gut, ich rufe den Kellner.\n' +
                'Vocabulario:\n' +
                '- bestellen | pedir | A2\n' +
                '- nehmen | tomar/coger | A1\n' +
                '- die Suppe | la sopa | A1\n' +
                '- der Salat | la ensalada | A1\n' +
                '- das Schnitzel | el escalope | A2\n' +
                '- der Kellner | el camarero | A1\n\n' +
                'EJEMPLO PARA NIVEL B1 - TEMA: VIAJE\n\n' +
                'Escena 1:\n' +
                '- Anna: Letzten Sommer bin ich nach Österreich gefahren. Es war eine tolle Erfahrung.\n' +
                '- Ben: Oh, ich war letztes Jahr auch dort. Wo hast du übernachtet?\n' +
                '- Anna: In einem kleinen Hotel in den Alpen. Die Aussicht war unglaublich!\n' +
                'Vocabulario:\n' +
                '- der Sommer | el verano | A1\n' +
                '- fahren (bin gefahren) | ir/conducir | A2\n' +
                '- die Erfahrung | la experiencia | B1\n' +
                '- übernachten | alojarse/pasar la noche | B1\n' +
                '- die Aussicht | la vista/panorama | B1\n' +
                '- unglaublich | increíble | B1'
            )
        ),

        // Cómo usar en Historia con modo Vocabulario
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10' },
            React.createElement('h4', { className: 'text-sm font-bold text-cyan-300 mb-3' }, '🎯 Cómo estudiar con el modo Vocabulario en Historia'),
            React.createElement('p', { className: 'text-sm text-gray-300 mb-4' },
                'Una vez creado el guion y cargado en la pestaña Historia, el MODO VOCABULARIO funciona así:'
            ),
            React.createElement('ul', { className: 'space-y-3 text-sm text-gray-300' },
                React.createElement('li', { className: 'flex items-start gap-2' },
                    React.createElement('span', { className: 'text-amber-400 font-bold' }, '1.'),
                    React.createElement('div', null,
                        React.createElement('span', { className: 'font-medium text-white' }, 'Activa el botón "Vocabulario" en la barra de herramientas'),
                        React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, 'Se activa el modo frase por frase: las palabras de tu vocabulario aparecen resaltadas en AMARILLO.')
                    )
                ),
                React.createElement('li', { className: 'flex items-start gap-2' },
                    React.createElement('span', { className: 'text-amber-400 font-bold' }, '2.'),
                    React.createElement('div', null,
                        React.createElement('span', { className: 'font-medium text-white' }, 'Cada frase se muestra UNA POR UNA con las palabras marcadas'),
                        React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, 'Las palabras que tienes en tu vocabulario aparecen SUBRAYADAS EN AMARILLO.')
                    )
                ),
                React.createElement('li', { className: 'flex items-start gap-2' },
                    React.createElement('span', { className: 'text-amber-400 font-bold' }, '3.'),
                    React.createElement('div', null,
                        React.createElement('span', { className: 'font-medium text-white' }, 'Al final de la frase se muestra AUTOMÁTICAMENTE el vocabulario'),
                        React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, 'Cada palabra se muestra con su ARTÍCULO (der/die/das en azul/rojo/verde), su NIVEL (A1, B1, etc.) y su TRADUCCIÓN AL ESPAÑOL.')
                    )
                ),
                React.createElement('li', { className: 'flex items-start gap-2' },
                    React.createElement('span', { className: 'text-amber-400 font-bold' }, '4.'),
                    React.createElement('div', null,
                        React.createElement('span', { className: 'font-medium text-white' }, 'Usa "Siguiente" para avanzar a la siguiente frase'),
                        React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, 'O pulsa "Anterior" para repasar. También puedes usar Auto-play para que avance solo.')
                    )
                ),
                React.createElement('li', { className: 'flex items-start gap-2' },
                    React.createElement('span', { className: 'text-amber-400 font-bold' }, '5.'),
                    React.createElement('div', null,
                        React.createElement('span', { className: 'font-medium text-white' }, 'Pulsa "Escuchar" para oír la pronunciación'),
                        React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5' }, 'El sistema leerá la frase en alemán con la velocidad que elijas.')
                    )
                )
            )
        ),

        // Cómo crear listas de vocabulario por niveles
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10' },
            React.createElement('h4', { className: 'text-sm font-bold text-emerald-300 mb-3' }, '📚 Cómo añadir vocabulario por niveles (A1, A2, B1, B2, C1)'),
            React.createElement('p', { className: 'text-sm text-gray-300 mb-3' },
                'Para que el sistema reconozca las palabras y las resalte en amarillo, debes crearlas como listas de vocabulario. ' +
                'Sigue estos pasos:'
            ),
            React.createElement('ol', { className: 'space-y-4 text-sm text-gray-300 list-decimal list-inside' },
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'Ve a la pestaña "Vocabulario" de la Biblioteca'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'y haz clic en "Nueva Lista".')
                ),
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'Pon un nombre descriptivo con el NIVEL'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'Ej: "A1 - Saludos", "B1 - Viajes", "A2 - Comida", "C1 - Negocios"')
                ),
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'Selecciona el nivel correspondiente en el selector'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'A1 (principiante), A2 (básico), B1 (intermedio), B2 (intermedio-alto), C1 (avanzado)')
                ),
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'Escribe las palabras: alemán CON ARTÍCULO | español'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'Una por línea. Ejemplo: "der Tisch | la mesa" o "das Wasser | el agua" o "trinken | beber"')
                ),
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'Al crear la lista, las palabras se guardan con el nivel que elegiste'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'En Historia se mostrará el nivel (A1, B1, etc.) junto a cada palabra.')
                ),
                React.createElement('li', { className: 'text-sm' },
                    React.createElement('span', { className: 'font-medium text-white' }, 'En Historia, el sistema resaltará automáticamente TODAS las palabras'),
                    React.createElement('p', { className: 'text-xs text-gray-500 mt-0.5 ml-5' }, 'que coincidan con CUALQUIERA de tus listas de vocabulario (independientemente del nivel).')
                )
            )
        ),

        // Consejos para organizar el vocabulario por niveles
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20' },
            React.createElement('div', { className: 'flex items-center gap-3 mb-3' },
                React.createElement('i', { 'data-lucide': 'list-tree', style: { width: 20, height: 20, color: '#34d399' } }),
                React.createElement('h4', { className: 'text-sm font-bold text-emerald-300' }, '🗂️ Sistema recomendado de organización por niveles'),
            ),
            React.createElement('p', { className: 'text-sm text-gray-300 mb-3' },
                'Para aprovechar al máximo el sistema, te recomiendo crear listas de vocabulario siguiendo esta estructura:'
            ),
            React.createElement('div', { className: 'space-y-2 text-sm' },
                React.createElement('div', { className: 'p-3 rounded-lg bg-white/5 border border-white/10' },
                    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                        React.createElement('span', { className: 'px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300' }, 'A1'),
                        React.createElement('span', { className: 'font-medium text-white' }, 'Principiante')
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, 'Palabras básicas: saludos, números, días, colores, familia, casa, comida básica, verbos comunes (sein, haben, gehen, kommen, essen, trinken). Ej: "der Tisch", "die Lampe", "das Wasser"')
                ),
                React.createElement('div', { className: 'p-3 rounded-lg bg-white/5 border border-white/10' },
                    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                        React.createElement('span', { className: 'px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300' }, 'A2'),
                        React.createElement('span', { className: 'font-medium text-white' }, 'Básico')
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, 'Vocabulario cotidiano: supermercado, ropa, ciudad, transporte, trabajo, hobby, tiempo atmosférico. Ej: "der Supermarkt", "die Bahnhof", "einkaufen"')
                ),
                React.createElement('div', { className: 'p-3 rounded-lg bg-white/5 border border-white/10' },
                    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                        React.createElement('span', { className: 'px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300' }, 'B1'),
                        React.createElement('span', { className: 'font-medium text-white' }, 'Intermedio')
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, 'Vocabulario para opinar y narrar: viajes, salud, educación, noticias, sentimientos, verbos con preposición. Ej: "die Erfahrung", "die Bewerbung", "sich freuen auf"')
                ),
                React.createElement('div', { className: 'p-3 rounded-lg bg-white/5 border border-white/10' },
                    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                        React.createElement('span', { className: 'px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-300' }, 'B2'),
                        React.createElement('span', { className: 'font-medium text-white' }, 'Intermedio-Alto')
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, 'Vocabulario avanzado: negocios, política, medio ambiente, tecnología, argumentación. Ej: "die Verhandlung", "die Maßnahme", "vorbereiten"')
                ),
                React.createElement('div', { className: 'p-3 rounded-lg bg-white/5 border border-white/10' },
                    React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                        React.createElement('span', { className: 'px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-300' }, 'C1'),
                        React.createElement('span', { className: 'font-medium text-white' }, 'Avanzado')
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, 'Vocabulario complejo: ciencia, filosofía, arte, debates, textos formales. Ej: "die Auseinandersetzung", "die Veranstaltung", "das Forschungsprojekt"')
                )
            )
        ),

        // Ejemplo de guion completo con vocabulario
        React.createElement('div', { className: 'p-5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10' },
            React.createElement('h4', { className: 'text-sm font-bold text-purple-300 mb-3' }, '💡 Ejemplo completo de lo que genera la IA'),
            React.createElement('p', { className: 'text-xs text-gray-400 mb-3' },
                'Este es el tipo de resultado que obtendrás al pegar el prompt. Las palabras de Vocabulario son las que ' +
                'se resaltarán en amarillo en el texto y se mostrarán al final de cada frase:'
            ),
            React.createElement('div', { className: 'text-xs leading-relaxed text-gray-300 font-mono whitespace-pre-wrap bg-gray-900/50 p-4 rounded-xl border border-white/5' },
                'Escena 1:\n' +
                '- Lukas: Guten Morgen! Möchtest du einen Kaffee trinken?\n' +
                '- Elena: Ja, gerne! Ich möchte einen Milchkaffee.\n' +
                '- Lukas: Komm, wir setzen uns an den Tisch.\n' +
                'Vocabulario:\n' +
                '- der Morgen | la mañana | A1\n' +
                '- der Kaffee | el café | A1\n' +
                '- trinken | beber | A1\n' +
                '- der Milchkaffee | el café con leche | A2\n' +
                '- der Tisch | la mesa | A1\n\n' +
                'Escena 2:\n' +
                '- Elena: Hast du schon das neue Buch gelesen?\n' +
                '- Lukas: Noch nicht. Ich habe gehört, dass es sehr interessant sein soll.\n' +
                '- Elena: Ja, ich kann es nur empfehlen!\n' +
                'Vocabulario:\n' +
                '- das Buch | el libro | A2\n' +
                '- lesen (gelesen) | leer (leído) | B1\n' +
                '- noch nicht | todavía no | A2\n' +
                '- hören (gehört) | oír/escuchar (oído) | A2\n' +
                '- interessant | interesante | A2\n' +
                '- empfehlen | recomendar | B1'
            )
        ),

        // Nota final
        React.createElement('div', { className: 'p-4 rounded-xl backdrop-blur-sm bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300/70 flex items-start gap-2' },
            React.createElement('i', { 'data-lucide': 'lightbulb', style: { width: 14, height: 14, marginTop: 1, flexShrink: 0 } }),
            React.createElement('span', null,
                '💡 Consejo importante: Organiza tu vocabulario por niveles (A1-C1) para poder estudiar de forma progresiva. ' +
                'Cuando estés estudiando un guion de nivel B1, puedes crear listas de vocabulario A1 y A2 también ' +
                'para repasar palabras básicas que aparezcan en el texto. ' +
                'En el modo Vocabulario de Historia, TODAS las palabras de tus listas se resaltarán automáticamente ' +
                'en AMARILLO y al final de cada frase verás la palabra con su ARTÍCULO (der/die/das coloreado por género), ' +
                'su NIVEL (A1, B1, etc.) y su TRADUCCIÓN AL ESPAÑOL.'
            )
        )
    );

    // ==================== SUBVISTA: Vocabulario ====================
    var VocabsView = React.createElement('div', { className: 'space-y-4' },
        // Barra de acciones
        React.createElement('div', { className: 'flex flex-wrap gap-2 items-center' },
            React.createElement(GlassBtn, { icon: 'plus', label: 'Nueva Lista', variant: 'primary', onClick: function() { setShowVocabForm(true); setFeedback(''); } }),
            React.createElement(GlassBtn, { icon: 'upload', label: 'Importar JSON', onClick: handleImportVocabs }),
            React.createElement(GlassBtn, { icon: 'download', label: 'Exportar JSON', onClick: handleExportVocabs, variant: 'ghost' }),
            React.createElement('span', { className: 'text-xs text-gray-500 ml-auto' }, vocabLists.length + ' lista' + (vocabLists.length !== 1 ? 's' : ''))
        ),

        // Lista de vocabulario
        vocabLists.length === 0
            ? React.createElement('div', { className: 'text-center py-16 text-gray-500' },
                React.createElement('i', { 'data-lucide': 'bookmark', style: { width: 48, height: 48, margin: '0 auto 12px', display: 'block', opacity: 0.4 } }),
                React.createElement('p', { className: 'text-sm' }, 'No hay listas de vocabulario.'),
                React.createElement('p', { className: 'text-xs mt-1 text-gray-600' }, 'Crea tu primera lista para ver palabras resaltadas en Historia.')
              )
            : React.createElement('div', { className: 'space-y-2' },
                vocabLists.map(function(list) {
                    var isExpanded = expandedVocabId === list.id;
                    var dateStr = new Date(list.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                    return React.createElement('div', {
                        key: list.id,
                        className: 'rounded-xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden transition-all duration-200'
                    },
                        // Cabecera de la lista (click para expandir)
                        React.createElement('div', {
                            onClick: function() { setExpandedVocabId(isExpanded ? null : list.id); },
                            className: 'flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.04] transition-colors'
                        },
                            React.createElement('div', { className: 'flex items-center gap-3 min-w-0' },
                                React.createElement('i', {
                                    'data-lucide': isExpanded ? 'chevron-down' : 'chevron-right',
                                    style: { width: 16, height: 16, color: '#94a3b8', flexShrink: 0 }
                                }),
                                React.createElement('div', { className: 'min-w-0' },
                                    React.createElement('h4', { className: 'text-sm font-semibold text-white truncate' }, list.name),
                                    React.createElement('div', { className: 'flex gap-3 text-xs text-gray-500 mt-0.5' },
                                        React.createElement('span', null, list.count || list.words.length + ' palabras'),
                                        React.createElement('span', null, dateStr),
                                        list.imported ? React.createElement('span', null, 'Importado') : null
                                    )
                                )
                            ),
                            React.createElement(GlassBtn, {
                                icon: 'trash-2',
                                variant: 'danger',
                                onClick: function(e) { e.stopPropagation(); handleDeleteVocabList(list.id); },
                                title: 'Eliminar lista'
                            })
                        ),
                        // Palabras expandidas
                        isExpanded ? React.createElement('div', { className: 'border-t border-white/10' },
                            React.createElement('div', { className: 'divide-y divide-white/5 max-h-64 overflow-y-auto' },
                                list.words.map(function(w, idx) {
                                    return React.createElement('div', {
                                        key: idx,
                                        className: 'flex items-center justify-between px-4 py-2 text-sm hover:bg-white/[0.02]'
                                    },
                                        React.createElement('span', { className: 'text-white font-medium' }, w.de),
                                        React.createElement('span', { className: 'text-gray-400' }, w.es || '—')
                                    );
                                })
                            ),
                            // Stats al final
                            React.createElement('div', { className: 'px-4 py-2 bg-white/[0.02] text-xs text-gray-500 flex justify-between' },
                                React.createElement('span', null, list.words.length + ' palabras'),
                                React.createElement('span', null, 'Creada: ' + dateStr)
                            )
                        ) : null
                    );
                })
            )
    );

    // ==================== RENDER PRINCIPAL ====================
    return React.createElement('div', { className: 'flex flex-col h-full bg-gray-900 text-gray-100' },
        // Cabecera con tabs
        React.createElement('div', { className: 'flex-shrink-0 p-4 pb-2 border-b border-white/10' },
            React.createElement('div', { className: 'flex items-center justify-between mb-3' },
                React.createElement('div', { className: 'flex items-center gap-3' },
                    React.createElement('i', { 'data-lucide': 'library', style: { width: 24, height: 24, color: '#fbbf24' } }),
                    React.createElement('h2', { className: 'text-xl font-bold text-white' }, 'Biblioteca')
                ),
                // Indicador de sesión
                session ? React.createElement('span', { className: 'text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full' }, 'Sync') : null
            ),
            // Tabs de subvista
            React.createElement('div', { className: 'flex gap-2' },
                React.createElement(TabButton, {
                    active: subview === 'scripts',
                    icon: 'book-open',
                    label: 'Guiones',
                    onClick: function() { setSubview('scripts'); setFeedback(''); }
                }),
            React.createElement(TabButton, {
                active: subview === 'vocabs',
                icon: 'bookmark',
                label: 'Vocabulario',
                onClick: function() { setSubview('vocabs'); setFeedback(''); }
            }),
            React.createElement(TabButton, {
                active: subview === 'ia-instructions',
                icon: 'bot',
                label: 'Instrucciones IA',
                onClick: function() { setSubview('ia-instructions'); setFeedback(''); }
            })
            )
        ),

        // Contenido scrolleable
        React.createElement('div', { className: 'flex-1 overflow-y-auto p-4' },
            feedbackEl,
            subview === 'scripts' ? ScriptsView : subview === 'vocabs' ? VocabsView : IAInstructionsView,

            // Hint de integración con Historia
            React.createElement('div', { className: 'mt-6 p-3 rounded-xl backdrop-blur-sm bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300/70 flex items-start gap-2' },
                React.createElement('i', { 'data-lucide': 'info', style: { width: 14, height: 14, marginTop: 1, flexShrink: 0 } }),
                React.createElement('span', null,
                    'Los guiones guardados aparecen automáticamente en el selector de la pestaña Historia. ' +
                    'Usa "Cargar en Historia" para seleccionar un guion y navegar directamente.'
                )
            )
        ),

        // Modales
        ScriptFormModal,
        VocabFormModal
    );
};