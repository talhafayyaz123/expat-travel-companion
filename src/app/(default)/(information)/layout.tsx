"use client";

import Wizard from "@/components/formWizerd/Wizard";
import WizardSmall from "@/components/formWizerd/WizardSmall";
import { useGetDestinationQuery } from "@/redux/Api/destinationApi";
import { useLifStyleMyQuery } from "@/redux/Api/lifeCicleApi";
import { useGetMyTopQuery } from "@/redux/Api/myTopApi";
import { useGetTalkingPointsQuery } from "@/redux/Api/talkingPointsApi";
import { ReactNode } from "react";

interface ChildrenProps {
  children: ReactNode;
}

const Layout = ({ children }: ChildrenProps) => {


  return (
    <div className="container mt-[137px]">
      {/* For desktop view */}
      <div className="md:block hidden">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-10">{children}</div>

          {/* Conditionally render the Wizard only if all conditions are true */}
       
            <div className="md:col-span-2">
              <Wizard />
            </div>
     
        </div>
      </div>

      {/* For mobile view */}
      <div className="md:hidden block">
       
          <div>
            <WizardSmall />
          </div>
 
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
