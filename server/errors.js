const pages = require('./pages');

function serve(code, domain, req, res) {
    req.url = '/404';
    pages.serve(domain, req, res);
}

module.exports.serve = serve;
