const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Rota para criar sessão de checkout para assinatura
router.post('/create-subscription-session', subscriptionController.createSubscriptionSession);

module.exports = router;
