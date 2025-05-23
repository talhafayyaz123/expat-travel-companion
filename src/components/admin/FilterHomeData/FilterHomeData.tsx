"use client";

import MemberTableRow from "@/components/admin/Sidebar/MemberTableRow";
import { Table, TableBody } from "@/components/ui/table";
import React, { useEffect, useMemo, useState } from "react";
import FilterDialog from "./FilterDialog";
import SearchBox from "./SearchBox";
// Import the interface and enums
import filterSvg from "@/assets/dashboard/Adjustments.svg";
import searchSvg from "@/assets/dashboard/Search.svg";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllMemberQuery } from "@/redux/Api/memberApi";
import { Member } from "@/types/Member";
import { Loader2, RefreshCcw } from "lucide-react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight, FaRegCalendar } from "react-icons/fa6";
import Export from "../ExcelExport/Export";

interface ExportData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  planName: string;
  age: number;
}

const FilterHomeData: React.FC = () => {
  // const [pagination, setPagination] = useState<any>({ limit: 5, page: 1 });
  const { data: MemberData, isLoading, isError } = useAllMemberQuery(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("summitVerify");
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    country: string[];
    planName: string[];
    summitVerify: boolean | string;
    status: string;
  }>({
    country: [],
    planName: [],
    summitVerify: "",
    status: "",
  });

  // useEffect(() => {
  //   const filteredData = MemberData?.data?.map((data: any) => {
  //     return {
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       email: data.email,
  //       country: data.country,
  //       planName: data.planName,
  //       age: data.age,
  //     };
  //   });

  //   setExportData(filteredData);
  // }, [MemberData]);

  useEffect(() => {
    const exportFilteredData = filteredData?.map((data: any) => {
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        planName: data.planName,
        age: data.age,
      };
    });

    setExportData(exportFilteredData);
  }, [MemberData, filteredData]);

  const members: Member[] = useMemo(() => MemberData?.data || [], [MemberData]);
  const uniqueCountries = Array.from(
    new Set(members.map((member) => member.country || ""))
  ).filter((country) => country !== "");

  const uniquePlanNames = Array.from(
    new Set(members.map((member) => member.planName || ""))
  ).filter((planName) => planName !== "");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSearchBoxOpen(false);
  };

  const handleFilters = (filters: {
    country: string[];
    planName: string[];
    summitVerify: boolean | string;
    status: string;
  }) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  // useEffect(() => {
  //   let data = [...members];
  //   let searchData = null;

  //   if (activeFilters.status) {
  //     data = data.filter((member) => member.status == activeFilters.status);
  //   }

  //   if (searchQuery) {
  //     searchData = [...members];
  //     searchData = searchData.filter(
  //       (member) =>
  //         member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         (member.country &&
  //           member.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //         (member.email &&
  //           member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //         (member.age && member.age == parseFloat(searchQuery))
  //     );
  //   }

  //   if (selectedDate) {
  //     searchData = [...members];
  //     searchData = searchData.filter((data: Member) => {
  //       let formattedCreatedDate = "12/03/2021"; // Default value

  //       if (data?.createdAt) {
  //         formattedCreatedDate = new Intl.DateTimeFormat("en-GB").format(
  //           new Date(data.createdAt)
  //         );
  //       }

  //       const formattedDate = new Intl.DateTimeFormat("en-GB").format(
  //         new Date(selectedDate)
  //       );

  //       return formattedCreatedDate === formattedDate; // Return the comparison result
  //     });
  //   }

  //   if (activeFilters.country.length > 0) {
  //     data = data.filter(
  //       (member) =>
  //         member.country && activeFilters.country.includes(member.country)
  //     );
  //   }

  //   if (activeFilters.planName.length > 0) {
  //     data = data.filter(
  //       (member) =>
  //         member.planName && activeFilters.planName.includes(member.planName)
  //     );
  //   }

  //   if (activeFilters.summitVerify !== "") {
  //     data = data.filter(
  //       (member) => member.summitVerify == activeFilters.summitVerify
  //     );
  //   }

  //   // Sort by summitVerify
  //   // data.sort((a, b) => Number(b.summitVerify) - Number(a.summitVerify));

  //   data.sort((a, b) => {
  //     switch (sortBy) {
  //       case "firstName":
  //         return a.firstName.localeCompare(b.firstName);
  //       case "lastName":
  //         return a.lastName.localeCompare(b.lastName);
  //       case "summitVerify":
  //         return Number(b.summitVerify) - Number(a.summitVerify);
  //       default:
  //         return 0;
  //     }
  //   });

  //   // Avoid unnecessary state update
  //   if (JSON.stringify(searchData ?? data) !== JSON.stringify(filteredData)) {
  //     setFilteredData(searchData ?? data);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery, activeFilters, members, sortBy, selectedDate]);

  useEffect(() => {
    let data = [...members];

    // Filter by status
    if (activeFilters.status) {
      data = data.filter((member) => member.status === activeFilters.status);
    }

    // Filter by country
    if (activeFilters.country.length > 0) {
      data = data.filter(
        (member) =>
          member.country && activeFilters.country.includes(member.country)
      );
    }

    // Filter by planName
    if (activeFilters.planName.length > 0) {
      data = data.filter(
        (member) =>
          member.planName && activeFilters.planName.includes(member.planName)
      );
    }

    // Filter by summitVerify
    if (activeFilters.summitVerify !== "") {
      data = data.filter(
        (member) => member.summitVerify == activeFilters.summitVerify
      );
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(
        (member) =>
          member.firstName.toLowerCase().includes(lowerQuery) ||
          member.lastName.toLowerCase().includes(lowerQuery) ||
          (member.country &&
            member.country.toLowerCase().includes(lowerQuery)) ||
          (member.email && member.email.toLowerCase().includes(lowerQuery)) ||
          (member.age && member.age == parseFloat(searchQuery))
      );
    }

    // Filter by selected date
    if (selectedDate) {
      const formattedSelectedDate = new Intl.DateTimeFormat("en-GB").format(
        new Date(selectedDate)
      );
      data = data.filter((member) => {
        if (!member?.createdAt) return false;
        const formattedCreatedDate = new Intl.DateTimeFormat("en-GB").format(
          new Date(member.createdAt)
        );
        return formattedCreatedDate === formattedSelectedDate;
      });
    }

    // Sort
    data.sort((a, b) => {
      switch (sortBy) {
        case "firstName":
          return a.firstName.localeCompare(b.firstName);
        case "lastName":
          return a.lastName.localeCompare(b.lastName);
        case "summitVerify":
          return Number(b.summitVerify) - Number(a.summitVerify);
        default:
          return 0;
      }
    });

    // Avoid unnecessary updates
    if (JSON.stringify(data) !== JSON.stringify(filteredData)) {
      setFilteredData(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeFilters, members, sortBy, selectedDate]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-end mb-3 gap-2">
        <Button
          onClick={() => {
            setSearchQuery("");
            setSelectedDate(null);
            setActiveFilters({
              country: [],
              planName: [],
              summitVerify: "",
              status: "",
            });
            // setCurrentPage(1);
          }}
          className="bg-[#0872BA] flex items-center gap-2 h-10 px-6"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset
        </Button>{" "}
        <Export data={exportData} />
      </div>
      <div className="flex justify-between items-center overflow-hidden flex-shrink-0">
        <h4 className="md:text-2xl text-lg">Member List</h4>
        <div className="flex items-center gap-2">
          <Image
            src={searchSvg}
            alt="Search"
            onClick={() => {
              setSearchQuery("");
              setSelectedDate(null);
              setSearchBoxOpen(true);
            }}
            className="cursor-pointer"
          />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSearchQuery("");
              setSelectedDate(date);
            }}
            customInput={
              <button className="p-2 rounded">
                <FaRegCalendar className="text-gray-600" />
              </button>
            }
            popperPlacement="bottom-start"
          />

          <Image
            src={filterSvg}
            alt="Filter"
            onClick={() => {
              setFilterBoxOpen(true);
              setSearchQuery("");
              setSelectedDate(null);
            }}
            className="cursor-pointer"
          />
          {/* <Image
            src={refreshSvg}
            alt="Refresh"
            onClick={() => {
              setSearchQuery("");
              setSelectedDate(null);
              setActiveFilters({
                country: [],
                planName: [],
                summitVerify: false,
                status: "ACTIVE",
              });
              setCurrentPage(1);
            }}
            className="cursor-pointer"
          /> */}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="summitVerify">Summit Verify</option>
            <option value="firstName">First Name (A-Z)</option>
            <option value="lastName">Last Name (A-Z)</option>
          </select>

          <Select onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="md:w-[150px] sm:w-[100px] w-[70px] max-sm:hidden">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-5">
        <Table>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((member) => (
                <MemberTableRow key={member.id} member={member} />
              ))
            ) : !isLoading ? (
              <tr>
                <td colSpan={3} className="text-center text-red-500">
                  {" "}
                  No members found.
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center flex justify-center items-center h-64"
                >
                  {" "}
                  <Loader2 className="text-xl animate-spin" />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center  gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaArrowRight />
        </button>
      </div>

      <FilterDialog
        isOpen={filterBoxOpen}
        onClose={() => setFilterBoxOpen(false)}
        onApplyFilters={handleFilters}
        countries={uniqueCountries}
        memberships={uniquePlanNames}
      />

      <SearchBox
        isOpen={searchBoxOpen}
        onClose={() => setSearchBoxOpen(false)} // Close search dialog
        onSearch={handleSearch} // Trigger search
      />
    </>
  );
};

export default FilterHomeData;
