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

  const handleContinue = () => {
    if (isChecked) {
      setIsOpen(true);
    } else {
      alert("Please agree to the terms before proceeding.");
    }
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
      </div>

      {/* Consent Checkbox */}
      <div className="mt-4">
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <span className="text-sm">
            By checking this box I agree that I have read, understood, and
            consent to SoFi’s{" "}
            <a href="#" className="text-blue-600">
              ESIGN Act Consent
            </a>
            :{" "}
            <a href="#" className="text-blue-600">
              GLBA Privacy Notice
            </a>
            .
            <a href="privacy-policy" className="text-blue-600">
              Privacy Policy
            </a>
            .{" "}
            <a href="terms-and-condition" className="text-blue-600">
              Terms of Use
            </a>
            , and
            <a href="#" className="text-blue-600">
              Arbitration Agreement
            </a>
            .
          </span>
        </label>
      </div>

      {/* Button aligned to the right */}
      <div className="flex justify-end mt-4">
        <button
          className={`bg-[#0077CC] text-white lg:px-4 px-2 py-2 rounded-lg ${
            isChecked ? "hover:bg-[#0066B3]" : "opacity-50 cursor-not-allowed"
          } transition-colors flex items-center`}
          onClick={handleContinue}
          disabled={!isChecked}
        >
          Continue with this
          <span className="ml-2">
            <ArrowLeftIcon width={15} height={14} stroke={"#FFFFFF"} />
          </span>
        </button>
      </div>

      <Payments
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        priceId={plan.priceId}
        amount={plan.amount}
      />
    </div>
  );
}
