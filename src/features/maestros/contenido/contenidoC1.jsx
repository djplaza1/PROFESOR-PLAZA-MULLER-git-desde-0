/* === CONTENIDO GRAMATICAL C1 === */
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};
window.Muller.Maestros.contenido.C1 = [
  {
    id: "c1_infinitivo_um_zu",
    nivel: "C1",
    titulo: "Infinitivo con um...zu / (an)statt...zu / ohne...zu",
    icono: "🎯",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "Estructuras de infinitivo final, sustitutivo y exclusivo con mismo o diferente sujeto.",
    explicacion: `<p>Las <strong>estructuras de infinitivo</strong> con <em>um...zu, (an)statt...zu, ohne...zu</em> son esenciales para expresar finalidad, sustitución y exclusión.</p>
<ul>
  <li><strong>um...zu + Inf.</strong> (finalidad, para): <em>Er lernt Deutsch, um in Berlin zu studieren.</em> Mismo sujeto.</li>
  <li><strong>um...zu</strong> con diferente sujeto (→ <em>damit</em>): <em>Er lernt, damit seine Eltern stolz sind.</em></li>
  <li><strong>(an)statt...zu + Inf.</strong> (en lugar de): <em>Statt zu arbeiten, schläft er.</em></li>
  <li><strong>ohne...zu + Inf.</strong> (sin): <em>Er ging, ohne etwas zu sagen.</em></li>
<li><strong>Diferente sujeto → subordinada completa:</strong> <em>Sie ging, ohne dass es jemand bemerkte.</em></li>
</ul>
<table>
  <tr><th>Estructura</th><th>Significado</th><th>Ejemplo mismo sujeto</th><th>Diferente sujeto</th></tr>
  <tr><td>um...zu</td><td>para / con el fin de</td><td>Er spart, um zu reisen.</td><td>Er spart, damit sie reisen kann.</td></tr>
  <tr><td>statt...zu</td><td>en lugar de</td><td>Statt zu helfen, stört er.</td><td>Statt dass er hilft, stört er.</td></tr>
  <tr><td>ohne...zu</td><td>sin</td><td>Er ging, ohne zu zahlen.</td><td>Er ging, ohne dass er zahlte.</td></tr>
</table>`,
    ejemplos: [
      "Ich lerne jeden Tag, um die Prüfung zu bestehen.",
      "Er arbeitet, um seine Familie zu ernähren.",
      "Statt zu studieren, spielt er Videospiele.",
      "Sie verließ das Haus, ohne ein Wort zu sagen.",
      "Anstatt dass er sich entschuldigt, wird er wütend."
    ],
    tips: [
      "Con mismo sujeto → infinitivo con zu. Con diferente sujeto → subordinada con damit/statt dass/ohne dass.",
      "'um...zu' solo expresa intención, no causa.",
      "La coma siempre precede a um/statt/ohne."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con um...zu, (an)statt...zu u ohne...zu",
      datos: {
        frases: [
          { texto: "Er spart Geld, ___ ein Auto ___ kaufen.", respuesta: "um zu" },
          { texto: "___ zu arbeiten, geht er feiern.", respuesta: "Statt" },
          { texto: "Er ging, ___ sich ___ verabschieden.", respuesta: "ohne zu" },
          { texto: "Sie lernt fleißig, ___ die Prüfung ___ bestehen.", respuesta: "um zu" }
        ]
      }
    }
  },
  {
    id: "c1_conectores_academicos",
    nivel: "C1",
    titulo: "Conectores académicos",
    icono: "📚",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "ferner, vielmehr, keineswegs, nichtsdestotrotz, infolgedessen, in Bezug auf, hinsichtlich: lenguaje formal.",
    explicacion: `<p>Los <strong>conectores académicos</strong> son imprescindibles en textos formales, ensayos y papers científicos.</p>
<ul>
  <li><strong>ferner</strong> → además, asimismo (formal).</li>
  <li><strong>vielmehr</strong> → más bien, sino (corrección).</li>
  <li><strong>keineswegs</strong> → de ninguna manera (negación enfática).</li>
  <li><strong>nichtsdestotrotz</strong> → no obstante (formal enfático).</li>
  <li><strong>infolgedessen</strong> → en consecuencia (formal).</li>
  <li><strong>in Bezug auf</strong> + Akk. → en relación con / respecto a.</li>
  <li><strong>hinsichtlich</strong> + Gen. → en cuanto a / con respecto a.</li>
</ul>
<table>
  <tr><th>Conector</th><th>Significado</th><th>Ejemplo</th></tr>
  <tr><td>ferner</td><td>además</td><td>Ferner ist zu beachten, dass...</td></tr>
  <tr><td>vielmehr</td><td>más bien</td><td>Er ist nicht dumm, vielmehr sehr klug.</td></tr>
  <tr><td>keineswegs</td><td>de ninguna manera</td><td>Das ist keineswegs korrekt.</td></tr>
  <tr><td>nichtsdestotrotz</td><td>no obstante</td><td>Nichtsdestotrotz bleibt die Lage ernst.</td></tr>
  <tr><td>infolgedessen</td><td>en consecuencia</td><td>Es regnete stark, infolgedessen fiel das Fest aus.</td></tr>
</table>`,
    ejemplos: [
      "Ferner möchten wir auf die Bedeutung der Nachhaltigkeit hinweisen.",
      "Die These ist keineswegs bewiesen.",
      "Nichtsdestotrotz müssen wir die Forschungsarbeit fortsetzen.",
      "Infolgedessen wurden die Maßnahmen verschärft.",
      "Hinsichtlich der Kosten gibt es noch Unklarheiten."
    ],
    tips: [
      "Estos conectores son propios de textos científicos y formales.",
      "'keineswegs' es más enfático que 'nicht'.",
      "'in Bezug auf' rige acusativo; 'hinsichtlich' rige genitivo."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el conector académico adecuado",
      datos: {
        frases: [
          { texto: "___, ist das Experiment gelungen. (además)", respuesta: "Ferner" },
          { texto: "Das ist ___ bewiesen. (de ninguna manera)", respuesta: "keineswegs" },
          { texto: "___ müssen wir weitermachen. (no obstante)", respuesta: "Nichtsdestotrotz" },
          { texto: "___ der Finanzen gibt es Probleme. (en cuanto a)", respuesta: "Hinsichtlich" }
        ]
      }
    }
  },
  {
    id: "c1_estilo_formal",
    nivel: "C1",
    titulo: "Estilo formal vs informal",
    icono: "📝",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "Funktionsverbgefüge: zur Verfügung stellen, in Anspruch nehmen, zum Ausdruck bringen, en lugar de verbos simples.",
    explicacion: `<p>El <strong>estilo formal</strong> (Funktionsverbgefüge) usa sustantivo + verbo funcional en lugar de un verbo simple. Esto es típico del alemán administrativo, académico y profesional.</p>
<ul>
  <li><strong>zur Verfügung stellen</strong> = bereitstellen (proporcionar).</li>
  <li><strong>in Anspruch nehmen</strong> = beanspruchen (reclamar / tomar tiempo).</li>
  <li><strong>zum Ausdruck bringen</strong> = ausdrücken (expresar).</li>
  <li><strong>zur Kenntnis nehmen</strong> = erfahren (tomar conocimiento de).</li>
  <li><strong>in Betracht ziehen</strong> = berücksichtigen (considerar).</li>
  <li><strong>einen Vorschlag unterbreiten</strong> = vorschlagen (proponer).</li>
</ul>
<table>
  <tr><th>FVG formal</th><th>Significado</th><th>Verbo informal</th></tr>
  <tr><td>zur Verfügung stellen</td><td>proporcionar</td><td>geben / bereitstellen</td></tr>
  <tr><td>in Anspruch nehmen</td><td>tomar / ocupar</td><td>nehmen</td></tr>
  <tr><td>zum Ausdruck bringen</td><td>expresar</td><td>sagen / ausdrücken</td></tr>
  <tr><td>in Betracht ziehen</td><td>considerar</td><td>überlegen</td></tr>
  <tr><td>einen Vorschlag unterbreiten</td><td>proponer</td><td>vorschlagen</td></tr>
</table>`,
    ejemplos: [
      "Wir stellen Ihnen die Unterlagen zur Verfügung.",
      "Die Reparatur nahm viel Zeit in Anspruch.",
      "Er brachte seine Meinung deutlich zum Ausdruck.",
      "Wir nehmen den Beschluss zur Kenntnis.",
      "Ich unterbreite Ihnen einen Vorschlag."
    ],
    tips: [
      "El FVG siempre usa artículo + preposición fija.",
      "Es más formal y pesado, típico de textos escritos.",
      "En conversación coloquial se prefiere el verbo simple."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Convierte a FVG formal",
      datos: {
        frases: [
          { texto: "Wir bieten Hilfe an. → Wir stellen Hilfe zur ___ .", respuesta: "Verfügung" },
          { texto: "Er drückt seine Meinung aus. → Er bringt seine Meinung ___ ___ .", respuesta: "zum Ausdruck" },
          { texto: "Wir berücksichtigen Ihren Vorschlag. → Wir ziehen Ihren Vorschlag in ___ .", respuesta: "Betracht" },
          { texto: "Das Projekt nimmt viel Zeit. → Das Projekt nimmt viel Zeit in ___ .", respuesta: "Anspruch" }
        ]
      }
    }
  },
  {
    id: "c1_prefijos_avanzados",
    nivel: "C1",
    titulo: "Prefijos verbales avanzados",
    icono: "🔤",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "hinterher-, vorweg-, entgegen-, gegenüber-, empor-, nieder-: prefijos de dirección y modo.",
    explicacion: `<p>Los <strong>prefijos verbales avanzados</strong> aportan matices de dirección, modo o intensidad al verbo base.</p>
<ul>
  <li><strong>hinterher-</strong> → detrás / después: <em>hinterherlaufen (correr detrás), hinterherkommen (llegar después)</em></li>
  <li><strong>vorweg-</strong> → por adelantado: <em>vorwegnehmen (adelantarse a), vorwegsagen (decir de antemano)</em></li>
  <li><strong>entgegen-</strong> → hacia / en contra de: <em>entgegengehen (ir hacia), entgegensetzen (oponer)</em></li>
  <li><strong>gegenüber-</strong> → enfrente de / frente a: <em>gegenübersitzen (sentarse enfrente), gegenüberstellen (confrontar)</em></li>
  <li><strong>empor-</strong> → hacia arriba (elevado, literario): <em>emporkommen (ascender), emporsteigen (subir)</em></li>
  <li><strong>nieder-</strong> → hacia abajo (formal, a veces violento): <em>niederknien (arrodillarse), niederschlagen (derribar / suprimir)</em></li>
</ul>
<table>
  <tr><th>Prefijo</th><th>Dirección</th><th>Ejemplo</th></tr>
  <tr><td>hinterher-</td><td>detrás / después</td><td>Er lief ihr hinterher.</td></tr>
  <tr><td>vorweg-</td><td>por adelantado</td><td>Ich nehme nichts vorweg.</td></tr>
  <tr><td>entgegen-</td><td>hacia / contra</td><td>Wir gehen der Zukunft entgegen.</td></tr>
  <tr><td>gegenüber-</td><td>enfrente</td><td>Sie saß mir gegenüber.</td></tr>
  <tr><td>empor-</td><td>arriba</td><td>Er stieg zum Gipfel empor.</td></tr>
  <tr><td>nieder-</td><td>abajo</td><td>Die Regierung schlug den Aufstand nieder.</td></tr>
</table>`,
    ejemplos: [
      "Er rannte ihr hinterher, aber sie war schon weg.",
      "Ich möchte nichts vorwegnehmen, aber die Lage ist ernst.",
      "Wir gehen den Herausforderungen entgegen.",
      "Sie setzte sich mir gegenüber.",
      "Der Adler stieg in den Himmel empor.",
      "Der Protest wurde gewaltsam niedergeschlagen."
    ],
    tips: [
      "Estos prefijos suelen ser separables.",
      "'empor-' es literario; en coloquial se usa 'hoch-'.",
      "'nieder-' tiene connotación de violencia o derrota frecuentemente."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Añade el prefijo adecuado",
      datos: {
        frases: [
          { texto: "Er lief ihr ___ (detrás).", respuesta: "hinterher" },
          { texto: "Wir gehen der Sonne ___ (hacia).", respuesta: "entgegen" },
          { texto: "Der Vogel stieg ___ (arriba).", respuesta: "empor" },
          { texto: "Sie ___ den Aufstand ___ (suprimir).", respuesta: "schlug nieder" }
        ]
      }
    }
  },
  {
    id: "c1_matices_significado",
    nivel: "C1",
    titulo: "Matices de significado",
    icono: "🔍",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "fast/beinahe, ziemlich/recht/ganz, durchaus/ohnehin/sowieso, sogar/selbst: diferencias sutiles.",
    explicacion: `<p>Los <strong>matices de significado</strong> diferencian palabras que parecen sinónimos pero tienen usos específicos.</p>
<ul>
  <li><strong>fast / beinahe</strong> (casi): <em>beinahe</em> es más formal y literario.</li>
  <li><strong>ziemlich / recht / ganz</strong> (bastante): <em>ziemlich</em> es neutral, <em>recht</em> es más formal, <em>ganz</em> es más coloquial.</li>
  <li><strong>durchaus / ohnehin / sowieso</strong> (de todas formas): <em>durchaus</em> = absolutamente, <em>ohnehin</em> = de por sí, <em>sowieso</em> = de todas formas (coloquial).</li>
  <li><strong>sogar / selbst</strong> (incluso): <em>sogar</em> con valor aditivo, <em>selbst</em> con valor enfático (incluso...).</li>
</ul>
<table>
  <tr><th>Par</th><th>Diferencia</th><th>Ejemplo</th></tr>
  <tr><td>fast / beinahe</td><td>beinahe = más formal/literario</td><td>Fast wäre ich gefallen. / Beinahe wäre er ertrunken.</td></tr>
  <tr><td>ziemlich / recht / ganz</td><td>recht = formal; ganz = coloquial</td><td>Es ist ziemlich kalt. / Das ist recht interessant. / Das ist ganz gut.</td></tr>
  <tr><td>durchaus / ohnehin / sowieso</td><td>durchaus = énfasis; ohnehin = de por sí; sowieso = coloquial</td><td>Das ist durchaus möglich. / Das wusste ich ohnehin. / Mach ich sowieso.</td></tr>
  <tr><td>sogar / selbst</td><td>sogar = aditivo; selbst = enfático</td><td>Er hat sogar gelacht. / Selbst er hat gelacht.</td></tr>
</table>`,
    ejemplos: [
      "Beinahe hätte ich den Zug verpasst.",
      "Das ist recht interessant, was Sie da sagen.",
      "Die Aufgabe ist durchaus machbar.",
      "Das habe ich ohnehin vor.",
      "Selbst der Chef war überrascht.",
      "Sogar die Kinder haben mitgemacht."
    ],
    tips: [
      "'selbst' delante del sujeto enfatiza que incluso esa persona.",
      "'durchaus' es más fuerte que 'schon' o 'wohl'.",
      "'beinahe' se usa más en lenguaje escrito que 'fast'."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Elige la palabra adecuada según el matiz",
      datos: {
        frases: [
          { texto: "Das ist ___ interessant. (formal / bastante)", respuesta: "recht" },
          { texto: "___ ich war überrascht. (incluso yo)", respuesta: "Selbst" },
          { texto: "Das ist ___ möglich. (absolutamente)", respuesta: "durchaus" },
          { texto: "___ wäre ich gestürzt. (literario / casi)", respuesta: "Beinahe" }
        ]
      }
    }
  },
  {
    id: "c1_expresiones_idiomaticas",
    nivel: "C1",
    titulo: "Expresiones idiomáticas C1",
    icono: "💬",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "mit Ach und Krach, jemandem den Kopf waschen, das ist unter aller Sau, etc.",
    explicacion: `<p>Las <strong>expresiones idiomáticas de nivel C1</strong> son modismos avanzados que demuestran dominio del alemán coloquial y formal.</p>
<ul>
  <li><strong>mit Ach und Krach</strong> → apenas, por los pelos.</li>
  <li><strong>jemandem den Kopf waschen</strong> → echar una bronca a alguien.</li>
  <li><strong>das ist unter aller Sau</strong> → es pésimo, deplorable (fuerte).</li>
  <li><strong>das ist ein Katzensprung</strong> → está muy cerca.</li>
  <li><strong>sich ins Zeug legen</strong> → esforzarse al máximo.</li>
  <li><strong>den Nagel auf den Kopf treffen</strong> → dar en el clavo.</li>
  <li><strong>jemandem einen Bären aufbinden</strong> → tomar el pelo a alguien.</li>
  <li><strong>auf dem Schlauch stehen</strong> → estar bloqueado / no entender.</li>
</ul>
<table>
  <tr><th>Modismo</th><th>Significado literal</th><th>Significado real</th></tr>
  <tr><td>mit Ach und Krach</td><td>con ay y ruido</td><td>apenas, por los pelos</td></tr>
  <tr><td>jemandem den Kopf waschen</td><td>lavarle la cabeza</td><td>regañar severamente</td></tr>
  <tr><td>unter aller Sau</td><td>debajo de todo cerdo</td><td>pésimo, deplorable</td></tr>
  <tr><td>ein Katzensprung</td><td>un salto de gato</td><td>muy cerca</td></tr>
  <tr><td>den Nagel auf den Kopf treffen</td><td>golpear el clavo en la cabeza</td><td>dar en el clavo</td></tr>
  <tr><td>auf dem Schlauch stehen</td><td>estar sobre la manguera</td><td>no entender / estar bloqueado</td></tr>
</table>`,
    ejemplos: [
      "Ich habe die Prüfung mit Ach und Krach bestanden.",
      "Der Chef hat ihm gestern den Kopf gewaschen.",
      "Das Essen in diesem Restaurant ist unter aller Sau!",
      "Die nächste U-Bahn ist nur einen Katzensprung entfernt.",
      "Mit deiner Idee hast du den Nagel auf den Kopf getroffen.",
      "Jetzt stehe ich völlig auf dem Schlauch. Kannst du es nochmal erklären?"
    ],
    tips: [
      "'unter aller Sau' es una expresión fuerte, no uses en contextos formales.",
      "'mit Ach und Krach' implica que algo se logró apenas, con dificultad.",
      "'auf dem Schlauch stehen' es coloquial pero muy usado."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la expresión idiomática adecuada",
      datos: {
        frases: [
          { texto: "Wir haben es ___ ___ ___ geschafft. (apenas)", respuesta: "mit Ach und Krach" },
          { texto: "Das Ergebnis ist ___ ___ ___ . (pésimo)", respuesta: "unter aller Sau" },
          { texto: "Der Chef hat ihm ___ ___ ___. (regañar)", respuesta: "den Kopf gewaschen" },
          { texto: "Deine Antwort hat ___ ___ ___ getroffen. (dar en el clavo)", respuesta: "den Nagel auf den Kopf" }
        ]
      }
    }
  }
];