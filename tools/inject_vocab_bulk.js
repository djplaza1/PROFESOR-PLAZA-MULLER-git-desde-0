const fs = require('fs');

// Read existing rutaHelpers content
let content = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Step 1: Extract all existing German words to avoid duplicates
const existingWords = {};
const wordRegex = /\['([^']+)','([^']*)','([^']*)','([^']*)','([^']+)'\]/g;
let match;
while ((match = wordRegex.exec(content)) !== null) {
  existingWords[match[1].toLowerCase()] = true;
}
console.log('Existing unique German words:', Object.keys(existingWords).length);

// Step 2: Level mapping (A1 -> A1.1, A1.2, A1.3, A1.4)
const levelSublevels = {
  'A1': ['A1.1','A1.2','A1.3','A1.4'],
  'A2': ['A2.1','A2.2','A2.3','A2.4'],
  'B1': ['B1.1','B1.2','B1.3','B1.4'],
  'B2': ['B2.1','B2.2','B2.3','B2.4'],
  'C1': ['C1.1','C1.2']
};

const allSublevels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4','B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'];

// Data to inject per sublevel
const injectData = {};
allSublevels.forEach(s => injectData[s] = []);

function parseNoun(entry) {
  const parts = entry.de.trim().split(' ');
  let article = '', word = '';
  if (['der','die','das'].includes(parts[0].toLowerCase())) {
    article = parts[0];
    word = parts.slice(1).join(' ');
  } else {
    word = parts.join(' ');
  }
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return { word, article };
}

// ===== SOURCE 1: articulos.json (3,577 nouns) =====
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
console.log('Source 1 - articulos.json:', articulos.length, 'nouns');

let source1Count = 0;
articulos.forEach(entry => {
  const { word, article } = parseNoun(entry);
  if (!word || word.length === 0 || word.length > 40) return;
  if (existingWords[word.toLowerCase()]) return;
  existingWords[word.toLowerCase()] = true;
  
  const level = entry.level;
  const subs = levelSublevels[level];
  if (!subs) return;
  
  // Pick sublevel with fewest additions so far
  let minSub = subs[0];
  let minCount = injectData[minSub].length;
  for (let i = 1; i < subs.length; i++) {
    if (injectData[subs[i]].length < minCount) {
      minSub = subs[i];
      minCount = injectData[minSub].length;
    }
  }
  
  injectData[minSub].push({ word, es: entry.es, article, plural: '', type: 'n' });
  source1Count++;
});
console.log('  Injected:', source1Count);

// ===== SOURCE 2: Additional synthetic vocabulary =====
// We need to generate more words to reach 5000+ total
// These are common German words not found in articulos.json

const additionalVocab = {
  // A1.1 - Basic words
  'A1.1': [
    // More basic nouns
    ['das Zimmer', 'la habitación'], ['der Garten', 'el jardín'], ['die Blume', 'la flor'], 
    ['der Baum', 'el árbol'], ['die Sonne', 'el sol'], ['der Mond', 'la luna'],
    ['der Stern', 'la estrella'], ['der Himmel', 'el cielo'], ['die Erde', 'la tierra'],
    ['das Feuer', 'el fuego'], ['die Farbe', 'el color'], ['rot', 'rojo', '', '', 'adj'],
    ['blau', 'azul', '', '', 'adj'], ['grün', 'verde', '', '', 'adj'], ['gelb', 'amarillo', '', '', 'adj'],
    ['weiß', 'blanco', '', '', 'adj'], ['schwarz', 'negro', '', '', 'adj'], ['braun', 'marrón', '', '', 'adj'],
    ['eins', 'uno', '', '', 'num'], ['zwei', 'dos', '', '', 'num'], ['drei', 'tres', '', '', 'num'],
    ['vier', 'cuatro', '', '', 'num'], ['fünf', 'cinco', '', '', 'num'], ['sechs', 'seis', '', '', 'num'],
    ['sieben', 'siete', '', '', 'num'], ['acht', 'ocho', '', '', 'num'], ['neun', 'nueve', '', '', 'num'],
    ['zehn', 'diez', '', '', 'num'], ['elf', 'once', '', '', 'num'], ['zwölf', 'doce', '', '', 'num'],
    ['der Teller', 'el plato'], ['die Tasse', 'la taza'], ['das Glas', 'el vaso'],
    ['der Löffel', 'la cuchara'], ['die Gabel', 'el tenedor'], ['das Messer', 'el cuchillo'],
    ['die Flasche', 'la botella'], ['der Computer', 'el ordenador'], ['das Handy', 'el móvil'],
    ['der Schlüssel', 'la llave'], ['die Uhr', 'el reloj'], ['der Stift', 'el bolígrafo'],
    ['das Papier', 'el papel'], ['der Bleistift', 'el lápiz'], ['der Radiergummi', 'la goma'],
    ['die Tasche', 'la bolsa'], ['der Rucksack', 'la mochila'], ['die Jacke', 'la chaqueta'],
    ['der Schuh', 'el zapato'], ['die Hose', 'el pantalón'], ['das Hemd', 'la camisa'],
    ['der Rock', 'la falda'], ['die Mütze', 'el gorro'], ['der Gürtel', 'el cinturón'],
    ['der Regenschirm', 'el paraguas'], ['die Brille', 'las gafas'], ['die Karte', 'el mapa'],
    ['die Straße', 'la calle'], ['der Platz', 'la plaza'], ['die Brücke', 'el puente'],
    ['der Zug', 'el tren'], ['das Taxi', 'el taxi'], ['das Fahrrad', 'la bicicleta'],
    ['ja', 'sí', '', '', 'adv'], ['nein', 'no', '', '', 'adv'], ['bitte', 'por favor', '', '', 'adv'],
    ['danke', 'gracias', '', '', 'adv'], ['hallo', 'hola', '', '', 'adv'], ['tschüss', 'adiós', '', '', 'adv'],
    ['heute', 'hoy', '', '', 'adv'], ['morgen', 'mañana', '', '', 'adv'], ['jetzt', 'ahora', '', '', 'adv'],
    ['spät', 'tarde', '', '', 'adj'], ['früh', 'temprano', '', '', 'adj'],
    ['sauber', 'limpio', '', '', 'adj'], ['schmutzig', 'sucio', '', '', 'adj'],
    ['leer', 'vacío', '', '', 'adj'], ['voll', 'lleno', '', '', 'adj'],
    ['richtig', 'correcto', '', '', 'adj'], ['falsch', 'incorrecto', '', '', 'adj'],
    ['wichtig', 'importante', '', '', 'adj'], ['billig', 'barato', '', '', 'adj'],
    ['teuer', 'caro', '', '', 'adj'], ['lang', 'largo', '', '', 'adj'], ['kurz', 'corto', '', '', 'adj'],
    ['dick', 'gordo', '', '', 'adj'], ['dünn', 'delgado', '', '', 'adj'],
    ['jung', 'joven', '', '', 'adj'], ['süß', 'dulce', '', '', 'adj'],
    ['das Frühstück', 'el desayuno'], ['das Mittagessen', 'la comida'],
    ['das Abendessen', 'la cena'], ['das Obst', 'la fruta'], ['das Gemüse', 'la verdura'],
    ['die Milch', 'la leche', '', 'n'], ['der Käse', 'el queso'], ['die Butter', 'la mantequilla'],
    ['das Ei', 'el huevo'], ['der Reis', 'el arroz'], ['die Nudel', 'el fideo'],
    ['die Suppe', 'la sopa'], ['der Salat', 'la ensalada'], ['der Saft', 'el zumo'],
    ['der Hunger', 'el hambre'], ['der Durst', 'la sed'],
    ['der Kopf', 'la cabeza'], ['das Auge', 'el ojo'], ['die Nase', 'la nariz'],
    ['der Mund', 'la boca'], ['das Ohr', 'la oreja'], ['die Hand', 'la mano'],
    ['der Fuß', 'el pie'], ['der Arm', 'el brazo'], ['das Bein', 'la pierna'],
    ['der Finger', 'el dedo'], ['der Zahn', 'el diente'],
  ],
  // A1.2
  'A1.2': [
    ['der Hund', 'el perro', 'n'], ['die Katze', 'la gato', 'n'],
    ['das Pferd', 'el caballo'], ['der Vogel', 'el pájaro'], ['die Maus', 'el ratón'],
    ['die Schlange', 'la serpiente'], ['der Affe', 'el mono'], ['der Fisch', 'el pez'],
    ['der Elefant', 'el elefante'], ['der Tiger', 'el tigre'], ['der Löwe', 'el león'],
    ['die Biene', 'la abeja'], ['der Schmetterling', 'la mariposa'],
    ['die Party', 'la fiesta'], ['das Konzert', 'el concierto'], ['das Kino', 'el cine'],
    ['das Theater', 'el teatro'], ['das Museum', 'el museo'], ['der Park', 'el parque'],
    ['das Schwimmbad', 'la piscina'], ['das Stadion', 'el estadio'],
    ['der Sport', 'el deporte'], ['der Fußball', 'el fútbol'], ['der Basketball', 'el baloncesto'],
    ['der Tennis', 'el tenis'], ['das Fahrrad', 'la bicicleta'],
    ['der Morgen', 'la mañana'], ['der Mittag', 'el mediodía'],
    ['der Nachmittag', 'la tarde'], ['der Abend', 'la tarde/noche'],
    ['die Minute', 'el minuto'], ['die Stunde', 'la hora'], ['der Monat', 'el mes'],
    ['Montag', 'lunes', '', '', 'adv'], ['Dienstag', 'martes', '', '', 'adv'],
    ['Mittwoch', 'miércoles', '', '', 'adv'], ['Donnerstag', 'jueves', '', '', 'adv'],
    ['Freitag', 'viernes', '', '', 'adv'], ['Samstag', 'sábado', '', '', 'adv'],
    ['Sonntag', 'domingo', '', '', 'adv'],
    ['der Januar', 'enero'], ['der Februar', 'febrero'], ['der März', 'marzo'],
    ['der April', 'abril'], ['der Mai', 'mayo'], ['der Juni', 'junio'],
    ['der Juli', 'julio'], ['der August', 'agosto'], ['der September', 'septiembre'],
    ['der Oktober', 'octubre'], ['der November', 'noviembre'], ['der Dezember', 'diciembre'],
    ['der Frühling', 'primavera'], ['der Sommer', 'verano'], ['der Herbst', 'otoño'],
    ['der Winter', 'invierno'],
    ['heiß', 'caliente', '', '', 'adj'], ['kalt', 'frío', '', '', 'adj'],
    ['warm', 'templado', '', '', 'adj'], ['kühl', 'fresco', '', '', 'adj'],
    ['regnerisch', 'lluvioso', '', '', 'adj'], ['sonnig', 'soleado', '', '', 'adj'],
    ['windig', 'ventoso', '', '', 'adj'], ['bewölkt', 'nublado', '', '', 'adj'],
    ['das Wetter', 'el tiempo'], ['der Regen', 'la lluvia'], ['der Schnee', 'la nieve'],
    ['der Wind', 'el viento'], ['die Wolke', 'la nube'],
    ['laufen', 'correr', '', '', 'v'], ['schwimmen', 'nadar', '', '', 'v'],
    ['singem', 'cantar', '', '', 'v'], ['tanzen', 'bailar', '', '', 'v'],
    ['malen', 'pintar', '', '', 'v'], ['zeichnen', 'dibujar', '', '', 'v'],
    ['fernsehen', 'ver la tele', '', '', 'v'], ['hören', 'escuchar', '', '', 'v'],
    ['kochen', 'cocinar', '', '', 'v'], ['backen', 'hornear', '', '', 'v'],
    ['putzen', 'limpiar', '', '', 'v'], ['waschen', 'lavar', '', '', 'v'],
    ['schlafen', 'dormir', '', '', 'v'], ['aufwachen', 'despertarse', '', '', 'v'],
    ['einkaufen', 'comprar', '', '', 'v'],
  ]
};

// Check if word exists already
function wordExists(word) {
  return !!existingWords[word.toLowerCase()];
}

function markWord(word) {
  existingWords[word.toLowerCase()] = true;
}

// Process additional vocab
for (const [level, words] of Object.entries(additionalVocab)) {
  let added = 0;
  words.forEach(w => {
    let german, spanish, article = '', plural = '', type = 'n';
    if (w.length === 5) {
      [german, spanish, article, plural, type] = w;
    } else if (w.length === 4) {
      [german, spanish, article, plural] = w;
    } else if (w.length === 3) {
      [german, spanish, type] = w;
    } else if (w.length === 2) {
      [german, spanish] = w;
    }
    
    // Extract article from german if present
    const parts = german.trim().split(' ');
    if (['der','die','das'].includes(parts[0].toLowerCase()) && parts.length > 1) {
      article = parts[0];
      german = parts.slice(1).join(' ');
    }
    
    if (!german || german.length === 0) return;
    if (wordExists(german)) return;
    markWord(german);
    injectData[level].push({ word: german, es: spanish, article, plural, type });
    added++;
  });
  console.log(`  Additional ${level}:`, added);
}

// Print summary
console.log('\n=== INJECTION SUMMARY ===');
let totalNew = 0;
allSublevels.forEach(s => {
  console.log(s, ':', injectData[s].length);
  totalNew += injectData[s].length;
});
console.log('Total new words:', totalNew);

// Generate the injection as formatted JS array entries
// For each sublevel, find the last addLevel block and inject before ]);
allSublevels.forEach(level => {
  const words = injectData[level];
  if (words.length === 0) return;
  
  // Find the LAST occurrence of addLevel for this level
  const regex = new RegExp(`addLevel\\(['"]${level.replace('.', '\\.')}['"]`, 'g');
  let lastMatch = null;
  while ((match = regex.exec(content)) !== null) {
    lastMatch = match;
  }
  
  if (!lastMatch) {
    console.log(`  WARNING: addLevel(${level}) not found!`);
    return;
  }
  
  // Find the closing ]); after this position
  const searchStart = lastMatch.index;
  const closePos = content.indexOf(']);', searchStart);
  if (closePos === -1) {
    console.log(`  WARNING: Closing ]); not found for ${level}`);
    return;
  }
  
  // Build entry string
  let entries = [];
  words.forEach(w => {
    let entry;
    if (w.type === 'n') {
      entry = `['${w.word}','${w.es}','${w.article}','${w.plural}','n']`;
    } else if (w.type === 'v') {
      entry = `['${w.word}','${w.es}','','','v']`;
    } else if (w.type === 'adj') {
      entry = `['${w.word}','${w.es}','','','adj']`;
    } else if (w.type === 'adv') {
      entry = `['${w.word}','${w.es}','','','adv']`;
    } else if (w.type === 'num') {
      entry = `['${w.word}','${w.es}','','','num']`;
    } else if (w.type === 'prep') {
      entry = `['${w.word}','${w.es}','','','prep']`;
    } else {
      entry = `['${w.word}','${w.es}','${w.article||''}','${w.plural||''}','n']`;
    }
    entries.push(entry);
  });
  
  let insertText = ',' + entries.join(',');
  
  // Insert before ]);
  content = content.slice(0, closePos) + insertText + content.slice(closePos);
  console.log(`  Injected ${words.length} words into ${level}`);
});

// Write back
fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', content, 'utf8');
console.log('\n✓ File written successfully!');