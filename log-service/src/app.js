const cote = require('cote');
const productLogService = require('./core/product_log/services/product_logs');

const responder = new cote.Responder({ name: 'log_service', key: 'log' });

responder.on('product_log', (req, cb) => {
  console.log('req', req);

  return productLogService
    .log(req)
    .then((res) => cb(null, res))
    .catch((err) => {
      cb(err);
    });
});
