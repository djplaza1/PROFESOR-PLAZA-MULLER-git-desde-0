# 🚀 HANDOFF PARA NUEVO AGENTE — EXPANSIÓN A 144 LECCIONES

## ⚠️ PRIMERO LEE ESTO

Este documento asume que ERES UN AGENTE NUEVO. No has visto nada del código anterior.
Te explico TODO lo que necesitas saber para continuar desde aquí.

---

## ✅ LO QUE YA ESTÁ HECHO (NO LO TOQUES)

- **3 bugs corregidos** en `rutaHelpers.jsx` (~líneas 1165-1241):
  - `fill`: ya busca el verbo con regex (stem + conjugación), no con `example.includes(de)` literal
  - `order`: mismo fix, regex en vez de `includes`
  - `correct`: mismo fix, regex en vez de `includes`
- **`EXAMPLE_PHRASES`** creado: banco de frases reales extraídas de Maestros + frases manuales de calidad (~100 frases por nivel A1-C1)
- **`loadExamplePhrases()`** creado: escanea `window.Muller.Maestros.contenido` y extrae frases de ejercicios y flashcards
- **`generateExample()`** mejorado: usa `EXAMPLE_PHRASES` por nivel y tipo de palabra (n, v, adj, adv) antes de caer en generación algorítmica. Frases con sentido real, no filler.
- **8 tipos de ejercicio rotatorios**: fill, choose, plural, translateDE, translateES, conjugate, order, correct
- **SRS SM-2 funcional**: intervalos 1,2,4,7,14,30,60 días, matriz de errores por palabra+tipo
- **DeepSeek API**: `window.Muller.DeepSeek.chat(messages, temperature)` → `{ content, usage }`
- **49 lecciones actuales** en `MULLER_RUTA_LEVELS` (distribuidas en ~18 niveles de A1.1 a C1.2)

---

## 🎯 TU MISIÓN: EXPANDIR DE 49 A 144 LECCIONES

### 📊 Distribución objetivo

| Nivel ID | Nombre | Lecciones actuales | Objetivo (8) | Faltan |
|----------|--------|-------------------|-------------|--------|
| a1-1 | A1.1 | 2 | 8 | +6 |
| a1-2 | A1.2 | 2 | 8 | +6 |
| a2-1 | A2.1 | 2 | 8 | +6 |
| a2-2 | A2.2 | 2 | 8 | +6 |
| b1-1 | B1.1 | 4 | 8 | +4 |
| b1-2 | B1.2 | 4 | 8 | +4 |
| b1-3 | B1.3 | 4 | 8 | +4 |
| b1-4 | B1.4 | 4 | 8 | +4 |
| b2-1 | B2.1 | 4 | 8 | +4 |
| b2-2 | B2.2 | 4 | 8 | +4 |
| b2-3 | B2.3 | 4 | 8 | +4 |
| b2-4 | B2.4 | 4 | 8 | +4 |
| c1-1 | C1.1 | 4 | 8 | +4 |
| c1-2 | C1.2 | 4 | 8 | +4 |
| | **Total** | **~49** | **~112** | **~95** |

### 🔧 Archivo a modificar

**SOLO** `src/features/ruta/rutaHelpers.jsx`

Dentro de ese archivo, `MULLER_RUTA_LEVELS` es un array de objetos nivel. Cada nivel tiene:
```javascript
{
  id: 'a1-1',
  title: 'A1.1',
  lessons: [ ... ]  // ← AQUÍ AÑADES LECCIONES
}
```

### 📐 Estructura de cada lección

```javascript
{
  id: 'a1-1-l3',
  title: 'En la cocina',
  topic: 'comida',
  rewardCoins: 5,
  rewardXp: 15,
  grammarTip: '"der Löffel" (cuchara), "die Gabel" (tenedor)',
  phrases: [
    {de: 'Der Löffel liegt auf dem Tisch.', es: 'La cuchara está en la mesa.'},
    {de: 'Ich brauche einen Teller.', es: 'Necesito un plato.'},
    {de: 'Die Tasse ist auf dem Tisch.', es: 'La taza está en la mesa.'},
    {de: 'Die Gabel liegt neben dem Messer.', es: 'El tenedor está al lado del cuchillo.'},
    {de: 'Wir essen mit dem Löffel.', es: 'Comemos con la cuchara.'}
  ],
  exerciseType: 'fill',
  exerciseQ: 'Der ___ liegt auf dem Tisch.',
  exerciseA: 'Löffel'
}
```

**REGLAS para las lecciones nuevas:**
1. `id` debe ser único: `{nivel}-l{N}` donde N empieza desde el siguiente disponible
2. `topic` debe ser un tema concreto y útil (no genérico)
3. `phrases` deben tener SENTIDO REAL, ser naturales, no frases random
4. `exerciseType` debe coincidir con la palabra que se pide en `exerciseQ`/`exerciseA`
5. Las frases de `phrases` deben corresponder al NIVEL (A1 simple, B1 con Nebensätze, C1 con lenguaje formal)

---

## 🤖 ESTRATEGIA: DeepSeek para generar contenido

### CÓMO USAR DeepSeek (YA FUNCIONA)

```javascript
// Esto ya existe, solo hay que llamarlo
const result = window.Muller.DeepSeek.chat([
  { role: 'system', content: 'Eres un profesor de alemán experto...' },
  { role: 'user', content: 'Genera 20 palabras para nivel A1.1...' }
], 0.7);
// result.content contiene la respuesta
```

### PASO A PASO

1. **Abrir el navegador** en `index.html` (o la URL desplegada)
2. **Abrir la consola** (F12)
3. **NO toques el frontend para esto**. Usa la consola para:

```javascript
// 1. Cargar el vocabulario disponible para cada nivel
const levels = window.MULLER_RUTA_LEVELS;
levels.forEach(l => {
  const words = window.Muller.Ruta.getLevelWords(l.id);
  console.log(l.id, '→ palabras:', words.length, 'lecciones:', l.lessons.length);
});

// 2. Llamar a DeepSeek para generar nuevas palabras + frases
const prompt = `Eres un profesor de alemán. Genera 20 palabras de nivel A1.1 (MCER) 
que NO estén en esta lista: [LISTA_PALABRAS]. 
Cada palabra debe tener: alemán, español, artículo(si nombre), plural(si nombre), tipo(v/n/adj/adv).
Además, para cada palabra genera 3 frases de ejemplo REALES con sentido.

Formato JSON:
[{de, es, art, plural, tipo, phrases:[{de, es}]}]`;

const result = await window.Muller.DeepSeek.chat([{role:'user', content: prompt}], 0.7);
const nuevasPalabras = JSON.parse(result.content);
console.log(nuevasPalabras);
```

### Script recomendado para generar lecciones completas

Crea un archivo `tools/expandir_ruta.js` que haga TODO el proceso automatizado:

```javascript
// tools/expandir_ruta.js
// 1. Lee rutaHelpers.jsx
// 2. Para cada nivel, llama a DeepSeek (si hay API key configurada)
// 3. Genera las palabras faltantes
// 4. Genera las lecciones (estructura completa con phrases, exerciseQ, exerciseA)
// 5. Añade las lecciones al MULLER_RUTA_LEVELS
// 6. Guarda el archivo modificado

// Para ejecutar: node tools/expandir_ruta.js
```

**PERO OJO**: DeepSeek necesita API key. Si no hay, genera el contenido MANUALMENTE o con un enfoque híbrido:
- Usa vocabulario ya existente en `rutaHelpers.jsx` (hay 2,718 palabras)
- Asigna palabras sin lección a nuevas lecciones
- Genera frases manuales apropiadas al nivel

---

## 🧪 CÓMO PROBAR

1. Abre `index.html` en navegador
2. Pestaña RUTA
3. Selecciona cada nivel y cada lección nueva
4. Haz 10 ejercicios → deben rotar entre los 8 tipos
5. Verifica que:
   - `fill` tenga blank (`___`) visible
   - `order` muestre palabras desordenadas para ordenar
   - `correct` muestre frase con error para corregir
   - `translateDE` / `translateES` muestren traducción correcta
   - Las frases tengan sentido y correspondan al nivel

---

## 🚫 REGLAS PARA NO ROMPER

1. **NO** toques `index.html` a menos que añadas nuevos scripts (solo version bump: `?v=N+1`)
2. **NO** reescribas archivos enteros con `write_to_file`. Usa `replace_in_file` para cirugía localizada
3. **NO** borres vocabulario existente. Solo AÑADE.
4. **SIEMPRE** incrementa el `?v=` en index.html después de cambios en rutaHelpers.jsx
5. **NO** llames a DeepSeek desde el frontend en caliente (en bucle). Hazlo por lotes una vez.
6. Después de cambios, haz `git add . && git commit -m "..." && git push` para desplegar

---

## 📁 ARCHIVOS RELEVANTES (solo lectura, no toques)

| Archivo | Propósito | Tocar? |
|---------|-----------|--------|
| `src/features/ruta/rutaHelpers.jsx` | Vocabulario, SRS, niveles, lecciones, generación ejercicios | ✅ SÍ (añadir lecciones) |
| `src/features/ruta/RutaPanel.jsx` | UI del panel Ruta | ❌ NO |
| `src/features/entrenamiento/deepSeekAi.jsx` | API DeepSeek | ❌ NO (ya funciona) |
| `src/features/maestros/contenido/*.jsx` | Contenido de Maestros (fuente de frases) | ❌ NO |
| `index.html` | Entry point | ✅ SÓLO version bump |
| `tools/expandir_ruta.js` | Script generador (CREAR) | ✅ CREAR |

---

## 🗺️ VISIÓN FUTURA (para más adelante, no ahora)

- Podcast con preguntas de comprensión
- Modo historia (cuenta una situación, preguntas sobre ella)
- Cada lección con imagen/contexto
- Competencia contra otros usuarios
- SRS con EF (Ease Factor) dinámico real