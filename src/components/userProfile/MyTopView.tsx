"use client";
import { useGetMyTopQuery } from "@/redux/Api/myTopApi";
import React from "react";
import { MyTopLoder } from "./MyTopLoder";

// Define types for the API response
interface MyTopData {
  personality: string[];
  philosophies: string[];
  goals: string[];
  hobbies: string[];
  socialGroups: string[];
  foodieFan: string[];
  musicalTastes: string[];
}

// Define the type for the categories
interface Category {
  title: string;
  items: string[];
}

// The MyTopView component
export const MyTopView = () => {
  const { data, isLoading, isError } = useGetMyTopQuery(undefined);
  const myTopData = data?.data?.[0] as MyTopData | undefined;

  if (isLoading) {
    return (
      <div className="container my-16">
        <MyTopLoder />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="text-red-500">
          Failed to fetch data. Please try again later.
        </p>
      </div>
    );
  }

  // Check if data exists and access the first item in the array

  // Check if data exists and access the first item in the array
  // const myTopData = data?.data?.[0]; // Make sure to access `data` and then the first item in the array

  // Array of categories and their respective items
  const categories: Category[] = [
    {
      title: "Personality",
      items: myTopData?.personality || [],
    },
    {
      title: "Philosophies",
      items: myTopData?.philosophies || [],
    },
    {
      title: "Goals",
      items: myTopData?.goals || [],
    },
    { title: "Hobbies", items: myTopData?.hobbies || [] },
    { title: "Social Groups", items: myTopData?.socialGroups || [] },
    { title: "Foodie Fan", items: myTopData?.foodieFan || [] },
    { title: "Musical Tastes", items: myTopData?.musicalTastes || [] },
  ];

  return (
    <div>
      <section>
        <div className="mt-16">
          {/* <h2 className="text-[#1D2939] text-2xl lg:text-[40px] font-semibold my-12">
            My Top 3&apos;s
          </h2> */}
          <div className="">
            {categories.map((category, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg mt-5 mb-5 p-4 bg-white shadow-sm w-[35%] m-auto"
              >
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-sans font-semibold mb-2 text-center underline text-[#aca4a6] uppercase">
                  {category.title}
                </h3>
                <ul className="flex justify-center flex-wrap gap-3 text-gray-600">
                  {category.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[16px] sm:text-[18px] md:text-[18px] text-[#475467] font-normal font-sans"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
