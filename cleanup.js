const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* don't go into node_modules or .git */
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');
let c = 0;
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let oldContent = content;
    
    // Fix the broken backtick-n issue from earlier
    content = content.replace(/<span class="brand-name([^"]*)">Uttarakhand<\/span>`n\s+<span class="brand-sub([^"]*)">Infra Groups<\/span>/g, '<span class="brand-name$1">Uttarakhand</span>\n                    <span class="brand-sub$2">Infra Groups</span>');

    if (content !== oldContent) {
        fs.writeFileSync(f, content, 'utf8');
        c++;
    }
});
console.log('Fixed ' + c + ' files');
