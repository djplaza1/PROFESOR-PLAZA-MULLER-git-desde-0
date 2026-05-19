const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
let code = fs.readFileSync(path, "utf8");

// Buscar el marcador donde empieza el render genérico (suele tener "return (")
const renderStart = code.indexOf("return (");
if (renderStart === -1) {
  console.log("No se encontró 'return (' para insertar renders.");
  process.exit(1);
}

// Nuevo código de renders que se insertará ANTES del return (
const newRenders = `
  // ===== RENDERS ESPECÍFICOS POR TIPO DE EJERCICIO =====
  const renderSpecificExercise = () => {
    const ex = exercises[currentEx];
    if (!ex) return null;

    // 1. fillInSentence (completar hueco en frase)
    if (ex.type === 'fillInSentence') {
      const parts = ex.sentenceWithBlank.split('___');
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-xl text-white mb-3 font-serif">
            {parts[0]}<span className="inline-block mx-1 px-4 py-1 border-2 border-dashed border-amber-400 rounded text-amber-400">___</span>{parts[1]}
          </p>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-lg"
            placeholder="Escribe la palabra que falta"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
        </div>
      );
    }

    // 2. order (ordenar palabras)
    if (ex.type === 'order') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {ex.scrambledWords.map((w, i) => (
              <button
                key={i}
                onClick={() => setUserAnswer(prev => (prev ? prev + ' ' + w : w))}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {w}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 outline-none text-lg"
            placeholder="Frase ordenada correctamente..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
          <button
            onClick={() => setUserAnswer('')}
            className="mt-2 text-sm text-gray-400 hover:text-white"
          >
            Limpiar
          </button>
        </div>
      );
    }

    // 3. pronounce (grabar voz)
    if (ex.type === 'pronounce') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-2xl text-white mb-4 font-serif">"{ex.sentence}"</p>
          <button
            onClick={() => {
              const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
              if (!SpeechRecognition) { alert("Tu navegador no soporta reconocimiento de voz."); return; }
              const rec = new SpeechRecognition();
              rec.lang = 'de-DE';
              rec.interimResults = false;
              rec.maxAlternatives = 1;
              rec.start();
              rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserAnswer(transcript);
                setSubmittedAnswer(transcript);
                checkAnswer(transcript);
              };
              rec.onerror = (event) => console.error("Error de voz:", event.error);
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-bold"
          >
            🎤 Grabar respuesta
          </button>
          {userAnswer && <p className="mt-3 text-gray-400">Transcripción: {userAnswer}</p>}
        </div>
      );
    }

    // 4. articleChoice (elegir artículo)
    if (ex.type === 'articleChoice') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-2xl text-white mb-4 font-serif">{ex.word?.[1] || ex.word?.[0]}</p>
          <div className="flex gap-3">
            {ex.options.map(opt => (
              <button
                key={opt}
                onClick={() => { setUserAnswer(opt); setSubmittedAnswer(opt); checkAnswer(opt); }}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition text-xl font-bold"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // 5. adjectiveDeclension (declinar adjetivo)
    if (ex.type === 'adjectiveDeclension') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-xl text-white mb-3 font-serif">{ex.sentence}</p>
          <p className="text-sm text-gray-400 mb-3">{ex.hint}</p>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-lg"
            placeholder="Forma correcta del adjetivo"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
        </div>
      );
    }

    // 6. conjugate (conjugar verbo)
    if (ex.type === 'conjugate') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-xl text-white mb-2 font-serif">{ex.verb}</p>
          <p className="text-sm text-gray-400 mb-3">Persona: {ex.person}</p>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-lg"
            placeholder="Conjugación..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
        </div>
      );
    }

    // 7. declension (declinar sustantivo)
    if (ex.type === 'declension') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <p className="text-xl text-white mb-2 font-serif">{ex.noun}</p>
          <p className="text-sm text-gray-400 mb-3">Caso: {ex.case}</p>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-lg"
            placeholder="Forma declinada..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
        </div>
      );
    }

    // 8. fill (escribir traducción o respuesta, similar a translate)
    if (ex.type === 'fill') {
      return (
        <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
          <p className="text-lg text-gray-300 mb-3">{ex.prompt}</p>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-amber-400 outline-none text-lg"
            placeholder="Tu respuesta"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer(null)}
          />
        </div>
      );
    }

    return null; // Si no coincide con ningún tipo específico, se usa el genérico
  };

  const specificRender = renderSpecificExercise();
`;

// Insertar los nuevos renders justo ANTES del primer "return (" del JSX principal
code = code.slice(0, renderStart) + newRenders + "\n" + code.slice(renderStart);

// Y ahora añadir el render condicional en el JSX (reemplazar el render genérico por {specificRender || (...)})
// Buscar el inicio del render genérico dentro del JSX
const jsxReturnIdx = code.lastIndexOf("return (");
if (jsxReturnIdx !== -1) {
  // Buscar el primer hijo del return para envolverlo
  const afterReturn = code.slice(jsxReturnIdx + 8);
  const firstChildMatch = afterReturn.match(/(\s*<div)/);
  if (firstChildMatch) {
    const insertBefore = afterReturn.slice(0, firstChildMatch.index) + "{specificRender || (" + afterReturn.slice(firstChildMatch.index);
    // Cerrar el paréntesis antes de cerrar el return
    const lastParen = insertBefore.lastIndexOf(")");
    if (lastParen !== -1) {
      const modified = insertBefore.slice(0, lastParen) + ")}" + insertBefore.slice(lastParen);
      code = code.slice(0, jsxReturnIdx + 8) + modified;
    }
  }
}

fs.writeFileSync(path, code, "utf8");
console.log("LessonView.jsx actualizado con renders específicos.");