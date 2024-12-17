"use client";
import React, { useState } from 'react';
import { Button } from "@/components/shadcnui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/shadcnui/dialog";
import { Input } from "@/components/shadcnui/input";
import { Label } from "@/components/shadcnui/label";
import { Card } from "@/components/shadcnui/card";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Ensure to replace with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RegularDonationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: ''
    });
    const [error, setError] = useState(null);

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

        try {
            // Step 1: Create Stripe Customer
            const customerResponse = await axios.post('http://localhost:3001/api/cadastrar-doador', {
                name: formData.name,
                email: formData.email
            });

            // Step 2: Create Checkout Session
            const stripe = await stripePromise;
            const checkoutSessionResponse = await axios.post('http://localhost:3001/api/criar-sessao-doacao', {
                customerId: customerResponse.data.customerId,
                amount: parseFloat(formData.amount) * 100, // Convert to cents
                email: formData.email
            });

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSessionResponse.data.sessionId
            });

            if (result.error) {
                setError(result.error.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao processar doação');
            console.error(err);
        }
    };

    return (
        <>
            {/* Modal Trigger on Donation Card */}
            <Card 
                onClick={() => setIsOpen(true)} 
                className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow bg-green-50 cursor-pointer"
            >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M12 22s-8-4.5-8-11.8A6 6 0 0 1 12 5a6 6 0 0 1 8 5.7c0 7.3-8 11.8-8 11.8z"/>
                        <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-medium">Quero ser</p>
                    <p className="font-bold">doador regular</p>
                </div>
            </Card>

            {/* Donation Signup Modal */}
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
                        >
                            Iniciar Assinatura
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
