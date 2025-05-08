"use client";
import travelimg from "@/assets/home/travelbanner.png";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  combinedCountryData,
  countryOptions,
} from "@/constants/countryOptions";
import { travelOption } from "@/constants/traveType";
import {
  setTravelType,
  setCountry,
  setStartTravel,
  setFromAge,
  setToAge,
  setSummitMember,
} from "@/redux/allSlice/travelSearchSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function TravelSearch() {
  const [formData, setFormData] = useState({
    travelType: "",
    destination: "",
    travelMonth: "",
    travelYear: "",
    ageFrom: "",
    ageTo: "",
    summitMember: "",
    startDate: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Compute the start date in 'YYYY-MM' format
    const formattedStartTravel = `${formData.travelYear}-${String(
      formData.travelMonth
    ).padStart(2, "0")}`;

    // Dispatch individual values to the Redux store
    dispatch(setTravelType(formData.travelType));
    dispatch(setCountry(formData.destination));
    dispatch(setStartTravel(formattedStartTravel));
    dispatch(setFromAge(Number(formData.ageFrom)));
    dispatch(setToAge(Number(formData.ageTo)));
    dispatch(setSummitMember(formData.summitMember));

    // Navigate to the search filter page
    router.push("/search-filter");
  };

  return (
    <div className="">
      <div className="container">
        <div
          className="grid rounded-2xl pt-[40px] pb-[60px] px-[34px] lg:px-[134px] grid-cols-1 gap-10 text-white bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${travelimg.src})` }}
        >
          <div>
            <h1 className="text-[30px] sm:text-[40px] md:text-[54px] text-center font-normal">
              Quick search your travel partner
            </h1>
            <form
              onSubmit={handleSubmit}
              className="max-w-[532px] w-full mx-auto"
            >
              <div className="rounded-lg bg-white/10 backdrop-blur-md p-6 space-y-6">
                <div className="text-white text-xl sm:text-2xl mb-5 text-center">
                  Search for
                </div>
                <div className="grid gap-6">
                  {/* Travel Type */}
                  {/* Travel Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Travel type
                      </label>
                      <Select
                        value={formData.travelType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            travelType: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-transparent border-white text-white">
                          <SelectValue placeholder="Select travel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="default" value=" ">
                            Select
                          </SelectItem>
                          {travelOption.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Destination Country
                    </label>
                    <Select
                      value={formData.destination}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, destination: value }))
                      }
                    >
                      <SelectTrigger className="bg-transparent border-white text-white">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="default" value=" ">
                          Select
                        </SelectItem>
                        {combinedCountryData.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Travel Begin */}
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Travel Begin (MM/YY)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        value={formData.travelMonth}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            travelMonth: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-transparent border-white text-white">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="default" value=" ">
                            Select
                          </SelectItem>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {new Date(0, i).toLocaleString("default", {
                                month: "long",
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={formData.travelYear}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            travelYear: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-transparent border-white text-white">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="default" value=" ">
                            Select
                          </SelectItem>
                          {Array.from({ length: 100 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(2025 + i)}>
                              {2025 + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div> */}

                  {/* Age Range */}
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Age
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        value={formData.ageFrom}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, ageFrom: value }))
                        }
                      >
                        <SelectTrigger className="bg-transparent border-white text-white">
                          <SelectValue placeholder="From" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="default" value=" ">
                            Select
                          </SelectItem>
                          {Array.from({ length: 83 }, (_, i) => (
                            <SelectItem key={i + 21} value={String(i + 21)}>
                              {i + 21}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={formData.ageTo}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, ageTo: value }))
                        }
                      >
                        <SelectTrigger className="bg-transparent border-white text-white">
                          <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 83 }, (_, i) => (
                            <SelectItem key={i + 21} value={String(i + 21)}>
                              {i + 21}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div> */}

                  {/* Group Membership
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Summit Member?
                    </label>
                    <Select
                      value={formData.summitMember}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, summitMember: value }))
                      }
                    >
                      <SelectTrigger className="bg-transparent border-white text-white">
                        <SelectValue placeholder="ExodUS Summit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>

                <p className="!mt-[20px] text-[12px]">
                  Note: For a broader search – select only one (1) option
                </p>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 mt-6"
                >
                  Find a member
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
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
