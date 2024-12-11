require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
app.use(bodyParser.json())


app.post('/api/cadastrar-doador', async (req, res) => {
    const { name, email } = req.body
    try{
        const customer = await stripe.customers.create({
            name,
            email
        })
        res.status(200).json({ message: 'Cliente cadastrado com sucesso!', customerId: customer.id })
    } catch (error){
        res.status(500).json({ message: 'Erro ao cadastrar cliente', error: error.message })
    }
})

app.post('/api/associar-metodo-pagamento', async(req, res) => {
    const { paymentMethodId, name, email } = req.body;

    try{
        let customer = await stripe.customers.list({ email });
        if (customer.data.length === 0) {
            customer = await stripe.customers.create({ name, email });
        } else {
            customer = customer.data[0];
        }
        await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
        await stripe.customers.update(customer.id, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        res.status(200).json({ message: 'Método de pagamento associado com sucesso!' });
    }catch(error){  
        console.error('Erro ao associar método de pagamento:', error);
        res.status(500).json({ message: 'Erro ao associar método de pagamento', error: error.message });
    }
})

app.post('/api/criar-assinatura', async (req, res) => {
    const { customerId, priceId } = req.body;
  
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
        });
  
        res.status(200).json({ message: 'Assinatura criada com sucesso!', subscriptionId: subscription.id });
    } catch (error) {
        console.error('Erro ao criar assinatura:', error);
        res.status(500).json({ message: 'Erro ao criar assinatura', error: error.message });
    }
});

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  
        if (event.type === 'invoice.payment_succeeded') {
            const invoice = event.data.object;
            console.log('Pagamento bem-sucedido:', invoice);
        } else if (event.type === 'invoice.payment_failed') {
            const invoice = event.data.object;
            console.log('Falha no pagamento:', invoice);
        }
  
        res.status(200).send();
    } catch (error) {
        console.error('Erro no webhook:', error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001.'));