'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: DataTypes.STRING(32),
    nickname: DataTypes.STRING(32),
    password: DataTypes.STRING(128)
  }, {});

  User.associate = function(models) {
    // User hasMany comments
    User.hasMany(
      models.Comment, 
      { foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true }
    )
    // User hasMany SubComments
    User.hasMany(
      models.SubComment, 
      { foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true }
    )
    // User hasMany Urls
    User.hasMany(
      models.Url, 
      { foreignKey: 'user_id' }
    )
  };
  return User;
};