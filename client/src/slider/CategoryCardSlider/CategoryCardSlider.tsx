"use client";

import { TCategory } from "@/types";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryProps {
  categoriesList: TCategory[];
}

const CategoryCardSlider: React.FC<CategoryProps> = ({ categoriesList }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedCategories = [...(categoriesList || [])].sort(
    (a, b) => Number(b.status) - Number(a.status)
  );

  // Generate upcoming cards if less than 6 categories
  const minCategories = 7;
  const displayCategories = [...sortedCategories];
  
  if (sortedCategories.length < minCategories) {
    const upcomingCount = minCategories - sortedCategories.length;
    for (let i = 0; i < upcomingCount; i++) {
      displayCategories.push({
        _id: `upcoming-${i}`,
        name: "Upcoming",
        slug: "",
        image: "",
        status: 0,
        isUpcoming: true
      } as unknown as TCategory & { isUpcoming?: boolean });
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Track scroll position for indicators
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / displayCategories.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [displayCategories.length]);

  // Auto sliding with reverse
  useEffect(() => {
    let direction: "left" | "right" = "right";
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (direction === "right" && container.scrollLeft >= maxScroll - 10) {
          direction = "left";
        } else if (direction === "left" && container.scrollLeft <= 10) {
          direction = "right";
        }
        
        scroll(direction);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full lg:px-2 -mt-20 md:-mt-24 lg:-mt-24 z-50">
      <div className="relative">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all duration-300 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all duration-300 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 md:gap-4 lg:gap-16 overflow-x-auto scrollbar-hide scroll-smooth  mx-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayCategories?.map((category, index) => {
            const isUpcoming = 'isUpcoming' in category && category.isUpcoming;
            
            return (
              <Link
                key={category._id}
                href={isUpcoming ? "#" : `/shop?category=${category.slug || category._id}`}
                className="flex-shrink-0 snap-start"
                onClick={(e) => isUpcoming && e.preventDefault()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isUpcoming ? 1 : 1.03 }}
                  className={`group relative w-[90px] h-40 sm:w-40 sm:h-52  lg:w-40 lg:h-44 bg-white border-2 ${
                    isUpcoming 
                      ? "border-dashed border-gray-300 bg-gray-50" 
                      : "border-gray-200 hover:border-[#1e6a39] hover:shadow-2xl"
                  } rounded-md overflow-hidden transition-all duration-300 ${
                    isUpcoming ? "cursor-default" : "cursor-pointer"
                  } flex flex-col`}
                >
                  {isUpcoming ? (
                    <div className="relative w-full flex-1 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 rounded-md bg-white/80 flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl lg:text-4xl">🎁</span>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-400">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full flex-1">
                      <Image
                        src={apiBaseUrl + category.image || ""}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-1.5 sm:p-2 lg:p-3 text-center bg-white">
                    <p className={`text-xs sm:text-sm lg:text-base font-semibold ${
                      isUpcoming 
                        ? "text-gray-400" 
                        : "text-gray-700 group-hover:text-[#1e6a39]"
                    } transition-colors duration-300 capitalize line-clamp-2`}>
                      {isUpcoming ? "Upcoming" : category.name}
                    </p>
                  </div>

                  {!isUpcoming && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e6a39]" />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile scroll indicators */}
      <div className="flex md:hidden justify-center gap-1.5 mt-3">
        {displayCategories?.slice(0, Math.min(5, displayCategories.length)).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex % 5
                ? "bg-[#1e6a39] w-6"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCardSlider;