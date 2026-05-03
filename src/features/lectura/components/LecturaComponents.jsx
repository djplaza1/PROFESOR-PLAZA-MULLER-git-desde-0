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

  // ─── PasteArea (textarea + botón + limpiar) ───
  // Ahora acepta props value/onChange/onClear para control externo
  window.Muller.LecturaComponents.PasteArea = function(props) {
    var value = props.value !== undefined ? props.value : '';
    var onChange = props.onChange || function() {};
    var onClear = props.onClear || function() {};

    // Estilo de botón glass
    var btnStyle = {
      padding: '10px 20px', borderRadius: '10px',
      border: '1px solid rgba(6,182,212,0.3)',
      background: '#06b6d4', color: '#fff',
      fontSize: '0.9rem', fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.2s ease',
      display: 'inlineFlex', alignItems: 'center', gap: '6px',
      outline: 'none'
    };

    var clearBtnStyle = {
      padding: '10px 20px', borderRadius: '10px',
      border: '1px solid rgba(239,68,68,0.3)',
      background: 'rgba(239,68,68,0.2)', color: '#fca5a5',
      fontSize: '0.9rem', fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.2s ease',
      display: 'inlineFlex', alignItems: 'center', gap: '6px',
      outline: 'none'
    };

    return React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '8px' }
    },
      React.createElement('textarea', {
        placeholder: 'Pega aquí un texto en alemán para leer...',
        rows: 6,
        value: value,
        onChange: function(e) { onChange(e.target.value); },
        style: {
          width: '100%', padding: '12px', borderRadius: '12px',
          background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(148,163,184,0.2)',
          color: '#e2e8f0', fontSize: '1rem', resize: 'vertical', outline: 'none',
          backdropFilter: 'blur(8px)'
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: '8px' } },
        React.createElement('button', {
          onClick: function() {
            if (value.trim()) {
              props.onPaste(value.trim());
              if (onClear) onClear();
            }
          },
          disabled: !value.trim(),
          style: Object.assign({}, btnStyle, { opacity: !value.trim() ? 0.5 : 1 })
        }, '📄 Cargar texto'),
        value.trim() && React.createElement('button', {
          onClick: function() { if (onClear) onClear(); },
          style: clearBtnStyle
        }, '🗑️ Limpiar')
      )
    );
  };
})();