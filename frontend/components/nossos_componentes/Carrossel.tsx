"use client"; 

import React, { useState } from "react";

// Definindo as propriedades que o Carrossel vai receber
interface CarouselProps {
  images: string[]; // Lista de URLs de imagens
  title: string;    // Título do Carrossel
}

const Carousel: React.FC<CarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Função para detectar o gesto de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStart = e.touches[0].clientX;

    const handleTouchEnd = (e: Event) => {
      // Fazendo um cast para o tipo correto
      const touchEvent = e as TouchEvent;
      const touchEnd = touchEvent.changedTouches[0].clientX;
      if (touchStart - touchEnd > 50) {
        nextImage(); // Navegar para a próxima imagem
      } else if (touchEnd - touchStart > 50) {
        prevImage(); // Navegar para a imagem anterior
      }
    };

    // Adicionando o listener de touchend
    e.currentTarget.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  return (
    <div className="relative w-full max-w-[1000px] sm:w-[90%] mx-auto p-5 rounded-3xl mt-12 mb-20">
      {/* Exibe o título do carrossel */}
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">{title}</h2> {/* Ajuste no mb aqui */}

      {/* Botões de navegação (Laterais) - Somente exibido em telas maiores que mobile */}
      <div className="hidden sm:flex">
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-[-36px] transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-[15px] shadow-lg hover:bg-green-600 z-20"
        >
          &lt;
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-[-36px] transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-[15px] shadow-lg hover:bg-green-600 z-20"
        >
          &gt;
        </button>
      </div>

      {/* Imagem do carrossel */}
      <div
        className="relative w-full h-64 sm:h-80 md:h-96"
        onTouchStart={handleTouchStart} // Detecta o início do toque
      >
        <img
          src={images[currentIndex]}
          alt={`Carrossel Imagem ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg border border-[#4CAF50]" // Borda de 1px
        />
      </div>

      {/* Dots de navegação (Sempre visível, mas sem setas em mobile) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
