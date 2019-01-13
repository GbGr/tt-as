import { sequelize } from './sequelize';

sequelize.sync({ force: true }).then(
  () => {
    console.log('OK');
    process.exit(0);
  },
  console.error
);
