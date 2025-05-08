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
        <div className="flex justify-between flex-col gap-2 w-3/4 mx-auto items-center px-[50px] py-[7px] bg-violet-200 border border-[#7860d7] rounded-lg mb-5">
          <div className="flex items-center">
            <FaExclamationCircle className="me-2" color="#4b3d82" />
            {/* max-w-[85%] */}
            <span className="text-[#4b3d82] select-none ">
              New here? Welcome! Set up your profile under{" "}
              <Link href="/user-profile" className="text-[blue]">
                ‘My Profile’
              </Link>{" "}
              and connect with others once your photo is approved!
            </span>
          </div>
          <div className="flex text-[#4b3d82]">
            <label className="me-3 text-[#4b3d82] whitespace-nowrap">
              <input
                type="checkbox"
                className="me-1"
                onChange={(e) => closeBannerForever(e.target.checked)}
              />
              Got it! Turn off this reminder
            </label>
            |
            <button className="ms-2" onClick={() => setShow(false)}>
              <X color="#4b3d82" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardBanner;
