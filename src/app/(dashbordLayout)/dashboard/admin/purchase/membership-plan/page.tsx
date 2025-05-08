"use client";
import { Button } from "@/components/ui/button";
import React from "react";

import MembershipCard from "@/components/admin/MembershipCard/MembershipCard";
import MemberShipPlan from "@/components/admin/MembershipCard/MemberShipPlan";
import { useAllMembershipPlanQuery } from "@/redux/Api/membershipPlansApi";
import { MembershipPlanType } from "@/types/MembershipPlanType";

import { Loader2 } from "lucide-react";

const MemberShipPlanPage = () => {
  // Fetching data from API
  const { data, isLoading, error } = useAllMembershipPlanQuery(undefined);

  if (error) {
    console.error("Error fetching membership plans:", error);
    return <div>Failed to load membership plans. Please try again later.</div>;
  }




  return (
    <div className="bg-white rounded-lg p-3">
      <p className="md:text-[24px] text-lg pb-5 text-wrap">
        All Membership Plans & Pricing
      </p>
      <div className="border border-b-[1px] mb-5"></div>

      {/* Rendering Membership Cards */}

      {data?.data?.length > 0 ? (
        <div>
          {data.data.map((membership: MembershipPlanType) => (
            <MembershipCard
              membership={membership}
              key={membership.id} // Ensure id is unique
            />
          ))}
        </div>
      ) : isLoading ? (
        <div className="h-40 flex w-full justify-center items-center">
          <Loader2 className="text-xl animate-spin" />
        </div>
      ) : (
        <div className="h-40 flex w-full justify-center items-center">
          No data
        </div>
      )}

      {/* Additional Membership Plan Section */}
      <MemberShipPlan />
    </div>
  );
};

export default MemberShipPlanPage;
