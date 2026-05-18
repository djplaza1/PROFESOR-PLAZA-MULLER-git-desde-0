const fs = require("fs");

// Cargar el archivo existente (bloques 1-2)
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A1.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A1.2.json", "utf8");
  existing = JSON.parse(raw);
}

// Bloque 3: palabras 101 a 150
const block3 = {
  "Zeitung": [
    { "de": "Die Zeitung liegt auf dem Tisch.", "es": "El periódico está sobre la mesa." },
    { "de": "Ich habe die Zeitung heute Morgen gelesen.", "es": "He leído el periódico esta mañana." },
    { "de": "Kannst du mir die Zeitung geben?", "es": "¿Puedes darme el periódico?" }
  ],
  "Zeitschrift": [
    { "de": "Die Zeitschrift erscheint jede Woche.", "es": "La revista aparece cada semana." },
    { "de": "Sie hat eine Zeitschrift über Mode gekauft.", "es": "Ella ha comprado una revista de moda." },
    { "de": "Liest du gern Zeitschriften?", "es": "¿Te gusta leer revistas?" }
  ],
  "abwischen": [
    { "de": "Du musst den Tisch abwischen.", "es": "Tienes que limpiar la mesa." },
    { "de": "Er hat den Staub vom Regal abgewischt.", "es": "Él ha limpiado el polvo de la estantería." },
    { "de": "Kannst du die Fensterbank abwischen?", "es": "¿Puedes limpiar el alféizar?" }
  ],
  "Kohl": [
    { "de": "Der Kohl ist frisch vom Feld.", "es": "La col está fresca del campo." },
    { "de": "Meine Oma hat den Kohl gekocht.", "es": "Mi abuela ha cocido la col." },
    { "de": "Kochst du gern mit Kohl?", "es": "¿Te gusta cocinar con col?" }
  ],
  "Umstände": [
    { "de": "Die Umstände sind schwierig.", "es": "Las circunstancias son difíciles." },
    { "de": "Wir haben die Umstände nicht gekannt.", "es": "No conocíamos las circunstancias." },
    { "de": "Kannst du die Umstände erklären?", "es": "¿Puedes explicar las circunstancias?" }
  ],
  "der Besen": [
    { "de": "Der Besen steht im Schrank.", "es": "La escoba está en el armario." },
    { "de": "Ich habe den Besen gestern gekauft.", "es": "He comprado la escoba ayer." },
    { "de": "Darf ich den Besen benutzen?", "es": "¿Puedo usar la escoba?" }
  ],
  "einschenken": [
    { "de": "Soll ich dir Tee einschenken?", "es": "¿Debo servirte té?" },
    { "de": "Er hat mir ein Glas Wein eingeschenkt.", "es": "Él me ha servido una copa de vino." },
    { "de": "Schenkst du bitte den Gästen ein?", "es": "¿Sirves a los invitados, por favor?" }
  ],
  "readonly": [
    { "de": "\"readonly\" ist ein englisches Wort.", "es": "\"readonly\" es una palabra inglesa." },
    { "de": "Auf Deutsch bedeutet \"readonly\" schreibgeschützt.", "es": "En alemán \"readonly\" significa protegido contra escritura." },
    { "de": "Kennst du das Wort \"readonly\"?", "es": "¿Conoces la palabra \"readonly\"?" }
  ],
  "Mandel": [
    { "de": "Die Mandel ist eine Nuss.", "es": "La almendra es un fruto seco." },
    { "de": "Ich habe Mandeln für den Kuchen gehackt.", "es": "He picado almendras para la tarta." },
    { "de": "Magst du gebrannte Mandeln?", "es": "¿Te gustan las almendras garrapiñadas?" }
  ],
  "der Kühlschrank": [
    { "de": "Der Kühlschrank ist fast leer.", "es": "La nevera está casi vacía." },
    { "de": "Wir haben den Kühlschrank neu gekauft.", "es": "Hemos comprado la nevera nueva." },
    { "de": "Stellst du die Milch in den Kühlschrank?", "es": "¿Pones la leche en la nevera?" }
  ],
  "reißen": [
    { "de": "Der Stoff kann leicht reißen.", "es": "La tela puede rasgarse fácilmente." },
    { "de": "Ich habe mir die Hose am Knie gerissen.", "es": "Me he rasgado el pantalón en la rodilla." },
    { "de": "Reißt du das Papier in zwei Teile?", "es": "¿Rasgas el papel en dos partes?" }
  ],
  "Video": [
    { "de": "Das Video ist lustig.", "es": "El vídeo es gracioso." },
    { "de": "Er hat ein Video von der Reise gemacht.", "es": "Él ha hecho un vídeo del viaje." },
    { "de": "Kannst du mir das Video schicken?", "es": "¿Puedes enviarme el vídeo?" }
  ],
  "Schädel": [
    { "de": "Der Schädel schützt das Gehirn.", "es": "El cráneo protege el cerebro." },
    { "de": "Der Arzt hat den Schädel geröntgt.", "es": "El médico ha radiografiado el cráneo." },
    { "de": "Tut dein Schädel weh?", "es": "¿Te duele el cráneo?" }
  ],
  "Mond": [
    { "de": "Der Mond scheint hell.", "es": "La luna brilla intensamente." },
    { "de": "Wir haben den Mond durch das Teleskop gesehen.", "es": "Hemos visto la luna por el telescopio." },
    { "de": "Ist heute Vollmond?", "es": "¿Hoy hay luna llena?" }
  ],
  "Regen": [
    { "de": "Der Regen ist kalt.", "es": "La lluvia está fría." },
    { "de": "Es hat gestern stark geregnet.", "es": "Ayer ha llovido mucho." },
    { "de": "Magst du Spaziergänge im Regen?", "es": "¿Te gusta pasear bajo la lluvia?" }
  ],
  "Schnurrbart": [
    { "de": "Sein Schnurrbart ist grau.", "es": "Su bigote es gris." },
    { "de": "Er hat sich einen Schnurrbart wachsen lassen.", "es": "Él se ha dejado crecer el bigote." },
    { "de": "Gefällt dir ein Schnurrbart?", "es": "¿Te gusta el bigote?" }
  ],
  "der Pinguin": [
    { "de": "Der Pinguin kann nicht fliegen.", "es": "El pingüino no puede volar." },
    { "de": "Im Zoo haben wir Pinguine gefüttert.", "es": "En el zoo hemos dado de comer a los pingüinos." },
    { "de": "Hast du einen Pinguin in echt gesehen?", "es": "¿Has visto un pingüino en persona?" }
  ],
  "Geburtsort": [
    { "de": "Mein Geburtsort ist Berlin.", "es": "Mi lugar de nacimiento es Berlín." },
    { "de": "Er hat seinen Geburtsort nie vergessen.", "es": "Él nunca ha olvidado su lugar de nacimiento." },
    { "de": "Wo ist dein Geburtsort?", "es": "¿Cuál es tu lugar de nacimiento?" }
  ],
  "Kehle": [
    { "de": "Meine Kehle tut weh.", "es": "Me duele la garganta." },
    { "de": "Er hat die Medizin durch die Kehle geschluckt.", "es": "Él ha tragado la medicina por la garganta." },
    { "de": "Hast du Schmerzen in der Kehle?", "es": "¿Tienes dolor de garganta?" }
  ],
  "der Stiefel": [
    { "de": "Die Stiefel sind aus Leder.", "es": "Las botas son de cuero." },
    { "de": "Ich habe die Stiefel im Winter getragen.", "es": "He llevado las botas en invierno." },
    { "de": "Kannst du die Stiefel ausziehen?", "es": "¿Puedes quitarte las botas?" }
  ],
  "Pflanze": [
    { "de": "Die Pflanze braucht Wasser.", "es": "La planta necesita agua." },
    { "de": "Sie hat die Pflanze auf den Balkon gestellt.", "es": "Ella ha puesto la planta en el balcón." },
    { "de": "Welche Pflanze magst du am liebsten?", "es": "¿Qué planta te gusta más?" }
  ],
  "müde": [
    { "de": "Ich bin heute sehr müde.", "es": "Hoy estoy muy cansado." },
    { "de": "Er hat müde ausgesehen.", "es": "Él ha parecido cansado." },
    { "de": "Bist du nach der Arbeit müde?", "es": "¿Estás cansado después del trabajo?" }
  ],
  "krank": [
    { "de": "Die Oma ist krank.", "es": "La abuela está enferma." },
    { "de": "Ich bin letzte Woche krank gewesen.", "es": "Estuve enfermo la semana pasada." },
    { "de": "Fühlst du dich immer noch krank?", "es": "¿Te sientes enfermo todavía?" }
  ],
  "der Flughafen": [
    { "de": "Der Flughafen ist weit entfernt.", "es": "El aeropuerto está lejos." },
    { "de": "Wir haben den Flughafen um fünf Uhr erreicht.", "es": "Hemos llegado al aeropuerto a las cinco." },
    { "de": "Fährst du zum Flughafen?", "es": "¿Vas al aeropuerto?" }
  ],
  "grillen": [
    { "de": "Am Samstag wollen wir grillen.", "es": "El sábado queremos hacer barbacoa." },
    { "de": "Sie haben im Garten gegrillt.", "es": "Ellos han hecho barbacoa en el jardín." },
    { "de": "Grillst du gern mit Freunden?", "es": "¿Te gusta hacer barbacoa con amigos?" }
  ],
  "probieren": [
    { "de": "Du musst den Kuchen probieren.", "es": "Tienes que probar la tarta." },
    { "de": "Ich habe noch nie Sushi probiert.", "es": "Nunca he probado el sushi." },
    { "de": "Probierst du gern neue Gerichte?", "es": "¿Te gusta probar platos nuevos?" }
  ],
  "Hausschuh": [
    { "de": "Mein Hausschuh ist bequem.", "es": "Mi zapatilla es cómoda." },
    { "de": "Er hat die Hausschuhe unter das Bett gestellt.", "es": "Él ha puesto las zapatillas debajo de la cama." },
    { "de": "Suchst du deine Hausschuhe?", "es": "¿Buscas tus zapatillas?" }
  ],
  "Sessel": [
    { "de": "Der Sessel ist alt.", "es": "El sillón es antiguo." },
    { "de": "Opa hat im Sessel geschlafen.", "es": "El abuelo se ha dormido en el sillón." },
    { "de": "Sitzt du gern in diesem Sessel?", "es": "¿Te gusta sentarte en este sillón?" }
  ],
  "la silla": [
    { "de": "\"La silla\" ist ein spanisches Wort.", "es": "\"La silla\" es una palabra española." },
    { "de": "Ich habe das Wort \"la silla\" im Unterricht gelernt.", "es": "He aprendido la palabra \"la silla\" en clase." },
    { "de": "Kennst du die Bedeutung von \"la silla\"?", "es": "¿Conoces el significado de \"la silla\"?" }
  ],
  "das Armband": [
    { "de": "Das Armband ist aus Gold.", "es": "La pulsera es de oro." },
    { "de": "Sie hat mir ein Armband geschenkt.", "es": "Ella me ha regalado una pulsera." },
    { "de": "Trägst du das Armband jeden Tag?", "es": "¿Llevas la pulsera todos los días?" }
  ],
  "zurückgeben": [
    { "de": "Du musst das Buch morgen zurückgeben.", "es": "Tienes que devolver el libro mañana." },
    { "de": "Er hat mir das Geld zurückgegeben.", "es": "Él me ha devuelto el dinero." },
    { "de": "Gibst du die Schlüssel zurück?", "es": "¿Devuelves las llaves?" }
  ],
  "laut": [
    { "de": "Die Musik ist mir zu laut.", "es": "La música está demasiado alta para mí." },
    { "de": "Das Kind hat laut geweint.", "es": "El niño ha llorado fuerte." },
    { "de": "Findest du die Straße laut?", "es": "¿Encuentras ruidosa la calle?" }
  ],
  "Pferd": [
    { "de": "Das Pferd ist braun.", "es": "El caballo es marrón." },
    { "de": "Wir sind am Strand geritten.", "es": "Hemos cabalgado por la playa." },
    { "de": "Kannst du ein Pferd satteln?", "es": "¿Puedes ensillar un caballo?" }
  ],
  "Strumpf": [
    { "de": "Der Strumpf hat ein Loch.", "es": "El calcetín tiene un agujero." },
    { "de": "Ich habe die Strümpfe gewaschen.", "es": "He lavado los calcetines." },
    { "de": "Sind das deine Strümpfe?", "es": "¿Esos son tus calcetines?" }
  ],
  "das Stadion": [
    { "de": "Das Stadion ist riesig.", "es": "El estadio es enorme." },
    { "de": "Wir haben das Spiel im Stadion gesehen.", "es": "Hemos visto el partido en el estadio." },
    { "de": "Ist das Stadion ausverkauft?", "es": "¿Está agotado el estadio?" }
  ],
  "Schlafanzug": [
    { "de": "Mein Schlafanzug ist gestreift.", "es": "Mi pijama es de rayas." },
    { "de": "Er hat schon den Schlafanzug angezogen.", "es": "Él ya se ha puesto el pijama." },
    { "de": "Willst du deinen Schlafanzug einpacken?", "es": "¿Quieres guardar tu pijama?" }
  ],
  "Weisheit": [
    { "de": "Die Weisheit kommt mit dem Alter.", "es": "La sabiduría viene con la edad." },
    { "de": "Großvater hat viel Weisheit gesammelt.", "es": "El abuelo ha acumulado mucha sabiduría." },
    { "de": "Liest du Bücher voller Weisheit?", "es": "¿Lees libros llenos de sabiduría?" }
  ],
  "Handgelenk": [
    { "de": "Mein Handgelenk ist verstaucht.", "es": "Mi muñeca está torcida." },
    { "de": "Er hat sich das Handgelenk gebrochen.", "es": "Él se ha roto la muñeca." },
    { "de": "Kannst du dein Handgelenk bewegen?", "es": "¿Puedes mover la muñeca?" }
  ],
  "Geldbörse": [
    { "de": "Die Geldbörse ist aus Leder.", "es": "El monedero es de cuero." },
    { "de": "Ich habe meine Geldbörse zu Hause vergessen.", "es": "He olvidado mi monedero en casa." },
    { "de": "Hast du deine Geldbörse dabei?", "es": "¿Llevas tu monedero encima?" }
  ],
  "Familie": [
    { "de": "Meine Familie ist groß.", "es": "Mi familia es grande." },
    { "de": "Wir haben die Familie am Sonntag besucht.", "es": "Hemos visitado a la familia el domingo." },
    { "de": "Wie geht es deiner Familie?", "es": "¿Cómo está tu familia?" }
  ],
  "Freund": [
    { "de": "Mein Freund heißt Tom.", "es": "Mi amigo se llama Tom." },
    { "de": "Ich habe einen Freund zum Abendessen eingeladen.", "es": "He invitado a un amigo a cenar." },
    { "de": "Kommt dein Freund mit?", "es": "¿Viene tu amigo?" }
  ],
  "das Badezimmer": [
    { "de": "Das Badezimmer ist neu gefliest.", "es": "El baño está alicatado nuevo." },
    { "de": "Er hat das Badezimmer geputzt.", "es": "Él ha limpiado el baño." },
    { "de": "Ist das Badezimmer frei?", "es": "¿Está libre el baño?" }
  ],
  "Abneigung": [
    { "de": "Seine Abneigung war deutlich.", "es": "Su aversión era evidente." },
    { "de": "Sie hat eine Abneigung gegen laute Musik entwickelt.", "es": "Ella ha desarrollado aversión a la música alta." },
    { "de": "Zeigst du offen deine Abneigung?", "es": "¿Muestras abiertamente tu aversión?" }
  ],
  "das Shampoo": [
    { "de": "Das Shampoo riecht gut.", "es": "El champú huele bien." },
    { "de": "Ich habe das Shampoo im Drogeriemarkt gekauft.", "es": "He comprado el champú en la droguería." },
    { "de": "Welches Shampoo benutzt du?", "es": "¿Qué champú usas?" }
  ],
  "dick": [
    { "de": "Der Pullover ist zu dick.", "es": "El jersey es demasiado grueso." },
    { "de": "Er ist nach dem Urlaub dicker geworden.", "es": "Él ha engordado después de las vacaciones." },
    { "de": "Bist du mit dem dicken Buch fertig?", "es": "¿Has terminado el libro grueso?" }
  ],
  "dünn": [
    { "de": "Das Eis ist heute zu dünn.", "es": "El hielo está demasiado delgado hoy." },
    { "de": "Die Suppe ist mir zu dünn geraten.", "es": "La sopa me ha quedado demasiado líquida." },
    { "de": "Trägst du gern dünne Stoffe?", "es": "¿Te gusta llevar telas finas?" }
  ],
  "August": [
    { "de": "Der August ist normalerweise heiß.", "es": "Agosto suele ser caluroso." },
    { "de": "Wir sind im August nach Italien gefahren.", "es": "Nos hemos ido a Italia en agosto." },
    { "de": "Hast du im August Urlaub?", "es": "¿Tienes vacaciones en agosto?" }
  ],
  "das Salz": [
    { "de": "Das Salz steht auf dem Tisch.", "es": "La sal está en la mesa." },
    { "de": "Hast du das Salz schon probiert?", "es": "¿Has probado ya la sal?" },
    { "de": "Kannst du mir das Salz reichen?", "es": "¿Puedes pasarme la sal?" }
  ],
  "Lachs": [
    { "de": "Der Lachs ist sehr frisch.", "es": "El salmón está muy fresco." },
    { "de": "Ich habe noch nie Lachs gegessen.", "es": "Nunca he comido salmón." },
    { "de": "Magst du geräucherten Lachs?", "es": "¿Te gusta el salmón ahumado?" }
  ],
  "die Nuss": [
    { "de": "Die Nuss ist hart.", "es": "La nuez es dura." },
    { "de": "Er hat die Nüsse für den Kuchen gemahlen.", "es": "Él ha molido las nueces para la tarta." },
    { "de": "Knackst du die Nuss?", "es": "¿Partes la nuez?" }
  ]
};

// Unir con lo existente y guardar
const combined = { ...existing, ...block3 };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A1.2.json", escaped, "utf8");
console.log("Bloque 3 añadido. Total de palabras ahora:", Object.keys(combined).length);