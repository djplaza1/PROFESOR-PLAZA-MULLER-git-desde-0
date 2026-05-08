const fs = require('fs');

const content = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');
const levels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4',
                'B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4',
                'C1.1','C1.2'];

const targets = {
  'A1.1':300,'A1.2':250,'A1.3':250,'A1.4':250,
  'A2.1':300,'A2.2':300,'A2.3':300,'A2.4':300,
  'B1.1':350,'B1.2':350,'B1.3':350,'B1.4':350,
  'B2.1':350,'B2.2':350,'B2.3':350,'B2.4':350,
  'C1.1':400,'C1.2':400
};

const broadToSub = {
  'A1': ['A1.1','A1.2','A1.3','A1.4'],
  'A2': ['A2.1','A2.2','A2.3','A2.4'],
  'B1': ['B1.1','B1.2','B1.3','B1.4'],
  'B2': ['B2.1','B2.2','B2.3','B2.4'],
  'C1': ['C1.1','C1.2']
};

function findBlockEnd(text, startPos) {
  const bracketPos = text.indexOf('[', startPos);
  if (bracketPos === -1) return -1;
  let depth = 0, inStr = false, strChar = '';
  for (let i = bracketPos; i < text.length; i++) {
    const ch = text[i];
    if (inStr) { if (ch === strChar && text[i-1] !== '\\') inStr = false; continue; }
    if (ch === "'" || ch === '"') { inStr = true; strChar = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0 && text.substring(i+1,i+3)===');') return i; }
  }
  return -1;
}

// Build all existing German words
const usedGermanWords = new Set();
const levelInfo = {};

levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(content);
  if (!match) { console.error(`${lvl}: NOT FOUND`); return; }
  const endPos = findBlockEnd(content, match.index);
  if (endPos === -1) { console.error(`${lvl}: END NOT FOUND`); return; }
  const block = content.substring(match.index, endPos + 1);
  const entries = block.match(/\[\s*'[^']+'/g) || [];
  const words = [];
  entries.forEach(e => {
    const p = e.match(/'([^']+)'/);
    if (p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1])) {
      words.push(p[1].toLowerCase());
      usedGermanWords.add(p[1].toLowerCase());
    }
  });
  levelInfo[lvl] = { startIdx: match.index, blockEnd: endPos, currentCount: words.length, need: Math.max(0, targets[lvl] - words.length) };
});

console.log('=== NEEDS ===');
levels.forEach(lvl => {
  const info = levelInfo[lvl];
  if (!info) return;
  if (info.need > 0) console.log(`${lvl}: +${info.need} (${info.currentCount}→${targets[lvl]})`);
});

// ================================================================
// MASSIVE SYNTHETIC VOCABULARY POOLS
// ================================================================

// A1 words (basic everyday objects, food, people, places, animals, body, colors, weather, time)
const A1_pool = [
  ['Hemd','camisa','das','Hemden','n'],['Schuh','zapato','der','Schuhe','n'],
  ['Strumpf','calcetín','der','Strümpfe','n'],['Rock','falda','der','Röcke','n'],
  ['Bluse','blusa','die','Blusen','n'],['Krawatte','corbata','die','Krawatten','n'],
  ['Mantel','abrigo','der','Mäntel','n'],['Regen','lluvia','der','-','n'],
  ['Schnee','nieve','der','-','n'],['Nebel','niebla','der','-','n'],
  ['Gewitter','tormenta','das','-','n'],['Blitz','relámpago','der','Blitze','n'],
  ['Donner','trueno','der','-','n'],['Hagel','granizo','der','-','n'],
  ['Frost','helada','der','-','n'],['Hitze','calor','die','-','n'],
  ['Lippe','labio','die','Lippen','n'],['Zunge','lengua','die','Zungen','n'],
  ['Hals','cuello','der','Hälse','n'],['Schulter','hombro','die','Schultern','n'],
  ['Ellbogen','codo','der','Ellbogen','n'],['Knie','rodilla','das','Knie','n'],
  ['Knöchel','tobillo','der','Knöchel','n'],['Ferse','talón','die','Fersen','n'],
  ['Daumen','pulgar','der','Daumen','n'],['Zehe','dedo del pie','die','Zehen','n'],
  ['Brust','pecho','die','Brüste','n'],['Bauch','vientre','der','Bäuche','n'],
  ['Rücken','espalda','der','Rücken','n'],['Haut','piel','die','Häute','n'],
  ['Knochen','hueso','der','Knochen','n'],['Muskel','músculo','der','Muskeln','n'],
  ['Nachbar','vecino','der','Nachbarn','n'],['Verwandte','pariente','der','Verwandten','n'],
  ['Tante','tía','die','Tanten','n'],['Onkel','tío','der','Onkel','n'],
  ['Cousin','primo','der','Cousins','n'],['Nichte','sobrina','die','Nichten','n'],
  ['Neffe','sobrino','der','Neffen','n'],['Opa','abuelo','der','Opas','n'],
  ['Oma','abuela','die','Omas','n'],['Enkel','nieto','der','Enkel','n'],
  ['Rind','vaca','das','Rinder','n'],['Schwein','cerdo','das','Schweine','n'],
  ['Huhn','gallina','das','Hühner','n'],['Ente','pato','die','Enten','n'],
  ['Gans','ganso','die','Gänse','n'],['Pferd','caballo','das','Pferde','n'],
  ['Esel','burro','der','Esel','n'],['Biene','abeja','die','Bienen','n'],
  ['Fliege','mosca','die','Fliegen','n'],['Mücke','mosquito','die','Mücken','n'],
  ['Käfer','escarabajo','der','Käfer','n'],['Spinne','araña','die','Spinnen','n'],
  ['Wurm','gusano','der','Würmer','n'],['Fisch','pez','der','Fische','n'],
  ['Bach','arroyo','der','Bäche','n'],['Teich','estanque','der','Teiche','n'],
  ['Insel','isla','die','Inseln','n'],['See','lago','der','Seen','n'],
  ['Wald','bosque','der','Wälder','n'],['Berg','montaña','der','Berge','n'],
  ['Tal','valle','das','Täler','n'],['Hügel','colina','der','Hügel','n'],
  ['Weg','camino','der','Wege','n'],['Brücke','puente','die','Brücken','n'],
  ['Mauer','muro','die','Mauern','n'],['Turm','torre','der','Türme','n'],
  ['Kirche','iglesia','die','Kirchen','n'],['Schloss','castillo','das','Schlösser','n'],
  ['Dorf','pueblo','das','Dörfer','n'],
  ['Löffel','cuchara','der','Löffel','n'],['Gabel','tenedor','die','Gabeln','n'],
  ['Messer','cuchillo','das','Messer','n'],['Teller','plato','der','Teller','n'],
  ['Becher','vaso','der','Becher','n'],['Kanne','jarra','die','Kannen','n'],
  ['Schüssel','cuenco','die','Schüsseln','n'],['Topf','olla','der','Töpfe','n'],
  ['Pfanne','sartén','die','Pfannen','n'],['Brett','tabla','das','Bretter','n'],
  ['Schere','tijeras','die','Scheren','n'],['Nadel','aguja','die','Nadeln','n'],
  ['Faden','hilo','der','Fäden','n'],['Seil','cuerda','das','Seile','n'],
  ['Eimer','cubo','der','Eimer','n'],['Besen','escoba','der','Besen','n'],
  ['Pinsel','pincel','der','Pinsel','n'],['Leiter','escalera','die','Leitern','n'],
  ['Säge','sierra','die','Sägen','n'],['Hammer','martillo','der','Hämmer','n'],
  ['Nagel','clavo','der','Nägel','n'],['Schraube','tornillo','die','Schrauben','n'],
  ['Kerze','vela','die','Kerzen','n'],['Lampe','lámpara','die','Lampen','n'],
  ['Kissen','almohada','das','Kissen','n'],['Decke','manta','die','Decken','n'],
  ['Teppich','alfombra','der','Teppiche','n'],['Vorhang','cortina','der','Vorhänge','n'],
  ['Schrank','armario','der','Schränke','n'],['Regal','estante','das','Regale','n'],
  ['Bank','banco','die','Bänke','n'],['Sessel','sillón','der','Sessel','n'],
  ['Hocker','taburete','der','Hocker','n'],['Kommode','cómoda','die','Kommoden','n'],
  ['Uhr','reloj','die','Uhren','n'],['Spiegel','espejo','der','Spiegel','n'],
  ['Bild','cuadro','das','Bilder','n'],['Vase','florero','die','Vasen','n'],
  ['Korb','cesta','der','Körbe','n'],['Koffer','maleta','der','Koffer','n'],
  ['Rucksack','mochila','der','Rucksäcke','n'],['Tasche','bolsa','die','Taschen','n'],
  ['Kamm','peine','der','Kämme','n'],['Bürste','cepillo','die','Bürsten','n'],
  ['Seife','jabón','die','Seifen','n'],['Handtuch','toalla','das','Handtücher','n'],
  ['Föhn','secador','der','Föhne','n'],['Locke','rizo','die','Locken','n'],
  ['Frisur','peinado','die','Frisuren','n'],['Schmuck','joyas','der','-','n'],
  ['Kette','cadena','die','Ketten','n'],['Ring','anillo','der','Ringe','n'],
  ['Ohrring','pendiente','der','Ohrringe','n'],['Armband','pulsera','das','Armbänder','n'],
  ['Perle','perla','die','Perlen','n'],['Krone','corona','die','Kronen','n'],
  ['Stand','puesto','der','Stände','n'],['Markt','mercado','der','Märkte','n'],
  ['Laden','tienda','der','Läden','n'],['Kiosk','quiosco','der','Kioske','n'],
  ['Bude','puesto','die','Buden','n'],['Kasse','caja','die','Kassen','n'],
  ['Regenwurm','lombriz','der','Regenwürmer','n'],['Schmetterling','mariposa','der','Schmetterlinge','n'],
  ['Ameise','hormiga','die','Ameisen','n'],['Marienkäfer','mariquita','der','Marienkäfer','n'],
  ['Schildkröte','tortuga','die','Schildkröten','n'],['Frosch','rana','der','Frösche','n'],
  ['Eidechse','lagartija','die','Eidechsen','n'],['Eichhörnchen','ardilla','das','Eichhörnchen','n'],
  ['Igel','erizo','der','Igel','n'],['Fuchs','zorro','der','Füchse','n'],
  ['Hirsch','ciervo','der','Hirsche','n'],['Reh','corzo','das','Rehe','n'],
  ['Maus','ratón','die','Mäuse','n'],['Ratte','rata','die','Ratten','n'],
  ['Hase','liebre','der','Hasen','n'],['Kaninchen','conejo','das','Kaninchen','n'],
  ['Schaf','oveja','das','Schafe','n'],['Ziege','cabra','die','Ziegen','n'],
  ['Giraffe','joroba','die','Giraffen','n'],['Löwe','león','der','Löwen','n'],
  ['Tiger','tigre','der','Tiger','n'],['Affe','mono','der','Affen','n'],
  ['Elefant','elefante','der','Elefanten','n'],['Bär','oso','der','Bären','n'],
  ['Wolf','lobo','der','Wölfe','n'],['Adler','águila','der','Adler','n'],
  ['Falke','halcón','der','Falken','n'],['Eule','búho','die','Eulen','n'],
  ['Rabe','cuervo','der','Raben','n'],['Spatz','gorrión','der','Spatzen','n'],
  ['Schwan','cisne','der','Schwäne','n'],['Taube','paloma','die','Tauben','n'],
  ['Möwe','gaviota','die','Möwen','n'],['Pinguin','pingüino','der','Pinguine','n'],
  ['Hafen','puerto','der','Häfen','n'],['Leuchtturm','faro','der','Leuchttürme','n'],
  ['Schiff','barco','das','Schiffe','n'],['Boot','bote','das','Boote','n'],
  ['Flugzeug','avión','das','Flugzeuge','n'],['Hubschrauber','helicóptero','der','Hubschrauber','n'],
  ['Eisenbahn','ferrocarril','die','Eisenbahnen','n'],['Straßenbahn','tranvía','die','Straßenbahnen','n'],
  ['Bus','autobús','der','Busse','n'],['Taxi','taxi','das','Taxis','n'],
  ['Fahrrad','bicicleta','das','Fahrräder','n'],['Motorrad','moto','das','Motorräder','n'],
  ['Hausschuh','zapatilla','der','Hausschuhe','n'],['Bademantel','bata','der','Bademäntel','n'],
  ['Pyjama','pijama','der','Pyjamas','n'],['Schlafanzug','pijama','der','Schlafanzüge','n'],
  ['Regenschirm','paraguas','der','Regenschirme','n'],['Sonnenbrille','gafas de sol','die','Sonnenbrillen','n'],
  ['Gürtel','cinturón','der','Gürtel','n'],['Brieftasche','cartera','die','Brieftaschen','n'],
  ['Rasen','césped','der','Rasen','n'],['Garten','jardín','der','Gärten','n'],
  ['Blume','flor','die','Blumen','n'],['Strauch','arbusto','der','Sträucher','n'],
  ['Baum','árbol','der','Bäume','n'],['Ast','rama','der','Äste','n'],
  ['Wurzel','raíz','die','Wurzeln','n'],['Blatt','hoja','das','Blätter','n'],
  ['Samen','semilla','der','Samen','n'],['Erde','tierra','die','-','n'],
  ['Sonne','sol','die','-','n'],['Mond','luna','der','-','n'],
  ['Stern','estrella','der','Sterne','n'],['Wolke','nube','die','Wolken','n'],
  ['Luft','aire','die','-','n'],['Wind','viento','der','-','n'],
  ['Himmel','cielo','der','-','n'],['Erde','tierra','die','-','n'],
  ['Feuer','fuego','das','-','n'],['Wasser','agua','das','-','n'],
  ['Boden','suelo','der','Böden','n'],['Stein','piedra','der','Steine','n'],
  ['Sand','arena','der','-','n'],['Staub','polvo','der','-','n'],
  ['Müll','basura','der','-','n'],['Papier','papel','das','Papiere','n'],
  ['Glas','vidrio','das','Gläser','n'],['Holz','madera','das','Hölzer','n'],
  ['Kunststoff','plástico','der','Kunststoffe','n'],['Metall','metal','das','Metalle','n'],
  ['Geschenkpapier','papel de regalo','das','Geschenkpapiere','n'],['Schleife','lazo','die','Schleifen','n'],
  ['Ball','pelota','der','Bälle','n'],['Puppe','muñeca','die','Puppen','n'],
  ['Teddybär','oso de peluche','der','Teddybären','n'],['Bauklotz','bloque','der','Bauklötze','n'],
  ['Fahne','bandera','die','Fahnen','n'],['Luftballon','globo','der','Luftballons','n'],
  ['Konfetti','confeti','das','-','n'],['Wunderkerze','bengala','die','Wunderkerzen','n'],
  ['Frühling','primavera','der','-','n'],['Sommer','verano','der','-','n'],
  ['Herbst','otoño','der','-','n'],['Winter','invierno','der','-','n'],
  ['Januar','enero','der','-','n'],['Februar','febrero','der','-','n'],
  ['März','marzo','der','-','n'],['April','abril','der','-','n'],
  ['Mai','mayo','der','-','n'],['Juni','junio','der','-','n'],
  ['Juli','julio','der','-','n'],['August','agosto','der','-','n'],
  ['September','septiembre','der','-','n'],['Oktober','octubre','der','-','n'],
  ['November','noviembre','der','-','n'],['Dezember','diciembre','der','-','n'],
  ['Montag','lunes','der','Montage','n'],['Dienstag','martes','der','Dienstage','n'],
  ['Mittwoch','miércoles','der','Mittwoche','n'],['Donnerstag','jueves','der','Donnerstage','n'],
  ['Freitag','viernes','der','Freitage','n'],['Samstag','sábado','der','Samstage','n'],
  ['Sonntag','domingo','der','Sonntage','n'],['Morgen','mañana','der','Morgen','n'],
  ['Vormittag','media mañana','der','Vormittage','n'],['Mittag','mediodía','der','Mittage','n'],
  ['Nachmittag','tarde','der','Nachmittage','n'],['Abend','tarde/noche','der','Abende','n'],
  ['Nacht','noche','die','Nächte','n'],['Mitternacht','medianoche','die','-','n'],
  ['Stunde','hora','die','Stunden','n'],['Minute','minuto','die','Minuten','n'],
  ['Sekunde','segundo','die','Sekunden','n'],
  // A1 adjectives
  ['schmutzig','sucio','','','adj'],['sauber','limpio','','','adj'],
  ['weich','suave','','','adj'],['hart','duro','','','adj'],
  ['warm','caliente','','','adj'],['kalt','frío','','','adj'],
  ['heiß','caluroso','','','adj'],['kühl','fresco','','','adj'],
  ['rund','redondo','','','adj'],['eckig','cuadrado','','','adj'],
  ['flach','plano','','','adj'],['tief','profundo','','','adj'],
  ['dick','grueso/gordo','','','adj'],['dünn','delgado','','','adj'],
  ['breit','ancho','','','adj'],['eng','estrecho','','','adj'],
  ['nah','cerca','','','adj'],['fern','lejano','','','adj'],
  ['leer','vacío','','','adj'],['voll','lleno','','','adj'],
  ['leicht','ligero','','','adj'],['schwer','pesado','','','adj'],
  ['hübsch','bonito','','','adj'],['hässlich','feo','','','adj'],
  ['mutig','valiente','','','adj'],['feige','cobarde','','','adj'],
  ['fleißig','trabajador','','','adj'],['faul','vago','','','adj'],
  ['ehrlich','honesto','','','adj'],['unehrlich','deshonesto','','','adj'],
  ['spannend','emocionante','','','adj'],['langweilig','aburrido','','','adj'],
  ['berühmt','famoso','','','adj'],['unbekannt','desconocido','','','adj'],
  ['tapfer','valiente','','','adj'],['ängstlich','temeroso','','','adj'],
  ['froh','alegre','','','adj'],['traurig','triste','','','adj'],
  ['freundlich','amigable','','','adj'],['unfreundlich','antipático','','','adj'],
  ['höflich','educado','','','adj'],['unhöflich','maleducado','','','adj'],
  ['weise','sabio','','','adj'],['dumm','tonto','','','adj'],
  ['reich','rico','','','adj'],['arm','pobre','','','adj'],
  ['stark','fuerte','','','adj'],['schwach','débil','','','adj'],
  ['scharf','afilado/picante','','','adj'],['stumpf','romo','','','adj'],
  ['frisch','fresco','','','adj'],['alt','viejo','','','adj'],
  ['jung','joven','','','adj'],['neu','nuevo','','','adj'],
  ['früh','temprano','','','adj'],['spät','tarde','','','adj'],
  ['schnell','rápido','','','adj'],['langsam','lento','','','adj'],
  ['laut','ruidoso','','','adj'],['leise','silencioso','','','adj'],
  ['nass','mojado','','','adj'],['trocken','seco','','','adj'],
  ['glatt','liso','','','adj'],['rau','áspero','','','adj'],
  ['weich','suave','','','adj'],['zart','tierno','','','adj'],
  ['hell','claro','','','adj'],['dunkel','oscuro','','','adj'],
];

// A2 words (town, city, services, workplace, free time, travel, weather expressions)
const A2_pool = [
  ['Beruf','profesión','der','Berufe','n'],['Gehalt','salario','das','Gehälter','n'],
  ['Steuer','impuesto','die','Steuern','n'],['Miete','alquiler','die','Mieten','n'],
  ['Vertrag','contrato','der','Verträge','n'],['Kredit','crédito','der','Kredite','n'],
  ['Schulden','deudas','die','-','n'],['Bargeld','efectivo','das','-','n'],
  ['Wechselgeld','cambio','das','-','n'],['Angebot','oferta','das','Angebote','n'],
  ['Rabatt','descuento','der','Rabatte','n'],['Rechnung','factura','die','Rechnungen','n'],
  ['Quittung','recibo','die','Quittungen','n'],['Paket','paquete','das','Pakete','n'],
  ['Brief','carta','der','Briefe','n'],['Briefmarke','sello','die','Briefmarken','n'],
  ['Umschlag','sobre','der','Umschläge','n'],['Postkarte','postal','die','Postkarten','n'],
  ['Anruf','llamada','der','Anrufe','n'],['Nachricht','mensaje','die','Nachrichten','n'],
  ['Antwort','respuesta','die','Antworten','n'],['Fahrkarte','billete','die','Fahrkarten','n'],
  ['Fahrplan','horario','der','Fahrpläne','n'],['Abfahrt','salida','die','Abfahrten','n'],
  ['Ankunft','llegada','die','Ankünfte','n'],['Verspätung','retraso','die','Verspätungen','n'],
  ['Gleis','andén','das','Gleise','n'],['Ausgang','salida','der','Ausgänge','n'],
  ['Eingang','entrada','der','Eingänge','n'],['Notfall','emergencia','der','Notfälle','n'],
  ['Krankenwagen','ambulancia','der','Krankenwagen','n'],['Feuerwehr','bomberos','die','-','n'],
  ['Polizei','policía','die','-','n'],['Unfall','accidente','der','Unfälle','n'],
  ['Verletzung','lesión','die','Verletzungen','n'],['Apotheke','farmacia','die','Apotheken','n'],
  ['Medikament','medicamento','das','Medikamente','n'],['Tablette','pastilla','die','Tabletten','n'],
  ['Salbe','pomada','die','Salben','n'],['Termin','cita','der','Termine','n'],
  ['Sprechstunde','consulta','die','Sprechstunden','n'],['Untersuchung','examen','die','Untersuchungen','n'],
  ['Behandlung','tratamiento','die','Behandlungen','n'],['Operation','operación','die','Operationen','n'],
  ['Rezept','receta','das','Rezepte','n'],['Besucher','visitante','der','Besucher','n'],
  ['Gastgeber','anfitrión','der','Gastgeber','n'],['Einladung','invitación','die','Einladungen','n'],
  ['Feier','fiesta','die','Feiern','n'],['Geburtstag','cumpleaños','der','Geburtstage','n'],
  ['Geschenk','regalo','das','Geschenke','n'],['Glückwunsch','felicitación','der','Glückwünsche','n'],
  ['Ecke','esquina','die','Ecken','n'],['Kreuzung','cruce','die','Kreuzungen','n'],
  ['Ampel','semáforo','die','Ampeln','n'],['Schild','señal','das','Schilder','n'],
  ['Bürgersteig','acera','der','Bürgersteige','n'],['Übergang','paso','der','Übergänge','n'],
  ['Unterführung','paso subterráneo','die','Unterführungen','n'],['Stau','atasco','der','Staus','n'],
  ['Parkplatz','aparcamiento','der','Parkplätze','n'],['Garage','garaje','die','Garagen','n'],
  ['Werkstatt','taller','die','Werkstätten','n'],['Reparatur','reparación','die','Reparaturen','n'],
  ['Wohnung','piso','die','Wohnungen','n'], ['Etage','planta','die','Etagen','n'],
  ['Stockwerk','piso','das','Stockwerke','n'], ['Treppe','escalera','die','Treppen','n'],
  ['Aufzug','ascensor','der','Aufzüge','n'], ['Dach','tejado','das','Dächer','n'],
  ['Keller','sótano','der','Keller','n'], ['Dachboden','ático','der','Dachböden','n'],
  ['Balkon','balcón','der','Balkone','n'], ['Terrasse','terraza','die','Terrassen','n'],
  ['Hof','patio','der','Höfe','n'], ['Zaun','valla','der','Zäune','n'],
  ['Einfahrt','entrada','die','Einfahrten','n'], ['Briefkasten','buzón','der','Briefkästen','n'],
  ['Klingel','timbre','die','Klingeln','n'], ['Schloss','cerradura','das','Schlösser','n'],
  ['Schlüssel','llave','der','Schlüssel','n'], ['Zimmer','habitación','das','Zimmer','n'],
  ['Büro','oficina','das','Büros','n'], ['Firma','empresa','die','Firmen','n'],
  ['Betrieb','empresa','der','Betriebe','n'], ['Abteilung','departamento','die','Abteilungen','n'],
  ['Kollege','colega','der','Kollegen','n'], ['Chef','jefe','der','Chefs','n'],
  ['Angestellte','empleado','der','Angestellten','n'], ['Arbeitsplatz','puesto de trabajo','der','Arbeitsplätze','n'],
  ['Arbeitszeit','horario laboral','die','Arbeitszeiten','n'], ['Pause','pausa','die','Pausen','n'],
  ['Urlaub','vacaciones','der','Urlaube','n'], ['Feiertag','día festivo','der','Feiertage','n'],
  ['Krankheit','enfermedad','die','Krankheiten','n'], ['Grippe','gripe','die','Grippen','n'],
  ['Erkältung','resfriado','die','Erkältungen','n'], ['Fieber','fiebre','das','-','n'],
  ['Husten','tos','der','-','n'], ['Schnupfen','resfriado','der','-','n'],
  ['Durchfall','diarrea','der','-','n'], ['Schmerz','dolor','der','Schmerzen','n'],
  ['Kopfschmerzen','dolor de cabeza','die','-','n'], ['Zahnschmerzen','dolor de muelas','die','-','n'],
  ['Bauchschmerzen','dolor de estómago','die','-','n'], ['Rückenschmerzen','dolor de espalda','die','-','n'],
  ['Pflaster','tiritas','das','Pflaster','n'], ['Verband','venda','der','Verbände','n'],
  ['Klinik','clínica','die','Kliniken','n'], ['Krankenhaus','hospital','das','Krankenhäuser','n'],
  ['Arzt','médico','der','Ärzte','n'], ['Ärztin','médica','die','Ärztinnen','n'],
  ['Schwester','enfermera','die','Schwestern','n'], ['Patient','paciente','der','Patienten','n'],
  ['Zeitung','periódico','die','Zeitungen','n'], ['Zeitschrift','revista','die','Zeitschriften','n'],
  ['Buchhandlung','librería','die','Buchhandlungen','n'], ['Bibliothek','biblioteca','die','Bibliotheken','n'],
  ['Theater','teatro','das','Theater','n'], ['Kino','cine','das','Kinos','n'],
  ['Museum','museo','das','Museen','n'], ['Ausstellung','exposición','die','Ausstellungen','n'],
  ['Konzert','concierto','das','Konzerte','n'], ['Vorstellung','función','die','Vorstellungen','n'],
  ['Karte','entrada','die','Karten','n'], ['Eintritt','entrada','der','Eintritte','n'],
  ['Platz','asiento','der','Plätze','n'], ['Reihe','fila','die','Reihen','n'],
  ['Programm','programa','das','Programme','n'], ['Pause','intermedio','die','Pausen','n'],
  ['Saal','sala','der','Säle','n'], ['Bühne','escenario','die','Bühnen','n'],
  ['Künstler','artista','der','Künstler','n'], ['Publikum','público','das','-','n'],
  ['Applaus','aplausos','der','-','n'], ['Vorhang','telón','der','Vorhänge','n'],
  // A2 verbs with separable prefixes
  ['einkaufen','comprar','','','v'], ['aufstehen','levantarse','','','v'],
  ['anziehen','vestirse','','','v'], ['ausziehen','desvestirse','','','v'],
  ['mitkommen','acompañar','','','v'], ['mitnehmen','llevar consigo','','','v'],
  ['weggehen','irse','','','v'], ['zurückkommen','volver','','','v'],
  ['ankommen','llegar','','','v'], ['abfahren','salir/partir','','','v'],
  ['einsteigen','subir','','','v'], ['aussteigen','bajar','','','v'],
  ['umsteigen','transbordar','','','v'], ['vorbeikommen','pasar por','','','v'],
  ['mitmachen','participar','','','v'], ['aufräumen','ordenar','','','v'],
  ['zumachen','cerrar','','','v'], ['aufmachen','abrir','','','v'],
  ['anmachen','encender','','','v'], ['ausmachen','apagar','','','v'],
  ['aufpassen','prestar atención','','','v'], ['zuhören','escuchar','','','v'],
  ['abholen','recoger','','','v'], ['einladen','invitar','','','v'],
  ['vorstellen','presentar','','','v'], ['nachfragen','preguntar','','','v'],
  ['ausgeben','gastar','','','v'], ['einwerfen','echar','','','v'],
  ['abwaschen','lavar','','','v'], ['aufhängen','colgar','','','v'],
  ['einschalten','encender','','','v'], ['ausschalten','apagar','','','v'],
  ['anmelden','registrar','','','v'], ['abmelden','dar de baja','','','v'],
  ['vorhaben','planear','','','v'], ['stattfinden','tener lugar','','','v'],
  ['fernsehen','ver la tele','','','v'], ['kennenlernen','conocer','','','v'],
  ['zurücklegen','guardar','','','v'], ['vorbereiten','preparar','','','v'],
  // A2 adjectives
  ['verheiratet','casado','','','adj'], ['ledig','soltero','','','adj'],
  ['geschieden','divorciado','','','adj'], ['verwitwet','viudo','','','adj'],
  ['ärgerlich','enojado','','','adj'], ['zufrieden','satisfecho','','','adj'],
  ['enttäuscht','decepcionado','','','adj'], ['begeistert','entusiasmado','','','adj'],
  ['überrascht','sorprendido','','','adj'], ['neugierig','curioso','','','adj'],
  ['eifersüchtig','celoso','','','adj'], ['dankbar','agradecido','','','adj'],
  ['nervös','nervioso','','','adj'], ['ruhig','tranquilo','','','adj'],
  ['besorgt','preocupado','','','adj'], ['gleichgültig','indiferente','','','adj'],
  ['berufstätig','trabajador','','','adj'], ['arbeitslos','desempleado','','','adj'],
  ['verlobt','comprometido','','','adj'], ['getrennt','separado','','','adj'],
  ['höflich','cortés','','','adj'], ['aufmerksam','atento','','','adj'],
  ['sparsam','ahorrador','','','adj'], ['großzügig','generoso','','','adj'],
  ['ordentlich','ordenado','','','adj'], ['unordentlich','desordenado','','','adj'],
  ['gemütlich','acogedor','','','adj'], ['bequem','cómodo','','','adj'],
  ['gefährlich','peligroso','','','adj'], ['sicher','seguro','','','adj'],
  ['notwendig','necesario','','','adj'], ['wichtig','importante','','','adj'],
  ['möglich','posible','','','adj'], ['unmöglich','imposible','','','adj'],
  ['erlaubt','permitido','','','adj'], ['verboten','prohibido','','','adj'],
  ['öffentlich','público','','','adj'], ['privat','privado','','','adj'],
  ['gemeinsam','compartido','','','adj'], ['eigen','propio','','','adj'],
  ['typisch','típico','','','adj'], ['fremd','extraño','','','adj'],
  ['natürlich','natural','','','adj'], ['künstlich','artificial','','','adj'],
  ['praktisch','práctico','','','adj'], ['theoretisch','teórico','','','adj'],
];

// B1 words (abstract concepts, opinions, media, work life, health, society)
const B1_pool = [
  ['Meinung','opinión','die','Meinungen','n'], ['Erfahrung','experiencia','die','Erfahrungen','n'],
  ['Entwicklung','desarrollo','die','Entwicklungen','n'], ['Beziehung','relación','die','Beziehungen','n'],
  ['Verbindung','conexión','die','Verbindungen','n'], ['Lösung','solución','die','Lösungen','n'],
  ['Entscheidung','decisión','die','Entscheidungen','n'], ['Wahl','elección','die','Wahlen','n'],
  ['Möglichkeit','posibilidad','die','Möglichkeiten','n'], ['Vorstellung','idea','die','Vorstellungen','n'],
  ['Überzeugung','convicción','die','Überzeugungen','n'], ['Hoffnung','esperanza','die','Hoffnungen','n'],
  ['Befürchtung','temor','die','Befürchtungen','n'], ['Sorge','preocupación','die','Sorgen','n'],
  ['Vertrauen','confianza','das','-','n'], ['Zweifel','duda','der','Zweifel','n'],
  ['Verdacht','sospecha','der','-','n'], ['Neigung','inclinación','die','Neigungen','n'],
  ['Fähigkeit','capacidad','die','Fähigkeiten','n'], ['Kenntnis','conocimiento','die','Kenntnisse','n'],
  ['Fertigkeit','destreza','die','Fertigkeiten','n'], ['Begabung','talento','die','Begabungen','n'],
  ['Eigenschaft','cualidad','die','Eigenschaften','n'], ['Verhalten','comportamiento','das','-','n'],
  ['Gewohnheit','costumbre','die','Gewohnheiten','n'], ['Brauch','costumbre','der','Bräuche','n'],
  ['Tradition','tradición','die','Traditionen','n'], ['Regel','regla','die','Regeln','n'],
  ['Vorschrift','norma','die','Vorschriften','n'], ['Gesetz','ley','das','Gesetze','n'],
  ['Auftrag','encargo','der','Aufträge','n'], ['Aufgabe','tarea','die','Aufgaben','n'],
  ['Pflicht','deber','die','Pflichten','n'], ['Verantwortung','responsabilidad','die','Verantwortungen','n'],
  ['Vorteil','ventaja','der','Vorteile','n'], ['Nachteil','desventaja','der','Nachteile','n'],
  ['Nutzen','beneficio','der','Nutzen','n'], ['Schaden','daño','der','Schäden','n'],
  ['Grund','razón','der','Gründe','n'], ['Ursache','causa','die','Ursachen','n'],
  ['Zweck','propósito','der','Zwecke','n'], ['Folge','consecuencia','die','Folgen','n'],
  ['Absicht','intención','die','Absichten','n'], ['Bedeutung','significado','die','Bedeutungen','n'],
  ['Ärger','enfado','der','-','n'], ['Freude','alegría','die','Freuden','n'],
  ['Kummer','pena','der','-','n'], ['Wut','ira','die','-','n'],
  ['Angst','miedo','die','Ängste','n'], ['Mut','coraje','der','-','n'],
  ['Neid','envidia','der','-','n'], ['Mitgefühl','compasión','das','-','n'],
  ['Hass','odio','der','-','n'], ['Liebe','amor','die','-','n'],
  ['Sehnsucht','anhelo','die','Sehnsüchte','n'], ['Einsamkeit','soledad','die','-','n'],
  ['Glück','felicidad','das','-','n'], ['Unglück','desgracia','das','-','n'],
  ['Schicksal','destino','das','Schicksale','n'], ['Zufall','azar','der','Zufälle','n'],
  ['Wunder','milagro','das','Wunder','n'], ['Abenteuer','aventura','das','Abenteuer','n'],
  ['Erlebnis','experiencia','das','Erlebnisse','n'], ['Ereignis','evento','das','Ereignisse','n'],
  ['Berufung','vocación','die','Berufungen','n'], ['Leistung','rendimiento','die','Leistungen','n'],
  ['Erfolg','éxito','der','Erfolge','n'], ['Misserfolg','fracaso','der','Misserfolge','n'],
  ['Sieg','victoria','der','Siege','n'], ['Niederlage','derrota','die','Niederlagen','n'],
  ['Kampf','lucha','der','Kämpfe','n'], ['Bewerbung','solicitud','die','Bewerbungen','n'],
  ['Vorstellungsgespräch','entrevista','das','Vorstellungsgespräche','n'], ['Kündigung','despido','die','Kündigungen','n'],
  ['Rente','jubilación','die','Renten','n'], ['Versicherung','seguro','die','Versicherungen','n'],
  ['Steuererklärung','declaración de impuestos','die','Steuererklärungen','n'], ['Wohnungssuche','búsqueda de piso','die','-','n'],
  ['Umzug','mudanza','der','Umzüge','n'], ['Renovierung','renovación','die','Renovierungen','n'],
  ['Einrichtung','mobiliario','die','Einrichtungen','n'], ['Nachbarschaft','vecindario','die','Nachbarschaften','n'],
  ['Gemeinde','municipio','die','Gemeinden','n'], ['Bürger','ciudadano','der','Bürger','n'],
  ['Wahl','elección','die','Wahlen','n'], ['Stimme','voto','die','Stimmen','n'],
  ['Partei','partido','die','Parteien','n'], ['Politik','política','die','-','n'],
  ['Regierung','gobierno','die','Regierungen','n'], ['Opposition','oposición','die','Oppositionen','n'],
  ['Minister','ministro','der','Minister','n'], ['Ministerium','ministerio','das','Ministerien','n'],
  ['Botschaft','embajada','die','Botschaften','n'], ['Botschafter','embajador','der','Botschafter','n'],
  ['Menschenrecht','derecho humano','das','Menschenrechte','n'], ['Freiheit','libertad','die','Freiheiten','n'],
  ['Gleichberechtigung','igualdad de derechos','die','-','n'], ['Gerechtigkeit','justicia','die','-','n'],
  ['Bildung','educación','die','-','n'], ['Ausbildung','formación','die','Ausbildungen','n'],
  ['Studium','estudios','das','Studien','n'], ['Fach','asignatura','das','Fächer','n'],
  ['Semester','semestre','das','Semester','n'], ['Prüfung','examen','die','Prüfungen','n'],
  ['Note','nota','die','Noten','n'], ['Zeugnis','certificado','das','Zeugnisse','n'],
  ['Abschluss','título','der','Abschlüsse','n'], ['Stipendium','beca','das','Stipendien','n'],
  ['Forschung','investigación','die','Forschungen','n'], ['Wissenschaft','ciencia','die','Wissenschaften','n'],
  ['Student','estudiante','der','Studenten','n'], ['Professor','profesor','der','Professoren','n'],
  ['Vorlesung','conferencia','die','Vorlesungen','n'], ['Seminar','seminario','das','Seminare','n'],
  ['Übung','ejercicio','die','Übungen','n'], ['Klausur','examen escrito','die','Klausuren','n'],
  ['Bibliothek','biblioteca','die','Bibliotheken','n'], ['Mensa','comedor universitario','die','Mensen','n'],
  ['Studentenwohnheim','residencia','das','Studentenwohnheime','n'],
  // B1 verbs with prepositions
  ['sich freuen','alegrarse','','','v'], ['sich ärgern','enojarse','','','v'],
  ['sich kümmern','ocuparse','','','v'], ['sich beeilen','darse prisa','','','v'],
  ['sich bemühen','esforzarse','','','v'], ['sich erinnern','recordar','','','v'],
  ['sich entschuldigen','disculparse','','','v'], ['sich bedanken','agradecer','','','v'],
  ['sich treffen','encontrarse','','','v'], ['sich unterhalten','conversar','','','v'],
  ['sich verabreden','quedar','','','v'], ['sich verlieben','enamorarse','','','v'],
  ['sich streiten','discutir','','','v'], ['sich verspäten','retrasarse','','','v'],
  ['sich konzentrieren','concentrarse','','','v'], ['sich ausruhen','descansar','','','v'],
  ['sich anmelden','inscribirse','','','v'], ['sich bewerben','postularse','','','v'],
  ['sich entscheiden','decidirse','','','v'], ['sich gewöhnen','acostumbrarse','','','v'],
  ['sich interessieren','interesarse','','','v'], ['sich wundern','sorprenderse','','','v'],
  ['sich fürchten','temer','','','v'], ['sich schämen','avergonzarse','','','v'],
  ['sich irren','equivocarse','','','v'], ['sich lohnen','valer la pena','','','v'],
  ['sich verhalten','comportarse','','','v'], ['sich entwickeln','desarrollarse','','','v'],
  ['sich verändern','cambiar','','','v'], ['sich verbessern','mejorar','','','v'],
  ['anfangen','empezar','','','v'], ['aufhören','parar','','','v'],
  ['aushalten','soportar','','','v'], ['durchführen','realizar','','','v'],
  ['teilnehmen','participar','','','v'], ['stattfinden','tener lugar','','','v'],
  ['vorbereiten','preparar','','','v'], ['nachdenken','reflexionar','','','v'],
  ['wiederholen','repetir','','','v'], ['überraschen','sorprender','','','v'],
  ['erwarten','esperar','','','v'], ['erhalten','recibir','','','v'],
  ['erzählen','contar','','','v'], ['erklären','explicar','','','v'],
  ['erreichen','alcanzar','','','v'], ['erleben','experimentar','','','v'],
  ['erlauben','permitir','','','v'], ['verbieten','prohibir','','','v'],
  ['beschreiben','describir','','','v'], ['bedeuten','significar','','','v'],
  ['betrachten','observar','','','v'], ['behandeln','tratar','','','v'],
  ['begrüßen','saludar','','','v'], ['verabschieden','despedir','','','v'],
  ['verstehen','entender','','','v'], ['vergessen','olvidar','','','v'],
  ['verlieren','perder','','','v'], ['gewinnen','ganar','','','v'],
  // B1 conjunctions/adverbs
  ['trotzdem','sin embargo','','','adv'], ['außerdem','además','','','adv'],
  ['allerdings','sin embargo','','','adv'], ['hingegen','en cambio','','','adv'],
  ['dennoch','no obstante','','','adv'], ['deshalb','por eso','','','adv'],
  ['deswegen','por lo tanto','','','adv'], ['daher','por ello','','','adv'],
  ['darum','por eso','','','adv'], ['folglich','por consiguiente','','','adv'],
  ['nämlich','precisamente','','','adv'], ['schließlich','finalmente','','','adv'],
  ['inzwischen','mientras tanto','','','adv'], ['mittlerweile','entretanto','','','adv'],
  ['unterdessen','mientras','','','adv'], ['anschließend','a continuación','','','adv'],
  ['zunächst','primero','','','adv'], ['bereits','ya','','','adv'],
  ['kaum','apenas','','','adv'], ['fast','casi','','','adv'],
  ['ungefähr','aproximadamente','','','adv'], ['mindestens','al menos','','','adv'],
  ['höchstens','como máximo','','','adv'], ['wenigstens','por lo menos','','','adv'],
  ['sogar','incluso','','','adv'], ['lediglich','meramente','','','adv'],
  ['ausgerechnet','precisamente','','','adv'], ['eigentlich','en realidad','','','adv'],
  ['überhaupt','en absoluto','','','adv'], ['jedenfalls','en cualquier caso','','','adv'],
  ['vielleicht','tal vez','','','adv'], ['wahrscheinlich','probablemente','','','adv'],
  ['hoffentlich','ojalá','','','adv'], ['bestimmt','seguramente','','','adv'],
  ['allmählich','poco a poco','','','adv'], ['plötzlich','de repente','','','adv'],
  ['offenbar','aparentemente','','','adv'], ['angeblich','supuestamente','','','adv'],
  ['möglicherweise','posiblemente','','','adv'], ['keinesfalls','de ninguna manera','','','adv'],
  ['jeweils','respectivamente','','','adv'], ['gleichzeitig','simultáneamente','','','adv'],
  ['dagegen','en contra','','','adv'], ['dafür','a favor','','','adv'],
  ['zugleich','a la vez','','','adv'], ['vorher','antes','','','adv'],
  ['nachher','después','','','adv'], ['später','más tarde','','','adv'],
  ['früher','antes','','','adv'], ['damals','entonces','','','adv'],
  ['neulich','recientemente','','','adv'], ['kürzlich','recientemente','','','adv'],
  ['sofort','inmediatamente','','','adv'], ['bisher','hasta ahora','','','adv'],
  ['bislang','hasta ahora','','','adv'], ['inzwischen','mientras tanto','','','adv'],
  ['zuerst','primero','','','adv'], ['zuletzt','por último','','','adv'],
  ['endlich','por fin','','','adv'], ['schließlich','finalmente','','','adv'],
  ['eventuell','eventualmente','','','adv'], ['gegebenenfalls','en su caso','','','adv'],
  ['notfalls','en caso de necesidad','','','adv'], ['nötigenfalls','en caso necesario','','','adv'],
];

// B2 words (complex abstract, technical, professional, formal)
const B2_pool = [
  ['Maßnahme','medida','die','Maßnahmen','n'], ['Verfahren','procedimiento','das','Verfahren','n'],
  ['Methode','método','die','Methoden','n'], ['Strategie','estrategia','die','Strategien','n'],
  ['Analyse','análisis','die','Analysen','n'], ['Diagnose','diagnóstico','die','Diagnosen','n'],
  ['Prognose','pronóstico','die','Prognosen','n'], ['Theorie','teoría','die','Theorien','n'],
  ['Hypothese','hipótesis','die','Hypothesen','n'], ['These','tesis','die','Thesen','n'],
  ['Definition','definición','die','Definitionen','n'], ['Kategorie','categoría','die','Kategorien','n'],
  ['Struktur','estructura','die','Strukturen','n'], ['System','sistema','das','Systeme','n'],
  ['Organisation','organización','die','Organisationen','n'], ['Institution','institución','die','Institutionen','n'],
  ['Behörde','autoridad','die','Behörden','n'], ['Bereich','área','der','Bereiche','n'],
  ['Sektor','sector','der','Sektoren','n'], ['Branche','rama','die','Branchen','n'],
  ['Kontext','contexto','der','Kontexte','n'], ['Zusammenhang','relación','der','Zusammenhänge','n'],
  ['Aspekt','aspecto','der','Aspekte','n'], ['Perspektive','perspectiva','die','Perspektiven','n'],
  ['Standpunkt','punto de vista','der','Standpunkte','n'], ['Kriterium','criterio','das','Kriterien','n'],
  ['Bedingung','condición','die','Bedingungen','n'], ['Voraussetzung','requisito','die','Voraussetzungen','n'],
  ['Konsequenz','consecuencia','die','Konsequenzen','n'], ['Auswirkung','efecto','die','Auswirkungen','n'],
  ['Einfluss','influencia','der','Einflüsse','n'], ['Wirkung','efecto','die','Wirkungen','n'],
  ['Ergebnis','resultado','das','Ergebnisse','n'], ['Schlussfolgerung','conclusión','die','Schlussfolgerungen','n'],
  ['Zusammenfassung','resumen','die','Zusammenfassungen','n'], ['Übersicht','visión general','die','Übersichten','n'],
  ['Darstellung','representación','die','Darstellungen','n'], ['Beschreibung','descripción','die','Beschreibungen','n'],
  ['Erklärung','explicación','die','Erklärungen','n'], ['Begründung','justificación','die','Begründungen','n'],
  ['Nachweis','comprobación','der','Nachweise','n'], ['Beweis','prueba','der','Beweise','n'],
  ['Quelle','fuente','die','Quellen','n'], ['Referenz','referencia','die','Referenzen','n'],
  ['Hinweis','indicación','der','Hinweise','n'], ['Verhandlung','negociación','die','Verhandlungen','n'],
  ['Vereinbarung','acuerdo','die','Vereinbarungen','n'], ['Abkommen','acuerdo','das','Abkommen','n'],
  ['Kompromiss','compromiso','der','Kompromisse','n'], ['Konflikt','conflicto','der','Konflikte','n'],
  ['Auseinandersetzung','discusión','die','Auseinandersetzungen','n'], ['Debatte','debate','die','Debatten','n'],
  ['Diskussion','discusión','die','Diskussionen','n'], ['Gespräch','conversación','das','Gespräche','n'],
  ['Austausch','intercambio','der','Austausche','n'], ['Kommunikation','comunicación','die','-','n'],
  ['Kooperation','cooperación','die','Kooperationen','n'], ['Zusammenarbeit','colaboración','die','-','n'],
  ['Führung','liderazgo','die','Führungen','n'], ['Leitung','dirección','die','Leitungen','n'],
  ['Verwaltung','administración','die','Verwaltungen','n'], ['Durchführung','realización','die','Durchführungen','n'],
  ['Umsetzung','implementación','die','Umsetzungen','n'], ['Anwendung','aplicación','die','Anwendungen','n'],
  ['Nutzung','uso','die','Nutzungen','n'], ['Auswertung','evaluación','die','Auswertungen','n'],
  ['Beurteilung','evaluación','die','Beurteilungen','n'], ['Bewertung','valoración','die','Bewertungen','n'],
  ['Einschätzung','estimación','die','Einschätzungen','n'], ['Wahrnehmung','percepción','die','Wahrnehmungen','n'],
  ['Einstellung','actitud','die','Einstellungen','n'], ['Haltung','postura','die','Haltungen','n'],
  ['Gesinnung','mentalidad','die','Gesinnungen','n'], ['Anschauung','concepción','die','Anschauungen','n'],
  ['Erkenntnis','conocimiento','die','Erkenntnisse','n'], ['Einsicht','comprensión','die','Einsichten','n'],
  ['Ahnung','presentimiento','die','Ahnungen','n'], ['Vermutung','suposición','die','Vermutungen','n'],
  ['Annahme','suposición','die','Annahmen','n'], ['Behauptung','afirmación','die','Behauptungen','n'],
  ['Aussage','declaración','die','Aussagen','n'], ['Feststellung','constatación','die','Feststellungen','n'],
  ['Vorschlag','propuesta','der','Vorschläge','n'], ['Empfehlung','recomendación','die','Empfehlungen','n'],
  ['Vorschrift','normativa','die','Vorschriften','n'], ['Richtlinie','directriz','die','Richtlinien','n'],
  ['Ordnung','orden','die','Ordnungen','n'], ['Satzung','estatuto','die','Satzungen','n'],
  ['Verordnung','reglamento','die','Verordnungen','n'], ['Anordnung','disposición','die','Anordnungen','n'],
  ['Genehmigung','autorización','die','Genehmigungen','n'], ['Erlaubnis','permiso','die','Erlaubnisse','n'],
  ['Zulassung','admisión','die','Zulassungen','n'], ['Zustimmung','aprobación','die','Zustimmungen','n'],
  ['Ablehnung','rechazo','die','Ablehnungen','n'], ['Verweigerung','denegación','die','Verweigerungen','n'],
  ['Einwand','objeción','der','Einwände','n'], ['Widerspruch','contradicción','der','Widersprüche','n'],
  ['Einspruch','recurso','der','Einsprüche','n'], ['Beschwerde','queja','die','Beschwerden','n'],
  ['Klage','demanda','die','Klagen','n'], ['Urteil','sentencia','das','Urteile','n'],
  ['Verurteilung','condena','die','Verurteilungen','n'], ['Freispruch','absolución','der','Freisprüche','n'],
  ['Strafe','pena','die','Strafen','n'], ['Bußgeld','multa','das','Bußgelder','n'],
  ['Entschädigung','indemnización','die','Entschädigungen','n'], ['Schadensersatz','indemnización','der','-','n'],
  ['Haftung','responsabilidad','die','Haftungen','n'], ['Garantie','garantía','die','Garantien','n'],
  ['Gewährleistung','garantía','die','Gewährleistungen','n'], ['Zahlung','pago','die','Zahlungen','n'],
  ['Überweisung','transferencia','die','Überweisungen','n'], ['Einzahlung','depósito','die','Einzahlungen','n'],
  ['Auszahlung','pago','die','Auszahlungen','n'], ['Spende','donación','die','Spenden','n'],
  ['Investition','inversión','die','Investitionen','n'], ['Finanzierung','financiación','die','Finanzierungen','n'],
  ['Förderung','subvención','die','Förderungen','n'], ['Subvention','subvención','die','Subventionen','n'],
  ['Zuschuss','subsidio','der','Zuschüsse','n'], ['Beitrag','contribución','der','Beiträge','n'],
  ['Gebühr','tasa','die','Gebühren','n'], ['Abgabe','impuesto','die','Abgaben','n'],
  ['Einkommen','ingresos','das','Einkommen','n'], ['Vermögen','patrimonio','das','Vermögen','n'],
  ['Besitz','posesión','der','Besitze','n'], ['Eigentum','propiedad','das','Eigentümer','n'],
  ['Anlage','instalación','die','Anlagen','n'], ['Einrichtung','instalación','die','Einrichtungen','n'],
  ['Ausrüstung','equipo','die','Ausrüstungen','n'], ['Werkzeug','herramienta','das','Werkzeuge','n'],
  ['Gerät','aparato','das','Geräte','n'], ['Maschine','máquina','die','Maschinen','n'],
  ['Apparat','aparato','der','Apparate','n'], ['Vorrichtung','dispositivo','die','Vorrichtungen','n'],
  ['Dokumentation','documentación','die','Dokumentationen','n'], ['Protokoll','acta','das','Protokolle','n'],
  ['Bericht','informe','der','Berichte','n'], ['Dossier','expediente','das','Dossiers','n'],
  ['Akte','expediente','die','Akten','n'], ['Register','registro','das','Register','n'],
  ['Verzeichnis','directorio','das','Verzeichnisse','n'], ['Liste','lista','die','Listen','n'],
  ['Tabelle','tabla','die','Tabellen','n'], ['Grafik','gráfico','die','Grafiken','n'],
  ['Diagramm','diagrama','das','Diagramme','n'], ['Plan','plano','der','Pläne','n'],
  ['Karte','mapa','die','Karten','n'], ['Skizze','boceto','die','Skizzen','n'],
  ['Entwurf','borrador','der','Entwürfe','n'], ['Konzept','concepto','das','Konzepte','n'],
  ['Schema','esquema','das','Schemata','n'], ['Layout','diseño','das','Layouts','n'],
  ['Format','formato','das','Formate','n'], ['Vorlage','plantilla','die','Vorlagen','n'],
  ['Muster','modelo','das','Muster','n'], ['Beispiel','ejemplo','das','Beispiele','n'],
];

// C1 words (academic, scientific, formal, nuanced)
const C1_pool = [
  ['Abhängigkeit','dependencia','die','Abhängigkeiten','n'], ['Wechselwirkung','interacción','die','Wechselwirkungen','n'],
  ['Interdependenz','interdependencia','die','Interdependenzen','n'], ['Gegensatz','contraste','der','Gegensätze','n'],
  ['Widerspruch','contradicción','der','Widersprüche','n'], ['Paradoxon','paradoja','das','Paradoxa','n'],
  ['Ambivalenz','ambivalencia','die','Ambivalenzen','n'], ['Dilemma','dilema','das','Dilemmata','n'],
  ['Synthese','síntesis','die','Synthesen','n'], ['Integration','integración','die','Integrationen','n'],
  ['Harmonie','armonía','die','Harmonien','n'], ['Kohärenz','coherencia','die','-','n'],
  ['Korrespondenz','correspondencia','die','Korrespondenzen','n'], ['Analogie','analogía','die','Analogien','n'],
  ['Äquivalenz','equivalencia','die','Äquivalenzen','n'], ['Proportion','proporción','die','Proportionen','n'],
  ['Relation','relación','die','Relationen','n'], ['Differenz','diferencia','die','Differenzen','n'],
  ['Diskrepanz','discrepancia','die','Diskrepanzen','n'], ['Divergenz','divergencia','die','Divergenzen','n'],
  ['Kontrast','contraste','der','Kontraste','n'], ['Variante','variante','die','Varianten','n'],
  ['Modifikation','modificación','die','Modifikationen','n'], ['Transformation','transformación','die','Transformationen','n'],
  ['Innovation','innovación','die','Innovationen','n'], ['Revolution','revolución','die','Revolutionen','n'],
  ['Evolution','evolución','die','Evolutionen','n'], ['Tendenz','tendencia','die','Tendenzen','n'],
  ['Phänomen','fenómeno','das','Phänomene','n'], ['Konzept','concepto','das','Konzepte','n'],
  ['Paradigma','paradigma','das','Paradigmen','n'], ['Modell','modelo','das','Modelle','n'],
  ['Prinzip','principio','das','Prinzipien','n'], ['Maxime','máxima','die','Maximen','n'],
  ['Doktrin','doctrina','die','Doktrinen','n'], ['Ideologie','ideología','die','Ideologien','n'],
  ['Weltanschauung','cosmovisión','die','Weltanschauungen','n'], ['Ethik','ética','die','-','n'],
  ['Moral','moral','die','-','n'], ['Tugend','virtud','die','Tugenden','n'],
  ['Wert','valor','der','Werte','n'], ['Norm','norma','die','Normen','n'],
  ['Prämisse','premisa','die','Prämissen','n'], ['Postulat','postulado','das','Postulate','n'],
  ['Axiom','axioma','das','Axiome','n'], ['Korrelation','correlación','die','Korrelationen','n'],
  ['Kausalität','causalidad','die','-','n'], ['Determinante','determinante','die','Determinanten','n'],
  ['Variable','variable','die','Variablen','n'], ['Konstante','constante','die','Konstanten','n'],
  ['Faktor','factor','der','Faktoren','n'], ['Parameter','parámetro','der','Parameter','n'],
  ['Indikator','indicador','der','Indikatoren','n'], ['Koeffizient','coeficiente','der','Koeffizienten','n'],
  ['Quantität','cantidad','die','Quantitäten','n'], ['Qualität','cualidad','die','Qualitäten','n'],
  ['Intensität','intensidad','die','Intensitäten','n'], ['Frequenz','frecuencia','die','Frequenzen','n'],
  ['Kapazität','capacidad','die','Kapazitäten','n'], ['Potenzial','potencial','das','Potenziale','n'],
  ['Ressource','recurso','die','Ressourcen','n'], ['Substanz','sustancia','die','Substanzen','n'],
  ['Materie','materia','die','Materien','n'], ['Energie','energía','die','Energien','n'],
  ['Strahlung','radiación','die','Strahlungen','n'], ['Absorption','absorción','die','Absorptionen','n'],
  ['Emission','emisión','die','Emissionen','n'], ['Reaktion','reacción','die','Reaktionen','n'],
  ['Prozess','proceso','der','Prozesse','n'], ['Mechanismus','mecanismo','der','Mechanismen','n'],
  ['Funktion','función','die','Funktionen','n'], ['Operation','operación','die','Operationen','n'],
  ['Sequenz','secuencia','die','Sequenzen','n'], ['Zirkulation','circulación','die','Zirkulationen','n'],
  ['Kreislauf','ciclo','der','Kreisläufe','n'], ['Zyklus','ciclo','der','Zyklen','n'],
  ['Rhythmus','ritmo','der','Rhythmen','n'], ['Periode','período','die','Perioden','n'],
  ['Intervall','intervalo','das','Intervalle','n'], ['Dauer','duración','die','-','n'],
  ['Zeitraum','período','der','Zeiträume','n'], ['Ära','era','die','Ären','n'],
  ['Epoche','época','die','Epochen','n'], ['Jahrhundert','siglo','das','Jahrhunderte','n'],
  ['Jahrtausend','milenio','das','Jahrtausende','n'], ['Generation','generación','die','Generationen','n'],
  ['Ursprung','origen','der','Ursprünge','n'], ['Herkunft','procedencia','die','Herkünfte','n'],
  ['Abstammung','descendencia','die','Abstammungen','n'], ['Nachkomme','descendiente','der','Nachkommen','n'],
  ['Vorfahr','antepasado','der','Vorfahren','n'], ['Ahne','ancestro','der','Ahnen','n'],
  ['Kultur','cultura','die','Kulturen','n'], ['Zivilisation','civilización','die','Zivilisationen','n'],
  ['Gesellschaft','sociedad','die','Gesellschaften','n'], ['Gemeinschaft','comunidad','die','Gemeinschaften','n'],
  ['Kollektiv','colectivo','das','Kollektive','n'], ['Individuum','individuo','das','Individuen','n'],
  ['Persönlichkeit','personalidad','die','Persönlichkeiten','n'], ['Charakter','carácter','der','Charaktere','n'],
  ['Identität','identidad','die','Identitäten','n'], ['Mentalität','mentalidad','die','Mentalitäten','n'],
  ['Sensibilität','sensibilidad','die','Sensibilitäten','n'], ['Emotionalität','emocionalidad','die','-','n'],
  ['Rationalität','racionalidad','die','-','n'], ['Objektivität','objetividad','die','-','n'],
  ['Subjektivität','subjetividad','die','-','n'], ['Relativität','relatividad','die','-','n'],
  ['Universalität','universalidad','die','-','n'], ['Autorität','autoridad','die','Autoritäten','n'],
  ['Legitimität','legitimidad','die','-','n'], ['Souveränität','soberanía','die','-','n'],
  ['Autonomie','autonomía','die','Autonomien','n'], ['Unabhängigkeit','independencia','die','-','n'],
  ['Selbstbestimmung','autodeterminación','die','-','n'], ['Selbstverwirklichung','autorrealización','die','-','n'],
  ['Empirie','empiria','die','-','n'], ['Empirismus','empirismo','der','-','n'],
  ['Rationalismus','racionalismo','der','-','n'], ['Idealismus','idealismo','der','-','n'],
  ['Materialismus','materialismo','der','-','n'], ['Realismus','realismo','der','-','n'],
  ['Optimismus','optimismo','der','-','n'], ['Pessimismus','pesimismo','der','-','n'],
  ['Skeptizismus','escepticismo','der','-','n'], ['Dogmatismus','dogmatismo','der','-','n'],
  ['Fanatismus','fanatismo','der','-','n'], ['Extremismus','extremismo','der','-','n'],
  ['Radikalismus','radicalismo','der','-','n'], ['Fundamentalismus','fundamentalismo','der','-','n'],
  // C1 verbs
  ['erläutern','explicar detalladamente','','','v'], ['erörtern','debatir','','','v'],
  ['voraussetzen','presuponer','','','v'], ['gegenüberstellen','comparar','','','v'],
  ['ableiten','derivar','','','v'], ['herleiten','deducir','','','v'],
  ['schlussfolgern','concluir','','','v'], ['verallgemeinern','generalizar','','','v'],
  ['differenzieren','diferenciar','','','v'], ['spezifizieren','especificar','','','v'],
  ['präzisieren','precisar','','','v'], ['konkretisieren','concretar','','','v'],
  ['veranschaulichen','ilustrar','','','v'], ['demonstrieren','demostrar','','','v'],
  ['exemplifizieren','ejemplificar','','','v'], ['zitieren','citar','','','v'],
  ['referieren','referir','','','v'], ['paraphrasieren','parafrasear','','','v'],
  ['zusammenfassen','resumir','','','v'], ['resümieren','resumir','','','v'],
  ['restimieren','recapitular','','','v'], ['bilanzieren','hacer balance','','','v'],
  ['evaluieren','evaluar','','','v'], ['validieren','validar','','','v'],
  ['verifizieren','verificar','','','v'], ['falsifizieren','falsear','','','v'],
  ['korrelieren','correlacionar','','','v'], ['koinzidieren','coincidir','','','v'],
  ['divergieren','divergir','','','v'], ['konvergieren','converger','','','v'],
  ['korrespondieren','corresponder','','','v'], ['symmetrieren','simetrizar','','','v'],
  ['dominieren','dominar','','','v'], ['subordinieren','subordinar','','','v'],
  ['integrieren','integrar','','','v'], ['differieren','diferir','','','v'],
  ['variieren','variar','','','v'], ['modifizieren','modificar','','','v'],
  ['transformieren','transformar','','','v'], ['konvertieren','convertir','','','v'],
  ['substituieren','sustituir','','','v'], ['eliminieren','eliminar','','','v'],
  ['extrahieren','extraer','','','v'], ['isolieren','aislar','','','v'],
  ['generieren','generar','','','v'], ['produzieren','producir','','','v'],
  ['reproduzieren','reproducir','','','v'], ['simulieren','simular','','','v'],
  ['stimulieren','estimular','','','v'], ['inhibieren','inhibir','','','v'],
  ['applizieren','aplicar','','','v'], ['implementieren','implementar','','','v'],
  ['installieren','instalar','','','v'], ['konfigurieren','configurar','','','v'],
  ['adaptieren','adaptar','','','v'], ['justieren','ajustar','','','v'],
  ['regulieren','regular','','','v'], ['steuern','controlar','','','v'],
  ['optimieren','optimizar','','','v'], ['maximieren','maximizar','','','v'],
  ['minimieren','minimizar','','','v'], ['priorisieren','priorizar','','','v'],
  ['hinterfragen','cuestionar','','','v'], ['infrage stellen','poner en duda','','','v'],
  ['in Frage stellen','cuestionar','','','v'], ['bezweifeln','dudar','','','v'],
  ['anzweifeln','dudar','','','v'], ['beglaubigen','certificar','','','v'],
  ['bescheinigen','certificar','','','v'], ['attestieren','atestiguar','','','v'],
  ['konstatieren','constatar','','','v'], ['konzedieren','conceder','','','v'],
  ['konzipieren','concebir','','','v'], ['realisieren','realizar','','','v'],
  ['realisierbar','realizable','','','adj'], ['umsetzbar','implementable','','','adj'],
  ['nachvollziehbar','comprensible','','','adj'], ['unbestreitbar','innegable','','','adj'],
  ['unwiderlegbar','irrefutable','','','adj'], ['zweifelhaft','dudoso','','','adj'],
  ['fragwürdig','cuestionable','','','adj'], ['strittig','controvertido','','','adj'],
  ['unstrittig','incontrovertible','','','adj'], ['umstritten','polémico','','','adj'],
  ['unumstritten','indiscutible','','','adj'], ['eindeutig','claro','','','adj'],
  ['mehrdeutig','ambiguo','','','adj'], ['vieldeutig','polivalente','','','adj'],
  ['vielsagend','significativo','','','adj'], ['aussagekräftig','significativo','','','adj'],
  ['repräsentativ','representativo','','','adj'], ['charakteristisch','característico','','','adj'],
  ['symptomatisch','sintomático','','','adj'], ['paradigmatisch','paradigmático','','','adj'],
  ['exemplarisch','ejemplar','','','adj'], ['mustergültig','ejemplar','','','adj'],
  ['vorbildlich','ejemplar','','','adj'], ['maßgeblich','decisivo','','','adj'],
  ['entscheidend','decisivo','','','adj'], ['ausschlaggebend','determinante','','','adj'],
  ['prägend','formativo','','','adj'], ['richtungsweisend','orientador','','','adj'],
  ['wegweisend','pionero','','','adj'], ['zukunftsweisend','visionario','','','adj'],
  ['bahnbrechend','innovador','','','adj'], ['revolutionär','revolucionario','','','adj'],
  ['epochal','épocal','','','adj'], ['historisch','histórico','','','adj'],
  ['zeitgeschichtlich','contemporáneo','','','adj'], ['zeitgenössisch','contemporáneo','','','adj'],
  ['avantgardistisch','vanguardista','','','adj'], ['innovativer','más innovador','','','adj'],
  ['ausgereift','maduro','','','adj'], ['fortschrittlich','progresista','','','adj'],
];

// ================================================================
// Build level groups
// ================================================================

const poolMap = {
  'A1': A1_pool, 'A2': A2_pool, 'B1': B1_pool, 'B2': B2_pool, 'C1': C1_pool
};

const newWordsByLevel = {};

Object.entries(broadToSub).forEach(([broad, subs]) => {
  const available = (poolMap[broad] || []).filter(w => {
    const de = w[0].toLowerCase();
    return !usedGermanWords.has(de);
  });
  
  // Shuffle
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  
  let totalNeed = 0;
  subs.forEach(sub => { if (levelInfo[sub]) totalNeed += levelInfo[sub].need; });
  
  console.log(`\n${broad}: ${available.length} available, need ${totalNeed}`);
  
  let idx = 0;
  subs.forEach(sub => {
    if (!levelInfo[sub]) return;
    const need = levelInfo[sub].need;
    if (need > 0 && idx < available.length) {
      const n = Math.min(need, available.length - idx);
      const assign = available.slice(idx, idx + n);
      idx += n;
      newWordsByLevel[sub] = assign;
      assign.forEach(w => usedGermanWords.add(w[0].toLowerCase()));
      console.log(`  ${sub}: +${assign.length} (${levelInfo[sub].currentCount}→${levelInfo[sub].currentCount + assign.length})`);
    }
  });
  
  if (idx < totalNeed) {
    console.log(`  WARNING: ${broad} only filled ${idx}/${totalNeed}`);
  }
});

// ================================================================
// Inject into file (reverse order to preserve positions)
// ================================================================

let result = content;
let totalNew = 0;

const sortedLevels = [...levels].sort((a, b) => 
  (levelInfo[b]?.blockEnd || 0) - (levelInfo[a]?.blockEnd || 0)
);

sortedLevels.forEach(lvl => {
  const info = levelInfo[lvl];
  const newWords = newWordsByLevel[lvl];
  if (!info || !newWords || newWords.length === 0) return;
  
  const wordStrings = newWords.map(w => `['${w[0]}','${w[1]}','${w[2]}','${w[3]}','${w[4]}']`);
  const insertPos = info.blockEnd;
  result = result.substring(0, insertPos) + ',\n' + wordStrings.join(',\n') + '\n' + result.substring(insertPos);
  totalNew += wordStrings.length;
  
  // Update blockEnd for future injections (word count is scattered, we inserted at end so later ones are fine)
});

console.log(`\nTotal injected: ${totalNew}`);

// ================================================================
// Count final
// ================================================================
console.log('\n=== FINAL ===');
let grandTotal = 0;
levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(result);
  if (!match) return;
  const endPos = findBlockEnd(result, match.index);
  if (endPos === -1) return;
  const block = result.substring(match.index, endPos + 1);
  const entries = block.match(/\[\s*'[^']+'/g) || [];
  const words = entries.filter(e => {
    const p = e.match(/'([^']+)'/);
    return p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1]);
  });
  const status = words.length >= targets[lvl] ? '✓' : '✗';
  console.log(`${lvl}: ${words.length}/${targets[lvl]} ${status}`);
  grandTotal += words.length;
});
console.log(`TOTAL: ${grandTotal}`);

if (totalNew > 0) {
  fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', result, 'utf8');
  console.log('\n✓ Saved!');
}