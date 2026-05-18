const fs = require("fs");

// Cargar el archivo existente (bloque 1)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 2: palabras 51 a 100
const block2 = {
  "staubsaugen": [
    { "de": "Ich muss noch das Wohnzimmer staubsaugen.", "es": "Todav\u00EDa tengo que aspirar el sal\u00F3n." },
    { "de": "Er hat das ganze Haus gestaubsaugt.", "es": "\u00C9l ha aspirado toda la casa." },
    { "de": "Kannst du bitte staubsaugen?", "es": "\u00BFPuedes aspirar, por favor?" }
  ],
  "Arbeitslosengeld": [
    { "de": "Das Arbeitslosengeld ist nicht hoch.", "es": "La prestaci\u00F3n por desempleo no es alta." },
    { "de": "Er hat Arbeitslosengeld beantragt.", "es": "\u00C9l ha solicitado la prestaci\u00F3n por desempleo." },
    { "de": "Bekommst du Arbeitslosengeld?", "es": "\u00BFRecibes la prestaci\u00F3n por desempleo?" }
  ],
  "das Bier": [
    { "de": "Das Bier ist sch\u00F6n kalt.", "es": "La cerveza est\u00E1 bien fr\u00EDa." },
    { "de": "Wir haben gestern Bier getrunken.", "es": "Ayer hemos bebido cerveza." },
    { "de": "M\u00F6chtest du ein Bier?", "es": "\u00BFQuieres una cerveza?" }
  ],
  "F\u00F6hn": [
    { "de": "Der F\u00F6hn ist zu hei\u00DF.", "es": "El secador est\u00E1 demasiado caliente." },
    { "de": "Sie hat ihre Haare mit dem F\u00F6hn getrocknet.", "es": "Ella se ha secado el pelo con el secador." },
    { "de": "Kann ich deinen F\u00F6hn benutzen?", "es": "\u00BFPuedo usar tu secador?" }
  ],
  "Gast": [
    { "de": "Der Gast ist sehr h\u00F6flich.", "es": "El invitado es muy educado." },
    { "de": "Wir haben einen Gast zum Abendessen eingeladen.", "es": "Hemos invitado a un invitado a cenar." },
    { "de": "Kommt der Gast um sieben?", "es": "\u00BFViene el invitado a las siete?" }
  ],
  "Einladung": [
    { "de": "Die Einladung ist sch\u00F6n gestaltet.", "es": "La invitaci\u00F3n est\u00E1 bien dise\u00F1ada." },
    { "de": "Ich habe eine Einladung zur Hochzeit bekommen.", "es": "He recibido una invitaci\u00F3n para la boda." },
    { "de": "Hast du die Einladung geschickt?", "es": "\u00BFHas enviado la invitaci\u00F3n?" }
  ],
  "Treppenhaus": [
    { "de": "Das Treppenhaus ist sauber.", "es": "La escalera est\u00E1 limpia." },
    { "de": "Der Nachbar hat das Treppenhaus geputzt.", "es": "El vecino ha limpiado la escalera." },
    { "de": "Darf man im Treppenhaus spielen?", "es": "\u00BFSe puede jugar en la escalera?" }
  ],
  "Wange": [
    { "de": "Die Wange ist rot.", "es": "La mejilla est\u00E1 roja." },
    { "de": "Sie hat ihm einen Kuss auf die Wange gegeben.", "es": "Ella le ha dado un beso en la mejilla." },
    { "de": "Tut deine Wange weh?", "es": "\u00BFTe duele la mejilla?" }
  ],
  "abtrocknen": [
    { "de": "Ich muss das Geschirr abtrocknen.", "es": "Tengo que secar la vajilla." },
    { "de": "Er hat die Gl\u00E4ser abgetrocknet.", "es": "\u00C9l ha secado los vasos." },
    { "de": "Kannst du bitte abtrocknen?", "es": "\u00BFPuedes secar, por favor?" }
  ],
  "Zimt": [
    { "de": "Der Zimt riecht wunderbar.", "es": "La canela huele maravillosamente." },
    { "de": "Ich habe Zimt auf den Kuchen gestreut.", "es": "He espolvoreado canela sobre la tarta." },
    { "de": "Magst du Zimt im Kaffee?", "es": "\u00BFTe gusta la canela en el caf\u00E9?" }
  ],
  "das Jahr": [
    { "de": "Das Jahr vergeht schnell.", "es": "El a\u00F1o pasa r\u00E1pido." },
    { "de": "Wir haben ein tolles Jahr erlebt.", "es": "Hemos vivido un a\u00F1o estupendo." },
    { "de": "Welches Jahr haben wir jetzt?", "es": "\u00BFEn qu\u00E9 a\u00F1o estamos ahora?" }
  ],
  "Puder": [
    { "de": "Der Puder ist zu dunkel.", "es": "Los polvos son demasiado oscuros." },
    { "de": "Sie hat Puder auf ihr Gesicht aufgetragen.", "es": "Ella se ha aplicado polvos en la cara." },
    { "de": "Benutzt du Puder?", "es": "\u00BFUsas polvos?" }
  ],
  "Praktikant": [
    { "de": "Der Praktikant ist sehr flei\u00DFig.", "es": "El becario es muy trabajador." },
    { "de": "Die Firma hat einen neuen Praktikanten eingestellt.", "es": "La empresa ha contratado a un nuevo becario." },
    { "de": "Arbeitet der Praktikant bei euch?", "es": "\u00BFTrabaja el becario con vosotros?" }
  ],
  "Geruch": [
    { "de": "Der Geruch ist stark.", "es": "El olor es fuerte." },
    { "de": "Ich habe den Geruch von Kaffee wahrgenommen.", "es": "He percibido el olor del caf\u00E9." },
    { "de": "Magst du den Geruch von Zwiebeln?", "es": "\u00BFTe gusta el olor de la cebolla?" }
  ],
  "der Muffin": [
    { "de": "Der Muffin ist noch warm.", "es": "La magdalena est\u00E1 a\u00FAn caliente." },
    { "de": "Sie hat Muffins f\u00FCr das Fest gebacken.", "es": "Ella ha horneado magdalenas para la fiesta." },
    { "de": "M\u00F6chtest du einen Muffin?", "es": "\u00BFQuieres una magdalena?" }
  ],
  "Kantine": [
    { "de": "Die Kantine ist g\u00FCnstig.", "es": "La cantina es barata." },
    { "de": "Wir haben in der Kantine zu Mittag gegessen.", "es": "Hemos comido al mediod\u00EDa en la cantina." },
    { "de": "Gehst du oft in die Kantine?", "es": "\u00BFVas a menudo a la cantina?" }
  ],
  "Schwan": [
    { "de": "Der Schwan ist elegant.", "es": "El cisne es elegante." },
    { "de": "Wir haben einen Schwan auf dem See gesehen.", "es": "Hemos visto un cisne en el lago." },
    { "de": "Sind Schw\u00E4ne immer wei\u00DF?", "es": "\u00BFLos cisnes son siempre blancos?" }
  ],
  "wahrnehmen": [
    { "de": "Ich kann das Ger\u00E4usch kaum wahrnehmen.", "es": "Apenas puedo percibir el ruido." },
    { "de": "Er hat die Ver\u00E4nderung sofort wahrgenommen.", "es": "\u00C9l ha percibido el cambio inmediatamente." },
    { "de": "Nimmst du den Unterschied wahr?", "es": "\u00BFPercibes la diferencia?" }
  ],
  "die Abfahrt": [
    { "de": "Die Abfahrt ist um acht Uhr.", "es": "La salida es a las ocho." },
    { "de": "Der Zug hat die Abfahrt verpasst.", "es": "El tren ha perdido la salida." },
    { "de": "Wann ist die Abfahrt?", "es": "\u00BFCu\u00E1ndo es la salida?" }
  ],
  "die So\u00DFe": [
    { "de": "Die So\u00DFe schmeckt w\u00FCrzig.", "es": "La salsa sabe especiada." },
    { "de": "Der Koch hat eine tolle So\u00DFe zubereitet.", "es": "El cocinero ha preparado una salsa estupenda." },
    { "de": "Magst du So\u00DFe zum Braten?", "es": "\u00BFTe gusta la salsa para el asado?" }
  ],
  "Flasche": [
    { "de": "Die Flasche ist leer.", "es": "La botella est\u00E1 vac\u00EDa." },
    { "de": "Ich habe eine Flasche Wein ge\u00F6ffnet.", "es": "He abierto una botella de vino." },
    { "de": "Kannst du die Flasche zur\u00FCckbringen?", "es": "\u00BFPuedes devolver la botella?" }
  ],
  "Tasse": [
    { "de": "Die Tasse ist voll.", "es": "La taza est\u00E1 llena." },
    { "de": "Ich habe mir eine Tasse Kaffee gemacht.", "es": "Me he preparado una taza de caf\u00E9." },
    { "de": "M\u00F6chtest du eine Tasse Tee?", "es": "\u00BFQuieres una taza de t\u00E9?" }
  ],
  "Himbeere": [
    { "de": "Die Himbeere ist reif.", "es": "La frambuesa est\u00E1 madura." },
    { "de": "Sie hat Himbeeren im Garten gepfl\u00FCckt.", "es": "Ella ha recogido frambuesas en el jard\u00EDn." },
    { "de": "Isst du gern Himbeeren?", "es": "\u00BFTe gusta comer frambuesas?" }
  ],
  "der Rock": [
    { "de": "Der Rock ist zu kurz.", "es": "La falda es demasiado corta." },
    { "de": "Ich habe einen neuen Rock gekauft.", "es": "He comprado una falda nueva." },
    { "de": "Gef\u00E4llt dir der Rock?", "es": "\u00BFTe gusta la falda?" }
  ],
  "Gesch\u00E4ftsf\u00FChrer": [
    { "de": "Der Gesch\u00E4ftsf\u00FChrer ist streng.", "es": "El gerente es estricto." },
    { "de": "Er hat den Gesch\u00E4ftsf\u00FChrer angerufen.", "es": "\u00C9l ha llamado al gerente." },
    { "de": "Kennt der Gesch\u00E4ftsf\u00FChrer das Problem?", "es": "\u00BFConoce el gerente el problema?" }
  ],
  "Serviette": [
    { "de": "Die Serviette ist aus Stoff.", "es": "La servilleta es de tela." },
    { "de": "Ich habe eine Serviette auf den Tisch gelegt.", "es": "He puesto una servilleta en la mesa." },
    { "de": "Hast du eine Serviette f\u00FCr mich?", "es": "\u00BFTienes una servilleta para m\u00ED?" }
  ],
  "Reh": [
    { "de": "Das Reh ist scheu.", "es": "El corzo es t\u00EDmido." },
    { "de": "Wir haben ein Reh im Wald gesehen.", "es": "Hemos visto un corzo en el bosque." },
    { "de": "Lebt das Reh allein?", "es": "\u00BFVive el corzo solo?" }
  ],
  "Affe": [
    { "de": "Der Affe klettert schnell.", "es": "El mono trepa r\u00E1pido." },
    { "de": "Die Kinder haben den Affen gef\u00FCttert.", "es": "Los ni\u00F1os han dado de comer al mono." },
    { "de": "Magst du Affen?", "es": "\u00BFTe gustan los monos?" }
  ],
  "beruhigen": [
    { "de": "Du musst das weinende Kind beruhigen.", "es": "Tienes que calmar al ni\u00F1o que llora." },
    { "de": "Die Musik hat mich beruhigt.", "es": "La m\u00FAsica me ha calmado." },
    { "de": "Kannst du dich nicht beruhigen?", "es": "\u00BFNo puedes calmarte?" }
  ],
  "gef\u00E4hrlich": [
    { "de": "Die Spinne ist nicht gef\u00E4hrlich.", "es": "La ara\u00F1a no es peligrosa." },
    { "de": "Er ist in eine gef\u00E4hrliche Situation geraten.", "es": "\u00C9l ha ca\u00EDdo en una situaci\u00F3n peligrosa." },
    { "de": "Bist du in Gefahr?", "es": "\u00BFEst\u00E1s en peligro?" }
  ],
  "bilden": [
    { "de": "Wir m\u00FCssen ein Team bilden.", "es": "Tenemos que formar un equipo." },
    { "de": "Die Sch\u00FCler haben einen Kreis gebildet.", "es": "Los alumnos han formado un c\u00EDrculo." },
    { "de": "Kannst du einen Satz mit \u00FCben\u00BB bilden?", "es": "\u00BFPuedes formar una frase con \u00FCben\u00BB?" }
  ],
  "unfreundlich": [
    { "de": "Der Verk\u00E4ufer war unfreundlich.", "es": "El vendedor fue antip\u00E1tico." },
    { "de": "Sie hat unfreundlich geantwortet.", "es": "Ella ha respondido de forma antip\u00E1tica." },
    { "de": "Warum bist du so unfreundlich?", "es": "\u00BFPor qu\u00E9 eres tan antip\u00E1tico?" }
  ],
  "salzen": [
    { "de": "Du musst die Suppe noch salzen.", "es": "Todav\u00EDa tienes que salar la sopa." },
    { "de": "Ich habe das Steak schon gesalzen.", "es": "Ya he salado el filete." },
    { "de": "Soll ich den Salat salzen?", "es": "\u00BFDebo salar la ensalada?" }
  ],
  "Konzern": [
    { "de": "Der Konzern ist international t\u00E4tig.", "es": "El grupo empresarial opera internacionalmente." },
    { "de": "Sie hat bei einem gro\u00DFen Konzern gearbeitet.", "es": "Ella ha trabajado en un gran grupo empresarial." },
    { "de": "Geh\u00F6rt die Firma zu einem Konzern?", "es": "\u00BFPertenece la empresa a un grupo empresarial?" }
  ],
  "Wettervorhersage": [
    { "de": "Die Wettervorhersage war falsch.", "es": "La predicci\u00F3n del tiempo fue incorrecta." },
    { "de": "Ich habe die Wettervorhersage geh\u00F6rt.", "es": "He o\u00EDdo la predicci\u00F3n del tiempo." },
    { "de": "Hast du die Wettervorhersage f\u00FCr morgen?", "es": "\u00BFTienes la predicci\u00F3n del tiempo para ma\u00F1ana?" }
  ],
  "Seil": [
    { "de": "Das Seil ist sehr lang.", "es": "La cuerda es muy larga." },
    { "de": "Er hat das Seil um den Baum gebunden.", "es": "\u00C9l ha atado la cuerda alrededor del \u00E1rbol." },
    { "de": "Kannst du das Seil halten?", "es": "\u00BFPuedes sujetar la cuerda?" }
  ],
  "der Feiertag": [
    { "de": "Der Feiertag ist ein freier Tag.", "es": "El d\u00EDa festivo es un d\u00EDa libre." },
    { "de": "Wir haben den Feiertag zu Hause verbracht.", "es": "Hemos pasado el d\u00EDa festivo en casa." },
    { "de": "Ist morgen ein Feiertag?", "es": "\u00BFMa\u00F1ana es un d\u00EDa festivo?" }
  ],
  "Teich": [
    { "de": "Der Teich ist voller Fische.", "es": "El estanque est\u00E1 lleno de peces." },
    { "de": "Die Enten sind in den Teich geschwommen.", "es": "Los patos han nadado en el estanque." },
    { "de": "Darf man im Teich baden?", "es": "\u00BFSe puede ba\u00F1arse en el estanque?" }
  ],
  "Gelenk": [
    { "de": "Das Gelenk tut weh.", "es": "La articulaci\u00F3n duele." },
    { "de": "Ich habe mir das Gelenk verstaucht.", "es": "Me he torcido la articulaci\u00F3n." },
    { "de": "Kannst du das Gelenk bewegen?", "es": "\u00BFPuedes mover la articulaci\u00F3n?" }
  ],
  "Gabel": [
    { "de": "Die Gabel ist aus Silber.", "es": "El tenedor es de plata." },
    { "de": "Er hat die Gabel fallenlassen.", "es": "\u00C9l ha dejado caer el tenedor." },
    { "de": "Hast du eine Gabel f\u00FCr mich?", "es": "\u00BFTienes un tenedor para m\u00ED?" }
  ],
  "Tasse": [
    { "de": "Die Tasse ist blau.", "es": "La taza es azul." },
    { "de": "Ich habe die Tasse gesp\u00FClt.", "es": "He lavado la taza." },
    { "de": "Willst du eine Tasse hei\u00DFe Schokolade?", "es": "\u00BFQuieres una taza de chocolate caliente?" }
  ],
  "der Weg": [
    { "de": "Der Weg ist steinig.", "es": "El camino es pedregoso." },
    { "de": "Wir sind den falschen Weg gegangen.", "es": "Hemos ido por el camino equivocado." },
    { "de": "Kennst du den Weg zum Bahnhof?", "es": "\u00BFConoces el camino a la estaci\u00F3n?" }
  ],
  "scharf": [
    { "de": "Das Messer ist sehr scharf.", "es": "El cuchillo est\u00E1 muy afilado." },
    { "de": "Er hat das scharfe Essen nicht gemocht.", "es": "\u00C9l no ha gustado de la comida picante." },
    { "de": "Ist die So\u00DFe zu scharf?", "es": "\u00BFLa salsa es demasiado picante?" }
  ],
  "\u00F6ffnen": [
    { "de": "Ich kann die Dose nicht \u00F6ffnen.", "es": "No puedo abrir la lata." },
    { "de": "Er hat das Fenster ge\u00F6ffnet.", "es": "\u00C9l ha abierto la ventana." },
    { "de": "Kannst du bitte die T\u00FCr \u00F6ffnen?", "es": "\u00BFPuedes abrir la puerta, por favor?" }
  ],
  "die Wassermelone": [
    { "de": "Die Wassermelone ist saftig.", "es": "La sand\u00EDa es jugosa." },
    { "de": "Im Sommer habe ich viele Wassermelonen gegessen.", "es": "En verano he comido muchas sand\u00EDas." },
    { "de": "Kaufst du eine Wassermelone?", "es": "\u00BFCompras una sand\u00EDa?" }
  ],
  "Igel": [
    { "de": "Der Igel hat Stacheln.", "es": "El erizo tiene p\u00FAas." },
    { "de": "Wir haben einen Igel im Garten gefunden.", "es": "Hemos encontrado un erizo en el jard\u00EDn." },
    { "de": "Hast du schon einen Igel gesehen?", "es": "\u00BFHas visto ya un erizo?" }
  ],
  "Fu\u00DF": [
    { "de": "Mein Fu\u00DF tut weh.", "es": "Me duele el pie." },
    { "de": "Ich habe mir den Fu\u00DF verletzt.", "es": "Me he lesionado el pie." },
    { "de": "Kannst du auf einem Fu\u00DF stehen?", "es": "\u00BFPuedes estar de pie sobre un pie?" }
  ],
  "Arm": [
    { "de": "Mein Arm ist eingeschlafen.", "es": "Se me ha dormido el brazo." },
    { "de": "Er hat sich den Arm gebrochen.", "es": "\u00C9l se ha roto el brazo." },
    { "de": "Kannst du den Arm heben?", "es": "\u00BFPuedes levantar el brazo?" }
  ],
  "Eingangst\u00FCr": [
    { "de": "Die Eingangst\u00FCr ist verschlossen.", "es": "La puerta de entrada est\u00E1 cerrada con llave." },
    { "de": "Er hat die Eingangst\u00FCr rot gestrichen.", "es": "\u00C9l ha pintado la puerta de entrada de rojo." },
    { "de": "Ist die Eingangst\u00FCr offen?", "es": "\u00BFEst\u00E1 abierta la puerta de entrada?" }
  ],
  "M\u00FCsli": [
    { "de": "Das M\u00FCsli ist gesund.", "es": "El muesli es sano." },
    { "de": "Ich habe M\u00FCsli mit Joghurt gegessen.", "es": "He comido muesli con yogur." },
    { "de": "Isst du gern M\u00FCsli?", "es": "\u00BFTe gusta comer muesli?" }
  ]
};

// Unir con lo existente y guardar
const combined = { ...existing, ...block2 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 2 añadido. Total de palabras ahora:", Object.keys(combined).length);