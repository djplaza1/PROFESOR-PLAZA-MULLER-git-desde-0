const fs = require("fs");

// 1. Hacer backup de LessonView.jsx
fs.copyFileSync("src/features/ruta/LessonView.jsx", "src/features/ruta/LessonView.jsx.bak3");

let code = fs.readFileSync("src/features/ruta/LessonView.jsx", "utf8");

// 2. Evitar que los ejercicios de repaso acumulativo se añadan a failedStack
//    En checkAnswer, justo después de "setFailedStack(prev => [...prev, ex]);" añadiremos una condición
const oldFailedPush = "setFailedStack(prev => [...prev, ex]);";
const newFailedPush = "if (!ex.isCumulativeReview) { setFailedStack(prev => [...prev, ex]); }";
if (code.includes(oldFailedPush)) {
  code = code.replace(oldFailedPush, newFailedPush);
  console.log("Repasos acumulativos excluidos del bucle de fallos.");
} else {
  console.log("No se encontró setFailedStack para modificar.");
}

// 3. En nextExercise, cuando se acaban los ejercicios y hay failedStack,
//    debemos asegurarnos de que failedStack no contenga solo ejercicios de repaso.
//    Modificar la condición: if (!reviewMode && failedStack.length > 0) {
//    cambiarla para que no entre en modo repaso si solo quedan acumulativos
const oldReviewCondition = "if (!reviewMode && failedStack.length > 0) {";
const newReviewCondition = "if (!reviewMode && failedStack.filter(e => !e.isCumulativeReview).length > 0) {";
if (code.includes(oldReviewCondition)) {
  code = code.replace(oldReviewCondition, newReviewCondition);
  console.log("Condición de repaso ajustada para ignorar acumulativos.");
}

// 4. Modificar el render de adjectiveDeclension para que no muestre la terminación con guion
//    y hacer que el input acepte solo la terminación
const adjOld = `className="w-full p-4 bg-slate-700 border-2 ${inputDisabled ? 'border-slate-500 opacity-50' : 'border-slate-500'} rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-white text-lg placeholder-slate-400" placeholder="Forma correcta del adjetivo"`;
const adjNew = `className="w-full p-4 bg-slate-700 border-2 ${inputDisabled ? 'border-slate-500 opacity-50' : 'border-slate-500'} rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-white text-lg placeholder-slate-400" placeholder="Escribe solo la terminación (e, en, em, es, er)"`;
if (code.includes(adjOld)) {
  code = code.replace(adjOld, adjNew);
  console.log("Placeholder de declinación ajustado.");
}

// 5. Añadir un mensaje en el hint para que el usuario entienda que solo ponga la terminación
const adjHintOld = "<p className=\"text-sm text-slate-400\">{ex.hint}</p>";
const adjHintNew = "<p className=\"text-sm text-slate-400\">{ex.hint ? ex.hint.replace('-', '') : 'Escribe solo la terminación (sin guion)'}</p>";
if (code.includes(adjHintOld)) {
  code = code.replace(adjHintOld, adjHintNew);
}

fs.writeFileSync("src/features/ruta/LessonView.jsx", code, "utf8");
console.log("Correcciones aplicadas en LessonView.jsx.");