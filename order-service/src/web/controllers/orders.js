const logger = require('../../common/logger');
const service = require('../../core/order/services/orders');

const create = (req, res, next) => {
  return service
    .createOrder()
    .then((orders) => res.json(orders))
    .catch((err) => {
      logger.error('Error Creating Order ' + err.message);
      next(err);
    });
};

module.exports = {
  create,
};
