const fs = require("fs");
function rawCheck(ruta) {
  const buf = fs.readFileSync(ruta);
  let count = 0;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] > 127) {
      count++;
      if (count === 1) console.log(`  Primer byte no ASCII en posición ${i}: 0x${buf[i].toString(16)}`);
    }
  }
  console.log(`${ruta}: ${count === 0 ? 'COMPLETAMENTE LIMPIO (solo ASCII)' : 'ATENCIÓN: ' + count + ' bytes no ASCII'}`);
}
rawCheck("src/data/phrasesBank_A2.1.json");
rawCheck("src/data/phrasesBank_A2.2.json");