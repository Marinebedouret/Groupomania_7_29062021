'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{
        foreignKey: 'id_users',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Like, {
        foreignKey: 'id_users',
        onDelete:'CASCADE'
      });
      User.hasMany(models.Status);
      User.hasMany(models.Notification);
      User.hasMany(models.Comment, {
        foreignKey: 'id_users',
        onDelete: 'CASCADE'
      });
    }
  };
  User.init({
    id_users: {
      type : DataTypes.INTEGER,
      primaryKey: true,
      field:'id_users'
    },
    name: { 
      type :DataTypes.STRING,
    },
    first_name:{ 
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
  },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      }
    },
    job: {
      type: DataTypes.STRING,
    },
    picture:{
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type:DataTypes.DATE
    },
    updated_at:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,

  });
  return User;
};