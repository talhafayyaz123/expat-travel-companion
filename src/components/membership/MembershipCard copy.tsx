import { membershipPlan } from "@/types/membershipPlan";

import Payments from "../payments/Payments";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import { useState } from "react";

type MembershipCardProps = {
  plan: membershipPlan;
};

export default function MembershipCard({ plan }: MembershipCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };



  return (
    <div className="bg-[#fff] border-1 border rounded-xl p-6">
      <h2 className="text-[28px] text-[#000] font-bold mb-4">{plan.name}</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <div className="lg:w-[653px]">
          <div className="space-y-4 mb-4">
            {plan?.features?.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[16px]">{feature.title}</span>
              </div>
            ))}
            <div>
              <span className="text-2xl font-bold">${plan.amount}</span>
              <span className="text-gray-600 ml-1">/ {plan.interval}</span>
            </div>
          </div>
        </div>

         
        <div className="ml-4">
          <button
            className="bg-[#0077CC] text-white lg:px-4 px-2 py-2 rounded-lg hover:bg-[#0066B3] transition-colors flex items-center"
            onClick={() => setIsOpen(true)}
          >
            Continue with this
            <span className="ml-2">
              <ArrowLeftIcon width={15} height={14} stroke={"#FFFFFF"} />
            </span>
          </button>
        </div>

        
      </div>
      <Payments isOpen={isOpen} onClose={() => setIsOpen(false)} priceId={plan.priceId} amount={plan.amount} />
    </div>
  );
}