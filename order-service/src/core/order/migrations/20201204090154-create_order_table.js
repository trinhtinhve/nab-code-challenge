'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'orders',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        customer_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Unassigned',
        },
        transaction_id: {
          type: Sequelize.STRING,
          unique: 'actions_unique',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['transaction_id'],
          },
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
