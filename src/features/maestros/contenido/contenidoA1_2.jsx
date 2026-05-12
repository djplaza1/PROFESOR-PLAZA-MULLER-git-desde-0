// src/features/maestros/contenido/contenidoA1_2.jsx
// Contenido gramatical nivel A1.2 - Principiante avanzado
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Maestros.A1_2 = [
  {
    id: "a1_2_modalverben",
    nivel: "A1.2",
    titulo: "Verbos modales (können, müssen, dürfen...)",
    icono: "🔧",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "Aprende a expresar posibilidad, obligación, permiso y deseo con los seis verbos modales.",
    explicacion: `
      <p>Los <strong>verbos modales</strong> modifican el significado del verbo principal. El modal va en <strong>segunda posición</strong> conjugado y el verbo principal al <strong>final</strong> en infinitivo (sin zu).</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Modal</th><th class="text-left p-1">Significado</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">können</td><td class="p-1">poder (habilidad)</td><td class="p-1">Ich <strong>kann</strong> schwimmen.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">müssen</td><td class="p-1">tener que (obligación)</td><td class="p-1">Wir <strong>müssen</strong> lernen.</td></tr>
        <tr><td class="p-1">dürfen</td><td class="p-1">poder (permiso)</td><td class="p-1">Du <strong>darfst</strong> hereinkommen.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">sollen</td><td class="p-1">deber (orden externa)</td><td class="p-1">Er <strong>soll</strong> zum Arzt gehen.</td></tr>
        <tr><td class="p-1">wollen</td><td class="p-1">querer (deseo firme)</td><td class="p-1">Sie <strong>will</strong> tanzen.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">möchten</td><td class="p-1">quisiera (deseo cortés)</td><td class="p-1">Ich <strong>möchte</strong> einen Kaffee.</td></tr>
      </table>
      <p class="mt-2 font-semibold">Conjugación especial (cambio vocálico en singular):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>können:</strong> ich kann, du kannst, er kann, wir können, ihr könnt, sie können</li>
        <li><strong>müssen:</strong> ich muss, du musst, er muss, wir müssen, ihr müsst, sie müssen</li>
        <li><strong>dürfen:</strong> ich darf, du darfst, er darf, wir dürfen, ihr dürft, sie dürfen</li>
        <li><strong>wollen:</strong> ich will, du willst, er will, wir wollen, ihr wollt, sie wollen</li>
        <li><strong>sollen:</strong> regular (ich soll, du sollst, er soll...)</li>
        <li><strong>möchten:</strong> ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet, sie möchten</li>
      </ul>
      <p class="mt-2">Con modal, el <strong>nicht</strong> se coloca justo delante del infinitivo al final: Ich kann <strong>nicht</strong> kommen.</p>
    `,
    ejemplos: [
      "Ich kann Deutsch sprechen. (Puedo hablar alemán.)",
      "Du musst die Hausaufgaben machen. (Debes hacer los deberes.)",
      "Hier darf man nicht rauchen. (Aquí no se puede fumar.)",
      "Wir wollen nach Berlin fahren. (Queremos viajar a Berlín.)",
      "Ich möchte einen Kaffee, bitte. (Quisiera un café, por favor.)",
      "Er soll mehr schlafen. (Él debería dormir más.)",
      "Kannst du mir helfen? (¿Puedes ayudarme?)"
    ],
    tips: [
      "El modal va conjugado en 2ª posición, el verbo principal al final en INFINITIVO (sin zu).",
      "können = habilidad, dürfen = permiso. En español ambos se traducen como 'poder', pero en alemán son distintos.",
      "möchten es el Konjunktiv II de mögen. Se usa para pedir cosas educadamente y es MUY frecuente."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ (können) schwimmen.", respuesta: "kann", opciones: null, traduccion: "Puedo nadar.", pista: "ich", explicacion: "können → ich kann (cambio vocálico)." },
        { tipo: "hueco", frase: "Du ___ (müssen) lernen.", respuesta: "musst", opciones: null, traduccion: "Debes aprender.", pista: "du", explicacion: "müssen → du musst." },
        { tipo: "opcion", frase: "Hier ___ man nicht rauchen.", respuesta: "darf", opciones: ["darf", "kann", "muss"], traduccion: "Aquí no se puede fumar.", pista: null, explicacion: "Permiso → dürfen. man darf = se puede." },
        { tipo: "hueco", frase: "Wir ___ (wollen) nach Hause gehen.", respuesta: "wollen", opciones: null, traduccion: "Queremos ir a casa.", pista: "wir", explicacion: "wollen → wir wollen (sin cambio vocálico en plural)." },
        { tipo: "hueco", frase: "Er ___ (sollen) zum Arzt gehen.", respuesta: "soll", opciones: null, traduccion: "Él debe ir al médico.", pista: "er", explicacion: "sollen → er soll (regular en singular)." },
        { tipo: "opcion", frase: "Ich ___ einen Kaffee, bitte.", respuesta: "möchte", opciones: ["möchte", "will", "mag"], traduccion: "Quisiera un café, por favor.", pista: null, explicacion: "möchte = deseo cortés." },
        { tipo: "hueco", frase: "Ihr ___ (dürfen) ins Kino gehen.", respuesta: "dürft", opciones: null, traduccion: "Podéis ir al cine.", pista: "ihr", explicacion: "dürfen → ihr dürft." },
        { tipo: "hueco", frase: "Ich ___ nicht kommen. (können)", respuesta: "kann", opciones: null, traduccion: "No puedo venir.", pista: "nicht va delante del infinitivo", explicacion: "Con modal, nicht va justo antes del infinitivo." },
        { tipo: "opcion", frase: "___ du mir helfen?", respuesta: "Kannst", opciones: ["Kannst", "Kann", "Könnt"], traduccion: "¿Puedes ayudarme?", pista: null, explicacion: "Pregunta: verbo modal en 1ª posición." },
        { tipo: "hueco", frase: "Sie (usted) ___ (müssen) das Formular ausfüllen.", respuesta: "müssen", opciones: null, traduccion: "Usted debe rellenar el formulario.", pista: "Sie formal", explicacion: "Sie formal siempre usa la forma de plural (-en)." }
      ]
    },
    flashcards: [
      { cara: "können (poder - habilidad)", dorso: "Ich kann schwimmen." },
      { cara: "müssen (tener que - obligación)", dorso: "Du musst lernen." },
      { cara: "dürfen (poder - permiso)", dorso: "Darf ich reinkommen?" },
      { cara: "wollen (querer - deseo)", dorso: "Wir wollen tanzen." },
      { cara: "sollen (deber - orden externa)", dorso: "Er soll schlafen." },
      { cara: "möchten (quisiera - cortesía)", dorso: "Ich möchte ein Wasser." }
    ]
  },
  {
    id: "a1_2_trennbare",
    nivel: "A1.2",
    titulo: "Verbos separables",
    icono: "✂️",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Aprende a usar los verbos con prefijo separable que se dividen en la oración principal.",
    explicacion: `
      <p>Muchos verbos alemanes tienen un <strong>prefijo separable</strong>. En la oración principal, el prefijo se separa y va al <strong>final</strong> de la frase.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Prefijo</th><th class="text-left p-1">Verbo</th><th class="text-left p-1">Significado</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">auf-</td><td class="p-1">aufmachen</td><td class="p-1">abrir</td><td class="p-1">Ich mache die Tür <strong>auf</strong>.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">zu-</td><td class="p-1">zumachen</td><td class="p-1">cerrar</td><td class="p-1">Er macht die Tür <strong>zu</strong>.</td></tr>
        <tr><td class="p-1">an-</td><td class="p-1">anfangen</td><td class="p-1">empezar</td><td class="p-1">Der Film fängt <strong>an</strong>.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">ein-</td><td class="p-1">einkaufen</td><td class="p-1">comprar</td><td class="p-1">Wir kaufen im Supermarkt <strong>ein</strong>.</td></tr>
        <tr><td class="p-1">fern-</td><td class="p-1">fernsehen</td><td class="p-1">ver la tele</td><td class="p-1">Sie sieht gern <strong>fern</strong>.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">mit-</td><td class="p-1">mitkommen</td><td class="p-1">venir con</td><td class="p-1">Kommst du <strong>mit</strong>?</td></tr>
        <tr><td class="p-1">ab-</td><td class="p-1">abfahren</td><td class="p-1">salir (transporte)</td><td class="p-1">Der Zug fährt <strong>ab</strong>.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">zurück-</td><td class="p-1">zurückkommen</td><td class="p-1">volver</td><td class="p-1">Ich komme morgen <strong>zurück</strong>.</td></tr>
      </table>
      <p class="mt-2"><strong>Prefijos más frecuentes:</strong> auf, zu, an, ein, aus, mit, ab, vor, nach, bei, fern, zurück, weiter, los, her, hin.</p>
      <p class="mt-2">En oraciones subordinadas (con dass, weil...), el verbo NO se separa: ..., weil ich die Tür <strong>aufmache</strong>.</p>
      <p>Con verbos modales, el separable va al final en infinitivo junto: Ich <strong>muss</strong> die Tür <strong>aufmachen</strong>.</p>
    `,
    ejemplos: [
      "Ich stehe um 7 Uhr auf. (Me levanto a las 7.)",
      "Machst du das Fenster auf? (¿Abres la ventana?)",
      "Der Bus fährt um 8 Uhr ab. (El bus sale a las 8.)",
      "Wir kaufen im Supermarkt ein. (Compramos en el supermercado.)",
      "Sie ruft ihre Mutter an. (Ella llama a su madre.)",
      "Ich sehe abends fern. (Veo la tele por las noches.)",
      "Kommst du mit? (¿Vienes conmigo?)"
    ],
    tips: [
      "En la oración principal, el prefijo va al final. Siempre.",
      "Si hay verbo modal, el separable no se separa y va al final en infinitivo: Ich muss aufstehen.",
      "Los prefijos separables siempre llevan el acento tónico: AUFmachen, ANrufen, EINkaufen."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ um 7 Uhr ___. (aufstehen)", respuesta: "stehe auf", opciones: null, traduccion: "Me levanto a las 7.", pista: "auf- va al final", explicacion: "aufstehen: ich stehe auf." },
        { tipo: "hueco", frase: "___ du das Fenster ___? (aufmachen)", respuesta: "Machst auf", opciones: null, traduccion: "¿Abres la ventana?", pista: "pregunta → verbo en 1ª posición", explicacion: "aufmachen: machst...auf." },
        { tipo: "opcion", frase: "Der Bus ___ um 8 Uhr ___. (abfahren)", respuesta: "fährt ab", opciones: ["fährt ab", "abfährt", "fährt"], traduccion: "El bus sale a las 8.", pista: null, explicacion: "abfahren: fährt...ab." },
        { tipo: "hueco", frase: "Wir ___ im Supermarkt ___. (einkaufen)", respuesta: "kaufen ein", opciones: null, traduccion: "Compramos en el supermercado.", pista: "ein- al final", explicacion: "einkaufen: wir kaufen ein." },
        { tipo: "hueco", frase: "Sie ___ ihre Mutter ___. (anrufen)", respuesta: "ruft an", opciones: null, traduccion: "Ella llama a su madre.", pista: "an- al final", explicacion: "anrufen: sie ruft an." },
        { tipo: "opcion", frase: "Ich ___ gern ___. (fernsehen)", respuesta: "sehe fern", opciones: ["sehe fern", "fernsehe", "sehe"], traduccion: "Me gusta ver la tele.", pista: null, explicacion: "fernsehen: sehe...fern." },
        { tipo: "hueco", frase: "___ du ___? (mitkommen)", respuesta: "Kommst mit", opciones: null, traduccion: "¿Vienes conmigo?", pista: "mit- al final", explicacion: "mitkommen: kommst...mit." },
        { tipo: "hueco", frase: "Ich muss die Tür ___. (zumachen)", respuesta: "zumachen", opciones: null, traduccion: "Tengo que cerrar la puerta.", pista: "con modal, no se separa", explicacion: "Con modal, el separable va junto al final: zumachen." },
        { tipo: "opcion", frase: "Er ___ um 6 Uhr ___. (aufwachen)", respuesta: "wacht auf", opciones: ["wacht auf", "aufwacht", "wachen auf"], traduccion: "Él se despierta a las 6.", pista: null, explicacion: "aufwachen: wacht...auf." },
        { tipo: "hueco", frase: "Morgen ___ ich ___. (zurückkommen)", respuesta: "komme zurück", opciones: null, traduccion: "Mañana vuelvo.", pista: "zurück- al final", explicacion: "zurückkommen: komme...zurück." }
      ]
    },
    flashcards: [
      { cara: "aufmachen (abrir)", dorso: "Ich mache die Tür auf." },
      { cara: "zumachen (cerrar)", dorso: "Mach die Tür zu!" },
      { cara: "anrufen (llamar)", dorso: "Rufst du mich an?" },
      { cara: "einkaufen (comprar)", dorso: "Wir kaufen im Supermarkt ein." },
      { cara: "fernsehen (ver la tele)", dorso: "Ich sehe abends fern." },
      { cara: "mitkommen (venir con)", dorso: "Kommst du mit?" }
    ]
  },
  {
    id: "a1_2_akkusativ",
    nivel: "A1.2",
    titulo: "Acusativo (den, einen, keinen)",
    icono: "📕",
    colorBorde: "border-red-500",
    bg: "bg-red-950/30",
    resumen: "Aprende a usar el caso acusativo para el objeto directo: artículos y pronombres.",
    explicacion: `
      <p>El <strong>acusativo</strong> marca el objeto directo de la oración: ¿<strong>Wen oder was?</strong> (¿A quién o qué?).</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Artículo</th><th class="text-left p-1">Nominativo</th><th class="text-left p-1">Acusativo</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">Definido masc.</td><td class="p-1">der</td><td class="p-1"><strong>den</strong></td><td class="p-1">Ich sehe <strong>den</strong> Mann.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Definido fem.</td><td class="p-1">die</td><td class="p-1"><strong>die</strong></td><td class="p-1">Ich sehe <strong>die</strong> Frau.</td></tr>
        <tr><td class="p-1">Definido neutro</td><td class="p-1">das</td><td class="p-1"><strong>das</strong></td><td class="p-1">Ich sehe <strong>das</strong> Kind.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Indefinido masc.</td><td class="p-1">ein</td><td class="p-1"><strong>einen</strong></td><td class="p-1">Ich habe <strong>einen</strong> Hund.</td></tr>
        <tr><td class="p-1">Indefinido fem.</td><td class="p-1">eine</td><td class="p-1"><strong>eine</strong></td><td class="p-1">Ich habe <strong>eine</strong> Katze.</td></tr>
        <tr class="bg-gray-800"><td class="p-1">Indefinido neutro</td><td class="p-1">ein</td><td class="p-1"><strong>ein</strong></td><td class="p-1">Ich habe <strong>ein</strong> Auto.</td></tr>
        <tr><td class="p-1">Negación masc.</td><td class="p-1">kein</td><td class="p-1"><strong>keinen</strong></td><td class="p-1">Ich habe <strong>keinen</strong> Hund.</td></tr>
      </table>
      <p class="mt-2 font-semibold">Pronombres personales en acusativo:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>ich → <strong>mich</strong>, du → <strong>dich</strong>, er → <strong>ihn</strong>, sie → <strong>sie</strong>, es → <strong>es</strong>, wir → <strong>uns</strong>, ihr → <strong>euch</strong>, sie → <strong>sie</strong>, Sie → <strong>Sie</strong></li>
      </ul>
      <p class="mt-2"><strong>Solo cambia el masculino.</strong> Femenino, neutro y plural son iguales en nominativo y acusativo.</p>
    `,
    ejemplos: [
      "Ich sehe den Mann. (Veo al hombre.) – der → den",
      "Ich sehe die Frau. (Veo a la mujer.) – die = die",
      "Ich sehe das Kind. (Veo al niño.) – das = das",
      "Ich habe einen Hund. (Tengo un perro.) – ein → einen",
      "Ich habe kein Geld. (No tengo dinero.) – kein = kein",
      "Er liebt mich. (Él me ama.) – mich = a mí",
      "Wir besuchen euch. (Os visitamos.) – euch = a vosotros"
    ],
    tips: [
      "Solo el masculino cambia en acusativo: der → den, ein → einen, kein → keinen.",
      "Verbos de percepción (sehen, hören) y posesión (haben) siempre llevan objeto en acusativo.",
      "Artículo definido plural en acusativo: die (igual que nominativo, ¡sin cambio!)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich sehe ___ Mann.", respuesta: "den", opciones: null, traduccion: "Veo al hombre.", pista: "der → den en acusativo", explicacion: "der Mann (nom.) → den Mann (acus.)." },
        { tipo: "opcion", frase: "Sie kauft ___ Lampe.", respuesta: "die", opciones: ["die", "den", "das"], traduccion: "Ella compra la lámpara.", pista: null, explicacion: "Femenino: die Lampe (nom.) = die Lampe (acus.)." },
        { tipo: "hueco", frase: "Hast du ___ Bruder?", respuesta: "einen", opciones: null, traduccion: "¿Tienes un hermano?", pista: "ein → einen", explicacion: "ein Bruder (nom.) → einen Bruder (acus.)." },
        { tipo: "hueco", frase: "Ich trinke ___ Wasser.", respuesta: "das", opciones: null, traduccion: "Bebo el agua.", pista: "das no cambia", explicacion: "Neutro: das Wasser = das Wasser." },
        { tipo: "opcion", frase: "Er hat ___ Auto.", respuesta: "kein", opciones: ["kein", "keinen", "keine"], traduccion: "Él no tiene coche.", pista: null, explicacion: "das Auto (neutro): kein Auto." },
        { tipo: "hueco", frase: "Sie liebt ___ (a él).", respuesta: "ihn", opciones: null, traduccion: "Ella lo ama.", pista: "pronombre acusativo de er", explicacion: "er → ihn en acusativo." },
        { tipo: "hueco", frase: "Kannst du ___ (a mí) hören?", respuesta: "mich", opciones: null, traduccion: "¿Puedes oírme?", pista: "pronombre acusativo de ich", explicacion: "ich → mich." },
        { tipo: "opcion", frase: "Wir besuchen ___ (a vosotros).", respuesta: "euch", opciones: ["euch", "uns", "sie"], traduccion: "Os visitamos.", pista: null, explicacion: "ihr → euch en acusativo." },
        { tipo: "hueco", frase: "Ich habe ___ Schwester.", respuesta: "eine", opciones: null, traduccion: "Tengo una hermana.", pista: "eine no cambia", explicacion: "Femenino indefinido: eine Schwester." },
        { tipo: "hueco", frase: "Siehst du ___ Kinder?", respuesta: "die", opciones: null, traduccion: "¿Ves a los niños?", pista: "plural die no cambia", explicacion: "die Kinder (plural) = die Kinder (acus.)." }
      ]
    },
    flashcards: [
      { cara: "der → den", dorso: "Ich sehe den Mann." },
      { cara: "ein → einen", dorso: "Ich habe einen Hund." },
      { cara: "kein → keinen (masc.)", dorso: "Ich habe keinen Hund." },
      { cara: "ich → mich", dorso: "Er liebt mich." },
      { cara: "du → dich", dorso: "Ich liebe dich." },
      { cara: "er → ihn", dorso: "Sie sucht ihn." }
    ]
  },
  {
    id: "a1_2_zeitpraepositionen",
    nivel: "A1.2",
    titulo: "Preposiciones de tiempo",
    icono: "🕐",
    colorBorde: "border-teal-500",
    bg: "bg-teal-950/30",
    resumen: "Aprende a usar am, um, im, von...bis, seit para expresar cuándo sucede algo.",
    explicacion: `
      <p>Las preposiciones de tiempo indican <strong>cuándo</strong> ocurre una acción.</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Preposición</th><th class="text-left p-1">Uso</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1"><strong>um</strong></td><td class="p-1">horas exactas</td><td class="p-1">um 8 Uhr</td></tr>
        <tr class="bg-gray-800"><td class="p-1"><strong>am</strong></td><td class="p-1">días, fechas</td><td class="p-1">am Montag, am 1. Mai</td></tr>
        <tr><td class="p-1"><strong>im</strong></td><td class="p-1">meses, estaciones</td><td class="p-1">im Januar, im Sommer</td></tr>
        <tr class="bg-gray-800"><td class="p-1"><strong>in</strong></td><td class="p-1">período futuro</td><td class="p-1">in zwei Tagen (dentro de 2 días)</td></tr>
        <tr><td class="p-1"><strong>von...bis</strong></td><td class="p-1">de...a</td><td class="p-1">von 9 bis 17 Uhr</td></tr>
        <tr class="bg-gray-800"><td class="p-1"><strong>seit</strong></td><td class="p-1">desde (hasta ahora)</td><td class="p-1">seit 2020, seit einem Jahr</td></tr>
        <tr><td class="p-1"><strong>ab</strong></td><td class="p-1">a partir de</td><td class="p-1">ab morgen, ab 10 Uhr</td></tr>
      </table>
      <p class="mt-2">Reglas mnemotécnicas: <strong>um</strong> para horas, <strong>am</strong> para días → "umA" → "a la hora, al día". <strong>im</strong> para meses/estaciones → "im Januar".</p>
      <p><strong>In</strong> + tiempo en el futuro: in einer Woche (dentro de una semana). No confundir con inglés "in January" que se dice "im Januar".</p>
    `,
    ejemplos: [
      "Der Unterricht beginnt um 9 Uhr. (La clase empieza a las 9.)",
      "Am Montag gehe ich ins Kino. (El lunes voy al cine.)",
      "Im Sommer fahren wir nach Spanien. (En verano vamos a España.)",
      "Ich komme in fünf Minuten. (Vengo en cinco minutos.)",
      "Ich arbeite von 9 bis 17 Uhr. (Trabajo de 9 a 5.)",
      "Seit einem Jahr lerne ich Deutsch. (Desde hace un año aprendo alemán.)",
      "Ab nächster Woche mache ich Sport. (A partir de la próxima semana haré deporte.)"
    ],
    tips: [
      "um = hora (um 8 Uhr), am = día (am Montag), im = mes/estación (im Januar).",
      "Para fechas: am + ordinal + mes: am 1. Mai, am 15. August.",
      "Seit rige dativo y se usa con presente para acciones que empezaron en el pasado y continúan."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Der Film beginnt ___ 20 Uhr.", respuesta: "um", opciones: null, traduccion: "La película empieza a las 20.", pista: "hora", explicacion: "Horas → um." },
        { tipo: "opcion", frase: "___ Montag habe ich frei.", respuesta: "Am", opciones: ["Am", "Um", "Im"], traduccion: "El lunes tengo libre.", pista: null, explicacion: "Días de la semana → am." },
        { tipo: "hueco", frase: "___ Januar ist es kalt.", respuesta: "Im", opciones: null, traduccion: "En enero hace frío.", pista: "mes", explicacion: "Meses → im." },
        { tipo: "hueco", frase: "Ich arbeite ___ 8 ___ 16 Uhr.", respuesta: "von bis", opciones: null, traduccion: "Trabajo de 8 a 16.", pista: "de...a", explicacion: "von...bis = de...a." },
        { tipo: "opcion", frase: "___ Sommer fahre ich ans Meer.", respuesta: "Im", opciones: ["Im", "Am", "Um"], traduccion: "En verano voy al mar.", pista: null, explicacion: "Estaciones → im." },
        { tipo: "hueco", frase: "Ich lerne ___ einem Jahr Deutsch.", respuesta: "seit", opciones: null, traduccion: "Aprendo alemán desde hace un año.", pista: "desde (con dativo)", explicacion: "seit + dativo para duración hasta ahora." },
        { tipo: "hueco", frase: "___ morgen beginnt die Schule.", respuesta: "Ab", opciones: null, traduccion: "A partir de mañana empieza la escuela.", pista: "a partir de", explicacion: "ab = a partir de." },
        { tipo: "opcion", frase: "Der Kurs beginnt ___ 1. September.", respuesta: "am", opciones: ["am", "im", "um"], traduccion: "El curso empieza el 1 de septiembre.", pista: null, explicacion: "Fechas concretas → am." },
        { tipo: "hueco", frase: "___ Winter schneit es viel.", respuesta: "Im", opciones: null, traduccion: "En invierno nieva mucho.", pista: "estación", explicacion: "Estaciones → im." },
        { tipo: "hueco", frase: "___ einer Woche fliege ich nach Berlin.", respuesta: "In", opciones: null, traduccion: "Dentro de una semana vuelo a Berlín.", pista: "futuro", explicacion: "in + tiempo futuro." }
      ]
    },
    flashcards: [
      { cara: "um + hora", dorso: "um 8 Uhr, um 14:30" },
      { cara: "am + día", dorso: "am Montag, am Dienstag" },
      { cara: "im + mes/estación", dorso: "im Januar, im Sommer" },
      { cara: "in + futuro", dorso: "in zwei Tagen, in einer Woche" },
      { cara: "seit + dativo (desde)", dorso: "seit 2020, seit einem Jahr" },
      { cara: "von...bis", dorso: "von 9 bis 17 Uhr" }
    ]
  },
  {
    id: "a1_2_perfekt",
    nivel: "A1.2",
    titulo: "Perfekt básico",
    icono: "✅",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "Forma el pasado con haben/sein + participio para contar lo que has hecho hoy o esta semana.",
    explicacion: `
      <p>El <strong>Perfekt</strong> es el tiempo del pasado más usado en alemán hablado. Se forma con: <strong>haben/sein + Partizip II</strong>.</p>
      <p class="mt-2 font-semibold">Formación del Partizip II (participio):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Verbos regulares:</strong> ge + raíz + t → machen → <strong>ge</strong>mach<strong>t</strong></li>
        <li><strong>Verbos en -ieren:</strong> sin ge- → studieren → studier<strong>t</strong></li>
        <li><strong>Verbos separables:</strong> prefijo + ge + raíz + t → aufmachen → auf<strong>ge</strong>mach<strong>t</strong></li>
        <li><strong>Verbos inseparables (be-, er-, ver-, zer-, ent-, ge-, miss-):</strong> sin ge- → besuchen → besuch<strong>t</strong></li>
      </ul>
      <p class="mt-2 font-semibold">¿Haben o sein?</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>sein</strong>: verbos de movimiento de un punto a otro (gehen, fahren, fliegen, laufen) y cambio de estado (aufwachen, einschlafen, werden)</li>
        <li><strong>haben</strong>: todos los demás (más del 90%)</li>
      </ul>
      <p class="mt-2">Estructura: sujeto + haben/sein conjugado + ... + <strong>Partizip II al final</strong>.</p>
    `,
    ejemplos: [
      "Ich habe einen Film gesehen. (He visto una película.)",
      "Du hast viel gearbeitet. (Has trabajado mucho.)",
      "Er ist nach Berlin gefahren. (Él ha viajado a Berlín.)",
      "Wir sind früh aufgestanden. (Nos hemos levantado temprano.)",
      "Sie hat in München studiert. (Ella ha estudiado en Múnich.)",
      "Ich habe die Tür aufgemacht. (He abierto la puerta.)",
      "Er ist um 6 Uhr aufgewacht. (Él se ha despertado a las 6.)"
    ],
    tips: [
      "La mayoría de verbos usan haben. Los de movimiento de A→B y cambio de estado usan sein.",
      "El Partizip II siempre va al FINAL de la oración (como el infinitivo con modales).",
      "Verbos en -ieren (studieren, telefonieren) NUNCA llevan ge-."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ einen Film ___. (sehen)", respuesta: "habe gesehen", opciones: null, traduccion: "He visto una película.", pista: "haben + gesehen", explicacion: "sehen → hat gesehen (irregular)." },
        { tipo: "opcion", frase: "Du ___ viel ___. (arbeiten)", respuesta: "hast gearbeitet", opciones: ["hast gearbeitet", "bist gearbeitet", "hat gearbeitet"], traduccion: "Has trabajado mucho.", pista: null, explicacion: "arbeiten → hat gearbeitet (regular)." },
        { tipo: "hueco", frase: "Er ___ nach Berlin ___. (fahren)", respuesta: "ist gefahren", opciones: null, traduccion: "Él ha viajado a Berlín.", pista: "movimiento → sein", explicacion: "fahren → ist gefahren (sein, irregular)." },
        { tipo: "hueco", frase: "Wir ___ früh ___. (aufstehen)", respuesta: "sind aufgestanden", opciones: null, traduccion: "Nos hemos levantado temprano.", pista: "aufstehen con sein", explicacion: "aufstehen → ist aufgestanden (separable + sein)." },
        { tipo: "opcion", frase: "Sie ___ in München ___. (studieren)", respuesta: "hat studiert", opciones: ["hat studiert", "ist studiert", "hat gestudiert"], traduccion: "Ella ha estudiado en Múnich.", pista: null, explicacion: "studieren (sin ge-): hat studiert." },
        { tipo: "hueco", frase: "Ich ___ die Tür ___. (aufmachen)", respuesta: "habe aufgemacht", opciones: null, traduccion: "He abierto la puerta.", pista: "aufmachen con haben", explicacion: "aufmachen → hat aufgemacht (separable, regular)." },
        { tipo: "hueco", frase: "Er ___ um 6 Uhr ___. (aufwachen)", respuesta: "ist aufgewacht", opciones: null, traduccion: "Él se ha despertado a las 6.", pista: "cambio de estado → sein", explicacion: "aufwachen → ist aufgewacht (separable + sein)." },
        { tipo: "opcion", frase: "Ihr ___ im Restaurant ___. (essen)", respuesta: "habt gegessen", opciones: ["habt gegessen", "seid gegessen", "habt geesst"], traduccion: "Habéis comido en el restaurante.", pista: null, explicacion: "essen → hat gegessen (irregular)." },
        { tipo: "hueco", frase: "Ich ___ gestern nicht ___. (schlafen)", respuesta: "habe geschlafen", opciones: null, traduccion: "Ayer no he dormido.", pista: "haben", explicacion: "schlafen → hat geschlafen (cambio vocálico)." },
        { tipo: "hueco", frase: "Meine Oma ___ zu Besuch ___. (kommen)", respuesta: "ist gekommen", opciones: null, traduccion: "Mi abuela ha venido de visita.", pista: "movimiento → sein", explicacion: "kommen → ist gekommen (sein, irregular)." }
      ]
    },
    flashcards: [
      { cara: "haben + Partizip II", dorso: "Ich habe gegessen, ich habe gearbeitet." },
      { cara: "sein + Partizip II", dorso: "Ich bin gefahren, ich bin aufgestanden." },
      { cara: "ge + raíz + t (regular)", dorso: "machen → gemacht, lernen → gelernt" },
      { cara: "Sin ge- (be-, er-, ver-, -ieren)", dorso: "besuchen → besucht, studieren → studiert" },
      { cara: "Separable: prefijo + ge + raíz + t", dorso: "aufmachen → aufgemacht, einkaufen → eingekauft" },
      { cara: "Movimiento A→B: sein", dorso: "gehen, fahren, fliegen, laufen" }
    ]
  },
  {
    id: "a1_2_possessiv",
    nivel: "A1.2",
    titulo: "Adjetivos posesivos",
    icono: "👜",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "mein, dein, sein, ihr, unser, euer, Ihr – los determinantes posesivos en nominativo y acusativo.",
    explicacion: `
      <p>Los adjetivos posesivos indican posesión y se declinan según el <strong>género</strong>, <strong>número</strong> y <strong>caso</strong> del sustantivo que acompañan (no del poseedor).</p>
      <table class="w-full text-sm mt-2 border border-gray-600">
        <tr class="bg-gray-700"><th class="text-left p-1">Poseedor</th><th class="text-left p-1">Masc./Neutro</th><th class="text-left p-1">Fem./Plural</th><th class="text-left p-1">Ejemplo</th></tr>
        <tr><td class="p-1">ich</td><td class="p-1">mein</td><td class="p-1">meine</td><td class="p-1">mein Bruder, meine Schwester</td></tr>
        <tr class="bg-gray-800"><td class="p-1">du</td><td class="p-1">dein</td><td class="p-1">deine</td><td class="p-1">dein Auto, deine Katze</td></tr>
        <tr><td class="p-1">er</td><td class="p-1">sein</td><td class="p-1">seine</td><td class="p-1">sein Hund, seine Frau</td></tr>
        <tr class="bg-gray-800"><td class="p-1">sie (ella)</td><td class="p-1">ihr</td><td class="p-1">ihre</td><td class="p-1">ihr Kind, ihre Arbeit</td></tr>
        <tr><td class="p-1">es</td><td class="p-1">sein</td><td class="p-1">seine</td><td class="p-1">sein Spielzeug, seine Farbe</td></tr>
        <tr class="bg-gray-800"><td class="p-1">wir</td><td class="p-1">unser</td><td class="p-1">unsere</td><td class="p-1">unser Haus, unsere Stadt</td></tr>
        <tr><td class="p-1">ihr</td><td class="p-1">euer</td><td class="p-1">eure</td><td class="p-1">euer Lehrer, eure Klasse</td></tr>
        <tr class="bg-gray-800"><td class="p-1">sie (ellos)</td><td class="p-1">ihr</td><td class="p-1">ihre</td><td class="p-1">ihr Beruf, ihre Bücher</td></tr>
        <tr><td class="p-1">Sie (usted)</td><td class="p-1">Ihr</td><td class="p-1">Ihre</td><td class="p-1">Ihr Name, Ihre Adresse</td></tr>
      </table>
      <p class="mt-2">En <strong>acusativo</strong>, solo cambia el masculino: mein → <strong>meinen</strong>, dein → <strong>deinen</strong>, etc. Femenino y neutro: igual que nominativo.</p>
      <p><strong>Euer</strong> pierde una -e- al añadir terminaciones: euer → <strong>eure</strong> (femenino), euren (acusativo masc.).</p>
    `,
    ejemplos: [
      "Das ist mein Bruder. (Este es mi hermano.)",
      "Wo ist deine Schwester? (¿Dónde está tu hermana?)",
      "Sein Auto ist neu. (Su coche [de él] es nuevo.)",
      "Ihre Katze heißt Minka. (Su gata [de ella] se llama Minka.)",
      "Unser Haus ist groß. (Nuestra casa es grande.)",
      "Eure Kinder sind nett. (Vuestros hijos son amables.)",
      "Ich sehe meinen Vater. (Veo a mi padre.) – acusativo masc."
    ],
    tips: [
      "El posesivo concuerda con la COSA POSEÍDA, no con el poseedor: sein Auto (el coche de él), ihr Auto (el coche de ella).",
      "Euer pierde la -e-: eure Mutter (vuestra madre), euren Vater (a vuestro padre).",
      "Ihr (de ella) se confunde con ihr (de ellos) y Ihr (de usted). La mayúscula de Sie/Ihr es la única pista visual."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das ist ___ Bruder. (mi)", respuesta: "mein", opciones: null, traduccion: "Este es mi hermano.", pista: "masculino → mein", explicacion: "Bruder es masculino: mein Bruder." },
        { tipo: "opcion", frase: "Wo ist ___ Schwester? (tu)", respuesta: "deine", opciones: ["dein", "deine", "deinen"], traduccion: "¿Dónde está tu hermana?", pista: null, explicacion: "Schwester es femenino: deine Schwester." },
        { tipo: "hueco", frase: "___ Auto ist neu. (de él)", respuesta: "Sein", opciones: null, traduccion: "Su coche es nuevo.", pista: "er → sein, Auto es neutro", explicacion: "Auto es neutro: sein Auto." },
        { tipo: "hueco", frase: "___ Katze ist süß. (de ella)", respuesta: "Ihre", opciones: null, traduccion: "Su gata es bonita.", pista: "sie (ella) → ihr + fem.", explicacion: "Katze es femenino: ihre Katze." },
        { tipo: "opcion", frase: "___ Haus ist groß. (nuestro)", respuesta: "Unser", opciones: ["Unser", "Unsere", "Unseren"], traduccion: "Nuestra casa es grande.", pista: null, explicacion: "Haus es neutro: unser Haus." },
        { tipo: "hueco", frase: "___ Kinder sind laut. (vuestros)", respuesta: "Eure", opciones: null, traduccion: "Vuestros hijos son ruidosos.", pista: "euer → eure (plural)", explicacion: "Kinder es plural: eure Kinder." },
        { tipo: "hueco", frase: "Ich sehe ___ Vater. (a mi padre)", respuesta: "meinen", opciones: null, traduccion: "Veo a mi padre.", pista: "acusativo masculino → meinen", explicacion: "Vater en acusativo: meinen Vater." },
        { tipo: "opcion", frase: "Er liebt ___ Frau. (a su esposa)", respuesta: "seine", opciones: ["seine", "seinen", "sein"], traduccion: "Él ama a su esposa.", pista: null, explicacion: "Frau es femenino: seine Frau (acus. = nom. en fem.)." },
        { tipo: "hueco", frase: "Ist das ___ Buch? (de usted)", respuesta: "Ihr", opciones: null, traduccion: "¿Es su libro?", pista: "Sie formal → Ihr", explicacion: "Buch es neutro: Ihr Buch." },
        { tipo: "hueco", frase: "Ich besuche ___ Eltern. (a mis padres)", respuesta: "meine", opciones: null, traduccion: "Visito a mis padres.", pista: "plural → meine", explicacion: "Eltern es plural: meine Eltern (acus. = nom. en plural)." }
      ]
    },
    flashcards: [
      { cara: "mein / meine", dorso: "mein Bruder, meine Schwester" },
      { cara: "dein / deine", dorso: "dein Auto, deine Katze" },
      { cara: "sein / seine (de él)", dorso: "sein Hund, seine Frau" },
      { cara: "ihr / ihre (de ella)", dorso: "ihr Kind, ihre Arbeit" },
      { cara: "unser / unsere", dorso: "unser Haus, unsere Stadt" },
      { cara: "euer → eure", dorso: "euer Lehrer, eure Klasse" }
    ]
  }
];