// ═══════════════════════════════════════════════════
// Floating AI Chat Global – Profesor Plaza Müller
// Botón flotante visible SIEMPRE, con su propio createRoot
// (independiente de splash, sesión o pestaña activa)
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.FloatingAiChat = window.Muller.FloatingAiChat || {};

// ─── Token Tracker (singleton) ───
// Almacena el histórico de tokens usados en sesión
(function() {
    var _totalInputTokens = 0;
    var _totalOutputTokens = 0;
    var _totalCost = 0;
    var _sessionMessages = 0;
    var _listeners = [];

    function _notify() {
        _listeners.forEach(function(fn) { fn(); });
    }

    window.Muller.FloatingAiChat.TokenTracker = {
        getStats: function() {
            return {
                inputTokens: _totalInputTokens,
                outputTokens: _totalOutputTokens,
                totalTokens: _totalInputTokens + _totalOutputTokens,
                cost: _totalCost,
                messages: _sessionMessages
            };
        },
        addUsage: function(inputTokens, outputTokens) {
            _totalInputTokens += inputTokens || 0;
            _totalOutputTokens += outputTokens || 0;
            _sessionMessages++;
            // Costo estimado: DeepSeek chat ~$0.14/M input tokens, ~$0.28/M output tokens (precios de referencia)
            _totalCost += ((inputTokens || 0) * 0.00000014) + ((outputTokens || 0) * 0.00000028);
            _notify();
        },
        reset: function() {
            _totalInputTokens = 0;
            _totalOutputTokens = 0;
            _totalCost = 0;
            _sessionMessages = 0;
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
    
    // Temperatura por defecto
    var _e = React.useState(0.1);
    var temperature = _e[0];
    var setTemperature = _e[1];
    
    // Max tokens (longitud máxima de respuesta)
    var _f = React.useState(200);
    var maxTokens = _f[0];
    var setMaxTokens = _f[1];
    
    // Token stats
    var _g = React.useState(window.Muller.FloatingAiChat.TokenTracker.getStats());
    var tokenStats = _g[0];
    var setTokenStats = _g[1];
    
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
    };
    
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
        maxWidth: 400,
        width: '90vw',
        background: '#1e293b',
        borderRadius: 16,
        border: '1px solid #334155',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden'
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
        background: '#0f172a'
    };
    
    var tokenDisplayStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
        fontSize: '0.75rem',
        color: '#94a3b8'
    };
    
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
                    // Botón de ajustes / temperatura
                    React.createElement('span', {
                        onClick: function(e) { e.stopPropagation(); setShowSettings(!showSettings); },
                        style: { fontSize: '0.85rem', cursor: 'pointer', opacity: showSettings ? 1 : 0.7 }
                    }, '⚙️'),
                    // Token counter badge
                    React.createElement('span', {
                        onClick: function(e) { e.stopPropagation(); },
                        style: { fontSize: '0.7rem', opacity: 0.8, cursor: 'default' }
                    },
                        tokenStats.totalTokens > 0 
                            ? (tokenStats.totalTokens > 1000 
                                ? Math.round(tokenStats.totalTokens / 1000) + 'K' 
                                : tokenStats.totalTokens) + ' tokens'
                            : ''
                    ),
                    React.createElement('span', null, chatMinimized ? '▲' : '▼')
                )
            ),
            
            // ─── Panel de ajustes (longitud, temperatura, tokens) ───
            showSettings && !chatMinimized && React.createElement('div', { style: settingsPanelStyle },
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
                // Estadísticas de tokens
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '📊 Tokens usados (sesión):'),
                    React.createElement('span', { style: { fontWeight: 600, color: '#e2e8f0' } }, tokenStats.totalTokens.toLocaleString())
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '📝 Input:'),
                    React.createElement('span', null, tokenStats.inputTokens.toLocaleString())
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '💬 Output:'),
                    React.createElement('span', null, tokenStats.outputTokens.toLocaleString())
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '💵 Costo estimado:'),
                    React.createElement('span', null, '$' + tokenStats.cost.toFixed(5))
                ),
                React.createElement('div', { style: tokenDisplayStyle },
                    React.createElement('span', null, '🔄 Mensajes:'),
                    React.createElement('span', null, tokenStats.messages)
                ),
                tokenStats.totalTokens > 0 && React.createElement('button', {
                    onClick: function() { window.Muller.FloatingAiChat.TokenTracker.reset(); },
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
                }, '🔄 Resetear contadores')
            ),
            
            // ─── Chat ───
            !chatMinimized && React.createElement('div', { key: chatKey },
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
