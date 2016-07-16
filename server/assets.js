'use strict';

const fs = require('fs');
const path = require('path');

const mime = require('mime');

function get_file_path(domain, req) {
    return path.resolve(path.join('assets', domain, path.basename(req.url)));
}

function get_common_file_path(req) {
    return path.resolve(path.join('assets', 'common', path.basename(req.url)));
}

function is(domain, req) {
    return req.url !== '/' && (fs.existsSync(get_file_path(domain, req)) || fs.existsSync(get_common_file_path(req)));
}

function serve(domain, req, res) {
    const domain_file_path = get_file_path(domain, req);
    const common_file_path = get_common_file_path(req);
    const file_path = fs.existsSync(domain_file_path) ? domain_file_path : common_file_path;
    const content_type = mime.lookup(file_path);
    const charset = mime.charsets.lookup(content_type);
    const extension = mime.extension(content_type);
    const file_contents = fs.readFileSync(file_path, charset);
    const text_extensions = ['html', 'css', 'js', 'svg', 'md', 'txt', 'xml'];
    const is_text = text_extensions.indexOf(extension) > -1;
    if (is_text) {
        res.end(file_contents);
    }
    else {
        res.end(file_contents, 'binary');
    }
}

module.exports.is = is;

module.exports.serve = serve;
