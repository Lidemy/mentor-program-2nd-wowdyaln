'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubComment = sequelize.define('SubComment', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {});
  SubComment.associate = function(models) {
    // SubComment belongsTo User
    // SubComment belongsTo Comment
    SubComment.belongsTo(
      models.User,
      { foreignKey: 'user_id', }

    )
    SubComment.belongsTo(
      models.Comment,
      { foreignKey: 'comment_id', }
    )
  };
  return SubComment;
};