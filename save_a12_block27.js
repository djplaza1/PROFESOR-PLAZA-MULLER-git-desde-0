const fs = require("fs");

// Cargar archivo existente (bloques 1-26)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 27: palabras 1301 a 1309 (último bloque)
const block27 = {
  "Polizei": [
    { "de": "Die Polizei ist schnell am Unfallort.", "es": "La polic\u00EDa est\u00E1 r\u00E1pido en el lugar del accidente." },
    { "de": "Ich habe die Polizei sofort angerufen.", "es": "He llamado a la polic\u00EDa inmediatamente." },
    { "de": "Hast du schon mit der Polizei gesprochen?", "es": "\u00BFHas hablado ya con la polic\u00EDa?" }
  ],
  "Gem\u00FCse": [
    { "de": "Das Gem\u00FCse ist frisch aus dem Garten.", "es": "La verdura es fresca del jard\u00EDn." },
    { "de": "Oma hat das Gem\u00FCse in der Pfanne ged\u00FCnstet.", "es": "La abuela ha rehogado la verdura en la sart\u00E9n." },
    { "de": "Kaufst du dein Gem\u00FCse auf dem Wochenmarkt?", "es": "\u00BFCompras tu verdura en el mercado semanal?" }
  ],
  "Kuchen": [
    { "de": "Der Kuchen duftet nach Zimt.", "es": "El pastel huele a canela." },
    { "de": "Wir haben gestern einen Schokoladenkuchen gebacken.", "es": "Ayer hemos horneado un pastel de chocolate." },
    { "de": "M\u00F6chtest du ein St\u00FCck Kuchen?", "es": "\u00BFQuieres un trozo de pastel?" }
  ],
  "Eule": [
    { "de": "Die Eule dreht ihren Kopf fast ganz herum.", "es": "El b\u00FAho gira la cabeza casi por completo." },
    { "de": "In der Nacht haben wir eine Eule rufen geh\u00F6rt.", "es": "Por la noche hemos o\u00EDdo ulular a un b\u00FAho." },
    { "de": "Hast du schon eine Eule im Wald gesehen?", "es": "\u00BFHas visto ya un b\u00FAho en el bosque?" }
  ],
  "Ei": [
    { "de": "Das Ei ist zum Fr\u00FChst\u00FCck perfekt.", "es": "El huevo es perfecto para el desayuno." },
    { "de": "Ich habe mir ein Ei in die Pfanne geschlagen.", "es": "Me he cascado un huevo en la sart\u00E9n." },
    { "de": "Isst du dein Ei weich oder hart?", "es": "\u00BFComes el huevo pasado por agua o duro?" }
  ],
  "K\u00E4se": [
    { "de": "Der K\u00E4se ist gut gereift.", "es": "El queso est\u00E1 bien curado." },
    { "de": "Er hat den K\u00E4se auf das Brot gelegt.", "es": "\u00C9l ha puesto el queso sobre el pan." },
    { "de": "Magst du lieber milden oder kr\u00E4ftigen K\u00E4se?", "es": "\u00BFPrefieres queso suave o fuerte?" }
  ],
  "das Kino": [
    { "de": "Das Kino hat heute zwei Filme im Programm.", "es": "El cine tiene hoy dos pel\u00EDculas en cartelera." },
    { "de": "Wir sind am Samstag ins Kino gegangen.", "es": "El s\u00E1bado hemos ido al cine." },
    { "de": "Gehst du gern ins Kino oder schaust du lieber zu Hause?", "es": "\u00BFVas al cine con gusto o prefieres ver en casa?" }
  ],
  "Nachname": [
    { "de": "Mein Nachname ist schwer auszusprechen.", "es": "Mi apellido es dif\u00EDcil de pronunciar." },
    { "de": "Sie hat nach der Heirat den Nachnamen gewechselt.", "es": "Ella ha cambiado el apellido despu\u00E9s de casarse." },
    { "de": "Wie lautet dein Nachname?", "es": "\u00BFCu\u00E1l es tu apellido?" }
  ],
  "Deo": [
    { "de": "Das Deo riecht frisch nach Zitrus.", "es": "El desodorante huele fresco a c\u00EDtricos." },
    { "de": "Ich habe mir ein neues Deo im Drogeriemarkt gekauft.", "es": "Me he comprado un desodorante nuevo en la droguer\u00EDa." },
    { "de": "Benutzt du Deo oder lieber einen Roller?", "es": "\u00BFUsas desodorante en spray o prefieres en roll-on?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block27 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 27 (final) a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);