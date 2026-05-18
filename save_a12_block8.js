const fs = require("fs");

// Cargar archivo existente (bloques 1-7)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 8: palabras 351 a 400
const block8 = {
  "unbekannt": [
    { "de": "Der Mann ist mir unbekannt.", "es": "El hombre me es desconocido." },
    { "de": "Dieses Lied war mir bis gestern unbekannt.", "es": "Esta canci\u00F3n me era desconocida hasta ayer." },
    { "de": "Bleibt der Ort unbekannt?", "es": "\u00BFPermanece desconocido el lugar?" }
  ],
  "Waldrand": [
    { "de": "Der Waldrand ist ein idealer Picknickplatz.", "es": "El borde del bosque es un lugar ideal para un p\u00EDcnic." },
    { "de": "Wir sind am Waldrand entlang gewandert.", "es": "Hemos paseado a lo largo del borde del bosque." },
    { "de": "Treffen wir uns am Waldrand?", "es": "\u00BFQuedamos en el borde del bosque?" }
  ],
  "articulos": [
    { "de": "\"articulos\" ist ein spanisches Wort.", "es": "\"articulos\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch bedeutet \"articulos\" Artikel.", "es": "En alem\u00E1n \"articulos\" significa art\u00EDculos." },
    { "de": "Kennst du die deutschen Artikel?", "es": "\u00BFConoces los art\u00EDculos alemanes?" }
  ],
  "sich schminken": [
    { "de": "Sie muss sich f\u00FCr die Party schminken.", "es": "Ella tiene que maquillarse para la fiesta." },
    { "de": "Ich habe mich heute kaum geschminkt.", "es": "Hoy apenas me he maquillado." },
    { "de": "Schminkst du dich jeden Morgen?", "es": "\u00BFTe maquillas cada ma\u00F1ana?" }
  ],
  "klug": [
    { "de": "Dein Bruder ist sehr klug.", "es": "Tu hermano es muy inteligente." },
    { "de": "Sie hat eine kluge Entscheidung getroffen.", "es": "Ella ha tomado una decisi\u00F3n inteligente." },
    { "de": "Findest du das klug?", "es": "\u00BFTe parece inteligente?" }
  ],
  "das Meer": [
    { "de": "Das Meer ist heute ruhig.", "es": "El mar est\u00E1 hoy tranquilo." },
    { "de": "Im Urlaub haben wir das Meer genossen.", "es": "En vacaciones hemos disfrutado del mar." },
    { "de": "F\u00E4hrst du gern ans Meer?", "es": "\u00BFTe gusta ir al mar?" }
  ],
  "probieren": [
    { "de": "Du musst meine Lasagne probieren.", "es": "Tienes que probar mi lasa\u00F1a." },
    { "de": "Ich habe noch nie Sushi probiert.", "es": "Nunca he probado el sushi." },
    { "de": "Probierst du gern exotische Fr\u00FCchte?", "es": "\u00BFTe gusta probar frutas ex\u00F3ticas?" }
  ],
  "Wendung": [
    { "de": "Die Wendung in der Geschichte war \u00FCberraschend.", "es": "El giro de la historia fue sorprendente." },
    { "de": "Er hat eine unerwartete Wendung genommen.", "es": "\u00C9l ha dado un giro inesperado." },
    { "de": "Hast du die Wendung im Film verstanden?", "es": "\u00BFHas entendido el giro de la pel\u00EDcula?" }
  ],
  "fern": [
    { "de": "Der Berg ist noch fern.", "es": "La monta\u00F1a a\u00FAn est\u00E1 lejana." },
    { "de": "Er ist in ein fernes Land gereist.", "es": "\u00C9l ha viajado a un pa\u00EDs lejano." },
    { "de": "Sehnst du dich nach der Ferne?", "es": "\u00BFAnhelas la lejan\u00EDa?" }
  ],
  "S\u00E4ge": [
    { "de": "Die S\u00E4ge ist scharf.", "es": "La sierra est\u00E1 afilada." },
    { "de": "Vater hat das Holz mit der S\u00E4ge geschnitten.", "es": "Pap\u00E1 ha cortado la madera con la sierra." },
    { "de": "Kannst du mir die S\u00E4ge reichen?", "es": "\u00BFPuedes pasarme la sierra?" }
  ],
  "blind": [
    { "de": "Der alte Hund ist fast blind.", "es": "El perro viejo est\u00E1 casi ciego." },
    { "de": "Er ist auf einem Auge blind geworden.", "es": "\u00C9l se ha quedado ciego de un ojo." },
    { "de": "Bist du blind ohne Brille?", "es": "\u00BFEst\u00E1s ciego sin gafas?" }
  ],
  "Abmeldung": [
    { "de": "Die Abmeldung ist p\u00FCnktlich eingegangen.", "es": "La baja ha llegado puntualmente." },
    { "de": "Ich habe die Abmeldung per E-Mail geschickt.", "es": "He enviado la baja por correo electr\u00F3nico." },
    { "de": "Hast du die Abmeldung schon bearbeitet?", "es": "\u00BFYa has tramitado la baja?" }
  ],
  "\u00DCberstunde": [
    { "de": "Die \u00DCberstunde wird extra bezahlt.", "es": "La hora extra se paga aparte." },
    { "de": "Gestern habe ich zwei \u00DCberstunden gemacht.", "es": "Ayer he hecho dos horas extra." },
    { "de": "Musst du diese Woche \u00DCberstunden machen?", "es": "\u00BFTienes que hacer horas extra esta semana?" }
  ],
  "Karotte": [
    { "de": "Die Karotte ist knackig.", "es": "La zanahoria est\u00E1 crujiente." },
    { "de": "Ich habe die Karotten in den Eintopf gerieben.", "es": "He rallado las zanahorias en el guiso." },
    { "de": "Isst du gern rohe Karotten?", "es": "\u00BFTe gusta comer zanahorias crudas?" }
  ],
  "Zwiebel": [
    { "de": "Die Zwiebel ist braun.", "es": "La cebolla es marr\u00F3n." },
    { "de": "Beim Schneiden der Zwiebel habe ich geweint.", "es": "Al cortar la cebolla he llorado." },
    { "de": "Hackst du die Zwiebel oder schneidest du sie in Ringe?", "es": "\u00BFPicas la cebolla o la cortas en aros?" }
  ],
  "Haselnuss": [
    { "de": "Die Haselnuss ist reif.", "es": "La avellana est\u00E1 madura." },
    { "de": "Wir haben Haseln\u00FCsse im Wald gesammelt.", "es": "Hemos recogido avellanas en el bosque." },
    { "de": "Hackst du Haseln\u00FCsse f\u00FCr den Kuchen?", "es": "\u00BFPicas avellanas para la tarta?" }
  ],
  "Kreisel": [
    { "de": "Der Kreisel reguliert den Verkehr.", "es": "La rotonda regula el tr\u00E1fico." },
    { "de": "Der Autofahrer ist falsch in den Kreisel eingefahren.", "es": "El conductor ha entrado mal en la rotonda." },
    { "de": "F\u00E4hrst du bei der n\u00E4chsten Ausfahrt aus dem Kreisel?", "es": "\u00BFSales de la rotonda en la pr\u00F3xima salida?" }
  ],
  "gesund": [
    { "de": "Das Gem\u00FCse ist sehr gesund.", "es": "La verdura es muy sana." },
    { "de": "Oma ist trotz ihres Alters gesund geblieben.", "es": "La abuela se ha mantenido sana a pesar de su edad." },
    { "de": "Lebst du gesund?", "es": "\u00BFVives de manera sana?" }
  ],
  "froh": [
    { "de": "Ich bin froh \u00FCber das Geschenk.", "es": "Estoy contento por el regalo." },
    { "de": "Sie hat froh gelacht.", "es": "Ella ha re\u00EDdo contenta." },
    { "de": "Bist du auch froh?", "es": "\u00BFT\u00FA tambi\u00E9n est\u00E1s contento?" }
  ],
  "die Kiwi": [
    { "de": "Die Kiwi ist reich an Vitamin C.", "es": "El kiwi es rico en vitamina C." },
    { "de": "Ich habe Kiwis in den Obstsalat geschnitten.", "es": "He cortado kiwis en la macedonia." },
    { "de": "Magst du Kiwi oder lieber Banane?", "es": "\u00BFTe gusta el kiwi o prefieres el pl\u00E1tano?" }
  ],
  "Kindergeld": [
    { "de": "Das Kindergeld ist eine monatliche Zahlung.", "es": "La prestaci\u00F3n por hijo es un pago mensual." },
    { "de": "Die Regierung hat das Kindergeld erh\u00F6ht.", "es": "El gobierno ha aumentado la prestaci\u00F3n por hijo." },
    { "de": "Bekommst du Kindergeld?", "es": "\u00BFRecibes la prestaci\u00F3n por hijo?" }
  ],
  "hinter": [
    { "de": "Der Garten liegt hinter dem Haus.", "es": "El jard\u00EDn est\u00E1 detr\u00E1s de la casa." },
    { "de": "Ich habe die Kiste hinter die T\u00FCr gestellt.", "es": "He colocado la caja detr\u00E1s de la puerta." },
    { "de": "Was verbirgst du hinter deinem R\u00FCcken?", "es": "\u00BFQu\u00E9 escondes detr\u00E1s de tu espalda?" }
  ],
  "zwanzig": [
    { "de": "Zwanzig ist eine runde Zahl.", "es": "Veinte es un n\u00FAmero redondo." },
    { "de": "Ich habe zwanzig Euro gefunden.", "es": "He encontrado veinte euros." },
    { "de": "Kostet das Buch zwanzig oder drei\u00DFig Euro?", "es": "\u00BFCuesta el libro veinte o treinta euros?" }
  ],
  "Zentimeter": [
    { "de": "Ein Zentimeter ist kurz.", "es": "Un cent\u00EDmetro es corto." },
    { "de": "Das Brett ist zwei Zentimeter zu lang.", "es": "La tabla es dos cent\u00EDmetros demasiado larga." },
    { "de": "Wie viele Zentimeter misst der Tisch?", "es": "\u00BFCu\u00E1ntos cent\u00EDmetros mide la mesa?" }
  ],
  "die Gabel": [
    { "de": "Die Gabel ist aus rostfreiem Stahl.", "es": "El tenedor es de acero inoxidable." },
    { "de": "Er hat die Gabel neben den L\u00F6ffel gelegt.", "es": "\u00C9l ha puesto el tenedor al lado de la cuchara." },
    { "de": "Darf ich eine saubere Gabel haben?", "es": "\u00BFPuedo tener un tenedor limpio?" }
  ],
  "Salat": [
    { "de": "Der Salat ist frisch aus dem Garten.", "es": "La ensalada es fresca del jard\u00EDn." },
    { "de": "Mama hat den Salat mit Essig und \u00D6l angemacht.", "es": "Mam\u00E1 ha ali\u00F1ado la ensalada con vinagre y aceite." },
    { "de": "Isst du Salat als Vorspeise oder als Hauptgericht?", "es": "\u00BFTomas ensalada de entrante o de plato principal?" }
  ],
  "Obst": [
    { "de": "Das Obst ist sehr s\u00FC\u00DF.", "es": "La fruta es muy dulce." },
    { "de": "Oma hat Obst f\u00FCr den Kuchen gekauft.", "es": "La abuela ha comprado fruta para la tarta." },
    { "de": "Was f\u00FCr Obst magst du?", "es": "\u00BFQu\u00E9 fruta te gusta?" }
  ],
  "das Schwein": [
    { "de": "Das Schwein w\u00FChlt im Schlamm.", "es": "El cerdo hozan en el barro." },
    { "de": "Der Bauer hat die Schweine gef\u00FCttert.", "es": "El granjero ha dado de comer a los cerdos." },
    { "de": "Hast du schon ein kleines Ferkel gesehen?", "es": "\u00BFHas visto ya un lechoncito?" }
  ],
  "einfach": [
    { "de": "Die Aufgabe ist einfach.", "es": "La tarea es sencilla." },
    { "de": "Das war einfacher als gedacht.", "es": "Eso fue m\u00E1s sencillo de lo pensado." },
    { "de": "Findest du das Rezept einfach?", "es": "\u00BFEncuentras sencilla la receta?" }
  ],
  "schwierig": [
    { "de": "Die Pr\u00FCfung war schwierig.", "es": "El examen fue dif\u00EDcil." },
    { "de": "Er hat eine schwierige Frage gestellt.", "es": "\u00C9l ha hecho una pregunta dif\u00EDcil." },
    { "de": "Wird die n\u00E4chste Lektion schwieriger?", "es": "\u00BFSer\u00E1 m\u00E1s dif\u00EDcil la pr\u00F3xima lecci\u00F3n?" }
  ],
  "Lunge": [
    { "de": "Die Lunge ist ein wichtiges Organ.", "es": "El pulm\u00F3n es un \u00F3rgano importante." },
    { "de": "Das Rauchen hat meine Lunge gesch\u00E4digt.", "es": "El tabaco ha da\u00F1ado mi pulm\u00F3n." },
    { "de": "Atmest du tief in die Lunge ein?", "es": "\u00BFInspiras profundamente en los pulmones?" }
  ],
  "der Wal": [
    { "de": "Der Wal ist das gr\u00F6\u00DFte S\u00E4ugetier.", "es": "La ballena es el mam\u00EDfero m\u00E1s grande." },
    { "de": "Vor Kanada haben wir Buckelwale gesehen.", "es": "Frente a Canad\u00E1 hemos visto ballenas jorobadas." },
    { "de": "Bist du schon einmal einem Wal begegnet?", "es": "\u00BFTe has encontrado ya alguna vez con una ballena?" }
  ],
  "st\u00E4rken": [
    { "de": "Du musst deinen R\u00FCcken st\u00E4rken.", "es": "Tienes que fortalecer la espalda." },
    { "de": "Das Training hat meine Muskeln gest\u00E4rkt.", "es": "El entrenamiento ha fortalecido mis m\u00FAsculos." },
    { "de": "St\u00E4rkst du dich vor dem Lauf mit einer Banane?", "es": "\u00BFTe fortaleces antes de correr con un pl\u00E1tano?" }
  ],
  "s\u00E4en": [
    { "de": "Der Bauer will im Fr\u00FChling Weizen s\u00E4en.", "es": "El granjero quiere sembrar trigo en primavera." },
    { "de": "Opa hat letzte Woche Radieschen ges\u00E4t.", "es": "El abuelo ha sembrado r\u00E1banos la semana pasada." },
    { "de": "S\u00E4st du Karotten in Reihen?", "es": "\u00BFSiembras zanahorias en filas?" }
  ],
  "L\u00F6we": [
    { "de": "Der L\u00F6we ruht im Schatten.", "es": "El le\u00F3n descansa a la sombra." },
    { "de": "Im Zoo hat der L\u00F6we gebr\u00FCllt.", "es": "En el zoo el le\u00F3n ha rugido." },
    { "de": "Hast du schon einen L\u00F6wen in Freiheit gesehen?", "es": "\u00BFHas visto ya un le\u00F3n en libertad?" }
  ],
  "Werkstatt": [
    { "de": "Die Werkstatt ist sauber und hell.", "es": "El taller est\u00E1 limpio y luminoso." },
    { "de": "Mein Onkel hat das Auto in die Werkstatt gebracht.", "es": "Mi t\u00EDo ha llevado el coche al taller." },
    { "de": "Darf ich deine Werkstatt benutzen?", "es": "\u00BFPuedo usar tu taller?" }
  ],
  "Nelke": [
    { "de": "Die Nelke duftet w\u00FCrzig.", "es": "El clavo huele especiado." },
    { "de": "Oma hat Nelken in den Gl\u00FChwein gesteckt.", "es": "La abuela ha metido clavos en el vino caliente." },
    { "de": "Benutzt du Nelken beim Kochen?", "es": "\u00BFUsas clavos al cocinar?" }
  ],
  "abschmecken": [
    { "de": "Du musst die Suppe mit Pfeffer abschmecken.", "es": "Tienes que sazonar la sopa con pimienta." },
    { "de": "Der Koch hat die So\u00DFe abgeschmeckt.", "es": "El cocinero ha sazonado la salsa." },
    { "de": "Schmeckst du das Essen vor dem Servieren ab?", "es": "\u00BFSazonas la comida antes de servir?" }
  ],
  "die Schnecke": [
    { "de": "Die Schnecke kriecht langsam.", "es": "El caracol se arrastra lentamente." },
    { "de": "Nach dem Regen sind viele Schnecken im Garten gewesen.", "es": "Despu\u00E9s de la lluvia ha habido muchos caracoles en el jard\u00EDn." },
    { "de": "Hast du eine Schnecke mit Haus gesehen?", "es": "\u00BFHas visto un caracol con concha?" }
  ],
  "bezahlen": [
    { "de": "Du musst die Rechnung morgen bezahlen.", "es": "Tienes que pagar la factura ma\u00F1ana." },
    { "de": "Ich habe das Ticket bar bezahlt.", "es": "He pagado el billete en efectivo." },
    { "de": "Bezahlst du mit Karte oder in bar?", "es": "\u00BFPagas con tarjeta o en efectivo?" }
  ],
  "Fahne": [
    { "de": "Die Fahne weht im Wind.", "es": "La bandera ondea al viento." },
    { "de": "Zur WM haben wir Fahnen ans Fenster geh\u00E4ngt.", "es": "Para el mundial hemos colgado banderas en la ventana." },
    { "de": "Schwenkst du die Fahne am Nationalfeiertag?", "es": "\u00BFAgitas la bandera el d\u00EDa de la fiesta nacional?" }
  ],
  "der Balkon": [
    { "de": "Der Balkon ist voller Blumen.", "es": "El balc\u00F3n est\u00E1 lleno de flores." },
    { "de": "Wir haben gestern auf dem Balkon gefr\u00FChst\u00FCckt.", "es": "Ayer hemos desayunado en el balc\u00F3n." },
    { "de": "Hast du einen Balkon an deiner Wohnung?", "es": "\u00BFTienes un balc\u00F3n en tu vivienda?" }
  ],
  "\u00D6l": [
    { "de": "Das \u00D6l ist aus der Flasche ausgelaufen.", "es": "El aceite se ha derramado de la botella." },
    { "de": "Ich habe das \u00D6l in einer Pfanne erhitzt.", "es": "He calentado el aceite en una sart\u00E9n." },
    { "de": "Nimmst du Oliven\u00F6l oder Sonnenblumen\u00F6l?", "es": "\u00BFTomas aceite de oliva o de girasol?" }
  ],
  "Reis": [
    { "de": "Der Reis quillt im Wasser auf.", "es": "El arroz se hincha en el agua." },
    { "de": "Wir haben heute Reis mit H\u00E4hnchen gegessen.", "es": "Hoy hemos comido arroz con pollo." },
    { "de": "W\u00E4schst du den Reis vor dem Kochen?", "es": "\u00BFLavas el arroz antes de cocinarlo?" }
  ],
  "unn\u00F6tig": [
    { "de": "Deine Sorge ist v\u00F6llig unn\u00F6tig.", "es": "Tu preocupaci\u00F3n es completamente innecesaria." },
    { "de": "Sie hat unn\u00F6tig viel Geld ausgegeben.", "es": "Ella ha gastado innecesariamente mucho dinero." },
    { "de": "War das alles unn\u00F6tig?", "es": "\u00BFTodo eso fue innecesario?" }
  ],
  "r\u00FChren": [
    { "de": "Du musst die Farbe gut r\u00FChren.", "es": "Tienes que remover bien la pintura." },
    { "de": "Oma hat den Kuchenteig mit einem L\u00F6ffel ger\u00FChrt.", "es": "La abuela ha removido la masa de la tarta con una cuchara." },
    { "de": "R\u00FChrst du die Suppe um, damit sie nicht anbrennt?", "es": "\u00BFRemueves la sopa para que no se pegue?" }
  ],
  "Wurm": [
    { "de": "Der Wurm lebt in feuchter Erde.", "es": "El gusano vive en tierra h\u00FAmeda." },
    { "de": "Der Angler hat einen Wurm auf den Haken gesteckt.", "es": "El pescador ha puesto un gusano en el anzuelo." },
    { "de": "Hast du schon einen Regenwurm gerettet?", "es": "\u00BFHas salvado ya una lombriz?" }
  ],
  "Elefant": [
    { "de": "Der Elefant hat gro\u00DFe Ohren.", "es": "El elefante tiene orejas grandes." },
    { "de": "Wir haben einen Elefanten im Safaripark gesehen.", "es": "Hemos visto un elefante en el parque safari." },
    { "de": "Darf man auf einem Elefanten reiten?", "es": "\u00BFSe puede montar en un elefante?" }
  ],
  "ergeben": [
    { "de": "Die Rechnung muss einen Sinn ergeben.", "es": "El c\u00E1lculo tiene que tener sentido." },
    { "de": "Aus der Diskussion hat sich ein neuer Plan ergeben.", "es": "De la discusi\u00F3n ha resultado un nuevo plan." },
    { "de": "Ergibt das f\u00FCr dich einen logischen Schluss?", "es": "\u00BFTe resulta una conclusi\u00F3n l\u00F3gica?" }
  ],
  "Bleistift": [
    { "de": "Der Bleistift ist angespitzt.", "es": "El l\u00E1piz est\u00E1 afilado." },
    { "de": "Ich habe den Bleistift hinter das Ohr gesteckt.", "es": "Me he puesto el l\u00E1piz detr\u00E1s de la oreja." },
    { "de": "Schreibst du lieber mit Bleistift oder mit Kuli?", "es": "\u00BFPrefieres escribir con l\u00E1piz o con bol\u00EDgrafo?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block8 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 8 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);