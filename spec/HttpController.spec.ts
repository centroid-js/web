import {TestController} from './TestController';
import {HttpControllerAnnotation, HttpControllerMethodAnnotation, HttpApplication} from '@centroid.js/web/platform-server';

describe('HttpController', () => {
    it('should has controller decorator', () => {
       const controller  = new TestController();
       const annotation = controller.constructor as HttpControllerAnnotation;
       expect(annotation.httpController).toBeTruthy()
    });
    it('should has controller method decorator', () => {
        const controller  = new TestController();
        const annotation = controller.hello as HttpControllerMethodAnnotation;
        expect(annotation.httpGet).toBeTruthy();
    });
});

