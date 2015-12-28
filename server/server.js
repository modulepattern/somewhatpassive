'use strict';

const http = require('http');

const domains = require('./domains');
const assets = require('./assets');
const templates = require('./templates');
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
            const template = templates.get_template(domain);
            if (pages.is(domain, req)) {
                pages.serve(template, domain, req, res);
            }
            else if (posts.is(domain, req)) {
                posts.serve(template, domain, req, res);
            }
            else {
                errors.serve(404, template, domain, req, res);
            }
        }
    }
    res.end();
});

server.listen(5004);
