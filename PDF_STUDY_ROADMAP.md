# 🗺️ PDF STUDY — ROADMAP DE MEJORAS

> Lista completa de features pendientes para el panel PDF Study.
> ✅ = implementado | ❌ = pendiente

---

## 🎯 FASE 1 — ALMACENAMIENTO Y USABILIDAD BÁSICA

- [x] Pestaña PDF Study funcional (visor + biblioteca)
- [ ] **IndexedDB en lugar de localStorage** — PDFs sin límite de tamaño (200MB+)
- [ ] **Zoom in/out** en el visor
- [ ] **Búsqueda de texto** dentro del PDF
- [ ] **Progreso de lectura** (páginas leídas / total)

## 🚀 FASE 2 — APRENDIZAJE CON IA (DeepSeek)

- [ ] **SRS desde PDF** — seleccionar palabra → añadir al sistema SRS de vocabulario con frase contexto
- [ ] **Chat contextual con DeepSeek** — chatear sobre el contenido del PDF
- [ ] **Preguntas de comprensión** — DeepSeek genera ejercicios TELC desde el texto
- [ ] **Traducción lado a lado** — ver PDF original + traducción al español
- [ ] **Vocabulario por nivel** — DeepSeek extrae palabras B1/B2 con definición y ejemplo

## 💎 FASE 3 — PREMIUM

- [ ] **Marcadores / páginas favoritas**
- [ ] **Miniaturas de páginas** para navegación rápida
- [ ] **Exportar PDF anotado** (con notas + dibujos)
- [ ] **Resaltado de frases** — seleccionar texto → guardar como "frases clave"
- [ ] **TTS desde PDF** — leer páginas en alemán con Web Speech API
- [ ] **Tutor de lectura guiada** — DeepSeek guía párrafo a párrafo con preguntas
- [ ] **Tarjetas de estudio auto-generadas** — DeepSeek genera flashcards Anki-style
- [ ] **Estadísticas de estudio** — tiempo leyendo, páginas/día, vocabulario nuevo/sesión
- [ ] **Detección de nivel** — DeepSeek analiza el PDF y estima el nivel CEFR
- [ ] **Mapa de conceptos** — DeepSeek genera mapa visual de temas del PDF

---

## 📊 LEYENDA

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado |
| ❌ Pendiente | No empezado |
| 🔄 En proceso | Trabajando ahora |

## 📋 ÓRDEN DE IMPLEMENTACIÓN

1. **IndexedDB** (ahora) — elimina límite de tamaño
2. **SRS desde PDF** — máximo impacto para aprender alemán
3. **Chat contextual** — la feature más potente con DeepSeek
4. **Zoom + búsqueda** — usabilidad esencial
5. **Preguntas de comprensión** — DeepSeek genera ejercicios
6. Resto premium según feedback