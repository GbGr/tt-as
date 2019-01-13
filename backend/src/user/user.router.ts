import * as Router from 'koa-router';
import { User } from './user.model';
import * as bodyParser from 'koa-bodyparser';

export const userRouter = new Router({ prefix: '/user' });

userRouter.get('/', async ctx => {
  ctx.body = await User.createNew();
});

userRouter.get('/:userId', async ctx => {
  const user = await User.findOne({ where: { id: ctx.params.userId } });
  // if (!user) throw new ServerError('UserNotFoundError', 404); // We don't need notify user about error
  ctx.body = user || await User.createNew();
});

userRouter.patch('/:userId/shared',async ctx => {
  const user = await User.findOne({ where: { id: ctx.params.userId } });
  if (!user) {
    ctx.body = await User.createNew().then(user => user.update({ shared: true }));
  } else {
    ctx.body = await user.update({ shared: true });
  }
});

userRouter.patch('/:userId/email', bodyParser(), async ctx => {
  const user = await User.findOne({ where: { id: ctx.params.userId } });
  if (!user) {
    ctx.body = await User.createNew().then(user => user.update({ email: ctx.request.body.email }));
  } else {
    ctx.body = await user.update({ email: ctx.request.body.email });
  }
});