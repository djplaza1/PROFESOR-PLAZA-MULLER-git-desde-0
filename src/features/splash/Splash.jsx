// ═══════════════════════════════════════════════════
// SPLASH – Profesor Plaza Müller v2
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.SplashScreen = ({ onStart }) => (
  <div style={{ fontFamily: 'Outfit, sans-serif', background: '#0f172a', color: '#e2e8f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      {/* Moneda grande x2 */}
      <div style={{ width: 320, height: 320, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fbbf24', boxShadow: '0 0 60px rgba(251,191,36,0.7)', overflow: 'hidden', margin: '0 auto 40px' }}>
        <img src="assets/icons/logo-plaza-sin-fondo.png" alt="₿" style={{ width: 200, height: 200, objectFit: 'contain' }} />
      </div>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#06b6d4' }}>Profesor Plaza Müller</h1>
      <p style={{ marginTop: 8, color: '#94a3b8', fontSize: '1rem' }}>Plattform zum Deutschlernen</p>
      <button
        onClick={onStart}
        style={{ marginTop: 40, padding: '14px 40px', borderRadius: 14, background: '#06b6d4', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={e => e.target.style.background = '#0891b2'}
        onMouseLeave={e => e.target.style.background = '#06b6d4'}
      >
        Comenzar
      </button>
    </div>
  </div>
);
