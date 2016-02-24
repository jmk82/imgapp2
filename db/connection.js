var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://yddtxpwqkzshup:3K_HIdaDK6-rNSe_IyWLqsyNIE@ec2-184-73-253-4.compute-1.amazonaws.com:5432/d83dht2n4kph35', {
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