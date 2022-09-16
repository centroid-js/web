import { HttpResult } from './HttpResult';
import { HttpContextBase } from '@themost/w/core';
import { XSerializer } from '@themost/xml';

export class HttpXmlResult extends HttpResult {
    async execute(context: HttpContextBase): Promise<any> {
        if (this.data == null) {
            context.response.writeHead(this.status || 204);
            return;
        }
        // write content-type
        context.response.writeHead(this.status || 200, { 'Content-Type': this.contentType });
        // send response
        context.response.write(XSerializer.serialize(this.data), this.contentEncoding as BufferEncoding);
    }
    constructor(public data: any) {
        super();
        this.contentType = 'application/xml';
        this.contentEncoding = 'utf8';
    }
};