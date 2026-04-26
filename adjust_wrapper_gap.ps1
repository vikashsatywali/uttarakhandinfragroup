$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $original = $c
    
    $c = $c.Replace('<div class="nav-cta-wrapper" style="display: flex; flex-direction: row; gap: 10px; align-items: center; flex-wrap: nowrap; white-space: nowrap;">', 
                    '<div class="nav-cta-wrapper" style="display: flex; flex-direction: row; gap: 15px; align-items: center; flex-wrap: nowrap; white-space: nowrap;">')
    
    if ($c -ne $original) {
        Set-Content -Path $_.FullName -Value $c -Encoding UTF8
    }
}
Write-Host "Increased wrapper gap to 15px."
