import Header from "@/components/nossos_componentes/Header";
import { Card, CardContent } from "@/components/shadcnui/card";
import Footer from "@/components/nossos_componentes/Footer";''
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcnui/carousel";

function Parcerias() {
  return (
    <div>
      <Header />

      {/* Primeira Página da Parcerias */}
      <div className="w-full flex bg-[#b9e0a7] max-h-screen sm:min-h-screen flex-col md:flex-row justify-around items-center p-16 md:p-0">
        {/* Left Content */}
        <div className="w-full md:w-1/3 max-w-xs md:max-w-none space-y-8 text-center md:text-left mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold">Entidades Agregadas</h1>
          <p className="text-sm md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada.
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full md:w-1/4 max-w-sm md:max-w-none mt-8 md:mt-0 mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                'image1.jpg', // Replace with your actual image paths or URLs
                'image2.jpg',
                'image3.jpg',
                'image4.jpg',
                'image5.jpg',
              ].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-4">
                        <img
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Segunda Página da Parcerias */}
      <div className="bg-[#95c797] max-h-screen md:min-h-screen flex flex-col md:flex-row justify-around items-center p-16 md:p-0">
        {/* Carousel */}
        <div className="w-full md:w-1/4 max-w-sm md:max-w-none order-2 md:order-1 mt-8 md:mt-0 mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                'image1.jpg', // Replace with your actual image paths or URLs
                'image2.jpg',
                'image3.jpg',
                'image4.jpg',
                'image5.jpg',
              ].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-4">
                        <img
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/3 max-w-xs md:max-w-none space-y-8 text-center md:text-left order-1 md:order-2 mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold">Colaboradores</h1>
          <p className="text-sm md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


export default Parcerias;