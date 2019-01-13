import * as Router from 'koa-router';
import { userRouter } from './user/user.router';

export const apiRouter = new Router({ prefix: '/api' });

apiRouter.use(userRouter.routes());
apiRouter.use(userRouter.allowedMethods());
