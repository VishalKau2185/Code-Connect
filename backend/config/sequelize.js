const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Aceapollo258288$',
  database: 'tinder_app',
});

module.exports = sequelize;