import { SERVER_CONFIG } from '../config';

export class ServerError extends Error {
  constructor(public title: string, public code = 500, public message = title) {
    super(message);
  }

  public toJson(): object {
    return {
      error: this.title,
      code: this.code,
      message: this.title === this.message ? void 0 : this.message,
      stack: SERVER_CONFIG.PRODUCTION ? void 0 : this.stack
    };
  }
}

export class GameLogicError extends ServerError {
  constructor(public message: string) {
    super('GameLogicError', 422, message);
  }
}
