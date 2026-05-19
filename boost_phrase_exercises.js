const fs = require("fs");
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// Cambiar cada tipo de frase de mínimo 1 a mínimo 2
pg = pg.replace("var adjDeclCount = Math.min(3, Math.max(1, 1));", "var adjDeclCount = Math.min(4, Math.max(2, 2));");
pg = pg.replace("var artCount = Math.min(3, Math.max(1, 1));", "var artCount = Math.min(4, Math.max(2, 2));");
pg = pg.replace("var orderCount = Math.min(3, Math.max(1, 1));", "var orderCount = Math.min(4, Math.max(2, 2));");
pg = pg.replace("var fillCount = Math.min(3, Math.max(1, 1));", "var fillCount = Math.min(4, Math.max(2, 2));");
pg = pg.replace("var pronCount = Math.min(4, Math.max(1, 1));", "var pronCount = Math.min(5, Math.max(2, 2));");

// Reducir el número de ejercicios de vocabulario para que no llenen los 25 antes de tiempo
// Cambiar el límite de wordsPerLesson * 2.5 a wordsPerLesson * 1.5 (aprox 15) para vocabulario
pg = pg.replace(/exercises\.length < 25\)/g, "exercises.length < 15)");
pg = pg.replace(/exercises\.length >= 25\)/g, "exercises.length >= 15)");

// Pero mantener el límite total en 25: después de los ejercicios de frases y vocabulario, rellenar hasta 25 con matchPairs
pg = pg.replace(/if \(exercises\.length < 25\) \{[\s\S]*?audioMatchCount[\s\S]*?\n\s+\}/m, 
  "if (exercises.length < 25) {\n      var matchCount = Math.min(5, allValid.length);\n      for (var r = 0; r < 3; r++) {\n        if (exercises.length >= 25) break;\n        var matchWords = this.selectUniquePairs(allValid, matchCount);\n        if (matchWords.length < 2) break;\n        var dePairs = matchWords.map(function(w) { return this.canonizeNoun(w); }.bind(this));\n        var esPairs = matchWords.map(function(w) { return w[1]; });\n        exercises.push({\n          type: \"matchPairs\",\n          prompt: \"Empareja cada palabra en alemán con su traducción en español\",\n          pairs: dePairs.map(function(de, i) { return { de: de, es: esPairs[i] }; }),\n          leftColumn: this.shuffle(dePairs),\n          rightColumn: this.shuffle(esPairs),\n          hint: \"Selecciona una palabra de la izquierda y luego su traducción de la derecha.\",\n          word: matchWords[0]\n        });\n      }\n\n      if (exercises.length < 25) {\n        var audioMatchCount = Math.min(4, allValid.length);\n        var audioMatchWords = this.selectUniquePairs(allValid, audioMatchCount);\n        if (audioMatchWords.length >= 2) {\n          var audioDePairs = audioMatchWords.map(function(w) { return this.canonizeNoun(w); }.bind(this));\n          var audioEsPairs = audioMatchWords.map(function(w) { return w[1]; });\n          exercises.push({\n            type: \"audioMatch\",\n            prompt: \"Escucha y empareja cada palabra con su traducción\",\n            pairs: audioDePairs.map(function(de, i) { return { de: de, es: audioEsPairs[i] }; }),\n            leftColumn: audioDePairs,\n            rightColumn: this.shuffle(audioEsPairs),\n            hint: \"Pulsa un altavoz para escuchar la palabra y luego selecciona su traducción.\",\n            word: audioMatchWords[0]\n          });\n        }\n      }\n    }");

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("Contadores ajustados para dar prioridad a ejercicios de frases.");