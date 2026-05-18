const fs = require("fs");

// Cargar archivo existente (bloques 1-13)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 14: palabras 651 a 700
const block14 = {
  "die Tasse": [
    { "de": "Die Tasse ist mit Blumen bemalt.", "es": "La taza est\u00E1 decorada con flores." },
    { "de": "Ich habe mir eine Tasse Tee gemacht.", "es": "Me he preparado una taza de t\u00E9." },
    { "de": "Kannst du die Tasse in den Schrank stellen?", "es": "\u00BFPuedes guardar la taza en el armario?" }
  ],
  "weich": [
    { "de": "Das Kissen ist herrlich weich.", "es": "La almohada es maravillosamente blanda." },
    { "de": "Die Butter ist in der Sonne weich geworden.", "es": "La mantequilla se ha ablandado al sol." },
    { "de": "Findest du das Brot zu weich?", "es": "\u00BFEncuentras demasiado blando el pan?" }
  ],
  "recordings": [
    { "de": "\"recordings\" ist ein englisches Wort.", "es": "\"recordings\" es una palabra inglesa." },
    { "de": "Auf Deutsch hei\u00DFt \"recordings\" Aufnahmen.", "es": "En alem\u00E1n \"recordings\" significa grabaciones." },
    { "de": "Hast du die neuen Recordings schon geh\u00F6rt?", "es": "\u00BFYa has escuchado las nuevas grabaciones?" }
  ],
  "Wein": [
    { "de": "Der Wein ist aus Frankreich.", "es": "El vino es de Francia." },
    { "de": "Wir haben gestern einen guten Wein getrunken.", "es": "Ayer bebimos un buen vino." },
    { "de": "Trinkst du lieber Wein oder Bier?", "es": "\u00BFPrefieres vino o cerveza?" }
  ],
  "Traube": [
    { "de": "Die Traube ist s\u00FC\u00DF und saftig.", "es": "La uva es dulce y jugosa." },
    { "de": "Wir haben Trauben f\u00FCr den Saft gepresst.", "es": "Hemos prensado uvas para el zumo." },
    { "de": "Isst du gern rote Trauben?", "es": "\u00BFTe gustan las uvas tintas?" }
  ],
  "M\u00FClltonne": [
    { "de": "Die M\u00FClltonne steht hinter dem Haus.", "es": "El cubo de basura est\u00E1 detr\u00E1s de la casa." },
    { "de": "Er hat den M\u00FCll in die M\u00FClltonne geworfen.", "es": "\u00C9l ha tirado la basura al cubo." },
    { "de": "Hast du die M\u00FClltonne heute rausgestellt?", "es": "\u00BFHas sacado hoy el cubo de basura?" }
  ],
  "basteln": [
    { "de": "Die Kinder basteln gerne mit Papier.", "es": "A los ni\u00F1os les gusta hacer manualidades con papel." },
    { "de": "Wir haben zu Ostern Osterhasen gebastelt.", "es": "En Pascua hemos hecho conejitos de Pascua." },
    { "de": "Bastelst du auch gern mit Holz?", "es": "\u00BFTambi\u00E9n te gusta hacer manualidades con madera?" }
  ],
  "Kamm": [
    { "de": "Der Kamm liegt auf dem Waschtisch.", "es": "El peine est\u00E1 en el lavabo." },
    { "de": "Sie hat sich die Haare mit einem Kamm gemacht.", "es": "Ella se ha peinado el pelo con un peine." },
    { "de": "Kann ich deinen Kamm leihen?", "es": "\u00BFPuedo tomar prestado tu peine?" }
  ],
  "Nase": [
    { "de": "Meine Nase l\u00E4uft in der K\u00E4lte.", "es": "Mi nariz gotea con el fr\u00EDo." },
    { "de": "Er hat sich die Nase an der T\u00FCr gesto\u00DFen.", "es": "\u00C9l se ha golpeado la nariz con la puerta." },
    { "de": "Putzt du deine Nase mit einem Taschentuch?", "es": "\u00BFTe limpias la nariz con un pa\u00F1uelo de papel?" }
  ],
  "Haar": [
    { "de": "Ihr Haar ist sehr lang und gl\u00E4nzend.", "es": "Su pelo es muy largo y brillante." },
    { "de": "Der Friseur hat mir die Haare geschnitten.", "es": "El peluquero me ha cortado el pelo." },
    { "de": "W\u00E4schst du dein Haar jeden Tag?", "es": "\u00BFTe lavas el pelo todos los d\u00EDas?" }
  ],
  "unterlassen": [
    { "de": "Du sollst das Rauchen unterlassen.", "es": "Debes omitir el fumar." },
    { "de": "Er hat den unsinnigen Kommentar unterlassen.", "es": "\u00C9l ha omitido el comentario sin sentido." },
    { "de": "Unterl\u00E4sst du das N\u00F6rgeln bitte?", "es": "\u00BFOmites las quejas, por favor?" }
  ],
  "Pflaume": [
    { "de": "Die Pflaume ist reif und blau.", "es": "La ciruela est\u00E1 madura y azul." },
    { "de": "Oma hat Pflaumen f\u00FCr den Kuchen geschnitten.", "es": "La abuela ha cortado ciruelas para la tarta." },
    { "de": "Magst du Pflaumenmus?", "es": "\u00BFTe gusta la mermelada de ciruela?" }
  ],
  "die Wurst": [
    { "de": "Die Wurst ist frisch vom Fleischer.", "es": "La salchicha es fresca de la carnicer\u00EDa." },
    { "de": "Er hat eine Wurst auf den Grill gelegt.", "es": "\u00C9l ha puesto una salchicha en la parrilla." },
    { "de": "Grillst du heute Wurst oder Steak?", "es": "\u00BFHaces hoy salchicha o filete a la parrilla?" }
  ],
  "die Rosine": [
    { "de": "Die Rosine ist s\u00FC\u00DF und getrocknet.", "es": "La pasa es dulce y seca." },
    { "de": "Mama hat Rosinen in den Kuchen getan.", "es": "Mam\u00E1 ha puesto pasas en la tarta." },
    { "de": "Isst du gern Rosinen im M\u00FCsli?", "es": "\u00BFTe gusta comer pasas en el muesli?" }
  ],
  "der Flughafen": [
    { "de": "Der Flughafen ist weit vom Zentrum.", "es": "El aeropuerto est\u00E1 lejos del centro." },
    { "de": "Wir haben den Flughafen p\u00FCnktlich erreicht.", "es": "Hemos llegado puntuales al aeropuerto." },
    { "de": "F\u00E4hrst du mit dem Taxi zum Flughafen?", "es": "\u00BFVas en taxi al aeropuerto?" }
  ],
  "Genitiv": [
    { "de": "Der Genitiv ist der zweite Fall.", "es": "El genitivo es el segundo caso." },
    { "de": "Im Deutschen habe ich den Genitiv gelernt.", "es": "En alem\u00E1n he aprendido el genitivo." },
    { "de": "Benutzt du den Genitiv h\u00E4ufig?", "es": "\u00BFUsas el genitivo con frecuencia?" }
  ],
  "der Essig": [
    { "de": "Der Essig riecht sehr sauer.", "es": "El vinagre huele muy \u00E1cido." },
    { "de": "Ich habe den Salat mit Essig angemacht.", "es": "He ali\u00F1ado la ensalada con vinagre." },
    { "de": "Nimmst du Essig oder Zitrone f\u00FCr die So\u00DFe?", "es": "\u00BFTomas vinagre o lim\u00F3n para la salsa?" }
  ],
  "Anstrengung": [
    { "de": "Die Anstrengung hat sich gelohnt.", "es": "El esfuerzo ha valido la pena." },
    { "de": "Er hat gro\u00DFe Anstrengung in das Projekt gesteckt.", "es": "\u00C9l ha puesto un gran esfuerzo en el proyecto." },
    { "de": "Sp\u00FCrst du die Anstrengung in den Muskeln?", "es": "\u00BFNotas el esfuerzo en los m\u00FAsculos?" }
  ],
  "Knie": [
    { "de": "Mein Knie tut nach dem Joggen weh.", "es": "Mi rodilla duele despu\u00E9s de correr." },
    { "de": "Er ist auf das Knie gefallen.", "es": "\u00C9l se ha ca\u00EDdo sobre la rodilla." },
    { "de": "Hast du dein Knie beim Sport verletzt?", "es": "\u00BFTe has lesionado la rodilla haciendo deporte?" }
  ],
  "sechzehn": [
    { "de": "Sechzehn ist eine sch\u00F6ne Zahl.", "es": "Diecis\u00E9is es un n\u00FAmero bonito." },
    { "de": "Sie ist gestern sechzehn geworden.", "es": "Ella cumpli\u00F3 ayer diecis\u00E9is a\u00F1os." },
    { "de": "Bist du schon sechzehn?", "es": "\u00BFYa tienes diecis\u00E9is?" }
  ],
  "abgie\u00DFen": [
    { "de": "Du musst das Nudelwasser abgie\u00DFen.", "es": "Tienes que escurrir el agua de la pasta." },
    { "de": "Oma hat die Kartoffeln abgegossen.", "es": "La abuela ha escurrido las patatas." },
    { "de": "Gie\u00DFt du den Tee durch ein Sieb ab?", "es": "\u00BFCuelas el t\u00E9?" }
  ],
  "weihen": [
    { "de": "Der Bischof wird die neue Kirche weihen.", "es": "El obispo consagrar\u00E1 la nueva iglesia." },
    { "de": "Die Kapelle wurde am Sonntag geweiht.", "es": "La capilla fue consagrada el domingo." },
    { "de": "Weiht man eine Glocke vor dem Gebrauch?", "es": "\u00BFSe consagra una campana antes de usarla?" }
  ],
  "Informatiker": [
    { "de": "Der Informatiker programmiert eine neue App.", "es": "El inform\u00E1tico programa una nueva aplicaci\u00F3n." },
    { "de": "Mein Bruder hat als Informatiker gearbeitet.", "es": "Mi hermano ha trabajado como inform\u00E1tico." },
    { "de": "Studierst du Informatik?", "es": "\u00BFEstudias inform\u00E1tica?" }
  ],
  "Rasierwasser": [
    { "de": "Das Rasierwasser duftet nach Zitrus.", "es": "La loci\u00F3n de afeitar huele a c\u00EDtricos." },
    { "de": "Er hat Rasierwasser nach dem Rasieren benutzt.", "es": "\u00C9l ha usado loci\u00F3n despu\u00E9s de afeitarse." },
    { "de": "Benutzt du ein alkoholfreies Rasierwasser?", "es": "\u00BFUsas una loci\u00F3n sin alcohol?" }
  ],
  "Muskat": [
    { "de": "Der Muskat gibt dem Kuchen W\u00FCrze.", "es": "La nuez moscada da sabor a la tarta." },
    { "de": "Ich habe ein bisschen Muskat gerieben.", "es": "He rallado un poco de nuez moscada." },
    { "de": "Streust du Muskat \u00FCber den Kartoffelbrei?", "es": "\u00BFEspolvoreas nuez moscada sobre el pur\u00E9 de patatas?" }
  ],
  "Wetter": [
    { "de": "Das Wetter heute ist herrlich.", "es": "El clima de hoy es espl\u00E9ndido." },
    { "de": "Gestern hat das Wetter umgeschlagen.", "es": "Ayer cambi\u00F3 el tiempo de repente." },
    { "de": "Schaut du morgens den Wetterbericht?", "es": "\u00BFVes por la ma\u00F1ana la previsi\u00F3n del tiempo?" }
  ],
  "Zimmer": [
    { "de": "Das Zimmer ist hell und ruhig.", "es": "La habitaci\u00F3n es luminosa y tranquila." },
    { "de": "Ich habe mein Zimmer aufger\u00E4umt.", "es": "He ordenado mi habitaci\u00F3n." },
    { "de": "Hast du ein Zimmer mit Balkon?", "es": "\u00BFTienes una habitaci\u00F3n con balc\u00F3n?" }
  ],
  "die Melone": [
    { "de": "Die Melone ist herrlich erfrischend.", "es": "El mel\u00F3n es deliciosamente refrescante." },
    { "de": "Im Sommer essen wir viel Melone.", "es": "En verano comemos mucho mel\u00F3n." },
    { "de": "Magst du Wassermelone oder Honigmelone?", "es": "\u00BFPrefieres sand\u00EDa o mel\u00F3n?" }
  ],
  "taub": [
    { "de": "Der alte Mann ist fast taub.", "es": "El anciano est\u00E1 casi sordo." },
    { "de": "Nach dem lauten Knall war ich kurz taub.", "es": "Despu\u00E9s del fuerte estallido me qued\u00E9 sordo por un momento." },
    { "de": "Wirst du auf einem Ohr taub?", "es": "\u00BFTe est\u00E1s quedando sordo de un o\u00EDdo?" }
  ],
  "der Esel": [
    { "de": "Der Esel ist ein geduldiges Tier.", "es": "El burro es un animal paciente." },
    { "de": "Die Kinder sind auf dem Esel geritten.", "es": "Los ni\u00F1os han montado en el burro." },
    { "de": "Hast du schon einen Esel gef\u00FCttert?", "es": "\u00BFHas dado ya de comer a un burro?" }
  ],
  "Freiberufler": [
    { "de": "Der Freiberufler arbeitet von zu Hause aus.", "es": "El profesional liberal trabaja desde casa." },
    { "de": "Sie hat als Freiberuflerin viel Erfolg gehabt.", "es": "Ella ha tenido mucho \u00E9xito como profesional liberal." },
    { "de": "Bist du Freiberufler?", "es": "\u00BFEres profesional liberal?" }
  ],
  "Zone": [
    { "de": "Die Zone ist f\u00FCr Autos gesperrt.", "es": "La zona est\u00E1 cerrada para los coches." },
    { "de": "Wir haben eine ruhige Zone zum Wohnen gesucht.", "es": "Hemos buscado una zona tranquila para vivir." },
    { "de": "Befindet sich die Schule in dieser Zone?", "es": "\u00BFSe encuentra la escuela en esta zona?" }
  ],
  "Reiseb\u00FCro": [
    { "de": "Das Reiseb\u00FCro hat viele Angebote.", "es": "La agencia de viajes tiene muchas ofertas." },
    { "de": "Ich habe die Reise im Reiseb\u00FCro gebucht.", "es": "He reservado el viaje en la agencia de viajes." },
    { "de": "Gehst du ins Reiseb\u00FCro oder buchst du online?", "es": "\u00BFVas a la agencia de viajes o reservas en l\u00EDnea?" }
  ],
  "Arzt": [
    { "de": "Der Arzt hat mir Ruhe verordnet.", "es": "El m\u00E9dico me ha prescrito reposo." },
    { "de": "Gestern war ich beim Arzt.", "es": "Ayer estuve en el m\u00E9dico." },
    { "de": "Gehst du regelm\u00E4\u00DFig zum Arzt?", "es": "\u00BFVas regularmente al m\u00E9dico?" }
  ],
  "Krankenhaus": [
    { "de": "Das Krankenhaus ist neu gebaut.", "es": "El hospital es de nueva construcci\u00F3n." },
    { "de": "Mein Opa musste ins Krankenhaus.", "es": "Mi abuelo tuvo que ir al hospital." },
    { "de": "Arbeitest du im Krankenhaus?", "es": "\u00BFTrabajas en el hospital?" }
  ],
  "die Tasche": [
    { "de": "Die Tasche ist aus Leder.", "es": "El bolso es de cuero." },
    { "de": "Sie hat eine schwere Tasche getragen.", "es": "Ella ha llevado un bolso pesado." },
    { "de": "Suchst du deine Tasche?", "es": "\u00BFBuscas tu bolso?" }
  ],
  "der Himmel": [
    { "de": "Der Himmel ist wolkenlos.", "es": "El cielo est\u00E1 sin nubes." },
    { "de": "Gestern hat der Himmel rot geleuchtet.", "es": "Ayer el cielo se ilumin\u00F3 de rojo." },
    { "de": "Siehst du die Sterne am Himmel?", "es": "\u00BFVes las estrellas en el cielo?" }
  ],
  "Nagellack": [
    { "de": "Der Nagellack ist knallrot.", "es": "El esmalte de u\u00F1as es rojo chill\u00F3n." },
    { "de": "Sie hat sich die N\u00E4gel mit Nagellack gemacht.", "es": "Ella se ha pintado las u\u00F1as con esmalte." },
    { "de": "Tr\u00E4gst du gern bunten Nagellack?", "es": "\u00BFTe gusta llevar esmalte de u\u00F1as de colores?" }
  ],
  "der Cappuccino": [
    { "de": "Der Cappuccino hat viel Milchschaum.", "es": "El capuchino tiene mucha espuma de leche." },
    { "de": "Ich habe einen Cappuccino zum Fr\u00FChst\u00FCck getrunken.", "es": "He bebido un capuchino en el desayuno." },
    { "de": "Trinkst du deinen Cappuccino mit Zucker?", "es": "\u00BFBebes el capuchino con az\u00FAcar?" }
  ],
  "Mundwasser": [
    { "de": "Das Mundwasser schmeckt nach Minze.", "es": "El enjuague bucal sabe a menta." },
    { "de": "Nach dem Z\u00E4hneputzen habe ich Mundwasser benutzt.", "es": "Despu\u00E9s de lavarme los dientes he usado enjuague bucal." },
    { "de": "Benutzt du jeden Abend Mundwasser?", "es": "\u00BFUsas enjuague bucal cada noche?" }
  ],
  "die Erde": [
    { "de": "Die Erde ist rund und blau.", "es": "La tierra es redonda y azul." },
    { "de": "Der G\u00E4rtner hat die Erde umgegraben.", "es": "El jardinero ha cavado la tierra." },
    { "de": "W\u00E4chst die Pflanze in dieser Erde?", "es": "\u00BFCrece la planta en esta tierra?" }
  ],
  "das H\u00E4hnchen": [
    { "de": "Das H\u00E4hnchen ist knusprig gebraten.", "es": "El pollo est\u00E1 asado crujiente." },
    { "de": "Zum Mittagessen gab es H\u00E4hnchen mit Pommes.", "es": "De almuerzo hubo pollo con patatas fritas." },
    { "de": "Isst du das H\u00E4hnchen mit Haut?", "es": "\u00BFComes el pollo con piel?" }
  ],
  "Sprache": [
    { "de": "Die deutsche Sprache ist schwer.", "es": "El idioma alem\u00E1n es dif\u00EDcil." },
    { "de": "Ich habe eine neue Sprache gelernt.", "es": "He aprendido un idioma nuevo." },
    { "de": "Welche Sprachen sprichst du?", "es": "\u00BFQu\u00E9 idiomas hablas?" }
  ],
  "Wort": [
    { "de": "Das Wort ist mir unbekannt.", "es": "La palabra me es desconocida." },
    { "de": "Ich habe das Wort im W\u00F6rterbuch nachgeschlagen.", "es": "He buscado la palabra en el diccionario." },
    { "de": "Kannst du das Wort buchstabieren?", "es": "\u00BFPuedes deletrear la palabra?" }
  ],
  "der Pullover": [
    { "de": "Der Pullover kratzt auf der Haut.", "es": "El jersey pica en la piel." },
    { "de": "Oma hat mir einen Pullover gestrickt.", "es": "La abuela me ha tejido un jersey." },
    { "de": "Ziehst du den Pullover drinnen an?", "es": "\u00BFTe pones el jersey dentro de casa?" }
  ],
  "Schuster": [
    { "de": "Der Schuster repariert alte Schuhe.", "es": "El zapatero repara zapatos viejos." },
    { "de": "Mein Gro\u00DFvater war Schuster.", "es": "Mi abuelo fue zapatero." },
    { "de": "Bringst du die Stiefel zum Schuster?", "es": "\u00BFLlevas las botas al zapatero?" }
  ],
  "Vertrag": [
    { "de": "Der Vertrag ist unterschrieben.", "es": "El contrato est\u00E1 firmado." },
    { "de": "Er hat den Vertrag gestern bekommen.", "es": "\u00C9l ha recibido el contrato ayer." },
    { "de": "Hast du den Vertrag gelesen?", "es": "\u00BFHas le\u00EDdo el contrato?" }
  ],
  "Zahn": [
    { "de": "Der Zahn tut mir weh.", "es": "Me duele la muela." },
    { "de": "Der Zahnarzt hat einen Zahn gezogen.", "es": "El dentista ha sacado una muela." },
    { "de": "Putzt du deine Z\u00E4hne nach jeder Mahlzeit?", "es": "\u00BFTe lavas los dientes despu\u00E9s de cada comida?" }
  ],
  "der Zoo": [
    { "de": "Der Zoo ist am Wochenende ge\u00F6ffnet.", "es": "El zool\u00F3gico abre los fines de semana." },
    { "de": "Wir haben den Zoo mit den Kindern besucht.", "es": "Hemos visitado el zoo con los ni\u00F1os." },
    { "de": "Warst du schon im neuen Zoo?", "es": "\u00BFHas estado ya en el nuevo zoo?" }
  ],
  "Badekappe": [
    { "de": "Die Badekappe ist aus Silikon.", "es": "El gorro de ba\u00F1o es de silicona." },
    { "de": "Im Schwimmbad trage ich immer eine Badekappe.", "es": "En la piscina siempre llevo gorro de ba\u00F1o." },
    { "de": "Brauchst du eine Badekappe f\u00FCr das Becken?", "es": "\u00BFNecesitas un gorro de ba\u00F1o para la piscina?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block14 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 14 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);