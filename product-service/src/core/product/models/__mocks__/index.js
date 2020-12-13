const db = {
  Product: {
    findAndCountAll: jest.fn(),
  },
  Sequelize: jest.fn(),
};

module.exports = db;
