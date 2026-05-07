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
,
    { id:'c1-2-l3', title:'Discurso', topic:'discurso', rewardCoins:35, rewardXp:48,
      grammarTip:'Erweiterte Partizipialattribute: die von den Wissenschaftlern durchgeführte Untersuchung.',
      phrases:[{de:'die Abstraktion spielt eine zentrale Rolle.',es:'El/la abstracción juega un papel central.'},{de:'Die Bedeutung der Abstraktions ist offensichtlich.',es:'La importancia de abstracción es obvia.'},{de:'Wir müssen die Abstraktion berücksichtigen.',es:'Debemos considerar abstracción.'},{de:'die Konkretisierung spielt eine zentrale Rolle.',es:'El/la concreción juega un papel central.'},{de:'Die Bedeutung der Konkretisierungs ist offensichtlich.',es:'La importancia de concreción es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Abstraktion' },
    { id:'c1-2-l4', title:'Ensayo', topic:'ensayo', rewardCoins:35, rewardXp:48,
      grammarTip:'Satzgefüge mit mehrfacher Einbettung: Verschachtelung von Nebensätzen.',
      phrases:[{de:'die Spezifizierung spielt eine zentrale Rolle.',es:'El/la especificación juega un papel central.'},{de:'Die Bedeutung der Spezifizierungs ist offensichtlich.',es:'La importancia de especificación es obvia.'},{de:'Wir müssen die Spezifizierung berücksichtigen.',es:'Debemos considerar especificación.'},{de:'die Generalisierung spielt eine zentrale Rolle.',es:'El/la generalización juega un papel central.'},{de:'Die Bedeutung der Generalisierungs ist offensichtlich.',es:'La importancia de generalización es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Spezifizierung ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'c1-2-l5', title:'Crítica literaria', topic:'critica-literaria', rewardCoins:35, rewardXp:48,
      grammarTip:'Cleft-Sätze: Was mich betrifft, so...; Was...angeht, so...',
      phrases:[{de:'die Typisierung spielt eine zentrale Rolle.',es:'El/la tipificación juega un papel central.'},{de:'Die Bedeutung der Typisierungs ist offensichtlich.',es:'La importancia de tipificación es obvia.'},{de:'Wir müssen die Typisierung berücksichtigen.',es:'Debemos considerar tipificación.'},{de:'die Klassifizierung spielt eine zentrale Rolle.',es:'El/la clasificación juega un papel central.'},{de:'Die Bedeutung der Klassifizierungs ist offensichtlich.',es:'La importancia de clasificación es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Typisierung"?', exerciseA:'Typisierungen' },
    { id:'c1-2-l6', title:'Abstracto', topic:'abstracto', rewardCoins:35, rewardXp:48,
      grammarTip:'Funktionsverbgefüge wissenschaftlich: einer Analyse unterziehen, in Betracht kommen.',
      phrases:[{de:'die Systematisierung spielt eine zentrale Rolle.',es:'El/la sistematización juega un papel central.'},{de:'Die Bedeutung der Systematisierungs ist offensichtlich.',es:'La importancia de sistematización es obvia.'},{de:'Wir müssen die Systematisierung berücksichtigen.',es:'Debemos considerar sistematización.'},{de:'die Strukturierung spielt eine zentrale Rolle.',es:'El/la estructuración juega un papel central.'},{de:'Die Bedeutung der Strukturierungs ist offensichtlich.',es:'La importancia de estructuración es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "sistematización"', exerciseA:'Systematisierung' },
    { id:'c1-2-l7', title:'Conceptual', topic:'conceptual', rewardCoins:35, rewardXp:48,
      grammarTip:'Distanzstellung: Er hat das Buch, das er gestern gekauft hatte, gelesen.',
      phrases:[{de:'die Koordination spielt eine zentrale Rolle.',es:'El/la coordinación juega un papel central.'},{de:'Die Bedeutung der Koordinations ist offensichtlich.',es:'La importancia de coordinación es obvia.'},{de:'Wir müssen die Koordination berücksichtigen.',es:'Debemos considerar coordinación.'},{de:'die Kooperation spielt eine zentrale Rolle.',es:'El/la cooperación juega un papel central.'},{de:'Die Bedeutung der Kooperations ist offensichtlich.',es:'La importancia de cooperación es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Koordination"', exerciseA:'coordinación' },
    { id:'c1-2-l8', title:'Formal', topic:'formal', rewardCoins:35, rewardXp:48,
      grammarTip:'Korrelat "es" vor Nebensätzen: Es ist erstaunlich, dass... Es kommt darauf an, ob...',
      phrases:[{de:'die Interaktion spielt eine zentrale Rolle.',es:'El/la interacción juega un papel central.'},{de:'Die Bedeutung der Interaktions ist offensichtlich.',es:'La importancia de interacción es obvia.'},{de:'Wir müssen die Interaktion berücksichtigen.',es:'Debemos considerar interacción.'},{de:'die Partizipation spielt eine zentrale Rolle.',es:'El/la participación juega un papel central.'},{de:'Die Bedeutung der Partizipations ist offensichtlich.',es:'La importancia de participación es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "interacción"', exerciseA:'Interaktion' },
    { id:'c1-1-l3', title:'Deducción', topic:'deduccion', rewardCoins:30, rewardXp:42,
      grammarTip:'Differenzierte Kausalität: aufgrund, infolge, mangels, kraft, zwecks + Genitiv.',
      phrases:[{de:'die Konsequenz spielt eine zentrale Rolle.',es:'El/la consecuencia juega un papel central.'},{de:'Die Bedeutung der Konsequenzs ist offensichtlich.',es:'La importancia de consecuencia es obvia.'},{de:'Wir müssen die Konsequenz berücksichtigen.',es:'Debemos considerar consecuencia.'},{de:'die Implikation spielt eine zentrale Rolle.',es:'El/la implicación juega un papel central.'},{de:'Die Bedeutung der Implikations ist offensichtlich.',es:'La importancia de implicación es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Konsequenz' },
    { id:'c1-1-l4', title:'Contraste', topic:'contraste', rewardCoins:30, rewardXp:42,
      grammarTip:'Module Angaben: erwartungsgemäß, planmäßig, notfalls, gegebenenfalls, erforderlichenfalls.',
      phrases:[{de:'die Bedingung spielt eine zentrale Rolle.',es:'El/la condición juega un papel central.'},{de:'Die Bedeutung der Bedingungs ist offensichtlich.',es:'La importancia de condición es obvia.'},{de:'Wir müssen die Bedingung berücksichtigen.',es:'Debemos considerar condición.'},{de:'die Grundlage spielt eine zentrale Rolle.',es:'El/la base juega un papel central.'},{de:'Die Bedeutung der Grundlages ist offensichtlich.',es:'La importancia de base es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Bedingung ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'c1-1-l5', title:'Causalidad', topic:'causalidad', rewardCoins:30, rewardXp:42,
      grammarTip:'Abstrakte Nomen-Verb-Verbindungen: in Abrede stellen, zur Diskussion stellen.',
      phrases:[{de:'die These spielt eine zentrale Rolle.',es:'El/la tesis juega un papel central.'},{de:'Die Bedeutung der Theses ist offensichtlich.',es:'La importancia de tesis es obvia.'},{de:'Wir müssen die These berücksichtigen.',es:'Debemos considerar tesis.'},{de:'die Antithese spielt eine zentrale Rolle.',es:'El/la antítesis juega un papel central.'},{de:'Die Bedeutung der Antitheses ist offensichtlich.',es:'La importancia de antítesis es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "These"?', exerciseA:'Thesen' },
    { id:'c1-1-l6', title:'Matiz', topic:'matiz', rewardCoins:30, rewardXp:42,
      grammarTip:'Nominalstil nominal: seitens, hinsichtlich, bezüglich, betreffs, mangels.',
      phrases:[{de:'das Paradigma spielt eine zentrale Rolle.',es:'El/la paradigma juega un papel central.'},{de:'Die Bedeutung des Paradigmas ist offensichtlich.',es:'La importancia de paradigma es obvia.'},{de:'Wir müssen das Paradigma berücksichtigen.',es:'Debemos considerar paradigma.'},{de:'die Perspektive spielt eine zentrale Rolle.',es:'El/la perspectiva juega un papel central.'},{de:'Die Bedeutung der Perspektives ist offensichtlich.',es:'La importancia de perspectiva es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "paradigma"', exerciseA:'Paradigma' },
    { id:'c1-1-l7', title:'Precisión', topic:'precision', rewardCoins:30, rewardXp:42,
      grammarTip:'Satzwertige Infinitivkonstruktionen: um zu, ohne zu, anstatt zu con sujeto propio.',
      phrases:[{de:'die Dimension spielt eine zentrale Rolle.',es:'El/la dimensión juega un papel central.'},{de:'Die Bedeutung der Dimensions ist offensichtlich.',es:'La importancia de dimensión es obvia.'},{de:'Wir müssen die Dimension berücksichtigen.',es:'Debemos considerar dimensión.'},{de:'der Faktor spielt eine zentrale Rolle.',es:'El/la factor juega un papel central.'},{de:'Die Bedeutung des Faktors ist offensichtlich.',es:'La importancia de factor es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Dimension"', exerciseA:'dimensión' },
    { id:'c1-1-l8', title:'Retórica', topic:'retorica', rewardCoins:30, rewardXp:42,
      grammarTip:'Mehrgliedrige Konnektoren: geschweige denn, umso mehr als, zumal.',
      phrases:[{de:'die Konstante spielt eine zentrale Rolle.',es:'El/la constante juega un papel central.'},{de:'Die Bedeutung der Konstantes ist offensichtlich.',es:'La importancia de constante es obvia.'},{de:'Wir müssen die Konstante berücksichtigen.',es:'Debemos considerar constante.'},{de:'der Parameter spielt eine zentrale Rolle.',es:'El/la parámetro juega un papel central.'},{de:'Die Bedeutung des Parameters ist offensichtlich.',es:'La importancia de parámetro es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "constante"', exerciseA:'Konstante' },
    { id:'b2-4-l2', title:'Estudio', topic:'estudio', rewardCoins:25, rewardXp:36,
      grammarTip:'Schriftlicher Ausdruck: Verfügbarstellung, Inbetriebnahme, Inanspruchnahme.',
      phrases:[{de:'die Forschung spielt eine zentrale Rolle.',es:'El/la investigación juega un papel central.'},{de:'Die Bedeutung der Forschungs ist offensichtlich.',es:'La importancia de investigación es obvia.'},{de:'Wir müssen die Forschung berücksichtigen.',es:'Debemos considerar investigación.'},{de:'die Wissenschaft spielt eine zentrale Rolle.',es:'El/la ciencia juega un papel central.'},{de:'Die Bedeutung der Wissenschafts ist offensichtlich.',es:'La importancia de ciencia es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Forschung' },
    { id:'b2-4-l3', title:'Publicación', topic:'publicacion', rewardCoins:25, rewardXp:36,
      grammarTip:'Zusammengesetzte Substantive: die Forschungseinrichtung, der Wissenschaftsbetrieb.',
      phrases:[{de:'die Technologie spielt eine zentrale Rolle.',es:'El/la tecnología juega un papel central.'},{de:'Die Bedeutung der Technologies ist offensichtlich.',es:'La importancia de tecnología es obvia.'},{de:'Wir müssen die Technologie berücksichtigen.',es:'Debemos considerar tecnología.'},{de:'der Fortschritt spielt eine zentrale Rolle.',es:'El/la progreso juega un papel central.'},{de:'Die Bedeutung des Fortschritts ist offensichtlich.',es:'La importancia de progreso es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Technologie ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'b2-4-l4', title:'Congreso', topic:'congreso', rewardCoins:25, rewardXp:36,
      grammarTip:'Fachsprache nominal: Die Durchführung der Analyse erfolgte... (en lugar de analizar)',
      phrases:[{de:'die Innovation spielt eine zentrale Rolle.',es:'El/la innovación juega un papel central.'},{de:'Die Bedeutung der Innovations ist offensichtlich.',es:'La importancia de innovación es obvia.'},{de:'Wir müssen die Innovation berücksichtigen.',es:'Debemos considerar innovación.'},{de:'die Erfindung spielt eine zentrale Rolle.',es:'El/la invento juega un papel central.'},{de:'Die Bedeutung der Erfindungs ist offensichtlich.',es:'La importancia de invento es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Innovation"?', exerciseA:'Innovationen' },
    { id:'b2-4-l5', title:'Experimento', topic:'experimento', rewardCoins:25, rewardXp:36,
      grammarTip:'Textkohärenz: wiederaufgreifen, bezugnehmend auf, in Bezug auf, hinsichtlich.',
      phrases:[{de:'die Theorie spielt eine zentrale Rolle.',es:'El/la teoría juega un papel central.'},{de:'Die Bedeutung der Theories ist offensichtlich.',es:'La importancia de teoría es obvia.'},{de:'Wir müssen die Theorie berücksichtigen.',es:'Debemos considerar teoría.'},{de:'die Praxis spielt eine zentrale Rolle.',es:'El/la práctica juega un papel central.'},{de:'Die Bedeutung der Praxiss ist offensichtlich.',es:'La importancia de práctica es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "teoría"', exerciseA:'Theorie' },
    { id:'b2-4-l6', title:'Datos', topic:'datos', rewardCoins:25, rewardXp:36,
      grammarTip:'Konzessive Satzverbindungen: wenngleich, obschon, obzwar (formal/escrito).',
      phrases:[{de:'das Labor spielt eine zentrale Rolle.',es:'El/la laboratorio juega un papel central.'},{de:'Die Bedeutung des Labors ist offensichtlich.',es:'La importancia de laboratorio es obvia.'},{de:'Wir müssen das Labor berücksichtigen.',es:'Debemos considerar laboratorio.'},{de:'die Methode spielt eine zentrale Rolle.',es:'El/la método juega un papel central.'},{de:'Die Bedeutung der Methodes ist offensichtlich.',es:'La importancia de método es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Labor"', exerciseA:'laboratorio' },
    { id:'b2-4-l7', title:'Hipótesis', topic:'hipotesis', rewardCoins:25, rewardXp:36,
      grammarTip:'Kausale Satzverbindungen: dadurch dass, aufgrund dessen, infolgedessen.',
      phrases:[{de:'die Statistik spielt eine zentrale Rolle.',es:'El/la estadística juega un papel central.'},{de:'Die Bedeutung der Statistiks ist offensichtlich.',es:'La importancia de estadística es obvia.'},{de:'Wir müssen die Statistik berücksichtigen.',es:'Debemos considerar estadística.'},{de:'die Daten spielt eine zentrale Rolle.',es:'El/la datos juega un papel central.'},{de:'Die Bedeutung der Datens ist offensichtlich.',es:'La importancia de datos es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "estadística"', exerciseA:'Statistik' },
    { id:'b2-4-l8', title:'Estudio', topic:'estudio', rewardCoins:25, rewardXp:36,
      grammarTip:'Module Satzverbindungen: indem, dadurch dass, sodass, derart dass.',
      phrases:[{de:'die Schlussfolgerung spielt eine zentrale Rolle.',es:'El/la conclusión juega un papel central.'},{de:'Die Bedeutung der Schlussfolgerungs ist offensichtlich.',es:'La importancia de conclusión es obvia.'},{de:'Wir müssen die Schlussfolgerung berücksichtigen.',es:'Debemos considerar conclusión.'},{de:'die Hypothese spielt eine zentrale Rolle.',es:'El/la hipótesis juega un papel central.'},{de:'Die Bedeutung der Hypotheses ist offensichtlich.',es:'La importancia de hipótesis es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Schlussfolgerung"', exerciseA:'Schlussfolgerung' },
    { id:'b2-3-l2', title:'Periodismo', topic:'periodismo', rewardCoins:25, rewardXp:36,
      grammarTip:'Modalpartikeln: doch, ja, wohl, eigentlich, denn, mal. Matizan la frase.',
      phrases:[{de:'die Medien spielt eine zentrale Rolle.',es:'El/la medios juega un papel central.'},{de:'Die Bedeutung der Mediens ist offensichtlich.',es:'La importancia de medios es obvia.'},{de:'Wir müssen die Medien berücksichtigen.',es:'Debemos considerar medios.'},{de:'die Presse spielt eine zentrale Rolle.',es:'El/la prensa juega un papel central.'},{de:'Die Bedeutung der Presses ist offensichtlich.',es:'La importancia de prensa es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Medien' },
    { id:'b2-3-l3', title:'Redes sociales', topic:'redes', rewardCoins:25, rewardXp:36,
      grammarTip:'Modalpartikel "doch" para énfasis: Das ist doch klar! Das weiß doch jeder!',
      phrases:[{de:'das Fernsehen spielt eine zentrale Rolle.',es:'El/la televisión juega un papel central.'},{de:'Die Bedeutung des Fernsehens ist offensichtlich.',es:'La importancia de televisión es obvia.'},{de:'Wir müssen das Fernsehen berücksichtigen.',es:'Debemos considerar televisión.'},{de:'die Nachrichten spielt eine zentrale Rolle.',es:'El/la noticias juega un papel central.'},{de:'Die Bedeutung der Nachrichtens ist offensichtlich.',es:'La importancia de noticias es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Fernsehen ist gut.', exerciseA:'Das',
      options:['Der','Die','Das'], },
    { id:'b2-3-l4', title:'Opinión pública', topic:'opinion-publica', rewardCoins:25, rewardXp:36,
      grammarTip:'Modalpartikel "eigentlich": Was machst du eigentlich? (suaviza/curiosidad)',
      phrases:[{de:'der Journalist spielt eine zentrale Rolle.',es:'El/la periodista juega un papel central.'},{de:'Die Bedeutung des Journalists ist offensichtlich.',es:'La importancia de periodista es obvia.'},{de:'Wir müssen den Journalist berücksichtigen.',es:'Debemos considerar periodista.'},{de:'der Reporter spielt eine zentrale Rolle.',es:'El/la reportero juega un papel central.'},{de:'Die Bedeutung des Reporters ist offensichtlich.',es:'La importancia de reportero es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Journalist"?', exerciseA:'Journalisten' },
    { id:'b2-3-l5', title:'Entrevista', topic:'entrevista', rewardCoins:25, rewardXp:36,
      grammarTip:'Modalpartikel "mal" para informalidad: Komm mal her! Guck mal!',
      phrases:[{de:'der Artikel spielt eine zentrale Rolle.',es:'El/la artículo juega un papel central.'},{de:'Die Bedeutung des Artikels ist offensichtlich.',es:'La importancia de artículo es obvia.'},{de:'Wir müssen den Artikel berücksichtigen.',es:'Debemos considerar artículo.'},{de:'die Schlagzeile spielt eine zentrale Rolle.',es:'El/la titular juega un papel central.'},{de:'Die Bedeutung der Schlagzeiles ist offensichtlich.',es:'La importancia de titular es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "artículo"', exerciseA:'Artikel' },
    { id:'b2-3-l6', title:'Reportaje', topic:'reportaje', rewardCoins:25, rewardXp:36,
      grammarTip:'Modalverb + PassivInfinitiv: Das muss noch gemacht werden.',
      phrases:[{de:'das Interview spielt eine zentrale Rolle.',es:'El/la entrevista juega un papel central.'},{de:'Die Bedeutung des Interviews ist offensichtlich.',es:'La importancia de entrevista es obvia.'},{de:'Wir müssen das Interview berücksichtigen.',es:'Debemos considerar entrevista.'},{de:'die Reportage spielt eine zentrale Rolle.',es:'El/la reportaje juega un papel central.'},{de:'Die Bedeutung der Reportages ist offensichtlich.',es:'La importancia de reportaje es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Interview"', exerciseA:'entrevista' },
    { id:'b2-3-l7', title:'Medios', topic:'medios', rewardCoins:25, rewardXp:36,
      grammarTip:'Anredepronomen: du (informal) vs Sie (formal). En cartas: Du/Sie en mayúscula.',
      phrases:[{de:'die Sendung spielt eine zentrale Rolle.',es:'El/la programa juega un papel central.'},{de:'Die Bedeutung der Sendungs ist offensichtlich.',es:'La importancia de programa es obvia.'},{de:'Wir müssen die Sendung berücksichtigen.',es:'Debemos considerar programa.'},{de:'der Moderator spielt eine zentrale Rolle.',es:'El/la presentador juega un papel central.'},{de:'Die Bedeutung des Moderators ist offensichtlich.',es:'La importancia de presentador es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "programa"', exerciseA:'Sendung' },
    { id:'b2-3-l8', title:'Periodismo', topic:'periodismo', rewardCoins:25, rewardXp:36,
      grammarTip:'Konnektoren: nicht nur...sondern auch, sowohl...als auch, weder...noch.',
      phrases:[{de:'die Einschaltquote spielt eine zentrale Rolle.',es:'El/la audiencia juega un papel central.'},{de:'Die Bedeutung der Einschaltquotes ist offensichtlich.',es:'La importancia de audiencia es obvia.'},{de:'Wir müssen die Einschaltquote berücksichtigen.',es:'Debemos considerar audiencia.'},{de:'die Werbung spielt eine zentrale Rolle.',es:'El/la publicidad juega un papel central.'},{de:'Die Bedeutung der Werbungs ist offensichtlich.',es:'La importancia de publicidad es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Einschaltquote"', exerciseA:'Einschaltquote' },
    { id:'b2-2-l3', title:'Amistad', topic:'amistad', rewardCoins:25, rewardXp:36,
      grammarTip:'Nebensätze mit "je...desto/umso" (proporción): Je mehr man lernt, desto besser wird man.',
      phrases:[{de:'der Alltag spielt eine zentrale Rolle.',es:'El/la día a día juega un papel central.'},{de:'Die Bedeutung des Alltags ist offensichtlich.',es:'La importancia de día a día es obvia.'},{de:'Wir müssen den Alltag berücksichtigen.',es:'Debemos considerar día a día.'},{de:'die Routine spielt eine zentrale Rolle.',es:'El/la rutina juega un papel central.'},{de:'Die Bedeutung der Routines ist offensichtlich.',es:'La importancia de rutina es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Alltag' },
    { id:'b2-2-l4', title:'Conflicto', topic:'conflicto', rewardCoins:25, rewardXp:36,
      grammarTip:'irrealer Wunschsatz (GEGENWART): Wenn ich doch Zeit hätte! (ojalá tuviera tiempo)',
      phrases:[{de:'die Angewohnheit spielt eine zentrale Rolle.',es:'El/la vicio juega un papel central.'},{de:'Die Bedeutung der Angewohnheits ist offensichtlich.',es:'La importancia de vicio es obvia.'},{de:'Wir müssen die Angewohnheit berücksichtigen.',es:'Debemos considerar vicio.'},{de:'der Lebensstil spielt eine zentrale Rolle.',es:'El/la estilo de vida juega un papel central.'},{de:'Die Bedeutung des Lebensstils ist offensichtlich.',es:'La importancia de estilo de vida es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Angewohnheit ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'b2-2-l5', title:'Acuerdo', topic:'acuerdo', rewardCoins:25, rewardXp:36,
      grammarTip:'irrealer Wunschsatz (VERGANGENHEIT): Wenn ich doch gekommen wäre! (ojalá hubiera venido)',
      phrases:[{de:'der Wohlstand spielt eine zentrale Rolle.',es:'El/la bienestar juega un papel central.'},{de:'Die Bedeutung des Wohlstands ist offensichtlich.',es:'La importancia de bienestar es obvia.'},{de:'Wir müssen den Wohlstand berücksichtigen.',es:'Debemos considerar bienestar.'},{de:'die Zufriedenheit spielt eine zentrale Rolle.',es:'El/la satisfacción juega un papel central.'},{de:'Die Bedeutung der Zufriedenheits ist offensichtlich.',es:'La importancia de satisfacción es obvia.'}],
      exerciseType:'fill', exerciseQ:'Ich ___ .', exerciseA:'Wohlstand' },
    { id:'b2-2-l6', title:'Sentimientos', topic:'sentimientos', rewardCoins:25, rewardXp:36,
      grammarTip:'Gleichsetzung mit "als ob": Er tut so, als ob er nichts wüsste.',
      phrases:[{de:'die Einsamkeit spielt eine zentrale Rolle.',es:'El/la soledad juega un papel central.'},{de:'Die Bedeutung der Einsamkeits ist offensichtlich.',es:'La importancia de soledad es obvia.'},{de:'Wir müssen die Einsamkeit berücksichtigen.',es:'Debemos considerar soledad.'},{de:'die Gemeinschaft spielt eine zentrale Rolle.',es:'El/la comunidad juega un papel central.'},{de:'Die Bedeutung der Gemeinschafts ist offensichtlich.',es:'La importancia de comunidad es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "soledad"', exerciseA:'Einsamkeit' },
    { id:'b2-2-l7', title:'Pareja', topic:'pareja', rewardCoins:25, rewardXp:36,
      grammarTip:'Es-Stellung: Es freut mich, dass du gekommen bist. Es ist wichtig zu lernen.',
      phrases:[{de:'die Beziehung spielt eine zentrale Rolle.',es:'El/la relación juega un papel central.'},{de:'Die Bedeutung der Beziehungs ist offensichtlich.',es:'La importancia de relación es obvia.'},{de:'Wir müssen die Beziehung berücksichtigen.',es:'Debemos considerar relación.'},{de:'die Bekanntschaft spielt eine zentrale Rolle.',es:'El/la conocido juega un papel central.'},{de:'Die Bedeutung der Bekanntschafts ist offensichtlich.',es:'La importancia de conocido es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Beziehung"', exerciseA:'relación' },
    { id:'b2-2-l8', title:'Comunicación', topic:'comunicacion', rewardCoins:25, rewardXp:36,
      grammarTip:'Vorangestelltes Genitivattribut (sächsischer Genitiv): Müllers Haus, Deutschlands Zukunft.',
      phrases:[{de:'die Partnerschaft spielt eine zentrale Rolle.',es:'El/la pareja juega un papel central.'},{de:'Die Bedeutung der Partnerschafts ist offensichtlich.',es:'La importancia de pareja es obvia.'},{de:'Wir müssen die Partnerschaft berücksichtigen.',es:'Debemos considerar pareja.'},{de:'die Ehe spielt eine zentrale Rolle.',es:'El/la matrimonio juega un papel central.'},{de:'Die Bedeutung der Ehes ist offensichtlich.',es:'La importancia de matrimonio es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "pareja"', exerciseA:'Partnerschaft' },
    { id:'b2-1-l3', title:'Gestión', topic:'gestion', rewardCoins:22, rewardXp:32,
      grammarTip:'Nominalisierung de verbos: lernen → das Lernen, entscheiden → die Entscheidung.',
      phrases:[{de:'die Wirtschaft spielt eine zentrale Rolle.',es:'El/la economía juega un papel central.'},{de:'Die Bedeutung der Wirtschafts ist offensichtlich.',es:'La importancia de economía es obvia.'},{de:'Wir müssen die Wirtschaft berücksichtigen.',es:'Debemos considerar economía.'},{de:'der Markt spielt eine zentrale Rolle.',es:'El/la mercado juega un papel central.'},{de:'Die Bedeutung des Markts ist offensichtlich.',es:'La importancia de mercado es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Wirtschaft' },
    { id:'b2-1-l4', title:'Inversión', topic:'inversion', rewardCoins:22, rewardXp:32,
      grammarTip:'Nominalisierung con -ung: vorbereiten → die Vorbereitung, verbinden → die Verbindung.',
      phrases:[{de:'die Industrie spielt eine zentrale Rolle.',es:'El/la industria juega un papel central.'},{de:'Die Bedeutung der Industries ist offensichtlich.',es:'La importancia de industria es obvia.'},{de:'Wir müssen die Industrie berücksichtigen.',es:'Debemos considerar industria.'},{de:'die Produktion spielt eine zentrale Rolle.',es:'El/la producción juega un papel central.'},{de:'Die Bedeutung der Produktions ist offensichtlich.',es:'La importancia de producción es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Industrie ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'b2-1-l5', title:'Análisis', topic:'analisis', rewardCoins:22, rewardXp:32,
      grammarTip:'Nominalisierung con -heit/-keit: frei → die Freiheit, möglich → die Möglichkeit.',
      phrases:[{de:'die Nachfrage spielt eine zentrale Rolle.',es:'El/la demanda juega un papel central.'},{de:'Die Bedeutung der Nachfrages ist offensichtlich.',es:'La importancia de demanda es obvia.'},{de:'Wir müssen die Nachfrage berücksichtigen.',es:'Debemos considerar demanda.'},{de:'das Angebot spielt eine zentrale Rolle.',es:'El/la oferta juega un papel central.'},{de:'Die Bedeutung des Angebots ist offensichtlich.',es:'La importancia de oferta es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Nachfrage"?', exerciseA:'Nachfragen' },
    { id:'b2-1-l6', title:'Negocios', topic:'negocios', rewardCoins:22, rewardXp:32,
      grammarTip:'Funktionsverbgefüge: zur Entscheidung bringen, in Betracht ziehen, zur Verfügung stellen.',
      phrases:[{de:'der Lieferant spielt eine zentrale Rolle.',es:'El/la proveedor juega un papel central.'},{de:'Die Bedeutung des Lieferants ist offensichtlich.',es:'La importancia de proveedor es obvia.'},{de:'Wir müssen den Lieferant berücksichtigen.',es:'Debemos considerar proveedor.'},{de:'der Hersteller spielt eine zentrale Rolle.',es:'El/la fabricante juega un papel central.'},{de:'Die Bedeutung des Herstellers ist offensichtlich.',es:'La importancia de fabricante es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "proveedor"', exerciseA:'Lieferant' },
    { id:'b2-1-l7', title:'Estrategia', topic:'estrategia', rewardCoins:22, rewardXp:32,
      grammarTip:'Genitivattribut: der Fortschritt der Wissenschaft, die Meinung des Experten.',
      phrases:[{de:'die Konkurrenz spielt eine zentrale Rolle.',es:'El/la competencia juega un papel central.'},{de:'Die Bedeutung der Konkurrenzs ist offensichtlich.',es:'La importancia de competencia es obvia.'},{de:'Wir müssen die Konkurrenz berücksichtigen.',es:'Debemos considerar competencia.'},{de:'das Monopol spielt eine zentrale Rolle.',es:'El/la monopolio juega un papel central.'},{de:'Die Bedeutung des Monopols ist offensichtlich.',es:'La importancia de monopolio es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Konkurrenz"', exerciseA:'competencia' },
    { id:'b2-1-l8', title:'Producción', topic:'produccion', rewardCoins:22, rewardXp:32,
      grammarTip:'Erweiterter Infinitiv mit "zu": den Plan, die Arbeit zu beenden.',
      phrases:[{de:'der Gewinn spielt eine zentrale Rolle.',es:'El/la ganancia juega un papel central.'},{de:'Die Bedeutung des Gewinns ist offensichtlich.',es:'La importancia de ganancia es obvia.'},{de:'Wir müssen den Gewinn berücksichtigen.',es:'Debemos considerar ganancia.'},{de:'der Verlust spielt eine zentrale Rolle.',es:'El/la pérdida juega un papel central.'},{de:'Die Bedeutung des Verlusts ist offensichtlich.',es:'La importancia de pérdida es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "ganancia"', exerciseA:'Gewinn' },
    { id:'b1-4-l2', title:'Argumentos', topic:'argumentos', rewardCoins:18, rewardXp:26,
      grammarTip:'Plusquamperfekt: hatte/war + Partizip. Nachdem ich gegessen hatte, ging ich spazieren.',
      phrases:[{de:'die Lösung spielt eine zentrale Rolle.',es:'El/la solución juega un papel central.'},{de:'Die Bedeutung der Lösungs ist offensichtlich.',es:'La importancia de solución es obvia.'},{de:'Wir müssen die Lösung berücksichtigen.',es:'Debemos considerar solución.'},{de:'das Problem spielt eine zentrale Rolle.',es:'El/la problema juega un papel central.'},{de:'Die Bedeutung des Problems ist offensichtlich.',es:'La importancia de problema es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Lösung' },
    { id:'b1-4-l3', title:'Crítica', topic:'critica', rewardCoins:18, rewardXp:26,
      grammarTip:'Nachdem + Plusquamperfekt → Präteritum: Secuencia temporal en pasado.',
      phrases:[{de:'die Herausforderung spielt eine zentrale Rolle.',es:'El/la desafío juega un papel central.'},{de:'Die Bedeutung der Herausforderungs ist offensichtlich.',es:'La importancia de desafío es obvia.'},{de:'Wir müssen die Herausforderung berücksichtigen.',es:'Debemos considerar desafío.'},{de:'die Möglichkeit spielt eine zentrale Rolle.',es:'El/la posibilidad juega un papel central.'},{de:'Die Bedeutung der Möglichkeits ist offensichtlich.',es:'La importancia de posibilidad es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Herausforderung ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'b1-4-l4', title:'Comparación', topic:'comparacion', rewardCoins:18, rewardXp:26,
      grammarTip:'Konjunktiv I presente: er habe, er sei, er werde. Para discurso indirecto.',
      phrases:[{de:'das Ziel spielt eine zentrale Rolle.',es:'El/la objetivo juega un papel central.'},{de:'Die Bedeutung des Ziels ist offensichtlich.',es:'La importancia de objetivo es obvia.'},{de:'Wir müssen das Ziel berücksichtigen.',es:'Debemos considerar objetivo.'},{de:'die Zukunft spielt eine zentrale Rolle.',es:'El/la futuro juega un papel central.'},{de:'Die Bedeutung der Zukunfts ist offensichtlich.',es:'La importancia de futuro es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Ziel"?', exerciseA:'Ziele' },
    { id:'b1-4-l5', title:'Conclusión', topic:'conclusion', rewardCoins:18, rewardXp:26,
      grammarTip:'Konjunktiv I pasado: er habe gehabt, er sei gewesen. Discurso indirecto pasado.',
      phrases:[{de:'die Gegenwart spielt eine zentrale Rolle.',es:'El/la presente juega un papel central.'},{de:'Die Bedeutung der Gegenwarts ist offensichtlich.',es:'La importancia de presente es obvia.'},{de:'Wir müssen die Gegenwart berücksichtigen.',es:'Debemos considerar presente.'},{de:'die Entscheidung spielt eine zentrale Rolle.',es:'El/la decisión juega un papel central.'},{de:'Die Bedeutung der Entscheidungs ist offensichtlich.',es:'La importancia de decisión es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "presente"', exerciseA:'Gegenwart' },
    { id:'b1-4-l6', title:'Perspectiva', topic:'perspectiva', rewardCoins:18, rewardXp:26,
      grammarTip:'Discurso indirecto: Er sagt, er komme morgen. Er sagte, er sei gestern gekommen.',
      phrases:[{de:'die Vorbereitung spielt eine zentrale Rolle.',es:'El/la preparación juega un papel central.'},{de:'Die Bedeutung der Vorbereitungs ist offensichtlich.',es:'La importancia de preparación es obvia.'},{de:'Wir müssen die Vorbereitung berücksichtigen.',es:'Debemos considerar preparación.'},{de:'die Durchführung spielt eine zentrale Rolle.',es:'El/la realización juega un papel central.'},{de:'Die Bedeutung der Durchführungs ist offensichtlich.',es:'La importancia de realización es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Vorbereitung"', exerciseA:'preparación' },
    { id:'b1-4-l7', title:'Evaluación', topic:'evaluacion', rewardCoins:18, rewardXp:26,
      grammarTip:'Partizip I como adjetivo: der lernende Student (el estudiante que aprende).',
      phrases:[{de:'die Auswirkung spielt eine zentrale Rolle.',es:'El/la consecuencia juega un papel central.'},{de:'Die Bedeutung der Auswirkungs ist offensichtlich.',es:'La importancia de consecuencia es obvia.'},{de:'Wir müssen die Auswirkung berücksichtigen.',es:'Debemos considerar consecuencia.'},{de:'die Ursache spielt eine zentrale Rolle.',es:'El/la causa juega un papel central.'},{de:'Die Bedeutung der Ursaches ist offensichtlich.',es:'La importancia de causa es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "consecuencia"', exerciseA:'Auswirkung' },
    { id:'b1-4-l8', title:'Argumentos', topic:'argumentos', rewardCoins:18, rewardXp:26,
      grammarTip:'Partizip I como adverbio: Er kam lachend herein (Entró riendo).',
      phrases:[{de:'der Zusammenhang spielt eine zentrale Rolle.',es:'El/la relación juega un papel central.'},{de:'Die Bedeutung des Zusammenhangs ist offensichtlich.',es:'La importancia de relación es obvia.'},{de:'Wir müssen den Zusammenhang berücksichtigen.',es:'Debemos considerar relación.'},{de:'der Unterschied spielt eine zentrale Rolle.',es:'El/la diferencia juega un papel central.'},{de:'Die Bedeutung des Unterschieds ist offensichtlich.',es:'La importancia de diferencia es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Zusammenhang"', exerciseA:'Zusammenhang' },
    { id:'b1-3-l2', title:'Hobbies', topic:'hobbies', rewardCoins:18, rewardXp:26,
      grammarTip:'Nebensätze mit "indem" (instrumento): Man lernt, indem man übt.',
      phrases:[{de:'die Gesundheit spielt eine zentrale Rolle.',es:'El/la salud juega un papel central.'},{de:'Die Bedeutung der Gesundheits ist offensichtlich.',es:'La importancia de salud es obvia.'},{de:'Wir müssen die Gesundheit berücksichtigen.',es:'Debemos considerar salud.'},{de:'die Ernährung spielt eine zentrale Rolle.',es:'El/la alimentación juega un papel central.'},{de:'Die Bedeutung der Ernährungs ist offensichtlich.',es:'La importancia de alimentación es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Gesundheit' },
    { id:'b1-3-l3', title:'Naturaleza', topic:'naturaleza', rewardCoins:18, rewardXp:26,
      grammarTip:'Nebensätze con "sodass" (consecuencia): Er lernte viel, sodass er die Prüfung bestand.',
      phrases:[{de:'der Sportart spielt eine zentrale Rolle.',es:'El/la deporte juega un papel central.'},{de:'Die Bedeutung des Sportarts ist offensichtlich.',es:'La importancia de deporte es obvia.'},{de:'Wir müssen den Sportart berücksichtigen.',es:'Debemos considerar deporte.'},{de:'das Training spielt eine zentrale Rolle.',es:'El/la entrenamiento juega un papel central.'},{de:'Die Bedeutung des Trainings ist offensichtlich.',es:'La importancia de entrenamiento es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Sportart ist gut.', exerciseA:'Der',
      options:['Der','Die','Das'], },
    { id:'b1-3-l4', title:'Eventos', topic:'eventos', rewardCoins:18, rewardXp:26,
      grammarTip:'Nebensätze con "damit" (finalidad): Ich erkläre es, damit du es verstehst.',
      phrases:[{de:'der Spieler spielt eine zentrale Rolle.',es:'El/la jugador juega un papel central.'},{de:'Die Bedeutung des Spielers ist offensichtlich.',es:'La importancia de jugador es obvia.'},{de:'Wir müssen den Spieler berücksichtigen.',es:'Debemos considerar jugador.'},{de:'der Trainer spielt eine zentrale Rolle.',es:'El/la entrenador juega un papel central.'},{de:'Die Bedeutung des Trainers ist offensichtlich.',es:'La importancia de entrenador es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Spieler"?', exerciseA:'Spieler' },
    { id:'b1-3-l5', title:'Viajes', topic:'viajes', rewardCoins:18, rewardXp:26,
      grammarTip:'Infinitivsätze con "um...zu": Ich lerne Deutsch, um in Berlin zu arbeiten.',
      phrases:[{de:'der Gegner spielt eine zentrale Rolle.',es:'El/la adversario juega un papel central.'},{de:'Die Bedeutung des Gegners ist offensichtlich.',es:'La importancia de adversario es obvia.'},{de:'Wir müssen den Gegner berücksichtigen.',es:'Debemos considerar adversario.'},{de:'der Sieg spielt eine zentrale Rolle.',es:'El/la victoria juega un papel central.'},{de:'Die Bedeutung des Siegs ist offensichtlich.',es:'La importancia de victoria es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "adversario"', exerciseA:'Gegner' },
    { id:'b1-3-l6', title:'Ocio', topic:'ocio', rewardCoins:18, rewardXp:26,
      grammarTip:'Infinitivsätze con "ohne...zu": Er ging, ohne sich zu verabschieden.',
      phrases:[{de:'der Wettbewerb spielt eine zentrale Rolle.',es:'El/la competición juega un papel central.'},{de:'Die Bedeutung des Wettbewerbs ist offensichtlich.',es:'La importancia de competición es obvia.'},{de:'Wir müssen den Wettbewerb berücksichtigen.',es:'Debemos considerar competición.'},{de:'die Meisterschaft spielt eine zentrale Rolle.',es:'El/la campeonato juega un papel central.'},{de:'Die Bedeutung der Meisterschafts ist offensichtlich.',es:'La importancia de campeonato es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Wettbewerb"', exerciseA:'competición' },
    { id:'b1-3-l7', title:'Aficiones', topic:'aficiones', rewardCoins:18, rewardXp:26,
      grammarTip:'Infinitivsätze con "(an)statt...zu": Statt zu lernen, sieht er fern.',
      phrases:[{de:'der Zuschauer spielt eine zentrale Rolle.',es:'El/la espectador juega un papel central.'},{de:'Die Bedeutung des Zuschauers ist offensichtlich.',es:'La importancia de espectador es obvia.'},{de:'Wir müssen den Zuschauer berücksichtigen.',es:'Debemos considerar espectador.'},{de:'der Rekord spielt eine zentrale Rolle.',es:'El/la récord juega un papel central.'},{de:'Die Bedeutung des Rekords ist offensichtlich.',es:'La importancia de récord es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "espectador"', exerciseA:'Zuschauer' },
    { id:'b1-3-l8', title:'Hobbies', topic:'hobbies', rewardCoins:18, rewardXp:26,
      grammarTip:'Futur I: werden + Infinitiv. Ich werde morgen anrufen.',
      phrases:[{de:'der Verein spielt eine zentrale Rolle.',es:'El/la club juega un papel central.'},{de:'Die Bedeutung des Vereins ist offensichtlich.',es:'La importancia de club es obvia.'},{de:'Wir müssen den Verein berücksichtigen.',es:'Debemos considerar club.'},{de:'das Mitglied spielt eine zentrale Rolle.',es:'El/la miembro juega un papel central.'},{de:'Die Bedeutung des Mitglieds ist offensichtlich.',es:'La importancia de miembro es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Verein"', exerciseA:'Verein' },
    { id:'b1-2-l3', title:'Educación', topic:'educacion', rewardCoins:18, rewardXp:26,
      grammarTip:'Konjunktiv II Vergangenheit: hätte/wäre + Partizip. Ich wäre gern gekommen.',
      phrases:[{de:'die Gesellschaft spielt eine zentrale Rolle.',es:'El/la sociedad juega un papel central.'},{de:'Die Bedeutung der Gesellschafts ist offensichtlich.',es:'La importancia de sociedad es obvia.'},{de:'Wir müssen die Gesellschaft berücksichtigen.',es:'Debemos considerar sociedad.'},{de:'die Umwelt spielt eine zentrale Rolle.',es:'El/la medio ambiente juega un papel central.'},{de:'Die Bedeutung der Umwelts ist offensichtlich.',es:'La importancia de medio ambiente es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Gesellschaft' },
    { id:'b1-2-l4', title:'Noticias', topic:'noticias', rewardCoins:18, rewardXp:26,
      grammarTip:'Konjunktiv II mit Modalverben: ich könnte, ich müsste, ich sollte, ich dürfte, ich wollte.',
      phrases:[{de:'die Regierung spielt eine zentrale Rolle.',es:'El/la gobierno juega un papel central.'},{de:'Die Bedeutung der Regierungs ist offensichtlich.',es:'La importancia de gobierno es obvia.'},{de:'Wir müssen die Regierung berücksichtigen.',es:'Debemos considerar gobierno.'},{de:'das Gesetz spielt eine zentrale Rolle.',es:'El/la ley juega un papel central.'},{de:'Die Bedeutung des Gesetzs ist offensichtlich.',es:'La importancia de ley es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Regierung ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'b1-2-l5', title:'Debate', topic:'debate', rewardCoins:18, rewardXp:26,
      grammarTip:'Passiv Präsens: werden + Partizip. Das Haus wird gebaut.',
      phrases:[{de:'die Freiheit spielt eine zentrale Rolle.',es:'El/la libertad juega un papel central.'},{de:'Die Bedeutung der Freiheits ist offensichtlich.',es:'La importancia de libertad es obvia.'},{de:'Wir müssen die Freiheit berücksichtigen.',es:'Debemos considerar libertad.'},{de:'die Gerechtigkeit spielt eine zentrale Rolle.',es:'El/la justicia juega un papel central.'},{de:'Die Bedeutung der Gerechtigkeits ist offensichtlich.',es:'La importancia de justicia es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Freiheit"?', exerciseA:'Freiheiten' },
    { id:'b1-2-l6', title:'Cultura', topic:'cultura', rewardCoins:18, rewardXp:26,
      grammarTip:'Passiv Präteritum: wurde + Partizip. Das Haus wurde gebaut.',
      phrases:[{de:'der Krieg spielt eine zentrale Rolle.',es:'El/la guerra juega un papel central.'},{de:'Die Bedeutung des Kriegs ist offensichtlich.',es:'La importancia de guerra es obvia.'},{de:'Wir müssen den Krieg berücksichtigen.',es:'Debemos considerar guerra.'},{de:'die Macht spielt eine zentrale Rolle.',es:'El/la poder juega un papel central.'},{de:'Die Bedeutung der Machts ist offensichtlich.',es:'La importancia de poder es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "guerra"', exerciseA:'Krieg' },
    { id:'b1-2-l7', title:'Tradiciones', topic:'tradiciones', rewardCoins:18, rewardXp:26,
      grammarTip:'Passiv mit Modalverben: Das Haus muss gebaut werden. (MV + Partizip + werden)',
      phrases:[{de:'die Demokratie spielt eine zentrale Rolle.',es:'El/la democracia juega un papel central.'},{de:'Die Bedeutung der Demokraties ist offensichtlich.',es:'La importancia de democracia es obvia.'},{de:'Wir müssen die Demokratie berücksichtigen.',es:'Debemos considerar democracia.'},{de:'die Partei spielt eine zentrale Rolle.',es:'El/la partido juega un papel central.'},{de:'Die Bedeutung der Parteis ist offensichtlich.',es:'La importancia de partido es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Demokratie"', exerciseA:'democracia' },
    { id:'b1-2-l8', title:'Valores', topic:'valores', rewardCoins:18, rewardXp:26,
      grammarTip:'Passiv Perfekt: ist + Partizip + worden. Das Haus ist gebaut worden.',
      phrases:[{de:'der Bürger spielt eine zentrale Rolle.',es:'El/la ciudadano juega un papel central.'},{de:'Die Bedeutung des Bürgers ist offensichtlich.',es:'La importancia de ciudadano es obvia.'},{de:'Wir müssen den Bürger berücksichtigen.',es:'Debemos considerar ciudadano.'},{de:'der Ausländer spielt eine zentrale Rolle.',es:'El/la extranjero juega un papel central.'},{de:'Die Bedeutung des Ausländers ist offensichtlich.',es:'La importancia de extranjero es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "ciudadano"', exerciseA:'Bürger' },
    { id:'b1-1-l3', title:'Finanzas', topic:'finanzas', rewardCoins:18, rewardXp:26,
      grammarTip:'Preposiciones con Genitiv: während (durante), wegen (debido a), trotz (a pesar de), statt (en lugar de).',
      phrases:[{de:'die Erfahrung spielt eine zentrale Rolle.',es:'El/la experiencia juega un papel central.'},{de:'Die Bedeutung der Erfahrungs ist offensichtlich.',es:'La importancia de experiencia es obvia.'},{de:'Wir müssen die Erfahrung berücksichtigen.',es:'Debemos considerar experiencia.'},{de:'der Eindruck spielt eine zentrale Rolle.',es:'El/la impresión juega un papel central.'},{de:'Die Bedeutung des Eindrucks ist offensichtlich.',es:'La importancia de impresión es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Erfahrung' },
    { id:'b1-1-l4', title:'La empresa', topic:'empresa', rewardCoins:18, rewardXp:26,
      grammarTip:'Adjektivdeklination nach bestimmtem Artikel: der gute Mann, die gute Frau, das gute Kind.',
      phrases:[{de:'das Vorstellungsgespräch spielt eine zentrale Rolle.',es:'El/la entrevista juega un papel central.'},{de:'Die Bedeutung des Vorstellungsgesprächs ist offensichtlich.',es:'La importancia de entrevista es obvia.'},{de:'Wir müssen das Vorstellungsgespräch berücksichtigen.',es:'Debemos considerar entrevista.'},{de:'die Ausbildung spielt eine zentrale Rolle.',es:'El/la formación juega un papel central.'},{de:'Die Bedeutung der Ausbildungs ist offensichtlich.',es:'La importancia de formación es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Vorstellungsgespräch ist gut.', exerciseA:'Das',
      options:['Der','Die','Das'], },
    { id:'b1-1-l5', title:'Reuniones', topic:'reuniones', rewardCoins:18, rewardXp:26,
      grammarTip:'Adjektivdeklination nach unbestimmtem Artikel: ein guter Mann, eine gute Frau, ein gutes Kind.',
      phrases:[{de:'das Fach spielt eine zentrale Rolle.',es:'El/la asignatura juega un papel central.'},{de:'Die Bedeutung des Fachs ist offensichtlich.',es:'La importancia de asignatura es obvia.'},{de:'Wir müssen das Fach berücksichtigen.',es:'Debemos considerar asignatura.'},{de:'das Semester spielt eine zentrale Rolle.',es:'El/la semestre juega un papel central.'},{de:'Die Bedeutung des Semesters ist offensichtlich.',es:'La importancia de semestre es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Fach"?', exerciseA:'Fächer' },
    { id:'b1-1-l6', title:'Carrera', topic:'carrera', rewardCoins:18, rewardXp:26,
      grammarTip:'Adjektivdeklination ohne Artikel: guter Kaffee, gute Milch, gutes Brot.',
      phrases:[{de:'das Zeugnis spielt eine zentrale Rolle.',es:'El/la certificado juega un papel central.'},{de:'Die Bedeutung des Zeugniss ist offensichtlich.',es:'La importancia de certificado es obvia.'},{de:'Wir müssen das Zeugnis berücksichtigen.',es:'Debemos considerar certificado.'},{de:'der Abschluss spielt eine zentrale Rolle.',es:'El/la título juega un papel central.'},{de:'Die Bedeutung des Abschlusss ist offensichtlich.',es:'La importancia de título es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "certificado"', exerciseA:'Zeugnis' },
    { id:'b1-1-l7', title:'Mercado laboral', topic:'mercado', rewardCoins:18, rewardXp:26,
      grammarTip:'RelativsätzeNominativ: der Mann, der dort steht. Die Frau, die singt. Das Kind, das spielt.',
      phrases:[{de:'die Bibliothek spielt eine zentrale Rolle.',es:'El/la biblioteca juega un papel central.'},{de:'Die Bedeutung der Bibliotheks ist offensichtlich.',es:'La importancia de biblioteca es obvia.'},{de:'Wir müssen die Bibliothek berücksichtigen.',es:'Debemos considerar biblioteca.'},{de:'das Praktikum spielt eine zentrale Rolle.',es:'El/la prácticas juega un papel central.'},{de:'Die Bedeutung des Praktikums ist offensichtlich.',es:'La importancia de prácticas es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Bibliothek"', exerciseA:'biblioteca' },
    { id:'b1-1-l8', title:'Contratos', topic:'contratos', rewardCoins:18, rewardXp:26,
      grammarTip:'RelativsätzeAkkusativ: der Mann, den ich sehe. Die Frau, die ich kenne. Das Kind, das ich mag.',
      phrases:[{de:'die Wissenschaft spielt eine zentrale Rolle.',es:'El/la ciencia juega un papel central.'},{de:'Die Bedeutung der Wissenschafts ist offensichtlich.',es:'La importancia de ciencia es obvia.'},{de:'Wir müssen die Wissenschaft berücksichtigen.',es:'Debemos considerar ciencia.'},{de:'das Unternehmen spielt eine zentrale Rolle.',es:'El/la empresa juega un papel central.'},{de:'Die Bedeutung des Unternehmens ist offensichtlich.',es:'La importancia de empresa es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "ciencia"', exerciseA:'Wissenschaft' },
    { id:'a2-4-l2', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Presta atención a la estructura de la oración.',
      phrases:[{de:'das Gefühl spielt eine zentrale Rolle.',es:'El/la sentimiento juega un papel central.'},{de:'Die Bedeutung des Gefühls ist offensichtlich.',es:'La importancia de sentimiento es obvia.'},{de:'Wir müssen das Gefühl berücksichtigen.',es:'Debemos considerar sentimiento.'},{de:'die Freude spielt eine zentrale Rolle.',es:'El/la alegría juega un papel central.'},{de:'Die Bedeutung der Freudes ist offensichtlich.',es:'La importancia de alegría es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Gefühl' },
    { id:'a2-4-l3', title:'Tema: general2', topic:'general2', rewardCoins:10, rewardXp:15,
      grammarTip:'El verbo conjugado va en segunda posición.',
      phrases:[{de:'die Liebe spielt eine zentrale Rolle.',es:'El/la amor juega un papel central.'},{de:'Die Bedeutung der Liebes ist offensichtlich.',es:'La importancia de amor es obvia.'},{de:'Wir müssen die Liebe berücksichtigen.',es:'Debemos considerar amor.'},{de:'die Angst spielt eine zentrale Rolle.',es:'El/la miedo juega un papel central.'},{de:'Die Bedeutung der Angsts ist offensichtlich.',es:'La importancia de miedo es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Liebe ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'a2-4-l4', title:'Tema: general3', topic:'general3', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Trauer spielt eine zentrale Rolle.',es:'El/la tristeza juega un papel central.'},{de:'Die Bedeutung der Trauers ist offensichtlich.',es:'La importancia de tristeza es obvia.'},{de:'Wir müssen die Trauer berücksichtigen.',es:'Debemos considerar tristeza.'},{de:'der Mut spielt eine zentrale Rolle.',es:'El/la valentía juega un papel central.'},{de:'Die Bedeutung des Muts ist offensichtlich.',es:'La importancia de valentía es obvia.'}],
      exerciseType:'fill', exerciseQ:'Ich ___ .', exerciseA:'Trauer' },
    { id:'a2-4-l5', title:'Tema: general4', topic:'general4', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Sehnsucht spielt eine zentrale Rolle.',es:'El/la anhelo juega un papel central.'},{de:'Die Bedeutung der Sehnsuchts ist offensichtlich.',es:'La importancia de anhelo es obvia.'},{de:'Wir müssen die Sehnsucht berücksichtigen.',es:'Debemos considerar anhelo.'},{de:'das Vertrauen spielt eine zentrale Rolle.',es:'El/la confianza juega un papel central.'},{de:'Die Bedeutung des Vertrauens ist offensichtlich.',es:'La importancia de confianza es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "anhelo"', exerciseA:'Sehnsucht' },
    { id:'a2-4-l6', title:'Tema: general5', topic:'general5', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Ruhe spielt eine zentrale Rolle.',es:'El/la calma juega un papel central.'},{de:'Die Bedeutung der Ruhes ist offensichtlich.',es:'La importancia de calma es obvia.'},{de:'Wir müssen die Ruhe berücksichtigen.',es:'Debemos considerar calma.'},{de:'der Stress spielt eine zentrale Rolle.',es:'El/la estrés juega un papel central.'},{de:'Die Bedeutung des Stresss ist offensichtlich.',es:'La importancia de estrés es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Ruhe"', exerciseA:'calma' },
    { id:'a2-4-l7', title:'Tema: general6', topic:'general6', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Langeweile spielt eine zentrale Rolle.',es:'El/la aburrimiento juega un papel central.'},{de:'Die Bedeutung der Langeweiles ist offensichtlich.',es:'La importancia de aburrimiento es obvia.'},{de:'Wir müssen die Langeweile berücksichtigen.',es:'Debemos considerar aburrimiento.'},{de:'der Charakter spielt eine zentrale Rolle.',es:'El/la carácter juega un papel central.'},{de:'Die Bedeutung des Charakters ist offensichtlich.',es:'La importancia de carácter es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "aburrimiento"', exerciseA:'Langeweile' },
    { id:'a2-4-l8', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Stimmung spielt eine zentrale Rolle.',es:'El/la humor/ánimo juega un papel central.'},{de:'Die Bedeutung der Stimmungs ist offensichtlich.',es:'La importancia de humor/ánimo es obvia.'},{de:'Wir müssen die Stimmung berücksichtigen.',es:'Debemos considerar humor/ánimo.'},{de:'die Laune spielt eine zentrale Rolle.',es:'El/la humor juega un papel central.'},{de:'Die Bedeutung der Launes ist offensichtlich.',es:'La importancia de humor es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Stimmung"', exerciseA:'Stimmung' },
    { id:'a2-3-l3', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Presta atención a la estructura de la oración.',
      phrases:[{de:'das Wetter spielt eine zentrale Rolle.',es:'El/la clima juega un papel central.'},{de:'Die Bedeutung des Wetters ist offensichtlich.',es:'La importancia de clima es obvia.'},{de:'Wir müssen das Wetter berücksichtigen.',es:'Debemos considerar clima.'},{de:'der Regen spielt eine zentrale Rolle.',es:'El/la lluvia juega un papel central.'},{de:'Die Bedeutung des Regens ist offensichtlich.',es:'La importancia de lluvia es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Wetter' },
    { id:'a2-3-l4', title:'Tema: general2', topic:'general2', rewardCoins:10, rewardXp:15,
      grammarTip:'El verbo conjugado va en segunda posición.',
      phrases:[{de:'die Sonne spielt eine zentrale Rolle.',es:'El/la sol juega un papel central.'},{de:'Die Bedeutung der Sonnes ist offensichtlich.',es:'La importancia de sol es obvia.'},{de:'Wir müssen die Sonne berücksichtigen.',es:'Debemos considerar sol.'},{de:'die Wolke spielt eine zentrale Rolle.',es:'El/la nube juega un papel central.'},{de:'Die Bedeutung der Wolkes ist offensichtlich.',es:'La importancia de nube es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Sonne ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'a2-3-l5', title:'Tema: general3', topic:'general3', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'das Gewitter spielt eine zentrale Rolle.',es:'El/la tormenta juega un papel central.'},{de:'Die Bedeutung des Gewitters ist offensichtlich.',es:'La importancia de tormenta es obvia.'},{de:'Wir müssen das Gewitter berücksichtigen.',es:'Debemos considerar tormenta.'},{de:'der Blitz spielt eine zentrale Rolle.',es:'El/la relámpago juega un papel central.'},{de:'Die Bedeutung des Blitzs ist offensichtlich.',es:'La importancia de relámpago es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Gewitter"?', exerciseA:'Gewitter' },
    { id:'a2-3-l6', title:'Tema: general4', topic:'general4', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Hagel spielt eine zentrale Rolle.',es:'El/la granizo juega un papel central.'},{de:'Die Bedeutung des Hagels ist offensichtlich.',es:'La importancia de granizo es obvia.'},{de:'Wir müssen den Hagel berücksichtigen.',es:'Debemos considerar granizo.'},{de:'der Frost spielt eine zentrale Rolle.',es:'El/la helada juega un papel central.'},{de:'Die Bedeutung des Frosts ist offensichtlich.',es:'La importancia de helada es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "granizo"', exerciseA:'Hagel' },
    { id:'a2-3-l7', title:'Tema: general5', topic:'general5', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Luft spielt eine zentrale Rolle.',es:'El/la aire juega un papel central.'},{de:'Die Bedeutung der Lufts ist offensichtlich.',es:'La importancia de aire es obvia.'},{de:'Wir müssen die Luft berücksichtigen.',es:'Debemos considerar aire.'},{de:'die Temperatur spielt eine zentrale Rolle.',es:'El/la temperatura juega un papel central.'},{de:'Die Bedeutung der Temperaturs ist offensichtlich.',es:'La importancia de temperatura es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Luft"', exerciseA:'aire' },
    { id:'a2-3-l8', title:'Tema: general6', topic:'general6', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Regenschirm spielt eine zentrale Rolle.',es:'El/la paraguas juega un papel central.'},{de:'Die Bedeutung des Regenschirms ist offensichtlich.',es:'La importancia de paraguas es obvia.'},{de:'Wir müssen den Regenschirm berücksichtigen.',es:'Debemos considerar paraguas.'},{de:'der Regenmantel spielt eine zentrale Rolle.',es:'El/la impermeable juega un papel central.'},{de:'Die Bedeutung des Regenmantels ist offensichtlich.',es:'La importancia de impermeable es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "paraguas"', exerciseA:'Regenschirm' },
    { id:'a2-2-l3', title:'El cuerpo', topic:'cuerpo', rewardCoins:15, rewardXp:22,
      grammarTip:'Verbos reflexivos: sich waschen, sich fühlen, sich freuen. El reflexivo va en Akkusativ.',
      phrases:[{de:'der Körper ist praktisch.',es:'El/la cuerpo es práctico/a.'},{de:'Ich habe einen Körper.',es:'Tengo un/una cuerpo.'},{de:'Das Körper ist neu.',es:'El/la cuerpo es nuevo/a.'},{de:'das Gesicht ist praktisch.',es:'El/la cara es práctico/a.'},{de:'Ich habe ein Gesicht.',es:'Tengo un/una cara.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Körper' },
    { id:'a2-2-l4', title:'Deportes', topic:'deportes', rewardCoins:15, rewardXp:22,
      grammarTip:'Reflexivos con Dativ: ich wasche mir die Hände. El reflexivo en Dativ, el objeto en Akkusativ.',
      phrases:[{de:'der Zahn ist praktisch.',es:'El/la diente es práctico/a.'},{de:'Ich habe einen Zahn.',es:'Tengo un/una diente.'},{de:'Das Zahn ist neu.',es:'El/la diente es nuevo/a.'},{de:'die Zunge ist praktisch.',es:'El/la lengua es práctico/a.'},{de:'Ich habe eine Zunge.',es:'Tengo un/una lengua.'}],
      exerciseType:'choose', exerciseQ:'___ Zahn ist gut.', exerciseA:'Der',
      options:['Der','Die','Das'], },
    { id:'a2-2-l5', title:'Bienestar', topic:'bienestar', rewardCoins:15, rewardXp:22,
      grammarTip:'Pronombres personales: Nominativ → Dativ → Akkusativ: ich → mir → mich, du → dir → dich...',
      phrases:[{de:'der Rücken ist praktisch.',es:'El/la espalda es práctico/a.'},{de:'Ich habe einen Rücken.',es:'Tengo un/una espalda.'},{de:'Das Rücken ist neu.',es:'El/la espalda es nuevo/a.'},{de:'der Bauch ist praktisch.',es:'El/la vientre es práctico/a.'},{de:'Ich habe einen Bauch.',es:'Tengo un/una vientre.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Rücken"?', exerciseA:'Rücken' },
    { id:'a2-2-l6', title:'Citas médicas', topic:'citas', rewardCoins:15, rewardXp:22,
      grammarTip:'Oraciones temporales con "wenn": Wenn ich Zeit habe, gehe ich ins Kino.',
      phrases:[{de:'das Blut ist praktisch.',es:'El/la sangre es práctico/a.'},{de:'Ich habe ein Blut.',es:'Tengo un/una sangre.'},{de:'Das Blut ist neu.',es:'El/la sangre es nuevo/a.'},{de:'die Krankheit ist praktisch.',es:'El/la enfermedad es práctico/a.'},{de:'Ich habe eine Krankheit.',es:'Tengo un/una enfermedad.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "sangre"', exerciseA:'Blut' },
    { id:'a2-2-l7', title:'Familia y amigos', topic:'familia-amigos', rewardCoins:15, rewardXp:22,
      grammarTip:'Oraciones temporales con "als" (pasado puntual): Als ich Kind war, wohnte ich in Madrid.',
      phrases:[{de:'der Husten ist praktisch.',es:'El/la tos es práctico/a.'},{de:'Ich habe einen Husten.',es:'Tengo un/una tos.'},{de:'Das Husten ist neu.',es:'El/la tos es nuevo/a.'},{de:'die Grippe ist praktisch.',es:'El/la gripe es práctico/a.'},{de:'Ich habe eine Grippe.',es:'Tengo un/una gripe.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Husten"', exerciseA:'tos' },
    { id:'a2-2-l8', title:'Tema: emociones', topic:'emociones', rewardCoins:15, rewardXp:22,
      grammarTip:'Nebensätze con "ob" (si indirecta): Ich weiß nicht, ob er kommt.',
      phrases:[{de:'der Termin ist praktisch.',es:'El/la cita es práctico/a.'},{de:'Ich habe einen Termin.',es:'Tengo un/una cita.'},{de:'Das Termin ist neu.',es:'El/la cita es nuevo/a.'},{de:'das Rezept ist praktisch.',es:'El/la receta médica es práctico/a.'},{de:'Ich habe ein Rezept.',es:'Tengo un/una receta médica.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "cita"', exerciseA:'Termin' },
    { id:'a2-1-l3', title:'Orientación', topic:'orientacion', rewardCoins:15, rewardXp:22,
      grammarTip:'Preposiciones de lugar con Dativ: in, auf, unter, über, neben, zwischen, vor, hinter.',
      phrases:[{de:'der Beruf ist praktisch.',es:'El/la profesión es práctico/a.'},{de:'Ich habe einen Beruf.',es:'Tengo un/una profesión.'},{de:'Das Beruf ist neu.',es:'El/la profesión es nuevo/a.'},{de:'der Angestellte ist praktisch.',es:'El/la empleado es práctico/a.'},{de:'Ich habe einen Angestellte.',es:'Tengo un/una empleado.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Beruf' },
    { id:'a2-1-l4', title:'Billetes y monedas', topic:'billetes', rewardCoins:15, rewardXp:22,
      grammarTip:'Preposiciones de lugar con Akkusativ (movimiento): Ich gehe in die Stadt (Wohin?).',
      phrases:[{de:'der Kollege ist praktisch.',es:'El/la compañero es práctico/a.'},{de:'Ich habe einen Kollege.',es:'Tengo un/una compañero.'},{de:'Das Kollege ist neu.',es:'El/la compañero es nuevo/a.'},{de:'die Firma ist praktisch.',es:'El/la empresa es práctico/a.'},{de:'Ich habe eine Firma.',es:'Tengo un/una empresa.'}],
      exerciseType:'choose', exerciseQ:'___ Kollege ist gut.', exerciseA:'Der',
      options:['Der','Die','Das'], },
    { id:'a2-1-l5', title:'Reservas', topic:'reserva', rewardCoins:15, rewardXp:22,
      grammarTip:'Preposiciones Wechselpräpositionen: in, auf, unter... Dativ (Wo?) / Akkusativ (Wohin?).',
      phrases:[{de:'die Besprechung ist praktisch.',es:'El/la reunión es práctico/a.'},{de:'Ich habe eine Besprechung.',es:'Tengo un/una reunión.'},{de:'Das Besprechung ist neu.',es:'El/la reunión es nuevo/a.'},{de:'die Geschäftsreise ist praktisch.',es:'El/la viaje negocios es práctico/a.'},{de:'Ich habe eine Geschäftsreise.',es:'Tengo un/una viaje negocios.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Besprechung"?', exerciseA:'Besprechungen' },
    { id:'a2-1-l6', title:'Turismo', topic:'turismo', rewardCoins:15, rewardXp:22,
      grammarTip:'Comparativo: schnell → schneller, groß → größer, gut → besser, viel → mehr.',
      phrases:[{de:'der Urlaub ist praktisch.',es:'El/la vacaciones es práctico/a.'},{de:'Ich habe einen Urlaub.',es:'Tengo un/una vacaciones.'},{de:'Das Urlaub ist neu.',es:'El/la vacaciones es nuevo/a.'},{de:'die Reise ist praktisch.',es:'El/la viaje es práctico/a.'},{de:'Ich habe eine Reise.',es:'Tengo un/una viaje.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "vacaciones"', exerciseA:'Urlaub' },
    { id:'a2-1-l7', title:'Equipaje', topic:'equipaje', rewardCoins:15, rewardXp:22,
      grammarTip:'Superlativo: am schnellsten, am größten, am besten, am meisten.',
      phrases:[{de:'das Zimmer ist praktisch.',es:'El/la habitación es práctico/a.'},{de:'Ich habe ein Zimmer.',es:'Tengo un/una habitación.'},{de:'Das Zimmer ist neu.',es:'El/la habitación es nuevo/a.'},{de:'die Reservierung ist praktisch.',es:'El/la reserva es práctico/a.'},{de:'Ich habe eine Reservierung.',es:'Tengo un/una reserva.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Zimmer"', exerciseA:'habitación' },
    { id:'a2-1-l8', title:'Navegación', topic:'navegacion', rewardCoins:15, rewardXp:22,
      grammarTip:'Adjetivos antes del sustantivo: ein guter Freund, eine gute Idee, ein gutes Buch.',
      phrases:[{de:'der Ausweis ist praktisch.',es:'El/la carnet es práctico/a.'},{de:'Ich habe einen Ausweis.',es:'Tengo un/una carnet.'},{de:'Das Ausweis ist neu.',es:'El/la carnet es nuevo/a.'},{de:'das Gepäck ist praktisch.',es:'El/la equipaje es práctico/a.'},{de:'Ich habe ein Gepäck.',es:'Tengo un/una equipaje.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "carnet"', exerciseA:'Ausweis' },
    { id:'a1-4-l2', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Presta atención a la estructura de la oración.',
      phrases:[{de:'das Frühstück spielt eine zentrale Rolle.',es:'El/la desayuno juega un papel central.'},{de:'Die Bedeutung des Frühstücks ist offensichtlich.',es:'La importancia de desayuno es obvia.'},{de:'Wir müssen das Frühstück berücksichtigen.',es:'Debemos considerar desayuno.'},{de:'das Mittagessen spielt eine zentrale Rolle.',es:'El/la comida juega un papel central.'},{de:'Die Bedeutung des Mittagessens ist offensichtlich.',es:'La importancia de comida es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Frühstück' },
    { id:'a1-4-l3', title:'Tema: general2', topic:'general2', rewardCoins:10, rewardXp:15,
      grammarTip:'El verbo conjugado va en segunda posición.',
      phrases:[{de:'die Suppe spielt eine zentrale Rolle.',es:'El/la sopa juega un papel central.'},{de:'Die Bedeutung der Suppes ist offensichtlich.',es:'La importancia de sopa es obvia.'},{de:'Wir müssen die Suppe berücksichtigen.',es:'Debemos considerar sopa.'},{de:'der Salat spielt eine zentrale Rolle.',es:'El/la ensalada juega un papel central.'},{de:'Die Bedeutung des Salats ist offensichtlich.',es:'La importancia de ensalada es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Suppe ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'a1-4-l4', title:'Tema: general3', topic:'general3', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'das Gemüse spielt eine zentrale Rolle.',es:'El/la verdura juega un papel central.'},{de:'Die Bedeutung des Gemüses ist offensichtlich.',es:'La importancia de verdura es obvia.'},{de:'Wir müssen das Gemüse berücksichtigen.',es:'Debemos considerar verdura.'},{de:'der Kuchen spielt eine zentrale Rolle.',es:'El/la pastel juega un papel central.'},{de:'Die Bedeutung des Kuchens ist offensichtlich.',es:'La importancia de pastel es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Gemüse"?', exerciseA:'Gemüse' },
    { id:'a1-4-l5', title:'Tema: general4', topic:'general4', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Käse spielt eine zentrale Rolle.',es:'El/la queso juega un papel central.'},{de:'Die Bedeutung des Käses ist offensichtlich.',es:'La importancia de queso es obvia.'},{de:'Wir müssen den Käse berücksichtigen.',es:'Debemos considerar queso.'},{de:'die Butter spielt eine zentrale Rolle.',es:'El/la mantequilla juega un papel central.'},{de:'Die Bedeutung der Butters ist offensichtlich.',es:'La importancia de mantequilla es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "queso"', exerciseA:'Käse' },
    { id:'a1-4-l6', title:'Tema: general5', topic:'general5', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Zucker spielt eine zentrale Rolle.',es:'El/la azúcar juega un papel central.'},{de:'Die Bedeutung des Zuckers ist offensichtlich.',es:'La importancia de azúcar es obvia.'},{de:'Wir müssen den Zucker berücksichtigen.',es:'Debemos considerar azúcar.'},{de:'das Salz spielt eine zentrale Rolle.',es:'El/la sal juega un papel central.'},{de:'Die Bedeutung des Salzs ist offensichtlich.',es:'La importancia de sal es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Zucker"', exerciseA:'azúcar' },
    { id:'a1-4-l7', title:'Tema: general6', topic:'general6', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Essig spielt eine zentrale Rolle.',es:'El/la vinagre juega un papel central.'},{de:'Die Bedeutung des Essigs ist offensichtlich.',es:'La importancia de vinagre es obvia.'},{de:'Wir müssen den Essig berücksichtigen.',es:'Debemos considerar vinagre.'},{de:'das Öl spielt eine zentrale Rolle.',es:'El/la aceite juega un papel central.'},{de:'Die Bedeutung des Öls ist offensichtlich.',es:'La importancia de aceite es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "vinagre"', exerciseA:'Essig' },
    { id:'a1-4-l8', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'die Nudeln spielt eine zentrale Rolle.',es:'El/la pasta juega un papel central.'},{de:'Die Bedeutung der Nudelns ist offensichtlich.',es:'La importancia de pasta es obvia.'},{de:'Wir müssen die Nudeln berücksichtigen.',es:'Debemos considerar pasta.'},{de:'die Kartoffel spielt eine zentrale Rolle.',es:'El/la patata juega un papel central.'},{de:'Die Bedeutung der Kartoffels ist offensichtlich.',es:'La importancia de patata es obvia.'}],
      exerciseType:'order', exerciseQ:'Ordena: "Nudeln"', exerciseA:'Nudeln' },
    { id:'a1-3-l3', title:'Tema: general1', topic:'general1', rewardCoins:10, rewardXp:15,
      grammarTip:'Presta atención a la estructura de la oración.',
      phrases:[{de:'der Kopf spielt eine zentrale Rolle.',es:'El/la cabeza juega un papel central.'},{de:'Die Bedeutung des Kopfs ist offensichtlich.',es:'La importancia de cabeza es obvia.'},{de:'Wir müssen den Kopf berücksichtigen.',es:'Debemos considerar cabeza.'},{de:'die Hand spielt eine zentrale Rolle.',es:'El/la mano juega un papel central.'},{de:'Die Bedeutung der Hands ist offensichtlich.',es:'La importancia de mano es obvia.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Kopf' },
    { id:'a1-3-l4', title:'Tema: general2', topic:'general2', rewardCoins:10, rewardXp:15,
      grammarTip:'El verbo conjugado va en segunda posición.',
      phrases:[{de:'der Arm spielt eine zentrale Rolle.',es:'El/la brazo juega un papel central.'},{de:'Die Bedeutung des Arms ist offensichtlich.',es:'La importancia de brazo es obvia.'},{de:'Wir müssen den Arm berücksichtigen.',es:'Debemos considerar brazo.'},{de:'das Bein spielt eine zentrale Rolle.',es:'El/la pierna juega un papel central.'},{de:'Die Bedeutung des Beins ist offensichtlich.',es:'La importancia de pierna es obvia.'}],
      exerciseType:'choose', exerciseQ:'___ Arm ist gut.', exerciseA:'Der',
      options:['Der','Die','Das'], },
    { id:'a1-3-l5', title:'Tema: general3', topic:'general3', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'das Ohr spielt eine zentrale Rolle.',es:'El/la oreja juega un papel central.'},{de:'Die Bedeutung des Ohrs ist offensichtlich.',es:'La importancia de oreja es obvia.'},{de:'Wir müssen das Ohr berücksichtigen.',es:'Debemos considerar oreja.'},{de:'der Mund spielt eine zentrale Rolle.',es:'El/la boca juega un papel central.'},{de:'Die Bedeutung des Munds ist offensichtlich.',es:'La importancia de boca es obvia.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Ohr"?', exerciseA:'Ohren' },
    { id:'a1-3-l6', title:'Tema: general4', topic:'general4', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'das Haar spielt eine zentrale Rolle.',es:'El/la pelo juega un papel central.'},{de:'Die Bedeutung des Haars ist offensichtlich.',es:'La importancia de pelo es obvia.'},{de:'Wir müssen das Haar berücksichtigen.',es:'Debemos considerar pelo.'},{de:'der Arzt spielt eine zentrale Rolle.',es:'El/la médico juega un papel central.'},{de:'Die Bedeutung des Arzts ist offensichtlich.',es:'La importancia de médico es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "pelo"', exerciseA:'Haar' },
    { id:'a1-3-l7', title:'Tema: general5', topic:'general5', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'der Schmerz spielt eine zentrale Rolle.',es:'El/la dolor juega un papel central.'},{de:'Die Bedeutung des Schmerzs ist offensichtlich.',es:'La importancia de dolor es obvia.'},{de:'Wir müssen den Schmerz berücksichtigen.',es:'Debemos considerar dolor.'},{de:'das Fieber spielt eine zentrale Rolle.',es:'El/la fiebre juega un papel central.'},{de:'Die Bedeutung des Fiebers ist offensichtlich.',es:'La importancia de fiebre es obvia.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Schmerz"', exerciseA:'dolor' },
    { id:'a1-3-l8', title:'Tema: general6', topic:'general6', rewardCoins:10, rewardXp:15,
      grammarTip:'Practica el vocabulario nuevo en contexto.',
      phrases:[{de:'das Medikament spielt eine zentrale Rolle.',es:'El/la medicamento juega un papel central.'},{de:'Die Bedeutung des Medikaments ist offensichtlich.',es:'La importancia de medicamento es obvia.'},{de:'Wir müssen das Medikament berücksichtigen.',es:'Debemos considerar medicamento.'},{de:'das Geschäft spielt eine zentrale Rolle.',es:'El/la tienda juega un papel central.'},{de:'Die Bedeutung des Geschäfts ist offensichtlich.',es:'La importancia de tienda es obvia.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "medicamento"', exerciseA:'Medikament' },
    { id:'a1-2-l3', title:'El tiempo', topic:'tiempo', rewardCoins:12, rewardXp:18,
      grammarTip:'Verbos modales: können (poder), müssen (tener que), wollen (querer). Ocupan 2ª posición, el otro verbo al final.',
      phrases:[{de:'die Familie ist praktisch.',es:'El/la familia es práctico/a.'},{de:'Ich habe eine Familie.',es:'Tengo un/una familia.'},{de:'Das Familie ist neu.',es:'El/la familia es nuevo/a.'},{de:'der Freund ist praktisch.',es:'El/la amigo es práctico/a.'},{de:'Ich habe einen Freund.',es:'Tengo un/una amigo.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Familie' },
    { id:'a1-2-l4', title:'Calendario', topic:'calendario', rewardCoins:12, rewardXp:18,
      grammarTip:'Campo: El verbo conjugado siempre en segunda posición en oraciones enunciativas.',
      phrases:[{de:'die Stadt ist praktisch.',es:'El/la ciudad es práctico/a.'},{de:'Ich habe eine Stadt.',es:'Tengo un/una ciudad.'},{de:'Das Stadt ist neu.',es:'El/la ciudad es nuevo/a.'},{de:'das Land ist praktisch.',es:'El/la país es práctico/a.'},{de:'Ich habe ein Land.',es:'Tengo un/una país.'}],
      exerciseType:'choose', exerciseQ:'___ Stadt ist gut.', exerciseA:'Die',
      options:['Der','Die','Das'], },
    { id:'a1-2-l5', title:'El clima', topic:'clima', rewardCoins:12, rewardXp:18,
      grammarTip:'Präteritum de sein/haben: ich war/hatte, du warst/hattest, er war/hatte...',
      phrases:[{de:'der Platz ist praktisch.',es:'El/la plaza es práctico/a.'},{de:'Ich habe einen Platz.',es:'Tengo un/una plaza.'},{de:'Das Platz ist neu.',es:'El/la plaza es nuevo/a.'},{de:'der Zug ist praktisch.',es:'El/la tren es práctico/a.'},{de:'Ich habe einen Zug.',es:'Tengo un/una tren.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Platz"?', exerciseA:'Plätze' },
    { id:'a1-2-l6', title:'De compras', topic:'compras', rewardCoins:12, rewardXp:18,
      grammarTip:'Perfekt con haben: ich habe gemacht, du hast gespielt. Para verbos transitivos.',
      phrases:[{de:'das Auto ist teuer.',es:'El/la coche es caro/a.'},{de:'Ich habe ein Auto.',es:'Tengo un/una coche.'},{de:'Das Auto ist neu.',es:'El/la coche es nuevo/a.'},{de:'das Fahrrad ist teuer.',es:'El/la bicicleta es caro/a.'},{de:'Ich habe ein Fahrrad.',es:'Tengo un/una bicicleta.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "coche"', exerciseA:'Auto' },
    { id:'a1-2-l7', title:'Precios', topic:'precios', rewardCoins:12, rewardXp:18,
      grammarTip:'Perfekt con sein: ich bin gegangen, du bist gefahren. Verbos de movimiento/cambio de estado.',
      phrases:[{de:'der Bahnhof ist praktisch.',es:'El/la estación es práctico/a.'},{de:'Ich habe einen Bahnhof.',es:'Tengo un/una estación.'},{de:'Das Bahnhof ist neu.',es:'El/la estación es nuevo/a.'},{de:'der Flughafen ist praktisch.',es:'El/la aeropuerto es práctico/a.'},{de:'Ich habe einen Flughafen.',es:'Tengo un/una aeropuerto.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Bahnhof"', exerciseA:'estación' },
    { id:'a1-2-l8', title:'En el restaurante', topic:'restaurante', rewardCoins:12, rewardXp:18,
      grammarTip:'Separables: el prefijo va al final. "Ich stehe um 7 Uhr auf" (aufstehen).',
      phrases:[{de:'der Preis ist praktisch.',es:'El/la precio es práctico/a.'},{de:'Ich habe einen Preis.',es:'Tengo un/una precio.'},{de:'Das Preis ist neu.',es:'El/la precio es nuevo/a.'},{de:'die Karte ist praktisch.',es:'El/la tarjeta/mapa es práctico/a.'},{de:'Ich habe eine Karte.',es:'Tengo un/una tarjeta/mapa.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "precio"', exerciseA:'Preis' },
    { id:'a1-1-l4', title:'La familia', topic:'familia', rewardCoins:10, rewardXp:15,
      grammarTip:'Artículos definidos: der (m), die (f), das (n). Memoriza cada sustantivo con su artículo.',
      phrases:[{de:'das Haus ist wichtig.',es:'El/la casa es importante.'},{de:'Ich habe ein Haus.',es:'Tengo un/una casa.'},{de:'Das Haus ist neu.',es:'El/la casa es nuevo/a.'},{de:'der Mann ist wichtig.',es:'El/la hombre es importante.'},{de:'Ich habe einen Mann.',es:'Tengo un/una hombre.'}],
      exerciseType:'fill', exerciseQ:'Der ___ ist wichtig.', exerciseA:'Haus' },
    { id:'a1-1-l5', title:'Números y cantidades', topic:'numeros', rewardCoins:10, rewardXp:15,
      grammarTip:'Plural en -e, -en, -er: der Tisch → die Tische, die Frau → die Frauen, das Kind → die Kinder.',
      phrases:[{de:'das Kind ist praktisch.',es:'El/la niño es práctico/a.'},{de:'Ich habe ein Kind.',es:'Tengo un/una niño.'},{de:'Das Kind ist neu.',es:'El/la niño es nuevo/a.'},{de:'der Tisch ist praktisch.',es:'El/la mesa es práctico/a.'},{de:'Ich habe einen Tisch.',es:'Tengo un/una mesa.'}],
      exerciseType:'choose', exerciseQ:'___ Kind ist gut.', exerciseA:'Das',
      options:['Der','Die','Das'], },
    { id:'a1-1-l6', title:'Colores', topic:'colores', rewardCoins:10, rewardXp:15,
      grammarTip:'Nominativo vs Acusativo: Der Hund ist braun (Nom). Ich sehe den Hund (Akk).',
      phrases:[{de:'die Katze ist praktisch.',es:'El/la gato es práctico/a.'},{de:'Ich habe eine Katze.',es:'Tengo un/una gato.'},{de:'Das Katze ist neu.',es:'El/la gato es nuevo/a.'},{de:'der Hund ist praktisch.',es:'El/la perro es práctico/a.'},{de:'Ich habe einen Hund.',es:'Tengo un/una perro.'}],
      exerciseType:'plural', exerciseQ:'¿Cuál es el plural de "Katze"?', exerciseA:'Katzen' },
    { id:'a1-1-l7', title:'Animales', topic:'animales', rewardCoins:10, rewardXp:15,
      grammarTip:'Verbo "sein" (ser/estar): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie sind.',
      phrases:[{de:'das Brot ist praktisch.',es:'El/la pan es práctico/a.'},{de:'Ich habe ein Brot.',es:'Tengo un/una pan.'},{de:'Das Brot ist neu.',es:'El/la pan es nuevo/a.'},{de:'der Name ist praktisch.',es:'El/la nombre es práctico/a.'},{de:'Ich habe einen Name.',es:'Tengo un/una nombre.'}],
      exerciseType:'translateDE', exerciseQ:'Traduce al alemán: "pan"', exerciseA:'Brot' },
    { id:'a1-1-l8', title:'En la escuela', topic:'escuela', rewardCoins:10, rewardXp:15,
      grammarTip:'Verbo "haben" (tener): ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie haben.',
      phrases:[{de:'die Nacht ist praktisch.',es:'El/la noche es práctico/a.'},{de:'Ich habe eine Nacht.',es:'Tengo un/una noche.'},{de:'Das Nacht ist neu.',es:'El/la noche es nuevo/a.'},{de:'die Woche ist praktisch.',es:'El/la semana es práctico/a.'},{de:'Ich habe eine Woche.',es:'Tengo un/una semana.'}],
      exerciseType:'translateES', exerciseQ:'Traduce al español: "Nacht"', exerciseA:'noche' }];

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
  
  // ===== PRIORIZAR FRASES REALES del banco (FASE 2) =====
  var phrasesBank = R.EXAMPLE_PHRASES;
  if (phrasesBank) {
    // Mapear levelId a nivel CEFR
    var niveauMap = { 'a1': 'A1', 'a2': 'A2', 'b1': 'B1', 'b2': 'B2', 'c1': 'C1' };
    var cefrPrefix = (levelId || '').match(/^([abc])(\d)/i);
    var cefrLevel = cefrPrefix ? niveauMap[cefrPrefix[1].toLowerCase() + cefrPrefix[2]] || niveauMap[cefrPrefix[1].toLowerCase()] : null;
    if (cefrLevel && phrasesBank[cefrLevel]) {
      var pool = [];
      // Buscar frases que contengan la palabra alemana (o su stem)
      var stem = de.endsWith('en') ? de.slice(0,-2) : de;
      var wordReg = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      Object.keys(phrasesBank[cefrLevel]).forEach(function(t) {
        phrasesBank[cefrLevel][t].forEach(function(f) {
          if (wordReg.test(f)) pool.push(f);
        });
      });
      if (pool.length >= 2) {
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }
  }
  // ===== FALLBACK: generación algorítmica mejorada =====
  const artNom = art === 'die' ? 'Die' : art === 'das' ? 'Das' : art === 'der' ? 'Der' : 'Der';
  const artAkku = art === 'die' ? 'die' : art === 'das' ? 'das' : 'den';
  const artDat = art === 'die' ? 'der' : art === 'das' ? 'dem' : 'dem';
  // Pronombres
  const subjArr = ['ich','du','er','wir','sie'];
  const subj = subjArr[Math.floor(Math.random()*subjArr.length)];
  const subjCap = subj.charAt(0).toUpperCase() + subj.slice(1);
  // Adjetivos comunes por nivel
  const adjA1 = ['groß','klein','neu','schön','gut','alt','jung','schnell','langsam','warm','kalt','lang','kurz','rund'];
  const adjA2 = ['interessant','wichtig','toll','billig','teuer','sauber','schmutzig','freundlich','möglich','nett','fleißig'];
  const adjB1 = ['schwierig','einfach','notwendig','erfolgreich','gefährlich','berühmt','gemeinsam','ehrlich','verrückt','typisch'];
  const adjB2 = ['unterhaltsam','umfangreich','gründlich','verantwortlich','beeindruckend','anspruchsvoll','außergewöhnlich','beachtlich'];
  const advA1 = ['heute','gerne','oft','hier','dort','jetzt','auch','sehr', 'viel'];
  const advA2 = ['manchmal','täglich','meistens','deshalb','trotzdem','inzwischen','allerdings','natürlich'];
  const advB1 = ['inzwischen','allerdings','endlich','schließlich','praktisch','regelmäßig','jedes Jahr','normalerweise'];
  const locA1 = ['zu Hause','im Park','in der Schule','im Büro','auf dem Tisch','in der Stadt','im Bett','im Garten'];
  const locA2 = ['im Restaurant','am Bahnhof','im Krankenhaus','auf der Arbeit','im Supermarkt','im Garten','im Kino','im Museum'];
  const locB1 = ['im Ausland','auf dem Land','in der Stadtmitte','im Urlaub','im Nachbarort','an der Grenze'];
  // Objetos comunes para usar con verbos
  const objA1 = ['ein Buch','Wasser','Kaffee','Musik','Fußball','den Film','die Hausaufgaben','einen Brief'];
  const objA2 = ['die Zeitung','den Bericht','das Auto','die Wohnung','den Kuchen','die Blumen','das Geschenk'];
  const objB1 = ['den Vertrag','die Rechnung','das Projekt','die Erfahrung','die Möglichkeit','den Termin'];
  const objB2 = ['die Verantwortung','den Vorschlag','die Entscheidung','das Ergebnis','die Bedingungen'];
  // Sustantivos para usar con adjetivos
  const nounA1 = ['das Wetter','der Film','das Essen','der Tag','die Musik','die Stadt','das Haus'];

  const pick = arr => arr[Math.floor(Math.random()*arr.length)];

  // ===== NIVEL A1 (lvl 1-2): frases simples presentes =====
  if (lvl <= 2) {
    if (tipo === 'v') {
      const conj = R.conjugateVerb(de, subj);
      const adv = pick(advA1);
      if (Math.random() < 0.5) return `${subjCap} ${conj} ${adv}.`;
      const obj = pick(objA1);
      if (Math.random() < 0.5) return `${subjCap} ${conj} ${obj} ${adv}.`;
      return `${subjCap} ${conj} ${adv} ${pick(locA1)}.`;
    }
    if (tipo === 'n') {
      if (Math.random() < 0.3) return `${artNom} ${de} ist ${pick(adjA1)}.`;
      if (Math.random() < 0.4) return `Das ist ${artNom.toLowerCase()} ${de}.`;
      const loc = pick(locA1);
      return `${artNom} ${de} ist ${loc}.`;
    }
    if (tipo === 'adj') {
      const nn = pick(nounA1);
      return `${nn.charAt(0).toUpperCase()+nn.slice(1)} ist ${de}.`;
    }
    if (tipo === 'num') return `Das kostet ${de} Euro.`;
    return `Das ist ${de}.`;
  }

  // ===== NIVEL A2 (lvl 3-4): presente + locativo, acusativo =====
  if (lvl <= 4) {
    if (tipo === 'v') {
      const conj = R.conjugateVerb(de, subj);
      const adv = pick(advA2);
      if (Math.random() < 0.4) return `${subjCap} ${conj} ${adv}.`;
      const obj = pick(objA2);
      if (Math.random() < 0.4) return `${subjCap} ${conj} ${adv} ${obj}.`;
      return `${subjCap} ${conj} ${adv} ${pick(locA2)}.`;
    }
    if (tipo === 'n') {
      if (Math.random() < 0.4) return `Ich finde ${artAkku} ${de} ${pick(adjA2)}.`;
      const habenConj = subj === 'ich' ? 'habe' : subj === 'du' ? 'hast' : 'hat';
      const indf = art === 'die' ? 'eine' : 'einen';
      return `${subjCap} ${habenConj} ${indf} ${de}.`;
    }
    if (tipo === 'adj') return `${pick(['Das Wetter','Der Film','Die Musik','Das Essen'])} ist heute ${de}.`;
    const habenConj2 = subj === 'ich' ? 'habe' : subj === 'du' ? 'hast' : 'hat';
    const indf2 = art === 'die' ? 'eine' : 'einen';
    return `${subjCap} ${habenConj2} ${indf2} ${de}.`;
  }

  // ===== NIVEL B1 (lvl 5-8): Perfekt correcto, Nebensätze con weil/wenn/dass =====
  if (lvl <= 8) {
    if (tipo === 'v') {
      if (Math.random() < 0.4) {
        // Perfekt con haben: escoger PARTIZIP real, no regla fake
        var perfektPart = R.IRRVERBS && R.IRRVERBS[levelId.slice(0,2)] 
          ? (R.IRRVERBS[levelId.slice(0,2)].find(function(v){return v[0]===de}) || [])[2] 
          : null;
        if (!perfektPart) {
          perfektPart = de.endsWith('en') ? 'ge' + de.slice(0,-2) + 't' : de + 't';
        }
        var helper = de === 'gehen' || de === 'kommen' || de === 'fahren' || de === 'reisen' || de === 'bleiben' ? 'ist' : 'hat';
        if (Math.random() < 0.5) return `${subjCap} ${helper} ${perfektPart}.`;
        var perfektObj = pick(objB1);
        return `${subjCap} ${helper} ${perfektPart} ${perfektObj}.`;
      }
      // Nebensatz real con sentido
      var conjV = R.conjugateVerb(de, subj);
      var conjWeil = pick(['weil','obwohl','wenn']);
      var weilSubj = pick(['er','sie','es','man']);
      var weilConj = R.conjugateVerb(de, weilSubj);
      var weilObj = pick(objB1);
      if (Math.random() < 0.5) return `${subjCap} ${conjV} ${pick(locB1)}, ${conjWeil} ${weilSubj} ${weilConj} ${weilObj}.`;
      return `${subjCap} ${conjV} ${pick(advB1)}, ${conjWeil} ${weilSubj} ${weilConj} ${weilObj}.`;
    }
    if (tipo === 'n') {
      if (Math.random() < 0.3) return `Kannst du mir ${artDat} ${de} ${pick(['geben','zeigen','bringen','erklären'])}?`;
      var habenB1 = subj === 'ich' ? 'habe' : subj === 'du' ? 'hast' : 'hat';
      return `${subjCap} ${habenB1} ${artAkku} ${de} gesehen.`;
    }
    if (tipo === 'adj') return `${pick(['Dieser Film','Diese Aufgabe','Dieses Problem','Die Situation'])} ist wirklich ${de}.`;
    var mussVerb = subj === 'ich' ? 'muss' : subj === 'du' ? 'musst' : 'muss';
    var objToBuy = pick(objB1);
    return `${subjCap} ${mussVerb} ${artAkku} ${de} ${pick(['kaufen','lesen','verstehen','finden','prüfen'])}.`;
  }

  // ===== NIVEL B2 (lvl 9-12): Nebensätze complejos, Konjunktiv II, pasiva =====
  if (lvl <= 12) {
    if (tipo === 'v') {
      var conjB2 = R.conjugateVerb(de, subj);
      var conjType = pick(['obwohl','weil','wenn','dass','damit','nachdem']);
      var b2Obj = pick(objB2);
      if (Math.random() < 0.3) return `${subjCap} ${conjB2} ${b2Obj}, ${conjType} es ${pick(['notwendig','möglich','wichtig','sinnvoll'])} ist.`;
      if (Math.random() < 0.4) return `${subjCap} ${conjB2} ${b2Obj}, ${conjType} ${subj} ${pick(['sich darauf freut','daran interessiert ist','damit rechnet'])}.`;
      return `${subjCap} ${conjB2} ${b2Obj}, ${conjType} ${subj} ${pick(['sich vorbereiten muss','dazu bereit ist','die nötige Erfahrung hat'])}.`;
    }
    if (tipo === 'n') {
      if (Math.random() < 0.3) return `In Bezug auf ${artDat} ${de} bin ich ${pick(['anderer Meinung','optimistisch','skeptisch','zuversichtlich'])}.`;
      if (Math.random() < 0.3) return `${artNom} ${de} muss ${pick(['überprüft','verbessert','analysiert','diskutiert'])} werden.`;
      return `Bei ${artDat} ${de} handelt es sich um ein wichtiges ${pick(['Thema','Problem','Konzept','Merkmal'])}.`;
    }
    if (tipo === 'adj') return `${pick(['Die Entwicklung','Die Lage','Die Stimmung','Das Ergebnis'])} ist äußerst ${de}, ${pick(['was alle überrascht','wie erwartet','leider','zum Glück'])}.`;
    var conjSubB2 = ['dass','ob','was','wie'][Math.floor(Math.random()*4)];
    return `Ich bin mir nicht sicher, ${conjSubB2} ${de} ${pick(['wichtig','richtig','möglich','sinnvoll'])} ist.`;
  }

  // ===== NIVEL C1 (lvl 13-18): Konnektoren formales con contenido real =====
  var connectors = ['Insofern','Demzufolge','Nichtsdestotrotz','Hinsichtlich','Angesichts','Infolgedessen','Dementsprechend','Insbesondere'];
  var con = pick(connectors);
  if (tipo === 'v') {
    var conjC1 = R.conjugateVerb(de, subj);
    var mainSubject = pick(['die Regierung','das Unternehmen','die Gesellschaft','die Forschung','der Markt','das Team']);
    var mainVerb = R.conjugateVerb(de, mainSubject.replace(/^(der |die |das )/, '').split(' ')[0]);
    if (Math.random() < 0.5) return `${con} ${mainSubject} ${mainVerb}, ${pick(['sodass die Situation sich verbessert','wodurch neue Chancen entstehen','woraufhin alle Beteiligten reagierten'])}.`;
    return `${con} ${subjCap} ${conjC1} die Möglichkeit, ${pick(['neue Projekte zu starten','die Strategie zu optimieren','langfristige Lösungen zu finden'])}.`;
  }
  if (tipo === 'n') return `${con} spielt ${artNom} ${de} eine entscheidende Rolle im ${pick(['Entwicklungsprozess','Wirtschaftssystem','Forschungsprojekt','beruflichen Alltag'])}.`;
  if (tipo === 'adj') return `Die Entwicklung ist ${con.toLowerCase()} ${de} ${pick(['verlaufen','gewesen','geblieben','akzeptiert worden'])}.`;
  return `${con} ist ${de} von großer ${pick(['Bedeutung','Relevanz','Wichtigkeit','Tragweite'])}.`;
};

// Generar ejercicio completo
R.generateExercise = function (word, levelId) {
  const [de, es, art, plural, tipo] = word;
  const type = R.pickExerciseType(word, levelId);
  const example = R.generateExample(word, levelId);

  switch(type) {
    case 'fill': {
      const blank = '___';
      const stem = de.endsWith('en') ? de.slice(0,-2) : de;
      const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
      const match = example.match(wordRegex);
      const prompt = match ? example.replace(match[0], blank) : example + ' ' + blank;
      return { type, prompt, answer: match ? match[0] : de, hint: `Traducción: ${es}`, word };
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
      // Verificar si la palabra aparece literal o conjugada en la frase
      const stem = de.endsWith('en') ? de.slice(0,-2) : de;
      const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
      const wordAppears = wordRegex.test(example);
      if (!wordAppears) return R.generateExercise(word, 'fill');
      
      const words = example.split(' ');
      const shuffled = [...words].sort(()=>Math.random()-0.5);
      return { type, prompt: 'Ordena las palabras:', answer: example, words: shuffled, hint: `es: ${es}`, word };
    }
    case 'correct': {
      const stem = de.endsWith('en') ? de.slice(0,-2) : de;
      const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
      const match = example.match(wordRegex);
      if (!match) return R.generateExercise(word, 'fill');
      const wrongExample = example.replace(match[0], match[0].split('').sort(()=>Math.random()-0.5).join(''));
      return { type, prompt: `Corrige: "${wrongExample}"`, answer: example, hint: `Palabra: ${de} (${es})`, word };
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
  if (!level || !level.lessons) return { total: 0, done: 0, pct: 0 };
  const completed = progress.completed || {};
  const total = level.lessons.length;
  const done = level.lessons.filter(l => completed[l.id]).length;
  return { total, done, pct: total > 0 ? (done/total)*100 : 0 };
};

R.getOverallProgress = function (levels, progress) {
  const completed = progress.completed || {};
  let totalLessons = 0, doneLessons = 0;
  (levels || []).forEach(l => {
    if (l && l.lessons) {
      l.lessons.forEach(lesson => {
        totalLessons++;
        if (completed[lesson.id]) doneLessons++;
      });
    }
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

// ========== BANCO DE FRASES REALES (cargadas de Maestros contenido) ==========
R.EXAMPLE_PHRASES = null; // se rellena al arrancar

R.loadExamplePhrases = function() {
  var PHRASES = {
    A1: { v: [], n: [], adj: [], adv: [], prep: [], num: [], andere: [] },
    A2: { v: [], n: [], adj: [], adv: [], prep: [], num: [], andere: [] },
    B1: { v: [], n: [], adj: [], adv: [], prep: [], num: [], andere: [] },
    B2: { v: [], n: [], adj: [], adv: [], prep: [], num: [], andere: [] },
    C1: { v: [], n: [], adj: [], adv: [], prep: [], num: [], andere: [] }
  };

  try {
    var c = window.Muller && window.Muller.Maestros && window.Muller.Maestros.contenido;
    if (!c) { R.EXAMPLE_PHRASES = PHRASES; return PHRASES; }

    var levelMap = { A1_1: 'A1', A1_2: 'A1', A2_1: 'A2', A2_2: 'A2',
                     B1_1: 'B1', B1_2: 'B1', B2_1: 'B2', B2_2: 'B2', C1: 'C1' };

    Object.keys(levelMap).forEach(function(key) {
      var nivel = levelMap[key];
      var modules = c[key];
      if (!modules) return;
      modules.forEach(function(mod) {
        // Extraer frases de ejemplos[]
        if (mod.ejemplos && Array.isArray(mod.ejemplos)) {
          mod.ejemplos.forEach(function(ej) {
            if (typeof ej === 'string' && ej.length > 5) {
              PHRASES[nivel].v.push(ej);
            }
          });
        }
        // Extraer frases de ejercicioBase.preguntas[].frase
        if (mod.ejercicioBase && mod.ejercicioBase.preguntas) {
          mod.ejercicioBase.preguntas.forEach(function(p) {
            if (p.frase && typeof p.frase === 'string') {
              var cleaned = p.frase.replace(/___/g, p.respuesta || '___');
              cleaned = cleaned.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
              if (cleaned.length > 5) {
                var tipo = 'v';
                if (p.respuesta && ['der','die','das','den','dem','des','ein','eine','einen','einem','eines'].indexOf(p.respuesta.toLowerCase()) !== -1) {
                  tipo = 'n';
                }
                PHRASES[nivel][tipo].push(cleaned);
              }
            }
          });
        }
        // Extraer de flashcards
        if (mod.flashcards && Array.isArray(mod.flashcards)) {
          mod.flashcards.forEach(function(fc) {
            if (fc.dorso && typeof fc.dorso === 'string' && fc.dorso.length > 5) {
              PHRASES[nivel].v.push(fc.dorso);
            }
          });
        }
      });
    });

    // Añadir frases manuales de calidad para garantizar cobertura
    PHRASES.A1.n = PHRASES.A1.n.concat([
      "Das ist ein Tisch.", "Der Hund ist braun.", "Die Katze ist süß.",
      "Das Kind spielt im Garten.", "Die Blume ist schön.", "Der Stuhl ist alt.",
      "Das Auto ist neu.", "Die Lampe leuchtet.", "Der Mann arbeitet viel.",
      "Die Frau kocht gern.", "Das ist ein Buch.", "Die Tür ist offen.",
      "Der Junge ist klein.", "Das Mädchen ist nett.", "Der Tisch ist rund."
    ]);
    PHRASES.A1.v = PHRASES.A1.v.concat([
      "Ich heiße Juan.", "Du kommst aus Spanien.", "Er wohnt in Berlin.",
      "Wir lernen Deutsch.", "Sie spielen Fußball.", "Ich habe einen Bruder.",
      "Er ist mein Freund.", "Sie heißt Anna.", "Ich bin Ana.",
      "Ich komme aus Spanien.", "Ich lerne Deutsch."
    ]);
    PHRASES.A1.adj = PHRASES.A1.adj.concat([
      "Das Wetter ist schön.", "Der Film ist gut.", "Die Stadt ist groß.",
      "Das Haus ist klein.", "Der Kaffee ist heiß."
    ]);
    PHRASES.A2.n = PHRASES.A2.n.concat([
      "Ich lese die Zeitung.", "Er trägt den Mantel.", "Sie öffnet die Tür.",
      "Wir sehen den Film.", "Kannst du mir das Buch geben?",
      "Ich fahre mit dem Zug nach Berlin."
    ]);
    PHRASES.A2.v = PHRASES.A2.v.concat([
      "Ich muss nach Hause gehen.", "Kannst du mir helfen?",
      "Sie will Ärztin werden.", "Wir dürfen hier parken.",
      "Er möchte ein Eis essen.", "Ich habe gestern Fußball gespielt.",
      "Sie ist nach Berlin gefahren.", "Ich möchte einen Kaffee.",
      "Ich stehe um sieben Uhr auf."
    ]);
    PHRASES.B1.v = PHRASES.B1.v.concat([
      "Wenn ich Zeit hätte, würde ich verreisen.",
      "Könntest du mir bitte helfen?",
      "Ich würde gern nach Deutschland reisen.",
      "Er hat gesagt, dass er morgen kommt.",
      "Weil es geregnet hat, bleiben wir zu Hause.",
      "Ich lerne, weil ich reisen möchte.",
      "Obwohl es regnet, gehe ich spazieren.",
      "Ich hätte gern einen Kaffee."
    ]);
    PHRASES.B1.n = PHRASES.B1.n.concat([
      "Die Bedeutung dieses Wortes ist wichtig.",
      "Der Fortschritt in der Technik ist enorm."
    ]);
    PHRASES.B2.v = PHRASES.B2.v.concat([
      "Ich hätte gern mehr Freizeit gehabt.",
      "Er wäre lieber zu Hause geblieben.",
      "Nachdem er gegessen hatte, ging er spazieren.",
      "Obwohl es teuer war, hat er es gekauft.",
      "Das Haus wird gebaut.",
      "Der Vertrag wurde unterschrieben."
    ]);
    PHRASES.B2.n = PHRASES.B2.n.concat([
      "Die Einführung des neuen Systems war kompliziert.",
      "Die Forschung auf diesem Gebiet ist fortschrittlich."
    ]);
    PHRASES.C1.v = PHRASES.C1.v.concat([
      "Angesichts der aktuellen Lage müssen wir umdenken.",
      "Insofern die Entwicklung fortschreitet, bleibt alles im Fluss.",
      "Demzufolge lässt sich der Sachverhalt nicht einfach erklären.",
      "Demzufolge müssen wir handeln."
    ]);
    PHRASES.C1.n = PHRASES.C1.n.concat([
      "Die Globalisierung hat die Weltwirtschaft grundlegend verändert.",
      "Die Digitalisierung schreitet in allen Bereichen voran."
    ]);
    PHRASES.C1.adj = PHRASES.C1.adj.concat([
      "Diese Entwicklung ist äußerst bemerkenswert.",
      "Die wirtschaftliche Lage ist angespannt."
    ]);

    // Deduplicar
    Object.keys(PHRASES).forEach(function(lvl) {
      Object.keys(PHRASES[lvl]).forEach(function(t) {
        var arr = PHRASES[lvl][t];
        PHRASES[lvl][t] = arr.filter(function(f, i, a) { return a.indexOf(f) === i; });
      });
    });
  } catch(e) {
    console.warn('Ruta: error cargando frases de Maestros:', e);
  }

  R.EXAMPLE_PHRASES = PHRASES;
  return PHRASES;
};

// Inicializar frases al cargar el script
if (window.Muller && window.Muller.Maestros && window.Muller.Maestros.contenido) {
  R.loadExamplePhrases();
} else {
  var _checkPhrases = setInterval(function() {
    if (window.Muller && window.Muller.Maestros && window.Muller.Maestros.contenido) {
      R.loadExamplePhrases();
      clearInterval(_checkPhrases);
    }
  }, 500);
  setTimeout(function() { clearInterval(_checkPhrases); }, 10000);
}

})(window.Muller.Ruta);
