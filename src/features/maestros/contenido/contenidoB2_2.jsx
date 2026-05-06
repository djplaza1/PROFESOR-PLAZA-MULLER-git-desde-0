/* === CONTENIDO GRAMATICAL B2.2 === */
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};
window.Muller.Maestros.contenido = window.Muller.Maestros.contenido || {};
window.Muller.Maestros.contenido.B2_2 = [
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
      tipo: "huecos",
      enunciado: "Convierte al estilo indirecto usando Konjunktiv I",
      datos: {
        frases: [
          { texto: 'Er sagt: "Ich habe keine Zeit." → Er sagt, er ___ keine Zeit.', respuesta: "habe" },
          { texto: 'Sie meint: "Das ist richtig." → Sie meint, das ___ richtig.', respuesta: "sei" },
          { texto: 'Der Chef sagt: "Wir werden gewinnen." → Der Chef sagt, wir ___ gewinnen.', respuesta: "werden" },
          { texto: 'Er behauptet: "Ich bin krank." → Er behauptet, er ___ krank.', respuesta: "sei" }
        ]
      }
    }
  },
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
      tipo: "huecos",
      enunciado: "Reescribe usando la alternativa a pasiva indicada",
      datos: {
        frases: [
          { texto: "Das kann gemacht werden. (sich lassen) → Das ___ ___ machen.", respuesta: "lässt sich" },
          { texto: "Das kann man lesen. (-bar) → Das ist ___ .", respuesta: "lesbar" },
          { texto: "Das muss beachtet werden. (sein + zu) → Das ___ ___ beachten.", respuesta: "ist zu" },
          { texto: "Das kann man erklären. (sich lassen) → Das ___ sich ___ .", respuesta: "lässt erklären" }
        ]
      }
    }
  },
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
      tipo: "huecos",
      enunciado: "Completa con el conector adecuado (indem, sodass, statt dass, ohne dass)",
      datos: {
        frases: [
          { texto: "Man spart Zeit, ___ man das Auto nimmt.", respuesta: "indem" },
          { texto: "Er übte viel, ___ er perfekt wurde.", respuesta: "sodass" },
          { texto: "___ er arbeitet, schläft er.", respuesta: "Statt dass" },
          { texto: "Er ging, ___ er etwas sagte.", respuesta: "ohne dass" }
        ]
      }
    }
  },
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
      tipo: "huecos",
      enunciado: "Completa con el modismo adecuado",
      datos: {
        frases: [
          { texto: "Das ist doch ___! Das weiß doch jeder schon.", respuesta: "ein alter Hut" },
          { texto: "Bei dieser Erklärung verstehe ich nur ___.", respuesta: "Bahnhof" },
          { texto: "Ich ___ dir die ___ für die Prüfung.", respuesta: "drücke Daumen" },
          { texto: "Das Angebot ist nicht ___.", respuesta: "das Gelbe vom Ei" }
        ]
      }
    }
  },
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
      tipo: "huecos",
      enunciado: "Elige el conector adecuado",
      datos: {
        frases: [
          { texto: "Es war anstrengend, ___ haben wir es geschafft. (sin embargo)", respuesta: "allerdings" },
          { texto: "Es war kalt, ___ gingen wir schwimmen. (no obstante)", respuesta: "dennoch" },
          { texto: "Er spricht wenig, sie ___ sehr viel. (en cambio)", respuesta: "hingegen" },
          { texto: "___ bleiben wir zuversichtlich. (no obstante)", respuesta: "Nichtsdestotrotz" }
        ]
      }
    }
  },
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
      tipo: "huecos",
      enunciado: "Añade el prefijo adecuado al verbo base",
      datos: {
        frases: [
          { texto: "Ich ___ (antworten) deine Frage morgen.", respuesta: "beantworte" },
          { texto: "Er ___ (kaufen) sein Haus.", respuesta: "verkauft" },
          { texto: "Das Glas ___ (brechen) auf dem Boden.", respuesta: "zerbrach" },
          { texto: "Wir ___ (fernen) den Müll.", respuesta: "entfernen" }
        ]
      }
    }
  }
];