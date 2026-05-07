# HANDOFF: Pestaña RUTA de Aprendizaje (v2)

## ⚠️ LÉEME PRIMERO: Ahorro de tokens

**NO LEAS archivos al azar.** Todo lo que necesitas saber está aquí. Si necesitas ver un archivo específico, busca por la ruta exacta indicada abajo. No pierdas tiempo explorando.

---

## 🧠 ESTADO ACTUAL (commit: e57261d — 5/7/2026)

### ✅ YA ESTÁ HECHO (no lo repitas)
- **31 → 144 lecciones** generadas automáticamente con `tools/expandir_ruta.js`
- **Sintaxis corregida**: 18 comas faltantes en `exerciseA:'Der/Die/Das'` (choose-type lessons) arregladas — `rutaHelpers.jsx` YA tiene sintaxis válida ✅
- **HANDOFF actualizado** con plan de 6 fases
- **Versión incrementada** en `index.html`
- **Commit y push** realizados (último commit: `e57261d`)

### ❌ LO QUE FALTA (todo el resto)

- **1.449 palabras** para 18 niveles → unas **80 palabras/nivel** → ridículo para un C1
- **Sin contenido didáctico real** → solo ejercicios simples (test + frases)
- **Sin integración** con Maestros, SRS, logros, mapas visuales
- **Sin gamificación, sin audio, sin personalización**
- **Sin UI premium** (RutaPanel.jsx es básico)

### Objetivo final: Ruta PREMIUM funcional

---

## 📂 MAPA DE ARCHIVOS RELEVANTES (lo que necesitas)

### 🔵 NÚCLEO DE LA RUTA
| Archivo | Qué contiene | Para qué sirve |
|---------|-------------|----------------|
| `src/features/ruta/rutaHelpers.jsx` | `MULLER_RUTA_LEVELS` (144 lecciones) + `addLevel()` + `getLessonsForLevel()` + `getVocabularyForLevel()` + `renderExercise()` | **AQUÍ VIVE TODO** el vocabulario, niveles y lecciones |
| `src/features/ruta/RutaPanel.jsx` | Componente React que renderiza la pestaña Ruta | **HAY QUE REESCRIBIRLO** con mapa visual premium, progreso, estadísticas |
| `tools/expandir_ruta.js` | Script que usé para generar las 113 lecciones extra | **PUEDES REUSARLO** para expandir más si añades vocabulario |

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
| `src/features/maestros/maestrosHelpers.jsx` | - | Helper con `getMaestroLesson()`, `renderContenidoMaestro()`, funciones de renderizado didáctico |

**⚠️ IMPORTANTE:** Estos archivos de maestros tienen contenido didáctico REAL. La ruta debería **enlazar** a ellos, no duplicarlos. Cada lección de ruta puede tener un botón "Ver lección completa en Maestros" que navega al nivel correspondiente del panel Maestros.

### 🟡 FUENTES DE VOCABULARIO ADICIONAL
| Archivo | Qué tiene | Potencial |
|---------|-----------|-----------|
| `src/data/diccionario/index.js` | Diccionario completo DE-ES con cientos/miles de entradas | **+2.000-5.000 palabras** |
| `src/features/historia/data/defaultGuion.jsx` | Guiones de las historias con vocabulario | **+500 palabras** |
| `src/features/historia/data/tempusDict.jsx` | Verbos conjugados | **+200 verbos** |
| `src/features/historia/data/oralB1Questions.jsx` | Preguntas orales B1 | **+100 frases** |
| `src/features/lectura/lecturaHelpers.jsx` | Lecturas con vocabulario | **+500 palabras** |
| `src/features/entrenamiento/entrenamientoHelpers.jsx` | Ejercicios de entrenamiento | **+300 palabras** |
| `src/features/escritura/writing-data.jsx` | Temas de escritura TELC | **+200 palabras** |

### 🟠 SISTEMAS DE APOYO
| Archivo | Qué hace | Útil para |
|---------|----------|-----------|
| `src/core/srs.jsx` | Sistema de repaso espaciado (SRS) | Que el vocabulario de la ruta alimente el SRS |
| `src/core/achievements.jsx` | Logros (`unlockAchievement()`) | Gamificar la ruta |
| `src/core/storage.jsx` | Almacenamiento local (`setLocalData()`) | Guardar progreso |
| `src/core/constants.jsx` | Constantes globales, colores de niveles | Consistencia visual |
| `src/core/translate.js` | Traducciones | Textos en ES/DE |
| `src/core/speech.jsx` | Text-to-speech | Pronunciación de palabras |
| `src/features/navigation/TopBar.jsx` | Barra superior (tabs) | Navegación dentro de Ruta |
| `src/features/navigation/BottomBar.jsx` | Barra inferior | Navegación global |

### 🔴 COMPONENTES UI EXISTENTES REUTILIZABLES
| Archivo | Componente | Para qué sirve |
|---------|-----------|----------------|
| `src/features/maestros/ProgresionMaestros.jsx` | Barra de progreso visual | Reutilizar para mostrar progreso por nivel |
| `src/features/maestros/CompetenciaMaestros.jsx` | Tests de competencia | Reutilizar para test de nivel |
| `src/features/maestros/CompetenciaHelpers.jsx` | Helpers de test | Lógica de preguntas |
| `src/features/progreso/ProgresoPanel.jsx` | Dashboard de estadísticas | Inspiración para estadísticas de ruta |

---

## 📋 PLAN DE EJECUCIÓN (6 FASES)

### FASE 0: EXPANDIR VOCABULARIO MASIVAMENTE ⬅️ EMPIEZA AQUÍ

**Problema:** `addLevel()` en `rutaHelpers.jsx` solo tiene 1.449 palabras.
**Solución:** Extraer vocabulario de TODAS las fuentes listadas arriba.

**Pasos concretos:**
1. Leer `src/data/diccionario/index.js` → extraer array de palabras con nivel asociado (si tiene)
2. Leer los 9 archivos de `src/features/maestros/contenido/` → extraer palabras clave por nivel
3. Leer `src/features/historia/data/defaultGuion.jsx` → extraer vocabulario de historias
4. Leer `src/features/lectura/lecturaHelpers.jsx` → extraer vocabulario de lecturas
5. Ejecutar/modificar `tools/expandir_ruta.js` para:
   - Inyectar las nuevas palabras en `addLevel()` (o crear `addLevel_expanded()`)
   - Regenerar las lecciones con el vocabulario expandido
6. **Objetivo:** Mínimo **5.000 palabras**, ideal **8.000-10.000**

**⚠️ Si no llegas al objetivo:** Genera palabras sintéticas usando patrones:
- Sustantivos: `der/die/das + [tema] + [traducción]` (ej: der Schreibtisch, die Lampe)
- Verbos: `[verbo] (reg/irr) + [traducción]` (ej: zeichnen - dibujar)
- Adjetivos: `[adjetivo] + [opuesto] + [traducción]` (ej: groß/klein)
- Frases útiles: por nivel

### FASE 1: CONTENIDO DIDÁCTICO POR LECCIÓN

Cada lección en `MULLER_RUTA_LEVELS` debe tener:
```js
{
  id: 'a1-1-l1',
  title: 'Erste Kontakte',
  objetivo: 'Aprender a saludar y presentarte',
  icon: '👋',  // o usar lucide icons
  vocab: [/* 10-15 palabras del nivel */],
  gramatica: {
    explicacion: 'En alemán, los verbos regulares se conjugan...',
    ejemplos: ['Ich heiße María', 'Woher kommst du?']
  },
  ejercicios: [/* los que ya existen */],
  enlaceMaestro: { nivel: 'A1_1', leccion: 1 },  // ← opcional, navega a Maestros
  enlaceHistoria: { historiaId: 'h1' },            // ← opcional, navega a una lectura
  duracion: '15 min',
  puntosXP: 100
}
```

**Dónde injectar esto:** En `rutaHelpers.jsx`, dentro de `MULLER_RUTA_LEVELS`. Cada uno de los 144 objetos lección necesita estos campos.

**Para generar el contenido gramatical:**
- Usa los archivos de `src/features/maestros/contenido/` como inspiración
- Cada nivel de maestros tiene 4-6 lecciones temáticas
- Mapea: ruta-lección-n → maestro-lección-n (aproximadamente)
- Si no hay correspondencia exacta, usa el contenido del nivel más cercano

### FASE 2: MAPA DE RUTA VISUAL PREMIUM

Reescribe `RutaPanel.jsx` completamente. Estructura sugerida:

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
- Fondo oscuro con estrellas/partículas (como skill tree de JRPG)
- Cada nivel es un "planeta" o "estación" con su color (A1=verde, A2=azul, B1=púrpura, B2=naranja, C1=rojo)
- Lecciones completadas → brillo dorado
- Lección actual → pulso
- Lecciones bloqueadas → gris oscuro con candado

**CSS:** Usa las variables CSS de `index.html` (`--accent`, `--accent-alt`) para consistencia. Hay estilos como `.muller-glass-card` que puedes reutilizar.

### FASE 3: GAMIFICACIÓN + SRS + LOGROS

**Cuando el usuario completa una lección:**
1. Sumar XP → `storage.setLocalData('muller_ruta_xp', totalXP + leccion.puntosXP)`
2. Desbloquear logro si corresponde → `window.Muller?.Achievements?.unlockAchievement('ruta_a1_completo')`
3. Agregar palabras al SRS → `window.Muller?.SRS?.addWords(palabrasDeLaLeccion)`
4. Guardar progreso → `storage.setLocalData('muller_ruta_progreso', { nivelActual, leccionActual, leccionesCompletadas: [...] })`
5. Mostrar animación de celebración → confetti con canvas o emojis

**Logros a crear (en `src/core/achievements.jsx` si no existen):**
- `ruta_primer_paso` → 1ª lección
- `ruta_a1_maestro` → completar A1.1 y A1.2 (16 lecciones)
- `ruta_a2_maestro` → completar A2.1 y A2.2
- `ruta_b1_maestro` → completar B1.1 y B1.2
- `ruta_b2_maestro` → completar B2.1 y B2.2
- `ruta_c1_maestro` → completar C1
- `ruta_completada` → las 144 lecciones 🏆
- `ruta_100_palabras` → 100 palabras aprendidas vía SRS
- `ruta_1000_palabras` → 1.000 palabras
- `ruta_7_dias` → racha de 7 días
- `ruta_30_dias` → racha de 30 días

### FASE 4: TESTS DE NIVEL + PERSONALIZACIÓN

**Test de nivel inicial** (en `RutaPanel.jsx` o componente separado):
- 30 preguntas: 10 de vocabulario, 10 de gramática, 10 de comprensión
- Cada pregunta tiene 4 opciones
- Puntuación → nivel recomendado:
  - 0-5 → A1.1
  - 6-10 → A1.2
  - 11-14 → A2.1
  - 15-18 → A2.2
  - 19-22 → B1.1
  - 23-26 → B1.2
  - 27-28 → B2.1
  - 29 → B2.2
  - 30 → C1

**Personalización:**
- Botón "Ajustar nivel" en cada lección → sube/baja el nivel de dificultad
- Ritmo de estudio configurable:
  - Lento: 1 lección/día con recordatorio
  - Normal: 3 lecciones/día
  - Intensivo: 5+ lecciones/día
- Guardar preferencias → `storage.setLocalData('muller_ruta_prefs', { ritmo, nivelInicial, recordatorioActivo })`

### FASE 5: ESTADÍSTICAS Y DASHBOARD

Agregar al final de `RutaPanel.jsx` (o como pestaña):

```
📊 RUTA STATS
├── Progreso global: 32.6% (47/144 lecciones)
├── Niveles completados: 3/18
├── Vocabulario aprendido: 423 palabras
├── Rachas: 12 días 🔥
├── Tiempo total invertido: 8h 23m
├── XP total: 4.700
├── Logros desbloqueados: 5/11 🏆
├── Última lección: B1.1 - "Expresar opiniones" (hace 2h)
└── Próxima: B1.1 - Lección 2 (recomendado para mañana)
```

Usa `src/features/progreso/ProgresoPanel.jsx` como referencia de diseño.

---

## 🚨 COSAS CRÍTICAS QUE EVITAR

1. **NO dupliques contenido** → La ruta debe ENLAZAR a Maestros, no copiar su contenido
2. **NO rompas el SRS existente** → `src/core/srs.jsx` lo usa el Lexikon, agrega palabras pero no modifiques su estructura
3. **NO borres `MULLER_RUTA_LEVELS`** → solo AÑADE campos a cada objeto lección
4. **NO hardcodees rutas** → usa las funciones helper existentes: `getLessonsForLevel()`, `getVocabularyForLevel()`
5. **NO ignores el tema oscuro/claro/HC** → prueba siempre con `.dark`, `.light` y `.hc` en `index.html`
6. **NO pongas texto en alemán sin traducción** → usa el sistema de traducción `translate.js` o proporciona ES siempre

---

## 🚀 ORDEN DE EJECUCIÓN RECOMENDADO

```
SEMANA 1: FASE 0 (Expandir vocabulario) + FASE 1 (Contenido didáctico)
  → Resultado: 144 lecciones con 5.000+ palabras y mini-lecciones

SEMANA 2: FASE 2 (Mapa visual premium)
  → Resultado: RutaPanel.jsx con skill tree visual, animaciones, navegación fluida

SEMANA 3: FASE 3 (Gamificación + SRS + Logros)
  → Resultado: XP, rachas, logros, SRS integrado, animaciones de celebración

SEMANA 4: FASE 4 (Tests de nivel + Personalización)
  → Resultado: Test de nivel inicial, ritmo ajustable, recomendaciones

SEMANA 5: FASE 5 (Estadísticas + Dashboard + Pulido final)
  → Resultado: Dashboard completo, ajustes finos, pruebas en móvil/tablet
```

---

## 🔧 COMANDOS ÚTILES

```bash
# Verificar sintaxis del archivo rutaHelpers.jsx
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');console.log(c.split('\\n').length+' lines, '+Math.round(c.length/1024)+'KB')"

# Contar palabras en addLevel()
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('function addLevel');const e=c.indexOf('// FIN',s);const sec=c.substring(s,e);const words=sec.match(/'[^']+'/g)||[];console.log('Palabras en addLevel:',words.length/3)"

# Contar lecciones
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('MULLER_RUTA_LEVELS');const e=c.indexOf('R.IRRVERBS',s);const sec=c.substring(s,e);const lessons=(sec.match(/-l\\d+'/g)||[]).length;console.log('Lecciones:',lessons)"

# Contar niveles
node -e "const fs=require('fs');const c=fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');const s=c.indexOf('MULLER_RUTA_LEVELS');const e=c.indexOf('R.IRRVERBS',s);const sec=c.substring(s,e);const levels=sec.match(/id:'[a-z]\\d-\\d'/g)||[];console.log('Niveles:',levels.length)"

# Redeploy
git add -A && git commit -m "feat(ruta): descripcion del cambio"
git push origin main
# + cambiar comentario en index.html: <!-- redeploy YYYY-MM-DS-descripcion -->
```

---

## ✅ CHECKLIST FINAL (para saber cuándo está PREMIUM)

- [ ] 5.000+ palabras únicas en `addLevel()`
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

## 🏁 EMPIEZA POR FASE 0

**Primera acción concreta:** Lee `src/data/diccionario/index.js` y extrae todas las palabras únicas con su nivel asociado. Luego lee los 9 archivos de maestros y extrae vocabulario. Después modifica `addLevel()` en `rutaHelpers.jsx` para incluir todo ese vocabulario extraído. NO leas `rutaHelpers.jsx` completo (2.161 líneas), usa `search_files` para encontrar secciones específicas o lee solo `addLevel()` por líneas.