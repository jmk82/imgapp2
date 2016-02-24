var Database = require('../db/connection');

var User = Database.sequelize.define('User', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: Database.DataTypes.STRING,
  password: Database.DataTypes.STRING
});

var Image = Database.sequelize.define('Image', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  filename: Database.DataTypes.STRING,
  info: Database.DataTypes.STRING
});

var Comment = Database.sequelize.define('Comment', {
  id: { type: Database.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: Database.DataTypes.STRING
});

Image.belongsTo(User);
Comment.belongsTo(Image);
Comment.belongsTo(User);

User.hasMany(Image);
User.hasMany(Comment);
Image.hasMany(Comment);

module.exports = {
  User: User,
  Image: Image,
  Comment: Comment
};