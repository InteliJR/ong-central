const stripe = require('../config/stripe');

exports.createSubscriptionSession = async (req, res) => {
  try {
    const { name, email, amount } = req.body;
    
    // Validação simples
    if (!email || !amount) {
      return res.status(400).json({ error: 'Parâmetros faltando: email e amount são obrigatórios' });
    }

    // Cria uma sessão de checkout para assinatura
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Doação Mensal',
              // Opcional: você pode incluir o nome do doador, se desejar
              // description: `Doação mensal de ${name}`
            },
            unit_amount: amount, // valor em centavos (o front já converteu para centavos)
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1,
        }
      ],
      // URLs de redirecionamento após sucesso ou cancelamento
      success_url: process.env.SUCCESS_URL || 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:3000/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de assinatura:', error);
    res.status(500).json({ error: error.message });
  }
};
