$path = "C:\PROFESOR-PLAZA-MULLER-git-desde-0\index.html"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.UTF8Encoding]::new($true))

# Find the last occurrence of </html> and truncate
$lastHtmlIdx = -1
for ($i = $lines.Length - 1; $i -ge 0; $i--) {
    if ($lines[$i] -match "</html>") {
        $lastHtmlIdx = $i
        break
    }
}

if ($lastHtmlIdx -gt 0) {
    $lines = $lines[0..$lastHtmlIdx]
}

# Also fix any line that has the broken script tag
$fixed = @()
foreach ($line in $lines) {
    if ($line -match '<script src=src/features/maestros/contenido/') {
        # Skip broken line
        Write-Host "Removed broken line: $line"
        continue
    }
    $fixed += $line
}

[System.IO.File]::WriteAllLines($path, $fixed, [System.Text.UTF8Encoding]::new($true))
Write-Host "OK! Lines: $($fixed.Length)"