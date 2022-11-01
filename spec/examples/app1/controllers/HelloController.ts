import { HttpController, httpController, httpGet, httpAction, httpParam } from '@centroid.js/web/platform-server';

@httpController('hello')
export class HelloController extends HttpController {
    constructor() {
        super();
    }
    @httpGet()
    @httpAction('index')
    @httpParam({
        name: 'message'
    })
    index(message: string) {
        return this.content('Hello World');
    }
}
