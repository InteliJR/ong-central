const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/doar-unico', paymentController.createPaymentIntent);

module.exports = router;
