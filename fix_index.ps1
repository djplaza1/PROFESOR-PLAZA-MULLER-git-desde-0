$path = "C:\PROFESOR-PLAZA-MULLER-git-desde-0\index.html"
$txt = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($true))

# Remove the broken lines at the end
$idx = $txt.LastIndexOf("</html>")
if ($idx -gt 0) {
    $txt = $txt.Substring(0, $idx + 7)
}

# Add the A2_1 script after A1_1
$search = 'src="src/features/maestros/contenido/contenidoA1_1.jsx"></script>'
$replace = 'src="src/features/maestros/contenido/contenidoA1_1.jsx"></script>'
$replace += "`n  <script type=""text/babel"" src=""src/features/maestros/contenido/contenidoA1_2.jsx""></script>"
$replace += "`n  <script type=""text/babel"" src=""src/features/maestros/contenido/contenidoA2_1.jsx""></script>"

$txt = $txt -replace [regex]::Escape($search), $replace

[System.IO.File]::WriteAllText($path, $txt, [System.Text.UTF8Encoding]::new($true))
Write-Host "OK!"