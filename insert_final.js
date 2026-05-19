const fs = require("fs");
const path = "src/features/ruta/LessonView.jsx";
let code = fs.readFileSync(path, "utf8");
const lines = code.split("\n");

// Encontrar la línea con ) : ex.options ? (
let insertAt = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().startsWith(") : ex.options ? (")) {
    insertAt = i;
    break;
  }
}
if (insertAt === -1) {
  console.error("No se encontró la línea para insertar");
  process.exit(1);
}

// Nuevos renders a insertar (cada elemento es una línea)
const newRenders = [
  `           ) : ex.type === "fillInSentence" ? (`,
  `             <div className="space-y-4 mt-4">`,
  `               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>`,
  `               <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">`,
  `                 <p className="text-xl text-white font-serif">`,
  `                   {ex.sentenceWithBlank.split("___").map((part, i) =>`,
  `                     i === 0 ? part : <span key={i}><span className="inline-block mx-1 px-4 py-1 border-2 border-dashed border-amber-400 rounded text-amber-400">___</span>{part}</span>`,
  `                   )}`,
  `                 </p>`,
  `               </div>`,
  `               <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} disabled={inputDisabled} className={"w-full p-4 bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-white text-lg placeholder-slate-400 " + (inputDisabled ? "border-slate-500 opacity-50" : "border-slate-500")} placeholder="Escribe la palabra que falta" />`,
  `               {!inputDisabled && <button onClick={()=>checkAnswer()} className="px-8 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition shadow-md font-semibold">Comprobar</button>}`,
  `             </div>`,
  `           ) : ex.type === "articleChoice" ? (`,
  `             <div className="space-y-4 mt-4">`,
  `               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>`,
  `               <p className="text-2xl text-white font-serif">{ex.word?.[1] || ex.word?.[0]}</p>`,
  `               <div className="flex gap-3">`,
  `                 {ex.options.map((opt, i) => (`,
  `                   <button key={i} onClick={() => checkAnswer(opt)} className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-xl hover:bg-blue-600 hover:border-blue-400 transition font-bold text-white text-xl">`,
  `                     {opt}`,
  `                   </button>`,
  `                 ))}`,
  `               </div>`,
  `             </div>`,
  `           ) : ex.type === "adjectiveDeclension" ? (`,
  `             <div className="space-y-4 mt-4">`,
  `               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>`,
  `               <p className="text-xl text-white font-serif">{ex.sentence}</p>`,
  `               <p className="text-sm text-slate-400">{ex.hint}</p>`,
  `               <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} disabled={inputDisabled} className={"w-full p-4 bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-white text-lg placeholder-slate-400 " + (inputDisabled ? "border-slate-500 opacity-50" : "border-slate-500")} placeholder="Forma correcta del adjetivo" />`,
  `               {!inputDisabled && <button onClick={()=>checkAnswer()} className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-md font-semibold">Comprobar</button>}`,
  `             </div>`,
  `           ) : ex.type === "conjugate" ? (`,
  `             <div className="space-y-4 mt-4">`,
  `               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>`,
  `               <p className="text-2xl text-white font-serif">{ex.verb}</p>`,
  `               <p className="text-lg text-slate-400">Persona: {ex.person}</p>`,
  `               <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} disabled={inputDisabled} className={"w-full p-4 bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none text-white text-lg placeholder-slate-400 " + (inputDisabled ? "border-slate-500 opacity-50" : "border-slate-500")} placeholder="Conjugación..." />`,
  `               {!inputDisabled && <button onClick={()=>checkAnswer()} className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition shadow-md font-semibold">Comprobar</button>}`,
  `             </div>`,
  `           ) : ex.type === "declension" ? (`,
  `             <div className="space-y-4 mt-4">`,
  `               <p className="text-slate-300 text-sm mb-2">{ex.prompt}</p>`,
  `               <p className="text-2xl text-white font-serif">{ex.noun}</p>`,
  `               <p className="text-lg text-slate-400">Caso: {ex.case}</p>`,
  `               <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} disabled={inputDisabled} className={"w-full p-4 bg-slate-700 border-2 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-white text-lg placeholder-slate-400 " + (inputDisabled ? "border-slate-500 opacity-50" : "border-slate-500")} placeholder="Forma declinada..." />`,
  `               {!inputDisabled && <button onClick={()=>checkAnswer()} className="px-8 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition shadow-md font-semibold">Comprobar</button>}`,
  `             </div>`
];

// Insertar antes de la línea encontrada
lines.splice(insertAt, 0, ...newRenders);
fs.writeFileSync(path, lines.join("\n"), "utf8");
console.log("Renders insertados correctamente.");