"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

function DashboardBanner() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("dashboardBannerClosed");
    if (bannerClosed === "true") {
      setShow(false);
    }
  }, []);

  const closeBannerForever = (val: boolean) => {
    if (val) {
      localStorage.setItem("dashboardBannerClosed", "true");
    } else {
      localStorage.removeItem("dashboardBannerClosed");
    }
  };

  return (
    <>
      {show && (
        <div className="flex flex-wrap  items-center justify-between gap-2 w-[83%] mx-auto px-[8px] py-[10px] bg-violet-200 border border-[#7860d7] rounded-lg mb-5 overflow-hidden">
          <FaExclamationCircle className="me-2 flex-shrink-0" color="#4b3d82" />

          <span className="text-[#4b3d82] select-none min-w-0 flex-1 text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">
            New here? Welcome! Set up your profile under{" "}
            <Link href="/user-profile" className="text-[blue] underline">
              ‘My Profile’
            </Link>{" "}
            and connect with others once your photo is approved!
          </span>

          <label className="flex items-center text-[#4b3d82] text-[13px] whitespace-nowrap me-2">
            <input
              type="checkbox"
              className="me-1"
              onChange={(e) => closeBannerForever(e.target.checked)}
            />
            Got it! Turn off this reminder
          </label>

          <button className="ms-1" onClick={() => setShow(false)}>
            <X color="#4b3d82" />
          </button>
        </div>
      )}
    </>
  );
}

export default DashboardBanner;
