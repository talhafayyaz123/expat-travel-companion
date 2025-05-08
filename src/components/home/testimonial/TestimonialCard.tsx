'use client';

import { Star } from "lucide-react";
import { testimonialsData } from '@/constants/testimonialData';
import style from './testimonial.module.css';
import Image from "next/image";
import ArrowRightIcon from "@/components/icon/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icon/ArrowLeftIcon";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import { useTestimonialQuery } from "@/redux/Api/testimonialApi";

export default function TestimonialCard() {
  // const {data,isLoading,isError}=useTestimonialQuery(undefined)
  return (
    <div className="relative bg-white rounded-2xl shadow-sm  mt-[50px] py-6 font-sans overflow-hidden">
      {/* Swiper Navigation Buttons */}
      <div className="absolute lg:right-4 lg:top-4 -bottom-12 right-4 flex gap-2 z-10">
        <button
          className="w-12 h-7 flex items-center justify-center rounded border border-gray-200 text-[#0872BA] hover:text-gray-600 hover:border-gray-300 transition-colors custom-button-prev"
          aria-label="Previous testimonial"
        >
          <ArrowRightIcon />
        </button>
        <button
          className="w-12 h-7 flex items-center justify-center rounded border border-gray-200 text-[#0872BA] hover:text-gray-600 hover:border-gray-300 transition-colors custom-button-next"
          aria-label="Next testimonial"
        >
          <ArrowLeftIcon width={16} height={17} stroke={"#0872BA"} />
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-button-next", // Custom navigation class
          prevEl: ".custom-button-prev",
        }}
        loop={true} // Enable looping
        spaceBetween={50}
        slidesPerView={1}
        className="!overflow-visible"
      >
        {testimonialsData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div key={index} className={`flex flex-col md:flex-row `}>
              <div
                className={` p-0 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ${style.perspectiveCustom}`}
              >
                <div
                  className="transform"
                  style={{ transform: "rotateY(30deg)" }}
                >
                  <div className="bg-[#0872BA] shadow-xl rounded-lg px-12 py-3 min-h-[295px] lg:min-w-[444px] flex justify-center items-center">
                    <div>
                      <div className="relative w-[88px] h-[88px] mx-auto md:mx-0 mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={88}
                          height={88}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-1 mb-2 justify-center lg:absolute lg:top-6 lg:right-8">
                        <Star className="w-4 h-4 fill-white text-white" />
                        <span className="text-white font-medium">
                          {testimonial.rating}
                        </span>
                      </div>
                      <h3 className="text-[24px] font-semibold text-center md:text-left mb-2 text-white">
                        {testimonial.name}
                      </h3>
                      <div className="text-blue-100 text-sm text-center md:text-left">
                        <p className="mb-1 text-[18px] leading-6 text-gray-50 font-[400]">
                          {[
                            testimonial.occupation,
                            ...testimonial.details,
                          ].join(" • ")}
                        </p>
                        <p className="text-[18px] leading-6 font-[400] text-gray-50">
                          {testimonial.location}
                        </p>
                        <p className="text-[18px] leading-6 font-[400] text-gray-50">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card */}
              <div className="p-8 md:pl-20 flex-1 flex items-center">
                <div></div>
                <p className="lg:text-[24px] text-lg text-[#344054] font-sans">
                  {testimonial.quote}
                </p>
                <div></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
