/* === CONTENIDO GRAMATICAL B2.1 === */
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};
window.Muller.Maestros.contenido.B2_1 = [
  {
    id: "b2_1_konjunktiv2",
    nivel: "B2.1",
    titulo: "Konjunktiv II perfeccionado",
    icono: "🎯",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Konjunktiv II de verbos irregulares: stünde, hülfe, dächte, wüsste, dürfte, möchte y más.",
    explicacion: `<p>El <strong>Konjunktiv II</strong> expresa situaciones irreales, deseos, cortesía o hipótesis. Además de <em>würde</em> + infinitivo, muchos verbos irregulares tienen formas propias que deben dominarse en B2.</p>
<ul>
  <li><strong>stehen</strong> → stünde / stände (<em>stünde</em> es más frecuente)</li>
  <li><strong>helfen</strong> → hülfe / hälfe (<em>hülfe</em> es la forma tradicional)</li>
  <li><strong>kennen</strong> → kennte</li>
  <li><strong>brennen</strong> → brennte</li>
  <li><strong>denken</strong> → dächte</li>
  <li><strong>wissen</strong> → wüsste</li>
  <li><strong>dürfen</strong> → dürfte</li>
  <li><strong>mögen</strong> → möchte</li>
  <li><strong>müssen</strong> → müsste</li>
  <li><strong>sollen</strong> → sollte</li>
  <li><strong>wollen</strong> → wollte</li>
  <li><strong>können</strong> → könnte</li>
  <li><strong>haben</strong> → hätte</li>
  <li><strong>sein</strong> → wäre</li>
  <li><strong>werden</strong> → würde</li>
</ul>
<table>
  <tr><th>Infinitivo</th><th>Konjunktiv II</th><th>Ejemplo</th></tr>
  <tr><td>stehen</td><td>stünde</td><td>Wenn ich neben dir stünde...</td></tr>
  <tr><td>helfen</td><td>hülfe</td><td>Er hülfe mir gern, aber...</td></tr>
  <tr><td>denken</td><td>dächte</td><td>Ich dächte, das wäre besser.</td></tr>
  <tr><td>wissen</td><td>wüsste</td><td>Wenn ich es nur wüsste!</td></tr>
  <tr><td>dürfen</td><td>dürfte</td><td>Das dürfte richtig sein.</td></tr>
</table>`,
    ejemplos: [
      "Wenn ich mehr Zeit hätte, würde ich Deutsch lernen.",
      "An deiner Stelle wäre ich vorsichtiger.",
      "Das dürfte der Grund sein.",
      "Ich wüsste gern, ob sie kommt.",
      "Wenn er nur hier stünde!"
    ],
    tips: [
      "No uses würde + inf. con verbos modales: 'ich würde können' → mejor 'ich könnte'.",
      "La forma stünde es más común que stände en alemán moderno.",
      "Konjunktiv II de cortesía: 'Ich hätte gern...' evita sonar directo."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la forma correcta de Konjunktiv II",
      datos: {
        frases: [
          { texto: "Wenn ich du ___, würde ich gehen. (sein)", respuesta: "wäre" },
          { texto: "Ich ___ gern ein Bier. (haben)", respuesta: "hätte" },
          { texto: "Das ___ teuer sein. (dürfen)", respuesta: "dürfte" },
          { texto: "Wenn ich es ___! (wissen)", respuesta: "wüsste" }
        ]
      }
    }
  },
  {
    id: "b2_1_pasiva_modal",
    nivel: "B2.1",
    titulo: "Pasiva con modales",
    icono: "⚙️",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Das muss gemacht werden / Das hat gemacht werden müssen: pasiva con verbos modales.",
    explicacion: `<p>La <strong>pasiva con verbos modales</strong> es esencial en alemán formal. Dos tiempos principales:</p>
<ul>
  <li><strong>Presente:</strong> Modal + <em>Partizip II</em> + <em>werden</em> → <em>Das muss gemacht werden.</em></li>
  <li><strong>Pasado (Perfecto):</strong> Modal + <em>Partizip II</em> + <em>worden</em> + <em>sein</em> → <em>Das hat gemacht werden müssen.</em></li>
</ul>
<table>
  <tr><th>Tiempo</th><th>Estructura</th><th>Ejemplo</th></tr>
  <tr><td>Presente</td><td>Modal + Partizip II + werden</td><td>Die Arbeit muss erledigt werden.</td></tr>
  <tr><td>Pretérito</td><td>Modal (pret.) + Partizip II + werden</td><td>Die Arbeit musste erledigt werden.</td></tr>
  <tr><td>Perfecto</td><td>hat + Partizip II + werden + modal (inf.)</td><td>Die Arbeit hat erledigt werden müssen.</td></tr>
  <tr><td>Futuro</td><td>wird + Partizip II + werden + modal</td><td>Die Arbeit wird erledigt werden müssen.</td></tr>
</table>`,
    ejemplos: [
      "Das Fenster muss geschlossen werden.",
      "Die Aufgaben konnten nicht rechtzeitig erledigt werden.",
      "Das hat sofort gemeldet werden müssen.",
      "Hier darf nicht geraucht werden.",
      "Die Prüfung wird im Juni abgelegt werden können."
    ],
    tips: [
      "En Perfecto pasiva con modal, 'worden' NO lleva 'ge-'.",
      "El orden: verbo modal conjugado al final en Perfecto.",
      "La pasiva con modales es muy frecuente en alemán escrito formal."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa la pasiva con el modal indicado",
      datos: {
        frases: [
          { texto: "Die Tür ___ geschlossen werden. (müssen)", respuesta: "muss" },
          { texto: "Der Text ___ nicht übersetzt werden. (brauchen + Negación)", respuesta: "braucht" },
          { texto: "Die Rechnung ___ bezahlt werden müssen. (haben, Perfecto)", respuesta: "hat" },
          { texto: "Hier ___ nicht geredet werden. (dürfen, Negación)", respuesta: "darf" }
        ]
      }
    }
  },
  {
    id: "b2_1_nominalisierung",
    nivel: "B2.1",
    titulo: "Nominalización",
    icono: "📝",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Verbal → nominal: lernen → das Lernen, ankommen → die Ankunft, prefijo Ge-: das Gerede.",
    explicacion: `<p>La <strong>nominalización</strong> convierte verbos en sustantivos. Es muy común en alemán formal y académico.</p>
<ul>
  <li><strong>Infinitivo</strong> como sustantivo neutro: <em>lernen → das Lernen</em></li>
  <li><strong>Raíz + -ung</strong> (femenino): <em>ankommen → die Ankunft</em> (excepción), <em>verbinden → die Verbindung</em></li>
  <li><strong>Prefijo Ge- + raíz</strong> (neutro, a menudo peyorativo): <em>reden → das Gerede</em>, <em>laufen → das Gelaufe</em></li>
  <li><strong>Sufijo -er</strong> (masculino, persona): <em>lehren → der Lehrer</em></li>
  <li><strong>Sufijo -nis</strong>: <em>erleben → das Erlebnis</em>, <em>hindern → das Hindernis</em></li>
  <li><strong>Sufijo -schaft</strong>: <em>freundlich → die Freundschaft</em></li>
</ul>
<table>
  <tr><th>Verbo</th><th>Sustantivo</th><th>Significado</th></tr>
  <tr><td>lernen</td><td>das Lernen</td><td>el aprendizaje</td></tr>
  <tr><td>ankommen</td><td>die Ankunft</td><td>la llegada</td></tr>
  <tr><td>reden</td><td>das Gerede</td><td>el parloteo</td></tr>
  <tr><td>verbinden</td><td>die Verbindung</td><td>la conexión</td></tr>
</table>`,
    ejemplos: [
      "Das Lernen einer Fremdsprache erfordert Disziplin.",
      "Die Ankunft des Zuges verspätet sich.",
      "Hör auf mit dem Gerede!",
      "Die Verbindung ist schlecht.",
      "Das Erlernen der deutschen Grammatik dauert Jahre."
    ],
    tips: [
      "El infinitivo nominalizado siempre es neutro (das).",
      "Ge- + verbo suele tener connotación negativa o repetitiva.",
      "En textos formales se usa más nominalización que en conversación."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Nominaliza el verbo entre paréntesis",
      datos: {
        frases: [
          { texto: "___ (lernen) ist wichtig für die Karriere.", respuesta: "Das Lernen" },
          { texto: "Die ___ (ankommen) erfolgt um 14 Uhr.", respuesta: "Ankunft" },
          { texto: "Sein ständiges ___ (reden) nervt mich.", respuesta: "Gerede" },
          { texto: "Die ___ (verbinden) funktioniert nicht.", respuesta: "Verbindung" }
        ]
      }
    }
  },
  {
    id: "b2_1_es_impersonal",
    nivel: "B2.1",
    titulo: '"es" impersonal',
    icono: "🌧️",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: 'es regnet, es gibt, es freut mich, es handelt sich um, es geht um: usos del "es" impersonal.',
    explicacion: `<p>El <strong>"es" impersonal</strong> tiene múltiples funciones en alemán. No se refiere a nada concreto, sino que cumple funciones gramaticales.</p>
<ul>
  <li><strong>Fenómenos meteorológicos:</strong> <em>Es regnet. Es schneit. Es donnert.</em></li>
  <li><strong>Existencia (es gibt):</strong> <em>Es gibt viele Möglichkeiten.</em> → con Acusativo</li>
  <li><strong>Estado emocional:</strong> <em>Es freut mich. Es tut mir leid. Es ärgert mich.</em></li>
  <li><strong>Verbos con preposición (es + verbo + preposición):</strong> <em>Es handelt sich um... Es geht um... Es kommt auf... an.</em></li>
  <li><strong>Tiempo / Hora:</strong> <em>Es ist spät. Es ist 10 Uhr.</em></li>
  <li><strong>Distancia:</strong> <em>Es sind 5 Kilometer bis zum Bahnhof.</em></li>
</ul>
<table>
  <tr><th>Función</th><th>Estructura</th><th>Ejemplo</th></tr>
  <tr><td>Meteo</td><td>es + verbo 3ª sg</td><td>Es regnet den ganzen Tag.</td></tr>
  <tr><td>Existencia</td><td>es gibt + Acusativo</td><td>Es gibt ein Problem.</td></tr>
  <tr><td>Emoción</td><td>es + verbo + persona</td><td>Es freut mich sehr.</td></tr>
  <tr><td>Reflexivo</td><td>es + verbo reflexivo</td><td>Es handelt sich um einen Fehler.</td></tr>
</table>`,
    ejemplos: [
      "Es regnet schon seit Stunden.",
      "Es gibt keine einfache Lösung.",
      "Es freut mich, dich kennenzulernen.",
      "Es handelt sich um ein Missverständnis.",
      "Es geht um deine Zukunft."
    ],
    tips: [
      '"Es gibt" rige Acusativo, no Nominativo.',
      "En frases con 'es' impersonal, si hay otro elemento al inicio, 'es' desaparece: 'Gestern hat es geregnet'.",
      '"Es handelt sich um" es muy frecuente en alemán formal.'
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la expresión adecuada con 'es'",
      datos: {
        frases: [
          { texto: "___ viele gute Bücher. (existencia)", respuesta: "Es gibt" },
          { texto: "___ um deine Gesundheit. (tratarse de)", respuesta: "Es handelt sich" },
          { texto: "___ mich, dass du gekommen bist. (alegrar)", respuesta: "Es freut" },
          { texto: "___ schon lange nicht mehr. (llover, negación)", respuesta: "Es regnet" }
        ]
      }
    }
  },
  {
    id: "b2_1_nicht_position",
    nivel: "B2.1",
    titulo: "Posición de 'nicht'",
    icono: "🚫",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Negar elemento específico vs negar toda la oración: nicht antes de preposiciones, después de pronombres.",
    explicacion: `<p>La posición de <strong>"nicht"</strong> cambia el significado de la oración. Es crucial saber qué se está negando.</p>
<ul>
  <li><strong>Negación total (nicht al final):</strong> <em>Ich komme nicht.</em> → niega toda la acción</li>
  <li><strong>Negación de un elemento específico (nicht ANTES del elemento):</strong> <em>Ich komme nicht heute, sondern morgen.</em></li>
  <li><strong>Antes de preposiciones:</strong> <em>Er geht nicht ins Kino. (niega el destino)</em></li>
  <li><strong>Después de pronombres:</strong> <em>Ich sehe ihn nicht. (niega el verbo)</em></li>
  <li><strong>Antes de adjetivos/adverbios predicativos:</strong> <em>Das ist nicht gut.</em></li>
  <li><strong>Antes de complementos con preposición fija:</strong> <em>Er wartet nicht auf mich.</em></li>
</ul>
<table>
  <tr><th>Qué se niega</th><th>Ejemplo</th></tr>
  <tr><td>Verbo/Acción</td><td>Ich schlafe nicht.</td></tr>
  <tr><td>Objeto específico</td><td>Ich lese nicht das Buch, sondern die Zeitung.</td></tr>
  <tr><td>Tiempo</td><td>Ich komme nicht heute, sondern morgen.</td></tr>
  <tr><td>Lugar</td><td>Er fährt nicht nach Berlin.</td></tr>
  <tr><td>Adjetivo</td><td>Das Essen ist nicht gut.</td></tr>
</table>`,
    ejemplos: [
      "Ich gehe nicht ins Kino. (niega el destino)",
      "Nicht ich habe das gesagt, sondern er. (niega el sujeto)",
      "Er ist nicht krank. (niega el adjetivo)",
      "Ich habe nicht genug Geld. (niega la cantidad)",
      "Sie kommt nicht mit dem Zug, sondern mit dem Auto."
    ],
    tips: [
      "Si niegas toda la oración, nicht va al final (o antes del segundo elemento del marco verbal).",
      "Para negar un elemento específico, nicht va DIRECTAMENTE antes de ese elemento.",
      "Con pronombres personales, nicht va después: 'Ich mag ihn nicht'."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Coloca 'nicht' en la posición correcta",
      datos: {
        frases: [
          { texto: "Ich mag Kaffee ___ sobre el café en general.", respuesta: "nicht" },
          { texto: "___ ich habe das gemacht, sondern sie. (negar sujeto)", respuesta: "Nicht" },
          { texto: "Er kommt ___ heute, sondern morgen. (negar tiempo)", respuesta: "nicht" },
          { texto: "Das ist ___ richtig.", respuesta: "nicht" }
        ]
      }
    }
  },
  {
    id: "b2_1_partikeln",
    nivel: "B2.1",
    titulo: "Partículas modales",
    icono: "💬",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "doch, ja, eben, halt, schon, wohl, eigentlich, denn, mal: matices y entonación.",
    explicacion: `<p>Las <strong>partículas modales</strong> dan matices emocionales y pragmáticos a la oración. Son muy difíciles de traducir literalmente.</p>
<ul>
  <li><strong>doch</strong> → insistencia / rectificación: <em>Das stimmt doch! (¡Sí que es verdad!)</em></li>
  <li><strong>ja</strong> → presuposición conocida: <em>Du bist ja schon da. (Ya estás aquí, veo)</em></li>
  <li><strong>eben / halt</strong> → resignación, así son las cosas: <em>Das ist eben so. (Es así y punto)</em></li>
  <li><strong>schon</strong> → seguridad mitigada / concesión: <em>Das wird schon klappen. (Ya saldrá bien)</em></li>
  <li><strong>wohl</strong> → suposición / probabilidad: <em>Er wird wohl kommen. (Seguramente vendrá)</em></li>
  <li><strong>eigentlich</strong> → en realidad, la verdad: <em>Was machst du eigentlich? (¿Qué haces, en realidad?)</em></li>
  <li><strong>denn</strong> → interés / sorpresa (solo en preguntas): <em>Was machst du denn da? (¿Qué haces ahí?)</em></li>
  <li><strong>mal</strong> → suaviza imperativos: <em>Komm mal her! (Ven un momento)</em></li>
</ul>
<table>
  <tr><th>Partícula</th><th>Significado</th><th>Ejemplo</th></tr>
  <tr><td>doch</td><td>insistencia</td><td>Komm doch bitte!</td></tr>
  <tr><td>ja</td><td>evidencia</td><td>Das ist ja toll!</td></tr>
  <tr><td>eben</td><td>resignación</td><td>So ist das Leben eben.</td></tr>
  <tr><td>schon</td><td>concesión</td><td>Das wird schon werden.</td></tr>
  <tr><td>denn</td><td>interés</td><td>Wo warst du denn?</td></tr>
</table>`,
    ejemplos: [
      "Komm doch bitte her!",
      "Das ist ja unglaublich!",
      "So ist das Leben eben.",
      "Was machst du denn da?",
      "Das wird schon wieder."
    ],
    tips: [
      "Las partículas modales NO se pueden traducir palabra por palabra.",
      "El significado cambia con la entonación: 'Das ist ja toll' (entusiasmo) vs 'Das ist ja toll' (irónico).",
      "Nunca uses partículas modales al inicio de la oración (excepto 'eigentlich')."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Elige la partícula modal correcta (doch, ja, eben, schon, denn)",
      datos: {
        frases: [
          { texto: "Komm ___ her, bitte! (insistencia)", respuesta: "doch" },
          { texto: "Das ist ___ schade! (evidencia, constatación)", respuesta: "ja" },
          { texto: "Was machst du ___? (interés)", respuesta: "denn" },
          { texto: "Es ist ___ nicht anders möglich. (resignación)", respuesta: "eben" }
        ]
      }
    }
  }
];