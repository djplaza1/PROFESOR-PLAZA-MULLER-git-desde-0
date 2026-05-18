const fs = require("fs");

// Cargar archivo existente (bloques 1-12)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 13: palabras 601 a 650
const block13 = {
  "fragen": [
    { "de": "Ich muss den Lehrer etwas fragen.", "es": "Tengo que preguntar algo al profesor." },
    { "de": "Er hat mich nach dem Weg gefragt.", "es": "\u00C9l me ha preguntado por el camino." },
    { "de": "Fragst du mich nach meiner Meinung?", "es": "\u00BFMe preguntas por mi opini\u00F3n?" }
  ],
  "brauchen": [
    { "de": "Ich brauche dringend einen Kaffee.", "es": "Necesito urgentemente un caf\u00E9." },
    { "de": "F\u00FCr den Kuchen habe ich Zucker gebraucht.", "es": "Para la tarta he necesitado az\u00FAcar." },
    { "de": "Brauchst du Hilfe?", "es": "\u00BFNecesitas ayuda?" }
  ],
  "kaufen": [
    { "de": "Wir wollen ein neues Sofa kaufen.", "es": "Queremos comprar un sof\u00E1 nuevo." },
    { "de": "Gestern habe ich frisches Brot gekauft.", "es": "Ayer he comprado pan fresco." },
    { "de": "Kaufst du im Supermarkt ein?", "es": "\u00BFCompras en el supermercado?" }
  ],
  "sp\u00FClen": [
    { "de": "Du musst die Tassen noch sp\u00FClen.", "es": "Tienes que enjuagar las tazas todav\u00EDa." },
    { "de": "Ich habe das Geschirr von Hand gesp\u00FClt.", "es": "He lavado los platos a mano." },
    { "de": "Sp\u00FClst du lieber mit der Maschine?", "es": "\u00BFPrefieres enjuagar con la m\u00E1quina?" }
  ],
  "Caf\u00E9": [
    { "de": "Das Caf\u00E9 an der Ecke ist gem\u00FCtlich.", "es": "La cafeter\u00EDa de la esquina es acogedora." },
    { "de": "Wir haben in dem Caf\u00E9 gefr\u00FChst\u00FCckt.", "es": "Hemos desayunado en la cafeter\u00EDa." },
    { "de": "Gehst du gern ins Caf\u00E9?", "es": "\u00BFTe gusta ir a la cafeter\u00EDa?" }
  ],
  "Kino": [
    { "de": "Das Kino ist heute sehr voll.", "es": "El cine est\u00E1 hoy muy lleno." },
    { "de": "Gestern Abend haben wir einen Film im Kino gesehen.", "es": "Anoche hemos visto una pel\u00EDcula en el cine." },
    { "de": "Gehen wir am Samstag ins Kino?", "es": "\u00BFVamos al cine el s\u00E1bado?" }
  ],
  "Kartoffel": [
    { "de": "Die Kartoffel ist eine tolle Knolle.", "es": "La patata es un tub\u00E9rculo estupendo." },
    { "de": "Mama hat die Kartoffeln gesch\u00E4lt und gekocht.", "es": "Mam\u00E1 ha pelado y cocido las patatas." },
    { "de": "Magst du Bratkartoffeln?", "es": "\u00BFTe gustan las patatas fritas?" }
  ],
  "der Schwan": [
    { "de": "Der Schwan schwimmt anmutig.", "es": "El cisne nada con gracia." },
    { "de": "Im Stadtpark haben wir viele Schw\u00E4ne gesehen.", "es": "En el parque de la ciudad hemos visto muchos cisnes." },
    { "de": "Hast du den Schwan gef\u00FCttert?", "es": "\u00BFHas dado de comer al cisne?" }
  ],
  "Wunderkerze": [
    { "de": "Die Wunderkerze glitzert hell.", "es": "La bengala brilla con intensidad." },
    { "de": "An Silvester haben wir Wunderkerzen gehalten.", "es": "En Nochevieja hemos tenido bengalas en la mano." },
    { "de": "Kaufst du Wunderkerzen f\u00FCr die Party?", "es": "\u00BFCompras bengalas para la fiesta?" }
  ],
  "la pizarra": [
    { "de": "\"la pizarra\" ist ein spanisches Wort.", "es": "\"la pizarra\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"la pizarra\" die Tafel.", "es": "En alem\u00E1n \"la pizarra\" significa la pizarra." },
    { "de": "Hast du das Wort \"Tafel\" gelernt?", "es": "\u00BFHas aprendido la palabra \"Tafel\"?" }
  ],
  "Arm": [
    { "de": "Mein Arm ist eingeschlafen.", "es": "Se me ha dormido el brazo." },
    { "de": "Er hat sich den Arm beim Sturz gebrochen.", "es": "\u00C9l se ha roto el brazo en la ca\u00EDda." },
    { "de": "Kannst du deinen Arm heben?", "es": "\u00BFPuedes levantar el brazo?" }
  ],
  "Sozialversicherung": [
    { "de": "Die Sozialversicherung ist Pflicht in Deutschland.", "es": "La seguridad social es obligatoria en Alemania." },
    { "de": "Er hat sich \u00FCber die Sozialversicherung informiert.", "es": "\u00C9l se ha informado sobre la seguridad social." },
    { "de": "Zahlst du in die Sozialversicherung ein?", "es": "\u00BFCotizas a la seguridad social?" }
  ],
  "der Apfel": [
    { "de": "Der Apfel ist knackig und s\u00FC\u00DF.", "es": "La manzana es crujiente y dulce." },
    { "de": "Ich habe einen Apfel vom Baum gepfl\u00FCckt.", "es": "He recogido una manzana del \u00E1rbol." },
    { "de": "Isst du den Apfel mit Schale?", "es": "\u00BFComes la manzana con piel?" }
  ],
  "Krankenversicherung": [
    { "de": "Die Krankenversicherung ist sehr wichtig.", "es": "El seguro m\u00E9dico es muy importante." },
    { "de": "Er hat die Krankenversicherung gewechselt.", "es": "\u00C9l ha cambiado el seguro m\u00E9dico." },
    { "de": "Bist du gesetzlich oder privat versichert?", "es": "\u00BFTienes seguro m\u00E9dico p\u00FAblico o privado?" }
  ],
  "Sauce": [
    { "de": "Die Sauce schmeckt nach Pfeffer.", "es": "La salsa sabe a pimienta." },
    { "de": "Der Koch hat die Sauce selbst gemacht.", "es": "El cocinero ha hecho la salsa \u00E9l mismo." },
    { "de": "Probierst du die Sauce vor dem Servieren?", "es": "\u00BFPruebas la salsa antes de servir?" }
  ],
  "der Tee": [
    { "de": "Der Tee ist noch zu hei\u00DF.", "es": "El t\u00E9 est\u00E1 a\u00FAn demasiado caliente." },
    { "de": "Oma hat Kr\u00E4utertee aus dem Garten gekocht.", "es": "La abuela ha preparado infusi\u00F3n de hierbas del jard\u00EDn." },
    { "de": "Trinkst du deinen Tee mit Milch?", "es": "\u00BFBebes el t\u00E9 con leche?" }
  ],
  "Verk\u00E4ufer": [
    { "de": "Der Verk\u00E4ufer ist sehr freundlich.", "es": "El vendedor es muy amable." },
    { "de": "Ich habe den Verk\u00E4ufer nach dem Preis gefragt.", "es": "He preguntado al vendedor por el precio." },
    { "de": "Arbeitet der Verk\u00E4ufer sonntags?", "es": "\u00BFTrabaja el vendedor los domingos?" }
  ],
  "M\u00FCllbeutel": [
    { "de": "Der M\u00FCllbeutel ist voll.", "es": "La bolsa de basura est\u00E1 llena." },
    { "de": "Ich habe den M\u00FCllbeutel nach drau\u00DFen gebracht.", "es": "He sacado la bolsa de basura fuera." },
    { "de": "Kannst du einen neuen M\u00FCllbeutel nehmen?", "es": "\u00BFPuedes coger una bolsa de basura nueva?" }
  ],
  "weitermachen": [
    { "de": "Du musst mit der Arbeit weitermachen.", "es": "Tienes que continuar con el trabajo." },
    { "de": "Trotz des Regens haben wir weitergemacht.", "es": "A pesar de la lluvia hemos continuado." },
    { "de": "Machst du nach der Pause weiter?", "es": "\u00BFContin\u00FAas despu\u00E9s de la pausa?" }
  ],
  "wachen": [
    { "de": "Die Mutter wacht am Bett des Kindes.", "es": "La madre vela junto a la cama del ni\u00F1o." },
    { "de": "Er ist heute sehr fr\u00FCh aufgewacht.", "es": "\u00C9l se ha despertado hoy muy temprano." },
    { "de": "Wachst du jeden Tag um sechs auf?", "es": "\u00BFTe despiertas todos los d\u00EDas a las seis?" }
  ],
  "Umsicht": [
    { "de": "Deine Umsicht hat uns gerettet.", "es": "Tu prudencia nos ha salvado." },
    { "de": "Er hat mit gro\u00DFer Umsicht gehandelt.", "es": "\u00C9l ha actuado con gran prudencia." },
    { "de": "Handelst du immer mit Umsicht?", "es": "\u00BFAct\u00FAas siempre con prudencia?" }
  ],
  "Verfolgung": [
    { "de": "Die Verfolgung dauerte mehrere Stunden.", "es": "La persecuci\u00F3n dur\u00F3 varias horas." },
    { "de": "Der Dieb ist der Verfolgung entkommen.", "es": "El ladr\u00F3n ha escapado de la persecuci\u00F3n." },
    { "de": "Hast du die Verfolgung im Film gesehen?", "es": "\u00BFHas visto la persecuci\u00F3n en la pel\u00EDcula?" }
  ],
  "K\u00E4lte": [
    { "de": "Die K\u00E4lte bei\u00DFt heute sehr.", "es": "El fr\u00EDo hoy corta mucho." },
    { "de": "Bei dieser K\u00E4lte sind wir zu Hause geblieben.", "es": "Con este fr\u00EDo nos hemos quedado en casa." },
    { "de": "Sp\u00FCrst du die K\u00E4lte an den Fingern?", "es": "\u00BFNotas el fr\u00EDo en los dedos?" }
  ],
  "der Pfeffer": [
    { "de": "Der Pfeffer ist frisch gemahlen.", "es": "La pimienta est\u00E1 reci\u00E9n molida." },
    { "de": "Ich habe zu viel Pfeffer an die Suppe getan.", "es": "He puesto demasiada pimienta a la sopa." },
    { "de": "W\u00FCrzt du dein Steak mit Pfeffer?", "es": "\u00BFSazonas tu filete con pimienta?" }
  ],
  "Tomate": [
    { "de": "Die Tomate ist rot und reif.", "es": "El tomate est\u00E1 rojo y maduro." },
    { "de": "Wir haben Tomaten f\u00FCr die So\u00DFe geerntet.", "es": "Hemos cosechado tomates para la salsa." },
    { "de": "Schneidest du die Tomaten in Scheiben?", "es": "\u00BFCortas los tomates en rodajas?" }
  ],
  "Gurke": [
    { "de": "Die Gurke ist knackig und frisch.", "es": "El pepino est\u00E1 crujiente y fresco." },
    { "de": "Opa hat Gurken im Gew\u00E4chshaus gezogen.", "es": "El abuelo ha cultivado pepinos en el invernadero." },
    { "de": "Magst du saure Gurken?", "es": "\u00BFTe gustan los pepinillos?" }
  ],
  "Wischmopp": [
    { "de": "Der Wischmopp steht im Schrank.", "es": "La fregona est\u00E1 en el armario." },
    { "de": "Ich habe den Boden mit dem Wischmopp geputzt.", "es": "He limpiado el suelo con la fregona." },
    { "de": "Benutzt du einen Wischmopp oder einen Lappen?", "es": "\u00BFUsas fregona o bayeta?" }
  ],
  "S\u00FChne": [
    { "de": "Die S\u00FChne war Teil der Strafe.", "es": "La expiaci\u00F3n fue parte de la condena." },
    { "de": "Er hat S\u00FChne f\u00FCr sein Vergehen geleistet.", "es": "\u00C9l ha cumplido expiaci\u00F3n por su falta." },
    { "de": "Findest du S\u00FChne gerecht?", "es": "\u00BFEncuentras justa la expiaci\u00F3n?" }
  ],
  "bestreichen": [
    { "de": "Du musst das Brot mit Butter bestreichen.", "es": "Tienes que untar el pan con mantequilla." },
    { "de": "Sie hat die Br\u00F6tchen mit Marmelade bestrichen.", "es": "Ella ha untado los panecillos con mermelada." },
    { "de": "Bestreichst du den Kuchen mit Schokolade?", "es": "\u00BFUntas la tarta con chocolate?" }
  ],
  "Kanne": [
    { "de": "Die Kanne ist aus Porzellan.", "es": "La jarra es de porcelana." },
    { "de": "Ich habe hei\u00DFes Wasser in die Kanne gegossen.", "es": "He echado agua caliente en la jarra." },
    { "de": "Kannst du die Kanne auf den Tisch stellen?", "es": "\u00BFPuedes poner la jarra en la mesa?" }
  ],
  "Unordnung": [
    { "de": "Die Unordnung im Zimmer st\u00F6rt mich.", "es": "El desorden en la habitaci\u00F3n me molesta." },
    { "de": "Die Kinder haben eine riesige Unordnung gemacht.", "es": "Los ni\u00F1os han montado un desorden enorme." },
    { "de": "Siehst du die Unordnung auf dem Schreibtisch?", "es": "\u00BFVes el desorden en el escritorio?" }
  ],
  "Pfirsich": [
    { "de": "Der Pfirsich ist saftig.", "es": "El melocot\u00F3n es jugoso." },
    { "de": "Wir haben Pfirsiche auf dem Markt gekauft.", "es": "Hemos comprado melocotones en el mercado." },
    { "de": "Magst du Pfirsich im Obstsalat?", "es": "\u00BFTe gusta el melocot\u00F3n en la macedonia?" }
  ],
  "tausend": [
    { "de": "Tausend ist eine gro\u00DFe Zahl.", "es": "Mil es un n\u00FAmero grande." },
    { "de": "Wir sind tausend Kilometer gefahren.", "es": "Hemos recorrido mil kil\u00F3metros." },
    { "de": "Hast du schon tausend Tage Deutsch gelernt?", "es": "\u00BFHas estudiado ya mil d\u00EDas de alem\u00E1n?" }
  ],
  "streng": [
    { "de": "Der Lehrer ist streng aber fair.", "es": "El profesor es estricto pero justo." },
    { "de": "Meine Eltern sind fr\u00FCher streng gewesen.", "es": "Mis padres antes han sido estrictos." },
    { "de": "Findest du die Regeln zu streng?", "es": "\u00BFEncuentras las reglas demasiado estrictas?" }
  ],
  "die M\u00FCcke": [
    { "de": "Die M\u00FCcke ist l\u00E4stig im Sommer.", "es": "El mosquito es molesto en verano." },
    { "de": "Eine M\u00FCcke hat mich in der Nacht gestochen.", "es": "Un mosquito me ha picado por la noche." },
    { "de": "Benutzt du ein Netz gegen M\u00FCcken?", "es": "\u00BFUsas mosquitera?" }
  ],
  "Portemonnaie": [
    { "de": "Das Portemonnaie ist aus Leder.", "es": "La cartera es de cuero." },
    { "de": "Ich habe mein Portemonnaie in der Bahn verloren.", "es": "He perdido mi cartera en el tren." },
    { "de": "Hast du dein Portemonnaie dabei?", "es": "\u00BFLlevas tu cartera encima?" }
  ],
  "die Salami": [
    { "de": "Die Salami ist gut gew\u00FCrzt.", "es": "El salami est\u00E1 bien condimentado." },
    { "de": "Auf der Pizza war zu viel Salami.", "es": "En la pizza hab\u00EDa demasiado salami." },
    { "de": "Isst du gern Salami auf Brot?", "es": "\u00BFTe gusta el salami sobre pan?" }
  ],
  "Postleitzahl": [
    { "de": "Die Postleitzahl ist f\u00FCnfstellig.", "es": "El c\u00F3digo postal tiene cinco cifras." },
    { "de": "Ich habe die Postleitzahl im Internet gesucht.", "es": "He buscado el c\u00F3digo postal en internet." },
    { "de": "Kennst du deine Postleitzahl auswendig?", "es": "\u00BFTe sabes tu c\u00F3digo postal de memoria?" }
  ],
  "der Morgen": [
    { "de": "Der Morgen ist kalt und neblig.", "es": "La ma\u00F1ana es fr\u00EDa y neblinosa." },
    { "de": "Am Morgen habe ich einen Kaffee getrunken.", "es": "Por la ma\u00F1ana he bebido un caf\u00E9." },
    { "de": "Stehst du am Morgen fr\u00FCh auf?", "es": "\u00BFTe levantas temprano por la ma\u00F1ana?" }
  ],
  "Fleischer": [
    { "de": "Der Fleischer verkauft Wurst und Schinken.", "es": "El carnicero vende salchicha y jam\u00F3n." },
    { "de": "Oma hat beim Fleischer Rindfleisch bestellt.", "es": "La abuela ha pedido ternera en la carnicer\u00EDa." },
    { "de": "Gehst du zum Fleischer oder zum Supermarkt?", "es": "\u00BFVas a la carnicer\u00EDa o al supermercado?" }
  ],
  "Restaurant": [
    { "de": "Das Restaurant ist sehr beliebt.", "es": "El restaurante es muy popular." },
    { "de": "Wir haben im Restaurant zu Abend gegessen.", "es": "Hemos cenado en el restaurante." },
    { "de": "Reservierst du einen Tisch im Restaurant?", "es": "\u00BFReservas una mesa en el restaurante?" }
  ],
  "Konfetti": [
    { "de": "Das Konfetti ist bunt.", "es": "El confeti es de colores." },
    { "de": "An Karneval haben wir Konfetti geworfen.", "es": "En carnaval hemos lanzado confeti." },
    { "de": "Bringst du Konfetti zur Party mit?", "es": "\u00BFLlevas confeti a la fiesta?" }
  ],
  "Meldeadresse": [
    { "de": "Die Meldeadresse ist beim Amt angegeben.", "es": "La direcci\u00F3n registrada est\u00E1 comunicada en la oficina." },
    { "de": "Ich habe meine Meldeadresse im Rathaus ge\u00E4ndert.", "es": "He cambiado mi direcci\u00F3n registrada en el ayuntamiento." },
    { "de": "Ist das deine Meldeadresse?", "es": "\u00BFEs esa tu direcci\u00F3n registrada?" }
  ],
  "S\u00FC\u00DFigkeit": [
    { "de": "Die S\u00FC\u00DFigkeit ist nur f\u00FCr Kinder.", "es": "El dulce es solo para los ni\u00F1os." },
    { "de": "Zu Ostern haben wir viele S\u00FC\u00DFigkeiten gegessen.", "es": "En Pascua hemos comido muchos dulces." },
    { "de": "Magst du S\u00FC\u00DFigkeiten oder lieber Chips?", "es": "\u00BFPrefieres dulces o patatas fritas?" }
  ],
  "Urlaubstag": [
    { "de": "Mein erster Urlaubstag ist der 15. Juli.", "es": "Mi primer d\u00EDa de vacaciones es el 15 de julio." },
    { "de": "Den letzten Urlaubstag habe ich am Strand verbracht.", "es": "El \u00FAltimo d\u00EDa de vacaciones lo he pasado en la playa." },
    { "de": "Nimmst du dir einen Urlaubstag f\u00FCr die Hochzeit?", "es": "\u00BFTomas un d\u00EDa de vacaciones para la boda?" }
  ],
  "der Zucker": [
    { "de": "Der Zucker ist in der Dose.", "es": "El az\u00FAcar est\u00E1 en el azucarero." },
    { "de": "Ich habe zwei L\u00F6ffel Zucker in den Tee getan.", "es": "He puesto dos cucharadas de az\u00FAcar en el t\u00E9." },
    { "de": "Nimmst du Zucker in den Kaffee?", "es": "\u00BFTomas az\u00FAcar en el caf\u00E9?" }
  ],
  "die Zw\u00F6lf": [
    { "de": "Die Zw\u00F6lf ist eine heilige Zahl.", "es": "El doce es un n\u00FAmero sagrado." },
    { "de": "Mittags um zw\u00F6lf habe ich einen Termin.", "es": "Al mediod\u00EDa a las doce tengo una cita." },
    { "de": "Ist die Zw\u00F6lf deine Gl\u00FCckszahl?", "es": "\u00BFEs el doce tu n\u00FAmero de la suerte?" }
  ],
  "die Mikrowelle": [
    { "de": "Die Mikrowelle ist praktisch f\u00FCr Reste.", "es": "El microondas es pr\u00E1ctico para las sobras." },
    { "de": "Ich habe die Suppe in der Mikrowelle erw\u00E4rmt.", "es": "He calentado la sopa en el microondas." },
    { "de": "Benutzt du die Mikrowelle h\u00E4ufig?", "es": "\u00BFUsas el microondas a menudo?" }
  ],
  "Parkbank": [
    { "de": "Die Parkbank ist frisch gestrichen.", "es": "El banco del parque est\u00E1 reci\u00E9n pintado." },
    { "de": "Wir haben auf der Parkbank ein Picknick gemacht.", "es": "Hemos hecho un p\u00EDcnic en el banco del parque." },
    { "de": "Sitzt du gern auf der Parkbank?", "es": "\u00BFTe gusta sentarte en el banco del parque?" }
  ],
  "fangen": [
    { "de": "Der Hund will den Ball fangen.", "es": "El perro quiere atrapar la pelota." },
    { "de": "Die Katze hat eine Maus gefangen.", "es": "El gato ha atrapado un rat\u00F3n." },
    { "de": "F\u00E4ngst du Fische mit der Hand?", "es": "\u00BFAtrapas peces con la mano?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block13 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 13 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);