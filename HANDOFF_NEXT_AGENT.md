# 🚀 HANDOFF: FASES 2, 3, 4 y 5 — MAESTROS (completar hasta Fase 5 y DETENERSE)

## ════════════════════════════════
## 🎭 TU ROL (ASUME ESTO AHORA)
## ════════════════════════════════

Eres un **ingeniero senior experto en React 18 vanilla, Tailwind CSS y diseño modular SIN bundlers**. Trabajas en la SPA "PROFESOR PLAZA MÜLLER" para aprender alemán.

### REGLAS ESTRICTAS (NUNCA LAS ROMPAS):
1. **NUNCA uses imports/exports.** Todo va en `window.Muller.*`
2. **NUNCA uses CDN de Lucide ni `lucide.createIcons()`.** Los iconos son SVG inline con `dangerouslySetInnerHTML`
3. **NUNCA definas componentes dentro de otros componentes.** Cada archivo define su propio componente función.
4. **NUNCA uses bundlers.** Es HTML vanilla + React 18 CDN + Babel standalone + Tailwind CDN.
5. **Verifica balance {} () [] tras CADA cambio** antes de hacer commit.
6. **Commit y push tras cada funcionalidad completada** (por paso, no acumules).
7. **Usa siempre `Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"`** al inicio de cada comando PowerShell.
8. **NUNCA uses `exit`** en scripts PowerShell.
9. **Archivos < 300 líneas.** Divide si es necesario.
10. **Un cambio → verificar → commit → siguiente.**
11. **Si ves DESBALANCE, PARA. NO AVANCES.**

---

## ════════════════════════════════
## ✅ ESTADO ACTUAL DEL PROYECTO
## ════════════════════════════════

### ✅ COMPLETADO (NO TOCAR):
- **FASE 0:** Diagnóstico y preparación
- **FASE 1 COMPLETA (Pasos 1.1 → 1.10):** Todo el contenido gramatical de A1.1 a C1 creado y funcionando
- **Comunidad:** Panel de comunidad completo con guiones, mentor, historias, feed, arena, clubs, tienda, bloqueos

### 📋 ARCHIVOS EXISTENTES DE MAESTROS (NO MODIFICAR ESTRUCTURA):

| Archivo | Ruta | Estado |
|---------|------|--------|
| ✅ Helpers | `src/features/maestros/maestrosHelpers.jsx` | 163 líneas. Tiene `LECCIONES` (6 originales), `getAllLevels()`, `getProgress()`, `toggleComplete()`, `isComplete()` |
| ✅ Panel | `src/features/maestros/MaestrosPanel.jsx` | 159 líneas. Renderiza lecciones con expandible, progreso, búsqueda |
| ✅ A1.1 | `src/features/maestros/contenido/contenidoA1_1.jsx` | 6 módulos |
| ✅ A1.2 | `src/features/maestros/contenido/contenidoA1_2.jsx` | 6 módulos |
| ✅ A2.1 | `src/features/maestros/contenido/contenidoA2_1.jsx` | 6 módulos |
| ✅ A2.2 | `src/features/maestros/contenido/contenidoA2_2.jsx` | 6 módulos |
| ✅ B1.1 | `src/features/maestros/contenido/contenidoB1_1.jsx` | 6 módulos |
| ✅ B1.2 | `src/features/maestros/contenido/contenidoB1_2.jsx` | 6 módulos |
| ✅ B2.1 | `src/features/maestros/contenido/contenidoB2_1.jsx` | 6 módulos (lime) |
| ✅ B2.2 | `src/features/maestros/contenido/contenidoB2_2.jsx` | 6 módulos (lime) |
| ✅ C1 | `src/features/maestros/contenido/contenidoC1.jsx` | 6 módulos (violet) |

### 📋 APIs GLOBALES DISPONIBLES:
- `window.Muller.Maestros.LECCIONES` → array de 6 lecciones originales
- `window.Muller.Maestros.contenido.A1_1` → array de módulos
- `window.Muller.Maestros.contenido.A1_2` → etc.
- `window.Muller.Maestros.getAllLevels()` → fusiona todos los niveles
- `window.Muller.Maestros.getProgress() / toggleComplete() / isComplete()`
- `window.Muller.DeepSeek` → IA (existe en src/features/entrenamiento/deepSeekAi.jsx)
- `window.Muller.Toast` → notificaciones (src/core/toast.jsx)
- `window.Muller.Achievements` → logros (src/core/achievements.jsx)
- `window.Muller.Progreso?.getNivel?.()` → nivel del usuario
- `window.Muller.Comunidad.*` → puntos, logros, ranking, guiones, mentor, historias

### 📋 ORDEN EN INDEX.HTML (líneas 968-979):
```
969: maestrosHelpers.jsx
970: contenidoA1_1.jsx
971: contenidoA1_2.jsx
972: contenidoA2_1.jsx
973: contenidoA2_2.jsx
974: contenidoB1_1.jsx
975: contenidoB1_2.jsx
976: contenidoB2_1.jsx
977: contenidoB2_2.jsx
978: contenidoC1.jsx
979: MaestrosPanel.jsx
```

### 🗺️ MAPA DEL PROYECTO (estructura de carpetas):
```
c:\PROFESOR-PLAZA-MULLER-git-desde-0\
├── index.html                          ← Archivo principal. CDNs + todos los scripts
├── src/
│   ├── app.jsx                         ← Router principal (window.Muller.Panels)
│   ├── core/
│   │   ├── toast.jsx                   ← window.Muller.Toast
│   │   └── achievements.jsx            ← window.Muller.Achievements
│   ├── features/
│   │   ├── maestros/                   ← ← ← TU TRABAJO ESTÁ AQUÍ
│   │   │   ├── maestrosHelpers.jsx     ← Helpers + LECCIONES + getAllLevels()
│   │   │   ├── MaestrosPanel.jsx       ← Componente principal
│   │   │   └── contenido/             ← Módulos de contenido gramatical
│   │   ├── entrenamiento/             ← DeepSeek AI, helpers de entrenamiento
│   │   ├── comunidad/                 ← Panel de comunidad completo
│   │   ├── ia/                        ← Floating chat + IAPanel
│   │   ├── biblioteca/               ← BibliotecaPanel
│   │   ├── telc/                      ← TelcPanel
│   │   ├── navegacion/               ← TopBar + BottomBar
│   │   ├── splash/                    ← Splash screen
│   │   └── ...otros paneles
│   ├── data/
│   │   └── diccionario/              ← Diccionario de datos
│   └── hooks/                         ← Custom hooks
├── assets/
│   └── icons/                        ← Iconos SVG
├── audio/                            ← Archivos de audio
├── verify_balance.ps1               ← Script de verificación de balance
├── fix_index.ps1 / fix_index_end.ps1 ← Scripts auxiliares
└── SUPER_RESUMEN_CHAT.md            ← Resumen extenso del proyecto
```

---

## ════════════════════════════════════════
## 🎯 TU MISIÓN: Implementar FASES 2, 3, 4 y 5
## ════════════════════════════════════════

## ⛔ CUANDO TERMINES FASE 5, DETENTE. NO HAGAS FASES 6, 7 NI 8.

---

### 🔵 FASE 2: REDISEÑO DE LA UI DE MAESTROS

**Archivo a modificar:** `src/features/maestros/MaestrosPanel.jsx` (solo 159 líneas actualmente)

Lee el archivo con PowerShell para ver SOLO las últimas 4000 caracteres:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/maestros/MaestrosPanel.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring([Math]::Max(0, $txt.Length - 4000))
```

**NO leas el archivo completo.** Solo lo último para ver el return.

**Qué hacer:**
1. Añadir **pestañas de nivel** (A1, A2, B1, B2, C1) que filtren los módulos por nivel usando `getAllLevels()`
2. Añadir un **selector visual de nivel** con colores: A1=blue, A2=green, B1=yellow, B2=lime, C1=violet
3. Mostrar el **progreso por nivel** (ej: "A1: 3/12 módulos completados")
4. Añadir **tarjetas de nivel con diseño tipo grid** (no solo lista lineal)
5. Mantener la funcionalidad actual (búsqueda, expandible, marcar completado, barra de progreso general)

**Estados a añadir:**
```jsx
const [nivelActivo, setNivelActivo] = React.useState(null); // null = todos
```

**Commit:**
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 2: UI rediseñada con tabs de nivel A1-C1 y grid" && git push origin main
```

---

### 🔵 FASE 3: MEJORAR SISTEMA DE PROGRESO Y RACHAS

**Archivo a modificar:** `src/features/maestros/maestrosHelpers.jsx`

**Qué añadir a `window.Muller.Maestros`:**
1. **getRacha()** → días consecutivos estudiando (basado en timestamps de cuando se marca una lección como completada)
2. **getUltimoEstudio()** → timestamp del último estudio
3. **getPuntosNivel(nivelId)** → puntos acumulados (cada módulo completado = 10 pts)
4. **getTotalPuntos()** → suma de todos los puntos
5. **getNivelCompleto(nivelId)** → boolean si todos los módulos de un nivel están completados
6. **getEstadisticas()** → objeto con: totalLecciones, completadas, porcentaje, racha, puntos, nivelActual

**Cambiar `toggleComplete`** para que también guarde el timestamp:
```js
window.Muller.Maestros.toggleComplete = (id) => {
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
```

**Adaptar MaestrosPanel.jsx** para que use la nueva estructura de progreso (objeto en lugar de boolean).

**Commit:**
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 3: sistema de progreso con rachas, puntos y estadísticas" && git push origin main
```

---

### 🔵 FASE 4: INTEGRACIÓN DE DEEPSEEK EN MAESTROS

La API de DeepSeek ya existe en `window.Muller.DeepSeek`. Revisa cómo funciona:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/entrenamiento/deepSeekAi.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring(0, [Math]::Min(500, $txt.Length))
```

**Qué hacer:**
1. Crear `src/features/maestros/MaestroIA.jsx` con un **chat flotante dentro del panel Maestros**
2. El profesor IA debe:
   - Saber qué nivel está viendo el usuario
   - Responder preguntas de gramática alemana en alemán simplificado
   - Dar ejemplos personalizados según el módulo activo
   - Usar `window.Muller.DeepSeek.preguntar(prompt)` para las respuestas
3. Añadir **botón flotante** en MaestrosPanel.jsx que abre/cierra el chat
4. El chat debe tener: input de texto, historial, botón de cerrar

**No toques deepSeekAi.jsx.** Úsalo como API.

**Añadir a index.html** ANTES de MaestrosPanel.jsx:
```html
    <script type="text/babel" src="src/features/maestros/MaestroIA.jsx"></script>
```

**Commit:**
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 4: profesor IA integrado con DeepSeek en Maestros" && git push origin main
```

---

### 🔵 FASE 5: PRÁCTICA INTERACTIVA (ejercicios gamificados sin IA)

**Crear** `src/features/maestros/EjerciciosMaestros.jsx`

**Qué debe tener:**
1. **Flip cards** (tarjetas que giran al hacer clic): muestra una palabra alemana atrás, el usuario intenta recordar la traducción
2. **Tipo test**: pregunta con 4 opciones, feedback inmediato (verde/rojo)
3. **Ordenar palabras**: arrastrar o hacer clic en orden correcto para formar oración (sin drag, usar clics)
4. **Contador de aciertos/fallos** con racha actual
5. **Niveles de dificultad** según el nivel del usuario (A1=vocabulario simple, C1=oraciones complejas)

**Cómo obtener datos:**
- Usar `getAllLevels()` para tener acceso a todos los módulos
- Cada módulo tiene `ejemplos` y `ejercicioBase` con frases
- Aleatorizar las preguntas de los ejercicios disponibles

**Añadir botón "Practicar"** en MaestrosPanel.jsx (en la cabecera o en el progreso) que abre el panel de ejercicios.

**Añadir a index.html** ANTES de MaestrosPanel.jsx:
```html
    <script type="text/babel" src="src/features/maestros/EjerciciosMaestros.jsx"></script>
```

**Commit:**
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 5: práctica interactiva con flip cards, test y ordenar palabras" && git push origin main
```

---

## ⛔ ¡DETENTE AQUÍ!

**CUANDO TERMINES FASE 5, DILE AL USUARIO EXACTAMENTE ESTO:**

"He completado las FASES 2, 3, 4 y 5 del panel Maestros. El rediseño UI con pestañas de nivel, el sistema de progreso con rachas y puntos, el profesor IA integrado con DeepSeek, y la práctica interactiva con flip cards/test/ordenar palabras están listos y commiteados. Fases 6, 7 y 8 quedan pendientes para el próximo agente."

**NO SIGAS TRABAJANDO. NO EMPIECES FASES 6, 7 NI 8.**

---

## ⚠️ ATAJOS DE VERIFICACIÓN RÁPIDA

### Verificar balance de archivo:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "RUTA/DEL/ARCHIVO"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; if ($ob -eq $cb) { Write-Host "Llaves: OK ($ob)" } else { Write-Host "Llaves: DESBALANCE ({ = $ob, } = $cb)" }; if ($op -eq $cp) { Write-Host "Parentesis: OK ($op)" } else { Write-Host "Parentesis: DESBALANCE (( = $op, ) = $cp)" }; if ($obr -eq $cbr) { Write-Host "Corchetes: OK ($obr)" } else { Write-Host "Corchetes: DESBALANCE ([ = $obr, ] = $cbr)" }
```

### Para ver final de un archivo (sin leerlo entero):
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/maestros/ARCHIVO.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring([Math]::Max(0, $txt.Length - 4000))
```

### Para buscar algo en el proyecto:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; Select-String -Path "src\features\maestros\*.jsx" -Pattern "TEXTO_A_BUSCAR"
```

### Commit y push:
```powershell
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "MENSAJE" && git push origin main