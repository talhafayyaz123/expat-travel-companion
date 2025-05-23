"use client";

import { useEffect, useState } from "react";
import { Notebook, X } from "lucide-react";
import Cookies from "js-cookie";

function DashBoardPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const popupClosed = Cookies.get("popupClosed");
    if (popupClosed) {
      setIsOpen(false);
    }
  }, []);

  const closePopup = () => {
    Cookies.set("popupClosed", "true", { expires: 10 / 24 });
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[999]">
        <div className="relative h-5">
          <div
            className="bg-white rounded-sm shadow-lg py-1 px-2 ps-[3px] flex justify-start items-center absolute -right-[60px] top-0 hover:right-0 transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Notebook size={18} />
            <button className="ms-2 w-[48px]">Top 5</button>
          </div>
        </div>
        {/* <div className="relative h-5 mt-4">
          {" "}
          <div
            className="bg-white rounded-sm shadow-lg py-1 px-2 ps-[3px] flex justify-start items-center absolute -right-[60px] top-0 hover:right-0 transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Notebook size={18} />
            <button className="ms-2">Notes</button>
          </div>
        </div> */}
      </div>
      <div
        className={`fixed top-1/2 -translate-y-1/2 right-0 z-[999] custom-height custom-new-width sm:w-[600px] bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}

        // style={{ fontFamily: "Great Vibes, cursive" }}
      >
        {/* Header */}
        <div className="p-4 pb-0 border-b flex justify-between items-center bg-white">
          <button
            onClick={() => closePopup()}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 bg-white h-full">
          <h4
            className="text-[18px] text-gray-800 font-semibold text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            If you want to go fast, go alone. If you want to go far, go
            together.
          </h4>

          <h4 className="text-[17px] text-blue-600 font-semibold text-center border-b pb-4">
            - African Proverb
          </h4>
          <div className="max-h-[480px] overflow-y-auto">
            <h3 className="text-[17px] text-gray-800 font-semibold text-center mt-3 ps-2">
              💡 Top 5 reasons to share lodgings on your next solo adventure:
            </h3>
            <ul className="pb-5 pt-2 px-9">
              <li className="text-[17px] text-gray-800 font-normal text-start mt-3">
                <strong>• Stretch your budget – </strong>
                Save money on accommodations so you can do more and stress less.
              </li>
              <li className="text-[17px] text-gray-800 font-normal text-start mt-3">
                <strong>• Start sooner – </strong>Shared expenses mean you don’t
                have to wait as long to take off on your adventure.
              </li>
              <li className="text-[17px] text-gray-800 font-normal text-start mt-3">
                <strong>• Travel longer – </strong>Spend more time exploring
                your dream destinations without breaking the bank.
              </li>
              <li className="text-[17px] text-gray-800 font-normal text-start mt-3">
                <strong>• Upgrade your stay – </strong>Pool your funds to access
                better properties, top amenities, and prime locations.
              </li>
              <li className="text-[17px] text-gray-800 font-normal text-start mt-3">
                <strong>• Stay motivated – </strong>Experience
                <strong> Travel Synergy </strong>
                that helps you stay motivated & achieve your travel goals
                together!
              </li>
            </ul>
            <h3 className="text-[17px] text-gray-800 font-normal text-center ps-2">
              🔍 Find your ideal travel housemate today!
              <br />
              **<span className="font-semibold">JOIN NOW</span>**
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardPopup;
