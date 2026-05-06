// src/features/maestros/contenido/contenidoA1_2.jsx
// Contenido gramatical nivel A1.2 - Principiante básico
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
    resumen: "Aprende a expresar posibilidad, obligación, permiso y deseo con verbos modales.",
    explicacion: `
      <p>Los <strong>verbos modales</strong> modifican el significado del verbo principal. Van en <strong>segunda posición</strong> y el verbo principal al <strong>final</strong> en infinitivo.</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left text-indigo-300">Modal</th><th class="text-left text-indigo-300">Significado</th><th class="text-left text-indigo-300">Ejemplo</th></tr>
        <tr><td>können</td><td>poder (habilidad)</td><td>Ich <strong>kann</strong> schwimmen.</td></tr>
        <tr><td>müssen</td><td>tener que (obligación)</td><td>Wir <strong>müssen</strong> lernen.</td></tr>
        <tr><td>dürfen</td><td>poder (permiso)</td><td>Du <strong>darfst</strong> hereinkommen.</td></tr>
        <tr><td>sollen</td><td>deber (recomendación)</td><td>Er <strong>soll</strong> zum Arzt gehen.</td></tr>
        <tr><td>wollen</td><td>querer (deseo)</td><td>Sie <strong>will</strong> tanzen.</td></tr>
        <tr><td>mögen</td><td>gustar</td><td>Ich <strong>mag</strong> Eis.</td></tr>
      </table>
      <p class="mt-2">Conjugación especial (cambio vocálico en singular):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>ich <strong>kann</strong> / du <strong>kannst</strong> / er <strong>kann</strong> / wir können / ihr könnt / sie können</li>
        <li>ich <strong>muss</strong> / du <strong>musst</strong> / er <strong>muss</strong> / wir müssen / ihr müsst / sie müssen</li>
        <li>ich <strong>darf</strong> / du <strong>darfst</strong> / er <strong>darf</strong> / wir dürfen / ihr dürft / sie dürfen</li>
      </ul>
      <p class="mt-2"><strong>Möchten</strong> (quería/quisiera) es el Konjunktiv II de mögen y se usa para deseos corteses.</p>
    `,
    ejemplos: [
      "Ich kann Deutsch sprechen. (Puedo hablar alemán)",
      "Du musst die Hausaufgaben machen. (Debes hacer los deberes)",
      "Hier darf man nicht rauchen. (Aquí no se puede fumar)",
      "Wir wollen nach Berlin fahren. (Queremos viajar a Berlín)",
      "Ich möchte einen Kaffee, bitte. (Quisiera un café, por favor)"
    ],
    tips: [
      "💡 El orden: Modal conjugado + (opcional) + Infinitivo al final: Ich kann gut Deutsch sprechen.",
      "💡 müssen vs sollen: müssen = obligación real; sollen = recomendación externa",
      "💡 dürfen negativo = prohibición: 'Hier darf man nicht parken'"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la forma correcta del verbo modal",
      datos: [
        { pista: "Ich ___ (können) schwimmen.", respuesta: "kann" },
        { pista: "Du ___ (müssen) lernen.", respuesta: "musst" },
        { pista: "Er ___ (dürfen) nicht rauchen.", respuesta: "darf" },
        { pista: "Wir ___ (wollen) reisen.", respuesta: "wollen" },
        { pista: "___ (mögen) du Schokolade?", respuesta: "Magst" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich kann schwimmen.", error: "", correccion: "¡Perfecto! Orden correcto: modal + infinitivo." },
      { frase: "Er musst arbeiten.", error: "musst", correccion: "Er muss (3ª persona singular no lleva -st)." },
      { frase: "Wir können nicht kommen.", error: "", correccion: "¡Bien! Modal + nicht + infinitivo." }
    ]
  },
  {
    id: "a1_2_trennbar",
    nivel: "A1.2",
    titulo: "Verbos separables (trennbare Verben)",
    icono: "✂️",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    resumen: "Verbos con prefijos separables: ankommen, aufmachen, einkaufen...",
    explicacion: `
      <p>Los <strong>verbos separables</strong> tienen un prefijo que se <strong>separa</strong> del verbo en la oración principal y va al <strong>final</strong>.</p>
      <p class="mt-2">Prefijos separables comunes: <strong>an-, auf-, aus-, ein-, mit-, nach-, vor-, zu-, zurück-, weg-, los-, fest-, zusammen-</strong></p>
      <p class="mt-2">Ejemplo con <strong>aufmachen</strong> (abrir):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Ich <strong>mache</strong> die Tür <strong>auf</strong>. (Abro la puerta)</li>
        <li>Er <strong>macht</strong> das Fenster <strong>auf</strong>. (Él abre la ventana)</li>
      </ul>
      <p class="mt-2">En el <strong>Perfekt</strong>, el prefijo se une al verbo con <strong>ge-</strong> entre el prefijo y la raíz: <em>aufgemacht</em>, <em>eingekauft</em>.</p>
      <p class="mt-2">En oraciones subordinadas con <strong>dass/weil</strong>, el verbo separable NO se separa y va completo al final: <em>...weil ich die Tür <strong>aufmache</strong></em>.</p>
    `,
    ejemplos: [
      "Ich stehe um 7 Uhr auf. (Me levanto a las 7)",
      "Wir kaufen im Supermarkt ein. (Compramos en el supermercado)",
      "Der Zug kommt um 10 Uhr an. (El tren llega a las 10)",
      "Sie ruft mich morgen an. (Ella me llama mañana)",
      "Hörst du mir zu? (¿Me escuchas?)"
    ],
    tips: [
      "💡 El prefijo tónico se pronuncia con énfasis: <strong>AUF</strong>stehen, <strong>EIN</strong>kaufen",
      "💡 En imperativo, el prefijo va al final: 'Mach die Tür auf!'",
      "💡 Con modales: prefijo NO se separa: 'Ich muss aufstehen.' (no 'Ich stehe auf müssen.')"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Escribe la forma conjugada del verbo separable",
      datos: [
        { pista: "Ich ___ (aufstehen) um 7 Uhr.", respuesta: "stehe auf" },
        { pista: "Er ___ (ankommen) morgen.", respuesta: "kommt an" },
        { pista: "Wir ___ (einkaufen) im Supermarkt.", respuesta: "kaufen ein" },
        { pista: "Du ___ (anrufen) deine Mutter.", respuesta: "rufst an" },
        { pista: "Sie ___ (zumachen) die Tür.", respuesta: "macht zu" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich aufstehe um 7 Uhr.", error: "aufstehe", correccion: "Ich stehe...auf (el prefijo va al final: 'stehe...auf')" },
      { frase: "Er kommt an morgen.", error: "an morgen", correccion: "Er kommt morgen an (el prefijo va al final de la oración)" },
      { frase: "Wir kaufen ein.", error: "", correccion: "¡Correcto! Verbo conjugado + prefijo al final." }
    ]
  },
  {
    id: "a1_2_akkusativ",
    nivel: "A1.2",
    titulo: "Acusativo (Akkusativ)",
    icono: "🎯",
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    resumen: "El caso acusativo para el objeto directo de la oración.",
    explicacion: `
      <p>El <strong>acusativo</strong> es el caso del <strong>objeto directo</strong> — la persona o cosa que <strong>recibe la acción</strong> del verbo.</p>
      <p class="mt-2">Artículos en acusativo:</p>
      <table class="w-full text-sm mt-2">
        <tr><th></th><th>Masculino</th><th>Femenino</th><th>Neutro</th><th>Plural</th></tr>
        <tr><td>Nominativo</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
        <tr><td>Acusativo</td><td><strong>den</strong></td><td>die</td><td>das</td><td>die</td></tr>
      </table>
      <p class="mt-2"><strong>Solo el masculino cambia</strong>: der → den. Femenino, neutro y plural se quedan igual.</p>
      <p class="mt-2">Pronombres en acusativo:</p>
      <table class="w-full text-sm">
        <tr><th>Nominativo</th><td>ich</td><td>du</td><td>er</td><td>sie</td><td>es</td><td>wir</td><td>ihr</td><td>sie/Sie</td></tr>
        <tr><th>Acusativo</th><td><strong>mich</strong></td><td><strong>dich</strong></td><td><strong>ihn</strong></td><td><strong>sie</strong></td><td><strong>es</strong></td><td><strong>uns</strong></td><td><strong>euch</strong></td><td><strong>sie/Sie</strong></td></tr>
      </table>
      <p class="mt-2">Verbos que SIEMPRE llevan acusativo: <strong>haben, essen, trinken, sehen, hören, lieben, kaufen, nehmen, brauchen, kennen</strong>.</p>
    `,
    ejemplos: [
      "Ich habe <strong>den</strong> Hund. (Tengo el perro — der → den)",
      "Sie sieht <strong>die</strong> Katze. (Ella ve la gata — sin cambio)",
      "Wir kaufen <strong>das</strong> Brot. (Compramos el pan — sin cambio)",
      "Ich liebe <strong>dich</strong>. (Te amo — pronombre acusativo)",
      "Er braucht <strong>einen</strong> Stift. (Él necesita un bolígrafo — ein → einen)"
    ],
    tips: [
      "💡 Pregunta para acusativo: <strong>Wen/Was?</strong> (¿A quién/Qué?)",
      "💡 Solo el masculino cambia: recuerda 'der' → 'den' y 'ein' → 'einen'",
      "💡 Los pronombres mich/dich son clave para conversaciones cotidianas"
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Elige la forma correcta del artículo en acusativo",
      datos: [
        { pista: "Ich sehe ___ (der) Mann.", opciones: ["der", "den", "dem", "des"], respuesta: "den" },
        { pista: "Sie hat ___ (die) Blume.", opciones: ["die", "der", "den", "das"], respuesta: "die" },
        { pista: "Wir essen ___ (das) Brot.", opciones: ["das", "den", "dem", "des"], respuesta: "das" },
        { pista: "Ich brauche ___ (ein) Bleistift.", opciones: ["ein", "einen", "einer", "einem"], respuesta: "einen" },
        { pista: "Er liebt ___ (sie - pronoun).", opciones: ["sie", "ihn", "es", "ihr"], respuesta: "sie" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich habe der Hund.", error: "der", correccion: "Ich habe den Hund (acusativo masculino: der → den)." },
      { frase: "Sie sieht den Katze.", error: "den", correccion: "Sie sieht die Katze (femenino no cambia en acusativo)." },
      { frase: "Ich liebe du.", error: "du", correccion: "Ich liebe dich (pronombre acusativo: du → dich)." }
    ]
  },
  {
    id: "a1_2_praepositionen_zeit",
    nivel: "A1.2",
    titulo: "Preposiciones de tiempo",
    icono: "⏰",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "um, am, im, von...bis, seit, ab para expresar tiempo.",
    explicacion: `
      <p>Las <strong>preposiciones de tiempo</strong> en alemán son muy específicas. Aquí las principales:</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left text-indigo-300">Preposición</th><th class="text-left text-indigo-300">Uso</th><th class="text-left text-indigo-300">Ejemplo</th></tr>
        <tr><td><strong>um</strong></td><td>horas exactas</td><td>um 8 Uhr (a las 8)</td></tr>
        <tr><td><strong>am</strong></td><td>días y partes del día</td><td>am Montag, am Abend</td></tr>
        <tr><td><strong>im</strong></td><td>meses, estaciones, años</td><td>im Januar, im Sommer, im 2024</td></tr>
        <tr><td><strong>von...bis</strong></td><td>intervalos</td><td>von 9 bis 17 Uhr</td></tr>
        <tr><td><strong>seit</strong></td><td>desde (acción continua)</td><td>seit 2020 (desde 2020)</td></tr>
        <tr><td><strong>ab</strong></td><td>desde (futuro)</td><td>ab morgen (desde mañana)</td></tr>
      </table>
      <p class="mt-2"><strong>Im</strong> = in + dem. <strong>Am</strong> = an + dem.</p>
      <p class="mt-1">Excepción: <strong>in der Nacht</strong> (femenino: die Nacht → in der), <strong>in der Frühe</strong>.</p>
      <p class="mt-1">Para fechas exactas (día+mes): <strong>am 15. Mai</strong> (el 15 de mayo).</p>
    `,
    ejemplos: [
      "Der Kurs beginnt <strong>um</strong> 10 Uhr. (El curso empieza a las 10)",
      "<strong>Am</strong> Montag habe ich frei. (El lunes tengo libre)",
      "<strong>Im</strong> Winter schneit es. (En invierno nieva)",
      "Ich arbeite <strong>von</strong> 9 <strong>bis</strong> 17 Uhr. (Trabajo de 9 a 17h)",
      "<strong>Seit</strong> 2022 lerne ich Deutsch. (Desde 2022 aprendo alemán)"
    ],
    tips: [
      "💡 um + hora exacta / am + día / im + mes: ¡como un mantra!",
      "💡 'am Wochenende' (el fin de semana) pero 'an Weihnachten' (en Navidad)",
      "💡 seit = acción que empezó y continúa. Für = duración futura/pasada completa."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con um, am o im",
      datos: [
        { pista: "___ 8 Uhr", respuesta: "Um" },
        { pista: "___ Montag", respuesta: "Am" },
        { pista: "___ Sommer", respuesta: "Im" },
        { pista: "___ Januar", respuesta: "Im" },
        { pista: "___ Abend", respuesta: "Am" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich komme im 8 Uhr.", error: "im", correccion: "Ich komme um 8 Uhr (horas exactas → um)." },
      { frase: "Am Sommer fahre ich nach Spanien.", error: "Am", correccion: "Im Sommer (estaciones → im)." },
      { frase: "Seit Montag lerne ich.", error: "", correccion: "¡Correcto! Seit + punto de inicio." }
    ]
  },
  {
    id: "a1_2_perfekt",
    nivel: "A1.2",
    titulo: "Perfekt básico (Pasado conversacional)",
    icono: "🕰️",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "El tiempo pasado más usado en alemán hablado: haben/sein + Partizip II.",
    explicacion: `
      <p>El <strong>Perfekt</strong> es el tiempo pasado más común en alemán hablado. Se forma con:</p>
      <p class="mt-2 text-center"><strong>haben/sein (presente) + Partizip II (al final)</strong></p>
      <p class="mt-2"><strong>¿Con haben o sein?</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>sein</strong> → verbos de movimiento (gehen, fahren, kommen) y cambio de estado (aufwachen, sterben)</li>
        <li><strong>haben</strong> → el resto (machen, spielen, essen, sehen...)</li>
      </ul>
      <p class="mt-2">Formación del Partizip II:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Verbos regulares: <strong>ge-</strong> + raíz + <strong>-t</strong>: <em>machen → gemacht</em></li>
        <li>Verbos en -ieren: <strong>sin ge-</strong> + raíz + <strong>-t</strong>: <em>studieren → studiert</em></li>
        <li>Verbos separables: prefijo + <strong>ge-</strong> + raíz + <strong>-t</strong>: <em>einkaufen → eingekauft</em></li>
      </ul>
      <p class="mt-2">Partizipios irregulares comunes: <em>gegangen (gehen), gefahren (fahren), gesehen (sehen), gegessen (essen), geschrieben (schreiben)</em>.</p>
    `,
    ejemplos: [
      "Ich habe gestern gearbeitet. (Ayer trabajé)",
      "Wir sind nach Berlin gefahren. (Viajamos a Berlín)",
      "Hast du das Buch gelesen? (¿Leíste el libro?)",
      "Sie ist um 8 Uhr aufgestanden. (Ella se levantó a las 8)",
      "Ich habe meine Hausaufgaben gemacht. (Hice mis deberes)"
    ],
    tips: [
      "💡 Los verbos sein/bleiben/werden usan sein como auxiliar: 'Ich bin gewesen'",
      "💡 En alemán hablado, el Perfekt es más común que el Präteritum",
      "💡 Recuerda: verbo separable → 'eingekauft', no 'geeinkauft'"
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Forma el Perfekt: escribe haben/sein + Partizip II",
      datos: [
        { pista: "Ich ___ (kochen).", respuesta: "habe gekocht" },
        { pista: "Er ___ (gehen).", respuesta: "ist gegangen" },
        { pista: "Wir ___ (spielen).", respuesta: "haben gespielt" },
        { pista: "Sie ___ (einkaufen).", respuesta: "hat eingekauft" },
        { pista: "Du ___ (kommen).", respuesta: "bist gekommen" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich habe gehen.", error: "gehen", correccion: "Ich bin gegangen (gehen usa 'sein' y Partizip II es 'gegangen')." },
      { frase: "Er hat gekocht.", error: "", correccion: "¡Perfecto! Verbos que no son de movimiento → haben." },
      { frase: "Wir sind gefahren.", error: "", correccion: "¡Correcto! fahren (movimiento) → sein + gefahren." }
    ]
  },
  {
    id: "a1_2_possessiv",
    nivel: "A1.2",
    titulo: "Adjetivos posesivos",
    icono: "👤",
    colorBorde: "border-rose-500",
    bg: "bg-rose-950/30",
    resumen: "mein, dein, sein, ihr, unser, euer, Ihr para indicar posesión.",
    explicacion: `
      <p>Los <strong>adjetivos posesivos</strong> indican a quién pertenece algo. Se declinan como el artículo indefinido <strong>ein</strong>.</p>
      <table class="w-full text-sm mt-2">
        <tr><th>Persona</th><th>Posesivo</th><th>Ejemplo</th></tr>
        <tr><td>ich</td><td><strong>mein</strong></td><td>mein Buch (mi libro)</td></tr>
        <tr><td>du</td><td><strong>dein</strong></td><td>dein Hund (tu perro)</td></tr>
        <tr><td>er/es</td><td><strong>sein</strong></td><td>sein Auto (su coche de él)</td></tr>
        <tr><td>sie (ella)</td><td><strong>ihr</strong></td><td>ihre Tasche (su bolso de ella)</td></tr>
        <tr><td>wir</td><td><strong>unser</strong></td><td>unser Haus (nuestra casa)</td></tr>
        <tr><td>ihr</td><td><strong>euer</strong></td><td>euer Kind (vuestro hijo)</td></tr>
        <tr><td>sie/Sie</td><td><strong>ihr/Ihr</strong></td><td>ihr/Ihr Name (su nombre)</td></tr>
      </table>
      <p class="mt-2">Declinación en nominativo:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Masculino: <strong>mein</strong> Hund (mi perro)</li>
        <li>Femenino: <strong>meine</strong> Katze (mi gata)</li>
        <li>Neutro: <strong>mein</strong> Haus (mi casa)</li>
        <li>Plural: <strong>meine</strong> Bücher (mis libros)</li>
      </ul>
      <p class="mt-2">En acusativo, el masculino añade <strong>-en</strong>: <em>meinen Hund, deinen Bruder</em>.</p>
    `,
    ejemplos: [
      "Das ist <strong>mein</strong> Vater. (Ese es mi padre)",
      "<strong>Deine</strong> Schwester ist nett. (Tu hermana es simpática)",
      "Er hat <strong>seinen</strong> Schlüssel verloren. (Él perdió su llave)",
      "Wir lieben <strong>unsere</strong> Stadt. (Amamos nuestra ciudad)",
      "Habt ihr <strong>eure</strong> Hausaufgaben gemacht? (¿Habéis hecho vuestros deberes?)"
    ],
    tips: [
      "💡 mein/dein/sein/ihr son como 'ein' pero con significado de posesión",
      "💡 En femenino y plural se añade -e: meine, deine, seine...",
      "💡 'euer' pierde la -e- cuando añade terminación: eure (nom. fem.), euren (acus. masc.)"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el posesivo correcto",
      datos: [
        { pista: "Das ist ___ (ich) Buch.", respuesta: "mein" },
        { pista: "___ (du) Auto ist blau.", respuesta: "Dein" },
        { pista: "Das ist ___ (sie - ella) Tasche.", respuesta: "ihre" },
        { pista: "Wo ist ___ (wir) Hotel?", respuesta: "unser" },
        { pista: "Habt ihr ___ (ihr) Geld?", respuesta: "euer" }
      ]
    },
    corrigeNovato: [
      { frase: "Das ist mein Mutter.", error: "mein", correccion: "Das ist meine Mutter (femenino → meine)." },
      { frase: "Dein Bruder ist groß.", error: "", correccion: "¡Correcto! Bruder es masculino → mein/dein/sein." },
      { frase: "Das ist seine Freundin.", error: "", correccion: "¡Bien! Freundin femenino → seine." }
    ]
  }
];