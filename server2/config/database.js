require('dotenv').config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  'garuda_muda', 
  'root', 
  '', 
  {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;