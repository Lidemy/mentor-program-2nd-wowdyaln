'use strict';
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    shortUrl: {
                type: DataTypes.STRING(6),
                primaryKey: true  // 重要！不要忘了加！
              },
    originUrl: DataTypes.STRING
  }, {});


  Url.associate = function (models) {
    // Url belongsTo User
    Url.belongsTo(
      models.User,
      { foreignKey: 'user_id', }
    )
  };
  return Url;
};