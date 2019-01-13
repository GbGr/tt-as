import { IMiddleware } from 'koa-router';
import { ServerError } from './error';

export const errorHandler: IMiddleware = async (ctx, next) => {
  let error: ServerError;
  try {
    await next();
  } catch (e) {
    error = (e instanceof ServerError) ? e : new ServerError('ServerError');
    ctx.app.emit('error', e, ctx);
  }
  if (ctx.status !== 404) return;
  if (!error) error = new ServerError('NotFoundError', 404);
  ctx.status = error.code || ctx.status;
  ctx.body = error.toJson();
};
