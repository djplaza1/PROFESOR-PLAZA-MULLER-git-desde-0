const fs = require("fs");

// Cargar archivo existente (bloques 1-18)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 19: palabras 901 a 950
const block19 = {
  "Eidechse": [
    { "de": "Die Eidechse sonnt sich auf dem Stein.", "es": "La lagartija se est\u00E1 tomando el sol sobre la piedra." },
    { "de": "Ich habe eine gr\u00FCne Eidechse im Garten entdeckt.", "es": "He descubierto una lagartija verde en el jard\u00EDn." },
    { "de": "Hast du schon eine Eidechse auf der Hand gehalten?", "es": "\u00BFHas tenido ya una lagartija en la mano?" }
  ],
  "Jacke": [
    { "de": "Die Jacke ist mir zu gro\u00DF.", "es": "La chaqueta me queda demasiado grande." },
    { "de": "Ich habe die Jacke im Schaufenster gesehen.", "es": "He visto la chaqueta en el escaparate." },
    { "de": "Ziehst du eine Jacke an? Es ist kalt.", "es": "\u00BFTe pones una chaqueta? Hace fr\u00EDo." }
  ],
  "streben": [
    { "de": "Wir streben nach einem besseren Leben.", "es": "Nos esforzamos por una vida mejor." },
    { "de": "Er hat immer nach Erfolg gestrebt.", "es": "\u00C9l siempre se ha esforzado por el \u00E9xito." },
    { "de": "Strebt ihr nach mehr Gerechtigkeit?", "es": "\u00BFOs esforz\u00E1is por m\u00E1s justicia?" }
  ],
  "Pizza": [
    { "de": "Die Pizza ist noch hei\u00DF.", "es": "La pizza est\u00E1 a\u00FAn caliente." },
    { "de": "Gestern haben wir Pizza mit Salami bestellt.", "es": "Ayer hemos pedido pizza con salami." },
    { "de": "Isst du deine Pizza gern mit extra K\u00E4se?", "es": "\u00BFTe gusta tu pizza con queso extra?" }
  ],
  "Betonung": [
    { "de": "Die Betonung liegt auf der ersten Silbe.", "es": "El \u00E9nfasis recae en la primera s\u00EDlaba." },
    { "de": "Der Lehrer hat die richtige Betonung erkl\u00E4rt.", "es": "El profesor ha explicado la acentuaci\u00F3n correcta." },
    { "de": "\u00C4nderst du die Betonung bei diesem Wort?", "es": "\u00BFCambias el \u00E9nfasis en esta palabra?" }
  ],
  "stimmen": [
    { "de": "Deine Antwort stimmt.", "es": "Tu respuesta es correcta." },
    { "de": "Das hat mit meiner Meinung \u00FCbereingestimmt.", "es": "Eso ha coincidido con mi opini\u00F3n." },
    { "de": "Stimmt es, dass du umziehst?", "es": "\u00BFEs cierto que te mudas?" }
  ],
  "K\u00FCbel": [
    { "de": "Der K\u00FCbel ist aus Plastik.", "es": "La cubeta es de pl\u00E1stico." },
    { "de": "Ich habe den K\u00FCbel mit Wasser gef\u00FCllt.", "es": "He llenado la cubeta con agua." },
    { "de": "Kannst du den K\u00FCbel in den Keller bringen?", "es": "\u00BFPuedes llevar la cubeta al s\u00F3tano?" }
  ],
  "aussteigen": [
    { "de": "Wir m\u00FCssen an der n\u00E4chsten Haltestelle aussteigen.", "es": "Tenemos que bajarnos en la pr\u00F3xima parada." },
    { "de": "Er ist aus dem Bus ausgestiegen.", "es": "\u00C9l se ha bajado del autob\u00FAs." },
    { "de": "Steigst du am Marktplatz aus?", "es": "\u00BFTe bajas en la plaza del mercado?" }
  ],
  "der Schal": [
    { "de": "Der Schal kratzt am Hals.", "es": "La bufanda pica en el cuello." },
    { "de": "Oma hat mir einen warmen Schal gestrickt.", "es": "La abuela me ha tejido una bufanda caliente." },
    { "de": "Tr\u00E4gst du den Schal auch drinnen?", "es": "\u00BFLlevas la bufanda tambi\u00E9n dentro de casa?" }
  ],
  "sich baden": [
    { "de": "Ich will mich nach der Arbeit baden.", "es": "Quiero ba\u00F1arme despu\u00E9s del trabajo." },
    { "de": "Die Kinder haben sich im See gebadet.", "es": "Los ni\u00F1os se han ba\u00F1ado en el lago." },
    { "de": "Badest du dich jeden Abend?", "es": "\u00BFTe ba\u00F1as cada noche?" }
  ],
  "Sonnencreme": [
    { "de": "Die Sonnencreme sch\u00FCtzt vor Hautkrebs.", "es": "La crema solar protege del c\u00E1ncer de piel." },
    { "de": "Ich habe Sonnencreme mit Lichtschutzfaktor 50 gekauft.", "es": "He comprado crema solar con factor 50." },
    { "de": "Cremst du dich vor dem Strandbesuch ein?", "es": "\u00BFTe pones crema antes de ir a la playa?" }
  ],
  "die Zahnb\u00FCrste": [
    { "de": "Die Zahnb\u00FCrste ist weich.", "es": "El cepillo de dientes es blando." },
    { "de": "Ich habe eine neue Zahnb\u00FCrste gekauft.", "es": "He comprado un cepillo de dientes nuevo." },
    { "de": "Wechselst du deine Zahnb\u00FCrste alle drei Monate?", "es": "\u00BFCambias tu cepillo de dientes cada tres meses?" }
  ],
  "Krankheitstag": [
    { "de": "Der Krankheitstag wird bezahlt.", "es": "El d\u00EDa de enfermedad se paga." },
    { "de": "Er hat einen Krankheitstag eingereicht.", "es": "\u00C9l ha presentado un d\u00EDa de enfermedad." },
    { "de": "Nimmst du einen Krankheitstag, wenn du dich schlecht f\u00FChlst?", "es": "\u00BFTomas un d\u00EDa de enfermedad cuando te sientes mal?" }
  ],
  "Sonderangebot": [
    { "de": "Das Sonderangebot gilt nur heute.", "es": "La oferta especial solo es v\u00E1lida hoy." },
    { "de": "Ich habe das Sonderangebot im Prospekt gefunden.", "es": "He encontrado la oferta especial en el folleto." },
    { "de": "Kaufst du gern Sonderangebote?", "es": "\u00BFTe gusta comprar ofertas especiales?" }
  ],
  "Flur": [
    { "de": "Der Flur ist lang und eng.", "es": "El pasillo es largo y estrecho." },
    { "de": "Ich habe die Schuhe im Flur abgestellt.", "es": "He dejado los zapatos en el pasillo." },
    { "de": "H\u00E4ngt der Spiegel im Flur?", "es": "\u00BFCuelga el espejo en el pasillo?" }
  ],
  "Ziege": [
    { "de": "Die Ziege meckert auf der Weide.", "es": "La cabra bala en el prado." },
    { "de": "Der Bauer hat die Ziege gef\u00FCttert.", "es": "El granjero ha dado de comer a la cabra." },
    { "de": "Hast du schon Ziegenk\u00E4se probiert?", "es": "\u00BFHas probado ya el queso de cabra?" }
  ],
  "abholen": [
    { "de": "Ich muss die Kinder von der Schule abholen.", "es": "Tengo que recoger a los ni\u00F1os de la escuela." },
    { "de": "Er hat das Paket bei der Post abgeholt.", "es": "\u00C9l ha recogido el paquete en correos." },
    { "de": "Holst du mich vom Bahnhof ab?", "es": "\u00BFMe recoges en la estaci\u00F3n?" }
  ],
  "Dr\u00FCse": [
    { "de": "Die Dr\u00FCse produziert Hormone.", "es": "La gl\u00E1ndula produce hormonas." },
    { "de": "Der Arzt hat meine Dr\u00FCsen untersucht.", "es": "El m\u00E9dico me ha examinado las gl\u00E1ndulas." },
    { "de": "Sind deine Dr\u00FCsen geschwollen?", "es": "\u00BFEst\u00E1n inflamadas tus gl\u00E1ndulas?" }
  ],
  "Tag": [
    { "de": "Der Tag war wundersch\u00F6n.", "es": "El d\u00EDa fue maravilloso." },
    { "de": "Ich habe den ganzen Tag im B\u00FCro verbracht.", "es": "He pasado todo el d\u00EDa en la oficina." },
    { "de": "Welcher Tag ist heute?", "es": "\u00BFQu\u00E9 d\u00EDa es hoy?" }
  ],
  "der Hirsch": [
    { "de": "Der Hirsch r\u00F6hrt in der Brunftzeit.", "es": "El ciervo berrea en la \u00E9poca de celo." },
    { "de": "Wir haben einen Hirsch mit gro\u00DFem Geweih gesehen.", "es": "Hemos visto un ciervo con una gran cornamenta." },
    { "de": "Lebt der Hirsch in diesem Wald?", "es": "\u00BFVive el ciervo en este bosque?" }
  ],
  "erziehen": [
    { "de": "Eltern m\u00FCssen ihre Kinder erziehen.", "es": "Los padres tienen que educar a sus hijos." },
    { "de": "Sie hat ihre Kinder streng erzogen.", "es": "Ella ha educado a sus hijos de manera estricta." },
    { "de": "Erziehst du deinen Hund selbst?", "es": "\u00BFEducas a tu perro t\u00FA mismo?" }
  ],
  "Garten": [
    { "de": "Der Garten ist unser kleines Paradies.", "es": "El jard\u00EDn es nuestro peque\u00F1o para\u00EDso." },
    { "de": "Wir haben gestern den Garten umgegraben.", "es": "Ayer hemos cavado el jard\u00EDn." },
    { "de": "Hast du einen Garten mit Gem\u00FCsebeet?", "es": "\u00BFTienes un jard\u00EDn con huerto?" }
  ],
  "der Fisch": [
    { "de": "Der Fisch ist heute besonders frisch.", "es": "El pescado est\u00E1 hoy especialmente fresco." },
    { "de": "Ich habe den Fisch auf dem Markt gekauft.", "es": "He comprado el pescado en el mercado." },
    { "de": "Bratest du den Fisch oder kochst du ihn?", "es": "\u00BFFr\u00EDes el pescado o lo cueces?" }
  ],
  "Hose": [
    { "de": "Die Hose sitzt perfekt.", "es": "El pantal\u00F3n queda perfecto." },
    { "de": "Er hat eine neue Hose f\u00FCr das Vorstellungsgespr\u00E4ch gekauft.", "es": "\u00C9l ha comprado un pantal\u00F3n nuevo para la entrevista." },
    { "de": "B\u00FCgelst du deine Hose selbst?", "es": "\u00BFPlanchas tu pantal\u00F3n t\u00FA mismo?" }
  ],
  "Schuh": [
    { "de": "Der Schuh dr\u00FCckt an der Ferse.", "es": "El zapato aprieta en el tal\u00F3n." },
    { "de": "Ich habe die Schuhe im Internet bestellt.", "es": "He pedido los zapatos por internet." },
    { "de": "Putzt du deine Schuhe jeden Sonntag?", "es": "\u00BFLimpias tus zapatos todos los domingos?" }
  ],
  "die Limonade": [
    { "de": "Die Limonade ist selbst gemacht.", "es": "La limonada es casera." },
    { "de": "An hei\u00DFen Tagen habe ich Limonade getrunken.", "es": "En los d\u00EDas calurosos he bebido limonada." },
    { "de": "Magst du Limonade mit Minze?", "es": "\u00BFTe gusta la limonada con menta?" }
  ],
  "hinsetzen": [
    { "de": "Du sollst das Baby vorsichtig hinsetzen.", "es": "Debes sentar al beb\u00E9 con cuidado." },
    { "de": "Ich habe mich auf die Bank hingesetzt.", "es": "Me he sentado en el banco." },
    { "de": "Setzt du dich gern ans Fenster?", "es": "\u00BFTe gusta sentarte junto a la ventana?" }
  ],
  "Theater": [
    { "de": "Das Theater ist heute ausverkauft.", "es": "El teatro est\u00E1 hoy agotado." },
    { "de": "Wir haben ein tolles St\u00FCck im Theater gesehen.", "es": "Hemos visto una obra estupenda en el teatro." },
    { "de": "Gehst du gern ins Theater?", "es": "\u00BFTe gusta ir al teatro?" }
  ],
  "Museum": [
    { "de": "Das Museum hat sonntags ge\u00F6ffnet.", "es": "El museo abre los domingos." },
    { "de": "Ich habe mir die neue Ausstellung im Museum angeschaut.", "es": "He visto la nueva exposici\u00F3n en el museo." },
    { "de": "Interessierst du dich f\u00FCcr moderne Kunst im Museum?", "es": "\u00BFTe interesa el arte moderno en el museo?" }
  ],
  "dunkel": [
    { "de": "Der Keller ist sehr dunkel.", "es": "El s\u00F3tano est\u00E1 muy oscuro." },
    { "de": "Im Winter wird es fr\u00FCh dunkel.", "es": "En invierno oscurece pronto." },
    { "de": "Hast du Angst im Dunkeln?", "es": "\u00BFTienes miedo en la oscuridad?" }
  ],
  "gegen": [
    { "de": "Ich bin gegen diese Entscheidung.", "es": "Estoy en contra de esta decisi\u00F3n." },
    { "de": "Er hat sich gegen die Wand gelehnt.", "es": "\u00C9l se ha apoyado contra la pared." },
    { "de": "Spielst du gegen uns?", "es": "\u00BFJuegas contra nosotros?" }
  ],
  "K\u00FCrbis": [
    { "de": "Der K\u00FCrbis wiegt f\u00FCnf Kilo.", "es": "La calabaza pesa cinco kilos." },
    { "de": "Zu Halloween haben wir einen K\u00FCrbis geschnitzt.", "es": "En Halloween hemos tallado una calabaza." },
    { "de": "Kochst du gern K\u00FCrbissuppe?", "es": "\u00BFTe gusta cocinar sopa de calabaza?" }
  ],
  "Treppe": [
    { "de": "Die Treppe knarrt beim Steigen.", "es": "La escalera cruje al subir." },
    { "de": "Oma ist die Treppe langsam hinaufgestiegen.", "es": "La abuela ha subido la escalera lentamente." },
    { "de": "Nimmst du die Treppe oder den Aufzug?", "es": "\u00BFTomas la escalera o el ascensor?" }
  ],
  "Kleid": [
    { "de": "Das Kleid ist wundersch\u00F6n.", "es": "El vestido es maravilloso." },
    { "de": "Sie hat ein langes Kleid zur Party getragen.", "es": "Ella ha llevado un vestido largo a la fiesta." },
    { "de": "Gef\u00E4llt dir mein Kleid?", "es": "\u00BFTe gusta mi vestido?" }
  ],
  "die Eins": [
    { "de": "Die Eins ist die beste Note.", "es": "El uno es la mejor nota." },
    { "de": "Ich habe eine Eins in Mathe geschrieben.", "es": "He sacado un uno en matem\u00E1ticas." },
    { "de": "Hast du schon eine Eins bekommen?", "es": "\u00BFHas obtenido ya un uno?" }
  ],
  "Haar": [
    { "de": "Ihr Haar ist lang und lockig.", "es": "Su pelo es largo y rizado." },
    { "de": "Ich habe mir die Haare schneiden lassen.", "es": "Me he cortado el pelo." },
    { "de": "F\u00E4rbst du dein Haar?", "es": "\u00BFTe ti\u00F1es el pelo?" }
  ],
  "der Elefant": [
    { "de": "Der Elefant hat einen langen R\u00FCssel.", "es": "El elefante tiene una trompa larga." },
    { "de": "Im Zoo haben wir einen Elefanten gef\u00FCttert.", "es": "En el zoo hemos dado de comer a un elefante." },
    { "de": "Kann ein Elefant wirklich so schwer tragen?", "es": "\u00BFPuede un elefante cargar realmente tanto peso?" }
  ],
  "vollenden": [
    { "de": "Wir m\u00FCssen das Projekt vollenden.", "es": "Tenemos que completar el proyecto." },
    { "de": "Der K\u00FCnstler hat sein Werk vollendet.", "es": "El artista ha completado su obra." },
    { "de": "Wann wirst du dein Studium vollenden?", "es": "\u00BFCu\u00E1ndo completar\u00E1s tu carrera?" }
  ],
  "der Nebel": [
    { "de": "Der Nebel ist heute sehr dicht.", "es": "La niebla est\u00E1 hoy muy densa." },
    { "de": "Im Herbst hat der Nebel die Sicht versperrt.", "es": "En oto\u00F1o la niebla ha bloqueado la visibilidad." },
    { "de": "F\u00E4hrst du vorsichtig bei Nebel?", "es": "\u00BFConduces con cuidado cuando hay niebla?" }
  ],
  "Sohle": [
    { "de": "Die Sohle ist abgelaufen.", "es": "La suela est\u00E1 gastada." },
    { "de": "Ich habe die Sohlen beim Schuster erneuern lassen.", "es": "He mandado renovar las suelas al zapatero." },
    { "de": "Hast du L\u00F6cher in den Sohlen?", "es": "\u00BFTienes agujeros en las suelas?" }
  ],
  "Termin": [
    { "de": "Mein Termin ist um halb drei.", "es": "Mi cita es a las dos y media." },
    { "de": "Ich habe den Termin beim Arzt verpasst.", "es": "He perdido la cita con el m\u00E9dico." },
    { "de": "Hast du morgen einen Termin?", "es": "\u00BFTienes cita ma\u00F1ana?" }
  ],
  "Besuch": [
    { "de": "Der Besuch war sehr angenehm.", "es": "La visita fue muy agradable." },
    { "de": "Wir haben gestern Besuch von Oma bekommen.", "es": "Ayer recibimos la visita de la abuela." },
    { "de": "Erwartest du Besuch?", "es": "\u00BFEsperas visita?" }
  ],
  "der Frosch": [
    { "de": "Der Frosch h\u00FCpft \u00FCber den Weg.", "es": "La rana salta por el camino." },
    { "de": "Im Teich haben wir viele Fr\u00F6sche geh\u00F6rt.", "es": "En el estanque hemos o\u00EDdo muchas ranas." },
    { "de": "Hast du schon einen Frosch gefangen?", "es": "\u00BFHas atrapado ya una rana?" }
  ],
  "der Bahnhof": [
    { "de": "Der Bahnhof wird gerade renoviert.", "es": "La estaci\u00F3n est\u00E1 siendo renovada." },
    { "de": "Ich habe dich am Bahnhof verpasst.", "es": "Te he perdido en la estaci\u00F3n." },
    { "de": "Kommst du mit dem Zug am Bahnhof an?", "es": "\u00BFLlegas en tren a la estaci\u00F3n?" }
  ],
  "Abteilungsleiter": [
    { "de": "Der Abteilungsleiter ist f\u00FCr das Team verantwortlich.", "es": "El jefe de departamento es responsable del equipo." },
    { "de": "Ich habe ein Gespr\u00E4ch mit dem Abteilungsleiter gef\u00FChrt.", "es": "He tenido una conversaci\u00F3n con el jefe de departamento." },
    { "de": "Hast du den Abteilungsleiter schon kennengelernt?", "es": "\u00BFYa has conocido al jefe de departamento?" }
  ],
  "verwirren": [
    { "de": "Die vielen Schilder verwirren mich.", "es": "Las muchas se\u00F1ales me confunden." },
    { "de": "Die pl\u00F6tzliche Frage hat ihn verwirrt.", "es": "La pregunta repentina lo ha confundido." },
    { "de": "Verwirrt dich die Aufgabe?", "es": "\u00BFTe confunde la tarea?" }
  ],
  "die M\u00FCtze": [
    { "de": "Die M\u00FCtze sitzt schief.", "es": "El gorro est\u00E1 torcido." },
    { "de": "Ich habe eine warme M\u00FCtze f\u00FCr den Winter gestrickt.", "es": "He tejido un gorro caliente para el invierno." },
    { "de": "Setzt du deine M\u00FCtze bei K\u00E4lte auf?", "es": "\u00BFTe pones el gorro cuando hace fr\u00EDo?" }
  ],
  "die Drei": [
    { "de": "Die Drei ist eine Primzahl.", "es": "El tres es un n\u00FAmero primo." },
    { "de": "Ich habe eine Drei in der Klassenarbeit geschrieben.", "es": "He sacado un tres en el examen de clase." },
    { "de": "Ist die Drei deine Gl\u00FCckszahl?", "es": "\u00BFEs el tres tu n\u00FAmero de la suerte?" }
  ],
  "leer": [
    { "de": "Die Flasche ist leer.", "es": "La botella est\u00E1 vac\u00EDa." },
    { "de": "Der Parkplatz war heute Morgen leer.", "es": "El aparcamiento estaba vac\u00EDo esta ma\u00F1ana." },
    { "de": "Ist dein Glas schon leer?", "es": "\u00BFEst\u00E1 ya vac\u00EDo tu vaso?" }
  ],
  "voll": [
    { "de": "Der Bus ist heute sehr voll.", "es": "El autob\u00FAs est\u00E1 hoy muy lleno." },
    { "de": "Ich habe den Tank voll gemacht.", "es": "He llenado el dep\u00F3sito." },
    { "de": "Ist die Waschmaschine schon voll?", "es": "\u00BFEst\u00E1 ya llena la lavadora?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block19 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 19 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);