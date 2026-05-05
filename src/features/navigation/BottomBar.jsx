// ═══════════════════════════════════════════════════
// BOTTOM BAR (compacto) – Profesor Plaza Müller v2
// Altura reducida a 40px para dejar más espacio al contenido
// Iconos SVG inline (sin lucide.createIcons para evitar error #300)
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};

const BOTTOM_ICONS = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  map: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  'book-open': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  library: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>',
  store: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  'file-text': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  'graduation-cap': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M12 20l.5 1.5L14 22l-1.5.5L12 24l-.5-1.5L10 22l1.5-.5z"/><path d="M19 10l.5 1.5L21 12l-1.5.5L19 14l-.5-1.5L17 12l1.5-.5z"/><path d="M5 10l.5 1.5L7 12l-1.5.5L5 14l-.5-1.5L3 12l1.5-.5z"/></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
};

window.Muller.BottomBar = ({ activeTab, onTabChange }) => {
  const quickTabs = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'ruta', label: 'Ruta', icon: 'map' },
    { id: 'historia', label: 'Historia', icon: 'book-open' },
    { id: 'ia', label: 'IA', icon: 'sparkles' },
    { id: 'biblioteca', label: 'Biblioteca', icon: 'library' },
    { id: 'pdfstudy', label: 'PDF Study', icon: 'file-text' },
    { id: 'telc', label: 'TELC', icon: 'graduation-cap' },
    { id: 'tienda', label: 'Tienda', icon: 'store' },
    { id: 'ajustes', label: 'Ajustes', icon: 'settings' }
  ];

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
        React.createElement('span', {
          style: { width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
          dangerouslySetInnerHTML: { __html: BOTTOM_ICONS[tab.icon] || '' }
        }),
        React.createElement('span', {
          style: { fontSize: '0.5rem', fontWeight: 600, lineHeight: 1 }
        }, tab.label)
      );
    })
  );
};