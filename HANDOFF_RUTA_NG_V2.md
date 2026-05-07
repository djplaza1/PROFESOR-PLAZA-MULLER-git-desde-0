# 🚀 HANDOFF — Continuar Ruta NG (leer completo antes de codificar)

## ⚠️ LÉEME PRIMERO

Este documento es PARA EL NUEVO AGENTE. Contiene bugs que arreglar + plan de expansión a 144 lecciones con DeepSeek. NO escribas código sin leer esto entero.

---

## 📋 RESUMEN (lo que YA funciona)

- Ruta NG: 18 niveles A1→C1, 8 tipos de ejercicio rotatorios (fill, choose, plural, translateDE, translateES, conjugate, order, correct)
- SRS SM-2 con intervalos (1,2,4,7,14,30,60 días), matriz de errores por palabra+tipo
- 2,718 palabras en `rutaHelpers.jsx`
- XP, monedas, streak, 9 rangos
- DeepSeek API ya integrada en `src/features/entrenamiento/deepSeekAi.jsx`
  - `window.Muller.DeepSeek.hasApiKey()` → bool
  - `window.Muller.DeepSeek.chat(messages, temperature?)` → `{ content, usage: { input, output } }`

---

## 🐛 BUGS A ARREGLAR (prioridad máxima, ANTES de DeepSeek)

### 🐛 BUG 1: Ejercicio "order" no funciona (NO DEJA HACER NADA)

**Archivo**: `src/features/ruta/rutaHelpers.jsx`, línea ~1216-1236

**Problema**: `example.includes(de)` busca el infinitivo literal dentro de la frase. Pero si la frase conjuga el verbo, `includes` devuelve `false`. Ejemplo: palabra = "gehen", frase = "Ich gehe heute." → "gehen" no está literalmente en "Ich gehe heute."

El fallback intenta regex con el stem, pero a veces falla y termina en `R.generateExercise(word, 'fill')` dejando al usuario sin ejercicio interactivo.

**Solución**:
```javascript
case 'order': {
  // Verificar si la palabra aparece literal o conjugada
  const stem = de.endsWith('en') ? de.slice(0,-2) : de;
  const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
  const wordAppears = wordRegex.test(example);
  if (!wordAppears) return R.generateExercise(word, 'fill');
  
  const words = example.split(' ');
  const shuffled = [...words].sort(()=>Math.random()-0.5);
  return { type, prompt: 'Ordena las palabras:', answer: example, words: shuffled, hint: `es: ${es}`, word };
}
```

---

### 🐛 BUG 2: Ejercicio "correct" mismo problema

**Archivo**: `src/features/ruta/rutaHelpers.jsx`, línea ~1237-1241

**Problema**: Mismo fallo: `example.includes(de)` falla con verbos conjugados.

**Solución**: Usar el mismo regex que en order:
```javascript
case 'correct': {
  const stem = de.endsWith('en') ? de.slice(0,-2) : de;
  const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
  const match = example.match(wordRegex);
  if (!match) return R.generateExercise(word, 'fill');
  const wrongExample = example.replace(match[0], match[0].split('').sort(()=>Math.random()-0.5).join(''));
  return { type, prompt: `Corrige: "${wrongExample}"`, answer: example, hint: `Palabra: ${de} (${es})`, word };
}
```

---

### 🐛 BUG 3: Ejercicio "fill" muestra frase sin blank

**Archivo**: `src/features/ruta/rutaHelpers.jsx`, línea ~1165-1168

**Problema**: `example.replace(de, blank)` falla si `de` es infinitivo pero la frase usa forma conjugada. El prompt sale sin blank → el usuario ve la frase completa sin nada que rellenar.

**Solución**:
```javascript
case 'fill': {
  const blank = '___';
  const stem = de.endsWith('en') ? de.slice(0,-2) : de;
  const wordRegex = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z]*\\b', 'i');
  const match = example.match(wordRegex);
  const prompt = match ? example.replace(match[0], blank) : example + ' ' + blank;
  return { type, prompt, answer: match ? match[0] : de, hint: `Traducción: ${es}`, word };
}
```

---

## 📚 FRASES DEMASIADO COMPLICADAS (deben corresponder al nivel)

### El problema

La función `generateExample()` (línea ~1054-1156) genera frases con estructuras gramaticales que NO corresponden al nivel real. Ejemplos:

| Nivel real | Lo que genera | Problema |
|------------|--------------|----------|
| A1 (lvl 1-2) | "Ich gehe gerne." ✅ | BIEN |
| A2 (lvl 3-4) | "Ich finde den Film interessant." ✅ | BIEN |
| B1 (lvl 5-8) | "Er hat gelernt, weil er lernt." ❌ | Frase sin sentido, solo filler |
| B1 (lvl 5-8) | "Kannst du mir dem Freund geben?" ❌ | Dativo mal usado sin contexto |
| B2 (lvl 9-12) | "Er arbeitet, weil er wenig Zeit hat." ❌ | Demasiado genérica, sin vocabulario real |
| C1 (lvl 13-18) | "Insofern spielt die Entwicklung eine entscheidende Rolle..." ❌ | Frase vacía sin contenido real |

### Solución: Frases REALES del contenido de Maestros

En `src/features/maestros/contenido/` hay archivos como `contenidoA1_1.jsx`, `contenidoA1_2.jsx`, etc. que contienen cientos de frases de ejemplo REALES. Cada archivo tiene una estructura como:

```javascript
window.Muller.Maestros.contenido.A1_1 = [
  {
    id: "a1_1_artikel",
    ejemplos: [
      "der Mann (el hombre)",
      "die Frau (la mujer)",
      "das Kind (el niño)",
      // ... muchas más
    ],
    ejercicioBase: {
      preguntas: [
        { tipo: "hueco", frase: "___ Mann (el hombre)", respuesta: "der" },
        { tipo: "opcion", frase: "Das Auto ist neu.", respuesta: "Das", opciones: ["Der","Die","Das"] },
        // ...
      ]
    }
  }
];
```

### Plan de integración de frases

**FASE 1**: Extraer TODAS las `frase` de los `ejercicioBase.preguntas` de maestros y meterlas como frases de ejemplo en Ruta.

**FASE 2**: En la función `R.generateExample()`, reemplazar la generación algorítmica por un lookup de frases reales según `(levelId, tipo)`.

**FASE 3**: Para los verbos, las frases de maestros no cubren todas las conjugaciones. Mantener la generación algorítmica SOLO para verbos y SOLO si no hay frase real disponible.

**Estructura de datos a crear** (dentro de rutaHelpers.jsx, al inicio del archivo):

```javascript
// Banco de frases ejemplo extraídas de Maestros
R.EXAMPLE_PHRASES = {
  'A1': {
    'n': [  // sustantivos
      "Das ist ein Hund.",
      "Der Tisch ist aus Holz.",
      "Die Lampe ist kaputt.",
      // ... más frases de contenidoA1_1, contenidoA1_2
    ],
    'v': [  // verbos
      "Ich heiße Juan.",
      "Er kommt aus Spanien.",
      "Wir wohnen in Berlin.",
      // ...
    ],
    'adj': [
      "Das Wetter ist schön.",
      "Der Film ist gut.",
      // ...
    ]
  },
  'A2': {
    'n': [ ... ],
    'v': [ ... ],
    'adj': [ ... ]
  },
  // ... B1, B2, C1
};
```

---

## 🎯 PLAN DE EXPANSIÓN: DE 31 A 144 LECCIONES CON DEEPSEEK

### Estado actual
- Ruta tiene 18 niveles, cada uno con 1-2 lecciones = **~31 lecciones**
- ~~2,718 palabras en vocabulario~~ **Pero muchas son palabras sin lección asignada**

### Objetivo: 144 lecciones (8 por nivel)

Distribución por nivel (solo para referencia del agente, NO hay que tocar `MULLER_RUTA_LEVELS` salvo para añadir lecciones):

| Nivel | Lecciones actuales | Objetivo | Nuevas |
|-------|-------------------|----------|--------|
| A1.1 | 2 | 8 | +6 |
| A1.2 | 2 | 8 | +6 |
| A2.1 | 2 | 8 | +6 |
| A2.2 | 2 | 8 | +6 |
| B1.1 | 2 | 8 | +6 |
| B1.2 | 2 | 8 | +6 |
| B2.1 | 2 | 8 | +6 |
| B2.2 | 2 | 8 | +6 |
| B2.3 | 1 | 8 | +7 |
| B2.4 | 1 | 8 | +7 |
| C1.1 | 1 | 8 | +7 |
| C1.2 | 1 | 8 | +7 |
| **Total** | **~20** | **~96** | **(faltan otras lecciones)** |

**NOTA**: Realmente hay más niveles (ver `PLAN_RUTA_NG.md` para la distribución exacta). Ajustar según la estructura real de `MULLER_RUTA_LEVELS`.

### Cómo usar DeepSeek para generar contenido

La función `window.Muller.DeepSeek.chat(messages, temperature)` ya existe y funciona.

**ESTRATEGIA**: NO llamar a DeepSeek desde el frontend en caliente. Hacerlo por lotes.

Crear un script/harness **independiente** (`tools/expandir_ruta.js`) que:

```javascript
// tools/expandir_ruta.js
// Ejecutar con: node tools/expandir_ruta.js

// 1. Cargar el vocabulario existente de rutaHelpers.jsx
// 2. Para cada nivel (A1.1, A1.2, ..., C1.2), detectar cuántas palabras existen
// 3. Llamar a DeepSeek para generar palabras FALTANTES + frases

const DEEPSEEK_PROMPT_TEMPLATE = `
Eres un profesor de alemán experto. Necesito generar vocabulario para el nivel {NIVEL} (MCER).

REGLAS:
- Solo palabras que correspondan al nivel {NIVEL} (mira el MCER, no inventes)
- Cada palabra debe incluir: [alemán, español, artículo(si es nombre), plural(si es nombre), tipo(v/n/adj/adv)]
- Ejemplos de tipos: v=verbo, n=sustantivo, adj=adjetivo, adv=adverbio, num=número, prep=preposición
- POR CADA PALABRA, genera 5 frases de ejemplo de DIFERENTE dificultad:
  - Frase 1: estructura simple (nivel {NIVEL})
  - Frase 2: estructura normal (nivel {NIVEL})
  - Frase 3: un poco más compleja
  - Frase 4: con conjunción
  - Frase 5: más elaborada

Devuelve SOLO JSON: [{de, es, art, plural, tipo, phrases:[{de, es}, ...]}, ...]

Genera 20 palabras para nivel {NIVEL} que NO estén en esta lista existente:
{LISTA_PALABRAS_EXISTENTES}

IMPORTANTE: Las frases deben ser NATURALES y tener SENTIDO. No frases random sin significado.
`;
```

### Después de generar, hay que INSERTAR en rutaHelpers.jsx

El script debe:
1. Leer `rutaHelpers.jsx` como texto
2. Localizar el bloque `MULLER_RUTA_LEVELS` (el array gigante con los niveles)
3. Añadir las nuevas lecciones al array correspondiente
4. Guardar el archivo

**ESTRUCTURA DE CADA LECCIÓN** (ejemplo actual):
```javascript
{ id:'a1-1-l1', title:'Saludos', topic:'saludos', rewardCoins:5, rewardXp:15,
  grammarTip:'"Guten Morgen" = Buenos días.',
  phrases:[{de:'Guten Morgen!',es:'¡Buenos días!'},{de:'Hallo!',es:'¡Hola!'}],
  exerciseType:'fill', exerciseQ:'___ Morgen!', exerciseA:'Guten'
}
```

Pero para 144 lecciones, usar la GENERACIÓN AUTOMÁTICA:
```javascript
{
  id:'a1-1-l6',
  title:'En la cocina',
  topic:'comida',
  rewardCoins:5,
  rewardXp:15,
  grammarTip:'"der Löffel" (cuchara), "die Gabel" (tenedor)',
  phrases: [
    {de:'Der Löffel liegt auf dem Tisch.', es:'La cuchara está en la mesa.'},
    {de:'Ich brauche einen Teller.', es:'Necesito un plato.'},
    // ... más frases generadas por DeepSeek
  ],
  exerciseType:'fill',
  exerciseQ:'Der ___ liegt auf dem Tisch.',
  exerciseA:'Löffel'
}
```

---

## 🧠 ROL Y COMPORTAMIENTO DEL AGENTE

Cuando abras el nuevo chat, usa este mensaje INICIAL:

```
Eres un ingeniero de software experto en React (sin bundlers, CDN + Babel standalone), alemán como lengua extranjera (DaF), y sistemas SRS (Spaced Repetition Systems). 

Vas a trabajar en una app llamada "Profesor Plaza Müller" que enseña alemán. El namespace global es window.Muller. Sin imports/exports. Sin bundlers.

Tu misión: Hacer la pestaña RUTA (Ruta de Aprendizaje) de calidad premium, mejor que Duolingo. Actualmente tiene ~31 lecciones con 2,718 palabras y 8 tipos de ejercicio rotatorios. Hay que expandir a 144 lecciones y arreglar bugs críticos.

ARCHIVOS CLAVE (solo tocarás estos):
- src/features/ruta/rutaHelpers.jsx (~1468 líneas) → vocabulario, SRS, generación ejercicios
- src/features/ruta/RutaPanel.jsx (~510 líneas) → UI del panel
- src/features/entrenamiento/deepSeekAi.jsx → API DeepSeek YA FUNCIONANDO

BUGS CONOCIDOS (prioridad máxima):
1. Ejercicio "order" y "correct" fallan con verbos conjugados (example.includes(de) busca infinitivo literal en frase conjugada)
2. Ejercicio "fill" muestra frase sin blank por el mismo motivo
3. Frases de ejemplo no corresponden al nivel real

PASOS EXACTOS:
1. NO escribas código todavía. Solo dime si has leído esto y entiendes los bugs.
2. Te diré cuándo empezar a codificar.
3. Cuando empieces, haz los arreglos UNO POR UNO, preguntándome antes de pasar al siguiente.
```

---

## 📐 HOW TO TEST

1. Abrir `index.html` en navegador
2. Ir a pestaña RUTA
3. Seleccionar nivel A1.1, lección 1
4. Hacer 10 ejercicios → deben rotar los 8 tipos
5. Verificar que "order" muestra palabras para ordenar
6. Verificar que "fill" tiene blank (___)
7. Verificar que las frases son sencillas en A1, más complejas en C1
8. Probar plural en sustantivos, conjugación en verbos

---

## ⚠️ REGLAS PARA NO ROMPER NADA

1. **NO** toques `index.html` a menos que añadas nuevos scripts
2. **NO** uses `&&` en cmd.exe (Windows no lo soporta). Comandos separados.
3. **SIEMPRE** usa `replace_in_file` para cambios localizados. NO reescribas archivos enteros.
4. Después de cambiar `rutaHelpers.jsx`, fuerza redeploy añadiendo `?v=N+1` en el script tag de `index.html`
5. Para DeepSeek: crea el script generador en `tools/expandir_ruta.js`, NO llames a DeepSeek desde el frontend directo
6. **NO** borres vocabulario existente. Solo AÑADE nuevas lecciones.
7. Las frases de DeepSeek deben tener SENTIDO REAL. Nada de "Der Hund geht ins Kino" sin sentido.

---

## 🗺️ VISIÓN FUTURA (más adelante)

- Podcast con preguntas de comprensión
- Modo historia (cuenta una situación, preguntas sobre ella)
- Cada lección con imagen/contexto
- Competencia contra otros usuarios (ya hay esqueleto en comunidadArena.jsx)
- SRS con EF (Ease Factor) dinámico real (no tabla fija)

---

## 📁 ESTRUCTURA DE NIVELES ACTUAL

Los niveles están en `window.MULLER_RUTA_LEVELS` dentro de `rutaHelpers.jsx`. 
Lista completa (18 niveles, ~31 lecciones):
- a1-1 (A1.1), a1-2 (A1.2)
- a2-1 (A2.1), a2-2 (A2.2)
- b1-1, b1-2, b1-3, b1-4 (B1.1-B1.4)
- b2-1, b2-2, b2-3, b2-4 (B2.1-B2.4)
- c1-1, c1-2 (C1.1-C1.2)

ID de nivel = `${nivel}-${subnivel}` (ej: 'a1-1', 'b2-3')
Cada nivel tiene `lessons[]` con lecciones.

Para añadir lecciones: añadir objetos dentro del `lessons[]` del nivel correspondiente.