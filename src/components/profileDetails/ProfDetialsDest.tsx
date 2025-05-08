import { useGetSingleUserDesQuery } from "@/redux/Api/destinationApi";
import { useParams } from "next/navigation";
import { ProfileViewLoder } from "../userProfile/ProfileViewLoder";
import { DestinationLoader } from "../userProfile/DestinationLoader";
import { getCountryLabel } from "@/constants/countryOptions";
import { getTravelTypeLabel } from "@/constants/traveType";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  haveRoom: boolean;
}

interface Destination {
  id: string;
  travelType: string;
  TravelBegins: string;
  destinationCountry: string;
  destinationCity: string;
  user: User;
}

export const ProfDetailsDest: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleUserDesQuery(id || "");
  const destinations = data?.data?.data;
  const limitedDestinations = destinations?.slice(0, 3);

  if (isLoading) {
    return (
      <div className="text-center mt-10 container">
        <DestinationLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Destination is not Available
      </p>
    );
  }

  return (
    <section>
      {/* <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-[#1D2939] text-center md:text-left py-16 pb-6">
        My Destinations
      </h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {limitedDestinations.map((destination: Destination, index: number) => (
          <div
            key={destination.id}
            className="max-w-full sm:max-w-[383px] border border-solid border-gray-300 rounded-xl p-[14px]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[#1D2939] font-semibold text-[16px] sm:text-[18px]">
                Destination #{index + 1}
              </h2>
            </div>
            <hr className="bg-gray-300 mt-3" />
            <div>
              <div className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                My travel type:{" "}
                <span className="text-[#475467]">
                  {getTravelTypeLabel(destination.travelType)}
                </span>
              </div>
              <div className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                My travel begins:{" "}
                <span className="text-[#475467] font-normal">
                  {new Date(destination?.TravelBegins).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    }
                  )}
                </span>
              </div>
              <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                Destination country:{" "}
                <span className="text-[#475467]">
                  {getCountryLabel(destination.destinationCountry)}
                  {/* {destination.destinationCountry || "N/A"} */}
                </span>
              </p>
              <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                Destination city:{" "}
                <span className="text-[#475467]">
                  {destination.destinationCity || "N/A"}
                </span>
              </p>
              {/* <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                Have room: <span className="text-[#475467]">{destination.user?.haveRoom ? "Yes" : "No"}</span>
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
