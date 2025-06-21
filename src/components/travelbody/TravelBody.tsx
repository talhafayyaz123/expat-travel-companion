"use client";
import React from "react";
// import TravelCard from "../travelCard/TravelCard";
import { useAllUserQuery, useVerifySixQuery } from "@/redux/Api/userApi";
import { useGetMyfavQuery } from "@/redux/Api/favariteApi";

interface Result {
  id: string;
  firstName: string;
  age: number;
  country: string;
  travelDate: string;
  profileImage: string;
  destination: {
    destinationCountry: string;
    destinationCity: string;
    travelType: string;
    TravelBegins: string;
  }[];
}

const TravelBody = () => {
  const { data: userDataa, isLoading, isError } = useVerifySixQuery(undefined);

  // Filter users where summitVerify is true
  const userData = userDataa?.data?.data;

  const { data: favouriteList, isLoading: isLoadingFavouriteList } =
    useGetMyfavQuery([]);

  // Check if data is still loading
  const isDataLoading = isLoading || isLoadingFavouriteList;

  // Only transform data when both queries are loaded
  const transformedData = !isDataLoading
    ? userData?.filter(
        (result: Result) =>
          !favouriteList?.data?.some((user: any) => user?.userId === result?.id)
      )
    : [];

  if (isDataLoading)
    return (
      <div className="container my-16">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="p-4">
            <div className="h-10 bg-gray-200 w-1/2 rounded my-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 my-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 my-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 my-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 my-2"></div>
            <div className="mt-6 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (isError) return <div className="container py-4">Error loading data.</div>;

  return (
    <div className="container mt-20">
      {/* <div className="w-12 h-2 bg-[#0872BA] mx-auto lg:mx-0"></div>
      <div className="font-sans text-5xl font-semibold mt-2 text-[#1D2939]">
        <h1>Some of our verified members</h1>
        <p className="font-sans text-xl font-medium mt-4 text-[#344054]">
          You&apos;re not just finding a potential housemate or travel companion
          - you&apos;re building a support system. The solo travelers you meet
          here share your passion for exploring new cultures and experiencing
          life abroad while making their money go further. Plus, by teaming up
          with someone on the same journey, you&apos;ll find a sense of synergy,
          safety and camaraderie that helps you stay motivated and focused on
          your goals.
        </p>
      </div> */}

      <div className="mx-auto my-8  rounded-md grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {transformedData?.length > 0 ? (
          transformedData.slice(0, 6).map((result: Result) => (
            <div key={result.id} className="">
              {/* <TravelCard result={result} /> */}
            </div>
          ))
        ) : (
          <div className="w-full h-32 col-span-full bg-white flex items-center justify-center rounded-md shadow">
            <p className="text-gray-500">No user found</p>
          </div>
        )}
      </div>
      {/* <div className="mx-auto mt-[78px] text-center">
        <div className="inline-block bg-[#0872BA4D] text-black px-4 py-2 -rotate-6 rounded-full text-sm mb-6 font-sans">
          Testimonial
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-sans">
          Feelings of our traveler
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans">
          Find the perfect room to share with travelers heading to the same
          destination.
        </p>
        <TestimonialCard />
      </div> */}
    </div>
  );
};

export default TravelBody;
