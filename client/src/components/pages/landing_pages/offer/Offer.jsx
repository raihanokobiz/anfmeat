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
import { apiBaseUrl } from "@/config/config";

const data = [F1, F2, F3];

export default function Offer({ offrs }) {
  const offers = offrs?.data || [];

  return (
    <div className="px-4 md:px-0 py-6 md:py-10  lg:py-12 max-w-6xl mx-auto">
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
        className="rounded-md overflow-hidden"
      >
        {offers?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={`${apiBaseUrl}${item?.image}`}
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
