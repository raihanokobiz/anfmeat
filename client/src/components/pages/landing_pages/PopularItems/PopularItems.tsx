
"use client"
import { addToCart } from "@/services/cart";
import { ChevronLeft, ChevronRight, Clock, Crown, CrownIcon, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { RiPriceTagFill } from "react-icons/ri";
import { TbCoinTaka } from "react-icons/tb";
export const PopularItems  = ()=>{
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  // Sample card data
 const products = [
    {
      id: 1,
      name: "Chicken Lemongrass Lollypop",
      price: 385,
      weight: "360gm",
      rating: 3.88,
      badge: "top of the week",
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Chicken POPs",
      price: 300,
      weight: "250gm",
      rating: 4.6,
      badge: "top of the week",
      image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Beef Minute Steak",
      price: 580,
      weight: "360gm",
      rating: 4.5,
      badge: "top of the week",
    
      image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Beef Kolija Singara",
      price: 245,
      weight: "300gm",
      rating: 4.3,
      badge: "top of the week",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Lemon Pepper Fish Fillet",
      price: 385,
      weight: "320gm",
      rating: 4.4,
      badge: "top of the week",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Mutton Kofta Balls",
      price: 450,
      weight: "400gm",
      rating: 4.7,
      badge: "top of the week",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=400&fit=crop"
    }
  ];
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

  const maxIndex = Math.max(0, products.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

 const translateX = -(currentIndex * (100 / cardsPerView));
return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <h2 className="text-2xl font-bold text-gray-800">Popular Items</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full p-2 border-2 border-gray-300 shadow-md transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full p-2 border-2 border-gray-300 shadow-md transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden lg:mx-8 mx-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="bg-white rounded-md border
                   border-gray-200 overflow-hidden hover:shadow-lg 
                   transition-shadow h-[220px] md:h-[220px]">
                    <div className="flex h-full">
                      {/* Left Side - Product Info */}
                      <div className="flex-1 flex flex-col p-2 ">
                        {/* Badge */}
                        {product.badge && (
                          <div className="flex items-center gap-1 mb-2 ">
                            <span className="text-yellow-500 lg:text-xl text-lg"><FaCrown /></span>
                            <span className="lg:text-md text:sm text-gray-600 font-semibold">{product.badge}</span>
                          </div>
                        )}

                        <h3 className="text-base md:text-2xl font-bold text-gray-800  space-y-5">
                          {product.name}
                        </h3>
                        
                        {/* Weight and Price */}
                        <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm text-gray-600">
                          <div className="flex items-center gap-1 font-semibold
                           bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                            <span>📦</span>
                            <span>{product.weight}</span>
                          </div>
                          <div className="flex items-center gap-1 font-semibold
                           bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                            <TbCoinTaka size={18} />
                            <span className="">375</span>
                          </div>
                        </div>

                        {/* Add Button and Rating */}
                        <div className=" top-5 flex items-center  justify-between 
                          mt-auto  ">
                          <button
                            // onClick={() => addToCart(product)}
                            className="bg-green-600 hover:bg-green-800 relative
                             text-gray-800 font-bold px-3 md:px-4
                              py-1.5 rounded-md flex items-center gap-2  transition-colors w-full"
                          >
                            <span className="text-3xl text-white mx-auto">+</span>
                          </button>
                          <div className="flex items-center gap-1 mx-2.5 font-semibold
                           bg-gray-100 px-2 py-1 rounded-2xl">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Product Image */}
                      <div className="w-[150px] md:w-[220px] shrink-0
                        rounded-b-md  p-2  ">
                        <img
                          src={product.image}
                          alt={product.name}
                          className=" object-contain rounded-lg"
                        />
                      </div>
                    </div>
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
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-yellow-400 w-6'
                    : 'bg-gray-300 w-2'
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