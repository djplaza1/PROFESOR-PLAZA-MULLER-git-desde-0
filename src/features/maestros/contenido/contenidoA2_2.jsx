window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};
window.Muller.Maestros.contenido.A2_2 = [
  {
    id: "a2_2_preposiciones_fijas",
    nivel: "A2.2",
    titulo: "Verbos con preposiciones fijas",
    icono: "🔗",
    colorBorde: "border-indigo-500",
    bg: "bg-indigo-950/30",
    resumen: "warten auf, denken an, sich freuen über/auf... Verbos que siempre van con una preposición y caso concretos.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📎 Verbos con preposiciones fijas</h3>
<p class="mb-3">Muchos verbos alemanes exigen una preposición específica y un caso determinado (acusativo o dativo). Aprenderlos en conjunto es esencial.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Verbo</th><th class="p-2 border border-gray-600 text-left">Preposición + caso</th><th class="p-2 border border-gray-600 text-left">Significado</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">warten</td><td class="p-2 border border-gray-600">auf + Akk</td><td class="p-2 border border-gray-600">esperar a</td></tr>
    <tr><td class="p-2 border border-gray-600">denken</td><td class="p-2 border border-gray-600">an + Akk</td><td class="p-2 border border-gray-600">pensar en</td></tr>
    <tr><td class="p-2 border border-gray-600">sich freuen</td><td class="p-2 border border-gray-600">über + Akk (algo presente) / auf + Akk (algo futuro)</td><td class="p-2 border border-gray-600">alegrarse de/por</td></tr>
    <tr><td class="p-2 border border-gray-600">sich interessieren</td><td class="p-2 border border-gray-600">für + Akk</td><td class="p-2 border border-gray-600">interesarse por</td></tr>
    <tr><td class="p-2 border border-gray-600">sich kümmern</td><td class="p-2 border border-gray-600">um + Akk</td><td class="p-2 border border-gray-600">ocuparse de</td></tr>
    <tr><td class="p-2 border border-gray-600">träumen</td><td class="p-2 border border-gray-600">von + Dat</td><td class="p-2 border border-gray-600">soñar con</td></tr>
    <tr><td class="p-2 border border-gray-600">sprechen</td><td class="p-2 border border-gray-600">über + Akk / mit + Dat</td><td class="p-2 border border-gray-600">hablar sobre / con</td></tr>
    <tr><td class="p-2 border border-gray-600">fragen</td><td class="p-2 border border-gray-600">nach + Dat</td><td class="p-2 border border-gray-600">preguntar por</td></tr>
    <tr><td class="p-2 border border-gray-600">danken</td><td class="p-2 border border-gray-600">für + Akk</td><td class="p-2 border border-gray-600">agradecer por</td></tr>
    <tr><td class="p-2 border border-gray-600">sich erinnern</td><td class="p-2 border border-gray-600">an + Akk</td><td class="p-2 border border-gray-600">acordarse de</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2">En preguntas, la preposición se antepone al pronombre interrogativo: <span class="text-yellow-400">Worauf</span> wartest du? <span class="text-yellow-400">Wofür</span> interessierst du dich?</p>`,
    ejemplos: [
      "Ich warte auf den Bus. (Espero el autobús.)",
      "Denkst du oft an deine Familie? (¿Piensas a menudo en tu familia?)",
      "Er freut sich über das Geschenk. (Se alegra por el regalo - ya recibido.)",
      "Wir freuen uns auf den Urlaub. (Nos alegramos por las vacaciones - futuras.)",
      "Interessierst du dich für Politik? (¿Te interesa la política?)",
      "Sie kümmert sich um ihre Oma. (Ella cuida de su abuela.)",
      "Ich träume von einem großen Haus. (Sueño con una casa grande.)",
      "Erinnerst du dich an den letzten Sommer? (¿Te acuerdas del verano pasado?)"
    ],
    tips: [
      "sich freuen über + Akk = alegrarse por algo presente o pasado.",
      "sich freuen auf + Akk = tener ilusión por algo futuro.",
      "Los pronombres interrogativos fusionan: wo + preposición: worauf, wofür, wovon, woran...",
      "Algunos verbos tienen doble preposición: sprechen über (tema) + mit (persona)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich warte ___ (al) Bus.", respuesta: "auf den", opciones: null, traduccion: "Espero el autobús.", pista: "warten + auf + Akk", explicacion: "warten exige auf + acusativo: den Bus → auf den Bus." },
        { tipo: "hueco", frase: "Denkst du ___ (en) deine Zukunft?", respuesta: "an", opciones: null, traduccion: "¿Piensas en tu futuro?", pista: "denken + an + Akk", explicacion: "denken an + acusativo." },
        { tipo: "opcion", frase: "Wir freuen uns ___ das Konzert nächste Woche.", respuesta: "auf", opciones: ["auf", "über", "an"], traduccion: "Nos alegramos por el concierto de la semana que viene.", pista: null, explicacion: "Futuro → sich freuen auf + Akk." },
        { tipo: "hueco", frase: "Interessierst du dich ___ (por) Sport?", respuesta: "für", opciones: null, traduccion: "¿Te interesas por el deporte?", pista: "sich interessieren + für", explicacion: "für + acusativo." },
        { tipo: "opcion", frase: "Er kümmert sich ___ die Kinder.", respuesta: "um", opciones: ["um", "für", "über"], traduccion: "Se ocupa de los niños.", pista: null, explicacion: "sich kümmern um + Akk." },
        { tipo: "hueco", frase: "Sie träumt ___ (con) einem Urlaub am Meer.", respuesta: "von", opciones: null, traduccion: "Ella sueña con unas vacaciones en el mar.", pista: "träumen + von + Dat", explicacion: "träumen von + dativo: einem Urlaub." },
        { tipo: "opcion", frase: "___ träumst du?", respuesta: "Wovon", opciones: ["Wovon", "Worauf", "Wofür"], traduccion: "¿Con qué sueñas?", pista: null, explicacion: "Pregunta: wo + von → wovon." },
        { tipo: "hueco", frase: "Wir sprechen ___ (sobre) das neue Projekt.", respuesta: "über", opciones: null, traduccion: "Hablamos sobre el nuevo proyecto.", pista: "sprechen + über + Akk", explicacion: "sprechen über + acusativo." },
        { tipo: "opcion", frase: "___ wartest du?", respuesta: "Worauf", opciones: ["Worauf", "Wofür", "Woran"], traduccion: "¿A qué esperas?", pista: null, explicacion: "warten auf → pregunta: Worauf?" },
        { tipo: "hueco", frase: "Ich danke dir ___ (por) deine Hilfe.", respuesta: "für", opciones: null, traduccion: "Te agradezco por tu ayuda.", pista: "danken + für + Akk", explicacion: "danken für + acusativo." },
        { tipo: "hueco", frase: "Sie erinnert sich ___ (de) ihre Kindheit.", respuesta: "an", opciones: null, traduccion: "Ella se acuerda de su infancia.", pista: "sich erinnern + an + Akk", explicacion: "sich erinnern an + acusativo." },
        { tipo: "opcion", frase: "Ich freue mich ___ das Geschenk, das ich gestern bekommen habe.", respuesta: "über", opciones: ["über", "auf", "an"], traduccion: "Me alegro por el regalo que recibí ayer.", pista: null, explicacion: "Pasado/presente → sich freuen über." }
      ]
    },
    flashcards: [
      { cara: "warten + ?", dorso: "auf + Akk (esperar a)" },
      { cara: "denken + ?", dorso: "an + Akk (pensar en)" },
      { cara: "sich freuen (presente/pasado)", dorso: "über + Akk" },
      { cara: "sich freuen (futuro)", dorso: "auf + Akk" },
      { cara: "sich interessieren + ?", dorso: "für + Akk" },
      { cara: "sich kümmern + ?", dorso: "um + Akk" },
      { cara: "träumen + ?", dorso: "von + Dat" },
      { cara: "Pregunta para warten auf", dorso: "Worauf?" }
    ]
  },
  {
    id: "a2_2_konjunktiv_ii",
    nivel: "A2.2",
    titulo: "Konjunktiv II básico",
    icono: "✨",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "würde, hätte, wäre. Expresa deseos, cortesía y situaciones irreales. La base del subjuntivo alemán.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">✨ Konjunktiv II: würde, hätte, wäre</h3>
<p class="mb-3">El Konjunktiv II es el modo de la irrealidad, cortesía y los deseos. En A2 nos centramos en las tres formas clave: <span class="text-yellow-400">würde</span> + infinitivo, <span class="text-yellow-400">hätte</span> y <span class="text-yellow-400">wäre</span>.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Forma</th><th class="p-2 border border-gray-600 text-left">Uso</th><th class="p-2 border border-gray-600 text-left">Ejemplo</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600 font-mono">würde + Infinitiv</td><td class="p-2 border border-gray-600">Condicional / cortesía / deseos</td><td class="p-2 border border-gray-600">Ich <span class="text-yellow-400">würde</span> gern ein Eis essen.</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">hätte</td><td class="p-2 border border-gray-600">Konjunktiv II de haben</td><td class="p-2 border border-gray-600">Ich <span class="text-yellow-400">hätte</span> gern einen Kaffee.</td></tr>
    <tr><td class="p-2 border border-gray-600 font-mono">wäre</td><td class="p-2 border border-gray-600">Konjunktiv II de sein</td><td class="p-2 border border-gray-600">Das <span class="text-yellow-400">wäre</span> toll!</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Conjugación de würde:</strong> ich würde, du würdest, er/sie/es würde, wir würden, ihr würdet, sie/Sie würden.</p>
<p class="mb-2"><strong>hätte</strong> (de haben): ich hätte, du hättest, er/sie/es hätte, wir hätten, ihr hättet, sie hätten.</p>
<p class="mb-2"><strong>wäre</strong> (de sein): ich wäre, du wär(e)st, er/sie/es wäre, wir wären, ihr wärt, sie wären.</p>
<p>Expresiones: <span class="text-yellow-300">Ich hätte gern...</span> (Quisiera...), <span class="text-yellow-300">Es wäre schön, wenn...</span> (Sería bonito si...).</p>`,
    ejemplos: [
      "Ich würde gern verreisen. (Me gustaría viajar.)",
      "An deiner Stelle würde ich mehr lernen. (En tu lugar estudiaría más.)",
      "Ich hätte gern eine Tasse Tee. (Quisiera una taza de té.)",
      "Wenn ich Zeit hätte, würde ich kommen. (Si tuviera tiempo, vendría.)",
      "Das wäre super! (¡Eso sería genial!)",
      "Wärst du so nett und würdest mir helfen? (¿Serías tan amable y me ayudarías?)",
      "Hättest du morgen Zeit? (¿Tendrías tiempo mañana?)",
      "Ohne dich wäre ich nicht hier. (Sin ti no estaría aquí.)"
    ],
    tips: [
      "hätte gern es la forma educada de pedir algo, más suave que 'ich will'.",
      "würde + infinitivo sustituye a menudo a la forma propia del Konjunktiv II de los verbos (más fácil).",
      "En oraciones condicionales con 'wenn', la subordinada lleva hätte/wäre al final.",
      "Los verbos modales en KII: könnte, müsste, dürfte, wollte, sollte."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ (querría) gern ein Stück Kuchen.", respuesta: "hätte", opciones: null, traduccion: "Quisiera un trozo de tarta.", pista: "hätte gern", explicacion: "hätte es Konjunktiv II de haben, usado para pedir cortésmente." },
        { tipo: "hueco", frase: "An deiner Stelle ___ (haría) ich das nicht.", respuesta: "würde", opciones: null, traduccion: "En tu lugar no haría eso.", pista: "würde + infinitivo", explicacion: "würde + infinitivo para expresar condicional." },
        { tipo: "opcion", frase: "Wenn ich reich ___, würde ich ein Haus kaufen.", respuesta: "wäre", opciones: ["wäre", "hätte", "würde"], traduccion: "Si fuera rico, compraría una casa.", pista: null, explicacion: "sein en Konjunktiv II: ich wäre." },
        { tipo: "hueco", frase: "___ (Tendrías) du heute Abend Lust auf Kino?", respuesta: "Hättest", opciones: null, traduccion: "¿Tendrías ganas de cine esta noche?", pista: "hätte, 2ª pers.", explicacion: "hätte en 2ª persona: du hättest." },
        { tipo: "opcion", frase: "Das ___ ein großer Fehler.", respuesta: "wäre", opciones: ["wäre", "hätte", "würde"], traduccion: "Eso sería un gran error.", pista: null, explicacion: "ser en KII: wäre." },
        { tipo: "hueco", frase: "Wir ___ (haríamos) eine Pause, wenn wir müde wären.", respuesta: "würden", opciones: null, traduccion: "Haríamos una pausa si estuviéramos cansados.", pista: "würde 1ª pers. plural", explicacion: "würden para wir." },
        { tipo: "hueco", frase: "___ (Seríais) ihr damit einverstanden?", respuesta: "Wärt", opciones: null, traduccion: "¿Estaríais de acuerdo con eso?", pista: "wäre, 2ª pers. plural", explicacion: "ihr wärt (KII de sein)." },
        { tipo: "opcion", frase: "Ich ___ gern Frau Müller sprechen.", respuesta: "würde", opciones: ["würde", "hätte", "wäre"], traduccion: "Querría hablar con la Sra. Müller.", pista: null, explicacion: "würde + infinitivo para petición cortés." },
        { tipo: "hueco", frase: "Ohne Wörterbuch ___ (estaría) wir verloren.", respuesta: "wären", opciones: null, traduccion: "Sin diccionario estaríamos perdidos.", pista: "wäre, 1ª pers. plural", explicacion: "wir wären." },
        { tipo: "opcion", frase: "___ du gern mehr Freizeit?", respuesta: "Hättest", opciones: ["Hättest", "Wärst", "Würdest"], traduccion: "¿Te gustaría tener más tiempo libre?", pista: null, explicacion: "hätte gern: hättest du." },
        { tipo: "hueco", frase: "Wenn es morgen nicht regnen ___, gingen wir schwimmen.", respuesta: "würde", opciones: null, traduccion: "Si mañana no lloviera, iríamos a nadar.", pista: "würde + infinitivo (regnen)", explicacion: "würde regnen (condicional)." },
        { tipo: "opcion", frase: "Es ___ schön, wenn du kommst.", respuesta: "wäre", opciones: ["wäre", "hätte", "würde"], traduccion: "Sería bonito que vinieras.", pista: null, explicacion: "wäre para expresar deseo." }
      ]
    },
    flashcards: [
      { cara: "würde + ?", dorso: "Infinitivo (al final)" },
      { cara: "hätte (significado)", dorso: "tendría / quisiera (Konjunktiv II de haben)" },
      { cara: "wäre (significado)", dorso: "sería / estaría (Konjunktiv II de sein)" },
      { cara: "Pedir algo cortésmente", dorso: "Ich hätte gern..." },
      { cara: "Condicional (yo haría)", dorso: "Ich würde + Infinitiv" },
      { cara: "Konjunktiv II de 'du hast'", dorso: "du hättest" },
      { cara: "Konjunktiv II de 'wir sind'", dorso: "wir wären" },
      { cara: "Expresión: Si tuviera tiempo...", dorso: "Wenn ich Zeit hätte..." }
    ]
  },
  {
    id: "a2_2_passiv_presente",
    nivel: "A2.2",
    titulo: "Pasiva presente",
    icono: "🔄",
    colorBorde: "border-teal-500",
    bg: "bg-teal-950/30",
    resumen: "Voz pasiva en presente: werden + Partizip II. Enfoca la acción, no el sujeto. Es wird gemacht.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📦 Passiv Präsens (Voz pasiva presente)</h3>
<p class="mb-3">La pasiva desplaza el foco del agente a la acción realizada. Se forma con <span class="text-yellow-400">werden</span> + <span class="text-yellow-400">Partizip II</span> al final.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Aktiv</th><th class="p-2 border border-gray-600 text-left">Passiv</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">Der Mechaniker repariert das Auto.</td><td class="p-2 border border-gray-600">Das Auto <span class="text-yellow-400">wird</span> (vom Mechaniker) repariert.</td></tr>
    <tr><td class="p-2 border border-gray-600">Man baut hier ein Haus.</td><td class="p-2 border border-gray-600">Hier <span class="text-yellow-400">wird</span> ein Haus gebaut.</td></tr>
    <tr><td class="p-2 border border-gray-600">Die Firma stellt viele Produkte her.</td><td class="p-2 border border-gray-600">Viele Produkte <span class="text-yellow-400">werden</span> hergestellt.</td></tr>
  </tbody>
</table>
</div>
<p class="mb-3"><strong>Conjugación de werden:</strong> ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden.</p>
<p class="mb-2">El agente (quién) se expresa con <span class="text-blue-400">von + Dativ</span> (persona) o <span class="text-blue-400">durch + Akk</span> (instrumento/causa).</p>
<p>En preguntas: <span class="text-yellow-300">Wird das Frühstück um 8 serviert?</span> (¿Se sirve el desayuno a las 8?).</p>`,
    ejemplos: [
      "Das Fenster wird geöffnet. (Se abre la ventana.)",
      "Der Kuchen wird gebacken. (El pastel se hornea.)",
      "Die Briefe werden morgen verschickt. (Las cartas se envían mañana.)",
      "Das Haus wird von einem Architekten geplant. (La casa es planeada por un arquitecto.)",
      "Die Tür wird geschlossen. (La puerta se cierra.)",
      "Hier wird Deutsch gesprochen. (Aquí se habla alemán.)",
      "Das Auto wird repariert. (El coche se repara.)",
      "Wird hier geraucht? (¿Se fuma aquí?)"
    ],
    tips: [
      "El verbo werden pierde su sentido de 'llegar a ser' y actúa como auxiliar.",
      "El Partizip II va al final, justo después del último complemento.",
      "Con verbos separables, el Partizip II se escribe junto: hergestellt, aufgemacht.",
      "La pasiva impersonal con 'es': Es wird getanzt. (Se baila.)"
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das Auto ___ (es) repariert.", respuesta: "wird", opciones: null, traduccion: "El coche es reparado.", pista: "werden conjugado", explicacion: "3ª persona sing.: wird + Partizip II (repariert)." },
        { tipo: "hueco", frase: "Die Zeitung ___ (es) jeden Morgen geliefert.", respuesta: "wird", opciones: null, traduccion: "El periódico se entrega cada mañana.", pista: "werden 3ª sing.", explicacion: "wird geliefert (Pasiva presente)." },
        { tipo: "opcion", frase: "Die Bücher ___ von den Schülern gelesen.", respuesta: "werden", opciones: ["werden", "wird", "wurden"], traduccion: "Los libros son leídos por los alumnos.", pista: null, explicacion: "Plural: die Bücher werden gelesen." },
        { tipo: "hueco", frase: "Hier ___ (se) nicht geparkt.", respuesta: "wird", opciones: null, traduccion: "Aquí no se aparca.", pista: "Pasiva impersonal", explicacion: "Es wird (omitido 'es') + Partizip II." },
        { tipo: "opcion", frase: "Der Kaffee ___ jetzt serviert.", respuesta: "wird", opciones: ["wird", "werden", "ist"], traduccion: "El café se sirve ahora.", pista: null, explicacion: "Singular (der Kaffee) → wird." },
        { tipo: "hueco", frase: "Die Fenster ___ (son) jeden Tag geputzt.", respuesta: "werden", opciones: null, traduccion: "Las ventanas se limpian cada día.", pista: "werden plural", explicacion: "Die Fenster (plural) → werden geputzt." },
        { tipo: "hueco", frase: "Von wem ___ (es) das Essen gekocht?", respuesta: "wird", opciones: null, traduccion: "¿Por quién es cocinada la comida?", pista: "Pregunta pasiva", explicacion: "Wird ... gekocht? (voz pasiva)." },
        { tipo: "opcion", frase: "Man verkauft hier Obst. → Pasiva:", respuesta: "Hier wird Obst verkauft.", opciones: ["Hier wird Obst verkauft.", "Obst wird hier verkauft.", "Es verkauft Obst hier."], traduccion: "Aquí se vende fruta.", pista: null, explicacion: "Man → pasiva impersonal: wird verkauft." },
        { tipo: "hueco", frase: "Die Tür ___ (es) um 22 Uhr geschlossen.", respuesta: "wird", opciones: null, traduccion: "La puerta se cierra a las 22h.", pista: "werden + Partizip II", explicacion: "Singular femenino: die Tür wird geschlossen." },
        { tipo: "opcion", frase: "___ hier Deutsch gesprochen?", respuesta: "Wird", opciones: ["Wird", "Werden", "Ist"], traduccion: "¿Se habla alemán aquí?", pista: null, explicacion: "Pregunta pasiva impersonal: Wird ... gesprochen?" },
        { tipo: "hueco", frase: "Die Produkte ___ (son) in Deutschland hergestellt.", respuesta: "werden", opciones: null, traduccion: "Los productos se fabrican en Alemania.", pista: "Plural", explicacion: "Die Produkte (plural) → werden hergestellt." },
        { tipo: "hueco", frase: "Die Rechnung ___ (es) morgen bezahlt.", respuesta: "wird", opciones: null, traduccion: "La factura se pagará mañana.", pista: "Futur pasivo (misma forma presente)", explicacion: "La pasiva presente sirve también para futuro cercano." }
      ]
    },
    flashcards: [
      { cara: "Pasiva presente: werden + ?", dorso: "Partizip II (al final)" },
      { cara: "Aktiv: Der Mechaniker repariert das Auto.", dorso: "Passiv: Das Auto wird repariert." },
      { cara: "Agente personal (von)", dorso: "von + Dativ (vom Mechaniker)" },
      { cara: "Agente instrumental (durch)", dorso: "durch + Akk (durch den Wind)" },
      { cara: "Pasiva impersonal (se)", dorso: "Es wird getanzt. / Hier wird geraucht." },
      { cara: "werden conjugado (ich)", dorso: "ich werde" },
      { cara: "werden conjugado (er)", dorso: "er wird" },
      { cara: "werden conjugado (wir)", dorso: "wir werden" }
    ]
  },
  {
    id: "a2_2_relativ",
    nivel: "A2.2",
    titulo: "Pronombres relativos",
    icono: "🔗",
    colorBorde: "border-rose-500",
    bg: "bg-rose-950/30",
    resumen: "Frases de relativo con der, die, das en nominativo y acusativo. Amplía tus oraciones con precisión.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">🗂️ Pronombres relativos (Nominativ & Akkusativ)</h3>
<p class="mb-3">Los pronombres relativos introducen una subordinada y concuerdan en <strong>género y número</strong> con el antecedente. El <strong>caso</strong> depende de su función en la subordinada.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Caso</th><th class="p-2 border border-gray-600 text-left">Maskulin</th><th class="p-2 border border-gray-600 text-left">Neutrum</th><th class="p-2 border border-gray-600 text-left">Feminin</th><th class="p-2 border border-gray-600 text-left">Plural</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">Nominativ</td><td class="p-2 border border-gray-600">der</td><td class="p-2 border border-gray-600">das</td><td class="p-2 border border-gray-600">die</td><td class="p-2 border border-gray-600">die</td></tr>
    <tr><td class="p-2 border border-gray-600">Akkusativ</td><td class="p-2 border border-gray-600">den</td><td class="p-2 border border-gray-600">das</td><td class="p-2 border border-gray-600">die</td><td class="p-2 border border-gray-600">die</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Estructura:</strong> Antecedente + <span class="text-yellow-400">,</span> pronombre relativo + ... + verbo al final.</p>
<p><strong>Nominativ:</strong> Das ist der Mann, <span class="text-yellow-400">der</span> mir geholfen hat. (sujeto de la subordinada)<br>
<strong>Akkusativ:</strong> Das ist der Mann, <span class="text-yellow-400">den</span> ich gesehen habe. (objeto directo de la subordinada)</p>`,
    ejemplos: [
      "Das ist die Frau, die sehr nett ist. (Esta es la mujer que es muy amable.)",
      "Kennst du den Jungen, der dort steht? (¿Conoces al chico que está allí?)",
      "Das Buch, das ich lese, ist spannend. (El libro que leo es emocionante.)",
      "Die Blumen, die du mir gegeben hast, sind schön. (Las flores que me has dado son bonitas.)",
      "Er ist der Mann, den ich liebe. (Él es el hombre al que amo.)",
      "Das ist das Auto, das ich kaufen möchte. (Ese es el coche que quiero comprar.)",
      "Die Touristen, die aus Spanien kommen, sind freundlich. (Los turistas que vienen de España son amables.)",
      "Das ist der Lehrer, den alle Schüler schätzen. (Él es el profesor al que todos los alumnos aprecian.)"
    ],
    tips: [
      "El verbo de la oración relativa va al final.",
      "Si el pronombre relativo va precedido de preposición, cambia de caso: der Mann, mit dem ich spreche (Dat).",
      "En acusativo femenino y neutro es igual al nominativo (die / das).",
      "La coma antes del relativo es obligatoria."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das ist die Frau, ___ (que) sehr gut kocht.", respuesta: "die", opciones: null, traduccion: "Esta es la mujer que cocina muy bien.", pista: "Pronombre relativo fem. nom.", explicacion: "Relativo nominativo femenino: die." },
        { tipo: "hueco", frase: "Kennst du den Mann, ___ (que) dort arbeitet?", respuesta: "der", opciones: null, traduccion: "¿Conoces al hombre que trabaja allí?", pista: "Relativo masc. nom.", explicacion: "Maskulin nominativo: der." },
        { tipo: "opcion", frase: "Das Kind, ___ spielt, ist mein Sohn.", respuesta: "das", opciones: ["das", "den", "der"], traduccion: "El niño que juega es mi hijo.", pista: null, explicacion: "Neutrum nominativo: das." },
        { tipo: "hueco", frase: "Der Film, ___ (que) ich gestern gesehen habe, war langweilig.", respuesta: "den", opciones: null, traduccion: "La película que vi ayer fue aburrida.", pista: "Masc. akk.", explicacion: "Maskulin acusativo: den (objeto de 'gesehen habe')." },
        { tipo: "opcion", frase: "Die Tasche, ___ du gekauft hast, gefällt mir.", respuesta: "die", opciones: ["die", "den", "das"], traduccion: "El bolso que has comprado me gusta.", pista: null, explicacion: "Feminino acusativo = die." },
        { tipo: "hueco", frase: "Das sind die Leute, ___ (que) hier wohnen.", respuesta: "die", opciones: null, traduccion: "Esas son las personas que viven aquí.", pista: "Plural nom.", explicacion: "Plural nominativo: die." },
        { tipo: "hueco", frase: "Er ist der Professor, ___ (al que) alle respektieren.", respuesta: "den", opciones: null, traduccion: "Él es el profesor al que todos respetan.", pista: "Masc. akk.", explicacion: "Maskulin acusativo: den." },
        { tipo: "opcion", frase: "Das Auto, ___ in der Garage steht, ist neu.", respuesta: "das", opciones: ["das", "den", "der"], traduccion: "El coche que está en el garaje es nuevo.", pista: null, explicacion: "Neutrum nominativo: das." },
        { tipo: "hueco", frase: "Die Schüler, ___ (que) Spanisch lernen, reisen nach Madrid.", respuesta: "die", opciones: null, traduccion: "Los estudiantes que aprenden español viajan a Madrid.", pista: "Plural nom.", explicacion: "Plural nominativo: die." },
        { tipo: "opcion", frase: "Der Hund, ___ ich gefüttert habe, ist sehr lieb.", respuesta: "den", opciones: ["den", "der", "das"], traduccion: "El perro que he alimentado es muy bueno.", pista: null, explicacion: "Maskulin acusativo: den." },
        { tipo: "hueco", frase: "Die Frau, ___ (que) du getroffen hast, ist meine Tante.", respuesta: "die", opciones: null, traduccion: "La mujer que has encontrado es mi tía.", pista: "Fem. akk.", explicacion: "Feminino acusativo: die." },
        { tipo: "opcion", frase: "Das ist das Haus, ___ mir sehr gut gefällt.", respuesta: "das", opciones: ["das", "den", "die"], traduccion: "Esa es la casa que me gusta mucho.", pista: null, explicacion: "Neutrum nominativo: das." }
      ]
    },
    flashcards: [
      { cara: "Relativo masc. nom.", dorso: "der" },
      { cara: "Relativo neutro nom.", dorso: "das" },
      { cara: "Relativo fem. nom.", dorso: "die" },
      { cara: "Relativo masc. akk.", dorso: "den" },
      { cara: "Relativo fem./neutro/plural akk.", dorso: "die / das / die" },
      { cara: "Estructura de la oración relativa", dorso: "Antecedente, pron. relativo + ... + verbo al final" },
      { cara: "Ejemplo relativo acusativo", dorso: "Der Mann, den ich sehe, ..." },
      { cara: "Preposición + relativo (Dat)", dorso: "Der Mann, mit dem ich spreche, ..." }
    ]
  },
  {
    id: "a2_2_genitiv",
    nivel: "A2.2",
    titulo: "Genitivo",
    icono: "📛",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "El caso posesivo: des, der, des. Indica pertenencia y se usa con ciertas preposiciones.",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📛 El caso genitivo</h3>
<p class="mb-3">El genitivo expresa <strong>posesión o relación</strong> entre dos sustantivos. Equivale a "de" en español y responde a <span class="text-blue-400">Wessen? (¿de quién?)</span>.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left"></th><th class="p-2 border border-gray-600 text-left">Maskulin / Neutrum</th><th class="p-2 border border-gray-600 text-left">Feminin / Plural</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600">Artículo definido</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">des</span> Mannes / <span class="text-yellow-400">des</span> Kindes</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">der</span> Frau / <span class="text-yellow-400">der</span> Leute</td></tr>
    <tr><td class="p-2 border border-gray-600">Artículo indefinido</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">eines</span> Vaters</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">einer</span> Mutter</td></tr>
    <tr><td class="p-2 border border-gray-600">Possessiv</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">meines</span> Bruders</td><td class="p-2 border border-gray-600"><span class="text-yellow-400">meiner</span> Schwester</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Sustantivos masculinos y neutros</strong> añaden <span class="text-yellow-300">-s</span> (o -es si son monosílabos): der Hund des Mannes, das Spielzeug des Kindes.</p>
<p class="mb-2"><strong>Femenino y plural:</strong> sin terminación adicional: die Tasche der Frau, die Meinung der Leute.</p>
<p><strong>Preposiciones con genitivo:</strong> <span class="text-blue-400">während</span> (durante), <span class="text-blue-400">wegen</span> (a causa de), <span class="text-blue-400">trotz</span> (a pesar de), <span class="text-blue-400">statt</span> (en lugar de), <span class="text-blue-400">innerhalb / außerhalb</span> (dentro/fuera de).</p>`,
    ejemplos: [
      "Das Auto meines Vaters ist blau. (El coche de mi padre es azul.)",
      "Die Tür des Hauses steht offen. (La puerta de la casa está abierta.)",
      "Wegen des Regens bleiben wir zu Hause. (Por la lluvia nos quedamos en casa.)",
      "Trotz der Kälte gehen wir spazieren. (A pesar del frío vamos a pasear.)",
      "Während des Urlaubs haben wir viel gesehen. (Durante las vacaciones vimos mucho.)",
      "Statt eines Briefes hat sie eine E-Mail geschickt. (En lugar de una carta envió un email.)",
      "Die Farbe der Blumen gefällt mir. (El color de las flores me gusta.)",
      "Innerhalb der Stadt gibt es viele Parks. (Dentro de la ciudad hay muchos parques.)"
    ],
    tips: [
      "En alemán coloquial se usa 'von + Dat' en lugar de genitivo: das Auto von meinem Vater.",
      "Los nombres propios en genitivo van delante y sin artículo: Peters Auto, Annas Tasche.",
      "Wegen + Dat se usa cada vez más en el lenguaje hablado.",
      "El sustantivo masculino/neutro siempre en genitivo con -s o -es."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das ist das Buch ___ (de mi) Vaters.", respuesta: "meines", opciones: null, traduccion: "Este es el libro de mi padre.", pista: "Genitivo maskulin", explicacion: "Possessiv: mein Vater → meines Vaters." },
        { tipo: "hueco", frase: "Die Schwester ___ (de la) Frau ist krank.", respuesta: "der", opciones: null, traduccion: "La hermana de la mujer está enferma.", pista: "Feminin genitivo", explicacion: "Artikel fem. genitivo: der Frau." },
        { tipo: "opcion", frase: "___ des Wetters fiel das Spiel aus.", respuesta: "Wegen", opciones: ["Wegen", "Trotz", "Während"], traduccion: "Debido al tiempo se canceló el partido.", pista: null, explicacion: "Wegen + genitivo (causa)." },
        { tipo: "hueco", frase: "___ (A pesar de) der Erkältung geht er arbeiten.", respuesta: "Trotz", opciones: null, traduccion: "A pesar del resfriado va a trabajar.", pista: "Preposición con genitivo", explicacion: "trotz + genitivo." },
        { tipo: "opcion", frase: "Die Farbe ___ (del) Wagens gefällt mir.", respuesta: "des", opciones: ["des", "dem", "der"], traduccion: "El color del coche me gusta.", pista: null, explicacion: "Maskulin genitivo: des Wagens." },
        { tipo: "hueco", frase: "___ (Durante) des Konzerts war es still.", respuesta: "Während", opciones: null, traduccion: "Durante el concierto se hizo silencio.", pista: "Preposición temporal", explicacion: "während + genitivo." },
        { tipo: "opcion", frase: "Das Spielzeug ___ Kindes ist neu.", respuesta: "des", opciones: ["des", "der", "dem"], traduccion: "El juguete del niño es nuevo.", pista: null, explicacion: "Neutrum genitivo: des Kindes." },
        { tipo: "hueco", frase: "___ (En lugar de) eines Autos hat er ein Fahrrad gekauft.", respuesta: "Statt", opciones: null, traduccion: "En lugar de un coche compró una bicicleta.", pista: "statt + genitivo", explicacion: "statt + genitivo." },
        { tipo: "opcion", frase: "Die Wohnung ___ (de mis) Eltern ist groß.", respuesta: "meiner", opciones: ["meiner", "meines", "meinem"], traduccion: "El piso de mis padres es grande.", pista: null, explicacion: "Plural genitivo: meiner Eltern." },
        { tipo: "hueco", frase: "Das Ende ___ (de la) Straße ist weit.", respuesta: "der", opciones: null, traduccion: "El final de la calle está lejos.", pista: "Fem. genitivo", explicacion: "der Straße (genitivo femenino)." },
        { tipo: "opcion", frase: "___ des Films haben wir Popcorn gegessen.", respuesta: "Während", opciones: ["Während", "Wegen", "Trotz"], traduccion: "Durante la película comimos palomitas.", pista: null, explicacion: "während + genitivo." },
        { tipo: "hueco", frase: "Ich bleibe ___ (a causa del) schlechten Wetters zu Hause.", respuesta: "wegen des", opciones: null, traduccion: "Me quedo en casa por el mal tiempo.", pista: "wegen + genitivo neutro", explicacion: "das Wetter → des Wetters." }
      ]
    },
    flashcards: [
      { cara: "Genitivo mask. / neut. definido", dorso: "des (des Mannes / Kindes)" },
      { cara: "Genitivo fem. / plural definido", dorso: "der (der Frau / der Leute)" },
      { cara: "Preposición 'a causa de'", dorso: "wegen + Genitiv" },
      { cara: "Preposición 'durante'", dorso: "während + Genitiv" },
      { cara: "Preposición 'a pesar de'", dorso: "trotz + Genitiv" },
      { cara: "Genitivo con nombres propios", dorso: "Peters Auto (antepuesto, sin artículo)" },
      { cara: "Alternativa coloquial al genitivo", dorso: "von + Dat: das Auto von meinem Vater" },
      { cara: "Posesivo masc. genitivo (mi)", dorso: "meines (meines Vaters)" }
    ]
  },
  {
    id: "a2_2_infinitiv_zu",
    nivel: "A2.2",
    titulo: "Infinitivo con zu",
    icono: "📌",
    colorBorde: "border-red-500",
    bg: "bg-red-950/30",
    resumen: "Construcciones con zu + infinitivo: es ist wichtig zu..., ich habe Lust zu..., ohne zu..., statt zu...",
    explicacion: `<h3 class="text-lg font-bold text-white mb-3">📌 Infinitivo con zu</h3>
<p class="mb-3">Cuando un verbo en infinitivo depende de otro verbo, sustantivo o adjetivo, se emplea <span class="text-yellow-400">zu + Infinitiv</span> al final de la oración.</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-gray-700"><th class="p-2 border border-gray-600 text-left">Estructura</th><th class="p-2 border border-gray-600 text-left">Ejemplo</th></tr>
  </thead>
  <tbody class="text-gray-300">
    <tr><td class="p-2 border border-gray-600"><span class="text-blue-400">es ist + Adjektiv</span>, zu + Infinitiv</td><td class="p-2 border border-gray-600">Es ist <strong>wichtig</strong>, viel <span class="text-yellow-400">zu</span> trinken.</td></tr>
    <tr><td class="p-2 border border-gray-600"><span class="text-blue-400">Sujeto + verbo + </span>zu + Infinitiv</td><td class="p-2 border border-gray-600">Ich <strong>habe</strong> keine Zeit, dich <span class="text-yellow-400">zu</span> besuchen.</td></tr>
    <tr><td class="p-2 border border-gray-600"><span class="text-blue-400">um ... zu, ohne ... zu, statt ... zu</span></td><td class="p-2 border border-gray-600">Er geht, <strong>ohne</strong> etwas <span class="text-yellow-400">zu</span> sagen.</td></tr>
  </tbody>
</table>
</div>
<p class="mb-2"><strong>Expresiones típicas:</strong></p>
<ul class="list-disc list-inside space-y-1 text-gray-300 mb-3">
  <li>Ich habe <span class="text-yellow-400">Lust</span>, ins Kino zu gehen.</li>
  <li>Es ist <span class="text-yellow-400">schön</span>, dich wiederzusehen.</li>
  <li>Er fährt nach Berlin, <span class="text-yellow-400">um</span> eine Freundin zu besuchen.</li>
</ul>
<p>Con verbos separables, <span class="text-yellow-400">zu</span> va entre el prefijo y la raíz: <span class="text-yellow-300">anzukommen, mitzubringen, aufzuräumen</span>.</p>`,
    ejemplos: [
      "Es ist gesund, viel Obst zu essen. (Es sano comer mucha fruta.)",
      "Ich habe vor, nächstes Jahr nach Deutschland zu reisen. (Planeo viajar a Alemania el año que viene.)",
      "Sie ging, ohne sich zu verabschieden. (Se fue sin despedirse.)",
      "Statt zu lernen, spielt er Videospiele. (En lugar de estudiar, juega a videojuegos.)",
      "Ich freue mich, dich zu sehen. (Me alegra verte.)",
      "Es ist schwierig, eine neue Sprache zu lernen. (Es difícil aprender un nuevo idioma.)",
      "Er geht in die Bibliothek, um zu lernen. (Va a la biblioteca para estudiar.)",
      "Hast du Lust, mit uns zu kommen? (¿Tienes ganas de venir con nosotros?)"
    ],
    tips: [
      "Con verbos modales no se usa zu: Ich muss gehen (no 'zu gehen').",
      "La construcción 'um ... zu' expresa propósito.",
      "'ohne ... zu' = sin hacer algo; 'statt ... zu' = en lugar de hacer algo.",
      "Con estructuras de infinitivo complejas, el infinitivo con zu cierra la oración."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Es ist wichtig, genug Wasser ___ (beber).", respuesta: "zu trinken", opciones: null, traduccion: "Es importante beber suficiente agua.", pista: "zu + Infinitiv", explicacion: "zu trinken (infinitivo con zu)." },
        { tipo: "hueco", frase: "Ich habe Lust, ins Kino ___ (ir).", respuesta: "zu gehen", opciones: null, traduccion: "Tengo ganas de ir al cine.", pista: "zu + Infinitiv", explicacion: "zu gehen (Lust haben, etw. zu tun)." },
        { tipo: "opcion", frase: "Er bleibt zu Hause, ___ zu lernen.", respuesta: "um", opciones: ["um", "ohne", "statt"], traduccion: "Se queda en casa para estudiar.", pista: null, explicacion: "um ... zu = para (finalidad)." },
        { tipo: "hueco", frase: "Sie verließ das Zimmer, ___ (sin) etwas zu sagen.", respuesta: "ohne", opciones: null, traduccion: "Salió de la habitación sin decir nada.", pista: "ohne ... zu", explicacion: "ohne ... zu (sin hacer algo)." },
        { tipo: "opcion", frase: "___ ins Fitnessstudio zu gehen, läuft er im Park.", respuesta: "Statt", opciones: ["Statt", "Ohne", "Um"], traduccion: "En lugar de ir al gimnasio, corre por el parque.", pista: null, explicacion: "statt ... zu (en lugar de)." },
        { tipo: "hueco", frase: "Ich habe vergessen, die Tür ___ (cerrar).", respuesta: "zu schließen", opciones: null, traduccion: "Olvidé cerrar la puerta.", pista: "vergessen + zu + Infinitiv", explicacion: "zu schließen (infinitivo con zu)." },
        { tipo: "opcion", frase: "Er fährt in die Stadt, ___ einen Freund zu treffen.", respuesta: "um", opciones: ["um", "ohne", "statt"], traduccion: "Va a la ciudad para encontrarse con un amigo.", pista: null, explicacion: "um ... zu = propósito." },
        { tipo: "hueco", frase: "Es ist schön, dich wieder ___ (ver).", respuesta: "zu sehen", opciones: null, traduccion: "Es bonito volver a verte.", pista: "zu + Infinitiv", explicacion: "zu sehen." },
        { tipo: "opcion", frase: "Er aß den Kuchen, ___ zu probieren.", respuesta: "ohne", opciones: ["ohne", "um", "statt"], traduccion: "Se comió el pastel sin probarlo.", pista: null, explicacion: "ohne ... zu = sin siquiera probarlo." },
        { tipo: "hueco", frase: "Hast du Zeit, mir ___ (ayudar)?", respuesta: "zu helfen", opciones: null, traduccion: "¿Tienes tiempo de ayudarme?", pista: "zu + Infinitiv", explicacion: "zu helfen." },
        { tipo: "opcion", frase: "___ Deutsch zu lernen, liest er jeden Tag.", respuesta: "Um", opciones: ["Um", "Ohne", "Statt"], traduccion: "Para aprender alemán lee cada día.", pista: null, explicacion: "Um ... zu al inicio." },
        { tipo: "hueco", frase: "Ich freue mich, bald nach Spanien ___ (viajar).", respuesta: "zu reisen", opciones: null, traduccion: "Me alegra viajar pronto a España.", pista: "sich freuen + zu + Infinitiv", explicacion: "zu reisen." }
      ]
    },
    flashcards: [
      { cara: "Infinitivo con zu (general)", dorso: "zu + Infinitiv al final" },
      { cara: "Propósito (para)", dorso: "um ... zu + Infinitiv" },
      { cara: "Sin hacer algo", dorso: "ohne ... zu + Infinitiv" },
      { cara: "En lugar de", dorso: "statt ... zu + Infinitiv" },
      { cara: "Expresión: tener ganas de", dorso: "Lust haben, etw. zu tun" },
      { cara: "Expresión: es difícil...", dorso: "Es ist schwierig, ... zu ..." },
      { cara: "Verbo separable con zu", dorso: "anzufangen, mitzubringen" },
      { cara: "Verbo modal + zu", dorso: "Nunca lleva zu: Ich muss gehen." }
    ]
  }
];