import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/bincom_test.sqlite',
    logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;