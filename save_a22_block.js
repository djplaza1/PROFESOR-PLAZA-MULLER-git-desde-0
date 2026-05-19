const fs = require("fs");
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A2.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A2.2.json", "utf8");
  existing = JSON.parse(raw);
}
// ▼▼▼ PEGA AQUÍ EL BLOQUE DE FRASES (blockX) ▼▼▼
const blockX = {
  "Zahn": [
    { "de": "Der schmerzende Zahn muss dringend behandelt werden.", "es": "El diente dolorido tiene que ser tratado urgentemente." },
    { "de": "Gestern hat mir der freundliche Zahnarzt einen kaputten Zahn gezogen, deshalb esse ich heute Suppe.", "es": "Ayer el amable dentista me extrajo un diente roto, por eso hoy como sopa." },
    { "de": "Putzt du jeden Abend gründlich deine weißen Zähne?", "es": "¿Te lavas a fondo los dientes blancos cada noche?" }
  ],
  "Risiko": [
    { "de": "Das hohe Risiko ist mir zu gefährlich.", "es": "El alto riesgo es demasiado peligroso para mí." },
    { "de": "Gestern hat er ein großes Risiko aufgenommen, obwohl alle abgeraten haben.", "es": "Ayer asumió un gran riesgo, aunque todos lo desaconsejaron." },
    { "de": "Gehst du bei dem windigen Wetter das unnötige Risiko ein?", "es": "¿Corres el riesgo innecesario con este tiempo ventoso?" }
  ],
  "das Kaninchen": [
    { "de": "Das weiße Kaninchen hoppelt durch den Garten.", "es": "El conejo blanco salta por el jardín." },
    { "de": "Gestern haben wir ein süßes Kaninchen im Park gefunden, deshalb brachten wir es zum Tierarzt.", "es": "Ayer encontramos un conejo mono en el parque, por eso lo llevamos al veterinario." },
    { "de": "Fütterst du das braune Kaninchen mit frischen Möhren?", "es": "¿Das de comer al conejo marrón con zanahorias frescas?" }
  ],
  "Kilo": [
    { "de": "Ein schweres Kilo Äpfel kostet zwei Euro.", "es": "Un kilo pesado de manzanas cuesta dos euros." },
    { "de": "Gestern habe ich zwei Kilo zugenommen, deshalb ziehe ich die enge Hose nicht mehr an.", "es": "Ayer engordé dos kilos, por eso ya no me pongo el pantalón ajustado." },
    { "de": "Wie viele Kilo Gepäck darfst du mitnehmen?", "es": "¿Cuántos kilos de equipaje puedes llevarte?" }
  ],
  "Hölle": [
    { "de": "Die brütende Hölle in der Wüste war unerträglich.", "es": "El infierno abrasador en el desierto era insoportable." },
    { "de": "Gestern war die überfüllte U-Bahn die reinste Hölle, deshalb stieg ich früher aus.", "es": "Ayer el metro abarrotado era el mismísimo infierno, por eso me bajé antes." },
    { "de": "Findest du die laute Diskothek auch die totale Hölle?", "es": "¿Encuentras también la ruidosa discoteca el infierno total?" }
  ],
  "Empfang": [
    { "de": "Der herzliche Empfang hat mich sehr gefreut.", "es": "La cálida recepción me alegró mucho." },
    { "de": "Gestern gab es einen festlichen Empfang, weil der neue Botschafter ankam.", "es": "Ayer hubo una recepción festiva porque llegó el nuevo embajador." },
    { "de": "Hast du den offiziellen Empfang im Rathaus besucht?", "es": "¿Asististe a la recepción oficial en el ayuntamiento?" }
  ],
  "wunderbar": [
    { "de": "Das wunderbare Wetter lädt zum Spazieren ein.", "es": "El tiempo maravilloso invita a pasear." },
    { "de": "Gestern hatten wir einen wunderbaren Abend, obwohl es spontan war.", "es": "Ayer tuvimos una velada maravillosa, aunque fue espontánea." },
    { "de": "Findest du das selbstgebackene Brot nicht wunderbar?", "es": "¿No encuentras maravilloso el pan casero?" }
  ],
  "Preis": [
    { "de": "Der reduzierter Preis ist nur heute gültig.", "es": "El precio reducido solo es válido hoy." },
    { "de": "Gestern habe ich einen unglaublichen Preis für das alte Regal bekommen, deshalb freue ich mich.", "es": "Ayer conseguí un precio increíble por la vieja estantería, por eso me alegro." },
    { "de": "Handelst du immer den angegebenen Preis herunter?", "es": "¿Siempre regateas el precio indicado?" }
  ],
  "die Burg": [
    { "de": "Die mittelalterliche Burg thront auf dem steilen Hügel.", "es": "El castillo medieval se alza sobre la empinada colina." },
    { "de": "Gestern besichtigten wir die berühmte Burg, obwohl es stark regnete.", "es": "Ayer visitamos el famoso castillo, aunque llovía fuerte." },
    { "de": "Fotografierst du die beleuchtete Burg in der Abenddämmerung?", "es": "¿Fotografías el castillo iluminado al anochecer?" }
  ],
  "neugierig": [
    { "de": "Das neugierige Kind stellt tausend Fragen.", "es": "El niño curioso hace mil preguntas." },
    { "de": "Gestern war ich so neugierig auf das geheimnisvolle Paket, dass ich es sofort öffnete.", "es": "Ayer tenía tanta curiosidad por el misterioso paquete que lo abrí de inmediato." },
    { "de": "Bist du auch neugierig auf den neuen Nachbarn?", "es": "¿Tú también tienes curiosidad por el nuevo vecino?" }
  ],
  "großzügig": [
    { "de": "Der großzügige Onkel schenkte mir ein Fahrrad.", "es": "El generoso tío me regaló una bicicleta." },
    { "de": "Gestern hat die Firma eine großzügige Spende gegeben, deshalb können wir das Projekt starten.", "es": "Ayer la empresa hizo una generosa donación, por eso podemos iniciar el proyecto." },
    { "de": "Warst du schon immer so unglaublich großzügig?", "es": "¿Siempre has sido tan increíblemente generoso?" }
  ],
  "zutreffend": [
    { "de": "Deine zutreffende Beschreibung half der Polizei.", "es": "Tu pertinente descripción ayudó a la policía." },
    { "de": "Gestern war die alte Regel leider nicht mehr zutreffend, deshalb änderten wir sie.", "es": "Ayer la vieja regla ya no era pertinente por desgracia, por eso la cambiamos." },
    { "de": "Findest du die lange Erklärung wirklich zutreffend?", "es": "¿Encuentras realmente pertinente la larga explicación?" }
  ],
  "Wohnungsamt": [
    { "de": "Das zuständige Wohnungsamt befindet sich im Zentrum.", "es": "La oficina de vivienda competente se encuentra en el centro." },
    { "de": "Gestern musste ich zum überfüllten Wohnungsamt, weil ich einen neuen Mietvertrag brauchte.", "es": "Ayer tuve que ir a la oficina de vivienda abarrotada porque necesitaba un nuevo contrato de alquiler." },
    { "de": "Kennst du die Öffnungszeiten des digitalen Wohnungsamts?", "es": "¿Conoces el horario de apertura de la oficina de vivienda digital?" }
  ],
  "Observierung": [
    { "de": "Die stille Observierung dauerte mehrere Stunden.", "es": "La silenciosa observación duró varias horas." },
    { "de": "Gestern begann die polizeiliche Observierung, weil ein Verdacht bestand.", "es": "Ayer empezó la observación policial porque había una sospecha." },
    { "de": "Hast du die heimliche Observierung des Hauses bemerkt?", "es": "¿Notaste la observación secreta de la casa?" }
  ],
  "Nachbildung": [
    { "de": "Die originalgetreue Nachbildung sieht echt aus.", "es": "La fiel reproducción parece auténtica." },
    { "de": "Gestern haben wir eine preiswerte Nachbildung des Gemäldes gekauft, weil das Original unbezahlbar ist.", "es": "Ayer compramos una reproducción barata del cuadro porque el original es impagable." },
    { "de": "Erkennst du den Unterschied zwischen der echten Vase und der künstlichen Nachbildung?", "es": "¿Reconoces la diferencia entre el jarrón auténtico y la reproducción artificial?" }
  ],
  "Fassung": [
    { "de": "Die überarbeitete Fassung des Textes ist viel besser.", "es": "La versión revisada del texto es mucho mejor." },
    { "de": "Gestern habe ich die originale Fassung des Films gesehen, deshalb verstehe ich jetzt die Handlung.", "es": "Ayer vi la versión original de la película, por eso ahora entiendo la trama." },
    { "de": "Bevorzugst du die kurze Fassung oder die lange Fassung?", "es": "¿Prefieres la versión corta o la versión larga?" }
  ],
  "Humor": [
    { "de": "Sein trockener Humor kommt nicht bei jedem an.", "es": "Su humor seco no le gusta a todo el mundo." },
    { "de": "Gestern hat er mit viel schwarzem Humor die peinliche Situation gerettet, deshalb lachten alle.", "es": "Ayer salvó la situación embarazosa con mucho humor negro, por eso todos rieron." },
    { "de": "Hast du den gleichen seltsamen Humor wie dein Vater?", "es": "¿Tienes el mismo humor raro que tu padre?" }
  ],
  "der Krankenwagen": [
    { "de": "Der blinkende Krankenwagen fuhr mit hoher Geschwindigkeit vorbei.", "es": "La ambulancia con luces pasó a gran velocidad." },
    { "de": "Gestern musste ein roter Krankenwagen kommen, weil der Nachbar gestürzt war.", "es": "Ayer tuvo que venir una ambulancia roja porque el vecino se había caído." },
    { "de": "Riefst du den nächsten Krankenwagen, als der schlimme Unfall passierte?", "es": "¿Llamaste a la ambulancia más cercana cuando ocurrió el grave accidente?" }
  ],
  "Medikament": [
    { "de": "Das verschriebene Medikament muss dreimal täglich genommen werden.", "es": "El medicamento recetado debe tomarse tres veces al día." },
    { "de": "Gestern habe ich ein teures Medikament geholt, weil das alte nicht half.", "es": "Ayer fui a buscar un medicamento caro porque el antiguo no ayudaba." },
    { "de": "Hast du das bittere Medikament mit Wasser geschluckt?", "es": "¿Tragaste el medicamento amargo con agua?" }
  ],
  "umziehen": [
    { "de": "Wir ziehen nächsten Monat in die größere Wohnung um.", "es": "Nos mudamos el próximo mes al piso más grande." },
    { "de": "Gestern ist die laute Familie endlich umgezogen, deshalb ist es jetzt viel ruhiger.", "es": "Ayer la ruidosa familia se mudó por fin, por eso ahora hay mucha más tranquilidad." },
    { "de": "Willst du in die belebte Stadt oder lieber aufs stille Land umziehen?", "es": "¿Quieres mudarte a la animada ciudad o prefieres al tranquilo campo?" }
  ],
  "unhöflich": [
    { "de": "Der unhöfliche Kellner ignorierte uns völlig.", "es": "El camarero grosero nos ignoró por completo." },
    { "de": "Gestern war die Verkäuferin extrem unhöflich, deshalb beschwerte ich mich beim Chef.", "es": "Ayer la dependienta fue extremadamente grosera, por eso me quejé al jefe." },
    { "de": "Warum warst du so unhöflich zu dem netten Herrn?", "es": "¿Por qué fuiste tan grosero con el amable señor?" }
  ],
  "verrückt": [
    { "de": "Der verrückte Professor experimentierte mit bunten Flüssigkeiten.", "es": "El loco profesor experimentaba con líquidos de colores." },
    { "de": "Gestern hatte ich einen verrückten Traum, deshalb wachte ich schweißgebadet auf.", "es": "Ayer tuve un sueño loco, por eso me desperté bañado en sudor." },
    { "de": "Bist du für die waghalsige Idee wirklich verrückt genug?", "es": "¿Estás realmente lo bastante loco para la temeraria idea?" }
  ],
  "Salbe": [
    { "de": "Die kühlende Salbe lindert den juckenden Ausschlag sofort.", "es": "La pomada refrescante alivia la erupción que pica de inmediato." },
    { "de": "Gestern habe ich mir eine teure Salbe gegen die trockene Haut gekauft, deshalb ist sie jetzt weicher.", "es": "Ayer me compré una pomada cara contra la piel seca, por eso ahora está más suave." },
    { "de": "Empfiehlst du die grüne Salbe aus der Apotheke?", "es": "¿Recomiendas la pomada verde de la farmacia?" }
  ],
  "sich konzentrieren": [
    { "de": "Ich konzentriere mich auf die schwierige Aufgabe.", "es": "Me concentro en la difícil tarea." },
    { "de": "Gestern konnte ich mich kaum konzentrieren, weil es im Büro so laut war.", "es": "Ayer apenas pude concentrarme porque la oficina estaba muy ruidosa." },
    { "de": "Kannst du dich bei der lauten Musik besser konzentrieren?", "es": "¿Puedes concentrarte mejor con la música alta?" }
  ],
  "sich ausruhen": [
    { "de": "Ich ruhe mich nach der anstrengenden Arbeit kurz aus.", "es": "Descanso un poco después del trabajo agotador." },
    { "de": "Gestern habe ich mich im kühlen Schatten ausgeruht, deshalb bin ich jetzt wieder fit.", "es": "Ayer descansé en la fresca sombra, por eso ahora estoy otra vez en forma." },
    { "de": "Willst du dich am sonnigen Strand ausruhen?", "es": "¿Quieres descansar en la soleada playa?" }
  ],
  "Osten": [
    { "de": "Der ferne Osten übt eine magische Anziehung auf mich aus.", "es": "El lejano este ejerce una atracción mágica sobre mí." },
    { "de": "Gestern fuhren wir Richtung Osten, um den berühmten Tempel zu besuchen.", "es": "Ayer condujimos hacia el este para visitar el famoso templo." },
    { "de": "Liegt dein Heimatdorf im windigen Osten des Landes?", "es": "¿Está tu pueblo natal en el ventoso este del país?" }
  ],
  "Zelt": [
    { "de": "Das grüne Zelt steht mitten auf der Wiese.", "es": "La tienda de campaña verde está en medio del prado." },
    { "de": "Gestern haben wir das nasse Zelt abgebaut, weil ein Sturm aufzog.", "es": "Ayer desmontamos la tienda mojada porque se avecinaba una tormenta." },
    { "de": "Schläfst du lieber im engen Zelt oder unter dem offenen Sternenhimmel?", "es": "¿Duermes mejor en la estrecha tienda o bajo el cielo estrellado?" }
  ],
  "Mixer": [
    { "de": "Der neue Mixer püriert sogar gefrorene Früchte.", "es": "La nueva batidora tritura incluso frutas congeladas." },
    { "de": "Gestern habe ich den lauten Mixer repariert, deshalb macht er jetzt wieder Smoothies.", "es": "Ayer reparé la ruidosa batidora, por eso ahora vuelve a hacer batidos." },
    { "de": "Kannst du den silbernen Mixer aus dem Schrank holen?", "es": "¿Puedes sacar la batidora plateada del armario?" }
  ],
  "Schlag": [
    { "de": "Der harte Schlag traf ihn völlig unerwartet.", "es": "El duro golpe lo alcanzó de forma totalmente inesperada." },
    { "de": "Gestern erlitt er einen schweren Schlag, nachdem er die schlechte Nachricht hörte.", "es": "Ayer sufrió un duro golpe después de oír la mala noticia." },
    { "de": "Hörst du den lauten Schlag an der Tür?", "es": "¿Oyes el fuerte golpe en la puerta?" }
  ],
  "Handynummer": [
    { "de": "Meine neue Handynummer ist ganz einfach.", "es": "Mi nuevo número de móvil es muy sencillo." },
    { "de": "Gestern habe ich die alte Handynummer gelöscht, weil ich den Vertrag gewechselt habe.", "es": "Ayer borré el viejo número de móvil porque cambié de contrato." },
    { "de": "Gibst du mir deine private Handynummer?", "es": "¿Me das tu número de móvil privado?" }
  ],
  "sich verwandeln": [
    { "de": "Die Raupe verwandelt sich in einen bunten Schmetterling.", "es": "La oruga se transforma en una colorida mariposa." },
    { "de": "Gestern hat sich das stille Mädchen in eine laute Sängerin verwandelt, deshalb waren alle überrascht.", "es": "Ayer la chica callada se transformó en una cantante ruidosa, por eso todos se sorprendieron." },
    { "de": "Kann sich ein kalter Winter in einen warmen Frühling verwandeln?", "es": "¿Puede un frío invierno transformarse en una cálida primavera?" }
  ],
  "Ernennung": [
    { "de": "Die offizielle Ernennung erfolgt nächste Woche.", "es": "El nombramiento oficial se efectúa la próxima semana." },
    { "de": "Gestern wurde die überraschende Ernennung bekannt gegeben, deshalb gratulierten alle.", "es": "Ayer se anunció el sorprendente nombramiento, por eso todos felicitaron." },
    { "de": "Hast du von der neuen Ernennung im Ministerium gehört?", "es": "¿Has oído hablar del nuevo nombramiento en el ministerio?" }
  ],
  "Kamera": [
    { "de": "Meine digitale Kamera macht gestochen scharfe Fotos.", "es": "Mi cámara digital hace fotos nítidas." },
    { "de": "Gestern habe ich die alte Kamera verkauft, weil ich eine bessere will.", "es": "Ayer vendí la cámara vieja porque quiero una mejor." },
    { "de": "Leihst du mir deine teure Kamera für das Konzert?", "es": "¿Me prestas tu cara cámara para el concierto?" }
  ],
  "Handy": [
    { "de": "Mein schwarzes Handy hat einen gesprungenen Bildschirm.", "es": "Mi móvil negro tiene la pantalla rota." },
    { "de": "Gestern habe ich das neue Handy eingerichtet, deshalb sind jetzt alle Apps installiert.", "es": "Ayer configuré el nuevo móvil, por eso ahora están todas las aplicaciones instaladas." },
    { "de": "Hast du das klingelnde Handy in deiner Tasche gehört?", "es": "¿Oíste el móvil sonando en tu bolso?" }
  ],
  "die Bäckerei": [
    { "de": "Die kleine Bäckerei duftet herrlich nach frischem Brot.", "es": "La pequeña panadería huele deliciosamente a pan fresco." },
    { "de": "Gestern habe ich in der vollen Bäckerei drei süße Teilchen gekauft, obwohl ich Diät mache.", "es": "Ayer compré tres pastelitos dulces en la panadería llena, aunque estoy a dieta." },
    { "de": "Gehst du jeden Morgen in dieselbe Bäckerei?", "es": "¿Vas cada mañana a la misma panadería?" }
  ],
  "Einkauf": [
    { "de": "Der große Einkauf für die Party ist endlich erledigt.", "es": "La gran compra para la fiesta por fin está hecha." },
    { "de": "Gestern habe ich den ganzen Einkauf im überfüllten Supermarkt vergessen, deshalb musste ich nochmal los.", "es": "Ayer olvidé toda la compra en el supermercado abarrotado, por eso tuve que volver a ir." },
    { "de": "Bringst du den schweren Einkauf allein nach oben?", "es": "¿Subes la pesada compra tú solo?" }
  ],
  "sich eignen": [
    { "de": "Dieser dicke Stoff eignet sich gut für den Wintermantel.", "es": "Esta tela gruesa es adecuada para el abrigo de invierno." },
    { "de": "Gestern hat sich der alte Raum nicht für die Feier geeignet, deshalb suchten wir einen neuen.", "es": "Ayer la vieja sala no era adecuada para la celebración, por eso buscamos una nueva." },
    { "de": "Eignet sich das kleine Messer für die harte Arbeit?", "es": "¿Es adecuado el cuchillo pequeño para el trabajo duro?" }
  ],
  "Lebensversicherung": [
    { "de": "Die langfristige Lebensversicherung gibt der Familie Sicherheit.", "es": "El seguro de vida a largo plazo da seguridad a la familia." },
    { "de": "Gestern habe ich eine günstige Lebensversicherung abgeschlossen, damit meine Kinder abgesichert sind.", "es": "Ayer contraté un seguro de vida barato para que mis hijos estén protegidos." },
    { "de": "Hast du schon eine private Lebensversicherung für das Alter?", "es": "¿Ya tienes un seguro de vida privado para la vejez?" }
  ],
  "Konsumation": [
    { "de": "Die tägliche Konsumation von Zucker ist ungesund.", "es": "El consumo diario de azúcar es insano." },
    { "de": "Gestern habe ich meine persönliche Konsumation von Kaffee reduziert, deshalb schlafe ich besser.", "es": "Ayer reduje mi consumo personal de café, por eso duermo mejor." },
    { "de": "Wie hoch ist die monatliche Konsumation an Strom in deiner Wohnung?", "es": "¿Cuán alto es el consumo mensual de electricidad en tu piso?" }
  ],
  "Krankenhaus": [
    { "de": "Das moderne Krankenhaus hat eine neue Notaufnahme.", "es": "El hospital moderno tiene un nuevo servicio de urgencias." },
    { "de": "Gestern musste ich ins nächste Krankenhaus, weil mein Arm gebrochen war.", "es": "Ayer tuve que ir al hospital más cercano porque mi brazo estaba roto." },
    { "de": "Liegt das städtische Krankenhaus weit von hier?", "es": "¿Está lejos de aquí el hospital municipal?" }
  ],
  "Bericht": [
    { "de": "Der ausführliche Bericht liegt auf deinem Schreibtisch.", "es": "El informe detallado está sobre tu escritorio." },
    { "de": "Gestern habe ich den langweiligen Bericht endlich fertig geschrieben, deshalb bin ich erleichtert.", "es": "Ayer terminé de escribir por fin el aburrido informe, por eso estoy aliviado." },
    { "de": "Schickst du mir den überarbeiteten Bericht noch heute?", "es": "¿Me envías el informe revisado hoy mismo?" }
  ],
  "Pein": [
    { "de": "Die seelische Pein war ihm deutlich anzusehen.", "es": "Se le notaba claramente el dolor anímico." },
    { "de": "Gestern litt er unter großer Pein, weil er den geliebten Hund verlor.", "es": "Ayer sufrió un gran dolor porque perdió al querido perro." },
    { "de": "Wie erträgst du die stille Pein in deinem Herzen?", "es": "¿Cómo soportas el callado dolor en tu corazón?" }
  ],
  "Mutterschaft": [
    { "de": "Die bevorstehende Mutterschaft erfüllt sie mit Freude.", "es": "La maternidad venidera la llena de alegría." },
    { "de": "Gestern hat sie von ihrer frühen Mutterschaft erzählt, deshalb waren alle gerührt.", "es": "Ayer contó de su temprana maternidad, por eso todos se emocionaron." },
    { "de": "Bereitest du dich auf die neue Mutterschaft vor?", "es": "¿Te preparas para la nueva maternidad?" }
  ],
  "Novelle": [
    { "de": "Die spannende Novelle wurde verfilmt.", "es": "La emocionante novela corta fue llevada al cine." },
    { "de": "Gestern habe ich eine traurige Novelle gelesen, deshalb hatte ich Tränen in den Augen.", "es": "Ayer leí una triste novela corta, por eso tenía lágrimas en los ojos." },
    { "de": "Empfiehlst du die romantische Novelle für den Urlaub?", "es": "¿Recomiendas la novela corta romántica para las vacaciones?" }
  ],
  "Obhut": [
    { "de": "Die elterliche Obhut endet mit der Volljährigkeit.", "es": "El cuidado parental termina con la mayoría de edad." },
    { "de": "Gestern gab die Mutter ihr krankes Kind in ärztliche Obhut, weil sie selbst ins Krankenhaus musste.", "es": "Ayer la madre dejó a su hijo enfermo al cuidado médico porque ella misma tenía que ir al hospital." },
    { "de": "Befindet sich das wertvolle Gemälde in sicherer Obhut?", "es": "¿Está el valioso cuadro bajo cuidado seguro?" }
  ],
  "zudem": [
    { "de": "Das Buch ist spannend, und zudem sehr lehrreich.", "es": "El libro es emocionante y además muy instructivo." },
    { "de": "Gestern war das Wetter schlecht, zudem hatte ich Kopfschmerzen, deshalb blieb ich zu Hause.", "es": "Ayer el tiempo era malo, además tenía dolor de cabeza, por eso me quedé en casa." },
    { "de": "Zudem, bringst du morgen den Kuchen mit?", "es": "Además, ¿traes tú mañana la tarta?" }
  ],
  "Krawatte": [
    { "de": "Die bunte Krawatte passt perfekt zum Hemd.", "es": "La corbata de colores combina perfectamente con la camisa." },
    { "de": "Gestern habe ich eine seidene Krawatte geschenkt bekommen, deshalb trug ich sie gleich.", "es": "Ayer me regalaron una corbata de seda, por eso me la puse enseguida." },
    { "de": "Bindest du die schmale Krawatte mit einem einfachen Knoten?", "es": "¿Anudas la corbata estrecha con un nudo sencillo?" }
  ],
  "Mantel": [
    { "de": "Mein warmer Mantel hängt an der Garderobe.", "es": "Mi abrigo caliente cuelga en el perchero." },
    { "de": "Gestern habe ich den dicken Mantel zu Hause vergessen, deshalb fror ich den ganzen Tag.", "es": "Ayer olvidé el abrigo grueso en casa, por eso pasé frío todo el día." },
    { "de": "Leihst du mir den schwarzen Mantel für das Bewerbungsgespräch?", "es": "¿Me prestas el abrigo negro para la entrevista de trabajo?" }
  ],
  "waschen": [
    { "de": "Ich wasche die schmutzige Wäsche jeden Samstag.", "es": "Lavo la ropa sucia cada sábado." },
    { "de": "Gestern habe ich das neue Hemd gewaschen, deshalb ist es jetzt eingelaufen.", "es": "Ayer lavé la camisa nueva, por eso ahora ha encogido." },
    { "de": "Kannst du bitte das fettige Geschirr waschen?", "es": "¿Puedes lavar los platos grasientos, por favor?" }
  ],
  "Stadion": [
    { "de": "Das riesige Stadion war bis auf den letzten Platz gefüllt.", "es": "El enorme estadio estaba lleno hasta la última plaza." },
    { "de": "Gestern sind wir ins berühmte Stadion gepilgert, obwohl das Spiel ausverkauft war.", "es": "Ayer peregrinamos al famoso estadio, aunque el partido estaba agotado." },
    { "de": "Gehst du am Samstag in das neue Stadion?", "es": "¿Vas el sábado al nuevo estadio?" }
  ]
};
// ▲▲▲ FIN DEL BLOQUE ▲▲▲
const combined = { ...existing, ...blockX };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A2.2.json", escaped, "utf8");
console.log("Bloque añadido. Total de palabras:", Object.keys(combined).length);