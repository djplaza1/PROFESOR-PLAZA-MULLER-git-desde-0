const fs = require("fs");
let code = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// Aumentar límite total a 25 ejercicios (wordsPerLesson * 2.5 en lugar de *2)
code = code.replace(/exercises\.length < wordsPerLesson \* 2\)/g, "exercises.length < 25)");
code = code.replace(/exercises\.length >= wordsPerLesson \* 2\)/g, "exercises.length >= 25)");
code = code.replace(/if \(exercises\.length < wordsPerLesson \* 3\)/g, "if (exercises.length < 25)");

// Garantizar al menos 1 de cada tipo basado en frases (en lugar de Math.min(3, Math.max(1, ...)) usar Math.max(1, ...) para forzar al menos 1)
code = code.replace(/var adjDeclCount = Math\.min\(3, Math\.max\(1, Math\.floor\(wordsPerLesson \* 0\.1\)\)\);/g, "var adjDeclCount = Math.min(3, Math.max(1, 1));");
code = code.replace(/var artCount = Math\.min\(3, Math\.max\(1, Math\.floor\(wordsPerLesson \* 0\.1\)\)\);/g, "var artCount = Math.min(3, Math.max(1, 1));");
code = code.replace(/var orderCount = Math\.min\(3, Math\.max\(1, Math\.floor\(wordsPerLesson \* 0\.1\)\)\);/g, "var orderCount = Math.min(3, Math.max(1, 1));");
code = code.replace(/var fillCount = Math\.min\(3, Math\.max\(1, Math\.floor\(wordsPerLesson \* 0\.1\)\)\);/g, "var fillCount = Math.min(3, Math.max(1, 1));");
code = code.replace(/var pronCount = Math\.min\(4, Math\.max\(2, Math\.floor\(wordsPerLesson \* 0\.15\)\)\);/g, "var pronCount = Math.min(4, Math.max(1, 1));");

// Ajustar límite de matchPairs para que solo se añadan si faltan ejercicios hasta 25
// (esto ya está controlado por el límite general)

fs.writeFileSync("src/features/ruta/phraseGenerator.js", code, "utf8");
console.log("Generador ajustado para 25 ejercicios por lección con todos los tipos.");