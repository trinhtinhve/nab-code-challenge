'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {}
  }

  Stock.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      underscored: true,
      indexes: [{ unique: true, fields: ['product_id'] }]
    }
  );

  return Stock;
};
