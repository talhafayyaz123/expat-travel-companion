"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";  // Correctly importing StaticImageData
// import image from '@/assets/home/perfectTraveler.png';
import image from '@/assets/home/perfect.png';


interface PerfectTraveler {
  img: StaticImageData;
}

// Create an array of PerfectTraveler objects
const getHomeFeatures: PerfectTraveler[] = [
  {
    img: image,
  },
];

export const PerfectTraveler = () => {
  return (
    <div>
      <div className="container relative mt-[100px] hidden md:block">
        <div className="bg-white shadow lg:p-[40px] p-4">
        <div className=" mx-auto text-center">
      <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
      <h2 className="lg:text-5xl font-bold tracking-tight text-slate-900 text-[48px] pb-10 font-sans">
        Perfect for Every Type of Traveler
      </h2>
    </div>
          {getHomeFeatures.map((feature, index) => (
            <div key={index} className="flex justify-center items-center relative">
              <Image
                src={feature.img}
                alt="Perfect Traveler"
                className="object-cover w-full h-[412px]"
                priority
              />
              {/* <div className="absolute top-0 left-0 w-full h-full font-sans" >
                <div className="absolute flex lg:gap-4 gap-1 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center">
                 <div className="flex-1">
                 <h2 className="md:text-2xl text-sm font-bold text-red-600">The Schouting Trip </h2>
                 <p className="sm:text-lg text-xs font-bold">(1-8 Weeks)</p>
                 </div>
                <div className="lg:flex-1">
                 <h2 className="md:text-2xl text-sm font-bold text-violet-500">The Slow Traveler</h2>
                 <p className="sm:text-lg text-xs font-bold">(2-6 month)</p>
                 </div>
                <div className="flex-1">
                 <h2 className="md:text-2xl text-sm  font-bold text-green-700">The Long Haul</h2>
                 <p className="sm:text-lg text-xs font-bold">(6 Months - 1+Year)</p>
                 </div>
                </div>

              </div> */}

            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};
