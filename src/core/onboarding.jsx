// --- Módulo de Onboarding ---
window.Muller = window.Muller || {};

window.Muller.Onboarding = (function() {
  const STORAGE_KEY = 'muller_onboarding_v1_done';

  const steps = [
    { target: '#nav-dashboard', title: 'Panel Principal', content: 'Tu tablero de control con accesos rápidos y resumen del día.', action: 'click', panel: 'dashboard' },
    { target: '#nav-lectura', title: 'Lectura', content: 'Lee artículos de diferentes niveles y acumula minutos de lectura.', action: 'click', panel: 'lectura' },
    { target: '#nav-escritura', title: 'Escritura', content: 'Practica tu escritura, corrige ortografía y mejora tu estilo.', action: 'click', panel: 'escritura' },
    { target: '#nav-lexikon', title: 'Lexikon', content: 'Amplía tu vocabulario con el sistema de repetición espaciada (SRS).', action: 'click', panel: 'lexikon' },
    { target: '#nav-entrenamiento', title: 'Entrenamiento', content: 'Ejercita gramática, verbos y realiza exámenes cronometrados.', action: 'click', panel: 'entrenamiento' },
    { target: '#nav-progreso', title: 'Progreso y Logros', content: 'Revisa tus estadísticas y desbloquea logros especiales.', action: 'click', panel: 'progreso' },
    { target: '#nav-ajustes', title: 'Ajustes', content: 'Configura tu API Key de IA, temperatura y otras preferencias.', action: 'click', panel: 'ajustes' },
  ];

  let currentStepIndex = -1;
  let active = false;
  let listeners = [];

  function notify() {
    const data = { active, stepIndex: currentStepIndex };
    listeners.forEach(cb => cb(data));
  }

  function setActive(val) {
    active = val;
    if (!val) currentStepIndex = -1;
    notify();
  }

  function startTour() {
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;
    currentStepIndex = 0;
    setActive(true);
  }

  function finishTour() {
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem('muller_onboarding_done', 'true');
    setActive(false);
  }

  function nextStep() {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      notify();
    } else {
      finishTour();
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      notify();
    }
  }

  function getCurrentStep() {
    return steps[currentStepIndex] || null;
  }

  function isActive() {
    return active;
  }

  function getCurrentStepIndex() {
    return currentStepIndex;
  }

  function addChangeListener(cb) {
    listeners.push(cb);
    cb({ active, stepIndex: currentStepIndex });
    return () => {
      listeners = listeners.filter(fn => fn !== cb);
    };
  }

  return {
    steps,
    start: startTour,
    finish: finishTour,
    next: nextStep,
    prev: prevStep,
    getCurrentStep,
    getCurrentStepIndex,
    isActive,
    addChangeListener,
  };
})();

// --- Componente visual OnboardingTour ---
window.OnboardingTour = function OnboardingTour() {
  const [data, setData] = React.useState(() => ({
    active: window.Muller.Onboarding.isActive(),
    stepIndex: window.Muller.Onboarding.getCurrentStepIndex(),
  }));
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0, height: 0 });
  const stepRef = React.useRef(null);

  React.useEffect(() => {
    const unsub = window.Muller.Onboarding.addChangeListener((newData) => {
      setData(newData);
    });
    return unsub;
  }, []);

  const { active, stepIndex } = data;
  const step = active ? window.Muller.Onboarding.steps[stepIndex] : null;

  React.useEffect(() => {
    if (!active || !step) return;

    const updatePosition = () => {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });

        if (step.action === 'click' && stepRef.current?.el !== targetEl) {
          if (stepRef.current) {
            stepRef.current.el.removeEventListener('click', stepRef.current.handler);
          }
          const handler = () => window.Muller.Onboarding.next();
          targetEl.addEventListener('click', handler);
          stepRef.current = { el: targetEl, handler };
        }
      } else {
        window.Muller.Onboarding.next();
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      if (stepRef.current) {
        stepRef.current.el.removeEventListener('click', stepRef.current.handler);
        stepRef.current = null;
      }
    };
  }, [step, active]);

  if (!active || !step) return null;

  const tooltipStyle = {
    position: 'absolute',
    top: position.top + position.height + 12,
    left: position.left,
    minWidth: '280px',
    maxWidth: '320px',
    background: '#1f2937',
    color: 'white',
    padding: '1.25rem',
    borderRadius: '1rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
    zIndex: 10001,
    pointerEvents: 'auto',
    fontSize: '0.95rem',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '-8px',
    left: '20px',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid #1f2937',
  };

  const handleNext = () => window.Muller.Onboarding.next();
  const handlePrev = () => window.Muller.Onboarding.prev();
  const handleSkip = () => window.Muller.Onboarding.finish();

  return ReactDOM.createPortal(
    <div className="onboarding-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, pointerEvents: 'none' }}>
      <div
        className="backdrop"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', pointerEvents: 'auto' }}
        onClick={handleSkip}
      />
      <div style={tooltipStyle} onClick={(e) => e.stopPropagation()}>
        <div style={arrowStyle}></div>
        <div className="text-lg font-bold mb-2">{step.title}</div>
        <p className="mb-4 text-gray-200 leading-relaxed">{step.content}</p>
        <div className="flex justify-between items-center">
          <button
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={stepIndex === 0}
          >
            Anterior
          </button>
          <span className="text-xs text-gray-400">{stepIndex + 1}/{window.Muller.Onboarding.steps.length}</span>
          <button
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
            onClick={handleNext}
          >
            {stepIndex === window.Muller.Onboarding.steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
        <button className="mt-3 text-xs text-gray-400 hover:underline w-full text-center" onClick={handleSkip}>
          Saltar tour
        </button>
      </div>
    </div>,
    document.body
  );
};
