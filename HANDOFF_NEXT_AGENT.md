# 🚀 HANDOFF: FASES 4.5, 4.6, 4.7 - COMUNIDAD

## ════════════════════════════════
## 🎭 TU ROL (ASUME ESTO AHORA)
## ════════════════════════════════
Eres un ingeniero senior experto en React 18 vanilla, Tailwind CSS y diseño modular SIN bundlers. Trabajas en la SPA "PROFESOR PLAZA MÜLLER" para aprender alemán.

**REGLAS ESTRICTAS:**
- ❌ NUNCA leas archivos completos. Usa SOLO PowerShell para ver fragmentos
- ❌ NUNCA uses imports/exports. Todo va en `window.Muller.*`
- ❌ NUNCA definas componentes dentro de otros componentes
- ✅ Siempre verifica balance de llaves tras cada cambio
- ✅ Commit y push tras cada funcionalidad completada

---

## ════════════════════════════════════════
## 🎯 MISIÓN: Implementar Fases 4.5, 4.6 y 4.7
## ════════════════════════════════════════

### 🚫 NO LEER NINGÚN ARCHIVO COMPLETO
Usa SOLO estos comandos PowerShell para ver fragmentos:

```powershell
# VER SOLO LAS ÚLTIMAS 4000 CARACTERES DE ComunidadPanel.jsx (donde insertar)
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/comunidad/ComunidadPanel.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring([Math]::Max(0, $txt.Length - 4000))

# VER LÍNEAS EXACTAS DEL INDEX.HTML (scripts de comunidad)
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "index.html"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $idx = $txt.IndexOf('comunidadBloqueos'); if ($idx -ge 0) { Write-Host $txt.Substring($idx, 500) }

# VERIFICAR BALANCE TRAS CADA CAMBIO
$ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; if ($ob -eq $cb) { Write-Host "Llaves: OK ($ob)" } else { Write-Host "Llaves: DESBALANCE ({ = $ob, } = $cb)" }; if ($op -eq $cp) { Write-Host "Parentesis: OK ($op)" } else { Write-Host "Parentesis: DESBALANCE (( = $op, ) = $cp)" }; if ($obr -eq $cbr) { Write-Host "Corchetes: OK ($obr)" } else { Write-Host "Corchetes: DESBALANCE ([ = $obr, ] = $cbr)" }
```

---

## ════════════════════════════════════════════════════════
## 📋 PLAN DE ATAQUE (HACER EN ORDEN, UN PASO A LA VEZ)
## ════════════════════════════════════════════════════════

### PASO 1: CREAR comunidadGuiones.jsx
**Archivo:** `src/features/comunidad/comunidadGuiones.jsx`
**LocalStorage key:** `muller_comunidad_guiones`

```jsx
// Patrón exacto a seguir (IIFE sin imports)
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var KEY = 'muller_comunidad_guiones';

  function getGuiones() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { return []; }
  }

  function saveGuiones(g) { localStorage.setItem(KEY, JSON.stringify(g)); }

  function subirGuion(titulo, texto, autor) {
    var guiones = getGuiones();
    var guion = {
      id: 'guion_' + Date.now(),
      titulo: titulo,
      texto: texto,
      autor: autor || 'Yo',
      votos: 0,
      descargas: 0,
      timestamp: Date.now()
    };
    guiones.push(guion);
    saveGuiones(guiones);
    return guion;
  }

  function votarGuion(id, tipo) {
    var guiones = getGuiones();
    for (var i = 0; i < guiones.length; i++) {
      if (guiones[i].id === id) {
        guiones[i].votos += (tipo === 'up' ? 1 : -1);
        saveGuiones(guiones);
        return guiones[i];
      }
    }
    return null;
  }

  function descargarGuion(id) {
    var guiones = getGuiones();
    for (var i = 0; i < guiones.length; i++) {
      if (guiones[i].id === id) {
        guiones[i].descargas++;
        saveGuiones(guiones);
        return guiones[i];
      }
    }
    return null;
  }

  function getMasDescargados(limite) {
    limite = limite || 10;
    return getGuiones().sort(function(a, b) { return b.descargas - a.descargas; }).slice(0, limite);
  }

  function getMejorValorados(limite) {
    limite = limite || 10;
    return getGuiones().sort(function(a, b) { return b.votos - a.votos; }).slice(0, limite);
  }

  window.Muller.Comunidad.Guiones = {
    getGuiones: getGuiones,
    subirGuion: subirGuion,
    votarGuion: votarGuion,
    descargarGuion: descargarGuion,
    getMasDescargados: getMasDescargados,
    getMejorValorados: getMejorValorados
  };
})();
```

### PASO 2: CREAR comunidadMentor.jsx
**Archivo:** `src/features/comunidad/comunidadMentor.jsx`
**LocalStorage keys:** `muller_comunidad_mentor_matches`, `muller_comunidad_mentor_chat`

API a exponer en `window.Muller.Comunidad.Mentor`:
- `getMatches()` - obtener lista de matches disponibles
- `registrarMatch(nivel)` - registrarse como disponible (guardar nivel A1-C1)
- `aceptarMatch(matchId)` - aceptar un match
- `enviarMensaje(matchId, texto)` - enviar mensaje al tándem
- `getChat(matchId)` - obtener historial del chat
- `getPuntosExtra()` - puntos ganados como mentor

Lógica de emparejamiento:
- Si el usuario es B2-C1, se empareja con A1-A2 (es mentor)
- Si es A1-A2, se empareja con B2-C1 (es aprendiz)
- Guardar en localStorage con estructura: `{ id, nivel, nombre, mentor, aprendiz, timestamp }`

### PASO 3: CREAR comunidadHistorias.jsx
**Archivo:** `src/features/comunidad/comunidadHistorias.jsx`
**LocalStorage key:** `muller_comunidad_historias`

API a exponer en `window.Muller.Comunidad.Historias`:
- `iniciarHistoria(fraseInicial, autor)` - empezar historia con primera frase en alemán
- `getHistorias()` - listar todas las historias activas/completadas
- `continuarHistoria(historiaId, frase, autor)` - añadir continuación (máx 10)
- `votarContinuacion(historiaId, fraseId, autor)` - votar mejor continuación
- `getHistoriasCompletadas()` - historias con 10 contribuciones
- `publicarEnFeed(historiaId)` - publicar historia completada en feed social

Estructura de cada historia:
```js
{
  id: 'hist_123',
  autor: 'Yo',
  timestamp: 1234567890,
  completada: false,
  frases: [  // máximo 10
    { id: 'f1', texto: 'Gestern bin ich...', autor: 'Yo', votos: 0 }
  ]
}
```

### PASO 4: MODIFICAR index.html
Añadir estas 3 líneas **EXACTAMENTE** ANTES de `ComunidadPanel.jsx` (búscalo en el HTML):
```html
  <script type="text/babel" src="src/features/comunidad/comunidadGuiones.jsx"></script>
  <script type="text/babel" src="src/features/comunidad/comunidadMentor.jsx"></script>
  <script type="text/babel" src="src/features/comunidad/comunidadHistorias.jsx"></script>
```

### PASO 5: MODIFICAR ComunidadPanel.jsx
Insertar **AL FINAL del return**, justo ANTES del `</div>` de cierre (después del modal de perfil de bot).

NO leer el archivo entero. Usa el comando PowerShell para ver las últimas 4000 caracteres.

Las secciones a añadir (en orden):
1. `{/* 📜 Repositorio de guiones */}` - con botón "Compartir guión actual", lista de guiones, botones de voto y descarga, filtros "más descargados" / "mejor valorados"
2. `{/* 👥 Mentor/Tándem */}` - modal con matches disponibles, chat integrado
3. `{/* 📝 Historias colaborativas */}` - formulario para empezar historia, lista de historias activas, botón "Continuar", votación

**Estados a añadir (al principio del componente, con los demás useState):**
```jsx
const [guionesCompartidos, setGuionesCompartidos] = React.useState([]);
const [muestrameMasDescargados, setMu masDescargados] = React.useState(false);
const [mentorModal, setMentorModal] = React.useState(null);
const [mentorMatches, setMentorMatches] = React.useState([]);
const [mentorChat, setMentorChat] = React.useState({ mensajes: [], matchId: null });
const [historias, setHistorias] = React.useState([]);
const [historiaInput, setHistoriaInput] = React.useState('');
const [historiaActual, setHistoriaActual] = React.useState(null);
```

### PASO 6: VERIFICAR Y COMMITEAR
```powershell
# 1. Verificar balance
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/comunidad/ComunidadPanel.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; if ($ob -eq $cb) { Write-Host "Llaves: OK ($ob)" } else { Write-Host "Llaves: DESBALANCE ({ = $ob, } = $cb)" }; if ($op -eq $cp) { Write-Host "Parentesis: OK ($op)" } else { Write-Host "Parentesis: DESBALANCE (( = $op, ) = $cp)" }; if ($obr -eq $cbr) { Write-Host "Corchetes: OK ($obr)" } else { Write-Host "Corchetes: DESBALANCE ([ = $obr, ] = $cbr)" }

# 2. Si todo OK, commit y push
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; git add . && git commit -m "FASE 4.5-4.7: Guiones colaborativos, mentor/tandem e historias" && git push origin main
```

---

## ⚠️ ADVERTENCIA FINAL
**SI EN CUALQUIER MOMENTO EL USUARIO SE QUEJA DE QUE ESTÁS LEYENDO DEMASIADO, PARA INMEDIATAMENTE.** Usa los comandos PowerShell de arriba para obtener solo lo que necesitas. No hay excusa para leer archivos completos.