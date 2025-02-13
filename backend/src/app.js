const express = require('express');
const cors = require('cors');

const paymentRoutes = require('./routes/paymentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', paymentRoutes);
app.use('/api', subscriptionRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Express com Stripe rodando em reais!');
});

module.exports = app;
