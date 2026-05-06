// ═══════════════════════════════════════════════════
// DeepSeek AI Integration – Profesor Plaza Müller
// ═══════════════════════════════════════════════════

window.Muller = window.Muller || {};
window.Muller.DeepSeek = window.Muller.DeepSeek || {};

// ─── API Key management ───
var STORAGE_KEY = 'muller_deepseek_apikey';

window.Muller.DeepSeek.hasApiKey = function() {
    return !!localStorage.getItem(STORAGE_KEY);
};

window.Muller.DeepSeek.getApiKey = function() {
    return localStorage.getItem(STORAGE_KEY) || '';
};

window.Muller.DeepSeek.setApiKey = function(key) {
    if (key) {
        localStorage.setItem(STORAGE_KEY, key);
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
};

// ─── Free chat (single call) ───
// messages: array de { role: 'user' | 'assistant', content: string }
// opts: { temperature?: number, maxTokens?: number }
// Returns: string (respuesta del assistant)
window.Muller.DeepSeek.freeChat = async function(userMessage, history, opts) {
    opts = opts || {};
    var apiKey = window.Muller.DeepSeek.getApiKey();
    if (!apiKey) throw new Error('No API Key configured');

    // Elegir system prompt según modo
    var systemPrompt;
    if (opts.tutorMode) {
        systemPrompt = 'Eres el profesor Plaza Müller, un tutor nativo alemán que evalúa a estudiantes hispanohablantes. AHORA ESTÁS EN MODO TUTOR. El estudiante escribirá frases en ALEMÁN. Tu trabajo es: 1) Evaluar si la frase es correcta gramaticalmente. 2) Si tiene errores, corregirlos y explicar por qué está mal (en español). 3) Si está perfecta, felicitar al estudiante. 4) Dar una nota: A (perfecto), B (pequeños errores), C (varios errores), D (muy mal). 5) Ser conciso: máximo 4-5 frases. 6) Mantén tono cercano pero profesional. 7) Responde SIEMPRE en español excepto los ejemplos correctos en alemán. IMPORTANTE: Si el estudiante escribe en español, recuérdale amablemente que debe escribir en alemán para ser evaluado.';
    } else {
        systemPrompt = 'Eres el profesor Plaza Müller, un tutor nativo alemán paciente y motivador que enseña alemán a hispanohablantes. Responde SIEMPRE en español. Tus instrucciones son: 1) Explica conceptos de alemán de forma clara y práctica. 2) Pon ejemplos reales de uso cotidiano. 3) Corrige errores con amabilidad. 4) Da consejos para el examen TELC. 5) Sé conciso: máximo 4-5 frases, nada de rollo. 6) Si preguntan por gramática, estructura la explicación paso a paso. 7) Mantén un tono cercano pero profesional, como un profe particular.';
    }

    // Construir mensajes: system prompt + historial + mensaje actual
    var messages = [
        {
            role: 'system',
            content: systemPrompt
        }
    ];

    // Añadir historial
    if (history && history.length > 0) {
        // Filtrar solo los últimos 10 mensajes para no exceder el contexto
        var recentHistory = history.slice(-10);
        messages = messages.concat(recentHistory.map(function(m) {
            return { role: m.role, content: m.content };
        }));
    }

    // Añadir mensaje actual
    messages.push({ role: 'user', content: userMessage });

    try {
        var response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: opts.temperature != null ? opts.temperature : (opts.tutorMode ? 0.3 : 0.1),
                max_tokens: opts.maxTokens != null ? opts.maxTokens : 200,
                stream: false
            })
        });

        if (!response.ok) {
            var errorData;
            try { errorData = await response.json(); } catch(e) { errorData = {}; }
            throw new Error(errorData.error && errorData.error.message ? errorData.error.message : 'HTTP ' + response.status);
        }

        var data = await response.json();
        var reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';

        // ─── Trackear tokens ───
        if (data.usage && window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.TokenTracker) {
            window.Muller.FloatingAiChat.TokenTracker.addUsage(
                data.usage.prompt_tokens || 0,
                data.usage.completion_tokens || 0
            );
        }

        return reply;
    } catch (err) {
        throw err;
    }
};

// ─── API Key Panel ───
window.Muller.DeepSeek.ApiKeyPanel = function() {
    var [key, setKey] = React.useState(window.Muller.DeepSeek.getApiKey());
    var [showKey, setShowKey] = React.useState(false);
    var [saved, setSaved] = React.useState(false);

    var handleSave = function() {
        window.Muller.DeepSeek.setApiKey(key.trim());
        setSaved(true);
        setTimeout(function() { setSaved(false); }, 2000);
    };

    var handleClear = function() {
        window.Muller.DeepSeek.setApiKey('');
        setKey('');
        setSaved(false);
    };

    return React.createElement('div', { style: { padding: 16, background: '#0f172a', borderRadius: 12, border: '1px solid #334155' } },
        React.createElement('div', { style: { fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 12 } }, '🔑 API Key de DeepSeek'),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8 } },
            React.createElement('input', {
                type: showKey ? 'text' : 'password',
                value: key,
                onChange: function(e) { setKey(e.target.value); },
                placeholder: 'sk-...',
                style: {
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #334155',
                    background: '#1e293b',
                    color: '#e2e8f0',
                    fontSize: '0.85rem',
                    outline: 'none'
                }
            }),
            React.createElement('button', {
                onClick: function() { setShowKey(!showKey); },
                style: {
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #475569',
                    background: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                }
            }, showKey ? '🙈' : '👁️')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', {
                onClick: handleSave,
                style: {
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: saved ? '#16a34a' : '#06b6d4',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                }
            }, saved ? '✅ Guardada' : '💾 Guardar'),
            key ? React.createElement('button', {
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
            }, '🗑️') : null
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

// ─── Función auxiliar: leer texto en voz alta ───
// Detecta si el texto parece alemán o español y usa la voz adecuada
function speakText(text, callback) {
    if (!window.speechSynthesis) {
        if (callback) callback();
        return;
    }

    // Cancelar cualquier voz anterior
    window.speechSynthesis.cancel();

    // Detectar idioma: si contiene palabras alemanas comunes (der, die, das, ich, du, etc.) asumir alemán
    var esAleman = /\b(der|die|das|ich|du|sie|wir|ihr|und|oder|aber|nicht|kein|eine|ein|ist|sind|hat|hast|haben|wird|wirst|werden|kann|kannst|können|muss|musst|müssen|soll|sollst|sollen|darf|darfst|dürfen|mit|von|aus|nach|bei|seit|zu|um|für|durch|gegen|ohne|bis|zum|zur|deutsch|Deutsch|Deutschland)\b/i.test(text);
    
    var utterance = new SpeechSynthesisUtterance(text);
    
    // Configurar idioma y voz
    if (esAleman) {
        utterance.lang = 'de-DE';
        utterance.rate = 0.85; // Un poco más lento para aprender
        utterance.pitch = 1.0;
    } else {
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
    }

    // Intentar encontrar una voz nativa adecuada
    var voicelist = window.speechSynthesis.getVoices();
    if (voicelist.length > 0) {
        if (esAleman) {
            // Buscar voz alemana nativa
            var deVoz = voicelist.find(function(v) { return v.lang.startsWith('de') && v.localService; })
                     || voicelist.find(function(v) { return v.lang.startsWith('de'); });
            if (deVoz) utterance.voice = deVoz;
        } else {
            // Buscar voz española de España
            var esVoz = voicelist.find(function(v) { return v.lang === 'es-ES' && v.localService; })
                     || voicelist.find(function(v) { return v.lang.startsWith('es'); });
            if (esVoz) utterance.voice = esVoz;
        }
    }

    if (callback) {
        utterance.onend = callback;
    }

    window.speechSynthesis.speak(utterance);
}

// ─── Chat Widget Component ───
// Acepta props: { initialMinimized: false, temperature: 0.7, maxTokens: 200 }
window.Muller.DeepSeek.ChatWidget = function(props) {
    props = props || {};
    var [messages, setMessages] = React.useState([]);
    var [input, setInput] = React.useState('');
    var [loading, setLoading] = React.useState(false);
    var [minimized, setMinimized] = React.useState(props.initialMinimized === false ? false : true);
    var [tutorMode, setTutorMode] = React.useState(props.initialTutorMode || false);
    var [listening, setListening] = React.useState(false);
    var [recognitionLang, setRecognitionLang] = React.useState('auto'); // 'auto', 'de-DE', 'es-ES'
    var [speakingIndex, setSpeakingIndex] = React.useState(-1); // índice del mensaje que se está leyendo
    
    // ─── Reconocimiento de voz ───
    var recognitionRef = React.useRef(null);
    
    var startListening = function() {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('🎤 Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.');
            return;
        }
        
        if (listening) {
            // Ya está escuchando, detener
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setListening(false);
            return;
        }
        
        var recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        // Configurar idioma según selección
        if (recognitionLang === 'de-DE') {
            recognition.lang = 'de-DE';
        } else if (recognitionLang === 'es-ES') {
            recognition.lang = 'es-ES';
        } else {
            // 'auto' - intentar con español (la API de Chrome detecta automáticamente)
            recognition.lang = 'es-ES'; // fallback, pero Chrome detecta si hablas alemán igual
        }
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onstart = function() {
            setListening(true);
        };
        
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            // Añadir el texto transcrito al input
            setInput(function(prev) {
                return prev ? prev + ' ' + transcript : transcript;
            });
            setListening(false);
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
            setListening(false);
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
                alert('🎤 Error de reconocimiento: ' + event.error);
            }
        };
        
        recognition.onend = function() {
            setListening(false);
        };
        
        recognition.start();
    };
    
    // Cargar voces disponibles al montar el componente
    React.useEffect(function() {
        if (window.speechSynthesis) {
            // Forzar carga de voces
            window.speechSynthesis.getVoices();
        }
    }, []);
    
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
                temperature: props.temperature != null ? props.temperature : 0.7,
                maxTokens: props.maxTokens != null ? props.maxTokens : 200,
                tutorMode: tutorMode
            });
            setMessages(newMsgs.concat([{ role: 'assistant', content: reply }]));
        } catch(e) {
            setMessages(newMsgs.concat([{ role: 'assistant', content: '❌ Error: ' + e.message }]));
        }
        setLoading(false);
    };
    
    var style = {
        wrapper: {
            // Sin wrapper extra, es un div normal que se adapta al contenedor padre
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
            gap: 6,
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        input: {
            flex: 1,
            minWidth: 120,
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
            maxWidth: '85%',
            position: 'relative'
        }
    };
    
    return React.createElement('div', { style: style.wrapper },
        React.createElement('div', { style: style.header, onClick: function() { setMinimized(!minimized); } },
        React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', null, '🤖 Tutor AI'),
            // Toggle Modo Tutor
            React.createElement('label', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: tutorMode ? '#16a34a' : '#1e293b',
                    border: '1px solid ' + (tutorMode ? '#22c55e' : '#475569'),
                    color: tutorMode ? 'white' : '#94a3b8',
                    userSelect: 'none'
                }
            },
                React.createElement('input', {
                    type: 'checkbox',
                    checked: tutorMode,
                    onChange: function(e) { setTutorMode(e.target.checked); },
                    style: { display: 'none' }
                }),
                tutorMode ? '🎯 Tutor ON' : '📝 Tutor OFF'
            )
        ),
        React.createElement('span', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
            listening && React.createElement('span', {
                style: { fontSize: '0.7rem', color: '#fbbf24', animation: 'pulse 1s infinite' }
            }, '🔴 Grabando...'),
            React.createElement('span', null, minimized ? '▼' : '▲')
        )
        ),
        React.createElement('div', { style: style.body },
            messages.length === 0 && React.createElement('div', {
                style: { color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: 16 }
            }, 'Pregúntame cualquier cosa sobre alemán o TELC...\nUsa el 🎤 para hablar en vez de escribir.'),
            messages.map(function(msg, i) {
                return React.createElement('div', {
                    key: i,
                    style: msg.role === 'user' ? style.userBubble : style.aiBubble
                },
                    msg.content,
                    // Botón de leer en voz alta solo en mensajes del assistant
                    msg.role === 'assistant' && React.createElement('button', {
                        onClick: function(e) {
                            e.stopPropagation();
                            if (speakingIndex === i) {
                                // Si ya se está leyendo este, detener
                                window.speechSynthesis.cancel();
                                setSpeakingIndex(-1);
                            } else {
                                window.speechSynthesis.cancel(); // Detener cualquier otro
                                setSpeakingIndex(i);
                                speakText(msg.content, function() {
                                    setSpeakingIndex(-1);
                                });
                            }
                        },
                        title: 'Escuchar en voz alta',
                        style: {
                            display: 'block',
                            marginTop: 6,
                            padding: '3px 8px',
                            borderRadius: 4,
                            border: '1px solid #475569',
                            background: speakingIndex === i ? '#3b82f6' : 'transparent',
                            color: speakingIndex === i ? 'white' : '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '0.7rem'
                        }
                    }, speakingIndex === i ? '⏹️ Detener' : '🔊 Escuchar')
                );
            }),
            loading && React.createElement('div', {
                style: { color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: 4 }
            }, '🤔 Pensando...')
        ),
        React.createElement('div', { style: style.footer },
            // Selector de idioma para el micrófono
            React.createElement('select', {
                value: recognitionLang,
                onChange: function(e) { setRecognitionLang(e.target.value); },
                style: {
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: '1px solid #475569',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    outline: 'none'
                }
            },
                React.createElement('option', { value: 'auto' }, '🌐 Auto'),
                React.createElement('option', { value: 'es-ES' }, '🇪🇸 Español'),
                React.createElement('option', { value: 'de-DE' }, '🇩🇪 Deutsch')
            ),
            // Botón de micrófono
            React.createElement('button', {
                onClick: startListening,
                title: listening ? 'Detener grabación' : 'Hablar por micrófono',
                style: {
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: 'none',
                    background: listening ? '#dc2626' : '#1e293b',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    border: '1px solid ' + (listening ? '#ef4444' : '#475569'),
                    animation: listening ? 'pulse 1s infinite' : 'none'
                }
            }, listening ? '🔴' : '🎤'),
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