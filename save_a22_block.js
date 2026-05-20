const fs = require("fs");
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A2.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A2.2.json", "utf8");
  existing = JSON.parse(raw);
}
// ▼▼▼ PEGA AQUÍ EL BLOQUE DE FRASES (blockX) ▼▼▼
const blockX = {
  "küssen": [
    { "de": "Ich küsse meine kleine Tochter jeden Morgen.", "es": "Beso a mi pequeña hija cada mañana." },
    { "de": "Gestern hat er seine Freundin am Bahnhof geküsst, obwohl viele Leute zusahen.", "es": "Ayer besó a su novia en la estación, aunque mucha gente miraba." },
    { "de": "Küsst du deine Oma zur Begrüßung auf die weiche Wange?", "es": "¿Besas a tu abuela en la suave mejilla para saludar?" }
  ],
  "der Elektriker": [
    { "de": "Der erfahrene Elektriker kommt morgen früh.", "es": "El electricista experimentado viene mañana temprano." },
    { "de": "Gestern hat der neue Elektriker die kaputte Leitung repariert, deshalb geht das Licht wieder.", "es": "Ayer el nuevo electricista reparó la línea rota, por eso la luz funciona otra vez." },
    { "de": "Rufst du den günstigen Elektriker aus der Nachbarstraße an?", "es": "¿Llamas al electricista barato de la calle de al lado?" }
  ],
  "Region": [
    { "de": "Die bergige Region ist bei Wanderern sehr beliebt.", "es": "La región montañosa es muy popular entre los excursionistas." },
    { "de": "Gestern haben wir eine unbekannte Region erkundet, weil wir Abenteuer suchten.", "es": "Ayer exploramos una región desconocida porque buscábamos aventura." },
    { "de": "Kommst du aus der gleichen ländlichen Region wie dein Mann?", "es": "¿Vienes de la misma región rural que tu marido?" }
  ],
  "sich outen": [
    { "de": "Er outet sich vor seinen strengen Eltern.", "es": "Él se declara ante sus estrictos padres." },
    { "de": "Gestern hat sie sich im engen Freundeskreis geoutet, deshalb ist sie jetzt erleichtert.", "es": "Ayer se declaró en el círculo reducido de amigos, por eso ahora está aliviada." },
    { "de": "Würdest du dich auf der großen Familienfeier outen?", "es": "¿Te declararías en la gran fiesta familiar?" }
  ],
  "das Tor": [
    { "de": "Das entscheidende Tor fiel in der letzten Minute.", "es": "El gol decisivo cayó en el último minuto." },
    { "de": "Gestern hat der schnelle Stürmer ein wunderschönes Tor geschossen, deshalb jubelte die ganze Kurve.", "es": "Ayer el rápido delantero marcó un gol maravilloso, por eso toda la grada lo celebró." },
    { "de": "Schoss er das wichtige Tor mit dem linken oder mit dem rechten Fuß?", "es": "¿Marcó el gol importante con el pie izquierdo o con el derecho?" }
  ],
  "Katalog": [
    { "de": "Der neue Katalog zeigt die aktuelle Sommermode.", "es": "El nuevo catálogo muestra la moda actual de verano." },
    { "de": "Gestern habe ich im dicken Katalog geblättert, weil ich ein neues Sofa suche.", "es": "Ayer hojeé el grueso catálogo porque busco un sofá nuevo." },
    { "de": "Bestellst du die teuren Möbel direkt aus dem bunten Katalog?", "es": "¿Pides los muebles caros directamente del colorido catálogo?" }
  ],
  "Mopp": [
    { "de": "Der nasse Mopp steht in der Ecke.", "es": "La fregona mojada está en la esquina." },
    { "de": "Gestern habe ich den schmutzigen Boden mit dem neuen Mopp gewischt, deshalb glänzt er jetzt.", "es": "Ayer fregué el suelo sucio con la fregona nueva, por eso ahora brilla." },
    { "de": "Holst du bitte den trockenen Mopp aus dem Abstellraum?", "es": "¿Vas a buscar la fregona seca al cuarto trastero, por favor?" }
  ],
  "aufhängen": [
    { "de": "Ich hänge das feuchte Handtuch im Bad auf.", "es": "Cuelgo la toalla húmeda en el baño." },
    { "de": "Gestern habe ich die neuen Vorhänge aufgehängt, deshalb ist das Wohnzimmer jetzt dunkler.", "es": "Ayer colgué las cortinas nuevas, por eso el salón ahora está más oscuro." },
    { "de": "Kannst du bitte das schwere Bild über dem Sofa aufhängen?", "es": "¿Puedes colgar el cuadro pesado sobre el sofá, por favor?" }
  ],
  "gefallen": [
    { "de": "Das rote Kleid gefällt mir am besten.", "es": "El vestido rojo me gusta más." },
    { "de": "Gestern hat mir der lustige Film überhaupt nicht gefallen, obwohl meine Freunde ihn lieben.", "es": "Ayer no me gustó nada la película divertida, aunque a mis amigos les encanta." },
    { "de": "Wie gefällt dir die neue, helle Wohnung?", "es": "¿Cómo te gusta el nuevo y luminoso piso?" }
  ],
  "Arbeitnehmer": [
    { "de": "Der zufriedene Arbeitnehmer arbeitet schon zwanzig Jahre hier.", "es": "El empleado satisfecho trabaja ya veinte años aquí." },
    { "de": "Gestern hat ein junger Arbeitnehmer gekündigt, weil er ein besseres Angebot bekam.", "es": "Ayer un joven empleado dimitió porque recibió una oferta mejor." },
    { "de": "Bist du ein angestellter Arbeitnehmer oder selbstständig?", "es": "¿Eres un empleado asalariado o autónomo?" }
  ],
  "Bekleidung": [
    { "de": "Die warme Bekleidung ist im Winter unverzichtbar.", "es": "La vestimenta caliente es imprescindible en invierno." },
    { "de": "Gestern habe ich meine alte Bekleidung gespendet, weil ich neuen Platz brauchte.", "es": "Ayer doné mi vieja vestimenta porque necesitaba espacio nuevo." },
    { "de": "Kaufst du die sportliche Bekleidung lieber online oder im Laden?", "es": "¿Compras la vestimenta deportiva preferiblemente en línea o en la tienda?" }
  ],
  "leihen": [
    { "de": "Ich leihe dir mein neues Fahrrad.", "es": "Te presto mi bicicleta nueva." },
    { "de": "Gestern hat mir mein Nachbar den großen Schraubenschlüssel geliehen, deshalb konnte ich den Wasserhahn reparieren.", "es": "Ayer mi vecino me prestó la llave inglesa grande, por eso pude reparar el grifo." },
    { "de": "Leihst du mir den dicken Roman für den Urlaub?", "es": "¿Me prestas la novela gruesa para las vacaciones?" }
  ],
  "ausleihen": [
    { "de": "Ich leihe mir das blaue Kleid von meiner Schwester aus.", "es": "Le pido prestado el vestido azul a mi hermana." },
    { "de": "Gestern habe ich mir den teuren Bohrer ausgeliehen, weil ich selbst keinen habe.", "es": "Ayer me pedí prestado el taladro caro porque yo no tengo uno." },
    { "de": "Kann ich mir dein altes Zelt für das Festival ausleihen?", "es": "¿Puedo pedirte prestada tu vieja tienda de campaña para el festival?" }
  ],
  "Teilnehmer": [
    { "de": "Alle angemeldeten Teilnehmer bekamen eine Urkunde.", "es": "Todos los participantes inscritos recibieron un diploma." },
    { "de": "Gestern war ein neuer Teilnehmer im Kurs, deshalb mussten wir uns alle vorstellen.", "es": "Ayer hubo un nuevo participante en el curso, por eso todos tuvimos que presentarnos." },
    { "de": "Kennst du den jüngsten Teilnehmer des Wettkampfs?", "es": "¿Conoces al participante más joven de la competición?" }
  ],
  "der Polizist": [
    { "de": "Der freundliche Polizist half der alten Dame über die laute Kreuzung.", "es": "El policía amable ayudó a la anciana señora a cruzar el ruidoso cruce." },
    { "de": "Gestern hat der junge Polizist meinen gestohlenen Geldbeutel gefunden, deshalb bin ich ihm sehr dankbar.", "es": "Ayer el joven policía encontró mi cartera robada, por eso le estoy muy agradecido." },
    { "de": "Riefst du den nächsten Polizisten, als der schlimme Unfall geschah?", "es": "¿Llamaste al policía más cercano cuando ocurrió el grave accidente?" }
  ],
  "Mäßigung": [
    { "de": "Gesunde Mäßigung beim Essen fällt mir schwer.", "es": "La moderación saludable en la comida me resulta difícil." },
    { "de": "Gestern übte er lobenswerte Mäßigung, obwohl die Torte so lecker aussah.", "es": "Ayer practicó una moderación loable, aunque la tarta parecía tan deliciosa." },
    { "de": "Findest du die goldene Mäßigung im Leben wichtig?", "es": "¿Consideras importante la áurea moderación en la vida?" }
  ],
  "die Weltmeisterschaft": [
    { "de": "Die nächste Weltmeisterschaft findet in Südamerika statt.", "es": "El próximo mundial tiene lugar en Sudamérica." },
    { "de": "Gestern haben wir das Finale der spannenden Weltmeisterschaft geschaut, deshalb gingen wir spät ins Bett.", "es": "Ayer vimos la final del emocionante mundial, por eso nos acostamos tarde." },
    { "de": "Verfolgst du die aktuelle Weltmeisterschaft im Radio?", "es": "¿Sigues el mundial actual por la radio?" }
  ],
  "weggehen": [
    { "de": "Ich gehe heute Abend mit meinen netten Kollegen weg.", "es": "Esta noche salgo con mis simpáticos colegas." },
    { "de": "Gestern ist er wütend weggegangen, weil ihn jemand beleidigt hatte.", "es": "Ayer se fue enfadado porque alguien lo había insultado." },
    { "de": "Willst du nach dem stressigen Tag noch weggehen?", "es": "¿Quieres salir todavía después del día estresante?" }
  ],
  "recordar": [
    { "de": "Ich erinnere mich an den lustigen Abend.", "es": "Recuerdo la velada divertida." },
    { "de": "Gestern hat mich das alte Lied an meine glückliche Kindheit erinnert, deshalb wurde ich sentimental.", "es": "Ayer la vieja canción me recordó mi feliz infancia, por eso me puse sentimental." },
    { "de": "Erinnerst du dich noch an den ersten gemeinsamen Urlaub?", "es": "¿Todavía recuerdas las primeras vacaciones juntos?" }
  ],
  "die Krankenschwester": [
    { "de": "Die geduldige Krankenschwester misst das hohe Fieber.", "es": "La enfermera paciente mide la fiebre alta." },
    { "de": "Gestern hat die junge Krankenschwester dem kranken Kind geholfen, deshalb war die Mutter dankbar.", "es": "Ayer la joven enfermera ayudó al niño enfermo, por eso la madre estaba agradecida." },
    { "de": "Hast du die verantwortliche Krankenschwester nach den Besuchszeiten gefragt?", "es": "¿Has preguntado a la enfermera responsable por los horarios de visita?" }
  ],
  "aufmerksam": [
    { "de": "Der aufmerksame Schüler stellt viele kluge Fragen.", "es": "El alumno atento hace muchas preguntas inteligentes." },
    { "de": "Gestern war ich im Straßenverkehr besonders aufmerksam, weil es stark regnete.", "es": "Ayer estuve especialmente atento en el tráfico porque llovía fuerte." },
    { "de": "Bist du bei langweiligen Vorträgen immer aufmerksam?", "es": "¿Estás siempre atento en las conferencias aburridas?" }
  ],
  "Narkose": [
    { "de": "Die leichte Narkose dauerte nur eine Viertelstunde.", "es": "La anestesia ligera duró solo un cuarto de hora." },
    { "de": "Gestern wurde er unter eine tiefe Narkose gesetzt, deshalb erinnert er sich an nichts.", "es": "Ayer lo pusieron bajo una anestesia profunda, por eso no recuerda nada." },
    { "de": "Hast du Angst vor der notwendigen Narkose?", "es": "¿Tienes miedo de la anestesia necesaria?" }
  ],
  "la historia": [
    { "de": "Die alte Geschichte von der Burg ist faszinierend.", "es": "La vieja historia del castillo es fascinante." },
    { "de": "Gestern hat uns Opa eine wahre Geschichte aus dem Krieg erzählt, deshalb waren wir alle still.", "es": "Ayer el abuelo nos contó una historia real de la guerra, por eso todos estábamos callados." },
    { "de": "Liest du deiner Tochter jeden Abend eine kurze Geschichte vor?", "es": "¿Lees a tu hija cada noche una historia corta?" }
  ],
  "das Pflaster": [
    { "de": "Das saubere Pflaster klebt auf der Wunde.", "es": "La tirita limpia está pegada en la herida." },
    { "de": "Gestern habe ich ein buntes Pflaster auf das aufgeschürfte Knie geklebt, deshalb weinte das Kind nicht mehr.", "es": "Ayer pegué una tirita de colores en la rodilla raspada, por eso el niño ya no lloró." },
    { "de": "Hast du ein wasserfestes Pflaster im Badezimmerschrank?", "es": "¿Tienes una tirita impermeable en el armario del baño?" }
  ]
};
// ▲▲▲ FIN DEL BLOQUE ▲▲▲
const combined = { ...existing, ...blockX };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A2.2.json", escaped, "utf8");
console.log("Bloque añadido. Total de palabras:", Object.keys(combined).length);