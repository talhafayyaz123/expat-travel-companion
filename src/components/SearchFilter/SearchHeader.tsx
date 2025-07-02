"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import FilterPanel from "./FilterPanel";
import { SearchCard } from "../searchResultCard/SearchCard";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw } from "lucide-react";
import {
  setCountry,
  setState,
  setIndustry,
  setSearchTerm,
  setMonthlyBudget,
  setAge,
  setTravelType,
  setStartTravel,
  setEndTravel,
  setSummitMember,
  setSummitVerify,
  setFromAge,
  setToAge,
  setGenders,
  setMembers,
  setHaveRoom,
  setPage,
} from "@/redux/allSlice/travelSearchSlice";
import {
  combinedCountryData,
  countryOptions,
} from "@/constants/countryOptions";
import { SearchSelect } from "../ui/SearchSelect";
import { industryOptions } from "@/constants/industry";
import { stateOptions } from "@/constants/stateOptions";
import { Required } from "../icon/Required";
import { useAllUserQuery } from "@/redux/Api/userApi";
import { error } from "console";
import { useEffect, useState } from "react";
import { SquareRadioButton } from "../SquareRadioButton";

export default function SearchHeader() {
  const dispatch = useDispatch();
  const [bussinessType, setBussinessType] = useState<any[]>();
  const { destinationCountry, haveRoom, page, limit } = useSelector(
    (state: RootState) => state.travelSearch
  );

  const {
    data: allUsers,
    isLoading: isAllUsersLoading,
    isSuccess,
  } = useAllUserQuery();

  //  const  { data, isLoading } = useLazyUserSearchQuery();

  const handleCountryChange = (value: string) => {
    dispatch(setCountry(value === "all" ? "" : value));
  };

  const handleStateChange = (value: string) => {
    dispatch(setState(value === "all" ? "" : value));
  };

  const handleIndustryChange = (value: string) => {
    dispatch(setIndustry(value === "all" ? "" : value));
  };

  const handleRoomChanged = (checked: boolean) => {
    dispatch(setHaveRoom(checked));
    dispatch(setPage(1));
  };

  // const handleRefresh = () => {
  //   dispatch(setCountry(""));
  //   dispatch(setState(""));
  //   dispatch(setIndustry(""));
  //   dispatch(setSearchTerm(""));
  //   dispatch(setMonthlyBudget(0));
  //   dispatch(setAge(0));
  //   dispatch(setTravelType(""));
  //   dispatch(setStartTravel(""));
  //   dispatch(setEndTravel(""));
  //   dispatch(setSummitMember(""));
  //   dispatch(setFromAge(0));
  //   dispatch(setToAge(0));
  //   dispatch(setSummitVerify(null));
  //   dispatch(setGenders(""));
  //   dispatch(setMembers (""));
  // };
  const handleRefresh = () => {
    // Dispatch an action to reset the Redux store
    // dispatch({ type: "RESET_STORE" });

    // Reload the page
    dispatch(setHaveRoom(false));
    dispatch(setPage(1));
    window.location.reload();
  };

  const Question = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <path
          d="M6.99943 5.604C6.59693 5.604 6.27026 5.93067 6.27026 6.33317V6.39559C6.27026 6.51162 6.22417 6.6229 6.14212 6.70495C6.06008 6.78699 5.9488 6.83309 5.83276 6.83309C5.71673 6.83309 5.60545 6.78699 5.5234 6.70495C5.44136 6.6229 5.39526 6.51162 5.39526 6.39559V6.33317C5.39526 5.90772 5.56427 5.49969 5.86511 5.19885C6.16595 4.89801 6.57398 4.729 6.99943 4.729H7.0671C7.38091 4.72915 7.68716 4.82538 7.94466 5.00476C8.20215 5.18414 8.39855 5.43806 8.50744 5.73238C8.61632 6.0267 8.63247 6.34731 8.55372 6.65108C8.47497 6.95486 8.30509 7.22724 8.06693 7.43159L7.61776 7.81659C7.56141 7.86551 7.51613 7.92588 7.48495 7.99367C7.45377 8.06147 7.4374 8.13513 7.43693 8.20975V8.52067C7.43693 8.6367 7.39084 8.74798 7.30879 8.83003C7.22674 8.91208 7.11546 8.95817 6.99943 8.95817C6.8834 8.95817 6.77212 8.91208 6.69007 8.83003C6.60802 8.74798 6.56193 8.6367 6.56193 8.52067V8.20975C6.56193 7.80317 6.73926 7.417 7.04785 7.15275L7.4976 6.76775C7.60022 6.67979 7.67343 6.56251 7.70739 6.43168C7.74134 6.30085 7.73441 6.16276 7.68751 6.036C7.64062 5.90923 7.55602 5.79987 7.4451 5.72264C7.33418 5.64541 7.20226 5.604 7.0671 5.604H6.99943ZM6.99943 10.4165C7.15414 10.4165 7.30251 10.355 7.41191 10.2456C7.52131 10.1363 7.58276 9.98788 7.58276 9.83317C7.58276 9.67846 7.52131 9.53009 7.41191 9.42069C7.30251 9.3113 7.15414 9.24984 6.99943 9.24984C6.84472 9.24984 6.69635 9.3113 6.58695 9.42069C6.47756 9.53009 6.4161 9.67846 6.4161 9.83317C6.4161 9.98788 6.47756 10.1363 6.58695 10.2456C6.69635 10.355 6.84472 10.4165 6.99943 10.4165Z"
          fill="#0076EF"
        />
        <path
          d="M1.89526 7.50016C1.89526 6.14645 2.43302 4.84819 3.39024 3.89097C4.34746 2.93375 5.64572 2.396 6.99943 2.396C8.35314 2.396 9.6514 2.93375 10.6086 3.89097C11.5658 4.84819 12.1036 6.14645 12.1036 7.50016C12.1036 8.85387 11.5658 10.1521 10.6086 11.1094C9.6514 12.0666 8.35314 12.6043 6.99943 12.6043C5.64572 12.6043 4.34746 12.0666 3.39024 11.1094C2.43302 10.1521 1.89526 8.85387 1.89526 7.50016ZM6.99943 3.271C6.44405 3.271 5.8941 3.38039 5.381 3.59292C4.86789 3.80546 4.40167 4.11698 4.00896 4.50969C3.61624 4.9024 3.30473 5.36862 3.09219 5.88173C2.87965 6.39484 2.77026 6.94478 2.77026 7.50016C2.77026 8.05554 2.87965 8.60549 3.09219 9.11859C3.30473 9.6317 3.61624 10.0979 4.00896 10.4906C4.40167 10.8833 4.86789 11.1949 5.381 11.4074C5.8941 11.6199 6.44405 11.7293 6.99943 11.7293C8.12107 11.7293 9.19678 11.2838 9.9899 10.4906C10.783 9.69751 11.2286 8.62181 11.2286 7.50016C11.2286 6.37852 10.783 5.30281 9.9899 4.50969C9.19678 3.71657 8.12107 3.271 6.99943 3.271Z"
          fill="#0076EF"
        />
      </svg>
    );
  };

  const bussinessOptions = (users: any) => {
    const industry = users.map((user: any) => user.lifestyle.industry);
    const industryOptionss: any = industryOptions.filter((curElem) =>
      industry.includes(curElem.value)
    );
    setBussinessType(industryOptionss);
  };

  useEffect(() => {
    if (isSuccess && allUsers.data && allUsers.data.length > 0) {
      bussinessOptions(allUsers.data);
    }
  }, [allUsers, isSuccess]);

  if (isAllUsersLoading) return <p>Loading...</p>;

  return (
    <div className="md:mt-[188px] mt-[120px] container">
      <h1 className="font-sans lg:text-left text-center sm:text-4xl text-2xl md:text-5xl font-semibold">
        Let&apos;s narrow <span className="text-primary">your search</span>
      </h1>
      <div className="w-full mx-auto p-4 space-y-4 bg-white mt-8">
        <div className=" gap-3 items-center grid md:grid-cols-4">
          <div className="relative ">
            <SearchSelect onValueChange={handleCountryChange}>
              <SelectTrigger className="peer h-[65px]  px-4 rounded-xl">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="default" value="all">
                  Select All
                </SelectItem>
                {combinedCountryData.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SearchSelect>
            <label
              className="absolute left-4 top-1 mb-6 text-gray-500 text-sm transition-all duration-200 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 
        peer-focus:top-1 peer-focus:text-blue-500"
            >
              Country
            </label>
          </div>

          <div className="relative ">
            <SearchSelect onValueChange={handleStateChange}>
              <SelectTrigger className="peer h-[65px] px-4 rounded-xl">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="default" value="all">
                  Select All
                </SelectItem>
                {stateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SearchSelect>
            <label
              className="absolute left-4 top-1 mb-6 text-gray-500 text-sm transition-all duration-200 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 
        peer-focus:top-1 peer-focus:text-blue-500 flex gap-1 items-center"
            >
              State{" "}
              <div className="relative group">
                <Required />
                {/* Tooltip */}
                <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  For searches in U.S. or Canada
                </span>
              </div>
            </label>
          </div>
          {/* <div className="text-center text-2xl font-[500] text-gray-600">
            <p>And/Or</p>
          </div> */}

          {/* <div className="relative ">
            <SearchSelect onValueChange={handleIndustryChange}>
              <SelectTrigger className="peer h-[65px] px-4 rounded-xl">
                <SelectValue placeholder="Select Business Type " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="default" value="all">
                  Select Business Type
                </SelectItem>
                {bussinessType?.map((option: any, index: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SearchSelect>
            <label
              className="absolute left-4 top-1 mb-6 text-gray-500 text-sm transition-all duration-200 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 
        peer-focus:top-1 peer-focus:text-blue-500"
            >
              Business Type
            </label>
          </div> */}
        </div>

        {/* Member has a room checkbox */}
        <div className="space-y-2 w-[200px] mb-6">
          <SquareRadioButton
            label="Member has a room"
            name="room"
            checked={haveRoom || ""}
            onChange={(e) => handleRoomChanged(e.target.checked)}
          />
        </div>

        <div className="flex gap-4 items-center mt-4">
          <Button
            onClick={handleRefresh}
            className="bg-[#0872BA] flex items-center gap-2 h-10 px-6"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </Button>
          <p>Note: Please click &quot;Reset&quot; after each search</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2">
        <FilterPanel />
        <SearchCard />
      </div>
    </div>
  );
}
