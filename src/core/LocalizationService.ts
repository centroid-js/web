// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { ApplicationService, ApplicationBase } from "@themost/common";

export abstract class LocalizationService extends ApplicationService {
    public abstract locales: string[];
    public abstract defaultLocale: string;
    constructor(app: ApplicationBase) {
        super(app);
    }
    public abstract get(locale: string, key: string, replace?: any): string;
    public abstract set(locale: string, data: any, shouldMerge?: boolean): this;
}
