var fs = require('fs');
var c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Existing words for dedup
var existingWords = new Set();
var wordRegex = /\[\s*'([^']+?)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
var m;
while ((m = wordRegex.exec(c)) !== null) {
  existingWords.add(m[1].toLowerCase().replace(/^(der |die |das |den )/, '').trim());
}
console.log('Existing base words:', existingWords.size);

function isNew(w) {
  var base = w.toLowerCase().replace(/^(der |die |das |den )/, '').trim();
  if (existingWords.has(base)) return false;
  existingWords.add(base);
  return true;
}

// ===== B1 ABSTRACT NOUNS (die ... -ung, -heit, -keit, -schaft, -tion) =====
var b1AbstractNouns = [
  ['die Abhängigkeit','dependencia','Abhängigkeiten'],['die Absicht','intención','Absichten'],
  ['die Abteilung','departamento','Abteilungen'],['die Achtung','respeto','','n'],
  ['die Ähnlichkeit','similitud','Ähnlichkeiten'],['die Andeutung','insinuación','Andeutungen'],
  ['die Aneignung','apropiación','Aneignungen'],['die Anerkennung','reconocimiento','Anerkennungen'],
  ['die Anfertigung','elaboración','Anfertigungen'],['die Angewohnheit','costumbre','Angewohnheiten'],
  ['die Anhörung','audiencia','Anhörungen'],['die Anklage','acusación','Anklagen'],
  ['die Ankunft','llegada','Ankünfte'],['die Anlage','instalación','Anlagen'],
  ['die Anleitung','instrucción','Anleitungen'],['die Anmeldung','registro','Anmeldungen'],
  ['die Annahme','suposición','Annahmen'],['die Anpassung','adaptación','Anpassungen'],
  ['die Anregung','estímulo','Anregungen'],['die Anschaffung','adquisición','Anschaffungen'],
  ['die Anschuldigung','acusación','Anschuldigungen'],['die Anspannung','tensión','Anspannungen'],
  ['die Ansprache','discurso','Ansprachen'],['die Anstalt','institución','Anstalten'],
  ['die Ansteckung','contagio','Ansteckungen'],['die Anstellung','empleo','Anstellungen'],
  ['die Anstrengung','esfuerzo','Anstrengungen'],['die Anteilnahme','participación','','n'],
  ['die Anwendung','aplicación','Anwendungen'],['die Anzeige','anuncio','Anzeigen'],
  ['die Anziehung','atracción','Anziehungen'],['die Aufbewahrung','conservación','Aufbewahrungen'],
  ['die Aufforderung','exigencia','Aufforderungen'],['die Aufführung','actuación','Aufführungen'],
  ['die Aufgabe','tarea','Aufgaben'],['die Aufklärung','esclarecimiento','Aufklärungen'],
  ['die Aufmerksamkeit','atención','Aufmerksamkeiten'],['die Aufnahme','recepción','Aufnahmen'],
  ['die Aufregung','emoción','Aufregungen'],['die Aufsicht','supervisión','Aufsichten'],
  ['die Aufgabe','tarea','Aufgaben'],['die Ausbildung','formación','Ausbildungen'],
  ['die Ausdehnung','expansión','Ausdehnungen'],['die Ausführung','ejecución','Ausführungen'],
  ['die Ausgabe','edición','Ausgaben'],['die Ausgrenzung','exclusión','Ausgrenzungen'],
  ['die Auskunft','información','Auskünfte'],['die Auslieferung','entrega','Auslieferungen'],
  ['die Ausnahme','excepción','Ausnahmen'],['die Ausrüstung','equipo','Ausrüstungen'],
  ['die Aussage','declaración','Aussagen'],['die Ausschreibung','convocatoria','Ausschreibungen'],
  ['die Aussicht','vista','Aussichten'],['die Aussprache','pronunciación','Aussprachen'],
  ['die Ausstattung','equipamiento','Ausstattungen'],['die Ausstellung','exposición','Ausstellungen'],
  ['die Auswahl','selección','Auswahlen'],['die Auswirkung','efecto','Auswirkungen'],
  ['die Bearbeitung','procesamiento','Bearbeitungen'],['die Beaufsichtigung','supervisión','Beaufsichtigungen'],
  ['die Bedeutung','significado','Bedeutungen'],['die Bedingung','condición','Bedingungen'],
  ['die Beförderung','transporte','Beförderungen'],['die Befragung','encuesta','Befragungen'],
  ['die Befriedigung','satisfacción','Befriedigungen'],['die Befugnis','competencia','Befugnisse'],
  ['die Begabung','talento','Begabungen'],['die Begebenheit','acontecimiento','Begebenheiten'],
  ['die Begleitung','acompañamiento','Begleitungen'],['die Begrenzung','limitación','Begrenzungen'],
  ['die Begründung','justificación','Begründungen'],['die Begrüßung','saludo','Begrüßungen'],
  ['die Behandlung','tratamiento','Behandlungen'],['die Behauptung','afirmación','Behauptungen'],
  ['die Beherrschung','dominio','','n'],['die Behörde','autoridad','Behörden'],
  ['die Bekämpfung','lucha','Bekämpfungen'],['die Bekanntheit','fama','','n'],
  ['die Bekanntmachung','anuncio','Bekanntmachungen'],['die Bekleidung','vestimenta','Bekleidungen'],
  ['die Belastung','carga','Belastungen'],['die Beleidigung','insulto','Beleidigungen'],
  ['die Beleuchtung','iluminación','Beleuchtungen'],['die Belieferung','suministro','Belieferungen'],
  ['die Bemerking','observación','Bemerkungen'],['die Beobachtung','observación','Beobachtungen'],
  ['die Beratung','asesoría','Beratungen'],['die Berechnung','cálculo','Berechnungen'],
  ['die Bereicherung','enriquecimiento','Bereicherungen'],['die Bereitschaft','disposición','','n'],
  ['die Bergung','rescate','Bergungen'],['die Berichterstattung','cobertura informativa','Berichterstattungen'],
  ['die Berücksichtigung','consideración','Berücksichtigungen'],['die Berufung','apelación','Berufungen'],
  ['die Beschäftigung','ocupación','Beschäftigungen'],['die Bescheinigung','certificado','Bescheinigungen'],
  ['die Beschleunigung','aceleración','Beschleunigungen'],['die Beschränkung','restricción','Beschränkungen'],
  ['die Beschreibung','descripción','Beschreibungen'],['die Beschwerde','queja','Beschwerden'],
  ['die Besetzung','ocupación','Besetzungen'],['die Besichtigung','visita','Besichtigungen'],
  ['die Besonderheit','peculiaridad','Besonderheiten'],['die Besorgung','compra','Besorgungen'],
  ['die Bestätigung','confirmación','Bestätigungen'],['die Bestellung','pedido','Bestellungen'],
  ['die Bestimmung','determinación','Bestimmungen'],['die Beteiligung','participación','Beteiligungen'],
  ['die Betonung','énfasis','Betonungen'],['die Betrachtung','consideración','Betrachtungen'],
  ['die Betreuung','cuidado','Betreuungen'],['die Betriebsamkeit','actividad','Betriebsamkeiten'],
  ['die Beurteilung','evaluación','Beurteilungen'],['die Bevölkerung','población','Bevölkerungen'],
  ['die Bewegung','movimiento','Bewegungen'],['die Bewerbung','solicitud','Bewerbungen'],
  ['die Bewertung','valoración','Bewertungen'],['die Bewilligung','aprobación','Bewilligungen'],
  ['die Bewirtung','hospitalidad','Bewirtungen'],['die Bezahlung','pago','Bezahlungen'],
  ['die Beziehung','relación','Beziehungen'],['die Beziehung','relación','Beziehungen'],
  ['die Bezugnahme','referencia','Bezugnahmen'],['die Bildung','educación','Bildungen'],
  ['die Billigung','aprobación','Billigungen'],['die Bindung','vínculo','Bindungen'],
  ['die Darstellung','representación','Darstellungen'],['die Dauer','duración','','n'],
  ['die Deckung','cobertura','Deckungen'],['die Deutung','interpretación','Deutungen'],
  ['die Dichtung','poesía','Dichtungen'],['die Dienstleistung','servicio','Dienstleistungen'],
  ['die Diskussion','discusión','Diskussionen'],['die Drehung','giro','Drehungen'],
  ['die Dringlichkeit','urgencia','Dringlichkeiten'],['die Duldung','tolerancia','Duldungen'],
  ['die Dunkelheit','oscuridad','Dunkelheiten'],['die Durchführung','realización','Durchführungen'],
  ['die Durchsage','anuncio','Durchsagen'],['die Durchsuchung','registro','Durchsuchungen'],
  ['die Ehrung','homenaje','Ehrungen'],['die Eigenheit','peculiaridad','Eigenheiten'],
  ['die Eigenschaft','característica','Eigenschaften'],['die Einbildung','imaginación','Einbildungen'],
  ['die Einfuhr','importación','Einfuhren'],['die Einführung','introducción','Einführungen'],
  ['die Eingabe','entrada','Eingaben'],['die Einheit','unidad','Einheiten'],
  ['die Einigung','acuerdo','Einigungen'],['die Einkaufsmöglichkeit','posibilidad de compra','Einkaufsmöglichkeiten'],
  ['die Einladung','invitación','Einladungen'],['die Einrichtung','instalación','Einrichtungen'],
  ['die Einsamkeit','soledad','Einsamkeiten'],['die Einschränkung','restricción','Einschränkungen'],
  ['die Einschätzung','estimación','Einschätzungen'],['die Einsicht','comprensión','Einsichten'],
  ['die Einstellung','actitud','Einstellungen'],['die Eintragung','inscripción','Eintragungen'],
  ['die Einwilligung','consentimiento','Einwilligungen'],['die Einwirkung','influencia','Einwirkungen'],
  ['die Einzahlung','depósito','Einzahlungen'],['die Einzelheit','detalle','Einzelheiten'],
  ['die Empfehlung','recomendación','Empfehlungen'],['die Empfindung','sensación','Empfindungen'],
  ['die Enthaltung','abstención','Enthaltungen'],['die Entscheidung','decisión','Entscheidungen'],
  ['die Entschuldigung','disculpa','Entschuldigungen'],['die Entfernung','distancia','Entfernungen'],
  ['die Entführung','secuestro','Entführungen'],['die Entgegnung','réplica','Entgegnungen'],
  ['die Enthüllung','revelación','Enthüllungen'],['die Entlassung','despido','Entlassungen'],
  ['die Entnahme','extracción','Entnahmen'],['die Entrüstung','indignación','Entrüstungen'],
  ['die Entschädigung','indemnización','Entschädigungen'],['die Enttäuschung','decepción','Enttäuschungen'],
  ['die Entwicklung','desarrollo','Entwicklungen'],['die Entwendung','robo','Entwendungen'],
  ['die Erbauung','edificación','Erbauungen'],['die Erbitterung','amargura','Erbitterungen'],
  ['die Erde','tierra','','n'],['die Ereignis','acontecimiento','Ereignisse'],
  ['die Erfahrung','experiencia','Erfahrungen'],['die Erfassung','captura','Erfassungen'],
  ['die Erfindung','invento','Erfindungen'],['die Erfolglosigkeit','falta de éxito','','n'],
  ['die Erforschung','investigación','Erforschungen'],['die Erfüllung','cumplimiento','Erfüllungen'],
  ['die Erhaltung','conservación','Erhaltungen'],['die Erhebung','encuesta','Erhebungen'],
  ['die Erhitzung','calentamiento','Erhitzungen'],['die Erhöhung','aumento','Erhöhungen'],
  ['die Erinnerung','recuerdo','Erinnerungen'],['die Erkennung','reconocimiento','Erkennungen'],
  ['die Erklärung','explicación','Erklärungen'],['die Erlaubnis','permiso','Erlaubnisse'],
  ['die Ermäßigung','descuento','Ermäßigungen'],['die Ermittlung','investigación','Ermittlungen'],
  ['die Ermordung','asesinato','Ermordungen'],['die Ermutigung','ánimo','Ermutigungen'],
  ['die Ernährung','alimentación','','n'],['die Erneuerung','renovación','Erneuerungen'],
  ['die Erniedrigung','humillación','Erniedrigungen'],['die Ernennung','nombramiento','Ernennungen'],
  ['die Eröffnung','apertura','Eröffnungen'],['die Erörterung','discusión','Erörterungen'],
  ['die Erpressung','chantaje','Erpressungen'],['die Erprobung','prueba','Erprobungen'],
  ['die Errungenschaft','logro','Errungenschaften'],['die Erscheinung','aparición','Erscheinungen'],
  ['die Erschöpfung','agotamiento','Erschöpfungen'],['die Ersparnis','ahorro','Ersparnisse'],
  ['die Erstarrung','rigidez','Erstarrungen'],['die Erstattung','reembolso','Erstattungen'],
  ['die Erteilung','concesión','Erteilungen'],['die Erwartung','expectativa','Erwartungen'],
  ['die Erweiterung','ampliación','Erweiterungen'],['die Erwerbung','adquisición','Erwerbungen'],
  ['die Erzählung','narración','Erzählungen'],['die Erziehung','educación','Erziehungen'],
  ['die Erzeugung','producción','Erzeugungen'],['die Fahrbahn','calzada','Fahrbahnen'],
  ['die Fähigkeit','habilidad','Fähigkeiten'],['die Fälschung','falsificación','Fälschungen'],
  ['die Fassung','versión','Fassungen'],['die Festlegung','fijación','Festlegungen'],
  ['die Festnahme','detención','Festnahmen'],['die Festsetzung','determinación','Festsetzungen'],
  ['die Feststellung','constatación','Feststellungen'],['die Feuchtigkeit','humedad','Feuchtigkeiten'],
  ['die Finanzierung','financiación','Finanzierungen'],['die Flüssigkeit','líquido','Flüssigkeiten'],
  ['die Folge','consecuencia','Folgen'],['die Förderung','fomento','Förderungen'],
  ['die Forschung','investigación','Forschungen'],['die Fortbildung','formación continua','Fortbildungen'],
  ['die Fortführung','continuación','Fortführungen'],['die Fortsetzung','continuación','Fortsetzungen'],
  ['die Freiheit','libertad','Freiheiten'],['die Freisetzung','liberación','Freisetzungen'],
  ['die Freude','alegria','Freuden'],['die Freundlichkeit','amabilidad','Freundlichkeiten'],
  ['die Friedlichkeit','paz','','n'],['die Frist','plazo','Fristen'],
  ['die Fröhlichkeit','alegría','','n'],['die Führung','guía','Führungen'],
  ['die Fülle','plenitud','','n'],['die Funktion','función','Funktionen'],
  ['die Fürsorge','cuidado','','n'],['die Ganzheit','totalidad','Ganzheiten'],
  ['die Geborgenheit','seguridad','Geborgenheiten'],['die Geduld','paciencia','','n'],
  ['die Gefahr','peligro','Gefahren'],['die Gefangenschaft','cautiverio','Gefangenschaften'],
  ['die Gefühllosigkeit','insensibilidad','','n'],['die Gegend','región','Gegenden'],
  ['die Gegebenheit','circunstancia','Gegebenheiten'],['die Geheimhaltung','confidencialidad','Geheimhaltungen'],
  ['die Gelegenheit','oportunidad','Gelegenheiten'],['die Geltenmachung','reivindicación','Geltenmachungen'],
  ['die Gelübde','voto','Gelübde'],['die Gemeinsamkeit','punto común','Gemeinsamkeiten'],
  ['die Gemeinschaft','comunidad','Gemeinschaften'],['die Genehmigung','autorización','Genehmigungen'],
  ['die Genugtuung','satisfacción','Genugtuungen'],['die Genauigkeit','precisión','Genauigkeiten'],
  ['die Gerechtigkeit','justicia','Gerechtigkeiten'],['die Gerichtsbarkeit','jurisdicción','Gerichtsbarkeiten'],
  ['die Germanistik','estudios germánicos','','n'],['die Gesamtheit','totalidad','','n'],
  ['die Geschwindigkeit','velocidad','Geschwindigkeiten'],['die Gesellschaft','sociedad','Gesellschaften'],
  ['die Gesetzgebung','legislación','Gesetzgebungen'],['die Gesinnung','mentalidad','Gesinnungen'],
  ['die Gestaltung','diseño','Gestaltungen'],['die Gesundheit','salud','','n'],
  ['die Gewalt','violencia','','n'],['die Gewerkschaft','sindicato','Gewerkschaften'],
  ['die Gewinnung','extracción','Gewinnungen'],['die Gewissheit','certeza','Gewissheiten'],
  ['die Gewohnheit','costumbre','Gewohnheiten'],['die Gliederung','estructura','Gliederungen'],
  ['die Größe','tamaño','Größen'],['die Grundlage','base','Grundlagen'],
  ['die Gründung','fundación','Gründungen'],['die Gruppenarbeit','trabajo en grupo','','n'],
  ['die Gruppierung','agrupación','Gruppierungen'],['die Gunst','favor','Gunsten'],
  ['die Haftung','responsabilidad','Haftungen'],['die Hälfte','mitad','Hälften'],
  ['die Haltung','actitud','Haltungen'],['die Handhabung','manejo','Handhabungen'],
  ['die Handlung','acción','Handlungen'],['die Härte','dureza','Härten'],
  ['die Häufigkeit','frecuencia','Häufigkeiten'],['die Hauptsache','lo esencial','Hauptsachen'],
  ['die Heftigkeit','violencia','','n'],['die Heimat','patria','','n'],
  ['die Heirat','matrimonio','Heiraten'],['die Heiterkeit','alegría','','n'],
  ['die Herausforderung','desafío','Herausforderungen'],['die Herausgabe','edición','Herausgaben'],
  ['die Herkunft','origen','Herkünfte'],['die Herrschaft','dominio','Herrschaften'],
  ['die Herstellung','fabricación','Herstellungen'],['die Hilflosigkeit','desamparo','','n'],
  ['die Hinsicht','aspecto','Hinsichten'],['die Hoffnung','esperanza','Hoffnungen'],
  ['die Höflichkeit','cortesía','Höflichkeiten'],['die Höhe','altura','Höhen'],
  ['die Hölle','infierno','Höllen'],['die Illegalität','ilegalidad','','n'],
  ['die Illustrierte','revista ilustrada','Illustrierten'],['die Immigration','inmigración','Immigrationen'],
  ['die Impfung','vacunación','Impfungen'],['die Industrie','industria','Industrien'],
  ['die Information','información','Informationen'],['die Infrastruktur','infraestructura','Infrastrukturen'],
  ['die Initiative','iniciativa','Initiativen'],['die Innenstadt','centro','Innenstädte'],
  ['die Innovation','innovación','Innovationen'],['die Inszenierung','puesta en escena','Inszenierungen'],
  ['die Integration','integración','Integrationen'],['die Intelligenz','inteligencia','','n'],
  ['die Intensität','intensidad','Intensitäten'],['die Interpretation','interpretación','Interpretationen'],
  ['die Intuition','intuición','Intuitionen'],['die Investition','inversión','Investitionen'],
  ['die Isolation','aislamiento','Isolationen'],['die Jagd','caza','Jagden'],
  ['die Jahreszeit','estación','Jahreszeiten'],['die Kammer','cámara','Kammern'],
  ['die Karte','mapa','Karten'],['die Kasse','caja','Kassen'],
  ['die Katastrophe','catástrofe','Katastrophen'],['die Kenntnis','conocimiento','Kenntnisse'],
  ['die Kette','cadena','Ketten'],['die Kindheit','infancia','','n'],
  ['die Klarheit','claridad','Klarheiten'],['die Klasse','clase','Klassen'],
  ['die Klassifizierung','clasificación','Klassifizierungen'],['die Klausel','cláusula','Klauseln'],
  ['die Kleidung','ropa','Kleidungen'],['die Kleinigkeit','pequeñez','Kleinigkeiten'],
  ['die Konsequenz','consecuencia','Konsequenzen'],['die Konsumation','consumo','Konsumationen'],
  ['die Kontrolle','control','Kontrollen'],['die Konzentration','concentración','Konzentrationen'],
  ['die Kooperation','cooperación','Kooperationen'],['die Koordination','coordinación','Koordinationen'],
  ['die Kopie','copia','Kopien'],['die Körperschaft','corporación','Körperschaften'],
  ['die Korrektur','corrección','Korrekturen'],['die Korrespondenz','correspondencia','Korrespondenzen'],
  ['die Kostbarkeit','tesoro','Kostbarkeiten'],['die Kosten','costos','Kosten'],
  ['die Kraft','fuerza','Kräfte'],['die Krankheit','enfermedad','Krankheiten'],
  ['die Kränkung','ofensa','Kränkungen'],['die Kreativität','creatividad','','n'],
  ['die Krise','crisis','Krisen'],['die Kritik','crítica','Kritiken'],
  ['die Kühnheit','audacia','Kühnheiten'],['die Kultur','cultura','Kulturen'],
  ['die Kündigung','cancelación','Kündigungen'],['die Kunst','arte','Künste'],
  ['die Kupplung','embrague','Kupplungen'],['die Kurve','curva','Kurven'],
  ['die Ladung','carga','Ladungen'],['die Lage','situación','Lagen'],
  ['die Landschaft','paisaje','Landschaften'],['die Landung','aterrizaje','Landungen'],
  ['die Langeweile','aburrimiento','','n'],['die Länge','longitud','Längen'],
  ['die Langlebigkeit','longevidad','','n'],['die Langsamkeit','lentitud','Langsamkeiten'],
  ['die Lärmbelästigung','contaminación acústica','Lärmbelästigungen'],
  ['die Last','carga','Lasten'],['die Lösung','solución','Lösungen'],
  ['die Leichtigkeit','facilidad','Leichtigkeiten'],['die Leidenschaft','pasión','Leidenschaften'],
  ['die Leistung','rendimiento','Leistungen'],['die Leitfähigkeit','conductividad','Leitfähigkeiten'],
  ['die Leitung','dirección','Leitungen'],['die Lektüre','lectura','Lektüren'],
  ['die Lenkung','dirección','Lenkungen'],['die Lernmethode','método de aprendizaje','Lernmethoden'],
  ['die Leserschaft','lectores','','n'],['die Leuchte','lámpara','Leuchten'],
  ['die Liebenswürdigkeit','amabilidad','Liebenswürdigkeiten'],['die Lieferung','entrega','Lieferungen'],
  ['die Linie','línea','Linien'],['die Linke','izquierda','Linken'],
  ['die Lippe','labio','Lippen'],['die Literatur','literatura','Literaturen'],
  ['die Logik','lógica','','n'],['die Lokomotive','locomotora','Lokomotiven'],
  ['die Loslösung','separación','Loslösungen'],['die Lösung','solución','Lösungen'],
  ['die Lüge','mentira','Lügen'],['die Lust','placer','Lüste'],
  ['die Macht','poder','Mächte'],['die Mäßigung','moderación','Mäßigungen'],
  ['die Mahlzeit','comida','Mahlzeiten'],['die Mahnung','advertencia','Mahnungen'],
  ['die Manifestation','manifestación','Manifestationen'],['die Mannschaft','equipo','Mannschaften'],
  ['die Masse','masa','Massen'],['die Maßnahme','medida','Maßnahmen'],
  ['die Mäßigung','moderación','Mäßigungen'],['die Material','material','Materialien'],
  ['die Mauer','muro','Mauern'],['die Mechanik','mecánica','','n'],
  ['die Meditation','meditación','Meditationen'],['die Meinung','opinión','Meinungen'],
  ['die Meisterschaft','maestría','Meisterschaften'],['die Melodie','melodía','Melodien'],
  ['die Menge','cantidad','Mengen'],['die Menschheit','humanidad','Menschheiten'],
  ['die Messe','feria','Messen'],['die Messung','medición','Messungen'],
  ['die Miete','alquiler','Mieten'],['die Minderheit','minoría','Minderheiten'],
  ['die Minderung','reducción','Minderungen'],['die Minute','minuto','Minuten'],
  ['die Misere','miseria','Miseren'],['die Missbilligung','desaprobación','Missbilligungen'],
  ['die Misshandlung','maltrato','Misshandlungen'],['die Missstimmung','malestar','Missstimmungen'],
  ['die Missverständnis','malentendido','Missverständnisse'],['die Mitte','centro','Mitten'],
  ['die Mitteilung','comunicación','Mitteilungen'],['die Mitschuld','culpa compartida','','n'],
  ['die Mitarbeit','colaboración','Mitarbeiten'],['die Mitternacht','medianoche','Mitternächte'],
  ['die Mode','moda','Moden'],['die Moderation','moderación','Moderationen'],
  ['die Möglichkeit','posibilidad','Möglichkeiten'],['die Moral','moral','','n'],
  ['die Motivation','motivación','Motivationen'],['die Mühe','esfuerzo','Mühen'],
  ['die Mündigkeit','madurez','','n'],['die Munition','munición','Munitionen'],
  ['die Müslischachtel','caja de cereales','Müslischachteln'],['die Mutprobe','prueba de valor','Mutproben'],
  ['die Mutterschaft','maternidad','','n'],['die Myriade','miríada','Myriaden'],
  ['die Nachahmung','imitación','Nachahmungen'],['die Nachbarschaft','vecindad','Nachbarschaften'],
  ['die Nachbildung','reproducción','Nachbildungen'],['die Nachfrage','demanda','Nachfragen'],
  ['die Nachhaltigkeit','sostenibilidad','','n'],['die Nachkriegszeit','posguerra','Nachkriegszeiten'],
  ['die Nachlässigkeit','negligencia','Nachlässigkeiten'],['die Nachricht','noticia','Nachrichten'],
  ['die Nachrüstung','modernización','Nachrüstungen'],['die Nachsicht','indulgencia','Nachsichten'],
  ['die Nachspeise','postre','Nachspeisen'],['die Nächstenliebe','caridad','','n'],
  ['die Nächstenliebe','caridad','','n'],['die Nacht','noche','Nächte'],
  ['die Nacktheit','desnudez','','n'],['die Nadel','aguja','Nadeln'],
  ['die Nähmaschine','máquina de coser','Nähmaschinen'],['die Nahrung','alimento','Nahrungen'],
  ['die Nahrungsergänzung','suplemento','Nahrungsergänzungen'],
  ['die Nahrungsmittelknappheit','escasez de alimentos','','n'],['die Nährwert','valor nutricional','Nährwerte'],
  ['die Namensgebung','nomenclatura','Namensgebungen'],['die Narbe','cicatriz','Narben'],
  ['die Narkose','anestesia','Narkosen'],['die Nase','nariz','Nasen'],
  ['die Nation','nación','Nationen'],['die Natur','naturaleza','Naturen'],
  ['die Nebel','niebla','Nebel'],['die Nebensache','cosa secundaria','Nebensachen'],
  ['die Neid','envidia','Neid'],['die Neigung','inclinación','Neigungen'],
  ['die Nennung','mención','Nennungen'],['die Nervosität','nerviosismo','','n'],
  ['die Netzhaut','retina','Netzhäute'],['die Neuanfang','nuevo comienzo','Neuanfänge'],
  ['die Neubewertung','reevaluación','Neubewertungen'],['die Neuerung','innovación','Neuerungen'],
  ['die Neugier','curiosidad','','n'],['die Neutralität','neutralidad','','n'],
  ['die Nichtbeachtung','desatención','Nichtbeachtungen'],['die Niedergeschlagenheit','abatimiento','','n'],
  ['die Niederkunft','parto','Niederkünfte'],['die Niederschlag','precipitación','Niederschläge'],
  ['die Niederschrift','transcripción','Niederschriften'],['die Niederlage','derrota','Niederlagen'],
  ['die Norm','norma','Normen'],['die Normalität','normalidad','','n'],
  ['die Not','necesidad','Nöte'],['die Notaufnahme','urgencias','Notaufnahmen'],
  ['die Notbremse','freno de emergencia','Notbremsen'],['die Notdurft','necesidad fisiológica','Notdürfte'],
  ['die Notiz','nota','Notizen'],['die Notlösung','solución de emergencia','Notlösungen'],
  ['die Notwendigkeit','necesidad','Notwendigkeiten'],['die Novelle','novela corta','Novellen'],
  ['die Nuance','matiz','Nuancen'],['die Nudel','pasta','Nudeln'],
  ['die Null','cero','Nullen'],['die Nummer','número','Nummern'],
  ['die Nuss','nuez','Nüsse'],['die Nutzanwendung','aplicación práctica','Nutzanwendungen'],
  ['die Nutzung','uso','Nutzungen'],['die Oase','oasis','Oasen'],
  ['die Obhut','cuidado','','n'],['die Objektivität','objetividad','','n'],
  ['die Observierung','observación','Observierungen'],['die Öffentlichkeit','público','Öffentlichkeiten'],
  ['die Öffnung','apertura','Öffnungen'],['die Ohnmacht','inconsciencia','Ohnmachten'],
  ['die Ökologie','ecología','Ökologien'],['die Ökonomie','economía','Ökonomien'],
  ['die Option','opción','Optionen'],['die Ordnung','orden','Ordnungen'],
  ['die Organisation','organización','Organisationen'],['die Orientierung','orientación','Orientierungen'],
  ['die Ortschaft','localidad','Ortschaften'],['die Pacht','alquiler','Pachten'],
  ['die Pädagogik','pedagogía','','n'],['die Palme','palmera','Palmen'],
  ['die Panik','pánico','Paniken'],['die Papierindustrie','industria papelera','Papierindustrien'],
  ['die Parade','desfile','Paraden'],['die Parallele','paralelo','Parallelen'],
  ['die Parfümerie','perfumería','Parfümerien'],['die Parkanlage','parque','Parkanlagen'],
  ['die Parkbucht','aparcamiento','Parkbuchten'],['die Parkgebühr','tarifa de estacionamiento','Parkgebühren'],
  ['die Parklücke','hueco de aparcamiento','Parklücken'],['die Parkscheibe','disco de estacionamiento','Parkscheiben'],
  ['die Parole','consigna','Parolen'],['die Partei','partido','Parteien'],
  ['die Partnerschaft','asociación','Partnerschaften'],
  ['die Passhöhe','puerto de montaña','Passhöhen'],['die Passion','pasión','Passionen'],
  ['die Passkontrolle','control de pasaportes','Passkontrollen'],['die Passstraße','carretera de montaña','Passstraßen'],
  ['die Paste','pasta','Paste'],['die Pause','pausa','Pausen'],
  ['die Pein','dolor','','n'],['die Peinlichkeit','vergüenza','Peinlichkeiten'],
  ['die Pension','pensión','Pensionen'],['die Perle','perla','Perlen'],
  ['die Person','persona','Personen'],['die Persönlichkeit','personalidad','Persönlichkeiten'],
];

// More B1-B2 verbs with prepositions (reflexive + separable)
var moreB1Verbs2 = [
  ['sich anpassen','adaptarse','','','v'],['sich anstrengen','esforzarse','','','v'],
  ['sich ärgern','enfadarse','','','v'],['sich auskennen','conocer bien','','','v'],
  ['sich ausruhen','descansar','','','v'],['sich auszeichnen','destacarse','','','v'],
  ['sich bedanken','agradecer','','','v'],['sich bemühen','esforzarse','','','v'],
  ['sich beschweren','quejarse','','','v'],['sich beteiligen','participar','','','v'],
  ['sich bewerben','solicitar','','','v'],['sich beziehen','referirse','','','v'],
  ['sich durchsetzen','imponerse','','','v'],['sich eignen','ser adecuado','','','v'],
  ['sich einschalten','intervenir','','','v'],['sich einsetzen','comprometerse','','','v'],
  ['sich entscheiden','decidirse','','','v'],['sich entschließen','decidirse','','','v'],
  ['sich entwickeln','desarrollarse','','','v'],['sich erholen','recuperarse','','','v'],
  ['sich erkälten','resfriarse','','','v'],['sich erkundigen','informarse','','','v'],
  ['sich ernähren','alimentarse','','','v'],['sich freuen','alegrarse','','','v'],
  ['sich fürchten','temer','','','v'],['sich gewöhnen','acostumbrarse','','','v'],
  ['sich irren','equivocarse','','','v'],['sich kümmern','ocuparse','','','v'],
  ['sich lohnen','valer la pena','','','v'],['sich melden','presentarse','','','v'],
  ['sich niederlassen','establecerse','','','v'],['sich outen','declararse','','','v'],
  ['sich rechtfertigen','justificarse','','','v'],['sich rühren','moverse','','','v'],
  ['sich schämen','avergonzarse','','','v'],['sich sehnen','anhelar','','','v'],
  ['sich sorgen','preocuparse','','','v'],['sich streiten','pelearse','','','v'],
  ['sich täuschen','engañarse','','','v'],['sich treffen','encontrarse','','','v'],
  ['sich umdrehen','darse la vuelta','','','v'],['sich umsehen','mirar alrededor','','','v'],
  ['sich unterhalten','conversar','','','v'],['sich verabreden','quedar','','','v'],
  ['sich verabschieden','despedirse','','','v'],['sich verändern','cambiarse','','','v'],
  ['sich verbessern','mejorar','','','v'],['sich verbünden','aliarse','','','v'],
  ['sich vergewissern','asegurarse','','','v'],['sich verhalten','comportarse','','','v'],
  ['sich verirren','perderse','','','v'],['sich verkleiden','disfrazarse','','','v'],
  ['sich verlieben','enamorarse','','','v'],['sich vermehren','multiplicarse','','','v'],
  ['sich vermuten','suponerse','','','v'],['sich versammeln','reunirse','','','v'],
  ['sich verschlechtern','empeorarse','','','v'],['sich verspäten','retrasarse','','','v'],
  ['sich verstecken','esconderse','','','v'],['sich vertragen','llevarse bien','','','v'],
  ['sich vertrauen','confiar','','','v'],['sich verwandeln','transformarse','','','v'],
  ['sich verzeihen','perdonarse','','','v'],['sich vorbereiten','prepararse','','','v'],
  ['sich vorstellen','imaginarse','','','v'],['sich wundern','sorprenderse','','','v'],
  ['sich zusammensetzen','reunirse','','','v'],['sich zurückziehen','retirarse','','','v'],
  // separable verbs
  ['abfahren','partir','','','v'],['abgeben','entregar','','','v'],
  ['ablehnen','rechazar','','','v'],['abnehmen','bajar','','','v'],
  ['abschließen','cerrar con llave','','','v'],['abschneiden','cortar','','','v'],
  ['abstellen','aparcar','','','v'],['anfangen','empezar','','','v'],
  ['ankommen','llegar','','','v'],['anmelden','registrar','','','v'],
  ['anrufen','llamar','','','v'],['anschauen','mirar','','','v'],
  ['anstellen','encender','','','v'],['anziehen','vestir','','','v'],
  ['aufbauen','construir','','','v'],['aufbewahren','guardar','','','v'],
  ['aufessen','comer todo','','','v'],['auffallen','llamar la atención','','','v'],
  ['aufführen','actuar','','','v'],['aufgeben','rendirse','','','v'],
  ['aufhalten','detener','','','v'],['aufhören','parar','','','v'],
  ['aufmachen','abrir','','','v'],['aufnehmen','grabar','','','v'],
  ['aufpassen','prestar atención','','','v'],['aufräumen','ordenar','','','v'],
  ['aufschreiben','apuntar','','','v'],['aufstehen','levantarse','','','v'],
  ['auftreten','aparecer','','','v'],['aufwachen','despertar','','','v'],
  ['aufwachsen','crecer','','','v'],['ausdrücken','expresar','','','v'],
  ['auseinandersetzen','analizar','','','v'],['ausfüllen','rellenar','','','v'],
  ['ausgehen','salir','','','v'],['aushalten','soportar','','','v'],
  ['auslachen','reírse de','','','v'],['ausmachen','apagar','','','v'],
  ['ausprobieren','probar','','','v'],['ausrechnen','calcular','','','v'],
  ['ausschalten','apagar','','','v'],['aussehen','parecer','','','v'],
  ['aussprechen','pronunciar','','','v'],['austauschen','intercambiar','','','v'],
  ['auswählen','seleccionar','','','v'],['ausziehen','desvestirse','','','v'],
  ['bekanntmachen','dar a conocer','','','v'],['beitragen','contribuir','','','v'],
  ['bekommen','recibir','','','v'],['bereitstellen','proveer','','','v'],
  ['beschleunigen','acelerar','','','v'],['beschränken','limitar','','','v'],
  ['bestehen','consistir','','','v'],['betragen','ascender a','','','v'],
  ['bevölkern','poblar','','','v'],['beweisen','probar','','','v'],
  ['beziehen','referir','','','v'],['durchführen','llevar a cabo','','','v'],
  ['durchsetzen','imponer','','','v'],['einatmen','inhalar','','','v'],
  ['einbringen','aportar','','','v'],['eindringen','penetrar','','','v'],
  ['einfallen','ocurrirse','','','v'],['einführen','introducir','','','v'],
  ['eingeben','introducir','','','v'],['eingreifen','intervenir','','','v'],
  ['einhalten','cumplir','','','v'],['einholen','alcanzar','','','v'],
  ['einigen','unir','','','v'],['einkaufen','comprar','','','v'],
  ['einladen','invitar','','','v'],['einlegen','insertar','','','v'],
  ['einnehmen','tomar','','','v'],['einrichten','instalar','','','v'],
  ['einschalten','encender','','','v'],['einschätzen','evaluar','','','v'],
  ['einschränken','restringir','','','v'],['einsetzen','insertar','','','v'],
  ['einsteigen','subir','','','v'],['einstellen','ajustar','','','v'],
  ['einteilen','dividir','','','v'],['eintragen','registrar','','','v'],
  ['einwerfen','echar','','','v'],['einziehen','mudarse','','','v'],
  ['entgegenkommen','salir al encuentro','','','v'],['entgegensetzen','oponer','','','v'],
  ['entgegenwirken','contrarrestar','','','v'],['entlassen','despedir','','','v'],
  ['entstehen','surgir','','','v'],['entwickeln','desarrollar','','','v'],
  ['erhalten','recibir','','','v'],['erkennen','reconocer','','','v'],
  ['erklären','explicar','','','v'],['erlauben','permitir','','','v'],
  ['ernähren','alimentar','','','v'],['erreichen','alcanzar','','','v'],
  ['erschrecken','asustar','','','v'],['ersetzen','reemplazar','','','v'],
  ['erwarten','esperar','','','v'],['erziehen','educar','','','v'],
  ['festhalten','sujetar','','','v'],['festlegen','determinar','','','v'],
  ['feststellen','constatar','','','v'],['fortsetzen','continuar','','','v'],
  ['freigeben','liberar','','','v'],['freiwillig','voluntario','','','adv'],
  ['führen','guiar','','','v'],['gehören','pertenecer','','','v'],
  ['gelten','valer','','','v'],['gleichstellen','equiparar','','','v'],
  ['gleichziehen','empatar','','','v'],['großschreiben','escribir con mayúscula','','','v'],
  ['grundlegen','fundamentar','','','v'],['gutheißen','aprobar','','','v'],
  ['haltmachen','detenerse','','','v'],['handhaben','manejar','','','v'],
  ['heimbringen','llevar a casa','','','v'],['herankommen','acercarse','','','v'],
  ['herausfinden','descubrir','','','v'],['herausfordern','desafiar','','','v'],
  ['herausgeben','publicar','','','v'],['herausnehmen','sacar','','','v'],
  ['herausstellen','resultar','','','v'],['herbeiführen','provocar','','','v'],
  ['hereinkommen','entrar','','','v'],['herstellen','fabricar','','','v'],
  ['herüberkommen','venir','','','v'],['hervorbringen','producir','','','v'],
  ['hervorheben','destacar','','','v'],['hervorrufen','provocar','','','v'],
  ['hinausgehen','salir','','','v'],['hinfahren','ir','','','v'],
  ['hingehen','ir','','','v'],['hinterlassen','dejar','','','v'],
  ['hinterziehen','evadir','','','v'],['hinweisen','señalar','','','v'],
  ['hinzufügen','añadir','','','v'],['hochheben','levantar','','','v'],
  ['hochnehmen','levantar','','','v'],['klarkommen','arreglárselas','','','v'],
  ['kleinschreiben','escribir con minúscula','','','v'],['krankschreiben','dar baja','','','v'],
  ['kürzertreten','aflojar','','','v'],['langgehen','ir por','','','v'],
  ['langlaufen','esquiar de fondo','','','v'],['losfahren','partir','','','v'],
  ['losgehen','empezar','','','v'],['loslassen','soltar','','','v'],
  ['loswerden','deshacerse','','','v'],['mitarbeiten','colaborar','','','v'],
  ['mitbekommen','entender','','','v'],['mitbringen','traer','','','v'],
  ['mitfahren','viajar con','','','v'],['mitgeben','dar','','','v'],
  ['mitkommen','venir con','','','v'],['mitmachen','participar','','','v'],
  ['mitnehmen','llevar','','','v'],['mitspielen','jugar con','','','v'],
  ['mitteilen','comunicar','','','v'],['nachdenken','reflexionar','','','v'],
  ['nachfragen','preguntar','','','v'],['nachgehen','seguir','','','v'],
  ['nachholen','recuperar','','','v'],['nachkommen','seguir','','','v'],
  ['nachlassen','disminuir','','','v'],['nachschlagen','consultar','','','v'],
  ['nachsehen','revisar','','','v'],['nachweisen','demostrar','','','v'],
  ['näherbringen','acercar','','','v'],['nähern','acercarse','','','v'],
  ['niederlegen','deponer','','','v'],['niederschlagen','derribar','','','v'],
  ['niederschreiben','escribir','','','v'],['niedersetzen','sentar','','','v'],
  ['umarmen','abrazar','','','v'],['umbauen','reformar','','','v'],
  ['umblättern','pasar página','','','v'],['umdrehen','dar la vuelta','','','v'],
  ['umfallen','caerse','','','v'],['umfassen','abarcar','','','v'],
  ['umgehen','evitar','','','v'],['umkehren','dar la vuelta','','','v'],
  ['umkommen','morir','','','v'],['umrechnen','convertir','','','v'],
  ['umschalten','cambiar','','','v'],['umschauen','mirar','','','v'],
  ['umsehen','mirar alrededor','','','v'],['umsetzen','implementar','','','v'],
  ['umsteigen','transbordar','','','v'],['umstellen','reorganizar','','','v'],
  ['umtauschen','intercambiar','','','v'],['umwandeln','transformar','','','v'],
  ['umziehen','mudarse','','','v'],['verabschieden','despedir','','','v'],
  ['verallgemeinern','generalizar','','','v'],['verändern','cambiar','','','v'],
  ['veranstalten','organizar','','','v'],['verbessern','mejorar','','','v'],
  ['verbinden','conectar','','','v'],['verbringen','pasar','','','v'],
  ['verdienen','ganar','','','v'],['vereinbaren','acordar','','','v'],
  ['verfolgen','perseguir','','','v'],['verfügen','disponer','','','v'],
  ['vergleichen','comparar','','','v'],['verhandeln','negociar','','','v'],
  ['verkürzen','acortar','','','v'],['verlangen','exigir','','','v'],
  ['verlängern','alargar','','','v'],['verlassen','abandonar','','','v'],
  ['verlegen','trasladar','','','v'],['verletzen','lesionar','','','v'],
  ['vermeiden','evitar','','','v'],['vermuten','suponer','','','v'],
  ['vernachlässigen','descuidar','','','v'],['veröffentlichen','publicar','','','v'],
  ['verpassen','perder','','','v'],['verraten','traicionar','','','v'],
  ['versammeln','reunir','','','v'],['verschieben','aplazar','','','v'],
  ['verschlechtern','empeorar','','','v'],['verschwinden','desaparecer','','','v'],
  ['versichern','asegurar','','','v'],['versorgen','abastecer','','','v'],
  ['verstärken','reforzar','','','v'],['verstehen','entender','','','v'],
  ['verstopfen','obstruir','','','v'],['versuchen','intentar','','','v'],
  ['verteidigen','defender','','','v'],['verteilen','distribuir','','','v'],
  ['vertreten','representar','','','v'],['verwalten','administrar','','','v'],
  ['verwechseln','confundir','','','v'],['verweigern','negar','','','v'],
  ['verwenden','utilizar','','','v'],['verwirren','confundir','','','v'],
  ['verzichten','renunciar','','','v'],['verzögern','retrasar','','','v'],
  ['vollenden','completar','','','v'],['vorausgehen','preceder','','','v'],
  ['voraussagen','predecir','','','v'],['vorbeigehen','pasar','','','v'],
  ['vorbereiten','preparar','','','v'],['vorgehen','proceder','','','v'],
  ['vorhaben','planear','','','v'],['vorhersagen','pronosticar','','','v'],
  ['vorkommen','ocurrir','','','v'],['vorlegen','presentar','','','v'],
  ['vorlesen','leer en voz alta','','','v'],['vormerken','reservar','','','v'],
  ['vornehmen','realizar','','','v'],['vorrücken','avanzar','','','v'],
  ['vorschlagen','proponer','','','v'],['vorschreiben','prescribir','','','v'],
  ['vorsehen','prever','','','v'],['vorsingen','cantar','','','v'],
  ['vorsorgen','prevenir','','','v'],['vorstellen','presentar','','','v'],
  ['vortragen','presentar','','','v'],['vorwerfen','acusar','','','v'],
  ['vorzeigen','mostrar','','','v'],['vorziehen','preferir','','','v'],
  ['wegfahren','irse en vehículo','','','v'],['weggehen','irse','','','v'],
  ['weglassen','omitir','','','v'],['wegnehmen','quitar','','','v'],
  ['weiterarbeiten','seguir trabajando','','','v'],['weiterbilden','seguir formándose','','','v'],
  ['weiterentwickeln','seguir desarrollando','','','v'],['weiterführen','continuar','','','v'],
  ['weitergeben','transmitir','','','v'],['weitermachen','continuar','','','v'],
  ['weiterreichen','pasar','','','v'],['weitersagen','decir a otros','','','v'],
  ['wiedererkennen','reconocer','','','v'],['wiederfinden','reencontrar','','','v'],
  ['wiederherstellen','restaurar','','','v'],['wiederholen','repetir','','','v'],
  ['wiederkommen','volver','','','v'],['wiedersehen','volver a ver','','','v'],
  ['zuhören','escuchar','','','v'],['zumachen','cerrar','','','v'],
  ['zunehmen','aumentar','','','v'],['zurechtkommen','arreglárselas','','','v'],
  ['zurückfahren','volver','','','v'],['zurückgeben','devolver','','','v'],
  ['zurückgehen','retroceder','','','v'],['zurückhalten','retener','','','v'],
  ['zurückkehren','regresar','','','v'],['zurückkommen','volver','','','v'],
  ['zurücklassen','dejar atrás','','','v'],['zurücklegen','guardar','','','v'],
  ['zurücknehmen','retirar','','','v'],['zurückschicken','devolver','','','v'],
  ['zurücktreten','renunciar','','','v'],['zurückziehen','retirar','','','v'],
  ['zusammenarbeiten','colaborar','','','v'],['zusammenbrechen','derrumbarse','','','v'],
  ['zusammenbringen','reunir','','','v'],['zusammenfassen','resumir','','','v'],
  ['zusammenfinden','encontrarse','','','v'],['zusammenfügen','unir','','','v'],
  ['zusammengehen','unirse','','','v'],['zusammenhalten','mantener unido','','','v'],
  ['zusammenhängen','relacionarse','','','v'],['zusammenkommen','reunirse','','','v'],
  ['zusammensetzen','componer','','','v'],['zusammenstellen','compilar','','','v'],
  ['zusammenwirken','cooperar','','','v'],['zusammenziehen','contraer','','','v'],
];

// B1 connectors / adverbs
var b1Connectors = [
  ['allerdings','sin embargo','','','adv'],['andererseits','por otro lado','','','adv'],
  ['außerdem','además','','','adv'],['beispielsweise','por ejemplo','','','adv'],
  ['dagegen','en cambio','','','adv'],['daher','por lo tanto','','','adv'],
  ['damit','para que','','','conj'],['danach','después','','','adv'],
  ['darauf','sobre eso','','','adv'],['darum','por eso','','','adv'],
  ['darüber','al respecto','','','adv'],['darunter','entre ellos','','','adv'],
  ['davon','de eso','','','adv'],['dazu','además','','','adv'],
  ['dennoch','sin embargo','','','adv'],['deshalb','por eso','','','adv'],
  ['deswegen','por eso','','','adv'],['dementsprechend','en consecuencia','','','adv'],
  ['demgegenüber','en contraste','','','adv'],['demgemäß','conforme a','','','adv'],
  ['demzufolge','por consiguiente','','','adv'],['dessen ungeachtet','no obstante','','','adv'],
  ['diesbezüglich','al respecto','','','adv'],['durchaus','completamente','','','adv'],
  ['ebenfalls','igualmente','','','adv'],['eigentlich','en realidad','','','adv'],
  ['einerseits','por un lado','','','adv'],['endlich','finalmente','','','adv'],
  ['folglich','por consiguiente','','','adv'],['gegebenenfalls','en su caso','','','adv'],
  ['gelegentlich','ocasionalmente','','','adv'],['geradezu','sencillamente','','','adv'],
  ['gleichfalls','igualmente','','','adv'],['gleichwohl','no obstante','','','adv'],
  ['hingegen','en cambio','','','adv'],['infolgedessen','como resultado','','','adv'],
  ['insofern','en tanto','','','adv'],['insoweit','en la medida','','','adv'],
  ['jedenfalls','en todo caso','','','adv'],['jedoch','sin embargo','','','adv'],
  ['mithin','por lo tanto','','','adv'],['namentlich','es decir','','','adv'],
  ['nichtsdestoweniger','no obstante','','','adv'],['notfalls','en caso necesario','','','adv'],
  ['nunmehr','ahora','','','adv'],['obendrein','además','','','adv'],
  ['ohnehin','de todos modos','','','adv'],['ohnedies','de todas formas','','','adv'],
  ['schließlich','finalmente','','','adv'],['sodann','luego','','','adv'],
  ['somit','por lo tanto','','','adv'],['trotzdem','a pesar de eso','','','adv'],
  ['überdies','además','','','adv'],['übrigens','por cierto','','','adv'],
  ['ungeachtet','no obstante','','','adv'],['unterdessen','mientras tanto','','','adv'],
  ['vermutlich','probablemente','','','adv'],['vielmehr','más bien','','','adv'],
  ['vor allem','sobre todo','','','adv'],['vorderhand','por ahora','','','adv'],
  ['vorläufig','provisionalmente','','','adv'],['weiterhin','además','','','adv'],
  ['wenigstens','al menos','','','adv'],['wiederum','a su vez','','','adv'],
  ['womöglich','posiblemente','','','adv'],['zudem','además','','','adv'],
  ['zunächst','primero','','','adv'],['zumal','máxime','','','adv'],
  ['zusätzlich','adicionalmente','','','adv'],['zutreffend','pertinente','','','adj'],
  ['zwar','ciertamente','','','adv'],['zwischendurch','de vez en cuando','','','adv'],
];

// Format helpers
function fmtN(arr) {
  var article = arr[0].match(/^(der|die|das)/);
  if (article) {
    var word = arr[0].replace(/^(der |die |das )/, '');
    return "  ['" + word + "','" + arr[1] + "','" + article[0] + "','" + (arr[2]||'') + "','n']";
  }
  // Check if it's a 4-element array (adjective type)
  if (arr.length >= 4 && arr[3] !== undefined) {
    var type = arr[3] || 'n';
    return "  ['" + arr[0] + "','" + arr[1] + "','','','" + type + "']";
  }
  return "  ['" + arr[0] + "','" + arr[1] + "','','','n']";
}

function fmtV(arr) {
  return "  ['" + arr[0] + "','" + arr[1] + "','','','v']";
}
function fmtAdv(arr) {
  return "  ['" + arr[0] + "','" + arr[1] + "','','','" + (arr[4]||'adv') + "']";
}

// ===== DISTRIBUTION PLAN =====
// A2.3 (needs ~109): 110 A2 nouns/verbs
// A2.4 (needs ~161): 90 A2 vocab + 70 connector words  
// B1.2 (needs ~106): 60 abstract + 50 verbs
// B1.3 (needs ~254): 120 abstract + 80 verbs + 54 connectors
// B1.4 (needs ~248): 100 abstract + 100 verbs + 48 connectors
// B2.4 (needs ~58): 60 verbs

var byLevel = {};
for (var k of ['A2.3','A2.4','B1.2','B1.3','B1.4','B2.4']) byLevel[k] = [];

// A2.3: first 110 from b1Abstract (simpler ones sorted into A2)
var a2count = 0;
b1AbstractNouns.forEach(function(w) {
  if (a2count >= 110) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) { byLevel['A2.3'].push(fmtN(w)); a2count++; }
});

// A2.4: next 90 abstract + first 50 b1Connectors 
var a4count = 0;
b1AbstractNouns.forEach(function(w, i) {
  if (i < 110) return; // skip first 110 given to A2.3
  if (a4count >= 90) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) { byLevel['A2.4'].push(fmtN(w)); a4count++; }
});
var connCount = 0;
b1Connectors.forEach(function(w) {
  if (connCount >= 70) return;
  if (isNew(w[0])) { byLevel['A2.4'].push(fmtAdv(w)); connCount++; }
});

// B1.2: 60 more nouns + 50 verbs
var b12n = 0;
b1AbstractNouns.forEach(function(w, i) {
  if (i < 200) return;
  if (b12n >= 60) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) { byLevel['B1.2'].push(fmtN(w)); b12n++; }
});
var b12v = 0;
moreB1Verbs2.forEach(function(w) {
  if (b12v >= 50) return;
  if (isNew(w[0])) { byLevel['B1.2'].push(fmtV(w)); b12v++; }
});

// B1.3: 120 more nouns + 80 more verbs + 54 connectors
var b13n = 0;
b1AbstractNouns.forEach(function(w, i) {
  if (i < 260) return;
  if (b13n >= 120) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) { byLevel['B1.3'].push(fmtN(w)); b13n++; }
});
var b13v = 0;
moreB1Verbs2.forEach(function(w, i) {
  if (i < 50) return;
  if (b13v >= 80) return;
  if (isNew(w[0])) { byLevel['B1.3'].push(fmtV(w)); b13v++; }
});
var b13c = 0;
b1Connectors.forEach(function(w, i) {
  if (i < 70) return;
  if (b13c >= 54) return;
  if (isNew(w[0])) { byLevel['B1.3'].push(fmtAdv(w)); b13c++; }
});

// B1.4: 100 more nouns + 100 more verbs + 48 connectors
var b14n = 0;
b1AbstractNouns.forEach(function(w, i) {
  if (i < 380) return;
  if (b14n >= 100) return;
  var de = w[0].replace(/^(der |die |das )/, '').trim();
  if (isNew(de)) { byLevel['B1.4'].push(fmtN(w)); b14n++; }
});
var b14v = 0;
moreB1Verbs2.forEach(function(w, i) {
  if (i < 130) return;
  if (b14v >= 100) return;
  if (isNew(w[0])) { byLevel['B1.4'].push(fmtV(w)); b14v++; }
});
var b14c = 0;
b1Connectors.forEach(function(w, i) {
  if (i < 124) return;
  if (b14c >= 48) return;
  if (isNew(w[0])) { byLevel['B1.4'].push(fmtAdv(w)); b14c++; }
});

// B2.4: 60 verbs
var b24v = 0;
moreB1Verbs2.forEach(function(w, i) {
  if (i < 230) return;
  if (b24v >= 60) return;
  if (isNew(w[0])) { byLevel['B2.4'].push(fmtV(w)); b24v++; }
});

// Summary
console.log('\n=== INJECTION PLAN ===');
var total = 0;
for (var lv in byLevel) {
  console.log(lv + ': ' + byLevel[lv].length + ' new words');
  total += byLevel[lv].length;
}
console.log('Total: ' + total);

// Apply to file
var modified = c;
for (var lv in byLevel) {
  var words = byLevel[lv];
  if (!words || words.length === 0) continue;

  // Find addLevel call
  var s = modified.indexOf("addLevel('" + lv + "'");
  if (s === -1) { console.log(lv + ' NOT FOUND'); continue; }

  // Find end of array
  var e = modified.indexOf(']);', s);
  if (e === -1) continue;

  var prefix = modified.substring(0, e + 2);
  var suffix = modified.substring(e + 2);
  modified = prefix + ',\n' + words.join(',\n') + suffix;
  console.log('✅ Injected ' + words.length + ' into ' + lv);
}

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log('\n✅ DONE');