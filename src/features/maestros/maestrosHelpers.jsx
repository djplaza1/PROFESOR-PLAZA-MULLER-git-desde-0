// src/features/maestros/maestrosHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Maestros = window.Muller.Maestros || {};

// Definición de módulos / lecciones de gramática
window.Muller.Maestros.LECCIONES = [
  {
    id: "artikel",
    titulo: "Artículos (der, die, das)",
    icono: "📘",
    colorBorde: "border-blue-500",
    bg: "bg-blue-950/30",
    nivel: "A1",
    resumen: "Aprende a identificar el género de los sustantivos y usar los artículos correctamente.",
    explicacion: `
      <p>En alemán cada sustantivo tiene un <strong>género gramatical</strong>: masculino, femenino o neutro. Los artículos definidos son <strong>der</strong> (masculino), <strong>die</strong> (femenino) y <strong>das</strong> (neutro).</p>
      <ul class="list-disc pl-5 space-y-1 mt-2">
        <li><strong>der</strong> Mann (el hombre)</li>
        <li><strong>die</strong> Frau (la mujer)</li>
        <li><strong>das</strong> Kind (el niño)</li>
      </ul>
      <p class="mt-2">Algunas reglas útiles:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Palabras terminadas en -ung, -heit, -keit, -schaft, -ei → <strong>die</strong></li>
        <li>Palabras terminadas en -chen, -lein → <strong>das</strong></li>
        <li>Palabras terminadas en -er, -el, -en, -ig, -ling → <strong>der</strong></li>
      </ul>
    `,
    ejemplos: ["der Tisch (la mesa)", "die Lampe (la lámpara)", "das Buch (el libro)", "die Freiheit (la libertad)", "das Mädchen (la chica)"]
  },
  {
    id: "preposiciones",
    titulo: "Preposiciones y casos",
    icono: "📗",
    colorBorde: "border-green-500",
    bg: "bg-green-950/30",
    nivel: "A2",
    resumen: "Domina las preposiciones que rigen acusativo, dativo o genitivo y las Wechselpräpositionen.",
    explicacion: `
      <p>Las preposiciones en alemán <strong>determinan el caso</strong> del sustantivo que las sigue.</p>
      <p class="mt-2 font-semibold">Siempre acusativo:</p>
      <p>durch, für, gegen, ohne, um</p>
      <p class="mt-2 font-semibold">Siempre dativo:</p>
      <p>aus, bei, mit, nach, seit, von, zu</p>
      <p class="mt-2 font-semibold">Wechselpräpositionen (acusativo → movimiento, dativo → ubicación):</p>
      <p>an, auf, hinter, in, neben, über, unter, vor, zwischen</p>
      <p class="mt-2 italic">Ej: Ich gehe <strong>in die</strong> Schule (acus.). Ich bin <strong>in der</strong> Schule (dat.).</p>
    `,
    ejemplos: ["mit dem Auto (dat.)", "für den Mann (acus.)", "auf dem Tisch (dat. / ubicación)", "auf den Tisch (acus. / movimiento)"]
  },
  {
    id: "verbos",
    titulo: "Conjugación de verbos",
    icono: "📙",
    colorBorde: "border-purple-500",
    bg: "bg-purple-950/30",
    nivel: "A1",
    resumen: "Presente, pasado (Perfekt y Präteritum) y verbos separables e inseparables.",
    explicacion: `
      <p>En presente, la mayoría de los verbos siguen este patrón:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>ich <strong>-e</strong> (machen → ich mache)</li>
        <li>du <strong>-st</strong> (machen → du machst)</li>
        <li>er/sie/es <strong>-t</strong> (machen → er macht)</li>
        <li>wir <strong>-en</strong>, ihr <strong>-t</strong>, sie/Sie <strong>-en</strong></li>
      </ul>
      <p class="mt-2">El <strong>Perfekt</strong> se forma con haben/sein + participio: ich <strong>habe gemacht</strong>.</p>
      <p>Verbos separables: prefijo se separa en presente → <strong>auf</strong>machen: ich mache <strong>auf</strong>.</p>
    `,
    ejemplos: ["ich lerne (aprendo)", "du hast gelernt (has aprendido)", "ich stehe auf (me levanto)", "er ist gefahren (él ha conducido)"]
  },
  {
    id: "declinacion",
    titulo: "Declinación del adjetivo",
    icono: "📕",
    colorBorde: "border-orange-500",
    bg: "bg-orange-950/30",
    nivel: "B1",
    resumen: "Aprende las terminaciones del adjetivo según artículo, caso y género.",
    explicacion: `
      <p>El adjetivo en alemán cambia su terminación según el <strong>artículo que lo acompaña</strong>, el <strong>caso</strong> y el <strong>género</strong>.</p>
      <p class="mt-2 font-semibold">Con artículo definido (der/die/das):</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Nominativo: der gut<strong>e</strong> Wein</li>
        <li>Acusativo: den gut<strong>en</strong> Wein</li>
        <li>Dativo: dem gut<strong>en</strong> Wein</li>
      </ul>
      <p class="mt-2 font-semibold">Sin artículo:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Nominativo: gut<strong>er</strong> Wein</li>
        <li>Acusativo: gut<strong>en</strong> Wein</li>
        <li>Dativo: gut<strong>em</strong> Wein</li>
      </ul>
      <p class="mt-2">Con artículo indefinido (ein/eine) es una mezcla: nominativo masc. → ein gut<strong>er</strong> Wein.</p>
    `,
    ejemplos: ["der alte Mann", "ein alter Mann", "die schöne Frau", "mit dem alten Mann"]
  },
  {
    id: "oraciones",
    titulo: "Estructura de la oración",
    icono: "📓",
    colorBorde: "border-cyan-500",
    bg: "bg-cyan-950/30",
    nivel: "A2",
    resumen: "Posición del verbo en oraciones principales, subordinadas y preguntas.",
    explicacion: `
      <p>En oraciones <strong>principales</strong>, el verbo conjugado va en <strong>segunda posición</strong>.</p>
      <p class="italic">Ej: Ich <strong>gehe</strong> heute ins Kino.</p>
      <p class="mt-2">En <strong>preguntas cerradas</strong> (sí/no), el verbo va <strong>primero</strong>.</p>
      <p class="italic">Ej: <strong>Gehst</strong> du ins Kino?</p>
      <p class="mt-2">En <strong>subordinadas</strong>, el verbo va al <strong>final</strong>.</p>
      <p class="italic">Ej: ..., weil ich ins Kino <strong>gehe</strong>.</p>
      <p class="mt-2">Con verbos modales o Perfekt, el infinitivo/participio va al final en principal: Ich <strong>muss</strong> heute arbeiten. Ich <strong>habe</strong> gearbeitet.</p>
    `,
    ejemplos: ["Ich trinke Kaffee.", "Trinkst du Kaffee?", "Ich weiß, dass du Kaffee trinkst.", "Ich möchte einen Kaffee trinken."]
  },
  {
    id: "pronombres",
    titulo: "Pronombres personales",
    icono: "📔",
    colorBorde: "border-pink-500",
    bg: "bg-pink-950/30",
    nivel: "A1",
    resumen: "ich, du, er/sie/es, wir, ihr, sie/Sie en los cuatro casos.",
    explicacion: `
      <p>Pronombres personales según caso:</p>
      <table class="w-full text-sm mt-2">
        <tr><th class="text-left">Nominativo</th><td>ich</td><td>du</td><td>er</td><td>sie</td><td>es</td><td>wir</td><td>ihr</td><td>sie/Sie</td></tr>
        <tr><th class="text-left">Acusativo</th><td>mich</td><td>dich</td><td>ihn</td><td>sie</td><td>es</td><td>uns</td><td>euch</td><td>sie/Sie</td></tr>
        <tr><th class="text-left">Dativo</th><td>mir</td><td>dir</td><td>ihm</td><td>ihr</td><td>ihm</td><td>uns</td><td>euch</td><td>ihnen/Ihnen</td></tr>
      </table>
    `,
    ejemplos: ["Ich liebe dich.", "Er gibt mir das Buch.", "Wir helfen euch.", "Ich sehe sie (a ella).", "Sie dankt ihm."]
  }
];

// getAllLevels: fusiona todos los niveles A1.1 a C1
window.Muller.Maestros.getAllLevels = function() {
  var niveles = [
    { id: "A1_1", nombre: "A1.1", descripcion: "Principiante completo", nivelRaiz: "A1", modulos: window.Muller.Maestros.contenido.A1_1 || [] },
    { id: "A1_2", nombre: "A1.2", descripcion: "Principiante avanzado", nivelRaiz: "A1", modulos: window.Muller.Maestros.contenido.A1_2 || [] },
    { id: "A2_1", nombre: "A2.1", descripcion: "Básico", nivelRaiz: "A2", modulos: window.Muller.Maestros.contenido.A2_1 || window.Muller.Maestros.A2_1 || [] },
    { id: "A2_2", nombre: "A2.2", descripcion: "Básico avanzado", nivelRaiz: "A2", modulos: window.Muller.Maestros.contenido.A2_2 || window.Muller.Maestros.A2_2 || [] },
    { id: "B1_1", nombre: "B1.1", descripcion: "Intermedio bajo", nivelRaiz: "B1", modulos: window.Muller.Maestros.contenido.B1_1 || window.Muller.Maestros.B1_1 || [] },
    { id: "B1_2", nombre: "B1.2", descripcion: "Intermedio", nivelRaiz: "B1", modulos: window.Muller.Maestros.contenido.B1_2 || window.Muller.Maestros.B1_2 || [] },
    { id: "B2_1", nombre: "B2.1", descripcion: "Intermedio alto", nivelRaiz: "B2", modulos: window.Muller.Maestros.contenido.B2_1 || window.Muller.Maestros.B2_1 || [] },
    { id: "B2_2", nombre: "B2.2", descripcion: "Avanzado", nivelRaiz: "B2", modulos: window.Muller.Maestros.contenido.B2_2 || window.Muller.Maestros.B2_2 || [] },
    { id: "C1", nombre: "C1", descripcion: "Dominio profesional", nivelRaiz: "C1", modulos: window.Muller.Maestros.contenido.C1 || window.Muller.Maestros.C1 || [] }
  ];
  return niveles;
};

// Obtener todos los módulos de un nivel raíz (A1, A2, B1, B2, C1)
window.Muller.Maestros.getModulosPorNivelRaiz = function(nivelRaiz) {
  var niveles = window.Muller.Maestros.getAllLevels();
  var modulos = [];
  niveles.forEach(function(nivel) {
    if (nivel.nivelRaiz === nivelRaiz) {
      modulos = modulos.concat(nivel.modulos);
    }
  });
  return modulos;
};

// Helper: obtener nombre de nivel raíz desde un ID de nivel (ej: "A1_1" → "A1")
window.Muller.Maestros.getNivelRaizFromId = function(nivelId) {
  var map = {
    A1_1: "A1", A1_2: "A1",
    A2_1: "A2", A2_2: "A2",
    B1_1: "B1", B1_2: "B1",
    B2_1: "B2", B2_2: "B2",
    C1: "C1"
  };
  return map[nivelId] || "A1";
};


// getTodasLasLecciones: fusiona LECCIONES antiguas + módulos de contenido A1.1âC1
window.Muller.Maestros.getTodasLasLecciones = function() {
  var omitir = { artikel: true, verbos: true, pronombres: true };
  var lecciones = [];
  if (window.Muller.Maestros.LECCIONES) {
    window.Muller.Maestros.LECCIONES.forEach(function(mod) {
      if (!omitir[mod.id]) lecciones.push(mod);
    });
  }
  var niveles = window.Muller.Maestros.getAllLevels();
  niveles.forEach(function(nivel) {
    nivel.modulos.forEach(function(mod) {
      if (!lecciones.some(function(l) { return l.id === mod.id; })) {
        lecciones.push(mod);
      }
    });
  });
  return lecciones;
};// ─── PROGRESO CON TIMESTAMPS (FASE 3) ───

// getProgress: objeto con { [id]: { completado: true, timestamp: number } }
window.Muller.Maestros.getProgress = function() {
  try {
    return JSON.parse(localStorage.getItem('muller_maestros_progress') || '{}');
  } catch(e) { return {}; }
};

// toggleComplete: ahora guarda timestamp
window.Muller.Maestros.toggleComplete = function(id) {
  var progress = window.Muller.Maestros.getProgress();
  if (!progress[id]) {
    progress[id] = { completado: true, timestamp: Date.now() };
  } else if (typeof progress[id] === 'object' && progress[id].completado) {
    delete progress[id];
  } else {
    progress[id] = { completado: true, timestamp: Date.now() };
  }
  localStorage.setItem('muller_maestros_progress', JSON.stringify(progress));
  return progress;
};

// Compatibilidad con formato antiguo (boolean)
window.Muller.Maestros.isComplete = function(id) {
  var p = window.Muller.Maestros.getProgress()[id];
  if (typeof p === 'boolean') return p;
  if (typeof p === 'object' && p !== null) return !!p.completado;
  return false;
};

// ─── RACHAS (FASE 3) ───

// getUltimoEstudio: timestamp del último estudio
window.Muller.Maestros.getUltimoEstudio = function() {
  var progress = window.Muller.Maestros.getProgress();
  var timestamps = [];
  Object.keys(progress).forEach(function(key) {
    var val = progress[key];
    if (typeof val === 'object' && val.timestamp) {
      timestamps.push(val.timestamp);
    }
  });
  if (timestamps.length === 0) return null;
  return Math.max.apply(null, timestamps);
};

// getRacha: días consecutivos estudiando
window.Muller.Maestros.getRacha = function() {
  var progress = window.Muller.Maestros.getProgress();
  var fechas = {};
  Object.keys(progress).forEach(function(key) {
    var val = progress[key];
    if (typeof val === 'object' && val.timestamp) {
      var d = new Date(val.timestamp);
      var fechaStr = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      fechas[fechaStr] = true;
    }
  });
  var dias = Object.keys(fechas).sort().reverse();
  if (dias.length === 0) return 0;
  var racha = 1;
  var hoy = new Date();
  var hoyStr = hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate();
  var ayer = new Date(hoy);
  ayer.setDate(ayer.getDate() - 1);
  var ayerStr = ayer.getFullYear() + '-' + (ayer.getMonth()+1) + '-' + ayer.getDate();
  // Si no estudió hoy ni ayer, racha = 0
  if (dias[0] !== hoyStr && dias[0] !== ayerStr) return 0;
  for (var i = 1; i < dias.length; i++) {
    var diaActual = new Date(dias[i-1]);
    var diaAnterior = new Date(dias[i]);
    var diffMs = diaActual.getTime() - diaAnterior.getTime();
    var diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      racha++;
    } else {
      break;
    }
  }
  return racha;
};

// ─── PUNTOS (FASE 3) ───

// getPuntosNivel: puntos acumulados por nivel raíz
window.Muller.Maestros.getPuntosNivel = function(nivelRaiz) {
  var modulos = window.Muller.Maestros.getModulosPorNivelRaiz(nivelRaiz);
  var progress = window.Muller.Maestros.getProgress();
  var completados = 0;
  modulos.forEach(function(mod) {
    if (window.Muller.Maestros.isComplete(mod.id)) completados++;
  });
  return completados * 10;
};

// getTotalPuntos: suma de todos los puntos
window.Muller.Maestros.getTotalPuntos = function() {
  var niveles = ["A1", "A2", "B1", "B2", "C1"];
  var total = 0;
  niveles.forEach(function(nivel) {
    total += window.Muller.Maestros.getPuntosNivel(nivel);
  });
  return total;
};

// getNivelCompleto: boolean si todos los módulos de un nivel están completados
window.Muller.Maestros.getNivelCompleto = function(nivelRaiz) {
  var modulos = window.Muller.Maestros.getModulosPorNivelRaiz(nivelRaiz);
  if (modulos.length === 0) return false;
  return modulos.every(function(mod) {
    return window.Muller.Maestros.isComplete(mod.id);
  });
};

// getEstadisticas: objeto completo de estadísticas
window.Muller.Maestros.getEstadisticas = function() {
  var progress = window.Muller.Maestros.getProgress();
  var totalLecciones = 0;
  var completadas = 0;
  var niveles = window.Muller.Maestros.getAllLevels();
  niveles.forEach(function(nivel) {
    totalLecciones += nivel.modulos.length;
    nivel.modulos.forEach(function(mod) {
      if (window.Muller.Maestros.isComplete(mod.id)) completadas++;
    });
  });
  var porcentaje = totalLecciones > 0 ? Math.round((completadas / totalLecciones) * 100) : 0;
  return {
    totalLecciones: totalLecciones,
    completadas: completadas,
    porcentaje: porcentaje,
    racha: window.Muller.Maestros.getRacha(),
    puntos: window.Muller.Maestros.getTotalPuntos(),
    nivelActual: window.Muller.Maestros.getNivelActual()
  };
};

// getNivelActual: determina el nivel del usuario basado en su progreso
window.Muller.Maestros.getNivelActual = function() {
  var nivelesRaiz = ["A1", "A2", "B1", "B2", "C1"];
  for (var i = 0; i < nivelesRaiz.length; i++) {
    if (!window.Muller.Maestros.getNivelCompleto(nivelesRaiz[i])) {
      return nivelesRaiz[i];
    }
  }
  return "C1";
};

// ─── FASE 7: PROGRESIÓN AUTOMÁTICA ───

// getSiguienteModulo: primer módulo NO completado siguiendo orden lógico
window.Muller.Maestros.getSiguienteModulo = function() {
  var orden = ["A1_1","A1_2","A2_1","A2_2","B1_1","B1_2","B2_1","B2_2","C1"];
  var progress = window.Muller.Maestros.getProgress();
  var todos = window.Muller.Maestros.getAllLevels();
  for (var i = 0; i < orden.length; i++) {
    var nivel = orden[i];
    var modulosDeNivel = todos.filter(function(m) { return m.nivelId === nivel; });
    for (var j = 0; j < modulosDeNivel.length; j++) {
      if (!progress[modulosDeNivel[j].id] || !progress[modulosDeNivel[j].id].completado) {
        return modulosDeNivel[j];
      }
    }
  }
  return null;
};

// getModulosDebiles: módulos con más de 2 fallos, ordenados por más fallos primero
window.Muller.Maestros.getModulosDebiles = function() {
  var fallos = JSON.parse(localStorage.getItem("maestros_fallos") || "{}");
  var todos = window.Muller.Maestros.getAllLevels();
  var resultado = [];
  for (var id in fallos) {
    if (fallos[id] > 2) {
      var modulo = todos.filter(function(m) { return m.id === id; })[0];
      if (modulo) {
        modulo.fallos = fallos[id];
        resultado.push(modulo);
      }
    }
  }
  resultado.sort(function(a,b) { return b.fallos - a.fallos; });
  return resultado;
};

// getTiempoEstudioHoy: minutos estimados de estudio hoy
window.Muller.Maestros.getTiempoEstudioHoy = function() {
  var progress = window.Muller.Maestros.getProgress();
  var hoy = new Date();
  var hoyStr = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate();
  var minutos = 0;
  for (var id in progress) {
    if (progress[id].completado) {
      var d = new Date(progress[id].timestamp);
      var dStr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      if (dStr === hoyStr) {
        minutos += 5;
      }
    }
  }
  return minutos;
};

// getMetaDiaria: true si al menos 1 módulo completado hoy
window.Muller.Maestros.getMetaDiaria = function() {
  return window.Muller.Maestros.getTiempoEstudioHoy() >= 5;
};
