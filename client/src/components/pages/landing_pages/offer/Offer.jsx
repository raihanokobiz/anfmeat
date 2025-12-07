"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import F1 from "../../../../assets/fake/F1.jpg";
import F2 from "../../../../assets/fake/F2.jpg";
import F3 from "../../../../assets/fake/F3.jpg";


const data = [F1, F2, F3];

export default function Offer() {
  return (
  
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-20">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          className="rounded-lg overflow-hidden"
        >
          {data.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-48 md:h-64 lg:h-80">
                <Image
                  src={img}
                  alt={`Offer ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md shadow-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
}
