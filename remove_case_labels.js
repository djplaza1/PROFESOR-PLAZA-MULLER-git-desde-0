const fs = require("fs");
let pg = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");

// 1. Quitar "en caso NOM:" del prompt
pg = pg.replace(/"Completa el adjetivo '" \+ adjClean \+ "' en caso " \+ caseLabel \+ ":\\n\\"" \+ phraseWithBlank \+ "\\""/g,
  '"Completa el adjetivo \'" + adjClean + "\':\\n\\"" + phraseWithBlank + "\\""');

// 2. Quitar el caso y el artículo del hint, dejando solo "Escribe solo la terminación (sin guion)."
pg = pg.replace(/"Caso " \+ caseLabel \+ " \(" \+ targetDet \+ "\)\. Escribe solo la terminación \(sin guion\)\."/g,
  '"Escribe solo la terminación (sin guion)."');

fs.writeFileSync("src/features/ruta/phraseGenerator.js", pg, "utf8");
console.log("Referencias a caso eliminadas de los ejercicios de declinación.");