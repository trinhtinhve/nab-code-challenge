const express = require('express');
const router = express.Router();

const orderRoutes = require('./routes/orders');

router.use('/order_service/api', [
  orderRoutes
]);

module.exports = router;
