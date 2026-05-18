const fs = require("fs");

// Cargar archivo existente (bloques 1-15)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 16: palabras 751 a 800
const block16 = {
  "ordnen": [
    { "de": "Ich muss meine Papiere ordnen.", "es": "Tengo que ordenar mis papeles." },
    { "de": "Er hat die B\u00FCcher nach Farben geordnet.", "es": "\u00C9l ha ordenado los libros por colores." },
    { "de": "Ordnest du deine Mails jeden Morgen?", "es": "\u00BFOrdenas tus correos cada ma\u00F1ana?" }
  ],
  "die Bank": [
    { "de": "Die Bank ist heute geschlossen.", "es": "El banco est\u00E1 cerrado hoy." },
    { "de": "Ich habe Geld von der Bank geholt.", "es": "He sacado dinero del banco." },
    { "de": "Gehst du zur Bank oder \u00FCberweist du online?", "es": "\u00BFVas al banco o haces transferencia en l\u00EDnea?" }
  ],
  "die Mitternacht": [
    { "de": "Die Mitternacht ist ruhig.", "es": "La medianoche es tranquila." },
    { "de": "Wir haben bis Mitternacht geredet.", "es": "Hemos hablado hasta medianoche." },
    { "de": "Schl\u00E4fst du vor Mitternacht?", "es": "\u00BFDuermes antes de medianoche?" }
  ],
  "Platz": [
    { "de": "Der Platz vor dem Rathaus ist gro\u00DF.", "es": "La plaza delante del ayuntamiento es grande." },
    { "de": "Ich habe einen Platz im Bus gefunden.", "es": "He encontrado un asiento en el autob\u00FAs." },
    { "de": "Ist dieser Platz noch frei?", "es": "\u00BFEst\u00E1 libre todav\u00EDa este sitio?" }
  ],
  "Zug": [
    { "de": "Der Zug ist p\u00FCnktlich.", "es": "El tren es puntual." },
    { "de": "Wir haben den Zug um eine Minute verpasst.", "es": "Hemos perdido el tren por un minuto." },
    { "de": "Nimmst du den Zug zur Arbeit?", "es": "\u00BFTomas el tren para el trabajo?" }
  ],
  "Ast": [
    { "de": "Der Ast ist dick und stabil.", "es": "La rama es gruesa y estable." },
    { "de": "Ein Vogel hat ein Nest in den Ast gebaut.", "es": "Un p\u00E1jaro ha construido un nido en la rama." },
    { "de": "Kannst du den Ast abs\u00E4gen?", "es": "\u00BFPuedes serrar la rama?" }
  ],
  "Sch\u00FCssel": [
    { "de": "Die Sch\u00FCssel ist aus Keramik.", "es": "El cuenco es de cer\u00E1mica." },
    { "de": "Oma hat die Suppe in eine Sch\u00FCssel gef\u00FCllt.", "es": "La abuela ha echado la sopa en un cuenco." },
    { "de": "Stellst du die Sch\u00FCssel auf den Tisch?", "es": "\u00BFPones el cuenco en la mesa?" }
  ],
  "Speck": [
    { "de": "Der Speck ist sch\u00F6n knusprig.", "es": "El tocino est\u00E1 bien crujiente." },
    { "de": "Ich habe Speck in der Pfanne gebraten.", "es": "He frito tocino en la sart\u00E9n." },
    { "de": "Isst du Eier mit Speck?", "es": "\u00BFComes huevos con tocino?" }
  ],
  "die Garage": [
    { "de": "Die Garage ist voller Kisten.", "es": "El garaje est\u00E1 lleno de cajas." },
    { "de": "Papa hat das Auto in die Garage gefahren.", "es": "Pap\u00E1 ha metido el coche en el garaje." },
    { "de": "Parkst du dein Fahrrad in der Garage?", "es": "\u00BFGuardas tu bicicleta en el garaje?" }
  ],
  "der Platz": [
    { "de": "Der Platz l\u00E4dt zum Verweilen ein.", "es": "La plaza invita a quedarse." },
    { "de": "Wir haben auf dem Platz einen Kaffee getrunken.", "es": "Hemos bebido un caf\u00E9 en la plaza." },
    { "de": "Ist der Markt auf diesem Platz?", "es": "\u00BFEst\u00E1 el mercado en esta plaza?" }
  ],
  "Blut": [
    { "de": "Das Blut ist rot.", "es": "La sangre es roja." },
    { "de": "Die K\u00F6chin hat sich in den Finger geschnitten und Blut kam.", "es": "La cocinera se ha cortado el dedo y ha salido sangre." },
    { "de": "Hast du schon Blut gespendet?", "es": "\u00BFHas donado sangre ya?" }
  ],
  "die Marmelade": [
    { "de": "Die Marmelade ist selbst gemacht.", "es": "La mermelada es casera." },
    { "de": "Zum Fr\u00FChst\u00FCck habe ich Marmelade aufs Br\u00F6tchen gestrichen.", "es": "Para el desayuno he untado mermelada en el panecillo." },
    { "de": "Magst du Erdbeermarmelade?", "es": "\u00BFTe gusta la mermelada de fresa?" }
  ],
  "Bahnhof": [
    { "de": "Der Bahnhof ist gro\u00DF und modern.", "es": "La estaci\u00F3n es grande y moderna." },
    { "de": "Wir sind zum Bahnhof gerannt.", "es": "Hemos corrido a la estaci\u00F3n." },
    { "de": "Wei\u00DFt du, wo der Bahnhof ist?", "es": "\u00BFSabes d\u00F3nde est\u00E1 la estaci\u00F3n?" }
  ],
  "Flughafen": [
    { "de": "Der Flughafen ist weit drau\u00DFen.", "es": "El aeropuerto est\u00E1 lejos, a las afueras." },
    { "de": "Wir haben den Flughafen rechtzeitig erreicht.", "es": "Hemos llegado a tiempo al aeropuerto." },
    { "de": "Fliegst du vom Flughafen M\u00FCnchen?", "es": "\u00BFSales desde el aeropuerto de M\u00FAnich?" }
  ],
  "Lockenstab": [
    { "de": "Der Lockenstab ist zu hei\u00DF.", "es": "El rizador est\u00E1 demasiado caliente." },
    { "de": "Sie hat sich mit dem Lockenstab Locken gemacht.", "es": "Ella se ha hecho rizos con el rizador." },
    { "de": "Benutzt du den Lockenstab jeden Tag?", "es": "\u00BFUsas el rizador todos los d\u00EDas?" }
  ],
  "die Ente": [
    { "de": "Die Ente schwimmt auf dem See.", "es": "El pato nada en el lago." },
    { "de": "Wir haben die Ente mit Brot gef\u00FCttert.", "es": "Hemos dado pan al pato." },
    { "de": "Siehst du die Ente mit den K\u00FCken?", "es": "\u00BFVes el pato con sus patitos?" }
  ],
  "Aufenthaltstitel": [
    { "de": "Der Aufenthaltstitel ist zwei Jahre g\u00FCltig.", "es": "El permiso de residencia es v\u00E1lido por dos a\u00F1os." },
    { "de": "Er hat einen Aufenthaltstitel beantragt.", "es": "\u00C9l ha solicitado un permiso de residencia." },
    { "de": "Hast du deinen Aufenthaltstitel verl\u00E4ngern lassen?", "es": "\u00BFHas renovado tu permiso de residencia?" }
  ],
  "gelten": [
    { "de": "Dieses Ticket gilt nur f\u00FCr eine Fahrt.", "es": "Este billete solo vale para un viaje." },
    { "de": "Das alte Gesetz hat nicht mehr gegolten.", "es": "La vieja ley ya no ha tenido validez." },
    { "de": "Gilt das Angebot auch am Samstag?", "es": "\u00BFLa oferta tambi\u00E9n es v\u00E1lida el s\u00E1bado?" }
  ],
  "Krankschreibung": [
    { "de": "Die Krankschreibung liegt beim Arbeitgeber.", "es": "La baja m\u00E9dica est\u00E1 en poder del empleador." },
    { "de": "Der Arzt hat mir eine Krankschreibung ausgestellt.", "es": "El m\u00E9dico me ha extendido una baja m\u00E9dica." },
    { "de": "Hast du deine Krankschreibung eingereicht?", "es": "\u00BFHas entregado tu baja m\u00E9dica?" }
  ],
  "Wand": [
    { "de": "Die Wand ist frisch gestrichen.", "es": "La pared est\u00E1 reci\u00E9n pintada." },
    { "de": "Wir haben ein Bild an die Wand geh\u00E4ngt.", "es": "Hemos colgado un cuadro en la pared." },
    { "de": "Welche Farbe hat deine Wand?", "es": "\u00BFDe qu\u00E9 color es tu pared?" }
  ],
  "Boden": [
    { "de": "Der Boden ist aus Holz.", "es": "El suelo es de madera." },
    { "de": "Das Kind hat Milch auf den Boden versch\u00FCttet.", "es": "El ni\u00F1o ha derramado leche al suelo." },
    { "de": "Wischst du den Boden mit kaltem Wasser?", "es": "\u00BFLimpias el suelo con agua fr\u00EDa?" }
  ],
  "Moment": [
    { "de": "Der Moment war magisch.", "es": "El momento fue m\u00E1gico." },
    { "de": "Ich habe den perfekten Moment verpasst.", "es": "He perdido el momento perfecto." },
    { "de": "Kannst du einen Moment warten?", "es": "\u00BFPuedes esperar un momento?" }
  ],
  "zeigen": [
    { "de": "Ich muss dir etwas zeigen.", "es": "Tengo que mostrarte algo." },
    { "de": "Er hat mir seinen Ausweis gezeigt.", "es": "\u00C9l me ha mostrado su carnet." },
    { "de": "Zeigst du mir den Weg?", "es": "\u00BFMe muestras el camino?" }
  ],
  "Abmachung": [
    { "de": "Die Abmachung ist m\u00FCndlich.", "es": "El acuerdo es verbal." },
    { "de": "Wir haben eine klare Abmachung getroffen.", "es": "Hemos llegado a un acuerdo claro." },
    { "de": "Hast du die Abmachung eingehalten?", "es": "\u00BFHas cumplido el acuerdo?" }
  ],
  "Sekret\u00E4rin": [
    { "de": "Die Sekret\u00E4rin ist sehr organisiert.", "es": "La secretaria es muy organizada." },
    { "de": "Ich habe die Sekret\u00E4rin um einen Termin gebeten.", "es": "He pedido una cita a la secretaria." },
    { "de": "Arbeitet die Sekret\u00E4rin im Vorzimmer?", "es": "\u00BFTrabaja la secretaria en la antesala?" }
  ],
  "abschlie\u00DFen": [
    { "de": "Du musst das Projekt abschlie\u00DFen.", "es": "Tienes que completar el proyecto." },
    { "de": "Sie hat ihre Ausbildung erfolgreich abgeschlossen.", "es": "Ella ha completado su formaci\u00F3n con \u00E9xito." },
    { "de": "Schlie\u00DFt du den Vertrag morgen ab?", "es": "\u00BFCierras el contrato ma\u00F1ana?" }
  ],
  "Kaubonbon": [
    { "de": "Das Kaubonbon schmeckt nach Kirsche.", "es": "El caramelo masticable sabe a cereza." },
    { "de": "Das Kind hat ein Kaubonbon gelutscht.", "es": "El ni\u00F1o ha chupado un caramelo masticable." },
    { "de": "Magst du Kaubonbons mit Zitrone?", "es": "\u00BFTe gustan los caramelos masticables de lim\u00F3n?" }
  ],
  "Blutabnahme": [
    { "de": "Die Blutabnahme war schnell erledigt.", "es": "La extracci\u00F3n de sangre fue r\u00E1pida." },
    { "de": "Der Arzt hat eine Blutabnahme gemacht.", "es": "El m\u00E9dico ha realizado una extracci\u00F3n de sangre." },
    { "de": "Musst du zur Blutabnahme n\u00FCchtern sein?", "es": "\u00BFTienes que estar en ayunas para la extracci\u00F3n de sangre?" }
  ],
  "kaputtmachen": [
    { "de": "Du darfst mein Spielzeug nicht kaputtmachen.", "es": "No debes estropear mi juguete." },
    { "de": "Der Sturm hat den Zaun kaputtgemacht.", "es": "La tormenta ha estropeado la valla." },
    { "de": "Hast du den Fernseher kaputtgemacht?", "es": "\u00BFHas estropeado el televisor?" }
  ],
  "der Anzug": [
    { "de": "Der Anzug sitzt perfekt.", "es": "El traje sienta perfecto." },
    { "de": "Ich habe den Anzug zur Hochzeit getragen.", "es": "He llevado el traje para la boda." },
    { "de": "Hast du einen schwarzen Anzug?", "es": "\u00BFTienes un traje negro?" }
  ],
  "Korken": [
    { "de": "Der Korken steckt fest im Flaschenhals.", "es": "El corcho est\u00E1 atascado en el cuello de la botella." },
    { "de": "Papa hat den Korken mit einem Korkenzieher gezogen.", "es": "Pap\u00E1 ha sacado el corcho con un sacacorchos." },
    { "de": "Kannst du den Korken aufheben?", "es": "\u00BFPuedes recoger el corcho?" }
  ],
  "der Wald": [
    { "de": "Der Wald ist voller Geheimnisse.", "es": "El bosque est\u00E1 lleno de secretos." },
    { "de": "Wir haben Pilze im Wald gesammelt.", "es": "Hemos recogido setas en el bosque." },
    { "de": "Gehst du oft in den Wald?", "es": "\u00BFVas a menudo al bosque?" }
  ],
  "Luftballon": [
    { "de": "Der Luftballon ist rot.", "es": "El globo es rojo." },
    { "de": "Das Kind hat den Luftballon steigen lassen.", "es": "El ni\u00F1o ha soltado el globo." },
    { "de": "Pustest du den Luftballon auf?", "es": "\u00BFHinchas el globo?" }
  ],
  "Wirbels\u00E4ule": [
    { "de": "Die Wirbels\u00E4ule st\u00FCtzt den K\u00F6rper.", "es": "La columna vertebral sostiene el cuerpo." },
    { "de": "Ich habe mir die Wirbels\u00E4ule verletzt.", "es": "Me he lesionado la columna." },
    { "de": "Tut deine Wirbels\u00E4ule weh?", "es": "\u00BFTe duele la columna?" }
  ],
  "H\u00FCfte": [
    { "de": "Meine H\u00FCfte ist steif.", "es": "Mi cadera est\u00E1 r\u00EDgida." },
    { "de": "Oma hat sich die H\u00FCfte gebrochen.", "es": "La abuela se ha roto la cadera." },
    { "de": "Bewegst du deine H\u00FCfte beim Tanzen?", "es": "\u00BFMueves la cadera al bailar?" }
  ],
  "die Zahnpasta": [
    { "de": "Die Zahnpasta ist minzig.", "es": "La pasta de dientes sabe a menta." },
    { "de": "Ich habe die Zahnpasta im Drogeriemarkt gekauft.", "es": "He comprado la pasta de dientes en la droguer\u00EDa." },
    { "de": "Benutzt du Zahnpasta mit Fluorid?", "es": "\u00BFUsas pasta de dientes con fl\u00FAor?" }
  ],
  "die Elf": [
    { "de": "Die Elf ist eine Fu\u00DFballmannschaft.", "es": "El once es un equipo de f\u00FAtbol." },
    { "de": "Die Elf hat das Spiel gewonnen.", "es": "El once ha ganado el partido." },
    { "de": "Spielst du in der ersten Elf?", "es": "\u00BFJuegas en el once titular?" }
  ],
  "Flyer": [
    { "de": "Der Flyer ist bunt bedruckt.", "es": "El panfleto est\u00E1 impreso en colores." },
    { "de": "Ich habe Flyer f\u00FCr das Konzert verteilt.", "es": "He repartido panfletos para el concierto." },
    { "de": "Hast du den Flyer schon gelesen?", "es": "\u00BFHas le\u00EDdo ya el panfleto?" }
  ],
  "Dativ": [
    { "de": "Der Dativ ist der dritte Fall.", "es": "El dativo es el tercer caso." },
    { "de": "Im Deutschunterricht haben wir den Dativ ge\u00FCbt.", "es": "En clase de alem\u00E1n hemos practicado el dativo." },
    { "de": "Benutzt du den Dativ richtig?", "es": "\u00BFUsas el dativo correctamente?" }
  ],
  "ohne": [
    { "de": "Ohne dich macht es keinen Spa\u00DF.", "es": "Sin ti no tiene gracia." },
    { "de": "Er ist ohne Regenschirm aus dem Haus gegangen.", "es": "\u00C9l ha salido de casa sin paraguas." },
    { "de": "Kannst du ohne Kaffee nicht arbeiten?", "es": "\u00BFNo puedes trabajar sin caf\u00E9?" }
  ],
  "Stuhl": [
    { "de": "Der Stuhl wackelt.", "es": "La silla cojea." },
    { "de": "Oma hat den Stuhl ans Fenster gestellt.", "es": "La abuela ha puesto la silla junto a la ventana." },
    { "de": "Hast du den Stuhl repariert?", "es": "\u00BFHas reparado la silla?" }
  ],
  "Klo": [
    { "de": "Das Klo ist besetzt.", "es": "El retrete est\u00E1 ocupado." },
    { "de": "Ich muss dringend aufs Klo.", "es": "Tengo que ir urgentemente al ba\u00F1o." },
    { "de": "Hast du das Klo geputzt?", "es": "\u00BFHas limpiado el retrete?" }
  ],
  "wegwerfen": [
    { "de": "Du sollst alte Batterien nicht einfach wegwerfen.", "es": "No debes tirar las pilas viejas sin m\u00E1s." },
    { "de": "Er hat den M\u00FCll in den Eimer geworfen.", "es": "\u00C9l ha tirado la basura al cubo." },
    { "de": "Wirfst du die Zeitung von gestern weg?", "es": "\u00BFTiras el peri\u00F3dico de ayer?" }
  ],
  "die Krawatte": [
    { "de": "Die Krawatte ist aus Seide.", "es": "La corbata es de seda." },
    { "de": "Papa hat eine rote Krawatte umgebunden.", "es": "Pap\u00E1 se ha puesto una corbata roja." },
    { "de": "Tr\u00E4gst du zur Arbeit eine Krawatte?", "es": "\u00BFLlevas corbata al trabajo?" }
  ],
  "Schloss": [
    { "de": "Das Schloss ist aus Eisen.", "es": "El castillo es de hierro." },
    { "de": "Wir haben ein altes Schloss besichtigt.", "es": "Hemos visitado un castillo antiguo." },
    { "de": "Kannst du das Schloss mit dem Schl\u00FCssel \u00F6ffnen?", "es": "\u00BFPuedes abrir la cerradura con la llave?" }
  ],
  "vergeben": [
    { "de": "Du musst deinem Bruder vergeben.", "es": "Tienes que perdonar a tu hermano." },
    { "de": "Sie hat ihm seinen Fehler vergeben.", "es": "Ella le ha perdonado su error." },
    { "de": "Vergibst du mir?", "es": "\u00BFMe perdonas?" }
  ],
  "Zitrone": [
    { "de": "Die Zitrone ist gelb.", "es": "El lim\u00F3n es amarillo." },
    { "de": "Ich habe eine Zitrone \u00FCber den Fisch gepresst.", "es": "He exprimido un lim\u00F3n sobre el pescado." },
    { "de": "Kaufst du Zitronen auf dem Markt?", "es": "\u00BFCompras limones en el mercado?" }
  ],
  "kehren": [
    { "de": "Ich muss den Hof kehren.", "es": "Tengo que barrer el patio." },
    { "de": "Der Hausmeister hat das Treppenhaus gekehrt.", "es": "El portero ha barrido la escalera." },
    { "de": "Kehrst du jeden Tag die K\u00FCche?", "es": "\u00BFBarres la cocina todos los d\u00EDas?" }
  ],
  "der Mittag": [
    { "de": "Der Mittag ist sonnig.", "es": "El mediod\u00EDa es soleado." },
    { "de": "Um Mittag habe ich Hunger.", "es": "Al mediod\u00EDa tengo hambre." },
    { "de": "Was isst du am Mittag?", "es": "\u00BFQu\u00E9 comes al mediod\u00EDa?" }
  ],
  "die Ferien": [
    { "de": "Die Ferien sind viel zu kurz.", "es": "Las vacaciones son demasiado cortas." },
    { "de": "Wir haben die Ferien am Meer verbracht.", "es": "Hemos pasado las vacaciones en el mar." },
    { "de": "Wann fangen deine Ferien an?", "es": "\u00BFCu\u00E1ndo empiezan tus vacaciones?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block16 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 16 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);