/**
 * tools/vocab_expansion.js
 * 
 * FASE 0: Expansión masiva de vocabulario para la Ruta de Aprendizaje
 * 
 * Fuentes:
 *   - src/data/articulos.json      → 3.577 sustantivos con nivel
 *   - Palabras sintéticas extra     → verbos, adjetivos, adverbios, frases
 * 
 * Objetivo: Generar addLevel() calls para inyectar en rutaHelpers.jsx,
 * expandiendo de ~1.273 a ~5.000+ palabras.
 * 
 * Uso: node tools/vocab_expansion.js
 *   → Genera tools/vocab_nuevo.jsx con las addLevel() calls
 * 
 *   node tools/vocab_expansion.js --inject
 *   → Inyecta automáticamente en rutaHelpers.jsx justo antes de MULLER_RUTA_LEVELS
 */

const fs = require('fs');
const path = require('path');

const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');
const ARTICULOS_FILE = path.join(__dirname, '..', 'src', 'data', 'articulos.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'tools', 'vocab_nuevo.jsx');

const LEVEL_TO_BADGE = {
  'A1': { odd: 'A1.1', even: 'A1.2' },
  'A2': { odd: 'A2.1', even: 'A2.2' },
  'B1': { odd: 'B1.1', even: 'B1.2' },
  'B2': { odd: 'B2.1', even: 'B2.2' },
  'C1': { odd: 'C1.1', even: 'C1.2' },
  'C2': { odd: 'C2.1', even: 'C2.2' },
};

// ── VOCABULARIO SINTÉTICO: verbos, adjetivos, adverbios, frases ──
const VOCAB_SINTETICO = {
  'A1': [
    // Verbos modales/comunes A1 (30)
    ['gucken','mirar','','','v'],['lachen','reír','','','v'],['weinen','llorar','','','v'],
    ['schreien','gritar','','','v'],['flüstern','susurrar','','','v'],['klatschen','aplaudir','','','v'],
    ['winken','saludar','','','v'],['nicken','asentir','','','v'],['pusten','soplar','','','v'],
    ['atmen','respirar','','','v'],['husten','toser','','','v'],['niesen','estornudar','','','v'],
    ['gähnen','bostezar','','','v'],['lächeln','sonreír','','','v'],['bitten','pedir','','','v'],
    ['dürfen','poder (permiso)','','','v'],['mögen','gustar','','','v'],['müssen','tener que','','','v'],
    ['sollen','deber','','','v'],['wollen','querer','','','v'],['können','poder (habilidad)','','','v'],
    ['werden','volverse','','','v'],['bleiben','quedarse','','','v'],['wohnen','vivir','','','v'],
    ['leben','vivir','','','v'],['arbeiten','trabajar','','','v'],['studieren','estudiar','','','v'],
    ['lernen','aprender','','','v'],['lehren','enseñar','','','v'],['verstehen','entender','','','v'],
    // Verbos acción A1 (40)
    ['kochen','cocinar','','','v'],['putzen','limpiar','','','v'],['tanzen','bailar','','','v'],
    ['malen','pintar','','','v'],['zeigen','mostrar','','','v'],['fragen','preguntar','','','v'],
    ['antworten','responder','','','v'],['öffnen','abrir','','','v'],['schließen','cerrar','','','v'],
    ['holen','traer','','','v'],['bringen','traer','','','v'],['kaufen','comprar','','','v'],
    ['verkaufen','vender','','','v'],['bezahlen','pagar','','','v'],['suchen','buscar','','','v'],
    ['finden','encontrar','','','v'],['brauchen','necesitar','','','v'],['wünschen','desear','','','v'],
    ['danken','agradecer','','','v'],['feiern','celebrar','','','v'],['reisen','viajar','','','v'],
    ['wandern','senderismo','','','v'],['radeln','bicicleta','','','v'],['rudern','remar','','','v'],
    ['segeln','navegar','','','v'],['springen','saltar','','','v'],['klettern','trepar','','','v'],
    ['schwimmen','nadar','','','v'],['fotografieren','fotografiar','','','v'],['telefonieren','telefonear','','','v'],
    ['parken','aparcar','','','v'],['abholen','recoger','','','v'],['einladen','invitar','','','v'],
    ['aussteigen','bajarse','','','v'],['einsteigen','subirse','','','v'],['umsteigen','transbordar','','','v'],
    ['abfahren','salir','','','v'],['ankommen','llegar','','','v'],['weggehen','irse','','','v'],
    ['mitbringen','traer consigo','','','v'],
    // Adjetivos A1 (30)
    ['alt','viejo','','','adj'],['neu','nuevo','','','adj'],['gut','bueno','','','adj'],
    ['schlecht','malo','','','adj'],['schön','bonito','','','adj'],['hässlich','feo','','','adj'],
    ['heiß','caliente','','','adj'],['kalt','frío','','','adj'],['warm','templado','','','adj'],
    ['sauber','limpio','','','adj'],['schmutzig','sucio','','','adj'],['schnell','rápido','','','adj'],
    ['langsam','lento','','','adj'],['laut','ruidoso','','','adj'],['leise','silencioso','','','adj'],
    ['reich','rico','','','adj'],['arm','pobre','','','adj'],['glücklich','feliz','','','adj'],
    ['böse','enfadado','','','adj'],['nett','simpático','','','adj'],['lieb','querido','','','adj'],
    ['lustig','divertido','','','adj'],['traurig','triste','','','adj'],['munter','alegre','','','adj'],
    ['ruhig','tranquilo','','','adj'],['kaputt','roto','','','adj'],['fertig','listo','','','adj'],
    ['offen','abierto','','','adj'],['geschlossen','cerrado','','','adj'],['frei','libre','','','adj'],
    // Adverbios A1 (10)
    ['neben','al lado','','','adv'],['zwischen','entre','','','adv'],['gegenüber','enfrente','','','adv'],
    ['draußen','fuera','','','adv'],['drinnen','dentro','','','adv'],['überall','en todas partes','','','adv'],
    ['nirgends','en ninguna parte','','','adv'],['vielleicht','quizás','','','adv'],
    ['natürlich','naturalmente','','','adv'],['hoffentlich','ojalá','','','adv'],
  ],
  'A2': [
    ['erzählen','contar','','','v'],['erklären','explicar','','','v'],['beschreiben','describir','','','v'],
    ['vergessen','olvidar','','','v'],['erinnern','recordar','','','v'],['glauben','creer','','','v'],
    ['meinen','opinar','','','v'],['denken','pensar','','','v'],['wissen','saber','','','v'],
    ['kennen','conocer','','','v'],['gefallen','gustar','','','v'],['schmecken','saber a','','','v'],
    ['riechen','oler','','','v'],['fühlen','sentir','','','v'],['berühren','tocar','','','v'],
    ['tragen','llevar','','','v'],['anziehen','vestirse','','','v'],['ausziehen','desvestirse','','','v'],
    ['waschen','lavar','','','v'],['rasieren','afeitar','','','v'],['kämmen','peinar','','','v'],
    ['baden','bañar','','','v'],['duschen','duchar','','','v'],['einpacken','empaquetar','','','v'],
    ['auspacken','desempaquetar','','','v'],['aufräumen','ordenar','','','v'],['abwaschen','fregar','','','v'],
    ['staubsaugen','aspirar','','','v'],['bügeln','planchar','','','v'],['nähen','coser','','','v'],
    ['backen','hornear','','','v'],['braten','freír','','','v'],['schneiden','cortar','','','v'],
    ['mischen','mezclar','','','v'],['einziehen','mudarse entrar','','','v'],
    ['ausziehen','mudarse salir','','','v'],['umziehen','mudarse','','','v'],['vermieten','alquilar','','','v'],
    // Adjetivos A2
    ['bequem','cómodo','','','adj'],['unbequem','incómodo','','','adj'],['gemütlich','acogedor','','','adj'],
    ['modern','moderno','','','adj'],['typisch','típico','','','adj'],['frisch','fresco','','','adj'],
    ['lecker','delicioso','','','adj'],['herzlich','cordial','','','adj'],['ehrlich','honesto','','','adj'],
    ['höflich','cortés','','','adj'],['unhöflich','descortés','','','adj'],['pünktlich','puntual','','','adj'],
    ['spannend','emocionante','','','adj'],['langweilig','aburrido','','','adj'],['schwierig','difícil','','','adj'],
    ['einfach','sencillo','','','adj'],['verrückt','loco','','','adj'],['berühmt','famoso','','','adj'],
    ['beliebt','popular','','','adj'],['gefährlich','peligroso','','','adj'],
  ],
  'B1': [
    ['beeinflussen','influir','','','v'],['entscheiden','decidir','','','v'],['beschließen','resolver','','','v'],
    ['vermeiden','evitar','','','v'],['erwarten','esperar','','','v'],['versprechen','prometer','','','v'],
    ['bestehen','consistir','','','v'],['vergleichen','comparar','','','v'],['unterscheiden','distinguir','','','v'],
    ['vorstellen','presentar','','','v'],['darstellen','representar','','','v'],['auffallen','llamaratención','','','v'],
    ['ausdrücken','expresar','','','v'],['nachdenken','reflexionar','','','v'],['überlegen','considerar','','','v'],
    ['diskutieren','discutir','','','v'],['zustimmen','acordar','','','v'],['widersprechen','contradecir','','','v'],
    ['vorschlagen','proponer','','','v'],['akzeptieren','aceptar','','','v'],['ablehnen','rechazar','','','v'],
    ['erlauben','permitir','','','v'],['verbieten','prohibir','','','v'],['zwingen','obligar','','','v'],
    ['verlangen','exigir','','','v'],['erfüllen','cumplir','','','v'],['erreichen','alcanzar','','','v'],
    ['bemerken','notar','','','v'],['bedeuten','significar','','','v'],['enthalten','contener','','','v'],
    ['teilnehmen','participar','','','v'],['stattfinden','tener lugar','','','v'],['verpassen','perder','','','v'],
    ['verschieben','aplazar','','','v'],['absagen','cancelar','','','v'],['betonen','enfatizar','','','v'],
    ['bewerben','solicitar','','','v'],['einstellen','contratar','','','v'],['entlassen','despedir','','','v'],
    ['kündigen','cancelar','','','v'],['befördern','ascender','','','v'],['verhandeln','negociar','','','v'],
    ['investieren','invertir','','','v'],['finanzieren','financiar','','','v'],['reparieren','reparar','','','v'],
    ['installieren','instalar','','','v'],['benutzen','usar','','','v'],['behandeln','tratar','','','v'],
    // Adjetivos B1
    ['begeistert','entusiasmado','','','adj'],['enttäuscht','decepcionado','','','adj'],
    ['überrascht','sorprendido','','','adj'],['erschrocken','asustado','','','adj'],
    ['besorgt','preocupado','','','adj'],['neugierig','curioso','','','adj'],
    ['eifersüchtig','celoso','','','adj'],['zärtlich','cariñoso','','','adj'],
    ['großzügig','generoso','','','adj'],['egoistisch','egoísta','','','adj'],
    ['selbstbewusst','seguro','','','adj'],['schüchtern','tímido','','','adj'],
    ['ehrgeizig','ambicioso','','','adj'],['faul','perezoso','','','adj'],['fleißig','trabajador','','','adj'],
    ['zuverlässig','fiable','','','adj'],['verantwortlich','responsable','','','adj'],
    ['unabhängig','independiente','','','adj'],['abhängig','dependiente','','','adj'],
    ['erwachsen','adulto','','','adj'],['erfolgreich','exitoso','','','adj'],['erfahren','experimentado','','','adj'],
    ['kreativ','creativo','','','adj'],['logisch','lógico','','','adj'],['praktisch','práctico','','','adj'],
    ['positiv','positivo','','','adj'],['negativ','negativo','','','adj'],['möglich','posible','','','adj'],
    ['notwendig','necesario','','','adj'],
    // Frases B1
    ['Es tut mir leid','Lo siento','','','phrase'],['Keine Ursache','De nada','','','phrase'],
    ['Mach dir keine Sorgen','No te preocupes','','','phrase'],['Ich habe keine Zeit','No tengo tiempo','','','phrase'],
    ['Das macht nichts','No importa','','','phrase'],['Auf jeden Fall','En cualquier caso','','','phrase'],
    ['Es kommt darauf an','Depende','','','phrase'],['Meiner Meinung nach','En mi opinión','','','phrase'],
    ['Ich bin der Meinung','Soy de la opinión','','','phrase'],['Was hältst du von?','¿Qué opinas?','','','phrase'],
    ['Da hast du recht','Tienes razón','','','phrase'],['Das stimmt nicht','Eso no es cierto','','','phrase'],
    ['Wahrscheinlich','Probablemente','','','adv'],['Eigentlich','En realidad','','','adv'],
    ['Übrigens','Por cierto','','','adv'],['Trotzdem','A pesar de todo','','','adv'],
    ['Deshalb','Por eso','','','adv'],
  ],
  'B2': [
    ['vorbereiten','preparar','','','v'],['entsprechen','corresponder','','','v'],['angehen','abordar','','','v'],
    ['betreffen','afectar','','','v'],['ausmachen','acordar','','','v'],['einschränken','limitar','','','v'],
    ['erweitern','ampliar','','','v'],['verbessern','mejorar','','','v'],['verschlechtern','empeorar','','','v'],
    ['verringern','reducir','','','v'],['erhöhen','aumentar','','','v'],['senken','bajar','','','v'],
    ['steigern','incrementar','','','v'],['gewährleisten','garantizar','','','v'],['sicherstellen','asegurar','','','v'],
    ['überwachen','supervisar','','','v'],['kontrollieren','controlar','','','v'],['analysieren','analizar','','','v'],
    ['bewerten','evaluar','','','v'],['beurteilen','juzgar','','','v'],['einschätzen','estimar','','','v'],
    ['zusammenfassen','resumir','','','v'],['darlegen','exponer','','','v'],['auswerten','evaluar','','','v'],
    ['überzeugen','convencer','','','v'],['überreden','persuadir','','','v'],['annehmen','aceptar','','','v'],
    ['ausschließen','excluir','','','v'],['einbeziehen','incluir','','','v'],['berücksichtigen','considerar','','','v'],
    ['vernachlässigen','descuidar','','','v'],['fördern','fomentar','','','v'],['unterstützen','apoyar','','','v'],
    ['bekämpfen','combatir','','','v'],['verhindern','prevenir','','','v'],['ermöglichen','posibilitar','','','v'],
    ['erschweren','dificultar','','','v'],['erleichtern','facilitar','','','v'],['verzögern','retrasar','','','v'],
    // Adjetivos B2
    ['anspruchsvoll','exigente','','','adj'],['bescheiden','humilde','','','adj'],
    ['hartnäckig','persistente','','','adj'],['geduldig','paciente','','','adj'],
    ['ungeduldig','impaciente','','','adj'],['nachdenklich','pensativo','','','adj'],
    ['verständnisvoll','comprensivo','','','adj'],['rücksichtsvoll','considerado','','','adj'],
    ['rücksichtslos','desconsiderado','','','adj'],['entschlossen','decidido','','','adj'],
    ['überzeugt','convencido','','','adj'],['fassungslos','atónito','','','adj'],
    ['ratlos','perplejo','','','adj'],['hilflos','impotente','','','adj'],
    ['ausdauernd','perseverante','','','adj'],['originell','original','','','adj'],
    ['auffällig','llamativo','','','adj'],['bedeutend','significativo','','','adj'],
    ['wahrscheinlich','probable','','','adj'],['zweifelhaft','dudoso','','','adj'],['fraglich','cuestionable','','','adj'],
    ['selbstverständlich','obvio','','','adj'],['ungefähr','aprox.','','','adv'],
    ['höchstens','como máximo','','','adv'],['mindestens','como mínimo','','','adv'],
    ['keinesfalls','de ningún modo','','','adv'],['jedenfalls','en todo caso','','','adv'],
    ['allerdings','sin embargo','','','adv'],['außerdem','además','','','adv'],['dagegen','en cambio','','','adv'],
  ],
  'C1': [
    ['voraussetzen','presuponer','','','v'],['vorwerfen','reprochar','','','v'],['ausüben','ejercer','','','v'],
    ['nachweisen','demostrar','','','v'],['entziehen','retirar','','','v'],['beanstanden','reclamar','','','v'],
    ['begutachten','peritar','','','v'],['veranlassen','provocar','','','v'],['verfügen','disponer','','','v'],
    ['entgegenwirken','contrarrestar','','','v'],['gleichsetzen','equiparar','','','v'],
    ['hervorheben','destacar','','','v'],['hinterfragen','cuestionar','','','v'],
    ['rechtfertigen','justificar','','','v'],['widerlegen','refutar','','','v'],
    ['bestätigen','confirmar','','','v'],['dementieren','desmentir','','','v'],
    ['manifestieren','manifestar','','','v'],['publizieren','publicar','','','v'],
    ['rezensieren','reseñar','','','v'],['subventionieren','subvencionar','','','v'],
    ['interpretieren','interpretar','','','v'],['definieren','definir','','','v'],
    ['differenzieren','diferenciar','','','v'],['spezialisieren','especializar','','','v'],
    ['engagieren','comprometerse','','','v'],['demonstrieren','demostrar','','','v'],
    ['partizipieren','participar','','','v'],['koordinieren','coordinar','','','v'],
    // Nominalizaciones C1
    ['die Globalisierung','globalización','','','n'],['die Digitalisierung','digitalización','','','n'],
    ['die Nachhaltigkeit','sostenibilidad','','','n'],['die Gleichberechtigung','igualdad derechos','','','n'],
    ['die Meinungsfreiheit','libertad expresión','','','n'],['die Arbeitslosigkeit','desempleo','','','n'],
    ['die Umweltverschmutzung','contaminación','','','n'],['die Integration','integración','','','n'],
    ['die Kooperation','cooperación','','','n'],['die Kommunikation','comunicación','','','n'],
    ['die Verantwortung','responsabilidad','','','n'],['die Vorstellung','imaginación','','','n'],
    ['die Erwartung','expectativa','','','n'],['die Erfahrung','experiencia','','','n'],
    ['die Entwicklung','desarrollo','','','n'],['die Beziehung','relación','','','n'],
    ['die Gesellschaft','sociedad','','','n'],['die Wirtschaft','economía','','','n'],
    // Adverbios C1
    ['unvermeidlich','inevitable','','','adj'],['voraussichtlich','previsiblemente','','','adv'],
    ['gegebenenfalls','en su caso','','','adv'],['notfalls','en caso necesario','','','adv'],
    ['keineswegs','de ninguna manera','','','adv'],['demgegenüber','en contraste','','','adv'],
    ['folglich','por consiguiente','','','adv'],['insofern','en la medida que','','','adv'],
    ['zugegebenermaßen','hay que admitir','','','adv'],
    // Wave 3 - A1 (51 sustantivos)
    ['der Computer','computadora','der','Computer','n'],
    ['die Maus','ratón','die','Mäuse','n'],
    ['die Tastatur','teclado','die','Tastaturen','n'],
    ['der Drucker','impresora','der','Drucker','n'],
    ['der Scanner','escáner','der','Scanner','n'],
    ['das Handy','móvil','das','Handys','n'],
    ['der Bleistift','lápiz','der','Bleistifte','n'],
    ['der Kugelschreiber','bolígrafo','der','Kugelschreiber','n'],
    ['der Radiergummi','goma','der','Radiergummis','n'],
    ['das Lineal','regla','das','Lineale','n'],
    ['der Spitzer','sacapuntas','der','Spitzer','n'],
    ['die Schere','tijera','die','Scheren','n'],
    ['der Rucksack','mochila','der','Rucksäcke','n'],
    ['der Regenschirm','paraguas','der','Regenschirme','n'],
    ['die Brille','gafas','die','Brillen','n'],
    ['der Kamm','peine','der','Kämme','n'],
    ['die Bürste','cepillo','die','Bürsten','n'],
    ['das Handtuch','toalla','das','Handtücher','n'],
    ['die Seife','jabón','die','Seifen','n'],
    ['die Zahnbürste','cepillo','die','Zahnbürsten','n'],
    ['die Zahnpasta','pasta dientes','die','Zahnpasten','n'],
    ['der Spiegel','espejo','der','Spiegel','n'],
    ['der Wecker','despertador','der','Wecker','n'],
    ['die Lampe','lámpara','die','Lampen','n'],
    ['der Tisch','mesa','der','Tische','n'],
    ['der Stuhl','silla','der','Stühle','n'],
    ['das Bett','cama','das','Betten','n'],
    ['der Schrank','armario','der','Schränke','n'],
    ['das Regal','estante','das','Regale','n'],
    ['der Teppich','alfombra','der','Teppiche','n'],
    ['die Gardine','cortina','die','Gardinen','n'],
    ['das Kissen','cojín','das','Kissen','n'],
    ['die Decke','manta','die','Decken','n'],
    ['die Uhr','reloj','die','Uhren','n'],
    ['die Kerze','vela','die','Kerzen','n'],
    ['die Straße','calle','die','Straßen','n'],
    ['der Weg','camino','der','Wege','n'],
    ['die Brücke','puente','die','Brücken','n'],
    ['der Platz','plaza','der','Plätze','n'],
    ['der Park','parque','der','Parks','n'],
    ['der Garten','jardín','der','Gärten','n'],
    ['der Baum','árbol','der','Bäume','n'],
    ['die Blume','flor','die','Blumen','n'],
    ['die Bank','banco','die','Bänke','n'],
    ['die Ampel','semáforo','die','Ampeln','n'],
    ['der Bahnhof','estación','der','Bahnhöfe','n'],
    ['der Bus','autobús','der','Busse','n'],
    ['das Taxi','taxi','das','Taxis','n'],
    ['das Flugzeug','avión','das','Flugzeuge','n'],
    ['der Zug','tren','der','Züge','n'],
    ['das Fahrrad','bici','das','Fahrräder','n'],
    // Wave 3 - A2 (40 sustantivos)
    ['der Arzt','médico','der','Ärzte','n'],
    ['die Ärztin','médica','die','Ärztinnen','n'],
    ['das Krankenhaus','hospital','das','Krankenhäuser','n'],
    ['die Apotheke','farmacia','die','Apotheken','n'],
    ['die Tablette','pastilla','die','Tabletten','n'],
    ['der Termin','cita','der','Termine','n'],
    ['der Patient','paciente','der','Patienten','n'],
    ['die Praxis','consultorio','die','Praxen','n'],
    ['das Rezept','receta','das','Rezepte','n'],
    ['die Versicherung','seguro','die','Versicherungen','n'],
    ['die Untersuchung','examen','die','Untersuchungen','n'],
    ['die Operation','operación','die','Operationen','n'],
    ['der Unfall','accidente','der','Unfälle','n'],
    ['die Verletzung','lesión','die','Verletzungen','n'],
    ['die Grippe','gripe','die','Grippen','n'],
    ['die Erkältung','resfriado','die','Erkältungen','n'],
    ['der Schmerz','dolor','der','Schmerzen','n'],
    ['das Reisebüro','agencia','das','Reisebüros','n'],
    ['der Flug','vuelo','der','Flüge','n'],
    ['die Buchung','reserva','die','Buchungen','n'],
    ['der Flughafen','aeropuerto','der','Flughäfen','n'],
    ['die Abfahrt','salida','die','Abfahrten','n'],
    ['die Ankunft','llegada','die','Ankünfte','n'],
    ['der Schalter','ventanilla','der','Schalter','n'],
    ['das Gleis','andén','das','Gleise','n'],
    ['die Fahrkarte','billete','die','Fahrkarten','n'],
    ['der Ausweis','documento','der','Ausweise','n'],
    ['der Reisepass','pasaporte','der','Reisepässe','n'],
    ['der Koffer','maleta','der','Koffer','n'],
    ['das Hotel','hotel','das','Hotels','n'],
    ['das Zimmer','habitación','das','Zimmer','n'],
    ['das Frühstück','desayuno','das','Frühstücke','n'],
    ['die Speisekarte','menú','die','Speisekarten','n'],
    ['die Rechnung','cuenta','die','Rechnungen','n'],
    ['das Trinkgeld','propina','das','Trinkgelder','n'],
    ['der Kellner','camarero','der','Kellner','n'],
    ['die Küche','cocina','die','Küchen','n'],
    ['der Koch','cocinero','der','Köche','n'],
    ['das Restaurant','restaurante','das','Restaurants','n'],
    ['das Café','cafetería','das','Cafés','n'],
    // Wave 3 - B1 (40 sustantivos)
    ['die Bewerbung','solicitud','die','Bewerbungen','n'],
    ['der Lebenslauf','curriculum','der','Lebensläufe','n'],
    ['die Stelle','puesto','die','Stellen','n'],
    ['der Beruf','profesión','der','Berufe','n'],
    ['die Karriere','carrera','die','Karrieren','n'],
    ['die Firma','empresa','die','Firmen','n'],
    ['der Chef','jefe','der','Chefs','n'],
    ['der Kollege','colega','der','Kollegen','n'],
    ['die Kollegin','colega','die','Kolleginnen','n'],
    ['der Mitarbeiter','empleado','der','Mitarbeiter','n'],
    ['das Unternehmen','empresa','das','Unternehmen','n'],
    ['die Abteilung','departamento','die','Abteilungen','n'],
    ['das Büro','oficina','das','Büros','n'],
    ['das Meeting','reunión','das','Meetings','n'],
    ['die Besprechung','reunión','die','Besprechungen','n'],
    ['die Konferenz','conferencia','die','Konferenzen','n'],
    ['das Projekt','proyecto','das','Projekte','n'],
    ['die Aufgabe','tarea','die','Aufgaben','n'],
    ['die Frist','plazo','die','Fristen','n'],
    ['der Urlaub','vacaciones','der','Urlaube','n'],
    ['der Feiertag','festivo','der','Feiertage','n'],
    ['die Pause','pausa','die','Pausen','n'],
    ['der Vertrag','contrato','der','Verträge','n'],
    ['die Kündigung','despido','die','Kündigungen','n'],
    ['die Ausbildung','formación','die','Ausbildungen','n'],
    ['das Studium','carrera','das','Studien','n'],
    ['der Student','estudiante','der','Studenten','n'],
    ['der Professor','profesor','der','Professoren','n'],
    ['der Unterricht','clase','der','','n'],
    ['die Prüfung','examen','die','Prüfungen','n'],
    ['die Note','nota','die','Noten','n'],
    ['das Zeugnis','certificado','das','Zeugnisse','n'],
    ['der Abschluss','título','der','Abschlüsse','n'],
    ['das Semester','semestre','das','Semester','n'],
    ['der Kurs','curso','der','Kurse','n'],
    ['der Sprachkurs','curso idiomas','der','Sprachkurse','n'],
    ['das Zertifikat','certificado','das','Zertifikate','n'],
    ['die Kenntnisse','conocimientos','die','','n'],
    ['die Fähigkeiten','habilidades','die','','n'],
    ['die Fortbildung','formación cont.','die','Fortbildungen','n'],
    // Wave 3 - B2 (34 sustantivos)
    ['die Politik','política','die','Politiken','n'],
    ['die Partei','partido','die','Parteien','n'],
    ['die Regierung','gobierno','die','Regierungen','n'],
    ['der Staat','estado','der','Staaten','n'],
    ['das Gesetz','ley','das','Gesetze','n'],
    ['das Recht','derecho','das','Rechte','n'],
    ['die Freiheit','libertad','die','Freiheiten','n'],
    ['die Gerechtigkeit','justicia','die','','n'],
    ['die Steuer','impuesto','die','Steuern','n'],
    ['die Wirtschaft','economía','die','Wirtschaften','n'],
    ['die Börse','bolsa','die','Börsen','n'],
    ['die Aktie','acción','die','Aktien','n'],
    ['die Kreditkarte','tarjeta','die','Kreditkarten','n'],
    ['der Kredit','crédito','der','Kredite','n'],
    ['die Miete','alquiler','die','Mieten','n'],
    ['die Umwelt','medio amb.','die','Umwelten','n'],
    ['der Umweltschutz','protección','der','','n'],
    ['die Energie','energía','die','Energien','n'],
    ['der Klimawandel','cambio clim.','der','','n'],
    ['der Laptop','portátil','der','Laptops','n'],
    ['der Bildschirm','pantalla','der','Bildschirme','n'],
    ['das WLAN','wifi','das','','n'],
    ['das Passwort','contraseña','das','Passwörter','n'],
    ['die Software','software','die','Softwares','n'],
    ['die App','app','die','Apps','n'],
    ['der Server','servidor','der','Server','n'],
    ['die Sicherheit','seguridad','die','','n'],
    ['der Datenschutz','protec. datos','der','','n'],
    ['die Nachhaltigkeit','sostenibilidad','die','','n'],
    ['die Erneuerbare','renovable','die','','n'],
    ['die Solaranlage','placa solar','die','Solaranlagen','n'],
    ['die Windkraft','eólica','die','Windkräfte','n'],
    ['die Globalisierung','globalización','die','','n'],
    ['die Digitalisierung','digitalización','die','','n'],
    // Wave 3 - C1 (43 sustantivos)
    ['die Philosophie','filosofía','die','Philosophien','n'],
    ['die Wissenschaft','ciencia','die','Wissenschaften','n'],
    ['die Physik','física','die','','n'],
    ['die Chemie','química','die','','n'],
    ['die Biologie','biología','die','','n'],
    ['die Psychologie','psicología','die','','n'],
    ['die Soziologie','sociología','die','','n'],
    ['die Literatur','literatura','die','Literaturen','n'],
    ['die Kunst','arte','die','Künste','n'],
    ['die Musik','música','die','Musiken','n'],
    ['die Architektur','arquitectura','die','','n'],
    ['die Kultur','cultura','die','Kulturen','n'],
    ['die Religion','religión','die','Religionen','n'],
    ['die Ethik','ética','die','','n'],
    ['das Bewusstsein','conciencia','das','','n'],
    ['die Wahrnehmung','percepción','die','Wahrnehmungen','n'],
    ['die Erkenntnis','conocimiento','die','Erkenntnisse','n'],
    ['die Erfahrung','experiencia','die','Erfahrungen','n'],
    ['das Phänomen','fenómeno','das','Phänomene','n'],
    ['die Hypothese','hipótesis','die','Hypothesen','n'],
    ['die Theorie','teoría','die','Theorien','n'],
    ['die Methode','método','die','Methoden','n'],
    ['die Analyse','análisis','die','Analysen','n'],
    ['die Kritik','crítica','die','Kritiken','n'],
    ['die Interpretation','interpretación','die','Interpretationen','n'],
    ['die Perspektive','perspectiva','die','Perspektiven','n'],
    ['die Reflexion','reflexión','die','Reflexionen','n'],
    ['die Konzentration','concentración','die','Konzentrationen','n'],
    ['die Kreativität','creatividad','die','','n'],
    ['die Innovation','innovación','die','Innovationen','n'],
    ['die Transformation','transformación','die','Transformationen','n'],
    ['die Evolution','evolución','die','Evolutionen','n'],
    ['die Revolution','revolución','die','Revolutionen','n'],
    ['die Entwicklung','desarrollo','die','Entwicklungen','n'],
    ['der Fortschritt','progreso','der','Fortschritte','n'],
    ['die Verbesserung','mejora','die','Verbesserungen','n'],
    ['die Effizienz','eficiencia','die','','n'],
    ['die Produktivität','productividad','die','','n'],
    ['die Wettbewerbsfähigkeit','competitividad','die','','n'],
    ['die künstliche Intelligenz','IA','die','','n'],
    ['der Algorithmus','algoritmo','der','Algorithmen','n'],
    ['die Blockchain','cadena bloques','die','Blockchains','n'],
    ['die Kryptowährung','criptomoneda','die','Kryptowährungen','n'],

  ],
};

// ── 1. LEER VOCABULARIO EXISTENTE ──
function leerVocabularioExistente() {
  console.log('📖 Leyendo vocabulario existente en addLevel()...');
  const content = fs.readFileSync(RUTA_FILE, 'utf8');
  const lines = content.split('\n');
  const existente = new Set();
  let inAddLevel = false;
  for (const line of lines) {
    const startMatch = line.match(/addLevel\(['"]([^'"]+)['"]/);
    if (startMatch) { inAddLevel = true; continue; }
    if (inAddLevel) {
      if (line.includes(']);') || line.includes('];')) { inAddLevel = false; continue; }
      const entryRegex = /\[['"]([^'"]*)['"]/g;
      let match;
      while ((match = entryRegex.exec(line)) !== null) {
        if (!line.includes('addLevel')) existente.add(match[1].toLowerCase());
      }
    }
  }
  console.log(`  → ${existente.size} palabras únicas existentes`);
  return existente;
}

// ── 2. EXTRAER SUSTANTIVOS DE ARTICULOS.JSON ──
function extraerSustantivos(existente) {
  console.log('\n📖 Leyendo articulos.json...');
  const raw = fs.readFileSync(ARTICULOS_FILE, 'utf8');
  const entries = JSON.parse(raw);
  console.log(`  → ${entries.length} entradas totales`);
  const porNivel = {};
  let duplicados = 0, sinArticulo = 0;
  for (const entry of entries) {
    if (!entry.de || !entry.level) continue;
    const match = entry.de.match(/^(der|die|das)\s+(.+)$/i);
    if (!match) { sinArticulo++; continue; }
    const articulo = match[1].toLowerCase();
    const palabra = match[2].trim();
    if (existente.has(palabra.toLowerCase())) { duplicados++; continue; }
    const nivel = entry.level.toUpperCase();
    if (!porNivel[nivel]) porNivel[nivel] = [];
    let plural = '';
    if (palabra.endsWith('e')) plural = palabra + 'n';
    else if (palabra.endsWith('er')||palabra.endsWith('el')||palabra.endsWith('en')) plural = palabra;
    else if (palabra.endsWith('in')) plural = palabra + 'nen';
    else if (articulo === 'die') plural = palabra + 'n';
    else plural = palabra + 'en';
    porNivel[nivel].push([palabra, entry.es, articulo, plural, 'n']);
  }
  console.log(`  → ${sinArticulo} sin artículo, ${duplicados} duplicadas`);
  const total = Object.values(porNivel).reduce((a,b)=>a+b.length,0);
  console.log(`  → ${total} nuevas palabras extraídas`);
  return porNivel;
}

// ── 3. FILTRAR VOCABULARIO SINTÉTICO ──
function filtrarSintetico(existente) {
  console.log('\n🧠 Generando vocabulario sintético...');
  const porNivel = {};
  let total = 0, duplicados = 0;
  for (const [nivel, palabras] of Object.entries(VOCAB_SINTETICO)) {
    porNivel[nivel] = [];
    for (const p of palabras) {
      if (existente.has(p[0].toLowerCase())) { duplicados++; continue; }
      porNivel[nivel].push(p); total++;
    }
  }
  console.log(`  → ${duplicados} duplicados, ${total} nuevas sintéticas`);
  return porNivel;
}

// ── 4. ASIGNAR A BADGES ──
function asignarABadges(sustantivos, sintetico) {
  console.log('\n📊 Asignando palabras a badges...');
  const badgeMap = {}; let totalAsignadas = 0;
  const todos = {};
  for (const nivel of Object.keys(sustantivos)) todos[nivel] = [...(sustantivos[nivel]||[])];
  for (const nivel of Object.keys(sintetico)) {
    if (!todos[nivel]) todos[nivel] = []; todos[nivel].push(...(sintetico[nivel]||[]));
  }
  for (const [nivel, palabras] of Object.entries(todos)) {
    const badgeConfig = LEVEL_TO_BADGE[nivel];
    if (!badgeConfig) { continue; }
    const mitad = Math.ceil(palabras.length/2);
    const badge1 = badgeConfig.odd, badge2 = badgeConfig.even;
    if (!badgeMap[badge1]) badgeMap[badge1] = [];
    if (!badgeMap[badge2]) badgeMap[badge2] = [];
    palabras.forEach((p,i) => { (i<mitad?badgeMap[badge1]:badgeMap[badge2]).push(p); totalAsignadas++; });
    console.log(`  ${nivel}: ${palabras.length} → ${badge1}: ${badgeMap[badge1].length}, ${badge2}: ${badgeMap[badge2].length}`);
  }
  console.log(`\n  ✅ Total asignadas: ${totalAsignadas}`);
  return badgeMap;
}

// ── 5. GENERAR addLevel() CALLS ──
function generarAddLevelCalls(badgeMap) {
  console.log('\n📝 Generando addLevel() calls...');
  const total = Object.values(badgeMap).reduce((a,b)=>a+b.length,0);
  let output = '// VOCABULARIO EXPANDIDO (+'+total+' palabras nuevas)\n\n';
  const badges = ['A1.1','A1.2','A2.1','A2.2','B1.1','B1.2','B2.1','B2.2','C1.1','C1.2','C2.1','C2.2'];
  for (const badge of badges) {
    const words = badgeMap[badge] || [];
    if (words.length === 0) continue;
    output += `// ── ${badge} (+${words.length}) ──\naddLevel('${badge}',[\n`;
    words.forEach((w,i) => {
      output += `['${w[0].replace(/'/g,"\\'")}','${w[1].replace(/'/g,"\\'")}','${w[2]}','${w[3]}','${w[4]}']`;
      if (i<words.length-1) output += ','; output += '\n';
    });
    output += ']);\n\n';
  }
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`  ✅ Escrito en ${OUTPUT_FILE}`);
  return output;
}

// ── 7. INYECTAR EN RUTA HELPERS ──
function inyectarEnRutaHelpers() {
  const existente = leerVocabularioExistente();
  const sustantivos = extraerSustantivos(existente);
  const sintetico = filtrarSintetico(existente);
  const badgeMap = asignarABadges(sustantivos, sintetico);
  const insertCode = generarAddLevelCalls(badgeMap);
  const totalNuevas = Object.values(badgeMap).reduce((a,b)=>a+b.length,0);
  console.log('\n💉 Inyectando en rutaHelpers.jsx...');
  const content = fs.readFileSync(RUTA_FILE, 'utf8');
  const marker = 'window.MULLER_RUTA_LEVELS';
  const pos = content.indexOf(marker);
  if (pos === -1) { console.log('  ⚠️ No se encontró MULLER_RUTA_LEVELS'); return; }
  const newContent = content.slice(0, pos) + insertCode + '\n' + content.slice(pos);
  fs.writeFileSync(RUTA_FILE, newContent, 'utf8');
  console.log('  ✅ Inyectado correctamente');
  console.log(`\n  Palabras existentes: ${existente.size} → Nuevas: ${totalNuevas} → Total: ${existente.size+totalNuevas}`);
  for (const b of ['A1.1','A1.2','A2.1','A2.2','B1.1','B1.2','B2.1','B2.2','C1.1','C1.2','C2.1','C2.2']) {
    const n = (badgeMap[b]||[]).length;
    if (n>0) console.log(`  ${b}: +${n}`);
  }
}

// ── MAIN ──
function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   EXPANSIÓN VOCABULARIO - RUTA NG      ║');
  console.log('╚══════════════════════════════════════════╝\n');
  const existente = leerVocabularioExistente();
  const sustantivos = extraerSustantivos(existente);
  const sintetico = filtrarSintetico(existente);
  const badgeMap = asignarABadges(sustantivos, sintetico);
  generarAddLevelCalls(badgeMap);
  const totalNuevas = Object.values(badgeMap).reduce((a,b)=>a+b.length,0);
  console.log(`\n  Palabras existentes: ${existente.size} → +${totalNuevas} → Total: ${existente.size+totalNuevas}`);
  console.log('\n📋 Para inyectar: node tools/vocab_expansion.js --inject');
}

if (process.argv.includes('--inject')) inyectarEnRutaHelpers(); else main();