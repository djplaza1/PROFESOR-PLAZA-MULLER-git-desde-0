const fs = require("fs");
let existing = {};
if (fs.existsSync("src/data/phrasesBank_A2.2.json")) {
  const raw = fs.readFileSync("src/data/phrasesBank_A2.2.json", "utf8");
  existing = JSON.parse(raw);
}
// ▼▼▼ PEGA AQUÍ EL BLOQUE DE FRASES (blockX) ▼▼▼
const blockX = {
  "Campingplatz": [
    { "de": "Der Campingplatz ist schön.", "es": "El camping es bonito." },
    { "de": "Gestern haben wir auf dem Campingplatz übernachtet.", "es": "Ayer pernoctamos en el camping." },
    { "de": "Kannst du den Campingplatz reservieren?", "es": "¿Puedes reservar el camping?" }
  ],
  "Fahrplan": [
    { "de": "Der Fahrplan ist kompliziert.", "es": "El horario es complicado." },
    { "de": "Ich habe gestern den Fahrplan studiert.", "es": "Ayer estudié el horario." },
    { "de": "Wo kann ich den Fahrplan finden?", "es": "¿Dónde puedo encontrar el horario?" }
  ],
  "Nachlässigkeit": [
    { "de": "Nachlässigkeit ist gefährlich.", "es": "La negligencia es peligrosa." },
    { "de": "Er hat gestern seine Nachlässigkeit zugegeben.", "es": "Ayer admitió su negligencia." },
    { "de": "Warum hast du so viel Nachlässigkeit gezeigt?", "es": "¿Por qué has mostrado tanta negligencia?" }
  ],
  "Freiwilligenarbeit": [
    { "de": "Freiwilligenarbeit ist wichtig.", "es": "El trabajo voluntario es importante." },
    { "de": "Gestern habe ich Freiwilligenarbeit geleistet.", "es": "Ayer hice trabajo voluntario." },
    { "de": "Suchst du nach Freiwilligenarbeit?", "es": "¿Buscas trabajo voluntario?" }
  ],
  "Niederschrift": [
    { "de": "Die Niederschrift ist korrekt.", "es": "La transcripción es correcta." },
    { "de": "Ich habe gestern die Niederschrift überprüft.", "es": "Ayer revisé la transcripción." },
    { "de": "Wer hat die Niederschrift gemacht?", "es": "¿Quién hizo la transcripción?" }
  ],
  "der Übersetzer": [
    { "de": "Der Übersetzer ist fleißig.", "es": "El traductor es aplicado." },
    { "de": "Gestern hat der Übersetzer den Text übersetzt.", "es": "Ayer el traductor tradujo el texto." },
    { "de": "Kennst du einen guten Übersetzer?", "es": "¿Conoces a un buen traductor?" }
  ],
  "Gruppenarbeit": [
    { "de": "Gruppenarbeit macht Spaß.", "es": "El trabajo en grupo es divertido." },
    { "de": "Wir haben gestern eine Gruppenarbeit gemacht.", "es": "Ayer hicimos un trabajo en grupo." },
    { "de": "Willst du bei der Gruppenarbeit mitmachen?", "es": "¿Quieres participar en el trabajo en grupo?" }
  ],
  "sich erkundigen": [
    { "de": "Ich erkundige mich bei der Rezeption.", "es": "Me informo en la recepción." },
    { "de": "Gestern habe ich mich nach den Preisen erkundigt.", "es": "Ayer me informé de los precios." },
    { "de": "Wonach möchtest du dich erkundigen?", "es": "¿Sobre qué quieres informarte?" }
  ],
  "sich freuen": [
    { "de": "Ich freue mich über das Geschenk.", "es": "Me alegro por el regalo." },
    { "de": "Gestern hat sie sich über die Blumen gefreut.", "es": "Ayer se alegró de las flores." },
    { "de": "Freust du dich auf das Wochenende?", "es": "¿Te alegras por el fin de semana?" }
  ],
  "sich fürchten": [
    { "de": "Ich fürchte mich vor Spinnen.", "es": "Temo a las arañas." },
    { "de": "Gestern hat er sich im Dunkeln gefürchtet.", "es": "Ayer tuvo miedo en la oscuridad." },
    { "de": "Wovor fürchtest du dich?", "es": "¿A qué temes?" }
  ],
  "Bar": [
    { "de": "Die Bar ist geschlossen.", "es": "El bar está cerrado." },
    { "de": "Gestern haben wir in der Bar etwas getrunken.", "es": "Ayer tomamos algo en el bar." },
    { "de": "Sollen wir heute Abend in die Bar gehen?", "es": "¿Deberíamos ir al bar esta noche?" }
  ],
  "Wandertag": [
    { "de": "Der Wandertag war anstrengend.", "es": "El día de senderismo fue agotador." },
    { "de": "Gestern war Wandertag und wir sind weit gelaufen.", "es": "Ayer fue el día de senderismo y caminamos mucho." },
    { "de": "Wann ist der nächste Wandertag?", "es": "¿Cuándo es el próximo día de senderismo?" }
  ],
  "beispielsweise": [
    { "de": "Beispielsweise mag ich Hunde.", "es": "Por ejemplo, me gustan los perros." },
    { "de": "Gestern habe ich beispielsweise einen Film gesehen.", "es": "Ayer, por ejemplo, vi una película." },
    { "de": "Kannst du mir beispielsweise helfen?", "es": "¿Puedes, por ejemplo, ayudarme?" }
  ],
  "Akku": [
    { "de": "Der Akku ist leer.", "es": "La batería está vacía." },
    { "de": "Ich habe gestern den Akku geladen.", "es": "Ayer cargué la batería." },
    { "de": "Kannst du mir dein Ladegerät für den Akku leihen?", "es": "¿Puedes prestarme tu cargador para la batería?" }
  ],
  "Ladekabel": [
    { "de": "Das Ladekabel ist kaputt.", "es": "El cable de carga está roto." },
    { "de": "Hast du gestern mein Ladekabel benutzt?", "es": "¿Usaste ayer mi cable de carga?" },
    { "de": "Wo ist das Ladekabel?", "es": "¿Dónde está el cable de carga?" }
  ],
  "auswandern": [
    { "de": "Viele Leute wandern aus.", "es": "Mucha gente emigra." },
    { "de": "Meine Tante ist vor fünf Jahren ausgewandert.", "es": "Mi tía emigró hace cinco años." },
    { "de": "Willst du später auswandern?", "es": "¿Quieres emigrar más tarde?" }
  ],
  "ocuparse de": [
    { "de": "Ich kümmere mich um die Gäste.", "es": "Me ocupo de los invitados." },
    { "de": "Gestern habe ich mich um die Reservierung gekümmert.", "es": "Ayer me ocupé de la reserva." },
    { "de": "Wer kann sich um das Problem kümmern?", "es": "¿Quién puede ocuparse del problema?" }
  ],
  "ziehen": [
    { "de": "Ich ziehe den Wagen.", "es": "Tiro del carro." },
    { "de": "Gestern habe ich den schweren Koffer gezogen.", "es": "Ayer arrastré la maleta pesada." },
    { "de": "Kannst du bitte an der Tür ziehen?", "es": "¿Puedes tirar de la puerta, por favor?" }
  ],
  "schieben": [
    { "de": "Ich schiebe das Fahrrad.", "es": "Empujo la bicicleta." },
    { "de": "Er hat gestern den Tisch geschoben.", "es": "Ayer empujó la mesa." },
    { "de": "Musst du immer alles schieben?", "es": "¿Tienes que empujarlo todo siempre?" }
  ],
  "Nennung": [
    { "de": "Die Nennung deines Namens ist erforderlich.", "es": "La mención de tu nombre es necesaria." },
    { "de": "Gestern erfolgte die Nennung der Gewinner.", "es": "Ayer se mencionó a los ganadores." },
    { "de": "Warum ist die Nennung wichtig?", "es": "¿Por qué es importante la mención?" }
  ],
  "Besorgung": [
    { "de": "Die Besorgung war schnell erledigt.", "es": "La compra se hizo rápido." },
    { "de": "Gestern habe ich einige Besorgungen gemacht.", "es": "Ayer hice algunas compras." },
    { "de": "Kannst du für mich eine Besorgung erledigen?", "es": "¿Puedes hacerme una compra?" }
  ],
  "Strumpfhose": [
    { "de": "Die Strumpfhose ist warm.", "es": "Las medias son calentitas." },
    { "de": "Ich habe gestern eine neue Strumpfhose gekauft.", "es": "Ayer compré unas medias nuevas." },
    { "de": "Trägst du heute eine Strumpfhose?", "es": "¿Llevas medias hoy?" }
  ],
  "das Fieber": [
    { "de": "Das Fieber ist hoch.", "es": "La fiebre es alta." },
    { "de": "Gestern hatte ich Fieber und bin zu Hause geblieben.", "es": "Ayer tuve fiebre y me quedé en casa." },
    { "de": "Hast du immer noch Fieber?", "es": "¿Todavía tienes fiebre?" }
  ],
  "Pacht": [
    { "de": "Die Pacht ist teuer.", "es": "El alquiler es caro." },
    { "de": "Wir haben gestern die Pacht bezahlt.", "es": "Ayer pagamos el alquiler." },
    { "de": "Wie lange läuft die Pacht?", "es": "¿Por cuánto tiempo es el alquiler?" }
  ],
  "Zertifikat": [
    { "de": "Das Zertifikat ist gültig.", "es": "El certificado es válido." },
    { "de": "Gestern habe ich ein Zertifikat erhalten.", "es": "Ayer recibí un certificado." },
    { "de": "Brauchst du ein Zertifikat für den Job?", "es": "¿Necesitas un certificado para el trabajo?" }
  ],
  "Ortschaft": [
    { "de": "Die Ortschaft ist klein.", "es": "La localidad es pequeña." },
    { "de": "Gestern haben wir eine malerische Ortschaft besucht.", "es": "Ayer visitamos una localidad pintoresca." },
    { "de": "Wie heißt diese Ortschaft?", "es": "¿Cómo se llama esta localidad?" }
  ],
  "Gerichtsbarkeit": [
    { "de": "Die Gerichtsbarkeit ist kompliziert.", "es": "La jurisdicción es complicada." },
    { "de": "Gestern wurde über die Gerichtsbarkeit diskutiert.", "es": "Ayer se discutió sobre la jurisdicción." },
    { "de": "Wer hat die Gerichtsbarkeit in diesem Fall?", "es": "¿Quién tiene la jurisdicción en este caso?" }
  ],
  "das Tennis": [
    { "de": "Tennis macht fit.", "es": "El tenis pone en forma." },
    { "de": "Gestern habe ich mit meinem Bruder Tennis gespielt.", "es": "Ayer jugué al tenis con mi hermano." },
    { "de": "Spielst du regelmäßig Tennis?", "es": "¿Juegas al tenis regularmente?" }
  ],
  "Touristeninformation": [
    { "de": "Die Touristeninformation ist geöffnet.", "es": "La oficina de turismo está abierta." },
    { "de": "Gestern haben wir die Touristeninformation besucht.", "es": "Ayer visitamos la oficina de turismo." },
    { "de": "Kannst du mir den Weg zur Touristeninformation zeigen?", "es": "¿Puedes mostrarme el camino a la oficina de turismo?" }
  ],
  "Schwimmbad": [
    { "de": "Das Schwimmbad ist sauber.", "es": "La piscina está limpia." },
    { "de": "Gestern sind wir ins Schwimmbad gegangen.", "es": "Ayer fuimos a la piscina." },
    { "de": "Willst du heute ins Schwimmbad gehen?", "es": "¿Quieres ir hoy a la piscina?" }
  ],
  "der Hausarzt": [
    { "de": "Mein Hausarzt ist sehr erfahren.", "es": "Mi médico de cabecera tiene mucha experiencia." },
    { "de": "Gestern war ich beim Hausarzt.", "es": "Ayer fui al médico de cabecera." },
    { "de": "Kannst du mir deinen Hausarzt empfehlen?", "es": "¿Puedes recomendarme a tu médico de cabecera?" }
  ],
  "der Geldbeutel": [
    { "de": "Mein Geldbeutel ist weg.", "es": "Mi monedero ha desaparecido." },
    { "de": "Gestern habe ich meinen Geldbeutel verloren.", "es": "Ayer perdí mi monedero." },
    { "de": "Hast du meinen Geldbeutel gesehen?", "es": "¿Has visto mi monedero?" }
  ],
  "schenken": [
    { "de": "Ich schenke dir Blumen.", "es": "Te regalo flores." },
    { "de": "Gestern hat er mir ein Buch geschenkt.", "es": "Ayer me regaló un libro." },
    { "de": "Was willst du mir schenken?", "es": "¿Qué quieres regalarme?" }
  ],
  "Friedlichkeit": [
    { "de": "Friedlichkeit ist wertvoll.", "es": "La paz es valiosa." },
    { "de": "Gestern herrschte eine tiefe Friedlichkeit.", "es": "Ayer reinaba una profunda paz." },
    { "de": "Wie können wir Friedlichkeit bewahren?", "es": "¿Cómo podemos preservar la paz?" }
  ],
  "Operation": [
    { "de": "Die Operation ist morgen.", "es": "La operación es mañana." },
    { "de": "Gestern wurde die Operation erfolgreich durchgeführt.", "es": "Ayer la operación se realizó con éxito." },
    { "de": "Hast du Angst vor der Operation?", "es": "¿Tienes miedo de la operación?" }
  ],
  "Spritze": [
    { "de": "Die Spritze ist schmerzhaft.", "es": "La inyección es dolorosa." },
    { "de": "Gestern hat mir die Ärztin eine Spritze gegeben.", "es": "Ayer la médica me puso una inyección." },
    { "de": "Brauchst du eine Spritze?", "es": "¿Necesitas una inyección?" }
  ],
  "Chance": [
    { "de": "Die Chance ist groß.", "es": "La oportunidad es grande." },
    { "de": "Gestern habe ich eine große Chance bekommen.", "es": "Ayer recibí una gran oportunidad." },
    { "de": "Willst du die Chance nutzen?", "es": "¿Quieres aprovechar la oportunidad?" }
  ],
  "das Stadion": [
    { "de": "Das Stadion ist voll.", "es": "El estadio está lleno." },
    { "de": "Gestern haben wir das Stadion besichtigt.", "es": "Ayer visitamos el estadio." },
    { "de": "Gehst du oft ins Stadion?", "es": "¿Vas a menudo al estadio?" }
  ],
  "Körper": [
    { "de": "Der Körper braucht Bewegung.", "es": "El cuerpo necesita movimiento." },
    { "de": "Gestern habe ich meinen Körper trainiert.", "es": "Ayer entrené mi cuerpo." },
    { "de": "Pflegst du deinen Körper?", "es": "¿Cuidas tu cuerpo?" }
  ],
  "Gesicht": [
    { "de": "Dein Gesicht ist mir bekannt.", "es": "Tu cara me resulta familiar." },
    { "de": "Gestern habe ich dein Gesicht im Traum gesehen.", "es": "Ayer vi tu cara en un sueño." },
    { "de": "Kannst du das Gesicht zeichnen?", "es": "¿Puedes dibujar la cara?" }
  ],
  "abschneiden": [
    { "de": "Ich schneide die Hecke ab.", "es": "Corto el seto." },
    { "de": "Gestern habe ich meine Haare abgeschnitten.", "es": "Ayer me corté el pelo." },
    { "de": "Soll ich das Etikett abschneiden?", "es": "¿Debo cortar la etiqueta?" }
  ],
  "Rundgang": [
    { "de": "Der Rundgang dauert eine Stunde.", "es": "El recorrido dura una hora." },
    { "de": "Gestern haben wir einen Rundgang durch das Museum gemacht.", "es": "Ayer hicimos un recorrido por el museo." },
    { "de": "Können wir an einem Rundgang teilnehmen?", "es": "¿Podemos participar en un recorrido?" }
  ],
  "Postkarte": [
    { "de": "Die Postkarte ist aus Paris.", "es": "La postal es de París." },
    { "de": "Gestern habe ich eine Postkarte geschickt.", "es": "Ayer envié una postal." },
    { "de": "Schreibst du mir eine Postkarte?", "es": "¿Me escribes una postal?" }
  ],
  "Garage": [
    { "de": "Die Garage ist voll.", "es": "El garaje está lleno." },
    { "de": "Gestern habe ich die Garage aufgeräumt.", "es": "Ayer ordené el garaje." },
    { "de": "Parkst du dein Auto in der Garage?", "es": "¿Aparcas tu coche en el garaje?" }
  ],
  "andererseits": [
    { "de": "Andererseits ist es teuer.", "es": "Por otro lado, es caro." },
    { "de": "Gestern war das Wetter schlecht, andererseits hatten wir viel Spaß.", "es": "Ayer hizo mal tiempo, por otro lado nos divertimos mucho." },
    { "de": "Andererseits, hast du eine bessere Idee?", "es": "Por otro lado, ¿tienes una idea mejor?" }
  ],
  "Erfüllung": [
    { "de": "Die Erfüllung des Vertrags ist wichtig.", "es": "El cumplimiento del contrato es importante." },
    { "de": "Gestern haben wir die Erfüllung der Bedingungen besprochen.", "es": "Ayer hablamos del cumplimiento de las condiciones." },
    { "de": "Wann erwarten wir die Erfüllung?", "es": "¿Cuándo esperamos el cumplimiento?" }
  ],
  "Stockwerk": [
    { "de": "Mein Büro ist im dritten Stockwerk.", "es": "Mi oficina está en el tercer piso." },
    { "de": "Gestern bin ich alle Stockwerke zu Fuß gegangen.", "es": "Ayer subí todos los pisos a pie." },
    { "de": "In welchem Stockwerk wohnst du?", "es": "¿En qué piso vives?" }
  ],
  "Belieferung": [
    { "de": "Die Belieferung ist pünktlich.", "es": "El suministro es puntual." },
    { "de": "Gestern ist die Belieferung nicht angekommen.", "es": "Ayer no llegó el suministro." },
    { "de": "Wann erfolgt die nächste Belieferung?", "es": "¿Cuándo se realizará el próximo suministro?" }
  ],
  "der Architekt": [
    { "de": "Der Architekt ist kreativ.", "es": "El arquitecto es creativo." },
    { "de": "Gestern hat der Architekt die Pläne gezeigt.", "es": "Ayer el arquitecto mostró los planos." },
    { "de": "Kennst du einen guten Architekten?", "es": "¿Conoces a un buen arquitecto?" }
  ],
  "der Ball": [
    { "de": "Der Ball ist rund.", "es": "La pelota es redonda." },
    { "de": "Gestern habe ich einen neuen Ball gekauft.", "es": "Ayer compré una pelota nueva." },
    { "de": "Kannst du den Ball werfen?", "es": "¿Puedes lanzar la pelota?" }
  ]
};
// ▲▲▲ FIN DEL BLOQUE ▲▲▲
const combined = { ...existing, ...blockX };
const jsonStr = JSON.stringify(combined, null, 2);
const escaped = jsonStr.replace(/[^\x00-\x7F]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync("src/data/phrasesBank_A2.2.json", escaped, "utf8");
console.log("Bloque añadido. Total de palabras:", Object.keys(combined).length);