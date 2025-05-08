// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { MdArrowForward } from "react-icons/md";
// import { useState, useEffect } from "react";
//  // Import Blog interface

// interface FilterComponentProps {
//   filters: { country: string; services: string };
//   setFilters: (filters: { country: string; services: string }) => void;
// }

// const FilterComponent = ({ filters, setFilters }: FilterComponentProps) => {
//   // Extract unique countries from the blogs
//   const uniqueCountries = Array.from(
//     new Set(filters.country ? [filters.country] : [])
//   ); // Can add logic to fetch unique countries from API

//   // Handle filter change for country and services
//   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilters({
//       ...filters,
//       country: e.target.value,
//       services: filters.services,
//     });
//   };

//   const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilters({
//       ...filters,
//       country: filters.country,
//       services: e.target.value,
//     });
//   };

//   return (
//     <form className="grid xl:grid-cols-3 grid-cols-1 md:gap-8 gap-3">
//       <div>
//         <label className="mb-4 text-[20px]">Country</label>
//         <Select value={filters.country} onChange={handleCountryChange}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select Country" />
//           </SelectTrigger>
//           <SelectContent>
//             {uniqueCountries.map((state, index) => (
//               <SelectItem key={index} value={state}>
//                 {state}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="flex flex-col gap-8 xl:flex-row items-start xl:items-end">
//         <p className="max-md:mt-2 max-sm:mt-5">AND / OR</p>
//         <div className="max-md:mt-4">
//           <label className="text-[20px] mb-4">Services</label>
//           <input
//             type="text"
//             placeholder="Enter Service"
//             value={filters.services}
//             onChange={handleServiceChange}
//             className="border rounded-md px-3 py-2 w-full"
//           />
//         </div>
//       </div>

//       <div className="flex xl:justify-end items-end">
//         <Button
//           type="button"
//           className="flex gap-2 bg-[#0872BA] w-max items-center"
//           onClick={() => setFilters(filters)}
//         >
//           <span className="text-[16px]">Search</span>
//           <MdArrowForward height={24} width={24} />
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default FilterComponent;
