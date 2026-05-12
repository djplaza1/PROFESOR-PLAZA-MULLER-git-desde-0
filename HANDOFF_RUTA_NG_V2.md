# HANDOFF: Pestaña RUTA de Aprendizaje (v3)

## ⚠️ LÉEME PRIMERO: Ahorro de tokens

**NO LEAS archivos al azar.** Todo lo que necesitas saber está aquí. Si necesitas ver un archivo específico, busca por la ruta exacta indicada abajo. No pierdas tiempo explorando.

---

## 🧠 ESTADO ACTUAL (commit próximo — 5/8/2026)

### ✅ YA ESTÁ HECHO (no lo repitas)

#### FASE 0 COMPLETADA ✅ — 5.010 PALABRAS
- **1.449 → 5.010 palabras** en `addLevel()` dentro de `rutaHelpers.jsx`
- **Vocabulario extraído de TODAS las fuentes:**
  - `src/data/diccionario/index.js` — diccionario completo (3.577 sustantivos)
  - `src/features/maestros/contenido/*.jsx` — palabras clave por nivel (A1-C1)
  - `src/features/historia/data/defaultGuion.jsx` — vocabulario de historias
  - `src/features/lectura/lecturaHelpers.jsx` — vocabulario de lecturas
  - `src/features/entrenamiento/entrenamientoHelpers.jsx` — ejercicios
  - Generación sintética por temas (verbos, adjetivos, familia, cuerpo, colores, números, oficina, viajes, tecnología, clima, ciudad, salud, deportes, ropa, muebles, escuela, negocios, derecho, ciencia, adverbios, conjunciones, números ordinales, tiempo, preposiciones, naturaleza, animales, emociones, profesiones, comida)
- **Waves de expansión:** wave1-4 (original) + wave5 (445) + wave6 (339) + wave7 (326) + wave8 (371) + wave9 (368)
- **Scripts generados:** `tools/vocab_wave5.js` hasta `tools/vocab_wave9.js`
- **Sintaxis corregida**: 18 comas faltantes en `exerciseA:'Der/Die/Das'` (choose-type lessons) arregladas ✅
- **Bug fix: getOverallProgress** — error "Cannot read properties of undefined (reading 'length')" corregido ✅
- **Versión incrementada** en `index.html`
- **Commit y push** realizados ✅

### ❌ LO QUE FALTA (FASES 1-5)

- **FASE 1:** Enriquecer las 144 lecciones con contenido didáctico (objetivo, icono, gramática, enlaceMaestro)
- **FASE 2:** Reescribir RutaPanel.jsx con mapa visual premium tipo skill tree
- **FASE 3:** Gamificación + SRS + Logros (XP, rachas, animaciones)
- **FASE 4:** Tests de nivel + Personalización de ritmo
- **FASE 5:** Estadísticas y Dashboard final

### ⚠️ TAREA PENDIENTE IMPORTANTE: DeepSeek — generar 5 frases por palabra
En el futuro habrá que usar DeepSeek para generar **5 frases de ejemplo por cada palabra** del vocabulario de la ruta. Lee la sección "🧠 INSTRUCCIONES PARA DEEPSEEK (FRASES POR PALABRA)" al final de este documento.

---

## 📂 MAPA DE ARCHIVOS RELEVANTES

### 🔵 NÚCLEO DE LA RUTA
| Archivo | Qué contiene | Para qué sirve |
|---------|-------------|----------------|
| `src/features/ruta/rutaHelpers.jsx` | `MULLER_RUTA_LEVELS` (144 lecciones) + `addLevel()` + `getLessonsForLevel()` + `getVocabularyForLevel()` + `renderExercise()` | **AQUÍ VIVE TODO** el vocabulario (5.010 palabras), niveles y lecciones |
| `src/features/ruta/RutaPanel.jsx` | Componente React que renderiza la pestaña Ruta | **HAY QUE REESCRIBIRLO** con mapa visual premium, progreso, estadísticas |
| `tools/expandir_ruta.js` | Script original para generar lecciones | Referencia histórica |
| `tools/vocab_wave5.js` a `tools/vocab_wave9.js` | Scripts de inyección de vocabulario | Ya ejecutados, mantener por si hay que regenerar |

### 🟢 CONTENIDO DIDÁCTICO REAL (MAESTROS)
| Archivo | Nivel | Qué contiene |
|---------|-------|-------------|
| `src/features/maestros/contenido/contenidoA1_1.jsx` | A1.1 | Lecciones reales con gramática, ejemplos, ejercicios |
| `src/features/maestros/contenido/contenidoA1_2.jsx` | A1.2 | Igual |
| `src/features/maestros/contenido/contenidoA2_1.jsx` | A2.1 | Igual |
| `src/features/maestros/contenido/contenidoA2_2.jsx` | A2.2 | Igual |
| `src/features/maestros/contenido/contenidoB1_1.jsx` | B1.1 | Igual |
| `src/features/maestros/contenido/contenidoB1_2.jsx` | B1.2 | Igual |
| `src/features/maestros/contenido/contenidoB2_1.jsx` | B2.1 | Igual |
| `src/features/maestros/contenido/contenidoB2_2.jsx` | B2.2 | Igual |
| `src/features/maestros/contenido/contenidoC1.jsx` | C1 | Igual |
| `src/features/maestros/maestrosHelpers.jsx` | - | Helper con `getMaestroLesson()`, `renderContenidoMaestro()` |

**⚠️ IMPORTANTE:** Estos archivos tienen contenido didáctico REAL. La ruta debe **enlazar** a ellos, no duplicarlos.

### 🟡 FUENTES DE VOCABULARIO (ya extraído, no re-procesar)
| Archivo | Qué tiene |
|---------|-----------|
| `src/data/diccionario/index.js` | Diccionario completo DE-ES (ya extraído) |
| `src/features/historia/data/defaultGuion.jsx` | Guiones de historias (ya extraído) |
| `src/features/historia/data/tempusDict.jsx` | Verbos conjugados (ya extraído) |
| `src/features/lectura/lecturaHelpers.jsx` | Lecturas con vocabulario (ya extraído) |
| `src/features/entrenamiento/entrenamientoHelpers.jsx` | Ejercicios (ya extraído) |

### 🟠 SISTEMAS DE APOYO
| Archivo | Qué hace | Útil para |
|---------|----------|-----------|
| `src/core/srs.jsx` | Sistema de repaso espaciado (SRS) | Alimentar SRS con vocabulario de ruta |
| `src/core/achievements.jsx` | Logros (`unlockAchievement()`) | Gamificar la ruta |
| `src/core/storage.jsx` | Almacenamiento local | Guardar progreso |
| `src/core/constants.jsx` | Constantes globales, colores de niveles | Consistencia visual |
| `src/core/translate.js` | Traducciones | Textos en ES/DE |
| `src/core/speech.jsx` | Text-to-speech | Pronunciación |
| `src/features/navigation/TopBar.jsx` | Barra superior (tabs) | Navegación dentro de Ruta |
| `src/features/navigation/BottomBar.jsx` | Barra inferior | Navegación global |

### 🔴 COMPONENTES UI EXISTENTES REUTILIZABLES
| Archivo | Componente | Para qué sirve |
|---------|-----------|----------------|
| `src/features/maestros/ProgresionMaestros.jsx` | Barra de progreso visual | Reutilizar para progreso por nivel |
| `src/features/maestros/CompetenciaMaestros.jsx` | Tests de competencia | Reutilizar para test de nivel |
| `src/features/maestros/CompetenciaHelpers.jsx` | Helpers de test | Lógica de preguntas |
| `src/features/progreso/ProgresoPanel.jsx` | Dashboard de estadísticas | Inspiración para estadísticas |

---

## 📋 PLAN DE EJECUCIÓN (FASES RESTANTES 1-5)

### FASE 1: CONTENIDO DIDÁCTICO POR LECCIÓN

Cada lección en `MULLER_RUTA_LEVELS` (dentro de `rutaHelpers.jsx`) debe tener estos campos añadidos:

```js
{
  id: 'a1-1-l1',
  title: 'Erste Kontakte',
  objetivo: 'Aprender a saludar y presentarte',
  icon: '👋',
  vocab: [/* 10-15 palabras del nivel */],
  gramatica: {
    explicacion: 'En alemán, los verbos regulares se conjugan...',
    ejemplos: ['Ich heiße María', 'Woher kommst du?']
  },
  ejercicios: [/* los que ya existen - NO TOCAR */],
  enlaceMaestro: { nivel: 'A1_1', leccion: 1 },
  enlaceHistoria: { historiaId: 'h1' },
  duracion: '15 min',
  puntosXP: 100
}
```

**⚠️ PRIMERO: Verificar que el vocabulario existe realmente en cada nivel antes de asignarlo.**

Antes de asignar palabras a una lección, usa esta verificación:

```js
// Verificar que una palabra existe en addLevel() para el nivel dado
function palabraExisteEnNivel(palabra, nivel) {
  const contenido = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');
  // Buscar addLevel('NIVEL', [ ... ]) y ver si la palabra está dentro
  const regex = new RegExp(`addLevel\\('${nivel}',\\s*\\[([\\s\\S]*?)\\];`);
  const match = contenido.match(regex);
  if (!match) return false;
  return match[1].includes(`'${palabra}'`);
}
```

Para cada lección, coge las palabras del array de `getVocabularyForLevel(nivelId)` (que extrae de `addLevel()`). Así garantizas que la palabra existe. NO inventes palabras que no estén en `addLevel()`.

**Para generar contenido gramatical:**
- Usa `src/features/maestros/contenido/contenidoX.jsx` como inspiración
- Cada nivel de maestros tiene 4-6 lecciones temáticas
- Mapea: ruta-lección-n → aproximadamente → maestro-lección-n
- Si no hay correspondencia exacta, usa el contenido del nivel más cercano

**Dónde inyectar:** En `rutaHelpers.jsx`, dentro de `MULLER_RUTA_LEVELS`. Cada uno de los 144 objetos lección necesita estos campos. NO borres los campos existentes (`id`, `title`, `exercises`), solo AÑADE los nuevos.

### FASE 2: MAPA DE RUTA VISUAL PREMIUM

Reescribe `src/features/ruta/RutaPanel.jsx` completamente. Estructura:

```
<RutaPanel>
  ├── <RutaHeader>          → Título, progreso global, XP total
  ├── <RutaTestNivel />     → Si no tiene nivel asignado, mostrar test
  ├── <RutaMapa>           
  │   ├── <NivelNode>       → 18 nodos de nivel (colapsables/expandibles)
  │   │   ├── <LeccionCard> → 8 cards por nivel
  │   │   │   ├── Icono tipo (vocab/grammar/reading/audio)
  │   │   │   ├── Título
  │   │   │   ├── Estado (completed/in-progress/locked)
  │   │   │   └── Botón "Empezar" / "Continuar" / 🔒
  │   │   └── Línea conectora → siguiente lección
  │   └── Línea conectora → siguiente nivel
  └── <RutaEstadisticas>    → Dashboard de progreso
```

**Visual:**
- Fondo oscuro con estrellas/partículas (skill tree tipo JRPG)
- Cada nivel es un "planeta" o "estación" con color (A1=verde, A2=azul, B1=púrpura, B2=naranja, C1=rojo)
- Lecciones completadas → brillo dorado
- Lección actual → pulso
- Lecciones bloqueadas → gris oscuro con candado

**CSS:** Usa variables CSS de `index.html` (`--accent`, `--accent-alt`). Reutiliza `.muller-glass-card`.

**Funciones helper a usar (NO CAMBIAR):**
- `getLessonsForLevel(levelId)` → devuelve las lecciones de un nivel
- `getVocabularyForLevel(levelId)` → devuelve las palabras de un nivel
- `renderExercise(exercise, index, state, setState)` → renderiza ejercicios

### FASE 3: GAMIFICACIÓN + SRS + LOGROS

**Al completar una lección:**
1. `storage.setLocalData('muller_ruta_xp', totalXP + leccion.puntosXP)`
2. `window.Muller?.Achievements?.unlockAchievement('ruta_a1_completo')`
3. `window.Muller?.SRS?.addWords(palabrasDeLaLeccion)`
4. `storage.setLocalData('muller_ruta_progreso', { nivelActual, leccionActual, leccionesCompletadas: [...] })`
5. Animación de celebración (confetti canvas o emojis)

**Logros a crear en `src/core/achievements.jsx`:**
- `ruta_primer_paso` → 1ª lección
- `ruta_a1_maestro` → completar A1.1 + A1.2
- `ruta_a2_maestro` → completar A2.1 + A2.2
- `ruta_b1_maestro` → completar B1.1 + B1.2
- `ruta_b2_maestro` → completar B2.1 + B2.2
- `ruta_c1_maestro` → completar C1
- `ruta_completada` → 144 lecciones 🏆
- `ruta_100_palabras` → 100 palabras vía SRS
- `ruta_1000_palabras` → 1.000 palabras vía SRS
- `ruta_7_dias` → racha de 7 días
- `ruta_30_dias` → racha de 30 días

**⚠️ NO modificar `src/core/srs.jsx`** — solo llamar a sus funciones existentes.

### FASE 4: TESTS DE NIVEL + PERSONALIZACIÓN

**Test de nivel inicial** (en RutaPanel o componente separado):
- 30 preguntas: 10 vocabulario, 10 gramática, 10 comprensión
- 4 opciones cada una
- Puntuación → nivel:
  - 0-5 → A1.1 | 6-10 → A1.2 | 11-14 → A2.1 | 15-18 → A2.2
  - 19-22 → B1.1 | 23-26 → B1.2 | 27-28 → B2.1 | 29 → B2.2 | 30 → C1

**Personalización:**
- Botón "Ajustar nivel" por lección
- Ritmo: Lento (1/día), Normal (3/día), Intensivo (5+/día)
- Guardar en `storage.setLocalData('muller_ruta_prefs', { ritmo, nivelInicial, recordatorioActivo })`

### FASE 5: ESTADÍSTICAS Y DASHBOARD

```
📊 RUTA STATS
├── Progreso global: X% (X/144 lecciones)
├── Niveles completados: X/18
├── Vocabulario aprendido: X palabras
├── Rachas: X días 🔥
├── Tiempo total: Xh Xm
├── XP total: X
├── Logros: X/11 🏆
├── Última lección: ...
└── Próxima: ...
```

Usar `src/features/progreso/ProgresoPanel.jsx` como referencia.

---

## 🧠 INSTRUCCIONES PARA DEEPSEEK (FRASES POR PALABRA)

### Tarea
Para CADA palabra del vocabulario de la ruta (~5.010 palabras), generar **5 frases de ejemplo** en alemán con su traducción al español.

### Formato de salida esperado
Las frases deben guardarse en una estructura que la ruta pueda leer. Opción recomendada: crear `src/features/ruta/rutaFrases.jsx` con este formato:

```js
export const RUTA_FRASES = {
  'dieEins': [
    { de: 'Die Eins ist eine kleine Zahl.', es: 'El uno es un número pequeño.' },
    { de: 'Ich habe nur eine Eins in Mathe.', es: 'Tengo solo un uno en matemáticas.' },
    { de: 'Die Eins steht auf dem Blatt.', es: 'El uno está en la hoja.' },
    { de: 'Er hat die Eins gewürfelt.', es: 'Él ha sacado el uno.' },
    { de: 'Die Eins kommt vor der Zwei.', es: 'El uno viene antes del dos.' },
  ],
  'derMann': [
    { de: 'Der Mann geht zur Arbeit.', es: 'El hombre va al trabajo.' },
    { de: 'Dieser Mann ist sehr freundlich.', es: 'Este hombre es muy amable.' },
    // ...
  ],
  // ... 5.010 entradas × 5 frases = ~25.050 frases
};
```

### CÓMO debe generar DeepSeek (para evitar bloqueos)

**⚠️ IMPORTANTE: NO hacer bloques masivos de una sola vez.**

DeepSeek se bloquea con arrays enormes. Hay que hacerlo en **lotes pequeños**:

1. **Dividir en tandas de 50 palabras cada una** (250 frases por tanda, ~15-20KB de código)
2. **Cada tanda se inyecta en el archivo por separado**
3. **Entre tanda y tanda, hacer un pequeño delay** (setTimeout de 2-3 segundos en el script)
4. **Pausa de 30 segundos cada 5 tandas** para no saturar

**Script recomendado:**

```js
// tools/generar_frases.js
// 1. Lee 'src/features/ruta/rutaHelpers.jsx'
// 2. Extrae TODAS las palabras de addLevel() con su nivel
// 3. Las divide en tandas de 50
// 4. Para cada tanda llama a DeepSeek (o al endpoint que uses)
// 5. DeepSeek recibe: ["dieEins","derMann","dieFrau",...] y su nivel asociado
// 6. DeepSeek devuelve: { dieEins: [{de,es},{de,es},...], ... }
// 7. Se inyecta en 'src/features/ruta/rutaFrases.jsx'
// 8. Esperar delay entre tandas
```

**Prompt para DeepSeek (cada tanda):**

```
Genera 5 frases de ejemplo en alemán para CADA una de estas palabras. 
Las frases deben ser NATURALES y VARIADAS (no repetir estructura).
Cada frase debe tener su traducción al español.
Las frases deben corresponder al nivel CEFR indicado.
NO uses la palabra en la misma posición siempre (a veces al principio, a veces al final).
NO uses las mismas palabras auxiliares en todas las frases.

Palabras:
- dieEins (A1) - número uno
- derMann (A1) - hombre
- ...

Formato JSON:
{
  "dieEins": [
    {"de": "Die Eins ist eine kleine Zahl.", "es": "El uno es un número pequeño."},
    ...
  ],
  ...
}
```

### Integración en la UI de ruta
Cuando el usuario hace clic en una palabra dentro de una lección de ruta, se muestran sus 5 frases:
- Las frases se renderizan con un diseño tipo tarjetas
- Cada tarjeta tiene: FRASE EN ALEMÁN (negrita) + traducción en español (debajo, más pequeño y gris)
- Botón de audio (TTS) junto a cada frase alemana
- Las frases se filtran por nivel para que coincidan con el nivel actual de la lección

**Archivo donde integrar:** `rutaHelpers.jsx`, nueva función `renderFrasesParaPalabra(palabraId)` que busca en `RUTA_FRASES` y renderiza las tarjetas.

---

## 🚨 COSAS CRÍTICAS QUE EVITAR

1. **NO dupliques contenido** → La ruta debe ENLAZAR a Maestros, no copiar su contenido
2. **NO rompas el SRS existente** → `src/core/srs.jsx` lo usa el Lexikon, solo llama a sus funciones
3. **NO borres `MULLER_RUTA_LEVELS`** → solo AÑADE campos a cada objeto lección
4. **NO hardcodees rutas** → usa las funciones helper existentes
5. **NO ignores tema oscuro/claro/HC** → probar con `.dark`, `.light`, `.hc`
6. **NO pongas alemán sin traducción** → usa `translate.js` o ES siempre
7. **NO asignes palabras a lecciones sin verificar que existen en addLevel()** → usar `getVocabularyForLevel()` para obtener lista real

---

## 🚀 ORDEN DE EJECUCIÓN RECOMENDADO

```
DÍA 1:   FASE 1 — Contenido didáctico en 144 lecciones + verificación de vocabulario
DÍA 2:   FASE 2 — Reescribir RutaPanel.jsx con skill tree visual
DÍA 3:   FASE 3 — Gamificación + SRS + Logros
DÍA 4:   FASE 4 — Test de nivel + Personalización
DÍA 5:   FASE 5 — Estadísticas + Dashboard + pulido final
DÍA 6+:  DeepSeek — Generar 5 frases × 5.010 palabras (~25.050 frases en tandas de 50)
```

---

## 🔧 COMANDOS ÚTILES

```bash
# Verificar sintaxis
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');console.log(c.split('\\n').length+' lines, '+Math.round(c.length/1024)+'KB')"

# Contar palabras en addLevel()
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('function addLevel');const e=c.indexOf('// FIN',s);const sec=c.substring(s,e);const words=sec.match(/'[^']+'/g)||[];console.log('Palabras en addLevel:',words.length/3)"

# Contar lecciones
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('MULLER_RUTA_LEVELS');const e=c.indexOf('R.IRRVERBS',s);const sec=c.substring(s,e);const lessons=(sec.match(/-l\\d+'/g)||[]).length;console.log('Lecciones:',lessons)"

# Contar niveles
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('MULLER_RUTA_LEVELS');const e=c.indexOf('R.IRRVERBS',s);const sec=c.substring(s,e);const levels=sec.match(/id:'[a-z]\\d-\\d'/g)||[];console.log('Niveles:',levels.length)"

# Verificar que una palabra existe en addLevel() para un nivel concreto
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const p='dieKatze';const l='A2.3';const r=new RegExp(\"addLevel\\('\"+l+\"',\\\\s*\\\\[([\\\\s\\\\S]*?)\\\\];\");const m=c.match(r);console.log(m?m[1].includes(\"'\"+p+\"'\"):'Nivel no encontrado')"

# Verificar balance de paréntesis/llaves
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const o=(c.match(/{/g)||[]).length;const cl=(c.match(/}/g)||[]).length;const p=(c.match(/\(/g)||[]).length;const cp=(c.match(/\)/g)||[]).length;console.log('{}: '+o+'/'+cl+', (): '+p+'/'+cp+', OK:'+(o===cl&&p===cp))"

# COMMIT (usar cmd.exe, cada comando por separado)
# Terminal 1:
git add .
# Terminal 2:
git commit -m "feat(ruta): FASE 0 completada — 5.010 palabras en addLevel()"
# Terminal 3:
git push --set-upstream origin main
# (si ya tiene upstream, solo: git push)
```

---

## ✅ CHECKLIST FINAL (para saber cuándo está PREMIUM)

- [x] **5.000+ palabras únicas en `addLevel()`** ✅ (5.010)
- [ ] 144 lecciones con objetivo, gramática, ejercicios, y enlace a Maestros
- [ ] Mapa visual tipo skill tree con animaciones y colores por nivel
- [ ] Cada lección: icono representativo, duración estimada, XP
- [ ] Test de nivel inicial funcional
- [ ] SRS integrado (palabras de ruta → repaso espaciado)
- [ ] XP y logros funcionando
- [ ] Rachas diarias
- [ ] Estadísticas de progreso (dashboard)
- [ ] Personalización de ritmo
- [ ] Responsive: funciona en móvil (400px) y desktop (1920px)
- [ ] Tema oscuro/claro/HC compatible
- [ ] Sin errores en consola
- [ ] Carga rápida (<500ms para mostrar la ruta)
- [ ] Animaciones suaves (no bloquean UI)

---

## 🏁 EMPIEZA POR FASE 1

**Primera acción concreta:** NO leas `rutaHelpers.jsx` completo (es enorme). Busca `MULLER_RUTA_LEVELS` y lee solo las primeras lecciones para ver su estructura actual. Luego, para cada nivel, usa `getVocabularyForLevel(levelId)` para obtener las palabras reales disponibles, y enriquecer cada objeto lección con: `objetivo`, `icon`, `gramatica`, `enlaceMaestro`, `duracion`, `puntosXP`. NO inventes palabras — usa solo las que devuelve `getVocabularyForLevel()`.

Antes de terminar cada fase, verifica:
1. Que la app carga sin errores (abrir `index.html` localmente)
2. Que los estilos se ven bien en modo oscuro y claro
3. Que haces commit con `git add .` + `git commit -m "feat(ruta): descripción"` + `git push --set-upstream origin main`