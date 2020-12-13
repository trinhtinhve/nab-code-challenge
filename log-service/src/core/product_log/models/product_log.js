'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductLog extends Model {
    static associate(models) {
    }
  };

  ProductLog.init({
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    }
  }, {
    sequelize,
    modelName: 'ProductLog',
    underscored: true
  });

  return ProductLog;
};
