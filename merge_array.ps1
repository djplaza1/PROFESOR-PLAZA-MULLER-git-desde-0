$utf8 = [System.Text.UTF8Encoding]::new($false)

$targetPath = 'C:\PROFESOR-PLAZA-MULLER-git-desde-0\src\features\ruta\rutaHelpers.jsx'

Write-Host '1. Extrayendo array de rutaVocabData.js (c15cdab)...'
$sourceContent = git --no-pager show c15cdab:src/data/rutaVocabData.js
$sourceLines = $sourceContent -split "`n"

# En origen (c15cdab):
#   Linea 7503 (index 7502): MULLER_RUTA_LEVELS = [  -> NO se usa
#   Lineas 7504-8141 (indices 7503-8140): contenido
#   Linea 8142 (index 8141): ultimo ejercicio + }];  (objeto + cierre array + ;)
$arrayContentLines = $sourceLines[7503..8140]
$closingLine = $sourceLines[8141]
Write-Host ('   Contenido extraido: ' + $arrayContentLines.Length + ' lineas')
Write-Host ('   Cierre: ' + $closingLine)

Write-Host '2. Leyendo rutaHelpers.jsx...'
$targetLines = [System.IO.File]::ReadAllLines($targetPath, $utf8)
Write-Host ('   Total lineas: ' + $targetLines.Length)

Write-Host '3. Localizando bloque MULLER_RUTA_LEVELS...'
$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $targetLines.Length; $i++) {
    if ($targetLines[$i] -match 'window\.MULLER_RUTA_LEVELS\s*=\s*\[') {
        $startIdx = $i
        Write-Host ('   Inicio en linea: ' + ($i+1) + ': ' + $targetLines[$i])
    }
}
if ($startIdx -eq -1) {
    Write-Error 'ERROR: No se encontro window.MULLER_RUTA_LEVELS'
    exit 1
}
# El array termina con: una linea "]" sola (trim), luego siguiente linea con "})(window.Muller.Ruta)"
for ($i = $startIdx + 1; $i -lt $targetLines.Length; $i++) {
    if ($targetLines[$i].Trim() -eq ']') {
        if ($i + 2 -lt $targetLines.Length -and $targetLines[$i+1].Trim() -eq '' -and $targetLines[$i+2].Trim().StartsWith('})(window.Muller.Ruta)')) {
            $endIdx = $i
            Write-Host ('   Fin array en linea: ' + ($i+1) + ': ' + $targetLines[$i])
            Write-Host ('   IIFE en linea: ' + ($i+3) + ': ' + $targetLines[$i+2])
            break
        }
    }
}
if ($endIdx -eq -1) {
    Write-Error 'ERROR: No se encontro el cierre del array'
    exit 1
}

Write-Host '4. Construyendo nuevo contenido...'
$newHeader = $targetLines[$startIdx]
$newBlock = @()
$newBlock += $newHeader
$arrayContentLines | ForEach-Object { $newBlock += $_ }
$newBlock += $closingLine

Write-Host '5. Ensamblando archivo final...'
$resultLines = @()
for ($i = 0; $i -lt $targetLines.Length; $i++) {
    if ($i -lt $startIdx) {
        $resultLines += $targetLines[$i]
    } elseif ($i -eq $startIdx) {
        $newBlock | ForEach-Object { $resultLines += $_ }
    } elseif ($i -le $endIdx) {
        # Saltar lineas viejas del array (start+1 hasta endIdx inclusive)
    } else {
        $resultLines += $targetLines[$i]
    }
}

Write-Host '6. Guardando...'
[System.IO.File]::WriteAllText($targetPath, ($resultLines -join "`n"), $utf8)
Write-Host ('   Lineas finales: ' + $resultLines.Length)

Write-Host '7. Verificando...'
$verifyLines = [System.IO.File]::ReadAllLines($targetPath, $utf8)
$lessonCount = 0
for ($i = 0; $i -lt $verifyLines.Length; $i++) {
    if ($verifyLines[$i] -match "id:'[a-z]+\d-\d-l\d+'") {
        $lessonCount++
    }
}
Write-Host ('   Lecciones encontradas: ' + $lessonCount)

Write-Host '   --- Ultimas 5 lineas ---'
$total = $verifyLines.Length
for ($i = $total - 5; $i -lt $total; $i++) {
    $num = $i + 1
    Write-Host ("   $num`: $($verifyLines[$i])")
}

Write-Host 'COMPLETADO OK.'