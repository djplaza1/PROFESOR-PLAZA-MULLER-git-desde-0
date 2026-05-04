# 🗺️ MAPA DE LA APLICACIÓN — PROFESOR PLAZA MÜLLER

> **Propósito**: Encontrar cualquier archivo/función sin leer el proyecto entero.
> **Cómo usar**: Localiza lo que necesitas en las tablas → `search_files(regex="...")` → `read_file(start_line=N, end_line=M)`. Coste ~80 líneas.

---

## 🚀 ENTRY POINT & CARGA

| Archivo | Rol | Líneas |
|---------|-----|--------|
| `index.html` | Entry point. Carga: Tailwind CDN → React 18 → Babel → Lucide → Supabase. Preboot splash (~680-764). Luego scripts: CORE → HOOKS → FEATURES → app.jsx | 797 |
| `sw.js` | Service Worker (caché PWA) | |
| `manifest.json` | Manifiesto PWA | |

**Orden exacto de carga de scripts** (index.html líneas 725-795):
1. **CORE**: constants → translate → detectaPalabra → storage → utils → cloud → auth → achievements → toast → speech → srs → bxHelpers
2. **HOOKS**: useLocalStorage
3. **FEATURES**: escritura (4 archivos: helpers, data, telc, panel) → lectura → entrenamiento → lexikon → progreso → comunidad → biblioteca → maestros → telc → splash → TopBar → BottomBar → ia → ajustes → pdfstudy → ruta → historia (9 submodos + panel)
4. **FIN**: app.jsx

---

## 🧠 CORE (src/core/) — Sin UI

| Archivo | Funciones clave |
|---------|----------------|
| `constants.jsx` | `M.KEYS` (localStorage), `M.MAIN_TABS` (13 tabs: inicio, historia, biblioteca, lexikon, telc, entrenamiento, comunidad, lectura, **escritura**, progreso, maestros, ia, ajustes), `M.SUBMODOS_HISTORIA` (9), `M.COLORS`, `M.TTS_RATES`, `M.UI_THEMES` |
| `translate.js` | `window.Muller.traslate(texto, lang)` — Google Translate + MyMemory fallback |
| `detectaPalabra.js` | `_buildIndex()`, `detect.local()`, `detect.word()` — búsqueda BD local + API externa |
| `storage.jsx` | `get()`, `set()`, `remove()`, `getSession()`, `setSession()`. **Contiene**: `MULLER_OCR_HIST_KEY`, `mullerPushOcrHistory()`, expone `window.Muller.ocr = { pushHistory }` |
| `utils.jsx` | **Contiene**: `levenshteinDistance(a, b)` para corrección ortográfica |
| `cloud.jsx` | `syncSrsToCloud()`, `pullSrsFromCloud()`, `syncSettingsToCloud()`, `pullSettingsFromCloud()`, `mergeBxLevel()` |
| `auth.jsx` | `window.Muller.Auth.login/register/logout/getActiveSession` — Supabase + PBKDF2 local offline |
| `achievements.jsx` | Logros del usuario |
| `toast.jsx` | `window.Muller.toast()` — notificaciones |
| `speech.jsx` | `window.Muller.speak(texto, rate?)` — TTS Web Speech API. **Contiene**: `sanitizeHistoriaText()` que elimina "Nombre:" antes de TTS |
| `srs.jsx` | Spaced Repetition System |
| `bxHelpers.jsx` | `normalizeBxPayload()`, `mergeBxDatabases()`, `mullerSortVocabBySrs()`, `mullerLoadExternalScript()` |
| `onboarding.jsx` | ⚠️ **NO CARGADO** en index.html (huérfano) |

---

## 📦 DATA (src/data/)

| Archivo | Contenido |
|---------|-----------|
| `b1-b2-database.json` | Vocabulario B1/B2 principal (JSON array) |
| `verbos-db.json` | Verbos con conjugaciones |
| `reise-mini.json` | Guion historia de viaje |
| `diccionario/index.js` | Carga Goethe Wortliste A1→C2. Expone: `window.Muller.Dict.palabras[]` (de, es, nivel, tipo, genero, plural), `Dict.verbos[]`, `Dict.prepVerbos[]` |

---

## 🪝 HOOKS (src/hooks/)

| Archivo | Qué hace |
|---------|----------|
| `useLocalStorage.jsx` | `useLocalStorage(key, defaultValue)` — persiste estado en localStorage |

---

## 🧩 FEATURES (src/features/) — Paneles UI

### 📍 NAVEGACIÓN
- `navigation/TopBar.jsx` — Barra superior con 8 tabs secundarias: Léxikon, Entrenamiento, Comunidad, **Lectura**, **Escritura**, Progreso, Maestros, IA. Logo + logout.
- `navigation/BottomBar.jsx` — Barra inferior con tabs principales. **⚠️ NO usa `<i data-lucide>` + `createIcons()`** — usa SVG inline con `dangerouslySetInnerHTML` y `BOTTOM_ICONS` para evitar error React #300.

### 📝 ESCRITURA — 8 modos de práctica de escritura en alemán

**Archivos** (4 en `src/features/escritura/`):

| Archivo | Rol | Líneas aprox |
|---------|-----|-------------|
| `writing-data.jsx` | Define arrays globales: `WRITING_COPY_DRILLS` (10 frases copia), `WRITING_PROMPTS_DE` (8 temas con traducción), `WRITING_DICTATION_LINES` (5 dictados), `LETTER_DRILLS` (3 ejercicios ÄÖÜß), `WRITING_TELC_TASKS` (4 tareas B1-B2 con scaffold y checklist) | ~100 |
| `telc-core.jsx` | `window.mullerBuildTelcWritingCoach(rawText, task, normalizeFn)` — evalúa texto TELC en 4 ejes: tarea (0-5), registro (0-5), cohesión (0-5), gramática (0-5). Total /20 → %. Genera sugerencias automáticas | ~55 |
| `escrituraHelpers.jsx` | `window.Muller.Escritura` con: `spelling` (LanguageTool API + DeepSeek fallback), `getDictationPool()` (combina fuentes: integrado, historia, guion, vocabulario), `rebuildGuionLines()` (reconstruye líneas de submodo activo) | ~120 |
| `EscrituraPanel.jsx` | Panel principal. **8 modos**: Libre (canvas dibujo), Copia (texto guía), Dictado (texto oculto con pistas), Tema (prompt + traducción), TELC (tarea examen + coach + ortografía), Letras DE (ÄÖÜß), Guion (líneas historia), Vocab (palabras SRS). Se registra como `window.Muller.Panels.escritura = EscrituraPanel` | ~390 |

**Modos en detalle**:
1. **Libre**: Canvas HTML5 con herramientas (lápiz, marcador, subrayado, goma), selector de colores (negro, azul, rojo, verde, gris), deshacer, cuadrícula opcional, botón OCR (Tesseract.js), guardar PNG, limpiar
2. **Copia**: Muestra frase de `WRITING_COPY_DRILLS` como guía caligráfica. Navegación anterior/siguiente con sonido (playCorrect/playIncorrect). Canvas para copiar
3. **Dictado**: Muestra traducción española. Botón "Mostrar pista" revela letras. Fuentes: integrado (5 frases), historia (frase actual oculta), guion (línea actual), vocabulario (pool diario)
4. **Tema**: Prompt en alemán con traducción. Navegación anterior/siguiente. Canvas para redactar
5. **TELC**: Tarea de examen con título, nivel, instrucciones, scaffold (plantilla), checklist. Canvas para escribir. Botón "Corregir con Coach TELC" + corrección ortográfica (LanguageTool/DeepSeek). Feedback visual con tabla de puntuación
6. **Letras DE**: Práctica de Ä, Ö, Ü, ß con ejemplos y canvas
7. **Guion**: Toma líneas del guion activo de Historia (vía `historiaGuionActual` global). Muestra línea actual con navegación. Canvas para escribir desde cero
8. **Vocab**: Toma palabras del SRS activo (vía `vocabSrsData` global). Muestra palabra con traducción. Canvas para practicar escritura

**Integración con core**:
- `storage.jsx`: `MULLER_OCR_HIST_KEY`, `mullerPushOcrHistory()`, `window.Muller.ocr.pushHistory`
- `utils.jsx`: `levenshteinDistance(a, b)` — usada para corrección ortográfica
- `speech.jsx`: `M.speakGermanWord()` para pronunciar palabras en modo Vocab
- `toast.jsx`: `M.Toast.show()` para notificaciones (reemplaza alert())
- `constants.jsx`: `OCR_HISTORY: 'muller_ocr_history_v1'` en M.KEYS

### 📖 HISTORIA — Panel principal + 9 submodos

**Panel**: `historia/HistoriaPanel.jsx` — Renderiza submodos. **Importante**: el botón "Ver traducción" NO traduce automáticamente, solo muestra la traducción que el usuario pegó al crear el guion. No hay integración Google Translate/DeepL en Historia.

**Data**:
- `historia/data/defaultGuion.jsx` — Guion por defecto
- `historia/data/oralB1Questions.jsx` — Preguntas orales B1
- `historia/data/tempusDict.jsx` — Diccionario tiempos verbales

**Helpers**:
- `historia/helpers/historiaHelpers.jsx` — Helpers específicos
- `historia/helpers/resaltador.jsx` — Resaltador de texto
- `historia/helpers/pausaVocabulario.jsx` — Gestión pausa vocabulario

**Submodos** (9):
| Archivo | Submodo |
|---------|---------|
| `Submodos/Fluestern.jsx` | Flüstern (susurro) |
| `Submodos/Ruido.jsx` | Ruido |
| `Submodos/Diktat.jsx` | Diktat (dictado) |
| `Submodos/Huecos.jsx` | Huecos (rellenar) |
| `Submodos/Articulos.jsx` | Artículos (der/die/das) |
| `Submodos/Declinar.jsx` | Declinar |
| `Submodos/Tempus.jsx` | Tempus (tiempos verbales) |
| `Submodos/Satzbau.jsx` | Satzbau (estructura oraciones) |
| `Submodos/Oido.jsx` | Oído (comprensión auditiva) |

### OTRAS FEATURES (cada una Panel.jsx + Helpers.jsx)

| Feature | Archivos | Rol |
|---------|----------|-----|
| `lexikon/` | `LexikonPanel.jsx` + `vocabSrsHelpers.jsx` | Visor vocabulario B1/B2 con SRS + búsqueda online |
| `lectura/` | `LecturaPanel.jsx` + helpers modulares (normalization, scoring, pronunciation, icons, tokenizer, useLectura, LecturaComponents) | Lector con herramientas |
| `entrenamiento/` | `EntrenamientoPanel.jsx` + `entrenamientoHelpers.jsx` + `ArticlePractice.jsx` + `CloudPractice.jsx` | Ejercicios |
| `progreso/` | `ProgresoPanel.jsx` + `progresoHelpers.jsx` | Estadísticas y progreso. **Versión premium**: PlazaMünzen, Heatmap de Actividad, Predicción TELC. Dashboard unificado vía `M.Progreso.getDashboardData()` con soporte para `M.progressExport.getDashboard()` (premium) + fallback antiguo |
| `comunidad/` | `ComunidadPanel.jsx` + `comunidadHelpers.jsx` | Comunidad / foro |
| `biblioteca/` | `BibliotecaPanel.jsx` + `bibliotecaHelpers.jsx` | Biblioteca recursos |
| `maestros/` | `MaestrosPanel.jsx` + `maestrosHelpers.jsx` | Maestros / profesores |
| `telc/` | `TelcPanel.jsx` (sin helpers propio) | Preparación TELC |
| `ia/` | `IAPanel.jsx` + `iaHelpers.jsx` | Panel IA |
| `ajustes/` | `AjustesPanel.jsx` + `ajustesHelpers.jsx` | Ajustes/configuración |
| `pdfstudy/` | `PdfstudyPanel.jsx` + `pdfstudyHelpers.jsx` | Estudio con PDFs (pdf.js + Tesseract.js) |
| `ruta/` | `RutaPanel.jsx` + `rutaHelpers.jsx` | Ruta de aprendizaje |
| `splash/` | `Splash.jsx` | Componente SplashScreen |

---

## ⚙️ APP PRINCIPAL (src/app.jsx)

```
App()
 ├── [!splashDone] → SplashScreen (window.Muller.SplashScreen)
 ├── [!session] → LoginScreen (login/register con Supabase Auth)
 └── [session] → Layout:
      ├── TopBar (window.Muller.TopBar)
      ├── PanelRouter (window.Muller.Panels[tab])
      └── BottomBar (window.Muller.BottomBar)
```

**PanelRouter**: `const Panel = (window.Muller.Panels || {})[tab]` → renderiza panel activo. Si no existe, muestra "X en desarrollo."

---

## 📋 REGISTRO DE PANELES

Cada feature registra su componente en `window.Muller.Panels['nombreTab'] = PanelComponent`. Tabs definidas en `M.MAIN_TABS`:
`['inicio','historia','biblioteca','lexikon','telc','entrenamiento','comunidad','lectura','escritura','progreso','maestros','ia','ajustes']`

---

## 🔍 PATRÓN DE BÚSQUEDA RÁPIDA

| Quiero... | Buscar en... | Regex/Comando |
|-----------|-------------|--------------|
| Modificar panel | `src/features/[nombre]/[Nombre]Panel.jsx` | `search_files(regex="function.*Panel")` |
| Añadir/quitar tabs | `src/core/constants.jsx` → `MAIN_TABS` | `search_files(regex="MAIN_TABS")` |
| Estilos globales | `index.html` bloque `<style>` (~líneas 44-130) | `read_file(start_line=44, end_line=130)` |
| Nuevo submodo historia | Crear en `Submodos/` + registrar en constants | `search_files(regex="SUBMODOS_HISTORIA")` |
| Auth | `src/core/auth.jsx` | `search_files(regex="window\.Muller\.Auth")` |
| SRS | `src/core/srs.jsx` + `bxHelpers.jsx` + `lexikon/vocabSrsHelpers.jsx` | `search_files(regex="srs\|SRS\|VocabSrs")` |
| Cloud sync | `src/core/cloud.jsx` | `search_files(regex="sync.*Cloud\|pull.*Cloud")` |
| Traducir | `src/core/translate.js` | `search_files(regex="Muller\.traslate")` |
| Detectar palabra | `src/core/detectaPalabra.js` | `search_files(regex="detect\.")`
| TTS / Voz | `src/core/speech.jsx` | `search_files(regex="Muller\.speak")` |
| Orden scripts | `index.html` líneas 725-795 | `read_file(start_line=725, end_line=795)` |
| Escritura data | `src/features/escritura/writing-data.jsx` | `search_files(regex="WRITING_COPY_DRILLS\|WRITING_TELC_TASKS")` |
| Coach TELC | `src/features/escritura/telc-core.jsx` | `search_files(regex="mullerBuildTelcWritingCoach")` |
| OCR History | `src/core/storage.jsx` | `search_files(regex="mullerPushOcrHistory\|MULLER_OCR_HIST_KEY")` |
| Levenshtein | `src/core/utils.jsx` | `search_files(regex="levenshteinDistance")` |
| BD local / JSON | `src/data/` | `list_files(path="src/data", recursive=true)` |
| localStorage keys | `src/core/constants.jsx` → `M.KEYS` | `search_files(regex="M\.KEYS")` |
| Registro paneles | Buscar `Panels\[` en features | `search_files(regex="Muller\.Panels\[")` |

---

## ⚠️ NOTAS IMPORTANTES

1. **`src/core/onboarding.jsx`** existe pero NO está cargado en index.html. Si se necesita, añadirlo al orden de carga.
2. **Namespace global**: `window.Muller.*` — no hay imports/exports. Los scripts se cargan en orden secuencial.
3. **Sin JSX**: Se usa `React.createElement(tag, props, ...children)`. Babel compila en navegador.
4. **Iconos (regla general)**: `<i data-lucide="iconName">` + `lucide.createIcons()`. **NO** usar `lucide.createElement()`.
5. **Iconos (excepción BottomBar)**: `BottomBar.jsx` usa SVG inline con `dangerouslySetInnerHTML` y constante `BOTTOM_ICONS`. **NO** usa `createIcons()` — esto previene el error React #300 (bucle infinito por `useEffect` sin dependencias).
6. **Iconos (excepción EscrituraPanel)**: EscrituraPanel.jsx también usa SVG inline en lugar de `createIcons()` para evitar error React #300. Los SVG están definidos en la función `getSvgIcon(name)` dentro del mismo archivo.
7. **Auth offline**: Si Supabase falla, `auth.jsx` usa PBKDF2 con localStorage.
8. **Orden de carga crítico**: core → hooks → features → app. Si un panel no aparece, revisar que esté en index.html.
9. **EscrituraPanel recibe `{ session }`**: La firma de props del panel es `({ session })` — NO `{ db, user, appState }`. El router pasa `session` desde app.jsx.