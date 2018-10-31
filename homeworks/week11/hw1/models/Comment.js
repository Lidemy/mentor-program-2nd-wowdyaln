'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // Comment belongsTo User
    Comment.belongsTo(
      models.User, 
      { foreignKey: 'user_id', }
    )
    // Comment hasMany SubComments
    Comment.hasMany(
      models.SubComment,
      { foreignKey: 'comment_id',
        onDelete: 'cascade',
        hooks: true
       }
    )
  };
  return Comment;
};