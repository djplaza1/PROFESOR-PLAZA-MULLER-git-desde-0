const fs = require("fs");

// Cargar archivo existente (bloques 1-25)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 26: palabras 1251 a 1300
const block26 = {
  "die Ratte": [
    { "de": "Die Ratte ist ein kluges Nagetier.", "es": "La rata es un roedor inteligente." },
    { "de": "Ich habe eine Ratte im Keller entdeckt.", "es": "He descubierto una rata en el s\u00F3tano." },
    { "de": "Kannst du die Ratte aus der Falle befreien?", "es": "\u00BFPuedes liberar a la rata de la trampa?" }
  ],
  "die Elster": [
    { "de": "Die Elster hat ein schwarz-wei\u00DFes Gefieder.", "es": "La urraca tiene un plumaje blanco y negro." },
    { "de": "Eine Elster hat den gl\u00E4nzenden Ring gestohlen.", "es": "Una urraca ha robado el anillo brillante." },
    { "de": "Siehst du die Elster auf dem Zaun?", "es": "\u00BFVes la urraca en la valla?" }
  ],
  "die Fliege": [
    { "de": "Die Fliege summt laut im Zimmer.", "es": "La mosca zumba fuerte en la habitaci\u00F3n." },
    { "de": "Ich habe die l\u00E4stige Fliege aus dem Fenster gescheucht.", "es": "He espantado a la molesta mosca por la ventana." },
    { "de": "Hast du die Fliege an der Lampe bemerkt?", "es": "\u00BFHas notado la mosca en la l\u00E1mpara?" }
  ],
  "Esel": [
    { "de": "Der Esel hat gro\u00DFe, weiche Ohren.", "es": "El burro tiene orejas grandes y suaves." },
    { "de": "Die Kinder sind auf dem Esel geritten.", "es": "Los ni\u00F1os han montado en el burro." },
    { "de": "Willst du den Esel mit einer M\u00F6hre f\u00FCttern?", "es": "\u00BFQuieres dar de comer al burro una zanahoria?" }
  ],
  "Gesicht": [
    { "de": "Ihr Gesicht ist voller Sommersprossen.", "es": "Su cara est\u00E1 llena de pecas." },
    { "de": "Er hat sein Gesicht mit kaltem Wasser gewaschen.", "es": "\u00C9l se ha lavado la cara con agua fr\u00EDa." },
    { "de": "Zeigst du mir dein Gesicht?", "es": "\u00BFMe muestras tu cara?" }
  ],
  "die Katze": [
    { "de": "Die Katze schnurrt auf dem Sofa.", "es": "El gato ronronea en el sof\u00E1." },
    { "de": "Meine Katze hat eine Maus gefangen.", "es": "Mi gato ha atrapado un rat\u00F3n." },
    { "de": "Darf die Katze im Schlafzimmer schlafen?", "es": "\u00BFPuede dormir el gato en el dormitorio?" }
  ],
  "Haust\u00FCr": [
    { "de": "Die Haust\u00FCr ist aus Eichenholz.", "es": "La puerta principal es de madera de roble." },
    { "de": "Ich habe die Haust\u00FCr abgeschlossen, bevor ich gegangen bin.", "es": "He cerrado la puerta principal antes de irme." },
    { "de": "Hast du die Haust\u00FCr zugezogen?", "es": "\u00BFHas cerrado bien la puerta principal?" }
  ],
  "Heiratsurkunde": [
    { "de": "Die Heiratsurkunde ist ein wichtiges Dokument.", "es": "El certificado de matrimonio es un documento importante." },
    { "de": "Wir haben die Heiratsurkunde im Rathaus abgeholt.", "es": "Hemos recogido el certificado de matrimonio en el ayuntamiento." },
    { "de": "Kannst du mir deine Heiratsurkunde zeigen?", "es": "\u00BFPuedes mostrarme tu certificado de matrimonio?" }
  ],
  "reiben": [
    { "de": "Du musst den Parmesan f\u00FCr die Pasta reiben.", "es": "Tienes que rallar el parmesano para la pasta." },
    { "de": "Ich habe mir die Augen gerieben, weil sie juckten.", "es": "Me he frotado los ojos porque me picaban." },
    { "de": "Reibst du die M\u00F6hren f\u00FCr den Salat?", "es": "\u00BFRallas las zanahorias para la ensalada?" }
  ],
  "Lutscher": [
    { "de": "Der Lutscher schmeckt nach Erdbeere.", "es": "La piruleta sabe a fresa." },
    { "de": "Das Kind hat den Lutscher in wenigen Minuten gelutscht.", "es": "El ni\u00F1o ha chupado la piruleta en pocos minutos." },
    { "de": "Darf ich einen Lutscher nehmen?", "es": "\u00BFPuedo coger una piruleta?" }
  ],
  "lang": [
    { "de": "Der Rock ist zu lang f\u00FCr mich.", "es": "La falda es demasiado larga para m\u00ED." },
    { "de": "Wir haben einen langen Spaziergang durch den Wald gemacht.", "es": "Hemos dado un largo paseo por el bosque." },
    { "de": "Findest du den Film zu lang?", "es": "\u00BFEncuentras la pel\u00EDcula demasiado larga?" }
  ],
  "kurz": [
    { "de": "Meine Haare sind jetzt kurz.", "es": "Mi pelo ahora es corto." },
    { "de": "Er hat einen kurzen Bericht geschrieben.", "es": "\u00C9l ha escrito un informe breve." },
    { "de": "War der Urlaub zu kurz?", "es": "\u00BFFueron las vacaciones demasiado cortas?" }
  ],
  "Adler": [
    { "de": "Der Adler ist ein majest\u00E4tischer Vogel.", "es": "El \u00E1guila es un ave majestuosa." },
    { "de": "Wir haben einen Adler hoch am Himmel gesehen.", "es": "Hemos visto un \u00E1guila en lo alto del cielo." },
    { "de": "Kann ein Adler wirklich so gro\u00DF werden?", "es": "\u00BFPuede un \u00E1guila llegar a ser tan grande?" }
  ],
  "der Adler": [
    { "de": "Der Adler nistet auf der Felswand.", "es": "El \u00E1guila anida en la pared rocosa." },
    { "de": "Ein Adler hat die Beute mit seinen Krallen gegriffen.", "es": "Un \u00E1guila ha agarrado la presa con sus garras." },
    { "de": "Hast du schon einen Adler in Freiheit gesehen?", "es": "\u00BFHas visto ya un \u00E1guila en libertad?" }
  ],
  "elf": [
    { "de": "Die elf spielt heute Abend.", "es": "El once juega esta noche." },
    { "de": "Ich habe elf Punkte im Spiel erreicht.", "es": "He conseguido once puntos en el juego." },
    { "de": "Sind es elf Spieler auf dem Feld?", "es": "\u00BFSon once jugadores en el campo?" }
  ],
  "Spaghetti": [
    { "de": "Die Spaghetti sind al dente.", "es": "Los espaguetis est\u00E1n al dente." },
    { "de": "Mama hat Spaghetti mit Tomatenso\u00DFe serviert.", "es": "Mam\u00E1 ha servido espaguetis con salsa de tomate." },
    { "de": "Kochst du die Spaghetti nur acht Minuten?", "es": "\u00BFCueces los espaguetis solo ocho minutos?" }
  ],
  "Sehne": [
    { "de": "Die Sehne im Fu\u00DF ist gereizt.", "es": "El tend\u00F3n del pie est\u00E1 irritado." },
    { "de": "Der Sportler hat sich eine Sehne gerissen.", "es": "El deportista se ha roto un tend\u00F3n." },
    { "de": "Tut deine Sehne beim Laufen weh?", "es": "\u00BFTe duele el tend\u00F3n al correr?" }
  ],
  "die Pflaume": [
    { "de": "Die Pflaume ist reif und s\u00FC\u00DF.", "es": "La ciruela est\u00E1 madura y dulce." },
    { "de": "Oma hat die Pflaumen f\u00FCr den Kuchen gewaschen.", "es": "La abuela ha lavado las ciruelas para la tarta." },
    { "de": "Isst du lieber frische oder getrocknete Pflaumen?", "es": "\u00BFPrefieres ciruelas frescas o secas?" }
  ],
  "Gesch\u00E4ft": [
    { "de": "Das Gesch\u00E4ft hat bis 20 Uhr ge\u00F6ffnet.", "es": "La tienda est\u00E1 abierta hasta las 20 h." },
    { "de": "Ich habe ein gutes Gesch\u00E4ft in der Altstadt gefunden.", "es": "He encontrado una buena tienda en el casco antiguo." },
    { "de": "Gehst du nach der Arbeit ins Gesch\u00E4ft?", "es": "\u00BFVas a la tienda despu\u00E9s del trabajo?" }
  ],
  "Markt": [
    { "de": "Der Markt ist jeden Mittwoch auf dem Platz.", "es": "El mercado est\u00E1 cada mi\u00E9rcoles en la plaza." },
    { "de": "Wir haben frischen Fisch auf dem Markt geholt.", "es": "Hemos comprado pescado fresco en el mercado." },
    { "de": "Gehst du morgen fr\u00FCh zum Markt?", "es": "\u00BFVas ma\u00F1ana temprano al mercado?" }
  ],
  "die Badehose": [
    { "de": "Die Badehose ist ein bisschen eng.", "es": "El ba\u00F1ador est\u00E1 un poco ajustado." },
    { "de": "Er hat seine Badehose im Schwimmbad vergessen.", "es": "\u00C9l ha olvidado su ba\u00F1ador en la piscina." },
    { "de": "Hast du die Badehose eingepackt?", "es": "\u00BFHas metido el ba\u00F1ador en la maleta?" }
  ],
  "das Jahrhundert": [
    { "de": "Das Jahrhundert neigt sich dem Ende zu.", "es": "El siglo se acerca a su fin." },
    { "de": "Im letzten Jahrhundert ist viel passiert.", "es": "En el \u00FAltimo siglo ha pasado mucho." },
    { "de": "Wei\u00DFt du, wann das Jahrhundert beginnt?", "es": "\u00BFSabes cu\u00E1ndo empieza el siglo?" }
  ],
  "der Espresso": [
    { "de": "Der Espresso ist sehr stark.", "es": "El espresso es muy fuerte." },
    { "de": "Nach dem Abendessen habe ich einen Espresso bestellt.", "es": "Despu\u00E9s de la cena me he pedido un espresso." },
    { "de": "Trinkst du deinen Espresso mit Zucker?", "es": "\u00BFBebes el espresso con az\u00FAcar?" }
  ],
  "sich umziehen": [
    { "de": "Ich muss mich f\u00FCr die Party umziehen.", "es": "Tengo que cambiarme para la fiesta." },
    { "de": "Er hat sich schnell umgezogen, weil es sp\u00E4t war.", "es": "\u00C9l se ha cambiado r\u00E1pido porque era tarde." },
    { "de": "Ziehst du dich vor dem Abendessen um?", "es": "\u00BFTe cambias antes de cenar?" }
  ],
  "Hitze": [
    { "de": "Die Hitze ist heute unertr\u00E4glich.", "es": "El calor es hoy insoportable." },
    { "de": "Gestern haben wir unter der Hitze sehr gelitten.", "es": "Ayer hemos sufrido mucho con el calor." },
    { "de": "Kannst du die Hitze in der K\u00FCche ertragen?", "es": "\u00BFPuedes soportar el calor en la cocina?" }
  ],
  "eckig": [
    { "de": "Der Tisch ist eckig und nicht rund.", "es": "La mesa es cuadrada y no redonda." },
    { "de": "Er hat ein eckiges Gesicht.", "es": "\u00C9l tiene una cara angulosa." },
    { "de": "Findest du eckige Formen sch\u00F6ner?", "es": "\u00BFEncuentras m\u00E1s bonitas las formas cuadradas?" }
  ],
  "der Topf": [
    { "de": "Der Topf ist aus Edelstahl.", "es": "La olla es de acero inoxidable." },
    { "de": "Mama hat den Topf auf den Herd gestellt.", "es": "Mam\u00E1 ha puesto la olla en la cocina." },
    { "de": "Hast du den gro\u00DFen Topf oder den kleinen genommen?", "es": "\u00BFHas cogido la olla grande o la peque\u00F1a?" }
  ],
  "die Erdnuss": [
    { "de": "Die Erdnuss ist ger\u00F6stet und gesalzen.", "es": "El cacahuete est\u00E1 tostado y salado." },
    { "de": "Ich habe eine T\u00FCte Erdn\u00FCsse f\u00FCr die Reise gekauft.", "es": "He comprado una bolsa de cacahuetes para el viaje." },
    { "de": "Isst du Erdn\u00FCsse gern zum Bier?", "es": "\u00BFTe gusta comer cacahuetes con cerveza?" }
  ],
  "Vorh\u00E4nge": [
    { "de": "Die Vorh\u00E4nge im Wohnzimmer sind zu dunkel.", "es": "Las cortinas del sal\u00F3n son demasiado oscuras." },
    { "de": "Oma hat die Vorh\u00E4nge selbst gen\u00E4ht.", "es": "La abuela ha cosido las cortinas ella misma." },
    { "de": "W\u00E4schst du die Vorh\u00E4nge einmal im Jahr?", "es": "\u00BFLavas las cortinas una vez al a\u00F1o?" }
  ],
  "Perle": [
    { "de": "Die Perle gl\u00E4nzt wundersch\u00F6n.", "es": "La perla brilla maravillosamente." },
    { "de": "Sie hat eine echte Perle im Meer gefunden.", "es": "Ella ha encontrado una perla aut\u00E9ntica en el mar." },
    { "de": "Tr\u00E4gst du die Perle an einer Kette?", "es": "\u00BFLlevas la perla en un collar?" }
  ],
  "K\u00FCndigungsfrist": [
    { "de": "Die K\u00FCndigungsfrist betr\u00E4gt vier Wochen.", "es": "El plazo de preaviso es de cuatro semanas." },
    { "de": "Er hat die K\u00FCndigungsfrist nicht eingehalten.", "es": "\u00C9l no ha respetado el plazo de preaviso." },
    { "de": "Wei\u00DFt du, wie lang die K\u00FCndigungsfrist ist?", "es": "\u00BFSabes cu\u00E1nto dura el plazo de preaviso?" }
  ],
  "verwenden": [
    { "de": "Du kannst f\u00FCr den Kuchen Butter verwenden.", "es": "Puedes utilizar mantequilla para la tarta." },
    { "de": "Ich habe f\u00FCr das Projekt alte Fotos verwendet.", "es": "He utilizado fotos antiguas para el proyecto." },
    { "de": "Verwendest du dieses Werkzeug oft?", "es": "\u00BFUtilizas esta herramienta a menudo?" }
  ],
  "Metzger": [
    { "de": "Der Metzger hat heute geschlossen.", "es": "La carnicer\u00EDa ha cerrado hoy." },
    { "de": "Wir haben beim Metzger frisches Rindfleisch bestellt.", "es": "Hemos pedido carne de res fresca en la carnicer\u00EDa." },
    { "de": "Gehst du zum Metzger oder reicht dir der Supermarkt?", "es": "\u00BFVas a la carnicer\u00EDa o te basta con el supermercado?" }
  ],
  "\u00FCbermorgen": [
    { "de": "\u00DCbermorgen beginnt das gro\u00DFe Fest.", "es": "Pasado ma\u00F1ana empieza la gran fiesta." },
    { "de": "Ich habe \u00FCbermorgen einen wichtigen Termin.", "es": "Tengo una cita importante pasado ma\u00F1ana." },
    { "de": "Hast du \u00FCbermorgen Zeit f\u00FCr mich?", "es": "\u00BFTienes tiempo para m\u00ED pasado ma\u00F1ana?" }
  ],
  "der Vogel": [
    { "de": "Der Vogel pickt nach den K\u00F6rnern.", "es": "El p\u00E1jaro picotea los granos." },
    { "de": "Jeden Morgen hat ein Vogel auf dem Balkon gesungen.", "es": "Cada ma\u00F1ana un p\u00E1jaro ha cantado en el balc\u00F3n." },
    { "de": "Siehst du den Vogel im Geb\u00FCsch?", "es": "\u00BFVes el p\u00E1jaro en el arbusto?" }
  ],
  "Ameise": [
    { "de": "Die Ameise ist winzig, aber stark.", "es": "La hormiga es diminuta, pero fuerte." },
    { "de": "Eine Ameisenk\u00F6nigin hat tausende Eier gelegt.", "es": "Una hormiga reina ha puesto miles de huevos." },
    { "de": "Hast du die Ameisenstra\u00DFe im Wald bemerkt?", "es": "\u00BFHas notado el camino de hormigas en el bosque?" }
  ],
  "hinfallen": [
    { "de": "Auf dem Glatteis kannst du leicht hinfallen.", "es": "Sobre el hielo resbaladizo te puedes caer f\u00E1cilmente." },
    { "de": "Opa ist auf der Treppe hingefallen.", "es": "El abuelo se ha ca\u00EDdo en la escalera." },
    { "de": "Bist du schon einmal im Regen hingefallen?", "es": "\u00BFTe has ca\u00EDdo ya alguna vez bajo la lluvia?" }
  ],
  "Brieftasche": [
    { "de": "Meine Brieftasche ist aus braunem Leder.", "es": "Mi cartera es de cuero marr\u00F3n." },
    { "de": "Ich habe die Brieftasche im Bus liegenlassen.", "es": "He dejado olvidada la cartera en el autob\u00FAs." },
    { "de": "Hast du deine Brieftasche gefunden?", "es": "\u00BFHas encontrado tu cartera?" }
  ],
  "mischen": [
    { "de": "Du musst Mehl und Zucker gut mischen.", "es": "Tienes que mezclar bien la harina y el az\u00FAcar." },
    { "de": "Er hat die Farben auf der Palette gemischt.", "es": "\u00C9l ha mezclado los colores en la paleta." },
    { "de": "Mischst du deinen Kaffee mit Milch?", "es": "\u00BFMezclas tu caf\u00E9 con leche?" }
  ],
  "sich k\u00E4mmen": [
    { "de": "Ich muss mich vor dem Spiegel k\u00E4mmen.", "es": "Tengo que peinarme delante del espejo." },
    { "de": "Sie hat sich die nassen Haare vorsichtig gek\u00E4mmt.", "es": "Ella se ha peinado el pelo mojado con cuidado." },
    { "de": "K\u00E4mmst du dich jeden Morgen?", "es": "\u00BFTe peinas todas las ma\u00F1anas?" }
  ],
  "ausparken": [
    { "de": "Der Fahrer muss das Auto vorsichtig ausparken.", "es": "El conductor tiene que salir del aparcamiento con cuidado." },
    { "de": "Ich habe aus der engen L\u00FCcke ausgeparkt.", "es": "He salido del hueco estrecho al aparcar." },
    { "de": "Parkst du r\u00FCckw\u00E4rts aus der Garage aus?", "es": "\u00BFSales marcha atr\u00E1s del garaje?" }
  ],
  "begleiten": [
    { "de": "Kannst du mich zum Bahnhof begleiten?", "es": "\u00BFPuedes acompau00F1arme a la estaci\u00F3n?" },
    { "de": "Er hat sie auf dem Heimweg begleitet.", "es": "\u00C9l la ha acompau00F1ado de camino a casa." },
    { "de": "Begleitest du deine Oma zur Bank?", "es": "\u00BFAcompau00F1as a tu abuela al banco?" }
  ],
  "das Waschbecken": [
    { "de": "Das Waschbecken ist aus Keramik.", "es": "El lavabo es de cer\u00E1mica." },
    { "de": "Ich habe das Waschbecken im Bad geputzt.", "es": "He limpiado el lavabo del ba\u00F1o." },
    { "de": "Tropft das Waschbecken bei dir?", "es": "\u00BFGotea el lavabo en tu casa?" }
  ],
  "ausr\u00E4umen": [
    { "de": "Ich muss den Geschirrsp\u00FCler ausr\u00E4umen.", "es": "Tengo que vaciar el lavavajillas." },
    { "de": "Er hat die Kisten aus dem Keller ausger\u00E4umt.", "es": "\u00C9l ha vaciado las cajas del s\u00F3tano." },
    { "de": "R\u00E4umst du die Waschmaschine gleich aus?", "es": "\u00BFVau00EDas la lavadora enseguida?" }
  ],
  "Stock": [
    { "de": "Mein B\u00FCro ist im zweiten Stock.", "es": "Mi oficina est\u00E1 en la segunda planta." },
    { "de": "Opa kann die Treppe bis zum vierten Stock laufen.", "es": "El abuelo puede subir la escalera hasta la cuarta planta." },
    { "de": "Auf welchem Stock wohnst du?", "es": "\u00BFEn qu\u00E9 planta vives?" }
  ],
  "die Mandel": [
    { "de": "Die Mandel ist eine Nuss.", "es": "La almendra es un fruto seco." },
    { "de": "Wir haben Mandeln f\u00FCr den Kuchen gemahlen.", "es": "Hemos molido almendras para la tarta." },
    { "de": "Hast du schon Mandeln selbst gesch\u00E4lt?", "es": "\u00BFHas pelado ya almendras t\u00FA mismo?" }
  ],
  "der Quark": [
    { "de": "Der Quark schmeckt mild und frisch.", "es": "El reques\u00F3n sabe suave y fresco." },
    { "de": "Zum Fr\u00FChst\u00FCck habe ich Quark mit Erdbeeren gegessen.", "es": "En el desayuno he comido reques\u00F3n con fresas." },
    { "de": "Isst du lieber Quark oder Joghurt?", "es": "\u00BFPrefieres reques\u00F3n o yogur?" }
  ],
  "Ohr": [
    { "de": "Mein Ohr ist ganz rot vor K\u00E4lte.", "es": "Mi oreja est\u00E1 completamente roja del fr\u00EDo." },
    { "de": "Sie hat sich ein zweites Loch ins Ohr stechen lassen.", "es": "Ella se ha hecho un segundo agujero en la oreja." },
    { "de": "H\u00F6rst du mit dem linken Ohr besser?", "es": "\u00BFOyes mejor con la oreja izquierda?" }
  ],
  "Mund": [
    { "de": "Ihr Mund l\u00E4chelt freundlich.", "es": "Su boca sonr\u00EDe amablemente." },
    { "de": "Er hat sich den Mund am hei\u00DFen Tee verbrannt.", "es": "\u00C9l se ha quemado la boca con el t\u00E9 caliente." },
    { "de": "Sp\u00FClst du deinen Mund nach dem Essen aus?", "es": "\u00BFTe enjuagas la boca despu\u00E9s de comer?" }
  ],
  "fegen": [
    { "de": "Nach dem Sturm muss ich die Terrasse fegen.", "es": "Despu\u00E9s de la tormenta tengo que barrer la terraza." },
    { "de": "Der Hausmeister hat das Laub vom Gehweg gefegt.", "es": "El portero ha barrido las hojas de la acera." },
    { "de": "Fegst du lieber mit dem Besen oder saugst du?", "es": "\u00BFPrefieres barrer con la escoba o aspirar?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block26 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 26 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);