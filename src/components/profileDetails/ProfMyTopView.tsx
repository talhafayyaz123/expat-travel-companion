"use client";
import React from "react";
import { LifeStyleViwLoder } from "../userProfile/LifeStyleViwLoder";
import { useParams } from "next/navigation";
import { useGetProfMyTopViewQuery } from "@/redux/Api/myTopApi";

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
export const ProfMyTopView = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetProfMyTopViewQuery(id);
  const myTopData = data?.data?.[0];

  if (isLoading)
    return (
      <div className="container my-16">
        <LifeStyleViwLoder />
      </div>
    );
  if (isError) return <div>Error loading data.</div>;

  const categories: Category[] = [
    {
      title: "Personality",
      items: myTopData?.personality || [],
    },
    { title: "Philosophies", items: myTopData?.philosophies || [] },
    { title: "Goals", items: myTopData?.goals || [] },
    { title: "Hobbies", items: myTopData?.hobbies || [] },
    { title: "Social Groups", items: myTopData?.socialGroups || [] },
    { title: "Foodie Fan", items: myTopData?.foodieFan || [] },
    { title: "Musical Tastes", items: myTopData?.musicalTastes || [] },
  ];

  console.log(categories);

  return (
    <div>
      <section>
        <div className="mt-16">
          {/* <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-[#1D2939] text-center md:text-left py-5">
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
