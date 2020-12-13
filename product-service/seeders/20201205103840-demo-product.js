'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name: 'product-A',
        price: 1000,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'product-B',
        price: 2000,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'product-C',
        price: 3000,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
