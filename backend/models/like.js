'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User,
        {
          foreignKey: 'id_users',
          as: 'user',
          //onDelete: 'CASCASE',
        }),
      Like.belongsTo(models.Post,
          {
            foreignKey: 'id_post',
            as: 'post',
            onDelete:'CASCADE',
        
    });
  }
  };
  Like.init({
    id_like:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      field:'id_like'
      
    },
    id_post: {
      type : DataTypes.INTEGER,
    },
    id_users:{
      type :DataTypes.INTEGER,
        
    },
    likes: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: false,
    freezeTableName: true
  });
  return Like;
};