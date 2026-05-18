const fs = require("fs");

// Cargar el archivo existente (bloques 1-3)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 4: palabras 151 a 200
const block4 = {
  "preposiciones": [
    { "de": "\"preposiciones\" ist ein spanisches Wort.", "es": "\"preposiciones\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"preposiciones\" Pr\u00E4positionen.", "es": "En alem\u00E1n \"preposiciones\" significa preposiciones." },
    { "de": "Lernst du die deutschen Pr\u00E4positionen?", "es": "\u00BFAprendes las preposiciones alemanas?" }
  ],
  "aufheben": [
    { "de": "Kannst du bitte den M\u00FCll aufheben?", "es": "\u00BFPuedes recoger la basura, por favor?" },
    { "de": "Ich habe das Geld vom Boden aufgehoben.", "es": "He recogido el dinero del suelo." },
    { "de": "Hebst du die Zeitung auf?", "es": "\u00BFRecoges el peri\u00F3dico?" }
  ],
  "die Himbeere": [
    { "de": "Die Himbeere ist s\u00FC\u00DF und rot.", "es": "La frambuesa es dulce y roja." },
    { "de": "Wir haben letztes Jahr Himbeeren gepflanzt.", "es": "El a\u00F1o pasado plantamos frambuesas." },
    { "de": "Magst du frische Himbeeren?", "es": "\u00BFTe gustan las frambuesas frescas?" }
  ],
  "Limonade": [
    { "de": "Die Limonade ist zu s\u00FC\u00DF.", "es": "La limonada es demasiado dulce." },
    { "de": "Er hat sich eine kalte Limonade eingeschenkt.", "es": "\u00C9l se ha servido una limonada fr\u00EDa." },
    { "de": "Trinkst du gern Limonade?", "es": "\u00BFTe gusta beber limonada?" }
  ],
  "Lampe": [
    { "de": "Die Lampe leuchtet nicht mehr.", "es": "La l\u00E1mpara ya no alumbra." },
    { "de": "Opa hat die alte Lampe repariert.", "es": "El abuelo ha reparado la l\u00E1mpara vieja." },
    { "de": "Kannst du die Lampe ausmachen?", "es": "\u00BFPuedes apagar la l\u00E1mpara?" }
  ],
  "der Ausflug": [
    { "de": "Der Ausflug war wirklich sch\u00F6n.", "es": "La excursi\u00F3n fue realmente bonita." },
    { "de": "Am Sonntag haben wir einen Ausflug an den See gemacht.", "es": "El domingo hicimos una excursi\u00F3n al lago." },
    { "de": "Planst du einen Ausflug f\u00FCr das Wochenende?", "es": "\u00BFPlaneas una excursi\u00F3n para el fin de semana?" }
  ],
  "scannen": [
    { "de": "Du musst die Rechnung scannen.", "es": "Tienes que escanear la factura." },
    { "de": "Ich habe die Fotos gescannt.", "es": "He escaneado las fotos." },
    { "de": "Scannst du das Dokument f\u00FCr mich?", "es": "\u00BFEscaneas el documento para m\u00ED?" }
  ],
  "d\u00E4mpfen": [
    { "de": "Der Koch will den Fisch d\u00E4mpfen.", "es": "El cocinero quiere cocer el pescado al vapor." },
    { "de": "Ich habe das Gem\u00FCse nur kurz ged\u00E4mpft.", "es": "He cocido la verdura al vapor solo brevemente." },
    { "de": "D\u00E4mpfst du das H\u00E4hnchen oder br\u00E4tst du es?", "es": "\u00BFCueces el pollo al vapor o lo fr\u00EDes?" }
  ],
  "Thunfisch": [
    { "de": "Der Thunfisch schmeckt mild.", "es": "El at\u00FAn sabe suave." },
    { "de": "Sie hat Thunfischsalat f\u00FCr das Abendessen gemacht.", "es": "Ella ha hecho ensalada de at\u00FAn para la cena." },
    { "de": "Kaufst du frischen oder dosierten Thunfisch?", "es": "\u00BFCompras at\u00FAn fresco o en lata?" }
  ],
  "seit": [
    { "de": "Seit einer Stunde warte ich hier.", "es": "Llevo una hora esperando aqu\u00ED." },
    { "de": "Er lernt Deutsch seit letztem Jahr.", "es": "\u00C9l aprende alem\u00E1n desde el a\u00F1o pasado." },
    { "de": "Seit wann arbeitest du hier?", "es": "\u00BFDesde cu\u00E1ndo trabajas aqu\u00ED?" }
  ],
  "Abgabefrist": [
    { "de": "Die Abgabefrist ist heute um zw\u00F6lf Uhr.", "es": "El plazo de entrega es hoy a las doce." },
    { "de": "Der Student hat die Abgabefrist verpasst.", "es": "El estudiante ha incumplido el plazo de entrega." },
    { "de": "Hast du die Abgabefrist im Kalender notiert?", "es": "\u00BFHas anotado el plazo de entrega en el calendario?" }
  ],
  "Uhr": [
    { "de": "Die Uhr h\u00E4ngt an der Wand.", "es": "El reloj cuelga de la pared." },
    { "de": "Mein Gro\u00DFvater hat mir eine Uhr geschenkt.", "es": "Mi abuelo me ha regalado un reloj." },
    { "de": "Wie sp\u00E4t ist es auf deiner Uhr?", "es": "\u00BFQu\u00E9 hora marca tu reloj?" }
  ],
  "beziehen": [
    { "de": "Worauf beziehst du dich?", "es": "\u00BFA qu\u00E9 te refieres?" },
    { "de": "Er hat sich auf die Statistik bezogen.", "es": "\u00C9l se ha referido a la estad\u00EDstica." },
    { "de": "Kannst du das auf den Text beziehen?", "es": "\u00BFPuedes referir eso al texto?" }
  ],
  "Bude": [
    { "de": "Die Bude verkauft hei\u00DFe W\u00FCrstchen.", "es": "El puesto vende salchichas calientes." },
    { "de": "Wir haben an der Bude Pommes gegessen.", "es": "Hemos comido patatas fritas en el puesto." },
    { "de": "Gibt es hier eine Bude mit Eis?", "es": "\u00BFHay un puesto de helados aqu\u00ED?" }
  ],
  "der Ohrring": [
    { "de": "Der Ohrring ist aus Silber.", "es": "El pendiente es de plata." },
    { "de": "Sie hat einen Ohrring verloren.", "es": "Ella ha perdido un pendiente." },
    { "de": "Tr\u00E4gst du gern Ohrringe?", "es": "\u00BFTe gusta llevar pendientes?" }
  ],
  "aufr\u00E4umen": [
    { "de": "Du musst dein Zimmer aufr\u00E4umen.", "es": "Tienes que ordenar tu habitaci\u00F3n." },
    { "de": "Die Kinder haben das Spielzeug aufger\u00E4umt.", "es": "Los ni\u00F1os han ordenado los juguetes." },
    { "de": "R\u00E4umst du bitte den Tisch auf?", "es": "\u00BFOrdenas la mesa, por favor?" }
  ],
  "b\u00FCgeln": [
    { "de": "Ich muss noch die Hemden b\u00FCgeln.", "es": "Todav\u00EDa tengo que planchar las camisas." },
    { "de": "Er hat die ganze W\u00E4sche geb\u00FCgelt.", "es": "\u00C9l ha planchado toda la ropa." },
    { "de": "B\u00FCgelst du gern?", "es": "\u00BFTe gusta planchar?" }
  ],
  "Eintopf": [
    { "de": "Der Eintopf schmeckt herzhaft.", "es": "El guiso sabe contundente." },
    { "de": "Mutter hat einen Eintopf mit Wurst gekocht.", "es": "Mam\u00E1 ha cocinado un guiso con salchicha." },
    { "de": "Magst du Linseneintopf?", "es": "\u00BFTe gusta el guiso de lentejas?" }
  ],
  "Einbahnstra\u00DFe": [
    { "de": "Das ist eine Einbahnstra\u00DFe.", "es": "Esta es una calle de direcci\u00F3n \u00FAnica." },
    { "de": "Der Fahrer ist in die Einbahnstra\u00DFe falsch eingefahren.", "es": "El conductor ha entrado mal en la calle de direcci\u00F3n \u00FAnica." },
    { "de": "Darfst du in diese Einbahnstra\u00DFe fahren?", "es": "\u00BFPuedes circular por esta calle de direcci\u00F3n \u00FAnica?" }
  ],
  "Kurs": [
    { "de": "Der Kurs f\u00E4ngt um neun an.", "es": "El curso empieza a las nueve." },
    { "de": "Ich habe letztes Jahr einen Sprachkurs besucht.", "es": "El a\u00F1o pasado asist\u00ED a un curso de idiomas." },
    { "de": "Hast du den Kurs schon bezahlt?", "es": "\u00BFYa has pagado el curso?" }
  ],
  "Unterhemd": [
    { "de": "Mein Unterhemd ist zu eng.", "es": "Mi camiseta interior est\u00E1 demasiado ajustada." },
    { "de": "Im Winter trage ich immer ein Unterhemd.", "es": "En invierno siempre llevo una camiseta interior." },
    { "de": "Kaufst du Unterhemden aus Baumwolle?", "es": "\u00BFCompras camisetas interiores de algod\u00F3n?" }
  ],
  "tanken": [
    { "de": "Wir m\u00FCssen auf der Autobahn tanken.", "es": "Tenemos que echar gasolina en la autopista." },
    { "de": "Er hat f\u00FCr f\u00FCnfzig Euro getankt.", "es": "\u00C9l ha echado gasolina por cincuenta euros." },
    { "de": "Tankst du immer bei derselben Tankstelle?", "es": "\u00BFEchas gasolina siempre en la misma gasolinera?" }
  ],
  "Pausenraum": [
    { "de": "Der Pausenraum ist im Keller.", "es": "La sala de descanso est\u00E1 en el s\u00F3tano." },
    { "de": "Die Kollegen haben im Pausenraum Kaffee getrunken.", "es": "Los compa\u00F1eros han bebido caf\u00E9 en la sala de descanso." },
    { "de": "Darf ich im Pausenraum essen?", "es": "\u00BFPuedo comer en la sala de descanso?" }
  ],
  "siebzig": [
    { "de": "Die siebzig ist eine zweistellige Zahl.", "es": "El setenta es un n\u00FAmero de dos cifras." },
    { "de": "Oma ist gestern siebzig geworden.", "es": "La abuela cumpli\u00F3 ayer setenta a\u00F1os." },
    { "de": "Kostet der Schrank mehr als siebzig Euro?", "es": "\u00BFCuesta el armario m\u00E1s de setenta euros?" }
  ],
  "Rezeptionist": [
    { "de": "Der Rezeptionist ist sehr h\u00F6flich.", "es": "El recepcionista es muy educado." },
    { "de": "Ich habe den Rezeptionisten nach der Zimmernummer gefragt.", "es": "He preguntado al recepcionista por el n\u00FAmero de la habitaci\u00F3n." },
    { "de": "Arbeitet der Rezeptionist auch nachts?", "es": "\u00BFTrabaja el recepcionista tambi\u00E9n por la noche?" }
  ],
  "der Koffer": [
    { "de": "Der Koffer ist schwer.", "es": "La maleta es pesada." },
    { "de": "Sie hat den Koffer schon gepackt.", "es": "Ella ya ha hecho la maleta." },
    { "de": "Nimmst du einen gro\u00DFen Koffer mit?", "es": "\u00BFTe llevas una maleta grande?" }
  ],
  "Pyjama": [
    { "de": "Mein Pyjama ist kuschelig.", "es": "Mi pijama es suave y c\u00E1lido." },
    { "de": "Er hat den Pyjama unter das Kopfkissen gelegt.", "es": "\u00C9l ha puesto el pijama debajo de la almohada." },
    { "de": "Ziehst du deinen Pyjama fr\u00FCh an?", "es": "\u00BFTe pones el pijama temprano?" }
  ],
  "Stellvertreter": [
    { "de": "Der Stellvertreter kommt gleich.", "es": "El suplente viene enseguida." },
    { "de": "Unser Chef hat einen Stellvertreter ernannt.", "es": "Nuestro jefe ha nombrado un suplente." },
    { "de": "Wer ist der Stellvertreter w\u00E4hrend deines Urlaubs?", "es": "\u00BFQui\u00E9n es el suplente durante tus vacaciones?" }
  ],
  "rufen": [
    { "de": "Du musst einen Arzt rufen.", "es": "Tienes que llamar a un m\u00E9dico." },
    { "de": "Sie hat laut um Hilfe gerufen.", "es": "Ella ha pedido ayuda a gritos." },
    { "de": "Rufst du mich morgen an?", "es": "\u00BFMe llamas ma\u00F1ana?" }
  ],
  "Schaufensterbummel": [
    { "de": "Ein Schaufensterbummel macht Spa\u00DF.", "es": "Un paseo de escaparates es divertido." },
    { "de": "Am Samstag haben wir einen Schaufensterbummel gemacht.", "es": "El s\u00E1bado hemos dado un paseo de escaparates." },
    { "de": "Gehst du gern Schaufensterbummel?", "es": "\u00BFTe gusta ir de escaparates?" }
  ],
  "verhasst": [
    { "de": "Dieses Lied ist bei vielen verhasst.", "es": "Esta canci\u00F3n es odiada por muchos." },
    { "de": "Er wurde ohne Grund verhasst.", "es": "\u00C9l fue odiado sin motivo." },
    { "de": "Warum bist du so verhasst?", "es": "\u00BFPor qu\u00E9 eres tan odiado?" }
  ],
  "der Herd": [
    { "de": "Der Herd ist noch warm.", "es": "La cocina a\u00FAn est\u00E1 caliente." },
    { "de": "Ich habe den Herd gestern ausgeschaltet.", "es": "Ayer apagu\u00E9 la cocina." },
    { "de": "Kochst du mit Gas oder auf dem Elektroherd?", "es": "\u00BFCocinas con gas o en la cocina el\u00E9ctrica?" }
  ],
  "Ellbogen": [
    { "de": "Mein Ellbogen tut weh.", "es": "Me duele el codo." },
    { "de": "Er hat sich den Ellbogen gesto\u00DFen.", "es": "\u00C9l se ha golpeado el codo." },
    { "de": "Kannst du deinen Ellbogen durchstrecken?", "es": "\u00BFPuedes estirar el codo?" }
  ],
  "die Kr\u00E4he": [
    { "de": "Die Kr\u00E4he ist schwarz.", "es": "El cuervo es negro." },
    { "de": "Eine Kr\u00E4he hat auf dem Dach gesessen.", "es": "Un cuervo se ha posado en el tejado." },
    { "de": "H\u00F6rst du die Kr\u00E4he kr\u00E4chzen?", "es": "\u00BFOyes graznar al cuervo?" }
  ],
  "der Kakao": [
    { "de": "Der Kakao ist zu hei\u00DF.", "es": "El cacao est\u00E1 demasiado caliente." },
    { "de": "Die Kinder haben Kakao mit Milch getrunken.", "es": "Los ni\u00F1os han bebido cacao con leche." },
    { "de": "Willst du einen Kakao zum Fr\u00FChst\u00FCck?", "es": "\u00BFQuieres un cacao para el desayuno?" }
  ],
  "Ente": [
    { "de": "Die Ente schwimmt auf dem Teich.", "es": "El pato nada en el estanque." },
    { "de": "Wir haben die Enten im Park gef\u00FCttert.", "es": "Hemos dado de comer a los patos en el parque." },
    { "de": "Siehst du die junge Ente dort?", "es": "\u00BFVes al pato joven all\u00ED?" }
  ],
  "Strauch": [
    { "de": "Der Strauch bl\u00FCht im Fr\u00FChling.", "es": "El arbusto florece en primavera." },
    { "de": "Der G\u00E4rtner hat den Strauch geschnitten.", "es": "El jardinero ha podado el arbusto." },
    { "de": "W\u00E4chst ein Strauch in deinem Garten?", "es": "\u00BFCrece un arbusto en tu jard\u00EDn?" }
  ],
  "der Garten": [
    { "de": "Der Garten ist gro\u00DF und ruhig.", "es": "El jard\u00EDn es grande y tranquilo." },
    { "de": "Oma hat im Garten Tomaten gepflanzt.", "es": "La abuela ha plantado tomates en el jard\u00EDn." },
    { "de": "Darf ich deinen Garten sehen?", "es": "\u00BFPuedo ver tu jard\u00EDn?" }
  ],
  "B\u00FCrste": [
    { "de": "Die B\u00FCrste ist f\u00FCr die Haare.", "es": "El cepillo es para el pelo." },
    { "de": "Er hat die B\u00FCrste in die Schublade gelegt.", "es": "\u00C9l ha guardado el cepillo en el caj\u00F3n." },
    { "de": "Kannst du mir deine B\u00FCrste leihen?", "es": "\u00BFPuedes prestarme tu cepillo?" }
  ],
  "zudecken": [
    { "de": "Du sollst die T\u00F6pfe zudecken.", "es": "Debes tapar las ollas." },
    { "de": "Sie hat das schlafende Kind zugedeckt.", "es": "Ella ha tapado al ni\u00F1o dormido." },
    { "de": "Deckst du die Reste zu?", "es": "\u00BFTapas las sobras?" }
  ],
  "vertragen": [
    { "de": "Ich vertrage keine Laktose.", "es": "No soporto la lactosa." },
    { "de": "Er hat die Hitze nicht gut vertragen.", "es": "\u00C9l no ha soportado bien el calor." },
    { "de": "Vertr\u00E4gst du scharfes Essen?", "es": "\u00BFSoportas la comida picante?" }
  ],
  "schneiden": [
    { "de": "Du musst die Zwiebeln fein schneiden.", "es": "Tienes que cortar las cebollas finas." },
    { "de": "Der Friseur hat mir die Haare geschnitten.", "es": "El peluquero me ha cortado el pelo." },
    { "de": "Schneidest du das Brot bitte?", "es": "\u00BFCortas el pan, por favor?" }
  ],
  "unehrlich": [
    { "de": "Deine Antwort war unehrlich.", "es": "Tu respuesta fue deshonesta." },
    { "de": "Er hat sich unehrlich verhalten.", "es": "\u00C9l se ha comportado de manera deshonesta." },
    { "de": "Warum bist du unehrlich?", "es": "\u00BFPor qu\u00E9 eres deshonesto?" }
  ],
  "Staubsauger": [
    { "de": "Der Staubsauger macht viel L\u00E4rm.", "es": "La aspiradora hace mucho ruido." },
    { "de": "Ich habe einen neuen Staubsauger gekauft.", "es": "He comprado una aspiradora nueva." },
    { "de": "Wo ist der Staubsauger?", "es": "\u00BFD\u00F3nde est\u00E1 la aspiradora?" }
  ],
  "der Wind": [
    { "de": "Der Wind ist heute sehr stark.", "es": "El viento est\u00E1 hoy muy fuerte." },
    { "de": "Der Wind hat alle Bl\u00E4tter vom Baum geweht.", "es": "El viento ha arrancado todas las hojas del \u00E1rbol." },
    { "de": "Sp\u00FCrst du den kalten Wind?", "es": "\u00BFNotas el viento fr\u00EDo?" }
  ],
  "sammeln": [
    { "de": "Ich will Briefmarken sammeln.", "es": "Quiero coleccionar sellos." },
    { "de": "Er hat Pilze im Wald gesammelt.", "es": "\u00C9l ha recogido setas en el bosque." },
    { "de": "Sammelst du auch M\u00FCnzen?", "es": "\u00BFTambi\u00E9n coleccionas monedas?" }
  ],
  "die Kette": [
    { "de": "Die Kette gl\u00E4nzt im Licht.", "es": "La cadena brilla a la luz." },
    { "de": "Sie hat eine goldene Kette um den Hals getragen.", "es": "Ella ha llevado una cadena de oro alrededor del cuello." },
    { "de": "Ist die Kette ein Geschenk?", "es": "\u00BFEs un regalo la cadena?" }
  ],
  "ausrutschen": [
    { "de": "Vorsicht, auf dem Eis kannst du leicht ausrutschen.", "es": "Cuidado, en el hielo te puedes resbalar f\u00E1cilmente." },
    { "de": "Der Junge ist auf der nassen Treppe ausgerutscht.", "es": "El chico se ha resbalado en la escalera mojada." },
    { "de": "Bist du schon einmal im Bad ausgerutscht?", "es": "\u00BFTe has resbalado alguna vez en el ba\u00F1o?" }
  ],
  "die Eule": [
    { "de": "Die Eule jagt in der Nacht.", "es": "El b\u00FAho caza por la noche." },
    { "de": "Wir haben eine Eule auf dem Baum geh\u00F6rt.", "es": "Hemos o\u00EDdo un b\u00FAho en el \u00E1rbol." },
    { "de": "Hast du schon eine echte Eule gesehen?", "es": "\u00BFHas visto ya un b\u00FAho de verdad?" }
  ],
  "Supermarkt": [
    { "de": "Der Supermarkt ist um die Ecke.", "es": "El supermercado est\u00E1 a la vuelta de la esquina." },
    { "de": "Ich habe Brot im Supermarkt geholt.", "es": "He cogido pan en el supermercado." },
    { "de": "Gehst du nach der Arbeit zum Supermarkt?", "es": "\u00BFVas al supermercado despu\u00E9s del trabajo?" }
  ]
};

// Unir con lo existente y guardar
const combined = { ...existing, ...block4 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 4 añadido. Total de palabras ahora:", Object.keys(combined).length);