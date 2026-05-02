// ==================================================
// src/features/ia/iaHelpers.jsx
// Motor IA real (DeepSeek por defecto) + fallback local
// ==================================================
window.Muller = window.Muller || {};
window.Muller.IA = {
  // ---------- CONFIGURACIÓN ----------
  DEFAULT_ENDPOINT: "https://api.deepseek.com/v1/chat/completions",
  DEFAULT_MODEL: "deepseek-chat",
  SYSTEM_PROMPT: `Eres Herr Müller, un profesor de alemán amable y paciente.
Hablas español y alemán. Enseñas alemán a hispanohablantes.
Responde SIEMPRE en español, salvo que el usuario pida hablar en alemán.
Usa ejemplos bilingües. Sé motivador y cercano.`,

  // ---------- API KEY ----------
  getApiKey() {
    try { return localStorage.getItem("muller_ia_api_key") || ""; } catch(e) { return ""; }
  },
  getEndpoint() { return this.DEFAULT_ENDPOINT; },
  getModel() { return this.DEFAULT_MODEL; },
  isRealIAReady() { return this.getApiKey().trim().length > 0; },

  // ---------- HISTORIAL (por conversación) ----------
  conversationId: null,
  HISTORY_KEY: "ia_chat_history",

  startConversation() {
    this.conversationId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const all = this.getAllConversations();
    all[this.conversationId] = [];
    this.saveAllConversations(all);
    return this.conversationId;
  },

  getAllConversations() {
    try {
      const raw = localStorage.getItem(this.HISTORY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
  },

  saveAllConversations(convos) {
    try { localStorage.setItem(this.HISTORY_KEY, JSON.stringify(convos)); } catch(e) {}
  },

  getCurrentMessages() {
    if (!this.conversationId) return [];
    const all = this.getAllConversations();
    return all[this.conversationId] || [];
  },

  addMessage(role, content) {
    if (!this.conversationId) this.startConversation();
    const all = this.getAllConversations();
    if (!all[this.conversationId]) all[this.conversationId] = [];
    all[this.conversationId].push({ role, content, timestamp: Date.now() });
    if (all[this.conversationId].length > 200) {
      all[this.conversationId] = all[this.conversationId].slice(-200);
    }
    this.saveAllConversations(all);
  },

  // Compatibilidad con el panel antiguo
  loadHistory() {
    return this.getCurrentMessages();
  },
  saveHistory(messages) {
    if (!this.conversationId) this.startConversation();
    const all = this.getAllConversations();
    all[this.conversationId] = messages.slice(-200);
    this.saveAllConversations(all);
  },
  clearHistory() {
    if (!this.conversationId) this.startConversation();
    const all = this.getAllConversations();
    all[this.conversationId] = [];
    this.saveAllConversations(all);
  },

  // ---------- LLAMADA REAL ----------
  async callRealAI(userMessage) {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("API Key no configurada");

    const endpoint = this.getEndpoint();
    const model = this.getModel();

    const messages = [{ role: "system", content: this.SYSTEM_PROMPT }];
    const history = this.getCurrentMessages().slice(-20);
    history.forEach(m => messages.push({ role: m.role, content: m.content }));
    // Añadir el mensaje actual si no está ya
    if (!history.some(m => m.role === "user" && m.content === userMessage)) {
      messages.push({ role: "user", content: userMessage });
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: (window.Muller.getTemperature ? window.Muller.getTemperature() : 0.7),
        max_tokens: 1000,
        stream: false
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`API ${resp.status}: ${text.slice(0, 200)}`);
    }

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || "(sin respuesta)";
  },

  // ---------- MOTOR PRINCIPAL ----------
  async sendMessage(userMessage) {
    this.addMessage("user", userMessage);

    let reply, source;
    if (this.isRealIAReady()) {
      try {
        reply = await this.callRealAI(userMessage);
        source = "api";
      } catch(e) {
        console.warn("Fallback local:", e.message);
        reply = this.simulateResponse(userMessage);
        source = "fallback";
        reply = `⚠️ [Modo local - Error: ${e.message.slice(0, 60)}]\n\n${reply}`;
      }
    } else {
      reply = this.simulateResponse(userMessage);
      source = "local";
    }

    this.addMessage("assistant", reply);
    return { reply, source };
  },

  // ---------- SIMULADOR LOCAL ----------
  simulateResponse(msg) {
    const lower = (msg || "").trim().toLowerCase();

    // Correcciones rápidas
    const fixes = {
      "der auto": "das Auto (neutro)",
      "die buch": "das Buch (neutro)",
      "das lampe": "die Lampe (femenino)",
      "der haus": "das Haus (neutro)",
      "ich habe gehen": "ich bin gegangen (movimiento → sein)",
      "ich habe essen": "ich habe gegessen (Partizip II de essen)",
    };
    for (let [k, v] of Object.entries(fixes)) {
      if (lower.includes(k)) return `🔍 **Corrección:** "${k}" → **${v}**. ¡Sigue practicando!`;
    }

    // Comandos
    if (lower.startsWith("/corrige")) {
      const texto = msg.replace(/^\/corrige\s*/i, "");
      if (!texto) return "Escríbeme una frase en alemán para corregirla. /corrige <frase>";
      return `He analizado: "${texto}". Parece correcto. Con IA real obtendrías una corrección detallada.`;
    }
    if (lower.startsWith("/gramatica")) {
      const t = msg.replace(/^\/gramatica\s*/i, "");
      if (!t) return "Dime el tema: /gramatica artículos, preposiciones, verbos, declinación...";
      return `Tema: "${t}". La IA real te daría una explicación completa con ejemplos.`;
    }
    if (lower.startsWith("/vocabulario")) {
      const w = msg.replace(/^\/vocabulario\s*/i, "");
      if (!w) return "Dime una palabra: /vocabulario Haus";
      return `Palabra: "${w}". Con IA real tendrías traducción, ejemplos y frases comunes.`;
    }
    if (lower.startsWith("/examen")) {
      return "¡Modo examen! Te haría preguntas adaptadas a tu nivel. Con IA real será mucho más completo.";
    }
    if (lower.startsWith("/rol")) {
      const s = msg.replace(/^\/rol\s*/i, "") || "restaurante";
      return `🎭 **Juego de rol: ${s}**. Yo soy Herr Müller y simularemos una situación. ¡Adelante! (Con IA real será más inmersivo)`;
    }
    if (lower.startsWith("/ayuda")) {
      return `🤖 **Comandos:** /corrige [frase] | /gramatica [tema] | /vocabulario [palabra] | /examen | /rol [situación] | /ayuda`;
    }

    // Pequeña charla
    if (/(hola|buenos días|guten tag)/i.test(lower)) return this.getGreeting();
    if (/(cómo estás|wie geht)/i.test(lower)) return "¡Muy bien, gracias! ¿Y tú? ¿Listo para aprender alemán?";
    if (/(adiós|tschüss|auf wiedersehen)/i.test(lower)) return "¡Tschüss! ¡Sigue practicando! 👋";

    // Traducción rápida
    const tradMatch = lower.match(/(?:cómo se dice|traduce|how do you say|übersetze)\s+["']?([^"']+)["']?/i);
    if (tradMatch) {
      return `🔤 "${tradMatch[1]}" en alemán... Con la IA real activada te daré la traducción exacta. ¡Pruébalo!`;
    }

    // Respuesta genérica
    return `Interesante pregunta. Con la **IA real** (DeepSeek, OpenAI, etc.) podría darte una respuesta mucho más completa. ¿Quieres que te ayude con algo concreto? Prueba /ayuda para ver los comandos.`;
  },

  // ---------- UTILIDADES (compatibilidad con el panel) ----------
  getGreeting() {
    const g = [
      "Hallo! Ich bin Herr Müller, dein Deutschlehrer. Wie kann ich dir helfen?\n\n_¡Hola! Soy el profesor Müller, tu profesor de alemán. ¿Cómo puedo ayudarte?_",
      "Guten Tag! Schön, dich zu sehen. Was möchtest du heute lernen?\n\n_¡Buenos días! Me alegra verte. ¿Qué te gustaría aprender hoy?_",
      "Willkommen! Ich bin hier, um dir mit Deutsch zu helfen. Frag mich einfach!\n\n_¡Bienvenido! Estoy aquí para ayudarte con el alemán. ¡Solo pregúntame!_"
    ];
    return g[Math.floor(Math.random() * g.length)];
  },

  getSuggestions() {
    return [
      { text: "/corrige Ich habe ein Buch gelesen", icon: "🔍" },
      { text: "/gramatica preposiciones", icon: "📚" },
      { text: "/vocabulario Haus", icon: "📖" },
      { text: "/rol restaurante", icon: "🎭" },
      { text: "¿Cómo se dice mesa en alemán?", icon: "🇩🇪" },
      { text: "Explícame los artículos", icon: "📝" }
    ];
  },

  checkAchievements(messageCount) {
    const achievements = [];
    if (messageCount >= 1) achievements.push({ id: "first_chat", title: "Erstes Gespräch", desc: "Primera conversación con Herr Müller" });
    if (messageCount >= 10) achievements.push({ id: "chat_10", title: "Plaudertasche", desc: "10 mensajes en el chat" });
    if (messageCount >= 50) achievements.push({ id: "chat_50", title: "Kommunikativ", desc: "50 mensajes" });
    return achievements;
  }
};
