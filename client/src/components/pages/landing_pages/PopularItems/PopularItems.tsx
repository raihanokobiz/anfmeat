"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";

interface PopularProduct {
  _id?: string;
  id?: string;
  name: string;
  thumbnailImage: string;
  weight?: string;
  badge?: string;
  rating?: number;
  price?: number;
}

interface PopularItemsProps {
  products: PopularProduct[];
}

export const PopularItems = ({ products }: PopularItemsProps) => {
  return (
    <div className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 pb-4 border-b-2 border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-[#1e6a39]" />
            Popular Items
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-4 py-2 bg-[#1e6a39] text-white rounded-md hover:bg-[#155028] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-sm md:text-base font-semibold">View All</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.popular-prev',
              nextEl: '.popular-next',
            }}
            pagination={{
              clickable: true,
              el: '.popular-pagination',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            className="popular-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow h-[220px]">
                  <div className="flex h-full">
                    {/* Left Side - Product Info */}
                    <div className="flex-1 flex flex-col p-2">
                      {/* Badge */}
                      {product.badge && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-yellow-500 lg:text-xl text-lg"><FaCrown /></span>
                          <span className="lg:text-md text-sm text-gray-600 font-semibold">{product.badge}</span>
                        </div>
                      )}

                      <h3 className="text-base md:text-2xl font-bold text-gray-800">
                        {product.name}
                      </h3>

                      {/* Weight and Price */}
                      <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center gap-1 font-semibold bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                          <span>📦</span>
                          <span>{product.weight}</span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                          <TbCoinTaka size={18} />
                          <span>375</span>
                        </div>
                      </div>

                      {/* Add Button and Rating */}
                      <div className="flex items-center justify-between mt-auto">
                        <button className="bg-green-600 hover:bg-green-800 text-gray-800 font-bold px-3 md:px-4 py-1.5 rounded-md flex items-center gap-2 transition-colors w-full">
                          <span className="text-3xl text-white mx-auto">+</span>
                        </button>
                        <div className="flex items-center gap-1 mx-2.5 font-semibold bg-gray-100 px-2 py-1 rounded-2xl">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Product Image */}
                    <div className="w-[150px] md:w-[220px] shrink-0 rounded-b-md p-2 relative">
                      <Image
                        src={apiBaseUrl + product?.thumbnailImage}
                        alt={product.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="popular-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 border-2 border-gray-300 shadow-md transition-all">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="popular-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 border-2 border-gray-300 shadow-md transition-all">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Custom Pagination */}
          <div className="popular-pagination flex justify-center gap-2 mt-6"></div>
        </div>
      </div>

      <style jsx global>{`
        .popular-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }
        .popular-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #fbbf24;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}