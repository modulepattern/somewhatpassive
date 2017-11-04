'use strict';

window.addEventListener('load', function (e) {
    document.addEventListener('click', function (e) {
        var target = e.target || e.srcElement;
        var is_link = target.nodeName.toLowerCase() === 'a';
        var track_ga_event = target.className.indexOf('track_ga_event') > -1;
        if (is_link && track_ga_event) {
            e.preventDefault();
            var timeout_id;
            var url = target.getAttribute('href');
            var redirect = function () {
                document.location = url;
                if (timeout_id) clearTimeout(timeout_id);
            };
            timeout_id = setTimeout(redirect, 250);
            ga('send', 'event', 'ads', 'click', url, {
                'transport': 'beacon',
                'hitCallback': redirect
            });
        }
    });
});
