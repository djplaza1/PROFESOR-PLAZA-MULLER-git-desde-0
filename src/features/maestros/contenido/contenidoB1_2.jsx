/* === CONTENIDO GRAMATICAL B1.2 === */
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};

window.Muller.Maestros.contenido.B1_2 = [
  // ============================================================
  // 1) PARTIZIP I/II COMO ADJETIVOS
  // ============================================================
  {
    id: "b1_2_partizip_adjektiv",
    nivel: "B1.2",
    titulo: "Partizip I/II como adjetivos",
    icono: "🏷️",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Uso de participios presentes y pasados como adjetivos atributivos.",
    explicacion: `
      <p>En alemán, tanto el <strong>Partizip I</strong> (participio presente) como el <strong>Partizip II</strong> (participio pasado) pueden funcionar como adjetivos. Se declinan como cualquier adjetivo y se colocan delante del sustantivo.</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Partizip I como adjetivo (acción activa en curso)</h4>
      <p>Se forma: <strong>Infinitivo + d</strong> + terminación adjetiva.<br>
      Ej: <em>lachen → lachend → der lachende Mann</em> (el hombre que ríe / risueño).</p>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li><strong>das weinende Kind</strong> = el niño que llora</li>
        <li><strong>die singende Frau</strong> = la mujer que canta</li>
        <li><strong>ein interessantes Buch</strong> (atención: no es Partizip, es adjetivo)</li>
      </ul>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Partizip II como adjetivo (acción pasiva o completada)</h4>
      <p>Se usa el Partizip II del verbo + terminación adjetiva.<br>
      Ej: <em>kochen → gekocht → die gekochte Suppe</em> (la sopa cocinada).</p>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li><strong>das geschriebene Wort</strong> = la palabra escrita</li>
        <li><strong>die geöffnete Tür</strong> = la puerta abierta</li>
        <li><strong>der reparierte Computer</strong> = el ordenador reparado</li>
      </ul>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Diferencia clave</h4>
      <table class="w-full border-collapse mt-2">
        <tr class="border-b border-amber-800"><th class="text-left p-2">Partizip I</th><th class="text-left p-2">Partizip II</th></tr>
        <tr class="border-b border-amber-800"><td class="p-2">Activo, simultáneo</td><td class="p-2">Pasivo/completado</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><em>der lesende Student</em></td><td class="p-2"><em>das gelesene Buch</em></td></tr>
        <tr><td class="p-2">"el estudiante que lee"</td><td class="p-2">"el libro leído"</td></tr>
      </table>
    `,
    ejemplos: [
      "Der <strong>schlafende</strong> Hund liegt auf dem Sofa. (El perro durmiente está en el sofá)",
      "Die <strong>gekochten</strong> Nudeln sind fertig. (Los fideos cocinados están listos)",
      "Eine <strong>lächelnde</strong> Verkäuferin half mir. (Una dependienta sonriente me ayudó)",
      "Das <strong>verlorene</strong> Portemonnaie wurde gefunden. (La cartera perdida fue encontrada)",
      "Der <strong>rennende</strong> Junge fiel hin. (El niño corredor se cayó)"
    ],
    tips: [
      "Partizip I traduce a menudo como gerundio español: 'sonriente' = 'que sonríe'.",
      "Partizip II como adjetivo equivale a participio español: 'escrito', 'abierto', 'cocinado'.",
      "Ambos se declinan IGUAL que los adjetivos normales (fuerte, mixta, débil)."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con Partizip I o II del verbo entre paréntesis:",
      datos: {
        frases: [
          { texto: "Der ___ (schlafen) Hund", respuesta: "schlafende" },
          { texto: "Die ___ (kochen) Suppe", respuesta: "gekochte" },
          { texto: "Ein ___ (lächeln) Kind", respuesta: "lächelndes" },
          { texto: "Das ___ (schreiben) Buch", respuesta: "geschriebene" }
        ]
      }
    }
  },
  // ============================================================
  // 2) N-DEKLINATION
  // ============================================================
  {
    id: "b1_2_n_deklination",
    nivel: "B1.2",
    titulo: "N-Deklination",
    icono: "🧑‍🏫",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Sustantivos masculinos débiles que añaden -(e)n en todos los casos excepto nominativo.",
    explicacion: `
      <p>La <strong>N-Deklination</strong> (declinación débil) afecta a ciertos sustantivos <strong>masculinos</strong> que añaden una <strong>-n</strong> o <strong>-en</strong> en todos los casos excepto nominativo singular.</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">¿Qué sustantivos la siguen?</h4>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li>Personas y animales que terminan en <strong>-e</strong>: der Junge, der Kunde, der Löwe, der Affe</li>
        <li>Nacionalidades en <strong>-e</strong>: der Russe, der Franzose, der Grieche</li>
        <li>Profesiones/roles en <strong>-ist</strong>, <strong>-ent</strong>, <strong>-ant</strong>: der Polizist, der Student, der Praktikant, der Musikant</li>
        <li>Otros comunes: der Herr, der Mensch, der Nachbar, der Held, der Bär, der Prinz</li>
      </ul>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Tabla de declinación</h4>
      <table class="w-full border-collapse mt-2">
        <tr class="border-b border-amber-800"><th class="text-left p-2">Caso</th><th class="text-left p-2">Ejemplo: der Student</th></tr>
        <tr class="border-b border-amber-800"><td class="p-2">Nominativ</td><td class="p-2">der Student</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">Akkusativ</td><td class="p-2">den Student<strong>en</strong></td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">Dativ</td><td class="p-2">dem Student<strong>en</strong></td></tr>
        <tr><td class="p-2">Genitiv</td><td class="p-2">des Student<strong>en</strong></td></tr>
      </table>
    `,
    ejemplos: [
      "Ich sehe <strong>den Studenten</strong>. (Veo al estudiante)",
      "Wir helfen <strong>dem Kunden</strong>. (Ayudamos al cliente)",
      "Das ist das Buch <strong>des Herrn</strong> Müller. (Ese es el libro del Sr. Müller)",
      "Sie spricht mit <strong>dem Franzosen</strong>. (Ella habla con el francés)",
      "Der Löwe ist stärker als <strong>der Bär</strong> — pero: Ich füttere <strong>den Löwen</strong>."
    ],
    tips: [
      "Casi todos son masculinos y se refieren a personas o animales.",
      "Excepción: 'das Herz' (neutro) también sigue N-Deklination en singular.",
      "El plural siempre añade -(e)n, así que es fácil: Student → Studenten (pl.)"
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la forma correcta del sustantivo entre paréntesis:",
      datos: {
        frases: [
          { texto: "Ich kenne ___ (der Student)", respuesta: "den Studenten" },
          { texto: "Das Auto ___ (der Herr) ist neu", respuesta: "des Herrn" },
          { texto: "Wir danken ___ (der Kunde)", respuesta: "dem Kunden" },
          { texto: "Sie geht mit ___ (der Junge) spazieren", respuesta: "dem Jungen" }
        ]
      }
    }
  },
  // ============================================================
  // 3) CONECTORES DOBLES
  // ============================================================
  {
    id: "b1_2_doppelkonnektoren",
    nivel: "B1.2",
    titulo: "Conectores dobles",
    icono: "🔗",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Estructuras correlativas: sowohl...als auch, entweder...oder, weder...noch, je...desto.",
    explicacion: `
      <p>Los <strong>conectores dobles</strong> (Doppelkonnektoren) unen dos elementos de una oración dándoles una relación específica. Afectan la posición del verbo según el conector.</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Tipos principales</h4>
      <table class="w-full border-collapse mt-2">
        <tr class="border-b border-amber-800"><th class="text-left p-2">Conector</th><th class="text-left p-2">Significado</th><th class="text-left p-2">Ejemplo</th></tr>
        <tr class="border-b border-amber-800"><td class="p-2">sowohl...als auch</td><td class="p-2">tanto...como</td><td class="p-2">Sowohl Anna <strong>als auch</strong> Peter kommen.</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">entweder...oder</td><td class="p-2">o...o</td><td class="p-2">Entweder du rufst an <strong>oder</strong> du schreibst.</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">weder...noch</td><td class="p-2">ni...ni</td><td class="p-2">Weder Maria <strong>noch</strong> Hans war da.</td></tr>
        <tr><td class="p-2">je...desto/umso</td><td class="p-2">cuanto más...más</td><td class="p-2">Je mehr ich lerne, <strong>desto</strong> besser verstehe ich.</td></tr>
      </table>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Reglas de posición verbal</h4>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li><strong>sowohl...als auch</strong>: verbo después de la estructura completa.</li>
        <li><strong>entweder...oder</strong>: si une dos oraciones main, cada una tiene verbo en posición 2.</li>
        <li><strong>je...desto</strong>: la primera parte (je) tiene verbo al final; la segunda (desto/umso) tiene verbo al final también → estructura de subordinada.</li>
      </ul>
    `,
    ejemplos: [
      "Er spricht <strong>sowohl</strong> Deutsch <strong>als auch</strong> Französisch. (Habla tanto alemán como francés)",
      "<strong>Entweder</strong> wir gehen ins Kino <strong>oder</strong> wir bleiben zu Hause. (O vamos al cine o nos quedamos en casa)",
      "Ich mag <strong>weder</strong> Kaffee <strong>noch</strong> Tee. (No me gusta ni café ni té)",
      "<strong>Je</strong> mehr du übst, <strong>desto</strong> besser wirst du. (Cuanto más practiques, mejor serás)"
    ],
    tips: [
      "Con 'weder...noch' el verbo va en afirmativo (no es necesario 'nicht').",
      "'Je...desto' siempre introduce comparación de proporcionalidad.",
      "En 'entweder...oder' ambas opciones tienen el mismo peso gramatical."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con el conector doble adecuado:",
      datos: {
        frases: [
          { texto: "___ Anna ___ Peter kommen zur Party", respuesta: "Sowohl ... als auch" },
          { texto: "___ gehst du ___ bleibst du?", respuesta: "Entweder ... oder" },
          { texto: "Ich habe ___ Zeit ___ Geld", respuesta: "weder ... noch" },
          { texto: "___ mehr man reist, ___ mehr lernt man", respuesta: "Je ... desto" }
        ]
      }
    }
  },
  // ============================================================
  // 4) ESTILO INDIRECTO (KONJUNKTIV I)
  // ============================================================
  {
    id: "b1_2_konjunktiv1",
    nivel: "B1.2",
    titulo: "Estilo indirecto (Konjunktiv I)",
    icono: "🗣️",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Uso del Konjunktiv I para reportar lo que alguien dijo sin comprometerse con la verdad.",
    explicacion: `
      <p>El <strong>Konjunktiv I</strong> es el modo de la <strong>indirect speech</strong> (discurso indirecto) en alemán. Se usa para reportar palabras, pensamientos o rumores de otros, manteniendo distancia sobre la veracidad.</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Formación</h4>
      <p>Se forma a partir de la raíz del verbo + terminaciones: -e, -est, -e, -en, -et, -en</p>
      <p>Ejemplo: <em>sagen → er sage</em> (él dice/diría/aparentemente dice)</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Tabla de conjugación (verbos regulares)</h4>
      <table class="w-full border-collapse mt-2">
        <tr class="border-b border-amber-800"><th class="text-left p-2">Persona</th><th class="text-left p-2">sagen</th><th class="text-left p-2">haben</th><th class="text-left p-2">sein</th></tr>
        <tr class="border-b border-amber-800"><td class="p-2">ich</td><td class="p-2">sage</td><td class="p-2">habe</td><td class="p-2">sei</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">du</td><td class="p-2">sagest</td><td class="p-2">habest</td><td class="p-2">seiest</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">er/sie/es</td><td class="p-2">sage</td><td class="p-2">habe</td><td class="p-2">sei</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">wir</td><td class="p-2">sagen</td><td class="p-2">haben</td><td class="p-2">seien</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2">ihr</td><td class="p-2">saget</td><td class="p-2">habet</td><td class="p-2">seiet</td></tr>
        <tr><td class="p-2">sie/Sie</td><td class="p-2">sagen</td><td class="p-2">haben</td><td class="p-2">seien</td></tr>
      </table>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Uso</h4>
      <p>Cuando el Konjunktiv I es IDÉNTICO al indicativo (especialmente 1ª pers. sing. y plural), se usa <strong>Konjunktiv II</strong> como reemplazo para mayor claridad.</p>
    `,
    ejemplos: [
      "Er sagt, er <strong>habe</strong> keine Zeit. (Él dice que no tiene tiempo)",
      "Sie behauptet, sie <strong>sei</strong> krank. (Ella afirma que está enferma)",
      "Die Zeitung schreibt, der Minister <strong>trete</strong> zurück. (El periódico escribe que el ministro dimite)",
      "Er fragte, ob ich morgen <strong>kommen könne</strong>. (Preguntó si podía venir mañana)",
      "Man munkelt, sie <strong>hätten</strong> sich getrennt. (Se rumorea que se han separado)"
    ],
    tips: [
      "Konjunktiv I es el modo periodístico por excelencia en alemán.",
      "Si K.I = Indikativ, usa K.II como sustituto (würde + Infinitiv o forma K.II).",
      "Los verbos modales en K.I: könne, müsse, dürfe, wolle, solle, möge."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Convierte a discurso indirecto usando Konjunktiv I:",
      datos: {
        frases: [
          { texto: "Er sagt: 'Ich habe Hunger' → Er sagt, er ___ Hunger", respuesta: "habe" },
          { texto: "Sie meint: 'Ich bin müde' → Sie meint, sie ___ müde", respuesta: "sei" },
          { texto: "Er fragt: 'Kannst du kommen?' → Er fragt, ob ich kommen ___", respuesta: "könne" }
        ]
      }
    }
  },
  // ============================================================
  // 5) PREPOSICIONES CON GENITIVO AVANZADAS
  // ============================================================
  {
    id: "b1_2_genitiv_praepositionen",
    nivel: "B1.2",
    titulo: "Preposiciones con Genitivo avanzadas",
    icono: "📍",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Preposiciones que rigen genitivo: wegen, trotz, während, statt, innerhalb, außerhalb, etc.",
    explicacion: `
      <p>Además de las preposiciones básicas de genitivo, existen varias que se usan en contextos más formales y académicos:</p>
      <table class="w-full border-collapse mt-2">
        <tr class="border-b border-amber-800"><th class="text-left p-2">Preposición</th><th class="text-left p-2">Significado</th></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>wegen</strong> (+ G)</td><td class="p-2">a causa de</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>trotz</strong> (+ G)</td><td class="p-2">a pesar de</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>während</strong> (+ G)</td><td class="p-2">durante</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>statt / anstatt</strong> (+ G)</td><td class="p-2">en lugar de</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>innerhalb</strong> (+ G)</td><td class="p-2">dentro de (tiempo/espacio)</td></tr>
        <tr class="border-b border-amber-800"><td class="p-2"><strong>außerhalb</strong> (+ G)</td><td class="p-2">fuera de</td></tr>
        <tr><td class="p-2"><strong>unweit</strong> (+ G)</td><td class="p-2">no lejos de</td></tr>
      </table>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Nota importante</h4>
      <p>En alemán coloquial/hablado, <strong>wegen</strong> y <strong>trotz</strong> se usan a menudo con <strong>Dativ</strong> (wegen dem Wetter). En escritura formal, siempre Genitiv.</p>
    `,
    ejemplos: [
      "<strong>Wegen</strong> des Regens bleibt die Schule geschlossen. (Debido a la lluvia, la escuela permanece cerrada)",
      "<strong>Trotz</strong> des schlechten Wetters gingen wir spazieren. (A pesar del mal tiempo, salimos a pasear)",
      "<strong>Während</strong> des Films muss es leise sein. (Durante la película debe haber silencio)",
      "<strong>Statt</strong> des Buches kaufte er eine Zeitschrift. (En lugar del libro, compró una revista)",
      "<strong>Innerhalb</strong> einer Woche muss die Arbeit fertig sein. (Dentro de una semana el trabajo debe estar listo)"
    ],
    tips: [
      "En coloquial: 'wegen dem Regen' (Dativ) es aceptable; en examen usa Genitiv.",
      "'Während' también puede ser conjunción (während ich schlief).",
      "Para recordar: las preposiciones cultas suelen regir Genitiv."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la preposición correcta (forma genitiva):",
      datos: {
        frases: [
          { texto: "___ des Regens bleibe ich zu Hause", respuesta: "Wegen" },
          { texto: "___ der Ferien haben wir frei", respuesta: "Während" },
          { texto: "___ des Lärms konnte ich nicht schlafen", respuesta: "Trotz" },
          { texto: "___ der Stadt gibt es einen großen Park", respuesta: "Innerhalb" }
        ]
      }
    }
  },
  // ============================================================
  // 6) INFINITIVO CON ZU
  // ============================================================
  {
    id: "b1_2_infinitiv_zu",
    nivel: "B1.2",
    titulo: "Infinitivo con zu",
    icono: "🔤",
    colorBorde: "border-amber-500",
    bg: "bg-amber-950/30",
    resumen: "Uso del infinitivo con 'zu' como complemento de verbos, adjetivos y sustantivos.",
    explicacion: `
      <p>El <strong>infinitivo con 'zu'</strong> es equivalente al infinitivo español (hablar, comer, vivir) pero siempre precedido de <strong>zu</strong>. Se usa como complemento de ciertos verbos, adjetivos y sustantivos.</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Regla básica</h4>
      <p>Infinitivo + zu → zu + infinitivo al final de la oración o frase.</p>
      <p>Ej: <em>Ich versuche, gut Deutsch <strong>zu lernen</strong>.</em> (Intento aprender bien alemán).</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Verbos que requieren 'zu' + infinitivo</h4>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li><strong>versuchen</strong> (intentar), <strong>hoffen</strong> (esperar), <strong>planen</strong> (planear)</li>
        <li><strong>beginnen</strong> (empezar), <strong>aufhören</strong> (parar de), <strong>vergessen</strong> (olvidar)</li>
        <li><strong>empfehlen</strong> (recomendar), <strong>verbieten</strong> (prohibir), <strong>erlauben</strong> (permitir)</li>
        <li><strong>scheinen</strong> (parecer), <strong>pflegen</strong> (soler), <strong>brauchen</strong> (necesitar)</li>
      </ul>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Con verbos modales y 'werden'</h4>
      <p>Con <strong>modalverben</strong> y <strong>werden</strong> NO se usa 'zu'.</p>
      <p>Ej: <em>Ich kann kommen</em> (NO kann zu kommen).</p>
      <h4 class="text-amber-300 font-semibold mt-4 mb-2">Verbos separables</h4>
      <p>Con verbos separables, <strong>zu</strong> se coloca entre el prefijo y la raíz: <em>anrufen → anzurufen</em></p>
    `,
    ejemplos: [
      "Ich versuche, jeden Tag Deutsch <strong>zu lernen</strong>. (Intento aprender alemán cada día)",
      "Er hofft, im Sommer nach Berlin <strong>zu fahren</strong>. (Espera ir a Berlín en verano)",
      "Sie hat vergessen, das Fenster <strong>zu schließen</strong>. (Ella olvidó cerrar la ventana)",
      "Es ist wichtig, pünktlich <strong>zu sein</strong>. (Es importante ser puntual)",
      "Er scheint alles <strong>zu verstehen</strong>. (Él parece entenderlo todo)"
    ],
    tips: [
      "Cuando hay dos infinitivos, el 'zu' va antes del segundo: 'Ich hoffe, ihn morgen zu sehen.'",
      "Con verbos separables: 'einkaufen → einzukaufen', 'aufräumen → aufzuräumen'.",
      "NUNCA uses 'zu' con modales (können, müssen, dürfen...)."
    ],
    ejercicioBase: {
      tipo: "huecos",
      enunciado: "Completa con la forma correcta (zu + infinitivo):",
      datos: {
        frases: [
          { texto: "Ich versuche, das Buch ___ (lesen)", respuesta: "zu lesen" },
          { texto: "Er hofft, sie ___ (treffen)", respuesta: "zu treffen" },
          { texto: "Wir planen, morgen ___ (abfahren)", respuesta: "abzufahren" },
          { texto: "Es ist wichtig, genug ___ (schlafen)", respuesta: "zu schlafen" }
        ]
      }
    }
  }
];