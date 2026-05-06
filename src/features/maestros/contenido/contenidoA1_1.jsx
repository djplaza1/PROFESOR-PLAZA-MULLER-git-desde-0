// src/features/maestros/contenido/contenidoA1_1.jsx
// Contenido gramatical nivel A1.1 - Principiante absoluto
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Maestros.A1_1 = [
  {
    id: "a1_1_artikel",
    nivel: "A1.1",
    titulo: "Artículos (der, die, das)",
    icono: "📘",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Aprende a identificar el género de los sustantivos y usar los artículos definidos correctamente.",
    explicacion: `
      <p>En alemán cada sustantivo tiene un <strong>género gramatical</strong>: masculino, femenino o neutro. Los artículos definidos son <strong>der</strong> (masculino), <strong>die</strong> (femenino) y <strong>das</strong> (neutro).</p>
      <ul class="list-disc pl-5 space-y-1 mt-2">
        <li><strong>der</strong> Mann (el hombre) — masculino</li>
        <li><strong>die</strong> Frau (la mujer) — femenino</li>
        <li><strong>das</strong> Kind (el niño) — neutro</li>
      </ul>
      <p class="mt-2">Reglas para reconocer el género:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Terminaciones <strong>-ung, -heit, -keit, -schaft, -ei</strong> → <strong>die</strong></li>
        <li>Terminaciones <strong>-chen, -lein</strong> → <strong>das</strong></li>
        <li>Terminaciones <strong>-er, -el, -en, -ig, -ling</strong> → <strong>der</strong></li>
      </ul>
      <p class="mt-2">¡Importante! El género no siempre es lógico. Aprende cada sustantivo con su artículo desde el principio.</p>
    `,
    ejemplos: [
      "der Tisch (la mesa) - masculino",
      "die Lampe (la lámpara) - femenino",
      "das Buch (el libro) - neutro",
      "die Freiheit (la libertad) - femenino por -heit",
      "das Mädchen (la chica) - neutro por -chen"
    ],
    tips: [
      "💡 Aprende siempre el sustantivo con su artículo: no solo 'Tisch', sino 'der Tisch'",
      "💡 Los colores como nombres son neutros: das Blau, das Rot",
      "💡 Las estaciones son masculinas: der Frühling, der Sommer"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con der, die o das según el género del sustantivo",
      datos: [
        { pista: "___ Tisch", respuesta: "der" },
        { pista: "___ Lampe", respuesta: "die" },
        { pista: "___ Buch", respuesta: "das" },
        { pista: "___ Fenster", respuesta: "das" },
        { pista: "___ Freund", respuesta: "der" }
      ]
    },
    corrigeNovato: [
      { frase: "Der Katze ist süß.", error: "Der", correccion: "Die Katze... (Katze es femenino)" },
      { frase: "Das Mann ist groß.", error: "Das", correccion: "Der Mann... (Mann es masculino)" },
      { frase: "Die Kind spielt.", error: "Die", correccion: "Das Kind... (Kind es neutro)" }
    ]
  },
  {
    id: "a1_1_praesens",
    nivel: "A1.1",
    titulo: "Presente verbos regulares",
    icono: "📗",
    colorBorde: "border-emerald-500",
    bg: "bg-emerald-950/30",
    resumen: "Conjugación de verbos regulares en presente: machen, spielen, lernen...",
    explicacion: `
      <p>Los <strong>verbos regulares</strong> en presente siguen un patrón fijo. Se toma la raíz (infinitivo sin -en) y se añaden las terminaciones:</p>
      <table class="w-full text-sm mt-2 border-collapse">
        <tr><th class="text-left text-indigo-300">Pronombre</th><th class="text-left text-indigo-300">Terminación</th><th class="text-left text-indigo-300">Ejemplo (machen)</th></tr>
        <tr><td>ich</td><td><strong>-e</strong></td><td>ich mach<strong>e</strong></td></tr>
        <tr><td>du</td><td><strong>-st</strong></td><td>du mach<strong>st</strong></td></tr>
        <tr><td>er/sie/es</td><td><strong>-t</strong></td><td>er mach<strong>t</strong></td></tr>
        <tr><td>wir</td><td><strong>-en</strong></td><td>wir mach<strong>en</strong></td></tr>
        <tr><td>ihr</td><td><strong>-t</strong></td><td>ihr mach<strong>t</strong></td></tr>
        <tr><td>sie/Sie</td><td><strong>-en</strong></td><td>sie mach<strong>en</strong></td></tr>
      </table>
      <p class="mt-2">Los verbos cuya raíz termina en <strong>-t, -d, -chn, -ffn</strong> añaden una <strong>-e-</strong> antes de la terminación en du/er/ihr: du arbeit<strong>e</strong>st, er find<strong>e</strong>t.</p>
    `,
    ejemplos: [
      "ich lerne Deutsch (aprendo alemán)",
      "du spielst Fußball (juegas fútbol)",
      "er arbeitet in Berlin (él trabaja en Berlín)",
      "wir kochen zusammen (cocinamos juntos)",
      "ihr tanzt gut (bailáis bien)"
    ],
    tips: [
      "💡 Practica en voz alta: ich -e, du -st, er -t... ¡como una canción!",
      "💡 Los verbos 'basteln', 'segeln', 'schütteln' pierden la -e- antes de -st: du bastelst",
      "💡 Atención a arbeit-en → du arbeitest (con -e- extra)"
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Elige la forma correcta del verbo para cada pronombre",
      datos: [
        { pista: "ich (lernen)", opciones: ["lerne", "lernst", "lernt", "lernen"], respuesta: "lerne" },
        { pista: "du (spielen)", opciones: ["spiele", "spielst", "spielt", "spielen"], respuesta: "spielst" },
        { pista: "er (arbeiten)", opciones: ["arbeite", "arbeitest", "arbeitet", "arbeiten"], respuesta: "arbeitet" },
        { pista: "wir (kochen)", opciones: ["koche", "kochst", "kocht", "kochen"], respuesta: "kochen" },
        { pista: "ihr (singen)", opciones: ["singe", "singst", "singt", "singen"], respuesta: "singt" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich arbeitst in München.", error: "arbeitst", correccion: "ich arbeite (raíz arbeit- + e)" },
      { frase: "Du machst das gut.", error: "machst", correccion: "Está bien, pero ojo: verbos en -t necesitan -e-: du arbeitest" },
      { frase: "Er spielen Klavier.", error: "spielen", correccion: "Er spielt (3ª persona singular termina en -t)" }
    ]
  },
  {
    id: "a1_1_pronombres_nom",
    nivel: "A1.1",
    titulo: "Pronombres personales (Nominativo)",
    icono: "📕",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "ich, du, er, sie, es, wir, ihr, sie, Sie en caso nominativo.",
    explicacion: `
      <p>Los <strong>pronombres personales en nominativo</strong> son la base de toda oración en alemán. Indican <strong>quién realiza la acción</strong>.</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left text-indigo-300">Persona</th><th class="text-left text-indigo-300">Singular</th><th class="text-left text-indigo-300">Plural</th></tr>
        <tr><td>1ª</td><td>ich (yo)</td><td>wir (nosotros)</td></tr>
        <tr><td>2ª informal</td><td>du (tú)</td><td>ihr (vosotros)</td></tr>
        <tr><td>2ª formal</td><td>Sie (usted)</td><td>Sie (ustedes)</td></tr>
        <tr><td>3ª masc.</td><td>er (él)</td><td rowspan="3">sie (ellos/ellas)</td></tr>
        <tr><td>3ª fem.</td><td>sie (ella)</td></tr>
        <tr><td>3ª neutro</td><td>es (ello)</td></tr>
      </table>
      <p class="mt-2">El <strong>Sie</strong> formal SIEMPRE va en mayúscula, tanto para usted como para ustedes. Se conjuga igual que sie (ellos).</p>
      <p class="mt-1">El pronombre <strong>es</strong> se usa también para el clima: <em>Es regnet</em> (Llueve), <em>Es ist kalt</em> (Hace frío).</p>
    `,
    ejemplos: [
      "Ich bin Juan. (Yo soy Juan)",
      "Du bist Anna. (Tú eres Anna)",
      "Er ist mein Freund. (Él es mi amigo)",
      "Sie ist meine Lehrerin. (Ella es mi profesora)",
      "Wir sind aus Spanien. (Nosotros somos de España)"
    ],
    tips: [
      "💡 Sie (formal) vs sie (ella/ellos): el contexto y la mayúscula te ayudan",
      "💡 En conversación, spesso se omite 'ich' en frases cortas: 'Bin Juan' es incorrecto, siempre usa 'Ich bin'",
      "💡 Practica: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Escribe el pronombre correcto para cada situación",
      datos: [
        { pista: "___ bin María. (yo)", respuesta: "Ich" },
        { pista: "___ bist Pedro. (tú)", respuesta: "Du" },
        { pista: "___ ist der Lehrer. (él)", respuesta: "Er" },
        { pista: "___ sind Freunde. (nosotros)", respuesta: "Wir" },
        { pista: "___ sind Frau Müller. (usted formal)", respuesta: "Sie" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich ist müde.", error: "ist", correccion: "Ich bin (ich se conjuga con bin, no ist)" },
      { frase: "Du sind lustig.", error: "sind", correccion: "Du bist (du se conjuga con bist)" },
      { frase: "Sie (ella) ist María.", error: "Sie", correccion: "Sie ist María. Bien escrito, la mayúscula marca el formal" }
    ]
  },
  {
    id: "a1_1_preposiciones_lugar",
    nivel: "A1.1",
    titulo: "Preposiciones de lugar",
    icono: "📍",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "in, auf, unter, über, neben, vor, hinter, zwischen con dativo (ubicación).",
    explicacion: `
      <p>Las <strong>Wechselpräpositionen</strong> (preposiciones de cambio) pueden ir con dativo o acusativo. Para <strong>ubicación</strong> (¿dónde?) usamos <strong>dativo</strong>.</p>
      <p class="mt-2">Preposiciones principales:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>in</strong> → en (dentro de)</li>
        <li><strong>auf</strong> → sobre (encima de, en superficie)</li>
        <li><strong>unter</strong> → debajo de</li>
        <li><strong>über</strong> → sobre (encima sin contacto)</li>
        <li><strong>neben</strong> → al lado de</li>
        <li><strong>vor</strong> → delante de</li>
        <li><strong>hinter</strong> → detrás de</li>
        <li><strong>zwischen</strong> → entre</li>
      </ul>
      <p class="mt-2">Con dativo, los artículos cambian:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>der → <strong>dem</strong></li>
        <li>die → <strong>der</strong></li>
        <li>das → <strong>dem</strong></li>
        <li>die (plural) → <strong>den</strong> + n al final del sustantivo</li>
      </ul>
    `,
    ejemplos: [
      "Das Buch liegt <strong>auf dem</strong> Tisch. (El libro está sobre la mesa)",
      "Die Katze ist <strong>unter dem</strong> Bett. (El gato está debajo de la cama)",
      "Ich stehe <strong>neben der</strong> Tür. (Estoy al lado de la puerta)",
      "Der Stuhl steht <strong>zwischen den</strong> Tischen. (La silla está entre las mesas)",
      "Das Bild hängt <strong>über dem</strong> Sofa. (El cuadro cuelga sobre el sofá)"
    ],
    tips: [
      "💡 Pregunta 'wo?' (dónde) → dativo. Pregunta 'wohin?' (adónde) → acusativo",
      "💡 Contracciones comunes: in + dem = im, auf + dem = aufm (coloquial), in + das = ins",
      "💡 En plural, el sustantivo añade -n tras preposición + den: mit den Kinde<strong>n</strong>"
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Elige la preposición correcta para cada frase",
      datos: [
        { pista: "Die Lampe steht ___ dem Tisch. (sobre)", opciones: ["unter", "auf", "neben", "hinter"], respuesta: "auf" },
        { pista: "Die Katze schläft ___ dem Bett. (debajo)", opciones: ["über", "neben", "unter", "vor"], respuesta: "unter" },
        { pista: "Ich wohne ___ einer Schule. (al lado)", opciones: ["hinter", "neben", "unter", "zwischen"], respuesta: "neben" },
        { pista: "Der Schrank steht ___ der Tür. (detrás)", opciones: ["vor", "auf", "hinter", "in"], respuesta: "hinter" },
        { pista: "Das Kind sitzt ___ dem Vater. (entre in/auf)", opciones: ["zwischen", "über", "unter", "neben"], respuesta: "zwischen" }
      ]
    },
    corrigeNovato: [
      { frase: "Das Buch ist auf der Tisch.", error: "der", correccion: "auf dem Tisch (dativo: der → dem)" },
      { frase: "Die Katze ist in die Küche.", error: "die", correccion: "Si es ubicación: in der Küche (dativo). 'in die' sería movimiento." },
      { frase: "Ich bin im Schule.", error: "im", correccion: "in der Schule (die Schule → im es in+dem, pero Schule es femenino → der)" }
    ]
  },
  {
    id: "a1_1_negacion",
    nivel: "A1.1",
    titulo: "Negación: nicht y kein",
    icono: "🚫",
    colorBorde: "border-red-500",
    bg: "bg-red-950/30",
    resumen: "Diferencia entre nicht (negar verbos/adjetivos) y kein (negar sustantivos sin artículo).",
    explicacion: `
      <p>En alemán hay <strong>dos formas principales de negar</strong>:</p>
      <p class="mt-2 font-semibold"><strong>nicht</strong> — niega verbos, adjetivos, adverbios o sustantivos con artículo definido:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Ich <strong>komme nicht</strong>. (No vengo) — niega el verbo</li>
        <li>Das ist <strong>nicht gut</strong>. (No es bueno) — niega el adjetivo</li>
        <li>Das ist <strong>nicht der</strong> Mann. (No es el hombre) — niega sustantivo con artículo def.</li>
      </ul>
      <p class="mt-2 font-semibold"><strong>kein</strong> — niega sustantivos sin artículo o con artículo indefinido:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Ich habe <strong>keinen</strong> Hund. (No tengo perro) — kein + acusativo masculino</li>
        <li>Das ist <strong>keine</strong> gute Idee. (No es una buena idea)</li>
        <li>Wir haben <strong>keine</strong> Kinder. (No tenemos hijos)</li>
      </ul>
      <p class="mt-2">Declinación de <strong>kein</strong>:</p>
      <table class="w-full text-sm mt-1">
        <tr><th></th><th>masc.</th><th>fem.</th><th>neutro</th><th>plural</th></tr>
        <tr><td>Nom.</td><td>kein</td><td>keine</td><td>kein</td><td>keine</td></tr>
        <tr><td>Acus.</td><td>keinen</td><td>keine</td><td>kein</td><td>keine</td></tr>
        <tr><td>Dat.</td><td>keinem</td><td>keiner</td><td>keinem</td><td>keinen</td></tr>
      </table>
    `,
    ejemplos: [
      "Ich mag Kaffee nicht. (No me gusta el café)",
      "Ich habe kein Auto. (No tengo coche)",
      "Das ist nicht mein Buch. (Ese no es mi libro)",
      "Er hat keine Zeit. (Él no tiene tiempo)",
      "Wir haben keinen Hunger. (No tenemos hambre)"
    ],
    tips: [
      "💡 kein = nicht + ein. Si puedes decir 'ein' → usa 'kein' para negar",
      "💡 nicht va al final si niega todo el verbo: Ich komme nicht. Pero antes del adjetivo: nicht gut",
      "💡 kein se declina como el artículo indefinido 'ein' pero con -k-"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con nicht o la forma correcta de kein",
      datos: [
        { pista: "Ich habe ___ Zeit.", respuesta: "keine" },
        { pista: "Das ist ___ gut.", respuesta: "nicht" },
        { pista: "Er hat ___ Bruder.", respuesta: "keinen" },
        { pista: "Wir kommen ___ .", respuesta: "nicht" },
        { pista: "Sie hat ___ Kinder.", respuesta: "keine" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich habe nicht Hunger.", error: "nicht", correccion: "Ich habe keinen Hunger (con sustantivos sin artículo se usa kein)" },
      { frase: "Das ist kein gut.", error: "kein", correccion: "Das ist nicht gut (gut es adjetivo, se niega con nicht)" },
      { frase: "Er hat kein Auto.", error: "kein", correccion: "¡Correcto! Auto es neutro → kein. Bien hecho." }
    ]
  },
  {
    id: "a1_1_wfragen",
    nivel: "A1.1",
    titulo: "Preguntas con W-Fragen",
    icono: "❓",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Las 7 preguntas clave en alemán: wer, was, wo, wohin, woher, wie, warum.",
    explicacion: `
      <p>Las <strong>W-Fragen</strong> son preguntas que comienzan con una palabra interrogativa. El verbo va en <strong>segunda posición</strong>, después de la palabra interrogativa.</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left text-indigo-300">Palabra</th><th class="text-left text-indigo-300">Significado</th><th class="text-left text-indigo-300">Ejemplo</th></tr>
        <tr><td>wer</td><td>quién</td><td><strong>Wer</strong> bist du?</td></tr>
        <tr><td>was</td><td>qué</td><td><strong>Was</strong> machst du?</td></tr>
        <tr><td>wo</td><td>dónde</td><td><strong>Wo</strong> wohnst du?</td></tr>
        <tr><td>wohin</td><td>adónde</td><td><strong>Wohin</strong> gehst du?</td></tr>
        <tr><td>woher</td><td>de dónde</td><td><strong>Woher</strong> kommst du?</td></tr>
        <tr><td>wie</td><td>cómo</td><td><strong>Wie</strong> heißt du?</td></tr>
        <tr><td>warum</td><td>por qué</td><td><strong>Warum</strong> lernst du Deutsch?</td></tr>
      </table>
      <p class="mt-2">Estructura: <strong>W-Wort + Verbo + Sujeto + ...</strong></p>
      <p class="italic">Ej: Wo wohnst du? / Warum lernst du Deutsch?</p>
      <p class="mt-2"><strong>Welch-</strong> se usa para preguntar 'cuál' entre opciones: <em>Welches Buch liest du?</em> (¿Qué libro lees?). Se declina como ein.</p>
    `,
    ejemplos: [
      "Wer ist das? (¿Quién es?)",
      "Was machst du heute? (¿Qué haces hoy?)",
      "Wo wohnst du? (¿Dónde vives?)",
      "Wohin fährst du im Urlaub? (¿Adónde viajas de vacaciones?)",
      "Wie alt bist du? (¿Cuántos años tienes?)"
    ],
    tips: [
      "💡 Todas empiezan con W-... excepto 'wie' que también empieza con W- 😄",
      "💡 La entonación es descendente en W-Fragen, a diferencia de sí/no",
      "💡 'Wo' + preposición = nuevas palabras: woran, womit, wofür (en niveles avanzados)"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Escribe la palabra W- correcta para cada pregunta",
      datos: [
        { pista: "___ heißt du? → Ich heiße Peter.", respuesta: "Wie" },
        { pista: "___ wohnst du? → Ich wohne in Berlin.", respuesta: "Wo" },
        { pista: "___ kommst du? → Ich komme aus Spanien.", respuesta: "Woher" },
        { pista: "___ bist du? → Ich bin 25 Jahre alt.", respuesta: "Wie alt" },
        { pista: "___ lernst du Deutsch? → Weil es mir gefällt.", respuesta: "Warum" }
      ]
    },
    corrigeNovato: [
      { frase: "Wie heißt du? → Ich heißt Peter.", error: "heißt", correccion: "Ich heiße (1ª persona: ich heiß-e)" },
      { frase: "Wo du wohnst?", error: "du wohnst", correccion: "Wo wohnst du? (verbo en 2ª posición después de W-Wort)" },
      { frase: "Warum lernst du Deutsch? → Gut respuesta!", error: "", correccion: "¡Pregunta perfecta! Estructura correcta." }
    ]
  }
];