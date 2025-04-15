"use client";
import React, { useState } from 'react';
import { Button } from "@/components/shadcnui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcnui/dialog";
import { Input } from "@/components/shadcnui/input";
import { Label } from "@/components/shadcnui/label";
import { Card } from "@/components/shadcnui/card";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Image from 'next/image';

// Substitua pela sua Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RegularDonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Use Next.js API route as a proxy instead of calling external API directly
      const response = await axios.post('/api/proxy/subscription', {
        name: formData.name,
        email: formData.email,
        amount: parseFloat(formData.amount) * 100 // Converter para centavos
      });

      const { sessionId } = response.data;

      // Redireciona para o Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        setError(stripeError.message);
        console.error(stripeError);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao processar assinatura');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Card que aciona o modal */}
      <Card 
        onClick={() => setIsOpen(true)} 
        className="flex flex-col justify-center items-center p-6 w-full h-56 text-center space-y-4 hover:shadow-lg transition-shadow bg-white cursor-pointer "
      >
        <Image src="/icone_1.svg" alt="Quero doar agora" width={96} height={96} />
        <div>
          <p className="font-medium">Quero ser</p>
          <p className="font-bold">doador regular</p>
        </div>
        <p className='text-[8px]'>Se for assinante e quiser cancelar a assinatura, ligue para (31) 3939-3990</p>
      </Card>

      {/* Modal para cadastro de doador regular */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Torne-se um Doador Regular</DialogTitle>
            <DialogDescription>
              Preencha seus dados para começar a contribuir mensalmente
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor da Doação Mensal (R$)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="10"
                step="5"
                placeholder="Valor mínimo R$10"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Iniciar Assinatura'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
