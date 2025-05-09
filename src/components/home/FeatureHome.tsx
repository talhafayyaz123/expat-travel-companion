import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getHomeFeatures } from "@/constants/getHomeFeatures";
import Image from "next/image";

export const FeatureHome = () => {
  return (
    <div>
      <div className="container relative ">
        <div className="bg-white shadow  min-h-[214px]  rounded-[16px] lg:absolute lg:-top-10 m-1 lg:mt-0 mt-8 flex justify-center items-center">
          <div className="lg:p-[24px] p-[4px]">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 l items-center mx-auto ">
              {getHomeFeatures.map((feature, index) => (
                <Card key={index} className="border-none shadow-none">
                  <CardContent className="flex flex-col items-center text-center space-y-4">
                    <div className="lg:p-3 p-2 rounded-full bg-blue-50">
                      <Image
                        src={feature.img}
                        alt={feature.title}
                        className="lg:w-12 lg:h-12 h-9 w-9"
                      />
                    </div>
                    <h3 className="lg:text-[24px] text-[18px] font-[600] text-gray-800 font-sans">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-[18px] text-[16px] font-sans font-[400]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
