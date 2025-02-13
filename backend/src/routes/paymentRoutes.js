const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rota para criar um PaymentIntent (doação única)
router.post('/doar-unico', paymentController.createPaymentIntent);

module.exports = router;
