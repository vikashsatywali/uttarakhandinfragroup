$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $original = $c
    $c = $c.Replace('gap: 10px;', 'gap: 5px;')
    $c = $c.Replace('padding: 10px 20px;', 'padding: 8px 16px;')
    $c = $c.Replace('padding: 10px 15px;', 'padding: 8px 12px;')
    
    if ($c -ne $original) {
        Set-Content -Path $_.FullName -Value $c -Encoding UTF8
    }
}
Write-Host "Replacement Complete."
