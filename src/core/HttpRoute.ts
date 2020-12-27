// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved

export const HTTP_ROUTE_PATTERNS: Map<string, any> = new Map([
    ['int', () => {
        return '^[1-9]([0-9]*)$';
    }],
    ['boolean', () => {
        return '^true|false$';
    }],
    ['decimal', () => {
        return '^[+-]?[0-9]*\\.?[0-9]*$';
    }],
    ['float', () => {
        return '^[+-]?[0-9]*\\.?[0-9]*$';
    }],
    ['guid', () => {
        return '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
    }],
    ['string', () => {
        return '^\'(.*)\'$';
    }],
    ['date', () => {
        return '^(datetime)?\'\\d{4}-([0]\\d|1[0-2])-([0-2]\\d|3[01])(?:[T ](\\d+):(\\d+)(?::(\\d+)(?:\\.(\\d+))?)?)?(?:Z(-?\\d*))?([+-](\\d+):(\\d+))?\'$';
    }]
]);

declare interface RouterParameter {
    name: string;
    pattern?: RegExp;
    parser?: any;
    value?: any;
}

export declare interface HttpRouteMatch {
    url: string;
    controller?: any;
    action?: string;
}

export const HTTP_ROUTE_PARSERS: Map<string, any> = new Map([
    ['int', (value: any) => {
        return parseInt(value, 10);
    }],
    ['boolean', (value: any) => {
        return /^true$/ig.test(value);
    }],
    ['decimal', (value: any) => {
        return parseFloat(value);
    }],
    ['float', (value: any) => {
        return parseFloat(value);
    }],
    ['string', (value: any) => {
        return value.replace(/^'/,'').replace(/'$/,'');
    }],
    ['date', (value: any) => {
        return new Date(Date.parse(value.replace(/^(datetime)?'/,'').replace(/'$/,'')));
    }]

]);

export class HttpRoute {

    public routeData: any = {};

    constructor(public route: HttpRouteMatch) {
    }

    isMatch(urlToMatch: string) {
        if (this.route == null) {
            throw new Error('Route may not be null');
        }
        if (typeof urlToMatch !== 'string')
            return false;
        if (urlToMatch.length === 0)
            return false;
        let str1 = urlToMatch
        let patternMatch;
        let parser;
        const k = urlToMatch.indexOf('?');
        if (k >= 0) {
            str1 = urlToMatch.substr(0, k);
        }
        const re = /({([\w[\]]+)(?::\s*((?:[^{}\\]+|\\.|{(?:[^{}\\]+|\\.)*})+))?})|((:)([\w[\]]+))/ig;
        let match = re.exec(this.route.url);
        const params: RouterParameter[] = [];
        while(match) {
            if (typeof match[2] === 'undefined') {
                // parameter with colon (e.g. :id)
                params.push({
                    name: match[6]
                });
            }
            else if (typeof match[3] !== 'undefined') {
                // common expressions
                patternMatch = match[3];
                parser = null;
                if (HTTP_ROUTE_PATTERNS.has(match[3])) {
                    patternMatch = HTTP_ROUTE_PATTERNS.get(match[3])();
                    if (HTTP_ROUTE_PARSERS.has(match[3])) {
                        parser = HTTP_ROUTE_PARSERS.get(match[3]);
                    }
                }
                params.push({
                    name: match[2],
                    pattern: new RegExp(patternMatch, 'ig'),
                    parser
                });
            }
            else {
                params.push({
                    name: match[2]
                });
            }
            match = re.exec(this.route.url);
        }
        let str;
        let matcher;
        str = this.route.url.replace(re, '([\\$_\\-.:\',+=%0-9\\w-]+)');
        matcher = new RegExp('^' + str + '$', 'ig');
        match = matcher.exec(str1);
        if (typeof match === 'undefined' || match === null) {
            return false;
        }
        let decodedMatch;
        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            if (typeof param.pattern !== 'undefined') {
                if (!param.pattern.test(match[i+1])) {
                    return false;
                }
            }
            decodedMatch = decodeURIComponent(match[i+1]);
            if (typeof param.parser === 'function') {
                param.value = param.parser((match[i+1] !== decodedMatch) ? decodedMatch : match[i+1]);
            }
            else {
                param.value = (match[i+1] !== decodedMatch) ? decodedMatch : match[i+1];
            }

        }
        // set route data
        params.forEach((x) => {
            Object.defineProperty(this.routeData, x.name, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: x.value
            });
        });
        // set controller
        if (Object.prototype.hasOwnProperty.call(this.route, 'controller')) {
            Object.defineProperty(this.routeData, 'controller', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: this.route.controller
            });
        }
        // set action
        if (Object.prototype.hasOwnProperty.call(this.route, 'action')) {
            Object.defineProperty(this.routeData, 'action', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: this.route.action
            });
        }
        return true;
    }

}
