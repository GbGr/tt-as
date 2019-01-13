import './shared/sequelize/sequelize';
import * as Application from 'koa';
import { SERVER_CONFIG } from './shared/config';
import { apiRouter } from './api';
import { errorHandler } from './shared/error/error.middleware';
import * as Router from 'koa-router';

const server = new Application();

server.use(errorHandler);

const baseRouter = new Router();
// baseRouter.get('/', ctx => {
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = createReadStream('../frontend/index.html');
// });
// baseRouter.get('/leaderboard', ctx => {
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = createReadStream('../frontend/leaderboard.html');
// });
// baseRouter.get('/team', ctx => {
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = createReadStream('../frontend/team.html');
// });
// baseRouter.get('/game', ctx => {
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = createReadStream('../frontend/game.html');
// });
// baseRouter.get('/profile/:nickname', ctx => {
//   ctx.set('Content-Type', 'text/html');
//   ctx.body = createReadStream('../frontend/profile.html');
// });
//
// server.use(require('koa-static')('../frontend'));

server.use(baseRouter.routes());
server.use(apiRouter.routes());
server.use(apiRouter.allowedMethods());

const serverInstance = server.listen(SERVER_CONFIG.PORT, () => console.log(`server is listening on http://localhost:${SERVER_CONFIG.PORT}`));
