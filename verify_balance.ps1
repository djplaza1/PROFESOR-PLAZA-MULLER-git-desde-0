$files = @(
    "src/features/maestros/contenido/contenidoA1_1.jsx",
    "src/features/maestros/contenido/contenidoA1_2.jsx",
    "src/features/maestros/contenido/contenidoA2_1.jsx"
)

foreach ($f in $files) {
    $path = Join-Path (Get-Location) $f
    $txt = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($true))
    
    $ob = ($txt.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $cb = ($txt.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    $op = ($txt.ToCharArray() | Where-Object { $_ -eq '(' }).Count
    $cp = ($txt.ToCharArray() | Where-Object { $_ -eq ')' }).Count
    $obr = ($txt.ToCharArray() | Where-Object { $_ -eq '[' }).Count
    $cbr = ($txt.ToCharArray() | Where-Object { $_ -eq ']' }).Count
    
    $status = "OK"
    if ($ob -ne $cb -or $op -ne $cp -or $obr -ne $cbr) { $status = "DESBALANCE" }
    
    Write-Host "$f => Llaves:$ob/$cb Parens:$op/$cp Corch:$obr/$cbr => $status"
}