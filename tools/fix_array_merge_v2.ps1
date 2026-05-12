$ErrorActionPreference = "Stop"
$encoding = [System.Text.UTF8Encoding]::new($false)

$helpersPath = "C:\PROFESOR-PLAZA-MULLER-git-desde-0\src\features\ruta\rutaHelpers.jsx"
$backupPath = "C:\PROFESOR-PLAZA-MULLER-git-desde-0\tools\_pre_fix_backup.jsx"

Write-Host "=== FASE 1: RESPALDO ==="
Copy-Item $helpersPath $backupPath -Force
Write-Host "Respaldo creado en $backupPath"

Write-Host "`n=== FASE 2: EXTRAER ARRAY COMPLETO DEL COMMIT ==="
$content = git --no-pager show c15cdab:src/data/rutaVocabData.js
$srcLines = $content -split "`n"
Write-Host "Total lineas en commit: $($srcLines.Length)"

# Verificar inicio y fin
if ($srcLines[7502] -ne 'MULLER_RUTA_LEVELS = [') {
    Write-Host "ERROR: Linea 7503 no es el inicio esperado!"
    Write-Host "Contenido: '$($srcLines[7502])'"
    exit 1
}

# Buscar el cierre real (último ]; antes de que termine el scope)
$foundEnd = $false
for ($i = 7502; $i -lt $srcLines.Length; $i++) {
    if ($srcLines[$i] -match '^\s*\]\s*;\s*$') {
        Write-Host "Cierre del array encontrado en linea $($i+1): '$($srcLines[$i])'"
        # Verificar que no hay otro MULLER_RUTA_LEVELS despues
        $hasAnother = $false
        for ($j = $i + 1; $j -lt $srcLines.Length; $j++) {
            if ($srcLines[$j] -match 'MULLER_RUTA_LEVELS') { $hasAnother = $true; break }
        }
        if (-not $hasAnother) {
            $endIndex = $i
            $foundEnd = $true
            Write-Host "Este es el cierre final del array (linea $($endIndex+1))"
            break
        } else {
            Write-Host "  (hay otro MULLER_RUTA_LEVELS despues, no es el final)"
        }
    }
}

if (-not $foundEnd) {
    Write-Host "ERROR: No se encontro el cierre del array!"; exit 1
}

# Extraer lineas interiores (7504 a endIndex-1)
$interiorLines = $srcLines[7503..($endIndex - 1)]
Write-Host "Lineas interiores extraidas: $($interiorLines.Length)"
if ($interiorLines.Length -le 10) {
    Write-Host "ERROR: Array muy pequeno ($($interiorLines.Length) lineas)"; exit 1
}

Write-Host "`n=== FASE 3: ANALIZAR rutaHelpers.jsx ACTUAL ==="
$helpersLines = [System.IO.File]::ReadAllLines($helpersPath, $encoding)
Write-Host "Total lineas en helpers: $($helpersLines.Length)"

# Buscar window.MULLER_RUTA_LEVELS = [
$startIdx = -1
for ($i = 0; $i -lt $helpersLines.Length; $i++) {
    if ($helpersLines[$i] -match 'window\.MULLER_RUTA_LEVELS\s*=\s*\[') {
        $startIdx = $i
        Write-Host "Found 'window.MULLER_RUTA_LEVELS = [' at line $($i+1)"
        break
    }
}
if ($startIdx -eq -1) { Write-Host "ERROR: No se encontro window.MULLER_RUTA_LEVELS"; exit 1 }

# Buscar el cierre del array: ] o ]; DESPUES del startIdx - escoger el ultimo
$endIdx = -1
for ($i = $startIdx + 1; $i -lt $helpersLines.Length; $i++) {
    # Buscar una linea que sea SOLO ] o ]; con posible indentacion
    if ($helpersLines[$i] -match '^\s*\]\s*;?\s*$') {
        $trimmed = $helpersLines[$i].Trim()
        # Excluir lineas que todavia tienen contenido de niveles (tienen parentesis o llaves)
        if ($trimmed -eq ']' -or $trimmed -eq '];') {
            # Verificar que NO es cierre de nivel interno: buscar llaves/parentesis abiertos
            $endIdx = $i
        }
    }
}

if ($endIdx -eq -1) { Write-Host "ERROR: No se encontro cierre ];" ; exit 1 }
Write-Host "Cierre del array encontrado en linea $($endIdx+1): '$($helpersLines[$endIdx])'"

Write-Host "`n=== FASE 4: REEMPLAZAR ==="
$newArrayStart = "window.MULLER_RUTA_LEVELS = ["
$newArrayEnd = "];"

# Construir nuevo contenido
$newLines = @()
# Copiar lineas antes del array
for ($i = 0; $i -lt $startIdx; $i++) {
    $newLines += $helpersLines[$i]
}
# Insertar la apertura
$newLines += $newArrayStart
# Insertar las lineas interiores
foreach ($line in $interiorLines) {
    $newLines += $line
}
# Insertar el cierre
$newLines += $newArrayEnd
# Copiar lineas despues del array
for ($i = $endIdx + 1; $i -lt $helpersLines.Length; $i++) {
    $newLines += $helpersLines[$i]
}

Write-Host "Lineas nuevas: $($newLines.Length) (original: $($helpersLines.Length))"

Write-Host "`n=== FASE 5: GUARDAR ==="
[System.IO.File]::WriteAllLines($helpersPath, $newLines, $encoding)
Write-Host "Archivo guardado."

Write-Host "`n=== FASE 6: VERIFICAR ==="
$verify = [System.IO.File]::ReadAllLines($helpersPath, $encoding)
Write-Host "Lineas en archivo final: $($verify.Length)"

# Contar niveles y lecciones
$inArray = $false
$levelCount = 0
$lessonCount = 0
foreach ($line in $verify) {
    if ($line -match 'window\.MULLER_RUTA_LEVELS\s*=\s*\[') { $inArray = $true; continue }
    if ($inArray -and $line -match '^\s*\]\s*;\s*$') { $inArray = $false; continue }
    if ($inArray) {
        # Contar niveles (lineas que comienzan con { y tienen id:)
        if ($line -match '^\s*\{.*id:') { $levelCount++ }
        # Contar lecciones (buscar pattern id:'...' dentro de lessons:)
        $matches = [regex]::Matches($line, "id:'[a-z0-9-]+'")
        foreach ($m in $matches) {
            if ($line.Contains('lessons:') -or $line.Contains("lessons:[")) {
                # Solo contar lecciones dentro de un nivel
            }
            $lessonCount++
        }
    }
}
Write-Host "Niveles detectados: ~$levelCount"
Write-Host "IDS de lecciones/lecciones: ~$lessonCount (aprox)"

# Verificar las primeras y ultimas lineas del nuevo array
Write-Host "`n--- Verificacion primeras 5 lineas del array ---"
for ($i = $startIdx; $i -lt [Math]::Min($startIdx + 6, $verify.Length); $i++) {
    Write-Host ("  $($i+1): " + $verify[$i].Substring(0, [Math]::Min(100, $verify[$i].Length)))
}
Write-Host "--- Ultimas 5 lineas del array ---"
$lastArrayLine = $startIdx + $interiorLines.Length + 1  # +1 por ]; 
for ($i = $lastArrayLine - 4; $i -le $lastArrayLine; $i++) {
    if ($i -ge 0 -and $i -lt $verify.Length) {
        Write-Host ("  $($i+1): " + $verify[$i].Substring(0, [Math]::Min(100, $verify[$i].Length)))
    }
}

Write-Host "`n=== COMPLETADO ==="
Write-Host "Backup en: $backupPath"