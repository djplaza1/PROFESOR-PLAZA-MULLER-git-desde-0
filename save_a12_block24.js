const fs = require("fs");

// Cargar archivo existente (bloques 1-23)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 24: palabras 1151 a 1200
const block24 = {
  "die Insel": [
    { "de": "Die Insel ist von Wasser umgeben.", "es": "La isla est\u00E1 rodeada de agua." },
    { "de": "Im Urlaub haben wir eine kleine Insel besucht.", "es": "En vacaciones hemos visitado una isla peque\u00F1a." },
    { "de": "M\u00F6chtest du auf einer Insel leben?", "es": "\u00BFTe gustar\u00EDa vivir en una isla?" }
  ],
  "Wurst": [
    { "de": "Die Wurst ist gut gew\u00FCrzt.", "es": "El embutido est\u00E1 bien condimentado." },
    { "de": "Er hat die Wurst in d\u00FCnne Scheiben geschnitten.", "es": "\u00C9l ha cortado el embutido en lonchas finas." },
    { "de": "Magst du Wurst auf dem Brot?", "es": "\u00BFTe gusta el embutido sobre el pan?" }
  ],
  "drei\u00DFig": [
    { "de": "Drei\u00DFig ist eine runde Zahl.", "es": "Treinta es un n\u00FAmero redondo." },
    { "de": "Mein Bruder ist gestern drei\u00DFig geworden.", "es": "Mi hermano cumpli\u00F3 ayer treinta a\u00F1os." },
    { "de": "Kostet das Kleid drei\u00DFig Euro?", "es": "\u00BFCuesta el vestido treinta euros?" }
  ],
  "Kommode": [
    { "de": "Die Kommode steht im Schlafzimmer.", "es": "La c\u00F3moda est\u00E1 en el dormitorio." },
    { "de": "Oma hat die alte Kommode neu gestrichen.", "es": "La abuela ha pintado de nuevo la c\u00F3moda vieja." },
    { "de": "Hast du den Schl\u00FCssel in der Kommode gefunden?", "es": "\u00BFHas encontrado la llave en la c\u00F3moda?" }
  ],
  "die Waschmaschine": [
    { "de": "Die Waschmaschine schleudert sehr laut.", "es": "La lavadora centrifuga muy fuerte." },
    { "de": "Ich habe die Waschmaschine heute Morgen eingeschaltet.", "es": "He encendido la lavadora esta ma\u00F1ana." },
    { "de": "Kannst du die Waschmaschine ausr\u00E4umen?", "es": "\u00BFPuedes vaciar la lavadora?" }
  ],
  "Brot": [
    { "de": "Das Brot ist knusprig und frisch.", "es": "El pan est\u00E1 crujiente y fresco." },
    { "de": "Der B\u00E4cker hat das Brot fr\u00FCh am Morgen gebacken.", "es": "El panadero ha horneado el pan temprano por la ma\u00F1ana." },
    { "de": "Hast du das Brot schon angeschnitten?", "es": "\u00BFYa has empezado a cortar el pan?" }
  ],
  "la mesa": [
    { "de": "\"la mesa\" ist ein spanisches Wort.", "es": "\"la mesa\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"la mesa\" der Tisch.", "es": "En alem\u00E1n \"la mesa\" significa la mesa." },
    { "de": "Kennst du das Wort \"Tisch\"?", "es": "\u00BFConoces la palabra \"Tisch\"?" }
  ],
  "Bad": [
    { "de": "Das Bad ist gefliest.", "es": "El ba\u00F1o est\u00E1 alicatado." },
    { "de": "Ich habe gestern das Bad geputzt.", "es": "Ayer he limpiado el ba\u00F1o." },
    { "de": "Ist das Bad frei?", "es": "\u00BFEst\u00E1 libre el ba\u00F1o?" }
  ],
  "satt": [
    { "de": "Nach dem Essen bin ich satt.", "es": "Despu\u00E9s de comer estoy lleno." },
    { "de": "Er hat sich an dem Kuchen satt gegessen.", "es": "\u00C9l se ha hartado de comer tarta." },
    { "de": "Bist du schon satt?", "es": "\u00BFYa est\u00E1s lleno?" }
  ],
  "die Blaubeere": [
    { "de": "Die Blaubeere ist winzig und blau.", "es": "El ar\u00E1ndano es diminuto y azul." },
    { "de": "Wir haben Blaubeeren f\u00FCr die Marmelade gesammelt.", "es": "Hemos recogido ar\u00E1ndanos para la mermelada." },
    { "de": "Magst du Blaubeeren im Joghurt?", "es": "\u00BFTe gustan los ar\u00E1ndanos en el yogur?" }
  ],
  "werten": [
    { "de": "Der Chef wird deine Arbeit werten.", "es": "El jefe valorar\u00E1 tu trabajo." },
    { "de": "Sie hat den Film negativ gewertet.", "es": "Ella ha valorado la pel\u00EDcula negativamente." },
    { "de": "Wertest du deine Kollegen fair?", "es": "\u00BFValoras a tus compa\u00F1eros de manera justa?" }
  ],
  "unter": [
    { "de": "Die Katze schl\u00E4ft unter dem Tisch.", "es": "El gato duerme debajo de la mesa." },
    { "de": "Ich habe die Schuhe unter das Bett gestellt.", "es": "He puesto los zapatos debajo de la cama." },
    { "de": "Liegt der Teppich unter dem Sofa?", "es": "\u00BFEst\u00E1 la alfombra debajo del sof\u00E1?" }
  ],
  "Picknick": [
    { "de": "Das Picknick war ein voller Erfolg.", "es": "El p\u00EDcnic fue todo un \u00E9xito." },
    { "de": "Wir haben am See ein Picknick gemacht.", "es": "Hemos hecho un p\u00EDcnic junto al lago." },
    { "de": "Packst du den Korb f\u00FCr das Picknick?", "es": "\u00BFPreparas la cesta para el p\u00EDcnic?" }
  ],
  "Ader": [
    { "de": "Die Ader am Handgelenk pulsiert.", "es": "La vena de la mu\u00F1eca late." },
    { "de": "Die Krankenschwester hat eine Ader am Arm gefunden.", "es": "La enfermera ha encontrado una vena en el brazo." },
    { "de": "Siehst du deine Adern unter der Haut?", "es": "\u00BFVes tus venas debajo de la piel?" }
  ],
  "Unterhose": [
    { "de": "Meine Unterhose ist aus reiner Baumwolle.", "es": "Mi ropa interior es de puro algod\u00F3n." },
    { "de": "Er hat die Unterhosen in den Schrank einger\u00E4umt.", "es": "\u00C9l ha guardado la ropa interior en el armario." },
    { "de": "Wechselst du deine Unterhose t\u00E4glich?", "es": "\u00BFTe cambias la ropa interior a diario?" }
  ],
  "Zopf": [
    { "de": "Ihr Zopf ist lang und dick.", "es": "Su trenza es larga y gruesa." },
    { "de": "Die Mutter hat der Tochter einen Zopf geflochten.", "es": "La madre ha trenzado una trenza a la hija." },
    { "de": "Tr\u00E4gst du gern einen Zopf?", "es": "\u00BFTe gusta llevar trenza?" }
  ],
  "die Neun": [
    { "de": "Die Neun ist eine ungerade Zahl.", "es": "El nueve es un n\u00FAmero impar." },
    { "de": "Ich habe die Neun auf dem W\u00FCrfel gew\u00FCrfelt.", "es": "He sacado el nueve con el dado." },
    { "de": "Ist die Neun deine Gl\u00FCckszahl?", "es": "\u00BFEs el nueve tu n\u00FAmero de la suerte?" }
  ],
  "der Berg": [
    { "de": "Der Berg ragt in den Himmel.", "es": "La monta\u00F1a se alza hacia el cielo." },
    { "de": "Wir sind im Urlaub auf den Berg gestiegen.", "es": "En vacaciones hemos subido a la monta\u00F1a." },
    { "de": "Hast du schon einen Berg bestiegen?", "es": "\u00BFHas escalado ya una monta\u00F1a?" }
  ],
  "Eltern": [
    { "de": "Meine Eltern wohnen in Hamburg.", "es": "Mis padres viven en Hamburgo." },
    { "de": "Die Eltern haben das Kinderzimmer gestrichen.", "es": "Los padres han pintado la habitaci\u00F3n de los ni\u00F1os." },
    { "de": "Besuchst du deine Eltern am Wochenende?", "es": "\u00BFVisitas a tus padres el fin de semana?" }
  ],
  "leisten": [
    { "de": "Ich muss mir mehr M\u00FChe leisten.", "es": "Tengo que esforzarme m\u00E1s." },
    { "de": "Er hat sich einen teuren Urlaub geleistet.", "es": "\u00C9l se ha permitido unas vacaciones caras." },
    { "de": "Leistest du dir oft neue Kleidung?", "es": "\u00BFTe compras ropa nueva a menudo?" }
  ],
  "scheiden": [
    { "de": "Das Gericht wird die Ehe scheiden.", "es": "El tribunal disolver\u00E1 el matrimonio." },
    { "de": "Sie haben sich nach zehn Jahren scheiden lassen.", "es": "Ellos se han divorciado despu\u00E9s de diez a\u00F1os." },
    { "de": "Scheiden tut weh, oder?", "es": "\u00BFEl divorcio duele, no?" }
  ],
  "sch\u00E4len": [
    { "de": "Du musst die Kartoffeln sch\u00E4len.", "es": "Tienes que pelar las patatas." },
    { "de": "Oma hat die \u00C4pfel f\u00FCr den Kuchen gesch\u00E4lt.", "es": "La abuela ha pelado las manzanas para la tarta." },
    { "de": "Sch\u00E4lst du die Gurke oder isst du sie mit Schale?", "es": "\u00BFPelas el pepino o lo comes con piel?" }
  ],
  "Arbeitserlaubnis": [
    { "de": "Die Arbeitserlaubnis ist zwei Jahre g\u00FCltig.", "es": "El permiso de trabajo es v\u00E1lido por dos a\u00F1os." },
    { "de": "Er hat endlich seine Arbeitserlaubnis erhalten.", "es": "\u00C9l ha recibido por fin su permiso de trabajo." },
    { "de": "Hast du deine Arbeitserlaubnis beantragt?", "es": "\u00BFHas solicitado tu permiso de trabajo?" }
  ],
  "Firmensitz": [
    { "de": "Der Firmensitz ist in Berlin.", "es": "La sede social est\u00E1 en Berl\u00EDn." },
    { "de": "Die Firma hat ihren Firmensitz verlegt.", "es": "La empresa ha trasladado su sede." },
    { "de": "Wei\u00DFt du, wo der Firmensitz ist?", "es": "\u00BFSabes d\u00F3nde est\u00E1 la sede?" }
  ],
  "Stirn": [
    { "de": "Meine Stirn ist hei\u00DF.", "es": "Mi frente est\u00E1 caliente." },
    { "de": "Die Mutter hat dem Kind die Stirn gek\u00FChlt.", "es": "La madre ha refrescado la frente del ni\u00F1o." },
    { "de": "Hast du Fieber? Deine Stirn gl\u00FCht.", "es": "\u00BFTienes fiebre? Tu frente arde." }
  ],
  "kleben": [
    { "de": "Das Etikett klebt auf der Flasche.", "es": "La etiqueta est\u00E1 pegada en la botella." },
    { "de": "Er hat die Briefmarke auf den Umschlag geklebt.", "es": "\u00C9l ha pegado el sello en el sobre." },
    { "de": "Klebst du das Poster mit Klebeband fest?", "es": "\u00BFPegas el p\u00F3ster con cinta adhesiva?" }
  ],
  "Marienk\u00E4fer": [
    { "de": "Der Marienk\u00E4fer hat sieben Punkte.", "es": "La mariquita tiene siete puntos." },
    { "de": "Ich habe einen Marienk\u00E4fer auf dem Blatt gefunden.", "es": "He encontrado una mariquita sobre la hoja." },
    { "de": "Bringt ein Marienk\u00E4fer Gl\u00FCck?", "es": "\u00BFTrae buena suerte una mariquita?" }
  ],
  "Ohrring": [
    { "de": "Mein Ohrring ist aus Silber.", "es": "Mi pendiente es de plata." },
    { "de": "Sie hat einen Ohrring im Bad verloren.", "es": "Ella ha perdido un pendiente en el ba\u00F1o." },
    { "de": "Tr\u00E4gst du jeden Tag Ohrringe?", "es": "\u00BFLlevas pendientes todos los d\u00EDas?" }
  ],
  "ernten": [
    { "de": "Der Bauer will morgen die Kartoffeln ernten.", "es": "El agricultor quiere cosechar ma\u00F1ana las patatas." },
    { "de": "Im Herbst haben wir \u00C4pfel geerntet.", "es": "En oto\u00F1o hemos cosechado manzanas." },
    { "de": "Erntest du dein eigenes Gem\u00FCse?", "es": "\u00BFCosechas tu propia verdura?" }
  ],
  "greifen": [
    { "de": "Das Baby will nach dem Spielzeug greifen.", "es": "El beb\u00E9 quiere agarrar el juguete." },
    { "de": "Er hat meine Hand gegriffen.", "es": "\u00C9l ha agarrado mi mano." },
    { "de": "Greifst du nach dem Seil?", "es": "\u00BFAgarra la cuerda?" }
  ],
  "Niere": [
    { "de": "Die Niere filtert das Blut.", "es": "El ri\u00F1\u00F3n filtra la sangre." },
    { "de": "Der Arzt hat meine Nieren untersucht.", "es": "El m\u00E9dico me ha examinado los ri\u00F1ones." },
    { "de": "Hast du Schmerzen in der Niere?", "es": "\u00BFTienes dolor de ri\u00F1ones?" }
  ],
  "K\u00E4fer": [
    { "de": "Der K\u00E4fer krabbelt \u00FCber das Blatt.", "es": "El escarabajo se arrastra sobre la hoja." },
    { "de": "Wir haben einen bunten K\u00E4fer im Wald gesehen.", "es": "Hemos visto un escarabajo de colores en el bosque." },
    { "de": "Hast du schon einen Maik\u00E4fer gefangen?", "es": "\u00BFHas atrapado ya un escarabajo de mayo?" }
  ],
  "der Schaffner": [
    { "de": "Der Schaffner kontrolliert die Fahrkarten.", "es": "El revisor controla los billetes." },
    { "de": "Ich habe dem Schaffner mein Ticket gezeigt.", "es": "Le he mostrado mi billete al revisor." },
    { "de": "Kommt der Schaffner noch?", "es": "\u00BFViene a\u00FAn el revisor?" }
  ],
  "hacken": [
    { "de": "Du musst die N\u00FCsse hacken.", "es": "Tienes que picar las nueces." },
    { "de": "Oma hat die Zwiebeln fein gehackt.", "es": "La abuela ha picado las cebollas finas." },
    { "de": "Hackst du das Gem\u00FCse mit einem Messer oder einer Maschine?", "es": "\u00BFPicas la verdura con cuchillo o a m\u00E1quina?" }
  ],
  "der Hut": [
    { "de": "Der Hut sch\u00FCtzt vor Sonne.", "es": "El sombrero protege del sol." },
    { "de": "Opa hat einen alten Filzhut getragen.", "es": "El abuelo ha llevado un viejo sombrero de fieltro." },
    { "de": "Setzt du im Sommer einen Hut auf?", "es": "\u00BFTe pones sombrero en verano?" }
  ],
  "das Mineralwasser": [
    { "de": "Das Mineralwasser ist mit Kohlens\u00E4ure.", "es": "El agua mineral es con gas." },
    { "de": "Ich habe zwei Flaschen Mineralwasser gekauft.", "es": "He comprado dos botellas de agua mineral." },
    { "de": "Trinkst du lieber stilles oder sprudelndes Mineralwasser?", "es": "\u00BFPrefieres agua mineral sin gas o con gas?" }
  ],
  "Galle": [
    { "de": "Die Galle hilft bei der Fettverdauung.", "es": "La bilis ayuda en la digesti\u00F3n de las grasas." },
    { "de": "Der Arzt hat meine Galle untersucht.", "es": "El m\u00E9dico me ha examinado la bilis." },
    { "de": "Hast du Probleme mit der Galle?", "es": "\u00BFTienes problemas de la ves\u00EDcula?" }
  ],
  "Einkaufszentrum": [
    { "de": "Das Einkaufszentrum hat bis acht ge\u00F6ffnet.", "es": "El centro comercial est\u00E1 abierto hasta las ocho." },
    { "de": "Wir sind am Samstag ins Einkaufszentrum gefahren.", "es": "El s\u00E1bado fuimos al centro comercial." },
    { "de": "Gehst du gern ins Einkaufszentrum?", "es": "\u00BFTe gusta ir al centro comercial?" }
  ],
  "Verabredung": [
    { "de": "Die Verabredung ist um sieben.", "es": "La cita es a las siete." },
    { "de": "Ich habe die Verabredung leider verpasst.", "es": "Por desgracia he faltado a la cita." },
    { "de": "Hast du heute Abend eine Verabredung?", "es": "\u00BFTienes una cita esta noche?" }
  ],
  "Kirsche": [
    { "de": "Die Kirsche ist reif.", "es": "La cereza est\u00E1 madura." },
    { "de": "Wir haben Kirschen vom Baum gepfl\u00FCckt.", "es": "Hemos recogido cerezas del \u00E1rbol." },
    { "de": "Backst du einen Kirschkuchen?", "es": "\u00BFHorneas una tarta de cerezas?" }
  ],
  "Vormittag": [
    { "de": "Der Vormittag vergeht schnell.", "es": "La ma\u00F1ana pasa r\u00E1pido." },
    { "de": "Am Vormittag habe ich E-Mails beantwortet.", "es": "Por la ma\u00F1ana he contestado correos electr\u00F3nicos." },
    { "de": "Hast du am Vormittag Zeit?", "es": "\u00BFTienes tiempo por la ma\u00F1ana?" }
  ],
  "Handfl\u00E4che": [
    { "de": "Meine Handfl\u00E4che ist verschwitzt.", "es": "Mi palma de la mano est\u00E1 sudada." },
    { "de": "Sie hat die M\u00FCnze in die Handfl\u00E4che genommen.", "es": "Ella ha cogido la moneda en la palma de la mano." },
    { "de": "Zeigst du mir deine Handfl\u00E4che?", "es": "\u00BFMe muestras la palma de tu mano?" }
  ],
  "Notiz": [
    { "de": "Die Notiz klebt am Spiegel.", "es": "La nota est\u00E1 pegada en el espejo." },
    { "de": "Ich habe mir eine Notiz auf dem Handy gemacht.", "es": "Me he apuntado una nota en el m\u00F3vil." },
    { "de": "Hast du die Notiz gelesen?", "es": "\u00BFHas le\u00EDdo la nota?" }
  ],
  "der Delfin": [
    { "de": "Der Delfin springt aus dem Wasser.", "es": "El delf\u00EDn salta fuera del agua." },
    { "de": "Bei der Bootstour haben wir Delfine gesehen.", "es": "En la excursi\u00F3n en barco hemos visto delfines." },
    { "de": "Kann man mit Delfinen schwimmen?", "es": "\u00BFSe puede nadar con delfines?" }
  ],
  "gedenken": [
    { "de": "Wir gedenken der Opfer des Krieges.", "es": "Conmemoramos a las v\u00EDctimas de la guerra." },
    { "de": "Die Stadt hat der Toten gedacht.", "es": "La ciudad ha conmemorado a los fallecidos." },
    { "de": "Gedenkst du der Verstorbenen an diesem Tag?", "es": "\u00BFConmemoras a los difuntos en este d\u00EDa?" }
  ],
  "Bus": [
    { "de": "Der Bus ist heute zu sp\u00E4t.", "es": "El autob\u00FAs llega hoy tarde." },
    { "de": "Ich habe den Bus um eine Minute verpasst.", "es": "He perdido el autob\u00FAs por un minuto." },
    { "de": "Nimmst du den Bus zur Arbeit?", "es": "\u00BFTomas el autob\u00FAs para ir al trabajo?" }
  ],
  "Auto": [
    { "de": "Mein Auto braucht neuen T\u00DCV.", "es": "Mi coche necesita pasar la ITV." },
    { "de": "Er hat das Auto gestern gewaschen.", "es": "\u00C9l ha lavado el coche ayer." },
    { "de": "F\u00E4hrst du mit dem Auto in den Urlaub?", "es": "\u00BFVas en coche de vacaciones?" }
  ],
  "versammeln": [
    { "de": "Der Chef will das Team versammeln.", "es": "El jefe quiere reunir al equipo." },
    { "de": "Wir haben uns im Besprechungsraum versammelt.", "es": "Nos hemos reunido en la sala de reuniones." },
    { "de": "Versammelt ihr euch jeden Morgen?", "es": "\u00BFOs reun\u00EDs todas las ma\u00F1anas?" }
  ],
  "die Zwei": [
    { "de": "Die Zwei ist eine niedrige Zahl.", "es": "El dos es un n\u00FAmero bajo." },
    { "de": "Ich habe eine Zwei in der Klassenarbeit geschrieben.", "es": "He sacado un dos en el examen de clase." },
    { "de": "Ist die Zwei deine Gl\u00FCckszahl?", "es": "\u00BFEs el dos tu n\u00FAmero de la suerte?" }
  ],
  "Niederlassung": [
    { "de": "Die Niederlassung wurde letztes Jahr er\u00F6ffnet.", "es": "La sucursal fue inaugurada el a\u00F1o pasado." },
    { "de": "Die Firma hat eine neue Niederlassung in K\u00F6ln gegr\u00FCndet.", "es": "La empresa ha abierto una nueva sucursal en Colonia." },
    { "de": "Arbeitest du in der Hauptniederlassung?", "es": "\u00BFTrabajas en la sucursal principal?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block24 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 24 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);