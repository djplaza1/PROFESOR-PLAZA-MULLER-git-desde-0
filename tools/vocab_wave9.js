/**
 * tools/vocab_wave9.js
 * Wave final (~380 palabras) para superar 5,000
 * Temas: números ordinales, tiempo, preposiciones complejas,
 * naturaleza/animales, emociones, profesiones, comida misc
 */

const fs = require('fs');
const path = require('path');
const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');

const W9 = {};

// Tema: Números ordinales + fecha (A1)
W9['A1.2'] = [
  ['dieEins','uno','die','Einsen','n'],['dieZwei','dos','die','Zweien','n'],['dieDrei','tres','die','Dreien','n'],
  ['dieVier','cuatro','die','Vieren','n'],['dieFünf','cinco','die','Fünfen','n'],['dieSechs','seis','die','Sechsen','n'],
  ['dieSieben','siete','die','Siebnen','n'],['dieAcht','ocho','die','Achten','n'],['dieNeun','nueve','die','Neunen','n'],
  ['dieZehn','diez','die','Zehnen','n'],['dieElf','once','die','Elfen','n'],['dieZwölf','doce','die','Zwölfen','n'],
  ['derJanuar','enero','der','Januare','n'],['derFebruar','febrero','der','Februare','n'],['derMärz','marzo','der','Märze','n'],
  ['derApril','abril','der','Aprile','n'],['derMai','mayo','der','Maie','n'],['derJuni','junio','der','Junis','n'],
  ['derJuli','julio','der','Julis','n'],['derAugust','agosto','der','Auguste','n'],['derSeptember','septiembre','der','September','n'],
  ['derOktober','octubre','der','Oktober','n'],['derNovember','noviembre','der','November','n'],['derDezember','diciembre','der','Dezember','n'],
  ['derFrühling','primavera','der','Frühlinge','n'],['derSommer','verano','der','Sommer','n'],['derHerbst','otoño','der','Herbste','n'],
  ['derWinter','invierno','der','Winter','n'],['derMorgen','mañana','der','Morgen','n'],['derMittag','mediodía','der','Mittage','n'],
  ['derNachmittag','tarde','der','Nachmittage','n'],['derAbend','tarde/noche','der','Abende','n'],['dieNacht','noche','die','Nächte','n'],
  ['dieMitternacht','medianoche','die','Mitternächte','n'],['derVormittag','mañana temprano','der','Vormittage','n'],['derTag','día','der','Tage','n'],
  ['dieWoche','semana','die','Wochen','n'],['derMonat','mes','der','Monate','n'],['dasJahr','año','das','Jahre','n'],
  ['dasJahrzehnt','década','das','Jahrzehnte','n'],['dasJahrhundert','siglo','das','Jahrhunderte','n'],['dasJahrtausend','milenio','das','Jahrtausende','n'],
  ['gestern','ayer','-','-','adv'],['heute','hoy','-','-','adv'],['morgen','mañana','-','-','adv'],
  ['übermorgen','pasado mañana','-','-','adv'],['vorgestern','anteayer','-','-','adv'],['heuteAbend','esta tarde','-','-','adv'],
  ['heuteMorgen','esta mañana','-','-','adv'],['heuteNacht','esta noche','-','-','adv'],['täglich','diario','-','-','adj'],
  ['wöchentlich','semanal','-','-','adj'],['monatlich','mensual','-','-','adj'],['jährlich','anual','-','-','adj'],
  ['derGeburtstag','cumpleaños','der','Geburtstage','n'],['derFeiertag','día festivo','der','Feiertage','n'],['derJahrestag','aniversario','der','Jahrestage','n'],
  ['derUrlaub','vacaciones','der','Urlaube','n'],['dieFerien','vacaciones','die','Ferien','n'],['derTermin','cita','der','Termine','n'],
];

// Tema: Preposiciones complejas + locuciones (B1-B2)
W9['B1.3'] = [
  ['entlang','a lo largo de','-','-','prp'],['gegenüber','frente a','-','-','prp'],['innerhalb','dentro de','-','-','prp'],
  ['außerhalb','fuera de','-','-','prp'],['oberhalb','por encima de','-','-','prp'],['unterhalb','por debajo de','-','-','prp'],
  ['diesseits','de este lado','-','-','prp'],['jenseits','al otro lado','-','-','prp'],['beiderseits','a ambos lados','-','-','prp'],
  ['längs','a lo largo de','-','-','prp'],['quer','a través de','-','-','prp'],['mithilfe','con ayuda de','-','-','prp'],
  ['anhand','basándose en','-','-','prp'],['infolge','a consecuencia de','-','-','prp'],['trotz','a pesar de','-','-','prp'],
  ['wegen','debido a','-','-','prp'],['aufgrund','debido a','-','-','prp'],['zwecks','con el fin de','-','-','prp'],
  ['zugunsten','en favor de','-','-','prp'],['anstelle','en lugar de','-','-','prp'],['statt','en vez de','-','-','prp'],
  ['während','durante','-','-','prp'],['angesichts','en vista de','-','-','prp'],['hinsichtlich','en cuanto a','-','-','prp'],
  ['bezüglich','referente a','-','-','prp'],['betreffs','en relación a','-','-','prp'],['einschließlich','incluyendo','-','-','prp'],
  ['ausschließlich','excluyendo','-','-','prp'],['samt','junto con','-','-','prp'],['mitsamt','junto con','-','-','prp'],
  ['nebst','además de','-','-','prp'],['unweit','no lejos de','-','-','prp'],['nahe','cerca de','-','-','prp'],
  ['fern','lejos de','-','-','prp'],['abseits','apartado de','-','-','prp'],['um...herum','alrededor de','-','-','prp'],
  ['bis zu','hasta','-','-','prp'],['von...an','desde','-','-','prp'],['ab','a partir de','-','-','prp'],
];

// Tema: Naturaleza/Animales (A2-B1)
W9['A2.3'] = [
  ['derHund','perro','der','Hunde','n'],['dieKatze','gato','die','Katzen','n'],['dasPferd','caballo','das','Pferde','n'],
  ['dieKuh','vaca','die','Kühe','n'],['dasSchwein','cerdo','das','Schweine','n'],['dasSchaf','oveja','das','Schafe','n'],
  ['dieZiege','cabra','die','Ziegen','n'],['dasHuhn','gallina','das','Hühner','n'],['derHahn','gallo','der','Hähne','n'],
  ['dieEnte','pato','die','Enten','n'],['dieGans','ganso','die','Gänse','n'],['derFisch','pez','der','Fische','n'],
  ['derVogel','pájaro','der','Vögel','n'],['derAdler','águila','der','Adler','n'],['dieEule','búho','die','Eulen','n'],
  ['derFalke','halcón','der','Falken','n'],['derSchwan','cisne','der','Schwäne','n'],['dieTaube','paloma','die','Tauben','n'],
  ['derSpatz','gorrión','der','Spatzen','n'],['dieMöwe','gaviota','die','Möwen','n'],['derPinguin','pingüino','der','Pinguine','n'],
  ['derBär','oso','der','Bären','n'],['derWolf','lobo','der','Wölfe','n'],['derFuchs','zorro','der','Füchse','n'],
  ['derHase','liebre','der','Hasen','n'],['dasKaninchen','conejo','das','Kaninchen','n'],['dasEichhörnchen','ardilla','das','Eichhörnchen','n'],
  ['derIgel','erizo','der','Igel','n'],['dieMaus','ratón','die','Mäuse','n'],['dieRatte','rata','die','Ratten','n'],
  ['dieFledermaus','murciélago','die','Fledermäuse','n'],['derWal','ballena','der','Wale','n'],['derDelfin','delfín','der','Delfine','n'],
  ['derHai','tiburón','der','Haie','n'],['dieRobbe','foca','die','Robben','n'],['derSeehund','foca','der','Seehunde','n'],
  ['dieSchlange','serpiente','die','Schlangen','n'],['dieEidechse','lagartija','die','Eidechsen','n'],['dieSchildkröte','tortuga','die','Schildkröten','n'],
  ['derFrosch','rana','der','Frösche','n'],['dieKröte','sapo','die','Kröten','n'],['dieBiene','abeja','die','Bienen','n'],
  ['derSchmetterling','mariposa','der','Schmetterlinge','n'],['derKäfer','escarabajo','der','Käfer','n'],['dieAmeise','hormiga','die','Ameisen','n'],
  ['dieFliege','mosca','die','Fliegen','n'],['dieMücke','mosquito','die','Mücken','n'],['dieSpinne','araña','die','Spinnen','n'],
  ['derBaum','árbol','der','Bäume','n'],['dieBlume','flor','die','Blumen','n'],['derWald','bosque','der','Wälder','n'],
  ['dieWiese','prado','die','Wiesen','n'],['derBerg','montaña','der','Berge','n'],['derHügel','colina','der','Hügel','n'],
  ['derFluss','río','der','Flüsse','n'],['derSee','lago','der','Seen','n'],['dasMeer','mar','das','Meere','n'],
  ['derOzean','océano','der','Ozeane','n'],['dieInsel','isla','die','Inseln','n'],['dieWüste','desierto','die','Wüsten','n'],
];

// Tema: Emociones/Estado de ánimo (B1)
W9['B1.5'] = [
  ['glücklich','feliz','-','-','adj'],['traurig','triste','-','-','adj'],['wütend','enfadado','-','-','adj'],
  ['verärgert','molesto','-','-','adj'],['entspannt','relajado','-','-','adj'],['gestresst','estresado','-','-','adj'],
  ['aufgeregt','emocionado','-','-','adj'],['ruhig','tranquilo','-','-','adj'],['nervös','nervioso','-','-','adj'],
  ['ängstlich','ansioso','-','-','adj'],['mutig','valiente','-','-','adj'],['feige','cobarde','-','-','adj'],
  ['stolz','orgulloso','-','-','adj'],['bescheiden','humilde','-','-','adj'],['neidisch','envidioso','-','-','adj'],
  ['eifersüchtig','celoso','-','-','adj'],['dankbar','agradecido','-','-','adj'],['zufrieden','satisfecho','-','-','adj'],
  ['unzufrieden','insatisfecho','-','-','adj'],['enttäuscht','decepcionado','-','-','adj'],['begeistert','entusiasmado','-','-','adj'],
  ['gelangweilt','aburrido','-','-','adj'],['müde','cansado','-','-','adj'],['erschöpft','agotado','-','-','adj'],
  ['energisch','enérgico','-','-','adj'],['schüchtern','tímido','-','-','adj'],['selbstbewusst','seguro de sí mismo','-','-','adj'],
  ['unsicher','inseguro','-','-','adj'],['überrascht','sorprendido','-','-','adj'],['verwirrt','confundido','-','-','adj'],
  ['verlegen','avergonzado','-','-','adj'],['beschämt','avergonzado','-','-','adj'],['schuldig','culpable','-','-','adj'],
  ['unschuldig','inocente','-','-','adj'],['einsam','solitario','-','-','adj'],['verliebt','enamorado','-','-','adj'],
  ['romantisch','romántico','-','-','adj'],['leidenschaftlich','apasionado','-','-','adj'],['gleichgültig','indiferente','-','-','adj'],
  ['optimistisch','optimista','-','-','adj'],['pessimistisch','pesimista','-','-','adj'],['realistisch','realista','-','-','adj'],
  ['neugierig','curioso','-','-','adj'],['interessiert','interesado','-','-','adj'],['desinteressiert','desinteresado','-','-','adj'],
  ['hoffnungsvoll','esperanzado','-','-','adj'],['hoffnungslos','desesperado','-','-','adj'],['verzweifelt','desesperado','-','-','adj'],
];

// Tema: Profesiones misc adicionales (A2-B1)
W9['A2.4'] = [
  ['derIngenieur','ingeniero','der','Ingenieure','n'],['dieIngenieurin','ingeniera','die','Ingenieurinnen','n'],['derAnwalt','abogado','der','Anwälte','n'],
  ['dieAnwältin','abogada','die','Anwältinnen','n'],['derRichter','juez','der','Richter','n'],['dieRichterin','jueza','die','Richterinnen','n'],
  ['derPolizist','policía','der','Polizisten','n'],['diePolizistin','policía','die','Polizistinnen','n'],['derFeuerwehrmann','bombero','der','Feuerwehrmänner','n'],
  ['dieFeuerwehrfrau','bombera','die','Feuerwehrfrauen','n'],['derKoch','cocinero','der','Köche','n'],['dieKöchin','cocinera','die','Köchinnen','n'],
  ['derKellner','camarero','der','Kellner','n'],['dieKellnerin','camarera','die','Kellnerinnen','n'],['derFriseur','peluquero','der','Friseure','n'],
  ['dieFriseurin','peluquera','die','Friseurinnen','n'],['derMaler','pintor','der','Maler','n'],['dieMalerin','pintora','die','Malerinnen','n'],
  ['derSchreiner','carpintero','der','Schreiner','n'],['dieSchreinerin','carpintera','die','Schreinerinnen','n'],['derElektriker','electricista','der','Elektriker','n'],
  ['derMechaniker','mecánico','der','Mechaniker','n'],['derSoldat','soldado','der','Soldaten','n'],['dieSoldatin','soldada','die','Soldatinnen','n'],
  ['derPilot','piloto','der','Piloten','n'],['diePilotin','piloto','die','Pilotinnen','n'],['derKapitän','capitán','der','Kapitäne','n'],
  ['dieKapitänin','capitana','die','Kapitäninnen','n'],['derJournalist','periodista','der','Journalisten','n'],['dieJournalistin','periodista','die','Journalistinnen','n'],
  ['derRedakteur','redactor','der','Redakteure','n'],['dieRedakteurin','redactora','die','Redakteurinnen','n'],['derGeschäftsmann','empresario','der','Geschäftsmänner','n'],
  ['dieGeschäftsfrau','empresaria','die','Geschäftsfrauen','n'],['derDolmetscher','intérprete','der','Dolmetscher','n'],['dieDolmetscherin','intérprete','die','Dolmetscherinnen','n'],
  ['derÜbersetzer','traductor','der','Übersetzer','n'],['dieÜbersetzerin','traductora','die','Übersetzerinnen','n'],['derArchitekt','arquitecto','der','Architekten','n'],
  ['dieArchitektin','arquitecta','die','Architektinnen','n'],['derDesigner','diseñador','der','Designer','n'],['dieDesignerin','diseñadora','die','Designerinnen','n'],
  ['derMusiker','músico','der','Musiker','n'],['dieMusikerin','música','die','Musikerinnen','n'],['derSchauspieler','actor','der','Schauspieler','n'],
  ['dieSchauspielerin','actriz','die','Schauspielerinnen','n'],['derKünstler','artista','der','Künstler','n'],['dieKünstlerin','artista','die','Künstlerinnen','n'],
  ['derSchriftsteller','escritor','der','Schriftsteller','n'],['dieSchriftstellerin','escritora','die','Schriftstellerinnen','n'],

];

// Tema: Comida misc adicional (A1-A2)
W9['A1.4'] = [
  ['derApfelsaft','zumo de manzana','der','Apfelsäfte','n'],['derOrangensaft','zumo de naranja','der','Orangensäfte','n'],['dasMineralwasser','agua mineral','das','Mineralwasser','n'],
  ['dieLimonade','limonada','die','Limonaden','n'],['derEistee','té frío','der','Eistees','n'],['derKakao','cacao','der','Kakaos','n'],
  ['derMilchkaffee','café con leche','der','Milchkaffees','n'],['derEspresso','espresso','der','Espressos','n'],['derCappuccino','capuchino','der','Cappuccinos','n'],
  ['derTee','té','der','Tees','n'],['dieSchokolade','chocolate','die','Schokoladen','n'],['derKeks','galleta','der','Kekse','n'],
  ['derKuchen','pastel','der','Kuchen','n'],['derMuffin','magdalena','der','Muffins','n'],['derBrownie','brownie','der','Brownies','n'],
  ['dieWaffel','gofre','die','Waffeln','n'],['dasEis','helado','das','Eis','n'],['derJoghurt','yogur','der','Joghurts','n'],
  ['derQuark','requesón','der','Quarke','n'],['derKäse','queso','der','Käsesorten','n'],['dieButter','mantequilla','die','Butter','n'],
  ['dieMargarine','margarina','die','Margarinen','n'],['dasÖl','aceite','das','Öle','n'],['derEssig','vinagre','der','Essige','n'],
  ['derSenf','mostaza','der','Senfe','n'],['derKetchup','kétchup','der','Ketchups','n'],['dieMayonnaise','mayonesa','die','Mayonnaisen','n'],
  ['dieMarmelade','mermelada','die','Marmeladen','n'],['derHonig','miel','der','Honige','n'],['dieMarmelade','mermelada','die','Marmeladen','n'],
  ['dieNuss','nuez','die','Nüsse','n'],['dieMandel','almendra','die','Mandeln','n'],['dieErdnuss','cacahuete','die','Erdnüsse','n'],
  ['dieHaselnuss','avellana','die','Haselnüsse','n'],['dieWalnuss','nuez','die','Walnüsse','n'],['dieRosine','pasa','die','Rosine','n'],
  ['dieBanane','plátano','die','Bananen','n'],['derPfirsich','melocotón','der','Pfirsiche','n'],['dieKirsche','cereza','die','Kirschen','n'],
  ['dieErdbeere','fresa','die','Erdbeeren','n'],['dieHimbeere','frambuesa','die','Himbeeren','n'],['dieBlaubeere','arándano','die','Blaubeeren','n'],
  ['dieWeintraube','uva','die','Weintrauben','n'],['dieAnanas','piña','die','Ananas','n'],['dieMango','mango','die','Mangos','n'],
  ['dieKiwi','kiwi','die','Kiwis','n'],['dieZitrone','limón','die','Zitronen','n'],['dieOrange','naranja','die','Orangen','n'],
  ['derApfel','manzana','der','Äpfel','n'],['dieBirne','pera','die','Birnen','n'],['diePflaume','ciruela','die','Pflaumen','n'],
  ['dieMelone','melón','die','Melonen','n'],['dieWassermelone','sandía','die','Wassermelonen','n'],['dieGrapefruit','pomelo','die','Grapefruits','n'],
];

// Tema: Verbos cotidianos misc adicionales (A1-A2)
W9['A1.5'] = [
  ['weitermachen','continuar','-','-','v'],['aufmachen','abrir','-','-','v'],['zumachen','cerrar','-','-','v'],
  ['anmachen','encender','-','-','v'],['ausmachen','apagar','-','-','v'],['aufräumen','ordenar','-','-','v'],
  ['abwaschen','lavar platos','-','-','v'],['abtrocknen','secar','-','-','v'],['staubsaugen','aspirar','-','-','v'],
  ['aufhängen','colgar','-','-','v'],['abholen','recoger','-','-','v'],['einladen','invitar','-','-','v'],
  ['ausleihen','prestar','-','-','v'],['zurückgeben','devolver','-','-','v'],['reparieren','reparar','-','-','v'],
  ['kaputtmachen','romper','-','-','v'],['wegwerfen','tirar','-','-','v'],['aufheben','guardar','-','-','v'],
  ['einpacken','empaquetar','-','-','v'],['auspacken','desempaquetar','-','-','v'],['umziehen','mudarse','-','-','v'],
  ['anziehen','vestirse','-','-','v'],['ausziehen','desvestirse','-','-','v'],['mitbringen','traer','-','-','v'],
  ['mitnehmen','llevar','-','-','v'],['wegbringen','llevarse','-','-','v'],['hinsetzen','sentarse','-','-','v'],
  ['aufstehen','levantarse','-','-','v'],['einsteigen','subir (transp.)','-','-','v'],['aussteigen','bajar (transp.)','-','-','v'],
  ['umsteigen','transbordar','-','-','v'],['einparken','aparcar','-','-','v'],['ausparken','salir del aparcamiento','-','-','v'],
  ['tanken','echar gasolina','-','-','v'],['parken','aparcar','-','-','v'],['laden','cargar','-','-','v'],
  ['drucken','imprimir','-','-','v'],['kopieren','copiar','-','-','v'],['scannen','escanear','-','-','v'],
  ['speichern','guardar (archivo)','-','-','v'],['löschen','borrar','-','-','v'],['hochladen','subir (archivo)','-','-','v'],
  ['herunterladen','descargar','-','-','v'],['aktualisieren','actualizar','-','-','v'],['installieren','instalar','-','-','v'],
  ['kochen','cocinar','-','-','v'],['braten','freír','-','-','v'],['backen','hornear','-','-','v'],
  ['dämpfen','vapor','-','-','v'],['grillen','asar a la parrilla','-','-','v'],['schneiden','cortar','-','-','v'],
  ['schälen','pelar','-','-','v'],['würzen','sazonar','-','-','v'],['mischen','mezclar','-','-','v'],
  ['probieren','probar','-','-','v'],['abschmecken','sazonar','-','-','v'],['bestreichen','untar','-','-','v'],
];

const NIVELES_ORDER = ['A1.2','A1.4','A1.5','A2.3','A2.4','B1.3','B1.5'];

function generateCode() {
  let code = '';
  let total = 0;
  for (const level of NIVELES_ORDER) {
    const words = W9[level] || [];
    if (words.length === 0) continue;
    code += `addLevel('${level}', [\n`;
    for (const w of words) {
      code += `  ['${w[0]}','${w[1]}','${w[2]}','${w[3]}','${w[4]}'],\n`;
      total++;
    }
    code += ']);\n\n';
  }
  return { code, total };
}

const { code, total } = generateCode();
console.log(`Palabras generadas WAVE9: ${total}`);

// Read file
let content = fs.readFileSync(RUTA_FILE, 'utf8');
const insertPoint = content.lastIndexOf('// ══ FIN WAVE8');
const afterInsert = content.substring(insertPoint + '// ══ FIN WAVE8'.length);

const injection = `
// ══ WAVE9 (${total} palabras - números, tiempo, preposiciones, naturaleza, emociones, profesiones, comida, verbos misc)
${code}
// ══ FIN WAVE9
`;

fs.writeFileSync(RUTA_FILE, content.substring(0, insertPoint + '// ══ FIN WAVE8'.length) + injection + afterInsert, 'utf8');
console.log('✓ WAVE9 inyectado');

// Verify
const finalContent = fs.readFileSync(RUTA_FILE, 'utf8');
const totalWords = (finalContent.match(/\['([^']+)'/g) || []).length;
console.log(`\nTotal palabras ahora: ${totalWords}`);