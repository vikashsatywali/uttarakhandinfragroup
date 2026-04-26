$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $original = $c
    
    $c = $c.Replace('class="btn-call" style="padding: 8px 12px;', 'class="btn-call" style="margin-right: 8px; padding: 8px 12px;')
    
    if ($c -ne $original) {
        Set-Content -Path $_.FullName -Value $c -Encoding UTF8
    }
}
Write-Host "Margin added."
