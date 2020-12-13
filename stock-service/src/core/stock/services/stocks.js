const { Stock } = require('../models');
const getQuantity = ({ productIds }) => {
  console.log('params', productIds);

  return Stock.findAll({
    where: {
      product_id: productIds
    }
  });
};

module.exports = {
  getQuantity
};
