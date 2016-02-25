var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};