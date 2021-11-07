import * as express from 'express';
import { HttpApplication, controllerRouter } from '@themost/w/platform-server';
import { HelloController } from './controllers/HelloController';
import { RouterService } from '@themost/w/core';

const container = express();
const app = new HttpApplication();

app.getService(RouterService).add({
    path: '/hello',
    controller: HelloController,
    action: 'index',
});


container.use('/', app.middleware(container));
container.use(controllerRouter(app));

export {container};


