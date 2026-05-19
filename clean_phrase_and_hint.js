const fs = require("fs");

// 1. Corregir phraseWithBlank para que no muestre pistas (eliminar letras tras ___)
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
// Después de generar phraseWithBlank, añadir limpieza: phraseWithBlank = phraseWithBlank.replace(/(___)s?\w?/g, "___");
// Buscar la línea donde se asigna phraseWithBlank y añadir la limpieza justo después
const oldAssign = "var phraseWithBlank = p.de.replace(new RegExp(adjClean.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + \"(e|er|es|em|en)\", \"i\"), \"___\");";
const newAssign = oldAssign + "\n      // Limpiar cualquier letra residual tras ___ para eliminar pistas\n      phraseWithBlank = phraseWithBlank.replace(/___\\w*/g, \"___\");";
if (pg.includes(oldAssign)) {
  pg = pg.replace(oldAssign, newAssign);
  console.log("Limpieza de pistas en frase añadida.");
} else {
  console.log("No se encontró la línea phraseWithBlank. Revisa manualmente.");
}

// 2. Cambiar el hint para que NO muestre el artículo objetivo ni caso (ya lo hicimos, pero asegurarnos)
// 3. Quitar la segunda aparición de la frase en el prompt (lo dejamos solo una vez, la del prompt)
// En el prompt ya se muestra la frase. Luego en el render se muestra de nuevo el prompt? Eso está en LessonView.jsx.
// Vamos a modificar el render de adjectiveDeclension para que en lugar de mostrar el prompt (que ya contiene la frase),
// muestre solo la traducción si está disponible.
// Pero el prompt actual ya incluye la frase. Para evitar duplicados, haremos que el prompt solo contenga la instrucción
// y la frase con hueco, y luego abajo mostraremos la traducción.
// Modificaremos el objeto del ejercicio para incluir translation y luego en LessonView lo mostraremos.

// En el push del ejercicio, añadir una propiedad translation: p.es (ya existe pero por si acaso)
// El render actual en LessonView.jsx para adjectiveDeclension muestra {ex.prompt} y luego el input.
// Vamos a cambiarlo para que muestre el prompt (que es la frase con hueco) y luego un texto pequeño con la traducción.
// Para no liarnos, podemos simplemente eliminar la repetición: el prompt ya contiene la frase, no hace falta repetirla.
// Pero el usuario ve la frase dos veces: una en el prompt y otra no sabe dónde. Puede ser el "speakText" que se muestra en alguna parte?
// Revisemos el render de LessonView.jsx para adjectiveDeclension. En el código que insertamos antes no hay repetición.
// Puede que el problema sea que el prompt es muy largo y el input está justo debajo, y parece que se repite?
// Vamos a dejar el render como está, pero asegurarnos de que la frase con hueco no tenga pistas (ya lo hicimos).

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("phraseGenerator.js actualizado.");
