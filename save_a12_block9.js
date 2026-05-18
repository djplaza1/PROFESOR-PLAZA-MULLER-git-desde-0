const fs = require("fs");

// Cargar archivo existente (bloques 1-8)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 9: palabras 401 a 450
const block9 = {
  "Kreide": [
    { "de": "Die Kreide ist weiß.", "es": "La tiza es blanca." },
    { "de": "Der Lehrer hat mit Kreide an die Tafel geschrieben.", "es": "El profesor ha escrito con tiza en la pizarra." },
    { "de": "Kannst du mir ein Stück Kreide geben?", "es": "¿Puedes darme un trozo de tiza?" }
  ],
  "Puls": [
    { "de": "Der Puls ist normal.", "es": "El pulso es normal." },
    { "de": "Die Krankenschwester hat meinen Puls gemessen.", "es": "La enfermera me ha medido el pulso." },
    { "de": "Fühlst du deinen Puls am Handgelenk?", "es": "¿Sientes el pulso en la muñeca?" }
  ],
  "das Abteil": [
    { "de": "Das Abteil ist für sechs Personen.", "es": "El compartimento es para seis personas." },
    { "de": "Wir haben ein Abteil im Zug reserviert.", "es": "Hemos reservado un compartimento en el tren." },
    { "de": "Ist das Abteil rauchfrei?", "es": "¿Es libre de humo el compartimento?" }
  ],
  "Knoblauch": [
    { "de": "Der Knoblauch riecht intensiv.", "es": "El ajo huele intenso." },
    { "de": "Ich habe den Knoblauch in die Pfanne gepresst.", "es": "He prensado el ajo en la sartén." },
    { "de": "Benutzt du frischen Knoblauch oder Pulver?", "es": "¿Usas ajo fresco o en polvo?" }
  ],
  "Pilz": [
    { "de": "Der Pilz wächst im Wald.", "es": "El champiñón crece en el bosque." },
    { "de": "Wir haben Pilze für die Suppe gesammelt.", "es": "Hemos recogido champiñones para la sopa." },
    { "de": "Kennst du essbare Pilze?", "es": "¿Conoces los champiñones comestibles?" }
  ],
  "Duschgel": [
    { "de": "Das Duschgel duftet nach Aloe Vera.", "es": "El gel de ducha huele a aloe vera." },
    { "de": "Ich habe ein neues Duschgel gekauft.", "es": "He comprado un gel de ducha nuevo." },
    { "de": "Benutzt du Duschgel oder Seife?", "es": "¿Usas gel de ducha o jabón?" }
  ],
  "Hähnchen": [
    { "de": "Das Hähnchen ist knusprig.", "es": "El pollo está crujiente." },
    { "de": "Mama hat das Hähnchen im Ofen gebraten.", "es": "Mamá ha asado el pollo en el horno." },
    { "de": "Isst du lieber Hähnchen oder Rindfleisch?", "es": "¿Prefieres pollo o ternera?" }
  ],
  "der Monat": [
    { "de": "Der Monat hat dreißig Tage.", "es": "El mes tiene treinta días." },
    { "de": "Sie hat den ganzen Monat hart gearbeitet.", "es": "Ella ha trabajado duro todo el mes." },
    { "de": "Welcher Monat kommt nach dem März?", "es": "¿Qué mes viene después de marzo?" }
  ],
  "der Falke": [
    { "de": "Der Falke fliegt sehr schnell.", "es": "El halcón vuela muy rápido." },
    { "de": "Wir haben einen Falken am Himmel gesehen.", "es": "Hemos visto un halcón en el cielo." },
    { "de": "Kann ein Falke eine Taube fangen?", "es": "¿Puede un halcón atrapar una paloma?" }
  ],
  "Regenjacke": [
    { "de": "Die Regenjacke ist wasserdicht.", "es": "La chaqueta de lluvia es impermeable." },
    { "de": "Ich habe die Regenjacke im Rucksack verstaut.", "es": "He guardado la chaqueta de lluvia en la mochila." },
    { "de": "Nimmst du deine Regenjacke mit?", "es": "¿Te llevas la chaqueta de lluvia?" }
  ],
  "die Bürste": [
    { "de": "Die Bürste hat weiche Borsten.", "es": "El cepillo tiene cerdas suaves." },
    { "de": "Er hat die Bürste für die Schuhe benutzt.", "es": "Él ha usado el cepillo para los zapatos." },
    { "de": "Wo ist die Bürste für die Haare?", "es": "¿Dónde está el cepillo para el pelo?" }
  ],
  "Huhn": [
    { "de": "Das Huhn pickt Körner.", "es": "La gallina picotea granos." },
    { "de": "Oma hat frische Eier vom Huhn geholt.", "es": "La abuela ha recogido huevos frescos de la gallina." },
    { "de": "Hast du ein Huhn im Garten?", "es": "¿Tienes una gallina en el jardín?" }
  ],
  "Kuchen": [
    { "de": "Der Kuchen schmeckt köstlich.", "es": "La tarta sabe deliciosa." },
    { "de": "Ich habe den Kuchen für die Feier gebacken.", "es": "He horneado la tarta para la fiesta." },
    { "de": "Möchtest du ein Stück Kuchen?", "es": "¿Quieres un trozo de tarta?" }
  ],
  "Shampoo": [
    { "de": "Das Shampoo ist mild zur Kopfhaut.", "es": "El champú es suave para el cuero cabelludo." },
    { "de": "Ich habe das Shampoo im Supermarkt gekauft.", "es": "He comprado el champú en el supermercado." },
    { "de": "Welches Shampoo benutzt du?", "es": "¿Qué champú usas?" }
  ],
  "bügeln": [
    { "de": "Ich muss noch die Hemden bügeln.", "es": "Todavía tengo que planchar las camisas." },
    { "de": "Er hat die ganze Wäsche gebügelt.", "es": "Él ha planchado toda la ropa." },
    { "de": "Bügelst du gern?", "es": "¿Te gusta planchar?" }
  ],
  "die Weintraube": [
    { "de": "Die Weintraube ist süß und saftig.", "es": "La uva es dulce y jugosa." },
    { "de": "Wir haben Weintrauben für den Saft gepresst.", "es": "Hemos prensado uvas para el zumo." },
    { "de": "Isst du lieber rote oder grüne Weintrauben?", "es": "¿Prefieres uvas tintas o verdes?" }
  ],
  "die Turnhalle": [
    { "de": "Die Turnhalle ist groß und hell.", "es": "El gimnasio es grande y luminoso." },
    { "de": "Die Kinder haben in der Turnhalle gespielt.", "es": "Los niños han jugado en el gimnasio." },
    { "de": "Trainierst du jeden Tag in der Turnhalle?", "es": "¿Entrenas todos los días en el gimnasio?" }
  ],
  "readwrite": [
    { "de": "\"readwrite\" ist ein englisches Wort.", "es": "\"readwrite\" es una palabra inglesa." },
    { "de": "Auf Deutsch bedeutet \"readwrite\" lesen und schreiben.", "es": "En alemán \"readwrite\" significa leer y escribir." },
    { "de": "Kennst du die Bedeutung von \"readwrite\"?", "es": "¿Conoces el significado de \"readwrite\"?" }
  ],
  "Tau": [
    { "de": "Der Tau glitzert am Morgen.", "es": "El rocío brilla por la mañana." },
    { "de": "Das Gras war nass vom Tau.", "es": "La hierba estaba mojada por el rocío." },
    { "de": "Siehst du den Tau auf den Blättern?", "es": "¿Ves el rocío sobre las hojas?" }
  ],
  "Wolf": [
    { "de": "Der Wolf ist ein Raubtier.", "es": "El lobo es un depredador." },
    { "de": "Im Märchen hat der Wolf die Großmutter gefressen.", "es": "En el cuento el lobo se ha comido a la abuela." },
    { "de": "Hast du schon einen Wolf in der Natur gesehen?", "es": "¿Has visto ya un lobo en la naturaleza?" }
  ],
  "Minute": [
    { "de": "Eine Minute hat sechzig Sekunden.", "es": "Un minuto tiene sesenta segundos." },
    { "de": "Ich habe fünf Minuten auf dich gewartet.", "es": "Te he esperado cinco minutos." },
    { "de": "Kannst du eine Minute still sein?", "es": "¿Puedes estar callado un minuto?" }
  ],
  "die Spinne": [
    { "de": "Die Spinne webt ein Netz.", "es": "La araña teje una red." },
    { "de": "Ich habe eine Spinne im Keller gefunden.", "es": "He encontrado una araña en el sótano." },
    { "de": "Hast du Angst vor Spinnen?", "es": "¿Tienes miedo a las arañas?" }
  ],
  "Land": [
    { "de": "Das Land ist sehr bergig.", "es": "El país es muy montañoso." },
    { "de": "Wir sind durch viele Länder gereist.", "es": "Hemos viajado por muchos países." },
    { "de": "In welchem Land möchtest du leben?", "es": "¿En qué país te gustaría vivir?" }
  ],
  "Straße": [
    { "de": "Die Straße ist nach dem Regen nass.", "es": "La calle está mojada después de la lluvia." },
    { "de": "Er ist die Straße entlang gerannt.", "es": "Él ha corrido a lo largo de la calle." },
    { "de": "Kennst du den Namen dieser Straße?", "es": "¿Conoces el nombre de esta calle?" }
  ],
  "Saft": [
    { "de": "Der Saft ist frisch gepresst.", "es": "El zumo está recién exprimido." },
    { "de": "Ich habe mir einen Apfelsaft bestellt.", "es": "Me he pedido un zumo de manzana." },
    { "de": "Trinkst du lieber Saft oder Wasser?", "es": "¿Prefieres zumo o agua?" }
  ],
  "Gehaltsabrechnung": [
    { "de": "Die Gehaltsabrechnung kommt am Ende des Monats.", "es": "La nómina llega a fin de mes." },
    { "de": "Ich habe die Gehaltsabrechnung überprüft.", "es": "He revisado la nómina." },
    { "de": "Hast du deine Gehaltsabrechnung schon bekommen?", "es": "¿Ya has recibido tu nómina?" }
  ],
  "trocknen": [
    { "de": "Die Wäsche muss noch trocknen.", "es": "La ropa todavía tiene que secarse." },
    { "de": "Ich habe meine Haare an der Luft getrocknet.", "es": "Me he secado el pelo al aire." },
    { "de": "Trocknest du deine Schuhe auf der Heizung?", "es": "¿Secas tus zapatos en la calefacción?" }
  ],
  "Scheune": [
    { "de": "Die Scheune ist voller Heu.", "es": "El granero está lleno de heno." },
    { "de": "Der Bauer hat das Stroh in der Scheune gelagert.", "es": "El granjero ha almacenado la paja en el granero." },
    { "de": "Darf ich die Scheune ansehen?", "es": "¿Puedo ver el granero?" }
  ],
  "die Ananas": [
    { "de": "Die Ananas ist eine tropische Frucht.", "es": "La piña es una fruta tropical." },
    { "de": "Wir haben Ananas für den Obstsalat geschnitten.", "es": "Hemos cortado piña para la macedonia." },
    { "de": "Magst du Ananas auf der Pizza?", "es": "¿Te gusta la piña en la pizza?" }
  ],
  "la mujer": [
    { "de": "\"la mujer\" ist ein spanisches Wort.", "es": "\"la mujer\" es una palabra española." },
    { "de": "Auf Deutsch heißt \"la mujer\" die Frau.", "es": "En alemán \"la mujer\" significa la mujer." },
    { "de": "Kennst du das spanische Wort \"la mujer\"?", "es": "¿Conoces la palabra española \"la mujer\"?" }
  ],
  "verfügen": [
    { "de": "Wir verfügen über moderne Technik.", "es": "Disponemos de tecnología moderna." },
    { "de": "Das Unternehmen hat über genügend Mittel verfügt.", "es": "La empresa ha dispuesto de suficientes medios." },
    { "de": "Verfügst du über einen gültigen Pass?", "es": "¿Dispones de un pasaporte válido?" }
  ],
  "Ring": [
    { "de": "Der Ring glänzt wunderschön.", "es": "El anillo brilla maravillosamente." },
    { "de": "Er hat ihr einen Verlobungsring geschenkt.", "es": "Él le ha regalado un anillo de compromiso." },
    { "de": "Trägst du deinen Ehering jeden Tag?", "es": "¿Llevas tu alianza todos los días?" }
  ],
  "räumen": [
    { "de": "Du musst den Tisch abräumen.", "es": "Tienes que quitar la mesa." },
    { "de": "Er hat sein Zimmer aufgeräumt.", "es": "Él ha ordenado su habitación." },
    { "de": "Räumst du nach dem Essen ab?", "es": "¿Quitas la mesa después de comer?" }
  ],
  "Woche": [
    { "de": "Die Woche vergeht zu schnell.", "es": "La semana pasa demasiado rápido." },
    { "de": "Wir haben eine tolle Woche verbracht.", "es": "Hemos pasado una semana estupenda." },
    { "de": "Was machst du diese Woche?", "es": "¿Qué haces esta semana?" }
  ],
  "putzen": [
    { "de": "Ich muss noch das Badezimmer putzen.", "es": "Todavía tengo que limpiar el baño." },
    { "de": "Sie hat die Fenster geputzt.", "es": "Ella ha limpiado las ventanas." },
    { "de": "Putzt du jeden Samstag die Wohnung?", "es": "¿Limpias el piso todos los sábados?" }
  ],
  "waschen": [
    { "de": "Du sollst die Hände waschen.", "es": "Debes lavarte las manos." },
    { "de": "Ich habe die Wäsche schon gewaschen.", "es": "Ya he lavado la ropa." },
    { "de": "Wäschst du das Geschirr mit der Hand oder in der Maschine?", "es": "¿Lavas los platos a mano o a máquina?" }
  ],
  "lügen": [
    { "de": "Du darfst nicht lügen.", "es": "No debes mentir." },
    { "de": "Er hat mich gestern angelogen.", "es": "Él me ha mentido ayer." },
    { "de": "Lügst du manchmal?", "es": "¿Mientes a veces?" }
  ],
  "die Traube": [
    { "de": "Die Traube ist prall und blau.", "es": "La uva está tersa y azul." },
    { "de": "Wir haben Trauben vom Markt geholt.", "es": "Hemos cogido uvas del mercado." },
    { "de": "Hast du schon Trauben gegessen?", "es": "¿Ya has comido uvas?" }
  ],
  "Eichhörnchen": [
    { "de": "Das Eichhörnchen sammelt Nüsse.", "es": "La ardilla recoge nueces." },
    { "de": "Ich habe ein Eichhörnchen im Park gefüttert.", "es": "He dado de comer a una ardilla en el parque." },
    { "de": "Siehst du das Eichhörnchen auf dem Baum?", "es": "¿Ves la ardilla en el árbol?" }
  ],
  "schwach": [
    { "de": "Der Patient ist noch schwach.", "es": "El paciente aún está débil." },
    { "de": "Nach der Grippe habe ich mich schwach gefühlt.", "es": "Después de la gripe me he sentido débil." },
    { "de": "Bist du zu schwach zum Tragen?", "es": "¿Estás demasiado débil para cargar?" }
  ],
  "komisch": [
    { "de": "Der Witz war wirklich komisch.", "es": "El chiste fue realmente gracioso." },
    { "de": "Das hat komisch geschmeckt.", "es": "Eso ha sabido raro." },
    { "de": "Findest du den Film komisch?", "es": "¿Encuentras graciosa la película?" }
  ],
  "stark": [
    { "de": "Mein Vater ist stark wie ein Bär.", "es": "Mi padre es fuerte como un oso." },
    { "de": "Er hat sich durch den Sport gestärkt.", "es": "Él se ha fortalecido con el deporte." },
    { "de": "Bist du stark genug für diesen Job?", "es": "¿Eres suficientemente fuerte para este trabajo?" }
  ],
  "Mühle": [
    { "de": "Die alte Mühle steht am Fluss.", "es": "El viejo molino está junto al río." },
    { "de": "Früher haben die Bauern hier Korn gemahlen.", "es": "Antiguamente los campesinos molían aquí el grano." },
    { "de": "Besichtigen wir die Mühle am Sonntag?", "es": "¿Visitamos el molino el domingo?" }
  ],
  "beteiligen": [
    { "de": "Alle sollen sich an der Diskussion beteiligen.", "es": "Todos deben participar en la discusión." },
    { "de": "Er hat sich aktiv am Projekt beteiligt.", "es": "Él ha participado activamente en el proyecto." },
    { "de": "Beteiligst du dich an der Umfrage?", "es": "¿Participas en la encuesta?" }
  ],
  "Ofen": [
    { "de": "Der Ofen ist noch heiß.", "es": "El horno está aún caliente." },
    { "de": "Ich habe die Pizza im Ofen gebacken.", "es": "He horneado la pizza en el horno." },
    { "de": "Stellst du den Ofen auf zweihundert Grad?", "es": "¿Pones el horno a doscientos grados?" }
  ],
  "fürchten": [
    { "de": "Manche Leute fürchten sich vor der Dunkelheit.", "es": "Algunas personas temen la oscuridad." },
    { "de": "Sie hat den Hund nicht gefürchtet.", "es": "Ella no ha temido al perro." },
    { "de": "Fürchtest du dich vor Gewittern?", "es": "¿Temes las tormentas?" }
  ],
  "Gürtel": [
    { "de": "Der Gürtel ist zu eng.", "es": "El cinturón está demasiado apretado." },
    { "de": "Ich habe den Gürtel enger geschnallt.", "es": "Me he apretado el cinturón." },
    { "de": "Trägst du heute einen Gürtel?", "es": "¿Llevas hoy cinturón?" }
  ],
  "beschützen": [
    { "de": "Eltern müssen ihre Kinder beschützen.", "es": "Los padres tienen que proteger a sus hijos." },
    { "de": "Der Zaun hat die Pflanzen vor dem Wind geschützt.", "es": "La valla ha protegido las plantas del viento." },
    { "de": "Beschützt du deine Haut vor der Sonne?", "es": "¿Proteges tu piel del sol?" }
  ],
  "Veränderung": [
    { "de": "Die Veränderung war plötzlich.", "es": "El cambio fue repentino." },
    { "de": "Wir haben eine große Veränderung in der Firma erlebt.", "es": "Hemos vivido un gran cambio en la empresa." },
    { "de": "Hast du Angst vor Veränderungen?", "es": "¿Temes los cambios?" }
  ],
  "das Kleid": [
    { "de": "Das Kleid passt perfekt.", "es": "El vestido queda perfecto." },
    { "de": "Sie hat ein blaues Kleid zur Party getragen.", "es": "Ella ha llevado un vestido azul a la fiesta." },
    { "de": "Gefällt dir mein neues Kleid?", "es": "¿Te gusta mi vestido nuevo?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block9 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 9 añadido. Total de palabras ahora:", Object.keys(combined).length);