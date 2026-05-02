// ═══════════════════════════════════════════════════
// TOP BAR – Profesor Plaza Müller v2
// Solo tabs que NO están en BottomBar (para evitar duplicados)
// Cada tab con icono Lucide + texto
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.TopBar = ({ activeTab, onTabChange, session }) => {
  const topTabs = [
    { id: 'lexikon', label: 'Léxikon', icon: 'book-text' },
    { id: 'entrenamiento', label: 'Entrenamiento', icon: 'dumbbell' },
    { id: 'comunidad', label: 'Comunidad', icon: 'users' },
    { id: 'lectura', label: 'Lectura', icon: 'book-open-text' },
    { id: 'escritura', label: 'Escritura', icon: 'pen-tool' },
    { id: 'progreso', label: 'Progreso', icon: 'chart-bar' },
    { id: 'maestros', label: 'Maestros', icon: 'school' },
    { id: 'ia', label: 'IA', icon: 'sparkles' }
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    window.Muller.authLogout();
    window.location.reload();
  };

  // Regenerar iconos Lucide
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

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
    React.createElement('button', {
      onClick: () => onTabChange('inicio'),
      style: {
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        flexShrink: 0
      }
    },
      React.createElement('img', { src: 'assets/icons/icon-192.png', alt: 'Logo', style: { width: 32, height: 32 } }),
      React.createElement('span', { style: { fontWeight: 700, fontSize: '1rem', color: '#06b6d4' } }, 'Plaza Müller')
    ),

    // Tabs secundarias con iconos y texto (solo las que NO están en BottomBar)
    React.createElement('div', {
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
        React.createElement('i', {
          'data-lucide': tab.icon,
          style: { width: 14, height: 14, display: 'inline-block', flexShrink: 0 }
        }),
        React.createElement('span', null, tab.label)
      );
    })),

    // Menú de usuario
    React.createElement('div', { style: { position: 'relative', flexShrink: 0 } },
      React.createElement('button', {
        onClick: () => setMenuOpen(!menuOpen),
        style: {
          background: 'transparent',
          border: 'none',
          color: '#e2e8f0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: '0.75rem'
        }
      },
        React.createElement('i', { 'data-lucide': 'user-circle', style: { width: 20, height: 20 } }),
        React.createElement('span', { style: { maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis' } }, session?.displayName || session?.email)
      ),
      menuOpen && React.createElement('div', {
        style: {
          position: 'absolute',
          right: 0,
          top: 40,
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 8,
          padding: 8,
          minWidth: 160,
          zIndex: 60
        }
      },
        React.createElement('button', {
          onClick: handleLogout,
          style: {
            width: '100%',
            padding: 8,
            background: 'transparent',
            border: 'none',
            color: '#f87171',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }
        },
          React.createElement('i', { 'data-lucide': 'log-out', style: { width: 16, height: 16 } }),
          'Cerrar sesión'
        )
      )
    )
  );
};