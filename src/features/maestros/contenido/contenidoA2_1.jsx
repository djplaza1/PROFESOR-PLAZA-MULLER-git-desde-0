// src/features/maestros/contenido/contenidoA2_1.jsx
// Contenido gramatical nivel A2.1 - Básico intermedio
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Maestros.A2_1 = [
  {
    id: "a2_1_wechselpraepositionen",
    nivel: "A2.1",
    titulo: "Wechselpräpositionen (Preposiciones de cambio)",
    icono: "🔄",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Preposiciones que rigen acusativo (movimiento) o dativo (posición).",
    explicacion: `<p>Las <strong>Wechselpräpositionen</strong> (preposiciones de cambio) pueden regir <strong>acusativo</strong> o <strong>dativo</strong> según el contexto.</p>
      <p class="mt-2"><strong>Regla clave:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Acusativo</strong> (Wohin? = ¿Adónde?) → <em>movimiento/dirección</em></li>
        <li><strong>Dativo</strong> (Wo? = ¿Dónde?) → <em>posición/ubicación</em></li>
      </ul>
      <p class="mt-2">Preposiciones: <strong>in, auf, unter, über, neben, zwischen, vor, hinter, an, bei</strong></p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left">Preposición</th><th class="text-left">Acus. (Wohin?)</th><th class="text-left">Dat. (Wo?)</th></tr>
        <tr><td>in</td><td>Ich gehe <strong>in den</strong> Park.</td><td>Ich bin <strong>im</strong> Park.</td></tr>
        <tr><td>auf</td><td>Lege das Buch <strong>auf den</strong> Tisch.</td><td>Das Buch liegt <strong>auf dem</strong> Tisch.</td></tr>
        <tr><td>unter</td><td>Die Katze geht <strong>unter den</strong> Tisch.</td><td>Die Katze ist <strong>unter dem</strong> Tisch.</td></tr>
      </table>
      <p class="mt-2"><strong>Contracciones:</strong> in + dem = im, in + das = ins, an + dem = am, auf + das = aufs</p>`,
    ejemplos: [
      "Ich stelle die Vase <strong>auf den</strong> Tisch. (Pongo el jarrón sobre la mesa - movimiento)",
      "Die Vase steht <strong>auf dem</strong> Tisch. (El jarrón está sobre la mesa - posición)",
      "Er geht <strong>in die</strong> Schule. (Él va a la escuela - movimiento)",
      "Er ist <strong>in der</strong> Schule. (Él está en la escuela - posición)",
      "Das Bild hängt <strong>an der</strong> Wand. (El cuadro cuelga en la pared - posición)"
    ],
    tips: [
      "💡 Pregunta Wohin? = acusativo (movimiento). Pregunta Wo? = dativo (posición)",
      "💡 Verbos de colocación (stellen/legen/setzen) van con acusativo; verbos de estado (stehen/liegen/sitzen) con dativo",
      "💡 Las contracciones im/am/ins son obligatorias en alemán cotidiano"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la preposición y artículo correctos (acusativo o dativo)",
      datos: [
        { pista: "Ich gehe ___ (in + der) Park.", respuesta: "in den" },
        { pista: "Das Buch liegt ___ (auf + der) Tisch.", respuesta: "auf dem" },
        { pista: "Er stellt das Glas ___ (auf + das) Regal.", respuesta: "aufs" },
        { pista: "Wir sind ___ (in + das) Kino.", respuesta: "im" },
        { pista: "Die Katze sitzt ___ (unter + der) Stuhl.", respuesta: "unter dem" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich gehe im Park.", error: "im", correccion: "Ich gehe in den Park (movimiento → acusativo)." },
      { frase: "Das Buch liegt auf den Tisch.", error: "den", correccion: "...liegt auf dem Tisch (posición → dativo)." },
      { frase: "Wir sind ins Kino.", error: "", correccion: "¡Correcto! ins = in + das (posición)." }
    ]
  },
  {
    id: "a2_1_dativ",
    nivel: "A2.1",
    titulo: "Dativo (Dativ)",
    icono: "🎁",
    colorBorde: "border-emerald-500",
    bg: "bg-emerald-950/30",
    resumen: "El caso dativo para el objeto indirecto: a quién le das algo.",
    explicacion: `<p>El <strong>dativo</strong> es el caso del <strong>objeto indirecto</strong> — la persona que recibe el beneficio o daño de la acción.</p>
      <p class="mt-2">Artículos en dativo:</p>
      <table class="w-full text-sm mt-2">
        <tr><th></th><th>Masculino</th><th>Femenino</th><th>Neutro</th><th>Plural</th></tr>
        <tr><td>Nominativo</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
        <tr><td>Dativo</td><td><strong>dem</strong></td><td><strong>der</strong></td><td><strong>dem</strong></td><td><strong>den</strong> + -n</td></tr>
      </table>
      <p class="mt-2">Cambios clave:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>der → <strong>dem</strong> (masc.), das → <strong>dem</strong> (neut.)</li>
        <li>die → <strong>der</strong> (fem.), die (pl.) → <strong>den</strong> + sustantivo termina en <strong>-n</strong></li>
        <li>ein (masc./neut.) → <strong>einem</strong>, eine (fem.) → <strong>einer</strong></li>
      </ul>
      <p class="mt-2">Verbos comunes con dativo: <strong>helfen, danken, gefallen, gehören, antworten, glauben, schmecken</strong></p>
      <p class="mt-1">Pronombres dativo: mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen</p>`,
    ejemplos: [
      "Ich gebe <strong>dem</strong> Mann <strong>den</strong> Schlüssel. (Doy al hombre la llave - dativo + acusativo)",
      "Sie hilft <strong>der</strong> Frau. (Ella ayuda a la mujer - dativo por helfen)",
      "Das Buch gehört <strong>dem</strong> Kind. (El libro pertenece al niño)",
      "Ich danke <strong>Ihnen</strong> sehr. (Le agradezco mucho - dativo formal)",
      "Die Tasche gefällt <strong>mir</strong>. (La bolsa me gusta - dativo con gefallen)"
    ],
    tips: [
      "💡 Pregunta: <strong>Wem?</strong> (¿A quién?) → dativo. Wen? → acusativo",
      "💡 En plural, dativo = den + sustantivo con -n: den Kindern, den Frauen",
      "💡 Verbos que solo rigen dativo (sin acusativo): helfen, danken, folgen, glauben"
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Elige la forma correcta del dativo",
      datos: [
        { pista: "Ich gebe es ___ (der) Kind.", opciones: ["das", "dem", "den", "der"], respuesta: "dem" },
        { pista: "Wir danken ___ (die) Lehrerin.", opciones: ["die", "der", "dem", "den"], respuesta: "der" },
        { pista: "Es gehört ___ (ein) Mann.", opciones: ["ein", "einen", "einem", "einer"], respuesta: "einem" },
        { pista: "Sie hilft ___ (die) Kinder(n).", opciones: ["die", "der", "den", "dem"], respuesta: "den" },
        { pista: "Das gefällt ___ (ich).", opciones: ["mich", "mir", "ich", "mein"], respuesta: "mir" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich helfe den Mann.", error: "den", correccion: "Ich helfe dem Mann (helfen rige dativo → der → dem)." },
      { frase: "Das Buch gehört der Kind.", error: "der", correccion: "Das Buch gehört dem Kind (neutro → dem)." },
      { frase: "Die Tasche gefällt mich.", error: "mich", correccion: "...gefällt mir (gefällen rige dativo → mir)." }
    ]
  },
  {
    id: "a2_1_reflexiv",
    nivel: "A2.1",
    titulo: "Verbos reflexivos",
    icono: "🔄",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "Verbos que usan mich/dich/sich: sich waschen, sich freuen...",
    explicacion: `<p>Los <strong>verbos reflexivos</strong> indican que la acción recae sobre el sujeto. Usan pronombres reflexivos.</p>
      <p class="mt-2">Pronombres reflexivos en acusativo:</p>
      <table class="w-full text-sm">
        <tr><th>ich</th><th>du</th><th>er/sie/es</th><th>wir</th><th>ihr</th><th>sie/Sie</th></tr>
        <tr><td>mich</td><td>dich</td><td><strong>sich</strong></td><td>uns</td><td>euch</td><td><strong>sich</strong></td></tr>
      </table>
      <p class="mt-2">Verbos reflexivos comunes:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>sich waschen</strong> (lavarse): Ich wasche mich</li>
        <li><strong>sich freuen</strong> (alegrarse): Wir freuen uns</li>
        <li><strong>sich setzen</strong> (sentarse): Setz dich!</li>
        <li><strong>sich anziehen</strong> (vestirse): Sie zieht sich an</li>
        <li><strong>sich erinnern</strong> (recordar): Erinnern Sie sich?</li>
      </ul>
      <p class="mt-2">Algunos verbos cambian de significado con reflexivo: <em>sich setzen</em> (sentarse) vs <em>setzen</em> (colocar).</p>`,
    ejemplos: [
      "Ich wasche <strong>mich</strong> jeden Morgen. (Me lavo cada mañana)",
      "Er freut <strong>sich</strong> auf den Urlaub. (Él se alegra de las vacaciones)",
      "Setz <strong>dich</strong> bitte! (¡Siéntate por favor!)",
      "Wir erinnern <strong>uns</strong> an den Urlaub. (Recordamos las vacaciones)",
      "Sie zieht <strong>sich</strong> warm an. (Ella se viste abrigado)"
    ],
    tips: [
      "💡 'sich' se usa para 3ª persona singular y plural, y para 'Sie' formal",
      "💡 La mayoría de verbos reflexivos en alemán también lo son en español, ¡pero no todos!",
      "💡 Pregunta clave: ¿la acción vuelve al sujeto? → reflexivo"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el pronombre reflexivo correcto (mich/dich/sich/uns/euch)",
      datos: [
        { pista: "Ich wasche ___.", respuesta: "mich" },
        { pista: "Du freust ___ auf den Film.", respuesta: "dich" },
        { pista: "Er setzt ___ auf den Stuhl.", respuesta: "sich" },
        { pista: "Wir erinnern ___ an die Reise.", respuesta: "uns" },
        { pista: "Setzt ___ Kinder!", respuesta: "euch" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich wasche sich.", error: "sich", correccion: "Ich wasche mich (1ª persona → mich, no sich)." },
      { frase: "Er freut ihn.", error: "ihn", correccion: "Er freut sich (reflexivo 3ª pers. → sich)." },
      { frase: "Wir setzen uns.", error: "", correccion: "¡Correcto! uns para 1ª persona plural." }
    ]
  },
  {
    id: "a2_1_prateritum",
    nivel: "A2.1",
    titulo: "Präteritum de sein, haben y modales",
    icono: "📖",
    colorBorde: "border-sky-500",
    bg: "bg-sky-950/30",
    resumen: "Pasado narrativo de los verbos auxiliares y modales.",
    explicacion: `<p>El <strong>Präteritum</strong> (pretérito imperfecto) se usa en alemán escrito (noticias, cuentos, informes) y con verbos modales/auxiliares incluso en lenguaje hablado.</p>
      <p class="mt-2"><strong>Sein:</strong> ich war, du warst, er war, wir waren, ihr wart, sie waren</p>
      <p class="mt-2"><strong>Haben:</strong> ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten</p>
      <p class="mt-2"><strong>Verbos modales en Präteritum:</strong> (añaden -te- + terminaciones)</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>können → konnte, konntest, konnte, konnten, konntet, konnten</li>
        <li>müssen → musste, musstest, musste, mussten, musstet, mussten</li>
        <li>dürfen → durfte, durftest, durfte, durften, durftet, durften</li>
        <li>sollen → sollte, solltest, sollte, sollten, solltet, sollten</li>
        <li>wollen → wollte, wolltest, wollte, wollten, wolltet, wollten</li>
      </ul>
      <p class="mt-2"><strong>Werden:</strong> wurde, wurdest, wurde, wurden, wurdet, wurden (→ después Konjunktiv II: würde)</p>`,
    ejemplos: [
      "Ich <strong>war</strong> gestern im Kino. (Ayer estuve en el cine)",
      "Er <strong>hatte</strong> keine Zeit. (Él no tenía tiempo)",
      "Wir <strong>wollten</strong> nach Berlin fahren. (Queríamos viajar a Berlín)",
      "Sie <strong>musste</strong> lernen. (Ella tenía que estudiar)",
      "Es <strong>war</strong> einmal ein König... (Érase una vez un rey...)"
    ],
    tips: [
      "💡 En alemán hablado, solo sein/haben/modales van en Präteritum. El resto en Perfekt",
      "💡 'es war einmal' = fórmula clásica de cuentos infantiles",
      "💡 'wurde' (Präteritum de werden) no es lo mismo que 'würde' (Konjunktiv II)"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Conjuga en Präteritum",
      datos: [
        { pista: "Ich ___ (sein) müde.", respuesta: "war" },
        { pista: "Du ___ (haben) recht.", respuesta: "hattest" },
        { pista: "Er ___ (können) nicht kommen.", respuesta: "konnte" },
        { pista: "Wir ___ (müssen) arbeiten.", respuesta: "mussten" },
        { pista: "Sie ___ (werden) krank.", respuesta: "wurde" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich hatte gelernt.", error: "", correccion: "¡Correcto! haben en Präteritum + Partizip II = Plusquamperfekt." },
      { frase: "Er war krank gestern.", error: "", correccion: "¡Bien! sein en Präteritum para estados pasados." },
      { frase: "Sie wollte nicht essen.", error: "", correccion: "Perfecto: modal en Präteritum + infinitivo al final." }
    ]
  },
  {
    id: "a2_1_komparativ",
    nivel: "A2.1",
    titulo: "Comparativo y superlativo",
    icono: "📊",
    colorBorde: "border-teal-500",
    bg: "bg-teal-950/30",
    resumen: "Comparar adjetivos: groß - größer - am größten.",
    explicacion: `<p>Los adjetivos en alemán tienen <strong>tres grados</strong>:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Positivo:</strong> groß (grande), schnell (rápido)</li>
        <li><strong>Comparativo:</strong> größer (más grande), schneller (más rápido)</li>
        <li><strong>Superlativo:</strong> am größten (el más grande), am schnellsten (el más rápido)</li>
      </ul>
      <p class="mt-2"><strong>Formación:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Comparativo: adjetivo + <strong>-er</strong> + als: <em>größer als</em> (más grande que)</li>
        <li>Superlativo: am + adjetivo + <strong>-(e)sten</strong>: <em>am größten</em></li>
      </ul>
      <p class="mt-2"><strong>Umlaut en comparativo:</strong> muchos adjetivos monosílabos añaden Umlaut: <em>alt → älter, jung → jünger, groß → größer, warm → wärmer, kalt → kälter, stark → stärker</em></p>
      <p class="mt-2"><strong>Irregulares:</strong></p>
      <ul class="list-disc pl-5">
        <li>gut → besser → am besten</li>
        <li>viel → mehr → am meisten</li>
        <li>gern → lieber → am liebsten</li>
        <li>hoch → höher → am höchsten</li>
        <li>nah → näher → am nächsten</li>
      </ul>`,
    ejemplos: [
      "Berlin ist <strong>größer als</strong> Hamburg. (Berlín es más grande que Hamburgo)",
      "Mein Auto ist <strong>schneller</strong>. (Mi coche es más rápido)",
      "Er läuft <strong>am schnellsten</strong>. (Él corre más rápido de todos)",
      "Ich mag Pizza <strong>lieber als</strong> Pasta. (Prefiero pizza a pasta)",
      "Das war <strong>der beste</strong> Urlaub. (Fueron las mejores vacaciones)"
    ],
    tips: [
      "💡 'als' = que (comparativo). 'wie' = como (igualdad): 'so groß wie' (tan grande como)",
      "💡 Adjetivos con Umlaut son muy comunes en comparativo: practica alt/ält/am ältesten",
      "💡 Para 'me gusta más': 'Ich mag lieber' o 'am liebsten mag ich'"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Escribe la forma comparativa o superlativa",
      datos: [
        { pista: "Berlin ist ___ (groß) als Hamburg.", respuesta: "größer" },
        { pista: "Er läuft ___ (schnell) von allen.", respuesta: "am schnellsten" },
        { pista: "Deutsch ist ___ (schwer) als Englisch.", respuesta: "schwerer" },
        { pista: "Das ist der ___ (gut) Kuchen.", respuesta: "beste" },
        { pista: "Sie ist ___ (jung) als ich.", respuesta: "jünger" }
      ]
    },
    corrigeNovato: [
      { frase: "Berlin ist großer als Hamburg.", error: "großer", correccion: "Berlin ist größer (Umlaut en o → ö: groß → größer)." },
      { frase: "Er ist am schnellste.", error: "schnellste", correccion: "Er ist am schnellsten (superlativo necesita -sten)." },
      { frase: "Das ist besser als das.", error: "", correccion: "¡Correcto! besser es el comparativo irregular de gut." }
    ]
  },
  {
    id: "a2_1_subordinadas",
    nivel: "A2.1",
    titulo: "Oraciones subordinadas (dass, weil, obwohl)",
    icono: "🔗",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Conectores que envían el verbo al final: dass, weil, wenn...",
    explicacion: `<p>En las <strong>oraciones subordinadas</strong>, el verbo conjugado va al <strong>final</strong> de la oración.</p>
      <p class="mt-2">Conectores principales:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>dass</strong> (que): Ich weiß, <em>dass er kommt</em>.</li>
        <li><strong>weil</strong> (porque): Er kommt nicht, <em>weil er krank ist</em>.</li>
        <li><strong>wenn</strong> (si/cuando): <em>Wenn ich Zeit habe</em>, gehe ich spazieren.</li>
        <li><strong>obwohl</strong> (aunque): <em>Obwohl es regnet</em>, gehe ich raus.</li>
        <li><strong>ob</strong> (si interrogativa): Ich frage mich, <em>ob er kommt</em>.</li>
      </ul>
      <p class="mt-2"><strong>Estructura:</strong> [Oración principal] + Konjunktion + [Sujeto + ... + Verbo al final]</p>
      <p class="mt-1">Con <strong>weil</strong> en lenguaje hablado, a veces se usa orden principal (verbo en 2ª posición), pero es incorrecto en escritura formal.</p>
      <p class="mt-2"><strong>Wenn</strong> al inicio de la oración invierte el orden de la oración principal: <em>Wenn du kommst, freue ich mich</em>.</p>`,
    ejemplos: [
      "Ich weiß, <strong>dass</strong> er morgen kommt. (Sé que él viene mañana)",
      "Er bleibt zu Hause, <strong>weil</strong> er krank ist. (Él se queda en casa porque está enfermo)",
      "<strong>Wenn</strong> ich Zeit habe, lerne ich Deutsch. (Cuando tengo tiempo, estudio alemán)",
      "<strong>Obwohl</strong> es teuer ist, kaufe ich das Buch. (Aunque es caro, compro el libro)",
      "Ich frage mich, <strong>ob</strong> sie kommt. (Me pregunto si ella viene)"
    ],
    tips: [
      "💡 El verbo siempre al final en subordinadas. Practica con 'weil' que es el más usado",
      "💡 Wenn + inicio de frase inversión: wenn am Anfang = verbo en 2ª en oración principal",
      "💡 'ob' es para preguntas indirectas (si). 'wenn' es condicional/temporal"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Completa colocando el verbo al final",
      datos: [
        { pista: "Ich weiß, dass er (kommt) ___.", respuesta: "kommt" },
        { pista: "Er bleibt zu Hause, weil er (ist) krank ___.", respuesta: "ist" },
        { pista: "Wenn ich Zeit (habe) ___, lerne ich.", respuesta: "habe" },
        { pista: "Obwohl es (regnet) ___, gehen wir raus.", respuesta: "regnet" },
        { pista: "Ich frage mich, ob sie (kommt) ___.", respuesta: "kommt" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich weiß dass er kommt.", error: "", correccion: "¡Correcto! kommt al final de la subordinada con dass." },
      { frase: "Weil er ist krank, bleibt er zu Hause.", error: "ist krank", correccion: "Weil er krank ist (verbo al final en subordinada con weil)." },
      { frase: "Obwohl es regnet, gehen wir raus.", error: "", correccion: "¡Perfecto! regnet al final de la subordinada." }
    ]
  }
];