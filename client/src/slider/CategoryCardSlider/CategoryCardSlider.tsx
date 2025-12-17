"use client";

import { TCategory } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";

interface CategoryProps {
  categoriesList: TCategory[];
}

const CategoryCardSlider: React.FC<CategoryProps> = ({ categoriesList }) => {
  const sortedCategories = [...(categoriesList || [])].sort(
    (a, b) => Number(b.status) - Number(a.status)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="w-full relative px-12 lg:px-16 -mt-20 md:-mt-24 lg:-mt-24 z-50">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-[#1e6a39] cursor-pointer"
      >
        ◀
      </button>

      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sortedCategories?.map((category) => {
          const isUpcoming = 'isUpcoming' in category && category.isUpcoming;

          return (
            <Link
              key={category?._id}
              href={isUpcoming ? "#" : `/shop?category=${category.slug || category._id}`}
              className="flex-shrink-0 snap-start"
              onClick={(e) => isUpcoming && e.preventDefault()}
            >
              <div
                className={`group relative h-40 w-32
                  bg-white rounded-md overflow-hidden transition-all duration-300
                  ${isUpcoming ? "cursor-default bg-gray-100" : "cursor-pointer hover:bg-[#1e6a39] hover:scale-105"} 
                  flex flex-col shadow-sm`}
              >
                {!isUpcoming && (
                  <div className="relative w-full flex-1 flex items-center justify-center">
                    <div className="relative w-[80px] h-20">
                      <Image
                        src={apiBaseUrl + category.image || ""}
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="pb-2 px-2 text-center">
                  <p className={`text-xs lg:text-sm font-semibold ${isUpcoming
                      ? "text-gray-400"
                      : "text-gray-700 group-hover:text-white"
                    } transition-colors duration-300 capitalize line-clamp-2`}>
                    {isUpcoming ? "Upcoming" : category.name}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-[#1e6a39] cursor-pointer"
      >
        ▶
      </button>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryCardSlider;