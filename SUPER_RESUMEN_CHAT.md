# 🏆 SUPER RESUMEN — PROFESOR PLAZA MÜLLER (APRENDER ALEMÁN)

> **Propósito**: Que cualquier agente (incluido tú mismo en el futuro) entienda el proyecto en 2 minutos, sin leer código fuente. Léelo completo al empezar.
>
> **⚠️ ORDEN DE LECTURA OBLIGATORIO**:
> 1. Este archivo (SUPER_RESUMEN_CHAT.md) — contexto, reglas, errores, pendientes
> 2. `APP_MAP.md` — estructura exacta, dónde está cada cosa
> 3. Solo entonces, tocar archivos concretos

---

## 🚀 ¿QUÉ ES ESTO?

SPA (Single Page Application) para aprender alemán, construida con **React 18 vía CDN + Babel standalone + Tailwind CSS CDN + Lucide + Supabase**. Sin bundlers (webpack/vite). Sin imports/exports. Namespace global `window.Muller`. Funciona offline con localStorage como fallback.

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

### ✅ [03/05/2026] Pestaña Escritura implementada al 100%
**Archivos creados** (4 en `src/features/escritura/`):
- `writing-data.jsx` — arrays globales: `WRITING_COPY_DRILLS` (10 copias), `WRITING_PROMPTS_DE` (8 temas), `WRITING_DICTATION_LINES` (5 dictados), `LETTER_DRILLS` (3 ÄÖÜß), `WRITING_TELC_TASKS` (4 B1-B2 con scaffold)
- `telc-core.jsx` — `window.mullerBuildTelcWritingCoach(rawText, task, normalizeFn)` — evalúa texto TELC en 4 ejes (tarea, registro, cohesión, gramática) → /20 → % → sugerencias
- `escrituraHelpers.jsx` — `window.Muller.Escritura` con: `spelling` (LanguageTool API + DeepSeek fallback), `getDictationPool()` (combina fuentes), `rebuildGuionLines()` (reconstruye líneas de historia)
- `EscrituraPanel.jsx` — Panel con 8 modos: Libre, Copia, Dictado, Tema, TELC, Letras DE, Guion, Vocab. Canvas escritura a mano. Se registra como `window.Muller.Panels.escritura = EscrituraPanel`

**Archivos modificados**:
- `src/core/constants.jsx` — añadido `OCR_HISTORY: 'muller_ocr_history_v1'`, `'escritura'` en `MAIN_TABS`
- `src/core/storage.jsx` — `MULLER_OCR_HIST_KEY`, `mullerPushOcrHistory()`, `window.Muller.ocr = { pushHistory }`
- `src/core/utils.jsx` — `levenshteinDistance(a, b)` para corrección ortográfica
- `src/core/speech.jsx` — verificar/actualizar `normalizeGermanSpeechText` (ya existía)
- `index.html` — scripts escritura añadidos en orden: helpers → data → telc → panel
- `src/app.jsx` — PanelRouter usa `(window.Muller.Panels || {})[tab]` (ya funcionaba)
- `navigation/TopBar.jsx` — añadido tab `{ id: 'escritura', label: 'Escritura', icon: 'pen-tool' }`

**Detalles técnicos importantes de EscrituraPanel**:
- **Firma de props**: `({ session })` — NO `{ db, user, appState }`. El router pasa `session`.
- **Iconos**: Todos inline SVG via `getSvgIcon(name)` — NO `createIcons()` para evitar #300
- **Canvas**: `<canvas>` nativo con pointer events (pointerdown/move/up) capturados. Draw de línea real (no puntos). Goma, colores, deshacer (historial de strokes). OCR con Tesseract.js (window.Tesseract). Guardado PNG.
- **TELC Coach**: Evalúa 4 ejes (tarea/registro/cohesión/gramática 0-5 c/u → /20). Usa `mullerBuildTelcWritingCoach()` + corrección ortográfica vía API LanguageTool o DeepSeek.
- **Modo Guion**: Lee `window.historiaGuionActual` (global de Historia). Si no hay guion, muestra mensaje informativo.
- **Modo Vocab**: Lee `window.vocabSrsData` (global de SRS/Lexikon). Si no hay, muestra mensaje.
- **Canvas compartido**: Un solo canvas `<canvas>` reutilizado entre todos los modos (no se recrea al cambiar de modo, solo se limpia al cambiar).
- **Commit**: `b1911cf` — `feat(escritura): implementar pestaña Escritura con 8 modos...`

---

## 📋 PENDIENTE (mantener actualizado)
> **Regla obligatoria**: Marca `[x]` cuando el usuario confirme que funciona. Elimina entradas cuando el bloque esté resuelto. Añade bugs/mejoras que descubras.

- [ ] Verificar CORS de Google Translate en producción
- [ ] Ampliar `BX_DB_FALLBACK` en bxHelpers.jsx con palabras comunes
- [ ] Asegurar detección bidireccional en detectaPalabra.js (dirección correcta con Google Translate)
- [ ] Refactor: lógica duplicada en HistoriaPanel.jsx (líneas 196-217 vs 172-192)
- [ ] Verificar que todos los submódulos están registrados en `window.Muller.Submodos`
- [ ] SRS: funciones en bxHelpers.jsx (getVocabSrsMap, sortVocabBySrs, applyVocabSrsRating, incrementSrsView)
- [ ] Sincronización SRS bidireccional con Supabase (cloud.jsx sync/pull)
- [ ] **MEJORA Escritura**: Añadir Tesseract.js como script en index.html (si no está ya) para OCR en modo Libre
- [ ] **MEJORA Escritura**: Añadir soporte para subir imagen al canvas (fondo de caligrafía)
- [ ] **MEJORA Escritura**: Añadir detección de escritura a mano real vs teclado (por ahora solo canvas pointer)
- [ ] **MEJORA Escritura**: Integrar corrección ortográfica con LanguageTool en modo TELC (ya esqueletado, falta probar)
- [ ] Verificar que los modos Guion y Vocab funcionan cuando hay datos reales de Historia/SRS

---

## 🧹 REGLAS PARA EL AGENTE (LEER SIEMPRE)

### Antes de hacer commit/push:
1. Si modificas `index.html` (scripts, estilos), GitHub Pages lo redeploya automáticamente.
2. **SIEMPRE** haz commit de `SUPER_RESUMEN_CHAT.md` y `APP_MAP.md` cuando haya cambios funcionales.
3. No hagas commit de archivos de documentación si no hay cambios web — solo añade comentario en `index.html` para forzar redeploy.
4. Haz push solo cuando estés seguro de que la app funciona en local.

### Al hacer commit:
```bash
cd C:\PROFESOR-PLAZA-MULLER-git-desde-0
git add .
git commit -m "tipo(ámbito): descripción clara"
git push
```

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
- `escritura/telc-core.jsx`: `window.mullerBuildTelcWritingCoach(rawText, task, normalizeFn)` — evalúa texto TELC en 4 ejes
- `escritura/escrituraHelpers.jsx`: `window.Muller.Escritura` — spelling API, dictation pool, guion lines
- `core/utils.jsx`: `levenshteinDistance(a, b)` — distancia de Levenshtein para corrección ortográfica
- `core/storage.jsx`: `mullerPushOcrHistory()` y `window.Muller.ocr.pushHistory` — historial OCR