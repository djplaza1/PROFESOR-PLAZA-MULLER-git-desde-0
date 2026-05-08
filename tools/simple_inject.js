const fs = require('fs');

// ================================================================
// 1. Load data sources
// ================================================================

// Nouns from articulos.json
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));

function parseNoun(deStr) {
  const parts = deStr.split(' ');
  return { article: parts[0], word: parts.slice(1).join(' ') };
}

// Build huge noun pool per broad level
const levelNouns = { A1: [], A2: [], B1: [], B2: [], C1: [] };
articulos.forEach(item => {
  const lvl = item.level || 'B1';
  if (!levelNouns[lvl]) levelNouns[lvl] = [];
  const parsed = parseNoun(item.de);
  levelNouns[lvl].push([parsed.word, item.es, parsed.article, item.plural || '', 'n']);
});

// Adjective pools
const levelAdjs = {
  A1: [
    ['freundlich','amable','','','adj'],['fleißig','trabajador','','','adj'],
    ['faul','perezoso','','','adj'],['ehrlich','honesto','','','adj'],
    ['mutig','valiente','','','adj'],['höflich','cortés','','','adj'],
    ['sauber','limpio','','','adj'],['rund','redondo','','','adj'],
    ['nass','mojado','','','adj'],['trocken','seco','','','adj'],
    ['dick','gordo','','','adj'],['dünn','delgado','','','adj'],
    ['breit','ancho','','','adj'],['flach','plano','','','adj'],
    ['nett','agradable','','','adj'],['böse','malvado','','','adj'],
    ['stolz','orgulloso','','','adj'],['traurig','triste','','','adj'],
    ['ruhig','tranquilo','','','adj'],['wach','despierto','','','adj'],
    ['gesund','saludable','','','adj'],['krank','enfermo','','','adj'],
    ['reich','rico','','','adj'],['arm','pobre','','','adj'],
    ['billig','barato','','','adj'],['gefährlich','peligroso','','','adj'],
    ['weise','sabio','','','adj'],['klug','inteligente','','','adj'],
    ['dumm','tonto','','','adj'],['lieb','querido','','','adj'],
    ['froh','alegre','','','adj'],['tapfer','valiente','','','adj'],
    ['edel','noble','','','adj'],['bescheiden','modesto','','','adj'],
    ['zart','tierno','','','adj'],['fein','fino','','','adj'],
    ['grob','grueso','','','adj'],['locker','suelto','','','adj'],
    ['klar','claro','','','adj'],['leise','silencioso','','','adj'],
    ['laut','ruidoso','','','adj'],['sanft','suave','','','adj'],
    ['heftig','violento','','','adj'],['zäh','durable','','','adj'],
    ['kühn','audaz','','','adj'],['treu','fiel','','','adj'],
    ['munter','alegre','','','adj'],['schwer','pesado','','','adj'],
    ['teuer','caro','','','adj'],['berühmt','famoso','','','adj'],
    ['eigen','propio','','','adj'],['seltsam','extraño','','','adj'],
    ['schrecklich','terrible','','','adj'],['köstlich','delicioso','','','adj'],
    ['nützlich','útil','','','adj'],['bekannt','conocido','','','adj'],
    ['angenehm','agradable','','','adj'],['künstlich','artificial','','','adj'],
    ['taub','sordo','','','adj'],['blind','ciego','','','adj'],
    ['entschlossen','decidido','','','adj'],['grausam','cruel','','','adj'],
    ['echt','auténtico','','','adj'],['sorgfältig','cuidadoso','','','adj'],
    ['vorsichtig','cauteloso','','','adj'],['neugierig','curioso','','','adj'],
    ['zärtlich','cariñoso','','','adj'],['großzügig','generoso','','','adj'],
    ['eifersüchtig','celoso','','','adj'],['schüchtern','tímido','','','adj'],
    ['lebhaft','vivaz','','','adj'],['lustig','divertido','','','adj'],
    ['langweilig','aburrido','','','adj'],['ernst','serio','','','adj'],
    ['streng','estricto','','','adj'],['gering','escaso','','','adj'],
    ['betrunken','borracho','','','adj'],['nüchtern','sobrio','','','adj'],
    ['unhöflich','descortés','','','adj'],['unglücklich','infeliz','','','adj'],
    ['unfreundlich','antipático','','','adj'],['ungeduldig','impaciente','','','adj'],
    ['ungeordnet','desordenado','','','adj'],['gewiss','cierto','','','adj'],
    ['sicher','seguro','','','adj'],['tüchtig','competente','','','adj'],
    ['geschickt','hábil','','','adj'],['selbstständig','independiente','','','adj'],
    ['abhängig','dependiente','','','adj'],['beliebt','popular','','','adj'],
    ['verhasst','odiado','','','adj'],['wichtig','importante','','','adj'],
    ['unwichtig','sin importancia','','','adj'],['angesehen','respetado','','','adj'],
    ['ungefährlich','inofensivo','','','adj'],['natürlich','natural','','','adj'],
    ['glatt','liso','','','adj'],['rau','áspero','','','adj'],
    ['dicht','denso','','','adj'],['starr','rígido','','','adj'],
    ['biegsam','flexible','','','adj'],['trüb','turbio','','','adj'],
    ['weich','suave','','','adj'],['hart','duro','','','adj'],
  ],
  A2: [
    ['glücklich','feliz','','','adj'],['freudig','alegre','','','adj'],
    ['aufmerksam','atento','','','adj'],['dankbar','agradecido','','','adj'],
    ['berühmt','famoso','','','adj'],['geeignet','adecuado','','','adj'],
    ['bequem','cómodo','','','adj'],['bunt','colorido','','','adj'],
    ['einzig','único','','','adj'],['fremd','extraño','','','adj'],
    ['ganz','entero','','','adj'],['gemeinsam','común','','','adj'],
    ['gerecht','justo','','','adj'],['gering','bajo','','','adj'],
    ['gewöhnlich','normal','','','adj'],['hübsch','bonito','','','adj'],
    ['kräftig','fuerte','','','adj'],['kühn','audaz','','','adj'],
    ['mutig','valiente','','','adj'],['niedrig','bajo','','','adj'],
    ['ordentlich','ordenado','','','adj'],['peinlich','vergonzoso','','','adj'],
    ['pflichtbewusst','responsable','','','adj'],['rein','puro','','','adj'],
    ['riesig','enorme','','','adj'],['schade','lástima','','','adj'],
    ['schlimm','grave','','','adj'],['schmal','estrecho','','','adj'],
    ['schnell','rápido','','','adj'],['schön','hermoso','','','adj'],
    ['selbst','mismo','','','adj'],['selten','raro','','','adj'],
    ['spannend','emocionante','','','adj'],['spät','tarde','','','adj'],
    ['still','quieto','','','adj'],['süß','dulce','','','adj'],
    ['toll','estupendo','','','adj'],['tief','profundo','','','adj'],
    ['überrascht','sorprendido','','','adj'],['unmöglich','imposible','','','adj'],
    ['unten','abajo','','','adj'],['vergnügt','contento','','','adj'],
    ['verschieden','diferente','','','adj'],['voll','lleno','','','adj'],
    ['vorsichtig','cuidadoso','','','adj'],['wahrscheinlich','probable','','','adj'],
    ['zärtlich','cariñoso','','','adj'],['zufrieden','satisfecho','','','adj'],  
    ['wunderbar','maravilloso','','','adj'],['hässlich','feo','','','adj'],
    ['dringend','urgente','','','adj'], ['enttäuscht','decepcionado','','','adj'],
    ['erstaunt','asombrado','','','adj'], ['furchtbar','horrible','','','adj'],
    ['gemütlich','acogedor','','','adj'], ['herrlich','magnífico','','','adj'],
    ['kostbar','valioso','','','adj'], ['prächtig','espléndido','','','adj'],
    ['schrecklich','terrible','','','adj'], ['wunderbar','maravilloso','','','adj'],
    ['wütend','furioso','','','adj'], ['ärgerlich','molesto','','','adj'],    
  ],
  B1: [
    ['zusammenhängend','coherente','','','adj'],['umfassend','extenso','','','adj'],
    ['ausführlich','detallado','','','adj'],['oberflächlich','superficial','','','adj'],
    ['wesentlich','esencial','','','adj'],['nebensächlich','secundario','','','adj'],
    ['gründlich','minucioso','','','adj'],['flüchtig','superficial','','','adj'],
    ['angemessen','adecuado','','','adj'],['unangemessen','inadecuado','','','adj'],
    ['verständlich','comprensible','','','adj'],['unverständlich','incomprensible','','','adj'],
    ['erträglich','tolerable','','','adj'],['unerträglich','intolerable','','','adj'],
    ['passend','apropiado','','','adj'],['unpassend','inapropiado','','','adj'],
    ['regelmäßig','regular','','','adj'],['unregelmäßig','irregular','','','adj'],
    ['gültig','válido','','','adj'],['ungültig','inválido','','','adj'],
    ['bewusst','consciente','','','adj'],['unbewusst','inconsciente','','','adj'],
    ['vollständig','completo','','','adj'],['unvollständig','incompleto','','','adj'],
    ['erlaubt','permitido','','','adj'],['verboten','prohibido','','','adj'],
    ['geeignet','adecuado','','','adj'],['ungeeignet','inadecuado','','','adj'],
    ['erwartet','esperado','','','adj'],['unerwartet','inesperado','','','adj'],
    ['beschäftigt','ocupado','','','adj'],['arbeitslos','desempleado','','','adj'],
    ['ehrgeizig','ambicioso','','','adj'],['erfolgreich','exitoso','','','adj'],
    ['sympathisch','simpático','','','adj'],['unsympathisch','antipático','','','adj'],
    ['auffällig','llamativo','','','adj'],['unauffällig','discreto','','','adj'],
    ['glaublich','creíble','','','adj'],['unglaublich','increíble','','','adj'],
    ['jährlich','anual','','','adj'],['monatlich','mensual','','','adj'],
    ['wöchentlich','semanal','','','adj'],['täglich','diario','','','adj'],
    ['örtlich','local','','','adj'],['geistig','mental','','','adj'],
    ['körperlich','físico','','','adj'],['seelisch','psíquico','','','adj'],
    ['wissenschaftlich','científico','','','adj'],['technisch','técnico','','','adj'],
    ['wirtschaftlich','económico','','','adj'],['politisch','político','','','adj'],
    ['rechtlich','legal','','','adj'],['praktisch','práctico','','','adj'],
    ['theoretisch','teórico','','','adj'],['konkret','concreto','','','adj'],
    ['abstrakt','abstracto','','','adj'],['absolut','absoluto','','','adj'],
    ['relativ','relativo','','','adj'],['optimal','óptimo','','','adj'],
    ['maximal','máximo','','','adj'],['typisch','típico','','','adj'],
    ['exotisch','exótico','','','adj'],['finanziell','financiero','','','adj'],
  ],
  B2: [
    ['vorausgesetzt','supuesto','','','adj'],['nachvollziehbar','comprensible','','','adj'],
    ['unvorstellbar','inimaginable','','','adj'],['unabdingbar','indispensable','','','adj'],
    ['unumgänglich','inevitable','','','adj'],['unvermeidlich','inevitable','','','adj'],
    ['unbestritten','indiscutible','','','adj'],['unwiderruflich','irrevocable','','','adj'],
    ['unwiderstehlich','irresistible','','','adj'],['unerschöpflich','inagotable','','','adj'],
    ['unübertroffen','insuperable','','','adj'],['unvergleichlich','incomparable','','','adj'],
    ['unbeschreiblich','indescriptible','','','adj'],['unvergesslich','inolvidable','','','adj'],
    ['unermüdlich','incansable','','','adj'],['unerschrocken','intrépido','','','adj'],
    ['vorläufig','provisional','','','adj'],['endgültig','definitivo','','','adj'],
    ['austauschbar','intercambiable','','','adj'],['ersetzbar','reemplazable','','','adj'],
    ['maßgeblich','decisivo','','','adj'],['ausschlaggebend','determinante','','','adj'],
    ['entscheidend','crucial','','','adj'],['bedeutend','significativo','','','adj'],
    ['bedeutungslos','insignificante','','','adj'],['maßvoll','moderado','','','adj'],
    ['maßlos','desmedido','','','adj'],['grenzenlos','ilimitado','','','adj'],
    ['beschränkt','limitado','','','adj'],['zeitgenössisch','contemporáneo','','','adj'],
    ['gleichzeitig','simultáneo','','','adj'],['übermäßig','excesivo','','','adj'],
    ['verhältnismäßig','proporcional','','','adj'],['unverhältnismäßig','desproporcionado','','','adj'],
    ['zuverlässig','fiable','','','adj'],['unzuverlässig','poco fiable','','','adj'],
    ['verantwortlich','responsable','','','adj'],['verantwortungslos','irresponsable','','','adj'],
    ['rücksichtsvoll','considerado','','','adj'],['rücksichtslos','desconsiderado','','','adj'],
    ['schonend','cuidadoso','','','adj'],['schädlich','dañino','','','adj'],
    ['förderlich','beneficioso','','','adj'],['hinderlich','obstaculizador','','','adj'],
    ['durchführbar','factible','','','adj'],['undurchführbar','inviable','','','adj'],
    ['erreichbar','alcanzable','','','adj'],['unerreichbar','inalcanzable','','','adj'],
    ['vermeidbar','evitable','','','adj'],['unvermeidbar','inevitable','','','adj'],
    ['überschaubar','manejable','','','adj'],['unüberschaubar','inmanejable','','','adj'],
    ['vorhersehbar','predecible','','','adj'],['unvorhersehbar','impredecible','','','adj'],
    ['ausgezeichnet','excelente','','','adj'],['mangelhaft','deficiente','','','adj'],
    ['überlegen','superior','','','adj'],['unterlegen','inferior','','','adj'],
    ['gleichwertig','equivalente','','','adj'],['gleichgültig','indiferente','','','adj'],
    ['verbreitet','extendido','','','adj'], ['vorhanden','disponible','','','adj'],
    ['wahrscheinlich','probable','','','adj'], ['wirksam','eficaz','','','adj'],
    ['zweifellos','sin duda','','','adj'], ['zugänglich','accesible','','','adj'],
  ],
  C1: [
    ['anspruchsvoll','exigente','','','adj'],['aufschlussreich','revelador','','','adj'],
    ['bahnbrechend','pionero','','','adj'],['bemerkenswert','notable','','','adj'],
    ['charakteristisch','característico','','','adj'],['differenziert','diferenciado','','','adj'],
    ['eindrucksvoll','impresionante','','','adj'],['einschneidend','drástico','','','adj'],
    ['einzigartig','único','','','adj'],['empfindlich','sensible','','','adj'],
    ['erheblich','considerable','','','adj'],['fachkundig','experto','','','adj'],
    ['fachspezifisch','especializado','','','adj'],['folgenschwer','grave','','','adj'],
    ['fragwürdig','cuestionable','','','adj'],['fundamental','fundamental','','','adj'],
    ['gegensätzlich','opuesto','','','adj'],['grundlegend','básico','','','adj'],
    ['hervorragend','sobresaliente','','','adj'],['hintergründig','profundo','','','adj'],
    ['inakzeptabel','inaceptable','','','adj'],['individuell','individual','','','adj'],
    ['innovativ','innovador','','','adj'],['integral','integral','','','adj'],
    ['intensiv','intensivo','','','adj'],['interdisziplinär','interdisciplinario','','','adj'],
    ['kognitiv','cognitivo','','','adj'],['kompetent','competente','','','adj'],
    ['komplex','complejo','','','adj'],['konsequent','consecuente','','','adj'],
    ['kreativ','creativo','','','adj'],['kritisch','crítico','','','adj'],
    ['kulturell','cultural','','','adj'],['lebendig','vivo','','','adj'],
    ['legitim','legítimo','','','adj'],['logisch','lógico','','','adj'],
    ['methodisch','metódico','','','adj'],['nachdenklich','reflexivo','','','adj'],
    ['nachhaltig','sostenible','','','adj'],['notwendig','necesario','','','adj'],
    ['objektiv','objetivo','','','adj'],['pädagogisch','pedagógico','','','adj'],
    ['phänomenal','fenomenal','','','adj'],['philosophisch','filosófico','','','adj'],
    ['potenziell','potencial','','','adj'],['produktiv','productivo','','','adj'],
    ['professionell','profesional','','','adj'],['progressiv','progresivo','','','adj'],
    ['relevant','relevante','','','adj'],['repräsentativ','representativo','','','adj'],
    ['respektvoll','respetuoso','','','adj'],['sachlich','objetivo','','','adj'],
    ['selbstkritisch','autocrítico','','','adj'],['sensibel','sensible','','','adj'],
    ['signifikant','significativo','','','adj'],['skeptisch','escéptico','','','adj'],
    ['solide','sólido','','','adj'],['spektakulär','espectacular','','','adj'],
    ['spontan','espontáneo','','','adj'],['strategisch','estratégico','','','adj'],
    ['strukturell','estructural','','','adj'],['subjektiv','subjetivo','','','adj'],
    ['systematisch','sistemático','','','adj'],['transparent','transparente','','','adj'],
    ['umfassend','exhaustivo','','','adj'],['umsichtig','prudente','','','adj'],
    ['umweltfreundlich','ecológico','','','adj'],['unabhängig','independiente','','','adj'],
    ['universell','universal','','','adj'],['vorausschauend','previsor','','','adj'],
    ['wirkungsvoll','efectivo','','','adj'],['zeitgemäß','moderno','','','adj'],
    ['zielorientiert','orientado a objetivos','','','adj'],['zweckmäßig','conveniente','','','adj'],
    ['authentisch','auténtico','','','adj'], ['defensiv','defensivo','','','adj'],
    ['diplomatisch','diplomático','','','adj'], ['dynamisch','dinámico','','','adj'],
    ['effektiv','efectivo','','','adj'], ['effizient','eficiente','','','adj'],
    ['empirisch','empírico','','','adj'], ['engagiert','comprometido','','','adj'],
    ['evolutionär','evolutivo','','','adj'], ['explizit','explícito','','','adj'],
    ['expressiv','expresivo','','','adj'], ['extra','extra','','','adj'],
    ['faktisch','fáctico','','','adj'], ['flexibel','flexible','','','adj'],
    ['formal','formal','','','adj'], ['generell','general','','','adj'],
    ['global','global','','','adj'], ['homogen','homogéneo','','','adj'],
    ['horizontal','horizontal','','','adj'], ['ideal','ideal','','','adj'],
    ['identisch','idéntico','','','adj'], ['ideologisch','ideológico','','','adj'],
    ['implizit','implícito','','','adj'], ['institutionell','institucional','','','adj'],
    ['instrumentell','instrumental','','','adj'], ['intellektuell','intelectual','','','adj'],
    ['intuitiv','intuitivo','','','adj'], ['investigativ','investigativo','','','adj'],
    ['isoliert','aislado','','','adj'], ['kollektiv','colectivo','','','adj'],
    ['kommunikativ','comunicativo','','','adj'], ['komparativ','comparativo','','','adj'],
    ['kompatibel','compatible','','','adj'], ['konstant','constante','','','adj'],
    ['konstruktiv','constructivo','','','adj'], ['kontrovers','controvertido','','','adj'],
  ]
};

// Verb pools
const levelVerbs = {
  A1: [
    ['sagen','decir','','','v'],['machen','hacer','','','v'],
    ['gehen','ir','','','v'],['kommen','venir','','','v'],
    ['sehen','ver','','','v'],['geben','dar','','','v'],
    ['nehmen','tomar','','','v'],['bringen','traer','','','v'],
    ['finden','encontrar','','','v'],['lesen','leer','','','v'],
    ['schreiben','escribir','','','v'],['sprechen','hablar','','','v'],
    ['hören','oír','','','v'],['stehen','estar de pie','','','v'],
    ['liegen','estar acostado','','','v'],['sitzen','estar sentado','','','v'],
    ['laufen','correr','','','v'],['fahren','conducir','','','v'],
    ['fliegen','volar','','','v'],['schwimmen','nadar','','','v'],
    ['essen','comer','','','v'],['trinken','beber','','','v'],
    ['schlafen','dormir','','','v'],['wohnen','vivir','','','v'],
    ['arbeiten','trabajar','','','v'],['spielen','jugar','','','v'],
    ['lernen','aprender','','','v'],['studieren','estudiar','','','v'],
    ['kaufen','comprar','','','v'],['verkaufen','vender','','','v'],
    ['zahlen','pagar','','','v'],['kosten','costar','','','v'],
    ['öffnen','abrir','','','v'],['schließen','cerrar','','','v'],
    ['warten','esperar','','','v'],['fragen','preguntar','','','v'],
    ['antworten','responder','','','v'],['helfen','ayudar','','','v'],
    ['danken','agradecer','','','v'],['wünschen','desear','','','v'],
    ['glauben','creer','','','v'],['denken','pensar','','','v'],
    ['wissen','saber','','','v'],['verstehen','entender','','','v'],
    ['brauchen','necesitar','','','v'],['tragen','llevar','','','v'],
    ['tanzen','bailar','','','v'],['singen','cantar','','','v'],
    ['zeichnen','dibujar','','','v'],['kochen','cocinar','','','v'],
  ],
  A2: [
    ['anfangen','empezar','','','v'],['aufhören','parar','','','v'],
    ['mitmachen','participar','','','v'],['teilnehmen','participar','','','v'],
    ['stattfinden','tener lugar','','','v'],['aufstehen','levantarse','','','v'],
    ['einschlafen','dormirse','','','v'],['aufwachen','despertarse','','','v'],
    ['einladen','invitar','','','v'],['ausgehen','salir','','','v'],
    ['mitbringen','traer','','','v'],['abholen','recoger','','','v'],
    ['vorhaben','planear','','','v'],['anrufen','llamar','','','v'],
    ['vorstellen','presentar','','','v'],['erzählen','contar','','','v'],
    ['beschreiben','describir','','','v'],['erklären','explicar','','','v'],
    ['bedeuten','significar','','','v'],['fehlen','faltar','','','v'],
    ['passen','quedar bien','','','v'],['probieren','probar','','','v'],
    ['bestellen','pedir','','','v'],['bezahlen','pagar','','','v'],
    ['reisen','viajar','','','v'],['wandern','senderear','','','v'],
    ['besuchen','visitar','','','v'],['bleiben','quedarse','','','v'],
    ['verbringen','pasar tiempo','','','v'],['erwarten','esperar','','','v'],
    ['erhalten','recibir','','','v'],['entdecken','descubrir','','','v'],
    ['bieten','ofrecer','','','v'],['prüfen','comprobar','','','v'],
    ['vergleichen','comparar','','','v'],['empfehlen','recomendar','','','v'],
    ['wählen','elegir','','','v'],['entscheiden','decidir','','','v'],
    ['folgen','seguir','','','v'],['genießen','disfrutar','','','v'],
    ['backen','hornear','','','v'],['putzen','limpiar','','','v'],
    ['rasieren','afeitar','','','v'], ['duschen','ducharse','','','v'],
    ['frühstücken','desayunar','','','v'], ['einpacken','empacar','','','v'],
  ],
  B1: [
    ['vorbereiten','preparar','','','v'],['ausprobieren','experimentar','','','v'],
    ['durchführen','realizar','','','v'],['zusammenfassen','resumir','','','v'],
    ['erwähnen','mencionar','','','v'],['behaupten','afirmar','','','v'],
    ['beweisen','probar','','','v'],['widersprechen','contradecir','','','v'],
    ['zustimmen','estar de acuerdo','','','v'],['ablehnen','rechazar','','','v'],
    ['akzeptieren','aceptar','','','v'],['diskutieren','discutir','','','v'],
    ['überzeugen','convencer','','','v'],['verhandeln','negociar','','','v'],
    ['auswirken','afectar','','','v'],['beeinflussen','influir','','','v'],
    ['fördern','fomentar','','','v'],['verhindern','prevenir','','','v'],
    ['ermöglichen','posibilitar','','','v'],['erleichtern','facilitar','','','v'],
    ['erschweren','dificultar','','','v'],['schützen','proteger','','','v'],
    ['verbessern','mejorar','','','v'],['verschlechtern','empeorar','','','v'],
    ['verändern','cambiar','','','v'],['entwickeln','desarrollar','','','v'],
    ['wachsen','crecer','','','v'],['steigen','subir','','','v'],
    ['sinken','bajar','','','v'],['sich erinnern','recordar','','','v'],
    ['sich freuen','alegrarse','','','v'],['sich ärgern','enojarse','','','v'],
    ['sich kümmern','ocuparse','','','v'],['sich bewerben','solicitar','','','v'],
    ['sich entschuldigen','disculparse','','','v'],['sich bedanken','agradecer','','','v'],
    ['einkaufen','comprar','','','v'],['aussehen','parecer','','','v'],
    ['mitkommen','acompañar','','','v'],['zurückkommen','volver','','','v'],
  ],
  B2: [
    ['voraussetzen','presuponer','','','v'],['ausschließen','excluir','','','v'],
    ['einschließen','incluir','','','v'],['berücksichtigen','considerar','','','v'],
    ['gewährleisten','garantizar','','','v'],['sicherstellen','asegurar','','','v'],
    ['überwachen','vigilar','','','v'],['kontrollieren','controlar','','','v'],
    ['überprüfen','verificar','','','v'],['analysieren','analizar','','','v'],
    ['untersuchen','investigar','','','v'],['bewerten','evaluar','','','v'],
    ['einschätzen','estimar','','','v'],['definieren','definir','','','v'],
    ['bestimmen','determinar','','','v'],['festlegen','establecer','','','v'],
    ['vereinbaren','acordar','','','v'],['feststellen','constatar','','','v'],
    ['ermitteln','averiguar','','','v'],['nachweisen','demostrar','','','v'],
    ['widerlegen','refutar','','','v'],['bestätigen','confirmar','','','v'],
    ['verkünden','anunciar','','','v'],['veröffentlichen','publicar','','','v'],
    ['verbreiten','difundir','','','v'],['verringern','reducir','','','v'],
    ['vergrößern','ampliar','','','v'],['intensivieren','intensificar','','','v'],
    ['übersetzen','traducir','','','v'],['korrigieren','corregir','','','v'],
    ['verfassen','componer','','','v'],['zitieren','citar','','','v'],
  ],
  C1: [
    ['abwägen','ponderar','','','v'],['anerkennen','reconocer','','','v'],
    ['befürworten','respaldar','','','v'],['begründen','fundamentar','','','v'],
    ['bereichern','enriquecer','','','v'],['betonen','enfatizar','','','v'],
    ['bevorzugen','preferir','','','v'],['dokumentieren','documentar','','','v'],
    ['evaluieren','evaluar','','','v'],['generieren','generar','','','v'],
    ['globalisieren','globalizar','','','v'],['identifizieren','identificar','','','v'],
    ['implementieren','implementar','','','v'],['integrieren','integrar','','','v'],
    ['interpretieren','interpretar','','','v'],['investieren','invertir','','','v'],
    ['kommunizieren','comunicar','','','v'],['kompensieren','compensar','','','v'],
    ['konfrontieren','confrontar','','','v'],['koordinieren','coordinar','','','v'],
    ['kritisieren','criticar','','','v'],['maximieren','maximizar','','','v'],
    ['motivieren','motivar','','','v'],['optimieren','optimizar','','','v'],
    ['organisieren','organizar','','','v'],['partizipieren','participar','','','v'],
    ['reflektieren','reflexionar','','','v'],['regulieren','regular','','','v'],
    ['spezialisieren','especializar','','','v'],['strukturieren','estructurar','','','v'],
  ]
};

// Adverb pools
const levelAdvs = {
  A1: [['gern','con gusto','','','adv'],['schon','ya','','','adv'],['noch','todavía','','','adv'],['erst','sólo','','','adv']],
  A2: [['deshalb','por eso','','','adv'],['deswegen','por lo tanto','','','adv'],['trotzdem','sin embargo','','','adv'],['allerdings','ciertamente','','','adv']],
  B1: [['außerdem','además','','','adv'],['hingegen','en cambio','','','adv'],['dennoch','no obstante','','','adv'],['inzwischen','mientras tanto','','','adv']],
  B2: [['anschließend','posteriormente','','','adv'],['vorausgesetzt','siempre que','','','adv'],['zufällig','casualmente','','','adv'],['keinesfalls','de ningún modo','','','adv']],
  C1: [['nichtsdestotrotz','no obstante','','','adv'],['unterdessen','mientras tanto','','','adv'],['folglich','por consiguiente','','','adv'],['dementsprechend','en consecuencia','','','adv']]
};

// ================================================================
// 2. Read file and prepare
// ================================================================

const content = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

const levels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4',
                'B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4',
                'C1.1','C1.2'];

const targets = {
  'A1.1': 300, 'A1.2': 250, 'A1.3': 250, 'A1.4': 250,
  'A2.1': 300, 'A2.2': 300, 'A2.3': 300, 'A2.4': 300,
  'B1.1': 350, 'B1.2': 350, 'B1.3': 350, 'B1.4': 350,
  'B2.1': 350, 'B2.2': 350, 'B2.3': 350, 'B2.4': 350,
  'C1.1': 400, 'C1.2': 400
};

const broadToSub = {
  'A1': ['A1.1','A1.2','A1.3','A1.4'],
  'A2': ['A2.1','A2.2','A2.3','A2.4'],
  'B1': ['B1.1','B1.2','B1.3','B1.4'],
  'B2': ['B2.1','B2.2','B2.3','B2.4'],
  'C1': ['C1.1','C1.2']
};

// Track used German words to avoid duplicates
const usedGermanWords = new Set();

// ================================================================
// 3. Find each addLevel block and extract words
// ================================================================

function findBlockEnd(text, startPos) {
  // Find opening bracket
  const bracketPos = text.indexOf('[', startPos);
  if (bracketPos === -1) return -1;
  
  let depth = 0;
  let inStr = false;
  let strChar = '';
  
  for (let i = bracketPos; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (ch === strChar && text[i-1] !== '\\') inStr = false;
      continue;
    }
    if (ch === "'" || ch === '"') { inStr = true; strChar = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        // Found closing bracket - check if followed by );
        if (text.substring(i+1, i+3) === ');') {
          return i; // Position of closing ]
        }
      }
    }
  }
  return -1;
}

// Extract existing words from each block and track them
const levelInfo = {};
levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(content);
  if (!match) { console.error(`${lvl}: NOT FOUND`); return; }
  
  const endPos = findBlockEnd(content, match.index);
  if (endPos === -1) { console.error(`${lvl}: END NOT FOUND`); return; }
  
  const block = content.substring(match.index, endPos + 1);
  
  // Extract words (entries like ['word',...])
  const entries = block.match(/\[\s*'[^']+'/g) || [];
  const words = [];
  entries.forEach(e => {
    const p = e.match(/'([^']+)'/);
    if (p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1])) {
      words.push(p[1].toLowerCase());
      usedGermanWords.add(p[1].toLowerCase());
    }
  });
  
  levelInfo[lvl] = {
    startIdx: match.index,
    blockEnd: endPos,
    currentCount: words.length,
    existingWords: words
  };
  
  console.log(`${lvl}: ${words.length} words (target: ${targets[lvl]}, need: ${Math.max(0, targets[lvl] - words.length)})`);
});

// ================================================================
// 4. Generate new words per broad level
// ================================================================

const newWordsByLevel = {};

Object.entries(broadToSub).forEach(([broad, subs]) => {
  const nouns = (levelNouns[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  const adjs = (levelAdjs[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  const verbs = (levelVerbs[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  const advs = (levelAdvs[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  
  // Calculate total need
  let totalNeed = 0;
  subs.forEach(sub => {
    if (levelInfo[sub]) {
      totalNeed += Math.max(0, targets[sub] - levelInfo[sub].currentCount);
    }
  });
  
  // Combine all word pools
  const allAvailable = [...nouns, ...adjs, ...verbs, ...advs];
  
  // Shuffle
  for (let i = allAvailable.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAvailable[i], allAvailable[j]] = [allAvailable[j], allAvailable[i]];
  }
  
  console.log(`${broad}: ${allAvailable.length} fresh words available, need ${totalNeed}`);
  
  // Distribute to sub-levels
  let idx = 0;
  subs.forEach(sub => {
    if (!levelInfo[sub]) return;
    const need = Math.max(0, targets[sub] - levelInfo[sub].currentCount);
    if (need > 0) {
      const assign = allAvailable.slice(idx, idx + need);
      idx += assign.length;
      newWordsByLevel[sub] = assign;
      assign.forEach(w => usedGermanWords.add(w[0].toLowerCase()));
    }
  });
});

console.log('');

// ================================================================
// 5. Generate word strings and count
// ================================================================

let totalNew = 0;
let result = content;

// Process in REVERSE order (bottom to top) to maintain positions
const sortedLevels = [...levels].sort((a, b) => 
  (levelInfo[b]?.blockEnd || 0) - (levelInfo[a]?.blockEnd || 0)
);

sortedLevels.forEach(lvl => {
  const info = levelInfo[lvl];
  const newWords = newWordsByLevel[lvl];
  if (!info || !newWords || newWords.length === 0) return;
  
  // Format new words
  const wordStrings = newWords.map(w => {
    if (w[4] === 'n') return `['${w[0]}','${w[1]}','${w[2]}','${w[3]}','n']`;
    if (w[4] === 'v') return `['${w[0]}','${w[1]}','','','v']`;
    if (w[4] === 'adj') return `['${w[0]}','${w[1]}','','','adj']`;
    if (w[4] === 'adv') return `['${w[0]}','${w[1]}','','','adv']`;
    return `['${w[0]}','${w[1]}','','','${w[4]}']`;
  });
  
  // Insert after the closing ]
  const insertPos = info.blockEnd; // Position of ]
  const before = result.substring(0, insertPos);
  const after = result.substring(insertPos);
  
  // Insert: before the closing ], add comma + new words
  result = before + ',\n' + wordStrings.join(',\n') + '\n' + after;
  
  console.log(`${lvl}: +${wordStrings.length} (was ${info.currentCount})`);
  totalNew += wordStrings.length;
});

console.log(`\nTotal new words injected: ${totalNew}`);

// ================================================================
// 6. Final count
// ================================================================

console.log('\nFinal counts:');
let grandTotal = 0;
levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(result);
  if (!match) return;
  
  const endPos = findBlockEnd(result, match.index);
  if (endPos === -1) return;
  
  const block = result.substring(match.index, endPos + 1);
  const entries = block.match(/\[\s*'[^']+'/g) || [];
  const words = entries.filter(e => {
    const p = e.match(/'([^']+)'/);
    return p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1]);
  });
  
  const status = words.length >= targets[lvl] ? '✓' : '✗';
  console.log(`  ${lvl}: ${words.length}/${targets[lvl]} ${status}`);
  grandTotal += words.length;
});
console.log(`Total: ${grandTotal} (target: 5000+)`);

// ================================================================
// 7. Write if successful
// ================================================================

if (totalNew > 0) {
  fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', result, 'utf8');
  console.log('\n✓ File saved!');
} else {
  console.log('\n✗ No words injected');
}