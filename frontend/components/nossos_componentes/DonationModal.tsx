import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/shadcnui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/shadcnui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcnui/tabs';
import { Button } from '@/components/shadcnui/button';
import { Card } from '@/components/shadcnui/card';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Image from 'next/image';

// Initialize Stripe with public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DonationForm = ({ amount, name, email, setAmount, setName, setEmail, onPaymentSuccess, onPaymentConfirm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleDonation = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Request client_secret from backend
      const response = await fetch('http://localhost:3001/api/doar-unico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, amount }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) throw new Error('Error generating client secret');

      // Confirm payment using CardElement
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (error) {
        console.error(error.message);
        setPaymentStatus('failed');
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        onPaymentSuccess();
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setAmount('');
    setName('');
    setEmail('');
    setPaymentStatus(null);
  };

  return (
    <>
      {/* Confirmation Dialog Before Payment */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Doação</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a fazer uma doação de R${amount}. 
              Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setIsConfirmOpen(false);
              onPaymentConfirm();
              handleDonation();
            }}>
              Confirmar Doação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Result Dialog */}
      <AlertDialog open={paymentStatus !== null} onOpenChange={() => {
        if (paymentStatus !== null) {
          resetForm();
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {paymentStatus === 'success' ? 'Doação Realizada' : 'Erro no Pagamento'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {paymentStatus === 'success' 
                ? 'Sua doação foi processada com sucesso. Muito obrigado pelo seu apoio!' 
                : 'Houve um problema ao processar sua doação. Por favor, tente novamente.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetForm}>
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <Label htmlFor="amount">Valor da Doação</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Digite o valor (R$)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2"
            min="5"
            step="5"
          />
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Stripe Card Element */}
        <div>
          <Label>Dados do Cartão</Label>
          <div className="border border-gray-300 rounded p-2 mt-2">
            <CardElement />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={() => setIsConfirmOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 mt-4"
          disabled={isProcessing || !stripe || !elements || !amount || !name || !email}
        >
          {isProcessing ? 'Processando...' : 'Doar com Cartão de Crédito'}
        </Button>
      </div>
    </>
  );
};

const PixDonationForm = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Image 
        src="/qrcode.png" 
        alt="QR Code PIX" 
        width={300} 
        height={300} 
        className="mx-auto"
      />
      <p className="text-sm text-gray-600 text-center">
        Escaneie o QR Code com seu aplicativo de banco para realizar a doação
      </p>
    </div>
  );
};

const DonationModal = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handlePaymentSuccess = () => {
    // Optional: Add any additional logic after successful payment
    console.log('Payment successful');
  };

  const handlePaymentConfirm = () => {
    // Optional: Add any pre-payment confirmation logic
    console.log('Payment confirmed');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
            <Image src="/icone_2.svg" alt="Quero doar agora" width={96} height={96} />
          </div>
          <div>
            <p className="font-medium">Quero</p>
            <p className="font-bold">doar agora</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Faça sua doação</DialogTitle>
          <DialogDescription>
            Sua contribuição faz a diferença. Escolha a forma de pagamento.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="credit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credit">Cartão de Crédito</TabsTrigger>
            <TabsTrigger value="pix">PIX</TabsTrigger>
          </TabsList>
          <TabsContent value="credit">
            {/* Stripe Elements Wrapper */}
            <Elements stripe={stripePromise}>
              <DonationForm
                amount={amount}
                name={name}
                email={email}
                setAmount={setAmount}
                setName={setName}
                setEmail={setEmail}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentConfirm={handlePaymentConfirm}
              />
            </Elements>
          </TabsContent>
          <TabsContent value="pix">
            <PixDonationForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;