const logger = require('../../common/logger');
const service = require('../../core/product/services/products');

const index = (req, res, next) => {
  return service
    .index(req.query)
    .then((products) => res.json(products))
    .catch((err) => {
      logger.error('Error get Products' + err.message);
      next(err);
    });
};

module.exports = {
  index,
};
