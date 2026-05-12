// src/features/maestros/contenido/contenidoB1_1.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.B1_1 = [
  // ============================================================
  // 1) KONJUNKTIV II GEGENWART
  // ============================================================
  {
    id: "b1_1_konjunktiv2_gegenwart",
    nivel: "B1.1",
    titulo: "Konjunktiv II Gegenwart (würde + Infinitiv)",
    icono: "💭",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    resumen: "El condicional alemán para expresar cortesía, deseos y situaciones irreales en el presente: würde + Infinitiv / Formas especiales (wäre, hätte, könnte...).",
    explicacion: `
      <h3 class="text-lg font-bold text-purple-400 mb-2">Konjunktiv II Gegenwart (Condicional presente)</h3>
      <p class="mb-2">El Konjunktiv II se usa para expresar <strong>cortesía</strong>, <strong>deseos irreales</strong> y <strong>situaciones hipotéticas</strong> en el presente.</p>
      <h4 class="font-bold text-purple-300 mt-2 mb-1">Forma principal: würde + Infinitiv</h4>
      <pre class="bg-gray-900 p-2 rounded text-xs mb-2">würde + Infinitiv (al final de la oración)</pre>
      <p class="mb-2"><strong>Ejemplo:</strong> Ich <strong>würde</strong> gern ein Bier <strong>trinken</strong>. (Me gustaría beber una cerveza).</p>
      <h4 class="font-bold text-purple-300 mt-2 mb-1">Formas especiales (verbos auxiliares y modales)</h4>
      <ul class="list-disc pl-5 mb-2 space-y-1 text-sm">
        <li><strong>wäre</strong> (ser/estar): Ich wäre gern in Berlin. (Me gustaría estar en Berlín).</li>
        <li><strong>hätte</strong> (haber/tener): Ich hätte gern mehr Zeit. (Me gustaría tener más tiempo).</li>
        <li><strong>könnte</strong> (poder): Könntest du mir helfen? (¿Podrías ayudarme?).</li>
        <li><strong>müsste</strong> (deber/tener que): Ich müsste mehr lernen. (Debería estudiar más).</li>
        <li><strong>wüsste</strong> (saber): Ich wüsste gern, ob... (Me gustaría saber si...).</li>
      </ul>
    `,
    ejemplos: [
      "Ich würde gern nach Deutschland reisen. (Me gustaría viajar a Alemania)",
      "Würdest du mir bitte helfen? (¿Te importaría ayudarme?)",
      "Wenn ich Zeit hätte, würde ich Sport machen. (Si tuviera tiempo, haría deporte)",
      "Ich wäre gern bei dir. (Me gustaría estar contigo)",
      "Könntest du das Fenster öffnen? (¿Podrías abrir la ventana?)"
    ],
    tips: [
      "Usa würde + Infinitiv para la mayoría de verbos. Las formas especiales (wäre, hätte) son más elegantes.",
      "Para cortesía: Könnten Sie...? / Würden Sie...? son más educados que können/werden.",
      "Nunca digas 'ich würde sein' - usa 'ich wäre' directamente."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ gern ein Bier trinken.", respuesta: "würde", opciones: null, traduccion: "Me gustaría beber una cerveza.", pista: "condicional de werden", explicacion: "würde + Infinitiv forma el condicional." },
        { tipo: "opcion", frase: "___ du mir bitte helfen?", respuesta: "Würdest", opciones: ["Würdest", "Wirst", "Wurdest", "Werdest"], traduccion: "¿Te importaría ayudarme?", pista: null, explicacion: "Würdest du = forma cortés de pregunta." },
        { tipo: "hueco", frase: "Ich ___ gern in Berlin.", respuesta: "wäre", opciones: null, traduccion: "Me gustaría estar en Berlín.", pista: "Konjunktiv II de sein", explicacion: "wäre = condicional de sein (ser/estar)." },
        { tipo: "hueco", frase: "Wenn ich Zeit ___, würde ich kommen.", respuesta: "hätte", opciones: null, traduccion: "Si tuviera tiempo, vendría.", pista: "Konjunktiv II de haben", explicacion: "hätte = condicional de haben (tener)." },
        { tipo: "opcion", frase: "Ich ___ gern mehr Geld.", respuesta: "hätte", opciones: ["hätte", "habe", "hatte", "haben würde"], traduccion: "Me gustaría tener más dinero.", pista: null, explicacion: "hätte gern = me gustaría tener." },
        { tipo: "hueco", frase: "___ Sie mir sagen, wo der Bahnhof ist?", respuesta: "Könnten", opciones: null, traduccion: "¿Podría decirme dónde está la estación?", pista: "cortesía formal", explicacion: "Könnten Sie = forma de cortesía muy educada." },
        { tipo: "opcion", frase: "Er ___ gern Arzt werden.", respuesta: "würde", opciones: ["würde", "wird", "wurde", "wäre"], traduccion: "A él le gustaría ser médico.", pista: null, explicacion: "würde + werden (Infinitiv) = sería." },
        { tipo: "hueco", frase: "Wir ___ gern ins Kino gehen.", respuesta: "würden", opciones: null, traduccion: "Nos gustaría ir al cine.", pista: "plural de würde", explicacion: "würden = 1ª persona plural (nosotros)." },
        { tipo: "opcion", frase: "___ ich Ihnen helfen?", respuesta: "Könnte", opciones: ["Könnte", "Kann", "Konnte", "Könne"], traduccion: "¿Podría ayudarle?", pista: null, explicacion: "Könnte ich = ofrecimiento cortés." },
        { tipo: "hueco", frase: "Er ___ gern, ob das stimmt.", respuesta: "wüsste", opciones: null, traduccion: "Le gustaría saber si eso es cierto.", pista: "Konjunktiv II de wissen", explicacion: "wüsste = condicional de wissen (saber)." },
        { tipo: "opcion", frase: "Ich ___ mehr schlafen, aber ich muss arbeiten.", respuesta: "würde", opciones: ["würde", "hätte", "wäre", "könnte"], traduccion: "Me gustaría dormir más, pero tengo que trabajar.", pista: null, explicacion: "würde + Infinitiv expresa un deseo." },
        { tipo: "hueco", frase: "Wenn ich reich ___, würde ich um die Welt reisen.", respuesta: "wäre", opciones: null, traduccion: "Si fuera rico, viajaría alrededor del mundo.", pista: "condicional de sein", explicacion: "wäre = condicional de sein con situación irreal." }
      ]
    }
  },
  // ============================================================
  // 2) KONJUNKTIV II VERGANGENHEIT
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Wenn ich mehr Geld gehabt ___, wäre ich gereist.", respuesta: "hätte", opciones: null, traduccion: "Si hubiera tenido más dinero, habría viajado.", pista: "KII de haben", explicacion: "hätte + Partizip II = condicional compuesto." },
        { tipo: "opcion", frase: "Ich ___ anrufen sollen, aber ich habe es vergessen.", respuesta: "hätte", opciones: ["hätte", "habe", "hatte", "würde"], traduccion: "Habría debido llamar, pero lo olvidé.", pista: null, explicacion: "hätte + sollen = debería haber." },
        { tipo: "hueco", frase: "___ du früher gekommen, hätten wir den Zug erwischt.", respuesta: "Wärst", opciones: null, traduccion: "Si hubieras venido antes, habríamos cogido el tren.", pista: "KII de sein (tú)", explicacion: "Wärst = condicional de sein (2ª persona)." },
        { tipo: "opcion", frase: "Er ___ die Prüfung bestehen können, wenn er gelernt hätte.", respuesta: "hätte", opciones: ["hätte", "wäre", "würde", "könnte"], traduccion: "Él habría podido aprobar el examen si hubiera estudiado.", pista: null, explicacion: "hätte + Infinitiv + können = habría podido." },
        { tipo: "hueco", frase: "Wir ___ gern gekommen, aber wir hatten keine Zeit.", respuesta: "wären", opciones: null, traduccion: "Nos habría gustado venir, pero no teníamos tiempo.", pista: "KII de sein (plural)", explicacion: "wären = condicional de sein en plural." },
        { tipo: "opcion", frase: "Du ___ früher kommen sollen.", respuesta: "hättest", opciones: ["hättest", "hast", "hattest", "würdest"], traduccion: "Deberías haber venido antes.", pista: null, explicacion: "hättest = KII de haben (2ª persona)." },
        { tipo: "hueco", frase: "Ich ___ gern mitgemacht, aber ich war krank.", respuesta: "hätte", opciones: null, traduccion: "Me habría gustado participar, pero estaba enfermo.", pista: "deseo no cumplido", explicacion: "hätte gern = me habría gustado." },
        { tipo: "opcion", frase: "Wenn ich das gewusst ___, wäre ich zu Hause geblieben.", respuesta: "hätte", opciones: ["hätte", "wäre", "habe", "hatte"], traduccion: "Si lo hubiera sabido, me habría quedado en casa.", pista: null, explicacion: "gewusst hätte = hubiera sabido (Plusquamperfekt KII)." },
        { tipo: "hueco", frase: "Sie ___ gern nach Berlin fahren, aber der Zug war zu teuer.", respuesta: "wäre", opciones: null, traduccion: "A ella le habría gustado ir a Berlín, pero el tren era demasiado caro.", pista: "KII de sein (ella)", explicacion: "wäre gern = le habría gustado (con fahren se usa sein)." },
        { tipo: "opcion", frase: "Ich ___ fast den Bus verpasst.", respuesta: "hätte", opciones: ["hätte", "wäre", "habe", "würde"], traduccion: "Por poco pierdo el autobús.", pista: null, explicacion: "hätte fast + Partizip II = por poco." },
        { tipo: "hueco", frase: "Wir ___ mehr lernen sollen, aber wir waren zu faul.", respuesta: "hätten", opciones: null, traduccion: "Deberíamos haber estudiado más, pero éramos demasiado perezosos.", pista: "plural de hätte", explicacion: "hätten = KII de haben (nosotros)." },
        { tipo: "opcion", frase: "___ ich das nur gewusst!", respuesta: "Hätte", opciones: ["Hätte", "Wäre", "Habe", "Würde"], traduccion: "¡Si solo lo hubiera sabido!", pista: null, explicacion: "Hätte ich nur gewusst = expresión de deseo/arrepentimiento." }
      ]
    }
  },
  // ============================================================
  // 3) PASSIV PERFEKT
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Der Brief ist gestern ___ worden.", respuesta: "geschrieben", opciones: null, traduccion: "La carta fue escrita ayer.", pista: "Partizip II de schreiben", explicacion: "geschrieben es el Partizip II de schreiben." },
        { tipo: "opcion", frase: "Das Haus ___ 2020 gebaut worden.", respuesta: "ist", opciones: ["ist", "hat", "wird", "war"], traduccion: "La casa fue construida en 2020.", pista: null, explicacion: "La pasiva Perfekt usa 'ist' como auxiliar." },
        { tipo: "hueco", frase: "Die Fenster sind schon ___ worden.", respuesta: "geputzt", opciones: null, traduccion: "Las ventanas ya han sido limpiadas.", pista: "Partizip II de putzen", explicacion: "geputzt = Partizip II de putzen (limpiar)." },
        { tipo: "opcion", frase: "Das Essen ist von der Mutter ___ worden.", respuesta: "gekocht", opciones: ["gekocht", "kocht", "kochen", "gekochtet"], traduccion: "La comida fue cocinada por la madre.", pista: null, explicacion: "gekocht = Partizip II de kochen." },
        { tipo: "hueco", frase: "Die Prüfung ist ___ worden.", respuesta: "korrigiert", opciones: null, traduccion: "El examen ha sido corregido.", pista: "Partizip II de korrigieren", explicacion: "korrigiert = Partizip II (regular, terminación -t)." },
        { tipo: "opcion", frase: "Die Tür ___ gestern geöffnet worden.", respuesta: "ist", opciones: ["ist", "hat", "wird", "wurde"], traduccion: "La puerta fue abierta ayer.", pista: null, explicacion: "Pasiva Perfekt siempre con 'ist'." },
        { tipo: "hueco", frase: "Der Hund ___ schon gefüttert worden.", respuesta: "ist", opciones: null, traduccion: "El perro ya ha sido alimentado.", pista: "verbo auxiliar sein", explicacion: "ist + gefüttert worden = pasiva Perfekt." },
        { tipo: "opcion", frase: "Die Bücher sind alle ___ worden.", respuesta: "verkauft", opciones: ["verkauft", "verkaufen", "verkauftet", "verkauften"], traduccion: "Los libros han sido todos vendidos.", pista: null, explicacion: "verkauft = Partizip II de verkaufen." },
        { tipo: "hueco", frase: "Das Auto ist repariert ___.", respuesta: "worden", opciones: null, traduccion: "El coche ha sido reparado.", pista: "NO ge- al inicio", explicacion: "worden (sin ge-) es la forma correcta en pasiva Perfekt." },
        { tipo: "opcion", frase: "Die Blumen ___ gegossen worden.", respuesta: "sind", opciones: ["sind", "haben", "werden", "wurden"], traduccion: "Las flores han sido regadas.", pista: null, explicacion: "sind = 3ª persona plural de sein." },
        { tipo: "hueco", frase: "Der Kuchen ___ von der Oma gebacken worden.", respuesta: "ist", opciones: null, traduccion: "El pastel fue horneado por la abuela.", pista: "verbo auxiliar 3ª sg", explicacion: "ist + gebacken worden = pasiva Perfekt con 'von'." },
        { tipo: "opcion", frase: "Die Aufgaben ___ schon erledigt worden.", respuesta: "sind", opciones: ["sind", "haben", "werden", "hat"], traduccion: "Las tareas ya han sido realizadas.", pista: null, explicacion: "sind = plural (die Aufgaben)." }
      ]
    }
  },
  // ============================================================
  // 4) SUBORDINADAS CON OBWOHL / TROTZDEM
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "opcion", frase: "Ich gehe spazieren, ___ es regnet.", respuesta: "obwohl", opciones: ["obwohl", "trotzdem", "weil", "denn"], traduccion: "Salgo a pasear aunque llueve.", pista: null, explicacion: "obwohl introduce subordinada (verbo al final)." },
        { tipo: "opcion", frase: "Es regnet. ___ gehen wir spazieren.", respuesta: "Trotzdem", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], traduccion: "Llueve. A pesar de eso paseamos.", pista: null, explicacion: "trotzdem como conector, verbo en 2ª posición." },
        { tipo: "hueco", frase: "___ es teuer ist, kaufe ich es.", respuesta: "Obwohl", opciones: null, traduccion: "Aunque es caro, lo compro.", pista: "conjunción concesiva", explicacion: "Obwohl + verbo al final (ist)." },
        { tipo: "opcion", frase: "Sie ist müde. ___ macht sie Sport.", respuesta: "Trotzdem", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], traduccion: "Está cansada. A pesar de eso hace deporte.", pista: null, explicacion: "trotzdem inicia oración principal." },
        { tipo: "hueco", frase: "___ ich kein Geld habe, bin ich glücklich.", respuesta: "Obwohl", opciones: null, traduccion: "Aunque no tengo dinero, soy feliz.", pista: "conjunción subordinante", explicacion: "Obwohl + Satz (verbo al final: habe)." },
        { tipo: "opcion", frase: "Er hat wenig Geld. ___ reist er gern.", respuesta: "Trotzdem", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], traduccion: "Tiene poco dinero. A pesar de eso viaja mucho.", pista: null, explicacion: "trotzdem = 'a pesar de eso' como conector." },
        { tipo: "hueco", frase: "Ich komme mit, ___ ich müde bin.", respuesta: "obwohl", opciones: null, traduccion: "Vengo con ustedes aunque estoy cansado.", pista: "subordinada concesiva", explicacion: "obwohl + Subjekt + ... + bin (verbo al final)." },
        { tipo: "opcion", frase: "___ der Film lang war, hat er mir gefallen.", respuesta: "Obwohl", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], traduccion: "Aunque la película fue larga, me gustó.", pista: null, explicacion: "Obwohl al inicio con verbo al final (war)." },
        { tipo: "hueco", frase: "Meine Mutter ist streng. ___ liebe ich sie sehr.", respuesta: "Trotzdem", opciones: null, traduccion: "Mi madre es estricta. A pesar de eso la quiero mucho.", pista: "conector de contraste", explicacion: "trotzdem = 'sin embargo' / 'a pesar de eso'." },
        { tipo: "opcion", frase: "___ das Wetter schlecht ist, fahren wir ans Meer.", respuesta: "Obwohl", opciones: ["Obwohl", "Trotzdem", "Weil", "Denn"], traduccion: "Aunque el tiempo está malo, vamos al mar.", pista: null, explicacion: "Obwohl + verbo al final (ist)." },
        { tipo: "hueco", frase: "Er hat viel Arbeit. ___ hilft er mir.", respuesta: "Trotzdem", opciones: null, traduccion: "Tiene mucho trabajo. A pesar de eso me ayuda.", pista: "oración independiente", explicacion: "Trotzdem + Verb (hilft) + Subjekt (er)." },
        { tipo: "opcion", frase: "Ich mag ihn, ___ er manchmal nervig ist.", respuesta: "obwohl", opciones: ["obwohl", "trotzdem", "weil", "denn"], traduccion: "Me gusta, aunque a veces es molesto.", pista: null, explicacion: "obwohl + er ... ist (verbo al final)." }
      ]
    }
  },
  // ============================================================
  // 5) ADJEKTIVE OHNE ARTIKEL
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Gut___ Wein ist teuer.", respuesta: "er", opciones: null, traduccion: "El vino bueno es caro.", pista: "Nominativ masculino", explicacion: "Sin artículo → -er (como der)." },
        { tipo: "opcion", frase: "Ich trinke kalt___ Bier.", respuesta: "es", opciones: ["en", "e", "es", "em"], traduccion: "Bebo cerveza fría.", pista: null, explicacion: "Bier es neutro, Akkusativ → -es." },
        { tipo: "hueco", frase: "Mit frisch___ Brot schmeckt es besser.", respuesta: "em", opciones: null, traduccion: "Con pan fresco sabe mejor.", pista: "Dativ neutro", explicacion: "Brot neutro, Dativ → -em." },
        { tipo: "opcion", frase: "Sie trägt rot___ Schuhe.", respuesta: "e", opciones: ["e", "en", "er", "es"], traduccion: "Ella lleva zapatos rojos.", pista: null, explicacion: "Plural Akkusativ → -e." },
        { tipo: "hueco", frase: "Ich sehe schön___ Frauen.", respuesta: "e", opciones: null, traduccion: "Veo mujeres hermosas.", pista: "Plural Akkusativ", explicacion: "Frauen plural, Akkusativ → -e." },
        { tipo: "opcion", frase: "Mit kalt___ Milch schmeckt der Kaffee nicht.", respuesta: "er", opciones: ["er", "e", "en", "em"], traduccion: "Con leche fría el café no sabe bien.", pista: null, explicacion: "Milch femenino, Dativ → -er." },
        { tipo: "hueco", frase: "Ich trinke heiß___ Tee.", respuesta: "en", opciones: null, traduccion: "Bebo té caliente.", pista: "Akkusativ masculino", explicacion: "Tee masculino, Akkusativ → -en." },
        { tipo: "opcion", frase: "Alt___ Wein wird besser mit der Zeit.", respuesta: "er", opciones: ["er", "e", "en", "es"], traduccion: "El vino añejo mejora con el tiempo.", pista: null, explicacion: "Wein masculino, Nominativ → -er." },
        { tipo: "hueco", frase: "Sie wohnt in klein___ Stadt.", respuesta: "er", opciones: null, traduccion: "Ella vive en una ciudad pequeña.", pista: "Dativ femenino", explicacion: "Stadt femenino, Dativ → -er." },
        { tipo: "opcion", frase: "Neu___ Kleider sind teuer.", respuesta: "e", opciones: ["e", "en", "er", "es"], traduccion: "Los vestidos nuevos son caros.", pista: null, explicacion: "Kleider plural, Nominativ → -e." },
        { tipo: "hueco", frase: "Er trinkt gern rot___ Wein.", respuesta: "en", opciones: null, traduccion: "A él le gusta beber vino tinto.", pista: "Akkusativ masculino", explicacion: "Wein Akkusativ → -en." },
        { tipo: "opcion", frase: "Mit warm___ Wasser wäscht man besser.", respuesta: "em", opciones: ["er", "e", "em", "en"], traduccion: "Con agua caliente se lava mejor.", pista: null, explicacion: "Wasser neutro, Dativ → -em." }
      ]
    }
  },
  // ============================================================
  // 6) SATZKLAMMER ERWEITERT
  // ============================================================
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
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ gestern nicht kommen können.", respuesta: "habe", opciones: null, traduccion: "No pude venir ayer.", pista: "Perfekt + modal", explicacion: "habe + ... + kommen können = Perfekt con modal." },
        { tipo: "opcion", frase: "Sie ___ morgen anrufen müssen.", respuesta: "wird", opciones: ["wird", "hat", "ist", "kann"], traduccion: "Ella tendrá que llamar mañana.", pista: null, explicacion: "wird + anrufen müssen = Futur con modal." },
        { tipo: "hueco", frase: "Er ___ sie kommen sehen.", respuesta: "hat", opciones: null, traduccion: "Él la vio venir.", pista: "Perfekt con sehen", explicacion: "hat + sie kommen sehen = verbo de percepción." },
        { tipo: "opcion", frase: "Wir ___ früher gehen sollen.", respuesta: "hätten", opciones: ["hätten", "haben", "hatten", "würden"], traduccion: "Deberíamos haber ido antes.", pista: null, explicacion: "hätten + ... + gehen sollen = KII + sollen." },
        { tipo: "hueco", frase: "___ du mir bitte helfen?", respuesta: "Kannst", opciones: null, traduccion: "¿Puedes ayudarme por favor?", pista: "modal simple", explicacion: "Kannst + helfen = estructura de marco simple." },
        { tipo: "opcion", frase: "Ich habe ihn kommen ___.", respuesta: "sehen", opciones: ["sehen", "gesehen", "sah", "geseht"], traduccion: "Lo vi venir.", pista: null, explicacion: "Nach 'kommen' kommt Infinitiv 'sehen' (kein Partizip II)." },
        { tipo: "hueco", frase: "Sie ___ das Buch lesen müssen.", respuesta: "hat", opciones: null, traduccion: "Ella ha tenido que leer el libro.", pista: "Perfekt con müssen", explicacion: "hat + ... + lesen müssen = Perfekt + modal." },
        { tipo: "opcion", frase: "Wir ___ euch helfen können.", respuesta: "haben", opciones: ["haben", "sind", "werden", "hätten"], traduccion: "Hemos podido ayudaros.", pista: null, explicacion: "haben + ... + helfen können = Perfekt con können." },
        { tipo: "hueco", frase: "Er ___ gestern kommen sollen, aber er war krank.", respuesta: "hätte", opciones: null, traduccion: "Él debería haber venido ayer, pero estaba enfermo.", pista: "KII pasado", explicacion: "hätte + kommen sollen = condicional compuesto con sollen." },
        { tipo: "opcion", frase: "Ich ___ dich später anrufen.", respuesta: "werde", opciones: ["werde", "habe", "bin", "kann"], traduccion: "Te llamaré más tarde.", pista: null, explicacion: "werde + anrufen = Futur con verbo separable." },
        { tipo: "hueco", frase: "Er ___ nicht kommen können, weil er krank war.", respuesta: "hat", opciones: null, traduccion: "Él no ha podido venir porque estaba enfermo.", pista: "Perfekt + können", explicacion: "hat + ... + kommen können = causa-efecto en pasado." },
        { tipo: "opcion", frase: "___ du mich bitte morgen anrufen?", respuesta: "Kannst", opciones: ["Kannst", "Wirst", "Hast", "Bist"], traduccion: "¿Puedes llamarme mañana por favor?", pista: null, explicacion: "Kannst + anrufen = pregunta con modal separable." }
      ]
    }
  }
];