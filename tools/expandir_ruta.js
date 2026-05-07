/**
 * tools/expandir_ruta.js
 * 
 * EXPANSIÓN AUTOMÁTICA DE LECCIONES EN MULLER_RUTA_LEVELS
 * 
 * Objetivo: Expandir de ~31 a ~112 lecciones usando el vocabulario
 * existente en addLevel() dentro del mismo archivo rutaHelpers.jsx.
 * 
 * Cómo funciona:
 * 1. Lee src/features/ruta/rutaHelpers.jsx
 * 2. Extrae todo el vocabulario de addLevel() organizado por badge (A1.1, A1.2, ...)
 * 3. Para cada nivel en MULLER_RUTA_LEVELS, identifica cuántas lecciones faltan
 * 4. Genera lecciones completas (phrases, exercises, grammarTips) usando el vocabulario
 * 5. Inserta las nuevas lecciones en el array lessons de cada nivel
 * 6. Guarda el archivo modificado
 * 
 * Uso: node tools/expandir_ruta.js
 */

const fs = require('fs');
const path = require('path');

const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');

// ============================================================
// 1. LEER ARCHIVO
// ============================================================
console.log('📖 Leyendo', RUTA_FILE);
const content = fs.readFileSync(RUTA_FILE, 'utf8');
const lines = content.split('\n');

// ============================================================
// 2. EXTRAER VOCABULARIO DE addLevel()
// ============================================================
console.log('\n📊 Extrayendo vocabulario de addLevel()...');

const vocabulary = {}; // { badge: [ [de, es, art, plural, tipo], ... ] }
let currentBadge = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const addLevelMatch = line.match(/addLevel\(['"]([^'"]+)['"]/);
  if (addLevelMatch) {
    currentBadge = addLevelMatch[1];
    vocabulary[currentBadge] = [];
    continue;
  }
  if (currentBadge) {
    // Match entries like ['word','translation','art','plural','type']
    const entryRegex = /\[['"]([^'"]*)['"],\s*['"]([^'"]*)['"],\s*['"]([^'"]*)['"],\s*['"]([^'"]*)['"],\s*['"]([^'"]*)['"]\]/g;
    let match;
    while ((match = entryRegex.exec(line)) !== null) {
      vocabulary[currentBadge].push([match[1], match[2], match[3], match[4], match[5]]);
    }
  }
  // Stop when we hit window.MULLER_RUTA_LEVELS
  if (line.includes('MULLER_RUTA_LEVELS')) break;
}

console.log('  Niveles de vocabulario encontrados:', Object.keys(vocabulary).length);
let totalWords = 0;
Object.keys(vocabulary).sort().forEach(b => {
  console.log(`  ${b}: ${vocabulary[b].length} palabras`);
  totalWords += vocabulary[b].length;
});
console.log('  Total palabras:', totalWords);

// ============================================================
// 3. EXTRAER NIVELES Y LECCIONES DE MULLER_RUTA_LEVELS
// ============================================================
console.log('\n📋 Extrayendo niveles de MULLER_RUTA_LEVELS...');

// Encontrar start y end de MULLER_RUTA_LEVELS
const levelsStart = content.indexOf('window.MULLER_RUTA_LEVELS = [');
const levelsEndMarker = content.indexOf('\n];', levelsStart);
// Find the actual end (the ] that closes the array, followed by ;)
let levelsEnd = levelsEndMarker;
// The actual end is after the ] of the last level block
// Find the first '];' after the content
const closingBracket = content.indexOf('];', levelsStart);
// But that might be inside a lesson. Find the one that's on its own line
for (let i = closingBracket; i < content.length && i < levelsStart + 30000; i++) {
  if (content[i] === ']' && content[i+1] === ';' && (content[i-1] === '\n' || content[i-1] === ' ')) {
    // Make sure this is the outer array closing
    // Count brackets to verify
    let depth = 0;
    let isOuter = false;
    for (let j = levelsStart; j <= i; j++) {
      if (content[j] === '[' && (j === levelsStart || content[j-1] !== "'")) {
        // Only count structural brackets, not string contents
        // This is tricky, let's use a different approach
      }
    }
    // Just find the last ] before R.IRRVERBS
    break;
  }
}

// Better approach: find the line with '];' that ends MULLER_RUTA_LEVELS
// The array ends at line 996: ];
// The next significant section starts with R.IRRVERBS
const levelsSectionEnd = content.indexOf('// ===========================================================\n// 4. GENERADOR', levelsStart);
// Or better: find the start of R.IRRVERBS section
const irrverbsStart = content.indexOf('// 2. IRRREGULÄRE VERBEN nach Niveau');

// Extract the levels array text
const levelsTextEnd = content.indexOf('\n];\n\n// ===========================================================', levelsStart);
const levelsText = content.substring(levelsStart, levelsTextEnd + 3); // include ];
const levelsLines = levelsText.split('\n');

// Parse levels manually
const levels = [];
let currentLevelObj = null;
let braceDepth = 0;
let inLessons = false;
let currentLesson = null;

// Simple state machine to find level blocks
const levelBlocks = [];
let levelBlockStart = -1;
let levelBraceDepth = 0;
let inSingleQuoteStr = false;

for (let i = 0; i < levelsLines.length; i++) {
  const line = levelsLines[i];
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === "'" && (j === 0 || line[j-1] !== '\\')) {
      inSingleQuoteStr = !inSingleQuoteStr;
    }
    if (!inSingleQuoteStr) {
      if (ch === '{') {
        if (levelBraceDepth === 0) levelBlockStart = i;
        levelBraceDepth++;
      }
      if (ch === '}') {
        levelBraceDepth--;
        if (levelBraceDepth === 0 && levelBlockStart >= 0) {
          levelBlocks.push({ start: levelBlockStart, end: i });
          levelBlockStart = -1;
        }
      }
    }
  }
}

// Extract level data from blocks
const parsedLevels = levelBlocks.map(block => {
  const blockLines = levelsLines.slice(block.start, block.end + 1).join('\n');
  const idMatch = blockLines.match(/id:'([^']+)'/);
  const badgeMatch = blockLines.match(/badge:'([^']+)'/);
  const titleMatch = blockLines.match(/title:'([^']+)'/);
  
  // Find lessons array
  const lessonsStart = blockLines.indexOf('lessons:[');
  const lessonsEnd = blockLines.lastIndexOf(']');
  const lessonsText = lessonsStart >= 0 ? blockLines.substring(lessonsStart + 8, lessonsEnd) : '';
  
  // Parse individual lessons
  const lessons = [];
  const lessonBlocks = [];
  let depth = 0;
  let lessonStart = -1;
  
  for (let i = 0; i < lessonsText.length; i++) {
    if (lessonsText[i] === '{') {
      if (depth === 0) lessonStart = i;
      depth++;
    }
    if (lessonsText[i] === '}') {
      depth--;
      if (depth === 0 && lessonStart >= 0) {
        lessonBlocks.push(lessonsText.substring(lessonStart, i + 1));
        lessonStart = -1;
      }
    }
  }
  
  lessonBlocks.forEach(lb => {
    const id = lb.match(/id:'([^']+)'/);
    const title = lb.match(/title:'([^']+)'/);
    const topic = lb.match(/topic:'([^']+)'/);
    lessons.push({
      id: id ? id[1] : '',
      title: title ? title[1] : '',
      topic: topic ? topic[1] : '',
      raw: lb
    });
  });
  
  return {
    id: idMatch ? idMatch[1] : '',
    badge: badgeMatch ? badgeMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    lessons: lessons,
    blockStart: block.start,
    blockEnd: block.end,
    raw: blockLines
  };
});

console.log('  Niveles encontrados:', parsedLevels.length);
let existingLessons = 0;
parsedLevels.forEach(l => {
  console.log(`  ${l.id} (${l.badge}): ${l.lessons.length} lecciones`);
  existingLessons += l.lessons.length;
});
console.log('  Total lecciones existentes:', existingLessons);

// ============================================================
// 4. GENERAR NUEVAS LECCIONES
// ============================================================
console.log('\n🎯 Generando nuevas lecciones...');

// Objetivos por nivel (badge)
const TARGETS = {
  'a1-1': 8,  // A1.1
  'a1-2': 8,  // A1.2
  'a2-1': 8,  // A2.1
  'a2-2': 8,  // A2.2
  'b1-1': 8,  // B1.1
  'b1-2': 8,  // B1.2
  'b1-3': 8,  // B1.3
  'b1-4': 8,  // B1.4
  'b2-1': 8,  // B2.1
  'b2-2': 8,  // B2.2
  'b2-3': 8,  // B2.3
  'b2-4': 8,  // B2.4
  'c1-1': 8,  // C1.1
  'c1-2': 8,  // C1.2
};

// Topics para nuevas lecciones, organizados por nivel
const NEW_TOPICS = {
  'a1-1': ['familia', 'numeros', 'colores', 'animales', 'escuela', 'profesiones'],
  'a1-2': ['tiempo', 'calendario', 'clima', 'compras', 'precios', 'restaurante'],
  'a2-1': ['orientacion', 'billetes', 'reserva', 'turismo', 'equipaje', 'navegacion'],
  'a2-2': ['cuerpo', 'deportes', 'bienestar', 'citas', 'familia-amigos', 'emociones'],
  'b1-1': ['finanzas', 'empresa', 'reuniones', 'carrera', 'mercado', 'contratos'],
  'b1-2': ['educacion', 'noticias', 'debate', 'cultura', 'tradiciones', 'valores'],
  'b1-3': ['hobbies', 'naturaleza', 'eventos', 'viajes', 'ocio', 'aficiones'],
  'b1-4': ['argumentos', 'critica', 'comparacion', 'conclusion', 'perspectiva', 'evaluacion'],
  'b2-1': ['gestion', 'inversion', 'analisis', 'negocios', 'estrategia', 'produccion'],
  'b2-2': ['amistad', 'conflicto', 'acuerdo', 'sentimientos', 'pareja', 'comunicacion'],
  'b2-3': ['periodismo', 'redes', 'opinion-publica', 'entrevista', 'reportaje', 'medios'],
  'b2-4': ['estudio', 'publicacion', 'congreso', 'experimento', 'datos', 'hipotesis'],
  'c1-1': ['deduccion', 'contraste', 'causalidad', 'matiz', 'precision', 'retorica'],
  'c1-2': ['discurso', 'ensayo', 'critica-literaria', 'abstracto', 'conceptual', 'formal'],
};

// Grammar tips para nuevas lecciones
const GRAMMAR_TIPS = {
  'a1-1': [
    'Artículos definidos: der (m), die (f), das (n). Memoriza cada sustantivo con su artículo.',
    'Plural en -e, -en, -er: der Tisch → die Tische, die Frau → die Frauen, das Kind → die Kinder.',
    'Nominativo vs Acusativo: Der Hund ist braun (Nom). Ich sehe den Hund (Akk).',
    'Verbo "sein" (ser/estar): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie sind.',
    'Verbo "haben" (tener): ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie haben.',
    'La negación con "nicht" y "kein": nicht para verbos/adjetivos, kein para sustantivos.',
    'Preguntas con W-Wörter: Wer? (quién), Was? (qué), Wo? (dónde), Wie? (cómo), Wann? (cuándo).',
    'Verbos regulares en presente: ich lern-e, du lern-st, er/sie/es lern-t, wir lern-en, ihr lern-t, sie lern-en.',
    'La O con diéresis y el plural: der Apfel → die Äpfel, der Vater → die Väter, die Mutter → die Mütter.',
    'Artículo indeterminado: ein (m/n), eine (f). En acusativo: einen (m), eine (f), ein (n).',
  ],
  'a1-2': [
    'Verbos modales: können (poder), müssen (tener que), wollen (querer). Ocupan 2ª posición, el otro verbo al final.',
    'Campo: El verbo conjugado siempre en segunda posición en oraciones enunciativas.',
    'Präteritum de sein/haben: ich war/hatte, du warst/hattest, er war/hatte...',
    'Perfekt con haben: ich habe gemacht, du hast gespielt. Para verbos transitivos.',
    'Perfekt con sein: ich bin gegangen, du bist gefahren. Verbos de movimiento/cambio de estado.',
    'Separables: el prefijo va al final. "Ich stehe um 7 Uhr auf" (aufstehen).',
    'Imperativo: du-Form: Mach! (sin -st), ihr-Form: Macht!, Sie-Form: Machen Sie!',
    'Adjetivos predicativos (después de sein/werden): Der Film ist gut, no se declinan.',
  ],
  'a2-1': [
    'Preposiciones de lugar con Dativ: in, auf, unter, über, neben, zwischen, vor, hinter.',
    'Preposiciones de lugar con Akkusativ (movimiento): Ich gehe in die Stadt (Wohin?).',
    'Preposiciones Wechselpräpositionen: in, auf, unter... Dativ (Wo?) / Akkusativ (Wohin?).',
    'Comparativo: schnell → schneller, groß → größer, gut → besser, viel → mehr.',
    'Superlativo: am schnellsten, am größten, am besten, am meisten.',
    'Adjetivos antes del sustantivo: ein guter Freund, eine gute Idee, ein gutes Buch.',
    'Oraciones con "dass": Ich denke, dass du recht hast. Verbo al final.',
    'Oraciones con "weil" (causa): Ich lerne Deutsch, weil ich in Berlin arbeiten möchte.',
  ],
  'a2-2': [
    'Verbos reflexivos: sich waschen, sich fühlen, sich freuen. El reflexivo va en Akkusativ.',
    'Reflexivos con Dativ: ich wasche mir die Hände. El reflexivo en Dativ, el objeto en Akkusativ.',
    'Pronombres personales: Nominativ → Dativ → Akkusativ: ich → mir → mich, du → dir → dich...',
    'Oraciones temporales con "wenn": Wenn ich Zeit habe, gehe ich ins Kino.',
    'Oraciones temporales con "als" (pasado puntual): Als ich Kind war, wohnte ich in Madrid.',
    'Nebensätze con "ob" (si indirecta): Ich weiß nicht, ob er kommt.',
    'Nebensätze con "da" (causa conocida): Da es regnet, bleibe ich zu Hause.',
    'Infinitivo con "zu": Es ist wichtig, regelmäßig zu lernen.',
  ],
  'b1-1': [
    'Preposiciones con Genitiv: während (durante), wegen (debido a), trotz (a pesar de), statt (en lugar de).',
    'Adjektivdeklination nach bestimmtem Artikel: der gute Mann, die gute Frau, das gute Kind.',
    'Adjektivdeklination nach unbestimmtem Artikel: ein guter Mann, eine gute Frau, ein gutes Kind.',
    'Adjektivdeklination ohne Artikel: guter Kaffee, gute Milch, gutes Brot.',
    'RelativsätzeNominativ: der Mann, der dort steht. Die Frau, die singt. Das Kind, das spielt.',
    'RelativsätzeAkkusativ: der Mann, den ich sehe. Die Frau, die ich kenne. Das Kind, das ich mag.',
    'RelativsätzeDativ: der Mann, dem ich helfe. Die Frau, der ich danke. Das Kind, dem ich gebe.',
    'Konjunktiv II Gegenwart: würde + Infinitiv. Ich würde gern reisen.',
  ],
  'b1-2': [
    'Konjunktiv II Vergangenheit: hätte/wäre + Partizip. Ich wäre gern gekommen.',
    'Konjunktiv II mit Modalverben: ich könnte, ich müsste, ich sollte, ich dürfte, ich wollte.',
    'Passiv Präsens: werden + Partizip. Das Haus wird gebaut.',
    'Passiv Präteritum: wurde + Partizip. Das Haus wurde gebaut.',
    'Passiv mit Modalverben: Das Haus muss gebaut werden. (MV + Partizip + werden)',
    'Passiv Perfekt: ist + Partizip + worden. Das Haus ist gebaut worden.',
    'Passiv mit "von" (agente) vs "durch" (medio): von dem Architekten, durch den Sturm.',
    'Nebensätze mit "obwohl" (concesión): Obwohl es regnet, gehe ich spazieren.',
  ],
  'b1-3': [
    'Nebensätze mit "indem" (instrumento): Man lernt, indem man übt.',
    'Nebensätze con "sodass" (consecuencia): Er lernte viel, sodass er die Prüfung bestand.',
    'Nebensätze con "damit" (finalidad): Ich erkläre es, damit du es verstehst.',
    'Infinitivsätze con "um...zu": Ich lerne Deutsch, um in Berlin zu arbeiten.',
    'Infinitivsätze con "ohne...zu": Er ging, ohne sich zu verabschieden.',
    'Infinitivsätze con "(an)statt...zu": Statt zu lernen, sieht er fern.',
    'Futur I: werden + Infinitiv. Ich werde morgen anrufen.',
    'Futur I para suposiciones: Er wird wohl krank sein. (Suposición presente)',
  ],
  'b1-4': [
    'Plusquamperfekt: hatte/war + Partizip. Nachdem ich gegessen hatte, ging ich spazieren.',
    'Nachdem + Plusquamperfekt → Präteritum: Secuencia temporal en pasado.',
    'Konjunktiv I presente: er habe, er sei, er werde. Para discurso indirecto.',
    'Konjunktiv I pasado: er habe gehabt, er sei gewesen. Discurso indirecto pasado.',
    'Discurso indirecto: Er sagt, er komme morgen. Er sagte, er sei gestern gekommen.',
    'Partizip I como adjetivo: der lernende Student (el estudiante que aprende).',
    'Partizip I como adverbio: Er kam lachend herein (Entró riendo).',
    'Partizip II como adjetivo: das gekochte Essen (la comida cocinada).',
  ],
  'b2-1': [
    'Nominalisierung de verbos: lernen → das Lernen, entscheiden → die Entscheidung.',
    'Nominalisierung con -ung: vorbereiten → die Vorbereitung, verbinden → die Verbindung.',
    'Nominalisierung con -heit/-keit: frei → die Freiheit, möglich → die Möglichkeit.',
    'Funktionsverbgefüge: zur Entscheidung bringen, in Betracht ziehen, zur Verfügung stellen.',
    'Genitivattribut: der Fortschritt der Wissenschaft, die Meinung des Experten.',
    'Erweiterter Infinitiv mit "zu": den Plan, die Arbeit zu beenden.',
    'N-Deklination: der Student → den Studenten, der Kollege → den Kollegen.',
    'Adjektiv als Nomen: der Alte, die Alte, das Alte. Los adjetivos sustantivados.',
  ],
  'b2-2': [
    'Nebensätze mit "je...desto/umso" (proporción): Je mehr man lernt, desto besser wird man.',
    'irrealer Wunschsatz (GEGENWART): Wenn ich doch Zeit hätte! (ojalá tuviera tiempo)',
    'irrealer Wunschsatz (VERGANGENHEIT): Wenn ich doch gekommen wäre! (ojalá hubiera venido)',
    'Gleichsetzung mit "als ob": Er tut so, als ob er nichts wüsste.',
    'Es-Stellung: Es freut mich, dass du gekommen bist. Es ist wichtig zu lernen.',
    'Vorangestelltes Genitivattribut (sächsischer Genitiv): Müllers Haus, Deutschlands Zukunft.',
    'Pronominaladverbien: dafür, damit, davon, darauf, darüber. Pronombre + preposición.',
    'Pronominaladverbien en preguntas: Wofür? (¿para qué?), Womit? (¿con qué?), Worüber? (¿sobre qué?)',
  ],
  'b2-3': [
    'Modalpartikeln: doch, ja, wohl, eigentlich, denn, mal. Matizan la frase.',
    'Modalpartikel "doch" para énfasis: Das ist doch klar! Das weiß doch jeder!',
    'Modalpartikel "eigentlich": Was machst du eigentlich? (suaviza/curiosidad)',
    'Modalpartikel "mal" para informalidad: Komm mal her! Guck mal!',
    'Modalverb + PassivInfinitiv: Das muss noch gemacht werden.',
    'Anredepronomen: du (informal) vs Sie (formal). En cartas: Du/Sie en mayúscula.',
    'Konnektoren: nicht nur...sondern auch, sowohl...als auch, weder...noch.',
    'Parenthesen / Einschübe: Das Buch - es war sehr interessant - habe ich gelesen.',
  ],
  'b2-4': [
    'Schriftlicher Ausdruck: Verfügbarstellung, Inbetriebnahme, Inanspruchnahme.',
    'Zusammengesetzte Substantive: die Forschungseinrichtung, der Wissenschaftsbetrieb.',
    'Fachsprache nominal: Die Durchführung der Analyse erfolgte... (en lugar de analizar)',
    'Textkohärenz: wiederaufgreifen, bezugnehmend auf, in Bezug auf, hinsichtlich.',
    'Konzessive Satzverbindungen: wenngleich, obschon, obzwar (formal/escrito).',
    'Kausale Satzverbindungen: dadurch dass, aufgrund dessen, infolgedessen.',
    'Module Satzverbindungen: indem, dadurch dass, sodass, derart dass.',
    'Korrelative Konnektoren: einerseits...andererseits, teils...teils, bald...bald.',
  ],
  'c1-1': [
    'Differenzierte Kausalität: aufgrund, infolge, mangels, kraft, zwecks + Genitiv.',
    'Module Angaben: erwartungsgemäß, planmäßig, notfalls, gegebenenfalls, erforderlichenfalls.',
    'Abstrakte Nomen-Verb-Verbindungen: in Abrede stellen, zur Diskussion stellen.',
    'Nominalstil nominal: seitens, hinsichtlich, bezüglich, betreffs, mangels.',
    'Satzwertige Infinitivkonstruktionen: um zu, ohne zu, anstatt zu con sujeto propio.',
    'Mehrgliedrige Konnektoren: geschweige denn, umso mehr als, zumal.',
    'Voraus- und Rückverweise: ersterer/letzterer, selbiger, derselbe, derartige.',
    'Schattierungen der Modalität: dürfte (suposición), müsste (lógica), sollte (recomendación).',
  ],
  'c1-2': [
    'Erweiterte Partizipialattribute: die von den Wissenschaftlern durchgeführte Untersuchung.',
    'Satzgefüge mit mehrfacher Einbettung: Verschachtelung von Nebensätzen.',
    'Cleft-Sätze: Was mich betrifft, so...; Was...angeht, so...',
    'Funktionsverbgefüge wissenschaftlich: einer Analyse unterziehen, in Betracht kommen.',
    'Distanzstellung: Er hat das Buch, das er gestern gekauft hatte, gelesen.',
    'Korrelat "es" vor Nebensätzen: Es ist erstaunlich, dass... Es kommt darauf an, ob...',
    'Infinitivsätze mit eigenem Subjekt: ohne dass jemand etwas bemerkte.',
    'Adverbiale Nebensätze reduziert: beim Lernen (während ich lerne), nach dem Essen.',
  ],
};

// Función para generar frases de ejemplo para una palabra
function generatePhrasesForWord(word, badge, topic) {
  const [de, es, art, plural, tipo] = word;
  const phrases = [];
  
  if (tipo === 'n' && art) {
    const artMap = { der: 'der', die: 'die', das: 'das', den: 'den', dem: 'dem', des: 'des' };
    const article = artMap[art] || art;
    const nom = art;
    const akk = art === 'der' ? 'den' : art === 'das' ? 'das' : art === 'die' ? 'die' : art;
    
    if (['a1-1', 'a1-2', 'a2-1', 'a2-2'].includes(badge)) {
      phrases.push({ de: `${article} ${de} ist ${topic === 'familia' ? 'wichtig' : topic === 'compras' ? 'teuer' : 'praktisch'}.`, es: `El/la ${es} es ${topic === 'familia' ? 'importante' : topic === 'compras' ? 'caro/a' : 'práctico/a'}.` });
      phrases.push({ de: `Ich habe ${akk === 'den' ? 'einen' : akk === 'die' ? 'eine' : 'ein'} ${de}.`, es: `Tengo un/una ${es}.` });
      phrases.push({ de: `Das ${de} ist neu.`, es: `El/la ${es} es nuevo/a.` });
    } else {
      phrases.push({ de: `${article} ${de} spielt eine zentrale Rolle.`, es: `El/la ${es} juega un papel central.` });
      phrases.push({ de: `Die Bedeutung ${article === 'der' ? 'des' : article === 'die' ? 'der' : 'des'} ${de}s ist offensichtlich.`, es: `La importancia de ${es} es obvia.` });
      phrases.push({ de: `Wir müssen ${akk === 'den' ? 'den' : akk === 'die' ? 'die' : 'das'} ${de} berücksichtigen.`, es: `Debemos considerar ${es}.` });
    }
  } else if (tipo === 'v') {
    if (['a1-1', 'a1-2', 'a2-1', 'a2-2'].includes(badge)) {
      phrases.push({ de: `Ich ${de}e gern.`, es: `Me gusta ${es} (yo).` });
      phrases.push({ de: `${de.charAt(0).toUpperCase() + de.slice(1)} Sie bitte!`, es: `¡${es.charAt(0).toUpperCase() + es.slice(1)} (usted) por favor!` });
      phrases.push({ de: `Kannst du ${de}?`, es: `¿Puedes ${es}?` });
    } else {
      phrases.push({ de: `Wir ${de}n die Ergebnisse.`, es: `(Nosotros) ${es.charAt(0).toUpperCase() + es.slice(1)} los resultados.` });
      phrases.push({ de: `Es ist wichtig, zu ${de}n.`, es: `Es importante ${es}.` });
      phrases.push({ de: `Man sollte regelmäßig ${de}n.`, es: `Se debería ${es} regularmente.` });
    }
  } else if (tipo === 'adj') {
    if (['a1-1', 'a1-2', 'a2-1', 'a2-2'].includes(badge)) {
      phrases.push({ de: `Das ist ${de}.`, es: `Eso es ${es}.` });
      phrases.push({ de: `Der ${de}e ${['a1-1','a1-2'].includes(badge) ? 'Mann' : 'Film'} ist gut.`, es: `El ${es} ${['a1-1','a1-2'].includes(badge) ? 'hombre' : 'film'} es bueno.` });
      phrases.push({ de: `Ich finde das ${de}.`, es: `Encuentro eso ${es}.` });
    } else {
      phrases.push({ de: `Die ${de}e Analyse ist überzeugend.`, es: `El análisis ${es} es convincente.` });
      phrases.push({ de: `Dieses Ergebnis ist ${de}.`, es: `Este resultado es ${es}.` });
      phrases.push({ de: `Eine ${de}e Entwicklung zeichnet sich ab.`, es: `Se perfila un desarrollo ${es}.` });
    }
  } else if (tipo === 'adv') {
    if (['a1-1', 'a1-2', 'a2-1', 'a2-2'].includes(badge)) {
      phrases.push({ de: `Er kommt ${de}.`, es: `Él viene ${es}.` });
      phrases.push({ de: `Mach es ${de}!`, es: `¡Hazlo ${es}!` });
      phrases.push({ de: `Ich lerne ${de}.`, es: `Aprendo ${es}.` });
    } else {
      phrases.push({ de: `${de.charAt(0).toUpperCase() + de.slice(1)} ist das Ergebnis relevant.`, es: `${es.charAt(0).toUpperCase() + es.slice(1)}, el resultado es relevante.` });
      phrases.push({ de: `Die Studie ist ${de} angelegt.`, es: `El estudio está diseñado ${es}.` });
      phrases.push({ de: `${de.charAt(0).toUpperCase() + de.slice(1)} müssen wir handeln.`, es: `Debemos actuar ${es}.` });
    }
  }
  
  return phrases;
}

// Function to find exercises for a word
function createExerciseForWord(word, lessonIndex) {
  const [de, es, art, plural, tipo] = word;
  const types = ['fill', 'choose', 'plural', 'translateDE', 'translateES', 'conjugate', 'order', 'correct'];
  const type = types[lessonIndex % types.length];
  
  switch (type) {
    case 'fill':
      if (tipo === 'n') {
        return {
          exerciseType: 'fill',
          exerciseQ: `Der ___ ist wichtig.`,
          exerciseA: de.charAt(0).toUpperCase() + de.slice(1)
        };
      } else if (tipo === 'v') {
        return {
          exerciseType: 'fill',
          exerciseQ: `Ich ___ gern.`,
          exerciseA: de
        };
      } else {
        return {
          exerciseType: 'fill',
          exerciseQ: `Das ist ___ .`,
          exerciseA: de
        };
      }
    case 'choose':
      if (tipo === 'n') {
        return {
          exerciseType: 'choose',
          exerciseQ: `___ ${de} ist gut.`,
          exerciseA: art.charAt(0).toUpperCase() + art.slice(1),
          options: ['Der', 'Die', 'Das']
        };
      } else if (tipo === 'v') {
        return {
          exerciseType: 'choose',
          exerciseQ: `Ich ___ gern ${de}.`,
          exerciseA: `${de}e`,
          options: [`${de}e`, `${de}st`, `${de}t`]
        };
      } else {
        return {
          exerciseType: 'choose',
          exerciseQ: `Das ist ___.`,
          exerciseA: de,
          options: [de, `nicht ${de}`, `sehr ${de}`]
        };
      }
    case 'plural':
      if (tipo === 'n' && plural) {
        return {
          exerciseType: 'plural',
          exerciseQ: `¿Cuál es el plural de "${de}"?`,
          exerciseA: plural
        };
      }
      // fallback to fill
      return {
        exerciseType: 'fill',
        exerciseQ: `Ich ___ .`,
        exerciseA: de
      };
    case 'translateDE':
      return {
        exerciseType: 'translateDE',
        exerciseQ: `Traduce al alemán: "${es}"`,
        exerciseA: de
      };
    case 'translateES':
      return {
        exerciseType: 'translateES',
        exerciseQ: `Traduce al español: "${de}"`,
        exerciseA: es
      };
    case 'conjugate':
      if (tipo === 'v') {
        return {
          exerciseType: 'conjugate',
          exerciseQ: `Conjuga "${de}" en 3ª persona singular (er/sie/es)`,
          exerciseA: `${de}t`
        };
      }
      return {
        exerciseType: 'translateDE',
        exerciseQ: `Traduce al alemán: "${es}"`,
        exerciseA: de
      };
    case 'order':
      return {
        exerciseType: 'order',
        exerciseQ: `Ordena: "${de}"`,
        exerciseA: de
      };
    case 'correct':
      return {
        exerciseType: 'correct',
        exerciseQ: `Corrige: "Das ist falsch"`,
        exerciseA: de
      };
    default:
      return {
        exerciseType: 'fill',
        exerciseQ: `Ich ___ .`,
        exerciseA: de
      };
  }
}

// Generate new lessons for each level
const newLessonsByLevel = {};

parsedLevels.forEach(level => {
  const badge = level.badge; // e.g., "A1.1"
  const levelId = level.id; // e.g., "a1-1"
  const target = TARGETS[levelId] || 8;
  const currentCount = level.lessons.length;
  const needed = Math.max(0, target - currentCount);
  
  if (needed === 0) {
    console.log(`  ${levelId} (${badge}): ya tiene ${currentCount} lecciones, objetivo ${target} ✓`);
    return;
  }
  
  // Get vocabulary for this badge
  const vocab = vocabulary[badge] || [];
  if (vocab.length < needed * 3) {
    console.log(`  ${levelId} (${badge}): necesita ${needed} más pero solo tiene ${vocab.length} palabras de vocabulario`);
  }
  
  // Get topics for this level
  const topics = NEW_TOPICS[levelId] || ['general1','general2','general3','general4','general5','general6'];
  
  // Get grammar tips
  const grammarTips = GRAMMAR_TIPS[levelId] || [
    'Presta atención a la estructura de la oración.',
    'El verbo conjugado va en segunda posición.',
    'Practica el vocabulario nuevo en contexto.'
  ];
  
  const newLessons = [];
  
  for (let i = 0; i < needed; i++) {
    const lessonNum = currentCount + i + 1;
    const lessonId = `${levelId}-l${lessonNum}`;
    const topic = topics[i % topics.length];
    const wordsForLesson = vocab.slice(i * 3, i * 3 + 4); // 3-4 words per lesson
    
    // Generate title based on topic
    const titleMap = {
      'familia': 'La familia', 'numeros': 'Números y cantidades', 'colores': 'Colores',
      'animales': 'Animales', 'escuela': 'En la escuela', 'profesiones': 'Profesiones',
      'tiempo': 'El tiempo', 'calendario': 'Calendario', 'clima': 'El clima',
      'compras': 'De compras', 'precios': 'Precios', 'restaurante': 'En el restaurante',
      'orientacion': 'Orientación', 'billetes': 'Billetes y monedas', 'reserva': 'Reservas',
      'turismo': 'Turismo', 'equipaje': 'Equipaje', 'navegacion': 'Navegación',
      'cuerpo': 'El cuerpo', 'deportes': 'Deportes', 'bienestar': 'Bienestar',
      'citas': 'Citas médicas', 'familia-amigos': 'Familia y amigos', 'emociones2': 'Emociones',
      'finanzas': 'Finanzas', 'empresa': 'La empresa', 'reuniones': 'Reuniones',
      'carrera': 'Carrera', 'mercado': 'Mercado laboral', 'contratos': 'Contratos',
      'educacion': 'Educación', 'noticias': 'Noticias', 'debate': 'Debate',
      'cultura': 'Cultura', 'tradiciones': 'Tradiciones', 'valores': 'Valores',
      'hobbies': 'Hobbies', 'naturaleza': 'Naturaleza', 'eventos': 'Eventos',
      'viajes': 'Viajes', 'ocio': 'Ocio', 'aficiones': 'Aficiones',
      'argumentos': 'Argumentos', 'critica': 'Crítica', 'comparacion': 'Comparación',
      'conclusion': 'Conclusión', 'perspectiva': 'Perspectiva', 'evaluacion': 'Evaluación',
      'gestion': 'Gestión', 'inversion': 'Inversión', 'analisis': 'Análisis',
      'negocios': 'Negocios', 'estrategia': 'Estrategia', 'produccion': 'Producción',
      'amistad': 'Amistad', 'conflicto': 'Conflicto', 'acuerdo': 'Acuerdo',
      'sentimientos': 'Sentimientos', 'pareja': 'Pareja', 'comunicacion': 'Comunicación',
      'periodismo': 'Periodismo', 'redes': 'Redes sociales', 'opinion-publica': 'Opinión pública',
      'entrevista': 'Entrevista', 'reportaje': 'Reportaje', 'medios': 'Medios',
      'estudio': 'Estudio', 'publicacion': 'Publicación', 'congreso': 'Congreso',
      'experimento': 'Experimento', 'datos': 'Datos', 'hipotesis': 'Hipótesis',
      'deduccion': 'Deducción', 'contraste': 'Contraste', 'causalidad': 'Causalidad',
      'matiz': 'Matiz', 'precision': 'Precisión', 'retorica': 'Retórica',
      'discurso': 'Discurso', 'ensayo': 'Ensayo', 'critica-literaria': 'Crítica literaria',
      'abstracto': 'Abstracto', 'conceptual': 'Conceptual', 'formal': 'Formal'
    };
    const title = titleMap[topic] || `Tema: ${topic}`;
    
    // Generate phrases from the words
    const phrases = [];
    wordsForLesson.forEach(word => {
      const generated = generatePhrasesForWord(word, levelId, topic);
      generated.forEach(p => phrases.push(p));
    });
    
    // Get grammar tip
    const grammarTip = grammarTips[Math.min(i, grammarTips.length - 1)];
    
    // Create exercise from the first word
    const exercise = createExerciseForWord(wordsForLesson[0] || [de, es, '', '', 'n'], i);
    
    // Build the lesson object as a string (to insert later)
    newLessons.push({
      lessonId,
      title,
      topic,
      grammarTip,
      phrases: phrases.slice(0, 5), // max 5 phrases
      exerciseType: exercise.exerciseType,
      exerciseQ: exercise.exerciseQ,
      exerciseA: exercise.exerciseA,
      options: exercise.options || null
    });
    
    // Calculate rewards based on level
    const rewardMap = {
      'a1-1': { coins: 10, xp: 15 }, 'a1-2': { coins: 12, xp: 18 },
      'a2-1': { coins: 15, xp: 22 }, 'a2-2': { coins: 15, xp: 22 },
      'b1-1': { coins: 18, xp: 26 }, 'b1-2': { coins: 18, xp: 26 },
      'b1-3': { coins: 18, xp: 26 }, 'b1-4': { coins: 18, xp: 26 },
      'b2-1': { coins: 22, xp: 32 }, 'b2-2': { coins: 25, xp: 36 },
      'b2-3': { coins: 25, xp: 36 }, 'b2-4': { coins: 25, xp: 36 },
      'c1-1': { coins: 30, xp: 42 }, 'c1-2': { coins: 35, xp: 48 }
    };
    const reward = rewardMap[levelId] || { coins: 10, xp: 15 };
  }
  
  newLessonsByLevel[levelId] = newLessons;
  console.log(`  ${levelId} (${badge}): ${currentCount} → ${target} (generando ${needed} nuevas)`);
});

// ============================================================
// 5. GENERAR EL TEXTO DE LAS NUEVAS LECCIONES PARA INSERTAR
// ============================================================
console.log('\n✏️  Generando texto de lecciones para inserción...');

function lessonToText(lesson, levelId) {
  const rewardMap = {
    'a1-1': 'rewardCoins:10, rewardXp:15', 'a1-2': 'rewardCoins:12, rewardXp:18',
    'a2-1': 'rewardCoins:15, rewardXp:22', 'a2-2': 'rewardCoins:15, rewardXp:22',
    'b1-1': 'rewardCoins:18, rewardXp:26', 'b1-2': 'rewardCoins:18, rewardXp:26',
    'b1-3': 'rewardCoins:18, rewardXp:26', 'b1-4': 'rewardCoins:18, rewardXp:26',
    'b2-1': 'rewardCoins:22, rewardXp:32', 'b2-2': 'rewardCoins:25, rewardXp:36',
    'b2-3': 'rewardCoins:25, rewardXp:36', 'b2-4': 'rewardCoins:25, rewardXp:36',
    'c1-1': 'rewardCoins:30, rewardXp:42', 'c1-2': 'rewardCoins:35, rewardXp:48'
  };
  const reward = rewardMap[levelId] || 'rewardCoins:10, rewardXp:15';
  
  const phrasesStr = lesson.phrases.map(p => `{de:'${p.de.replace(/'/g, "\\'")}',es:'${p.es.replace(/'/g, "\\'")}'}`).join(',');
  
  let optionsStr = '';
  if (lesson.options) {
    optionsStr = `\n      options:[${lesson.options.map(o => `'${o}'`).join(',')}],`;
  }
  
  return `    { id:'${lesson.lessonId}', title:'${lesson.title.replace(/'/g, "\\'")}', topic:'${lesson.topic}', ${reward},
      grammarTip:'${lesson.grammarTip.replace(/'/g, "\\'")}',
      phrases:[${phrasesStr}],
      exerciseType:'${lesson.exerciseType}', exerciseQ:'${lesson.exerciseQ.replace(/'/g, "\\'")}', exerciseA:'${lesson.exerciseA.replace(/'/g, "\\'")}'${optionsStr} }`;
}

// ============================================================
// 6. MODIFICAR EL ARCHIVO
// ============================================================
console.log('\n💾 Modificando el archivo...');

let modifiedLines = [...lines];
let insertedCount = 0;
let totalInserted = 0;

// Process each level in reverse order (to preserve line numbers)
const levelIdsToProcess = Object.keys(newLessonsByLevel).filter(id => newLessonsByLevel[id].length > 0);
levelIdsToProcess.reverse();

// For each level, find the lessons array closing and insert new lessons before it
levelIdsToProcess.forEach(levelId => {
  const newLessons = newLessonsByLevel[levelId];
  if (!newLessons || newLessons.length === 0) return;
  
  // Find the level block in the original lines
  let foundLevel = -1;
  let lessonsEndLine = -1;
  
  for (let i = 0; i < modifiedLines.length; i++) {
    const line = modifiedLines[i];
    if (line.includes(`id:'${levelId}'`) && line.includes('lessons:[')) {
      foundLevel = i;
      break;
    }
  }
  
  if (foundLevel === -1) {
    console.log(`  ⚠️  No se encontró nivel ${levelId} en el archivo`);
    return;
  }
  
  // Find where lessons array ends (the last ]}, for this level)
  let braceDepth = 0;
  let inLessons = false;
  let lessonsEndFound = -1;
  
  // First find the lessons: [ start
  const lessonsLine = modifiedLines[foundLevel];
  const lessonsBracketStart = lessonsLine.indexOf('lessons:[');
  if (lessonsBracketStart >= 0) {
    inLessons = true;
    // Scan from this position for the matching closing ]
    let depth = 1;
    let pos = lessonsBracketStart + 8; // after 'lessons:['
    
    // Search line by line
    for (let i = foundLevel; i < modifiedLines.length; i++) {
      const line = modifiedLines[i];
      const startJ = (i === foundLevel) ? lessonsBracketStart + 8 : 0;
      
      for (let j = startJ; j < line.length; j++) {
        if (line[j] === '[') depth++;
        if (line[j] === ']') {
          depth--;
          if (depth === 0) {
            lessonsEndFound = i;
            break;
          }
        }
      }
      if (lessonsEndFound >= 0) break;
    }
  }
  
  if (lessonsEndFound === -1) {
    console.log(`  ⚠️  No se encontró el cierre de lessons[] para ${levelId}`);
    return;
  }
  
  // The lessons array closing line is lessonsEndFound
  // We need to insert new lessons just before this line's ]
  // But we need to find the exact position of the ]
  
  console.log(`  ${levelId}: insertando ${newLessons.length} lecciones antes de línea ${lessonsEndFound + 1}`);
  
  // Generate lesson text
  const lessonTexts = newLessons.map(l => lessonToText(l, levelId));
  const insertion = lessonTexts.map(t => `,\n${t}`).join('');
  
  // Insert before the ]
  const targetLine = modifiedLines[lessonsEndFound];
  const bracketPos = targetLine.lastIndexOf(']');
  const commaBracket = targetLine.lastIndexOf('],');
  
  if (bracketPos >= 0) {
    // Check if there is a comma before ]
    let insertPos = bracketPos;
    if (targetLine[bracketPos - 1] === ',') {
      insertPos = bracketPos;
    }
    
    modifiedLines[lessonsEndFound] = targetLine.substring(0, bracketPos) + insertion + targetLine.substring(bracketPos);
    totalInserted += newLessons.length;
    console.log(`    ✓ ${newLessons.length} lecciones insertadas en ${levelId}`);
  } else {
    console.log(`  ⚠️  No se encontró ] en la línea de cierre para ${levelId}`);
  }
});

// ============================================================
// 7. GUARDAR ARCHIVO
// ============================================================
const newContent = modifiedLines.join('\n');
fs.writeFileSync(RUTA_FILE, newContent, 'utf8');

console.log(`\n✅ Archivo modificado: ${RUTA_FILE}`);
console.log(`📊 Total lecciones insertadas: ${totalInserted}`);

// ============================================================
// 8. VERIFICACIÓN
// ============================================================
console.log('\n🔍 Verificando sintaxis básica...');

// Count remaining levels and lessons in modified file
const verifyContent = fs.readFileSync(RUTA_FILE, 'utf8');
const verifyStart = verifyContent.indexOf('MULLER_RUTA_LEVELS');
const verifyEnd = verifyContent.indexOf('// 2. IRRREGULÄRE VERBEN');
const verifySection = verifyContent.substring(verifyStart, verifyEnd);

// Count all lesson IDs in the levels section
const lessonIds = [];
const idRegex = /id:'([^']+l\d+)'/g;
let idMatch;
while ((idMatch = idRegex.exec(verifySection)) !== null) {
  lessonIds.push(idMatch[1]);
}

// Group by level prefix
const byLevel = {};
lessonIds.forEach(id => {
  const prefix = id.split('-l')[0];
  if (!byLevel[prefix]) byLevel[prefix] = [];
  byLevel[prefix].push(id);
});

console.log('\n📋 VERIFICACIÓN FINAL:');
let finalTotal = 0;
Object.keys(byLevel).sort().forEach(levelId => {
  const count = byLevel[levelId].length;
  const target = TARGETS[levelId] || '?';
  const status = (target !== '?' && count >= target) ? '✓' : count < target ? '⚠️ faltan ' + (target - count) : '✓';
  console.log(`  ${levelId}: ${count} lecciones (objetivo: ${target}) ${status}`);
  finalTotal += count;
});
console.log(`\n  TOTAL: ${finalTotal} lecciones`);

// Check for duplicate IDs
const dups = {};
lessonIds.forEach(id => {
  dups[id] = (dups[id] || 0) + 1;
});
const duplicates = Object.keys(dups).filter(id => dups[id] > 1);
if (duplicates.length > 0) {
  console.log(`\n⚠️  DUPLICADOS ENCONTRADOS: ${duplicates.join(', ')}`);
} else {
  console.log('\n✅ No hay IDs duplicados');
}

// Verify braces are balanced (rough check)
let braces = 0;
let inStr = false;
for (let i = verifyStart; i < verifyContent.length && i < verifyContent.indexOf('// 2. IRRREGULÄRE VERBEN'); i++) {
  const ch = verifyContent[i];
  if (ch === "'" && (i === 0 || verifyContent[i-1] !== '\\')) inStr = !inStr;
  if (!inStr) {
    if (ch === '{' || ch === '[') braces++;
    if (ch === '}' || ch === ']') braces--;
  }
}
console.log(`\n🔧 Balance de llaves/corchetes: ${braces === 0 ? '✅ CORRECTO' : '⚠️ DESBALANCEADO (' + braces + ')'}`);