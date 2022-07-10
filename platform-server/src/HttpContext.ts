// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { ApplicationBase, ConfigurationBase } from '@themost/common';
import { DefaultDataContext } from '@themost/data';
import { HttpContextBase, HttpApplicationBase, LocalizationService, enumerable } from '@themost/w/core';
import { IncomingMessage, ServerResponse } from 'http';
export class HttpContext extends DefaultDataContext implements HttpContextBase {
    request: IncomingMessage;
    response: ServerResponse;
    private _locale: string;
    private _application: HttpApplicationBase;
    
    constructor(application: HttpApplicationBase) {
        // call super constructor
        super();
        // set application
        Object.defineProperty(this, '_application', {
            configurable: true,
            enumerable: false,
            writable: false,
            value: application
        });
    }

    @enumerable(false)
    get application(): HttpApplicationBase {
        return this._application;
    }

    public getApplication(): HttpApplicationBase {
        return this._application;
    }

    public getConfiguration(): ConfigurationBase {
        return this._application.getConfiguration();
    }

    public get locale(): string {
        if (this._locale) {
            return this._locale;
        }
        if ((this.request as any).locale) {
             return (this.request as any).locale;
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