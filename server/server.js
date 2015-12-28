'use strict';

const http = require('http');

const domains = require('./domains');
const assets = require('./assets');
const pages = require('./pages');
const posts = require('./posts');
const errors = require('./errors');

const server = http.createServer();

server.on('request', function (req, res) {
    const domain = domains.get_domain_or_redirect(req, res);
    if (domain) {
        if (assets.is(domain, req)) {
            assets.serve(domain, req, res);
        }
        else {
            if (pages.is(domain, req)) {
                pages.serve(domain, req, res);
            }
            else if (posts.is(domain, req)) {
                posts.serve(domain, req, res);
            }
            else {
                errors.serve(404, domain, req, res);
            }
        }
    }
    res.end();
});

server.listen(5004);
