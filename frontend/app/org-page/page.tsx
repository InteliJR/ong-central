import Header from "@/components/nossos_componentes/Header";
import { Label } from "@/components/shadcnui/label"
import { Button } from "@/components/shadcnui/button"
import { Input } from "@/components/shadcnui/input"
import { RadioGroup, RadioGroupItem } from "@/components/shadcnui/radio-group"
import Footer from "@/components/nossos_componentes/Footer";
import { Textarea } from "@/components/shadcnui/textarea"

export default function OrgPage() {
  return (
    <div>
      <Header />
      <main>
        <section>
            <div className="text-white w-full p-32" style={{backgroundImage: 'url(volunteer.png)' }}>
                <div className="text-white w-full md:w-4/6 space-y-8 md:text-left text-center">
                    <h3 className="text-lg sm:text-xl md:text-[2rem] font-bold">
                        Organizações
                    </h3>
                    <h1 className="text-xl sm:text-2xl md:text-[3rem] font-bold">
                        Central da Solidariedade
                    </h1>
                    <p className="gap-4 text-base sm:text-lg md:text-[1.25rem]">
                        Na Central, temos o compromisso em garantir a expansão de nossas ações para o máximo de pessoas. 
                    </p>
                    <p className="gap-4 text-base sm:text-lg md:text-[1.25rem]">
                        Acesse a nossa plataforma e tenha acesso a um painél com todas as pessoas beneficiadas pelas ações da rede da Central.
                    </p>
                </div>
                <div className="mt-6 flex gap-8 py-8">
                <button className="px-8 py-6 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors text-lg font-semibold">
                    Já sou parte da Central!
                </button>
                <button className="px-6 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition-colors text-lg font-semibold">
                    Cadastre-se
                </button>
                </div>
            </div>
        </section>

        <section className="space-y-6 flex-grow flex flex-col justify-between px-4 py-8 max-w-5xl mx-auto w-full">
            <h2 className="text-2xl text-center">Ainda não faz parte da Central?</h2>
            <h3 className="text-4xl text-center mb-8">
                Preencha esse <span className="font-black">formulário</span>!
            </h3>

            <form className="space-y-6">
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

                <div className="flex justify-end">
                <Button
                    type="submit"
                    className="w-full md:w-auto bg-red-400 hover:bg-red-500 text-white font-bold py-6 px-8 rounded text-lg"
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
