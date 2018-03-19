const pages = require('./pages');

module.exports.serve = (code, domain, req, res) => {
    req.url = '/404';
    pages.serve(domain, req, res);
};
