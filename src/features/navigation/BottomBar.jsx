// ═══════════════════════════════════════════════════
// BOTTOM BAR (compacto) – Profesor Plaza Müller v2
// Altura reducida a 40px para dejar más espacio al contenido
// Iconos vía data-lucide (API UMD estándar)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.BottomBar = ({ activeTab, onTabChange }) => {
  const quickTabs = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'ruta', label: 'Ruta', icon: 'map' },
    { id: 'historia', label: 'Historia', icon: 'book-open' },
    { id: 'biblioteca', label: 'Biblioteca', icon: 'library' },
    { id: 'pdfstudy', label: 'PDF Study', icon: 'file-text' },
    { id: 'telc', label: 'TELC', icon: 'graduation-cap' },
    { id: 'ajustes', label: 'Ajustes', icon: 'settings' }
  ];

  // Regenerar iconos Lucide después de montar
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return React.createElement('nav', {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      background: 'linear-gradient(180deg, rgba(15,23,42,0.96), rgba(15,23,42,0.99))',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      zIndex: 100,
      padding: '0 4px'
    }
  },
    quickTabs.map(tab => {
      const isActive = activeTab === tab.id;
      return React.createElement('button', {
        key: tab.id,
        onClick: () => onTabChange(tab.id),
        style: {
          background: isActive ? 'rgba(6,182,212,0.15)' : 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          cursor: 'pointer',
          color: isActive ? '#06b6d4' : '#94a3b8',
          padding: '2px 6px',
          borderRadius: 6,
          transition: 'all 0.15s',
          height: 36,
          minWidth: 44
        }
      },
        React.createElement('i', {
          'data-lucide': tab.icon,
          style: { width: 14, height: 14, display: 'inline-block' }
        }),
        React.createElement('span', {
          style: { fontSize: '0.5rem', fontWeight: 600, lineHeight: 1 }
        }, tab.label)
      );
    })
  );
};