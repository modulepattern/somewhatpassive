const fs = require('fs');
const path = require('path');

module.exports.serve = (domain, data, res) => {
    data.title = data.title.replace('\n', '');
    const base_path = path.resolve(path.join('domains', domain, 'templates', 'base.html'));
    const base_exists = fs.existsSync(base_path);
    if (base_exists) {
        let html = fs.readFileSync(base_path, 'utf-8');
        html = html.replace('{{title}}', data.title || '');
        html = html.replace('{{title}}', data.title || '');
        html = html.replace('{{content}}', data.content || '');
        res.end(html);
    }
    else res.end(data.content || '');
};
