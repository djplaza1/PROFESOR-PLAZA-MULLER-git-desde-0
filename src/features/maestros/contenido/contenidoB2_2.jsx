// src/features/maestros/contenido/contenidoB2_2.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.B2_2 = [
  // ============================================================
  // 1) KONJUNKTIV I PERIODÍSTICO
  // ============================================================
  {
    id: "b2_2_konjunktiv1",
    nivel: "B2.2",
    titulo: "Konjunktiv I periodístico",
    icono: "📰",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "Citas indirectas en prensa: Der Minister sagte, er habe... El Konjunktiv I del alemán periodístico.",
    explicacion: `<p>El <strong>Konjunktiv I</strong> se usa para el <strong>estilo indirecto</strong> (indirekte Rede), especialmente en alemán periodístico y formal. Permite al periodista reportar lo dicho por alguien sin afirmar ni negar su veracidad.</p>
<ul>
  <li><strong>Formación:</strong> Raíz + terminaciones: -e, -est, -e, -en, -et, -en</li>
  <li><strong>Presente:</strong> <em>Er sagt, er habe keine Zeit.</em></li>
  <li><strong>Perfecto:</strong> <em>Er sagt, er habe das nicht gewusst.</em></li>
  <li><strong>Futuro:</strong> <em>Er sagt, er werde kommen.</em></li>
  <li><strong>Cuando K.I = K.II (indicativo), se usa K.II para evitar ambigüedad:</strong> <em>Sie sagen, sie hätten (no: haben) keine Zeit.</em></li>
</ul>
<table>
  <tr><th>Tiempo</th><th>Konjunktiv I</th><th>Ejemplo</th></tr>
  <tr><td>Presente</td><td>er habe / sie habe</td><td>Der Minister sagt, er habe das Gesetz geprüft.</td></tr>
  <tr><td>Perfecto</td><td>habe + Partizip II</td><td>Sie sagte, sie habe nichts gehört.</td></tr>
  <tr><td>Futuro</td><td>werde + Infinitiv</td><td>Er meint, es werde bald regnen.</td></tr>
  <tr><td>Con modal</td><td>habe + Inf. + modal</td><td>Er sagt, er habe kommen müssen.</td></tr>
</table>`,
    ejemplos: [
      "Der Kanzler sagte, die Lage sei unter Kontrolle.",
      "Die Opposition behauptet, der Minister habe gelogen.",
      "Laut Bericht werde die Inflation steigen.",
      "Sie erklärte, sie wisse von nichts.",
      "Der Zeuge gab an, er habe den Täter erkannt."
    ],
    tips: [
      "Konjunktiv I es la 'voz del periodista': reporta sin tomar partido.",
      "Cuando Konjunktiv I = Indikativ, se usa Konjunktiv II como sustituto.",
      "En alemán hablado coloquial, el estilo indirecto suele usar Indikativ o 'würde'."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: 'Er sagt: "Ich habe keine Zeit." → Er sagt, er ___ keine Zeit.', respuesta: "habe", opciones: null, traduccion: 'Él dice: "No tengo tiempo." → Dice que no tiene tiempo.', pista: "K.I de haben", explicacion: "habe = Konjunktiv I de haben (estilo indirecto)." },
        { tipo: "opcion", frase: 'Sie meint: "Das ist richtig." → Sie meint, das ___ richtig.', respuesta: "sei", opciones: ["sei", "ist", "wäre", "ist gewesen"], traduccion: 'Ella opina: "Eso es correcto." → Opina que es correcto.', pista: null, explicacion: "sei = K.I de sein (estilo indirecto presente)." },
        { tipo: "hueco", frase: 'Der Chef sagt: "Wir werden gewinnen." → Der Chef sagt, wir ___ gewinnen.', respuesta: "werden", opciones: null, traduccion: 'El jefe dice: "Ganaremos." → Dice que ganaremos.', pista: "Futur K.I", explicacion: "werden = K.I de werden (futuro en estilo indirecto)." },
        { tipo: "opcion", frase: 'Er behauptet: "Ich bin krank." → Er behauptet, er ___ krank.', respuesta: "sei", opciones: ["sei", "ist", "war", "bin"], traduccion: 'Él afirma: "Estoy enfermo." → Afirma que está enfermo.', pista: null, explicacion: "sei = K.I de sein en 3ª persona." },
        { tipo: "hueco", frase: 'Sie sagt: "Ich habe das nicht gewusst." → Sie sagt, sie ___ das nicht gewusst.', respuesta: "habe", opciones: null, traduccion: 'Ella dice: "No lo supe." → Dice que no lo supo.', pista: "Perfecto K.I", explicacion: "habe + Partizip II = Perfecto en estilo indirecto." },
        { tipo: "opcion", frase: 'Der Minister sagte: "Die Lage sei unter Kontrolle." (directo) → Der Minister sagte, die Lage ___ unter Kontrolle.', respuesta: "sei", opciones: ["sei", "ist", "war", "wäre"], traduccion: "El ministro dijo que la situación estaba bajo control.", pista: null, explicacion: "K.I en cita indirecta con 'sagen'." },
        { tipo: "hueco", frase: 'Laut Bericht ___ die Inflation steigen. (werde)', respuesta: "werde", opciones: null, traduccion: "Según el informe, la inflación subirá.", pista: "Futur K.I en prensa", explicacion: "werde = K.I de werden en estilo periodístico." },
        { tipo: "opcion", frase: 'Der Zeuge gab an, er ___ den Täter erkannt.', respuesta: "habe", opciones: ["habe", "hat", "hätte", "hatte"], traduccion: "El testigo declaró que reconoció al culpable.", pista: null, explicacion: "habe + erkannt = Perfecto K.I." },
        { tipo: "hueco", frase: 'Sie erklärte, sie ___ von nichts. (wisse)', respuesta: "wisse", opciones: null, traduccion: "Ella explicó que no sabe nada.", pista: "K.I de wissen", explicacion: "wisse = K.I de wissen (saber)." },
        { tipo: "opcion", frase: 'Die Opposition behauptet, der Minister ___ gelogen.', respuesta: "habe", opciones: ["habe", "hat", "hätte", "hat gelogen"], traduccion: "La oposición afirma que el ministro mintió.", pista: null, explicacion: "habe + gelogen = Perfecto K.I (reportar una afirmación)." },
        { tipo: "hueco", frase: 'Er meint, es ___ bald regnen. (werde)', respuesta: "werde", opciones: null, traduccion: "Él opina que pronto lloverá.", pista: "K.I Futur", explicacion: "werde + regnen = Futur K.I (predicción reportada)." },
        { tipo: "opcion", frase: 'Sie sagen, sie ___ keine Zeit. (K.II porque K.I = Indikativ)', respuesta: "hätten", opciones: ["hätten", "haben", "habe", "hatten"], traduccion: "Ellos dicen que no tienen tiempo (K.II porque K.I sería igual al indicativo).", pista: null, explicacion: "hätten = K.II como sustituto porque 'haben' sería ambiguo." }
      ]
    }
  },
  // ============================================================
  // 2) ALTERNATIVAS A PASIVA
  // ============================================================
  {
    id: "b2_2_pasiva_alternativas",
    nivel: "B2.2",
    titulo: "Alternativas a pasiva",
    icono: "🔄",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "sich lassen + Inf., Adjektive auf -bar/-lich: lesbar, möglich, Realisierung findet statt.",
    explicacion: `<p>Existen varias <strong>alternativas a la voz pasiva</strong> que enriquecen el alemán y evitan construcciones pesadas.</p>
<ul>
  <li><strong>sich lassen + infinitivo</strong> (= posibilidad pasiva): <em>Das lässt sich machen. (Eso se puede hacer)</em></li>
  <li><strong>Adjetivos en -bar / -lich</strong> (posibilidad pasiva): <em>lesbar (legible), machbar (factible), möglich (posible)</em></li>
  <li><strong>Verbos funcion + sustantivo</strong> (Funktionsverbgefüge): <em>Eine Lösung findet statt / kommt zur Anwendung</em></li>
  <li><strong>man + aktiv</strong> (alternativa coloquial): <em>Man kann das machen. (Eso se puede hacer)</em></li>
  <li><strong>sein + zu + Infinitiv</strong> (obligación/pasiva modal): <em>Das Problem ist zu lösen. (El problema debe resolverse)</em></li>
</ul>
<table>
  <tr><th>Estructura</th><th>Significado</th><th>Ejemplo</th></tr>
  <tr><td>sich lassen + Inf.</td><td>puede ser + participio</td><td>Das lässt sich reparieren.</td></tr>
  <tr><td>-bar / -lich</td><td>-able / -ible</td><td>Das ist machbar.</td></tr>
  <tr><td>sein + zu + Inf.</td><td>debe ser + participio</td><td>Das ist zu beachten.</td></tr>
  <tr><td>man + aktiv</td><td>se + verbo</td><td>Man sagt, dass...</td></tr>
</table>`,
    ejemplos: [
      "Das lässt sich leicht erklären.",
      "Dieser Text ist kaum lesbar.",
      "Die Realisierung findet nächste Woche statt.",
      "Das Problem ist nicht zu unterschätzen.",
      "Man hört oft, dass es teuer ist."
    ],
    tips: [
      '"sich lassen" es más elegante que "man kann" + pasiva.',
      "Los adjetivos en -bar solo se forman de verbos transitivos.",
      '"sein + zu" tiene valor de obligación, no de posibilidad.'
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das kann gemacht werden. (sich lassen) → Das ___ ___ machen.", respuesta: "lässt sich", opciones: null, traduccion: "Eso se puede hacer.", pista: "sich lassen + Infinitiv", explicacion: "lässt sich = sustituye a 'kann gemacht werden'." },
        { tipo: "opcion", frase: "Das kann man lesen. (-bar) → Das ist ___ .", respuesta: "lesbar", opciones: ["lesbar", "leserlich", "lesend", "gelesen"], traduccion: "Se puede leer. → Es legible.", pista: null, explicacion: "lesbar = adjetivo en -bar (posibilidad pasiva)." },
        { tipo: "hueco", frase: "Das muss beachtet werden. (sein + zu) → Das ___ ___ beachten.", respuesta: "ist zu", opciones: null, traduccion: "Eso debe ser tenido en cuenta.", pista: "obligación pasiva", explicacion: "ist zu beachten = sein + zu + Infinitiv (obligación)." },
        { tipo: "opcion", frase: "Das kann man erklären. (sich lassen) → Das ___ sich ___ .", respuesta: "lässt erklären", opciones: ["lässt erklären", "erklärt sich", "ist erklärbar", "man erklärt"], traduccion: "Eso se puede explicar.", pista: null, explicacion: "lässt sich erklären = posibilidad pasiva con sich lassen." },
        { tipo: "hueco", frase: "Dieser Vorschlag ___ sich umsetzen. (lässt)", respuesta: "lässt", opciones: null, traduccion: "Esta propuesta se puede implementar.", pista: "sich lassen conjugado", explicacion: "lässt sich umsetzen = es realizable." },
        { tipo: "opcion", frase: "Das Problem ist ___ lösen.", respuesta: "zu", opciones: ["zu", "zum", "zur", "zu dem"], traduccion: "El problema debe ser resuelto.", pista: null, explicacion: "ist zu lösen = sein + zu + Infinitiv (deber pasivo)." },
        { tipo: "hueco", frase: "___ kann das nicht machen. (Man)", respuesta: "Man", opciones: null, traduccion: "No se puede hacer eso.", pista: "sujeto impersonal", explicacion: "man + Aktiv = alternativa coloquial a la pasiva." },
        { tipo: "opcion", frase: "Dieser Text ist kaum ___ .", respuesta: "lesbar", opciones: ["lesbar", "lesen", "gelesen", "leserlich"], traduccion: "Este texto es apenas legible.", pista: null, explicacion: "lesbar = adjetivo de posibilidad pasiva." },
        { tipo: "hueco", frase: "Die Maschine ___ sich reparieren. (lässt)", respuesta: "lässt", opciones: null, traduccion: "La máquina se puede reparar.", pista: "sich lassen 3ª sg", explicacion: "lässt sich reparieren = es reparable." },
        { tipo: "opcion", frase: "Das ist nicht ___ unterschätzen.", respuesta: "zu", opciones: ["zu", "zum", "zur", "zu dem"], traduccion: "Eso no debe subestimarse.", pista: null, explicacion: "ist nicht zu unterschätzen = no debe ser subestimado." },
        { tipo: "hueco", frase: "____ hört oft, dass es teuer ist. (Man)", respuesta: "Man", opciones: null, traduccion: "Se oye a menudo que es caro.", pista: "sujeto impersonal", explicacion: "man + hört = alternativa coloquial a 'es wird gehört'." },
        { tipo: "opcion", frase: "Das ___ sich machen, wenn du hilfst.", respuesta: "lässt", opciones: ["lässt", "kann", "muss", "wird"], traduccion: "Eso se puede hacer si ayudas.", pista: null, explicacion: "lässt sich = expresión de posibilidad pasiva." }
      ]
    }
  },
  // ============================================================
  // 3) SUBORDINADAS AVANZADAS
  // ============================================================
  {
    id: "b2_2_subordinadas_avanzadas",
    nivel: "B2.2",
    titulo: "Subordinadas avanzadas",
    icono: "🔗",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "indem = al + inf., sodass = de modo que, (an)statt dass, ohne dass: oraciones subordinadas modales.",
    explicacion: `<p>Las <strong>subordinadas modales y consecutivas</strong> expresan cómo o bajo qué circunstancias ocurre algo.</p>
<ul>
  <li><strong>indem</strong> (= al + inf., mediante): indica el modo o método. <em>Er verbessert sein Deutsch, indem er täglich übt.</em></li>
  <li><strong>sodass / so dass</strong> (= de modo que): indica consecuencia. <em>Er lernte viel, sodass er die Prüfung bestand.</em></li>
  <li><strong>(an)statt dass</strong> (= en lugar de): indica sustitución. <em>Statt dass er arbeitet, spielt er.</em></li>
  <li><strong>ohne dass</strong> (= sin que): indica ausencia de acompañamiento. <em>Er ging, ohne dass jemand es bemerkte.</em></li>
</ul>
<table>
  <tr><th>Conector</th><th>Significado</th><th>Ejemplo</th></tr>
  <tr><td>indem</td><td>al / mediante</td><td>Indem du übst, wirst du besser.</td></tr>
  <tr><td>sodass</td><td>de modo que</td><td>Er sprach leise, sodass ich nichts hörte.</td></tr>
  <tr><td>statt dass</td><td>en lugar de</td><td>Statt dass er hilft, stört er.</td></tr>
  <tr><td>ohne dass</td><td>sin que</td><td>Er ging, ohne dass er sich verabschiedete.</td></tr>
</table>`,
    ejemplos: [
      "Man lernt Deutsch, indem man viel spricht.",
      "Sie trainierte jeden Tag, sodass sie fit blieb.",
      "Statt dass er rechtzeitig kam, verspätete er sich.",
      "Er verließ das Haus, ohne dass es jemand sah.",
      "Indem sie die Regeln wiederholt, festigt sie ihr Wissen."
    ],
    tips: [
      "Con 'indem' los sujetos pueden ser iguales o diferentes.",
      " 'sodass' se puede escribir junto o separado: 'so dass'.",
      " 'ohne dass' suele usar Konjunktiv II en el verbo subordinado."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Man spart Zeit, ___ man das Auto nimmt. (indem)", respuesta: "indem", opciones: null, traduccion: "Se ahorra tiempo tomando el coche.", pista: "conector modal", explicacion: "indem = mediante/al + Infinitivo." },
        { tipo: "opcion", frase: "Er übte viel, ___ er perfekt wurde.", respuesta: "sodass", opciones: ["sodass", "indem", "statt dass", "ohne dass"], traduccion: "Practicó mucho, de modo que se volvió perfecto.", pista: null, explicacion: "sodass = de modo que (consecuencia)." },
        { tipo: "hueco", frase: "___ er arbeitet, schläft er. (Statt dass)", respuesta: "Statt dass", opciones: null, traduccion: "En lugar de trabajar, duerme.", pista: "sustitución", explicacion: "Statt dass = en lugar de (contrariedad)." },
        { tipo: "opcion", frase: "Er ging, ___ er etwas sagte.", respuesta: "ohne dass", opciones: ["ohne dass", "indem", "sodass", "statt dass"], traduccion: "Se fue sin decir nada.", pista: null, explicacion: "ohne dass = sin que (ausencia)." },
        { tipo: "hueco", frase: "___ du regelmäßig übst, wirst du besser. (Indem)", respuesta: "Indem", opciones: null, traduccion: "Practicando regularmente mejorarás.", pista: "conector modal al inicio", explicacion: "Indem + Nebensatz = método/medio." },
        { tipo: "opcion", frase: "Sie lernte viel, ___ sie die Prüfung bestand.", respuesta: "sodass", opciones: ["sodass", "indem", "statt dass", "ohne dass"], traduccion: "Aprendió mucho, de modo que aprobó el examen.", pista: null, explicacion: "sodass = indica resultado/consecuencia." },
        { tipo: "hueco", frase: "___ er hilft, stört er. (Statt dass)", respuesta: "Statt dass", opciones: null, traduccion: "En lugar de ayudar, molesta.", pista: "oposición", explicacion: "Statt dass = expresión de sustitución frustrada." },
        { tipo: "opcion", frase: "Er verließ den Raum, ___ es jemand bemerkte.", respuesta: "ohne dass", opciones: ["ohne dass", "indem", "sodass", "statt dass"], traduccion: "Salió de la habitación sin que nadie lo notara.", pista: null, explicacion: "ohne dass = sin que (evento no ocurrido)." },
        { tipo: "hueco", frase: "___ man die Regeln wiederholt, festigt man das Wissen. (Indem)", respuesta: "Indem", opciones: null, traduccion: "Repitiendo las reglas se consolida el conocimiento.", pista: "método/medio", explicacion: "Indem + Nebensatz = describe el método." },
        { tipo: "opcion", frase: "Er sprach leise, ___ ich nichts hörte.", respuesta: "sodass", opciones: ["sodass", "indem", "statt dass", "ohne dass"], traduccion: "Habló bajo, de modo que no oí nada.", pista: null, explicacion: "sodass = oración consecutiva." },
        { tipo: "hueco", frase: "___ er rechtzeitig kam, verspätete er sich. (Statt dass)", respuesta: "Statt dass", opciones: null, traduccion: "En lugar de llegar a tiempo, llegó tarde.", pista: "expectativa no cumplida", explicacion: "Statt dass + Nebensatz = contraexpectativa." },
        { tipo: "opcion", frase: "___ du fleißig bist, kannst du alles erreichen.", respuesta: "Indem", opciones: ["Indem", "Sodass", "Statt dass", "Ohne dass"], traduccion: "Siendo aplicado puedes lograr todo.", pista: null, explicacion: "Indem = mediante + subordinada modal." }
      ]
    }
  },
  // ============================================================
  // 4) MODISMOS FRECUENTES B2
  // ============================================================
  {
    id: "b2_2_modismos",
    nivel: "B2.2",
    titulo: "Modismos frecuentes B2",
    icono: "💡",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: '"das ist ein alter Hut", "ich verstehe nur Bahnhof", "da steppt der Bär": Redewendungen cotidianas.',
    explicacion: `<p>Los <strong>modismos (Redewendungen)</strong> son expresiones fijas con significado figurado. En B2 se espera que el alumno las reconozca y las use.</p>
<ul>
  <li><strong>Das ist ein alter Hut.</strong> → Eso ya se sabe, está desactualizado.</li>
  <li><strong>Ich verstehe nur Bahnhof.</strong> → No entiendo nada.</li>
  <li><strong>Da steppt der Bär.</strong> → Allí hay mucha fiesta / movimiento.</li>
  <li><strong>Jemandem die Daumen drücken.</strong> → Desear suerte a alguien.</li>
  <li><strong>Jemandem auf den Wecker fallen.</strong> → Molestar a alguien.</li>
  <li><strong>Das ist nicht das Gelbe vom Ei.</strong> → No es lo ideal.</li>
  <li><strong>Jetzt mal ehrlich.</strong> → Ahora en serio / honestamente.</li>
  <li><strong>Keine Angst!</strong> → ¡No tengas miedo!</li>
</ul>
<table>
  <tr><th>Modismo</th><th>Significado literal</th><th>Significado real</th></tr>
  <tr><td>ein alter Hut</td><td>un sombrero viejo</td><td>algo obsoleto, ya conocido</td></tr>
  <tr><td>nur Bahnhof verstehen</td><td>solo entender estación</td><td>no entender nada</td></tr>
  <tr><td>da steppt der Bär</td><td>allí baila el oso</td><td>hay mucha actividad</td></tr>
  <tr><td>Daumen drücken</td><td>apretar pulgares</td><td>desear suerte</td></tr>
  <tr><td>nicht das Gelbe vom Ei</td><td>no es lo amarillo del huevo</td><td>no es la solución ideal</td></tr>
</table>`,
    ejemplos: [
      "Diese Nachricht ist ein alter Hut, das weiß doch jeder.",
      "Bei Mathe verstehe ich nur Bahnhof.",
      "Auf der Party heute Abend steppt der Bär!",
      "Ich drücke dir die Daumen für die Prüfung!",
      "Die Wohnung ist schön, aber die Lage ist nicht das Gelbe vom Ei."
    ],
    tips: [
      "Los modismos no se traducen literalmente, hay que aprender su significado figurado.",
      "Muchos modismos tienen origen histórico o cultural.",
      "Los modismos dan naturalidad al habla, pero úsalos con contexto apropiado."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Das ist doch ___! Das weiß doch jeder schon.", respuesta: "ein alter Hut", opciones: null, traduccion: "¡Eso ya es un viejo sombrero! (está desactualizado)", pista: "algo ya sabido", explicacion: "ein alter Hut = algo obsoleto, ya conocido." },
        { tipo: "opcion", frase: "Bei dieser Erklärung verstehe ich nur ___.", respuesta: "Bahnhof", opciones: ["Bahnhof", "Bahnhofshof", "Bahnhalle", "Bahnsteig"], traduccion: "Con esta explicación solo entiendo estación (no entiendo nada).", pista: null, explicacion: "nur Bahnhof verstehen = no entender nada." },
        { tipo: "hueco", frase: "Ich ___ dir die ___ für die Prüfung.", respuesta: "drücke Daumen", opciones: null, traduccion: "Te aprieto los pulgares para el examen (te deseo suerte).", pista: "desear suerte", explicacion: "die Daumen drücken = desear suerte." },
        { tipo: "opcion", frase: "Das Angebot ist nicht ___", respuesta: "das Gelbe vom Ei", opciones: ["das Gelbe vom Ei", "das Gelbe", "vom Ei", "das Ei"], traduccion: "La oferta no es la yema del huevo (no es ideal).", pista: null, explicacion: "nicht das Gelbe vom Ei = no ser lo ideal." },
        { tipo: "hueco", frase: "Auf der Party heute Abend ___ der Bär!", respuesta: "steppt", opciones: null, traduccion: "¡En la fiesta de esta noche baila el oso! (habrá mucho ambiente)", pista: "baile del oso", explicacion: "da steppt der Bär = hay mucha actividad/fiesta." },
        { tipo: "opcion", frase: "___ mal ehrlich!", respuesta: "Jetzt", opciones: ["Jetzt", "Dann", "Später", "Gestern"], traduccion: "¡Ahora en serio!", pista: null, explicacion: "Jetzt mal ehrlich = expresión para pedir sinceridad." },
        { tipo: "hueco", frase: "Er fällt mir ständig ___ den Wecker.", respuesta: "auf", opciones: null, traduccion: "Él me cae constantemente en el despertador (me molesta).", pista: "preposición con Wecker", explicacion: "jemandem auf den Wecker fallen = molestar a alguien." },
        { tipo: "opcion", frase: "___ Angst! Das wird schon.", respuesta: "Keine", opciones: ["Keine", "Kein", "Nicht", "Nie"], traduccion: "¡Sin miedo! Ya saldrá bien.", pista: null, explicacion: "Keine Angst = expresión para tranquilizar." },
        { tipo: "hueco", frase: "___ du die Daumen für mich?", respuesta: "Drückst", opciones: null, traduccion: "¿Me aprietas los pulgares? (¿me deseas suerte?)", pista: "pregunta de apoyo", explicacion: "Drückst du die Daumen = petición de apoyo/suerte." },
        { tipo: "opcion", frase: "Die Nachricht ist ein ___ .", respuesta: "alter Hut", opciones: ["alter Hut", "neuer Hut", "alter Schuh", "neues Kleid"], traduccion: "La noticia es un sombrero viejo (ya se sabía).", pista: null, explicacion: "alter Hut = algo desactualizado." },
        { tipo: "hueco", frase: "Ich verstehe nur ___ in dieser Vorlesung.", respuesta: "Bahnhof", opciones: null, traduccion: "No entiendo nada en esta conferencia.", pista: "estación de tren", explicacion: "nur Bahnhof verstehen = coloquial para 'no entender nada'." },
        { tipo: "opcion", frase: "Das ist nicht ___ vom Ei.", respuesta: "das Gelbe", opciones: ["das Gelbe", "das Weiße", "das Ganze", "das Ei"], traduccion: "Eso no es la yema del huevo (no es ideal).", pista: null, explicacion: "das Gelbe vom Ei = expresión para 'lo ideal/perfecto'." }
      ]
    }
  },
  // ============================================================
  // 5) CONECTORES CULTOS
  // ============================================================
  {
    id: "b2_2_conectores_cultos",
    nivel: "B2.2",
    titulo: "Conectores cultos",
    icono: "🔤",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "allerdings, dennoch, insofern, hingegen, vielmehr, nichtsdestotrotz: conectores formales del discurso.",
    explicacion: `<p>Los <strong>conectores cultos</strong> (formales) son esenciales para escribir y hablar en contextos académicos y profesionales.</p>
<ul>
  <li><strong>allerdings</strong> → sin embargo, no obstante (concesivo, posición 0 o 1).</li>
  <li><strong>dennoch</strong> → no obstante, sin embargo (más formal que "trotzdem").</li>
  <li><strong>insofern</strong> → en la medida en que (condicional/consecutivo).</li>
  <li><strong>hingegen</strong> → en cambio, por el contrario (contraste).</li>
  <li><strong>vielmehr</strong> → más bien (corrección/rectificación).</li>
  <li><strong>nichtsdestotrotz</strong> → no obstante (formal, énfasis).</li>
</ul>
<table>
  <tr><th>Conector</th><th>Significado</th><th>Posición</th><th>Ejemplo</th></tr>
  <tr><td>allerdings</td><td>sin embargo</td><td>0 / 1</td><td>Es ist teuer, allerdings sehr gut.</td></tr>
  <tr><td>dennoch</td><td>no obstante</td><td>1</td><td>Es regnete, dennoch gingen wir spazieren.</td></tr>
  <tr><td>hingegen</td><td>en cambio</td><td>1</td><td>Er arbeitet, sie hingegen studiert.</td></tr>
  <tr><td>vielmehr</td><td>más bien</td><td>1</td><td>Er ist nicht dumm, vielmehr sehr klug.</td></tr>
  <tr><td>nichtsdestotrotz</td><td>no obstante</td><td>0 / 1</td><td>Nichtsdestotrotz bleiben wir optimistisch.</td></tr>
</table>`,
    ejemplos: [
      "Es war schwierig, allerdings haben wir es geschafft.",
      "Die Lage war ernst, dennoch gab sie nicht auf.",
      "Insofern du mitmachst, bin ich dabei.",
      "Er ist introvertiert, sein Bruder hingegen sehr gesprächig.",
      "Die Arbeit war hart, nichtsdestotrotz sind wir zufrieden."
    ],
    tips: [
      "Estos conectores son típicos de textos formales y ensayos.",
      "'allerdings' puede ir en posición 0 o 1, como conjunción o adverbio.",
      "'nichtsdestotrotz' es la forma más enfática de 'trotzdem'."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Es war anstrengend, ___ haben wir es geschafft. (sin embargo)", respuesta: "allerdings", opciones: null, traduccion: "Fue agotador, sin embargo lo logramos.", pista: "conector concesivo", explicacion: "allerdings = sin embargo (concesivo formal)." },
        { tipo: "opcion", frase: "Es war kalt, ___ gingen wir schwimmen. (no obstante)", respuesta: "dennoch", opciones: ["dennoch", "trotzdem", "allerdings", "hingegen"], traduccion: "Hacía frío, no obstante fuimos a nadar.", pista: null, explicacion: "dennoch = no obstante (más formal que trotzdem)." },
        { tipo: "hueco", frase: "Er spricht wenig, sie ___ sehr viel. (en cambio)", respuesta: "hingegen", opciones: null, traduccion: "Él habla poco, ella en cambio mucho.", pista: "contraste", explicacion: "hingegen = en cambio (contraste entre sujetos)." },
        { tipo: "opcion", frase: "___ bleiben wir zuversichtlich. (no obstante)", respuesta: "Nichtsdestotrotz", opciones: ["Nichtsdestotrotz", "Trotzdem", "Allerdings", "Hingegen"], traduccion: "No obstante, seguimos siendo optimistas.", pista: null, explicacion: "Nichtsdestotrotz = forma enfática de 'no obstante'." },
        { tipo: "hueco", frase: "___ du mitmachst, bin ich dabei. (Insofern)", respuesta: "Insofern", opciones: null, traduccion: "En la medida en que participes, yo estoy dentro.", pista: "condición formal", explicacion: "Insofern = en la medida en que (condicional formal)." },
        { tipo: "opcion", frase: "Er ist nicht dumm, ___ sehr klug.", respuesta: "vielmehr", opciones: ["vielmehr", "allerdings", "hingegen", "dennoch"], traduccion: "No es tonto, sino más bien muy listo.", pista: null, explicacion: "vielmehr = más bien (corrección/rectificación)." },
        { tipo: "hueco", frase: "Es war teuer, ___ sehr gut. (allerdings)", respuesta: "allerdings", opciones: null, traduccion: "Era caro, pero sin embargo muy bueno.", pista: "concesión", explicacion: "allerdings = matiz concesivo en segunda posición." },
        { tipo: "opcion", frase: "Sie arbeitet viel, er ___ entspannt sich.", respuesta: "hingegen", opciones: ["hingegen", "allerdings", "dennoch", "vielmehr"], traduccion: "Ella trabaja mucho, él en cambio se relaja.", pista: null, explicacion: "hingegen = contraste entre dos personas/acciones." },
        { tipo: "hueco", frase: "Die Arbeit war hart, ___ sind wir zufrieden. (nichtsdestotrotz)", respuesta: "nichtsdestotrotz", opciones: null, traduccion: "El trabajo fue duro, no obstante estamos satisfechos.", pista: "énfasis formal", explicacion: "nichtsdestotrotz = conector formal enfático." },
        { tipo: "opcion", frase: "___ du rechtzeitig kommst, können wir beginnen.", respuesta: "Insofern", opciones: ["Insofern", "Allerdings", "Dennoch", "Hingegen"], traduccion: "En la medida en que llegues a tiempo, podemos empezar.", pista: null, explicacion: "Insofern + Nebensatz = condición/consecuencia formal." },
        { tipo: "hueco", frase: "Das ist nicht schlecht, ___ sogar sehr gut. (vielmehr)", respuesta: "vielmehr", opciones: null, traduccion: "Eso no es malo, sino más bien muy bueno.", pista: "rectificación", explicacion: "vielmehr = introduce una corrección o matiz." },
        { tipo: "opcion", frase: "Er ist introvertiert, sein Bruder ___ sehr gesprächig.", respuesta: "hingegen", opciones: ["hingegen", "allerdings", "dennoch", "nichtsdestotrotz"], traduccion: "Él es introvertido, su hermano en cambio muy hablador.", pista: null, explicacion: "hingegen = contraste directo entre dos elementos." }
      ]
    }
  },
  // ============================================================
  // 6) PREFIJOS INSEPARABLES
  // ============================================================
  {
    id: "b2_2_prefijos_inseparables",
    nivel: "B2.2",
    titulo: "Prefijos inseparables",
    icono: "🔠",
    colorBorde: "border-lime-500",
    bg: "bg-lime-950/30",
    resumen: "be-, ge-, er-, ver-, zer-, ent-, emp-, miß-: prefijos inseparables con doble significado y ejemplos.",
    explicacion: `<p>Los <strong>prefijos inseparables</strong> modifican el significado del verbo de forma drástica. Nunca se separan del verbo y no llevan <em>ge-</em> en el Partizip II.</p>
<ul>
  <li><strong>be-</strong>: transitivo / intensivo: <em>antworten → beantworten (contestar → responder algo)</em></li>
  <li><strong>ge-</strong>: durativo / colectivo: <em>brauchen → gebrauchen (necesitar → usar)</em></li>
  <li><strong>er-</strong>: inicio / logro: <em>wachen → erwachen (velar → despertarse)</em></li>
  <li><strong>ver-</strong>: cambio / error / intensificación: <em>kaufen → verkaufen (comprar → vender)</em></li>
  <li><strong>zer-</strong>: destrucción / desintegración: <em>brechen → zerbrechen (romper → hacer pedazos)</em></li>
  <li><strong>ent-</strong>: separación / privación: <em>fernen → entfernen (alejar → quitar)</em></li>
  <li><strong>emp-</strong>: recibir / sentir: <em>fangen → empfangen (atrapar → recibir)</em></li>
  <li><strong>miß-</strong>: error / defecto: <em>verstehen → mißverstehen (entender → malentender)</em></li>
</ul>
<table>
  <tr><th>Prefijo</th><th>Verbo base</th><th>Verbo prefijado</th><th>Significado</th></tr>
  <tr><td>be-</td><td>antworten</td><td>beantworten</td><td>responder algo</td></tr>
  <tr><td>ver-</td><td>kaufen</td><td>verkaufen</td><td>vender</td></tr>
  <tr><td>zer-</td><td>brechen</td><td>zerbrechen</td><td>hacer pedazos</td></tr>
  <tr><td>ent-</td><td>fernen</td><td>entfernen</td><td>quitar / eliminar</td></tr>
  <tr><td>emp-</td><td>fangen</td><td>empfangen</td><td>recibir</td></tr>
  <tr><td>miß-</td><td>verstehen</td><td>mißverstehen</td><td>malinterpretar</td></tr>
</table>`,
    ejemplos: [
      "Ich beantworte deine Frage gern.",
      "Er verkauft sein altes Auto.",
      "Das Glas zerbrach in tausend Stücke.",
      "Bitte entfernen Sie die Datei.",
      "Ich habe das leider mißverstanden."
    ],
    tips: [
      "Nunca llevan ge- en Partizip II: beantwortet, verkauft, zerbrochen.",
      "'ver-' es el prefijo más versátil y puede indicar también consumo: 'verbrauchen'.",
      "'miß-' se escribe con 'ß' y suele tener connotación negativa."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich ___ (antworten) deine Frage morgen. (be)", respuesta: "beantworte", opciones: null, traduccion: "Responderé a tu pregunta mañana.", pista: "be- + antworten", explicacion: "beantworten = antworten + be- (transitivo/respuesta concreta)." },
        { tipo: "opcion", frase: "Er ___ (kaufen) sein Haus. (ver)", respuesta: "verkauft", opciones: ["verkauft", "verkaufen", "kaufen", "kaufte"], traduccion: "Él vende su casa.", pista: null, explicacion: "verkaufen = kaufen + ver- (cambio de posesión)." },
        { tipo: "hueco", frase: "Das Glas ___ (brechen) auf dem Boden. (zer)", respuesta: "zerbrach", opciones: null, traduccion: "El vaso se hizo pedazos en el suelo.", pista: "pretérito + zer-", explicacion: "zerbrechen = brechen + zer- (destrucción total)." },
        { tipo: "opcion", frase: "Wir ___ (fernen) den Müll. (ent)", respuesta: "entfernen", opciones: ["entfernen", "fernen", "entfernen", "fernen weg"], traduccion: "Retiramos la basura.", pista: null, explicacion: "entfernen = fernen + ent- (separación/eliminación)." },
        { tipo: "hueco", frase: "Ich ___ (fangen) ein Paket. (emp)", respuesta: "empfange", opciones: null, traduccion: "Recibo un paquete.", pista: "emp- + fangen", explicacion: "empfangen = fangen + emp- (recibir/atrapar simbólico)." },
        { tipo: "opcion", frase: "Ich habe das leider ___ (verstehen). (miß)", respuesta: "mißverstanden", opciones: ["mißverstanden", "verstanden", "vermißstanden", "mißstehen"], traduccion: "Lamentablemente lo malinterpreté.", pista: null, explicacion: "mißverstehen = verstehen + miß- (malentender/error)." },
        { tipo: "hueco", frase: "Er ___ (zahlen) die Rechnung. (be)", respuesta: "bezahlt", opciones: null, traduccion: "Él paga la factura.", pista: "be- + zahlen", explicacion: "bezahlen = zahlen + be- (pagar algo concreto)." },
        { tipo: "opcion", frase: "Die Blume ___ (blühen) im Frühling. (er)", respuesta: "erblüht", opciones: ["erblüht", "blüht", "verblüht", "geblüht"], traduccion: "La flor florece en primavera.", pista: null, explicacion: "erblühen = blühen + er- (inicio del proceso)." },
        { tipo: "hueco", frase: "Die Feinde ___ (stören) die Ruhe. (zer)", respuesta: "zerstören", opciones: null, traduccion: "Los enemigos destruyen la paz.", pista: "zer- + stören", explicacion: "zerstören = stören + zer- (destrucción intensiva)." },
        { tipo: "opcion", frase: "Er ___ (decken) das Bett. (ent)", respuesta: "entdeckt", opciones: ["entdeckt", "deckt", "entdeckt", "deckt zu"], traduccion: "Él descubre la cama / descubre algo.", pista: null, explicacion: "entdecken = decken + ent- (descubrir/revelar)." },
        { tipo: "hueco", frase: "Wir ___ (halten) ihn für klug. (er)", respuesta: "erhalten", opciones: null, traduccion: "Lo consideramos inteligente.", pista: "er- + halten", explicacion: "erhalten = halten + er- (recibir/mantener)." },
        { tipo: "opcion", frase: "___ (brauchen) Sie dieses Werkzeug?", respuesta: "Gebrauchen", opciones: ["Gebrauchen", "Brauchen", "Verbrauchen", "Erbrauchen"], traduccion: "¿Usa usted esta herramienta?", pista: null, explicacion: "gebrauchen = brauchen + ge- (usar/aplicar)." }
      ]
    }
  }
];