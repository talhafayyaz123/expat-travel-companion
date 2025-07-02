"use client";
import MembershipCard from "@/components/membership/MembershipCard";
import { useMembershipQuery } from "@/redux/Api/membershipApi";
import { membershipPlan } from "@/types/membershipPlan";
import { useEffect, useState } from "react";

export default function Membership() {
  const { data, isLoading, isSuccess } = useMembershipQuery(undefined);
  const [membership, setMembership] = useState<any>([]);

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      setMembership([data.data[0]]);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return (
      <div className="container mt-[168px]">
        <div className="bg-white border border-gray-300 rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <div className="space-y-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="ml-4">
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 rounded-xl p-6 animate-pulse mt-16">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <div className="space-y-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="ml-4">
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative mx-auto mt-[164px] p-6">
        <div className="container">
          <div className="bg-[#fff] p-4 rounded-lg">
            <h1 className="lg:text-[48px] font-semibold text-[#1a1a1a] leading-[60px] mb-4">
              Membership Plans & Pricing
            </h1>

            <p className="text-[#000] text-[18px] mb-10">
              We want to make sure that our platform is accessible for travelers
              at every stage of their journey.
              {/* That&#39;s why we offer two
              flexible membership plans: */}
            </p>

            <div className="space-y-6">
              {membership?.map((plan: membershipPlan) => {
                return <MembershipCard key={plan.id} plan={plan} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
