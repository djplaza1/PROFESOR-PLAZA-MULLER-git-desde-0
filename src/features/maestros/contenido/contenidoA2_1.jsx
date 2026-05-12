window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};
window.Muller.Maestros.contenido.A2_1 = [
  {
    id: "a2_1_wechsel",
    nivel: "A2.1",
    titulo: "Wechselpräpositionen",
    icono: "🔄",
    colorBorde: "border-emerald-500",
    bg: "bg-emerald-950/30",
    resumen: "Preposiciones de cambio: dativo (ubicación) vs acusativo (movimiento). an, auf, hinter, in, neben, über, unter, vor, zwischen.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📐 Las 9 Wechselpräpositionen</h3>
<p class="mb-3">Rigen <span class="text-blue-400 font-semibold">DATIVO</span> (Wo? - ubicación) o <span class="text-red-400 font-semibold">ACUSATIVO</span> (Wohin? - movimiento).</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Prep.</th><th class="p-2 border border-gray-600 text-left">Dat (Wo?)</th><th class="p-2 border border-gray-600 text-left">Akku (Wohin?)</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">an</td><td class="p-2 border border-gray-600">an dem → am</td><td class="p-2 border border-gray-600">an den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">auf</td><td class="p-2 border border-gray-600">auf dem</td><td class="p-2 border border-gray-600">auf den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">hinter</td><td class="p-2 border border-gray-600">hinter dem</td><td class="p-2 border border-gray-600">hinter den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">in</td><td class="p-2 border border-gray-600">in dem → im</td><td class="p-2 border border-gray-600">in den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">neben</td><td class="p-2 border border-gray-600">neben dem</td><td class="p-2 border border-gray-600">neben den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">über</td><td class="p-2 border border-gray-600">über dem</td><td class="p-2 border border-gray-600">über den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">unter</td><td class="p-2 border border-gray-600">unter dem</td><td class="p-2 border border-gray-600">unter den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">vor</td><td class="p-2 border border-gray-600">vor dem</td><td class="p-2 border border-gray-600">vor den</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono text-yellow-400">zwischen</td><td class="p-2 border border-gray-600">zwischen dem</td><td class="p-2 border border-gray-600">zwischen den</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Regla:</strong> Verbos de estado (sein, stehen, liegen, sitzen, hängen) → Dativo. Verbos de movimiento (gehen, stellen, legen, setzen, hängen con cambio) → Acusativo.</p>
<p class="mb-2"><strong>Contracciones:</strong> an dem → am, in dem → im, bei dem → beim (solo Dativ), zu dem → zum, zu der → zur.</p>
<p>Pista: <span class="text-yellow-300">"Stell die Lampe auf den Tisch" (Akk) vs "Die Lampe steht auf dem Tisch" (Dat)</span>.</p>`,
    ejemplos: [
      "Ich hänge das Bild an die Wand. (Cuelgo el cuadro en la pared.)",
      "Das Bild hängt an der Wand. (El cuadro cuelga en la pared.)",
      "Er legt das Buch auf den Tisch. (Pone el libro sobre la mesa.)",
      "Das Buch liegt auf dem Tisch. (El libro está sobre la mesa.)",
      "Sie setzt das Kind neben den Mann. (Sienta al niño al lado del hombre.)",
      "Das Kind sitzt neben dem Mann. (El niño está sentado al lado del hombre.)",
      "Wir stellen die Schuhe unter das Bett. (Ponemos los zapatos debajo de la cama.)",
      "Die Schuhe stehen unter dem Bett. (Los zapatos están debajo de la cama.)"
    ],
    tips: [
      "Wo? → Dativ (posición). Wohin? → Akkusativ (dirección).",
      "Verbos de ubicación: sein, stehen, liegen, sitzen, hängen.",
      "Verbos de movimiento: stellen (poner de pie), legen (poner tumbado), setzen (sentar), hängen (colgar).",
      "Contracciones am, im, beim, zum, zur solo en Dativ.",
      "Cuidado: 'hängen' puede ser ambos, si cuelgo → Akk, si cuelga → Dat."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Die Katze sitzt ___ dem Sofa.", respuesta: "auf", opciones: null, traduccion: "El gato está sentado sobre el sofá.", pista: "Wo? → Dativo", explicacion: "Con 'sitzen' (estar sentado) usamos dativo. 'auf dem Sofa'." },
        { tipo: "hueco", frase: "Ich lege das Handy ___ den Tisch.", respuesta: "auf", opciones: null, traduccion: "Pongo el móvil sobre la mesa.", pista: "Wohin? → Akkusativ", explicacion: "Con 'legen' (poner tumbado) usamos acusativo para el destino." },
        { tipo: "hueco", frase: "Das Bild hängt ___ der Wand.", respuesta: "an", opciones: null, traduccion: "El cuadro cuelga en la pared.", pista: "¿Estado? Dativo", explicacion: "'hängen' como estado = dativo. 'an der Wand'." },
        { tipo: "opcion", frase: "¿Qué preposición va con dativo para indicar posición bajo algo?", respuesta: "unter", opciones: ["unter", "neben", "auf"], traduccion: "Debajo de", pista: null, explicacion: "'unter' rige dativo para ubicación (unter dem Tisch)." },
        { tipo: "hueco", frase: "Er setzt sich ___ den Stuhl.", respuesta: "auf", opciones: null, traduccion: "Él se sienta en la silla.", pista: "Movimiento hacia → Akkusativ", explicacion: "Reflexivo 'sich setzen' + acusativo de dirección." },
        { tipo: "hueco", frase: "Die Schuhe stehen ___ dem Bett.", respuesta: "unter", opciones: null, traduccion: "Los zapatos están debajo de la cama.", pista: "Wo? → Dativo", explicacion: "'stehen' (estar de pie) + dativo 'unter dem Bett'." },
        { tipo: "opcion", frase: "Completa con dativo: Die Lampe hängt ___ der Decke.", respuesta: "an", opciones: ["an", "auf", "in"], traduccion: "La lámpara cuelga del techo.", pista: null, explicacion: "'an der Decke' (en el techo, estado). 'Auf' sería sobre una superficie horizontal." },
        { tipo: "hueco", frase: "Stell die Vase ___ das Regal.", respuesta: "in", opciones: null, traduccion: "Pon el jarrón en la estantería.", pista: "Wohin? → Akkusativ", explicacion: "'stellen' + acusativo de lugar: in das Regal." },
        { tipo: "hueco", frase: "Der Ball ist ___ dem Tisch.", respuesta: "unter", opciones: null, traduccion: "El balón está debajo de la mesa.", pista: "Wo? → Dativo", explicacion: "Ubicación: 'unter dem Tisch' (dativo)." },
        { tipo: "opcion", frase: "Wohin legst du die Zeitung? - ___ den Tisch.", respuesta: "Auf", opciones: ["Auf", "Auf dem", "Im"], traduccion: "¿Adónde pones el periódico? - Sobre la mesa.", pista: null, explicacion: "Movimiento (Wohin) → acusativo: auf den Tisch." },
        { tipo: "hueco", frase: "Zwischen den Stühlen ___ ein Teppich.", respuesta: "liegt", opciones: null, traduccion: "Entre las sillas hay una alfombra.", pista: "Verbo de ubicación", explicacion: "'liegen' (estar tumbado) en dativo con zwischen." },
        { tipo: "hueco", frase: "Sie stellt die Blumen ___ das Fenster.", respuesta: "vor", opciones: null, traduccion: "Ella pone las flores delante de la ventana.", pista: "Movimiento → Akkusativ", explicacion: "'vor das Fenster' (dirección)." }
      ]
    },
    flashcards: [
      { cara: "Wo? → caso", dorso: "Dativo" },
      { cara: "Wohin? → caso", dorso: "Akkusativ" },
      { cara: "auf + dativo", dorso: "sobre (ubicación): auf dem Tisch" },
      { cara: "auf + acusativo", dorso: "sobre (dirección): auf den Tisch" },
      { cara: "in + dativo", dorso: "en (dentro, ubicación): im Haus" },
      { cara: "in + acusativo", dorso: "a (dirección): in die Schule" },
      { cara: "an + dativo", dorso: "junto a (vertical): an der Wand" },
      { cara: "unter + dativo", dorso: "debajo (ubicación): unter dem Bett" }
    ]
  },
  {
    id: "a2_1_dativ",
    nivel: "A2.1",
    titulo: "Dativo completo",
    icono: "📦",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Artículos, pronombres y verbos que rigen dativo: helfen, danken, gefallen, gehören, antworten...",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📋 El dativo en alemán</h3>
<p class="mb-3">El dativo responde a <span class="text-blue-400">Wem? (¿a quién? / ¿para quién?)</span>. Se usa tras ciertos verbos y preposiciones.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Artículo</th><th class="p-2 border border-gray-600 text-left">Maskulin</th><th class="p-2 border border-gray-600 text-left">Neutrum</th><th class="p-2 border border-gray-600 text-left">Feminin</th><th class="p-2 border border-gray-600 text-left">Plural</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">Bestimmt</td><td class="p-2 border border-gray-600">dem</td><td class="p-2 border border-gray-600">dem</td><td class="p-2 border border-gray-600">der</td><td class="p-2 border border-gray-600">den + n</td></tr>
    <tr><td class="p-2 border border-gray-600">Unbestimmt</td><td class="p-2 border border-gray-600">einem</td><td class="p-2 border border-gray-600">einem</td><td class="p-2 border border-gray-600">einer</td><td class="p-2 border border-gray-600">– (keinen) + n</td></tr>
    <tr><td class="p-2 border border-gray-600">Negativ</td><td class="p-2 border border-gray-600">keinem</td><td class="p-2 border border-gray-600">keinem</td><td class="p-2 border border-gray-600">keiner</td><td class="p-2 border border-gray-600">keinen + n</td></tr>
    <tr><td class="p-2 border border-gray-600">Possessiv</td><td class="p-2 border border-gray-600">meinem</td><td class="p-2 border border-gray-600">meinem</td><td class="p-2 border border-gray-600">meiner</td><td class="p-2 border border-gray-600">meinen + n</td></tr>
  </tbody>
</table>
</div>
<p class="mb-3"><strong>Verbos que rigen dativo:</strong> helfen (ayudar), danken (agradecer), gefallen (gustar), gehören (pertenecer), antworten (responder), schmecken (saber), stehen (quedar bien), passen (quedar bien de talla), fehlen (faltar), gratulieren (felicitar).</p>
<p>Pronombres personales dativo: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.</p>`,
    ejemplos: [
      "Ich helfe dem Mann. (Ayudo al hombre.)",
      "Er dankt seiner Mutter. (Él agradece a su madre.)",
      "Das Kleid gefällt mir. (El vestido me gusta.)",
      "Das Buch gehört dem Kind. (El libro pertenece al niño.)",
      "Antworten Sie der Frau! (¡Responda a la mujer!)",
      "Die Pizza schmeckt uns gut. (La pizza nos sabe bien.)",
      "Die Hose passt dir nicht. (El pantalón no te queda bien.)",
      "Mein Bruder fehlt mir. (Echo de menos a mi hermano.)"
    ],
    tips: [
      "Dat plural: sustantivo + n (ej. den Kindern, meinen Freunden). Excepciones si plural ya termina en -s o -n.",
      "No todos los verbos de comunicación llevan dativo: fragen rige acusativo.",
      "Gefallen funciona como gustar: el objeto gustado es nominativo, persona en dativo.",
      "Gehören = ser propiedad de, NO 'pertenecer a' con preposición."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich helfe ___ (mi padre).", respuesta: "meinem Vater", opciones: null, traduccion: "Ayudo a mi padre.", pista: "Maskulin dativo: meinem", explicacion: "helfen + dativo. Vater → dem Vater / meinem Vater." },
        { tipo: "hueco", frase: "Er dankt ___ (su madre, fem.).", respuesta: "seiner Mutter", opciones: null, traduccion: "Él da las gracias a su madre.", pista: "Feminin dativo: seiner", explicacion: "danken + dativo. Mutter → der Mutter / seiner Mutter." },
        { tipo: "opcion", frase: "Wie geht es ___?", respuesta: "Ihnen", opciones: ["Ihnen", "Sie", "Ihr"], traduccion: "¿Cómo está usted?", pista: null, explicacion: "Es geht + dativo. Ihnen es dativo de Sie (usted, formal)." },
        { tipo: "hueco", frase: "Das Geschenk gehört ___ (al niño).", respuesta: "dem Kind", opciones: null, traduccion: "El regalo pertenece al niño.", pista: "Neutrum dativo", explicacion: "gehören + dativo. Kind → dem Kind." },
        { tipo: "opcion", frase: "Antworten Sie ___ (yo) bitte.", respuesta: "mir", opciones: ["mir", "mich", "mich"], traduccion: "Respóndame, por favor.", pista: null, explicacion: "Antworten + dativo. Ich → mir." },
        { tipo: "hueco", frase: "Der Kaffee schmeckt ___ (a nosotros) nicht.", respuesta: "uns", opciones: null, traduccion: "El café no nos sabe bien.", pista: "Dativo plural 1ª pers.", explicacion: "schmecken + dativo. Wir → uns." },
        { tipo: "hueco", frase: "Die Schuhe passen ___ (a ti) nicht.", respuesta: "dir", opciones: null, traduccion: "Los zapatos no te quedan bien.", pista: "Pronombre dativo 2ª pers. sing.", explicacion: "passen + dativo. Du → dir." },
        { tipo: "opcion", frase: "Er gratuliert ___ (a su amigo) zum Geburtstag.", respuesta: "seinem Freund", opciones: ["seinem Freund", "seinen Freund", "sein Freund"], traduccion: "Felicita a su amigo por el cumpleaños.", pista: null, explicacion: "gratulieren + dativo. Freund maskulin → seinem Freund." },
        { tipo: "hueco", frase: "Das Auto gehört ___ (a mis padres).", respuesta: "meinen Eltern", opciones: null, traduccion: "El coche pertenece a mis padres.", pista: "Plural dativo: meinen + Eltern(n)", explicacion: "Plural dativo añade -n si no termina ya en -n. Eltern → meinen Eltern." },
        { tipo: "hueco", frase: "Kannst du ___ (a nosotros) helfen?", respuesta: "uns", opciones: null, traduccion: "¿Puedes ayudarnos?", pista: "Dativo plural 1ª persona", explicacion: "helfen + dativo. Wir → uns." },
        { tipo: "opcion", frase: "Das Hemd steht ___ (a él) sehr gut.", respuesta: "ihm", opciones: ["ihm", "ihn", "es"], traduccion: "La camisa le queda muy bien.", pista: null, explicacion: "stehen (quedar bien) + dativo. Er → ihm." },
        { tipo: "hueco", frase: "Sag ___ (a mí) die Wahrheit!", respuesta: "mir", opciones: null, traduccion: "¡Dime la verdad!", pista: "Sagen + dativo (a quién)", explicacion: "Sagen puede ir con dativo: mir." }
      ]
    },
    flashcards: [
      { cara: "Dativ Maskulin (artículo definido)", dorso: "dem" },
      { cara: "Dativ Feminin (artículo definido)", dorso: "der" },
      { cara: "Dativ Neutrum (artículo definido)", dorso: "dem" },
      { cara: "Dativ Plural (artículo definido)", dorso: "den (+ n en sustantivo)" },
      { cara: "Verbo helfen rige...", dorso: "Dativ" },
      { cara: "Verbo gefallen rige...", dorso: "Dativ (Ej.: Das gefällt mir.)" },
      { cara: "Pronombre dativo de 'ich'", dorso: "mir" },
      { cara: "Pronombre dativo de 'du'", dorso: "dir" }
    ]
  },
  {
    id: "a2_1_reflexive",
    nivel: "A2.1",
    titulo: "Verbos reflexivos",
    icono: "🪞",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    resumen: "sich waschen, sich fühlen, sich treffen... Pronombres reflexivos en acusativo y dativo.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">🪞 Verbos reflexivos en alemán</h3>
<p class="mb-3">Muchos verbos en alemán requieren un pronombre reflexivo que coincide con el sujeto. La mayoría van en <span class="text-red-400 font-semibold">acusativo</span>, pero si ya hay un objeto acusativo, el reflexivo va en <span class="text-blue-400 font-semibold">dativo</span>.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Pronombre</th><th class="p-2 border border-gray-600 text-left">Reflexivo Akk.</th><th class="p-2 border border-gray-600 text-left">Reflexivo Dat.</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">ich</td><td class="p-2 border border-gray-600">mich</td><td class="p-2 border border-gray-600">mir</td></tr>
    <tr><td class="p-2 border border-gray-600">du</td><td class="p-2 border border-gray-600">dich</td><td class="p-2 border border-gray-600">dir</td></tr>
    <tr><td class="p-2 border border-gray-600">er/sie/es</td><td class="p-2 border border-gray-600">sich</td><td class="p-2 border border-gray-600">sich</td></tr>
    <tr><td class="p-2 border border-gray-600">wir</td><td class="p-2 border border-gray-600">uns</td><td class="p-2 border border-gray-600">uns</td></tr>
    <tr><td class="p-2 border border-gray-600">ihr</td><td class="p-2 border border-gray-600">euch</td><td class="p-2 border border-gray-600">euch</td></tr>
    <tr><td class="p-2 border border-gray-600">sie/Sie</td><td class="p-2 border border-gray-600">sich</td><td class="p-2 border border-gray-600">sich</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Reflexivos comunes en acusativo:</strong> sich waschen, sich fühlen, sich treffen, sich interessieren, sich anziehen, sich setzen, sich freuen, sich erinnern, sich kümmern, sich beeilen.</p>
<p><strong>Reflexivos con dativo (cuando hay objeto acusativo adicional):</strong> sich die Zähne putzen, sich die Hände waschen, sich etwas kaufen, sich Sorgen machen.</p>`,
    ejemplos: [
      "Ich wasche mich. (Me lavo.)",
      "Er fühlt sich gut. (Él se siente bien.)",
      "Wir treffen uns am Bahnhof. (Quedamos en la estación.)",
      "Interessierst du dich für Kunst? (¿Te interesa el arte?)",
      "Ich ziehe mich schnell an. (Me visto rápido.)",
      "Sie freut sich auf das Konzert. (Ella se alegra por el concierto.)",
      "Ich putze mir die Zähne. (Me lavo los dientes. – Dativo reflexivo + acusativo objeto.)",
      "Kaufst du dir ein neues Handy? (¿Te compras un móvil nuevo?)"
    ],
    tips: [
      "El pronombre reflexivo va siempre en la posición 3 o junto al verbo conjugado.",
      "Si el verbo lleva preposición (sich interessieren für, sich freuen auf/über), la preposición es fija.",
      "Dativo reflexivo cuando ya hay un acusativo: 'Ich wasche mir das Gesicht'.",
      "Algunos verbos cambian de significado: sich vorstellen (imaginarse) vs vorstellen (presentar a alguien)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich wasche ___ (me) jeden Morgen.", respuesta: "mich", opciones: null, traduccion: "Me lavo cada mañana.", pista: "ich → mich", explicacion: "sich waschen, reflexivo acusativo: mich." },
        { tipo: "hueco", frase: "Fühlst du ___ (te) heute besser?", respuesta: "dich", opciones: null, traduccion: "¿Te sientes mejor hoy?", pista: "du → dich", explicacion: "sich fühlen: du → dich." },
        { tipo: "opcion", frase: "Wir treffen ___ um 8 Uhr.", respuesta: "uns", opciones: ["uns", "euch", "sich"], traduccion: "Quedamos a las 8.", pista: null, explicacion: "sich treffen: wir → uns." },
        { tipo: "hueco", frase: "Kinder, zieht ___ (vosotros) die Schuhe an!", respuesta: "euch", opciones: null, traduccion: "¡Niños, poneos los zapatos!", pista: "ihr → euch", explicacion: "sich anziehen (vestirse), imperativo ihr: zieht euch ... an." },
        { tipo: "opcion", frase: "Herr Müller interessiert ___ für alte Autos.", respuesta: "sich", opciones: ["sich", "ihn", "ihm"], traduccion: "El Sr. Müller se interesa por los coches antiguos.", pista: null, explicacion: "sich interessieren für, 3ª pers. sing. → sich." },
        { tipo: "hueco", frase: "Ich muss ___ (me) beeilen!", respuesta: "mich", opciones: null, traduccion: "¡Tengo que darme prisa!", pista: "sich beeilen", explicacion: "sich beeilen: mich (acusativo)." },
        { tipo: "hueco", frase: "Erinnert ihr ___ (os) an den letzten Urlaub?", respuesta: "euch", opciones: null, traduccion: "¿Os acordáis de las últimas vacaciones?", pista: "ihr → euch", explicacion: "sich erinnern an + acusativo. Ihr → euch." },
        { tipo: "opcion", frase: "Ich kaufe ___ ein neues Kleid.", respuesta: "mir", opciones: ["mir", "mich", "sich"], traduccion: "Me compro un vestido nuevo.", pista: null, explicacion: "Dativo reflexivo porque ya hay objeto acusativo (ein Kleid): mir." },
        { tipo: "hueco", frase: "Setzen Sie ___ (se) bitte.", respuesta: "sich", opciones: null, traduccion: "Siéntese, por favor.", pista: "Sie → sich", explicacion: "sich setzen: Sie (formal) → sich." },
        { tipo: "hueco", frase: "Er putzt ___ (se) die Zähne.", respuesta: "sich", opciones: null, traduccion: "Él se lava los dientes.", pista: "Dativo reflexivo: sich", explicacion: "3ª pers. sing. dativo reflexivo: sich (misma forma que acusativo)." },
        { tipo: "opcion", frase: "Wir freuen ___ schon auf das Fest.", respuesta: "uns", opciones: ["uns", "euch", "sich"], traduccion: "Ya nos alegramos por la fiesta.", pista: null, explicacion: "sich freuen auf: wir → uns." },
        { tipo: "hueco", frase: "Du sollst ___ (te) um die Kinder kümmern.", respuesta: "dich", opciones: null, traduccion: "Debes ocuparte de los niños.", pista: "du → dich", explicacion: "sich kümmern um: acusativo reflexivo dich." }
      ]
    },
    flashcards: [
      { cara: "sich waschen (yo)", dorso: "Ich wasche mich." },
      { cara: "sich fühlen (tú)", dorso: "Du fühlst dich." },
      { cara: "sich treffen (nosotros)", dorso: "Wir treffen uns." },
      { cara: "sich anziehen (usted)", dorso: "Sie ziehen sich an." },
      { cara: "Pronombre reflexivo acusativo 'er'", dorso: "sich" },
      { cara: "Dativo reflexivo 'ich' (comprarse algo)", dorso: "mir (Ich kaufe mir...)" },
      { cara: "sich erinnern an + Akk", dorso: "Acordarse de (con preposición fija)" },
      { cara: "sich interessieren für + Akk", dorso: "Interesarse por" }
    ]
  },
  {
    id: "a2_1_praeteritum",
    nivel: "A2.1",
    titulo: "Präteritum básico",
    icono: "📜",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Präteritum de sein, haben y los verbos modales (können, müssen, dürfen, wollen, mögen, sollen).",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📜 Präteritum: verbos esenciales</h3>
<p class="mb-3">El Präteritum (pasado simple) se usa principalmente en narraciones escritas. En el habla cotidiana se prefiere el Perfekt, pero <span class="text-yellow-300 font-semibold">sein, haben y los modales</span> se usan frecuentemente en Präteritum incluso al hablar.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Infinitiv</th><th class="p-2 border border-gray-600 text-left">ich/er/sie/es</th><th class="p-2 border border-gray-600 text-left">du</th><th class="p-2 border border-gray-600 text-left">wir/sie/Sie</th><th class="p-2 border border-gray-600 text-left">ihr</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600 font-mono">sein</td><td class="p-2 border border-gray-600">war</td><td class="p-2 border border-gray-600">warst</td><td class="p-2 border border-gray-600">waren</td><td class="p-2 border border-gray-600">wart</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">haben</td><td class="p-2 border border-gray-600">hatte</td><td class="p-2 border border-gray-600">hattest</td><td class="p-2 border border-gray-600">hatten</td><td class="p-2 border border-gray-600">hattet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">können</td><td class="p-2 border border-gray-600">konnte</td><td class="p-2 border border-gray-600">konntest</td><td class="p-2 border border-gray-600">konnten</td><td class="p-2 border border-gray-600">konntet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">müssen</td><td class="p-2 border border-gray-600">musste</td><td class="p-2 border border-gray-600">musstest</td><td class="p-2 border border-gray-600">mussten</td><td class="p-2 border border-gray-600">musstet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">dürfen</td><td class="p-2 border border-gray-600">durfte</td><td class="p-2 border border-gray-600">durftest</td><td class="p-2 border border-gray-600">durften</td><td class="p-2 border border-gray-600">durftet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">wollen</td><td class="p-2 border border-gray-600">wollte</td><td class="p-2 border border-gray-600">wolltest</td><td class="p-2 border border-gray-600">wollten</td><td class="p-2 border border-gray-600">wolltet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">mögen</td><td class="p-2 border border-gray-600">mochte</td><td class="p-2 border border-gray-600">mochtest</td><td class="p-2 border border-gray-600">mochten</td><td class="p-2 border border-gray-600">mochtet</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">sollen</td><td class="p-2 border border-gray-600">sollte</td><td class="p-2 border border-gray-600">solltest</td><td class="p-2 border border-gray-600">sollten</td><td class="p-2 border border-gray-600">solltet</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2">Los modales pierden el Umlaut en Präteritum (müssen → musste, dürfen → durfte, können → konnte, mögen → mochte). Wollen, sollen no tienen Umlaut y añaden -te.</p>`,
    ejemplos: [
      "Gestern war ich im Kino. (Ayer estuve en el cine.)",
      "Er hatte kein Geld dabei. (Él no llevaba dinero encima.)",
      "Wir konnten nicht kommen. (No pudimos venir.)",
      "Du musstest zum Arzt gehen. (Tuviste que ir al médico.)",
      "Sie durfte nicht mitfahren. (Ella no podía ir.)",
      "Was wolltet ihr kaufen? (¿Qué queríais comprar?)",
      "Ich mochte die Musik als Kind nicht. (De niño no me gustaba la música.)",
      "Er sollte mehr lernen. (Él debía estudiar más.)"
    ],
    tips: [
      "Los verbos modales en Präteritum no llevan Umlaut (ä,ö,ü) en su raíz.",
      "Las terminaciones: ich/er/sie/es → - (war, hatte, konnte), du → -st, wir/sie/Sie → -n, ihr → -t.",
      "En conversación, con sein y haben es normal usar Präteritum en lugar de Perfekt.",
      "Mögen (gustar) en Präteritum 'mochte' se usa para gustos pasados."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Gestern ___ (estar) ich sehr müde.", respuesta: "war", opciones: null, traduccion: "Ayer estaba muy cansado.", pista: "sein en Präteritum, 1ª pers.", explicacion: "sein → ich war." },
        { tipo: "hueco", frase: "Ihr ___ (tener) einen tollen Urlaub, oder?", respuesta: "hattet", opciones: null, traduccion: "Tuvisteis unas vacaciones geniales, ¿verdad?", pista: "haben, 2ª pers. plural", explicacion: "haben: ihr hattet." },
        { tipo: "opcion", frase: "Er ___ (poder) leider nicht einschlafen.", respuesta: "konnte", opciones: ["konnte", "könnte", "kann"], traduccion: "Desafortunadamente no pudo dormirse.", pista: null, explicacion: "können en Präteritum: er konnte. 'Könnte' es Konjunktiv II." },
        { tipo: "hueco", frase: "Wir ___ (deber) länger warten.", respuesta: "mussten", opciones: null, traduccion: "Tuvimos que esperar más.", pista: "müssen, 1ª pers. plural", explicacion: "müssen: wir mussten." },
        { tipo: "opcion", frase: "___ (tú, permitir) als Kind fernsehen?", respuesta: "Durftest", opciones: ["Durftest", "Darfst", "Durfte"], traduccion: "¿Podías ver la tele de niño?", pista: null, explicacion: "dürfen: du durftest." },
        { tipo: "hueco", frase: "Sie (plural) ___ (querer) unbedingt ins Kino.", respuesta: "wollten", opciones: null, traduccion: "Ellos querían ir al cine a toda costa.", pista: "wollen, 3ª pers. plural", explicacion: "wollen: sie wollten." },
        { tipo: "hueco", frase: "Ich ___ (gustar) Spinat früher nicht.", respuesta: "mochte", opciones: null, traduccion: "Antes no me gustaban las espinacas.", pista: "mögen, 1ª pers.", explicacion: "mögen: ich mochte." },
        { tipo: "opcion", frase: "Ihr ___ (deber) mehr üben.", respuesta: "solltet", opciones: ["solltet", "sollte", "sollt"], traduccion: "Vosotros debíais practicar más.", pista: null, explicacion: "sollen: ihr solltet (Präteritum)." },
        { tipo: "hueco", frase: "Am Montag ___ (tener) wir keine Schule.", respuesta: "hatten", opciones: null, traduccion: "El lunes no teníamos clase.", pista: "haben, 1ª pers. plural", explicacion: "haben: wir hatten." },
        { tipo: "hueco", frase: "Du ___ (estar) letzte Woche krank.", respuesta: "warst", opciones: null, traduccion: "Tú estuviste enfermo la semana pasada.", pista: "sein, 2ª pers. sing.", explicacion: "sein: du warst." },
        { tipo: "opcion", frase: "Früher ___ (yo, poder) gut singen.", respuesta: "konnte", opciones: ["konnte", "kann", "könnte"], traduccion: "Antes podía cantar bien.", pista: null, explicacion: "können: ich konnte." },
        { tipo: "hueco", frase: "Die Kinder ___ (permitir) nicht auf die Straße.", respuesta: "durften", opciones: null, traduccion: "Los niños no podían salir a la calle.", pista: "dürfen, 3ª pers. plural", explicacion: "dürfen: sie durften." }
      ]
    },
    flashcards: [
      { cara: "Präteritum de 'sein' (ich)", dorso: "war" },
      { cara: "Präteritum de 'haben' (ich)", dorso: "hatte" },
      { cara: "Präteritum de 'können' (er)", dorso: "konnte" },
      { cara: "Präteritum de 'müssen' (wir)", dorso: "mussten" },
      { cara: "Präteritum de 'dürfen' (du)", dorso: "durftest" },
      { cara: "Präteritum de 'wollen' (sie Pl.)", dorso: "wollten" },
      { cara: "Präteritum de 'mögen' (ich)", dorso: "mochte" },
      { cara: "Präteritum de 'sollen' (ihr)", dorso: "solltet" }
    ]
  },
  {
    id: "a2_1_komparativ",
    nivel: "A2.1",
    titulo: "Comparativo y superlativo",
    icono: "⚖️",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    resumen: "groß – größer – am größten. Formas regulares e irregulares, comparaciones con als y wie.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">⚖️ Comparativo y superlativo</h3>
<p class="mb-3">El comparativo se forma añadiendo <span class="text-yellow-400">-er</span>. El superlativo usa <span class="text-yellow-400">am + -sten</span> (predicativo) o <span class="text-yellow-400">-ste</span> (atributivo). Muchos adjetivos de una sílaba añaden Umlaut en comparativo y superlativo.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Positivo</th><th class="p-2 border border-gray-600 text-left">Comparativo</th><th class="p-2 border border-gray-600 text-left">Superlativo (am ...sten)</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">schnell</td><td class="p-2 border border-gray-600">schneller</td><td class="p-2 border border-gray-600">am schnellsten</td></tr>
    <tr><td class="p-2 border border-gray-600">groß</td><td class="p-2 border border-gray-600">größer</td><td class="p-2 border border-gray-600">am größten</td></tr>
    <tr><td class="p-2 border border-gray-600">jung</td><td class="p-2 border border-gray-600">jünger</td><td class="p-2 border border-gray-600">am jüngsten</td></tr>
    <tr><td class="p-2 border border-gray-600">warm</td><td class="p-2 border border-gray-600">wärmer</td><td class="p-2 border border-gray-600">am wärmsten</td></tr>
    <tr><td class="p-2 border border-gray-600">lang</td><td class="p-2 border border-gray-600">länger</td><td class="p-2 border border-gray-600">am längsten</td></tr>
    <tr><td class="p-2 border border-gray-600">kurz</td><td class="p-2 border border-gray-600">kürzer</td><td class="p-2 border border-gray-600">am kürzesten</td></tr>
    <tr><td class="p-2 border border-gray-600">alt</td><td class="p-2 border border-gray-600">älter</td><td class="p-2 border border-gray-600">am ältesten</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Irregulares:</strong> gut – besser – am besten; viel – mehr – am meisten; gern – lieber – am liebsten; hoch – höher – am höchsten; nah – näher – am nächsten.</p>
<p><strong>Comparación:</strong> con <span class="text-blue-400">als</span> (desigualdad: größer als) y <span class="text-blue-400">so/genauso ... wie</span> (igualdad: so groß wie).</p>`,
    ejemplos: [
      "Dein Auto ist schneller als meins. (Tu coche es más rápido que el mío.)",
      "Der Berg ist am höchsten. (La montaña es la más alta.)",
      "Er ist älter als ich. (Él es mayor que yo.)",
      "Dieser Kuchen schmeckt besser als der andere. (Esta tarta sabe mejor que la otra.)",
      "Sie ist genauso freundlich wie ihre Schwester. (Ella es igual de amable que su hermana.)",
      "Am liebsten trinke ich Kaffee. (Lo que más me gusta beber es café.)",
      "Das war der beste Tag meines Lebens. (Fue el mejor día de mi vida.)",
      "Je mehr ich lerne, desto einfacher wird es. (Cuanto más estudio, más fácil es.)"
    ],
    tips: [
      "Umlaut en comparativo/superlativo: adjetivos de una sílaba con a, o, u suelen llevarlo (alt, grob, jung, klug, kurz, lang, warm...).",
      "Los adjetivos terminados en -d, -t, -s, -z, -ß, -sch añaden -esten (kürzesten, süßesten, hübschesten).",
      "Con verbos, el superlativo con 'am liebsten' (gern) y 'am besten' (gut).",
      "En frases atributivas, el superlativo se declina: das schnellste Auto."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Peter ist ___ (más alto) als Klaus.", respuesta: "größer", opciones: null, traduccion: "Peter es más alto que Klaus.", pista: "groß → comparativo", explicacion: "groß → größer (Umlaut)." },
        { tipo: "hueco", frase: "Dieses Buch ist ___ (igual de interesante) wie das andere.", respuesta: "so interessant", opciones: null, traduccion: "Este libro es igual de interesante que el otro.", pista: "so ... wie", explicacion: "Igualdad: so + adjetivo base + wie." },
        { tipo: "opcion", frase: "Laura spricht ___ (mejor) Deutsch als letztes Jahr.", respuesta: "besser", opciones: ["besser", "mehr gut", "gut"], traduccion: "Laura habla mejor alemán que el año pasado.", pista: null, explicacion: "gut → besser (irregular)." },
        { tipo: "hueco", frase: "Dieser Kaffee ist ___ (el más caro) von allen.", respuesta: "am teuersten", opciones: null, traduccion: "Este café es el más caro de todos.", pista: "teuer → superlativo", explicacion: "teuer → am teuersten (pierde la 'e' y añade -sten)." },
        { tipo: "opcion", frase: "Er ist genauso alt ___ ich.", respuesta: "wie", opciones: ["wie", "als", "dass"], traduccion: "Él es igual de viejo que yo.", pista: null, explicacion: "genauso ... wie es la estructura fija." },
        { tipo: "hueco", frase: "Mein Bruder isst ___ (más) als ich.", respuesta: "mehr", opciones: null, traduccion: "Mi hermano come más que yo.", pista: "viel → comparativo", explicacion: "viel → mehr (irregular)." },
        { tipo: "hueco", frase: "Im Sommer ist es ___ (más cálido) als im Frühling.", respuesta: "wärmer", opciones: null, traduccion: "En verano es más cálido que en primavera.", pista: "warm → comparativo", explicacion: "warm → wärmer (Umlaut)." },
        { tipo: "opcion", frase: "___ (cuanto más) sie übt, desto besser wird sie.", respuesta: "Je mehr", opciones: ["Je mehr", "Je viel", "wenn mehr"], traduccion: "Cuanto más practica, mejor se vuelve.", pista: null, explicacion: "Estructura je + comparativo, desto + comparativo." },
        { tipo: "hueco", frase: "Dein Vorschlag ist ___ (el mejor).", respuesta: "am besten", opciones: null, traduccion: "Tu propuesta es la mejor.", pista: "gut → superlativo", explicacion: "gut → am besten (irregular)." },
        { tipo: "hueco", frase: "Er wohnt ___ (más lejos) als früher.", respuesta: "weiter", opciones: null, traduccion: "Él vive más lejos que antes.", pista: "weit → comparativo", explicacion: "weit → weiter (regular)." },
        { tipo: "opcion", frase: "Welches Tier ist ___ (el más rápido)?", respuesta: "am schnellsten", opciones: ["am schnellsten", "schneller", "am schnellste"], traduccion: "¿Qué animal es el más rápido?", pista: null, explicacion: "schnell → am schnellsten (superlativo regular)." },
        { tipo: "hueco", frase: "Diese Aufgabe ist ___ (más fácil) als die letzte.", respuesta: "einfacher", opciones: null, traduccion: "Esta tarea es más fácil que la última.", pista: "einfach → comparativo", explicacion: "einfach → einfacher (sin Umlaut)." }
      ]
    },
    flashcards: [
      { cara: "Comparativo de 'groß'", dorso: "größer" },
      { cara: "Superlativo de 'schnell'", dorso: "am schnellsten" },
      { cara: "gut – besser – ...", dorso: "am besten" },
      { cara: "gern – lieber – ...", dorso: "am liebsten" },
      { cara: "viel – ... – am meisten", dorso: "mehr" },
      { cara: "Desigualdad (que)", dorso: "als (größer als)" },
      { cara: "Igualdad (tan ... como)", dorso: "so/genauso ... wie" },
      { cara: "Cuanto más... más...", dorso: "je mehr, desto mehr" }
    ]
  },
  {
    id: "a2_1_subordinadas",
    nivel: "A2.1",
    titulo: "Subordinadas básicas",
    icono: "🔗",
    colorBorde: "border-violet-500",
    bg: "bg-violet-950/30",
    resumen: "Oraciones con dass, weil, wenn, ob. Verbo conjugado al final. Aprende a construir frases complejas.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">🔗 Subordinadas con dass, weil, wenn, ob</h3>
<p class="mb-3">En alemán, las oraciones subordinadas envían el <span class="text-yellow-300 font-semibold">verbo conjugado al final</span>. La conjunción ocupa la primera posición de la subordinada.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Conjunción</th><th class="p-2 border border-gray-600 text-left">Significado</th><th class="p-2 border border-gray-600 text-left">Ejemplo</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600 font-mono">dass</td><td class="p-2 border border-gray-600">que (completiva)</td><td class="p-2 border border-gray-600">Ich weiß, <span class="text-yellow-400">dass du recht hast</span>.</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">weil</td><td class="p-2 border border-gray-600">porque</td><td class="p-2 border border-gray-600">Ich bleibe zu Hause, <span class="text-yellow-400">weil es regnet</span>.</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">wenn</td><td class="p-2 border border-gray-600">si / cuando (condicional/temporal)</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">Wenn du kommst</span>, freue ich mich.</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">ob</td><td class="p-2 border border-gray-600">si (interrogativa indirecta)</td><td class="p-2 border border-gray-600">Ich weiß nicht, <span class="text-yellow-400">ob er morgen kommt</span>.</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Regla de oro:</strong> conjunción + sujeto + complementos + verbo conjugado. Los prefijos separables no se separan en la subordinada: "weil ich ankomme".</p>
<p><strong>Uso temporal de wenn:</strong> para presente/futuro y acciones repetidas en pasado (cuando). No se usa para pasado único (als).</p>`,
    ejemplos: [
      "Ich glaube, dass du Recht hast. (Creo que tienes razón.)",
      "Er kommt nicht, weil er krank ist. (Él no viene porque está enfermo.)",
      "Wenn ich Zeit habe, besuche ich dich. (Si/cuando tenga tiempo, te visito.)",
      "Weißt du, ob der Zug pünktlich ist? (¿Sabes si el tren es puntual?)",
      "Sie sagt, dass sie morgen arbeiten muss. (Ella dice que mañana tiene que trabajar.)",
      "Wir gehen spazieren, wenn das Wetter schön ist. (Paseamos cuando hace buen tiempo.)",
      "Ich frage mich, ob das richtig ist. (Me pregunto si eso es correcto.)",
      "Bitte ruf an, wenn du angekommen bist. (Por favor llama cuando hayas llegado.)"
    ],
    tips: [
      "En subordinada, el verbo conjugado siempre al final. Si hay un verbo modal, el infinitivo va antes del modal: '..., weil ich kommen möchte'.",
      "Si la subordinada va al inicio, la oración principal empieza con el verbo: 'Wenn du kommst, (dann) freue ich mich.'",
      "Diferencia ob vs wenn: ob = si/no, wenn = si condicional o cuando.",
      "No confundir weil (porque) con denn (pues, coordenada sin cambio de orden)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich hoffe, ___ (que) du bald kommst.", respuesta: "dass", opciones: null, traduccion: "Espero que vengas pronto.", pista: "Conjunción completiva", explicacion: "dass introduce una subordinada, verbo al final." },
        { tipo: "hueco", frase: "Er ist müde, ___ (porque) er nicht geschlafen hat.", respuesta: "weil", opciones: null, traduccion: "Está cansado porque no ha dormido.", pista: "Causa → weil", explicacion: "weil + subordinada (hat al final)." },
        { tipo: "opcion", frase: "Ich weiß nicht, ___ er heute kommt.", respuesta: "ob", opciones: ["ob", "wenn", "dass"], traduccion: "No sé si él viene hoy.", pista: null, explicacion: "Interrogativa indirecta → ob." },
        { tipo: "hueco", frase: "___ (Si) du morgen Zeit hast, gehen wir ins Kino.", respuesta: "Wenn", opciones: null, traduccion: "Si mañana tienes tiempo, vamos al cine.", pista: "Condición → wenn", explicacion: "Wenn al inicio, subordinada verbo al final, luego principal invertida." },
        { tipo: "opcion", frase: "Er sagt, ___ er krank ist.", respuesta: "dass", opciones: ["dass", "weil", "ob"], traduccion: "Dice que está enfermo.", pista: null, explicacion: "Completiva con dass." },
        { tipo: "hueco", frase: "Ich rufe an, ___ (cuando) ich zu Hause bin.", respuesta: "wenn", opciones: null, traduccion: "Llamo cuando esté en casa.", pista: "Temporal (presente/futuro) → wenn", explicacion: "wenn para presente y futuro; el verbo 'bin' al final de la subordinada." },
        { tipo: "opcion", frase: "___ es regnet, bleibe ich drinnen.", respuesta: "Wenn", opciones: ["Wenn", "Weil", "Ob"], traduccion: "Si llueve, me quedo dentro.", pista: null, explicacion: "Condicional con wenn. La subordinada puede ir al principio." },
        { tipo: "hueco", frase: "Frag ihn, ___ (si) er mitkommen will.", respuesta: "ob", opciones: null, traduccion: "Pregúntale si quiere venir.", pista: "Pregunta indirecta", explicacion: "ob para preguntas de sí/no." },
        { tipo: "hueco", frase: "Ich kann nicht kommen, ___ (porque) ich arbeiten muss.", respuesta: "weil", opciones: null, traduccion: "No puedo venir porque tengo que trabajar.", pista: "Causa → weil", explicacion: "weil envía modal al final: 'weil ich arbeiten muss'." },
        { tipo: "opcion", frase: "Wir freuen uns, ___ du da bist.", respuesta: "dass", opciones: ["dass", "weil", "wenn"], traduccion: "Nos alegramos de que estés aquí.", pista: null, explicacion: "dass completivo tras 'sich freuen'." },
        { tipo: "hueco", frase: "___ (cuando) ich Kind war, spielte ich viel draußen.", respuesta: "Als", opciones: null, traduccion: "Cuando era niño, jugaba mucho fuera.", pista: "Pasado único → als, no wenn", explicacion: "'Als' para eventos pasados únicos; 'wenn' para acciones repetidas en pasado." },
        { tipo: "opcion", frase: "Kannst du mir sagen, ___ der Bus schon weg ist?", respuesta: "ob", opciones: ["ob", "wenn", "dass"], traduccion: "¿Puedes decirme si el autobús ya se ha ido?", pista: null, explicacion: "Pregunta indirecta: ob." }
      ]
    },
    flashcards: [
      { cara: "Conjunción 'que' (completiva)", dorso: "dass" },
      { cara: "Conjunción 'porque' (subordinada)", dorso: "weil" },
      { cara: "Conjunción 'si' (condicional)", dorso: "wenn" },
      { cara: "Conjunción 'si' (interrogativa)", dorso: "ob" },
      { cara: "Posición del verbo en subordinada", dorso: "Al final" },
      { cara: "Diferencia weil vs denn", dorso: "weil + verbo final, denn + verbo 2ª posición" },
      { cara: "Uso de 'als' para pasado único", dorso: "Als ich jung war, ..." },
      { cara: "Subordinada al inicio: 'Wenn ..., (dann) ...'", dorso: "Verbo principal al principio de la oración principal." }
    ]
  },
  {
    id: "a2_1_tekamolo",
    nivel: "A2.1",
    titulo: "Estructura de la oración (TeKaMoLo)",
    icono: "🧩",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Domina el orden de los complementos en alemán con la regla TeKaMoLo y las posiciones del verbo en cada tipo de oración.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">🧩 Orden de la oración alemana</h3>
<p class="mb-3">En alemán, el verbo conjugado es el ancla de la oración. Su posición define si es una oración <span class="text-yellow-400">principal</span> (V2), una <span class="text-yellow-400">pregunta</span> (V1) o una <span class="text-yellow-400">subordinada</span> (VL).</p>

<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Tipo</th><th class="p-2 border border-gray-600 text-left">Estructura</th><th class="p-2 border border-gray-600 text-left">Ejemplo</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">Hauptsatz (enunciativa)</td><td class="p-2 border border-gray-600">Sujeto + Verbo + (TeKaMoLo) + Infinitivo</td><td class="p-2 border border-gray-600">Ich <span class="text-yellow-400">gehe</span> morgen ins Kino.</td></tr>
    <tr><td class="p-2 border border-gray-600">Hauptsatz (invertida)</td><td class="p-2 border border-gray-600">Complemento + Verbo + Sujeto + ...</td><td class="p-2 border border-gray-600">Morgen <span class="text-yellow-400">gehe</span> ich ins Kino.</td></tr>
    <tr><td class="p-2 border border-gray-600">Ja/Nein Frage</td><td class="p-2 border border-gray-600">Verbo + Sujeto + ...</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">Gehst</span> du ins Kino?</td></tr>
    <tr><td class="p-2 border border-gray-600">W-Frage</td><td class="p-2 border border-gray-600">W-Wort + Verbo + Sujeto + ...</td><td class="p-2 border border-gray-600">Wann <span class="text-yellow-400">gehst</span> du?</td></tr>
    <tr><td class="p-2 border border-gray-600">Nebensatz</td><td class="p-2 border border-gray-600">Conjunción + Sujeto + ... + Verbo</td><td class="p-2 border border-gray-600">..., weil ich ins Kino <span class="text-yellow-400">gehe</span>.</td></tr>
  </tbody>
</table>
</div>

<h4 class="text-md font-semibold text-white mt-4 mb-2">📏 La regla TeKaMoLo</h4>
<p class="mb-2">Para ordenar <strong>complementos</strong> dentro de la oración principal:</p>
<ul class="list-disc list-inside space-y-1 text-gray-300 mb-3">
  <li><span class="text-yellow-400 font-bold">Te</span>mporal – ¿cuándo? (morgen, heute, um 8 Uhr)</li>
  <li><span class="text-yellow-400 font-bold">Ka</span>usal – ¿por qué? (wegen des Wetters, aus Angst)</li>
  <li><span class="text-yellow-400 font-bold">Mo</span>dal – ¿cómo? (mit dem Bus, schnell, gern)</li>
  <li><span class="text-yellow-400 font-bold">Lo</span>kal – ¿dónde? (in die Stadt, nach Hause, im Park)</li>
</ul>
<p class="mb-2"><strong>Ejemplo:</strong> Ich fahre <span class="text-yellow-300">morgen</span> (Te) <span class="text-yellow-300">wegen des Wetters</span> (Ka) <span class="text-yellow-300">mit dem Zug</span> (Mo) <span class="text-yellow-300">nach Berlin</span> (Lo).</p>
<p>Cuando un complemento va al inicio (posición 1), el orden del resto sigue igual y el verbo permanece en 2ª posición.</p>`,
    ejemplos: [
      "Ich gehe heute mit Freunden ins Schwimmbad. (Voy hoy con amigos a la piscina.)",
      "Morgen fahre ich wegen eines Termins mit dem Auto nach Hamburg. (Mañana voy en coche a Hamburgo por una cita.)",
      "Kommst du morgen? (¿Vienes mañana?) – Ja/Nein Frage.",
      "Wann trefft ihr euch? (¿Cuándo quedáis?) – W-Frage.",
      "Ich weiß nicht, ob er heute kommt. (No sé si él viene hoy.) – subordinada ob.",
      "Er ist müde, weil er gestern lange gearbeitet hat. (Está cansado porque ayer trabajó mucho.)",
      "Wenn es regnet, bleiben wir zu Hause. (Si llueve, nos quedamos en casa.)",
      "Letztes Jahr sind wir im Sommer nach Spanien geflogen. (El año pasado volamos a España en verano.)"
    ],
    tips: [
      "La regla TeKaMoLo aplica dentro del Mittelfeld (campo central) y es una tendencia, no obligatoria al 100%.",
      "El orden se altera si quieres enfatizar un elemento (ponerlo al principio).",
      "En preguntas, el verbo va primero (V1). En subordinadas, al final (VL).",
      "Con verbos modales, el infinitivo va al final de la oración principal: 'Ich muss heute früher ins Bett gehen'."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich fahre ___ (mañana) ___ (con el autobús) ___ (a la ciudad).", respuesta: "morgen mit dem Bus in die Stadt", opciones: null, traduccion: "Mañana voy con el autobús al centro.", pista: "TeKaMoLo", explicacion: "Orden: temporal (morgen), modal (mit dem Bus), lokal (in die Stadt)." },
        { tipo: "opcion", frase: "¿Cuál es el orden correcto? (heute – in die Schule – mit dem Fahrrad)", respuesta: "heute mit dem Fahrrad in die Schule", opciones: ["heute in die Schule mit dem Fahrrad", "heute mit dem Fahrrad in die Schule", "mit dem Fahrrad heute in die Schule"], traduccion: "hoy en bicicleta a la escuela", pista: null, explicacion: "TeKaMoLo: temporal (heute) → modal (mit dem Fahrrad) → lokal (in die Schule)." },
        { tipo: "hueco", frase: "___ (Mañana) ___ (va) er nach Berlin.", respuesta: "Morgen fährt", opciones: null, traduccion: "Mañana va él a Berlín.", pista: "Inversión: complemento en posición 1", explicacion: "Si pones 'morgen' al inicio, el verbo 'fährt' ocupa la 2ª posición y el sujeto la 3ª." },
        { tipo: "opcion", frase: "En una subordinada con 'weil', el verbo conjugado va...", respuesta: "Al final", opciones: ["Al final", "En 2ª posición", "Al principio"], traduccion: "Posición del verbo en subordinada", pista: null, explicacion: "En subordinadas con weil, dass, wenn, ob... el verbo conjugado se sitúa al final." },
        { tipo: "hueco", frase: "___ (¿A dónde) gehst du heute Abend?", respuesta: "Wohin", opciones: null, traduccion: "¿A dónde vas esta noche?", pista: "W-Frage", explicacion: "Wohin (W-Wort) + verbo (gehst) + sujeto (du)." },
        { tipo: "hueco", frase: "Sie bleibt zu Hause, ___ (porque) sie krank ist.", respuesta: "weil", opciones: null, traduccion: "Ella se queda en casa porque está enferma.", pista: "Conjunción subordinante", explicacion: "weil introduce la causa, verbo al final." },
        { tipo: "opcion", frase: "Ich ___ (como) heute Abend mit Freunden im Restaurant.", respuesta: "esse", opciones: ["esse", "heute", "mit Freunden"], traduccion: "Esta noche ceno con amigos en el restaurante.", pista: null, explicacion: "El verbo conjugado va en segunda posición (sujeto 'ich' es primera)." },
        { tipo: "hueco", frase: "Gestern ___ (ha) er bis 22 Uhr gearbeitet.", respuesta: "hat", opciones: null, traduccion: "Ayer ha trabajado hasta las 22h.", pista: "Inversión temporal", explicacion: "Gestern en posición 1 → verbo auxiliar 'hat' en segunda posición." },
        { tipo: "opcion", frase: "___ (¿Por qué) lernst du Deutsch?", respuesta: "Warum", opciones: ["Warum", "Weil", "Wann"], traduccion: "¿Por qué aprendes alemán?", pista: null, explicacion: "Warum es el W-Wort de causa; la estructura es: Warum + verbo + sujeto." },
        { tipo: "hueco", frase: "Ich muss heute länger im Büro ___ (trabajar).", respuesta: "arbeiten", opciones: null, traduccion: "Hoy tengo que trabajar más tiempo en la oficina.", pista: "Verbo modal + infinitivo al final", explicacion: "Con 'muss', el infinitivo 'arbeiten' va al final." },
        { tipo: "opcion", frase: "Ordena: (Wann / du / in den Urlaub / fährst / ?)", respuesta: "Wann fährst du in den Urlaub?", opciones: ["Wann du fährst in den Urlaub?", "Wann fährst du in den Urlaub?", "Fährst du wann in den Urlaub?"], traduccion: "¿Cuándo vas de vacaciones?", pista: null, explicacion: "Pregunta parcial: partícula interrogativa + verbo conjugado + sujeto + complementos." },
        { tipo: "hueco", frase: "Er fährt ___ (en verano) ___ (con su familia) ___ (a Italia).", respuesta: "im Sommer mit seiner Familie nach Italien", opciones: null, traduccion: "Él va en verano con su familia a Italia.", pista: "TeKaMoLo", explicacion: "Temporal: im Sommer, Modal: mit seiner Familie, Lokal: nach Italien." }
      ]
    },
    flashcards: [
      { cara: "Posición del verbo en enunciado", dorso: "2ª posición (V2)" },
      { cara: "Posición del verbo en pregunta sí/no", dorso: "1ª posición (V1)" },
      { cara: "Posición del verbo en subordinada", dorso: "Al final (VL)" },
      { cara: "Regla TeKaMoLo", dorso: "Temporal → Kausal → Modal → Lokal" },
      { cara: "Ejemplo TeKaMoLo", dorso: "Ich fahre morgen mit dem Bus in die Stadt." },
      { cara: "Inversión con complemento al inicio", dorso: "Morgen gehe ich ins Kino." },
      { cara: "W-Frage estructura", dorso: "W-Wort + Verbo + Sujeto" },
      { cara: "Infinitivo con modal", dorso: "Al final: Ich muss arbeiten." }
    ]
  }
];