import { Button } from "../shadcnui/button";
import { Input } from "../shadcnui/input";

function Footer() {
  return (
    <footer className="bg-[#4CAF50] py-20 text-white">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-center">
        {/* Seção de Informações */}
        <div className="w-4/5 sm:w-3/5 md:w-2/5">
          <div className="text-2xl pb-12 text-center sm:text-left">
            <h2><strong>Se interessou pela causa?</strong></h2>
            <h2>Entre em contato com a central!</h2>
          </div>
          <div className="text-base space-y-4">
            <div className="flex space-x-5 justify-center sm:justify-start">
              <img src="Phone.svg" alt="icon" />
              <p>(11) 99999-9999</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <img src="Mail (1).svg" alt="icon" />
              <p>centraldasolidariedade@gmail.com</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <a href="">
                <img src="WhatsApp.svg" alt="icon" />
              </a>
              <p>(11) 8999-9999</p>
            </div>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <a href="">
                <img src="Instagram.svg" alt="icon" />
              </a>
              <p>centraldasolidariedade</p>
            </div>
          </div>
        </div>

        <div className="w-4/5 sm:w-3/5 md:w-2/5">
          <h2 className="text-2xl pb-8 text-center sm:text-left"><strong>Contato:</strong></h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-lg text-center sm:text-left">
                Nome:
              </label>
              <Input 
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                className="w-full bg-white h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg text-center sm:text-left">
                Email:
              </label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Digite seu email"
                className="w-full bg-white h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="mensagem" className="block text-lg text-center sm:text-left">
                Mensagem:
              </label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                className="w-full rounded-md border border-input px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px] bg-white"
                placeholder="Digite sua mensagem"
                required
              />
            </div>
            <div className="flex justify-center sm:justify-start">
              <Button className="bg-[#DD5656] hover:bg-[#BA3E3E] h-14 w-56 rounded-xl text-[20px]">Enviar</Button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
