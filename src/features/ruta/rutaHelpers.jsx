// ═══════════════════════════════════════════════════
// RUTA HELPERS – SRS, niveles CEFR, ejercicios dinámicos
// ═══════════════════════════════════════════════════
window.Muller = window.Muller || {};
window.Muller.Ruta = window.Muller.Ruta || {};

// ---------- VOCABULARIO POR NIVEL ----------
window.Muller.Ruta.VOCAB = {
  'A1.1': [
    { de: 'Haus', es: 'casa', art: 'das', plural: 'Häuser', ejemplo: 'Das Haus ist groß.' },
    { de: 'Mann', es: 'hombre', art: 'der', plural: 'Männer', ejemplo: 'Der Mann liest.' },
    { de: 'Frau', es: 'mujer', art: 'die', plural: 'Frauen', ejemplo: 'Die Frau wartet.' },
    { de: 'Kind', es: 'niño', art: 'das', plural: 'Kinder', ejemplo: 'Das Kind spielt.' },
    { de: 'Tisch', es: 'mesa', art: 'der', plural: 'Tische', ejemplo: 'Der Tisch ist braun.' },
    { de: 'Buch', es: 'libro', art: 'das', plural: 'Bücher', ejemplo: 'Das Buch ist neu.' },
    { de: 'Katze', es: 'gato', art: 'die', plural: 'Katzen', ejemplo: 'Die Katze schläft.' },
    { de: 'Hund', es: 'perro', art: 'der', plural: 'Hunde', ejemplo: 'Der Hund bellt.' },
    { de: 'Wasser', es: 'agua', art: 'das', plural: '', ejemplo: 'Ich trinke Wasser.' },
    { de: 'Brot', es: 'pan', art: 'das', plural: 'Brote', ejemplo: 'Ich esse gern Brot.' }
  ],
  'A1.2': [
    { de: 'Arbeit', es: 'trabajo', art: 'die', plural: 'Arbeiten', ejemplo: 'Ich gehe zur Arbeit.' },
    { de: 'Freund', es: 'amigo', art: 'der', plural: 'Freunde', ejemplo: 'Mein Freund heißt Peter.' },
    { de: 'Stadt', es: 'ciudad', art: 'die', plural: 'Städte', ejemplo: 'Berlin ist eine große Stadt.' },
    { de: 'Zug', es: 'tren', art: 'der', plural: 'Züge', ejemplo: 'Der Zug kommt um 8 Uhr.' },
    { de: 'Geld', es: 'dinero', art: 'das', plural: '', ejemplo: 'Ich habe kein Geld.' },
    { de: 'Sprache', es: 'idioma', art: 'die', plural: 'Sprachen', ejemplo: 'Deutsch ist eine schwere Sprache.' },
    { de: 'Uhr', es: 'reloj/hora', art: 'die', plural: 'Uhren', ejemplo: 'Wie viel Uhr ist es?' },
    { de: 'Wochenende', es: 'fin de semana', art: 'das', plural: 'Wochenenden', ejemplo: 'Das Wochenende ist kurz.' },
    { de: 'Montag', es: 'lunes', art: 'der', plural: 'Montage', ejemplo: 'Am Montag gehe ich zur Arbeit.' },
    { de: 'Kaffee', es: 'café', art: 'der', plural: 'Kaffees', ejemplo: 'Ich möchte einen Kaffee.' }
  ],
  'B1.1': [
    { de: 'Urlaub', es: 'vacaciones', art: 'der', plural: 'Urlaube', ejemplo: 'Ich mache Urlaub in Spanien.' },
    { de: 'Erfahrung', es: 'experiencia', art: 'die', plural: 'Erfahrungen', ejemplo: 'Das war eine gute Erfahrung.' },
    { de: 'Bewerbung', es: 'solicitud', art: 'die', plural: 'Bewerbungen', ejemplo: 'Ich schreibe eine Bewerbung.' },
    { de: 'Geburtstag', es: 'cumpleaños', art: 'der', plural: 'Geburtstage', ejemplo: 'Wann hast du Geburtstag?' },
    { de: 'Wetter', es: 'clima', art: 'das', plural: '', ejemplo: 'Das Wetter ist schön heute.' },
    { de: 'Nachbar', es: 'vecino', art: 'der', plural: 'Nachbarn', ejemplo: 'Mein Nachbar ist sehr nett.' },
    { de: 'Rechnung', es: 'factura', art: 'die', plural: 'Rechnungen', ejemplo: 'Die Rechnung bitte!' },
    { de: 'Schlüssel', es: 'llave', art: 'der', plural: 'Schlüssel', ejemplo: 'Ich habe meinen Schlüssel verloren.' },
    { de: 'Fehler', es: 'error', art: 'der', plural: 'Fehler', ejemplo: 'Das war ein großer Fehler.' },
    { de: 'Krankenhaus', es: 'hospital', art: 'das', plural: 'Krankenhäuser', ejemplo: 'Er liegt im Krankenhaus.' }
  ]
};

// ---------- NIVELES CEFR (8 niveles) ----------
window.MULLER_RUTA_LEVELS = [
  {
    id: 'a1-1', title: 'Nivel 1 · Primeros pasos', badge: 'A1.1',
    lessons: [
      { id: 'a1-1-l1', title: 'Saludos y presentación', topic: 'presentacion', rewardCoins: 10, rewardXp: 15,
        grammarTip: 'El verbo conjugado va en 2ª posición: Ich bin Ana.',
        phrases: [{ de: 'Ich bin Ana.', es: 'Soy Ana.' },{ de: 'Ich komme aus Spanien.', es: 'Vengo de España.' },{ de: 'Ich lerne Deutsch.', es: 'Aprendo alemán.' }],
        exerciseType: 'fill', exerciseQ: 'Completa: Ich ___ Ana.', exerciseA: 'bin', exerciseHint: 'Verbo sein, 1ª persona.' },
      { id: 'a1-1-l2', title: 'Artículos básicos', topic: 'clase', rewardCoins: 10, rewardXp: 15,
        grammarTip: 'Memoriza sustantivo + artículo: der Tisch, die Tür, das Buch.',
        phrases: [{ de: 'Das ist ein Buch.', es: 'Eso es un libro.' },{ de: 'Die Tür ist offen.', es: 'La puerta está abierta.' },{ de: 'Der Tisch ist groß.', es: 'La mesa es grande.' }],
        exerciseType: 'fill', exerciseQ: 'Completa: Das ist ___ Buch.', exerciseA: 'ein', exerciseHint: 'Artículo indefinido neutro.' }
    ]
  },
  {
    id: 'a1-2', title: 'Nivel 2 · Rutina', badge: 'A1.2',
    lessons: [
      { id: 'a1-2-l1', title: 'Hora y días', topic: 'rutina', rewardCoins: 12, rewardXp: 18,
        grammarTip: '«Um acht Uhr» = a las ocho. Días con mayúscula: Montag.',
        phrases: [{ de: 'Ich stehe um sieben Uhr auf.', es: 'Me levanto a las siete.' },{ de: 'Am Montag gehe ich zur Arbeit.', es: 'El lunes voy al trabajo.' },{ de: 'Das Wochenende ist kurz.', es: 'El fin de semana es corto.' }],
        exerciseType: 'fill', exerciseQ: 'Ich stehe ___ sieben Uhr auf.', exerciseA: 'um', exerciseHint: 'Preposición para «a las».' },
      { id: 'a1-2-l2', title: 'Comida simple', topic: 'alimentos', rewardCoins: 12, rewardXp: 18,
        grammarTip: '«Ich möchte» + Akkusativ: Ich möchte einen Kaffee.',
        phrases: [{ de: 'Ich esse gern Brot.', es: 'Me gusta comer pan.' },{ de: 'Ich trinke Wasser.', es: 'Bebo agua.' },{ de: 'Was isst du gern?', es: '¿Qué te gusta comer?' }],
        exerciseType: 'fill', exerciseQ: 'Ich möchte ___ Kaffee.', exerciseA: 'einen', exerciseHint: 'Acusativo masculino.' }
    ]
  },
  {
    id: 'b1-1', title: 'Nivel 3 · Ampliando', badge: 'B1.1',
    lessons: [
      { id: 'b1-1-l1', title: 'Preposiciones mixtas', topic: 'preposiciones', rewardCoins: 15, rewardXp: 22,
        grammarTip: 'In, an, auf... ¿Wo? → Dat, ¿Wohin? → Akk.',
        phrases: [{ de: 'Ich bin im Kino.', es: 'Estoy en el cine.' },{ de: 'Ich gehe ins Kino.', es: 'Voy al cine.' }],
        exerciseType: 'fill', exerciseQ: 'Ich gehe ___ Kino.', exerciseA: 'ins', exerciseHint: 'Contracción in + das.' },
      { id: 'b1-1-l2', title: 'Konjunktiv II básico', topic: 'gramatica', rewardCoins: 15, rewardXp: 22,
        grammarTip: '«Ich hätte gern…», «Könnten Sie…?» para peticiones suaves.',
        phrases: [{ de: 'Ich hätte gern einen Kaffee.', es: 'Me gustaría un café.' },{ de: 'Könnten Sie mir helfen?', es: '¿Podría ayudarme?' }],
        exerciseType: 'fill', exerciseQ: 'Ich ___ gern einen Kaffee.', exerciseA: 'hätte', exerciseHint: 'Konjunktiv II de haben.' }
    ]
  },
  {
    id: 'b1-2', title: 'Nivel 4 · Conversación', badge: 'B1.2',
    lessons: [
      { id: 'b1-2-l1', title: 'Oraciones subordinadas', topic: 'conectores', rewardCoins: 18, rewardXp: 26,
        grammarTip: 'Tras «weil/dass/obwohl» el verbo va al final.',
        phrases: [{ de: 'Ich lerne, weil ich reisen möchte.', es: 'Estudio porque quiero viajar.' },{ de: 'Weil es regnet, bleibe ich.', es: 'Como llueve, me quedo.' }],
        exerciseType: 'fill', exerciseQ: 'Ich bleibe, weil ich krank ___.', exerciseA: 'bin', exerciseHint: 'Verbo sein al final.' },
      { id: 'b1-2-l2', title: 'Perfekt básico', topic: 'gramatica', rewardCoins: 18, rewardXp: 26,
        grammarTip: 'Perfekt: haben/sein + participio al final.',
        phrases: [{ de: 'Ich habe gestern gearbeitet.', es: 'Ayer he trabajado.' }],
        exerciseType: 'fill', exerciseQ: 'Ich habe gestern viel ___.', exerciseA: 'gearbeitet', exerciseHint: 'Participio de arbeiten.' }
    ]
  },
  {
    id: 'b2-1', title: 'Nivel 5 · Argumentación', badge: 'B2.1',
    lessons: [
      { id: 'b2-1-l1', title: 'Conectores complejos', topic: 'conectores', rewardCoins: 22, rewardXp: 32,
        grammarTip: '«während», «sobald», «falls», «hingegen».',
        phrases: [{ de: 'Während ich lerne, höre ich Musik.', es: 'Mientras estudio, escucho música.' },{ de: 'Falls es regnet, bleiben wir drinnen.', es: 'Si llueve, nos quedamos dentro.' }],
        exerciseType: 'fill', exerciseQ: '___ es regnet, nehmen wir den Schirm.', exerciseA: 'Falls', exerciseHint: 'Condición.' },
      { id: 'b2-1-l2', title: 'Pasiva avanzada', topic: 'gramatica', rewardCoins: 22, rewardXp: 32,
        grammarTip: '«Es wird gemacht» / «Man macht».',
        phrases: [{ de: 'Das Haus wird gebaut.', es: 'La casa está siendo construida.' }],
        exerciseType: 'fill', exerciseQ: 'Das Fenster ___ geöffnet.', exerciseA: 'wird', exerciseHint: 'Pasiva presente 3ª pers.' }
    ]
  },
  {
    id: 'b2-2', title: 'Nivel 6 · Fluidez', badge: 'B2.2',
    lessons: [
      { id: 'b2-2-l1', title: 'Expresiones idiomáticas', topic: 'expresiones', rewardCoins: 25, rewardXp: 36,
        grammarTip: 'Frases hechas como «ins Schwarze treffen» (dar en el clavo).',
        phrases: [{ de: 'Du hast ins Schwarze getroffen!', es: '¡Diste en el clavo!' },{ de: 'Ich verstehe nur Bahnhof.', es: 'No entiendo nada.' }],
        exerciseType: 'fill', exerciseQ: 'Ich verstehe nur ___.', exerciseA: 'Bahnhof', exerciseHint: 'Expresión: no entender nada.' },
      { id: 'b2-2-l2', title: 'Konjunktiv I (discurso indirecto)', topic: 'gramatica', rewardCoins: 25, rewardXp: 36,
        grammarTip: 'Para citar a otros: Er sagte, er habe keine Zeit.',
        phrases: [{ de: 'Er sagte, er habe keine Zeit.', es: 'Dijo que no tenía tiempo.' }],
        exerciseType: 'fill', exerciseQ: 'Sie meinte, sie ___ krank.', exerciseA: 'sei', exerciseHint: 'Konjunktiv I de sein, 3ª persona.' }
    ]
  },
  {
    id: 'c1-1', title: 'Nivel 7 · Precisión', badge: 'C1.1',
    lessons: [
      { id: 'c1-1-l1', title: 'Nominalización', topic: 'estilo', rewardCoins: 30, rewardXp: 42,
        grammarTip: 'Convierte verbos en sustantivos: «die Entscheidung treffen».',
        phrases: [{ de: 'Die Entscheidung wurde getroffen.', es: 'Se tomó la decisión.' },{ de: 'Es bedarf einer Prüfung.', es: 'Requiere un examen.' }],
        exerciseType: 'fill', exerciseQ: 'Die ___ der Aufgabe dauerte lange.', exerciseA: 'Lösung', exerciseHint: 'Sustantivo de lösen.' },
      { id: 'c1-1-l2', title: 'Conectores cultos', topic: 'conectores', rewardCoins: 30, rewardXp: 42,
        grammarTip: '«demzufolge», «folglich», «infolgedessen».',
        phrases: [{ de: 'Demzufolge müssen wir handeln.', es: 'Por consiguiente, debemos actuar.' }],
        exerciseType: 'fill', exerciseQ: '___ hat sich die Lage verbessert.', exerciseA: 'Folglich', exerciseHint: 'Conector consecutivo formal.' }
    ]
  },
  {
    id: 'c1-2', title: 'Nivel 8 · Maestría', badge: 'C1.2',
    lessons: [
      { id: 'c1-2-l1', title: 'Texto argumentativo', topic: 'argumentacion', rewardCoins: 35, rewardXp: 48,
        grammarTip: 'Estructura: These → Argument → Beispiel → Schluss.',
        phrases: [{ de: 'Es lässt sich nicht leugnen, dass...', es: 'No se puede negar que...' },{ de: 'Ein überzeugendes Beispiel hierfür ist...', es: 'Un ejemplo convincente de esto es...' }],
        exerciseType: 'fill', exerciseQ: 'Es lässt sich nicht ___, dass...', exerciseA: 'leugnen', exerciseHint: 'Verbo: negar (infinitivo).' },
      { id: 'c1-2-l2', title: 'Revisión de conectores C1', topic: 'conectores', rewardCoins: 35, rewardXp: 48,
        grammarTip: '«nichtsdestotrotz», «insofern», «vorausgesetzt, dass».',
        phrases: [{ de: 'Nichtsdestotrotz bleiben wir optimistisch.', es: 'No obstante, seguimos optimistas.' }],
        exerciseType: 'fill', exerciseQ: '___ wir optimistisch. (no obstante)', exerciseA: 'Nichtsdestotrotz bleiben', exerciseHint: 'Conector avanzado + verbo.' }
    ]
  }
];

// ---------- FUNCIONES DE PROGRESO ----------
window.Muller.Ruta.defaultProgress = function () {
  return { completed: {}, srsData: {}, totalXp: 0, coins: 0 };
};

window.Muller.Ruta.loadProgress = function () {
  try {
    const raw = localStorage.getItem('muller_ruta_progress_v2');
    return raw ? { ...window.Muller.Ruta.defaultProgress(), ...JSON.parse(raw) } : window.Muller.Ruta.defaultProgress();
  } catch (e) { return window.Muller.Ruta.defaultProgress(); }
};

window.Muller.Ruta.saveProgress = function (p) {
  try { localStorage.setItem('muller_ruta_progress_v2', JSON.stringify(p)); } catch (e) {}
};

window.Muller.Ruta.isLessonUnlocked = function (levels, levelIdx, lessonIdx, completed) {
  if (!levels[levelIdx] || !levels[levelIdx].lessons[lessonIdx]) return false;
  if (levelIdx === 0 && lessonIdx === 0) return true;
  if (lessonIdx === 0) {
    const prev = levels[levelIdx - 1];
    return prev.lessons.every(l => completed[l.id]);
  }
  const prevId = levels[levelIdx].lessons[lessonIdx - 1].id;
  return !!completed[prevId];
};

// ---------- SRS INTEGRADO ----------
window.Muller.Ruta.updateSRS = function (word, correct) {
  const progress = window.Muller.Ruta.loadProgress();
  const srs = progress.srsData || {};
  const now = Date.now();
  const intervals = [1, 2, 4, 7, 14, 30]; // días

  if (!srs[word.de]) {
    srs[word.de] = { level: 0, nextReview: now, correct: 0, incorrect: 0 };
  }
  const entry = srs[word.de];
  if (correct) {
    entry.level = Math.min(entry.level + 1, intervals.length - 1);
    entry.correct++;
  } else {
    entry.level = Math.max(entry.level - 1, 0);
    entry.incorrect++;
  }
  entry.nextReview = now + intervals[entry.level] * 24 * 60 * 60 * 1000;
  progress.srsData = srs;
  window.Muller.Ruta.saveProgress(progress);
  return entry;
};

window.Muller.Ruta.getDueWords = function (level) {
  const progress = window.Muller.Ruta.loadProgress();
  const srs = progress.srsData || {};
  const now = Date.now();
  const vocab = window.Muller.Ruta.VOCAB[level] || [];
  return vocab.filter(w => !srs[w.de] || srs[w.de].nextReview <= now);
};