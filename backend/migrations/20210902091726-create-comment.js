'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_users: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_users',
        }
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
    
      picture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_post: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};