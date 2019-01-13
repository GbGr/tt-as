import './shared/sequelize/sequelize';
import * as Application from 'koa';
import { SERVER_CONFIG } from './shared/config';
import { apiRouter } from './api';
import { errorHandler } from './shared/error/error.middleware';
import * as Router from 'koa-router';

const server = new Application();

server.use(errorHandler);

const baseRouter = new Router();

server.use(baseRouter.routes());
server.use(apiRouter.routes());
server.use(apiRouter.allowedMethods());

const serverInstance = server.listen(SERVER_CONFIG.PORT, () => console.log(`server is listening on http://localhost:${SERVER_CONFIG.PORT}`));
