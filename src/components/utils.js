function shuffle(input) {
    let a = input.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function getQueryParam(name) {
    if (typeof document !== "undefined")
    {
        let qs = document.location.search;
        qs = qs.replace(/\+/g, " ");
        var params = {},
            re = /[?&]?([^=]+)=([^&]*)/g,
            tokens;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
                = decodeURIComponent(tokens[2]);
        }

        return params[name];
    }
}

export {
    shuffle,
    getQueryParam
};