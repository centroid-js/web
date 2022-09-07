// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import {controllerRouter, HttpApplication, HttpContext} from '@themost/w/platform-server';
import * as request from 'supertest';
import * as express from 'express';
import { RouterService } from '@themost/w/core';
import { HelloController } from './examples/app1/controllers/HelloController';

describe('HttpApplication', () => {

    it('should use middleware', async () => {
        const app = new HttpApplication();
        expect(app).toBeTruthy();
        const container = express();
        container.use(app.middleware(container));
        container.get('/hello', (req, res) => {
            expect(req.context).toBeInstanceOf(HttpContext);
            return res.json({
               message: 'Hello World'
            });
        })
        const response = await request(container).get('/hello');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('should use router', async () => {
        const app = new HttpApplication();
        app.useService(RouterService);
        app.getService(RouterService).add({
            path: '/hello/:action',
            controller: HelloController
        });
        const container = express();
        container.use(app.middleware(container));
        container.use(controllerRouter(app));
        const response = await request(container).get('/hello/index');
        expect(response.status).toBe(200);
        expect(response.text).toBeTruthy();
    });

});
