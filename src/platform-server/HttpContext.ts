// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { HttpContextBase, HttpApplicationBase } from "@themost/w/core";
import { IncomingMessage, ServerResponse } from "http";


export class HttpContext implements HttpContextBase {
    request: IncomingMessage;
    response: ServerResponse;
    public application: HttpApplicationBase;

    public getApplication(): HttpApplicationBase {
        return this.application;
    }

    translate(key: string): string {
        throw new Error("Method not implemented.");
    }


}