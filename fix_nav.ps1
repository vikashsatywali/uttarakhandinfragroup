$dir = "c:\Users\HP\OneDrive\Desktop\tp"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$unifiedCta = '<div class="nav-cta-wrapper" style="display: flex; flex-direction: row; gap: 15px; align-items: center; flex-wrap: nowrap; white-space: nowrap;">
                <a href="tel:+919456722521" class="btn-call" style="margin-right: 8px; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); display: inline-flex; align-items: center;"><i class="fa-solid fa-phone"></i></a>
                <a href="https://wa.me/919456722521" target="_blank" class="btn-whatsapp" style="padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); color: #25D366; display: inline-flex; align-items: center;"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="buy-ready.html" class="btn-primary" style="background: transparent; color: var(--c-gold); border: 2px solid var(--c-gold); padding: 8px 16px; font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;"><i class="fa-solid fa-house-circle-check" style="margin-right: 8px;"></i> Buy Property</a>
                <a href="sell-property.html" class="btn-primary" style="background: var(--c-gold); color: var(--c-navy); padding: 8px 16px; border: 2px solid var(--c-gold); font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;"><i class="fa-solid fa-hand-holding-dollar" style="margin-right: 8px;"></i> Sell Property</a>
            </div>'

$unifiedMegaMenu = '<div class="mega-menu-content">
                            <div class="mega-column">
                                <h3><i class="fa-solid fa-city text-gold"></i> Construction & Builders</h3>
                                <ul>
                                    <li><a href="house-construction.html"><i class="fa-solid fa-angle-right"></i> House Construction</a></li>
                                    <li><a href="villa.html"><i class="fa-solid fa-angle-right"></i> Villa Construction</a></li>
                                    <li><a href="hotel-construction.html"><i class="fa-solid fa-angle-right"></i> Hotel / Resort</a></li>
                                    <li><a href="shop-com.html"><i class="fa-solid fa-angle-right"></i> Shop & Commercial</a></li>
                                    <li><a href="trunkey.html"><i class="fa-solid fa-angle-right"></i> Turnkey Projects</a></li>
                                </ul>
                            </div>
                            <div class="mega-column">
                                <h3><i class="fa-solid fa-truck-fast text-gold"></i> Transport & Logistics</h3>
                                <ul>
                                    <li><a href="construction-material.html"><i class="fa-solid fa-angle-right"></i> Construction Material</a></li>
                                    <li><a href="heavy-equipment.html"><i class="fa-solid fa-angle-right"></i> Heavy Equipment</a></li>
                                    <li><a href="all-uk-goods.html"><i class="fa-solid fa-angle-right"></i> All Uttarakhand Goods</a></li>
                                    <li><a href="bulk-supply.html"><i class="fa-solid fa-angle-right"></i> Bulk Supply</a></li>
                                </ul>
                            </div>
                            <div class="mega-column">
                                <h3><i class="fa-solid fa-boxes-packing text-gold"></i> Movers & Packers</h3>
                                <ul>
                                    <li><a href="home-relocation.html"><i class="fa-solid fa-angle-right"></i> Home Relocation</a></li>
                                    <li><a href="office-shifting.html"><i class="fa-solid fa-angle-right"></i> Office Shifting</a></li>
                                    <li><a href="vehicle-transportation.html"><i class="fa-solid fa-angle-right"></i> Vehicle Transportation</a></li>
                                    <li><a href="warehouse.html"><i class="fa-solid fa-angle-right"></i> Warehouse / Storage</a></li>
                                </ul>
                            </div>
                            <div class="mega-column">
                                <h3><i class="fa-solid fa-house-chimney text-gold"></i> Real Estate</h3>
                                <ul>
                                    <li><a href="buy-ready.html"><i class="fa-solid fa-angle-right"></i> Buy Ready House</a></li>
                                    <li><a href="sell-property.html"><i class="fa-solid fa-angle-right"></i> Sell Property</a></li>
                                    <li><a href="plot-construction.html"><i class="fa-solid fa-angle-right"></i> Plot Construction</a></li>
                                    <li><a href="consulation.html"><i class="fa-solid fa-angle-right"></i> Consulting</a></li>
                                </ul>
                            </div>
                        </div>'

foreach ($file in $files) {
    # Read entire file as string
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content
    
    # 1. Regex replace mega-menu-content
    $regexMenu = '(?s)<div class="mega-menu-content">.*?</div>\s*</div>\s*</li>'
    $content = $content -replace $regexMenu, ($unifiedMegaMenu + "`n                    </div>`n                </li>")
    
    # 2. Assign class active dynamically
    if ($file.Name -ne "index.html") {
        $findHref = 'href="' + $file.Name + '"(?![^>]*class="active")'
        $replaceHref = 'href="' + $file.Name + '" class="active"'
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, $findHref, $replaceHref)
    }

    # 3. Replace nav-cta-wrapper
    $regexCta = '(?s)<div class="nav-cta-wrapper"[^>]*>.*?</div>\s*<div class="hamburger">'
    $content = $content -replace $regexCta, ($unifiedCta + "`n`n            <div class=`"hamburger`">")
    
    # Fallback CTA replace if missing hamburger or something
    $regexCta2 = '(?s)<div class="nav-cta-wrapper">.*?</div>'
    $content = $content -replace $regexCta2, $unifiedCta

    if ($original -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
        Write-Host "Processed $($file.Name)"
    }
}
