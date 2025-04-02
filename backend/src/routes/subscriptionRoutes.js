const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create-subscription-session', subscriptionController.createSubscriptionSession);

module.exports = router;
