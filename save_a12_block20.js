const fs = require("fs");

// Cargar archivo existente (bloques 1-19)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 20: palabras 951 a 1000
const block20 = {
  "die Schlange": [
    { "de": "Die Schlange ist harmlos.", "es": "La serpiente es inofensiva." },
    { "de": "Wir haben eine Schlange im Zoo gesehen.", "es": "Hemos visto una serpiente en el zoo." },
    { "de": "Hast du Angst vor einer Schlange?", "es": "\u00BFTienes miedo a una serpiente?" }
  ],
  "die Orange": [
    { "de": "Die Orange schmeckt s\u00FC\u00DF.", "es": "La naranja sabe dulce." },
    { "de": "Ich habe mir eine Orange gesch\u00E4lt.", "es": "Me he pelado una naranja." },
    { "de": "Magst du Orangen zum Fr\u00FChst\u00FCck?", "es": "\u00BFTe gustan las naranjas para el desayuno?" }
  ],
  "wegr\u00E4umen": [
    { "de": "Ich muss die B\u00FCcher wegr\u00E4umen.", "es": "Tengo que guardar los libros." },
    { "de": "Er hat das Spielzeug wegger\u00E4umt.", "es": "\u00C9l ha guardado el juguete." },
    { "de": "R\u00E4umst du die Teller weg?", "es": "\u00BFGuardas los platos?" }
  ],
  "betr\u00FCgen": [
    { "de": "Du darfst deine Freunde nicht betr\u00FCgen.", "es": "No debes enga\u00F1ar a tus amigos." },
    { "de": "Er hat mich um zehn Euro betr\u00FCgt.", "es": "\u00C9l me ha enga\u00F1ado con diez euros." },
    { "de": "Betr\u00FCgst du beim Spiel?", "es": "\u00BFEnga\u00F1as en el juego?" }
  ],
  "Zucker": [
    { "de": "Der Zucker ist im Schrank.", "es": "El az\u00FAcar est\u00E1 en el armario." },
    { "de": "Ich habe zwei L\u00F6ffel Zucker in den Tee getan.", "es": "He puesto dos cucharadas de az\u00FAcar en el t\u00E9." },
    { "de": "Nimmst du Zucker in den Kaffee?", "es": "\u00BFTomas az\u00FAcar en el caf\u00E9?" }
  ],
  "Salz": [
    { "de": "Das Salz ist auf dem Tisch.", "es": "La sal est\u00E1 en la mesa." },
    { "de": "Hast du das Essen schon gesalzen?", "es": "\u00BFYa has salado la comida?" },
    { "de": "Kannst du mir das Salz geben?", "es": "\u00BFPuedes pasarme la sal?" }
  ],
  "Ank\u00FCndigung": [
    { "de": "Die Ank\u00FCndigung war \u00FCberraschend.", "es": "El anuncio fue sorprendente." },
    { "de": "Der Chef hat eine wichtige Ank\u00FCndigung gemacht.", "es": "El jefe ha hecho un anuncio importante." },
    { "de": "Hast du die Ank\u00FCndigung geh\u00F6rt?", "es": "\u00BFHas o\u00EDdo el anuncio?" }
  ],
  "der Kaffee": [
    { "de": "Der Kaffee ist zu stark.", "es": "El caf\u00E9 est\u00E1 demasiado fuerte." },
    { "de": "Ich habe mir einen Kaffee gemacht.", "es": "Me he preparado un caf\u00E9." },
    { "de": "M\u00F6chtest du einen Kaffee?", "es": "\u00BFQuieres un caf\u00E9?" }
  ],
  "harken": [
    { "de": "Im Herbst muss man das Laub harken.", "es": "En oto\u00F1o hay que rastrillar la hojarasca." },
    { "de": "Papa hat den ganzen Vormittag geharkt.", "es": "Pap\u00E1 ha rastrillado toda la ma\u00F1ana." },
    { "de": "Harkst du die Bl\u00E4tter im Garten?", "es": "\u00BFRastrillas las hojas en el jard\u00EDn?" }
  ],
  "Waschmaschine": [
    { "de": "Die Waschmaschine ist defekt.", "es": "La lavadora est\u00E1 averiada." },
    { "de": "Ich habe die W\u00E4sche in die Waschmaschine gesteckt.", "es": "He metido la ropa en la lavadora." },
    { "de": "L\u00E4uft die Waschmaschine noch?", "es": "\u00BFEst\u00E1 funcionando todav\u00EDa la lavadora?" }
  ],
  "B\u00E4r": [
    { "de": "Der B\u00E4r schl\u00E4ft im Winter.", "es": "El oso duerme en invierno." },
    { "de": "Wir haben einen B\u00E4ren im Wald gesehen.", "es": "Hemos visto un oso en el bosque." },
    { "de": "Hast du Angst vor B\u00E4ren?", "es": "\u00BFTienes miedo a los osos?" }
  ],
  "verbos": [
    { "de": "\"verbos\" ist ein spanisches Wort.", "es": "\"verbos\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"verbos\" Verben.", "es": "En alem\u00E1n \"verbos\" significa verbos." },
    { "de": "Kennst du viele deutsche Verben?", "es": "\u00BFConoces muchos verbos alemanes?" }
  ],
  "Badehose": [
    { "de": "Meine Badehose ist zu eng.", "es": "Mi ba\u00F1ador est\u00E1 demasiado ajustado." },
    { "de": "Ich habe eine neue Badehose f\u00FCr den Urlaub gekauft.", "es": "He comprado un ba\u00F1ador nuevo para las vacaciones." },
    { "de": "Tr\u00E4gst du die Badehose am Strand?", "es": "\u00BFLlevas el ba\u00F1ador en la playa?" }
  ],
  "Garnele": [
    { "de": "Die Garnele ist rosa.", "es": "La gamba es rosa." },
    { "de": "Wir haben Garnelen gegrillt.", "es": "Hemos hecho gambas a la parrilla." },
    { "de": "Magst du Garnelen mit Knoblauch?", "es": "\u00BFTe gustan las gambas al ajillo?" }
  ],
  "der Papagei": [
    { "de": "Der Papagei kann sprechen.", "es": "El loro puede hablar." },
    { "de": "Oma hat einen bunten Papagei zu Hause.", "es": "La abuela tiene un loro de colores en casa." },
    { "de": "Hast du schon einen Papagei gef\u00FCttert?", "es": "\u00BFHas dado ya de comer a un loro?" }
  ],
  "das Messer": [
    { "de": "Das Messer ist scharf.", "es": "El cuchillo est\u00E1 afilado." },
    { "de": "Ich habe das Brot mit dem Messer geschnitten.", "es": "He cortado el pan con el cuchillo." },
    { "de": "Kannst du mir das Messer geben?", "es": "\u00BFPuedes darme el cuchillo?" }
  ],
  "Wiese": [
    { "de": "Die Wiese ist voller Blumen.", "es": "El prado est\u00E1 lleno de flores." },
    { "de": "Wir sind \u00FCber die Wiese gelaufen.", "es": "Hemos corrido por el prado." },
    { "de": "Picknickst du auf der Wiese?", "es": "\u00BFHaces p\u00EDcnic en el prado?" }
  ],
  "bekannt": [
    { "de": "Der Schauspieler ist sehr bekannt.", "es": "El actor es muy conocido." },
    { "de": "Ich habe ihn auf einer Party kennengelernt.", "es": "Lo he conocido en una fiesta." },
    { "de": "Ist dir diese Melodie bekannt?", "es": "\u00BFTe resulta conocida esta melod\u00EDa?" }
  ],
  "Topf": [
    { "de": "Der Topf ist aus Edelstahl.", "es": "La olla es de acero inoxidable." },
    { "de": "Oma hat die Suppe im Topf gekocht.", "es": "La abuela ha cocinado la sopa en la olla." },
    { "de": "Hast du einen gro\u00DFen Topf?", "es": "\u00BFTienes una olla grande?" }
  ],
  "Pfanne": [
    { "de": "Die Pfanne ist zu hei\u00DF.", "es": "La sart\u00E9n est\u00E1 demasiado caliente." },
    { "de": "Ich habe Eier in der Pfanne gebraten.", "es": "He frito huevos en la sart\u00E9n." },
    { "de": "Benutzt du eine beschichtete Pfanne?", "es": "\u00BFUsas una sart\u00E9n antiadherente?" }
  ],
  "achtzig": [
    { "de": "Achtzig ist eine hohe Zahl.", "es": "Ochenta es un n\u00FAmero alto." },
    { "de": "Meine Oma ist achtzig Jahre alt geworden.", "es": "Mi abuela ha cumplido ochenta a\u00F1os." },
    { "de": "Kostet das achtzig Euro?", "es": "\u00BFCuesta eso ochenta euros?" }
  ],
  "hungrig": [
    { "de": "Ich bin heute sehr hungrig.", "es": "Hoy tengo mucha hambre." },
    { "de": "Er hat hungrig auf das Essen gewartet.", "es": "\u00C9l ha esperado la comida con hambre." },
    { "de": "Bist du hungrig?", "es": "\u00BFTienes hambre?" }
  ],
  "der Ring": [
    { "de": "Der Ring gl\u00E4nzt im Licht.", "es": "El anillo brilla a la luz." },
    { "de": "Er hat mir einen Ring geschenkt.", "es": "\u00C9l me ha regalado un anillo." },
    { "de": "Tr\u00E4gst du deinen Ehering jeden Tag?", "es": "\u00BFLlevas tu alianza todos los d\u00EDas?" }
  ],
  "schlie\u00DFen": [
    { "de": "Kannst du das Fenster schlie\u00DFen?", "es": "\u00BFPuedes cerrar la ventana?" },
    { "de": "Ich habe die T\u00FCr abgeschlossen.", "es": "He cerrado la puerta con llave." },
    { "de": "Schlie\u00DFt der Laden um acht?", "es": "\u00BFCierra la tienda a las ocho?" }
  ],
  "anfangen": [
    { "de": "Wann soll ich mit der Arbeit anfangen?", "es": "\u00BFCu\u00E1ndo debo empezar con el trabajo?" },
    { "de": "Der Film hat gerade angefangen.", "es": "La pel\u00EDcula acaba de empezar." },
    { "de": "F\u00E4ngst du schon an?", "es": "\u00BFYa empiezas?" }
  ],
  "Freundin": [
    { "de": "Meine Freundin hei\u00DFt Julia.", "es": "Mi amiga se llama Julia." },
    { "de": "Ich habe eine neue Freundin kennengelernt.", "es": "He conocido a una amiga nueva." },
    { "de": "Kommt deine Freundin mit ins Kino?", "es": "\u00BFViene tu amiga al cine?" }
  ],
  "Stadt": [
    { "de": "Die Stadt ist sehr gro\u00DF.", "es": "La ciudad es muy grande." },
    { "de": "Wir sind durch die Stadt geschlendert.", "es": "Hemos paseado por la ciudad." },
    { "de": "Gef\u00E4llt dir diese Stadt?", "es": "\u00BFTe gusta esta ciudad?" }
  ],
  "TShirt": [
    { "de": "Das TShirt ist aus Baumwolle.", "es": "La camiseta es de algod\u00F3n." },
    { "de": "Ich habe ein wei\u00DFes TShirt angezogen.", "es": "Me he puesto una camiseta blanca." },
    { "de": "Tr\u00E4gst du das TShirt gern?", "es": "\u00BFTe gusta llevar esa camiseta?" }
  ],
  "Geld": [
    { "de": "Das Geld liegt auf dem Tisch.", "es": "El dinero est\u00E1 sobre la mesa." },
    { "de": "Ich habe gestern Geld abgehoben.", "es": "Ayer saqu\u00E9 dinero." },
    { "de": "Hast du genug Geld dabei?", "es": "\u00BFLlevas suficiente dinero?" }
  ],
  "Preis": [
    { "de": "Der Preis ist zu hoch.", "es": "El precio es demasiado alto." },
    { "de": "Wir haben den Preis auf dem Etikett gesehen.", "es": "Hemos visto el precio en la etiqueta." },
    { "de": "Kennst du den Preis von dem Buch?", "es": "\u00BFConoces el precio del libro?" }
  ],
  "Meer": [
    { "de": "Das Meer ist heute ruhig.", "es": "El mar est\u00E1 hoy tranquilo." },
    { "de": "Wir sind im Meer geschwommen.", "es": "Hemos nadado en el mar." },
    { "de": "F\u00E4hrst du gern ans Meer?", "es": "\u00BFTe gusta ir al mar?" }
  ],
  "Hand": [
    { "de": "Meine Hand ist kalt.", "es": "Mi mano est\u00E1 fr\u00EDa." },
    { "de": "Ich habe mir die Hand verbrannt.", "es": "Me he quemado la mano." },
    { "de": "Kannst du deine Hand heben?", "es": "\u00BFPuedes levantar la mano?" }
  ],
  "der Hase": [
    { "de": "Der Hase frisst gerne M\u00F6hren.", "es": "La liebre come zanahorias con gusto." },
    { "de": "Zu Ostern haben wir einen Hasen gebastelt.", "es": "En Pascua hemos hecho una liebre de manualidades." },
    { "de": "Hast du schon einen Hasen im Feld gesehen?", "es": "\u00BFHas visto ya una liebre en el campo?" }
  ],
  "die Pfanne": [
    { "de": "Die Pfanne ist aus Eisen.", "es": "La sart\u00E9n es de hierro." },
    { "de": "Ich habe die Pfanne gesp\u00FClt.", "es": "He lavado la sart\u00E9n." },
    { "de": "Hast du die Pfanne auf den Herd gestellt?", "es": "\u00BFHas puesto la sart\u00E9n en la cocina?" }
  ],
  "Bauernhof": [
    { "de": "Der Bauernhof liegt am Dorfrand.", "es": "La granja est\u00E1 a las afueras del pueblo." },
    { "de": "Wir haben einen Bauernhof besucht.", "es": "Hemos visitado una granja." },
    { "de": "W\u00FCrdest du auf einem Bauernhof leben?", "es": "\u00BFVivir\u00EDas en una granja?" }
  ],
  "die Zehn": [
    { "de": "Die Zehn ist eine runde Zahl.", "es": "El diez es un n\u00FAmero redondo." },
    { "de": "Ich habe eine Zehn in der Klassenarbeit geschrieben.", "es": "He sacado un diez en el examen de clase." },
    { "de": "Ist die Zehn deine Note?", "es": "\u00BFEs el diez tu nota?" }
  ],
  "trinken": [
    { "de": "Du musst genug Wasser trinken.", "es": "Tienes que beber suficiente agua." },
    { "de": "Er hat den ganzen Saft getrunken.", "es": "\u00C9l ha bebido todo el zumo." },
    { "de": "Trinkst du gern Tee?", "es": "\u00BFTe gusta beber t\u00E9?" }
  ],
  "das Jahrtausend": [
    { "de": "Das Jahrtausend ist eine lange Zeit.", "es": "El milenio es un tiempo largo." },
    { "de": "Wir leben im dritten Jahrtausend.", "es": "Vivimos en el tercer milenio." },
    { "de": "Wei\u00DFt du, wann das letzte Jahrtausend endete?", "es": "\u00BFSabes cu\u00E1ndo termin\u00F3 el \u00FAltimo milenio?" }
  ],
  "Leuchtturm": [
    { "de": "Der Leuchtturm steht an der K\u00FCste.", "es": "El faro est\u00E1 en la costa." },
    { "de": "Wir haben den Leuchtturm bei Sonnenuntergang fotografiert.", "es": "Hemos fotografiado el faro al atardecer." },
    { "de": "Kann man den Leuchtturm besichtigen?", "es": "\u00BFSe puede visitar el faro?" }
  ],
  "Nuss": [
    { "de": "Die Nuss hat eine harte Schale.", "es": "La nuez tiene una c\u00E1scara dura." },
    { "de": "Oma hat N\u00FCsse f\u00FCr den Kuchen gehackt.", "es": "La abuela ha picado nueces para la tarta." },
    { "de": "Knackst du die Nuss mit den Fingern?", "es": "\u00BFRompes la nuez con los dedos?" }
  ],
  "heben": [
    { "de": "Kannst du den schweren Koffer heben?", "es": "\u00BFPuedes levantar la maleta pesada?" },
    { "de": "Er hat die Kiste \u00FCber den Kopf gehoben.", "es": "\u00C9l ha levantado la caja por encima de la cabeza." },
    { "de": "Hebst du jeden Morgen Gewichte?", "es": "\u00BFLevantas pesas todas las ma\u00F1anas?" }
  ],
  "Lichtung": [
    { "de": "Die Lichtung ist voller Sonne.", "es": "El claro est\u00E1 lleno de sol." },
    { "de": "Wir haben ein Picknick auf der Lichtung gemacht.", "es": "Hemos hecho un p\u00EDcnic en el claro." },
    { "de": "F\u00FChrt der Weg zur Lichtung?", "es": "\u00BFConduce el camino al claro?" }
  ],
  "verlieben": [
    { "de": "Ich will mich dieses Jahr verlieben.", "es": "Quiero enamorarme este a\u00F1o." },
    { "de": "Er hat sich in sie verliebt.", "es": "\u00C9l se ha enamorado de ella." },
    { "de": "Verliebst du dich schnell?", "es": "\u00BFTe enamoras r\u00E1pido?" }
  ],
  "die Eisenbahn": [
    { "de": "Die Eisenbahn ist p\u00FCnktlich.", "es": "El ferrocarril es puntual." },
    { "de": "Wir sind mit der Eisenbahn nach Wien gefahren.", "es": "Hemos ido en ferrocarril a Viena." },
    { "de": "Nimmst du die Eisenbahn zur Arbeit?", "es": "\u00BFTomas el ferrocarril para ir al trabajo?" }
  ],
  "die Turnschuhe": [
    { "de": "Die Turnschuhe sind bequem.", "es": "Las zapatillas son c\u00F3modas." },
    { "de": "Ich habe die Turnschuhe im Schrank versteckt.", "es": "He escondido las zapatillas en el armario." },
    { "de": "Tr\u00E4gst du deine Turnschuhe zum Sport?", "es": "\u00BFLlevas tus zapatillas para el deporte?" }
  ],
  "H\u00F6hle": [
    { "de": "Die H\u00F6hle ist dunkel und feucht.", "es": "La cueva es oscura y h\u00FAmeda." },
    { "de": "Wir sind in eine tiefe H\u00F6hle hineingegangen.", "es": "Hemos entrado en una cueva profunda." },
    { "de": "Hast du Flederm\u00E4use in der H\u00F6hle gesehen?", "es": "\u00BFHas visto murci\u00E9lagos en la cueva?" }
  ],
  "Brombeere": [
    { "de": "Die Brombeere ist reif.", "es": "La mora est\u00E1 madura." },
    { "de": "Wir haben Brombeeren am Waldrand gepfl\u00FCckt.", "es": "Hemos recogido moras en el borde del bosque." },
    { "de": "Isst du Brombeeren mit Eis?", "es": "\u00BFComes moras con helado?" }
  ],
  "rau": [
    { "de": "Das Holz ist rau.", "es": "La madera es \u00E1spera." },
    { "de": "Die Oberfl\u00E4che hat sich rau angef\u00FChlt.", "es": "La superficie se ha sentido \u00E1spera." },
    { "de": "Ist der Stoff zu rau f\u00FCr die Haut?", "es": "\u00BFEs \u00E1spera la tela para la piel?" }
  ],
  "Onkel": [
    { "de": "Mein Onkel ist gestern angekommen.", "es": "Mi t\u00EDo lleg\u00F3 ayer." },
    { "de": "Der Onkel hat mir eine Geschichte erz\u00E4hlt.", "es": "El t\u00EDo me ha contado una historia." },
    { "de": "Wohnt dein Onkel in der N\u00E4he?", "es": "\u00BFVive tu t\u00EDo cerca?" }
  ],
  "sich rasieren": [
    { "de": "Ich muss mich vor der Arbeit rasieren.", "es": "Tengo que afeitarme antes del trabajo." },
    { "de": "Er hat sich heute Morgen nass rasiert.", "es": "\u00C9l se ha afeitado esta ma\u00F1ana con agua." },
    { "de": "Rasierst du dich jeden Tag?", "es": "\u00BFTe afeitas todos los d\u00EDas?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block20 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 20 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);