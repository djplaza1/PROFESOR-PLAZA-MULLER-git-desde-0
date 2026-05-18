const fs = require("fs");

function escaparYVerificar(ruta) {
  if (!fs.existsSync(ruta)) {
    console.log(`${ruta}: no existe.`);
    return;
  }
  // Leer y parsear
  const raw = fs.readFileSync(ruta, "utf8");
  let obj;
  try { obj = JSON.parse(raw); } catch(e) {
    console.log(`${ruta}: JSON inválido - ${e.message}`);
    return;
  }
  // Stringificar y escapar
  const normal = JSON.stringify(obj, null, 2);
  const escapado = normal.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
  fs.writeFileSync(ruta, escapado, "utf8");
  console.log(`${ruta}: guardado (${Object.keys(obj).length} palabras).`);

  // Verificar inmediatamente
  const verificado = fs.readFileSync(ruta, "utf8");
  const objV = JSON.parse(verificado);
  let sucios = 0;
  for (const [palabra, frases] of Object.entries(objV)) {
    for (const [idx, frase] of frases.entries()) {
      for (const lang of ["de", "es"]) {
        const texto = frase[lang];
        for (let i=0; i<texto.length; i++) {
          if (texto.charCodeAt(i) > 127) {
            if (sucios === 0) {
              console.log(`  PRIMERA FRASE CON NO ASCII: ${palabra} frase ${idx+1} (${lang}): "${texto}"`);
            }
            sucios++;
            break;
          }
        }
      }
    }
  }
  if (sucios === 0) console.log(`  VERIFICACIÓN: archivo completamente limpio.`);
  else console.log(`  VERIFICACIÓN: aún hay ${sucios} frases con caracteres no ASCII.`);
}

escaparYVerificar("src/data/phrasesBank_A2.1.json");
console.log("---");
escaparYVerificar("src/data/phrasesBank_A2.2.json");