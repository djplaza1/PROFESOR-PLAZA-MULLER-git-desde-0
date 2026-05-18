const fs = require("fs");

function checkFile(filePath, levelName) {
  if (!fs.existsSync(filePath)) {
    console.log(`\n=== ${levelName}: archivo no encontrado ===`);
    return;
  }
  console.log(`\n=== ${levelName}: comprobando ${filePath} ===`);
  const raw = fs.readFileSync(filePath, "utf8");
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    console.log("  ERROR: el archivo no es un JSON válido:", e.message);
    return;
  }
  let found = 0;
  for (const [word, phrases] of Object.entries(obj)) {
    phrases.forEach((phrase, idx) => {
      for (const lang of ["de", "es"]) {
        const text = phrase[lang];
        for (let i = 0; i < text.length; i++) {
          const code = text.charCodeAt(i);
          if (code > 127) {
            found++;
            console.log(`  Palabra: "${word}" | Frase ${idx+1} (${lang}): "${text}" -> carácter no ASCII: '${text[i]}' (U+${code.toString(16).toUpperCase()})`);
            break; // solo mostramos un carácter por frase para no saturar
          }
        }
      }
    });
  }
  if (found === 0) {
    console.log("  Ningún carácter no ASCII encontrado. El archivo es completamente seguro.");
  } else {
    console.log(`  Total de frases con caracteres no ASCII: ${found}`);
  }
}

checkFile("src/data/phrasesBank_A2.1.json", "A2.1");
checkFile("src/data/phrasesBank_A2.2.json", "A2.2");