"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/shadcnui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/shadcnui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcnui/tabs';
import { Button } from '@/components/shadcnui/button';
import { Card } from '@/components/shadcnui/card';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Image from 'next/image';

// Initialize Stripe with public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Interface para as propriedades do DonationModal
interface DonationModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  campaignTitle?: string;
}

const DonationForm = ({ amount, name, email, setAmount, setName, setEmail, onPaymentSuccess, onPaymentConfirm, campaignTitle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Adicionar estado para mensagem de erro
  
  // Estados para controle de erro dos campos
  const [cardNumberError, setCardNumberError] = useState(null);
  const [cardExpiryError, setCardExpiryError] = useState(null);
  const [cardCvcError, setCardCvcError] = useState(null);

  const handleDonation = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null); // Reset any previous error messages

    try {
      // Ensure amount is a number and convert to integer (cents)
      const amountInCents = Math.round(parseFloat(amount) * 100);
      
      if (isNaN(amountInCents) || amountInCents <= 0) {
        throw new Error('Valor de doação inválido');
      }

      // Request client_secret from backend with improved error handling
      const response = await fetch('http://localhost:3001/api/doar-unico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          amount: amountInCents, // Send in cents
          currency: 'brl' 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro do servidor: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.clientSecret) {
        throw new Error('Resposta do servidor não contém client_secret');
      }

      // Obter cada elemento separadamente
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        throw new Error('Elementos do cartão não encontrados');
      }

      // Confirmar pagamento usando os elementos separados
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

      if (error) {
        console.error('Erro na confirmação do pagamento:', error);
        setErrorMessage(error.message);
        setPaymentStatus('error');
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        onPaymentSuccess && onPaymentSuccess();
      } else {
        console.warn('Status inesperado do paymentIntent:', paymentIntent.status);
        setErrorMessage(`Status inesperado: ${paymentIntent.status}`);
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Erro no processamento do pagamento:', error);
      setErrorMessage(error.message || 'Erro desconhecido ao processar pagamento');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
      setIsConfirmOpen(false);
    }
  };

  const resetForm = () => {
    setAmount('');
    setName('');
    setEmail('');
    setPaymentStatus(null);
    
    // Limpar elementos do Stripe se existirem
    const cardNumberElement = elements?.getElement(CardNumberElement);
    const cardExpiryElement = elements?.getElement(CardExpiryElement);
    const cardCvcElement = elements?.getElement(CardCvcElement);
    
    cardNumberElement?.clear();
    cardExpiryElement?.clear();
    cardCvcElement?.clear();
  };

  // Função para lidar com as alterações nos campos do cartão
  const handleCardChange = (event, setError) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Estilo para os campos do cartão
  const cardElementStyle = {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  };

  return (
    <>
      {/* Confirmation Dialog Before Payment */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Doação</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a fazer uma doação de R${amount}
              {campaignTitle ? ` para a campanha "${campaignTitle}"` : ''}.
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
                ? `Sua doação foi processada com sucesso${campaignTitle ? ` para a campanha "${campaignTitle}"` : ''}. Muito obrigado pelo seu apoio!` 
                : errorMessage || 'Houve um problema ao processar sua doação. Por favor, tente novamente.'}
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

        {/* Stripe Card Elements - Separados */}
        <div>
          <Label>Dados do Cartão</Label>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="cardNumber" className="text-sm">Número do Cartão</Label>
              <div className="border border-gray-300 rounded p-2 mt-1">
                <CardNumberElement 
                  id="cardNumber"
                  options={{
                    style: cardElementStyle,
                    placeholder: '1234 1234 1234 1234',
                  }}
                  onChange={(e) => handleCardChange(e, setCardNumberError)}
                />
              </div>
              {cardNumberError && <p className="text-red-500 text-xs mt-1">{cardNumberError}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardExpiry" className="text-sm">Data de Validade</Label>
                <div className="border border-gray-300 rounded p-2 mt-1">
                  <CardExpiryElement 
                    id="cardExpiry"
                    options={{
                      style: cardElementStyle,
                      placeholder: 'MM/AA',
                    }}
                    onChange={(e) => handleCardChange(e, setCardExpiryError)}
                  />
                </div>
                {cardExpiryError && <p className="text-red-500 text-xs mt-1">{cardExpiryError}</p>}
              </div>
              
              <div>
                <Label htmlFor="cardCvc" className="text-sm">CVC</Label>
                <div className="border border-gray-300 rounded p-2 mt-1">
                  <CardCvcElement 
                    id="cardCvc"
                    options={{
                      style: cardElementStyle,
                      placeholder: '123',
                    }}
                    onChange={(e) => handleCardChange(e, setCardCvcError)}
                  />
                </div>
                {cardCvcError && <p className="text-red-500 text-xs mt-1">{cardCvcError}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={() => setIsConfirmOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 mt-4"
          disabled={isProcessing || !stripe || !elements || !amount || !name || !email || cardNumberError || cardExpiryError || cardCvcError}
        >
          {isProcessing ? 'Processando...' : 'Doar com Cartão de Crédito'}
        </Button>
      </div>
    </>
  );
};

// Componente para doação via PIX
const PixDonationForm = ({ campaignTitle }) => {
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
        Escaneie o QR Code com seu aplicativo bancário para realizar a doação
        {campaignTitle ? ` para a campanha "${campaignTitle}"` : ''}
      </p>
    </div>
  );
};

// Componente principal do modal de doação
const DonationModal = ({ isOpen = false, onOpenChange, campaignTitle }: DonationModalProps) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(isOpen);
  
  // Sincroniza o estado interno com as props
  React.useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  
  // Funções de callback
  const handlePaymentSuccess = () => {
    console.log('Payment successful');
    // Lógica adicional após pagamento bem-sucedido
    setTimeout(() => {
      handleOpenChange(false);
    }, 2000);
  };
  
  const handlePaymentConfirm = () => {
    console.log('Payment confirmed');
    // Lógica de pré-confirmação de pagamento (opcional)
  };
  
  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      {!onOpenChange && (
        <DialogTrigger asChild>
          <Card className="flex flex-col justify-center items-center p-6 w-1/2 h-56 text-center space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="mx-auto bg-white rounded-full flex items-center justify-center">
              <Image src="/icone_2.svg" alt="Quero doar agora" width={96} height={96} />
            </div>
            <div>
              <p className="font-medium">Quero</p>
              <p className="font-bold">doar agora</p>
            </div>
          </Card>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {campaignTitle ? `Doação para ${campaignTitle}` : "Faça sua doação"}
          </DialogTitle>
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
                campaignTitle={campaignTitle}
              />
            </Elements>
          </TabsContent>
          <TabsContent value="pix">
            <PixDonationForm campaignTitle={campaignTitle} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;