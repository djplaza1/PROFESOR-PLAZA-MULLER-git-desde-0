// ═══════════════════════════════════════════════════
// Floating AI Chat Global – Profesor Plaza Müller
// Botón flotante visible SIEMPRE, con su propio createRoot
// (independiente de splash, sesión o pestaña activa)
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.FloatingAiChat = window.Muller.FloatingAiChat || {};

// ─── Token Tracker persistente (localStorage con timestamps) ───
// Cada uso se guarda como { t, in, out } donde t = timestamp
// Permite consultar stats por: sesión actual, hoy, esta semana, este mes
(function() {
    var STORAGE_KEY = 'muller_token_history_v1';
    var _listeners = [];
    var _sessionInput = 0;
    var _sessionOutput = 0;
    var _sessionMessages = 0;

    function _loadHistory() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
    }

    function _saveHistory(history) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch(e) { /* localStorage lleno o no disponible */ }
    }

    function _getDayStart(ts) {
        var d = new Date(ts);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }

    function _getWeekStart(ts) {
        var d = new Date(ts);
        var day = d.getDay(); // 0=domingo, 1=lunes...
        var diff = (day === 0 ? 6 : day - 1); // ajustar a lunes como inicio
        d.setDate(d.getDate() - diff);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }

    function _getMonthStart(ts) {
        var d = new Date(ts);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }

    function _sumRange(history, since) {
        var input = 0, output = 0, msgs = 0, cost = 0;
        for (var i = 0; i < history.length; i++) {
            if (history[i].t >= since) {
                input += history[i].in || 0;
                output += history[i].out || 0;
                msgs++;
                cost += ((history[i].in || 0) * 0.00000014) + ((history[i].out || 0) * 0.00000028);
            }
        }
        return { inputTokens: input, outputTokens: output, totalTokens: input + output, cost: cost, messages: msgs };
    }

    function _notify() {
        _listeners.forEach(function(fn) { fn(); });
    }

    window.Muller.FloatingAiChat.TokenTracker = {
        getStats: function() {
            var history = _loadHistory();
            var now = Date.now();
            var todayStart = _getDayStart(now);
            var weekStart = _getWeekStart(now);
            var monthStart = _getMonthStart(now);

            return {
                // Sesión actual (desde que se cargó la página)
                session: {
                    inputTokens: _sessionInput,
                    outputTokens: _sessionOutput,
                    totalTokens: _sessionInput + _sessionOutput,
                    messages: _sessionMessages,
                    cost: ((_sessionInput || 0) * 0.00000014) + ((_sessionOutput || 0) * 0.00000028)
                },
                // Hoy
                today: _sumRange(history, todayStart),
                // Esta semana (lunes a domingo)
                week: _sumRange(history, weekStart),
                // Este mes
                month: _sumRange(history, monthStart),
                // Total histórico (incluye sesión actual)
                all: (function() {
                    var all = _sumRange(history, 0);
                    all.inputTokens += _sessionInput;
                    all.outputTokens += _sessionOutput;
                    all.totalTokens += _sessionInput + _sessionOutput;
                    all.messages += _sessionMessages;
                    all.cost += ((_sessionInput || 0) * 0.00000014) + ((_sessionOutput || 0) * 0.00000028);
                    return all;
                })()
            };
        },
        addUsage: function(inputTokens, outputTokens) {
            _sessionInput += inputTokens || 0;
            _sessionOutput += outputTokens || 0;
            _sessionMessages++;
            // Guardar en histórico
            var history = _loadHistory();
            history.push({
                t: Date.now(),
                in: inputTokens || 0,
                out: outputTokens || 0
            });
            _saveHistory(history);
            _notify();
        },
        resetSession: function() {
            _sessionInput = 0;
            _sessionOutput = 0;
            _sessionMessages = 0;
            _notify();
        },
        resetAll: function() {
            _sessionInput = 0;
            _sessionOutput = 0;
            _sessionMessages = 0;
            _saveHistory([]);
            _notify();
        },
        onChange: function(fn) {
            _listeners.push(fn);
            return function() {
                _listeners = _listeners.filter(function(f) { return f !== fn; });
            };
        }
    };
})();

// ═══════════════════════════════════════════════════
// FloatingAiChat Component
// ═══════════════════════════════════════════════════
window.Muller.FloatingAiChat.Component = function() {
    var _a = React.useState(false);
    var showFloatingChat = _a[0];
    var setShowFloatingChat = _a[1];
    
    var _b = React.useState(true);
    var chatMinimized = _b[0];
    var setChatMinimized = _b[1];
    
    var _c = React.useState(0);
    var chatKey = _c[0];
    var setChatKey = _c[1];
    
    var _d = React.useState(false);
    var showSettings = _d[0];
    var setShowSettings = _d[1];
    
    var _e = React.useState(false);
    var showHistoryStats = _e[0];
    var setShowHistoryStats = _e[1];
    
    // ─── Atajo de teclado Ctrl+Space ───
    React.useEffect(function() {
        function handleKeyDown(e) {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                setShowFloatingChat(function(prev) {
                    var next = !prev;
                    if (next) {
                        setChatMinimized(false);
                        setShowSettings(false);
                        setShowHistoryStats(false);
                    }
                    return next;
                });
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return function() { window.removeEventListener('keydown', handleKeyDown); };
    }, []);
    
    // ─── Temperatura y maxTokens con persistencia en localStorage ───
    function _loadFloatSettings() {
        try {
            var raw = localStorage.getItem('muller_ai_settings');
            if (raw) {
                var parsed = JSON.parse(raw);
                return { temperature: parsed.temperature != null ? parsed.temperature : 0.1, maxTokens: parsed.maxTokens != null ? parsed.maxTokens : 200 };
            }
        } catch(e) {}
        return { temperature: 0.1, maxTokens: 200 };
    }
    function _saveFloatSettings(temp, tokens) {
        try {
            localStorage.setItem('muller_ai_settings', JSON.stringify({ temperature: temp, maxTokens: tokens }));
        } catch(e) {}
    }
    
    var _floatInit = _loadFloatSettings();
    var _f = React.useState(_floatInit.temperature);
    var temperature = _f[0];
    var setTemperature = _f[1];
    
    // Max tokens (longitud máxima de respuesta)
    var _g = React.useState(_floatInit.maxTokens);
    var maxTokens = _g[0];
    var setMaxTokens = _g[1];
    
    // Persistir cambios
    React.useEffect(function() { _saveFloatSettings(temperature, maxTokens); }, [temperature, maxTokens]);
    
    // Token stats
    var _h = React.useState(window.Muller.FloatingAiChat.TokenTracker.getStats());
    var tokenStats = _h[0];
    var setTokenStats = _h[1];
    
    React.useEffect(function() {
        var unsubscribe = window.Muller.FloatingAiChat.TokenTracker.onChange(function() {
            setTokenStats(Object.assign({}, window.Muller.FloatingAiChat.TokenTracker.getStats()));
        });
        return unsubscribe;
    }, []);
    
    var handleToggleChat = function() {
        setShowFloatingChat(!showFloatingChat);
        setChatMinimized(false);
        setShowSettings(false);
        setShowHistoryStats(false);
    };
    
    // ─── Helper: formato de fecha ───
    function formatDate(ts) {
        var d = new Date(ts);
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    
    // ─── Estilos ───
    var btnStyle = {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 99999,
        width: 56,
        height: 56,
        borderRadius: 28,
        border: 'none',
        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
        color: 'white',
        fontSize: 24,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(14, 165, 233, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        transform: showFloatingChat ? 'rotate(45deg)' : 'rotate(0deg)'
    };
    
    var panelStyle = {
        position: 'fixed',
        bottom: 86,
        right: 20,
        zIndex: 99998,
        maxWidth: 420,
        width: '90vw',
        maxHeight: 'calc(100vh - 110px)',
        background: '#1e293b',
        borderRadius: 16,
        border: '1px solid #334155',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    };
    
    var headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: '#0ea5e9',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.9rem',
        cursor: 'pointer'
    };
    
    var settingsPanelStyle = {
        padding: 12,
        borderBottom: '1px solid #334155',
        background: '#0f172a',
        overflowY: 'auto',
        flex: 1
    };
    
    var tokenDisplayStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
        fontSize: '0.75rem',
        color: '#94a3b8'
    };
    
    var sectionLabelStyle = {
        fontSize: '0.72rem',
        fontWeight: 600,
        color: '#e2e8f0',
        marginTop: 10,
        marginBottom: 4,
        paddingTop: 8,
        borderTop: '1px solid #334155'
    };
    
    // ─── Función para renderizar un bloque de stats ───
    function renderStatsBlock(label, data, showReset) {
        return React.createElement('div', { key: label },
            data.totalTokens > 0 && React.createElement('div', { style: sectionLabelStyle }, label),
            data.totalTokens > 0 && React.createElement('div', { style: tokenDisplayStyle },
                React.createElement('span', null, '📊 Total tokens:'),
                React.createElement('span', { style: { fontWeight: 600, color: '#e2e8f0' } }, data.totalTokens.toLocaleString())
            ),
            data.totalTokens > 0 && React.createElement('div', { style: tokenDisplayStyle },
                React.createElement('span', null, '📝 Input:'),
                React.createElement('span', null, data.inputTokens.toLocaleString())
            ),
            data.totalTokens > 0 && React.createElement('div', { style: tokenDisplayStyle },
                React.createElement('span', null, '💬 Output:'),
                React.createElement('span', null, data.outputTokens.toLocaleString())
            ),
            data.totalTokens > 0 && React.createElement('div', { style: tokenDisplayStyle },
                React.createElement('span', null, '💵 Costo:'),
                React.createElement('span', null, '$' + data.cost.toFixed(5))
            ),
            data.totalTokens > 0 && React.createElement('div', { style: tokenDisplayStyle },
                React.createElement('span', null, '🔄 Mensajes:'),
                React.createElement('span', null, data.messages)
            ),
            showReset && data.totalTokens > 0 && React.createElement('button', {
                onClick: function() { 
                    if (confirm('¿Estás seguro de borrar todo el historial de tokens? Esta acción no se puede deshacer.')) {
                        window.Muller.FloatingAiChat.TokenTracker.resetAll(); 
                    }
                },
                style: {
                    marginTop: 8,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #475569',
                    background: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    width: '100%'
                }
            }, '🗑️ Borrar todo el historial')
        );
    }
    
    return React.createElement(React.Fragment, null,
        // ─── Botón flotante ───
        React.createElement('button', {
            onClick: handleToggleChat,
            style: btnStyle,
            title: 'Tutor AI'
        }, showFloatingChat ? '✕' : '🤖'),
        
        // ─── Panel flotante ───
        showFloatingChat && React.createElement('div', { style: panelStyle },
            // Header
            React.createElement('div', {
                style: headerStyle,
                onClick: function() { setChatMinimized(!chatMinimized); }
            },
                React.createElement('span', null, '🤖 Tutor AI'),
                React.createElement('span', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                    // Botón de ajustes
                    React.createElement('span', {
                        onClick: function(e) { e.stopPropagation(); setShowSettings(!showSettings); setShowHistoryStats(false); },
                        style: { fontSize: '0.85rem', cursor: 'pointer', opacity: showSettings ? 1 : 0.7 }
                    }, '⚙️'),
                    // Botón de estadísticas históricas
                    React.createElement('span', {
                        onClick: function(e) { e.stopPropagation(); setShowHistoryStats(!showHistoryStats); setShowSettings(false); },
                        style: { fontSize: '0.85rem', cursor: 'pointer', opacity: showHistoryStats ? 1 : 0.7 }
                    }, '📊'),
                    // Token counter badge
                    React.createElement('span', {
                        onClick: function(e) { e.stopPropagation(); },
                        style: { fontSize: '0.7rem', opacity: 0.8, cursor: 'default' }
                    },
                        tokenStats.session.totalTokens > 0 
                            ? (tokenStats.session.totalTokens > 1000 
                                ? Math.round(tokenStats.session.totalTokens / 1000) + 'K' 
                                : tokenStats.session.totalTokens) + ' tokens'
                            : ''
                    ),
                    React.createElement('span', null, chatMinimized ? '▲' : '▼')
                )
            ),
            
            // ─── Panel de ajustes (controldes: longitud, temperatura) ───
            showSettings && !chatMinimized && !showHistoryStats && React.createElement('div', { style: settingsPanelStyle },
                // Longitud máxima
                React.createElement('div', { style: { marginBottom: 10 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: 4 } },
                        React.createElement('span', null, '📏 Longitud máxima'),
                        React.createElement('span', null, maxTokens + ' tokens')
                    ),
                    React.createElement('input', {
                        type: 'range',
                        min: 50,
                        max: 800,
                        step: 50,
                        value: maxTokens,
                        onChange: function(e) { setMaxTokens(parseInt(e.target.value)); },
                        style: { width: '100%', accentColor: '#0ea5e9' }
                    }),
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748b' } },
                        React.createElement('span', null, 'Corto'),
                        React.createElement('span', null, 'Largo')
                    )
                ),
                // Temperatura
                React.createElement('div', { style: { marginBottom: 10 } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: 4 } },
                        React.createElement('span', null, '🌡️ Creatividad'),
                        React.createElement('span', null, temperature.toFixed(1))
                    ),
                    React.createElement('input', {
                        type: 'range',
                        min: 0.1,
                        max: 1.5,
                        step: 0.1,
                        value: temperature,
                        onChange: function(e) { setTemperature(parseFloat(e.target.value)); },
                        style: { width: '100%', accentColor: '#0ea5e9' }
                    }),
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748b' } },
                        React.createElement('span', null, 'Literal'),
                        React.createElement('span', null, 'Creativo')
                    )
                ),
                // Stats de sesión actual (rápida)
                React.createElement('div', { style: sectionLabelStyle }, '⚡ Sesión actual'),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '📊 Tokens:'),
                    React.createElement('span', { style: { fontWeight: 600, color: '#e2e8f0' } }, tokenStats.session.totalTokens.toLocaleString())
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '💵 Costo:'),
                    React.createElement('span', null, '$' + tokenStats.session.cost.toFixed(5))
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '🔄 Mensajes:'),
                    React.createElement('span', null, tokenStats.session.messages)
                ),
                tokenStats.session.totalTokens > 0 && React.createElement('button', {
                    onClick: function() { window.Muller.FloatingAiChat.TokenTracker.resetSession(); },
                    style: {
                        marginTop: 8,
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #475569',
                        background: 'transparent',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        width: '100%'
                    }
                }, '🔄 Resetear sesión')
            ),
            
            // ─── Panel de estadísticas históricas (día/semana/mes/todo) ───
            showHistoryStats && !chatMinimized && !showSettings && React.createElement('div', { style: settingsPanelStyle },
                React.createElement('div', { style: { fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 8 } }, '📊 Historial de tokens'),
                
                // Hoy
                renderStatsBlock('📅 Hoy (' + formatDate(Date.now()) + ')', tokenStats.today, false),
                // Esta semana
                renderStatsBlock('📅 Esta semana', tokenStats.week, false),
                // Este mes
                renderStatsBlock('📅 Este mes', tokenStats.month, false),
                // Todo el histórico
                renderStatsBlock('📅 Total histórico', tokenStats.all, true)
            ),
            
            // ─── Chat ───
            !chatMinimized && !showSettings && !showHistoryStats && React.createElement('div', { key: chatKey, style: { overflowY: 'auto', flex: 1 } },
                React.createElement(window.Muller.DeepSeek && window.Muller.DeepSeek.ChatWidget ? window.Muller.DeepSeek.ChatWidget : 'div', { 
                    initialMinimized: false,
                    temperature: temperature,
                    maxTokens: maxTokens
                },
                    !window.Muller.DeepSeek && React.createElement('div', { style: { color: '#f87171', fontSize: '0.85rem', padding: 16, textAlign: 'center' } }, 'Módulo DeepSeek no disponible')
                )
            )
        )
    );
};

// NOTA: El montaje global se realiza desde app.jsx con un createRoot propio.
// Así el chat flotante es independiente del árbol de App (splash, login, cualquier pestaña).