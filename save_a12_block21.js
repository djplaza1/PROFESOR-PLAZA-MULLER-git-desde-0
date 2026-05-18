const fs = require("fs");

// Cargar archivo existente (bloques 1-20)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 21: palabras 1001 a 1050
const block21 = {
  "bearbeiten": [
    { "de": "Ich muss das Dokument bearbeiten.", "es": "Tengo que editar el documento." },
    { "de": "Er hat die Fotos am Computer bearbeitet.", "es": "\u00C9l ha editado las fotos en el ordenador." },
    { "de": "Bearbeitest du den Text heute noch?", "es": "\u00BFEditas el texto hoy todav\u00EDa?" }
  ],
  "Disco": [
    { "de": "Die Disco ist sehr laut.", "es": "La discoteca es muy ruidosa." },
    { "de": "Wir haben in der Disco bis morgens getanzt.", "es": "Hemos bailado en la discoteca hasta la ma\u00F1ana." },
    { "de": "Gehst du gern in die Disco?", "es": "\u00BFTe gusta ir a la discoteca?" }
  ],
  "die Birne": [
    { "de": "Die Birne ist saftig.", "es": "La pera es jugosa." },
    { "de": "Ich habe eine Birne vom Baum gepfl\u00FCckt.", "es": "He cogido una pera del \u00E1rbol." },
    { "de": "Magst du Birnen im Kuchen?", "es": "\u00BFTe gustan las peras en la tarta?" }
  ],
  "Schleife": [
    { "de": "Die Schleife ist rosa.", "es": "El lazo es rosa." },
    { "de": "Sie hat eine Schleife ins Haar gebunden.", "es": "Ella se ha atado un lazo en el pelo." },
    { "de": "Kannst du eine Schleife binden?", "es": "\u00BFPuedes hacer un lazo?" }
  ],
  "das Theater": [
    { "de": "Das Theater ist wundersch\u00F6n.", "es": "El teatro es maravilloso." },
    { "de": "Wir haben ein St\u00FCck im Theater gesehen.", "es": "Hemos visto una obra en el teatro." },
    { "de": "Gehst du oft ins Theater?", "es": "\u00BFVas a menudo al teatro?" }
  ],
  "der Mantel": [
    { "de": "Der Mantel ist zu warm.", "es": "El abrigo es demasiado caliente." },
    { "de": "Ich habe den Mantel im Bus vergessen.", "es": "He olvidado el abrigo en el autob\u00FAs." },
    { "de": "Tr\u00E4gst du den Mantel im Winter?", "es": "\u00BFLlevas el abrigo en invierno?" }
  ],
  "Nagel": [
    { "de": "Der Nagel ist krumm.", "es": "El clavo est\u00E1 torcido." },
    { "de": "Er hat den Nagel in die Wand geschlagen.", "es": "\u00C9l ha clavado el clavo en la pared." },
    { "de": "Hast du einen Hammer f\u00FCr den Nagel?", "es": "\u00BFTienes un martillo para el clavo?" }
  ],
  "parken": [
    { "de": "Du darfst hier nicht parken.", "es": "No debes aparcar aqu\u00ED." },
    { "de": "Ich habe das Auto vor dem Haus geparkt.", "es": "He aparcado el coche delante de la casa." },
    { "de": "Parkst du immer in der Garage?", "es": "\u00BFAparcas siempre en el garaje?" }
  ],
  "die Acht": [
    { "de": "Die Acht ist meine Gl\u00FCckszahl.", "es": "El ocho es mi n\u00FAmero de la suerte." },
    { "de": "Ich habe die Acht im Lotto gezogen.", "es": "He sacado el ocho en la loter\u00EDa." },
    { "de": "Magst du die Acht?", "es": "\u00BFTe gusta el ocho?" }
  ],
  "Mai": [
    { "de": "Der Mai ist wundersch\u00F6n.", "es": "Mayo es maravilloso." },
    { "de": "Im Mai haben wir einen Ausflug gemacht.", "es": "En mayo hemos hecho una excursi\u00F3n." },
    { "de": "Feierst du im Mai Geburtstag?", "es": "\u00BFCelebras tu cumplea\u00F1os en mayo?" }
  ],
  "K\u00FCste": [
    { "de": "Die K\u00FCste ist felsig.", "es": "La costa es rocosa." },
    { "de": "Wir sind an der K\u00FCste entlang gewandert.", "es": "Hemos paseado a lo largo de la costa." },
    { "de": "F\u00E4hrst du im Sommer an die K\u00FCste?", "es": "\u00BFVas a la costa en verano?" }
  ],
  "die Taube": [
    { "de": "Die Taube gurrt auf dem Dach.", "es": "La paloma arrulla en el tejado." },
    { "de": "Eine Taube hat auf meinem Balkon genistet.", "es": "Una paloma ha anidado en mi balc\u00F3n." },
    { "de": "F\u00FCtterst du die Tauben im Park?", "es": "\u00BFDas de comer a las palomas en el parque?" }
  ],
  "Fund": [
    { "de": "Der Fund war wertvoll.", "es": "El hallazgo era valioso." },
    { "de": "Ich habe den Fund im Fundb\u00FCro abgegeben.", "es": "He entregado el hallazgo en la oficina de objetos perdidos." },
    { "de": "Hast du deinen Fund schon gemeldet?", "es": "\u00BFHas comunicado ya tu hallazgo?" }
  ],
  "Regen": [
    { "de": "Der Regen ist willkommen.", "es": "La lluvia es bienvenida." },
    { "de": "Es hat gestern den ganzen Tag geregnet.", "es": "Ayer ha llovido todo el d\u00EDa." },
    { "de": "Magst du Spazierg\u00E4nge im Regen?", "es": "\u00BFTe gusta pasear bajo la lluvia?" }
  ],
  "die Hose": [
    { "de": "Die Hose passt perfekt.", "es": "El pantal\u00F3n queda perfecto." },
    { "de": "Ich habe die Hose im Angebot gekauft.", "es": "He comprado el pantal\u00F3n en oferta." },
    { "de": "Gef\u00E4llt dir meine neue Hose?", "es": "\u00BFTe gusta mi pantal\u00F3n nuevo?" }
  ],
  "Waschbecken": [
    { "de": "Das Waschbecken ist verstopft.", "es": "El lavabo est\u00E1 atascado." },
    { "de": "Ich habe das Waschbecken mit einem Lappen geputzt.", "es": "He limpiado el lavabo con un pa\u00F1o." },
    { "de": "Kannst du das Waschbecken reparieren?", "es": "\u00BFPuedes reparar el lavabo?" }
  ],
  "pfeffern": [
    { "de": "Du musst die Suppe noch pfeffern.", "es": "Todav\u00EDa tienes que echar pimienta a la sopa." },
    { "de": "Er hat das Steak kr\u00E4ftig gepfeffert.", "es": "\u00C9l ha pimentado el filete abundantemente." },
    { "de": "Pfefferst du dein Essen gern?", "es": "\u00BFTe gusta echar pimienta a la comida?" }
  ],
  "bereiten": [
    { "de": "Ich muss das Abendessen bereiten.", "es": "Tengo que preparar la cena." },
    { "de": "Sie hat alles f\u00FCr die Party bereitet.", "es": "Ella ha preparado todo para la fiesta." },
    { "de": "Bereitest du den Tisch vor?", "es": "\u00BFPreparas la mesa?" }
  ],
  "missen": [
    { "de": "Ich will diesen Zug nicht missen.", "es": "No quiero perder este tren." },
    { "de": "Er hat seine Heimat nie gemisst.", "es": "\u00C9l nunca ha extra\u00F1ado su tierra natal." },
    { "de": "Misst du deine alten Freunde?", "es": "\u00BFExtra\u00F1as a tus viejos amigos?" }
  ],
  "Dach": [
    { "de": "Das Dach ist undicht.", "es": "El tejado tiene goteras." },
    { "de": "Der Sturm hat das Dach besch\u00E4digt.", "es": "La tormenta ha da\u00F1ado el tejado." },
    { "de": "Kannst du das Dach reparieren?", "es": "\u00BFPuedes reparar el tejado?" }
  ],
  "Akkusativ": [
    { "de": "Der Akkusativ ist der vierte Fall.", "es": "El acusativo es el cuarto caso." },
    { "de": "Im Unterricht haben wir den Akkusativ ge\u00FCbt.", "es": "En clase hemos practicado el acusativo." },
    { "de": "Kennst du den Akkusativ?", "es": "\u00BFConoces el acusativo?" }
  ],
  "Fieberthermometer": [
    { "de": "Das Fieberthermometer ist kaputt.", "es": "El term\u00F3metro est\u00E1 roto." },
    { "de": "Die Mutter hat das Fieberthermometer benutzt.", "es": "La madre ha usado el term\u00F3metro." },
    { "de": "Hast du ein Fieberthermometer zu Hause?", "es": "\u00BFTienes un term\u00F3metro en casa?" }
  ],
  "Wiederholung": [
    { "de": "Die Wiederholung ist wichtig zum Lernen.", "es": "La repetici\u00F3n es importante para aprender." },
    { "de": "Ich habe eine Wiederholung der Pr\u00FCfung gemacht.", "es": "He hecho un repaso del examen." },
    { "de": "Machst du eine Wiederholung vor der Klassenarbeit?", "es": "\u00BFHaces un repaso antes del examen de clase?" }
  ],
  "studieren": [
    { "de": "Mein Bruder will Medizin studieren.", "es": "Mi hermano quiere estudiar medicina." },
    { "de": "Sie hat in M\u00FCnchen studiert.", "es": "Ella ha estudiado en M\u00FAnich." },
    { "de": "Studierst du gern?", "es": "\u00BFTe gusta estudiar?" }
  ],
  "el hombre": [
    { "de": "\"el hombre\" ist ein spanisches Wort.", "es": "\"el hombre\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"el hombre\" der Mann.", "es": "En alem\u00E1n \"el hombre\" significa el hombre." },
    { "de": "Hast du das Wort \"Mann\" gelernt?", "es": "\u00BFHas aprendido la palabra \"Mann\"?" }
  ],
  "gemein": [
    { "de": "Dein Kommentar war gemein.", "es": "Tu comentario fue mezquino." },
    { "de": "Er hat sich gemein verhalten.", "es": "\u00C9l se ha comportado de manera mezquina." },
    { "de": "Warum bist du so gemein?", "es": "\u00BFPor qu\u00E9 eres tan mezquino?" }
  ],
  "offen": [
    { "de": "Die T\u00FCr steht offen.", "es": "La puerta est\u00E1 abierta." },
    { "de": "Ich habe das Fenster offen gelassen.", "es": "He dejado la ventana abierta." },
    { "de": "Bleibt der Laden am Sonntag offen?", "es": "\u00BFPermanece abierta la tienda el domingo?" }
  ],
  "der Kamm": [
    { "de": "Der Kamm liegt im Badezimmer.", "es": "El peine est\u00E1 en el ba\u00F1o." },
    { "de": "Ich habe mir die Haare mit dem Kamm gek\u00E4mmt.", "es": "Me he peinado el pelo con el peine." },
    { "de": "Kannst du mir deinen Kamm leihen?", "es": "\u00BFPuedes prestarme tu peine?" }
  ],
  "Sonnenbrille": [
    { "de": "Meine Sonnenbrille ist polarisiert.", "es": "Mis gafas de sol son polarizadas." },
    { "de": "Ich habe die Sonnenbrille im Auto vergessen.", "es": "He olvidado las gafas de sol en el coche." },
    { "de": "Tr\u00E4gst du deine Sonnenbrille jeden Tag?", "es": "\u00BFLlevas tus gafas de sol todos los d\u00EDas?" }
  ],
  "Wohnort": [
    { "de": "Mein Wohnort ist eine Kleinstadt.", "es": "Mi lugar de residencia es una ciudad peque\u00F1a." },
    { "de": "Er hat seinen Wohnort gewechselt.", "es": "\u00C9l ha cambiado su lugar de residencia." },
    { "de": "Wo ist dein Wohnort?", "es": "\u00BFCu\u00E1l es tu lugar de residencia?" }
  ],
  "Versand": [
    { "de": "Der Versand ist kostenlos.", "es": "El env\u00EDo es gratuito." },
    { "de": "Ich habe den Versand per E-Mail best\u00E4tigt.", "es": "He confirmado el env\u00EDo por correo electr\u00F3nico." },
    { "de": "Dauert der Versand lange?", "es": "\u00BFTarda mucho el env\u00EDo?" }
  ],
  "schwimmen": [
    { "de": "Die Enten schwimmen auf dem Teich.", "es": "Los patos nadan en el estanque." },
    { "de": "Wir sind gestern im See geschwommen.", "es": "Ayer hemos nadado en el lago." },
    { "de": "Schwimmst du gern im Meer?", "es": "\u00BFTe gusta nadar en el mar?" }
  ],
  "spazieren": [
    { "de": "Wir wollen im Park spazieren.", "es": "Queremos pasear por el parque." },
    { "de": "Oma ist am Nachmittag spazieren gegangen.", "es": "La abuela ha ido a pasear por la tarde." },
    { "de": "Spazierst du gern am Fluss?", "es": "\u00BFTe gusta pasear junto al r\u00EDo?" }
  ],
  "Mantel": [
    { "de": "Der Mantel ist blau.", "es": "El abrigo es azul." },
    { "de": "Sie hat den Mantel an die Garderobe geh\u00E4ngt.", "es": "Ella ha colgado el abrigo en el perchero." },
    { "de": "Brauchst du einen Mantel im Fr\u00FChling?", "es": "\u00BFNecesitas un abrigo en primavera?" }
  ],
  "Benachrichtigung": [
    { "de": "Die Benachrichtigung kam per Post.", "es": "La notificaci\u00F3n lleg\u00F3 por correo." },
    { "de": "Ich habe eine Benachrichtigung \u00FCber das Paket erhalten.", "es": "He recibido una notificaci\u00F3n sobre el paquete." },
    { "de": "Hast du die Benachrichtigung gelesen?", "es": "\u00BFHas le\u00EDdo la notificaci\u00F3n?" }
  ],
  "dreizehn": [
    { "de": "Dreizehn ist eine Ungl\u00FCckszahl.", "es": "Trece es un n\u00FAmero de mala suerte." },
    { "de": "Ich habe dreizehn Euro in der Tasche.", "es": "Tengo trece euros en el bolsillo." },
    { "de": "Bist du dreizehn Jahre alt?", "es": "\u00BFTienes trece a\u00F1os?" }
  ],
  "Rippe": [
    { "de": "Meine Rippe tut weh.", "es": "Mi costilla me duele." },
    { "de": "Ich habe mir eine Rippe gebrochen.", "es": "Me he roto una costilla." },
    { "de": "Hast du Schmerzen an der Rippe?", "es": "\u00BFTienes dolor en la costilla?" }
  ],
  "helfen": [
    { "de": "Kannst du mir bitte helfen?", "es": "\u00BFPuedes ayudarme, por favor?" },
    { "de": "Er hat mir beim Umzug geholfen.", "es": "\u00C9l me ha ayudado con la mudanza." },
    { "de": "Hilfst du deiner Oma im Garten?", "es": "\u00BFAyudas a tu abuela en el jard\u00EDn?" }
  ],
  "gr\u00FC\u00DFen": [
    { "de": "Ich muss noch Oma gr\u00FC\u00DFen.", "es": "Todav\u00EDa tengo que saludar a la abuela." },
    { "de": "Er hat mich freundlich gegr\u00FC\u00DFt.", "es": "\u00C9l me ha saludado amablemente." },
    { "de": "Gr\u00FC\u00DFt du deine Nachbarn?", "es": "\u00BFSaludas a tus vecinos?" }
  ],
  "Krug": [
    { "de": "Der Krug ist aus Ton.", "es": "La jarra es de barro." },
    { "de": "Oma hat Wasser in den Krug gegossen.", "es": "La abuela ha echado agua en la jarra." },
    { "de": "Kannst du den Krug auf den Tisch stellen?", "es": "\u00BFPuedes poner la jarra en la mesa?" }
  ],
  "springen": [
    { "de": "Die Katze kann sehr hoch springen.", "es": "El gato puede saltar muy alto." },
    { "de": "Das Kind ist ins Wasser gesprungen.", "es": "El ni\u00F1o ha saltado al agua." },
    { "de": "Springst du gern Seil?", "es": "\u00BFTe gusta saltar a la comba?" }
  ],
  "Schildkr\u00F6te": [
    { "de": "Die Schildkr\u00F6te ist sehr langsam.", "es": "La tortuga es muy lenta." },
    { "de": "Wir haben eine Schildkr\u00F6te im Garten gefunden.", "es": "Hemos encontrado una tortuga en el jard\u00EDn." },
    { "de": "Hast du schon eine Schildkr\u00F6te gestreichelt?", "es": "\u00BFHas acariciado ya una tortuga?" }
  ],
  "der Schnee": [
    { "de": "Der Schnee ist tief.", "es": "La nieve es profunda." },
    { "de": "Es hat gestern stark geschneit.", "es": "Ayer ha nevado mucho." },
    { "de": "F\u00E4hrst du im Winter gern in den Schnee?", "es": "\u00BFTe gusta ir a la nieve en invierno?" }
  ],
  "wegbringen": [
    { "de": "Du musst den M\u00FCll wegbringen.", "es": "Tienes que llevarte la basura." },
    { "de": "Ich habe die alten Kleider weggebracht.", "es": "Me he llevado la ropa vieja." },
    { "de": "Bringst du die Flaschen weg?", "es": "\u00BFTe llevas las botellas?" }
  ],
  "weise": [
    { "de": "Meine Oma ist sehr weise.", "es": "Mi abuela es muy sabia." },
    { "de": "Er hat einen weisen Rat gegeben.", "es": "\u00C9l ha dado un consejo sabio." },
    { "de": "Bist du ein weiser Mensch?", "es": "\u00BFEres una persona sabia?" }
  ],
  "heilen": [
    { "de": "Die Medizin soll die Krankheit heilen.", "es": "La medicina debe curar la enfermedad." },
    { "de": "Der Arzt hat die Wunde geheilt.", "es": "El m\u00E9dico ha curado la herida." },
    { "de": "Heilt die Zeit alle Wunden?", "es": "\u00BFEl tiempo cura todas las heridas?" }
  ],
  "Radio": [
    { "de": "Das Radio ist zu laut.", "es": "La radio est\u00E1 demasiado alta." },
    { "de": "Ich habe das Radio im Auto eingeschaltet.", "es": "He encendido la radio en el coche." },
    { "de": "H\u00F6rst du gern Radio?", "es": "\u00BFTe gusta escuchar la radio?" }
  ],
  "laufen": [
    { "de": "Ich will einen Marathon laufen.", "es": "Quiero correr un marat\u00F3n." },
    { "de": "Er ist gestern f\u00FCnf Kilometer gelaufen.", "es": "\u00C9l ha corrido ayer cinco kil\u00F3metros." },
    { "de": "L\u00E4ufst du jeden Morgen?", "es": "\u00BFCorres todas las ma\u00F1anas?" }
  ],
  "Darm": [
    { "de": "Der Darm ist ein langes Organ.", "es": "El intestino es un \u00F3rgano largo." },
    { "de": "Der Arzt hat den Darm untersucht.", "es": "El m\u00E9dico ha examinado el intestino." },
    { "de": "Hast du Probleme mit dem Darm?", "es": "\u00BFTienes problemas con el intestino?" }
  ],
  "der Eistee": [
    { "de": "Der Eistee ist erfrischend.", "es": "El t\u00E9 helado es refrescante." },
    { "de": "Ich habe mir einen Eistee bestellt.", "es": "Me he pedido un t\u00E9 helado." },
    { "de": "Trinkst du gern Eistee mit Zitrone?", "es": "\u00BFTe gusta el t\u00E9 helado con lim\u00F3n?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block21 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 21 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);