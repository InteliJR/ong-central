"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Card } from '../shadcnui/card';

interface Testimonial {
  id: string | number;
  name: string;
  role?: string;
  content: string;
  avatarSrc?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const TestimonialCarousel = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 6000,
  className = '',
}: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  // Reset the autoplay timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (autoPlay) {
      timerRef.current = setTimeout(nextTestimonial, autoPlayInterval);
    }
  }, [autoPlay, autoPlayInterval, nextTestimonial]);

  // Setup autoplay
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex, resetTimer]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full py-8 ${className}`}>
      <div className="overflow-hidden px-4 sm:px-6 md:px-8">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="min-w-full flex flex-col items-center"
            >
              <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <div className="flex flex-col items-center text-center space-y-4">
                  {testimonial.avatarSrc && (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                      <Image 
                        src={testimonial.avatarSrc} 
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                    <div className="pt-2">
                      <p className="font-semibold text-[#DD5656]">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
        <button 
          onClick={(e) => {
            e.preventDefault();
            prevTestimonial();
            resetTimer();
          }}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-gray-700 hover:text-black pointer-events-auto focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextTestimonial();
            resetTimer();
          }} 
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-gray-700 hover:text-black pointer-events-auto focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      
      {/* Dots indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => {
                goToTestimonial(index);
                resetTimer();
              }}
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? 'bg-[#DD5656] w-4' : 'bg-gray-300 hover:bg-gray-400'
              } transition-all`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
