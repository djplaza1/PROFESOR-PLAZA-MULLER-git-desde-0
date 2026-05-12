# 📋 HANDOFF: PESTAÑA MAESTROS — ESTADO ACTUAL (FASES 0→8 COMPLETADAS)

## 📁 ARCHIVOS EXISTENTES (NO CREAR DE NUEVO)

| Archivo | Ruta | Líneas | Propósito |
|---------|------|--------|-----------|
| Helpers | `src/features/maestros/maestrosHelpers.jsx` | 384 | LECCIONES[], getAllLevels(), getProgress(), toggleComplete(), getRacha(), getPuntos(), getEstadisticas(), getSiguienteModulo(), getModulosDebiles(), getTiempoEstudioHoy(), getMetaDiaria() |
| Panel principal | `src/features/maestros/MaestrosPanel.jsx` | 399 | Componente principal con pestañas, grid de lecciones, progreso, estadísticas |
| Profesor IA | `src/features/maestros/MaestroIA.jsx` | 221 | Chat con IA para preguntar sobre alemán |
| Práctica | `src/features/maestros/EjerciciosMaestros.jsx` | 262 | Ejercicios tipo quiz, huecos, verdadero/falso |
| Historia | `src/features/maestros/HistoriaMaestros.jsx` | 203 | Modo historia con huecos interactivos |
| Progresión | `src/features/maestros/ProgresionMaestros.jsx` | 241 | Panel de recomendaciones y progresión automática |
| Competencia | `src/features/maestros/CompetenciaMaestros.jsx` | 181 | Juego contrarreloj con ranking local |
| Comp. Helpers | `src/features/maestros/CompetenciaHelpers.jsx` | 74 | generarPregunta(), ranking, nombre usuario |
| Contenido A1.1 | `src/features/maestros/contenido/contenidoA1_1.jsx` | ~90 | 4 módulos (Saludos, Alfabeto, Números, Colores) |
| Contenido A1.2 | `src/features/maestros/contenido/contenidoA1_2.jsx` | ~90 | 4 módulos (Familia, Comida, Tiempo, Ropa) |
| Contenido A2.1 | `src/features/maestros/contenido/contenidoA2_1.jsx` | ~90 | 4 módulos (Viajes, Trabajo, Salud, Compras) |
| Contenido A2.2 | `src/features/maestros/contenido/contenidoA2_2.jsx` | ~90 | 4 módulos (Casa, Ciudad, Clima, Tecnología) |
| Contenido B1.1 | `src/features/maestros/contenido/contenidoB1_1.jsx` | ~90 | 4 módulos (Cultura, Educación, MedioAmbiente, Política) |
| Contenido B1.2 | `src/features/maestros/contenido/contenidoB1_2.jsx` | ~90 | 4 módulos (Literatura, Ciencia, Historia, Filosofía) |
| Contenido B2.1 | `src/features/maestros/contenido/contenidoB2_1.jsx` | ~90 | 4 módulos (Economía, Derecho, Psicología, Arte) |
| Contenido B2.2 | `src/features/maestros/contenido/contenidoB2_2.jsx` | ~90 | 4 módulos (Medicina, Tecnología, Deportes, Naturaleza) |
| Contenido C1 | `src/features/maestros/contenido/contenidoC1.jsx` | ~90 | 4 módulos (Negocios, Política, Medicina, Tecnología) |

## 📜 ORDEN EXACTO DE SCRIPTS EN index.html (líneas ~969-981)

```
contenidoA1_1.jsx
contenidoA1_2.jsx
contenidoA2_1.jsx
contenidoA2_2.jsx
contenidoB1_1.jsx
contenidoB1_2.jsx
contenidoB2_1.jsx
contenidoB2_2.jsx
contenidoC1.jsx
MaestroIA.jsx
EjerciciosMaestros.jsx
HistoriaMaestros.jsx       ← FASE 6
ProgresionMaestros.jsx     ← FASE 7
CompetenciaHelpers.jsx     ← FASE 8
CompetenciaMaestros.jsx    ← FASE 8
MaestrosPanel.jsx          ← SIEMPRE EL ÚLTIMO
```

**Regla:** scripts nuevos entre `EjerciciosMaestros.jsx` y `MaestrosPanel.jsx`

## 🧠 APIs GLOBALES DISPONIBLES (window.Muller.Maestros.*)

### Datos:
- `LECCIONES` → array de 5 objetos (artículos, verbos, declinación, oraciones, pronombres)
- `contenido.A1_1` a `contenido.C1` → arrays de 4 módulos c/u

### Funciones:
- `getAllLevels()` → array de 9 objetos `{ id, nombre, descripcion, nivelRaiz, modulos[], nivelId }`
- `getModulosPorNivelRaiz(nivelRaiz)` → módulos de "A1", "A2", "B1", "B2" o "C1"
- `getNivelRaizFromId(nivelId)` → "A1_1" → "A1"
- `getProgress()` → `{ id_modulo: { completado: bool, timestamp: ms } }`
- `toggleComplete(id)` → marca/desmarca, guarda en localStorage "muller_maestros_progress"
- `isComplete(id)` → true/false
- `getRacha()` → días consecutivos
- `getUltimoEstudio()` → timestamp del último estudio
- `getPuntosNivel(nivelRaiz)` → completados * 10
- `getTotalPuntos()` → suma total
- `getNivelCompleto(nivelRaiz)` → true si todos completados
- `getEstadisticas()` → `{ totalLecciones, completadas, porcentaje, racha, puntos, nivelActual }`
- `getNivelActual()` → "A1", "A2", "B1", "B2" o "C1"
- `getSiguienteModulo()` → primer módulo NO completado siguiendo orden A1_1→C1
- `getModulosDebiles()` → módulos con >2 fallos desde localStorage "maestros_fallos"
- `getTiempoEstudioHoy()` → minutos (5 min por módulo completado hoy)
- `getMetaDiaria()` → true si al menos 1 módulo hoy

### Otras globales:
- `window.Muller.DeepSeek.preguntar(prompt)` → respuesta de IA
- `window.Muller.DeepSeek.hasApiKey()` → true/false
- `window.Muller.Toast.mostrar(texto)` → notificación
- `window.Muller.Achievements` → logros
- `window.Muller.Progreso.getNivel()` → nivel del usuario
- `window.Muller.Panels['ejerciciosMaestros']` → true si registrado
- `window.Muller.Panels['maestroIA']` → true si registrado

## 🔲 PESTAÑAS Y ESTADOS EN MaestrosPanel.jsx

**Pestañas de nivel:** Todas (A1/A2/B1/B2/C1) + botón Practicar + 🤖 Preguntar IA + 🏆 Competencia + 📊 Recomendaciones

**Pestañas principales:** 📚 Lecciones | 📖 Historia

**Estados:**
- `nivelActivo` → string (null = todos, "A1", "A2", etc.)
- `pestanaActiva` → "lecciones" | "historia"
- `expanded` → string | null (id de lección expandida)
- `search` → string (búsqueda)
- `mostrarEjercicios` → boolean
- `mostrarIA` → boolean
- `mostrarCompetencia` → boolean
- `mostrarProgresion` → boolean

## 🎯 IDEAS PARA CONTINUAR (lo que falta/no está hecho):

1. **Ejercicios vinculados a módulos de contenido** - Al hacer clic en un módulo de contenido (A1.1, A1.2, etc.), que se abra un ejercicio específico de ese módulo
2. **Sistema de logros/achievements** específicos de Maestros (ej: "Completa todos los módulos A1", "Racha de 7 días", etc.)
3. **Guardar ejercicios por módulo** - Cuando un usuario completa un ejercicio, marcarlo como hecho en el módulo correspondiente
4. **Exportar progreso** a PDF/JSON
5. **Modo oscuro mejorado** para Maestros
6. **Estadísticas avanzadas con gráficos** (progreso semanal, mensual)
7. **Sonidos y animaciones** al completar módulos
8. **Conectar ejercicios con localStorage "maestros_fallos"** para que los módulos débiles se actualicen automáticamente
9. **Añadir más LECCIONES** (solo hay 5: artículos, verbos, declinación, oraciones, pronombres)
10. **Tests de nivel** para determinar desde qué módulo empezar

## ✅ ÚLTIMO COMMIT

- Hash: `99c486b`
- Mensaje: "FASES 6-7-8: Historia interactiva, progresión automática y modo competencia en Maestros"
- Todos los archivos balanceados (sin errores de llaves/parentesis/corchetes)