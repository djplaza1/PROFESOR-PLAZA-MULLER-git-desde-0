// src/features/maestros/contenido/contenidoC1.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.C1 = [
  // ============================================================
  // 1) INFINITIVO CON UM...ZU / STATT...ZU / OHNE...ZU
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Er spart Geld, ___ ein Auto ___ kaufen.", respuesta: "um zu", opciones: null, traduccion: "Él ahorra dinero para comprar un coche.", pista: "finalidad", explicacion: "um...zu = para + infinitivo (finalidad, mismo sujeto)." },
        { tipo: "opcion", frase: "___ zu arbeiten, geht er feiern.", respuesta: "Statt", opciones: ["Statt", "Um", "Ohne", "Anstatt"], traduccion: "En lugar de trabajar, va a celebrar.", pista: null, explicacion: "Statt...zu = en lugar de (sustitución, mismo sujeto)." },
        { tipo: "hueco", frase: "Er ging, ___ sich ___ verabschieden.", respuesta: "ohne zu", opciones: null, traduccion: "Se fue sin despedirse.", pista: "sin que/exclusión", explicacion: "ohne...zu = sin + infinitivo (ausencia de acción, mismo sujeto)." },
        { tipo: "opcion", frase: "Sie lernt fleißig, ___ die Prüfung ___ bestehen.", respuesta: "um zu", opciones: ["um zu", "statt zu", "ohne zu", "anstatt zu"], traduccion: "Estudia diligentemente para aprobar el examen.", pista: null, explicacion: "um...zu = para (finalidad, mismo sujeto)." },
        { tipo: "hueco", frase: "Er arbeitet, ___ seine Familie reisen kann. (diferente sujeto)", respuesta: "damit", opciones: null, traduccion: "Él trabaja para que su familia pueda viajar (diferente sujeto).", pista: "conjunción final con diferente sujeto", explicacion: "damit = para que (subordinada final con diferente sujeto)." },
        { tipo: "opcion", frase: "___ zu helfen, macht er alles noch schlimmer.", respuesta: "Statt", opciones: ["Statt", "Um", "Ohne", "Anstatt"], traduccion: "En lugar de ayudar, lo empeora todo.", pista: null, explicacion: "Statt...zu = en lugar de (sustitución, mismo sujeto)." },
        { tipo: "hueco", frase: "___ dass er sich entschuldigt, wird er wütend.", respuesta: "Anstatt", opciones: null, traduccion: "En lugar de disculparse, se enfada.", pista: "diferente sujeto", explicacion: "Anstatt dass = en lugar de que (sustitución, diferente sujeto)." },
        { tipo: "opcion", frase: "Sie verließ das Haus, ___ ein Wort zu sagen.", respuesta: "ohne", opciones: ["ohne", "um", "statt", "damit"], traduccion: "Salió de casa sin decir una palabra.", pista: null, explicacion: "ohne...zu = sin (exclusión de acción, mismo sujeto)." },
        { tipo: "hueco", frase: "Er übt Klavier, ___ besser ___ werden.", respuesta: "um zu", opciones: null, traduccion: "Practica piano para mejorar.", pista: "finalidad, mismo sujeto", explicacion: "um...zu = para (expresa la meta/intención)." },
        { tipo: "opcion", frase: "___ zu frühstücken, läuft er los.", respuesta: "Ohne", opciones: ["Ohne", "Um", "Statt", "Damit"], traduccion: "Sale corriendo sin desayunar.", pista: null, explicacion: "Ohne...zu = sin + infinitivo (sin realizar la acción mencionada)." },
        { tipo: "hueco", frase: "Sie studiert Medizin, ___ Ärztin ___ werden.", respuesta: "um zu", opciones: null, traduccion: "Estudia medicina para ser médica.", pista: "finalidad profesional", explicacion: "um...zu = para (indica el objetivo profesional)." },
        { tipo: "opcion", frase: "___ zu schweigen, sprach er endlich.", respuesta: "Statt", opciones: ["Statt", "Ohne", "Um", "Anstatt"], traduccion: "En lugar de callarse, por fin habló.", pista: null, explicacion: "Statt...zu = en lugar de (indica una acción alternativa no realizada)." }
      ]
    }
  },
  // ============================================================
  // 2) CONECTORES ACADÉMICOS
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___, ist das Experiment gelungen. (Ferner)", respuesta: "Ferner", opciones: null, traduccion: "Además, el experimento ha salido bien.", pista: "conector formal 'además'", explicacion: "Ferner = además (conector formal, posición 0)." },
        { tipo: "opcion", frase: "Das ist ___ bewiesen. (de ninguna manera)", respuesta: "keineswegs", opciones: ["keineswegs", "nichtsdestotrotz", "infolgedessen", "ferner"], traduccion: "Eso no está demostrado de ninguna manera.", pista: null, explicacion: "keineswegs = de ninguna manera (negación enfática formal)." },
        { tipo: "hueco", frase: "___ müssen wir weitermachen. (Nichtsdestotrotz)", respuesta: "Nichtsdestotrotz", opciones: null, traduccion: "No obstante, debemos continuar.", pista: "conector concesivo enfático", explicacion: "Nichtsdestotrotz = no obstante (conector concesivo formal y enfático)." },
        { tipo: "opcion", frase: "___ der Finanzen gibt es Probleme. (en cuanto a)", respuesta: "Hinsichtlich", opciones: ["Hinsichtlich", "Infolgedessen", "Ferner", "Vielmehr"], traduccion: "En cuanto a las finanzas, hay problemas.", pista: null, explicacion: "Hinsichtlich + Genitivo = en cuanto a / con respecto a." },
        { tipo: "hueco", frase: "Es regnete stark, ___ fiel das Fest aus.", respuesta: "infolgedessen", opciones: null, traduccion: "Llovió mucho, en consecuencia se canceló la fiesta.", pista: "conector consecutivo formal", explicacion: "infolgedessen = en consecuencia (conector consecutivo formal)." },
        { tipo: "opcion", frase: "Er ist nicht dumm, ___ sehr klug.", respuesta: "vielmehr", opciones: ["vielmehr", "ferner", "keineswegs", "infolgedessen"], traduccion: "No es tonto, sino más bien muy listo.", pista: null, explicacion: "vielmehr = más bien (corrección/rectificación formal)." },
        { tipo: "hueco", frase: "___ der Ergebnisse sind wir zufrieden. (in Bezug auf)", respuesta: "In Bezug auf", opciones: null, traduccion: "En relación con los resultados, estamos satisfechos.", pista: "preposición formal + Akkusativ", explicacion: "In Bezug auf + Akk. = en relación con / respecto a." },
        { tipo: "opcion", frase: "___ ist zu beachten, dass die Frist bald endet.", respuesta: "Ferner", opciones: ["Ferner", "Keineswegs", "Vielmehr", "Hinsichtlich"], traduccion: "Además, hay que tener en cuenta que el plazo termina pronto.", pista: null, explicacion: "Ferner = además (marcador formal para añadir información)." },
        { tipo: "hueco", frase: "Die Lage ist ernst, ___ geben wir nicht auf.", respuesta: "nichtsdestotrotz", opciones: null, traduccion: "La situación es grave, no obstante no nos rendimos.", pista: "conector concesivo enfático", explicacion: "nichtsdestotrotz = no obstante (adverbio concesivo formal)." },
        { tipo: "opcion", frase: "Die Aktien fielen, ___ verloren viele Anleger Geld.", respuesta: "infolgedessen", opciones: ["infolgedessen", "nichtsdestotrotz", "ferner", "keineswegs"], traduccion: "Las acciones cayeron, en consecuencia muchos inversores perdieron dinero.", pista: null, explicacion: "infolgedessen = en consecuencia (conector de causa-efecto)." },
        { tipo: "hueco", frase: "Das ist ___ korrekt, sondern falsch. (keineswegs)", respuesta: "keineswegs", opciones: null, traduccion: "Eso no es correcto de ninguna manera, sino falso.", pista: "negación enfática formal", explicacion: "keineswegs + sondern = negación enfática seguida de corrección." },
        { tipo: "opcion", frase: "___ des Klimawandels müssen wir handeln.", respuesta: "Hinsichtlich", opciones: ["Hinsichtlich", "Ferner", "Infolgedessen", "In Bezug"], traduccion: "Con respecto al cambio climático, debemos actuar.", pista: null, explicacion: "Hinsichtlich + Gen. = en cuanto a / con respecto a (formal)." }
      ]
    }
  },
  // ============================================================
  // 3) ESTILO FORMAL (FVG)
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Wir bieten Hilfe an. → Wir stellen Hilfe zur ___ .", respuesta: "Verfügung", opciones: null, traduccion: "Ofrecemos ayuda. → Ponemos ayuda a disposición.", pista: "FVG de bereitstellen", explicacion: "zur Verfügung stellen = proporcionar / poner a disposición." },
        { tipo: "opcion", frase: "Er drückt seine Meinung aus. → Er bringt seine Meinung ___ ___.", respuesta: "zum Ausdruck", opciones: ["zum Ausdruck", "zur Verfügung", "in Anspruch", "in Betracht"], traduccion: "Él expresa su opinión. → Expresa su opinión (formal).", pista: null, explicacion: "zum Ausdruck bringen = expresar (FVG formal de ausdrücken)." },
        { tipo: "hueco", frase: "Wir berücksichtigen Ihren Vorschlag. → Wir ziehen Ihren Vorschlag in ___ .", respuesta: "Betracht", opciones: null, traduccion: "Consideramos su propuesta. → Tomamos en consideración su propuesta.", pista: "FVG de berücksichtigen", explicacion: "in Betracht ziehen = considerar / tomar en consideración." },
        { tipo: "opcion", frase: "Das Projekt nimmt viel Zeit. → Das Projekt nimmt viel Zeit in ___ .", respuesta: "Anspruch", opciones: ["Anspruch", "Betracht", "Verfügung", "Ausdruck"], traduccion: "El proyecto toma mucho tiempo. → El proyecto ocupa mucho tiempo (formal).", pista: null, explicacion: "in Anspruch nehmen = requerir / ocupar (formal)." },
        { tipo: "hueco", frase: "Ich schlage vor. → Ich unterbreite einen ___ .", respuesta: "Vorschlag", opciones: null, traduccion: "Propongo. → Someto una propuesta (formal).", pista: "FVG de vorschlagen", explicacion: "einen Vorschlag unterbreiten = proponer / someter una propuesta." },
        { tipo: "opcion", frase: "Wir haben erfahren, dass... → Wir haben zur ___ genommen, dass...", respuesta: "Kenntnis", opciones: ["Kenntnis", "Verfügung", "Ausdruck", "Betracht"], traduccion: "Hemos sabido que... → Hemos tomado conocimiento de que... (formal).", pista: null, explicacion: "zur Kenntnis nehmen = tomar conocimiento de / enterarse (formal)." },
        { tipo: "hueco", frase: "Die Firma stellt neue Computer zur ___ .", respuesta: "Verfügung", opciones: null, traduccion: "La empresa pone nuevos ordenadores a disposición.", pista: "FVG de proporcionar", explicacion: "zur Verfügung stellen = proporcionar / poner a disposición (formal)." },
        { tipo: "opcion", frase: "Der Anwalt nahm den Fall in ___ .", respuesta: "Anspruch", opciones: ["Anspruch", "Betracht", "Kenntnis", "Ausdruck"], traduccion: "El abogado asumió el caso (formal).", pista: null, explicacion: "in Anspruch nehmen = tomar / asumir / ocupar (formal)." },
        { tipo: "hueco", frase: "Wir bringen unsere Dankbarkeit zum ___ .", respuesta: "Ausdruck", opciones: null, traduccion: "Expresamos nuestro agradecimiento (formal).", pista: "FVG de ausdrücken", explicacion: "zum Ausdruck bringen = expresar / manifestar (formal)." },
        { tipo: "opcion", frase: "Bitte ziehen Sie unsere Bedingungen in ___ .", respuesta: "Betracht", opciones: ["Betracht", "Verfügung", "Anspruch", "Kenntnis"], traduccion: "Por favor, considere nuestras condiciones.", pista: null, explicacion: "in Betracht ziehen = considerar / tener en cuenta (formal)." },
        { tipo: "hueco", frase: "Wir haben die Information zur ___ genommen.", respuesta: "Kenntnis", opciones: null, traduccion: "Hemos tomado conocimiento de la información.", pista: "FVG de erfahren", explicacion: "zur Kenntnis nehmen = tomar conocimiento / enterarse oficialmente." },
        { tipo: "opcion", frase: "Der Minister unterbreitete einen neuen ___ .", respuesta: "Vorschlag", opciones: ["Vorschlag", "Ausdruck", "Betracht", "Verfügung"], traduccion: "El ministro sometió una nueva propuesta.", pista: null, explicacion: "einen Vorschlag unterbreiten = proponer formalmente." }
      ]
    }
  },
  // ============================================================
  // 4) PREFIJOS VERBALES AVANZADOS
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Er lief ihr ___ (detrás).", respuesta: "hinterher", opciones: null, traduccion: "Corrió detrás de ella.", pista: "prefijo separable de 'detrás'", explicacion: "hinterher- = detrás / después (prefijo separable)." },
        { tipo: "opcion", frase: "Wir gehen der Sonne ___ (hacia).", respuesta: "entgegen", opciones: ["entgegen", "hinterher", "empor", "nieder"], traduccion: "Caminamos hacia el sol.", pista: null, explicacion: "entgegen- = hacia / al encuentro de (dirección)." },
        { tipo: "hueco", frase: "Der Vogel stieg ___ (arriba).", respuesta: "empor", opciones: null, traduccion: "El pájaro ascendió (hacia arriba, literario).", pista: "prefijo literario de ascenso", explicacion: "empor- = hacia arriba (literario; coloquial: hoch-)." },
        { tipo: "opcion", frase: "Sie ___ den Aufstand ___ (suprimir).", respuesta: "schlug nieder", opciones: ["schlug nieder", "schlug empor", "lief hinterher", "nahm vorweg"], traduccion: "Suprimieron la revuelta.", pista: null, explicacion: "niederschlagen = derribar / suprimir (connotación violenta)." },
        { tipo: "hueco", frase: "Ich möchte nichts ___ nehmen. (vorweg)", respuesta: "vorweg", opciones: null, traduccion: "No quiero adelantar nada.", pista: "prefijo de anticipación", explicacion: "vorwegnehmen = adelantarse a / anticipar." },
        { tipo: "opcion", frase: "Sie saß mir ___ . (enfrente)", respuesta: "gegenüber", opciones: ["gegenüber", "entgegen", "hinterher", "empor"], traduccion: "Estaba sentada frente a mí.", pista: null, explicacion: "gegenübersitzen = estar sentado enfrente de." },
        { tipo: "hueco", frase: "Wir gehen der Zukunft ___ . (entgegen)", respuesta: "entgegen", opciones: null, traduccion: "Vamos hacia el futuro.", pista: "prefijo de dirección hacia algo", explicacion: "entgegengehen = ir hacia / encarar." },
        { tipo: "opcion", frase: "Er ___ auf den Gipfel ___ (subir).", respuesta: "stieg empor", opciones: ["stieg empor", "stieg nieder", "lief hinterher", "nahm vorweg"], traduccion: "Ascendió a la cima.", pista: null, explicacion: "emporsteigen = ascender (literario)." },
        { tipo: "hueco", frase: "Der Hund lief seinem Herrn ___ . (hinterher)", respuesta: "hinterher", opciones: null, traduccion: "El perro corrió detrás de su dueño.", pista: "prefijo de persecución", explicacion: "hinterherlaufen = correr detrás de / perseguir." },
        { tipo: "opcion", frase: "Die Regierung ___ die Proteste ___ .", respuesta: "schlug nieder", opciones: ["schlug nieder", "ging entgegen", "saß gegenüber", "stieg empor"], traduccion: "El gobierno reprimió las protestas.", pista: null, explicacion: "niederschlagen = reprimir / sofocar (violencia estatal)." },
        { tipo: "hueco", frase: "Er kniete vor dem König ___ . (nieder)", respuesta: "nieder", opciones: null, traduccion: "Se arrodilló ante el rey.", pista: "prefijo de 'hacia abajo'", explicacion: "niederknien = arrodillarse (movimiento hacia abajo)." },
        { tipo: "opcion", frase: "___ dir nichts! (no te adelantes)", respuesta: "Nimm vorweg", opciones: ["Nimm vorweg", "Geh entgegen", "Steig empor", "Knie nieder"], traduccion: "¡No te adelantes a nada!", pista: null, explicacion: "vorwegnehmen = anticipar / adelantarse." }
      ]
    }
  },
  // ============================================================
  // 5) MATICES DE SIGNIFICADO
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das ist ___ interessant. (formal / bastante)", respuesta: "recht", opciones: null, traduccion: "Eso es bastante interesante (formal).", pista: "variante formal de 'bastante'", explicacion: "recht = bastante (formal; más formal que ziemlich)." },
        { tipo: "opcion", frase: "___ ich war überrascht. (incluso yo)", respuesta: "Selbst", opciones: ["Selbst", "Sogar", "Auch", "Beinahe"], traduccion: "Incluso yo estaba sorprendido (énfasis en el sujeto).", pista: null, explicacion: "Selbst + sujeto = incluso (énfasis en que esa persona también)." },
        { tipo: "hueco", frase: "Das ist ___ möglich. (absolutamente)", respuesta: "durchaus", opciones: null, traduccion: "Eso es absolutamente posible.", pista: "adverbio de énfasis", explicacion: "durchaus = absolutamente / perfectamente (énfasis positivo)." },
        { tipo: "opcion", frase: "___ wäre ich gestürzt. (literario / casi)", respuesta: "Beinahe", opciones: ["Beinahe", "Fast", "Ziemlich", "Ganz"], traduccion: "Casi me caigo (literario).", pista: null, explicacion: "Beinahe = casi (formal/literario; fast es más coloquial)." },
        { tipo: "hueco", frase: "Das ist ___ gut gelungen. (ganz)", respuesta: "ganz", opciones: null, traduccion: "Eso ha salido bastante bien (coloquial).", pista: "variante coloquial de 'bastante'", explicacion: "ganz = bastante (coloquial; menos formal que recht)." },
        { tipo: "opcion", frase: "Das wusste ich ___ . (de por sí)", respuesta: "ohnehin", opciones: ["ohnehin", "sowieso", "durchaus", "ziemlich"], traduccion: "Eso lo sabía de por sí (formal).", pista: null, explicacion: "ohnehin = de por sí / ya de antemano (formal)." },
        { tipo: "hueco", frase: "___ die Kinder haben mitgemacht. (Sogar)", respuesta: "Sogar", opciones: null, traduccion: "Incluso los niños participaron (aditivo).", pista: "adverbio aditivo", explicacion: "sogar = incluso (valor aditivo, modifica al verbo)." },
        { tipo: "opcion", frase: "Das mache ich ___ . (de todas formas, coloquial)", respuesta: "sowieso", opciones: ["sowieso", "ohnehin", "durchaus", "ziemlich"], traduccion: "Eso lo hago de todas formas (coloquial).", pista: null, explicacion: "sowieso = de todas formas (coloquial; ohnehin es formal)." },
        { tipo: "hueco", frase: "Die Prüfung war ___ schwer. (ziemlich)", respuesta: "ziemlich", opciones: null, traduccion: "El examen era bastante difícil (neutral).", pista: "adverbio neutral de grado", explicacion: "ziemlich = bastante (neutral, ni formal ni coloquial)." },
        { tipo: "opcion", frase: "___ er war verwirrt. (incluso él, enfático)", respuesta: "Selbst", opciones: ["Selbst", "Sogar", "Auch", "Beinahe"], traduccion: "Incluso él estaba confundido (énfasis).", pista: null, explicacion: "Selbst + sujeto = inclusión enfática." },
        { tipo: "hueco", frase: "___ hätte ich den Zug verpasst. (Fast)", respuesta: "Fast", opciones: null, traduccion: "Casi pierdo el tren (coloquial).", pista: "'casi' coloquial", explicacion: "Fast = casi (coloquial; beinahe es formal)." },
        { tipo: "opcion", frase: "Er hat ___ gelacht. (incluso rió)", respuesta: "sogar", opciones: ["sogar", "selbst", "auch", "beinahe"], traduccion: "Incluso se rió (aditivo, modifica al verbo).", pista: null, explicacion: "sogar = incluso (modifica la acción verbal)." }
      ]
    }
  },
  // ============================================================
  // 6) EXPRESIONES IDIOMÁTICAS C1
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Wir haben es ___ ___ ___ geschafft. (apenas)", respuesta: "mit Ach und Krach", opciones: null, traduccion: "Lo logramos por los pelos / apenas.", pista: "expresión para 'apenas, con dificultad'", explicacion: "mit Ach und Krach = por los pelos, apenas (con mucha dificultad)." },
        { tipo: "opcion", frase: "Das Ergebnis ist ___ ___ ___ . (pésimo)", respuesta: "unter aller Sau", opciones: ["unter aller Sau", "ein Katzensprung", "mit Ach und Krach", "den Nagel auf den Kopf"], traduccion: "El resultado es pésimo / deplorable.", pista: null, explicacion: "unter aller Sau = pésimo, deplorable (expresión fuerte, coloquial)." },
        { tipo: "hueco", frase: "Der Chef hat ihm ___ ___ ___ . (regañar)", respuesta: "den Kopf gewaschen", opciones: null, traduccion: "El jefe le echó una bronca / le lavó la cabeza.", pista: "expresión para 'regañar severamente'", explicacion: "jemandem den Kopf waschen = regañar severamente a alguien." },
        { tipo: "opcion", frase: "Deine Antwort hat ___ ___ ___ getroffen. (dar en el clavo)", respuesta: "den Nagel auf den Kopf", opciones: ["den Nagel auf den Kopf", "einen Bären aufgebunden", "mit Ach und Krach", "auf dem Schlauch"], traduccion: "Tu respuesta dio en el clavo.", pista: null, explicacion: "den Nagel auf den Kopf treffen = dar en el clavo / acertar completamente." },
        { tipo: "hueco", frase: "Die nächste Station ist nur einen ___ entfernt.", respuesta: "Katzensprung", opciones: null, traduccion: "La próxima estación está a un paso / muy cerca.", pista: "expresión para 'distancia corta'", explicacion: "ein Katzensprung = un salto de gato / muy cerca." },
        { tipo: "opcion", frase: "Er hat mir einen Bären ___ . (tomar el pelo)", respuesta: "aufgebunden", opciones: ["aufgebunden", "gewaschen", "getroffen", "gelegt"], traduccion: "Me tomó el pelo / me engañó.", pista: null, explicacion: "jemandem einen Bären aufbinden = tomar el pelo / engañar." },
        { tipo: "hueco", frase: "Ich stehe völlig auf dem ___ . (no entender)", respuesta: "Schlauch", opciones: null, traduccion: "Estoy completamente bloqueado / no entiendo nada.", pista: "expresión para 'no entender'", explicacion: "auf dem Schlauch stehen = estar bloqueado / no entender algo." },
        { tipo: "opcion", frase: "Wir müssen uns ins ___ legen. (esforzarse)", respuesta: "Zeug", opciones: ["Zeug", "Schlauch", "Kopf", "Bären"], traduccion: "Debemos esforzarnos al máximo.", pista: null, explicacion: "sich ins Zeug legen = esforzarse / dar el máximo." },
        { tipo: "hueco", frase: "Die Prüfung war schwer, aber ich habe sie mit ___ und ___ bestanden.", respuesta: "Ach Krach", opciones: null, traduccion: "El examen era difícil, pero lo aprobé por los pelos.", pista: "expresión de dificultad", explicacion: "mit Ach und Krach = apenas, con gran esfuerzo." },
        { tipo: "opcion", frase: "Der Film war ___ . (pésimo)", respuesta: "unter aller Sau", opciones: ["unter aller Sau", "ein Katzensprung", "den Nagel auf den Kopf", "auf dem Schlauch"], traduccion: "La película era pésima.", pista: null, explicacion: "unter aller Sau = expresión coloquial fuerte para 'deplorable'." },
        { tipo: "hueco", frase: "Meine Mutter hat mir den ___ gewaschen, weil ich zu spät kam.", respuesta: "Kopf", opciones: null, traduccion: "Mi madre me regañó porque llegué tarde.", pista: "parte del cuerpo en expresión de regañar", explicacion: "den Kopf waschen = lavar la cabeza (regañar)." },
        { tipo: "opcion", frase: "Jetzt verstehe ich! Du hast den ___ auf den Kopf getroffen.", respuesta: "Nagel", opciones: ["Nagel", "Schlauch", "Bären", "Katzensprung"], traduccion: "¡Ahora entiendo! Diste en el clavo.", pista: null, explicacion: "den Nagel auf den Kopf treffen = acertar de lleno / dar en el clavo." }
      ]
    }
  }
];