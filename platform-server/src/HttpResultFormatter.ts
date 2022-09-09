import { ApplicationBase, ApplicationService } from '@themost/common';
import { HttpJsonResult } from './HttpJsonResult';
import { HttpResult } from './HttpResult';
import { HttpXmlResult } from './HttpXmlResult';

declare type HttpResultConstructor<T> = Function & { prototype: T };

class HttpResultFormatter extends ApplicationService {

    public readonly formatters: Map<string, HttpResultConstructor<HttpResult>> = new Map([
        [
            'default', HttpJsonResult
        ],
        [
            'application/json', HttpJsonResult
        ],
        [
            'application/xml', HttpXmlResult
        ]
    ]);

    constructor(app: ApplicationBase) {
        super(app);
    }
    
    format(data: any): Promise<void> {
        return;
    }

}

export {
    HttpResultConstructor,
    HttpResultFormatter
}