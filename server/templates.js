const fs = require('fs');
const path = require('path');

function serve(domain, data, res) {
    const base_path = path.resolve(path.join('templates', domain, 'base.html'));
    const base_exists = fs.existsSync(base_path);
    if (base_exists) {
        var html = fs.readFileSync(base_path, 'utf-8');
        html = html.replace('{{title}}', data.title || '');
        html = html.replace('{{content}}', data.content || '');
        res.end(html);
    }
    else {
        res.end(data.content || '');
    }
}

module.exports.serve = serve;
