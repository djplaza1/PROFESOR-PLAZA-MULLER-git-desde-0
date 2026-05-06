# 🚀 HANDOFF: FASES 4.5, 4.6, 4.7 - COMUNIDAD

## ⚠️ REGLA DE ORO: NO LEER NINGÚN ARCHIVO COMPLETO
Usa **regex search** y **líneas específicas** con `start_line`/`end_line`. No leas archivos enteros.

## 📂 ARCHIVOS A TOCAR (SOLO ESTOS)

### 1. `src/features/comunidad/ComunidadPanel.jsx` (1156 líneas)
**DONDE INSERTAR**: Al final del return, justo ANTES del cierre `</div>` (línea 1154) y ANTES del cierre `);` (línea 1156). Entre la sección `{/* Modal de perfil de bot */}` que termina en línea 1153 y el `</div>` de línea 1154.

#### 4.5 REPOSITORIO DE GUIONES (insertar entre línea 1153 y 1154)
- Añadir estado: `const [guionesCompartidos, setGuionesCompartidos] = React.useState([]);`
- Añadir handler: subirGuion, votarGuion
- JSX: entre `{/* Modal de perfil de bot */}` y `</div>`

#### 4.6 MENTOR/TÁNDEM (insertar entre 4.5 y </div>)
- Añadir estado: mentorModal, mentorMatches, mentorChat
- JSX sección tándem

#### 4.7 HISTORIAS COLABORATIVAS (insertar entre 4.6 y </div>)
- Estado: historiaColaborativa, historiaVotacion
- JSX sección historias

### 2. CREAR ARCHIVOS NUEVOS

#### `src/features/comunidad/comunidadGuiones.jsx`
- window.Muller.Comunidad.Guiones = { subir, getGuiones, votar, getMasDescargados, getMejorValorados }
- localStorage key: `muller_comunidad_guiones`

#### `src/features/comunidad/comunidadMentor.jsx`
- window.Muller.Comunidad.Mentor = { buscarMatch, getMatches, enviarMensaje, getChat, aceptarMatch }
- localStorage keys: `muller_comunidad_mentor_matches`, `muller_comunidad_mentor_chat`

#### `src/features/comunidad/comunidadHistorias.jsx`
- window.Muller.Comunidad.Historias = { iniciarHistoria, continuarHistoria, getHistorias, votarContinuacion, getMejorContinuacion }
- localStorage key: `muller_comunidad_historias`

### 3. MODIFICAR `index.html`
Añadir 3 scripts NUEVOS justo ANTES de `ComunidadPanel.jsx` (línea 964 actual):
```
<script type="text/babel" src="src/features/comunidad/comunidadGuiones.jsx"></script>
<script type="text/babel" src="src/features/comunidad/comunidadMentor.jsx"></script>
<script type="text/babel" src="src/features/comunidad/comunidadHistorias.jsx"></script>
```

## 🎯 QUÉ HACE CADA FEATURE

### 4.5 Repositorio de guiones
- Sección en ComunidadPanel para compartir guiones de Biblioteca
- Cada guión tiene: titulo, autor, texto, votos (up/down), descargas
- Botones: "Compartir guión actual" (desde Biblioteca), votar, "más descargados", "mejor valorados"
- Toast al compartir

### 4.6 Mentor/Tándem automático
- Empareja usuarios por nivel (B2-C1 con A1-A2)
- Modal con lista de matches disponibles
- Chat simple (localStorage, no realtime)
- Mentor gana puntos extra al ayudar

### 4.7 Historias colaborativas
- Un usuario empieza frase en alemán
- Otros continúan (máximo 10 contribuciones)
- Votar mejor continuación
- Las historias completadas se muestran en el feed social

## 🔧 COMANDOS ÚTILES (NO LEER ARCHIVOS)

```powershell
# Ver SOLO líneas finales del panel (donde insertar)
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "src/features/comunidad/ComunidadPanel.jsx"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring([Math]::Max(0, $txt.Length - 4000))

# Ver sección de scripts en index.html
Set-Location "C:\PROFESOR-PLAZA-MULLER-git-desde-0"; $f = "index.html"; $txt = [System.IO.File]::ReadAllText((Join-Path $PWD $f), [System.Text.UTF8Encoding]::new($true)); Write-Host $txt.Substring($txt.IndexOf('comunidadBloqueos'), 400)

# Verificar balance
$ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count; $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count; $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count; $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count; $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count; $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count; if ($ob -eq $cb) { Write-Host "Llaves: OK ($ob)" } else { Write-Host "Llaves: DESBALANCE ({ = $ob, } = $cb)" }; if ($op -eq $cp) { Write-Host "Parentesis: OK ($op)" } else { Write-Host "Parentesis: DESBALANCE (( = $op, ) = $cp)" }; if ($obr -eq $cbr) { Write-Host "Corchetes: OK ($obr)" } else { Write-Host "Corchetes: DESBALANCE ([ = $obr, ] = $cbr)" }
```

## 📋 COMMIT FINAL
```bash
git add . && git commit -m "FASE 4.5-4.7: Guiones colaborativos, mentor/tandem e historias" && git push origin main
```

## 🧩 PATRÓN DE CÓDIGO (usar este para todo)
```jsx
// No imports/exports. Solo patron IIFE
window.Muller = window.Muller || {};
window.Muller.Comunidad = window.Muller.Comunidad || {};

(function() {
  var KEY = 'muller_comunidad_mimodulo';
  
  function getDatos() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { return []; }
  }
  
  function saveDatos(datos) {
    localStorage.setItem(KEY, JSON.stringify(datos));
  }
  
  // API expuesta
  window.Muller.Comunidad.MiModulo = {
    getDatos: getDatos,
    hacerAlgo: function() { ... }
  };
})();