const fs = require("fs");

// Cargar el archivo existente (bloques 1-4)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 5: palabras 201 a 250
const block5 = {
  "Bäcker": [
    { "de": "Der Bäcker hat frische Brötchen.", "es": "El panadero tiene panecillos frescos." },
    { "de": "Ich habe beim Bäcker einen Kuchen gekauft.", "es": "He comprado una tarta en la panadería." },
    { "de": "Gehst du morgen zum Bäcker?", "es": "¿Vas mañana a la panadería?" }
  ],
  "die Erdbeere": [
    { "de": "Die Erdbeere ist süß und rot.", "es": "La fresa es dulce y roja." },
    { "de": "Wir haben letzte Woche Erdbeeren gepflückt.", "es": "La semana pasada recogimos fresas." },
    { "de": "Magst du Erdbeeren mit Sahne?", "es": "¿Te gustan las fresas con nata?" }
  ],
  "Schlüsseldienst": [
    { "de": "Der Schlüsseldienst kommt in zehn Minuten.", "es": "El cerrajero viene en diez minutos." },
    { "de": "Ich habe den Schlüsseldienst angerufen.", "es": "He llamado al cerrajero." },
    { "de": "Kennst du einen günstigen Schlüsseldienst?", "es": "¿Conoces un cerrajero barato?" }
  ],
  "werfen": [
    { "de": "Du darfst den Ball nicht auf die Straße werfen.", "es": "No debes lanzar el balón a la calle." },
    { "de": "Er hat den Brief in den Kasten geworfen.", "es": "Él ha echado la carta en el buzón." },
    { "de": "Wirfst du mir den Schlüssel zu?", "es": "¿Me lanzas la llave?" }
  ],
  "abstauben": [
    { "de": "Ich muss noch das Regal abstauben.", "es": "Todavía tengo que quitar el polvo de la estantería." },
    { "de": "Sie hat alle Möbel abgestaubt.", "es": "Ella ha quitado el polvo de todos los muebles." },
    { "de": "Staubst du bitte den Fernseher ab?", "es": "¿Quitas el polvo del televisor, por favor?" }
  ],
  "Geburtsurkunde": [
    { "de": "Die Geburtsurkunde ist ein wichtiges Dokument.", "es": "El certificado de nacimiento es un documento importante." },
    { "de": "Meine Mutter hat die Geburtsurkunde im Schrank aufbewahrt.", "es": "Mi madre ha guardado el certificado de nacimiento en el armario." },
    { "de": "Hast du deine Geburtsurkunde dabei?", "es": "¿Llevas contigo tu certificado de nacimiento?" }
  ],
  "sich setzen": [
    { "de": "Du musst dich in die erste Reihe setzen.", "es": "Tienes que sentarte en la primera fila." },
    { "de": "Der Opa hat sich auf die Bank gesetzt.", "es": "El abuelo se ha sentado en el banco." },
    { "de": "Setzen Sie sich, bitte.", "es": "Siéntese, por favor." }
  ],
  "aufwischen": [
    { "de": "Du musst den verschütteten Saft aufwischen.", "es": "Tienes que fregar el zumo derramado." },
    { "de": "Er hat den Küchenboden aufgewischt.", "es": "Él ha fregado el suelo de la cocina." },
    { "de": "Wischt du nach dem Kochen immer auf?", "es": "¿Friegas siempre después de cocinar?" }
  ],
  "neunzehn": [
    { "de": "Neunzehn ist fast zwanzig.", "es": "Diecinueve es casi veinte." },
    { "de": "Ich habe neunzehn Euro für das Buch bezahlt.", "es": "He pagado diecinueve euros por el libro." },
    { "de": "Bist du schon neunzehn Jahre alt?", "es": "¿Ya tienes diecinueve años?" }
  ],
  "Flug": [
    { "de": "Der Flug nach Rom dauert zwei Stunden.", "es": "El vuelo a Roma dura dos horas." },
    { "de": "Wir haben den Flug online gebucht.", "es": "Hemos reservado el vuelo por internet." },
    { "de": "Hast du deinen Flug schon bestätigt?", "es": "¿Ya has confirmado tu vuelo?" }
  ],
  "Kleid": [
    { "de": "Das Kleid ist wunderschön.", "es": "El vestido es maravilloso." },
    { "de": "Sie hat das Kleid zur Hochzeit getragen.", "es": "Ella ha llevado el vestido para la boda." },
    { "de": "Gefällt dir mein neues Kleid?", "es": "¿Te gusta mi vestido nuevo?" }
  ],
  "die Apotheke": [
    { "de": "Die Apotheke hat rund um die Uhr geöffnet.", "es": "La farmacia está abierta las 24 horas." },
    { "de": "Ich habe Hustensaft in der Apotheke gekauft.", "es": "He comprado jarabe para la tos en la farmacia." },
    { "de": "Wo ist die nächste Apotheke?", "es": "¿Dónde está la farmacia más cercana?" }
  ],
  "Schneeanzug": [
    { "de": "Der Schneeanzug hält schön warm.", "es": "El traje de nieve mantiene bien caliente." },
    { "de": "Die Mutter hat dem Kind den Schneeanzug angezogen.", "es": "La madre ha puesto el traje de nieve al niño." },
    { "de": "Brauchst du einen Schneeanzug für den Skiurlaub?", "es": "¿Necesitas un traje de nieve para las vacaciones de esquí?" }
  ],
  "wirken": [
    { "de": "Die Medizin wirkt schnell.", "es": "La medicina actúa rápido." },
    { "de": "Das hat auf mich seltsam gewirkt.", "es": "Eso me ha parecido extraño." },
    { "de": "Wirkt der Tee beruhigend?", "es": "¿El té tiene efecto calmante?" }
  ],
  "Essig": [
    { "de": "Der Essig riecht stark.", "es": "El vinagre huele fuerte." },
    { "de": "Ich habe Essig an den Salat gemacht.", "es": "He puesto vinagre en la ensalada." },
    { "de": "Benutzt du Essig zum Putzen?", "es": "¿Usas vinagre para limpiar?" }
  ],
  "Student": [
    { "de": "Der Student lernt jeden Tag.", "es": "El estudiante estudia todos los días." },
    { "de": "Er hat als Student in München gelebt.", "es": "Él ha vivido en Múnich como estudiante." },
    { "de": "Bist du noch Student?", "es": "¿Todavía eres estudiante?" }
  ],
  "ruhen": [
    { "de": "Du musst nach der Arbeit ruhen.", "es": "Tienes que descansar después del trabajo." },
    { "de": "Die alte Dame hat auf dem Sofa geruht.", "es": "La anciana ha descansado en el sofá." },
    { "de": "Ruhst du dich am Wochenende aus?", "es": "¿Descansas el fin de semana?" }
  ],
  "Kündigungsschutz": [
    { "de": "Der Kündigungsschutz ist wichtig für Familien.", "es": "La protección contra despido es importante para las familias." },
    { "de": "Das Gesetz hat den Kündigungsschutz verbessert.", "es": "La ley ha mejorado la protección contra despido." },
    { "de": "Hast du Kündigungsschutz?", "es": "¿Tienes protección contra despido?" }
  ],
  "Teilzeit": [
    { "de": "Sie arbeitet in Teilzeit.", "es": "Ella trabaja a media jornada." },
    { "de": "Er hat von Vollzeit auf Teilzeit gewechselt.", "es": "Él ha cambiado de jornada completa a media jornada." },
    { "de": "Würdest du gern in Teilzeit arbeiten?", "es": "¿Te gustaría trabajar a media jornada?" }
  ],
  "festhalten": [
    { "de": "Du musst das Seil gut festhalten.", "es": "Tienes que sujetar bien la cuerda." },
    { "de": "Er hat die Leiter festgehalten.", "es": "Él ha sujetado la escalera." },
    { "de": "Hältst du bitte meine Tasche fest?", "es": "¿Sujetas mi bolso, por favor?" }
  ],
  "Wade": [
    { "de": "Meine Wade ist nach dem Laufen verspannt.", "es": "Mi pantorrilla está tensa después de correr." },
    { "de": "Ich habe mir die Wade beim Sport verletzt.", "es": "Me he lesionado la pantorrilla haciendo deporte." },
    { "de": "Tut deine Wade weh?", "es": "¿Te duele la pantorrilla?" }
  ],
  "Krümel": [
    { "de": "Der Krümel liegt auf dem Tisch.", "es": "La migaja está sobre la mesa." },
    { "de": "Das Kind hat Krümel auf den Boden fallen lassen.", "es": "El niño ha dejado caer migas al suelo." },
    { "de": "Saugst du bitte die Krümel auf?", "es": "¿Aspiras las migas, por favor?" }
  ],
  "Kerze": [
    { "de": "Die Kerze brennt hell.", "es": "La vela arde con luz brillante." },
    { "de": "Oma hat die Kerzen auf dem Kuchen angezündet.", "es": "La abuela ha encendido las velas en la tarta." },
    { "de": "Hast du noch eine Kerze?", "es": "¿Tienes otra vela?" }
  ],
  "Bügelbrett": [
    { "de": "Das Bügelbrett steht im Abstellraum.", "es": "La tabla de planchar está en el cuarto trastero." },
    { "de": "Er hat das Bügelbrett ausgeklappt.", "es": "Él ha desplegado la tabla de planchar." },
    { "de": "Kannst du das Bügelbrett holen?", "es": "¿Puedes traer la tabla de planchar?" }
  ],
  "Keks": [
    { "de": "Der Keks ist knusprig.", "es": "La galleta es crujiente." },
    { "de": "Die Kinder haben alle Kekse aufgegessen.", "es": "Los niños se han comido todas las galletas." },
    { "de": "Darf ich noch einen Keks nehmen?", "es": "¿Puedo coger otra galleta?" }
  ],
  "Knöchel": [
    { "de": "Mein Knöchel ist geschwollen.", "es": "Mi tobillo está hinchado." },
    { "de": "Ich habe mir den Knöchel verstaucht.", "es": "Me he torcido el tobillo." },
    { "de": "Kannst du deinen Knöchel bewegen?", "es": "¿Puedes mover el tobillo?" }
  ],
  "U-Bahn": [
    { "de": "Die U-Bahn kommt alle fünf Minuten.", "es": "El metro viene cada cinco minutos." },
    { "de": "Wir sind mit der U-Bahn zum Stadion gefahren.", "es": "Hemos ido al estadio en metro." },
    { "de": "Nimmst du die U-Bahn oder den Bus?", "es": "¿Coges el metro o el autobús?" }
  ],
  "Linse": [
    { "de": "Die Linse ist eine Hülsenfrucht.", "es": "La lenteja es una legumbre." },
    { "de": "Ich habe einen Eintopf mit Linsen gekocht.", "es": "He cocinado un guiso con lentejas." },
    { "de": "Isst du gern Linsensuppe?", "es": "¿Te gusta la sopa de lentejas?" }
  ],
  "stolpern": [
    { "de": "Auf dem Kopfsteinpflaster kannst du leicht stolpern.", "es": "En el adoquinado puedes tropezar fácilmente." },
    { "de": "Der alte Mann ist über die Schwelle gestolpert.", "es": "El anciano ha tropezado con el umbral." },
    { "de": "Bist du schon mal im Wald gestolpert?", "es": "¿Ya has tropezado alguna vez en el bosque?" }
  ],
  "wehren": [
    { "de": "Du musst dich gegen die Kritik wehren.", "es": "Tienes que defenderte de la crítica." },
    { "de": "Sie hat sich tapfer gewehrt.", "es": "Ella se ha defendido valientemente." },
    { "de": "Wehrst du dich, wenn jemand dich angreift?", "es": "¿Te defiendes cuando alguien te ataca?" }
  ],
  "die Banane": [
    { "de": "Die Banane ist gelb und krumm.", "es": "El plátano es amarillo y curvado." },
    { "de": "Ich habe mir eine Banane als Snack mitgenommen.", "es": "Me he llevado un plátano de tentempié." },
    { "de": "Isst du jeden Tag eine Banane?", "es": "¿Comes un plátano todos los días?" }
  ],
  "neunzig": [
    { "de": "Neunzig ist eine hohe Zahl.", "es": "Noventa es un número alto." },
    { "de": "Mein Opa ist neunzig Jahre alt geworden.", "es": "Mi abuelo ha cumplido noventa años." },
    { "de": "Kostet der Mantel wirklich neunzig Euro?", "es": "¿Cuesta el abrigo realmente noventa euros?" }
  ],
  "vorsichtig": [
    { "de": "Sei bitte vorsichtig mit dem Glas.", "es": "Ten cuidado con el vaso, por favor." },
    { "de": "Er hat die Kiste vorsichtig getragen.", "es": "Él ha llevado la caja con cuidado." },
    { "de": "Fährst du bei Schnee vorsichtig?", "es": "¿Conduces con cuidado cuando nieva?" }
  ],
  "zwölf": [
    { "de": "Zwölf Uhr ist Mittag.", "es": "Las doce es el mediodía." },
    { "de": "Ich habe zwölf Eier gekauft.", "es": "He comprado doce huevos." },
    { "de": "Ist es schon zwölf?", "es": "¿Ya son las doce?" }
  ],
  "Tablett": [
    { "de": "Das Tablett ist aus Kunststoff.", "es": "La bandeja es de plástico." },
    { "de": "Die Kellnerin hat das Tablett fallen lassen.", "es": "La camarera ha dejado caer la bandeja." },
    { "de": "Kannst du das Tablett zum Tisch tragen?", "es": "¿Puedes llevar la bandeja a la mesa?" }
  ],
  "Anzug": [
    { "de": "Der Anzug sitzt perfekt.", "es": "El traje sienta perfecto." },
    { "de": "Er hat den Anzug zur Feier getragen.", "es": "Él ha llevado el traje para la celebración." },
    { "de": "Hast du einen schwarzen Anzug?", "es": "¿Tienes un traje negro?" }
  ],
  "hinlegen": [
    { "de": "Du sollst das Baby vorsichtig hinlegen.", "es": "Debes tumbar al bebé con cuidado." },
    { "de": "Ich habe mich eine Stunde hingelegt.", "es": "Me he tumbado una hora." },
    { "de": "Legst du dich nach der Arbeit hin?", "es": "¿Te tumbas después del trabajo?" }
  ],
  "statt": [
    { "de": "Statt Kaffee trinke ich heute Tee.", "es": "En lugar de café, hoy bebo té." },
    { "de": "Er hat statt seiner Schwester geantwortet.", "es": "Él ha respondido en lugar de su hermana." },
    { "de": "Kommst du statt deinem Bruder?", "es": "¿Vienes en lugar de tu hermano?" }
  ],
  "Nachtschicht": [
    { "de": "Die Nachtschicht beginnt um zehn.", "es": "El turno de noche empieza a las diez." },
    { "de": "Mein Mann hat letzte Woche Nachtschicht gearbeitet.", "es": "Mi marido ha trabajado en el turno de noche la semana pasada." },
    { "de": "Hast du schon einmal Nachtschicht gemacht?", "es": "¿Has hecho ya alguna vez turno de noche?" }
  ],
  "der Garten": [
    { "de": "Der Garten ist voller Blumen.", "es": "El jardín está lleno de flores." },
    { "de": "Opa hat im Garten gegrillt.", "es": "El abuelo ha hecho barbacoa en el jardín." },
    { "de": "Darf ich deinen Garten ansehen?", "es": "¿Puedo ver tu jardín?" }
  ],
  "auspacken": [
    { "de": "Du musst die Koffer auspacken.", "es": "Tienes que desempaquetar las maletas." },
    { "de": "Ich habe die Geschenke schon ausgepackt.", "es": "Ya he desempaquetado los regalos." },
    { "de": "Packst du bitte die Einkäufe aus?", "es": "¿Desempaquetas la compra, por favor?" }
  ],
  "die Sauna": [
    { "de": "Die Sauna ist sehr heutzutage.", "es": "La sauna está muy de moda hoy en día." },
    { "de": "Wir haben gestern die Sauna im Hotel benutzt.", "es": "Ayer usamos la sauna del hotel." },
    { "de": "Gehst du gern in die Sauna?", "es": "¿Te gusta ir a la sauna?" }
  ],
  "täuschen": [
    { "de": "Du darfst niemanden täuschen.", "es": "No debes engañar a nadie." },
    { "de": "Das Gefühl hat ihn getäuscht.", "es": "La sensación lo ha engañado." },
    { "de": "Täuschst du mich?", "es": "¿Me estás engañando?" }
  ],
  "versorgen": [
    { "de": "Wir müssen die Kinder versorgen.", "es": "Tenemos que abastecer a los niños." },
    { "de": "Die Großeltern haben sie mit Essen versorgt.", "es": "Los abuelos los han abastecido con comida." },
    { "de": "Versorgst du die Katze, wenn wir weg sind?", "es": "¿Abasteces al gato cuando estamos fuera?" }
  ],
  "April": [
    { "de": "Der April ist wechselhaft.", "es": "Abril es variable." },
    { "de": "Im April haben wir Ostern gefeiert.", "es": "En abril hemos celebrado la Pascua." },
    { "de": "Magst du den April?", "es": "¿Te gusta abril?" }
  ],
  "die Kirche": [
    { "de": "Die Kirche steht auf dem Hügel.", "es": "La iglesia está en la colina." },
    { "de": "Sie hat in der Kirche geheiratet.", "es": "Ella se ha casado en la iglesia." },
    { "de": "Gehst du sonntags in die Kirche?", "es": "¿Vas los domingos a la iglesia?" }
  ],
  "Heimat": [
    { "de": "Die Heimat ist für immer im Herzen.", "es": "La patria está para siempre en el corazón." },
    { "de": "Er hat seine Heimat verlassen.", "es": "Él ha abandonado su tierra natal." },
    { "de": "Vermisst du deine Heimat?", "es": "¿Echas de menos tu tierra natal?" }
  ],
  "der Fluss": [
    { "de": "Der Fluss ist sauber.", "es": "El río está limpio." },
    { "de": "Wir sind am Fluss entlang spaziert.", "es": "Hemos paseado a lo largo del río." },
    { "de": "Badest du im Sommer im Fluss?", "es": "¿Te bañas en verano en el río?" }
  ],
  "Arbeitsvertrag": [
    { "de": "Der Arbeitsvertrag ist unbefristet.", "es": "El contrato laboral es indefinido." },
    { "de": "Ich habe den Arbeitsvertrag unterschrieben.", "es": "He firmado el contrato laboral." },
    { "de": "Hast du deinen Arbeitsvertrag gelesen?", "es": "¿Has leído tu contrato laboral?" }
  ],
  "die Kuh": [
    { "de": "Die Kuh gibt frische Milch.", "es": "La vaca da leche fresca." },
    { "de": "Der Bauer hat die Kühe auf die Weide gebracht.", "es": "El granjero ha llevado las vacas al prado." },
    { "de": "Hast du schon einmal eine Kuh gemolken?", "es": "¿Has ordeñado ya alguna vez una vaca?" }
  ]
};

// Unir con lo existente y guardar
const combined = { ...existing, ...block5 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 5 añadido. Total de palabras ahora:", Object.keys(combined).length);