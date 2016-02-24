var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://urfnmeruxkmwnk:ZXll5jewtxnKEV8UCV6mFfl2Vp@ec2-54-225-199-245.compute-1.amazonaws.com:5432/dcj5604scmf92o', {
  dialect: 'postgres',
  protocol: 'postgres'
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};