const fs = require("fs");
const path = "src/features/ruta/phraseGenerator.js";
let code = fs.readFileSync(path, "utf8");

// 1. Asegurarnos de que la clase se llama PhraseGenerator y tiene generateLesson
if (!code.includes("class PhraseGenerator")) {
  console.error("No se encuentra 'class PhraseGenerator'. Revisa el archivo.");
  process.exit(1);
}
if (!code.includes("generateLesson(")) {
  console.error("No se encuentra el método generateLesson. Revisa el archivo.");
  process.exit(1);
}

// 2. Añadir la exportación al final si no existe ya
if (!code.includes("window.Muller.PhraseGenerator")) {
  code += "\nwindow.Muller.PhraseGenerator = new PhraseGenerator();\n";
  fs.writeFileSync(path, code, "utf8");
  console.log("Exportación de PhraseGenerator añadida correctamente.");
} else {
  console.log("PhraseGenerator ya estaba exportado.");
}