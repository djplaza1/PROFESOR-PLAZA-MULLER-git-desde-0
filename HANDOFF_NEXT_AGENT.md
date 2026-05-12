# 🚀 SUPER PROMPT — IMPLEMENTAR FASES 6, 7, 8 EN PESTAÑA MAESTROS

Copia TODO esto y pégalo en un NUEVO CHAT como prompt único. No necesita contexto adicional.

═════════════════════════════════════════════════════════════════════

## 🎭 ROL

Eres un **ingeniero senior experto en React 18 vanilla + Babel standalone + Tailwind CSS**. Trabajas en la SPA "PROFESOR PLAZA MÜLLER" para aprender alemán.

### REGLAS ESTRICTAS (VIOLARLAS = ERROR GRAVE):

1. **NUNCA uses `import`/`export`** → todo va en `window.Muller.*`
2. **NUNCA uses CDN de Lucide ni `lucide.createIcons()`** → SVG inline con `dangerouslySetInnerHTML`
3. **NUNCA definas componentes dentro de otros componentes** → cada archivo = 1 componente función
4. **NUNCA uses bundlers, npm, package.json** → la app es HTML + CDNs (React 18, Babel standalone, Tailwind)
5. **Siempre verifica balance `{}()` `[]` tras CADA cambio** antes de commit
6. **Commit + push tras CADA funcionalidad completada**, no acumules
7. **Usa `Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"`** al inicio de cada comando PowerShell
8. **NUNCA uses `exit`** en scripts PowerShell
9. **Archivos < 300 líneas máximo.** Si un archivo crece, divídelo
10. **1 cambio → verificar balance → commit → siguiente**
11. **Si ves DESBALANCE de llaves/parentesis/corchetes, PARA INMEDIATAMENTE**

═════════════════════════════════════════════════════════════════════

## ✅ ESTADO ACTUAL DEL PROYECTO (FASES 0→5 COMPLETADAS)

### Archivos de Maestros que YA EXISTEN (no crearlos de nuevo):

| Archivo | Ruta | Líneas |
|---------|------|--------|
| Helpers | `src/features/maestros/maestrosHelpers.jsx` | 324 |
| Panel | `src/features/maestros/MaestrosPanel.jsx` | 321 |
| Profesor IA | `src/features/maestros/MaestroIA.jsx` | 221 |
| Práctica | `src/features/maestros/EjerciciosMaestros.jsx` | 262 |
| Contenido A1.1-2 | `src/features/maestros/contenido/contenidoA1_1.jsx` (y A1_2) | ~90 c/u |
| Contenido A2.1-2 | `src/features/maestros/contenido/contenidoA2_1.jsx` (y A2_2) | ~90 c/u |
| Contenido B1.1-2 | `src/features/maestros/contenido/contenidoB1_1.jsx` (y B1_2) | ~90 c/u |
| Contenido B2.1-2 | `src/features/maestros/contenido/contenidoB2_1.jsx` (y B2_2) | ~90 c/u |
| Contenido C1 | `src/features/maestros/contenido/contenidoC1.jsx` | ~90 |

═════════════════════════════════════════════════════════════════════

## 📡 APIs GLOBALES DISPONIBLES (úsalas SIN import)

### window.Muller.Maestros (helpers):
```
LECCIONES                    → array de 6 objetos (id, titulo, descripcion, nivel)
contenido.A1_1, A1_2, A2_1, A2_2, B1_1, B1_2, B2_1, B2_2, C1  → arrays de módulos

getAllLevels()               → UN SOLO array con todos los módulos de todos los niveles fusionados, cada uno con nivelId
getProgress()                → objeto { id_modulo: { completado: bool, timestamp: ms } }
toggleComplete(id)           → marca/desmarca módulo como completado (guarda en localStorage "maestros_progress")
isComplete(id)               → true/false
getRacha()                   → número: días consecutivos estudiando
getUltimoEstudio()           → timestamp del último estudio
getPuntosNivel(nivelId)      → suma de puntos de un nivel
getTotalPuntos()             → suma total de todos los niveles
getNivelCompleto(nivelId)    → true si todos los módulos de ese nivel están completos
getEstadisticas()            → { completados, total, porcentaje, racha, ultimoEstudio, puntosTotal }
```

### window.Muller.DeepSeek (IA):
```
preguntar(prompt)            → envía prompt a DeepSeek y devuelve respuesta
hasApiKey()                  → true/false
```

### Otras:
```
window.Muller.Toast.mostrar(texto)    → notificación toast
window.Muller.Achievements            → logros (window.Muller.Achievements)
window.Muller.Progreso.getNivel()     → nivel del usuario (A1, A2, B1, etc.)
```

═════════════════════════════════════════════════════════════════════

## 📋 ORDEN EXACTO de scripts en index.html (líneas 969-981):
```
969  maestrosHelpers.jsx
970  contenidoA1_1.jsx
971  contenidoA1_2.jsx
972  contenidoA2_1.jsx
973  contenidoA2_2.jsx
974  contenidoB1_1.jsx
975  contenidoB1_2.jsx
976  contenidoB2_1.jsx
977  contenidoB2_2.jsx
978  contenidoC1.jsx
979  MaestroIA.jsx
980  EjerciciosMaestros.jsx
981  MaestrosPanel.jsx
```

**REGLAS para añadir scripts nuevos:**
- Los scripts de maestros deben ir **entre la línea 980 y 981** (ANTES de MaestrosPanel.jsx, DESPUÉS de EjerciciosMaestros.jsx)
- Usar formato: `<script type="text/babel" src="src/features/maestros/NUEVO_ARCHIVO.jsx"></script>`

═════════════════════════════════════════════════════════════════════

## 🎯 IMPLEMENTAR FASES 6 → 7 → 8 (EN ORDEN)

═════════════════════════════════════════════════════════════════════

### 🔷 FASE 6: MODO HISTORIA INTERACTIVO DENTRO DE MAESTROS

#### Archivos a crear y modificar
- **CREAR:** `src/features/maestros/HistoriaMaestros.jsx` ← COMPONENTE historias dentro de Maestros
- **MODIFICAR:** `src/features/maestros/MaestrosPanel.jsx` ← añadir pestaña "Historia"

#### Pasos exactos:

**PASO 6.1:** Crear `src/features/maestros/HistoriaMaestros.jsx`

Este componente debe:
1. Recibir `props.nivel` (string: "A1", "A2", "B1", "B2", "C1")
2. Usar `window.Muller.Maestros.contenido[nivel.replace('.','_')]` para obtener módulos de ese nivel
3. Por ahora, mostrar una UI placeholder simple:
   - Título: "📖 Historias para {nivel}"
   - Lista de módulos con botón "🎭 Practicar con Historia"
   - Al hacer clic en "Practicar", mostrar modo Huecos (rellenar palabra correcta)
   - Generar huecos: tomar el `titulo` del módulo y ocultar palabras aleatorias
4. El modo práctica debe ser inline (dentro del mismo componente), no redirigir a otro panel
5. Estilo Tailwind: `bg-gray-800/90`, texto blanco, inputs `bg-gray-700 border-gray-600`

**PASO 6.2:** Modificar `MaestrosPanel.jsx`:
1. Añadir una pestaña "📖 Historia" en el array de pestañas (después de "📝 Práctica")
2. Cuando se selecciona "📖 Historia", renderizar `<HistoriaMaestros nivel={nivelActual} />` en lugar del grid de tarjetas
3. Importante: el componente HistoriaMaestros se renderiza en lugar del contenido normal, no como overlay

**PASO 6.3:** Añadir script a index.html:
- Insertar `<script type="text/babel" src="src/features/maestros/HistoriaMaestros.jsx"></script>` entre línea 980 y 981

**PASO 6.4:** Verificar balance y commit:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $archivos = @("src/features/maestros/HistoriaMaestros.jsx","src/features/maestros/MaestrosPanel.jsx","index.html"); foreach($f in $archivos) { $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; Write-Host "$f : {}=$ob/$cb ()=$op/$cp []=$obr/$cbr"; if($ob -ne $cb -or $op -ne $cp -or $obr -ne $cbr){Write-Host "DESBALANCE!"} }
```
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 6: modo Historia interactivo integrado en Maestros" && git push origin main
```

═════════════════════════════════════════════════════════════════════

### 🔷 FASE 7: PROGRESIÓN AUTOMÁTICA Y RECOMENDACIONES

#### Archivos a modificar y crear
- **MODIFICAR:** `src/features/maestros/maestrosHelpers.jsx` ← añadir funciones
- **CREAR:** `src/features/maestros/ProgresionMaestros.jsx` ← componente UI
- **MODIFICAR:** `src/features/maestros/MaestrosPanel.jsx` ← integrar componente
- **MODIFICAR:** `index.html` ← añadir script

#### Pasos exactos:

**PASO 7.1:** Modificar `maestrosHelpers.jsx` - Añadir al objeto window.Muller.Maestros:

```javascript
// Dentro de window.Muller.Maestros, añadir:

getSiguienteModulo: function() {
  // Orden lógico de niveles: A1_1, A1_2, A2_1, A2_2, B1_1, B1_2, B2_1, B2_2, C1
  var orden = ["A1_1","A1_2","A2_1","A2_2","B1_1","B1_2","B2_1","B2_2","C1"];
  var progress = window.Muller.Maestros.getProgress();
  var todos = window.Muller.Maestros.getAllLevels();
  // Encontrar el primer módulo NO completado siguiendo el orden lógico
  for (var i = 0; i < orden.length; i++) {
    var nivel = orden[i];
    var modulosDeNivel = todos.filter(function(m) { return m.nivelId === nivel; });
    for (var j = 0; j < modulosDeNivel.length; j++) {
      if (!progress[modulosDeNivel[j].id] || !progress[modulosDeNivel[j].id].completado) {
        return modulosDeNivel[j];
      }
    }
  }
  return null; // todo completado
},

getModulosDebiles: function() {
  // Leer localStorage "maestros_fallos" -> {"id_modulo": numero_fallos}
  // Devolver array de módulos con más de 2 fallos, ordenados por más fallos primero
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
},

getTiempoEstudioHoy: function() {
  // De localStorage "maestros_progress", sumar timestamps de HOY
  // Un timestamp = 5 minutos de estudio (aproximación)
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
},

getMetaDiaria: function() {
  // true si al menos 1 módulo completado hoy
  return window.Muller.Maestros.getTiempoEstudioHoy() >= 5;
}
```

**PASO 7.2:** Crear `src/features/maestros/ProgresionMaestros.jsx`

Componente función `ProgresionMaestros` que recibe `props.onCerrar` (opcional).

Debe mostrar:
1. **Tarjeta "Siguiente lección recomendada"** - usar `getSiguienteModulo()`, mostrar título del módulo y nivel, botón "Ir a la lección"
2. **Tarjetas de módulos débiles** - usar `getModulosDebiles()`, mostrar hasta 3 con botón "Repasar"
3. **Estadísticas de hoy** - tiempo de estudio (getTiempoEstudioHoy), módulos completados hoy, racha actual (getRacha)
4. **Barra de progreso** - porcentaje meta diaria (getMetaDiaria → 100% si true)

Estilo: cards con `bg-gray-800`, bordes redondeados, texto blanco.
Usar `window.Muller.Maestros.getEstadisticas()` para datos generales.

**PASO 7.3:** Modificar `MaestrosPanel.jsx` - Añadir sección de progresión:
1. Debajo del header (título + búsqueda), añadir un botón "📊 Recomendaciones"
2. Al hacer clic, mostrar componente `<ProgresionMaestros>` en un modal overlay o expandible
3. Alternativa: mostrar siempre la progresión como una barra compacta arriba

**PASO 7.4:** Añadir script a index.html entre línea 980 y 981:
```html
<script type="text/babel" src="src/features/maestros/ProgresionMaestros.jsx"></script>
```

**PASO 7.5:** Verificar balance y commit:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $archivos = @("src/features/maestros/maestrosHelpers.jsx","src/features/maestros/ProgresionMaestros.jsx","src/features/maestros/MaestrosPanel.jsx","index.html"); foreach($f in $archivos) { $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; Write-Host "$f : {}=$ob/$cb ()=$op/$cp []=$obr/$cbr"; if($ob -ne $cb -or $op -ne $cp -or $obr -ne $cbr){Write-Host "DESBALANCE!"} }
```
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 7: progresión automática y recomendaciones de estudio" && git push origin main
```

═════════════════════════════════════════════════════════════════════

### 🔷 FASE 8: MODO COMPETICIÓN (OPCIONAL — solo si sobra tiempo)

#### Archivos a crear y modificar
- **CREAR:** `src/features/maestros/CompetenciaMaestros.jsx` ← componente
- **MODIFICAR:** `src/features/maestros/MaestrosPanel.jsx` ← añadir botón
- **MODIFICAR:** `index.html` ← añadir script

#### Pasos exactos:

**PASO 8.1:** Crear `src/features/maestros/CompetenciaMaestros.jsx`

Componente función `CompetenciaMaestros` que recibe `props.onCerrar`.

Debe implementar:
1. **Estado del juego:**
   - `pregunta` actual (objeto con `pregunta`, `respuesta`, `opciones[]`)
   - `puntaje` (número)
   - `racha` (aciertos consecutivos)
   - `tiempoRestante` (60 segundos)
   - `preguntasRespondidas` (número)
   - `juegoActivo` (true/false)
   - `ranking` (array del localStorage "maestros_ranking")

2. **Generar preguntas:**
   - Usar `window.Muller.Maestros.getAllLevels()` para obtener todos los módulos
   - De cada módulo usar `titulo` como pregunta: "¿Qué significa '{titulo}'?"
   - La respuesta correcta es la `descripcion` del módulo
   - Generar 3 opciones falsas mezclando descripciones de otros módulos
   - Usar `opciones.sort(() => Math.random() - 0.5)` para mezclar

3. **Lógica del juego:**
   - Al empezar: `juegoActivo = true`, `tiempoRestante = 60`, `puntaje = 0`
   - Usar `setInterval` para decrementar tiempo cada segundo
   - Al responder: si correcta, sumar `10 * (1 + racha * 0.5)` puntos, incrementar racha
   - Si incorrecta: racha vuelve a 0, mostrar feedback rojo
   - Al acabar tiempo: guardar puntuación en ranking si es top 10

4. **Ranking local:**
   - Guardar en localStorage "maestros_ranking" como array de `{ nombre, puntaje, fecha }`
   - Mostrar top 10 ordenado por puntaje descendente
   - Preguntar nombre al usuario la primera vez, guardar en localStorage "maestros_nombre"

5. **UI:**
   - Pantalla grande con overlay oscuro (`fixed inset-0 bg-black/80 flex items-center justify-center z-50`)
   - Tarjeta blanca/oscura con la pregunta y 4 opciones (botones)
   - Timer grande arriba, puntaje y racha visibles
   - Animación de acierto (verde) / fallo (rojo) en los botones
   - Al final: mostrar puntuación y ranking
   - Botón "Volver" llama a `props.onCerrar()`

**PASO 8.2:** Modificar `MaestrosPanel.jsx`:
1. Añadir botón "🏆 Competencia" en el header (junto al botón IA)
2. Al hacer clic, renderizar `<CompetenciaMaestros onCerrar={function(){ setMostrarCompetencia(false); }} />`
3. Controlar visibilidad con estado `mostrarCompetencia`

**PASO 8.3:** Añadir script a index.html entre línea 980 y 981:
```html
<script type="text/babel" src="src/features/maestros/CompetenciaMaestros.jsx"></script>
```

**PASO 8.4:** Verificar balance y commit:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $archivos = @("src/features/maestros/CompetenciaMaestros.jsx","src/features/maestros/MaestrosPanel.jsx","index.html"); foreach($f in $archivos) { $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; Write-Host "$f : {}=$ob/$cb ()=$op/$cp []=$obr/$cbr"; if($ob -ne $cb -or $op -ne $cp -or $obr -ne $cbr){Write-Host "DESBALANCE!"} }
```
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 8: modo competencia con temporizador y ranking local" && git push origin main
```

═════════════════════════════════════════════════════════════════════

## ⛔ ¡DETENTE AQUÍ!

**CUANDO TERMINES FASE 8 (o la última fase que implementes), DILE AL USUARIO EXACTAMENTE ESTO:**

"Panel Maestros completado al 100%. Fases 0-8 implementadas. La aplicación sigue funcionando con React 18 CDN + Babel standalone, sin bundlers. Todos los cambios están commiteados y pusheados a GitHub."

**NO SIGAS TRABAJANDO. NO EMPIECES NUEVAS FASES. NO HAGAS MEJORAS ADICIONALES.**

═════════════════════════════════════════════════════════════════════

## ⚠️ ATAJOS RÁPIDOS

### Ver archivo completo (sin paginación):
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; Get-Content "src/features/maestros/ARCHIVO.jsx" -Raw
```

### Ver SOLO final de un archivo (últimas 50 líneas):
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; (Get-Content "src/features/maestros/ARCHIVO.jsx")[-50..-1]
```

### Buscar texto en archivos de maestros:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; Select-String -Path "src\features\maestros\*.jsx" -Pattern "LO QUE BUSCAS"
```

### Ver balance de TODOS los archivos de maestros de una sola vez:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $archivos = Get-ChildItem "src\features\maestros\*.jsx" -Name; foreach($f in $archivos) { $ruta = "src\features\maestros\$f"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $ruta), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; if($ob -eq $cb -and $op -eq $cp -and $obr -eq $cbr){$ok="OK"}else{$ok="❌"}; Write-Host "$ok $f : {$ob/$cb} ($op/$cp) [$obr/$cbr]" }
```

### Commit y push rápido:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "MENSAJE" && git push origin main
```

═════════════════════════════════════════════════════════════════════
FIN DEL PROMPT — CÓPIALO Y PÉGALO EN UN NUEVO CHAT
═════════════════════════════════════════════════════════════════════