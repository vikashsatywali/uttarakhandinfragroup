$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $original = $c
    
    $c = $c.Replace('9876543210', '9456722521')
    $c = $c.Replace('+919876543210', '+919456722521')
    $c = $c.Replace('wa.me/919876543210', 'wa.me/919456722521')
    $c = $c.Replace('+91 987 654 3210', '+91 945 672 2521')
    $c = $c.Replace('987 654 3210', '945 672 2521')
    
    if ($c -ne $original) {
        Set-Content -Path $_.FullName -Value $c -Encoding UTF8
    }
}
Write-Host "Phone Number Updated."
