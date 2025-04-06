import Header from "@/components/nossos_componentes/Header";
import { Label } from "@/components/shadcnui/label"
import { Button } from "@/components/shadcnui/button"
import { Input } from "@/components/shadcnui/input"
import { RadioGroup, RadioGroupItem } from "@/components/shadcnui/radio-group"
import Footer from "@/components/nossos_componentes/Footer";
import { Textarea } from "@/components/shadcnui/textarea"
import Image from "next/image";

export default function OrgPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/volunteer.jpg" 
              alt="Volunteers working together" 
              fill 
              priority
              className="object-cover w-full h-full brightness-50"
              sizes="100vw"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 px-4 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 text-white">
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Organizações
              </h3>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Central da Solidariedade
              </h1>
              <div className="space-y-4 max-w-2xl">
                <p className="text-base sm:text-lg md:text-xl">
                  Na Central, temos o compromisso em garantir a expansão de nossas ações para o máximo de pessoas.
                </p>
                <p className="text-base sm:text-lg md:text-xl">
                  Acesse a nossa plataforma e tenha acesso a um painél com todas as pessoas beneficiadas pelas ações da rede da Central.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6">
                <Button className="px-6 py-5 bg-red-500 hover:bg-red-600 text-white text-base md:text-lg rounded-md font-semibold">
                  Já sou parte da Central!
                </Button>
                <Button className="px-6 py-5 bg-teal-500 hover:bg-teal-600 text-white text-base md:text-lg rounded-md font-semibold">
                  Cadastre-se
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 px-4 py-12 md:py-16 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl text-center">Ainda não faz parte da Central?</h2>
          <h3 className="text-3xl md:text-4xl text-center font-bold mb-8">
            Preencha esse <span className="font-black">formulário</span>!
          </h3>

          <form className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organizacao" className="font-semibold">Qual o nome da sua organização?</Label>
                <Input
                  id="organizacao"
                  name="organizacao"
                  placeholder="Organização Voluntária"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Qual o seu email institucional?</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="organizacao@solidariedade.ong"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo" className="font-semibold">Por que você quer fazer parte da Central?</Label>
              <Textarea
                id="motivo"
                name="motivo"
                placeholder="Quero me juntar à Central para fazer uma rede com várias organizações e conseguir expandir o impacto das ações da rede."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="font-semibold">Onde vocês operam como sede?</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Rua Voluntariado, 115, Bairro da Solidariedade, São Paulo-SP, 55555-555"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acoes" className="font-semibold">Quais ações vocês já desenvolvem? Conte o impacto delas:</Label>
              <Textarea
                id="acoes"
                name="acoes"
                placeholder="Desenvolvemos mensalmente uma doação de roupas e cestas básicas para 20 famílias. Além disso, nos meses de Outubro arrecadamos cerca de 120 brinquedos para entregar para 120 crianças no Bairro do Voluntário."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex justify-center md:justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded text-lg"
              >
                Enviar
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
