# PLAN RUTA NG — La hostia (Duolingo killer)

## Fase 1: Generador de frases con IA (DeepSeek)
**Archivos**: `src/features/ruta/IA_FraseGenerator.jsx`

- Cuando hay API Key: llama a DeepSeek para generar 3-5 frases ÚNICAS por palabra
- Cuando NO hay API Key: fallback al generador de templates actual (100% funcional)
- Las frases se cachean en localStorage SOLO para la sesión actual (al cerrar, se regeneran)
- Prompt de DeepSeek controla estrictamente el nivel de complejidad

**Impacto**: Contenido infinito, nunca se repite una frase.

## Fase 2: Tutor IA (explicaciones cuando fallas)
**Archivos**: añadir a `RutaPanel.jsx`

- Cuando fallas un ejercicio, botón "🤖 ¿Por qué?" que llama a DeepSeek
- IA explica el error en 2-3 líneas, con ejemplos y reglas
- Cache de explicaciones por (palabra + errorType) para no repetir llamadas
- Si no hay API Key, se muestra la pista normal que ya existe

**Impacto**: Duolingo NO explica errores. Esto es TU ventaja.

## Fase 3: SRS híbrido mejorado (SM-2 + EF dinámico)
**Archivos**: modificar `rutaHelpers.jsx`

- Añadir Factor de Facilidad (EF) estilo Anki: 1.3 mínimo, 2.5 máximo
- EF se recalcula: si aciertas → EF += 0.15, si fallas → EF -= 0.20
- Intervalo = anterior × EF (no tabla fija)
- Detectar patrones: si fallas 3 palabras del mismo tipo seguidas → generar mini-lección

**Impacto**: El SRS se adapta a TI, no a una tabla genérica.

## Fase 4: Misiones diarias generadas por IA
**Archivos**: `src/features/ruta/MisionesDiarias.jsx`

- Al abrir la app, IA analiza tu matriz de errores y genera 3 misiones
- Ejemplo: "Practica 10 artículos (fallas 70% en der/die/das)"
- Recompensas: XP bonus + monedas
- Si no hay API Key: misiones genéricas por nivel (sigue funcionando)

**Impacto**: Enganchas al usuario con objetivos diarios personalizados.

## Fase 5: 4 nuevos tipos de ejercicio
**Archivos**: modificar `rutaHelpers.jsx` y `RutaPanel.jsx`

| Tipo | Descripción |
|------|-------------|
| audio | TTS → escribes lo que oíste |
| match | Arrastrar para emparejar DE↔ES |
| context | Elegir palabra correcta en un texto con huecos |
| rewrite | Reescribir frase cambiando tiempo/persona |

Total: 12 tipos. Cada nivel desbloquea más tipos progresivamente.

## Fase 6: Dashboard con insights IA
**Archivos**: modificar `RutaPanel.jsx` (sección stats)

- Estadísticas semanales con gráficos de barras (CSS puro)
- "Tu debilidad esta semana: X" detectado por patrón de errores
- Predicción: "A este ritmo llegarás a B1 en X meses"
- Ranking semanal contra ti mismo

---

## Orden de implementación recomendado

```
Semana 1: Fase 1 (generador IA frases) + Fase 3 (SRS mejorado)
  → Ya tienes contenido infinito + mejor retención
  
Semana 2: Fase 2 (Tutor IA) + Fase 5 (4 nuevos tipos)
  → El usuario recibe explicaciones + más variedad

Semana 3: Fase 4 (Misiones) + Fase 6 (Dashboard)
  → Engagement diario + visualización de progreso
```

## Principios clave

1. **Graceful degradation**: Todo funciona SIN API Key. La IA es un turbo, no un requisito.
2. **Contenido fresco siempre**: No cachear frases entre sesiones (sí dentro de la sesión).
3. **Personalización real**: El SRS + patrón de errores + IA trabajan juntos.
4. **Explicaciones > correcciones**: Decir POR QUÉ fallaste es 10x más valioso que solo "incorrecto".