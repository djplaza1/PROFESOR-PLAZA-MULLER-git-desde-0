// ═══════════════════════════════════════════════════
// DeepSeek AI Integration – Profesor Plaza Müller
// ═══════════════════════════════════════════════════
// Proporciona explicaciones, tips y asistencia IA
// usando la API de DeepSeek (modelo deepseek-chat)
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.DeepSeek = window.Muller.DeepSeek || {};

// ─── Config ───
window.Muller.DeepSeek.API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';
window.Muller.DeepSeek.MODEL = 'deepseek-chat';
window.Muller.DeepSeek.API_KEY_KEY = 'muller_deepseek_api_key_v1';

// ─── Get/Set API Key ───
window.Muller.DeepSeek.getApiKey = function() {
    return localStorage.getItem(window.Muller.DeepSeek.API_KEY_KEY) || '';
};

window.Muller.DeepSeek.setApiKey = function(k) {
    localStorage.setItem(window.Muller.DeepSeek.API_KEY_KEY, k);
    window.dispatchEvent(new CustomEvent('deepseekKeyChanged', { detail: { key: k } }));
};

window.Muller.DeepSeek.hasApiKey = function() {
    var k = window.Muller.DeepSeek.getApiKey();
    return k && k.length > 10;
};

// ─── Chat Completion ───
window.Muller.DeepSeek.chat = async function(messages, options) {
    options = options || {};
    var apiKey = window.Muller.DeepSeek.getApiKey();
    if (!apiKey || apiKey.length < 10) {
        throw new Error('❌ No hay clave API de DeepSeek configurada.');
    }
var body = {
    model: options.model || window.Muller.DeepSeek.MODEL,
    messages: messages,
    temperature: options.temperature != null ? options.temperature : 0.7,
    max_tokens: options.maxTokens || 600,
    stream: false
};
if (options.topP != null) body.top_p = options.topP;

try {
    var resp = await fetch(window.Muller.DeepSeek.API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(body)
    });
    if (!resp.ok) {
        var errText = await resp.text();
        throw new Error('DeepSeek API error ' + resp.status + ': ' + errText);
    }
    var json = await resp.json();
    if (!json.choices || json.choices.length === 0) {
        throw new Error('Respuesta vacía de DeepSeek');
    }
    // Track token usage
    var usage = json.usage || {};
    var inputTokens = usage.prompt_tokens || 0;
    var outputTokens = usage.completion_tokens || 0;
    if (inputTokens > 0 || outputTokens > 0) {
        var tracker = window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.TokenTracker;
        if (tracker) tracker.addUsage(inputTokens, outputTokens);
    }
    return {
        content: json.choices[0].message.content,
        usage: { input: inputTokens, output: outputTokens }
    };
} catch (err) {
    console.error('[DeepSeek] Error:', err);
    throw err;
}
};

// ─── Explicación de error ───
window.Muller.DeepSeek.explainError = async function(question, userAnswer, correctAnswer, context) {
    var systemPrompt = 'Eres un tutor de alemán experto en TELC. Explica de forma breve y clara por qué la respuesta es incorrecta, da una pista para recordarlo y un ejemplo corto. Responde en español. Máximo 4 frases.';
    var userMsg = 'Pregunta: "' + question + '"\nRespuesta del estudiante: "' + userAnswer + '"\nRespuesta correcta: "' + correctAnswer + '"';
    if (context) userMsg += '\nContexto adicional: ' + context;
    
    try {
        var result = await window.Muller.DeepSeek.chat([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
        ], { maxTokens: 300 });
        return result.content || result;
    } catch (e) {
        return '❌ ' + e.message;
    }
};

// ─── Generar ejercicio relacionado ───
window.Muller.DeepSeek.generateRelatedExercise = async function(topic, level) {
    var systemPrompt = 'Eres un profesor de alemán. Genera un ejercicio corto (máximo 3 frases) relacionado con el tema indicado para nivel ' + (level || 'B1') + '. Incluye la respuesta correcta entre paréntesis al final. Usa formato: [Ejercicio] → (Respuesta)';
    
    try {
        var result = await window.Muller.DeepSeek.chat([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Tema: ' + topic }
        ], { maxTokens: 200 });
        return result && (result.content || result);
    } catch (e) {
        return null;
    }
};

// ─── Explicación de gramática ───
window.Muller.DeepSeek.grammarExplanation = async function(topic, userLevel) {
    var systemPrompt = 'Eres un profesor de alemán especializado en TELC. Explica de forma clara y concisa el tema de gramática indicado, adaptado al nivel ' + (userLevel || 'B1') + '. Incluye 1 o 2 ejemplos. Responde en español. Máximo 6 frases.';
    
    try {
        var result = await window.Muller.DeepSeek.chat([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Explica: ' + topic }
        ], { maxTokens: 400 });
        return result && (result.content || result);
    } catch (e) {
        return null;
    }
};

// ─── Chat libre con IA ───
window.Muller.DeepSeek.freeChat = async function(userMessage, history, options) {
    options = options || {};
    var systemPrompt = 'Eres un tutor de alemán llamado "Profesor Plaza Müller AI". Ayudas a estudiantes de alemán (niveles A1-C1). Respondes siempre en español, de forma amable, didáctica y práctica. Ofreces ejemplos, trucos mnemotécnicos y consejos para el examen TELC.';
    var messages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) {
        for (var i = Math.max(0, history.length - 6); i < history.length; i++) {
            messages.push(history[i]);
        }
    }
    messages.push({ role: 'user', content: userMessage });
    
    try {
        var result = await window.Muller.DeepSeek.chat(messages, { 
            maxTokens: 800,
            temperature: options.temperature != null ? options.temperature : 0.7
        });
        return result.content || result;
    } catch (e) {
        return '❌ ' + e.message;
    }
};

// ─── Componente de configuración de API Key ───
window.Muller.DeepSeek.ApiKeySetup = function() {
    var [key, setKey] = React.useState(window.Muller.DeepSeek.getApiKey());
    var [show, setShow] = React.useState(false);
    var [saved, setSaved] = React.useState(false);
    
    var handleSave = function() {
        if (key && key.length > 10) {
            window.Muller.DeepSeek.setApiKey(key);
            setSaved(true);
            setTimeout(function() { setSaved(false); }, 2000);
        }
    };
    
    var handleClear = function() {
        window.Muller.DeepSeek.setApiKey('');
        setKey('');
    };
    
    return React.createElement('div', {
        style: {
            background: '#1e293b',
            borderRadius: 16,
            padding: 20,
            border: '1px solid #334155',
            maxWidth: 500
        }
    },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } },
            React.createElement('span', { style: { fontSize: 20 } }, '🤖'),
            React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem' } }, 'DeepSeek AI'),
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#94a3b8' } }, window.Muller.DeepSeek.hasApiKey() ? '✅ Conectado' : '🔑 Necesita API Key')
            )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
            React.createElement('input', {
                type: show ? 'text' : 'password',
                value: key,
                onChange: function(e) { setKey(e.target.value); setSaved(false); },
                placeholder: 'sk-...',
                style: {
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none'
                }
            }),
            React.createElement('button', {
                onClick: function() { setShow(!show); },
                style: {
                    background: '#334155',
                    color: '#e2e8f0',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                }
            }, show ? '🙈' : '👁️'),
            React.createElement('button', {
                onClick: handleSave,
                style: {
                    background: saved ? '#10b981' : '#06b6d4',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 16px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                }
            }, saved ? '✅ Guardada' : 'Guardar'),
            React.createElement('button', {
                onClick: handleClear,
                style: {
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                }
            }, '🗑️')
        ),
        React.createElement('div', { style: { marginTop: 10, fontSize: '0.75rem', color: '#64748b' } },
            'Conseguir API Key: ',
            React.createElement('a', {
                href: 'https://platform.deepseek.com/api_keys',
                target: '_blank',
                style: { color: '#06b6d4', textDecoration: 'underline' }
            }, 'platform.deepseek.com')
        )
    );
};

// ─── Chat Widget Component ───
// Acepta props: { initialMinimized: false, temperature: 0.7 }
window.Muller.DeepSeek.ChatWidget = function(props) {
    props = props || {};
    var [messages, setMessages] = React.useState([]);
    var [input, setInput] = React.useState('');
    var [loading, setLoading] = React.useState(false);
    var [minimized, setMinimized] = React.useState(props.initialMinimized === false ? false : true);
    
    var handleSend = async function() {
        if (!input.trim() || loading) return;
        if (!window.Muller.DeepSeek.hasApiKey()) {
            alert('🔑 Debes configurar tu API Key de DeepSeek primero.');
            return;
        }
        var userMsg = { role: 'user', content: input.trim() };
        var newMsgs = messages.concat([userMsg]);
        setMessages(newMsgs);
        setInput('');
        setLoading(true);
        try {
            var reply = await window.Muller.DeepSeek.freeChat(input.trim(), messages, {
                temperature: props.temperature != null ? props.temperature : 0.7
            });
            setMessages(newMsgs.concat([{ role: 'assistant', content: reply }]));
        } catch(e) {
            setMessages(newMsgs.concat([{ role: 'assistant', content: '❌ Error: ' + e.message }]));
        }
        setLoading(false);
    };
    
    var style = {
        container: {
            background: '#1e293b',
            borderRadius: 16,
            border: '1px solid #334155',
            overflow: 'hidden',
            maxWidth: 400
        },
        header: {
            padding: '12px 16px',
            background: '#0ea5e9',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem'
        },
        body: minimized ? { display: 'none' } : {
            padding: 12,
            maxHeight: 300,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        footer: minimized ? { display: 'none' } : {
            padding: '8px 12px',
            borderTop: '1px solid #334155',
            display: 'flex',
            gap: 8
        },
        input: {
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: '0.85rem',
            outline: 'none'
        },
        userBubble: {
            background: '#0369a1',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '12px 12px 4px 12px',
            alignSelf: 'flex-end',
            fontSize: '0.85rem',
            maxWidth: '85%'
        },
        aiBubble: {
            background: '#1e3a5f',
            color: '#e2e8f0',
            padding: '8px 12px',
            borderRadius: '12px 12px 12px 4px',
            alignSelf: 'flex-start',
            fontSize: '0.85rem',
            maxWidth: '85%'
        }
    };
    
    return React.createElement('div', { style: style.container },
        React.createElement('div', { style: style.header, onClick: function() { setMinimized(!minimized); } },
            React.createElement('span', null, '🤖 Tutor AI'),
            React.createElement('span', null, minimized ? '▼' : '▲')
        ),
        React.createElement('div', { style: style.body },
            messages.length === 0 && React.createElement('div', {
                style: { color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: 16 }
            }, 'Pregúntame cualquier cosa sobre alemán o TELC...'),
            messages.map(function(msg, i) {
                return React.createElement('div', {
                    key: i,
                    style: msg.role === 'user' ? style.userBubble : style.aiBubble
                }, msg.content);
            }),
            loading && React.createElement('div', {
                style: { color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: 4 }
            }, '🤔 Pensando...')
        ),
        React.createElement('div', { style: style.footer },
            React.createElement('input', {
                value: input,
                onChange: function(e) { setInput(e.target.value); },
                onKeyDown: function(e) { if (e.key === 'Enter') handleSend(); },
                placeholder: 'Escribe tu pregunta...',
                style: style.input
            }),
            React.createElement('button', {
                onClick: handleSend,
                disabled: loading || !input.trim(),
                style: {
                    padding: '8px 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: loading ? '#475569' : '#06b6d4',
                    color: 'white',
                    fontWeight: 600,
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '0.85rem'
                }
            }, loading ? '...' : 'Enviar')
        )
    );
};