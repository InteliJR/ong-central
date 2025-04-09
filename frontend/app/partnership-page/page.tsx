'use client'
import Header from "@/components/nossos_componentes/Header";
import { Card, CardContent } from "@/components/shadcnui/card";
import Footer from "@/components/nossos_componentes/Footer";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcnui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronRightCircle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

function Parcerias() {
  // Sample data for carousels with links
  const entidadesData = [
    {
      image: "/matematica.jpeg?height=100&width=150",
      name: "Instituto de Matemática",
      url: ""
    },
    {
      image: "/cla-do-bem.jpeg?height=100&width=150",
      name: "Clã do Bem",
      url: ""
    },
    {
      image: "/movimento-familiar.jpeg?height=100&width=150",
      name: "Movimento Familiar",
      url: ""
    },
    {
      image: "/comunidade.png?height=100&width=150",
      name: "Comunidade Solidária",
      url: "https://comunidadesolidaria.org"
    },
    {
      image: "/maos-ajudadoras.png?height=100&width=150",
      name: "Mãos Ajudadoras",
      url: "https://www.instagram.com/grupomaosajudadoras?igsh=MXI5ZGJib2o4emdhbw=="
    },
    {
      image: "/asapac.png?height=100&width=150",
      name: "ASAPAC",
      url: "https://www.instagram.com/asapaccl?igsh=MTk1M3l0b2g1dWtnNg=="
    },
    {
      image: "/centro-espirita.jpeg?height=100&width=150",
      name: "Centro Espírita Bezerra de Menezes",
      url: "https://comunidadesolidaria.org"
    }
  ];
  
  const colaboradoresData = [
    {
      image: "/jorge.png?height=100&width=150",
      name: "Jorge Silva",
      url: "https://exemplo.org/jorge"
    },
    {
      image: "/vero.png?height=100&width=150",
      name: "Verônica Campos",
      url: "https://exemplo.org/veronica"
    },
    {
      image: "/xodo.png?height=100&width=150",
      name: "Instituto Xodó",
      url: "https://institutoxodo.org"
    },
    {
      image: "/grl.png?height=100&width=150",
      name: "GRL Logística",
      url: "https://grllogistica.com"
    }
  ];

  // State to track current slide index
  const [entidadeAtual, setEntidadeAtual] = useState(0);
  const [entidadeCarouselApi, setEntidadeCarouselApi] = useState<CarouselApi>();
  const [colaboradorAtual, setColaboradorAtual] = useState(0);
  const [colaboradorCarouselApi, setColaboradorCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!entidadeCarouselApi) return;

    const setCurrentSelected = () => {
      if (!entidadeCarouselApi) return;
      setEntidadeAtual(entidadeCarouselApi.selectedScrollSnap())
    }

    entidadeCarouselApi.on("select", setCurrentSelected)

    return () => {
      entidadeCarouselApi.off("select", setCurrentSelected);
    }
  }, [entidadeCarouselApi])

  useEffect(() => {
    if (!colaboradorCarouselApi) return;

    const setCurrentSelected = () => {
      if (!colaboradorCarouselApi) return;
      setColaboradorAtual(colaboradorCarouselApi.selectedScrollSnap())
    }

    colaboradorCarouselApi.on("select", setCurrentSelected)

    return () => {
      colaboradorCarouselApi.off("select", setCurrentSelected);
    }
  }, [colaboradorCarouselApi])

  const carouselContainerClass = "relative w-full max-w-[285px] min-w-[285px]";
  const carouselItemClass = "w-full h-48 md:h-[215px] rounded-lg flex items-center justify-center";

  return (
    <div>
      <Header />
      {/* Entidades Agregadas Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-12 bg-white">
        
        <div className="flex flex-col gap-24 lg:flex-row justify-between items-center">
          <div className={carouselContainerClass}>
            <Carousel 
              className="w-full"
              setApi={setEntidadeCarouselApi}
            >
              <CarouselContent>
                {entidadesData.map((entidade, index) => (
                  <CarouselItem key={index}>
                    <div className={`${carouselItemClass} bg-[#dbf2dc]`}>
                      <Image
                        src={entidade.image}
                        alt={entidade.name}
                        width={150}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-20px] bg-white shadow-md border-none focus:ring-0 focus:ring-offset-0">
                <ChevronLeft className="w-6 h-6 text-[#4caf50]" />
              </CarouselPrevious>
              <CarouselNext className="right-[-20px] bg-white shadow-md border-none focus:ring-0 focus:ring-offset-0">
                <ChevronRight className="w-6 h-6 text-[#4caf50]" />
              </CarouselNext>
            </Carousel>
            
            {/* Link to the current entity */}
            <div className="mt-4 flex flex-col items-center">
              <div className="flex justify-center gap-1 mb-2">
                {entidadesData.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === entidadeAtual ? 'bg-[#4caf50]' : 'bg-[#d9d9d9]'}`}
                  ></div>
                ))}
              </div>
              <Link 
                href={entidadesData[entidadeAtual].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#4caf50] font-medium hover:underline transition-all"
              >
                <span>{entidadesData[entidadeAtual].name}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-medium text-[#313d44] mb-4">Entidades Agregadas</h2>
            <p className="text-[#313d44] mb-6 text-[22px] text-justify">
            As entidades apoiadas pela Central da Solidariedade são organizações sociais, ONGs e projetos comunitários que recebem suporte para ampliar seu impacto e fortalecer suas ações em prol das pessoas em situação de vulnerabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-12 bg-[#dbf2dc]">
        <div className="flex flex-col gap-24 lg:flex-row justify-between items-center">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-medium text-[#313d44] mb-4">Colaboradores</h2>
            <p className="text-[#313d44] mb-6 text-[22px] text-justify">
            Nossos parceiros de operações são fundamentais para a existência e o funcionamento contínuo da Central da Solidariedade. São empresas, instituições e voluntários que oferecem apoio logístico, estrutural, técnico e humano, garantindo que as ações da Central aconteçam com eficiência e alcance. 
            </p>
          </div>

          <div className={carouselContainerClass}>
            <Carousel 
              className="w-full"
              setApi={setColaboradorCarouselApi}
            >
              <CarouselContent>
                {colaboradoresData.map((colaborador, index) => (
                  <CarouselItem key={index}>
                    <div className={`${carouselItemClass} bg-white`}>
                      <Image
                        src={colaborador.image}
                        alt={colaborador.name}
                        width={150}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-20px] bg-white shadow-md border-none focus:ring-0 focus:ring-offset-0">
                <ChevronLeft className="w-6 h-6 text-[#4caf50]" />
              </CarouselPrevious>
              <CarouselNext className="right-[-20px] bg-white shadow-md border-none focus:ring-0 focus:ring-offset-0">
                <ChevronRight className="w-6 h-6 text-[#4caf50]" />
              </CarouselNext>
            </Carousel>
            <div className="mt-4 flex flex-col items-center">
              <div className="flex justify-center gap-1 mb-2">
                {colaboradoresData.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === colaboradorAtual ? 'bg-[#4caf50]' : 'bg-[#d9d9d9]'}`}
                  ></div>
                ))}
              </div>
              <Link 
                href={colaboradoresData[colaboradorAtual].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#4caf50] font-medium hover:underline transition-all"
              >
                <span>{colaboradoresData[colaboradorAtual].name}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Parcerias;