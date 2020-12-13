'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order);
    }
  }

  OrderDetail.init(
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
      modelName: 'OrderDetail',
      underscored: true,
    }
  );

  return OrderDetail;
};
