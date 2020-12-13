const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders');

router.post('/v1/orders', orderController.create);

module.exports = router;
