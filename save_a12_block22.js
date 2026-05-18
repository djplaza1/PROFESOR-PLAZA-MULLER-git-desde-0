const fs = require("fs");

// Cargar archivo existente (bloques 1-21)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 22: palabras 1051 a 1100
const block22 = {
  "der Salat": [
    { "de": "Der Salat ist frisch und knackig.", "es": "La ensalada est\u00E1 fresca y crujiente." },
    { "de": "Ich habe den Salat mit Essig und \u00D6l angemacht.", "es": "He ali\u00F1ado la ensalada con vinagre y aceite." },
    { "de": "Kannst du den Salat f\u00FCr das Abendessen vorbereiten?", "es": "\u00BFPuedes preparar la ensalada para la cena?" }
  ],
  "Brief": [
    { "de": "Der Brief liegt auf dem Schreibtisch.", "es": "La carta est\u00E1 en el escritorio." },
    { "de": "Oma hat mir einen langen Brief geschrieben.", "es": "La abuela me ha escrito una carta larga." },
    { "de": "Hast du den Brief schon zur Post gebracht?", "es": "\u00BFYa has llevado la carta a correos?" }
  ],
  "Paket": [
    { "de": "Das Paket ist schwer.", "es": "El paquete es pesado." },
    { "de": "Der Bote hat das Paket vor der T\u00FCr abgelegt.", "es": "El mensajero ha dejado el paquete delante de la puerta." },
    { "de": "Kannst du das Paket f\u00FCr mich annehmen?", "es": "\u00BFPuedes recoger el paquete por m\u00ED?" }
  ],
  "die Grapefruit": [
    { "de": "Die Grapefruit ist sauer.", "es": "El pomelo es \u00E1cido." },
    { "de": "Zum Fr\u00FChst\u00FCck habe ich eine halbe Grapefruit gegessen.", "es": "En el desayuno he comido medio pomelo." },
    { "de": "Magst du Grapefruit oder lieber Orange?", "es": "\u00BFTe gusta el pomelo o prefieres la naranja?" }
  ],
  "liefern": [
    { "de": "Der Supermarkt kann die Eink\u00E4ufe liefern.", "es": "El supermercado puede entregar la compra." },
    { "de": "Die Firma hat die Ware p\u00FCnktlich geliefert.", "es": "La empresa ha entregado la mercanc\u00EDa puntualmente." },
    { "de": "Lieferst du auch am Samstag?", "es": "\u00BFEntregas tambi\u00E9n los s\u00E1bados?" }
  ],
  "die Margarine": [
    { "de": "Die Margarine ist streichzart.", "es": "La margarina es untable." },
    { "de": "Ich habe Margarine statt Butter benutzt.", "es": "He usado margarina en lugar de mantequilla." },
    { "de": "Nimmst du Margarine oder Butter aufs Brot?", "es": "\u00BFTomas margarina o mantequilla en el pan?" }
  ],
  "sich ausziehen": [
    { "de": "Du musst dich vor dem Schlafen ausziehen.", "es": "Tienes que desvestirte antes de dormir." },
    { "de": "Das Kind hat sich schon ausgezogen.", "es": "El ni\u00F1o ya se ha desvestido." },
    { "de": "Ziehst du dich im Bad aus?", "es": "\u00BFTe desvistes en el ba\u00F1o?" }
  ],
  "Weizen": [
    { "de": "Der Weizen ist goldgelb.", "es": "El trigo es de color dorado." },
    { "de": "Der Bauer hat den Weizen im Juli geerntet.", "es": "El agricultor ha cosechado el trigo en julio." },
    { "de": "W\u00E4chst hier Weizen oder Roggen?", "es": "\u00BFCrece aqu\u00ED trigo o centeno?" }
  ],
  "ungl\u00FCcklich": [
    { "de": "Sie sieht heute ungl\u00FCcklich aus.", "es": "Ella parece infeliz hoy." },
    { "de": "Er hat sich nach der Nachricht ungl\u00FCcklich gef\u00FChlt.", "es": "\u00C9l se ha sentido infeliz despu\u00E9s de la noticia." },
    { "de": "Warum bist du so ungl\u00FCcklich?", "es": "\u00BFPor qu\u00E9 est\u00E1s tan infeliz?" }
  ],
  "Kaugummi": [
    { "de": "Der Kaugummi ist minzig.", "es": "El chicle sabe a menta." },
    { "de": "Er hat den Kaugummi unter den Tisch geklebt.", "es": "\u00C9l ha pegado el chicle debajo de la mesa." },
    { "de": "Kaufst du Kaugummi an der Kasse?", "es": "\u00BFCompras chicle en la caja?" }
  ],
  "guion": [
    { "de": "\"guion\" ist ein spanisches Wort.", "es": "\"guion\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"guion\" Drehbuch.", "es": "En alem\u00E1n \"guion\" significa guion cinematogr\u00E1fico." },
    { "de": "Kennst du das Wort \"Drehbuch\"?", "es": "\u00BFConoces la palabra \"Drehbuch\"?" }
  ],
  "das TShirt": [
    { "de": "Das TShirt ist aus reiner Baumwolle.", "es": "La camiseta es de algod\u00F3n puro." },
    { "de": "Ich habe das TShirt im Sonderangebot gekauft.", "es": "He comprado la camiseta en oferta especial." },
    { "de": "Gef\u00E4llt dir mein neues TShirt?", "es": "\u00BFTe gusta mi camiseta nueva?" }
  ],
  "die Sechs": [
    { "de": "Die Sechs ist eine gerade Zahl.", "es": "El seis es un n\u00FAmero par." },
    { "de": "Ich habe eine Sechs im Lotto gew\u00E4hlt.", "es": "He elegido el seis en la loter\u00EDa." },
    { "de": "Magst du die Sechs oder die Acht?", "es": "\u00BFTe gusta el seis o el ocho?" }
  ],
  "Wartezimmer": [
    { "de": "Das Wartezimmer ist hell.", "es": "La sala de espera es luminosa." },
    { "de": "Wir haben lange im Wartezimmer gesessen.", "es": "Hemos estado sentados mucho rato en la sala de espera." },
    { "de": "Ist das Wartezimmer immer so voll?", "es": "\u00BFEst\u00E1 siempre tan llena la sala de espera?" }
  ],
  "hell": [
    { "de": "Die Farbe ist sehr hell.", "es": "El color es muy claro." },
    { "de": "Der Himmel ist heute heller als gestern.", "es": "El cielo est\u00E1 hoy m\u00E1s claro que ayer." },
    { "de": "Wird es im Sommer fr\u00FCh hell?", "es": "\u00BFAmanece pronto en verano?" }
  ],
  "gie\u00DFen": [
    { "de": "Ich muss die Blumen gie\u00DFen.", "es": "Tengo que regar las flores." },
    { "de": "Er hat Wasser in die Kanne gegossen.", "es": "\u00C9l ha echado agua en la jarra." },
    { "de": "Gie\u00DFt du die Pflanzen t\u00E4glich?", "es": "\u00BFRiegas las plantas a diario?" }
  ],
  "Wirbel": [
    { "de": "Der Wirbel sch\u00FCtzt das R\u00FCckenmark.", "es": "La v\u00E9rtebra protege la m\u00E9dula espinal." },
    { "de": "Ich habe mir einen Wirbel verletzt.", "es": "Me he lesionado una v\u00E9rtebra." },
    { "de": "Tut dein Wirbel bei Bewegung weh?", "es": "\u00BFTe duele la v\u00E9rtebra al moverte?" }
  ],
  "Erbse": [
    { "de": "Die Erbse ist gr\u00FCn.", "es": "El guisante es verde." },
    { "de": "Oma hat Erbsen aus dem Garten geerntet.", "es": "La abuela ha cosechado guisantes del jard\u00EDn." },
    { "de": "Isst du gern Erbsensuppe?", "es": "\u00BFTe gusta la sopa de guisantes?" }
  ],
  "Taube": [
    { "de": "Die Taube pickt Kr\u00FCmel auf.", "es": "La paloma picotea migajas." },
    { "de": "Auf dem Marktplatz haben wir Tauben gef\u00FCttert.", "es": "En la plaza del mercado hemos dado de comer a las palomas." },
    { "de": "Fliegen die Tauben zu deinem Fenster?", "es": "\u00BFVuelan las palomas hasta tu ventana?" }
  ],
  "das Krankenhaus": [
    { "de": "Das Krankenhaus ist modern ausgestattet.", "es": "El hospital est\u00E1 equipado de forma moderna." },
    { "de": "Mein Onkel hat das Krankenhaus gestern verlassen.", "es": "Mi t\u00EDo ha salido ayer del hospital." },
    { "de": "Bringst du mich morgen ins Krankenhaus?", "es": "\u00BFMe llevas ma\u00F1ana al hospital?" }
  ],
  "Badeanzug": [
    { "de": "Mein Badeanzug ist zu eng.", "es": "Mi ba\u00F1ador est\u00E1 demasiado ajustado." },
    { "de": "Sie hat sich einen neuen Badeanzug f\u00FCr den Urlaub gekauft.", "es": "Ella se ha comprado un ba\u00F1ador nuevo para las vacaciones." },
    { "de": "Tr\u00E4gst du lieber Badeanzug oder Bikini?", "es": "\u00BFPrefieres ba\u00F1ador o bikini?" }
  ],
  "Teddyb\u00E4r": [
    { "de": "Der Teddyb\u00E4r ist flauschig.", "es": "El oso de peluche es esponjoso." },
    { "de": "Das Kind hat den Teddyb\u00E4r \u00FCberall mit hingenommen.", "es": "El ni\u00F1o ha llevado el oso de peluche a todas partes." },
    { "de": "Schl\u00E4fst du noch mit einem Teddyb\u00E4r?", "es": "\u00BFDuermes todav\u00EDa con un oso de peluche?" }
  ],
  "Pf\u00F6rtner": [
    { "de": "Der Pf\u00F6rtner gr\u00FC\u00DFt freundlich.", "es": "El portero saluda amablemente." },
    { "de": "Ich habe den Pf\u00F6rtner nach dem Weg gefragt.", "es": "He preguntado al portero por el camino." },
    { "de": "Arbeitet der Pf\u00F6rtner auch nachts?", "es": "\u00BFTrabaja el portero tambi\u00E9n de noche?" }
  ],
  "Dutt": [
    { "de": "Ihr Dutt sitzt perfekt.", "es": "Su mo\u00F1o est\u00E1 perfecto." },
    { "de": "Sie hat sich die Haare zu einem Dutt gebunden.", "es": "Ella se ha recogido el pelo en un mo\u00F1o." },
    { "de": "Tr\u00E4gst du gern einen Dutt?", "es": "\u00BFTe gusta llevar un mo\u00F1o?" }
  ],
  "die Sporthalle": [
    { "de": "Die Sporthalle ist nagelneu.", "es": "El polideportivo es completamente nuevo." },
    { "de": "Wir haben in der Sporthalle Basketball gespielt.", "es": "Hemos jugado al baloncesto en el polideportivo." },
    { "de": "Trainierst du dreimal pro Woche in der Sporthalle?", "es": "\u00BFEntrenas tres veces por semana en el polideportivo?" }
  ],
  "\u00FCberwinden": [
    { "de": "Du musst deine Angst \u00FCberwinden.", "es": "Tienes que superar tu miedo." },
    { "de": "Er hat die schwierige Pr\u00FCfung \u00FCberwunden.", "es": "\u00C9l ha superado el dif\u00EDcil examen." },
    { "de": "\u00DCberwindest du die Hindernisse leicht?", "es": "\u00BFSuperas los obst\u00E1culos f\u00E1cilmente?" }
  ],
  "neben": [
    { "de": "Die Lampe steht neben dem Bett.", "es": "La l\u00E1mpara est\u00E1 al lado de la cama." },
    { "de": "Ich habe mich neben meinen Freund gesetzt.", "es": "Me he sentado al lado de mi amigo." },
    { "de": "Parkst du neben der Kirche?", "es": "\u00BFAparcas al lado de la iglesia?" }
  ],
  "der Keks": [
    { "de": "Der Keks ist mit Schokolade \u00FCberzogen.", "es": "La galleta est\u00E1 cubierta de chocolate." },
    { "de": "Wir haben Kekse zu Weihnachten gebacken.", "es": "Hemos horneado galletas en Navidad." },
    { "de": "Darf ich noch einen Keks nehmen?", "es": "\u00BFPuedo coger otra galleta?" }
  ],
  "Gew\u00FCrz": [
    { "de": "Das Gew\u00FCrz duftet orientalisch.", "es": "La especia huele oriental." },
    { "de": "Ich habe das Gew\u00FCrz auf dem Markt gefunden.", "es": "He encontrado la especia en el mercado." },
    { "de": "Kennst du das Gew\u00FCrz namens Kurkuma?", "es": "\u00BFConoces la especia llamada c\u00FArcuma?" }
  ],
  "werben": [
    { "de": "Das Plakat soll f\u00FCr das Konzert werben.", "es": "El cartel debe anunciar el concierto." },
    { "de": "Die Firma hat in der Zeitung geworben.", "es": "La empresa ha anunciado en el peri\u00F3dico." },
    { "de": "Wirbst du f\u00FCr deine Produkte online?", "es": "\u00BFAnuncias tus productos en l\u00EDnea?" }
  ],
  "Park": [
    { "de": "Der Park ist voller Spazierg\u00E4nger.", "es": "El parque est\u00E1 lleno de paseantes." },
    { "de": "Gestern sind wir in den Park gegangen.", "es": "Ayer fuimos al parque." },
    { "de": "Spielst du oft im Park?", "es": "\u00BFJuegas a menudo en el parque?" }
  ],
  "Strand": [
    { "de": "Der Strand ist sauber.", "es": "La playa est\u00E1 limpia." },
    { "de": "Wir haben den ganzen Tag am Strand verbracht.", "es": "Hemos pasado todo el d\u00EDa en la playa." },
    { "de": "F\u00E4hrst du gern an den Strand?", "es": "\u00BFTe gusta ir a la playa?" }
  ],
  "unwichtig": [
    { "de": "Das Problem ist v\u00F6llig unwichtig.", "es": "El problema es completamente sin importancia." },
    { "de": "Er hat die unwichtigen Details einfach ignoriert.", "es": "\u00C9l ha ignorado simplemente los detalles sin importancia." },
    { "de": "Findest du die Diskussion unwichtig?", "es": "\u00BFEncuentras la discusi\u00F3n sin importancia?" }
  ],
  "die Woche": [
    { "de": "Die Woche hat sieben Tage.", "es": "La semana tiene siete d\u00EDas." },
    { "de": "Ich habe diese Woche viel gearbeitet.", "es": "He trabajado mucho esta semana." },
    { "de": "Welcher Tag der Woche ist heute?", "es": "\u00BFQu\u00E9 d\u00EDa de la semana es hoy?" }
  ],
  "Kopf": [
    { "de": "Mein Kopf tut weh.", "es": "Me duele la cabeza." },
    { "de": "Er hat sich den Kopf an der Schrankecke gesto\u00DFen.", "es": "\u00C9l se ha golpeado la cabeza con la esquina del armario." },
    { "de": "Hast du Kopfschmerzen?", "es": "\u00BFTienes dolor de cabeza?" }
  ],
  "Hand": [
    { "de": "Meine Hand ist kalt.", "es": "Mi mano est\u00E1 fr\u00EDa." },
    { "de": "Sie hat mir die Hand gesch\u00FCttelt.", "es": "Ella me ha estrechado la mano." },
    { "de": "Gibst du mir deine Hand?", "es": "\u00BFMe das la mano?" }
  ],
  "lieb": [
    { "de": "Meine Katze ist sehr lieb.", "es": "Mi gato es muy querido." },
    { "de": "Er hat mir einen lieben Brief geschrieben.", "es": "\u00C9l me ha escrito una carta cari\u00F1osa." },
    { "de": "Bist du immer so lieb zu deiner Oma?", "es": "\u00BFSiempre eres tan cari\u00F1oso con tu abuela?" }
  ],
  "achtzehn": [
    { "de": "Achtzehn ist fast zwanzig.", "es": "Dieciocho es casi veinte." },
    { "de": "Sie ist gestern achtzehn geworden.", "es": "Ella cumpli\u00F3 ayer dieciocho a\u00F1os." },
    { "de": "Bist du schon achtzehn?", "es": "\u00BFYa tienes dieciocho?" }
  ],
  "sich duschen": [
    { "de": "Ich muss mich nach dem Sport duschen.", "es": "Tengo que ducharme despu\u00E9s del deporte." },
    { "de": "Er hat sich kalt geduscht.", "es": "\u00C9l se ha duchado con agua fr\u00EDa." },
    { "de": "Duschst du dich jeden Morgen?", "es": "\u00BFTe duchas todas las ma\u00F1anas?" }
  ],
  "Faust": [
    { "de": "Er ballt die Faust vor Wut.", "es": "\u00C9l aprieta el pu\u00F1o de rabia." },
    { "de": "Der Boxer hat mit der Faust zugeschlagen.", "es": "El boxeador ha golpeado con el pu\u00F1o." },
    { "de": "Kannst du eine Faust machen?", "es": "\u00BFPuedes hacer un pu\u00F1o?" }
  ],
  "Rentenversicherung": [
    { "de": "Die Rentenversicherung ist obligatorisch.", "es": "El seguro de pensiones es obligatorio." },
    { "de": "Er hat in die Rentenversicherung eingezahlt.", "es": "\u00C9l ha cotizado al seguro de pensiones." },
    { "de": "Hast du deine Rentenversicherung schon gepr\u00FCft?", "es": "\u00BFYa has revisado tu seguro de pensiones?" }
  ],
  "Gl\u00E4tteisen": [
    { "de": "Das Gl\u00E4tteisen ist zu hei\u00DF.", "es": "El alisador est\u00E1 demasiado caliente." },
    { "de": "Sie hat sich die Haare mit dem Gl\u00E4tteisen gegl\u00E4ttet.", "es": "Ella se ha alisado el pelo con el alisador." },
    { "de": "Benutzt du das Gl\u00E4tteisen jeden Tag?", "es": "\u00BFUsas el alisador todos los d\u00EDas?" }
  ],
  "articles": [
    { "de": "\"articles\" ist ein englisches Wort.", "es": "\"articles\" es una palabra inglesa." },
    { "de": "Auf Deutsch hei\u00DFt \"articles\" Artikel.", "es": "En alem\u00E1n \"articles\" significa art\u00EDculos." },
    { "de": "Kennst du die deutschen Artikel?", "es": "\u00BFConoces los art\u00EDculos alemanes?" }
  ],
  "die Haselnuss": [
    { "de": "Die Haselnuss ist knackig.", "es": "La avellana es crujiente." },
    { "de": "Wir haben Haseln\u00FCsse f\u00FCr den Kuchen gehackt.", "es": "Hemos picado avellanas para la tarta." },
    { "de": "Isst du gern Haseln\u00FCsse?", "es": "\u00BFTe gusta comer avellanas?" }
  ],
  "holen": [
    { "de": "Ich muss noch Brot vom B\u00E4cker holen.", "es": "Todav\u00EDa tengo que ir a buscar pan a la panader\u00EDa." },
    { "de": "Er hat die Kinder von der Schule geholt.", "es": "\u00C9l ha ido a buscar a los ni\u00F1os a la escuela." },
    { "de": "Holst du mich um f\u00FCnf ab?", "es": "\u00BFMe recoges a las cinco?" }
  ],
  "bringen": [
    { "de": "Kannst du mir bitte ein Glas Wasser bringen?", "es": "\u00BFPuedes traerme un vaso de agua, por favor?" },
    { "de": "Sie hat mir eine Tasse Kaffee gebracht.", "es": "Ella me ha tra\u00EDdo una taza de caf\u00E9." },
    { "de": "Bringst du die Blumen zur Oma?", "es": "\u00BFLlevas las flores a la abuela?" }
  ],
  "Spatz": [
    { "de": "Der Spatz zwitschert fr\u00F6hlich.", "es": "El gorri\u00F3n gorjea alegremente." },
    { "de": "Auf dem Fensterbrett habe ich einen Spatz gesehen.", "es": "En el alfeizar he visto un gorri\u00F3n." },
    { "de": "F\u00FCtterst du die Spatzen im Winter?", "es": "\u00BFDas de comer a los gorriones en invierno?" }
  ],
  "K\u00FChlschrank": [
    { "de": "Der K\u00FChlschrank ist leer.", "es": "La nevera est\u00E1 vac\u00EDa." },
    { "de": "Ich habe den K\u00FChlschrank gestern abgetaut.", "es": "Ayer he descongelado la nevera." },
    { "de": "Stellst du die Milch in den K\u00FChlschrank?", "es": "\u00BFPones la leche en la nevera?" }
  ],
  "der Honig": [
    { "de": "Der Honig ist fl\u00FCssig und golden.", "es": "La miel es l\u00EDquida y dorada." },
    { "de": "Oma hat Honig aus der Region gekauft.", "es": "La abuela ha comprado miel de la regi\u00F3n." },
    { "de": "M\u00F6chtest du Honig im Tee?", "es": "\u00BFQuieres miel en el t\u00E9?" }
  ],
  "biegen": [
    { "de": "Der Draht l\u00E4sst sich leicht biegen.", "es": "El alambre se puede doblar f\u00E1cilmente." },
    { "de": "Er hat das Blech vorsichtig gebogen.", "es": "\u00C9l ha doblado la chapa con cuidado." },
    { "de": "Biegst du den Ast nach unten?", "es": "\u00BFDoblas la rama hacia abajo?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block22 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 22 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);