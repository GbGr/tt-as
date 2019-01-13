export const SERVER_CONFIG = {
  PRODUCTION: false,
  PORT: process.env.PORT || 8000,
  DB_PORT: +process.env.DB_PORT || 5433,
  DB_NAME: process.env.DB_NAME || 'tt-as',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '123123',
};
