/**
 * tools/mega_vocab_extractor.js
 * 
 * FASE 0: Extrae vocabulario de TODAS las fuentes disponibles
 * y genera addLevel() calls para inyectar en rutaHelpers.jsx
 * 
 * Objetivo: Expandir de ~3,570 a ~8,000+ palabras
 * 
 * Fuentes:
 *   1. maestros/contenido/ (9 archivos × 35KB = ~315KB de contenido)
 *   2. historia/data/defaultGuion.jsx
 *   3. lectura/lecturaHelpers.jsx
 *   4. entrenamiento/entrenamientoHelpers.jsx
 *   5. historia/data/tempusDict.jsx
 *   6. Palabras sintéticas adicionales por nivel
 *   7. Diccionario ya en articulos.json (ya inyectado)
 * 
 * Uso: node tools/mega_vocab_extractor.js
 *   → Genera tools/vocab_mega_output.jsx con addLevel() calls
 *   node tools/mega_vocab_extractor.js --inject
 *   → Inyecta directamente en rutaHelpers.jsx
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RUTA_FILE = path.join(ROOT, 'src', 'features', 'ruta', 'rutaHelpers.jsx');
const OUTPUT_FILE = path.join(ROOT, 'tools', 'vocab_mega_output.jsx');

// ── Niveles objetivo con sus badges ──
const NIVELES = [
  'A1.1', 'A1.2', 'A1.3', 'A1.4',
  'A2.1', 'A2.2', 'A2.3', 'A2.4',
  'B1.1', 'B1.2', 'B1.3', 'B1.4',
  'B2.1', 'B2.2', 'B2.3', 'B2.4',
  'C1.1', 'C1.2'
];

// ── Mapeo de nivel de archivo a badge de ruta ──
function nivelToBadges(nivelId) {
  const map = {
    'A1_1': ['A1.1', 'A1.2'],
    'A1_2': ['A1.3', 'A1.4'],
    'A2_1': ['A2.1', 'A2.2'],
    'A2_2': ['A2.3', 'A2.4'],
    'B1_1': ['B1.1', 'B1.2'],
    'B1_2': ['B1.3', 'B1.4'],
    'B2_1': ['B2.1', 'B2.2'],
    'B2_2': ['B2.3', 'B2.4'],
    'C1': ['C1.1', 'C1.2']
  };
  return map[nivelId] || ['C1.1'];
}

// ── Extraer palabras de archivos de contenido de maestros ──
function extractFromMaestros() {
  const results = {};
  NIVELES.forEach(n => results[n] = []);
  
  const contentFiles = [
    'A1_1', 'A1_2', 'A2_1', 'A2_2',
    'B1_1', 'B1_2', 'B2_1', 'B2_2', 'C1'
  ];
  
  for (const fileId of contentFiles) {
    const filePath = path.join(ROOT, 'src', 'features', 'maestros', 'contenido', `contenido${fileId}.jsx`);
    if (!fs.existsSync(filePath)) continue;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const badges = nivelToBadges(fileId);
    
    // Extraer palabras alemanas: patrones de strings entre comillas simples con texto alemán
    const germanWords = content.match(/'([A-Za-zäöüßÄÖÜ][a-zäöüß]+(?: [a-zäöüß]+)*)'/g) || [];
    const uniqueWords = [...new Set(germanWords.map(w => w.replace(/'/g, '')))];
    
    // Filtrar palabras comunes y técnicas
    const filtered = uniqueWords.filter(w => 
      w.length > 2 &&
      !['der','die','das','und','oder','aber','mit','von','aus','bei','nach','vor','für','auf','an','in','zu','den','dem','des','ein','eine','einen','einer','einem','eines','nicht','kein','keine','ist','sind','war','wird','wurde','hat','haben','hast','habe','sein','seid','bist','sind','waren','wird','werden','wurde','würde','kann','können','kannst','konnte','muss','müssen','musste','will','wollen','wollte','soll','sollen','sollte','darf','dürfen','durfte','mag','mögen','mochte','weiß','wissen','wusste','dieser','diese','dieses','jeder','jede','jedes','alle','viel','viele','wenig','wenige','etwas','man','jemand','niemand','alle','alles','beide','solche','welche','mein','dein','sein','ihr','unser','euer','ihr','Ihr','kein','keine','ja','nein','bitte','danke','sehr','gut','schlecht','groß','klein','alt','jung','neu','alt','hoch','tief','lang','kurz','breit','schmal','dick','dünn','schwer','leicht','hart','weich','schnell','langsam','früh','spät','heute','gestern','morgen','jetzt','gleich','bald','dann','damn','immer','nie','oft','manchmal','selten','meist','wirklich','vielleicht','natürlich','auch','nur','schon','noch','erst','eben','gerade','bereits','schließlich','endlich','also','damit','dazu','dafür','dagegen','darum','deshalb','deswegen','trotzdem','jedoch','allerdings','denn','weil','dass','wenn','als','obwohl','da','wie','wo','was','wer','wen','wem','wessen','wann','warum','weshalb','wieso','woher','wohin','woran','worauf','womit','wodurch','worüber','worunter','daran','darauf','darin','daraus','damit','danach','davon','davor','dazu','dazwischen']
    );
    
    // Asignar palabras a los badges correspondientes
    let idx = 0;
    for (const badge of badges) {
      const sliceSize = Math.ceil(filtered.length / badges.length);
      const wordsForLevel = filtered.slice(idx, idx + sliceSize);
      for (const word of wordsForLevel) {
        results[badge].push({
          de: word,
          es: `[${word}]`,
          art: '',
          plural: '',
          tipo: 'vocab',
          fuente: `contenido${fileId}`
        });
      }
      idx += sliceSize;
    }
    console.log(`  ${fileId}: ${filtered.length} palabras únicas → ${badges.join(', ')}`);
  }
  
  return results;
}

// ── Extraer de historia/defaultGuion.jsx ──
function extractFromHistoria() {
  const results = {};
  NIVELES.forEach(n => results[n] = []);
  
  const paths = [
    path.join(ROOT, 'src', 'features', 'historia', 'data', 'defaultGuion.jsx'),
    path.join(ROOT, 'src', 'features', 'historia', 'data', 'tempusDict.jsx'),
    path.join(ROOT, 'src', 'features', 'historia', 'data', 'oralB1Questions.jsx')
  ];
  
  for (const filePath of paths) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extraer palabras alemanas de strings
    const germanWords = content.match(/'([A-Za-zäöüßÄÖÜ][a-zäöüß]*(?: [a-zäöüß]+)*)'/g) || [];
    const uniqueWords = [...new Set(germanWords.map(w => w.replace(/'/g, '').trim()))];
    
    const filtered = uniqueWords.filter(w => w.length > 3);
    
    // Asignar a niveles B1-C1 (historia es más avanzada)
    ['B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'].forEach((badge, i) => {
      const sliceSize = Math.ceil(filtered.length / 10);
      const start = i * sliceSize;
      for (let j = start; j < Math.min(start + sliceSize, filtered.length); j++) {
        results[badge].push({
          de: filtered[j],
          es: `[${filtered[j]}]`,
          art: '',
          plural: '',
          tipo: 'historia',
          fuente: path.basename(filePath)
        });
      }
    });
    console.log(`  ${path.basename(filePath)}: ${filtered.length} palabras únicas`);
  }
  
  return results;
}

// ── Extraer de lectura/lecturaHelpers.jsx ──
function extractFromLectura() {
  const results = {};
  NIVELES.forEach(n => results[n] = []);
  
  const filePath = path.join(ROOT, 'src', 'features', 'lectura', 'lecturaHelpers.jsx');
  if (!fs.existsSync(filePath)) return results;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraer palabras de strings entre comillas simples
  const germanWords = content.match(/'([A-Za-zäöüßÄÖÜ][a-zäöüß]*(?: [a-zäöüß]+)*)'/g) || [];
  const uniqueWords = [...new Set(germanWords.map(w => w.replace(/'/g, '').trim()))];
  
  const filtered = uniqueWords.filter(w => w.length > 3);
  
  // Distribuir equitativamente entre todos los niveles
  NIVELES.forEach((badge, i) => {
    const sliceSize = Math.ceil(filtered.length / NIVELES.length);
    const start = i * sliceSize;
    for (let j = start; j < Math.min(start + sliceSize, filtered.length); j++) {
      results[badge].push({
        de: filtered[j],
        es: `[${filtered[j]}]`,
        art: '',
        plural: '',
        tipo: 'lectura',
        fuente: 'lecturaHelpers'
      });
    }
  });
  console.log(`  lecturaHelpers.jsx: ${filtered.length} palabras únicas`);
  
  return results;
}

// ── Extraer de entrenamiento/entrenamientoHelpers.jsx ──
function extractFromEntrenamiento() {
  const results = {};
  NIVELES.forEach(n => results[n] = []);
  
  const filePath = path.join(ROOT, 'src', 'features', 'entrenamiento', 'entrenamientoHelpers.jsx');
  if (!fs.existsSync(filePath)) return results;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraer palabras alemanas de strings
  const germanWords = content.match(/'([A-Za-zäöüßÄÖÜ][a-zäöüß]*(?: [a-zäöüß]+)*)'/g) || [];
  const uniqueWords = [...new Set(germanWords.map(w => w.replace(/'/g, '').trim()))];
  
  const filtered = uniqueWords.filter(w => w.length > 3 && w.length < 30);
  
  // Distribuir en todos los niveles
  NIVELES.forEach((badge, i) => {
    const sliceSize = Math.ceil(filtered.length / NIVELES.length);
    const start = i * sliceSize;
    for (let j = start; j < Math.min(start + sliceSize, filtered.length); j++) {
      results[badge].push({
        de: filtered[j],
        es: `[${filtered[j]}]`,
        art: '',
        plural: '',
        tipo: 'entrenamiento',
        fuente: 'entrenamientoHelpers'
      });
    }
  });
  console.log(`  entrenamientoHelpers.jsx: ${filtered.length} palabras únicas`);
  
  return results;
}

// ── Vocabulario sintético adicional ──
function generateSyntheticExtra() {
  const synths = {
    'A1.1': [
      ['die Schultasche','la mochila escolar','die','Schultaschen','n'],
      ['der Radiergummi','la goma de borrar','der','Radiergummis','n'],
      ['der Spitzer','el sacapuntas','der','Spitzer','n'],
      ['das Lineal','la regla','das','Lineale','n'],
      ['der Klebstoff','el pegamento','der','Klebstoffe','n'],
      ['die Schere','las tijeras','die','Scheren','n'],
      ['der Rucksack','la mochila','der','Rucksäcke','n'],
      ['die Federtasche','el estuche','die','Federtaschen','n'],
      ['das Heft','el cuaderno','das','Hefte','n'],
      ['der Taschenrechner','la calculadora','der','Taschenrechner','n'],
      ['die Turnschuhe','las zapatillas','die','Turnschuhen','n'],
      ['der Buntstift','el lápiz de color','der','Buntstifte','n'],
      ['das Frühstück','el desayuno','das','Frühstücke','n'],
      ['das Mittagessen','el almuerzo','das','Mittagessen','n'],
      ['das Abendessen','la cena','das','Abendessen','n'],
      ['die Zahnbürste','el cepillo de dientes','die','Zahnbürsten','n'],
      ['das Handtuch','la toalla','das','Handtücher','n'],
      ['die Seife','el jabón','die','Seifen','n'],
      ['der Kamm','el peine','der','Kämme','n'],
      ['der Wecker','el despertador','der','Wecker','n'],
      ['putzen','limpiar','','','v'],
      ['aufräumen','ordenar','','','v'],
      ['abwaschen','fregar','','','v'],
      ['geschlossen','cerrado','','','adj'],
      ['geöffnet','abierto','','','adj'],
      ['gemütlich','acogedor','','','adj'],
      ['bequem','cómodo','','','adj'],
      ['fleißig','trabajador','','','adj'],
      ['faul','perezoso','','','adj'],
      ['freundlich','amigable','','','adj'],
    ],
    'A1.2': [
      ['die Eisenbahn','el ferrocarril','die','Eisenbahnen','n'],
      ['der Flughafen','el aeropuerto','der','Flughäfen','n'],
      ['der Bahnsteig','el andén','der','Bahnsteige','n'],
      ['das Gleis','la vía','das','Gleise','n'],
      ['die Abfahrt','la salida','die','Abfahrten','n'],
      ['die Ankunft','la llegada','die','Ankünfte','n'],
      ['das Abteil','el compartimento','das','Abteile','n'],
      ['die Fahrkarte','el billete','die','Fahrkarten','n'],
      ['der Schaffner','el revisor','der','Schaffner','n'],
      ['der Ausflug','la excursión','der','Ausflüge','n'],
      ['die Wanderung','la caminata','die','Wanderungen','n'],
      ['das Picknick','el picnic','das','Picknicks','n'],
      ['das Ferienhaus','la casa de vacaciones','das','Ferienhäuser','n'],
      ['der Campingplatz','el camping','der','Campingplätze','n'],
      ['das Schwimmbad','la piscina','das','Schwimmbäder','n'],
      ['die Sporthalle','el polideportivo','die','Sporthallen','n'],
      ['das Stadion','el estadio','das','Stadien','n'],
      ['die Turnhalle','el gimnasio','die','Turnhallen','n'],
      ['die Sauna','la sauna','die','Saunen','n'],
      ['die Terrasse','la terraza','die','Terrassen','n'],
      ['der Balkon','el balcón','der','Balkone','n'],
      ['der Keller','el sótano','der','Keller','n'],
      ['der Dachboden','el ático','der','Dachböden','n'],
      ['die Garage','el garaje','die','Garagen','n'],
      ['der Garten','el jardín','der','Gärten','n'],
      ['einpacken','empaquetar','','','v'],
      ['auspacken','desempaquetar','','','v'],
      ['einkaufen','comprar','','','v'],
      ['verkaufen','vender','','','v'],
    ],
    'B1.1': [
      ['die Selbstständigkeit','el autoempleo','die','Selbstständigkeiten','n'],
      ['die Arbeitslosigkeit','el desempleo','die','Arbeitslosigkeiten','n'],
      ['die Bewerbung','la solicitud','die','Bewerbungen','n'],
      ['das Vorstellungsgespräch','la entrevista','das','Vorstellungsgespräche','n'],
      ['der Arbeitgeber','el empleador','der','Arbeitgeber','n'],
      ['der Arbeitnehmer','el empleado','der','Arbeitnehmer','n'],
      ['das Gehalt','el salario','das','Gehälter','n'],
      ['die Steuer','el impuesto','die','Steuern','n'],
      ['die Versicherung','el seguro','die','Versicherungen','n'],
      ['die Rente','la pensión','die','Renten','n'],
      ['der Kredit','el crédito','der','Kredite','n'],
      ['die Hypothek','la hipoteca','die','Hypotheken','n'],
      ['die Miete','el alquiler','die','Mieten','n'],
      ['die Nebenkosten','los gastos adicionales','die','Nebenkosten','n'],
      ['die Kaution','la fianza','die','Kautionen','n'],
      ['der Vertrag','el contrato','der','Verträge','n'],
      ['die Kündigung','la cancelación','die','Kündigungen','n'],
      ['die Frist','el plazo','die','Fristen','n'],
      ['die Genehmigung','el permiso','die','Genehmigungen','n'],
      ['die Anmeldung','el registro','die','Anmeldungen','n'],
      ['die Abmeldung','la baja','die','Abmeldungen','n'],
      ['der Nachweis','el comprobante','der','Nachweise','n'],
      ['die Bescheinigung','el certificado','die','Bescheinigungen','n'],
      ['der Ausweis','el documento','der','Ausweise','n'],
      ['der Pass','el pasaporte','der','Pässe','n'],
      ['der Führerschein','el carnet de conducir','der','Führerscheine','n'],
      ['der Personalausweis','el DNI','der','Personalausweise','n'],
      ['voraussetzen','presuponer','','','v'],
      ['gewährleisten','garantizar','','','v'],
      ['beanspruchen','reclamar','','','v'],
    ],
  };
  
  const results = {};
  NIVELES.forEach(n => results[n] = []);
  
  for (const [level, words] of Object.entries(synths)) {
    if (results[level]) {
      for (const w of words) {
        results[level].push({
          de: w[0],
          es: w[1],
          art: w[2] || '',
          plural: w[3] || '',
          tipo: w[4] || 'n',
          fuente: 'sintetico'
        });
      }
    }
  }
  
  // Generar más palabras sintéticas para niveles con poco vocabulario
  // Verbos por nivel
  const verbosPorNivel = {
    'A1.3': [
      ['zeigen','mostrar','','','v'],['fragen','preguntar','','','v'],['antworten','responder','','','v'],
      ['öffnen','abrir','','','v'],['schließen','cerrar','','','v'],['holen','traer','','','v'],
      ['bringen','traer','','','v'],['bezahlen','pagar','','','v'],['suchen','buscar','','','v'],
      ['finden','encontrar','','','v'],['brauchen','necesitar','','','v'],['wünschen','desear','','','v'],
      ['feiern','celebrar','','','v'],['reisen','viajar','','','v'],['wandern','senderismo','','','v'],
      ['klettern','trepar','','','v'],['schwimmen','nadar','','','v'],['tanzen','bailar','','','v'],
      ['malen','pintar','','','v'],['basteln','manualidades','','','v'],
    ],
    'A1.4': [
      ['telefonieren','telefonear','','','v'],['parken','aparcar','','','v'],
      ['abholen','recoger','','','v'],['einladen','invitar','','','v'],
      ['aussteigen','bajarse','','','v'],['einsteigen','subirse','','','v'],
      ['abfahren','salir','','','v'],['ankommen','llegar','','','v'],
      ['mitbringen','traer consigo','','','v'],['vorbereiten','preparar','','','v'],
      ['einladen','invitar','','','v'],['ausgeben','gastar','','','v'],
      ['einteilen','dividir','','','v'],['einschlafen','dormirse','','','v'],
      ['aufwachen','despertarse','','','v'],['aufstehen','levantarse','','','v'],
    ],
    'A2.3': [
      ['erzählen','contar','','','v'],['erklären','explicar','','','v'],['beschreiben','describir','','','v'],
      ['vergessen','olvidar','','','v'],['erinnern','recordar','','','v'],['glauben','creer','','','v'],
      ['meinen','opinar','','','v'],['denken','pensar','','','v'],['gefallen','gustar','','','v'],
      ['schmecken','saber a','','','v'],['fühlen','sentir','','','v'],['berühren','tocar','','','v'],
      ['tragen','llevar','','','v'],['anziehen','vestirse','','','v'],['waschen','lavar','','','v'],
      ['backen','hornear','','','v'],['braten','freír','','','v'],['schneiden','cortar','','','v'],
    ],
    'A2.4': [
      ['vermieten','alquilar','','','v'],['umziehen','mudarse','','','v'],
      ['gründen','fundar','','','v'],['verwalten','administrar','','','v'],
      ['pflegen','cuidar','','','v'],['reparieren','reparar','','','v'],
      ['einrichten','amueblar','','','v'],['renovieren','renovar','','','v'],
      ['versichern','asegurar','','','v'],['einziehen','mudarse','','','v'],
      ['auswandern','emigrar','','','v'],['einwandern','inmigrar','','','v'],
    ],
  };
  
  for (const [level, words] of Object.entries(verbosPorNivel)) {
    if (results[level]) {
      for (const w of words) {
        results[level].push({
          de: w[0],
          es: w[1],
          art: w[2] || '',
          plural: w[3] || '',
          tipo: w[4] || 'v',
          fuente: 'sintetico'
        });
      }
    }
  }
  
  // Adjetivos intermedios para B1-B2
  const adjExtra = [
    'abstrakt','harmonisch','unabhängig','verantwortlich','zuverlässig',
    'nachhaltig','umfassend','anspruchsvoll','beeindruckend','durchschnittlich',
    'entscheidend','fortschrittlich','gegensätzlich','hervorragend','konkret',
    'konsequent','mangelhaft','oberflächlich','professionell','realistisch',
    'umstritten','unzureichend','vergleichbar','wahrscheinlich','wesentlich',
    'wissenschaftlich','zweckmäßig','ausreichend','bedeutend','charakteristisch'
  ];
  
  ['B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'].forEach((badge, i) => {
    const chunk = adjExtra.slice(i * 4, (i + 1) * 4);
    for (const adj of chunk) {
      results[badge].push({
        de: adj,
        es: `[${adj}]`,
        art: '',
        plural: '',
        tipo: 'adj',
        fuente: 'sintetico'
      });
    }
  });
  
  console.log(`  Sintético extra: generadas palabras para múltiples niveles`);
  
  return results;
}

// ── Merge de resultados ──
function mergeResults(...sources) {
  const merged = {};
  NIVELES.forEach(n => merged[n] = []);
  
  for (const source of sources) {
    for (const [level, words] of Object.entries(source)) {
      if (merged[level]) {
        merged[level].push(...words);
      }
    }
  }
  
  return merged;
}

// ── Generar código addLevel() ──
function generateAddLevelCode(merged) {
  let output = `// VOCABULARIO EXPANDIDO MEGA (+ todas las fuentes)\n// Generado el ${new Date().toISOString()}\n\n`;
  
  const TIPO_MAP = {
    'n': 'n',
    'v': 'v',
    'adj': 'adj',
    'adv': 'adv',
    'vocab': 'n',
    'historia': 'n',
    'lectura': 'n',
    'entrenamiento': 'n',
    'sintetico': 'n'
  };
  
  for (const level of NIVELES) {
    const words = merged[level];
    if (words.length === 0) continue;
    
    output += `// ── ${level} (+${words.length}) ──\n`;
    output += `addLevel('${level}',[\n`;
    
    for (const w of words) {
      const tipo = TIPO_MAP[w.tipo] || 'n';
      const art = w.art || '';
      const plural = w.plural || '';
      output += `['${w.de}','${w.es}','${art}','${plural}','${tipo}'],\n`;
    }
    
    output += `]);\n\n`;
  }
  
  return output;
}

// ── Contar palabras existentes en rutaHelpers.jsx ──
function countExistingWords() {
  try {
    const content = fs.readFileSync(RUTA_FILE, 'utf8');
    const addEnd = content.indexOf('MULLER_RUTA_LEVELS');
    const addSection = content.substring(0, addEnd);
    // Count patterns like ['de','es','art','plural','tipo']
    const count = (addSection.match(/\[/g) || []).length;
    return Math.floor(count / 5);
  } catch(e) {
    return 0;
  }
}

// ── Main ──
console.log('=== MEGA VOCAB EXTRACTOR ===\n');
console.log('Extrayendo vocabulario de todas las fuentes...\n');

console.log('1. Archivos de contenido (Maestros):');
const maestrosWords = extractFromMaestros();

console.log('\n2. Historia (guiones, verbos):');
const historiaWords = extractFromHistoria();

console.log('\n3. Lectura:');
const lecturaWords = extractFromLectura();

console.log('\n4. Entrenamiento:');
const entrenamientoWords = extractFromEntrenamiento();

console.log('\n5. Vocabulario sintético extra:');
const sinteticoWords = generateSyntheticExtra();

console.log('\n=== Fusionando resultados ===');
const merged = mergeResults(maestrosWords, historiaWords, lecturaWords, entrenamientoWords, sinteticoWords);

console.log('\n=== Resumen por nivel ===');
let total = 0;
for (const level of NIVELES) {
  const count = merged[level].length;
  console.log(`  ${level}: ${count} palabras nuevas`);
  total += count;
}
console.log(`\nTOTAL palabras nuevas: ${total}`);

const existing = countExistingWords();
console.log(`Palabras existentes en addLevel(): ~${existing}`);
console.log(`Potencial total: ~${existing + total}`);

const code = generateAddLevelCode(merged);
fs.writeFileSync(OUTPUT_FILE, code, 'utf8');
console.log(`\nCódigo generado: ${OUTPUT_FILE}`);
console.log('Para inyectar: node tools/mega_vocab_extractor.js --inject');

// ── Inyectar directamente ──
if (process.argv.includes('--inject')) {
  console.log('\n=== INYECTANDO en rutaHelpers.jsx ===');
  const rutaContent = fs.readFileSync(RUTA_FILE, 'utf8');
  const insertPoint = rutaContent.indexOf('window.MULLER_RUTA_LEVELS') - 1;
  
  if (insertPoint < 0) {
    console.error('ERROR: No se encontró window.MULLER_RUTA_LEVELS en rutaHelpers.jsx');
    process.exit(1);
  }
  
  const beforeInsert = rutaContent.substring(0, insertPoint);
  const afterInsert = rutaContent.substring(insertPoint);
  
  // Añadir comentario marcador
  const injection = `
// ═══════════════════════════════════════════════════════════════════
// VOCABULARIO EXPANDIDO MEGA (${total} palabras nuevas - ${new Date().toISOString()})
// Fuentes: maestros, historia, lectura, entrenamiento, sintético
// ═══════════════════════════════════════════════════════════════════
${code}
// ═══════════════════════════════════════════════════════════════════
// FIN VOCABULARIO EXPANDIDO
// ═══════════════════════════════════════════════════════════════════

`;
  
  fs.writeFileSync(RUTA_FILE, beforeInsert + injection + afterInsert, 'utf8');
  console.log(`✓ Inyectado exitosamente antes de MULLER_RUTA_LEVELS`);
  
  // Verificar
  const finalContent = fs.readFileSync(RUTA_FILE, 'utf8');
  const finalAddEnd = finalContent.indexOf('MULLER_RUTA_LEVELS');
  const finalAddSection = finalContent.substring(0, finalAddEnd);
  const finalCount = (finalAddSection.match(/\['/g) || []).length;
  console.log(`Total palabras en addLevel() ahora: ~${finalCount}`);
}