const { ProductLog } = require('../models/index');

const log = (params) => {
  return ProductLog.create({ content: params }, { fields: ['content'] });
};

module.exports = {
  log
};
