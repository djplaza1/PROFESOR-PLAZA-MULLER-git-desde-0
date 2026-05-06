// src/features/maestros/contenido/contenidoA1_1.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.A1_1 = [
  {
    id: "a1_1_artikel",
    nivel: "A1.1",
    titulo: "Artículos (der, die, das)",
    icono: "📘",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Aprende a identificar el género de los sustantivos y usar los artículos determinados e indeterminados.",
    explicacion: `
      <p>En alemán cada sustantivo tiene un <strong>género gramatical</strong>: masculino, femenino o neutro. Los artículos definidos son <strong>der</strong> (masculino), <strong>die</strong> (femenino) y <strong>das</strong> (neutro). Los indefinidos: <strong>ein</strong> (masc./neutro) y <strong>eine</strong> (fem.).</p>
      <p class="mt-2 font-semibold">Reglas orientativas:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>der</strong>: días de la semana, meses, estaciones, puntos cardinales, bebidas alcohólicas, marcas de coche (der Montag, der Sommer, der Norden, der Wein, der BMW).</li>
        <li><strong>die</strong>: palabras terminadas en -ung, -heit, -keit, -schaft, -ei, -ion, -tät, -ik (die Zeitung, die Freiheit, die Freundschaft, die Bäckerei, die Nation, die Universität, die Musik).</li>
        <li><strong>das</strong>: palabras terminadas en -chen, -lein, -ment, -um, -tum, infinitivos sustantivados, colores (das Mädchen, das Fräulein, das Instrument, das Zentrum, das Eigentum, das Essen, das Blau).</li>
        <li>Personas y profesiones: el género natural suele coincidir (der Vater, die Mutter), pero para profesiones se añade -in al femenino (der Lehrer → die Lehrerin).</li>
      </ul>
      <p class="mt-2">Los artículos indefinidos <strong>ein/eine</strong> se usan cuando mencionas algo por primera vez. No tienen plural: en plural se omite el artículo indefinido (<strong>Ø</strong>).</p>
    `,
    ejemplos: [
      "der Mann (el hombre) → ein Mann (un hombre)",
      "die Frau (la mujer) → eine Frau (una mujer)",
      "das Kind (el niño) → ein Kind (un niño)",
      "die Freiheit (la libertad) → eine Freiheit",
      "das Mädchen (la chica) — es neutro por el sufijo -chen",
      "der Montag (el lunes), der Mai (mayo), der Winter (el invierno)",
      "die Musik, die Universität, die Zeitung",
      "Ø Bücher (libros) — plural sin artículo indefinido"
    ],
    tips: [
      "Aprende cada sustantivo SIEMPRE con su artículo: no memorices 'Haus', memoriza 'das Haus'.",
      "Usa colores mentales: azul para der, rojo para die, verde para das. Asocia el color al objeto.",
      "Los sufijos son pistas muy fiables: -ung, -heit, -keit, -schaft, -ei, -ion, -tät, -ik → die."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "___ Mann (el hombre)", respuesta: "der", pista: "masculino" },
        { frase: "___ Frau (la mujer)", respuesta: "die", pista: "femenino" },
        { frase: "___ Kind (el niño)", respuesta: "das", pista: "neutro" },
        { frase: "___ Freiheit (la libertad)", respuesta: "die", pista: "termina en -heit" },
        { frase: "___ Mädchen (la chica)", respuesta: "das", pista: "termina en -chen" },
        { frase: "___ Montag (el lunes)", respuesta: "der", pista: "día de la semana" }
      ]
    }
  },
  {
    id: "a1_1_presente",
    nivel: "A1.1",
    titulo: "Presente de verbos regulares",
    icono: "📙",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "Conjuga los verbos regulares en presente: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
    explicacion: `
      <p>La mayoría de los verbos alemanes son <strong>regulares</strong> (schwache Verben). Se forman añadiendo terminaciones a la raíz.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Persona</th><th class="text-left p-1">Terminación</th><th class="text-left p-1">machen (hacer)</th><th class="text-left p-1">lernen (aprender)</th></tr>
        <tr><td class="p-1">ich</td><td class="p-1">-e</td><td class="p-1">ich mache</td><td class="p-1">ich lerne</td></tr>
        <tr class="bg-gray-800"><td class="p-1">du</td><td class="p-1">-st</td><td class="p-1">du machst</td><td class="p-1">du lernst</td></tr>
        <tr><td class="p-1">er/sie/es</td><td class="p-1">-t</td><td class="p-1">er macht</td><td class="p-1">er lernt</td></tr>
        <tr class="bg-gray-800"><td class="p-1">wir</td><td class="p-1">-en</td><td class="p-1">wir machen</td><td class="p-1">wir lernen</td></tr>
        <tr><td class="p-1">ihr</td><td class="p-1">-t</td><td class="p-1">ihr macht</td><td class="p-1">ihr lernt</td></tr>
        <tr class="bg-gray-800"><td class="p-1">sie/Sie</td><td class="p-1">-en</td><td class="p-1">sie machen</td><td class="p-1">sie lernen</td></tr>
      </table>
      <p class="mt-2">Si la raíz termina en <strong>-t, -d, -chn, -ffn, -gn</strong>, se añade una <strong>-e</strong> extra en du, er/sie/es, ihr: du arbeit<strong>e</strong>st, er arbeit<strong>e</strong>t, ihr arbeit<strong>e</strong>t.</p>
      <p class="mt-2">Si la raíz termina en <strong>-s, -ß, -x, -z</strong>, en <strong>du</strong> solo se añade <strong>-t</strong> (sin -s-): du tanzt (bailar), du reist (viajar).</p>
    `,
    ejemplos: [
      "ich wohne in Berlin (vivo en Berlín)",
      "du spielst Gitarre (tocas la guitarra)",
      "er kocht gern (a él le gusta cocinar)",
      "wir arbeiten viel (trabajamos mucho) – raíz arbeit- + e extra",
      "ihr reist nach Spanien (viajáis a España) – raíz reis- + t, sin -s- extra",
      "sie lernen Deutsch (ellos aprenden alemán)",
      "Sie sprechen Englisch (usted habla inglés) – forma de cortesía"
    ],
    tips: [
      "La regla mnemotécnica es: e-st-t-en-t-en. Repítela cantando.",
      "Para saber si necesitas -e- extra, fíjate si al pronunciar la raíz + terminación saldría un trabalenguas (arbeitst → necesitas la e).",
      "Los verbos regulares son más del 90% de los verbos alemanes. Si no sabes si es irregular, trátalo como regular."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "Ich ___ (wohnen) in Madrid.", respuesta: "wohne", pista: "ich → -e" },
        { frase: "Du ___ (lernen) Deutsch.", respuesta: "lernst", pista: "du → -st" },
        { frase: "Er ___ (arbeiten) bei Siemens.", respuesta: "arbeitet", pista: "er + raíz en -t → -et" },
        { frase: "Wir ___ (spielen) Fußball.", respuesta: "spielen", pista: "wir → -en" },
        { frase: "Ihr ___ (reisen) nach Berlin.", respuesta: "reist", pista: "ihr, raíz en -s → solo -t" },
        { frase: "Sie ___ (kommen) aus der Türkei.", respuesta: "kommen", pista: "sie → -en" }
      ]
    }
  },
  {
    id: "a1_1_pronombres",
    nivel: "A1.1",
    titulo: "Pronombres personales (nominativo)",
    icono: "📔",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "ich, du, er, sie, es, wir, ihr, sie, Sie – los pronombres que hacen de sujeto.",
    explicacion: `
      <p>Los pronombres personales en <strong>nominativo</strong> son los que usas como sujeto de la oración.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Singular</th><th class="text-left p-1">Plural</th></tr>
        <tr><td class="p-1">ich (yo)</td><td class="p-1">wir (nosotros/as)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">du (tú, informal)</td><td class="p-1">ihr (vosotros/as)</td></tr>
        <tr><td class="p-1">er (él), sie (ella), es (ello)</td><td class="p-1">sie (ellos/as)</td></tr>
        <tr class="bg-gray-800"><td class="p-1"></td><td class="p-1">Sie (usted/ustedes, formal)</td></tr>
      </table>
      <p class="mt-2"><strong>Sie</strong> (con mayúscula) es la forma de cortesía, para singular y plural. Se conjuga como la 3ª persona del plural (sie).</p>
      <p>En alemán NO se puede omitir el sujeto (a diferencia del español). Siempre debes decir <strong>ich</strong> o <strong>es</strong> aunque sea obvio.</p>
    `,
    ejemplos: [
      "Ich heiße Anna. (Me llamo Anna.)",
      "Du kommst aus Spanien. (Tú vienes de España.)",
      "Er ist Arzt. (Él es médico.)",
      "Sie ist Lehrerin. (Ella es profesora.)",
      "Es regnet. (Llueve.) – sujeto impersonal obligatorio",
      "Wir gehen ins Kino. (Nosotros vamos al cine.)",
      "Ihr seid müde. (Vosotros estáis cansados.)",
      "Sie sprechen gut Deutsch. (Ellos hablan bien alemán.)",
      "Wo wohnen Sie? (¿Dónde vive usted?)"
    ],
    tips: [
      "Distinguir 'sie' (ella) de 'sie' (ellos) y 'Sie' (usted): la pista está en la conjugación del verbo. 'sie geht' (ella va) vs 'sie gehen' (ellos van / usted va).",
      "El pronombre 'es' se usa para el tiempo atmosférico, la hora y construcciones impersonales: Es ist kalt, Es ist 10 Uhr, Es gibt...",
      "En alemán, 'du' se usa con amigos/niños/familia. 'Sie' con desconocidos, trabajo, tiendas. Cuando dudes, usa 'Sie'."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "___ heiße Thomas.", respuesta: "Ich", pista: "yo" },
        { frase: "___ bist mein Freund.", respuesta: "Du", pista: "tú" },
        { frase: "___ ist kalt heute.", respuesta: "Es", pista: "impersonal (tiempo)" },
        { frase: "___ wohnen in Berlin. (nosotros)", respuesta: "Wir", pista: "nosotros" },
        { frase: "___ seid willkommen! (vosotros)", respuesta: "Ihr", pista: "vosotros" },
        { frase: "Woher kommen ___? (usted)", respuesta: "Sie", pista: "formal, mayúscula" }
      ]
    }
  },
  {
    id: "a1_1_preposiciones_lugar",
    nivel: "A1.1",
    titulo: "Preposiciones de lugar",
    icono: "📗",
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    resumen: "in, auf, unter, neben, vor, hinter, an, zwischen – para responder a 'Wo?'.",
    explicacion: `
      <p>Estas preposiciones se usan con el verbo <strong>sein</strong> (estar/haber) para indicar ubicación. Responden a la pregunta <strong>Wo?</strong> (¿Dónde?) y siempre rigen <strong>dativo</strong> cuando describen posición estática.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Preposición</th><th class="text-left p-1">Significado</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">in</td><td class="p-1">en (dentro de)</td><td class="p-1">in dem Zimmer (en la habitación)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">auf</td><td class="p-1">sobre (encima, superficie)</td><td class="p-1">auf dem Tisch (sobre la mesa)</td></tr>
        <tr><td class="p-1">unter</td><td class="p-1">debajo de</td><td class="p-1">unter dem Bett (debajo de la cama)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">neben</td><td class="p-1">al lado de</td><td class="p-1">neben dem Sofa (al lado del sofá)</td></tr>
        <tr><td class="p-1">vor</td><td class="p-1">delante de</td><td class="p-1">vor der Tür (delante de la puerta)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">hinter</td><td class="p-1">detrás de</td><td class="p-1">hinter dem Haus (detrás de la casa)</td></tr>
        <tr><td class="p-1">an</td><td class="p-1">junto a, en (pared, río)</td><td class="p-1">an der Wand (en la pared)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">zwischen</td><td class="p-1">entre</td><td class="p-1">zwischen den Stühlen (entre las sillas)</td></tr>
      </table>
      <p class="mt-2">Con <strong>dativo</strong>, los artículos cambian: der → <strong>dem</strong>, die → <strong>der</strong>, das → <strong>dem</strong>, die (plural) → <strong>den</strong> (y añade -n al sustantivo si no termina en -n).</p>
      <p>Contracciones comunes: in + dem = <strong>im</strong>, an + dem = <strong>am</strong>, auf + das = <strong>aufs</strong>, in + das = <strong>ins</strong>.</p>
    `,
    ejemplos: [
      "Das Buch ist auf dem Tisch. (El libro está sobre la mesa.)",
      "Die Katze ist unter dem Bett. (El gato está debajo de la cama.)",
      "Der Stuhl ist neben dem Sofa. (La silla está al lado del sofá.)",
      "Ich warte vor der Tür. (Espero delante de la puerta.)",
      "Der Garten ist hinter dem Haus. (El jardín está detrás de la casa.)",
      "Das Bild hängt an der Wand. (El cuadro cuelga en la pared.)",
      "Die Lampe hängt zwischen den Fenstern. (La lámpara cuelga entre las ventanas.)",
      "im Zimmer (en la habitación), am Tisch (junto a la mesa)"
    ],
    tips: [
      "Para 'Wo?' → dativo. Para 'Wohin?' (¿A dónde?) → acusativo. Esto lo verás en A1.2.",
      "Memoriza las parejas opuestas: vor ↔ hinter, auf ↔ unter, an... (sin opuesto directo).",
      "Los artículos en dativo: masc./neutro → dem, fem. → der, plural → den (+n al sustantivo). Repite: der → dem, die → der, das → dem."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "Das Handy ist ___ Tisch. (sobre la mesa)", respuesta: "auf dem", pista: "auf + dativo masc." },
        { frase: "Der Hund schläft ___ Bett. (debajo de la cama)", respuesta: "unter dem", pista: "unter + dativo neutro" },
        { frase: "Die Vase steht ___ Tür. (delante de la puerta)", respuesta: "vor der", pista: "vor + dativo fem." },
        { frase: "Wir sitzen ___ Sofa. (en el sofá)", respuesta: "auf dem", pista: "auf + dativo neutro" },
        { frase: "Das Poster hängt ___ Wand. (en la pared)", respuesta: "an der", pista: "an + dativo fem." },
        { frase: "Der Ball ist ___ Stühlen. (entre las sillas)", respuesta: "zwischen den", pista: "zwischen + dativo plural" }
      ]
    }
  },
  {
    id: "a1_1_negacion",
    nivel: "A1.1",
    titulo: "Negación (nicht / kein)",
    icono: "📕",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    resumen: "Niega frases enteras o elementos concretos con 'nicht', y sustantivos indefinidos con 'kein'.",
    explicacion: `
      <p>En alemán hay dos palabras principales para negar: <strong>nicht</strong> y <strong>kein</strong>.</p>
      <p class="mt-2 font-semibold">Nicht:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Niega un verbo, un adjetivo, un adverbio o toda una oración.</li>
        <li>Normalmente se coloca al <strong>final</strong> de la oración, o delante del elemento que niega.</li>
        <li>Si hay un complemento con preposición, <strong>nicht</strong> va delante de él: Ich wohne nicht in Berlin.</li>
      </ul>
      <p class="mt-2 font-semibold">Kein:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Niega un sustantivo <strong>sin artículo</strong> o con artículo <strong>indefinido</strong> (ein/eine).</li>
        <li>Equivale a "ningún/ninguna".</li>
        <li>Se declina como <strong>ein/eine</strong>: kein (masc./neutro), keine (fem.), keine (plural).</li>
      </ul>
      <p class="mt-2">Regla práctica: si puedes sustituirlo por "kein", úsalo. Si no, usa <strong>nicht</strong>.</p>
    `,
    ejemplos: [
      "Ich verstehe nicht. (No entiendo.) – niega el verbo",
      "Er ist nicht alt. (Él no es viejo.) – niega adjetivo",
      "Ich wohne nicht in Berlin. (No vivo en Berlín.) – nicht delante del complemento preposicional",
      "Ich habe kein Geld. (No tengo dinero.) – kein + sustantivo sin artículo",
      "Das ist keine Katze. (Eso no es un gato.) – keine (femenino)",
      "Er hat keine Freunde. (Él no tiene amigos.) – keine (plural)",
      "Sie isst keinen Apfel. (Ella no come una manzana.) – keinen (acusativo masculino)",
      "Kein Mensch ist perfekt. (Ninguna persona es perfecta.)"
    ],
    tips: [
      "Piensa: 'kein' = 'not a' o 'no' delante de sustantivos. 'nicht' = 'not' para todo lo demás.",
      "Colocación de 'nicht': como regla fácil, ponlo al final, excepto si hay preposición o segundo verbo (Perfekt, modales), donde va justo antes.",
      "Kein se adapta al caso y género. Apréndelo junto con ein/eine: kein, keine, keinen, keinem..."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "Ich habe ___ Auto.", respuesta: "kein", pista: "ningún coche (neutro)" },
        { frase: "Er spricht ___ Deutsch.", respuesta: "kein", pista: "ningún alemán (neutro)" },
        { frase: "Sie ist ___ freundlich.", respuesta: "nicht", pista: "no es amable (adjetivo)" },
        { frase: "Wir wohnen ___ in Hamburg.", respuesta: "nicht", pista: "no vivimos en Hamburgo" },
        { frase: "Das ist ___ Lampe.", respuesta: "keine", pista: "no es una lámpara (femenino)" },
        { frase: "Ich habe ___ Hunde.", respuesta: "keine", pista: "ningunos perros (plural)" }
      ]
    }
  },
  {
    id: "a1_1_wfragen",
    nivel: "A1.1",
    titulo: "Preguntas W (W-Fragen)",
    icono: "📓",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Was, wie, wo, woher, wohin, wann, warum, wer – las partículas interrogativas esenciales.",
    explicacion: `
      <p>Las <strong>W-Fragen</strong> son preguntas abiertas que empiezan con una palabra interrogativa (casi todas empiezan con W). El verbo va en <strong>segunda posición</strong> y el sujeto después.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Partícula</th><th class="text-left p-1">Significado</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">Was</td><td class="p-1">¿Qué?</td><td class="p-1">Was machst du?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Wie</td><td class="p-1">¿Cómo?</td><td class="p-1">Wie geht's?</td></tr>
        <tr><td class="p-1">Wo</td><td class="p-1">¿Dónde? (ubicación)</td><td class="p-1">Wo wohnst du?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Woher</td><td class="p-1">¿De dónde? (origen)</td><td class="p-1">Woher kommst du?</td></tr>
        <tr><td class="p-1">Wohin</td><td class="p-1">¿A dónde? (destino)</td><td class="p-1">Wohin gehst du?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Wann</td><td class="p-1">¿Cuándo?</td><td class="p-1">Wann kommst du?</td></tr>
        <tr><td class="p-1">Warum</td><td class="p-1">¿Por qué?</td><td class="p-1">Warum lernst du Deutsch?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Wer</td><td class="p-1">¿Quién?</td><td class="p-1">Wer ist das?</td></tr>
        <tr><td class="p-1">Wen</td><td class="p-1">¿A quién? (acusativo)</td><td class="p-1">Wen siehst du?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Wem</td><td class="p-1">¿A quién? (dativo)</td><td class="p-1">Wem gehört das?</td></tr>
        <tr><td class="p-1">Welche/r/s</td><td class="p-1">¿Cuál?</td><td class="p-1">Welches Buch liest du?</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Wie viel</td><td class="p-1">¿Cuánto?</td><td class="p-1">Wie viel kostet das?</td></tr>
        <tr><td class="p-1">Wie viele</td><td class="p-1">¿Cuántos/as?</td><td class="p-1">Wie viele Kinder hast du?</td></tr>
      </table>
      <p class="mt-2">Estructura: <strong>W-Frage + verbo conjugado + sujeto + (resto) + ?</strong></p>
    `,
    ejemplos: [
      "Was ist dein Name? (¿Cuál es tu nombre?)",
      "Wie alt bist du? (¿Cuántos años tienes?)",
      "Wo wohnst du? (¿Dónde vives?)",
      "Woher kommst du? - Ich komme aus Spanien. (¿De dónde eres? - Soy de España.)",
      "Wohin fährst du? - Ich fahre nach Berlin. (¿A dónde vas? - Voy a Berlín.)",
      "Wann beginnt der Kurs? (¿Cuándo empieza el curso?)",
      "Warum lernst du Deutsch? - Weil ich in Deutschland arbeiten möchte. (¿Por qué aprendes alemán? - Porque quiero trabajar en Alemania.)",
      "Wer ist deine Lehrerin? (¿Quién es tu profesora?)",
      "Welche Farbe magst du? (¿Qué color te gusta?)"
    ],
    tips: [
      "Wo = ubicación estática (dativo). Wohin = dirección, movimiento (acusativo). No los confundas.",
      "Recuerda que tras la W-Frage, el verbo va en 2ª posición: Was (1) machst (2) du (3)?",
      "La palabra 'woher' se descompone en wo + her (de dónde). 'Wohin' es wo + hin (hacia dónde)."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "___ heißt du?", respuesta: "Wie", pista: "cómo te llamas" },
        { frase: "___ wohnst du?", respuesta: "Wo", pista: "dónde vives" },
        { frase: "___ kommst du?", respuesta: "Woher", pista: "de dónde eres" },
        { frase: "___ gehst du? (a la escuela)", respuesta: "Wohin", pista: "a dónde vas" },
        { frase: "___ beginnt der Film?", respuesta: "Wann", pista: "cuándo empieza" },
        { frase: "___ ist dein Bruder?", respuesta: "Wer", pista: "quién es" }
      ]
    }
  },
  {
    id: "a1_1_plural",
    nivel: "A1.1",
    titulo: "Plurales básicos",
    icono: "📚",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "Las 5 reglas principales para formar el plural de los sustantivos alemanes.",
    explicacion: `
      <p>En alemán hay varias formas de formar el plural. Aunque hay excepciones, estas son las 5 reglas más importantes:</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Tipo</th><th class="text-left p-1">Singular → Plural</th><th class="text-left p-1">Género típico</th></tr>
        <tr><td class="p-1">1. -e (sin Umlaut)</td><td class="p-1">der Tisch → die Tische</td><td class="p-1">masc. (la mayoría)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">2. -e + Umlaut</td><td class="p-1">die Stadt → die Städte</td><td class="p-1">masc. y fem. con a, o, u, au</td></tr>
        <tr><td class="p-1">3. -er (+ Umlaut)</td><td class="p-1">das Kind → die Kinder, das Buch → die Bücher</td><td class="p-1">neutro (muchos)</td></tr>
        <tr class="bg-gray-800"><td class="p-1">4. -n / -en</td><td class="p-1">die Lampe → die Lampen, die Frau → die Frauen</td><td class="p-1">fem. (la mayoría), masc. tipo -e</td></tr>
        <tr><td class="p-1">5. -s</td><td class="p-1">das Auto → die Autos, das Handy → die Handys</td><td class="p-1">extranjerismos, abreviaturas</td></tr>
        <tr class="bg-gray-800"><td class="p-1">6. Sin cambio</td><td class="p-1">der Lehrer → die Lehrer, das Zimmer → die Zimmer</td><td class="p-1">masc. en -er, -el, -en; neutro en -er, -el, -en</td></tr>
        <tr><td class="p-1">7. Solo Umlaut</td><td class="p-1">die Mutter → die Mütter, der Vater → die Väter</td><td class="p-1">algunos masc. y fem. de parentesco</td></tr>
      </table>
      <p class="mt-2">En plural, el artículo es siempre <strong>die</strong> (nominativo/acusativo) independientemente del género.</p>
    `,
    ejemplos: [
      "der Tisch → die Tische (mesa/s)",
      "die Stadt → die Städte (ciudad/es) – Umlaut + -e",
      "das Kind → die Kinder (niño/s)",
      "das Buch → die Bücher (libro/s) – Umlaut + -er",
      "die Lampe → die Lampen (lámpara/s) – -n",
      "die Frau → die Frauen (mujer/es) – -en",
      "das Auto → die Autos (coche/s) – -s",
      "der Lehrer → die Lehrer (profesor/es) – sin cambio",
      "die Mutter → die Mütter (madre/s) – solo Umlaut"
    ],
    tips: [
      "Aprende cada sustantivo con su plural, igual que con su artículo: der Tisch, die Tische.",
      "Si el sustantivo termina en -e, el plural suele ser -n (die Lampe → Lampen).",
      "Los neutros cortos tienden a hacer plural en -er con Umlaut si tienen a, o, u: das Buch → Bücher, das Haus → Häuser."
    ],
    ejercicioBase: {
      tipo: "huecos",
      preguntas: [
        { frase: "der Tisch → die ___", respuesta: "Tische", pista: "plural en -e" },
        { frase: "das Kind → die ___", respuesta: "Kinder", pista: "plural en -er" },
        { frase: "die Lampe → die ___", respuesta: "Lampen", pista: "plural en -n" },
        { frase: "das Auto → die ___", respuesta: "Autos", pista: "plural en -s" },
        { frase: "der Lehrer → die ___", respuesta: "Lehrer", pista: "sin cambio" },
        { frase: "die Mutter → die ___", respuesta: "Mütter", pista: "solo Umlaut" }
      ]
    }
  }
];