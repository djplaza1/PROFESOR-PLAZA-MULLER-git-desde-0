// src/features/maestros/contenido/contenidoA2_2.jsx
// Contenido gramatical nivel A2.2 - Básico avanzado
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

window.Muller.Maestros.A2_2 = [
  {
    id: "a2_2_verben_mit_praepositionen",
    nivel: "A2.2",
    titulo: "Verben mit festen Präpositionen",
    icono: "🔗",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Verbos alemanes que requieren preposiciones específicas (warten auf, sich freuen über, denken an).",
    explicacion: `
      <h3 class="text-lg font-bold text-cyan-400 mb-2">Verbos con preposiciones fijas</h3>
      <p class="mb-2">Muchos verbos alemanes exigen una preposición concreta para completar su significado. 
      Aprenderlas de memoria es clave junto con el caso (acusativo/dativo) que rigen.</p>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-cyan-900/50"><th class="border p-1">Verbo</th><th class="border p-1">Preposición</th><th class="border p-1">Caso</th><th class="border p-1">Ejemplo</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">warten</td><td class="border p-1">auf</td><td class="border p-1">Acusativo</td><td class="border p-1">Ich warte <strong>auf dich</strong>.</td></tr>
        <tr><td class="border p-1">sich freuen</td><td class="border p-1">auf/über</td><td class="border p-1">Acusativo</td><td class="border p-1">Ich freue mich <strong>auf</strong> den Urlaub.</td></tr>
        <tr><td class="border p-1">denken</td><td class="border p-1">an</td><td class="border p-1">Acusativo</td><td class="border p-1">Ich denke <strong>an dich</strong>.</td></tr>
        <tr><td class="border p-1">sich interessieren</td><td class="border p-1">für</td><td class="border p-1">Acusativo</td><td class="border p-1">Ich interessiere mich <strong>für</strong> Musik.</td></tr>
        <tr><td class="border p-1">sprechen</td><td class="border p-1">mit/über/von</td><td class="border p-1">Dativo</td><td class="border p-1">Ich spreche <strong>mit</strong> ihr.</td></tr>
        <tr><td class="border p-1">sich kümmern</td><td class="border p-1">um</td><td class="border p-1">Acusativo</td><td class="border p-1">Er kümmert sich <strong>um</strong> die Kinder.</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs"><strong>💡 Truco:</strong> Cuando veas un verbo nuevo, apúntalo SIEMPRE con su preposición y caso.</p>
    `,
    ejemplos: [
      "Ich warte auf den Bus. (Espero el autobús)",
      "Wir freuen uns über das Geschenk. (Nos alegramos del regalo)",
      "Denkst du an morgen? (¿Piensas en mañana?)",
      "Sie interessiert sich für Kunst. (Ella se interesa por el arte)",
      "Er spricht mit dem Lehrer. (Él habla con el profesor)"
    ],
    tips: [
      "Los verbos de movimiento suelen ir con <em>auf</em> (esperar, mirar).",
      "Los verbos de sentimiento suelen ir con <em>über</em> (alegrarse, quejarse).",
      "Aprende el verbo + preposición + caso como una unidad léxica inseparable."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la preposición correcta (auf, über, an, für, mit, um)",
      datos: [
        { pista: "Ich warte ___ dich. (auf)", respuesta: "auf" },
        { pista: "Sie freut sich ___ das Geschenk. (über)", respuesta: "über" },
        { pista: "Er denkt ___ seine Zukunft. (an)", respuesta: "an" },
        { pista: "Wir interessieren uns ___ Fußball. (für)", respuesta: "für" },
        { pista: "Ich kümmere mich ___ meine Oma. (um)", respuesta: "um" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich warte für den Bus.", error: "für", correccion: "Ich warte auf den Bus. (warten + auf + Acusativo)." },
      { frase: "Sie denkt über ihre Arbeit.", error: "über", correccion: "Sie denkt an ihre Arbeit. (denken + an + Acusativo)." },
      { frase: "Er spricht über sein Chef.", error: "sein Chef", correccion: "Er spricht über seinen Chef. (über + Acusativo → Akkusativ masculino: -en)." }
    ]
  },
  {
    id: "a2_2_konjunktiv2_wuerde",
    nivel: "A2.2",
    titulo: "Konjunktiv II (würde, hätte, wäre)",
    icono: "✨",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "El modo condicional: cortesía, deseos y situaciones irreales con würde, hätte y wäre.",
    explicacion: `
      <h3 class="text-lg font-bold text-purple-400 mb-2">Konjunktiv II: Situaciones irreales y cortesía</h3>
      <p class="mb-2">El Konjunktiv II se usa para expresar:</p>
      <ul class="list-disc pl-5 mb-2 space-y-1 text-sm">
        <li><strong>Cortesía:</strong> Ich <em>würde</em> gern ... (Me gustaría...)</li>
        <li><strong>Deseos irreales:</strong> Wenn ich mehr Geld <em>hätte</em>... (Si tuviera más dinero...)</li>
        <li><strong>Consejos:</strong> Du <em>solltest</em> zum Arzt gehen. (Deberías ir al médico)</li>
      </ul>
      <h4 class="font-bold text-purple-300 mt-2 mb-1">Formación</h4>
      <p class="mb-1"><strong>würde + Infinitivo:</strong> Es la forma más común (excepto sein/haben/modales).</p>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Ich würde kommen. - Du würdest gehen. - Er/Sie/Es würde machen.</pre>
      <p class="mb-1"><strong>Verbosen especiales:</strong></p>
      <ul class="list-disc pl-5 text-sm">
        <li><strong>hätte</strong> (haben condicional): Ich hätte gern ein Bier.</li>
        <li><strong>wäre</strong> (sein condicional): Das wäre schön!</li>
        <li><strong>könnte, müsste, sollte, dürfte</strong> (modales en KII)</li>
      </ul>
    `,
    ejemplos: [
      "Ich würde gern nach Deutschland reisen. (Me gustaría viajar a Alemania)",
      "Wenn ich Zeit hätte, würde ich kommen. (Si tuviera tiempo, vendría)",
      "Das wäre fantastisch! (¡Eso sería fantástico!)",
      "Könntest du mir bitte helfen? (¿Podrías ayudarme por favor?)",
      "Man sollte mehr Wasser trinken. (Se debería beber más agua)"
    ],
    tips: [
      "<em>würde</em> es el comodín: si no sabes el Konjunktiv II de un verbo, usa würde + infinitivo.",
      "<em>wäre</em> y <em>hätte</em> se usan muchísimo en alemán cotidiano. Apréndelos bien.",
      "Para pedir algo cortésmente: Ich hätte gern... / Könnte ich...?"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Conjuga en Konjunktiv II (würde/hätte/wäre)",
      datos: [
        { pista: "Ich (kaufen) ___ gern ein Auto.", respuesta: "würde kaufen" },
        { pista: "Wenn ich Geld (haben) ___, wäre das toll.", respuesta: "hätte" },
        { pista: "Das (sein) ___ schön! (wäre)", respuesta: "wäre" },
        { pista: "Du (sollen) ___ mehr schlafen.", respuesta: "solltest" },
        { pista: "Wir (reisen) ___ gern nach Berlin.", respuesta: "würden reisen" }
      ]
    },
    corrigeNovato: [
      { frase: "Ich wurde gern ein Bier.", error: "wurde", correccion: "Ich würde gern ein Bier. (wurde = Präteritum de werden; würde = Konjunktiv II)." },
      { frase: "Wenn ich habe Zeit, wurde ich kommen.", error: "habe, wurde", correccion: "Wenn ich Zeit hätte, würde ich kommen." },
      { frase: "Das wurde super!", error: "wurde", correccion: "Das wäre super! (Konjunktiv II de sein)." }
    ]
  },
  {
    id: "a2_2_passiv_praesens",
    nivel: "A2.2",
    titulo: "Passiv Präsens (Voz pasiva presente)",
    icono: "🔄",
    colorBorde: "border-teal-500",
    bg: "bg-teal-950/30",
    resumen: "La voz pasiva en presente: werden + Partizip II para enfocar la acción, no el sujeto.",
    explicacion: `
      <h3 class="text-lg font-bold text-teal-400 mb-2">Passiv: La voz pasiva en presente</h3>
      <p class="mb-2">La voz pasiva se usa cuando el foco está en la <strong>acción</strong> o en el <strong>objeto</strong>, no en quién la realiza.</p>
      <h4 class="font-bold text-teal-300 mt-2 mb-1">Estructura</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Sujeto (objeto) + werden (conjugado) + Partizip II + (von + persona)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Der Brief <strong>wird</strong> (von mir) <strong>geschrieben</strong>. (La carta es escrita por mí).</p>
      <h4 class="font-bold text-teal-300 mt-2 mb-1">Comparación activa vs pasiva</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-teal-900/50"><th class="border p-1">Activa</th><th class="border p-1">Pasiva</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Der Koch kocht das Essen.</td><td class="border p-1">Das Essen wird (vom Koch) gekocht.</td></tr>
        <tr><td class="border p-1">Die Schüler lesen das Buch.</td><td class="border p-1">Das Buch wird (von den Schülern) gelesen.</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ <strong>Nominativo (activo)</strong> → <strong>von + Dativo (pasiva)</strong>. El objeto (acusativo) pasa a ser el sujeto.</p>
    `,
    ejemplos: [
      "Das Essen wird gekocht. (La comida es cocinada)",
      "Der Brief wird heute geschrieben. (La carta es escrita hoy)",
      "Das Fenster wird geöffnet. (La ventana es abierta)",
      "Die Hausaufgaben werden gemacht. (Los deberes son hechos)",
      "Hier wird Deutsch gesprochen. (Aquí se habla alemán)"
    ],
    tips: [
      "La pasiva en alemán se usa MÁS que en español. Es natural decir 'Hier wird gearbeitet'.",
      "<em>von</em> + persona (agente), <em>durch</em> + cosa (mediante).",
      "El verbo <em>werden</em> se conjuga en 2ª posición, el Partizip II va al final."
    ],
    ejercicioBase: {
      tipo: "construir",
      enunciado: "Transforma de activa a pasiva",
      datos: [
        { pista: "Der Koch kocht das Essen. → Das Essen ___ ", respuesta: "wird gekocht" },
        { pista: "Der Lehrer erklärt die Regel. → Die Regel ___ ", respuesta: "wird erklärt" },
        { pista: "Die Kinder lesen das Buch. → Das Buch ___ ", respuesta: "wird gelesen" },
        { pista: "Der Mechaniker repariert das Auto. → Das Auto ___ ", respuesta: "wird repariert" },
        { pista: "Man spricht Deutsch. → Deutsch ___ ", respuesta: "wird gesprochen" }
      ]
    },
    corrigeNovato: [
      { frase: "Das Essen ist gekocht.", error: "ist", correccion: "Das Essen wird gekocht. (Pasiva = werden + Partizip II, no sein)." },
      { frase: "Der Brief wird schreiben.", error: "schreiben", correccion: "Der Brief wird geschrieben. (Partizip II, no infinitivo)." },
      { frase: "Das Fenster wird von mein Vater geöffnet.", error: "von mein Vater", correccion: "Das Fenster wird von meinem Vater geöffnet. (von + Dativo)." }
    ]
  },
  {
    id: "a2_2_relativsaetze",
    nivel: "A2.2",
    titulo: "Relativsätze (Nominativ / Akkusativ)",
    icono: "🔗",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "Oraciones de relativo con der/die/das en nominativo y acusativo para conectar ideas.",
    explicacion: `
      <h3 class="text-lg font-bold text-indigo-400 mb-2">Relativsätze: Oraciones de relativo</h3>
      <p class="mb-2">Las oraciones de relativo sirven para dar información adicional sobre un sustantivo sin empezar una nueva oración.</p>
      <h4 class="font-bold text-indigo-300 mt-2 mb-1">Pronombres relativos</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-indigo-900/50"><th class="border p-1">Caso</th><th class="border p-1">Masculino</th><th class="border p-1">Femenino</th><th class="border p-1">Neutro</th><th class="border p-1">Plural</th></tr></thead>
        <tbody>
        <tr><td class="border p-1"><strong>Nominativ</strong></td><td class="border p-1">der</td><td class="border p-1">die</td><td class="border p-1">das</td><td class="border p-1">die</td></tr>
        <tr><td class="border p-1"><strong>Akkusativ</strong></td><td class="border p-1">den</td><td class="border p-1">die</td><td class="border p-1">das</td><td class="border p-1">die</td></tr>
        </tbody>
      </table>
      <p class="mb-2"><strong>Regla:</strong> El pronombre relativo concuerda en <strong>género y número</strong> con el antecedente. El <strong>caso</strong> depende de su función en la subordinada.</p>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">Der Mann, <span class="text-yellow-300">der</span> dort steht, ist mein Lehrer. (Nom.)
Das Buch, <span class="text-yellow-300">das</span> ich lese, ist interessant. (Akk.)</pre>
      <p class="text-yellow-300 text-xs">⚠️ El verbo de la subordinada SIEMPRE al final.</p>
    `,
    ejemplos: [
      "Der Mann, der dort steht, ist mein Vater. (El hombre que está ahí es mi padre)",
      "Das Buch, das ich lese, ist spannend. (El libro que leo es emocionante)",
      "Die Frau, die mir hilft, ist nett. (La mujer que me ayuda es simpática)",
      "Der Film, den wir sehen, ist lustig. (La película que vemos es divertida)",
      "Die Kinder, die im Park spielen, sind laut. (Los niños que juegan en el parque son ruidosos)"
    ],
    tips: [
      "<em>der/die/das</em> como relativo son IGUALES que el artículo definido, excepto en Dativo plural (denen) y Genitivo (dessen/deren).",
      "En nominativo y acusativo, solo el masculino cambia (der → den).",
      "La coma ANTES del relativo es obligatoria en alemán."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el pronombre relativo correcto (der, die, das, den)",
      datos: [
        { pista: "Der Mann, ___ dort steht, ist nett. (der)", respuesta: "der" },
        { pista: "Das Buch, ___ ich kaufe, ist teuer. (das)", respuesta: "das" },
        { pista: "Die Frau, ___ mir hilft, ist freundlich. (die)", respuesta: "die" },
        { pista: "Der Hund, ___ ich sehe, ist braun. (den)", respuesta: "den" },
        { pista: "Das Kind, ___ lacht, ist glücklich. (das)", respuesta: "das" }
      ]
    },
    corrigeNovato: [
      { frase: "Der Mann, den dort steht, ist mein Vater.", error: "den", correccion: "Der Mann, der dort steht, ist mein Vater. (Nominativo, porque 'der Mann' es el sujeto)." },
      { frase: "Das Buch, den ich lese, ist gut.", error: "den", correccion: "Das Buch, das ich lese, ist gut. (Neutro → das)." },
      { frase: "Die Frau, der ich helfe, ist krank.", error: "der", correccion: "Die Frau, die mir hilft... o ... der ich helfe (si es Dativo). Depende del verbo." }
    ]
  },
  {
    id: "a2_2_genitiv",
    nivel: "A2.2",
    titulo: "Genitiv (Caso posesivo)",
    icono: "📛",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "El genitivo alemán expresa posesión y relaciones entre sustantivos (des, der, des).",
    explicacion: `
      <h3 class="text-lg font-bold text-amber-400 mb-2">Genitiv: El caso posesivo</h3>
      <p class="mb-2">El genitivo indica <strong>posesión</strong> o <strong>pertenencia</strong> y responde a la pregunta <em>Wessen?</em> (¿De quién?).</p>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">Artículos en genitivo</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-amber-900/50"><th class="border p-1">Género</th><th class="border p-1">Artículo</th><th class="border p-1">Sustantivo</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Masculino</td><td class="border p-1">des</td><td class="border p-1">des Mann<b>es</b></td></tr>
        <tr><td class="border p-1">Neutro</td><td class="border p-1">des</td><td class="border p-1">des Kind<b>es</b></td></tr>
        <tr><td class="border p-1">Femenino</td><td class="border p-1">der</td><td class="border p-1">der Frau</td></tr>
        <tr><td class="border p-1">Plural</td><td class="border p-1">der</td><td class="border p-1">der Kinder</td></tr>
        </tbody>
      </table>
      <p class="mb-2"><strong>Regla:</strong> Masculino y neutro añaden <em>-es</em> o <em>-s</em> al sustantivo. Femenino y plural solo cambian el artículo.</p>
      <p class="text-yellow-300 text-xs">📝 En alemán hablado, el genitivo se reemplaza a menudo con <em>von + Dativo</em>: das Haus von meinem Vater (en lugar de meines Vaters).</p>
    `,
    ejemplos: [
      "Das ist das Haus meines Vaters. (Esta es la casa de mi padre)",
      "Die Farbe des Himmels ist blau. (El color del cielo es azul)",
      "Der Name des Kindes ist Lukas. (El nombre del niño es Lukas)",
      "Die Bücher der Studentin sind neu. (Los libros de la estudiante son nuevos)",
      "Wegen des Regens bleiben wir zu Hause. (Por la lluvia nos quedamos en casa)"
    ],
    tips: [
      "Las preposiciones <em>wegen, während, trotz, statt</em> siempre rigen genitivo.",
      "En masculino/neutro: des + (e)s. Una sílaba → -es; dos sílabas → -s: des Lehrers.",
      "Para evitar el genitivo en conversación: 'das Auto von meinem Bruder'."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa en genitivo (des/der + terminación si aplica)",
      datos: [
        { pista: "Das Buch ___ (der Mann) ist neu.", respuesta: "des Mannes" },
        { pista: "Die Farbe ___ (das Haus) ist rot.", respuesta: "des Hauses" },
        { pista: "Der Name ___ (die Frau) ist Anna.", respuesta: "der Frau" },
        { pista: "Die Mutter ___ (die Kinder) ist freundlich.", respuesta: "der Kinder" },
        { pista: "Wegen ___ (der Regen) bleiben wir zu Hause.", respuesta: "des Regens" }
      ]
    },
    corrigeNovato: [
      { frase: "Das Auto von mein Vater.", error: "von mein Vater", correccion: "Das Auto meines Vaters. (Genitivo posesivo). O bien 'von meinem Vater' (Dativo)." },
      { frase: "Der Name des Kind ist Lukas.", error: "Kind", correccion: "Der Name des Kindes ist Lukas. (Neutro + -es)." },
      { frase: "Wegen der Regen bleiben wir zu Hause.", error: "der Regen", correccion: "Wegen des Regens bleiben wir zu Hause. (wegen + Genitivo)." }
    ]
  },
  {
    id: "a2_2_praepositionen_genitiv",
    nivel: "A2.2",
    titulo: "Präpositionen mit Genitiv",
    icono: "📍",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    resumen: "Preposiciones que siempre rigen genitivo: wegen, trotz, während, statt, innerhalb, außerhalb.",
    explicacion: `
      <h3 class="text-lg font-bold text-orange-400 mb-2">Preposiciones con Genitiv</h3>
      <p class="mb-2">Ciertas preposiciones exigen <strong>siempre</strong> el caso genitivo. Son comunes en alemán escrito y formal.</p>
      <h4 class="font-bold text-orange-300 mt-2 mb-1">Las más importantes</h4>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-orange-900/50"><th class="border p-1">Preposición</th><th class="border p-1">Significado</th><th class="border p-1">Ejemplo</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">wegen</td><td class="border p-1">debido a / por</td><td class="border p-1">wegen <strong>des Wetters</strong></td></tr>
        <tr><td class="border p-1">trotz</td><td class="border p-1">a pesar de</td><td class="border p-1">trotz <strong>des Regens</strong></td></tr>
        <tr><td class="border p-1">während</td><td class="border p-1">durante</td><td class="border p-1">während <strong>des Unterrichts</strong></td></tr>
        <tr><td class="border p-1">statt / anstatt</td><td class="border p-1">en lugar de</td><td class="border p-1">statt <strong>des Buches</strong></td></tr>
        <tr><td class="border p-1">innerhalb</td><td class="border p-1">dentro de</td><td class="border p-1">innerhalb <strong>einer Woche</strong></td></tr>
        <tr><td class="border p-1">außerhalb</td><td class="border p-1">fuera de</td><td class="border p-1">außerhalb <strong>der Stadt</strong></td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ En alemán coloquial estas preposiciones suelen ir con <strong>Dativo</strong> (wegen dem Wetter). En <strong>escritura formal</strong> siempre Genitiv.</p>
    `,
    ejemplos: [
      "Wegen des Regens bleibt das Spiel aus. (Por la lluvia se cancela el partido)",
      "Trotz des schlechten Wetters gehen wir spazieren. (A pesar del mal tiempo paseamos)",
      "Während des Films war es still. (Durante la película hubo silencio)",
      "Statt des Buches kaufe ich eine Zeitschrift. (En lugar del libro compro una revista)",
      "Innerhalb eines Monats lerne ich viel. (En un mes aprendo mucho)"
    ],
    tips: [
      "<em>wegen</em> es la preposición con genitivo más usada. Domínala primero.",
      "<em>trotz</em> expresa contraste, igual que 'obwohl + subordinada'.",
      "Coloquialmente: wegen + Dativo (wegen dem Wetter) es aceptable. Formal: wegen + Genitivo."
    ],
    ejercicioBase: {
      tipo: "opciones",
      enunciado: "Selecciona la preposición correcta para cada frase",
      datos: [
        { pista: "___ des schlechten Wetters bleiben wir zu Hause.", opciones: ["Wegen", "Trotz", "Während", "Statt"], respuesta: "Wegen" },
        { pista: "___ des Films habe ich geschlafen.", opciones: ["Wegen", "Trotz", "Während", "Statt"], respuesta: "Während" },
        { pista: "___ des Regens gehen wir spazieren.", opciones: ["Wegen", "Trotz", "Während", "Statt"], respuesta: "Trotz" },
        { pista: "___ des Buches lese ich einen Artikel.", opciones: ["Wegen", "Trotz", "Während", "Statt"], respuesta: "Statt" },
        { pista: "___ einer Woche bin ich fertig.", opciones: ["Wegen", "Trotz", "Innerhalb", "Statt"], respuesta: "Innerhalb" }
      ]
    },
    corrigeNovato: [
      { frase: "Wegen dem schlechten Wetter bleiben wir zu Hause.", error: "dem", correccion: "Wegen des schlechten Wetters (formal). Aunque 'wegen dem' es aceptable coloquial, aprende el correcto." },
      { frase: "Trotz der Regen gehen wir raus.", error: "der Regen", correccion: "Trotz des Regens gehen wir raus. (trotz + Genitivo)." },
      { frase: "Während der Unterricht war es leise.", error: "der Unterricht", correccion: "Während des Unterrichts war es leise. (während + Genitivo, verbo al final... no, aquí es principal)." }
    ]
  }
];