$filepath = 'c:\Users\HP\OneDrive\Desktop\tp\buy-ready.html'
$content = [System.IO.File]::ReadAllText($filepath, [System.Text.Encoding]::UTF8)

# Match "From " followed by any non-digit chars, then "20"
$content = [regex]::Replace($content, 'From [^\d]*20( <span>Lakh</span></div>)', 'Starts at â‚¹40$1')

# Match option with 20 Lakh - 40 Lakh
$content = [regex]::Replace($content, '>([^\d]*)20 Lakh - ([^\d]*)40 Lakh<', '>$140 Lakh - $280 Lakh<')

[System.IO.File]::WriteAllText($filepath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Replaced successfully"
