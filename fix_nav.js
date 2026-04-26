const fs = require('fs');
const path = require('path');

const dir = __dirname;

const unifiedMegaMenu = `<div class="mega-menu-content">
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
                        </div>`;

const unifiedCta = `<div class="nav-cta-wrapper" style="display: flex; flex-direction: row; gap: 15px; align-items: center; flex-wrap: nowrap; white-space: nowrap;">
                <a href="tel:+919456722521" class="btn-call" style="margin-right: 8px; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); display: inline-flex; align-items: center;"><i class="fa-solid fa-phone"></i></a>
                <a href="https://wa.me/919456722521" target="_blank" class="btn-whatsapp" style="padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.1); color: #25D366; display: inline-flex; align-items: center;"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="buy-ready.html" class="btn-primary" style="background: transparent; color: var(--c-gold); border: 2px solid var(--c-gold); padding: 8px 16px; font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;"><i class="fa-solid fa-house-circle-check" style="margin-right: 8px;"></i> Buy Property</a>
                <a href="sell-property.html" class="btn-primary" style="background: var(--c-gold); color: var(--c-navy); padding: 8px 16px; border: 2px solid var(--c-gold); font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;"><i class="fa-solid fa-hand-holding-dollar" style="margin-right: 8px;"></i> Sell Property</a>
            </div>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace mega-menu-content entirely
    const regexMenu = /<div class="mega-menu-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/li>/;
    content = content.replace(regexMenu, unifiedMegaMenu + '\\n                    </div>\\n                </li>');

    // Apply active class to current file
    if (file !== "index.html") {
        const regexFile = new RegExp(`href="${file}"(?![^>]*class="active")`, 'g');
        content = content.replace(regexFile, `href="${file}" class="active"`);
    }

    // Replace nav-cta-wrapper entirely
    const regexCta = /<div class="nav-cta-wrapper"([^>]*)>[\s\S]*?<\/div>\s*<div class="hamburger">/;
    content = content.replace(regexCta, unifiedCta + '\\n\\n            <div class="hamburger">');

    // Fallback if the first CTA matching failed
    if (content.includes('btn-book')) {
        const regexCta2 = /<div class="nav-cta-wrapper">[\s\S]*?<\/div>/;
        content = content.replace(regexCta2, unifiedCta);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Processed ${file}`);
});
