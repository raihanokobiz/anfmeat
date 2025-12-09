"use client";

import { TCategory } from "@/types";
import Image from "next/image";
import React from "react";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CategoryProps {
  categoriesList: TCategory[];
}

const CategoryCardSlider: React.FC<CategoryProps> = ({ categoriesList }) => {
  const sortedCategories = [...(categoriesList || [])].sort(
    (a, b) => Number(b.status) - Number(a.status)
  );

  return (
    <div className="w-full relative px-12 lg:px-16 -mt-20 md:-mt-24 lg:-mt-24 z-50">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
        centeredSlides={false}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        }}
        className="category-swiper"
      >
        {sortedCategories?.map((category) => {
          const isUpcoming = 'isUpcoming' in category && category.isUpcoming;

          return (
            <SwiperSlide key={category._id}>
              <Link
                href={isUpcoming ? "#" : `/shop?category=${category.slug || category._id}`}
                className="block"
                onClick={(e) => isUpcoming && e.preventDefault()}
              >
                <div
                  className={`group relative h-40 sm:h-52 lg:h-40 
                    bg-white rounded-md overflow-hidden transition-all duration-300
                    ${isUpcoming ? "cursor-default bg-gray-100" : "cursor-pointer hover:bg-[#1e6a39] hover:scale-105"} 
                    flex flex-col shadow-sm`}
                >
                  {!isUpcoming && (
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        <Image
                          src={apiBaseUrl + category.image || ""}
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div className="pb-2 sm:pb-3 px-2 text-center -mt-4">
                    <p className={`text-xs sm:text-sm lg:text-base font-semibold ${
                      isUpcoming
                        ? "text-gray-400"
                        : "text-gray-700 group-hover:text-white"
                    } transition-colors duration-300 capitalize line-clamp-2`}>
                      {isUpcoming ? "Upcoming" : category.name}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all duration-300 shadow-md"
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all duration-300 shadow-md"
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryCardSlider;