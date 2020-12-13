const express = require('express');
const router = express.Router();

const productRoutes = require('./routes/products');

router.use('/product_service/api', [
  productRoutes
]);

module.exports = router;
