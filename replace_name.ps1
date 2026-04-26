$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Include *.html,*.js,*.css -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    
    $c = $c -creplace '<span class="brand-name([^>]*)">DevBhoomi</span>\s*<span class="brand-sub([^>]*)">Gatividhi Enterprises</span>', '<span class="brand-name$1">Uttarakhand</span>`n                    <span class="brand-sub$2">Infra Groups</span>'
    $c = $c -creplace 'DevBhoomi Gatividhi Enterprises', 'Uttarakhand Infra Groups'
    $c = $c -creplace 'DevBhoomi Gatividhi', 'Uttarakhand Infra Groups'
    $c = $c -creplace '\bDevBhoomi\b', 'Uttarakhand Infra Groups'
    
    Set-Content -Path $_.FullName -Value $c -Encoding UTF8
}
Write-Host "Replacement complete."
