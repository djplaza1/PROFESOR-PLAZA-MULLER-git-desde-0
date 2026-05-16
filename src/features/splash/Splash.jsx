// SPLASH – Profesor Plaza Müller v2
window.Muller = window.Muller || {};
window.Muller.SplashScreen = ({ onStart }) => (
  <div style={{ fontFamily: 'Outfit, sans-serif', background: '#0f172a', color: '#e2e8f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      {/* Moneda grande x2 */}
      <div style={{ width: 320, height: 320, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fbbf24', boxShadow: '0 0 60px rgba(251,191,36,0.7)', overflow: 'hidden', margin: '0 auto 40px' }}>
        <img src="assets/icons/logo-plaza-sin-fondo.png" alt={'\u20BF'} style={{ width: 200, height: 200, objectFit: 'contain' }} />
      </div>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#06b6d4' }}>{'Profesor Plaza M\u00FCller'}</h1>
      <p style={{ marginTop: 8, color: '#94a3b8', fontSize: '1rem' }}>Plattform zum Deutschlernen</p>

      {/* ── BOTONES DE MODO DE VISTA ── */}
      <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => window.setViewMode('phone')}
          style={{
            padding: '10px 18px', borderRadius: 12, border: '2px solid #fbbf24',
            background: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontSize: '0.95rem',
            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(251,191,36,0.3)',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <span role="img" aria-label="smartphone">{'\u{1F4F1}'}</span> Smartphone
        </button>
        <button
          onClick={() => window.setViewMode('tablet')}
          style={{
            padding: '10px 18px', borderRadius: 12, border: '2px solid #06b6d4',
            background: 'rgba(6,182,212,0.15)', color: '#06b6d4', fontSize: '0.95rem',
            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(6,182,212,0.3)',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <span role="img" aria-label="tablet">{'\u{1F4BB}'}</span> Tablet
        </button>
        <button
          onClick={() => window.setViewMode('desktop')}
          style={{
            padding: '10px 18px', borderRadius: 12, border: '2px solid #8b5cf6',
            background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', fontSize: '0.95rem',
            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <span role="img" aria-label="desktop">{'\u{1F5A5}'}</span> Escritorio
        </button>
      </div>

      <button
        onClick={onStart}
        style={{ marginTop: 30, padding: '14px 40px', borderRadius: 14, background: '#06b6d4', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={e => e.target.style.background = '#0891b2'}
        onMouseLeave={e => e.target.style.background = '#06b6d4'}
      >
        Comenzar
      </button>
    </div>
  </div>
);