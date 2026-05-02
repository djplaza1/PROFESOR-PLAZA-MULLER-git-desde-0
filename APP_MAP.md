# 🗺️ MAPA DE LA APLICACIÓN — PROFESOR PLAZA MÜLLER

> **Propósito**: Encontrar cualquier archivo/función sin leer el proyecto entero.
> **Cómo usar**: Localiza lo que necesitas en las tablas → `search_files(regex="...")` → `read_file(start_line=N, end_line=M)`. Coste ~80 líneas.

---

## 🚀 ENTRY POINT & CARGA

| Archivo | Rol | Líneas |
|---------|-----|--------|
| `index.html` | Entry point. Carga: Tailwind CDN → React 18 → Babel → Lucide → Supabase. Preboot splash (~680-764). Luego scripts: CORE → HOOKS → FEATURES → app.jsx | 860 |
| `sw.js` | Service Worker (caché PWA) | |
| `manifest.json` | Manifiesto PWA | |

**Orden exacto de carga de scripts** (index.html líneas 783-845):
1. **CORE**: constants → translate → detectaPalabra → storage → utils → cloud → auth → achievements → toast → speech → srs → bxHelpers
2. **HOOKS**: useLocalStorage
3. **FEATURES**: escritura → lectura → entrenamiento → lexikon → progreso → comunidad → biblioteca → maestros → telc → splash → TopBar → BottomBar → ia → ajustes → pdfstudy → ruta → historia (9 submodos + panel)
4. **FIN**: app.jsx

---

## 🧠 CORE (src/core/) — Sin UI

| Archivo | Funciones clave |
|---------|----------------|
| `constants.jsx` | `M.KEYS` (localStorage), `M.MAIN_TABS` (13 tabs), `M.SUBMODOS_HISTORIA` (9), `M.COLORS`, `M.TTS_RATES`, `M.UI_THEMES` |
| `translate.js` | `window.Muller.traslate(texto, lang)` — Google Translate + MyMemory fallback |
| `detectaPalabra.js` | `_buildIndex()`, `detect.local()`, `detect.word()` — búsqueda BD local + API externa |
| `storage.jsx` | `get()`, `set()`, `remove()`, `getSession()`, `setSession()` |
| `utils.jsx` | Utilidades varias |
| `cloud.jsx` | `syncSrsToCloud()`, `pullSrsFromCloud()`, `syncSettingsToCloud()`, `pullSettingsFromCloud()`, `mergeBxLevel()` |
| `auth.jsx` | `window.Muller.Auth.login/register/logout/getActiveSession` — Supabase + PBKDF2 local offline |
| `achievements.jsx` | Logros del usuario |
| `toast.jsx` | `window.Muller.toast()` — notificaciones |
| `speech.jsx` | `window.Muller.speak(texto, rate?)` — TTS Web Speech API |
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
- `navigation/TopBar.jsx` — Barra superior con tabs secundarias y acciones
- `navigation/BottomBar.jsx` — Barra inferior con tabs principales. **⚠️ NO usa `<i data-lucide>` + `createIcons()`** — usa SVG inline con `dangerouslySetInnerHTML` y `BOTTOM_ICONS` para evitar error React #300.

### 📖 HISTORIA — Panel principal + 9 submodos

**Panel**: `historia/HistoriaPanel.jsx` — Renderiza submodos.

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
| `lectura/` | `LecturaPanel.jsx` + `lecturaHelpers.jsx` | Lector con herramientas |
| `escritura/` | `EscrituraPanel.jsx` + `escrituraHelpers.jsx` | Práctica escritura (handwriting canvas) |
| `entrenamiento/` | `EntrenamientoPanel.jsx` + `entrenamientoHelpers.jsx` + `ArticlePractice.jsx` + `CloudPractice.jsx` | Ejercicios |
| `progreso/` | `ProgresoPanel.jsx` + `progresoHelpers.jsx` | Estadísticas y progreso |
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
| Orden scripts | `index.html` líneas 783-845 | `read_file(start_line=783, end_line=845)` |
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
5. **Auth offline**: Si Supabase falla, `auth.jsx` usa PBKDF2 con localStorage.
6. **Orden de carga crítico**: core → hooks → features → app. Si un panel no aparece, revisar que esté en index.html.