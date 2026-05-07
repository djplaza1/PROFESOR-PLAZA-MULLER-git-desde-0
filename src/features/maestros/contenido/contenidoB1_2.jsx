// src/features/maestros/contenido/contenidoB1_2.jsx
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
      <h3 class="text-lg font-bold text-amber-400 mb-2">Partizip I/II como adjetivos</h3>
      <p class="mb-2">En alemán, tanto el <strong>Partizip I</strong> (participio presente) como el <strong>Partizip II</strong> (participio pasado) pueden funcionar como adjetivos. Se declinan como cualquier adjetivo y se colocan delante del sustantivo.</p>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">Partizip I como adjetivo (acción activa en curso)</h4>
      <p class="mb-1">Se forma: <strong>Infinitivo + d</strong> + terminación adjetiva.<br/>Ej: <em>lachen → lachend → der lachende Mann</em> (el hombre que ríe / risueño).</p>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li><strong>das weinende Kind</strong> = el niño que llora</li>
        <li><strong>die singende Frau</strong> = la mujer que canta</li>
      </ul>
      <h4 class="font-bold text-amber-300 mt-2 mb-1">Partizip II como adjetivo (acción pasiva o completada)</h4>
      <p class="mb-1">Se usa el Partizip II del verbo + terminación adjetiva.<br/>Ej: <em>kochen → gekocht → die gekochte Suppe</em> (la sopa cocinada).</p>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li><strong>das geschriebene Wort</strong> = la palabra escrita</li>
        <li><strong>die geöffnete Tür</strong> = la puerta abierta</li>
      </ul>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-amber-900/50"><th class="border p-1">Partizip I</th><th class="border p-1">Partizip II</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Activo, simultáneo</td><td class="border p-1">Pasivo/completado</td></tr>
        <tr><td class="border p-1"><em>der lesende Student</em></td><td class="border p-1"><em>das gelesene Buch</em></td></tr>
        <tr><td class="border p-1">"el estudiante que lee"</td><td class="border p-1">"el libro leído"</td></tr>
        </tbody>
      </table>
    `,
    ejemplos: [
      "Der schlafende Hund liegt auf dem Sofa. (El perro durmiente está en el sofá)",
      "Die gekochten Nudeln sind fertig. (Los fideos cocinados están listos)",
      "Eine lächelnde Verkäuferin half mir. (Una dependienta sonriente me ayudó)",
      "Das verlorene Portemonnaie wurde gefunden. (La cartera perdida fue encontrada)",
      "Der rennende Junge fiel hin. (El niño corredor se cayó)"
    ],
    tips: [
      "Partizip I traduce a menudo como gerundio español: 'sonriente' = 'que sonríe'.",
      "Partizip II como adjetivo equivale a participio español: 'escrito', 'abierto', 'cocinado'.",
      "Ambos se declinan IGUAL que los adjetivos normales (fuerte, mixta, débil)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Der ___ Hund liegt auf dem Sofa.", respuesta: "schlafende", opciones: null, traduccion: "El perro durmiente está en el sofá.", pista: "Partizip I de schlafen", explicacion: "schlafend + e = schlafende (declinación débil)." },
        { tipo: "opcion", frase: "Die ___ Nudeln sind fertig.", respuesta: "gekochten", opciones: ["gekochten", "kochenden", "kochen", "gekochte"], traduccion: "Los fideos cocinados están listos.", pista: null, explicacion: "gekocht + en = Partizip II como adjetivo en plural." },
        { tipo: "hueco", frase: "Eine ___ Verkäuferin half mir.", respuesta: "lächelnde", opciones: null, traduccion: "Una dependienta sonriente me ayudó.", pista: "Partizip I de lächeln", explicacion: "lächelnd + e = lächelnde, femenino Nominativ." },
        { tipo: "opcion", frase: "Das ___ Portemonnaie wurde gefunden.", respuesta: "verlorene", opciones: ["verlorene", "verlierende", "verlor", "verloren"], traduccion: "La cartera perdida fue encontrada.", pista: null, explicacion: "verloren + e = verlorene (Partizip II de verlieren)." },
        { tipo: "hueco", frase: "Der ___ Junge fiel hin.", respuesta: "rennende", opciones: null, traduccion: "El niño corredor se cayó.", pista: "Partizip I de rennen", explicacion: "rennend + e = rennende (acción en curso)." },
        { tipo: "opcion", frase: "Das ___ Wasser ist gefährlich.", respuesta: "fließende", opciones: ["fließende", "geflossene", "fließen", "fließte"], traduccion: "El agua que fluye es peligrosa.", pista: null, explicacion: "fließend + e = fließende (Partizip I)." },
        { tipo: "hueco", frase: "Die ___ Tür muss repariert werden.", respuesta: "geschlossene", opciones: null, traduccion: "La puerta cerrada debe ser reparada.", pista: "Partizip II de schließen", explicacion: "geschlossen + e = geschlossene." },
        { tipo: "opcion", frase: "Ein ___ Auto kostet viel Geld.", respuesta: "repariertes", opciones: ["repariertes", "reparierendes", "reparatur", "repariert"], traduccion: "Un coche reparado cuesta mucho dinero.", pista: null, explicacion: "repariert + es = repariertes (neutro Nominativ/Akkusativ)." },
        { tipo: "hueco", frase: "Die ___ Blumen sind schön.", respuesta: "blühenden", opciones: null, traduccion: "Las flores florecientes son hermosas.", pista: "Partizip I de blühen", explicacion: "blühend + en = blühenden (plural Dativ)." },
        { tipo: "opcion", frase: "Der ___ Brief kam gestern an.", respuesta: "erwartete", opciones: ["erwartete", "erwartende", "erwarten", "erwartet"], traduccion: "La carta esperada llegó ayer.", pista: null, explicacion: "erwartet + e = erwartete (Partizip II)." },
        { tipo: "hueco", frase: "Das ___ Kind weint laut.", respuesta: "weinende", opciones: null, traduccion: "El niño que llora llora fuerte.", pista: "Partizip I de weinen", explicacion: "weinend + e = weinende." },
        { tipo: "opcion", frase: "Die ___ Milch ist schlecht.", respuesta: "gekaufte", opciones: ["gekaufte", "kaufende", "kaufen", "kauft"], traduccion: "La leche comprada está mala.", pista: null, explicacion: "gekauft + e = gekaufte (Partizip II de kaufen)." }
      ]
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
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    resumen: "Sustantivos masculinos débiles que añaden -(e)n en todos los casos excepto nominativo.",
    explicacion: `
      <h3 class="text-lg font-bold text-green-400 mb-2">N-Deklination (Declinación débil)</h3>
      <p class="mb-2">La <strong>N-Deklination</strong> afecta a ciertos sustantivos <strong>masculinos</strong> que añaden <strong>-n</strong> o <strong>-en</strong> en todos los casos excepto nominativo singular.</p>
      <h4 class="font-bold text-green-300 mt-2 mb-1">¿Qué sustantivos la siguen?</h4>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li>Personas/animales terminados en <strong>-e</strong>: der Junge, der Kunde, der Löwe, der Affe</li>
        <li>Nacionalidades en <strong>-e</strong>: der Russe, der Franzose, der Grieche</li>
        <li>Profesiones en <strong>-ist, -ent, -ant</strong>: der Polizist, der Student, der Praktikant</li>
        <li>Otros: der Herr, der Mensch, der Nachbar, der Held, der Bär, der Prinz</li>
      </ul>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-green-900/50"><th class="border p-1">Caso</th><th class="border p-1">Ejemplo: der Student</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">Nominativ</td><td class="border p-1">der Student</td></tr>
        <tr><td class="border p-1">Akkusativ</td><td class="border p-1">den Student<strong>en</strong></td></tr>
        <tr><td class="border p-1">Dativ</td><td class="border p-1">dem Student<strong>en</strong></td></tr>
        <tr><td class="border p-1">Genitiv</td><td class="border p-1">des Student<strong>en</strong></td></tr>
        </tbody>
      </table>
    `,
    ejemplos: [
      "Ich sehe den Studenten. (Veo al estudiante)",
      "Wir helfen dem Kunden. (Ayudamos al cliente)",
      "Das ist das Buch des Herrn Müller. (Ese es el libro del Sr. Müller)",
      "Sie spricht mit dem Franzosen. (Ella habla con el francés)",
      "Der Löwe ist stärker als der Bär — aber: Ich füttere den Löwen."
    ],
    tips: [
      "Casi todos son masculinos y se refieren a personas o animales.",
      "Excepción: 'das Herz' (neutro) también sigue N-Deklination en singular.",
      "El plural siempre añade -(e)n, así que es fácil: Student → Studenten (pl.)"
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich kenne ___ Studenten.", respuesta: "den", opciones: null, traduccion: "Conozco al estudiante.", pista: "Akkusativ masculino", explicacion: "den + Student + en = Akkusativ con N-Deklination." },
        { tipo: "opcion", frase: "Das Auto ___ Herrn Müller ist neu.", respuesta: "des", opciones: ["des", "dem", "den", "der"], traduccion: "El coche del Sr. Müller es nuevo.", pista: null, explicacion: "des Herrn = Genitiv singular (Herr → Herrn)." },
        { tipo: "hueco", frase: "Wir danken ___ Kunden.", respuesta: "dem", opciones: null, traduccion: "Agradecemos al cliente.", pista: "Dativ masculino", explicacion: "dem + Kunde + n = Dativ." },
        { tipo: "opcion", frase: "Sie geht mit ___ Jungen spazieren.", respuesta: "dem", opciones: ["dem", "den", "der", "des"], traduccion: "Ella pasea con el niño.", pista: null, explicacion: "mit + Dativ → dem Jungen." },
        { tipo: "hueco", frase: "Ich sehe ___ Löwen im Zoo.", respuesta: "den", opciones: null, traduccion: "Veo al león en el zoológico.", pista: "Akkusativ", explicacion: "den Löwen = Akkusativ (Löwe → Löwen)." },
        { tipo: "opcion", frase: "Er spricht mit ___ Franzosen.", respuesta: "dem", opciones: ["dem", "den", "der", "das"], traduccion: "Él habla con el francés.", pista: null, explicacion: "mit + Dativ → dem Franzosen." },
        { tipo: "hueco", frase: "Die Tasche ___ Polizisten ist schwer.", respuesta: "des", opciones: null, traduccion: "La bolsa del policía es pesada.", pista: "Genitiv masculino", explicacion: "des Polizisten = Genitiv (Polizist → Polizisten)." },
        { tipo: "opcion", frase: "Ich helfe ___ Nachbarn beim Umzug.", respuesta: "dem", opciones: ["dem", "den", "der", "das"], traduccion: "Ayudo al vecino con la mudanza.", pista: null, explicacion: "helfen + Dativ → dem Nachbarn." },
        { tipo: "hueco", frase: "Sie besucht ___ Prinzen im Schloss.", respuesta: "den", opciones: null, traduccion: "Ella visita al príncipe en el castillo.", pista: "Akkusativ", explicacion: "den Prinzen = Akkusativ (Prinz → Prinzen)." },
        { tipo: "opcion", frase: "Die Antwort ___ Kunden war freundlich.", respuesta: "des", opciones: ["des", "dem", "den", "der"], traduccion: "La respuesta del cliente fue amable.", pista: null, explicacion: "des Kunden = Genitiv singular." },
        { tipo: "hueco", frase: "Er vertraut ___ Kollegen nicht.", respuesta: "dem", opciones: null, traduccion: "Él no confía en el colega.", pista: "Dativ con vertrauen", explicacion: "vertrauen + Dativ → dem Kollegen." },
        { tipo: "opcion", frase: "Die Geschichte ___ Helden ist bekannt.", respuesta: "des", opciones: ["des", "dem", "den", "die"], traduccion: "La historia del héroe es conocida.", pista: null, explicacion: "des Helden = Genitiv (Held → Helden)." }
      ]
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
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    resumen: "Estructuras correlativas: sowohl...als auch, entweder...oder, weder...noch, je...desto.",
    explicacion: `
      <h3 class="text-lg font-bold text-blue-400 mb-2">Conectores dobles (Doppelkonnektoren)</h3>
      <p class="mb-2">Los conectores dobles unen dos elementos de una oración con una relación específica.</p>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-blue-900/50"><th class="border p-1">Conector</th><th class="border p-1">Significado</th><th class="border p-1">Ejemplo</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">sowohl...als auch</td><td class="border p-1">tanto...como</td><td class="border p-1">Sowohl Anna als auch Peter kommen.</td></tr>
        <tr><td class="border p-1">entweder...oder</td><td class="border p-1">o...o</td><td class="border p-1">Entweder du rufst an oder du schreibst.</td></tr>
        <tr><td class="border p-1">weder...noch</td><td class="border p-1">ni...ni</td><td class="border p-1">Weder Maria noch Hans war da.</td></tr>
        <tr><td class="border p-1">je...desto/umso</td><td class="border p-1">cuanto más...más</td><td class="border p-1">Je mehr ich lerne, desto besser verstehe ich.</td></tr>
        </tbody>
      </table>
      <h4 class="font-bold text-blue-300 mt-2 mb-1">Reglas de posición verbal</h4>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li><strong>sowohl...als auch</strong>: verbo después de la estructura completa.</li>
        <li><strong>entweder...oder</strong>: cada oración tiene verbo en posición 2.</li>
        <li><strong>je...desto</strong>: primera parte verbo al final; segunda parte verbo al final.</li>
      </ul>
    `,
    ejemplos: [
      "Er spricht sowohl Deutsch als auch Französisch. (Habla tanto alemán como francés)",
      "Entweder wir gehen ins Kino oder wir bleiben zu Hause. (O vamos al cine o nos quedamos en casa)",
      "Ich mag weder Kaffee noch Tee. (No me gusta ni café ni té)",
      "Je mehr du übst, desto besser wirst du. (Cuanto más practiques, mejor serás)",
      "Sowohl mein Bruder als auch meine Schwester studieren Medizin."
    ],
    tips: [
      "Con 'weder...noch' el verbo va en afirmativo (no es necesario 'nicht').",
      "'Je...desto' siempre introduce comparación de proporcionalidad.",
      "En 'entweder...oder' ambas opciones tienen el mismo peso gramatical."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "opcion", frase: "___ Anna ___ Peter kommen zur Party.", respuesta: "Sowohl ... als auch", opciones: ["Sowohl ... als auch", "Entweder ... oder", "Weder ... noch", "Je ... desto"], traduccion: "Tanto Anna como Peter vienen a la fiesta.", pista: null, explicacion: "sowohl...als auch = tanto...como." },
        { tipo: "hueco", frase: "___ gehst du ___ bleibst du?", respuesta: "Entweder ... oder", opciones: null, traduccion: "O te vas o te quedas?", pista: "conector de alternativa", explicacion: "entweder...oder = o...o." },
        { tipo: "opcion", frase: "Ich habe ___ Zeit ___ Geld.", respuesta: "weder ... noch", opciones: ["sowohl ... als auch", "entweder ... oder", "weder ... noch", "je ... desto"], traduccion: "No tengo ni tiempo ni dinero.", pista: null, explicacion: "weder...noch = ni...ni." },
        { tipo: "hueco", frase: "___ mehr man reist, ___ mehr lernt man.", respuesta: "Je ... desto", opciones: null, traduccion: "Cuanto más se viaja, más se aprende.", pista: "relación proporcional", explicacion: "je...desto = cuanto más...más." },
        { tipo: "opcion", frase: "Er kann ___ singen ___ tanzen.", respuesta: "sowohl ... als auch", opciones: ["sowohl ... als auch", "entweder ... oder", "weder ... noch", "je ... desto"], traduccion: "Él sabe tanto cantar como bailar.", pista: null, explicacion: "sowohl...als auch une dos habilidades." },
        { tipo: "hueco", frase: "___ du kommst ___ ich gehe.", respuesta: "Entweder ... oder", opciones: null, traduccion: "O vienes tú o me voy yo.", pista: "alternativa exclusiva", explicacion: "entweder...oder presenta dos opciones." },
        { tipo: "opcion", frase: "___ Regen ___ Schnee hält uns auf.", respuesta: "Weder ... noch", opciones: ["Sowohl ... als auch", "Entweder ... oder", "Weder ... noch", "Je ... desto"], traduccion: "Ni la lluvia ni la nieve nos detiene.", pista: null, explicacion: "weder...noch = negación de ambos." },
        { tipo: "hueco", frase: "___ älter ich werde, ___ weiser bin ich.", respuesta: "Je ... desto", opciones: null, traduccion: "Cuanto mayor me hago, más sabio soy.", pista: "proporcionalidad", explicacion: "je...desto para cambios progresivos." },
        { tipo: "opcion", frase: "Ich trinke ___ Bier ___ Wein, nur Wasser.", respuesta: "weder ... noch", opciones: ["sowohl ... als auch", "entweder ... oder", "weder ... noch", "je ... desto"], traduccion: "No bebo ni cerveza ni vino, solo agua.", pista: null, explicacion: "weder...noch niega ambas bebidas." },
        { tipo: "hueco", frase: "___ ich ___ du hast recht.", respuesta: "Weder ... noch", opciones: null, traduccion: "Ni tú ni yo tenemos razón.", pista: "negación doble", explicacion: "weder...noch con sujetos diferentes." },
        { tipo: "opcion", frase: "___ kalt ___ warm ist mir angenehm.", respuesta: "Weder ... noch", opciones: ["Sowohl ... als auch", "Entweder ... oder", "Weder ... noch", "Je ... desto"], traduccion: "Ni frío ni calor me resulta agradable.", pista: null, explicacion: "weder...noch para dos extremos." },
        { tipo: "hueco", frase: "___ schneller du fährst, ___ gefährlicher wird es.", respuesta: "Je ... desto", opciones: null, traduccion: "Cuanto más rápido conduces, más peligroso se vuelve.", pista: "relación causal proporcional", explicacion: "je...desto expresa consecuencia proporcional." }
      ]
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
    colorBorde: "border-red-500",
    bg: "bg-red-950/30",
    resumen: "Uso del Konjunktiv I para reportar lo que alguien dijo sin comprometerse con la verdad.",
    explicacion: `
      <h3 class="text-lg font-bold text-red-400 mb-2">Estilo indirecto (Konjunktiv I)</h3>
      <p class="mb-2">El <strong>Konjunktiv I</strong> es el modo del discurso indirecto en alemán. Se usa para reportar palabras, pensamientos o rumores de otros, manteniendo distancia sobre la veracidad.</p>
      <h4 class="font-bold text-red-300 mt-2 mb-1">Formación</h4>
      <p class="mb-1">Raíz del verbo + terminaciones: -e, -est, -e, -en, -et, -en</p>
      <p class="mb-2">Ejemplo: <em>sagen → er sage</em> (él dice/diría/aparentemente dice)</p>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-red-900/50"><th class="border p-1">Persona</th><th class="border p-1">sagen</th><th class="border p-1">haben</th><th class="border p-1">sein</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">er/sie/es</td><td class="border p-1">sage</td><td class="border p-1">habe</td><td class="border p-1">sei</td></tr>
        <tr><td class="border p-1">sie (pl.)</td><td class="border p-1">sagen</td><td class="border p-1">haben</td><td class="border p-1">seien</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ Cuando K.I = Indikativ, se usa K.II como sustituto (würde + Infinitiv).</p>
    `,
    ejemplos: [
      "Er sagt, er habe keine Zeit. (Él dice que no tiene tiempo)",
      "Sie behauptet, sie sei krank. (Ella afirma que está enferma)",
      "Die Zeitung schreibt, der Minister trete zurück. (El periódico escribe que el ministro dimite)",
      "Er fragte, ob ich morgen kommen könne. (Preguntó si podía venir mañana)",
      "Man munkelt, sie hätten sich getrennt. (Se rumorea que se han separado)"
    ],
    tips: [
      "Konjunktiv I es el modo periodístico por excelencia en alemán.",
      "Si K.I = Indikativ, usa K.II como sustituto (würde + Infinitiv o forma K.II).",
      "Los verbos modales en K.I: könne, müsse, dürfe, wolle, solle, möge."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "opcion", frase: "Er sagt, er ___ keine Zeit.", respuesta: "habe", opciones: ["habe", "hat", "hätte", "haben"], traduccion: "Él dice que no tiene tiempo.", pista: null, explicacion: "habe = Konjunktiv I de haben (3ª persona)." },
        { tipo: "hueco", frase: "Sie meint, sie ___ müde.", respuesta: "sei", opciones: null, traduccion: "Ella opina que está cansada.", pista: "K.I de sein", explicacion: "sei = Konjunktiv I de sein (3ª persona)." },
        { tipo: "opcion", frase: "Er fragt, ob ich kommen ___.", respuesta: "könne", opciones: ["könne", "kann", "konnte", "könnte"], traduccion: "Pregunta si puedo venir.", pista: null, explicacion: "könne = K.I de können (3ª persona)." },
        { tipo: "hueco", frase: "Die Zeitung schreibt, der Minister ___ zurück.", respuesta: "trete", opciones: null, traduccion: "El periódico escribe que el ministro dimite.", pista: "K.I de treten", explicacion: "trete = Konjunktiv I de treten (retirarse/dimitir)." },
        { tipo: "opcion", frase: "Man sagt, sie ___ verheiratet.", respuesta: "sei", opciones: ["sei", "ist", "wäre", "seid"], traduccion: "Se dice que ella está casada.", pista: null, explicacion: "sei = K.I de sein (rumor)." },
        { tipo: "hueco", frase: "Er behauptet, er ___ Geld.", respuesta: "habe", opciones: null, traduccion: "Él afirma que tiene dinero.", pista: "K.I de haben", explicacion: "habe = K.I, usado en afirmaciones no verificadas." },
        { tipo: "opcion", frase: "Sie sagt, sie ___ morgen kommen.", respuesta: "wolle", opciones: ["wolle", "will", "wollte", "würde"], traduccion: "Ella dice que quiere venir mañana.", pista: null, explicacion: "wolle = K.I de wollen." },
        { tipo: "hueco", frase: "Der Professor sagt, die Prüfung ___ schwer.", respuesta: "sei", opciones: null, traduccion: "El profesor dice que el examen es difícil.", pista: "K.I de sein", explicacion: "sei = estilo indirecto para 'ist'." },
        { tipo: "opcion", frase: "Man munkelt, sie ___ sich getrennt.", respuesta: "hätten", opciones: ["hätten", "haben", "hatten", "habe"], traduccion: "Se rumorea que se han separado.", pista: null, explicacion: "hätten = K.I de haben en plural (pasado)." },
        { tipo: "hueco", frase: "Er fragt, ob wir ihm ___ können.", respuesta: "helfen", opciones: null, traduccion: "Pregunta si podemos ayudarle.", pista: "Infinitivo con können", explicacion: "können + Infinitiv = estructura modal." },
        { tipo: "opcion", frase: "Sie schreibt, sie ___ unterwegs.", respuesta: "sei", opciones: ["sei", "ist", "war", "wäre"], traduccion: "Ella escribe que está de viaje.", pista: null, explicacion: "sei = K.I para reportar por escrito." },
        { tipo: "hueco", frase: "Er sagt, er ___ alles verstanden.", respuesta: "habe", opciones: null, traduccion: "Él dice que lo ha entendido todo.", pista: "K.I Perfekt", explicacion: "habe + Partizip II = Perfekt en K.I." }
      ]
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
    colorBorde: "border-yellow-500",
    bg: "bg-yellow-950/30",
    resumen: "Preposiciones que rigen genitivo: wegen, trotz, während, statt, innerhalb, außerhalb, etc.",
    explicacion: `
      <h3 class="text-lg font-bold text-yellow-400 mb-2">Preposiciones con Genitivo avanzadas</h3>
      <p class="mb-2">Además de las preposiciones básicas, existen varias que rigen genitivo y se usan en contextos formales y académicos.</p>
      <table class="w-full border-collapse mb-3 text-sm">
        <thead><tr class="bg-yellow-900/50"><th class="border p-1">Preposición</th><th class="border p-1">Significado</th></tr></thead>
        <tbody>
        <tr><td class="border p-1">wegen (+ G)</td><td class="border p-1">a causa de</td></tr>
        <tr><td class="border p-1">trotz (+ G)</td><td class="border p-1">a pesar de</td></tr>
        <tr><td class="border p-1">während (+ G)</td><td class="border p-1">durante</td></tr>
        <tr><td class="border p-1">statt / anstatt (+ G)</td><td class="border p-1">en lugar de</td></tr>
        <tr><td class="border p-1">innerhalb (+ G)</td><td class="border p-1">dentro de</td></tr>
        <tr><td class="border p-1">außerhalb (+ G)</td><td class="border p-1">fuera de</td></tr>
        <tr><td class="border p-1">unweit (+ G)</td><td class="border p-1">no lejos de</td></tr>
        </tbody>
      </table>
      <p class="text-yellow-300 text-xs">⚠️ En alemán coloquial, <strong>wegen</strong> y <strong>trotz</strong> se usan a menudo con Dativ. En escritura formal, siempre Genitiv.</p>
    `,
    ejemplos: [
      "Wegen des Regens bleibt die Schule geschlossen. (Debido a la lluvia, la escuela permanece cerrada)",
      "Trotz des schlechten Wetters gingen wir spazieren. (A pesar del mal tiempo, salimos a pasear)",
      "Während des Films muss es leise sein. (Durante la película debe haber silencio)",
      "Statt des Buches kaufte er eine Zeitschrift. (En lugar del libro, compró una revista)",
      "Innerhalb einer Woche muss die Arbeit fertig sein. (Dentro de una semana el trabajo debe estar listo)"
    ],
    tips: [
      "En coloquial: 'wegen dem Regen' (Dativ) es aceptable; en examen usa Genitiv.",
      "'Während' también puede ser conjunción (während ich schlief).",
      "Para recordar: las preposiciones cultas suelen regir Genitiv."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "___ des Regens bleibe ich zu Hause.", respuesta: "Wegen", opciones: null, traduccion: "Debido a la lluvia me quedo en casa.", pista: "preposición causal", explicacion: "wegen + Genitiv = a causa de." },
        { tipo: "opcion", frase: "___ der Ferien haben wir frei.", respuesta: "Während", opciones: ["Wegen", "Während", "Trotz", "Statt"], traduccion: "Durante las vacaciones tenemos libre.", pista: null, explicacion: "während + Genitiv = durante." },
        { tipo: "hueco", frase: "___ des Lärms konnte ich nicht schlafen.", respuesta: "Trotz", opciones: null, traduccion: "A pesar del ruido no podía dormir.", pista: "preposición concesiva", explicacion: "trotz + Genitiv = a pesar de." },
        { tipo: "opcion", frase: "___ der Stadt gibt es einen großen Park.", respuesta: "Innerhalb", opciones: ["Wegen", "Während", "Innerhalb", "Außerhalb"], traduccion: "Dentro de la ciudad hay un gran parque.", pista: null, explicacion: "innerhalb + Genitiv = dentro de." },
        { tipo: "hueco", frase: "___ des Geldes kauft er ein neues Auto.", respuesta: "Wegen", opciones: null, traduccion: "Gracias al dinero compra un coche nuevo.", pista: "causa positiva", explicacion: "wegen + Genitiv (des Geldes)." },
        { tipo: "opcion", frase: "___ des Buches las er die Zeitung.", respuesta: "Statt", opciones: ["Wegen", "Während", "Statt", "Trotz"], traduccion: "En lugar del libro, leyó el periódico.", pista: null, explicacion: "statt + Genitiv = en lugar de." },
        { tipo: "hueco", frase: "___ der Schule gibt es einen Sportplatz.", respuesta: "Außerhalb", opciones: null, traduccion: "Fuera de la escuela hay un campo de deportes.", pista: "preposición locativa", explicacion: "außerhalb + Genitiv = fuera de." },
        { tipo: "opcion", frase: "___ des Termins müssen wir warten.", respuesta: "Wegen", opciones: ["Wegen", "Während", "Trotz", "Statt"], traduccion: "Debido a la cita tenemos que esperar.", pista: null, explicacion: "wegen = causa/razón." },
        { tipo: "hueco", frase: "___ der Prüfung lernt sie viel.", respuesta: "Wegen", opciones: null, traduccion: "A causa del examen ella estudia mucho.", pista: "causa/examen", explicacion: "wegen der Prüfung = motivo del estudio." },
        { tipo: "opcion", frase: "___ der Kälte tragen wir warme Jacken.", respuesta: "Wegen", opciones: ["Wegen", "Während", "Trotz", "Innerhalb"], traduccion: "Debido al frío llevamos chaquetas cálidas.", pista: null, explicacion: "wegen + Genitiv = causa (der Kälte)." },
        { tipo: "hueco", frase: "___ des Parks ist ein Fluss.", respuesta: "Unweit", opciones: null, traduccion: "No lejos del parque hay un río.", pista: "preposición de distancia", explicacion: "unweit + Genitiv = no lejos de." },
        { tipo: "opcion", frase: "___ des Vertrages unterschrieb er.", respuesta: "Statt", opciones: ["Wegen", "Während", "Statt", "Trotz"], traduccion: "En lugar del contrato, él firmó.", pista: null, explicacion: "statt + Genitiv indica sustitución." }
      ]
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
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    resumen: "Uso del infinitivo con 'zu' como complemento de verbos, adjetivos y sustantivos.",
    explicacion: `
      <h3 class="text-lg font-bold text-cyan-400 mb-2">Infinitivo con zu</h3>
      <p class="mb-2">El <strong>infinitivo con 'zu'</strong> es equivalente al infinitivo español (hablar, comer, vivir) pero siempre precedido de <strong>zu</strong>.</p>
      <h4 class="font-bold text-cyan-300 mt-2 mb-1">Estructura</h4>
      <p class="mb-1">Infinitivo + zu → zu + Infinitiv al final de la oración.</p>
      <p class="mb-2"><strong>Ejemplo:</strong> Ich versuche, gut Deutsch <em>zu lernen</em>. (Intento aprender bien alemán).</p>
      <h4 class="font-bold text-cyan-300 mt-2 mb-1">Verbos que requieren 'zu' + Infinitiv</h4>
      <ul class="list-disc pl-5 mb-2 text-sm">
        <li><strong>versuchen</strong> (intentar), <strong>hoffen</strong> (esperar), <strong>planen</strong> (planear)</li>
        <li><strong>beginnen</strong> (empezar), <strong>aufhören</strong> (parar de), <strong>vergessen</strong> (olvidar)</li>
        <li><strong>empfehlen</strong> (recomendar), <strong>erlauben</strong> (permitir), <strong>verbieten</strong> (prohibir)</li>
        <li><strong>scheinen</strong> (parecer), <strong>pflegen</strong> (soler), <strong>brauchen</strong> (necesitar)</li>
      </ul>
      <p class="text-yellow-300 text-xs">⚠️ Con verbos separables: <em>anrufen → anzurufen</em> (zu entre prefijo y raíz).</p>
    `,
    ejemplos: [
      "Ich versuche, jeden Tag Deutsch zu lernen. (Intento aprender alemán cada día)",
      "Er hofft, im Sommer nach Berlin zu fahren. (Espera ir a Berlín en verano)",
      "Sie hat vergessen, das Fenster zu schließen. (Ella olvidó cerrar la ventana)",
      "Es ist wichtig, pünktlich zu sein. (Es importante ser puntual)",
      "Er scheint alles zu verstehen. (Él parece entenderlo todo)"
    ],
    tips: [
      "Cuando hay dos infinitivos, el 'zu' va antes del segundo: 'Ich hoffe, ihn morgen zu sehen.'",
      "Con verbos separables: 'einkaufen → einzukaufen', 'aufräumen → aufzuräumen'.",
      "NUNCA uses 'zu' con modales (können, müssen, dürfen...)."
    ],
    ejercicioBase: {
      tipo: "mixto",
      preguntas: [
        { tipo: "hueco", frase: "Ich versuche, das Buch ___ lesen.", respuesta: "zu", opciones: null, traduccion: "Intento leer el libro.", pista: "Infinitiv con zu", explicacion: "versuchen + zu + Infinitiv." },
        { tipo: "opcion", frase: "Er hofft, sie ___ treffen.", respuesta: "zu", opciones: ["zu", "—", "um zu", "an"], traduccion: "Él espera encontrarse con ella.", pista: null, explicacion: "hoffen + zu + Infinitiv." },
        { tipo: "hueco", frase: "Wir planen, morgen ___ fahren.", respuesta: "abzufahren", opciones: null, traduccion: "Planeamos salir mañana.", pista: "verbo separable + zu", explicacion: "abzufahren = ab + zu + fahren (separable)." },
        { tipo: "opcion", frase: "Es ist wichtig, genug ___ schlafen.", respuesta: "zu", opciones: ["zu", "—", "um zu", "zum"], traduccion: "Es importante dormir suficiente.", pista: null, explicacion: "Adjetivo + zu + Infinitiv." },
        { tipo: "hueco", frase: "Sie hat vergessen, das Fenster ___ schließen.", respuesta: "zu", opciones: null, traduccion: "Ella olvidó cerrar la ventana.", pista: "nach vergessen", explicacion: "vergessen + zu + Infinitiv." },
        { tipo: "opcion", frase: "Er scheint alles ___ verstehen.", respuesta: "zu", opciones: ["zu", "—", "um zu", "ver-"], traduccion: "Él parece entenderlo todo.", pista: null, explicacion: "scheinen + zu + Infinitiv." },
        { tipo: "hueco", frase: "Ich brauche nicht ___ kommen.", respuesta: "zu", opciones: null, traduccion: "No necesito venir.", pista: "brauchen + zu (negativo)", explicacion: "nicht brauchen + zu = no necesitar." },
        { tipo: "opcion", frase: "Hör endlich auf, mich ___ nerven!", respuesta: "zu", opciones: ["zu", "—", "um zu", "an"], traduccion: "¡Deja ya de molestarme!", pista: null, explicacion: "aufhören + zu + Infinitiv." },
        { tipo: "hueco", frase: "Es ist verboten, hier ___ rauchen.", respuesta: "zu", opciones: null, traduccion: "Está prohibido fumar aquí.", pista: "nach verboten", explicacion: "verboten + zu + Infinitiv." },
        { tipo: "opcion", frase: "Sie empfiehlt mir, das Buch ___ lesen.", respuesta: "zu", opciones: ["zu", "—", "um zu", "vor"], traduccion: "Ella me recomienda leer el libro.", pista: null, explicacion: "empfehlen + Dativ + zu + Infinitiv." },
        { tipo: "hueco", frase: "Er begann, Deutsch ___ lernen.", respuesta: "zu", opciones: null, traduccion: "Él empezó a aprender alemán.", pista: "nach beginnen", explicacion: "beginnen + zu + Infinitiv." },
        { tipo: "opcion", frase: "Es ist besser, früh ___ kommen.", respuesta: "zu", opciones: ["zu", "—", "um zu", "früh"], traduccion: "Es mejor venir temprano.", pista: null, explicacion: "besser + zu + Infinitiv (ES + adj + zu)." }
      ]
    }
  }
];