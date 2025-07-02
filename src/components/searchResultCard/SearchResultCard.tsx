import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import the Image component
import { useRouter } from "next/navigation";
import avatar from "@/assets/avatar.jpg";
import { getCountryLabel } from "@/constants/countryOptions";
import { getIndustryLabel } from "@/constants/industry";
import { getTravelTypeLabel } from "@/constants/traveType";
import { toast } from "sonner";
import { useMyfavAddMutation } from "@/redux/Api/favariteApi";
import LightBox from "../ImageLightbox/LightBox";
import Link from "next/link";

interface SearchResultCardProps {
  id: any;
  name: string;
  age: number;
  industry: string;
  travelType: string;
  travelBegins: string;
  destinationCountry: string;
  haveRoom: string;
  profileImage: string;
  gender: string;
  memberSeeking: string;
  monthlyBudget: string | number;
  summitVerify: boolean;
}

export default function SearchResultCard({
  id,
  name,
  age,
  industry,
  travelType,
  travelBegins,
  destinationCountry,
  haveRoom,
  profileImage,
  gender,
  memberSeeking,
  monthlyBudget,
  summitVerify,
}: SearchResultCardProps) {
  const [addFavorite, { isLoading }] = useMyfavAddMutation(); // API mutation

  const router = useRouter();
  const handleUserDetail = () => {
    router.push(`/profile-details/${id}`);
  };
  const handleToggleFavorite = async (id: string) => {
    const toastID = toast.loading("Adding to saved profiles");

    try {
      const res = await addFavorite({ userId: id }).unwrap();
      if (res?.success) {
        toast.success("Added to saved profiles successfully", { id: toastID });
      } else {
        toast.error("Failed to add to saved profiles", { id: toastID });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastID });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-7 rounded-2xl max-w-w-[752px] bg-white px-4 py-5 mb-6 shadow-sm flex-shrink-0 overflow-hidden">
      <div className="relative h-[200px] md:h-[257px] w-full md:w-[342px] ">
        {/* <Image
          src={profileImage ?? avatar} // Use the profile image URL
          alt={`${name}'s profile`}
          layout="fill" // Set layout to fill to cover the parent div area
          objectFit="cover" // Ensure the image covers the area without stretching
          className="rounded-2xl" // Tailwind class to round the corners
        /> */}
        <LightBox image={profileImage ?? avatar} name={name} />

        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
          onClick={() => handleToggleFavorite(id)}
          disabled={isLoading} // Disable the button while the API call is in progress
        >
          <Heart className="h-4 w-4 fill-red-500 stroke-red-500" />
        </Button>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-bold font-sans text-[#263238] me-5">
                {name || "N/A"}
              </h3>
              {summitVerify && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.2l-3.5-3.6L4 14.2 9 19l12-12-1.4-1.4z" />
                  </svg>
                </span>
              )}
            </div>
            <p className="font-sans font-medium text-[14px] md:text-[16px] text-[#263238]">
              Age : <span className="font-sans font-normal">{age} y</span>
            </p>
          </div>

          <div className="text-sm text-gray-600">
            {/* <p className="font-sans mt-2 md:mt-4 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Business type: </span>
              {getIndustryLabel(industry)} */}
            {/* {industry || "N/A"} */}
            {/* </p> */}
            {/* <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Travel type: </span>
              {getTravelTypeLabel(travelType)}
            </p>
            <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Travel begins: </span>
              {travelBegins && !isNaN(new Date(travelBegins).getTime())
                ? new Date(travelBegins).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </p> */}

            {/* <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">
                Destination Country:{" "}
              </span>
              {getCountryLabel(destinationCountry)}
            </p> */}

            <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Gender: </span>
              {gender}
            </p>

            <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Seeking: </span>
              {memberSeeking}
            </p>

            <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Max Monthly Rent: </span>
              {monthlyBudget}
            </p>

            {/* <p className="font-sans mt-2 md:mt-3 font-normal text-[14px] md:text-[16px] text-[#263238]">
              <span className="font-sans font-medium">Accommodation: </span>
      {haveRoom ? "Yes" : "No"}
              </p> */}
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full border border-solid font-sans text-[14px] md:text-[16px] font-medium text-primary border-primary"
          // onClick={handleUserDetail}
        >
          <Link
            href={`/profile-details/${id}`}
            className="flex items-center"
            target="_blank"
          >
            See profile details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <path d="M4 12h16m0 0l-4-4m4 4l-4 4" />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
}
