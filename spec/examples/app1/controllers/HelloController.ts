import { HttpController, httpController, httpGet, httpAction, httpParam } from '@themost/w/platform-server';

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
    @httpGet()
    message() {
        return {
            message: 'Hello World'
        }
    }
}