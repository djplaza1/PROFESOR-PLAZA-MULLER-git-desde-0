const fs = require('fs');

// Read rutaHelpers
const c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Extract all existing German words
const wordRegex = /\[\s*'([A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
const existingWords = new Set();
let m;
while ((m = wordRegex.exec(c)) !== null) {
  existingWords.add(m[1].toLowerCase().replace(/^der |die |das /, ''));
}

console.log('Existing unique German words (base form):', existingWords.size);

// Read articulos.json
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
console.log('Available articles:', articulos.length);

// Categorize articles by difficulty based on word characteristics
function categorizeArticle(de) {
  const word = de.replace(/^(der |die |das )/, '');
  const lower = word.toLowerCase();
  
  // A1 level: very basic everyday objects, people, food, body parts, nature
  const a1Words = [
    'tisch','stuhl','bett','wand','boden','tür','fenster','wasser','brot','milch',
    'haus','mann','frau','kind','name','auto','buch','teller','glas','löffel','gabel','messer',
    'ei','fisch','fleisch','obst','apfel','banane','hemd','hose','schuh','jacke','rock',
    'kopf','hand','fuß','bein','arm','auge','ohr','nase','mund','haar',
    'tag','nacht','woche','monat','jahr','uhr','stunde','minute','sekunde',
    'hund','katze','maus','vogel','baum','blume','sonne','mond','regen','schnee','wind',
    'zimmer','küche','bad','garten','schule','stadt','dorf','land',
    'mutter','vater','bruder','schwester','sohn','tochter','opa','oma',
    'frühstück','mittagessen','abendessen','kaffee','tee','saft','bier','wein',
    'farbe','rot','blau','grün','gelb','schwarz','weiß','grau','braun'
  ];
  
  // A2 level: work, travel, shopping, leisure
  const a2Words = [
    'arbeit','beruf','schule','studium','büro','firma','straße','platz','zug','bus',
    'fahrrad','ticket','karte','brief','paket','telefon','computer','internet',
    'wohnung','park','museum','theater','kino','restaurant','café','hotel',
    'bank','post','geschäft','markt','preis','geld','kredit','scheck','rechnung',
    'adresse','nummer','datum','termin','morgen','mittag','abend',
    'urlaub','reise','koffer','pass','visum','flug','bahn','schiff',
    'krankenhaus','arzt','apotheke','medikament','krankheit','schmerz',
    'familie','freund','nachbar','kollege','chef','mitarbeiter',
    'wetter','temperatur','grad','himmel','wolke','regenbogen',
    'geschenk','geburtstag','party','feier','hochzeit','einladung',
    'körper','gesundheit','krankheit','fieber','husten','schnupfen',
    'kleidung','mantel','schal','handschuh','mütze','hut','gürtel',
    'gemüse','kartoffel','tomate','gurke','salat','käse','butter',
    'frühling','sommer','herbst','winter','januar','februar','märz','april','mai','juni','juli','august','september','oktober','november','dezember'
  ];
  
  // B1 level: abstract concepts, opinions, feelings
  const b1Words = [
    'meinung','erfahrung','gefühl','gedanke','idee','hoffnung','angst','freude','trauer',
    'liebe','hass','vertrauen','zweifel','freiheit','gleichheit','gerechtigkeit','wahrheit',
    'frage','antwort','grund','ursache','wirkung','folge','ziel','zweck','bedeutung',
    'möglichkeit','fähigkeit','kenntnis','verständnis','einsicht','absicht','erwartung',
    'beziehung','freundschaft','bekanntschaft','gemeinschaft','gesellschaft',
    'verantwortung','erlaubnis','erlaubnis','pflicht','recht','gesetz','regel',
    'entscheidung','wahl','lösung','problem','aufgabe','übung','prüfung',
    'veränderung','entwicklung','fortschritt','wachstum','bewegung',
    'unternehmen','organisation','verein','gruppe','team','projekt',
    'angebot','nachfrage','bedarf','mangel','überschuss',
    'vorteil','nachteil','nutzen','schaden','risiko','chance',
    'eindruck','ausdruck','wirkung','einfluss','macht','kraft',
    'erfolg','niederlage','sieg','kampf','krieg','frieden',
    'eigentum','besitz','vermögen','schuld','steuer','zoll'
  ];
  
  // B2 level: more abstract, technical, analytical
  const b2Words = [
    'analyse','synthese','hypothese','theorie','praxis','methode','strategie','struktur',
    'funktion','prozess','system','technik','technologie','wissenschaft','forschung',
    'entwicklung','fortschritt','ergebnis','schlussfolgerung','beweis','argument',
    'these','perspektive','dimension','relation','korrelation','variable','konstante',
    'faktor','element','komponente','phase','stadium','niveau','standard','kategorie',
    'qualität','quantität','produktivität','effizienz','effektivität',
    'kommunikation','interaktion','kooperation','integration','innovation',
    'evaluation','dokumentation','präsentation','demonstration','simulation',
    'konzept','modell','paradigma','prinzip','kriterium','indikator',
    'ressource','potenzial','kapazität','kompetenz','qualifikation',
    'institution','autorität','hierarchie','bürokratie','administration',
    'investition','finanzierung','subvention','garantie','versicherung',
    'konsequenz','implikation','relevanz','tendenz','entwicklungstrend',
    'koordination','organisation','strukturierung','planung','umsetzung'
  ];
  
  // Check A1 first
  if (a1Words.includes(lower)) return 'A1';
  if (a2Words.includes(lower)) return 'A2';
  if (b1Words.includes(lower)) return 'B1';
  if (b2Words.includes(lower)) return 'B2';
  return 'C1'; // Default to C1
}

// Parse article string to extract components
function parseArticle(de) {
  let art = '', word = de;
  if (de.startsWith('der ')) { art = 'der'; word = de.substring(4); }
  else if (de.startsWith('die ')) { art = 'die'; word = de.substring(4); }
  else if (de.startsWith('das ')) { art = 'das'; word = de.substring(4); }
  return { article: art, word, full: de };
}

// Translate common words (approximate translations)
function translateWord(article, word) {
  // Known translations
  const known = {
    'tisch':'mesa','stuhl':'silla','bett':'cama','wand':'pared','boden':'suelo',
    'tür':'puerta','fenster':'ventana','wasser':'agua','brot':'pan','milch':'leche',
    'haus':'casa','mann':'hombre','frau':'mujer','kind':'niño','name':'nombre',
    'auto':'coche','buch':'libro','teller':'plato','glas':'vaso','löffel':'cuchara',
    'gabel':'tenedor','messer':'cuchillo','ei':'huevo','fisch':'pescado',
    'fleisch':'carne','obst':'fruta','apfel':'manzana','banane':'plátano',
    'hemd':'camisa','hose':'pantalón','schuh':'zapato','jacke':'chaqueta','rock':'falda',
    'kopf':'cabeza','hand':'mano','fuß':'pie','bein':'pierna','arm':'brazo',
    'auge':'ojo','ohr':'oreja','nase':'nariz','mund':'boca','haar':'pelo',
    'tag':'día','nacht':'noche','woche':'semana','monat':'mes','jahr':'año',
    'uhr':'reloj','stunde':'hora','minute':'minuto','sekunde':'segundo',
    'hund':'perro','katze':'gato','maus':'ratón','vogel':'pájaro','baum':'árbol',
    'blume':'flor','sonne':'sol','mond':'luna','regen':'lluvia','schnee':'nieve','wind':'viento',
    'zimmer':'habitación','küche':'cocina','bad':'baño','garten':'jardín','schule':'escuela',
    'stadt':'ciudad','dorf':'pueblo','land':'país','mutter':'madre','vater':'padre',
    'bruder':'hermano','schwester':'hermana','sohn':'hijo','tochter':'hija','opa':'abuelo','oma':'abuela',
    'frühstück':'desayuno','mittagessen':'comida','abendessen':'cena',
    'kaffee':'café','tee':'té','saft':'zumo','bier':'cerveza','wein':'vino',
    'farbe':'color','rot':'rojo','blau':'azul','grün':'verde','gelb':'amarillo',
    'schwarz':'negro','weiß':'blanco','grau':'gris','braun':'marrón',
    'arbeit':'trabajo','beruf':'profesión','studium':'carrera','büro':'oficina',
    'firma':'empresa','straße':'calle','platz':'plaza','zug':'tren','bus':'autobús',
    'fahrrad':'bicicleta','ticket':'billete','karte':'tarjeta/mapa','brief':'carta',
    'paket':'paquete','telefon':'teléfono','computer':'ordenador','internet':'internet',
    'wohnung':'piso','park':'parque','museum':'museo','theater':'teatro','kino':'cine',
    'restaurant':'restaurante','café':'cafetería','hotel':'hotel',
    'bank':'banco','post':'correos','geschäft':'tienda','markt':'mercado',
    'preis':'precio','geld':'dinero','rechnung':'factura','adresse':'dirección',
    'nummer':'número','datum':'fecha','termin':'cita','morgen':'mañana','mittag':'mediodía','abend':'tarde/noche',
    'urlaub':'vacaciones','reise':'viaje','koffer':'maleta','pass':'pasaporte',
    'visum':'visado','flug':'vuelo','bahn':'tren','schiff':'barco',
    'krankenhaus':'hospital','arzt':'médico','apotheke':'farmacia','medikament':'medicamento',
    'krankheit':'enfermedad','schmerz':'dolor','familie':'familia','freund':'amigo',
    'nachbar':'vecino','kollege':'compañero','chef':'jefe','mitarbeiter':'empleado',
    'wetter':'tiempo','temperatur':'temperatura','grad':'grado','himmel':'cielo','wolke':'nube',
    'regenbogen':'arcoíris','geschenk':'regalo','geburtstag':'cumpleaños','party':'fiesta',
    'feier':'celebración','hochzeit':'boda','einladung':'invitación',
    'körper':'cuerpo','gesundheit':'salud','fieber':'fiebre','husten':'tos','schnupfen':'resfriado',
    'kleidung':'ropa','mantel':'abrigo','schal':'bufanda','handschuh':'guante','mütze':'gorro','hut':'sombrero','gürtel':'cinturón',
    'gemüse':'verdura','kartoffel':'patata','tomate':'tomate','gurke':'pepino','salat':'ensalada','käse':'queso','butter':'mantequilla',
    'frühling':'primavera','sommer':'verano','herbst':'otoño','winter':'invierno',
    'meinung':'opinión','erfahrung':'experiencia','gefühl':'sentimiento','gedanke':'pensamiento','idee':'idea',
    'hoffnung':'esperanza','angst':'miedo','freude':'alegría','trauer':'tristeza','liebe':'amor','hass':'odio',
    'vertrauen':'confianza','zweifel':'duda','freiheit':'libertad','gleichheit':'igualdad','gerechtigkeit':'justicia',
    'wahrheit':'verdad','frage':'pregunta','antwort':'respuesta','grund':'motivo','ursache':'causa','wirkung':'efecto',
    'folge':'consecuencia','ziel':'objetivo','zweck':'propósito','bedeutung':'significado','möglichkeit':'posibilidad',
    'fähigkeit':'capacidad','kenntnis':'conocimiento','verständnis':'comprensión','einsicht':'perspicacia',
    'absicht':'intención','erwartung':'expectativa','beziehung':'relación','freundschaft':'amistad',
    'gemeinschaft':'comunidad','gesellschaft':'sociedad','verantwortung':'responsabilidad',
    'pflicht':'deber','recht':'derecho','gesetz':'ley','regel':'regla','entscheidung':'decisión',
    'wahl':'elección','lösung':'solución','problem':'problema','aufgabe':'tarea','übung':'ejercicio',
    'prüfung':'examen','veränderung':'cambio','entwicklung':'desarrollo','fortschritt':'progreso','wachstum':'crecimiento',
    'bewegung':'movimiento','unternehmen':'empresa','organisation':'organización','verein':'asociación',
    'gruppe':'grupo','team':'equipo','projekt':'proyecto','angebot':'oferta','nachfrage':'demanda',
    'bedarf':'necesidad','mangel':'falta','überschuss':'excedente','vorteil':'ventaja','nachteil':'desventaja',
    'nutzen':'beneficio','schaden':'daño','risiko':'riesgo','chance':'oportunidad',
    'eindruck':'impresión','ausdruck':'expresión','einfluss':'influencia','macht':'poder','kraft':'fuerza',
    'erfolg':'éxito','niederlage':'derrota','sieg':'victoria','kampf':'lucha','krieg':'guerra','frieden':'paz',
    'eigentum':'propiedad','besitz':'posesión','vermögen':'fortuna','schuld':'culpa','steuer':'impuesto','zoll':'aduana',
    'analyse':'análisis','synthese':'síntesis','hypothese':'hipótesis','theorie':'teoría','praxis':'práctica',
    'methode':'método','strategie':'estrategia','struktur':'estructura','funktion':'función','prozess':'proceso',
    'system':'sistema','technik':'técnica','technologie':'tecnología','wissenschaft':'ciencia','forschung':'investigación',
    'ergebnis':'resultado','schlussfolgerung':'conclusión','beweis':'prueba','argument':'argumento',
    'these':'tesis','perspektive':'perspectiva','dimension':'dimensión','relation':'relación',
    'variable':'variable','konstante':'constante','faktor':'factor','element':'elemento','komponente':'componente',
    'phase':'fase','stadium':'etapa','niveau':'nivel','standard':'estándar','kategorie':'categoría',
    'qualität':'calidad','quantität':'cantidad','produktivität':'productividad','effizienz':'eficiencia',
    'effektivität':'efectividad','kommunikation':'comunicación','interaktion':'interacción','kooperation':'cooperación',
    'integration':'integración','innovation':'innovación','evaluation':'evaluación','dokumentation':'documentación',
    'präsentation':'presentación','konzept':'concepto','modell':'modelo','paradigma':'paradigma','prinzip':'principio',
    'kriterium':'criterio','indikator':'indicador','ressource':'recurso','potenzial':'potencial',
    'kapazität':'capacidad','kompetenz':'competencia','qualifikation':'cualificación',
    'institution':'institución','autorität':'autoridad','hierarchie':'jerarquía','bürokratie':'burocracia',
    'administration':'administración','investition':'inversión','finanzierung':'financiación',
    'garantie':'garantía','versicherung':'seguro','konsequenz':'consecuencia','relevanz':'relevancia',
    'tendenz':'tendencia','koordination':'coordinación','planung':'planificación','umsetzung':'implementación',
    'kredit':'crédito','scheck':'cheque','quittung':'recibo','unterschrift':'firma'
  };
  return known[word.toLowerCase()] || word;
}

function getPlural(article, word) {
  // Simple plural rules
  if (word.endsWith('e')) return word + 'n';
  if (word.endsWith('er')) return word + '';
  if (word.endsWith('el')) return word + '';
  if (word.endsWith('en')) return word + '';
  if (word.endsWith('chen')) return word + '';
  if (word.endsWith('lein')) return word + '';
  if (word.endsWith('a')) return word + 's';
  if (word.endsWith('o')) return word + 's';
  if (word.endsWith('i')) return word + 's';
  if (word.endsWith('um')) return word.replace(/um$/, 'en');
  if (word.endsWith('us')) return word.replace(/us$/, 'en');
  if (word.endsWith('ion')) return word + 'en';
  if (word.endsWith('tät')) return word.replace(/tät$/, 'täten');
  if (word.endsWith('ik')) return word + 'en';
  if (article === 'die' && word.endsWith('e')) return word + 'n';
  if (article === 'die') return word + 'n';
  // Umlaut plurals for common patterns
  if (word.match(/[aou][^aeiou]*$/)) return word.replace(/([aou])([^aeiou]*)$/, (m, v, rest) => {
    const umlaut = {a:'ä',o:'ö',u:'ü'}[v];
    return umlaut + rest + 'e';
  });
  if (article === 'der' && word.length <= 4) return word + 'e';
  if (article === 'der') return word + 'e';
  if (article === 'das') return word + 'er';
  return word + 'en';
}

// Categorize all articles
const categorized = { A1: [], A2: [], B1: [], B2: [], C1: [] };
const usedBaseWords = new Set();

articulos.forEach(a => {
  const { article, word } = parseArticle(a.de);
  const base = word.toLowerCase();
  // Skip if already in ruta
  if (existingWords.has(base)) return;
  // Skip duplicates
  if (usedBaseWords.has(base)) return;
  usedBaseWords.add(base);
  
  const level = categorizeArticle(a.de);
  const plural = a.plural || getPlural(article, word);
  const translation = a.es || translateWord(article, word);
  
  categorized[level].push({
    entry: `  ['${article} ${word}','${translation}','${article}','${plural}','n']`,
    word: base
  });
});

console.log('\nAvailable new words per category:');
for (const [level, words] of Object.entries(categorized)) {
  console.log(`  ${level}: ${words.length}`);
}

// Count total available
let totalAvail = 0;
for (const words of Object.values(categorized)) totalAvail += words.length;
console.log(`Total available: ${totalAvail}`);

// Now prepare injections for the weak levels
const targets = {
  'A2.3': { current: 177, target: 300, category: 'A2' },
  'A2.4': { current: 135, target: 300, category: 'A2' },
  'B1.3': { current: 87, target: 350, category: 'B1' },
  'B1.4': { current: 89, target: 350, category: 'B1' },
  'B2.4': { current: 276, target: 350, category: 'B2' },
  'C1.2': { current: 310, target: 400, category: 'C1' }
};

// For each weak level, pick words from the right category
const injections = {};
let catUsed = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };

for (const [level, info] of Object.entries(targets)) {
  const needed = info.target - info.current;
  const cat = info.category;
  const avail = categorized[cat].length - catUsed[cat];
  const take = Math.min(needed, Math.max(0, avail));
  
  if (take <= 0) {
    console.log(`\n${level}: needs ${needed} but no ${cat} words left!`);
    continue;
  }
  
  const start = catUsed[cat];
  const end = start + take;
  const picked = categorized[cat].slice(start, end);
  catUsed[cat] = end;
  
  injections[level] = picked.map(p => p.entry);
  
  console.log(`\n${level}: need ${needed}, taking ${take} from ${cat}`);
}

// Check if we have enough
let totalInjected = 0;
for (const [level, words] of Object.entries(injections)) {
  totalInjected += words.length;
}
console.log(`\nTotal to inject: ${totalInjected}`);

if (totalInjected === 0) {
  console.log('No words to inject! Need more sources.');
  process.exit(1);
}

// Now modify rutaHelpers.jsx
// Read the file and find each addLevel section, append words before ]);
let modified = c;
let totalActual = 0;

for (const [level, words] of Object.entries(injections)) {
  if (words.length === 0) continue;
  
  // Find the addLevel for this level
  const regex = new RegExp(`(addLevel\\('${level}',\\[)([^]*?)(\\]);`);
  const match = modified.match(regex);
  
  if (!match) {
    console.log(`Could not find addLevel('${level}')`);
    continue;
  }
  
  const prefix = match[1];
  const body = match[2];
  const suffix = match[3];
  
  // Add new words before ]);
  const newBody = body + '\n' + words.join(',\n') + '\n';
  const replacement = prefix + newBody + suffix;
  
  modified = modified.replace(regex, replacement);
  totalActual += words.length;
  console.log(`✅ ${level}: +${words.length} words injected`);
}

// Write back
fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log(`\n✅ Total injected: ${totalActual} words`);
console.log('File updated successfully!');