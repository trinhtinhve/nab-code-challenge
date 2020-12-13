'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_details', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'orders'
          },
          key: 'id'
        },
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_details');
  }
};
