const fs = require("fs");

// Cargar archivo existente (bloques 1-11)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 12: palabras 551 a 600
const block12 = {
  "heuteNacht": [
    { "de": "Heute Nacht ist es sehr kalt.", "es": "Esta noche hace mucho frío." },
    { "de": "Ich habe heute Nacht schlecht geschlafen.", "es": "Esta noche he dormido mal." },
    { "de": "Bleibst du heute Nacht zu Hause?", "es": "¿Te quedas en casa esta noche?" }
  ],
  "Mensch": [
    { "de": "Der Mensch braucht Wasser.", "es": "El ser humano necesita agua." },
    { "de": "Ein freundlicher Mensch hat mir geholfen.", "es": "Una persona amable me ha ayudado." },
    { "de": "Bist du ein glücklicher Mensch?", "es": "¿Eres una persona feliz?" }
  ],
  "Hirsch": [
    { "de": "Der Hirsch hat ein großes Geweih.", "es": "El ciervo tiene una gran cornamenta." },
    { "de": "Wir haben einen Hirsch im Wald gesehen.", "es": "Hemos visto un ciervo en el bosque." },
    { "de": "Weißt du, was ein Hirsch frisst?", "es": "¿Sabes qué come un ciervo?" }
  ],
  "Antwort": [
    { "de": "Die Antwort ist richtig.", "es": "La respuesta es correcta." },
    { "de": "Er hat mir eine klare Antwort gegeben.", "es": "Él me ha dado una respuesta clara." },
    { "de": "Kennst du die Antwort auf die Frage?", "es": "¿Sabes la respuesta a la pregunta?" }
  ],
  "Uhr": [
    { "de": "Die Uhr zeigt zwölf Uhr.", "es": "El reloj marca las doce." },
    { "de": "Ich habe die Uhr im Schaufenster gesehen.", "es": "He visto el reloj en el escaparate." },
    { "de": "Wie spät ist es auf deiner Uhr?", "es": "¿Qué hora es en tu reloj?" }
  ],
  "finden": [
    { "de": "Ich finde den Schlüssel nicht.", "es": "No encuentro la llave." },
    { "de": "Er hat eine neue Wohnung gefunden.", "es": "Él ha encontrado un piso nuevo." },
    { "de": "Findest du den Weg allein?", "es": "¿Encuentras el camino solo?" }
  ],
  "Briefkasten": [
    { "de": "Der Briefkasten ist gelb.", "es": "El buzón es amarillo." },
    { "de": "Ich habe den Brief in den Briefkasten geworfen.", "es": "He echado la carta al buzón." },
    { "de": "Hast du den Briefkasten schon geleert?", "es": "¿Ya has vaciado el buzón?" }
  ],
  "das Gleis": [
    { "de": "Das Gleis ist frei.", "es": "La vía está libre." },
    { "de": "Der Zug ist auf Gleis drei eingefahren.", "es": "El tren ha entrado en la vía tres." },
    { "de": "Von welchem Gleis fährt der Zug?", "es": "¿De qué vía sale el tren?" }
  ],
  "die Nacht": [
    { "de": "Die Nacht ist dunkel.", "es": "La noche es oscura." },
    { "de": "Wir haben die ganze Nacht durchgetanzt.", "es": "Hemos bailado toda la noche." },
    { "de": "Schläfst du in der Nacht gut?", "es": "¿Duermes bien por la noche?" }
  ],
  "sauber": [
    { "de": "Das Bad ist sauber.", "es": "El baño está limpio." },
    { "de": "Sie hat die Küche sauber gemacht.", "es": "Ella ha limpiado la cocina." },
    { "de": "Ist das Glas sauber?", "es": "¿Está limpio el vaso?" }
  ],
  "schmutzig": [
    { "de": "Der Boden ist schmutzig.", "es": "El suelo está sucio." },
    { "de": "Die Kinder haben sich schmutzig gemacht.", "es": "Los niños se han ensuciado." },
    { "de": "Warum ist das Auto so schmutzig?", "es": "¿Por qué está tan sucio el coche?" }
  ],
  "Geldbeutel": [
    { "de": "Mein Geldbeutel ist leer.", "es": "Mi monedero está vacío." },
    { "de": "Ich habe meinen Geldbeutel zu Hause vergessen.", "es": "He olvidado mi monedero en casa." },
    { "de": "Hast du deinen Geldbeutel dabei?", "es": "¿Llevas tu monedero?" }
  ],
  "Handlung": [
    { "de": "Die Handlung des Films ist spannend.", "es": "La acción de la película es emocionante." },
    { "de": "Er hat eine mutige Handlung gesetzt.", "es": "Él ha realizado una acción valiente." },
    { "de": "Verstehst du die Handlung der Geschichte?", "es": "¿Entiendes la trama de la historia?" }
  ],
  "Sprechzimmer": [
    { "de": "Das Sprechzimmer ist hell.", "es": "El consultorio es luminoso." },
    { "de": "Der Arzt hat mich ins Sprechzimmer gerufen.", "es": "El médico me ha llamado al consultorio." },
    { "de": "Wartest du vor dem Sprechzimmer?", "es": "¿Esperas delante del consultorio?" }
  ],
  "der Bahnsteig": [
    { "de": "Der Bahnsteig ist überfüllt.", "es": "El andén está abarrotado." },
    { "de": "Wir haben auf dem Bahnsteig auf den Zug gewartet.", "es": "Hemos esperado el tren en el andén." },
    { "de": "Auf welchem Bahnsteig kommt der ICE?", "es": "¿En qué andén llega el ICE?" }
  ],
  "der Senf": [
    { "de": "Der Senf ist scharf.", "es": "La mostaza es picante." },
    { "de": "Ich habe Senf auf die Wurst gemacht.", "es": "He puesto mostaza en la salchicha." },
    { "de": "Magst du süßen Senf?", "es": "¿Te gusta la mostaza dulce?" }
  ],
  "Klempner": [
    { "de": "Der Klempner repariert die Heizung.", "es": "El fontanero repara la calefacción." },
    { "de": "Ich habe den Klempner für morgen bestellt.", "es": "He pedido al fontanero para mañana." },
    { "de": "Kennst du einen guten Klempner?", "es": "¿Conoces un buen fontanero?" }
  ],
  "der Milchkaffee": [
    { "de": "Der Milchkaffee ist heiß.", "es": "El café con leche está caliente." },
    { "de": "Zum Frühstück habe ich Milchkaffee getrunken.", "es": "En el desayuno he bebido café con leche." },
    { "de": "Trinkst du deinen Kaffee als Milchkaffee?", "es": "¿Bebes el café con leche?" }
  ],
  "stammen": [
    { "de": "Meine Familie stammt aus der Türkei.", "es": "Mi familia proviene de Turquía." },
    { "de": "Das Rezept hat von meiner Oma gestammt.", "es": "La receta ha provenido de mi abuela." },
    { "de": "Woher stammst du?", "es": "¿De dónde provienes?" }
  ],
  "nah": [
    { "de": "Der Supermarkt ist ganz nah.", "es": "El supermercado está muy cerca." },
    { "de": "Wir sind dem Gipfel schon nah gekommen.", "es": "Ya nos hemos acercado a la cumbre." },
    { "de": "Ist die Haltestelle nah?", "es": "¿Está cerca la parada?" }
  ],
  "die Zitrone": [
    { "de": "Die Zitrone ist sauer.", "es": "El limón es ácido." },
    { "de": "Ich habe Zitrone in den Tee gepresst.", "es": "He exprimido limón en el té." },
    { "de": "Benutzt du Zitrone zum Kochen?", "es": "¿Usas limón para cocinar?" }
  ],
  "sich waschen": [
    { "de": "Du musst dich vor dem Essen waschen.", "es": "Tienes que lavarte antes de comer." },
    { "de": "Ich habe mich mit kalter Seife gewaschen.", "es": "Me he lavado con jabón frío." },
    { "de": "Wäschst du dich jeden Morgen?", "es": "¿Te lavas todas las mañanas?" }
  ],
  "Computer": [
    { "de": "Mein Computer ist neu.", "es": "Mi ordenador es nuevo." },
    { "de": "Gestern habe ich den Computer repariert.", "es": "Ayer he reparado el ordenador." },
    { "de": "Benutzt du den Computer für die Arbeit?", "es": "¿Usas el ordenador para el trabajo?" }
  ],
  "Fernseher": [
    { "de": "Der Fernseher ist zu laut.", "es": "El televisor está demasiado alto." },
    { "de": "Wir haben einen neuen Fernseher gekauft.", "es": "Hemos comprado un televisor nuevo." },
    { "de": "Schaltest du den Fernseher abends ein?", "es": "¿Enciendes el televisor por las noches?" }
  ],
  "Notausgang": [
    { "de": "Der Notausgang ist hinten.", "es": "La salida de emergencia está detrás." },
    { "de": "Im Kino habe ich den Notausgang gesucht.", "es": "En el cine he buscado la salida de emergencia." },
    { "de": "Weißt du, wo der Notausgang ist?", "es": "¿Sabes dónde está la salida de emergencia?" }
  ],
  "Stunde": [
    { "de": "Eine Stunde hat sechzig Minuten.", "es": "Una hora tiene sesenta minutos." },
    { "de": "Ich habe eine Stunde auf den Bus gewartet.", "es": "He esperado una hora el autobús." },
    { "de": "Wann beginnt die nächste Stunde?", "es": "¿Cuándo empieza la próxima hora?" }
  ],
  "Minute": [
    { "de": "Eine Minute ist kurz.", "es": "Un minuto es corto." },
    { "de": "Er ist vor einer Minute gegangen.", "es": "Él se ha ido hace un minuto." },
    { "de": "Kannst du eine Minute warten?", "es": "¿Puedes esperar un minuto?" }
  ],
  "das Pferd": [
    { "de": "Das Pferd ist schwarz.", "es": "El caballo es negro." },
    { "de": "Meine Tochter ist auf dem Pferd geritten.", "es": "Mi hija ha montado a caballo." },
    { "de": "Darf ich das Pferd streicheln?", "es": "¿Puedo acariciar al caballo?" }
  ],
  "der Schinken": [
    { "de": "Der Schinken ist luftgetrocknet.", "es": "El jamón está curado al aire." },
    { "de": "Ich habe Schinken aufs Brot gelegt.", "es": "He puesto jamón en el pan." },
    { "de": "Isst du gern Schinken zum Frühstück?", "es": "¿Te gusta comer jamón en el desayuno?" }
  ],
  "Sonne": [
    { "de": "Die Sonne scheint warm.", "es": "El sol calienta." },
    { "de": "Gestern hat die Sonne den ganzen Tag geschienen.", "es": "Ayer el sol ha brillado todo el día." },
    { "de": "Siehst du die Sonne durch die Wolken?", "es": "¿Ves el sol a través de las nubes?" }
  ],
  "Blase": [
    { "de": "Die Blase am Fuß tut weh.", "es": "La ampolla en el pie duele." },
    { "de": "Ich habe mir eine Blase gelaufen.", "es": "Me ha salido una ampolla de caminar." },
    { "de": "Hast du ein Pflaster für die Blase?", "es": "¿Tienes una tirita para la ampolla?" }
  ],
  "der Vormittag": [
    { "de": "Der Vormittag ist produktiv.", "es": "La mañana temprano es productiva." },
    { "de": "Am Vormittag habe ich die Einkäufe erledigt.", "es": "Por la mañana temprano he hecho la compra." },
    { "de": "Was machst du am Vormittag?", "es": "¿Qué haces por la mañana temprano?" }
  ],
  "Jahrzehnt": [
    { "de": "Das letzte Jahrzehnt war spannend.", "es": "La última década fue emocionante." },
    { "de": "In einem Jahrzehnt kann viel passieren.", "es": "En una década puede pasar mucho." },
    { "de": "Erinnerst du dich an das Jahrzehnt der Neunziger?", "es": "¿Te acuerdas de la década de los noventa?" }
  ],
  "Obstbaum": [
    { "de": "Der Obstbaum blüht im April.", "es": "El árbol frutal florece en abril." },
    { "de": "Opa hat einen Obstbaum im Garten gepflanzt.", "es": "El abuelo ha plantado un árbol frutal en el jardín." },
    { "de": "Hast du einen Obstbaum im Hof?", "es": "¿Tienes un árbol frutal en el patio?" }
  ],
  "hinstellen": [
    { "de": "Du sollst die Tasche dort hinstellen.", "es": "Debes colocar la bolsa allí." },
    { "de": "Er hat die Vase auf den Tisch hingestellt.", "es": "Él ha colocado el jarrón en la mesa." },
    { "de": "Stellst du den Stuhl an die Wand hin?", "es": "¿Colocas la silla junto a la pared?" }
  ],
  "der Joghurt": [
    { "de": "Der Joghurt ist cremig.", "es": "El yogur es cremoso." },
    { "de": "Ich habe Joghurt mit Früchten gegessen.", "es": "He comido yogur con frutas." },
    { "de": "Isst du gern Joghurt zum Frühstück?", "es": "¿Te gusta comer yogur en el desayuno?" }
  ],
  "bringen": [
    { "de": "Kannst du mir das Buch bringen?", "es": "¿Puedes traerme el libro?" },
    { "de": "Er hat mir frische Brötchen gebracht.", "es": "Él me ha traído panecillos frescos." },
    { "de": "Bringst du den Müll raus?", "es": "¿Tiras la basura?" }
  ],
  "Ananas": [
    { "de": "Die Ananas ist reif.", "es": "La piña está madura." },
    { "de": "Wir haben Ananas für das Dessert gekauft.", "es": "Hemos comprado piña para el postre." },
    { "de": "Schneidest du die Ananas in Stücke?", "es": "¿Cortas la piña en trozos?" }
  ],
  "der Bär": [
    { "de": "Der Bär hat ein dickes Fell.", "es": "El oso tiene un pelaje espeso." },
    { "de": "Im Wald haben wir einen Bären gesehen.", "es": "En el bosque hemos visto un oso." },
    { "de": "Hast du Angst vor Bären?", "es": "¿Tienes miedo a los osos?" }
  ],
  "Möwe": [
    { "de": "Die Möwe kreischt über dem Hafen.", "es": "La gaviota chilla sobre el puerto." },
    { "de": "Am Strand haben die Möwen unser Brot gefressen.", "es": "En la playa las gaviotas se han comido nuestro pan." },
    { "de": "Fütterst du die Möwen?", "es": "¿Das de comer a las gaviotas?" }
  ],
  "Locke": [
    { "de": "Ihre Locken sind natürlich.", "es": "Sus rizos son naturales." },
    { "de": "Sie hat sich die Haare in Locken gelegt.", "es": "Ella se ha rizado el pelo." },
    { "de": "Gefallen dir Locken oder glatte Haare?", "es": "¿Te gustan los rizos o el pelo liso?" }
  ],
  "der Käse": [
    { "de": "Der Käse ist würzig.", "es": "El queso es aromático." },
    { "de": "Ich habe den Käse auf die Pizza gestreut.", "es": "He espolvoreado el queso sobre la pizza." },
    { "de": "Magst du lieber Gouda oder Emmentaler?", "es": "¿Prefieres el gouda o el emmental?" }
  ],
  "der Ketchup": [
    { "de": "Der Ketchup ist zu süß.", "es": "El kétchup es demasiado dulce." },
    { "de": "Er hat Ketchup auf den Teller gespritzt.", "es": "Él ha echado kétchup en el plato." },
    { "de": "Nimmst du Ketchup zu den Pommes?", "es": "¿Tomas kétchup con las patatas?" }
  ],
  "Stein": [
    { "de": "Der Stein ist schwer.", "es": "La piedra es pesada." },
    { "de": "Das Kind hat einen Stein ins Wasser geworfen.", "es": "El niño ha tirado una piedra al agua." },
    { "de": "Kannst du den Stein heben?", "es": "¿Puedes levantar la piedra?" }
  ],
  "Pony": [
    { "de": "Das Pony ist ein kleines Pferd.", "es": "El poni es un caballo pequeño." },
    { "de": "Meine Nichte ist auf einem Pony geritten.", "es": "Mi sobrina ha montado en un poni." },
    { "de": "Darf ich das Pony füttern?", "es": "¿Puedo dar de comer al poni?" }
  ],
  "Waage": [
    { "de": "Die Waage ist digital.", "es": "La báscula es digital." },
    { "de": "Ich habe mich auf die Waage gestellt.", "es": "Me he subido a la báscula." },
    { "de": "Hast du eine Waage im Badezimmer?", "es": "¿Tienes una báscula en el baño?" }
  ],
  "vorbereiten": [
    { "de": "Ich muss die Präsentation vorbereiten.", "es": "Tengo que preparar la presentación." },
    { "de": "Sie hat das Abendessen vorbereitet.", "es": "Ella ha preparado la cena." },
    { "de": "Bereitest du dich auf die Prüfung vor?", "es": "¿Te preparas para el examen?" }
  ],
  "smart": [
    { "de": "\"smart\" ist ein englisches Wort.", "es": "\"smart\" es una palabra inglesa." },
    { "de": "Auf Deutsch bedeutet \"smart\" intelligent oder schlau.", "es": "En alemán \"smart\" significa inteligente o listo." },
    { "de": "Kennst du ein anderes Wort für \"smart\"?", "es": "¿Conoces otra palabra para \"smart\"?" }
  ],
  "ausleihen": [
    { "de": "Kannst du mir einen Stift ausleihen?", "es": "¿Puedes prestarme un bolígrafo?" },
    { "de": "Ich habe mir ein Buch aus der Bibliothek ausgeliehen.", "es": "He tomado prestado un libro de la biblioteca." },
    { "de": "Leihst du dein Fahrrad aus?", "es": "¿Prestas tu bicicleta?" }
  ],
  "Bauklotz": [
    { "de": "Der Bauklotz ist bunt.", "es": "El bloque de construcción es de colores." },
    { "de": "Das Kind hat einen Turm aus Bauklötzen gebaut.", "es": "El niño ha construido una torre con bloques." },
    { "de": "Spielst du mit Bauklötzen?", "es": "¿Juegas con bloques de construcción?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block12 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 12 añadido. Total de palabras ahora:", Object.keys(combined).length);