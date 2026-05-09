$path = "C:\PROFESOR-PLAZA-MULLER-git-desde-0\src\features\ruta\rutaHelpers.jsx"

# Read as bytes first
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "File size: $($bytes.Length) bytes"

# Check BOM
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "Has BOM (UTF-8 BOM detected)"
} else {
    Write-Host "NO BOM (first bytes: $($bytes[0].ToString('X2')) $($bytes[1].ToString('X2')) $($bytes[2].ToString('X2')))"
}

# Read with UTF-8 without BOM
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.UTF8Encoding]::new($false))
Write-Host "Total lines: $($lines.Length)"

# Search for key markers
Write-Host "`n--- Searching for MULLER_RUTA_LEVELS ---"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'MULLER_RUTA_LEVELS') {
        Write-Host ("Line $($i+1): " + $lines[$i].Substring(0, [Math]::Min(80, $lines[$i].Length)))
    }
}

# Search for ]); at the end area
Write-Host "`n--- Last 10 lines ---"
$start = [Math]::Max(0, $lines.Length - 10)
for ($i = $start; $i -lt $lines.Length; $i++) {
    Write-Host ("Line $($i+1): $($lines[$i])")
}

# Check character encoding issues - look for specific chars
Write-Host "`n--- Checking character encoding ---"
# Look for ñ, ü, ó, etc. in first few lines after line 9400
$foundBad = $false
for ($i = 9398; $i -lt [Math]::Min($lines.Length, 9450); $i++) {
    if ($lines[$i] -match '├' -or $lines[$i] -match '┬' -or $lines[$i] -match 'í' -or $lines[$i] -match 'ñ') {
        Write-Host ("Line $($i+1) enc check: " + $lines[$i].Substring(0, [Math]::Min(100, $lines[$i].Length)))
    }
}

# Count lessons in levels array
Write-Host "`n--- Counting lessons ---"
$inArray = $false
$lessonCount = 0
$levelCount = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'window\.MULLER_RUTA_LEVELS\s*=\s*\[') { $inArray = $true; $levelCount = 1; continue }
    if ($inArray -and $lines[$i] -match '^\s*\{.*id:') { $levelCount++ }
    if ($inArray -and $lines[$i] -match '\{.*id:.*title:.*lessons:\[') { 
        # count lessons in this line
        $matches = [regex]::Matches($lines[$i], "id:'[^']*'")
        $lessonCount += $matches.Count
    }
    # if in array and we see ]); at proper indentation (closing)
    if ($inArray -and $lines[$i] -match '^\s*\]\s*;') { break }
}
Write-Host "Levels counted: $levelCount"
Write-Host "Lessons counted: $lessonCount"