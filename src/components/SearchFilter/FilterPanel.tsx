import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { MultiValue } from "react-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import {
  setSearchTerm,
  setCountry,
  setState,
  setIndustry,
  setMonthlyBudget,
  setAge,
  setTravelType,
  setStartTravel,
  setEndTravel,
  setSummitMember,
  setFromAge,
  setToAge,
  setHaveRoom,
  setSummitVerify,
  setGenders,
  setMembers,
} from "@/redux/allSlice/travelSearchSlice";
import { SquareRadioButton } from "../SquareRadioButton";
import { travelOption } from "@/constants/traveType";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const genders = useSelector((state: any) => state.travelSearch.gender);
  const members = useSelector((state: any) => state.travelSearch.member);
  const [monthlyRent, setMonthlyRent] = React.useState([3000]);
  const [fromMonth, setFromMonth] = React.useState<string>("");
  const [toMonth, setToMonth] = React.useState<string>("");
  const [fromYear, setFromYear] = React.useState<string>("");
  const [toYear, setToYear] = React.useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // const [hasAccommodations, setHasAccommodations] = React.useState<
  //   string | null
  // >(null);
  // const [hasSummit, setHasSummit] = React.useState<string | null>(null);
  const [travelTyped, setTravelTyped] = React.useState("");

  const [gender, setGender] = React.useState("all");
  const [genderList, setGenderList] = React.useState<string[]>([]);

  const [member, setMember] = React.useState("all");
  const [memberList, setMemberList] = React.useState<string[]>([]);

  const handleInputChange = (field: string, value: any) => {
    switch (field) {
      case "searchTerm":
        dispatch(setSearchTerm(value));
        break;
      case "country":
        dispatch(setCountry(value));
        break;
      case "state":
        dispatch(setState(value));
        break;
      case "industry":
        dispatch(setIndustry(value));
        break;
      case "monthlyBudget":
        dispatch(setMonthlyBudget(value));
        break;
      case "age":
        dispatch(setAge(value));
        break;
      case "travelType":
        dispatch(setTravelType(value));
        break;
      case "startTravel":
        dispatch(setStartTravel(formatDate(fromYear, fromMonth)));
        break;
      case "endTravel":
        dispatch(setEndTravel(formatDate(toYear, toMonth)));
        break;
      case "summitMember":
        dispatch(setSummitMember(value));
        break;
      case "fromAge":
        dispatch(setFromAge(value));
        break;
      case "toAge":
        dispatch(setToAge(value));
        break;
      case "summitVerify":
        dispatch(setSummitVerify(value));
        break;
      case "setGender":
        dispatch(setGenders(value));
        break;
      default:
        break;
    }
  };

  const formatDate = (year: string, month: string) => {
    return `${year}-${month.padStart(2, "0")}-01`;
  };

  const updateDateRange = () => {
    if (fromYear && fromMonth) {
      handleInputChange("startTravel", null);
    }
    if (toYear && toMonth) {
      handleInputChange("endTravel", null);
    }
  };

  React.useEffect(() => {
    updateDateRange();
  }, [fromYear, fromMonth, toYear, toMonth]);

  const handleRefresh = () => {
    window.location.reload();
  };
  // const handleAccommodationsChange = (value: any) => {
  //   setHasAccommodations(value); // Update the local state
  //   if (value === "yes") {
  //     dispatch(setHaveRoom(true));
  //   } else if (value === "no") {
  //     dispatch(setHaveRoom(false));
  //   } else if (value === "all") {
  //     dispatch(setHaveRoom("" as any)); // Dispatch empty string for "All"
  //   }
  // };

  const handleGenderChange = (value: string) => {
    // If all is selected while "all" is already in the list, clear everything
    if (value === "all" && genderList.includes("all")) {
      setGenderList([]);
      setGender("");
      dispatch(setGenders("" as any)); // Clear all selections
      return;
    }

    // If all is selected and wasn't in the list, select all genders
    if (value === "all") {
      setGenderList(["Male", "Female", "Non-Binary", "all"]);
      setGender("all");
      dispatch(setGenders("" as any));
      return;
    }

    // Toggle individual gender selection
    setGenderList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );

    setGender(value);

    const gendersStrings = [
      genderList.includes(value)
        ? genderList.filter((item) => item !== value)
        : [...genderList, value],
    ].join(",");

    dispatch(setGenders(gendersStrings));
  };

  const options = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Non-Binary", label: "Non-Binary" },
  ];

  const selectedOptions = options.filter((option) =>
    memberList.includes(option.value)
  );

  const handleChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedValues = newValue.map((option) => option.value);
    handleMemberSeeking(selectedValues);
  };

  const handleMemberSeeking = (values: string[]) => {
    const isAllSelected = ["Male", "Female", "Non-Binary"].every((item) =>
      values.includes(item)
    );

    if (isAllSelected) {
      setMemberList(["Male", "Female", "Non-Binary", "all"]);
      setMember("all");
      dispatch(setMembers("" as any)); // If "" means "all" in your Redux logic
      return;
    }

    const filteredValues = values.filter((v) => v !== "all");
    setMemberList(filteredValues);
    setMember(""); // Optional
    dispatch(setMembers(filteredValues.join(",")));
  };

  // const handleSummitVerifyChange = (value: any) => {
  //   setHasSummit(value); // Update the local state
  //   if (value === "yes") {
  //     dispatch(setSummitVerify(true));
  //   } else if (value === "no") {
  //     dispatch(setSummitVerify(false));
  //   } else if (value === "all") {
  //     dispatch(setSummitVerify("" as any)); // Dispatch empty string for "All"
  //   }
  // };

  // const handleTravelChanged = (value: string) => {
  //   setTravelTyped(value);
  //   if (value === "scouting-trip-(1-8-wks)") {
  //     dispatch(setTravelType("scouting-trip-(1-8-wks)"));
  //   } else if (value === "slow-travel-(2-mos---6-mos)") {
  //     dispatch(setTravelType("slow-travel-(2-mos---6-mos)"));
  //   } else if (value === "long-term-(6-mos---1-yr)") {
  //     dispatch(setTravelType("long-term-(6-mos---1-yr)"));
  //   } else if (value === "all") {
  //     dispatch(setTravelType(""));
  //   } else if (value === "cruise") {
  //     dispatch(setTravelType("cruise"));
  //   }
  // };

  const handleTravelChanged = (value: string) => {
    setTravelTyped(value);
    dispatch(setTravelType(value));
  };

  return (
    <div className="relative mt-4 lg:mt-[55px]">
      {/* Drawer toggle for smaller screens, using Filter Icon */}
      <button
        className="fixed bg-primary p-1 text-white rounded-lg top-36 left-0 z-50 lg:hidden"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Filter className="text-white text-xl" />
      </button>

      {/* Drawer Panel */}
      <div
        className={`${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-[1000] w-[374px] bg-white shadow-lg custom-filter-width transition-transform duration-300 ease-in-out overflow-y-auto lg:translate-x-0 pb-8 lg:static lg:w-auto lg:shadow-none lg:rounded-2xl lg:px-3 lg:py-6 lg:max-w-[354px]`}
      >
        <button
          className="absolute top-5 right-3 bg-transparent lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          <X className="text-primary text-xl" />
        </button>
        <h2 className="text-2xl text-[#263238] font-semibold font-sans px-4 pt-14 lg:p-0">
          FILTER BY :
        </h2>

        {/* Travel Type */}
        <div className="space-y-4 p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Travel Type
          </h3>
          <div className="space-y-2">
            {travelOption.map((option) => (
              <SquareRadioButton
                key={option.value}
                label={option.label}
                name="travelType"
                checked={travelTyped === option.value}
                onChange={() => handleTravelChanged(option.value)}
              />
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Members arriving between
          </h3>
          <div className="grid gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center mt-5">
              <Select
                value={fromMonth}
                onValueChange={(value) => setFromMonth(value)}
              >
                <SelectTrigger className="w-full sm:w-[154px] h-[50px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={fromYear}
                onValueChange={(value) => setFromYear(value)}
              >
                <SelectTrigger className="w-full sm:w-[154px] h-[50px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => (
                    <SelectItem key={i} value={(2025 + i).toString()}>
                      {2025 + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-center text-sm text-gray-500">To</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
              <Select
                value={toMonth}
                onValueChange={(value) => setToMonth(value)}
              >
                <SelectTrigger className="w-full sm:w-[154px] h-[50px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={toYear}
                onValueChange={(value) => setToYear(value)}
              >
                <SelectTrigger className="w-full sm:w-[154px] h-[50px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={(2025 + i).toString()}>
                      {2025 + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Max Monthly Rent */}
        <div className="space-y-4 p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Max monthly rent
          </h3>
          <div className="relative w-full h-2 px-2">
            <div
              className="absolute -top-1 text-sm font-medium text-[16px] text-[#344054]"
              style={{
                left: `${(monthlyRent[0] / 5000) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              ${monthlyRent}
            </div>
          </div>
          <Slider
            value={monthlyRent}
            onValueChange={(value) => {
              setMonthlyRent(value);
              handleInputChange("monthlyBudget", value[0]);
            }}
            max={3000}
            step={100}
            className="relative mt-8"
          />
        </div>

        {/* Age */}
        <div className="p-4 sm:p-6 lg:p-0">
          <h3 className="font-bold lg:mt-10 text-[16px] mb-3 text-[#000]">
            Age
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              onValueChange={(value) => handleInputChange("fromAge", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 83 }, (_, i) => i + 21).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => handleInputChange("toAge", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 83 }, (_, i) => i + 21).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <div className="space-y-4 p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Member has accommodations
          </h3>
          <div className="space-y-2">
            <SquareRadioButton
              label="All"
              name="accommodations"
              checked={hasAccommodations === "all"} // Ensure 'All' is selected when value is empty string
              onChange={() => handleAccommodationsChange("all")}
            />

            <SquareRadioButton
              label="Yes"
              name="accommodations"
              checked={hasAccommodations === "yes"}
              onChange={() => handleAccommodationsChange("yes")}
            />
            <SquareRadioButton
              label="No"
              name="accommodations"
              checked={hasAccommodations === "no"}
              onChange={() => handleAccommodationsChange("no")}
            />
          </div>
        </div> */}
        <div className="space-y-4 p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Gender
          </h3>
          <div className="space-y-2">
            <SquareRadioButton
              label="All"
              name="gender"
              checked={["Female", "Male", "Non-Binary"].every((item) =>
                genderList.includes(item)
              )}
              onChange={() => handleGenderChange("all")}
            />

            <SquareRadioButton
              label="Female"
              name="gender"
              checked={genderList.includes("Female")}
              onChange={() => handleGenderChange("Female")}
            />
            <SquareRadioButton
              label="Male"
              name="gender"
              checked={genderList.includes("Male")}
              onChange={() => handleGenderChange("Male")}
            />
            <SquareRadioButton
              label="Non-Binary"
              name="gender"
              checked={genderList.includes("Non-Binary")}
              onChange={() => handleGenderChange("Non-Binary")}
            />
          </div>
        </div>
        <div className="space-y-4 p-4 sm:p-6 lg:p-0">
          <h3 className="font-medium lg:mt-10 text-[18px] text-[#263238]">
            Member is seeking?
          </h3>
          <div className="space-y-2">
            <ReactSelect
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleChange}
              placeholder="Select"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleRefresh}
            className="bg-[#0872BA] flex items-center gap-2 h-10 px-6"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
