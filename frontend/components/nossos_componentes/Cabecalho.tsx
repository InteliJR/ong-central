import Banner from "@/components/nossos_componentes/Banner";
import Header from "@/components/nossos_componentes/Header";
import { Button } from "@/components/shadcnui/button";

function Cabecalho() {
  return (
    <>
      <Header />
      <Banner />
      <div className="h-2/3 w-full px-2 sm:px-[50px] flex flex-col sm:flex-row justify-around mt-4 sm:mt-0">
        {/* Textos e Ícone */}
        <div className="w-full sm:w-3/5 flex flex-col justify-center items-start sm:items-start gap-2 sm:gap-4 px-2 sm:px-0 sm:ml-12">
          <h2 className="text-[24px] sm:text-[32px] font-semibold text-left mb-2 sm:mb-4">
            Missão, Visão e Valores
          </h2>
          <p className="text-[16px] sm:text-[20px] text-left mb-2 sm:mb-4">
            Centralizar e organizar ações de assistência social com apoio de
            entidades, voluntários e parceiros, promovendo o bem-estar e
            inclusão social de pessoas em situação de vulnerabilidade.
          </p>
        </div>

        {/* Ícone */}
        <div className="flex justify-center sm:justify-start mt-4 sm:mt-0 sm:ml-12 items-center">
          <img src="icon.svg" alt="Meu Ícone" className="w-44 h-44 sm:w-56 sm:h-56" />
        </div>
      </div>
    </>
  );
}

export default Cabecalho;
