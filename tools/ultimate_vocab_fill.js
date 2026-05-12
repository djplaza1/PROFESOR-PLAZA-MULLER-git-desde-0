var fs = require('fs');
var c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Extract all existing words for dedup
var existingWords = new Set();
var wordRegex = /\[\s*'([^']+?)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
var m;
while ((m = wordRegex.exec(c)) !== null) {
  existingWords.add(m[1].toLowerCase().replace(/^(der |die |das |den )/, '').trim());
}
console.log('Existing unique base words:', existingWords.size);

function isNew(w) {
  var base = w.toLowerCase().replace(/^(der |die |das |den )/, '').trim();
  if (existingWords.has(base)) return false;
  existingWords.add(base);
  return true;
}

// ===== MASSIVE A2 SYNTHETIC VOCABULARY =====
// Everyday objects, animals, food, clothing, body, nature
var a2Bulk = [
  // ANIMALS (Tiere)
  ['der Hund','perro','Hunde'],['die Katze','gato','Katzen'],['der Vogel','pájaro','Vögel'],
  ['der Fisch','pez','Fische'],['das Pferd','caballo','Pferde'],['die Kuh','vaca','Kühe'],
  ['das Schwein','cerdo','Schweine'],['das Schaf','oveja','Schafe'],['die Ziege','cabra','Ziegen'],
  ['das Huhn','gallina','Hühner'],['der Hahn','gallo','Hähne'],['die Ente','pato','Enten'],
  ['die Gans','ganso','Gänse'],['der Elefant','elefante','Elefanten'],['der Löwe','león','Löwen'],
  ['der Tiger','tigre','Tiger'],['der Bär','oso','Bären'],['der Wolf','lobo','Wölfe'],
  ['der Fuchs','zorro','Füchse'],['der Hase','liebre','Hasen'],['das Kaninchen','conejo','Kaninchen'],
  ['die Maus','ratón','Mäuse'],['die Ratte','rata','Ratten'],['der Hamster','hámster','Hamster'],
  ['die Schildkröte','tortuga','Schildkröten'],['der Affe','mono','Affen'],['der Papagei','loro','Papageien'],
  ['der Igel','erizo','Igel'],['das Eichhörnchen','ardilla','Eichhörnchen'],['der Delfin','delfín','Delfine'],
  ['der Wal','ballena','Wale'],['die Biene','abeja','Bienen'],['der Schmetterling','mariposa','Schmetterlinge'],
  ['der Käfer','escarabajo','Käfer'],['die Spinne','araña','Spinnen'],['die Fliege','mosca','Fliegen'],
  // FOOD (Essen)
  ['der Käse','queso','Käse'],['die Butter','mantequilla','','n'],['die Milch','leche','','n'],
  ['der Joghurt','yogur','Joghurts'],['der Quark','requesón','','n'],['die Sahne','crema','','n'],
  ['das Ei','huevo','Eier'],['der Schinken','jamón','Schinken'],['die Wurst','salchicha','Würste'],
  ['das Fleisch','carne','','n'],['das Rindfleisch','carne vaca','','n'],['das Schweinefleisch','cerdo','','n'],
  ['das Hähnchen','pollo','Hähnchen'],['das Brot','pan','Brote'],['die Brötchen','panecillo','Brötchen'],
  ['der Kuchen','pastel','Kuchen'],['der Keks','galleta','Kekse'],['die Schokolade','chocolate','Schokoladen'],
  ['die Marmelade','mermelada','Marmeladen'],['der Honig','miel','','n'],['die Nudeln','pasta','Nudeln'],
  ['der Reis','arroz','','n'],['die Kartoffel','patata','Kartoffeln'],['die Tomate','tomate','Tomaten'],
  ['die Gurke','pepino','Gurken'],['die Karotte','zanahoria','Karotten'],['die Zwiebel','cebolla','Zwiebeln'],
  ['der Knoblauch','ajo','','n'],['der Salat','ensalada','Salate'],['die Suppe','sopa','Suppen'],
  ['der Saft','zumo','Säfte'],['der Tee','té','Tees'],['der Kaffee','café','','n'],
  ['das Bier','cerveza','Biere'],['der Wein','vino','Weine'],['der Sekt','cava','Sekte'],
  ['der Schnaps','licor','Schnäpse'],['der Saft','zumo','Säfte'],['die Limonade','limonada','Limonaden'],
  // BODY (Körper)
  ['der Kopf','cabeza','Köpfe'],['das Gesicht','cara','Gesichter'],['das Auge','ojo','Augen'],
  ['die Nase','nariz','Nasen'],['der Mund','boca','Münder'],['das Ohr','oreja','Ohren'],
  ['der Zahn','diente','Zähne'],['die Zunge','lengua','Zungen'],['der Hals','cuello','Hälse'],
  ['die Schulter','hombro','Schultern'],['der Arm','brazo','Arme'],['der Ellenbogen','codo','Ellenbogen'],
  ['die Hand','mano','Hände'],['der Finger','dedo','Finger'],['der Daumen','pulgar','Daumen'],
  ['der Nagel','uña','Nägel'],['das Bein','pierna','Beine'],['das Knie','rodilla','Knie'],
  ['der Fuß','pie','Füße'],['der Zeh','dedo pie','Zehen'],['die Ferse','talón','Fersen'],
  ['die Haut','piel','','n'],['das Haar','pelo','Haare'],['das Blut','sangre','','n'],
  ['das Herz','corazón','Herzen'],['die Lunge','pulmón','Lungen'],['die Leber','hígado','Lebern'],
  ['der Magen','estómago','Mägen'],['der Darm','intestino','Därme'],['die Niere','riñón','Nieren'],
  // NATURE / WEATHER (Natur/Wetter)
  ['der Himmel','cielo','Himmel'],['die Wolke','nube','Wolken'],['der Regen','lluvia','','n'],
  ['der Schnee','nieve','','n'],['das Eis','hielo','','n'],['der Nebel','niebla','','n'],
  ['der Wind','viento','Winde'],['der Sturm','tormenta','Stürme'],['der Blitz','relámpago','Blitze'],
  ['der Donner','trueno','','n'],['der Regenbogen','arcoíris','Regenbogen'],['die Sonne','sol','Sonnen'],
  ['der Mond','luna','Monde'],['der Stern','estrella','Sterne'],['die Erde','tierra','','n'],
  ['die Wiese','prado','Wiesen'],['der Wald','bosque','Wälder'],['der Berg','montaña','Berge'],
  ['der Hügel','colina','Hügel'],['der Fluss','río','Flüsse'],['der See','lago','Seen'],
  ['das Meer','mar','Meere'],['der Ozean','océano','Ozeane'],['der Strand','playa','Strände'],
  ['die Insel','isla','Inseln'],['das Tal','valle','Täler'],['die Wüste','desierto','Wüsten'],
  ['der Stein','piedra','Steine'],['der Felsen','roca','Felsen'],['der Sand','arena','','n'],
  ['die Luft','aire','','n'],['das Feuer','fuego','','n'],['das Wasser','agua','','n'],
  ['der Boden','suelo','Böden'],['der Weg','camino','Wege'],['die Brücke','puente','Brücken'],
  // COLORS (Farben)
  ['rot','rojo','','adj'],['blau','azul','','adj'],['grün','verde','','adj'],
  ['gelb','amarillo','','adj'],['orange','naranja','','adj'],['lila','lila','','adj'],
  ['grau','gris','','adj'],['schwarz','negro','','adj'],['weiß','blanco','','adj'],
  ['bunt','colorido','','adj'],['hell','claro','','adj'],['dunkel','oscuro','','adj'],
  ['bunt','colorido','','adj'],['golden','dorado','','adj'],['silbern','plateado','','adj'],
  // FAMILY (Familie)
  ['der Vater','padre','Väter'],['die Mutter','madre','Mütter'],['der Sohn','hijo','Söhne'],
  ['die Tochter','hija','Töchter'],['der Bruder','hermano','Brüder'],['die Schwester','hermana','Schwestern'],
  ['der Onkel','tío','Onkel'],['die Tante','tía','Tanten'],['der Cousin','primo','Cousins'],
  ['die Cousine','prima','Cousinen'],['der Großvater','abuelo','Großväter'],['die Großmutter','abuela','Großmütter'],
  ['der Enkel','nieto','Enkel'],['die Enkelin','nieta','Enkelinnen'],['der Neffe','sobrino','Neffen'],
  ['die Nichte','sobrina','Nichten'],['der Schwiegervater','suegro','Schwiegerväter'],['die Schwiegermutter','suegra','Schwiegermütter'],
  ['der Stiefvater','padrastro','Stiefväter'],['die Stiefmutter','madrastra','Stiefmütter'],
  // CITY (Stadt)
  ['die Stadt','ciudad','Städte'],['das Dorf','pueblo','Dörfer'],['die Straße','calle','Straßen'],
  ['der Platz','plaza','Plätze'],['der Park','parque','Parks'],['das Denkmal','monumento','Denkmäler'],
  ['das Museum','museo','Museen'],['die Kirche','iglesia','Kirchen'],['das Schloss','castillo','Schlösser'],
  ['das Rathaus','ayuntamiento','Rathäuser'],['der Turm','torre','Türme'],['die Mauer','muro','Mauern'],
  ['das Tor','puerta','Tore'],['der Brunnen','fuente','Brunnen'],['die Bank','banco','Bänke'],
  ['das Theater','teatro','Theater'],['das Kino','cine','Kinos'],['die Disco','discoteca','Discos'],
  ['der Sportplatz','campo deportes','Sportplätze'],['das Schwimmbad','piscina','Schwimmbäder'],
  // TIME (Zeit)
  ['der Morgen','mañana','Morgen'],['der Vormittag','media mañana','Vormittage'],['der Mittag','mediodía','Mittage'],
  ['der Nachmittag','tarde','Nachmittage'],['der Abend','tarde/noche','Abende'],['die Nacht','noche','Nächte'],
  ['die Stunde','hora','Stunden'],['die Minute','minuto','Minuten'],['die Sekunde','segundo','Sekunden'],
  ['der Tag','día','Tage'],['die Woche','semana','Wochen'],['der Monat','mes','Monate'],
  ['das Jahr','año','Jahre'],['das Jahrhundert','siglo','Jahrhunderte'],
  ['der Januar','enero','','n'],['der Februar','febrero','','n'],
  ['der März','marzo','','n'],['der April','abril','','n'],['der Mai','mayo','','n'],
  ['der Juni','junio','','n'],['der Juli','julio','','n'],['der August','agosto','','n'],
  ['der September','septiembre','','n'],['der Oktober','octubre','','n'],
  ['der November','noviembre','','n'],['der Dezember','diciembre','','n'],
  ['der Montag','lunes','','n'],['der Dienstag','martes','','n'],['der Mittwoch','miércoles','','n'],
  ['der Donnerstag','jueves','','n'],['der Freitag','viernes','','n'],
  ['der Samstag','sábado','','n'],['der Sonntag','domingo','','n'],
  // ADJECTIVES (Adjektive)
  ['sauber','limpio','','adj'],['schmutzig','sucio','','adj'],['ordentlich','ordenado','','adj'],
  ['unordentlich','desordenado','','adj'],['leise','silencioso','','adv'],['laut','ruidoso','','adj'],
  ['schnell','rápido','','adv'],['langsam','lento','','adv'],['früh','temprano','','adv'],
  ['spät','tarde','','adv'],['neu','nuevo','','adj'],['alt','viejo','','adj'],
  ['jung','joven','','adj'],['dick','gordo','','adj'],['dünn','delgado','','adj'],
  ['lang','largo','','adj'],['kurz','corto','','adj'],['breit','ancho','','adj'],
  ['schmal','estrecho','','adj'],['tief','profundo','','adj'],['flach','plano','','adj'],
  ['schwer','pesado','','adj'],['leicht','ligero','','adj'],['hart','duro','','adj'],
  ['weich','blando','','adj'],['rau','áspero','','adj'],['glatt','liso','','adj'],
  ['nass','mojado','','adj'],['trocken','seco','','adj'],['warm','caliente','','adj'],
  ['kalt','frío','','adj'],['heiß','caluroso','','adj'],['kühl','fresco','','adj'],
  ['voll','lleno','','adj'],['leer','vacío','','adj'],['offen','abierto','','adj'],
  ['geschlossen','cerrado','','adj'],['frei','libre','','adj'],['besetzt','ocupado','','adj'],
  ['richtig','correcto','','adj'],['falsch','incorrecto','','adj'],['wichtig','importante','','adj'],
  ['unwichtig','sin importancia','','adj'],['möglich','posible','','adj'],['unmöglich','imposible','','adj'],
  ['nötig','necesario','','adj'],['unnötig','innecesario','','adj'],['seltsam','extraño','','adj'],
  ['komisch','gracioso','','adj'],['lustig','divertido','','adj'],['traurig','triste','','adj'],
  ['wütend','furioso','','adj'],['ängstlich','temeroso','','adj'],['mutig','valiente','','adj'],
  ['faul','perezoso','','adj'],['fleißig','trabajador','','adj'],['ehrlich','honesto','','adj'],
  ['freundlich','amable','','adj'],['böse','malo','','adj'],['höflich','educado','','adj'],
  ['gemein','malo/mezquino','','adj'],['nett','simpático','','adj'],['lieb','querido','','adj'],
  ['tapfer','valiente','','adj'],['klug','inteligente','','adj'],['dumm','tonto','','adj'],
  ['reich','rico','','adj'],['arm','pobre','','adj'],['gesund','saludable','','adj'],
  ['krank','enfermo','','adj'],['müde','cansado','','adj'],['wach','despierto','','adj'],
  ['satt','lleno/comido','','adj'],['hungrig','hambriento','','adj'],['durstig','sediento','','adj'],
];

// ===== B1 ABSTRACT VOCABULARY =====
var b1Bulk = [
  ['die Abmachung','acuerdo','Abmachung'],['die Abneigung','aversión','Abneigungen'],
  ['die Ahnung','presentimiento','Ahnungen'],['die Anerkennung','reconocimiento','Anerkennungen'],
  ['die Angelegenheit','asunto','Angelegenheiten'],['die Anklage','acusación','Anklagen'],
  ['die Anstrengung','esfuerzo','Anstrengungen'],['die Anwendung','aplicación','Anwendungen'],
  ['die Armut','pobreza','','n'],['die Art','tipo','Arten'],['die Ausnahme','excepción','Ausnahmen'],
  ['die Aussage','declaración','Aussagen'],['die Bedeutung','significado','Bedeutungen'],
  ['die Bedingung','condición','Bedingungen'],['die Befürchtung','temor','Befürchtungen'],
  ['die Behauptung','afirmación','Behauptungen'],['die Behandlung','tratamiento','Behandlungen'],
  ['die Beobachtung','observación','Beobachtungen'],['die Bereitschaft','disposición','','n'],
  ['die Beschwerde','queja','Beschwerden'],['die Bestätigung','confirmación','Bestätigungen'],
  ['die Beteiligung','participación','Beteiligungen'],['die Betonung','énfasis','Betonungen'],
  ['die Betrachtung','consideración','Betrachtungen'],['die Bewegung','movimiento','Bewegungen'],
  ['die Beziehung','relación','Beziehungen'],['die Billigung','aprobación','Billigungen'],
  ['die Bitte','ruego','Bitten'],['die Chance','oportunidad','Chancen'],['die Dauer','duración','','n'],
  ['die Definition','definición','Definitionen'],['die Diskussion','discusión','Diskussionen'],
  ['die Eigenschaft','característica','Eigenschaften'],['die Einladung','invitación','Einladungen'],
  ['die Empfehlung','recomendación','Empfehlungen'],['die Entdeckung','descubrimiento','Entdeckungen'],
  ['die Entscheidung','decisión','Entscheidungen'],['die Entschuldigung','disculpa','Entschuldigungen'],
  ['die Erlaubnis','permiso','Erlaubnisse'],['die Ermittlung','investigación','Ermittlungen'],
  ['die Ernährung','alimentación','','n'],['die Erscheinung','aparición','Erscheinungen'],
  ['die Ersparnis','ahorro','Ersparnisse'],['die Fähigkeit','habilidad','Fähigkeiten'],
  ['die Folge','consecuencia','Folgen'],['die Freiheit','libertad','Freiheiten'],
  ['die Geduld','paciencia','','n'],['die Gefahr','peligro','Gefahren'],['die Gewalt','violencia','','n'],
  ['die Gewohnheit','costumbre','Gewohnheiten'],['die Gleichheit','igualdad','Gleichheiten'],
  ['die Größe','tamaño','Größen'],['die Grundlage','base','Grundlagen'],['die Gründung','fundación','Gründungen'],
  ['die Haltung','postura','Haltungen'],['die Handlung','acción','Handlungen'],
  ['die Herkunft','origen','Herkünfte'],['die Herausforderung','desafío','Herausforderungen'],
  ['die Kenntnis','conocimiento','Kenntnisse'],['die Kommunikation','comunicación','','n'],
  ['die Konzentration','concentración','Konzentrationen'],['die Lage','situación','Lagen'],
  ['die Leistung','rendimiento','Leistungen'],['die Leidenschaft','pasión','Leidenschaften'],
  ['die Lösung','solución','Lösungen'],['die Maßnahme','medida','Maßnahmen'],
  ['die Mitteilung','comunicado','Mitteilungen'],['die Möglichkeit','posibilidad','Möglichkeiten'],
  ['die Motivation','motivación','Motivationen'],['die Natur','naturaleza','Naturen'],
  ['die Not','necesidad','Nöte'],['die Notwendigkeit','necesidad','Notwendigkeiten'],
  ['die Ordnung','orden','Ordnungen'],['die Organisation','organización','Organisationen'],
  ['die Peinlichkeit','vergüenza','Peinlichkeiten'],['die Pflicht','obligación','Pflichten'],
  ['die Qualität','calidad','Qualitäten'],['die Quelle','fuente','Quellen'],['die Reaktion','reacción','Reaktionen'],
  ['die Rechtfertigung','justificación','Rechtfertigungen'],['die Rede','discurso','Reden'],
  ['die Regelung','regulación','Regelungen'],['die Reihe','serie','Reihen'],
  ['die Reparatur','reparación','Reparaturen'],['die Rolle','papel','Rollen'],
  ['die Rücksicht','consideración','','n'],['die Rücksprache','consulta','Rücksprachen'],
  ['die Schöpfung','creación','Schöpfungen'],['die Schwierigkeit','dificultad','Schwierigkeiten'],
  ['die Sendung','programa','Sendungen'],['die Sitte','costumbre','Sitten'],
  ['die Sorge','preocupación','Sorgen'],['die Spannung','tensión','Spannungen'],
  ['die Sprache','idioma','Sprachen'],['die Stelle','lugar','Stellen'],['die Stellung','posición','Stellungen'],
  ['die Stimme','voz','Stimmen'],['die Strafe','castigo','Strafen'],['die Stunde','hora','Stunden'],
  ['die Sühne','expiación','Sühnen'],['die Summe','suma','Summen'],['die Sünde','pecado','Sünden'],
  ['die Tätigkeit','actividad','Tätigkeiten'],['die Tat','acción','Taten'],['die Tatsache','hecho','Tatsachen'],
  ['die Teilnahme','participación','Teilnahmen'],['die Tendenz','tendencia','Tendenzen'],
  ['die Theorie','teoría','Theorien'],['die Tiefe','profundidad','Tiefen'],
  ['die Toleranz','tolerancia','','n'],['die Tradition','tradición','Traditionen'],
  ['die Tragödie','tragedia','Tragödien'],['die Trennung','separación','Trennungen'],
  ['die Treue','lealtad','','n'],['die Tugend','virtud','Tugenden'],
  ['die Überlegung','reflexión','Überlegungen'],['die Übersetzung','traducción','Übersetzungen'],
  ['die Umsicht','prudencia','','n'],['die Umstände','circunstancias','Umstände'],
  ['die Ungeduld','impaciencia','','n'],['die Universität','universidad','Universitäten'],
  ['die Untersuchung','investigación','Untersuchungen'],['die Unterstützung','apoyo','Unterstützungen'],
  ['die Ursache','causa','Ursachen'],['die Veränderung','cambio','Veränderungen'],
  ['die Verbindung','conexión','Verbindungen'],['die Verfassung','constitución','Verfassungen'],
  ['die Verfolgung','persecución','Verfolgungen'],['die Verfügung','disposición','Verfügungen'],
  ['die Vergangenheit','pasado','','n'],['die Vergleich','comparación','Vergleiche'],
  ['die Verhandlung','negociación','Verhandlungen'],['die Verletzung','lesión','Verletzungen'],
  ['die Vermietung','alquiler','Vermietungen'],['die Vermutung','suposición','Vermutungen'],
  ['die Vernunft','razón','','n'],['die Versammlung','reunión','Versammlungen'],
  ['die Verspätung','retraso','Verspätungen'],['die Verständigung','comunicación','Verständigungen'],
  ['das Verständnis','comprensión','','n'],['die Verstärkung','refuerzo','Verstärkungen'],
  ['die Verteidigung','defensa','Verteidigungen'],['der Vertrag','contrato','Verträge'],
  ['die Verwandlung','transformación','Verwandlungen'],['die Verwirrung','confusión','Verwirrungen'],
  ['die Vorbereitung','preparación','Vorbereitungen'],['die Vorfreude','anticipación','','n'],
  ['der Vorteil','ventaja','Vorteile'],['die Vorstellung','presentación','Vorstellungen'],
  ['die Wahrheit','verdad','Wahrheiten'],['die Wahl','elección','Wahlen'],
  ['die Weisheit','sabiduría','Weisheiten'],['die Welt','mundo','Welden'],
  ['die Wendung','giro','Wendungen'],['die Wirkung','efecto','Wirkungen'],
  ['die Wirtschaft','economía','','n'],['die Wissenschaft','ciencia','Wissenschaften'],
  ['die Wunde','herida','Wunden'],['die Zerstörung','destrucción','Zerstörungen'],
  ['die Zustimmung','aprobación','Zustimmungen'],['der Zweck','propósito','Zwecke'],
  ['der Zweifel','duda','Zweifel'],['die Zufriedenheit','satisfacción','','n'],
  ['der Zusammenhang','contexto','Zusammenhänge'],['der Zustand','estado','Zustände'],
  ['der Zwischenfall','incidente','Zwischenfälle'],
];

// ===== MORE B1 VERBS =====
var moreB1Verbs = [
  ['abschließen','completar','','','v'],['anpassen','adaptar','','','v'],
  ['aufbauen','construir','','','v'],['ausbilden','formar','','','v'],
  ['ausfüllen','rellenar','','','v'],['ausschalten','apagar','','','v'],
  ['auswählen','seleccionar','','','v'],['bearbeiten','editar','','','v'],
  ['bedeuten','significar','','','v'],['begleiten','acompañar','','','v'],
  ['bekämpfen','combatir','','','v'],['bekommen','recibir','','','v'],
  ['belasten','cargar','','','v'],['bemerken','notar','','','v'],
  ['beraten','asesorar','','','v'],['berechnen','calcular','','','v'],
  ['bereiten','preparar','','','v'],['berichten','informar','','','v'],
  ['beruhigen','calmar','','','v'],['beschäftigen','emplear','','','v'],
  ['beschleunigen','acelerar','','','v'],['beschränken','limitar','','','v'],
  ['beschützen','proteger','','','v'],['besitzen','poseer','','','v'],
  ['bestätigen','confirmar','','','v'],['beteiligen','participar','','','v'],
  ['betonen','enfatizar','','','v'],['betragen','ascender a','','','v'],
  ['betrügen','engañar','','','v'],['beurteilen','juzgar','','','v'],
  ['bezahlen','pagar','','','v'],['beziehen','referirse','','','v'],
  ['bieten','ofrecer','','','v'],['bilden','formar','','','v'],
  ['brauchen','necesitar','','','v'],['danken','agradecer','','','v'],
  ['darstellen','representar','','','v'],['decken','cubrir','','','v'],
  ['denken','pensar','','','v'],['dienen','servir','','','v'],
  ['diskutieren','discutir','','','v'],['drucken','imprimir','','','v'],
  ['durchführen','realizar','','','v'],['einladen','invitar','','','v'],
  ['einrichten','instalar','','','v'],['einschalten','encender','','','v'],
  ['einsetzen','emplear','','','v'],['einteilen','dividir','','','v'],
  ['empfangen','recibir','','','v'],['entdecken','descubrir','','','v'],
  ['entfernen','eliminar','','','v'],['entscheiden','decidir','','','v'],
  ['entstehen','surgir','','','v'],['entwickeln','desarrollar','','','v'],
  ['erfahren','experimentar','','','v'],['erfinden','inventar','','','v'],
  ['erfüllen','cumplir','','','v'],['ergeben','resultar','','','v'],
  ['erhöhen','aumentar','','','v'],['erkennen','reconocer','','','v'],
  ['erklären','explicar','','','v'],['erlauben','permitir','','','v'],
  ['ernähren','alimentar','','','v'],['erregen','excitar','','','v'],
  ['erscheinen','aparecer','','','v'],['erschrecken','asustar','','','v'],
  ['ersetzen','reemplazar','','','v'],['erwähnen','mencionar','','','v'],
  ['erwarten','esperar','','','v'],['erziehen','educar','','','v'],
  ['feiern','celebrar','','','v'],['feststellen','constatar','','','v'],
  ['finden','encontrar','','','v'],['fliegen','volar','','','v'],
  ['fließen','fluir','','','v'],['fordern','exigir','','','v'],
  ['fragen','preguntar','','','v'],['führen','guiar','','','v'],
  ['fürchten','temer','','','v'],['garantieren','garantizar','','','v'],
  ['gebrauchen','usar','','','v'],['gedenken','conmemorar','','','v'],
  ['gefallen','gustar','','','v'],['gehören','pertenecer','','','v'],
  ['gelten','valer','','','v'],['genügen','bastar','','','v'],
  ['gewinnen','ganar','','','v'],['gießen','verter','','','v'],
  ['glauben','creer','','','v'],['gleichen','igualar','','','v'],
  ['gratulieren','felicitar','','','v'],['greifen','agarrar','','','v'],
  ['gründen','fundar','','','v'],['grüßen','saludar','','','v'],
  ['handeln','actuar','','','v'],['hängen','colgar','','','v'],
  ['heben','levantar','','','v'],['heilen','curar','','','v'],
  ['herrschen','reinar','','','v'],['hindern','impedir','','','v'],
  ['hinweisen','señalar','','','v'],['hoffen','esperar','','','v'],
  ['kämpfen','luchar','','','v'],['klingen','sonar','','','v'],
  ['können','poder','','','v'],['können','poder','','','v'],
  ['kümmern','preocuparse','','','v'],['kündigen','cancelar','','','v'],
  ['lächeln','sonreír','','','v'],['lachen','reír','','','v'],
  ['laden','cargar','','','v'],['landen','aterrizar','','','v'],
  ['leisten','realizar','','','v'],['leiten','dirigir','','','v'],
  ['lernen','aprender','','','v'],['lesen','leer','','','v'],
  ['lieben','amar','','','v'],['liefern','entregar','','','v'],
  ['loben','alabar','','','v'],['lösen','resolver','','','v'],
  ['lügen','mentir','','','v'],['missen','perder','','','v'],
  ['mitteilen','comunicar','','','v'],['mögen','gustar','','','v'],
  ['müssen','deber','','','v'],['nachdenken','reflexionar','','','v'],
  ['nennen','nombrar','','','v'],['nutzen','utilizar','','','v'],
  ['opfern','sacrificar','','','v'],['ordnen','ordenar','','','v'],
  ['passen','encajar','','','v'],['planen','planificar','','','v'],
  ['prüfen','comprobar','','','v'],['raten','aconsejar','','','v'],
  ['räumen','despejar','','','v'],['rechnen','calcular','','','v'],
  ['rechtfertigen','justificar','','','v'],['reden','hablar','','','v'],
  ['regen','excitar','','','v'],['reisen','viajar','','','v'],
  ['rennen','correr','','','v'],['retten','salvar','','','v'],
  ['richten','dirigir','','','v'],['riechen','oler','','','v'],
  ['rufen','llamar','','','v'],['ruhen','descansar','','','v'],
  ['rühren','conmover','','','v'],['sagen','decir','','','v'],
  ['sammeln','coleccionar','','','v'],['schaffen','crear','','','v'],
  ['schätzen','estimar','','','v'],['scheiden','separar','','','v'],
  ['scheinen','parecer','','','v'],['schenken','regalar','','','v'],
  ['schicken','enviar','','','v'],['schieben','empujar','','','v'],
  ['schlafen','dormir','','','v'],['schlagen','golpear','','','v'],
  ['schließen','cerrar','','','v'],['schmecken','saber','','','v'],
  ['schreiben','escribir','','','v'],['schreien','gritar','','','v'],
  ['schweigen','callar','','','v'],['schwimmen','nadar','','','v'],
  ['sehen','ver','','','v'],['sehnen','anhelar','','','v'],
  ['senden','enviar','','','v'],['setzen','poner','','','v'],
  ['sicherstellen','asegurar','','','v'],['sorgen','preocuparse','','','v'],
  ['sparen','ahorrar','','','v'],['spielen','jugar','','','v'],
  ['sprechen','hablar','','','v'],['springen','saltar','','','v'],
  ['stammen','provenir','','','v'],['stärken','fortalecer','','','v'],
  ['stecken','meter','','','v'],['stehen','estar de pie','','','v'],
  ['stellen','colocar','','','v'],['sterben','morir','','','v'],
  ['stimmen','tener razón','','','v'],['stören','molestar','','','v'],
  ['stoßen','golpear','','','v'],['streben','esforzarse','','','v'],
  ['streiten','discutir','','','v'],['suchen','buscar','','','v'],
  ['täuschen','engañar','','','v'],['teilen','compartir','','','v'],
  ['tippen','teclear','','','v'],['tragen','llevar','','','v'],
  ['treffen','encontrar','','','v'],['treiben','impulsar','','','v'],
  ['trennen','separar','','','v'],['treten','patear','','','v'],
  ['trinken','beber','','','v'],['tun','hacer','','','v'],
  ['üben','practicar','','','v'],['überlassen','dejar','','','v'],
  ['überlegen','considerar','','','v'],['übernehmen','asumir','','','v'],
  ['überraschen','sorprender','','','v'],['überwinden','superar','','','v'],
  ['umgehen','evitar','','','v'],['unterbrechen','interrumpir','','','v'],
  ['unterhalten','entretener','','','v'],['unterlassen','omitir','','','v'],
  ['unternehmen','emprender','','','v'],['unterscheiden','distinguir','','','v'],
  ['unterstützen','apoyar','','','v'],['untersuchen','examinar','','','v'],
  ['verändern','cambiar','','','v'],['veranstalten','organizar','','','v'],
  ['verbessern','mejorar','','','v'],['verbinden','conectar','','','v'],
  ['verbringen','pasar tiempo','','','v'],['verdienen','ganar','','','v'],
  ['vereinbaren','acordar','','','v'],['verfassen','redactar','','','v'],
  ['verfolgen','perseguir','','','v'],['verfügen','disponer','','','v'],
  ['vergeben','perdonar','','','v'],['vergessen','olvidar','','','v'],
  ['vergleichen','comparar','','','v'],['verhalten','comportarse','','','v'],
  ['verhandeln','negociar','','','v'],['verkaufen','vender','','','v'],
  ['verlangen','exigir','','','v'],['verlassen','abandonar','','','v'],
  ['verletzen','lesionar','','','v'],['verlieben','enamorarse','','','v'],
  ['verlieren','perder','','','v'],['vermehren','multiplicar','','','v'],
  ['vermissen','extrañar','','','v'],['verraten','traicionar','','','v'],
  ['versammeln','reunir','','','v'],['verschwinden','desaparecer','','','v'],
  ['versichern','asegurar','','','v'],['versorgen','abastecer','','','v'],
  ['verstehen','entender','','','v'],['versuchen','intentar','','','v'],
  ['verteidigen','defender','','','v'],['vertragen','soportar','','','v'],
  ['vertrauen','confiar','','','v'],['verursachen','causar','','','v'],
  ['verwalten','administrar','','','v'],['verweigern','negarse','','','v'],
  ['verwenden','utilizar','','','v'],['verwirren','confundir','','','v'],
  ['verzeihen','perdonar','','','v'],['vollenden','completar','','','v'],
  ['vorbereiten','preparar','','','v'],['vorstellen','presentar','','','v'],
  ['wählen','elegir','','','v'],['wahrnehmen','percibir','','','v'],
  ['wandern','senderismo','','','v'],['waschen','lavar','','','v'],
  ['wechseln','cambiar','','','v'],['wecken','despertar','','','v'],
  ['wehren','defenderse','','','v'],['weihen','consagrar','','','v'],
  ['weisen','señalar','','','v'],['wenden','girar','','','v'],
  ['werben','anunciar','','','v'],['werfen','lanzar','','','v'],
  ['werten','valorar','','','v'],['wirken','actuar','','','v'],
  ['wissen','saber','','','v'],['wünschen','desear','','','v'],
  ['zahlen','pagar','','','v'],['zeichnen','dibujar','','','v'],
  ['zeigen','mostrar','','','v'],['zerstören','destruir','','','v'],
  ['ziehen','tirar','','','v'],['zitieren','citar','','','v'],
  ['zögern','dudar','','','v'],['zulassen','permitir','','','v'],
  ['zurechtkommen','arreglárselas','','','v'],['zusammenfassen','resumir','','','v'],
  ['zustimmen','aceptar','','','v'],['zwingen','forzar','','','v'],
];

// Format functions
function fmtN(arr) {
  var article = arr[0].match(/^(der|die|das)/);
  if (article) {
    var word = arr[0].replace(/^(der |die |das )/, '');
    return "  ['" + word + "','" + arr[1] + "','" + article[0] + "','" + (arr[2]||'') + "','n']";
  }
  // Handle words without articles (adjectives, etc that are formatted with empty fields)
  // Handle 4-element arrays like ['rot','rojo','','adj'] or ['die Butter','mantequilla','','n']
  if (arr.length >= 4 && arr[3] !== undefined) {
    // Last element is type, arr[2] is article placeholder (always '' for non-nouns)
    var type = arr[3] || 'adj';
    var art = (type === 'n' && article) ? article[0] : (arr[2] || '');
    return "  ['" + arr[0] + "','" + arr[1] + "','" + art + "','','" + type + "']";
  }
  // 3-element array like ['der Hund','perro','Hunde'] - noun with article, plural in arr[2]
  if (article) {
    var word = arr[0].replace(/^(der |die |das )/, '');
    return "  ['" + word + "','" + arr[1] + "','" + article[0] + "','" + (arr[2]||'') + "','n']";
  }
  // Fallback
  return "  ['" + arr[0] + "','" + arr[1] + "','','','n']";
}
function fmtV(arr) {
  return "  ['" + arr[0] + "','" + arr[1] + "','" + arr[2] + "','" + arr[3] + "','" + arr[4] + "']";
}
function fmtAdj(arr) {
  return "  ['" + arr[0] + "','" + arr[1] + "','" + arr[2] + "','" + arr[3] + "','" + arr[4] + "']";
}

// Distribution targets
var targets = {
  'A2.3': { need: 120 },
  'A2.4': { need: 130 },
  'B1.2': { need: 120 },
  'B1.3': { need: 150 },
  'B1.4': { need: 130 },
  'B2.4': { need: 70 }
};

var byLevel = {};
for (var k in targets) byLevel[k] = [];

// A2.3 gets first half of a2Bulk (nouns)
a2Bulk.forEach(function(w, i) {
  if (i >= a2Bulk.length / 2) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) {
    byLevel['A2.3'].push(fmtN(w));
  }
});

// A2.4 gets second half of a2Bulk
a2Bulk.forEach(function(w, i) {
  if (i < a2Bulk.length / 2) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) {
    byLevel['A2.4'].push(fmtN(w));
  }
});

// B1.2 gets first third of b1Bulk
b1Bulk.forEach(function(w, i) {
  var t = ['B1.2', 'B1.3', 'B1.4'][i % 3];
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) {
    byLevel[t].push(fmtN(w));
  }
});

// Verbs distributed across B1.2, B1.3, B1.4
moreB1Verbs.forEach(function(v, i) {
  var t = ['B1.2', 'B1.3', 'B1.4'][i % 3];
  if (isNew(v[0])) {
    byLevel[t].push(fmtV(v));
  }
});

// Remaining verbs to B2.4
moreB1Verbs.slice(0, 70).forEach(function(v) {
  if (isNew(v[0])) {
    byLevel['B2.4'].push(fmtV(v));
  }
});

console.log('\n=== Injection Plan ===');
var total = 0;
for (var lv in byLevel) {
  console.log(lv + ': ' + byLevel[lv].length + ' new words');
  total += byLevel[lv].length;
}
console.log('Total new: ' + total);

// Apply
var modified = c;
for (var lv in byLevel) {
  var words = byLevel[lv];
  if (!words || words.length === 0) continue;

  var s = modified.indexOf("addLevel('" + lv + "'");
  if (s === -1) { console.log(lv + ' NOT FOUND'); continue; }

  var e = modified.indexOf(']);', s);
  if (e === -1) continue;

  var prefix = modified.substring(0, e + 2);
  var suffix = modified.substring(e + 2);
  modified = prefix + ',\n' + words.join(',\n') + suffix;
  console.log('✅ Injected ' + words.length + ' into ' + lv);
}

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log('\n✅ DONE - file saved');