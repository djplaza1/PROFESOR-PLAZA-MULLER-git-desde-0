// src/features/lectura/components/LecturaComponents.jsx
// Componentes externos para evitar recreación en cada render (pérdida de foco en inputs)
window.Muller = window.Muller || {};
window.Muller.LecturaComponents = window.Muller.LecturaComponents || {};

(function() {
  var _icon = window.Muller.LecturaHelpers ? window.Muller.LecturaHelpers.icon : function() { return ''; };

  // Helper para renderizar icono como elemento React con dangerouslySetInnerHTML
  window.Muller.LecturaComponents.iconSpan = function(name, className, size) {
    var html = _icon(name, className || '', size || 16);
    if (!html) return null;
    return React.createElement('span', {
      dangerouslySetInnerHTML: { __html: html },
      style: { display: 'inline', verticalAlign: 'middle' }
    });
  };

  // ─── PasteArea (textarea) ───
  // SACADO del panel para evitar que se recre en cada render y pierda el foco
  window.Muller.LecturaComponents.PasteArea = function(props) {
    return React.createElement('textarea', {
      placeholder: 'Pega aquí un texto en alemán para leer...',
      rows: 6,
      style: {
        width: '100%', padding: '12px', borderRadius: '12px',
        background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.2)',
        color: '#e2e8f0', fontSize: '1rem', resize: 'vertical', outline: 'none',
        backdropFilter: 'blur(8px)'
      },
      onChange: function(e) {
        if (e.target.value.trim()) props.onPaste(e.target.value.trim());
      }
    });
  };
})();