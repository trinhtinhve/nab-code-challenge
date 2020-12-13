'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stocks', [
      {
        product_id: 1,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        quantity: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        quantity: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stocks', null, {});
  },
};
