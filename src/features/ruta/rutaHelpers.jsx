// ═══════════════════════════════════════════════════════════════════════════
// RUTA HELPERS – Vocabulario masivo CEFR A1→C1 + SRS SM-2 + 8 generadores
// ═══════════════════════════════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Ruta = window.Muller.Ruta || {};
(function (R) {
// ===========================================================
// 1. VOCABULARIO COMPACTO [de, es, art, plural, tipo, genero?]
// tipo: n=sust, v=verbo, adj=adj, adv=adv, prep=prep, conj=conj, pron=pron
// ===========================================================
R.VOCAB = {};
function addLevel(id, words) { R.VOCAB[id] = words; }

// ── A1.1 (60 palabras) ──
addLevel('A1.1',[
['Haus','casa','das','Häuser','n'],['Mann','hombre','der','Männer','n'],
['Frau','mujer','die','Frauen','n'],['Kind','niño','das','Kinder','n'],
['Tisch','mesa','der','Tische','n'],['Buch','libro','das','Bücher','n'],
['Katze','gato','die','Katzen','n'],['Hund','perro','der','Hunde','n'],
['Wasser','agua','das','','n'],['Brot','pan','das','Brote','n'],
['Name','nombre','der','Namen','n'],['Tag','día','der','Tage','n'],
['Nacht','noche','die','Nächte','n'],['Woche','semana','die','Wochen','n'],
['Jahr','año','das','Jahre','n'],['Mutter','madre','die','Mütter','n'],
['Vater','padre','der','Väter','n'],['Schwester','hermana','die','Schwestern','n'],
['Bruder','hermano','der','Brüder','n'],['Mädchen','chica','das','Mädchen','n'],
['Junge','chico','der','Jungen','n'],['Tür','puerta','die','Türen','n'],
['Fenster','ventana','das','Fenster','n'],['Stuhl','silla','der','Stühle','n'],
['Bett','cama','das','Betten','n'],['Lampe','lámpara','die','Lampen','n'],
['Küche','cocina','die','Küchen','n'],['Schule','escuela','die','Schulen','n'],
['Lehrer','profesor','der','Lehrer','n'],['Schüler','alumno','der','Schüler','n'],
['Ball','pelota','der','Bälle','n'],['Spiel','juego','das','Spiele','n'],
['Lied','canción','das','Lieder','n'],['Milch','leche','die','','n'],
['Kaffee','café','der','Kaffees','n'],['Tee','té','der','Tees','n'],
['Apfel','manzana','der','Äpfel','n'],['Bier','cerveza','das','Biere','n'],
['Fleisch','carne','das','','n'],['Fisch','pescado','der','Fische','n'],
['groß','grande','','','adj'],['klein','pequeño','','','adj'],
['gut','bueno','','','adj'],['schlecht','malo','','','adj'],
['schön','bonito','','','adj'],['neu','nuevo','','','adj'],
['alt','viejo','','','adj'],['warm','caliente','','','adj'],
['kalt','frío','','','adj'],['heiß','caluroso','','','adj'],
['schnell','rápido','','','adv'],['langsam','lento','','','adv'],
['sehr','muy','','','adv'],['viel','mucho','','','adv'],
['wenig','poco','','','adv'],['ja','sí','','','adv'],
['nein','no','','','adv'],['bitte','por favor','','','adv'],
['danke','gracias','','','adv'],['hallo','hola','','','adv'],
['tschüss','adiós','','','adv'],['und','y','','','conj'],
['oder','o','','','conj'],['aber','pero','','','conj'],
['sein','ser/estar','','','v'],['haben','haber/tener','','','v'],
['werden','volverse','','','v'],['können','poder','','','v'],
['müssen','deber','','','v'],['wollen','querer','','','v'],
['sagen','decir','','','v'],['machen','hacer','','','v'],
['gehen','ir','','','v'],['kommen','venir','','','v'],
['sehen','ver','','','v'],['hören','oír','','','v'],
['essen','comer','','','v'],['trinken','beber','','','v'],
['lesen','leer','','','v'],['schreiben','escribir','','','v'],
['sprechen','hablar','','','v'],['lernen','aprender','','','v'],
['wohnen','vivir','','','v'],['arbeiten','trabajar','','','v'],
['spielen','jugar','','','v'],['sitzen','estar sentado','','','v'],
['liegen','yacer','','','v'],['stellen','colocar','','','v'],
['legen','poner horizontal','','','v'],['geben','dar','','','v'],
['nehmen','tomar','','','v'],['finden','encontrar','','','v'],
['bleiben','quedarse','','','v'],['heißen','llamarse','','','v'],
['wo','dónde','','','adv'],['was','qué','','','adv'],
['wer','quién','','','pron'],['wie','cómo','','','adv'],
['warum','por qué','','','adv'],['vorne','delante','','','adv'],
['hinten','detrás','','','adv'],['oben','arriba','','','adv'],
['unten','abajo','','','adv'],['links','izquierda','','','adv'],
['rechts','derecha','','','adv'],['hier','aquí','','','adv'],
['dort','allí','','','adv'],['jetzt','ahora','','','adv'],
['später','después','','','adv'],['heute','hoy','','','adv'],
['morgen','mañana','','','adv'],['gestern','ayer','','','adv'],
['eins','uno','','','num'],['zwei','dos','','','num'],
['drei','tres','','','num'],['vier','cuatro','','','num'],
['fünf','cinco','','','num'],['sechs','seis','','','num'],
['sieben','siete','','','num'],['acht','ocho','','','num'],
['neun','nueve','','','num'],['zehn','diez','','','num']
]);

// ── A1.2 (70 palabras) ──
addLevel('A1.2',[
['Familie','familia','die','Familien','n'],['Freund','amigo','der','Freunde','n'],
['Freundin','amiga','die','Freundinnen','n'],['Stadt','ciudad','die','Städte','n'],
['Land','país','das','Länder','n'],['Straße','calle','die','Straßen','n'],
['Platz','plaza','der','Plätze','n'],['Zug','tren','der','Züge','n'],
['Bus','autobús','der','Busse','n'],['Auto','coche','das','Autos','n'],
['Fahrrad','bicicleta','das','Fahrräder','n'],['Flugzeug','avión','das','Flugzeuge','n'],
['Bahnhof','estación','der','Bahnhöfe','n'],['Flughafen','aeropuerto','der','Flughäfen','n'],
['Geld','dinero','das','','n'],['Preis','precio','der','Preise','n'],
['Karte','tarjeta/mapa','die','Karten','n'],['Fahrkarte','billete','die','Fahrkarten','n'],
['Sprache','idioma','die','Sprachen','n'],['Wort','palabra','das','Wörter','n'],
['Satz','oración','der','Sätze','n'],['Frage','pregunta','die','Fragen','n'],
['Antwort','respuesta','die','Antworten','n'],['Uhr','reloj/hora','die','Uhren','n'],
['Stunde','hora','die','Stunden','n'],['Minute','minuto','die','Minuten','n'],
['Montag','lunes','der','Montage','n'],['Dienstag','martes','der','Dienstage','n'],
['Mittwoch','miércoles','der','Mittwoche','n'],['Donnerstag','jueves','der','Donnerstage','n'],
['Freitag','viernes','der','Freitage','n'],['Samstag','sábado','der','Samstage','n'],
['Sonntag','domingo','der','Sonntage','n'],['Wochenende','finde semana','das','Wochenenden','n'],
['Morgen','mañana','der','Morgen','n'],['Mittag','mediodía','der','Mittage','n'],
['Abend','tarde','der','Abende','n'],['Frühling','primavera','der','Frühlinge','n'],
['Sommer','verano','der','Sommer','n'],['Herbst','otoño','der','Herbste','n'],
['Winter','invierno','der','Winter','n'],['Sonne','sol','die','Sonnen','n'],
['Mond','luna','der','Monde','n'],['Regen','lluvia','der','','n'],
['Schnee','nieve','der','','n'],['Wind','viento','der','Winde','n'],
['Wetter','clima','das','','n'],['Zimmer','habitación','das','Zimmer','n'],
['Wohnung','apartamento','die','Wohnungen','n'],['Garten','jardín','der','Gärten','n'],
['Keller','sótano','der','Keller','n'],['Dach','tejado','das','Dächer','n'],
['Wand','pared','die','Wände','n'],['Boden','suelo','der','Böden','n'],
['Treppe','escalera','die','Treppen','n'],['Kleid','vestido','das','Kleider','n'],
['Hose','pantalón','die','Hosen','n'],['Schuh','zapato','der','Schuhe','n'],
['Mütze','gorro','die','Mützen','n'],['Rock','falda','der','Röcke','n'],
['groß','grande','','','adj'],['klein','pequeño','','','adj'],
['lang','largo','','','adj'],['kurz','corto','','','adj'],
['dick','grueso/gordo','','','adj'],['dünn','delgado','','','adj'],
['schwer','pesado/difícil','','','adj'],['leicht','ligero/fácil','','','adj'],
['teuer','caro','','','adj'],['billig','barato','','','adj'],
['jung','joven','','','adj'],['fleißig','trabajador','','','adj'],
['müde','cansado','','','adj'],['krank','enfermo','','','adj'],
['gesund','sano','','','adj'],['froh','contento','','','adj'],
['traurig','triste','','','adj'],['freundlich','amable','','','adj'],
['wichtig','importante','','','adj'],['richtig','correcto','','','adj'],
['einfach','sencillo','','','adj'],['schwierig','difícil','','','adj']
]);

// ── A1.3 (60 palabras) ──
addLevel('A1.3',[
['Kopf','cabeza','der','Köpfe','n'],['Hand','mano','die','Hände','n'],
['Fuß','pie','der','Füße','n'],['Arm','brazo','der','Arme','n'],
['Bein','pierna','das','Beine','n'],['Auge','ojo','das','Augen','n'],
['Ohr','oreja','das','Ohren','n'],['Mund','boca','der','Münder','n'],
['Nase','nariz','die','Nasen','n'],['Haar','pelo','das','Haare','n'],
['Arzt','médico','der','Ärzte','n'],['Krankenhaus','hospital','das','Krankenhäuser','n'],
['Schmerz','dolor','der','Schmerzen','n'],['Fieber','fiebre','das','','n'],
['Apotheke','farmacia','die','Apotheken','n'],['Medikament','medicamento','das','Medikamente','n'],
['Geschäft','tienda','das','Geschäfte','n'],['Markt','mercado','der','Märkte','n'],
['Supermarkt','supermercado','der','Supermärkte','n'],['Bäcker','panadería','der','Bäcker','n'],
['Fleischer','carnicería','der','Fleischer','n'],['Restaurant','restaurante','das','Restaurants','n'],
['Café','cafetería','das','Cafés','n'],['Kino','cine','das','Kinos','n'],
['Theater','teatro','das','Theater','n'],['Museum','museo','das','Museen','n'],
['Park','parque','der','Parks','n'],['Strand','playa','der','Strände','n'],
['Fluss','río','der','Flüsse','n'],['See','lago','der','Seen','n'],
['Berg','montaña','der','Berge','n'],['Wald','bosque','der','Wälder','n'],
['Brief','carta','der','Briefe','n'],['Paket','paquete','das','Pakete','n'],
['Post','correo','die','','n'],['Telefon','teléfono','das','Telefone','n'],
['Computer','ordenador','der','Computer','n'],['Fernseher','televisor','der','Fernseher','n'],
['Zeitung','periódico','die','Zeitungen','n'],['Zeitschrift','revista','die','Zeitschriften','n'],
['arbeiten','trabajar','','','v'],['kochen','cocinar','','','v'],
['putzen','limpiar','','','v'],['waschen','lavar','','','v'],
['schlafen','dormir','','','v'],['aufstehen','levantarse','','','v'],
['einkaufen','comprar','','','v'],['bezahlen','pagar','','','v'],
['bestellen','pedir','','','v'],['schenken','regular','','','v'],
['reisen','viajar','','','v'],['wandern','senderismo','','','v'],
['schwimmen','nadar','','','v'],['spazieren','pasear','','','v'],
['tanzen','bailar','','','v'],['singen','cantar','','','v'],
['malen','pintar','','','v'],['zeigen','mostrar','','','v'],
['brauchen','necesitar','','','v'],['kaufen','comprar','','','v'],
['verkaufen','vender','','','v'],['öffnen','abrir','','','v'],
['schließen','cerrar','','','v'],['anfangen','empezar','','','v'],
['aufhören','parar','','','v'],['warten','esperar','','','v'],
['holen','ir a buscar','','','v'],['bringen','traer','','','v'],
['tragen','llevar puesto','','','v'],['passen','quedar bien','','','v']
]);

// ── A1.4 (60 palabras) ──
addLevel('A1.4',[
['Frühstück','desayuno','das','Frühstücke','n'],['Mittagessen','comida','das','Mittagessen','n'],
['Abendessen','cena','das','Abendessen','n'],['Suppe','sopa','die','Suppen','n'],
['Salat','ensalada','der','Salate','n'],['Obst','fruta','das','','n'],
['Gemüse','verdura','das','Gemüse','n'],['Kuchen','pastel','der','Kuchen','n'],
['Ei','huevo','das','Eier','n'],['Käse','queso','der','Käse','n'],
['Butter','mantequilla','die','','n'],['Wurst','embutido','die','Würste','n'],
['Zucker','azúcar','der','','n'],['Salz','sal','das','','n'],
['Pfeffer','pimienta','der','','n'],['Essig','vinagre','der','Essige','n'],
['Öl','aceite','das','Öle','n'],['Reis','arroz','der','','n'],
['Nudeln','pasta','die','','n'],['Kartoffel','patata','die','Kartoffeln','n'],
['Tomate','tomate','die','Tomaten','n'],['Gurke','pepino','die','Gurken','n'],
['Karotte','zanahoria','die','Karotten','n'],['Zwiebel','cebolla','die','Zwiebeln','n'],
['Knoblauch','ajo','der','','n'],['Pilz','champiñón','der','Pilze','n'],
['Flasche','botella','die','Flaschen','n'],['Tasse','taza','die','Tassen','n'],
['Glas','vaso','das','Gläser','n'],['Teller','plato','der','Teller','n'],
['Löffel','cuchara','der','Löffel','n'],['Messer','cuchillo','das','Messer','n'],
['Gabel','tenedor','die','Gabeln','n'],['Tasse','taza','die','Tassen','n'],
['Topf','olla','der','Töpfe','n'],['Pfanne','sartén','die','Pfannen','n'],
['Gast','invitado','der','Gäste','n'],['Einladung','invitación','die','Einladungen','n'],
['Termin','cita','der','Termine','n'],['Besuch','visita','der','Besuche','n'],
['feiern','celebrar','','','v'],['backen','hornear','','','v'],
['grillen','hacer barbacoa','','','v'],['probieren','probar','','','v'],
['schmecken','saber a','','','v'],['einladen','invitar','','','v'],
['überraschen','sorprender','','','v'],['vorbereiten','preparar','','','v'],
['decken','poner la mesa','','','v'],['abwaschen','fregar','','','v'],
['aufräumen','ordenar','','','v'],['bügeln','planchar','','','v'],
['nähen','coser','','','v'],['reparieren','reparar','','','v'],
['kaputt','roto','','','adj'],['fertig','listo','','','adj'],
['leer','vacío','','','adj'],['voll','lleno','','','adj'],
['sauber','limpio','','','adj'],['schmutzig','sucio','','','adj'],
['tief','profundo','','','adj'],['flach','llano','','','adj'],
['breit','ancho','','','adj'],['eng','estrecho','','','adj']
]);

// ── A2.1 (70 palabras) ──
addLevel('A2.1',[
['Beruf','profesión','der','Berufe','n'],['Angestellte','empleado','der','Angestellten','n'],
['Chef','jefe','der','Chefs','n'],['Kollege','compañero','der','Kollegen','n'],
['Firma','empresa','die','Firmen','n'],['Büro','oficina','das','Büros','n'],
['Besprechung','reunión','die','Besprechungen','n'],['Geschäftsreise','viaje negocios','die','Geschäftsreisen','n'],
['Gehalt','salario','das','Gehälter','n'],['Urlaub','vacaciones','der','Urlaube','n'],
['Reise','viaje','die','Reisen','n'],['Hotel','hotel','das','Hotels','n'],
['Zimmer','habitación','das','Zimmer','n'],['Reservierung','reserva','die','Reservierungen','n'],
['Reisepass','pasaporte','der','Reisepässe','n'],['Ausweis','carnet','der','Ausweise','n'],
['Gepäck','equipaje','das','','n'],['Koffer','maleta','der','Koffer','n'],
['Bank','banco','die','Banken','n'],['Konto','cuenta','das','Konten','n'],
['Bargeld','efectivo','das','','n'],['Kreditkarte','tarjeta crédito','die','Kreditkarten','n'],
['Quittung','recibo','die','Quittungen','n'],['Rechnung','factura','die','Rechnungen','n'],
['Trinkgeld','propina','das','Trinkgelder','n'],['Schloss','castillo','das','Schlösser','n'],
['Kirche','iglesia','die','Kirchen','n'],['Brücke','puente','die','Brücken','n'],
['Turm','torre','der','Türme','n'],['Mauer','muro','die','Mauern','n'],
['Ort','lugar','der','Orte','n'],['Weg','camino','der','Wege','n'],
['Ecke','esquina','die','Ecken','n'],['Kreuzung','cruce','die','Kreuzungen','n'],
['Ampel','semáforo','die','Ampeln','n'],['Haltestelle','parada','die','Haltestellen','n'],
['Führerschein','carnet conducir','der','Führerscheine','n'],['Tankstelle','gasolinera','die','Tankstellen','n'],
['Fahren','conducir','das','','n'],['Parkplatz','aparcamiento','der','Parkplätze','n'],
['Unfall','accidente','der','Unfälle','n'],['Verkehr','tráfico','der','','n'],
['Ankunft','llegada','die','Ankünfte','n'],['Abfahrt','salida','die','Abfahrten','n'],
['Verspätung','retraso','die','Verspätungen','n'],['Gleis','andén','das','Gleise','n'],
['fahren','conducir/ir','','','v'],['fliegen','volar','','','v'],
['einsteigen','subir','','','v'],['aussteigen','bajar','','','v'],
['umsteigen','transbordar','','','v'],['abfahren','salir','','','v'],
['ankommen','llegar','','','v'],['abholen','recoger','','','v'],
['einpacken','empacar','','','v'],['auspacken','desempacar','','','v'],
['reservieren','reservar','','','v'],['buchen','reservar','','','v'],
['stornieren','cancelar','','','v'],['mieten','alquilar','','','v'],
['vermieten','alquilar','','','v'],['wechseln','cambiar','','','v'],
['pünktlich','puntual','','','adv'],['spät','tarde','','','adv'],
['früh','temprano','','','adv'],['direkt','directo','','','adv'],
['endlich','finalmente','','','adv'],['unterwegs','de camino','','','adv'],
['überall','en todas partes','','','adv'],['nirgends','en ninguna parte','','','adv'],
['irgendwo','en algún lugar','','','adv'],['zusammen','juntos','','','adv']
]);

// ── A2.2 (70 palabras) ──
addLevel('A2.2',[
['Körper','cuerpo','der','Körper','n'],['Gesicht','cara','das','Gesichter','n'],
['Haut','piel','die','Häute','n'],['Zahn','diente','der','Zähne','n'],
['Zunge','lengua','die','Zungen','n'],['Finger','dedo','der','Finger','n'],
['Rücken','espalda','der','Rücken','n'],['Bauch','vientre','der','Bäuche','n'],
['Herz','corazón','das','Herzen','n'],['Blut','sangre','das','','n'],
['Krankheit','enfermedad','die','Krankheiten','n'],['Schnupfen','catarro','der','','n'],
['Husten','tos','der','','n'],['Grippe','gripe','die','Grippen','n'],
['Allergie','alergia','die','Allergien','n'],['Termin','cita','der','Termine','n'],
['Rezept','receta médica','das','Rezepte','n'],['Untersuchung','revisión','die','Untersuchungen','n'],
['Operation','operación','die','Operationen','n'],['Spritze','inyección','die','Spritzen','n'],
['Röntgen','rayos X','das','Röntgen','n'],['Krankenkasse','seguro médico','die','Krankenkassen','n'],
['Versicherung','seguro','die','Versicherungen','n'],['Formular','formulario','das','Formulare','n'],
['Anmeldung','registro','die','Anmeldungen','n'],['Antrag','solicitud','der','Anträge','n'],
['Bescheid','notificación','der','Bescheide','n'],['Erlaubnis','permiso','die','Erlaubnisse','n'],
['Verbot','prohibición','das','Verbote','n'],['heiraten','casarse','','','v'],
['lieben','amar','','','v'],['küssen','besar','','','v'],
['umarmen','abrazar','','','v'],['streiten','pelearse','','','v'],
['versöhnen','reconciliarse','','','v'],['vermuten','suponer','','','v'],
['hoffen','esperar','','','v'],['glauben','creer','','','v'],
['meinen','opinar','','','v'],['denken','pensar','','','v'],
['wissen','saber','','','v'],['kennen','conocer','','','v'],
['vergessen','olvidar','','','v'],['erinnern','recordar','','','v'],
['bemerken','notar','','','v'],['bedeuten','significar','','','v'],
['erklären','explicar','','','v'],['beschreiben','describir','','','v'],
['erzählen','contar','','','v'],['fragen','preguntar','','','v'],
['antworten','responder','','','v'],['wiederholen','repetir','','','v'],
['üben','practicar','','','v'],['prüfen','examinar','','','v'],
['bestehen','aprobar/superar','','','v'],['durchfallen','suspender','','','v'],
['zahlen','pagar','','','v'],['sparen','ahorrar','','','v'],
['leihen','prestar','','','v'],['ausleihen','pedir prestado','','','v'],
['tauschen','intercambiar','','','v'],['anprobieren','probarse','','','v'],
['passen','quedar','','','v'],['stehen','quedar de pie','','','v'],
['liegen','yacer/estar','','','v'],['hängen','colgar','','','v'],
['stellen','poner vertical','','','v'],['legen','poner horizontal','','','v'],
['stecken','meter','','','v'],['drücken','apretar','','','v'],
['ziehen','tirar','','','v'],['schieben','empujar','','','v']
]);

// ── A2.3 (60 palabras) ──
addLevel('A2.3',[
['Wetter','clima','das','','n'],['Regen','lluvia','der','','n'],
['Schnee','nieve','der','','n'],['Sonne','sol','die','','n'],
['Wolke','nube','die','Wolken','n'],['Nebel','niebla','der','','n'],
['Gewitter','tormenta','das','Gewitter','n'],['Blitz','relámpago','der','Blitze','n'],
['Donner','trueno','der','','n'],['Hagel','granizo','der','','n'],
['Frost','helada','der','Fröste','n'],['Hitze','calor','die','','n'],
['Luft','aire','die','Lüfte','n'],['Temperatur','temperatura','die','Temperaturen','n'],
['Grad','grado','der','Grade','n'],['Regenschirm','paraguas','der','Regenschirme','n'],
['Regenmantel','impermeable','der','Regenmäntel','n'],['Handschuh','guante','der','Handschuhe','n'],
['Schal','bufanda','der','Schals','n'],['Jacke','chaqueta','die','Jacken','n'],
['Pullover','jersey','der','Pullover','n'],['Anzug','traje','der','Anzüge','n'],
['Krawatte','corbata','die','Krawatten','n'],['Mantel','abrigo','der','Mäntel','n'],
['Tasche','bolso','die','Taschen','n'],['Gürtel','cinturón','der','Gürtel','n'],
['Schmuck','joyas','der','','n'],['Ring','anillo','der','Ringe','n'],
['Kette','cadena','die','Ketten','n'],['Armbanduhr','reloj pulsera','die','Armbanduhren','n'],
['Briefmarke','sello','die','Briefmarken','n'],['Umschlag','sobre','der','Umschläge','n'],
['Adresse','dirección','die','Adressen','n'],['Telefonnummer','número teléfono','die','Telefonnummern','n'],
['E-Mail','correo electrónico','die','E-Mails','n'],['Anhang','adjunto','der','Anhänge','n'],
['Dokument','documento','das','Dokumente','n'],['Unterschrift','firma','die','Unterschriften','n'],
['Drucker','impresora','der','Drucker','n'],['Bildschirm','pantalla','der','Bildschirme','n'],
['Tastatur','teclado','die','Tastaturen','n'],['Maus','ratón','die','Mäuse','n'],
['Kamera','cámara','die','Kameras','n'],['Handy','móvil','das','Handys','n'],
['Akku','batería','der','Akkus','n'],['Ladekabel','cable carga','das','Ladekabel','n'],
['Internet','internet','das','','n'],['Website','página web','die','Websites','n'],
['Password','contraseña','das','Passwörter','n'],['Benutzername','nombre usuario','der','Benutzernamen','n'],
['schicken','enviar','','','v'],['empfangen','recibir','','','v'],
['erhalten','recibir','','','v'],['versenden','expedir','','','v'],
['löschen','borrar','','','v'],['speichern','guardar','','','v'],
['kopieren','copiar','','','v'],['einfügen','pegar','','','v'],
['drucken','imprimir','','','v'],['scannen','escane ar','','','v'],
['hochladen','subir','','','v'],['herunterladen','descargar','','','v'],
['installieren','instalar','','','v'],['aktualisieren','actualizar','','','v'],
['verbinden','conectar','','','v'],['trennen','desconectar','','','v']
]);

// ── A2.4 (60 palabras) ──
addLevel('A2.4',[
['Gefühl','sentimiento','das','Gefühle','n'],['Freude','alegría','die','Freuden','n'],
['Glück','felicidad','das','','n'],['Liebe','amor','die','','n'],
['Angst','miedo','die','Ängste','n'],['Wut','ira','die','','n'],
['Trauer','tristeza','die','','n'],['Mut','valentía','der','','n'],
['Hoffnung','esperanza','die','Hoffnungen','n'],['Sehnsucht','anhelo','die','Sehnsüchte','n'],
['Vertrauen','confianza','das','','n'],['Zweifel','duda','der','Zweifel','n'],
['Ruhe','calma','die','','n'],['Stress','estrés','der','','n'],
['Lust','ganas','die','Lüste','n'],['Langeweile','aburrimiento','die','','n'],
['Charakter','carácter','der','Charaktere','n'],['Eigenschaft','cualidad','die','Eigenschaften','n'],
['Stimmung','humor/ánimo','die','Stimmungen','n'],['Laune','humor','die','Launen','n'],
['böse','enfadado','','','adj'],['nett','simpático','','','adj'],
['ehrlich','honesto','','','adj'],['mutig','valiente','','','adj'],
['feige','cobarde','','','adj'],['faul','perezoso','','','adj'],
['neugierig','curioso','','','adj'],['großzügig','generoso','','','adj'],
['geizig','tacaño','','','adj'],['höflich','cortés','','','adj'],
['unhöflich','grosero','','','adj'],['verrückt','loco','','','adj'],
['ruhig','tranquilo','','','adj'],['laut','ruidoso','','','adj'],
['nervös','nervioso','','','adj'],['entspannt','relajado','','','adj'],
['zufrieden','satisfecho','','','adj'],['beschäftigt','ocupado','','','adj'],
['neidisch','envidioso','','','adj'],['stolz','orgulloso','','','adj'],
['sich fühlen','sentirse','','','v'],['sich ärgern','enfadarse','','','v'],
['sich freuen','alegrarse','','','v'],['sich fürchten','temer','','','v'],
['sich langweilen','aburrirse','','','v'],['sich wundern','asombrarse','','','v'],
['sich schämen','avergonzarse','','','v'],['sich entspannen','relajarse','','','v'],
['sich konzentrieren','concentrarse','','','v'],['sich ausruhen','descansar','','','v'],
['sich anmelden','registrarse','','','v'],['sich abmelden','darse de baja','','','v'],
['sich bewerben','solicitar','','','v'],['sich entscheiden','decidirse','','','v'],
['sich erinnern','acordarse','','','v'],['sich gewöhnen','acostumbrarse','','','v'],
['danken','agradecer','','','v'],['gratulieren','felicitar','','','v'],
['entschuldigen','disculpar','','','v'],['verzeihen','perdonar','','','v'],
['begrüßen','saludar','','','v'],['verabschieden','despedir','','','v']
]);

// ── B1.1 (70 palabras) ──
addLevel('B1.1',[
['Erfahrung','experiencia','die','Erfahrungen','n'],['Eindruck','impresión','der','Eindrücke','n'],
['Bewerbung','solicitud','die','Bewerbungen','n'],['Vorstellungsgespräch','entrevista','das','Vorstellungsgespräche','n'],
['Ausbildung','formación','die','Ausbildungen','n'],['Studium','carrera','das','Studien','n'],
['Fach','asignatura','das','Fächer','n'],['Semester','semestre','das','Semester','n'],
['Prüfung','examen','die','Prüfungen','n'],['Zeugnis','certificado','das','Zeugnisse','n'],
['Abschluss','título','der','Abschlüsse','n'],['Stipendium','beca','das','Stipendien','n'],
['Bibliothek','biblioteca','die','Bibliotheken','n'],['Praktikum','prácticas','das','Praktika','n'],
['Forschung','investigación','die','Forschungen','n'],['Wissenschaft','ciencia','die','Wissenschaften','n'],
['Unternehmen','empresa','das','Unternehmen','n'],['Abteilung','departamento','die','Abteilungen','n'],
['Mitarbeiter','empleado','der','Mitarbeiter','n'],['Vorgesetzte','superior','der','Vorgesetzten','n'],
['Kündigung','despido','die','Kündigungen','n'],['Rente','jubilación','die','Renten','n'],
['Steuer','impuesto','die','Steuern','n'],['Miete','alquiler','die','Mieten','n'],
['Nebenkosten','gastos extras','die','','n'],['Strom','electricidad','der','','n'],
['Gas','gas','das','Gase','n'],['Heizung','calefacción','die','Heizungen','n'],
['Hausarbeit','tarea doméstica','die','Hausarbeiten','n'],['Einkaufsliste','lista compra','die','Einkaufslisten','n'],
['stellenweise','por partes','','','adv'],['demnächst','próximamente','','','adv'],
['während','durante','','','prep'],['innerhalb','dentro de','','','prep'],
['außerhalb','fuera de','','','prep'],['trotz','a pesar de','','','prep'],
['wegen','debido a','','','prep'],['statt','en lugar de','','','prep'],
['obwohl','aunque','','','conj'],['weil','porque','','','conj'],
['dass','que','','','conj'],['wenn','si/cuando','','','conj'],
['als','cuando','','','conj'],['ob','si','','','conj'],
['da','ya que','','','conj'],['damit','para que','','','conj'],
['weil','porque','','','conj'],['obwohl','aunque','','','conj'],
['während','mientras','','','conj'],['sobald','tan pronto como','','','conj'],
['solange','mientras','','','conj'],['bevor','antes de que','','','conj'],
['nachdem','después de que','','','conj'],['seitdem','desde que','','','conj'],
['berufstätig','trabajador','','','adj'],['arbeitslos','desempleado','','','adj'],
['selbstständig','autónomo','','','adj'],['ehrenamtlich','voluntario','','','adj'],
['erwerbslos','sin empleo','','','adj'],['angestellt','empleado','','','adj'],
['befristet','temporal','','','adj'],['unbefristet','indefinido','','','adj'],
['steigen','subir','','','v'],['sinken','bajar','','','v'],
['wachsen','crecer','','','v'],['verändern','cambiar','','','v'],
['entwickeln','desarrollar','','','v'],['verbessern','mejorar','','','v'],
['verschlechtern','empeorar','','','v'],['vergleichen','comparar','','','v'],
['bewerten','evaluar','','','v'],['beurteilen','juzgar','','','v']
]);

// ── B1.2 (70 palabras) ──
addLevel('B1.2',[
['Gesellschaft','sociedad','die','Gesellschaften','n'],['Umwelt','medio ambiente','die','Umwelten','n'],
['Politik','política','die','Politiken','n'],['Regierung','gobierno','die','Regierungen','n'],
['Gesetz','ley','das','Gesetze','n'],['Recht','derecho','das','Rechte','n'],
['Freiheit','libertad','die','Freiheiten','n'],['Gerechtigkeit','justicia','die','Gerechtigkeiten','n'],
['Frieden','paz','der','','n'],['Krieg','guerra','der','Kriege','n'],
['Macht','poder','die','Mächte','n'],['Gewalt','violencia','die','','n'],
['Demokratie','democracia','die','Demokratien','n'],['Partei','partido','die','Parteien','n'],
['Wahl','elección','die','Wahlen','n'],['Bürger','ciudadano','der','Bürger','n'],
['Ausländer','extranjero','der','Ausländer','n'],['Flüchtling','refugiado','der','Flüchtlinge','n'],
['Integration','integración','die','Integrationen','n'],['Kultur','cultura','die','Kulturen','n'],
['Geschichte','historia','die','Geschichten','n'],['Tradition','tradición','die','Traditionen','n'],
['Brauch','costumbre','der','Bräuche','n'],['Feiertag','día festivo','der','Feiertage','n'],
['Weihnachten','Navidad','das','','n'],['Ostern','Pascua','das','','n'],
['Silvester','Nochevieja','das','','n'],['Karneval','carnaval','der','Karnevale','n'],
['Geburtstag','cumpleaños','der','Geburtstage','n'],['Hochzeit','boda','die','Hochzeiten','n'],
['Jubiläum','aniversario','das','Jubiläen','n'],['Feier','fiesta','die','Feiern','n'],
['Geschenk','regalo','das','Geschenke','n'],['Glückwunsch','felicitación','der','Glückwünsche','n'],
['dringend','urgente','','','adj'],['notwendig','necesario','','','adj'],
['möglich','posible','','','adj'],['wahrscheinlich','probable','','','adj'],
['unwahrscheinlich','improbable','','','adj'],['erforderlich','requerido','','','adj'],
['verfügbar','disponible','','','adj'],['gleichzeitig','simultáneo','','','adj'],
['allmählich','poco a poco','','','adv'],['inzwischen','mientras tanto','','','adv'],
['schließlich','finalmente','','','adv'],['ungefähr','aproximadamente','','','adv'],
['wenigstens','al menos','','','adv'],['höchstens','como máximo','','','adv'],
['mindestens','como mínimo','','','adv'],['keinesfalls','de ningún modo','','','adv'],
['teilnehmen','participar','','','v'],['erfahren','enterarse','','','v'],
['entsprechen','corresponder','','','v'],['widersprechen','contradecir','','','v'],
['zustimmen','estar de acuerdo','','','v'],['ablehnen','rechazar','','','v'],
['vorschlagen','proponer','','','v'],['empfehlen','recomendar','','','v'],
['verlangen','exigir','','','v'],['fordern','demandar','','','v'],
['unterstützen','apoyar','','','v'],['fördern','fomentar','','','v'],
['verhindern','impedir','','','v'],['ermöglichen','posibilitar','','','v'],
['erleichtern','facilitar','','','v'],['erschweren','dificultar','','','v'],
['beeinflussen','influir','','','v'],['überzeugen','convencer','','','v'],
['überreden','persuadir','','','v'],['ablehnen','rechazar','','','v']
]);

// ── B1.3 (70 palabras) ──
addLevel('B1.3',[
['Gesundheit','salud','die','','n'],['Ernährung','alimentación','die','Ernährungen','n'],
['Bewegung','ejercicio','die','Bewegungen','n'],['Sportart','deporte','der','Sportarten','n'],
['Training','entrenamiento','das','Trainings','n'],['Mannschaft','equipo','die','Mannschaften','n'],
['Spieler','jugador','der','Spieler','n'],['Trainer','entrenador','der','Trainer','n'],
['Schiedsrichter','árbitro','der','Schiedsrichter','n'],['Gegner','adversario','der','Gegner','n'],
['Sieg','victoria','der','Siege','n'],['Niederlage','derrota','die','Niederlagen','n'],
['Wettbewerb','competición','der','Wettbewerbe','n'],['Meisterschaft','campeonato','die','Meisterschaften','n'],
['Publikum','público','das','Publikums','n'],['Zuschauer','espectador','der','Zuschauer','n'],
['Rekord','récord','der','Rekorde','n'],['Medaille','medalla','die','Medaillen','n'],
['Verein','club','der','Vereine','n'],['Mitglied','miembro','das','Mitglieder','n'],
['Beitrag','contribución','der','Beiträge','n'],['Spende','donación','die','Spenden','n'],
['Mitgliedschaft','pertenencia','die','Mitgliedschaften','n'],['Veranstaltung','evento','die','Veranstaltungen','n'],
['Eintritt','entrada','der','Eintritte','n'],['Eintrittskarte','billete','die','Eintrittskarten','n'],
['Ausstellung','exposición','die','Ausstellungen','n'],['Konzert','concierto','das','Konzerte','n'],
['Vortrag','conferencia','der','Vorträge','n'],['Diskussion','debate','die','Diskussionen','n'],
['Bühne','escenario','die','Bühnen','n'],['Saal','sala','der','Säle','n'],
['Sitzplatz','asiento','der','Sitzplätze','n'],['Programm','programa','das','Programme','n'],
['Ablauf','transcurso','der','Abläufe','n'],['Teilnahme','participación','die','Teilnahmen','n'],
['trainieren','entrenar','','','v'],['gewinnen','ganar','','','v'],
['verlieren','perder','','','v'],['besiegen','vencer','','','v'],
['unterhalten','entretener','','','v'],['genießen','disfrutar','','','v'],
['fehlen','faltar','','','v'],['stattfinden','tener lugar','','','v'],
['stattgeben','conceder','','','v'],['teilnehmen','participar','','','v'],
['abstimmen','votar','','','v'],['zuhören','escuchar','','','v'],
['zuschauen','mirar','','','v'],['mitmachen','participar','','','v'],
['ausprobieren','probar','','','v'],['ausüben','practicar','','','v'],
['fortsetzen','continuar','','','v'],['unterbrechen','interrumpir','','','v'],
['beschließen','decidir','','','v'],['vereinbaren','acordar','','','v'],
['aktiv','activo','','','adj'],['passiv','pasivo','','','adj'],
['regelmäßig','regular','','','adj'],['gelegentlich','ocasional','','','adj'],
['ständig','constante','','','adj'],['vorübergehend','temporal','','','adj'],
['dauerhaft','permanente','','','adj'],['gemeinsam','compartido','','','adj'],
['einzeln','individual','','','adj'],['wechselseitig','mutuo','','','adj'],
['willkommen','bienvenido','','','adj'],['beliebt','popular','','','adj']
]);

// ── B1.4 (70 palabras) ──
addLevel('B1.4',[
['Lösung','solución','die','Lösungen','n'],['Problem','problema','das','Probleme','n'],
['Schwierigkeit','dificultad','die','Schwierigkeiten','n'],['Herausforderung','desafío','die','Herausforderungen','n'],
['Möglichkeit','posibilidad','die','Möglichkeiten','n'],['Gelegenheit','oportunidad','die','Gelegenheiten','n'],
['Ziel','objetivo','das','Ziele','n'],['Zukunft','futuro','die','Zukunfte','n'],
['Vergangenheit','pasado','die','Vergangenheiten','n'],['Gegenwart','presente','die','Gegenwarten','n'],
['Entscheidung','decisión','die','Entscheidungen','n'],['Planung','planificación','die','Planungen','n'],
['Vorbereitung','preparación','die','Vorbereitungen','n'],['Durchführung','realización','die','Durchführungen','n'],
['Ergebnis','resultado','das','Ergebnisse','n'],['Auswirkung','consecuencia','die','Auswirkungen','n'],
['Ursache','causa','die','Ursachen','n'],['Wirkung','efecto','die','Wirkungen','n'],
['Zusammenhang','relación','der','Zusammenhänge','n'],['Unterschied','diferencia','der','Unterschiede','n'],
['Ähnlichkeit','similitud','die','Ähnlichkeiten','n'],['Vorteil','ventaja','der','Vorteile','n'],
['Nachteil','desventaja','der','Nachteile','n'],['Bedeutung','significado','die','Bedeutungen','n'],
['Funktion','función','die','Funktionen','n'],['Methode','método','die','Methoden','n'],
['System','sistema','das','Systeme','n'],['Struktur','estructura','die','Strukturen','n'],
['Prozess','proceso','der','Prozesse','n'],['Entwicklung','desarrollo','die','Entwicklungen','n'],
['Analyse','análisis','die','Analysen','n'],['Diskussion','discusión','die','Diskussionen','n'],
['Vorschlag','propuesta','der','Vorschläge','n'],['Idee','idea','die','Ideen','n'],
['begründen','justificar','','','v'],['beweisen','probar','','','v'],
['widerlegen','refutar','','','v'],['folgern','deducir','','','v'],
['schließen','concluir','','','v'],['annehmen','asumir','','','v'],
['ausgehen','partir de','','','v'],['beruhen','basarse','','','v'],
['basieren','basar','','','v'],['gründen','fundar','','','v'],
['entstehen','surgir','','','v'],['verursachen','causar','','','v'],
['auslösen','desencadenar','','','v'],['beitragen','contribuir','','','v'],
['führen','conducir','','','v'],['resultieren','resultar','','','v'],
['hervorgehen','desprenderse','','','v'],['zurückführen','atribuir','','','v'],
['umfassen','abarcar','','','v'],['einschließen','incluir','','','v'],
['ausschließen','excluir','','','v'],['enthalten','contener','','','v'],
['bestehen','consistir','','','v'],['gehören','pertenecer','','','v'],
['wesentlich','esencial','','','adj'],['entscheidend','decisivo','','','adj'],
['bedeutend','significativo','','','adj'],['erheblich','considerable','','','adj'],
['gering','escaso','','','adj'],['ausreichend','suficiente','','','adj'],
['ungeeignet','inadecuado','','','adj'],['passend','adecuado','','','adj'],
['exakt','exacto','','','adj'],['präzise','preciso','','','adj'],
['ungefähr','aproximado','','','adj'],['annähernd','aproximado','','','adj']
]);

// ── B2.1 (80 palabras) ──
addLevel('B2.1',[
['Wirtschaft','economía','die','Wirtschaften','n'],['Markt','mercado','der','Märkte','n'],
['Handel','comercio','der','','n'],['Industrie','industria','die','Industrien','n'],
['Produktion','producción','die','Produktionen','n'],['Vertrieb','distribución','der','Vertriebe','n'],
['Nachfrage','demanda','die','Nachfragen','n'],['Angebot','oferta','das','Angebote','n'],
['Kunde','cliente','der','Kunden','n'],['Lieferant','proveedor','der','Lieferanten','n'],
['Hersteller','fabricante','der','Hersteller','n'],['Wettbewerb','competencia','der','Wettbewerbe','n'],
['Konkurrenz','competencia','die','','n'],['Monopol','monopolio','das','Monopole','n'],
['Investition','inversión','die','Investitionen','n'],['Gewinn','ganancia','der','Gewinne','n'],
['Verlust','pérdida','der','Verluste','n'],['Umsatz','facturación','der','Umsätze','n'],
['Bilanz','balance','die','Bilanzen','n'],['Kapital','capital','das','Kapitalien','n'],
['Aktie','acción','die','Aktien','n'],['Fonds','fondo','der','Fonds','n'],
['Zins','interés','der','Zinsen','n'],['Kredit','crédito','der','Kredite','n'],
['Schuld','deuda','die','Schulden','n'],['Rate','plazo','die','Raten','n'],
['Finanzierung','financiación','die','Finanzierungen','n'],['Subvention','subvención','die','Subventionen','n'],
['Förderung','fomento','die','Förderungen','n'],['Globalisierung','globalización','die','','n'],
['Ressource','recurso','die','Ressourcen','n'],['Energie','energía','die','Energien','n'],
['Rohstoff','materia prima','der','Rohstoffe','n'],['Nachhaltigkeit','sostenibilidad','die','','n'],
['Umweltschutz','protección ambiental','der','','n'],['Klimawandel','cambio climático','der','','n'],
['Verschmutzung','contaminación','die','Verschmutzungen','n'],['Recycling','reciclaje','das','','n'],
['Müll','basura','der','','n'],['Abfall','residuo','der','Abfälle','n'],
['Erneuerbare','renovables','die','','n'],['Solarenergie','energía solar','die','','n'],
['Windenergie','energía eólica','die','','n'],['Kernkraft','energía nuclear','die','Kernkräfte','n'],
['investieren','invertir','','','v'],['finanzieren','financiar','','','v'],
['subventionieren','subvencionar','','','v'],['produzieren','producir','','','v'],
['konsumieren','consumir','','','v'],['exportieren','exportar','','','v'],
['importieren','importar','','','v'],['verteilen','distribuir','','','v'],
['erzeugen','generar','','','v'],['verbrauchen','consumir','','','v'],
['verschwenden','desperdiciar','','','v'],['sparen','ahorrar','','','v'],
['einsparen','ahorrar','','','v'],['senken','reducir','','','v'],
['steigern','aumentar','','','v'],['wachsen','crecer','','','v'],
['schrumpfen','encoger','','','v'],['stagnieren','estancarse','','','v'],
['konkurrieren','competir','','','v'],['überleben','sobrevivir','','','v'],
['scheitern','fracasar','','','v'],['gelingen','lograr','','','v'],
['ökonomisch','económico','','','adj'],['rentabel','rentable','','','adj'],
['lukrativ','lucrativo','','','adj'],['defizitär','deficitario','','','adj'],
['überschüssig','excedentario','','','adj'],['nachhaltig','sostenible','','','adj'],
['effizient','eficiente','','','adj'],['ineffizient','ineficiente','','','adj'],
['produktiv','productivo','','','adj'],['unproduktiv','improductivo','','','adj']
]);

// ── B2.2 (80 palabras) ──
addLevel('B2.2',[
['Alltag','día a día','der','','n'],['Routine','rutina','die','Routinen','n'],
['Gewohnheit','costumbre','die','Gewohnheiten','n'],['Angewohnheit','vicio','die','Angewohnheiten','n'],
['Lebensstil','estilo de vida','der','Lebensstile','n'],['Lebensqualität','calidad de vida','die','','n'],
['Wohlstand','bienestar','der','','n'],['Zufriedenheit','satisfacción','die','','n'],
['Unzufriedenheit','insatisfacción','die','','n'],['Einsamkeit','soledad','die','','n'],
['Gemeinschaft','comunidad','die','Gemeinschaften','n'],['Nachbarschaft','vecindad','die','Nachbarschaften','n'],
['Beziehung','relación','die','Beziehungen','n'],['Bekanntschaft','conocido','die','Bekanntschaften','n'],
['Freundschaft','amistad','die','Freundschaften','n'],['Partnerschaft','pareja','die','Partnerschaften','n'],
['Ehe','matrimonio','die','Ehen','n'],['Scheidung','divorcio','die','Scheidungen','n'],
['Trennung','separación','die','Trennungen','n'],['Versöhnung','reconciliación','die','Versöhnungen','n'],
['Vertrauen','confianza','das','','n'],['Misstrauen','desconfianza','das','','n'],
['Respekt','respeto','der','','n'],['Toleranz','tolerancia','die','','n'],
['Rücksicht','consideración','die','','n'],['Verständnis','comprensión','das','','n'],
['Empathie','empatía','die','','n'],['Solidarität','solidaridad','die','','n'],
['Verantwortung','responsabilidad','die','Verantwortungen','n'],['Pflicht','deber','die','Pflichten','n'],
['Aufgabe','tarea','die','Aufgaben','n'],['Rolle','papel','die','Rollen','n'],
['Funktion','función','die','Funktionen','n'],['Position','posición','die','Positionen','n'],
['Status','estatus','der','Status','n'],['Ansehen','prestigio','das','','n'],
['Ruf','reputación','der','Rufe','n'],['Image','imagen','das','Images','n'],
['Öffentlichkeit','público','die','','n'],['Privatsphäre','privacidad','die','','n'],
['vertrauen','confiar','','','v'],['misstrauen','desconfiar','','','v'],
['respektieren','respetar','','','v'],['tolerieren','tolerar','','','v'],
['akzeptieren','aceptar','','','v'],['verstehen','entender','','','v'],
['nachfühlen','comprender','','','v'],['mitfühlen','compadecer','','','v'],
['teilen','compartir','','','v'],['schenken','regalar','','','v'],
['opfern','sacrificar','','','v'],['verzichten','renunciar','','','v'],
['vermissen','echar de menos','','','v'],['sehnen','anhelar','','','v'],
['beneiden','envidiar','','','v'],['bewundern','admirar','','','v'],
['verachten','despreciar','','','v'],['schätzen','valorar','','','v'],
['würdigen','apreciar','','','v'],['kritisieren','criticar','','','v'],
['loben','alabar','','','v'],['ermutigen','animar','','','v'],
['entmutigen','desanimar','','','v'],['trösten','consolar','','','v'],
['unterstützen','apoyar','','','v'],['belasten','cargar','','','v'],
['entlasten','aliviar','','','v'],['befreien','liberar','','','v'],
['ehrlich','honesto','','','adj'],['aufrichtig','sincero','','','adj'],
['verlogen','mentiroso','','','adj'],['vertrauenswürdig','digno de confianza','','','adj'],
['zuverlässig','fiable','','','adj'],['unzuverlässig','poco fiable','','','adj'],
['verantwortungsvoll','responsable','','','adj'],['verantwortungslos','irresponsable','','','adj'],
['rücksichtsvoll','considerado','','','adj'],['rücksichtslos','desconsiderado','','','adj']
]);

// ── B2.3 (80 palabras) ──
addLevel('B2.3',[
['Medien','medios','die','','n'],['Presse','prensa','die','','n'],
['Rundfunk','radiodifusión','der','','n'],['Fernsehen','televisión','das','','n'],
['Nachrichten','noticias','die','','n'],['Berichterstattung','cobertura informativa','die','Berichterstattungen','n'],
['Journalist','periodista','der','Journalisten','n'],['Reporter','reportero','der','Reporter','n'],
['Redaktion','redacción','die','Redaktionen','n'],['Artikel','artículo','der','Artikel','n'],
['Schlagzeile','titular','die','Schlagzeilen','n'],['Kommentar','comentario','der','Kommentare','n'],
['Interview','entrevista','das','Interviews','n'],['Reportage','reportaje','die','Reportagen','n'],
['Dokumentation','documental','die','Dokumentationen','n'],['Sendung','programa','die','Sendungen','n'],
['Moderator','presentador','der','Moderatoren','n'],['Zuschauer','espectador','der','Zuschauer','n'],
['Einschaltquote','audiencia','die','Einschaltquoten','n'],['Werbung','publicidad','die','Werbungen','n'],
['Wirtschaftswerbung','anuncio','die','Wirtschaftswerbungen','n'],['Sponsoring','patrocinio','das','Sponsorings','n'],
['Propaganda','propaganda','die','','n'],['Zensur','censura','die','Zensuren','n'],
['Meinungsfreiheit','libertad de expresión','die','','n'],['Pressefreiheit','libertad de prensa','die','','n'],
['Informationsfreiheit','libertad de info','die','','n'],['Datenschutz','protección datos','der','','n'],
['Privatsphäre','privacidad','die','','n'],['Überwachung','vigilancia','die','Überwachungen','n'],
['Kamera','cámara','die','Kameras','n'],['Mikrofon','micrófono','das','Mikrofone','n'],
['Aufnahme','grabación','die','Aufnahmen','n'],['Lautsprecher','altavoz','der','Lautsprecher','n'],
['Bildschirm','pantalla','der','Bildschirme','n'],['Tastatur','teclado','die','Tastaturen','n'],
['veröffentlichen','publicar','','','v'],['verbreiten','difundir','','','v'],
['berichten','informar','','','v'],['melden','reportar','','','v'],
['interviewen','entrevistar','','','v'],['kommentieren','comentar','','','v'],
['kritisieren','criticar','','','v'],['zensieren','censurar','','','v'],
['überwachen','vigilar','','','v'],['aufnehmen','grabar','','','v'],
['senden','emitir','','','v'],['ausstrahlen','transmitir','','','v'],
['empfangen','recibir','','','v'],['abonnieren','suscribirse','','','v'],
['liken','likear','','','v'],['teilen','compartir','','','v'],
['posten','publicar','','','v'],['kommentieren','comentar','','','v'],
['folgen','seguir','','','v'],['blockieren','bloquear','','','v'],
['melden','reportar','','','v'],['abmelden','darse de baja','','','v'],
['anmelden','registrarse','','','v'],['einloggen','iniciar sesión','','','v'],
['ausloggen','cerrar sesión','','','v'],['aktualisieren','actualizar','','','v'],
['digital','digital','','','adj'],['virtuell','virtual','','','adj'],
['online','en línea','','','adj'],['offline','fuera de línea','','','adj'],
['interaktiv','interactivo','','','adj'],['multimedial','multimedia','','','adj'],
['aktuell','actual','','','adj'],['veraltet','desactualizado','','','adj'],
['zuverlässig','fiable','','','adj'],['glaubwürdig','creíble','','','adj'],
['manipulativ','manipulativo','','','adj'],['objektiv','objetivo','','','adj'],
['subjektiv','subjetivo','','','adj'],['tendenziös','tendencioso','','','adj']
]);

// ── B2.4 (80 palabras) ──
addLevel('B2.4',[
['Forschung','investigación','die','Forschung','n'],['Wissenschaft','ciencia','die','Wissenschaften','n'],
['Technik','técnica','die','Techniken','n'],['Technologie','tecnología','die','Technologien','n'],
['Fortschritt','progreso','der','Fortschritte','n'],['Entwicklung','desarrollo','die','Entwicklungen','n'],
['Innovation','innovación','die','Innovationen','n'],['Erfindung','invento','die','Erfindungen','n'],
['Entdeckung','descubrimiento','die','Entdeckungen','n'],['Theorie','teoría','die','Theorien','n'],
['Praxis','práctica','die','Praxen','n'],['Experiment','experimento','das','Experimente','n'],
['Labor','laboratorio','das','Labore','n'],['Methode','método','die','Methoden','n'],
['Analyse','análisis','die','Analysen','n'],['Statistik','estadística','die','Statistiken','n'],
['Daten','datos','die','','n'],['Ergebnis','resultado','das','Ergebnisse','n'],
['Schlussfolgerung','conclusión','die','Schlussfolgerungen','n'],['Hypothese','hipótesis','die','Hypothesen','n'],
['Beweis','prueba','der','Beweise','n'],['Beleg','evidencia','der','Belege','n'],
['Quelle','fuente','die','Quellen','n'],['Zitat','cita','das','Zitate','n'],
['Literatur','literatura','die','Literaturen','n'],['Bibliothek','biblioteca','die','Bibliotheken','n'],
['Archiv','archivo','das','Archive','n'],['Dokument','documento','das','Dokumente','n'],
['Handschrift','manuscrito','die','Handschriften','n'],['Veröffentlichung','publicación','die','Veröffentlichungen','n'],
['Fachzeitschrift','revista especializada','die','Fachzeitschriften','n'],['Konferenz','conferencia','die','Konferenzen','n'],
['Symposium','simposio','das','Symposien','n'],['Kongress','congreso','der','Kongresse','n'],
['forschen','investigar','','','v'],['untersuchen','examinar','','','v'],
['analysieren','analizar','','','v'],['bewerten','evaluar','','','v'],
['messen','medir','','','v'],['berechnen','calcular','','','v'],
['nachweisen','demostrar','','','v'],['belegen','probar','','','v'],
['widerlegen','refutar','','','v'],['bestätigen','confirmar','','','v'],
['widerrufen','retractar','','','v'],['korrigieren','corregir','','','v'],
['überprüfen','verificar','','','v'],['verifizieren','verificar','','','v'],
['falsifizieren','falsear','','','v'],['dokumentieren','documentar','','','v'],
['protokollieren','registrar','','','v'],['archivieren','archivar','','','v'],
['katalogisieren','catalogar','','','v'],['publizieren','publicar','','','v'],
['zitieren','citar','','','v'],['referenzieren','referenciar','','','v'],
['logisch','lógico','','','adj'],['rational','racional','','','adj'],
['empirisch','empírico','','','adj'],['theoretisch','teórico','','','adj'],
['praktisch','práctico','','','adj'],['methodisch','metódico','','','adj'],
['systematisch','sistemático','','','adj'],['analytisch','analítico','','','adj'],
['kritisch','crítico','','','adj'],['konstruktiv','constructivo','','','adj'],
['kontrovers','controvertido','','','adj'],['umstritten','discutido','','','adj'],
['nachvollziehbar','comprensible','','','adj'],['plausibel','plausible','','','adj'],
['schlüssig','coherente','','','adj'],['stichhaltig','válido','','','adj'],
['wissenschaftlich','científico','','','adj'],['interdisziplinär','interdisciplinario','','','adj']
]);

// ── C1.1 (80 palabras) ──
addLevel('C1.1',[
['Konsequenz','consecuencia','die','Konsequenzen','n'],['Implikation','implicación','die','Implikationen','n'],
['Voraussetzung','requisito','die','Voraussetzungen','n'],['Bedingung','condición','die','Bedingungen','n'],
['Grundlage','base','die','Grundlagen','n'],['Prämisse','premisa','die','Prämissen','n'],
['These','tesis','die','Thesen','n'],['Antithese','antítesis','die','Antithesen','n'],
['Synthese','síntesis','die','Synthesen','n'],['Paradigma','paradigma','das','Paradigmen','n'],
['Perspektive','perspectiva','die','Perspektiven','n'],['Aspekt','aspecto','der','Aspekte','n'],
['Dimension','dimensión','die','Dimensionen','n'],['Faktor','factor','der','Faktoren','n'],
['Variable','variable','die','Variablen','n'],['Konstante','constante','die','Konstanten','n'],
['Parameter','parámetro','der','Parameter','n'],['Kriterium','criterio','das','Kriterien','n'],
['Indikator','indicador','der','Indikatoren','n'],['Maßstab','baremo','der','Maßstäbe','n'],
['Norm','norma','die','Normen','n'],['Standard','estándar','der','Standards','n'],
['Richtlinie','directriz','die','Richtlinien','n'],['Vorschrift','regulación','die','Vorschriften','n'],
['Regelung','reglamento','die','Regelungen','n'],['Bestimmung','disposición','die','Bestimmungen','n'],
['Auflage','condición','die','Auflagen','n'],['Bedingung','condición','die','Bedingungen','n'],
['Einschränkung','restricción','die','Einschränkungen','n'],['Ausnahme','excepción','die','Ausnahmen','n'],
['Widerspruch','contradicción','der','Widersprüche','n'],['Gegensatz','opuesto','der','Gegensätze','n'],
['Widerspruch','objeción','der','Widersprüche','n'],['Einwand','objeción','der','Einwände','n'],
['Vorbehalt','reserva','der','Vorbehalte','n'],['Bedenken','reparo','das','Bedenken','n'],
['folglich','por consiguiente','','','adv'],['infolgedessen','como consecuencia','','','adv'],
['demzufolge','en consecuencia','','','adv'],['nichtsdestotrotz','no obstante','','','adv'],
['nichtsdestoweniger','sin embargo','','','adv'],['insofern','en la medida en que','','','adv'],
['inwiefern','en qué medida','','','adv'],['inwieweit','hasta qué punto','','','adv'],
['vorausgesetzt','siempre que','','','conj'],['gesetzt den Fall','suponiendo que','','','conj'],
['angenommen','supuesto que','','','conj'],['es sei denn','a menos que','','','conj'],
['zumal','más aún cuando','','','conj'],['umso mehr als','tanto más cuanto','','','conj'],
['geschweige denn','y mucho menos','','','conj'],['sowohl... als auch','tanto... como','','','conj'],
['nicht nur... sondern auch','no solo... sino también','','','conj'],['weder... noch','ni... ni','','','conj'],
['entweder... oder','o... o','','','conj'],['einerseits... andererseits','por un lado... por otro','','','conj'],
['zwar... aber','ciertamente... pero','','','conj'],['allerdings','ciertamente','','','adv'],
['jedoch','sin embargo','','','adv'],['dennoch','no obstante','','','adv'],
['trotzdem','a pesar de todo','','','adv'],['gleichwohl','aun así','','','adv'],
['indes','mientras tanto','','','adv'],['indessen','entre tanto','','','adv'],
['unterdessen','mientras tanto','','','adv'],['inzwischen','mientras tanto','','','adv'],
['mittlerweile','mientras tanto','','','adv'],['insofern','en la medida que','','','conj'],
['sodass','de modo que','','','conj'],['derart','de tal manera','','','adv'],
['dermaßen','de tal modo','','','adv'],['folgendermaßen','del siguiente modo','','','adv'],
['gleichermaßen','igualmente','','','adv'],['ebenfalls','también','','','adv'],
['desgleichen','asimismo','','','adv'],['ebenso','igualmente','','','adv'],
['nämlich','es decir','','','adv'],['und zwar','a saber','','','adv']
]);

// ── C1.2 (70 palabras) ──
addLevel('C1.2',[
['Abstraktion','abstracción','die','Abstraktionen','n'],['Konkretisierung','concreción','die','Konkretisierungen','n'],
['Differenzierung','diferenciación','die','Differenzierungen','n'],['Spezifizierung','especificación','die','Spezifizierungen','n'],
['Generalisierung','generalización','die','Generalisierungen','n'],['Verallgemeinerung','generalización','die','Verallgemeinerungen','n'],
['Typisierung','tipificación','die','Typisierungen','n'],['Klassifizierung','clasificación','die','Klassifizierungen','n'],
['Kategorisierung','categorización','die','Kategorisierungen','n'],['Systematisierung','sistematización','die','Systematisierungen','n'],
['Strukturierung','estructuración','die','Strukturierungen','n'],['Organisation','organización','die','Organisationen','n'],
['Koordination','coordinación','die','Koordinationen','n'],['Kooperation','cooperación','die','Kooperationen','n'],
['Kommunikation','comunicación','die','Kommunikationen','n'],['Interaktion','interacción','die','Interaktionen','n'],
['Partizipation','participación','die','Partizipationen','n'],['Integration','integración','die','Integrationen','n'],
['Segregation','segregación','die','Segregationen','n'],['Differenz','diferencia','die','Differenzen','n'],
['Divergenz','divergencia','die','Divergenzen','n'],['Konvergenz','convergencia','die','Konvergenzen','n'],
['Kohärenz','coherencia','die','','n'],['Kohäsion','cohesión','die','','n'],
['Korrelation','correlación','die','Korrelationen','n'],['Kausalität','causalidad','die','','n'],
['Kontingenz','contingencia','die','Kontingenzen','n'],['Notwendigkeit','necesidad','die','Notwendigkeiten','n'],
['Zufälligkeit','aleatoriedad','die','Zufälligkeiten','n'],['Wahrscheinlichkeit','probabilidad','die','Wahrscheinlichkeiten','n'],
['Möglichkeit','posibilidad','die','Möglichkeiten','n'],['Unmöglichkeit','imposibilidad','die','Unmöglichkeiten','n'],
['abstrahieren','abstraer','','','v'],['konkretisieren','concretar','','','v'],
['differenzieren','diferenciar','','','v'],['spezifizieren','especificar','','','v'],
['generalisieren','generalizar','','','v'],['typisieren','tipificar','','','v'],
['klassifizieren','clasificar','','','v'],['kategorisieren','categorizar','','','v'],
['systematisieren','sistematizar','','','v'],['strukturieren','estructurar','','','v'],
['organisieren','organizar','','','v'],['koordinieren','coordinar','','','v'],
['kooperieren','cooperar','','','v'],['kommunizieren','comunicar','','','v'],
['interagieren','interactuar','','','v'],['partizipieren','participar','','','v'],
['integrieren','integrar','','','v'],['segregieren','segregar','','','v'],
['korrelieren','correlacionar','','','v'],['kausal','causal','','','adj'],
['kontingent','contingente','','','adj'],['notwendig','necesario','','','adj'],
['zufällig','aleatorio','','','adj'],['wahrscheinlich','probable','','','adj'],
['unwahrscheinlich','improbable','','','adj'],['möglich','posible','','','adj'],
['unmöglich','imposible','','','adj'],['abstrakt','abstracto','','','adj'],
['konkret','concreto','','','adj'],['spezifisch','específico','','','adj'],
['generell','general','','','adj'],['typisch','típico','','','adj'],
['charakteristisch','característico','','','adj'],['repräsentativ','representativo','','','adj'],
['exemplarisch','ejemplar','','','adj'],['paradigmatisch','paradigmático','','','adj'],
['synthetisch','sintético','','','adj'],['analytisch','analítico','','','adj']
]);

console.log('Ruta: vocab loaded', Object.keys(R.VOCAB).length, 'levels');

// ===========================================================
// 2. IRRREGULÄRE VERBEN nach Niveau
// ===========================================================
R.IRRVERBS = {};
R.IRRVERBS['A1'] = [
  ['sein','war','ist gewesen','ist','v'],['haben','hatte','hat gehabt','hat','v'],
  ['werden','wurde','ist geworden','ist','v'],['können','konnte','hat gekonnt','hat','v'],
  ['müssen','musste','hat gemusst','hat','v'],['wollen','wollte','hat gewollt','hat','v'],
  ['dürfen','durfte','hat gedurft','hat','v'],['sollen','sollte','hat gesollt','hat','v'],
  ['mögen','mochte','hat gemocht','hat','v'],['wissen','wusste','hat gewusst','hat','v'],
  ['gehen','ging','ist gegangen','ist','v'],['kommen','kam','ist gekommen','ist','v'],
  ['sehen','sah','hat gesehen','hat','v'],['essen','aß','hat gegessen','hat','v'],
  ['geben','gab','hat gegeben','hat','v'],['nehmen','nahm','hat genommen','hat','v'],
  ['sprechen','sprach','hat gesprochen','hat','v'],['lesen','las','hat gelesen','hat','v'],
  ['schreiben','schrieb','hat geschrieben','hat','v'],['finden','fand','hat gefunden','hat','v'],
  ['bleiben','blieb','ist geblieben','ist','v'],['heißen','hieß','hat geheißen','hat','v'],
  ['liegen','lag','hat gelegen','hat','v'],['sitzen','saß','hat gesessen','hat','v'],
  ['stehen','stand','hat gestanden','hat','v'],['fahren','fuhr','ist gefahren','ist','v'],
  ['halten','hielt','hat gehalten','hat','v'],['lassen','ließ','hat gelassen','hat','v'],
  ['tragen','trug','hat getragen','hat','v'],['schlafen','schlief','hat geschlafen','hat','v']
];
R.IRRVERBS['A2'] = [
  ['beginnen','begann','hat begonnen','hat','v'],['bieten','bot','hat geboten','hat','v'],
  ['bitten','bat','hat gebeten','hat','v'],['brechen','brach','hat gebrochen','hat','v'],
  ['bringen','brachte','hat gebracht','hat','v'],['denken','dachte','hat gedacht','hat','v'],
  ['empfehlen','empfahl','hat empfohlen','hat','v'],['erschrecken','erschrak','ist erschrocken','ist','v'],
  ['fliegen','flog','ist geflogen','ist','v'],['fliehen','floh','ist geflohen','ist','v'],
  ['frieren','fror','hat gefroren','hat','v'],['genießen','genoss','hat genossen','hat','v'],
  ['gewinnen','gewann','hat gewonnen','hat','v'],['gießen','goss','hat gegossen','hat','v'],
  ['klingen','klang','hat geklungen','hat','v'],['kriechen','kroch','ist gekrochen','ist','v'],
  ['laden','lud','hat geladen','hat','v'],['laufen','lief','ist gelaufen','ist','v'],
  ['leiden','litt','hat gelitten','hat','v'],['leihen','lieh','hat geliehen','hat','v'],
  ['melken','melkte','hat gemelkt','hat','v'],['messen','maß','hat gemessen','hat','v'],
  ['nennen','nannte','hat genannt','hat','v'],['pfeifen','pfiff','hat gepfiffen','hat','v'],
  ['raten','riet','hat geraten','hat','v'],['reiben','rieb','hat gerieben','hat','v'],
  ['reißen','riss','hat gerissen','hat','v'],['reiten','ritt','ist geritten','ist','v'],
  ['rennen','rannte','ist gerannt','ist','v'],['riechen','roch','hat gerochen','hat','v']
];
R.IRRVERBS['B1'] = [
  ['saufen','soff','hat gesoffen','hat','v'],['schaffen','schuf','hat geschaffen','hat','v'],
  ['scheinen','schien','hat geschienen','hat','v'],['schießen','schoss','hat geschossen','hat','v'],
  ['schlafen','schlief','hat geschlafen','hat','v'],['schlagen','schlug','hat geschlagen','hat','v'],
  ['schleichen','schlich','ist geschlichen','ist','v'],['schließen','schloss','hat geschlossen','hat','v'],
  ['schneiden','schnitt','hat geschnitten','hat','v'],['schreiben','schrieb','hat geschrieben','hat','v'],
  ['schreien','schrie','hat geschrien','hat','v'],['schweigen','schwieg','hat geschwiegen','hat','v'],
  ['schwimmen','schwamm','ist geschwommen','ist','v'],['sehen','sah','hat gesehen','hat','v'],
  ['senden','sandte','hat gesandt','hat','v'],['singen','sang','hat gesungen','hat','v'],
  ['sinken','sank','ist gesunken','ist','v'],['spinnen','spann','hat gesponnen','hat','v'],
  ['sprechen','sprach','hat gesprochen','hat','v'],['springen','sprang','ist gesprungen','ist','v'],
  ['stechen','stach','hat gestochen','hat','v'],['stecken','steckte','hat gesteckt','hat','v'],
  ['stehen','stand','hat gestanden','hat','v'],['stehlen','stahl','hat gestohlen','hat','v'],
  ['steigen','stieg','ist gestiegen','ist','v'],['sterben','starb','ist gestorben','ist','v'],
  ['stinken','stank','hat gestunken','hat','v'],['stoßen','stieß','hat gestoßen','hat','v'],
  ['streiten','stritt','hat gestritten','hat','v'],['tragen','trug','hat getragen','hat','v'],
  ['treffen','traf','hat getroffen','hat','v'],['treiben','trieb','hat getrieben','hat','v'],
  ['treten','trat','ist getreten','ist','v'],['trinken','trank','hat getrunken','hat','v'],
  ['tun','tat','hat getan','hat','v'],['verlieren','verlor','hat verloren','hat','v'],
  ['verschwinden','verschwand','ist verschwunden','ist','v'],['verzeihen','verzieh','hat verziehen','hat','v'],
  ['wachsen','wuchs','ist gewachsen','ist','v'],['waschen','wusch','hat gewaschen','hat','v'],
  ['weisen','wies','hat gewiesen','hat','v'],['wenden','wandte','hat gewandt','hat','v'],
  ['werfen','warf','hat geworfen','hat','v'],['wiegen','wog','hat gewogen','hat','v'],
  ['winden','wand','hat gewunden','hat','v'],['ziehen','zog','hat gezogen','hat','v'],
  ['zwingen','zwang','hat gezwungen','hat','v']
];

// ===========================================================
// 3. ESTRUCTURA DE NIVELES (18 subniveles)
// ===========================================================
window.MULLER_RUTA_LEVELS = [
  // ── A1 ──
  { id:'a1-1', title:'Nivel 1 · Primeros pasos', badge:'A1.1', lessons:[
    { id:'a1-1-l1', title:'Saludos y presentación', topic:'presentacion', rewardCoins:10, rewardXp:15,
      grammarTip:'El verbo conjugado va en 2ª posición: Ich bin Ana.',
      phrases:[{de:'Ich bin Ana.',es:'Soy Ana.'},{de:'Ich komme aus Spanien.',es:'Vengo de España.'},{de:'Ich lerne Deutsch.',es:'Aprendo alemán.'}],
      exerciseType:'fill', exerciseQ:'Ich ___ Ana.', exerciseA:'bin' },
    { id:'a1-1-l2', title:'Artículos básicos', topic:'clase', rewardCoins:10, rewardXp:15,
      grammarTip:'Memoriza sustantivo + artículo: der Tisch, die Tür, das Buch.',
      phrases:[{de:'Das ist ein Buch.',es:'Eso es un libro.'},{de:'Die Tür ist offen.',es:'La puerta está abierta.'}],
      exerciseType:'fill', exerciseQ:'Das ist ___ Buch.', exerciseA:'ein' },
    { id:'a1-1-l3', title:'Verbos básicos', topic:'verbos', rewardCoins:10, rewardXp:15,
      grammarTip:'sein y haben: Ich bin, du bist, er ist / ich habe, du hast, er hat.',
      phrases:[{de:'Ich habe einen Hund.',es:'Tengo un perro.'},{de:'Bist du müde?',es:'¿Estás cansado?'}],
      exerciseType:'fill', exerciseQ:'Ich ___ einen Hund.', exerciseA:'habe' }
  ]},
  { id:'a1-2', title:'Nivel 2 · Primera rutina', badge:'A1.2', lessons:[
    { id:'a1-2-l1', title:'Hora y días', topic:'rutina', rewardCoins:12, rewardXp:18,
      grammarTip:'"Um acht Uhr" = a las ocho. Días con mayúscula: Montag.',
      phrases:[{de:'Ich stehe um sieben Uhr auf.',es:'Me levanto a las siete.'},{de:'Am Montag gehe ich zur Arbeit.',es:'El lunes voy al trabajo.'}],
      exerciseType:'fill', exerciseQ:'Ich stehe ___ sieben Uhr auf.', exerciseA:'um' },
    { id:'a1-2-l2', title:'Comida y bebida', topic:'alimentos', rewardCoins:12, rewardXp:18,
      grammarTip:'"Ich möchte" + Akkusativ: Ich möchte einen Kaffee.',
      phrases:[{de:'Ich möchte einen Kaffee.',es:'Quiero un café.'},{de:'Was isst du gern?',es:'¿Qué te gusta comer?'}],
      exerciseType:'fill', exerciseQ:'Ich möchte ___ Kaffee.', exerciseA:'einen' }
  ]},
  { id:'a1-3', title:'Nivel 3 · Cuerpo y ciudad', badge:'A1.3', lessons:[
    { id:'a1-3-l1', title:'Partes del cuerpo', topic:'cuerpo', rewardCoins:12, rewardXp:18,
      grammarTip:'Los artículos: der Kopf (m), die Hand (f), das Auge (n).',
      phrases:[{de:'Der Kopf tut weh.',es:'La cabeza duele.'},{de:'Ich wasche mir die Hände.',es:'Me lavo las manos.'}],
      exerciseType:'fill', exerciseQ:'Der ___ tut weh.', exerciseA:'Kopf' },
    { id:'a1-3-l2', title:'En la ciudad', topic:'ciudad', rewardCoins:12, rewardXp:18,
      grammarTip:'"Wo?" + Dativ: in der Stadt, im Park.',
      phrases:[{de:'Das Kino ist in der Stadt.',es:'El cine está en la ciudad.'},{de:'Der Park ist schön.',es:'El parque es bonito.'}],
      exerciseType:'fill', exerciseQ:'Das Kino ist in ___ Stadt.', exerciseA:'der' }
  ]},
  { id:'a1-4', title:'Nivel 4 · Casa y cocina', badge:'A1.4', lessons:[
    { id:'a1-4-l1', title:'En la cocina', topic:'cocina', rewardCoins:12, rewardXp:18,
      grammarTip:'Artículo correcto: der Löffel, die Gabel, das Messer.',
      phrases:[{de:'Der Löffel ist auf dem Tisch.',es:'La cuchara está en la mesa.'},{de:'Die Gabel ist sauber.',es:'El tenedor está limpio.'}],
      exerciseType:'choose', exerciseQ:'___ Teller ist rund.', exerciseA:'Der',
      options:['Der','Die','Das'] }
  ]},
  // ── A2 ──
  { id:'a2-1', title:'Nivel 5 · Viajes y transporte', badge:'A2.1', lessons:[
    { id:'a2-1-l1', title:'En la estación', topic:'transporte', rewardCoins:15, rewardXp:22,
      grammarTip:'"Ich fahre mit dem Zug" = medio de transporte en Dativ.',
      phrases:[{de:'Ich fahre mit dem Zug nach Berlin.',es:'Voy en tren a Berlín.'},{de:'Der Zug hat Verspätung.',es:'El tren lleva retraso.'}],
      exerciseType:'fill', exerciseQ:'Ich fahre mit ___ Zug.', exerciseA:'dem' },
    { id:'a2-1-l2', title:'En el hotel', topic:'viajes', rewardCoins:15, rewardXp:22,
      grammarTip:'"Ich möchte ein Zimmer reservieren" = verbos modales corteses.',
      phrases:[{de:'Ich möchte ein Zimmer reservieren.',es:'Quiero reservar una habitación.'}],
      exerciseType:'fill', exerciseQ:'Ich möchte ein ___ reservieren.', exerciseA:'Zimmer' }
  ]},
  { id:'a2-2', title:'Nivel 6 · Salud y emociones', badge:'A2.2', lessons:[
    { id:'a2-2-l1', title:'En el médico', topic:'salud', rewardCoins:15, rewardXp:22,
      grammarTip:'"Ich habe Schmerzen in..." + Dativ.',
      phrases:[{de:'Ich habe Kopfschmerzen.',es:'Tengo dolor de cabeza.'},{de:'Der Arzt verschreibt Medikamente.',es:'El médico receta medicamentos.'}],
      exerciseType:'fill', exerciseQ:'Ich habe ___ Schmerzen.', exerciseA:'Kopf' },
    { id:'a2-2-l2', title:'Sentimientos', topic:'emociones', rewardCoins:15, rewardXp:22,
      grammarTip:'"sich fühlen" = sentirse. Ich fühle mich gut.',
      phrases:[{de:'Ich fühle mich heute gut.',es:'Hoy me siento bien.'},{de:'Bist du traurig?',es:'¿Estás triste?'}],
      exerciseType:'fill', exerciseQ:'Ich fühle ___ gut.', exerciseA:'mich' }
  ]},
  { id:'a2-3', title:'Nivel 7 · Ropa y tecnología', badge:'A2.3', lessons:[
    { id:'a2-3-l1', title:'La ropa', topic:'ropa', rewardCoins:15, rewardXp:22,
      grammarTip:'"Ich trage ein Kleid" = llevo un vestido. Anprobieren = probarse.',
      phrases:[{de:'Ich trage heute ein Kleid.',es:'Hoy llevo un vestido.'},{de:'Die Jacke ist zu teuer.',es:'La chaqueta es muy cara.'}],
      exerciseType:'choose', exerciseQ:'___ Kleid ist rot.', exerciseA:'Das',
      options:['Der','Die','Das'] },
    { id:'a2-3-l2', title:'Tecnología', topic:'tecnologia', rewardCoins:15, rewardXp:22,
      grammarTip:'Verbos separables: "Ich lade das Handy auf."',
      phrases:[{de:'Ich lade das Handy auf.',es:'Cargo el móvil.'},{de:'Der Drucker funktioniert nicht.',es:'La impresora no funciona.'}],
      exerciseType:'fill', exerciseQ:'Ich lade das Handy ___.', exerciseA:'auf' }
  ]},
  { id:'a2-4', title:'Nivel 8 · Personalidad', badge:'A2.4', lessons:[
    { id:'a2-4-l1', title:'Adjetivos de carácter', topic:'personalidad', rewardCoins:15, rewardXp:22,
      grammarTip:'Adjetivos después de "ist" se quedan igual: Er ist nett.',
      phrases:[{de:'Er ist sehr freundlich.',es:'Él es muy amable.'},{de:'Mein Bruder ist mutig.',es:'Mi hermano es valiente.'}],
      exerciseType:'choose', exerciseQ:'Sie ist sehr ___.', exerciseA:'nett',
      options:['nett','netter','nette'] }
  ]},
  // ── B1 ──
  { id:'b1-1', title:'Nivel 9 · Trabajo y economía', badge:'B1.1', lessons:[
    { id:'b1-1-l1', title:'Preposiciones genitivo', topic:'preposiciones', rewardCoins:18, rewardXp:26,
      grammarTip:'trotz, wegen, während, statt + Genitiv.',
      phrases:[{de:'Wegen des Regens bleibe ich zu Hause.',es:'Por la lluvia me quedo en casa.'},{de:'Trotz des Geldes ist er unzufrieden.',es:'A pesar del dinero está insatisfecho.'}],
      exerciseType:'fill', exerciseQ:'Wegen ___ Regens bleibe ich.', exerciseA:'des' },
    { id:'b1-1-l2', title:'Oraciones con weil/dass', topic:'conectores', rewardCoins:18, rewardXp:26,
      grammarTip:'"weil" manda el verbo al final: Ich lerne, weil ich reisen möchte.',
      phrases:[{de:'Ich lerne, weil ich reisen möchte.',es:'Estudio porque quiero viajar.'},{de:'Er sagt, dass er krank ist.',es:'Él dice que está enfermo.'}],
      exerciseType:'fill', exerciseQ:'Ich lerne, weil ich reisen ___.', exerciseA:'möchte' }
  ]},
  { id:'b1-2', title:'Nivel 10 · Sociedad y cultura', badge:'B1.2', lessons:[
    { id:'b1-2-l1', title:'Conectores adversativos', topic:'conectores', rewardCoins:18, rewardXp:26,
      grammarTip:'"obwohl" manda el verbo al final: Obwohl es regnet, gehe ich spazieren.',
      phrases:[{de:'Obwohl es regnet, gehe ich spazieren.',es:'Aunque llueve, salgo a pasear.'}],
      exerciseType:'fill', exerciseQ:'Obwohl es ___, gehe ich spazieren.', exerciseA:'regnet' },
    { id:'b1-2-l2', title:'Konnektoren C1', topic:'conectores', rewardCoins:18, rewardXp:26,
      grammarTip:'"nichtsdestotrotz", "insofern", "folglich".',
      phrases:[{de:'Nichtsdestotrotz bleiben wir optimistisch.',es:'No obstante, seguimos optimistas.'}],
      exerciseType:'fill', exerciseQ:'Nichtsdestotrotz ___ wir optimistisch.', exerciseA:'bleiben' }
  ]},
  { id:'b1-3', title:'Nivel 11 · Deporte y ocio', badge:'B1.3', lessons:[
    { id:'b1-3-l1', title:'Konjunktiv II', topic:'gramatica', rewardCoins:18, rewardXp:26,
      grammarTip:'"Ich hätte gern...", "Könnten Sie...?" para peticiones corteses.',
      phrases:[{de:'Ich hätte gern einen Kaffee.',es:'Me gustaría un café.'},{de:'Könnten Sie mir helfen?',es:'¿Podría ayudarme?'}],
      exerciseType:'fill', exerciseQ:'Ich ___ gern einen Kaffee.', exerciseA:'hätte' }
  ]},
  { id:'b1-4', title:'Nivel 12 · Análisis y opinión', badge:'B1.4', lessons:[
    { id:'b1-4-l1', title:'Estructurar opiniones', topic:'opinion', rewardCoins:18, rewardXp:26,
      grammarTip:'"meiner Meinung nach" al inicio: Meiner Meinung nach ist das falsch.',
      phrases:[{de:'Meiner Meinung nach ist das falsch.',es:'En mi opinión, eso está mal.'}],
      exerciseType:'fill', exerciseQ:'Meiner ___ nach ist das falsch.', exerciseA:'Meinung' }
  ]},
  // ── B2 ──
  { id:'b2-1', title:'Nivel 13 · Economía', badge:'B2.1', lessons:[
    { id:'b2-1-l1', title:'Pasiva', topic:'gramatica', rewardCoins:22, rewardXp:32,
      grammarTip:'Pasiva: "würden" + participio. El agente con "von".',
      phrases:[{de:'Das Haus wird gebaut.',es:'La casa está siendo construida.'},{de:'Der Vertrag wurde unterschrieben.',es:'El contrato fue firmado.'}],
      exerciseType:'fill', exerciseQ:'Das Haus ___ gebaut.', exerciseA:'wird' },
    { id:'b2-1-l2', title:'Pasiva alternativas', topic:'gramatica', rewardCoins:22, rewardXp:32,
      grammarTip:'"man" alternativo a pasiva: Man sagt, dass...',
      phrases:[{de:'Man sagt, dass Deutsch schwer ist.',es:'Se dice que el alemán es difícil.'}],
      exerciseType:'fill', exerciseQ:'___ sagt, dass Deutsch schwer ist.', exerciseA:'Man' }
  ]},
  { id:'b2-2', title:'Nivel 14 · Relaciones', badge:'B2.2', lessons:[
    { id:'b2-2-l1', title:'Expresiones idiomáticas', topic:'expresiones', rewardCoins:25, rewardXp:36,
      grammarTip:'"ins Schwarze treffen" (dar en el clavo), "nur Bahnhof verstehen" (no entender nada).',
      phrases:[{de:'Du hast ins Schwarze getroffen!',es:'¡Diste en el clavo!'},{de:'Ich verstehe nur Bahnhof.',es:'No entiendo nada.'}],
      exerciseType:'fill', exerciseQ:'Ich verstehe nur ___.', exerciseA:'Bahnhof' },
    { id:'b2-2-l2', title:'Konjunktiv I', topic:'gramatica', rewardCoins:25, rewardXp:36,
      grammarTip:'Discurso indirecto: Er sagte, er habe keine Zeit.',
      phrases:[{de:'Er sagte, er habe keine Zeit.',es:'Dijo que no tenía tiempo.'}],
      exerciseType:'fill', exerciseQ:'Er sagte, er ___ keine Zeit.', exerciseA:'habe' }
  ]},
  { id:'b2-3', title:'Nivel 15 · Medios', badge:'B2.3', lessons:[
    { id:'b2-3-l1', title:'Relativsätze', topic:'gramatica', rewardCoins:25, rewardXp:36,
      grammarTip:'Pronombres relativos: der/die/das/dem/denen según función.',
      phrases:[{de:'Der Mann, der dort steht, ist mein Chef.',es:'El hombre que está allí es mi jefe.'}],
      exerciseType:'fill', exerciseQ:'Der Mann, ___ dort steht, ist mein Chef.', exerciseA:'der' }
  ]},
  { id:'b2-4', title:'Nivel 16 · Investigación', badge:'B2.4', lessons:[
    { id:'b2-4-l1', title:'Nominalisierung', topic:'estilo', rewardCoins:25, rewardXp:36,
      grammarTip:'Convertir verbos en sustantivos: "die Entscheidung treffen".',
      phrases:[{de:'Die Entscheidung wurde getroffen.',es:'Se tomó la decisión.'}],
      exerciseType:'fill', exerciseQ:'Die ___ wurde getroffen.', exerciseA:'Entscheidung' }
  ]},
  // ── C1 ──
  { id:'c1-1', title:'Nivel 17 · Precisión formal', badge:'C1.1', lessons:[
    { id:'c1-1-l1', title:'Conectores avanzados', topic:'conectores', rewardCoins:30, rewardXp:42,
      grammarTip:'"insofern", "folglich", "nichtsdestotrotz", "demzufolge".',
      phrases:[{de:'Demzufolge müssen wir handeln.',es:'Por consiguiente, debemos actuar.'}],
      exerciseType:'fill', exerciseQ:'Demzufolge ___ wir handeln.', exerciseA:'müssen' },
    { id:'c1-1-l2', title:'Argumentación', topic:'argumentacion', rewardCoins:30, rewardXp:42,
      grammarTip:'Estructura: These → Argument → Beispiel → Schluss.',
      phrases:[{de:'Es lässt sich nicht leugnen, dass...',es:'No se puede negar que...'}],
      exerciseType:'fill', exerciseQ:'Es lässt sich nicht ___, dass...', exerciseA:'leugnen' }
  ]},
  { id:'c1-2', title:'Nivel 18 · Maestría', badge:'C1.2', lessons:[
    { id:'c1-2-l1', title:'Matiz y precisión', topic:'estilo', rewardCoins:35, rewardXp:48,
      grammarTip:'Diferenciar "abstrakt/konkret", "spezifisch/generell", "kausal/kontingent".',
      phrases:[{de:'Diese These ist zu abstrakt.',es:'Esta tesis es demasiado abstracta.'}],
      exerciseType:'fill', exerciseQ:'Diese ___ ist zu abstrakt.', exerciseA:'These' },
    { id:'c1-2-l2', title:'Síntesis', topic:'sintesis', rewardCoins:35, rewardXp:48,
      grammarTip:'Recapitular con "zusammenfassend", "inwiefern", "im Großen und Ganzen".',
      phrases:[{de:'Zusammenfassend lässt sich sagen, dass...',es:'En resumen, se puede decir que...'}],
      exerciseType:'fill', exerciseQ:'___ lässt sich sagen, dass...', exerciseA:'Zusammenfassend' }
  ]}
];

// ===========================================================
// 4. GENERADOR ALGORÍTMICO DE EJERCICIOS (8 tipos)
// ===========================================================
R.EXERCISE_TYPES = ['fill','choose','plural','translateDE','translateES','conjugate','order','correct'];

// Elegir tipo ROTATORIO: fuerza variación entre los 8 tipos
R.pickExerciseType = function (word, levelId) {
  const [de, es, art, plural, tipo] = word || [];
  const ROTATION_KEY = 'muller_ruta_exercise_counter';
  let counter = parseInt(localStorage.getItem(ROTATION_KEY)) || 0;
  const allTypes = R.EXERCISE_TYPES; // ['fill','choose','plural','translateDE','translateES','conjugate','order','correct']
  const maxAttempts = allTypes.length * 2; // dar 2 vueltas completas para encontrar uno

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const type = allTypes[counter % allTypes.length];
    counter = (counter + 1) % allTypes.length;

    // Verificar si este tipo de ejercicio aplica para esta palabra
    let applies = true;
    if (type === 'plural' && (!plural || plural === '')) applies = false;
    if (type === 'conjugate' && tipo !== 'v') applies = false;

    if (applies) {
      localStorage.setItem(ROTATION_KEY, String(counter));
      return type;
    }
    // Si no aplica, continuar al siguiente tipo sin avanzar realmente
    // (ya avanzamos counter arriba, pero no lo guardamos hasta encontrar uno válido)
  }
  // Si ningún tipo aplica (muy raro), volver a fill
  return 'fill';
};

// Conjugación en presente de indicativo (alemán)
R.conjugateVerb = function (infinitive, pronoun) {
  const stem = infinitive.endsWith('en') ? infinitive.slice(0, -2)
    : infinitive.endsWith('n') ? infinitive.slice(0, -1)
    : infinitive;
  // Reglas de efügung (e) antes de st/t cuando stem acaba en t/d/chn/fn/tm/gn/dm
  const needsE = /[tdchnfngmß]$/i.test(stem);
  const conjMap = {
    'ich': stem + 'e',
    'du': stem + (needsE ? 'est' : 'st'),
    'er': stem + (needsE ? 'et' : 't'),
    'sie': stem + (needsE ? 'et' : 't'),
    'es': stem + (needsE ? 'et' : 't'),
    'wir': stem + 'en',
    'ihr': stem + 't',
    'sie': stem + 'en',
    'Sie': stem + 'en'
  };
  const key = pronoun.toLowerCase();
  return conjMap[key] || stem + 'en';
};

// Generar una frase ejemplo con sentido real + conjugación correcta
R.generateExample = function (word, levelId) {
  const [de, es, art, plural, tipo] = word;
  const lvl = parseInt(levelId.replace('A','').replace('B','').replace('C','').replace('.',''))||1;
  const artNom = art === 'die' ? 'Die' : art === 'das' ? 'Das' : art === 'der' ? 'Der' : 'Der';
  const artAkku = art === 'die' ? 'die' : art === 'das' ? 'das' : 'den';
  const artDat = art === 'die' ? 'der' : art === 'das' ? 'dem' : 'dem';
  // Pronombres
  const subjArr = ['ich','du','er','wir','sie'];
  const subj = subjArr[Math.floor(Math.random()*subjArr.length)];
  const subjCap = subj.charAt(0).toUpperCase() + subj.slice(1);
  // Adjetivos comunes por nivel
  const adjA1 = ['groß','klein','neu','schön','gut','alt','jung','schnell','langsam','warm','kalt'];
  const adjA2 = ['interessant','wichtig','toll','billig','teuer','sauber','schmutzig','freundlich','möglich'];
  const adjB1 = ['schwierig','einfach','notwendig','erfolgreich','gefährlich','berühmt','gemeinsam','ehrlich'];
  const adjB2 = ['unterhaltsam','umfangreich','gründlich','verantwortlich','beeindruckend','anspruchsvoll'];
  const advA1 = ['heute','gerne','oft','hier','dort','jetzt'];
  const advA2 = ['manchmal','täglich','meistens','deshalb','trotzdem','inzwischen'];
  const locA1 = ['zu Hause','im Park','in der Schule','im Büro','auf dem Tisch','in der Stadt'];
  const locA2 = ['im Restaurant','am Bahnhof','im Krankenhaus','auf der Arbeit','im Supermarkt','im Garten'];

  const pick = arr => arr[Math.floor(Math.random()*arr.length)];

  // ===== NIVEL A1 (lvl 1-2) =====
  if (lvl <= 2) {
    if (tipo === 'v') {
      const conj = R.conjugateVerb(de, subj);
      const adv = pick(advA1);
      if (Math.random() < 0.5) return `${subjCap} ${conj} ${adv}.`;          // "Ich gehe gerne."
      const obj = pick(['ein Buch','Wasser','Kaffee','Musik','Fußball']);
      return `${subjCap} ${conj} ${adv} ${obj}.`;                            // "Er spielt gerne Fußball."
    }
    if (tipo === 'n') {
      const adj = pick(adjA1);
      return `${artNom} ${de} ist ${adj}.`;                                   // "Der Hund ist klein."
    }
    if (tipo === 'adj') {
      const noun = pick(['das Wetter','der Film','das Essen','der Tag','die Musik']);
      return `${noun.charAt(0).toUpperCase()+noun.slice(1)} ist ${de}.`;     // "Das Wetter ist schön."
    }
    if (tipo === 'num') return `Das kostet ${de} Euro.`;                     // "Das kostet drei Euro."
    return `Das ist ${de}.`;
  }

  // ===== NIVEL A2 (lvl 3-4) =====
  if (lvl <= 4) {
    if (tipo === 'v') {
      const conj = R.conjugateVerb(de, subj);
      const adv = pick(advA2);
      if (Math.random() < 0.5) return `${subjCap} ${conj} ${adv}.`;
      return `${subjCap} ${conj} ${adv} ${pick(locA1)}.`;
    }
    if (tipo === 'n') {
      const adj = pick(adjA2);
      return `Ich finde ${artAkku} ${de} ${adj}.`;                          // "Ich finde den Film interessant."
    }
    if (tipo === 'adj') return `Das Wetter ist heute ${de}.`;               // "Das Wetter ist heute regnerisch."
    const habenConj = subj === 'ich' ? 'habe' : subj === 'du' ? 'hast' : 'hat';
    const indf = art === 'die' ? 'eine' : 'einen';
    return `${subjCap} ${habenConj} ${indf} ${de}.`;                        // "Er hat einen Hund."
  }

  // ===== NIVEL B1 (lvl 5-8) =====
  if (lvl <= 8) {
    if (tipo === 'v') {
      // Pretérito perfecto: haben/sein + Partizip
      const part = de.endsWith('en') ? 'ge' + de.slice(0,-2) + 't' : 'ge' + de + 't';
      const has = pick(['hat','hat','haben','hast']);
      return `${subjCap} ${has} ${part}, ${pick(['weil','obwohl','wenn'])} ${subj} ${R.conjugateVerb(de,subj)}.`; // "Er hat gelernt, weil er lernt."
    }
    if (tipo === 'n') {
      return `Kannst du mir ${artDat} ${de} ${pick(['geben','zeigen','bringen'])}?`; // "Kannst du mir dem Freund zeigen?"
    }
    if (tipo === 'adj') return `Diese Entscheidung ist ${de}.`;
    const conj2 = subj === 'ich' ? 'muss' : subj === 'du' ? 'musst' : 'muss';
    return `${subjCap} ${conj2} ${artAkku} ${de} ${pick(['kaufen','lesen','verstehen','finden'])}.`;
  }

  // ===== NIVEL B2 (lvl 9-12) =====
  if (lvl <= 12) {
    if (tipo === 'v') {
      const conj = R.conjugateVerb(de, subj);
      const kl = pick(['obwohl','weil','wenn','dass']);
      return `${subjCap} ${conj}, ${kl} ${subj} ${['viel','wenig','oft','nie'][Math.floor(Math.random()*4)]} ${['Zeit','Geld','Lust'][Math.floor(Math.random()*3)]} hat.`;
    }
    if (tipo === 'n') {
      return `In Bezug auf ${artDat} ${de} bin ich ${['anderer Meinung','optimistisch','skeptisch'][Math.floor(Math.random()*3)]}.`;
    }
    if (tipo === 'adj') return `Die Lage ist äußerst ${de}, ${pick(['was alle überrascht','wie erwartet','leider'])}.`;
    const conjSub = ['dass','ob','was'][Math.floor(Math.random()*3)];
    return `Ich bin mir nicht sicher, ${conjSub} ${de} ${['wichtig','richtig','möglich'][Math.floor(Math.random()*3)]} ist.`;
  }

  // ===== NIVEL C1 (lvl 13-18) =====
  const connectors = ['Insofern','Demzufolge','Nichtsdestotrotz','Hinsichtlich','Angesichts','Infolgedessen','Dementsprechend'];
  const con = pick(connectors);
  if (tipo === 'v') {
    const conj = R.conjugateVerb(de, subj);
    return `${con} ${subjCap} ${conj}, ${pick(['sodass','wodurch','woraufhin'])} alles ${['klappt','funktioniert','passt'][Math.floor(Math.random()*3)]}.`;
  }
  if (tipo === 'n') return `${con} spielt ${artNom} ${de} eine entscheidende Rolle im ${pick(['Prozess','System','Projekt','Alltag'])}.`;
  if (tipo === 'adj') return `Die Entwicklung ist ${con.toLowerCase()} ${de} ${['verlaufen','gewesen','geblieben'][Math.floor(Math.random()*3)]}.`;
  return `${con} ist ${de} von großer ${['Bedeutung','Relevanz','Wichtigkeit'][Math.floor(Math.random()*3)]}.`;
};

// Generar ejercicio completo
R.generateExercise = function (word, levelId) {
  const [de, es, art, plural, tipo] = word;
  const type = R.pickExerciseType(word, levelId);
  const example = R.generateExample(word, levelId);

  switch(type) {
    case 'fill': {
      const blank = '___';
      const prompt = example.replace(de, blank);
      return { type, prompt, answer: de, hint: `Traducción: ${es}`, word };
    }
    case 'choose': {
      if (tipo === 'n' && art) {
        const wrongArts = ['der','die','das'].filter(a => a !== art);
        const options = [art, ...wrongArts.slice(0,2)];
        const shuffled = options.sort(() => Math.random()-0.5);
        return { type, prompt: `¿Qué artículo lleva "${de}"?`, answer: art, options: shuffled, hint: `Significa: ${es}`, word };
      }
      if (tipo === 'v') {
        const conjugations = {
          'ich':['e',''],'du':['st','est'],'er':['t','et'],'wir':['en'],'ihr':['t'],'sie':['en']
        };
        const pronouns = Object.keys(conjugations);
        const p = pronouns[Math.floor(Math.random()*pronouns.length)];
        const base = de.endsWith('en') ? de.slice(0,-2) : de;
        const correct = base + (conjugations[p][0]||'en');
        const wrong = base + 'en';
        return { type, prompt: `Conjuga: ${p} (${es}) ${de}`, answer: correct, options: [correct, wrong, base+'t', base+'st'].sort(()=>Math.random()-0.5), hint: `Infinitivo: ${de}`, word };
      }
      const wrongDe = Object.values(R.VOCAB).flat().filter(w => w[0] !== de).sort(()=>Math.random()-0.5)[0];
      const wrong = wrongDe ? wrongDe[0] : 'Auto';
      return { type, prompt: `¿Cuál significa "${es}"?`, answer: de, options: [de, wrong].sort(()=>Math.random()-0.5), hint: 'Elige la palabra correcta', word };
    }
    case 'plural': {
      if (!plural) return R.generateExercise(word, 'fill');
      const wrongPlurals = [plural+'e', plural?.slice(0,-1)+'n', plural?.slice(0,-2)+'er'].filter(p => p !== plural).slice(0,2);
      if (wrongPlurals.length === 0) return R.generateExercise(word, 'fill');
      return { type, prompt: `¿Cuál es el plural de "${de}"?`, answer: plural, options: [plural, ...wrongPlurals].sort(()=>Math.random()-0.5), hint: `Significa: ${es}`, word };
    }
    case 'translateDE': {
      const esPart = es.split(',')[0].trim();
      return { type, prompt: `Traduce al alemán: "${esPart}"`, answer: de, hint: art ? `Artículo: ${art}` : '', word };
    }
    case 'translateES': {
      return { type, prompt: `Traduce al español: "${de}"`, answer: es, hint: art ? `Artículo: ${art}` : '', word };
    }
    case 'conjugate': {
      const verben = R.IRRVERBS[levelId.slice(0,2)] || R.IRRVERBS['A1'] || [];
      const verb = verben.find(v => v[0] === de);
      if (verb) {
        const forms = ['Präteritum','Perfekt'];
        const f = forms[Math.floor(Math.random()*forms.length)];
        if (f === 'Präteritum') return { type, prompt: `Präteritum de "${de}": ich ___`, answer: verb[1], hint: `es: ${es}`, word };
        return { type, prompt: `Perfekt de "${de}": ich ___`, answer: `${verb[3]} ${verb[2]}`, hint: `es: ${es}`, word };
      }
      return R.generateExercise(word, 'fill');
    }
    case 'order': {
      // Verificar que la palabra de aparezca intacta en la frase
      // (verbos separables como 'aufstehen' se conjugan separados)
      const wordAppears = example.includes(de);
      if (!wordAppears) {
        // Fallback a fill si la palabra no aparece literal en la frase
        const blank = '___';
        // Buscar la parte conjugada que corresponda
        const stem = de.endsWith('en') ? de.slice(0,-2) : de;
        const regex = new RegExp(stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*', 'i');
        const match = example.match(regex);
        if (match) {
          const prompt = example.replace(match[0], blank);
          return { type:'fill', prompt, answer: match[0], hint: `Infinitivo: ${de} (${es})`, word };
        }
        return R.generateExercise(word, 'fill');
      }
      const words = example.split(' ');
      const shuffled = [...words].sort(()=>Math.random()-0.5);
      return { type, prompt: 'Ordena las palabras:', answer: example, words: shuffled, hint: `es: ${es}`, word };
    }
    case 'correct': {
      if (!example.includes(de)) return R.generateExercise(word, 'fill');
      const wrongExample = example.replace(de, de.split('').sort(()=>Math.random()-0.5).join(''));
      return { type, prompt: `Corrige: "${wrongExample}"`, answer: example.replace(de,'***'+de+'***'), hint: `Palabra correcta: ${de} (${es})`, word };
    }
    default:
      return { type:'fill', prompt: example.replace(de, '___'), answer: de, hint: `es: ${es}`, word };
  }
};

// ===========================================================
// 5. SRS AVANZADO (SM-2 con matriz de errores)
// ===========================================================
R.getDefaultSRS = function () {
  return { srsData:{}, completed:{}, totalXp:0, coins:0, streak:0, lastDate:'', reviewSessions:0,
    errorMatrix:{}, // { 'wort': { fill:3, choose:1, ... } }
    sessionHistory:[] // [{date, wordsReviewed, correct, levelId}]
  };
};

R.loadProgress = function () {
  try {
    const raw = localStorage.getItem('muller_ruta_progress_v2');
    return raw ? {...R.getDefaultSRS(), ...JSON.parse(raw)} : R.getDefaultSRS();
  } catch(e) { return R.getDefaultSRS(); }
};

R.saveProgress = function (p) {
  try { localStorage.setItem('muller_ruta_progress_v2', JSON.stringify(p)); } catch(e) {}
};

R.updateSRS = function (word, exerciseType, correct, progress) {
  const srs = progress.srsData || {};
  const now = Date.now();
  // SM-2 intervals: 1d, 2d, 4d, 7d, 14d, 30d, 60d
  const intervals = [1,2,4,7,14,30,60];
  const key = word[0] || word.de || word;

  if (!srs[key]) {
    srs[key] = { level:0, nextReview:now, correct:0, incorrect:0, lastSeen:now, consecutiveCorrect:0 };
  }
  const entry = srs[key];
  entry.lastSeen = now;

  if (correct) {
    entry.correct++;
    entry.consecutiveCorrect = (entry.consecutiveCorrect||0) + 1;
    // SM-2: sube nivel si acierta 3 veces seguidas
    if (entry.consecutiveCorrect >= 3) {
      entry.level = Math.min(entry.level + 1, intervals.length - 1);
      entry.consecutiveCorrect = 0;
    }
  } else {
    entry.incorrect++;
    entry.consecutiveCorrect = 0;
    entry.level = Math.max(entry.level - 1, 0);
    // Track error type
    if (exerciseType) {
      progress.errorMatrix = progress.errorMatrix || {};
      if (!progress.errorMatrix[key]) progress.errorMatrix[key] = {};
      progress.errorMatrix[key][exerciseType] = (progress.errorMatrix[key][exerciseType]||0) + 1;
    }
  }
  entry.nextReview = now + intervals[entry.level] * 24 * 60 * 60 * 1000;

  progress.srsData = srs;
  R.saveProgress(progress);
  return entry;
};

R.getDueWords = function (level, limit) {
  const progress = R.loadProgress();
  const srs = progress.srsData || {};
  const now = Date.now();
  const vocab = R.VOCAB[level] || [];
  // Priorizar: palabras que nunca han sido vistas + palabras atrasadas
  const neverSeen = vocab.filter(w => !srs[w[0]]);
  const due = vocab.filter(w => srs[w[0]] && srs[w[0]].nextReview <= now);
  // Ordenar due por nivel de atraso (más atrasado primero)
  due.sort((a,b) => (srs[a[0]]?.nextReview||0) - (srs[b[0]]?.nextReview||0));
  // Mezclar: 60% due + 40% nuevas
  const limitNum = limit || 10;
  const numDue = Math.min(Math.ceil(limitNum * 0.6), due.length);
  const numNew = Math.min(limitNum - numDue, neverSeen.length);
  const selected = [...due.slice(0,numDue), ...neverSeen.slice(0,numNew)];
  // Si faltan, rellenar con due
  if (selected.length < limitNum) {
    const remaining = vocab.filter(w => !selected.includes(w));
    selected.push(...remaining.slice(0, limitNum - selected.length));
  }
  // Shuffle
  return selected.sort(() => Math.random()-0.5).slice(0, limitNum);
};

R.getDifficultWords = function (level, count) {
  const progress = R.loadProgress();
  const srs = progress.srsData || {};
  const errorMatrix = progress.errorMatrix || {};
  const vocab = R.VOCAB[level] || [];
  const scored = vocab.map(w => {
    const key = w[0];
    const s = srs[key];
    const e = errorMatrix[key];
    const errorScore = e ? Object.values(e).reduce((a,b)=>a+b,0) : 0;
    const failRate = s ? s.incorrect / Math.max(s.correct + s.incorrect, 1) : 0;
    return { word: w, score: errorScore + failRate * 10 };
  });
  scored.sort((a,b) => b.score - a.score);
  return scored.slice(0, count || 5).map(s => s.word);
};

R.getWeaknessAnalysis = function () {
  const progress = R.loadProgress();
  const errorMatrix = progress.errorMatrix || {};
  const typeCounts = {};
  Object.values(errorMatrix).forEach(errs => {
    Object.entries(errs).forEach(([type, count]) => {
      typeCounts[type] = (typeCounts[type]||0) + count;
    });
  });
  const sorted = Object.entries(typeCounts).sort((a,b) => b[1] - a[1]);
  return sorted; // [['fill', 12], ['conjugate', 8], ...]
};

// ===========================================================
// 6. FUNCIONES DE PROGRESO
// ===========================================================
R.isLessonUnlocked = function (levels, levelIdx, lessonIdx, completed) {
  if (!levels[levelIdx] || !levels[levelIdx].lessons[lessonIdx]) return false;
  if (levelIdx === 0 && lessonIdx === 0) return true;
  if (lessonIdx === 0) {
    const prev = levels[levelIdx - 1];
    return prev && prev.lessons.every(l => completed[l.id]);
  }
  const prevId = levels[levelIdx].lessons[lessonIdx - 1].id;
  return !!completed[prevId];
};

R.getLevelProgress = function (progress, level) {
  const completed = progress.completed || {};
  const total = level.lessons.length;
  const done = level.lessons.filter(l => completed[l.id]).length;
  return { total, done, pct: total > 0 ? (done/total)*100 : 0 };
};

R.getOverallProgress = function (levels, progress) {
  const completed = progress.completed || {};
  let totalLessons = 0, doneLessons = 0;
  levels.forEach(l => {
    l.lessons.forEach(lesson => {
      totalLessons++;
      if (completed[lesson.id]) doneLessons++;
    });
  });
  return { totalLessons, doneLessons, pct: totalLessons > 0 ? Math.round((doneLessons/totalLessons)*100) : 0 };
};

// Streak tracking
R.updateStreak = function (progress) {
  const today = new Date().toISOString().slice(0,10);
  const lastDate = progress.lastDate || '';
  if (lastDate === today) return progress; // ya registrado hoy

  const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  if (lastDate === yesterday) {
    progress.streak = (progress.streak || 0) + 1;
  } else if (lastDate !== today) {
    progress.streak = 1;
  }
  progress.lastDate = today;
  progress.reviewSessions = (progress.reviewSessions || 0) + 1;
  R.saveProgress(progress);
  return progress;
};

R.getStreak = function () {
  const p = R.loadProgress();
  return p.streak || 0;
};

// Hito XP
R.getRank = function (xp) {
  const ranks = [
    { name:'Anfänger', minXp:0, emoji:'🌱' },
    { name:'Sprachschüler', minXp:100, emoji:'🌿' },
    { name:'Wörtersammler', minXp:500, emoji:'📚' },
    { name:'Satzbaumeister', minXp:1000, emoji:'🏗️' },
    { name:'Grammatikguru', minXp:2000, emoji:'🧠' },
    { name:'Konversationsprofi', minXp:3500, emoji:'💬' },
    { name:'Sprachkünstler', minXp:5000, emoji:'🎨' },
    { name:'Deutschmeister', minXp:7500, emoji:'🏆' },
    { name:'Müller-Platin', minXp:10000, emoji:'💎' }
  ];
  return ranks.filter(r => xp >= r.minXp).pop() || ranks[0];
};

// ===========================================================
// 7. GENERADOR DE LECCIONES DE PRÁCTICA EXTRA (algorítmica)
// ===========================================================
R.generatePracticeLesson = function (levelId) {
  const words = R.getDueWords(levelId, 8);
  if (words.length === 0) {
    const allVocab = R.VOCAB[levelId] || [];
    words.push(...allVocab.slice(0, 8));
  }
  const exercises = words.map((w, i) => {
    const ex = R.generateExercise(w, levelId);
    return {
      id: `practice-${levelId}-${Date.now()}-${i}`,
      ...ex,
      rewardXp: 5,
      rewardCoins: 2
    };
  });
  return {
    id: `practice-${levelId}-${Date.now()}`,
    title: '🧠 Repaso inteligente',
    topic: 'repaso',
    grammarTip: 'Ejercicios basados en tus palabras pendientes de repaso.',
    phrases: [],
    exercises
  };
};

// ===========================================================
// 8. VOCABULARIO TOTAL
// ===========================================================
R.totalWords = function () {
  return Object.values(R.VOCAB).reduce((sum, arr) => sum + arr.length, 0);
};

})(window.Muller.Ruta);