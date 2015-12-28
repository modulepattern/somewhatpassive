'use strict';

const _ = require('lodash');

const domains = {
    scala: 'scalacommunity.com',
    haskell: 'haskellcommunity.com',
    clojure: 'clojurecommunity.com',
    erlang: 'erlangcommunity.com',
    fsharp: 'fsharpcommunity.com',
    python: 'pythoncommunity.com',
    java: 'javabackend.com',
    php: 'phpfolks.com',
    ruby: 'rubyfolks.com',
    js: 'jsfolks.com'
};

const redirects = {
    scala: ['scalaprogrammers.com'],
    haskell: ['haskellprogrammers.com', 'programmershaskell.com'],
    clojure: ['clojureprogrammers.com', 'programmersclojure.com'],
    erlang: ['erlangprogrammers.com', 'programmerserlang.com'],
    fsharp: ['programmersfsharp.com'],
    python: ['programmerspython.com', 'pythonfolks.com'],
    java: ['programmersjava.com', 'javaecosystem.com'],
    php: ['programmersphp.com'],
    ruby: ['programmersruby.com'],
    js: ['jsecosystem.com', 'nodejsprogrammers.com', 'nodeprogrammers.com']
};

function get_domain(domain_name) {
    var domain;
    for (const key in domains) {
        if (domains.hasOwnProperty(key)) {
            const value = domains[key];
            if (domain_name === value) {
                domain = key;
                break;
            }
        }
    }
    return domain;
}

function get_redirect(domain_name) {
    var domain;
    for (const key in redirects) {
        if (redirects.hasOwnProperty(key)) {
            const redirect_domains = redirects[key];
            var redirect_domain;
            for (var i = 0; i < redirect_domains.length; i++) {
                if (domain_name === redirect_domains[i]) {
                    redirect_domain = redirect_domains[i];
                    break;
                }
            }
            if (redirect_domain) {
                domain = domains[key];
                break;
            }
        }
    }
    return domain;
}

function get_default() {
    return 'scala';
}

function get_domain_or_redirect(req, res) {
    const hostname = req.headers.host.split(':')[0];
    const hostname_split = hostname.split('.');
    const sub_domain = hostname_split.slice(0, hostname_split.length - 2).join('.');
    const domain_name = hostname_split.slice(-2).join('.');
    var domain = get_domain(domain_name);

    if (!domain) {
        var redirect = get_redirect(domain_name);
        if (redirect) {
            redirect = sub_domain + '.' + redirect + ':5004';
            res.statusCode = 302;
            res.setHeader('Location', '//' + redirect + req.url);
            domain = null;
        }
        else {
            domain = get_default(req);
        }
    }
    return domain;
}

module.exports.get_domain_or_redirect = get_domain_or_redirect;
