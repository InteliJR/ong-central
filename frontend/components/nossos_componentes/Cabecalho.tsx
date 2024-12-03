import Banner from "@/components/nossos_componentes/Banner";
import Header from "@/components/nossos_componentes/Header";
import { Button } from "@/components/shadcnui/button";

function Cabecalho(){
    return(
        <>
            <Header />
            <Banner />
            <div className="h-2/3 w-full px-[76px] flex flex-row justify-around">
                <div className="w-3/5 flex flex-col justify-center">
                    <h2 className="text-[36px] font-semibold">Missão, Visão e Valores</h2>
                    <p className="text-[22px]">Centralizar e organizar ações de assistência social com apoio de entidades, voluntários e parceiros, promovendo o bem-estar e inclusão social de pessoas em situação de vulnerabilidade.</p>
                </div>
                <div className="flex">
                    <img src="icon.svg" alt="Meu Ícone" width="300" height="300" />
                </div>
            </div>
        </>
    )
}
export default Cabecalho;

// localhost:3000/parte1