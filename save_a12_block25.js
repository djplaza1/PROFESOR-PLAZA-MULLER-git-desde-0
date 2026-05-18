const fs = require("fs");

// Cargar archivo existente (bloques 1-24)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 25: palabras 1201 a 1250
const block25 = {
  "erregen": [
    { "de": "Die laute Musik erregt meine Aufmerksamkeit.", "es": "La m\u00FAsica alta excita mi atenci\u00F3n." },
    { "de": "Sein Verhalten hat mich sehr erregt.", "es": "Su comportamiento me ha excitado mucho." },
    { "de": "Erregt dich diese Diskussion?", "es": "\u00BFTe excita esta discusi\u00F3n?" }
  ],
  "Bein": [
    { "de": "Mein Bein ist eingeschlafen.", "es": "Se me ha dormido la pierna." },
    { "de": "Ich habe mir das Bein beim Skifahren gebrochen.", "es": "Me he roto la pierna esquiando." },
    { "de": "Kannst du dein Bein heben?", "es": "\u00BFPuedes levantar la pierna?" }
  ],
  "Auge": [
    { "de": "Mein Auge tr\u00E4nt von der K\u00E4lte.", "es": "Mi ojo lagrimea por el fr\u00EDo." },
    { "de": "Der Arzt hat mir das Auge untersucht.", "es": "El m\u00E9dico me ha examinado el ojo." },
    { "de": "Siehst du mit dem linken Auge gut?", "es": "\u00BFVes bien con el ojo izquierdo?" }
  ],
  "Bach": [
    { "de": "Der Bach f\u00FChrt klares Wasser.", "es": "El arroyo lleva agua clara." },
    { "de": "Wir sind am Bach entlang gewandert.", "es": "Hemos paseado a lo largo del arroyo." },
    { "de": "Pl\u00E4tschert der Bach das ganze Jahr?", "es": "\u00BFMurmura el arroyo todo el a\u00F1o?" }
  ],
  "n\u00F6tig": [
    { "de": "Ein Ausweis ist f\u00FCr die Reise n\u00F6tig.", "es": "Un documento de identidad es necesario para el viaje." },
    { "de": "Er hat die n\u00F6tigen Unterlagen mitgebracht.", "es": "\u00C9l ha tra\u00EDdo los documentos necesarios." },
    { "de": "Ist es wirklich n\u00F6tig?", "es": "\u00BFEs realmente necesario?" }
  ],
  "breit": [
    { "de": "Der Fluss ist hier sehr breit.", "es": "El r\u00EDo es aqu\u00ED muy ancho." },
    { "de": "Das Bett war zu breit f\u00FCr die T\u00FCr.", "es": "La cama era demasiado ancha para la puerta." },
    { "de": "Wie breit ist dein Schreibtisch?", "es": "\u00BFCu\u00E1nto mide de ancho tu escritorio?" }
  ],
  "eng": [
    { "de": "Die Hose ist mir zu eng.", "es": "El pantal\u00F3n me queda demasiado estrecho." },
    { "de": "In der engen Gasse hat er sich verlaufen.", "es": "En el callej\u00F3n estrecho se ha perdido." },
    { "de": "Ist der Flur nicht zu eng?", "es": "\u00BFNo es demasiado estrecho el pasillo?" }
  ],
  "Schraubglas": [
    { "de": "Das Schraubglas ist luftdicht verschlossen.", "es": "El frasco de rosca est\u00E1 cerrado herm\u00E9ticamente." },
    { "de": "Oma hat die Marmelade in Schraubgl\u00E4ser gef\u00FCllt.", "es": "La abuela ha llenado la mermelada en frascos de rosca." },
    { "de": "Hast du ein leeres Schraubglas?", "es": "\u00BFTienes un frasco de rosca vac\u00EDo?" }
  ],
  "ber\u00FChmt": [
    { "de": "Der Schauspieler ist weltber\u00FChmt.", "es": "El actor es mundialmente famoso." },
    { "de": "Sie ist durch ihren Roman ber\u00FChmt geworden.", "es": "Ella se ha hecho famosa por su novela." },
    { "de": "M\u00F6chtest du auch ber\u00FChmt sein?", "es": "\u00BFTe gustar\u00EDa tambi\u00E9n ser famoso?" }
  ],
  "die Hauptstadt": [
    { "de": "Die Hauptstadt hat viel Verkehr.", "es": "La capital tiene mucho tr\u00E1fico." },
    { "de": "Wir haben die Hauptstadt mit dem Bus erkundet.", "es": "Hemos explorado la capital en autob\u00FAs." },
    { "de": "Wohnst du in der Hauptstadt?", "es": "\u00BFVives en la capital?" }
  ],
  "Vorhang": [
    { "de": "Der Vorhang ist zu lang.", "es": "La cortina es demasiado larga." },
    { "de": "Ich habe den Vorhang gestern gewaschen.", "es": "Ayer he lavado la cortina." },
    { "de": "Ziehst du den Vorhang am Abend zu?", "es": "\u00BFCorres la cortina por la noche?" }
  ],
  "Selbstst\u00E4ndigkeit": [
    { "de": "Die Selbstst\u00E4ndigkeit erfordert Mut.", "es": "La autonom\u00EDa requiere valor." },
    { "de": "Er hat sich f\u00FCr die Selbstst\u00E4ndigkeit entschieden.", "es": "\u00C9l se ha decidido por la autonom\u00EDa." },
    { "de": "Traust du dir die Selbstst\u00E4ndigkeit zu?", "es": "\u00BFTe crees capaz de ser aut\u00F3nomo?" }
  ],
  "Nebel": [
    { "de": "Der Nebel war heute Morgen sehr dicht.", "es": "La niebla era esta ma\u00F1ana muy densa." },
    { "de": "Im Nebel haben wir den Weg verloren.", "es": "En la niebla hemos perdido el camino." },
    { "de": "Hast du den dichten Nebel gesehen?", "es": "\u00BFHas visto la densa niebla?" }
  ],
  "der F\u00F6hn": [
    { "de": "Der F\u00F6hn bl\u00E4st hei\u00DFe Luft.", "es": "El secador sopla aire caliente." },
    { "de": "Ich habe mir die Haare mit dem F\u00F6hn getrocknet.", "es": "Me he secado el pelo con el secador." },
    { "de": "Kannst du mir deinen F\u00F6hn leihen?", "es": "\u00BFPuedes prestarme tu secador?" }
  ],
  "betragen": [
    { "de": "Die Miete betr\u00E4gt f\u00FCnfhundert Euro.", "es": "El alquiler asciende a quinientos euros." },
    { "de": "Der Schaden hat tausend Euro betragen.", "es": "El da\u00F1o ha ascendido a mil euros." },
    { "de": "Wie viel betr\u00E4gt der Eintritt?", "es": "\u00BFA cu\u00E1nto asciende la entrada?" }
  ],
  "aufdecken": [
    { "de": "Der Reporter will den Skandal aufdecken.", "es": "El periodista quiere destapar el esc\u00E1ndalo." },
    { "de": "Die Polizei hat das Geheimnis aufgedeckt.", "es": "La polic\u00EDa ha destapado el secreto." },
    { "de": "Deckst du die Wahrheit auf?", "es": "\u00BFDestapas la verdad?" }
  ],
  "Biene": [
    { "de": "Die Biene best\u00E4ubt die Blumen.", "es": "La abeja poliniza las flores." },
    { "de": "Eine Biene hat mich in den Arm gestochen.", "es": "Una abeja me ha picado en el brazo." },
    { "de": "Siehst du die Biene auf der Sonnenblume?", "es": "\u00BFVes la abeja en el girasol?" }
  ],
  "retten": [
    { "de": "Die Feuerwehr will das Kind retten.", "es": "Los bomberos quieren salvar al ni\u00F1o." },
    { "de": "Er hat mir das Leben gerettet.", "es": "\u00C9l me ha salvado la vida." },
    { "de": "Rettest du Tiere aus dem Tierheim?", "es": "\u00BFSalvas animales de la protectora?" }
  ],
  "Plan": [
    { "de": "Mein Plan f\u00FCr heute ist ein Ausflug.", "es": "Mi plan para hoy es una excursi\u00F3n." },
    { "de": "Wir haben einen neuen Plan gemacht.", "es": "Hemos hecho un plan nuevo." },
    { "de": "Hast du einen besseren Plan?", "es": "\u00BFTienes un plan mejor?" }
  ],
  "Auge": [
    { "de": "Das Auge des Adlers sieht scharf.", "es": "El ojo del \u00E1guila ve con nitidez." },
    { "de": "Ich habe ein Staubkorn im Auge.", "es": "Tengo una mota de polvo en el ojo." },
    { "de": "Tut dein Auge weh?", "es": "\u00BFTe duele el ojo?" }
  ],
  "Rolltreppe": [
    { "de": "Die Rolltreppe ist au\u00DFer Betrieb.", "es": "La escalera mec\u00E1nica est\u00E1 fuera de servicio." },
    { "de": "Wir sind mit der Rolltreppe nach oben gefahren.", "es": "Hemos subido en la escalera mec\u00E1nica." },
    { "de": "Nimmst du die Rolltreppe oder den Aufzug?", "es": "\u00BFTomas la escalera mec\u00E1nica o el ascensor?" }
  ],
  "Brille": [
    { "de": "Meine Brille ist zerkratzt.", "es": "Mis gafas est\u00E1n rayadas." },
    { "de": "Ich habe die Brille beim Optiker bestellt.", "es": "He pedido las gafas en la \u00F3ptica." },
    { "de": "Tr\u00E4gst du deine Brille beim Lesen?", "es": "\u00BFLlevas las gafas al leer?" }
  ],
  "die Seife": [
    { "de": "Die Seife duftet nach Olive.", "es": "El jab\u00F3n huele a oliva." },
    { "de": "Ich habe die Seife im Bioladen gekauft.", "es": "He comprado el jab\u00F3n en la tienda ecol\u00F3gica." },
    { "de": "W\u00E4schst du deine H\u00E4nde mit Seife?", "es": "\u00BFTe lavas las manos con jab\u00F3n?" }
  ],
  "Becher": [
    { "de": "Der Becher ist aus Pappe.", "es": "El vaso es de cart\u00F3n." },
    { "de": "Ich habe mir einen Becher Kaffee geholt.", "es": "Me he cogido un vaso de caf\u00E9." },
    { "de": "Hast du einen Becher f\u00FCr mich?", "es": "\u00BFTienes un vaso para m\u00ED?" }
  ],
  "stumpf": [
    { "de": "Das Messer ist v\u00F6llig stumpf.", "es": "El cuchillo est\u00E1 completamente romo." },
    { "de": "Die Schere hat sich mit der Zeit gestumpft.", "es": "Las tijeras se han vuelto romas con el tiempo." },
    { "de": "Ist dein Bleistift stumpf?", "es": "\u00BFEst\u00E1 romo tu l\u00E1piz?" }
  ],
  "Winter": [
    { "de": "Der Winter ist kalt und lang.", "es": "El invierno es fr\u00EDo y largo." },
    { "de": "Wir haben den Winter in den Bergen verbracht.", "es": "Hemos pasado el invierno en las monta\u00F1as." },
    { "de": "Magst du den Winter?", "es": "\u00BFTe gusta el invierno?" }
  ],
  "Sonne": [
    { "de": "Die Sonne scheint hell.", "es": "El sol brilla intensamente." },
    { "de": "Gestern hat die Sonne den ganzen Tag geschienen.", "es": "Ayer el sol ha brillado todo el d\u00EDa." },
    { "de": "Gehst du gern in die Sonne?", "es": "\u00BFTe gusta ponerte al sol?" }
  ],
  "Elektriker": [
    { "de": "Der Elektriker repariert die Leitung.", "es": "El electricista repara la instalaci\u00F3n el\u00E9ctrica." },
    { "de": "Ich habe den Elektriker f\u00FCr morgen bestellt.", "es": "He pedido al electricista para ma\u00F1ana." },
    { "de": "Kennst du einen g\u00FCnstigen Elektriker?", "es": "\u00BFConoces un electricista barato?" }
  ],
  "Sp\u00E4tschicht": [
    { "de": "Die Sp\u00E4tschicht beginnt um vierzehn Uhr.", "es": "El turno de tarde empieza a las dos." },
    { "de": "Mein Vater hat jahrelang Sp\u00E4tschicht gearbeitet.", "es": "Mi padre ha trabajado a\u00F1os en el turno de tarde." },
    { "de": "Arbeitest du lieber Fr\u00FChschicht oder Sp\u00E4tschicht?", "es": "\u00BFPrefieres el turno de ma\u00F1ana o de tarde?" }
  ],
  "Bart": [
    { "de": "Sein Bart ist grau.", "es": "Su barba es gris." },
    { "de": "Ich habe mir den Bart abrasiert.", "es": "Me he afeitado la barba." },
    { "de": "L\u00E4sst du dir einen Bart wachsen?", "es": "\u00BFTe dejas crecer la barba?" }
  ],
  "zu Abend essen": [
    { "de": "Wir wollen heute um sieben zu Abend essen.", "es": "Queremos cenar hoy a las siete." },
    { "de": "Gestern habe ich mit den Kollegen zu Abend gegessen.", "es": "Ayer he cenado con los compa\u00F1eros." },
    { "de": "Isst du gern zu Abend?", "es": "\u00BFTe gusta cenar?" }
  ],
  "Badewanne": [
    { "de": "Die Badewanne ist voller Schaum.", "es": "La ba\u00F1era est\u00E1 llena de espuma." },
    { "de": "Ich habe ein hei\u00DFes Bad in der Wanne genommen.", "es": "Me he dado un ba\u00F1o caliente en la ba\u00F1era." },
    { "de": "Hast du die Badewanne schon geputzt?", "es": "\u00BFYa has limpiado la ba\u00F1era?" }
  ],
  "Cousin": [
    { "de": "Mein Cousin studiert in Berlin.", "es": "Mi primo estudia en Berl\u00EDn." },
    { "de": "Der Cousin hat mich zum Geburtstag eingeladen.", "es": "El primo me ha invitado a su cumplea\u00F1os." },
    { "de": "Siehst du deinen Cousin oft?", "es": "\u00BFVes a tu primo a menudo?" }
  ],
  "Falke": [
    { "de": "Der Falke kreist am Himmel.", "es": "El halc\u00F3n vuela en c\u00EDrculos en el cielo." },
    { "de": "Wir haben einen Falken im Wald gesehen.", "es": "Hemos visto un halc\u00F3n en el bosque." },
    { "de": "Kann ein Falke eine Taube fangen?", "es": "\u00BFPuede un halc\u00F3n atrapar una paloma?" }
  ],
  "Nachbarin": [
    { "de": "Die Nachbarin ist sehr hilfsbereit.", "es": "La vecina es muy servicial." },
    { "de": "Ich habe die Nachbarin um Zucker gebeten.", "es": "He pedido az\u00FAcar a la vecina." },
    { "de": "Wohnt die Nachbarin allein?", "es": "\u00BFVive sola la vecina?" }
  ],
  "Fahrrad": [
    { "de": "Mein Fahrrad hat einen Platten.", "es": "Mi bicicleta tiene un pinchazo." },
    { "de": "Ich habe das Fahrrad im Keller abgestellt.", "es": "He guardado la bicicleta en el s\u00F3tano." },
    { "de": "F\u00E4hrst du mit dem Fahrrad zur Schule?", "es": "\u00BFVas en bicicleta a la escuela?" }
  ],
  "Flugzeug": [
    { "de": "Das Flugzeug hebt p\u00FCnktlich ab.", "es": "El avi\u00F3n despega puntualmente." },
    { "de": "Wir sind mit dem Flugzeug nach Spanien geflogen.", "es": "Hemos volado a Espa\u00F1a en avi\u00F3n." },
    { "de": "Hast du Angst vor dem Flugzeug?", "es": "\u00BFTienes miedo al avi\u00F3n?" }
  ],
  "heuteAbend": [
    { "de": "Heute Abend gehe ich ins Kino.", "es": "Esta tarde voy al cine." },
    { "de": "Wir haben heute Abend G\u00E4ste eingeladen.", "es": "Esta tarde hemos invitado a unos amigos." },
    { "de": "Was machst du heute Abend?", "es": "\u00BFQu\u00E9 haces esta tarde?" }
  ],
  "der Pfau": [
    { "de": "Der Pfau schl\u00E4gt ein wundersch\u00F6nes Rad.", "es": "El pavo real despliega una rueda maravillosa." },
    { "de": "Im Park haben wir einen Pfau gesehen.", "es": "En el parque hemos visto un pavo real." },
    { "de": "Hast du schon einen Pfau im Zoo fotografiert?", "es": "\u00BFHas fotografiado ya un pavo real en el zoo?" }
  ],
  "Boden": [
    { "de": "Der Boden im Keller ist kalt.", "es": "El suelo del s\u00F3tano est\u00E1 fr\u00EDo." },
    { "de": "Papa hat den Boden mit Laminat belegt.", "es": "Pap\u00E1 ha puesto suelo laminado." },
    { "de": "Hast du den Boden schon gesaugt?", "es": "\u00BFYa has aspirado el suelo?" }
  ],
  "Trag\u00F6die": [
    { "de": "Das Theaterst\u00FCck endet als Trag\u00F6die.", "es": "La obra de teatro termina en tragedia." },
    { "de": "Der Unfall war eine schreckliche Trag\u00F6die.", "es": "El accidente fue una tragedia horrible." },
    { "de": "Liest du gern griechische Trag\u00F6dien?", "es": "\u00BFTe gusta leer tragedias griegas?" }
  ],
  "die Robbe": [
    { "de": "Die Robbe sonnt sich auf dem Felsen.", "es": "La foca toma el sol sobre la roca." },
    { "de": "Wir haben die Robbe im Wattenmeer beobachtet.", "es": "Hemos observado la foca en el mar de Frisia." },
    { "de": "Siehst du die Robbe dort am Strand?", "es": "\u00BFVes la foca all\u00ED en la playa?" }
  ],
  "die Gans": [
    { "de": "Die Gans schnattert auf dem Bauernhof.", "es": "El ganso grazna en la granja." },
    { "de": "Zu Weihnachten haben wir eine Gans gebraten.", "es": "En Navidad hemos asado un ganso." },
    { "de": "Hast du die Gans gef\u00FCttert?", "es": "\u00BFHas dado de comer al ganso?" }
  ],
  "Senf": [
    { "de": "Der Senf ist mir zu scharf.", "es": "La mostaza me resulta demasiado picante." },
    { "de": "Ich habe Senf auf die Bratwurst gemacht.", "es": "He puesto mostaza en la salchicha." },
    { "de": "Magst du s\u00FC\u00DFen Senf?", "es": "\u00BFTe gusta la mostaza dulce?" }
  ],
  "\u00FCberraschen": [
    { "de": "Ich will meine Mutter \u00FCberraschen.", "es": "Quiero sorprender a mi madre." },
    { "de": "Das Geschenk hat mich sehr \u00FCberrascht.", "es": "El regalo me ha sorprendido mucho." },
    { "de": "\u00DCberraschst du deinen Freund zum Geburtstag?", "es": "\u00BFSorprendes a tu amigo por su cumplea\u00F1os?" }
  ],
  "vorbereiten": [
    { "de": "Ich muss mich auf die Pr\u00FCfung vorbereiten.", "es": "Tengo que prepararme para el examen." },
    { "de": "Oma hat das Abendessen vorbereitet.", "es": "La abuela ha preparado la cena." },
    { "de": "Bereitest du die Pr\u00E4sentation f\u00FCr morgen vor?", "es": "\u00BFPreparas la presentaci\u00F3n para ma\u00F1ana?" }
  ],
  "der Pyjama": [
    { "de": "Der Pyjama ist aus weichem Stoff.", "es": "El pijama es de tela blanda." },
    { "de": "Das Kind hat den Pyjama schon angezogen.", "es": "El ni\u00F1o ya se ha puesto el pijama." },
    { "de": "Ziehst du deinen Pyjama fr\u00FCh an?", "es": "\u00BFTe pones el pijama temprano?" }
  ],
  "k\u00FChl": [
    { "de": "Das Wasser im See ist k\u00FChl.", "es": "El agua del lago est\u00E1 fresca." },
    { "de": "Heute Morgen ist es recht k\u00FChl.", "es": "Esta ma\u00F1ana hace bastante fresco." },
    { "de": "Magst du k\u00FChle Getr\u00E4nke?", "es": "\u00BFTe gustan las bebidas frescas?" }
  ],
  "Motorrad": [
    { "de": "Mein Motorrad braucht einen neuen Auspuff.", "es": "Mi moto necesita un escape nuevo." },
    { "de": "Er ist mit dem Motorrad durch Europa gefahren.", "es": "\u00C9l ha recorrido Europa en moto." },
    { "de": "F\u00E4hrst du gern mit dem Motorrad?", "es": "\u00BFTe gusta conducir la moto?" }
  ],
  "der Geburtstag": [
    { "de": "Mein Geburtstag ist im August.", "es": "Mi cumplea\u00F1os es en agosto." },
    { "de": "Wir haben den Geburtstag gro\u00DF gefeiert.", "es": "Hemos celebrado el cumplea\u00F1os a lo grande." },
    { "de": "Wann hast du Geburtstag?", "es": "\u00BFCu\u00E1ndo es tu cumplea\u00F1os?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block25 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 25 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);