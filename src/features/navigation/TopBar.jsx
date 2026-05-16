// ═══════════════════════════════════════════════════
// TOP BAR – Profesor Plaza Müller v2
// Solo tabs que NO están en BottomBar (para evitar duplicados)
// Iconos SVG inline (sin lucide.createIcons para evitar error #300)
// Incluye tiempo activo global + Plaza Münzen + Indicador de scroll
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};

const TOP_ICONS = {
  'book-text': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
  dumbbell: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1 1"/><path d="m3 3 1-1"/><path d="m18 3 2 2"/><path d="m3 18 2 2"/><path d="M6.5 6.5a2.5 2.5 0 0 1 0-3.5 2.5 2.5 0 0 1 3.5 0"/><path d="M17.5 17.5a2.5 2.5 0 0 1 0 3.5 2.5 2.5 0 0 1-3.5 0"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'book-open-text': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M10 12h4"/><path d="M10 8h4"/></svg>',
  'pen-tool': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
  'chart-bar': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  school: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
  'user-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',
  'log-out': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  'store': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
};

window.Muller.TopBar = ({ activeTab, onTabChange, session }) => {
  const topTabs = [
    { id: 'lexikon', label: 'Léxikon', icon: 'book-text' },
    { id: 'entrenamiento', label: 'Entrenamiento', icon: 'dumbbell' },
    { id: 'comunidad', label: 'Comunidad', icon: 'users' },
    { id: 'lectura', label: 'Lectura', icon: 'book-open-text' },
    { id: 'escritura', label: 'Escritura', icon: 'pen-tool' },
    { id: 'progreso', label: 'Progreso', icon: 'chart-bar' },
    { id: 'maestros', label: 'Maestros', icon: 'school' },
    { id: 'ia', label: 'IA', icon: 'sparkles' },
    { id: 'tienda', label: 'Tienda', icon: 'store' }
  ];

  const tabsRef = React.useRef(null);

  // ─── TIMER GLOBAL PARA TIEMPO ACTIVO ───
  const [todaySeconds, setTodaySeconds] = React.useState(
    window.Muller.Progreso ? window.Muller.Progreso.getTodayActiveTime() : 0
  );
  const [plazaMuenzen, setPlazaMuenzen] = React.useState(
    window.Muller.Progreso ? window.Muller.Progreso.getPlazaMuenzen() : 0
  );

  React.useEffect(() => {
    // Registrar cada 30 segundos en localStorage
    const interval = setInterval(() => {
      if (window.Muller.Progreso) {
        const P = window.Muller.Progreso;
        const currentSaved = P.getTodayActiveTime();
        P.logActiveTime(30);
        setTodaySeconds(currentSaved + 30);
      }
    }, 30000);

    // Actualizar display cada segundo Y registrar tiempo activo
    const displayInterval = setInterval(() => {
      if (window.Muller.Progreso) {
        window.Muller.Progreso.logActiveTime(1);
        const saved = window.Muller.Progreso.getTodayActiveTime();
        setTodaySeconds(saved);
        setPlazaMuenzen(window.Muller.Progreso.getPlazaMuenzen());
      }
    }, 1000);

    const onCoinsChanged = () => {
      if (window.Muller.Progreso) {
        setPlazaMuenzen(window.Muller.Progreso.getPlazaMuenzen());
        setTodaySeconds(window.Muller.Progreso.getTodayActiveTime());
      }
    };
    window.addEventListener('plaza-coins-changed', onCoinsChanged);

    return () => {
      clearInterval(interval);
      clearInterval(displayInterval);
      window.removeEventListener('plaza-coins-changed', onCoinsChanged);
    };
  }, []);

  function formatSeconds(sec) {
    if (!sec || sec <= 0) return '0s';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  const scrollTabsRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return React.createElement('div', {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      background: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      zIndex: 50,
      borderBottom: '1px solid #334155'
    }
  },
    // Tabs secundarias con scroll horizontal
    React.createElement('div', {
      ref: tabsRef,
      style: {
        flex: 1,
        display: 'flex',
        overflowX: 'auto',
        marginLeft: 12,
        gap: 4,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }
    }, topTabs.map(tab => {
      const isActive = activeTab === tab.id;
      return React.createElement('button', {
        key: tab.id,
        onClick: () => onTabChange(tab.id),
        style: {
          background: isActive ? 'rgba(6,182,212,0.15)' : 'transparent',
          border: isActive ? 'none' : '1px solid #334155',
          color: isActive ? '#06b6d4' : '#94a3b8',
          padding: '4px 10px',
          borderRadius: 8,
          fontSize: '0.7rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          transition: 'all 0.15s',
          height: 32
        }
      },
        React.createElement('span', {
          style: { width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
          dangerouslySetInnerHTML: { __html: TOP_ICONS[tab.icon] || '' }
        }),
        React.createElement('span', null, tab.label)
      );
    })),

    // Flecha indicadora de más pestañas (pulso animado)
    React.createElement('button', {
      onClick: scrollTabsRight,
      className: 'animate-pulse',
      title: 'Más pestañas',
      style: {
        background: 'rgba(6,182,212,0.2)',
        border: '1px solid rgba(6,182,212,0.4)',
        borderRadius: '50%',
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        marginLeft: 6,
        marginRight: 8,
        color: '#06b6d4'
      }
    },
      React.createElement('span', {
        style: { width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
        dangerouslySetInnerHTML: { __html: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' }
      })
    ),

    // ─── BARRA DE ESTADO: TIEMPO ACTIVO + MONEDAS ───
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        marginRight: 8,
        paddingRight: 8,
        borderRight: '1px solid #334155'
      }
    },
      // Tiempo activo
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(6,182,212,0.1)',
          borderRadius: 6,
          padding: '4px 8px',
          cursor: 'default'
        },
        title: 'Tiempo activo de estudio hoy'
      },
        React.createElement('span', { style: { fontSize: '0.75rem', color: '#34d399' } }, '\u23F1'),
        React.createElement('span', {
          style: {
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#34d399',
            fontVariantNumeric: 'tabular-nums',
            minWidth: 50,
            textAlign: 'center'
          }
        }, formatSeconds(todaySeconds))
      ),
      // Plaza Münzen
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))',
          borderRadius: 8,
          padding: '4px 10px',
          cursor: 'pointer',
          border: '1px solid rgba(251,191,36,0.25)',
          boxShadow: '0 0 8px rgba(251,191,36,0.15)'
        },
        title: 'Plaza Münzen - Monedas',
        onClick: () => onTabChange('tienda')
      },
        React.createElement('div', {
          style: {
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2.5px solid #fbbf24',
            boxShadow: '0 0 10px rgba(251,191,36,0.5)',
            overflow: 'hidden',
            flexShrink: 0
          }
        },
          React.createElement('img', {
            src: 'assets/icons/logo-plaza-sin-fondo.png',
            alt: '\u20BF',
            style: { width: 28, height: 28, objectFit: 'contain' }
          })
        ),
        React.createElement('span', {
          style: {
            fontSize: '0.9rem',
            fontWeight: 800,
            color: '#fbbf24',
            fontVariantNumeric: 'tabular-nums',
            minWidth: 24,
            textAlign: 'center',
            textShadow: '0 0 4px rgba(251,191,36,0.3)'
          }
        }, plazaMuenzen)
      )
    )
  );
};