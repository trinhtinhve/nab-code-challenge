'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'stocks',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'actions_unique',
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
            fields: ['product_id'],
          },
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stocks');
  },
};
