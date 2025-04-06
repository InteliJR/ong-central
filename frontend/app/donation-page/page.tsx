"use client";
import Image from 'next/image'
import { Card } from "@/components/shadcnui/card"
import { Button } from "@/components/shadcnui/button"
import { Input } from "@/components/shadcnui/input"
import { Textarea } from "@/components/shadcnui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/shadcnui/radio-group"
import { Label } from "@/components/shadcnui/label"
import Header from '../../components/nossos_componentes/Header'
import emailjs from '@emailjs/browser';
import DonationModal from '@/components/nossos_componentes/DonationModal';
import RegularDonationModal from '@/components/nossos_componentes/RegularDonationModal';
import Footer from '@/components/nossos_componentes/Footer';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_DONATION;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DONATION;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function DonationPage() {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    
    emailjs.sendForm(SERVICE_ID || '', TEMPLATE_ID || '', target, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        alert('Mensagem enviada com sucesso!');
        target.reset();
      }, (error) => {
        console.log(error.text);
        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
      });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col justify-between px-4 py-8 max-w-5xl mx-auto w-full">
        {/* Donation Options Section */}
        <section id="donation-money" className="space-y-6 mb-12 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-center">Se interessou pela causa? <br></br><p className='text-4xl font-medium'>Então faça uma doação</p></h1>
          
          <div className="flex flex-row w-full items-center justify-center gap-6">
            {/* Donation Modals */}
            <DonationModal />
            <RegularDonationModal />

          </div>
        </section>

        {/* Item Donation Section */}
        <section id="donation-items" className="space-y-6">
          <h2 className="text-2xl text-center">Não pode contribuir financeiramente?<br></br> <p className='text-4xl font-medium'>Aceitamos doações de itens</p></h2>
          

          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="item">Item que deseja doar:</Label>
                <Input
                  id="item"
                  name="item"
                  placeholder="Camisa, sapato, cobertor..."
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu melhor e-mail:</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="fulanodetal@gmail.com"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição do estado do item:</Label>
              <Textarea
                id="descricao"
                name="descricao"
                placeholder="A camisa é do tamanho P infantil vermelha e branca, com estampa de desenho animado, e foi utilizada somente por 1 mês."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Você pode entregar o item em Rua MMDC, São Paulo, Butantã?</Label>
              <RadioGroup name="entrega_local" defaultValue="sim">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sim" id="sim" />
                  <Label htmlFor="sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Não" id="nao" />
                  <Label htmlFor="nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Seu endereço:</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Rua Voluntariado, 115, Bairro da Solidariedade, São Paulo-SP, 55555-555"
                className="w-full"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Enviar
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}