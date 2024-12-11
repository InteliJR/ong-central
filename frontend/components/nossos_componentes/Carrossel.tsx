"use client";

import React, { useState } from 'react';
import styles from './Carrossel.module.css';  // Certifique-se de que o caminho está correto

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

  return (
    <div className={styles.carouselContainer}>
      {/* Exibe o título do carrossel */}
      <h2 className={styles.carouselTitle}>{title}</h2>

      <button onClick={prevImage} className={styles.carouselButton}>
        &lt; {/* Setas para navegação */}
      </button>

      <div className={styles.carouselImageContainer}>
        <img
          src={images[currentIndex]}
          alt={`Carrossel Imagem ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>

      <button onClick={nextImage} className={styles.carouselButton}>
        &gt; {/* Setas para navegação */}
      </button>

      {/* Dots de navegação */}
      <div className={styles.carouselDots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? styles.activeDot : styles.inactiveDot}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
