const fs = require("fs");

// Cargar archivo existente (bloques 1-6)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 7: palabras 301 a 350
const block7 = {
  "k\u00E4mpfen": [
    { "de": "Wir m\u00FCssen f\u00FCr unsere Rechte k\u00E4mpfen.", "es": "Tenemos que luchar por nuestros derechos." },
    { "de": "Er hat tapfer gegen die Krankheit gek\u00E4mpft.", "es": "\u00C9l ha luchado valientemente contra la enfermedad." },
    { "de": "K\u00E4mpfst du f\u00FCr deine Tr\u00E4ume?", "es": "\u00BFLuchas por tus sue\u00F1os?" }
  ],
  "Sofa": [
    { "de": "Das Sofa ist sehr bequem.", "es": "El sof\u00E1 es muy c\u00F3modo." },
    { "de": "Die Katze hat auf dem Sofa geschlafen.", "es": "El gato ha dormido en el sof\u00E1." },
    { "de": "Darf ich mich auf das Sofa setzen?", "es": "\u00BFPuedo sentarme en el sof\u00E1?" }
  ],
  "Satz": [
    { "de": "Der Satz ist grammatikalisch richtig.", "es": "La oraci\u00F3n es gramaticalmente correcta." },
    { "de": "Ich habe den Satz zweimal gelesen.", "es": "He le\u00EDdo la oraci\u00F3n dos veces." },
    { "de": "Kannst du diesen Satz \u00FCbersetzen?", "es": "\u00BFPuedes traducir esta oraci\u00F3n?" }
  ],
  "Frage": [
    { "de": "Die Frage ist schwierig.", "es": "La pregunta es dif\u00EDcil." },
    { "de": "Der Lehrer hat eine leichte Frage gestellt.", "es": "El profesor ha hecho una pregunta f\u00E1cil." },
    { "de": "Hast du eine Frage an mich?", "es": "\u00BFTienes una pregunta para m\u00ED?" }
  ],
  "Drossel": [
    { "de": "Die Drossel singt wundersch\u00F6n.", "es": "El tordo canta maravillosamente." },
    { "de": "Ich habe eine Drossel im Garten geh\u00F6rt.", "es": "He o\u00EDdo un tordo en el jard\u00EDn." },
    { "de": "Siehst du die Drossel auf dem Baum?", "es": "\u00BFVes el tordo en el \u00E1rbol?" }
  ],
  "Regenwurm": [
    { "de": "Der Regenwurm lebt in der Erde.", "es": "La lombriz vive en la tierra." },
    { "de": "Nach dem Regen haben wir viele Regenw\u00FCrmer gesehen.", "es": "Despu\u00E9s de la lluvia hemos visto muchas lombrices." },
    { "de": "Hast du schon einen Regenwurm gehalten?", "es": "\u00BFHas tenido ya una lombriz en la mano?" }
  ],
  "k\u00FCnstlich": [
    { "de": "Der Weihnachtsbaum ist k\u00FCnstlich.", "es": "El \u00E1rbol de Navidad es artificial." },
    { "de": "Sie hat sich k\u00FCnstliche Wimpern gekauft.", "es": "Ella se ha comprado pesta\u00F1as artificiales." },
    { "de": "Findest du k\u00FCnstliche Blumen sch\u00F6n?", "es": "\u00BFEncuentras bonitas las flores artificiales?" }
  ],
  "Strohhalm": [
    { "de": "Der Strohhalm ist aus Papier.", "es": "La pajita es de papel." },
    { "de": "Ich habe den Saft mit einem Strohhalm getrunken.", "es": "He bebido el zumo con una pajita." },
    { "de": "Kannst du mir einen Strohhalm geben?", "es": "\u00BFPuedes darme una pajita?" }
  ],
  "die Milch": [
    { "de": "Die Milch ist frisch vom Bauern.", "es": "La leche es fresca del granjero." },
    { "de": "Ich habe die Milch in den K\u00FChlschrank gestellt.", "es": "He puesto la leche en la nevera." },
    { "de": "Trinkst du gern kalte Milch?", "es": "\u00BFTe gusta beber leche fr\u00EDa?" }
  ],
  "einr\u00E4umen": [
    { "de": "Du musst den Geschirrsp\u00FCler einr\u00E4umen.", "es": "Tienes que colocar el lavavajillas." },
    { "de": "Er hat die B\u00FCcher ins Regal einger\u00E4umt.", "es": "\u00C9l ha colocado los libros en la estanter\u00EDa." },
    { "de": "R\u00E4umst du bitte die Teller ein?", "es": "\u00BFColocas los platos, por favor?" }
  ],
  "Pinsel": [
    { "de": "Der Pinsel ist sauber.", "es": "El pincel est\u00E1 limpio." },
    { "de": "Das Kind hat mit dem Pinsel ein Bild gemalt.", "es": "El ni\u00F1o ha pintado un cuadro con el pincel." },
    { "de": "Kannst du mir deinen Pinsel leihen?", "es": "\u00BFPuedes prestarme tu pincel?" }
  ],
  "der Reis": [
    { "de": "Der Reis kocht in zehn Minuten.", "es": "El arroz se cuece en diez minutos." },
    { "de": "Wir haben Reis mit Gem\u00FCse gegessen.", "es": "Hemos comido arroz con verdura." },
    { "de": "Kochst du gern Reis?", "es": "\u00BFTe gusta cocinar arroz?" }
  ],
  "das \u00D6l": [
    { "de": "Das \u00D6l ist aus Oliven.", "es": "El aceite es de oliva." },
    { "de": "Ich habe das \u00D6l in die Pfanne gegossen.", "es": "He echado el aceite en la sart\u00E9n." },
    { "de": "Benutzt du Oliven\u00F6l oder Sonnenblumen\u00F6l?", "es": "\u00BFUsas aceite de oliva o de girasol?" }
  ],
  "garantieren": [
    { "de": "Der Hersteller muss die Qualit\u00E4t garantieren.", "es": "El fabricante tiene que garantizar la calidad." },
    { "de": "Sie haben mir eine R\u00FCckerstattung garantiert.", "es": "Me han garantizado un reembolso." },
    { "de": "Garantierst du, dass es funktioniert?", "es": "\u00BFGarantizas que funciona?" }
  ],
  "Gans": [
    { "de": "Die Gans ist sehr gro\u00DF.", "es": "El ganso es muy grande." },
    { "de": "Zu Weihnachten haben wir eine Gans gebraten.", "es": "En Navidad hemos asado un ganso." },
    { "de": "Hast du schon eine Gans gef\u00FCttert?", "es": "\u00BFHas dado ya de comer a un ganso?" }
  ],
  "das Jahrzehnt": [
    { "de": "Das letzte Jahrzehnt war ereignisreich.", "es": "La \u00FAltima d\u00E9cada fue muy movida." },
    { "de": "In diesem Jahrzehnt ist viel passiert.", "es": "En esta d\u00E9cada ha pasado mucho." },
    { "de": "Erinnerst du dich an das Jahrzehnt der Achtziger?", "es": "\u00BFTe acuerdas de la d\u00E9cada de los ochenta?" }
  ],
  "der Bademantel": [
    { "de": "Der Bademantel ist flauschig.", "es": "El albornoz es esponjoso." },
    { "de": "Nach dem Duschen habe ich den Bademantel angezogen.", "es": "Despu\u00E9s de ducharme me he puesto el albornoz." },
    { "de": "Nimmst du deinen Bademantel mit ins Schwimmbad?", "es": "\u00BFTe llevas el albornoz a la piscina?" }
  ],
  "siebzehn": [
    { "de": "Siebzehn ist eine Primzahl.", "es": "Diecisiete es un n\u00FAmero primo." },
    { "de": "Sie ist gestern siebzehn geworden.", "es": "Ella cumpli\u00F3 ayer diecisiete a\u00F1os." },
    { "de": "Hast du mit siebzehn den F\u00FChrerschein gemacht?", "es": "\u00BFTe sacaste el carnet de conducir con diecisiete?" }
  ],
  "mastered": [
    { "de": "\"mastered\" ist ein englisches Wort.", "es": "\"mastered\" es una palabra inglesa." },
    { "de": "Auf Deutsch bedeutet \"mastered\" gemeistert.", "es": "En alem\u00E1n \"mastered\" significa dominado." },
    { "de": "Hast du das Thema gemeistert?", "es": "\u00BFHas dominado el tema?" }
  ],
  "nach": [
    { "de": "Nach der Arbeit gehe ich ins Fitnessstudio.", "es": "Despu\u00E9s del trabajo voy al gimnasio." },
    { "de": "Wir sind nach dem Abendessen spazieren gegangen.", "es": "Despu\u00E9s de la cena hemos ido a pasear." },
    { "de": "F\u00E4hrst du nach dem Urlaub wieder nach Hause?", "es": "\u00BFVuelves a casa despu\u00E9s de las vacaciones?" }
  ],
  "das Ei": [
    { "de": "Das Ei ist frisch gelegt.", "es": "El huevo es reci\u00E9n puesto." },
    { "de": "Ich habe mir ein Ei zum Fr\u00FChst\u00FCck gebraten.", "es": "Me he frito un huevo para el desayuno." },
    { "de": "M\u00F6chtest du ein weich gekochtes Ei?", "es": "\u00BFQuieres un huevo pasado por agua?" }
  ],
  "Reis": [
    { "de": "Der Reis ist noch hart.", "es": "El arroz todav\u00EDa est\u00E1 duro." },
    { "de": "Wir haben den Reis im Reiskocher zubereitet.", "es": "Hemos preparado el arroz en la arrocera." },
    { "de": "Kochst du den Reis ohne Salz?", "es": "\u00BFCueces el arroz sin sal?" }
  ],
  "Sch\u00FCrze": [
    { "de": "Die Sch\u00FCrze sch\u00FCtzt die Kleidung.", "es": "El delantal protege la ropa." },
    { "de": "Oma hat sich die Sch\u00FCrze umgebunden.", "es": "La abuela se ha atado el delantal." },
    { "de": "Tr\u00E4gst du eine Sch\u00FCrze beim Kochen?", "es": "\u00BFLlevas delantal al cocinar?" }
  ],
  "der G\u00FCrtel": [
    { "de": "Der G\u00FCrtel ist aus Leder.", "es": "El cintur\u00F3n es de cuero." },
    { "de": "Ich habe mir einen neuen G\u00FCrtel gekauft.", "es": "Me he comprado un cintur\u00F3n nuevo." },
    { "de": "Passt der G\u00FCrtel zur Hose?", "es": "\u00BFCombina el cintur\u00F3n con el pantal\u00F3n?" }
  ],
  "bestreuen": [
    { "de": "Du sollst den Kuchen mit Puderzucker bestreuen.", "es": "Debes espolvorear la tarta con az\u00FAcar glas." },
    { "de": "Er hat die Br\u00F6tchen mit K\u00FCrbiskernen bestreut.", "es": "\u00C9l ha espolvoreado los panecillos con semillas de calabaza." },
    { "de": "Bestreust du deinen Kaffee mit Zimt?", "es": "\u00BFEspolvoreas tu caf\u00E9 con canela?" }
  ],
  "der Wolf": [
    { "de": "Der Wolf heult den Mond an.", "es": "El lobo a\u00FAlla a la luna." },
    { "de": "Im M\u00E4rchen hat der Wolf die Gro\u00DFmutter gefressen.", "es": "En el cuento el lobo se ha comido a la abuela." },
    { "de": "Hast du schon einen Wolf in der Natur gesehen?", "es": "\u00BFHas visto ya un lobo en la naturaleza?" }
  ],
  "Pudding": [
    { "de": "Der Pudding ist noch warm.", "es": "El pud\u00EDn est\u00E1 a\u00FAn caliente." },
    { "de": "Zum Nachtisch hat es Schokoladenpudding gegeben.", "es": "De postre ha habido pud\u00EDn de chocolate." },
    { "de": "Magst du Vanillepudding?", "es": "\u00BFTe gusta el pud\u00EDn de vainilla?" }
  ],
  "Lineal": [
    { "de": "Das Lineal ist aus Kunststoff.", "es": "La regla es de pl\u00E1stico." },
    { "de": "Ich habe eine gerade Linie mit dem Lineal gezogen.", "es": "He trazado una l\u00EDnea recta con la regla." },
    { "de": "Kannst du mir dein Lineal leihen?", "es": "\u00BFPuedes prestarme tu regla?" }
  ],
  "klettern": [
    { "de": "Die Kinder klettern auf den Baum.", "es": "Los ni\u00F1os trepan al \u00E1rbol." },
    { "de": "Wir sind im Urlaub auf einen Berg geklettert.", "es": "En vacaciones hemos trepado a una monta\u00F1a." },
    { "de": "Kletterst du gern?", "es": "\u00BFTe gusta trepar?" }
  ],
  "Keller": [
    { "de": "Der Keller ist k\u00FChl und dunkel.", "es": "El s\u00F3tano es fresco y oscuro." },
    { "de": "Wir haben den Wein im Keller gelagert.", "es": "Hemos almacenado el vino en el s\u00F3tano." },
    { "de": "Gehst du in den Keller?", "es": "\u00BFBajas al s\u00F3tano?" }
  ],
  "Dach": [
    { "de": "Das Dach ist mit Ziegeln gedeckt.", "es": "El tejado est\u00E1 cubierto con tejas." },
    { "de": "Der Sturm hat das Dach besch\u00E4digt.", "es": "La tormenta ha da\u00F1ado el tejado." },
    { "de": "Ist das Dach repariert?", "es": "\u00BFEst\u00E1 reparado el tejado?" }
  ],
  "Feuer": [
    { "de": "Das Feuer brennt im Kamin.", "es": "El fuego arde en la chimenea." },
    { "de": "Die Kinder haben ein Feuer im Garten gemacht.", "es": "Los ni\u00F1os han hecho un fuego en el jard\u00EDn." },
    { "de": "Hast du schon ein Feuer gel\u00F6scht?", "es": "\u00BFHas apagado ya un fuego?" }
  ],
  "Tiefe": [
    { "de": "Die Tiefe des Sees ist unbekannt.", "es": "La profundidad del lago es desconocida." },
    { "de": "Der Taucher hat die Tiefe gemessen.", "es": "El buceador ha medido la profundidad." },
    { "de": "Wei\u00DFt du, wie gro\u00DF die Tiefe hier ist?", "es": "\u00BFSabes cu\u00E1nta profundidad hay aqu\u00ED?" }
  ],
  "Krone": [
    { "de": "Die Krone gl\u00E4nzt im Sonnenlicht.", "es": "La corona brilla a la luz del sol." },
    { "de": "Der K\u00F6nig hat eine goldene Krone getragen.", "es": "El rey ha llevado una corona de oro." },
    { "de": "Hast du die Krone im Museum gesehen?", "es": "\u00BFHas visto la corona en el museo?" }
  ],
  "Berg": [
    { "de": "Der Berg ist mit Schnee bedeckt.", "es": "La monta\u00F1a est\u00E1 cubierta de nieve." },
    { "de": "Wir sind auf den h\u00F6chsten Berg gestiegen.", "es": "Hemos subido a la monta\u00F1a m\u00E1s alta." },
    { "de": "Wanderst du gern im Berg?", "es": "\u00BFTe gusta hacer senderismo en la monta\u00F1a?" }
  ],
  "Wald": [
    { "de": "Der Wald ist geheimnisvoll.", "es": "El bosque es misterioso." },
    { "de": "Im Herbst haben wir Pilze im Wald gesammelt.", "es": "En oto\u00F1o hemos recogido setas en el bosque." },
    { "de": "Gehst du gern im Wald spazieren?", "es": "\u00BFTe gusta pasear por el bosque?" }
  ],
  "Abendessen": [
    { "de": "Das Abendessen schmeckt fantastisch.", "es": "La cena sabe fant\u00E1stica." },
    { "de": "Mama hat ein warmes Abendessen zubereitet.", "es": "Mam\u00E1 ha preparado una cena caliente." },
    { "de": "Um wie viel Uhr gibt es Abendessen?", "es": "\u00BFA qu\u00E9 hora se cena?" }
  ],
  "Suppe": [
    { "de": "Die Suppe ist noch zu hei\u00DF.", "es": "La sopa est\u00E1 a\u00FAn demasiado caliente." },
    { "de": "Ich habe eine Tomatensuppe gekocht.", "es": "He cocinado una sopa de tomate." },
    { "de": "M\u00F6chtest du etwas Brot zur Suppe?", "es": "\u00BFQuieres un poco de pan con la sopa?" }
  ],
  "bestellen": [
    { "de": "Ich will eine Pizza bestellen.", "es": "Quiero pedir una pizza." },
    { "de": "Er hat die Ware im Internet bestellt.", "es": "\u00C9l ha pedido el art\u00EDculo por internet." },
    { "de": "Bestellst du das Essen f\u00FCr uns?", "es": "\u00BFPides la comida para nosotros?" }
  ],
  "schenken": [
    { "de": "Ich m\u00F6chte dir Blumen schenken.", "es": "Quiero regalarte flores." },
    { "de": "Oma hat mir eine Uhr geschenkt.", "es": "La abuela me ha regalado un reloj." },
    { "de": "Schenkst du deiner Mutter etwas zum Geburtstag?", "es": "\u00BFLe regalas algo a tu madre por su cumplea\u00F1os?" }
  ],
  "Zahnpasta": [
    { "de": "Die Zahnpasta ist mit Fluorid.", "es": "La pasta dent\u00EDfrica lleva fl\u00FAor." },
    { "de": "Ich habe die Zahnpasta im Supermarkt gekauft.", "es": "He comprado la pasta dent\u00EDfrica en el supermercado." },
    { "de": "Benutzt du eine Zahnpasta f\u00FCr empfindliche Z\u00E4hne?", "es": "\u00BFUsas una pasta dent\u00EDfrica para dientes sensibles?" }
  ],
  "Armband": [
    { "de": "Das Armband ist handgemacht.", "es": "La pulsera es artesanal." },
    { "de": "Sie hat ein goldenes Armband geschenkt bekommen.", "es": "A ella le han regalado una pulsera de oro." },
    { "de": "Tr\u00E4gst du dein Armband jeden Tag?", "es": "\u00BFLlevas tu pulsera todos los d\u00EDas?" }
  ],
  "die Suppe": [
    { "de": "Die Suppe riecht nach frischem Gem\u00FCse.", "es": "La sopa huele a verdura fresca." },
    { "de": "Er hat die Suppe mit einem L\u00F6ffel gegessen.", "es": "\u00C9l se ha comido la sopa con una cuchara." },
    { "de": "Kochst du die Suppe selbst?", "es": "\u00BFCocinas la sopa t\u00FA mismo?" }
  ],
  "Fu\u00DFg\u00E4ngerzone": [
    { "de": "Die Fu\u00DFg\u00E4ngerzone ist belebt.", "es": "La zona peatonal est\u00E1 animada." },
    { "de": "Wir sind durch die Fu\u00DFg\u00E4ngerzone gebummelt.", "es": "Hemos paseado por la zona peatonal." },
    { "de": "Gibt es hier eine Fu\u00DFg\u00E4ngerzone?", "es": "\u00BFHay una zona peatonal aqu\u00ED?" }
  ],
  "die Jacke": [
    { "de": "Die Jacke ist wasserdicht.", "es": "La chaqueta es impermeable." },
    { "de": "Ich habe die Jacke im Schrank aufgeh\u00E4ngt.", "es": "He colgado la chaqueta en el armario." },
    { "de": "Ziehst du eine Jacke an? Es ist kalt.", "es": "\u00BFTe pones una chaqueta? Hace fr\u00EDo." }
  ],
  "Halskette": [
    { "de": "Die Halskette glitzert.", "es": "El collar brilla." },
    { "de": "Mein Freund hat mir eine Halskette geschenkt.", "es": "Mi amigo me ha regalado un collar." },
    { "de": "Gef\u00E4llt dir meine neue Halskette?", "es": "\u00BFTe gusta mi collar nuevo?" }
  ],
  "Geschenkpapier": [
    { "de": "Das Geschenkpapier ist bunt.", "es": "El papel de regalo es colorido." },
    { "de": "Ich habe das Buch in Geschenkpapier eingepackt.", "es": "He envuelto el libro en papel de regalo." },
    { "de": "Hast du noch Geschenkpapier \u00FCbrig?", "es": "\u00BFTe sobra papel de regalo?" }
  ],
  "Mutterschutz": [
    { "de": "Der Mutterschutz beginnt vor der Geburt.", "es": "La protecci\u00F3n maternal empieza antes del parto." },
    { "de": "Die Regierung hat den Mutterschutz verbessert.", "es": "El gobierno ha mejorado la protecci\u00F3n maternal." },
    { "de": "Gilt der Mutterschutz auch f\u00FCr Selbstst\u00E4ndige?", "es": "\u00BFLa protecci\u00F3n maternal tambi\u00E9n es v\u00E1lida para aut\u00F3nomos?" }
  ],
  "Korb": [
    { "de": "Der Korb ist voller \u00C4pfel.", "es": "La cesta est\u00E1 llena de manzanas." },
    { "de": "Wir haben einen Korb beim Picknick benutzt.", "es": "Hemos usado una cesta en el p\u00EDcnic." },
    { "de": "Kannst du den Korb tragen?", "es": "\u00BFPuedes llevar la cesta?" }
  ],
  "die Praxis": [
    { "de": "Die Praxis ist am Montag geschlossen.", "es": "El consultorio est\u00E1 cerrado el lunes." },
    { "de": "Ich habe einen Termin in der Praxis gemacht.", "es": "He pedido cita en el consultorio." },
    { "de": "Arbeitet Dr. M\u00FCller in dieser Praxis?", "es": "\u00BFTrabaja el Dr. M\u00FCller en este consultorio?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block7 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 7 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);