// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { LocalizationService } from '@themost/w/core';
import { ApplicationBase } from '@themost/common';
import {I18n, ConfigurationOptions} from 'i18n';
import * as path from 'path';

export class I18nLocalizationService extends LocalizationService {
    public locales: string[] = [ "en" ];
    public defaultLocale: string = "en";
    private _i18n: I18n;

    constructor(app: ApplicationBase) {
        super(app);
          const options = <ConfigurationOptions>app.getConfiguration().getSourceAt('settings/i18n');
          if (options) {
              this.locales = options.locales;
              this.defaultLocale = options.defaultLocale;
          }
          this._i18n = new I18n();
          this._i18n.configure({
            locales: [ "en" ],
            defaultLocale: "en",
            directory: path.resolve(process.cwd(),'i18n'),
            autoReload: false,
            updateFiles: false,
            syncFiles: false,
            objectNotation: true
          });
    }

    public get(locale: string, key: string, replace?: any): string {
        return this._i18n.__({
                phrase: key,
                locale: locale
            }, replace);
        };
    public set(locale: string, data: any, shouldMerge?: boolean): this {
        // get catalog
        const catalog = this._i18n.getCatalog(locale);
        // if data should be merged
        if (typeof shouldMerge === 'undefined' || shouldMerge) {
            Object.assign(catalog, data);
        }
        else {
            Object.assign(catalog, data);
        }
        return this;
    }


}