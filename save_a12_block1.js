const fs = require("fs");
const phrases = {
  "Rasierer": [
    { de: "Der Rasierer ist neu.", es: "La afeitadora es nueva." },
    { de: "Ich habe den Rasierer im Badezimmer gefunden.", es: "He encontrado la afeitadora en el baño." },
    { de: "Kannst du mir den Rasierer geben?", es: "¿Puedes darme la afeitadora?" }
  ],
  "das Dorf": [
    { de: "Das Dorf ist ruhig.", es: "El pueblo es tranquilo." },
    { de: "Wir haben das Dorf am Wochenende besucht.", es: "Hemos visitado el pueblo el fin de semana." },
    { de: "Willst du das Dorf sehen?", es: "¿Quieres ver el pueblo?" }
  ],
  "Zahnseide": [
    { de: "Die Zahnseide ist wichtig.", es: "El hilo dental es importante." },
    { de: "Ich habe die Zahnseide in der Drogerie gekauft.", es: "He comprado el hilo dental en la droguería." },
    { de: "Benutzt du die Zahnseide jeden Tag?", es: "¿Usas el hilo dental todos los días?" }
  ],
  "nähen": [
    { de: "Meine Oma kann gut nähen.", es: "Mi abuela sabe coser bien." },
    { de: "Ich habe ein Kleid genäht.", es: "He cosido un vestido." },
    { de: "Willst du nähen lernen?", es: "¿Quieres aprender a coser?" }
  ],
  "reparieren": [
    { de: "Mein Vater muss das Fahrrad reparieren.", es: "Mi padre tiene que reparar la bicicleta." },
    { de: "Er hat den Fernseher repariert.", es: "Él ha reparado el televisor." },
    { de: "Kannst du das kaputte Fenster reparieren?", es: "¿Puedes reparar la ventana rota?" }
  ],
  "Kaninchen": [
    { de: "Das Kaninchen ist süß.", es: "El conejo es bonito." },
    { de: "Ich habe ein Kaninchen im Garten gefunden.", es: "He encontrado un conejo en el jardín." },
    { de: "Magst du Kaninchen?", es: "¿Te gustan los conejos?" }
  ],
  "Tür": [
    { de: "Die Tür ist aus Holz.", es: "La puerta es de madera." },
    { de: "Er hat die Tür rot gestrichen.", es: "Él ha pintado la puerta de rojo." },
    { de: "Kannst du bitte die Tür schließen?", es: "¿Puedes cerrar la puerta, por favor?" }
  ],
  "einladen": [
    { de: "Ich muss meine Freunde einladen.", es: "Tengo que invitar a mis amigos." },
    { de: "Sie hat mich zum Abendessen eingeladen.", es: "Ella me ha invitado a cenar." },
    { de: "Lädst du mich ein?", es: "¿Me invitas?" }
  ],
  "brechen": [
    { de: "Das Glas kann brechen.", es: "El vaso puede romperse." },
    { de: "Ich habe mir den Arm gebrochen.", es: "Me he roto el brazo." },
    { de: "Hast du schon einen Knochen gebrochen?", es: "¿Te has roto ya algún hueso?" }
  ],
  "Korn": [
    { de: "Das Korn ist reif.", es: "El grano está maduro." },
    { de: "Der Bauer hat das Korn geerntet.", es: "El agricultor ha cosechado el grano." },
    { de: "Wächst hier viel Korn?", es: "¿Crece aquí mucho grano?" }
  ],
  "saugen": [
    { de: "Ich muss den Teppich saugen.", es: "Tengo que aspirar la alfombra." },
    { de: "Sie hat das ganze Haus gesaugt.", es: "Ella ha aspirado toda la casa." },
    { de: "Kannst du bitte das Wohnzimmer saugen?", es: "¿Puedes aspirar el salón, por favor?" }
  ],
  "ersetzen": [
    { de: "Wir müssen den Schlüssel ersetzen.", es: "Tenemos que reemplazar la llave." },
    { de: "Der Chef hat den alten Drucker ersetzt.", es: "El jefe ha reemplazado la impresora vieja." },
    { de: "Kann man das kaputte Teil ersetzen?", es: "¿Se puede reemplazar la pieza rota?" }
  ],
  "fallenlassen": [
    { de: "Pass auf, du darfst das Glas nicht fallenlassen.", es: "Ten cuidado, no debes dejar caer el vaso." },
    { de: "Er hat den Teller fallenlassen.", es: "Él ha dejado caer el plato." },
    { de: "Hast du das Buch fallenlassen?", es: "¿Has dejado caer el libro?" }
  ],
  "Zwischenfall": [
    { de: "Der Zwischenfall war unerwartet.", es: "El incidente fue inesperado." },
    { de: "Die Polizei hat den Zwischenfall aufgenommen.", es: "La policía ha registrado el incidente." },
    { de: "Gab es einen Zwischenfall?", es: "¿Hubo un incidente?" }
  ],
  "Schalter": [
    { de: "Der Schalter ist kaputt.", es: "La ventanilla está rota." },
    { de: "Ich habe das Geld am Schalter abgeholt.", es: "He recogido el dinero en la ventanilla." },
    { de: "Wo ist der Schalter?", es: "¿Dónde está la ventanilla?" }
  ],
  "einparken": [
    { de: "Ich muss das Auto einparken.", es: "Tengo que aparcar el coche." },
    { de: "Er hat den Wagen vor dem Haus eingeparkt.", es: "Él ha aparcado el coche delante de la casa." },
    { de: "Kannst du hier einparken?", es: "¿Puedes aparcar aquí?" }
  ],
  "würzen": [
    { de: "Ich muss die Suppe würzen.", es: "Tengo que condimentar la sopa." },
    { de: "Sie hat das Fleisch stark gewürzt.", es: "Ella ha condimentado mucho la carne." },
    { de: "Mit was würzt du den Salat?", es: "¿Con qué condimentas la ensalada?" }
  ],
  "jäten": [
    { de: "Ich muss das Unkraut jäten.", es: "Tengo que desherbar la mala hierba." },
    { de: "Er hat den ganzen Garten gejätet.", es: "Él ha desherbado todo el jardín." },
    { de: "Kannst du mir helfen, das Beet zu jäten?", es: "¿Puedes ayudarme a desherbar el macizo?" }
  ],
  "fünfzig": [
    { de: "Die fünfzig ist eine runde Zahl.", es: "El cincuenta es un número redondo." },
    { de: "Ich habe fünfzig Euro gespart.", es: "He ahorrado cincuenta euros." },
    { de: "Kostet das fünfzig Cent?", es: "¿Cuesta cincuenta céntimos?" }
  ],
  "Fluss": [
    { de: "Der Fluss ist lang und breit.", es: "El río es largo y ancho." },
    { de: "Wir sind am Fluss entlang spaziert.", es: "Hemos paseado a lo largo del río." },
    { de: "Fließt der Fluss durch die Stadt?", es: "¿Pasa el río por la ciudad?" }
  ],
  "See": [
    { de: "Der See ist kalt.", es: "El lago es frío." },
    { de: "Im Sommer haben wir im See gebadet.", es: "En verano nos hemos bañado en el lago." },
    { de: "Willst du an den See fahren?", es: "¿Quieres ir al lago?" }
  ],
  "wandern": [
    { de: "Wir wollen morgen wandern.", es: "Queremos hacer senderismo mañana." },
    { de: "Sie sind durch den Wald gewandert.", es: "Ellos han hecho senderismo por el bosque." },
    { de: "Wanderst du gern in den Bergen?", es: "¿Te gusta hacer senderismo en las montañas?" }
  ],
  "das Glas": [
    { de: "Das Glas ist voll.", es: "El vaso está lleno." },
    { de: "Ich habe ein Glas Wasser getrunken.", es: "He bebido un vaso de agua." },
    { de: "Kannst du mir das Glas geben?", es: "¿Puedes darme el vaso?" }
  ],
  "die Sieben": [
    { de: "Die Sieben ist meine Glückszahl.", es: "El siete es mi número de la suerte." },
    { de: "Ich habe die Sieben im Lotto gezogen.", es: "He sacado el siete en la lotería." },
    { de: "Magst du die Sieben?", es: "¿Te gusta el siete?" }
  ],
  "Fristverlängerung": [
    { de: "Die Fristverlängerung ist nötig.", es: "La prórroga es necesaria." },
    { de: "Er hat eine Fristverlängerung beantragt.", es: "Él ha solicitado una prórroga." },
    { de: "Kannst du eine Fristverlängerung verlangen?", es: "¿Puedes pedir una prórroga?" }
  ],
  "natürlich": [
    { de: "Das ist ganz natürlich.", es: "Eso es completamente natural." },
    { de: "Ich habe natürlich zugestimmt.", es: "He aceptado naturalmente." },
    { de: "Kommst du natürlich mit?", es: "¿Vienes naturalmente?" }
  ],
  "zeichnen": [
    { de: "Mein Sohn kann gut zeichnen.", es: "Mi hijo sabe dibujar bien." },
    { de: "Ich habe einen Baum gezeichnet.", es: "He dibujado un árbol." },
    { de: "Zeichnest du gern Tiere?", es: "¿Te gusta dibujar animales?" }
  ],
  "Zeitalter": [
    { de: "Das digitale Zeitalter hat begonnen.", es: "La era digital ha comenzado." },
    { de: "Wir leben in einem neuen Zeitalter.", es: "Vivimos en una nueva era." },
    { de: "Bist du bereit für das Zeitalter?", es: "¿Estás listo para la era?" }
  ],
  "die Torte": [
    { de: "Die Torte schmeckt süß.", es: "La tarta sabe dulce." },
    { de: "Meine Mutter hat eine Torte gebacken.", es: "Mi madre ha horneado una tarta." },
    { de: "Kannst du die Torte anschneiden?", es: "¿Puedes cortar la tarta?" }
  ],
  "Schinken": [
    { de: "Der Schinken ist mager.", es: "El jamón es magro." },
    { de: "Ich habe Schinken für das Frühstück gekauft.", es: "He comprado jamón para el desayuno." },
    { de: "Isst du gern Schinken?", es: "¿Te gusta comer jamón?" }
  ],
  "starr": [
    { de: "Der alte Mann ist starr vor Kälte.", es: "El anciano está rígido de frío." },
    { de: "Er blieb starr vor Schreck stehen.", es: "Se quedó parado, rígido de susto." },
    { de: "Bist du vor Kälte starr?", es: "¿Estás rígido de frío?" }
  ],
  "einsetzen": [
    { de: "Du musst die Maschine richtig einsetzen.", es: "Tienes que emplear la máquina correctamente." },
    { de: "Sie hat das Werkzeug geschickt eingesetzt.", es: "Ella ha empleado la herramienta hábilmente." },
    { de: "Kannst du den Bohrer einsetzen?", es: "¿Puedes emplear el taladro?" }
  ],
  "Schnee": [
    { de: "Der Schnee ist weiß.", es: "La nieve es blanca." },
    { de: "Es hat gestern viel geschneit.", es: "Ayer ha nevado mucho." },
    { de: "Liebst du den Schnee?", es: "¿Amas la nieve?" }
  ],
  "Wind": [
    { de: "Der Wind ist stark.", es: "El viento es fuerte." },
    { de: "Der Sturm hat den Zaun umgeweht.", es: "La tormenta ha derribado la valla." },
    { de: "Spürst du den Wind?", es: "¿Notas el viento?" }
  ],
  "Zettel": [
    { de: "Der Zettel ist wichtig.", es: "La nota es importante." },
    { de: "Ich habe einen Zettel an die Tür gehängt.", es: "He colgado una nota en la puerta." },
    { de: "Hast du den Zettel gelesen?", es: "¿Has leído la nota?" }
  ],
  "schwer": [
    { de: "Die Tasche ist schwer.", es: "La bolsa es pesada." },
    { de: "Ich habe die Prüfung schwer gefunden.", es: "He encontrado el examen difícil." },
    { de: "Ist die Arbeit schwer?", es: "¿Es difícil el trabajo?" }
  ],
  "leicht": [
    { de: "Die Übung ist leicht.", es: "El ejercicio es fácil." },
    { de: "Er hat die Aufgabe leicht gelöst.", es: "Él ha resuelto la tarea fácilmente." },
    { de: "Findest du Mathe leicht?", es: "¿Encuentras fáciles las matemáticas?" }
  ],
  "Montag": [
    { de: "Montag ist mein erster Arbeitstag.", es: "El lunes es mi primer día de trabajo." },
    { de: "Ich habe am Montag frei.", es: "Tengo libre el lunes." },
    { de: "Kommst du am Montag?", es: "¿Vienes el lunes?" }
  ],
  "Dienstag": [
    { de: "Der Dienstag ist ein normaler Tag.", es: "El martes es un día normal." },
    { de: "Er hat am Dienstag Geburtstag.", es: "Él cumple años el martes." },
    { de: "Hast du am Dienstag Zeit?", es: "¿Tienes tiempo el martes?" }
  ],
  "die Dusche": [
    { de: "Die Dusche ist kalt.", es: "La ducha está fría." },
    { de: "Ich habe heute Morgen geduscht.", es: "Me he duchado esta mañana." },
    { de: "Kannst du die Dusche reparieren?", es: "¿Puedes reparar la ducha?" }
  ],
  "der Abend": [
    { de: "Der Abend ist ruhig.", es: "La tarde/noche es tranquila." },
    { de: "Wir haben den Abend zu Hause verbracht.", es: "Hemos pasado la tarde/noche en casa." },
    { de: "Was machst du am Abend?", es: "¿Qué haces por la tarde/noche?" }
  ],
  "beschränken": [
    { de: "Du musst den Zuckerkonsum beschränken.", es: "Tienes que limitar el consumo de azúcar." },
    { de: "Er hat die Ausgaben beschränkt.", es: "Él ha limitado los gastos." },
    { de: "Willst du die Menge beschränken?", es: "¿Quieres limitar la cantidad?" }
  ],
  "vermehren": [
    { de: "Die Firma muss den Gewinn vermehren.", es: "La empresa tiene que multiplicar el beneficio." },
    { de: "Sie haben die Anstrengungen vermehrt.", es: "Han multiplicado los esfuerzos." },
    { de: "Kann man das Kapital vermehren?", es: "¿Se puede multiplicar el capital?" }
  ],
  "kaputt": [
    { de: "Der Kugelschreiber ist kaputt.", es: "El bolígrafo está roto." },
    { de: "Er hat das Spielzeug kaputt gemacht.", es: "Él ha roto el juguete." },
    { de: "Ist die Lampe kaputt?", es: "¿Está rota la lámpara?" }
  ],
  "fertig": [
    { de: "Das Abendessen ist fertig.", es: "La cena está lista." },
    { de: "Ich habe meine Hausaufgaben fertig gemacht.", es: "He terminado mis deberes." },
    { de: "Bist du fertig?", es: "¿Estás listo?" }
  ],
  "der Spiegel": [
    { de: "Der Spiegel ist sauber.", es: "El espejo está limpio." },
    { de: "Sie hat in den Spiegel geschaut.", es: "Ella se ha mirado en el espejo." },
    { de: "Hast du einen Spiegel im Bad?", es: "¿Tienes un espejo en el baño?" }
  ],
  "Rasen": [
    { de: "Der Rasen ist grün.", es: "El césped es verde." },
    { de: "Der Gärtner hat den Rasen gemäht.", es: "El jardinero ha cortado el césped." },
    { de: "Darf man den Rasen betreten?", es: "¿Se puede pisar el césped?" }
  ],
  "die Buchhandlung": [
    { de: "Die Buchhandlung ist groß.", es: "La librería es grande." },
    { de: "Ich habe das Buch in der Buchhandlung gekauft.", es: "He comprado el libro en la librería." },
    { de: "Gibt es eine Buchhandlung in der Nähe?", es: "¿Hay una librería cerca?" }
  ],
  "Giraffe": [
    { de: "Die Giraffe hat einen langen Hals.", es: "La jirafa tiene un cuello largo." },
    { de: "Wir haben eine Giraffe im Zoo gesehen.", es: "Hemos visto una jirafa en el zoo." },
    { de: "Magst du Giraffen?", es: "¿Te gustan las jirafas?" }
  ],
  "Muskel": [
    { de: "Der Muskel ist stark.", es: "El músculo es fuerte." },
    { de: "Er hat sich den Muskel verletzt.", es: "Él se ha lesionado el músculo." },
    { de: "Trainierst du deine Muskeln?", es: "¿Entrenas tus músculos?" }
  ]
};

const jsonStr = JSON.stringify(phrases, null, 2);
// Escapar caracteres no ASCII a \uXXXX
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 1 de A1.2 guardado. Total de palabras: 50");