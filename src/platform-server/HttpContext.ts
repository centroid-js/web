// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { HttpContextBase, HttpApplicationBase, LocalizationService } from "@themost/w/core";
import { IncomingMessage, ServerResponse } from "http";


export class HttpContext implements HttpContextBase {
    request: IncomingMessage;
    response: ServerResponse;
    public application: HttpApplicationBase;
    private _locale: string;

    public getApplication(): HttpApplicationBase {
        return this.application;
    }

    public get locale(): string {
        if (this._locale) {
            return this._locale;
        }
        if ((<any>this.request).locale) {
             return (<any>this.request).locale;
        }
        const acceptLanguage = this.request.headers['accept-language'];
        if (acceptLanguage && acceptLanguage.length) {
            return acceptLanguage[0];
        }
        // get default locale
        const service = this.application.getService(LocalizationService);
        if (service != null) {
            return service.defaultLocale;
        }
    }

    public set locale(value: string) {
        this._locale = value;
    }

    translate(key: string, replace?: any): string {
        const service = this.application.getService(LocalizationService);
        if (service == null) {
            return key;
        }
        return service.get(this.locale, key, replace);
    }


}