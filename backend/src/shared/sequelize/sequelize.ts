import { SERVER_CONFIG } from '../config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../user/user.model';

// Models

export const sequelize = new Sequelize({
  dialect: 'postgres',
  port: SERVER_CONFIG.DB_PORT,
  database: SERVER_CONFIG.DB_NAME,
  username: SERVER_CONFIG.DB_USER,
  password: SERVER_CONFIG.DB_PASSWORD,
  logging: process.env.LOGGING === 'true' || false
});

sequelize.addModels([
  // Models here
  User,
]);
