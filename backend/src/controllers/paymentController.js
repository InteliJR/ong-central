const stripe = require('../config/stripe');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, name, email } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    console.log(`Criando PaymentIntent: ${amount} ${currency || 'brl'} para ${email}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount), 
      currency: currency || 'brl',
      receipt_email: email, 
      metadata: {
        name: name || 'Doador anônimo',
      }
    });

    console.log(`PaymentIntent criado com sucesso: ${paymentIntent.id}`);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Erro ao criar PaymentIntent:', error);
    res.status(500).json({ error: error.message || 'Falha ao criar pagamento' });
  }
};
