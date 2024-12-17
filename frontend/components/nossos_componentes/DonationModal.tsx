import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcnui/dialog';
import { Button } from '@/components/shadcnui/button';
import { Card } from '@/components/shadcnui/card';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcnui/radio-group';
import Image from 'next/image';

const DonationModal = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPIXQRCode, setShowPIXQRCode] = useState(false);

  const handleCreditCardDonation = async () => {
    try {
      // Create one-time donation
      const donationResponse = await fetch('http://localhost:3001/api/doar-unico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          amount 
        })
      });

      const donationData = await donationResponse.json();
      
      if (!donationResponse.ok) {
        throw new Error(donationData.message);
      }

      // Initialize Stripe
      const stripe = await import('@stripe/stripe-js').then(mod => mod.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
      
      // Confirm the PaymentIntent
      const { error } = await stripe.confirmCardPayment(donationData.clientSecret);

      if (error) {
        console.error('Erro no pagamento:', error);
        alert('Erro ao processar doação. Por favor, tente novamente.');
      } else {
        alert('Doação realizada com sucesso! Obrigado pelo seu apoio.');
      }

    } catch (error) {
      console.error('Erro na doação:', error);
      alert(`Erro: ${error.message}`);
    }
  };

  const handlePIXDonation = () => {
    setShowPIXQRCode(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
            <Image 
              src="/icone_2.svg" 
              alt='Quero doar agora' 
              width={96} 
              height={96} 
            />
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
        </DialogHeader>

        <div className="space-y-4">
          {showPIXQRCode ? (
            <div className="text-center">
              <Label>Escaneie o QR Code abaixo para realizar sua doação via PIX:</Label>
              <Image 
                src="/qrcode.png" 
                alt="QR Code para doação PIX" 
                width={200} 
                height={200} 
                className="mx-auto mt-4"
              />
              <Button onClick={() => setShowPIXQRCode(false)} className="mt-4 bg-gray-600 hover:bg-gray-700">
                Voltar
              </Button>
            </div>
          ) : (
            <>
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

              {/* Payment Method Selection */}
              <div>
                <Label>Método de Pagamento</Label>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod} 
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Cartão de Crédito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix">PIX</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 mt-4">
                {paymentMethod === 'credit-card' ? (
                  <Button 
                    onClick={handleCreditCardDonation} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!name || !email || !amount}
                  >
                    Doar com Cartão de Crédito
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePIXDonation} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!name || !email || !amount}
                  >
                    Gerar QR Code PIX
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;