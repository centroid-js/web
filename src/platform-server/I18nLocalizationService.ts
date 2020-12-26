// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { LocalizationService } from '@themost/w/core';
import { ApplicationBase } from '@themost/common';
import {I18n, ConfigurationOptions} from 'i18n';
import * as path from 'path';
import {assign, merge} from 'lodash';

export class I18nLocalizationService extends LocalizationService {
    public locales: string[] = [ "en" ];
    public defaultLocale: string = "en";
    private _i18n: I18n;

    constructor(app: ApplicationBase) {
        super(app);
        // get app configuration options
        const options = <ConfigurationOptions>app.getConfiguration().getSourceAt('settings/i18n');
        const finalOptions = Object.assign({
            locales: [ "en" ],
            defaultLocale: "en",
            directory: path.resolve(process.cwd(),'i18n'),
            autoReload: false,
            updateFiles: false,
            syncFiles: false,
            objectNotation: true
        }, options );
        // set default locale
        this.locales = finalOptions.locales;
        this.defaultLocale = finalOptions.defaultLocale;
        // initialize i18n
        this._i18n = new I18n();
        // and configure
        this._i18n.configure(finalOptions);
    }

    public get(locale: string, key: string, replace?: any): string {
        return this._i18n.__({
                phrase: key,
                locale: locale
            }, replace);
        };
    public set(locale: string, data: any, shouldMerge?: boolean): this {
        // get catalog
        let catalog = this._i18n.getCatalog(locale);
        if (!catalog) {
            this._i18n.addLocale(locale);
            catalog = this._i18n.getCatalog(locale);
        }
        // if data should be merged
        if (typeof shouldMerge === 'undefined' || shouldMerge) {
            merge(catalog, data);
        }
        else {
            assign(catalog, data);
        }
        return this;
    }


}