const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if it already has Buy Plots
    if (content.includes('buy-plots.html')) {
        return;
    }

    // Replace exactly after Buy Ready House, keeping the indentation correct
    const regex = /(<li>\s*<a href="buy-ready\.html"(?: class="active")?>\s*<i class="fa-solid fa-angle-right"><\/i>\s*Buy Ready House\s*<\/a>\s*<\/li>)/g;
    
    const replacement = `$1\n                                    <li><a href="buy-plots.html"><i class="fa-solid fa-angle-right"></i> Buy Plots</a></li>`;
    
    const newContent = content.replace(regex, replacement);
    
    if (newContent !== content) {
        fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        // Fallback for cases where spaces might be different
        const fallbackRegex = /(Buy Ready House<\/a>\s*<\/li>)/;
        const newFallbackContent = content.replace(fallbackRegex, `$1\n                                    <li><a href="buy-plots.html"><i class="fa-solid fa-angle-right"></i> Buy Plots</a></li>`);
        if (newFallbackContent !== content && !content.includes('buy-plots.html')) {
             fs.writeFileSync(path.join(dir, file), newFallbackContent, 'utf8');
             console.log(`Updated with fallback: ${file}`);
        }
    }
});

