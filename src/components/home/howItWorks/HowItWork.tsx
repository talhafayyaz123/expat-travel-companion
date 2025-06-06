import { howItWorksData } from "@/constants/howItWorksData"; // Import the data
import Image from "next/image";
import { Stepper } from "./Stepper";

export default function HowItWork() {
  return (
    <div className="bg-white mt-[100px] mx-auto p-4 lg:p-[40px]">
      <div className="container">
        <h2 className="lg:text-[48px] font-bold text-center text-[#263238]  text-[32px] mb-5">
          How It Works
        </h2>
        <p className="text-center text-[#344054]  text-[20px] mb-12  mx-auto">
          Search and find other travelers heading to the same destination.
        </p>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <Stepper />

          {howItWorksData.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg flex justify-center items-center"
            >
              <div className="gap-4 flex flex-col">
                {index == 1 || index == 3 ? (
                  <>
                    <div className="flex justify-center ">
                      <div className="lg:w-[200px] lg:h-[200px] h-24 w-24 hidden lg:block">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          className="lg:w-[200px] lg:h-[200px] h-24 w-24"
                        />
                      </div>
                    </div>
                    <div className="">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="lg:text-[18px] text-[16px] text-gray-600 ">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="lg:w-[200px] lg:h-[200px] h-24 w-24 block lg:hidden">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          className="lg:w-[200px] lg:h-[200px] h-24 w-24"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="lg:text-[18px] text-[16px] text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="lg:w-[200px] lg:h-[200px] h-24 w-24">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          className="lg:w-[200px] lg:h-[200px] h-24 w-24"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
