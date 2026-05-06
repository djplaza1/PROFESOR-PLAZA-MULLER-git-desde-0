// ═══════════════════════════════════════════════════
// APP PRINCIPAL – Profesor Plaza Müller v2
// ═══════════════════════════════════════════════════
const { useLocalStorage, KEYS } = window.Muller;
const { getActiveSession, login, register, logout } = window.Muller.Auth;

function App() {
  const [splashDone, setSplashDone] = React.useState(false);
  const [warmLight, setWarmLight] = React.useState(() => { try { return parseFloat(localStorage.getItem('muller_warm_light') || '0'); } catch(e) { return 0; } });
  const [theme, setTheme] = React.useState(() => {
    try {
      const s = window.Muller.Ajustes ? window.Muller.Ajustes.getAll() : {};
      return s.theme || 'dark';
    } catch(e) { return 'dark'; }
  });
  const [activeTab, setActiveTab] = useLocalStorage('muller_active_tab_v1', 'inicio');
  const [session, setSession] = React.useState(null);
  React.useEffect(() => { async function init() { const s = await getActiveSession(); if (s) setSession(s); } init(); }, []);
  React.useEffect(() => {
    const handler = () => {
      const val = parseFloat(localStorage.getItem('muller_warm_light') || '0');
      setWarmLight(val);
    };
    window.addEventListener('warmLightChanged', handler);
    return () => window.removeEventListener('warmLightChanged', handler);
  }, []);
  window.Muller.setWarmLight = (val) => {
    localStorage.setItem('muller_warm_light', val.toString());
    window.dispatchEvent(new Event('warmLightChanged'));
  };

  if (!splashDone) {
    return React.createElement(window.Muller.SplashScreen, { onStart: () => setSplashDone(true) });
  }

  if (!session) {
    return React.createElement(LoginScreen, { onLoginSuccess: setSession });
  }

  return (
    <div id="app-main" style={{ position: "relative", fontFamily: 'Outfit, sans-serif', background: '#0f172a', color: '#e2e8f0', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
      {React.createElement(window.Muller.TopBar, { activeTab, onTabChange: setActiveTab, session })}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingTop: 56, paddingBottom: 40 }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
          {React.createElement(PanelRouter, { tab: activeTab, session })}
        </div>
      </div>
      {React.createElement(window.Muller.BottomBar, { activeTab, onTabChange: setActiveTab })}
    </div>
  );
}

// ─── LoginScreen ───
function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [mode, setMode] = React.useState('login');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      const s = await getActiveSession();
      if (s) onLoginSuccess(s);
      else setError('No se pudo obtener sesión');
    } catch (err) {
      setError(err.message || 'Error de autenticación');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
      <form onSubmit={handleSubmit} style={{ background: '#1e293b', padding: 32, borderRadius: 16, border: '1px solid #334155', width: 360 }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
        <h2 style={{ color: '#e2e8f0', marginBottom: 24, fontSize: '1.5rem', fontWeight: 700 }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
        {error && <div style={{ color: '#f87171', marginBottom: 12, fontSize: '0.875rem' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}{error}</div>}
        {mode === 'register' && (
          <input type="text" placeholder="Nombre" value={displayName} onChange={e => setDisplayName(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0' }}
          />
        )}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0' }}
        />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 8, background: loading ? '#475569' : '#06b6d4', color: 'white', border: 'none', fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
          {loading ? 'Procesando...' : (mode === 'login' ? 'Entrar' : 'Registrarse')}
        </button>
        <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          style={{ width: '100%', marginTop: 12, background: 'transparent', color: '#06b6d4', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
      {warmLight > 0 && React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, background: `rgba(255,200,100,${warmLight * 0.5})`, mixBlendMode: "lighten", transition: "background 0.5s" } })}
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </form>
    </div>
  );
}

// ─── PanelRouter ───
function PanelRouter({ tab, session }) {
  const Panel = (window.Muller.Panels || {})[tab];
  if (Panel) return React.createElement(Panel, { session, key: tab });
  return React.createElement('div', { style: { padding: 24, textAlign: 'center', color: '#94a3b8' } },
    tab + " en desarrollo."
  );
}

// ─── Montaje principal App ───
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

// ─── Montaje global del Floating AI Chat (fuera del árbol de App) ───
// Crea su propio root para ser visible siempre: splash, login, cualquier pestaña
(function() {
    var containerId = 'muller-floating-ai-chat-root';
    if (!document.getElementById(containerId)) {
        var container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
    }
    var container = document.getElementById(containerId);
    // Si el componente ya está definido, lo montamos directamente
    if (window.Muller && window.Muller.FloatingAiChat && window.Muller.FloatingAiChat.Component) {
        ReactDOM.createRoot(container).render(
            React.createElement(window.Muller.FloatingAiChat.Component)
        );
    }
})();
