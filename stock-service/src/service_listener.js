const cote = require('cote');
const stockService = require('./core/stock/services/stocks');

const listen = () => {
  const responder = new cote.Responder({ name: 'stock_service', key: 'stock' });

  return responder.on('get_quantity_of_products', (req, cb) => {
    return stockService
      .getQuantity(req)
      .then((res) => cb(null, res))
      .catch((err) => {
        cb(err);
      });
  });
};

module.exports = {
  listen
};
