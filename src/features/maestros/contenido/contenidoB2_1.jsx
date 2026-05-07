// src/features/maestros/contenido/contenidoB2_1.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.B2_1 = [
  // ============================================================
  // 1) KONJUNKTIV II PERFECCIONADO
  // ============================================================
  {
    id: "b2_1_konjunktiv2",
    nivel: "B2.1",
    titulo: "Konjunktiv II perfeccionado",
    icono: "🎯",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Konjunktiv II de verbos irregulares: stünde, hülfe, dächte, wüsste, dürfte, möchte y más.",
    explicacion: `<p>El <strong>Konjunktiv II</strong> expresa situaciones irreales, deseos, cortesía o hipótesis. Además de <em>würde</em> + infinitivo, muchos verbos irregulares tienen formas propias que deben dominarse en B2.</p>
<ul>
  <li><strong>stehen</strong> → stünde / stände (<em>stünde</em> es más frecuente)</li>
  <li><strong>helfen</strong> → hülfe / hälfe (<em>hülfe</em> es la forma tradicional)</li>
  <li><strong>kennen</strong> → kennte</li>
  <li><strong>brennen</strong> → brennte</li>
  <li><strong>denken</strong> → dächte</li>
  <li><strong>wissen</strong> → wüsste</li>
  <li><strong>dürfen</strong> → dürfte</li>
  <li><strong>mögen</strong> → möchte</li>
  <li><strong>müssen</strong> → müsste</li>
  <li><strong>sollen</strong> → sollte</li>
  <li><strong>wollen</strong> → wollte</li>
  <li><strong>können</strong> → könnte</li>
  <li><strong>haben</strong> → hätte</li>
  <li><strong>sein</strong> → wäre</li>
  <li><strong>werden</strong> → würde</li>
</ul>
<table>
  <tr><th>Infinitivo</th><th>Konjunktiv II</th><th>Ejemplo</th></tr>
  <tr><td>stehen</td><td>stünde</td><td>Wenn ich neben dir stünde...</td></tr>
  <tr><td>helfen</td><td>hülfe</td><td>Er hülfe mir gern, aber...</td></tr>
  <tr><td>denken</td><td>dächte</td><td>Ich dächte, das wäre besser.</td></tr>
  <tr><td>wissen</td><td>wüsste</td><td>Wenn ich es nur wüsste!</td></tr>
  <tr><td>dürfen</td><td>dürfte</td><td>Das dürfte richtig sein.</td></tr>
</table>`,
    ejemplos: [
      "Wenn ich mehr Zeit hätte, würde ich Deutsch lernen.",
      "An deiner Stelle wäre ich vorsichtiger.",
      "Das dürfte der Grund sein.",
      "Ich wüsste gern, ob sie kommt.",
      "Wenn er nur hier stünde!"
    ],
    tips: [
      "No uses würde + inf. con verbos modales: 'ich würde können' → mejor 'ich könnte'.",
      "La forma stünde es más común que stände en alemán moderno.",
      "Konjunktiv II de cortesía: 'Ich hätte gern...' evita sonar directo."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Wenn ich du ___, würde ich gehen. (wäre)", respuesta: "wäre", opciones: null, traduccion: "Si yo fuera tú, me iría.", pista: "Konjunktiv II de sein", explicacion: "wäre = K.II de sein." },
        { tipo: "opcion", frase: "Ich ___ gern ein Bier.", respuesta: "hätte", opciones: ["hätte", "habe", "hatte", "haben würde"], traduccion: "Me gustaría una cerveza.", pista: null, explicacion: "hätte = K.II de haben (cortesía)." },
        { tipo: "hueco", frase: "Das ___ teuer sein. (dürfte)", respuesta: "dürfte", opciones: null, traduccion: "Eso probablemente es caro.", pista: "suposición cortés", explicacion: "dürfte = K.II de dürfen (probabilidad)." },
        { tipo: "opcion", frase: "Wenn ich es nur ___!", respuesta: "wüsste", opciones: ["wüsste", "weiß", "wusste", "wissen würde"], traduccion: "¡Si tan solo lo supiera!", pista: null, explicacion: "wüsste = K.II de wissen (deseo irreal)." },
        { tipo: "hueco", frase: "Er ___ mir helfen, wenn er Zeit hätte. (könnte)", respuesta: "könnte", opciones: null, traduccion: "Él podría ayudarme si tuviera tiempo.", pista: "K.II de können", explicacion: "könnte = K.II de können (condicional)." },
        { tipo: "opcion", frase: "An deiner Stelle ___ ich vorsichtiger.", respuesta: "wäre", opciones: ["wäre", "bin", "war", "sei"], traduccion: "En tu lugar yo sería más cuidadoso.", pista: null, explicacion: "wäre = consejo en K.II." },
        { tipo: "hueco", frase: "Wir ___ gern kommen, aber wir haben keine Zeit. (würden)", respuesta: "würden", opciones: null, traduccion: "Nos gustaría venir, pero no tenemos tiempo.", pista: "K.II de werden", explicacion: "würden = K.II de werden (condicional)." },
        { tipo: "opcion", frase: "Wenn er hier ___, wäre alles anders.", respuesta: "stünde", opciones: ["stünde", "steht", "stand", "stehen würde"], traduccion: "Si él estuviera aquí, todo sería diferente.", pista: null, explicacion: "stünde = K.II de stehen (irreal)." },
        { tipo: "hueco", frase: "Ich ___ gern nach Berlin fahren. (würde)", respuesta: "würde", opciones: null, traduccion: "Me gustaría viajar a Berlín.", pista: "condicional cortés", explicacion: "würde + Infinitiv = K.II de cortesía." },
        { tipo: "opcion", frase: "Das ___ nicht passieren, wenn du vorsichtig wärst.", respuesta: "würde", opciones: ["würde", "wird", "wurde", "werde"], traduccion: "Eso no pasaría si fueras cuidadoso.", pista: null, explicacion: "würde + nicht = negación de situación irreal." },
        { tipo: "hueco", frase: "___ du mir bitte helfen? (Könntest)", respuesta: "Könntest", opciones: null, traduccion: "¿Podrías ayudarme por favor?", pista: "pregunta cortés", explicacion: "Könntest = K.II de können (petición cortés)." },
        { tipo: "opcion", frase: "Er sagt, er ___ es nicht gewusst.", respuesta: "hätte", opciones: ["hätte", "hat", "hatte", "haben würde"], traduccion: "Él dice que no lo habría sabido.", pista: null, explicacion: "hätte = K.II de haben (Plusquamperfekt irreal)." }
      ]
    }
  },
  // ============================================================
  // 2) PASIVA CON MODALES
  // ============================================================
  {
    id: "b2_1_pasiva_modal",
    nivel: "B2.1",
    titulo: "Pasiva con modales",
    icono: "⚙️",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Das muss gemacht werden / Das hat gemacht werden müssen: pasiva con verbos modales.",
    explicacion: `<p>La <strong>pasiva con verbos modales</strong> es esencial en alemán formal. Dos tiempos principales:</p>
<ul>
  <li><strong>Presente:</strong> Modal + <em>Partizip II</em> + <em>werden</em> → <em>Das muss gemacht werden.</em></li>
  <li><strong>Pasado (Perfecto):</strong> Modal + <em>Partizip II</em> + <em>worden</em> + <em>sein</em> → <em>Das hat gemacht werden müssen.</em></li>
</ul>
<table>
  <tr><th>Tiempo</th><th>Estructura</th><th>Ejemplo</th></tr>
  <tr><td>Presente</td><td>Modal + Partizip II + werden</td><td>Die Arbeit muss erledigt werden.</td></tr>
  <tr><td>Pretérito</td><td>Modal (pret.) + Partizip II + werden</td><td>Die Arbeit musste erledigt werden.</td></tr>
  <tr><td>Perfecto</td><td>hat + Partizip II + werden + modal (inf.)</td><td>Die Arbeit hat erledigt werden müssen.</td></tr>
  <tr><td>Futuro</td><td>wird + Partizip II + werden + modal</td><td>Die Arbeit wird erledigt werden müssen.</td></tr>
</table>`,
    ejemplos: [
      "Das Fenster muss geschlossen werden.",
      "Die Aufgaben konnten nicht rechtzeitig erledigt werden.",
      "Das hat sofort gemeldet werden müssen.",
      "Hier darf nicht geraucht werden.",
      "Die Prüfung wird im Juni abgelegt werden können."
    ],
    tips: [
      "En Perfecto pasiva con modal, 'worden' NO lleva 'ge-'.",
      "El orden: verbo modal conjugado al final en Perfecto.",
      "La pasiva con modales es muy frecuente en alemán escrito formal."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Die Tür ___ geschlossen werden. (muss)", respuesta: "muss", opciones: null, traduccion: "La puerta debe ser cerrada.", pista: "modal müssen presente", explicacion: "muss + Partizip II + werden = pasiva con modal." },
        { tipo: "opcion", frase: "Der Text ___ nicht übersetzt werden.", respuesta: "braucht", opciones: ["braucht", "muss", "kann", "darf"], traduccion: "El texto no necesita ser traducido.", pista: null, explicacion: "nicht brauchen + zu = no necesitar (alternativa a müssen)." },
        { tipo: "hueco", frase: "Hier ___ nicht geraucht werden. (darf)", respuesta: "darf", opciones: null, traduccion: "Aquí no se puede fumar.", pista: "prohibición", explicacion: "darf + nicht + pasiva = prohibición." },
        { tipo: "opcion", frase: "Das ___ sofort erledigt werden müssen.", respuesta: "hat", opciones: ["hat", "muss", "wird", "ist"], traduccion: "Eso ha tenido que ser hecho inmediatamente.", pista: null, explicacion: "hat + Partizip II + werden + müssen = Perfecto pasiva modal." },
        { tipo: "hueco", frase: "Die Prüfung ___ im Juni abgelegt werden. (wird)", respuesta: "wird", opciones: null, traduccion: "El examen será realizado en junio.", pista: "Futur pasiva", explicacion: "wird + Partizip II + werden = Futur pasiva." },
        { tipo: "opcion", frase: "Das Fenster ___ gestern nicht geöffnet werden.", respuesta: "konnte", opciones: ["konnte", "kann", "hat gekonnt", "könnte"], traduccion: "La ventana no pudo ser abierta ayer.", pista: null, explicacion: "konnte = Präteritum de können + pasiva." },
        { tipo: "hueco", frase: "Die Arbeit ___ erledigt werden. (muss)", respuesta: "muss", opciones: null, traduccion: "El trabajo debe ser terminado.", pista: "obligación presente", explicacion: "muss + erledigt werden = obligación pasiva." },
        { tipo: "opcion", frase: "Das ___ nicht gemacht werden.", respuesta: "soll", opciones: ["soll", "muss", "darf", "kann"], traduccion: "Eso no debe ser hecho (no está previsto).", pista: null, explicacion: "sollen = deber moral/planificado." },
        { tipo: "hueco", frase: "Die Rechnung ___ bezahlt worden sein. (muss)", respuesta: "muss", opciones: null, traduccion: "La factura debe haber sido pagada.", pista: "suposición pasada", explicacion: "muss + Partizip II + worden sein = suposición pasiva." },
        { tipo: "opcion", frase: "Das Buch ___ gelesen werden können.", respuesta: "muss", opciones: ["muss", "hat", "wird", "ist"], traduccion: "El libro debe poder ser leído.", pista: null, explicacion: "muss + gelesen werden können = doble modal en pasiva." },
        { tipo: "hueco", frase: "Die Aufgabe ___ nicht gemacht werden. (braucht)", respuesta: "braucht", opciones: null, traduccion: "La tarea no necesita ser hecha.", pista: "alternativa a müssen", explicacion: "nicht brauchen = no necesitar (más coloquial)." },
        { tipo: "opcion", frase: "Das Problem ___ gelöst werden können.", respuesta: "müsste", opciones: ["müsste", "muss", "musste", "hat gemusst"], traduccion: "El problema debería poder ser resuelto.", pista: null, explicacion: "müsste = K.II de müssen (condicional pasiva)." }
      ]
    }
  },
  // ============================================================
  // 3) NOMINALIZACIÓN
  // ============================================================
  {
    id: "b2_1_nominalisierung",
    nivel: "B2.1",
    titulo: "Nominalización",
    icono: "📝",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Verbal → nominal: lernen → das Lernen, ankommen → die Ankunft, prefijo Ge-: das Gerede.",
    explicacion: `<p>La <strong>nominalización</strong> convierte verbos en sustantivos. Es muy común en alemán formal y académico.</p>
<ul>
  <li><strong>Infinitivo</strong> como sustantivo neutro: <em>lernen → das Lernen</em></li>
  <li><strong>Raíz + -ung</strong> (femenino): <em>ankommen → die Ankunft</em> (excepción), <em>verbinden → die Verbindung</em></li>
  <li><strong>Prefijo Ge- + raíz</strong> (neutro, a menudo peyorativo): <em>reden → das Gerede</em>, <em>laufen → das Gelaufe</em></li>
  <li><strong>Sufijo -er</strong> (masculino, persona): <em>lehren → der Lehrer</em></li>
  <li><strong>Sufijo -nis</strong>: <em>erleben → das Erlebnis</em>, <em>hindern → das Hindernis</em></li>
  <li><strong>Sufijo -schaft</strong>: <em>freundlich → die Freundschaft</em></li>
</ul>
<table>
  <tr><th>Verbo</th><th>Sustantivo</th><th>Significado</th></tr>
  <tr><td>lernen</td><td>das Lernen</td><td>el aprendizaje</td></tr>
  <tr><td>ankommen</td><td>die Ankunft</td><td>la llegada</td></tr>
  <tr><td>reden</td><td>das Gerede</td><td>el parloteo</td></tr>
  <tr><td>verbinden</td><td>die Verbindung</td><td>la conexión</td></tr>
</table>`,
    ejemplos: [
      "Das Lernen einer Fremdsprache erfordert Disziplin.",
      "Die Ankunft des Zuges verspätet sich.",
      "Hör auf mit dem Gerede!",
      "Die Verbindung ist schlecht.",
      "Das Erlernen der deutschen Grammatik dauert Jahre."
    ],
    tips: [
      "El infinitivo nominalizado siempre es neutro (das).",
      "Ge- + verbo suele tener connotación negativa o repetitiva.",
      "En textos formales se usa más nominalización que en conversación."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ (lernen) ist wichtig für die Karriere. (Das Lernen)", respuesta: "Das Lernen", opciones: null, traduccion: "El aprendizaje es importante para la carrera.", pista: "infinitivo nominalizado", explicacion: "Das Lernen = infinitivo como sustantivo neutro." },
        { tipo: "opcion", frase: "Die ___ (ankommen) erfolgt um 14 Uhr.", respuesta: "Ankunft", opciones: ["Ankunft", "Ankommung", "Ankommen", "Ankunfung"], traduccion: "La llegada ocurre a las 14 h.", pista: null, explicacion: "Ankunft = nominalización irregular de ankommen." },
        { tipo: "hueco", frase: "Sein ständiges ___ (reden) nervt mich. (Gerede)", respuesta: "Gerede", opciones: null, traduccion: "Su constante parloteo me molesta.", pista: "prefijo Ge- + raíz", explicacion: "Gerede = Ge- + red- + -e (connotación negativa)." },
        { tipo: "opcion", frase: "Die ___ (verbinden) funktioniert nicht.", respuesta: "Verbindung", opciones: ["Verbindung", "Verbindung", "Verbindung", "Verbindung"], traduccion: "La conexión no funciona.", pista: null, explicacion: "Verbindung = verbinden + -ung." },
        { tipo: "hueco", frase: "___ (reisen) erweitert den Horizont. (Das Reisen)", respuesta: "Das Reisen", opciones: null, traduccion: "Viajar amplía el horizonte.", pista: "infinitivo nominalizado", explicacion: "Das Reisen = infinitivo como sustantivo." },
        { tipo: "opcion", frase: "Die ___ (ausbilden) dauert drei Jahre.", respuesta: "Ausbildung", opciones: ["Ausbildung", "Ausbilden", "Ausbildnis", "Ausbildschaft"], traduccion: "La formación dura tres años.", pista: null, explicacion: "Ausbildung = ausbilden + -ung." },
        { tipo: "hueco", frase: "Das ___ (laufen) der Kinder ist laut. (Gelaufe)", respuesta: "Gelaufe", opciones: null, traduccion: "El correr de los niños es ruidoso.", pista: "Ge- + verbo", explicacion: "Gelaufe = Ge- + lauf- + -e." },
        { tipo: "opcion", frase: "Die ___ (erklären) war sehr verständlich.", respuesta: "Erklärung", opciones: ["Erklärung", "Erklären", "Erkläris", "Erklärens"], traduccion: "La explicación fue muy comprensible.", pista: null, explicacion: "Erklärung = erklären + -ung." },
        { tipo: "hueco", frase: "___ (schwimmen) ist gesund. (Das Schwimmen)", respuesta: "Das Schwimmen", opciones: null, traduccion: "Nadar es saludable.", pista: "infinitivo nominalizado", explicacion: "Das Schwimmen = infinitivo como sujeto." },
        { tipo: "opcion", frase: "Die ___ (entscheiden) fällt morgen.", respuesta: "Entscheidung", opciones: ["Entscheidung", "Entscheiden", "Entscheidnis", "Entscheidschaft"], traduccion: "La decisión se toma mañana.", pista: null, explicacion: "Entscheidung = entscheiden + -ung." },
        { tipo: "hueco", frase: "Sein ___ (zittern) war sichtbar. (Zittern)", respuesta: "Zittern", opciones: null, traduccion: "Su temblor era visible.", pista: "infinitivo como sustantivo", explicacion: "das Zittern = infinitivo de zittern." },
        { tipo: "opcion", frase: "Die ___ (entwickeln) der Stadt ist rasant.", respuesta: "Entwicklung", opciones: ["Entwicklung", "Entwickeln", "Entwickelung", "Entwickel"], traduccion: "El desarrollo de la ciudad es vertiginoso.", pista: null, explicacion: "Entwicklung = entwickeln + -ung." }
      ]
    }
  },
  // ============================================================
  // 4) "ES" IMPERSONAL
  // ============================================================
  {
    id: "b2_1_es_impersonal",
    nivel: "B2.1",
    titulo: '"es" impersonal',
    icono: "🌧️",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: 'es regnet, es gibt, es freut mich, es handelt sich um, es geht um: usos del "es" impersonal.',
    explicacion: `<p>El <strong>"es" impersonal</strong> tiene múltiples funciones en alemán. No se refiere a nada concreto, sino que cumple funciones gramaticales.</p>
<ul>
  <li><strong>Fenómenos meteorológicos:</strong> <em>Es regnet. Es schneit. Es donnert.</em></li>
  <li><strong>Existencia (es gibt):</strong> <em>Es gibt viele Möglichkeiten.</em> → con Acusativo</li>
  <li><strong>Estado emocional:</strong> <em>Es freut mich. Es tut mir leid. Es ärgert mich.</em></li>
  <li><strong>Verbos con preposición (es + verbo + preposición):</strong> <em>Es handelt sich um... Es geht um... Es kommt auf... an.</em></li>
  <li><strong>Tiempo / Hora:</strong> <em>Es ist spät. Es ist 10 Uhr.</em></li>
  <li><strong>Distancia:</strong> <em>Es sind 5 Kilometer bis zum Bahnhof.</em></li>
</ul>
<table>
  <tr><th>Función</th><th>Estructura</th><th>Ejemplo</th></tr>
  <tr><td>Meteo</td><td>es + verbo 3ª sg</td><td>Es regnet den ganzen Tag.</td></tr>
  <tr><td>Existencia</td><td>es gibt + Acusativo</td><td>Es gibt ein Problem.</td></tr>
  <tr><td>Emoción</td><td>es + verbo + persona</td><td>Es freut mich sehr.</td></tr>
  <tr><td>Reflexivo</td><td>es + verbo reflexivo</td><td>Es handelt sich um einen Fehler.</td></tr>
</table>`,
    ejemplos: [
      "Es regnet schon seit Stunden.",
      "Es gibt keine einfache Lösung.",
      "Es freut mich, dich kennenzulernen.",
      "Es handelt sich um ein Missverständnis.",
      "Es geht um deine Zukunft."
    ],
    tips: [
      '"Es gibt" rige Acusativo, no Nominativo.',
      "En frases con 'es' impersonal, si hay otro elemento al inicio, 'es' desaparece: 'Gestern hat es geregnet'.",
      '"Es handelt sich um" es muy frecuente en alemán formal.'
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ viele gute Bücher in der Bibliothek. (Es gibt)", respuesta: "Es gibt", opciones: null, traduccion: "Hay muchos buenos libros en la biblioteca.", pista: "existencia + Acusativo", explicacion: "es gibt + Acusativo = hay/existe." },
        { tipo: "opcion", frase: "___ mich, dass du gekommen bist.", respuesta: "Es freut", opciones: ["Es freut", "Es gibt", "Es handelt", "Es geht"], traduccion: "Me alegra que hayas venido.", pista: null, explicacion: "Es freut mich = me alegra (emoción)." },
        { tipo: "hueco", frase: "___ um ein Missverständnis. (Es handelt sich)", respuesta: "Es handelt sich", opciones: null, traduccion: "Se trata de un malentendido.", pista: "verbo reflexivo", explicacion: "es handelt sich um = se trata de." },
        { tipo: "opcion", frase: "___ schon den ganzen Tag.", respuesta: "Es regnet", opciones: ["Es regnet", "Es gibt", "Es ist", "Es handelt"], traduccion: "Llueve ya todo el día.", pista: null, explicacion: "Es regnet = fenómeno meteorológico." },
        { tipo: "hueco", frase: "___ um deine Zukunft. (Es geht)", respuesta: "Es geht", opciones: null, traduccion: "Se trata de tu futuro.", pista: "es geht um = tratar de", explicacion: "es geht um = se trata de / va de." },
        { tipo: "opcion", frase: "___ mir leid.", respuesta: "Es tut", opciones: ["Es tut", "Es gibt", "Es ist", "Es macht"], traduccion: "Lo siento.", pista: null, explicacion: "Es tut mir leid = expresión de disculpa." },
        { tipo: "hueco", frase: "___ kalt heute. (Es ist)", respuesta: "Es ist", opciones: null, traduccion: "Hace frío hoy.", pista: "tiempo atmosférico", explicacion: "Es ist + adjetivo = descripción del tiempo." },
        { tipo: "opcion", frase: "___ 10 Kilometer bis zum Strand.", respuesta: "Es sind", opciones: ["Es sind", "Es ist", "Es gibt", "Es handelt"], traduccion: "Son 10 km hasta la playa.", pista: null, explicacion: "Es sind + distancia = medida (plural)." },
        { tipo: "hueco", frase: "___ mich, dass du nicht gekommen bist. (Es ärgert)", respuesta: "Es ärgert", opciones: null, traduccion: "Me molesta que no hayas venido.", pista: "emoción negativa", explicacion: "Es ärgert mich = me molesta/enfada." },
        { tipo: "opcion", frase: "___ schon spät.", respuesta: "Es ist", opciones: ["Es ist", "Es gibt", "Es sind", "Es hat"], traduccion: "Ya es tarde.", pista: null, explicacion: "Es ist spät = expresión temporal." },
        { tipo: "hueco", frase: "___ auf dich an. (Es kommt)", respuesta: "Es kommt", opciones: null, traduccion: "Depende de ti.", pista: "es kommt auf...an", explicacion: "es kommt auf...an = depender de." },
        { tipo: "opcion", frase: "___ sich um eine seltene Art.", respuesta: "Es handelt", opciones: ["Es handelt", "Es geht", "Es gibt", "Es ist"], traduccion: "Se trata de una especie rara.", pista: null, explicacion: "Es handelt sich um = expresión formal para 'tratarse de'." }
      ]
    }
  },
  // ============================================================
  // 5) POSICIÓN DE "NICHT"
  // ============================================================
  {
    id: "b2_1_nicht_position",
    nivel: "B2.1",
    titulo: "Posición de 'nicht'",
    icono: "🚫",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Negar elemento específico vs negar toda la oración: nicht antes de preposiciones, después de pronombres.",
    explicacion: `<p>La posición de <strong>"nicht"</strong> cambia el significado de la oración. Es crucial saber qué se está negando.</p>
<ul>
  <li><strong>Negación total (nicht al final):</strong> <em>Ich komme nicht.</em> → niega toda la acción</li>
  <li><strong>Negación de un elemento específico (nicht ANTES del elemento):</strong> <em>Ich komme nicht heute, sondern morgen.</em></li>
  <li><strong>Antes de preposiciones:</strong> <em>Er geht nicht ins Kino. (niega el destino)</em></li>
  <li><strong>Después de pronombres:</strong> <em>Ich sehe ihn nicht. (niega el verbo)</em></li>
  <li><strong>Antes de adjetivos/adverbios predicativos:</strong> <em>Das ist nicht gut.</em></li>
  <li><strong>Antes de complementos con preposición fija:</strong> <em>Er wartet nicht auf mich.</em></li>
</ul>
<table>
  <tr><th>Qué se niega</th><th>Ejemplo</th></tr>
  <tr><td>Verbo/Acción</td><td>Ich schlafe nicht.</td></tr>
  <tr><td>Objeto específico</td><td>Ich lese nicht das Buch, sondern die Zeitung.</td></tr>
  <tr><td>Tiempo</td><td>Ich komme nicht heute, sondern morgen.</td></tr>
  <tr><td>Lugar</td><td>Er fährt nicht nach Berlin.</td></tr>
  <tr><td>Adjetivo</td><td>Das Essen ist nicht gut.</td></tr>
</table>`,
    ejemplos: [
      "Ich gehe nicht ins Kino. (niega el destino)",
      "Nicht ich habe das gesagt, sondern er. (niega el sujeto)",
      "Er ist nicht krank. (niega el adjetivo)",
      "Ich habe nicht genug Geld. (niega la cantidad)",
      "Sie kommt nicht mit dem Zug, sondern mit dem Auto."
    ],
    tips: [
      "Si niegas toda la oración, nicht va al final (o antes del segundo elemento del marco verbal).",
      "Para negar un elemento específico, nicht va DIRECTAMENTE antes de ese elemento.",
      "Con pronombres personales, nicht va después: 'Ich mag ihn nicht'."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich mag Kaffee ___ (nicht)", respuesta: "nicht", opciones: null, traduccion: "No me gusta el café.", pista: "negación del verbo", explicacion: "nicht al final = niega toda la acción." },
        { tipo: "opcion", frase: "___ ich habe das gemacht, sondern sie.", respuesta: "Nicht", opciones: ["Nicht", "Ich nicht", "Nicht ich", "Nein"], traduccion: "No lo hice yo, sino ella.", pista: null, explicacion: "Nicht + sujeto = negación específica del sujeto." },
        { tipo: "hueco", frase: "Er kommt ___ heute, sondern morgen. (nicht)", respuesta: "nicht", opciones: null, traduccion: "Él no viene hoy, sino mañana.", pista: "negar tiempo específico", explicacion: "nicht + [tiempo] = negación del elemento temporal." },
        { tipo: "opcion", frase: "Das ist ___ richtig.", respuesta: "nicht", opciones: ["nicht", "kein", "nie", "nichts"], traduccion: "Eso no es correcto.", pista: null, explicacion: "nicht + adjetivo predicativo = negación del adjetivo." },
        { tipo: "hueco", frase: "Ich habe ___ genug Geld. (nicht)", respuesta: "nicht", opciones: null, traduccion: "No tengo suficiente dinero.", pista: "negar cantidad", explicacion: "nicht + genug = negación de cantidad suficiente." },
        { tipo: "opcion", frase: "Er fährt ___ nach Berlin.", respuesta: "nicht", opciones: ["nicht", "kein", "nie", "nichts"], traduccion: "Él no viaja a Berlín.", pista: null, explicacion: "nicht + [dirección] = niega el destino." },
        { tipo: "hueco", frase: "Sie mag ihn ___ (nicht)", respuesta: "nicht", opciones: null, traduccion: "Ella no le gusta él.", pista: "después de pronombre", explicacion: "pronombre + nicht = negación del verbo." },
        { tipo: "opcion", frase: "Er wartet ___ auf mich.", respuesta: "nicht", opciones: ["nicht", "kein", "nie", "niemand"], traduccion: "Él no me espera.", pista: null, explicacion: "nicht + complemento preposicional." },
        { tipo: "hueco", frase: "___ alle Schüler haben bestanden. (Nicht)", respuesta: "Nicht", opciones: null, traduccion: "No todos los alumnos aprobaron.", pista: "negar parte del sujeto", explicacion: "Nicht + alle = negación parcial." },
        { tipo: "opcion", frase: "Das Essen ist ___ gut.", respuesta: "nicht", opciones: ["nicht", "kein", "nie", "nichts"], traduccion: "La comida no es buena.", pista: null, explicacion: "nicht + gut = niega el adjetivo predicativo." },
        { tipo: "hueco", frase: "Er kommt ___ mit dem Auto. (nicht)", respuesta: "nicht", opciones: null, traduccion: "Él no viene en coche.", pista: "negar el medio", explicacion: "nicht + mit = niega el medio de transporte." },
        { tipo: "opcion", frase: "___ du hast recht, sondern ich.", respuesta: "Nicht", opciones: ["Nicht", "Du nicht", "Nicht du", "Niemand"], traduccion: "No tienes razón tú, sino yo.", pista: null, explicacion: "Nicht + pronombre = negación específica del sujeto." }
      ]
    }
  },
  // ============================================================
  // 6) PARTÍCULAS MODALES
  // ============================================================
  {
    id: "b2_1_partikeln",
    nivel: "B2.1",
    titulo: "Partículas modales",
    icono: "💬",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "doch, ja, eben, halt, schon, wohl, eigentlich, denn, mal: matices y entonación.",
    explicacion: `<p>Las <strong>partículas modales</strong> dan matices emocionales y pragmáticos a la oración. Son muy difíciles de traducir literalmente.</p>
<ul>
  <li><strong>doch</strong> → insistencia / rectificación: <em>Das stimmt doch! (¡Sí que es verdad!)</em></li>
  <li><strong>ja</strong> → presuposición conocida: <em>Du bist ja schon da. (Ya estás aquí, veo)</em></li>
  <li><strong>eben / halt</strong> → resignación, así son las cosas: <em>Das ist eben so. (Es así y punto)</em></li>
  <li><strong>schon</strong> → seguridad mitigada / concesión: <em>Das wird schon klappen. (Ya saldrá bien)</em></li>
  <li><strong>wohl</strong> → suposición / probabilidad: <em>Er wird wohl kommen. (Seguramente vendrá)</em></li>
  <li><strong>eigentlich</strong> → en realidad, la verdad: <em>Was machst du eigentlich? (¿Qué haces, en realidad?)</em></li>
  <li><strong>denn</strong> → interés / sorpresa (solo en preguntas): <em>Was machst du denn da? (¿Qué haces ahí?)</em></li>
  <li><strong>mal</strong> → suaviza imperativos: <em>Komm mal her! (Ven un momento)</em></li>
</ul>
<table>
  <tr><th>Partícula</th><th>Significado</th><th>Ejemplo</th></tr>
  <tr><td>doch</td><td>insistencia</td><td>Komm doch bitte!</td></tr>
  <tr><td>ja</td><td>evidencia</td><td>Das ist ja toll!</td></tr>
  <tr><td>eben</td><td>resignación</td><td>So ist das Leben eben.</td></tr>
  <tr><td>schon</td><td>concesión</td><td>Das wird schon werden.</td></tr>
  <tr><td>denn</td><td>interés</td><td>Wo warst du denn?</td></tr>
</table>`,
    ejemplos: [
      "Komm doch bitte her!",
      "Das ist ja unglaublich!",
      "So ist das Leben eben.",
      "Was machst du denn da?",
      "Das wird schon wieder."
    ],
    tips: [
      "Las partículas modales NO se pueden traducir palabra por palabra.",
      "El significado cambia con la entonación: 'Das ist ja toll' (entusiasmo) vs 'Das ist ja toll' (irónico).",
      "Nunca uses partículas modales al inicio de la oración (excepto 'eigentlich')."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "opcion", frase: "Komm ___ her, bitte! (insistencia)", respuesta: "doch", opciones: ["doch", "ja", "eben", "denn"], traduccion: "¡Ven aquí, por favor!", pista: null, explicacion: "doch = partícula de insistencia/suavización." },
        { tipo: "hueco", frase: "Das ist ___ unglaublich! (ja)", respuesta: "ja", opciones: null, traduccion: "¡Esto es increíble!", pista: "evidencia/constatación", explicacion: "ja = el hablante presupone que es obvio." },
        { tipo: "opcion", frase: "Was machst du ___? (interés/sorpresa)", respuesta: "denn", opciones: ["denn", "doch", "eben", "schon"], traduccion: "¿Qué haces? (con interés)", pista: null, explicacion: "denn = solo en preguntas, expresa interés." },
        { tipo: "hueco", frase: "Es ist ___ nicht anders möglich. (eben)", respuesta: "eben", opciones: null, traduccion: "Simplemente no es posible de otra manera.", pista: "resignación", explicacion: "eben = resignación, así son las cosas." },
        { tipo: "opcion", frase: "Das wird ___ wieder. (seguridad mitigada)", respuesta: "schon", opciones: ["schon", "ja", "doch", "eben"], traduccion: "Ya se recuperará.", pista: null, explicacion: "schon = concesión optimista." },
        { tipo: "hueco", frase: "Komm ___ her! (mal)", respuesta: "mal", opciones: null, traduccion: "¡Ven aquí un momento!", pista: "suaviza el imperativo", explicacion: "mal = suaviza órdenes, coloquial." },
        { tipo: "opcion", frase: "Das stimmt ___! (insistencia en que sí)", respuesta: "doch", opciones: ["doch", "ja", "eben", "wohl"], traduccion: "¡Sí que es verdad!", pista: null, explicacion: "doch = rectificación/insistencia." },
        { tipo: "hueco", frase: "So ist das Leben ___. (eben)", respuesta: "eben", opciones: null, traduccion: "Así es la vida.", pista: "filosofía de vida", explicacion: "eben = aceptación de la realidad." },
        { tipo: "opcion", frase: "Was machst du ___ hier? (interés)", respuesta: "denn", opciones: ["denn", "doch", "eigentlich", "schon"], traduccion: "¿Qué haces aquí? (con sorpresa)", pista: null, explicacion: "denn = interés/sorpresa en preguntas." },
        { tipo: "hueco", frase: "Das ist ___ toll! (ja)", respuesta: "ja", opciones: null, traduccion: "¡Esto es estupendo!", pista: "constatación emocional", explicacion: "ja = énfasis en lo evidente." },
        { tipo: "opcion", frase: "Er wird ___ kommen. (suposición)", respuesta: "wohl", opciones: ["wohl", "schon", "doch", "eben"], traduccion: "Seguramente vendrá.", pista: null, explicacion: "wohl = suposición/probabilidad." },
        { tipo: "hueco", frase: "Hilf ___ mal mit! (mir)", respuesta: "mir", opciones: null, traduccion: "Ayúdame un poco.", pista: "Dativ + mal coloquial", explicacion: "mal + mir = petición coloquial suave." }
      ]
    }
  }
];