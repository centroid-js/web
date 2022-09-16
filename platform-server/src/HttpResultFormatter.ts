import { ApplicationBase, ApplicationService } from '@themost/common';
import { HttpContextBase } from '@themost/w/core';
import { HttpJsonResult } from './HttpJsonResult';
import { HttpNextResult } from './HttpNextResult';
import { HttpResult } from './HttpResult';
import { HttpXmlResult } from './HttpXmlResult';
import * as Negotiator from 'negotiator';

declare type HttpResultConstructor<T> = Function & { prototype: T };

class HttpResultFormatter extends ApplicationService {

    private readonly formatters: [string, HttpResultConstructor<HttpResult>][] = [
        [
            'application/json', HttpJsonResult
        ],
        [
            'application/xml', HttpXmlResult
        ]
    ];

    constructor(app: ApplicationBase) {
        super(app);
    }
    
    tryFormat(context: HttpContextBase): HttpResultConstructor<HttpResult>  {
        const negotiator = new Negotiator(context.request);
        const mediaType = negotiator.mediaType(this.formatters.map((k) => k[0]));
        if (mediaType == null) {
            return HttpNextResult;
        }
        const find = this.formatters.find((formatter) => {
            return formatter[0] === mediaType;
        });
        if (find) {
            return find[1];
        }
        return HttpNextResult;
    }

}

export {
    HttpResultConstructor,
    HttpResultFormatter
}