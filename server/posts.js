'use strict';

const fs = require('fs');
const path = require('path');

const templates = require('./templates');

function get_file_path(req, domain) {
    var file = req.url === '/' ? '/home.html' : req.url + '.html';
    return path.resolve(path.join('content', domain, 'posts', file));
}

function is(domain, req) {
    return fs.existsSync(get_file_path(req, domain));
}

function serve(domain, req, res) {
    const file_path = get_file_path(req, domain);
    var file_contents = fs.readFileSync(file_path, 'utf-8').split('---');
    const title = file_contents[0];
    var content = file_contents[1];
    templates.serve(domain, {title: title, content: content}, res);
}

module.exports.is = is;

module.exports.serve = serve;
