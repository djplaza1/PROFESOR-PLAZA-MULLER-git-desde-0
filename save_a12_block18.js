const fs = require("fs");

// Cargar archivo existente (bloques 1-17)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 18: palabras 851 a 900
const block18 = {
  "Vogel": [
    { "de": "Der Vogel singt auf dem Baum.", "es": "El pájaro canta en el árbol." },
    { "de": "Ich habe heute Morgen einen bunten Vogel gesehen.", "es": "Esta mañana he visto un pájaro de colores." },
    { "de": "Kannst du den Vogel dort drüben sehen?", "es": "¿Puedes ver el pájaro allí?" }
  ],
  "der Pfirsich": [
    { "de": "Der Pfirsich ist saftig und süß.", "es": "El melocotón es jugoso y dulce." },
    { "de": "Wir haben Pfirsiche für den Kuchen gekauft.", "es": "Hemos comprado melocotones para la tarta." },
    { "de": "Magst du Pfirsiche im Obstsalat?", "es": "¿Te gustan los melocotones en la macedonia?" }
  ],
  "der Schuh": [
    { "de": "Der Schuh ist zu eng.", "es": "El zapato está demasiado apretado." },
    { "de": "Ich habe die Schuhe ausgezogen.", "es": "Me he quitado los zapatos." },
    { "de": "Hast du deine Schuhe schon geputzt?", "es": "¿Ya has limpiado tus zapatos?" }
  ],
  "sich putzen": [
    { "de": "Ich muss mir die Zähne putzen.", "es": "Tengo que lavarme los dientes." },
    { "de": "Das Kind hat sich die Hände geputzt.", "es": "El niño se ha limpiado las manos." },
    { "de": "Putzt du dir die Zähne nach jeder Mahlzeit?", "es": "¿Te lavas los dientes después de cada comida?" }
  ],
  "Glas": [
    { "de": "Das Glas ist voll Wasser.", "es": "El vaso está lleno de agua." },
    { "de": "Ich habe ein Glas Milch getrunken.", "es": "He bebido un vaso de leche." },
    { "de": "Kannst du mir ein Glas geben?", "es": "¿Puedes darme un vaso?" }
  ],
  "Teller": [
    { "de": "Der Teller ist aus Porzellan.", "es": "El plato es de porcelana." },
    { "de": "Ich habe den Teller fallenlassen.", "es": "He dejado caer el plato." },
    { "de": "Hast du den Teller schon abgetrocknet?", "es": "¿Ya has secado el plato?" }
  ],
  "pflanzen": [
    { "de": "Wir wollen im Frühling Blumen pflanzen.", "es": "Queremos plantar flores en primavera." },
    { "de": "Oma hat letztes Jahr einen Apfelbaum gepflanzt.", "es": "La abuela plantó un manzano el año pasado." },
    { "de": "Pflanzt du Gemüse im Garten?", "es": "¿Plantas verduras en el jardín?" }
  ],
  "Personalchef": [
    { "de": "Der Personalchef ist für Einstellungen zuständig.", "es": "El jefe de personal es responsable de las contrataciones." },
    { "de": "Ich habe ein Vorstellungsgespräch beim Personalchef gehabt.", "es": "He tenido una entrevista de trabajo con el jefe de personal." },
    { "de": "Kennst du den neuen Personalchef?", "es": "¿Conoces al nuevo jefe de personal?" }
  ],
  "Bügeleisen": [
    { "de": "Das Bügeleisen ist noch heiß.", "es": "La plancha aún está caliente." },
    { "de": "Ich habe das Hemd mit dem Bügeleisen gebügelt.", "es": "He planchado la camisa con la plancha." },
    { "de": "Kannst du das Bügeleisen ausschalten?", "es": "¿Puedes apagar la plancha?" }
  ],
  "Verteidigung": [
    { "de": "Die Verteidigung war stark.", "es": "La defensa fue fuerte." },
    { "de": "Der Anwalt hat eine gute Verteidigung vorbereitet.", "es": "El abogado ha preparado una buena defensa." },
    { "de": "Übernimmst du die Verteidigung?", "es": "¿Asumes la defensa?" }
  ],
  "Feuerwache": [
    { "de": "Die Feuerwache ist direkt um die Ecke.", "es": "El parque de bomberos está justo a la vuelta de la esquina." },
    { "de": "Die Kinder haben die Feuerwache besichtigt.", "es": "Los niños han visitado el parque de bomberos." },
    { "de": "Weißt du, wo die Feuerwache ist?", "es": "¿Sabes dónde está el parque de bomberos?" }
  ],
  "Augenarzt": [
    { "de": "Der Augenarzt hat meine Sehkraft getestet.", "es": "El oculista me ha examinado la vista." },
    { "de": "Ich muss morgen zum Augenarzt.", "es": "Mañana tengo que ir al oculista." },
    { "de": "Gehst du regelmäßig zum Augenarzt?", "es": "¿Vas regularmente al oculista?" }
  ],
  "das Rathaus": [
    { "de": "Das Rathaus ist ein historisches Gebäude.", "es": "El ayuntamiento es un edificio histórico." },
    { "de": "Wir haben im Rathaus geheiratet.", "es": "Nos hemos casado en el ayuntamiento." },
    { "de": "Kannst du mir den Weg zum Rathaus zeigen?", "es": "¿Puedes enseñarme el camino al ayuntamiento?" }
  ],
  "trüb": [
    { "de": "Das Wasser im Teich ist trüb.", "es": "El agua del estanque está turbia." },
    { "de": "Der Himmel ist heute trüb geworden.", "es": "El cielo se ha puesto turbio hoy." },
    { "de": "Warum ist der Wein trüb?", "es": "¿Por qué está turbio el vino?" }
  ],
  "die nen": [
    { "de": "Die Nen sind lecker.", "es": "Los nen son sabrosos." },
    { "de": "Ich habe die Nen mit Soße serviert.", "es": "He servido los nen con salsa." },
    { "de": "Magst du die Nen?", "es": "¿Te gustan los nen?" }
  ],
  "die Bluse": [
    { "de": "Die Bluse ist aus reiner Baumwolle.", "es": "La blusa es de algodón puro." },
    { "de": "Sie hat eine neue Bluse für das Vorstellungsgespräch gekauft.", "es": "Ella ha comprado una blusa nueva para la entrevista de trabajo." },
    { "de": "Gefällt dir meine Bluse?", "es": "¿Te gusta mi blusa?" }
  ],
  "das Huhn": [
    { "de": "Das Huhn legt jeden Tag ein Ei.", "es": "La gallina pone un huevo cada día." },
    { "de": "Wir haben die Hühner im Stall gefüttert.", "es": "Hemos dado de comer a las gallinas en el gallinero." },
    { "de": "Hast du schon ein frischgelegtes Ei vom Huhn gegessen?", "es": "¿Has comido ya un huevo fresco de gallina?" }
  ],
  "Empfänger": [
    { "de": "Der Empfänger wohnt in Berlin.", "es": "El destinatario vive en Berlín." },
    { "de": "Ich habe den Brief an den Empfänger geschickt.", "es": "He enviado la carta al destinatario." },
    { "de": "Bist du der Empfänger des Pakets?", "es": "¿Eres el destinatario del paquete?" }
  ],
  "Quark": [
    { "de": "Der Quark schmeckt frisch und cremig.", "es": "El requesón sabe fresco y cremoso." },
    { "de": "Zum Frühstück habe ich Quark mit Früchten gegessen.", "es": "Para el desayuno he comido requesón con frutas." },
    { "de": "Isst du gern Quark?", "es": "¿Te gusta el requesón?" }
  ],
  "der Nachmittag": [
    { "de": "Der Nachmittag ist lang.", "es": "La tarde es larga." },
    { "de": "Am Nachmittag habe ich einen Spaziergang gemacht.", "es": "Por la tarde he dado un paseo." },
    { "de": "Was machst du am Nachmittag?", "es": "¿Qué haces por la tarde?" }
  ],
  "Ummeldung": [
    { "de": "Die Ummeldung muss innerhalb von zwei Wochen erfolgen.", "es": "El cambio de registro debe realizarse en un plazo de dos semanas." },
    { "de": "Ich habe meine Ummeldung beim Einwohnermeldeamt gemacht.", "es": "He hecho mi cambio de registro en la oficina de empadronamiento." },
    { "de": "Hast du deine Ummeldung schon beantragt?", "es": "¿Ya has solicitado tu cambio de registro?" }
  ],
  "Nebeneingang": [
    { "de": "Der Nebeneingang ist auf der Rückseite.", "es": "La entrada lateral está en la parte trasera." },
    { "de": "Wir haben den Nebeneingang benutzt.", "es": "Hemos usado la entrada lateral." },
    { "de": "Weißt du, wo der Nebeneingang ist?", "es": "¿Sabes dónde está la entrada lateral?" }
  ],
  "Sportplatz": [
    { "de": "Der Sportplatz ist nach der Schule belebt.", "es": "La pista deportiva está animada después de la escuela." },
    { "de": "Die Kinder haben auf dem Sportplatz Fußball gespielt.", "es": "Los niños han jugado al fútbol en la pista deportiva." },
    { "de": "Gehst du gern zum Sportplatz?", "es": "¿Te gusta ir a la pista deportiva?" }
  ],
  "Karte": [
    { "de": "Die Karte führt uns zum See.", "es": "El mapa nos guía al lago." },
    { "de": "Ich habe eine Karte von der Stadt gekauft.", "es": "He comprado un mapa de la ciudad." },
    { "de": "Hast du eine Karte dabei?", "es": "¿Llevas un mapa?" }
  ],
  "Fahrkarte": [
    { "de": "Die Fahrkarte ist für die Hin- und Rückfahrt gültig.", "es": "El billete es válido para ida y vuelta." },
    { "de": "Ich habe die Fahrkarte am Automaten gelöst.", "es": "He sacado el billete en la máquina." },
    { "de": "Brauchst du eine Fahrkarte?", "es": "¿Necesitas un billete?" }
  ],
  "die Strümpfe": [
    { "de": "Die Strümpfe sind aus Seide.", "es": "Las medias son de seda." },
    { "de": "Sie hat die Strümpfe im Badezimmer vergessen.", "es": "Ella ha olvidado las medias en el baño." },
    { "de": "Trägst du gern Strümpfe?", "es": "¿Te gusta llevar medias?" }
  ],
  "Hocker": [
    { "de": "Der Hocker ist aus Holz.", "es": "El taburete es de madera." },
    { "de": "Opa hat sich auf den Hocker gesetzt.", "es": "El abuelo se ha sentado en el taburete." },
    { "de": "Kannst du den Hocker holen?", "es": "¿Puedes traer el taburete?" }
  ],
  "Frosch": [
    { "de": "Der Frosch quakt im Teich.", "es": "La rana croa en el estanque." },
    { "de": "Ich habe einen kleinen Frosch im Garten gefunden.", "es": "He encontrado una rana pequeña en el jardín." },
    { "de": "Hast du schon einen Frosch geküsst?", "es": "¿Has besado ya a una rana?" }
  ],
  "Fön": [
    { "de": "Der Fön ist zu heiß.", "es": "El secador está demasiado caliente." },
    { "de": "Ich habe meine Haare mit dem Fön getrocknet.", "es": "Me he secado el pelo con el secador." },
    { "de": "Kannst du mir deinen Fön leihen?", "es": "¿Puedes prestarme tu secador?" }
  ],
  "Wetterbericht": [
    { "de": "Der Wetterbericht hat Regen angesagt.", "es": "El parte meteorológico ha anunciado lluvia." },
    { "de": "Ich habe den Wetterbericht im Radio gehört.", "es": "He oído el parte meteorológico en la radio." },
    { "de": "Schaltest du morgens den Wetterbericht ein?", "es": "¿Enciendes el parte meteorológico por la mañana?" }
  ],
  "el libro": [
    { "de": "\"el libro\" ist ein spanisches Wort.", "es": "\"el libro\" es una palabra española." },
    { "de": "Auf Deutsch heißt \"el libro\" das Buch.", "es": "En alemán \"el libro\" significa el libro." },
    { "de": "Hast du das Wort \"Buch\" schon gelernt?", "es": "¿Has aprendido ya la palabra \"Buch\"?" }
  ],
  "das Schloss": [
    { "de": "Das Schloss steht auf einem Hügel.", "es": "El castillo está en una colina." },
    { "de": "Wir haben ein altes Schloss besichtigt.", "es": "Hemos visitado un castillo antiguo." },
    { "de": "Warst du schon auf einem Schloss?", "es": "¿Has estado ya en un castillo?" }
  ],
  "Faden": [
    { "de": "Der Faden ist zu kurz.", "es": "El hilo es demasiado corto." },
    { "de": "Oma hat den Faden durch die Nadel gezogen.", "es": "La abuela ha pasado el hilo por la aguja." },
    { "de": "Hast du einen roten Faden?", "es": "¿Tienes un hilo rojo?" }
  ],
  "eigen": [
    { "de": "Ich habe mein eigenes Zimmer.", "es": "Tengo mi propia habitación." },
    { "de": "Er hat eine eigene Firma gegründet.", "es": "Él ha fundado su propia empresa." },
    { "de": "Hast du einen eigenen Computer?", "es": "¿Tienes un ordenador propio?" }
  ],
  "anpassen": [
    { "de": "Du musst die Einstellungen anpassen.", "es": "Tienes que adaptar los ajustes." },
    { "de": "Die Software wurde an das neue System angepasst.", "es": "El software ha sido adaptado al nuevo sistema." },
    { "de": "Passt du deinen Plan dem Wetter an?", "es": "¿Adaptas tu plan al tiempo?" }
  ],
  "Ferse": [
    { "de": "Meine Ferse tut weh.", "es": "Me duele el talón." },
    { "de": "Ich habe mir die Ferse an einer Kante gestoßen.", "es": "Me he golpeado el talón con un borde." },
    { "de": "Hast du eine Blase an der Ferse?", "es": "¿Tienes una ampolla en el talón?" }
  ],
  "falsch": [
    { "de": "Die Antwort ist falsch.", "es": "La respuesta es incorrecta." },
    { "de": "Er hat die falsche Tür genommen.", "es": "Él ha tomado la puerta equivocada." },
    { "de": "Habe ich etwas falsch gemacht?", "es": "¿He hecho algo mal?" }
  ],
  "Tischler": [
    { "de": "Der Tischler fertigt Möbel an.", "es": "El carpintero fabrica muebles." },
    { "de": "Mein Onkel hat als Tischler gearbeitet.", "es": "Mi tío ha trabajado como carpintero." },
    { "de": "Kennst du einen guten Tischler?", "es": "¿Conoces a un buen carpintero?" }
  ],
  "Papierkorb": [
    { "de": "Der Papierkorb ist voll.", "es": "La papelera está llena." },
    { "de": "Ich habe die Notiz in den Papierkorb geworfen.", "es": "He tirado la nota a la papelera." },
    { "de": "Kannst du den Papierkorb leeren?", "es": "¿Puedes vaciar la papelera?" }
  ],
  "die Schokolade": [
    { "de": "Die Schokolade ist zartschmelzend.", "es": "El chocolate se deshace suavemente." },
    { "de": "Oma hat mir eine Tafel Schokolade geschenkt.", "es": "La abuela me ha regalado una tableta de chocolate." },
    { "de": "Magst du weiße Schokolade?", "es": "¿Te gusta el chocolate blanco?" }
  ],
  "Pass": [
    { "de": "Der Pass ist noch gültig.", "es": "El pasaporte aún es válido." },
    { "de": "Ich habe meinen Pass im Hotel gelassen.", "es": "He dejado mi pasaporte en el hotel." },
    { "de": "Hast du deinen Pass dabei?", "es": "¿Llevas tu pasaporte?" }
  ],
  "Hagel": [
    { "de": "Der Hagel hat die Pflanzen zerstört.", "es": "El granizo ha destrozado las plantas." },
    { "de": "Gestern hat es stark gehagelt.", "es": "Ayer ha granizado fuerte." },
    { "de": "Hast du schon einmal Hagel gesehen?", "es": "¿Has visto ya alguna vez granizo?" }
  ],
  "das Ferienhaus": [
    { "de": "Das Ferienhaus liegt direkt am Strand.", "es": "La casa de vacaciones está justo en la playa." },
    { "de": "Wir haben das Ferienhaus für zwei Wochen gemietet.", "es": "Hemos alquilado la casa de vacaciones por dos semanas." },
    { "de": "Hast du ein Ferienhaus in den Bergen?", "es": "¿Tienes una casa de vacaciones en las montañas?" }
  ],
  "Kleidung": [
    { "de": "Die Kleidung ist für den Winter geeignet.", "es": "La ropa es adecuada para el invierno." },
    { "de": "Ich habe die Kleidung in den Schrank eingeräumt.", "es": "He colocado la ropa en el armario." },
    { "de": "Kaufst du deine Kleidung im Internet?", "es": "¿Compras tu ropa por internet?" }
  ],
  "Rabe": [
    { "de": "Der Rabe krächzt auf dem Dach.", "es": "El cuervo grazna en el tejado." },
    { "de": "Ein Rabe hat den Käse vom Tisch gestohlen.", "es": "Un cuervo ha robado el queso de la mesa." },
    { "de": "Siehst du den Raben im Baum?", "es": "¿Ves el cuervo en el árbol?" }
  ],
  "der Apfelsaft": [
    { "de": "Der Apfelsaft ist naturtrüb.", "es": "El zumo de manzana es naturalmente turbio." },
    { "de": "Zum Frühstück habe ich Apfelsaft getrunken.", "es": "En el desayuno he bebido zumo de manzana." },
    { "de": "Möchtest du einen Apfelsaft?", "es": "¿Quieres un zumo de manzana?" }
  ],
  "Bademantel": [
    { "de": "Mein Bademantel ist flauschig.", "es": "Mi bata es esponjosa." },
    { "de": "Nach dem Duschen habe ich den Bademantel angezogen.", "es": "Después de ducharme me he puesto la bata." },
    { "de": "Hast du deinen Bademantel dabei?", "es": "¿Llevas tu bata?" }
  ],
  "Rucksack": [
    { "de": "Der Rucksack ist wasserdicht.", "es": "La mochila es impermeable." },
    { "de": "Ich habe den Rucksack für die Wanderung gepackt.", "es": "He preparado la mochila para la caminata." },
    { "de": "Trägst du deinen Rucksack gern?", "es": "¿Te gusta llevar tu mochila?" }
  ],
  "hinweisen": [
    { "de": "Der Lehrer muss auf die Regeln hinweisen.", "es": "El profesor tiene que señalar las normas." },
    { "de": "Er hat auf den Fehler im Plan hingewiesen.", "es": "Él ha señalado el error en el plan." },
    { "de": "Weist du auf das Problem hin?", "es": "¿Señalas el problema?" }
  ],
  "die Brücke": [
    { "de": "Die Brücke ist sehr alt.", "es": "El puente es muy antiguo." },
    { "de": "Wir sind über die Brücke gegangen.", "es": "Hemos cruzado el puente." },
    { "de": "Führt diese Brücke zum Schloss?", "es": "¿Conduce este puente al castillo?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block18 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 18 añadido. Total de palabras ahora:", Object.keys(combined).length);