const fs = require("fs");

// Cargar archivo existente (bloques 1-16)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 17: palabras 801 a 850
const block17 = {
  "Daumen": [
    { "de": "Mein Daumen ist geschwollen.", "es": "Mi pulgar est\u00E1 hinchado." },
    { "de": "Ich habe mir den Daumen am Hammer gesto\u00DFen.", "es": "Me he golpeado el pulgar con el martillo." },
    { "de": "Kannst du deinen Daumen bewegen?", "es": "\u00BFPuedes mover el pulgar?" }
  ],
  "Handschuh": [
    { "de": "Der Handschuh ist aus Leder.", "es": "El guante es de cuero." },
    { "de": "Ich habe einen Handschuh im Bus verloren.", "es": "He perdido un guante en el autob\u00FAs." },
    { "de": "Tr\u00E4gst du im Winter Handschuhe?", "es": "\u00BFLlevas guantes en invierno?" }
  ],
  "der Regenschirm": [
    { "de": "Der Regenschirm ist kaputt.", "es": "El paraguas est\u00E1 roto." },
    { "de": "Ich habe den Regenschirm im Caf\u00E9 vergessen.", "es": "He olvidado el paraguas en la cafeter\u00EDa." },
    { "de": "Nimmst du einen Regenschirm mit?", "es": "\u00BFLlevas un paraguas?" }
  ],
  "das Brot": [
    { "de": "Das Brot ist knusprig.", "es": "El pan est\u00E1 crujiente." },
    { "de": "Ich habe frisches Brot beim B\u00E4cker geholt.", "es": "He comprado pan fresco en la panader\u00EDa." },
    { "de": "Schneidest du das Brot in Scheiben?", "es": "\u00BFCortas el pan en rebanadas?" }
  ],
  "Finger": [
    { "de": "Mein kleiner Finger tut weh.", "es": "Mi dedo me\u00F1ique me duele." },
    { "de": "Sie hat sich den Finger in der T\u00FCr eingeklemmt.", "es": "Ella se ha pillado el dedo con la puerta." },
    { "de": "Z\u00E4hlst du mit den Fingern?", "es": "\u00BFCuentas con los dedos?" }
  ],
  "Lohnsteuer": [
    { "de": "Die Lohnsteuer wird direkt abgezogen.", "es": "El impuesto sobre salarios se descuenta directamente." },
    { "de": "Der Arbeitgeber hat die Lohnsteuer an das Finanzamt abgef\u00FChrt.", "es": "El empleador ha transferido el impuesto sobre salarios a Hacienda." },
    { "de": "Wei\u00DFt du, wie hoch deine Lohnsteuer ist?", "es": "\u00BFSabes cu\u00E1nto es tu impuesto sobre salarios?" }
  ],
  "der Kuchen": [
    { "de": "Der Kuchen duftet nach Zimt.", "es": "El pastel huele a canela." },
    { "de": "Oma hat einen Kuchen f\u00FCr das Fest gebacken.", "es": "La abuela ha horneado un pastel para la fiesta." },
    { "de": "M\u00F6chtest du ein St\u00FCck Kuchen?", "es": "\u00BFQuieres un trozo de pastel?" }
  ],
  "Fahrstuhl": [
    { "de": "Der Fahrstuhl ist au\u00DFer Betrieb.", "es": "El ascensor est\u00E1 fuera de servicio." },
    { "de": "Wir sind mit dem Fahrstuhl in den sechsten Stock gefahren.", "es": "Hemos subido en el ascensor al sexto piso." },
    { "de": "Nimmst du den Fahrstuhl oder die Treppe?", "es": "\u00BFTomas el ascensor o las escaleras?" }
  ],
  "der Hai": [
    { "de": "Der Hai ist ein gef\u00E4hrliches Raubtier.", "es": "El tibur\u00F3n es un depredador peligroso." },
    { "de": "Beim Tauchen haben wir einen Hai gesehen.", "es": "Buceando hemos visto un tibur\u00F3n." },
    { "de": "Hast du Angst vor Haien?", "es": "\u00BFTienes miedo a los tiburones?" }
  ],
  "Fr\u00FChschicht": [
    { "de": "Die Fr\u00FChschicht beginnt um f\u00FCnf.", "es": "El turno de ma\u00F1ana empieza a las cinco." },
    { "de": "Mein Mann hat diese Woche Fr\u00FChschicht gearbeitet.", "es": "Mi marido ha trabajado esta semana en el turno de ma\u00F1ana." },
    { "de": "Arbeitest du lieber Fr\u00FChschicht oder Sp\u00E4tschicht?", "es": "\u00BFPrefieres trabajar turno de ma\u00F1ana o de tarde?" }
  ],
  "Oberschenkel": [
    { "de": "Mein Oberschenkel ist kr\u00E4ftig.", "es": "Mi muslo es fuerte." },
    { "de": "Ich habe mir den Oberschenkel beim Fu\u00DFball gezerrt.", "es": "Me he distendido el muslo jugando al f\u00FAtbol." },
    { "de": "Trainierst du deine Oberschenkel im Fitnessstudio?", "es": "\u00BFEntrenas los muslos en el gimnasio?" }
  ],
  "Ersparnis": [
    { "de": "Die Ersparnis ist betr\u00E4chtlich.", "es": "El ahorro es considerable." },
    { "de": "Wir haben durch den Sale eine gro\u00DFe Ersparnis erzielt.", "es": "Con las rebajas hemos conseguido un gran ahorro." },
    { "de": "Hast du eine Ersparnis f\u00FCr Notf\u00E4lle?", "es": "\u00BFTienes ahorros para emergencias?" }
  ],
  "der Schlafanzug": [
    { "de": "Der Schlafanzug ist kuschelig.", "es": "El pijama es suave." },
    { "de": "Das Kind hat seinen Schlafanzug schon angezogen.", "es": "El ni\u00F1o ya se ha puesto el pijama." },
    { "de": "Nimmst du deinen Schlafanzug mit ins Ferienlager?", "es": "\u00BFTe llevas el pijama al campamento de vacaciones?" }
  ],
  "die Terrasse": [
    { "de": "Die Terrasse ist sonnig.", "es": "La terraza est\u00E1 soleada." },
    { "de": "Wir haben auf der Terrasse gegrillt.", "es": "Hemos hecho barbacoa en la terraza." },
    { "de": "Hast du Blumen auf deiner Terrasse?", "es": "\u00BFTienes flores en tu terraza?" }
  ],
  "jung": [
    { "de": "Meine Schwester ist noch jung.", "es": "Mi hermana a\u00FAn es joven." },
    { "de": "Er hat sich jung gef\u00FChlt.", "es": "\u00C9l se ha sentido joven." },
    { "de": "Bleibst du f\u00FCr immer jung?", "es": "\u00BFTe mantienes joven para siempre?" }
  ],
  "fleißig": [
    { "de": "Der Student ist fleißig.", "es": "El estudiante es trabajador." },
    { "de": "Sie hat fleißig f\u00FCr die Pr\u00FCfung gelernt.", "es": "Ella ha estudiado con diligencia para el examen." },
    { "de": "Bist du immer so fleißig?", "es": "\u00BFEs siempre tan trabajador?" }
  ],
  "vorgestern": [
    { "de": "Vorgestern war das Wetter schlecht.", "es": "Anteayer hizo mal tiempo." },
    { "de": "Ich habe vorgestern ein tolles Buch gelesen.", "es": "Anteayer le\u00ED un libro estupendo." },
    { "de": "Warst du vorgestern im Kino?", "es": "\u00BFEstuviste anteayer en el cine?" }
  ],
  "erscheinen": [
    { "de": "Der Stern erscheint am Himmel.", "es": "La estrella aparece en el cielo." },
    { "de": "Die neue Ausgabe ist gestern erschienen.", "es": "La nueva edici\u00F3n ha aparecido ayer." },
    { "de": "Erscheint die Zeitschrift jeden Monat?", "es": "\u00BFAparece la revista cada mes?" }
  ],
  "gewiss": [
    { "de": "Der Sieg ist uns gewiss.", "es": "La victoria es cierta para nosotros." },
    { "de": "Ich bin mir des Erfolgs gewiss.", "es": "Estoy seguro del \u00E9xito." },
    { "de": "Bist du deiner Sache gewiss?", "es": "\u00BFEst\u00E1s seguro de tu asunto?" }
  ],
  "arbeiten": [
    { "de": "Ich muss heute l\u00E4nger arbeiten.", "es": "Hoy tengo que trabajar m\u00E1s tiempo." },
    { "de": "Er hat zehn Stunden am St\u00FCck gearbeitet.", "es": "\u00C9l ha trabajado diez horas seguidas." },
    { "de": "Arbeitest du am Computer?", "es": "\u00BFTrabajas con el ordenador?" }
  ],
  "kochen": [
    { "de": "Ich will heute Abend kochen.", "es": "Quiero cocinar esta noche." },
    { "de": "Gestern habe ich eine Lasagne gekocht.", "es": "Ayer cocin\u00E9 una lasa\u00F1a." },
    { "de": "Kochst du gern f\u00FCr Freunde?", "es": "\u00BFTe gusta cocinar para los amigos?" }
  ],
  "Turnschuh": [
    { "de": "Mein Turnschuh ist zu eng.", "es": "Mi zapatilla de deporte est\u00E1 demasiado ajustada." },
    { "de": "Ich habe neue Turnschuhe f\u00FCr den Sportunterricht gekauft.", "es": "He comprado zapatillas de deporte nuevas para la clase de gimnasia." },
    { "de": "Tr\u00E4gst du Turnschuhe in der Freizeit?", "es": "\u00BFLlevas zapatillas de deporte en tu tiempo libre?" }
  ],
  "la ventana": [
    { "de": "\"la ventana\" ist ein spanisches Wort.", "es": "\"la ventana\" es una palabra espa\u00F1ola." },
    { "de": "Auf Deutsch hei\u00DFt \"la ventana\" das Fenster.", "es": "En alem\u00E1n \"la ventana\" significa la ventana." },
    { "de": "Hast du das Wort \"Fenster\" gelernt?", "es": "\u00BFHas aprendido la palabra \"Fenster\"?" }
  ],
  "Handtasche": [
    { "de": "Die Handtasche ist aus echtem Leder.", "es": "El bolso de mano es de cuero aut\u00E9ntico." },
    { "de": "Sie hat ihre Handtasche auf den Stuhl gelegt.", "es": "Ella ha dejado su bolso de mano en la silla." },
    { "de": "Hast du deine Handtasche immer dabei?", "es": "\u00BFLlevas siempre tu bolso de mano?" }
  ],
  "Feueralarm": [
    { "de": "Der Feueralarm war gestern sehr laut.", "es": "La alarma de incendios son\u00F3 ayer muy fuerte." },
    { "de": "Im B\u00FCro hat jemand den Feueralarm ausgel\u00F6st.", "es": "En la oficina alguien ha activado la alarma de incendios." },
    { "de": "Hast du den Feueralarm geh\u00F6rt?", "es": "\u00BFHas o\u00EDdo la alarma de incendios?" }
  ],
  "eingie\u00DFen": [
    { "de": "Du sollst die Milch langsam eingie\u00DFen.", "es": "Debes verter la leche lentamente." },
    { "de": "Er hat den Saft in die Gl\u00E4ser eingegossen.", "es": "\u00C9l ha vertido el zumo en los vasos." },
    { "de": "Gie\u00DFt du den Tee direkt in die Tasse ein?", "es": "\u00BFViertes el t\u00E9 directamente en la taza?" }
  ],
  "Vanille": [
    { "de": "Die Vanille duftet s\u00FC\u00DF.", "es": "La vainilla huele dulce." },
    { "de": "Ich habe Vanille in den Pudding ger\u00FChrt.", "es": "He mezclado vainilla en el pud\u00EDn." },
    { "de": "Backst du mit echter Vanille?", "es": "\u00BFHorneas con vainilla aut\u00E9ntica?" }
  ],
  "der Tiger": [
    { "de": "Der Tiger schleicht durch das Gras.", "es": "El tigre se desliza sigilosamente por la hierba." },
    { "de": "Im Zoo haben wir einen wei\u00DFen Tiger gesehen.", "es": "En el zoo hemos visto un tigre blanco." },
    { "de": "Hast du Angst vor Tigern?", "es": "\u00BFTienes miedo a los tigres?" }
  ],
  "das Steak": [
    { "de": "Das Steak ist medium gebraten.", "es": "El filete est\u00E1 en su punto." },
    { "de": "Papa hat das Steak auf dem Grill zubereitet.", "es": "Pap\u00E1 ha preparado el filete en la barbacoa." },
    { "de": "Isst du dein Steak gern mit Ketchup?", "es": "\u00BFTe gusta el filete con k\u00E9tchup?" }
  ],
  "der L\u00F6ffel": [
    { "de": "Der L\u00F6ffel ist aus Edelstahl.", "es": "La cuchara es de acero inoxidable." },
    { "de": "Ich habe die Suppe mit einem L\u00F6ffel gegessen.", "es": "He comido la sopa con una cuchara." },
    { "de": "Kannst du mir einen L\u00F6ffel geben?", "es": "\u00BFPuedes darme una cuchara?" }
  ],
  "Blitz": [
    { "de": "Der Blitz war sehr hell.", "es": "El rel\u00E1mpago fue muy brillante." },
    { "de": "W\u00E4hrend des Gewitters hat ein Blitz in den Baum eingeschlagen.", "es": "Durante la tormenta un rayo ha ca\u00EDdo en el \u00E1rbol." },
    { "de": "Hast du den Blitz gesehen?", "es": "\u00BFHas visto el rel\u00E1mpago?" }
  ],
  "st\u00F6ren": [
    { "de": "Das laute Radio st\u00F6rt mich.", "es": "La radio alta me molesta." },
    { "de": "Der L\u00E4rm hat meine Konzentration gest\u00F6rt.", "es": "El ruido ha molestado mi concentraci\u00F3n." },
    { "de": "St\u00F6rt es dich, wenn ich fernsehe?", "es": "\u00BFTe molesta si veo la tele?" }
  ],
  "die Vier": [
    { "de": "Die Vier ist eine gerade Zahl.", "es": "El cuatro es un n\u00FAmero par." },
    { "de": "Ich habe eine Vier im Zeugnis.", "es": "Tengo un cuatro en las notas." },
    { "de": "Ist die Vier deine Gl\u00FCckszahl?", "es": "\u00BFEs el cuatro tu n\u00FAmero de la suerte?" }
  ],
  "L\u00F6ffel": [
    { "de": "Der L\u00F6ffel liegt neben dem Teller.", "es": "La cuchara est\u00E1 al lado del plato." },
    { "de": "Oma hat die L\u00F6ffel poliert.", "es": "La abuela ha pulido las cucharas." },
    { "de": "Hast du einen sauberen L\u00F6ffel?", "es": "\u00BFTienes una cuchara limpia?" }
  ],
  "Messer": [
    { "de": "Das Messer ist stumpf.", "es": "El cuchillo est\u00E1 desafilado." },
    { "de": "Er hat das Brot mit einem Messer geschnitten.", "es": "\u00C9l ha cortado el pan con un cuchillo." },
    { "de": "Kannst du das Messer sch\u00E4rfen?", "es": "\u00BFPuedes afilar el cuchillo?" }
  ],
  "einkaufen": [
    { "de": "Ich muss noch f\u00FCr das Wochenende einkaufen.", "es": "Todav\u00EDa tengo que comprar para el fin de semana." },
    { "de": "Wir haben gestern im Supermarkt eingekauft.", "es": "Ayer hemos comprado en el supermercado." },
    { "de": "Gehst du einkaufen oder bestellst du online?", "es": "\u00BFVas a comprar o pides en l\u00EDnea?" }
  ],
  "bezahlen": [
    { "de": "Du musst an der Kasse bezahlen.", "es": "Tienes que pagar en la caja." },
    { "de": "Ich habe die Rechnung sofort bezahlt.", "es": "He pagado la factura inmediatamente." },
    { "de": "Bezahlst du bar oder mit Karte?", "es": "\u00BFPagas en efectivo o con tarjeta?" }
  ],
  "Freitag": [
    { "de": "Freitag ist mein letzter Arbeitstag.", "es": "El viernes es mi \u00FAltimo d\u00EDa de trabajo." },
    { "de": "Am Freitag haben wir ein Team-Meeting gehabt.", "es": "El viernes hemos tenido una reuni\u00F3n de equipo." },
    { "de": "Freust du dich auf den Freitag?", "es": "\u00BFTe alegra el viernes?" }
  ],
  "Samstag": [
    { "de": "Samstag ist Familientag.", "es": "El s\u00E1bado es d\u00EDa de familia." },
    { "de": "Wir haben den Samstag mit einem Ausflug verbracht.", "es": "Hemos pasado el s\u00E1bado con una excursi\u00F3n." },
    { "de": "Was machst du am Samstag?", "es": "\u00BFQu\u00E9 haces el s\u00E1bado?" }
  ],
  "Tiger": [
    { "de": "Der Tiger ist ein Einzelg\u00E4nger.", "es": "El tigre es un animal solitario." },
    { "de": "In Indien haben wir Tiger in freier Wildbahn gesehen.", "es": "En la India hemos visto tigres en libertad." },
    { "de": "W\u00FCrdest du einen Tiger streicheln?", "es": "\u00BFAcariciar\u00EDas a un tigre?" }
  ],
  "Schmerz": [
    { "de": "Der Schmerz l\u00E4sst langsam nach.", "es": "El dolor remite lentamente." },
    { "de": "Ich habe starke Schmerzen im R\u00FCcken.", "es": "Tengo fuertes dolores de espalda." },
    { "de": "Hast du immer noch Schmerzen?", "es": "\u00BFTodav\u00EDa tienes dolores?" }
  ],
  "Fieber": [
    { "de": "Das Kind hat hohes Fieber.", "es": "El ni\u00F1o tiene fiebre alta." },
    { "de": "Gestern hatte ich Fieber und bin im Bett geblieben.", "es": "Ayer tuve fiebre y me qued\u00E9 en la cama." },
    { "de": "Hast du Fieber gemessen?", "es": "\u00BFTe has medido la fiebre?" }
  ],
  "Metzgerei": [
    { "de": "Die Metzgerei verkauft frische Wurst.", "es": "La carnicer\u00EDa vende salchicha fresca." },
    { "de": "Oma hat Rindfleisch in der Metzgerei bestellt.", "es": "La abuela ha pedido carne de res en la carnicer\u00EDa." },
    { "de": "Gehst du zur Metzgerei oder kaufst du abgepackt?", "es": "\u00BFVas a la carnicer\u00EDa o compras envasado?" }
  ],
  "der Fuchs": [
    { "de": "Der Fuchs hat ein rotes Fell.", "es": "El zorro tiene un pelaje rojo." },
    { "de": "Nachts haben wir einen Fuchs im Garten gesehen.", "es": "Por la noche hemos visto un zorro en el jard\u00EDn." },
    { "de": "Kennst du die Fabel vom Fuchs und den Trauben?", "es": "\u00BFConoces la f\u00E1bula de la zorra y las uvas?" }
  ],
  "teuer": [
    { "de": "Das Restaurant ist sehr teuer.", "es": "El restaurante es muy caro." },
    { "de": "Ich habe mir eine teure Uhr gekauft.", "es": "Me he comprado un reloj caro." },
    { "de": "Findest du das zu teuer?", "es": "\u00BFTe parece demasiado caro?" }
  ],
  "billig": [
    { "de": "Das Gem\u00FCse ist heute billig.", "es": "La verdura est\u00E1 barata hoy." },
    { "de": "Er hat einen billigen Schirm gekauft.", "es": "\u00C9l ha comprado un paraguas barato." },
    { "de": "Ist das billig oder teuer?", "es": "\u00BFEs barato o caro?" }
  ],
  "Buchhalter": [
    { "de": "Der Buchhalter pr\u00FCft die Rechnungen.", "es": "El contable revisa las facturas." },
    { "de": "Sie hat als Buchhalterin in einer gro\u00DFen Firma gearbeitet.", "es": "Ella ha trabajado como contable en una gran empresa." },
    { "de": "Ist dein Vater Buchhalter?", "es": "\u00BFTu padre es contable?" }
  ],
  "Bonbon": [
    { "de": "Das Bonbon ist sauer.", "es": "El caramelo es \u00E1cido." },
    { "de": "Das Kind hat ein Bonbon aus der Dose genommen.", "es": "El ni\u00F1o ha cogido un caramelo de la lata." },
    { "de": "Magst du lieber Bonbons oder Schokolade?", "es": "\u00BFPrefieres caramelos o chocolate?" }
  ],
  "die Bibliothek": [
    { "de": "Die Bibliothek ist bis acht Uhr ge\u00F6ffnet.", "es": "La biblioteca est\u00E1 abierta hasta las ocho." },
    { "de": "Ich habe mir ein Buch aus der Bibliothek ausgeliehen.", "es": "He tomado prestado un libro de la biblioteca." },
    { "de": "Gehst du regelm\u00E4\u00DFig in die Bibliothek?", "es": "\u00BFVas regularmente a la biblioteca?" }
  ],
  "Fuchs": [
    { "de": "Der Fuchs ist ein schlaues Tier.", "es": "El zorro es un animal astuto." },
    { "de": "Der J\u00E4ger hat einen Fuchs im Wald erlegt.", "es": "El cazador ha abatido un zorro en el bosque." },
    { "de": "Hast du schon einen Fuchs in der Stadt gesehen?", "es": "\u00BFHas visto ya un zorro en la ciudad?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block17 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 17 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);