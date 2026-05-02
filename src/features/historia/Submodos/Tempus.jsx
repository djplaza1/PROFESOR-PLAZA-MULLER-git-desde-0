// ═══════════════════════════════════════════════════
// TEMPUS – Analizador de verbos (se muestra debajo del texto)
// Detecta verbos en infinitivo, Präteritum y Perfekt
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Submodos = window.Muller.Submodos || {};

window.Muller.Submodos.tempus = function TempusSubmod({ escena, currentScene, guion, sceneIndex, salir }) {
  const { useState, useEffect } = window.React;

  const texto = (currentScene?.text_de || currentScene?.text || '');
  const traduccion = currentScene?.translation || '';

  // Normalizar para comparación: minúsculas, sin puntuación
  const normalize = (s) => s.toLowerCase().replace(/[^a-zäöüß]/g, '');

  const [verbos, setVerbos] = useState([]);

  useEffect(() => {
    if (!texto) { setVerbos([]); return; }

    const dict = window.Muller.Data.tempusDict || [];
    const palabras = texto.split(/[\s,;.!?\-–—]+/).filter(Boolean);

    // Por cada palabra, buscar en el diccionario
    const encontrados = [];
    const vistos = new Set();

    for (const rawWord of palabras) {
      const word = normalize(rawWord);
      if (!word || vistos.has(word)) continue;

      // Buscar en el diccionario (infinitiv, praeteritum, perfekt)
      for (const entry of dict) {
        const inf = normalize(entry.infinitiv);
        const praet = normalize(entry.praeteritum);
        const perf = normalize(entry.perfekt);

        if (word === inf || word === praet || word === perf) {
          // Determinar en qué forma apareció
          let formaEncontrada = 'infinitiv';
          if (word === praet) formaEncontrada = 'praeteritum';
          else if (word === perf) formaEncontrada = 'perfekt';

          encontrados.push({
            ...entry,
            formaEncontrada,
            palabraOriginal: rawWord
          });
          vistos.add(word);
          break;
        }
      }
    }

    setVerbos(encontrados);
  }, [sceneIndex, texto]);

  if (!verbos.length) {
    return window.React.createElement('div', {
      style: {
        marginTop: 24,
        padding: 20,
        background: '#0f172a',
        borderRadius: 12,
        border: '1px solid #334155',
        color: '#94a3b8',
        textAlign: 'center'
      }
    },
      window.React.createElement('p', { style: { fontSize: '0.95rem' } }, '⚡ No se detectaron verbos en esta escena.')
    );
  }

  return window.React.createElement('div', {
    style: {
      marginTop: 24,
      padding: 20,
      background: '#0f172a',
      borderRadius: 12,
      border: '1px solid #a78bfa'
    }
  },
    // Header
    window.React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16
      }
    },
      window.React.createElement('span', { style: { fontSize: '1.2rem' } }, '⚡'),
      window.React.createElement('h3', {
        style: {
          color: '#c4b5fd',
          margin: 0,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }
      }, 'Verbos detectados (' + verbos.length + ')')
    ),

    // Tabla de verbos
    window.React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    },
      verbos.map((v, i) =>
        window.React.createElement('div', {
          key: i,
          style: {
            background: '#1e293b',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #334155',
            borderLeft: '3px solid ' + (
              v.formaEncontrada === 'infinitiv' ? '#fbbf24' :
              v.formaEncontrada === 'praeteritum' ? '#67e8f9' : '#4ade80'
            )
          }
        },
          // Palabra original destacada
          window.React.createElement('span', {
            style: {
              color: '#fbbf24',
              fontWeight: 700,
              fontSize: '1.05rem',
              minWidth: 100
            }
          }, v.palabraOriginal),

          // Badge de forma encontrada
          window.React.createElement('span', {
            style: {
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 6,
              background: v.formaEncontrada === 'infinitiv' ? '#fbbf2420' :
                          v.formaEncontrada === 'praeteritum' ? '#67e8f920' : '#4ade8020',
              color: v.formaEncontrada === 'infinitiv' ? '#fbbf24' :
                     v.formaEncontrada === 'praeteritum' ? '#67e8f9' : '#4ade80',
              textTransform: 'uppercase'
            }
          }, v.formaEncontrada === 'infinitiv' ? 'INF' :
             v.formaEncontrada === 'praeteritum' ? 'PRÄT' : 'PERF'),

          // → Infinitivo
          window.React.createElement('span', { style: { color: '#e2e8f0', fontSize: '0.9rem' } }, '→'),

          window.React.createElement('span', {
            style: {
              color: '#fbbf24',
              fontWeight: 500,
              fontSize: '0.95rem'
            }
          }, v.infinitiv),

          // Präteritum
          window.React.createElement('span', {
            style: {
              color: '#67e8f9',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              padding: '3px 8px',
              background: '#1e3a5f40',
              borderRadius: 6,
              border: '1px solid #334155'
            }
          }, 'Prät: ' + v.praeteritum),

          // Perfekt
          window.React.createElement('span', {
            style: {
              color: '#4ade80',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              padding: '3px 8px',
              background: '#065f4620',
              borderRadius: 6,
              border: '1px solid #22c55e40'
            }
          }, 'Perf: ' + v.perfekt + ' (' + (v.hilfsverb || 'haben') + ')')
        )
      )
    )
  );
};