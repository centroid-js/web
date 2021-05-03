// MOST Web Framework Codename ZeroGravity, copyright 2017-2020 THEMOST LP all rights reserved
import {HttpApplication, HttpContext} from '@themost/w/platform-server';
import * as request from 'supertest';
import * as express from 'express';

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

});
