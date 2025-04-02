require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ERRO: Variável de ambiente STRIPE_SECRET_KEY não está definida!');
  process.exit(1);
}

module.exports = stripe;
