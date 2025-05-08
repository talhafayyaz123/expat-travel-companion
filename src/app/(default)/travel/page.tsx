import TravelBody from "@/components/travelbody/TravelBody";
import TravelSearch from "@/components/travelSearch/TravelSearch";
import DashBoardPopup from "@/components/sidePopup/DashBoardPopup";
import HomePopup from "@/components/sidePopup/HomePopup";
import { FaExclamationCircle } from "react-icons/fa";
import { X } from "lucide-react";
import DashboardBanner from "@/components/banners/dashboardBanner";

const page = () => {
  return (
    <>
      <div className="relative mt-[160px]">
        <DashboardBanner />
        <TravelSearch></TravelSearch>
        <TravelBody></TravelBody>
      </div>
      <HomePopup />
    </>
  );
};

export default page;
