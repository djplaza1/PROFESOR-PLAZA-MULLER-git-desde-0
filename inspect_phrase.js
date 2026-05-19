const fs = require("fs");
const code = fs.readFileSync("src/features/ruta/phraseGenerator.js", "utf8");
console.log("=== PRIMERAS 300 LÍNEAS ===");
console.log(code.split("\n").slice(0, 30).join("\n"));
console.log("\n=== ÚLTIMAS 20 LÍNEAS ===");
console.log(code.split("\n").slice(-20).join("\n"));