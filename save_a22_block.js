const fs = require("fs");
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A2.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A2.2.json", "utf8");
  existing = JSON.parse(raw);
}
// ▼▼▼ PEGA AQUÍ EL BLOQUE DE FRASES (blockX) ▼▼▼
const blockX = {
  "Protest": [
    { "de": "Der laute Protest war überall zu hören.", "es": "La ruidosa protesta se oía por todas partes." },
    { "de": "Gestern gab es einen großen Protest, weil die Preise gestiegen sind.", "es": "Ayer hubo una gran protesta porque los precios subieron." },
    { "de": "Hast du den friedlichen Protest im Zentrum gesehen?", "es": "¿Has visto la protesta pacífica en el centro?" }
  ],
  "Internet": [
    { "de": "Das schnelle Internet funktioniert heute nicht.", "es": "El internet rápido no funciona hoy." },
    { "de": "Gestern habe ich im freien Internet nach einem Rezept gesucht, deshalb koche ich jetzt.", "es": "Ayer busqué una receta en internet libre, por eso cocino ahora." },
    { "de": "Brauchst du das stabile Internet für die Videokonferenz?", "es": "¿Necesitas el internet estable para la videoconferencia?" }
  ],
  "Website": [
    { "de": "Die neue Website ist sehr übersichtlich.", "es": "La nueva página web es muy clara." },
    { "de": "Gestern habe ich eine interessante Website entdeckt, obwohl ich zufällig gesurft habe.", "es": "Ayer descubrí una página web interesante, aunque estaba navegando por casualidad." },
    { "de": "Kennst du die offizielle Website des Museums?", "es": "¿Conoces la página web oficial del museo?" }
  ],
  "wissen": [
    { "de": "Ich weiß die richtige Antwort.", "es": "Sé la respuesta correcta." },
    { "de": "Gestern wusste ich nicht, dass du krank warst, deshalb habe ich nicht angerufen.", "es": "Ayer no supe que estabas enfermo, por eso no llamé." },
    { "de": "Weißt du, wann der letzte Bus fährt?", "es": "¿Sabes cuándo sale el último autobús?" }
  ],
  "kennen": [
    { "de": "Ich kenne den netten Nachbarn gut.", "es": "Conozco bien al vecino simpático." },
    { "de": "Gestern habe ich einen lustigen Verkäufer kennengelernt, der viele Witze erzählte.", "es": "Ayer conocí a un vendedor divertido que contaba muchos chistes." },
    { "de": "Kennst du das kleine Restaurant am Fluss?", "es": "¿Conoces el pequeño restaurante junto al río?" }
  ],
  "Unterführung": [
    { "de": "Die dunkle Unterführung ist schlecht beleuchtet.", "es": "El paso subterráneo oscuro está mal iluminado." },
    { "de": "Gestern bin ich durch die enge Unterführung gegangen, obwohl ich Angst hatte.", "es": "Ayer pasé por el estrecho paso subterráneo, aunque tenía miedo." },
    { "de": "Nimmst du die kurze Unterführung oder die lange Brücke?", "es": "¿Coges el corto paso subterráneo o el largo puente?" }
  ],
  "Schlaf": [
    { "de": "Der tiefe Schlaf war erholsam.", "es": "El sueño profundo fue reparador." },
    { "de": "Gestern hatte ich einen schlechten Schlaf, weil es draußen so laut war.", "es": "Ayer tuve un mal sueño porque fuera había mucho ruido." },
    { "de": "Brauchst du einen ruhigen Schlaf für die Arbeit?", "es": "¿Necesitas un sueño tranquilo para el trabajo?" }
  ],
  "der Pilot": [
    { "de": "Der erfahrene Pilot begrüßt die Passagiere.", "es": "El experimentado piloto saluda a los pasajeros." },
    { "de": "Gestern flog der junge Pilot zum ersten Mal allein, deshalb war er aufgeregt.", "es": "Ayer el joven piloto voló solo por primera vez, por eso estaba nervioso." },
    { "de": "Kennst du den freundlichen Piloten aus der Zeitung?", "es": "¿Conoces al amable piloto del periódico?" }
  ],
  "die Ingenieurin": [
    { "de": "Die kluge Ingenieurin plant eine Brücke.", "es": "La inteligente ingeniera planea un puente." },
    { "de": "Gestern hat die neue Ingenieurin das Projekt vorgestellt, deshalb waren alle begeistert.", "es": "Ayer la nueva ingeniera presentó el proyecto, por eso todos estaban entusiasmados." },
    { "de": "Hast du die zuständige Ingenieurin schon getroffen?", "es": "¿Ya has conocido a la ingeniera responsable?" }
  ],
  "die Metzgerei": [
    { "de": "Die kleine Metzgerei hat frische Wurst.", "es": "La pequeña carnicería tiene embutido fresco." },
    { "de": "Gestern habe ich in der alten Metzgerei Fleisch gekauft, weil es dort gute Qualität gibt.", "es": "Ayer compré carne en la vieja carnicería porque allí tienen buena calidad." },
    { "de": "Kennst du die neue Metzgerei im Einkaufszentrum?", "es": "¿Conoces la nueva carnicería en el centro comercial?" }
  ],
  "Kammer": [
    { "de": "Die dunkle Kammer ist voller alter Sachen.", "es": "La cámara oscura está llena de cosas viejas." },
    { "de": "Gestern habe ich die kleine Kammer aufgeräumt, deshalb habe ich jetzt mehr Platz.", "es": "Ayer ordené la pequeña cámara, por eso ahora tengo más espacio." },
    { "de": "Hast du die geheime Kammer im Schloss gesehen?", "es": "¿Has visto la cámara secreta en el castillo?" }
  ],
  "einschalten": [
    { "de": "Ich schalte den Fernseher ein.", "es": "Enciendo la televisión." },
    { "de": "Gestern habe ich die neue Lampe eingeschaltet, weil es schon dunkel war.", "es": "Ayer encendí la lámpara nueva porque ya estaba oscuro." },
    { "de": "Kannst du bitte die Heizung einschalten?", "es": "¿Puedes encender la calefacción, por favor?" }
  ],
  "danken für": [
    { "de": "Ich danke dir für die schöne Karte.", "es": "Te agradezco la bonita postal." },
    { "de": "Gestern habe ich ihm für die große Hilfe gedankt, deshalb hat er gelächelt.", "es": "Ayer le agradecí la gran ayuda, por eso sonrió." },
    { "de": "Wofür willst du deiner Mutter danken?", "es": "¿Por qué quieres dar las gracias a tu madre?" }
  ],
  "der Gewinner": [
    { "de": "Der glückliche Gewinner bekommt einen Preis.", "es": "El afortunado ganador recibe un premio." },
    { "de": "Gestern wurde der neue Gewinner bekannt gegeben, nachdem alle Stimmen gezählt waren.", "es": "Ayer se anunció al nuevo ganador después de contar todos los votos." },
    { "de": "Kennst du den stolzen Gewinner vom Wettbewerb?", "es": "¿Conoces al orgulloso ganador del concurso?" }
  ],
  "Arbeitsrecht": [
    { "de": "Das deutsche Arbeitsrecht ist kompliziert.", "es": "El derecho laboral alemán es complicado." },
    { "de": "Gestern habe ich mich über das neue Arbeitsrecht informiert, weil ich Probleme im Job habe.", "es": "Ayer me informé sobre el nuevo derecho laboral porque tengo problemas en el trabajo." },
    { "de": "Kennst du einen Anwalt für Arbeitsrecht?", "es": "¿Conoces a un abogado de derecho laboral?" }
  ],
  "Briefmarke": [
    { "de": "Die bunte Briefmarke klebt auf dem Umschlag.", "es": "El colorido sello está pegado en el sobre." },
    { "de": "Gestern habe ich eine seltene Briefmarke gekauft, deshalb freue ich mich.", "es": "Ayer compré un sello raro, por eso me alegro." },
    { "de": "Hast du eine alte Briefmarke für meine Sammlung?", "es": "¿Tienes un sello antiguo para mi colección?" }
  ],
  "Umschlag": [
    { "de": "Der weiße Umschlag liegt auf dem Tisch.", "es": "El sobre blanco está sobre la mesa." },
    { "de": "Gestern habe ich den dicken Umschlag geöffnet, weil ein wichtiger Brief drin war.", "es": "Ayer abrí el sobre grueso porque dentro había una carta importante." },
    { "de": "Bringst du den frankierten Umschlag zur Post?", "es": "¿Llevas el sobre franqueado a correos?" }
  ],
  "der Kapitän": [
    { "de": "Der strenge Kapitän gibt Befehle.", "es": "El estricto capitán da órdenes." },
    { "de": "Gestern hat der alte Kapitän eine Geschichte erzählt, deshalb hörten alle zu.", "es": "Ayer el viejo capitán contó una historia, por eso todos escucharon." },
    { "de": "Kennst du den neuen Kapitän vom Kreuzfahrtschiff?", "es": "¿Conoces al nuevo capitán del crucero?" }
  ],
  "Hemd": [
    { "de": "Das weiße Hemd ist leider schmutzig.", "es": "La camisa blanca está sucia por desgracia." },
    { "de": "Gestern habe ich ein kariertes Hemd getragen, obwohl es nicht gebügelt war.", "es": "Ayer llevé una camisa a cuadros, aunque no estaba planchada." },
    { "de": "Leihst du mir das blaue Hemd für das Vorstellungsgespräch?", "es": "¿Me prestas la camisa azul para la entrevista de trabajo?" }
  ],
  "einrichten": [
    { "de": "Ich richte mein Zimmer neu ein.", "es": "Amueblo mi habitación de nuevo." },
    { "de": "Gestern habe ich das leere Wohnzimmer eingerichtet, deshalb sieht es jetzt gemütlich aus.", "es": "Ayer amueblé el salón vacío, por eso ahora parece acogedor." },
    { "de": "Kannst du mir helfen, die neue Küche einzurichten?", "es": "¿Puedes ayudarme a amueblar la cocina nueva?" }
  ],
  "bemerken": [
    { "de": "Ich bemerke den leisen Fehler.", "es": "Noto el leve error." },
    { "de": "Gestern habe ich den kleinen Kratzer am Auto bemerkt, deshalb war ich sauer.", "es": "Ayer noté el pequeño arañazo en el coche, por eso me enfadé." },
    { "de": "Hast du den komischen Geruch im Flur bemerkt?", "es": "¿Has notado el olor raro en el pasillo?" }
  ],
  "bedeuten": [
    { "de": "Das Wort bedeutet „schön“.", "es": "La palabra significa „bonito“." },
    { "de": "Gestern hat sie mir erklärt, was das schwierige Zeichen bedeutet.", "es": "Ayer me explicó qué significa el signo difícil." },
    { "de": "Weißt du, was die rote Ampel bedeutet?", "es": "¿Sabes qué significa el semáforo rojo?" }
  ],
  "der Rücken": [
    { "de": "Mein schmerzender Rücken tut weh.", "es": "Mi dolorida espalda me duele." },
    { "de": "Gestern habe ich den krummen Rücken trainiert, deshalb geht es mir heute besser.", "es": "Ayer entrené la espalda encorvada, por eso hoy me siento mejor." },
    { "de": "Hast du deinen verspannten Rücken massieren lassen?", "es": "¿Te has hecho masajear la espalda contracturada?" }
  ],
  "Fantasie": [
    { "de": "Die kindliche Fantasie ist wunderbar.", "es": "La fantasía infantil es maravillosa." },
    { "de": "Gestern brauchte ich viel Fantasie, um die leere Wand zu dekorieren.", "es": "Ayer necesité mucha fantasía para decorar la pared vacía." },
    { "de": "Regt das bunte Bild deine Fantasie an?", "es": "¿Estimula el colorido cuadro tu fantasía?" }
  ],
  "die Tüte": [
    { "de": "Die braune Tüte ist aus Papier.", "es": "La bolsa marrón es de papel." },
    { "de": "Gestern habe ich eine volle Tüte Bonbons gekauft, obwohl ich Diät mache.", "es": "Ayer compré una bolsa llena de caramelos, aunque estoy a dieta." },
    { "de": "Nimmst du die leere Tüte zum Einkaufen mit?", "es": "¿Llevas la bolsa vacía para hacer la compra?" }
  ],
  "die Universität": [
    { "de": "Die große Universität hat viele Fakultäten.", "es": "La gran universidad tiene muchas facultades." },
    { "de": "Gestern habe ich die berühmte Universität besichtigt, weil ich mich einschreiben möchte.", "es": "Ayer visité la famosa universidad porque quiero matricularme." },
    { "de": "Studierst du an der alten Universität im Zentrum?", "es": "¿Estudias en la vieja universidad del centro?" }
  ],
  "Geltenmachung": [
    { "de": "Die rechtliche Geltenmachung dauerte lange.", "es": "La reivindicación legal duró mucho." },
    { "de": "Gestern wurde die offizielle Geltenmachung eingereicht, weil die Frist ablief.", "es": "Ayer se presentó la reivindicación oficial porque el plazo vencía." },
    { "de": "Wer übernimmt die schwierige Geltenmachung?", "es": "¿Quién se encarga de la difícil reivindicación?" }
  ],
  "Nichtbeachtung": [
    { "de": "Die ständige Nichtbeachtung ärgert ihn.", "es": "La constante desatención lo enfada." },
    { "de": "Gestern führte die bewusste Nichtbeachtung zu einem Streit, weil sich niemand respektiert fühlte.", "es": "Ayer la deliberada desatención provocó una pelea porque nadie se sintió respetado." },
    { "de": "Leidest du unter der elterlichen Nichtbeachtung?", "es": "¿Sufres la desatención de tus padres?" }
  ],
  "Beförderung": [
    { "de": "Die neue Beförderung hat sie verdient.", "es": "El nuevo ascenso lo tiene merecido." },
    { "de": "Gestern habe ich die lang ersehnte Beförderung bekommen, deshalb feiere ich heute.", "es": "Ayer recibí el largamente esperado ascenso, por eso hoy lo celebro." },
    { "de": "Hast du die offizielle Beförderung schon unterschrieben?", "es": "¿Ya has firmado el ascenso oficial?" }
  ],
  "Steuerberater": [
    { "de": "Mein neuer Steuerberater ist sehr gründlich.", "es": "Mi nuevo asesor fiscal es muy minucioso." },
    { "de": "Gestern habe ich einen kompetenten Steuerberater gefunden, deshalb mache ich mir keine Sorgen mehr.", "es": "Ayer encontré un asesor fiscal competente, por eso ya no me preocupo." },
    { "de": "Kennst du einen günstigen Steuerberater in der Nähe?", "es": "¿Conoces a un asesor fiscal barato por aquí cerca?" }
  ],
  "darüber": [
    { "de": "Darüber möchte ich nicht sprechen.", "es": "Sobre eso no quiero hablar." },
    { "de": "Gestern haben wir lange darüber diskutiert, weil es eine wichtige Entscheidung war.", "es": "Ayer discutimos largo rato al respecto porque era una decisión importante." },
    { "de": "Was denkst du darüber?", "es": "¿Qué piensas al respecto?" }
  ],
  "Enthüllung": [
    { "de": "Die überraschende Enthüllung schockierte alle.", "es": "La sorprendente revelación conmocionó a todos." },
    { "de": "Gestern gab es eine große Enthüllung, deshalb stand es in der Zeitung.", "es": "Ayer hubo una gran revelación, por eso salió en el periódico." },
    { "de": "Hast du die geheime Enthüllung geglaubt?", "es": "¿Creíste la secreta revelación?" }
  ],
  "Arbeitsgericht": [
    { "de": "Das zuständige Arbeitsgericht entscheidet bald.", "es": "El tribunal laboral competente decide pronto." },
    { "de": "Gestern war ich beim Arbeitsgericht, weil ich gekündigt wurde.", "es": "Ayer estuve en el tribunal laboral porque me despidieron." },
    { "de": "Kennst du den Termin vor dem Arbeitsgericht?", "es": "¿Sabes la fecha ante el tribunal laboral?" }
  ],
  "hier": [
    { "de": "Hier ist es sehr ruhig.", "es": "Aquí está muy tranquilo." },
    { "de": "Gestern war ich schon einmal hier, deshalb kenne ich den Weg.", "es": "Ayer ya estuve aquí una vez, por eso conozco el camino." },
    { "de": "Bleibst du hier oder gehst du dorthin?", "es": "¿Te quedas aquí o vas allí?" }
  ],
  "Terminplaner": [
    { "de": "Mein digitaler Terminplaner ist voll.", "es": "Mi agenda digital está llena." },
    { "de": "Gestern habe ich den neuen Terminplaner gekauft, weil der alte kaputt war.", "es": "Ayer compré la nueva agenda porque la vieja estaba rota." },
    { "de": "Hast du deinen wichtigen Terminplaner dabei?", "es": "¿Llevas contigo tu importante agenda?" }
  ],
  "Diplom": [
    { "de": "Das rote Diplom hängt an der Wand.", "es": "El diploma rojo cuelga en la pared." },
    { "de": "Gestern habe ich endlich mein Diplom bekommen, nachdem ich alle Prüfungen bestanden hatte.", "es": "Ayer por fin recibí mi diploma después de aprobar todos los exámenes." },
    { "de": "Zeigst du mir dein gerahmtes Diplom?", "es": "¿Me enseñas tu diploma enmarcado?" }
  ],
  "der Augenarzt": [
    { "de": "Der freundliche Augenarzt hat eine neue Brille empfohlen.", "es": "El amable oculista recomendó unas gafas nuevas." },
    { "de": "Gestern war ich bei einem guten Augenarzt, weil ich schlechter sehe.", "es": "Ayer fui a un buen oculista porque veo peor." },
    { "de": "Kennst du den erfahrenen Augenarzt am Marktplatz?", "es": "¿Conoces al experimentado oculista de la plaza del mercado?" }
  ],
  "Die nsthandy": [
    { "de": "Mein altes Diensthandy klingelt ständig.", "es": "Mi viejo móvil de empresa suena constantemente." },
    { "de": "Gestern habe ich das neue Diensthandy eingerichtet, deshalb bin ich jetzt erreichbar.", "es": "Ayer configuré el nuevo móvil de empresa, por eso ahora estoy localizable." },
    { "de": "Hast du dein dienstliches Handy ausgeschaltet?", "es": "¿Has apagado tu móvil de empresa?" }
  ],
  "installieren": [
    { "de": "Ich installiere die neue Software.", "es": "Instalo el nuevo software." },
    { "de": "Gestern habe ich die kostenlose App installiert, weil sie viele Funktionen hat.", "es": "Ayer instalé la aplicación gratuita porque tiene muchas funciones." },
    { "de": "Kannst du den neuen Drucker installieren?", "es": "¿Puedes instalar la nueva impresora?" }
  ],
  "aktualisieren": [
    { "de": "Ich aktualisiere meine Kontaktdaten.", "es": "Actualizo mis datos de contacto." },
    { "de": "Gestern habe ich den alten Computer aktualisiert, deshalb läuft er jetzt schneller.", "es": "Ayer actualicé el ordenador viejo, por eso ahora va más rápido." },
    { "de": "Musst du die gesamte Liste aktualisieren?", "es": "¿Tienes que actualizar la lista entera?" }
  ],
  "Ansteckung": [
    { "de": "Die schnelle Ansteckung ist gefährlich.", "es": "El contagio rápido es peligroso." },
    { "de": "Gestern wurde eine hohe Ansteckung festgestellt, deshalb bleiben wir zu Hause.", "es": "Ayer se detectó un alto contagio, por eso nos quedamos en casa." },
    { "de": "Wie vermeidest du die direkte Ansteckung?", "es": "¿Cómo evitas el contagio directo?" }
  ],
  "Eingabe": [
    { "de": "Die falsche Eingabe führte zum Fehler.", "es": "La entrada errónea provocó el error." },
    { "de": "Gestern habe ich die letzte Eingabe gelöscht, weil sie nicht stimmte.", "es": "Ayer borré la última entrada porque no era correcta." },
    { "de": "Kontrollierst du jede wichtige Eingabe?", "es": "¿Revisas cada entrada importante?" }
  ],
  "der Feuerwehrmann": [
    { "de": "Der tapfere Feuerwehrmann rettet die Katze.", "es": "El valiente bombero salva al gato." },
    { "de": "Gestern hat der junge Feuerwehrmann den Brand gelöscht, deshalb ist niemand verletzt.", "es": "Ayer el joven bombero apagó el incendio, por eso nadie resultó herido." },
    { "de": "Kennst du den mutigen Feuerwehrmann aus der Nachbarschaft?", "es": "¿Conoces al valiente bombero del vecindario?" }
  ],
  "glauben": [
    { "de": "Ich glaube an dich.", "es": "Creo en ti." },
    { "de": "Gestern habe ich ihm die dumme Geschichte geglaubt, obwohl sie erfunden war.", "es": "Ayer le creí la tonta historia, aunque era inventada." },
    { "de": "Glaubst du an das große Glück?", "es": "¿Crees en la gran suerte?" }
  ],
  "anschauen": [
    { "de": "Ich schaue mir den neuen Film an.", "es": "Miro la nueva película." },
    { "de": "Gestern haben wir uns die bunte Ausstellung angeschaut, deshalb sind wir später nach Hause gegangen.", "es": "Ayer miramos la colorida exposición, por eso volvimos más tarde a casa." },
    { "de": "Willst du dir das leere Haus anschauen?", "es": "¿Quieres mirar la casa vacía?" }
  ],
  "sich versammeln": [
    { "de": "Die Leute versammeln sich auf dem Platz.", "es": "La gente se reúne en la plaza." },
    { "de": "Gestern haben sich alle im großen Saal versammelt, weil es eine wichtige Ansprache gab.", "es": "Ayer todos se reunieron en la gran sala porque había un discurso importante." },
    { "de": "Versammelt ihr euch jeden Morgen am Eingang?", "es": "¿Os reunís cada mañana en la entrada?" }
  ],
  "rasieren": [
    { "de": "Ich rasiere mich vor dem Spiegel.", "es": "Me afeito delante del espejo." },
    { "de": "Gestern habe ich mich nass rasiert, obwohl ich normalerweise einen Rasierer benutze.", "es": "Ayer me afeité en húmedo, aunque normalmente uso maquinilla." },
    { "de": "Musst du dich jeden Morgen rasieren?", "es": "¿Tienes que afeitarte cada mañana?" }
  ],
  "Million": [
    { "de": "Eine ganze Million ist viel Geld.", "es": "Un millón entero es mucho dinero." },
    { "de": "Gestern hat er eine hohe Million im Lotto gewonnen, deshalb kündigte er seinen Job.", "es": "Ayer ganó un alto millón en la lotería, por eso renunció a su trabajo." },
    { "de": "Würdest du eine einzige Million mit mir teilen?", "es": "¿Compartirías un solo millón conmigo?" }
  ],
  "Tod": [
    { "de": "Der plötzliche Tod schockierte die Familie.", "es": "La repentina muerte conmocionó a la familia." },
    { "de": "Gestern haben wir vom traurigen Tod erfahren, deshalb trugen wir Schwarz.", "es": "Ayer nos enteramos de la triste muerte, por eso vestimos de negro." },
    { "de": "Hast du Angst vor dem eigenen Tod?", "es": "¿Tienes miedo de la propia muerte?" }
  ],
  "sich zurückziehen": [
    { "de": "Ich ziehe mich in mein Zimmer zurück.", "es": "Me retiro a mi habitación." },
    { "de": "Gestern hat sie sich vom lauten Fest zurückgezogen, weil sie Kopfschmerzen hatte.", "es": "Ayer se retiró de la ruidosa fiesta porque tenía dolor de cabeza." },
    { "de": "Willst du dich für eine ruhige Pause zurückziehen?", "es": "¿Quieres retirarte para una pausa tranquila?" }
  ]
};
// ▲▲▲ FIN DEL BLOQUE ▲▲▲
const combined = { ...existing, ...blockX };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A2.2.json", escaped, "utf8");
console.log("Bloque añadido. Total de palabras:", Object.keys(combined).length);