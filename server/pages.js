const fs = require('fs');
const path = require('path');
const templates = require('./templates');

const get_file_path = (req, domain) => {
    const file = req.url === '/' ? '/home.html' : req.url + '.html';
    return path.resolve(path.join('domains', domain, 'pages', file));
};

module.exports.is = (domain, req) => fs.existsSync(get_file_path(req, domain));

module.exports.serve = (domain, req, res) => {
    const file_path = get_file_path(req, domain);
    const file_contents = fs.readFileSync(file_path, 'utf-8').split('---');
    const title = file_contents[0];
    const content = file_contents[1];
    templates.serve(domain, {title: title, content: content}, res);
};
