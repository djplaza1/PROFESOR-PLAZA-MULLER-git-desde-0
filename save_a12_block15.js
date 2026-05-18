const fs = require("fs");

// Cargar archivo existente (bloques 1-14)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 15: palabras 701 a 750
const block15 = {
  "Stille": [
    { "de": "Die Stille im Wald ist wunderbar.", "es": "El silencio en el bosque es maravilloso." },
    { "de": "Nach dem lauten Konzert habe ich die Stille genossen.", "es": "Despu\u00E9s del ruidoso concierto he disfrutado del silencio." },
    { "de": "Kannst du die Stille ertragen?", "es": "\u00BFPuedes soportar el silencio?" }
  ],
  "Kinn": [
    { "de": "Das Kinn des Babys ist weich.", "es": "La barbilla del beb\u00E9 es blanda." },
    { "de": "Er hat sich das Kinn beim Rasieren geschnitten.", "es": "\u00C9l se ha cortado la barbilla al afeitarse." },
    { "de": "Tut dein Kinn weh?", "es": "\u00BFTe duele la barbilla?" }
  ],
  "der Staubsauger": [
    { "de": "Der Staubsauger ist sehr leise.", "es": "La aspiradora es muy silenciosa." },
    { "de": "Ich habe den Staubsauger im Angebot gekauft.", "es": "He comprado la aspiradora en oferta." },
    { "de": "Kannst du den Staubsauger holen?", "es": "\u00BFPuedes traer la aspiradora?" }
  ],
  "telefonieren": [
    { "de": "Ich muss noch mit Oma telefonieren.", "es": "Todav\u00EDa tengo que telefonear a la abuela." },
    { "de": "Er hat den ganzen Abend telefoniert.", "es": "\u00C9l ha telefoneado toda la tarde." },
    { "de": "Telefonierst du gern mit deinen Freunden?", "es": "\u00BFTe gusta telefonear con tus amigos?" }
  ],
  "Wassermelone": [
    { "de": "Die Wassermelone ist riesig.", "es": "La sand\u00EDa es enorme." },
    { "de": "Wir haben die Wassermelone in St\u00FCcke geschnitten.", "es": "Hemos cortado la sand\u00EDa en trozos." },
    { "de": "Kaufst du die Wassermelone auf dem Markt?", "es": "\u00BFCompras la sand\u00EDa en el mercado?" }
  ],
  "die Socke": [
    { "de": "Die Socke ist l\u00F6chrig.", "es": "El calcet\u00EDn est\u00E1 agujereado." },
    { "de": "Ich habe die Socken in die Waschmaschine gesteckt.", "es": "He metido los calcetines en la lavadora." },
    { "de": "Suchst du eine bestimmte Socke?", "es": "\u00BFBuscas un calcet\u00EDn concreto?" }
  ],
  "die Flasche": [
    { "de": "Die Flasche ist aus Glas.", "es": "La botella es de vidrio." },
    { "de": "Er hat die Flasche mit Wasser gef\u00FCllt.", "es": "\u00C9l ha llenado la botella con agua." },
    { "de": "Kannst du die Flasche zur\u00FCckbringen?", "es": "\u00BFPuedes devolver la botella?" }
  ],
  "frei": [
    { "de": "Der Eintritt ist heute frei.", "es": "La entrada es libre hoy." },
    { "de": "Nach der K\u00FCndigung habe ich mich frei gef\u00FChlt.", "es": "Despu\u00E9s del despido me he sentido libre." },
    { "de": "Bist du am Wochenende frei?", "es": "\u00BFEst\u00E1s libre el fin de semana?" }
  ],
  "Wohnung": [
    { "de": "Die Wohnung ist hell und gro\u00DF.", "es": "El apartamento es luminoso y grande." },
    { "de": "Wir haben die Wohnung letztes Jahr gekauft.", "es": "Compramos el apartamento el a\u00F1o pasado." },
    { "de": "Gef\u00E4llt dir deine neue Wohnung?", "es": "\u00BFTe gusta tu apartamento nuevo?" }
  ],
  "Garten": [
    { "de": "Der Garten bl\u00FCht im Fr\u00FChling.", "es": "El jard\u00EDn florece en primavera." },
    { "de": "Opa hat im Garten Tomaten gepflanzt.", "es": "El abuelo ha plantado tomates en el jard\u00EDn." },
    { "de": "Arbeitest du gern im Garten?", "es": "\u00BFTe gusta trabajar en el jard\u00EDn?" }
  ],
  "reisen": [
    { "de": "Wir wollen n\u00E4chstes Jahr reisen.", "es": "Queremos viajar el a\u00F1o que viene." },
    { "de": "Sie sind durch ganz Europa gereist.", "es": "Ellos han viajado por toda Europa." },
    { "de": "Reist du gern mit dem Zug?", "es": "\u00BFTe gusta viajar en tren?" }
  ],
  "wandern": [
    { "de": "Die Wege im Nationalpark sind ideal zum Wandern.", "es": "Los caminos del parque nacional son ideales para hacer senderismo." },
    { "de": "Am Sonntag sind wir auf den Berg gewandert.", "es": "El domingo hemos hecho senderismo hasta la monta\u00F1a." },
    { "de": "Wanderst du lieber im Wald oder am Fluss?", "es": "\u00BFPrefieres hacer senderismo en el bosque o junto al r\u00EDo?" }
  ],
  "Wurzel": [
    { "de": "Die Wurzel des Baumes ist dick.", "es": "La ra\u00EDz del \u00E1rbol es gruesa." },
    { "de": "Der Sturm hat die Wurzel freigelegt.", "es": "La tormenta ha dejado al descubierto la ra\u00EDz." },
    { "de": "Siehst du die Wurzel unter dem Stein?", "es": "\u00BFVes la ra\u00EDz debajo de la piedra?" }
  ],
  "Erdbeere": [
    { "de": "Die Erdbeere schmeckt s\u00FC\u00DF.", "es": "La fresa sabe dulce." },
    { "de": "Wir haben Erdbeeren mit Sahne gegessen.", "es": "Hemos comido fresas con nata." },
    { "de": "Pfl\u00FCckst du die Erdbeeren selbst?", "es": "\u00BFRecoges las fresas t\u00FA mismo?" }
  ],
  "falten": [
    { "de": "Ich muss die W\u00E4sche falten.", "es": "Tengo que doblar la ropa." },
    { "de": "Er hat die Hemden ordentlich gefaltet.", "es": "\u00C9l ha doblado las camisas ordenadamente." },
    { "de": "Faltest du die Servietten f\u00FCr das Fest?", "es": "\u00BFDoblas las servilletas para la fiesta?" }
  ],
  "m\u00E4hen": [
    { "de": "Der Rasen muss dringend gem\u00E4ht werden.", "es": "El c\u00E9sped tiene que segarse urgentemente." },
    { "de": "Papa hat gestern den Garten gem\u00E4ht.", "es": "Pap\u00E1 ha segado el jard\u00EDn ayer." },
    { "de": "M\u00E4hst du den Rasen am Samstag?", "es": "\u00BFSiegas el c\u00E9sped el s\u00E1bado?" }
  ],
  "der Backofen": [
    { "de": "Der Backofen ist noch hei\u00DF.", "es": "El horno est\u00E1 a\u00FAn caliente." },
    { "de": "Ich habe den Kuchen im Backofen gebacken.", "es": "He horneado la tarta en el horno." },
    { "de": "Stellst du den Backofen auf 180 Grad?", "es": "\u00BFPones el horno a 180 grados?" }
  ],
  "das Schaf": [
    { "de": "Das Schaf hat ein dickes Fell.", "es": "La oveja tiene un pelaje espeso." },
    { "de": "Der Sch\u00E4fer hat die Schafe auf die Weide gef\u00FChrt.", "es": "El pastor ha llevado las ovejas al pasto." },
    { "de": "Hast du schon ein Schaf gestreichelt?", "es": "\u00BFHas acariciado ya una oveja?" }
  ],
  "Eimer": [
    { "de": "Der Eimer ist voller \u00C4pfel.", "es": "El cubo est\u00E1 lleno de manzanas." },
    { "de": "Ich habe Wasser mit dem Eimer geholt.", "es": "He tra\u00EDdo agua con el cubo." },
    { "de": "Kannst du den Eimer ausleeren?", "es": "\u00BFPuedes vaciar el cubo?" }
  ],
  "Wegrand": [
    { "de": "Am Wegrand wachsen bunte Blumen.", "es": "En el borde del camino crecen flores de colores." },
    { "de": "Wir haben am Wegrand eine Pause gemacht.", "es": "Hemos hecho una pausa en el borde del camino." },
    { "de": "Siehst du die Pilze am Wegrand?", "es": "\u00BFVes las setas en el borde del camino?" }
  ],
  "die Wanderung": [
    { "de": "Die Wanderung war anstrengend.", "es": "La caminata fue agotadora." },
    { "de": "Wir haben eine Wanderung durch den Wald gemacht.", "es": "Hemos hecho una caminata por el bosque." },
    { "de": "Machst du bei der Wanderung mit?", "es": "\u00BFParticipas en la caminata?" }
  ],
  "Foto": [
    { "de": "Das Foto ist unscharf.", "es": "La foto est\u00E1 borrosa." },
    { "de": "Ich habe ein Foto von der Familie gemacht.", "es": "He hecho una foto de la familia." },
    { "de": "Zeigst du mir das Foto?", "es": "\u00BFMe ense\u00F1as la foto?" }
  ],
  "Socke": [
    { "de": "Meine Socke ist nass.", "es": "Mi calcet\u00EDn est\u00E1 mojado." },
    { "de": "Ich habe die Socken im Keller aufgeh\u00E4ngt.", "es": "He colgado los calcetines en el s\u00F3tano." },
    { "de": "Passt diese Socke zu deiner Hose?", "es": "\u00BFCombina este calcet\u00EDn con tu pantal\u00F3n?" }
  ],
  "Dame": [
    { "de": "Die Dame an der Kasse ist h\u00F6flich.", "es": "La se\u00F1ora de la caja es educada." },
    { "de": "Ich habe der Dame meinen Platz angeboten.", "es": "He ofrecido mi asiento a la se\u00F1ora." },
    { "de": "Kennst du die Dame mit dem roten Hut?", "es": "\u00BFConoces a la se\u00F1ora del sombrero rojo?" }
  ],
  "das Picknick": [
    { "de": "Das Picknick im Park war sch\u00F6n.", "es": "El p\u00EDcnic en el parque fue bonito." },
    { "de": "Wir haben ein Picknick mit K\u00E4se und Brot gemacht.", "es": "Hemos hecho un p\u00EDcnic con queso y pan." },
    { "de": "Bringst du eine Decke zum Picknick mit?", "es": "\u00BFLlevas una manta al p\u00EDcnic?" }
  ],
  "Butter": [
    { "de": "Die Butter ist im K\u00FChlschrank.", "es": "La mantequilla est\u00E1 en la nevera." },
    { "de": "Oma hat Butter aufs Brot gestrichen.", "es": "La abuela ha untado mantequilla en el pan." },
    { "de": "Nimmst du Butter oder Margarine?", "es": "\u00BFTomas mantequilla o margarina?" }
  ],
  "Wurst": [
    { "de": "Die Wurst riecht nach Knoblauch.", "es": "El embutido huele a ajo." },
    { "de": "Er hat die Wurst in Scheiben geschnitten.", "es": "\u00C9l ha cortado el embutido en lonchas." },
    { "de": "Magst du Wurst auf dem Brot?", "es": "\u00BFTe gusta el embutido sobre el pan?" }
  ],
  "stricken": [
    { "de": "Meine Oma kann wundersch\u00F6n stricken.", "es": "Mi abuela sabe tejer maravillosamente." },
    { "de": "Sie hat mir einen Schal gestrickt.", "es": "Ella me ha tejido una bufanda." },
    { "de": "Strickst du lieber Pullover oder Socken?", "es": "\u00BFPrefieres tejer jers\u00E9is o calcetines?" }
  ],
  "Zeh": [
    { "de": "Mein gro\u00DFer Zeh tut weh.", "es": "Mi dedo gordo del pie me duele." },
    { "de": "Ich habe mir den Zeh am Tisch gesto\u00DFen.", "es": "Me he golpeado el dedo del pie con la mesa." },
    { "de": "Hast du dir den Zeh gebrochen?", "es": "\u00BFTe has roto el dedo del pie?" }
  ],
  "Elternzeit": [
    { "de": "Die Elternzeit dauert ein Jahr.", "es": "El permiso parental dura un a\u00F1o." },
    { "de": "Er hat Elternzeit f\u00FCr die Zwillinge genommen.", "es": "\u00C9l ha tomado el permiso parental para los gemelos." },
    { "de": "Beantragst du Elternzeit?", "es": "\u00BFSolicitas el permiso parental?" }
  ],
  "tragen": [
    { "de": "Ich muss heute einen Anzug tragen.", "es": "Hoy tengo que llevar puesto un traje." },
    { "de": "Sie hat ein blaues Kleid getragen.", "es": "Ella ha llevado un vestido azul." },
    { "de": "Tr\u00E4gst du gern Jeans?", "es": "\u00BFTe gusta llevar vaqueros?" }
  ],
  "passen": [
    { "de": "Die Schuhe passen perfekt.", "es": "Los zapatos quedan perfectos." },
    { "de": "Der Hut hat nicht zu meinem Mantel gepasst.", "es": "El sombrero no ha quedado bien con mi abrigo." },
    { "de": "Passt dir die Jacke?", "es": "\u00BFTe queda bien la chaqueta?" }
  ],
  "die Nudeln": [
    { "de": "Die Nudeln sind noch hart.", "es": "La pasta est\u00E1 a\u00FAn dura." },
    { "de": "Mama hat die Nudeln mit Tomatenso\u00DFe serviert.", "es": "Mam\u00E1 ha servido la pasta con salsa de tomate." },
    { "de": "Kochst du die Nudeln al dente?", "es": "\u00BFCueces la pasta al dente?" }
  ],
  "Zahnstocher": [
    { "de": "Der Zahnstocher ist aus Holz.", "es": "El palillo es de madera." },
    { "de": "Nach dem Essen habe ich einen Zahnstocher benutzt.", "es": "Despu\u00E9s de comer he usado un palillo." },
    { "de": "Hast du einen Zahnstocher f\u00FCr mich?", "es": "\u00BFTienes un palillo para m\u00ED?" }
  ],
  "Pinguin": [
    { "de": "Der Pinguin watschelt lustig.", "es": "El ping\u00FCino se contonea de manera graciosa." },
    { "de": "Im Zoo haben wir die Pinguine gef\u00FCttert.", "es": "En el zoo hemos dado de comer a los ping\u00FCinos." },
    { "de": "Hast du schon einen Pinguin im Schnee gesehen?", "es": "\u00BFHas visto ya un ping\u00FCino en la nieve?" }
  ],
  "Bestellung": [
    { "de": "Die Bestellung kommt morgen an.", "es": "El pedido llega ma\u00F1ana." },
    { "de": "Ich habe die Bestellung online aufgegeben.", "es": "He hecho el pedido en l\u00EDnea." },
    { "de": "Hast du deine Bestellung schon erhalten?", "es": "\u00BFYa has recibido tu pedido?" }
  ],
  "aufh\u00F6ren": [
    { "de": "Du musst mit dem Rauchen aufh\u00F6ren.", "es": "Tienes que dejar de fumar." },
    { "de": "Der Regen hat endlich aufgeh\u00F6rt.", "es": "La lluvia por fin ha parado." },
    { "de": "H\u00F6rst du bitte mit dem Krach auf?", "es": "\u00BFPuedes parar con el esc\u00E1ndalo, por favor?" }
  ],
  "warten": [
    { "de": "Ich muss auf den Bus warten.", "es": "Tengo que esperar el autob\u00FAs." },
    { "de": "Er hat eine Stunde auf mich gewartet.", "es": "\u00C9l ha esperado una hora por m\u00ED." },
    { "de": "Wartest du schon lange?", "es": "\u00BFLlevas esperando mucho tiempo?" }
  ],
  "Sommer": [
    { "de": "Der Sommer ist meine liebste Jahreszeit.", "es": "El verano es mi estaci\u00F3n favorita." },
    { "de": "Letzten Sommer sind wir nach Italien gefahren.", "es": "El verano pasado fuimos a Italia." },
    { "de": "Verbringst du den Sommer am Meer?", "es": "\u00BFPasas el verano en la costa?" }
  ],
  "Herbst": [
    { "de": "Der Herbst ist wundersch\u00F6n bunt.", "es": "El oto\u00F1o es de un colorido maravilloso." },
    { "de": "Im Herbst haben wir Drachen steigen lassen.", "es": "En oto\u00F1o hemos hecho volar cometas." },
    { "de": "Magst du Spazierg\u00E4nge im Herbst?", "es": "\u00BFTe gustan los paseos en oto\u00F1o?" }
  ],
  "trotz": [
    { "de": "Trotz des Regens gehen wir spazieren.", "es": "A pesar de la lluvia salimos a pasear." },
    { "de": "Er hat den Marathon trotz Verletzung beendet.", "es": "\u00C9l ha terminado el marat\u00F3n a pesar de la lesi\u00F3n." },
    { "de": "Kommst du trotz der K\u00E4lte mit?", "es": "\u00BFVienes a pesar del fr\u00EDo?" }
  ],
  "die Fahrkarte": [
    { "de": "Die Fahrkarte ist f\u00FCr eine Woche g\u00FCltig.", "es": "El billete es v\u00E1lido para una semana." },
    { "de": "Ich habe die Fahrkarte am Automaten gel\u00F6st.", "es": "He sacado el billete en la m\u00E1quina." },
    { "de": "Kannst du mir eine Fahrkarte kaufen?", "es": "\u00BFPuedes comprarme un billete?" }
  ],
  "die Brille": [
    { "de": "Die Brille sitzt schief.", "es": "Las gafas est\u00E1n torcidas." },
    { "de": "Ich habe die Brille beim Optiker bestellt.", "es": "He pedido las gafas en la \u00F3ptica." },
    { "de": "Tr\u00E4gst du deine Brille den ganzen Tag?", "es": "\u00BFLlevas puestas las gafas todo el d\u00EDa?" }
  ],
  "Mittwoch": [
    { "de": "Mittwoch ist Markttag.", "es": "El mi\u00E9rcoles es d\u00EDa de mercado." },
    { "de": "Am Mittwoch habe ich ein wichtiges Meeting.", "es": "El mi\u00E9rcoles tengo una reuni\u00F3n importante." },
    { "de": "Hast du am Mittwoch Zeit?", "es": "\u00BFTienes tiempo el mi\u00E9rcoles?" }
  ],
  "Donnerstag": [
    { "de": "Der Donnerstag ist fast das Wochenende.", "es": "El jueves es casi el fin de semana." },
    { "de": "Wir haben am Donnerstag ein Fest gefeiert.", "es": "El jueves hemos celebrado una fiesta." },
    { "de": "Gehst du am Donnerstag einkaufen?", "es": "\u00BFVas de compras el jueves?" }
  ],
  "verkaufen": [
    { "de": "Der Bauer will seine Kartoffeln verkaufen.", "es": "El agricultor quiere vender sus patatas." },
    { "de": "Sie hat ihr altes Auto verkauft.", "es": "Ella ha vendido su coche viejo." },
    { "de": "Verkaufst du deine alten M\u00F6bel?", "es": "\u00BFVendes tus muebles viejos?" }
  ],
  "\u00F6ffnen": [
    { "de": "Kannst du das Fenster \u00F6ffnen?", "es": "\u00BFPuedes abrir la ventana?" },
    { "de": "Der B\u00E4cker hat den Laden ge\u00F6ffnet.", "es": "El panadero ha abierto la tienda." },
    { "de": "\u00D6ffnest du die Dose mit der Hand?", "es": "\u00BFAbres la lata con la mano?" }
  ],
  "Kinderarzt": [
    { "de": "Der Kinderarzt ist sehr nett.", "es": "El pediatra es muy amable." },
    { "de": "Ich habe einen Termin beim Kinderarzt gemacht.", "es": "He pedido cita con el pediatra." },
    { "de": "Gehst du mit dem Baby zum Kinderarzt?", "es": "\u00BFVas con el beb\u00E9 al pediatra?" }
  ],
  "feiern": [
    { "de": "Wir wollen deinen Geburtstag feiern.", "es": "Queremos celebrar tu cumplea\u00F1os." },
    { "de": "Sie haben bis Mitternacht gefeiert.", "es": "Han celebrado hasta medianoche." },
    { "de": "Feierst du Weihnachten im Familienkreis?", "es": "\u00BFCelebras la Navidad en familia?" }
  ],
  "backen": [
    { "de": "Ich will einen Apfelkuchen backen.", "es": "Quiero hornear una tarta de manzana." },
    { "de": "Oma hat gestern Pl\u00E4tzchen gebacken.", "es": "La abuela horne\u00F3 ayer galletas." },
    { "de": "Backst du das Brot selbst?", "es": "\u00BFHorneas el pan t\u00FA mismo?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block15 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 15 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);