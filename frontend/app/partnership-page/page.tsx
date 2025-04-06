import Header from "@/components/nossos_componentes/Header";
import { Card, CardContent } from "@/components/shadcnui/card";
import Footer from "@/components/nossos_componentes/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcnui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronRightCircle } from "lucide-react";

function Parcerias() {
  // Sample data for carousels - replace with your actual data
  const entidadesImages = [
    "/jorge.png?height=100&width=150",
    "/vero.png?height=100&width=150",
    "/xodo.png?height=100&width=150",
    "/grl.png?height=100&width=150"
  ];
  
  const colaboradoresImages = [
    "/jorge.png?height=100&width=150",
    "/vero.png?height=100&width=150",
    "/xodo.png?height=100&width=150",
    "/grl.png?height=100&width=150"
  ];

  return (
    <div>
      <Header />
      {/* Entidades Agregadas Section */}
      <section className="px-64 py-12 bg-white flex flex-col">
        
        <div className="flex gap-16">
          <div className="max-w-md">
          <h2 className="text-3xl font-medium text-[#313d44] mb-4">Entidades Agregadas</h2>
            <p className="text-[#313d44] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
              vestibulum. Cras venenatis euismod malesuada.
            </p>
            <p className="text-[#313d44]">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
          <div className="flex-1 relative">
            <Carousel className="w-full max-w-[285px] mx-auto">
              <CarouselContent>
                {entidadesImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-[215px] bg-[#dbf2dc] rounded-lg flex items-center justify-center">
                      <Image
                        src={src}
                        alt={`Entidade ${index + 1}`}
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
            <div className="flex justify-center gap-1 mt-4">
              {entidadesImages.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#4caf50]' : 'bg-[#d9d9d9]'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="px-64 py-12 bg-[#dbf2dc]">
        <div className="flex gap-16">
          <div className="relative w-[285px]">
            <Carousel className="w-full max-w-[285px] mx-auto">
              <CarouselContent>
                {colaboradoresImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-[215px] bg-white rounded-lg flex items-center justify-center">
                      <Image
                        src={src}
                        alt={`Colaborador ${index + 1}`}
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
            <div className="flex justify-center gap-1 mt-4">
              {colaboradoresImages.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#4caf50]' : 'bg-[#d9d9d9]'}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-medium text-[#313d44] mb-4">Colaboradores</h2>
            <p className="text-[#313d44] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
              vestibulum. Cras venenatis euismod malesuada.
            </p>
            <p className="text-[#313d44]">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Parcerias;