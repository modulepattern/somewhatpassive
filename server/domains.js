const _ = require('lodash');

const domains = {
    trainnetwork: 'train.network',
    defense: 'india-defence.com',
    generatetokens: 'generatetokens.com',
    srirangan: 'srirangan.net',
    modulepattern: 'modulepattern.com',
    servetoken: 'servetoken.com',
};

const redirects = {
    generatetokens: ['generatetoken.com'],
    srirangan: ['srirangan.com'],
};

const get_domain = (domain_name) => {
    let domain;
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
};

const get_redirect = (domain_name) => {
    let domain;
    for (const key in redirects) {
        if (redirects.hasOwnProperty(key)) {
            const redirect_domains = redirects[key];
            let redirect_domain;
            for (let i = 0; i < redirect_domains.length; i++) {
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
};

const get_default = () => 'srirangan';

module.exports.get_domain_or_redirect = (req, res) => {
    const hostname = req.headers.host.split(':')[0];
    const hostname_split = hostname.split('.');
    const domain_name = hostname_split.slice(-2).join('.');
    let domain = get_domain(domain_name);

    if (!domain) {
        const redirect = get_redirect(domain_name);
        if (redirect) {
            res.statusCode = 302;
            res.setHeader('Location', '//' + redirect + req.url);
            domain = null;
        }
        else domain = get_default(req);
    }
    return domain;
};
