// src/features/maestros/MaestroIA.jsx
// Componente de chat integrado con la IA de Maestros
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels['maestroIA'] = ({ session, onVolver }) => {
  const { useState, useRef, useEffect } = React;

  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 ¡Hola! Soy tu **Maestro IA**. Pregúntame cualquier duda sobre alemán: gramática, vocabulario, pronunciación o ejercicios. ¿En qué te ayudo hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modo, setModo] = useState('general'); // general | gramatica | vocabulario | conversacion
  const [sugerenciasActivas, setSugerenciasActivas] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sugerencias rápidas
  const SUGERENCIAS = {
    general: [
      '¿Cuál es la diferencia entre "weil" y "da"?',
      'Explícame el Perfekt con ejemplos',
      '¿Cómo se usa el Prepositions mixtas?',
      'Dame 5 verbos separables comunes'
    ],
    gramatica: [
      '¿Cómo funciona el Genitiv?',
      'Explica los verbos modales',
      'Diferencia entre Präteritum y Perfekt',
      'Reglas del orden de palabras'
    ],
    vocabulario: [
      '10 palabras básicas de comida',
      'Vocabulario de la oficina',
      'Frases para pedir direcciones',
      'Verbosen mit Präpositionen'
    ],
    conversacion: [
      'Háblame en alemán básico',
      'Simula un diálogo en un restaurante',
      'Preguntas frecuentes en entrevista',
      'Frases para viajar'
    ]
  };

  const enviarMensaje = async (texto) => {
    if (!texto.trim() || cargando) return;
    const mensajeUsuario = texto.trim();
    setInput('');
    setCargando(true);
    setMessages(prev => [...prev, { role: 'user', content: mensajeUsuario }]);

    // Contexto del sistema para el Maestro IA
    const systemPrompt = modo === 'gramatica'
      ? 'Eres un profesor de gramática alemana experto. Responde con explicaciones claras, ejemplos y tablas cuando sea útil. Usa un tono didáctico pero amigable. Responde SIEMPRE en español.'
      : modo === 'vocabulario'
        ? 'Eres un profesor de vocabulario alemán. Proporciona listas temáticas, frases de ejemplo y trucos mnemotécnicos. Responde SIEMPRE en español.'
        : modo === 'conversacion'
          ? 'Eres un compañero de conversación en alemán. Habla principalmente en alemán (nivel ajustado al usuario) pero explica en español si es necesario. Corrige errores suavemente.'
          : 'Eres un profesor de alemán completo y experto (DaF). Explicas gramática, vocabulario, pronunciación y cultura. Tus respuestas son claras, estructuradas y con ejemplos prácticos. Responde SIEMPRE en español.';

    try {
      var response = await window.Muller.FloatingAiChat?.sendSystemMessage(systemPrompt + '\n\n' + mensajeUsuario);
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } else {
        // Fallback: intentar con la API de DeepSeek
        var apiKey = window.Muller.DeepSeek?.getApiKey();
        if (apiKey) {
          var reply = await window.Muller.DeepSeek.generate({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: mensajeUsuario }
            ],
            tutorMode: true,
            maxTokens: 500
          });
          setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ No hay una API de IA configurada. Puedes configurar tu clave de DeepSeek en Ajustes > IA, o usar el chat flotante de IA si está disponible.' }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error al conectar con la IA: ' + (err.message || 'desconocido') }]);
    }
    setCargando(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje(input);
    }
  };

  const sugerencias = SUGERENCIAS[modo] || SUGERENCIAS.general;

  return (
    <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
      {/* Cabecera */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-500/20 bg-indigo-950/30">
        <div className="flex items-center gap-3">
          <button onClick={onVolver} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-black text-indigo-200">🤖 Maestro IA</h2>
            <p className="text-[10px] text-indigo-300/70">Tu tutor virtual de alemán</p>
          </div>
        </div>

        {/* Selector de modo */}
        <div className="flex gap-1 bg-black/30 rounded-lg p-1">
          {[
            { id: 'general', label: 'General', icon: '🧠' },
            { id: 'gramatica', label: 'Gramática', icon: '📘' },
            { id: 'vocabulario', label: 'Vocab.', icon: '📝' },
            { id: 'conversacion', label: 'Convers.', icon: '💬' }
          ].map(m => (
            <button key={m.id}
              onClick={() => setModo(m.id)}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                modo === m.id
                  ? 'bg-indigo-600/40 text-indigo-200 shadow'
                  : 'text-gray-500 hover:text-gray-300'
              }`}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-600/30 border border-indigo-500/30 text-indigo-100'
                : 'bg-gray-800/50 border border-gray-700/30 text-gray-200'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none [&_p]:text-gray-200 [&_strong]:text-gray-100 [&_ul]:text-gray-200 [&_code]:text-indigo-300 [&_table]:text-gray-200 [&_th]:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Indicador de carga */}
        {cargando && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sugerencias rápidas */}
      {sugerenciasActivas && messages.length <= 2 && !cargando && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-gray-500 mb-2">Sugerencias de preguntas:</p>
          <div className="flex flex-wrap gap-1.5">
            {sugerencias.map((sug, i) => (
              <button key={i}
                onClick={() => enviarMensaje(sug)}
                className="px-2.5 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-[10px] text-indigo-300 hover:bg-indigo-800/40 transition-colors">
                {sug}
              </button>
            ))}
          </div>
          <button onClick={() => setSugerenciasActivas(false)}
            className="text-[9px] text-gray-600 hover:text-gray-400 mt-1.5">
            Ocultar sugerencias
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-indigo-500/20 p-4 bg-indigo-950/20">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta sobre alemán..."
            rows={2}
            className="flex-1 bg-black/40 border border-indigo-500/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-400 transition-colors resize-none placeholder-gray-500"
          />
          <button
            onClick={() => enviarMensaje(input)}
            disabled={!input.trim() || cargando}
            className="px-4 py-2.5 rounded-xl bg-indigo-600/40 border border-indigo-500/40 text-indigo-200 font-bold text-sm hover:bg-indigo-600/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all h-fit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};