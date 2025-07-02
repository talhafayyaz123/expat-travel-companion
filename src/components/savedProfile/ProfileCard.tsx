"use client";

import { getCountryLabel } from "@/constants/countryOptions";

import { ArrowRight, Trash2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import profImg from "@/assets/avatar.jpg";
import { getIndustryLabel } from "@/constants/industry";

interface ProfileCardProps {
  profile: {
    userId: string;
    profileImage: string | null;
    age: number | null;
    destinations: { travelBegins: string; destinationCountry: string }[];
    industry: string | null;
    travelType: string | null;
    accommodation: boolean;
    firstName: string;
    lastName: string;
  };
  handleRemoveWishlist: (itemId: string) => void; // Add this prop type
  isRemovingFavouriteList: boolean; // Add this prop type
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  handleRemoveWishlist,
  isRemovingFavouriteList,
}) => {
  // Transform incoming data to match the `Profile` interface
  const transformedProfile = {
    id: profile.userId,
    name: `${profile.firstName} ${profile.lastName}`, // Replace with real name if available
    age: profile.age,
    businessType: profile.industry,
    travelType: profile.travelType || "N/A",
    travelBegins: profile.destinations[0]?.travelBegins || "N/A",
    destinationCountry: profile.destinations[0]?.destinationCountry || "N/A",
    accommodation: profile.accommodation ? "Yes" : "No",
    profileImage: profile.profileImage || profImg,
  };

  return (
    <div className="bg-white mt-7 rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
        {/* Image Section */}
        <div className="relative flex justify-center w-full h-72 sm:h-96 md:h-96 lg:w-[479px] lg:h-[351px] custom-profile">
          <Image
            src={transformedProfile.profileImage}
            alt={transformedProfile.name}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl !w-[300px] !h-[300px] m-auto"
          />
        </div>

        {/* Profile Information Section */}
        <div className="flex-1 w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl text-[#263238] font-bold">
            {transformedProfile.name}
          </h2>

          <div className="text-sm text-gray-600">
            <div className="flex flex-col md:flex-row md:justify-between md:gap-2">
              {/* <p className="mt-2 md:mt-4 font-normal text-[14px] md:text-[16px] text-[#263238]">
                <span className="font-medium">Business type: </span>
                {getIndustryLabel(transformedProfile.businessType || "N/A")}
              </p> */}
              <p className="mt-2 md:mt-4 font-normal text-[14px] md:text-[16px] text-[#263238]">
                <span className="font-medium">Age: </span>
                {transformedProfile.age || "N/A"}
              </p>
            </div>

            <p className="mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-medium">Travel type: </span>
              {transformedProfile.travelType}
            </p>

            <div className="mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-medium">Travel begins: </span>
              <p className="mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
                <span className="font-medium">Travel begins: </span>
                {transformedProfile?.travelBegins &&
                !isNaN(new Date(transformedProfile.travelBegins).getTime())
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date(transformedProfile.travelBegins))
                  : "N/A"}
              </p>
            </div>

            <p className="mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-medium">Destination Country: </span>
              {getCountryLabel(transformedProfile.destinationCountry)}
            </p>

            {/* <p className="mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-medium">Accommodation: </span>
              {transformedProfile.accommodation}
            </p> */}
          </div>

          <div className="flex flex-col sm:flex-row mt-8 gap-4">
            <Link href={`/profile-details/${transformedProfile.id}`} passHref>
              <button className="flex items-center justify-center w-full sm:w-auto border border-primary rounded-xl py-3 px-8 text-primary hover:text-blue-700">
                See profile details
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>

            <button
              disabled={isRemovingFavouriteList}
              onClick={() => handleRemoveWishlist(transformedProfile?.id)}
              className="flex items-center justify-center w-full sm:w-auto border border-red-500 rounded-xl py-3 px-8 text-red-500 hover:text-red-700"
            >
              Remove here
              <Trash2 className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
