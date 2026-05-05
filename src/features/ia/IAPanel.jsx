// ==================================================
// src/features/ia/IAPanel.jsx
// Panel IA – Asistente Herr Müller (con soporte API real)
// ==================================================
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.IaPanel = {
  name: "ia",
  title: "IA",
  icon: "🤖",

  init() {
    const IA = window.Muller.IA;
    if (!IA.conversationId) IA.startConversation();
    this.mode = "normal";
    this.render();
    this.bindEvents();
    this.updateApiBadge();
  },

  render() {
    const container = document.getElementById("panel-content");
    if (!container) return;
    container.innerHTML = this.getHTML();
    this.chatBody = document.getElementById("ia-chat-body");
    this.inputField = document.getElementById("ia-user-input");
    this.suggestionsEl = document.getElementById("ia-suggestions");
    this.modeBadge = document.getElementById("ia-mode-badge");
    this.apiBadge = document.getElementById("ia-api-badge");
    this.renderMessages();
  },

  getHTML() {
    return `
      <div class="flex flex-col h-full bg-gray-900 text-white">
        <!-- Header -->
        <div class="flex-shrink-0 px-4 py-3 border-b border-gray-700 bg-gradient-to-r from-indigo-900 to-gray-900 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xl">🤖</div>
          <div class="flex-1">
            <h2 class="text-lg font-bold">Herr Müller</h2>
            <p class="text-xs text-gray-400">Dein persönlicher Deutschlehrer</p>
          </div>
          <span id="ia-api-badge" class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-400">Local</span>
          <button id="ia-mode-badge" class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 border-none cursor-pointer transition" title="Cambiar modo de IA">Normal ▾</button>
          <button id="ia-clear-btn" title="Neuen Chat starten" class="p-2 hover:bg-gray-700 rounded-lg transition">
            <i data-lucide="trash-2" class="w-5 h-5 text-gray-400"></i>
          </button>
        </div>

        <!-- Chat Body -->
        <div id="ia-chat-body" class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"></div>

        <!-- Suggestions -->
        <div id="ia-suggestions" class="flex-shrink-0 px-4 py-2 flex gap-2 overflow-x-auto"></div>

        <!-- Input -->
        <div class="flex-shrink-0 px-4 py-3 border-t border-gray-700 bg-gray-800">
          <div class="flex items-center gap-2">
            <button id="ia-mode-btn" class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition" title="Modo especial">
              <i data-lucide="sliders" class="w-5 h-5"></i>
            </button>
            <textarea id="ia-user-input" rows="1" placeholder="Schreib deine Frage... / Escribe tu pregunta..."
              class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
              style="max-height: 120px;"></textarea>
            <button id="ia-send-btn" class="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white">
              <i data-lucide="send" class="w-5 h-5"></i>
            </button>
          </div>
          <div id="ia-mode-hint" class="text-xs text-gray-500 mt-1 hidden"></div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const sendBtn = document.getElementById("ia-send-btn");
    const clearBtn = document.getElementById("ia-clear-btn");
    const modeBtn = document.getElementById("ia-mode-btn");
    this.inputField = document.getElementById("ia-user-input");

    sendBtn?.addEventListener("click", () => this.sendMessage());
    clearBtn?.addEventListener("click", () => this.confirmClear());
    modeBtn?.addEventListener("click", () => this.toggleModeMenu());
    this.modeBadge?.addEventListener("click", () => this.toggleModeMenu());

    this.inputField?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    this.inputField?.addEventListener("input", () => {
      this.inputField.style.height = "auto";
      this.inputField.style.height = Math.min(this.inputField.scrollHeight, 120) + "px";
    });

    this.renderSuggestions();
  },

  renderMessages() {
    if (!this.chatBody) return;
    const IA = window.Muller.IA;
    let msgs = IA.loadHistory();
    if (msgs.length === 0) {
      const greeting = IA.getGreeting();
      IA.addMessage("assistant", greeting);
      msgs = IA.loadHistory();
    }
    this.chatBody.innerHTML = msgs.map(m => this.formatMessage(m)).join("");
    this.scrollToBottom();
  },

  formatMessage(msg) {
    const isUser = msg.role === "user";
    const bubbleClass = isUser ? "bg-indigo-600 ml-auto max-w-[80%]" : "bg-gray-700 mr-auto max-w-[80%]";
    const html = (msg.content || "")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
    const time = new Date(msg.timestamp).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    return `
      <div class="flex gap-2 ${isUser ? "justify-end" : "justify-start"} animate-fade-in">
        ${!isUser ? '<div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm shrink-0 mt-1">🤖</div>' : ""}
        <div class="px-3 py-2 rounded-2xl text-sm leading-relaxed ${bubbleClass} break-words whitespace-pre-wrap">
          ${html}
          <div class="text-xs text-gray-400 mt-1 text-right">${time}</div>
        </div>
        ${isUser ? '<div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs shrink-0 mt-1">Du</div>' : ""}
      </div>
    `;
  },

  renderSuggestions() {
    if (!this.suggestionsEl) return;
    const suggestions = window.Muller.IA.getSuggestions();
    this.suggestionsEl.innerHTML = suggestions.map(s => `
      <button class="suggestion-chip whitespace-nowrap px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-xs transition flex items-center gap-1 text-gray-300 hover:text-white" data-text="${s.text}">
        <span>${s.icon}</span> ${s.text}
      </button>
    `).join("");
    this.suggestionsEl.querySelectorAll(".suggestion-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        if (this.inputField) {
          this.inputField.value = chip.dataset.text;
          this.inputField.focus();
          this.sendMessage();
        }
      });
    });
  },

  async sendMessage() {
    const text = this.inputField?.value.trim();
    if (!text) return;

    this.addMessageBubble("user", text);
    this.inputField.value = "";
    this.inputField.style.height = "auto";
    this.showTyping();

    try {
      const { reply, source } = await window.Muller.IA.sendMessage(text);
      this.hideTyping();
      this.addMessageBubble("assistant", reply);
      this.updateApiBadge();
      this.checkAchievements();
    } catch (e) {
      this.hideTyping();
      this.addMessageBubble("assistant", "❌ Error: " + e.message);
    }
  },

  addMessageBubble(role, content) {
    const msg = { role, content, timestamp: Date.now() };
    if (this.chatBody) {
      const div = document.createElement("div");
      div.innerHTML = this.formatMessage(msg);
      this.chatBody.appendChild(div.firstElementChild);
      this.scrollToBottom();
    }
  },

  showTyping() {
    if (!this.chatBody) return;
    const el = document.createElement("div");
    el.id = "ia-typing-indicator";
    el.className = "flex gap-2 justify-start animate-fade-in";
    el.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm shrink-0 mt-1">🤖</div>
      <div class="px-4 py-2 rounded-2xl bg-gray-700 flex items-center gap-1">
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.15s"></span>
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.3s"></span>
      </div>
    `;
    this.chatBody.appendChild(el);
    this.scrollToBottom();
  },

  hideTyping() {
    document.getElementById("ia-typing-indicator")?.remove();
  },

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  },

  updateApiBadge() {
    const badge = document.getElementById("ia-api-badge");
    if (badge) {
      if (window.Muller.IA.isRealIAReady()) {
        badge.textContent = "IA real";
        badge.className = "px-2 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-emerald-100";
      } else {
        badge.textContent = "Local";
        badge.className = "px-2 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-400";
      }
    }
  },

  toggleModeMenu() {
    // Mantengo los modos para enviar comandos al chat
    const modes = [
      { id: "normal", label: "Normal", emoji: "💬" },
      { id: "corrige", label: "Korrektur", emoji: "🔍" },
      { id: "gramatica", label: "Grammatik", emoji: "📚" },
      { id: "vocabulario", label: "Vokabeln", emoji: "📖" },
      { id: "examen", label: "Prüfung", emoji: "📝" },
      { id: "rol", label: "Rollenspiel", emoji: "🎭" }
    ];
    const existing = document.getElementById("ia-mode-dropdown");
    if (existing) { existing.remove(); return; }

    const dropdown = document.createElement("div");
    dropdown.id = "ia-mode-dropdown";
    dropdown.className = "absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-2 z-50 w-48";
    dropdown.innerHTML = modes.map(m => `
      <button class="mode-option w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-700 flex items-center gap-2 ${m.id === this.mode ? "bg-indigo-600 text-white" : "text-gray-300"}" data-mode="${m.id}">
        <span>${m.emoji}</span> ${m.label}
      </button>
    `).join("");

    const modeBtn = document.getElementById("ia-mode-btn");
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.appendChild(dropdown);
    modeBtn?.parentNode?.insertBefore(wrapper, modeBtn);
    wrapper.appendChild(modeBtn);

    dropdown.querySelectorAll(".mode-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        this.mode = mode;
        const labels = { normal: "Normal", corrige: "Korrektur", gramatica: "Grammatik", vocabulario: "Vokabeln", examen: "Prüfung", rol: "Rollenspiel" };
        const badge = document.getElementById("ia-mode-badge");
        if (badge) badge.textContent = labels[mode] || mode;
        // Si el modo no es normal, mandamos el comando al chat
        if (mode !== "normal") {
          const prefix = "/" + mode;
          if (this.inputField) {
            this.inputField.value = prefix + " ";
            this.inputField.focus();
          }
        }
        dropdown.remove();
      });
    });

    setTimeout(() => {
      const close = (e) => {
        if (!dropdown.contains(e.target) && e.target !== modeBtn) {
          dropdown.remove();
          document.removeEventListener("click", close);
        }
      };
      document.addEventListener("click", close);
    }, 10);
  },

  confirmClear() {
    if (confirm("¿Nuevo chat? El historial se borrará.")) {
      window.Muller.IA.clearHistory();
      window.Muller.IA.startConversation();
      this.render();
    }
  },

  checkAchievements() {
    const userMsgs = window.Muller.IA.loadHistory().filter(m => m.role === "user").length;
    const newAch = window.Muller.IA.checkAchievements(userMsgs);
    if (newAch.length > 0) {
      const last = newAch[newAch.length - 1];
      if (window.Muller.Training?.addAchievement) {
        window.Muller.Training.addAchievement(last.id, last.title, last.desc);
      }
    }
  }
};

// Wrapper React para PanelRouter (tab === "ia")
window.Muller.Panels.ia = function IaPanelWrapper(props) {
  React.useEffect(function() {
    var panel = window.Muller.Panels.IaPanel;
    if (panel && typeof panel.init === "function") {
      panel.init();
    }
  }, []);
  return React.createElement("div", { id: "panel-content", className: "w-full h-full" });
};