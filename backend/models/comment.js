'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User,{
        foreignKey: 'id_users',
        as: 'user',
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.Post,{
        foreignKey:'id_post',
        as: 'post',
        onDelete: 'CASCADE', //Suppression des messages et des réponses.
      })
    }
  };
  Comment.init({
    id_comment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field:'id_comment'
    },
    id_users: {
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.STRING
    },
    id_post: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type:DataTypes.DATE
    },
    updated_at:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false,
    freezeTableName: true
  });
  return Comment;
};