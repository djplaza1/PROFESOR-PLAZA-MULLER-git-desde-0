const fs = require("fs");
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A2.1.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A2.1.json", "utf8");
  existing = JSON.parse(raw);
}
// ▼▼▼ AQUÍ PEGAS EL NUEVO BLOQUE ▼▼▼
const block8 = {
  "Politiker": [
    { "de": "Der Politiker hält eine Rede.", "es": "El político da un discurso." },
    { "de": "Ich habe den Politiker gestern im Fernsehen gesehen.", "es": "Ayer vi al político en la tele." },
    { "de": "Glaubst du diesem Politiker?", "es": "¿Crees a este político?" }
  ],
  "Honig": [
    { "de": "Der Honig schmeckt süß.", "es": "La miel sabe dulce." },
    { "de": "Ich habe Honig aufs Brot gestrichen.", "es": "He untado miel en el pan." },
    { "de": "Magst du Honig im Tee?", "es": "¿Te gusta la miel en el té?" }
  ],
  "Schuljahr": [
    { "de": "Das Schuljahr beginnt im September.", "es": "El año escolar empieza en septiembre." },
    { "de": "Ich habe das Schuljahr erfolgreich beendet.", "es": "He terminado el año escolar con éxito." },
    { "de": "Wann endet das Schuljahr?", "es": "¿Cuándo termina el año escolar?" }
  ],
  "bunt": [
    { "de": "Das Plakat ist bunt.", "es": "El cartel es colorido." },
    { "de": "Die Kinder haben bunte Bilder gemalt.", "es": "Los niños han pintado dibujos coloridos." },
    { "de": "Findest du mein Kleid zu bunt?", "es": "¿Encuentras mi vestido demasiado colorido?" }
  ],
  "Zerstörung": [
    { "de": "Die Zerstörung war schlimm.", "es": "La destrucción fue grave." },
    { "de": "Das Erdbeben hat große Zerstörung verursacht.", "es": "El terremoto ha causado mucha destrucción." },
    { "de": "Kannst du die Zerstörung beheben?", "es": "¿Puedes reparar la destrucción?" }
  ],
  "Unfall": [
    { "de": "Der Unfall war gestern.", "es": "El accidente fue ayer." },
    { "de": "Ich habe einen Unfall auf der Autobahn gesehen.", "es": "He visto un accidente en la autopista." },
    { "de": "Hast du den Unfall bemerkt?", "es": "¿Te has dado cuenta del accidente?" }
  ],
  "Verkehr": [
    { "de": "Der Verkehr ist stark.", "es": "El tráfico es intenso." },
    { "de": "Gestern hat der Verkehr lange stillgestanden.", "es": "Ayer el tráfico estuvo parado mucho tiempo." },
    { "de": "Stehst du oft im Verkehr?", "es": "¿Estás a menudo en el tráfico?" }
  ],
  "mitteilen": [
    { "de": "Ich teile dir die Neuigkeit mit.", "es": "Te comunico la novedad." },
    { "de": "Er hat mir den Termin mitgeteilt.", "es": "Él me ha comunicado la cita." },
    { "de": "Kannst du mir die Adresse mitteilen?", "es": "¿Puedes comunicarme la dirección?" }
  ],
  "Verletzung": [
    { "de": "Die Verletzung tut weh.", "es": "La herida duele." },
    { "de": "Ich habe eine Verletzung am Arm gehabt.", "es": "He tenido una lesión en el brazo." },
    { "de": "Ist die Verletzung schlimm?", "es": "¿Es grave la herida?" }
  ],
  "schlimm": [
    { "de": "Die Nachricht ist schlimm.", "es": "La noticia es grave." },
    { "de": "Es war noch nie so schlimm.", "es": "Nunca había sido tan grave." },
    { "de": "Findest du die Situation schlimm?", "es": "¿Encuentras grave la situación?" }
  ],
  "Turm": [
    { "de": "Der Turm ist hoch.", "es": "La torre es alta." },
    { "de": "Gestern bin ich auf den Turm gestiegen.", "es": "Ayer subí a la torre." },
    { "de": "Kannst du den Turm sehen?", "es": "¿Puedes ver la torre?" }
  ],
  "Mauer": [
    { "de": "Die Mauer ist dick.", "es": "El muro es grueso." },
    { "de": "Die Berliner Mauer ist 1989 gefallen.", "es": "El muro de Berlín cayó en 1989." },
    { "de": "Hast du schon einmal an der Mauer gestanden?", "es": "¿Has estado alguna vez junto al muro?" }
  ],
  "auschecken": [
    { "de": "Wir checken um 11 Uhr aus.", "es": "Hacemos el check-out a las 11." },
    { "de": "Gestern sind wir spät ausgecheckt.", "es": "Ayer hicimos el check-out tarde." },
    { "de": "Müssen wir jetzt auschecken?", "es": "¿Tenemos que hacer el check-out ahora?" }
  ],
  "freudig": [
    { "de": "Die Kinder sind freudig.", "es": "Los niños están alegres." },
    { "de": "Ich habe mich freudig auf den Besuch vorbereitet.", "es": "Me he preparado alegremente para la visita." },
    { "de": "Bist du freudig heute?", "es": "¿Estás alegre hoy?" }
  ],
  "Insel": [
    { "de": "Die Insel ist klein.", "es": "La isla es pequeña." },
    { "de": "Wir haben auf einer Insel Urlaub gemacht.", "es": "Hemos pasado las vacaciones en una isla." },
    { "de": "Möchtest du auf einer Insel leben?", "es": "¿Te gustaría vivir en una isla?" }
  ],
  "Erdkunde": [
    { "de": "Erdkunde ist mein Lieblingsfach.", "es": "La geografía es mi asignatura favorita." },
    { "de": "Gestern habe ich für Erdkunde gelernt.", "es": "Ayer estudié para geografía." },
    { "de": "Magst du Erdkunde?", "es": "¿Te gusta la geografía?" }
  ],
  "Semester": [
    { "de": "Das Semester ist fast vorbei.", "es": "El semestre casi ha terminado." },
    { "de": "Ich habe das Semester gut geschafft.", "es": "He superado bien el semestre." },
    { "de": "Wann fängt das nächste Semester an?", "es": "¿Cuándo empieza el próximo semestre?" }
  ],
  "die Lehrerin": [
    { "de": "Die Lehrerin ist sehr nett.", "es": "La profesora es muy amable." },
    { "de": "Die Lehrerin hat mir die Aufgabe erklärt.", "es": "La profesora me ha explicado la tarea." },
    { "de": "Kannst du die Lehrerin fragen?", "es": "¿Puedes preguntar a la profesora?" }
  ],
  "Fall": [
    { "de": "Das ist ein besonderer Fall.", "es": "Es un caso especial." },
    { "de": "Ich habe den Fall mit dem Anwalt besprochen.", "es": "He hablado del caso con el abogado." },
    { "de": "Kennst du diesen Fall?", "es": "¿Conoces este caso?" }
  ],
  "Medizin": [
    { "de": "Medizin ist wichtig für die Gesundheit.", "es": "La medicina es importante para la salud." },
    { "de": "Ich habe Medizin studiert.", "es": "He estudiado medicina." },
    { "de": "Nimmst du deine Medizin regelmäßig?", "es": "¿Tomas tu medicina regularmente?" }
  ],
  "Produkt": [
    { "de": "Das Produkt ist neu.", "es": "El producto es nuevo." },
    { "de": "Gestern habe ich ein neues Produkt getestet.", "es": "Ayer probé un producto nuevo." },
    { "de": "Hast du das Produkt schon gekauft?", "es": "¿Ya has comprado el producto?" }
  ],
  "Hafen": [
    { "de": "Der Hafen ist voller Schiffe.", "es": "El puerto está lleno de barcos." },
    { "de": "Gestern sind wir im Hafen spazieren gegangen.", "es": "Ayer paseamos por el puerto." },
    { "de": "Wie komme ich zum Hafen?", "es": "¿Cómo llego al puerto?" }
  ],
  "Verlag": [
    { "de": "Der Verlag druckt viele Bücher.", "es": "La editorial imprime muchos libros." },
    { "de": "Ich habe einen Vertrag mit dem Verlag unterschrieben.", "es": "He firmado un contrato con la editorial." },
    { "de": "Bei welchem Verlag erscheint das Buch?", "es": "¿En qué editorial sale el libro?" }
  ],
  "la leche": [
    { "de": "Die Milch ist frisch.", "es": "La leche está fresca." },
    { "de": "Gestern habe ich einen Liter Milch gekauft.", "es": "Ayer compré un litro de leche." },
    { "de": "Trinkst du gern Milch?", "es": "¿Te gusta beber leche?" }
  ],
  "Feierabend": [
    { "de": "Feierabend ist um 17 Uhr.", "es": "El fin de la jornada es a las 17." },
    { "de": "Gestern habe ich pünktlich Feierabend gemacht.", "es": "Ayer terminé puntualmente la jornada." },
    { "de": "Wann hast du Feierabend?", "es": "¿Cuándo terminas tu jornada?" }
  ],
  "Schokolade": [
    { "de": "Die Schokolade ist lecker.", "es": "El chocolate está delicioso." },
    { "de": "Ich habe eine Tafel Schokolade gegessen.", "es": "Me he comido una tableta de chocolate." },
    { "de": "Magst du dunkle Schokolade?", "es": "¿Te gusta el chocolate negro?" }
  ],
  "Lehre": [
    { "de": "Die Lehre dauert drei Jahre.", "es": "El aprendizaje dura tres años." },
    { "de": "Gestern habe ich meine Lehre begonnen.", "es": "Ayer empecé mi formación." },
    { "de": "Möchtest du eine Lehre machen?", "es": "¿Quieres hacer una formación profesional?" }
  ],
  "Transport": [
    { "de": "Der Transport ist pünktlich.", "es": "El transporte es puntual." },
    { "de": "Gestern hat der Transport Verspätung gehabt.", "es": "Ayer el transporte tuvo retraso." },
    { "de": "Kannst du den Transport organisieren?", "es": "¿Puedes organizar el transporte?" }
  ],
  "Grund": [
    { "de": "Der Grund ist klar.", "es": "El motivo está claro." },
    { "de": "Ich habe den Grund vergessen.", "es": "He olvidado el motivo." },
    { "de": "Kennst du den Grund?", "es": "¿Sabes el motivo?" }
  ],
  "Knopf": [
    { "de": "Der Knopf ist ab.", "es": "El botón se ha caído." },
    { "de": "Gestern habe ich den Knopf angenäht.", "es": "Ayer cosí el botón." },
    { "de": "Kannst du den Knopf drücken?", "es": "¿Puedes apretar el botón?" }
  ],
  "Dialekt": [
    { "de": "Der Dialekt ist schwer zu verstehen.", "es": "El dialecto es difícil de entender." },
    { "de": "Ich habe immer im Dialekt gesprochen.", "es": "Siempre he hablado en dialecto." },
    { "de": "Verstehst du diesen Dialekt?", "es": "¿Entiendes este dialecto?" }
  ],
  "nicken": [
    { "de": "Er nickt zum Abschied.", "es": "Él asiente al despedirse." },
    { "de": "Gestern hat er nur genickt.", "es": "Ayer solo asintió." },
    { "de": "Kannst du bitte nicken, wenn du einverstanden bist?", "es": "¿Puedes asentir, por favor, si estás de acuerdo?" }
  ],
  "anrufen": [
    { "de": "Ich rufe meine Mutter an.", "es": "Llamo a mi madre." },
    { "de": "Hast du den Arzt angerufen?", "es": "¿Has llamado al médico?" },
    { "de": "Kannst du mich morgen anrufen?", "es": "¿Puedes llamarme mañana?" }
  ],
  "verraten": [
    { "de": "Er verrät das Geheimnis.", "es": "Él traiciona el secreto." },
    { "de": "Du hast mich nie verraten.", "es": "Nunca me has traicionado." },
    { "de": "Warum willst du ihn verraten?", "es": "¿Por qué quieres traicionarlo?" }
  ],
  "Kenntnis": [
    { "de": "Deine Kenntnis ist erstaunlich.", "es": "Tu conocimiento es asombroso." },
    { "de": "Ich habe gute Kenntnisse in Mathe.", "es": "Tengo buenos conocimientos de mates." },
    { "de": "Hast du Kenntnis von dieser Sache?", "es": "¿Tienes conocimiento de este asunto?" }
  ],
  "Dose": [
    { "de": "Die Dose ist leer.", "es": "La lata está vacía." },
    { "de": "Gestern habe ich eine Dose Bohnen gekauft.", "es": "Ayer compré una lata de judías." },
    { "de": "Kannst du die Dose öffnen?", "es": "¿Puedes abrir la lata?" }
  ],
  "reden": [
    { "de": "Wir reden über das Wetter.", "es": "Hablamos del tiempo." },
    { "de": "Gestern haben wir lange geredet.", "es": "Ayer hablamos mucho rato." },
    { "de": "Worüber möchtest du reden?", "es": "¿Sobre qué quieres hablar?" }
  ],
  "Linie": [
    { "de": "Die Linie 8 fährt zum Bahnhof.", "es": "La línea 8 va a la estación." },
    { "de": "Ich habe die falsche Linie genommen.", "es": "He tomado la línea equivocada." },
    { "de": "Welche Linie muss ich nehmen?", "es": "¿Qué línea debo tomar?" }
  ],
  "pünktlich": [
    { "de": "Der Zug ist pünktlich.", "es": "El tren es puntual." },
    { "de": "Gestern bin ich pünktlich angekommen.", "es": "Ayer llegué puntual." },
    { "de": "Bist du immer pünktlich?", "es": "¿Eres siempre puntual?" }
  ],
  "spät": [
    { "de": "Es ist schon spät.", "es": "Ya es tarde." },
    { "de": "Gestern bin ich spät nach Hause gekommen.", "es": "Ayer llegué tarde a casa." },
    { "de": "Kommst du heute wieder so spät?", "es": "¿Vuelves hoy tan tarde?" }
  ],
  "Nachspeise": [
    { "de": "Die Nachspeise ist süß.", "es": "El postre es dulce." },
    { "de": "Gestern habe ich eine tolle Nachspeise gegessen.", "es": "Ayer me comí un postre estupendo." },
    { "de": "Möchtest du eine Nachspeise?", "es": "¿Quieres un postre?" }
  ],
  "verschieben": [
    { "de": "Wir verschieben das Treffen auf morgen.", "es": "Posponemos la reunión para mañana." },
    { "de": "Gestern habe ich den Termin verschoben.", "es": "Ayer pospuse la cita." },
    { "de": "Können wir die Party verschieben?", "es": "¿Podemos posponer la fiesta?" }
  ],
  "winken": [
    { "de": "Das Kind winkt seiner Oma.", "es": "El niño saluda con la mano a su abuela." },
    { "de": "Gestern hat sie mir vom Zug aus gewinkt.", "es": "Ayer me saludó con la mano desde el tren." },
    { "de": "Kannst du zum Abschied winken?", "es": "¿Puedes saludar con la mano al despedirte?" }
  ],
  "el perro": [
    { "de": "Der Hund ist braun.", "es": "El perro es marrón." },
    { "de": "Gestern bin ich mit dem Hund spazieren gegangen.", "es": "Ayer paseé con el perro." },
    { "de": "Magst du meinen Hund?", "es": "¿Te gusta mi perro?" }
  ],
  "Jugend": [
    { "de": "Die Jugend ist die Zukunft.", "es": "La juventud es el futuro." },
    { "de": "Ich habe meine Jugend auf dem Land verbracht.", "es": "Pasé mi juventud en el campo." },
    { "de": "Erinnerst du dich gern an deine Jugend?", "es": "¿Recuerdas con agrado tu juventud?" }
  ],
  "Ort": [
    { "de": "Dieser Ort ist ruhig.", "es": "Este lugar es tranquilo." },
    { "de": "Ich habe den Ort nie besucht.", "es": "Nunca he visitado el lugar." },
    { "de": "Kennst du diesen Ort?", "es": "¿Conoces este lugar?" }
  ],
  "Weg": [
    { "de": "Der Weg ist lang.", "es": "El camino es largo." },
    { "de": "Gestern bin ich den falschen Weg gegangen.", "es": "Ayer fui por el camino equivocado." },
    { "de": "Weißt du den Weg?", "es": "¿Sabes el camino?" }
  ],
  "Einzug": [
    { "de": "Der Einzug war anstrengend.", "es": "La mudanza fue agotadora." },
    { "de": "Gestern war unser Einzug in die neue Wohnung.", "es": "Ayer fue nuestra mudanza al nuevo piso." },
    { "de": "Wann ist der Einzug geplant?", "es": "¿Cuándo está prevista la mudanza?" }
  ],
  "Notfall": [
    { "de": "Das ist ein Notfall.", "es": "Es una emergencia." },
    { "de": "Ich habe noch nie einen Notfall gehabt.", "es": "Nunca he tenido una emergencia." },
    { "de": "Was machst du bei einem Notfall?", "es": "¿Qué haces en una emergencia?" }
  ],
  "Schule": [
    { "de": "Die Schule beginnt um acht.", "es": "La escuela empieza a las ocho." },
    { "de": "Gestern bin ich nicht zur Schule gegangen.", "es": "Ayer no fui a la escuela." },
    { "de": "Wie findest du deine neue Schule?", "es": "¿Cómo encuentras tu nueva escuela?" }
  ],
  "schreien": [
    { "de": "Bitte nicht schreien!", "es": "¡Por favor, no grites!" },
    { "de": "Das Baby hat die ganze Nacht geschrien.", "es": "El bebé ha gritado toda la noche." },
    { "de": "Warum schreist du so?", "es": "¿Por qué gritas así?" }
  ],
  "kostbar": [
    { "de": "Das ist ein kostbarer Ring.", "es": "Es un anillo valioso." },
    { "de": "Ich habe etwas Kostbares verloren.", "es": "He perdido algo valioso." },
    { "de": "Ist das wirklich so kostbar?", "es": "¿Es realmente tan valioso?" }
  ],
  "Matratze": [
    { "de": "Die Matratze ist weich.", "es": "El colchón es blando." },
    { "de": "Gestern habe ich eine neue Matratze gekauft.", "es": "Ayer compré un colchón nuevo." },
    { "de": "Findest du die Matratze bequem?", "es": "¿Encuentras cómodo el colchón?" }
  ],
  "Wahrheit": [
    { "de": "Die Wahrheit tut weh.", "es": "La verdad duele." },
    { "de": "Du hast mir nie die Wahrheit gesagt.", "es": "Nunca me has dicho la verdad." },
    { "de": "Willst du die Wahrheit wissen?", "es": "¿Quieres saber la verdad?" }
  ],
  "aufbauen": [
    { "de": "Wir bauen das Zelt auf.", "es": "Montamos la tienda." },
    { "de": "Gestern habe ich die Regale aufgebaut.", "es": "Ayer monté las estanterías." },
    { "de": "Kannst du mir helfen, das Bett aufzubauen?", "es": "¿Puedes ayudarme a montar la cama?" }
  ],
  "der Rucksack": [
    { "de": "Der Rucksack ist schwer.", "es": "La mochila es pesada." },
    { "de": "Gestern habe ich meinen Rucksack vergessen.", "es": "Ayer olvidé mi mochila." },
    { "de": "Kannst du deinen Rucksack packen?", "es": "¿Puedes preparar tu mochila?" }
  ],
  "Magen": [
    { "de": "Mein Magen tut weh.", "es": "Me duele el estómago." },
    { "de": "Gestern habe ich mir den Magen verdorben.", "es": "Ayer me estropeé el estómago." },
    { "de": "Hast du etwas für den Magen?", "es": "¿Tienes algo para el estómago?" }
  ],
  "furchtbar": [
    { "de": "Das Wetter ist furchtbar.", "es": "El tiempo es horrible." },
    { "de": "Gestern habe ich mich furchtbar gefühlt.", "es": "Ayer me sentí horrible." },
    { "de": "Findest du diesen Film furchtbar?", "es": "¿Encuentras horrible esta película?" }
  ],
  "klingeln": [
    { "de": "Es klingelt an der Tür.", "es": "Suena el timbre en la puerta." },
    { "de": "Gestern hat es bei mir geklingelt.", "es": "Ayer llamaron al timbre de mi casa." },
    { "de": "Hörst du es klingeln?", "es": "¿Oyes sonar el timbre?" }
  ],
  "Stecker": [
    { "de": "Der Stecker ist kaputt.", "es": "El enchufe está roto." },
    { "de": "Ich habe den Stecker gezogen.", "es": "He desenchufado el enchufe." },
    { "de": "Kannst du den Stecker einstecken?", "es": "¿Puedes enchufar la clavija?" }
  ],
  "Handtuch": [
    { "de": "Das Handtuch ist nass.", "es": "La toalla está mojada." },
    { "de": "Gestern habe ich ein neues Handtuch gekauft.", "es": "Ayer compré una toalla nueva." },
    { "de": "Kannst du mir ein Handtuch geben?", "es": "¿Puedes darme una toalla?" }
  ],
  "vorhaben": [
    { "de": "Ich habe etwas vor.", "es": "Planeo algo." },
    { "de": "Was hast du heute vor?", "es": "¿Qué planes tienes para hoy?" },
    { "de": "Wir haben eine Reise vorgehabt.", "es": "Habíamos planeado un viaje." }
  ],
  "Besprechung": [
    { "de": "Die Besprechung ist wichtig.", "es": "La reunión es importante." },
    { "de": "Gestern habe ich an einer langen Besprechung teilgenommen.", "es": "Ayer participé en una reunión larga." },
    { "de": "Wann ist die Besprechung zu Ende?", "es": "¿Cuándo termina la reunión?" }
  ],
  "Geschäftsreise": [
    { "de": "Die Geschäftsreise war erfolgreich.", "es": "El viaje de negocios fue exitoso." },
    { "de": "Ich habe eine Geschäftsreise nach Berlin gemacht.", "es": "Hice un viaje de negocios a Berlín." },
    { "de": "Fährst du oft auf Geschäftsreise?", "es": "¿Viajas a menudo de negocios?" }
  ],
  "entscheiden": [
    { "de": "Ich entscheide mich für den blauen Anzug.", "es": "Me decido por el traje azul." },
    { "de": "Gestern habe ich mich endgültig entschieden.", "es": "Ayer me decidí definitivamente." },
    { "de": "Kannst du dich schnell entscheiden?", "es": "¿Puedes decidirte rápido?" }
  ],
  "Mitteilung": [
    { "de": "Die Mitteilung ist klar.", "es": "El comunicado es claro." },
    { "de": "Ich habe deine Mitteilung gelesen.", "es": "He leído tu mensaje." },
    { "de": "Hast du die Mitteilung bekommen?", "es": "¿Has recibido el comunicado?" }
  ],
  "Strafe": [
    { "de": "Die Strafe ist hoch.", "es": "La multa es alta." },
    { "de": "Gestern habe ich eine Strafe bekommen.", "es": "Ayer recibí una multa." },
    { "de": "Musst du die Strafe bezahlen?", "es": "¿Tienes que pagar la multa?" }
  ],
  "Trinkgeld": [
    { "de": "Das Trinkgeld ist inklusive.", "es": "La propina está incluida." },
    { "de": "Ich habe dem Kellner Trinkgeld gegeben.", "es": "Le he dado propina al camarero." },
    { "de": "Soll ich Trinkgeld geben?", "es": "¿Debo dar propina?" }
  ],
  "Schloss": [
    { "de": "Das Schloss ist alt und schön.", "es": "El castillo es antiguo y bonito." },
    { "de": "Gestern haben wir ein Schloss besichtigt.", "es": "Ayer visitamos un castillo." },
    { "de": "Kannst du das Schloss fotografieren?", "es": "¿Puedes fotografiar el castillo?" }
  ]
};
// ▲▲▲ FIN DEL BLOQUE ▲▲▲
const combined = { ...existing, ...block8 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A2.1.json", escaped, "utf8");
console.log("Bloque añadido. Total de palabras:", Object.keys(combined).length);