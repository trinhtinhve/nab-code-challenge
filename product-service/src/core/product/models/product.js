'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('quantity');
        },
        set(value) {
          this.setDataValue('quantity', value);
        }
      }
    
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
    }
  );

  return Product;
};
