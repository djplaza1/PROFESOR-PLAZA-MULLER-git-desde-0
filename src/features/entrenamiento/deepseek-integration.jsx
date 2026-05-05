window.Muller = window.Muller || {};

// ==================== DEEPSEEK CONFIG ====================
window.Muller.DEEPSEEK_KEY_STORAGE = 'muller_deepseek_key';
window.Muller.DEEPSEEK_MODEL = 'deepseek-chat';

window.Muller.getDeepseekKey = function() {
    try { return localStorage.getItem(window.Muller.DEEPSEEK_KEY_STORAGE) || ''; } catch(e) { return ''; }
};

window.Muller.setDeepseekKey = function(key) {
    localStorage.setItem(window.Muller.DEEPSEEK_KEY_STORAGE, key);
};

window.Muller.hasDeepseekKey = function() {
    return window.Muller.getDeepseekKey().length > 0;
};

// ==================== DEEPSEEK API CALL ====================
window.Muller.deepseekRequest = async function(messages, options) {
    var apiKey = window.Muller.getDeepseekKey();
    if (!apiKey) {
        throw new Error('DeepSeek API key no configurada. Ve a Ajustes > IA.');
    }
    var opts = options || {};
    var maxTokens = opts.maxTokens || 512;
    var temperature = opts.temperature || 0.7;
    
    try {
        var response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: window.Muller.DEEPSEEK_MODEL,
                messages: messages,
                max_tokens: maxTokens,
                temperature: temperature
            })
        });
        
        if (!response.ok) {
            var errorText = await response.text();
            throw new Error('DeepSeek API error: ' + response.status + ' - ' + errorText);
        }
        
        var data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.warn('[Müller DeepSeek] Error:', err.message);
        throw err;
    }
};

// ==================== AI FUNCTIONS ====================

// Generar explicación de por qué un artículo es DER/DIE/DAS
window.Muller.aiExplainArticle = async function(word, article, es) {
    var prompt = 'Eres un tutor de alemán experto. Explica BREVEMENTE (máximo 2 líneas) por qué "' + word + '" es "' + article + '" en alemán. ' +
        'Da una regla mnemotécnica o patrón si existe. En español.\n' +
        'Palabra: ' + word + ' (' + es + ') - Artículo: ' + article;
    
    try {
        return await window.Muller.deepseekRequest([
            { role: 'system', content: 'Eres un tutor de alemán. Responde siempre en español. Máximo 2 líneas.' },
            { role: 'user', content: prompt }
        ], { maxTokens: 200, temperature: 0.5 });
    } catch(e) {
        return null;
    }
};

// Generar frase de ejemplo con una palabra
window.Muller.aiGenerateExample = async function(word, article, es, level) {
    var lvl = level || 'B1';
    var prompt = 'Crea una frase en alemán nivel ' + lvl + ' usando la palabra "' + article + ' ' + word + '" (' + es + '). ' +
        'La frase debe ser útil para aprender. Luego da la traducción al español.\n' +
        'Formato:\nDE: [frase en alemán]\nES: [traducción]';
    
    try {
        return await window.Muller.deepseekRequest([
            { role: 'system', content: 'Eres un tutor de alemán. Genera frases naturales y útiles.' },
            { role: 'user', content: prompt }
        ], { maxTokens: 300, temperature: 0.7 });
    } catch(e) {
        return null;
    }
};

// Explicar un verbo con preposición
window.Muller.aiExplainVerbPrep = async function(verb, prep, es, caseName) {
    var prompt = 'Explica brevemente (2 líneas) el verbo alemán con preposición: "' + verb + ' ' + prep + '" (' + es + '). ' +
        'Caso: ' + caseName + '. Da un truco para recordarlo. En español.';
    
    try {
        return await window.Muller.deepseekRequest([
            { role: 'system', content: 'Eres un tutor de alemán. Responde en español. Máximo 2 líneas.' },
            { role: 'user', content: prompt }
        ], { maxTokens: 200, temperature: 0.5 });
    } catch(e) {
        return null;
    }
};

// Explicar una preposición con caso
window.Muller.aiExplainPreposition = async function(prep, caseName, es) {
    var prompt = 'Explica brevemente (2 líneas) la preposición alemana "' + prep + '" (' + es + '). ' +
        'Caso: ' + caseName + '. Da un truco para recordar si es Acusativo, Dativo o Genitivo. En español.';
    
    try {
        return await window.Muller.deepseekRequest([
            { role: 'system', content: 'Eres un tutor de alemán. Responde en español. Máximo 2 líneas.' },
            { role: 'user', content: prompt }
        ], { maxTokens: 200, temperature: 0.5 });
    } catch(e) {
        return null;
    }
};

// Chat interactivo con DeepSeek (modo tutor)
window.Muller.aiChat = async function(userMessage, history) {
    var systemPrompt = 'Eres el Profesor Plaza Müller, tutor de alemán experto. ' +
        'Hablas en español mezclado con alemán cuando sea útil. ' +
        'Ayudas con gramática, vocabulario, pronunciación y cultura alemana. ' +
        'Eres paciente, motivador y usas ejemplos prácticos. ' +
        'Si te preguntan sobre una palabra, da su artículo, plural y frase ejemplo.';
    
    var messages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) {
        history.forEach(function(msg) {
            messages.push({ role: msg.role, content: msg.content });
        });
    }
    messages.push({ role: 'user', content: userMessage });
    
    try {
        return await window.Muller.deepseekRequest(messages, { maxTokens: 800, temperature: 0.7 });
    } catch(e) {
        return null;
    }
};

// Generar un cloze (hueco) personalizado
window.Muller.aiGenerateCloze = async function(word, article, es, level) {
    var lvl = level || 'B1';
    var prompt = 'Crea una frase cloze (con hueco) en alemán nivel ' + lvl + ' para practicar la palabra "' + article + ' ' + word + '" (' + es + '). ' +
        'El hueco debe estar marcado con "___". Luego da la frase completa y la traducción.\n' +
        'Formato:\nCLOZE: [frase con ___]\nSOLUCION: [frase completa]\nES: [traducción]';
    
    try {
        return await window.Muller.deepseekRequest([
            { role: 'system', content: 'Eres un tutor de alemán. Genera ejercicios cloze útiles.' },
            { role: 'user', content: prompt }
        ], { maxTokens: 300, temperature: 0.6 });
    } catch(e) {
        return null;
    }
};