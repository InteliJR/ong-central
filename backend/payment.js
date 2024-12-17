require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Inicializa a Stripe com a chave secreta
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(express.json()); // Permite receber JSON no body
app.use(cors()); // Libera requisições de outras origens

// Rota para criar um pagamento
app.post('/api/doar-unico', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Validação simples
        if (!amount || amount <= 0) {
            return res.status(400).send({ error: 'Valor inválido' });
        }

        // Criar um PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Converte para centavos
            currency: currency || 'usd', // Padrão USD
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Falha ao criar pagamento' });
    }
});

// Rota raiz para testar
app.get('/', (req, res) => {
    res.send('Servidor Express com Stripe rodando!');
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
