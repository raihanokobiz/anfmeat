"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Offer1 from '@/assets/images/offer1.jpeg'
import offer2 from "@/assets/images/7310197d24b24e3cbad372f2c9375732a.jpg"
 
import Image from "next/image";
export const Offersection =()=>{
    const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  // Sample card data
  const cards = [
    { id: 1, title: "Offer 1", image: Offer1 },
    { id: 2, title: "Offer 2", image: offer2 },
     { id: 3, title: "Offer 3", image: offer2 },
      { id: 4, title: "Offer 4", image: offer2 },
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1); // Mobile: 1 card
      } else {
        setCardsPerView(2); // Tablet/Desktop: 2 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, cards.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const translateX = -(currentIndex * (100 / cardsPerView));

  return (
    <div className="min-h-screen  flex items-center justify-center p-2">
      <div className="w-full max-w-6xl">
 
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 
            z-10 bg-white/90 hover:bg-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full p-2 md:p-3
             shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Swiper Container - Hidden overflow so only current cards are visible */}
          <div className="overflow-hidden mx-12 md:mx-16">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="p-2 md:p-8 h-full flex flex-col justify-between">
                         {card.image && (
                           <div className="relative rounded-lg overflow-hidden shadow-xl h-48 sm:h-56
                            md:h-64 lg:h-40 xl:h-80 transform hover:scale-[1.02] transition-transform duration-300">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={card.id <= 2}
                      />
                    </div>
                         )}
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-white w-6 md:w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}