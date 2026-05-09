const { useState } = React;
const RutaPanel = () => {
  const [view] = useState('reconstruction');
  if (view === 'reconstruction') {
    return (
      <div className='p-4'>
        <h2 className='text-xl font-bold'>Ruta en reconstrucción</h2>
        <p>Estamos preparando un nuevo sistema de aprendizaje.</p>
      </div>
    );
  }
  return null;
};
window.RutaPanel = RutaPanel;
