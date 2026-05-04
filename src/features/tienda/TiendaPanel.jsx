// ═══════════════════════════════════════════════════
// TIENDA – Plaza Münzen Shop
// Gasta tus Plaza Münzen en temas, avatares, potenciadores
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels.tienda = function TiendaPanel({ session }) {
  const P = window.Muller.Progreso;
  const [balance, setBalance] = React.useState(P ? P.getPlazaMuenzen() : 0);
  const [purchases, setPurchases] = React.useState(() => {
    try {
      const key = window.Muller.KEYS?.SHOP_PURCHASES || 'muller_shop_purchases_v1';
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) { return {}; }
  });
  const [toast, setToast] = React.useState(null);

  // Artículos de la tienda
  const items = [
    {
      id: 'xp_boost_2x',
      name: '✖2 XP Boost',
      description: 'Ganas el doble de XP durante 30 minutos',
      price: 50,
      category: 'potenciador',
      emoji: '⚡',
      bgColor: 'rgba(168,85,247,0.15)',
      borderColor: '#a855f7'
    },
    {
      id: 'xp_boost_3x',
      name: '✖3 XP Boost',
      description: 'Ganas el triple de XP durante 15 minutos',
      price: 100,
      category: 'potenciador',
      emoji: '🔥',
      bgColor: 'rgba(251,191,36,0.15)',
      borderColor: '#fbbf24'
    },
    {
      id: 'theme_cyan',
      name: 'Tema Cyan Profundo',
      description: 'Cambia el color acento a cyan brillante',
      price: 200,
      category: 'tema',
      emoji: '🎨',
      bgColor: 'rgba(6,182,212,0.15)',
      borderColor: '#06b6d4'
    },
    {
      id: 'theme_rose',
      name: 'Tema Rosa',
      description: 'Un look rosa elegante para la app',
      price: 200,
      category: 'tema',
      emoji: '🌹',
      bgColor: 'rgba(244,63,94,0.15)',
      borderColor: '#f43f5e'
    },
    {
      id: 'theme_gold',
      name: 'Tema Dorado',
      description: 'Estilo premium dorado',
      price: 300,
      category: 'tema',
      emoji: '👑',
      bgColor: 'rgba(251,191,36,0.15)',
      borderColor: '#fbbf24'
    },
    {
      id: 'avatar_owl',
      name: 'Avatar Búho Sabio',
      description: 'Desbloquea el avatar del búho maestro',
      price: 150,
      category: 'avatar',
      emoji: '🦉',
      bgColor: 'rgba(34,197,94,0.15)',
      borderColor: '#22c55e'
    },
    {
      id: 'avatar_dragon',
      name: 'Avatar Dragón',
      description: 'Desbloquea el avatar del dragón de fuego',
      price: 250,
      category: 'avatar',
      emoji: '🐉',
      bgColor: 'rgba(239,68,68,0.15)',
      borderColor: '#ef4444'
    },
    {
      id: 'streak_freeze',
      name: '❄️ Congelar Racha',
      description: 'Protege tu racha por 1 día si fallas',
      price: 80,
      category: 'potenciador',
      emoji: '🧊',
      bgColor: 'rgba(59,130,246,0.15)',
      borderColor: '#3b82f6'
    },
  ];

  const buyItem = (item) => {
    if (!P) return;
    if (purchases[item.id] && item.category !== 'potenciador') {
      showToast('Ya tienes este artículo');
      return;
    }
    const result = P.spendPlazaMuenzen(item.price, item.name);
    if (result.ok) {
      setBalance(result.balance);
      // Guardar compra
      const key = window.Muller.KEYS?.SHOP_PURCHASES || 'muller_shop_purchases_v1';
      const newPurchases = { ...purchases, [item.id]: { boughtAt: new Date().toISOString(), name: item.name } };
      setPurchases(newPurchases);
      localStorage.setItem(key, JSON.stringify(newPurchases));
      // Disparar evento global para actualizar TopBar
      window.dispatchEvent(new Event('plaza-coins-changed'));
      showToast('✅ ' + item.name + ' adquirido');
    } else {
      showToast('❌ ' + result.reason);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const isOwned = (itemId, category) => {
    if (category === 'potenciador') {
      // Los potenciadores se compran cada vez (consumibles)
      return false;
    }
    return !!purchases[itemId];
  };

  // Separar por categorías
  const categorias = [
    { id: 'tema', label: '🎨 Temas', items: items.filter(i => i.category === 'tema') },
    { id: 'avatar', label: '🦉 Avatares', items: items.filter(i => i.category === 'avatar') },
    { id: 'potenciador', label: '⚡ Potenciadores', items: items.filter(i => i.category === 'potenciador') },
  ];

  return React.createElement('div', {
    style: { padding: 16, maxWidth: 600, margin: '0 auto' }
  },
    // Encabezado con saldo
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }
    },
      React.createElement('h2', { style: { margin: 0, fontSize: '1.2rem', color: '#e2e8f0' } }, '🏪 Tienda Plaza'),
      React.createElement('div', {
        style: {
          background: 'rgba(251,191,36,0.12)',
          borderRadius: 8,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }
      },
        React.createElement('img', {
          src: 'assets/icons/profesor-plaza-muller-logo.jpg',
          alt: '₿',
          style: { width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }
        }),
        React.createElement('span', { style: { color: '#fbbf24', fontWeight: 700, fontSize: '1rem' } }, balance)
      )
    ),

    // Grid de categorías
    categorias.map(cat => React.createElement('div', {
      key: cat.id,
      style: { marginBottom: 20 }
    },
      React.createElement('h3', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 10, marginTop: 0 } }, cat.label),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 } },
        cat.items.map(item => {
          const owned = isOwned(item.id, item.category);
          return React.createElement('div', {
            key: item.id,
            style: {
              background: item.bgColor,
              border: '1px solid ' + (owned ? '#22c55e' : item.borderColor),
              borderRadius: 12,
              padding: 12,
              cursor: owned ? 'default' : 'pointer',
              opacity: owned ? 0.6 : 1,
              transition: 'all 0.15s'
            },
            onClick: () => !owned && buyItem(item)
          },
            React.createElement('div', { style: { fontSize: '1.5rem', marginBottom: 6, textAlign: 'center' } }, item.emoji),
            React.createElement('div', { style: { fontWeight: 600, color: '#e2e8f0', fontSize: '0.8rem', marginBottom: 4 } }, item.name),
            React.createElement('div', { style: { color: '#94a3b8', fontSize: '0.7rem', marginBottom: 8 } }, item.description),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center' } },
              owned
                ? React.createElement('span', { style: { color: '#22c55e', fontSize: '0.75rem', fontWeight: 600 } }, '✅ Adquirido')
                : React.createElement('div', {
                  style: {
                    background: 'rgba(251,191,36,0.2)',
                    borderRadius: 6,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }
                },
                  React.createElement('img', {
                    src: 'assets/icons/profesor-plaza-muller-logo.jpg',
                    alt: '₿',
                    style: { width: 14, height: 14, borderRadius: '50%', objectFit: 'cover' }
                  }),
                  React.createElement('span', { style: { color: '#fbbf24', fontWeight: 700, fontSize: '0.8rem' } }, item.price)
                )
            )
          );
        })
      )
    )),

    // Historial de transacciones
    React.createElement('div', { style: { marginTop: 20 } },
      React.createElement('h3', { style: { color: '#94a3b8', fontSize: '0.85rem', marginBottom: 8 } }, '📜 Historial'),
      React.createElement('div', {
        style: {
          background: '#1e293b',
          borderRadius: 8,
          padding: 12,
          maxHeight: 200,
          overflowY: 'auto'
        }
      },
        (P ? P.getPlazaMuenzenHistory() : []).slice(0, 10).map((tx, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 0',
              borderBottom: i < 9 ? '1px solid #334155' : 'none',
              fontSize: '0.75rem'
            }
          },
            React.createElement('div', { style: { color: '#94a3b8' } }, tx.reason || 'Transacción'),
            React.createElement('span', {
              style: {
                color: tx.type === 'earn' ? '#34d399' : '#f87171',
                fontWeight: 600
              }
            }, tx.type === 'earn' ? '+' : '-', tx.amount)
          )
        )
      )
    ),

    // Toast
    toast && React.createElement('div', {
      style: {
        position: 'fixed',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 8,
        padding: '10px 20px',
        color: '#e2e8f0',
        fontSize: '0.85rem',
        zIndex: 999,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }
    }, toast)
  );
};