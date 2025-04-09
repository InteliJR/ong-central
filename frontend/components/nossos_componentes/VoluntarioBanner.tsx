import { Button } from "../shadcnui/button";

function VoluntarioBanner() {
  return (
    <div
      className="w-full h-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: 'url(bg-banner.png)' }}
    >
      <div className="w-full md:w-4/6 px-4 md:pl-[7.5%] space-y-8 md:text-left text-center">
        <div className="space-y-6 text-white">
          <h1 id="donation-time" className="text-xl sm:text-2xl md:text-[3rem] font-bold">
            <strong>Por que ser um voluntário?</strong>
          </h1>
          <h3 className="text-lg sm:text-xl md:text-[2rem]">Benefícios do Voluntário</h3>
        </div>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base sm:text-lg md:text-[1.25rem] text-white">
            Ser voluntário é contribuir para uma sociedade mais justa e solidária, oferecendo tempo e habilidades para apoiar pessoas vulneráveis. Esse trabalho promove tanto o desenvolvimento social quanto o crescimento pessoal, fortalecendo valores como empatia, responsabilidade e respeito.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-[#DD5656] hover:bg-[#BA3E3E]  h-14 sm:h-16 md:h-20 w-80 sm:w-96 rounded-3xl text-lg sm:text-xl md:text-[2rem]">
              Quero ser Voluntário!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoluntarioBanner;
