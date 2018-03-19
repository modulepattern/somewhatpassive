const fs = require('fs');
const path = require('path');
const mime = require('mime');

const get_file_path = (domain, req) => path.resolve(path.join('domains', domain, 'assets', path.basename(req.url)));

const get_common_file_path = req => path.resolve(path.join('domains', 'common', 'assets', path.basename(req.url)));

module.exports.is = (domain, req) => req.url !== '/' && (fs.existsSync(get_file_path(domain, req)) || fs.existsSync(get_common_file_path(req)));

module.exports.serve = (domain, req, res) => {
    const domain_file_path = get_file_path(domain, req);
    const common_file_path = get_common_file_path(req);
    const file_path = fs.existsSync(domain_file_path) ? domain_file_path : common_file_path;
    const content_type = mime.getType(file_path);
    const extension = mime.getExtension(content_type);
    const file_contents = fs.readFileSync(file_path);
    const text_extensions = ['html', 'css', 'js', 'svg', 'md', 'txt', 'xml'];
    const is_text = text_extensions.indexOf(extension) > -1;
    if (is_text) res.end(file_contents);
    else res.end(file_contents, 'binary');
};
