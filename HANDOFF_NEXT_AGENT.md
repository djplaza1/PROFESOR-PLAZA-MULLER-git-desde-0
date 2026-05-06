# HANDOFF — Continuar implementación RUTA NG

## ⚠️ LÉEME PRIMERO

El usuario abrirá un **nuevo chat** y quiere que tú (el nuevo agente) continúes sin que él tenga que explicar nada. Este documento es tu reemplazo de contexto. NO leas SUPER_RESUMEN_CHAT.md ni APP_MAP.md, ya está todo aquí.

---

## 🧠 Contexto mínimo necesario

### ¿Qué es esto?
App React 18 (CDN + Babel standalone + Tailwind CSS CDN) para aprender alemán. Namespace global `window.Muller`. Sin bundlers. Sin imports/exports. GitHub Pages en `main`.

### ¿Qué ha pasado hasta ahora?
- RutaHelpers: 2,718 palabras en 18 niveles A1→C1, 8 tipos de ejercicio (fill, choose, plural, translateDE, translateES, conjugate, order, correct), SRS SM-2 con intervalos (1,2,4,7,14,30,60 días), matriz de errores por palabra+tipo, streak, XP, monedas, 9 rangos.
- RutaPanel: UI con mapa de niveles (grid 3×6), progreso por lección, debilidades visibles, 8 tipos de ejercicio implementados.
- **Problema actual**: Solo muestra traducciones DE↔ES constantemente. No varía los tipos de ejercicio automáticamente.

### DeepSeek API
Ya integrada en `src/features/entrenamiento/deepSeekAi.jsx`. Funciones:
- `window.Muller.DeepSeek.hasApiKey()` → bool
- `window.Muller.DeepSeek.chat(messages, temperature?)` → `{ content, usage: { input, output } }`
- `window.Muller.DeepSeek.freeChat(messages, temperature?)` → mismo formato

---

## 📂 Archivos clave (los únicos que tocarás)

| Archivo | Líneas | Qué contiene |
|---------|--------|-------------|
| `src/features/ruta/rutaHelpers.jsx` | ~1,348 | Vocabulario completo, SRS, generación de ejercicios, streak, rangos |
| `src/features/ruta/RutaPanel.jsx` | ~421 | UI del panel Ruta, renderizado de ejercicios, navegación niveles |
| `PLAN_RUTA_NG.md` | ~100 | Plan de 6 fases (leer rápido para entender visión) |

---

## 🎯 PRIORIDADES (orden exacto al abrir nuevo chat)

### ⭐ PRIORIDAD 1: Rotar los 8 tipos de ejercicio (AHORA)
El usuario se queja de que **solo salen traducciones DE↔ES**. El problema está en `rutaHelpers.jsx`, función `generateExercise()`.

**Problema raíz**: La función `generateExercise()` prioriza `fill` y `choose`. No rota.

**Solución** (en rutaHelpers.jsx):
1. Localizar `function generateExercise()` (≈línea 900-1100)
2. Añadir contador en localStorage 'muller_ruta_exercise_counter' (0→7)
3. Array rotatorio: `['fill', 'choose', 'translateDE', 'translateES', 'conjugate', 'plural', 'order', 'correct']`
4. Al llegar al 8º, reiniciar
5. Si tipo no aplica a la palabra, skip al siguiente

**En RutaPanel.jsx**: Verificar que `exerciseType` se recibe y renderiza bien.

### ⭐ PRIORIDAD 2: DeepSeek generando vocabulario extra (DESPUÉS)
Esto va **después** de la prioridad 1. No ahora.

**Contexto**: Ya hay 2,718 palabras en rutaHelpers.jsx. DeepSeek se usará para:
1. **Generar más palabras** cuando el usuario haya completado las existentes
2. **Generar frases de ejemplo únicas** por palabra (contenido infinito)
3. **Explicar errores** cuando el usuario falle

**NO hacer DeepSeek primero** porque:
- Sin la rotación de tipos, DeepSeek generaría más traducciones aburridas
- El usuario necesita ver VARIEDAD antes que CANTIDAD
- DeepSeek es el turbo, no el motor base

**Cuándo implementar DeepSeek**: Solo después de que la prioridad 1 funcione perfectamente. Entonces se implementa:
- `src/features/ruta/IA_FraseGenerator.jsx` — por cada palabra, llama a DeepSeek y genera 3-5 frases
- Fallback a templates si no hay API Key
- Las frases se cachean solo para la sesión actual

### En RutaPanel.jsx
- Asegurar que el estado `exerciseType` se recibe bien
- El renderizado ya soporta los 8 tipos (están en el switch), pero si no llega variación, no se ve

---

## 🔧 TODO list para el próximo agente (orden estricto)

```
[ ] FIX: Hacer rotar los 8 tipos de ejercicio en generateExercise()
    → Archivo: rutaHelpers.jsx
    → Detalle: Añadir contador localStorage 'muller_ruta_exercise_counter'
      que avanza 0→7 y elige tipo según array rotatorio.
    → Si tipo no aplica a la palabra, skip.

[ ] TEST: Abrir index.html y verificar que cada nuevo ejercicio
    cambia de tipo (fill, choose, translateDE, conjugate, etc.)

[ ] COMMIT + PUSH: git add . && git commit -m "fix(ruta): rotar
    8 tipos de ejercicio automaticamente" && git push

[ ] OPCIONAL SI SOBRA TIEMPO: Implementar Fase 3 del plan
    (SRS con EF dinámico en lugar de tabla fija de intervalos)
```

---

## ⚠️ Reglas para no romper nada

1. **NO** toques `index.html` a menos que añadas nuevos scripts
2. **NO** uses `&&` en cmd.exe (Windows no lo soporta). Comandos separados.
3. **NO** crees archivos nuevos sin necesidad. Solo toca `rutaHelpers.jsx` y quizás `RutaPanel.jsx`.
4. **SÍ** usa `replace_in_file` para cambios localizados, no reescribas archivos enteros.
5. Después de cambiar `rutaHelpers.jsx`, fuerza redeploy añadiendo `?v=N+1` en el script tag de `index.html`.

---

## 📐 Cómo probar

Abre `index.html` en navegador. Ve a pestaña RUTA. Selecciona un nivel. Inicia una lección. Cada nuevo ejercicio debería mostrar un tipo diferente (no solo translateDE/translateES). Asegúrate de que conjugación de verbos y plurales de sustantivos aparecen cuando toca.