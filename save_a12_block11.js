const fs = require("fs");

// Cargar archivo existente (bloques 1-10)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 11: palabras 501 a 550
const block11 = {
  "der K\u00E4fer": [
    { "de": "Der K\u00E4fer sitzt auf dem Blatt.", "es": "El escarabajo est\u00E1 sobre la hoja." },
    { "de": "Ich habe einen bunten K\u00E4fer im Garten gesehen.", "es": "He visto un escarabajo de colores en el jard\u00EDn." },
    { "de": "Hast du schon einen Maik\u00E4fer gefangen?", "es": "\u00BFHas atrapado ya un escarabajo de mayo?" }
  ],
  "Heidelbeere": [
    { "de": "Die Heidelbeere ist blau und klein.", "es": "El ar\u00E1ndano es azul y peque\u00F1o." },
    { "de": "Wir haben Heidelbeeren f\u00FCr den Kuchen gesammelt.", "es": "Hemos recogido ar\u00E1ndanos para la tarta." },
    { "de": "Magst du Heidelbeeren mit Joghurt?", "es": "\u00BFTe gustan los ar\u00E1ndanos con yogur?" }
  ],
  "Samen": [
    { "de": "Der Samen ist sehr klein.", "es": "La semilla es muy peque\u00F1a." },
    { "de": "Opa hat Samen f\u00FCr den Garten gekauft.", "es": "El abuelo ha comprado semillas para el jard\u00EDn." },
    { "de": "S\u00E4st du die Samen im Fr\u00FChling?", "es": "\u00BFSiembras las semillas en primavera?" }
  ],
  "Ratte": [
    { "de": "Die Ratte ist ein kluges Tier.", "es": "La rata es un animal inteligente." },
    { "de": "Im Keller hat eine Ratte genagt.", "es": "En el s\u00F3tano ha ro\u00EDdo una rata." },
    { "de": "Hast du Angst vor Ratten?", "es": "\u00BFTienes miedo a las ratas?" }
  ],
  "das Handtuch": [
    { "de": "Das Handtuch ist flauschig.", "es": "La toalla es esponjosa." },
    { "de": "Nach dem Duschen habe ich das Handtuch benutzt.", "es": "Despu\u00E9s de ducharme he usado la toalla." },
    { "de": "Hast du ein sauberes Handtuch?", "es": "\u00BFTienes una toalla limpia?" }
  ],
  "leise": [
    { "de": "Das Kind spricht ganz leise.", "es": "El ni\u00F1o habla muy bajito." },
    { "de": "Er hat die T\u00FCr leise geschlossen.", "es": "\u00C9l ha cerrado la puerta silenciosamente." },
    { "de": "Kannst du bitte leise sein?", "es": "\u00BFPuedes estar en silencio, por favor?" }
  ],
  "Lotion": [
    { "de": "Die Lotion riecht nach Lavendel.", "es": "La loci\u00F3n huele a lavanda." },
    { "de": "Sie hat die Lotion auf die Haut aufgetragen.", "es": "Ella se ha aplicado la loci\u00F3n en la piel." },
    { "de": "Benutzt du eine Lotion nach dem Sonnenbad?", "es": "\u00BFUsas una loci\u00F3n despu\u00E9s del ba\u00F1o de sol?" }
  ],
  "erfinden": [
    { "de": "Erfinder m\u00FCssen neue Dinge erfinden.", "es": "Los inventores tienen que inventar cosas nuevas." },
    { "de": "Edison hat die Gl\u00FChbirne erfunden.", "es": "Edison ha inventado la bombilla." },
    { "de": "Was w\u00FCrdest du gern erfinden?", "es": "\u00BFQu\u00E9 te gustar\u00EDa inventar?" }
  ],
  "wischen": [
    { "de": "Du musst den Fu\u00DFboden wischen.", "es": "Tienes que limpiar el suelo." },
    { "de": "Sie hat die nasse Stelle aufgewischt.", "es": "Ella ha limpiado la mancha h\u00FAmeda." },
    { "de": "Wischt du mit kaltem oder warmem Wasser?", "es": "\u00BFLimpias con agua fr\u00EDa o caliente?" }
  ],
  "Pumps": [
    { "de": "Die Pumps sind aus Lackleder.", "es": "Los zapatos de tac\u00F3n son de charol." },
    { "de": "Sie hat die Pumps zur Hochzeit getragen.", "es": "Ella ha llevado los zapatos de tac\u00F3n en la boda." },
    { "de": "Sind die Pumps bequem?", "es": "\u00BFSon c\u00F3modos los zapatos de tac\u00F3n?" }
  ],
  "ausf\u00FCllen": [
    { "de": "Du musst das Formular ausf\u00FCllen.", "es": "Tienes que rellenar el formulario." },
    { "de": "Er hat den Antrag vollst\u00E4ndig ausgef\u00FCllt.", "es": "\u00C9l ha rellenado la solicitud por completo." },
    { "de": "F\u00FCllst du den Fragebogen aus?", "es": "\u00BFRellenas el cuestionario?" }
  ],
  "k\u00FCmmern": [
    { "de": "Ich muss mich um die Kinder k\u00FCmmern.", "es": "Tengo que preocuparme de los ni\u00F1os." },
    { "de": "Sie hat sich liebevoll um den Hund gek\u00FCmmert.", "es": "Ella se ha preocupado cari\u00F1osamente del perro." },
    { "de": "K\u00FCmmerst du dich um die Pflanzen?", "es": "\u00BFTe preocupas de las plantas?" }
  ],
  "Schmetterling": [
    { "de": "Der Schmetterling ist wundersch\u00F6n.", "es": "La mariposa es maravillosa." },
    { "de": "Ich habe einen Schmetterling auf einer Rose gesehen.", "es": "He visto una mariposa sobre una rosa." },
    { "de": "Fliegt der Schmetterling \u00FCber die Wiese?", "es": "\u00BFVuela la mariposa sobre el prado?" }
  ],
  "Spielplatz": [
    { "de": "Der Spielplatz ist neu gebaut.", "es": "El parque infantil es de nueva construcci\u00F3n." },
    { "de": "Die Kinder haben auf dem Spielplatz geschaukelt.", "es": "Los ni\u00F1os se han columpiado en el parque infantil." },
    { "de": "Gehst du mit deinem Sohn zum Spielplatz?", "es": "\u00BFVas con tu hijo al parque infantil?" }
  ],
  "tanzen": [
    { "de": "Meine Tochter kann gut tanzen.", "es": "Mi hija sabe bailar bien." },
    { "de": "Gestern Abend haben wir bis sp\u00E4t getanzt.", "es": "Anoche hemos bailado hasta tarde." },
    { "de": "Tanzt du gern Salsa?", "es": "\u00BFTe gusta bailar salsa?" }
  ],
  "singen": [
    { "de": "Der Vogel singt im Baum.", "es": "El p\u00E1jaro canta en el \u00E1rbol." },
    { "de": "Wir haben ein Lied gesungen.", "es": "Hemos cantado una canci\u00F3n." },
    { "de": "Singst du unter der Dusche?", "es": "\u00BFCantas en la ducha?" }
  ],
  "Walnuss": [
    { "de": "Die Walnuss hat eine harte Schale.", "es": "La nuez tiene una c\u00E1scara dura." },
    { "de": "Wir haben Waln\u00FCsse im Herbst gesammelt.", "es": "Hemos recogido nueces en oto\u00F1o." },
    { "de": "Knackst du die Walnuss mit der Hand?", "es": "\u00BFPartes la nuez con la mano?" }
  ],
  "die Ankunft": [
    { "de": "Die Ankunft des Zuges ist um zw\u00F6lf.", "es": "La llegada del tren es a las doce." },
    { "de": "Sie hat die Ankunft des Babys gefeiert.", "es": "Ella ha celebrado la llegada del beb\u00E9." },
    { "de": "Wann ist die Ankunft in Paris?", "es": "\u00BFCu\u00E1ndo es la llegada a Par\u00EDs?" }
  ],
  "vierzehn": [
    { "de": "Vierzehn Tage sind zwei Wochen.", "es": "Catorce d\u00EDas son dos semanas." },
    { "de": "Ich habe vierzehn Euro f\u00FCr das Buch bezahlt.", "es": "He pagado catorce euros por el libro." },
    { "de": "Bist du vierzehn oder f\u00FCnfzehn?", "es": "\u00BFTienes catorce o quince?" }
  ],
  "durch": [
    { "de": "Wir gehen durch den Park.", "es": "Vamos por el parque." },
    { "de": "Er hat durch das Fenster geschaut.", "es": "\u00C9l ha mirado por la ventana." },
    { "de": "F\u00E4hrst du durch die Stadtmitte?", "es": "\u00BFConduces por el centro de la ciudad?" }
  ],
  "bek\u00E4mpfen": [
    { "de": "Wir m\u00FCssen die Armut bek\u00E4mpfen.", "es": "Tenemos que combatir la pobreza." },
    { "de": "Die Feuerwehr hat den Brand bek\u00E4mpft.", "es": "Los bomberos han combatido el incendio." },
    { "de": "Bek\u00E4mpfst du Unkraut im Garten?", "es": "\u00BFCombates las malas hierbas en el jard\u00EDn?" }
  ],
  "die Ecke": [
    { "de": "Die Ecke ist dunkel.", "es": "La esquina est\u00E1 oscura." },
    { "de": "Ich habe den Stuhl in die Ecke gestellt.", "es": "He puesto la silla en la esquina." },
    { "de": "Wartest du an der Ecke?", "es": "\u00BFEsperas en la esquina?" }
  ],
  "W\u00E4scherei": [
    { "de": "Die W\u00E4scherei ist neben dem Supermarkt.", "es": "La lavander\u00EDa est\u00E1 al lado del supermercado." },
    { "de": "Ich habe die Hemden in die W\u00E4scherei gebracht.", "es": "He llevado las camisas a la lavander\u00EDa." },
    { "de": "Benutzt du die W\u00E4scherei oder w\u00E4schst du zu Hause?", "es": "\u00BFUsas la lavander\u00EDa o lavas en casa?" }
  ],
  "Nudeln": [
    { "de": "Die Nudeln sind al dente.", "es": "La pasta est\u00E1 al dente." },
    { "de": "Mama hat Spaghetti mit Tomatenso\u00DFe gekocht.", "es": "Mam\u00E1 ha cocinado espaguetis con salsa de tomate." },
    { "de": "Kochst du die Nudeln mit Salz?", "es": "\u00BFCueces la pasta con sal?" }
  ],
  "Kartoffel": [
    { "de": "Die Kartoffel ist eine Knolle.", "es": "La patata es un tub\u00E9rculo." },
    { "de": "Wir haben Kartoffeln im Ofen gebacken.", "es": "Hemos asado patatas en el horno." },
    { "de": "Sch\u00E4lst du die Kartoffeln vor dem Kochen?", "es": "\u00BFPelas las patatas antes de cocerlas?" }
  ],
  "R\u00FCckmeldung": [
    { "de": "Die R\u00FCckmeldung war positiv.", "es": "La respuesta fue positiva." },
    { "de": "Ich habe noch keine R\u00FCckmeldung erhalten.", "es": "Todav\u00EDa no he recibido una respuesta." },
    { "de": "Hast du eine R\u00FCckmeldung vom Chef bekommen?", "es": "\u00BFHas recibido una respuesta del jefe?" }
  ],
  "anfassen": [
    { "de": "Du darfst die hei\u00DFe Pfanne nicht anfassen.", "es": "No debes tocar la sart\u00E9n caliente." },
    { "de": "Er hat die Seide vorsichtig angefasst.", "es": "\u00C9l ha tocado la seda con cuidado." },
    { "de": "Fasst du jeden Hund an?", "es": "\u00BFTocas a todos los perros?" }
  ],
  "Fliege": [
    { "de": "Die Fliege summt am Fenster.", "es": "La mosca zumba en la ventana." },
    { "de": "Eine Fliege ist auf meinem Teller gelandet.", "es": "Una mosca ha aterrizado en mi plato." },
    { "de": "Schl\u00E4gtst du die Fliege mit der Hand?", "es": "\u00BFMatas la mosca con la mano?" }
  ],
  "wichtig": [
    { "de": "Die Pr\u00FCfung ist morgen, sie ist wichtig.", "es": "El examen es ma\u00F1ana, es importante." },
    { "de": "Ich habe eine wichtige Nachricht bekommen.", "es": "He recibido un mensaje importante." },
    { "de": "Ist dir die Familie wichtig?", "es": "\u00BFEs importante para ti la familia?" }
  ],
  "richtig": [
    { "de": "Deine Antwort ist richtig.", "es": "Tu respuesta es correcta." },
    { "de": "Er hat die Aufgabe richtig gel\u00F6st.", "es": "\u00C9l ha resuelto la tarea correctamente." },
    { "de": "Habe ich das richtig verstanden?", "es": "\u00BFHe entendido eso correctamente?" }
  ],
  "Zentrale": [
    { "de": "Die Zentrale ist in Berlin.", "es": "La central est\u00E1 en Berl\u00EDn." },
    { "de": "Ich habe bei der Zentrale angerufen.", "es": "He llamado a la central." },
    { "de": "Arbeitest du in der Zentrale?", "es": "\u00BFTrabajas en la central?" }
  ],
  "die Post": [
    { "de": "Die Post kommt gegen Mittag.", "es": "El correo llega hacia el mediod\u00EDa." },
    { "de": "Ich habe die Post heute Morgen geholt.", "es": "He recogido el correo esta ma\u00F1ana." },
    { "de": "Hast du einen Brief mit der Post geschickt?", "es": "\u00BFHas enviado una carta por correo?" }
  ],
  "schmecken": [
    { "de": "Die Erdbeeren schmecken s\u00FC\u00DF.", "es": "Las fresas saben dulces." },
    { "de": "Das Essen hat mir gut geschmeckt.", "es": "La comida me ha gustado (me ha sabido bien)." },
    { "de": "Schmeckt dir der Kaffee?", "es": "\u00BFTe gusta el caf\u00E9?" }
  ],
  "einladen": [
    { "de": "Ich will dich zum Abendessen einladen.", "es": "Quiero invitarte a cenar." },
    { "de": "Sie hat alle Freunde eingeladen.", "es": "Ella ha invitado a todos los amigos." },
    { "de": "L\u00E4dst du mich ein?", "es": "\u00BFMe invitas?" }
  ],
  "ausw\u00E4hlen": [
    { "de": "Du musst ein Gericht ausw\u00E4hlen.", "es": "Tienes que seleccionar un plato." },
    { "de": "Er hat das rote Tuch ausgew\u00E4hlt.", "es": "\u00C9l ha seleccionado el pa\u00F1o rojo." },
    { "de": "W\u00E4hlst du die Farbe aus?", "es": "\u00BFSeleccionas el color?" }
  ],
  "Fehlzeit": [
    { "de": "Die Fehlzeit betr\u00E4gt drei Stunden.", "es": "La ausencia es de tres horas." },
    { "de": "Er hat die Fehlzeit im Kalender notiert.", "es": "\u00C9l ha anotado la ausencia en el calendario." },
    { "de": "Hast du deine Fehlzeiten abgebaut?", "es": "\u00BFHas reducido tus ausencias?" }
  ],
  "die Mayonnaise": [
    { "de": "Die Mayonnaise ist selbst gemacht.", "es": "La mayonesa es casera." },
    { "de": "Ich habe Mayonnaise zu den Pommes gegessen.", "es": "He comido mayonesa con las patatas fritas." },
    { "de": "Magst du Mayonnaise auf dem Sandwich?", "es": "\u00BFTe gusta la mayonesa en el s\u00E1ndwich?" }
  ],
  "Standort": [
    { "de": "Der Standort ist g\u00FCnstig.", "es": "La ubicaci\u00F3n es favorable." },
    { "de": "Die Firma hat den Standort gewechselt.", "es": "La empresa ha cambiado la ubicaci\u00F3n." },
    { "de": "Kennst du den genauen Standort?", "es": "\u00BFConoces la ubicaci\u00F3n exacta?" }
  ],
  "Jeans": [
    { "de": "Die Jeans ist zu eng.", "es": "Los vaqueros est\u00E1n demasiado ajustados." },
    { "de": "Ich habe mir eine neue Jeans gekauft.", "es": "Me he comprado unos vaqueros nuevos." },
    { "de": "Tr\u00E4gst du gern Jeans?", "es": "\u00BFTe gusta llevar vaqueros?" }
  ],
  "kochen": [
    { "de": "Ich muss heute f\u00FCr die Familie kochen.", "es": "Hoy tengo que cocinar para la familia." },
    { "de": "Gestern habe ich eine Suppe gekocht.", "es": "Ayer he cocinado una sopa." },
    { "de": "Kochst du gern mit frischen Kr\u00E4utern?", "es": "\u00BFTe gusta cocinar con hierbas frescas?" }
  ],
  "das Hemd": [
    { "de": "Das Hemd ist bl\u00FCtenwei\u00DF.", "es": "La camisa es blanca como la nieve." },
    { "de": "Er hat ein frisches Hemd angezogen.", "es": "\u00C9l se ha puesto una camisa limpia." },
    { "de": "B\u00FCgelst du das Hemd vor dem Anziehen?", "es": "\u00BFPlanchas la camisa antes de pon\u00E9rtela?" }
  ],
  "sich anziehen": [
    { "de": "Du musst dich warm anziehen.", "es": "Tienes que vestirte con ropa de abrigo." },
    { "de": "Ich habe mich in zehn Minuten angezogen.", "es": "Me he vestido en diez minutos." },
    { "de": "Ziehst du dich vor dem Fr\u00FChst\u00FCck an?", "es": "\u00BFTe vistes antes del desayuno?" }
  ],
  "Arbeitszeugnis": [
    { "de": "Das Arbeitszeugnis ist sehr wichtig.", "es": "El certificado laboral es muy importante." },
    { "de": "Sie hat ein gutes Arbeitszeugnis erhalten.", "es": "Ella ha recibido un buen certificado laboral." },
    { "de": "Hast du dein Arbeitszeugnis schon beantragt?", "es": "\u00BFYa has solicitado tu certificado laboral?" }
  ],
  "die Kartoffel": [
    { "de": "Die Kartoffel ist mehlig.", "es": "La patata es harinosa." },
    { "de": "Bauer Hansen hat die Kartoffeln geerntet.", "es": "El granjero Hansen ha cosechado las patatas." },
    { "de": "Bratest du die Kartoffeln in Butter?", "es": "\u00BFFr\u00EDes las patatas en mantequilla?" }
  ],
  "Nacken": [
    { "de": "Mein Nacken ist verspannt.", "es": "Mi nuca est\u00E1 tensa." },
    { "de": "Er hat sich den Nacken massieren lassen.", "es": "\u00C9l se ha hecho masajear la nuca." },
    { "de": "Tut dein Nacken nach dem Schlafen weh?", "es": "\u00BFTe duele la nuca despu\u00E9s de dormir?" }
  ],
  "Temperatur": [
    { "de": "Die Temperatur steigt auf 35 Grad.", "es": "La temperatura sube a 35 grados." },
    { "de": "Die Krankenschwester hat die Temperatur gemessen.", "es": "La enfermera ha medido la temperatura." },
    { "de": "Hast du Fieber? Wie ist deine Temperatur?", "es": "\u00BFTienes fiebre? \u00BFCu\u00E1l es tu temperatura?" }
  ],
  "Apotheke": [
    { "de": "Die Apotheke ist heute geschlossen.", "es": "La farmacia est\u00E1 cerrada hoy." },
    { "de": "Ich habe Hustensaft in der Apotheke besorgt.", "es": "He comprado jarabe para la tos en la farmacia." },
    { "de": "Gibt es eine Apotheke in der N\u00E4he?", "es": "\u00BFHay una farmacia cerca?" }
  ],
  "Medikament": [
    { "de": "Das Medikament wirkt schnell.", "es": "El medicamento act\u00FAa r\u00E1pido." },
    { "de": "Der Arzt hat mir ein Medikament verschrieben.", "es": "El m\u00E9dico me ha recetado un medicamento." },
    { "de": "Nimmst du dein Medikament jeden Morgen?", "es": "\u00BFTomas tu medicamento cada ma\u00F1ana?" }
  ],
  "die Handschuhe": [
    { "de": "Die Handschuhe halten sch\u00F6n warm.", "es": "Los guantes mantienen bien calientes." },
    { "de": "Ich habe meine Handschuhe im Bus verloren.", "es": "He perdido mis guantes en el autob\u00FAs." },
    { "de": "Tr\u00E4gst du Handschuhe im Winter?", "es": "\u00BFLlevas guantes en invierno?" }
  ],
  "die Mango": [
    { "de": "Die Mango riecht herrlich.", "es": "El mango huele deliciosamente." },
    { "de": "Wir haben eine Mango in den Obstsalat geschnitten.", "es": "Hemos cortado un mango en la macedonia." },
    { "de": "Isst du gern Mango-Lassi?", "es": "\u00BFTe gusta el lassi de mango?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block11 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 11 a\u00F1adido. Total de palabras ahora:", Object.keys(combined).length);