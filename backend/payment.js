require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Logger Configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parser
app.use(express.json());
app.use(express.raw({ type: 'application/json' }));

// Input Validation Middleware
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Customer Registration Endpoint
app.post('/api/cadastrar-doador', async (req, res) => {
    const { name, email } = req.body;

    // Validate inputs
    if (!name || !email) {
        return res.status(400).json({ 
            message: 'Nome e email são obrigatórios' 
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            message: 'Email inválido' 
        });
    }

    try {
        // Check if customer already exists
        const existingCustomers = await stripe.customers.list({ email });
        
        if (existingCustomers.data.length > 0) {
            return res.status(409).json({ 
                message: 'Cliente já cadastrado', 
                customerId: existingCustomers.data[0].id 
            });
        }

        // Create new customer
        const customer = await stripe.customers.create({
            name,
            email,
            metadata: { 
                registeredAt: new Date().toISOString() 
            }
        });

        logger.info(`Novo doador cadastrado: ${email}`);

        res.status(201).json({ 
            message: 'Cliente cadastrado com sucesso!', 
            customerId: customer.id 
        });
    } catch (error) {
        logger.error(`Erro no cadastro de doador: ${error.message}`);
        res.status(500).json({ 
            message: 'Erro ao cadastrar cliente', 
            error: 'Erro interno do servidor' 
        });
    }
});

// Payment Method Association Endpoint
app.post('/api/associar-metodo-pagamento', async (req, res) => {
    const { paymentMethodId, name, email } = req.body;

    // Validate inputs
    if (!paymentMethodId || !name || !email) {
        return res.status(400).json({ 
            message: 'Todos os campos são obrigatórios' 
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            message: 'Email inválido' 
        });
    }

    try {
        // Find or create customer
        let customers = await stripe.customers.list({ email });
        let customer;

        if (customers.data.length === 0) {
            customer = await stripe.customers.create({ name, email });
        } else {
            customer = customers.data[0];
        }

        // Attach payment method
        await stripe.paymentMethods.attach(paymentMethodId, { 
            customer: customer.id 
        });

        // Update default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: { 
                default_payment_method: paymentMethodId 
            }
        });

        logger.info(`Método de pagamento associado para: ${email}`);

        res.status(200).json({ 
            message: 'Método de pagamento associado com sucesso!',
            customerId: customer.id 
        });
    } catch (error) {
        logger.error(`Erro na associação de método de pagamento: ${error.message}`);
        res.status(500).json({ 
            message: 'Erro ao associar método de pagamento', 
            error: 'Erro interno do servidor' 
        });
    }
});

// Subscription Creation Endpoint
app.post('/api/criar-assinatura', async (req, res) => {
    const { customerId, priceId } = req.body;

    // Validate inputs
    if (!customerId || !priceId) {
        return res.status(400).json({ 
            message: 'Customer ID e Price ID são obrigatórios' 
        });
    }

    try {
        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice']
        });

        logger.info(`Nova assinatura criada para customer: ${customerId}`);

        res.status(201).json({ 
            message: 'Assinatura criada com sucesso!', 
            subscriptionId: subscription.id,
            invoiceUrl: subscription.latest_invoice.hosted_invoice_url
        });
    } catch (error) {
        logger.error(`Erro na criação de assinatura: ${error.message}`);
        res.status(500).json({ 
            message: 'Erro ao criar assinatura', 
            error: 'Erro interno do servidor' 
        });
    }
});

// Subscription Cancellation Endpoint
app.post('/api/cancelar-assinatura', async (req, res) => {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ 
            message: 'Subscription ID é obrigatório' 
        });
    }

    try {
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

        logger.info(`Assinatura cancelada: ${subscriptionId}`);

        res.status(200).json({ 
            message: 'Assinatura cancelada com sucesso', 
            canceledAt: canceledSubscription.canceled_at 
        });
    } catch (error) {
        logger.error(`Erro no cancelamento de assinatura: ${error.message}`);
        res.status(500).json({ 
            message: 'Erro ao cancelar assinatura', 
            error: 'Erro interno do servidor' 
        });
    }
});

// One-Time Donation Endpoint
app.post('/api/doar-unico', async (req, res) => {
    const { email, name, amount } = req.body;

    // Validate inputs
    if (!email || !name || !amount) {
        return res.status(400).json({ 
            message: 'Email, nome e valor são obrigatórios' 
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            message: 'Email inválido' 
        });
    }

    // Validate amount (ensure it's a positive number and in cents)
    const amountInCents = Math.round(Number(amount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
        return res.status(400).json({ 
            message: 'Valor de doação inválido' 
        });
    }

    try {
        // Find or create customer
        let customers = await stripe.customers.list({ email });
        let customer;

        if (customers.data.length === 0) {
            customer = await stripe.customers.create({ 
                name, 
                email 
            });
        } else {
            customer = customers.data[0];
        }

        // Create a PaymentIntent for a one-time donation
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'brl',
            customer: customer.id,
            payment_method_types: ['card'],
            metadata: {
                donation_type: 'one-time',
                donor_name: name,
                donor_email: email
            }
        });

        logger.info(`One-time donation initiated for: ${email}`);

        res.status(200).json({ 
            message: 'Doação criada com sucesso!', 
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        logger.error(`Erro na doação única: ${error.message}`);
        res.status(500).json({ 
            message: 'Erro ao processar doação', 
            error: 'Erro interno do servidor' 
        });
    }
});

// Create Checkout Session for Recurring Donation
app.post('/api/criar-sessao-doacao', async (req, res) => {
    const { customerId, amount, email } = req.body;

    try {
        // Create a Price object dynamically
        const price = await stripe.prices.create({
            unit_amount: amount, // Amount in cents
            currency: 'brl',
            recurring: {
                interval: 'month'
            },
            product_data: {
                name: 'Doação Mensal'
            }
        });

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer: customerId,
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            success_url: `http://localhost:3000/`,
            cancel_url: `http://localhost:3000/`,
            subscription_data: {
                metadata: {
                    email: email
                }
            }
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        res.status(500).json({ 
            message: 'Erro ao processar doação', 
            error: error.message 
        });
    }
});

// Webhook Endpoint
app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        logger.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific event types
    switch (event.type) {
        case 'invoice.payment_succeeded':
            const paymentSucceeded = event.data.object;
            logger.info(`Pagamento bem-sucedido: ${paymentSucceeded.id}`);
            // Perform any necessary actions (e.g., update user status)
            break;

        case 'invoice.payment_failed':
            const paymentFailed = event.data.object;
            logger.warn(`Falha no pagamento: ${paymentFailed.id}`);
            // Implement retry logic or send notification
            break;

        case 'customer.subscription.deleted':
            const subscriptionDeleted = event.data.object;
            logger.info(`Assinatura cancelada: ${subscriptionDeleted.id}`);
            // Handle subscription cancellation
            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            logger.info(`Doação única bem-sucedida: ${paymentIntent.id}`);
            // Optional: Add custom logic like sending a thank you email or updating a donation tracker
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            logger.warn(`Falha na doação única: ${failedPayment.id}`);
            // Optional: Implement retry logic or send notification
            break;

        default:
            logger.info(`Evento não tratado: ${event.type}`);
    }

    res.status(200).send();
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ 
        message: 'Erro interno do servidor', 
        error: process.env.NODE_ENV === 'production' ? 'Erro inesperado' : err.message 
    });
});

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;