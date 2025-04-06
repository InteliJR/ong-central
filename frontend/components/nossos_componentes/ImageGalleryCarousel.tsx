"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "../shadcnui/card";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageGalleryCarouselProps {
  images: GalleryImage[];
  className?: string;
}

const ImageGalleryCarousel: React.FC<ImageGalleryCarouselProps> = ({
  images,
  className = "",
}) => {
  const [activeImage, setActiveImage] = useState(0);

  // Show next image
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  // Show previous image
  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Handle touch for swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextImage(); // Swipe left
      } else {
        prevImage(); // Swipe right
      }
    }
    
    setTouchStart(null);
  };

  if (images.length === 0) {
    return <div className="text-center py-8">No images to display</div>;
  }

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      {/* Main image display */}
      <div 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              activeImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={index === activeImage}
            />
            
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-medium">{image.title}</h3>
              </div>
            )}
            
            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="bg-white/70 hover:bg-white/90 p-2 rounded-full shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="bg-white/70 hover:bg-white/90 p-2 rounded-full shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 snap-x">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setActiveImage(index)}
            className={cn(
              "flex-shrink-0 snap-start cursor-pointer rounded-md overflow-hidden border-2 transition-all h-16 sm:h-20 w-16 sm:w-20 relative",
              activeImage === index ? "border-[#DD5656] ring-2 ring-[#DD5656]" : "border-gray-200 hover:border-gray-300"
            )}
          >
            <Image
              src={image.src}
              alt={`Thumbnail for ${image.alt}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryCarousel;
