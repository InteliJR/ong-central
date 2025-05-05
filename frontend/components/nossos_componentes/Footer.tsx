"use client"; // <-- Converte para Client Component

import { Button } from "../shadcnui/button";
import { Input } from "../shadcnui/input";
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function Footer() {

  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
      nome: HTMLInputElement;
      email: HTMLInputElement;
      mensagem: HTMLTextAreaElement;
    };
  }

  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault();
    emailjs.sendForm(SERVICE_ID || '', TEMPLATE_ID || '', event.target, PUBLIC_KEY || '')
      .then((result) => {
        console.log(result.text);
        alert('Mensagem enviada com sucesso!');
      }, (error) => {
        console.log(error.text);
        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
      });
    event.target.reset();
  };

  return (
    <footer className="bg-[#4CAF50] py-20 text-white sm:px-16 px-4">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-center">
        {/* Seção de Informações */}
        <div className="w-4/5 sm:w-3/5 md:w-2/5">
          <div className="text-2xl pb-12 text-center sm:text-left">
            <h2><strong>Se interessou pela causa?</strong></h2>
            <h2>Entre em contato com a central!</h2>
          </div>
          <div className="text-base space-y-4">
            <div className="flex space-x-5 justify-center sm:justify-start">
              <img src="Phone.svg" alt="Telefone" />
              <p>(31) 3939-3990</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <img src="Mail (1).svg" alt="Email" />
              <p>csolidariedade@yahoo.com.br</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <img src="WhatsApp.svg" alt="WhatsApp" />
              </a>
              <p>(31) 98986-7352</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <a href="https://instagram.com/centraldasolidariedade" target="_blank" rel="noopener noreferrer">
                <img src="Instagram.svg" alt="Instagram" />
              </a>
              <p>centralsolidariedade</p>
            </div>
          </div>
        </div>

        {/* Seção de Contato */}
        <div className="w-4/5 sm:w-3/5 md:w-2/5">
          <h2 className="text-2xl pb-8 text-center sm:text-left"><strong>Contato:</strong></h2>
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-lg text-left sm:text-left">
                Nome:
              </label>
              <Input 
                id="nome"
                name="nome" // Adicionado atributo name
                type="text"
                placeholder="Digite seu nome"
                className="w-full bg-white h-10 text-black"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg text-left sm:text-left">
                Email:
              </label>
              <Input 
                type="email" // Corrigido tipo
                id="email" 
                name="email" // Adicionado atributo name
                placeholder="Digite seu email"
                className="w-full bg-white h-10 text-black"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="mensagem" className="block text-lg text-left sm:text-left">
                Mensagem:
              </label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                className="w-full rounded-md border text-black border-input px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px] bg-white"
                placeholder="Digite sua mensagem"
                required
              />
            </div>
            <div className="flex justify-center w-full sm:justify-start ">
              <Button type="submit" className="bg-[#DD5656] hover:bg-[#BA3E3E] h-14 w-full rounded-xl text-[20px]">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
