// src/core/toast.jsx – Notificaciones Toast Premium con animaciones
window.Muller = window.Muller || {};
window.Muller.Toast = (() => {
  let container = null;
  let queue = [];
  let active = false;

  function ensureContainer() {
    if (container) return;
    container = document.createElement('div');
    container.id = 'muller-toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:12px;pointer-events:none;';
    document.body.appendChild(container);
  }

  function animateIn(el) {
    el.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'translateX(120%)';
    el.style.opacity = '0';
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)';
      el.style.opacity = '1';
    });
  }

  function animateOut(el) {
    return new Promise(resolve => {
      el.style.transition = 'all 0.3s ease-in';
      el.style.transform = 'translateX(120%)';
      el.style.opacity = '0';
      setTimeout(() => { el.remove(); resolve(); }, 350);
    });
  }

  function playSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      o.frequency.setValueAtTime(800, ctx.currentTime);
      o.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.4);
    } catch(e) {}
  }

  async function processQueue() {
    if (active || queue.length === 0) return;
    active = true;
    const { achievement } = queue.shift();
    ensureContainer();
    
    const el = document.createElement('div');
    el.className = 'muller-toast';
    el.style.cssText = 'pointer-events:auto;background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);border:1px solid rgba(251,191,36,0.4);border-radius:16px;padding:16px 20px;min-width:300px;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.6),0 0 20px rgba(251,191,36,0.15);display:flex;align-items:center;gap:14px;position:relative;overflow:hidden;';
    
    // Brillo de fondo animado
    const glow = document.createElement('div');
    glow.style.cssText = 'position:absolute;inset:0;background:radial-gradient(circle at 20% 50%, rgba(251,191,36,0.08) 0%, transparent 60%);animation:toastGlow 3s ease-in-out infinite;pointer-events:none;';
    el.appendChild(glow);
    
    // Icono
    const icon = document.createElement('span');
    icon.textContent = achievement.icon || '🏆';
    icon.style.cssText = 'font-size:36px;filter:drop-shadow(0 0 8px rgba(251,191,36,0.5));flex-shrink:0;';
    el.appendChild(icon);
    
    // Texto
    const textDiv = document.createElement('div');
    textDiv.innerHTML = `
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#fbbf24;font-weight:700;margin-bottom:2px;">¡Logro desbloqueado!</div>
      <div style="font-size:15px;font-weight:800;color:#e2e8f0;line-height:1.2;">${achievement.title}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:2px;">${achievement.desc}</div>
      ${achievement.points > 0 ? `<div style="font-size:11px;color:#fbbf24;margin-top:4px;font-weight:700;">+${achievement.points} pts</div>` : ''}
    `;
    el.appendChild(textDiv);
    
    container.appendChild(el);
    playSound();
    animateIn(el);
    
    // Auto-cerrar tras 4 segundos
    setTimeout(async () => {
      await animateOut(el);
      active = false;
      processQueue();
    }, 4000);
  }

  // Añadir animación keyframes
  const style = document.createElement('style');
  style.textContent = '@keyframes toastGlow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }';
  document.head.appendChild(style);

  return {
    show: (achievement) => {
      queue.push({ achievement });
      processQueue();
    },
    showCustom: (title, desc, icon = '✅', points = 0) => {
      queue.push({ achievement: { title, desc, icon, points } });
      processQueue();
    }
  };
})();
