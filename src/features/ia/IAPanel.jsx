// ═══════════════════════════════════════════════════
// src/features/ia/IAPanel.jsx
// Panel IA Principal – Con TODO lo que tiene el botón flotante:
// - ChatWidget DeepSeek (con 🎤 voz y 🔊 escuchar)
// - API Key panel
// - Ajustes: temperatura, longitud máxima
// - Token stats: sesión, hoy, semana, mes, total
// ═══════════════════════════════════════════════════

window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.IaPanel = {
  name: "ia",
  title: "IA",
  icon: "🤖",
  init() {
    // Ya no necesitamos init manual porque ahora es React puro
  }
};

// Wrapper React para PanelRouter (tab === "ia")
window.Muller.Panels.ia = function IaPanelWrapper(props) {
  // ─── Estados (con persistencia en localStorage) ───
  function _loadSettings() {
    try {
      var raw = localStorage.getItem('muller_ai_settings');
      if (raw) {
        var parsed = JSON.parse(raw);
        return { temperature: parsed.temperature != null ? parsed.temperature : 0.1, maxTokens: parsed.maxTokens != null ? parsed.maxTokens : 200 };
      }
    } catch(e) {}
    return { temperature: 0.1, maxTokens: 200 };
  }
  
  function _saveSettings(temp, tokens) {
    try {
      localStorage.setItem('muller_ai_settings', JSON.stringify({ temperature: temp, maxTokens: tokens }));
    } catch(e) {}
  }
  
  var _initial = _loadSettings();
  var _a = React.useState(_initial.temperature);
  var temperature = _a[0];
  var setTemperature = _a[1];
  
  var _b = React.useState(_initial.maxTokens);
  var maxTokens = _b[0];
  var setMaxTokens = _b[1];
  
  // Persistir cambios en localStorage
  React.useEffect(function() { _saveSettings(temperature, maxTokens); }, [temperature, maxTokens]);
  
  var _c = React.useState(true);
  var showSettings = _c[0];
  var setShowSettings = _c[1];
  
  var _d = React.useState(false);
  var showHistoryStats = _d[0];
  var setShowHistoryStats = _d[1];
  
  var _e = React.useState(false);
  var showApiKeyPanel = _e[0];
  var setShowApiKeyPanel = _e[1];
  
  // Token stats
  var _f = React.useState(
    window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.TokenTracker
      ? window.Muller.FloatingAiChat.TokenTracker.getStats()
      : { session: { totalTokens: 0, inputTokens: 0, outputTokens: 0, cost: 0, messages: 0 },
          today: { totalTokens: 0, inputTokens: 0, outputTokens: 0, cost: 0, messages: 0 },
          week: { totalTokens: 0, inputTokens: 0, outputTokens: 0, cost: 0, messages: 0 },
          month: { totalTokens: 0, inputTokens: 0, outputTokens: 0, cost: 0, messages: 0 },
          all: { totalTokens: 0, inputTokens: 0, outputTokens: 0, cost: 0, messages: 0 } }
  );
  var tokenStats = _f[0];
  var setTokenStats = _f[1];
  
  var _g = React.useState(0);
  var chatKey = _g[0];
  var setChatKey = _g[1];
  
  // Suscribirse a cambios de tokens
  React.useEffect(function() {
    if (window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.TokenTracker) {
      var unsubscribe = window.Muller.FloatingAiChat.TokenTracker.onChange(function() {
        setTokenStats(Object.assign({}, window.Muller.FloatingAiChat.TokenTracker.getStats()));
      });
      return unsubscribe;
    }
  }, []);
  
  // ─── Helpers ───
  function formatDate(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  
  function renderStatsBlock(label, data, showReset) {
    if (!data || data.totalTokens <= 0) return null;
    return React.createElement('div', { key: label, style: { marginBottom: 8 } },
      React.createElement('div', { style: { fontSize: '0.72rem', fontWeight: 600, color: '#e2e8f0', marginTop: 10, marginBottom: 4, paddingTop: 8, borderTop: '1px solid #334155' } }, label),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '📊 Total tokens:'),
        React.createElement('span', { style: { fontWeight: 600, color: '#e2e8f0' } }, data.totalTokens.toLocaleString())
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '📝 Input:'),
        React.createElement('span', null, (data.inputTokens || 0).toLocaleString())
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '💬 Output:'),
        React.createElement('span', null, (data.outputTokens || 0).toLocaleString())
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '💵 Costo:'),
        React.createElement('span', null, '$' + (data.cost || 0).toFixed(5))
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '🔄 Mensajes:'),
        React.createElement('span', null, (data.messages || 0))
      ),
      showReset && React.createElement('button', {
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
  
  // ─── Render ───
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0f172a',
      color: '#e2e8f0',
      overflow: 'hidden'
    }
  },
    // ─── Header ───
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
        color: 'white',
        fontWeight: 600,
        fontSize: '1rem',
        flexShrink: 0
      }
    },
      React.createElement('span', null, '🤖 Tutor AI — Profesor Plaza Müller'),
      React.createElement('span', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
        // Badge de tokens en sesión
        tokenStats.session.totalTokens > 0 && React.createElement('span', {
          style: {
            fontSize: '0.75rem',
            background: 'rgba(255,255,255,0.15)',
            padding: '4px 10px',
            borderRadius: 12
          }
        },
          (tokenStats.session.totalTokens > 1000
            ? Math.round(tokenStats.session.totalTokens / 1000) + 'K'
            : tokenStats.session.totalTokens) + ' tokens'
        ),
        // Botón API Key
        React.createElement('button', {
          onClick: function() { setShowApiKeyPanel(!showApiKeyPanel); setShowSettings(false); setShowHistoryStats(false); },
          style: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            opacity: showApiKeyPanel ? 1 : 0.7,
            padding: '4px'
          },
          title: 'API Key'
        }, '🔑'),
        // Botón ajustes
        React.createElement('button', {
          onClick: function() { setShowSettings(!showSettings); setShowApiKeyPanel(false); setShowHistoryStats(false); },
          style: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            opacity: showSettings ? 1 : 0.7,
            padding: '4px'
          },
          title: 'Ajustes'
        }, '⚙️'),
        // Botón estadísticas
        React.createElement('button', {
          onClick: function() { setShowHistoryStats(!showHistoryStats); setShowApiKeyPanel(false); setShowSettings(false); },
          style: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            opacity: showHistoryStats ? 1 : 0.7,
            padding: '4px'
          },
          title: 'Estadísticas'
        }, '📊')
      )
    ),
    
    // ─── Panel de API Key ───
    showApiKeyPanel && React.createElement('div', {
      style: {
        padding: 16,
        borderBottom: '1px solid #334155',
        background: '#0f172a',
        flexShrink: 0
      }
    },
      React.createElement(window.Muller.DeepSeek && window.Muller.DeepSeek.ApiKeyPanel
        ? window.Muller.DeepSeek.ApiKeyPanel
        : 'div', null,
        !window.Muller.DeepSeek && React.createElement('div', { style: { color: '#f87171' } }, 'Módulo API Key no disponible')
      )
    ),
    
    // ─── Panel de ajustes ───
    showSettings && React.createElement('div', {
      style: {
        padding: 16,
        borderBottom: '1px solid #334155',
        background: '#0f172a',
        flexShrink: 0,
        overflowY: 'auto',
        maxHeight: '40vh'
      }
    },
      // Longitud máxima
      React.createElement('div', { style: { marginBottom: 14 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 4 } },
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
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' } },
          React.createElement('span', null, 'Corto'),
          React.createElement('span', null, 'Largo')
        )
      ),
      // Temperatura
      React.createElement('div', { style: { marginBottom: 14 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 4 } },
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
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' } },
          React.createElement('span', null, 'Literal'),
          React.createElement('span', null, 'Creativo')
        )
      ),
      // Stats de sesión
      React.createElement('div', { style: { fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0', marginTop: 10, marginBottom: 4, paddingTop: 8, borderTop: '1px solid #334155' } }, '⚡ Sesión actual'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '📊 Tokens:'),
        React.createElement('span', { style: { fontWeight: 600, color: '#e2e8f0' } }, (tokenStats.session.totalTokens || 0).toLocaleString())
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '💵 Costo:'),
        React.createElement('span', null, '$' + (tokenStats.session.cost || 0).toFixed(5))
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#94a3b8' } },
        React.createElement('span', null, '🔄 Mensajes:'),
        React.createElement('span', null, (tokenStats.session.messages || 0))
      ),
      (tokenStats.session.totalTokens || 0) > 0 && React.createElement('button', {
        onClick: function() {
          if (window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.TokenTracker) {
            window.Muller.FloatingAiChat.TokenTracker.resetSession();
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
      }, '🔄 Resetear sesión')
    ),
    
    // ─── Panel de estadísticas históricas ───
    showHistoryStats && React.createElement('div', {
      style: {
        padding: 16,
        borderBottom: '1px solid #334155',
        background: '#0f172a',
        flexShrink: 0,
        overflowY: 'auto',
        maxHeight: '50vh'
      }
    },
      React.createElement('div', { style: { fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 8 } }, '📊 Historial de tokens'),
      renderStatsBlock('📅 Hoy (' + formatDate(Date.now()) + ')', tokenStats.today),
      renderStatsBlock('📅 Esta semana', tokenStats.week),
      renderStatsBlock('📅 Este mes', tokenStats.month),
      renderStatsBlock('📅 Total histórico', tokenStats.all, true)
    ),
    
    // ─── ChatWidget (DeepSeek) ───
    React.createElement('div', {
      key: chatKey,
      style: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: '#1e293b'
      }
    },
      window.Muller.DeepSeek && window.Muller.DeepSeek.ChatWidget
        ? React.createElement(window.Muller.DeepSeek.ChatWidget, {
            initialMinimized: false,
            temperature: temperature,
            maxTokens: maxTokens
          })
        : React.createElement('div', {
            style: {
              color: '#f87171',
              fontSize: '1rem',
              padding: 32,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginTop: 40
            }
          },
            React.createElement('span', { style: { fontSize: '3rem' } }, '⚠️'),
            React.createElement('div', null,
              React.createElement('p', { style: { margin: '0 0 8px 0', fontWeight: 600 } }, 'Módulo DeepSeek no disponible'),
              React.createElement('p', { style: { margin: 0, fontSize: '0.85rem', color: '#94a3b8' } }, 'Asegúrate de que deepSeekAi.jsx se haya cargado correctamente.')
            )
          )
    ),
    
    // ─── Footer info ───
    React.createElement('div', {
      style: {
        padding: '8px 16px',
        borderTop: '1px solid #334155',
        background: '#0f172a',
        fontSize: '0.7rem',
        color: '#64748b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }
    },
      React.createElement('span', null, '🎤 Usa el micrófono para hablar · 🔊 Tus respuestas se pueden leer en voz alta'),
      React.createElement('span', null, 'Ctrl+Space para abrir/cerrar chat flotante')
    )
  );
};