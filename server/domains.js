'use strict';

const _ = require('lodash');

const domains = {
    defense: 'defense19.com',
    generatetokens: 'generatetokens.com',
    haskell: 'haskellprogrammers.com',
    python: 'pythoncommunity.com',
    rust: 'rustyprogrammers.com',
    scala: 'scalacommunity.com',
    srirangan: 'srirangan.net',

    // react: 'reacthowto.com',
    // erlang: 'elixiroferlang.com',
    // js: 'jsfolks.com',
    // clojure: 'clojurecommunity.com',
    // perl: 'perlcommunity.com',
    // swift: 'swiftobjective.com',
    // ruby: 'rubyfolks.com',
    // java: 'javabackend.com',
    // php: 'phpfolks.com',
    // fsharp: 'fsharpcommunity.com',
    // csharp: 'csharpfolks.com',
};

const redirects = {
    defense: ['defence19.com', 'india-defence.com'],
    generatetokens: ['generatetoken.com', 'productmake.rs'],
    haskell: ['haskellcommunity.com', 'haskellfolks.com'],
    python: ['pythonfolks.com'],
    rust: ['rustfolks.com', 'rustecosystem.com'],
    scala: ['scalaprogrammers.com', 'scalafolks.com'],
    srirangan: ['srirangan.com', 'review19.com'],

    // erlang: ['erlangcommunity.com', 'erlangprogrammers.com', 'programmerserlang.com', 'erlangfolks.com'],
    // js: ['jsecosystem.com', 'nodejsprogrammers.com', 'nodeprogrammers.com'],
    // clojure: ['clojureprogrammers.com', 'programmersclojure.com', 'clojurefolks.com'],
    // perl: ['perlfolks.com'],
    // swift: ['swiftfolks.com'],
    // ruby: ['programmersruby.com'],
    // java: ['programmersjava.com', 'javaecosystem.com'],
    // php: ['programmersphp.com'],
    // fsharp: ['programmersfsharp.com', 'fsharpfolks.com']
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
            redirect = redirect;
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
