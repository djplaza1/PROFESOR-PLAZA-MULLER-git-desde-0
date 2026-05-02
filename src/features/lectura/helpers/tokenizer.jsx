// src/features/lectura/helpers/tokenizer.jsx
// Tokenización de texto en palabras cliqueables con soporte para niveles y puntuación
window.Muller = window.Muller || {};
window.Muller.LecturaHelpers = window.Muller.LecturaHelpers || {};

// CONFIG: Reglas para agrupar tokens
window.Muller.LecturaHelpers.TOKEN_CONFIG = {
  includePunctuation: false, // si true, los signos de puntuación son tokens separados
  minCleanLength: 0          // tokens con cleanKey más corto que esto se ignoran
};

// Tokeniza un texto plano en array de tokens con posición y limpieza
// Cada token: { word, cleanKey, space, start, end }
window.Muller.LecturaHelpers.tokenize = function(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  var tokens = [];
  var regex = /(\S+)(\s*)/g;
  var match;
  while ((match = regex.exec(rawText)) !== null) {
    var word = match[1];
    var space = match[2] || '';
    var clean = word.replace(/^[^a-zA-ZäöüßÄÖÜ0-9]+|[^a-zA-ZäöüßÄÖÜ0-9]+$/g, '');
    var config = window.Muller.LecturaHelpers.TOKEN_CONFIG;
    if (clean.length < config.minCleanLength) continue;
    tokens.push({
      word: word,
      cleanKey: clean.toLowerCase(),
      space: space,
      start: match.index,
      end: match.index + word.length
    });
  }
  return tokens;
};

// Marca palabras con su nivel de vocabulario para coloreado
// @param {Array} tokens - Array de tokens de tokenize()
// @param {Object} vocabLevels - Mapa palabra -> nivel (A1, A2, B1, B2, C1)
// @returns {Array} tokens con propiedad .level añadida
window.Muller.LecturaHelpers.markLevels = function(tokens, vocabLevels) {
  if (!vocabLevels) return tokens;
  return tokens.map(function(t) {
    var level = vocabLevels[t.cleanKey] || null;
    return Object.assign({}, t, { level: level });
  });
};

// Colores por nivel (para CSS)
window.Muller.LecturaHelpers.LEVEL_COLORS = {
  'A1': 'text-emerald-300',
  'A2': 'text-emerald-100',
  'B1': 'text-yellow-300',
  'B2': 'text-orange-300',
  'C1': 'text-red-300'
};

// Devuelve un texto plano a partir de tokens (para copia)
window.Muller.LecturaHelpers.tokensToText = function(tokens) {
  return tokens.map(function(t) { return t.word + t.space; }).join('');
};

// Biblioteca de textos precargados por nivel A1-C1
window.Muller.LecturaHelpers.getDefaultLibrary = function() {
  return [
    {
      id: 'lib_a1_1',
      title: 'Mein Name ist...',
      level: 'A1',
      text: 'Mein Name ist Anna. Ich komme aus Deutschland. Ich wohne in Berlin. Berlin ist eine große Stadt. Ich bin 25 Jahre alt und ich bin Studentin. Ich studiere Medizin. Das ist mein Freund Tom. Er kommt aus Österreich. Tom ist 27 Jahre alt und arbeitet als Ingenieur. Wir gehen gerne ins Kino und essen Pizza. Am Wochenende fahren wir oft nach Brandenburg. Das Wetter ist schön und wir machen einen Spaziergang im Park.',
      source: 'biblioteca'
    },
    {
      id: 'lib_a1_2',
      title: 'Der Tagesablauf',
      level: 'A1',
      text: 'Ich stehe um sieben Uhr auf. Ich putze mir die Zähne und wasche mein Gesicht. Dann frühstücke ich. Ich esse Brot mit Butter und trinke einen Kaffee. Um acht Uhr gehe ich zur Arbeit. Ich arbeite in einem Büro. Um zwölf Uhr habe ich Mittagspause. Ich esse in der Kantine. Um fünf Uhr bin ich fertig mit der Arbeit. Dann gehe ich nach Hause. Am Abend koche ich das Abendessen. Um zehn Uhr gehe ich ins Bett.',
      source: 'biblioteca'
    },
    {
      id: 'lib_a2_1',
      title: 'Ein Tag im Zoo',
      level: 'A2',
      text: 'Letzten Sonntag bin ich mit meiner Familie in den Zoo gegangen. Das Wetter war sehr schön und es waren viele Menschen da. Wir haben zuerst die Elefanten gesehen. Die Elefanten waren sehr groß und haben viel Wasser getrunken. Dann sind wir zu den Affen gegangen. Die Affen waren lustig und sind auf den Bäumen herumgeklettert. Meine kleine Schwester hatte große Angst vor den Löwen, aber ich fand sie faszinierend. Nach drei Stunden waren wir müde und sind nach Hause gegangen. Es war ein wundervoller Tag.',
      source: 'biblioteca'
    },
    {
      id: 'lib_a2_2',
      title: 'Meine Wohnung',
      level: 'A2',
      text: 'Ich wohne in einer kleinen Wohnung im dritten Stock. Die Wohnung hat zwei Zimmer, eine Küche und ein Bad. Das Wohnzimmer ist nicht sehr groß, aber gemütlich. Es gibt ein Sofa, einen Tisch und einen Fernseher. Mein Schlafzimmer hat ein Bett, einen Schrank und einen Schreibtisch. In der Küche koche ich gerne. Leider hat die Wohnung keinen Balkon, aber dafür ist die Lage sehr gut. Der Supermarkt ist nur fünf Minuten entfernt und die U-Bahn-Station ist gleich um die Ecke.',
      source: 'biblioteca'
    },
    {
      id: 'lib_b1_1',
      title: 'Reisen und Kultur',
      level: 'B1',
      text: 'In den letzten Jahren ist das Reisen immer beliebter geworden. Immer mehr Menschen entdecken die Schönheit Europas und reisen durch verschiedene Länder. Besonders attraktiv sind Städte wie Wien, Prag oder Budapest. Diese Städte bieten eine reiche Geschichte, beeindruckende Architektur und eine vielfältige Kulturszene. Wenn man durch die Straßen Wiens spaziert, kann man die Spuren der Habsburger Monarchie noch deutlich erkennen. Prag hingegen verzaubert seine Besucher mit der mittelalterlichen Altstadt und der berühmten Karlsbrücke.',
      source: 'biblioteca'
    },
    {
      id: 'lib_b1_2',
      title: 'Gesunde Ernährung',
      level: 'B1',
      text: 'Eine ausgewogene Ernährung ist für unsere Gesundheit von großer Bedeutung. Experten empfehlen, täglich fünf Portionen Obst und Gemüse zu essen. Vollkornprodukte sollten ebenfalls regelmäßig auf dem Speiseplan stehen, da sie viele Ballaststoffe enthalten. Zucker und gesättigte Fettsäuren dagegen sollte man nur in Maßen zu sich nehmen. Wer sich gesund ernähren möchte, sollte außerdem ausreichend Wasser trinken. Mindestens zwei Liter pro Tag werden empfohlen. Auch regelmäßige Bewegung ist wichtig für einen gesunden Lebensstil. Schon dreißig Minuten Spazierengehen pro Tag können das Wohlbefinden deutlich verbessern.',
      source: 'biblioteca'
    },
    {
      id: 'lib_b2_1',
      title: 'Die Digitalisierung der Arbeitswelt',
      level: 'B2',
      text: 'Die Digitalisierung hat die Arbeitswelt in den vergangenen Jahren grundlegend verändert. Immer mehr Unternehmen setzen auf Homeoffice und flexible Arbeitsmodelle. Dies bringt sowohl Vorteile als auch Herausforderungen mit sich. Einerseits ermöglicht das Arbeiten von zu Hause eine bessere Vereinbarkeit von Beruf und Familie. Andererseits verschwimmen die Grenzen zwischen Arbeit und Freizeit zunehmend. Viele Arbeitnehmer berichten von höherer Produktivität, aber auch von vermehrten Überstunden. Unternehmen müssen daher Strategien entwickeln, um die Work-Life-Balance ihrer Mitarbeiter zu gewährleisten und gleichzeitig die Effizienz zu steigern.',
      source: 'biblioteca'
    },
    {
      id: 'lib_b2_2',
      title: 'Künstliche Intelligenz im Alltag',
      level: 'B2',
      text: 'Künstliche Intelligenz ist längst ein fester Bestandteil unseres Alltags geworden. Ob Sprachassistenten auf unseren Smartphones, personalisierte Empfehlungen bei Streamingdiensten oder autonome Fahrassistenzsysteme - KI-Technologien erleichtern uns das Leben in vielerlei Hinsicht. Dennoch werfen sie auch ethische Fragen auf. Wie geht man mit dem Verlust von Arbeitsplätzen um? Wie schützt man die Privatsphäre der Nutzer? Und wer trägt die Verantwortung, wenn ein autonomes System eine falsche Entscheidung trifft? Diese Fragen werden die Gesellschaft in den kommenden Jahren noch intensiv beschäftigen.',
      source: 'biblioteca'
    },
    {
      id: 'lib_c1_1',
      title: 'Die deutsche Wiedervereinigung',
      level: 'C1',
      text: 'Die friedliche Revolution von 1989 und die darauffolgende Wiedervereinigung Deutschlands im Jahr 1990 stellen zweifellos einschneidende Ereignisse der deutschen Nachkriegsgeschichte dar. Der Fall der Berliner Mauer am 9. November 1989 markierte den Höhepunkt einer Entwicklung, die mit den Montagsdemonstrationen in Leipzig ihren Anfang genommen hatte. Die politischen und wirtschaftlichen Herausforderungen, die mit der Vereinigung der beiden deutschen Staaten einhergingen, waren immens und prägen die gesellschaftliche Entwicklung bis heute. Insbesondere der Aufbau Ost erforderte erhebliche finanzielle Transfers und strukturelle Anpassungsprozesse, deren Auswirkungen noch immer spürbar sind.',
      source: 'biblioteca'
    },
    {
      id: 'lib_c1_2',
      title: 'Nachhaltigkeit und Umweltschutz',
      level: 'C1',
      text: 'Angesichts der fortschreitenden Klimaerwärmung gewinnt das Thema Nachhaltigkeit zunehmend an gesellschaftlicher Relevanz. Die internationale Staatengemeinschaft hat sich im Pariser Abkommen dazu verpflichtet, die Erderwärmung auf unter zwei Grad Celsius zu begrenzen. Dies erfordert jedoch fundamentale Transformationsprozesse in nahezu allen Wirtschaftssektoren. Besonders die Energie- und Verkehrswende stehen im Fokus der politischen Maßnahmen. Kritiker bemängeln allerdings, dass die bisher ergriffenen Maßnahmen nicht ausreichen, um die selbstgesteckten Klimaziele zu erreichen. Vielmehr bedarf es eines grundlegenden gesellschaftlichen Bewusstseinswandels und einer Abkehr von rein wachstumsorientierten Wirtschaftsmodellen.',
      source: 'biblioteca'
    }
  ];
};