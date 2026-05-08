var fs = require('fs');
var c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Extract existing words
var existingWords = new Set();
var wordRegex = /\[\s*'([A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
var m;
while ((m = wordRegex.exec(c)) !== null) {
  existingWords.add(m[1].toLowerCase().replace(/^(der |die |das )/, '').trim());
}
console.log('Existing unique words:', existingWords.size);

function isNew(word) {
  var base = word.toLowerCase().replace(/^(der |die |das )/, '').trim();
  if (existingWords.has(base)) return false;
  existingWords.add(base);
  return true;
}

// ===== A2 Vocabulary (everyday, concrete nouns) =====
var a2Nouns = [
  ['die Küche','cocina','Küchen'],['der Herd','cocina/horno','Herde'],['der Ofen','horno','Öfen'],
  ['der Kühlschrank','nevera','Kühlschränke'],['die Spüle','fregadero','Spülen'],['die Mikrowelle','microondas','Mikrowellen'],
  ['der Toaster','tostadora','Toaster'],['der Wasserkocher','hervidor','Wasserkocher'],['die Kaffeemaschine','cafetera','Kaffeemaschinen'],
  ['der Mixer','batidora','Mixer'],['der Schrank','armario','Schränke'],['das Regal','estante','Regale'],
  ['die Kommode','cómoda','Kommen'],['der Kleiderschrank','armario ropa','Kleiderschränke'],['das Bett','cama','Betten'],
  ['die Matratze','colchón','Matratzen'],['das Kissen','almohada','Kissen'],['die Decke','manta','Decken'],
  ['das Laken','sábana','Laken'],['der Vorhang','cortina','Vorhänge'],['der Teppich','alfombra','Teppiche'],
  ['der Flur','pasillo','Flure'],['die Treppe','escalera','Treppen'],['der Balkon','balcón','Balkone'],
  ['der Garten','jardín','Gärten'],['der Rasen','césped','Rasen'],['der Baum','árbol','Bäume'],
  ['die Blume','flor','Blumen'],['der Busch','arbusto','Büsche'],['der Zaun','valla','Zäune'],
  ['die Garage','garaje','Garagen'],['der Keller','sótano','Keller'],['der Dachboden','ático','Dachböden'],
  ['der Müll','basura','','n'],['die Tonne','cubo','Tonnen'],['die Flasche','botella','Flaschen'],
  ['das Glas','vaso','Gläser'],['die Tasse','taza','Tassen'],['der Teller','plato','Teller'],
  ['die Schüssel','cuenco','Schüsseln'],['der Topf','olla','Töpfe'],['die Pfanne','sartén','Pfannen'],
  ['das Messer','cuchillo','Messer'],['die Gabel','tenedor','Gabeln'],['der Löffel','cuchara','Löffel'],
  ['der Krug','jarra','Krüge'],['die Kanne','jarra','Kannen'],['das Tablett','bandeja','Tabletts'],
  ['die Serviette','servilleta','Servietten'],['die Schublade','cajón','Schubladen'],['der Eimer','cubo','Eimer'],
  ['der Besen','escoba','Besen'],['der Mopp','fregona','Mopps'],['der Staubsauger','aspiradora','Staubsauger'],
  ['das Bügeleisen','plancha','Bügeleisen'],['das Waschbecken','lavabo','Waschbecken'],['die Dusche','ducha','Duschen'],
  ['die Badewanne','bañera','Badewannen'],['der Spiegel','espejo','Spiegel'],['das Handtuch','toalla','Handtücher'],
  ['die Seife','jabón','Seifen'],['das Shampoo','champú','Shampoos'],['die Zahnbürste','cepillo dientes','Zahnbürsten'],
  ['die Zahnpasta','pasta dental','Zahnpasten'],['der Kamm','peine','Kämme'],['die Bürste','cepillo','Bürsten'],
  ['der Rasierer','afeitadora','Rasierer'],['das Deo','desodorante','Deos'],['das Parfüm','perfume','Parfüms'],
  ['die Creme','crema','Cremes'],['die Schere','tijeras','Scheren'],['der Faden','hilo','Fäden'],
  ['die Nadel','aguja','Nadeln'],['der Knopf','botón','Knöpfe'],['der Reißverschluss','cremallera','Reißverschlüsse'],
  ['der Schuh','zapato','Schuhe'],['der Stiefel','bota','Stiefel'],['die Socke','calcetín','Socken'],
  ['die Strumpfhose','panty','Strumpfhosen'],['die Hose','pantalón','Hosen'],['die Jeans','vaqueros','Jeans'],
  ['das T-Shirt','camiseta','T-Shirts'],['das Hemd','camisa','Hemden'],['die Bluse','blusa','Blusen'],
  ['der Rock','falda','Röcke'],['das Kleid','vestido','Kleider'],['die Jacke','chaqueta','Jacken'],
  ['der Mantel','abrigo','Mäntel'],['der Hut','sombrero','Hüte'],['die Mütze','gorro','Mützen'],
  ['der Schal','bufanda','Schals'],['die Brille','gafas','Brillen'],['die Uhr','reloj','Uhren'],
  ['die Kette','cadena','Ketten'],['der Ring','anillo','Ringe'],['das Armband','pulsera','Armsbänder'],
  ['die Ohrringe','pendientes','Ohrringe'],['die Brieftasche','cartera','Brieftaschen'],['der Rucksack','mochila','Rucksäcke'],
  ['der Koffer','maleta','Koffer'],['die Tasche','bolso','Taschen'],['der Schirm','paraguas','Schirme'],
  ['der Schlüssel','llave','Schlüssel'],['das Schloss','cerradura','Schlösser'],['das Fahrrad','bicicleta','Fahrräder'],
  ['der Helm','casco','Helme'],['der Bus','autobús','Busse'],['die Straßenbahn','tranvía','Straßenbahnen'],
  ['der Zug','tren','Züge'],['das Flugzeug','avión','Flugzeuge'],['das Schiff','barco','Schiffe'],
  ['die Fähre','ferry','Fähren'],['der Hafen','puerto','Häfen'],['der Flughafen','aeropuerto','Flughäfen'],
  ['der Bahnhof','estación tren','Bahnhöfe'],['die Haltestelle','parada','Haltestellen'],['der Fahrplan','horario','Fahrpläne'],
  ['die Fahrkarte','billete','Fahrkarten'],['der Schaffner','revisor','Schaffner'],['der Ausweis','documento','Ausweise'],
  ['der Reisepass','pasaporte','Reisepässe'],['das Visum','visado','Visa'],['die Grenze','frontera','Grenzen'],
  ['der Zoll','aduana','Zölle'],['das Gepäck','equipaje','','n'],['der Koffer','maleta','Koffer'],
  ['der Rucksack','mochila','Rucksäcke'],['der Stadtplan','mapa ciudad','Stadtpläne'],['die Landkarte','mapa','Landkarten'],
  ['der Campingplatz','camping','Campingplätze'],['das Hotel','hotel','Hotels'],['das Restaurant','restaurante','Restaurants'],
  ['das Café','cafetería','Cafés'],['die Kneipe','bar','Kneipen'],['die Bäckerei','panadería','Bäckereien'],
  ['die Metzgerei','carnicería','Metzgereien'],['der Supermarkt','supermercado','Supermärkte'],['der Markt','mercado','Märkte'],
  ['das Geschäft','tienda','Geschäfte'],['das Einkaufszentrum','centro comercial','Einkaufszentren'],
  ['der Parkplatz','aparcamiento','Parkplätze'],['die Tankstelle','gasolinera','Tankstellen'],['die Werkstatt','taller','Werkstätten'],
  ['die Apotheke','farmacia','Apotheken'],['das Krankenhaus','hospital','Krankenhäuser'],['der Arzt','médico','Ärzte'],
  ['die Praxis','consulta','Praxen'],['der Zahnarzt','dentista','Zahnärzte'],['der Termin','cita','Termine'],
  ['die Sprechstunde','consulta','Sprechstunden'],['das Rezept','receta','Rezepte'],['die Tablette','pastilla','Tabletten'],
  ['das Medikament','medicamento','Medikamente'],['die Spritze','inyección','Spritzen'],['der Verband','venda','Verbände'],
  ['die Pflaster','tirita','Pflaster'],['der Rollstuhl','silla ruedas','Rollstühle'],['die Apotheke','farmacia','Apotheken'],
  ['der Brief','carta','Briefe'],['die Postkarte','postal','Postkarten'],['die Paket','paquete','Pakete'],
  ['der Briefkasten','buzón','Briefkästen'],['der Bote','mensajero','Boten'],['der Lieferung','entrega','Lieferungen'],
  ['der Computer','ordenador','Computer'],['der Laptop','portátil','Laptops'],['der Drucker','impresora','Drucker'],
  ['der Bildschirm','pantalla','Bildschirme'],['die Tastatur','teclado','Tastaturen'],['die Maus','ratón','Mäuse'],
  ['der Lautsprecher','altavoz','Lautsprecher'],['der Kopfhörer','auriculares','Kopfhörer'],['die Kamera','cámara','Kameras'],
];

// ===== B1 Vocabulary (abstract nouns, work, education, society) =====
var b1Nouns = [
  ['die Meinung','opinión','Meinungen'],['die Ansicht','opinión','Ansichten'],['der Standpunkt','punto vista','Standpunkte'],
  ['die Einstellung','actitud','Einstellungen'],['das Gefühl','sentimiento','Gefühle'],['die Stimmung','ambiente','Stimmungen'],
  ['die Laune','humor','Launen'],['die Freude','alegría','Freuden'],['der Ärger','enfado','','n'],
  ['die Wut','ira','','n'],['die Trauer','tristeza','','n'],['die Angst','miedo','Ängste'],
  ['die Sorge','preocupación','Sorgen'],['die Hoffnung','esperanza','Hoffnungen'],['die Enttäuschung','decepción','Enttäuschungen'],
  ['die Überraschung','sorpresa','Überraschungen'],['die Langeweile','aburrimiento','','n'],['der Stress','estrés','','n'],
  ['die Ruhe','calma','','n'],['die Unruhe','inquietud','Unruhen'],['die Spannung','tensión','Spannungen'],
  ['die Erwartung','expectativa','Erwartungen'],['die Sehnsucht','anhelo','Sehnsüchte'],['die Zuneigung','afecto','','n'],
  ['das Vertrauen','confianza','','n'],['das Misstrauen','desconfianza','','n'],['der Respekt','respeto','','n'],
  ['die Bewunderung','admiración','','n'],['die Dankbarkeit','gratitud','','n'],['die Eifersucht','celos','','n'],
  ['der Neid','envidia','','n'],['der Stolz','orgullo','','n'],['die Scham','vergüenza','','n'],
  ['die Schuld','culpa','Schulden'],['die Reue','arrepentimiento','','n'],['die Vergebung','perdón','','n'],
  ['die Versöhnung','reconciliación','Versöhnungen'],['die Beziehung','relación','Beziehungen'],['die Freundschaft','amistad','Freundschaften'],
  ['die Bekanntschaft','conocido','Bekanntschaften'],['die Liebe','amor','','n'],['die Ehe','matrimonio','Ehen'],
  ['die Scheidung','divorcio','Scheidungen'],['die Familie','familia','Familien'],['die Verwandtschaft','parentesco','Verwandtschaften'],
  ['die Erziehung','educación','','n'],['die Kindheit','infancia','','n'],['die Jugend','juventud','','n'],
  ['das Erwachsenenalter','edad adulta','','n'],['das Alter','vejez','','n'],['die Karriere','carrera','Karrieren'],
  ['der Beruf','profesión','Berufe'],['die Stelle','puesto','Stellen'],['die Bewerbung','solicitud','Bewerbungen'],
  ['der Lebenslauf','currículum','Lebensläufe'],['das Vorstellungsgespräch','entrevista','Vorstellungsgespräche'],
  ['die Ausbildung','formación','Ausbildungen'],['das Studium','carrera','Studien'],['das Praktikum','prácticas','Praktika'],
  ['die Weiterbildung','formación continua','Weiterbildungen'],['die Fortbildung','perfeccionamiento','Fortbildungen'],
  ['der Kurs','curso','Kurse'],['das Seminar','seminario','Seminare'],['der Workshop','taller','Workshops'],
  ['die Konferenz','conferencia','Konferenzen'],['der Vortrag','charla','Vorträge'],['die Präsentation','presentación','Präsentationen'],
  ['das Projekt','proyecto','Projekte'],['die Aufgabe','tarea','Aufgaben'],['die Verantwortung','responsabilidad','Verantwortungen'],
  ['die Leitung','dirección','Leitungen'],['die Führung','liderazgo','Führungen'],['das Team','equipo','Teams'],
  ['die Abteilung','departamento','Abteilungen'],['der Betrieb','empresa','Betriebe'],['das Unternehmen','empresa','Unternehmen'],
  ['die Firma','firma','Firmen'],['der Chef','jefe','Chefs'],['der Kollege','colega','Kollegen'],
  ['der Mitarbeiter','empleado','Mitarbeiter'],['der Arbeitgeber','empleador','Arbeitgeber'],['der Arbeitnehmer','empleado','Arbeitnehmer'],
  ['die Gewerkschaft','sindicato','Gewerkschaften'],['der Tarif','tarifa','Tarife'],['das Gehalt','salario','Gehälter'],
  ['der Lohn','sueldo','Löhne'],['die Steuer','impuesto','Steuern'],['die Abgabe','tasa','Abgaben'],
  ['die Rente','jubilación','Renten'],['die Versicherung','seguro','Versicherungen'],['die Kündigung','despido','Kündigungen'],
  ['die Frist','plazo','Fristen'],['die Verlängerung','prórroga','Verlängerungen'],['die Kündigungsfrist','plazo despido','Kündigungsfristen'],
  ['der Urlaub','vacaciones','Urlaube'],['der Feiertag','festivo','Feiertage'],['der Krankheitstag','baja','Krankheitstage'],
  ['die Wirtschaft','economía','','n'],['die Politik','política','','n'],['die Gesellschaft','sociedad','Gesellschaften'],
  ['die Kultur','cultura','Kulturen'],['die Kunst','arte','Künste'],['die Wissenschaft','ciencia','Wissenschaften'],
  ['die Forschung','investigación','Forschungen'],['die Entwicklung','desarrollo','Entwicklungen'],['der Fortschritt','progreso','Fortschritte'],
  ['die Globalisierung','globalización','','n'],['die Umwelt','medio ambiente','Umwelten'],['der Klimawandel','cambio climático','','n'],
  ['die Nachhaltigkeit','sostenibilidad','','n'],['die Energie','energía','Energien'],['die Ressource','recurso','Ressourcen'],
  ['die Bildung','educación','','n'],['die Schule','escuela','Schulen'],['die Universität','universidad','Universitäten'],
  ['die Prüfung','examen','Prüfungen'],['die Note','nota','Noten'],['das Zeugnis','certificado','Zeugnisse'],
  ['der Unterricht','clase','','n'],['die Stunde','hora','Stunden'],['die Pause','pausa','Pausen'],
  ['die Hausaufgabe','deberes','Hausaufgaben'],['die Bibliothek','biblioteca','Bibliotheken'],['das Labor','laboratorio','Labore'],
  ['der Student','estudiante','Studenten'],['der Professor','profesor','Professoren'],['der Dozent','docente','Dozenten'],
  ['der Lerner','aprendiz','Lerner'],['der Anfänger','principiante','Anfänger'],['der Fortgeschrittene','avanzado','Fortgeschrittenen'],
];

// ===== B2-C1 Vocabulary (complex/technical/abstract) =====
var c1Nouns = [
  ['die Analyse','análisis','Analysen'],['die Synthese','síntesis','Synthesen'],['die Hypothese','hipótesis','Hypothesen'],
  ['die Theorie','teoría','Theorien'],['die These','tesis','Thesen'],['das Konzept','concepto','Konzepte'],
  ['das Modell','modelo','Modelle'],['das System','sistema','Systeme'],['die Struktur','estructura','Strukturen'],
  ['die Funktion','función','Funktionen'],['die Variable','variable','Variablen'],['die Konstante','constante','Konstanten'],
  ['der Faktor','factor','Faktoren'],['die Komponente','componente','Komponenten'],['das Element','elemento','Elemente'],
  ['die Phase','fase','Phasen'],['der Prozess','proceso','Prozesse'],['der Ablauf','procedimiento','Abläufe'],
  ['die Methode','método','Methoden'],['die Strategie','estrategia','Estrategias'],['die Taktik','táctica','Taktiken'],
  ['das Verfahren','procedimiento','Verfahren'],['die Technik','técnica','Techniken'],['die Technologie','tecnología','Technologien'],
  ['die Innovation','innovación','Innovationen'],['die Optimierung','optimización','Optimierungen'],
  ['die Evaluation','evaluación','Evaluationen'],['die Bewertung','valoración','Bewertungen'],
  ['die Klassifizierung','clasificación','Klassifizierungen'],['die Kategorie','categoría','Kategorien'],
  ['die Definition','definición','Definitionen'],['die Beschreibung','descripción','Beschreibungen'],
  ['die Erklärung','explicación','Erklärungen'],['die Interpretation','interpretación','Interpretationen'],
  ['die Perspektive','perspectiva','Perspektiven'],['die Dimension','dimensión','Dimensionen'],
  ['die Koordinate','coordenada','Koordinaten'],['die Relation','relación','Relationen'],
  ['die Korrelation','correlación','Korrelationen'],['die Kausalität','causalidad','','n'],
  ['die Wahrscheinlichkeit','probabilidad','Wahrscheinlichkeiten'],['die Statistik','estadística','Statistiken'],
  ['die Tendenz','tendencia','Tendenzen'],['der Trend','tendencia','Trends'],['die Prognose','pronóstico','Prognosen'],
  ['die Vorhersage','predicción','Vorhersagen'],['die Simulation','simulación','Simulationen'],
  ['die Repräsentation','representación','Repräsentationen'],['die Abstraktion','abstracción','Abstraktionen'],
  ['die Kognition','cognición','','n'],['die Wahrnehmung','percepción','Wahrnehmungen'],
  ['die Aufmerksamkeit','atención','','n'],['das Bewusstsein','consciencia','','n'],
  ['das Gedächtnis','memoria','Gedächtnisse'],['die Erkenntnis','conocimiento','Erkenntnisse'],
  ['die Einsicht','comprensión','Einsichten'],['die Intuition','intuición','Intuitionen'],
  ['die Reflexion','reflexión','Reflexionen'],['die Rationalität','racionalidad','','n'],
  ['die Ethik','ética','','n'],['die Moral','moral','','n'],['die Norm','norma','Normen'],
  ['der Wert','valor','Werte'],['das Prinzip','principio','Prinzipien'],['die Regel','regla','Regeln'],
  ['das Gesetz','ley','Gesetze'],['die Verordnung','reglamento','Verordnungen'],['die Richtlinie','directriz','Richtlinien'],
  ['die Vorschrift','norma','Vorschriften'],['die Bestimmung','determinación','Bestimmungen'],
  ['die Bedingung','condición','Bedingungen'],['die Voraussetzung','requisito','Voraussetzungen'],
  ['die Konsequenz','consecuencia','Konsequenzen'],['die Implikation','implicación','Implikationen'],
  ['die Schlussfolgerung','conclusión','Schlussfolgerungen'],['das Resultat','resultado','Resultate'],
  ['die Auswirkung','efecto','Auswirkungen'],['der Effekt','efecto','Effekte'],['die Nebenwirkung','efecto secundario','Nebenwirkungen'],
  ['die Wechselwirkung','interacción','Wechselwirkungen'],['die Abhängigkeit','dependencia','Abhängigkeiten'],
  ['die Unabhängigkeit','independencia','','n'],['die Autonomie','autonomía','Autonomien'],
  ['die Souveränität','soberanía','','n'],['die Legitimität','legitimidad','','n'],
  ['die Autorität','autoridad','Autoritäten'],['die Macht','poder','Mächte'],['der Einfluss','influencia','Einflüsse'],
  ['die Herrschaft','dominio','Herrschaften'],['die Kontrolle','control','Kontrollen'],['die Aufsicht','supervisión','','n'],
  ['die Überwachung','vigilancia','','n'],['die Sicherheit','seguridad','Sicherheiten'],['die Gefahr','peligro','Gefahren'],
  ['das Risiko','riesgo','Risiken'],['die Bedrohung','amenaza','Bedrohungen'],['die Krise','crisis','Krisen'],
  ['der Konflikt','conflicto','Konflikte'],['die Lösung','solución','Lösungen'],['der Kompromiss','compromiso','Kompromisse'],
  ['der Konsens','consenso','','n'],['der Dissens','discrepancia','','n'],['der Dialog','diálogo','Dialoge'],
  ['die Diskussion','discusión','Diskussionen'],['die Debatte','debate','Debatten'],['die Kontroverse','controversia','Kontroversen'],
];

// ===== B1-B2 Verbs =====
var b1Verbs = [
  ['anfangen','empezar','','','v'],['aufhören','parar','','','v'],['mitmachen','participar','','','v'],
  ['teilnehmen','participar','','','v'],['stattfinden','tener lugar','','','v'],['vorbereiten','preparar','','','v'],
  ['zurückkommen','volver','','','v'],['mitkommen','acompañar','','','v'],['weitergehen','continuar','','','v'],
  ['wiederholen','repetir','','','v'],['erinnern','recordar','','','v'],['sich erinnern','acordarse','','','v'],
  ['sich freuen','alegrarse','','','v'],['sich ärgern','enfadarse','','','v'],['sich wundern','sorprenderse','','','v'],
  ['sich bemühen','esforzarse','','','v'],['sich entscheiden','decidirse','','','v'],['sich entwickeln','desarrollarse','','','v'],
  ['sich verändern','cambiar','','','v'],['sich verbessern','mejorar','','','v'],['sich verschlechtern','empeorar','','','v'],
  ['sich gewöhnen','acostumbrarse','','','v'],['sich interessieren','interesarse','','','v'],['sich konzentrieren','concentrarse','','','v'],
  ['sich ausruhen','descansar','','','v'],['sich anmelden','inscribirse','','','v'],['sich bewerben','solicitar','','','v'],
  ['sich vorstellen','presentarse','','','v'],['sich verabschieden','despedirse','','','v'],['sich entschuldigen','disculparse','','','v'],
  ['beschließen','decidir','','','v'],['vermeiden','evitar','','','v'],['erreichen','alcanzar','','','v'],
  ['enthalten','contener','','','v'],['erhalten','recibir','','','v'],['erwarten','esperar','','','v'],
  ['erklären','explicar','','','v'],['beschreiben','describir','','','v'],['vergleichen','comparar','','','v'],
  ['unterscheiden','distinguir','','','v'],['behandeln','tratar','','','v'],['betreffen','afectar','','','v'],
  ['bestehen','consistir','','','v'],['bieten','ofrecer','','','v'],['erfordern','requerir','','','v'],
  ['ermöglichen','posibilitar','','','v'],['verhindern','prevenir','','','v'],['fördern','fomentar','','','v'],
  ['unterstützen','apoyar','','','v'],['ablehnen','rechazar','','','v'],['zustimmen','aceptar','','','v'],
  ['widersprechen','contradecir','','','v'],['überzeugen','convencer','','','v'],['überraschen','sorprender','','','v'],
  ['enttäuschen','decepcionar','','','v'],['beeindrucken','impresionar','','','v'],['beschäftigen','ocupar','','','v'],
  ['verletzen','herir','','','v'],['schützen','proteger','','','v'],['warnen','advertir','','','v'],
  ['drohen','amenazar','','','v'],['zwingen','forzar','','','v'],['erlauben','permitir','','','v'],
  ['verbieten','prohibir','','','v'],['empfehlen','recomendar','','','v'],['vorschlagen','sugerir','','','v'],
  ['akzeptieren','aceptar','','','v'],['kritisieren','criticar','','','v'],['bewerten','evaluar','','','v'],
  ['analysieren','analizar','','','v'],['definieren','definir','','','v'],['interpretieren','interpretar','','','v'],
  ['reagieren','reaccionar','','','v'],['einwirken','influir','','','v'],['auswirken','afectar','','','v'],
  ['eingreifen','intervenir','','','v'],['eintreten','ocurrir','','','v'],['ausgehen','salir','','','v'],
  ['eingehen','aceptar','','','v'],['ausdrücken','expresar','','','v'],['darstellen','representar','','','v'],
  ['hervorheben','destacar','','','v'],['betonen','enfatizar','','','v'],['erwähnen','mencionar','','','v'],
];

// ===== C1 Verbs =====
var c1Verbs = [
  ['erläutern','explicar detalladamente','','','v'],['erörtern','discutir','','','v'],
  ['voraussetzen','presuponer','','','v'],['gegenüberstellen','contraponer','','','v'],
  ['ableiten','deducir','','','v'],['herleiten','derivar','','','v'],['folgern','concluir','','','v'],
  ['schließen','concluir','','','v'],['begründen','fundamentar','','','v'],['rechtfertigen','justificar','','','v'],
  ['widerlegen','refutar','','','v'],['bestätigen','confirmar','','','v'],['widerrufen','revocar','','','v'],
  ['einschränken','restringir','','','v'],['ausschließen','excluir','','','v'],['einschließen','incluir','','','v'],
  ['berücksichtigen','considerar','','','v'],['vernachlässigen','descuidar','','','v'],['übersehen','pasar por alto','','','v'],
  ['unterschätzen','subestimar','','','v'],['überschätzen','sobreestimar','','','v'],['einschätzen','evaluar','','','v'],
  ['abschätzen','estimar','','','v'],['vorhersagen','predecir','','','v'],['voraussagen','pronosticar','','','v'],
  ['prophezeien','profetizar','','','v'],['annehmen','asumir','','','v'],['vermutten','suponer','','','v'],
  ['bezweifeln','dudar','','','v'],['anzweifeln','cuestionar','','','v'],['infrage stellen','cuestionar','','','v'],
  ['behaupten','afirmar','','','v'],['beteuern','asegurar','','','v'],['leugnen','negar','','','v'],
  ['zugeben','admitir','','','v'],['einräumen','conceder','','','v'],['ausräumen','disipar','','','v'],
  ['korrigieren','corregir','','','v'],['revidieren','revisar','','','v'],['modifizieren','modificar','','','v'],
  ['transformieren','transformar','','','v'],['umwandeln','convertir','','','v'],['übertragen','transferir','','','v'],
  ['vermitteln','transmitir','','','v'],['kommunizieren','comunicar','','','v'],['interagieren','interactuar','','','v'],
  ['kooperieren','cooperar','','','v'],['kollaborieren','colaborar','','','v'],['konkurrieren','competir','','','v'],
  ['dominieren','dominar','','','v'],['manipulieren','manipular','','','v'],['kontrollieren','controlar','','','v'],
  ['regulieren','regular','','','v'],['steuern','dirigir','','','v'],['lenken','conducir','','','v'],
  ['fördern','fomentar','','','v'],['hemmen','inhibir','','','v'],['blockieren','bloquear','','','v'],
  ['stimulieren','estimular','','','v'],['aktivieren','activar','','','v'],['deaktivieren','desactivar','','','v'],
  ['integrieren','integrar','','','v'],['differenzieren','diferenciar','','','v'],['spezialisieren','especializar','','','v'],
  ['generalisieren','generalizar','','','v'],['klassifizieren','clasificar','','','v'],['kategorisieren','categorizar','','','v'],
  ['systematisieren','sistematizar','','','v'],['strukturieren','estructurar','','','v'],['organisieren','organizar','','','v'],
  ['priorisieren','priorizar','','','v'],['koordinieren','coordinar','','','v'],['synchronisieren','sincronizar','','','v'],
];

// ===== Generate formatted entries =====
function formatNoun(arr) {
  return "  ['" + arr[0].replace(/^(die |der |das )/, '') + "','" + arr[1] + "','" + arr[0].match(/^(der|die|das)/)[0] + "','" + arr[2] + "','n']";
}

function formatVerb(arr) {
  return "  ['" + arr[0] + "','" + arr[1] + "','" + arr[2] + "','" + arr[3] + "','" + arr[4] + "']";
}

// Group by level
var byLevel = {
  'A2.3': [], 'A2.4': [],
  'B1.2': [], 'B1.3': [], 'B1.4': [],
  'B2.4': [],
  'C1.2': []
};

// Distribute A2 nouns to A2.3 and A2.4
a2Nouns.forEach(function(n, i) {
  var target = i % 2 === 0 ? 'A2.3' : 'A2.4';
  var entry = formatNoun(n);
  var de = n[0].replace(/^(die |der |das )/, '');
  if (isNew(de)) byLevel[target].push(entry);
});

// Distribute B1 nouns to B1.2, B1.3, B1.4
b1Nouns.forEach(function(n, i) {
  var target = ['B1.2', 'B1.3', 'B1.4'][i % 3];
  var entry = formatNoun(n);
  var de = n[0].replace(/^(die |der |das )/, '');
  if (isNew(de)) byLevel[target].push(entry);
});

// Add verbs to B1.2, B1.3, B1.4
b1Verbs.forEach(function(v, i) {
  var target = ['B1.2', 'B1.3', 'B1.4'][i % 3];
  if (isNew(v[0])) byLevel[target].push(formatVerb(v));
});

// C1 nouns and verbs to C1.2
c1Nouns.forEach(function(n) {
  var de = n[0].replace(/^(die |der |das )/, '');
  if (isNew(de)) byLevel['C1.2'].push(formatNoun(n));
});
c1Verbs.forEach(function(v) {
  if (isNew(v[0])) byLevel['C1.2'].push(formatVerb(v));
});

// B2.4 gets leftovers
var b2extra = b1Nouns.filter(function(n, i) { return i >= 60; });
b2extra.forEach(function(n) {
  var de = n[0].replace(/^(die |der |das )/, '');
  if (isNew(de)) byLevel['B2.4'].push(formatNoun(n));
});

console.log('\n=== Words to inject by level ===');
var total = 0;
for (var lv in byLevel) {
  console.log(lv + ': ' + byLevel[lv].length + ' words');
  total += byLevel[lv].length;
}
console.log('Total new words: ' + total);

// Apply injections
var modified = c;
var appliedCount = 0;

for (var lv in byLevel) {
  var words = byLevel[lv];
  if (!words || words.length === 0) continue;

  var s = modified.indexOf("addLevel('" + lv + "'");
  if (s === -1) { console.log('Level ' + lv + ' not found'); continue; }

  var e = modified.indexOf(']);', s);
  if (e === -1) { console.log('Cannot find end of ' + lv); continue; }

  var prefix = modified.substring(0, e + 2);
  var suffix = modified.substring(e + 2);

  var wordBlock = ',\n' + words.join(',\n');
  modified = prefix + wordBlock + suffix;
  appliedCount += words.length;
  console.log('✅ Injected ' + words.length + ' words into ' + lv);
}

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log('\n✅ Total injected: ' + appliedCount + ' words');
console.log('File saved!');