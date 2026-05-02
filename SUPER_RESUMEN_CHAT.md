# SUPER RESUMEN — PROFESOR PLAZA MÜLLER

> **📌 INSTRUCCIONES PARA EL PRÓXIMO AGENTE (LEE ESTO PRIMERO)**
>
> **Paso 0 — FILOSOFÍA DE LA APP**: Esta app DEBE sentirse como una aplicación PREMIUM de pago (Duolingo, Babbel, Busuu), pero hecha SOLO con tecnología gratuita. **La ÚNICA excepción es DeepSeek API** para funcionalidades de IA en tiempo real. Todo lo demás —animaciones, transiciones, sombras, glassmorphism, micro-interacciones, UX fluida, responsive, tipografía— debe lograrse con CSS puro (Tailwind + animaciones CSS + Lucide icons + Web Speech API gratis). **No hay excusa para parecer "amateur"**. Si falta un detalle visual o de UX que cualquier app paga tendría, IMPLÉNTALO.
>
> **Paso 1**: Lee este archivo COMPLETO (SUPER_RESUMEN_CHAT.md) — contiene configuración, errores, pendientes, reglas.
> **Paso 2**: Lee APP_MAP.md COMPLETO — contiene estructura exacta de cada archivo y qué buscar en cada uno.
> **Paso 3**: Sin leer más archivos, usa la tabla "Patrón de Búsqueda Rápida" de APP_MAP.md para ir AL ARCHIVO EXACTO que necesites.
> **Paso 4**: Usa `search_files` con regex o `read_file` con `start_line`/`end_line`. NUNCA leas archivos completos a menos que tengan <100 líneas.
> **Paso 5**: Al terminar tu sesión, actualiza este archivo (lee sección "🔄 MANTENIMIENTO DE ESTE ARCHIVO").
>
> **Coste total de lectura inicial**: ~200 líneas. **No gastes tokens leyendo el proyecto entero.**
>
> ⚠️ **Cualquier código que añadas o modifiques debe mantener este estándar premium-gratuito. Si algo se ve "cutre", no es aceptable.**

## ⚙️ DATOS CLAVE
- **Stack**: React 18 vanilla (sin bundlers), Tailwind CDN, Lucide Icons CDN, Supabase JS CDN, Babel standalone
- **Namespace único**: `window.Muller` — no hay imports/exports, todo global via IIFE
- **Entry point**: `index.html` → carga scripts en orden: core → hooks → features → `app.jsx`
- **Estilo**: Sin JSX → `window.React.createElement()` + `<i data-lucide="iconName">` + `window.lucide.createIcons()`
- **Repo**: `github.com/djplaza1/PROFESOR-PLAZA-MULLER-git-desde-0`
- **Auth**: Híbrido — Supabase (primario) + PBKDF2 local (fallback offline)
- **BD local**: localStorage (sessionStorage para sesiones temporales)

---

## 📁 ESTRUCTURA ESENCIAL

```
index.html                     → Entry point + splash HTML + carga scripts
src/
├── app.jsx                    → App(), LoginScreen, PanelRouter (rutea tabs)
├── core/                      → Capa base (sin UI)
│   ├── constants.jsx          → KEYS localStorage, MAIN_TABS, COLORS, TTS_RATES, SUBMODOS_HISTORIA
│   ├── storage.jsx            → get/set/remove localStorage + sessionStorage
│   ├── translate.js           → Google Translate (primario) + MyMemory (fallback)
│   ├── detectaPalabra.js      → Búsqueda local en BD + API, índice desde múltiples fuentes
│   ├── bxHelpers.jsx          → Normalización BD, merge overlay, SRS scoring, carga scripts externos
│   ├── auth.jsx               → Supabase Auth + PBKDF2 local (W. Muller.Auth.login/register/logout/getActiveSession)
│   ├── cloud.jsx              → Cliente Supabase, sync settings/SRS to cloud, mergeBxLevel
│   ├── speech.jsx             → TTS (Web Speech API)
│   ├── srs.jsx                → Spaced Repetition System
│   ├── achievements.jsx       → Logros/achievements
│   ├── toast.jsx              → Notificaciones toast
│   ├── utils.jsx              → Utilidades varias
│   ├── onboarding.jsx         → Onboarding inicial
│   └── cloud.jsx              → Supabase client + sync
├── data/                      → BD locales
│   ├── b1-b2-database.json    → Vocabulario B1/B2 principal
│   ├── verbos-db.json         → Verbos con conjugaciones
│   ├── reise-mini.json        → Guion historia de viaje
│   └── diccionario/           → Diccionarios adicionales
├── hooks/
│   └── useLocalStorage.jsx    → Hook useLocalStorage
├── features/                  → Paneles UI (cada uno es una tab)
│   ├── navigation/            → TopBar.jsx (tabs secundarias), BottomBar.jsx (tabs principales)
│   ├── historia/              → Panel principal + 9 Submodos + data (tempusDict, guiones)
│   ├── lexikon/               → Visor vocabulario B1/B2 con SRS, búsqueda online
│   ├── lectura/               → Lector con herramientas
│   ├── escritura/             → Práctica escritura (handwriting canvas)
│   ├── entrenamiento/         → Ejercicios entrenamiento
│   ├── progreso/              → Estadísticas y progreso
│   ├── comunidad/             → Comunidad / foro
│   ├── biblioteca/            → Biblioteca de recursos
│   ├── maestros/              → Maestros / profesores
│   ├── telc/                  → Preparación examen TELC
│   ├── ia/                    → Panel de IA
│   ├── ajustes/               → Ajustes/configuración
│   ├── pdfstudy/              → Estudio con PDFs (pdf.js + Tesseract.js)
│   ├── ruta/                  → Ruta de aprendizaje
│   └── splash/                → SplashScreen componente
└── assets/                    → Iconos PWA
```

---

## ✅ CAMBIOS RECIENTES (este chat)
- **translate.js**: Priorizar Google Translate sobre MyMemory. Commit `c796249`. Endpoint: `translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q={word}`
- **SUPER_RESUMEN_CHAT.md**: Optimizado + añadido protocolo de lectura + mantenimiento para futuros agentes
- **APP_MAP.md**: Creado mapa navegable completo para búsqueda rápida sin leer código
- **[HistoriaPanel.jsx]**: Modo Vocabulario mejorado — vocabulario automático al final de cada frase con artículo traducido (colores der/die/das), nivel (A1-C1) y traducción al español. Palabras resaltadas en AMARILLO. Commit `4fd0d57`.
- **[BibliotecaPanel.jsx]**: Instrucciones IA mejoradas — prompt completo con ejemplos A2/B1, formato exacto para generar guiones con vocabulario por niveles (A1-C1). Commit `4fd0d57`.

---

## ❌ ERRORES CONOCIDOS
1. **`c.forEach is not a function`** en HistoriaPanel → Solucionado: migrar a `<i data-lucide>` + `lucide.createIcons()`
2. **SyntaxError en `crearIcono`** → No tocar HistoriaPanel.jsx, ya estaba bien en el repo
3. **Ruta con typo `\hista\`** → Usar rutas absolutas siempre
4. **`replace_in_file` falla por indentación** → Verificar contenido actual con read_file antes de editar

---

## 🔧 REGLAS PARA TRABAJAR
- **⚡ FILOSOFÍA PREMIUM-GRATUITA**: Cada pestaña/feature debe parecer de una app de pago. Usa Tailwind para glassmorphism, sombras suaves, bordes redondeados, gradientes sutiles, animaciones CSS (transitions, keyframes, transforms). Micro-interacciones en hover/focus/active. Transiciones suaves entre pantallas. Loading skeletons, empty states con ilustraciones, feedback táctil visual. La DeepSeek API es la ÚNICA tecnología de pago. **Si añades algo que se ve "amateur", estás incumpliendo esta regla.**
- **Rutas absolutas**: `C:\PROFESOR-PLAZA-MULLER-git-desde-0\...`
- **Namespace**: `window.Muller.*` — todo global, sin imports
- **React**: `React.createElement(tag, props, ...children)` — sin JSX
- **Íconos**: `<i data-lucide="iconName">` + `window.lucide.createIcons()` — NO `lucide.createElement()`
- **PowerShell**: No usar `exit`, no here-strings con comillas anidadas
- **Git**: El agente indica comandos, usuario pega y devuelve salida
- **⚠️ GITHUB (OBLIGATORIO)**: Cada vez que se haga un commit local, hay que hacer **también `git push` a GitHub** para que la app se actualice en internet (GitHub Pages). Sin push, los cambios no se ven en producción. **Regla: no termines una sesión sin hacer push.**

- **🔴 IMPORTANTE: GitHub Pages SOLO redeploya si el commit toca archivos de la web** (`index.html`, `src/`, `sw.js`, `assets/`). Si el commit solo toca `SUPER_RESUMEN_CHAT.md`, `README.md`, `.gitignore` u otros archivos que no se sirven en la web, **GitHub Pages NO regenera la página** aunque el código nuevo ya esté en el repositorio.
  - **Cómo evitarlo**: si el commit solo contiene cambios en archivos NO web (documentación, etc.), haz también un cambio mínimo en `index.html` (por ejemplo añadir un comentario como `<!-- redeploy YYYY-MM-DD -->` en el `<head>`) para forzar el redeploy.
  - El comando de abajo ya incluye esta comprobación automática: si detecta que ningún archivo web ha cambiado, añade el comentario de redeploy en `index.html`.

- **🔄 Commit + Push universal (funciona siempre — rama `main`)** (PowerShell — copiar y pegar entero):
  ```powershell
  Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; `
  $branch = (git rev-parse --abbrev-ref HEAD); `
  $webFiles = git diff --cached --name-only; `
  $hasWebChanges = ($webFiles | Select-String -Pattern '^(index\.html|src/|sw\.js|manifest\.json|assets/)').Count -gt 0; `
  if (-not $hasWebChanges) { `
    $date = Get-Date -Format "yyyy-MM-dd"; `
    $content = Get-Content "index.html" -Raw; `
    if ($content -notmatch "redeploy $date") { `
      $content = $content -replace "(<meta charset=""UTF-8"">)", "`$1`n    <!-- redeploy $date -->"; `
      Set-Content "index.html" -Value $content; `
      git add "index.html"; `
    } `
  }; `
  git commit -m "tu mensaje"; `
  git push origin $branch
  ```
  > **Instrucciones**: Cambia `"tu mensaje"` por lo que quieras poner en el commit. El comando:
  > 1. Detecta la rama automáticamente (ahora es `main` tanto en casa como en el trabajo — el comando ya está configurado para siempre usar `main`)
  > 2. Comprueba si los archivos modificados son de la web o no
  > 3. **Si solo has tocado documentación** (`SUPER_RESUMEN_CHAT.md`, `README.md`, `.gitignore`, etc.), añade automáticamente un comentario en `index.html` para forzar el redeploy de GitHub Pages
  > 4. Si ya hay cambios web, hace commit normal sin tocar `index.html`
  > 5. Hace push a la rama correcta (`main`)

- **⚠️ Caché GitHub Pages**: Si después de hacer push la web no se actualiza al recargar (https://djplaza1.github.io/PROFESOR-PLAZA-MULLER-git-desde-0/), forzar recarga con `Ctrl+F5` (Windows) o `Cmd+Shift+R` (Mac) para saltar la caché del navegador. Si sigue sin cargar, esperar 2-3 minutos a que GitHub Pages termine el despliegue.
- **Consistencia visual**: Todas las pestañas deben compartir el mismo sistema de diseño: mismos espaciados (p-4/p-6), mismos radios de borde (rounded-xl/rounded-2xl), misma paleta de colores (Tailwind slate/indigo/emerald), mismos estilos de botones, mismos tipos de loading/empty/error states. No reinventes estilos por pestaña.
- **DeepSeek API**: Disponible para funciones premium en tiempo real. No abuses de ella, úsala solo donde aporte valor real (traducción avanzada, explicaciones contextuales, corrección de escritura, chat IA didáctico). Guarda la API key en `window.Muller.deepseekKey` o variable de entorno.

---

## 📖 PROTOCOLO DE LECTURA PARA AHORRAR TOKENS (LEER SIEMPRE)

**Este archivo + `APP_MAP.md` son LOS ÚNICOS que debes leer en tu primer mensaje (~200 líneas total).** Nunca leas el proyecto entero. Usa el mapa para ir al archivo exacto.

### Secuencia obligatoria de búsqueda (NO SALTAR PASOS):

```
PASO 1: SUPER_RESUMEN_CHAT.md (config, errores, pendientes, reglas)
PASO 2: APP_MAP.md (estructura, dónde está cada cosa)
PASO 3: search_files(regex="...") → localiza función exacta (coste: ~10 líneas)
PASO 4: read_file(start_line=N, end_line=M) → solo el bloque que tocas (coste: ~20-50 líneas)
PASO 5: replace_in_file o write_to_file → editas sabiendo exactamente qué cambiar
```

### Cómo usar las herramientas internas para buscar (con ejemplos reales):

| Qué necesitas | Herramienta a usar | Ejemplo de búsqueda | Por qué es eficiente |
|--------------|-------------------|---------------------|---------------------|
| Encontrar función `renderScene` | `search_files(regex="function renderScene")` | Devuelve solo la línea con la función + contexto | No carga el archivo entero |
| Encontrar variable `BX_DB_FALLBACK` | `search_files(regex="BX_DB_FALLBACK")` | Encuentra dónde se define y dónde se usa | Múltiples resultados en una llamada |
| Ver qué funciones hay en historia/ | `list_code_definition_names(path="src/features/historia")` | Lista solo nombres de funciones | Coste mínimo, sin abrir archivos |
| Ver qué archivos hay en core/ | `list_files(path="src/core")` | Lista archivos | No necesitas leer nada |
| Leer solo las líneas 100-120 de un archivo | `read_file(path="file", start_line=100, end_line=120)` | Carga solo 20 líneas | Evita cargar 800 líneas |
| Buscar un string en todo el proyecto | `search_files(regex="Muller\.Panels\['")` | Encuentra todos los registros de paneles | Una sola llamada cubre todo el proyecto |
| Encontrar qué archivo usa `lucide.createIcons` | `search_files(regex="lucide\.createIcons")` | Encuentra todos los lugares que regeneran iconos | Sin leer features completas |

### Reglas ABSOLUTAS de ahorro de tokens:
1. 🥇 **SIEMPRE usa `search_files` primero** para localizar lo que buscas. Es lo más barato.
2. 🥇 **NUNCA uses `read_file` completo** para buscar algo. Úsalo solo cuando ya sepas exactamente qué línea editar.
3. 🥇 **Usa `start_line`/`end_line`** cuando ya tengas el número de línea del paso anterior.
4. ✅ **`list_code_definition_names`** es gratis (solo nombres, sin contenido).
5. ✅ **`list_files`** es gratis (solo nombres de archivo).
6. ❌ **NO abras features enteras** si solo necesitas un helper.
7. ❌ **NO leas BD JSON** si solo necesitas saber qué contiene (mira APP_MAP.md).

### Ejemplo real de flujo óptimo (ahorro: ~700 líneas):
```
❌ MAL: read_file("src/features/historia/HistoriaPanel.jsx") → 800 líneas en contexto
✅ BIEN: search_files(regex="renderScene") → 15 líneas → read_file(start_line=200, end_line=230) → 30 líneas
✅ MEJOR: search_files(regex="function renderScene") → encuentras línea exacta, 5 líneas
```

### Antes de editar:
- Siempre lee el archivo con `read_file` (usando `start_line` si sabes el rango) para tener el contenido actual.
- Esto evita errores de `replace_in_file` por indentación/distintos saltos de línea.
- Si el `replace_in_file` falla, es porque el SEARCH no coincide exactamente. Vuelve a leer el archivo y copia exactamente el texto.

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

---

## 🔄 MANTENIMIENTO DE ESTE ARCHIVO (LEER OBLIGATORIO)

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