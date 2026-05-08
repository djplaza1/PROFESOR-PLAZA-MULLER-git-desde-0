const fs = require('fs');

// ==============================================================
// STEP 1: Build vocabulary pools
// ==============================================================

// Nouns from articulos.json (3,577 with level tags)
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));

// Parse noun: "der Abend" -> "Abend", article="der"
function parseNoun(deStr) {
  const parts = deStr.split(' ');
  const article = parts[0]; // der/die/das
  const word = parts.slice(1).join(' ');
  return { article, word };
}

// Build noun pool by level
const nounPools = { 'A1': [], 'A2': [], 'B1': [], 'B2': [], 'C1': [] };
articulos.forEach(item => {
  const lvl = item.level || 'B1';
  if (!nounPools[lvl]) nounPools[lvl] = [];
  const parsed = parseNoun(item.de);
  nounPools[lvl].push([parsed.word, item.es, parsed.article, '', 'n']);
});

// Adjective pools
const adjPools = {
  'A1': [
    ['freundlich','amable','','','adj'], ['fleißig','trabajador','','','adj'],
    ['faul','perezoso','','','adj'], ['ehrlich','honesto','','','adj'],
    ['mutig','valiente','','','adj'], ['höflich','cortés','','','adj'],
    ['sauber','limpio','','','adj'], ['rund','redondo','','','adj'],
    ['nass','mojado','','','adj'], ['trocken','seco','','','adj'],
    ['dick','gordo','','','adj'], ['dünn','delgado','','','adj'],
    ['breit','ancho','','','adj'], ['flach','plano','','','adj'],
    ['nett','agradable','','','adj'], ['böse','malvado','','','adj'],
    ['stolz','orgulloso','','','adj'], ['traurig','triste','','','adj'],
    ['ruhig','tranquilo','','','adj'], ['wach','despierto','','','adj'],
    ['gesund','saludable','','','adj'], ['krank','enfermo','','','adj'],
    ['reich','rico','','','adj'], ['arm','pobre','','','adj'],
    ['billig','barato','','','adj'], ['gefährlich','peligroso','','','adj'],
    ['weise','sabio','','','adj'], ['klug','inteligente','','','adj'],
    ['dumm','tonto','','','adj'], ['lieb','querido','','','adj'],
    ['froh','alegre','','','adj'], ['tapfer','valiente','','','adj'],
    ['edel','noble','','','adj'], ['bescheiden','modesto','','','adj'],
    ['zart','tierno','','','adj'], ['fein','fino','','','adj'],
    ['grob','grueso','','','adj'], ['locker','suelto','','','adj'],
    ['klar','claro','','','adj'], ['leise','silencioso','','','adj'],
    ['laut','ruidoso','','','adj'], ['sanft','suave','','','adj'],
    ['heftig','violento','','','adj'], ['zäh','durable','','','adj'],
    ['kühn','audaz','','','adj'], ['treu','fiel','','','adj'],
    ['munter','alegre','','','adj'], ['schwer','pesado','','','adj'],
    ['teuer','caro','','','adj'], ['berühmt','famoso','','','adj'],
    ['eigen','propio','','','adj'], ['seltsam','extraño','','','adj'],
    ['schrecklich','terrible','','','adj'], ['köstlich','delicioso','','','adj'],
    ['nützlich','útil','','','adj'], ['bekannt','conocido','','','adj'],
    ['angenehm','agradable','','','adj'], ['künstlich','artificial','','','adj'],
  ],
  'A2': [
    ['taub','sordo','','','adj'], ['blind','ciego','','','adj'],
    ['entschlossen','decidido','','','adj'], ['grausam','cruel','','','adj'],
    ['echt','auténtico','','','adj'], ['kühn','audaz','','','adj'],
    ['bescheiden','modesto','','','adj'], ['fleißig','trabajador','','','adj'],
    ['tapfer','valiente','','','adj'], ['sorgfältig','cuidadoso','','','adj'],
    ['vorsichtig','cauteloso','','','adj'], ['neugierig','curioso','','','adj'],
    ['zärtlich','cariñoso','','','adj'], ['großzügig','generoso','','','adj'],
    ['eifersüchtig','celoso','','','adj'], ['schüchtern','tímido','','','adj'],
    ['lebhaft','vivaz','','','adj'], ['lustig','divertido','','','adj'],
    ['langweilig','aburrido','','','adj'], ['ernst','serio','','','adj'],
    ['streng','estricto','','','adj'], ['gering','escaso','','','adj'],
    ['betrunken','borracho','','','adj'], ['nüchtern','sobrio','','','adj'],
    ['höflich','cortés','','','adj'], ['unhöflich','descortés','','','adj'],
    ['höflich','cortés','','','adj'], ['unhöflich','descortés','','','adj'],
    ['glücklich','feliz','','','adj'], ['unglücklich','infeliz','','','adj'],
    ['freundlich','amable','','','adj'], ['unfreundlich','antipático','','','adj'],
    ['geduldig','paciente','','','adj'], ['ungeduldig','impaciente','','','adj'],
    ['ordentlich','ordenado','','','adj'], ['ungeordnet','desordenado','','','adj'],
    ['gewiss','cierto','','','adj'], ['sicher','seguro','','','adj'],
    ['tüchtig','competente','','','adj'], ['geschickt','hábil','','','adj'],
    ['selbstständig','independiente','','','adj'], ['abhängig','dependiente','','','adj'],
    ['beliebt','popular','','','adj'], ['verhasst','odiado','','','adj'],
    ['wichtig','importante','','','adj'], ['unwichtig','sin importancia','','','adj'],
    ['angesehen','respetado','','','adj'], ['berühmt','famoso','','','adj'],
    ['gefährlich','peligroso','','','adj'], ['ungefährlich','inofensivo','','','adj'],
    ['natürlich','natural','','','adj'], ['künstlich','artificial','','','adj'],
    ['glatt','liso','','','adj'], ['rau','áspero','','','adj'],
    ['dicht','denso','','','adj'], ['starr','rígido','','','adj'],
    ['biegsam','flexible','','','adj'], ['trüb','turbio','','','adj'],
    ['weich','suave','','','adj'], ['hart','duro','','','adj'],
  ],
  'B1': [
    ['zusammenhängend','coherente','','','adj'], ['umfassend','extenso','','','adj'],
    ['ausführlich','detallado','','','adj'], ['oberflächlich','superficial','','','adj'],
    ['wesentlich','esencial','','','adj'], ['nebensächlich','secundario','','','adj'],
    ['gründlich','minucioso','','','adj'], ['flüchtig','superficial','','','adj'],
    ['angemessen','adecuado','','','adj'], ['unangemessen','inadecuado','','','adj'],
    ['verständlich','comprensible','','','adj'], ['unverständlich','incomprensible','','','adj'],
    ['erträglich','tolerable','','','adj'], ['unerträglich','intolerable','','','adj'],
    ['passend','apropiado','','','adj'], ['unpassend','inapropiado','','','adj'],
    ['wahrscheinlich','probable','','','adj'], ['unwahrscheinlich','improbable','','','adj'],
    ['möglich','posible','','','adj'], ['unmöglich','imposible','','','adj'],
    ['regelmäßig','regular','','','adj'], ['unregelmäßig','irregular','','','adj'],
    ['gültig','válido','','','adj'], ['ungültig','inválido','','','adj'],
    ['bewusst','consciente','','','adj'], ['unbewusst','inconsciente','','','adj'],
    ['zufrieden','satisfecho','','','adj'], ['unzufrieden','insatisfecho','','','adj'],
    ['abhängig','dependiente','','','adj'], ['unabhängig','independiente','','','adj'],
    ['vollständig','completo','','','adj'], ['unvollständig','incompleto','','','adj'],
    ['erlaubt','permitido','','','adj'], ['verboten','prohibido','','','adj'],
    ['bekannt','conocido','','','adj'], ['unbekannt','desconocido','','','adj'],
    ['geeignet','adecuado','','','adj'], ['ungeeignet','inadecuado','','','adj'],
    ['vorbereitet','preparado','','','adj'], ['unvorbereitet','desprevenido','','','adj'],
    ['erwartet','esperado','','','adj'], ['unerwartet','inesperado','','','adj'],
    ['beschäftigt','ocupado','','','adj'], ['arbeitslos','desempleado','','','adj'],
    ['ehrgeizig','ambicioso','','','adj'], ['erfolgreich','exitoso','','','adj'],
    ['erfahren','experimentado','','','adj'], ['unerfahren','inexperto','','','adj'],
    ['sympathisch','simpático','','','adj'], ['unsympathisch','antipático','','','adj'],
    ['überzeugt','convencido','','','adj'], ['zweifelhaft','dudoso','','','adj'],
    ['auffällig','llamativo','','','adj'], ['unauffällig','discreto','','','adj'],
    ['glaublich','creíble','','','adj'], ['unglaublich','increíble','','','adj'],
    ['jährlich','anual','','','adj'], ['monatlich','mensual','','','adj'],
    ['wöchentlich','semanal','','','adj'], ['täglich','diario','','','adj'],
    ['örtlich','local','','','adj'], ['überörtlich','supra-local','','','adj'],
    ['geistig','mental','','','adj'], ['körperlich','físico','','','adj'],
    ['seelisch','psíquico','','','adj'], ['materiell','material','','','adj'],
    ['wissenschaftlich','científico','','','adj'], ['technisch','técnico','','','adj'],
    ['wirtschaftlich','económico','','','adj'], ['politisch','político','','','adj'],
    ['rechtlich','legal','','','adj'], ['gesetzlich','legal','','','adj'],
    ['finanziell','financiero','','','adj'], ['steuerlich','fiscal','','','adj'],
    ['praktisch','práctico','','','adj'], ['theoretisch','teórico','','','adj'],
    ['echt','auténtico','','','adj'], ['falsch','falso','','','adj'],
    ['konkret','concreto','','','adj'], ['abstrakt','abstracto','','','adj'],
    ['absolut','absoluto','','','adj'], ['relativ','relativo','','','adj'],
    ['optimal','óptimo','','','adj'], ['maximal','máximo','','','adj'],
    ['typisch','típico','','','adj'], ['exotisch','exótico','','','adj'],
  ],
  'B2': [
    ['vorausgesetzt','supuesto','','','adj'], ['nachvollziehbar','comprensible','','','adj'],
    ['unvorstellbar','inimaginable','','','adj'], ['unabdingbar','indispensable','','','adj'],
    ['unumgänglich','inevitable','','','adj'], ['unvermeidlich','inevitable','','','adj'],
    ['unbestritten','indiscutible','','','adj'], ['unwiderruflich','irrevocable','','','adj'],
    ['unwiderstehlich','irresistible','','','adj'], ['unerschöpflich','inagotable','','','adj'],
    ['unübertroffen','insuperable','','','adj'], ['unvergleichlich','incomparable','','','adj'],
    ['unbeschreiblich','indescriptible','','','adj'], ['unvergesslich','inolvidable','','','adj'],
    ['unermüdlich','incansable','','','adj'], ['unerschrocken','intrépido','','','adj'],
    ['vorläufig','provisional','','','adj'], ['endgültig','definitivo','','','adj'],
    ['austauschbar','intercambiable','','','adj'], ['ersetzbar','reemplazable','','','adj'],
    ['maßgeblich','decisivo','','','adj'], ['ausschlaggebend','determinante','','','adj'],
    ['entscheidend','crucial','','','adj'], ['wesentlich','esencial','','','adj'],
    ['bedeutend','significativo','','','adj'], ['bedeutungslos','insignificante','','','adj'],
    ['maßvoll','moderado','','','adj'], ['maßlos','desmedido','','','adj'],
    ['grenzenlos','ilimitado','','','adj'], ['beschränkt','limitado','','','adj'],
    ['zeitgenössisch','contemporáneo','','','adj'], ['gleichzeitig','simultáneo','','','adj'],
    ['übermäßig','excesivo','','','adj'], ['angemessen','adecuado','','','adj'],
    ['verhältnismäßig','proporcional','','','adj'], ['unverhältnismäßig','desproporcionado','','','adj'],
    ['zuverlässig','fiable','','','adj'], ['unzuverlässig','poco fiable','','','adj'],
    ['verantwortlich','responsable','','','adj'], ['verantwortungslos','irresponsable','','','adj'],
    ['rücksichtsvoll','considerado','','','adj'], ['rücksichtslos','desconsiderado','','','adj'],
    ['schonend','cuidadoso','','','adj'], ['schädlich','dañino','','','adj'],
    ['förderlich','beneficioso','','','adj'], ['hinderlich','obstaculizador','','','adj'],
    ['durchführbar','factible','','','adj'], ['undurchführbar','inviable','','','adj'],
    ['erreichbar','alcanzable','','','adj'], ['unerreichbar','inalcanzable','','','adj'],
    ['vermeidbar','evitable','','','adj'], ['unvermeidbar','inevitable','','','adj'],
    ['überschaubar','manejable','','','adj'], ['unüberschaubar','inmanejable','','','adj'],
    ['vorhersehbar','predecible','','','adj'], ['unvorhersehbar','impredecible','','','adj'],
    ['ausgezeichnet','excelente','','','adj'], ['mangelhaft','deficiente','','','adj'],
    ['überlegen','superior','','','adj'], ['unterlegen','inferior','','','adj'],
    ['gleichwertig','equivalente','','','adj'], ['gleichgültig','indiferente','','','adj'],
  ],
  'C1': [
    ['abstrakt','abstracto','','','adj'], ['anspruchsvoll','exigente','','','adj'],
    ['aufschlussreich','revelador','','','adj'], ['authentisch','auténtico','','','adj'],
    ['bahnbrechend','pionero','','','adj'], ['bemerkenswert','notable','','','adj'],
    ['charakteristisch','característico','','','adj'], ['differenziert','diferenciado','','','adj'],
    ['eindrucksvoll','impresionante','','','adj'], ['einschneidend','drástico','','','adj'],
    ['einzigartig','único','','','adj'], ['empfindlich','sensible','','','adj'],
    ['entscheidend','decisivo','','','adj'], ['erheblich','considerable','','','adj'],
    ['existenzial','existencial','','','adj'], ['fachkundig','experto','','','adj'],
    ['fachspezifisch','especializado','','','adj'], ['folgenschwer','grave','','','adj'],
    ['fragwürdig','cuestionable','','','adj'], ['fundamental','fundamental','','','adj'],
    ['gegensätzlich','opuesto','','','adj'], ['geistesgegenwärtig','presente de espíritu','','','adj'],
    ['grundlegend','básico','','','adj'], ['grundsätzlich','fundamental','','','adj'],
    ['hervorragend','sobresaliente','','','adj'], ['hintergründig','profundo','','','adj'],
    ['inakzeptabel','inaceptable','','','adj'], ['individuell','individual','','','adj'],
    ['inhaltlich','de contenido','','','adj'], ['innovativ','innovador','','','adj'],
    ['instinktiv','instintivo','','','adj'], ['integral','integral','','','adj'],
    ['intelligent','inteligente','','','adj'], ['intensiv','intensivo','','','adj'],
    ['interdisziplinär','interdisciplinario','','','adj'], ['kognitiv','cognitivo','','','adj'],
    ['kommerziell','comercial','','','adj'], ['kompetent','competente','','','adj'],
    ['komplex','complejo','','','adj'], ['konkurrierend','competidor','','','adj'],
    ['konsequent','consecuente','','','adj'], ['konsistent','coherente','','','adj'],
    ['konzentriert','concentrado','','','adj'], ['kreativ','creativo','','','adj'],
    ['kritisch','crítico','','','adj'], ['kulturell','cultural','','','adj'],
    ['langjährig','de años','','','adj'], ['lebendig','vivo','','','adj'],
    ['legitim','legítimo','','','adj'], ['logisch','lógico','','','adj'],
    ['medial','mediático','','','adj'], ['methodisch','metódico','','','adj'],
    ['nachdenklich','reflexivo','','','adj'], ['nachhaltig','sostenible','','','adj'],
    ['notwendig','necesario','','','adj'], ['objektiv','objetivo','','','adj'],
    ['pädagogisch','pedagógico','','','adj'], ['phänomenal','fenomenal','','','adj'],
    ['philosophisch','filosófico','','','adj'], ['potenziell','potencial','','','adj'],
    ['produktiv','productivo','','','adj'], ['professionell','profesional','','','adj'],
    ['progressiv','progresivo','','','adj'], ['psychisch','psíquico','','','adj'],
    ['rationell','racional','','','adj'], ['realistisch','realista','','','adj'],
    ['relevant','relevante','','','adj'], ['repräsentativ','representativo','','','adj'],
    ['respektvoll','respetuoso','','','adj'], ['sachlich','objetivo','','','adj'],
    ['schöpferisch','creador','','','adj'], ['selbstkritisch','autocrítico','','','adj'],
    ['sensibel','sensible','','','adj'], ['seriös','serio','','','adj'],
    ['signifikant','significativo','','','adj'], ['simultan','simultáneo','','','adj'],
    ['skeptisch','escéptico','','','adj'], ['solide','sólido','','','adj'],
    ['spektakulär','espectacular','','','adj'], ['speziell','especial','','','adj'],
    ['spontan','espontáneo','','','adj'], ['statistisch','estadístico','','','adj'],
    ['strategisch','estratégico','','','adj'], ['strukturell','estructural','','','adj'],
    ['subjektiv','subjetivo','','','adj'], ['systematisch','sistemático','','','adj'],
    ['taktvoll','discreto','','','adj'], ['taktlos','indiscreto','','','adj'],
    ['temporär','temporal','','','adj'], ['theoretisch','teórico','','','adj'],
    ['tolerant','tolerante','','','adj'], ['transparent','transparente','','','adj'],
    ['typografisch','tipográfico','','','adj'], ['umfassend','exhaustivo','','','adj'],
    ['umsichtig','prudente','','','adj'], ['umweltfreundlich','ecológico','','','adj'],
    ['unabhängig','independiente','','','adj'], ['universell','universal','','','adj'],
    ['vorausschauend','previsor','','','adj'], ['vorurteilsfrei','sin prejuicios','','','adj'],
    ['wirkungsvoll','efectivo','','','adj'], ['wirtschaftlich','económico','','','adj'],
    ['wissenschaftlich','científico','','','adj'], ['zeitgemäß','moderno','','','adj'],
    ['zielorientiert','orientado a objetivos','','','adj'], ['zweckmäßig','conveniente','','','adj'],
  ]
};

// Verb pools  
const verbPools = {
  'A1': [
    ['sagen','decir','','','v'], ['machen','hacer','','','v'],
    ['gehen','ir','','','v'], ['kommen','venir','','','v'],
    ['sehen','ver','','','v'], ['geben','dar','','','v'],
    ['nehmen','tomar','','','v'], ['bringen','traer','','','v'],
    ['finden','encontrar','','','v'], ['lesen','leer','','','v'],
    ['schreiben','escribir','','','v'], ['sprechen','hablar','','','v'],
    ['hören','oír','','','v'], ['stehen','estar de pie','','','v'],
    ['liegen','estar acostado','','','v'], ['sitzen','estar sentado','','','v'],
    ['laufen','correr','','','v'], ['fahren','conducir','','','v'],
    ['fliegen','volar','','','v'], ['schwimmen','nadar','','','v'],
    ['essen','comer','','','v'], ['trinken','beber','','','v'],
    ['schlafen','dormir','','','v'], ['wohnen','vivir','','','v'],
    ['arbeiten','trabajar','','','v'], ['spielen','jugar','','','v'],
    ['lernen','aprender','','','v'], ['studieren','estudiar','','','v'],
    ['kaufen','comprar','','','v'], ['verkaufen','vender','','','v'],
    ['zahlen','pagar','','','v'], ['kosten','costar','','','v'],
    ['öffnen','abrir','','','v'], ['schließen','cerrar','','','v'],
    ['warten','esperar','','','v'], ['fragen','preguntar','','','v'],
    ['antworten','responder','','','v'], ['helfen','ayudar','','','v'],
    ['danken','agradecer','','','v'], ['wünschen','desear','','','v'],
    ['glauben','creer','','','v'], ['denken','pensar','','','v'],
    ['wissen','saber','','','v'], ['verstehen','entender','','','v'],
    ['brauchen','necesitar','','','v'], ['tragen','llevar','','','v'],
  ],
  'A2': [
    ['anfangen','empezar','','','v'], ['aufhören','parar','','','v'],
    ['mitmachen','participar','','','v'], ['teilnehmen','participar','','','v'],
    ['stattfinden','tener lugar','','','v'], ['aufstehen','levantarse','','','v'],
    ['einschlafen','dormirse','','','v'], ['aufwachen','despertarse','','','v'],
    ['einladen','invitar','','','v'], ['ausgehen','salir','','','v'],
    ['mitbringen','traer','','','v'], ['abholen','recoger','','','v'],
    ['vorhaben','planear','','','v'], ['stattfinden','ocurrir','','','v'],
    ['anrufen','llamar','','','v'], ['vorstellen','presentar','','','v'],
    ['erzählen','contar','','','v'], ['beschreiben','describir','','','v'],
    ['erklären','explicar','','','v'], ['bedeuten','significar','','','v'],
    ['fehlen','faltar','','','v'], ['passen','quedar bien','','','v'],
    ['probieren','probar','','','v'], ['bestellen','pedir','','','v'],
    ['bezahlen','pagar','','','v'], ['reisen','viajar','','','v'],
    ['wandern','senderear','','','v'], ['besuchen','visitar','','','v'],
    ['bleiben','quedarse','','','v'], ['verbringen','pasar tiempo','','','v'],
    ['erwarten','esperar','','','v'], ['erhalten','recibir','','','v'],
    ['entdecken','descubrir','','','v'], ['bieten','ofrecer','','','v'],
    ['prüfen','comprobar','','','v'], ['vergleichen','comparar','','','v'],
    ['empfehlen','recomendar','','','v'], ['wählen','elegir','','','v'],
    ['entscheiden','decidir','','','v'], ['folgen','seguir','','','v'],
  ],
  'B1': [
    ['vorbereiten','preparar','','','v'], ['vorstellen imaginar','imaginar','','','v'],
    ['ausprobieren','experimentar','','','v'], ['einsetzen','utilizar','','','v'],
    ['durchführen','realizar','','','v'], ['teilnehmen an','participar en','','','v'],
    ['zusammenfassen','resumir','','','v'], ['erwähnen','mencionar','','','v'],
    ['behaupten','afirmar','','','v'], ['beweisen','probar','','','v'],
    ['widersprechen','contradecir','','','v'], ['zustimmen','estar de acuerdo','','','v'],
    ['ablehnen','rechazar','','','v'], ['akzeptieren','aceptar','','','v'],
    ['diskutieren','discutir','','','v'], ['debattieren','debatir','','','v'],
    ['überzeugen','convencer','','','v'], ['überreden','persuadir','','','v'],
    ['verhandeln','negociar','','','v'], ['einigen','acordar','','','v'],
    ['auswirken','afectar','','','v'], ['beeinflussen','influir','','','v'],
    ['fördern','fomentar','','','v'], ['verhindern','prevenir','','','v'],
    ['ermöglichen','posibilitar','','','v'], ['erleichtern','facilitar','','','v'],
    ['erschweren','dificultar','','','v'], ['gefährden','poner en riesgo','','','v'],
    ['schützen','proteger','','','v'], ['bewahren','conservar','','','v'],
    ['erhalten','mantener','','','v'], ['verbessern','mejorar','','','v'],
    ['verschlechtern','empeorar','','','v'], ['verändern','cambiar','','','v'],
    ['entwickeln','desarrollar','','','v'], ['wachsen','crecer','','','v'],
    ['steigen','subir','','','v'], ['sinken','bajar','','','v'],
    ['sich erinnern','recordar','','','v'], ['sich freuen','alegrarse','','','v'],
    ['sich ärgern','enojarse','','','v'], ['sich wundern','sorprenderse','','','v'],
    ['sich kümmern um','ocuparse de','','','v'], ['sich bewerben','solicitar','','','v'],
    ['sich entschuldigen','disculparse','','','v'], ['sich bedanken','agradecer','','','v'],
  ],
  'B2': [
    ['voraussetzen','presuponer','','','v'], ['ausschließen','excluir','','','v'],
    ['einschließen','incluir','','','v'], ['berücksichtigen','considerar','','','v'],
    ['vernachlässigen','descuidar','','','v'], ['gewährleisten','garantizar','','','v'],
    ['sicherstellen','asegurar','','','v'], ['beaufsichtigen','supervisar','','','v'],
    ['überwachen','vigilar','','','v'], ['kontrollieren','controlar','','','v'],
    ['überprüfen','verificar','','','v'], ['analysieren','analizar','','','v'],
    ['untersuchen','investigar','','','v'], ['bewerten','evaluar','','','v'],
    ['beurteilen','juzgar','','','v'], ['einschätzen','estimar','','','v'],
    ['kennzeichnen','señalar','','','v'], ['definieren','definir','','','v'],
    ['bestimmen','determinar','','','v'], ['festlegen','establecer','','','v'],
    ['vereinbaren','acordar','','','v'], ['feststellen','constatar','','','v'],
    ['ermitteln','averiguar','','','v'], ['herausfinden','descubrir','','','v'],
    ['nachweisen','demostrar','','','v'], ['widerlegen','refutar','','','v'],
    ['bestätigen','confirmar','','','v'], ['dementieren','desmentir','','','v'],
    ['verkünden','anunciar','','','v'], ['veröffentlichen','publicar','','','v'],
    ['verbreiten','difundir','','','v'], ['vervielfältigen','multiplicar','','','v'],
    ['verringern','reducir','','','v'], ['vergrößern','ampliar','','','v'],
    ['intensivieren','intensificar','','','v'], ['stabilisieren','estabilizar','','','v'],
    ['destabilisieren','desestabilizar','','','v'], ['revolutionieren','revolucionar','','','v'],
    ['transformieren','transformar','','','v'], ['modernisieren','modernizar','','','v'],
    ['automatisieren','automatizar','','','v'], ['digitalisieren','digitalizar','','','v'],
    ['übersetzen','traducir','','','v'], ['dolmetschen','interpretar','','','v'],
    ['korrigieren','corregir','','','v'], ['redigieren','redactar','','','v'],
    ['verfassen','componer','','','v'], ['veröffentlichen','publicar','','','v'],
    ['zitieren','citar','','','v'], ['referenzieren','referenciar','','','v'],
  ],
  'C1': [
    ['abwägen','ponderar','','','v'], ['anerkennen','reconocer','','','v'],
    ['anregen','estimular','','','v'], ['beanspruchen','reclamar','','','v'],
    ['befürworten','respaldar','','','v'], ['begründen','fundamentar','','','v'],
    ['bekräftigen','reafirmar','','','v'], ['bereichern','enriquecer','','','v'],
    ['betonen','enfatizar','','','v'], ['bevorzugen','preferir','','','v'],
    ['charakterisieren','caracterizar','','','v'], ['differenzieren','diferenciar','','','v'],
    ['dokumentieren','documentar','','','v'], ['eindämmen','contener','','','v'],
    ['evaluieren','evaluar','','','v'], ['evozieren','evocar','','','v'],
    ['extrapolieren','extrapolar','','','v'], ['generieren','generar','','','v'],
    ['gewährleisten','garantizar','','','v'], ['globalisieren','globalizar','','','v'],
    ['harmonisieren','armonizar','','','v'], ['hypothetisieren','hipotetizar','','','v'],
    ['identifizieren','identificar','','','v'], ['implementieren','implementar','','','v'],
    ['implizieren','implicar','','','v'], ['individualisieren','individualizar','','','v'],
    ['inferieren','inferir','','','v'], ['initiieren','iniciar','','','v'],
    ['institutionalisieren','institucionalizar','','','v'], ['integrieren','integrar','','','v'],
    ['interagieren','interactuar','','','v'], ['interpretieren','interpretar','','','v'],
    ['investieren','invertir','','','v'], ['isolieren','aislar','','','v'],
    ['kategorisieren','categorizar','','','v'], ['klassifizieren','clasificar','','','v'],
    ['kollaborieren','colaborar','','','v'], ['kommunizieren','comunicar','','','v'],
    ['kompensieren','compensar','','','v'], ['kompilieren','compilar','','','v'],
    ['konfrontieren','confrontar','','','v'], ['konkretisieren','concretar','','','v'],
    ['konsolidieren','consolidar','','','v'], ['konstituieren','constituir','','','v'],
    ['kontextualisieren','contextualizar','','','v'], ['kontrastieren','contrastar','','','v'],
    ['koordinieren','coordinar','','','v'], ['korrelieren','correlacionar','','','v'],
    ['kritisieren','criticar','','','v'], ['legitimieren','legitimar','','','v'],
    ['manifestieren','manifestar','','','v'], ['maximieren','maximizar','','','v'],
    ['minimieren','minimizar','','','v'], ['mobilisieren','movilizar','','','v'],
    ['modellieren','modelar','','','v'], ['monitorisieren','monitorear','','','v'],
    ['motivieren','motivar','','','v'], ['nuancieren','matizar','','','v'],
    ['operationalisieren','operacionalizar','','','v'], ['optimieren','optimizar','','','v'],
    ['organisieren','organizar','','','v'], ['paraphrasieren','parafrasear','','','v'],
    ['partizipieren','participar','','','v'], ['perpetuieren','perpetuar','','','v'],
    ['perspektivieren','perspectivar','','','v'], ['philosophieren','filosofar','','','v'],
    ['planen','planificar','','','v'], ['positionieren','posicionar','','','v'],
    ['präferieren','preferir','','','v'], ['prägen','marcar','','','v'],
    ['präsentieren','presentar','','','v'], ['priorisieren','priorizar','','','v'],
    ['problematisieren','problematizar','','','v'], ['prognostizieren','pronosticar','','','v'],
    ['qualifizieren','calificar','','','v'], ['quantifizieren','cuantificar','','','v'],
    ['rationalisieren','racionalizar','','','v'], ['reagieren','reaccionar','','','v'],
    ['realisieren','realizar','','','v'], ['recherchieren','investigar','','','v'],
    ['rechtfertigen','justificar','','','v'], ['reflektieren','reflexionar','','','v'],
    ['regenerieren','regenerar','','','v'], ['regulieren','regular','','','v'],
    ['relativieren','relativizar','','','v'], ['repräsentieren','representar','','','v'],
    ['resümieren','resumir','','','v'], ['revoltieren','rebelarse','','','v'],
    ['sanktionieren','sancionar','','','v'], ['spezialisieren','especializar','','','v'],
    ['spezifizieren','especificar','','','v'], ['stimulieren','estimular','','','v'],
    ['strukturieren','estructurar','','','v'], ['subventionieren','subvencionar','','','v'],
    ['suggerieren','sugerir','','','v'], ['synthetisieren','sintetizar','','','v'],
  ]
};

// Adverb pools
const advPools = {
  'A1': [['gern','con gusto','','','adv'], ['schon','ya','','','adv'], ['noch','todavía','','','adv'], ['erst','sólo','','','adv']],
  'A2': [['deshalb','por eso','','','adv'], ['deswegen','por lo tanto','','','adv'], ['trotzdem','sin embargo','','','adv'], ['allerdings','ciertamente','','','adv']],
  'B1': [['außerdem','además','','','adv'], ['hingegen','en cambio','','','adv'], ['dennoch','no obstante','','','adv'], ['inzwischen','mientras tanto','','','adv'], ['mittlerweile','entretanto','','','adv'], ['jedenfalls','en todo caso','','','adv']],
  'B2': [['anschließend','posteriormente','','','adv'], ['vorausgesetzt','siempre que','','','adv'], ['zufällig','casualmente','','','adv'], ['keinesfalls','de ningún modo','','','adv']],
  'C1': [['nichtsdestotrotz','no obstante','','','adv'], ['nichtsdestoweniger','sin embargo','','','adv'], ['unterdessen','mientras tanto','','','adv'], ['folglich','por consiguiente','','','adv'], ['dementsprechend','en consecuencia','','','adv']],
};

// ==============================================================
// STEP 2: Read file and count current words
// ==============================================================

const content = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Find last occurrence of each addLevel
function findLastAddLevel(text) {
  const positions = {};
  const regex = /addLevel\(\s*'([A-Z]\d\.\d)'\s*,/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    positions[m[1]] = m.index;
  }
  return positions;
}

// Find the end of an addLevel block (the closing ]);)
function findBlockEnd(text, startPos) {
  const arrayStart = text.indexOf('[');
  if (arrayStart === -1 || arrayStart < startPos) return -1;
  let depth = 0, inStr = false, strCh = '', foundOpen = false;
  for (let i = arrayStart; i < text.length; i++) {
    const ch = text[i], prev = i > 0 ? text[i-1] : '';
    if (inStr) { if (ch === strCh && prev !== '\\') inStr = false; continue; }
    if (ch === "'" || ch === '"') { inStr = true; strCh = ch; continue; }
    if (ch === '[') { depth++; foundOpen = true; }
    else if (ch === ']') { depth--; if (foundOpen && depth === 0) { return i; } }
  }
  return -1;
}

// Count current words per level
function countWords(text) {
  const section = text.substring(text.indexOf('function addLevel'), text.indexOf('// FIN'));
  const counts = {};
  let currentLevel = '';
  section.split('\n').forEach(line => {
    const lm = line.match(/addLevel\('([^']+)'/);
    if (lm) currentLevel = lm[1];
    const wordMatches = line.match(/\[\s*'[A-Za-zäöüßÄÖÜ][^']*'/g);
    if (wordMatches && currentLevel) {
      const actualWords = wordMatches.filter(w => {
        const p = w.match(/'([^']+)'/);
        return p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1]);
      });
      counts[currentLevel] = (counts[currentLevel] || 0) + actualWords.length;
    }
  });
  return counts;
}

const counts = countWords(content);
const positions = findLastAddLevel(content);
const existingWords = {};
Object.entries(counts).forEach(([k,v]) => existingWords[k] = v);

// ==============================================================
// STEP 3: Build word distribution plan
// ==============================================================

const targets = {
  'A1.1': 300, 'A1.2': 250, 'A1.3': 250, 'A1.4': 250,
  'A2.1': 300, 'A2.2': 300, 'A2.3': 300, 'A2.4': 300,
  'B1.1': 350, 'B1.2': 350, 'B1.3': 350, 'B1.4': 350,
  'B2.1': 350, 'B2.2': 350, 'B2.3': 350, 'B2.4': 350,
  'C1.1': 400, 'C1.2': 400
};

// Map broad level to sublevels
const broadToSub = {
  'A1': ['A1.1','A1.2','A1.3','A1.4'],
  'A2': ['A2.1','A2.2','A2.3','A2.4'],
  'B1': ['B1.1','B1.2','B1.3','B1.4'],
  'B2': ['B2.1','B2.2','B2.3','B2.4'],
  'C1': ['C1.1','C1.2']
};

// Track used German words to avoid duplicates
const usedWords = new Set();

// Also collect existing words from content
const existingMatches = content.match(/\[\s*'[A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ -]+'/g);
if (existingMatches) {
  existingMatches.forEach(m => {
    const p = m.match(/'([^']+)'/);
    if (p) usedWords.add(p[1].toLowerCase());
  });
}

console.log('Current counts:');
let totalExisting = 0;
Object.keys(counts).sort().forEach(k => {
  const cur = counts[k] || 0;
  console.log(`  ${k}: ${cur}/${targets[k]} (need ${Math.max(0, targets[k]-cur)})`);
  totalExisting += cur;
});
console.log(`Total: ${totalExisting}\n`);

// ==============================================================
// STEP 4: Generate injection data for each level
// ==============================================================

const levelInjections = {};
let globalNounIdx = 0, globalAdjIdx = 0, globalVerbIdx = 0, globalAdvIdx = 0;

Object.keys(broadToSub).forEach(broad => {
  const subs = broadToSub[broad];
  const nouns = nounPools[broad] || [];
  const adjs = adjPools[broad] || [];
  const verbs = verbPools[broad] || [];
  const advs = advPools[broad] || [];
  const allWords = [...nouns, ...adjs, ...verbs, ...advs];
  
  // Shuffle
  for (let i = allWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
  }
  
  // Filter out already used words
  const fresh = allWords.filter(w => !usedWords.has(w[0].toLowerCase()));
  fresh.forEach(w => usedWords.add(w[0].toLowerCase()));
  
  // Calculate total needed for this broad level
  let totalNeeded = 0;
  subs.forEach(sub => {
    const need = Math.max(0, targets[sub] - (counts[sub] || 0));
    totalNeeded += need;
  });
  
  console.log(`${broad}: have ${fresh.length} fresh words, need ${totalNeeded}`);
  
  // Distribute words to sub-levels
  let idx = 0;
  subs.forEach(sub => {
    const need = Math.max(0, targets[sub] - (counts[sub] || 0));
    if (need > 0) {
      const words = fresh.slice(idx, idx + need);
      idx += words.length;
      levelInjections[sub] = words;
    }
  });
});

console.log('');

// ==============================================================
// STEP 5: Inject into file (processing in reverse order by character position)
// ==============================================================

let modifiedContent = content;
let totalInjected = 0;

// Sort sublevels by position descending to inject from bottom to top
const sortedSubs = Object.keys(levelInjections).sort((a, b) => (positions[b] || 0) - (positions[a] || 0));

sortedSubs.forEach(sub => {
  const words = levelInjections[sub];
  if (!words || words.length === 0) return;
  
  const pos = positions[sub];
  if (!pos && pos !== 0) { console.log(`  WARNING: Cannot find position for ${sub}`); return; }
  
  // Find the addLevel opening bracket
  const startBracket = modifiedContent.indexOf('[', pos);
  if (startBracket === -1) { console.log(`  WARNING: Cannot find bracket for ${sub}`); return; }
  
  const blockEnd = findBlockEnd(modifiedContent.substring(startBracket), 0);
  if (blockEnd === -1) { console.log(`  WARNING: Cannot find block end for ${sub}`); return; }
  
  const absoluteEnd = startBracket + blockEnd;
  
  // Generate word strings
  const wordStrings = words.map(w => {
    if (w[4] === 'n') return `['${w[0]}','${w[1]}','${w[2]}','${w[3]}','n']`;
    return `['${w[0]}','${w[1]}','','','${w[4]}']`;
  });
  
  // Inject
  const before = modifiedContent.substring(0, absoluteEnd);
  const after = modifiedContent.substring(absoluteEnd);
  modifiedContent = before + ',\n' + wordStrings.join(',\n') + '\n' + after;
  
  console.log(`  ${sub}: +${wordStrings.length} words (existing: ${counts[sub] || 0} → ${(counts[sub]||0)+wordStrings.length})`);
  totalInjected += wordStrings.length;
});

console.log(`\nTotal injected: ${totalInjected}`);

// ==============================================================
// STEP 6: Verify
// ==============================================================

const finalCounts = countWords(modifiedContent);
let finalTotal = 0;
console.log('\nFinal counts:');
Object.keys(targets).sort().forEach(k => {
  const val = finalCounts[k] || 0;
  const target = targets[k];
  const status = val >= target ? '✓' : '✗';
  console.log(`  ${k}: ${val}/${target} ${status}`);
  finalTotal += val;
});
console.log(`Total: ${finalTotal} (target: 5000+)`);

if (totalInjected > 0) {
  fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modifiedContent, 'utf8');
  console.log('\n✓ File updated!');
}