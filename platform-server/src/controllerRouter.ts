import { HttpApplicationBase, RouterService, HttpRoute } from '@centroid.js/web/core';
import {Router} from 'express';
import { HttpController } from './HttpController';
import { HttpResult } from './HttpResult';
import { HttpNextResult } from './HttpNextResult';
import { HttpControllerMethodAnnotation } from './HttpDecorators';
import {capitalize} from 'lodash';
import { LangUtils } from '@themost/common';

export function controllerRouter(app: HttpApplicationBase): Router {
    const router = Router();
    router.use((req, res, next) => {
        const appRouter: RouterService = req.context.application.getService(RouterService);
        const route: HttpRoute = appRouter.parseUrl(req.url);
        if (route) {
            const ControllerCtor = route.routeConfig.controller as new() => HttpController;
            const controller = new ControllerCtor();
            controller.context = req.context;
            const action = route.params.action || route.routeConfig.action;
            const controllerMethod: (...arg: any) => any = controller[action];
            if (typeof controllerMethod === 'function') {
                // validate httpAction
                const annotation = controllerMethod as HttpControllerMethodAnnotation;
                // get full method name e.g. httpGet, httpPost, httpPut etc
                const method = `http${capitalize(req.method)}`;
                // if controller method has been annotated
                if (Object.prototype.hasOwnProperty.call(annotation, method)) {
                    const args: any[] = [];
                    // parse method arguments
                    const methodParams = LangUtils.getFunctionParams(controllerMethod);
                    methodParams.forEach((methodParam: string) => {
                        if (Object.prototype.hasOwnProperty.call(route.params, methodParam)) {
                            args.push(route.params[methodParam]);
                        } else {
                            args.push(undefined);
                        }
                    });
                    const result = controllerMethod.apply(controller, args);
                    if (result instanceof HttpNextResult) {
                        return next;
                    }
                    if (result instanceof HttpResult) {
                        return result.execute(controller.context).then(() => {
                            if (controller.context.response.writableEnded === false) {
                                controller.context.response.end();
                            }
                        }).catch((err) => {
                            return next(err);
                        });
                    }
                }
            }
        }
        return next();
    });
    return router;
}
