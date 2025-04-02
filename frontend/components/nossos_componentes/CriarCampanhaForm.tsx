"use client";
import React, { useState } from 'react';
import { Button } from "@/components/shadcnui/button";
import { Input } from "@/components/shadcnui/input";
import { Label } from "@/components/shadcnui/label";
import { Textarea } from "@/components/shadcnui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/shadcnui/dialog";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormData {
  title: string;
  subtitle: string;
  pixKey: string;
}

interface FormStatus {
  success: boolean;
  message: string;
}

const CriarCampanhaForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    pixKey: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    
    try {
      // Validar o formulário
      if (!formData.title) {
        throw new Error('Preencha o título da campanha');
      }
      
      // Enviar para o backend
      const response = await fetch('http://localhost:3001/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar campanha');
      }
      
      // Sucesso
      setStatus({
        success: true,
        message: 'Campanha criada com sucesso!'
      });
      
      // Limpar formulário
      setFormData({
        title: '',
        subtitle: '',
        pixKey: ''
      });
      
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
      setStatus({
        success: false,
        message: error.message || 'Ocorreu um erro ao criar a campanha'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Criar Nova Campanha</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova campanha de arrecadação.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Campanha *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Campanha de Inverno 2023"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo/Descrição</Label>
            <Textarea
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Descreva brevemente o objetivo da campanha"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pixKey">Chave PIX (opcional)</Label>
            <Input
              id="pixKey"
              name="pixKey"
              value={formData.pixKey}
              onChange={handleChange}
              placeholder="exemplo@email.com"
            />
          </div>
          
          {status && (
            <div className={`p-3 rounded-md flex items-start gap-2 ${
              status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <p className="text-sm">{status.message}</p>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Criando...' : 'Criar Campanha'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CriarCampanhaForm;
