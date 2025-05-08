"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetProfTalkingPointsQuery } from "@/redux/Api/talkingPointsApi";

import { DestinationLoader } from "../userProfile/DestinationLoader";

export const ProfTalkingPointsView = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProfTalkingPointsQuery(id || "");

  if (isLoading)
    return (
      <div className="container my-16">
        <DestinationLoader />
      </div>
    );
  if (isError) return <div>Error loading data.</div>;
  if (!data)
    return <div className="text-center mt-10 ">No data available.</div>;

  const talkingPointsData = data.data?.[0];

  // Extract the talking points data

  // Array of questions to display dynamically from the API response
  const questionsAndAnswers = [
    {
      question: "How would you rate your level of cleanliness?",
      answer: talkingPointsData?.cleanlinessLevel || "N/A",
    },
    {
      question: "How would you describe your approach to cooking?",
      answer: talkingPointsData?.cookingHabit || "N/A",
    },
    {
      question: "How would you describe your relationship with a housemate?",
      answer: talkingPointsData?.houseMateRelation || "N/A",
    },
    {
      question: "How often do you host friends or gatherings?",
      answer: talkingPointsData?.hostFriend || "N/A",
    },
    {
      question: "What's your sleep schedule?",
      answer: talkingPointsData?.sleepSchedule || "N/A",
    },
    {
      question: "How often do you use tobacco or vaping products?",
      answer: talkingPointsData?.vapingProduct || "N/A",
    },
    {
      question: "How would you describe your financial habits?",
      answer: talkingPointsData?.financialHabit || "N/A",
    },
    {
      question: "How would you describe your style of communication?",
      answer: talkingPointsData?.communicationStyle || "N/A",
    },
    {
      question: "Are you pet friendly?",
      answer: talkingPointsData?.petFriendlyDescription || "N/A",
    },
    {
      question: "What's your typical work routine?",
      answer: talkingPointsData?.workRoutine || "N/A",
    },
    {
      question: "How often do you consume alcohol?",
      answer: talkingPointsData?.consumeAlcohol || "N/A",
    },
    {
      question: "How would you describe your use of drugs?",
      answer: talkingPointsData?.drugDescription || "N/A",
    },
    // { question: "Are you open to providing screening reports to potential housemates?", answer: talkingPointsData?.screeningReports || "N/A" },
    {
      question:
        "Are you open to having conversations regarding health matters (physical, mental)?",
      answer: talkingPointsData?.regardingHealth || "N/A",
    },
    {
      question:
        "Are you open to having conversations regarding health matters (physical, mental)?",
      answer: talkingPointsData?.politicalValues || "N/A",
    },
    {
      question:
        "How would you describe your Religious/Spiritual beliefs and practices?",
      answer: talkingPointsData?.relagiouseDescription || "N/A",
    },
    {
      question:
        "Do you have any allergies? If so, please list them here: (Ex., Airborne allergens, Foods, Nuts, Latex, Pets/Animals, Insects, etc.)",
      answer: talkingPointsData?.haveAllergies || "N/A",
    },
    {
      question: "Anything else?",
      answer: talkingPointsData?.anyThingElse || "N/A",
    },
  ];

  return (
    <div className="mx-auto py- font-sans">
      {/* <h2 className="text-[#1D2939] text-2xl lg:text-[32px] font-semibold my-12">
        Talking Points
      </h2> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-lg p-4 bg-white shadow-sm mb-3 ${
              index >= questionsAndAnswers.length - 3 ? "col-span-full" : ""
            }`}
          >
            <h3 className="font-semibold text-[16px] sm:text-[18px] text-[#344054] mb-3">
              {item.question}
            </h3>
            {index >= questionsAndAnswers.length - 3 ? (
              <textarea
                readOnly
                value={item.answer}
                className="w-full text-[16px] sm:text-[18px] outline-none border border-slate-200 text-[#475467] bg-gray-100 p-3 rounded-lg"
              />
            ) : (
              <p className="text-[16px] sm:text-[18px] text-[#475467] bg-gray-100 p-3 rounded-lg">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
