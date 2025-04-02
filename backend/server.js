require('dotenv').config();
const app = require('./src/app');

// Verificação das variáveis de ambiente necessárias
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('\x1b[31m%s\x1b[0m', 'ERRO: Variável de ambiente STRIPE_SECRET_KEY não está definida!');
  console.error('\x1b[33m%s\x1b[0m', 'Por favor, crie um arquivo .env baseado no .env.example e defina sua chave Stripe.');
  process.exit(1);
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
