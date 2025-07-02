import { useSelector } from "react-redux";
// import { RootState } from "@/redux/Api/copy/storeprv";
import { useState } from "react";
import { WizardNavSmall } from "./WizardNavSmall";
import { RootState } from "@/redux/store";

export default function WizardSmall() {
  const [currentStep, setCurrentStep] = useState("basics");
  const formState = useSelector((state: RootState) => state.formData);

  const steps = [
    { id: "basics", label: "Basics", route: "/basic", isCompleted: true },
    // {
    //   id: "destinations",
    //   label: "Destinations",
    //   route: "/destination",
    //   isCompleted: !!formState.destination  // Set completion based on the 'completed' value from Redux
    // },
    {
      id: "lifestyle",
      label: "Lifestyle",
      route: "/lifestyle",
      isCompleted: !!formState.lifecicle,
    },
    {
      id: "mytop3",
      label: "My top 3’s",
      route: "/mytop",
      isCompleted: !!formState.mytop,
    },
    {
      id: "talking Points",
      label: "Talking Points",
      route: "/talking-points",
      isCompleted: !!formState.lifecicle,
    },
    // Add more steps here...
  ];

  return (
    <div className="flex items-center justify-center w-full h-full mt-36">
      <div className="w-full max-w-[620px]">
        <WizardNavSmall steps={steps} currentStep={currentStep} />
      </div>
    </div>
  );
}
