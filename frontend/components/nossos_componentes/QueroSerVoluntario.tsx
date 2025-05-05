"use client"; // <-- Converte para Client Component
import { Button } from "@/components/shadcnui/button";
import { Input } from "@/components/shadcnui/input";
import { Textarea } from "@/components/shadcnui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/shadcnui/radio-group";
import { Label } from "@/components/shadcnui/label";
import Header from "../../components/nossos_componentes/Header";
import emailjs from "@emailjs/browser";
import { FormEvent } from "react";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_VOLUNTARIO_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function QueroSerVoluntario() {
  interface VolunteerFormData {
    titulo: string;
    nome: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    mensagem: FormDataEntryValue | null;
    telefone: FormDataEntryValue | null;
    tipo_voluntario: FormDataEntryValue | null;
  }

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Capturando os valores do formulário
    const formData = new FormData(event.currentTarget);
    const data: VolunteerFormData = {
      titulo: "Inscrição de Voluntário", // Adiciona título ao template
      nome: formData.get("nome"),
      email: formData.get("email"),
      mensagem: formData.get("mensagem"),
      telefone: formData.get("telefone"),
      tipo_voluntario: formData.get("tipo_voluntario"),
    };

    // Convertendo para um objeto com chaves string
    const formattedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value || ""])
    );

    // Envio para o EmailJS
    emailjs.send(SERVICE_ID || "", TEMPLATE_ID || "", formattedData, PUBLIC_KEY || "")
      .then((result) => {
        console.log(result.text);
        alert("Mensagem enviada com sucesso!");
      })
      .catch((error) => {
        console.error(error.text);
        alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
      });

    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Green Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-between px-4 pt-8 pb-4 max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <section id="volunteer-info" className="space-y-4 mb-12">
          <h1 className="text-2xl text-center">Se interessou pela causa?</h1>
          <h2 className="text-4xl text-center">
            Então, seja <span className="font-black">voluntário</span>!
          </h2>
        </section>

        {/* Volunteer Form */}
        <section id="volunteer-form" className="space-y-4">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            {/* Nome e Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo:</Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Fulano de Tal"
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

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="mensagem">Como você pode ajudar?</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                placeholder="Descreva como você pode ajudar a causa"
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Tipo de Voluntário */}
            <div className="space-y-2">
              <Label>Quer ser voluntário fixo ou temporário?</Label>
              <RadioGroup name="tipo_voluntario" defaultValue="Fixo">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Fixo" id="fixo" />
                  <Label htmlFor="fixo">Fixo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Temporário" id="temporario" />
                  <Label htmlFor="temporario">Temporário</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone para contato:</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                pattern="\(\d{2}\) \d{5}-\d{4}"
                className="w-full"
                required
              />
            </div>

            {/* Botão de Envio */}
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
    </div>
  );
}
