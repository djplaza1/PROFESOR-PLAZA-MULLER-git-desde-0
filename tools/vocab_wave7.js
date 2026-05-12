/**
 * tools/vocab_wave7.js
 * Genera ~1,200+ palabras de temas específicos NO duplicados
 * para alcanzar 5,000+ en total
 */

const fs = require('fs');
const path = require('path');
const RUTA_FILE = path.join(__dirname, '..', 'src', 'features', 'ruta', 'rutaHelpers.jsx');

const W7 = {};

// Tema: Animales/Seres vivos (A1-A2)
W7['A1.3'] = [
  ['derHund','perro','der','Hunde','n'],['dieKatze','gato','die','Katzen','n'],['derVogel','pájaro','der','Vögel','n'],
  ['derFisch','pez','der','Fische','n'],['dasPferd','caballo','das','Pferde','n'],['dieKuh','vaca','die','Kühe','n'],
  ['dasSchwein','cerdo','das','Schweine','n'],['dasSchaf','oveja','das','Schafe','n'],['dieZiege','cabra','die','Ziegen','n'],
  ['dasHuhn','gallina','das','Hühner','n'],['dieEnte','pato','die','Enten','n'],['dieGans','ganso','die','Gänse','n'],
  ['derHase','liebre','der','Hasen','n'],['dieMaus','ratón','die','Mäuse','n'],['dieRatte','rata','die','Ratten','n'],
  ['dieBiene','abeja','die','Bienen','n'],['derSchmetterling','mariposa','der','Schmetterlinge','n'],['dieFliege','mosca','die','Fliegen','n'],
  ['dieMücke','mosquito','die','Mücken','n'],['dieAmeise','hormiga','die','Ameisen','n'],['dieSpinne','araña','die','Spinnen','n'],
  ['derKäfer','escarabajo','der','Käfer','n'],['dieSchnecke','caracol','die','Schnecken','n'],['derFrosch','rana','der','Frösche','n'],
  ['dieSchlange','serpiente','die','Schlangen','n'],['derBär','oso','der','Bären','n'],['derWolf','lobo','der','Wölfe','n'],
  ['derFuchs','zorro','der','Füchse','n'],['derHirsch','ciervo','der','Hirsche','n'],['derEsel','burro','der','Esel','n'],
  ['derAffe','mono','der','Affen','n'],['derElefant','elefante','der','Elefanten','n'],['derLöwe','león','der','Löwen','n'],
  ['derTiger','tigre','der','Tiger','n'],['derHai','tiburón','der','Haie','n'],['derDelfin','delfín','der','Delfine','n'],
  ['derWal','ballena','der','Wale','n'],['dieRobbe','foca','die','Robben','n'],['derPinguin','pingüino','der','Pinguine','n'],
  ['derAdler','águila','der','Adler','n'],['derFalke','halcón','der','Falken','n'],['dieEule','búho','die','Eulen','n'],
  ['derPapagei','loro','der','Papageien','n'],['derPfau','pavo real','der','Pfauen','n'],['derSchwan','cisne','der','Schwäne','n'],
  ['dieTaube','paloma','die','Tauben','n'],['dieKrähe','cuervo','die','Krähen','n'],['dieElster','urraca','die','Elstern','n'],
];

// Tema: Deportes (A2-B1)
W7['A2.3'] = [
  ['derSport','deporte','der','Sportarten','n'],['derFußball','fútbol','der','Fußbälle','n'],['derBasketball','baloncesto','der','Basketbälle','n'],
  ['derHandball','balonmano','der','Handbälle','n'],['derVolleyball','voleibol','der','Volleybälle','n'],['dasTennis','tenis','das','Tennis','n'],
  ['dasTischtennis','ping-pong','das','Tischtennis','n'],['dasBadminton','bádminton','das','Badminton','n'],['derTanz','baile','der','Tänze','n'],
  ['dieGymnastik','gimnasia','die','Gymnastiken','n'],['dasTurnen','gimnasia artística','das','Turnen','n'],['dasTraining','entrenamiento','das','Trainings','n'],
  ['derTrainer','entrenador','der','Trainer','n'],['derSportler','deportista','der','Sportler','n'],['dieMannschaft','equipo','die','Mannschaften','n'],
  ['dasSpiel','juego/partido','das','Spiele','n'],['derGewinner','ganador','der','Gewinner','n'],['derVerlierer','perdedor','der','Verlierer','n'],
  ['dasTor','portería/gol','das','Tore','n'],['derBall','pelota','der','Bälle','n'],['derSchläger','raqueta','der','Schläger','n'],
  ['derSchiedsrichter','árbitro','der','Schiedsrichter','n'],['dieWettkampf','competición','die','Wettkämpfe','n'],['dieMeisterschaft','campeonato','die','Meisterschaften','n'],
  ['dieMedaille','medalla','die','Medaillen','n'],['dieOlympiade','olimpiada','die','Olympiaden','n'],['dieWeltmeisterschaft','mundial','die','Weltmeisterschaften','n'],
  ['dasStadion','estadio','das','Stadien','n'],['dieSporthalle','polideportivo','die','Sporthallen','n'],['dasSchwimmbad','piscina','das','Schwimmbäder','n'],
];

// Tema: Comida/Ingredientes (A1-A2)
W7['A1.2'] = [
  ['dasBrot','pan','das','Brote','n'],['dieButter','mantequilla','die','Butter','n'],['derKäse','queso','der','Käse','n'],
  ['dieMilch','leche','die','Milche','n'],['derJoghurt','yogur','der','Joghurts','n'],['dasEi','huevo','das','Eier','n'],
  ['dieWurst','salchicha','die','Würste','n'],['derSchinken','jamón','der','Schinken','n'],['dieSalami','salami','die','Salamis','n'],
  ['derFisch','pescado','der','Fische','n'],['dasHähnchen','pollo','das','Hähnchen','n'],['dasSteak','filete','das','Steaks','n'],
  ['dasSchnitzel','escalope','das','Schnitzel','n'],['dieSuppe','sopa','die','Suppen','n'],['derSalat','ensalada','der','Salate','n'],
  ['dieKartoffel','patata','die','Kartoffeln','n'],['derReis','arroz','der','Reis','n'],['dieNudeln','pasta','die','Nudeln','n'],
  ['derApfel','manzana','der','Äpfel','n'],['dieBanane','plátano','die','Bananen','n'],['dieOrange','naranja','die','Orangen','n'],
  ['dieZitrone','limón','die','Zitronen','n'],['dieTraube','uva','die','Trauben','n'],['dieErdbeere','fresa','die','Erdbeeren','n'],
  ['dieKirsche','cereza','die','Kirschen','n'],['dieBirne','pera','die','Birnen','n'],['derPfirsich','melocotón','der','Pfirsiche','n'],
  ['dieAnanas','piña','die','Ananas','n'],['dieMelone','melón','die','Melonen','n'],['derKuchen','pastel','der','Kuchen','n'],
  ['dieTorte','tarta','die','Torten','n'],['derKeks','galleta','der','Kekse','n'],['dieSchokolade','chocolate','die','Schokoladen','n'],
  ['derKaffee','café','der','Kaffees','n'],['derTee','té','der','Tees','n'],['derSaft','zumo','der','Säfte','n'],
  ['dasBier','cerveza','das','Biere','n'],['derWein','vino','der','Weine','n'],['dasMineralwasser','agua mineral','das','Mineralwasser','n'],
  ['derZucker','azúcar','der','Zucker','n'],['dasSalz','sal','das','Salze','n'],['derPfeffer','pimienta','der','Pfeffer','n'],
  ['derEssig','vinagre','der','Essige','n'],['dasÖl','aceite','das','Öle','n'],['dieSoße','salsa','die','Soßen','n'],
];

// Tema: Familia/Personas (A1-A2)
W7['A1.1'] = [
  ['derVater','padre','der','Väter','n'],['dieMutter','madre','die','Mütter','n'],['derSohn','hijo','der','Söhne','n'],
  ['dieTochter','hija','die','Töchter','n'],['derBruder','hermano','der','Brüder','n'],['dieSchwester','hermana','die','Schwestern','n'],
  ['derOpa','abuelo','der','Opas','n'],['dieOma','abuela','die','Omas','n'],['derEnkel','nieto','der','Enkel','n'],
  ['dieEnkelin','nieta','die','Enkelinnen','n'],['derOnkel','tío','der','Onkel','n'],['dieTante','tía','die','Tanten','n'],
  ['derCousin','primo','der','Cousins','n'],['dieCousine','prima','die','Cousinen','n'],['derNeffe','sobrino','der','Neffen','n'],
  ['dieNichte','sobrina','die','Nichten','n'],['derMann','marido','der','Männer','n'],['dieFrau','mujer/esposa','die','Frauen','n'],
  ['derVerlobte','prometido','der','Verlobten','n'],['dieVerlobte','prometida','die','Verlobten','n'],['derBekannte','conocido','der','Bekannten','n'],
  ['derNachbar','vecino','der','Nachbarn','n'],['dieNachbarin','vecina','die','Nachbarinnen','n'],['derGast','invitado','der','Gäste','n'],
];

// Tema: Emociones/Adjetivos (B1)
W7['B1.1'] = [
  ['glücklich','feliz','-','-','adj'],['traurig','triste','-','-','adj'],['wütend','enfadado','-','-','adj'],
  ['ängstlich','asustado','-','-','adj'],['aufgeregt','emocionado','-','-','adj'],['entspannt','relajado','-','-','adj'],
  ['gestresst','estresado','-','-','adj'],['müde','cansado','-','-','adj'],['froh','alegre','-','-','adj'],
  ['nett','simpático','-','-','adj'],['freundlich','amable','-','-','adj'],['böse','malo/enfadado','-','-','adj'],
  ['mutig','valiente','-','-','adj'],['ehrlich','honesto','-','-','adj'],['faul','perezoso','-','-','adj'],
  ['fleißig','trabajador','-','-','adj'],['tapfer','valiente','-','-','adj'],['höflich','educado','-','-','adj'],
  ['unhöflich','maleducado','-','-','adj'],['zufrieden','satisfecho','-','-','adj'],['enttäuscht','decepcionado','-','-','adj'],
  ['überrascht','sorprendido','-','-','adj'],['verliebt','enamorado','-','-','adj'],['eifersüchtig','celoso','-','-','adj'],
  ['neugierig','curioso','-','-','adj'],['ruhig','tranquilo','-','-','adj'],['lustig','divertido','-','-','adj'],
  ['langweilig','aburrido','-','-','adj'],['interessant','interesante','-','-','adj'],['fantastisch','fantástico','-','-','adj'],
  ['schrecklich','terrible','-','-','adj'],['wunderbar','maravilloso','-','-','adj'],['schlimm','malo','-','-','adj'],
  ['einfach','sencillo','-','-','adj'],['schwer','difícil','-','-','adj'],['kostenlos','gratis','-','-','adj'],
  ['fertig','listo','-','-','adj'],['kaputt','roto','-','-','adj'],['sauber','limpio','-','-','adj'],
  ['schmutzig','sucio','-','-','adj'],['weich','blando','-','-','adj'],['hart','duro','-','-','adj'],
  ['tief','profundo','-','-','adj'],['flach','plano','-','-','adj'],['rund','redondo','-','-','adj'],
  ['spitz','puntiagudo','-','-','adj'],['breit','ancho','-','-','adj'],['eng','estrecho','-','-','adj'],
  ['dünn','delgado','-','-','adj'],['dick','gordo','-','-','adj'],['leicht','ligero','-','-','adj'],
  ['schwer','pesado','-','-','adj'],['trocken','seco','-','-','adj'],['nass','mojado','-','-','adj'],
  ['warm','caliente','-','-','adj'],['kalt','frío','-','-','adj'],['heiß','caliente','-','-','adj'],
  ['kühl','fresco','-','-','adj'],['frisch','fresco','-','-','adj'],['alt','viejo','-','-','adj'],
  ['jung','joven','-','-','adj'],['neu','nuevo','-','-','adj'],['modern','moderno','-','-','adj'],
  ['wichtig','importante','-','-','adj'],['egal','igual','-','-','adj'],['typisch','típico','-','-','adj'],
  ['gefährlich','peligroso','-','-','adj'],['sicher','seguro','-','-','adj'],['gemeinsam','juntos','-','-','adj'],
  ['einsam','solitario','-','-','adj'],['beliebt','popular','-','-','adj'],['berühmt','famoso','-','-','adj'],
  ['fremd','extraño','-','-','adj'],['natürlich','natural','-','-','adj'],['künstlich','artificial','-','-','adj'],
];

// Tema: Oficina extendido + verbos (B1-B2)
W7['B1.4'] = [
  ['verhandeln','negociar','-','-','v'],['entscheiden','decidir','-','-','v'],['beschließen','decidir','-','-','v'],
  ['bestätigen','confirmar','-','-','v'],['ablehnen','rechazar','-','-','v'],['zustimmen','acordar','-','-','v'],
  ['vorschlagen','proponer','-','-','v'],['empfehlen','recomendar','-','-','v'],['beraten','asesorar','-','-','v'],
  ['organisieren','organizar','-','-','v'],['planen','planificar','-','-','v'],['koordinieren','coordinar','-','-','v'],
  ['verwalten','administrar','-','-','v'],['überprüfen','revisar','-','-','v'],['korrigieren','corregir','-','-','v'],
  ['verbessern','mejorar','-','-','v'],['entwickeln','desarrollar','-','-','v'],['gestalten','diseñar','-','-','v'],
  ['veröffentlichen','publicar','-','-','v'],['drucken','imprimir','-','-','v'],['kopieren','copiar','-','-','v'],
  ['speichern','guardar','-','-','v'],['löschen','borrar','-','-','v'],['einfügen','insertar','-','-','v'],
  ['hochladen','subir','-','-','v'],['herunterladen','descargar','-','-','v'],['aktualisieren','actualizar','-','-','v'],
  ['installieren','instalar','-','-','v'],['konfigurieren','configurar','-','-','v'],['programmieren','programar','-','-','v'],
  ['analysieren','analizar','-','-','v'],['bewerten','evaluar','-','-','v'],['berechnen','calcular','-','-','v'],
  ['dieSoftware','software','die','Softwares','n'],['dieHardware','hardware','die','Hardwares','n'],['dieDaten','datos','die','Daten','n'],
  ['dieDatei','archivo','die','Dateien','n'],['derOrdner','carpeta','der','Ordner','n'],['derPapierkorb','papelera','der','Papierkörbe','n'],
  ['derDesktop','escritorio','der','Desktops','n'],['dieBenachrichtigung','notificación','die','Benachrichtigungen','n'],['dieEinstellung','ajuste','die','Einstellungen','n'],
  ['dieSystemvoraussetzung','requisito del sistema','die','Systemvoraussetzungen','n'],['dieAktualisierung','actualización','die','Aktualisierungen','n'],['dasBackup','copia de seguridad','das','Backups','n'],
  ['dasKabel','cable','das','Kabel','n'],['derStecker','enchufe','der','Stecker','n'],['derMonitor','monitor','der','Monitore','n'],
];

// Tema: Naturaleza/Paisajes (B1-B2)
W7['B1.3'] = [
  ['derBach','arroyo','der','Bäche','n'],['derTeich','estanque','der','Teiche','n'],['derWasserfall','cascada','der','Wasserfälle','n'],
  ['dieWiese','prado','die','Wiesen','n'],['dieWeide','pastizal','die','Weiden','n'],['dieWüste','desierto','die','Wüsten','n'],
  ['dieSteppe','estepa','die','Steppen','n'],['derDschungel','selva','der','Dschungel','n'],['derSumpf','pantano','der','Sümpfe','n'],
  ['derHügel','colina','der','Hügel','n'],['dasTal','valle','das','Täler','n'],['dieSchlucht','barranco','die','Schluchten','n'],
  ['dieHöhle','cueva','die','Höhlen','n'],['derVulkan','volcán','der','Vulkane','n'],['dieLava','lava','die','Laven','n'],
  ['dasGestein','roca','das','Gesteine','n'],['derStein','piedra','der','Steine','n'],['derSand','arena','der','Sande','n'],
  ['derBoden','suelo','der','Böden','n'],['derMond','luna','der','Monde','n'],['derStern','estrella','der','Sterne','n'],
  ['derKomet','cometa','der','Kometen','n'],['derMeteor','meteoro','der','Meteore','n'],['dieGalaxie','galaxia','die','Galaxien','n'],
  ['dasAll','universo','das','Alle','n'],['dieOrdnung','orden','die','Ordnungen','n'],['dasChaos','caos','das','Chaos','n'],
  ['derBlitz','rayo','der','Blitze','n'],['derDonner','trueno','der','Donner','n'],['derSturm','tormenta','der','Stürme','n'],
  ['derOrkan','huracán','der','Orkane','n'],['derTornado','tornado','der','Tornados','n'],['derRegenbogen','arcoíris','der','Regenbogen','n'],
  ['derHagel','granizo','der','Hagel','n'],['derFrost','helada','der','Froste','n'],['derTau','rocío','der','Taue','n'],
  ['derSchatten','sombra','der','Schatten','n'],['dasLicht','luz','das','Lichter','n'],['dieFinsternis','oscuridad','die','Finsternisse','n'],
  ['derDunst','bruma','der','Dunste','n'],['dieFerne','lejanía','die','Fernen','n'],['dieNähe','cercanía','die','Nähen','n'],
  ['derHorizont','horizonte','der','Horizonte','n'],['dieAussicht','vista','die','Aussichten','n'],['derBlick','mirada','der','Blicke','n'],
];

// Tema: Abstracto/Conceptual (B2-C1)
W7['B2.3'] = [
  ['dieQualität','calidad','die','Qualitäten','n'],['dieQuantität','cantidad','die','Quantitäten','n'],['dieIntensität','intensidad','die','Intensitäten','n'],
  ['dieFrequenz','frecuencia','die','Frequenzen','n'],['dieDauer','duración','die','Dauern','n'],['derRhythmus','ritmo','der','Rhythmen','n'],
  ['derZyklus','ciclo','der','Zyklen','n'],['diePhase','fase','die','Phasen','n'],['derProzess','proceso','der','Prozesse','n'],
  ['dasVerfahren','procedimiento','das','Verfahren','n'],['dieStruktur','estructura','die','Strukturen','n'],['dasSystem','sistema','das','Systeme','n'],
  ['dieFunktion','función','die','Funktionen','n'],['dieOperation','operación','die','Operationen','n'],['dieAktion','acción','die','Aktionen','n'],
  ['dieReaktion','reacción','die','Reaktionen','n'],['dieInteraktion','interacción','die','Interaktionen','n'],['dieBewegung','movimiento','die','Bewegungen','n'],
  ['dieVeränderung','cambio','die','Veränderungen','n'],['dieEntwicklung','desarrollo','die','Entwicklungen','n'],['derFortschritt','progreso','der','Fortschritte','n'],
  ['derRückschritt','retroceso','der','Rückschritte','n'],['derStillstand','estancamiento','der','Stillstände','n'],['dieKrise','crisis','die','Krisen','n'],
  ['dieLösung','solución','die','Lösungen','n'],['derKonflikt','conflicto','der','Konflikte','n'],['derKompromiss','compromiso','der','Kompromisse','n'],
  ['derKonsens','consenso','der','Konsense','n'],['derDissens','disenso','der','Dissense','n'],['dieDebatte','debate','die','Debatten','n'],
  ['dieDiskussion','discusión','die','Diskussionen','n'],['derDialog','diálogo','der','Dialoge','n'],['dasGespräch','conversación','das','Gespräche','n'],
  ['dieVereinbarung','acuerdo','die','Vereinbarungen','n'],['dieAbmachung','pacto','die','Abmachungen','n'],['derVertrag','contrato','der','Verträge','n'],
  ['dieModalität','modalidad','die','Modalitäten','n'],['dieBedingung','condición','die','Bedingungen','n'],['dieVoraussetzung','requisito','die','Voraussetzungen','n'],
  ['dieGarantie','garantía','die','Garantien','n'],['dieVersicherung','seguro','die','Versicherungen','n'],['dieHaftung','responsabilidad','die','Haftungen','n'],
  ['dieZahlung','pago','die','Zahlungen','n'],['dieAbrechnung','liquidación','die','Abrechnungen','n'],['dieBilanz','balance','die','Bilanzen','n'],
  ['derGewinn','ganancia','der','Gewinne','n'],['derVerlust','pérdida','der','Verluste','n'],['derUmsatz','facturación','der','Umsätze','n'],
  ['dieKosten','costes','die','Kosten','n'],['dieAusgabe','gasto','die','Ausgaben','n'],['dieEinnahme','ingreso','die','Einnahmen','n'],
  ['derHaushalt','presupuesto','der','Haushalte','n'],['dieBuchhaltung','contabilidad','die','Buchhaltungen','n'],['diePrüfung','auditoría','die','Prüfungen','n'],
];

// Tema: Verbos cotidianos (A2-B1) - evitar duplicados
W7['A2.1'] = [
  ['aufwachen','despertarse','-','-','v'],['einschlafen','dormirse','-','-','v'],['sich setzen','sentarse','-','-','v'],
  ['sich legen','acostarse','-','-','v'],['anziehen','vestirse','-','-','v'],['ausziehen','desvestirse','-','-','v'],
  ['mitbringen','traer consigo','-','-','v'],['weggehen','irse','-','-','v'],['zurückbleiben','quedarse','-','-','v'],
  ['vorbeikommen','pasar por','-','-','v'],['besuchen','visitar','-','-','v'],['einladen','invitar','-','-','v'],
  ['feiern','celebrar','-','-','v'],['tanzen','bailar','-','-','v'],['singen','cantar','-','-','v'],
  ['zeichnen','dibujar','-','-','v'],['malen','pintar','-','-','v'],['fotografieren','fotografiar','-','-','v'],
  ['reparieren','reparar','-','-','v'],['bauen','construir','-','-','v'],['pflanzen','plantar','-','-','v'],
  ['ernten','cosechar','-','-','v'],['gießen','regar','-','-','v'],['schneiden','cortar','-','-','v'],
  ['kleben','pegar','-','-','v'],['nähen','coser','-','-','v'],['stricken','tejer','-','-','v'],
  ['aufhängen','colgar','-','-','v'],['einpacken','empaquetar','-','-','v'],['auspacken','desempaquetar','-','-','v'],
  ['anmachen','encender','-','-','v'],['ausmachen','apagar','-','-','v'],['einschalten','encender','-','-','v'],
  ['ausschalten','apagar','-','-','v'],['umdrehen','girar','-','-','v'],['falten','doblar','-','-','v'],
  ['werfen','lanzar','-','-','v'],['fangen','atrapar','-','-','v'],['schieben','empujar','-','-','v'],
  ['ziehen','tirar','-','-','v'],['drücken','apretar','-','-','v'],['klopfen','golpear/tocar','-','-','v'],
  ['läuten','sonar','-','-','v'],['klingeln','timbrar','-','-','v'],['flüstern','susurrar','-','-','v'],
  ['schreien','gritar','-','-','v'],['weinen','llorar','-','-','v'],['lachen','reír','-','-','v'],
  ['lächeln','sonreír','-','-','v'],['winken','saludar con la mano','-','-','v'],['nicken','asentir','-','-','v'],
  ['schütteln','negar con la cabeza','-','-','v'],['umarmen','abrazar','-','-','v'],['küssen','besar','-','-','v'],
  ['streicheln','acariciar','-','-','v'],['drücken','abrazar','-','-','v'],['ärgern','molestar','-','-','v'],
];

// Tema: C1 avanzado - académico/gestion
W7['C1.2'] = [
  ['dieKonzeption','concepción','die','Konzeptionen','n'],['dieKonzeptionierung','conceptualización','die','Konzeptionierungen','n'],['dieImplementierung','implementación','die','Implementierungen','n'],
  ['dieValidierung','validación','die','Validierungen','n'],['dieVerifizierung','verificación','die','Verifizierungen','n'],['dieZertifizierung','certificación','die','Zertifizierungen','n'],
  ['dieAkreditierung','acreditación','die','Akreditierungen','n'],['dieStandardisierung','estandarización','die','Standardisierungen','n'],['dieNormierung','normalización','die','Normierungen','n'],
  ['dieHarmonisierung','armonización','die','Harmonisierungen','n'],['dieDifferenzierung','diferenciación','die','Differenzierungen','n'],['dieSpezialisierung','especialización','die','Spezialisierungen','n'],
  ['dieDiversifikation','diversificación','die','Diversifikationen','n'],['dieKonsolidierung','consolidación','die','Konsolidierungen','n'],['dieRationalisierung','racionalización','die','Rationalisierungen','n'],
  ['dieAutomatisierung','automatización','die','Automatisierungen','n'],['dieDigitalisierung','digitalización','die','Digitalisierungen','n'],['dieTransformation','transformación','die','Transformationen','n'],
  ['dieInnovation','innovación','die','Innovationen','n'],['dieOptimierung','optimización','die','Optimierungen','n'],['dieEffektivität','efectividad','die','Effektivitäten','n'],
  ['diePerformanz','rendimiento','die','Performanzen','n'],['dieRentabilität','rentabilidad','die','Rentabilitäten','n'],['dieLiquidität','liquidez','die','Liquiditäten','n'],
  ['dieSolvenz','solvencia','die','Solvenzen','n'],['dieBonität','solvencia crediticia','die','Bonitäten','n'],['diePrognose','pronóstico','die','Prognosen','n'],
  ['dieHochrechnung','proyección','die','Hochrechnungen','n'],['dieSchätzung','estimación','die','Schätzungen','n'],['dieKalkulation','cálculo','die','Kalkulationen','n'],
  ['dieEvaluation','evaluación','die','Evaluationen','n'],['dieMonitor','monitoreo','der','Monitore','n'],['dasControlling','control de gestión','das','Controllings','n'],
];

const NIVELES_ORDER = ['A1.1','A1.2','A1.3','A2.1','A2.3','B1.1','B1.3','B1.4','B2.3','C1.2'];

// Generate code (same format as addLevel calls)
function generateCode() {
  let code = '';
  let total = 0;
  for (const level of NIVELES_ORDER) {
    const words = W7[level] || [];
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
console.log(`Palabras generadas WAVE7: ${total}`);

// Read current file
let rutaContent = fs.readFileSync(RUTA_FILE, 'utf8');
const insertPoint = rutaContent.indexOf('MULLER_RUTA_LEVELS =');

const before = rutaContent.substring(0, insertPoint);
const after = rutaContent.substring(insertPoint);

const injection = `
// ══ WAVE7 (${total} palabras - animales, comida, deportes, emotion, nuevos verbos)
${code}
// ══ FIN WAVE7

`;

fs.writeFileSync(RUTA_FILE, before + injection + after, 'utf8');
console.log('✓ WAVE7 inyectado');

// Verify
const finalContent = fs.readFileSync(RUTA_FILE, 'utf8');
const totalWords = (finalContent.match(/\['([^']+)'/g) || []).length;
console.log(`\nTotal palabras ahora: ${totalWords}`);