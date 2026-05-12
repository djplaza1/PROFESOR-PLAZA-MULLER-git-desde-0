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
      <p class="mt-2 font-semibold">Reglas orientativas detalladas:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>der</strong>: días de la semana (der Montag, der Dienstag), meses (der Januar, der Mai), estaciones (der Sommer, der Winter), puntos cardinales (der Norden, der Süden), bebidas alcohólicas (der Wein, der Schnaps), marcas de coche (der BMW, der Mercedes).</li>
        <li><strong>die</strong>: palabras terminadas en -ung (die Zeitung, die Übung), -heit (die Freiheit), -keit (die Möglichkeit), -schaft (die Freundschaft), -ei (die Bäckerei), -ion (die Nation), -tät (die Universität), -ik (die Musik).</li>
        <li><strong>das</strong>: palabras terminadas en -chen (das Mädchen), -lein (das Fräulein), -ment (das Instrument), -um (das Zentrum), -tum (das Eigentum), infinitivos sustantivados (das Essen, das Schwimmen), colores (das Blau, das Rot).</li>
        <li>Personas y profesiones: el género natural suele coincidir (der Vater, die Mutter). Para formar el femenino se añade -in al masculino (der Lehrer → die Lehrerin).</li>
      </ul>
      <p class="mt-2">Los artículos indefinidos <strong>ein/eine</strong> se usan cuando mencionas algo por primera vez. No tienen plural: en plural se omite el artículo indefinido (<strong>Ø</strong>).</p>
      <p class="mt-2"><strong>Casos especiales:</strong> Algunos sustantivos cambian de significado según el artículo: der See (el lago) vs die See (el mar), das Schild (el letrero) vs der Schild (el escudo).</p>
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ Mann (el hombre)", respuesta: "der", opciones: null, traduccion: "el hombre", pista: "masculino", explicacion: "Los sustantivos masculinos suelen llevar 'der'." },
        { tipo: "hueco", frase: "___ Frau (la mujer)", respuesta: "die", opciones: null, traduccion: "la mujer", pista: "femenino", explicacion: "Los femeninos llevan 'die'." },
        { tipo: "hueco", frase: "___ Kind (el niño)", respuesta: "das", opciones: null, traduccion: "el niño", pista: "neutro", explicacion: "Los neutros llevan 'das'." },
        { tipo: "hueco", frase: "___ Freiheit (la libertad)", respuesta: "die", opciones: null, traduccion: "la libertad", pista: "termina en -heit", explicacion: "Las palabras terminadas en -heit son femeninas." },
        { tipo: "hueco", frase: "___ Mädchen (la chica)", respuesta: "das", opciones: null, traduccion: "la chica", pista: "termina en -chen", explicacion: "Los diminutivos en -chen son neutros." },
        { tipo: "opcion", frase: "___ Auto ist neu.", respuesta: "Das", opciones: ["Der", "Die", "Das"], traduccion: "El coche es nuevo.", pista: null, explicacion: "'Auto' es neutro: das Auto." },
        { tipo: "opcion", frase: "___ Lampe ist kaputt.", respuesta: "Die", opciones: ["Der", "Die", "Das"], traduccion: "La lámpara está rota.", pista: null, explicacion: "'Lampe' es femenino: die Lampe." },
        { tipo: "hueco", frase: "___ Tisch ist aus Holz.", respuesta: "Der", opciones: null, traduccion: "La mesa es de madera.", pista: "masculino", explicacion: "'Tisch' es masculino." },
        { tipo: "hueco", frase: "Ich habe ___ Hund.", respuesta: "einen", opciones: null, traduccion: "Tengo un perro.", pista: "acusativo masculino", explicacion: "Acusativo masculino: ein → einen." },
        { tipo: "opcion", frase: "Das ist ___ interessantes Buch.", respuesta: "ein", opciones: ["ein", "eine", "kein"], traduccion: "Es un libro interesante.", pista: null, explicacion: "'Buch' es neutro, usa 'ein'." },
        { tipo: "hueco", frase: "Er hat ___ Schwester.", respuesta: "eine", opciones: null, traduccion: "Él tiene una hermana.", pista: "femenino acusativo", explicacion: "Acusativo femenino: eine." },
        { tipo: "opcion", frase: "Wo ist ___ Bahnhof?", respuesta: "der", opciones: ["der", "die", "das"], traduccion: "¿Dónde está la estación?", pista: null, explicacion: "'Bahnhof' es masculino." }
      ]
    },
    flashcards: [
      { cara: "der + masculino", dorso: "der Mann, der Tisch, der Hund" },
      { cara: "die + femenino", dorso: "die Frau, die Lampe, die Katze" },
      { cara: "das + neutro", dorso: "das Kind, das Auto, das Haus" },
      { cara: "ein (masc./neutro)", dorso: "ein Mann, ein Kind" },
      { cara: "eine (femenino)", dorso: "eine Frau, eine Lampe" },
      { cara: "der See (lago) vs die See (mar)", dorso: "Cuidado con los falsos amigos." }
    ]
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
      <p class="mt-2"><strong>Verbos muy comunes:</strong> machen (hacer), lernen (aprender), wohnen (vivir), arbeiten (trabajar), spielen (jugar), kaufen (comprar), kochen (cocinar), reisen (viajar), tanzen (bailar), heißen (llamarse), kommen (venir).</p>
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
      "La regla mnemotécnica: e-st-t-en-t-en. Repítela cantando.",
      "Para saber si necesitas -e- extra, fíjate si al pronunciar la raíz + terminación saldría un trabalenguas (arbeitst → necesitas la e).",
      "Los verbos regulares son más del 90% de los verbos alemanes. Si no sabes si es irregular, trátalo como regular."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ (wohnen) in Madrid.", respuesta: "wohne", opciones: null, traduccion: "Vivo en Madrid.", pista: "ich → -e", explicacion: "Primera persona singular: raíz + e." },
        { tipo: "hueco", frase: "Du ___ (lernen) Deutsch.", respuesta: "lernst", opciones: null, traduccion: "Tú aprendes alemán.", pista: "du → -st", explicacion: "Segunda persona singular: raíz + st." },
        { tipo: "hueco", frase: "Er ___ (arbeiten) bei Siemens.", respuesta: "arbeitet", opciones: null, traduccion: "Él trabaja en Siemens.", pista: "er + raíz en -t → -et", explicacion: "Raíz termina en -t, necesita e extra." },
        { tipo: "hueco", frase: "Wir ___ (spielen) Fußball.", respuesta: "spielen", opciones: null, traduccion: "Jugamos al fútbol.", pista: "wir → -en", explicacion: "Primera persona plural: raíz + en." },
        { tipo: "hueco", frase: "Ihr ___ (reisen) nach Berlin.", respuesta: "reist", opciones: null, traduccion: "Viajáis a Berlín.", pista: "ihr, raíz en -s → solo -t", explicacion: "Raíz termina en -s, du y ihr solo añaden -t." },
        { tipo: "opcion", frase: "Sie (usted) ___ aus der Türkei.", respuesta: "kommen", opciones: ["komme", "kommst", "kommen"], traduccion: "Usted viene de Turquía.", pista: null, explicacion: "Forma de cortesía Sie siempre usa -en." },
        { tipo: "hueco", frase: "Mein Bruder ___ (tanzen) gern.", respuesta: "tanzt", opciones: null, traduccion: "A mi hermano le gusta bailar.", pista: "er, raíz en -z → solo -t", explicacion: "Raíz tanz- + t (sin e extra)." },
        { tipo: "opcion", frase: "Wir ___ (kaufen) im Supermarkt.", respuesta: "kaufen", opciones: ["kaufe", "kaufst", "kaufen"], traduccion: "Compramos en el supermercado.", pista: null, explicacion: "wir siempre -en." },
        { tipo: "hueco", frase: "Du ___ (heißen) Peter.", respuesta: "heißt", opciones: null, traduccion: "Te llamas Peter.", pista: "raíz heiß- + t (du)", explicacion: "Raíz termina en -ß, du solo añade -t." },
        { tipo: "hueco", frase: "Es ___ (regnen) heute.", respuesta: "regnet", opciones: null, traduccion: "Hoy llueve.", pista: "es, raíz regn- + et", explicacion: "Raíz en -n, pero regn- se pronuncia con vocal, añade -et." },
        { tipo: "opcion", frase: "Ihr ___ (machen) die Hausaufgaben.", respuesta: "macht", opciones: ["mache", "machst", "macht"], traduccion: "Hacéis los deberes.", pista: null, explicacion: "ihr lleva -t." }
      ]
    },
    flashcards: [
      { cara: "ich → -e", dorso: "ich mache, ich lerne, ich wohne" },
      { cara: "du → -st", dorso: "du machst, du lernst, du wohnst" },
      { cara: "er/sie/es → -t", dorso: "er macht, sie lernt, es regnet" },
      { cara: "wir → -en", dorso: "wir machen, wir lernen" },
      { cara: "ihr → -t", dorso: "ihr macht, ihr lernt" },
      { cara: "Raíz en -t/-d: -e- extra", dorso: "du arbeitest, er arbeitet" },
      { cara: "Raíz en -s/-ß/-z: du solo -t", dorso: "du tanzt, du reist, du heißt" }
    ]
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
      <p class="mt-2">El pronombre <strong>es</strong> se usa para el tiempo, la hora, y expresiones impersonales: Es regnet (Llueve), Es ist kalt (Hace frío), Es gibt (Hay).</p>
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ heiße Thomas.", respuesta: "Ich", opciones: null, traduccion: "Me llamo Thomas.", pista: "yo", explicacion: "Primera persona singular: ich." },
        { tipo: "hueco", frase: "___ bist mein Freund.", respuesta: "Du", opciones: null, traduccion: "Tú eres mi amigo.", pista: "tú", explicacion: "Segunda persona singular: du." },
        { tipo: "hueco", frase: "___ ist kalt heute.", respuesta: "Es", opciones: null, traduccion: "Hoy hace frío.", pista: "impersonal (tiempo)", explicacion: "Sujeto impersonal obligatorio en alemán." },
        { tipo: "opcion", frase: "___ wohnen in Berlin.", respuesta: "Wir", opciones: ["Ich", "Du", "Wir"], traduccion: "Nosotros vivimos en Berlín.", pista: null, explicacion: "'wohnen' tiene terminación -en, corresponde a wir." },
        { tipo: "hueco", frase: "___ seid willkommen!", respuesta: "Ihr", opciones: null, traduccion: "¡Vosotros sois bienvenidos!", pista: "vosotros", explicacion: "La forma 'seid' es exclusiva de ihr." },
        { tipo: "opcion", frase: "Woher kommen ___?", respuesta: "Sie", opciones: ["sie", "Sie", "ihr"], traduccion: "¿De dónde viene usted?", pista: null, explicacion: "Forma de cortesía: Sie siempre mayúscula." },
        { tipo: "hueco", frase: "___ gibt einen Supermarkt.", respuesta: "Es", opciones: null, traduccion: "Hay un supermercado.", pista: "impersonal", explicacion: "Es gibt = hay (impersonal)." },
        { tipo: "hueco", frase: "___ (ella) ist sehr nett.", respuesta: "Sie", opciones: null, traduccion: "Ella es muy amable.", pista: "ella", explicacion: "Sie = ella (verbo en 3ª sing.)." },
        { tipo: "opcion", frase: "___ lernen Deutsch.", respuesta: "Sie", opciones: ["Sie", "Er", "Ich"], traduccion: "Ellos aprenden alemán.", pista: null, explicacion: "Verbo en -en, plural: sie (ellos)." },
        { tipo: "hueco", frase: "___ spiele gern Fußball.", respuesta: "Ich", opciones: null, traduccion: "Me gusta jugar al fútbol.", pista: "yo", explicacion: "Verbo en -e: ich." }
      ]
    },
    flashcards: [
      { cara: "ich (yo)", dorso: "ich wohne, ich bin, ich habe" },
      { cara: "du (tú)", dorso: "du wohnst, du bist, du hast" },
      { cara: "er/sie/es (él/ella/ello)", dorso: "er wohnt, sie ist, es regnet" },
      { cara: "wir (nosotros)", dorso: "wir wohnen, wir sind, wir haben" },
      { cara: "ihr (vosotros)", dorso: "ihr wohnt, ihr seid, ihr habt" },
      { cara: "sie/Sie (ellos/usted)", dorso: "sie wohnen, Sie sind, Sie haben" }
    ]
  },
  {
    id: "a1_1_preposiciones_lugar",
    nivel: "A1.1",
    titulo: "Preposiciones de lugar",
    icono: "📗",
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    resumen: "in, auf, unter, neben, vor, hinter, an, zwischen – para responder a 'Wo?' con dativo.",
    explicacion: `
      <p>Estas preposiciones se usan con el verbo <strong>sein</strong> (estar/haber) para indicar ubicación. Responden a la pregunta <strong>Wo?</strong> (¿Dónde?) y siempre rigen <strong>dativo</strong> cuando describen posición estática.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Preposición</th><th class="text-left p-1">Significado</th><th class="text-left p-1">Ejemplo con dativo</th></tr>
        <tr><td class="p-1">in</td><td class="p-1">en (dentro de)</td><td class="p-1">in dem/im Zimmer</td></tr>
        <tr class="bg-gray-800"><td class="p-1">auf</td><td class="p-1">sobre (encima, superficie)</td><td class="p-1">auf dem Tisch</td></tr>
        <tr><td class="p-1">unter</td><td class="p-1">debajo de</td><td class="p-1">unter dem Bett</td></tr>
        <tr class="bg-gray-800"><td class="p-1">neben</td><td class="p-1">al lado de</td><td class="p-1">neben dem Sofa</td></tr>
        <tr><td class="p-1">vor</td><td class="p-1">delante de</td><td class="p-1">vor der Tür</td></tr>
        <tr class="bg-gray-800"><td class="p-1">hinter</td><td class="p-1">detrás de</td><td class="p-1">hinter dem Haus</td></tr>
        <tr><td class="p-1">an</td><td class="p-1">junto a (pared, río)</td><td class="p-1">an der Wand</td></tr>
        <tr class="bg-gray-800"><td class="p-1">zwischen</td><td class="p-1">entre</td><td class="p-1">zwischen den Stühlen</td></tr>
      </table>
      <p class="mt-2">Con <strong>dativo</strong>, los artículos cambian: der → <strong>dem</strong>, die → <strong>der</strong>, das → <strong>dem</strong>, die (plural) → <strong>den</strong> (y añade -n al sustantivo si no termina en -n o -s).</p>
      <p>Contracciones comunes: in + dem = <strong>im</strong>, an + dem = <strong>am</strong>, in + das = <strong>ins</strong>, auf + das = <strong>aufs</strong>.</p>
      <p class="mt-2"><strong>Importante:</strong> cuando hay movimiento (Wohin?), estas mismas preposiciones rigen acusativo. Eso se estudia en A1.2.</p>
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
      "Para 'Wo?' → dativo. Para 'Wohin?' (¿A dónde?) → acusativo. De momento solo estudiamos ubicación (dativo).",
      "Memoriza las parejas opuestas: vor ↔ hinter, auf ↔ unter.",
      "Los artículos en dativo: masc./neutro → dem, fem. → der, plural → den (+n al sustantivo). Repite: der → dem, die → der, das → dem."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das Handy ist ___ Tisch.", respuesta: "auf dem", opciones: null, traduccion: "El móvil está sobre la mesa.", pista: "auf + dativo masc.", explicacion: "auf + dem (dativo masculino)." },
        { tipo: "hueco", frase: "Der Hund schläft ___ Bett.", respuesta: "unter dem", opciones: null, traduccion: "El perro duerme debajo de la cama.", pista: "unter + dativo neutro", explicacion: "Bett es neutro: unter dem Bett." },
        { tipo: "opcion", frase: "Die Vase steht ___ Tür.", respuesta: "vor der", opciones: ["vor der", "vor dem", "vor die"], traduccion: "El jarrón está delante de la puerta.", pista: null, explicacion: "Tür es femenino: vor der Tür." },
        { tipo: "hueco", frase: "Wir sitzen ___ Sofa.", respuesta: "auf dem", opciones: null, traduccion: "Estamos sentados en el sofá.", pista: "auf + dativo neutro", explicacion: "Sofa es neutro: auf dem Sofa." },
        { tipo: "opcion", frase: "Das Poster hängt ___ Wand.", respuesta: "an der", opciones: ["an der", "an dem", "an die"], traduccion: "El póster está colgado en la pared.", pista: null, explicacion: "Wand es femenino: an der Wand." },
        { tipo: "hueco", frase: "Der Ball ist ___ Stühlen.", respuesta: "zwischen den", opciones: null, traduccion: "La pelota está entre las sillas.", pista: "zwischen + dativo plural", explicacion: "Stühle es plural: den Stühlen (añade -n)." },
        { tipo: "hueco", frase: "Die Lampe ist ___ dem Tisch.", respuesta: "über", opciones: null, traduccion: "La lámpara está encima de la mesa.", pista: "sobre, encima (sin contacto)", explicacion: "über + dativo = encima, sin contacto." },
        { tipo: "opcion", frase: "Der Supermarkt ist ___ dem Bahnhof.", respuesta: "neben", opciones: ["neben", "hinter", "vor"], traduccion: "El supermercado está al lado de la estación.", pista: null, explicacion: "neben = al lado de." },
        { tipo: "hueco", frase: "___ dem Haus gibt es einen Garten.", respuesta: "Hinter", opciones: null, traduccion: "Detrás de la casa hay un jardín.", pista: "detrás", explicacion: "hinter + dativo." },
        { tipo: "hueco", frase: "Ich wohne ___ Berlin.", respuesta: "in", opciones: null, traduccion: "Vivo en Berlín.", pista: "en (ciudad)", explicacion: "Ciudades sin artículo: solo 'in'." }
      ]
    },
    flashcards: [
      { cara: "in + dativo", dorso: "im Zimmer, in der Schule" },
      { cara: "auf + dativo", dorso: "auf dem Tisch, auf der Straße" },
      { cara: "unter + dativo", dorso: "unter dem Bett, unter der Brücke" },
      { cara: "neben + dativo", dorso: "neben dem Sofa, neben der Tür" },
      { cara: "vor + dativo", dorso: "vor dem Haus, vor der Klasse" },
      { cara: "hinter + dativo", dorso: "hinter dem Baum, hinter der Mauer" }
    ]
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
        <li>Con verbos modales o Perfekt, nicht va delante del infinitivo/participio: Ich kann nicht kommen, Ich habe nicht gegessen.</li>
      </ul>
      <p class="mt-2 font-semibold">Kein:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Niega un sustantivo <strong>sin artículo</strong> o con artículo <strong>indefinido</strong> (ein/eine).</li>
        <li>Equivale a "ningún/ninguna".</li>
        <li>Se declina como <strong>ein/eine</strong>: kein (masc./neutro nom.), keine (fem. nom./acus.), keinen (masc. acus.), keinem (dat.), etc.</li>
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich habe ___ Auto.", respuesta: "kein", opciones: null, traduccion: "No tengo coche.", pista: "ningún coche (neutro)", explicacion: "Auto es neutro: kein Auto." },
        { tipo: "hueco", frase: "Er spricht ___ Deutsch.", respuesta: "kein", opciones: null, traduccion: "Él no habla alemán.", pista: "ningún alemán (neutro)", explicacion: "Idiomas en general llevan kein." },
        { tipo: "opcion", frase: "Sie ist ___ freundlich.", respuesta: "nicht", opciones: ["nicht", "kein", "keine"], traduccion: "Ella no es amable.", pista: null, explicacion: "Adjetivo: se niega con nicht." },
        { tipo: "hueco", frase: "Wir wohnen ___ in Hamburg.", respuesta: "nicht", opciones: null, traduccion: "No vivimos en Hamburgo.", pista: "antes de complemento preposicional", explicacion: "nicht delante de preposición." },
        { tipo: "opcion", frase: "Das ist ___ Lampe.", respuesta: "keine", opciones: ["nicht", "keine", "kein"], traduccion: "Eso no es una lámpara.", pista: null, explicacion: "Lampe es femenino: keine Lampe." },
        { tipo: "hueco", frase: "Ich habe ___ Hunde.", respuesta: "keine", opciones: null, traduccion: "No tengo perros.", pista: "plural", explicacion: "Plural: keine." },
        { tipo: "hueco", frase: "Er kann ___ schwimmen.", respuesta: "nicht", opciones: null, traduccion: "Él no sabe nadar.", pista: "delante de infinitivo", explicacion: "Con verbo modal, nicht va antes del infinitivo." },
        { tipo: "opcion", frase: "Ich habe ___ Schlüssel.", respuesta: "keinen", opciones: ["kein", "keine", "keinen"], traduccion: "No tengo llave.", pista: null, explicacion: "Schlüssel es masculino acusativo: keinen." },
        { tipo: "hueco", frase: "Das ist ___ mein Buch.", respuesta: "nicht", opciones: null, traduccion: "Ese no es mi libro.", pista: "niega posesivo", explicacion: "Delante de posesivos se usa nicht." },
        { tipo: "hueco", frase: "Ich habe ___ Zeit.", respuesta: "keine", opciones: null, traduccion: "No tengo tiempo.", pista: "femenino", explicacion: "Zeit es femenino: keine Zeit." }
      ]
    },
    flashcards: [
      { cara: "nicht (niega verbo/adjetivo)", dorso: "Ich komme nicht. Das ist nicht gut." },
      { cara: "nicht delante de preposición", dorso: "Ich gehe nicht ins Kino." },
      { cara: "kein + sustantivo neutro/masc.", dorso: "kein Geld, kein Hunger" },
      { cara: "keine + sustantivo fem./plural", dorso: "keine Zeit, keine Freunde" },
      { cara: "keinen + acusativo masc.", dorso: "Ich habe keinen Hund." }
    ]
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
      <p class="mt-2"><strong>Wo</strong> vs <strong>Wohin</strong>: Wo = ubicación estática (dativo), Wohin = dirección (acusativo). <strong>Woher</strong> pregunta origen.</p>
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ heißt du?", respuesta: "Wie", opciones: null, traduccion: "¿Cómo te llamas?", pista: "cómo", explicacion: "Wie pregunta el nombre." },
        { tipo: "hueco", frase: "___ wohnst du?", respuesta: "Wo", opciones: null, traduccion: "¿Dónde vives?", pista: "dónde", explicacion: "Wo pregunta ubicación." },
        { tipo: "opcion", frase: "___ kommst du?", respuesta: "Woher", opciones: ["Wo", "Woher", "Wohin"], traduccion: "¿De dónde eres?", pista: null, explicacion: "Woher pregunta origen." },
        { tipo: "hueco", frase: "___ gehst du? (a la escuela)", respuesta: "Wohin", opciones: null, traduccion: "¿A dónde vas?", pista: "a dónde", explicacion: "Wohin pregunta destino." },
        { tipo: "opcion", frase: "___ beginnt der Film?", respuesta: "Wann", opciones: ["Was", "Wann", "Wer"], traduccion: "¿Cuándo empieza la película?", pista: null, explicacion: "Wann = cuándo." },
        { tipo: "hueco", frase: "___ ist dein Bruder?", respuesta: "Wer", opciones: null, traduccion: "¿Quién es tu hermano?", pista: "quién", explicacion: "Wer pregunta persona (sujeto)." },
        { tipo: "hueco", frase: "___ kostet das?", respuesta: "Wie viel", opciones: null, traduccion: "¿Cuánto cuesta?", pista: "cuánto", explicacion: "Wie viel = cuánto (incontable)." },
        { tipo: "opcion", frase: "___ Buch liest du?", respuesta: "Welches", opciones: ["Welche", "Welches", "Welcher"], traduccion: "¿Qué libro lees?", pista: null, explicacion: "Buch es neutro: welches." },
        { tipo: "hueco", frase: "___ lernst du Deutsch?", respuesta: "Warum", opciones: null, traduccion: "¿Por qué aprendes alemán?", pista: "por qué", explicacion: "Warum = por qué." },
        { tipo: "hueco", frase: "___ viele Geschwister hast du?", respuesta: "Wie", opciones: null, traduccion: "¿Cuántos hermanos tienes?", pista: "cuántos", explicacion: "Wie viele = cuántos (contable)." }
      ]
    },
    flashcards: [
      { cara: "Was?", dorso: "¿Qué? - Was ist das?" },
      { cara: "Wie?", dorso: "¿Cómo? - Wie geht's?" },
      { cara: "Wo?", dorso: "¿Dónde? (ubicación) - Wo wohnst du?" },
      { cara: "Woher?", dorso: "¿De dónde? - Woher kommst du?" },
      { cara: "Wohin?", dorso: "¿A dónde? - Wohin gehst du?" },
      { cara: "Wann?", dorso: "¿Cuándo? - Wann kommst du?" },
      { cara: "Warum?", dorso: "¿Por qué? - Warum lernst du Deutsch?" },
      { cara: "Wer?", dorso: "¿Quién? - Wer ist das?" }
    ]
  },
  {
    id: "a1_1_plural",
    nivel: "A1.1",
    titulo: "Plurales básicos",
    icono: "📚",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "Las reglas principales para formar el plural de los sustantivos alemanes.",
    explicacion: `
      <p>En alemán hay varias formas de formar el plural. Aunque hay excepciones, estas son las reglas más importantes:</p>
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
      <p class="mt-2">En dativo plural, el artículo cambia a <strong>den</strong> y el sustantivo añade -n (si no termina ya en -n o -s): mit den Kindern, auf den Tischen.</p>
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "der Tisch → die ___", respuesta: "Tische", opciones: null, traduccion: "las mesas", pista: "plural en -e", explicacion: "La mayoría de masculinos añaden -e." },
        { tipo: "hueco", frase: "das Kind → die ___", respuesta: "Kinder", opciones: null, traduccion: "los niños", pista: "plural en -er", explicacion: "Muchos neutros añaden -er." },
        { tipo: "opcion", frase: "die Lampe → die ___", respuesta: "Lampen", opciones: ["Lampen", "Lampes", "Lampens"], traduccion: "las lámparas", pista: null, explicacion: "Femeninos en -e añaden -n." },
        { tipo: "hueco", frase: "das Auto → die ___", respuesta: "Autos", opciones: null, traduccion: "los coches", pista: "plural en -s", explicacion: "Extranjerismos añaden -s." },
        { tipo: "opcion", frase: "der Lehrer → die ___", respuesta: "Lehrer", opciones: ["Lehrer", "Lehrers", "Lehrern"], traduccion: "los profesores", pista: null, explicacion: "Sustantivos en -er no cambian." },
        { tipo: "hueco", frase: "die Mutter → die ___", respuesta: "Mütter", opciones: null, traduccion: "las madres", pista: "solo Umlaut", explicacion: "Algunos de parentesco solo añaden Umlaut." },
        { tipo: "hueco", frase: "das Buch → die ___", respuesta: "Bücher", opciones: null, traduccion: "los libros", pista: "Umlaut + -er", explicacion: "Neutro corto con Umlaut." },
        { tipo: "opcion", frase: "die Frau → die ___", respuesta: "Frauen", opciones: ["Frauen", "Fraus", "Fräue"], traduccion: "las mujeres", pista: null, explicacion: "La mayoría de femeninos añaden -en." },
        { tipo: "hueco", frase: "der Apfel → die ___", respuesta: "Äpfel", opciones: null, traduccion: "las manzanas", pista: "Umlaut sin -e", explicacion: "Algunos masculinos en -el solo Umlaut." },
        { tipo: "hueco", frase: "das Handy → die ___", respuesta: "Handys", opciones: null, traduccion: "los móviles", pista: "palabra inglesa", explicacion: "Palabras extranjeras añaden -s." }
      ]
    },
    flashcards: [
      { cara: "Plural -e", dorso: "der Tisch → Tische" },
      { cara: "Plural -e + Umlaut", dorso: "die Stadt → Städte" },
      { cara: "Plural -er", dorso: "das Kind → Kinder" },
      { cara: "Plural -er + Umlaut", dorso: "das Buch → Bücher" },
      { cara: "Plural -n/-en", dorso: "die Lampe → Lampen" },
      { cara: "Plural -s", dorso: "das Auto → Autos" }
    ]
  }
];