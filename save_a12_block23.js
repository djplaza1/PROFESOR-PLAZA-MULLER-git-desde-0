const fs = require("fs");

// Cargar archivo existente (bloques 1-22)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 23: palabras 1101 a 1150
const block23 = {
  "malen": [
    { "de": "Mein Sohn kann sehr sch\u00F6n malen.", "es": "Mi hijo sabe pintar muy bonito." },
    { "de": "Gestern hat er ein Bild mit Wasserfarben gemalt.", "es": "Ayer \u00E9l ha pintado un cuadro con acuarelas." },
    { "de": "Malst du lieber Landschaften oder Portr\u00E4ts?", "es": "\u00BFPrefieres pintar paisajes o retratos?" }
  ],
  "zeigen": [
    { "de": "Ich muss dir etwas Wichtiges zeigen.", "es": "Tengo que mostrarte algo importante." },
    { "de": "Der Lehrer hat uns den neuen Film gezeigt.", "es": "El profesor nos ha mostrado la nueva pel\u00EDcula." },
    { "de": "Zeigst du mir den Weg zum Bahnhof?", "es": "\u00BFMe muestras el camino a la estaci\u00F3n?" }
  ],
  "Wohnzimmer": [
    { "de": "Das Wohnzimmer ist sehr gem\u00FCtlich.", "es": "El sal\u00F3n es muy acogedor." },
    { "de": "Wir haben das Wohnzimmer gestern gestrichen.", "es": "Ayer hemos pintado el sal\u00F3n." },
    { "de": "Steht der Fernseher im Wohnzimmer?", "es": "\u00BFEst\u00E1 el televisor en el sal\u00F3n?" }
  ],
  "Tierarzt": [
    { "de": "Der Tierarzt ist sehr freundlich.", "es": "El veterinario es muy amable." },
    { "de": "Ich habe die Katze zum Tierarzt gebracht.", "es": "He llevado al gato al veterinario." },
    { "de": "Musst du mit deinem Hund zum Tierarzt?", "es": "\u00BFTienes que ir al veterinario con tu perro?" }
  ],
  "Schrank": [
    { "de": "Der Schrank ist aus Kiefernholz.", "es": "El armario es de madera de pino." },
    { "de": "Opa hat den Schrank selbst gebaut.", "es": "El abuelo ha construido el armario \u00E9l mismo." },
    { "de": "Kannst du den Schrank aufmachen?", "es": "\u00BFPuedes abrir el armario?" }
  ],
  "W\u00E4schetrockner": [
    { "de": "Der W\u00E4schetrockner ist kaputt.", "es": "La secadora est\u00E1 rota." },
    { "de": "Ich habe die Handt\u00FCcher in den W\u00E4schetrockner gelegt.", "es": "He puesto las toallas en la secadora." },
    { "de": "Benutzt du den W\u00E4schetrockner im Winter?", "es": "\u00BFUsas la secadora en invierno?" }
  ],
  "Spinne": [
    { "de": "Die Spinne hat acht Beine.", "es": "La ara\u00F1a tiene ocho patas." },
    { "de": "Ich habe eine dicke Spinne im Keller gefunden.", "es": "He encontrado una ara\u00F1a gorda en el s\u00F3tano." },
    { "de": "Hast du Angst vor Spinnen?", "es": "\u00BFTienes miedo a las ara\u00F1as?" }
  ],
  "der Hund": [
    { "de": "Der Hund ist der beste Freund des Menschen.", "es": "El perro es el mejor amigo del hombre." },
    { "de": "Wir haben den Hund aus dem Tierheim geholt.", "es": "Hemos adoptado al perro de la protectora." },
    { "de": "Gehst du zweimal am Tag mit dem Hund spazieren?", "es": "\u00BFPaseas al perro dos veces al d\u00EDa?" }
  ],
  "der Regen": [
    { "de": "Der Regen prasselt gegen das Fenster.", "es": "La lluvia golpetea contra la ventana." },
    { "de": "Gestern hat der Regen den ganzen Tag gedauert.", "es": "Ayer la lluvia ha durado todo el d\u00EDa." },
    { "de": "Magst du den Klang von Regen?", "es": "\u00BFTe gusta el sonido de la lluvia?" }
  ],
  "Hautarzt": [
    { "de": "Der Hautarzt hat meine Muttermale gepr\u00FCft.", "es": "El dermat\u00F3logo me ha revisado los lunares." },
    { "de": "Ich muss morgen zum Hautarzt.", "es": "Ma\u00F1ana tengo que ir al dermat\u00F3logo." },
    { "de": "Kennst du einen guten Hautarzt in der N\u00E4he?", "es": "\u00BFConoces un buen dermat\u00F3logo cerca?" }
  ],
  "Rasiermesser": [
    { "de": "Das Rasiermesser ist sehr scharf.", "es": "La cuchilla de afeitar est\u00E1 muy afilada." },
    { "de": "Opa hat sich fr\u00FCher mit einem Rasiermesser rasiert.", "es": "El abuelo antes se afeitaba con una cuchilla." },
    { "de": "Benutzt du ein Rasiermesser oder einen Rasierer?", "es": "\u00BFUsas cuchilla o maquinilla de afeitar?" }
  ],
  "Verschiebung": [
    { "de": "Die Verschiebung des Termins ist kein Problem.", "es": "El aplazamiento de la cita no es un problema." },
    { "de": "Der Chef hat eine Verschiebung des Meetings vorgeschlagen.", "es": "El jefe ha propuesto un aplazamiento de la reuni\u00F3n." },
    { "de": "Hast du die Verschiebung best\u00E4tigt?", "es": "\u00BFHas confirmado el aplazamiento?" }
  ],
  "die Ameise": [
    { "de": "Die Ameise tr\u00E4gt ein Blatt.", "es": "La hormiga lleva una hoja." },
    { "de": "Im Sommer sind viele Ameisen auf der Terrasse gewesen.", "es": "En verano ha habido muchas hormigas en la terraza." },
    { "de": "Siehst du die Ameisenstra\u00DFe?", "es": "\u00BFVes el camino de hormigas?" }
  ],
  "Pfeffer": [
    { "de": "Der Pfeffer ist frisch gemahlen.", "es": "La pimienta est\u00E1 reci\u00E9n molida." },
    { "de": "Du hast zu viel Pfeffer an die Suppe getan.", "es": "Has puesto demasiada pimienta a la sopa." },
    { "de": "Magst du Pfeffer auf deinem Steak?", "es": "\u00BFTe gusta la pimienta en tu filete?" }
  ],
  "Essig": [
    { "de": "Der Essig ist aus Apfelwein.", "es": "El vinagre es de sidra de manzana." },
    { "de": "Ich habe den Salat mit Essig und \u00D6l angemacht.", "es": "He ali\u00F1ado la ensalada con vinagre y aceite." },
    { "de": "Nimmst du Essig oder Zitrone f\u00FCr die So\u00DFe?", "es": "\u00BFTomas vinagre o lim\u00F3n para la salsa?" }
  ],
  "Gummistiefel": [
    { "de": "Die Gummistiefel sind blau.", "es": "Las botas de goma son azules." },
    { "de": "Das Kind hat die Gummistiefel im Regen getragen.", "es": "El ni\u00F1o ha llevado las botas de goma bajo la lluvia." },
    { "de": "Hast du deine Gummistiefel mitgenommen?", "es": "\u00BFTe has llevado las botas de goma?" }
  ],
  "das Schwimmbad": [
    { "de": "Das Schwimmbad ist heute geschlossen.", "es": "La piscina est\u00E1 cerrada hoy." },
    { "de": "Wir sind im Sommer oft ins Schwimmbad gegangen.", "es": "En verano hemos ido a menudo a la piscina." },
    { "de": "Darf ich dich ins Schwimmbad begleiten?", "es": "\u00BFPuedo acompa\u00F1arte a la piscina?" }
  ],
  "der Bikini": [
    { "de": "Der Bikini ist zu knapp.", "es": "El bikini es demasiado peque\u00F1o." },
    { "de": "Sie hat einen roten Bikini am Strand getragen.", "es": "Ella ha llevado un bikini rojo en la playa." },
    { "de": "Kaufst du diesen Bikini?", "es": "\u00BFCompras este bikini?" }
  ],
  "umgehen": [
    { "de": "Wir m\u00FCssen die Staus umgehen.", "es": "Tenemos que evitar los atascos." },
    { "de": "Er hat das Problem geschickt umgangen.", "es": "\u00C9l ha evitado el problema h\u00E1bilmente." },
    { "de": "Umgehst du das Thema?", "es": "\u00BFEvitas el tema?" }
  ],
  "Zahnb\u00FCrste": [
    { "de": "Meine Zahnb\u00FCrste ist elektrisch.", "es": "Mi cepillo de dientes es el\u00E9ctrico." },
    { "de": "Ich habe die Zahnb\u00FCrste in der Drogerie gekauft.", "es": "He comprado el cepillo de dientes en la droguer\u00EDa." },
    { "de": "Wechselst du deine Zahnb\u00FCrste regelm\u00E4\u00DFig?", "es": "\u00BFCambias tu cepillo de dientes regularmente?" }
  ],
  "heuteMorgen": [
    { "de": "Heute Morgen war es neblig.", "es": "Esta ma\u00F1ana hab\u00EDa niebla." },
    { "de": "Ich habe heute Morgen frische Br\u00F6tchen geholt.", "es": "Esta ma\u00F1ana he ido a por panecillos frescos." },
    { "de": "Hast du heute Morgen schon Kaffee getrunken?", "es": "\u00BFYa has bebido caf\u00E9 esta ma\u00F1ana?" }
  ],
  "die Stadt": [
    { "de": "Die Stadt hat viele Sehensw\u00FCrdigkeiten.", "es": "La ciudad tiene muchos lugares de inter\u00E9s." },
    { "de": "Wir haben die Stadt zu Fu\u00DF erkundet.", "es": "Hemos explorado la ciudad a pie." },
    { "de": "Gef\u00E4llt dir die Stadt?", "es": "\u00BFTe gusta la ciudad?" }
  ],
  "Tablet": [
    { "de": "Das Tablet ist sehr handlich.", "es": "La tablet es muy manejable." },
    { "de": "Ich habe das Tablet f\u00FCr die Uni gekauft.", "es": "He comprado la tablet para la universidad." },
    { "de": "Benutzt du das Tablet auch zum Lesen?", "es": "\u00BFUsas la tablet tambi\u00E9n para leer?" }
  ],
  "loslassen": [
    { "de": "Du musst die Vergangenheit loslassen.", "es": "Tienes que soltar el pasado." },
    { "de": "Das Kind hat die Hand seiner Mutter losgelassen.", "es": "El ni\u00F1o ha soltado la mano de su madre." },
    { "de": "L\u00E4sst du den Ball los?", "es": "\u00BFSuelta la pelota?" }
  ],
  "sorgen": [
    { "de": "Ich sorge mich um meine Gesundheit.", "es": "Me preocupo por mi salud." },
    { "de": "Er hat sich um die Organisation gesorgt.", "es": "\u00C9l se ha preocupado de la organizaci\u00F3n." },
    { "de": "Sorgst du dich auch um deine Zukunft?", "es": "\u00BFTe preocupas tambi\u00E9n por tu futuro?" }
  ],
  "tief": [
    { "de": "Der Brunnen ist sehr tief.", "es": "El pozo es muy profundo." },
    { "de": "Sie hat tief geschlafen.", "es": "Ella ha dormido profundamente." },
    { "de": "Wie tief ist das Wasser hier?", "es": "\u00BFC\u00F3mo de profunda est\u00E1 el agua aqu\u00ED?" }
  ],
  "flach": [
    { "de": "Das Land ist hier ganz flach.", "es": "El terreno es aqu\u00ED totalmente llano." },
    { "de": "Der Teich ist zu flach zum Schwimmen.", "es": "El estanque es demasiado llano para nadar." },
    { "de": "Findest du den Kuchen zu flach?", "es": "\u00BFEncuentras la tarta demasiado plana?" }
  ],
  "Suppe": [
    { "de": "Die Suppe k\u00F6chelt auf dem Herd.", "es": "La sopa hierve a fuego lento en la cocina." },
    { "de": "Mama hat eine kr\u00E4ftige Rindfleischsuppe gemacht.", "es": "Mam\u00E1 ha hecho una sopa de carne fuerte." },
    { "de": "Isst du die Suppe mit Brot?", "es": "\u00BFComes la sopa con pan?" }
  ],
  "G\u00E4rtner": [
    { "de": "Der G\u00E4rtner schneidet die Hecken.", "es": "El jardinero recorta los setos." },
    { "de": "Wir haben den G\u00E4rtner f\u00FCr den Fr\u00FChling bestellt.", "es": "Hemos pedido al jardinero para la primavera." },
    { "de": "Arbeitet der G\u00E4rtner auch am Samstag?", "es": "\u00BFTrabaja el jardinero tambi\u00E9n el s\u00E1bado?" }
  ],
  "M\u00FCtze": [
    { "de": "Meine M\u00FCtze ist aus Wolle.", "es": "Mi gorro es de lana." },
    { "de": "Er hat die M\u00FCtze auf den Tisch gelegt.", "es": "\u00C9l ha dejado el gorro en la mesa." },
    { "de": "Setzt du die M\u00FCtze bei K\u00E4lte auf?", "es": "\u00BFTe pones el gorro cuando hace fr\u00EDo?" }
  ],
  "Rock": [
    { "de": "Der Rock ist zu kurz.", "es": "La falda es demasiado corta." },
    { "de": "Sie hat den Rock zur Arbeit getragen.", "es": "Ella ha llevado la falda al trabajo." },
    { "de": "Gef\u00E4llt dir der rote Rock?", "es": "\u00BFTe gusta la falda roja?" }
  ],
  "Rock": [
    { "de": "Der Rocksaum ist ausgefranst.", "es": "El borde de la falda est\u00E1 deshilachado." },
    { "de": "Ich habe den Rock im Schrank gefunden.", "es": "He encontrado la falda en el armario." },
    { "de": "B\u00FCgelst du den Rock?", "es": "\u00BFPlanchas la falda?" }
  ],
  "die Butter": [
    { "de": "Die Butter ist weich.", "es": "La mantequilla est\u00E1 blanda." },
    { "de": "Oma hat die Butter selbst gemacht.", "es": "La abuela ha hecho la mantequilla ella misma." },
    { "de": "Streicht du die Butter aufs Br\u00F6tchen?", "es": "\u00BFUntas la mantequilla en el panecillo?" }
  ],
  "Deckel": [
    { "de": "Der Deckel sitzt fest auf dem Glas.", "es": "La tapa est\u00E1 bien cerrada en el tarro." },
    { "de": "Ich habe den Deckel nicht aufbekommen.", "es": "No he conseguido abrir la tapa." },
    { "de": "Kannst du den Deckel abschrauben?", "es": "\u00BFPuedes desenroscar la tapa?" }
  ],
  "decken": [
    { "de": "Ich muss noch den Tisch decken.", "es": "Todav\u00EDa tengo que poner la mesa." },
    { "de": "Er hat die Teller und Gl\u00E4ser gedeckt.", "es": "\u00C9l ha puesto los platos y los vasos en la mesa." },
    { "de": "Deckst du den Tisch f\u00FCr sechs Personen?", "es": "\u00BFPones la mesa para seis personas?" }
  ],
  "abwaschen": [
    { "de": "Du musst das Geschirr abwaschen.", "es": "Tienes que fregar los platos." },
    { "de": "Ich habe die Tassen von Hand abgewaschen.", "es": "He fregado las tazas a mano." },
    { "de": "W\u00E4schst du mit hei\u00DFem Wasser ab?", "es": "\u00BFFriegas con agua caliente?" }
  ],
  "suchen": [
    { "de": "Ich suche meine Brille.", "es": "Busco mis gafas." },
    { "de": "Er hat den Schl\u00FCssel \u00FCberall gesucht.", "es": "\u00C9l ha buscado la llave por todas partes." },
    { "de": "Suchst du eine neue Wohnung?", "es": "\u00BFBuscas un piso nuevo?" }
  ],
  "Frisur": [
    { "de": "Deine neue Frisur steht dir gut.", "es": "Tu nuevo peinado te queda bien." },
    { "de": "Der Friseur hat mir eine tolle Frisur gemacht.", "es": "El peluquero me ha hecho un peinado estupendo." },
    { "de": "\u00C4nderst du deine Frisur oft?", "es": "\u00BFCambias de peinado a menudo?" }
  ],
  "z\u00E4h": [
    { "de": "Das Fleisch ist heute z\u00E4h.", "es": "La carne est\u00E1 hoy correosa." },
    { "de": "Der L\u00E4ufer hat sich als z\u00E4h erwiesen.", "es": "El corredor se ha mostrado tenaz." },
    { "de": "Bist du ein z\u00E4her Gegner?", "es": "\u00BFEs un oponente correoso?" }
  ],
  "vierzig": [
    { "de": "Vierzig ist eine runde Zahl.", "es": "Cuarenta es un n\u00FAmero redondo." },
    { "de": "Mein Vater ist gestern vierzig geworden.", "es": "Mi padre cumpli\u00F3 ayer cuarenta a\u00F1os." },
    { "de": "Kostet das Hemd vierzig Euro?", "es": "\u00BFCuesta la camisa cuarenta euros?" }
  ],
  "Untertasse": [
    { "de": "Die Untertasse ist aus feinem Porzellan.", "es": "El platillo es de porcelana fina." },
    { "de": "Oma hat die Tasse auf die Untertasse gestellt.", "es": "La abuela ha puesto la taza sobre el platillo." },
    { "de": "Hast du eine passende Untertasse?", "es": "\u00BFTienes un platillo a juego?" }
  ],
  "\u00E4ngstlich": [
    { "de": "Der Hund ist etwas \u00E4ngstlich.", "es": "El perro es un poco temeroso." },
    { "de": "Sie hat \u00E4ngstlich auf die Pr\u00FCfung gewartet.", "es": "Ella ha esperado el examen con temor." },
    { "de": "Warum schaust du so \u00E4ngstlich?", "es": "\u00BFPor qu\u00E9 miras tan temeroso?" }
  ],
  "Rollladen": [
    { "de": "Der Rollladen ist heruntergelassen.", "es": "La persiana est\u00E1 bajada." },
    { "de": "Ich habe die Rolll\u00E4den im Schlafzimmer erneuert.", "es": "He renovado las persianas del dormitorio." },
    { "de": "Ziehst du die Rolll\u00E4den am Abend hoch?", "es": "\u00BFSubes las persianas por la noche?" }
  ],
  "graben": [
    { "de": "Der Hund gr\u00E4bt ein Loch im Garten.", "es": "El perro cava un agujero en el jard\u00EDn." },
    { "de": "Opa hat letzte Woche Kartoffeln gegraben.", "es": "El abuelo ha cavado patatas la semana pasada." },
    { "de": "Gr\u00E4bst du mit der Hand oder mit der Schaufel?", "es": "\u00BFCavas con la mano o con la pala?" }
  ],
  "der Keller": [
    { "de": "Der Keller ist k\u00FChl und trocken.", "es": "El s\u00F3tano es fresco y seco." },
    { "de": "Wir haben den Wein im Keller gelagert.", "es": "Hemos guardado el vino en el s\u00F3tano." },
    { "de": "Bringst du die Kisten in den Keller?", "es": "\u00BFLlevas las cajas al s\u00F3tano?" }
  ],
  "Hilfe": [
    { "de": "Ich brauche dringend Hilfe.", "es": "Necesito ayuda urgentemente." },
    { "de": "Der Nachbar hat mir seine Hilfe angeboten.", "es": "El vecino me ha ofrecido su ayuda." },
    { "de": "Kannst du mir Hilfe holen?", "es": "\u00BFPuedes ir a buscar ayuda?" }
  ],
  "Klimaanlage": [
    { "de": "Die Klimaanlage ist defekt.", "es": "El aire acondicionado est\u00E1 averiado." },
    { "de": "Wir haben die Klimaanlage im B\u00FCro eingeschaltet.", "es": "Hemos encendido el aire acondicionado en la oficina." },
    { "de": "Funktioniert die Klimaanlage in deinem Auto?", "es": "\u00BFFunciona el aire acondicionado en tu coche?" }
  ],
  "abfahren": [
    { "de": "Der Bus wird in f\u00FCnf Minuten abfahren.", "es": "El autob\u00FAs saldr\u00E1 en cinco minutos." },
    { "de": "P\u00FCnktlich um acht ist der Zug abgefahren.", "es": "Puntualmente a las ocho ha salido el tren." },
    { "de": "F\u00E4hrst du mit dem Rad ab oder l\u00E4ufst du?", "es": "\u00BFTe vas en bici o caminando?" }
  ],
  "\u00FCbernehmen": [
    { "de": "Du musst die Verantwortung \u00FCbernehmen.", "es": "Tienes que asumir la responsabilidad." },
    { "de": "Der neue Kollege hat die Aufgabe \u00FCbernommen.", "es": "El compa\u00F1ero nuevo ha asumido la tarea." },
    { "de": "\u00DCbernimmst du das Projekt?", "es": "\u00BFAsumes el proyecto?" }
  ],
  "Zeitpunkt": [
    { "de": "Der Zeitpunkt ist g\u00FCnstig.", "es": "El momento es favorable." },
    { "de": "Er hat den richtigen Zeitpunkt verpasst.", "es": "\u00C9l ha perdido el momento adecuado." },
    { "de": "Ist das ein guter Zeitpunkt f\u00FCr ein Gespr\u00E4ch?", "es": "\u00BFEs este un buen momento para una conversaci\u00F3n?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block23 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 23 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);