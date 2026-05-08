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

// Build used words set
const usedGermanWords = new Set();
const levelInfo = {};

levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(content);
  if (!match) return;
  const endPos = findBlockEnd(content, match.index);
  if (endPos === -1) return;
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

// ================================================================
// BIG UNIQUE WORD POOLS - checked against usedGermanWords
// ================================================================
// These are words NOT likely to be in the existing set

function makeWord(de, es, art, plural, type) {
  return { de, es, art, plural, type, key: de.toLowerCase() };
}

const candidates = [];

// === A1 basic nouns (household, nature, body, food that aren't common) ===
const A1_candidates = [
  ['Herd','cocina','der','Herde','n'],['Kübel','cubeta','der','Kübel','n'],
  ['Bürste','cepillo','die','Bürsten','n'],['Krümel','migaja','der','Krümel','n'],
  ['Schürze','delantal','die','Schürzen','n'],['Korken','corcho','der','Korken','n'],
  ['Flasche','botella','die','Flaschen','n'],['Dose','lata','die','Dosen','n'],
  ['Deckel','tapa','der','Deckel','n'],['Krug','jarra','der','Krüge','n'],
  ['Tasse','taza','die','Tassen','n'],['Untertasse','platillo','die','Untertassen','n'],
  ['Tablett','bandeja','das','Tabletts','n'],['Serviette','servilleta','die','Servietten','n'],
  ['Strohhalm','pajita','der','Strohhalme','n'],['Zahnstocher','palillo','der','Zahnstocher','n'],
  ['Schraubglas','frasco','das','Schraubgläser','n'],['Marmelade','mermelada','die','Marmeladen','n'],
  ['Honig','miel','der','-','n'],['Marmelade','mermelada','die','Marmeladen','n'],
  ['Butter','mantequilla','die','-','n'],['Käse','queso','der','Käse','n'],
  ['Wurst','salchicha','die','Würste','n'],['Schinken','jamón','der','Schinken','n'],
  ['Ei','huevo','das','Eier','n'],['Mehl','harina','das','-','n'],
  ['Zucker','azúcar','der','-','n'],['Salz','sal','das','-','n'],
  ['Pfeffer','pimienta','der','-','n'],['Essig','vinagre','der','-','n'],
  ['Öl','aceite','das','Öle','n'],['Fett','grasa','das','Fette','n'],
  ['Sahne','crema','die','-','n'],['Joghurt','yogur','der','Joghurts','n'],
  ['Quark','requesón','der','-','n'],['Pudding','pudín','der','Puddings','n'],
  ['Keks','galleta','der','Kekse','n'],['Kuchen','pastel','der','Kuchen','n'],
  ['Torte','tarta','die','Torten','n'],['Brötchen','panecillo','das','Brötchen','n'],
  ['Toast','tostada','der','Toasts','n'],['Müsli','muesli','das','-','n'],
  ['Korn','grano','der','Körner','n'],['Weizen','trigo','der','-','n'],
  ['Reis','arroz','der','-','n'],['Nudel','pasta','die','Nudeln','n'],
  ['Kartoffel','patata','die','Kartoffeln','n'],['Tomate','tomate','die','Tomaten','n'],
  ['Gurke','pepino','die','Gurken','n'],['Karotte','zanahoria','die','Karotten','n'],
  ['Zwiebel','cebolla','die','Zwiebeln','n'],['Knoblauch','ajo','der','-','n'],
  ['Pilz','seta','der','Pilze','n'],['Bohne','judía','die','Bohnen','n'],
  ['Erbse','guisante','die','Erbsen','n'],['Linse','lenteja','die','Linsen','n'],
  ['Salat','ensalada','der','Salate','n'],['Kohl','col','der','Kohle','n'],
  ['Kopf','cabeza','der','Köpfe','n'],['Stirn','frente','die','Stirnen','n'],
  ['Wange','mejilla','die','Wangen','n'],['Kinn','barbilla','das','Kinne','n'],
  ['Nacken','nuca','der','Nacken','n'],['Rippe','costilla','die','Rippen','n'],
  ['Wirbelsäule','columna','die','Wirbelsäulen','n'],['Hüfte','cadera','die','Hüften','n'],
  ['Oberschenkel','muslo','der','Oberschenkel','n'],['Wade','pantorrilla','die','Waden','n'],
  ['Fuß','pie','der','Füße','n'],['Ferse','talón','die','Fersen','n'],
  ['Sohle','suela','die','Sohlen','n'],['Nagel','uña','der','Nägel','n'],
  ['Handfläche','palma','die','Handflächen','n'],['Faust','puño','die','Fäuste','n'],
  ['Drossel','garganta','die','-','n'],['Kehle','garganta','die','Kehlen','n'],
  ['Puls','pulso','der','Pulse','n'],['Ader','vena','die','Adern','n'],
  ['Drüse','glándula','die','Drüsen','n'],['Nerv','nervio','der','Nerven','n'],
  ['Sehne','tendón','die','Sehnen','n'],['Gelenk','articulación','das','Gelenke','n'],
  ['Wirbel','vértebra','der','Wirbel','n'],['Schädel','cráneo','der','Schädel','n'],
  ['Rippe','costilla','die','Rippen','n'],['Lunge','pulmón','die','Lungen','n'],
  ['Leber','hígado','die','Lebern','n'],['Niere','riñón','die','Nieren','n'],
  ['Magen','estómago','der','Mägen','n'],['Darm','intestino','der','Därme','n'],
  ['Blase','vejiga','die','Blasen','n'],['Galle','bilis','die','-','n'],
  ['Skelett','esqueleto','das','Skelette','n'],['Muskel','músculo','der','Muskeln','n'],
  ['Schlaf','sueño','der','-','n'],['Traum','sueño','der','Träume','n'],
  ['Geschmack','sabor','der','Geschmäcke','n'],['Geruch','olor','der','Gerüche','n'],
  ['Lärm','ruido','der','-','n'],['Stille','silencio','die','-','n'],
  ['Ruhe','calma','die','-','n'],['Unruhe','inquietud','die','Unruhen','n'],
  ['Ordnung','orden','die','-','n'],['Unordnung','desorden','die','-','n'],
  ['Spielzeug','juguete','das','Spielzeuge','n'],['Kreide','tiza','die','-','n'],
  ['Radiergummi','goma de borrar','der','Radiergummis','n'],['Lineal','regla','das','Lineale','n'],
  ['Kugelschreiber','bolígrafo','der','Kugelschreiber','n'],['Bleistift','lápiz','der','Bleistifte','n'],
  ['Papierkorb','papelera','der','Papierkörbe','n'],['Tafel','pizarra','die','Tafeln','n'],
  ['Rucksack','mochila','der','Rucksäcke','n'],['Schirm','paraguas','der','Schirme','n'],
  ['Badekappe','gorro de baño','die','Badekappen','n'],['Badeanzug','bañador','der','Badeanzüge','n'],
  ['Badehose','bañador','die','Badehosen','n'],['Handtuch','toalla','das','Handtücher','n'],
  ['Bademantel','albornoz','der','Bademäntel','n'],['Dusche','ducha','die','Duschen','n'],
  ['Badewanne','bañera','die','Badewannen','n'],['Waschbecken','lavabo','das','Waschbecken','n'],
  ['Toilette','váter','die','Toiletten','n'],['Klo','retrete','das','Klos','n'],
  ['Rolle','rollo','die','Rollen','n'],['Seife','jabón','die','Seifen','n'],
  ['Shampoo','champú','das','Shampoos','n'],['Duschgel','gel de ducha','das','Duschgele','n'],
  ['Rasierer','afeitadora','der','Rasierer','n'],['Rasiermesser','cuchilla','das','Rasiermesser','n'],
  ['Zahnbürste','cepillo de dientes','die','Zahnbürsten','n'],['Zahnpasta','pasta dentífrica','die','Zahnpasten','n'],
  ['Zahnseide','hilo dental','die','-','n'],['Mundwasser','enjuague','das','Mundwässer','n'],
  ['Wäsche','ropa sucia','die','Wäschen','n'],['Waschmaschine','lavadora','die','Waschmaschinen','n'],
  ['Wäschetrockner','secadora','der','Wäschetrockner','n'],['Bügeleisen','plancha','das','Bügeleisen','n'],
  ['Bügelbrett','tabla de planchar','das','Bügelbretter','n'],['Staubsauger','aspiradora','der','Staubsauger','n'],
  ['Wischmopp','fregona','der','Wischmopps','n'],['Eimer','cubo','der','Eimer','n'],
  ['Müllbeutel','bolsa de basura','der','Müllbeutel','n'],['Mülltonne','cubo de basura','die','Mülltonnen','n'],
  ['Rechnung','cuenta','die','Rechnungen','n'],['Lieferung','entrega','die','Lieferungen','n'],
  ['Bestellung','pedido','die','Bestellungen','n'],['Wunsch','deseo','der','Wünsche','n'],
  ['Schlange','cola','die','Schlangen','n'],['Nummer','número','die','Nummern','n'],
  ['Größe','talla','die','Größen','n'],['Farbe','color','die','Farben','n'],
  ['Preis','precio','der','Preise','n'],['Qualität','calidad','die','Qualitäten','n'],
  ['Sonderangebot','oferta especial','das','Sonderangebote','n'],['Geldbeutel','monedero','der','Geldbeutel','n'],
  ['Portemonnaie','cartera','das','Portemonnaies','n'],['Münze','moneda','die','Münzen','n'],
  ['Schein','billete','der','Scheine','n'],['Wechselgeld','cambio','das','-','n'],
  ['Höhle','cueva','die','Höhlen','n'],['Brunnen','fuente','der','Brunnen','n'],
  ['Fluss','río','der','Flüsse','n'],['Bucht','bahía','die','Buchten','n'],
  ['Küste','costa','die','Küsten','n'],['Strand','playa','der','Strände','n'],
  ['Wiese','prado','die','Wiesen','n'],['Feld','campo','das','Felder','n'],
  ['Waldrand','borde del bosque','der','Waldränder','n'],['Lichtung','claro','die','Lichtungen','n'],
  ['Bach','arroyo','der','Bäche','n'],['Wegrand','borde del camino','der','Wegränder','n'],
  ['Zaun','valla','der','Zäune','n'],['Mühle','molino','die','Mühlen','n'],
  ['Scheune','granero','die','Scheunen','n'],['Stall','establo','der','Ställe','n'],
  ['Bauernhof','granja','der','Bauernhöfe','n'],['Gewächshaus','invernadero','das','Gewächshäuser','n'],
  ['Obstbaum','árbol frutal','der','Obstbäume','n'],['Apfel','manzana','der','Äpfel','n'],
  ['Birne','pera','die','Birnen','n'],['Kirsche','cereza','die','Kirschen','n'],
  ['Pflaume','ciruela','die','Pflaumen','n'],['Pfirsich','melocotón','der','Pfirsiche','n'],
  ['Traube','uva','die','Trauben','n'],['Banane','plátano','die','Bananen','n'],
  ['Orange','naranja','die','Orangen','n'],['Zitrone','limón','die','Zitronen','n'],
  ['Erdbeere','fresa','die','Erdbeeren','n'],['Himbeere','frambuesa','die','Himbeeren','n'],
  ['Brombeere','mora','die','Brombeeren','n'],['Heidelbeere','arándano','die','Heidelbeeren','n'],
  ['Ananas','piña','die','Ananas','n'],['Melone','melón','die','Melonen','n'],
  ['Wassermelone','sandía','die','Wassermelonen','n'],['Kürbis','calabaza','der','Kürbisse','n'],
  ['Nuss','nuez','die','Nüsse','n'],['Mandel','almendra','die','Mandeln','n'],
  ['Walnuss','nogal','die','Walnüsse','n'],['Haselnuss','avellana','die','Haselnüsse','n'],
  ['Süßigkeit','dulce','die','Süßigkeiten','n'],['Schokolade','chocolate','die','Schokoladen','n'],
  ['Bonbon','caramelo','das','Bonbons','n'],['Lutscher','piruleta','der','Lutscher','n'],
  ['Kaubonbon','caramelo masticable','das','Kaubonbons','n'],['Kaugummi','chicle','der','Kaugummis','n'],
  ['Zimt','canela','der','-','n'],['Vanille','vainilla','die','-','n'],
  ['Nelke','clavo','die','Nelken','n'],['Muskat','nuez moscada','der','-','n'],
  ['Schnurrbart','bigote','der','Schnurrbärte','n'],['Bart','barba','der','Bärte','n'],
  ['Locke','rizo','die','Locken','n'],['Pony','flequillo','der','Ponys','n'],
  ['Zopf','trenza','der','Zöpfe','n'],['Dutt','moño','der','Dutts','n'],
  ['Pferdeschwanz','cola de caballo','der','Pferdeschwänze','n'],['Kamm','peine','der','Kämme','n'],
  ['Bürste','cepillo','die','Bürsten','n'],['Fön','secador','der','Föne','n'],
  ['Lockenstab','rizador','der','Lockenstäbe','n'],['Glätteisen','alisador','das','Glätteisen','n'],
  ['Nagellack','esmalte de uñas','der','Nagellacke','n'],['Lippenstift','pintalabios','der','Lippenstifte','n'],
  ['Puder','polvos','der','Puder','n'],['Creme','crema','die','Cremes','n'],
  ['Lotion','loción','die','Lotionen','n'],['Parfüm','perfume','das','Parfüms','n'],
  ['Deo','desodorante','das','Deos','n'],['Rasierwasser','loción de afeitar','das','Rasierwässer','n'],
  // A1 verbs - everyday actions
  ['anmachen','encender','','','v'],['ausmachen','apagar','','','v'],
  ['zumachen','cerrar','','','v'],['aufmachen','abrir','','','v'],
  ['wegräumen','guardar','','','v'],['hinstellen','colocar','','','v'],
  ['hinsetzen','sentar','','','v'],['hinlegen','tumbar','','','v'],
  ['aufheben','recoger','','','v'],['fallenlassen','dejar caer','','','v'],
  ['festhalten','sujetar','','','v'],['loslassen','soltar','','','v'],
  ['anfassen','tocar','','','v'],['zudecken','tapar','','','v'],
  ['aufdecken','destapar','','','v'],['einschenken','servir','','','v'],
  ['eingießen','verter','','','v'],['abtrocknen','secar','','','v'],
  ['abwischen','limpiar','','','v'],['aufwischen','fregar','','','v'],
  ['abstauben','quitar el polvo','','','v'],['saugen','aspirar','','','v'],
  ['bügeln','planchar','','','v'],['falten','doblar','','','v'],
  ['nähen','coser','','','v'],['stricken','tejer','','','v'],
  ['malen','pintar','','','v'],['zeichnen','dibujar','','','v'],
  ['basteln','hacer manualidades','','','v'],['kleben','pegar','','','v'],
  ['schneiden','cortar','','','v'],['reißen','rasgar','','','v'],
  ['drücken','apretar','','','v'],['ziehen','tirar','','','v'],
  ['schieben','empujar','','','v'],['tragen','llevar','','','v'],
  ['werfen','lanzar','','','v'],['fangen','atrapar','','','v'],
  ['springen','saltar','','','v'],['klettern','trepar','','','v'],
  ['rutschen','resbalar','','','v'],['stolpern','tropezar','','','v'],
  ['ausrutschen','resbalarse','','','v'],['hinfallen','caerse','','','v'],
  ['aufstehen','levantarse','','','v'],['hinsetzen','sentarse','','','v'],
  ['sich setzen','sentarse','','','v'],['sich legen','acostarse','','','v'],
  ['sich waschen','lavarse','','','v'],['sich kämmen','peinarse','','','v'],
  ['sich putzen','limpiarse','','','v'],['sich duschen','ducharse','','','v'],
  ['sich baden','bañarse','','','v'],['sich rasieren','afeitarse','','','v'],
  ['sich schminken','maquillarse','','','v'],['sich anziehen','vestirse','','','v'],
  ['sich ausziehen','desvestirse','','','v'],['sich umziehen','cambiarse','','','v'],
  ['frühstücken','desayunar','','','v'],['zu Abend essen','cenar','','','v'],
  ['zu Mittag essen','comer','','','v'],['kochen','cocinar','','','v'],
  ['braten','freír','','','v'],['backen','hornear','','','v'],
  ['kochen','hervir','','','v'],['dämpfen','vapor','','','v'],
  ['grillen','asar','','','v'],['schälen','pelar','','','v'],
  ['schneiden','cortar','','','v'],['hacken','picar','','','v'],
  ['reiben','rallar','','','v'],['mischen','mezclar','','','v'],
  ['rühren','remover','','','v'],['gießen','verter','','','v'],
  ['abgießen','escurrir','','','v'],['abschmecken','sazonar','','','v'],
  ['würzen','condimentar','','','v'],['salzen','salar','','','v'],
  ['pfeffern','pimentar','','','v'],['bestreuen','espolvorear','','','v'],
  ['gießen','regar','','','v'],['pflanzen','plantar','','','v'],
  ['säen','sembrar','','','v'],['ernten','cosechar','','','v'],
  ['jäten','desherbar','','','v'],['graben','cavar','','','v'],
  ['harken','rastrillar','','','v'],['mähen','segur','','','v'],
  ['schieben','empujar','','','v'],['ziehen','tirar','','','v'],
  ['heben','levantar','','','v'],['senken','bajar','','','v'],
  ['biegen','doblar','','','v'],['brechen','romper','','','v'],
  ['zerbrechen','romper','','','v'],['kaputtmachen','estropear','','','v'],
  ['reparieren','reparar','','','v'],['putzen','limpiar','','','v'],
  ['wischen','limpiar','','','v'],['fegen','barrer','','','v'],
  ['kehren','barrer','','','v'],['spülen','enjuagar','','','v'],
  ['abwaschen','lavar los platos','','','v'],['trocknen','secar','','','v'],
  ['aufhängen','colgar','','','v'],['falten','doblar','','','v'],
  ['einräumen','colocar','','','v'],['ausräumen','vaciar','','','v'],
];

// === A2 vocabulary (town, work, health, travel) ===
const A2_candidates = [
  ['Ampel','semáforo','die','Ampeln','n'],['Kreisel','rotonda','der','Kreisel','n'],
  ['Einbahnstraße','dirección única','die','Einbahnstraßen','n'],['Fußgängerzone','zona peatonal','die','Fußgängerzonen','n'],
  ['Spielplatz','parque infantil','der','Spielplätze','n'],['Parkbank','banco','die','Parkbänke','n'],
  ['Rathaus','ayuntamiento','das','Rathäuser','n'],['Polizeiwache','comisaría','die','Polizeiwachen','n'],
  ['Feuerwache','parque de bomberos','die','Feuerwachen','n'],['Krankenhaus','hospital','das','Krankenhäuser','n'],
  ['Praxis','consulta','die','Praxen','n'],['Zahnarzt','dentista','der','Zahnärzte','n'],
  ['Hautarzt','dermatólogo','der','Hautärzte','n'],['Augenarzt','oculista','der','Augenärzte','n'],
  ['Kinderarzt','pediatra','der','Kinderärzte','n'],['Tierarzt','veterinario','der','Tierärzte','n'],
  ['Sprechzimmer','consultorio','das','Sprechzimmer','n'],['Wartezimmer','sala de espera','das','Wartezimmer','n'],
  ['Krankschreibung','baja médica','die','Krankschreibungen','n'],['Krankenkasse','seguro médico','die','Krankenkassen','n'],
  ['Versicherungskarte','tarjeta sanitaria','die','Versicherungskarten','n'],['Impfung','vacuna','die','Impfungen','n'],
  ['Spritze','inyección','die','Spritzen','n'],['Blutabnahme','extracción de sangre','die','Blutabnahmen','n'],
  ['Blutdruck','presión arterial','der','Blutdrucke','n'],['Puls','pulso','der','Pulse','n'],
  ['Fieberthermometer','termómetro','das','Fieberthermometer','n'],['Waage','báscula','die','Waagen','n'],
  ['Rolltreppe','escalera mecánica','die','Rolltreppen','n'],['Aufzug','ascensor','der','Aufzüge','n'],
  ['Fahrstuhl','ascensor','der','Fahrstühle','n'],['Eingangstür','puerta de entrada','die','Eingangstüren','n'],
  ['Haustür','puerta principal','die','Haustüren','n'],['Nebeneingang','entrada lateral','der','Nebeneingänge','n'],
  ['Hintertür','puerta trasera','die','Hintertüren','n'],['Notausgang','salida de emergencia','der','Notausgänge','n'],
  ['Feueralarm','alarma de incendios','der','Feueralarme','n'],['Rauchmelder','detector de humo','der','Rauchmelder','n'],
  ['Hausnummer','número de casa','die','Hausnummern','n'],['Postleitzahl','código postal','die','Postleitzahlen','n'],
  ['Wohnort','lugar de residencia','der','Wohnorte','n'],['Meldeadresse','dirección registrada','die','Meldeadressen','n'],
  ['Anmeldung','registro','die','Anmeldungen','n'],['Abmeldung','baja','die','Abmeldungen','n'],
  ['Ummeldung','cambio de registro','die','Ummeldungen','n'],['Personalausweis','DNI','der','Personalausweise','n'],
  ['Reisepass','pasaporte','der','Reisepässe','n'],['Führerschein','carnet de conducir','der','Führerscheine','n'],
  ['Geburtsurkunde','certificado de nacimiento','die','Geburtsurkunden','n'],['Heiratsurkunde','certificado de matrimonio','die','Heiratsurkunden','n'],
  ['Staatsangehörigkeit','nacionalidad','die','Staatsangehörigkeiten','n'],['Aufenthaltstitel','permiso de residencia','der','Aufenthaltstitel','n'],
  ['Arbeitserlaubnis','permiso de trabajo','die','Arbeitserlaubnisse','n'],['Visum','visado','das','Visa','n'],
  ['Antrag','solicitud','der','Anträge','n'],['Formular','formulario','das','Formulare','n'],
  ['Unterschrift','firma','die','Unterschriften','n'],['Abgabefrist','plazo','die','Abgabefristen','n'],
  ['Frist','plazo','die','Fristen','n'],['Fristverlängerung','prórroga','die','Fristverlängerungen','n'],
  ['Termin','cita','der','Termine','n'],['Vereinbarung','acuerdo','die','Vereinbarungen','n'],
  ['Absage','cancelación','die','Absagen','n'],['Verschiebung','aplazamiento','die','Verschiebungen','n'],
  ['Bestätigung','confirmación','die','Bestätigungen','n'],['Rückmeldung','respuesta','die','Rückmeldungen','n'],
  ['Bescheid','notificación','der','Bescheide','n'],['Mitteilung','comunicación','die','Mitteilungen','n'],
  ['Benachrichtigung','notificación','die','Benachrichtigungen','n'],['Ankündigung','anuncio','die','Ankündigungen','n'],
  ['Werbung','publicidad','die','Werbungen','n'],['Anzeige','anuncio','die','Anzeigen','n'],
  ['Prospekt','folleto','der','Prospekte','n'],['Flyer','panfleto','der','Flyer','n'],
  ['Plakat','cartel','das','Plakate','n'],['Schaufenster','escaparate','das','Schaufenster','n'],
  ['Schaufensterbummel','escaparatismo','der','-','n'],['Einkaufszentrum','centro comercial','das','Einkaufszentren','n'],
  ['Kaufhaus','grandes almacenes','das','Kaufhäuser','n'],['Supermarkt','supermercado','der','Supermärkte','n'],
  ['Bäcker','panadería','der','Bäcker','n'],['Metzger','carnicería','der','Metzger','n'],
  ['Friseur','peluquería','der','Friseure','n'],['Reinigung','tintorería','die','Reinigungen','n'],
  ['Wäscherei','lavandería','die','Wäschereien','n'],['Schuster','zapatero','der','Schuster','n'],
  ['Schlüsseldienst','cerrajero','der','Schlüsseldienste','n'],['Handwerker','artesano','der','Handwerker','n'],
  ['Elektriker','electricista','der','Elektriker','n'],['Klempner','fontanero','der','Klempner','n'],
  ['Maler','pintor','der','Maler','n'],['Tischler','carpintero','der','Tischler','n'],
  ['Gärtner','jardinero','der','Gärtner','n'],['Hausmeister','conserje','der','Hausmeister','n'],
  ['Pförtner','portero','der','Pförtner','n'],['Rezeptionist','recepcionista','der','Rezeptionisten','n'],
  ['Sekretärin','secretaria','die','Sekretärinnen','n'],['Buchhalter','contable','der','Buchhalter','n'],
  ['Personalchef','jefe de personal','der','Personalchefs','n'],['Geschäftsführer','gerente','der','Geschäftsführer','n'],
  ['Abteilungsleiter','jefe de departamento','der','Abteilungsleiter','n'],['Stellvertreter','suplente','der','Stellvertreter','n'],
  ['Auszubildende','aprendiz','der','Auszubildenden','n'],['Praktikant','becario','der','Praktikanten','n'],
  ['Arbeitsvertrag','contrato laboral','der','Arbeitsverträge','n'],['Kündigungsfrist','plazo de preaviso','die','Kündigungsfristen','n'],
  ['Kündigungsschutz','protección contra despido','der','-','n'],['Arbeitszeugnis','certificado laboral','das','Arbeitszeugnisse','n'],
  ['Gehaltsabrechnung','nómina','die','Gehaltsabrechnungen','n'],['Lohnsteuer','impuesto sobre salarios','die','Lohnsteuern','n'],
  ['Sozialversicherung','seguridad social','die','Sozialversicherungen','n'],['Rentenversicherung','seguro de pensiones','die','Rentenversicherungen','n'],
  ['Krankenversicherung','seguro médico','die','Krankenversicherungen','n'],['Arbeitslosengeld','prestación por desempleo','das','-','n'],
  ['Kindergeld','prestación por hijo','das','-','n'],['Elternzeit','permiso parental','die','-','n'],
  ['Mutterschutz','protección maternal','der','-','n'],['Urlaubstag','día de vacaciones','der','Urlaubstage','n'],
  ['Krankheitstag','día de enfermedad','der','Krankheitstage','n'],['Fehlzeit','ausencia','die','Fehlzeiten','n'],
  ['Überstunde','hora extra','die','Überstunden','n'],['Schicht','turno','die','Schichten','n'],
  ['Frühschicht','turno de mañana','die','Frühschichten','n'],['Spätschicht','turno de tarde','die','Spätschichten','n'],
  ['Nachtschicht','turno de noche','die','Nachtschichten','n'],['Teilzeit','media jornada','die','-','n'],
  ['Vollzeit','jornada completa','die','-','n'],['Minijob','miniempleo','der','Minijobs','n'],
  ['Nebenjob','trabajo extra','der','Nebenjobs','n'],['Selbstständigkeit','autónomo','die','-','n'],
  ['Freiberufler','profesional liberal','der','Freiberufler','n'],['Firma','empresa','die','Firmen','n'],
  ['Betrieb','empresa','der','Betriebe','n'],['Unternehmen','empresa','das','Unternehmen','n'],
  ['Konzern','grupo empresarial','der','Konzerne','n'],['Firmensitz','sede','der','Firmensitze','n'],
  ['Niederlassung','sucursal','die','Niederlassungen','n'],['Filiale','filial','die','Filialen','n'],
  ['Zentrale','central','die','Zentralen','n'],['Hauptsitz','sede central','der','Hauptsitze','n'],
  ['Standort','ubicación','der','Standorte','n'],['Werk','fábrica','das','Werke','n'],
  ['Fabrik','fábrica','die','Fabriken','n'],['Produktion','producción','die','Produktionen','n'],
  ['Lager','almacén','das','Lager','n'],['Versand','envío','der','Versande','n'],
  ['Kantine','cantina','die','Kantinen','n'],['Pausenraum','sala de descanso','der','Pausenräume','n'],
  ['Besprechungsraum','sala de reuniones','der','Besprechungsräume','n'],['Konferenzraum','sala de conferencias','der','Konferenzräume','n'],
  ['Chefetage','dirección','die','Chefetagen','n'],['Büro','oficina','das','Büros','n'],
  ['Großraumbüro','oficina diáfana','das','Großraumbüros','n'],['Einzelbüro','despacho individual','das','Einzelbüros','n'],
  ['Computer','ordenador','der','Computer','n'],['Tastatur','teclado','die','Tastaturen','n'],
  ['Maus','ratón','die','Mäuse','n'],['Bildschirm','pantalla','der','Bildschirme','n'],
  ['Drucker','impresora','der','Drucker','n'],['Kopierer','fotocopiadora','der','Kopierer','n'],
  ['Scanner','escáner','der','Scanner','n'],['Telefon','teléfono','das','Telefone','n'],
  ['Handy','móvil','das','Handys','n'],['Diensthandy','móvil de empresa','das','Diensthandys','n'],
  ['Dienstwagen','coche de empresa','der','Dienstwagen','n'],['Dienstreise','viaje de negocios','die','Dienstreisen','n'],
  ['Geschäftsreise','viaje de negocios','die','Geschäftsreisen','n'],['Tagung','congreso','die','Tagungen','n'],
  ['Konferenz','conferencia','die','Konferenzen','n'],['Messe','feria','die','Messen','n'],
  ['Kongress','congreso','der','Kongresse','n'],['Seminar','seminario','das','Seminare','n'],
  ['Workshop','taller','der','Workshops','n'],['Schulung','formación','die','Schulungen','n'],
  ['Weiterbildung','formación continua','die','Weiterbildungen','n'],['Fortbildung','formación continua','die','Fortbildungen','n'],
  ['Umschulung','reciclaje profesional','die','Umschulungen','n'],['Qualifikation','cualificación','die','Qualifikationen','n'],
  ['Kenntnis','conocimiento','die','Kenntnisse','n'],['Fremdsprache','idioma extranjero','die','Fremdsprachen','n'],
  ['Sprachkenntnisse','conocimientos de idiomas','die','-','n'],['EDV-Kenntnisse','conocimientos informáticos','die','-','n'],
  ['Berufserfahrung','experiencia laboral','die','-','n'],['Praktikum','prácticas','das','Praktika','n'],
  ['Referenz','referencia','die','Referenzen','n'],['Empfehlungsschreiben','carta de recomendación','das','Empfehlungsschreiben','n'],
  ['Lebenslauf','currículum','der','Lebensläufe','n'],['Bewerbungsschreiben','carta de presentación','das','Bewerbungsschreiben','n'],
  ['Vorstellungsgespräch','entrevista','das','Vorstellungsgespräche','n'],['Einstellungstest','test de selección','der','Einstellungstests','n'],
  ['Probezeit','período de prueba','die','Probezeiten','n'],['Einarbeitung','formación inicial','die','Einarbeitungen','n'],
  ['Beförderung','ascenso','die','Beförderungen','n'],['Gehaltserhöhung','aumento salarial','die','Gehaltserhöhungen','n'],
  ['Prämie','prima','die','Prämien','n'],['Bonus','bonificación','der','Boni','n'],
  ['Weihnachtsgeld','paga de Navidad','das','-','n'],['Urlaubsgeld','paga de vacaciones','das','-','n'],
  ['Gewinnbeteiligung','participación en beneficios','die','Gewinnbeteiligungen','n'],['Aktie','acción','die','Aktien','n'],
  ['Tarifvertrag','convenio colectivo','der','Tarifverträge','n'],['Mindestlohn','salario mínimo','der','-','n'],
  ['Lohnnebenkosten','costes salariales','die','-','n'],['Arbeitsrecht','derecho laboral','das','-','n'],
  ['Arbeitsgericht','tribunal laboral','das','Arbeitsgerichte','n'],['Betriebsrat','comité de empresa','der','Betriebsräte','n'],
  ['Gewerkschaft','sindicato','die','Gewerkschaften','n'],['Streik','huelga','der','Streiks','n'],
  ['Versammlung','asamblea','die','Versammlungen','n'],['Demonstration','manifestación','die','Demonstrationen','n'],
  ['Kundgebung','concentración','die','Kundgebungen','n'],['Protest','protesta','der','Proteste','n'],
  ['Petition','petición','die','Petitionen','n'],['Unterschriftensammlung','recogida de firmas','die','Unterschriftensammlungen','n'],
  ['Bürgerinitiative','iniciativa ciudadana','die','Bürgerinitiativen','n'],['Spende','donación','die','Spenden','n'],
  ['Spendenaktion','campaña de donación','die','Spendenaktionen','n'],['Wohltätigkeit','caridad','die','Wohltätigkeiten','n'],
  ['Ehrenamt','voluntariado','das','Ehrenämter','n'],['Freiwilligenarbeit','trabajo voluntario','die','-','n'],
  ['Verein','asociación','der','Vereine','n'],['Club','club','der','Clubs','n'],
  ['Verband','asociación','der','Verbände','n'],['Stiftung','fundación','die','Stiftungen','n'],
  ['Stipendium','beca','das','Stipendien','n'],['Förderung','subvención','die','Förderungen','n'],
  ['Zuschuss','subsidio','der','Zuschüsse','n'],['Darlehen','préstamo','das','Darlehen','n'],
  ['Kredit','crédito','der','Kredite','n'],['Hypothek','hipoteca','die','Hypotheken','n'],
  ['Bausparvertrag','contrato de ahorro vivienda','der','Bausparverträge','n'],['Lebensversicherung','seguro de vida','die','Lebensversicherungen','n'],
  ['Haftpflichtversicherung','seguro de responsabilidad','die','Haftpflichtversicherungen','n'],['Hausratversicherung','seguro de hogar','die','Hausratversicherungen','n'],
  ['Reiseversicherung','seguro de viaje','die','Reiseversicherungen','n'],['Rechtsschutzversicherung','seguro de defensa jurídica','die','Rechtsschutzversicherungen','n'],
  ['Unfallversicherung','seguro de accidentes','die','Unfallversicherungen','n'],['Pflegeversicherung','seguro de dependencia','die','Pflegeversicherungen','n'],
  ['Arbeitslosenversicherung','seguro de desempleo','die','Arbeitslosenversicherungen','n'],
];

// Count how many unique candidates we have
const allCandidates = [...A1_candidates, ...A2_candidates];
const usedCount = allCandidates.filter(w => usedGermanWords.has(w[0].toLowerCase())).length;
console.log(`Total candidates: ${allCandidates.length}`);
console.log(`Already used: ${usedCount}`);
console.log(`Unique candidates: ${allCandidates.length - usedCount}`);

const uniqueCandidates = allCandidates.filter(w => !usedGermanWords.has(w[0].toLowerCase()));

// Distribute unique candidates by level
const levelOrder = ['A1.3','A1.4','A2.3','A2.4','B1.2','B1.3','B1.4','B2.4','C1.2','A1.2','A2.2'];

let idx = 0;
const newWordsByLevel = {};

levelOrder.forEach(lvl => {
  if (!levelInfo[lvl]) return;
  const need = levelInfo[lvl].need;
  if (need <= 0) return;
  if (idx >= uniqueCandidates.length) return;
  const n = Math.min(need, uniqueCandidates.length - idx);
  newWordsByLevel[lvl] = uniqueCandidates.slice(idx, idx + n);
  idx += n;
});

console.log(`\nWill inject ${idx} words`);

// Inject into file (reverse order)
let result = content;

const sortedLevels = [...levelOrder].sort((a, b) => 
  (levelInfo[b]?.blockEnd || 0) - (levelInfo[a]?.blockEnd || 0)
);

sortedLevels.forEach(lvl => {
  const info = levelInfo[lvl];
  const newWords = newWordsByLevel[lvl];
  if (!info || !newWords || newWords.length === 0) return;
  
  const wordStrings = newWords.map(w => `['${w[0]}','${w[1]}','${w[2]}','${w[3]}','${w[4]}']`);
  const insertPos = info.blockEnd;
  result = result.substring(0, insertPos) + ',\n' + wordStrings.join(',\n') + '\n' + result.substring(insertPos);
  
  // Update blockEnd for future injections
  levelInfo[lvl].blockEnd += wordStrings.length * 2; // approximate
});

fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', result, 'utf8');
console.log('\nSaved!');