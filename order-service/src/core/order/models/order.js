'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderDetail);
    }
  }

  Order.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unassigned',
      },
      transaction_id: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      underscored: true,
      indexes: [{ unique: true, fields: ['transaction_id'] }],
    }
  );

  return Order;
};
