// src/features/lectura/lecturaHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Lectura = window.Muller.Lectura || {};

// Constantes de tamaño de fuente
window.Muller.Lectura.MULLER_READING_FONT_MIN = 14;
window.Muller.Lectura.MULLER_READING_FONT_MAX = 32;
window.Muller.Lectura.MULLER_READING_FONT_STEP = 1;

// Tokenización de texto para lectura interactiva
window.Muller.Lectura.mullerReadingTokenizeText = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return [];
  const tokens = [];
  const regex = /(\S+)(\s+)?/g;
  let match;
  let pos = 0;
  while ((match = regex.exec(rawText)) !== null) {
    let word = match[1];
    let space = match[2] || '';
    // Limpiar puntuación del token para la clave de búsqueda
    const clean = word.replace(/^[^a-zA-ZäöüßÄÖÜ0-9]+|[^a-zA-ZäöüßÄÖÜ0-9]+$/g, '');
    tokens.push({
      word: word,
      cleanKey: clean.toLowerCase(),
      space: space,
      start: match.index,
      end: match.index + word.length,
    });
    pos = match.index + match[0].length;
  }
  return tokens;
};

// Normalización de texto hablado (para comparar)
window.Muller.Lectura.normalizeGermanSpeechText = (text) => {
  if (!text) return '';
  let t = text.toLowerCase();
  t = t.replace(/[.,;:!?¿¡"»«()\[\]{}\-]/g, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
};

// ─── CORRECTOR FONÉTICO ALEMÁN OFFLINE ───
// Detecta errores de pronunciación típicos en alemanes sin necesidad de API
window.Muller.Lectura.checkGermanPhonetics = (expectedWord, spokenWord) => {
  if (!expectedWord || !spokenWord) return { correct: false, errors: ['Palabra vacía'] };
  
  var e = expectedWord.toLowerCase().trim();
  var s = spokenWord.toLowerCase().trim();
  
  if (e === s) return { correct: true, errors: [] };
  
  var errors = [];
  
  // 1. Auslautverhärtung: b→p, d→t, g→k al final
  var auslautMap = { b: 'p', d: 't', g: 'k' };
  var eFinal = e.slice(-1);
  var sFinal = s.slice(-1);
  if (auslautMap[eFinal] && sFinal === auslautMap[eFinal]) {
    errors.push('Auslautverhärtung: "' + eFinal + '" final suena como "' + auslautMap[eFinal] + '"');
  }
  
  // 2. ü→u / ö→o / ä→a
  if (e.includes('ü') && !s.includes('ü')) errors.push('La ü debe sonar como una "u" con los labios redondeados, no como "u" simple');
  if (e.includes('ö') && !s.includes('ö')) errors.push('La ö debe sonar como una "o" con los labios redondeados');
  if (e.includes('ä') && !s.includes('ä')) errors.push('La ä debe sonar como una "e" abierta');
  
  // 3. ß→ss
  if (e.includes('ß') && s.includes('ss')) errors.push('La ß se alarga el sonido de la "s", mantenlo más largo');
  
  // 4. ch → sch / sch → ch
  if (e.includes('sch') && !s.includes('sch') && s.includes('ch')) errors.push('"sch" suena como "sh" en inglés, no como "ch"');
  if (!e.includes('sch') && e.includes('ch') && s.includes('sch')) errors.push('"ch" no es "sch", es más suave (como en "ich")');
  
  // 5. Ich-Laut vs Ach-Laut
  // ch después de e,i,ä,ö,ü,eu,äu,ei = ich-Laut (suave)
  // ch después de a,o,u = ach-Laut (fuerte, como la j española)
  var ichLautPattern = /[eiäöü]/;
  var achLautPattern = /[aou]/;
  var eMatch = e.match(/ch/g);
  var sMatch = s.match(/ch/g);
  if (eMatch && eMatch.length > 0) {
    var ePos = e.indexOf('ch');
    var eBefore = ePos > 0 ? e[ePos - 1] : '';
    if (ichLautPattern.test(eBefore) && !s.includes('ch')) {
      errors.push('Ich-Laut: La "ch" después de "' + eBefore + '" es suave, como una "sh" muy suave');
    }
    if (achLautPattern.test(eBefore) && s.includes('ch')) {
      // podría estar bien, pero si lo hace como j española está bien
    }
  }
  
  // 6. st/sp al inicio de sílaba → sht/shp
  if (e.startsWith('st') && s.startsWith('st') && !s.startsWith('sht') && !s.startsWith('ʃt')) {
    errors.push('"st" al inicio suena como "sht" (scht) en alemán');
  }
  if (e.startsWith('sp') && s.startsWith('sp') && !s.startsWith('shp') && !s.startsWith('ʃp')) {
    errors.push('"sp" al inicio suena como "shp" (schp) en alemán');
  }
  
  // 7. v → f
  if (e.startsWith('v') && s.startsWith('v')) {
    errors.push('La "v" en alemán suena como "f" (salvo en extranjerismos)');
  }
  
  // 8. w → v
  if (e.startsWith('w') && s.startsWith('w')) {
    errors.push('La "w" en alemán suena como "v"');
  }
  
  // 9. z → ts
  if (e.startsWith('z') && s.startsWith('z')) {
    errors.push('La "z" en alemán suena como "ts"');
  }
  
  // 10. th → t (el inglés no tiene th en alemán nativo)
  if (s.includes('th') && !e.includes('th')) {
    errors.push('No hay "th" en alemán nativo; suena como "t"');
  }
  
  return { correct: errors.length === 0, errors: errors };
};

// ─── GENERADOR DE MAPA DE CALOR ───
// Devuelve array de { word, cleanKey, errorCount, color } para pintar el texto
window.Muller.Lectura.generateHeatmap = (tokens, historyErrors) => {
  if (!tokens || !historyErrors) return tokens.map(function(t) {
    return { word: t.word, cleanKey: t.cleanKey, errorCount: 0, color: '#22c55e' };
  });
  
  // historyErrors: array de palabras falladas (cleanKey)
  var errorMap = {};
  historyErrors.forEach(function(key) {
    errorMap[key] = (errorMap[key] || 0) + 1;
  });
  
  var maxErrors = Math.max(1, Math.max.apply(null, Object.values(errorMap)));
  
  return tokens.map(function(t) {
    var count = errorMap[t.cleanKey] || 0;
    var intensity = count / maxErrors;
    var color;
    if (count === 0) color = '#22c55e'; // verde
    else if (intensity < 0.33) color = '#fbbf24'; // amarillo
    else if (intensity < 0.66) color = '#f97316'; // naranja
    else color = '#ef4444'; // rojo
    return { word: t.word, cleanKey: t.cleanKey, errorCount: count, color: color };
  });
};

// ─── INDEXEDDB PARA GRABACIONES (SIN LÍMITE DE TAMAÑO) ───
var RECORDINGS_DB_NAME = 'MullerRecordings';
var RECORDINGS_DB_VERSION = 1;
var RECORDINGS_STORE_NAME = 'recordings';

function openRecordingsDB() {
  return new Promise(function(resolve, reject) {
    var req = indexedDB.open(RECORDINGS_DB_NAME, RECORDINGS_DB_VERSION);
    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(RECORDINGS_STORE_NAME)) {
        db.createObjectStore(RECORDINGS_STORE_NAME, { keyPath: 'key' });
      }
    };
    req.onsuccess = function(e) { resolve(e.target.result); };
    req.onerror = function(e) { reject(e.target.error); };
  });
}

// Guardar grabación en IndexedDB (sin límite de tamaño)
window.Muller.LecturaHelpers = window.Muller.LecturaHelpers || {};
window.Muller.LecturaHelpers.saveRecordingToIndexedDB = async function(recording) {
  try {
    var db = await openRecordingsDB();
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(RECORDINGS_STORE_NAME, 'readwrite');
      tx.objectStore(RECORDINGS_STORE_NAME).put(recording);
      tx.oncomplete = function() { db.close(); resolve(); };
      tx.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  } catch(e) {
    console.warn('IndexedDB save failed, falling back to localStorage:', e);
    // Fallback a localStorage si IndexedDB falla
    try {
      var existing = JSON.parse(localStorage.getItem('muller_recordings_fallback') || '[]');
      existing.push(recording);
      // Límite de 10 en fallback
      if (existing.length > 10) existing = existing.slice(-10);
      localStorage.setItem('muller_recordings_fallback', JSON.stringify(existing));
    } catch(e2) {}
  }
};

// Obtener todas las grabaciones desde IndexedDB
window.Muller.LecturaHelpers.getRecordingsFromIndexedDB = async function() {
  try {
    var db = await openRecordingsDB();
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(RECORDINGS_STORE_NAME, 'readonly');
      var req = tx.objectStore(RECORDINGS_STORE_NAME).getAll();
      req.onsuccess = function(e) {
        db.close();
        resolve(e.target.result || []);
      };
      req.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  } catch(e) {
    console.warn('IndexedDB read failed, trying fallback:', e);
    try {
      return JSON.parse(localStorage.getItem('muller_recordings_fallback') || '[]');
    } catch(e2) { return []; }
  }
};

// Eliminar una grabación por key
window.Muller.LecturaHelpers.deleteRecordingFromIndexedDB = async function(key) {
  try {
    var db = await openRecordingsDB();
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(RECORDINGS_STORE_NAME, 'readwrite');
      tx.objectStore(RECORDINGS_STORE_NAME).delete(key);
      tx.oncomplete = function() { db.close(); resolve(); };
      tx.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  } catch(e) {
    console.warn('IndexedDB delete failed:', e);
  }
};

// Eliminar todas las grabaciones
window.Muller.LecturaHelpers.clearAllRecordingsFromIndexedDB = async function() {
  try {
    var db = await openRecordingsDB();
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(RECORDINGS_STORE_NAME, 'readwrite');
      tx.objectStore(RECORDINGS_STORE_NAME).clear();
      tx.oncomplete = function() { db.close(); resolve(); };
      tx.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  } catch(e) {
    console.warn('IndexedDB clear failed:', e);
  }
};

// Migrar grabaciones antiguas de localStorage a IndexedDB
window.Muller.LecturaHelpers.migrateRecordingsToIndexedDB = async function() {
  try {
    var legacyData = JSON.parse(localStorage.getItem('muller_lectura_recordings') || '[]');
    if (legacyData.length > 0) {
      var db = await openRecordingsDB();
      var tx = db.transaction(RECORDINGS_STORE_NAME, 'readwrite');
      var store = tx.objectStore(RECORDINGS_STORE_NAME);
      legacyData.forEach(function(rec) { store.put(rec); });
      await new Promise(function(resolve) { tx.oncomplete = function() { db.close(); resolve(); }; });
      localStorage.removeItem('muller_lectura_recordings');
      console.log('Migrated ' + legacyData.length + ' recordings from localStorage to IndexedDB');
    }
  } catch(e) {
    console.warn('Migration from localStorage to IndexedDB failed:', e);
  }
};

// ─── BIBLIOTECA DE TEXTOS PRESELECCIONADOS (getDefaultLibrary) ───
window.Muller.LecturaHelpers.getDefaultLibrary = function() {
  return [
    { id: 'default_1', title: 'Die Geschichte von St. Martin', text: 'Es war im November. Der Winter kam. Es war kalt und es regnete. Ein Soldat namens Martin ritt auf seinem Pferd durch die Stadt. Er trug einen warmen Mantel. Auf der Straße sah er einen armen Mann. Der Mann hatte keine Kleidung. Er fror und zitterte. Martin hatte Mitleid. Er nahm sein Schwert und teilte seinen Mantel in zwei Hälften. Eine Hälfte gab er dem armen Mann. In der Nacht träumte Martin von Jesus. Jesus trug die Hälfte des Mantels. Seit dieser Zeit ist der heilige Martin bekannt.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_2', title: 'Der kleine Vogel', text: 'Ein kleiner Vogel saß auf einem Baum. Er sang ein schönes Lied. Das Mädchen hörte das Lied. Es war glücklich. Der Vogel flog weg. Das Mädchen war traurig. Aber am nächsten Tag kam der Vogel zurück. Er brachte einen Zweig. Er baute ein Nest. Das Mädchen freute sich sehr.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_3', title: 'Mein Tagesablauf', text: 'Ich stehe um sieben Uhr auf. Dann putze ich mir die Zähne. Ich frühstücke um halb acht. Ich esse Brot mit Marmelade. Um acht Uhr gehe ich zur Schule. Der Unterricht beginnt um neun. Um zwölf Uhr esse ich zu Mittag. Am Nachmittag mache ich Hausaufgaben. Um sechs Uhr abends esse ich zu Abend. Um zehn Uhr gehe ich ins Bett.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_4', title: 'Auf dem Markt', text: 'Heute ist Samstag. Frau Schmidt geht auf den Markt. Sie kauft Äpfel, Birnen und Weintrauben. Die Äpfel sind rot und süß. Die Birnen sind gelb und saftig. Die Weintrauben sind grün. Frau Schmidt kauft auch Blumen für ihre Wohnung. Sie bezahlt an der Kasse. Dann geht sie nach Hause. Der Markt macht um 14 Uhr zu.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_5', title: 'Die Jahreszeiten', text: 'Es gibt vier Jahreszeiten: Frühling, Sommer, Herbst und Winter. Im Frühling blühen die Blumen. Die Vögel singen. Es wird wärmer. Im Sommer scheint die Sonne. Die Kinder spielen im Garten. Im Herbst fallen die Blätter von den Bäumen. Es regnet oft. Im Winter schneit es. Alles ist weiß. Die Kinder bauen einen Schneemann.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_6', title: 'Meine Familie', text: 'Ich heiße Anna. Ich bin zwölf Jahre alt. Ich habe eine kleine Familie. Mein Vater heißt Thomas. Er ist Arzt. Meine Mutter heißt Maria. Sie ist Lehrerin. Ich habe einen Bruder. Er heißt Lukas und ist acht Jahre alt. Wir haben auch einen Hund. Er heißt Bello. Bello ist braun und sehr freundlich. Am Wochenende gehen wir zusammen in den Park.', level: 'A1 - Principiante', source: 'default' },
    { id: 'default_7', title: 'Die Bremer Stadtmusikanten', text: 'Es war einmal ein Esel. Er war alt und konnte nicht mehr arbeiten. Sein Besitzer wollte ihn töten. Da lief der Esel weg. Er wollte nach Bremen gehen und dort Musik machen. Unterwegs traf er einen Hund. Der Hund war auch alt und konnte nicht mehr jagen. Der Esel sagte: Komm mit nach Bremen! Du kannst Musik machen. Später trafen sie eine Katze und einen Hahn. Alle gingen zusammen nach Bremen. Sie kamen an ein Haus. Im Haus saßen Räuber. Die Tiere machten Lärm. Der Esel schrie, der Hund bellte, die Katze miaute und der Hahn krähte. Die Räuber liefen weg. Die Tiere blieben in dem Haus. Sie lebten glücklich.', level: 'A2 - Básico', source: 'default' },
    { id: 'default_8', title: 'Rotkäppchen', text: 'Es war einmal ein kleines Mädchen. Es trug immer eine rote Kappe. Darum hieß es Rotkäppchen. Eines Tages sagte die Mutter: Geh zur Großmutter. Bring ihr Kuchen und Wein. Aber geh nicht vom Weg ab! Rotkäppchen ging in den Wald. Da traf es den Wolf. Der Wolf fragte: Wohin gehst du? Rotkäppchen sagte: Zur Großmutter. Der Wolf dachte: Ich fresse beide. Er lief schnell zum Haus der Großmutter. Er fraß die Großmutter. Dann zog er ihre Kleider an und legte sich ins Bett. Als Rotkäppchen kam, wunderte es sich. Es sagte: Großmutter, warum hast du so große Augen? Damit ich dich besser sehen kann. Und warum hast du so große Zähne? Damit ich dich besser fressen kann! Da fraß der Wolf auch Rotkäppchen. Ein Jäger hörte den Lärm. Er schnitt dem Wolf den Bauch auf. Rotkäppchen und die Großmutter waren noch am Leben. Sie waren gerettet.', level: 'A2 - Básico', source: 'default' },
    { id: 'default_9', title: 'Meine Stadt', text: 'Ich wohne in einer kleinen Stadt in Deutschland. Die Stadt heißt Heidelberg. Sie liegt am Neckar. Heidelberg hat eine alte Burg. Die Burg ist sehr schön. Viele Touristen besuchen die Burg. In der Altstadt gibt es viele kleine Geschäfte und Cafés. Ich gehe gerne in die Altstadt. Am Wochenende fahre ich mit dem Fahrrad zum Schloss. Der Blick über die Stadt ist wunderbar. Heidelberg hat auch eine berühmte Universität. Sie ist sehr alt. Viele Studenten aus der ganzen Welt studieren hier.', level: 'A2 - Básico', source: 'default' },
    { id: 'default_10', title: 'Technologie im Alltag', text: 'Das Smartphone ist heute sehr wichtig. Die meisten Menschen haben ein Smartphone. Sie benutzen es jeden Tag. Man kann damit telefonieren, Nachrichten schreiben und im Internet surfen. Auch soziale Medien sind beliebt. Viele Leute posten Fotos und teilen ihre Erlebnisse. Aber man sollte nicht zu viel Zeit am Handy verbringen. Es ist besser, auch mal ein Buch zu lesen oder mit Freunden zu reden. Technologie ist gut, aber die Balance ist wichtig.', level: 'B1 - Intermedio', source: 'default' },
    { id: 'default_11', title: 'Umweltschutz', text: 'Der Umweltschutz wird immer wichtiger. Die Erde erwärmt sich. Das liegt an den Treibhausgasen. Wir müssen weniger CO2 ausstoßen. Wie können wir helfen? Wir können mit dem Fahrrad fahren statt mit dem Auto. Wir können weniger Fleisch essen. Wir können Müll trennen und recyceln. Auch der Plastikmüll ist ein großes Problem. Viele Verpackungen sind aus Plastik. Man sollte Produkte ohne Verpackung kaufen. Jeder kann einen kleinen Beitrag leisten. Zusammen können wir die Umwelt schützen.', level: 'B1 - Intermedio', source: 'default' },
    { id: 'default_12', title: 'Der Berliner Fernsehturm', text: 'Der Berliner Fernsehturm ist eines der bekanntesten Wahrzeichen Deutschlands. Er steht in Berlin-Mitte und ist 368 Meter hoch. Er wurde 1969 eröffnet. Jedes Jahr besuchen Millionen von Touristen den Fernsehturm. Oben gibt es eine Aussichtsplattform. Von dort hat man einen fantastischen Blick über die ganze Stadt. Es gibt auch ein Drehrestaurant. Das Restaurant dreht sich langsam. In einer Stunde macht es eine volle Umdrehung. Man kann essen und dabei die Aussicht genießen. Der Fernsehturm ist besonders nachts schön, wenn er beleuchtet ist.', level: 'B1 - Intermedio', source: 'default' }
  ];
};
