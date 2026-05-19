const fs = require("fs");
let loader = fs.readFileSync("src/data/phrasesBankLoader.js", "utf8");

// Añadir el almacenamiento por nivel justo después de Object.assign(bank, json);
const oldLine = "Object.assign(bank, json);";
const newLine = "Object.assign(bank, json);\n      // También guardar por nivel para el generador\n      bank[entry.level] = json;";
if (loader.includes(oldLine) && !loader.includes("bank[entry.level]")) {
  loader = loader.replace(oldLine, newLine);
  fs.writeFileSync("src/data/phrasesBankLoader.js", loader, "utf8");
  console.log("Loader actualizado: las frases ahora se indexan por nivel.");
} else {
  console.log("El loader ya tiene el índice por nivel o no se encontró la línea.");
}