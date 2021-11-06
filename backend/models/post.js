'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Notification);
      Post.hasMany(models.Like,{
        foreignKey:'id_post',
        as: 'like',
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.Comment,{
        foreignKey:'id_post',
        as: 'comments',
        onDelete:'CASCADE'
      });
      Post.belongsTo(models.User, {
        foreignKey: 'id_users',
        as: 'user',
        onDelete:'CASCADE', //suppression de l'user et des messages
      })
    }
  };
  Post.init({
    id_post:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      field:'id_post'
    },
    id_users: {
      type : DataTypes.INTEGER,
      
    },
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    },
    picture:{
      type: DataTypes.STRING
    },
    created_at: {
      type:DataTypes.DATE
    },
    updated_at:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false,
    freezeTableName: true
  });
  return Post;
};