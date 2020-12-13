const logger = require('../../common/logger');
const service = require('../../core/product_log/services/product_logs');

const create = (req, res, next) => {
  return service
    .create(req.body)
    .then((ret) => res.json(ret))
    .catch((err) => {
      logger.error('Error creating product_log' + err.message);
      next(err);
    });
};

module.exports = {
  create,
};
