import Banner from "@/components/nossos_componentes/Banner";
import Header from "@/components/nossos_componentes/Header";
import { Button } from "@/components/shadcnui/button";
import Image from "next/image";

function Cabecalho() {
  return (
    <>
      <Header />
      <Banner />
      <div className="w-full py-8 md:py-12 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Textos */}
          <div className="w-full md:w-3/5 flex flex-col justify-center gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left">
              Missão, Visão e Valores
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-left">
              Centralizar e organizar ações de assistência social com apoio de
              entidades, voluntários e parceiros, promovendo o bem-estar e
              inclusão social de pessoas em situação de vulnerabilidade.
            </p>
          </div>

          {/* Ícone */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-72 md:h-72 lg:w-96 lg:h-96 relative">
              <Image 
                alt='icone' 
                src='/icon.svg' 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cabecalho;
