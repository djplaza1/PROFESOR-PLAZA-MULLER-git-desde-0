const fs = require('fs');

// ================================================================
// Load current file and data sources
// ================================================================

const content = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Load articulos.json
const articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));

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

// ================================================================
// Parse function - find closing ] of addLevel block
// ================================================================

function findBlockEnd(text, startPos) {
  const bracketPos = text.indexOf('[', startPos);
  if (bracketPos === -1) return -1;
  let depth = 0, inStr = false, strChar = '';
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
        if (text.substring(i+1, i+3) === ');') return i;
      }
    }
  }
  return -1;
}

// ================================================================
// Extract existing words and calculate needs
// ================================================================

const usedGermanWords = new Set();
const levelInfo = {};

levels.forEach(lvl => {
  const regex = new RegExp(`addLevel\\('${lvl.replace('.','\\.')}'\\s*,\\s*\\[`);
  const match = regex.exec(content);
  if (!match) { console.error(`${lvl}: NOT FOUND`); return; }
  const endPos = findBlockEnd(content, match.index);
  if (endPos === -1) { console.error(`${lvl}: END NOT FOUND`); return; }
  
  const block = content.substring(match.index, endPos + 1);
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
    need: Math.max(0, targets[lvl] - words.length)
  };
});

console.log('=== CURRENT STATE ===');
let totalCurrent = 0;
levels.forEach(lvl => {
  const info = levelInfo[lvl];
  if (!info) return;
  totalCurrent += info.currentCount;
  console.log(`${lvl}: ${info.currentCount}/${targets[lvl]} (need ${info.need})`);
});
console.log(`Total current: ${totalCurrent}`);
console.log(`Total additional needed: ${9500 - totalCurrent}`); // sum of targets

// ================================================================
// Prepare nouns from articulos.json by level
// ================================================================

const nounsByLevel = {};
articulos.forEach(item => {
  const lvl = item.level || 'B1';
  if (!nounsByLevel[lvl]) nounsByLevel[lvl] = [];
  const parts = item.de.split(' ');
  const article = parts[0];
  const word = parts.slice(1).join(' ');
  const es = item.es;
  // Input: "der Abend" -> parse: de word="Abend", es="la tarde/noche"
  // Sometimes es already has article like "la tarde/noche"
  let translation = es;
  // Remove leading article from es if present (la, el, los, las)
  translation = translation.replace(/^(el|la|los|las)\s+/i, '');
  
  nounsByLevel[lvl].push([word, translation, article, '', 'n']);
});

// Also prepare synthetic word pools for when articulos run out
const syntheticPools = {
  'A1': [
    // Common A1 nouns - household, family, food, animals, body, colors, weather
    ['Hemd','camisa','das','Hemden','n'],['Schuh','zapato','der','Schuhe','n'],
    ['Strumpf','calcetín','der','Strümpfe','n'],['Rock','falda','der','Röcke','n'],
    ['Bluse','blusa','die','Blusen','n'],['Krawatte','corbata','die','Krawatten','n'],
    ['Mantel','abrigo','der','Mäntel','n'],['Regen','lluvia','der','-','n'],
    ['Schnee','nieve','der','-','n'],['Nebel','niebla','der','-','n'],
    ['Gewitter','tormenta','das','-','n'],['Blitz','relámpago','der','Blitze','n'],
    ['Donner','trueno','der','-','n'],['Hagel','granizo','der','-','n'],
    ['Frost','helada','der','-','n'],['Hitze','calor','die','-','n'],
    ['Lippe','labio','die','Lippen','n'],['Zunge','lengua','die','Zungen','n'],
    ['Hals','cuello','der','Hälse','n'],['Schulter','hombro','die','Schultern','n'],
    ['Ellbogen','codo','der','Ellbogen','n'],['Knie','rodilla','das','Knie','n'],
    ['Knöchel','tobillo','der','Knöchel','n'],['Ferse','talón','die','Fersen','n'],
    ['Daumen','pulgar','der','Daumen','n'],['Zehe','dedo del pie','die','Zehen','n'],
    ['Brust','pecho','die','Brüste','n'],['Bauch','vientre','der','Bäuche','n'],
    ['Rücken','espalda','der','Rücken','n'],['Haut','piel','die','Häute','n'],
    ['Knochen','hueso','der','Knochen','n'],['Muskel','músculo','der','Muskeln','n'],
    ['Nachbar','vecino','der','Nachbarn','n'],['Verwandte','pariente','der','Verwandten','n'],
    ['Tante','tía','die','Tanten','n'],['Onkel','tío','der','Onkel','n'],
    ['Cousin','primo','der','Cousins','n'],['Nichte','sobrina','die','Nichten','n'],
    ['Neffe','sobrino','der','Neffen','n'],['Opa','abuelo','der','Opas','n'],
    ['Oma','abuela','die','Omas','n'],['Enkel','nieto','der','Enkel','n'],
    ['Rind','vaca','das','Rinder','n'],['Schwein','cerdo','das','Schweine','n'],
    ['Huhn','gallina','das','Hühner','n'],['Ente','pato','die','Enten','n'],
    ['Gans','ganso','die','Gänse','n'],['Pferd','caballo','das','Pferde','n'],
    ['Esel','burro','der','Esel','n'],['Biene','abeja','die','Bienen','n'],
    ['Fliege','mosca','die','Fliegen','n'],['Mücke','mosquito','die','Mücken','n'],
    ['Käfer','escarabajo','der','Käfer','n'],['Spinne','araña','die','Spinnen','n'],
    ['Wurm','gusano','der','Würmer','n'],['Fisch','pez','der','Fische','n'],
    ['Bach','arroyo','der','Bäche','n'],['Teich','estanque','der','Teiche','n'],
    ['Insel','isla','die','Inseln','n'],['See','lago','der','Seen','n'],
    ['Wald','bosque','der','Wälder','n'],['Berg','montaña','der','Berge','n'],
    ['Tal','valle','das','Täler','n'],['Hügel','colina','der','Hügel','n'],
    ['Weg','camino','der','Wege','n'],['Brücke','puente','die','Brücken','n'],
    ['Mauer','muro','die','Mauern','n'],['Turm','torre','der','Türme','n'],
    ['Kirche','iglesia','die','Kirchen','n'],['Schloss','castillo','das','Schlösser','n'],
    ['Dorf','pueblo','das','Dörfer','n'], ['Wald','bosque','der','Wälder','n'],
    ['Löffel','cuchara','der','Löffel','n'], ['Gabel','tenedor','die','Gabeln','n'],
    ['Messer','cuchillo','das','Messer','n'], ['Teller','plato','der','Teller','n'],
    ['Becher','vaso','der','Becher','n'], ['Kanne','jarra','die','Kannen','n'],
    ['Schüssel','cuenco','die','Schüsseln','n'], ['Topf','olla','der','Töpfe','n'],
    ['Pfanne','sartén','die','Pfannen','n'], ['Brett','tabla','das','Bretter','n'],
    ['Schere','tijeras','die','Scheren','n'], ['Nadel','aguja','die','Nadeln','n'],
    ['Faden','hilo','der','Fäden','n'], ['Seil','cuerda','das','Seile','n'],
    ['Eimer','cubo','der','Eimer','n'], ['Besen','escoba','der','Besen','n'],
    ['Pinsel','pincel','der','Pinsel','n'], ['Leiter','escalera','die','Leitern','n'],
    ['Säge','sierra','die','Sägen','n'], ['Hammer','martillo','der','Hämmer','n'],
    ['Nagel','clavo','der','Nägel','n'], ['Schraube','tornillo','die','Schrauben','n'],
    ['Kerze','vela','die','Kerzen','n'], ['Lampe','lámpara','die','Lampen','n'],
    ['Kissen','almohada','das','Kissen','n'], ['Decke','manta','die','Decken','n'],
    ['Teppich','alfombra','der','Teppiche','n'], ['Vorhang','cortina','der','Vorhänge','n'],
    ['Schrank','armario','der','Schränke','n'], ['Regal','estante','das','Regale','n'],
    ['Bank','banco','die','Bänke','n'], ['Sessel','sillón','der','Sessel','n'],
    ['Hocker','taburete','der','Hocker','n'], ['Kommode','cómoda','die','Kommoden','n'],
    ['Uhr','reloj','die','Uhren','n'], ['Spiegel','espejo','der','Spiegel','n'],
    ['Bild','cuadro','das','Bilder','n'], ['Vase','florero','die','Vasen','n'],
    ['Korb','cesta','der','Körbe','n'], ['Koffer','maleta','der','Koffer','n'],
    ['Rucksack','mochila','der','Rucksäcke','n'], ['Tasche','bolsa','die','Taschen','n'],
    ['Kamm','peine','der','Kämme','n'], ['Bürste','cepillo','die','Bürsten','n'],
    ['Seife','jabón','die','Seifen','n'], ['Handtuch','toalla','das','Handtücher','n'],
  ],
  'A2': [
    ['Beruf','profesión','der','Berufe','n'], ['Gehalt','salario','das','Gehälter','n'],
    ['Steuer','impuesto','die','Steuern','n'], ['Miete','alquiler','die','Mieten','n'],
    ['Vertrag','contrato','der','Verträge','n'], ['Kredit','crédito','der','Kredite','n'],
    ['Schulden','deudas','die','-','n'], ['Bargeld','efectivo','das','-','n'],
    ['Wechselgeld','cambio','das','-','n'], ['Angebot','oferta','das','Angebote','n'],
    ['Rabatt','descuento','der','Rabatte','n'], ['Rechnung','factura','die','Rechnungen','n'],
    ['Quittung','recibo','die','Quittungen','n'], ['Paket','paquete','das','Pakete','n'],
    ['Brief','carta','der','Briefe','n'], ['Briefmarke','sello','die','Briefmarken','n'],
    ['Umschlag','sobre','der','Umschläge','n'], ['Postkarte','postal','die','Postkarten','n'],
    ['Telefonzelle','cabina','die','Telefonzellen','n'], ['Anruf','llamada','der','Anrufe','n'],
    ['Nachricht','mensaje','die','Nachrichten','n'], ['Antwort','respuesta','die','Antworten','n'],
    ['Fahrkarte','billete','die','Fahrkarten','n'], ['Fahrplan','horario','der','Fahrpläne','n'],
    ['Abfahrt','salida','die','Abfahrten','n'], ['Ankunft','llegada','die','Ankünfte','n'],
    ['Verspätung','retraso','die','Verspätungen','n'], ['Gleis','andén','das','Gleise','n'],
    ['Ausgang','salida','der','Ausgänge','n'], ['Eingang','entrada','der','Eingänge','n'],
    ['Notfall','emergencia','der','Notfälle','n'], ['Krankenwagen','ambulancia','der','Krankenwagen','n'],
    ['Feuerwehr','bomberos','die','-','n'], ['Polizei','policía','die','-','n'],
    ['Unfall','accidente','der','Unfälle','n'], ['Verletzung','lesión','die','Verletzungen','n'],
    ['Apotheke','farmacia','die','Apotheken','n'], ['Medikament','medicamento','das','Medikamente','n'],
    ['Tablette','pastilla','die','Tabletten','n'], ['Salbe','pomada','die','Salben','n'],
    ['Termin','cita','der','Termine','n'], ['Sprechstunde','consulta','die','Sprechstunden','n'],
    ['Untersuchung','examen','die','Untersuchungen','n'], ['Behandlung','tratamiento','die','Behandlungen','n'],
    ['Operation','operación','die','Operationen','n'], ['Rezept','receta','das','Rezepte','n'],
    ['Besucher','visitante','der','Besucher','n'], ['Gastgeber','anfitrión','der','Gastgeber','n'],
    ['Einladung','invitación','die','Einladungen','n'], ['Feier','fiesta','die','Feiern','n'],
    ['Geburtstag','cumpleaños','der','Geburtstage','n'], ['Geschenk','regalo','das','Geschenke','n'],
    ['Glückwunsch','felicitación','der','Glückwünsche','n'], ['Toast','brindis','der','Toasts','n'],
    ['Ecke','esquina','die','Ecken','n'], ['Kreuzung','cruce','die','Kreuzungen','n'],
    ['Ampel','semáforo','die','Ampeln','n'], ['Schild','señal','das','Schilder','n'],
    ['Bürgersteig','acera','der','Bürgersteige','n'], ['Übergang','paso','der','Übergänge','n'],
    ['Unterführung','paso subterráneo','die','Unterführungen','n'], ['Stau','atasco','der','Staus','n'],
    ['Parkplatz','aparcamiento','der','Parkplätze','n'], ['Garage','garaje','die','Garagen','n'],
    ['Werkstatt','taller','die','Werkstätten','n'], ['Reparatur','reparación','die','Reparaturen','n'],
  ],
  'B1': [
    ['Meinung','opinión','die','Meinungen','n'], ['Erfahrung','experiencia','die','Erfahrungen','n'],
    ['Entwicklung','desarrollo','die','Entwicklungen','n'], ['Beziehung','relación','die','Beziehungen','n'],
    ['Verbindung','conexión','die','Verbindungen','n'], ['Lösung','solución','die','Lösungen','n'],
    ['Entscheidung','decisión','die','Entscheidungen','n'], ['Wahl','elección','die','Wahlen','n'],
    ['Möglichkeit','posibilidad','die','Möglichkeiten','n'], ['Vorstellung','idea','die','Vorstellungen','n'],
    ['Überzeugung','convicción','die','Überzeugungen','n'], ['Hoffnung','esperanza','die','Hoffnungen','n'],
    ['Befürchtung','temor','die','Befürchtungen','n'], ['Sorge','preocupación','die','Sorgen','n'],
    ['Vertrauen','confianza','das','-','n'], ['Zweifel','duda','der','Zweifel','n'],
    ['Verdacht','sospecha','der','-','n'], ['Neigung','inclinación','die','Neigungen','n'],
    ['Fähigkeit','capacidad','die','Fähigkeiten','n'], ['Kenntnis','conocimiento','die','Kenntnisse','n'],
    ['Fertigkeit','destreza','die','Fertigkeiten','n'], ['Begabung','talento','die','Begabungen','n'],
    ['Eigenschaft','cualidad','die','Eigenschaften','n'], ['Verhalten','comportamiento','das','-','n'],
    ['Gewohnheit','costumbre','die','Gewohnheiten','n'], ['Brauch','costumbre','der','Bräuche','n'],
    ['Tradition','tradición','die','Traditionen','n'], ['Sitte','costumbre','die','Sitten','n'],
    ['Regel','regla','die','Regeln','n'], ['Vorschrift','norma','die','Vorschriften','n'],
    ['Gesetz','ley','das','Gesetze','n'], ['Bestimmung','disposición','die','Bestimmungen','n'],
    ['Auftrag','encargo','der','Aufträge','n'], ['Aufgabe','tarea','die','Aufgaben','n'],
    ['Pflicht','deber','die','Pflichten','n'], ['Verantwortung','responsabilidad','die','Verantwortungen','n'],
    ['Vorteil','ventaja','der','Vorteile','n'], ['Nachteil','desventaja','der','Nachteile','n'],
    ['Nutzen','beneficio','der','Nutzen','n'], ['Schaden','daño','der','Schäden','n'],
  ],
  'B2': [
    ['Maßnahme','medida','die','Maßnahmen','n'], ['Verfahren','procedimiento','das','Verfahren','n'],
    ['Methode','método','die','Methoden','n'], ['Strategie','estrategia','die','Strategien','n'],
    ['Analyse','análisis','die','Analysen','n'], ['Diagnose','diagnóstico','die','Diagnosen','n'],
    ['Prognose','pronóstico','die','Prognosen','n'], ['Theorie','teoría','die','Theorien','n'],
    ['Hypothese','hipótesis','die','Hypothesen','n'], ['These','tesis','die','Thesen','n'],
    ['Definition','definición','die','Definitionen','n'], ['Kategorie','categoría','die','Kategorien','n'],
    ['Klassifikation','clasificación','die','Klassifikationen','n'], ['Struktur','estructura','die','Strukturen','n'],
    ['System','sistema','das','Systeme','n'], ['Organisation','organización','die','Organisationen','n'],
    ['Institution','institución','die','Institutionen','n'], ['Behörde','autoridad','die','Behörden','n'],
    ['Abteilung','departamento','die','Abteilungen','n'], ['Bereich','área','der','Bereiche','n'],
    ['Sektor','sector','der','Sektoren','n'], ['Branche','rama','die','Branchen','n'],
    ['Kontext','contexto','der','Kontexte','n'], ['Zusammenhang','relación','der','Zusammenhänge','n'],
    ['Aspekt','aspecto','der','Aspekte','n'], ['Perspektive','perspectiva','die','Perspektiven','n'],
    ['Standpunkt','punto de vista','der','Standpunkte','n'], ['Kriterium','criterio','das','Kriterien','n'],
    ['Bedingung','condición','die','Bedingungen','n'], ['Voraussetzung','requisito','die','Voraussetzungen','n'],
    ['Folge','consecuencia','die','Folgen','n'], ['Konsequenz','consecuencia','die','Konsequenzen','n'],
    ['Auswirkung','efecto','die','Auswirkungen','n'], ['Einfluss','influencia','der','Einflüsse','n'],
    ['Wirkung','efecto','die','Wirkungen','n'], ['Ergebnis','resultado','das','Ergebnisse','n'],
    ['Schlussfolgerung','conclusión','die','Schlussfolgerungen','n'], ['Zusammenfassung','resumen','die','Zusammenfassungen','n'],
    ['Übersicht','visión general','die','Übersichten','n'], ['Darstellung','representación','die','Darstellungen','n'],
    ['Beschreibung','descripción','die','Beschreibungen','n'], ['Erklärung','explicación','die','Erklärungen','n'],
    ['Begründung','justificación','die','Begründungen','n'], ['Nachweis','comprobación','der','Nachweise','n'],
    ['Beweis','prueba','der','Beweise','n'], ['Beleg','comprobante','der','Belege','n'],
    ['Quelle','fuente','die','Quellen','n'], ['Referenz','referencia','die','Referenzen','n'],
    ['Hinweis','indicación','der','Hinweise','n'], ['Angabe','dato','die','Angaben','n'],
    ['Verhandlung','negociación','die','Verhandlungen','n'], ['Vereinbarung','acuerdo','die','Vereinbarungen','n'],
    ['Abkommen','acuerdo','das','Abkommen','n'], ['Kompromiss','compromiso','der','Kompromisse','n'],
    ['Konflikt','conflicto','der','Konflikte','n'], ['Streitigkeit','disputa','die','Streitigkeiten','n'],
    ['Auseinandersetzung','discusión','die','Auseinandersetzungen','n'], ['Debatte','debate','die','Debatten','n'],
    ['Diskussion','discusión','die','Diskussionen','n'], ['Gespräch','conversación','das','Gespräche','n'],
    ['Austausch','intercambio','der','Austausche','n'], ['Kommunikation','comunicación','die','-','n'],
    ['Kooperation','cooperación','die','Kooperationen','n'], ['Zusammenarbeit','colaboración','die','-','n'],
  ],
  'C1': [
    ['Abhängigkeit','dependencia','die','Abhängigkeiten','n'], ['Wechselwirkung','interacción','die','Wechselwirkungen','n'],
    ['Interdependenz','interdependencia','die','Interdependenzen','n'], ['Gegensatz','contraste','der','Gegensätze','n'],
    ['Widerspruch','contradicción','der','Widersprüche','n'], ['Paradoxon','paradoja','das','Paradoxa','n'],
    ['Ambivalenz','ambivalencia','die','Ambivalenzen','n'], ['Dilemma','dilema','das','Dilemmata','n'],
    ['Synthese','síntesis','die','Synthesen','n'], ['Integration','integración','die','Integrationen','n'],
    ['Harmonie','armonía','die','Harmonien','n'], ['Kohärenz','coherencia','die','-','n'],
    ['Korrespondenz','correspondencia','die','Korrespondenzen','n'], ['Analogie','analogía','die','Analogien','n'],
    ['Äquivalenz','equivalencia','die','Äquivalenzen','n'], ['Proportion','proporción','die','Proportionen','n'],
    ['Relation','relación','die','Relationen','n'], ['Differenz','diferencia','die','Differenzen','n'],
    ['Diskrepanz','discrepancia','die','Diskrepanzen','n'], ['Divergenz','divergencia','die','Divergenzen','n'],
    ['Kontrast','contraste','der','Kontraste','n'], ['Variante','variante','die','Varianten','n'],
    ['Modifikation','modificación','die','Modifikationen','n'], ['Transformation','transformación','die','Transformationen','n'],
    ['Innovation','innovación','die','Innovationen','n'], ['Revolution','revolución','die','Revolutionen','n'],
    ['Evolution','evolución','die','Evolutionen','n'], ['Tendenz','tendencia','die','Tendenzen','n'],
    ['Entwicklungstrend','tendencia','der','Entwicklungstrends','n'], ['Phänomen','fenómeno','das','Phänomene','n'],
    ['Konzept','concepto','das','Konzepte','n'], ['Paradigma','paradigma','das','Paradigmen','n'],
    ['Modell','modelo','das','Modelle','n'], ['Prinzip','principio','das','Prinzipien','n'],
    ['Maxime','máxima','die','Maximen','n'], ['Doktrin','doctrina','die','Doktrinen','n'],
    ['Ideologie','ideología','die','Ideologien','n'], ['Weltanschauung','cosmovisión','die','Weltanschauungen','n'],
    ['Ethik','ética','die','-','n'], ['Moral','moral','die','-','n'],
    ['Tugend','virtud','die','Tugenden','n'], ['Wert','valor','der','Werte','n'],
    ['Norm','norma','die','Normen','n'], ['Prämisse','premisa','die','Prämissen','n'],
    ['Postulat','postulado','das','Postulate','n'], ['Axiom','axioma','das','Axiome','n'],
    ['Korrelation','correlación','die','Korrelationen','n'], ['Kausalität','causalidad','die','-','n'],
    ['Determinante','determinante','die','Determinanten','n'], ['Variable','variable','die','Variablen','n'],
    ['Konstante','constante','die','Konstanten','n'], ['Faktor','factor','der','Faktoren','n'],
    ['Parameter','parámetro','der','Parameter','n'], ['Indikator','indicador','der','Indikatoren','n'],
    ['Koeffizient','coeficiente','der','Koeffizienten','n'], ['Quantität','cantidad','die','Quantitäten','n'],
    ['Qualität','cualidad','die','Qualitäten','n'], ['Intensität','intensidad','die','Intensitäten','n'],
    ['Frequenz','frecuencia','die','Frequenzen','n'], ['Kapazität','capacidad','die','Kapazitäten','n'],
    ['Potenzial','potencial','das','Potenziale','n'], ['Ressource','recurso','die','Ressourcen','n'],
  ]
};

// ================================================================
// For each broad level, build word pool (nouns + synthetic)
// ================================================================

const newWordsByLevel = {};

Object.entries(broadToSub).forEach(([broad, subs]) => {
  // Get articulos.json nouns for this broad level
  const articuloNouns = (nounsByLevel[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  // Get synthetic words for this broad level
  const synthetics = (syntheticPools[broad] || []).filter(w => !usedGermanWords.has(w[0].toLowerCase()));
  
  let totalNeed = 0;
  subs.forEach(sub => {
    if (levelInfo[sub]) totalNeed += levelInfo[sub].need;
  });
  
  // Combine pools: use articulos first, then synthetic
  const allAvailable = [...articuloNouns, ...synthetics];
  
  // Shuffle
  for (let i = allAvailable.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAvailable[i], allAvailable[j]] = [allAvailable[j], allAvailable[i]];
  }
  
  console.log(`\n${broad}: ${articuloNouns.length} articulos nouns + ${synthetics.length} synthetic = ${allAvailable.length} total available, need ${totalNeed}`);
  
  // Distribute to sub-levels proportionally
  let idx = 0;
  subs.forEach(sub => {
    if (!levelInfo[sub]) return;
    const need = levelInfo[sub].need;
    if (need > 0) {
      const assign = allAvailable.slice(idx, idx + need);
      idx += assign.length;
      newWordsByLevel[sub] = assign;
      assign.forEach(w => usedGermanWords.add(w[0].toLowerCase()));
      console.log(`  ${sub}: assigning ${assign.length} words`);
    }
  });
  
  if (idx < totalNeed) {
    console.log(`  WARNING: ${broad} only has ${idx} words but needs ${totalNeed}`);
  }
});

// ================================================================
// Inject new words into file
// ================================================================

let result = content;
let totalNew = 0;

const sortedLevels = [...levels].sort((a, b) => 
  (levelInfo[b]?.blockEnd || 0) - (levelInfo[a]?.blockEnd || 0)
);

sortedLevels.forEach(lvl => {
  const info = levelInfo[lvl];
  const newWords = newWordsByLevel[lvl];
  if (!info || !newWords || newWords.length === 0) return;
  
  const wordStrings = newWords.map(w => 
    `['${w[0]}','${w[1]}','${w[2]}','${w[3]}','${w[4]}']`
  );
  
  const insertPos = info.blockEnd;
  const before = result.substring(0, insertPos);
  const after = result.substring(insertPos);
  
  result = before + ',\n' + wordStrings.join(',\n') + '\n' + after;
  totalNew += wordStrings.length;
});

console.log(`\nTotal new words injected: ${totalNew}`);

// ================================================================
// Count final
// ================================================================

console.log('\n=== FINAL COUNTS ===');
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
// Save
// ================================================================

if (totalNew > 0) {
  fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', result, 'utf8');
  console.log('\n✓ File saved!');
} else {
  console.log('\n✗ No words injected');
}