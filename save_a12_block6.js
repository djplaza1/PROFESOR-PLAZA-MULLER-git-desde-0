const fs = require("fs");

// Cargar archivo existente (bloques 1-5)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 6: palabras 251 a 300
const block6 = {
  "zu Mittag essen": [
    { "de": "Wir wollen heute im Park zu Mittag essen.", "es": "Hoy queremos comer en el parque." },
    { "de": "Ich habe schon zu Mittag gegessen.", "es": "Ya he comido al mediodía." },
    { "de": "Isst du mit uns zu Mittag?", "es": "¿Comes con nosotros al mediodía?" }
  ],
  "Minijob": [
    { "de": "Der Minijob ist gut für Studenten.", "es": "El miniempleo es bueno para los estudiantes." },
    { "de": "Sie hat einen Minijob im Supermarkt gefunden.", "es": "Ella ha encontrado un miniempleo en el supermercado." },
    { "de": "Hast du einen Minijob?", "es": "¿Tienes un miniempleo?" }
  ],
  "schlafen": [
    { "de": "Ich muss heute früher schlafen.", "es": "Hoy tengo que dormir más temprano." },
    { "de": "Das Baby hat die ganze Nacht geschlafen.", "es": "El bebé ha dormido toda la noche." },
    { "de": "Schläfst du schon?", "es": "¿Ya duermes?" }
  ],
  "aufstehen": [
    { "de": "Morgen muss ich um sechs aufstehen.", "es": "Mañana tengo que levantarme a las seis." },
    { "de": "Er ist heute sehr früh aufgestanden.", "es": "Él se ha levantado hoy muy temprano." },
    { "de": "Stehst du am Samstag spät auf?", "es": "¿Te levantas tarde el sábado?" }
  ],
  "Bikini": [
    { "de": "Der Bikini ist zu klein.", "es": "El bikini es demasiado pequeño." },
    { "de": "Ich habe mir einen neuen Bikini gekauft.", "es": "Me he comprado un bikini nuevo." },
    { "de": "Trägst du den Bikini am Strand?", "es": "¿Llevas el bikini en la playa?" }
  ],
  "der Affe": [
    { "de": "Der Affe ist sehr neugierig.", "es": "El mono es muy curioso." },
    { "de": "Wir haben den Affen im Zoo gefüttert.", "es": "Hemos dado de comer al mono en el zoo." },
    { "de": "Magst du Affen?", "es": "¿Te gustan los monos?" }
  ],
  "Gewächshaus": [
    { "de": "Das Gewächshaus steht hinter dem Haus.", "es": "El invernadero está detrás de la casa." },
    { "de": "Opa hat Tomaten im Gewächshaus gezogen.", "es": "El abuelo ha cultivado tomates en el invernadero." },
    { "de": "Darf ich dein Gewächshaus sehen?", "es": "¿Puedo ver tu invernadero?" }
  ],
  "die Walnuss": [
    { "de": "Die Walnuss ist reif.", "es": "La nuez está madura." },
    { "de": "Wir haben Walnüsse vom Baum geschüttelt.", "es": "Hemos sacudido nueces del árbol." },
    { "de": "Isst du gern Walnüsse?", "es": "¿Te gusta comer nueces?" }
  ],
  "Oktober": [
    { "de": "Der Oktober ist kühl und bunt.", "es": "Octubre es fresco y colorido." },
    { "de": "Im Oktober haben wir Kürbisse geschnitzt.", "es": "En octubre hemos tallado calabazas." },
    { "de": "Feierst du im Oktober ein Fest?", "es": "¿Celebras una fiesta en octubre?" }
  ],
  "Regenschirm": [
    { "de": "Mein Regenschirm ist kaputt.", "es": "Mi paraguas está roto." },
    { "de": "Ich habe den Regenschirm im Bus vergessen.", "es": "He olvidado el paraguas en el autobús." },
    { "de": "Nimmst du einen Regenschirm mit?", "es": "¿Llevas un paraguas?" }
  ],
  "Sandale": [
    { "de": "Die Sandale ist bequem.", "es": "La sandalia es cómoda." },
    { "de": "Er hat die Sandalen im Urlaub getragen.", "es": "Él ha llevado las sandalias en las vacaciones." },
    { "de": "Kaufst du dir neue Sandalen?", "es": "¿Te compras sandalias nuevas?" }
  ],
  "Sonntag": [
    { "de": "Der Sonntag ist mein Ruhetag.", "es": "El domingo es mi día de descanso." },
    { "de": "Am Sonntag haben wir ausgeschlafen.", "es": "El domingo hemos dormido hasta tarde." },
    { "de": "Was machst du am Sonntag?", "es": "¿Qué haces el domingo?" }
  ],
  "Wochenende": [
    { "de": "Das Wochenende war viel zu kurz.", "es": "El fin de semana fue demasiado corto." },
    { "de": "Wir haben das Wochenende auf dem Land verbracht.", "es": "Hemos pasado el fin de semana en el campo." },
    { "de": "Was hast du am Wochenende vor?", "es": "¿Qué planes tienes para el fin de semana?" }
  ],
  "der Dachboden": [
    { "de": "Der Dachboden ist staubig.", "es": "El ático está polvoriento." },
    { "de": "Wir haben alte Fotos auf dem Dachboden gefunden.", "es": "Hemos encontrado fotos antiguas en el ático." },
    { "de": "Warst du schon auf dem Dachboden?", "es": "¿Has estado ya en el ático?" }
  ],
  "das Schnitzel": [
    { "de": "Das Schnitzel ist knusprig.", "es": "El escalope está crujiente." },
    { "de": "Mama hat Wiener Schnitzel gemacht.", "es": "Mamá ha hecho escalope vienés." },
    { "de": "Isst du gern Schnitzel?", "es": "¿Te gusta comer escalope?" }
  ],
  "Polizeiwache": [
    { "de": "Die Polizeiwache ist an der Ecke.", "es": "La comisaría está en la esquina." },
    { "de": "Er hat den Diebstahl auf der Polizeiwache gemeldet.", "es": "Él ha denunciado el robo en la comisaría." },
    { "de": "Weißt du, wo die Polizeiwache ist?", "es": "¿Sabes dónde está la comisaría?" }
  ],
  "der Tag": [
    { "de": "Der Tag war anstrengend.", "es": "El día fue agotador." },
    { "de": "Ich habe den Tag mit einem Buch verbracht.", "es": "He pasado el día con un libro." },
    { "de": "Wie war dein Tag?", "es": "¿Cómo ha sido tu día?" }
  ],
  "Bauch": [
    { "de": "Mein Bauch tut weh.", "es": "Me duele la barriga." },
    { "de": "Er hat sich den Bauch vollgeschlagen.", "es": "Él se ha llenado la barriga." },
    { "de": "Hast du Schmerzen im Bauch?", "es": "¿Tienes dolor de barriga?" }
  ],
  "Oma": [
    { "de": "Die Oma backt einen Apfelkuchen.", "es": "La abuela hornea una tarta de manzana." },
    { "de": "Meine Oma hat mir eine Geschichte erzählt.", "es": "Mi abuela me ha contado una historia." },
    { "de": "Besuchst du deine Oma am Samstag?", "es": "¿Visitas a tu abuela el sábado?" }
  ],
  "Mittag": [
    { "de": "Der Mittag ist die wärmste Zeit.", "es": "El mediodía es la hora más cálida." },
    { "de": "Wir haben den Mittag im Schatten verbracht.", "es": "Hemos pasado el mediodía a la sombra." },
    { "de": "Isst du um Mittag?", "es": "¿Comes al mediodía?" }
  ],
  "Stall": [
    { "de": "Der Stall riecht nach Heu.", "es": "El establo huele a heno." },
    { "de": "Der Bauer hat die Kühe in den Stall gebracht.", "es": "El granjero ha llevado las vacas al establo." },
    { "de": "Darf ich den Stall ausmisten?", "es": "¿Puedo limpiar el establo?" }
  ],
  "richten": [
    { "de": "Du musst die Lampe zur Wand richten.", "es": "Tienes que dirigir la lámpara hacia la pared." },
    { "de": "Er hat seinen Blick auf mich gerichtet.", "es": "Él ha dirigido su mirada hacia mí." },
    { "de": "Richtest du die Kamera auf die Bühne?", "es": "¿Diriges la cámara hacia el escenario?" }
  ],
  "Heizung": [
    { "de": "Die Heizung ist im Winter wichtig.", "es": "La calefacción es importante en invierno." },
    { "de": "Wir haben die Heizung im September eingeschaltet.", "es": "Encendimos la calefacción en septiembre." },
    { "de": "Funktioniert die Heizung?", "es": "¿Funciona la calefacción?" }
  ],
  "Pferdeschwanz": [
    { "de": "Ihr Pferdeschwanz ist sehr lang.", "es": "Su cola de caballo es muy larga." },
    { "de": "Sie hat sich einen Pferdeschwanz gemacht.", "es": "Ella se ha hecho una cola de caballo." },
    { "de": "Trägst du gern einen Pferdeschwanz?", "es": "¿Te gusta llevar coleta?" }
  ],
  "Paprika": [
    { "de": "Die Paprika ist rot und gelb.", "es": "El pimiento es rojo y amarillo." },
    { "de": "Ich habe Paprika in den Salat geschnitten.", "es": "He cortado pimiento en la ensalada." },
    { "de": "Magst du gegrillte Paprika?", "es": "¿Te gusta el pimiento asado?" }
  ],
  "Weste": [
    { "de": "Die Weste ist aus Wolle.", "es": "El chaleco es de lana." },
    { "de": "Opa hat eine warme Weste getragen.", "es": "El abuelo ha llevado un chaleco caliente." },
    { "de": "Ziehst du eine Weste unter die Jacke?", "es": "¿Te pones un chaleco debajo de la chaqueta?" }
  ],
  "der Orangensaft": [
    { "de": "Der Orangensaft ist frisch gepresst.", "es": "El zumo de naranja es recién exprimido." },
    { "de": "Ich habe mir einen Orangensaft bestellt.", "es": "Me he pedido un zumo de naranja." },
    { "de": "Trinkst du gern Orangensaft zum Frühstück?", "es": "¿Te gusta beber zumo de naranja para desayunar?" }
  ],
  "handeln": [
    { "de": "Wir müssen jetzt schnell handeln.", "es": "Tenemos que actuar rápido ahora." },
    { "de": "Er hat aus Liebe gehandelt.", "es": "Él ha actuado por amor." },
    { "de": "Handelst du immer so vorsichtig?", "es": "¿Actúas siempre con tanta precaución?" }
  ],
  "traurig": [
    { "de": "Der Film war sehr traurig.", "es": "La película fue muy triste." },
    { "de": "Sie hat traurig aus dem Fenster geschaut.", "es": "Ella ha mirado triste por la ventana." },
    { "de": "Warum bist du so traurig?", "es": "¿Por qué estás tan triste?" }
  ],
  "freundlich": [
    { "de": "Die Verkäuferin ist immer freundlich.", "es": "La vendedora siempre es amable." },
    { "de": "Er hat mich freundlich begrüßt.", "es": "Él me ha saludado amablemente." },
    { "de": "Bist du zu jedem freundlich?", "es": "¿Eres amable con todo el mundo?" }
  ],
  "der Teller": [
    { "de": "Der Teller ist aus Porzellan.", "es": "El plato es de porcelana." },
    { "de": "Ich habe den Teller fallenlassen.", "es": "He dejado caer el plato." },
    { "de": "Kannst du den Teller abtrocknen?", "es": "¿Puedes secar el plato?" }
  ],
  "die Badewanne": [
    { "de": "Die Badewanne ist voller Schaum.", "es": "La bañera está llena de espuma." },
    { "de": "Ich habe ein heißes Bad in der Wanne genommen.", "es": "Me he dado un baño caliente en la bañera." },
    { "de": "Hast du die Badewanne schon geputzt?", "es": "¿Ya has limpiado la bañera?" }
  ],
  "die Waffel": [
    { "de": "Die Waffel duftet nach Vanille.", "es": "El gofre huele a vainilla." },
    { "de": "Wir haben Waffeln mit Sahne gegessen.", "es": "Hemos comido gofres con nata." },
    { "de": "Backst du gern Waffeln?", "es": "¿Te gusta hacer gofres?" }
  ],
  "einteilen": [
    { "de": "Du musst die Arbeit in kleine Schritte einteilen.", "es": "Tienes que dividir el trabajo en pasos pequeños." },
    { "de": "Er hat das Geld in drei Teile eingeteilt.", "es": "Él ha dividido el dinero en tres partes." },
    { "de": "Teilst du deine Zeit gut ein?", "es": "¿Distribuyes bien tu tiempo?" }
  ],
  "der Saft": [
    { "de": "Der Saft ist aus frischen Äpfeln.", "es": "El zumo es de manzanas frescas." },
    { "de": "Ich habe den Saft in den Kühlschrank gestellt.", "es": "He metido el zumo en la nevera." },
    { "de": "Willst du einen Saft?", "es": "¿Quieres un zumo?" }
  ],
  "Hals": [
    { "de": "Mein Hals kratzt.", "es": "Me pica la garganta." },
    { "de": "Er hat sich den Hals verrenkt.", "es": "Él se ha torcido el cuello." },
    { "de": "Tut dein Hals weh?", "es": "¿Te duele la garganta?" }
  ],
  "betrunken": [
    { "de": "Der Fahrer war nicht betrunken.", "es": "El conductor no estaba borracho." },
    { "de": "Er hat zu viel Wein getrunken und ist betrunken geworden.", "es": "Él ha bebido demasiado vino y se ha emborrachado." },
    { "de": "Warst du je betrunken?", "es": "¿Has estado borracho alguna vez?" }
  ],
  "die Toilette": [
    { "de": "Die Toilette ist besetzt.", "es": "El inodoro está ocupado." },
    { "de": "Ich muss dringend auf die Toilette.", "es": "Tengo que ir urgentemente al baño." },
    { "de": "Darf ich deine Toilette benutzen?", "es": "¿Puedo usar tu baño?" }
  ],
  "die Straße": [
    { "de": "Die Straße ist nass und glatt.", "es": "La calle está mojada y resbaladiza." },
    { "de": "Wir sind die Straße entlang gegangen.", "es": "Hemos caminado por la calle." },
    { "de": "Kennst du diese Straße?", "es": "¿Conoces esta calle?" }
  ],
  "Brett": [
    { "de": "Das Brett ist aus Eichenholz.", "es": "La tabla es de madera de roble." },
    { "de": "Er hat das Brett mit der Säge zugeschnitten.", "es": "Él ha cortado la tabla con la sierra." },
    { "de": "Kannst du das Brett halten?", "es": "¿Puedes sujetar la tabla?" }
  ],
  "rutschen": [
    { "de": "Die Kinder wollen auf der Eisbahn rutschen.", "es": "Los niños quieren resbalar en la pista de hielo." },
    { "de": "Er ist auf der Bananenschale ausgerutscht.", "es": "Él se ha resbalado con la piel de plátano." },
    { "de": "Rutschst du gern?", "es": "¿Te gusta deslizarte?" }
  ],
  "Post": [
    { "de": "Die Post ist noch nicht angekommen.", "es": "El correo aún no ha llegado." },
    { "de": "Ich habe die Post heute Morgen geholt.", "es": "He recogido el correo esta mañana." },
    { "de": "Hast du die Post gesehen?", "es": "¿Has visto el correo?" }
  ],
  "Telefon": [
    { "de": "Das Telefon klingelt ununterbrochen.", "es": "El teléfono suena sin parar." },
    { "de": "Ich habe mit Oma telefoniert.", "es": "He hablado por teléfono con la abuela." },
    { "de": "Kannst du ans Telefon gehen?", "es": "¿Puedes contestar al teléfono?" }
  ],
  "die Kirsche": [
    { "de": "Die Kirsche ist süß.", "es": "La cereza es dulce." },
    { "de": "Der Vogel hat alle Kirschen vom Baum gefressen.", "es": "El pájaro se ha comido todas las cerezas del árbol." },
    { "de": "Pflückst du Kirschen mit mir?", "es": "¿Recoges cerezas conmigo?" }
  ],
  "Eiscreme": [
    { "de": "Die Eiscreme schmilzt in der Sonne.", "es": "El helado se derrite al sol." },
    { "de": "Wir haben drei Kugeln Eiscreme gegessen.", "es": "Hemos comido tres bolas de helado." },
    { "de": "Was ist deine Lieblingseiscreme?", "es": "¿Cuál es tu helado favorito?" }
  ],
  "die Uhr": [
    { "de": "Die Uhr an der Wand tickt laut.", "es": "El reloj de la pared hace tictac fuerte." },
    { "de": "Ich habe mir eine neue Armbanduhr gekauft.", "es": "Me he comprado un reloj de pulsera nuevo." },
    { "de": "Weißt du, wie spät es auf der Uhr ist?", "es": "¿Sabes qué hora marca el reloj?" }
  ],
  "die Spülmaschine": [
    { "de": "Die Spülmaschine ist sehr praktisch.", "es": "El lavavajillas es muy práctico." },
    { "de": "Er hat die Teller in die Spülmaschine eingeräumt.", "es": "Él ha colocado los platos en el lavavajillas." },
    { "de": "Hast du die Spülmaschine schon ausgeräumt?", "es": "¿Ya has vaciado el lavavajillas?" }
  ],
  "Auszubildende": [
    { "de": "Der Auszubildende lernt schnell.", "es": "El aprendiz aprende rápido." },
    { "de": "Die Firma hat einen neuen Auszubildenden eingestellt.", "es": "La empresa ha contratado a un nuevo aprendiz." },
    { "de": "Bist du Auszubildender?", "es": "¿Eres aprendiz?" }
  ],
  "Mund": [
    { "de": "Dein Mund ist voller Schokolade.", "es": "Tu boca está llena de chocolate." },
    { "de": "Er hat sich den Mund am heißen Tee verbrannt.", "es": "Él se ha quemado la boca con el té caliente." },
    { "de": "Hast du dir den Mund verletzt?", "es": "¿Te has hecho daño en la boca?" }
  ],
  "bescheiden": [
    { "de": "Der Mann ist sehr bescheiden.", "es": "El hombre es muy modesto." },
    { "de": "Sie hat bescheiden über ihren Erfolg gesprochen.", "es": "Ella ha hablado con modestia de su éxito." },
    { "de": "Bleibst du immer bescheiden?", "es": "¿Te mantienes siempre modesto?" }
  ]
};

// Unir y guardar
const combined = { ...existing, ...block6 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 6 añadido. Total de palabras ahora:", Object.keys(combined).length);