const fs = require("fs");

// Cargar archivo existente (bloques 1-9)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 10: palabras 451 a 500
const block10 = {
  "\u00FCber": [
    { "de": "Das Bild h\u00E4ngt \u00FCber dem Sofa.", "es": "El cuadro cuelga sobre el sof\u00E1." },
    { "de": "Wir haben \u00FCber das Wetter gesprochen.", "es": "Hemos hablado sobre el tiempo." },
    { "de": "Freust du dich \u00FCber das Geschenk?", "es": "\u00BFTe alegras por el regalo?" }
  ],
  "das Museum": [
    { "de": "Das Museum hat montags geschlossen.", "es": "El museo cierra los lunes." },
    { "de": "Ich habe das Museum mit meiner Klasse besucht.", "es": "He visitado el museo con mi clase." },
    { "de": "Willst du am Samstag ins Museum gehen?", "es": "\u00BFQuieres ir al museo el s\u00E1bado?" }
  ],
  "Melone": [
    { "de": "Die Melone ist kalt und erfrischend.", "es": "El mel\u00F3n est\u00E1 fr\u00EDo y es refrescante." },
    { "de": "Wir haben eine Melone auf dem Markt gekauft.", "es": "Hemos comprado un mel\u00F3n en el mercado." },
    { "de": "Magst du Wassermelone oder Honigmelone?", "es": "\u00BFTe gusta la sand\u00EDa o el mel\u00F3n amarillo?" }
  ],
  "der Campingplatz": [
    { "de": "Der Campingplatz liegt direkt am See.", "es": "El camping est\u00E1 justo junto al lago." },
    { "de": "Wir haben einen Stellplatz auf dem Campingplatz reserviert.", "es": "Hemos reservado una parcela en el camping." },
    { "de": "F\u00E4hrst du gern auf den Campingplatz?", "es": "\u00BFTe gusta ir al camping?" }
  ],
  "sich legen": [
    { "de": "Ich muss mich nach dem Essen hinlegen.", "es": "Tengo que tumbarme despu\u00E9s de comer." },
    { "de": "Der Hund hat sich unter den Tisch gelegt.", "es": "El perro se ha tumbado debajo de la mesa." },
    { "de": "Legst du dich jeden Mittag hin?", "es": "\u00BFTe tumbas todos los mediod\u00EDas?" }
  ],
  "der See": [
    { "de": "Der See ist spiegelglatt.", "es": "El lago est\u00E1 como un espejo." },
    { "de": "Im Sommer sind wir im See geschwommen.", "es": "En verano hemos nadado en el lago." },
    { "de": "Darf man im See angeln?", "es": "\u00BFSe puede pescar en el lago?" }
  ],
  "Versicherungskarte": [
    { "de": "Die Versicherungskarte ist abgelaufen.", "es": "La tarjeta sanitaria ha caducado." },
    { "de": "Ich habe meine Versicherungskarte beim Arzt vorgezeigt.", "es": "He mostrado mi tarjeta sanitaria al m\u00E9dico." },
    { "de": "Hast du deine Versicherungskarte dabei?", "es": "\u00BFLlevas contigo tu tarjeta sanitaria?" }
  ],
  "der Jahrestag": [
    { "de": "Der Jahrestag ist ein besonderer Tag.", "es": "El aniversario es un d\u00EDa especial." },
    { "de": "Wir haben unseren Jahrestag in einem Restaurant gefeiert.", "es": "Hemos celebrado nuestro aniversario en un restaurante." },
    { "de": "Wann ist euer Jahrestag?", "es": "\u00BFCu\u00E1ndo es vuestro aniversario?" }
  ],
  "der Brownie": [
    { "de": "Der Brownie schmeckt schokoladig.", "es": "El brownie sabe achocolatado." },
    { "de": "Zum Nachtisch hat es Brownies gegeben.", "es": "De postre ha habido brownies." },
    { "de": "Backst du Brownies mit N\u00FCssen?", "es": "\u00BFHorneas brownies con nueces?" }
  ],
  "Fr\u00FChst\u00FCck": [
    { "de": "Das Fr\u00FChst\u00FCck ist die wichtigste Mahlzeit.", "es": "El desayuno es la comida m\u00E1s importante." },
    { "de": "Heute habe ich ein gro\u00DFes Fr\u00FChst\u00FCck gemacht.", "es": "Hoy he preparado un gran desayuno." },
    { "de": "Isst du M\u00FCsli zum Fr\u00FChst\u00FCck?", "es": "\u00BFDesayunas muesli?" }
  ],
  "Mittagessen": [
    { "de": "Das Mittagessen steht auf dem Tisch.", "es": "La comida est\u00E1 en la mesa." },
    { "de": "Wir haben das Mittagessen in der Kantine gegessen.", "es": "Hemos comido en la cantina." },
    { "de": "Was kochst du heute zum Mittagessen?", "es": "\u00BFQu\u00E9 cocinas hoy para la comida?" }
  ],
  "der Park": [
    { "de": "Der Park ist voller Blumen.", "es": "El parque est\u00E1 lleno de flores." },
    { "de": "Gestern sind wir im Park spazieren gegangen.", "es": "Ayer hemos paseado por el parque." },
    { "de": "Spielst du im Park mit deinen Freunden?", "es": "\u00BFJuegas en el parque con tus amigos?" }
  ],
  "Besprechungsraum": [
    { "de": "Der Besprechungsraum ist frei.", "es": "La sala de reuniones est\u00E1 libre." },
    { "de": "Sie hat den Besprechungsraum f\u00FCr elf Uhr gebucht.", "es": "Ella ha reservado la sala de reuniones para las once." },
    { "de": "D\u00FCrfen wir den Besprechungsraum benutzen?", "es": "\u00BFPodemos usar la sala de reuniones?" }
  ],
  "Rauchmelder": [
    { "de": "Der Rauchmelder piepst bei Feuer.", "es": "El detector de humo pita cuando hay fuego." },
    { "de": "Wir haben einen neuen Rauchmelder installiert.", "es": "Hemos instalado un detector de humo nuevo." },
    { "de": "Hast du einen Rauchmelder in der K\u00FCche?", "es": "\u00BFTienes un detector de humo en la cocina?" }
  ],
  "frisch": [
    { "de": "Das Brot ist noch frisch.", "es": "El pan todav\u00EDa est\u00E1 fresco." },
    { "de": "Ich habe frische Milch vom Bauern geholt.", "es": "He tra\u00EDdo leche fresca del granjero." },
    { "de": "Kaufst du frisches Gem\u00FCse auf dem Markt?", "es": "\u00BFCompras verdura fresca en el mercado?" }
  ],
  "Curry": [
    { "de": "Das Curry riecht w\u00FCrzig.", "es": "El curry huele especiado." },
    { "de": "Wir haben ein scharfes Curry gegessen.", "es": "Hemos comido un curry picante." },
    { "de": "Kochst du gern Curry mit Kokosmilch?", "es": "\u00BFTe gusta cocinar curry con leche de coco?" }
  ],
  "aufstehen": [
    { "de": "Morgen muss ich um f\u00FCnf aufstehen.", "es": "Ma\u00F1ana tengo que levantarme a las cinco." },
    { "de": "Er ist heute sehr fr\u00FCh aufgestanden.", "es": "\u00C9l se ha levantado hoy muy temprano." },
    { "de": "Stehst du am Sonntag sp\u00E4ter auf?", "es": "\u00BFTe levantas m\u00E1s tarde el domingo?" }
  ],
  "der Eimer": [
    { "de": "Der Eimer ist voller Wasser.", "es": "El cubo est\u00E1 lleno de agua." },
    { "de": "Ich habe den Eimer in den Keller gestellt.", "es": "He puesto el cubo en el s\u00F3tano." },
    { "de": "Kannst du den Eimer ausleeren?", "es": "\u00BFPuedes vaciar el cubo?" }
  ],
  "Blutdruck": [
    { "de": "Mein Blutdruck ist normal.", "es": "Mi presi\u00F3n arterial es normal." },
    { "de": "Der Arzt hat den Blutdruck gemessen.", "es": "El m\u00E9dico ha medido la presi\u00F3n arterial." },
    { "de": "Hast du hohen Blutdruck?", "es": "\u00BFTienes la presi\u00F3n alta?" }
  ],
  "zwischen": [
    { "de": "Die Katze sitzt zwischen den St\u00FChlen.", "es": "El gato se sienta entre las sillas." },
    { "de": "Ich habe das Foto zwischen die Seiten gelegt.", "es": "He puesto la foto entre las p\u00E1ginas." },
    { "de": "Stehst du zwischen deinen Eltern?", "es": "\u00BFEst\u00E1s entre tus padres?" }
  ],
  "der Wein": [
    { "de": "Der Wein ist aus Italien.", "es": "El vino es de Italia." },
    { "de": "Wir haben einen guten Wein zum Abendessen getrunken.", "es": "Hemos bebido un buen vino para la cena." },
    { "de": "Trinkst du lieber Rotwein oder Wei\u00DFwein?", "es": "\u00BFPrefieres vino tinto o blanco?" }
  ],
  "die Ziege": [
    { "de": "Die Ziege frisst Gras.", "es": "La cabra come hierba." },
    { "de": "Der Bauer hat die Ziege gemolken.", "es": "El granjero ha orde\u00F1ado la cabra." },
    { "de": "Hast du schon eine Ziege gestreichelt?", "es": "\u00BFHas acariciado ya una cabra?" }
  ],
  "das Eis": [
    { "de": "Das Eis schmilzt in der Sonne.", "es": "El helado se derrite al sol." },
    { "de": "Ich habe drei Kugeln Eis gegessen.", "es": "He comido tres bolas de helado." },
    { "de": "Magst du Schokoladeneis?", "es": "\u00BFTe gusta el helado de chocolate?" }
  ],
  "Mitternacht": [
    { "de": "Mitternacht ist es ganz still.", "es": "A medianoche est\u00E1 todo muy tranquilo." },
    { "de": "Sie sind erst um Mitternacht nach Hause gekommen.", "es": "No han llegado a casa hasta la medianoche." },
    { "de": "Bleibst du bis Mitternacht wach?", "es": "\u00BFTe quedas despierto hasta medianoche?" }
  ],
  "ungeordnet": [
    { "de": "Das Zimmer ist v\u00F6llig ungeordnet.", "es": "La habitaci\u00F3n est\u00E1 totalmente desordenada." },
    { "de": "Er hat seine Sachen ungeordnet liegenlassen.", "es": "\u00C9l ha dejado sus cosas tiradas de manera desordenada." },
    { "de": "Ist dein Schreibtisch immer so ungeordnet?", "es": "\u00BFEst\u00E1 tu escritorio siempre tan desordenado?" }
  ],
  "der L\u00F6we": [
    { "de": "Der L\u00F6we ist der K\u00F6nig der Tiere.", "es": "El le\u00F3n es el rey de los animales." },
    { "de": "Im Zirkus hat der L\u00F6we Kunstst\u00FCcke gezeigt.", "es": "En el circo el le\u00F3n ha hecho trucos." },
    { "de": "Hast du schon einen L\u00F6wen in der Wildnis gesehen?", "es": "\u00BFHas visto ya un le\u00F3n en libertad?" }
  ],
  "Hintert\u00FCr": [
    { "de": "Die Hintert\u00FCr f\u00FChrt zum Garten.", "es": "La puerta trasera da al jard\u00EDn." },
    { "de": "Er hat die Hintert\u00FCr abgeschlossen.", "es": "\u00C9l ha cerrado la puerta trasera con llave." },
    { "de": "Gehst du durch die Hintert\u00FCr?", "es": "\u00BFSales por la puerta trasera?" }
  ],
  "Abend": [
    { "de": "Der Abend wird k\u00FChl.", "es": "La tarde se vuelve fresca." },
    { "de": "Wir haben den Abend mit einem Film verbracht.", "es": "Hemos pasado la tarde con una pel\u00EDcula." },
    { "de": "Was machst du am Abend?", "es": "\u00BFQu\u00E9 haces por la tarde?" }
  ],
  "Fr\u00FChling": [
    { "de": "Der Fr\u00FChling bringt w\u00E4rmere Tage.", "es": "La primavera trae d\u00EDas m\u00E1s c\u00E1lidos." },
    { "de": "Im Fr\u00FChling haben wir Kirschbl\u00FCten gesehen.", "es": "En primavera hemos visto cerezos en flor." },
    { "de": "Magst du den Fr\u00FChling?", "es": "\u00BFTe gusta la primavera?" }
  ],
  "der Schmetterling": [
    { "de": "Der Schmetterling hat bunte Fl\u00FCgel.", "es": "La mariposa tiene alas de colores." },
    { "de": "Ich habe einen Schmetterling auf der Blume beobachtet.", "es": "He observado una mariposa en la flor." },
    { "de": "Siehst du den gelben Schmetterling?", "es": "\u00BFVes la mariposa amarilla?" }
  ],
  "Lippenstift": [
    { "de": "Der Lippenstift ist rot.", "es": "El pintalabios es rojo." },
    { "de": "Sie hat sich Lippenstift aufgetragen.", "es": "Ella se ha aplicado pintalabios." },
    { "de": "Welche Farbe hat dein Lippenstift?", "es": "\u00BFDe qu\u00E9 color es tu pintalabios?" }
  ],
  "M\u00FCnze": [
    { "de": "Die M\u00FCnze gl\u00E4nzt im Licht.", "es": "La moneda brilla a la luz." },
    { "de": "Ich habe eine M\u00FCnze im Sand gefunden.", "es": "He encontrado una moneda en la arena." },
    { "de": "Hast du eine Ein-Euro-M\u00FCnze?", "es": "\u00BFTienes una moneda de un euro?" }
  ],
  "Bucht": [
    { "de": "Die Bucht ist sehr malerisch.", "es": "La bah\u00EDa es muy pintoresca." },
    { "de": "Wir sind in einer kleinen Bucht geschwommen.", "es": "Hemos nadado en una peque\u00F1a bah\u00EDa." },
    { "de": "Liegt das Hotel an einer Bucht?", "es": "\u00BFEst\u00E1 el hotel junto a una bah\u00EDa?" }
  ],
  "Schraube": [
    { "de": "Die Schraube ist locker.", "es": "El tornillo est\u00E1 flojo." },
    { "de": "Er hat die Schraube mit einem Schraubenzieher gedreht.", "es": "\u00C9l ha girado el tornillo con un destornillador." },
    { "de": "Kannst du die Schraube festziehen?", "es": "\u00BFPuedes apretar el tornillo?" }
  ],
  "Thermometer": [
    { "de": "Das Thermometer zeigt drei\u00DFig Grad.", "es": "El term\u00F3metro marca treinta grados." },
    { "de": "Die Mutter hat mit dem Thermometer Fieber gemessen.", "es": "La madre ha medido la fiebre con el term\u00F3metro." },
    { "de": "Hast du ein Thermometer zu Hause?", "es": "\u00BFTienes un term\u00F3metro en casa?" }
  ],
  "Hubschrauber": [
    { "de": "Der Hubschrauber fliegt tief.", "es": "El helic\u00F3ptero vuela bajo." },
    { "de": "Wir haben einen Hubschrauber am Himmel geh\u00F6rt.", "es": "Hemos o\u00EDdo un helic\u00F3ptero en el cielo." },
    { "de": "Kann ein Hubschrauber auf dem Dach landen?", "es": "\u00BFPuede aterrizar un helic\u00F3ptero en el tejado?" }
  ],
  "veranstalten": [
    { "de": "Der Verein will ein Fest veranstalten.", "es": "La asociaci\u00F3n quiere organizar una fiesta." },
    { "de": "Sie haben einen Flohmarkt veranstaltet.", "es": "Han organizado un mercadillo." },
    { "de": "Veranstaltest du eine Geburtstagsparty?", "es": "\u00BFOrganizas una fiesta de cumplea\u00F1os?" }
  ],
  "die F\u00FCnf": [
    { "de": "Die F\u00FCnf ist eine ungerade Zahl.", "es": "El cinco es un n\u00FAmero impar." },
    { "de": "Ich habe eine F\u00FCnf in Mathe geschrieben.", "es": "He sacado un cinco en matem\u00E1ticas." },
    { "de": "Ist die F\u00FCnf deine Note?", "es": "\u00BFEs el cinco tu nota?" }
  ],
  "M\u00FCcke": [
    { "de": "Die M\u00FCcke summt laut.", "es": "El mosquito zumba fuerte." },
    { "de": "Mich hat eine M\u00FCcke gestochen.", "es": "Me ha picado un mosquito." },
    { "de": "Hast du ein Mittel gegen M\u00FCcken?", "es": "\u00BFTienes un repelente de mosquitos?" }
  ],
  "Wind": [
    { "de": "Der Wind weht aus S\u00FCden.", "es": "El viento sopla del sur." },
    { "de": "Gestern hat der Wind meine M\u00FCtze weggeweht.", "es": "Ayer el viento se llev\u00F3 mi gorra." },
    { "de": "Sp\u00FCrst du den starken Wind?", "es": "\u00BFNotas el fuerte viento?" }
  ],
  "f\u00FCnfzehn": [
    { "de": "F\u00FCnfzehn Minuten sind eine Viertelstunde.", "es": "Quince minutos son un cuarto de hora." },
    { "de": "Ich habe f\u00FCnfzehn Euro ausgegeben.", "es": "He gastado quince euros." },
    { "de": "Bist du f\u00FCnfzehn Jahre alt?", "es": "\u00BFTienes quince a\u00F1os?" }
  ],
  "die Biene": [
    { "de": "Die Biene sammelt Honig.", "es": "La abeja recolecta miel." },
    { "de": "Eine Biene hat mich in den Finger gestochen.", "es": "Una abeja me ha picado en el dedo." },
    { "de": "Siehst du die Biene auf der Blume?", "es": "\u00BFVes la abeja en la flor?" }
  ],
  "sechzig": [
    { "de": "Sechzig ist eine Zahl.", "es": "Sesenta es un n\u00FAmero." },
    { "de": "Opa ist gestern sechzig geworden.", "es": "El abuelo cumpli\u00F3 ayer sesenta a\u00F1os." },
    { "de": "Kostet das Hemd sechzig Euro?", "es": "\u00BFCuesta la camisa sesenta euros?" }
  ],
  "Euro": [
    { "de": "Der Euro ist die W\u00E4hrung.", "es": "El euro es la moneda." },
    { "de": "Ich habe zwanzig Euro in der Tasche.", "es": "Tengo veinte euros en el bolsillo." },
    { "de": "Hast du einen Euro f\u00FCr den Automaten?", "es": "\u00BFTienes un euro para la m\u00E1quina?" }
  ],
  "hundert": [
    { "de": "Hundert Cent sind ein Euro.", "es": "Cien c\u00E9ntimos son un euro." },
    { "de": "Wir sind hundert Meter geschwommen.", "es": "Hemos nadado cien metros." },
    { "de": "Z\u00E4hlst du bis hundert?", "es": "\u00BFCuentas hasta cien?" }
  ],
  "hindern": [
    { "de": "Der Schnee hindert uns am Fahren.", "es": "La nieve nos impide conducir." },
    { "de": "Ein Zaun hat die K\u00FChe daran gehindert, wegzulaufen.", "es": "Una valla ha impedido que las vacas se escaparan." },
    { "de": "Hindert dich etwas am Lernen?", "es": "\u00BFTe impide algo aprender?" }
  ],
  "gen\u00FCgen": [
    { "de": "Ein kleiner Tipp gen\u00FCgt.", "es": "Un peque\u00F1o consejo basta." },
    { "de": "Das Geld hat nicht f\u00FCr die Miete gen\u00FCgt.", "es": "El dinero no ha bastado para el alquiler." },
    { "de": "Gen\u00FCgt dir ein St\u00FCck Kuchen?", "es": "\u00BFTe basta un trozo de tarta?" }
  ],
  "Bluse": [
    { "de": "Die Bluse ist aus Seide.", "es": "La blusa es de seda." },
    { "de": "Sie hat eine wei\u00DFe Bluse zur Arbeit getragen.", "es": "Ella ha llevado una blusa blanca al trabajo." },
    { "de": "Gef\u00E4llt dir meine neue Bluse?", "es": "\u00BFTe gusta mi blusa nueva?" }
  ],
  "zerbrechen": [
    { "de": "Das Glas kann leicht zerbrechen.", "es": "El vaso puede romperse f\u00E1cilmente." },
    { "de": "Er hat den Teller zerbrochen.", "es": "\u00C9l ha roto el plato." },
    { "de": "Hast du schon einen Spiegel zerbrochen?", "es": "\u00BFHas roto ya un espejo?" }
  ],
  "erh\u00F6hen": [
    { "de": "Der Chef will mein Gehalt erh\u00F6hen.", "es": "El jefe quiere aumentarme el sueldo." },
    { "de": "Die Bank hat die Zinsen erh\u00F6ht.", "es": "El banco ha aumentado los intereses." },
    { "de": "Erh\u00F6hst du bitte die Lautst\u00E4rke?", "es": "\u00BFSubes el volumen, por favor?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block10 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 10 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);