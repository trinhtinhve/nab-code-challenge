const express = require('express');
const router = express.Router();

const productLogController = require('../controllers/product_logs');

router.post('/v1/product_logs', productLogController.create);

module.exports = router;
