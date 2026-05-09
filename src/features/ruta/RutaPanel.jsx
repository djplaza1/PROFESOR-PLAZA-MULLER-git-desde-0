// RutaPanel.jsx – Panel principal de la Ruta (ESTILOS VISIBLES)
const { useState, useEffect } = React;

const RutaPanel = () => {
  const levels = window.LevelConfig?.LEVEL_CONFIG || [];
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(window.SRSHelpers?.loadProgress() || { completed: {}, xp: 0, streak: 0 });
  const [view, setView] = useState("levels");

  useEffect(() => {
    if (window.SRSHelpers) window.SRSHelpers.saveProgress(progress);
  }, [progress]);

  const openLesson = (levelId, lessonIdx) => {
    if (!window.PhraseGenerator) return;
    const lesson = window.PhraseGenerator.generateLesson(levelId, lessonIdx);
    if (!lesson) return;
    setActiveLevel(levelId);
    setActiveLesson(lesson);
    setExercises(lesson.exercises || []);
    setCurrentEx(0);
    setUserAnswer("");
    setFeedback(null);
    setView("lesson");
  };

  const checkAnswer = () => {
    if (!exercises[currentEx]) return;
    const ex = exercises[currentEx];
    const isCorrect = (userAnswer || "").trim().toLowerCase() === (ex.answer || "").trim().toLowerCase();
    setFeedback({ correct: isCorrect, answer: ex.answer });
    if (ex.word && window.SRSHelpers) {
      const newProgress = window.SRSHelpers.updateWordSRS(progress, ex.word[0], ex.type, isCorrect);
      newProgress.xp = (newProgress.xp || 0) + (isCorrect ? 10 : 0);
      setProgress(window.SRSHelpers.updateStreak(newProgress));
    }
  };

  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx(currentEx + 1);
      setUserAnswer("");
      setFeedback(null);
    } else {
      const lessonId = activeLesson?.id;
      if (lessonId) {
        const newProgress = { ...progress };
        newProgress.completed[lessonId] = true;
        setProgress(newProgress);
      }
      setView("levels");
      setActiveLesson(null);
    }
  };

  // ─── ESTILOS INLINE (para asegurar visibilidad) ───
  const containerStyle = {
    padding: "1.5rem",
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  };
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb"
  };
  const buttonStyle = {
    padding: "0.5rem 0.25rem",
    margin: "0.2rem",
    fontSize: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#dbeafe",
    color: "#1e3a5f",
    cursor: "pointer",
    minWidth: "2rem"
  };

  if (view === "lesson") {
    const ex = exercises[currentEx];
    if (!ex) return null;
    return React.createElement("div", { style: containerStyle },
      React.createElement("h2", { style: { fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" } }, activeLesson?.title + " – " + ex.type),
      React.createElement("div", { style: { ...cardStyle, backgroundColor: "#f3f4f6" } },
        React.createElement("p", { style: { marginBottom: "0.5rem", fontWeight: "500" } }, ex.prompt),
        ex.options ?
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" } },
            ex.options.map((opt, i) =>
              React.createElement("button", {
                key: i,
                onClick: () => { setUserAnswer(opt); checkAnswer(); },
                style: { padding: "0.5rem", textAlign: "left", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#ffffff", cursor: "pointer" }
              }, opt)
            )
          ) :
          React.createElement("div", null,
            React.createElement("input", {
              type: "text",
              value: userAnswer,
              onChange: (e) => setUserAnswer(e.target.value),
              style: { width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #d1d5db", marginBottom: "0.5rem" },
              onKeyDown: (e) => { if (e.key === "Enter") checkAnswer(); }
            }),
            React.createElement("button", {
              onClick: checkAnswer,
              style: { padding: "0.5rem 1.5rem", backgroundColor: "#1e40af", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }
            }, "Comprobar")
          )
      ),
      feedback &&
        React.createElement("div", {
          style: { padding: "0.75rem", borderRadius: "8px", marginTop: "0.75rem", backgroundColor: feedback.correct ? "#d1fae5" : "#fee2e2", color: feedback.correct ? "#065f46" : "#991b1b" }
        }, feedback.correct ? "\u2705 \u00a1Correcto!" : "\u274c Incorrecto. La respuesta era: " + feedback.answer),
      feedback &&
        React.createElement("button", {
          onClick: nextExercise,
          style: { marginTop: "1rem", padding: "0.5rem 1.5rem", backgroundColor: "#6b7280", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }
        }, currentEx < exercises.length - 1 ? "Siguiente \u2192" : "Finalizar lecci\u00f3n")
    );
  }

  // Vista principal de niveles
  return React.createElement("div", { style: containerStyle },
    React.createElement("h2", { style: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" } }, "\uD83D\uDDFA\uFE0F Ruta de Aprendizaje"),
    React.createElement("p", { style: { fontSize: "0.9rem", color: "#4b5563", marginBottom: "1.5rem" } },
      (Object.keys(progress.completed || {}).length) + " lecciones completadas \u00b7 " + (progress.xp || 0) + " XP \u00b7 Racha: " + (progress.streak || 0) + " d\u00edas"
    ),
    levels.map((level, idx) => {
      const isUnlocked = idx === 0 || (levels[idx-1]?.lessons > 0 && Object.keys(progress.completed || {}).some(c => c.startsWith(levels[idx-1].id + "-l")));
      const lessonsCompleted = Object.keys(progress.completed || {}).filter(c => c.startsWith(level.id + "-l")).length;
      return React.createElement("div", { key: level.id, style: { ...cardStyle, opacity: isUnlocked ? 1 : 0.5 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("h3", { style: { fontWeight: "600" } }, level.badge + " " + level.title + " (" + level.words + " palabras)"),
          React.createElement("span", { style: { fontSize: "0.8rem" } }, lessonsCompleted + "/" + level.lessons + " lecciones")
        ),
        isUnlocked && level.lessons > 0 ?
          React.createElement("div", { style: { marginTop: "0.75rem", display: "flex", flexWrap: "wrap" } },
            Array.from({ length: level.lessons }, (_, i) =>
              React.createElement("button", {
                key: i,
                onClick: () => openLesson(level.id, i),
                style: {
                  ...buttonStyle,
                  backgroundColor: progress.completed?.[level.id + "-l" + (i+1)] ? "#bbf7d0" : "#dbeafe"
                }
              }, i + 1)
            )
          ) : null
      );
    })
  );
};

window.RutaPanel = RutaPanel;

// Registrar en el sistema de paneles
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};
window.Muller.Panels.ruta = RutaPanel;
