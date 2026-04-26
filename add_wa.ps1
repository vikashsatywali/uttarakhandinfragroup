$ErrorActionPreference = "Stop"
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $original = $c
    
    $callBtn = '<a href="tel:+919876543210" class="btn-call" style="padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); display: inline-flex; align-items: center;"><i class="fa-solid fa-phone"></i></a>'
    $whatsappBtn = '<a href="https://wa.me/919876543210" target="_blank" class="btn-whatsapp" style="padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); color: #25D366; display: inline-flex; align-items: center;"><i class="fa-brands fa-whatsapp"></i></a>'
    
    $replacement = $callBtn + "`r`n                " + $whatsappBtn

    $c = $c.Replace($callBtn, $replacement)
    
    if ($c -ne $original) {
        Set-Content -Path $_.FullName -Value $c -Encoding UTF8
    }
}
Write-Host "WhatsApp icon added."
