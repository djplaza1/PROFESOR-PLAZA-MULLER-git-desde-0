// Hook useLocalStorage (versión global para app.jsx)
window.Muller = window.Muller || {};
window.Muller.useLocalStorage = (key, initial) => {
  const [val, setVal] = React.useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : initial; } catch(e) { return initial; }
  });
  React.useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} }, [key, val]);
  return [val, setVal];
};
window.Muller.useLocalStorageBool = (key, initial = true) => {
  const [val, setVal] = React.useState(() => { try { const v=localStorage.getItem(key); return v!==null ? v!=='0' : initial; } catch(e) { return initial; } });
  React.useEffect(() => { try { localStorage.setItem(key, val?'1':'0'); } catch(e) {} }, [key, val]);
  return [val, setVal];
};
