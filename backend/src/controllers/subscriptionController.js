const stripe = require('../config/stripe');

exports.createSubscriptionSession = async (req, res) => {
  try {
    const { name, email, amount } = req.body;
    
    if (!email || !amount) {
      return res.status(400).json({ error: 'Parâmetros faltando: email e amount são obrigatórios' });
    }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      billing_address_collection: 'auto', 
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Doação Mensal',
              description: name ? `Doação mensal de ${name}` : 'Doação mensal',
            },
            unit_amount: amount,
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1,
        }
      ],
      success_url: process.env.SUCCESS_URL || 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:3000/cancel',
      custom_fields: [],
      phone_number_collection: { enabled: false },
      locale: 'pt-BR',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de assinatura:', error);
    res.status(500).json({ error: error.message });
  }
};
