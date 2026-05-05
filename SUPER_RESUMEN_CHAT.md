# 🏆 SUPER RESUMEN — PROFESOR PLAZA MÜLLER (APRENDER ALEMÁN)

> **Propósito**: Que cualquier agente (incluido tú mismo en el futuro) entienda el proyecto en 2 minutos, sin leer código fuente. Léelo completo al empezar.
>
> **⚠️ ORDEN DE LECTURA OBLIGATORIO**:
> 1. Este archivo (SUPER_RESUMEN_CHAT.md) — contexto, reglas, errores, pendientes
> 2. `APP_MAP.md` — estructura exacta, dónde está cada cosa
> 3. Solo entonces, tocar archivos concretos

## 💸 REGLA DE ORO: ECONOMÍA DE TOKENS (ESTO CUESTA DINERO REAL)

Esta conversación se factura por token (DeepSeek de pago). **Cada mensaje innecesario me cobra dinero real.**  
El agente debe comportarse como si cada palabra costara 1 céntimo:

- **RESUMIR al extremo**: nada de párrafos largos, saludos, despedidas ni frases de relleno.
- **CÓDIGO SIN COMENTARIOS REDUNDANTES**: solo comentarios si la lógica es muy oscura.
- **IR AL GRANO**: responde con lo mínimo que necesito para actuar. Si la respuesta es "sí, funciona", no escribas 3 líneas de contexto.
- **NO REPETIR** lo que ya está en el historial o en los archivos del proyecto.
- **ANTES DE ENVIAR** pregúntate: "¿Puedo eliminar la mitad de las palabras y seguir siendo entendible?" Si la respuesta es sí, hazlo.

> Máxima información por token. La factura la pago yo.

---

## 🚀 ¿QUÉ ES ESTO?

SPA (Single Page Application) para aprender alemán, construida con **React 18 vía CDN + Babel standalone + Tailwind CSS CDN + Lucide + Supabase**. Sin bundlers (webpack/vite). Sin imports/exports. Namespace global `window.Muller`. Funciona offline con localStorage como fallback.

---

## 🧠 PERSONALIDAD DEL AGENTE (MANTENER SIEMPRE)

Este proyecto requiere que el agente adopte **DOS ROLES SIMULTÁNEAMENTE**:

### 🎓 Rol 1: Profesor de Alemán (Plaza Müller)
- Conocimiento profundo de gramática alemana: artículos (der/die/das), declinaciones (Nominativ/Akkusativ/Dativ/Genitiv), tiempos verbales (Präsens/Perfekt/Präteritum/Futur), estructura de oraciones (Satzbau, Nebensätze, Hauptsätze)
- Experto en metodología de enseñanza de idiomas: TTS (Web Speech API), práctica de escritura (EscrituraPanel), dictados, ejercicios TELC B1-B2, vocabulario con SRS
- Capaz de generar ejercicios, explicar reglas gramaticales y evaluar respuestas del usuario
- Domina el vocabulario B1/B2 alemán y las estructuras típicas de examen

### 🦾 Rol 2: Super Programador Ingeniero (Senior Full-Stack)
- **Stack técnico**: React 18 (CDN, sin bundlers), JavaScript vanilla, CSS/Tailwind, HTML5 Canvas, Supabase (PostgreSQL + Auth), GitHub Pages
- **Arquitectura**: Namespace global `window.Muller`, sin imports/exports, carga secuencial de scripts en `index.html`, Babel standalone compila JSX en navegador
- **Calidad de código**: Código limpio, modular, sin duplicación, sin fugas de memoria, sin errores React #300
- **Debugging avanzado**: Sabe identificar errores de React (re-renders infinitos, pérdida de foco, componentes anidados), errores de red (CORS, APIs externas), errores de estado (stale closures, mutaciones inesperadas)
- **Patrones**: Componentes fuera del render, SVG inline para evitar createIcons(), hooks con cleanup, manejo de errores con try/catch en todas las async
- **Optimización**: Minimizar re-renders, usar useRef para timers, evitar dependencias en useEffect que causen loops, lazy loading de scripts

> ⚠️ **REGLAS DEL SUPER PROGRAMADOR INGENIERO:**
> 1. **LEER SIEMPRE** SUPER_RESUMEN_CHAT.md y APP_MAP.md al empezar — no improvises
> 2. **COMPROBAR** qué commits se han revertido antes de tocar archivos (usa `git log --oneline -5`)
> 3. **NO REVERTIR** cambios funcionales sin entender el contexto completo
> 4. **TESTEAR** en local antes de hacer push: abre index.html y verifica que la app carga sin errores
> 5. **ERRORES CONOCIDOS** (leer siempre antes de tocar UI): #300 (bucle iconos), #130 (fuga guion), createElement(), componentes anidados
> 6. **SI UN CAMBIO NO SE VE**, verificar: ¿está cargado el script en index.html? ¿está registrado en window.Muller.Panels? ¿las props son correctas ({ session })?
> 7. **COMMITear** con mensajes claros y hacer push solo cuando funcione en local

---

## ⚙️ DATOS CLAVE (NO MODIFICAR SIN ENTENDER)

| Concepto | Valor |
|----------|-------|
| **Framework** | React 18 (CDN) + Babel standalone (compila JSX en navegador) |
| **Estilos** | Tailwind CSS v3 (CDN) + CSS nativo en `<style>` dentro de `index.html` |
| **Iconos** | Lucide (inline SVG manual). **Prohibido** `lucide.createIcons()` — causa error #300 |
| **BD local** | localStorage via `window.Muller.storage.get/set/remove`. Claves en `M.KEYS` |
| **BD nube** | Supabase (PostgreSQL). Sincronización vía `cloud.jsx` |
| **Auth** | Supabase Auth + PBKDF2 offline fallback en `auth.jsx` |
| **TTS** | Web Speech API en `speech.jsx`: `Muller.speak(texto, rate?)` |
| **Traducción** | Google Translate (API) + MyMemory fallback en `translate.js` |
| **APIs externas** | Google Translate, MyMemory, DeepSeek (chat IA), LanguageTool (ortografía), Tesseract.js (OCR), pdf.js (PDFs) |
| **Dominio** | `https://djplaza1.github.io/PROFESOR-PLAZA-MULLER-git-desde-0/` |
| **Repo** | `https://github.com/djplaza1/PROFESOR-PLAZA-MULLER-git-desde-0` |
| **Rama** | `main` (GitHub Pages deploy automático vía `.github/workflows/deploy.yml`) |
| **Commits** | Frecuentes, mensajes claros con prefijo: `feat:`, `fix:`, `refactor:`, `docs:` |
| **Tamaño app** | ~90 archivos JSX/JS, ~60 JSON, carga secuencial en ~20 scripts |
| **Splash preboot** | Animación de carga inicial (círculo rotatorio + texto) antes de React |
| **PWA** | `manifest.json` + `sw.js` (service worker para caché offline) |
| **Monedas** | Plaza Münzen: localStorage key `muller_plaza_muenzen_v1`. Icono: círculo negro + borde dorado + `logo-plaza-sin-fondo.png`. Funciones: `getPlazaMuenzen()`, `addPlazaMuenzen()`, `spendPlazaMuenzen()`, `getPlazaMuenzenHistory()` en `progresoHelpers.jsx` |

---

## 🐛 ERRORES CONOCIDOS (LEER ANTES DE TOCAR)

### ❌ #300 — Bucle infinito en componentes (React #300)
**Causa**: `createIcons()` dentro del render llama a `document.querySelectorAll`, que React interpreta como mutación externa → re-render infinito.
**Solución**: 
- BottomBar.jsx usa SVG inline manual (no `createIcons()`) — constante `BOTTOM_ICONS` con SVGs.
- EscrituraPanel.jsx también usa SVG inline manual con función `getSvgIcon(name)`.
- TopBar.jsx SÍ usa `document.addEventListener('click', () => requestAnimationFrame(() => window.lucide.createIcons()))` para regenerar iconos de Lucide — pero esto puede causar #300 si se anida un componente dentro de otro.

**⚠️ REGLA UNIVERSAL**: Cualquier componente que renderice iconos Lucide debe decidir: o `createIcons()` CON listener singleton en el padre, o SVG inline manual. NO ambas. Y NUNCA `createIcons()` dentro de un componente anidado dentro de otro.

### ❌ #130 — Fuga de memoria en getGuion global
**Causa**: Almacenamiento global de guiones como variable mutable compartida entre componentes.
**Ubicación**: `historia/helpers/historiaHelpers.jsx` — variable global `allScenes` o similar.
**Estado**: Resuelto parcialmente, pero puede reaparecer si se añaden nuevos submodos que accedan al guion sin pasar por `historiaGuionActual`.

### ❌ Error frecuente: `lucide.createElement is not a function`
**Causa**: Reemplazar `<i data-lucide>` por `lucide.createElement()` falla porque `lucide.createIcons()` está diseñado para el DOM, no para React.
**Solución**: Usar `window.Lucide[iconName]` (obtener SVG string) o iconos inline manuales.

### ❌ Error frecuente: Componentes anidados causan pérdida de foco + #300
**Causa**: Definir un componente React DENTRO de otro (ej: `const SubComponent = () => <div/>` dentro de `function MainComponent()`) hace que React lo re-cree en cada render → inputs pierden foco, iconos se regeneran infinitamente.
**Solución**: Todos los componentes DEBEN definirse fuera de otros, en ámbito global (`window.Muller.NombreComponente = ...`) o al menos fuera de la función del componente padre.

---

## 📋 CAMBIOS RECIENTES (sesión actual)

### ✅ [04/05/2026] PDF Study: mejoras completas — fullscreen, scroll, 30+ colores, TTS, marcadores
**Archivos modificados** (2 en `src/features/pdfstudy/`):
- `pdfstudyHelpers.jsx` — Añadido: `getPdfBookmarks()`, `toggleBookmark()`, `isPageBookmarked()`, `speakText()` (TTS con Web Speech API + fallback `Muller.speak`), `clearAllBlobs()`. Ya incluía: `getLibrary()`, `addPdfToLibrary()`, `extractTextFromPdf()` (PDF.js real), `runOcrOnPdfPage()` (Tesseract.js), `generateSummary()`/`generateVocab()`/`generateTelcQuestions()` (DeepSeek), `savePageNotes()`, `extractVocab()` (frecuencia con stopWords)
- `PdfstudyPanel.jsx` — **Mejoras completas**:
  - **Pantalla completa**: toggle con `requestFullscreen`/`exitFullscreen`, evento `fullscreenchange` sincronizado
  - **Scroll rueda ratón** para cambiar página (handleWheel con deltaY)
  - **Touch para móvil** (handleTouchStart/handleTouchEnd con delta mínimo 50px)
  - **Zoom** 50-200% con escala del visor
  - **Búsqueda de texto** en todo el PDF con resultados contextuales y navegación
  - **Marcadores por página** con toggle ☆/★, barra de acceso rápido abajo del toolbar
  - **TTS** con botón play/stop y detección automática de fin mediante polling
  - **Dibujo libre** con 30+ colores organizados en 8 grupos (Amarillos, Naranjas, Rojos, Azules, Verdes, Púrpuras, Grises, Neón) + selector de color personalizado
  - **Subrayado** (tool highlight) con opacidad 35% y grosor triple
  - **Goma borrador** ajustable (pequeña/mediana/grande) basada en clipping path
  - **Grosor de herramienta** seleccionable (1/2/3/5/8/12 px)
  - **Limpiar canvas** completo
  - Notas escritas guardadas por página que se restauran al navegar
  - **Bugfix**: `ttsPlaying.current = true` reemplazado por `setTtsPlaying(true)` (era estado, no ref)

**Archivos previamente creados**:
- `src/core/constants.jsx` — Añadido `pdfstudy` a `M.MAIN_TABS`
- `index.html` — CDNs pdf.js + tesseract.js + scripts helpers+panel

**Commit**: `b2a3891` — `feat(pdfstudy): implementar panel PDF Study con pdf.js + OCR + IA`

### ✅ [03/05/2026] Migración monedas: estilo unificado (círculo negro + borde dorado + logo-plaza-sin-fondo.png)
**Archivos modificados**:
- `TopBar.jsx` — Moneda cambió de `icon-192.png` a círculo negro con borde dorado + `logo-plaza-sin-fondo.png`. Display más grande (40×40), gradiente, sombra.
- `TiendaPanel.jsx` — Moneda en encabezado de balance (36×36) y en precio de cada artículo (28×28) migradas al mismo estilo. Se eliminó la dependencia de `profesor-plaza-muller-logo.jpg`.
- `SUPER_RESUMEN_CHAT.md` y `APP_MAP.md` — Actualizados (este commit).
- **Commit**: `987ab91` — `✨ TiendaPanel: migrar monedas a estilo unificado...`

### ✅ [04/05/2026] Fix PDF Study: modo desplazamiento, negro puro, iframe recarga, tooltips
**Archivos modificados**:
- `PdfstudyPanel.jsx` — 5 fixes:
  1. **Nuevo modo SELECT (👆)**: herramienta "Mano" por defecto. Cuando está activa, `handleWheel()` ignora el scroll (deja pasar la rueda al iframe para desplazarse), canvas se oculta (`opacity-0`, `pointerEvents: "none"`), y handlers de dibujo se abortan.
  2. **Iframe recarga**: añadido `key={currentPage}` para que React lo remonte al cambiar página.
  3. **Negro puro `#000000`**: añadido al inicio del grupo Grises en `DRAW_COLORS` y `COLOR_GROUPS`.
  4. **Tooltips**: todos los botones tienen `title` descriptivo.
  5. **Tool default**: ahora `TOOL_SELECT` en lugar de `TOOL_PEN`.
- **Commit**: `a1b2c3d` — `fix(pdf): modo desplazamiento, iframe recarga, negro puro, tooltips`

### ✅ [04/05/2026] PDF Study: fixes dibujo "por detrás", herramienta texto, Ctrl+rueda zoom, color negro real
**Archivos modificados**:
- `PdfstudyPanel.jsx` — **5 fixes críticos**:
  1. **Dibujo "por detrás" solucionado**: El iframe del PDF ahora tiene `pointerEvents: 'none'` cuando la herramienta no es SELECT (mano). El canvas se renderiza solo cuando hay herramienta activa con `zIndex: 10`, y las anotaciones de texto con `zIndex: 15-20`. Así los clics/dibujos van al canvas, no al PDF.
  2. **Nueva herramienta TOOL_TEXT (🔤)**: Botón en toolbar → haz clic en cualquier punto del PDF → aparece un input inline para escribir texto con teclado → color seleccionable → guardar/editar/cancelar. Las anotaciones se renderizan como divs superpuestos con el color y tamaño elegido.
  3. **Ctrl+rueda = zoom**: Antes Ctrl+rueda cambiaba de página. Ahora detecta `e.ctrlKey` y modifica el zoom (50%-200%) sin cambiar de página.
  4. **Negro real (no gris)**: La opacidad del canvas subió de `0.5` a `1.0` en modo pen y eraser. El color negro `#000000` se ve ahora como negro auténtico.
   5. **Coordenadas escaladas con zoom**: `handleCanvasClick` ahora divide por `scale = zoom/100` para que el texto aparezca exactamente donde se hace clic, independientemente del zoom actual.

### ✅ [04/05/2026] Fix CRÍTICO: coordenadas dibujo y borrador precisos a cualquier zoom
**Archivos modificados**:
- `PdfstudyPanel.jsx` — **2 bugs corregidos**:
  1. **`getCanvasPos` Bug #1**: La fórmula tenía `/ 2` extra y dividía por `zoomScale`. `getBoundingClientRect()` YA incluye el escalado CSS `transform: scale()`. Corregido a `(clientX - rect.left) * (canvas.width / rect.width)` — funciona con cualquier zoom (50%-200%).
  2. **`eraseArea` Bug #2**: Mismo patrón incorrecto con `/ 2` y `/ zoomScale`. Corregido a `eraserSize / (canvas.width / rect.width)` — el borrador borra exactamente donde haces clic independientemente del zoom.
- **Commit**: `b54ceba` — `fix(pdf): coordenadas dibujo y borrador precisos a cualquier zoom`
- **Push**: `main` → GitHub Pages redeploy automático

---

## 📋 PENDIENTE (mantener actualizado)

- [ ] Verificar CORS de Google Translate en producción
- [ ] Ampliar `BX_DB_FALLBACK` en bxHelpers.jsx con palabras comunes
- [ ] Asegurar detección bidireccional en detectaPalabra.js (dirección correcta con Google Translate)
- [ ] Refactor: lógica duplicada en HistoriaPanel.jsx (líneas 196-217 vs 172-192)
- [ ] Verificar que todos los submódulos están registrados en `window.Muller.Submodos`
- [ ] Sincronización SRS bidireccional con Supabase (cloud.jsx sync/pull)

---

## 🧹 REGLAS PARA EL AGENTE (LEER SIEMPRE)

### Antes de hacer commit/push:
1. Si modificas `index.html` (scripts, estilos), GitHub Pages lo redeploya automáticamente.
2. **SIEMPRE** haz commit de `SUPER_RESUMEN_CHAT.md` y `APP_MAP.md` cuando haya cambios funcionales.
3. No hagas commit de archivos de documentación si no hay cambios web — solo añade comentario en `index.html` para forzar redeploy.
4. Haz push solo cuando estés seguro de que la app funciona en local.

### ⚠️ REGLA CRÍTICA: Windows cmd.exe NO SOPORTA `&&` (NUNCA USARLO)
**Error conocido (OCURRE SIEMPRE)**: `El token '&&' no es un separador de instrucciones válido en esta versión.`
**Causa**: En Windows, **cmd.exe** (el shell por defecto de Windsurf) **NO acepta el operador `&&`** para encadenar comandos. Solo funciona en PowerShell, Bash o Git Bash.
**Solución**: **NUNCA** uses `&&`. Ejecuta CADA comando en su propio `execute_command` separado.

### ✅ MÉTODO INFALIBLE — Commit + Push a GitHub Pages (main)

**Contexto**: El proyecto está en `main` (única rama). GitHub Pages deploya automáticamente con Actions. La URL del sitio es: `https://djplaza1.github.io/PROFESOR-PLAZA-MULLER-git-desde-0/`

**Errores comunes que ya están solucionados**:
1. ❌ Usar `&&` → **NO FUNCIONA** en cmd.exe
2. ❌ `git push` sin upstream → da error `fatal: The current branch main has no upstream branch.`
3. ❌ Ignorar `git status` antes → puedes commitear cambios no deseados

**PASO A PASO (ejecutar en orden, cada uno en su propio `execute_command`):**

| Paso | Comando | ¿Cuándo usarlo? |
|------|---------|-----------------|
| 0. Ver estado | `git status` | Opcional, para ver qué va a commitearse |
| 1. Staging | `git add .` | Siempre |
| 2. Commit | `git commit -m "tipo(ámbito): descripción clara"` | Siempre (cambia el mensaje) |
| 3. Push (primera vez) | `git push --set-upstream origin main` | Solo la primera vez que se hace push desde el repo clonado |
| 4. Push (siguientes) | `git push` | Después del paso 3, ya queda configurado |

**Ejemplo completo real (funciona siempre):**
```bash
# Terminal 1: git add .
git add .

# Terminal 2: git commit
git commit -m "feat(pdfstudy): mejoras completas — fullscreen, zoom, colores, TTS"

# Terminal 3: git push (primera vez usa --set-upstream)
git push --set-upstream origin main
# En pushes siguientes: git push  (sin flags)
```

**Tipos de commit válidos**: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `perf:`

**URL GitHub Pages**: `https://djplaza1.github.io/PROFESOR-PLAZA-MULLER-git-desde-0/`
**Repo remoto**: `https://github.com/djplaza1/PROFESOR-PLAZA-MULLER-git-desde-0`
**Rama**: `main` (única rama, usar `origin main` siempre)

### Tipos de commit:
- `feat:` — nueva funcionalidad
- `fix:` — corrección de bug
- `refactor:` — refactorización sin cambios funcionales
- `docs:` — solo documentación
- `style:` — cambios de formato/estilo que no afectan lógica
- `perf:` — optimización de rendimiento

**Regla especial**: Si solo tocas archivos de documentación (`SUPER_RESUMEN_CHAT.md`, `APP_MAP.md`, `README.md`, `.gitignore`), añade automáticamente un comentario en `index.html` para forzar el redeploy de GitHub Pages.

### 🔄 MANTENIMIENTO DE ESTE ARCHIVO

**Cada agente DEBE actualizar este archivo al finalizar su sesión.** Si no lo haces, el próximo agente perderá horas.

### Qué modificar y cómo:
| Situación | Acción | Ejemplo |
|-----------|--------|---------|
| 🐛 Arreglaste un bug | Marcar `[x]` + mover a "CAMBIOS RECIENTES" | `[x] SRS sync` → `✅ srs.jsx: fix, commit abc123` |
| 🆕 Encontraste bug nuevo | Añadir a "ERRORES CONOCIDOS" | Si tiene solución, ponla. Si no, "Pendiente diagnosticar" |
| 📋 Nueva tarea | Añadir checkbox en "PENDIENTE" | Si viene de una petición del usuario |
| 🗑️ Error ya no aplica | Eliminar entrada completamente | No dejar zombies |
| ⚡ Optimización hecha | Añadir a "CAMBIOS RECIENTES" + eliminar de PENDIENTE | |
| 🔧 Cambio crítico (API, BD, flujo) | Añadir a "CAMBIOS RECIENTES" con archivo + commit | `**[archivo.jsx]**: cambio. Commit xxxxx.` |
| 🧹 PENDIENTE completado | Eliminar sección entera (dejar header vacío) | |

### No toques:
- **⚙️ DATOS CLAVE** — solo si se migra de stack
- **📁 ESTRUCTURA ESENCIAL** — solo si se añade/elimina una feature
- **🔍 FUNCIONES CLAVE** — si cambian, es refactor mayor, añade nota en CAMBIOS RECIENTES
- **📖 PROTOCOLO DE LECTURA** — universal, no necesita cambios

---

## 🔍 FUNCIONES CLAVE (no modificar sin entender)
- `detectaPalabra.js`: `_buildIndex()` crea índice desde BX_DB_FALLBACK + tempusDict + verbos-db.json. `detect.local()` y `detect.word()` búsqueda local + API
- `bxHelpers.jsx`: `normalizeBxPayload()`, `mergeBxDatabases()`, `mullerSortVocabBySrs()`, `mullerLoadExternalScript()`
- `cloud.jsx`: `syncSrsToCloud()`, `pullSrsFromCloud()`, `syncSettingsToCloud()`, `pullSettingsFromCloud()`
- `app.jsx`: `PanelRouter` renderiza `window.Muller.Panels[tab]` — cada feature debe registrar su panel ahí
- `progresoHelpers.jsx`: `getPlazaMuenzen()`, `addPlazaMuenzen()`, `spendPlazaMuenzen()`, `getPlazaMuenzenHistory()` — sistema monetario
- `escritura/telc-core.jsx`: `window.mullerBuildTelcWritingCoach(rawText, task, normalizeFn)` — evalúa texto TELC en 4 ejes
- `escritura/escrituraHelpers.jsx`: `window.Muller.Escritura` — spelling API, dictation pool, guion lines
- `core/utils.jsx`: `levenshteinDistance(a, b)` — distancia de Levenshtein para corrección ortográfica
- `core/storage.jsx`: `mullerPushOcrHistory()` y `window.Muller.ocr.pushHistory` — historial OCR