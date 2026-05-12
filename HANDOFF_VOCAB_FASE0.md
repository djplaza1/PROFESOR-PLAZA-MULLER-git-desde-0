# HANDOFF: FASE 0 — Expandir vocabulario de la Ruta de Aprendizaje

## ⚠ LÉEME PRIMERO

NO leas archivos al azar. Todo lo que necesitas saber está aquí. Trabaja DIRECTAMENTE sobre `src/features/ruta/rutaHelpers.jsx`, líneas 11-77 aproximadamente (la función `addLevel()` y los 18 `addLevel()` calls).

---

## ESTADO ACTUAL

- **18 niveles**: A1.1 → C1.2
- **1.857 palabras** en total distribuidas en `addLevel()`
- **Objetivo: 5.000+ palabras** (mínimo), ideal 6.000-8.000

### Distribución actual por nivel:

| Nivel | Palabras | Objetivo mínimo |
|-------|----------|-----------------|
| A1.1 | 164 | 300 |
| A1.2 | 123 | 250 |
| A1.3 | 102 | 250 |
| A1.4 | 92 | 250 |
| A2.1 | 84 | 300 |
| A2.2 | 84 | 300 |
| A2.3 | 96 | 300 |
| A2.4 | 85 | 300 |
| B1.1 | 117 | 350 |
| B1.2 | 85 | 350 |
| B1.3 | 87 | 350 |
| B1.4 | 89 | 350 |
| B2.1 | 95 | 350 |
| B2.2 | 97 | 350 |
| B2.3 | 95 | 350 |
| B2.4 | 92 | 350 |
| C1.1 | 91 | 400 |
| C1.2 | 179 | 400 |
| **Total** | **1.857** | **~5.900** |

---

## FORMATO EXACTO DE LAS PALABRAS

Cada palabra es un array de 5 elementos dentro de `addLevel('NIVEL', [ ... ])`:

```js
addLevel('A1.1', [
  ['Haus','casa','das','Häuser','n'],   // sustantivo con artículo y plural
  ['groß','grande','','','adj'],         // adjetivo (sin artículo, sin plural)
  ['schnell','rápido','','','adv'],      // adverbio
  ['sein','ser/estar','','','v'],        // verbo
  ['eins','uno','','','num'],            // número
  ['wo','dónde','','','adv'],            // interrogativo
  ['und','y','','','conj'],              // conjunción
  ['ich','yo','','','pron'],             // pronombre
]);
```

Estructura: `['alemán','traducción','artículo (o vacío)','plural (o vacío)','tipo']`

Tipos válidos: `n` (sustantivo), `v` (verbo), `adj` (adjetivo), `adv` (adverbio), `prep` (preposición), `conj` (conjunción), `pron` (pronombre), `num` (número), `interj` (interjección)

---

## ARCHIVO A MODIFICAR

**Único archivo:** `src/features/ruta/rutaHelpers.jsx`

- Lleva la palabra `addLevel` dentro del archivo: son las líneas donde se define el vocabulario
- NO toques `MULLER_RUTA_LEVELS` (son las lecciones, más abajo)
- NO toques `// FIN` ni nada después de esa línea
- NO borres palabras existentes, solo AÑADE nuevas

---

## FUENTES DE VOCABULARIO DISPONIBLES

### 1. `src/data/articulos.json` — 3.577 sustantivos con artículo
Formato: `[{"de": "der Tisch", "es": "mesa", "plural": "Tische"}]`
- El artículo está incluido en el campo `de` (ej: "der Tisch")
- Tiene campo `es` con traducción
- Tiene campo `plural`
- **Prioridad:** Úsalo para los niveles A1-B1 primero, los más complejos para B2-C1
- Para extraer: `JSON.parse(fs.readFileSync(...))` — es JSON válido

### 2. `src/data/verbos-db.json` — Base de datos de verbos
⚠ Este archivo está corrupto como JSON. Léelo como texto plano (`fs.readFileSync` con `utf8`) y extrae los verbos con regex: busca patrones como `'infinitiv':'...'`. Aprox. 200+ verbos.

### 3. `src/data/verbs-db.json` — Otra base de verbos (también corrupto)
Igual que el anterior. Léelo como texto plano.

### 4. `src/data/verbos_con_preposiciones.json` — Verbos con preposición fija
Útil para nivel B1+.

### 5. `src/data/b1-b2-database.json` — Vocabulario específico B1-B2
Formato: array de objetos con `{de, es, ...}`. Si es JSON válido, úsalo.

### 6. `src/data/preposiciones.json` — Preposiciones
Para niveles A2-B1.

### 7. `src/data/reise-mini.json` — Vocabulario de viajes
Temático, para A2-B1.

### 8. Contenido de maestros (9 archivos en `src/features/maestros/contenido/`)
Son archivos JSX con lecciones didácticas. NO los proceses con require, léelos como texto. Busca patrones de palabras alemanas con `traducción` o arrays `['de', 'es']`. Archivos:
- `contenidoA1_1.jsx` a `contenidoC1.jsx`

### 9. Otras fuentes (menos prioridad):
- `src/features/historia/data/defaultGuion.jsx` — vocabulario de historias (~500 palabras)
- `src/features/historia/data/tempusDict.jsx` — verbos conjugados (~200 verbos)
- `src/features/lectura/lecturaHelpers.jsx` — vocabulario de lecturas (~500 palabras)
- `src/features/entrenamiento/entrenamientoHelpers.jsx` — ejercicios (~300 palabras)
- `src/features/escritura/writing-data.jsx` — temas de escritura (~200 palabras)

---

## ESTRATEGIA RECOMENDADA

### Paso 1: Extraer vocabulario de articulos.json
El archivo más grande y valioso. 3.577 sustantivos. Asígnale un nivel basado en la palabra:
- Palabras básicas (casa, mesa, silla, agua, pan, etc.) → A1.1-A1.4
- Palabras cotidianas (trabajo, ciudad, transporte, etc.) → A2.1-A2.4
- Palabras abstractas/intermedias (opinión, sentimiento, etc.) → B1.1-B1.4
- Palabras complejas/técnicas → B2.1-C1.2

### Paso 2: Extraer verbos de verbos-db.json y verbs-db.json
Lee como texto plano, extrae con regex. Distribuye:
- Verbos básicos (kommen, gehen, essen, trinken...) → A1.1-A1.4
- Verbos modales + intermedios → A2.1-A2.4
- Verbos con preposición, reflexivos → B1.1-B2.4
- Verbos complejos → C1

### Paso 3: Generar palabras sintéticas para alcanzar el objetivo
Si después de las fuentes reales no llegas a 5.000, genera palabras sintéticas usando patrones CEFR:

**Para niveles bajos (A1-A2):**
- Sustantivos: temas de casa, familia, comida, escuela, ropa, colores, animales, tiempo
- Verbos: acciones cotidianas (aufstehen, anziehen, frühstücken, einkaufen, kochen, putzen...)
- Adjetivos: opuestos (groß/klein, lang/kurz, dick/dünn, jung/alt, teuer/billig...)
- Adverbios: tiempo, lugar, modo

**Para niveles intermedios (B1-B2):**
- Sustantivos abstractos: (die Meinung, die Erfahrung, die Entwicklung, die Beziehung...)
- Verbos con prefijo separable: (anfangen, aufhören, mitkommen, vorbereiten, zurückkommen...)
- Verbos reflexivos: (sich erinnern, sich freuen, sich ärgern, sich beeilen...)
- Adjetivos + preposición: (abhängig von, neugierig auf, verantwortlich für...)
- Conectores: (trotzdem, außerdem, allerdings, hingegen, dennoch...)

**Para niveles avanzados (C1):**
- Vocabulario académico: (die Analyse, die Hypothese, die Konsequenz, die Perspektive...)
- Verbos formales: (erläutern, erörtern, voraussetzen, gegenüberstellen...)
- Modismos y frases hechas

### Paso 4: Inyectar en rutaHelpers.jsx
Para cada nivel, lee el `addLevel()` existente y AÑADE las nuevas palabras al final del array, ANTES del `]);` de cierre.

### Paso 5: Verificar
```bash
node tools/contar_vocab_final.js
```
Debe mostrar 5.000+ palabras total.

---

## REGLAS CRÍTICAS

1. **NO borres palabras existentes** — solo añade al final de cada array
2. **NO dupliques palabras** — si una palabra ya existe en el mismo nivel, no la añadas otra vez. Si existe en otro nivel, tampoco la repitas (mejor distribuir único)
3. **NO toques MULLER_RUTA_LEVELS** — es la estructura de lecciones, no la toques
4. **NO toques nada después de `// FIN`** 
5. **NO uses require() para archivos JSX** — léelos como texto plano
6. **Mantén el formato exacto** — cada palabra es `['de','es','art','plural','tipo']` con comillas simples
7. **Las comas SON importantes** — cada array de palabra termina con `],`, el último elemento del addLevel NUNCA lleva coma después del `]`

---

## COMANDOS ÚTILES

```bash
# Contar palabras actuales
node tools/contar_vocab_final.js

# Ver líneas de addLevel en rutaHelpers.jsx
findstr /n "addLevel" src/features/ruta/rutaHelpers.jsx

# Leer un JSON
node -e "const d=JSON.parse(require('fs').readFileSync('src/data/articulos.json','utf8'));console.log(d.length,'items');console.log(d[0]);"

# Leer archivo corrupto como texto
node -e "const t=require('fs').readFileSync('src/data/verbos-db.json','utf8');console.log(t.substring(0,500));"
```

---

## OBJETIVO FINAL

`node tools/contar_vocab_final.js` debe mostrar:

```
A1.1: 300+ palabras
A1.2: 250+
A1.3: 250+
A1.4: 250+
A2.1: 300+
A2.2: 300+
A2.3: 300+
A2.4: 300+
B1.1: 350+
B1.2: 350+
B1.3: 350+
B1.4: 350+
B2.1: 350+
B2.2: 350+
B2.3: 350+
B2.4: 350+
C1.1: 400+
C1.2: 400+
TOTAL: 5000+
```

¡Adelante! Modifica directamente `src/features/ruta/rutaHelpers.jsx` añadiendo palabras a cada `addLevel()` hasta alcanzar el objetivo.