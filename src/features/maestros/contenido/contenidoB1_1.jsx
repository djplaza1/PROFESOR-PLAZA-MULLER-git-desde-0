// src/features/maestros/contenido/contenidoB1_1.jsx
// Contenido gramatical nivel B1.1 - Intermedio inicial
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Maestros.B1_1 = [
  {
    id: "b1_1_perfekt_avanzado",
    nivel: "B1.1",
    titulo: "Perfekt Avanzado (gemischt, trembare, untrennbare Verben)",
    icono: "⏳",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "Perfekt avanzado con verbos mixtos, separables e inseparables. El Partizip II en toda su complejidad.",
    explicacion: `
      <h3 class="text-lg font-bold text-violet-400 mb-2">Perfekt: Verbos mixtos, separables e inseparables</h3>
      <p class="mb-2">El Perfekt es el tiempo pasado más usado en alemán hablado. Ya conoces la estructura básica: <em>haben/sein + Partizip II</em>. Ahora profundizamos en los casos complejos.</p>
      <h4 class="font-bold text-violet-300 mt-2 mb-1">1. Verbos mixtos (gemischte Verben)</h4>
      <p class="mb-2">Combinan cambio de vocal (como fuertes) + terminación -t (como débiles):</p>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-violet-900/50"><th class="border p-1">Infinitivo</th><th class="border p-1">Partizip II</th><th class="border p-1">Cambio</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">denken</td><td class="border p-1">gedacht</td><td class="border p-1">e → a</td></tr>
        <tr><td class="border p-1">bringen</td><td class="border p-1">gebracht</td><td class="border p-1">i → a</td></tr>
        <tr><td class="border p-1">kennen</td><td class="border p-1">gekannt</td><td class="border p-1">e → a</td></tr>
        <tr><td class="border p-1">nennen</td><td class="border p-1">genannt</td><td class="border p-1">e → a</td></tr>
        <tr><td class="border p-1">rennen</td><td class="border p-1">gerannt</td><td class="border p-1">e → a</td></tr>
        <tr><td class="border p-1">brennen</td><td class="border p-1">gebrannt</td><td class="border p-1">e → a</td></tr>
        <tr><td class="border p-1">wissen</td><td class="border p-1">gewusst</td><td class="border p-1">i → u</td></tr>
        </tbody>
      </table>
      <h4 class="font-bold text-violet-300 mt-2 mb-1">2. Verbos separables (trennbare)</h4>
      <p>El prefijo va al final: <em>aufmachen → aufgemacht</em>. La <strong>-ge-</strong> va entre prefijo y raíz.</p>
      <h4 class="font-bold text-violet-300 mt-2 mb-1">3. Verbos inseparables (untrennbare)</h4>
      <p>Los prefijos <em>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</em> NO llevan <strong>ge-</strong> en Partizip II: <em>verstehen → verstanden</em>.</p>
    `,
    ejemplos: [
      "Ich habe gestern meinen Schlüssel verlegt. (Perdí mis llaves ayer - verlegen, inseparable)",
      "Sie hat mich gestern angerufen. (Ella me llamó ayer - anrufen, separable)",
      "Er hat den Film nicht gekannt. (Él no conocía la película - kennen, mixto)",
      "Wir haben das Fenster aufgemacht. (Abrimos la ventana - aufmachen, separable)",
      "Hast du das gewusst? (¿Sabías eso? - wissen, mixto)"
    ],
    tips: [
      "Verbos que empiezan por <em>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</em> NUNCA llevan ge- en Partizip II.",
      "Los verbos separables siempre ponen <em>ge-</em> entre el prefijo y la raíz: an-ge-rufen.",
      "Los 7 verbos mixtos son pocos: apréndelos de memoria (denken/bringen/kennen/nennen/rennen/brennen/wissen)."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el Partizip II correcto",
      datos: [
        { pista: "Ich habe nicht (denken) ___.", respuesta: "gedacht" },
        { pista: "Sie hat mich (anrufen) ___.", respuesta: "angerufen" },
        { pista: "Er hat das Buch (verstehen) ___.", respuesta: "verstanden" },
        { pista: "Wir haben das Fenster (aufmachen) ___.", respuesta: "aufgemacht" },
        { pista: "Hast du das (wissen) ___?", respuesta: "gewusst" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich habe gestern nicht gedenkt.", error: "gedenkt", correccion: "Ich habe gestern nicht gedacht. (denken → denken → gedacht)." },
      { frase: "Sie hat mir geholft.", error: "geholft", correccion: "Sie hat mir geholfen. (helfen → helfen → geholfen, cambio de vocal)." },
      { frase: "Er hat verstanden die Frage.", error: "verstanden die Frage", correccion: "Er hat die Frage verstanden. (Partizip II al final)." }
    ]
  },
  {
    id: "b1_1_plusquamperfekt",
    nivel: "B1.1",
    titulo: "Plusquamperfekt",
    icono: "⏮️",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "El pasado perfecto alemán: una acción anterior a otra en el pasado. hatten/waren + Partizip II.",
    explicacion: `
      <h3 class="text-lg font-bold text-indigo-400 mb-2">Plusquamperfekt: El pasado anterior al pasado</h3>
      <p class="mb-2">El <strong>Plusquamperfekt</strong> expresa una acción que ocurrió <strong>antes</strong> de otra acción en el pasado. Se usa principalmente con <em>nachdem</em> (después de que) o para narrar eventos previos.</p>
      <h4 class="font-bold text-indigo-300 mt-2 mb-1">Estructura</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">hatte/waren (Präteritum) + Partizip II + ... + (Satzende)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Nachdem ich gegessen <strong>hatte</strong>, ging ich spazieren. (Después de que hube comido, fui a pasear).</p>
      <h4 class="font-bold text-indigo-300 mt-2 mb-1">Comparación de tiempos pasados</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-indigo-900/50"><th class="border p-1">Tiempo</th><th class="border p-1">Uso</th><th class="border p-1">Ejemplo</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Perfekt</td><td class="border p-1">Pasado general (hablado)</td><td class="border p-1">Ich habe gegessen.</td></tr>
        <tr><td class="border p-1">Präteritum</td><td class="border p-1">Pasado narrativo (escrito)</td><td class="border p-1">Ich aß.</td></tr>
        <tr><td class="border p-1"><strong>Plusquamperfekt</strong></td><td class="border p-1">Anterior a otra acción pasada</td><td class="border p-1">Ich hatte gegessen.</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ La elección de <em>hatte</em> o <em>war</em> sigue las mismas reglas que Perfekt: verbos de movimiento y cambio de estado usan <em>war</em>.</p>
    `,
    ejemplos: [
      "Nachdem ich die Hausaufgaben gemacht hatte, sah ich fern. (Después de hacer los deberes, vi la tele)",
      "Er war schon gegangen, als ich ankam. (Ya se había ido cuando llegué)",
      "Wir hatten das Essen bestellt, bevor wir Platz nahmen. (Habíamos pedido la comida antes de sentarnos)",
      "Sie hatte Deutsch gelernt, bevor sie nach Berlin zog. (Había aprendido alemán antes de mudarse a Berlín)",
      "Hattest du das Buch schon gelesen, als der Film herauskam? (¿Ya habías leído el libro cuando salió la película?)"
    ],
    tips: [
      "<em>Nachdem</em> + Plusquamperfekt en la subordinada, <em>Präteritum/Perfekt</em> en la principal.",
      "Si no estás seguro, usa Perfekt. El Plusquamperfekt solo es necesario para dejar clara la anterioridad.",
      "Los mismos auxiliares que Perfekt: haben para transitivos/reflexivos, sein para movimiento/cambio."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con Plusquamperfekt (hatte/war + Partizip II)",
      datos: [
        { pista: "Nachdem ich (essen) ___, ging ich spazieren.", respuesta: "gegessen hatte" },
        { pista: "Er (gehen) ___, bevor sie kam.", respuesta: "war gegangen" },
        { pista: "Wir (bestellen) ___ das Essen.", respuesta: "hatten bestellt" },
        { pista: "Sie (lernen) ___ Deutsch, bevor sie reiste.", respuesta: "hatte gelernt" },
        { pista: "Nachdem der Film (enden) ___, gingen wir nach Hause.", respuesta: "geendet war" }
      ]
    },
    corrigeNovato: [
      { frase: "Nachdem ich gegessen habe, ging ich spazieren.", error: "gegessen habe", correccion: "Nachdem ich gegessen hatte, ging ich spazieren. (Plusquamperfekt, no Perfekt, porque es anterior)." },
      { frase: "Er war schon gehen, als ich kam.", error: "war gehen", correccion: "Er war schon gegangen, als ich kam. (Partizip II, no infinitivo)." }
    ]
  },
  {
    id: "b1_1_konjunktiv2_vergangenheit",
    nivel: "B1.1",
    titulo: "Konjunktiv II Vergangenheit",
    icono: "🕰️",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "El condicional compuesto alemán: hätte/wäre + Partizip II para expresar deseos y situaciones no realizadas en el pasado.",
    explicacion: `
      <h3 class="text-lg font-bold text-pink-400 mb-2">Konjunktiv II Vergangenheit (Condicional compuesto)</h3>
      <p class="mb-2">El Konjunktiv II en pasado expresa <strong>deseos no cumplidos</strong> o <strong>situaciones hipotéticas</strong> que no ocurrieron en el pasado.</p>
      <h4 class="font-bold text-pink-300 mt-2 mb-1">Estructura</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">hätte/wäre (KII) + Partizip II + ... + (Satzende)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Ich <strong>hätte</strong> kommen <strong>können</strong>, aber ich war krank. (Habría podido venir, pero estaba enfermo).</p>
      <h4 class="font-bold text-pink-300 mt-2 mb-1">Usos principales</h4>
      <ul class="list-disc pl-5 mb-2 space-y-1 text-sm">
        <li><strong>Deseos irreales en pasado:</strong> Ich hätte gern mitgemacht. (Me habría gustado participar).</li>
        <li><strong>Condicional imposible:</strong> Wenn ich das gewusst hätte, wäre ich gekommen. (Si lo hubiera sabido, habría venido).</li>
        <li><strong>Crítica constructiva:</strong> Du hättest früher kommen sollen. (Deberías haber venido antes).</li>
      </ul>
      <p class="text-yellow-300 text-xs">⚠️ Para verbos modales en KII pasado: <em>hätte + Infinitivo + Modal-Infinitiv</em>: Ich hätte kommen können.</p>
    `,
    ejemplos: [
      "Wenn ich mehr Geld gehabt hätte, wäre ich nach Japan gereist. (Si hubiera tenido más dinero, habría viajado a Japón)",
      "Ich hätte anrufen sollen, aber ich habe es vergessen. (Habría debido llamar, pero lo olvidé)",
      "Wärst du früher gekommen, hätten wir den Zug erwischt. (Si hubieras venido antes, habríamos cogido el tren)",
      "Er hätte die Prüfung bestehen können, wenn er gelernt hätte. (Él habría podido aprobar el examen si hubiera estudiado)",
      "Wir wären gern gekommen, aber wir hatten keine Zeit. (Nos habría gustado venir, pero no teníamos tiempo)"
    ],
    tips: [
      "La fórmula <em>hätte + Infinitiv + Modalverb</em> es muy común: 'hätte machen können / hätte sagen sollen'.",
      "<em>wäre</em> se usa con verbos de movimiento y cambio de estado (igual que Perfekt).",
      "<em>fast</em> + KII pasado = 'por poco': 'Ich hätte fast den Bus verpasst.'"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Transforma estas frases a Konjunktiv II Vergangenheit",
      datos: [
        { pista: "Ich habe keine Zeit → Wenn ich ___", respuesta: "Zeit gehabt hätte" },
        { pista: "Er kommt nicht → Er ___ (kommen) können", respuesta: "hätte kommen" },
        { pista: "Wir fahren nach Berlin → Wir ___ gern nach Berlin gefahren", respuesta: "wären" },
        { pista: "Sie ruft an → Sie ___ anrufen sollen", respuesta: "hätte" },
        { pista: "Du lernst mehr → Du ___ mehr lernen sollen", respuesta: "hättest" }
      ]
    },
    corrigeNovato: [
      { frase: "Wenn ich Zeit gehabe hätte, würde ich gekommen.", error: "gehabe", correccion: "Wenn ich Zeit gehabt hätte, wäre ich gekommen. (Partizip II: gehabt, no gehabe)." },
      { frase: "Ich wurde gern kommen, wenn ich Zeit hätte.", error: "wurde", correccion: "Ich wäre gern gekommen, wenn ich Zeit gehabt hätte. (wäre en pasado, no würde)." }
    ]
  },
  {
    id: "b1_1_passiv_perfekt",
    nivel: "B1.1",
    titulo: "Passiv Perfekt (Voz pasiva perfecta)",
    icono: "🔄",
    colorBorde: "border-teal-500",
    bg: "bg-teal-950/30",
    resumen: "La voz pasiva en Perfekt: sein + Partizip II + worden. Foco en acciones pasadas completadas.",
    explicacion: `
      <h3 class="text-lg font-bold text-teal-400 mb-2">Passiv Perfekt: Pasiva en tiempo perfecto</h3>
      <p class="mb-2">La pasiva en Perfekt se forma con <strong>sein + Partizip II + worden</strong>. Recuerda que NO se dice <em>geworden</em> sino <em>worden</em> (sin ge-) en este contexto.</p>
      <h4 class="font-bold text-teal-300 mt-2 mb-1">Estructura</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Subjekt + sein (Präsens) + Partizip II + worden + (von + Dativ)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Der Brief <strong>ist</strong> gestern <strong>geschrieben worden</strong>. (La carta fue escrita ayer).</p>
      <h4 class="font-bold text-teal-300 mt-2 mb-1">Comparación activa vs pasiva en Perfekt</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-teal-900/50"><th class="border p-1">Activa</th><th class="border p-1">Pasiva Perfekt</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Ich habe den Brief geschrieben.</td><td class="border p-1">Der Brief ist geschrieben worden.</td></tr>
        <tr><td class="border p-1">Sie hat das Haus gebaut.</td><td class="border p-1">Das Haus ist gebaut worden.</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ <strong>Worden, nicht geworden!</strong> En la pasiva de Perfekt y Plusquamperfekt, el Partizip II de werden se acorta a <em>worden</em>.</p>
    `,
    ejemplos: [
      "Der Brief ist gestern geschrieben worden. (La carta fue escrita ayer)",
      "Das Haus ist 2020 gebaut worden. (La casa fue construida en 2020)",
      "Die Fenster sind schon geputzt worden. (Las ventanas ya han sido limpiadas)",
      "Das Essen ist von der Mutter gekocht worden. (La comida fue cocinada por la madre)",
      "Die Prüfung ist korrigiert worden. (El examen ha sido corregido)"
    ],
    tips: [
      "Pasiva en Perfekt: usa <em>ist</em>, no <em>hat</em>. El auxiliar de la pasiva es <em>sein</em>.",
      "NUNCA digas 'geworden' en pasiva perfecta. Siempre 'worden'.",
      "La pasiva es más común en alemán que en español. Úsala naturalmente."
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Transforma de activa a pasiva en Perfekt",
      datos: [
        { pista: "Ich habe den Brief geschrieben. → Der Brief ___", respuesta: "ist geschrieben worden" },
        { pista: "Sie hat das Haus gebaut. → Das Haus ___", respuesta: "ist gebaut worden" },
        { pista: "Er hat das Fenster geöffnet. → Das Fenster ___", respuesta: "ist geöffnet worden" },
        { pista: "Der Lehrer hat die Prüfung korrigiert. → Die Prüfung ___", respuesta: "ist korrigiert worden" },
        { pista: "Man hat viel Deutsch gesprochen. → Viel Deutsch ___", respuesta: "ist gesprochen worden" }
      ]
    },
    corrigeNovato: [
      { frase: "Der Brief ist gestern geschrieben geworden.", error: "geworden", correccion: "Der Brief ist geschrieben worden. (Pasiva Perfekt usa 'worden', no 'geworden')." },
      { frase: "Der Brief hat gestern geschrieben worden.", error: "hat", correccion: "Der Brief ist gestern geschrieben worden. (Pasiva usa sein, no haben)." }
    ]
  },
  {
    id: "b1_1_subordinadas_obwohl_trotzdem",
    nivel: "B1.1",
    titulo: "Subordinadas con obwohl / trotzdem",
    icono: "🔀",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Oraciones concesivas: obwohl (aunque) con verbo al final, y trotzdem (a pesar de eso) como conector.",
    explicacion: `
      <h3 class="text-lg font-bold text-amber-400 mb-2">Subordinadas con obwohl y trotzdem</h3>
      <p class="mb-2">Expresan <strong>contraste</strong> o <strong>concesión</strong>. <em>Obwohl</em> introduce una subordinada (verbo al final), mientras que <em>trotzdem</em> funciona como conector (posición cero o primera).</p>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">obwohl (aunque)</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Hauptsatz + obwohl + Subjekt + ... + Verb (am Ende)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Ich gehe spazieren, <em>obwohl</em> es regnet. (Salgo a pasear aunque llueve).</p>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">trotzdem (a pesar de eso)</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Satz 1. Trotzdem + Verb (Position 2) + Subjekt...</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Es regnet. <em>Trotzdem</em> gehe ich spazieren. (Llueve. A pesar de eso salgo a pasear).</p>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">Diferencia clave</h4>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li><strong>obwohl</strong> → subordinada (verbo al final), conecta dos ideas en una oración.</li>
        <li><strong>trotzdem</strong> → conector adverbial (verbo en 2ª posición), conecta dos oraciones separadas.</li>
      </ul>
      <p class="text-yellow-300 text-xs">⚠️ <em>Obwohl</em> NUNCA lleva 'trotzdem' en la misma oración. Son estructuras alternativas.</p>
    `,
    ejemplos: [
      "Ich gehe zur Arbeit, obwohl ich krank bin. (Voy al trabajo aunque estoy enfermo)",
      "Obwohl es teuer ist, kaufe ich das Auto. (Aunque es caro, compro el coche)",
      "Es regnet. Trotzdem gehen wir spazieren. (Llueve. A pesar de eso paseamos)",
      "Obwohl sie wenig Zeit hat, hilft sie mir. (Aunque tiene poco tiempo, me ayuda)",
      "Er hat wenig Geld. Trotzdem reist er gern. (Tiene poco dinero. A pesar de eso viaja mucho)"
    ],
    tips: [
      "<em>obwohl</em> = 'aunque' + subjuntivo en español, pero en alemán va siempre en indicativo.",
      "<em>trotzdem</em> ocupa la primera posición (como el español 'sin embargo').",
      "También existe <em>obgleich</em> (formal) y <em>obschon</em> (literario), pero obwohl es la forma más común."
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Selecciona obwohl o trotzdem según corresponda",
      datos: [
        { pista: "Ich gehe zur Arbeit, ___ ich krank bin.", opciones: ["obwohl", "trotzdem", "weil", "denn"], respuesta: "obwohl" },
        { pista: "Es regnet. ___ gehen wir spazieren.", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], respuesta: "Trotzdem" },
        { pista: "___ es teuer ist, kaufe ich es.", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], respuesta: "Obwohl" },
        { pista: "Sie ist müde. ___ macht sie Sport.", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], respuesta: "Trotzdem" },
        { pista: "___ ich kein Geld habe, bin ich glücklich.", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], respuesta: "Obwohl" }
      ]
    },
    corrigeNovato: [
      { frase: "Obwohl es regnet, trotzdem gehe ich spazieren.", error: "trotzdem", correccion: "Obwohl es regnet, gehe ich spazieren. O bien: 'Es regnet. Trotzdem gehe ich spazieren.' No mezclar ambas." },
      { frase: "Trotzdem ich krank bin, gehe ich zur Arbeit.", error: "Trotzdem + subordinada", correccion: "Obwohl ich krank bin, gehe ich zur Arbeit. (trotzdem no es conjunción subordinante)." },
      { frase: "Ich gehe aus obwohl ich bin müde.", error: "ich bin müde", correccion: "Ich gehe aus, obwohl ich müde bin. (Verbo al final con obwohl)." }
    ]
  },
  {
    id: "b1_1_adjektive_ohne_artikel",
    nivel: "B1.1",
    titulo: "Adjektive ohne Artikel (Adjetivos sin artículo)",
    icono: "🏷️",
    colorBorde: "border-rose-500",
    bg: "bg-rose-950/30",
    resumen: "Adjetivos fuertes: cuando no hay artículo, el adjetivo toma las terminaciones del artículo definido.",
    explicacion: `
      <h3 class="text-lg font-bold text-rose-400 mb-2">Adjektive ohne Artikel (Declinación fuerte)</h3>
      <p class="mb-2">Cuando un adjetivo va <strong>sin artículo</strong> (o sin determinante), toma las terminaciones del <strong>artículo definido</strong> (der/die/das). Esto se llama <strong>declinación fuerte</strong>.</p>
      <h4 class="font-bold text-rose-300 mt-2 mb-1">Terminaciones sin artículo</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-rose-900/50"><th class="border p-1">Caso</th><th class="border p-1">Masculino</th><th class="border p-1">Femenino</th><th class="border p-1">Neutro</th><th class="border p-1">Plural</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Nominativ</td><td class="border p-1">-er</td><td class="border p-1">-e</td><td class="border p-1">-es</td><td class="border p-1">-e</td></tr>
        <tr><td class="border p-1">Akkusativ</td><td class="border p-1">-en</td><td class="border p-1">-e</td><td class="border p-1">-es</td><td class="border p-1">-e</td></tr>
        <tr><td class="border p-1">Dativ</td><td class="border p-1">-em</td><td class="border p-1">-er</td><td class="border p-1">-em</td><td class="border p-1">-en</td></tr>
        <tr><td class="border p-1">Genitiv</td><td class="border p-1">-en</td><td class="border p-1">-er</td><td class="border p-1">-en</td><td class="border p-1">-er</td></tr>
        </tbody>
      </table>
      <p class="mb-2"><strong>Ejemplos:</strong></p>
      <ul class="list-disc pl-5 text-sm">
        <li><em>Gut<strong>er</strong> Wein</em> ist teuer. (Nominativ masculino)</li>
        <li>Ich trinke gut<strong>en</strong> Kaffee. (Akkusativ masculino)</li>
        <li>Mit frisch<strong>em</strong> Brot schmeckt es besser. (Dativ neutro)</li>
      </ul>
      <p class="text-yellow-300 text-xs">⚠️ Esta declinación también se usa después de números cardinales (zwei, drei...) y palabras como <em>etwas, mehr, genug, wenig</em>.</p>
    `,
    ejemplos: [
      "Guter Kaffee ist teuer. (El café bueno es caro)",
      "Ich trinke heißen Tee. (Bebo té caliente)",
      "Mit frischem Brot schmeckt es am besten. (Con pan fresco sabe mejor)",
      "Kalter Regen ist unangenehm. (La lluvia fría es desagradable)",
      "Sie trägt rote Schuhe. (Ella lleva zapatos rojos)"
    ],
    tips: [
      "Sin artículo → terminaciones fuertes (como der/die/das). Con artículo definido → terminaciones débiles (-e, -en).",
      "Después de <em>zwei, drei, viele, einige</em> también usamos declinación fuerte en plural.",
      "Pista visual: si NO ves artículo, el adjetivo 'hace de artículo' con terminaciones -er/-e/-es/-em/-en."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la terminación correcta del adjetivo (sin artículo)",
      datos: [
        { pista: "Gut___ Wein ist teuer. (er)", respuesta: "er" },
        { pista: "Ich trinke kalt___ Bier. (es)", respuesta: "es" },
        { pista: "Mit frisch___ Brot schmeckt es besser. (em)", respuesta: "em" },
        { pista: "Sie trägt rot___ Schuhe. (e)", respuesta: "e" },
        { pista: "Ich sehe schön___ Frauen. (e)", respuesta: "e" }
      ]
    },
    corrigeNovato: [
      { frase: "Guter Wein ist teuer. → correcto", error: "ninguno", correccion: "¡Correcto! Pero asegúrate: Guter Wein (nominativo, masculino, fuerte → -er)." },
      { frase: "Ich trinke kalten Bier.", error: "kalten", correccion: "Ich trinke kaltes Bier. (Bier es neutro, Akkusativ → -es)." },
      { frase: "Mit frischen Brot schmeckt es besser.", error: "frischen", correccion: "Mit frischem Brot. (Brot es neutro, Dativ → -em)." }
    ]
  },
  {
    id: "b1_1_satzklammer_erweitert",
    nivel: "B1.1",
    titulo: "Satzklammer erweitert (Marco oracional avanzado)",
    icono: "📐",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "El marco oracional alemán con múltiples verbos y elementos al final: Infinitiv + Modal, doble infinitivo, etc.",
    explicacion: `
      <h3 class="text-lg font-bold text-lime-400 mb-2">Satzklammer: El marco oracional avanzado</h3>
      <p class="mb-2">El alemán tiene una estructura de <strong>marco</strong> (Satzklammer): el verbo conjugado va en posición 2 (o 1), y el resto de elementos verbales van al final.</p>
      <h4 class="font-bold text-lime-300 mt-2 mb-1">Tipos de marco avanzado</h4>
      <ul class="list-disc pl-5 mb-2 space-y-1 text-sm">
        <li><strong>Modal + Infinitiv:</strong> Ich <span class="text-cyan-300">kann</span> heute nicht kommen<span class="text-cyan-300">.</span> (Modalverben)</li>
        <li><strong>Perfekt + Modal:</strong> Ich <span class="text-cyan-300">habe</span> nicht kommen <span class="text-cyan-300">können</span>. (Doble infinitivo)</li>
        <li><strong>Futur + Infinitiv:</strong> Ich <span class="text-cyan-300">werde</span> morgen kommen<span class="text-cyan-300">.</span></li>
        <li><strong>Verbzusatz (trennbar):</strong> Ich <span class="text-cyan-300">rufe</span> dich später <span class="text-cyan-300">an</span>.</li>
        <li><strong>Konjunktiv II + Modal:</strong> Ich <span class="text-cyan-300">hätte</span> kommen <span class="text-cyan-300">können</span>.</li>
      </ul>
      <h4 class="font-bold text-lime-300 mt-2 mb-1">Doble infinitivo (Ersatzinfinitiv)</h4>
      <p class="mb-2">Cuando un modal aparece en Perfekt con otro infinitivo, el modal también se queda en infinitivo (no forma Partizip II):</p>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Ich habe nicht kommen können. (NO: gekonnt)</pre>
      <p class="text-yellow-300 text-xs">⚠️ El <em>Ersatzinfinitiv</em> solo ocurre con verbos modales y algunos como <em>lassen, sehen, hören</em>.</p>
    `,
    ejemplos: [
      "Ich habe gestern nicht kommen können. (No pude venir ayer - Perfekt + modal)",
      "Sie wird morgen anrufen müssen. (Ella tendrá que llamar mañana - Futur + modal)",
      "Er hat sie kommen sehen. (Él la vio venir - Perfekt + sehen + Infinitiv)",
      "Wir hätten früher gehen sollen. (Deberíamos haber ido antes - KII + modal)",
      "Kannst du mir bitte helfen? (¿Puedes ayudarme por favor? - Modal simple)"
    ],
    tips: [
      "En Perfekt con modal: <em>haben</em> conjugado + ... + Infinitiv(1) + Infinitiv(2). El modal SIEMPRE al final.",
      "Los verbos <em>lassen, sehen, hören, helfen, lernen</em> también siguen este patrón con infinitivo.",
      "La 'Satzklammer' es la esencia de la sintaxis alemana. Practica con frases largas."
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Completa con el orden correcto (Satzklammer)",
      datos: [
        { pista: "Ich (können) nicht (kommen) gestern. → Ich ___", respuesta: "habe gestern nicht kommen können" },
        { pista: "Er (werden) morgen (anrufen). → Er ___", respuesta: "wird morgen anrufen" },
        { pista: "Wir (sollen) früher (gehen) → Wir ___", respuesta: "hätten früher gehen sollen" },
        { pista: "Sie (müssen) das Buch (lesen) → Sie ___", respuesta: "hat das Buch lesen müssen" },
        { pista: "Ich (können) ihm (helfen) → Ich ___", respuesta: "habe ihm helfen können" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich habe nicht gekonnt kommen.", error: "gekonnt", correccion: "Ich habe nicht kommen können. (Modal en infinitivo, no Partizip II)." },
      { frase: "Ich kann nicht gekommen.", error: "gekommen", correccion: "Ich kann nicht kommen. (Con modal se usa infinitivo, no Partizip II)." }
    ]
  }
];