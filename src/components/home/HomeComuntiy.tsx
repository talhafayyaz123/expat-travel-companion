"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { homeComunityItem } from "@/constants/homeComunityItem";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const HomeComuntiy = () => {
  const router = useRouter();
  const token = Cookies.get("token"); // Replace 'token' with your cookie's key

  const handleBecomeMember = () => {
    if (token) {
      router.push("/membership"); // Redirect to membership page
    } else {
      router.push("/login"); // Redirect to login page
    }
  };
  return (
    <div className="mx-auto  lg:mt-[310px] mt-[100px]">
      <div className="container ">
        <div className=" p-6">
          {homeComunityItem.map((data, index) => (
            <div
              key={index}
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center justify-center"
            >
              <div className="flex justify-center items-center bg-[#fff] rounded-[24px] max-h-[350px]">
                <div className="">
                  <Image
                    src={data.img}
                    alt={data.title}
                    className="object-cover h-[400px] w-[700px]"
                    // className="sm:h-[317px] h-[250px] md:w-[431px] w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 text-center lg:text-left">
                <div className="space-y-2">
                  <div className="w-12 h-2 bg-[#0872BA] mx-auto lg:mx-0"></div>
                  <h1 className="text-xl font-[700] tracking-tighter sm:text-2xl lg:text-4xl text-[#1a2b49] font-sans leading-4">
                    {data.title}
                  </h1>
                </div>
                <p className="text-gray-600 md:text-lg text-[20px] font-sans">
                  {data.description}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start font-sans">
                  <Button
                    onClick={handleBecomeMember}
                    className="bg-[#0872BA] text-white text-[16px]"
                  >
                    Become a Member
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
