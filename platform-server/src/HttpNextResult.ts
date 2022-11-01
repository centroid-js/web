// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import { HttpResult } from './HttpResult';
import { HttpContextBase } from '@centroid.js/web/core';

export class HttpNextResult extends HttpResult {
    execute(_context: HttpContextBase): Promise<void> {
        // do nothing
        return;
    }

}
