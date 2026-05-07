/**
 * tools/vocab_wave8.js
 * Wave final: ~750+ palabras para alcanzar 5,000
 * Temas: ropa, ciudad/edificios, colores, tiempo cronológico,
 * adverbios, preposiciones complejas, conjunciones, salud/cuerpo
 */

const fs = require('fs');
const path = require('path');
const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');

const W8 = {};

// Tema: Ropa/Accesorios (A1-A2)
W8['A1.3'] = [
  ['dasHemd','camisa','das','Hemden','n'],['dasTShirt','camiseta','das','TShirts','n'],['dieHose','pantalón','die','Hosen','n'],
  ['derRock','falda','der','Röcke','n'],['dasKleid','vestido','das','Kleider','n'],['dieJacke','chaqueta','die','Jacken','n'],
  ['derMantel','abrigo','der','Mäntel','n'],['derAnzug','traje','der','Anzüge','n'],['dieKrawatte','corbata','die','Krawatten','n'],
  ['derSchal','bufanda','der','Schals','n'],['dieMütze','gorro','die','Mützen','n'],['derHut','sombrero','der','Hüte','n'],
  ['dieHandschuhe','guantes','die','Handschuhe','n'],['derSchuh','zapato','der','Schuhe','n'],['derStiefel','bota','der','Stiefel','n'],
  ['dieSocke','calcetín','die','Socken','n'],['dieStrümpfe','medias','die','Strümpfe','n'],['derGürtel','cinturón','der','Gürtel','n'],
  ['dieTasche','bolso','die','Taschen','n'],['derRucksack','mochila','der','Rucksäcke','n'],['derKoffer','maleta','der','Koffer','n'],
  ['derRegenschirm','paraguas','der','Regenschirme','n'],['dieBrille','gafas','die','Brillen','n'],['dieUhr','reloj','die','Uhren','n'],
  ['derRing','anillo','der','Ringe','n'],['dieKette','cadena/collar','die','Ketten','n'],['derOhrring','pendiente','der','Ohrringe','n'],
  ['dasArmband','pulsera','das','Armbänder','n'],['Jeans','vaqueros','die','Jeans','n'],['derPullover','jersey','der','Pullover','n'],
  ['dieBluse','blusa','die','Blusen','n'],['dieBadehose','bañador','die','Badehosen','n'],['derBikini','bikini','der','Bikinis','n'],
  ['derPyjama','pijama','der','Pyjamas','n'],['derBademantel','albornoz','der','Bademäntel','n'],['derSchlafanzug','pijama','der','Schlafanzüge','n'],
];

// Tema: Ciudad/Edificios (A2-B1)
W8['A2.2'] = [
  ['dieKirche','iglesia','die','Kirchen','n'],['dieMoschee','mezquita','die','Moscheen','n'],['dieSynagoge','sinagoga','die','Synagogen','n'],
  ['derTempel','templo','der','Tempel','n'],['dieBurg','castillo','die','Burgen','n'],['dasSchloss','palacio','das','Schlösser','n'],
  ['derPlatz','plaza','der','Plätze','n'],['derMarkt','mercado','der','Märkte','n'],['derPark','parque','der','Parks','n'],
  ['derBahnhof','estación de tren','der','Bahnhöfe','n'],['derFlughafen','aeropuerto','der','Flughäfen','n'],['derHafen','puerto','der','Häfen','n'],
  ['dieBrücke','puente','die','Brücken','n'],['dieStraße','calle','die','Straßen','n'],['derWeg','camino','der','Wege','n'],
  ['dieAllee','avenida','die','Alleen','n'],['derKreuzung','cruce','die','Kreuzungen','n'],['dieAmpel','semáforo','die','Ampeln','n'],
  ['derBürgersteig','acera','der','Bürgersteige','n'],['derZebrastreifen','paso de cebra','der','Zebrastreifen','n'],['dieU-Bahn','metro','die','U-Bahnen','n'],
  ['derBusbahnhof','estación de autobuses','der','Busbahnhöfe','n'],['dasRathaus','ayuntamiento','das','Rathäuser','n'],['dieBibliothek','biblioteca','die','Bibliotheken','n'],
  ['dasMuseum','museo','das','Museen','n'],['dasTheater','teatro','das','Theater','n'],['dieOper','ópera','die','Opern','n'],
  ['dasKino','cine','das','Kinos','n'],['dasStadion','estadio','das','Stadien','n'],['dasSchwimmbad','piscina','das','Schwimmbäder','n'],
  ['dieTurnhalle','gimnasio','die','Turnhallen','n'],['derZoo','zoológico','der','Zoos','n'],['derBotanischerGarten','jardín botánico','der','BotanischeGärten','n'],
  ['derTierpark','parque zoológico','der','Tierparks','n'],['derVergnügungspark','parque de atracciones','der','Vergnügungsparks','n'],['dasKrankenhaus','hospital','das','Krankenhäuser','n'],
  ['diePraxis','consultorio','die','Praxen','n'],['dieApotheke','farmacia','die','Apotheken','n'],['dasRathaus','ayuntamiento','das','Rathäuser','n'],
  ['diePost','correos','die','Posten','n'],['dieBank','banco','die','Banken','n'],['diePolizei','policía','die','Polizeien','n'],
  ['dieFeuerwehr','bomberos','die','Feuerwehren','n'],['derKindergarten','guardería','der','Kindergärten','n'],['dieSchule','escuela','die','Schulen','n'],
  ['dieUniversität','universidad','die','Universitäten','n'],['dieHochschule','universidad','die','Hochschulen','n'],['dasWohnheim','residencia','das','Wohnheime','n'],
  ['derSupermarkt','supermercado','der','Supermärkte','n'],['dasKaufhaus','grandes almacenes','das','Kaufhäuser','n'],['derLaden','tienda','der','Läden','n'],
  ['dieBäckerei','panadería','die','Bäckereien','n'],['dieMetzgerei','carnicería','die','Metzgereien','n'],['dieBuchhandlung','librería','die','Buchhandlungen','n'],
];

// Tema: Colores + Formas (A1-A2)
W8['A1.1'] = [
  ['rot','rojo','-','-','adj'],['blau','azul','-','-','adj'],['grün','verde','-','-','adj'],['gelb','amarillo','-','-','adj'],
  ['schwarz','negro','-','-','adj'],['weiß','blanco','-','-','adj'],['grau','gris','-','-','adj'],['braun','marrón','-','-','adj'],
  ['pink','rosa','-','-','adj'],['lila','lila','-','-','adj'],['orange','naranja','-','-','adj'],['violett','violeta','-','-','adj'],
  ['türkis','turquesa','-','-','adj'],['beige','beis','-','-','adj'],['golden','dorado','-','-','adj'],['silbern','plateado','-','-','adj'],
  ['bunt','multicolor','-','-','adj'],['hell','claro','-','-','adj'],['dunkel','oscuro','-','-','adj'],['farbig','de color','-','-','adj'],
  ['dasDreieck','triángulo','das','Dreiecke','n'],['dasViereck','cuadrilátero','das','Vierecke','n'],['dasQuadrat','cuadrado','das','Quadrate','n'],
  ['dasRechteck','rectángulo','das','Rechtecke','n'],['derKreis','círculo','der','Kreise','n'],['dieKugel','esfera','die','Kugeln','n'],
  ['derWürfel','cubo','der','Würfel','n'],['derZylinder','cilindro','der','Zylinder','n'],['diePyramide','pirámide','die','Pyramiden','n'],
  ['derStern','estrella','der','Sterne','n'],['dasHerz','corazón','das','Herzen','n'],['dieLinie','línea','die','Linien','n'],
  ['derPunkt','punto','der','Punkte','n'],['dieKante','borde','die','Kanten','n'],['dieEcke','esquina','die','Ecken','n'],
];

// Tema: Cuerpo humano/Salud (B1)
W8['B1.2'] = [
  ['derKopf','cabeza','der','Köpfe','n'],['dasGesicht','cara','das','Gesichter','n'],['dasAuge','ojo','das','Augen','n'],
  ['dieNase','nariz','die','Nasen','n'],['derMund','boca','der','Münder','n'],['dasOhr','oído/oreja','das','Ohren','n'],
  ['derZahn','diente','der','Zähne','n'],['dieZunge','lengua','die','Zungen','n'],['derHals','cuello','der','Hälse','n'],
  ['dieSchulter','hombro','die','Schultern','n'],['derArm','brazo','der','Arme','n'],['derEllenbogen','codo','der','Ellenbogen','n'],
  ['dieHand','mano','die','Hände','n'],['derFinger','dedo','der','Finger','n'],['derDaumen','pulgar','der','Daumen','n'],
  ['derNagel','uña','der','Nägel','n'],['derBauch','vientre','der','Bäuche','n'],['derRücken','espalda','der','Rücken','n'],
  ['dasBein','pierna','das','Beine','n'],['dasKnie','rodilla','das','Knie','n'],['derFuß','pie','der','Füße','n'],
  ['dieFerse','talón','die','Fersen','n'],['dieHaut','piel','die','Häute','n'],['dasBlut','sangre','das','Blut','n'],
  ['dasHerz','corazón','das','Herzen','n'],['dieLunge','pulmón','die','Lungen','n'],['dieLeber','hígado','die','Lebern','n'],
  ['derMagen','estómago','der','Mägen','n'],['dieNiere','riñón','die','Nieren','n'],['dasGehirn','cerebro','das','Gehirne','n'],
  ['derKnochen','hueso','der','Knochen','n'],['derMuskel','músculo','der','Muskeln','n'],['dasFieber','fiebre','das','Fieber','n'],
  ['derHusten','tos','der','Husten','n'],['derSchnupfen','resfriado','der','Schnupfen','n'],['dieGrippe','gripe','die','Grippen','n'],
  ['dieErkältung','resfriado','die','Erkältungen','n'],['derSchmerz','dolor','der','Schmerzen','n'],['dieWunde','herida','die','Wunden','n'],
  ['dieTablette','pastilla','die','Tabletten','n'],['dieSalbe','pomada','die','Salben','n'],['derVerband','venda','der','Verbände','n'],
  ['derArzt','médico','der','Ärzte','n'],['dieÄrztin','médica','die','Ärztinnen','n'],['dieKrankenschwester','enfermera','die','Krankenschwestern','n'],
];

// Tema: Adverbios/Conectores (B1-B2)
W8['B1.4'] = [
  ['allerdings','sin embargo','-','-','adv'],['außerdem','además','-','-','adv'],['dennoch','no obstante','-','-','adv'],
  ['trotzdem','a pesar de ello','-','-','adv'],['jedoch','sin embargo','-','-','adv'],['allmählich','gradualmente','-','-','adv'],
  ['anscheinend','aparentemente','-','-','adv'],['offenbar','evidentemente','-','-','adv'],['tatsächlich','de hecho','-','-','adv'],
  ['eigentlich','en realidad','-','-','adv'],['ungefähr','aproximadamente','-','-','adv'],['mindestens','al menos','-','-','adv'],
  ['höchstens','como máximo','-','-','adv'],['fast','casi','-','-','adv'],['beinahe','casi','-','-','adv'],
  ['kaum','apenas','-','-','adv'],['durchaus','totalmente','-','-','adv'],['keineswegs','de ningún modo','-','-','adv'],
  ['absolut','absolutamente','-','-','adv'],['total','totalmente','-','-','adv'],['völlig','completamente','-','-','adv'],
  ['ziemlich','bastante','-','-','adv'],['recht','bastante','-','-','adv'],['besonders','especialmente','-','-','adv'],
  ['vor allem','sobre todo','-','-','adv'],['insbesondere','en particular','-','-','adv'],['hauptsächlich','principalmente','-','-','adv'],
  ['überwiegend','predominantemente','-','-','adv'],['größtenteils','en su mayoría','-','-','adv'],['teils','en parte','-','-','adv'],
  ['teilweise','parcialmente','-','-','adv'],['vollständig','completamente','-','-','adv'],['endlich','finalmente','-','-','adv'],
  ['schließlich','finalmente','-','-','adv'],['zunächst','al principio','-','-','adv'],['danach','después','-','-','adv'],
  ['später','más tarde','-','-','adv'],['sofort','inmediatamente','-','-','adv'],['plötzlich','de repente','-','-','adv'],
  ['inzwischen','mientras tanto','-','-','adv'],['mittlerweile','mientras tanto','-','-','adv'],['bisher','hasta ahora','-','-','adv'],
  ['bislang','hasta ahora','-','-','adv'],['seither','desde entonces','-','-','adv'],['künftig','en el futuro','-','-','adv'],
  ['zukünftig','en el futuro','-','-','adv'],['voraussichtlich','previsiblemente','-','-','adv'],['möglicherweise','posiblemente','-','-','adv'],
  ['wahrscheinlich','probablemente','-','-','adv'],['vermutlich','supuestamente','-','-','adv'],['zweifellos','sin duda','-','-','adv'],
  ['selbstverständlich','por supuesto','-','-','adv'],['natürlich','naturalmente','-','-','adv'],['übrigens','por cierto','-','-','adv'],
];

// Tema: Adjetivos calificativos adicionales (B2)
W8['B2.2'] = [
  ['auffällig','llamativo','-','-','adj'],['umfangreich','extenso','-','-','adj'],['gründlich','minucioso','-','-','adj'],
  ['oberflächlich','superficial','-','-','adj'],['angemessen','adecuado','-','-','adj'],['unangemessen','inadecuado','-','-','adj'],
  ['zweckmäßig','conveniente','-','-','adj'],['überflüssig','superfluo','-','-','adj'],['notwendig','necesario','-','-','adj'],
  ['erforderlich','requerido','-','-','adj'],['entbehrlich','prescindible','-','-','adj'],['verfügbar','disponible','-','-','adj'],
  ['zugänglich','accesible','-','-','adj'],['unzugänglich','inaccesible','-','-','adj'],['verständlich','comprensible','-','-','adj'],
  ['unverständlich','incomprensible','-','-','adj'],['glaubwürdig','creíble','-','-','adj'],['unglaubwürdig','increíble','-','-','adj'],
  ['wahrscheinlich','probable','-','-','adj'],['unwahrscheinlich','improbable','-','-','adj'],['möglich','posible','-','-','adj'],
  ['unmöglich','imposible','-','-','adj'],['wirksam','eficaz','-','-','adj'],['unwirksam','ineficaz','-','-','adj'],
  ['effizient','eficiente','-','-','adj'],['produktiv','productivo','-','-','adj'],['rentabel','rentable','-','-','adj'],
  ['lukrativ','lucrativo','-','-','adj'],['nachhaltig','sostenible','-','-','adj'],['umweltfreundlich','ecológico','-','-','adj'],
  ['schädlich','dañino','-','-','adj'],['ungiftig','no tóxico','-','-','adj'],['verdorben','estropeado','-','-','adj'],
  ['zuverlässig','fiable','-','-','adj'],['unzuverlässig','no fiable','-','-','adj'],['kompetent','competente','-','-','adj'],
  ['inkompetent','incompetente','-','-','adj'],['qualifiziert','cualificado','-','-','adj'],['ungeeignet','no apto','-','-','adj'],
  ['angesehen','respetado','-','-','adj'],['verantwortlich','responsable','-','-','adj'],['verantwortungslos','irresponsable','-','-','adj'],
  ['vernünftig','razonable','-','-','adj'],['unvernünftig','irrazonable','-','-','adj'],['logisch','lógico','-','-','adj'],
  ['kreativ','creativo','-','-','adj'],['originell','original','-','-','adj'],['durchschnittlich','promedio','-','-','adj'],
  ['außergewöhnlich','extraordinario','-','-','adj'],['einzigartig','único','-','-','adj'],['typisch','típico','-','-','adj'],
  ['untypisch','atípico','-','-','adj'],['merkwürdig','extraño','-','-','adj'],['seltsam','raro','-','-','adj'],
  ['gewöhnlich','normal','-','-','adj'],['ungewohnt','desacostumbrado','-','-','adj'],['vertraut','familiar','-','-','adj'],
  ['fremd','ajeno','-','-','adj'],['bekannt','conocido','-','-','adj'],['unbekannt','desconocido','-','-','adj'],
];

// Tema: Verbos de movimiento (A2-B1)
W8['A2.1'] = [
  ['fliegen','volar','-','-','v'],['schwimmen','nadar','-','-','v'],['klettern','escalar','-','-','v'],
  ['tauchen','bucear','-','-','v'],['springen','saltar','-','-','v'],['rennen','correr','-','-','v'],
  ['kriechen','gatear','-','-','v'],['rutschen','deslizarse','-','-','v'],['fallen','caer','-','-','v'],
  ['steigen','subir','-','-','v'],['sinken','hundirse','-','-','v'],['schweben','flotar','-','-','v'],
  ['gleiten','deslizarse','-','-','v'],['stolpern','tropezar','-','-','v'],['ausrutschen','resbalar','-','-','v'],
  ['wandern','hacer senderismo','-','-','v'],['radfahren','montar en bici','-','-','v'],['reisen','viajar','-','-','v'],
  ['umsteigen','transbordar','-','-','v'],['abfahren','salir (vehículo)','-','-','v'],['ankommen','llegar','-','-','v'],
  ['abfliegen','despegar','-','-','v'],['landen','aterrizar','-','-','v'],['einchecken','facturar','-','-','v'],
  ['auschecken','salir','-','-','v'],['buchen','reservar','-','-','v'],['stornieren','cancelar','-','-','v'],
  ['verschieben','posponer','-','-','v'],['absagen','cancelar','-','-','v'],['stattfinden','tener lugar','-','-','v'],
  ['teilnehmen','participar','-','-','v'],['mitmachen','participar','-','-','v'],['zusehen','mirar','-','-','v'],
  ['zuhören','escuchar','-','-','v'],['mitreden','participar en conversación','-','-','v'],['nachfragen','preguntar','-','-','v'],
];

// Tema: Ciencia/Naturaleza (B2-C1)
W8['B2.4'] = [
  ['diePhysik','física','die','Physiken','n'],['dieChemie','química','die','Chemien','n'],['dieBiologie','biología','die','Biologien','n'],
  ['dieMathematik','matemáticas','die','Mathematiken','n'],['dieAstronomie','astronomía','die','Astronomien','n'],['dieGeologie','geología','die','Geologien','n'],
  ['diePsychologie','psicología','die','Psychologien','n'],['dieSoziologie','sociología','die','Soziologien','n'],['diePhilosophie','filosofía','die','Philosophien','n'],
  ['dieÖkonomie','economía','die','Ökonomien','n'],['dieStatistik','estadística','die','Statistiken','n'],['dasExperiment','experimento','das','Experimente','n'],
  ['dieForschung','investigación','die','Forschungen','n'],['dieWissenschaft','ciencia','die','Wissenschaften','n'],['derWissenschaftler','científico','der','Wissenschaftler','n'],
  ['dasLabor','laboratorio','das','Labore','n'],['dieMikroskop','microscopio','das','Mikroskope','n'],['dieProbe','muestra','die','Proben','n'],
  ['dieAnalyse','análisis','die','Analysen','n'],['dieSynthese','síntesis','die','Synthesen','n'],['dieHypothese','hipótesis','die','Hypothesen','n'],
  ['dieTheorie','teoría','die','Theorien','n'],['diePraxis','práctica','die','Praxen','n'],['dieMethode','método','die','Methoden','n'],
  ['dieTechnik','técnica','die','Techniken','n'],['dieTechnologie','tecnología','die','Technologien','n'],['dasElement','elemento','das','Elemente','n'],
  ['dieZelle','célula','die','Zellen','n'],['dasAtom','átomo','das','Atome','n'],['dasMolekül','molécula','das','Moleküle','n'],
  ['dieEnergie','energía','die','Energien','n'],['dieKraft','fuerza','die','Kräfte','n'],['dieMasse','masa','die','Massen','n'],
  ['dieGeschwindigkeit','velocidad','die','Geschwindigkeiten','n'],['dieBeschleunigung','aceleración','die','Beschleunigungen','n'],['dieSchwerkraft','gravedad','die','Schwerkräfte','n'],
  ['dieWärme','calor','die','Wärmen','n'],['dieKälte','frío','die','Kälten','n'],['derDruck','presión','der','Drücke','n'],
  ['dieSpannung','tensión','die','Spannungen','n'],['derStrom','corriente','der','Ströme','n'],['dieWellen','ondas','die','Wellen','n'],
  ['dasMagnetfeld','campo magnético','das','Magnetfelder','n'],['dieStrahlung','radiación','die','Strahlungen','n'],['dieEvolution','evolución','die','Evolutionen','n'],
  ['dasKlima','clima','das','Klimate','n'],['dieUmwelt','medio ambiente','die','Umwelten','n'],['dieArt','especie','die','Arten','n'],
  ['dasÖkosystem','ecosistema','das','Ökosysteme','n'],['dieBiodiversität','biodiversidad','die','Biodiversitäten','n'],['derLebensraum','hábitat','der','Lebensräume','n'],
];

const NIVELES_ORDER = ['A1.1','A1.2','A1.3','A2.1','A2.2','B1.2','B1.4','B2.2','B2.4'];

function generateCode() {
  let code = '';
  let total = 0;
  for (const level of NIVELES_ORDER) {
    const words = W8[level] || [];
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
console.log(`Palabras generadas WAVE8: ${total}`);

// Read file
let content = fs.readFileSync(RUTA_FILE, 'utf8');
const insertPoint = content.lastIndexOf('// ══ FIN WAVE7');
const afterInsert = content.substring(insertPoint + '// ══ FIN WAVE7'.length);

const injection = `
// ══ WAVE8 (${total} palabras - ropa, ciudad, colores, cuerpo, adverbios, ciencia)
${code}
// ══ FIN WAVE8
`;

fs.writeFileSync(RUTA_FILE, content.substring(0, insertPoint + '// ══ FIN WAVE7'.length) + injection + afterInsert, 'utf8');
console.log('✓ WAVE8 inyectado');

// Verify
const finalContent = fs.readFileSync(RUTA_FILE, 'utf8');
const totalWords = (finalContent.match(/\['([^']+)'/g) || []).length;
console.log(`\nTotal palabras ahora: ${totalWords}`);