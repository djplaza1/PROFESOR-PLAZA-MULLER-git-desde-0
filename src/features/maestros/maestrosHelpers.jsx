// src/features/maestros/maestrosHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

// Definición de módulos / lecciones de gramática
window.Muller.Maestros.LECCIONES = [
  {
    id: "artikel",
    titulo: "Artículos (der, die, das)",
    icono: "📘",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Aprende a identificar el género de los sustantivos y usar los artículos correctamente.",
    explicacion: `
      <p>En alemán cada sustantivo tiene un <strong>género gramatical</strong>: masculino, femenino o neutro. Los artículos definidos son <strong>der</strong> (masculino), <strong>die</strong> (femenino) y <strong>das</strong> (neutro).</p>
      <ul class="list-disc pl-5 space-y-1 mt-2">
        <li><strong>der</strong> Mann (el hombre)</li>
        <li><strong>die</strong> Frau (la mujer)</li>
        <li><strong>das</strong> Kind (el niño)</li>
      </ul>
      <p class="mt-2">Algunas reglas útiles:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Palabras terminadas en -ung, -heit, -keit, -schaft, -ei → <strong>die</strong></li>
        <li>Palabras terminadas en -chen, -lein → <strong>das</strong></li>
        <li>Palabras terminadas en -er, -el, -en, -ig, -ling → <strong>der</strong></li>
      </ul>
    `,
    ejemplos: ["der Tisch (la mesa)", "die Lampe (la lámpara)", "das Buch (el libro)", "die Freiheit (la libertad)", "das Mädchen (la chica)"]
  },
  {
    id: "preposiciones",
    titulo: "Preposiciones y casos",
    icono: "📗",
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    resumen: "Domina las preposiciones que rigen acusativo, dativo o genitivo y las Wechselpräpositionen.",
    explicacion: `
      <p>Las preposiciones en alemán <strong>determinan el caso</strong> del sustantivo que las sigue.</p>
      <p class="mt-2 font-semibold">Siempre acusativo:</p>
      <p>durch, für, gegen, ohne, um</p>
      <p class="mt-2 font-semibold">Siempre dativo:</p>
      <p>aus, bei, mit, nach, seit, von, zu</p>
      <p class="mt-2 font-semibold">Wechselpräpositionen (acusativo → movimiento, dativo → ubicación):</p>
      <p>an, auf, hinter, in, neben, über, unter, vor, zwischen</p>
      <p class="mt-2 italic">Ej: Ich gehe <strong>in die</strong> Schule (acus.). Ich bin <strong>in der</strong> Schule (dat.).</p>
    `,
    ejemplos: ["mit dem Auto (dat.)", "für den Mann (acus.)", "auf dem Tisch (dat. / ubicación)", "auf den Tisch (acus. / movimiento)"]
  },
  {
    id: "verbos",
    titulo: "Conjugación de verbos",
    icono: "📙",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "Presente, pasado (Perfekt y Präteritum) y verbos separables e inseparables.",
    explicacion: `
      <p>En presente, la mayoría de los verbos siguen este patrón:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>ich <strong>-e</strong> (machen → ich mache)</li>
        <li>du <strong>-st</strong> (machen → du machst)</li>
        <li>er/sie/es <strong>-t</strong> (machen → er macht)</li>
        <li>wir <strong>-en</strong>, ihr <strong>-t</strong>, sie/Sie <strong>-en</strong></li>
      </ul>
      <p class="mt-2">El <strong>Perfekt</strong> se forma con haben/sein + participio: ich <strong>habe gemacht</strong>.</p>
      <p>Verbos separables: prefijo se separa en presente → <strong>auf</strong>machen: ich mache <strong>auf</strong>.</p>
    `,
    ejemplos: ["ich lerne (aprendo)", "du hast gelernt (has aprendido)", "ich stehe auf (me levanto)", "er ist gefahren (él ha conducido)"]
  },
  {
    id: "declinacion",
    titulo: "Declinación del adjetivo",
    icono: "📕",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    resumen: "Aprende las terminaciones del adjetivo según artículo, caso y género.",
    explicacion: `
      <p>El adjetivo en alemán cambia su terminación según el <strong>artículo que lo acompaña</strong>, el <strong>caso</strong> y el <strong>género</strong>.</p>
      <p class="mt-2 font-semibold">Con artículo definido (der/die/das):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Nominativo: der gut<strong>e</strong> Wein</li>
        <li>Acusativo: den gut<strong>en</strong> Wein</li>
        <li>Dativo: dem gut<strong>en</strong> Wein</li>
      </ul>
      <p class="mt-2 font-semibold">Sin artículo:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Nominativo: gut<strong>er</strong> Wein</li>
        <li>Acusativo: gut<strong>en</strong> Wein</li>
        <li>Dativo: gut<strong>em</strong> Wein</li>
      </ul>
      <p class="mt-2">Con artículo indefinido (ein/eine) es una mezcla: nominativo masc. → ein gut<strong>er</strong> Wein.</p>
    `,
    ejemplos: ["der alte Mann", "ein alter Mann", "die schöne Frau", "mit dem alten Mann"]
  },
  {
    id: "oraciones",
    titulo: "Estructura de la oración",
    icono: "📓",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Posición del verbo en oraciones principales, subordinadas y preguntas.",
    explicacion: `
      <p>En oraciones <strong>principales</strong>, el verbo conjugado va en <strong>segunda posición</strong>.</p>
      <p class="italic">Ej: Ich <strong>gehe</strong> heute ins Kino.</p>
      <p class="mt-2">En <strong>preguntas cerradas</strong> (sí/no), el verbo va <strong>primero</strong>.</p>
      <p class="italic">Ej: <strong>Gehst</strong> du ins Kino?</p>
      <p class="mt-2">En <strong>subordinadas</strong>, el verbo va al <strong>final</strong>.</p>
      <p class="italic">Ej: ..., weil ich ins Kino <strong>gehe</strong>.</p>
      <p class="mt-2">Con verbos modales o Perfekt, el infinitivo/participio va al final en principal: Ich <strong>muss</strong> heute arbeiten. Ich <strong>habe</strong> gearbeitet.</p>
    `,
    ejemplos: ["Ich trinke Kaffee.", "Trinkst du Kaffee?", "Ich weiß, dass du Kaffee trinkst.", "Ich möchte einen Kaffee trinken."]
  },
  {
    id: "pronombres",
    titulo: "Pronombres personales",
    icono: "📔",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "ich, du, er/sie/es, wir, ihr, sie/Sie en los cuatro casos.",
    explicacion: `
      <p>Pronombres personales según caso:</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left">Nominativo</th><td>ich</td><td>du</td><td>er</td><td>sie</td><td>es</td><td>wir</td><td>ihr</td><td>sie/Sie</td></tr>
        <tr><th class="text-left">Acusativo</th><td>mich</td><td>dich</td><td>ihn</td><td>sie</td><td>es</td><td>uns</td><td>euch</td><td>sie/Sie</td></tr>
        <tr><th class="text-left">Dativo</th><td>mir</td><td>dir</td><td>ihm</td><td>ihr</td><td>ihm</td><td>uns</td><td>euch</td><td>ihnen/Ihnen</td></tr>
      </table>
    `,
    ejemplos: ["Ich liebe dich.", "Er gibt mir das Buch.", "Wir helfen euch.", "Ich sehe sie (a ella).", "Sie dankt ihm."]
  }
];

// Progreso de lecciones (localStorage)
window.Muller.Maestros.getProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('muller_maestros_progress') || '{}');
  } catch(e) { return {}; }
};

window.Muller.Maestros.toggleComplete = (id) => {
  const progress = window.Muller.Maestros.getProgress();
  progress[id] = !progress[id];
  localStorage.setItem('muller_maestros_progress', JSON.stringify(progress));
  return progress;
};

window.Muller.Maestros.isComplete = (id) => {
  return !!window.Muller.Maestros.getProgress()[id];
};