// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { ConfigurationBase, ApplicationBase } from "@themost/common";
import { IncomingMessage, ServerResponse } from "http";

export declare type ApplicationServiceConstructor<T> = Function & { prototype: T };

export declare interface HttpApplicationBase extends ApplicationBase {

    readonly configuration: ConfigurationBase;

    useStrategy(serviceCtor: ApplicationServiceConstructor<any>, strategyCtor: ApplicationServiceConstructor<any>): this;
    
    useService(serviceCtor: ApplicationServiceConstructor<any>): this;

    hasService<T>(serviceCtor: ApplicationServiceConstructor<T>): boolean;

    getService<T>(serviceCtor: ApplicationServiceConstructor<T>): T;

    getConfiguration(): ConfigurationBase;
}

export declare interface HttpContextBase {

    readonly request: IncomingMessage;

    readonly response: ServerResponse;

    readonly application: HttpApplicationBase;
    
    translate(key: string): string;

}