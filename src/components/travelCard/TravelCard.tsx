// import placeholder from "@/assets/placholder.png";
// import { getCountryLabel } from "@/constants/countryOptions";
// import { getTravelTypeLabel } from "@/constants/traveType";
// import { useMyfavAddMutation } from "@/redux/Api/favariteApi";
// import { Heart } from "lucide-react"; // Assume HeartFill is the filled heart icon
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { toast } from "sonner";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { useMemo } from "react";
// import { results } from "./../../constants/results";
// import { useVerifySixQuery } from "@/redux/Api/userApi";

// interface TravelCardProps {
//   result: {
//     id: string;
//     firstName: string;
//     age: number;
//     profileImage: string;
//     destination: {
//       destinationCountry: string;
//       destinationCity: string;
//       travelType: string;
//       TravelBegins: string;
//     }[];
//   };
// }

// const TravelCard: React.FC<TravelCardProps> = ({ result }) => {
//   const { id, firstName, age, profileImage, destination } = result;

//   const { destinationCountry, travelType, TravelBegins } = destination[0] || {};
//   const [addFavorite, { isLoading }] = useMyfavAddMutation(); // API mutation

//   const router = useRouter();

//   const handleUserDetails = () => {
//     router.push(`/profile-details/${id}`);
//   };

//   const handleToggleFavorite = async (id: string) => {
//     const toastID = toast.loading("Adding to saved profile");

//     try {
//       const res = await addFavorite({ userId: id }).unwrap();
//       if (res?.success) {
//         toast.success("Added to saved profile successfully", { id: toastID });
//       } else {
//         toast.error("Failed to add to wishlist", { id: toastID });
//       }
//     } catch (error: any) {
//       toast.error(error.message, { id: toastID });
//     }
//   };

//   return (
//     <Card key={id} className="overflow-hidden  rounded-lg">
//       <CardContent className="p-4">
//         <div className="relative">
//           <Image
//             src={profileImage || placeholder}
//             alt={firstName}
//             width={355.994}
//             height={263.971}
//             className="object-cover rounded-md w-full h-[200px] sm:h-[250px] lg:h-[263px]"
//           />
//           <Button
//             size="icon"
//             variant="ghost"
//             className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
//             onClick={() => handleToggleFavorite(id)}
//             disabled={isLoading} // Disable the button while the API call is in progress
//           >
//             <Heart className="h-4 w-4 fill-red-500 stroke-red-500" />
//           </Button>
//         </div>
//         <div className="mt-5">
//           <div className="flex flex-col sm:flex-row sm:items-center mb-4 justify-between">
//             <h3 className="font-semibold text-lg sm:text-xl">{firstName}</h3>
//             <span className="text-sm text-gray-600 mt-2 sm:mt-0">
//               Age: {age}y
//             </span>
//           </div>
//           <div>
//             <p className="text-[15px] text-[#263238]">
//               <span className="font-[500]">Travel type</span>:{" "}
//               <span className="font-[400]">
//                 {getTravelTypeLabel(travelType)}
//               </span>
//             </p>
//             <div className="text-[15px] text-[#263238]">
//               <span className="font-[500]">Destination</span>:{" "}
//               <span className="font-[400]">
//                 {TravelBegins
//                   ? new Date(TravelBegins).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                     })
//                   : "N/A"}
//               </span>
//             </div>
//             <p className="text-[15px] text-[#263238]">
//               <span className="font-[500]">Destination Country</span>:{" "}
//               <span className="font-[400]">
//                 {getCountryLabel(destinationCountry)}
//               </span>
//             </p>
//           </div>
//           <Button
//             onClick={handleUserDetails}
//             variant="ghost"
//             className="w-full mt-6 sm:mt-8 border border-solid border-[#0872BA] justify-center text-[#0872BA] hover:text-blue-700 text-[15.011px] font-medium"
//           >
//             See profile details
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="ml-2 h-4 w-4"
//             >
//               <path d="M4 12h16m0 0l-4-4m4 4l-4 4" />
//             </svg>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TravelCard;
